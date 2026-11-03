# Microsoft Outlook Calendar

Calendar software by Microsoft

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-outlook-calendar'
  version: '0.3.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you’d like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - User.Read
> - Calendars.ReadWrite
> - offline_access

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `create_event`

**Create a new event in a calendar.** Creates a new calendar event in a specified Microsoft Outlook calendar with a title, start time, and optional end time (defaults to 30 minutes after start), timezone, and location. Use to schedule a meeting or appointment. Not idempotent: each call adds a new event, so repeated calls create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendarId` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title of the event. |
| `start` | ISO date-time string | yes |  | Start date time of the event. |
| `end` | ISO date-time string | no |  | End date time of the event. By default it'll be 30 min post start time. |
| `timezone` | string | yes |  | Timezone. A value the product loads from the provider, such as an id; write the value itself. |
| `location` | string | no |  | Location. |

### `delete_event`

**Delete an event in a calendar.** Permanently deletes a specific event from a Microsoft Outlook calendar, identified by its calendar and event ID. Use to remove a known meeting or appointment. Requires the exact event ID. Not strictly idempotent: a repeat call for an already-deleted event will error, though no new side effect occurs. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendarId` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `eventId` | string | yes |  | Event ID. |

### `list_events`

**List events in a calendar.** Retrieves events from a specified Microsoft Outlook calendar. Leave the filter empty to fetch all events, or supply an OData $filter expression to narrow results to matching events. Use to look up or browse existing events. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendarId` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | string | no |  | Filter. Search query filter, see: https://learn.microsoft.com/en-us/graph/filter-query-parameter. |

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
