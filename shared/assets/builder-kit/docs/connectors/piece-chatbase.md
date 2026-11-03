# Chatbase

Build and manage AI chatbots with custom sources.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chatbase'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can get your API key from your [Chatbase Account](https://www.chatbase.co/dashboard).

## Actions

### `create_chatbot`

**Create Chatbot.** Creates a new Chatbase chatbot, optionally seeding it with inline training text. Use when an agent needs to provision a fresh chatbot before sending prompts to it. Not idempotent: each call creates a separate chatbot even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotName` | string | yes |  | Chatbot Name. |
| `sourceText` | string | no |  | Source Text. Optional text data for training the chatbot. |

### `message_chatbot`

**Send Prompt to Chatbot.** Sends a user prompt to a specific Chatbase chatbot (selected by its ID) and returns the generated reply, optionally overriding the model and temperature. Use when an agent needs an answer from a trained chatbot; pass a stable conversationId to keep messages threaded in one logged conversation. Not idempotent: each call appends a turn and produces a fresh, possibly different completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Prompt. |
| `temperature` | number | no | `0` | Temperature. Higher values = more random output. Between 0 and 1. |
| `conversationId` | string | no |  | Conversation ID. Unique ID for saving this conversation in Chatbase dashboard. |
| `model` | string | no |  | Model (Optional). One of `"o4-mini"`, `"o3"`, `"gpt-4"`, `"gpt-4o"`, `"gpt-4o-mini"`, `"gpt-4.1-mini"`, `"gpt-4.1-nano"`, `"gpt-4-turbo"`, `"o3-mini"`, `"gpt-4.1"`, `"gpt-4.5"`, `"claude-sonnet-4"`, `"claude-3-7-sonnet"`, `"claude-3-5-sonnet"`, `"claude-3-opus"`, `"claude-opus-4"`, `"claude-3-haiku"`, `"gemini-2.0-flash"`, `"gemini-1.5-flash"`, `"gemini-1.5-pro"`, `"gemini-2.0-pro"`, `"command-r"`, `"command-r-plus"`, `"DeepSeek-V3"`, `"DeepSeek-R1"` and 4 more. |

### `search_conversations`

**Search Conversations by Query.** Retrieves logged conversations for a specific Chatbase chatbot (selected by its ID), with optional filters for source channels (API, WhatsApp, Slack, etc.), a start/end date range, and pagination. Use when an agent needs to review or audit past chatbot conversations; leaving the optional filters empty returns all conversations for the chatbot. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot. A value the product loads from the provider, such as an id; write the value itself. |
| `filteredSources` | array | no |  | Sources. Filter by one or more conversation sources. One of `"API"`, `"Chatbase site"`, `"Instagram"`, `"Messenger"`, `"Slack"`, `"Unspecified"`, `"WhatsApp"`, `"Widget or Iframe"`. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `endDate` | ISO date-time string | no |  | End Date. |
| `page` | number | no |  | Page. Pagination page number (default = 1) |
| `size` | number | no |  | Page Size. Number of results per page (default = 10, max = 100) |

### `list_chatbots`

**List All Chatbots.** Lists all chatbots in the authenticated Chatbase account. Use when an agent needs to discover available chatbots or resolve a chatbot ID before sending prompts or searching conversations. Takes no input; idempotent read-only listing. Needs authentication.

Kind: search, safe to repeat.

No inputs.

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
