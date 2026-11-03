# LLMRails

LLM Rails Platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-llmrails'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these instructions to get your LLMRails API Key:
>
> 1. Visit the following website: https://console.llmrails.com/api-keys.
> 2. Once on the website, click on create a key.
> 3. Once you have created a key, copy it and use it for the Api key field on the site.

## Actions

### `search`

**Datastore search.** Runs a semantic search query against an LLMRails datastore (vector store) and returns matching passages. Use to retrieve relevant context from a knowledge base for RAG or question answering. Requires the target datastore ID and a query text; optionally combines dense and sparse embeddings (hybrid) and can return a summarized answer over the results. Read-only and idempotent — repeating the same query returns the same results without side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datastoreId` | string | yes |  | Datastore ID. |
| `text` | string | yes |  | Text. Search query. |
| `hybrid` | boolean | yes | `true` | Hybrid search. Hybrid search is combining dense and sparse embeddings. |
| `summarize` | boolean | yes | `true` | Summarize. Summarizes the datastore search results. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |
