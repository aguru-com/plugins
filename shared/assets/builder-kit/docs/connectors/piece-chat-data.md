# Chat Data

Build AI-chatbots with support for live chat escalation, knowledge bases, or custom backend endpoints.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chat-data'
  version: '0.1.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Chat Data API key

## Actions

### `create_chatbot`

**Create Chatbot.** Creates a new Chat Data chatbot and kicks off training. The model prop selects the mode: custom-data-upload trains on supplied source text, scraped URLs, products, and Q&As; medical-chat-human / medical-chat-vet use prebuilt medical models; custom-model proxies to your own backend (the data-source props are ignored for the medical and custom-model modes). Use to provision a brand-new bot. Not idempotent — each call creates a separate chatbot. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotName` | string | yes |  | Chatbot Name. The name of the chatbot to be created. |
| `model` | string | no | `"custom-data-upload"` | Model. Select the chatbot model. Note: sourceText and urlsToScrape are ignored for medical and custom models. One of `"custom-data-upload"`, `"medical-chat-human"`, `"medical-chat-vet"`, `"custom-model"`. |
| `sourceText` | string | no |  | Source Text. Training text for the chatbot. Character limits apply based on your plan. Only used for custom-data-upload model. |
| `urlsToScrape` | array | no |  | URLs to Scrape. URLs to extract content from. Must start with http:// or https:// (only for custom-data-upload model) Each item: { `url` }. |
| `products` | array | no |  | Products. List of products for training the chatbot. Each item: { `id`, `information` }. |
| `qAndAs` | array | no |  | Q&As. List of questions and answers for the chatbot to learn. Each item: { `question`, `answer` }. |
| `customBackend` | string | no |  | Custom Backend URL. URL of a custom backend for the chatbot. |
| `bearer` | string | no |  | Bearer Token. Authentication bearer token for custom backend. |

### `delete_chatbot`

**Delete Chatbot.** Permanently deletes a Chat Data chatbot identified by chatbotId, along with all of its training data, conversations, and leads. Use only when the bot should be fully removed; the deletion is irreversible. Not idempotent — a repeat call for an already-deleted chatbot will fail. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot. Select the chatbot to delete. A value the product loads from the provider, such as an id; write the value itself. |

### `send_message`

**Send Message to Chatbot.** Sends a message to a Chat Data chatbot (selected by chatbotId) and returns its generated reply. Leave conversationId empty to start a new conversation or pass one to continue an existing thread. Per-request overrides (base model, base prompt, reasoning, OpenAI-compatible output) are optional. Use to converse with or query a deployed bot. Not idempotent — each call generates a fresh reply and appends to the conversation. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot. Select the chatbot to send message to. A value the product loads from the provider, such as an id; write the value itself. |
| `messageContent` | string | yes |  | Message Content. The text content of the message to send. |
| `messageRole` | string | no | `"user"` | Message Role. The role of the message sender. One of `"user"`, `"assistant"`. |
| `conversationId` | string | no |  | Conversation. Select an existing conversation or leave empty to start a new one. A value the product loads from the provider, such as an id; write the value itself. |
| `includeReasoning` | boolean | no |  | Include Reasoning. Include reasoning in the response (overrides chatbot settings) |
| `baseModel` | string | no |  | Base Model. Override the chatbot's base model for this request. One of `"gpt-4o-mini"`, `"gpt-4o"`, `"gpt-4"`, `"gpt-4.1-nano"`, `"gpt-4.1-mini"`, `"gpt-4.1"`, `"gpt-5-nano"`, `"gpt-5-mini"`, `"gpt-5"`, `"gpt-o1"`, `"gpt-o3-mini"`, `"gpt-o3"`, `"gpt-o4-mini"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-4-sonnet"`, `"claude-4-5-sonnet"`, `"claude-3-5-haiku"`, `"claude-3-haiku"`, `"claude-4-opus"`, `"claude-4.1-opus"`, `"gemini-2.5-flash"`, `"gemini-2.0-flash"`, `"gemini-1.5-flash"`, `"gemini-2.5-pro"` and 1 more. |
| `basePrompt` | string | no |  | Base Prompt Override. Override the chatbot's base prompt for this request. |
| `openAIFormat` | boolean | no |  | OpenAI Format. Return response in OpenAI-compatible format. |
| `appendMessages` | boolean | no |  | Append to Conversation. Append this message to previous messages with the same conversationId. |
| `attachedFiles` | array | no |  | Attached Files. Files to attach to the message (max 3 files) Each item: { `name`, `type`, `url`, `content`? }. |

### `update_chatbot_settings`

