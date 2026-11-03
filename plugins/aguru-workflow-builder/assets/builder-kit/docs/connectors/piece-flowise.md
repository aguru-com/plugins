# Flowise

No-Code AI workflow builder

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-flowise'
  version: '0.3.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your Flowise URL and API Key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Base URL. Enter the base URL. |
| `access_token` | string | yes |  | API Key. Enter the API Key. |

## Actions

### `make_prediction`

**Make Prediction.** Sends a question/input to a specific Flowise chatflow by its Chatflow ID and returns the prediction, optionally passing prior conversation history and runtime override config. Use to invoke a deployed Flowise AI workflow (chatbot, RAG, agent) for inference. Requires the target Chatflow ID; not idempotent since each call generates a fresh model response. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflow_id` | string | yes |  | Chatflow ID. Enter the Chatflow ID. |
| `input` | string | yes |  | Input/Question. Enter the Input/Question. |
| `history` | JSON | no |  | History. Enter the History. |
| `overrideConfig` | JSON | no |  | Override Config. Enter the Override Config. |

Output fields:

- `text`: Answer
- `question`: Question
- `chatId`: Chat ID
- `chatMessageId`: Message ID
- `sessionId`: Session ID
- `memoryType`: Memory Type
- `isStreamValid`: Streaming Available (boolean)

### `flowise_create_assistant`

**Create Assistant.** Creates an assistant. CUSTOM assistants live only in Flowise and need just `details` with a `name`. OPENAI and AZURE assistants are also created on OpenAI and need the ID of a Flowise credential that holds the OpenAI API key. Each call creates another assistant. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes | `"CUSTOM"` | Type. CUSTOM keeps the assistant in Flowise; OPENAI and AZURE also create it on OpenAI. One of `"CUSTOM"`, `"OPENAI"`, `"AZURE"`. |
| `details` | JSON | yes |  | Details. Assistant settings as an object, e.g. `{"name":"Support bot","description":"...","model":"gpt-4o","instructions":"..."}`. `name` is required for CUSTOM. |
| `credential` | string | no |  | Credential ID. For OPENAI and AZURE: ID of the Flowise credential with the OpenAI API key. Leave empty for CUSTOM. |
| `iconSrc` | string | no |  | Icon URL. URL of the assistant icon. |

Output fields:

- `id`: Assistant ID
- `type`: Type
- `details`: Details (JSON)
- `credential`: Credential ID
- `iconSrc`: Icon (image)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_create_attachments`

**Create Attachment.** Uploads a file to one chat of a chatflow and returns its extracted text content, ready to pass to Make Prediction. The chatflow must have file uploads enabled. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |
| `chatId` | string | yes |  | Chat ID. ID of one chat session, returned as `chatId` by Make Prediction and List Chat Messages. |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |
| `base64` | boolean | no |  | Return Base64. Return the file content as base64 instead of extracted text. |

Output fields:

- `[].name`: File Name
- `[].mimeType`: MIME Type
- `[].size`: Size (filesize)
- `[].content`: Content

### `flowise_create_chatflow`

**Create Chatflow.** Creates a new chatflow from a name, a type and a `flowData` graph. To copy an existing flow, pass the `flowData` returned by Get Chatflow. Each call creates another chatflow. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the chatflow. |
| `flowData` | string | yes |  | Flow Data. The flow graph as a JSON string, e.g. `{"nodes":[],"edges":[]}`. Copy it from Get Chatflow to clone a flow. |
| `type` | string | yes | `"CHATFLOW"` | Type. Kind of flow. Use CHATFLOW for a classic chatflow. One of `"CHATFLOW"`, `"MULTIAGENT"`, `"AGENTFLOW"`. |
| `deployed` | boolean | no |  | Deployed. Whether the chatflow is deployed. |
| `isPublic` | boolean | no |  | Public. Whether the chatflow is publicly accessible without an API key. |
| `category` | string | no |  | Category. Category tags, separated by `;`. |

Output fields:

