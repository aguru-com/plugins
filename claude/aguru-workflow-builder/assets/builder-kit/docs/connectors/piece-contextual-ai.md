# Contextual AI

Integrate with Contextual AI to automate document processing and AI workflows

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-contextual-ai'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> ## Contextual AI Connection Setup
>
> ### Prerequisites
> - Create a Contextual AI account at [Contextual AI](https://contextual.ai)
> - Generate an API key from your workspace settings
> - You'll receive $25 in free credits (or $50 with work email)
>
> ### Authentication Fields
>
> **API Key**: Your Contextual AI API key (required)
> - Sign in to your Contextual AI workspace
> - Navigate to API Keys in the sidebar
> - Click "Create API Key" and follow the instructions
> - Copy the generated key and paste it here
>
> **Base URL**: The API base URL (optional)
> - Leave blank to use the default: `https://api.contextual.ai/v1`
> - Only change if you have a custom deployment

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Your Contextual AI API key. |
| `baseUrl` | string | no |  | Base URL. API base URL (leave blank for default) |

## Actions

### `query_agent`

**Query Agent.** Sends a message to a specific Contextual AI RAG agent and returns its grounded answer along with retrieval context. Use to ask questions answered from the agent's attached datastores. Requires the target agent id; pass a conversation_id to continue an existing thread or omit it to start a new one. Each call is a new generation, not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select the agent to query. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. The message to send to the agent. |
| `conversationId` | string | no |  | Conversation ID. Optional conversation ID to continue an existing conversation (leave empty for new conversation) |
| `includeRetrievalContent` | boolean | no | `false` | Include Retrieval Content. Include the text of retrieved contents in the response. |

### `generate`

**Generate Text.** Generates text from a prompt using Contextual AI's Grounded Language Model, optionally grounding the output in supplied knowledge sources (omit them for general generation). Use for one-off completions or grounded answers when you are not querying a configured agent. Requires a prompt and model version; sampling and length are tunable. Not idempotent — each call produces a fresh generation. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. The text prompt to generate a response for. |
| `model` | string | yes | `"v2"` | Model Version. The version of Contextual's GLM to use. One of `"v2"`, `"v1"`. |
| `knowledge` | array | no |  | Knowledge Sources. Optional knowledge sources to ground the generation (leave empty for general generation) |
| `systemPrompt` | string | no |  | System Prompt. Optional system instructions for the model. |
| `maxTokens` | number | no | `1024` | Max Tokens. Maximum number of tokens to generate (default: 1024) |
| `temperature` | number | no | `0.7` | Temperature. Sampling temperature (0.0 to 1.0, lower = more focused, higher = more creative) |
| `topP` | number | no | `0.9` | Top P. Nucleus sampling parameter (0.0 to 1.0) |
| `avoidCommentary` | boolean | no | `false` | Avoid Commentary. Avoid providing additional conversational commentary not grounded in context. |

### `ingest_document`

**Ingest Document.** Uploads a document file (PDF, HTML, DOC/DOCX, PPT/PPTX) into a target datastore and starts asynchronous ingestion, returning a document id to poll for status. Use to add knowledge to a datastore that agents query. Requires the datastore id and the file; optional custom metadata and per-document configuration. Not idempotent — re-running uploads another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datastoreId` | string | yes |  | Datastore. Select the datastore to upload the document to. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | Document File. The document file to upload (PDF, HTML, DOC, DOCX, PPT, PPTX) Files are not supported; an action that needs one fails. |
| `customMetadata` | object | no |  | Custom Metadata. Optional custom metadata as key-value pairs (max 15 fields, 2KB total) |
| `configuration` | string | no |  | Configuration Override. Optional configuration override in JSON format for this specific document. |

### `parse_file`

**Parse File.** Starts an asynchronous job that parses a document file (PDF, DOC/DOCX, PPT/PPTX) into structured Markdown/JSON, returning a job id to poll for results. Use to extract clean text, tables, and document structure for downstream processing rather than to load a datastore. Choose basic mode for plain text or standard mode for complex layouts; an optional page range limits scope. Not idempotent — each call creates a new parse job. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Document File. The document file to parse (PDF, DOC, DOCX, PPT, PPTX) Files are not supported; an action that needs one fails. |
| `parseMode` | string | yes | `"standard"` | Parse Mode. Parsing mode - basic for simple text, standard for complex documents. One of `"basic"`, `"standard"`. |
| `pageRange` | string | no |  | Page Range. Optional page range to parse (e.g., "0,1,2" or "0-2,5,6") |
| `enableDocumentHierarchy` | boolean | no | `false` | Enable Document Hierarchy. Add table of contents with document structure (beta feature) |
| `enableSplitTables` | boolean | no | `false` | Enable Split Tables. Split large tables into multiple tables with headers. |
| `maxSplitTableCells` | number | no |  | Max Split Table Cells. Threshold for splitting large tables (only used when split tables is enabled) |
| `figureCaptionMode` | string | no | `"concise"` | Figure Caption Mode. How thorough figure captions should be. One of `"concise"`, `"detailed"`. |

### `create_agent`

**Create Agent.** Creates a new Contextual AI RAG agent and returns its id. Use during setup before querying an agent. Requires a name; optionally attach existing datastore ids (omit to provision a new datastore for the agent) and set system/filter prompts. Not idempotent — each call creates a separate agent even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Agent Name. Name for the new agent. |
| `description` | string | no |  | Description. Optional description of the agent. |
| `datastoreIds` | array | no |  | Datastores. Select datastores to associate with this agent (leave empty to create new datastore) Values the product loads from the provider, such as ids; write an array of them. |
| `systemPrompt` | string | no |  | System Prompt. Optional system prompt for the agent. |
| `filterPrompt` | string | no |  | Filter Prompt. Optional prompt for filtering retrieved chunks. |

### `invite_users`

**Invite Users.** Sends workspace invitations to one or more email addresses for a Contextual AI tenant, returning which invites succeeded and which errored. Use for onboarding/admin automation. Requires the list of user emails and the tenant short name; invitees are granted agent-level user access. Not idempotent — each call dispatches new invitations. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `users` | array | yes |  | Users to Invite. List of users to invite. Each item: { `email` }. |
| `tenantShortName` | string | yes |  | Tenant Short Name. The short name of the tenant/workspace. |

### `create_datastore`

**Create Datastore.** Creates a new datastore for holding ingested documents and returns its id, which can then be attached to agents or used as an ingestion target. Use during setup before ingesting documents. Requires only a name. Not idempotent — each call creates a separate datastore even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Datastore Name. Name for the new datastore. |
