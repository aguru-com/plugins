# Bland AI

AI phone calling platform for outbound and conversational voice workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bland-ai'
  version: '0.2.2'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your [Bland AI dashboard](https://app.bland.ai)
> 2. Go to **Profile** (bottom-left menu) -> **Settings**
> 3. Click **API Keys** and copy your key

## Actions

### `send_call`

**Send Call.** Places an outbound AI voice call to a phone number (E.164 format, with country code) via Bland AI. Drive the conversation either by supplying free-text Task instructions for the agent or by referencing a pre-built Pathway ID (the Pathway overrides the Task). Use to actually start a call; not idempotent — each call triggers a new outbound dial. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phoneNumber` | string | yes |  | Phone Number. The number to call in E.164 format (e.g. +12223334444). Must include the country code. |
| `task` | string | no |  | Task. Instructions for the AI agent — what it should say, ask, or accomplish during the call. Not required if using a Pathway ID. |
| `pathwayId` | string | no |  | Pathway ID. UUID of a pre-built Pathway from your Bland AI dashboard. When provided, it overrides the Task field. Find it in the Pathways section of your dashboard. |
| `firstSentence` | string | no |  | First Sentence. Exact opening line the agent will say when the call is answered. Leave blank to let the agent decide. |
| `voice` | string | no | `"maya"` | Voice. The voice the AI agent will use. Choose from Bland AI preset voices optimised for phone quality. One of `"maya"`, `"ryan"`, `"mason"`, `"tina"`, `"josh"`, `"florian"`, `"derek"`, `"june"`, `"nat"`, `"paige"`. |
| `model` | string | no | `"base"` | Model. "Base" is the standard model. "Turbo" is faster with lower latency, recommended for time-sensitive conversations. One of `"base"`, `"turbo"`. |
| `language` | string | no |  | Language. Language code for transcription and speech (e.g. "en", "es", "fr"). Defaults to "babel-en" (English with accent tolerance). |
| `maxDuration` | number | no | `30` | Max Duration (minutes). Maximum call length in minutes. The call ends automatically after this time. Defaults to 30. |
| `waitForGreeting` | boolean | no | `false` | Wait for Greeting. When enabled, the AI waits for the recipient to speak first before responding. Useful when calling into IVR systems. |
| `record` | boolean | no | `false` | Record Call. When enabled, the call is recorded. The recording URL is included in the post-call data. |
| `transferPhoneNumber` | string | no |  | Transfer Phone Number. E.164 phone number to transfer the call to if the AI decides a human is needed (e.g. +12223334444). |
| `webhook` | string | no |  | Webhook URL. URL that receives a POST request with full call data (transcript, summary, recording URL) after the call ends. |
| `summaryPrompt` | string | no |  | Summary Prompt. Custom instructions for how the post-call summary should be written (max 2000 characters). Leave blank to use the default summary format. |

### `get_call_details`

**Get Call Details.** Fetches the full record of one Bland AI call by its call ID (status, transcript, summary, recording URL, and post-call data). Use to inspect or poll the outcome of a call after it has been placed. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callId` | string | yes |  | Call ID. The Bland AI call identifier. |

### `list_calls`

**List Calls.** Lists recent Bland AI calls, optionally narrowed by origin (from) and/or destination (to) phone number and capped by a limit (1-100). Leave the number filters empty to retrieve the most recent calls regardless of party. Use to discover call IDs or survey call history. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `10` | Limit. Maximum number of calls to return. |
| `fromNumber` | string | no |  | From Number. Optional origin phone number filter. |
| `toNumber` | string | no |  | To Number. Optional destination phone number filter. |

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
