# Emailit

Send transactional emails with Emailit

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-emailit'
  version: '0.2.1'
```

Categories: COMMUNICATION, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Get your API key from your [Emailit Workspace Settings](https://app.emailit.com/settings/api-keys). A **Full Access** key works with every action. A **Sending Only** key can send, reschedule, cancel, retry and forward emails, but not read emails or manage domains, audiences, contacts or suppressions.

## Actions

### `send_email`

**Send Email.** Sends a transactional email through Emailit from an address on a verified sending domain to up to 50 To recipients (each of CC and BCC also takes up to 50), as HTML or plain text or from a stored template, optionally scheduled. Returns the HTTP status, response headers and the email in body (body.id is the email ID). Not idempotent: a repeat call sends again unless the same Idempotency Key is given within 24 hours. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. Recipient email addresses, e.g. ada@example.com or Ada Lovelace <ada@example.com>. Up to 50 here, and up to 50 each in CC and BCC. |
| `from_name` | string | no |  | Sender Name. Name recipients will see in their inbox, e.g. "Acme Support". If left blank, only the email address is shown. |
| `from_email` | string | yes |  | Sender Email. Email address to send from. It must be on a verified sending domain of your Emailit workspace. |
| `cc` | array | no |  | CC. Send a visible copy to these addresses. Up to 50. |
| `bcc` | array | no |  | BCC. Send a hidden copy to these addresses. Other recipients won't see them. Up to 50. |
| `reply_to` | string | no |  | Reply-To. Where replies go. Defaults to the sender email if left blank. Separate several addresses with commas. |
| `subject` | string | no |  | Subject. The subject line shown in the recipient's inbox. Required unless you send a template. |
| `content_type` | string | yes | `"html"` | Content Type. One of `"text"`, `"html"`. |
| `content` | string | no |  | Email Body. The message body. Use Plain Text for simple messages or HTML for rich formatting. Required unless you send a template. |
| `plain_text` | string | no |  | Plain-Text Version. Optional, for HTML emails: a plain-text version sent alongside the HTML. Recommended for deliverability. |
| `headers` | object | no |  | Custom Headers. Add custom email headers as key-value pairs, e.g. X-Campaign-ID: welcome. Line breaks are not allowed. |
| `scheduled_at` | ISO date-time string | no |  | Send At. Optional. Schedule the email for later (ISO 8601 with time zone). Leave empty to send now. |
| `template` | string | no |  | Template. Optional. A template ID (tem_…) or alias. Subject and body in this step override the template's. |
| `variables` | JSON | no |  | Template Variables. Optional. Values for {{placeholders}} in the subject and body, e.g. {"first_name": "Ada"}. |
| `meta` | object | no |  | Metadata. Optional. Your own key-value data stored with the email and sent back in webhooks, e.g. order_id: 1042. |
| `tracking` | string | no | `"default"` | Open & Click Tracking. Uses the sending domain's setting by default. Tracking only works when the domain's tracking CNAME is verified. One of `"default"`, `"on"`, `"off"`. |
| `attachments` | array | no |  | Attachments (by URL). Optional. Files Emailit downloads when sending (public http/https URL, max 25 MB, no redirects). Each item: { `filename`, `url` }. |
| `attachment_file` | file | no |  | Attachment (file). Optional. A file from a previous step to attach. Files are not supported; an action that needs one fails. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional. A unique value (letters, digits, - and _; up to 256) such as an order ID. If this step runs again with the same key within 24 hours, Emailit returns the first result instead of sending again. |

Output fields:

- `status`: HTTP Status (number)
- `headers`: Response Headers (an object whose keys vary)
- `body`: Email
- `body.id`: Email ID
- `body.ids`: Email IDs by Recipient (an object whose keys vary)
- `body.object`: Object
- `body.message_id`: Message-ID Header
- `body.from`: From
- `body.to`: To
- `body.cc`: CC
- `body.bcc`: BCC
- `body.subject`: Subject
- `body.status`: Status
- `body.scheduled_at`: Scheduled At (datetime)
- `body.created_at`: Created At (datetime)
- `body.tracking`: Tracking
- `body.tracking.loads`: Open Tracking (boolean)
- `body.tracking.clicks`: Click Tracking (boolean)

### `send_email_ai`

**Send Email (AI).** Sends one email through Emailit from an address on a verified sending domain to up to 50 To recipients (CC and BCC take up to 50 each), with an HTML body, a plain-text body, both, or a stored template with variables, optionally scheduled for later. Returns the email (id, ids per recipient, status). Not idempotent: a repeat call sends again unless the same idempotency_key is given within 24 hours. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. Recipient addresses, up to 50. |
| `from_email` | string | yes |  | Sender Email. Address on a verified sending domain of the workspace. |
| `from_name` | string | no |  | Sender Name. |
| `subject` | string | no |  | Subject. Required unless template is set. |
| `html` | string | no |  | HTML Body. |
| `text` | string | no |  | Plain-Text Body. |
| `cc` | array | no |  | CC. Up to 50. |
| `bcc` | array | no |  | BCC. Up to 50. |
| `reply_to` | array | no |  | Reply-To. Addresses for replies. |
| `template` | string | no |  | Template. Template ID (tem_…) or alias. |
| `variables` | JSON | no |  | Template Variables. JSON object of placeholder values. |
| `scheduled_at` | string | no |  | Send At. ISO 8601 date-time with time zone, e.g. 2026-10-02T09:00:00Z. Empty sends now. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional. A unique value (letters, digits, - and _; up to 256) such as an order ID. If this step runs again with the same key within 24 hours, Emailit returns the first result instead of sending again. |

Output fields:

- `id`: Email ID
- `ids`: Email IDs by Recipient (an object whose keys vary)
- `object`: Object
- `message_id`: Message-ID Header
- `from`: From
- `to`: To
- `cc`: CC
- `bcc`: BCC
- `subject`: Subject
- `status`: Status
- `scheduled_at`: Scheduled At (datetime)
- `created_at`: Created At (datetime)
- `tracking`: Tracking
- `tracking.loads`: Open Tracking (boolean)
- `tracking.clicks`: Click Tracking (boolean)

### `get_email`

**Get Email.** Returns one Emailit email by ID: status (accepted, delivered, bounced, …), from, to, subject, metadata, headers, HTML/text body and attachment names and sizes. Attachment contents are not returned. Read-only; needs a Full Access key. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. The Emailit email ID, e.g. em_4KYof1ZzXndZE2VPi0DgULiekG8 (from a Send Email step or Find Emails). |

Output fields:

- `id`: Email ID
- `type`: Type
- `from`: From
- `to`: To
- `subject`: Subject
- `status`: Status
- `size`: Size (filesize)
- `scheduled_at`: Scheduled At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `meta`: Metadata (an object whose keys vary)
- `message_id`: Message-ID Header
- `tracking`: Tracking
- `tracking.loads`: Open Tracking (boolean)
- `tracking.clicks`: Click Tracking (boolean)
- `headers`: Headers (an object whose keys vary)
- `body`: Body
- `body.text`: Text
- `body.html`: HTML (html)
- `attachments`: Attachments
- `attachments[].filename`: File Name
- `attachments[].content_type`: Content Type
- `attachments[].size`: Size (filesize)

### `list_emails`

**Find Emails.** Searches Emailit emails newest first and returns one page {items, count, page, hasMore}. Filter by recipient, status, free-text search (recipient, sender or subject), direction and a date range (defaults to the last 14 days). Each recipient of a send is a separate item. Read-only; needs a Full Access key. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no | `"outbound"` | Direction. One of `"outbound"`, `"inbound"`. |
| `to` | string | no |  | Recipient. Exact recipient address. |
| `status` | string | no |  | Status. One of `"accepted"`, `"scheduled"`, `"delivered"`, `"loaded"`, `"clicked"`, `"attempted"`, `"bounced"`, `"failed"`, `"rejected"`, `"suppressed"`, `"received"`, `"complained"`, `"canceled"`, `"held"`. |
| `search` | string | no |  | Search. Matches recipient, sender or subject. |
| `date_from` | string | no |  | From Date. YYYY-MM-DD (UTC). Defaults to 14 days ago. |
| `date_to` | string | no |  | To Date. YYYY-MM-DD (UTC). |
| `limit` | number | no |  | Limit. Results per page, 1-100. Defaults to 25. |
| `page` | number | no |  | Page. Page to return, starting at 1. Use it when the previous result had Has More Pages = true. |

Output fields:

- `items`: Items
- `items[].id`: Email ID
- `items[].type`: Type
- `items[].from`: From
- `items[].to`: To
- `items[].subject`: Subject
- `items[].status`: Status
- `items[].size`: Size (filesize)
- `items[].scheduled_at`: Scheduled At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].meta`: Metadata (an object whose keys vary)
- `count`: Count on This Page (number)
- `page`: Page (number)
- `hasMore`: Has More Pages (boolean)
- `totalRecords`: Total Records (number)

