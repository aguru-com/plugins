# Pinecone

Manage vector databases, store embeddings, and perform similarity searches

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pinecone'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Configure your Pinecone API key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Enter your Pinecone API key. You can create a new API key in the Pinecone console for your target project. |

## Actions

### `create_index`

**Create Index.** Creates a new Pinecone vector index in the connected project, supporting both serverless (cloud + region) and pod-based (environment + pod type) deployments selected via the index type. Use to provision a fresh index before storing or querying vectors; not for adding data to an existing one. Requires a unique name and, for dense indexes, a positive dimension. Not idempotent: re-running creates or conflicts with an index, though enabling Suppress Conflicts lets a repeat call against an existing index avoid erroring. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Index Name. You must pass a non-empty string for name in order to create an index. |
| `dimension` | number | yes |  | Dimension. You must pass a positive integer for dimension in order to create an index. For dense indexes, this is required. |
| `indexType` | string | yes | `"serverless"` | Index Type. Choose between serverless or pod-based index deployment. One of `"serverless"`, `"pod"`. |
| `cloud` | string | no | `"aws"` | Cloud Provider. The public cloud where you would like your index hosted (for serverless) One of `"aws"`, `"gcp"`, `"azure"`. |
| `region` | string | no | `"us-west-2"` | Region. The region where you would like your index to be created (for serverless) |
| `environment` | string | no |  | Environment. The environment where the index is hosted (for pod-based indexes) |
| `podType` | string | no | `"p1.x1"` | Pod Type. The type of pod to use. One of `"s1.x1"`, `"s1.x2"`, `"s1.x4"`, `"s1.x8"`, `"p1.x1"`, `"p1.x2"`, `"p1.x4"`, `"p1.x8"`, `"p2.x1"`, `"p2.x2"`, `"p2.x4"`, `"p2.x8"`. |
| `replicas` | number | no |  | Replicas. The number of replicas. Replicas duplicate your index for higher availability and throughput. |
| `shards` | number | no |  | Shards. The number of shards. Shards split your data across multiple pods. |
| `pods` | number | no |  | Pods. The number of pods to be used in the index. This should be equal to shards x replicas. |
| `metric` | string | no |  | Metric. The distance metric to use. Defaults to cosine for dense indexes, dotproduct for sparse indexes. One of `"cosine"`, `"euclidean"`, `"dotproduct"`. |
| `vectorType` | string | no | `"dense"` | Vector Type. The type of vectors to store. Dense is default for most use cases. One of `"dense"`, `"sparse"`. |
| `deletionProtection` | boolean | no | `false` | Deletion Protection. Enable deletion protection for the index. |
| `waitUntilReady` | boolean | no | `false` | Wait Until Ready. Wait until the index is ready to receive data before completing. |
| `suppressConflicts` | boolean | no | `false` | Suppress Conflicts. Do not throw if you attempt to create an index that already exists. |
| `tags` | JSON | no |  | Tags. Optional tags for the index (e.g., {"team": "data-science"}) |
| `sourceCollection` | string | no |  | Source Collection. The name of the collection to be used as the source for the index. |

### `upsert_vector`

**Upsert Vector.** Writes (inserts or overwrites) vectors into a namespace of a Pinecone index, accepting either a single vector or a batch of vectors supplied as structured rows, chosen via the input method. Use to store or refresh embeddings keyed by ID; each vector requires an ID and numeric values. Idempotent: because writes are keyed on the vector ID, repeating the same call overwrites the same records to the same state without creating duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `indexName` | string | yes |  | Index Name. The name of the index to upsert vectors into. |
| `indexHost` | string | no |  | Index Host. The unique host for the index (optional, see Pinecone docs for targeting an index) |
| `namespace` | string | no | `"example-namespace"` | Namespace. The namespace where you upsert vectors (e.g., "example-namespace") |
| `vectorsInput` | string | yes | `"single"` | Input Method. Choose how to provide vector data. One of `"single"`, `"multiple"`. |
| `id` | string | no |  | Vector ID. The unique identifier for the vector (e.g., "vec1") |
| `values` | array | no |  | Vector Values. Array of numbers representing the vector (e.g., [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]) |
| `vectors` | array | no |  | Vectors. Array of vectors to upsert (for multiple vectors input) Each item: { `id`, `values`, `metadataKeys`?, `metadataValues`?, `sparseIndices`?, `sparseValues`? }. |

### `update_vector`

**Update a Vector.** Updates an existing vector identified by ID in a Pinecone namespace, overwriting any of its dense values, sparse values, or metadata that are provided. Use to modify a stored vector in place rather than to add new ones (use Upsert Vector for that). Requires the index name and a vector ID (1-512 chars). Idempotent: keyed on the vector ID, so repeating the same call leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `indexName` | string | yes |  | Index Name. The name of the index containing the vector to update. |
| `indexHost` | string | no |  | Index Host. The unique host for the index (optional, see Pinecone docs for targeting an index) |
| `id` | string | yes |  | Vector ID. Vector's unique id (required, string length: 1 - 512) |
| `namespace` | string | no | `"example-namespace"` | Namespace. The namespace containing the vector to update (e.g., "example-namespace") |
| `values` | array | no |  | Vector Values. Vector data to update (e.g., [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]) |
| `sparseIndices` | array | no |  | Sparse Indices. Array of indices for sparse values (optional) |
| `sparseValues` | array | no |  | Sparse Values. Array of sparse values corresponding to indices (must be same length as indices) |
| `metadata` | array | no |  | Metadata. Key-value pairs to set for the vector. Each item: { `key`, `value` }. |

