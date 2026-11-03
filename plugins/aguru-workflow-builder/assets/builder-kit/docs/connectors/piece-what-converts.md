# WhatConverts

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-what-converts'
  version: '0.1.7'
```

Categories: SALES_AND_CRM, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To get your API credentials:
> 1. Log in to your WhatConverts dashboard.
> 2. Navigate to an account and select a profile.
> 3. Select the **Tracking** dropdown menu.
> 4. Click on **Integrations**, then **API Keys**.
> 5. Click **Generate API Key** to get your Token and Secret.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_token` | string | yes |  | API Token. Your WhatConverts API Token. |
| `api_secret` | string | yes |  | API Secret. Your WhatConverts API Secret. |

## Actions

### `create_lead`

**Create Lead.** Creates a new lead in a WhatConverts account, capturing contact details, lead type, attribution (source/medium), and optional quote/sales values. Use when an agent needs to record an inbound lead or conversion in WhatConverts. Requires the target account and profile; the lead type is mandatory. Not idempotent — each call creates a separate lead and can optionally send a notification email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account. The account to select a profile from. A value the product loads from the provider, such as an id; write the value itself. |
| `profile_id` | string | yes |  | Profile. The profile to search for leads in. A value the product loads from the provider, such as an id; write the value itself. |
| `lead_type` | string | yes |  | Lead Type. The type of the lead. One of `"phone_call"`, `"web_form"`, `"chat"`, `"transaction"`, `"event"`, `"appointment"`, `"text_message"`. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone_number` | string | no |  | Phone Number. |
| `company_name` | string | no |  | Company Name. |
| `notes` | string | no |  | Notes. |
| `referring_source` | string | no |  | Referring Source. The source of the lead (e.g., "google"). One of `"google"`, `"bing"`, `"facebook"`, `"linkedin"`, `"twitter"`, `"instagram"`, `"(direct)"`. |
| `referring_medium` | string | no |  | Referring Medium. The medium of the lead (e.g., "cpc"). One of `"organic"`, `"cpc"`, `"social"`, `"email"`, `"referral"`, `"display"`, `"(none)"`. |
| `send_notification` | boolean | yes | `false` | Send Notification. Set to true to send a new lead notification email. |
| `date_created` | ISO date-time string | no |  | Creation Date. The date and time when the lead was created. |
| `quotable` | string | no |  | Quotable. Indicates if the lead is quotable. One of `"yes"`, `"no"`, `"pending"`, `"not_set"`. |
| `quote_value` | number | no |  | Quote Value. The monetary value of the quote associated with the lead. |
| `sales_value` | number | no |  | Sales Value. The monetary value of the sale associated with the lead. |

### `export_leads`

**Export Leads.** Retrieves leads for a WhatConverts profile in bulk, automatically paging through results up to the configured page count. Use when an agent needs to export or analyze many leads at once, optionally narrowed by date range and lead type. Requires a profile; an empty date/type filter returns all leads. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account. The account to select a profile from. A value the product loads from the provider, such as an id; write the value itself. |
| `profile_id` | string | yes |  | Profile. The profile to search for leads in. A value the product loads from the provider, such as an id; write the value itself. |
| `from_date` | string | no |  | Start Date. The start date for the export range in YYYY-MM-DD format. |
| `to_date` | string | no |  | End Date. The end date for the export range in YYYY-MM-DD format. |
| `lead_type` | string | no |  | Lead Type (Optional). Filter leads by their type. One of `"appointment"`, `"chat"`, `"email"`, `"event"`, `"other"`, `"phone_call"`, `"text_message"`, `"transaction"`, `"web_form"`. |
| `per_page` | number | no | `25` | Leads Per Page. Number of leads to fetch per page (max 1000). |
| `no_of_pages` | number | no | `1` | Number of Pages. The number of pages to retrieve (max 100). |

### `update_lead`

**Update Lead.** Updates an existing WhatConverts lead identified by its lead ID, changing fields such as lead type, quotable status, sales value, contact details, and attribution. Use when an agent needs to enrich or correct a known lead. Only provided fields are changed; requires the lead ID. Idempotent — re-sending the same field values leaves the lead in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account. The account to select a profile from. A value the product loads from the provider, such as an id; write the value itself. |
| `profile_id` | string | yes |  | Profile. The profile to search for leads in. A value the product loads from the provider, such as an id; write the value itself. |
| `lead_id` | string | yes |  | Lead. The lead to update. A value the product loads from the provider, such as an id; write the value itself. |
| `lead_type` | string | no |  | Lead Type. The type of the lead. One of `"Phone Call"`, `"Web Form"`, `"Chat"`, `"Transaction"`, `"Event"`. |
| `quotable` | string | no |  | Quotable. Mark the lead as quotable. One of `"Yes"`, `"No"`. |
| `sales_value` | string | no |  | Sales Value. The monetary value of the lead (e.g., "150.00"). |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone_number` | string | no |  | Phone Number. |
| `notes` | string | no |  | Notes. |
| `referring_source` | string | no |  | Referring Source. The source of the lead (e.g., "google"). One of `"google"`, `"bing"`, `"facebook"`, `"linkedin"`, `"twitter"`, `"instagram"`, `"(direct)"`. |
| `referring_medium` | string | no |  | Referring Medium. The medium of the lead (e.g., "cpc"). One of `"organic"`, `"cpc"`, `"social"`, `"email"`, `"referral"`, `"display"`, `"(none)"`. |
| `referring_campaign` | string | no |  | Referring Campaign. The campaign that generated the lead. One of `"summer-sale"`, `"q4-promo"`, `"new-product-launch"`, `"brand-awareness"`. |

### `find_lead`

**Find Lead.** Searches WhatConverts leads filtered by email address, phone number, and/or lead type, returning matching leads. Use when an agent needs to look up leads matching specific contact or type criteria. Requires at least one of email, phone, or lead type. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account. The account to select a profile from. A value the product loads from the provider, such as an id; write the value itself. |
| `profile_id` | string | yes |  | Profile. The profile to search for leads in. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | no |  | Email Address. Find a lead by their email address. |
| `phone_number` | string | no |  | Phone Number. Find a lead by their E.164 formatted phone number. |
| `lead_type` | string | no |  | Lead Type. Filter leads by their type. One of `"appointment"`, `"chat"`, `"email"`, `"event"`, `"other"`, `"phone_call"`, `"text_message"`, `"transaction"`, `"web_form"`. |
| `per_page` | number | no |  | Leads Per Page. The number of leads to return (default 25, max 2500). |
