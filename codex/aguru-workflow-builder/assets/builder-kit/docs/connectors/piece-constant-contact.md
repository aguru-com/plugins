# Constant Contact

Email marketing for small businesses

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-constant-contact'
  version: '0.3.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_or_update_contact`

**Create or Update Contact.** Creates a contact in Constant Contact or updates the existing one matching the email address, and adds it to one or more contact lists. Use this to add subscribers or keep contact details and list memberships in sync. The email address is required and is the key the upsert matches on, so repeating the call with the same email updates rather than duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | array | yes |  | List. The list of the contact. Values the product loads from the provider, such as ids; write an array of them. |
| `email_address` | string | yes |  | Email. The email of the contact. |
| `first_name` | string | no |  | First Name. The first name of the contact. |
| `last_name` | string | no |  | Last Name. The last name of the contact. |
| `job_title` | string | no |  | Job Title. The job title of the contact. |
| `company_name` | string | no |  | Company Name. The company name of the contact. |
| `phoner_number` | string | no |  | Phone Number. The phone number of the contact. |

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
