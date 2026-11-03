# Giftbit

Send digital gift cards and rewards to recipients via email.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-giftbit'
  version: '0.1.7'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Get your API token from Account → API keys in your Giftbit dashboard.

## Actions

### `send_reward`

**Send Reward.** Sends a digital gift card / reward campaign to one or more email recipients via Giftbit. Choose this to disburse incentives, rebates, or rewards. The reward branding can be set in two ways — either let recipients pick from the full regional catalog (set a region) or restrict them to specific brand codes; the email body comes either from a saved gift template ID or from an explicit subject and message. Not idempotent: each call creates and sends a new campaign, so retrying re-sends rewards. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `use_testbed` | boolean | no | `false` | Use Testbed Environment. Enable for testing. Disable for production. |
| `gift_template` | string | no |  | Gift Template ID. Template ID from your Giftbit account (optional if subject/message provided) |
| `order_id` | string | yes |  | Order ID. Unique identifier for this order. |
| `price_in_cents` | number | yes |  | Reward Value (cents). Value in cents (e.g., 2500 = $25.00) |
| `use_full_catalog` | boolean | no | `false` | Use Full Catalog. Let recipients choose from all brands in their region. |
| `brand_codes` | array | no |  | Brand Codes. Select one or more brands for the reward. Values the product loads from the provider, such as ids; write an array of them. |
| `region` | string | no | `"United States"` | Region. Required for Full Catalog rewards. One of `"United States"`, `"Canada"`, `"United Kingdom"`, `"Australia"`, `"Germany"`, `"France"`, `"Italy"`, `"Spain"`, `"Netherlands"`, `"Belgium"`. |
| `expiry_date` | ISO date-time string | no |  | Expiry Date. Claim deadline (defaults to 1 year if not set) |
| `subject` | string | no |  | Email Subject. Required if no template is used. |
| `message` | string | no |  | Email Message. Required if no template is used. |
| `contacts` | array | yes |  | Recipients. List of recipients. Each item: { `email`, `firstname`?, `lastname`? }. |
