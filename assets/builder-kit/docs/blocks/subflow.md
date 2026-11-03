# `subflow` block

Runs another block sequence inline in the same run (not a child workflow),
with isolated ctx.

```yaml
- id: summarize
  type: subflow
  ref: summarize-user
  params:
    profile: '${ctx.userProfile}'
  out: summary
```

| Field        | Required             | Notes                                                                                       |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------- |
| `ref`        | yes                  | Registered subflow name, or a `${...}` template; see [Dynamic dispatch](../yaml.md#dynamic-dispatch). |
| `candidates` | with a dynamic `ref` | Names a templated `ref` may resolve to. Required exactly when `ref` holds `${...}`.         |
| `params`     | no                   | Becomes the subflow's `ctx.params`; resolved against the caller's ctx.                      |
| `out`        | no                   | Receives the subflow's `return`.                                                            |

Definition fields (`params`, `blocks`, `return`) are described under
[Subflow files](../yaml.md#subflow-files).

## Dynamic dispatch

```yaml
- id: dispatch
  type: subflow
  ref: '${ctx.current.node.ref}'
  candidates: [node-decide, node-ask-landlord, node-settle]
  params: { state: '${ctx.current.state}' }
  out: outcome
```

`candidates` keeps the call statically analysable: the analyser checks each
for `unknown-subflow-ref`, import and the dependency graph count each as a
dependency, the project graph draws a dashed edge to each, and wftest treats
every candidate's blocks as reachable. At runtime a resolved value that is
not a string or not in `candidates` fails the block non-retryably, even if
it names a registered subflow; the message names the block, the value and
the list. The resolved name is recorded on the block's input marker.

Every candidate's body runs under the same calling block id
([paths](../paths.md#block-names-vs-block-paths)), so an id shared by two candidates has one runtime
path whichever runs.

## Output

The subflow's `return`, or `null` without one.

## On failure

Params that do not match the subflow's declaration fail without retry (`InvalidSubflowParams`), as does a dynamic `ref` outside `candidates`. An error inside the subflow fails the run.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

Block fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `ref` | string | yes |  |
| `candidates` | string[] | no |  |
| `params` | object | no |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.


## Used in

[01-http-basics](../../templates/01-http-basics/README.md)
