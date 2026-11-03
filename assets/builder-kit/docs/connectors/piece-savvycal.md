# SavvyCal

Scheduling tool that lets invitees overlay their calendar when picking a time.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-savvycal'
  version: '0.2.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your SavvyCal account using OAuth2.

### `CUSTOM_AUTH`: Personal Access Token

> To get your SavvyCal API token:
> 1. Log in to your SavvyCal account at https://savvycal.com
> 2. Go to **Settings > Developers**
> 3. Under **Personal Tokens**, click **Create a token**
> 4. Give it a name, then click the **...** menu next to it to view the token
> 5. Copy the **Private Key** (starts with `pt_secret_`) — not the Public Key
>
> **Note:** Keep this token secret — it gives full access to your SavvyCal account.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token` | string | yes |  | Personal Access Token. Your SavvyCal Personal Access Token (Private Key). |

## Actions

### `create_event`

**Create Event.** Books a new SavvyCal meeting on a given scheduling link for an attendee at a specific start/end time. Use to schedule a booking on the attendee's behalf; the chosen time must match an available slot on the link (call Get Available Slots first if unsure). Requires the link id, attendee name/email, and time zone in Olson format. Not idempotent — each call creates a separate booking. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team. Filter scheduling links by team. Leave empty to show all teams. A value the product loads from the provider, such as an id; write the value itself. |
| `link_id` | string | yes |  | Scheduling Link. Select the scheduling link to book a meeting on. A value the product loads from the provider, such as an id; write the value itself. |
| `start_at` | ISO date-time string | yes |  | Start Time. The start date and time of the meeting. Must match an available slot on the scheduling link. |
| `end_at` | ISO date-time string | yes |  | End Time. The End date and time of the meeting. |
| `attendee_name` | string | yes |  | Attendee Name. Full name of the person booking the meeting. |
| `attendee_email` | string | yes |  | Attendee Email. Email address of the person booking the meeting. |
| `time_zone` | string | yes |  | Time Zone. Attendee's local time zone in Olson format (e.g. America/New_York, Europe/London, Africa/Lagos). |
| `phone_number` | string | no |  | Phone Number. Attendee's phone number in international format (e.g. +15555555555). Required only if the scheduling link asks for it. |
| `custom_fields` | object | no |  | Custom Fields. Additional questions configured on the scheduling link (e.g. Company, Why are we meeting?). Filled in dynamically based on the selected link. An object whose fields depend on other inputs; the product shows them. |
| `metadata` | object | no |  | Metadata. Custom key/value pairs to attach to the event. Useful for tracking the source flow or correlating with external systems. |

### `cancel_event`

**Cancel Event.** Cancels a scheduled SavvyCal meeting identified by its event id. Use when a booking needs to be called off; obtain the event id from a trigger, List Events, or Get Event. Cancelling an already-cancelled event has no further effect, but this mutates state and is not a read. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_id` | string | yes |  | Event ID. The unique ID of the event to cancel. You can find this from the output of a trigger or the List Events / Get Event actions. |

### `get_event`

**Get Event.** Fetches the full details of a single SavvyCal event by its event id. Use to look up a known booking (attendee, times, state, link); obtain the id from a trigger, List Events, or the event URL. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_id` | string | yes |  | Event ID. The unique ID of the event. You can find this in the event URL in SavvyCal, or from the output of a trigger or List Events action. |

### `list_events`

**List Events.** Lists SavvyCal events across the account, optionally filtered by state(s), start date window, team, or specific scheduling links. Use to browse or find bookings when you do not have an event id; leave all filters empty to return every event. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `states` | array | no |  | State. Filter events by their current status. Leave empty to return all statuses. One of `"confirmed"`, `"canceled"`, `"awaiting_reschedule"`, `"awaiting_checkout"`, `"checkout_expired"`, `"awaiting_approval"`, `"declined"`, `"tentative"`. |
| `start_after` | ISO date-time string | no |  | Start After. Only return events that start after this date and time. |
| `start_before` | ISO date-time string | no |  | Start Before. Only return events that start before this date and time. |
| `team_id` | string | no |  | Team. Filter scheduling links by team. Leave empty to show all teams. A value the product loads from the provider, such as an id; write the value itself. |
| `link_ids` | array | no |  | Scheduling Links. Only return events booked through the selected scheduling links. Leave empty for all links. Values the product loads from the provider, such as ids; write an array of them. |
| `limit` | number | no |  | Maximum Results. Maximum number of events to return. Leave empty to return all matching events. |

### `find_events_by_email`

**Find Events by Attendee Email.** Finds all SavvyCal events that have a given email among their attendees. Use to look up a specific person's bookings when you only know their email; optionally narrow with a start-date window to limit the scan. Match is case-insensitive on the attendee email. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attendee_email` | string | yes |  | Attendee Email. The email address of the attendee to search for. |
| `start_after` | ISO date-time string | no |  | Start After. Only search events starting after this date. Use this to limit the search scope and improve performance. |
| `start_before` | ISO date-time string | no |  | Start Before. Only search events starting before this date. |

