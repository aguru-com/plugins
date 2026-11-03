# Dust

Secure messaging and collaboration

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dust'
  version: '0.3.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Dust authentication requires an API key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API key. |
| `workspaceId` | string | yes |  | Dust workspace ID. Can be found in any of the workspace's URL. |
| `region` | string | no | `"us"` | Region. One of `"us"`, `"eu"`. |

## Actions

### `createConversation`

**Create conversation.** Start a new Dust conversation with a chosen assistant; pass a query to send the first message and have the assistant respond, or omit it to open an empty conversation for later replies. Optionally attach context by passing an uploaded File ID (takes precedence) or an inline file fragment. Each call creates a distinct conversation, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistant` | string | yes |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `username` | string | yes |  | Username. |
| `timezone` | string | yes | `"Europe/Paris"` | Time zone. |
| `title` | string | no |  | Title. |
| `query` | string | no |  | Query. |
| `fragment` | file | no |  | Fragment. Files are not supported; an action that needs one fails. |
| `fileId` | string | no |  | File ID. ID of the file to be added to the conversation (takes precedence over Fragment) |
| `fragmentName` | string | no |  | Fragment/file name. |
| `timeout` | number | yes | `120` | Timeout (seconds). |

### `getConversation`

**Get existing conversation.** Fetch an existing Dust conversation and its content by conversation sID. Use to read the assistant's latest answer or the message history for a known conversation. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationSid` | string | yes |  | Conversation sID. |
| `timeout` | number | yes | `120` | Timeout (seconds). |

### `replyToConversation`

**Reply to conversation.** Post a new message to an existing Dust conversation, mentioning a chosen assistant, then return the conversation content once the assistant responds. Requires the target conversation ID and the query text. Each call appends a message, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. |
| `assistant` | string | yes |  | Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | Query. |
| `username` | string | yes |  | Username. |
| `timezone` | string | yes | `"Europe/Paris"` | Time zone. |
| `timeout` | number | yes | `120` | Timeout (seconds). |

### `addFragmentToConversation`

**Add fragment to conversation.** Attach a file as a content fragment to an existing Dust conversation, supplying extra context the assistant can use when answering. Requires the conversation ID and a file. Each call adds another fragment, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationId` | string | yes |  | Conversation ID. |
| `fragment` | file | yes |  | Fragment. Files are not supported; an action that needs one fails. |
| `fragmentName` | string | no |  | Fragment name. |

### `addDocument`

**Add or update document.** Upsert a text document into a Dust Data Source: creates the document if the given Document ID is new, or overwrites it if it already exists. Requires the Data Source name, Document ID, and content. Idempotent because it is keyed on the stable Document ID — repeating with the same input yields the same stored document. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasource` | string | yes |  | Data Source name. |
| `documentId` | string | yes |  | Document ID. The ID of the document you want to insert or replace. |
| `content` | string | yes |  | Document content. The text content of the document. |
| `sourceUrl` | string | no |  | Source URL. The source URL of the document (when cited) |
| `title` | string | no |  | Document title. User-friendly title of the document. |
| `tags` | array | no |  | Tags. |

### `uploadFile`

**Upload file.** Upload a file to Dust so it can later be referenced (by the returned file ID) when creating a conversation or content fragment. Use this first when you need to feed a file into a conversation. Each call uploads a new file instance, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |

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
