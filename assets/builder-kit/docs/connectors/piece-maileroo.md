# Maileroo

Email Delivery Service with Real-Time Analytics and Reporting

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-maileroo'
  version: '0.3.0'
```

Categories: MARKETING, BUSINESS_INTELLIGENCE, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> For Sending API key, follow these steps:
> 1. Navigate to [Domains](https://app.maileroo.com/domains).
> 2. Click on the domain you want to use.
> 3. Click on the **Create sending key** under the API section.
> 4. Click **New Sending Key**.
> 5. Copy the key under the **Sending Key** column.
>
> For Account API key (used by the actions that manage domains, templates, suppressions, logs and statistics), create a key with the scopes you need in your Maileroo account settings.
>
> For Verification API key, follow these steps:
> 1. Navigate to [Verification API](https://app.maileroo.com/verifications).
> 2. Copy the key under the **Verification API** section.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyType` | string | yes | `"sending"` | Type. One of `"sending"`, `"verification"`, `"account"`. |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `sendEmail`

**Send Email.** Sends a custom email through Maileroo with inline subject and body content (plain text or HTML), optionally with CC/BCC, reply-to, file attachments, and open/click tracking. Choose this to compose and deliver a one-off message; use the template action instead when the body comes from a saved Maileroo template. The sender address must belong to a verified domain, and the content type prop must match whether the content is plain or HTML. Not idempotent: each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From Email. Sender email address. Must be from a verified domain. |
| `from_name` | string | no |  | From Name. Sender display name. |
| `to` | array | yes |  | To. Recipient email addresses. |
| `subject` | string | yes |  | Subject. Email subject (max 255 characters). |
| `cc` | array | no |  | CC. Carbon copy recipients. |
| `bcc` | array | no |  | BCC. Blind carbon copy recipients. |
| `reply_to` | string | no |  | Reply To. Email address to receive replies. |
| `content_type` | string | yes | `"text"` | Content Type. One of `"text"`, `"html"`. |
| `content` | string | yes |  | Content. HTML is only allowed if you selected HTML as type. |
| `attachments` | array | no |  | Attachments. Each item: { `file` }. |
| `tracking` | boolean | no |  | Enable Tracking. Enable open and click tracking. Defaults to account settings if not specified. |

### `sendFromTemplate`

**Send Email using Template.** Sends an email through Maileroo whose body is rendered from a saved template, passing key-value template data to fill its {{ variable }} placeholders (subject also supports these). Choose this over the plain send action when the message content lives in a Maileroo template; supports CC/BCC, reply-to, attachments, and tracking. Requires a numeric template_id from the Templates dashboard, and the sender address must be on a verified domain. Not idempotent: each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From Email. Sender email address. Must be from a verified domain. |
| `from_name` | string | no |  | From Name. Sender display name. |
| `to` | array | yes |  | To. Recipient email addresses. |
| `subject` | string | yes |  | Subject. Email subject (max 255 characters). Supports template variables using {{ variable_name }} syntax. |
| `template_id` | number | yes |  | Template ID. The ID of the template to use (found in the Templates dashboard). |
| `template_data` | object | no |  | Template Data. Key-value pairs to fill template variables. The string {{ name }} in the template will be replaced with the value of "name". |
| `cc` | array | no |  | CC. Carbon copy recipients. |
| `bcc` | array | no |  | BCC. Blind carbon copy recipients. |
| `reply_to` | string | no |  | Reply To. Email address to receive replies. |
| `attachments` | array | no |  | Attachments. Each item: { `file` }. |
| `tracking` | boolean | no |  | Enable Tracking. Enable open and click tracking. Defaults to account settings if not specified. |

Output fields:

- `data`: Data
- `data.reference_id`: Reference ID
- `message`: Message
- `success`: Success (boolean)

### `verifyEmail`

**Verify Email.** Checks the validity and deliverability of a single email address via Maileroo verification service. Use it to validate an address before sending or to clean a contact list. Takes one email string as input; it is a read-only lookup that sends no mail, so repeating the call with the same address is safe and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Email. Email to verify. |

### `maileroo_create_domain`

**Create Domain.** Adds a domain to the account and returns the DNS records to configure. Use type custom with domain_name, or type free with sub_domain. Not idempotent: adding the same domain twice fails or duplicates. Requires an Account Key connection. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Type. Custom domain or free sub-domain. One of `"custom"`, `"free"`. |
| `domain_name` | string | no |  | Domain Name. Required for type custom, for example example.com. |
| `sub_domain` | string | no |  | Sub-domain. Required for type free. |

