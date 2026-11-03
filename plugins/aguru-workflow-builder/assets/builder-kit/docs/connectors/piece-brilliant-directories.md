# Brilliant Directories

All-in-one membership software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-brilliant-directories'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Brilliant Directories Authentication.
>
> Please enter your API key which can be generated from here: https://ww2.managemydirectory.com/admin/apiSettings
>
> Then enter your brilliant directories website instance URL appended with /api like the example.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_key` | string | yes |  | API Key. The api key of the brilliant directories account account. |
| `site_url` | string | yes | `"https://yoursitehere.com/api"` | Instance Url. The url of the brilliant directories instance. |

## Actions

### `create_new_user`

**Create new User.** Registers a new member account on a Brilliant Directories site via the v2 user/create API. Use to onboard a member when you have their email, password, and a subscription ID that maps to a membership plan; extra profile fields can be passed through the Meta object. Not idempotent — each call creates a new account, so calling twice with the same email may produce a duplicate or fail. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address for the users account. |
| `password` | string | yes |  | Password. Password for the new user account. |
| `subscription` | string | yes |  | Subscription ID. The subscription ID from your website. |
| `meta` | JSON | no |  | Meta. Additional fields for the new user account. |

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
