# AI Answer

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-aianswer'
  version: '0.2.1'
```

Categories: COMMUNICATION, CUSTOMER_SUPPORT, ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: AiAnswer API Access Token

> To obtain your AiAnswer API access token, follow these steps below:
> 1. Log in to your AiAnswer account at https://app.aianswer.us .
> 2. Navigate to Settings < API Key.
> 3. Click on Copy icon to copy your existing Key or click on New API Key to create a new one.
> 4. Copy the API Key and paste it below in "AiAnswer API Key".

## Actions

### `gmailGetListOfAgents`

**Gmail get list of Agents.** Lists the available Gmail-connected AI Answer agents on the account, returning their IDs. Use this to discover a valid agent ID before initiating or scheduling a call (those actions require an agent ID). Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `createPhoneCall`

**Create Phone Call.** Immediately places an outbound phone call from an AI Answer agent to a destination phone number. Use when an agent should call a customer right now; for a future-dated call use the schedule call action instead. Requires a valid agent ID and an E.164-formatted number with country code (e.g. +919876543210); optional key-value details can be attached. Not idempotent — each call places a new phone call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentID` | string | yes |  | Agent ID. |
| `phoneNumber` | string | yes |  | To Phone Number. Enter the phone number, along with country code, in format (e.g., +919876543210) |
| `details` | object | no |  | Details. Optional details with key-value pairs (e.g., customer_id, priority) |

### `getCallDetails`

**Get Call Details.** Retrieves the details and status of a single phone call by its call ID. Use to check the outcome or metadata of a call previously created or scheduled. Requires the call ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callID` | string | yes |  | Call ID. |

### `scheduleCallAgent`

**Schedule Call Agent.** Schedules an AI Answer agent to place an outbound call at a future date and time. Use when the call should happen later rather than immediately (for an immediate call use the create phone call action). Requires a valid agent ID, destination phone number, an execution time in YYYY-MM-DD HH:MM:SS format, and a timezone (e.g. Asia/Calcutta); optional prospect details can be attached. Not idempotent — each call schedules a new call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentID` | string | yes |  | Agent ID. |
| `phoneNumber` | string | yes |  | Phone Number. |
| `executionTime` | string | yes |  | Execution Time. Time to schedule the call in YYYY-MM-DD HH:MM:SS format. |
| `timezone` | string | yes |  | Timezone. Timezone of the scheduled call (e.g., Asia/Calcutta) |
| `prospectDetails` | object | no |  | Prospect Details. Optional prospect details with key-value pairs (e.g., customer_id, priority) |

### `getCallTranscript`

**Get Call Transcript.** Retrieves the conversation transcript of a completed phone call by its call ID. Use to read what was said on a call after it has finished. Requires the call ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callID` | string | yes |  | Call ID. |

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
