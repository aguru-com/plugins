# `race` block

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

## Output

The winning branch's `return`.

## On failure

If the first branch to settle failed, its error fails the block. A tie goes to the branch listed first.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

Block fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `branches` | object[] | yes |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.
