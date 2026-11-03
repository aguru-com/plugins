# Kommo

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-kommo'
  version: '0.2.1'
```

Categories: COMMUNICATION, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Please follow [Generate Long Live Token](https://developers.kommo.com/docs/long-lived-token) guide for generating token.
>
> Your Kommo account subdomain (e.g., "mycompany" if your URL is mycompany.kommo.com).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subdomain` | string | yes |  | Subdomain. |
| `apiToken` | string | yes |  | Token. |

## Actions

### `find_lead`

**Find Lead.** Searches leads in a Kommo CRM account by a free-text query matched against the leads' filled fields, returning all matching leads. Use to look up a lead (e.g. by name, contact info, or other field content) before referencing, updating, or reporting on it; the query is required. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search query (Searches through the filled fields of the lead). |

### `update_contact`

**Update Contact.** Updates an existing Kommo CRM contact identified by contact ID, changing only the supplied fields (name, email/phone, responsible user) and adding or removing tags. Use to amend a known contact; resolve the contact ID first via Find Contact if unknown. Idempotent — repeating the same update yields the same contact state, though tag add/delete depends on the current tag set. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | no |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Full Name. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `responsible_user_id` | string | no |  | Unique identified of a responsible user. A value the product loads from the provider, such as an id; write the value itself. |
| `tags_to_add` | array | no |  | Tags to Add. List of tag names or IDs to add. |
| `tags_to_delete` | array | no |  | Tags to Delete. List of tag names or IDs to remove. |

### `create_lead`

**Create New Lead.** Creates a new lead (deal) in a Kommo CRM account with name, optional price, pipeline/status, responsible user, loss reason, and tags. Use when registering a new sales opportunity. Not idempotent — each call creates a separate lead even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Lead Name. |
| `price` | number | no |  | Price. |
| `pipelineId` | string | yes |  | Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `statusId` | string | yes |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `responsible_user_id` | string | no |  | Unique identified of a responsible user. A value the product loads from the provider, such as an id; write the value itself. |
| `loss_reason_id` | string | no |  | Loss Reason. A value the product loads from the provider, such as an id; write the value itself. |
| `tags_to_add` | array | no |  | Tags to Add. List of tags to add. |

### `update_lead`

**Update Lead.** Updates an existing Kommo CRM lead (deal) identified by lead ID, changing only the supplied fields (name, price, pipeline/status, responsible user, loss reason) and adding or removing tags. Use to move a lead through its pipeline or amend its details; resolve the lead ID first via Find Lead if unknown. Idempotent — repeating the same update yields the same lead state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `price` | number | no |  | Price. |
| `pipelineId` | string | no |  | Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `statusId` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `responsible_user_id` | string | no |  | Unique identified of a responsible user. A value the product loads from the provider, such as an id; write the value itself. |
| `loss_reason_id` | string | no |  | Loss Reason. A value the product loads from the provider, such as an id; write the value itself. |
| `tags_to_add` | array | no |  | Tags to Add. |
| `tags_to_delete` | array | no |  | Tags to Delete. |

### `create_contact`

**Create New Contact.** Creates a new contact in a Kommo CRM account with name, optional email/phone (stored as custom fields), responsible user, and tags. Use when adding a person not already in the CRM; consider finding the contact first to avoid duplicates. Not idempotent — each call creates a separate contact even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Full Name. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. |
| `responsible_user_id` | string | no |  | Unique identified of a responsible user. A value the product loads from the provider, such as an id; write the value itself. |
| `tags_to_add` | array | no |  | Tags to Add. |

### `find_contact`

**Find Contact.** Searches contacts in a Kommo CRM account by a free-text query matched against the contacts' filled fields, returning all matching contacts. Use to resolve a contact (e.g. by name, email, or phone) before referencing or updating it; the query is required. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search query (Searches through the filled fields of the contact). |

### `find_company`

**Find Company.** Searches companies in a Kommo CRM account by a free-text query matched against the companies' filled fields, returning all matching companies. Use to resolve a company record (e.g. by name) before referencing or linking it; the query is required. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search query (Searches through the filled fields of the company). |

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
