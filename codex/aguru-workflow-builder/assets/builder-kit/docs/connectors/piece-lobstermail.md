# LobsterMail

Email infrastructure for AI agents — create inboxes, send and receive email, search, threads, and webhooks.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lobstermail'
  version: '0.2.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your LobsterMail API key:
> 1. Sign up or log in at **https://lobstermail.ai**
> 2. Go to **Settings → API Keys**
> 3. Click **Create New Key**
> 4. Copy the key — it starts with `lm_sk_test_` (sandbox) or `lm_sk_live_` (production)
>
> Need help? See https://lobstermail.ai/docs

## Actions

### `create_inbox`

**Create Inbox.** Provisions a new LobsterMail email inbox and returns its id and address. Use when an agent needs a fresh address to send or receive mail. Optionally set a username/local-part and custom domain (custom domains need a Tier 2+ account); leave both empty to auto-generate a random address. Not idempotent — each call provisions a separate inbox. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | no |  | Display Name. A friendly label for the inbox (e.g. "Support Inbox"). Only visible inside LobsterMail. |
| `localPart` | string | no |  | Email Username. The part before the @ in the email address (e.g. "support" → support@lobstermail.ai). Use only lowercase letters, numbers, dots, hyphens, or underscores. Leave empty to auto-generate a random address. |
| `domain` | string | no |  | Domain. The domain for the inbox address. Leave empty to use the default lobstermail.ai. Custom domains require a Tier 2+ account and prior DNS configuration. |

### `get_inbox`

**Get Inbox.** Looks up one LobsterMail inbox by its id and returns its address, active status, and settings. Use to resolve or verify an inbox before sending or reading mail. Requires a known inbox id (obtain it via List Inboxes). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inbox_id` | string | yes |  | Inbox. Select the inbox to use. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_inbox`

**Delete Inbox.** Permanently deletes a LobsterMail inbox by its id and frees its address; this is destructive and cannot be undone. Use only when an agent is certain the inbox and its mail are no longer needed. Requires a known inbox id. Not idempotent — a repeat call against an already-deleted inbox will fail rather than succeed silently. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inbox_id` | string | yes |  | Inbox. Select the inbox to use. A value the product loads from the provider, such as an id; write the value itself. |

### `list_inboxes`

**List Inboxes.** Returns every email inbox on the authenticated LobsterMail account, each with its id and address. Use to discover which inboxes exist or to find an inbox id needed by other actions. Takes no input. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `send_email`

**Send Email.** Sends an email from one of the account inboxes to up to 50 recipients. Can start a fresh message or continue an existing conversation by passing a thread id and/or an In-Reply-To message id. Requires a verified account (Tier 1+), a sending inbox, recipients, a subject, and at least one of a plain-text or HTML body. Not idempotent — each call dispatches a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. Select the inbox to send from. Must be an active inbox on your account. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | array | yes |  | To. Recipient email addresses (up to 50). |
| `subject` | string | yes |  | Subject. Email subject line. |
| `body_text` | string | no |  | Body (Plain Text). Plain text version of the email. At least one of Plain Text or HTML body is required. |
| `body_html` | string | no |  | Body (HTML). HTML version of the email. If only HTML is provided, a plain-text version is auto-generated. |
| `cc` | array | no |  | CC. Additional recipients to CC on the email. |
| `in_reply_to` | string | no |  | In-Reply-To Message ID. Message-ID of the email you are replying to (for threading). You can get this from the "Get Email" action output. |
| `thread_id` | string | no |  | Thread ID. ID of an existing thread to add this email to. Leave empty to start a new thread. |

### `list_emails`

**List Emails.** Lists emails in a single inbox, newest first, returning metadata and previews but not full bodies. Optionally narrow by direction (inbound received vs. outbound sent), restrict to unread only, and cap the count (1-50). Requires a known inbox id; use Get Email to fetch a full message body. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inbox_id` | string | yes |  | Inbox. Select the inbox to use. A value the product loads from the provider, such as an id; write the value itself. |
| `direction` | string | no |  | Direction. Filter by inbound (received) or outbound (sent) emails. One of `"inbound"`, `"outbound"`. |
| `unread_only` | boolean | no | `false` | Unread Only. Return only unread emails. |
| `limit` | number | no | `20` | Limit. Maximum number of emails to return (1–50, default 20). |

### `get_email`

**Get Email.** Retrieves one email by its id within an inbox, including the full plain-text and HTML body, authentication results (SPF/DKIM/DMARC), and prompt-injection risk signals. Use when an agent needs the complete message content rather than the preview returned by List Emails or Search Emails. Requires both the inbox id and the email id. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inbox_id` | string | yes |  | Inbox. Select the inbox to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email_id` | string | yes |  | Email ID. The ID of the email to retrieve (starts with eml_). You can get this from the "List Emails" action or the "New Email Received" trigger output. |

### `search_emails`

**Search Emails.** Full-text searches emails across all inboxes (or a single inbox if one is given), matching against subjects, senders, and body previews. Use to find messages by content when the email id is unknown; optionally filter by direction, sender, or attachment presence and cap results (1-50). Requires a non-empty query string and is rate limited to 30 requests/minute. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Text to search for. Searches email subjects (highest priority), senders, and body previews. |
| `inbox_id` | string | no |  | Inbox. Limit results to a specific inbox. Leave empty to search all inboxes. A value the product loads from the provider, such as an id; write the value itself. |
| `direction` | string | no |  | Direction. Filter by inbound (received) or outbound (sent) emails. One of `"inbound"`, `"outbound"`. |
| `from` | string | no |  | Sender Filter. Filter results to emails from a specific sender address (partial match supported). |
| `has_attachments` | boolean | no | `false` | Has Attachments. Return only emails that have attachments. |
| `limit` | number | no | `20` | Limit. Maximum number of results to return (1–50, default 20). |

### `get_account`

**Get Account.** Returns the authenticated LobsterMail account profile: subscription tier, verification status, current usage, and sending/inbox limits. Use to check capabilities or remaining quota before creating inboxes or sending mail. Takes no input. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

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