- `id`: Chatflow ID
- `name`: Name
- `type`: Type
- `flowData`: Flow Data (JSON)
- `deployed`: Deployed (boolean)
- `isPublic`: Public (boolean)
- `category`: Category
- `apikeyid`: API Key ID
- `chatbotConfig`: Chatbot Config (JSON)
- `apiConfig`: API Config (JSON)
- `analytic`: Analytics Config (JSON)
- `speechToText`: Speech To Text Config (JSON)
- `textToSpeech`: Text To Speech Config (JSON)
- `followUpPrompts`: Follow-Up Prompts Config (JSON)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_create_document_store`

**Create Document Store.** Creates an empty document store. Add documents to it with Upsert Document. Each call creates another store. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the document store. |
| `description` | string | no |  | Description. What the store contains. |

Output fields:

- `id`: Document Store ID
- `name`: Name
- `description`: Description
- `status`: Status
- `whereUsed`: Used By Chatflows
- `vectorStoreConfig`: Vector Store Config
- `vectorStoreConfig.name`: Vector Store
- `embeddingConfig`: Embedding Config
- `embeddingConfig.name`: Embedding Model
- `recordManagerConfig`: Record Manager Config
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)
- `loaders`: Loaders (JSON)

### `flowise_create_feedback`

**Create Feedback.** Rates one bot message thumbs up or down, with an optional comment. The Chat ID and Message ID come from Make Prediction (`chatId`, `chatMessageId`) or List Chat Messages. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |
| `chatId` | string | yes |  | Chat ID. ID of one chat session, returned as `chatId` by Make Prediction and List Chat Messages. |
| `messageId` | string | yes |  | Message ID. ID of the bot message to rate: `chatMessageId` from Make Prediction or `id` from List Chat Messages. |
| `rating` | string | yes |  | Rating. Thumbs up or thumbs down. One of `"THUMBS_UP"`, `"THUMBS_DOWN"`. |
| `content` | string | no |  | Comment. Optional comment explaining the rating. |

Output fields:

- `id`: Feedback ID
- `rating`: Rating
- `content`: Comment
- `messageId`: Message ID
- `chatId`: Chat ID
- `chatflowid`: Chatflow ID
- `createdDate`: Created Date (datetime)

### `flowise_create_lead`

**Create Lead.** Adds a lead (name, email, phone) to a chatflow, optionally linked to a chat session. Each call creates another lead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |
| `chatId` | string | no |  | Chat ID. Chat session the lead came from. Flowise generates one when empty. |
| `name` | string | no |  | Name. Name of the lead. |
| `email` | string | no |  | Email. Email of the lead. |
| `phone` | string | no |  | Phone. Phone number of the lead. |

Output fields:

- `id`: Lead ID
- `name`: Name
- `email`: Email (email)
- `phone`: Phone
- `chatId`: Chat ID
- `chatflowid`: Chatflow ID
- `createdDate`: Created Date (datetime)

### `flowise_create_tool`

**Create Tool.** Creates a custom tool: a name and description the LLM sees, an optional input schema and the JavaScript function it runs. Each call creates another tool. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Tool name the LLM sees, in snake_case, e.g. `get_weather`. |
| `description` | string | yes |  | Description. What the tool does and when the LLM should call it. |
| `color` | string | yes |  | Color. Background color of the tool card, e.g. `linear-gradient(rgb(0,0,0), rgb(0,0,0))` or `#4CAF50`. |
| `schema` | string | no |  | Input Schema. JSON string array of input fields, e.g. `[{"id":0,"property":"city","type":"string","description":"City name","required":true}]`. |
| `func` | string | no |  | Function. JavaScript the tool runs. Inputs are available as `$<property>`, e.g. `$city`. Must return a string. |
| `iconSrc` | string | no |  | Icon URL. URL of the tool icon. |

Output fields:

- `id`: Tool ID
- `name`: Name
- `description`: Description
- `schema`: Input Schema (JSON)
- `func`: Function
- `color`: Color
- `iconSrc`: Icon (image)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_create_variable`

**Create Variable.** Creates a workspace variable that flows read as `$vars.<name>`. A static variable stores the value; a runtime variable reads the environment variable of the same name. Each call creates another variable. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Variable name. |
| `value` | string | yes |  | Value. Value of the variable. Required for runtime variables too, where it is ignored. |
| `type` | string | no |  | Type. Static stores the value; runtime reads the server environment variable. Defaults to static. One of `"static"`, `"runtime"`. |

Output fields:

- `id`: Variable ID
- `name`: Name
- `value`: Value
- `type`: Type
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_delete_assistant`

