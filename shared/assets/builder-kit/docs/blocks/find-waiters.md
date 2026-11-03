# `find-waiters` block

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

## Output

Always an array: `[{ workflowId, runId }]`, or with `execution-params` `[{ executionId, executionDbId, workflowDefinitionId, signalName, blockId, reason, executionParams }]`.

## On failure

Retried 5 times. A `limit` over 100 or empty `signals` fails at once.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `signals` | string[] \| string | yes |  |
| `workflow-def-id` | string | no |  |
| `include-self` | boolean \| string | no |  |
| `limit` | number \| string | no |  |
| `execution-params` | object \| string | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).
