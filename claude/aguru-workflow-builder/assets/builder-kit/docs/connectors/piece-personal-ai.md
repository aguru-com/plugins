# Personal AI

Manage memory storage, messaging, and documents through AI integration.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-personal-ai'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API Key for authentication

## Actions

### `create_memory`

**Create Memory.** Append a plain-text memory to the Personal AI memory stack so the assistant can recall it later, tagging it with a required source name and optional tags/domain/timestamp. Use when you want to persist a fact or note for future retrieval. Each call adds a new memory entry, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Memory Text. Plain text memories to upload to your stack. |
| `sourceName` | string | yes |  | Source Name. The source or application of memory to help you recall where it is from. |
| `createdTime` | string | no |  | Created Time. Time (including timezone) of the memory (e.g., Wed, 19 Sep 2023 13:31:00 PDT) |
| `rawFeedText` | string | no |  | Raw Feed Text. The formatted text that can be stored as it is. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI persona. |
| `tags` | string | no |  | Tags. Comma delimited list of tags for the memory. |

### `create_message`

**Send Message.** Send a message to the Personal AI assistant and get its generated reply, optionally continuing an existing conversation by reusing the same session ID. Use when you want a conversational answer from the assistant; set the add-to-memory flag to also persist the message. Each call produces a fresh response, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Message Text. Message to send to your AI for a response. |
| `context` | string | no |  | Context. Additional context for the AI response (Similar to Reply function) |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `userName` | string | no |  | User Name. Name of the user sending the request. |
| `sessionId` | string | no |  | Session ID. Use the same sessionId to continue conversation on that session. |
| `sourceName` | string | no |  | Source Name. Name of the source app of the inbound message. |
| `isStack` | boolean | no | `false` | Add to Memory. Flag to also add the user message to memory. |
| `isDraft` | boolean | no | `false` | Create Draft. Flag to create a copilot message for the AI. |

### `create_chatgpt_instruction`

**Send ChatGPT Instruction.** Send an instruction or prompt to the Personal AI assistant routed through its ChatGPT integration and get the generated response, optionally continuing a session by reusing the same session ID. Use when you want a ChatGPT-backed answer rather than the standard message flow. Each call generates a fresh response, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Instruction Text. The instruction or prompt to send to ChatGPT. |
| `context` | string | no |  | Context. Additional context for the AI response. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `userName` | string | no |  | User Name. Name of the user sending the request. |
| `sessionId` | string | no |  | Session ID. Use the same sessionId to continue conversation on that session. |
| `sourceName` | string | no |  | Source Name. Name of the source app of the inbound instruction. |
| `isStack` | boolean | no | `false` | Add to Memory. Flag to also add the user instruction to memory. |
| `isDraft` | boolean | no | `false` | Create Draft. Flag to create a copilot message for the AI. |

### `create_custom_training`

**Send Custom Training.** Send a custom training instruction or prompt to the Personal AI assistant to shape its future behavior, optionally tied to a session. Use when you want to teach or fine-tune how the assistant responds rather than just chat with it. Each call submits a new training instruction, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Training Text. The training instruction or prompt to send. |
| `context` | string | no |  | Context. Additional context for the AI response. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `userName` | string | no |  | User Name. Name of the user sending the request. |
| `sessionId` | string | no |  | Session ID. Use the same sessionId to continue conversation on that session. |
| `sourceName` | string | no |  | Source Name. Name of the source app of the inbound training. |
| `isStack` | boolean | no | `false` | Add to Memory. Flag to also add the training instruction to memory. |
| `isDraft` | boolean | no | `false` | Create Draft. Flag to create a copilot message for the AI. |

### `get_conversation`

