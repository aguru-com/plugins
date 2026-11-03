# Pendo

Product analytics and digital adoption platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pendo'
  version: '0.2.0'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Integration Key

> Your Pendo integration key. Found in **Settings → Integrations → Integration Keys**.

## Actions

### `track_event`

**Track Event.** Sends a custom track event to Pendo for a given visitor (and optionally an account), recording product-usage activity for analytics. Choose this to log a behavioral/usage event; requires an event type/name and a visitor ID, with optional account ID, millisecond timestamp (defaults to now), and arbitrary event properties. Not idempotent — each call appends a new event. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Event Type. The type/name of the track event. |
| `visitorId` | string | yes |  | Visitor ID. The unique identifier for the visitor. |
| `accountId` | string | no |  | Account ID. The account identifier the visitor belongs to. |
| `timestamp` | number | no |  | Timestamp (ms). Unix timestamp in milliseconds. Defaults to the current time if not provided. |
| `properties` | object | no |  | Event Properties. Additional key-value properties for the event. |

### `get_visitor`

**Get Visitor Details.** Looks up a single Pendo visitor by their unique visitor ID and returns that visitor record. Use when you have a specific visitor identifier and need their metadata/attributes. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visitorId` | string | yes |  | Visitor ID. The unique identifier for the visitor. |

### `get_account`

**Get Account Details.** Looks up a single Pendo account by its unique account ID and returns that account record. Use when you have a specific account identifier and need its metadata/attributes. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The unique identifier for the account. |

### `list_guides`

**List Guides.** Lists all in-app guides configured in the authenticated Pendo account. Use to enumerate guides or to discover a guide ID for use in other steps. Takes no input. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

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