**Delete Assistant.** Permanently deletes an assistant from Flowise. With Delete on OpenAI Too, an OPENAI or AZURE assistant is also deleted on OpenAI. This cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistantId` | string | yes |  | Assistant ID. ID of the assistant, from List Assistants. |
| `isDeleteBoth` | boolean | no |  | Delete on OpenAI Too. For OPENAI and AZURE assistants: also delete the assistant on OpenAI. |

Output fields:

- `affected`: Records Deleted (number)
- `raw`: Raw Result

### `flowise_delete_chat_messages`

**Delete Chat Messages.** Deletes chat messages of one chatflow. Always pass a Chat ID to delete a single conversation: with no filters it deletes every message of the chatflow. Hard Delete also clears the chat memory. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |
| `chatId` | string | no |  | Chat ID. Only delete messages from this chat session. |
| `sessionId` | string | no |  | Session ID. Only delete messages with this memory session ID. |
| `chatType` | string | no |  | Chat Type. INTERNAL = chats from the Flowise UI, EXTERNAL = chats through the API or embed. One of `"INTERNAL"`, `"EXTERNAL"`. |
| `startDate` | ISO date-time string | no |  | Start Date. Only include records created on or after this date (ISO 8601). |
| `endDate` | ISO date-time string | no |  | End Date. Only include records created on or before this date (ISO 8601). |
| `hardDelete` | boolean | no |  | Hard Delete. Also delete the messages from the memory node of the flow. |

Output fields:

- `affected`: Records Deleted (number)
- `raw`: Raw Result

### `flowise_delete_chatflow`

**Delete Chatflow.** Permanently deletes a chatflow by ID. This cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |

Output fields:

- `affected`: Records Deleted (number)
- `raw`: Raw Result

### `flowise_delete_document_chunk`

**Delete Document Chunk.** Permanently deletes one chunk (from Get Document Chunks) from a document loader. This cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |
| `loaderId` | string | yes |  | Loader ID. ID of a document loader inside the store, from the `loaders` array of Get Document Store. |
| `chunkId` | string | yes |  | Chunk ID. ID of the chunk, from Get Document Chunks. |

Output fields:

- `chunks`: Chunks
- `chunks[].id`: Chunk ID
- `chunks[].chunkNo`: Chunk Number (number)
- `chunks[].pageContent`: Content
- `chunks[].metadata`: Metadata (JSON)
- `chunks[].docId`: Loader ID
- `chunks[].storeId`: Document Store ID
- `count`: Total Chunks (number)
- `currentPage`: Current Page (number)
- `characters`: Total Characters (number)
- `docId`: Loader ID
- `storeName`: Document Store Name
- `description`: Document Store Description
- `file`: Loader
- `file.id`: Loader ID
- `file.loaderId`: Loader Type
- `file.loaderName`: Loader Name
- `file.loaderConfig`: Loader Config (an object whose keys vary)
- `file.splitterId`: Splitter Type
- `file.splitterName`: Splitter Name
- `file.splitterConfig`: Splitter Config (an object whose keys vary)
- `file.totalChunks`: Total Chunks (number)
- `file.totalChars`: Total Characters (number)
- `file.status`: Status
- `workspaceId`: Workspace ID

### `flowise_delete_document_loader`

**Delete Document Loader.** Permanently deletes one document loader and all its chunks from a document store. This cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |
| `loaderId` | string | yes |  | Loader ID. ID of a document loader inside the store, from the `loaders` array of Get Document Store. |

Output fields:

- `id`: Document Store ID
- `name`: Name
- `description`: Description
- `status`: Status
- `whereUsed`: Used By Chatflows
- `vectorStoreConfig`: Vector Store Config
- `vectorStoreConfig.name`: Vector Store
- `embeddingConfig`: Embedding Config
- `embeddingConfig.name`: Embedding Model
- `recordManagerConfig`: Record Manager Config
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)
- `loaders`: Loaders
- `totalChunks`: Total Chunks (number)
- `totalChars`: Total Characters (number)

### `flowise_delete_document_store`

**Delete Document Store.** Permanently deletes a document store with its loaders and chunks. This cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |

Output fields:

- `deleted`: Deleted (number)

### `flowise_delete_tool`

**Delete Tool.** Permanently deletes a custom tool by ID. Flows that use it stop working. This cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toolId` | string | yes |  | Tool ID. ID of the tool, from List Tools. |

Output fields:

- `affected`: Records Deleted (number)
- `raw`: Raw Result

### `flowise_delete_variable`

**Delete Variable.** Permanently deletes a workspace variable by ID. Flows that read it get an empty value. This cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variableId` | string | yes |  | Variable ID. ID of the variable, from List Variables. |

Output fields:

- `affected`: Records Deleted (number)
- `raw`: Raw Result

### `flowise_delete_vector_store_data`

**Delete Vector Store Data.** Deletes the vectors a document store upserted. Only data upserted with a record manager configured is removed; other data stays. The store and its chunks are kept. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |

### `flowise_get_assistant`

**Get Assistant.** Gets one assistant by ID. Its `details` field is a JSON string with the name, model and instructions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistantId` | string | yes |  | Assistant ID. ID of the assistant, from List Assistants. |

