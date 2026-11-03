# `state-machine` block

Philosophy, choosing it, and a worked example: the
[state machine guide](../state-machine.md). This is the block contract.

```yaml
- id: approval
  type: state-machine
  with:
    input: '${ctx.application}'
    start: review
    state:
      schema:
        type: object
        props:
          attempts: integer
      initial:
        attempts: 0
    max-transitions: 5
    nodes:
      review:
        ref: approval-review
        on:
          retry: review
          accepted: finish
      finish:
        ref: approval-finish
        terminal:
          outcome: accepted
  out: approvalResult
```

- `input` and `state.initial` resolve once on entry. A node sees only
  `ctx.params.input`, `ctx.params.state` (a copy) and `ctx.params.node.id`.
- `start` names a node. Each node has either a literal `ref` or inline
  `blocks` with an explicit `return`, and exactly one of `on`
  (at least one completion) or `terminal`. Every target exists, every node is
  reachable from `start`, every reachable node can reach a terminal, terminal
  outcomes are unique. Node ids, completions and outcomes are kebab-case.
- `max-transitions` is a positive safe integer bounding **edges**, so a
  terminal reached on the last allowed edge still returns.
- A nonterminal node returns exactly `{ completion, reason?, stateUpdate? }`;
  `completion` must be in its `on`. `stateUpdate` is a shallow top-level
  patch. A terminal node returns exactly `{ result, reason? }` (`result`
  required, may be `null`). A reason is nonblank, ≤ 500 code points.
- `out` receives `{ outcome, reason?, result }`; one transition record is
  emitted per accepted edge.
- The state schema has an object root and is checked as a **closed** object:
  undeclared keys fail unless a `propx` permits them; optional properties may
  be absent but not `undefined` or `null`; sparse arrays and non-finite
  numbers fail. An invalid result or update fails before any edge is
  recorded.
- Nodes may contain waits and nested machines; each visit gets its own
  runtime path ([paths](../paths.md)).
- Inline bodies use the same isolated params and return contracts as referenced
  subflows. `blocks: []` supports projection-only nodes. Inline block ids belong
  to the enclosing definition and must be unique across all its blocks.

```yaml
nodes:
  notify:
    blocks:
      - id: describe-ready
        type: log
        with: { message: 'Ready for ${params.input.order}' }
    return: { completion: notified }
    on: { notified: review }
  review:
    ref: approval-review
    on: { accepted: finish }
  finish:
    blocks: []
    return: { result: '${params.state}' }
    terminal: { outcome: accepted }
```

## Output

`{ outcome, reason, result }` from the terminal node.

## On failure

An invalid graph, initial state or node result, an unknown node `ref`, or passing `max-transitions` fails the run; the failure is recorded with the node it happened at.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `input` | any | yes |  |
| `start` | string | yes |  |
| `state` | object | yes |  |
| `max-transitions` | number | yes |  |
| `nodes` | object | yes |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.


## Used in

[05-record-request](../../templates/05-record-request/README.md)
