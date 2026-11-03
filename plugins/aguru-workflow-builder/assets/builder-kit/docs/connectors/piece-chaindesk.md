# Chaindesk

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chaindesk'
  version: '0.2.2'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [API Keys settings](https://app.askli.co/settings/api-keys).

## Actions

### `query-agent`

**Query Agent.** Sends a query to a specific Chaindesk agent (selected by agent ID) and returns its generated answer. Use to get a conversational AI response grounded in the agent's configured datastores. Pass a conversation ID to continue an existing thread, or omit it to start a new conversation. Not idempotent: each call is a generative request and may create a new conversation. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | Query. |
| `conversationId` | string | no |  | Conversation ID. ID of the conversation (If not provided a new conversation is created). |

### `query-datastore`

**Query Datastore.** Runs a semantic search query against a specific Chaindesk datastore (selected by datastore ID) and returns the matching documents/chunks. Use to retrieve relevant knowledge-base content for a question without invoking an agent. Read-only and idempotent: the same query returns the same matches with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datastoreId` | string | yes |  | Datastore ID. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | Query. |

### `upload-file`

**Upload File.** Uploads a file as a new datasource into a specific Chaindesk datastore (selected by datastore ID), ingesting its content into the knowledge base. Use to add documents an agent or datastore search can later draw on; requires the binary file input. Not idempotent: each call creates a new datasource, so repeating uploads the same file again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datastoreId` | string | yes |  | Datastore ID. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | File Name. |

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