### `update_scheduled_email`

**Reschedule Email.** Moves a scheduled Emailit email to a new send time. Works only while the email is still scheduled and more than 3 minutes from its current send time, and the new time must be over 3 minutes ahead. Content cannot change. Repeating with the same time leaves the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. ID of the scheduled email. For a send to several recipients, each recipient has its own ID. |
| `scheduled_at` | ISO date-time string | yes |  | New Send Time. ISO 8601 with time zone; at least 3 minutes from now. |

Output fields:

- `id`: Email ID
- `status`: Status
- `scheduled_at`: Scheduled At (datetime)
- `updated_at`: Updated At (datetime)
- `message`: Message

### `cancel_email`

**Cancel Scheduled Email.** Cancels an Emailit email that is still scheduled, accepted (queued) or attempted (retrying); sent emails cannot be recalled and the credit is not refunded. Best effort: in_flight=true means a delivery attempt may still complete. A repeat call on an already canceled email returns alreadyCanceled=true instead of failing. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. The Emailit email ID, e.g. em_4KYof1ZzXndZE2VPi0DgULiekG8 (from a Send Email step or Find Emails). |

Output fields:

- `id`: Email ID
- `status`: Status
- `in_flight`: Delivery May Still Complete (boolean)
- `alreadyCanceled`: Already Canceled (boolean)
- `message`: Message

