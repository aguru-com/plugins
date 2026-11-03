# Paywhirl

PayWhirls intuitive tools make recurring billing easy. Sell subscriptions, pre-orders, payment plans, or whatever billing arrangements you can dream up.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-paywhirl'
  version: '0.1.0'
```

Categories: ACCOUNTING, PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: API Key

> Authenticate with your Paywhirl API Key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_key` | string | yes |  | API Key. Your Paywhirl API Key. |
| `api_secret` | string | yes |  | API Secret. Your Paywhirl API Secret. |

## Actions

### `cancelSubscription`

**Cancel Subscription.** Cancels a PayWhirl subscription so it stops billing the customer. Target the subscription either by its subscription ID or by customer ID (one of the two is required). Use when ending recurring billing for a customer. Not idempotent: this mutates billing state, so guard against repeated calls. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_id` | number | no |  | Subscription ID. Subscription ID. |
| `customer_id` | string | no |  | Customer ID. Customer ID (can be used instead of subscription_id) |

### `createCustomer`

**Create Customer.** Creates a new PayWhirl customer record. Required first name, last name, email, and currency code; optional address, payment gateway, and UTM attribution fields. Use this before subscribing a customer to a plan. Not idempotent: each call creates a separate customer, so re-running duplicates the record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. First name. |
| `last_name` | string | yes |  | Last Name. Last name. |
| `email` | string | yes |  | Email. Email address. |
| `currency` | string | yes |  | Currency. Currency code (ex. USD, GBP, AUD, CAD, EUR, etc) |
| `password` | string | no |  | Password. Password (leave blank to let customer assign via secure link in welcome email) |
| `phone` | number | no |  | Phone Number. Phone number. |
| `address` | string | no |  | Street Address. Street address. |
| `city` | string | no |  | City. City. |
| `state` | string | no |  | State / Region. State / Region. |
| `zip` | string | no |  | Zip / Postal Code. Zip / Postal Code. |
| `country` | string | no |  | Country Code. Country Code (ex. US, GB, CA, AU, etc) |
| `gateway_id` | string | no |  | Payment Gateway ID. PayWhirl ID of payment gateway to attach to customer. If left blank, first loaded gateway will be used. |
| `utm_source` | string | no |  | UTM Source. Acquisition source (ex. google, bing, email, fall_campaign, etc) |
| `utm_medium` | string | no |  | UTM Medium. Acquisition medium (ex. CPC, banner, text_ad, etc) |
| `utm_term` | string | no |  | UTM Term. Acquisition keyword. |
| `utm_content` | string | no |  | UTM Content. Acquisition Ad Content. |
| `utm_campaign` | string | no |  | UTM Campaign. Acquisition Ad Campaign. |
| `utm_group` | string | no |  | UTM Group. Acquisition Ad Group. |

### `getCustomer`

**Get Customers.** Lists PayWhirl customers, returning all customers by default or narrowing the set with an optional keyword filter plus pagination (limit, before/after ID) and sort controls. Use to look up or enumerate customers. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Number of entries to return. Limit 100. |
| `order_key` | string | no |  | Order Key. Field to sort by. Default: id. |
| `order_direction` | string | no |  | Order Direction. Direction to order results. One of `"asc"`, `"desc"`. |
| `before_id` | number | no |  | Before ID. All customers returned will have an ID less than this value. |
| `after_id` | number | no |  | After ID. All customers returned will have an ID greater than this value. |
| `keyword` | string | no |  | Keyword. Filter by keyword. |

### `searchCustomersSubscription`

**Get Customer Subscriptions.** Lists a specific customer's subscriptions, filterable by status (active only by default, canceled only, or all). Requires the customer ID. Use to inspect which plans a customer is enrolled in. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | number | yes |  | Customer ID. Customer ID. |
| `status` | string | no |  | Status. Filter by subscription status. Active (default) excludes canceled; Canceled shows only canceled; All shows all subscriptions. One of `"active"`, `"canceled"`, `"all"`. |

### `subscribeCustomer`

**Subscribe Customer.** Enrolls an existing customer into an existing plan, creating a recurring subscription. Requires customer ID and plan ID; optionally set a trial end timestamp, promo code, or quantity. The customer must already have a valid payment method on file. Use to start recurring billing. Not idempotent: each call creates another subscription. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | number | yes |  | Customer ID. Customer ID. |
| `plan_id` | number | yes |  | Plan ID. Plan ID. |
| `trial_end` | number | no |  | Trial End. UNIX timestamp in the future (UTC timezone) |
| `promo_id` | number | no |  | Promo ID. ID of promo code to apply. |
| `quantity` | number | no |  | Quantity. Quantity (Default: 1) |

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