Output fields:

- `id`: Assistant ID
- `type`: Type
- `details`: Details (JSON)
- `credential`: Credential ID
- `iconSrc`: Icon (image)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_get_chatflow`

**Get Chatflow.** Gets one chatflow by ID, including its `flowData` graph (nodes and edges as a JSON string) and its chatbot and API config. Use the `flowData` with Create Chatflow to copy a flow. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |

Output fields:

- `id`: Chatflow ID
- `name`: Name
- `type`: Type
- `flowData`: Flow Data (JSON)
- `deployed`: Deployed (boolean)
- `isPublic`: Public (boolean)
- `category`: Category
- `apikeyid`: API Key ID
- `chatbotConfig`: Chatbot Config (JSON)
- `apiConfig`: API Config (JSON)
- `analytic`: Analytics Config (JSON)
- `speechToText`: Speech To Text Config (JSON)
- `textToSpeech`: Text To Speech Config (JSON)
- `followUpPrompts`: Follow-Up Prompts Config (JSON)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_get_document_chunks`

**Get Document Chunks.** Gets one page of the text chunks a document loader produced, with the total `count` and `currentPage`. Returns each chunk `id` for Update and Delete Document Chunk. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |
| `loaderId` | string | yes |  | Loader ID. ID of a document loader inside the store, from the `loaders` array of Get Document Store. |
| `pageNo` | number | no |  | Page. Page number, starting at 1. Defaults to 1. |

Output fields:

- `chunks`: Chunks
- `chunks[].id`: Chunk ID
- `chunks[].chunkNo`: Chunk Number (number)
- `chunks[].pageContent`: Content
- `chunks[].metadata`: Metadata (JSON)
- `chunks[].docId`: Loader ID
- `chunks[].storeId`: Document Store ID
- `count`: Total Chunks (number)
- `currentPage`: Current Page (number)
- `characters`: Total Characters (number)
- `docId`: Loader ID
- `storeName`: Document Store Name
- `description`: Document Store Description
- `file`: Loader
- `file.id`: Loader ID
- `file.loaderId`: Loader Type
- `file.loaderName`: Loader Name
- `file.loaderConfig`: Loader Config (an object whose keys vary)
- `file.splitterId`: Splitter Type
- `file.splitterName`: Splitter Name
- `file.splitterConfig`: Splitter Config (an object whose keys vary)
- `file.totalChunks`: Total Chunks (number)
- `file.totalChars`: Total Characters (number)
- `file.status`: Status
- `workspaceId`: Workspace ID

### `flowise_get_document_store`

**Get Document Store.** Gets one document store by ID, including its loaders (each with the Loader ID that the chunk and loader actions take), status and vector store, embedding and record manager config. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |

Output fields:

- `id`: Document Store ID
- `name`: Name
- `description`: Description
- `status`: Status
- `whereUsed`: Used By Chatflows
- `vectorStoreConfig`: Vector Store Config
- `vectorStoreConfig.name`: Vector Store
- `embeddingConfig`: Embedding Config
- `embeddingConfig.name`: Embedding Model
- `recordManagerConfig`: Record Manager Config
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)
- `loaders`: Loaders
- `loaders[].id`: Loader ID
- `loaders[].loaderId`: Loader Type
- `loaders[].loaderName`: Loader Name
- `loaders[].loaderConfig`: Loader Config (an object whose keys vary)
- `loaders[].splitterId`: Splitter Type
- `loaders[].splitterName`: Splitter Name
- `loaders[].splitterConfig`: Splitter Config (an object whose keys vary)
- `loaders[].totalChunks`: Total Chunks (number)
- `loaders[].totalChars`: Total Characters (number)
- `loaders[].status`: Status
- `loaders[].source`: Source
- `totalChunks`: Total Chunks (number)
- `totalChars`: Total Characters (number)

### `flowise_get_tool`

**Get Tool.** Gets one custom tool by ID, including its input schema and JavaScript function. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toolId` | string | yes |  | Tool ID. ID of the tool, from List Tools. |

Output fields:

- `id`: Tool ID
- `name`: Name
- `description`: Description
- `schema`: Input Schema (JSON)
- `func`: Function
- `color`: Color
- `iconSrc`: Icon (image)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_list_assistants`

