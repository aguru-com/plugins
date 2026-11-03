# Workflow YAML — workflow engineer's reference

How to write a workflow definition the engine will load, validate and run:
the file shape, the schema dialect, templating, and every block type with its
`with` fields and output.

## Contents

Read [Native features first](#native-features-first) before choosing block types.

1. [Workflow file structure](#workflow-file-structure) · [Triggers](#triggers)
2. [Naming conventions](#naming-conventions)
3. [Subflow files](#subflow-files)
4. [JSON Schema dialect](#json-schema-dialect)
5. [Templating, ctx, and secrets](#templating-ctx-and-secrets)
6. [Leaf blocks](#leaf-blocks)
   - [`http`](#http) · [`llm`](#llm) · [`js`](#js) · [`ledger`](#ledger) · [`kv`](#kv) · [`log`](#log) · [`stakeholder`](#stakeholder)
   - [`email`](#email) · [`sms`](#sms) · [`whatsapp`](#whatsapp) · [operator confirmation](#operator-confirmation)
   - [`messages`](#messages) · [`scm-attribute-message`](#scm-attribute-message) · [`signal`](#signal-outbound) · [`find-waiters`](#find-waiters)
   - [`trigger`](#trigger) · [`billing`](#billing) · [`activepiece`](#activepiece)
7. [Control-flow blocks](#control-flow-blocks)
   - [`router`](#router) · [`loop`](#loop) · [`wait`](#wait) · [`scm`](#scm)
   - [`hitl`](#hitl) · [`subflow`](#subflow) · [`state-machine`](#state-machine)
   - [`parallel`](#parallel) · [`race`](#race) · [`workflow`](#workflow)

## Native features first

Use native YAML features before adding a `type: js` block.

| Need                                                | Use                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| Read input or node state                            | Direct `params.input`, `params.state`, or declared subflow parameters |
| Enable or skip a block                              | `if`                                                                  |
| Branch, repeat, or wait                             | `router`, `loop`, `wait`, `race`, or `parallel`                       |
| Model stages with rework                            | `state-machine`                                                       |
| Select/default a value or compute a small predicate | A local [wfexpr expression](wfexpr.md)                                |
| Return a constant, result object, or completion     | Subflow `return`; use `blocks: []` when no blocks are needed          |
| Call services, request decisions, or communicate    | `http`, `hitl`, `email`, `scm`, or the appropriate effect block       |
| Parse, normalize, or validate                       | Reuse a domain helper; use JS for multi-step computation              |

Do not use JS solely to copy input/state into ctx, return `true`, rename an
output, or construct a simple result. Keep expressions small and local; retain
JS for algorithms that need a program body. Preserve output contracts, null
defaults, durable state, evidence pairing and side-effect order when replacing
blocks.

## Workflow file structure

```yaml
ref: my-workflow # required — stable kebab key
kind: workflow # required — workflow | subflow
label: My Workflow
description: | # not interpolated
  Long description shown in the UI.
params: # JSON-Schema-like shape for `params`
  username: { type: string, required: true }
idempotency: { key: '${params.username}' }
triggers: # what starts a run; read at import
  inbound: { connector: inbound-email }
subflows: # inline subflow registry
  helper:
    params: { id: string }
    blocks: [...]
    return: '${ctx.result}'
blocks: # required — top-level sequence, run in order
  - id: ...
    type: ...
return: '${ctx.result}' # projection for the run's result
```

| Field         | Required | Notes                                                                                                                                                                                                        |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ref`         | yes      | Unique across the project; the start key and what a `workflow` block's `id` names. Non-empty with no `.`, since it is the namespace half of every block name ([paths](paths.md#block-names-vs-block-paths)). |
| `kind`        | yes      | `workflow` runs on its own; `subflow` only as a callable. A def without `kind` is rejected at load.                                                                                                          |
| `label`       | no       | See [Labels](#labels).                                                                                                                                                                                       |
| `description` | no       | Free text, not interpolated.                                                                                                                                                                                 |
| `params`      | no       | `name → schema` in the [dialect](#json-schema-dialect). Validated at start; a mismatch rejects the run non-retryably.                                                                                        |
| `idempotency` | no       | `{ key }`: derives the run's workflow id from the key so a duplicate start joins or is rejected rather than doubling work. See [`workflow`](#workflow) for the key rules.                                    |
| `triggers`    | no       | `key → trigger`: what starts a run. `kind: workflow` only. See [Triggers](#triggers).                                                                                                                        |
| `subflows`    | no       | Inline subflow registry; see [Subflow files](#subflow-files).                                                                                                                                                |
| `blocks`      | yes      | Top-level block sequence.                                                                                                                                                                                    |
| `return`      | no       | Projection over the final root ctx, same shapes as a [subflow `return`](#subflow-files). Absent: the result is the whole root ctx.                                                                           |

### Triggers

`triggers` declares every way a run starts. Import, project deploy and every
definition save reconcile the workflow's trigger rows from it; nothing else
creates, edits or disables one, and every trigger is always on.

```yaml
triggers:
  inbound: # key: the trigger's identity
    connector: inbound-email
    filters:
      - { field: subject, operator: contains, value: invoice }
    filter-mode: AND
    auto-context-detection: false
  api:
    rate-limit: { max-requests: 100, window-ms: 60000 }
```

**The key is the trigger's identity.** Keeping it keeps the trigger's id, which
outbound RefIds and saved fire URLs carry. Renaming or removing it deletes the
trigger, and those stop starting runs. Keys are kebab-case.

**With `connector`**, inbound mail without a RefId on the connector with that
key in the importing org starts the run. An unknown key fails the save.

| Field                    | Notes                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `filters`                | `{ field, operator, value, case-sensitive? }`. `field`: `subject`, `from`, `to`, `cc`, `body`, `bodyText`, `bodyHtml`, `headers.<name>`. |
| `filter-mode`            | `AND` (default) or `OR`.                                                                                                                 |
| `auto-context-detection` | `false` starts every message as a new conversation instead of following thread headers and RefIds.                                       |

Operators: `equals`, `contains`, `notContains`, `startsWith`, `endsWith`,
`matches` (a regex, which must compile). Matching ignores case unless
`case-sensitive`.

**Without `connector`**, the trigger starts the run when an authenticated
user fires it (`POST /triggers/:id/installations/:installationId/fire`).
`rate-limit` caps fires per window across every process.

### `params` shape

`params` is a map of name → schema in the [JSON Schema dialect](#json-schema-dialect),
full or [shorthand](#shorthand). Read them as `params.<name>` or
`ctx.params.<name>`.

**Declare only what varies per run.** A value reachable as `config.<field>`
must not also be a param — see [Configuration](#configuration).

### Configuration

`config` is the installation's resolved configuration (`env` + `install` +
`setup`, folded). It is a top-level binding in every expression and a global
in `js` blocks:

```yaml
- id: fetch-property
  type: http
  with:
    url: '${config.apiBaseUrl}/properties/${params.propertyId}'
```

- **Nothing passes config.** The engine resolves it on the run's first
  activation. Do not declare config in `params:`, and do not forward a config
  field to a subflow or child workflow: a child resolves the same
  installation's config itself, and a forwarded copy can disagree with it.
- **Config is live.** An installation edit reaches running runs within
  seconds. It applies between blocks: a block dispatched after the update
  reads the new values; one already running finishes on the old. Computed
  values stay as they were (a loop's items, a `wait` deadline, a completed
  block's output). Rules: `workflows/system/README.md`.
- **Config is not in `ctx`**, which keeps credentials and templates out of ctx
  snapshots, history markers and the default return value.
- An unset field reads as `undefined`; nothing checks at start that a
  referenced field exists.

### Labels

`label` is accepted on workflows, subflows and blocks. A bare string is
shorthand for `{ static }`.

```yaml
label: My Workflow
# full form
label:
  static: My Workflow
  dynamic: 'Cert run — ${params.orderId}'
```

| Field     | Required           | Notes                                                      |
| --------- | ------------------ | ---------------------------------------------------------- |
| `static`  | yes (in full form) | The label the UI renders.                                  |
| `dynamic` | no                 | Templated label. Accepted; the engine does not resolve it. |

### Billing

There is no top-level `billing:` field; use the [`billing` block](#billing)
where the run should gate or charge.

## Naming conventions

**kebab-case** for identifiers the engine matches as strings and never reads
through `ctx`: file names, workflow and subflow `ref`, block `id`, signal
names, connector ids, `enum` values, HITL select option `value`s.

**camelCase** for anything that becomes a `ctx` key — block `out`, workflow
and subflow `params` keys, loop `as`, HITL field `name`s — because dot access
accepts only JS identifiers (`ctx.a-b` parses as subtraction). A `wait` or
`hitl` payload lands at `ctx[out]`, its form fields at `ctx[out].fieldName`.

**`with` field names** are fixed by each block's schema: kebab-case
(`connector-id`, `from-name`, `max-retries`) or single words (`to`, `body`).

```yaml
ref: send-welcome-email # kebab — identifier
params:
  userEmail: string # camelCase — ctx key
blocks:
  - id: send-greeting # kebab
    type: email
    with:
      connector-id: postmark-default # kebab schema field and value
      to: ['${ctx.params.userEmail}']
      subject: Welcome
      body: '...'
      signal: customer-replied # kebab signal
    out: sendReceipt # camelCase
```

## Subflow files

A subflow is a reusable block sequence with isolated ctx, declared inline
under a workflow's `subflows:` or as a standalone file:

```yaml
# fetch-github-user.yaml
ref: fetch-github-user
kind: subflow
label: Fetch GitHub User
params:
  username: { type: string }
blocks:
  - id: fetch
    type: http
    with:
      method: GET
      url: 'https://api.github.com/users/${ctx.params.username}'
    out: profile
return: '${ctx.profile.body}'
```

- **Refs are flat across the project.** Standalone `kind: subflow` files and
  every workflow's inline `subflows:` share one namespace, resolvable from any
  entry point. The loader is last-write-wins (inline over standalone), so a
  collision silently shadows; wftest fails the project on one.
- **Isolation.** A subflow sees only `ctx.params` and its own block outputs,
  never the caller's ctx.
- **Declare every param you read.** `ctx.params` is built solely from the
  caller's argument map, so an undeclared `ctx.params.<name>` is reported as
  `undeclared-param-ref` and rejected at import. The runtime cannot catch it:
  a whole-template resolving to `undefined` is an absent key, so a typo runs
  with a blank value. Root workflows are exempt (their params also carry
  trigger and webhook fields).
- **Params are validated at each invocation**, before the body runs.

`return` shapes the subflow's public output:

- A string template — the resolved typed value (`return: '${ctx.user}'`).
- An object literal with templated leaves — a record, each leaf resolved.
- Absent — `null`, for side-effect-only subflows.

The caller stores it under the `subflow` block's `out`.

## JSON Schema dialect

Workflow `params` and subflow `params` use the engine dialect:
JSON-Schema-shaped, with deliberate differences. The [`llm`](#llm) block's
`schema` is the exception: it takes standard JSON Schema.

### Three families

```yaml
# Object
{ type: object, props: { ... }, propx: { ... }, required: true, description: "..." }
# Array
{ type: array, items: { ... }, required: true, description: "..." }
# Primitive — string, number, integer, boolean
{ type: string, enum: [...], required: true, description: "..." }
```

| Field         | Applies to  | Notes                                                                                               |
| ------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `type`        | every shape | `object`, `array`, `string`, `number`, `integer`, `boolean`. Required.                              |
| `props`       | `object`    | Property name → schema (standard `properties`). Omitted: any object.                                |
| `propx`       | `object`    | Schema for every key not in `props` (standard `additionalProperties`). For open-keyed dictionaries. |
| `items`       | `array`     | Element schema. Required.                                                                           |
| `enum`        | primitives  | Allowed values.                                                                                     |
| `required`    | every shape | Boolean on the property's own schema. **Default `true`.**                                           |
| `description` | every shape | Human-readable description.                                                                         |

### `required` is per-property and defaults to true

```yaml
params:
  username: { type: string } # required (default)
  nickname: { type: string, required: false } # optional
```

The standard `required: ["username"]` array on the parent is not understood.

- **Optional means the key may be absent, not nullable.** An explicit `null`
  on an optional property fails (`expected string, got null`).
- **Subflow dispatch strips top-level `null` optionals** before validating
  and forwards the stripped map, because wfexpr cannot omit a key: a ternary
  falling to `null` is the only way a caller says "no value". `null` on a
  required param still fails, workflow-start validation still rejects it
  (a start payload can just omit the key), and the strip does not descend —
  a `null` inside an object param still fails. Flatten the param, or omit the
  nested key.
- **A key holding `undefined` counts as absent**: it satisfies an optional
  param and reports `required field missing` for a required one. Once the
  payload crosses into Temporal the key is gone entirely, so callee code
  tests the value, never the key's presence.
- Presence is an own-property test, so a param named `constructor` or
  `toString` behaves like any other.

### Gate on emptiness, not truthiness

`""` and `[]` are supplied values (the restart form submits them verbatim).
`[]` is truthy and `""` falsy, so a bare presence check misreads one of them.
Write the gate you mean:

```yaml
# Wrong — `[]` takes the "supplied" branch and iterates nothing.
- id: notify
  if: '${ctx.params.recipients != null}'

# Right.
- id: notify
  if: '${ctx.params.recipients != null && ctx.params.recipients.length > 0}'
- id: chase
  if: "${ctx.params.supplierEmail != null && ctx.params.supplierEmail !== ''}"
```

Bare truthiness is right when `""` **means** "not supplied" — the common case
for an optional subflow param; say so at the `params:` declaration. It is
wrong where `""` or `[]` is a meaningful value (`propertyIdWhitelist: []` for
"no whitelist").

The block gate is `if:`. `when:` exists only inside `router.branches`; block
schemas are not strict, so a stray `when:` on a block is dropped silently and
the block always runs.

### Shorthand

A bare type name stands for `{ type: <name> }`; a `[]` suffix for an array of
it. Covers `string`, `number`, `integer`, `boolean`, `object`; bare `array`
has none. Accepted at every level (`props`, `propx`, `items`), and nests
(`string[][]`).

```yaml
params:
  retry: integer
  tags: string[] # { type: array, items: { type: string } }
  user:
    type: object
    props:
      id: integer
      role: { type: string, enum: ['admin', 'member'] }
      bio: { type: string, required: false }
```

### Validation behaviour

| Site               | When                                              | On failure                                        |
| ------------------ | ------------------------------------------------- | ------------------------------------------------- |
| Workflow `params`  | Once at start.                                    | Run rejected non-retryably before any block runs. |
| Subflow `params`   | Each `subflow` invocation.                        | Block fails non-retryably.                        |
| `llm` block schema | Each model response; retried up to `max-retries`. | Block fails with the last validation error.       |

Failures list every offending path:

```text
params.user.role: value "owner" not in enum ["admin", "member", "guest"]
params.user.tags: required field missing
```

## Templating, ctx, and secrets

### `${...}` expressions

Any string field may contain `${expr}`, evaluated as [wfexpr](wfexpr.md)
against ctx. Statements, assignments and arbitrary globals are not wfexpr;
use a `js` block for a program body.

- **Whole-string** (`'${expr}'`) keeps the expression's type — use it for
  arrays, objects, numbers and booleans.
- **Embedded** (`'prefix ${expr}'`) stringifies each occurrence and
  concatenates.

| Key                 | Available                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| `ctx.params.<name>` | Root: the start payload. Subflow: the caller's arguments. Parallel/race branches: the parent's clone. |
| `ctx.trigger`       | When the run was started with a trigger payload.                                                      |
| `ctx.<out>`         | After the block with that `out` has run.                                                              |

Conditions (`if`, `router` `when`, `loop` `until`) are evaluated for
truthiness.

### Secret references

`{{ secret("name") }}` keeps a value out of workflow history: the string
travels as a placeholder carrying only the name, and the activity substitutes
the value just before the network call.

```yaml
with:
  headers:
    Authorization: 'Bearer {{ secret("crm-token") }}'
```

- Single or double quotes, whitespace inside the braces allowed.
- Names start with a letter, then letters, digits, `_` or `-` (`crm-token`, `CRM_TOKEN`).
- Resolved from the org's credential store: the credential's `token`
  (bearer, refreshed server-side) or `apiKey`. A credential with neither
  fails, naming its `authType`.

### Common block fields

| Field   | Required | Notes                                                                                                                                                                                                                                           |
| ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`    | yes      | Kebab-case, **unique within the definition at any depth**, no `.` — enforced at import, because the block's durable name is `<definition ref>.<block id>` ([paths](paths.md#block-names-vs-block-paths)). A subflow may reuse its caller's ids. |
| `type`  | yes      | The block kind.                                                                                                                                                                                                                                 |
| `label` | no       | See [Labels](#labels).                                                                                                                                                                                                                          |
| `out`   | no       | Ctx key the result lands under. A skipped block writes nothing, so readers handle `undefined` or guard with their own `if`.                                                                                                                     |
| `if`    | no       | Truthy or omitted runs; falsy skips.                                                                                                                                                                                                            |

## Leaf blocks

A leaf block dispatches one activity and writes its result to `ctx[out]`.

### `activepiece`

Executes an action from an installed Activepieces package in a regular Temporal
activity. Use the installed catalog in Blockopedia to select the exact package
version and action; the worker rejects a missing version/action before reading
credentials.

```yaml
- id: parse-url
  type: activepiece
  with:
    piece: '@activepieces/piece-http'
    version: '0.13.0'
    action: parse_url
    input: { url: '${params.url}' }
  out: parsed-url
```

`with.input` contains the upstream action properties and supports templates.
For authenticated actions, `with.credential` names a saved API & HTTP credential
key or ID. For structured auth use `with.auth` with secret references; declare
only one of `credential` and `auth`. `with.auth-type` optionally selects one of
the piece's declared authentication methods. Credentials resolve in the activity,
under the run's installation org; browser-only credentials cannot be used.
The action's JSON result is written to `out`.

This block integrates actions, not triggers. Activepieces flow/waitpoint APIs,
file APIs and native-addon actions require additional adapters; unsupported
capabilities throw explicitly. Use native Aguru blocks for control flow and
file handling. Network access follows the worker's public-address policy and
retries can repeat provider side effects. Full compatibility and resource
limits: installed connectors.

### `http`

```yaml
- id: fetch-user
  type: http
  with:
    method: GET
    url: 'https://api.example.com/users/${ctx.id}'
    headers:
      Authorization: 'Bearer {{ secret("api-token") }}'
    query:
      status: open
      tag: ['a', 'b'] # repeated keys
    body: { x: 1 }
    fail-on-error: false
  out: response
```

| `with` field    | Required | Notes                                                                                               |
| --------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `method`        | no       | `GET` (default), `POST`, `PUT`, `PATCH`, `DELETE`.                                                  |
| `url`           | yes      | Absolute URL.                                                                                       |
| `headers`       | no       | Header map; secret references resolve at activity time.                                             |
| `query`         | no       | Arrays repeat the key; `null`/`undefined` are skipped; objects are sent as JSON.                    |
| `body`          | no       | JSON by default (`content-type: application/json` unless set).                                      |
| `body-type`     | no       | `json` (default) or `form-data`.                                                                    |
| `response-type` | no       | `auto` (default), `json`, `text` or `attachment`. Use an explicit mode for incorrect server labels. |
| `attach-to`     | no       | Inbox message id a stored attachment response is filed under, e.g. the trigger email's.             |
| `redirect`      | no       | `error` (default) or `manual`; automatic following is forbidden.                                    |
| `files`         | no       | `form-data` file parts: `{ name, file-name, url, type? }`; `url` may be `attachment:<id>`.          |
| `fail-on-error` | no       | Default `true`: non-2xx fails the block. `false` returns the response with `success: false`.        |
| `pagination`    | no       | See [Pagination](#pagination).                                                                      |
| `confirm`       | no       | See [operator confirmation](#operator-confirmation).                                                |

Output: `{ success, statusCode, statusText, headers, body }`. In `auto`, the
normalized `application/json` and `application/*+json` types parse as JSON.
`text/*`, XML (including `application/*+xml`), JavaScript, form-urlencoded,
GraphQL and SQL decode as UTF-8 text. Other types, including missing or unknown
MIME, persist as inbox attachments inside the activity, unlinked unless
`attach-to` names a message. Their result
adds `bodyType: attachment` and `body: { attachmentId, filename, mimeType, size,
sha256 }`; document bytes and signed URLs never enter workflow state. A caller
expecting text from an unlabelled server must set `response-type: text`.
Bodyless 204/205/304 replies have `body: null`, as does an empty `auto` success
outside JSON and text; an empty success with `response-type: attachment` is an
error. Non-2xx binary replies have no file or body excerpt. Pagination accepts
only `auto` or `json`, and rejects binary pages before uploading anything.

With `redirect: manual` and `fail-on-error: false`, a redirect returns its
status and `headers.location`. A subsequent HTTP block is a new gated request;
credentials are never carried automatically to the next origin. Host allowlists,
hop limits and provider parsing belong in the calling workflow.

- **URLs pass an SSRF gate**: no localhost, private ranges or cloud
  metadata hosts, checked again at socket open.
- **Response limits.** Bodies are capped (`WORKFLOW_HTTP_MAX_RESPONSE_BYTES`,
  8 MiB default; `WORKFLOW_ATTACHMENT_MAX_BYTES` per `files` download). Over
  the cap fails non-retryably as `HTTP_RESPONSE_TOO_LARGE`. See the engine
  activities README's response limits.

```yaml
- id: upload
  type: http
  with:
    method: POST
    url: https://api.example.com/uploads
    body-type: form-data
    body: { LinkedId: '${ctx.params.propertyId}' } # scalars → string parts
    files:
      - name: FileToUpload
        file-name: report.pdf
        url: 'attachment:${ctx.params.attachmentId}'
        type: application/pdf
  out: uploaded
```

#### Pagination

Cursor-token paging: each response carries a cursor the next request sends
back as a query param. The engine runs **one activity per page**, so a
retry repeats one page, not the walk.

```yaml
pagination:
  style: token # only style
  items: items # dot-path into body — array merged across pages
  cursor: meta.nextToken # dot-path into body — stops when null/undefined
  cursor-param: nextToken # query param carrying the cursor
  max-pages: 100 # default 100
```

The output adds `pagination: { pagesFetched, totalItems, completed,
stopReason }`; `body` is the last page's with `items` replaced by the merged
array. `completed: false` with `stopReason: max-pages` means more may remain.
A failed page (under `fail-on-error: false`) stops the walk and is returned
with partial metadata.

### `llm`

Calls a model with a prompt, optionally a structured-output schema and
attachments. `model` carries the call's settings, usually from an `LLM_MODEL`
env config field so they can change without a deploy.

```yaml
- id: classify
  type: llm
  with:
    model: '${config.classifierModel}'
    system-prompt: You sort customer messages.
    prompt: |
      Classify the customer message:
      ${ctx.message.body}
    schema:
      type: object
      required: [category, confidence]
      properties:
        category: { type: string, enum: ['billing', 'support', 'other'] }
        confidence: { type: number, description: 0.0–1.0 }
    attachments:
      - url: 'attachment:${ctx.params.docId}'
        media-type: application/pdf
  out: classification
```

| `with` field      | Required | Notes                                                                                                                       |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `model`           | one of   | The settings below, inline or a whole-string template.                                                                      |
| `config-id`       | one of   | Deprecated: a stored agent config, run by the backend. Takes no `system-prompt`.                                            |
| `system-prompt`   | no       | System prompt.                                                                                                              |
| `mcp`             | no       | `model` only. Manifest MCP servers by key; see [MCP tools](#mcp-tools).                                                     |
| `max-steps`       | no       | Model turns a tool loop may take. Default `30`. A loop still calling tools at the limit fails the block without retries.    |
| `prompt`          | yes      | Prompt text.                                                                                                                |
| `schema`          | no       | **Standard JSON Schema** (`properties`, per-object `required` arrays, `additionalProperties`). Enables JSON mode + retries. |
| `max-retries`     | no       | Schema-validation retries. Default `3`.                                                                                     |
| `attachments`     | no       | `{ url, media-type, file-name? }`; `url` may be `attachment:<id>`. Reused across retries.                                   |
| `fail-on-error`   | no       | Default `true`. `false` writes `null` to `out`; see [Suppressing a failure](#suppressing-a-failure).                        |
| `on-config-error` | no       | `hold` (default) or `fail`; see [Operator-resolvable failures](#operator-resolvable-failures).                              |

`out-error` sits beside `out` (not in `with`): with `fail-on-error: false` it
receives `{ message }` on a suppressed failure and `null` on success.

| `model` field      | Required | Notes                                                                                             |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------- |
| `provider`         | yes      | Catalogue provider id: `openai`, `anthropic`, `google`, or any OpenAI-compatible one.             |
| `model`            | yes      | Provider model id.                                                                                |
| `api-key`          | yes      | The **name** of an API-key credential, resolved like `secret()`: the run org, then its ancestors. |
| `temperature`      | no       | Default `0`.                                                                                      |
| `max-tokens`       | no       | Output cap. Absent, the model's default.                                                          |
| `thinking-budget`  | no       | Google and pre-4.6 Claude reasoning budget in tokens. Default `8192`.                             |
| `reasoning-effort` | no       | `none`, `minimal`, `low`, `medium`, `high` or `xhigh`. Wins over `thinking-budget`; see below.    |

A `model` call streams from the engine; a provider error worth retrying is
retried by the activity, never by the SDK as well.

**Schema.** The schema is appended to the prompt verbatim and the response
validated against it; errors are fed back and the call retried up to
`max-retries`. Nothing strips `null`: a `null` against a non-nullable type
burns a retry, so when the prompt tells the model to emit `null`, declare a
nullable union (`type: ["object", "null"]`); otherwise tell it to omit the
key. Without `schema`, `out` is the raw text. `description`s reach the model
and improve output.

**Reasoning effort** is OpenAI's vocabulary, and no provider rejects it.
An OpenAI reasoning model gets the lowest effort it accepts at or above the one
asked for (else its highest), so `o3` runs `xhigh` as `high`; a model that does
not reason ignores it. Google and Claude models before 4.6 get a thinking budget that grows with
it, overriding `thinking-budget`. Claude 4.6 and later, Fable and Mythos think adaptively: they
get the effort itself (`none` and `minimal` run as `low`) and ignore `thinking-budget`, which they
reject. Other OpenAI-compatible vendors never receive it.

> **Deprecated:** existing LLM blocks may still use the engine dialect
> (`props`, `propx`, per-property `required`), validated required-by-default
> with null-stripping so running workflows can finish. Do not author new
> blocks that way; migrate to standard JSON Schema.

#### MCP tools

A project declares its MCP servers once, in `manifest.yaml`; a block names the
ones its call may use. Tools are offered as `<server>__<tool>`; one whose name
is not 1–64 of `A-Z a-z 0-9 _ -` is skipped, since providers refuse it.

```yaml
# manifest.yaml
mcp:
  servers:
    crm:
      url: '${config.crmMcpUrl}' # static, or env-tier config fields only
      credential: crm-mcp-token # credential name, resolved like secret()
      context: # defaults; any config tier
        accountRef: '${config.accountRef}'
```

```yaml
- id: find-customer
  type: llm
  with:
    model: '${config.openaiModel}'
    mcp:
      crm:
        context: { customerId: '${ctx.params.customerId}' }
    prompt: Find the customer and summarise their open tickets.
```

- **Context** merges the block's values over the manifest's. A value reaches a
  tool only through an argument the tool's input schema declares, and it wins
  over whatever the model passed.
- Manifest templates are only `${config.<path>}`. An unknown server key fails
  the import.
- The tool list is cached per server, cleared by an import or an env-values
  write, and refilled by the next call.
- A server that cannot connect or list fails the call, which retries; each
  tool call is capped at 30 s, and one cut off is reported to the model as of
  unknown outcome.
- An answer off its `schema` is not retried once the call has run tools: a
  retry would run them again. The block fails instead.

#### Suppressing a failure

`fail-on-error: false` is for a call whose failure must not stop the work
around it, such as an informational call after something irreversible.

```yaml
- id: llm-advisories
  type: llm
  out: advisories
  out-error: advisoriesError
  with:
    fail-on-error: false
    model: '${config.openaiModel}'
    prompt: ...

- id: log-advisory-scan-failed
  type: log
  if: '${ctx.advisoriesError != null}'
  with:
    level: warn
    message: 'Advisory scan failed: ${ctx.advisoriesError?.message}'
```

- **Declare `out-error` to tell a failure from a skip.** wfexpr's `!= null`
  matches both `null` and `undefined`, and a skipped block never writes
  `out`, so without it "failed" and "never ran" look the same.
- **Retries still happen**; suppression applies after the activity's retry
  policy is exhausted. Schema-validation failures are non-retryable and
  arrive at once.
- **Not silent.** The block records the same `error` marker a throwing block
  would and warns to the worker log.
- **Cancellation is never suppressed.**
- **`out-error` is sticky, like `out`.** Neither is written when the block's
  `if:` is false, and a repeating `scm` `do` handler reuses one ctx across
  events (a `loop` does not), so a stale `{ message }` from an earlier event
  reads as a fresh failure. In a repeating context, pair the guard with
  something that changes per event, or clear the variable first.

#### Operator-resolvable failures

A failure only an operator can fix — API key missing or revoked, provider
credit or quota exhausted, model retired — is classified by one shared table
and raised non-retryably, so Temporal does not burn retries on a dead key.

By default it does **not** fail the run: the block parks on
`failure-hold:<block-path>` and appears on the Approvals page as "LLM
configuration needs attention", with the failure class, the provider's
message, and a link to the API key's credential (or the `config-id`'s saved
config). The operator chooses:

- **Retry** — the block re-dispatches from scratch (params re-resolved, so a
  corrected config field applies). A repeat failure holds again.
- **Fail run** — fails exactly as it would have without the hold.

```yaml
with:
  on-config-error: fail # opt out: a dead key fails the run
```

- Only the classified configuration failures hold. Rate limits, outages,
  rejected prompts and schema misses fail as usual.
- `fail-on-error: false` wins: the failure goes to `out-error` instead.
- A held block stays `running` in the execution tree; a successful retry ends
  it normally.
- Cancellation is never held. **wftest never holds**: a classified failure
  fails the test at once.

**`failure-hold:` and `confirmation:` are reserved.** The engine derives both
from the block path. A `wait` or `hitl` listening on a name with either prefix
is rejected at import, because a signal reaches every listener registered for
its name in the run, so it would receive the operator's decision as input. A
templated name is checked again at runtime after it resolves, failing the run
non-retryably rather than parking forever. A `signal` block may still _send_
such a name (that is how a workflow cancels an SCM need), and `scm-*` signals
are not reserved: `scm-reply:<need>` is meant to be waited on.

### `js`

Runs a snippet in an isolated V8 heap (32 MB, 5 s). Its `return` lands in
`ctx[out]`.

```yaml
- id: build-payload
  type: js
  with:
    code: |
      return ctx.params.items.map((it) => ({ id: it.id, name: it.name.trim() }));
  out: payload
```

- **Globals:** `ctx` (a copy), `params` (alias of `ctx.params`), `config`,
  `blockPath`, `gkv`, `skv`. Nothing else from ctx is a global.
- Non-deterministic calls (`Math.random()`, `Date.now()`) are fine: the
  result is recorded once and replayed.
- No network or filesystem; use `http` or a dedicated block.
- `gkv` (installation-global) and `skv` (scoped to the workflow id) expose
  synchronous `get`, `has`, `set`; `set` takes JSON values only. Same
  semantics as the [`kv` block](#kv).
- `blockPath` is this block's runtime path, branch tokens and loop suffixes
  included ([paths](paths.md)). Use it to key per-position data instead of
  hard-coding a path. It changes when the block moves, so never persist it as
  an identifier across definition versions.

```yaml
- id: mark-attempt
  type: js
  with:
    code: |
      if (!gkv.has("landlord-notified")) gkv.set("landlord-notified", true);
      return { key: `${blockPath}:attempted` };
  out: attempt
```

### `ledger`

Append-only, project-defined business facts scoped to the running organisation
and project. Stable scopes and entry keys survive replacement executions.
Open explicitly, append facts and read selected keys/pages. Record business
completion as an ordinary fact; later appends remain possible. `claim` is
optional: use it only when different workflow IDs or other platform callers
share a business scope and need a single active
ledger writer. It is not required for normal retries, restarts or projections.
Use `with.fail-on-error: false` and an `out-error` beside `out` to handle a
failed call: `out` becomes `null`, and `out-error` receives `{ message }`.
Success clears the error to `null`. Cancellation is never suppressed.
See the [ledger guide](ledger.md)
for input/output contracts, limits, permissions and retry semantics.

### `kv`

Reads, checks or writes persistent KV entries. `method` is `get | set | has`;
`kind` is `global | scoped` (scoped keys are per workflow id). Both kinds are
per **installation**: a project installed on several orgs gives each its own
namespace.

```yaml
- id: read-status
  type: kv
  with:
    method: get
    kind: scoped
    key: 'status-${ctx.params.eventId}'
  out: statusEntry

- id: write-status
  type: kv
  with:
    method: set
    kind: scoped
    key: 'status-${ctx.params.eventId}'
    value: { notified: true } # JSON only
```

Batch with `entries` (one activity; `get`/`has` return an array):

```yaml
- id: check-notifications
  type: kv
  with:
    method: has
    entries:
      - { kind: global, key: landlord-notified }
      - { kind: scoped, key: tenant-notified }
  out: checks
```

`get` throws if any key is missing. Results are keyed entries: `has` adds a
boolean `has`, `get` adds `value` (scoped ones also `workflowId`); `set`
writes `null`.

### `log`

Records a log event to history for the execution view.

```yaml
- id: log-start
  type: log
  with:
    level: info # debug | info | warn | error; default info
    message: 'Starting run for ${ctx.params.userId}'
```

### `stakeholder`

Records a stakeholder-facing business event on a case: the
`block:stakeholder` timeline marker, plus the case facts projected to the
read-model the portal and support console read. Concepts, audiences, access
and writing guidance: the cases guide.

```yaml
- id: notify-supplier
  type: stakeholder
  with:
    to:
      - { email: '${ctx.propertyManager?.email}', role: Property manager }
      - { id: '${ctx.supplierPartyId}', role: Supplier }
    case: '${ctx.caseRef}'
    type: '${ctx.certificate.name}'
    status: waiting-for-appointment-confirmation
    message: Agency requested appointment confirmation
    title: '${ctx.address} (renewal)'
    subject: property
    dueDate: '${ctx.params.dueDate}'
    next:
      - when: The supplier confirms
        result: The supplier books the inspection and sends the certificate when it is done.
  out: emitted
```

| `with` field    | Required     | Notes                                                                                                                          |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `to`            | yes          | A party id, `{ id, role? }`, `{ email, role? }`, or a list for a broadcast. See below.                                         |
| `case`          | yes          | Case ref. Mint once in the root workflow and thread everywhere; a divergent ref splits one item into two cases.                |
| `type`          | yes          | Case type. Latest-wins.                                                                                                        |
| `status`        | at case open | Business status; omitted on later updates preserves status and next.                                                           |
| `message`       | yes          | One sentence under the status headline.                                                                                        |
| `detail`        | no           | Second, fainter line.                                                                                                          |
| `title`         | no           | Case label. Preserve-when-absent.                                                                                              |
| `subject`       | no           | Singular noun the portal labels cases with ("Properties"). Preserve-when-absent; set it on the case-open emit. Unset: "Cases". |
| `dueDate`       | no           | ISO date or date-time the case should be resolved by. Preserve-when-absent; a later value reschedules.                         |
| `outcome`       | no           | `succeeded`, `failed` or `withdrawn`, on the emit that closes the case. See below.                                             |
| `outcomeReason` | no           | Why, in one sentence (≤ 500 chars). Read only beside `outcome`.                                                                |
| `next`          | no           | What happens next: a sentence, or `{ when?, result }` entries; `[]` says nothing follows. Latest-wins; see cases.  |
| `scmMessage`    | no           | `{ stakeholderId, messageId }` of the SCM message this row projects. See below.                                                |
| `action`        | no           | `{ id, label, signal }`. Recorded only; nothing wires it. Requires exactly one recipient.                                      |

**`to`.** Email entries are resolved to stable party ids by the block's own
trusted activity before the marker is recorded, so the marker and `out` carry
only ids; no `http` call is needed (the resolve endpoint is internal-only).
Address by email at case open, then read the ids off that emit's `out` and
thread them. Empty recipients are dropped; an emit addressing nobody records
nothing. `role` labels the party for support, is stripped from the portal,
and the first role per party wins.

**`status` and `next`.** A case-opening update requires non-empty `status`.
Later updates can omit it to add a timeline row without changing the case's
status or next steps. Such an update must omit `next` too. With status present,
next remains latest-wins: omitting it clears the stage's predictions. A missing
key or `undefined` counts as absent; empty strings and `null` are invalid
statuses. Timeline-only markers and `out` omit status; the timeline shows the
case's effective status at that point in history.

**`outcome`.** Without one, a case's outcome is read off the engine lifecycle
(completed → succeeded, cancelled/terminated → withdrawn, else failed), which
is wrong at both ends. So every exit that closes a case must say which:

- A run that _completes_ after the need went away (opt-out, source event
  cancelled) emits `withdrawn` — closed, rated neither success nor failure.
- A run that _completes_ having given up (handed to a human, ended without
  the thing it was opened for) emits `failed`.

`outcome` is preserve-when-absent; an operator can overrule it from the
console or the executions page.

**`outcomeReason`** is the only account of a failure a member sees (engine
errors are admin-only), so a closing `failed` emit should always carry one,
in the language of the work: "The supplier did not return the certificate
after three reminders." It is stored with its `outcome`, including as none: a
later `succeeded` never inherits an earlier failure's reason.

**`scmMessage`** links a case row to its SCM message: an emit inside an `scm`
block's `do` passes `ctx.event.data` of a `message:inbound`/`message:outbound`
event (extra fields ignored). The support timeline renders a "View in SCM"
link from it. Empty or absent records nothing; a half-filled value fails the
block. Portal-stripped.

Bounds on `next` and `outcome` values mirror the backend's and fail the block
at resolve time rather than at projection.

### `email`

Sends through one of the org's email connectors.

```yaml
- id: notify
  type: email
  with:
    connector-id: postmark-default
    to: ['${ctx.params.userEmail}'] # string or string[]
    subject: '${ctx.composedSubject}'
    body: '${ctx.composedBody}'
    html: true # default false; required with `footer`
    cc: ['ops@example.com']
    from: 'noreply@example.com'
    from-name: '${ctx.params.fromNameTemplate}' # e.g. "${senderName}"
    signal: customer-replied # replies on this connector fire it
    attachments:
      - url: '${ctx.reportUrl}'
        file-name: report.pdf
    template-vars:
      senderName: "${ctx.params.fromName || ''}"
    footer: '${ctx.params.footerConfig}'
    footer-vars:
      propertyManagerFirstName: "${ctx.propertyManager.firstName || ''}"
  out: sendReceipt
```

- `signal`: an inbound reply on the same connector fires it, so a later
  `wait` can resume on the reply.
- `to`, `cc`, `bcc`, `attachments` take their literal shape or a template
  resolving to it. Attachments are downloaded and sent inline.
- `confirm`: see [operator confirmation](#operator-confirmation).
- `recipient-policy: primary-only`: refresh registered recipients and send only
  to each stakeholder's explicit primary. A missing primary retains the existing
  confirmation hold even when `confirm` is false; confirming rechecks contacts
  and cannot bypass it. Secondary stakeholder addresses are excluded from CC
  and BCC. Unregistered recipients retain the explicitly supplied primary `to`.
  Omission or `latest-reply` preserves the native email block's supplied addresses.
- `scm-record: true`: once sent, the email joins the SCM conversation of each
  stakeholder whose address is in `to` (not `cc`/`bcc`), as something we
  said. Nothing else changes for that conversation. Use it to tell a
  stakeholder something whose wording must not pass through the SCM composer,
  such as text derived from untrusted input, while the SCM still knows it was
  said. A stakeholder with no live run records nothing.

#### Send-time `${name}` substitution

Two layers run:

- `${ctx.X}` — resolved by the engine like any block field.
- `${name}` — filled by the email handler afterwards, from `template-vars`
  (in `subject`, `body`, `from-name`; scalar values; escaped in HTML bodies)
  and `footer-vars` (in every string field of `footer`).

A bare `${name}` cannot be written inline: the engine evaluates every `${...}`
as wfexpr first, and a bare identifier throws `InvalidExpression`. Source the
template from ctx with a whole-template reference
(`from-name: '${ctx.params.fromNameTemplate}'`); a whole-template returns its
value verbatim, so the inner `${name}` tokens survive to the handler.

Any `${...}` left after substitution fails the block non-retryably rather than
mailing a placeholder. That includes footer fields with no `footer-vars`.

#### Footer

`footer` is rendered by the shared footer renderer and
spliced before the last `</body>` (or appended). Whitespace-only fields are
dropped after substitution. `html: true` is required with `footer`;
otherwise the block fails non-retryably rather than mail literal tags.

Subflows that send email take the footer and sender-name template as params,
pass them through with placeholders intact, and supply `footer-vars` /
`template-vars` at each email block.

### `sms`

```yaml
- id: notify-phone
  type: sms
  with:
    connector-id: twilio-sms
    to: '${ctx.params.phone}'
    body: 'Your code is ${ctx.code}'
    signal: sms-replied # optional reply hook
  out: sendReceipt
```

`confirm`: see [operator confirmation](#operator-confirmation).

### `whatsapp`

Same `with` shape as `sms`; the connector decides the wire protocol.

```yaml
- id: notify-whatsapp
  type: whatsapp
  with:
    connector-id: twilio-whatsapp
    to: '${ctx.params.phone}'
    body: 'Your code is ${ctx.code}'
  out: sendReceipt
```

### Operator confirmation

`http`, `email`, `sms` and `whatsapp` accept `with.confirm`. When it resolves
truthy, the block records its resolved request and parks on
`confirmation:<block-path>` until an operator chooses on the Approvals page:

- **Confirm** — the side effect runs; `out` gets its normal output.
- **Suppress** — it is skipped; `out` gets `null`.

There is no deadline. `confirm` is stripped from the activity payload.

### `messages`

Reads the replies the platform has correlated to a run's outbound email, SMS
and WhatsApp.

```yaml
- id: load-inbox
  type: messages
  with: # optional
    workflow-id: '${ctx.runId}' # default: this run
    exclude-html: true # default false
  out: inbox
```

Pair a sender's `signal` with a `wait`, then read the thread here for an
`llm` block.

### `scm-attribute-message`

Files an inbound email under a stakeholder its sender is not a contact of: a
third party (an invoicing system, a portal) delivering their document.

```yaml
- id: attribute-invoice
  type: scm-attribute-message
  with:
    message-id: '${ctx.email.messageId}'
    stakeholder: { emails: [{ value: '${ctx.supplierEmail}', is-primary: true }] }
  out: attribution # { stakeholderId }
```

- `stakeholder` takes the [`scm`](#scm) block's shape but is only looked up,
  never created: no match fails the block.
- The stakeholder's conversation keeps the email as document evidence only. It
  fills attachment slots; it cannot answer, consent, set reply channels or
  count as the stakeholder engaging.
- A live SCM run is signalled; none is started. The next run reads the email
  from history.

### `signal` (outbound)

Signals another running workflow, or itself.

```yaml
- id: notify-parent
  type: signal
  with:
    workflow-id: '${ctx.params.parentId}'
    signal: child-done
    payload: '${ctx.result}' # optional
```

`out` receives `null`. The receiver's `wait` or `hitl` gets
`{ name, payload }`.
Optional `run-id` binds delivery to one exact execution. A closed or replaced
execution fails the signal rather than delivering to a new run with the same
workflow id. Without it, delivery uses the workflow's current run.

### `find-waiters`

Finds running workflows in the **same org** parked on a `wait` or `hitl` for
any of the named signals. Feed the result to a `loop` of `signal` blocks to
broadcast.

```yaml
- id: discover
  type: find-waiters
  with:
    signals: [approve]
  out: candidates

- id: notify-each
  type: loop
  over: '${ctx.candidates}'
  as: target
  do:
    - id: send
      type: signal
      with:
        workflow-id: '${ctx.target.workflowId}'
        signal: approve
```

| `with` field       | Required | Notes                                                                               |
| ------------------ | -------- | ----------------------------------------------------------------------------------- |
| `signals`          | yes      | Non-empty array of names (or a template resolving to one).                          |
| `workflow-def-id`  | no       | Only runs of this definition.                                                       |
| `include-self`     | no       | Default `false`: the caller is excluded.                                            |
| `limit`            | no       | Default and maximum `100`; a larger value fails validation.                         |
| `execution-params` | no       | Query the backend DB instead of Temporal visibility, filtering on execution params. |

- **Without `execution-params`:** `[{ workflowId, runId }]` from Temporal
  visibility, which lags by seconds — a just-parked run may be missing.
- **With `execution-params`:** `[{ executionId, executionDbId,
  workflowDefinitionId, signalName, blockId, reason, executionParams }]` from
  the DB, strongly consistent. Prefer it unless you need `runId`.
- Always an array, never `null`.
- **Tenant scoping is forced**: the run's org is injected by the engine, not
  the author.
- **A snapshot, not a subscription.** Peers that park later are missed; peers
  that wake before the signal get a no-op. For guaranteed delivery the
  receiver must re-park or use a durable queue.

### `trigger`

Exposes the run's trigger payload. Fails non-retryably (`MissingTrigger`) if
the run had none. What starts the run is the root [`triggers`](#triggers); a
`with.connector` here is refused at import.

```yaml
- id: read-email
  type: trigger
  out: email
```

### `billing`

Subscription gating and Stripe meter events, placed explicitly in the flow.

```yaml
- id: gate
  type: billing
  with: { action: check-subscription }
  out: subscription

- id: enforce
  type: js
  with: { code: "if (!ctx.subscription.active) throw new Error('inactive subscription')" }

# ... main flow ...

- id: charge
  type: billing
  with:
    action: record-usage
    event: certificate.completion
    stripe-customer-id: '${ctx.subscription.stripeCustomerId}'
    metadata: { propertyId: '${ctx.params.propertyId}' }
  out: billed
```

| `with.action`        | Required                      | Optional                                                   | Output                                                                                                                                  |
| -------------------- | ----------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `check-subscription` | —                             | —                                                          | `{ active, status, stripeCustomerId }`. `active` is true for Stripe `active`/`trialing`; `status: none` when no Stripe customer exists. |
| `record-usage`       | `event`, `stripe-customer-id` | `description`, `event-id`, `stripe-secret-key`, `metadata` | `{ success, billingEventId, meterEventId?, meterValue, alreadyRecorded }`                                                               |

Without `event-id`, the idempotency key is `<runId>.<blockPath>`: activity
retries reuse it, and each loop iteration gets its own.

## Control-flow blocks

### `router`

The first branch whose `when` is truthy runs; `else`, if present, must be last
and appear once.

```yaml
- id: route
  type: router
  branches:
    - when: "${ctx.user.tier === 'pro'}"
      do:
        - id: pro-path
          type: http
          with: { url: 'https://api.example.com/pro' }
    - else:
        - id: fallback
          type: log
          with: { message: 'Unknown tier' }
```

Branches share the parent's ctx: `out`s written inside are visible after the
router.

### `loop`

Iterates `over` an array or `times` a count — exactly one.

```yaml
- id: iterate
  type: loop
  over: '${ctx.users}'
  as: user
  do:
    - id: fetch
      type: http
      with: { url: 'https://api.example.com/users/${ctx.user.id}' }
      out: profile
  collect: profile
  out: profiles
```

| Field     | Required | Notes                                                                                |
| --------- | -------- | ------------------------------------------------------------------------------------ |
| `over`    | one of   | Expression resolving to an array; anything else fails at runtime.                    |
| `times`   | one of   | Count; `as` binds the index `0..n-1`.                                                |
| `as`      | yes      | Per-iteration binding.                                                               |
| `until`   | no       | Checked against the inner ctx after each pass; truthy stops the loop.                |
| `collect` | no       | String: array of `innerCtx[name]`. String array: array of `{ name: value, … }` rows. |
| `do`      | yes      | Body. Each iteration gets a fresh inner ctx, `{ ...outerCtx, [as]: item }`.          |

Writes inside the body do not leak between iterations or out of the loop;
only `ctx[out]` (the collected array) is visible afterwards.

**Cross-iteration visibility.** With `collect` and `out`, each iteration sees
the collected-so-far array at `ctx[out]`, with non-enumerable `first` and
`prev` getters (ignored by JSON and `toEqual`). That drains a cursor API in
one loop:

```yaml
- id: drain-events
  type: loop
  times: 100 # safety cap
  as: i
  until: '${!ctx.page.body.meta.nextToken}'
  do:
    - id: fetch
      type: http
      with:
        url: https://api.example.com/events
        query:
          nextToken: '${ctx.pages.prev?.body.meta.nextToken || null}'
      out: page
  collect: page
  out: pages
```

Prefer `http` [pagination](#pagination) when the API fits it.

### `wait`

Parks the branch until a signal, a duration, or both.

```yaml
- id: wait-for-approval
  type: wait
  with:
    signals: ['approve', 'reject']
    timeout: 24h
  out: signalEvent
```

| Mode                | `with`                        | `out`                                     |
| ------------------- | ----------------------------- | ----------------------------------------- |
| Signal only         | `signals: [...]`              | `{ name, payload }`; waits forever.       |
| Signal with timeout | `signals: [...], timeout: 5m` | `{ name, payload }`, or `null` on timeout |
| Duration            | `duration: 5m`                | `null`                                    |

Durations use the [`ms`](https://github.com/vercel/ms#readme) syntax (`5s`, `2h`, `1d`, `1w`). A `wait` with
neither `signals` nor `duration` fails.

**One arrival wakes every waiter on that name** in the run. For fan-in, give
each branch its own name.

### `scm`

Registers a typed need with the stakeholder communication workflow. This is
the field reference; concepts, conversation behaviour and authoring advice
are in the [SCM guide](scm.md).

```yaml
- id: collect-certificate
  type: scm
  wait: true
  events: [message:outbound]
  with:
    stakeholder: { id: '${ctx.supplier.id}' }
    goal: Collect the signed gas safety certificate
    email:
      subject:
        template: '${ctx.params.supplierEmailSubject}'
        vars: { certificateName: '${ctx.certificate.name}' }
    impersonate:
      id: '${ctx.propertyManager.id}'
      from-name: '${ctx.params.emailFromName}'
      email-footer: '${ctx.params.emailFooter}'
      email-footer-vars:
        propertyManagerFirstName: "${ctx.propertyManager.firstName || ''}"
    slots:
      - name: certificate
        kind: attachment
        description: Once the inspection is complete, please reply with the signed certificate attached.
    outcomes: [[certificate]]
    timeout: 30d
  out: result
  do:
    - id: record-sent-message
      type: log
      with:
        message: '${ctx.event.data.subject}: ${ctx.event.data.bodyText}'
```

Block-level fields:

| Field          | Notes                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wait`         | `true` parks until the need ends and writes the result to `out`. Default `false`: `do` runs per event in the background.                                 |
| `one-need-per` | Expression appended to the need id (`<ref>.<id>#<value>`) so coexisting registrations are separate needs. Key on something stable across restarts.       |
| `events`       | Progress events delivered to `do`: omitted/`[]` none, `true` all, or a list of `need:buffered`, `need:activated`, `message:inbound`, `message:outbound`. |
| `do`           | Runs per event, sequentially in FIFO order, with the event at `ctx.event`. Terminal events always run.                                                   |
| `out` / `as`   | One or the other: `out` writes the result to the enclosing scope (with `wait: true`); `as` only names the binding inside `do`.                           |

`cancel-listeners: { when-filled: [slot, ...], blocks: ["ref.id", ...] }`
cancels matching active listening fibers at fulfilled callback delivery, including
their pending approvals. See [listener lifetimes](scm.md#ending-listeners-when-a-result-arrives).

A non-waiting `scm` block inside a `loop` or another `scm` block's `do`
without `one-need-per` is rejected at import (`unkeyed-repeated-scm-need`).

`with` fields:

| Field           | Notes                                                                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stakeholder`   | `{ id }`, `{ emails: [...] }` or `{ phones: [...] }`, plus optional name fields. Contacts are `{ value, is-primary }`.                                                                                                                   |
| `goal`          | Model-facing context; never shown to the recipient.                                                                                                                                                                                      |
| `label`         | How the recipient knows the request, at most 100 characters. Heads its section when one email covers several needs; defaults to `email.subject`, else a generated label.                                                                 |
| `slots`         | What to collect; see below.                                                                                                                                                                                                              |
| `outcomes`      | Alternative completion sets: non-empty arrays of declared slot names. Fulfilled when every gating slot in any one set is filled.                                                                                                         |
| `briefs`        | `{ name, value, description? }` said unprompted; hold the need open until conveyed.                                                                                                                                                      |
| `references`    | `{ name, value, description? }` used only to answer a question.                                                                                                                                                                          |
| `email`         | `{ subject, body?, must? }`. `subject`/`body` are a final string or `{ template, vars }`, where `vars` is a map or one expression yielding it; `must: true` needs `body`.                                                                |
| `whatsapp`      | Accepted and ignored: SCM conversations are email only.                                                                                                                                                                                  |
| `impersonate`   | `{ id, from-name?, email-footer?, email-footer-vars? }`: sender presentation only. There is no `from-email`; the connector's sender is always used.                                                                                      |
| `timeout`       | Duration until the need is abandoned.                                                                                                                                                                                                    |
| `deadline`      | Absolute deadline, alternative to `timeout`.                                                                                                                                                                                             |
| `follow-up`     | Reminder budget, geometric or `sequence` (not both), with `on-exhaustion: abandon \| hold \| escalate` and optional `weekdays`.                                                                                                          |
| `mode`          | `listen`: hear the stakeholder without conversing. `slots: []`, nothing to ask or tell, no `impersonate`, `events` including `message:inbound`, and a `timeout` or `deadline`; see the [SCM guide](scm.md#listening-without-conversing). |
| `escalation`    | `{ mode: notify, steps: [{ after, email: { to, subject, body } }] }`. See below.                                                                                                                                                         |
| `history-scope` | `since-registration` admits only messages and files after registration.                                                                                                                                                                  |

**`email.subject` templates** resolve flat `${name}` placeholders from `vars`
(scalars) before registration; a missing variable fails registration. With
one active need its subject is used exactly; with several, the composer
merges them into one subject of at most 100 characters. Without one, SCM
writes its own.

**`escalation`** requires `follow-up.on-exhaustion: escalate` and a `timeout`
or `deadline` (an escalated need waits out its deadline). `escalate` without
`escalation` abandons at exhaustion. Each step's `after` is the gap from the
previous notification (the first from exhaustion); `body` is required, since
no composer writes it. Escalations are never parked for approval.

```yaml
timeout: 30d
follow-up:
  maximum-attempts: 5
  initial-interval: 2d
  backoff-coefficient: 1
  on-exhaustion: escalate
escalation:
  mode: notify
  steps:
    - after: 0d
      email:
        to: '${ctx.params.propertyManager.email}'
        subject: Work-order decision needed
        body: <p>The supplier has not responded. Please help resolve this.</p>
```

#### Slots

| Field                  | Notes                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `name`                 | Key in the result's `slots` map.                                                                                          |
| `kind`                 | `string`, `number`, `boolean`, `date`, `enum`, `attachment`.                                                              |
| `description`          | **Recipient-facing**: the slot is asked for, and reminded about, in these words.                                          |
| `required`             | `false` asks without gating on the answer, chasing it, or abandoning over it. Without `outcomes`, `true` slots are ANDed. |
| `options`              | `enum` values.                                                                                                            |
| `default`              | See [SCM slot defaults](#scm-slot-defaults).                                                                              |
| `self-checks`          | Yes/no questions the extractor answers per proposed value; an unclear or negative answer becomes a clarification.         |
| `validate`             | wfexpr predicate over `value`. Requires `validate-description`.                                                           |
| `validate-description` | The sentence a refusal is built from — never the expression.                                                              |
| `must-be-future`       | `date` slots: reject past dates in replies.                                                                               |
| `mime-types`           | `attachment` slots. Default `application/pdf`, `image/*`.                                                                 |
| `quick-actions`        | `boolean`/`enum` one-click choices; see [Quick actions](#quick-actions).                                                  |

**Slot values are typed.** A `boolean` slot resolves to a real boolean, a
`number` to a number, `string`/`date` (ISO-8601)/`enum` to strings, and an
`attachment` to inbox metadata `{ id, filename, mimeType, size }` (never
model-supplied names). Compare with `=== true` and do arithmetic directly;
the same holds in wftest mocks. A proposed value of the wrong kind is
refused, never coerced.

**`validate` is fail-closed and model-blind.** A value the expression
rejects, a value of the wrong kind, or an expression that errors becomes a
clarification instead of a write. A `validate` that does not parse fails at
registration. The extractor never sees the expression; `self-checks` remain
the way to make the model weigh a judgement call. `validate-description` is
required because the refusal is worded from it, and only the author knows
whether an expression holds something internal (an allow-list of codes).

```yaml
slots:
  - name: epcUrl
    kind: string
    description: The official gov.uk EPC certificate URL
    validate: "value.startsWith('https://www.gov.uk/')"
    validate-description: the link must be on the official gov.uk register
```

**Optional slots in an outcome.** Mark a slot `required: false` to ask for it
alongside the gating ones without waiting on it. An outcome whose members are
all `required: false` gates nothing: the need is fulfilled at registration
and nobody is contacted.

```yaml
slots:
  - name: agencyArrangementAccepted
    kind: boolean
    description: Please confirm you are happy for us to arrange the inspection.
  - name: selectedService
    kind: enum
    required: false
    description: Please let us know which of the offered service options you would like.
    options: ['${ctx.services[0]}', '${ctx.services[1]}']
    default: '${ctx.services[0]}'
outcomes:
  - [agencyArrangementAccepted, selectedService]
```

**Result.** With `wait: true`, `ctx[out]` and the block's output marker hold
`{ needId, outcome, slots }`; the terminal event runs `do` first, after any
progress events queued ahead of it. Shape and outcomes: [SCM guide](scm.md).

#### SCM slot defaults

A default fills an unanswered slot **in the returned result only**. While the
need runs, the slot stays unanswered, so a required slot still needs an answer
for its outcome to complete.

- Any non-attachment slot may declare one, required or not.
- It must match the slot's `kind`, be one of an `enum`'s `options`, and pass
  the slot's `validate` — checked at registration. `must-be-future` checks
  replies, not defaults.
- A stakeholder answer always wins; the default applies wherever nothing was
  captured, including a slot asked about and given up on.
- With `outcomes: [[appointmentDate, selectedService], [certificate]]`, a
  certificate completes the second set and the result's `selectedService`
  takes its default. An abandoned need stays abandoned with defaults filled;
  a canceled need gets none.
- For a slot no outcome requires, the opening message asks for it and says
  what will be assumed. Required slots' defaults are never advertised as
  permission to skip.
- A defaulted slot arrives as `{ status: "filled", value, isDefaulted: true }`;
  check `isDefaulted` where assumed and stated must differ.

#### Quick actions

```yaml
slots:
  - name: accepted
    kind: boolean
    description: Please confirm whether you are able to accept the work order.
    self-checks:
      - Did the supplier explicitly accept or decline the work order?
    quick-actions:
      heading: Do you accept the ${ctx.certificate.name} work order for ${ctx.address}?
      choices:
        - { value: true, label: Accept work order }
        - { value: false, label: Decline work order }
```

- A nonblank `heading` and at least one choice, each with a nonblank `label`.
  `boolean` values are real YAML booleans; `enum` values are strings from
  `options`.
- The heading is recipient-facing: it titles a single decision, heads each
  slot's buttons when an email carries several, and is the confirmation
  page's context — so name the subject in it.
- Buttons accelerate; the prose still asks and a free-text reply still works.
  A subset of values is allowed, but buttons read as the whole answer space,
  so offer every real answer unless steering is intended.
- **One declaration, two surfaces**: the email links and the stakeholder
  portal buttons come from the same declaration, retire together when the
  slot settles, and a press racing a click on the other surface is rejected
  as a duplicate.
- A decision answerable from the portal belongs here, not in a `stakeholder`
  block's `action`, which is wired to nothing.
- The email footer adds a "See all open requests" portal link when the
  stakeholder's party has a valid case grant. That is backend policy; the
  block cannot enable, word or scope it.

### `hitl`

Human-in-the-loop pause: records an operator form and parks until the signal
fires.

```yaml
- id: review
  type: hitl
  with:
    signal: review-decision
    reason: Confirm the customer's address
    fields:
      - { name: address, type: text, label: Address, required: true }
      - { name: notes, type: textarea, label: Notes }
      - { name: count, type: number, default: 0 }
      - name: priority
        type: select
        label: Priority
        options:
          - { value: high, label: High }
          - { value: low, label: Low }
        default: low
    timeout: 7d
  out: decision
```

| `with` field | Required | Notes                                                                                                    |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------- |
| `signal`     | yes      | The signal the operator's submission fires.                                                              |
| `reason`     | no       | Shown to the operator. Any length.                                                                       |
| `fields`     | no       | `text`, `textarea`, `number`, `select` (needs `options`); `label`, `required`, `placeholder`, `default`. |
| `timeout`    | no       | `ms` duration; on timeout `out` is `null` and the run continues.                                         |

`ctx[out]` receives the submitted payload, or `null` on timeout.

### `subflow`

Runs another block sequence inline in the same run (not a child workflow),
with isolated ctx.

```yaml
- id: summarize
  type: subflow
  ref: summarize-user
  params:
    profile: '${ctx.userProfile}'
  out: summary
```

| Field        | Required             | Notes                                                                                       |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------- |
| `ref`        | yes                  | Registered subflow name, or a `${...}` template; see [Dynamic dispatch](#dynamic-dispatch). |
| `candidates` | with a dynamic `ref` | Names a templated `ref` may resolve to. Required exactly when `ref` holds `${...}`.         |
| `params`     | no                   | Becomes the subflow's `ctx.params`; resolved against the caller's ctx.                      |
| `out`        | no                   | Receives the subflow's `return`.                                                            |

Definition fields (`params`, `blocks`, `return`) are described under
[Subflow files](#subflow-files).

#### Dynamic dispatch

```yaml
- id: dispatch
  type: subflow
  ref: '${ctx.current.node.ref}'
  candidates: [node-decide, node-ask-landlord, node-settle]
  params: { state: '${ctx.current.state}' }
  out: outcome
```

`candidates` keeps the call statically analysable: the analyser checks each
for `unknown-subflow-ref`, import and the dependency graph count each as a
dependency, the project graph draws a dashed edge to each, and wftest treats
every candidate's blocks as reachable. At runtime a resolved value that is
not a string or not in `candidates` fails the block non-retryably, even if
it names a registered subflow; the message names the block, the value and
the list. The resolved name is recorded on the block's input marker.

Every candidate's body runs under the same calling block id
([paths](paths.md#block-names-vs-block-paths)), so an id shared by two candidates has one runtime
path whichever runs.

### `state-machine`

Philosophy, choosing it, and a worked example: the
[state machine guide](state-machine.md). This is the block contract.

```yaml
- id: approval
  type: state-machine
  with:
    input: '${ctx.application}'
    start: review
    state:
      schema:
        type: object
        props:
          attempts: integer
      initial:
        attempts: 0
    max-transitions: 5
    nodes:
      review:
        ref: approval-review
        on:
          retry: review
          accepted: finish
      finish:
        ref: approval-finish
        terminal:
          outcome: accepted
  out: approvalResult
```

- `input` and `state.initial` resolve once on entry. A node sees only
  `ctx.params.input`, `ctx.params.state` (a copy) and `ctx.params.node.id`.
- `start` names a node. Each node has either a literal `ref` or inline
  `blocks` with an explicit `return`, and exactly one of `on`
  (at least one completion) or `terminal`. Every target exists, every node is
  reachable from `start`, every reachable node can reach a terminal, terminal
  outcomes are unique. Node ids, completions and outcomes are kebab-case.
- `max-transitions` is a positive safe integer bounding **edges**, so a
  terminal reached on the last allowed edge still returns.
- A nonterminal node returns exactly `{ completion, reason?, stateUpdate? }`;
  `completion` must be in its `on`. `stateUpdate` is a shallow top-level
  patch. A terminal node returns exactly `{ result, reason? }` (`result`
  required, may be `null`). A reason is nonblank, ≤ 500 code points.
- `out` receives `{ outcome, reason?, result }`; one transition record is
  emitted per accepted edge.
- The state schema has an object root and is checked as a **closed** object:
  undeclared keys fail unless a `propx` permits them; optional properties may
  be absent but not `undefined` or `null`; sparse arrays and non-finite
  numbers fail. An invalid result or update fails before any edge is
  recorded.
- Nodes may contain waits and nested machines; each visit gets its own
  runtime path ([paths](paths.md)).
- Inline bodies use the same isolated params and return contracts as referenced
  subflows. `blocks: []` supports projection-only nodes. Inline block ids belong
  to the enclosing definition and must be unique across all its blocks.

```yaml
nodes:
  notify:
    blocks:
      - id: describe-ready
        type: log
        with: { message: 'Ready for ${params.input.order}' }
    return: { completion: notified }
    on: { notified: review }
  review:
    ref: approval-review
    on: { accepted: finish }
  finish:
    blocks: []
    return: { result: '${params.state}' }
    terminal: { outcome: accepted }
```

### `parallel`

Runs branches concurrently; resumes when **all** settle. Each branch gets a
shallow clone of the parent ctx: reads see parent values, writes stay
branch-local.

```yaml
- id: enrich
  type: parallel
  branches:
    - id: from-crm
      do:
        - id: fetch
          type: http
          with: { url: 'https://crm.example.com/users/${ctx.user.id}' }
          out: crm
      return: '${ctx.crm}'
    - id: from-billing
      do:
        - id: fetch
          type: http
          with: { url: 'https://billing.example.com/users/${ctx.user.id}' }
          out: billing
      return: '${ctx.billing}'
  out: enriched # [crmResult, billingResult]
```

| Branch field | Required | Notes                                                                                             |
| ------------ | -------- | ------------------------------------------------------------------------------------------------- |
| `id`         | yes      | Runtime path token (`<parallel-id>.<branch-id>.<inner>`), shared by markers and wftest matchers.  |
| `do`         | yes      | Branch body.                                                                                      |
| `return`     | no       | Same shapes as a [subflow `return`](#subflow-files), over the branch's final ctx. Absent: `null`. |

If any branch errors, the others are cancelled, the first error propagates,
and `out` is not written.

Ordinary leaf executions in independent branches overlap, including HTTP,
LLM, JS and email. SCM registration/reassertion, subscription entry/completion
and structural control flow run serially; their activities can hold further
dispatch until completion. Ordinary leaves inside a subscription's `do` body
can overlap leaves in other branches. Blocks within each branch remain sequential. Results are returned
in branch declaration order, regardless of completion order.

### `race`

Same shape as `parallel`; resumes when **any** branch settles and cancels the
rest. When two settle on the same step, the first listed wins. If the winner
errored, the error propagates.

```yaml
- id: race-response
  type: race
  branches:
    - id: ok
      do:
        - id: wait-ok
          type: wait
          with: { signals: ['approved'] }
          out: signal
      return: '${{ status: "approved", payload: ctx.signal }}'
    - id: timeout
      do:
        - id: wait-to
          type: wait
          with: { duration: 24h }
      return: '${{ status: "timed-out" }}'
  out: outcome
```

### `workflow`

Starts a child workflow and returns once it has started, not when it
completes.

```yaml
- id: spawn-child
  type: workflow
  with:
    id: process-order # the child def's `ref`
    params:
      orderId: '${ctx.order.id}'
  out: childHandle # { workflowId, runId, firstExecutionRunId, status }
```

`status` is the child's lowercase-kebab workflow state: `running` for a fresh
start; for an idempotent join, whatever the existing run is (`running`,
`paused`, `completed`, `failed`, `terminated`, `cancelled`, `timed-out`,
`unknown`).

The child's id is `<childRef>-<uuid>`. The uuid comes from the
replay-seeded `Math.random`, so a replay targets the same child rather than
spawning another.

**Idempotent child starts.** When the _child_ def declares
`idempotency: { key }`, its id is `<run's org id>-<resolved key>`, started
with reject-duplicate reuse so a closed run is never extended. If a run with
that id exists, running or closed, the block joins it and reports its
`status`. Top-level starts share the same model.

**A key template is not wfexpr.** It substitutes dotted paths only —
`${ctx.<path>}`, or the aliases `${params.<path>}` / `${trigger.<path>}`,
which coin the same id. `config`, block outputs, `env`, and any operator,
call, ternary or default do not resolve, and an unresolved placeholder throws
at start. The resolved value must be a string, number or boolean.

**Key on `params` if the def can be a child.** `trigger` resolves only for a
top-level start given a trigger payload; a child start passes `params`
alone, so a `trigger` key throws there.

To wait for a child, have it `signal` the parent and `wait` on that:

```yaml
- id: spawn
  type: workflow
  with: { id: child-def, params: { ... } }
  out: child

- id: await-child
  type: wait
  with:
    signals: [child-done]
    timeout: 1h
  out: childResult
```
