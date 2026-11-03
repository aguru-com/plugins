# Reachinbox

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-reachinbox'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your ReachInbox API key

## Actions

### `addLeads`

**Add Leads.** Adds a single lead (email plus name and optional custom variables) to a specific ReachInbox campaign. Use to enroll a new contact into an outreach sequence. Requires a campaign id; not idempotent since repeated calls append the lead again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Select Campaign. Choose a campaign from the list. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. Enter the email address for the lead. |
| `firstName` | string | yes |  | First Name. Enter the first name for the lead. |
| `lastName` | string | no |  | Last Name. Enter the last name for the lead. |
| `customVariables` | array | no | `[]` | Custom Variables. Add custom variables as key-value pairs for the lead. Each item: { `key`, `value` }. |

### `addBlocklist`

**Add Blocklist.** Adds email addresses, domains, and/or keywords to the ReachInbox blocklist so matching leads are excluded from outreach. Use to suppress contacts globally. At least one of emails, domains, or keywords must be provided; the call appends entries on each run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `emails` | array | no |  | Email Addresses. Enter the email addresses to block (e.g., ["abc@gmail.com"]) |
| `domains` | array | no |  | Domains. Enter the domains to block (e.g., ["example.com"]) |
| `keywords` | array | no |  | Keywords. Enter keywords to block (e.g., ["spam", "blacklist"]) |

### `addEmail`

**Add Email.** Attaches a sending email address to a specific ReachInbox campaign so that account is used for outreach. Use to assign which connected mailbox a campaign sends from. Requires both a campaign id and the email address. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Select Campaign. Choose a campaign from the list or enter the campaign ID manually. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. Enter the email address to add to the campaign. |

### `enableWarmup`

**Enable Warmup.** Turns on inbox warmup for a connected ReachInbox email account, identified by its account id. Use to start gradually building sending reputation for a mailbox. Idempotent: re-running for an account already warming up leaves it enabled. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Select Email Accounts to Enable Warmup. Choose email accounts that have warmup disabled. A value the product loads from the provider, such as an id; write the value itself. |

### `getCampaignAnalytics`

**Get Campaign Analytics.** Retrieves performance analytics (sent, opens, clicks, replies, per-step breakdowns, and activity) for one ReachInbox campaign over a date range. Use to report on or evaluate a specific campaign. Requires a campaign id and start/end dates in YYYY-MM-DD format; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Select Campaign. Choose a campaign from the list or enter the campaign ID manually. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | string | yes |  | Start Date. Enter the start date (YYYY-MM-DD). E.g. 2023-10-11. |
| `endDate` | string | yes |  | End Date. Enter the end date (YYYY-MM-DD). E.g. 2023-10-20. |

### `getSummary`

**Get Summary.** Retrieves account-wide outreach analytics (totals and rates for sent, opens, clicks, and replies) aggregated across all campaigns for a date range. Use for an overall performance summary rather than a single campaign. Requires start/end dates in YYYY-MM-DD format; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `startDate` | string | yes |  | Start Date. Enter the start date (YYYY-MM-DD). E.g. 2023-10-11. |
| `endDate` | string | yes |  | End Date. Enter the end date (YYYY-MM-DD). E.g. 2023-12-20. |

### `pauseCampaign`

**Pause Campaign.** Pauses a running ReachInbox campaign, identified by its campaign id, halting further sends. Use to temporarily stop outreach for a campaign. Idempotent: pausing an already-paused campaign leaves it paused. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Select Campaign. Choose a campaign to pause. A value the product loads from the provider, such as an id; write the value itself. |

### `pauseWarmup`

**Pause Warmup.** Turns off inbox warmup for a connected ReachInbox email account, identified by its account id. Use to stop reputation-building activity for a mailbox. Idempotent: re-running for an account already paused leaves it disabled. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Select Email Accounts to Pause Warmup. Choose email accounts that are currently warming up. A value the product loads from the provider, such as an id; write the value itself. |

### `removeEmail`

**Remove Email.** Deletes a connected email account from ReachInbox, identified by its account id. Use to permanently disconnect a mailbox. Idempotent on the id: once removed, repeating the call leaves the account absent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Select Email Account to Remove. Choose an email account to remove. A value the product loads from the provider, such as an id; write the value itself. |

### `setSchedule`

**Set Schedule.** Sets the sending schedule for a ReachInbox campaign: active date range, daily start/end times, timezone, and which weekdays are enabled. Use to control when a campaign sends. Requires a campaign id; idempotent since it replaces the schedule with the supplied values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Select Campaign. Choose a campaign from the list or enter the campaign ID manually. A value the product loads from the provider, such as an id; write the value itself. |
| `scheduleName` | string | yes |  | Schedule Name. Enter the schedule name here (e.g., New schedule). |
| `startDate` | ISO date-time string | yes |  | Start Date. Enter the start date (e.g., 2023-08-01T00:00:00.000Z). |
| `endDate` | ISO date-time string | yes |  | End Date. Enter the end date (e.g., 2024-08-25T00:00:00.000Z). |
| `startTime` | string | yes |  | Start Time. Enter the start time (e.g., 09:00). |
| `endTime` | string | yes |  | End Time. Enter the end time (e.g., 12:00). |
| `timezone` | string | yes |  | Timezone. Enter the timezone (e.g., America/Detroit). |
| `sunday` | boolean | yes | `false` | Sunday. Choose "Yes" if you want to set a schedule for Sunday. |
| `monday` | boolean | yes | `false` | Monday. Choose "Yes" if you want to set a schedule for Monday. |
| `tuesday` | boolean | yes | `false` | Tuesday. Choose "Yes" if you want to set a schedule for Tuesday. |
| `wednesday` | boolean | yes | `false` | Wednesday. Choose "Yes" if you want to set a schedule for Wednesday. |
| `thursday` | boolean | yes | `false` | Thursday. Choose "Yes" if you want to set a schedule for Thursday. |
| `friday` | boolean | yes | `false` | Friday. Choose "Yes" if you want to set a schedule for Friday. |
| `saturday` | boolean | yes | `false` | Saturday. Choose "Yes" if you want to set a schedule for Saturday. |

### `startCampaign`

**Start Campaign.** Starts (launches or resumes) a ReachInbox campaign, identified by its campaign id, so it begins sending. Use to activate outreach for a campaign. Idempotent: starting an already-running campaign leaves it running. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Select Campaign. Choose a campaign from the list or enter the campaign ID manually. A value the product loads from the provider, such as an id; write the value itself. |

### `updateLead`

**Update Lead.** Updates an existing lead in a ReachInbox campaign, overwriting its email, name, and custom-variable attributes. Use to modify a known contact's details. Requires both the campaign id and the lead id; idempotent since it sets the lead to the supplied values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Select Campaign. Choose a campaign from the list or enter the campaign ID manually. A value the product loads from the provider, such as an id; write the value itself. |
| `leadId` | string | yes |  | Select Lead. Choose a lead from the selected campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. Enter the new email address for the lead. |
| `firstName` | string | no |  | First Name. Enter the new first name for the lead. |
| `lastName` | string | no |  | Last Name. Enter the new last name for the lead. |
| `customVariables` | array | no | `[]` | Custom Variables. Add custom variables as key-value pairs for the lead. Each item: { `key`, `value` }. |

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
