# Bubble

No-code platform for web and mobile apps

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bubble'
  version: '0.1.8'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `bubble_create_thing`

**Create Thing.** Create a new record ("thing") of a given data type in a Bubble app via the Bubble Data API. Use to add a new entry; supply the type name and a fields object with the values to set. Not idempotent — each call creates a separate record.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `typename` | string | yes |  | Typename. |
| `fields` | JSON | no |  | Body. |

### `bubble_delete_thing`

**Delete Thing.** Permanently delete a single record ("thing") from a Bubble app by its unique id and data type, via the Bubble Data API. Use when an agent must remove a specific record it already knows the id of. Effectively idempotent (deleting an already-deleted id is a no-op) but destructive — verify the id before calling.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `typename` | string | yes |  | Typename. |
| `thing_id` | string | yes |  | Thing ID. |

### `bubble_update_thing`

**Update Thing.** Update an existing record ("thing") in a Bubble app, identified by its unique id and data type, by patching the supplied fields via the Bubble Data API. Use to modify specific fields of a known record; only the provided fields are changed. Targets one record so repeats with the same input converge, but it mutates server state on each call.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `typename` | string | yes |  | Typename. |
| `thing_id` | string | yes |  | Thing ID. |
| `fields` | JSON | no |  | Body. |

### `bubble_get_thing`

**Get Thing.** Fetch a single record ("thing") of a given data type from a Bubble app by its unique id, via the Bubble Data API. Use to read the current values of one known record. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `typename` | string | yes |  | Typename. |
| `thing_id` | string | yes |  | Thing ID. |

### `bubble_list_things`

**List Thing.** Search and list records ("things") of a given data type in a Bubble app via the Bubble Data API, filtering by a single constraint (e.g. equals, text contains, greater/less than, in, empty, geographic_search) on a chosen field and value, with cursor and limit for pagination. Use to find records matching a condition or to page through a type. Read-only and idempotent.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `typename` | string | yes |  | Typename. |
| `constraint` | string | yes |  | Constraint. One of `"equals or not equal"`, `"text contains or not text contains"`, `"greater than or less than"`, `"in or not in"`, `"contains or not contains"`, `"empty or not empty"`, `"geographic_search"`. |
| `field` | string | yes |  | Field. |
| `value` | string | yes |  | Value. |
| `cursor` | number | yes |  | Start from. |
| `limit` | number | yes |  | Limit. |
