# VideoAsk

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-videoask'
  version: '0.2.0'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

>

## Actions

### `addTagToContact`

**Add tag to contact.** Attach an existing tag to a VideoAsk contact (respondent), identified by its contact ID and the tag ID, within a given organization. Use to label or segment a respondent for downstream filtering. Idempotent: re-adding the same tag leaves the contact in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | string | yes |  | Organization ID. Select the organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact ID. The contact (respondent) id to add the tag to. |
| `tagId` | string | yes |  | Tag ID. Select the tag. A value the product loads from the provider, such as an id; write the value itself. |

### `createContact`

**create contact.** Create a new VideoAsk contact (respondent) in an organization; email is required, name and phone optional. Use when you need to register a respondent record. Not idempotent: each call creates a separate contact, with no dedup on email. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | string | yes |  | Organization ID. Select the organization. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. The name of the contact. |
| `email` | string | yes |  | Email. The email of the contact. |
| `phone_number` | string | no |  | Phone. The phone number of the contact. |

### `removeTagFromContact`

**Remove tag from contact.** Detach a tag from a VideoAsk contact (respondent), identified by its contact ID and the tag ID, within a given organization. Use to unlabel or re-segment a respondent. Idempotent: removing a tag that is not present leaves the contact in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | string | yes |  | Organization ID. Select the organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact ID. The contact (respondent) id to remove the tag from. |
| `tagId` | string | yes |  | Tag ID. Select the tag. A value the product loads from the provider, such as an id; write the value itself. |

### `searchForm`

**Search form by keyword(s).** Search an organization's VideoAsk forms by keyword matched against form titles, returning up to a configurable limit. Use to resolve a form name to its ID or discover available forms before referencing one. Read-only and idempotent. The search term is required. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | string | yes |  | Organization ID. Select the organization. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `100` | Limit. Maximum number of results to return. |
| `search` | string | yes |  | Search term. Keyword(s) to search for in form titles. |

### `updateContact`

**Update contact.** Update an existing VideoAsk respondent (contact), identified by respondent ID, within an organization; only the name, email, and phone fields you supply are changed and empty values are skipped. Use to correct or enrich a known contact. Idempotent: repeating with the same values yields the same record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | string | yes |  | Organization ID. Select the organization. A value the product loads from the provider, such as an id; write the value itself. |
| `respondentId` | string | yes |  | Respondent ID. The ID of the respondent to update. |
| `name` | string | no |  | Name. The name of the contact. |
| `email` | string | no |  | Email. The email of the contact. |
| `phone_number` | string | no |  | Phone. The phone number of the contact. |

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
| `organizationId` | string | yes |  | Organization ID. Select the organization. A value the product loads from the provider, such as an id; write the value itself. |
