# `wait` block

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

## Output

`{ name, payload }` of the signal, or `null` on timeout or after a plain `duration`.

## On failure

Neither `signals` nor `duration` fails the block. With `signals`, the deadline is `timeout`; a `duration` beside them is ignored.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `signals` | string[] \| string | no |  |
| `timeout` | string | no |  |
| `duration` | string | no |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.
