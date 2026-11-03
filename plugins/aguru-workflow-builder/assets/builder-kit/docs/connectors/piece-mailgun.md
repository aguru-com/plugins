# Mailgun

Email delivery service for sending, receiving, and tracking emails

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mailgun'
  version: '0.1.1'
```

Categories: MARKETING, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Mailgun Connection

> To get your API key:
> 1. Log in to your [Mailgun dashboard](https://app.mailgun.com)
> 2. Go to **Settings > API Security**
> 3. Copy your **Private API Key** (starts with `key-`)

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_key` | string | yes |  | API Key. Your Mailgun private API key (starts with `key-`) |
| `region` | string | yes | `"us"` | Region. Select the region your Mailgun account is in. Most accounts use US. One of `"us"`, `"eu"`. |

## Actions

### `send_email`

**Send Email.** Send an outbound email through a verified Mailgun sending domain, with optional CC/BCC/Reply-To and either a plain-text or HTML body (at least one body is required). Choose this to deliver transactional or notification mail. Not idempotent: each call dispatches a new message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the Mailgun domain to use. A value the product loads from the provider, such as an id; write the value itself. |
| `from` | string | yes |  | From. Sender email address, e.g. "Your Name <you@yourdomain.com>". |
| `to` | string | yes |  | To Email Address. Recipient email address. For multiple recipients, separate with commas. |
| `cc` | string | no |  | CC Email Address. Carbon copy recipients, separated by commas. |
| `bcc` | string | no |  | BCC Email Address. Blind carbon copy recipients, separated by commas. |
| `replyTo` | string | no |  | Reply-To Email Address. Email address for replies. |
| `subject` | string | yes |  | Email Subject. |
| `text` | string | no |  | Email Body (Plain Text). Plain text version of the email body. |
| `html` | string | no |  | Email Body (HTML). HTML version of the email body. |

### `validate_email`

**Validate Email.** Check whether a single email address is deliverable via Mailgun email verification, optionally enabling mailbox-provider lookup for higher accuracy. Use to screen an address before sending or storing it. Requires email validation enabled on the Mailgun account. Idempotent: a read-only lookup that does not change anything. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The email address to validate. |
| `providerLookup` | boolean | no | `true` | Provider Lookup. Enable additional mailbox provider checks for more accurate results. |

### `add_mailing_list_member`

**Add Mailing List Member.** Add a subscriber to a Mailgun mailing list, identified by the list address, with an optional display name and custom variables. The "Update If Exists" toggle controls the duplicate mode: when enabled it upserts on the member email (idempotent), and when disabled a repeat add for the same address returns an error. Choose this to grow or update a mailing list. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | Mailing List. Select the mailing list. A value the product loads from the provider, such as an id; write the value itself. |
| `address` | string | yes |  | Member Email Address. The email address to add to the mailing list. |
| `name` | string | no |  | Member Name. The name of the member. |
| `upsert` | boolean | yes | `true` | Update If Exists. If enabled, updates the member if they already exist. Otherwise, an error is returned for duplicates. |
| `subscribed` | boolean | no | `true` | Subscribed. Set the subscription status of the member. |
| `vars` | JSON | no |  | Custom Variables. JSON object with custom variables to store with this member, e.g. {"age": 30, "city": "Paris"}. |

### `get_events`

**Get Events.** Fetch a domain's email event log filtered by a single event type (delivered, failed, opened, clicked, etc.), with optional severity, time range, and result cap; pagination is handled automatically. For "failed" events the severity filter can narrow to permanent (hard) or temporary (soft) bounces. Use to inspect or monitor recent email activity. Idempotent: a read-only query. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the Mailgun domain to use. A value the product loads from the provider, such as an id; write the value itself. |
| `event` | string | yes |  | Event Type. Filter events by type. One of `"failed"`, `"delivered"`, `"accepted"`, `"rejected"`, `"opened"`, `"clicked"`, `"complained"`, `"unsubscribed"`, `"stored"`. |
| `severity` | string | no |  | Severity. Only applies to "failed" events. Filter by permanent (hard bounce) or temporary (soft bounce). One of `""`, `"permanent"`, `"temporary"`. |
| `begin` | string | no |  | Begin Date. Start of the time range. RFC 2822 date (e.g. "Fri, 28 Mar 2026 10:00:00 -0000") or Unix timestamp (e.g. "1711620000"). Leave empty for Mailgun default (about 30 days ago). |
| `end` | string | no |  | End Date. End of the time range. Same format as Begin Date. Leave empty for now. |
| `limit` | number | no | `100` | Max Results. Maximum number of events to return. Default is 100, max is 1000. Mailgun returns up to 300 per page — pagination is handled automatically. |

### `get_domain_stats`

**Get Domain Stats.** Retrieve aggregated counts for a Mailgun domain across selected event types over a chosen duration (1 hour to 30 days), summed into totals. Use for delivery-health dashboards or anomaly detection rather than per-message detail. Idempotent: a read-only aggregation. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the Mailgun domain to use. A value the product loads from the provider, such as an id; write the value itself. |
| `event` | array | yes |  | Event Types. Select which event types to include in the statistics. One of `"accepted"`, `"delivered"`, `"failed"`, `"opened"`, `"clicked"`, `"complained"`, `"unsubscribed"`, `"stored"`. |
| `duration` | string | yes | `"1h"` | Duration. Time period to aggregate stats over. One of `"1h"`, `"6h"`, `"12h"`, `"24h"`, `"7d"`, `"30d"`. |

### `list_bounces`

**List Bounces.** List the addresses on a Mailgun domain's bounce suppression list, up to a result cap. Use to review or export bounced recipients, often before cleaning up the suppression list. Idempotent: a read-only listing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the Mailgun domain to use. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `100` | Max Results. Maximum number of bounces to return (1-1000). Default is 100. |

### `delete_bounces_bulk`

**Delete Bounces (Bulk).** Delete entries from a Mailgun domain's bounce suppression list. The scope selects the mode: "all" clears every bounce for the domain, while "single" removes one address (which is then required). Use to re-enable sending to addresses that previously bounced. Idempotent: deleting an already-absent bounce leaves the same end state with no extra effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the Mailgun domain to use. A value the product loads from the provider, such as an id; write the value itself. |
| `scope` | string | yes | `"all"` | Scope. Delete all bounces for the domain, or a single address. One of `"all"`, `"single"`. |
| `address` | string | no |  | Address. Email address to remove from the bounce list. Required when Scope is "Single address". |

### `get_domain_health`

**Get Domain Health.** Fetch a Mailgun domain's configuration health: its current state, whether it is disabled, and whether the sending and receiving DNS records are fully verified. Use to confirm a domain is ready to send or to diagnose setup problems. Idempotent: a read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the Mailgun domain to use. A value the product loads from the provider, such as an id; write the value itself. |

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
