# Twenty

Open-source CRM platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-twenty'
  version: '0.1.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect to your Twenty CRM instance.
>
> 1. Log in to your Twenty workspace.
> 2. Go to **Settings** → **APIs & Webhooks**.
> 3. Click **+ Create API key**, give it a name (e.g. "Activepieces"), and copy the generated key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Instance URL. The URL of your Twenty instance (e.g. https://app.twenty.com). |
| `api_key` | string | yes |  | API Key. |

## Actions

### `create_contact`

**Create Contact.** Creates a new person (contact) in Twenty CRM. Use when adding a known individual to the CRM; first name is required, last name and primary email are optional. Not idempotent: each call inserts a new record with no de-duplication, so repeated calls create duplicate people. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |

### `create_company`

**Create Company.** Creates a new company in Twenty CRM. Use when adding an organization to the CRM; company name is required, with optional domain, address, and employee count. Not idempotent: each call inserts a new record with no de-duplication, so repeated calls create duplicate companies. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Company Name. |
| `domainName` | string | no |  | Domain Name. The company website domain (e.g. acme.com). |
| `address` | string | no |  | Address. |
| `employees` | number | no |  | Number of Employees. |

### `create_opportunity`

**Create Opportunity.** Creates a new opportunity (sales deal) in Twenty CRM. Use when registering a deal to track; only the opportunity name is required, with optional stage, amount, currency, close date, and a company ID to link it to an existing company. Not idempotent: each call inserts a new deal, so repeated calls create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Opportunity Name. |
| `stage` | string | no |  | Stage. The current stage of the opportunity. One of `"INCOMING"`, `"QUALIFYING"`, `"MEETING"`, `"PROPOSAL"`, `"WON"`, `"LOST"`. |
| `amount` | number | no |  | Amount. The monetary value of the deal. |
| `currency` | string | no | `"USD"` | Currency Code. ISO 4217 currency code (e.g. USD, EUR, GBP). |
| `closeDate` | string | no |  | Close Date. Expected close date (e.g. 2026-06-30). |
| `companyId` | string | no |  | Company ID. The ID of the company associated with this opportunity. |

### `find_person`

**Find Person.** Looks up person records in Twenty CRM, optionally filtering by an exact-match email, first name, and/or last name. Use to resolve a person to their record ID before updating, or to check existence; leaving all filters empty returns all people. Idempotent: a read-only query with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Filter by email address. |
| `firstName` | string | no |  | First Name. Filter by first name. |
| `lastName` | string | no |  | Last Name. Filter by last name. |

### `find_company`

**Find Company.** Looks up company records in Twenty CRM, optionally filtering by an exact-match company name and/or domain. Use to resolve a company to its record ID before updating or linking, or to check existence; leaving both filters empty returns all companies. Idempotent: a read-only query with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Company Name. Filter by company name. |
| `domainName` | string | no |  | Domain Name. Filter by domain (e.g. acme.com). |

### `update_person`

**Update Person.** Updates an existing person in Twenty CRM, identified by the required person ID (resolve it first with Find Person). Patches only the supplied first name, last name, and/or email, merging name changes with the current record; if no fields are given it simply returns the current record. Idempotent: targets a fixed ID and re-applying the same field values leaves the record unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | string | yes |  | Person ID. The ID of the person to update. Use the "Find Person" action to look this up. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |

### `update_company`

**Update Company.** Updates an existing company in Twenty CRM, identified by the required company ID (resolve it first with Find Company). Patches only the supplied name, domain, address, and/or employee count; if no fields are given it simply returns the current record. Idempotent: targets a fixed ID and re-applying the same field values leaves the record unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company ID. The ID of the company to update. Use the "Find Company" action to look this up. |
| `name` | string | no |  | Company Name. |
| `domainName` | string | no |  | Domain Name. The company website domain (e.g. acme.com). |
| `address` | string | no |  | Address. |
| `employees` | number | no |  | Number of Employees. |

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
