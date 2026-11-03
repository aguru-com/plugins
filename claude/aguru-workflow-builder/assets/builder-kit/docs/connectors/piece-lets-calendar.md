# Let's Calendar

Let's Calendar is a powerful calendar management tool that helps you organize your schedule, set reminders, and share events with ease.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lets-calendar'
  version: '0.1.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: API Key

> Authenticate with your Let's Calendar API Key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `client_key` | string | yes |  | Client Key. Your Let's Calendar Client Key. |
| `secret_key` | string | yes |  | Client Secret. Your Let's Calendar Client Secret. |

## Actions

### `addContactToCampaign`

**Add Contact to Campaign.** Adds one contact (first name and email required, with optional last name, login URL, username, and password) to a specific Let's Calendar campaign identified by its campaign ID. Use to enroll a person into an existing campaign. Not idempotent: each call appends the contact again, so repeating it may create duplicate entries. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. The unique identifier of the campaign. |
| `firstname` | string | yes |  | First Name. The first name of the contact (max 150 characters) |
| `lastname` | string | no |  | Last Name. The last name of the contact (max 150 characters) |
| `email` | string | yes |  | Email. A valid email address (max 150 characters) |
| `loginurl` | string | no |  | Login URL. The login URL for the contact. |
| `username` | string | no |  | Username. The username for the contact. |
| `password` | string | no |  | Password. The password for the contact. |

### `custom_api_call`

**Custom API Call.** Make custom API calls to Let's Calendar. Note: An access token must first be generated using your client key and secret key via the /access_token endpoint. This access token is then used to authenticate all subsequent API requests by adding it to the Authorization header as 'Bearer ${accessToken}'. Needs authentication.

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
