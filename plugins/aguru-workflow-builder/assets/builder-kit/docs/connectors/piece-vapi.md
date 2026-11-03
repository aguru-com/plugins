# Vapi

AI voice agent platform. Create outbound calls, manage assistants, and retrieve call details.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vapi'
  version: '0.1.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your Vapi API key:
>
> 1. Log in to your [Vapi Dashboard](https://dashboard.vapi.ai).
> 2. Navigate to **Organization Settings** → **API Keys**.
> 3. Copy your Private API key.

## Actions

### `create_call`

**Create Call.** Place an outbound phone call through Vapi, having the specified AI voice assistant call a customer number. Use to initiate a live voice conversation; requires the assistant ID, a Vapi-registered phone number ID, and the destination number in E.164 format, with optional per-call assistant overrides. Not idempotent: each call places a new phone call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistantId` | string | yes |  | Assistant ID. The ID of the Vapi assistant that will handle the call. Get this from your Vapi Dashboard. |
| `phoneNumberId` | string | yes |  | Phone Number ID. The ID of the phone number to make the call from. Must be a number registered in your Vapi account. |
| `customerNumber` | string | yes |  | Customer Phone Number. The phone number to call, in E.164 format (e.g. +14155551234). |
| `name` | string | no |  | Call Name. An optional name for this call for identification. |
| `assistantOverrides` | JSON | no |  | Assistant Overrides. Optional JSON object with assistant configuration overrides for this call (e.g. first message, model settings). |

### `get_call`

**Get Call.** Look up a single Vapi call by its unique ID and return its details (status, transcript, outcome, and related metadata). Use to check the result or progress of a call you previously initiated. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callId` | string | yes |  | Call ID. The unique identifier of the call to retrieve. |

### `update_assistant`

**Update Assistant.** Modify the configuration of an existing Vapi assistant identified by its ID, setting fields such as name, first message, end-call message, model/provider, and a system prompt. Use to reconfigure a voice agent before placing calls. Key constraint: the system-prompt/instructions field requires both model and provider to be supplied (and model and provider must always be given together), otherwise the call errors. Idempotent: applying the same values leaves the assistant in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistantId` | string | yes |  | Assistant ID. The unique identifier of the assistant to update. |
| `name` | string | no |  | Name. A new name for the assistant. |
| `firstMessage` | string | no |  | First Message. The first message the assistant will say when a call starts. |
| `instructions` | string | no |  | System Prompt / Instructions. Optional system prompt. Vapi does not expose a standalone top-level instructions field on UpdateAssistantDto, so if you provide this you must also provide both Model and Provider so the system prompt can be applied via model.messages without discarding your input silently. |
| `model` | string | no |  | Model. Optional model name (e.g. gpt-4o). Required if updating model config. |
| `provider` | string | no |  | Provider. Optional model provider (e.g. openai). Required if updating model config. |
| `endCallMessage` | string | no |  | End Call Message. The message the assistant says before ending the call. |
| `overrides` | JSON | no |  | Additional Overrides. Optional JSON object with additional UpdateAssistantDTO fields (e.g. model, voice, transcriber settings). |

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
