# GoodMem

Store documents as memories with vector embeddings and perform similarity-based semantic retrieval using GoodMem

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-goodmem'
  version: '0.0.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: GoodMem Authentication

> Connect to your GoodMem API instance for vector-based memory storage and semantic retrieval

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes |  | Base URL. The base URL of your GoodMem API server (e.g., https://api.goodmem.ai or http://localhost:8080) |
| `apiKey` | string | yes |  | API Key. Your GoodMem API key for authentication (X-API-Key) |

## Actions

### `create_space`

**Create Space.** Provisions a GoodMem space (a named container of memories with a configured embedder model) and returns its ID, which is required before storing or retrieving memories. Use it to set up a target space when one does not already exist. It is idempotent on the space name: if a space with the same name already exists, its existing ID is returned instead of creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Space Name. A unique name for the space. If a space with this name already exists, its ID will be returned instead of creating a duplicate. |
| `embedderId` | string | yes |  | Embedder. The embedder model that converts text into vector representations for similarity search. A value the product loads from the provider, such as an id; write the value itself. |
| `advancedChunking` | object | no |  | Advanced Chunking Options. An object whose fields depend on other inputs; the product shows them. |

### `create_memory`

**Create Memory.** Stores content as a new memory in a GoodMem space, which is then chunked and embedded asynchronously for later semantic retrieval. Provide the content either as a file or as plain text (the file takes priority when both are given), along with the target space ID. Use it to ingest documents into a memory store. Not idempotent: each call creates a separate memory, so repeated calls produce duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select a space to use. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | no |  | File. A file to store as memory (PDF, DOCX, image, etc.). Connect the output of a trigger or action that provides a file. Content type is auto-detected from the file extension. Files are not supported; an action that needs one fails. |
| `textContent` | string | no |  | Text Content. Plain text content to store as memory (sent as text/plain). If both File and Text Content are provided, the file takes priority. |
| `source` | string | no |  | Source. Where this memory came from (e.g., "google-drive", "gmail", "manual upload"). Stored in metadata.source. |
| `author` | string | no |  | Author. The author or creator of the content. Stored in metadata.author. |
| `tags` | string | no |  | Tags. Comma-separated tags for categorization (e.g., "legal,research,important"). Stored in metadata.tags as an array. |
| `metadata` | JSON | no |  | Additional Metadata. Extra key-value metadata as JSON. Merged with Source, Author, and Tags fields above. |

### `retrieve_memories`

**Retrieve Memories.** Runs a semantic (vector-similarity) search over one or more GoodMem spaces using a natural-language query and returns the matching memory chunks ranked by relevance, optionally reranked or LLM-post-processed. Use it to recall stored knowledge relevant to a question; requires at least one space ID. Read-only and idempotent, though by default it retries for up to 60 seconds when no results are found so freshly added memories have time to finish indexing. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. A natural language query used to find semantically similar memory chunks. |
| `spaceIds` | array | yes |  | Spaces. Select one or more spaces to search across. Values the product loads from the provider, such as ids; write an array of them. |
| `maxResults` | number | no | `5` | Maximum Results. Limit the number of returned memories. |
| `includeMemoryDefinition` | boolean | no | `true` | Include Memory Definition. Fetch the full memory metadata (source document info, processing status) alongside the matched chunks. |
| `waitForIndexing` | boolean | no | `true` | Wait for Indexing. Retry for up to 60 seconds when no results are found. Enable this when memories were just added and may still be undergoing chunking and embedding. |
| `rerankerId` | string | no |  | Reranker. Optional reranker model to improve result ordering. A value the product loads from the provider, such as an id; write the value itself. |
| `llmId` | string | no |  | LLM. Optional LLM to generate contextual responses alongside retrieved chunks. A value the product loads from the provider, such as an id; write the value itself. |
| `relevanceThreshold` | number | no |  | Relevance Threshold. Minimum score (0-1) for including results. Only used when Reranker or LLM is set. |
| `llmTemperature` | number | no |  | LLM Temperature. Creativity setting for LLM generation (0-2). Only used when LLM ID is set. |
| `chronologicalResort` | boolean | no | `false` | Chronological Resort. Reorder results by creation time instead of relevance score. |

### `get_memory`

**Get Memory.** Looks up a single GoodMem memory by its ID and returns its metadata and processing status, optionally including the original document content. Use it when you already have a memory ID (e.g. from Create Memory or a retrieval result) and need its full details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `memoryId` | string | yes |  | Memory ID. The UUID of the memory to fetch (returned by Create Memory) |
| `includeContent` | boolean | no | `true` | Include Content. Fetch the original document content of the memory in addition to its metadata. |

### `delete_memory`

**Delete Memory.** Permanently deletes a GoodMem memory and its associated chunks and vector embeddings, identified by memory ID. Use it to remove stored content from a space. This is destructive but idempotent: once the memory is gone, repeating the call with the same ID leaves the end state unchanged. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `memoryId` | string | yes |  | Memory ID. The UUID of the memory to delete (returned by Create Memory) |
