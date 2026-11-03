# Instantly.ai

Powerful cold email outreach and lead engagement platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-instantly-ai'
  version: '0.2.1'
```

Categories: MARKETING, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain an API key from **Settings->Integrations->API Keys**.

## Actions

### `create_campaign`

**Create Campaign.** Creates a new cold email outreach campaign in Instantly with a sending schedule (time window, weekday/weekend days, timezone) and optional delivery settings such as daily limits, tracking, and stop-on-reply rules. Use this to set up a fresh campaign before adding leads; requires a name and schedule start/end times and timezone. Not idempotent — each call creates a separate campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Campaign Name. Name of the campaign. |
| `schedule_time_from` | string | yes | `"09:00"` | Schedule Time From. Start time in 24-hour format (e.g., "09:00") |
| `schedule_time_to` | string | yes | `"17:00"` | Schedule Time To. End time in 24-hour format (e.g., "17:00") |
| `schedule_timezone` | string | yes |  | Schedule Timezone. Timezone for the schedule i.e. "America/Dawson". |
| `weekday_sending` | boolean | no | `true` | Send on Weekdays. Whether to send emails Monday-Friday. |
| `weekend_sending` | boolean | no | `false` | Send on Weekends. Whether to send emails Saturday-Sunday. |
| `start_date` | ISO date-time string | no |  | Start Date. Date to start the campaign. |
| `end_date` | ISO date-time string | no |  | End Date. Date to end the campaign. |
| `pl_value` | number | no |  | Positive Lead Value. Value of every positive lead. |
| `is_evergreen` | boolean | no |  | Is Evergreen. Whether the campaign is evergreen. |
| `email_gap` | number | no |  | Email Gap. Gap between emails in minutes. |
| `random_wait_max` | number | no |  | Maximum Random Wait Time. Maximum random wait time in minutes. |
| `text_only` | boolean | no |  | Text Only. Whether the campaign is text-only. |
| `daily_limit` | number | no |  | Daily Limit. Daily limit for sending emails. |
| `stop_on_reply` | boolean | no |  | Stop on Reply. Whether to stop campaign on reply. |
| `link_tracking` | boolean | no |  | Link Tracking. Whether to track links in emails. |
| `open_tracking` | boolean | no |  | Open Tracking. Whether to track opens in emails. |
| `stop_on_auto_reply` | boolean | no |  | Stop on Auto Reply. Whether to stop campaign on auto-reply. |
| `daily_max_leads` | number | no |  | Daily Maximum Leads. Maximum daily new leads to contact. |
| `prioritize_new_leads` | boolean | no |  | Prioritize New Leads. Whether to prioritize new leads. |
| `match_lead_esp` | boolean | no |  | Match Lead ESP. Whether to match leads by ESP. |
| `stop_for_company` | boolean | no |  | Stop for Company. Stop campaign for the company (domain) when a lead replies. |
| `insert_unsubscribe_header` | boolean | no |  | Insert Unsubscribe Header. Insert unsubscribe header in emails. |
| `allow_risky_contacts` | boolean | no |  | Allow Risky Contacts. Allow risky contacts. |
| `disable_bounce_protect` | boolean | no |  | Disable Bounce Protection. Disable bounce protection. |

### `create_lead_list`

**Create Lead List.** Creates a new lead list in Instantly, optionally enabling an enrichment task that runs on every lead added to the list. Use this to set up a container for organizing leads before importing or adding them. Not idempotent — each call creates a new list even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | List Name. |
| `has_enrichment_task` | boolean | no | `false` | Enable Enrichment. Whether this list runs the enrichment process on every added lead or not. |

### `add_lead_to_campaign`

**Add Lead to Campaign.** Moves an existing lead into a campaign by lead ID and campaign ID, then polls the resulting background job until it completes. Optionally skip the lead if it already exists in the campaign. Use when assigning a known lead to a specific outreach campaign. Not idempotent — it triggers a move/add operation each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. A value the product loads from the provider, such as an id; write the value itself. |
| `campaign_id` | string | yes |  | Campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `skip_if_in_campaign` | boolean | no | `false` | Skip if in Campaign. Skip lead if it exists in the campaign. |

### `search_campaigns`

**Search Campaigns.** Searches Instantly campaigns by name and returns all matching campaigns, paginating through every page of results. Use to look up a campaign and its ID before adding leads or referencing it elsewhere. A name is required; matching is by search term. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Campaign Name. |

### `search_leads`

**Search Leads.** Searches leads in Instantly by a query string (first name, last name, or email), optionally scoped to a specific campaign and/or lead list, and returns all matches across pages. Use to find a lead and its ID before adding it to a campaign or other lead operations. The search term is required. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Search. Search string to find leads - can be First Name, Last Name, or Email (e.g. "John Doe"). |
| `campaign_id` | string | no |  | Campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | no |  | List. A value the product loads from the provider, such as an id; write the value itself. |

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
