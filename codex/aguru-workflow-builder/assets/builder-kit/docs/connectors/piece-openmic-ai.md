# OpenMic AI

An AI-powered platform that automates phone calls using advanced language models.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-openmic-ai'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Openmic AI API Key

> To get your Openmic AI API key:
> 1. Log in to your Openmic dashboard at https://app.openmic.ai
> 2. Navigate to  API Keys section in the left Navigation
> 3. Generate a new API key
> 4. Copy and paste the key here

## Actions

### `createPhoneCall`

**Create Phone Call.** Places a new outbound AI phone call from one E.164 number to another via OpenMic AI. Use to initiate a voice call programmatically; optionally override the default bot/agent, attach a customer ID, inject dynamic prompt variables, or set a callback URL for call events. Not idempotent — each call dials a new outbound call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromNumber` | string | yes |  | From Number. The number you own in E.164 format (e.g., +1234567890) |
| `toNumber` | string | yes |  | To Number. The number you want to call in E.164 format (e.g., +0987654321) |
| `overrideAgentId` | string | no |  | Agent ID. The bot UID to override the default agent. |
| `customerId` | string | no |  | Customer ID. Customer identifier for tracking. |
| `dynamicVariables` | object | no |  | Dynamic Variables. Key-value pairs to replace in the prompt. |
| `callbackUrl` | string | no |  | Callback URL. Callback URL to receive call events. |

### `findBot`

**Find Bot.** Fetches the full details of a single OpenMic AI bot by its UID. Use when you already have a bot UID and need its configuration; to discover UIDs or browse bots, use Get Bots instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `uid` | string | yes |  | Bot UID. The unique identifier of the bot. |

### `findCall`

**Find Call.** Fetches the full details of a single OpenMic AI call by its call ID. Use when you already have a call ID and need its record; to discover IDs or browse calls, use Get Calls instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callId` | string | yes |  | Call ID. The unique identifier of the call. |

### `getBots`

**Get Bots.** Lists OpenMic AI bots, with optional filters by name (partial match) and created-after/created-before date range plus limit/offset pagination. With no filters it returns all bots; supply filters to narrow the set. Use to discover bots and their UIDs. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Bot Name. Filter by bot name (partial match) |
| `createdAfter` | string | no |  | Created After. Filter bots created after this date (ISO 8601 format) |
| `createdBefore` | string | no |  | Created Before. Filter bots created before this date (ISO 8601 format) |
| `limit` | number | no | `10` | Limit. Maximum number of bots to return (1-100) |
| `offset` | number | no | `0` | Offset. Number of bots to skip for pagination. |

### `getCalls`

**Get Calls.** Lists OpenMic AI calls, with optional filters by customer ID, from/to phone number, bot ID, date range, call status, and call type plus limit/offset pagination. With no filters it returns all calls; supply filters to narrow the set. Use to discover calls and their IDs. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | no |  | Customer ID. Filter by customer ID. |
| `fromNumber` | string | no |  | From Number. Filter by originating phone number. |
| `toNumber` | string | no |  | To Number. Filter by destination phone number. |
| `botId` | string | no |  | Bot ID. Filter by bot ID. |
| `fromDate` | string | no |  | From Date. Filter calls from this date (ISO 8601 format) |
| `toDate` | string | no |  | To Date. Filter calls to this date (ISO 8601 format) |
| `callStatus` | string | no |  | Call Status. Filter by call status. One of `"registered"`, `"ongoing"`, `"ended"`, `"error"`. |
| `callType` | string | no |  | Call Type. Filter by call type. One of `"phonecall"`, `"webcall"`. |
| `limit` | number | no | `10` | Limit. Maximum number of calls to return (1-100) |
| `offset` | number | no | `0` | Offset. Number of calls to skip for pagination. |

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
