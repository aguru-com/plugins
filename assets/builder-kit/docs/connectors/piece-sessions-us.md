# Sessions.us

Video conferencing platform for businesses and professionals

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sessions-us'
  version: '0.2.1'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

## Actions

### `create_session`

**Create Session.** Create a new session (a private video meeting) on Sessions.us with a name, start/end time, and timezone, returning the session id and join link. Use when an agent needs to schedule a meeting rather than a public registration-based event. Creates a new session each call, so it is not idempotent — repeating it produces duplicate sessions. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Session Name. The name of the session. |
| `startAt` | ISO date-time string | yes | `"2026-11-05T09:55:19.838Z"` | Starts At. Select a date and time. |
| `plannedEnd` | ISO date-time string | yes | `"2026-11-05T09:55:19.838Z"` | Ends At. Select a date and time. |
| `timezone` | string | yes |  | Timezone. The timezone which the session will take place. A value the product loads from the provider, such as an id; write the value itself. |

### `create_event`

**Create Event.** Create a new event on Sessions.us with a name, start/end time, and timezone. Use when an agent needs to schedule an event (a public, registration-based gathering, as opposed to a private session). Creates a new event each call, so it is not idempotent — repeating it produces duplicate events. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Event Name. The name of the event. |
| `startAt` | ISO date-time string | yes | `"2026-11-05T09:55:19.837Z"` | Starts At. Select a date and time. |
| `plannedEnd` | ISO date-time string | yes | `"2026-11-05T09:55:19.838Z"` | Ends At. Select a date and time. |
| `timezone` | string | yes |  | Timezone. The timezone which the session will take place. A value the product loads from the provider, such as an id; write the value itself. |

### `publish_event`

**Publish Event.** Publish an existing draft event on Sessions.us so it becomes live and open for registration, identified by its event id. Use after Create Event when the event should go public. Requires a valid event id; publishing an already-published event has no further effect, so the call is effectively idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event` | string | yes |  | Event. The event you want to publish. A value the product loads from the provider, such as an id; write the value itself. |

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
