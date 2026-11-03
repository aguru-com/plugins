# Vouchery

Vouchery is a voucher and gift card management platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vouchery-io'
  version: '0.1.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Vouchery-io API Key

## Actions

### `createAVoucher`

**Create a voucher.** Creates a new voucher with the given code inside a specific Vouchery campaign, optionally setting an expiration date, activation date, gift card value, and assigned customer. Use to issue a redeemable voucher or gift card under a campaign. Not idempotent: each call creates a voucher, so repeating it generates additional vouchers (a duplicate code may error). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select the campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `voucherCode` | string | yes |  | Voucher Code. The code for the voucher. |
| `voucher_valid_until` | ISO date-time string | no |  | Expiration Date. The date and time when the voucher expires. |
| `customer_identifier` | number | no |  | Customer Identifier. The identifier for the customer. |
| `gift_card_value` | number | no |  | Gift Card Value. The value of the gift card. |
| `activates_at` | ISO date-time string | no |  | Activation Date. The date and time when the voucher becomes active. |

### `createCustomer`

**Create Customer.** Creates a new customer record in Vouchery, keyed by a unique customer identifier from your application (hash, id, email, or any unique value). Use when onboarding a customer before issuing or assigning vouchers. Not idempotent: each call creates a customer, so repeating it with the same identifier may produce a duplicate or error. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Customer Identifier. Unique customer identifier in your application. Can be hash, id, email or any other unique value. |
| `name` | string | no |  | Customer Name. Customer full name. |
| `email` | string | no |  | Email. Customer email address. |
| `birthdate` | object | no |  | Birthdate. Customer birthdate object. |
| `categories` | array | no |  | Categories. Array of category objects to determine how customer is related to specific categories. Each item: { `name`, `tag` }. |
| `metadata` | object | no |  | Metadata. Additional metadata for the customer. |
| `referrer_code` | string | no |  | Referrer Code. A referral code from the recommending user. |
| `loyalty_points` | number | no |  | Loyalty Points. [DEPRECATED - use grant-points endpoint instead] Number of loyalty points customer will have. |

### `findVoucher`

**Find Voucher.** Looks up an existing Vouchery voucher by campaign metadata (purpose, team, channel, medium); at least one metadata filter must be provided. Optionally, supplying a customer identifier also assigns the found voucher to that customer (a mutation), otherwise it is a pure read. Use to retrieve a voucher matching campaign criteria before redemption or assignment. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `purpose` | string | no |  | Purpose. Purpose metadata (multiple values allowed) |
| `team` | string | no |  | Team. Team metadata (multiple values allowed) |
| `channel` | string | no |  | Channel. Channel metadata (multiple values allowed) |
| `medium` | string | no |  | Medium. Medium metadata (multiple values allowed) |
| `customer_identifier` | string | no |  | Customer Identifier. Optional: Assign the found voucher to a customer by providing their identifier. |

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