**Update Chatbot Settings.** Updates configuration of an existing chatbot (selected by chatbotId) — name, base prompt, model, temperature, initial/suggested messages, visibility, rate limits, allowed domains, calendar booking, and other behavior/appearance settings. Only the fields you provide are changed. Use to reconfigure a bot without retraining it. Idempotent: re-applying the same settings leaves the chatbot in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot. Select the chatbot to update. A value the product loads from the provider, such as an id; write the value itself. |
| `chatbotName` | string | no |  | Chatbot Name. Update the name of the chatbot. |
| `basePrompt` | string | no |  | Base Prompt. Update the base prompt for the chatbot. |
| `initialMessages` | array | no |  | Initial Messages. Array of initial messages to be used by the chatbot. Each item: { `message` }. |
| `suggestedMessages` | array | no |  | Suggested Messages. Array of suggested messages shown in the chatbot. Each item: { `message` }. |
| `visibility` | string | no |  | Visibility. Control whether your chatbot is accessible to others. One of `"private"`, `"public"`. |
| `baseModel` | string | no |  | Base Model. The AI model used in the RAG processing pipeline. One of `"gpt-4o-mini"`, `"gpt-4o"`, `"gpt-4"`, `"gpt-4.1-nano"`, `"gpt-4.1-mini"`, `"gpt-4.1"`, `"gpt-5-nano"`, `"gpt-5-mini"`, `"gpt-5"`, `"gpt-o1"`, `"gpt-o3-mini"`, `"gpt-o3"`, `"gpt-o4-mini"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-4-sonnet"`, `"claude-4-5-sonnet"`, `"claude-3-5-haiku"`, `"claude-3-haiku"`, `"claude-4-opus"`, `"claude-4.1-opus"`, `"gemini-2.5-flash"`, `"gemini-2.0-flash"`, `"gemini-1.5-flash"`, `"gemini-2.5-pro"` and 1 more. |
| `temperature` | number | no |  | Temperature. AI model temperature (0-1, controls randomness) |
| `storeChat` | boolean | no |  | Store Chat History. Whether chat history will be stored on the server. |
| `trackIpAddress` | boolean | no |  | Track IP Address. Whether IP addresses will be stored for conversations and leads. |
| `rateLimitPoints` | number | no |  | Rate Limit Points. Maximum number of messages per timeframe from one device. |
| `rateLimitTimeframe` | number | no |  | Rate Limit Timeframe. Timeframe in seconds for rate limiting. |
| `rateLimitMessage` | string | no |  | Rate Limit Message. Error message shown when rate limited. |
| `onlyAllowOnAddedDomains` | boolean | no |  | Restrict to Added Domains. Only allow the iframe and widget on specific domains. |
| `domains` | array | no |  | Allowed Domains. Array of domains where the chatbot is allowed. Each item: { `domain` }. |
| `showCalendar` | boolean | no |  | Show Calendar. Display Calendly booking button in the chatbot. |
| `calendarUrl` | string | no |  | Calendar URL. Calendly URL for appointment scheduling. |
| `calendarMessage` | string | no |  | Calendar Message. Message to display for appointment scheduling. |
| `enableBouncingAnimation` | boolean | no |  | Enable Bouncing Animation. Whether the chatbot bubble should bounce to attract attention. |
| `ignoreDataSource` | boolean | no |  | Ignore Data Source. Ignore custom data and act like pure ChatGPT. |
| `customBackend` | string | no |  | Custom Backend URL. URL of a custom backend for the chatbot. |
| `bearer` | string | no |  | Bearer Token. Authentication token for custom backend. |

### `retrain_chatbot`

**Retrain Chatbot.** Retrains a custom-data-upload chatbot (selected by chatbotId) by adding source text, scraped URLs, products, and Q&As, and/or removing existing knowledge sources via the deletes list. Use to refresh or extend a bot's knowledge base; only works for the custom-data-upload model. Not idempotent — each call mutates the knowledge base (re-crawls URLs, appends/overwrites entries, deletes sources). Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot. Select the chatbot to retrain. A value the product loads from the provider, such as an id; write the value itself. |
| `sourceText` | string | no |  | Source Text. New text data for training the chatbot. |
| `urlsToScrape` | array | no |  | URLs to Scrape. List of URLs to extract content from (existing URLs will be recrawled) Each item: { `url` }. |
| `cookies` | string | no |  | Cookies. Cookies for authorization (semicolon-separated: "cookie1=value1; cookie2=value2") |
| `extractMainContent` | boolean | no |  | Extract Main Content. Automatically remove headers, footers, nav, sidebar, and ads. |
| `includeOnlyTags` | string | no |  | Include Only Tags. CSS selectors to exclusively extract (comma-separated) |
| `excludeTags` | string | no |  | Exclude Tags. CSS selectors to exclude from scraping (comma-separated) |
| `products` | array | no |  | Products. List of products for training (existing products with same ID will be overwritten) Each item: { `id`, `information` }. |
| `qAndAs` | array | no |  | Q&As. List of questions and answers for the chatbot to learn. Each item: { `question`, `answer` }. |
| `deletes` | array | no |  | Knowledge to Delete. List of knowledge sources to remove from the chatbot. Each item: { `type`, `url`? }. |

### `upload_file`

**Upload File.** Uploads a file to a Chat Data chatbot (selected by chatbotId) to add it to the bot's knowledge base / training data. Use when knowledge should come from a document rather than text or URLs. Not idempotent — each call adds another file to the chatbot. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot. Select the chatbot to upload file to. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload to the chatbot. Files are not supported; an action that needs one fails. |
