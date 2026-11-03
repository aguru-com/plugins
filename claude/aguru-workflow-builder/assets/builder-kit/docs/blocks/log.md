# `log` block

Records a log event to history for the execution view.

```yaml
- id: log-start
  type: log
  with:
    level: info # debug | info | warn | error; default info
    message: 'Starting run for ${ctx.params.userId}'
```

## Output

The resolved `{ message, level }`. Without `level`, none is recorded.

## On failure

Fails only on an invalid `level`.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `message` | string | yes |  |
| `level` | string | no |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.


## Used in

[01-http-basics](../../templates/01-http-basics/README.md), [02-http-sync](../../templates/02-http-sync/README.md), [06-scheduled-sweep](../../templates/06-scheduled-sweep/README.md)