**List Assistants.** Lists the assistants in the workspace, optionally only one type. Each `details` field is a JSON string with the name, model and instructions. Returns the assistant ids that Get, Update and Delete Assistant take. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Type. Only list assistants of this type. One of `"CUSTOM"`, `"OPENAI"`, `"AZURE"`. |

Output fields:

- `assistants`: Assistants
- `assistants[].id`: Assistant ID
- `assistants[].type`: Type
- `assistants[].details`: Details (JSON)
- `assistants[].credential`: Credential ID
- `assistants[].iconSrc`: Icon (image)
- `assistants[].workspaceId`: Workspace ID
- `assistants[].createdDate`: Created Date (datetime)
- `assistants[].updatedDate`: Updated Date (datetime)
- `count`: Count (number)

### `flowise_list_chat_messages`

**List Chat Messages.** Lists the user and bot messages of one chatflow. Filter by chat, session, chat type, date range or feedback type. Returns each message `id` (the `messageId` for Create Feedback) and its `chatId`. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |
| `chatId` | string | no |  | Chat ID. Only messages from this chat session. |
| `sessionId` | string | no |  | Session ID. Only messages with this memory session ID. |
| `chatType` | string | no |  | Chat Type. INTERNAL = chats from the Flowise UI, EXTERNAL = chats through the API or embed. One of `"INTERNAL"`, `"EXTERNAL"`. |
| `order` | string | no |  | Order. Sort by creation date. Defaults to ascending. One of `"ASC"`, `"DESC"`. |
| `feedbackType` | string | no |  | Feedback Type. Only messages that received this feedback. One of `"THUMBS_UP"`, `"THUMBS_DOWN"`. |
| `startDate` | ISO date-time string | no |  | Start Date. Only include records created on or after this date (ISO 8601). |
| `endDate` | ISO date-time string | no |  | End Date. Only include records created on or before this date (ISO 8601). |

Output fields:

- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].role`: Role
- `messages[].content`: Content
- `messages[].chatId`: Chat ID
- `messages[].sessionId`: Session ID
- `messages[].chatType`: Chat Type
- `messages[].chatflowid`: Chatflow ID
- `messages[].memoryType`: Memory Type
- `messages[].executionId`: Execution ID
- `messages[].sourceDocuments`: Source Documents (JSON)
- `messages[].usedTools`: Used Tools (JSON)
- `messages[].fileAnnotations`: File Annotations (JSON)
- `messages[].agentReasoning`: Agent Reasoning (JSON)
- `messages[].reasonContent`: Reasoning
- `messages[].fileUploads`: File Uploads (JSON)
- `messages[].artifacts`: Artifacts (JSON)
- `messages[].action`: Action (JSON)
- `messages[].followUpPrompts`: Follow-Up Prompts (JSON)
- `messages[].execution`: Execution
- `messages[].leadEmail`: Lead Email (email)
- `messages[].feedback`: Feedback
- `messages[].feedback.id`: Feedback ID
- `messages[].feedback.rating`: Rating
- `messages[].feedback.content`: Comment
- `messages[].feedback.messageId`: Message ID
- `messages[].feedback.chatId`: Chat ID
- `messages[].feedback.chatflowid`: Chatflow ID
- `messages[].feedback.createdDate`: Created Date (datetime)
- `messages[].createdDate`: Created Date (datetime)
- `count`: Count (number)

### `flowise_list_chatflows`

**List Chatflows.** Lists all chatflows (including agentflows) in the workspace with their ids, names, type and deployment state. Use it to find the Chatflow ID that Make Prediction, Get Chatflow and the chat message, feedback and lead actions take. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `chatflows`: Chatflows
- `chatflows[].id`: Chatflow ID
- `chatflows[].name`: Name
- `chatflows[].type`: Type
- `chatflows[].flowData`: Flow Data (JSON)
- `chatflows[].deployed`: Deployed (boolean)
- `chatflows[].isPublic`: Public (boolean)
- `chatflows[].category`: Category
- `chatflows[].apikeyid`: API Key ID
- `chatflows[].chatbotConfig`: Chatbot Config (JSON)
- `chatflows[].apiConfig`: API Config (JSON)
- `chatflows[].analytic`: Analytics Config (JSON)
- `chatflows[].speechToText`: Speech To Text Config (JSON)
- `chatflows[].textToSpeech`: Text To Speech Config (JSON)
- `chatflows[].followUpPrompts`: Follow-Up Prompts Config (JSON)
- `chatflows[].workspaceId`: Workspace ID
- `chatflows[].createdDate`: Created Date (datetime)
- `chatflows[].updatedDate`: Updated Date (datetime)
- `count`: Count (number)

### `flowise_list_document_stores`

**List Document Stores.** Lists the document stores (knowledge bases) in the workspace with their ids, names, status and loaders. Returns the Document Store ID the other document store actions take. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `documentStores`: Document Stores
- `documentStores[].id`: Document Store ID
- `documentStores[].name`: Name
- `documentStores[].description`: Description
- `documentStores[].status`: Status
- `documentStores[].whereUsed`: Used By Chatflows
- `documentStores[].vectorStoreConfig`: Vector Store Config
- `documentStores[].vectorStoreConfig.name`: Vector Store
- `documentStores[].embeddingConfig`: Embedding Config
- `documentStores[].embeddingConfig.name`: Embedding Model
- `documentStores[].recordManagerConfig`: Record Manager Config
- `documentStores[].workspaceId`: Workspace ID
- `documentStores[].createdDate`: Created Date (datetime)
- `documentStores[].updatedDate`: Updated Date (datetime)
- `documentStores[].loaders`: Loaders
- `documentStores[].totalChunks`: Total Chunks (number)
- `documentStores[].totalChars`: Total Characters (number)
- `count`: Count (number)

### `flowise_list_feedback`

**List Feedback.** Lists thumbs-up / thumbs-down feedback left on the messages of one chatflow, optionally for one chat and a date range. Returns each feedback `id` for Update Feedback. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |
| `chatId` | string | no |  | Chat ID. Only feedback from this chat session. |
| `sortOrder` | string | no |  | Sort Order. Sort by creation date. One of `"asc"`, `"desc"`. |
| `startDate` | ISO date-time string | no |  | Start Date. Only include records created on or after this date (ISO 8601). |
| `endDate` | ISO date-time string | no |  | End Date. Only include records created on or before this date (ISO 8601). |

Output fields:

- `feedback`: Feedback
- `feedback[].id`: Feedback ID
- `feedback[].rating`: Rating
- `feedback[].content`: Comment
- `feedback[].messageId`: Message ID
- `feedback[].chatId`: Chat ID
- `feedback[].chatflowid`: Chatflow ID
- `feedback[].createdDate`: Created Date (datetime)
- `count`: Count (number)

### `flowise_list_leads`

**List Leads.** Lists every lead (name, email, phone) captured by one chatflow, with the chat each came from. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |

Output fields:

- `leads`: Leads
- `leads[].id`: Lead ID
- `leads[].name`: Name
- `leads[].email`: Email (email)
- `leads[].phone`: Phone
- `leads[].chatId`: Chat ID
- `leads[].chatflowid`: Chatflow ID
- `leads[].createdDate`: Created Date (datetime)
- `count`: Count (number)

### `flowise_list_tools`

**List Tools.** Lists the custom tools in the workspace with their ids, names, input schema and JavaScript function. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `tools`: Tools
- `tools[].id`: Tool ID
- `tools[].name`: Name
- `tools[].description`: Description
- `tools[].schema`: Input Schema (JSON)
- `tools[].func`: Function
- `tools[].color`: Color
- `tools[].iconSrc`: Icon (image)
- `tools[].workspaceId`: Workspace ID
- `tools[].createdDate`: Created Date (datetime)
- `tools[].updatedDate`: Updated Date (datetime)
- `count`: Count (number)

### `flowise_list_variables`

**List Variables.** Lists the workspace variables (used in flows as `$vars.<name>`) with their ids, names, values and types. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `variables`: Variables
- `variables[].id`: Variable ID
- `variables[].name`: Name
- `variables[].value`: Value
- `variables[].type`: Type
- `variables[].workspaceId`: Workspace ID
- `variables[].createdDate`: Created Date (datetime)
- `variables[].updatedDate`: Updated Date (datetime)
- `count`: Count (number)

### `flowise_query_document_store`

**Query Document Store.** Runs a semantic retrieval query against the vector store of a document store and returns the matching chunks. The store must have been upserted first. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |
| `query` | string | yes |  | Query. The text to search for. |

Output fields:

- `docs`: Matching Chunks
- `docs[].id`: Chunk ID
- `docs[].chunkNo`: Chunk Number (number)
- `docs[].pageContent`: Content
- `docs[].metadata`: Metadata (an object whose keys vary)
- `timeTaken`: Time Taken (ms) (number)

### `flowise_refresh_document_store`

**Refresh Document Store.** Re-runs every loader of a document store and upserts the result into its vector store, e.g. after the source content changed. Returns one upsert result per loader. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |
| `items` | JSON | no |  | Loader Overrides. Optional array of per-loader configs to use instead of the saved ones, in the Upsert Document format. |

Output fields:

- `[].docId`: Loader ID
- `[].numAdded`: Added (number)
- `[].addedDocs`: Added Documents
- `[].addedDocs[].pageContent`: Content
- `[].addedDocs[].metadata`: Metadata (an object whose keys vary)

### `flowise_update_assistant`

**Update Assistant.** Updates an assistant by ID. `details` replaces the whole settings object, so pass every setting to keep (read them with Get Assistant first). OPENAI and AZURE assistants need both `details` and the Credential ID on every update. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistantId` | string | yes |  | Assistant ID. ID of the assistant, from List Assistants. |
| `details` | JSON | no |  | Details. Full assistant settings object; replaces the current one. Must include `name` for CUSTOM. |
| `credential` | string | no |  | Credential ID. For OPENAI and AZURE: ID of the Flowise credential with the OpenAI API key. |
| `iconSrc` | string | no |  | Icon URL. URL of the assistant icon. |

