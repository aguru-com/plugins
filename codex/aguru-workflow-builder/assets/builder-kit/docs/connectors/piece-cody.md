# Cody

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cody'
  version: '0.3.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Visit your Cody AI API Keys page to retrieve the API key.

## Actions

### `create_document_from_text`

**Create Document From Text.** Creates a new document in a Cody knowledge base folder from raw text or HTML content, so the bot can later answer from it. Use when ingesting inline/generated text (not a file upload). Requires a target folder ID and the content (max 768 KB); creates a new document on each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Document Name. The name or title of the new document. |
| `content` | string | yes |  | Content. The text or HTML content to be added to the document. Max 768 KB. |

Output fields:

- `data`: Document
- `data.id`: Document ID
- `data.name`: Name
- `data.status`: Status
- `data.content_url`: Content URL (url)
- `data.folder_id`: Folder ID
- `data.created_at`: Created At (datetime)

### `upload_file`

**Upload File to Knowledge Base.** Uploads a binary file (e.g. txt, md, rtf, pdf, ppt, docx) into a Cody knowledge base folder via a signed URL, then registers it as a document. Use when ingesting an existing file rather than inline text. Requires a target folder ID and the file; creates a new document each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload (e.g., txt, md, rtf, pdf, ppt, docx). Files are not supported; an action that needs one fails. |

Output fields:

- `success`: Success (boolean)
- `message`: Message

### `send_message`

**Send Message.** Posts a message to an existing Cody conversation and returns the bot AI-generated reply. Use to query a bot within an already-created conversation thread. Requires the conversation ID and message text (max 2000 characters); each call appends a new message, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Message. The message to send to the conversation. (Max 2000 characters) |

Output fields:

- `data`: Message
- `data.id`: Message ID
- `data.content`: Content
- `data.conversation_id`: Conversation ID
- `data.machine`: Machine (Bot Reply) (boolean)
- `data.failed_responding`: Failed Responding (boolean)
- `data.flagged`: Flagged (boolean)
- `data.created_at`: Created At (datetime)

### `create_conversation`

**Create Conversation.** Starts a new conversation thread with a specific Cody bot, returning a conversation ID to use with Send Message. Optionally pass a list of document IDs to scope the bot knowledge base to just those documents (focus mode). Requires a bot ID and a name; creates a new conversation each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bot_id` | string | yes |  | Bot. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Conversation Name. The name for the new conversation. |
| `document_ids` | array | no |  | Document IDs (Focus Mode). A list of document IDs to limit the bot's knowledge base for this conversation. |

Output fields:

- `data`: Conversation
- `data.id`: Conversation ID
- `data.name`: Name
- `data.bot_id`: Bot ID
- `data.created_at`: Created At (datetime)

### `find_bot`

**Find Bot.** Searches Cody bots by name (case-insensitive partial match) and returns the matches. Use to resolve a bot name to its ID before creating a conversation. This is a read-only lookup and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Bot Name. The name of the bot to search for. The search is case-insensitive and partial. |

Output fields:

- `found`: Found (boolean)
- `bots`: Bots
- `bots[].id`: Bot ID
- `bots[].name`: Name
- `bots[].description`: Description
- `bots[].model`: Model
- `bots[].created_at`: Created At (datetime)

### `find_conversation`

**Find Conversation.** Searches Cody conversations, filtering by owning bot ID and/or by name (partial match) and returns the matches. Use to resolve an existing conversation to its ID. At least one of bot or name must be provided. This is a read-only lookup and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bot_id` | string | no |  | Bot. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Conversation Name. The name of the conversation to search for (partial match). |

Output fields:

- `found`: Found (boolean)
- `conversations`: Conversations
- `conversations[].id`: Conversation ID
- `conversations[].name`: Name
- `conversations[].bot_id`: Bot ID
- `conversations[].created_at`: Created At (datetime)

### `list_bots`

**List Bots.** Lists the bots in the Cody workspace, optionally filtered by a name keyword (case-insensitive partial match). This is the primary resolver: bots are read-only and can only be created in the Cody web UI (there is no create-bot API), so this is the only way to obtain a bot ID for Create Conversation. Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyword` | string | no |  | Keyword. Optional name keyword to filter bots by (case-insensitive partial match). Omit to list all bots. |

Output fields:

- `bots`: Bots
- `bots[].id`: Bot ID
- `bots[].name`: Name
- `bots[].description`: Description
- `bots[].model`: Model
- `bots[].created_at`: Created At (datetime)
- `count`: Count (number)

### `create_conversation_ai`

**Create Conversation (AI).** Starts a new conversation thread with a specific Cody bot, returning a conversation ID to use with Send Message. Resolve the bot ID first via List Bots. Optionally pass document IDs (from List Documents, max 1000) to scope the bot to just those documents (focus mode). Requires a bot ID and a name; creates a new conversation each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bot_id` | string | yes |  | Bot ID. The ID of the bot to converse with. Resolve via List Bots. |
| `name` | string | yes |  | Conversation Name. The name for the new conversation. |
| `document_ids` | array | no |  | Document IDs (Focus Mode). A list of document IDs to limit the bot's knowledge base for this conversation (focus mode, max 1000). Resolve via List Documents. Omit to use the bot's full knowledge base. |