### `get_vector`

**Get a Vector.** Fetches one or more stored vectors by their exact IDs from a namespace of a Pinecone index. Use when you already know the vector IDs and want their values and metadata; for similarity lookups use Search Vectors instead. Requires the index name and at least one ID (IDs cannot contain spaces). Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `indexName` | string | yes |  | Index Name. The name of the index to fetch vectors from. |
| `indexHost` | string | no |  | Index Host. The unique host for the index (optional, see Pinecone docs for targeting an index) |
| `ids` | array | yes |  | Vector IDs. The vector IDs to fetch. Does not accept values containing spaces (e.g., ["id-1", "id-2"]) |
| `namespace` | string | no | `"example-namespace"` | Namespace. The namespace containing the vectors to fetch (e.g., "example-namespace") |

### `delete_vector`

**Delete a Vector.** Removes vectors from a namespace of a Pinecone index, with a delete mode selecting whether to delete a single ID, a list of IDs, all vectors in the namespace, or only vectors matching a metadata filter. Use to permanently remove embeddings; deleting all requires an explicit confirmation flag. Not idempotent: it mutates index contents, and filter/delete-all modes remove whatever currently matches on each call. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `indexName` | string | yes |  | Index Name. The name of the index to delete vectors from. |
| `indexHost` | string | no |  | Index Host. The unique host for the index (optional, see Pinecone docs for targeting an index) |
| `namespace` | string | no | `"example-namespace"` | Namespace. The namespace to delete vectors from (e.g., "example-namespace") |
| `deleteMode` | string | yes | `"one"` | Delete Mode. Choose how to delete vectors. One of `"one"`, `"many"`, `"all"`, `"filter"`. |
| `id` | string | no |  | Vector ID. The ID of the vector to delete (for single vector deletion) |
| `ids` | array | no |  | Vector IDs. Array of vector IDs to delete (e.g., ["id-2", "id-3"]) |
| `confirmDeleteAll` | boolean | no | `false` | Confirm Delete All. Check this box to confirm you want to delete ALL vectors in the namespace. |
| `filter` | JSON | no |  | Metadata Filter. Metadata filter expression to select vectors to delete. Examples: • {"genre": {"$eq": "documentary"}} • {"year": {"$gt": 2019}} • {"$and": [{"genre": "comedy"}, {"year": {"$gte": 2020}}]}. |

### `search_vector`

**Search Vectors.** Runs a similarity search over a namespace of a Pinecone index, returning the top-K nearest vectors. The query can be supplied either as a raw query vector or as the ID of an existing stored vector to search by, selected via the query method, with an optional metadata filter to narrow matches. Use for semantic retrieval over stored embeddings. Requires the index name and a top-K between 1 and 10000. Idempotent read-only search. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `indexName` | string | yes |  | Index Name. The name of the index to search in. |
| `indexHost` | string | no |  | Index Host. The unique host for the index (optional, see Pinecone docs for targeting an index) |
| `topK` | number | yes | `10` | Top K. The number of results to return for each query (range: 1-10000) |
| `namespace` | string | no | `"example-namespace"` | Namespace. The namespace to query (e.g., "example-namespace") |
| `queryMethod` | string | yes | `"vector"` | Query Method. Choose how to provide the query. One of `"vector"`, `"id"`. |
| `vector` | array | no |  | Query Vector. The query vector. This should be the same length as the dimension of the index (e.g., [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]) |
| `id` | string | no |  | Query Vector ID. The unique ID of the vector to be used as a query vector (max length: 512) |
| `sparseIndices` | array | no |  | Sparse Indices. Array of indices for sparse vector data (optional) |
| `sparseValues` | array | no |  | Sparse Values. Array of sparse values corresponding to indices (must be same length as indices) |
| `filter` | JSON | no |  | Metadata Filter. Filter to apply using vector metadata. Examples: • {"genre": {"$eq": "documentary"}} • {"year": {"$gt": 2019}} • {"$and": [{"genre": {"$in": ["comedy", "drama"]}}, {"year": {"$gte": 2020}}]}. |
| `includeValues` | boolean | no | `false` | Include Values. Whether vector values are included in the response. |
| `includeMetadata` | boolean | no | `false` | Include Metadata. Whether metadata is included in the response. |

### `search_index`

**Search Index.** Discovers indexes in the connected Pinecone project, operating in one of two modes: list all indexes (optionally narrowed by a case-insensitive partial name filter) or describe one specific index by its exact name. Use to enumerate available indexes or confirm an index exists and inspect its configuration before other operations. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchMode` | string | yes | `"list"` | Search Mode. Choose how to search for indexes. One of `"list"`, `"find"`. |
| `indexName` | string | no |  | Index Name. The name of the specific index to search for (when using Find Specific Index mode) |
| `nameFilter` | string | no |  | Name Filter. Filter indexes by name (partial match, case-insensitive) |
