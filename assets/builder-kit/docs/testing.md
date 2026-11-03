# wftest — writing workflow tests

How to write, run and organise `*.test.yaml` tests for workflow definitions.
How the runner works inside is in the wftest architecture doc.

wftest compiles each test file into vitest cases and drives them through a
time-skipping Temporal test server, using the same engine code as production.
A test demonstrates runtime behaviour, not a test-mode imitation of it.


## Test file structure

Tests live at `<project>/test/<workflow-dir>/<workflow-file>.test.yaml`, not
beside the workflow YAML. Fixtures sit beside the test that reads them.

```yaml
ref: my-workflow # the workflow or top-level subflow under test

e2e: # at least one tier must be non-empty
  - it: …

unit:
  - it: …
    block: my-block # dotted definitional path

integration:
  - it: …
    from: first-block # dotted paths sharing one parent
    to: last-block
```

`ref` resolves flat across every workflow and subflow in the project.

### A test case

```yaml
- it: name of the test # or it.skip / it.only, or skip: true / only: true
  timeout: 5m # default 10m
  params: { … }
  config: { … }
  trigger: { … }
  ctx: { … } # unit / integration only
  mocks: […]
  events: […]
  allow-real: … # matcher
  post-run: […]
```

| Field        | Notes                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `it`         | Exactly one of `it`, `it.skip`, `it.only` as the title key. A test cannot be both skip and only.                                |
| `timeout`    | Duration string (`5m`, `30s`) or ms.                                                                                            |
| `params`     | Validated against the `ref`'s `params:` schema on **every** tier, so supply a valid placeholder even when the block ignores it. |
| `config`     | What the run reads as `config.<field>`. See [Configuration](#configuration).                                                    |
| `trigger`    | Lands on `ctx.trigger`.                                                                                                         |
| `ctx`        | Pre-fills what upstream blocks would have produced.                                                                             |
| `mocks`      | See [Mocks](#mocks).                                                                                                            |
| `events`     | See [Events](#events).                                                                                                          |
| `allow-real` | Lets matched side-effect blocks run for real. See [Boundary guards](#boundary-guards).                                          |
| `post-run`   | See [Post-run assertions](#post-run-assertions).                                                                                |

`params` and `config` may each be a whole `fixture:` ref. Every field is
strict: an unknown key fails compilation.

### `describe` groups

```yaml
e2e:
  - describe: happy paths
    tests:
      - it: sums small numbers
        params: { a: 2, b: 3 }
        post-run:
          - return: { result: 5 }

  - describe.skip: under construction
    tests:
      - it: would fail if it ran
        params: { a: 1, b: 1 }
        post-run:
          - return: { result: 99999 }
```

Groups nest and work on every tier, but hold only that tier's cases. Modifiers
(`describe.skip`, `describe.only`, `skip: true`, `only: true`) cascade to every
nested test.

## The three tiers

| Tier          | Runs                                       | Use for                                                                     |
| ------------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| `unit`        | One block (with its children) in isolation | One block's contract: input, output, branch condition. Most tests.          |
| `integration` | A contiguous slice of sibling blocks       | A chain whose blocks only make sense together (validate → enrich → notify). |
| `e2e`         | The whole workflow                         | Acceptance: golden paths, branch coverage, the return shape. A handful.     |

Every tier takes the same `mocks`, `events` and `post-run`. Unit and
integration run the target in a synthetic workflow whose ctx is primed from
`params`, `trigger` and `ctx`; no upstream block runs.

### Unit

```yaml
ref: unit

unit:
  # The loop wrapper is dropped; the test supplies the loop's binding.
  - it: doubles a single item
    block: loop-1.double
    params: { items: [] } # required by the schema, unused here
    ctx: { item: 7 }
    events:
      - on: double
        expect-out: 14

  - it: doubles every item in the list
    block: loop-1
    params: { items: [1, 2, 3] }
    events:
      - on: loop-1
        expect-out: [2, 4, 6]
```

`block:` is a definitional path ([paths](paths.md)). Event matchers inside a
unit test see paths relative to the synthetic root: `double`, not
`loop-1.0.double`.

### Integration

```yaml
ref: integration

integration:
  # Skips `validate`; primes its output directly.
  - it: doubles and stamps a pre-validated value
    from: double
    to: stamp
    params: { value: 0 }
    ctx: { validated: 7 }
    events:
      - on: stamp
        expect-out: { value: 14, status: ok }
```

`from` and `to` must share a parent: top level, a loop body or a subflow body.
`from === to` is a single-block range.

### E2E

```yaml
ref: demo

e2e:
  - it: sums two numbers
    params: { a: 2, b: 3 }
    post-run:
      - block: sum
        called: true
      - return: { result: 5 }
```

A `ref` naming a top-level subflow (`kind: subflow`) works on every tier: the
runner wraps the subflow's blocks in a synthetic workflow whose `return`
mirrors the subflow's, and paths are written against the subflow's own tree.
Test a subflow at its own `ref`, not only through its callers.

## Configuration

```yaml
e2e:
  - it: chases the landlord over the configured window
    params: { propertyId: 'p-1' }
    config:
      crmBaseUrl: https://crm.example.test
      notifyLandlordWaitDays: 7
```

Omitted, every field reads `undefined`, as an unset field does in production.
Config has no schema, so nothing validates it.

Unit and integration inject it into the primed engine state. An e2e run takes
the production path, calling the `resolveConfig` activity, which the harness
stubs to return the test's `config:`. Stubbing the activity rather than
branching in workflow code keeps the tested history the shape production
replays.

**A real child workflow is invisible to the test.** It runs under a runtime id
no test registered, so it resolves `{}` config, and the recorder, events and
coverage never see its blocks. Mock the `type: workflow` block.

## Mocks

A successful mock replaces a block's dispatch with a value in `ctx[block.out]`.
An error mock runs the real LLM or ledger handler and injects a failed activity
call. The handler validates its inputs, records its start marker and applies
its normal failure handling; the provider or ledger service is not called.

```yaml
mocks:
  - block: sum
    out: 999

  - block: ['**.fetch-user', '**.lookup'] # alternatives
    out-seq: [1, 2, 3] # call N returns entry N

  - block: discover
    out: 'fixture:./discover-result.json'

  - block: save-ledger
    error: { message: Conflicting ledger entry }
```

| Field      | Notes                                                                                  |
| ---------- | -------------------------------------------------------------------------------------- |
| `block`    | [Matcher](#block-path-matchers).                                                       |
| `out`      | Returned by every matched dispatch. Choose exactly one of `out`, `out-seq` or `error`. |
| `out-seq`  | One entry per matched dispatch. A fixture ref to an array, or per-entry fixture refs.  |
| `error`    | `{ message: "..." }` returned as a failure on every matched LLM or ledger dispatch.    |
| `optional` | May match zero times. Not combinable with `times`.                                     |
| `times`    | Must match exactly this often. With `out-seq`, must equal its length.                  |

Mocks are invocation contracts. Each must match at least once unless
`optional`; `times` and `out-seq` must be consumed exactly, and running past
the end of `out-seq` fails. The first matching mock wins, so put specific
matchers before broad globs. A mock on a container (a subflow call, a
state-machine) skips everything inside it.

### Mock a failure

Use an error mock to exercise the workflow's error handling. For example, this
ledger block lets the workflow recover from a failed call:

```yaml
- id: save-ledger
  type: ledger
  out: saved
  out-error: saveError
  with:
    action: append
    scope: '${params.orderId}'
    key: approved
    payload: { approved: true }
    fail-on-error: false

- id: recover
  type: log
  if: '${ctx.saveError != null}'
  with: { message: 'Could not record approval: ${ctx.saveError.message}' }
```

Its test can supply a failure and verify the recovery branch:

```yaml
mocks:
  - block: save-ledger
    error: { message: conflict }
post-run:
  - block: recover
    called: true
  - status: completed
```

Error mocks support `llm` and `ledger` blocks. First-match-wins applies before
checking that restriction: an earlier success mock can cover an HTTP block
while a later wildcard error mock covers the remaining LLM/ledger blocks.
The block's resolved
`with.fail-on-error` controls the result, including when it is a template:

- `false` writes `null` to `out` and `{ message }` to `out-error`, records an
  error terminal and continues. The error branch runs normally, so a broken
  template reference there fails the test.
- `true` or omitted fails the block. Assert that with `post-run: error` and
  `status: failed`; the error message is the mock's message.

Successful mocks clear `out-error` to `null`. Blocks skipped by `if` leave both
channels untouched and do not consume a mock invocation. Error mocks simulate
a failed call; the remote call is never made. They do not run activity retries
or represent cancellation. The injected failure has the same `ActivityFailure`
shape as a failed call, so failure reports classify it as an activity failure.
Invalid block inputs fail validation before injection and are not suppressed.
`error.message` is literal text, not a fixture
reference. Use `optional` and `times` as with successful mocks.

The mock-error examples
cover both block types, failure policies, success, skips and a broken recovery
reference.

### Boundary guards

Every reachable block that makes an off-box call — `http`, `llm`, `email`,
`sms`, `whatsapp`, `messages`, `scm-attribute-message`, `billing`, `ledger`,
`find-waiters`, `workflow`, `signal` — gets an implicit zero-call mock unless
the test approves it. Reaching an unapproved one fails the test with its real
call suppressed. A block is approved by any of:

- a `mocks` entry on it or an ancestor;
- an `expect-in` event, or a `called: true` / `times: N` post-run assertion,
  on it — it then returns `null` without calling out;
- a `called: false` / `times: 0` post-run assertion on it;
- a `signal` event named `confirmation:…` on it;
- `allow-real` matching it — the only way it really calls out.

`stakeholder` is not guarded: off the production task queue it makes no
backend call and resolves deterministically, so it runs for real.
`activepiece` is not guarded either, but an unmocked one runs the real
connector action, provider calls included: mock every action that reaches a
provider.

## Events

Entries that fire **on every dispatch** whose path matches `on:`. Each entry is
exactly one kind:

```yaml
events:
  - on: wait-signal
    signal: { name: go, payload: { ok: true } }

  - on: timer-wait
    skip-time: 3h # advance the virtual clock

  - on: classify
    expect-out: { category: high-priority, confidence: 0.92 }

  - on: notify-each.*.send
    expect-out-seq: [{ ok: true }, { ok: true }, { ok: false }]

  - on: send-email # resolved input; needs no real send
    expect-in:
      to: ['supplier@example.test']
      subject: 'Certificate needed'
```

| Field            | Effect per matched dispatch                            |
| ---------------- | ------------------------------------------------------ |
| `signal`         | Sends `{ name, payload? }` to the workflow under test. |
| `skip-time`      | Advances virtual time by a duration or ms.             |
| `expect-in`      | Asserts the block's resolved input.                    |
| `expect-out`     | Asserts the block's output.                            |
| `expect-out-seq` | Asserts the Nth matched output against entry N.        |

### Every match fires

Events are not fire-once. A `signal` whose `on:` matches twice sends twice; a
`skip-time` skips twice; `expect-out` asserts the same value on both outputs.
For a one-shot effect, match a single dispatch: a literal id that runs once,
not a glob across a loop body.

### Ordering

Events matching one dispatch run in **YAML order**. Signals, time skips and
ready assertions share one serial queue, so same-tick triggers never race.

### Deferred asserts

`expect-*` waits until the matched dispatch's output is observable, which for
a loop, subflow, `parallel` or `race` is ticks after dispatch. The first failed
assertion silences everything queued after it, so a test fails with one
message.

### End-of-run failures

| Category   | Means                                                                               |
| ---------- | ----------------------------------------------------------------------------------- |
| `unfired`  | An event's `on:` never matched — usually a typo or renamed block.                   |
| `unready`  | An assert matched, but the output never landed (block failed, run exited mid-flow). |
| `underrun` | An `expect-out-seq` matched fewer times than it has entries.                        |

More matches than entries fails immediately instead.

### State-machine visits

A machine dispatches once at its own path; each node visit dispatches at
`<machine>.<visit>.<node>`, where `visit` is a global zero-based visit index.
Blocks in the node's body sit below that: `approval.0.review.check`, then
`approval.1.review.check` after a self-edge.

```yaml
events:
  - on: machine.*.decide # the node body's validated return
    expect-out-seq:
      - { completion: again, stateUpdate: { count: 1 } }
      - { completion: done, stateUpdate: { count: 2 } }
  - on: machine # the machine's public value
    expect-out: { outcome: complete, result: { count: 2 } }
post-run:
  - block: machine.*.decide.choose
    times: 2
```

- The node-visit path (`machine.*.decide`) is for `events.on` only. Mocks,
  `allow-real` and post-run matchers must name a real block or the whole
  machine, so a node's side-effect guards cannot be bypassed.
- `unit.block` and `integration.from` / `to` take the definitional path,
  without the visit: `machine.decide.choose`.
- A mock at the machine path skips every node.
- Inline and referenced node bodies return a declared `completion` (nonterminal) or `result`
  (terminal), optionally with a nonblank `reason`. Test each one at its own
  `ref` too when using a subflow. Inline body blocks use the same visit paths
  for mocks and assertions, and definition paths omit the visit index.
- Unit and integration tests extracted from inline node bodies take the visit's
  `input`, `state` and `node` as `params`, independent of the owning definition's
  params. E2e tests and tests targeting the whole machine use the owning
  definition's params.

See the state-machine example.

## Post-run assertions

Checked after the run, on every tier. Each entry is exactly one shape:

```yaml
post-run:
  - block: send-email
    called: true # or called: false, or times: 3
  - return: { result: 5 }
  - status: completed # or failed
  - error: { name: InvalidParams, message: 'supplier.contactId' }
```

| Shape                            | Asserts                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `{ block, called?, times? }`     | Dispatch count. `called: true` is ≥1, `called: false` is 0, `times` is exact. |
| `{ return }`                     | The run's result: the `return` projection if declared, else the root ctx.     |
| `{ status }`                     | Whether the run completed or failed.                                          |
| `{ error: { name?, message? } }` | A failure matching anywhere in the Temporal cause chain.                      |

A failed run fails the test unless a `status: failed` or `error:` assertion
expects it.

**Objects match partially, arrays and primitives exactly** — in `return`,
`expect-in`, `expect-out` alike. So a field wrongly **added** to an object is
invisible: `expect-in` can prove a request body carries what it should, never
that it carries nothing else. On an `http` call to our own API, an undeclared
property is a 400 that `fail-on-error: false` may swallow, giving a green
suite over a call production refuses. The endpoint's contract validation is
the guard there; wftest cannot be.

Use `events` for what a block computed mid-run and `post-run` for the run's
overall shape.

## Path matchers and fixtures

### Block path matchers

`mocks.block`, `events.on`, `allow-real` and `post-run.block` take a segment
glob anchored to the full **runtime** path: `*` is exactly one segment, `**`
zero or more, and wildcards count only as a whole segment, so `fetch-*` is
literal. An array matches if any entry does.

| Matcher              | Matches                                                   |
| -------------------- | --------------------------------------------------------- |
| `fetch-user`         | A top-level `fetch-user` only, not `loop-1.0.fetch-user`. |
| `loop-1.0.send`      | `send` in iteration 0 of `loop-1`.                        |
| `loop-1.*.send`      | `send` in every iteration.                                |
| `loop-1.**.send`     | Every `send` at any depth under `loop-1`.                 |
| `fan-out.email.send` | `send` in `parallel` branch `email`.                      |
| `route-1.2.fallback` | `fallback` in `branches[2]` of `route-1`.                 |
| `**.send`            | Any `send` anywhere.                                      |

Runtime paths are not normalised, so `loop-1.send` never matches
`loop-1.0.send`. Path shapes per container are in [paths](paths.md#per-container-path-shapes).
Compilation rejects a matcher that reaches no block.

### Fixture refs

`'fixture:./file.json'` is replaced by the parsed JSON at compile time, and an
edit to the file reruns the test under `--watch`. It is accepted in `params`,
`config`, `mocks[].out`, `mocks[].out-seq` (whole or per entry), `expect-in`,
`expect-out` and `expect-out-seq` (whole or per entry) — not in `ctx` or
`trigger`.

### File refs

`'file:./path'` anywhere in the spec becomes a `data:<mime>;base64,…` URL,
which the engine's attachment fetcher reads like any other URL:

```yaml
params:
  attachment:
    url: 'file:./gas-cert.pdf'
    media-type: application/pdf
```

## Running tests

```sh
wftest                          # every *.test.yaml under the cwd
wftest path/to/one.test.yaml
wftest -t "pattern"             # filter by it: title
wftest -v                       # log each block's in/out under its test
wftest list                     # compile and list what would run
wftest clean                    # empty <cwd>/tmp/wftest/
```

| Flag                  | Purpose                                                                   |
| --------------------- | ------------------------------------------------------------------------- |
| `--watch`             | Rerun when a test, any project workflow YAML, or a fixture changes.       |
| `-t, --filter <pat>`  | vitest `testNamePattern` over `it:` titles.                               |
| `-r, --reporter <n>`  | `default`, `verbose`, `json` or `junit`.                                  |
| `-v, --verbose`       | Per-test live log of dispatches and outputs. Reach for it on any failure. |
| `--log-level <lvl>`   | Temporal worker log level; default `WARN`.                                |
| `--concurrent <bool>` | Run tests within a file concurrently. Default off.                        |
| `--parallel <bool>`   | Run files in parallel. Default on.                                        |
| `-w, --max-workers`   | Worker process cap.                                                       |
| `--coverage`          | Write a block coverage report.                                            |
| `--coverage-output`   | Report path; default a file under `<cwd>/tmp/wftest/`.                    |

`run` and `list` compile identically and fail before Temporal starts on YAML
errors (duplicate keys included), unknown fields, bad durations, duplicate
full test titles, invalid params, unknown unit or range paths, and matchers
that reach no block.

### Definition analysis

Compilation also runs the backend's import analysis over **every** workflow
and subflow in the project and fails on anything import would reject. Those
rules are in [paths](paths.md#name-accept-set) and the [YAML reference](yaml.md#subflow-files).
`unknown-subflow-ref` is the exception: a cross-file `subflow.ref` is the
normal shape of a wftest project.

Two checks need the whole project, so they run here and not at import:

- two definitions claiming one `ref`;
- `unkeyed-repeated-scm-need` for an `scm` block whose **caller** repeats it —
  a state-machine node subflow, a subflow called inside a loop, or one run
  calling it from two sites (sequential, `parallel` arms, or mutually exclusive
  router arms, which analysis cannot tell apart). Declare `one-need-per` to say
  they are different needs. This matters most here: a mocked `scm` block
  short-circuits before the engine's runtime refusal could fire.

The check is project-wide on purpose: one broken definition fails every test
file, with a message naming each `ref`, rule and field path. The project is
broken, not the test that surfaced it.

```
[wftest] Definitions in this project fail semantic analysis:

  process-certificate (subflow)
    undeclared-param-ref at blocks.1.do.2.with.code
      References ctx.params.emailFromName, which is not declared in
      the subflow's params
```

### Concurrency

Files run in parallel on at most four workers; tests within a file run in
sequence. Each worker boots its own Temporal server and engine bundle, which is
why the cap is low. `VITEST_MAX_WORKERS` can lower it, never raise it;
`--max-workers` beats both. `--concurrent true` runs a file's tests in
parallel, safely, since all harness state is per run. `--parallel false` helps
when chasing flakes or setup contention.

## Coverage

`wftest --coverage` reports, per workflow, the block paths dispatched, the
router / race / parallel arms taken, and line coverage of each inline `js`
block, unioned across every test. Paths are compared in definitional form
([coverage normalization](paths.md#coverage-normalization)). A block whose `if:` skipped it
is not dispatched and so not covered.

## Best practices

- **Many unit tests, fewer integration tests, a handful of e2e.** Unit tests
  are fast and survive changes around the block. Use integration only for
  chains with a joint contract. Once e2e covers the major paths, more e2e
  cases duplicate what lower tiers prove.
- **Unit-test every `js` block** like a pure function: realistic input, every
  branch, edge cases (empty arrays, missing optional fields, 0 / 1 / large),
  and inputs that should throw. They are the cheapest tests there are.
- **Unit-test every `llm` block against the real model.** Prime ctx with
  realistic input and approve the call with `allow-real`; assert the real
  output across layouts, ambiguous inputs, noisy OCR, and "nothing found"
  cases that must return the empty shape rather than a hallucination. Only a
  real call catches a prompt edit that drops an edge case, since the output
  stays schema-valid. They cost real calls, so run them on a schedule if
  needed.
- **Mock the LLM in integration and e2e.** Once the unit tier owns a block's
  contract, higher tiers mock it to stay fast and deterministic, to keep
  prompt regressions from posing as logic failures, and to drive each
  downstream branch by varying the mock.
- **Test every subflow at its own `ref`**: unit tests for its blocks and an
  e2e test of its `return` contract. A regression caught only at a call site is
  harder to localise.
- **One concern per test.** A test with five mocks, three signals and six
  assertions is a puzzle when it fails. Split it.
- **Mock at boundaries, not internals.** Mock what talks to the outside world.
  A `js` or `log` block worth mocking is worth a unit test instead.
- **Fixtures for anything over about three lines.**
- **Bug fixes start with a failing test** (contribution rules).

```yaml
e2e:
  - it: routes high-priority results to the escalation path
    mocks:
      - block: llm-classify
        out: { category: high-priority, confidence: 0.95 }
    post-run:
      - block: notify-escalation
        called: true
```
