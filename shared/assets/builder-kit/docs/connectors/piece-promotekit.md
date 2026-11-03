# PromoteKit

Affiliate marketing platform integrated with Stripe.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-promotekit'
  version: '0.4.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your PromoteKit dashboard.
> 2. Go to **Settings > API Keys**.
> 3. Click **Create API Key**.
> 4. Copy the key and paste it here.

## Actions

### `list_affiliates`

**List Affiliates.** Retrieve a paginated list of affiliates in the PromoteKit account. Use to enumerate or browse affiliates rather than look one up by a known ID. Supports page and per-page limit (max 100); read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number to retrieve. Defaults to 1. |
| `limit` | number | no | `10` | Limit. Number of affiliates per page (max 100). Defaults to 10. |

### `find_affiliate`

**Find Affiliate.** Fetch a single affiliate by its PromoteKit affiliate ID. Use when you already have the exact ID and need that affiliate's details; to discover IDs, list affiliates first. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `affiliate_id` | string | yes |  | Affiliate ID. The ID of the affiliate to retrieve. |

### `create_affiliate`

**Create Affiliate.** Create a new affiliate in PromoteKit, optionally assigning them to a campaign. Email is required; first/last name and campaign are optional. Not idempotent: each call adds another affiliate, so guard against duplicates by checking for an existing affiliate first. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the new affiliate. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `campaign_id` | string | no |  | Campaign. Select the campaign for this affiliate. A value the product loads from the provider, such as an id; write the value itself. |

### `update_affiliate`

**Update Affiliate.** Update an existing affiliate identified by affiliate ID, changing only the fields you supply (name, payout email, approved, banned); omitted fields are left untouched. Use to approve, ban, or edit an affiliate. Idempotent: re-sending the same field values leaves the affiliate in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `affiliate_id` | string | yes |  | Affiliate ID. The ID of the affiliate to update. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `payout_email` | string | no |  | Payout Email. The email address where the affiliate receives payouts. |
| `approved` | boolean | no |  | Approved. Whether the affiliate is approved. |
| `banned` | boolean | no |  | Banned. Whether the affiliate is banned. |

### `list_referrals`

**List Referrals.** Retrieve a paginated list of referrals (referred customers) in the PromoteKit account. Use to enumerate or browse referrals rather than look one up by a known ID. Supports page and per-page limit (max 100); read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number to retrieve. Defaults to 1. |
| `limit` | number | no | `10` | Limit. Number of referrals per page (max 100). Defaults to 10. |

### `find_referral`

**Find Referral.** Fetch a single referral by its PromoteKit referral ID. Use when you already have the exact ID and need that referral's details; to discover IDs, list referrals first. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `referral_id` | string | yes |  | Referral ID. The ID of the referral to retrieve. |

### `create_referral`

**Create Referral.** Create a new referral attributing a referred person (by email) to an affiliate. Both the email and the affiliate ID are required. Not idempotent: each call records another referral, so check for an existing one before repeating. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the referred person. |
| `affiliate_id` | string | yes |  | Affiliate. Select the affiliate. A value the product loads from the provider, such as an id; write the value itself. |

### `list_commissions`

**List Commissions.** Retrieve a paginated list of commissions earned in the PromoteKit account. Use to enumerate or browse commissions rather than look one up by a known ID. Supports page and per-page limit (max 100); read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number to retrieve. Defaults to 1. |
| `limit` | number | no | `10` | Limit. Number of commissions per page (max 100). Defaults to 10. |

### `find_commission`

**Find Commission.** Fetch a single commission by its PromoteKit commission ID. Use when you already have the exact ID and need that commission's details; to discover IDs, list commissions first. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `commission_id` | string | yes |  | Commission ID. The ID of the commission to retrieve. |

### `list_campaigns`

**List Campaigns.** Retrieve all campaigns (up to 100) in the PromoteKit account, each with its commission type and amount. Use to discover campaign IDs and commission terms, e.g. before assigning an affiliate to a campaign. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

No inputs.

### `find_campaign`

**Find Campaign.** Fetch a single campaign by its PromoteKit campaign ID, returning its name and commission terms. Use when you already have the exact ID; to discover IDs, list campaigns first. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. The ID of the campaign to retrieve. |

### `list_payouts`

**List Payouts.** Retrieve a paginated list of payouts to affiliates in the PromoteKit account. Use to enumerate or browse payouts rather than look one up by a known ID. Supports page and per-page limit (max 100); read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number to retrieve. Defaults to 1. |
| `limit` | number | no | `10` | Limit. Number of payouts per page (max 100). Defaults to 10. |

### `find_payout`

**Find Payout.** Fetch a single payout by its PromoteKit payout ID. Use when you already have the exact ID and need that payout's details; to discover IDs, list payouts first. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payout_id` | string | yes |  | Payout ID. The ID of the payout to retrieve. |

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
