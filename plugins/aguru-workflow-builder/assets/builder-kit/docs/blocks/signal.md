# `signal` block

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

## Output

`null`.

## On failure

Not retried. A target run that does not exist or has ended fails the run.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `workflow-id` | string | yes |  |
| `run-id` | string | no |  |
| `signal` | string | yes |  |
| `payload` | any | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).