### `list_scheduling_links`

**List Scheduling Links.** Lists the scheduling links in the account, optionally filtered to a single team (or to personal links). Use to discover available links and their ids before booking, querying slots, or managing a link. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team. Filter scheduling links by team. Leave empty to show all teams. A value the product loads from the provider, such as an id; write the value itself. |

### `get_scheduling_link`

**Get Scheduling Link.** Fetches the full configuration of a single SavvyCal scheduling link by its id, including its custom fields. Use to inspect a known link before booking or to read its settings; get the id from List Scheduling Links. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team. Filter scheduling links by team. Leave empty to show all teams. A value the product loads from the provider, such as an id; write the value itself. |
| `link_id` | string | yes |  | Scheduling Link. Select the scheduling link to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

### `get_link_slots`

**Get Available Slots.** Returns the currently bookable time slots for a given scheduling link. Use to check availability or to pick a valid start/end time before calling Create Event. Requires the link id. Read-only and idempotent, though results reflect live availability and change over time. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team. Filter scheduling links by team. Leave empty to show all teams. A value the product loads from the provider, such as an id; write the value itself. |
| `link_id` | string | yes |  | Scheduling Link. Select the scheduling link to query slots for. A value the product loads from the provider, such as an id; write the value itself. |

### `toggle_scheduling_link`

**Toggle Scheduling Link.** Flips a scheduling link between active and disabled, identified by its link id. Use to enable or pause a link; note it toggles relative to the link's current state, so repeating the call alternates the state rather than converging — not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team. Filter scheduling links by team. Leave empty to show all teams. A value the product loads from the provider, such as an id; write the value itself. |
| `link_id` | string | yes |  | Scheduling Link. Select the scheduling link to toggle. A value the product loads from the provider, such as an id; write the value itself. |

### `duplicate_scheduling_link`

**Duplicate Scheduling Link.** Creates a new scheduling link as a copy of an existing one, identified by the source link id. Use to clone a link's configuration as a starting point. Not idempotent — each call produces another distinct copy. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team. Filter scheduling links by team. Leave empty to show all teams. A value the product loads from the provider, such as an id; write the value itself. |
| `link_id` | string | yes |  | Scheduling Link. Select the scheduling link to duplicate. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_scheduling_link`

**Delete Scheduling Link.** Permanently deletes a scheduling link by its id; this cannot be undone. Use only when a link should be fully removed. The first call deletes the link and subsequent calls for the same id will fail, so treat it as a destructive, non-idempotent mutation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team. Filter scheduling links by team. Leave empty to show all teams. A value the product loads from the provider, such as an id; write the value itself. |
| `link_id` | string | yes |  | Scheduling Link. Select the scheduling link to delete. This action cannot be undone. A value the product loads from the provider, such as an id; write the value itself. |

### `list_workflows`

**List Workflows.** Lists all SavvyCal automation workflows in the account with their ids and names. Use to discover available workflows, typically to obtain a workflow id for Get Workflow Rules. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_workflow_rules`

**Get Workflow Rules.** Returns the trigger/action rules configured on a specific SavvyCal workflow, identified by its workflow id. Use to inspect how a workflow is set up; get the id from List Workflows. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow_id` | string | yes |  | Workflow. Select the workflow whose rules you want to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

### `get_current_user`

**Get Current User.** Returns the profile of the SavvyCal account the connection is authenticated as (id, name, email, slug, time zone). Use to identify the current user or fetch their default time zone. Read-only and idempotent. Needs authentication.

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