### `retry_email`

**Retry Email.** Queues a new copy (new ID, same content and recipient) of an Emailit email whose status is bounced, failed, suppressed or held, created in the last 30 days. Costs a credit like a new send. Not idempotent: each call sends another copy. Fix the cause first, e.g. remove the suppression. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. ID of the bounced, failed, suppressed or held email. |

Output fields:

- `id`: New Email ID
- `original_id`: Original Email ID
- `from`: From
- `to`: To
- `subject`: Subject
- `status`: Status
- `created_at`: Created At (datetime)
- `message`: Message

### `forward_email`

**Forward Email.** Forwards an outgoing Emailit email to up to 50 new recipients as a new send, either as a plain resend or with a "Forwarded message" block and an optional note. Each recipient costs a credit; the workspace can forward at most 3 emails per hour. Not idempotent unless the same idempotency_key is given within 24 hours. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. ID of the outgoing email to forward. |
| `to` | array | yes |  | To. New recipients, up to 50. |
| `include_headers` | boolean | no | `false` | Add Forwarded-Message Header. Adds the original sender, date and subject above the content, with your note. |
| `comment` | string | no |  | Note. Plain-text note above the forwarded message (only with the header option). |
| `from` | string | no |  | Sender. Optional. Defaults to the original sender. |
| `subject` | string | no |  | Subject. Optional. Defaults to the original subject. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional. A unique value (letters, digits, - and _; up to 256) such as an order ID. If this step runs again with the same key within 24 hours, Emailit returns the first result instead of sending again. |

Output fields:

- `id`: Email ID
- `ids`: Email IDs by Recipient (an object whose keys vary)
- `object`: Object
- `message_id`: Message-ID Header
- `from`: From
- `to`: To
- `cc`: CC
- `bcc`: BCC
- `subject`: Subject
- `status`: Status
- `scheduled_at`: Scheduled At (datetime)
- `created_at`: Created At (datetime)
- `tracking`: Tracking
- `tracking.loads`: Open Tracking (boolean)
- `tracking.clicks`: Click Tracking (boolean)
- `original_id`: Original Email ID
- `message`: Message

### `list_domains`

**List Sending Domains.** Lists the Emailit workspace's sending domains (id, name, verification_status and per-record SPF/DKIM/return-path status), one page at a time {items, count, page, hasMore}. Use it to find a verified domain to send from. Read-only; needs a Full Access key. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Part of the domain name. |
| `limit` | number | no |  | Limit. Results per page, 1-100. Defaults to 25. |
| `page` | number | no |  | Page. Page to return, starting at 1. Use it when the previous result had Has More Pages = true. |

Output fields:

- `items`: Items
- `items[].id`: Domain ID
- `items[].name`: Domain Name
- `items[].verification_status`: Verification Status
- `items[].verified_at`: Verified At (datetime)
- `items[].spf_status`: SPF Status
- `items[].dkim_status`: DKIM Status
- `items[].return_path_status`: Return Path Status
- `items[].dmarc_status`: DMARC Status
- `items[].tracking_status`: Tracking Status
- `items[].created_at`: Created At (datetime)
- `count`: Count on This Page (number)
- `page`: Page (number)
- `hasMore`: Has More Pages (boolean)
- `totalRecords`: Total Records (number)