**Get Conversation History.** Retrieve the message history for a conversation channel from the Personal AI assistant, with optional filtering by session/source and limit/skip pagination. Use when you need to read past messages rather than send a new one. The required channel ID identifies the conversation; this is a read-only lookup and is idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. The unique identifier for the conversation channel. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `userName` | string | no |  | User Name. Name of the user requesting the conversation. |
| `sessionId` | string | no |  | Session ID. Filter conversation by specific session ID. |
| `sourceName` | string | no |  | Source Name. Filter conversation by source application. |
| `limit` | number | no |  | Limit. Maximum number of messages to return. |
| `skip` | number | no |  | Skip. Number of messages to skip (for pagination) |

### `upload_document`

**Upload Document.** Upload a text document (raw text plus a title) to the Personal AI assistant so it can reference the content, with optional tags, source, and add-to-memory flag. Use when the source is plain text already in hand; use Upload File for binary files or Upload URL Content to fetch from a link. Each call creates a new document, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Document Text. The text content of the document to upload. |
| `title` | string | yes |  | Document Title. Title of the document. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `tags` | string | no |  | Tags. Comma delimited list of tags for the document. |
| `sourceName` | string | no |  | Source Name. Name of the source or application. |
| `createdTime` | string | no |  | Created Time. Time (including timezone) of the document creation (e.g., Wed, 19 Sep 2023 13:31:00 PDT) |
| `isStack` | boolean | no | `false` | Add to Memory. Flag to also add the document to memory. |

### `upload_file`

**Upload File.** Upload a binary file (sent as multipart form data) to the Personal AI assistant so it can reference the content, with optional tags, source, and add-to-memory flag. Use when the source is an actual file; use Upload Document for plain text or Upload URL Content to fetch from a link. Each call creates a new uploaded file, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |
| `fileName` | string | yes |  | File Name. Name of the file to be uploaded. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `tags` | string | no |  | Tags. Comma delimited list of tags for the file. |
| `sourceName` | string | no |  | Source Name. Name of the source or application. |
| `createdTime` | string | no |  | Created Time. Time (including timezone) of the file creation (e.g., Wed, 19 Sep 2023 13:31:00 PDT) |
| `isStack` | boolean | no | `false` | Add to Memory. Flag to also add the file content to memory. |

### `upload_url`

**Upload URL Content.** Fetch the content at a given URL and upload it to the Personal AI assistant under a title, with optional tags, source, and add-to-memory flag. Use when the source is a web link; use Upload Document for plain text or Upload File for binary files in hand. Each call creates a new entry, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The URL of the content to upload. |
| `title` | string | yes |  | Title. Title for the uploaded content. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `tags` | string | no |  | Tags. Comma delimited list of tags for the content. |
| `sourceName` | string | no |  | Source Name. Name of the source or application. |
| `createdTime` | string | no |  | Created Time. Time (including timezone) of the content creation (e.g., Wed, 19 Sep 2023 13:31:00 PDT) |
| `isStack` | boolean | no | `false` | Add to Memory. Flag to also add the content to memory. |

### `update_document`

**Update Document.** Overwrite an existing Personal AI document, identified by its document ID, with new text and optional title/tags/source. Use when you need to revise a known document rather than create a new one; the document ID must already exist. Because it replaces the document keyed on a stable ID, repeating the same call yields the same result and is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The unique identifier of the document to update. |
| `text` | string | yes |  | Document Text. The updated text content of the document. |
| `title` | string | no |  | Document Title. Updated title of the document. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `tags` | string | no |  | Tags. Comma delimited list of tags for the document. |
| `sourceName` | string | no |  | Source Name. Name of the source or application. |
| `createdTime` | string | no |  | Created Time. Time (including timezone) of the document creation (e.g., Wed, 19 Sep 2023 13:31:00 PDT) |
| `isStack` | boolean | no | `false` | Add to Memory. Flag to also add the document to memory. |

### `get_document`

**Get Document.** Fetch a single Personal AI document by its document ID, optionally including the full content. Use when you need to read back a previously uploaded document. The document ID is required; this is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The unique identifier of the document to retrieve. |
| `domainName` | string | no |  | Domain Name. The domain identifier for the AI profile. |
| `includeContent` | boolean | no | `true` | Include Content. Flag to include the document content in the response. |
