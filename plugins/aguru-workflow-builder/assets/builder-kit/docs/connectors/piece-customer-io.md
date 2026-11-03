# customer.io

Create personalized journeys across all channels with our customer engagement platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-customer-io'
  version: '0.5.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **Site ID:**
>
>
> Please log in and go to Settings, click [here](https://fly.customer.io/settings/api_credentials).
>
> **Tracking API Key:**
>
>
> Please log in and go to Settings, click [here](https://fly.customer.io/settings/api_credentials).
>
> **APP API Token:**
>
>
> Please log in and find it in Account Settings, click [here](https://fly.customer.io/settings/api_credentials?keyType=app).
>
> <br>
> Please note that the Track API Key and App API Key are different. You can read more about it [here](https://customer.io/docs/accounts-and-workspaces/managing-credentials/).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `region` | string | yes | `"us"` | Region. One of `"us"`, `"eu"`. |
| `track_site_id` | string | yes |  | Site ID. |
| `track_api_key` | string | yes |  | API Key. |
| `api_bearer_token` | string | yes |  | Bearer Token. |

## Actions

### `create_event`

**Create Event.** Sends a behavioral/tracking event for a specific person to Customer.io via the Track API, identified by id, email, or cio_id per the workspace setting. Use to record that a customer did something so it can drive campaigns or segments. Provide the event payload either as key-value pairs or a raw JSON object (body_type). Not idempotent: each call appends a new event, even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customer_identifier` | string | yes |  | Customer identifier. The unique value representing a person. You may identify a person by id, email address, or the cio_id (when updating people), depending on your workspace settings. |
| `event_name` | string | yes |  | Event Name. The name of the event. This is how you'll reference the event in campaigns or segments. |
| `body_type` | string | no | `"key_value"` | parameters. Event information to be sent to Customer.io. One of `"key_value"`, `"json"`. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |

### `custom_track_api_call`

**Track Custom API Call.** CustomerIO Track Custom API Call (track.customer.io) Needs authentication.

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

### `custom_app_api_call`

**App Custom API Call.** CustomerIO App Custom API Call (api.customer.io) Needs authentication.

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
