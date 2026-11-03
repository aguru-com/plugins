# `loop` block

Iterates `over` an array or `times` a count — exactly one.

```yaml
- id: iterate
  type: loop
  over: '${ctx.users}'
  as: user
  do:
    - id: fetch
      type: http
      with: { url: 'https://api.example.com/users/${ctx.user.id}' }
      out: profile
  collect: profile
  out: profiles
```

| Field     | Required | Notes                                                                                |
| --------- | -------- | ------------------------------------------------------------------------------------ |
| `over`    | one of   | Expression resolving to an array; anything else fails at runtime.                    |
| `times`   | one of   | Count; `as` binds the index `0..n-1`.                                                |
| `as`      | yes      | Per-iteration binding.                                                               |
| `until`   | no       | Checked against the inner ctx after each pass; truthy stops the loop.                |
| `collect` | no       | String: array of `innerCtx[name]`. String array: array of `{ name: value, … }` rows. |
| `do`      | yes      | Body. Each iteration gets a fresh inner ctx, `{ ...outerCtx, [as]: item }`.          |

Writes inside the body do not leak between iterations or out of the loop;
only `ctx[out]` (the collected array) is visible afterwards.

**Cross-iteration visibility.** With `collect` and `out`, each iteration sees
the collected-so-far array at `ctx[out]`, with non-enumerable `first` and
`prev` getters (ignored by JSON and `toEqual`). That drains a cursor API in
one loop:

```yaml
- id: drain-events
  type: loop
  times: 100 # safety cap
  as: i
  until: '${!ctx.page.body.meta.nextToken}'
  do:
    - id: fetch
      type: http
      with:
        url: https://api.example.com/events
        query:
          nextToken: '${ctx.pages.prev?.body.meta.nextToken || null}'
      out: page
  collect: page
  out: pages
```

Prefer `http` [pagination](../yaml.md#pagination) when the API fits it.

## Output

The collected array; `[]` without `collect`.

## On failure

`over` that is not an array, or `times` that is not a whole number, fails the block. An error in any iteration fails the run.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

Block fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `over` | string | no |  |
| `times` | number \| string | no |  |
| `as` | string | yes |  |
| `until` | string | no |  |
| `do` | object[] | yes |  |
| `collect` | string \| string[] | no |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.


## Used in

[02-http-sync](../../templates/02-http-sync/README.md), [06-scheduled-sweep](../../templates/06-scheduled-sweep/README.md)
