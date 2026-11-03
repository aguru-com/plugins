# Smaily

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-smaily'
  version: '0.2.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> 1. Click on profile pic (top right corner), navigate to **Preferences**.
> 2. Go to **Integrations** tab and click on **Create a New User**.
> 3. Copy generated domain, user and password.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. |
| `username` | string | yes |  | User Name. |
| `password` | string | yes |  | Password. |

## Actions

### `create-or-update-subscriber`

**Create or Update Subscriber.** Upsert a subscriber in a Smaily account, keyed on the email address: creates the contact if the email is new, otherwise updates the existing one (including subscription status and custom fields). Use to add or sync contact data. Idempotent — repeating the same input leaves the subscriber in the same state rather than creating duplicates. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `is_unsubscribed` | string | yes | `0` | Subscription Status. One of `1`, `0`. |
| `custom_fields` | object | no |  | Custom Fields. Go to **Subscribers Tab-> All Subscribers -> Manage Fields** to get custom field names. |

### `get-subscriber`

**Get Subscriber.** Look up a single subscriber in a Smaily account by their email address and return their stored details (subscription status and custom fields). Use to check whether a contact exists or to read their current data before acting on it. Read-only and idempotent; requires the exact email. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

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
