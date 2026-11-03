# `ledger` block

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
See the [ledger guide](../ledger.md)
for input/output contracts, limits, permissions and retry semantics.

## Output

`{ ledger, entry?, entries?, checks?, missing?, next?, duplicate? }`. Project-defined facts and transition receipts survive replacement executions. Use `list` and its revision cursor for bounded pages.

## On failure

Invalid input, denied access, missing scopes, conflicting entries and reads over 1 MiB fail without retry. Other backend and network failures are retried. `get` over the byte limit requires a smaller key batch or paginated `list`.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

Block fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `out-error` | string | no |  |

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `scope` | string | yes |  |
| `fail-on-error` | boolean \| string | no |  |
| `action` | "open" \| "append" \| "get" \| "check" \| "list" \| "claim" | yes |  |
| `key` | string | no |  |
| `generation` | integer \| string | no |  |
| `payload` | string \| number \| boolean \| null \| one of several shapes[] \| object | no |  |
| `keys` | string[] \| string | no |  |
| `after` | integer \| string | no |  |
| `limit` | integer \| string | no |  |
| `expectedGeneration` | integer \| string | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).
