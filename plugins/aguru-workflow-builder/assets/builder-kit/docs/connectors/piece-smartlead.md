# SmartLead

Powerful cold email outreach platform with multi-account rotation, email warmup, unified inbox, and advanced analytics.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-smartlead'
  version: '0.1.1'
```

Categories: MARKETING, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API key:
> 1. Log in to your SmartLead account
> 2. Go to **Profile -> Settings → API Key **
> 3. Copy your API key
>
> The API key is passed as a query parameter to all API requests.

## Actions

### `create_campaign`

**Create Campaign.** Creates a new, empty cold email campaign in SmartLead, identified by name; on agency/white-label accounts an optional client ID associates it with a specific client. Use this as the first step before adding leads or configuring sequences. Not idempotent: each call creates a separate campaign even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Campaign Name. Name of the campaign. Defaults to "Untitled Campaign" if not provided. |
| `client_id` | number | no |  | Client ID. Associate the campaign with a specific client (for agency/white-label accounts). Leave empty to use your default. |

### `add_leads_to_campaign`

**Add Leads to Campaign.** Adds leads to an existing SmartLead campaign by campaign ID, passing a JSON array where each lead requires an email field. Optional flags let you bypass the global block list, unsubscribe list, cross-campaign duplicate check, and community bounce list. Use to populate or grow a campaign recipient list; capped at 400 leads per call. Not idempotent: it appends leads on each call (though SmartLead deduplicates by email within the campaign). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | number | yes |  | Campaign ID. The ID of the campaign to add leads to. |
| `lead_list` | JSON | yes |  | Lead List. Array of lead objects. Each lead must have an "email" field. Optional fields: first_name, last_name, phone_number, company_name, website, location, linkedin_profile, company_url, custom_fields (object). Example: ```json [ { "email": "john@example.com", "first_name": "John", "last_name": "Doe", "com… |
| `ignore_global_block_list` | boolean | no | `false` | Ignore Global Block List. Skip global block list validation. |
| `ignore_unsubscribe_list` | boolean | no | `false` | Ignore Unsubscribe List. Include previously unsubscribed leads. |
| `ignore_duplicate_leads_in_other_campaign` | boolean | no | `false` | Ignore Duplicates in Other Campaigns. Allow the same lead in multiple campaigns. |
| `ignore_community_bounce_list` | boolean | no | `false` | Ignore Community Bounce List. Skip community bounce list check. |

### `get_campaign_statistics`

**Get Campaign Statistics.** Fetches aggregate performance analytics for a single SmartLead campaign by campaign ID, covering open, click, and reply rates and related engagement metrics. Use to report on or evaluate how a campaign is performing. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | number | yes |  | Campaign ID. The ID of the campaign to get statistics for. |

### `update_campaign_settings`

**Update Campaign Settings.** Updates configuration on an existing SmartLead campaign by campaign ID, such as open/click tracking, the stop-lead condition, unsubscribe text, AI ESP matching, plain-text sending, and follow-up percentage. Use to adjust how a campaign sends and tracks; at least one setting must be supplied and follow-up percentage must be 0-100. Idempotent: it overwrites the targeted settings, so repeating the same input leaves the campaign in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | number | yes |  | Campaign ID. The ID of the campaign to update. |
| `track_open` | boolean | no |  | Track Opens. Enable email open tracking. |
| `track_click` | boolean | no |  | Track Clicks. Enable link click tracking. |
| `stop_lead_settings` | string | no |  | Stop Lead Condition. When to stop emailing a lead. One of `"REPLY_TO_AN_EMAIL"`, `"OPENED_EMAIL"`, `"CLICKED_LINK"`. |
| `unsubscribe_text` | string | no |  | Unsubscribe Text. Custom unsubscribe text added to campaign emails. |
| `enable_ai_esp_matching` | boolean | no |  | Enable AI ESP Matching. Use AI to intelligently pair leads with optimal email accounts. |
| `send_as_plain_text` | boolean | no |  | Send as Plain Text. Send emails as plain text for better deliverability with technical audiences. |
| `follow_up_percentage` | number | no |  | Follow Up Percentage. Percentage of leads to follow up with (0-100) |

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
