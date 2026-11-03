# Mixpanel

Simple and powerful product analytics that helps everyone make better decisions

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mixpanel'
  version: '0.2.1'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Mixpanel token

> The Mixpanel token associated with your project. You can find your Mixpanel token in the project settings dialog in the Mixpanel app.

## Actions

### `track_event`

**Track Event.** Record a product-analytics event in Mixpanel by name (e.g. "Payment Made"), optionally tying it to a user via a distinct ID and attaching arbitrary event properties as key-value pairs. Use to log user actions or behavior for analytics. Not idempotent: each call appends a new event stamped with the current time, so repeating it records duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event` | string | yes |  | Event. A name for this Event. For example, 'Brand Mentioned in Tweet' or 'Payment Made'. |
| `distinct_id` | string | no |  | Distinct ID (Profile ID). A way to uniquely identify your users (or more generally, profiles). If you are sending Profiles to Mixpanel in addition to events, this property value should be identical to the Distinct ID property attached to the Profile so that you can connect events to people records. |
| `event_properties` | object | no |  | Event Properties. Event Properties are bits of extra information that you send along with your Events describing the details of that action. They are usually specific to the Event they’re describing and don’t apply universally to other Events. Leveraging Event Properties allows you to conduct deeper analysis to bett… |

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
