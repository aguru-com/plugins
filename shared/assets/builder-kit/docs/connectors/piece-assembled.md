# Assembled

Workforce management platform for scheduling and forecasting

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-assembled'
  version: '0.1.9'
```

Categories: PRODUCTIVITY, HUMAN_RESOURCES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key by navigating to [Settings->API](https://app.assembledhq.com/settings/api) page.

## Actions

### `custom_api_call`

**Custom API Call.** Make custom API calls to Assembled endpoints. Needs authentication.

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

### `custom_graphql`

**Custom GraphQL.** Sends a raw GraphQL request to the Assembled API with an operation string and optional variables. Use as an escape hatch when no dedicated action covers the query or mutation you need. The supplied operation can read or write data, so it is not safe to assume repeating the call has no side effect. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. |
| `variables` | object | no |  | Parameters. |

### `OOO`

**Create OOO Request.** Creates a time-off (out-of-office) request for a user in Assembled over the given start/end window, requiring the user ID and an activity type ID (a UUID from the activity types endpoint). A mock mode prop can return a fabricated response without hitting the API for testing. Each call submits a new request, so repeating it creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mock_mode` | boolean | no | `true` | Mock Mode. Use mock data for testing. |
| `user_id` | string | yes |  | User ID. ID of the user requesting time off. |
| `start_date` | ISO date-time string | yes |  | Start Date. Start date of the OOO period. |
| `end_date` | ISO date-time string | yes |  | End Date. End date of the OOO period. |
| `activity_type_id` | string | yes |  | Activity Type ID. UUID of the activity type for time off (can be retrieved from activity types endpoints) |
| `all_day` | boolean | no | `true` | All Day Event. Whether this is an all-day OOO event. |
| `reason` | string | no |  | Reason. Reason for the OOO request. |

### `add_shift`

**Add Shift on Assembled.** Adds a scheduled shift (activity) to an agent's schedule in Assembled over a given start/end time. Requires the agent ID (the agent_id field from the people endpoint, not the person ID) and an activity type ID UUID. Each call creates a new activity, so repeating it produces duplicate shifts. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agent_id` | string | yes |  | Agent ID. Agent ID of the person to assign the shift to (use the agent_id field from /people endpoint, not the person id) |
| `start_time` | ISO date-time string | yes |  | Start Time. Start time of the shift. |
| `end_time` | ISO date-time string | yes |  | End Time. End time of the shift. |
| `shift_type` | string | no | `"regular"` | Shift Type. Type of shift. One of `"regular"`, `"overtime"`, `"on_call"`, `"training"`. |
| `activity_type_id` | string | yes |  | Activity Type ID. UUID of the activity type for this shift (get from /activity_types endpoint) |
| `notes` | string | no |  | Notes. Additional notes for the shift. |

### `update_OOO`

**Update OOO Request.** Updates an existing time-off request identified by its OOO ID. Because Assembled has no update endpoint, this cancels the original request and creates a fresh one with the new details, so user ID and activity type ID are required. This mutates state and creates a new request each call, so it is not safe to repeat. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `OOO_id` | string | yes |  | OOO ID. |
| `start_date` | ISO date-time string | no |  | Start Date. |
| `end_date` | ISO date-time string | no |  | End Date. |
| `status` | string | no |  | Status. One of `"pending"`, `"approved"`, `"rejected"`, `"cancelled"`. |
| `reason` | string | no |  | Reason. |
| `user_id` | string | yes |  | User ID. ID of the user for the time off request (required for creating new request) |
| `activity_type_id` | string | yes |  | Activity Type ID. UUID of the activity type for time off (required for creating new request) |

### `delete_OOO`

**Delete OOO Request.** Cancels (deletes) a time-off request in Assembled, identified by its OOO ID. Use to revoke a previously submitted out-of-office request. Because the cancellation is keyed on the request ID, repeating the call leaves the request cancelled, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `OOO_id` | string | yes |  | OOO ID. |
