# Elastic Email

Email delivery and marketing platform for sending emails, managing contacts, campaigns, and segments.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-elastic-email'
  version: '0.3.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your Elastic Email API key:
> 1. Log in to your Elastic Email account
> 2. Navigate to **Settings → Manage API Keys**
> 3. Click **Create API Key**
> 4. Ensure the key has the required permissions (Contacts, Campaigns, Emails, Segments)
> 5. Copy the key and paste it here

## Actions

### `add_contact`

**Add Contact to Mailing List.** Adds a contact (identified by email) to one or more named mailing lists in Elastic Email, with optional name, status, custom fields, and consent details. Use when subscribing someone to specific lists rather than just creating a bare contact. Each call appends the contact, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the contact. |
| `listNames` | array | no |  | Mailing Lists. Select mailing lists. Values the product loads from the provider, such as ids; write an array of them. |
| `status` | string | no |  | Status. Initial status of the contact. One of `"Transactional"`, `"Engaged"`, `"Active"`, `"Bounced"`, `"Unsubscribed"`, `"Abuse"`, `"Inactive"`, `"Stale"`, `"NotConfirmed"`. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `customFields` | object | no |  | Custom Fields. Key-value pairs of custom contact fields. Only existing custom fields will be saved. |
| `consentIP` | string | no |  | Consent IP. IP address of consent. If not provided, your current public IP is used. |
| `consentDate` | string | no |  | Consent Date. ISO 8601 date of consent. If not provided, current date is used. |
| `consentTracking` | string | no |  | Consent Tracking. Consent tracking level. Defaults to "Unknown". One of `"Unknown"`, `"Allow"`, `"Deny"`. |

### `create_campaign`

**Create Campaign.** Creates a new email campaign in Elastic Email targeting the given mailing lists and/or segments, with sender, subject, template, and an initial status (e.g. draft or active). Use to set up a bulk campaign send; for one-off transactional messages use Send Email instead. Each call creates a separate campaign, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Campaign Name. |
| `from` | string | yes |  | From. Sender email with optional name (e.g. `email@domain.com` or `John Doe <email@domain.com>`). |
| `recipientListNames` | array | no |  | Mailing Lists. Select mailing lists. Values the product loads from the provider, such as ids; write an array of them. |
| `recipientSegmentNames` | array | no |  | Segments. Select segments. Values the product loads from the provider, such as ids; write an array of them. |
| `replyTo` | string | yes |  | Reply To. Reply-to email address. |
| `status` | string | yes |  | Status. Initial campaign status. One of `"Deleted"`, `"Active"`, `"Processing"`, `"Sending"`, `"Completed"`, `"Paused"`, `"Cancelled"`, `"Draft"`. |
| `subject` | string | no |  | Subject. Default email subject line. |
| `templateName` | string | no |  | Template. Select an email template. A value the product loads from the provider, such as an id; write the value itself. |

### `create_contact`

**Create Contact.** Creates a new contact in Elastic Email from an email address, with optional name, status, and custom fields, without attaching it to any mailing list. Use when you only need the contact to exist; use Add Contact to Mailing List when it must also join specific lists. Each call appends the contact, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the contact. |
| `status` | string | no |  | Status. Initial status of the contact. One of `"Transactional"`, `"Engaged"`, `"Active"`, `"Bounced"`, `"Unsubscribed"`, `"Abuse"`, `"Inactive"`, `"Stale"`, `"NotConfirmed"`. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `customFields` | object | no |  | Custom Fields. Key-value pairs of custom contact fields. Only existing custom fields will be saved. |

### `create_segment`

**Create Segment.** Creates a named contact segment in Elastic Email defined by a SQL-like rule that selects which contacts belong to it. Use to build a reusable audience for campaigns. The rule must follow Elastic Email segment-rule syntax. Each call creates a separate segment, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Segment Name. |
| `rule` | string | yes |  | Rule. SQL-like rule to determine which contacts belong to this segment. See https://help.elasticemail.com/en/articles/5162182-segment-rules. |

### `list_campaigns`

**List Campaigns.** Retrieves a paginated list of campaigns from Elastic Email; leave the search field empty to return all campaigns, or set it to filter by campaign name. Use to look up campaigns or find a campaign name before updating it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Filter campaigns by name. |
| `limit` | number | no | `100` | Limit. Maximum number of campaigns to return (max 100). |
| `offset` | number | no | `0` | Offset. Number of campaigns to skip. |

