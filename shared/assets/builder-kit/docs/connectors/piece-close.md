# Close

Sales automation and CRM integration for Close

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-close'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Close CRM API key for authentication.

## Actions

### `create_lead`

**Create Lead.** Creates a new lead (company/account) in Close CRM, optionally with an inline list of contacts, custom fields, and an initial status. Use to add a prospect or account to the CRM. Each call creates a separate lead, so it is not idempotent; repeated calls produce duplicates. Lead name is required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Lead Name. The name of the lead/company. |
| `url` | string | no |  | URL. |
| `description` | string | no |  | Description. |
| `contacts` | array | no |  | Contacts. Array of contact details for this lead. Each item: { `name`, `title`?, `officePhone`?, `mobilePhone`?, `homePhone`?, `directPhone`?, `faxPhone`?, `otherPhone`?, `officeEmail`?, `homeEmail`?, `directEmail`?, `otherEmail`?, `url`? }. |
| `statusId` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `customFields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `create_contact`

**Create Contact.** Creates a new contact attached to an existing lead in Close CRM, with optional phones, emails, URL, and custom fields. Use to add a person to a known lead. Requires the target lead ID and a contact name. Not idempotent; each call creates a new contact and repeating produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | no |  | Lead. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. |
| `title` | string | no |  | Title. |
| `officePhone` | string | no |  | Office Phone. |
| `mobilePhone` | string | no |  | Mobile Phone. |
| `homePhone` | string | no |  | Home Phone. |
| `directPhone` | string | no |  | Direct Phone. |
| `faxPhone` | string | no |  | Fax Phone. |
| `otherPhone` | string | no |  | Other Phone. |
| `officeEmail` | string | no |  | Office Email. |
| `homeEmail` | string | no |  | Home Email. |
| `directEmail` | string | no |  | Direct Email. |
| `otherEmail` | string | no |  | Other Email. |
| `url` | string | no |  | URL. |
| `customFields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `find_lead`

**Find Lead.** Searches leads in Close CRM and returns all matching records (auto-paginated). The search type selects which field to match on — lead name, a related contact email, or status label — and the match mode controls how the query string is compared. Use to look up leads by a known attribute before creating or updating related records. Read-only and idempotent. Requires a search query value. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_type` | string | yes |  | Search Type. One of `"name"`, `"contact_email"`, `"status"`. |
| `search_query` | string | yes |  | Search Query. |
| `match_type` | string | no | `"contains"` | Match Type. One of `"contains"`, `"exact"`, `"starts"`, `"ends"`. |

### `create_opportunity`

**Create Opportunity.** Creates a new opportunity (deal) on an existing lead in Close CRM, with optional value, value period, confidence, status, contact, and custom fields. Use to log a sales deal against a lead. Requires the lead ID and an opportunity status. Not idempotent; each call creates a separate opportunity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | no |  | Lead. A value the product loads from the provider, such as an id; write the value itself. |
| `status_id` | string | yes |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Opportunity Name. A descriptive name for the opportunity. |
| `note` | string | no |  | Notes. Additional details about the opportunity. |
| `confidence` | number | no |  | Confidence %. The probability of winning this opportunity (0-100). |
| `value` | number | no |  | Value. |
| `value_period` | string | no | `"one_time"` | Value Period. The period for the opportunity value. One of `"one_time"`, `"monthly"`, `"annual"`. |
| `contact_id` | string | no |  | Contact ID. The ID of the contact associated with this opportunity. |
| `user_id` | string | no |  | User. A value the product loads from the provider, such as an id; write the value itself. |
| `custom_fields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `find_contact`

**Find Contact.** Searches contacts in Close CRM and returns all matching records (auto-paginated). The search type selects which field to match on — contact name, email, phone, or parent lead ID — and the match mode controls comparison. Use to resolve a contact by a known attribute (e.g. find a contact ID before attaching an opportunity). Read-only and idempotent. Requires a search query value. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_type` | string | yes |  | Search Type. One of `"name"`, `"email"`, `"phone"`, `"lead_id"`. |
| `search_query` | string | yes |  | Search Query. |
| `match_type` | string | no | `"contains"` | Match Type. One of `"contains"`, `"exact"`, `"starts"`, `"ends"`. |

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
