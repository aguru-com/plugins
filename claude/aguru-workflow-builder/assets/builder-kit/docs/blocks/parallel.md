# `parallel` block

Runs branches concurrently; resumes when **all** settle. Each branch gets a
shallow clone of the parent ctx: reads see parent values, writes stay
branch-local.

```yaml
- id: enrich
  type: parallel
  branches:
    - id: from-crm
      do:
        - id: fetch
          type: http
          with: { url: 'https://crm.example.com/users/${ctx.user.id}' }
          out: crm
      return: '${ctx.crm}'
    - id: from-billing
      do:
        - id: fetch
          type: http
          with: { url: 'https://billing.example.com/users/${ctx.user.id}' }
          out: billing
      return: '${ctx.billing}'
  out: enriched # [crmResult, billingResult]
```

| Branch field | Required | Notes                                                                                             |
| ------------ | -------- | ------------------------------------------------------------------------------------------------- |
| `id`         | yes      | Runtime path token (`<parallel-id>.<branch-id>.<inner>`), shared by markers and wftest matchers.  |
| `do`         | yes      | Branch body.                                                                                      |
| `return`     | no       | Same shapes as a [subflow `return`](../yaml.md#subflow-files), over the branch's final ctx. Absent: `null`. |

If any branch errors, the others are cancelled, the first error propagates,
and `out` is not written.

Ordinary leaf executions in independent branches overlap, including HTTP,
LLM, JS and email. SCM registration/reassertion, subscription entry/completion
and structural control flow run serially; their activities can hold further
dispatch until completion. Ordinary leaves inside a subscription's `do` body
can overlap leaves in other branches. Blocks within each branch remain sequential. Results are returned
in branch declaration order, regardless of completion order.

## Output

Each branch's `return`, in branch order; a branch without one gives `null`.

## On failure

The first branch to fail cancels the others and fails the block; `out` is not written.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

Block fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `branches` | object[] | yes |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.