Output fields:

- `data`: Conversation
- `data.id`: Conversation ID
- `data.name`: Name
- `data.bot_id`: Bot ID
- `data.created_at`: Created At (datetime)

### `send_message_ai`

**Send Message (AI).** Posts a message to an existing Cody conversation and returns the bot AI-generated reply. Use to query a bot within an already-created conversation thread; resolve or create the conversation ID first via List Conversations or Create Conversation. This is the non-streaming verb (returns the full reply as a single object). Requires the conversation ID and message text (max 2000 characters); each call appends a new message, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The ID of the conversation to post into. Resolve via List Conversations or Create Conversation. |
| `content` | string | yes |  | Message. The message to send to the conversation. Max 2000 characters. |

Output fields:

- `data`: Message
- `data.id`: Message ID
- `data.content`: Content
- `data.conversation_id`: Conversation ID
- `data.machine`: Machine (Bot Reply) (boolean)
- `data.failed_responding`: Failed Responding (boolean)
- `data.flagged`: Flagged (boolean)
- `data.created_at`: Created At (datetime)

### `list_conversations`

**List Conversations.** Lists conversations in the Cody workspace, optionally filtered by owning bot ID and/or a name keyword (partial match). Use to resolve an existing conversation to its ID before sending a message; unlike Get Conversation this returns many and all filters are optional. Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bot_id` | string | no |  | Bot ID. Optional bot ID to list conversations for. Resolve via List Bots. Omit to list across all bots. |
| `keyword` | string | no |  | Keyword. Optional name keyword to filter conversations by (partial match). Omit to list all. |

Output fields:

- `conversations`: Conversations
- `conversations[].id`: Conversation ID
- `conversations[].name`: Name
- `conversations[].bot_id`: Bot ID
- `conversations[].created_at`: Created At (datetime)
- `count`: Count (number)

### `create_text_document`

**Create Text Document.** Creates a new document in a Cody knowledge-base folder from raw text or HTML content, so a bot can later answer from it. Use when ingesting inline or generated text; for a file use Upload File to Knowledge Base, for a web page use Create Document From Webpage. Resolve the folder ID first via List Folders (or create one with Create Folder). Ingestion is asynchronous (the document starts in status pending) so poll Get Document for status before querying. Requires a folder ID, a name, and the content (max 768 KB); creates a new document each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to create the document in. Resolve via List Folders. |
| `name` | string | yes |  | Document Name. The name or title of the new document. |
| `content` | string | yes |  | Content. The text or HTML content to be added to the document. Max 768 KB. |

Output fields:

- `data`: Document
- `data.id`: Document ID
- `data.name`: Name
- `data.status`: Status
- `data.content_url`: Content URL (url)
- `data.folder_id`: Folder ID
- `data.created_at`: Created At (datetime)

### `upload_file_to_kb`

**Upload File to Knowledge Base (AI).** Uploads a binary file (e.g. txt, md, rtf, pdf, ppt, docx) into a Cody knowledge-base folder and registers it as a document. Use when ingesting an existing file rather than inline text (use Create Text Document) or a web page (use Create Document From Webpage). Resolve the folder ID first via List Folders. This is a composite operation (mint a signed upload URL, PUT the bytes to storage, then register the document); ingestion is asynchronous, so poll Get Document for status. Requires a folder ID and the file; creates a new document each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to upload the file into. Resolve via List Folders. |
| `file` | file | yes |  | File. The file to upload (e.g., txt, md, rtf, pdf, ppt, docx). Files are not supported; an action that needs one fails. |

Output fields:

- `success`: Success (boolean)
- `message`: Message

### `get_conversation`

**Get Conversation.** Retrieves the details of a single Cody conversation by its ID. Use when you already have the conversation ID (from List Conversations or Create Conversation) and want its full detail; to search across many conversations use List Conversations instead. Optionally request includes (document_ids and/or messages) to embed the focus documents or message history. Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The ID of the conversation to retrieve. Resolve via List Conversations. |
| `includes` | string | no |  | Includes. Optional comma-separated related data to embed in the response. One or more of: 'document_ids', 'messages'. |

Output fields:

- `data`: Conversation
- `data.id`: Conversation ID
- `data.name`: Name
- `data.bot_id`: Bot ID
- `data.created_at`: Created At (datetime)
- `data.document_ids`: Document IDs (Focus Mode)
- `data.document_ids.data`: IDs

### `update_conversation`

**Update Conversation.** Updates a Cody conversation via a full replace, not a partial patch: name AND bot ID are both required, so to change just one (e.g. rename) you must re-send the current value of the other to keep it. Focus-mode documents are part of the replace too: re-send the conversation's current document IDs (from Get Conversation) to keep them — omitting Document IDs may clear focus mode. Fetch the current values with Get Conversation first. Convergent set-by-key (re-sending the same values yields the same state), so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The ID of the conversation to update. Resolve via List Conversations. |
| `name` | string | yes |  | Name. The conversation name. Required (full replace): re-send the current name if you only want to change the bot. |
| `bot_id` | string | yes |  | Bot ID. The bot ID for the conversation. Required (full replace): re-send the current bot ID if you only want to rename. Resolve via List Bots. |
| `document_ids` | array | no |  | Document IDs (Focus Mode). Optional list of document IDs to set as the focus-mode documents for this conversation (full replace). Re-send the current focus documents (from Get Conversation) to keep them; omitting may clear focus mode. Resolve via List Documents. |

Output fields:

- `data`: Conversation
- `data.id`: Conversation ID
- `data.name`: Name
- `data.bot_id`: Bot ID
- `data.created_at`: Created At (datetime)

### `delete_conversation`

**Delete Conversation.** Permanently deletes a Cody conversation by its ID, including its message history. This is destructive and cannot be undone (Cody has no archive). Resolve the conversation ID via List Conversations and confirm it is the correct one before calling. A retry on an already-deleted conversation returns a 404, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The ID of the conversation to permanently delete. Resolve via List Conversations. |

Output fields:

- `success`: Success (boolean)
- `conversation_id`: Conversation ID

### `list_messages`

**List Messages.** Lists the message history of a single Cody conversation, returning each message's ID and content. The conversation ID is required (the list is scoped to one conversation); resolve it via List Conversations. Use to read a thread's history; to fetch one message use Get Message. Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The ID of the conversation whose messages to list. Resolve via List Conversations. |
| `page` | number | no |  | Page. Optional 1-based page number for pagination. |
| `per_page` | number | no |  | Per Page. Optional number of messages to return per page. |

Output fields:

- `data`: Messages
- `data[].id`: Message ID
- `data[].content`: Content
- `data[].conversation_id`: Conversation ID
- `data[].machine`: Machine (Bot Reply) (boolean)
- `data[].failed_responding`: Failed Responding (boolean)
- `data[].flagged`: Flagged (boolean)
- `data[].created_at`: Created At (datetime)
- `meta`: Meta
- `meta.pagination`: Pagination
- `meta.pagination.total`: Total (number)
- `meta.pagination.count`: Count (number)
- `meta.pagination.per_page`: Per Page (number)
- `meta.pagination.current_page`: Current Page (number)
- `meta.pagination.total_pages`: Total Pages (number)

### `get_message`

**Get Message.** Retrieves the details of a single Cody message by its ID. Use when you already have a specific message ID; to read a whole thread use List Messages (which returns full message objects). Resolve the message ID via List Messages. Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. The ID of the message to retrieve. Resolve via List Messages. |
| `includes` | string | no |  | Includes. Optional comma-separated related data to embed in the response. |

Output fields:

- `data`: Message
- `data.id`: Message ID
- `data.content`: Content
- `data.conversation_id`: Conversation ID
- `data.machine`: Machine (Bot Reply) (boolean)
- `data.failed_responding`: Failed Responding (boolean)
- `data.flagged`: Flagged (boolean)
- `data.created_at`: Created At (datetime)
- `data.sources`: Sources
- `data.sources.data`: Source Documents
- `data.usage`: Usage
- `data.usage.tokens`: Tokens (number)
- `data.usage.credits`: Credits (number)

### `list_folders`

**List Folders.** Lists the knowledge-base folders in the Cody workspace, optionally filtered by a name keyword. This is the key resolver for the folder ID required by every document-create action (Create Text Document, Upload File to Knowledge Base, Create Document From Webpage). Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyword` | string | no |  | Keyword. Optional name keyword to filter folders by (partial match). Omit to list all folders. |
| `page` | number | no |  | Page. Optional 1-based page number for pagination. |
| `per_page` | number | no |  | Per Page. Optional number of folders to return per page. |

