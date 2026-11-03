# Baremetrics

Analytics and metrics platform for subscription businesses. Create customers, plans, and subscriptions to track your revenue and customer data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-baremetrics'
  version: '0.0.9'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Baremetrics account using OAuth2. Requires approval from Baremetrics support to get Client ID and Client Secret.

### `SECRET_TEXT`: API Key

> API key found in Baremetrics Settings area

## Actions

### `create_customer`

**Create Customer.** Creates a customer under a Baremetrics data source, keyed on your own unique customer ID (oid); pick the source from the connected providers. Use to register a customer before attaching subscriptions. Idempotent: the source treats oid as the unique key, so re-running with the same oid updates that customer rather than creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_id` | string | yes |  | Source. Select the data source (Payment Provider or API) A value the product loads from the provider, such as an id; write the value itself. |
| `oid` | string | yes |  | Customer ID. Your unique ID for this customer. |
| `name` | string | no |  | Name. Customer name. |
| `email` | string | no |  | Email. Email address for profile information lookup. |
| `notes` | string | no |  | Notes. Your own notes for this customer. |
| `created` | ISO date-time string | no |  | Created Date. When this customer was created (defaults to now) |

### `create_plan`

**Create Plan.** Creates a billing plan under a Baremetrics data source, keyed on your own unique plan ID (oid), with currency, amount (in cents), and billing interval. Use to define a plan before creating subscriptions against it. Idempotent: the source treats oid as the unique key, so re-running with the same oid updates that plan rather than creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_id` | string | yes |  | Source. Select the data source (Payment Provider or API) A value the product loads from the provider, such as an id; write the value itself. |
| `oid` | string | yes |  | Plan ID. Your unique ID for this plan. |
| `name` | string | yes |  | Plan Name. Your internal name for this plan. This will be displayed in the Plan Breakout section. |
| `currency` | string | yes |  | Currency. The ISO code of the currency of this plan (e.g., USD) |
| `amount` | number | yes |  | Amount. How much is this plan? (In cents) |
| `interval` | string | yes |  | Interval. Billing interval. One of `"day"`, `"month"`, `"year"`. |
| `interval_count` | number | yes |  | Interval Count. Number of intervals between billings (e.g., 1 for every month, 3 for every 3 months) |
| `trial_duration` | number | no |  | Trial Duration. The duration of this trial. |
| `trial_duration_unit` | string | no |  | Trial Duration Unit. Unit for trial duration. One of `"day"`, `"month"`, `"year"`. |

### `create_subscription`

**Create Subscription.** Creates a subscription linking an existing customer to an existing plan under a Baremetrics data source, keyed on your own unique subscription ID (oid). Requires the customer and plan to already exist in that source. Idempotent: the source treats oid as the unique key, so re-running with the same oid updates that subscription rather than creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_id` | string | yes |  | Source. Select the data source (Payment Provider or API) A value the product loads from the provider, such as an id; write the value itself. |
| `oid` | string | yes |  | Subscription ID. Your unique ID for this subscription. |
| `started_at` | ISO date-time string | yes |  | Start Date. When this subscription started. |
| `canceled_at` | ISO date-time string | no |  | Cancellation Date. When this subscription was or should be canceled (optional) |
| `customer_oid` | string | yes |  | Customer. Select the customer for this subscription. A value the product loads from the provider, such as an id; write the value itself. |
| `plan_oid` | string | yes |  | Plan. Select the plan for this subscription. A value the product loads from the provider, such as an id; write the value itself. |
| `quantity` | number | no | `1` | Quantity. Number of subscriptions. |
| `discount` | number | no |  | Discount. Discount amount (in the same currency as the plan) |
| `addons` | array | no |  | Addons. Additional charges to add to the base plan. Each item: { `oid`, `amount`, `quantity` }. |

### `update_customer`

**Update Customer.** Updates an existing customer (name, email, notes, created date) identified by its customer_oid within a Baremetrics data source; only provided fields are changed. Use to amend customer details rather than register a new one. Idempotent: repeating with the same input leaves the customer in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_id` | string | yes |  | Source. Select the data source (Payment Provider or API) A value the product loads from the provider, such as an id; write the value itself. |
| `customer_oid` | string | yes |  | Customer. Select the customer to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Customer name. |
| `email` | string | no |  | Email. Email address for this customer. |
| `notes` | string | no |  | Notes. Your own notes for this customer. |
| `created` | ISO date-time string | no |  | Created Date. Unix timestamp of when this customer was created. |
