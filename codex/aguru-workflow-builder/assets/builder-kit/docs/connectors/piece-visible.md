# Visible

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-visible'
  version: '0.0.9'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Access Token

> Enter your Visible access token.

## Actions

### `create_portfolio_company`

**Create Portfolio Company.** Creates a new portfolio company profile in Visible. Use to onboard a company before adding its metrics or contacts. Requires a company ID and name; optionally website URL, currency, and a primary contact ID. Not idempotent: this is a create-only operation, so repeating it adds another company profile. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company ID. |
| `name` | string | yes |  | Name. |
| `websiteUrl` | string | no |  | Website URL. |
| `currency` | string | no |  | Currency. |
| `primaryContactId` | string | no |  | Primary Contact ID. |

### `create_or_update_contact`

**Create or Update Contact.** Upserts a contact in Visible: creates a new contact, or updates the existing one matched on the provided email address. Use to ensure a person exists under a company without first checking. Requires the email and the company ID; optional name, title, and contact list IDs. Idempotent because the email is the stable match key, so repeating the same input converges to the same contact. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `companyId` | string | yes |  | Company ID. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `title` | string | no |  | Title. |
| `contactListIds` | array | no | `[]` | Contact List IDs. |

### `create_metric`

**Create Metric.** Creates a new metric (a named, recurring data series with a reporting frequency and unit) for a Visible portfolio company. Use to register a KPI before reporting values against it. Requires the target company ID, a name, a frequency (daily, weekly, monthly, or quarterly), and a unit. Not idempotent: each call creates another metric even with identical inputs. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company ID. |
| `name` | string | yes |  | Name. |
| `frequency` | string | yes |  | Frequency. One of `"daily"`, `"weekly"`, `"monthly"`, `"quarterly"`. |
| `unit` | string | yes |  | Unit. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to any Visible endpoint.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes |  | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | yes |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | yes |  | Query Parameters. |
| `body_type` | string | no | `"none"` | Body Type. One of `"none"`, `"json"`, `"form_data"`, `"raw"`. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary ?. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | No Error on Failure. |
| `timeout` | number | no |  | Timeout (in seconds). |
| `followRedirects` | boolean | no | `false` | Follow redirects. |
