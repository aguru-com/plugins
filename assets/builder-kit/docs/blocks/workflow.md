# `workflow` block

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

## Output

`{ workflowId, runId, firstExecutionRunId, status }` of the child, once it has started. A joined idempotent child reports its current status.

## On failure

An unknown child `ref` fails without retry (`UnknownWorkflow`), as does a failed start of a child without an idempotency key.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `id` | string | yes |  |
| `params` | object \| string | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).


## Used in

[06-scheduled-sweep](../../templates/06-scheduled-sweep/README.md)
