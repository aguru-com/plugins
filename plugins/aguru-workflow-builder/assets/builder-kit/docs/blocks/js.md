# `js` block

Runs a snippet in an isolated V8 heap (32 MB, 5 s). Its `return` lands in
`ctx[out]`.

```yaml
- id: build-payload
  type: js
  with:
    code: |
      return ctx.params.items.map((it) => ({ id: it.id, name: it.name.trim() }));
  out: payload
```

- **Globals:** `ctx` (a copy), `params` (alias of `ctx.params`), `config`,
  `blockPath`, `gkv`, `skv`. Nothing else from ctx is a global.
- Non-deterministic calls (`Math.random()`, `Date.now()`) are fine: the
  result is recorded once and replayed.
- No network or filesystem; use `http` or a dedicated block.
- `gkv` (installation-global) and `skv` (scoped to the workflow id) expose
  synchronous `get`, `has`, `set`; `set` takes JSON values only. Same
  semantics as the [`kv` block](../yaml.md#kv).
- `blockPath` is this block's runtime path, branch tokens and loop suffixes
  included ([paths](../paths.md)). Use it to key per-position data instead of
  hard-coding a path. It changes when the block moves, so never persist it as
  an identifier across definition versions.

```yaml
- id: mark-attempt
  type: js
  with:
    code: |
      if (!gkv.has("landlord-notified")) gkv.set("landlord-notified", true);
      return { key: `${blockPath}:attempted` };
  out: attempt
```

## Output

The value the code returns.

## On failure

A throw, a syntax error, or the 5 s / 32 MB limit fails at once, without retry (`JsUserCodeError`, with the line and column). A failing `gkv` or `skv` call surfaces inside the code as an error.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `code` | string | yes |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.


## Used in

[02-http-sync](../../templates/02-http-sync/README.md), [05-record-request](../../templates/05-record-request/README.md), [06-scheduled-sweep](../../templates/06-scheduled-sweep/README.md)
