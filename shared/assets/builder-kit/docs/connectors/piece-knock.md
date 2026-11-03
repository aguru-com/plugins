# Knock

Notification infrastructure for developers. Manage users, trigger workflows, and track messages.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-knock'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Knock Secret API Key

> Your Knock secret API key (starts with sk_). Found under Developer > API Keys in the Knock dashboard.

## Actions

### `trigger_workflow`

**Trigger Workflow.** Triggers a Knock notification workflow (identified by its workflow key) to deliver notifications to one or more recipient user IDs, optionally attaching template data, an actor, and a tenant. Choose this to send notifications to users; the recipients must already exist in Knock or be identified inline. Not idempotent — each call enqueues a fresh notification run. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowKey` | string | yes |  | Workflow Key. The key of the workflow to trigger (e.g. "new-comment"). |
| `recipients` | array | yes |  | Recipient IDs. One or more user IDs to receive the notification. |
| `actorId` | string | no |  | Actor ID. The user ID of the person performing the action (optional). |
| `data` | object | no |  | Data. Key-value data passed to the workflow template (optional). |
| `tenant` | string | no |  | Tenant. Optional tenant identifier for multi-tenant workflows. |

### `identify_user`

**Identify User.** Creates or updates (upserts) a Knock user identified by a stable user ID, setting profile fields such as name, email, phone, avatar, and arbitrary custom properties. Choose this to register or refresh a recipient before sending notifications. Idempotent — repeating with the same user ID and inputs converges to the same user record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. A unique identifier for the user in your system. |
| `name` | string | no |  | Name. The user display name. |
| `email` | string | no |  | Email. The user email address. |
| `phoneNumber` | string | no |  | Phone Number. Phone number in E.164 format (e.g. +14155552671). |
| `avatar` | string | no |  | Avatar URL. URL to the user avatar image. |
| `customProperties` | object | no |  | Custom Properties. Additional key-value properties to set on the user. |

### `get_user`

**Get User.** Fetches a single Knock user record by its unique user ID. Choose this to look up an existing recipient profile. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. The unique identifier of the user to retrieve. |

### `delete_user`

**Delete User.** Permanently deletes a Knock user identified by its unique user ID. Choose this to remove a recipient from Knock. Destructive and not idempotent — the first call removes the user and a repeat call fails to find it. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. The unique identifier of the user to delete. |

### `get_message`

**Get Message.** Fetches a single Knock message (a delivered or queued notification instance) by its unique message ID. Choose this to inspect the status or contents of one notification. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. The unique identifier of the message. |

### `list_messages`

**List Messages.** Lists Knock messages (notification instances), optionally narrowed by channel, delivery status, source workflow, or tenant; with no filters it returns all messages. Choose this to find messages or audit delivery. Supports cursor pagination via the after cursor and a page size clamped to 1-50. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | no |  | Channel ID. Filter messages by channel ID. |
| `status` | string | no |  | Status. Filter messages by delivery status. One of `"queued"`, `"sent"`, `"delivered"`, `"bounced"`, `"undelivered"`, `"not_sent"`. |
| `source` | string | no |  | Workflow Key. Filter by the workflow that generated the message. |
| `tenant` | string | no |  | Tenant. Filter messages by tenant. |
| `page_size` | number | no | `50` | Page Size. Number of messages per page (1–50, default 50). |
| `after` | string | no |  | After Cursor. Cursor for forward pagination. |

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
