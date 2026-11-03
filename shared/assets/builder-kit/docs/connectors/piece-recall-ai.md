# Recall.ai

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-recall-ai'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Your Recall AI API Key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_key` | string | yes |  | API Key. Your Recall AI API Key. |
| `server` | string | yes | `"https://us-east-1.recall.ai"` | Server. The Recall AI server to connect to. One of `"https://us-east-1.recall.ai"`, `"https://us-west-2.recall.ai"`, `"https://eu-central-1.recall.ai"`, `"https://ap-northeast-1.recall.ai"`. |

## Actions

### `createBot`

**create bot.** Dispatches a Recall.ai notetaker bot to join a video meeting (Zoom, Google Meet, Microsoft Teams, etc.) at the given meeting URL so it can record and transcribe the call. Use to start capturing a meeting; the meeting URL is required and the optional bot name (max 100 chars) sets the display name shown to participants. Not idempotent — each call spins up a new bot instance, even for the same meeting URL. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_url` | string | yes |  | Meeting URL. The URL of the meeting (e.g., https://zoom.us/j/123?pwd=456) |
| `bot_name` | string | no |  | Bot Name. The name of the bot that will be displayed in the call (max 100 characters). Defaults to "Meeting Notetaker". |

### `retrieveBot`

**Retrieve Bot.** Fetches the current state and details of a single Recall.ai bot by its UUID, including its meeting status and recording info. Use to check on or poll a bot you previously created. Requires the bot ID; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bot_id` | string | yes |  | Bot ID. A UUID string identifying the bot. |

### `sendChatMessage`

**Send Chat Message.** Has an in-call Recall.ai bot post a message to the meeting chat. Use to relay text into a live meeting through a bot you already created. Requires the bot ID and message (max 4096 chars); by default sends to everyone, and can optionally target a specific recipient (Zoom only) or pin the message. Not idempotent — each call posts another chat message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bot_id` | string | yes |  | Bot ID. A UUID string identifying the bot. |
| `message` | string | yes |  | Message. The message that will be sent (max 4096 characters) |
| `to` | string | no |  | Send To. The person or group that the message will be sent to. Defaults to "everyone". On non-Zoom platforms, only "everyone" is supported. |
| `pin` | boolean | no | `false` | Pin Message. Whether to pin the message in the chat. |

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