### `get_domain`

**Get Sending Domain.** Returns one Emailit sending domain: verification_status, each record's status and error, and the DNS records to publish. Statuses reflect the last DNS check; call Check Domain Verification to re-check now. Read-only; needs a Full Access key. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. The sending domain. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Domain ID
- `name`: Domain Name
- `verification_status`: Verification Status
- `verified_at`: Verified At (datetime)
- `spf_status`: SPF Status
- `dkim_status`: DKIM Status
- `return_path_status`: Return Path Status
- `dmarc_status`: DMARC Status
- `tracking_status`: Tracking Status
- `created_at`: Created At (datetime)
- `dns_checked_at`: DNS Checked At (datetime)
- `manual_review_required`: Manual Review Required (boolean)
- `spf_error`: SPF Error
- `dkim_error`: DKIM Error
- `return_path_error`: Return Path Error
- `dmarc_error`: DMARC Error
- `track_loads`: Open Tracking Default (number)
- `track_clicks`: Click Tracking Default (number)
- `dns_records`: DNS Records
- `dns_records[].type`: Type
- `dns_records[].name`: Name
- `dns_records[].value`: Value
- `dns_records[].priority`: Priority (number)
- `dns_records[].required`: Required (boolean)
- `dns_records[].status`: Status
- `dns_records[].error`: Error

### `get_domain_by_id`

**Get Sending Domain (by ID).** Returns one Emailit sending domain: verification_status, each record's status and error, and the DNS records to publish. Statuses reflect the last DNS check; call Check Domain Verification to re-check now. Read-only; needs a Full Access key. Takes the domain ID (dom_…) or name (acme.com); List Sending Domains finds them. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Domain ID (dom_…) or domain name, e.g. acme.com. |

Output fields:

- `id`: Domain ID
- `name`: Domain Name
- `verification_status`: Verification Status
- `verified_at`: Verified At (datetime)
- `spf_status`: SPF Status
- `dkim_status`: DKIM Status
- `return_path_status`: Return Path Status
- `dmarc_status`: DMARC Status
- `tracking_status`: Tracking Status
- `created_at`: Created At (datetime)
- `dns_checked_at`: DNS Checked At (datetime)
- `manual_review_required`: Manual Review Required (boolean)
- `spf_error`: SPF Error
- `dkim_error`: DKIM Error
- `return_path_error`: Return Path Error
- `dmarc_error`: DMARC Error
- `track_loads`: Open Tracking Default (number)
- `track_clicks`: Click Tracking Default (number)
- `dns_records`: DNS Records
- `dns_records[].type`: Type
- `dns_records[].name`: Name
- `dns_records[].value`: Value
- `dns_records[].priority`: Priority (number)
- `dns_records[].required`: Required (boolean)
- `dns_records[].status`: Status
- `dns_records[].error`: Error

### `verify_domain`

**Check Domain Verification.** Makes Emailit look up a sending domain's DNS records now and save the result, then returns the domain with fresh statuses. The domain becomes verified when SPF, DKIM and return-path are ok; any failing record shows in dns_records with its error. It changes no DNS; repeating it only re-checks. Needs a Full Access key. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. The sending domain. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Domain ID
- `name`: Domain Name
- `verification_status`: Verification Status
- `verified_at`: Verified At (datetime)
- `spf_status`: SPF Status
- `dkim_status`: DKIM Status
- `return_path_status`: Return Path Status
- `dmarc_status`: DMARC Status
- `tracking_status`: Tracking Status
- `created_at`: Created At (datetime)
- `dns_checked_at`: DNS Checked At (datetime)
- `manual_review_required`: Manual Review Required (boolean)
- `spf_error`: SPF Error
- `dkim_error`: DKIM Error
- `return_path_error`: Return Path Error
- `dmarc_error`: DMARC Error
- `track_loads`: Open Tracking Default (number)
- `track_clicks`: Click Tracking Default (number)
- `dns_records`: DNS Records
- `dns_records[].type`: Type
- `dns_records[].name`: Name
- `dns_records[].value`: Value
- `dns_records[].priority`: Priority (number)
- `dns_records[].required`: Required (boolean)
- `dns_records[].status`: Status
- `dns_records[].error`: Error