Output fields:

- `id`: Assistant ID
- `type`: Type
- `details`: Details (JSON)
- `credential`: Credential ID
- `iconSrc`: Icon (image)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_update_chatflow`

**Update Chatflow.** Updates a chatflow by ID: name, flow graph, deployment, public access or category. Fields left empty stay as they are. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatflowId` | string | yes |  | Chatflow ID. ID of the chatflow (agentflow or assistant flow). Use List Chatflows to find it. |
| `name` | string | no |  | Name. New name of the chatflow. |
| `flowData` | string | no |  | Flow Data. New flow graph as a JSON string; replaces the whole graph. |
| `deployed` | boolean | no |  | Deployed. Whether the chatflow is deployed. |
| `isPublic` | boolean | no |  | Public. Whether the chatflow is publicly accessible without an API key. |
| `category` | string | no |  | Category. Category tags, separated by `;`. |

Output fields:

- `id`: Chatflow ID
- `name`: Name
- `type`: Type
- `flowData`: Flow Data (JSON)
- `deployed`: Deployed (boolean)
- `isPublic`: Public (boolean)
- `category`: Category
- `apikeyid`: API Key ID
- `chatbotConfig`: Chatbot Config (JSON)
- `apiConfig`: API Config (JSON)
- `analytic`: Analytics Config (JSON)
- `speechToText`: Speech To Text Config (JSON)
- `textToSpeech`: Text To Speech Config (JSON)
- `followUpPrompts`: Follow-Up Prompts Config (JSON)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_update_document_chunk`

**Update Document Chunk.** Replaces the text (and optionally the metadata) of one chunk of a document loader. Chunk IDs come from Get Document Chunks. Run Refresh Document Store or Upsert Document afterwards to update the vector store. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |
| `loaderId` | string | yes |  | Loader ID. ID of a document loader inside the store, from the `loaders` array of Get Document Store. |
| `chunkId` | string | yes |  | Chunk ID. ID of the chunk, from Get Document Chunks. |
| `pageContent` | string | yes |  | Content. New text of the chunk. |
| `metadata` | JSON | no |  | Metadata. New metadata object of the chunk. |

Output fields:

- `chunks`: Chunks
- `chunks[].id`: Chunk ID
- `chunks[].chunkNo`: Chunk Number (number)
- `chunks[].pageContent`: Content
- `chunks[].metadata`: Metadata (JSON)
- `chunks[].docId`: Loader ID
- `chunks[].storeId`: Document Store ID
- `count`: Total Chunks (number)
- `currentPage`: Current Page (number)
- `characters`: Total Characters (number)
- `docId`: Loader ID
- `storeName`: Document Store Name
- `description`: Document Store Description
- `file`: Loader
- `file.id`: Loader ID
- `file.loaderId`: Loader Type
- `file.loaderName`: Loader Name
- `file.loaderConfig`: Loader Config (an object whose keys vary)
- `file.splitterId`: Splitter Type
- `file.splitterName`: Splitter Name
- `file.splitterConfig`: Splitter Config (an object whose keys vary)
- `file.totalChunks`: Total Chunks (number)
- `file.totalChars`: Total Characters (number)
- `file.status`: Status
- `workspaceId`: Workspace ID

### `flowise_update_document_store`

**Update Document Store.** Changes the name or description of a document store. Fields left empty stay as they are. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |
| `name` | string | no |  | Name. New name. |
| `description` | string | no |  | Description. New description. |

Output fields:

- `id`: Document Store ID
- `name`: Name
- `description`: Description
- `status`: Status
- `whereUsed`: Used By Chatflows
- `vectorStoreConfig`: Vector Store Config
- `vectorStoreConfig.name`: Vector Store
- `embeddingConfig`: Embedding Config
- `embeddingConfig.name`: Embedding Model
- `recordManagerConfig`: Record Manager Config
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)
- `loaders`: Loaders
- `totalChunks`: Total Chunks (number)
- `totalChars`: Total Characters (number)

### `flowise_update_feedback`

**Update Feedback.** Changes the rating or comment of one feedback entry by ID (from List Feedback or Create Feedback). Fields left empty stay as they are. Flowise returns only `{ status: "OK" }`; read the result with List Feedback. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `feedbackId` | string | yes |  | Feedback ID. ID of the feedback entry, from List Feedback or Create Feedback. |
| `rating` | string | no |  | Rating. New rating. One of `"THUMBS_UP"`, `"THUMBS_DOWN"`. |
| `content` | string | no |  | Comment. New comment. |

Output fields:

- `status`: Status

### `flowise_update_tool`

**Update Tool.** Updates a custom tool by ID: name, description, color, input schema, function or icon. Fields left empty stay as they are. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toolId` | string | yes |  | Tool ID. ID of the tool, from List Tools. |
| `name` | string | no |  | Name. New tool name. |
| `description` | string | no |  | Description. New description. |
| `color` | string | no |  | Color. New card color. |
| `schema` | string | no |  | Input Schema. New input schema as a JSON string array; replaces the current one. |
| `func` | string | no |  | Function. New JavaScript function. |
| `iconSrc` | string | no |  | Icon URL. New icon URL. |