Output fields:

- `data`: Folders
- `data[].id`: Folder ID
- `data[].name`: Name
- `data[].created_at`: Created At (datetime)
- `meta`: Meta
- `meta.pagination`: Pagination
- `meta.pagination.total`: Total (number)
- `meta.pagination.count`: Count (number)
- `meta.pagination.per_page`: Per Page (number)
- `meta.pagination.current_page`: Current Page (number)
- `meta.pagination.total_pages`: Total Pages (number)

### `get_folder`

**Get Folder.** Retrieves the details of a single Cody knowledge-base folder by its ID. Use when you already have the folder ID; to search across folders use List Folders (which returns full folder objects). Resolve the folder ID via List Folders. Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to retrieve. Resolve via List Folders. |

Output fields:

- `data`: Folder
- `data.id`: Folder ID
- `data.name`: Name
- `data.created_at`: Created At (datetime)

### `create_folder`

**Create Folder.** Creates a new knowledge-base folder, the container that documents live in. Use to set up the knowledge-base structure before ingesting documents; the returned folder ID is then passed to the document-create actions. Requires a name; creates a new folder each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the new folder. |

Output fields:

- `data`: Folder
- `data.id`: Folder ID
- `data.name`: Name
- `data.created_at`: Created At (datetime)

### `rename_folder`

