# `llm` block

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
| `mcp`             | no       | `model` only. Manifest MCP servers by key; see [MCP tools](../yaml.md#mcp-tools).                                                     |
| `max-steps`       | no       | Model turns a tool loop may take. Default `30`. A loop still calling tools at the limit fails the block without retries.    |
| `prompt`          | yes      | Prompt text.                                                                                                                |
| `schema`          | no       | **Standard JSON Schema** (`properties`, per-object `required` arrays, `additionalProperties`). Enables JSON mode + retries. |
| `max-retries`     | no       | Schema-validation retries. Default `3`.                                                                                     |
| `attachments`     | no       | `{ url, media-type, file-name? }`; `url` may be `attachment:<id>`. Reused across retries.                                   |
| `fail-on-error`   | no       | Default `true`. `false` writes `null` to `out`; see [Suppressing a failure](../yaml.md#suppressing-a-failure).                        |
| `on-config-error` | no       | `hold` (default) or `fail`; see [Operator-resolvable failures](../yaml.md#operator-resolvable-failures).                              |

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

## MCP tools

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

## Suppressing a failure

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

## Operator-resolvable failures

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

## Output

The model's text, or the parsed object when `schema` is set. With `fail-on-error: false`, `null` on failure, and `out-error` holds `{ message }` (or `null` on success).

## On failure

Retried 5 times. A response that still misses the schema after `max-retries` fails without retry (`SchemaValidationExhausted`). A missing, invalid or out-of-credit API key, or a retired model, holds the block on the Approvals page instead of failing (`on-config-error: fail` opts out). A `model` that is unset or not the settings shape fails the block at once.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

Block fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `out-error` | string | no |  |

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `model` | object \| string | no |  |
| `config-id` | string | no |  |
| `system-prompt` | string | no |  |
| `mcp` | object \| string | no |  |
| `max-steps` | integer \| string | no |  |
| `prompt` | string | yes |  |
| `schema` | object \| one of several shapes \| string | no |  |
| `max-retries` | number \| string | no |  |
| `attachments` | object[] \| string | no |  |
| `fail-on-error` | boolean \| string | no |  |
| `on-config-error` | "hold" \| "fail" | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).


## Used in

[09-document-intake](../../templates/09-document-intake/README.md), [10-llm-classification](../../templates/10-llm-classification/README.md)