Output fields:

- `id`: ID (number)
- `user_id`: User ID (number)
- `domain_name`: Domain Name
- `dns_records`: DNS Records
- `dns_records.dkim_record`: DKIM Record
- `dns_records.dkim_record.host`: Host
- `dns_records.dkim_record.record`: Record
- `dns_records.dkim_record.cname_fallback`: CNAME Fallback
- `dns_records.dkim_record.created`: Created (boolean)
- `dns_records.spf_record`: SPF Record
- `dns_records.spf_record.host`: Host
- `dns_records.spf_record.record`: Record
- `dns_records.spf_record.created`: Created (boolean)
- `dns_records.dmarc_record`: DMARC Record
- `dns_records.dmarc_record.host`: Host
- `dns_records.dmarc_record.record`: Record
- `dns_records.dmarc_record.created`: Created (boolean)
- `dns_records.mx_record`: MX Record
- `dns_records.mx_record[].host`: Host
- `dns_records.mx_record[].record`: Record
- `dns_records.mx_record[].priority`: Priority (number)
- `dns_records.mx_record[].created`: Created (boolean)
- `dns_records.tracking_record`: Tracking Record
- `dns_records.tracking_record.host`: Host
- `dns_records.tracking_record.record`: Record
- `dns_records.tracking_record.created`: Created (boolean)
- `sandbox`: Sandbox (boolean)
- `free`: Free (boolean)
- `interaction_tracking`: Interaction Tracking (boolean)
- `custom_hostname_tracking`: Custom Hostname Tracking (boolean)
- `return_path`: Return Path
- `status`: Status (boolean)
- `statistics`: Statistics
- `statistics.delivered`: Delivered (number)
- `statistics.bounced`: Bounced (number)
- `statistics.opened`: Opened (number)
- `statistics.clicked`: Clicked (number)

### `maileroo_create_inbound_route`

**Create Inbound Route.** Creates a rule that forwards mail received on a domain to email addresses or callback URLs. Match recipient needs Recipient, Match header needs Header Name and Header Content, Custom expression needs Custom Expression. Not idempotent: each call creates another route. Requires an Account Key connection. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |
| `description` | string | yes |  | Description. 3 to 255 characters. |
| `expression_type` | string | yes |  | Match Type. How the route matches incoming mail. One of `"catch_all"`, `"match_recipient"`, `"match_header"`, `"custom"`. |
| `forward_list` | array | yes |  | Forward To. Email addresses and/or callback URLs to forward matched mail to. |
| `priority` | number | yes |  | Priority. 1 (highest) to 100 (lowest). |
| `recipient` | string | no |  | Recipient. Required for Match recipient. |
| `header_name` | string | no |  | Header Name. Required for Match header. |
| `header_content` | string | no |  | Header Content. Required for Match header. |
| `custom_expression` | string | no |  | Custom Expression. Required for Custom expression. |
| `regex_enabled` | string | no |  | Regex. Treat the expression content as a regular expression. One of `"true"`, `"false"`. |
| `dmarc_alignment` | string | no |  | Require DMARC Alignment. One of `"true"`, `"false"`. |
| `require_spf` | string | no |  | Require SPF Pass. One of `"true"`, `"false"`. |
| `require_dkim` | string | no |  | Require DKIM Pass. One of `"true"`, `"false"`. |
| `skip_spam_check` | string | no |  | Skip Spam Check. One of `"true"`, `"false"`. |
| `stop` | string | no |  | Stop Processing. Stop evaluating further routes when matched. One of `"true"`, `"false"`. |

Output fields:

- `id`: ID
- `user_id`: User ID (number)
- `domain_id`: Domain ID (number)
- `domain_name`: Domain Name
- `description`: Description
- `expression_type`: Expression Type
- `header_name`: Header Name
- `header_content`: Header Content
- `recipient`: Recipient (email)
- `custom_expression`: Custom Expression
- `regex_enabled`: Regex Enabled (boolean)
- `forward_list`: Forward List
- `dmarc_alignment`: DMARC Alignment (boolean)
- `require_spf`: Require SPF (boolean)
- `require_dkim`: Require DKIM (boolean)
- `skip_spam_check`: Skip Spam Check (boolean)
- `stop`: Stop (boolean)
- `priority`: Priority (number)
- `created_at`: Created At (datetime)

