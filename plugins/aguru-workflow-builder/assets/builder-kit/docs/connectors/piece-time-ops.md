# TimeOps

Time tracking and project management for teams and freelancers.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-time-ops'
  version: '0.1.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your TimeOps API key. You can find it in your TimeOps account settings.

## Actions

### `create_customer`

**Create Customer.** Creates a new customer record in TimeOps, optionally with a name, VAT number, and default hourly rate. Use when onboarding a client into TimeOps before creating projects or registrations for them. Not idempotent: each call creates another customer with a new id even if the fields are identical. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. The name of the customer. |
| `vatNumber` | string | no |  | VAT Number. The VAT number of the customer. |
| `defaultRate` | number | no |  | Default Rate. The default hourly rate for this customer. |

### `create_project`

**Create Project.** Creates a new project in TimeOps under a specific customer, with an optional billable flag, hourly rate, and finished date. Use when setting up a project to track time against; requires a project name and the id of an existing customer. Not idempotent: each call creates another project with a new id. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the project. |
| `customerId` | string | yes |  | Customer. The customer this project belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `billable` | boolean | no | `false` | Billable. Whether the project is billable. |
| `rate` | number | no |  | Rate. The hourly rate for this project. |
| `finishedAt` | ISO date-time string | no |  | Finished At. The date and time when the project was finished. |

### `start_timer`

**Start Timer.** Starts a running time entry (registration) for a given user in TimeOps, optionally tied to a project and tagged as billable. Use to begin live time tracking when the stop time is not yet known; pair with Stop Timer to close it out. Requires the user id. Not idempotent: each call opens another running registration. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. The user to start the timer for. A value the product loads from the provider, such as an id; write the value itself. |
| `projectId` | string | no |  | Project. The project to associate with this timer. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Description of the time entry. |
| `billable` | boolean | no | `false` | Billable. Whether this time entry is billable. |
| `tags` | array | no |  | Tags. Tag IDs to associate with this timer. |

### `stop_timer`

**Stop Timer.** Stops the currently running timer (open registration) for a given user in TimeOps, closing out the time entry. Use after Start Timer to finalize a live time entry; requires the user id. Not idempotent: it mutates the open registration, and a repeat call with no timer running has no entry to close. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. The user to stop the timer for. A value the product loads from the provider, such as an id; write the value itself. |

### `create_registration`

**Create Registration.** Creates a complete time-entry registration in TimeOps with an explicit start (and optional stop) time for a given user, optionally tied to a project, description, billable flag, and tags. Use to log a past or fully specified time entry rather than tracking live (unlike Start Timer / Stop Timer). Requires the user id and a start time. Not idempotent: each call creates another registration with a new id. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. The user for this registration. A value the product loads from the provider, such as an id; write the value itself. |
| `startedAt` | ISO date-time string | yes |  | Started At. The start date and time of the registration. |
| `stoppedAt` | ISO date-time string | no |  | Stopped At. The end date and time of the registration. |
| `projectId` | string | no |  | Project. The project to associate with this registration. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Description of the registration. |
| `billable` | boolean | no | `false` | Billable. Whether this registration is billable. |
| `tags` | array | no |  | Tags. Tag IDs to associate with this registration. |

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
