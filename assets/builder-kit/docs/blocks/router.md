# `router` block

The first branch whose `when` is truthy runs; `else`, if present, must be last
and appear once.

```yaml
- id: route
  type: router
  branches:
    - when: "${ctx.user.tier === 'pro'}"
      do:
        - id: pro-path
          type: http
          with: { url: 'https://api.example.com/pro' }
    - else:
        - id: fallback
          type: log
          with: { message: 'Unknown tier' }
```

Branches share the parent's ctx: `out`s written inside are visible after the
router.

## Output

None: `out` is not written. Blocks inside the branches write to the router's own ctx, so their outputs are readable after it.

## On failure

An error in a `when` or a branch fails the run.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

Block fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `branches` | object[] | yes |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.


## Used in

[04-scm-follow-up-escalation](../../templates/04-scm-follow-up-escalation/README.md)
