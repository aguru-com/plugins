# Couchbase

NoSQL document database for modern applications

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-couchbase'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect to your Couchbase cluster

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `connectionString` | string | yes |  | Connection String. Couchbase connection string (e.g., couchbase://localhost or couchbases://cloud.couchbase.com) |
| `username` | string | yes |  | Username. Username for authentication. |
| `password` | string | yes |  | Password. Password for authentication. |

## Actions

### `insert_document`

**Insert Document.** Create a new Couchbase document in a bucket/scope/collection, failing if a document with the same ID already exists. Use when you specifically need create-only semantics; choose Upsert Document instead to overwrite. Not idempotent: a stable ID fails on retry, and if the ID is left blank a fresh random UUID is generated each call, creating a new document. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `scope` | string | no |  | Scope. Select the scope (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `collection` | string | no |  | Collection. Select the collection (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Document ID. Unique identifier for the document. Leave empty to auto-generate. |
| `document` | JSON | yes |  | Document. The JSON document to store. |
| `expiry` | number | no |  | Expiry (seconds). Document expiration time in seconds. Leave empty for no expiry. |
| `durabilityLevel` | string | no |  | Durability Level. How durable the write should be before returning success. One of `0`, `1`, `2`, `3`. |
| `timeout` | number | no | `10000` | Timeout (ms). Operation timeout in milliseconds. |

### `upsert_document`

**Upsert Document.** Write a Couchbase document by ID, creating it if absent and fully replacing it if present. Use to set a record to a known state regardless of whether it exists; choose Insert Document for create-only semantics. Idempotent when a stable document ID is supplied (same input yields the same stored state); leaving the ID blank generates a random UUID each call, which is not idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `scope` | string | no |  | Scope. Select the scope (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `collection` | string | no |  | Collection. Select the collection (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | no |  | Document ID. Unique identifier for the document. Leave empty to auto-generate. |
| `document` | JSON | yes |  | Document. The JSON document to store. |
| `expiry` | number | no |  | Expiry (seconds). Document expiration time in seconds. Leave empty for no expiry. |
| `durabilityLevel` | string | no |  | Durability Level. How durable the write should be before returning success. One of `0`, `1`, `2`, `3`. |
| `timeout` | number | no | `10000` | Timeout (ms). Operation timeout in milliseconds. |

### `get_document`

**Get Document.** Fetch a single Couchbase document by its key from a given bucket/scope/collection. Use to look up a known record by ID; the document ID is required and must reference an existing document or the call fails. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `scope` | string | no |  | Scope. Select the scope (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `collection` | string | no |  | Collection. Select the collection (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | yes |  | Document ID. Select an existing document or type a custom ID. A value the product loads from the provider, such as an id; write the value itself. |
| `timeout` | number | no | `10000` | Timeout (ms). Operation timeout in milliseconds. |

### `delete_document`

**Delete Document.** Remove a single Couchbase document by its key from a given bucket/scope/collection. Use to permanently delete a known record. Effectively idempotent on end state (the document ends up absent), though a repeat call on an already-deleted ID errors with a not-found. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `scope` | string | no |  | Scope. Select the scope (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `collection` | string | no |  | Collection. Select the collection (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `documentId` | string | yes |  | Document ID. Select an existing document or type a custom ID. A value the product loads from the provider, such as an id; write the value itself. |
| `durabilityLevel` | string | no |  | Durability Level. How durable the write should be before returning success. One of `0`, `1`, `2`, `3`. |
| `timeout` | number | no | `10000` | Timeout (ms). Operation timeout in milliseconds. |

### `query`

**Execute SQL++ Query.** Run a read SQL++ (N1QL) SELECT query against Couchbase, optionally layering vector-similarity WHERE filters and ORDER BY for nearest-neighbor search; the query is wrapped as a subquery, so it must be a SELECT and must not contain LIMIT or OFFSET (use the Limit/Offset fields instead). Use for ad-hoc reads, joins, aggregations, or vector search across documents. Idempotent for read queries. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `scope` | string | no |  | Scope. Select the scope (leave empty for default) A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | SQL++ Query. SELECT statement with optional positional parameters ($1, $2, etc.). Do not include LIMIT or OFFSET. |
| `arguments` | array | no |  | Query Arguments. Values for positional parameters ($1, $2, etc.) in the query. |
| `vectorFilters` | array | no |  | Vector Filters. Filter results by vector similarity (requires vector index) Each item: { `vectorExpr`, `targetVector`, `vectorSimilarity`, `maxDistance`, `preciseDistance`? }. |
| `vectorOrder` | array | no |  | Vector Ordering. Order results by vector similarity (requires vector index) Each item: { `vectorExpr`, `targetVector`, `vectorSimilarity`, `preciseDistance`? }. |
| `limit` | number | no |  | Limit. Maximum number of results to return. |
| `offset` | number | no |  | Offset. Number of results to skip. |
| `scanConsistency` | string | no |  | Scan Consistency. Query consistency level. One of `"not_bounded"`, `"request_plus"`. |
| `timeout` | number | no | `10000` | Timeout (ms). Operation timeout in milliseconds. |
