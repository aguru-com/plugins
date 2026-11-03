# Bird

Unified CRM for Marketing, Service & Payments

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-messagebird'
  version: '0.3.1'
```

Categories: MARKETING, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Bird API Access Key from Settings > Security > Access Keys. |
| `workspaceId` | string | yes |  | Workspace ID. Bird Workspace ID found in your workspace URL. |
| `channelId` | string | yes |  | Channel ID. Your SMS channel ID from Bird dashboard. |

## Actions

### `send-sms`

**Send SMS.** Send an outbound SMS text message to a phone number through the Bird (MessageBird) Channels API, using the workspace and channel configured in the connection. Choose this to deliver a text message to a single recipient; the recipient must be an E.164 phone number including country code. Optionally schedule it for a future UTC timestamp instead of sending immediately. Not idempotent — each call sends (or schedules) a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipient` | string | yes |  | Recipient. The phone number to send the message to (with country code) |
| `message` | string | yes |  | Message. The body of the SMS message. |
| `reference` | string | no |  | Reference. Your own identifier for the message (optional) |
| `scheduledFor` | ISO date-time string | no |  | Scheduled For (UTC timestamp). Message to be sent at a specific datetime eg. 2025-04-27T15:08:18.613Z. If not set, the message will be sent immediately. |

### `listMessages`

**List Messages.** Retrieve messages for the configured Bird (MessageBird) channel within a required UTC start/end time window (the span must not exceed 7 days). Choose this to read recent message history or to look up message status. Set status to "all" to return messages of every status, or pick a specific status (pending, sent, delivered, failed, etc.) to filter to matching messages only; supports a page token for paging past 1000 results. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | yes |  | Status. The status of the messages to filter by (select "All" for all statuses) One of `"all"`, `"pending"`, `"accepted"`, `"rejected"`, `"processing"`, `"scheduled"`, `"sent"`, `"sending_failed"`, `"delivered"`, `"delivery_failed"`, `"deleted"`, `"skipped"`. |
| `startAt` | ISO date-time string | yes | `"2026-10-25T18:20:15Z"` | Start Date and Time. The start date and time (in UTC) to filter messages. |
| `endAt` | ISO date-time string | yes | `"2026-10-26T18:20:15Z"` | End Date and Time. The end date and time (in UTC) to filter messages, should not exceed 7 days from start date. |
| `pageToken` | string | no |  | Next Page Token. Token for pagination to fetch next set of results after 1000 messages. |

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
