# Qdrant

Make any action on your qdrant vector database

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-qdrant'
  version: '0.3.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> ### Using Qdrant cloud
> 1. Connect to your [Qdrant cloud account](https://cloud.qdrant.io)
> 2. Create a new cluster if it's the first time you  use Qdrant
> 3. Go to Data Access Control and create a new api key and copy it
> 4. Go to clusters, click on the arrow `>` and copy the Cluster URL.
>
> ### Using self-hosted Qdrant
> Try to create your own qdrant instance using the [documentation guides](https://qdrant.tech/documentation/guides/)

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serverAddress` | string | yes |  | Server Address. The url of the Qdrant instance. |
| `key` | string | yes |  | API KEY. Enter the API Key of your Qdrant account. |

## Actions

### `add_points_to_collection`

**Add points to collection.** Upsert one or more points (vectors plus optional payload) into a Qdrant collection, auto-creating the collection with the chosen distance metric if it does not yet exist. Use to load embeddings into a vector store. Embeddings are passed as a file and must all share the same dimensionality. Not idempotent: when point ids are omitted they are randomly generated, so each call appends new points; supply stable ids to overwrite the same points instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collectionName` | string | yes |  | Collection Name. The name of the collection needed for this action. |
| `embeddings` | file | yes |  | Embeddings. Embeddings (= vectors) for the points. Files are not supported; an action that needs one fails. |
| `embeddingsIds` | array | no |  | Embeddings Ids. The ids of the embeddings for the points. If not provided, the ids will be generated automatically. |
| `distance` | string | yes | `"Cosine"` | Calculation Method of distance. The calculation method helps to rank vectors when you want to find the closest points, the method to use depends on the model who's created the embeddings, see the documentation of your model. One of `"Cosine"`, `"Euclid"`, `"Dot"`. |
| `payload` | JSON | no |  | Additional Payload. Please follow [payload documentation](https://qdrant.tech/documentation/concepts/payload/) to add additional information to the points. |
| `storage` | string | no | `"Disk"` | Storage. Define where points will be stored. One of `"Disk"`, `"Memory"`. |

### `collection_list`

**Get Collection List.** List all collections in the connected Qdrant instance. Use to discover available collection names before targeting one with another action. Takes no input. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `collection_infos`

**Get Collection Infos.** Retrieve configuration and status details for a single Qdrant collection by name (vector params, point counts, indexing state, etc.). Use to inspect a collection before reading from or writing to it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collectionName` | string | yes |  | Collection Name. The name of the collection needed for this action. |

### `delete_collection`

**Delete Collection.** Permanently delete an entire Qdrant collection, including all of its points, identified by collection name. Use to tear down a vector store. Idempotent: re-running once the collection is gone leaves the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collectionName` | string | yes |  | Collection Name. The name of the collection needed for this action. |

### `delete_points`

**Delete Points.** Delete points from a Qdrant collection, selecting them either by an explicit list of ids or by a payload filter (must / must_not conditions). Use to remove specific vectors from a collection. Idempotent: deleting points that are already absent leaves the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collectionName` | string | yes |  | Collection Name. The name of the collection needed for this action. |
| `getPointsBy` | string | yes | `"Ids"` | Choose Points By. The method to use to get the points. One of `"Ids"`, `"Filtering"`. |
| `infosToGetPoint` | object | yes |  | By ids or filtering. The infos to select points. An object whose fields depend on other inputs; the product shows them. |

### `get_points`

**Get Points.** Fetch points from a Qdrant collection, selecting them either by an explicit list of ids or by a payload filter (must / must_not conditions). Use to look up known points or scroll through points matching metadata, as opposed to vector-similarity search. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collectionName` | string | yes |  | Collection Name. The name of the collection needed for this action. |
| `getPointsBy` | string | yes | `"Ids"` | Choose Points By. The method to use to get the points. One of `"Ids"`, `"Filtering"`. |
| `infosToGetPoint` | object | yes |  | By ids or filtering. The infos to select points. An object whose fields depend on other inputs; the product shows them. |

### `search_points`

**Search Points.** Run a vector-similarity search against a Qdrant collection, returning the points nearest to a supplied query embedding, optionally narrowed by a payload filter and steered away from an optional negative vector. Use this for semantic / nearest-neighbor retrieval; use Get Points instead when selecting by id or metadata only. The query vector is passed as a file and must match the collection dimensionality. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collectionName` | string | yes |  | Collection Name. The name of the collection needed for this action. |
| `vector` | file | yes |  | Embedding. The vector (= embedding) you want to search for. Files are not supported; an action that needs one fails. |
| `must` | object | no |  | Must Have. If the point have this property in his payload it will be selected. |
| `must_not` | object | no |  | Must Not Have. If the point have this property in his payload it will not be selected. |
| `negativeVector` | file | no |  | Negative Vector. The vector (= embedding) you want to be the farthest. Files are not supported; an action that needs one fails. |
| `limitResult` | number | no | `20` | Limit Result. The max number of results you want to get. |
