# Woodpecker

Cold email automation tool for sales teams to send personalized outreach campaigns

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-woodpecker'
  version: '0.1.0'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API key:
> 1. Log into your Woodpecker account
> 2. Go to Marketplace (top-right) → Integrations → API keys
> 3. Click **Create a key**
> 4. Copy the key and paste it here

## Actions

### `add_prospect_to_campaign`

**Create/Update Prospect in Campaign.** Enroll a prospect (keyed by email) into a specific Woodpecker campaign, creating the prospect or updating its fields if it already exists. Use to start outreach to someone or push updated prospect details into a campaign; requires the campaign and the prospect email. Re-running with the same email upserts the same record rather than duplicating it. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign. Select the campaign to add prospects to. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. Prospect email address. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `company` | string | no |  | Company. |
| `website` | string | no |  | Website. |
| `linkedin_url` | string | no |  | LinkedIn URL. |
| `tags` | string | no |  | Tags. Tags starting with # separated by spaces (e.g. #VC #Startup) |
| `title` | string | no |  | Job Title. |
| `phone` | string | no |  | Phone. |
| `address` | string | no |  | Address. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `country` | string | no |  | Country. |
| `industry` | string | no |  | Industry. |
| `status` | string | no |  | Status. Prospect status in the campaign. One of `"ACTIVE"`, `"PAUSED"`, `"TO-REVIEW"`, `"TO-CHECK"`. |
| `snippets` | array | no |  | Snippets. Custom snippets for personalization (supports HTML). Max 15 snippets. |
| `send_after` | ISO date-time string | no |  | Send After. Earliest date and time the prospect can be contacted. |
| `force` | boolean | no | `false` | Force Add. Add prospect even if their global status is not ACTIVE (use with caution) |
| `file_name` | string | no |  | Import Batch Name. Name of the import batch (visible in the imported column) |

### `add_prospect_to_list`

**Create/Update Prospect.** Add or update a prospect (keyed by email) in the global Woodpecker prospect list, independent of any campaign. Use to maintain contact records or seed the prospect database; existing prospects are only modified when the update flag is enabled (otherwise they are left untouched). Re-running with the same email upserts the same record rather than duplicating it. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Prospect email address. |
| `update` | boolean | no | `false` | Update Existing. If enabled, updates existing prospect data. If disabled, existing prospects remain unchanged. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `company` | string | no |  | Company. |
| `website` | string | no |  | Website. |
| `linkedin_url` | string | no |  | LinkedIn URL. |
| `tags` | string | no |  | Tags. Tags starting with # separated by spaces (e.g. #VC #Startup). Appends to existing tags when updating. |
| `set_tags` | string | no |  | Replace Tags. Replaces all existing tags with these (only when updating). Use empty string to clear all tags. |
| `title` | string | no |  | Job Title. |
| `phone` | string | no |  | Phone. |
| `address` | string | no |  | Address. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `country` | string | no |  | Country. |
| `industry` | string | no |  | Industry. |
| `status` | string | no |  | Status. Prospect status. One of `"ACTIVE"`, `"BLACKLIST"`, `"BOUNCED"`, `"INVALID"`, `"REPLIED"`. |
| `snippets` | array | no |  | Snippets. Custom snippets for personalization (supports HTML). Max 15 snippets. |
| `file_name` | string | no |  | Import Batch Name. Name of the import batch (visible in the imported column) |

### `blacklist_domain`

**Blacklist Domain.** Add a domain (e.g. example.com) to the account-wide blacklist so Woodpecker stops emailing every prospect at that domain. Use to suppress an entire company or to honor an unsubscribe-by-domain request. Blacklisting an already-blacklisted domain leaves it blacklisted with no additional effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Domain to blacklist (e.g. example.com) |

### `get_prospect_responses`

**Get Prospect Responses.** Retrieve the reply messages a given prospect has sent back, looked up by the prospect numeric ID and optionally narrowed to a single campaign. Use to read a prospect's replies for triage, sentiment, or logging. Read-only; safe to call repeatedly. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prospect_id` | number | yes |  | Prospect ID. The unique ID of the prospect. |
| `campaign_id` | string | no |  | Campaign. Filter responses by campaign (optional) A value the product loads from the provider, such as an id; write the value itself. |

### `find_prospect_by_email`

**Find Prospect by Email.** Look up prospects in Woodpecker by email address, optionally including the campaigns each prospect is enrolled in. Use to check whether a contact already exists or to fetch their stored details and IDs before another action. The email is matched as a search filter (may return more than one match); read-only and safe to call repeatedly. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address to search for (exact match or partial) |
| `include_campaign_details` | boolean | no | `true` | Include Campaign Details. Include information about campaigns the prospect is enrolled in. |

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
