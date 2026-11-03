# Base44

Build and manage custom apps with databases and entities

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-base44'
  version: '0.1.8'
```

Categories: DEVELOPER_TOOLS, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Authentication

> Authenticate with your Base44 app using your App ID and API token.
>
> **App ID**: Your Base44 application ID (required)
> **Token**: Your Base44 user token or service token (optional but recommended)
>
> You can find these in your Base44 app settings or dashboard.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App ID. Your Base44 application ID. |
| `token` | string | no |  | API Token. Your Base44 user token or service token (optional but recommended for full access) |

## Actions

### `create_entity`

**Create Entity.** Creates a new record of a given entity type in a Base44 app, with the field values supplied as a JSON object. Use when you need to add a new item (e.g. a Product, User, or Order) to a Base44 database. Requires the exact entity-type name and matching field data; each call inserts a fresh record, so it is not idempotent. Service access uses the configured token when present, otherwise the user session. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. The name of the entity type (e.g. "Product", "User", "Order") |
| `entityData` | JSON | yes | `{}` | Entity Data. The data to create the entity with. |

### `find_entity`

**Find Entity Record.** Searches a Base44 app for records of a given entity type that match a JSON filter query, returning all matches. Use when you need to look up existing records by field values (e.g. find a User by email) without modifying anything. Requires the exact entity-type name; this is a read-only lookup and is idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. The name of the entity type (e.g. "Product", "User", "Order") |
| `searchQuery` | JSON | yes | `{}` | Search Query. Query to find the entity (e.g. {"email": "john@example.com"}) |

### `find_or_create_entity`

**Find or Create Entity.** Searches a Base44 app for an existing record of a given entity type matching a JSON query, and creates one from the supplied data only if no match is found. Use this upsert-style action to avoid duplicates when you want a record to exist but should not create a second copy. Because creation is gated on the search query, it is effectively idempotent so long as the query reliably identifies the same record. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. The name of the entity type (e.g. "Product", "User", "Order") |
| `searchQuery` | JSON | yes | `{}` | Search Query. Query to find the entity (e.g. {"email": "john@example.com"}) |
| `createData` | JSON | yes | `{}` | Create Data. Data to create the entity with if not found. |
