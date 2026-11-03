# `trigger` block

Exposes the run's trigger payload. Fails non-retryably (`MissingTrigger`) if
the run had none. What starts the run is the root [`triggers`](../yaml.md#triggers); a
`with.connector` here is refused at import.

```yaml
- id: read-email
  type: trigger
  out: email
```

## Output

The run's trigger payload.

## On failure

`MissingTrigger`, without retry, when the run was started without one.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.