Output fields:

- `id`: Tool ID
- `name`: Name
- `description`: Description
- `schema`: Input Schema (JSON)
- `func`: Function
- `color`: Color
- `iconSrc`: Icon (image)
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_update_variable`

**Update Variable.** Updates a workspace variable by ID: name, value or type. Fields left empty stay as they are. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `variableId` | string | yes |  | Variable ID. ID of the variable, from List Variables. |
| `name` | string | no |  | Name. New variable name. |
| `value` | string | no |  | Value. New value. |
| `type` | string | no |  | Type. Static stores the value; runtime reads the server environment variable. One of `"static"`, `"runtime"`. |

Output fields:

- `id`: Variable ID
- `name`: Name
- `value`: Value
- `type`: Type
- `workspaceId`: Workspace ID
- `createdDate`: Created Date (datetime)
- `updatedDate`: Updated Date (datetime)

### `flowise_upsert_document`

**Upsert Document.** Loads a document into a document store and upserts its chunks into the vector store. Pass a Loader ID to re-run an existing loader (optionally with new config), or a loader config to add one. The store needs an embedding and vector store config, either already saved on it or passed here. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Document Store ID. ID of the document store. Use List Document Stores to find it. |
| `docId` | string | no |  | Loader ID. ID of an existing loader in the store to re-run. Leave empty to add a new loader from Loader. |
| `replaceExisting` | boolean | no |  | Replace Existing. Replace the existing loader config and chunks instead of merging. |
| `metadata` | JSON | no |  | Metadata. Metadata added to every chunk. |
| `loader` | JSON | no |  | Loader. Loader config, e.g. `{"name":"plainText","config":{"text":"..."}}`. |
| `splitter` | JSON | no |  | Splitter. Text splitter config, e.g. `{"name":"recursiveCharacterTextSplitter","config":{"chunkSize":1000}}`. |
| `embedding` | JSON | no |  | Embedding. Embedding model config, e.g. `{"name":"openAIEmbeddings","config":{"credential":"<credential id>"}}`. |
| `vectorStore` | JSON | no |  | Vector Store. Vector store config, e.g. `{"name":"faiss","config":{}}`. |
| `recordManager` | JSON | no |  | Record Manager. Record manager config. Needed for Delete Vector Store Data to remove these chunks later. |

Output fields:

- `docId`: Loader ID
- `numAdded`: Added (number)
- `numUpdated`: Updated (number)
- `numDeleted`: Deleted (number)
- `numSkipped`: Skipped (number)
- `totalKeys`: Total Keys (number)
- `addedDocs`: Added Documents
- `addedDocs[].pageContent`: Content
- `addedDocs[].metadata`: Metadata (an object whose keys vary)

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