### `list_contacts`

**List Contacts.** Retrieves a paginated list of contacts from the Elastic Email account using limit and offset. Use to browse or page through contacts. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of contacts to return (max 100). |
| `offset` | number | no | `0` | Offset. Number of contacts to skip. |

### `send_email`

**Send Email.** Sends a transactional email to one or more recipients via Elastic Email, with either inline body content or a saved template, plus optional merge fields, tracking, and a scheduled time offset. Use for direct one-off sends; use Create Campaign for bulk list/segment marketing. Each call dispatches a new email, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipients` | array | yes |  | Recipients. List of recipient email addresses. |
| `from` | string | yes |  | From. Sender email with optional name (e.g. `email@domain.com` or `John Doe <email@domain.com>`). |
| `subject` | string | no |  | Subject. Email subject line. |
| `bodyContentType` | string | no |  | Body Content Type. Type of body content. One of `"HTML"`, `"PlainText"`, `"AMP"`, `"CSS"`. |
| `bodyContent` | string | no |  | Body Content. The actual body content of the email. |
| `replyTo` | string | no |  | Reply To. Reply-to email address. |
| `templateName` | string | no |  | Template. Select an email template. A value the product loads from the provider, such as an id; write the value itself. |
| `merge` | object | no |  | Merge Fields. Key-value merge fields shared between recipients. Use in email body like {firstname}, {lastname}. |
| `timeOffset` | number | no |  | Time Offset (minutes). Delay sending by this many minutes. Maximum is 35 days (50400 minutes). |
| `poolName` | string | no |  | Pool Name. Name of custom IP pool for sending. |
| `channelName` | string | no |  | Channel Name. Name of the sending channel. |
| `encoding` | string | no |  | Encoding. Encoding type for email headers. One of `"UserProvided"`, `"None"`, `"Raw7bit"`, `"Raw8bit"`, `"QuotedPrintable"`, `"Base64"`, `"Uue"`. |
| `trackOpens` | boolean | no |  | Track Opens. Track email opens. If not set, uses account default. |
| `trackClicks` | boolean | no |  | Track Clicks. Track link clicks. If not set, uses account default. |

### `unsubscribe_contact`

**Unsubscribe Contact.** Marks one or more email addresses as unsubscribed in Elastic Email so they no longer receive future emails. Use to honor opt-out or suppression requests. Idempotent: re-running with the same addresses leaves them unsubscribed with no additional effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `emails` | array | yes |  | Email Addresses. List of email addresses to unsubscribe. |

### `update_campaign`

**Update Campaign.** Updates an existing campaign in Elastic Email, identified by its name, merging any provided fields (name, sender, recipients, subject, template, status) with the campaign's current values so omitted fields are preserved. Use to revise a campaign before it sends. Idempotent: applying the same values yields the same campaign state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign` | string | yes |  | Campaign. Select an existing campaign by name. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Campaign Name. New name for the campaign. Leave empty to keep existing. |
| `from` | string | no |  | From. Sender email with optional name. Leave empty to keep existing. |
| `recipientListNames` | array | no |  | Mailing Lists. Select mailing lists. Values the product loads from the provider, such as ids; write an array of them. |
| `recipientSegmentNames` | array | no |  | Segments. Select segments. Values the product loads from the provider, such as ids; write an array of them. |
| `replyTo` | string | no |  | Reply To. Reply-to email address. Leave empty to keep existing. |
| `subject` | string | no |  | Subject. Email subject. Leave empty to keep existing. |
| `templateName` | string | no |  | Template. Select an email template. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. Campaign status. Leave empty to keep existing. One of `"Deleted"`, `"Active"`, `"Processing"`, `"Sending"`, `"Completed"`, `"Paused"`, `"Cancelled"`, `"Draft"`. |

### `update_contact`

**Update Contact.** Updates an existing contact in Elastic Email, identified by email address, setting first name, last name, and/or custom fields. Use to edit contact details after creation. Idempotent: applying the same values yields the same contact state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | string | yes |  | Contact Email. Select an existing contact by email address. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `customFields` | object | no |  | Custom Fields. Key-value pairs of custom contact fields. Only existing custom fields will be saved. |

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