### `verify_domain_by_id`

**Check Domain Verification (by ID).** Makes Emailit look up a sending domain's DNS records now and save the result, then returns the domain with fresh statuses. The domain becomes verified when SPF, DKIM and return-path are ok; any failing record shows in dns_records with its error. It changes no DNS; repeating it only re-checks. Needs a Full Access key. Takes the domain ID (dom_…) or name; List Sending Domains finds them. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Domain ID (dom_…) or domain name. |

Output fields:

- `id`: Domain ID
- `name`: Domain Name
- `verification_status`: Verification Status
- `verified_at`: Verified At (datetime)
- `spf_status`: SPF Status
- `dkim_status`: DKIM Status
- `return_path_status`: Return Path Status
- `dmarc_status`: DMARC Status
- `tracking_status`: Tracking Status
- `created_at`: Created At (datetime)
- `dns_checked_at`: DNS Checked At (datetime)
- `manual_review_required`: Manual Review Required (boolean)
- `spf_error`: SPF Error
- `dkim_error`: DKIM Error
- `return_path_error`: Return Path Error
- `dmarc_error`: DMARC Error
- `track_loads`: Open Tracking Default (number)
- `track_clicks`: Click Tracking Default (number)
- `dns_records`: DNS Records
- `dns_records[].type`: Type
- `dns_records[].name`: Name
- `dns_records[].value`: Value
- `dns_records[].priority`: Priority (number)
- `dns_records[].required`: Required (boolean)
- `dns_records[].status`: Status
- `dns_records[].error`: Error

### `list_audiences`

**List Audiences.** Lists Emailit audiences (subscriber lists) newest first with id, name, subscriber count and plan usage, one page at a time {items, count, page, hasMore, totalRecords}. Use the id with the subscriber actions. Read-only; needs a Full Access key. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Part of the audience name. |
| `limit` | number | no |  | Limit. Results per page, 1-100. Defaults to 25. |
| `page` | number | no |  | Page. Page to return, starting at 1. Use it when the previous result had Has More Pages = true. |

Output fields:

- `items`: Items
- `items[].id`: Audience ID
- `items[].name`: Name
- `items[].subscribers_count`: Subscribers (number)
- `items[].usage`: Usage
- `items[].usage.used`: Used (number)
- `items[].usage.limit`: Limit (number)
- `items[].usage.plan`: Plan
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count on This Page (number)
- `page`: Page (number)
- `hasMore`: Has More Pages (boolean)
- `totalRecords`: Total Records (number)

### `add_subscriber`

**Add Subscriber to Audience.** Adds an email address to an Emailit audience (creating the contact if it does not exist) with optional first/last name and custom fields, which overwrite the contact's values. If the address is already subscribed nothing changes and alreadySubscribed=true is returned; if it had unsubscribed, this resubscribes it, so only use it when the person opted in again. Returns the subscriber (id = sub_…); pass that id or the email to Update Subscriber or Remove Subscriber. Needs a Full Access key. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience` | string | yes |  | Audience. The audience (subscriber list). A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `custom_fields` | object | no |  | Custom Fields. Replaces all of the contact's custom fields, e.g. company: Acme. |

Output fields:

- `id`: Subscriber ID
- `audience_id`: Audience ID
- `contact_id`: Contact ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `custom_fields`: Custom Fields (an object whose keys vary)
- `subscribed`: Subscribed (boolean)
- `subscribed_at`: Subscribed At (datetime)
- `unsubscribed_at`: Unsubscribed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `alreadySubscribed`: Already Subscribed (boolean)

### `add_subscriber_by_id`

**Add Subscriber to Audience (by ID).** Adds an email address to an Emailit audience (creating the contact if it does not exist) with optional first/last name and custom fields, which overwrite the contact's values. If the address is already subscribed nothing changes and alreadySubscribed=true is returned; if it had unsubscribed, this resubscribes it, so only use it when the person opted in again. Returns the subscriber (id = sub_…); pass that id or the email to Update Subscriber or Remove Subscriber. Needs a Full Access key. Get the audience ID from List Audiences first. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience` | string | yes |  | Audience. The audience ID (aud_…) or its exact name. Use List Audiences to find it. |
| `email` | string | yes |  | Email. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `custom_fields` | object | no |  | Custom Fields. Replaces all of the contact's custom fields, e.g. company: Acme. |

Output fields:

