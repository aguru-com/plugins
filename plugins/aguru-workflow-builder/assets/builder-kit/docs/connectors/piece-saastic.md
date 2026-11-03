# Saastic

Revenue and churn analytics for Stripe

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-saastic'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Api Key

> You can find your project’s API key here: https://saastic.com/settings/developers

## Actions

### `create_customer`

**Create or Update a Customer.** Upserts a customer record in Saastic (the analytics layer over Stripe), keyed on email: creates the customer if the email is new, otherwise updates the existing record with the supplied name, phone, and signup date. Use to register or refresh customer details before attributing charges. Idempotent — repeating with the same email and fields leaves the customer in the same state. Requires a valid email. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The customer's first name. |
| `last_name` | string | yes |  | Last Name. The customer's last name. |
| `email` | string | yes |  | Email. The customer's email address. |
| `phone` | string | no |  | Phone. The customer's phone number. Ex: +15555555555. |
| `signed_up_at` | ISO date-time string | no |  | Signup Date. The date the customer signed up. |

### `create_charge`

**Create a Customer Charge.** Records a charge against a customer in Saastic (revenue/churn analytics over Stripe), identifying the customer by email and logging an amount in the smallest currency unit. Use to feed revenue events into Saastic analytics. Not idempotent — each call appends a new charge, so repeating the same input records duplicate charges. Requires a valid customer email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The customer's email address. |
| `amount` | number | no |  | Amount. The amount charged in the smallest currency unit. |
| `currency` | string | no | `"USD"` | Currency. The ISO currency code. |
| `charged_at` | ISO date-time string | no |  | Charge date. The date the customer was charged. |

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
