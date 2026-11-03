# Pocketbase

Interact with your PocketBase instance using superuser credentials.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pocketbase'
  version: '0.0.6'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Provide your PocketBase **host URL** and **superuser credentials**.
>
> Find your admin panel at `https://your-host/_/`.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `host` | string | yes |  | Host. Your Pocketbase host URL (e.g., https://pocketbase.your-project.com) |
| `email` | string | yes |  | Superuser Email. The email address of your Pocketbase superuser. |
| `password` | string | yes |  | Superuser Password. The password of your Pocketbase superuser. |

## Actions

### `getFullList`

**Get Full List.** Fetches every record in a PocketBase collection, auto-paginating through all pages so the full set is returned in one call. Optionally narrow with a filter expression, sort, or field selection; with no filter it returns the entire collection. Use when you need the complete dataset rather than a single page; for large collections prefer Get List to page through results. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection Name. The name of the PocketBase collection. |
| `sort` | string | no |  | Sort. Order attribute(s). Use - for DESC, + for ASC. E.g.: -created,id. |
| `filter` | string | no |  | Filter. Filter expression. E.g.: (id='abc' && created>'2022-01-01') |
| `expand` | string | no |  | Expand. Auto expand relations. E.g.: relField1,relField2.subRelField. |
| `fields` | string | no |  | Fields. Comma separated fields to return. E.g.: *,expand.relField.name. |

### `getList`

**Get List.** Retrieves a single page of records from a PocketBase collection, controlled by page and per-page size, with optional filter expression, sort, and field selection. Use when you want bounded results or to iterate page by page; for the entire collection in one call use Get Full List instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection Name. The name of the PocketBase collection. |
| `page` | number | no |  | Page. The page (offset) of the paginated list (default: 1) |
| `perPage` | number | no |  | Per Page. Max returned records per page (default: 30) |
| `sort` | string | no |  | Sort. Order attribute(s). Use - for DESC, + for ASC. E.g.: -created,id. |
| `filter` | string | no |  | Filter. Filter expression. E.g.: (id='abc' && created>'2022-01-01') |
| `expand` | string | no |  | Expand. Auto expand relations. E.g.: relField1,relField2.subRelField. |
| `fields` | string | no |  | Fields. Comma separated fields to return. E.g.: *,expand.relField.name. |
| `skipTotal` | boolean | no | `false` | Skip Total. Skip total counts query for faster results (totalItems and totalPages will be -1) |

### `getRecord`

**Get Record.** Fetches one record from a PocketBase collection by its record ID, optionally expanding relations or limiting returned fields. Use when you already know the exact record ID; to search or list by criteria use Get List or Get Full List instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection Name. The name of the PocketBase collection. |
| `recordId` | string | yes |  | Record ID. ID of the record to view. |
| `expand` | string | no |  | Expand. Auto expand relations. E.g.: relField1,relField2.subRelField. |
| `fields` | string | no |  | Fields. Comma separated fields to return. E.g.: *,expand.relField.name. |

### `createRecord`

**Create Record.** Creates a new record in a PocketBase collection from a JSON object of field values. Use to insert data; this is not idempotent — each call creates a distinct record (PocketBase assigns a fresh ID), so repeating it produces duplicates. To change an existing record use Update Record instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection Name. The name of the PocketBase collection. |
| `recordData` | JSON | yes |  | Record Data. JSON object with the fields to create. E.g.: { "title": "test", "score": 123 }. |
| `expand` | string | no |  | Expand. Auto expand relations. E.g.: relField1,relField2.subRelField. |
| `fields` | string | no |  | Fields. Comma separated fields to return. E.g.: *,expand.relField.name. |

### `updateRecord`

**Update Record.** Updates an existing record in a PocketBase collection, identified by its record ID, applying a JSON object of field values as a partial patch (only supplied fields change). Use when the record already exists and you know its ID; to insert a new record use Create Record instead. Idempotent — re-applying the same field values to the same ID yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection Name. The name of the PocketBase collection. |
| `recordId` | string | yes |  | Record ID. ID of the record to update. |
| `recordData` | JSON | yes |  | Record Data. JSON object with the fields to update. E.g.: { "title": "test", "score": 123 }. |
| `expand` | string | no |  | Expand. Auto expand relations. E.g.: relField1,relField2.subRelField. |
| `fields` | string | no |  | Fields. Comma separated fields to return. E.g.: *,expand.relField.name. |

### `deleteRecord`

**Delete Record.** Permanently deletes one record from a PocketBase collection by its record ID. Use when you need to remove a specific record you can identify by ID. Idempotent on the end state — the record ends up absent — though a repeat call against an already-deleted ID will error since the record no longer exists. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection Name. The name of the PocketBase collection. |
| `recordId` | string | yes |  | Record ID. ID of the record to delete. |