- `id`: Subscriber ID
- `audience_id`: Audience ID
- `contact_id`: Contact ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `custom_fields`: Custom Fields (an object whose keys vary)
- `subscribed`: Subscribed (boolean)
- `subscribed_at`: Subscribed At (datetime)
- `unsubscribed_at`: Unsubscribed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `alreadySubscribed`: Already Subscribed (boolean)

### `update_subscriber`

**Update Subscriber.** Updates one subscriber of an Emailit audience, found by subscriber ID (sub_…) or email address: turn Subscribed on or off for this audience (use this for opt-outs), or change first/last name (names belong to the contact, so they change everywhere). Only the fields given are sent. Repeating with the same values changes nothing. Needs a Full Access key. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience` | string | yes |  | Audience. The audience (subscriber list). A value the product loads from the provider, such as an id; write the value itself. |
| `subscriber` | string | yes |  | Subscriber. Subscriber ID (sub_…) or email address. |
| `subscribed` | string | no | `"keep"` | Subscribed. One of `"keep"`, `"yes"`, `"no"`. |
| `first_name` | string | no |  | First Name. Leave empty to keep. |
| `last_name` | string | no |  | Last Name. Leave empty to keep. |

Output fields:

- `id`: Subscriber ID
- `audience_id`: Audience ID
- `contact_id`: Contact ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `custom_fields`: Custom Fields (an object whose keys vary)
- `subscribed`: Subscribed (boolean)
- `subscribed_at`: Subscribed At (datetime)
- `unsubscribed_at`: Unsubscribed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_subscriber_by_id`

**Update Subscriber (by ID).** Updates one subscriber of an Emailit audience, found by subscriber ID (sub_…) or email address: turn Subscribed on or off for this audience (use this for opt-outs), or change first/last name (names belong to the contact, so they change everywhere). Only the fields given are sent. Repeating with the same values changes nothing. Needs a Full Access key. Get the audience ID from List Audiences first. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience` | string | yes |  | Audience. The audience ID (aud_…) or its exact name. Use List Audiences to find it. |
| `subscriber` | string | yes |  | Subscriber. Subscriber ID (sub_…) or email address. |
| `subscribed` | string | no | `"keep"` | Subscribed. One of `"keep"`, `"yes"`, `"no"`. |
| `first_name` | string | no |  | First Name. Leave empty to keep. |
| `last_name` | string | no |  | Last Name. Leave empty to keep. |

Output fields:

- `id`: Subscriber ID
- `audience_id`: Audience ID
- `contact_id`: Contact ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `custom_fields`: Custom Fields (an object whose keys vary)
- `subscribed`: Subscribed (boolean)
- `subscribed_at`: Subscribed At (datetime)
- `unsubscribed_at`: Unsubscribed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `remove_subscriber`

**Remove Subscriber.** Removes one subscriber (by sub_… ID or email) from an Emailit audience; the contact and its other audiences are kept, and no opt-out is recorded (for opt-outs use Update Subscriber with Subscribed off instead). If nothing matches, returns alreadyRemoved=true instead of failing. Needs a Full Access key. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience` | string | yes |  | Audience. The audience (subscriber list). A value the product loads from the provider, such as an id; write the value itself. |
| `subscriber` | string | yes |  | Subscriber. Subscriber ID (sub_…) or email address. |

Output fields:

- `id`: ID
- `email`: Email (email)
- `audience_id`: Audience ID
- `contact_id`: Contact ID
- `deleted`: Deleted (boolean)
- `alreadyRemoved`: Already Removed (boolean)

### `remove_subscriber_by_id`

