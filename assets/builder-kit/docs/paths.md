# Block paths — reference

> **Draft,** pending finalisation by [neuodev](https://github.com/neuodev).

The workflow runtime addresses a block two ways:

- A **block path** is the dotted, deterministic id of one block _instance_:
  the key for markers, history, dispatch events, mocks, post-run assertions,
  test targets, coverage and the console tree.
- A **block name** (`<definition ref>.<block id>`) identifies the _block
  itself_, independent of its containers.

The runtime model behind paths is in the engine doc; the test
surfaces that consume them are in the [testing guide](testing.md).

## Segments

A path is dot-separated segments naming one block instance:

```text
send-welcome
fan-out.email-branch.send
process-orders.0.validate
route-1.2.fallback
```

A segment is a **block id**, a **branch key** (`parallel`, `race`, `router`),
or an **iteration index** (`loop`, `scm`, `state-machine`) added at runtime so
each pass has a unique path. Paths are flat strings, compared literally or
with [matchers](#path-matchers).

## Block names vs block paths

A path answers _which execution of a block is this?_ A **name** answers
_which block is this?_ It is `<definition ref>.<block id>`, like a
`module.function` qualified name:

```text
property-renewal.ask-landlord
inspection-agency.wait-certificate-scm
```

A name drops the container chain, so wrapping a block in a router, adding a
branch or nesting it deeper does not rename it. Subflows need no extra
segment: a subflow is its own definition with its own `ref`, so its blocks
keep their names wherever it is called from. A name does change when the
block moves to another definition (lifted into a subflow, or the definition
renamed), because the ref is half the name.

| Form         | Value                                                                            |
| ------------ | -------------------------------------------------------------------------------- |
| Path, before | `renewal-race.renewal.execute-communication-action.3.wait-landlord-decision-scm` |
| Path, after  | `renewal-race.renewal.run-machine.1.dispatch.wait-landlord-decision-scm`         |
| Name, either | `ask-landlord-decision.wait-landlord-decision-scm`                               |

| Use a **name** for                                                             | Use a **path** for                                                                                      |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Durable state that must resolve to the same block after the YAML is refactored | Markers, history, coverage, the console tree, mocks, `block:` matchers: anything about _this_ execution |

**A name does not distinguish iterations.** Every pass through a repeating
body shares one name; that is the same property that lets it survive
re-nesting. Per-iteration identity must compose the name with whatever makes
the iteration distinct.

SCM needs are the durable consumer: the need id is the block name (keyed by
`one-need-per` as `<name>#<value>` when one block registers repeatedly), while
the callback signal carries the path because it addresses one parked frame.
The rules are in the SCM identity model.

### Name accept-set

Both halves are checked at import, because a name is an identity only if it is
well-formed and unique. A part is non-empty and carries no `.` (joins the
halves), no `::` and no trailing `:` (either would break the `::`-scoped slot
and quick-action ids it sits in), and no `#` (joins a name to a `one-need-per`
value). An interior colon is fine.

| Rejected at import                                                                                                                                 | Code                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| A block id that is empty, carries `.`, `::` or `#`, or ends in `:`                                                                                 | `block-id-separator`       |
| A block id reused within one definition, at any depth                                                                                              | `duplicate-block-id`       |
| A definition ref that is empty, carries `.`, `::` or `#`, or ends in `:` (the root's, a standalone subflow's, or an inline subflow's registry key) | `invalid-definition-ref`   |
| An inline subflow whose key reuses the root workflow's own ref                                                                                     | `duplicate-definition-ref` |

Two separate files claiming one ref is a registry clash the loader raises, not
something single-definition analysis can see.


## Definitional vs runtime paths

A **definitional path** is the block's position in the YAML tree, whatever
iteration or branch ran. The static manifest and coverage use it, and unit and
integration targets are written in it. A **runtime path** is what the engine
emits at dispatch: it adds iteration indices. Branch tokens are structural, so
both forms carry them.

| Block                                     | Definitional            | Runtime (iteration 2 / specific branch)        |
| ----------------------------------------- | ----------------------- | ---------------------------------------------- |
| Top-level `send`                          | `send`                  | `send`                                         |
| `send` inside a loop                      | `loop-1.send`           | `loop-1.2.send`                                |
| `send` inside `parallel-1` branch `email` | `parallel-1.email.send` | `parallel-1.email.send`                        |
| `fallback` inside a router else arm       | `route-1.2.fallback`    | `route-1.2.fallback` _(else is `branches[2]`)_ |

To match any iteration or branch with one string, use a [matcher](#path-matchers).

## Per-container path shapes

| Parent kind     | Inner block runtime path                          | Notes                                                                                                       |
| --------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| (top-level)     | `<block-id>`                                      |                                                                                                             |
| `loop`          | `<loop-id>.<i>.<inner-id>`                        | `i` is the 0-based iteration. A loop that runs zero times emits no body paths.                              |
| `scm`           | `<scm-id>.<i>.<inner-id>`                         | `i` is a dense 0-based index over selected progress events and the terminal event that ran the `do` body.   |
| `subflow`       | `<subflow-call-id>.<inner-id>`                    | The body sits under the **calling** block's id, not the subflow's `ref`; each call site has its own prefix. |
| `state-machine` | `<machine-id>.<visit-index>.<node-id>.<inner-id>` | The visit index is global across the machine's visits, from 0. Transition records attach to `<machine-id>`. |
| `parallel`      | `<parallel-id>.<branch-id>.<inner-id>`            | `branch.id` is mandatory and is the only token emitted, so both forms agree.                                |
| `race`          | `<race-id>.<branch-id>.<inner-id>`                | Same as `parallel`.                                                                                         |
| `router`        | `<router-id>.<branch-index>.<inner-id>`           | 0-based position in `branches[]`; the else arm is addressed by its index like any other.                    |

Definitional forms drop the loop, SCM and visit indices
(`<machine-id>.<node-id>.<inner-id>`). A state-machine node id names the
authored node, and the visit index keeps repeated visits' markers distinct:
`approval.0.review.check`, then `approval.1.review.check`.

## Composition

When containers nest, each token follows the container that produced it, in
nesting order:

| Where the inner block lives                         | Definitional path                 | Runtime path                                                             |
| --------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| Inside a loop nested in a parallel branch           | `fan-out.email.notify.send`       | `fan-out.email.notify.3.send` _(branch `email`, iteration 3)_            |
| Inside a router branch nested in a loop             | `process-each.classify.0.update`  | `process-each.5.classify.0.update` _(loop iter 5, when 0)_               |
| Inside a subflow called from a parallel branch      | `fan-out.email.run-subflow.inner` | `fan-out.email.run-subflow.inner`                                        |
| Inside a parallel block nested in a router else arm | `route-1.2.fan-out.email.send`    | `route-1.2.fan-out.email.send` _(else at `branches[2]`, branch `email`)_ |

A runtime path reflects the chain that actually ran; a block that never runs
produces no path.

## Where paths surface

| Surface                      | Path role                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Markers and dispatch events  | One per block invocation, keyed by runtime path.                                                               |
| Activities                   | Activity ids are Temporal's sequence numbers; the block's runtime path travels with the activity call instead. |
| Mock matchers                | `block:` matches dispatched runtime paths and short-circuits the block.                                        |
| Post-run dispatch assertions | `{ block, called?, times? }` matches dispatched paths like mocks.                                              |
| Live events (`on:`)          | `signal`, `skip-time`, `expect-out`, `expect-out-seq` fire when `on:` matches a dispatched path.               |
| Unit / integration targets   | `block:` (unit), `from:` / `to:` (integration) are definitional paths, walked statically before the run.       |
| Coverage manifest            | Every reachable block by definitional path; runtime hits are [normalized](#coverage-normalization) back.       |
| HITL                         | A pending `hitl` is addressed by runtime path, so the operator UI knows its iteration and branch.              |

Child workflow ids are **not** paths: a `workflow` block's child id is
`<orgId>-<idempotency key>` when the child declares `idempotency`, else
`<entry ref>-<uuid>` (replay-deterministic).

## Path matchers

Anywhere a path is accepted (mock `block:`, event `on:`, post-run `block:`),
the value is a segment **glob**, anchored to the full path:

| Token           | Matches                |
| --------------- | ---------------------- |
| Literal segment | Exactly that segment.  |
| `*`             | Exactly one segment.   |
| `**`            | Zero or more segments. |

`*` and `**` are wildcards only as a **whole segment**; inside a segment they
are literal, so `loop-*` matches only a segment spelled `loop-*`, never
`loop-1`. A matcher may be an array, matching if any entry does.

```yaml
- block: route-1.0.first # one dispatch
- block: fan-out.* # every direct child of fan-out
- block: '**.send' # every send, any depth or iteration
- block: loop-1.*.body.** # a loop body across all iterations
- block: [fan-out.email-branch.send, fan-out.sms-branch.send] # either path
```

Use a literal when the block runs once at a fixed position; use a glob when it
has several instances or might move. Globs keep tests stable when a block is
nested one level deeper.

## Coverage normalization

With `--coverage`, runtime paths are normalized before scoring against the
manifest:

| Runtime token                          | Coverage form                                          |
| -------------------------------------- | ------------------------------------------------------ |
| Loop / SCM / state-machine visit index | removed                                                |
| Router branch index                    | kept, when the run's branch-taken events prove the arm |
| Parallel / race `branch.id`            | kept (structural)                                      |

So `loop-1.0.send` and `loop-1.2.send` credit `loop-1.send`, and
`approval.0.review` and `approval.2.review` credit `approval.review`, while
`route-1.2.fallback` stays distinct from a same-named child in another arm.
Coverage then unions covered definitional paths across all tests. Matchers and
events always see runtime paths.

## Sharp edges

- **Numeric block ids.** Normalization strips numeric segments as tokens, so a
  block with id `0` or `42` is mis-credited. Use semantic ids.
- **Anchoring.** Bare `send` matches only a top-level `send`. The usual
  `called: false` surprise is a dispatch at `loop-1.0.send`; use `**.send`.
- **Only repeated bodies get indices.** Subflow bodies and parallel/race
  branches don't: `subflow-call.inner` has no `.0`.
- **Unit targets have no suffix.** `block: loop-1.double` selects the
  definition; the synthetic test workflow runs the body once without a parent
  loop and dispatches at `loop-1.double`.
- **State-machine matchers** use `*` for the visit index
  (`approval.*.review.check`); unit and integration targets omit it
  (`approval.review.check`).
