# Fireberry

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-fireberry'
  version: '0.1.7'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Fireberry API Key. You can generate it from your Fireberry account settings.

## Actions

### `create_record`

**Create Record.** Creates a new record of a given Fireberry object type (Account, Contact, etc.), with field values supplied as an object/JSON. Use when adding a new CRM record. Not idempotent: each call inserts another record, so repeating it produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Object Type. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `update_record`

**Update Record.** Updates an existing Fireberry record, identified by its record ID under a given object type, applying only the field values you provide (empty fields are skipped and left unchanged). Use when modifying a known record. Idempotent: re-running with the same id and field values converges on the same record state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Object Type. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields to Update. An object whose fields depend on other inputs; the product shows them. |

### `delete_record`

**Delete Records.** Permanently deletes one or more Fireberry records (max 20 per call) of a given object type, selected by their record IDs; requires the confirmation flag to be set. Use when removing known records. Not idempotent and irreversible: a repeat call on already-deleted IDs has no further effect but the deletion itself cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Object Type. A value the product loads from the provider, such as an id; write the value itself. |
| `recordIds` | array | yes |  | Records to Delete. Values the product loads from the provider, such as ids; write an array of them. |
| `confirmDeletion` | boolean | yes |  | Confirm Deletion. Check this box to confirm you want to permanently delete the selected records. This action cannot be undone. |

### `find_record`

**Find Records.** Queries records of a given Fireberry object type with optional pagination, sorting, and field selection. Leave the search query empty to fetch all records, or supply criteria (e.g. "accountname=John") to filter to matches. Use to look up or list records before acting on them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Object Type. A value the product loads from the provider, such as an id; write the value itself. |
| `searchQuery` | string | no |  | Search Query. Enter search criteria (e.g., "accountname=John" or "email contains @example.com"). Leave empty to get all records. |
| `fieldsToReturn` | object | no |  | Fields to Return. An object whose fields depend on other inputs; the product shows them. |
| `sortBy` | string | no |  | Sort By Field. System name of field to sort by (e.g., "createdon", "accountname") |
| `sortOrder` | string | no | `"desc"` | Sort Order. One of `"desc"`, `"asc"`. |
| `pageSize` | number | no | `25` | Page Size. Number of records to return (max 50) |
| `pageNumber` | number | no | `1` | Page Number. Page number to retrieve (max 10) |
