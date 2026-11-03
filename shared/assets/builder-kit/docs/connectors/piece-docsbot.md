# DocsBot

DocsBot AI allows you to build AI-powered chatbots that pull answers from your existing documentation and content. This integration enables workflows to ask DocsBot questions and update its training sources dynamically.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-docsbot'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> The API key for authenticating with DocsBot.

## Actions

### `askQuestion`

**Ask Question.** Send a natural-language question to a specific DocsBot bot (identified by teamId + botId) and get a generated answer grounded in that bot's trained sources. Use this to query existing documentation/knowledge bases. Each call starts a new conversation and produces a fresh, billable answer, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. The team to use. A value the product loads from the provider, such as an id; write the value itself. |
| `botId` | string | yes |  | Bot. The bot to use. |
| `question` | string | yes |  | Question. The question to ask the bot. 2 to 500 characters. Max increased to 8K tokens (roughtly 32k chars) when authenticated. |
| `metadata` | object | no |  | Metadata. A user identification object with arbitrary metadata about the user. Will be saved to the question and conversation. Keys referrer, email, and name are shown in question history logs. Optional, defaults to null. |
| `context_items` | number | no |  | Context Items. Number of sources to lookup for the bot to answer from. Optional, default is 5. Research mode uses 16 (more expensive token usage). |
| `human_escalation` | boolean | no |  | Human Escalation. Whether to enable human escalation for this question. Optional, default is false. |
| `followup_rating` | boolean | no |  | Follow-up Rating. Whether to ask the user for a follow-up rating after the question is answered. Optional, default is false. |
| `document_retriever` | boolean | no |  | Document Retriever. Whether to use the document retriever for this question. Optional, default is false. |
| `full_source` | boolean | no |  | Full Source. Whether to return the full source content in the response. Optional, default is false. |
| `autocut` | number | no |  | Autocut. Autocut results to num groups. Optional, defaults to false. |
| `testing` | boolean | no |  | Testing. Whether the request is for testing purposes. Optional, defaults to false. |
| `image_urls` | array | no |  | Image URLs. List of image URLs to include with the question as context. Optional, defaults to null. |
| `model` | string | no |  | Model. Override the model used for this request. Requires an OpenAI API key to be set on your team. Optional, defaults to the model configured for the bot. |
| `default_language` | string | no |  | Default Language. The default language to use if the language of the conversation is unclear. Use locale codes like 'en' or 'en-US'. Optional, defaults to the bot's configured language. |
| `reasoning_effort` | string | no |  | Reasoning Effort. Reasoning depth for the response. Requires authentication to override default. One of `"minimal"`, `"low"`, `"medium"`, `"high"`. |

### `createSource`

**Create Source.** Add a new training source to a DocsBot bot so it can answer from that content. The source type selects the mode: url/sitemap/youtube/rss ingest from a URL, document/wp/csv/urls ingest from a previously uploaded file path (use Upload Source File first), and qa ingests an array of question/answer pairs. Creates a new source on each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. The team to use. A value the product loads from the provider, such as an id; write the value itself. |
| `botId` | string | yes |  | Bot. The bot to use. |
| `type` | string | yes |  | Type. Can be url, document, sitemap, wp, urls, csv, rss, qa, youtube. All but url, sitemap, and youtube require uploading a formatted file. One of `"url"`, `"document"`, `"sitemap"`, `"wp"`, `"urls"`, `"csv"`, `"rss"`, `"qa"`, `"youtube"`. |
| `sourceProperties` | object | yes |  | Source Properties. Create Source Properties. An object whose fields depend on other inputs; the product shows them. |

### `uploadSourceFile`

**Upload Source File.** Upload a file to DocsBot cloud storage for a given team and bot, returning the storage path to feed into Create Source (for document, wp, csv, or urls types). Use this as the first step before creating a file-based source. Each call uploads the file again, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. The team to use. A value the product loads from the provider, such as an id; write the value itself. |
| `botId` | string | yes |  | Bot. The bot to use. |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |

### `createBot`

**Create Bot.** Create a new DocsBot bot in a team, configuring its name, description, privacy, language, and optionally the chat/embedding models; optionally copy an existing bot (and its sources) via copyFrom. Creates a distinct bot on each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. The team to use. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The bot name. Used publically. |
| `description` | string | yes |  | Description. The bot description. Shown by default in embeds and share links. |
| `privacy` | string | yes |  | Privacy. The bot privacy. Can be public or private. One of `"public"`, `"private"`. |
| `language` | string | yes |  | Language. The bot language. One of `"en"`, `"jp"`. |
| `model` | string | no |  | Model. The OpenAI model. One of `"gpt-4.1"`, `"gpt-4.1-mini"`, `"gpt-4o"`, `"gpt-4o-mini"`. |
| `embeddingModel` | string | no |  | Embedding Model. The embedding model. Currently supports text-embedding-ada-002, text-embedding-3-large, text-embedding-3-small, embed-multilingual-v3.0, and embed-v4.0 (Cohere) depending on your plan. One of `"text-embedding-ada-002"`, `"text-embedding-3-large"`, `"text-embedding-3-small"`, `"embed-multilingual-v3.0"`, `"embed-v4.0"`. |
| `copyFrom` | string | no |  | Copy From. The ID of an existing bot in your team to copy from. If provided, the new bot will be created as a copy of the specified bot, with all sources copied over after creation. |

### `findBot`

**Find Bot.** Look up bots in a team by name, matching case-insensitively on any bot whose name contains the given string (returns all matches). Use this to resolve a bot name to its id before calling actions that require a botId. Read-only lookup, so it is idempotent; throws if no bot matches. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. The team to use. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The bot name. |

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
