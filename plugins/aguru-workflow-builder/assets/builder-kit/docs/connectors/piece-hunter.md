# Hunter

Find, verify and manage professional email addresses at scale. Automate email discovery, validation, lead tracking, and campaign outreach with Hunter.io.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hunter'
  version: '0.1.7'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from [Account Settings](https://hunter.io/dashboard)

## Actions

### `add-recipients`

**Add Recipients.** Adds one or more recipients to a Hunter campaign, identified either by raw email addresses, by existing lead IDs, or both. Use to enroll contacts into an outreach campaign once you have the campaign ID. Requires at least one valid email or lead ID (max 50 of each per call); not idempotent — each call appends recipients, though Hunter skips duplicates already in the campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `emails` | array | no | `[]` | Emails. Email addresses to add as recipients. At least one email or lead ID is required. |
| `lead_ids` | array | no |  | Leads. Select leads from your Hunter account to add as recipients. Values the product loads from the provider, such as ids; write an array of them. |

### `count-emails`

**Count Emails.** Returns how many email addresses Hunter knows for a given domain or company, broken down by department and seniority, and optionally filtered to personal or generic addresses. Use to gauge coverage before running an email search or to estimate prospecting volume. Provide either a domain or a company name; this is a read-only lookup that consumes no credits and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Domain name to count addresses for (e.g., "stripe.com"). At least one of domain or company is required. |
| `company` | string | no |  | Company. Company name to count addresses for (e.g., "Stripe"). At least one of domain or company is required. |
| `type` | string | no |  | Type. Count only "personal" or "generic" email addresses. Leave blank for both. A value the product loads from the provider, such as an id; write the value itself. |

### `create-lead`

**Create Lead.** Creates a new lead record in the Hunter account with contact and company details, optionally assigning it to a leads list and setting custom attributes. Use to persist a prospect for later outreach or tracking. Not idempotent — each call creates a separate lead even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the lead. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `position` | string | no |  | Position. |
| `company` | string | no |  | Company. Name of the company the lead is working in. |
| `company_industry` | string | no |  | Company Industry. Sector of the company (e.g. Finance, Technology, Education, etc.). |
| `company_size` | string | no |  | Company Size. Size of the company (e.g. 1-10, 201-500 employees). |
| `confidence_score` | number | no |  | Confidence Score. Probability the email is correct (0–100). |
| `website` | string | no |  | Website. Domain name of the company. |
| `country_code` | string | no |  | Country Code. ISO 3166-1 alpha-2 country code. |
| `linkedin_url` | string | no |  | LinkedIn URL. |
| `phone_number` | string | no |  | Phone Number. |
| `twitter` | string | no |  | Twitter Handle. |
| `notes` | string | no |  | Notes. Personal notes about the lead. |
| `source` | string | no |  | Source. Origin where the lead was found. |
| `leads_list_id` | string | no |  | Leads List. Select which list to add the lead to; defaults to your most recent list. A value the product loads from the provider, such as an id; write the value itself. |
| `leads_list_ids` | array | no | `[]` | Leads List IDs. Array of list IDs to add the lead to; defaults to your most recent list. |
| `custom_attributes` | JSON | no |  | Custom Attributes. Key/value map of any custom attributes, e.g. { "customer_id": "cus-1234abcd" }. |

### `delete-lead`

**Delete Lead.** Permanently deletes a single lead from the Hunter account by its lead ID. Use to remove a prospect that is no longer relevant. Requires the lead ID; idempotent in effect since re-deleting an already-removed lead leaves the account in the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead to Delete. Select the lead to delete from your Hunter account. A value the product loads from the provider, such as an id; write the value itself. |

### `find-email`

**Find Email.** Finds the most likely professional email address for a named person at a given company, returning a confidence score and supporting sources. Use to discover an unknown contact email from a name plus an organization. Requires either a domain or a company name, plus either both first and last name or a full name; this is a read-only lookup and is idempotent for the same input. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Domain name to count addresses for (e.g., "stripe.com"). At least one of domain or company is required. |
| `company` | string | no |  | Company. Company name to count addresses for (e.g., "Stripe"). At least one of domain or company is required. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `full_name` | string | no |  | Full Name. The person's full name (if you can't supply both first and last name). |
| `max_duration` | number | no |  | Max Duration (seconds). How long Hunter should spend refining results (3-20, default 10). |

### `get-lead`

**Get Lead.** Retrieves the full record for a single lead by its lead ID, including contact, company, verification, and list details. Use to inspect a known lead before updating or acting on it. Requires the lead ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. Select a lead from your Hunter account. A value the product loads from the provider, such as an id; write the value itself. |

