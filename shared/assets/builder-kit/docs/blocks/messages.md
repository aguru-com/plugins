# `messages` block

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

## Output

`{ messages: [...] }`, the replies correlated to the run.

## On failure

Retried 5 times, then fails the run.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `workflow-id` | string | no |  |
| `exclude-html` | boolean \| string | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).