### `maileroo_create_suppression`

**Add Suppression.** Blocks an address so no email is delivered to it until it is removed with maileroo_delete_suppression. Adding an address already suppressed leaves it suppressed. Requires an Account Key connection. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_address` | string | yes |  | Email Address. Address to suppress. |
| `reason` | string | no |  | Reason. Optional note on why it was suppressed. |

Output fields:

- `id`: ID (number)
- `email_address`: Email Address (email)
- `reason`: Reason

### `maileroo_create_template`

**Create Template.** Creates a template: type html needs a complete HTML document (starting with <!DOCTYPE html> and including <html> and <body>; a fragment is rejected), type url needs URL, type zip needs a base64 zip. Returns the new template; use its ID with the send actions. Not idempotent: each call creates another template. Requires an Account Key connection. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Template name, 1 to 128 characters. |
| `type` | string | yes |  | Type. Where the content comes from. One of `"html"`, `"url"`, `"zip"`. |
| `html` | string | no |  | HTML. Required for type html. |
| `url` | string | no |  | URL. Required for type url. |
| `zip_base64` | string | no |  | Zip (base64). Required for type zip. |

Output fields:

- `id`: ID (number)
- `type`: Type
- `template_name`: Template Name
- `preview_image`: Preview Image
- `preview_url`: Preview URL
- `processed`: Processed (number)

### `maileroo_delete_domain`

**Delete Domain.** Permanently deletes a domain and cannot be undone; sending from it stops. Get the domain_id from maileroo_list_domains. Hard delete: there is no recoverable variant. Requires an Account Key connection. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |

Output fields:

- `success`: Success (boolean)

### `maileroo_delete_inbound_route`

**Delete Inbound Route.** Permanently deletes an inbound route of a domain; mail it matched is no longer forwarded. Get the route ID from maileroo_list_inbound_routes. Hard delete. Requires an Account Key connection. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |
| `route_id` | string | yes |  | Route ID. Route ID from maileroo_list_inbound_routes. |

Output fields:

- `success`: Success (boolean)

### `maileroo_delete_scheduled_email`

**Delete Scheduled Email.** Cancels an email that has not been delivered yet, permanently. Get the reference ID from maileroo_send_email (when scheduled) or maileroo_list_scheduled_emails. Requires a Sending Key connection. Hard delete: the email cannot be restored. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reference_id` | string | yes |  | Reference ID. Reference ID of the scheduled email. |

Output fields:

- `success`: Success (boolean)
- `message`: Message

### `maileroo_delete_suppression`

**Delete Suppression.** Removes a suppression so the address can receive email again. Pass either the numeric suppression ID from maileroo_list_suppressions or the email address itself. Requires an Account Key connection. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Suppression ID or Email. Numeric suppression ID or the suppressed email address. |

Output fields:

- `success`: Success (boolean)

### `maileroo_delete_template`

**Delete Template.** Permanently deletes a template; sends that reference it will fail. Get the template ID from maileroo_list_templates. Hard delete. Requires an Account Key connection. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | number | yes |  | Template ID. Template ID from maileroo_list_templates. |

Output fields:

- `success`: Success (boolean)

### `maileroo_get_domain_analytics`

**Get Domain Analytics.** Returns aggregate delivered, bounced, opens, clicks and suppressions for one domain, a daily timeline and the top receiving providers. Get the domain_id from maileroo_list_domains. Requires an Account Key connection. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |

Output fields:

- `aggregate`: Aggregate
- `aggregate.delivered`: Delivered (number)
- `aggregate.bounced`: Bounced (number)
- `aggregate.opens`: Opens (number)
- `aggregate.clicks`: Clicks (number)
- `aggregate.suppressions`: Suppressions (number)
- `timeline`: Timeline
- `timeline[].date`: Date (date)
- `timeline[].totals`: Totals
- `timeline[].totals.delivered`: Delivered (number)
- `timeline[].totals.bounced`: Bounced (number)
- `timeline[].totals.opens`: Opens (number)
- `timeline[].totals.clicks`: Clicks (number)
- `timeline[].totals.suppressions`: Suppressions (number)
- `service_providers`: Service Providers
- `service_providers[].name`: Name
- `service_providers[].count`: Count (number)

### `maileroo_get_domain`