### `search-leads`

**Search Leads.** Lists leads in the Hunter account, optionally narrowed by a wide set of filters (email, name, company, list, verification/sending status, activity dates, custom attributes, free-text query) with limit/offset paging; with no filters it returns all leads. Use to find leads matching criteria or to page through the account. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leads_list_id` | string | no |  | Leads List. Select which list to add the lead to; defaults to your most recent list. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. Filter by email (use "*" for any, "~" for empty, or substring). |
| `first_name` | string | no |  | First Name. Filter by first name. |
| `last_name` | string | no |  | Last Name. Filter by last name. |
| `position` | string | no |  | Position. Filter by position. |
| `company` | string | no |  | Company. Filter by company. |
| `industry` | string | no |  | Industry. Filter by industry. |
| `website` | string | no |  | Website. Filter by website. |
| `country_code` | string | no |  | Country Code. Filter by ISO 3166‑1 alpha‑2 country code. |
| `company_size` | string | no |  | Company Size. Filter by company size. |
| `source` | string | no |  | Source. Filter by source. |
| `twitter` | string | no |  | Twitter Handle. Filter by Twitter handle. |
| `linkedin_url` | string | no |  | LinkedIn URL. Filter by LinkedIn URL. |
| `phone_number` | string | no |  | Phone Number. Filter by phone number. |
| `sync_status` | string | no |  | Sync Status. Filter by synchronization status. A value the product loads from the provider, such as an id; write the value itself. |
| `sending_status` | array | no | `[]` | Sending Status(es). Filter by sending status(es): clicked, opened, sent, pending, error, bounced, unsubscribed, replied, or "~" (unset). |
| `verification_status` | array | no | `[]` | Verification Status(es). Filter by verification status(es): accept_all, disposable, invalid, unknown, valid, webmail, or "pending". |
| `last_activity_at` | string | no |  | Activity/Contact Date. Use "*" for any value or "~" for unset. |
| `last_contacted_at` | string | no |  | Activity/Contact Date. Use "*" for any value or "~" for unset. |
| `custom_attributes` | JSON | no |  | Custom Attributes Filter. JSON object of slug→filterValue (use "*", "~", or substrings). |
| `query` | string | no |  | Query. Search first_name, last_name or email containing this substring. |
| `limit` | number | no |  | Limit. Max leads to return (1-1000). Defaults to 20. |
| `offset` | number | no |  | Offset. Number of leads to skip (0-100000). Defaults to 0. |

### `update-lead`

**Update Lead.** Updates fields on an existing lead identified by its lead ID, overwriting only the provided contact, company, list, or custom-attribute values. Use to correct or enrich a known lead. Requires the lead ID and at least one field to change; idempotent since re-sending the same values yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. Select a lead from your Hunter account. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The email address of the lead. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `position` | string | no |  | Position. |
| `company` | string | no |  | Company. Name of the company the lead is working in. |
| `company_industry` | string | no |  | Company Industry. Sector of the company (e.g. Finance, Technology, Education, etc.). |
| `company_size` | string | no |  | Company Size. Size of the company (e.g. 1-10, 201-500 employees). |
| `confidence_score` | number | no |  | Confidence Score. Probability the email is correct (0–100). |
| `website` | string | no |  | Website. Domain name of the company. |
| `country_code` | string | no |  | Country Code. ISO 3166-1 alpha-2 country code. |
| `linkedin_url` | string | no |  | LinkedIn URL. |
| `phone_number` | string | no |  | Phone Number. |
| `twitter` | string | no |  | Twitter Handle. |
| `notes` | string | no |  | Notes. Personal notes about the lead. |
| `source` | string | no |  | Source. Origin where the lead was found. |
| `leads_list_id` | string | no |  | Leads List. Select which list to add the lead to; defaults to your most recent list. A value the product loads from the provider, such as an id; write the value itself. |
| `leads_list_ids` | array | no | `[]` | Leads List IDs. Array of list IDs to add the lead to; defaults to your most recent list. |
| `custom_attributes` | JSON | no |  | Custom Attributes. Key/value map of any custom attributes, e.g. { "customer_id": "cus-1234abcd" }. |

### `verify-email`

**Verify Email.** Verifies a single email address against Hunter, returning deliverability status, a confidence score, and signals such as MX records, SMTP check, disposable/webmail flags, and accept-all. Use to validate an address before sending. Requires the email; read-only and idempotent, though verification may occasionally be reported as still in progress. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the lead. |
