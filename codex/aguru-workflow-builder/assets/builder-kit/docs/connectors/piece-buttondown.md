# Buttondown

Automate your Buttondown newsletter workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-buttondown'
  version: '0.0.8'
```

Categories: MARKETING, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Create an API key from https://buttondown.com/keys and paste it here.

## Actions

### `createSubscriber`

**Create Subscriber.** Adds a subscriber to a Buttondown newsletter by email address, with optional tags, metadata, UTM attribution, and referral data. Use "regular" subscriber type to skip double opt-in. Not idempotent: each call creates a subscriber; control duplicate-email handling via collision behavior (default keeps the existing subscriber, or overwrite/merge tags). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The email address of the subscriber. |
| `type` | string | no |  | Subscriber Type. Set the subscriber status. Use "regular" to bypass double opt-in. One of `"regular"`, `"premium"`, `"unactivated"`, `"paused"`, `"trialed"`, `"upcoming"`, `"churning"`, `"churned"`, `"unsubscribed"`, `"undeliverable"`, `"blocked"`, `"complained"`, `"gifted"`, `"past_due"`, `"removed"`, `"unpaid"`. |
| `notes` | string | no |  | Internal Notes. |
| `tags` | array | no |  | Tags. Add one or more tags to assign to the subscriber. Each item: { `tag` }. |
| `metadata` | JSON | no |  | Metadata. Custom metadata to store on the subscriber (JSON object). |
| `referrerUrl` | string | no |  | Referrer URL. |
| `utmSource` | string | no |  | UTM Source. |
| `utmMedium` | string | no |  | UTM Medium. |
| `utmCampaign` | string | no |  | UTM Campaign. |
| `referringSubscriberId` | string | no |  | Referring Subscriber ID. ID of the subscriber who referred this contact. |
| `ipAddress` | string | no |  | IP Address. The original IP address of the subscriber. Helps Buttondown evaluate spam. |
| `collisionBehavior` | string | no |  | Collision Behavior. Control how Buttondown handles duplicate email addresses. Leave empty to keep the existing subscriber. One of `"overwrite"`, `"add"`. |
| `bypassFirewall` | boolean | no | `false` | Bypass Firewall. Set to true when the request originates from a trusted internal system without the subscriber's IP address. |

### `listSubscribers`

**List Subscribers.** Lists subscribers from a Buttondown newsletter, optionally filtered by type, source, tags, email substring, or referrer URL; with no filters it returns all subscribers. Use to look up or enumerate subscribers. Read-only and idempotent. Returns one page (default 100); pass the returned cursor to page through results. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Page Size. Maximum number of subscribers to return (1-1000). |
| `cursor` | string | no |  | Cursor. Provide the cursor value from a previous response to fetch the next page. |
| `type` | string | no |  | Subscriber Type. One of `"regular"`, `"premium"`, `"unactivated"`, `"paused"`, `"trialed"`, `"upcoming"`, `"churning"`, `"churned"`, `"unsubscribed"`, `"undeliverable"`, `"blocked"`, `"complained"`, `"gifted"`, `"past_due"`, `"removed"`, `"unpaid"`. |
| `source` | string | no |  | Source. One of `"admin"`, `"api"`, `"carrd"`, `"comment"`, `"embedded_form"`, `"form"`, `"import"`, `"memberful"`, `"organic"`, `"patreon"`, `"stripe"`, `"user"`, `"zapier"`. |
| `tags` | array | no |  | Tags. Filter by subscribers who have at least one of these tags. Each item: { `tag` }. |
| `emailAddress` | string | no |  | Email Contains. Return subscribers whose email address contains this value. |
| `referrerUrl` | string | no |  | Referrer URL Contains. |
| `ordering` | string | no |  | Ordering. One of `"-creation_date"`, `"creation_date"`, `"email_address"`, `"-email_address"`, `"-last_open_date"`, `"last_open_date"`. |

### `sendEmail`

**Send Email.** Creates an email in Buttondown from a subject and Markdown/HTML body, then handles it per the chosen delivery status (e.g. send now vs. schedule for a future publish date, or save as draft). Use to broadcast a newsletter or queue one for later. A publish date is required when status is scheduled. Not idempotent: each call creates and may dispatch a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. |
| `body` | string | yes |  | Body. Write your email content in Markdown or HTML. Buttondown will detect the format automatically. |
| `status` | string | no | `"about_to_send"` | Delivery Status. Choose how Buttondown should treat this email after creation. One of `"about_to_send"`, `"draft"`, `"scheduled"`. |
| `publishDate` | ISO date-time string | no |  | Publish Date. Required when scheduling an email. Use ISO 8601 format. |
| `emailType` | string | no | `"public"` | Email Type. One of `"public"`, `"private"`, `"premium"`, `"free"`, `"churned"`, `"archival"`. |
| `description` | string | no |  | Description. |
| `canonicalUrl` | string | no |  | Canonical URL. |
| `image` | string | no |  | Primary Image URL. |
| `slug` | string | no |  | Slug. Override the automatic slug used for the archive URL. |
| `metadata` | JSON | no |  | Metadata. Custom metadata to attach to the email (JSON object). |
| `attachments` | array | no |  | Attachment IDs. IDs of attachments uploaded via the Buttondown API. Each item: { `id` }. |
| `triggerBilling` | boolean | no | `false` | Trigger Pay-per-email Billing. Enable when this email should count against pay-per-email billing for paid subscribers. |

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