**Get Domain.** Returns one domain with the DKIM, SPF, DMARC, MX and tracking DNS records to configure, verification status, tracking settings and sending statistics. Get the domain_id from maileroo_list_domains. Requires an Account Key connection. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |

Output fields:

- `id`: ID (number)
- `user_id`: User ID (number)
- `domain_name`: Domain Name
- `dns_records`: DNS Records
- `dns_records.dkim_record`: DKIM Record
- `dns_records.dkim_record.host`: Host
- `dns_records.dkim_record.record`: Record
- `dns_records.dkim_record.cname_fallback`: CNAME Fallback
- `dns_records.dkim_record.created`: Created (boolean)
- `dns_records.spf_record`: SPF Record
- `dns_records.spf_record.host`: Host
- `dns_records.spf_record.record`: Record
- `dns_records.spf_record.created`: Created (boolean)
- `dns_records.dmarc_record`: DMARC Record
- `dns_records.dmarc_record.host`: Host
- `dns_records.dmarc_record.record`: Record
- `dns_records.dmarc_record.created`: Created (boolean)
- `dns_records.mx_record`: MX Record
- `dns_records.mx_record[].host`: Host
- `dns_records.mx_record[].record`: Record
- `dns_records.mx_record[].priority`: Priority (number)
- `dns_records.mx_record[].created`: Created (boolean)
- `dns_records.tracking_record`: Tracking Record
- `dns_records.tracking_record.host`: Host
- `dns_records.tracking_record.record`: Record
- `dns_records.tracking_record.created`: Created (boolean)
- `sandbox`: Sandbox (boolean)
- `free`: Free (boolean)
- `interaction_tracking`: Interaction Tracking (boolean)
- `custom_hostname_tracking`: Custom Hostname Tracking (boolean)
- `return_path`: Return Path
- `status`: Status (boolean)
- `statistics`: Statistics
- `statistics.delivered`: Delivered (number)
- `statistics.bounced`: Bounced (number)
- `statistics.opened`: Opened (number)
- `statistics.clicked`: Clicked (number)

### `maileroo_get_email_log`

**Get Email Log.** Returns the sender, recipients, collection time and the raw RFC822 source of a stored email. Get the message ID from maileroo_search_email_logs; use maileroo_render_email_log for a browser-viewable URL instead. Requires an Account Key connection. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. Message ID from maileroo_search_email_logs. |

Output fields:

- `from`: From (email)
- `to`: To
- `raw_email`: Raw Email
- `collected_on`: Collected On (datetime)

### `maileroo_get_inbound_route`

**Get Inbound Route.** Returns a single inbound route of a domain. Get the route ID from maileroo_list_inbound_routes. Requires an Account Key connection. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |
| `route_id` | string | yes |  | Route ID. Route ID from maileroo_list_inbound_routes. |

Output fields:

- `id`: ID
- `user_id`: User ID (number)
- `domain_id`: Domain ID (number)
- `domain_name`: Domain Name
- `description`: Description
- `expression_type`: Expression Type
- `header_name`: Header Name
- `header_content`: Header Content
- `recipient`: Recipient (email)
- `custom_expression`: Custom Expression
- `regex_enabled`: Regex Enabled (boolean)
- `forward_list`: Forward List
- `dmarc_alignment`: DMARC Alignment (boolean)
- `require_spf`: Require SPF (boolean)
- `require_dkim`: Require DKIM (boolean)
- `skip_spam_check`: Skip Spam Check (boolean)
- `stop`: Stop (boolean)
- `priority`: Priority (number)
- `created_at`: Created At (datetime)

### `maileroo_get_statistics_summary`

**Get Statistics Summary.** Returns this calendar month's delivered, bounced, opens, clicks and suppression totals plus per-country open and click counts for the whole account. Use maileroo_get_statistics_timeline for a day-by-day view or maileroo_get_domain_analytics for one domain. Requires an Account Key connection. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `aggregate`: Aggregate
- `aggregate.delivered`: Delivered (number)
- `aggregate.bounced`: Bounced (number)
- `aggregate.opens`: Opens (number)
- `aggregate.clicks`: Clicks (number)
- `aggregate.suppressions`: Suppressions (number)
- `country_data`: Country Data

### `maileroo_get_statistics_timeline`

