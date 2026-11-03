# MongoDB

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mongodb'
  version: '0.1.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `host` | string | yes |  | Host. The hostname or address of the MongoDB server (e.g., localhost:27017 or cluster.example.mongodb.net) |
| `useAtlasUrl` | boolean | yes | `false` | Use MongoDB Atlas URL Format. Enable this if connecting to MongoDB Atlas (uses mongodb+srv:// protocol) |
| `database` | string | no |  | Database. The MongoDB database to connect to (can be specified per action if left empty) |
| `username` | string | yes |  | Username. The username to use for connecting to the MongoDB server. |
| `password` | string | yes |  | Password. The password to use to identify at the MongoDB server. |
| `authSource` | string | no | `"admin"` | Auth Source. The database to authenticate against (default: admin) |

## Actions

### `find_documents`

**Find Documents.** Reads documents from a MongoDB collection, optionally filtered by a query, with projection, sort, limit, and skip. An empty query returns all documents in the collection; pass a query object to filter to matching documents. Use to look up or list records when you need raw documents rather than aggregated results. Requires a collection (and a database, from the action or the connection). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | no |  | Database. The MongoDB database to connect to (from your authentication) |
| `collection` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | JSON | no | `{}` | Query. MongoDB query to filter documents (e.g., {"status": "active"}) |
| `projection` | JSON | no | `{}` | Projection. Fields to include or exclude (e.g., {"name": 1, "_id": 0}) |
| `sort` | JSON | no | `{}` | Sort. Sort criteria (e.g., {"createdAt": -1}) |
| `limit` | number | no |  | Limit. Maximum number of documents to return. |
| `skip` | number | no | `0` | Skip. Number of documents to skip. |

Output fields:

- `documents`: Documents
- `count`: Count (number)

### `insert_documents`

**Insert Documents.** Inserts new documents into a MongoDB collection; accepts either a single document object or an array of documents. Use to add records. Not idempotent: each call creates new documents with fresh _id values, so repeating it appends duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | no |  | Database. The MongoDB database to connect to (from your authentication) |
| `collection` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `documents` | JSON | yes |  | Documents. Document(s) to insert. Can be a single document object or an array of documents. |

Output fields:

- `insertedId`: Inserted ID
- `acknowledged`: Acknowledged (boolean)
- `insertedCount`: Inserted Count (number)
- `insertedIds`: Inserted IDs (an object whose keys vary)

### `update_documents`

**Update Documents.** Applies MongoDB update operators (e.g. $set, $inc) to every document matching a filter via updateMany; optionally upserts a new document when nothing matches. Use to modify existing records in bulk. Both filter and update are required. Not idempotent in general: operators like $inc change state on each call and upsert can insert, though a pure $set repeated on the same matches yields the same end state. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | no |  | Database. The MongoDB database to connect to (from your authentication) |
| `collection` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | JSON | yes |  | Filter. MongoDB query to select documents to update (e.g., {"status": "pending"}) |
| `update` | JSON | yes |  | Update. MongoDB update operations (e.g., {"$set": {"status": "completed"}}) |
| `upsert` | boolean | no | `false` | Upsert. Insert a document if no documents match the filter. |

Output fields:

- `matchedCount`: Matched Count (number)
- `modifiedCount`: Modified Count (number)
- `upsertedId`: Upserted ID
- `upsertedCount`: Upserted Count (number)

### `delete_documents`

**Delete Documents.** Removes every document matching a filter from a MongoDB collection via deleteMany. Use to delete records in bulk; an empty filter would match and delete all documents in the collection, so scope the filter carefully. The filter is required. Mutating and destructive; repeating the call deletes whatever now matches, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | no |  | Database. The MongoDB database to connect to (from your authentication) |
| `collection` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | JSON | yes |  | Filter. MongoDB query to select documents to delete (e.g., {"status": "archived"}) |

Output fields:

- `deletedCount`: Deleted Count (number)

### `find_and_update_documents`

**Find and Update Documents.** Applies MongoDB update operators to all documents matching a filter via updateMany, then optionally re-reads and returns the matched documents in their post-update state. Choose this over plain Update Documents when the agent needs to see the resulting documents, not just counts. Filter and update are required; supports upsert. Not idempotent: it mutates state and operators like $inc compound on each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | no |  | Database. The MongoDB database to connect to (from your authentication) |
| `collection` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | JSON | yes |  | Filter. MongoDB query to select documents to update (e.g., {"status": "pending"}) |
| `update` | JSON | yes |  | Update. MongoDB update operations (e.g., {"$set": {"status": "completed"}}) |
| `upsert` | boolean | no | `false` | Upsert. Insert a document if no documents match the filter. |
| `returnUpdated` | boolean | no | `true` | Return Updated Documents. Return the documents after updates are applied. |

Output fields:

- `matchedCount`: Matched Count (number)
- `modifiedCount`: Modified Count (number)
- `upsertedId`: Upserted ID
- `upsertedCount`: Upserted Count (number)
- `documents`: Updated Documents

### `find_and_replace_documents`

**Find and Replace Documents.** Replaces the first document matching a filter with an entirely new document via replaceOne (the whole document is overwritten, not patched), and can return either the before or after version. Choose this over Update Documents when swapping a full document rather than applying field-level operators. Filter and replacement are required; supports upsert. Mutating and not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | no |  | Database. The MongoDB database to connect to (from your authentication) |
| `collection` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | JSON | yes |  | Filter. MongoDB query to select documents to replace (e.g., {"_id": "123"}) |
| `replacement` | JSON | yes |  | Replacement Document. New document that will replace the matched documents. |
| `upsert` | boolean | no | `false` | Upsert. Insert the document if no documents match the filter. |
| `returnDocument` | string | no | `"after"` | Return Document. Which version of the document to return. One of `"before"`, `"after"`. |

Output fields:

- `matchedCount`: Matched Count (number)
- `modifiedCount`: Modified Count (number)
- `upsertedId`: Upserted ID
- `document`: Document

### `aggregate_documents`

**Aggregate Documents.** Runs a MongoDB aggregation pipeline over a collection and returns the resulting documents. Use for grouping, joining, computed fields, faceting, or any read that goes beyond a simple find filter. The pipeline must be an array of stage objects (e.g. $match, $group, $sort). Read-only and idempotent for read-only pipelines (avoid write stages like $out/$merge). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database` | string | no |  | Database. The MongoDB database to connect to (from your authentication) |
| `collection` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `pipeline` | JSON | yes |  | Aggregation Pipeline. Array of aggregation stages (e.g., [{"$match": {"status": "active"}}, {"$group": {"_id": "$category", "count": {"$sum": 1}}}]) |

Output fields:

- `result`: Results
- `count`: Count (number)
