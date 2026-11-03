# Uscreen

All-in-one video monetization platform for creating, hosting, and selling online courses, memberships, and video content.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-uscreen'
  version: '0.2.0'
```

Categories: COMMERCE, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your Uscreen account
> 2. Contact your Customer Success Manager to have an API key (X-Store-Token) issued.

## Actions

### `create_user`

**Create User.** Creates a new customer account on the Uscreen storefront from an email and name, optionally setting a password (omit to send an invite email) and arbitrary storefront-defined custom fields. Use to onboard a viewer or subscriber. Not idempotent: each call creates another account, so guard against duplicate emails. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The new user's email address. |
| `first_name` | string | yes |  | First Name. The new user's first name. |
| `last_name` | string | yes |  | Last Name. The new user's last name. |
| `password` | string | no |  | Password. The new user's password. Leave blank if sending an invite email. |
| `opted_in_for_news_and_updates` | boolean | no | `true` | Opted in for News and Updates. If set to true, the new user will receive news and updates. |
| `custom_fields` | object | no |  | Custom Fields. Add custom user fields defined in your storefront (e.g., "favorite_genre"). An object whose fields depend on other inputs; the product shows them. |

### `assign_user_access`

**Assign User Access.** Grants a customer access to a product on Uscreen, where the product type is either a program (bundle) or an offer (subscription); creating the customer if they do not already exist. Use to provision or comp content access. Access can be scheduled for a future ISO 8601 time instead of granted immediately. Not idempotent: each call grants another access entry. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_id` | string | yes |  | Customer ID or Email. The unique ID or email address of the customer. A value the product loads from the provider, such as an id; write the value itself. |
| `productType` | string | yes |  | Product Type. The type of product to assign. One of `"program"`, `"offer"`. |
| `product_id` | string | yes |  | Product. The bundle (program) or subscription (offer) to assign. A value the product loads from the provider, such as an id; write the value itself. |
| `perform_action_at` | string | no |  | Schedule Access (Optional). Schedule a time for the action to be performed (ISO 8601 format, e.g., 2024-07-05T13:47:52Z). Leave blank to assign immediately. |
| `with_manual_billing` | boolean | no | `false` | Manual Billing (for Offers). Only check this if the Product Type is "Offer" and this is a manual billing scenario. |

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
