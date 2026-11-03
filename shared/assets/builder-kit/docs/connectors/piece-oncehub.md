# Oncehub

Build meaningful on-brand scheduling experiences with OnceHubs online appointment booking software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-oncehub'
  version: '0.2.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Oncehub API Key

## Actions

### `findContact`

**Find Contact.** Look up existing OnceHub contacts filtered by email address. Use to check whether a contact already exists or to retrieve a contact before referencing it elsewhere. Read-only and repeatable; the email filter is required. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Filter contacts by email address. |

### `createContact`

**Create Contact.** Create a new contact record in OnceHub with name, contact details, company, and status fields. First name and last name are required, plus at least one of email or mobile phone. Not idempotent: each call creates another contact, so look up the contact first if you need to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. First name of the contact. |
| `last_name` | string | yes |  | Last Name. Last name of the contact. |
| `email` | string | no |  | Email. Email address of the contact (at least email or mobile_phone required) |
| `mobile_phone` | string | no |  | Mobile Phone. Mobile phone number in E.164 format (at least email or mobile_phone required) |
| `phone` | string | no |  | Phone. Phone number in E.164 format. |
| `company` | string | no |  | Company. Company name. |
| `job_title` | string | no |  | Job Title. Job title of the contact. |
| `street_address` | string | no |  | Street Address. Street address. |
| `city` | string | no |  | City. City of the contact. |
| `state` | string | no |  | State. State or province. |
| `post_code` | string | no |  | Postal Code. Postal code. |
| `country` | string | no |  | Country. Country of the contact. |
| `company_size` | string | no |  | Company Size. Size of the contact's company. |
| `employees` | number | no |  | Employees. Number of employees. |
| `salutation` | string | no |  | Salutation. Salutation (e.g., Mr., Ms., Dr.) |
| `status` | string | no |  | Status. Status of the contact. One of `"Qualified"`, `"Sales qualified"`, `"Marketing qualified"`, `"Disqualified"`. |

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
