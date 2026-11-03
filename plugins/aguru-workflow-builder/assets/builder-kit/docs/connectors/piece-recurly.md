# Recurly

Manage subscriptions, billing accounts, and recurring revenue with Recurly.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-recurly'
  version: '0.1.0'
```

Categories: COMMERCE, PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [Developer Settings](https://app.recurly.com/go/developer/api_keys).

## Actions

### `create_account`

**Create Account.** Creates a new billing account in Recurly to represent a customer, identified by a unique account code you supply. Use before creating subscriptions, since a subscription must be attached to an existing account. Not idempotent: each call attempts to create a new account, and reusing an account code that already exists will fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | yes |  | Account Code. A unique account code for this customer, for example acme-123. |
| `email` | string | yes |  | Email. The primary email address for the billing account. |
| `firstName` | string | no |  | First Name. The customer’s first name. |
| `lastName` | string | no |  | Last Name. The customer’s last name. |
| `company` | string | no |  | Company. The company name for this billing account. |

### `create_subscription`

**Create Subscription.** Starts a new recurring subscription on a given plan for an existing Recurly account, billing in the specified currency. Use to begin charging a customer; the account and plan must already exist (referenced by their codes). Not idempotent: each call creates and begins billing a separate subscription. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountCode` | string | yes |  | Account. Select the account that should own the subscription. A value the product loads from the provider, such as an id; write the value itself. |
| `planCode` | string | yes |  | Plan. Select the plan for the new subscription. A value the product loads from the provider, such as an id; write the value itself. |
| `currency` | string | yes | `"USD"` | Currency. The 3-letter ISO currency code to bill in, for example USD. |
| `quantity` | number | no | `1` | Quantity. The subscription quantity. Leave at 1 for standard subscriptions. |

### `get_account`

**Get Account.** Retrieves the full details of a single Recurly billing account by its account code. Use to look up a customer record or confirm an account exists before acting on it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountCode` | string | yes |  | Account. Select the account you want to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

### `list_subscriptions`

**List Subscriptions.** Lists subscriptions in Recurly, optionally scoped to a single account and/or filtered by state (active, canceled, expired, future, paused, or all when state is left empty). Use to find subscriptions or check what a customer is subscribed to; leaving the account code empty lists across all accounts. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountCode` | string | no |  | Account. Optionally select an account to list only that account’s subscriptions. A value the product loads from the provider, such as an id; write the value itself. |
| `state` | string | no | `"active"` | Subscription State. Filter subscriptions by state. One of `"active"`, `"canceled"`, `"expired"`, `"future"`, `"paused"`, `""`. |
| `limit` | number | no | `50` | Limit. The maximum number of subscriptions to return. |

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
