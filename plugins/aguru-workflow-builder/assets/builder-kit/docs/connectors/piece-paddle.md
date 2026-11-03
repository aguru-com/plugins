# Paddle

Manage customers, subscriptions, and recurring billing with Paddle Billing.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-paddle'
  version: '0.1.0'
```

Categories: COMMERCE, PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Authenticate with a Paddle API key.
>
> Live and sandbox keys are supported automatically.
>
> You can create API keys from **Developer Tools > Authentication** in the Paddle dashboard.

## Actions

### `list-customers`

**List Customers.** Lists customers in a Paddle Billing account, returning all customers by default or filtering when an exact email and/or status (active/archived) is supplied. Use to look up a customer or enumerate the customer base; the email filter matches exactly, not partially. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Optionally filter customers by exact email address. |
| `status` | string | no |  | Status. Optionally filter customers by status. One of `"active"`, `"archived"`. |
| `limit` | number | no |  | Limit. Maximum number of customers to return. |

### `get-subscription`

**Get Subscription.** Fetches a single Paddle subscription by its subscription ID (sub_...) to inspect its status, items, and customer. Use when you already have the subscription ID and need its current details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription. Select the Paddle subscription to use. A value the product loads from the provider, such as an id; write the value itself. |

### `update-subscription`

**Update Subscription.** Updates an existing Paddle subscription by ID, replacing its recurring item (price and quantity) and optionally setting custom data; the proration billing mode controls how the change is charged (immediately vs. next billing period, prorated or full, or not billed). Use to change a plan, quantity, or metadata on a live subscription. The items you send replace the subscription's recurring items rather than merge, and the call mutates the subscription on each run, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription. Select the Paddle subscription to use. A value the product loads from the provider, such as an id; write the value itself. |
| `priceId` | string | yes |  | Recurring Price. Select an active recurring Paddle price. A value the product loads from the provider, such as an id; write the value itself. |
| `quantity` | number | no |  | Quantity. Optional quantity for the recurring price. |
| `prorationBillingMode` | string | no |  | Proration Billing Mode. How Paddle should bill for the subscription change. One of `"prorated_immediately"`, `"full_immediately"`, `"prorated_next_billing_period"`, `"full_next_billing_period"`, `"do_not_bill"`. |
| `customData` | JSON | no |  | Custom Data. Optional JSON object to store on the subscription. |

### `cancel-subscription`

**Cancel Subscription.** Cancels a Paddle subscription by ID, applying the cancellation either immediately or at the end of the current billing period via the effective-from option. Use to end a subscription; this changes billing state and is not idempotent (repeating it on an already-canceled subscription will error or re-apply). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription. Select the Paddle subscription to use. A value the product loads from the provider, such as an id; write the value itself. |
| `effectiveFrom` | string | no |  | Effective From. Choose when Paddle should apply the cancellation. One of `"immediately"`, `"next_billing_period"`. |

### `create-transaction`

**Create Transaction.** Creates a new Paddle transaction for a customer against a recurring price (with optional quantity and custom data); since the price is recurring, completing the transaction begins the associated subscription. Requires a valid customer ID, billing address ID, and recurring price ID. Each call creates a separate transaction, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer. Select the Paddle customer to use. A value the product loads from the provider, such as an id; write the value itself. |
| `addressId` | string | yes |  | Address. Select the Paddle address to bill against. A value the product loads from the provider, such as an id; write the value itself. |
| `priceId` | string | yes |  | Recurring Price. Select an active recurring Paddle price. A value the product loads from the provider, such as an id; write the value itself. |
| `quantity` | number | no |  | Quantity. Optional quantity for the recurring price. |
| `customData` | JSON | no |  | Custom Data. Optional JSON object to store on the transaction. |

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