**Remove Subscriber (by ID).** Removes one subscriber (by sub_… ID or email) from an Emailit audience; the contact and its other audiences are kept, and no opt-out is recorded (for opt-outs use Update Subscriber with Subscribed off instead). If nothing matches, returns alreadyRemoved=true instead of failing. Needs a Full Access key. Get the audience ID from List Audiences first. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience` | string | yes |  | Audience. The audience ID (aud_…) or its exact name. Use List Audiences to find it. |
| `subscriber` | string | yes |  | Subscriber. Subscriber ID (sub_…) or email address. |

Output fields:

- `id`: ID
- `email`: Email (email)
- `audience_id`: Audience ID
- `contact_id`: Contact ID
- `deleted`: Deleted (boolean)
- `alreadyRemoved`: Already Removed (boolean)

### `find_contact`

**Find Contact.** Looks up one Emailit contact by email address or contact ID (con_…) and returns {found, contact} with names, custom fields, unsubscribed flag and audience memberships. found=false when no contact matches. Read-only; needs a Full Access key. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Email or Contact ID. |

Output fields:

- `found`: Found (boolean)
- `contact`: Contact
- `contact.id`: Contact ID
- `contact.email`: Email (email)
- `contact.first_name`: First Name
- `contact.last_name`: Last Name
- `contact.custom_fields`: Custom Fields (an object whose keys vary)
- `contact.unsubscribed`: Unsubscribed (boolean)
- `contact.audiences`: Audiences
- `contact.audiences[].id`: Audience ID
- `contact.audiences[].name`: Audience Name
- `contact.audiences[].subscribed`: Subscribed (list view) (boolean)
- `contact.audiences[].subscriber`: Membership
- `contact.audiences[].subscriber.id`: Subscriber ID
- `contact.audiences[].subscriber.subscribed`: Subscribed (boolean)
- `contact.audiences[].subscriber.subscribed_at`: Subscribed At (datetime)
- `contact.audiences[].subscriber.unsubscribed_at`: Unsubscribed At (datetime)
- `contact.created_at`: Created At (datetime)
- `contact.updated_at`: Updated At (datetime)

### `create_or_update_contact`

**Create or Update Contact.** Upserts an Emailit contact by email address: creates it (optionally subscribed to audiences) or updates names, custom fields (which replace all existing custom fields when given) and the campaign unsubscribed flag. On update, audiences given are added; existing memberships are kept. Returns the contact (id = con_…) with created=true/false. Running it again with the same input leaves the same contact. Use Find Contact to read it later. Needs a Full Access key. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `first_name` | string | no |  | First Name. Leave empty to keep. |
| `last_name` | string | no |  | Last Name. Leave empty to keep. |
| `custom_fields` | object | no |  | Custom Fields. Replaces all custom fields of an existing contact. Leave empty to keep. |
| `audiences` | array | no |  | Add to Audiences. Audiences to subscribe the contact to. Existing memberships are kept. Values the product loads from the provider, such as ids; write an array of them. |
| `unsubscribed` | string | no | `"keep"` | Unsubscribed from Campaigns. One of `"keep"`, `"yes"`, `"no"`. |

Output fields:

- `id`: Contact ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `custom_fields`: Custom Fields (an object whose keys vary)
- `unsubscribed`: Unsubscribed (boolean)
- `audiences`: Audiences
- `audiences[].id`: Audience ID
- `audiences[].name`: Audience Name
- `audiences[].subscribed`: Subscribed (list view) (boolean)
- `audiences[].subscriber`: Membership
- `audiences[].subscriber.id`: Subscriber ID
- `audiences[].subscriber.subscribed`: Subscribed (boolean)
- `audiences[].subscriber.subscribed_at`: Subscribed At (datetime)
- `audiences[].subscriber.unsubscribed_at`: Unsubscribed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `created`: Created (boolean)

### `create_or_update_contact_by_id`

**Create or Update Contact (by Audience ID).** Upserts an Emailit contact by email address: creates it (optionally subscribed to audiences) or updates names, custom fields (which replace all existing custom fields when given) and the campaign unsubscribed flag. On update, audiences given are added; existing memberships are kept. Returns the contact (id = con_…) with created=true/false. Running it again with the same input leaves the same contact. Use Find Contact to read it later. Needs a Full Access key. Audience IDs (aud_…) come from List Audiences. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `first_name` | string | no |  | First Name. Leave empty to keep. |
| `last_name` | string | no |  | Last Name. Leave empty to keep. |
| `custom_fields` | object | no |  | Custom Fields. Replaces all custom fields of an existing contact. Leave empty to keep. |
| `audiences` | array | no |  | Add to Audiences. Audience IDs (aud_…) to subscribe the contact to. |
| `unsubscribed` | string | no | `"keep"` | Unsubscribed from Campaigns. One of `"keep"`, `"yes"`, `"no"`. |

Output fields:

- `id`: Contact ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `custom_fields`: Custom Fields (an object whose keys vary)
- `unsubscribed`: Unsubscribed (boolean)
- `audiences`: Audiences
- `audiences[].id`: Audience ID
- `audiences[].name`: Audience Name
- `audiences[].subscribed`: Subscribed (list view) (boolean)
- `audiences[].subscriber`: Membership
- `audiences[].subscriber.id`: Subscriber ID
- `audiences[].subscriber.subscribed`: Subscribed (boolean)
- `audiences[].subscriber.subscribed_at`: Subscribed At (datetime)
- `audiences[].subscriber.unsubscribed_at`: Unsubscribed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `created`: Created (boolean)

### `add_suppression`

**Suppress Email Address.** Adds an address to the Emailit suppression list so API/SMTP sends to it get status suppressed instead of being delivered (type recipient) and campaigns skip it, permanently or until keep_until. If the address already has a suppression of this type, returns it with alreadySuppressed=true. Needs a Full Access key. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `type` | string | no | `"recipient"` | Type. Only "recipient" blocks API and SMTP sends; campaigns skip every type. One of `"recipient"`, `"bounce"`, `"complaint"`, `"unsubscribe"`. |
| `reason` | string | no |  | Reason. Free-text note, e.g. "Asked to stop receiving invoices". |
| `keep_until` | ISO date-time string | no |  | Keep Until. Optional expiry. Leave empty for a permanent suppression. |

Output fields:

- `id`: Suppression ID
- `email`: Email (email)
- `type`: Type
- `reason`: Reason
- `keep_until`: Keep Until (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `alreadySuppressed`: Already Suppressed (boolean)

### `remove_suppression`

**Remove Suppression.** Deletes one Emailit suppression by suppression ID (sup_…) or email address so the address can receive email again. An address with several suppression types needs one call per type (use the ID to target one). If nothing matches, returns alreadyRemoved=true instead of failing. Needs a Full Access key. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `suppression` | string | yes |  | Suppression ID or Email. |

Output fields:

- `id`: ID
- `email`: Email (email)
- `audience_id`: Audience ID
- `contact_id`: Contact ID
- `deleted`: Deleted (boolean)
- `alreadyRemoved`: Already Removed (boolean)

### `verify_email_address`

**Verify Email Address.** Checks one email address with Emailit and returns result (safe, invalid, disposable, disabled, inbox_full, role, unknown), risk, a 0-100 score, individual checks and a did_you_mean typo suggestion. Fast mode checks syntax, domain and MX; full mode also asks the mailbox server. Each call is charged 5 credits, even for invalid input. Needs a Full Access key. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `mode` | string | no | `"fast"` | Mode. One of `"fast"`, `"full"`. |

Output fields:

- `id`: Verification ID
- `email`: Email (email)
- `status`: Status
- `result`: Result
- `risk`: Risk
- `score`: Score (number)
- `mode`: Mode
- `did_you_mean`: Did You Mean
- `address`: Address Parts
- `address.mailbox`: Mailbox
- `address.domain`: Domain
- `address.suffix`: Plus Suffix
- `address.root`: Root Address (email)
- `mx_records`: MX Records
- `mx_records[].priority`: Priority (number)
- `mx_records[].exchange`: Mail Server
- `created_at`: Checked At (datetime)
- `checks`: Checks
- `checks.valid_syntax`: Valid Syntax (boolean)
- `checks.disposable`: Disposable (boolean)
- `checks.role_account`: Role Account (boolean)
- `checks.free_email`: Free Email (boolean)
- `checks.gibberish`: Gibberish (boolean)
- `checks.has_mx_records`: Has MX Records (boolean)
- `checks.domain_age`: Domain Age (days) (number)
- `checks.smtp_connect`: SMTP Connect (boolean)
- `checks.deliverable`: Deliverable (boolean)
- `checks.disabled`: Disabled (boolean)
- `checks.inbox_full`: Inbox Full (boolean)
- `checks.catch_all`: Catch-All (boolean)

### `list_templates`

**List Templates.** Lists the published version of each Emailit template (id, name, alias, subject, editor), newest first, one page at a time {items, count, page, hasMore, totalRecords}. Pass a template's alias or id as Template when sending. Content is not included. Read-only; needs a Full Access key. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name Contains. Part of the template name or alias. |
| `limit` | number | no |  | Limit. Results per page, 1-100. Defaults to 25. |
| `page` | number | no |  | Page. Page to return, starting at 1. Use it when the previous result had Has More Pages = true. |

Output fields:

- `items`: Items
- `items[].id`: Template ID
- `items[].name`: Name
- `items[].alias`: Alias
- `items[].subject`: Subject
- `items[].from`: From
- `items[].reply_to`: Reply-To
- `items[].editor`: Editor
- `items[].total_versions`: Versions (number)
- `items[].published_at`: Published At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count on This Page (number)
- `page`: Page (number)
- `hasMore`: Has More Pages (boolean)
- `totalRecords`: Total Records (number)

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