**Get Statistics Timeline.** Returns one entry per day for the last month with delivered, bounced, opens, clicks and suppressions plus per-country open and click data. Use maileroo_get_statistics_summary for monthly totals only. Requires an Account Key connection. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `[].date`: Date (date)
- `[].summary`: Summary
- `[].summary.aggregate`: Aggregate
- `[].summary.aggregate.delivered`: Delivered (number)
- `[].summary.aggregate.bounced`: Bounced (number)
- `[].summary.aggregate.opens`: Opens (number)
- `[].summary.aggregate.clicks`: Clicks (number)
- `[].summary.aggregate.suppressions`: Suppressions (number)
- `[].summary.country_data`: Country Data

### `maileroo_get_template`

**Get Template.** Returns one template including its HTML and plain-text content. Get the template ID from maileroo_list_templates. Requires an Account Key connection. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | number | yes |  | Template ID. Template ID from maileroo_list_templates. |

Output fields:

- `id`: ID (number)
- `type`: Type
- `template_name`: Template Name
- `preview_image`: Preview Image
- `preview_url`: Preview URL
- `processed`: Processed (number)
- `html`: HTML
- `plaintext`: Plaintext

### `maileroo_list_domains`

**List Domains.** Lists domains with their ID, name, DNS verification status and delivered, bounced, opened and clicked counts; this is the source of the domain_id used by every domain action. Supports search by name, sorting and paging. Requires an Account Key connection. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Filter domains by name. |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `per_page` | number | no |  | Per Page. Items per page (10 to 100). |
| `sort_by` | string | no |  | Sort By. Field to sort by. One of `"id"`, `"domain_name"`, `"delivered"`, `"bounced"`, `"opened"`, `"clicked"`. |
| `sort_dir` | string | no |  | Sort Direction. Sort direction. One of `"asc"`, `"desc"`. |

Output fields:

- `domains`: Domains
- `domains[].id`: ID (number)
- `domains[].domain_name`: Domain Name
- `domains[].statistics`: Statistics
- `domains[].statistics.delivered`: Delivered (number)
- `domains[].statistics.bounced`: Bounced (number)
- `domains[].statistics.opened`: Opened (number)
- `domains[].statistics.clicked`: Clicked (number)
- `domains[].status`: Status (boolean)
- `total`: Total (number)
- `page`: Page (number)
- `per_page`: Per Page (number)
- `total_pages`: Total Pages (number)

### `maileroo_list_inbound_routes`

