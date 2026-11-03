# `kv` block

Reads, checks or writes persistent KV entries. `method` is `get | set | has`;
`kind` is `global | scoped` (scoped keys are per workflow id). Both kinds are
per **installation**: a project installed on several orgs gives each its own
namespace.

```yaml
- id: read-status
  type: kv
  with:
    method: get
    kind: scoped
    key: 'status-${ctx.params.eventId}'
  out: statusEntry

- id: write-status
  type: kv
  with:
    method: set
    kind: scoped
    key: 'status-${ctx.params.eventId}'
    value: { notified: true } # JSON only
```

Batch with `entries` (one activity; `get`/`has` return an array):

```yaml
- id: check-notifications
  type: kv
  with:
    method: has
    entries:
      - { kind: global, key: landlord-notified }
      - { kind: scoped, key: tenant-notified }
  out: checks
```

`get` throws if any key is missing. Results are keyed entries: `has` adds a
boolean `has`, `get` adds `value` (scoped ones also `workflowId`); `set`
writes `null`.

## Output

`get` gives the entry with its `value`; `has` the entry with `has: true|false`; `set` writes `null`. A batch (`entries`) gives an array.

## On failure

**Known issue: the engine does not run `kv` blocks yet.** The block is skipped and `out` stays unset, so a later read of it fails the run. Until the fix ships, use `gkv` and `skv` in a `js` block or an expression; see [wfexpr.md](../wfexpr.md#workflow-kv).

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `kind` | "global" \| "scoped" | no |  |
| `key` | string | no |  |
| `method` | "get" \| "set" \| "has" | yes |  |
| `entries` | object[] \| string | no |  |
| `value` | string \| number \| boolean \| null \| one of several shapes[] \| object | no |  |

## In wftest

Mock it. It reads the platform's store, which a test does not have, and it is not guarded, so nothing warns you before the call fails. The same holds for `gkv` and `skv` in a `js` block or an expression.
