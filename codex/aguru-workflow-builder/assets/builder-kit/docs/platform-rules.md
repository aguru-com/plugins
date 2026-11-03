# Platform rules

Facts the platform enforces that you cannot see from the outside. Each one has
cost someone a day. Read this before writing a workflow, and again when
something behaves in a way the reference does not explain.

## Runs and definitions

- **Never delete a workflow definition.** Deleting it deletes every run it
  ever had. Redeploy with `import --update-existing`, which replaces it in
  place.
- **A run keeps the definition it started with.** A re-import changes only
  runs started afterwards. A run still going, parked ones included, cannot move to a new
  definition. Restart-with-new-definition accepts only a run that failed, was
  cancelled, was terminated or timed out, and starts it again from the top.
- **Config is live.** An installation edit reaches running runs between
  blocks. Computed values (a loop's items, a `wait` deadline, a finished
  block's output) stay as they were.
- **Concluding setup starts `setup.activates` once, with no params.** Point
  it only at a workflow that needs none. Schedules come only from
  `setup.schedule`.
- **An org's customised config survives a re-import.** Changing a
  `defaultValue` in the manifest does not reach an org that already set the
  field.

## Limits

- **A `js` block has 5 seconds and 32 MB.** It has no network or filesystem;
  use `http`.
- **An `http` response is capped at 8 MiB** and fails the block, without
  retries, when over.
- **`http` cannot reach private addresses.** localhost, private ranges and
  cloud metadata hosts are refused, so a live run needs your API on a public
  address.

## Expressions

- `${...}` is wfexpr, not JavaScript. No `Date`, `Math`, `JSON`, regexes,
  spreads or template literals; `Number`, `String` and `Boolean` are the only
  calls. Move such work into a `js` block. See [wfexpr.md](wfexpr.md).
- **Precompute strings for prompts.** A method call on a value inside a long
  prompt template, such as `.join(", ")`, can leave the block dispatched but
  never finished. Build the string in a `js` block and interpolate the
  result.
- `'${expr}'` alone keeps the value's type; `'text ${expr}'` makes a string.
  `null` and `undefined` render as empty strings.
- `when:` belongs only to `router` branches. On any other block it is
  ignored and the block always runs; use `if:`.

## Schemas and data

- **`required` defaults to true** and is set per property, not as a list on
  the parent. Optional means the key may be absent, not `null`.
- **Gate on emptiness, not truthiness.** `[]` is truthy and `""` falsy; write
  `x != null && x.length > 0` when that is what you mean.
- **An `llm` block's model sees only the properties its schema declares.**
  Declare every field you read from its output.
- **External APIs often send numeric ids; subflow params are strings.**
  Convert with `String(...)` where the value enters your workflow.
- **A misspelled key in a manifest field definition is dropped silently**
  (`defaultValue`, `description`, `required`...). Copy field shapes from a
  template; see [manifest.md](manifest.md).
- **YAML merge keys (`<<:`) are not supported.** Plain anchors and aliases
  are.
- **The engine reports a malformed block as "Invalid input"** without saying
  which field. Run `node scripts/check-definitions.mjs <file>` for a specific
  message; the edit hook does it for you.

## Subflows

- Declare `kind: subflow` and shape the output with `return`; the caller sees
  only that value, or `null` without one.
- Declare every param a subflow reads. An undeclared one is rejected at
  import, and a typo in one runs with a blank value.
- A subflow sees only its params and its own blocks, never the caller's ctx.
  Config is the exception: every subflow reads `config` directly. Never pass
  config as a param.

## Secrets and connectors

- **Refer to secrets by name**: `{{ secret("acme-api-token") }}`. Never put a
  value in YAML. The engine never sees it; the value is substituted just
  before the request leaves.
- An `llm` block's `model.api-key` and a send block's `connector-id` name
  records in your org. They are looked up when the block runs, so a run is
  the first place a wrong name shows up.

## Third-party connectors

- **Pin the installed version exactly.** `version` must be the one in
  [connectors/README.md](connectors/README.md); any other fails the block.
  The schema check catches it, and an unknown action or input.
- **Only actions run.** Connector triggers are not available, nor actions
  that need files, waitpoints (approval buttons that wait for a click) or a
  native driver. Start runs and wait with native blocks.
- **Inputs the product loads from the provider** (channels, users, lists) are
  written as the value itself, usually an id.
- **Set `auth-type` when a connector has several methods.** Without it the
  platform guesses from the credential's shape.
- **A credential is looked up when the block runs**, in the org that runs it.
  Read its key from config, never a param. Browser-saved credentials cannot
  be used.
- **Retries can repeat a provider side effect.** A failed attempt is
  retried; a message may be posted twice.
- **The output is the connector's own shape.** Read one real run's output
  before reading fields from it; a text action's result can carry invisible
  characters.

## Stakeholder conversations (SCM)

- **The org needs an LLM connector and an email connector** on the SCM page,
  or every `scm` block fails with `ScmNotConfigured`.
- **Approval is on by default.** A first run that "does nothing" usually has
  a draft waiting on the Approvals page.
- **`slots` is required**, even for a need that only conveys briefs:
  write `slots: []`.
- **Keep `${name}` subject and body templates in params or config.** Written
  inline, `${name}` is read as an expression first and fails.
- **Name the subject in every description, self-check and quick-action
  heading.** The SCM reads the whole conversation history, so "I accept"
  from an earlier request can otherwise answer this one.
- **A non-waiting `scm` block that can run several times at once needs
  `one-need-per`**, keyed on the thing (a job id), never a position or a
  timestamp.

## Known issues

- **`kv` blocks do not run yet.** The engine skips them, so `out` stays
  unset and a later read of it fails the run. Until the fix ships, use
  `gkv` / `skv` in a `js` block, or an idempotent child workflow to
  de-duplicate, as template 06 does.

## Testing

- **Mock every `kv` block.** KV reads the platform's store, which tests do
  not have; `gkv` and `skv` calls in `js` or expressions fail there too.
- **wftest mocks side effects, so a green suite proves logic, not
  integration.** Run the workflow on the platform before you ship it.
- **A mocked `http` block never fails**, whatever `success` the mock returns.
  To test an error path, set `fail-on-error: false` and branch on `success`.
- **Always mock `scm`.** It is not guarded like the other side-effect blocks.
- **Mock every `activepiece` action that reaches a provider.** It is not
  guarded either: an unmocked one runs for real. An offline one (text, JSON,
  formatting) can run for real, which is the best test of its output.
- **A secret reference never resolves in a test.** In `expect-in` it reads as
  `{ __secretRef: true, parts: [...] }`.
- **Objects match partially in assertions.** `expect-in` proves a request
  carries a field, never that it carries nothing else.