**List Inbound Routes.** Lists the inbound routing rules of a domain sorted by priority, 10 per page, with their match type, forward targets and flags. Supports a text search over description, recipient, header and expression. Get the domain_id from maileroo_list_domains. Requires an Account Key connection. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |
| `search` | string | no |  | Search. Matches description, recipient, header or expression. |
| `page` | number | no |  | Page. Page number, starting at 1. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].user_id`: User ID (number)
- `items[].domain_id`: Domain ID (number)
- `items[].domain_name`: Domain Name
- `items[].description`: Description
- `items[].expression_type`: Expression Type
- `items[].header_name`: Header Name
- `items[].header_content`: Header Content
- `items[].recipient`: Recipient (email)
- `items[].custom_expression`: Custom Expression
- `items[].regex_enabled`: Regex Enabled (boolean)
- `items[].forward_list`: Forward List
- `items[].dmarc_alignment`: DMARC Alignment (boolean)
- `items[].require_spf`: Require SPF (boolean)
- `items[].require_dkim`: Require DKIM (boolean)
- `items[].skip_spam_check`: Skip Spam Check (boolean)
- `items[].stop`: Stop (boolean)
- `items[].priority`: Priority (number)
- `items[].created_at`: Created At (datetime)
- `page`: Page (number)
- `total_pages`: Total Pages (number)

### `maileroo_list_scheduled_emails`

**List Scheduled Emails.** Lists emails still waiting to be delivered with their reference ID, sender, recipients, subject, tags and scheduled time. Use the reference ID with maileroo_delete_scheduled_email to cancel one. Domain is optional for domain-scoped sending keys but required for application-scoped keys. Requires a Sending Key connection. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Domain the emails were scheduled from, for example example.com. |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `per_page` | number | no |  | Per Page. Results per page, at most 100. |

Output fields:

- `page`: Page (number)
- `per_page`: Per Page (number)
- `results`: Results
- `results[].from`: From
- `results[].recipients`: Recipients
- `results[].reference_id`: Reference ID
- `results[].scheduled_at`: Scheduled At (datetime)
- `results[].subject`: Subject
- `results[].tags`: Tags
- `total_count`: Total Count (number)
- `total_pages`: Total Pages (number)

### `maileroo_list_suppressions`

**List Suppressions.** Lists addresses that Maileroo will not send to, with ID and reason, searchable by address and paged. Use before a send to check whether a recipient is blocked. Requires an Account Key connection. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Filter by email address. |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `per_page` | number | no |  | Per Page. Items per page (10 to 100). |

Output fields:

- `suppressions`: Suppressions
- `suppressions[].id`: ID (number)
- `suppressions[].email_address`: Email Address (email)
- `suppressions[].reason`: Reason
- `total`: Total (number)
- `page`: Page (number)
- `per_page`: Per Page (number)
- `total_pages`: Total Pages (number)

### `maileroo_list_templates`

**List Templates.** Lists the account's email templates with ID, name, type and preview URL, optionally filtered by name. The template ID is used by maileroo_send_bulk_emails and the template send action. Requires an Account Key connection. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Filter by template name. |

Output fields:

- `[].id`: ID (number)
- `[].type`: Type
- `[].template_name`: Template Name
- `[].preview_image`: Preview Image
- `[].preview_url`: Preview URL
- `[].processed`: Processed (number)

### `maileroo_rename_template`

**Rename Template.** Changes only the template name; the content is untouched. Get the template ID from maileroo_list_templates. Requires an Account Key connection. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | number | yes |  | Template ID. Template ID from maileroo_list_templates. |
| `template_name` | string | yes |  | New Name. 1 to 128 characters. |

Output fields:

- `success`: Success (boolean)

### `maileroo_render_email_log`

**Render Email Log.** Returns a URL that shows the rendered stored email in a browser. Get the message ID from maileroo_search_email_logs. Requires an Account Key connection. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. Message ID from maileroo_search_email_logs. |

Output fields:

- `url`: URL (url)

### `maileroo_resend_email`

**Resend Email.** Re-sends a stored message as-is under a new reference ID, which is returned. Delivers real mail to the original recipients again, so confirm intent first. Get the message ID from maileroo_search_email_logs. Not idempotent: each call queues another delivery. Requires an Account Key connection. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. Message ID from maileroo_search_email_logs. |

Output fields:

- `reference_id`: Reference ID

### `maileroo_search_domain_email_logs`

**Search Domain Email Logs.** Same as maileroo_search_email_logs but limited to a single domain; use it when the domain is known. Each hit carries a message ID usable with maileroo_get_email_log and maileroo_render_email_log. Requires an Account Key connection. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |
| `message_id` | string | no |  | Message ID. Match a specific message ID. |
| `reference_id` | string | no |  | Reference ID. Match a reference ID returned by a send action. |
| `subject` | string | no |  | Subject. Match the subject. |
| `sender` | string | no |  | Sender. Match the sender address. |
| `recipient` | string | no |  | Recipient. Match the recipient address. |
| `log_type` | string | no |  | Event Type. Filter by event type. One of `"Delivered"`, `"Deferred"`, `"Suppressed"`, `"Bounced"`, `"Complained"`. |
| `sort_dir` | string | no |  | Sort Order. Newest first by default. One of `"-1"`, `"1"`. |
| `datetime_from` | number | no |  | From (Unix Timestamp). Only events at or after this Unix timestamp. |
| `datetime_to` | number | no |  | To (Unix Timestamp). Only events at or before this Unix timestamp. |
| `page` | number | no |  | Page. Page number, starting at 1. |

Output fields:

- `items`: Items
- `items[].message_id`: Message ID
- `items[].reference_id`: Reference ID
- `items[].instance_id`: Instance ID (number)
- `items[].ip_address`: IP Address
- `items[].application_id`: Application ID (number)
- `items[].subject`: Subject
- `items[].sender`: Sender (email)
- `items[].recipients`: Recipients
- `items[].tags`: Tags
- `items[].tags[].name`: Name
- `items[].tags[].value`: Value
- `items[].events`: Events
- `items[].events[].event_type`: Event Type
- `items[].events[].timestamp`: Timestamp (number)
- `items[].events[].message`: Message
- `items[].events[].data`: Data
- `items[].events[].data.recipient`: Recipient (email)
- `items[].datetime`: Datetime (datetime)
- `page`: Page (number)
- `has_more`: Has More (boolean)

### `maileroo_search_email_logs`

**Search Email Logs.** Searches delivery events (delivered, deferred, suppressed, bounced, complained) across every domain by message ID, reference ID, subject, sender, recipient, type or time range. Each hit carries a message ID usable with maileroo_get_email_log, maileroo_render_email_log and maileroo_resend_email. Use maileroo_search_domain_email_logs to limit to one domain. Requires an Account Key connection. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | no |  | Message ID. Match a specific message ID. |
| `reference_id` | string | no |  | Reference ID. Match a reference ID returned by a send action. |
| `subject` | string | no |  | Subject. Match the subject. |
| `sender` | string | no |  | Sender. Match the sender address. |
| `recipient` | string | no |  | Recipient. Match the recipient address. |
| `log_type` | string | no |  | Event Type. Filter by event type. One of `"Delivered"`, `"Deferred"`, `"Suppressed"`, `"Bounced"`, `"Complained"`. |
| `sort_dir` | string | no |  | Sort Order. Newest first by default. One of `"-1"`, `"1"`. |
| `datetime_from` | number | no |  | From (Unix Timestamp). Only events at or after this Unix timestamp. |
| `datetime_to` | number | no |  | To (Unix Timestamp). Only events at or before this Unix timestamp. |
| `page` | number | no |  | Page. Page number, starting at 1. |

Output fields:

- `items`: Items
- `items[].message_id`: Message ID
- `items[].reference_id`: Reference ID
- `items[].instance_id`: Instance ID (number)
- `items[].ip_address`: IP Address
- `items[].application_id`: Application ID (number)
- `items[].subject`: Subject
- `items[].sender`: Sender (email)
- `items[].recipients`: Recipients
- `items[].tags`: Tags
- `items[].tags[].name`: Name
- `items[].tags[].value`: Value
- `items[].events`: Events
- `items[].events[].event_type`: Event Type
- `items[].events[].timestamp`: Timestamp (number)
- `items[].events[].message`: Message
- `items[].events[].data`: Data
- `items[].events[].data.recipient`: Recipient (email)
- `items[].datetime`: Datetime (datetime)
- `page`: Page (number)
- `has_more`: Has More (boolean)

### `maileroo_send_bulk_emails`

**Send Bulk Emails.** Sends many emails in one call, each with its own recipients and template_data, sharing one subject and body (HTML, plain text or a template ID). Messages is a JSON array of up to 500 objects like {"from":{"address":"a@x.com","display_name":"A"},"to":[{"address":"b@y.com"}],"template_data":{"first_name":"B"}}; Subject and body support {{ variable }} placeholders. Returns one reference ID per message. Use maileroo_send_email for a single email. Requires a Sending Key connection. Not idempotent: each call sends every message again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. Shared subject, at most 255 characters. Supports {{ variable }} placeholders. |
| `messages` | JSON | yes |  | Messages. JSON array of up to 500 message objects with from, to, optional cc, bcc, reply_to, reference_id and template_data. |
| `template_id` | number | no |  | Template ID. Saved template ID from maileroo_list_templates. Use this or HTML/Plain Text. |
| `html` | string | no |  | HTML Body. Shared HTML body with {{ variable }} placeholders. |
| `plain` | string | no |  | Plain Text Body. Shared plain text body with {{ variable }} placeholders. |
| `tracking` | string | no |  | Open/Click Tracking. Leave unset to use the account setting. One of `"true"`, `"false"`. |
| `tags` | JSON | no |  | Tags. Key-value tags as a JSON object. |
| `headers` | JSON | no |  | Custom Headers. Custom headers as a JSON object. |

Output fields:

- `message`: Message
- `reference_ids`: Reference IDs

### `maileroo_send_email`

**Send Email.** Sends one email, or schedules it with Scheduled At, and returns its reference ID. Supports HTML and plain text, CC, BCC, reply-to, tags, custom headers and tracking. Use maileroo_send_bulk_emails for many personalized recipients. The From address must be on a verified domain; needs a Sending Key connection. Cancel a scheduled send with maileroo_delete_scheduled_email. Not idempotent: each call sends a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From Email. Sender address on a verified domain. |
| `from_name` | string | no |  | From Name. Sender display name. |
| `to` | array | yes |  | To. Recipient email addresses. |
| `subject` | string | yes |  | Subject. Subject, at most 255 characters. |
| `html` | string | no |  | HTML Body. HTML content. Provide HTML, plain text, or both. |
| `plain` | string | no |  | Plain Text Body. Plain text content. Generated from the HTML when omitted. |
| `cc` | array | no |  | CC. Carbon copy addresses. |
| `bcc` | array | no |  | BCC. Blind carbon copy addresses. |
| `reply_to` | string | no |  | Reply To. Address that receives replies. |
| `tracking` | string | no |  | Open/Click Tracking. Leave unset to use the account setting. One of `"true"`, `"false"`. |
| `tags` | JSON | no |  | Tags. Key-value tags for categorizing the email, as a JSON object. |
| `headers` | JSON | no |  | Custom Headers. Custom email headers as a JSON object. |
| `scheduled_at` | string | no |  | Scheduled At. RFC 3339 timestamp such as 2026-12-01T09:00:00Z, or natural language such as "in 2 hours". |
| `reference_id` | string | no |  | Reference ID. Optional 24-character hexadecimal ID for tracking. Generated when omitted. |

Output fields:

- `message`: Message
- `reference_id`: Reference ID

### `maileroo_update_domain_settings`

**Update Domain Settings.** Changes open/click tracking, custom tracking hostname (paid plans only) and the return-path local part of a domain. Only supplied fields change; omitted ones keep their value. Get the domain_id from maileroo_list_domains. Requires an Account Key connection. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |
| `interaction_tracking` | string | no |  | Open/Click Tracking. Leave unset to keep the current value. One of `"true"`, `"false"`. |
| `custom_hostname_tracking` | string | no |  | Custom Hostname Tracking. Requires a paid plan. Leave unset to keep the current value. One of `"true"`, `"false"`. |
| `return_path` | string | no |  | Return Path. Return-path local part, at most 24 characters. |

Output fields:

- `interaction_tracking`: Interaction Tracking (boolean)
- `custom_hostname_tracking`: Custom Hostname Tracking (boolean)
- `return_path`: Return Path

### `maileroo_update_inbound_route`

**Update Inbound Route.** Changes an existing inbound route; only supplied fields change, the rest are read from the current route and re-sent because the vendor replaces the whole route. Get the route ID from maileroo_list_inbound_routes. Requires an Account Key connection. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | number | yes |  | Domain ID. Numeric domain ID. Get it from maileroo_list_domains. |
| `route_id` | string | yes |  | Route ID. Route ID from maileroo_list_inbound_routes. |
| `description` | string | no |  | Description. 3 to 255 characters. |
| `expression_type` | string | no |  | Match Type. How the route matches incoming mail. One of `"catch_all"`, `"match_recipient"`, `"match_header"`, `"custom"`. |
| `forward_list` | array | no |  | Forward To. Replaces the whole forward list. |
| `priority` | number | no |  | Priority. 1 (highest) to 100 (lowest). |
| `recipient` | string | no |  | Recipient. Required for Match recipient. |
| `header_name` | string | no |  | Header Name. Required for Match header. |
| `header_content` | string | no |  | Header Content. Required for Match header. |
| `custom_expression` | string | no |  | Custom Expression. Required for Custom expression. |
| `regex_enabled` | string | no |  | Regex. Treat the expression content as a regular expression. One of `"true"`, `"false"`. |
| `dmarc_alignment` | string | no |  | Require DMARC Alignment. One of `"true"`, `"false"`. |
| `require_spf` | string | no |  | Require SPF Pass. One of `"true"`, `"false"`. |
| `require_dkim` | string | no |  | Require DKIM Pass. One of `"true"`, `"false"`. |
| `skip_spam_check` | string | no |  | Skip Spam Check. One of `"true"`, `"false"`. |
| `stop` | string | no |  | Stop Processing. Stop evaluating further routes when matched. One of `"true"`, `"false"`. |

Output fields:

- `id`: ID
- `user_id`: User ID (number)
- `domain_id`: Domain ID (number)
- `domain_name`: Domain Name
- `description`: Description
- `expression_type`: Expression Type
- `header_name`: Header Name
- `header_content`: Header Content
- `recipient`: Recipient (email)
- `custom_expression`: Custom Expression
- `regex_enabled`: Regex Enabled (boolean)
- `forward_list`: Forward List
- `dmarc_alignment`: DMARC Alignment (boolean)
- `require_spf`: Require SPF (boolean)
- `require_dkim`: Require DKIM (boolean)
- `skip_spam_check`: Skip Spam Check (boolean)
- `stop`: Stop (boolean)
- `priority`: Priority (number)
- `created_at`: Created At (datetime)

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