**Rename Folder.** Renames a Cody knowledge-base folder, identified by its ID. Resolve the folder ID via List Folders. Note Cody has no folder-delete endpoint, so folders can be created and renamed but not removed via the API. Convergent set-by-key (re-sending the same name yields the same state), so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to rename. Resolve via List Folders. |
| `name` | string | yes |  | Name. The new name for the folder. |

Output fields:

- `data`: Folder
- `data.id`: Folder ID
- `data.name`: Name
- `data.created_at`: Created At (datetime)

### `list_documents`

**List Documents.** Lists documents in the Cody knowledge base, optionally filtered by folder ID, conversation ID, or a name keyword, returning each document's ID and ingestion status. This is the resolver for the document IDs used in focus mode (Create/Update Conversation) and for Get Document and Delete Document. Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | no |  | Folder ID. Optional folder ID to list documents from. Resolve via List Folders. Omit to list across all folders. |
| `conversation_id` | string | no |  | Conversation ID. Optional conversation ID to list the focus-mode documents of. Resolve via List Conversations. |
| `keyword` | string | no |  | Keyword. Optional name keyword to filter documents by (partial match). |
| `page` | number | no |  | Page. Optional 1-based page number for pagination. |
| `per_page` | number | no |  | Per Page. Optional number of documents to return per page. |

Output fields:

- `data`: Documents
- `data[].id`: Document ID
- `data[].name`: Name
- `data[].status`: Status
- `data[].content_url`: Content URL (url)
- `data[].folder_id`: Folder ID
- `data[].created_at`: Created At (datetime)
- `meta`: Meta
- `meta.pagination`: Pagination
- `meta.pagination.total`: Total (number)
- `meta.pagination.count`: Count (number)
- `meta.pagination.per_page`: Per Page (number)
- `meta.pagination.current_page`: Current Page (number)
- `meta.pagination.total_pages`: Total Pages (number)

### `create_document_from_webpage`

**Create Document From Webpage.** Scrapes a web page at the given URL into a new Cody knowledge-base document, so a bot can answer from it. Use to ingest a page by URL; for inline text use Create Text Document and for a file use Upload File to Knowledge Base. Resolve the folder ID via List Folders first. Ingestion is asynchronous (the document starts in status pending) and consumes the workspace embedding quota, so poll Get Document for status. Requires a URL and a folder ID; creates a new document each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The full URL of the web page to scrape, including protocol, e.g. 'https://example.com/page'. |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to create the document in. Resolve via List Folders. |

Output fields:

- `data`: Document
- `data.id`: Document ID
- `data.name`: Name
- `data.status`: Status
- `data.content_url`: Content URL (url)
- `data.folder_id`: Folder ID
- `data.created_at`: Created At (datetime)

### `get_document`

**Get Document.** Retrieves the details of a single Cody knowledge-base document by its ID (name, status, content URL, folder). Use this to poll a document's ingestion status after creating it: a freshly created document starts in status pending and a bot cannot answer from it until it is processed. Resolve the document ID via List Documents. Read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document ID. The ID of the document to retrieve. Resolve via List Documents. |

Output fields:

- `data`: Document
- `data.id`: Document ID
- `data.name`: Name
- `data.status`: Status
- `data.content_url`: Content URL (url)
- `data.folder_id`: Folder ID
- `data.created_at`: Created At (datetime)

### `delete_document`

**Delete Document.** Permanently removes a document from the Cody knowledge base by its ID. This is destructive and cannot be undone (Cody has no archive). Resolve the document ID via List Documents and confirm it is the correct one before calling. A retry on an already-deleted document returns a 404, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document ID. The ID of the document to permanently delete. Resolve via List Documents. |

Output fields:

- `success`: Success (boolean)
- `document_id`: Document ID

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
