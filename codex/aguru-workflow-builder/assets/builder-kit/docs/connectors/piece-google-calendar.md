# Google Calendar

Get organized and stay on schedule

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-calendar'
  version: '0.12.3'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Service Account (Advanced)

> Create a key under [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts): **Keys** > **Add key** > **JSON**.
>
> Share each calendar with the service account email, or set up [domain-wide delegation](https://support.google.com/a/answer/162106) and fill **User Email** to act as that user.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serviceAccount` | string | yes |  | Service Account JSON Key. Paste the whole JSON key file. |
| `userEmail` | string | no |  | User Email. Needed only with domain-wide delegation. |

## Actions

### `google-calendar-add-attendees`

**Add Attendees to Event.** Adds one or more guests (by email) to an existing Google Calendar event, identified by calendar and event ID, preserving the current attendee list. Use to invite people to an event that already exists rather than recreating it. Not idempotent: re-running appends the same emails again, producing duplicate attendee entries. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `eventId` | string | yes |  | Event ID. Paste the ID from the event URL or a previous step. |
| `attendees` | array | yes |  | Attendees. One guest email per item. |

Output fields:

- `summary`: Title
- `status`: Status
- `htmlLink`: Event Link (url)
- `id`: Event ID
- `eventType`: Event Type
- `start`: Start
- `start.dateTime`: Start Time (datetime)
- `start.timeZone`: Time Zone
- `end`: End
- `end.dateTime`: End Time (datetime)
- `end.timeZone`: Time Zone
- `creator`: Creator
- `creator.email`: Email (email)
- `organizer`: Organizer
- `organizer.email`: Email (email)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `iCalUID`: iCal UID

### `create_quick_event`

**Create Quick Event.** Creates a calendar event from a single natural-language phrase (e.g. "Lunch with Sam tomorrow at 1pm") via Google's quickAdd parsing, letting Google infer the time, title, and date. Use when you have free-form text rather than structured fields; prefer Create Event when you have explicit start/end times or attendees. Not idempotent: each call creates a new event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Event Text. e.g. "Lunch with Sam tomorrow at 1pm". |
| `send_updates` | string | no | `"none"` | Send Updates. Who gets an email invitation for the new event. One of `"all"`, `"externalOnly"`, `"none"`. |

Output fields:

- `body.summary`: Summary
- `body.status`: Status
- `body.id`: Event ID
- `body.htmlLink`: Event Link (url)
- `body.created`: Created (datetime)
- `body.updated`: Updated (datetime)
- `body.start`: Start
- `body.start.dateTime`: Start Date/Time (datetime)
- `body.start.timeZone`: Time Zone
- `body.end`: End
- `body.end.dateTime`: End Date/Time (datetime)
- `body.end.timeZone`: Time Zone
- `body.creator`: Creator
- `body.creator.email`: Email (email)
- `body.organizer`: Organizer
- `body.organizer.email`: Email (email)
- `body.eventType`: Event Type
- `body.iCalUID`: iCal UID

### `create_google_calendar_event`

**Create Event.** Creates a Google Calendar event with structured fields (title, start/end times, location, description, attendees, color, guest permissions) and can optionally attach a Google Meet link. Use this when you have explicit event details; choose Create Quick Event instead when working from a single natural-language phrase. Requires a title and start time (end defaults to 30 minutes after start). Not idempotent: each call creates a new event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `start_date_time` | ISO date-time string | yes |  | Start Time. |
| `end_date_time` | ISO date-time string | no |  | End Time. Defaults to 30 minutes after the start. |
| `location` | string | no |  | Location. |
| `description` | string | no |  | Description. HTML tags are allowed. |
| `colorId` | string | no |  | Color. Leave empty for the calendar default. A value the product loads from the provider, such as an id; write the value itself. |
| `attendees` | array | no |  | Attendees. One guest email per item. |
| `guests_can_modify` | boolean | no | `false` | Guests Can Modify. |
| `guests_can_invite_others` | boolean | no | `false` | Guests Can Invite Others. |
| `guests_can_see_other_guests` | boolean | no | `false` | Guests Can See Other Guests. |
| `send_notifications` | string | yes | `"all"` | Send Notifications. Who gets an email invitation for the new event. One of `"all"`, `"externalOnly"`, `"none"`. |
| `create_meet_link` | boolean | no | `false` | Create Google Meet Link. Adds a Google Meet link to the event. |

Output fields:

- `summary`: Title
- `status`: Status
- `htmlLink`: Event Link (url)
- `id`: Event ID
- `eventType`: Event Type
- `start`: Start
- `start.dateTime`: Start Time (datetime)
- `start.timeZone`: Time Zone
- `end`: End
- `end.dateTime`: End Time (datetime)
- `end.timeZone`: Time Zone
- `creator`: Creator
- `creator.email`: Email (email)
- `organizer`: Organizer
- `organizer.email`: Email (email)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `iCalUID`: iCal UID

### `google_calendar_get_events`

**Get Events.** Lists events from a Google Calendar, optionally filtered by a date range, search term, and event types, and can expand recurring events into individual instances. Use to look up or browse multiple events when you do not already have a specific event ID; use Get Event by ID for a single known event. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_types` | array | yes | `["default","focusTime","outOfOffice"]` | Event Types. Only events of these types are returned. One of `"default"`, `"outOfOffice"`, `"focusTime"`, `"workingLocation"`. |
| `search` | string | no |  | Search Term. Exact phrase matched against title, description, location and guests. |
| `start_date` | ISO date-time string | no |  | Start Time. Only events that end after this time. |
| `end_date` | ISO date-time string | no |  | End Time. Only events starting before this. Requires Start Time. |
| `singleEvents` | boolean | no | `false` | Expand Recurring Events. Returns each occurrence of a recurring event separately. |

Output fields:

- `status`: Status Code
- `body.summary`: Calendar Summary
- `body.timeZone`: Time Zone
- `body.accessRole`: Access Role
- `body.updated`: Updated (datetime)
- `body.items`: Events
- `body.items[].summary`: Title
- `body.items[].status`: Status
- `body.items[].id`: Event ID
- `body.items[].eventType`: Event Type
- `body.items[].htmlLink`: Event Link (url)
- `body.items[].start.dateTime`: Start (datetime)
- `body.items[].end.dateTime`: End (datetime)
- `body.items[].creator.email`: Creator Email (email)
- `body.items[].organizer.email`: Organizer Email (email)
- `body.items[].created`: Created (datetime)
- `body.items[].updated`: Updated (datetime)
- `body.items[].iCalUID`: iCal UID

### `update_event`

**Update Event.** Updates the fields of an existing Google Calendar event identified by calendar and event ID (title, times, location, description, color, attendees, guest permissions); unset fields retain their current values. Use to modify or reschedule an event that already exists rather than creating a new one. Requires the event ID. Idempotent: applying the same field values repeatedly leaves the event in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `eventId` | string | yes |  | Event ID. Paste the ID from the event URL or a previous step. |
| `title` | string | no |  | Title. |
| `start_date_time` | ISO date-time string | no |  | Start Time. |
| `end_date_time` | ISO date-time string | no |  | End Time. |
| `location` | string | no |  | Location. |
| `description` | string | no |  | Description. HTML tags are allowed. |
| `colorId` | string | no |  | Color. A value the product loads from the provider, such as an id; write the value itself. |
| `attendees` | array | no |  | Attendees. Replaces the current guest list. One email per item. |
| `guests_can_modify` | string | no |  | Guests Can Modify. One of `true`, `false`. |
| `guests_can_invite_others` | string | no |  | Guests Can Invite Others. One of `true`, `false`. |
| `guests_can_see_other_guests` | string | no |  | Guests Can See Other Guests. One of `true`, `false`. |

Output fields:

- `summary`: Title
- `status`: Status
- `htmlLink`: Event Link (url)
- `id`: Event ID
- `eventType`: Event Type
- `start`: Start
- `start.dateTime`: Start Time (datetime)
- `start.timeZone`: Time Zone
- `end`: End
- `end.dateTime`: End Time (datetime)
- `end.timeZone`: Time Zone
- `creator`: Creator
- `creator.email`: Email (email)
- `organizer`: Organizer
- `organizer.email`: Email (email)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `iCalUID`: iCal UID

### `delete_event`

**Delete Event.** Permanently removes an event from a Google Calendar, identified by calendar and event ID. Use to cancel or delete an existing event. Requires the event ID and cannot be undone. Idempotent: once the event is deleted, repeating the call leaves it absent (a second call may report it as already gone). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `eventId` | string | yes |  | Event ID. Paste the ID from the event URL or a previous step. |

### `google_calendar_find_busy_free_periods`

**Find Busy/Free Periods in Calendar.** Queries one or more calendars for their busy time blocks within a given start/end window, without exposing event details. Use to check availability or find open slots before scheduling a meeting. Requires the calendars to check and a time range. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_ids` | array | yes |  | Calendars. Calendars to check. Values the product loads from the provider, such as ids; write an array of them. |
| `start_date` | ISO date-time string | yes |  | Start Time. The start of the time range to check. |
| `end_date` | ISO date-time string | yes |  | End Time. The end of the time range to check. |

Output fields:

- `timeMin`: Time Min (datetime)
- `timeMax`: Time Max (datetime)
- `calendars`: Calendars (an object whose keys vary)
- `calendars.busy`: Busy Periods
- `calendars.busy[].start`: Start (datetime)
- `calendars.busy[].end`: End (datetime)

### `google_calendar_get_event_by_id`

**Get Event by ID.** Fetches the full details of a single Google Calendar event by its unique event ID within a given calendar. Use when you already have an event ID (e.g. from a trigger or a list action) and need its details; use Get all Events to search when you do not. Requires a valid event ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_id` | string | yes |  | Event ID. Paste the ID from the event URL or a previous step. |
| `max_attendees` | number | no |  | Max Attendees. Above this count, only you are returned. |
| `time_zone` | string | no |  | Time Zone. IANA name, e.g. America/New_York. Defaults to the calendar zone. |

Output fields:

- `summary`: Title
- `status`: Status
- `htmlLink`: Event Link (url)
- `id`: Event ID
- `eventType`: Event Type
- `start`: Start
- `start.dateTime`: Start Time (datetime)
- `start.timeZone`: Time Zone
- `end`: End
- `end.dateTime`: End Time (datetime)
- `end.timeZone`: Time Zone
- `creator`: Creator
- `creator.email`: Email (email)
- `organizer`: Organizer
- `organizer.email`: Email (email)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `iCalUID`: iCal UID

### `google_calendar_search_events_all_calendars`

**Search Events Across Calendars.** Search all of the user's calendars at once for events matching a text query within a required time window, returning each match tagged with its owning calendarId so you can then get/update/delete it. Use this instead of Get all Events when you know a keyword and time range but do NOT know which calendar the event lives in (Get all Events searches a single calendar). A start and end time are mandatory to bound the cross-calendar scan; matching uses Google's native q= filter, not semantic search. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Term. Free-text query matched against event fields (summary, description, location, attendee names/emails) using Google's native search. Example: "budget review". |
| `start_date` | ISO date-time string | yes |  | Start Time. Lower bound (inclusive) for an event's end time, as an ISO 8601 timestamp (e.g. "2026-06-01T00:00:00Z"). Required to bound the cross-calendar scan. |
| `end_date` | ISO date-time string | yes |  | End Time. Upper bound (exclusive) for an event's start time, as an ISO 8601 timestamp (e.g. "2026-06-30T23:59:59Z"). Required to bound the cross-calendar scan. |
| `single_events` | boolean | no | `true` | Expand Recurring Events?. When enabled, recurring events are expanded into their individual instances instead of returning the underlying recurring event. |

Output fields:

- `events`: Events
- `events[].calendarId`: Calendar ID
- `events[].summary`: Title
- `events[].status`: Status
- `events[].id`: Event ID
- `events[].htmlLink`: Event Link (url)
- `events[].start.dateTime`: Start (datetime)
- `events[].end.dateTime`: End (datetime)
- `count`: Count (number)
- `calendars_searched`: Calendars Searched (number)
- `warning`: Warning

### `google_calendar_find_free_slots`

**Find Free Time Slots.** Return the OPEN time slots common to the selected calendars within a window — the inverse of their combined busy blocks, optionally filtered to a minimum duration and to working hours. Use this instead of Find Busy/Free Periods (which returns only busy blocks and forces you to invert and reconcile them yourself) when you need the actual free intervals to answer "when can everyone meet". Idempotent because it performs no writes, but the result depends entirely on the window: pass absolute start/end times, since a window relative to "now" yields a shifting set of slots. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_ids` | array | yes |  | Calendars. The calendars whose schedules must all be free. A slot is returned only when it is open on every selected calendar. Values the product loads from the provider, such as ids; write an array of them. |
| `start_date` | ISO date-time string | yes |  | Window Start. Start of the search window, as an absolute ISO 8601 timestamp (e.g. "2026-06-01T09:00:00Z"). Prefer absolute times over relative ones. |
| `end_date` | ISO date-time string | yes |  | Window End. End of the search window, as an absolute ISO 8601 timestamp (e.g. "2026-06-05T18:00:00Z"). |
| `min_duration_minutes` | number | no |  | Minimum Slot Duration (minutes). Discard any open slot shorter than this many minutes. Leave empty to return every open slot regardless of length. |
| `working_hours_start` | number | no |  | Working Hours Start (hour 0-23). If set together with Working Hours End, each day's open slots are clipped to this hour range, interpreted in UTC (not the calendar's local time zone). Example: 9 for 09:00 UTC. Leave both unset to return slots across the full window. |
| `working_hours_end` | number | no |  | Working Hours End (hour 0-23). Upper bound of the daily working-hours window. Example: 17 for 5 PM. Ignored unless Working Hours Start is also set. |

Output fields:

- `free_slots`: Free Slots
- `free_slots[].start`: Start (datetime)
- `free_slots[].end`: End (datetime)
- `free_slots[].duration_minutes`: Duration (Minutes) (number)
- `count`: Count (number)

### `google_calendar_list_recurring_event_instances`

**List Recurring Event Instances.** List the individual occurrences of a single recurring event series, identified by its recurring-event ID, each returned with its own distinct instance event ID. Use this when you need to inspect, reschedule, or cancel ONE occurrence of a series rather than the whole series; Get all Events expands recurring events only across a whole-calendar window and cannot target one series by ID. Requires the recurring series' event ID; optionally bound by a time range. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_id` | string | yes |  | Recurring Event ID. The event ID of the recurring SERIES (the parent), e.g. "abc123def456". Obtain it from Search Events Across Calendars or Get all Events. Individual instance IDs will not work here. |
| `time_min` | ISO date-time string | no |  | Start Time. Optional lower bound (inclusive) for an instance's end time, as an ISO 8601 timestamp with offset (e.g. "2026-06-01T00:00:00Z"). |
| `time_max` | ISO date-time string | no |  | End Time. Optional upper bound (exclusive) for an instance's start time, as an ISO 8601 timestamp with offset (e.g. "2026-06-30T23:59:59Z"). |
| `show_deleted` | boolean | no | `false` | Include Cancelled Instances. Whether to include cancelled (deleted) instances of the series in the result. Defaults to false. |
| `max_results` | number | no |  | Max Results. Maximum number of instances to return per page (1-2500). Defaults to the API default of 250. |

Output fields:

- `instances`: Instances
- `instances[].summary`: Title
- `instances[].status`: Status
- `instances[].id`: Instance Event ID
- `instances[].htmlLink`: Event Link (url)
- `instances[].start.dateTime`: Start (datetime)
- `instances[].end.dateTime`: End (datetime)
- `instances[].originalStartTime.dateTime`: Original Start (datetime)
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `google_calendar_move_event`

**Move Event to Another Calendar.** Move an existing event from a source calendar to a destination calendar in place, preserving the event ID, conferencing, and attendee state. Use this instead of deleting and recreating the event (which loses the ID and metadata) when you need to transfer an event between calendars. Idempotent: moving an event to the calendar it already lives on is treated as a no-op. The source and destination must be writable calendars. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_id` | string | yes |  | Event ID. The ID of the event to move, e.g. "abc123def456". Obtain it from Search Events Across Calendars or Get all Events. |
| `destination_calendar_id` | string | yes |  | Destination Calendar. The calendar to move the event to. A value the product loads from the provider, such as an id; write the value itself. |
| `send_updates` | string | no | `"none"` | Send Notifications. Who should receive notifications about the change of the event's organizer. One of `"all"`, `"externalOnly"`, `"none"`. |

Output fields:

- `moved`: Moved (boolean)
- `already_in_destination`: Already in Destination (boolean)
- `event`: Event
- `event.summary`: Title
- `event.status`: Status
- `event.htmlLink`: Event Link (url)
- `event.id`: Event ID
- `event.eventType`: Event Type
- `event.start`: Start
- `event.start.dateTime`: Start Time (datetime)
- `event.start.timeZone`: Time Zone
- `event.end`: End
- `event.end.dateTime`: End Time (datetime)
- `event.end.timeZone`: Time Zone
- `event.creator`: Creator
- `event.creator.email`: Email (email)
- `event.organizer`: Organizer
- `event.organizer.email`: Email (email)
- `event.created`: Created (datetime)
- `event.updated`: Updated (datetime)
- `event.iCalUID`: iCal UID

### `google_calendar_create_event`

**Create Event.** Create a new event on a calendar from explicit structured fields (title, start/end times, location, description, attendees, color, guest permissions) with an optional Google Meet link. Use this when you already have the event details; for a single natural-language phrase use the quick-add path instead. Resolve calendarId via google_calendar_list_calendars (default "primary"). Requires a title and start time; end defaults to 30 minutes after start. Not idempotent: each call creates a new event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `start_date_time` | ISO date-time string | yes |  | Start Time. |
| `end_date_time` | ISO date-time string | no |  | End Time. Defaults to 30 minutes after the start. |
| `location` | string | no |  | Location. |
| `description` | string | no |  | Description. HTML tags are allowed. |
| `colorId` | string | no |  | Color. Leave empty for the calendar default. A value the product loads from the provider, such as an id; write the value itself. |
| `attendees` | array | no |  | Attendees. One guest email per item. |
| `guests_can_modify` | boolean | no | `false` | Guests Can Modify. |
| `guests_can_invite_others` | boolean | no | `false` | Guests Can Invite Others. |
| `guests_can_see_other_guests` | boolean | no | `false` | Guests Can See Other Guests. |
| `send_notifications` | string | yes | `"all"` | Send Notifications. Who gets an email invitation for the new event. One of `"all"`, `"externalOnly"`, `"none"`. |
| `create_meet_link` | boolean | no | `false` | Create Google Meet Link. Adds a Google Meet link to the event. |

Output fields:

- `summary`: Title
- `status`: Status
- `htmlLink`: Event Link (url)
- `id`: Event ID
- `eventType`: Event Type
- `start`: Start
- `start.dateTime`: Start Time (datetime)
- `start.timeZone`: Time Zone
- `end`: End
- `end.dateTime`: End Time (datetime)
- `end.timeZone`: Time Zone
- `creator`: Creator
- `creator.email`: Email (email)
- `organizer`: Organizer
- `organizer.email`: Email (email)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `iCalUID`: iCal UID

### `google_calendar_update_event`

**Update Event.** Update fields of an existing event (title, times, location, description, color, attendees, guest permissions) identified by calendar and event ID. It fetches the event first and merges, so unset fields keep their current values (it never blanks out attendees/recurrence/conferencing). Use this to edit or reschedule an existing event rather than recreating it. Resolve calendarId via google_calendar_list_calendars and eventId via google_calendar_list_events / google_calendar_search_events_all_calendars. Idempotent: applying the same field values repeatedly leaves the event in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_id` | string | yes |  | Event ID. The ID of the event to update. Resolve it via List Events or Search Events Across Calendars. |
| `title` | string | no |  | Title. |
| `start_date_time` | ISO date-time string | no |  | Start Time. |
| `end_date_time` | ISO date-time string | no |  | End Time. |
| `location` | string | no |  | Location. |
| `description` | string | no |  | Description. HTML tags are allowed. |
| `colorId` | string | no |  | Color. A value the product loads from the provider, such as an id; write the value itself. |
| `attendees` | array | no |  | Attendees. Replaces the current guest list. One email per item. |
| `guests_can_modify` | string | no |  | Guests can modify. Leave unset to keep the event's current value. One of `"true"`, `"false"`. |
| `guests_can_invite_others` | string | no |  | Guests can invite others. Leave unset to keep the event's current value. One of `"true"`, `"false"`. |
| `guests_can_see_other_guests` | string | no |  | Guests can see other guests. Leave unset to keep the event's current value. One of `"true"`, `"false"`. |

Output fields:

- `summary`: Title
- `status`: Status
- `htmlLink`: Event Link (url)
- `id`: Event ID
- `eventType`: Event Type
- `start`: Start
- `start.dateTime`: Start Time (datetime)
- `start.timeZone`: Time Zone
- `end`: End
- `end.dateTime`: End Time (datetime)
- `end.timeZone`: Time Zone
- `creator`: Creator
- `creator.email`: Email (email)
- `organizer`: Organizer
- `organizer.email`: Email (email)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `iCalUID`: iCal UID

### `google_calendar_delete_event`

**Delete Event.** Permanently delete an event from a calendar, identified by calendar and event ID. Use to cancel or remove an existing event; this cannot be undone, so confirm the event ID first. Resolve calendarId via google_calendar_list_calendars and eventId via google_calendar_list_events / google_calendar_search_events_all_calendars. Idempotent: once deleted, re-running leaves the event absent (a repeat call may report it as already gone). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_id` | string | yes |  | Event ID. The ID of the event to delete. Resolve it via List Events or Search Events Across Calendars. |

### `google_calendar_get_event`

**Get Event.** Fetch the full details of one event by its unique event ID within a calendar. Use this when you already have an event ID (from a trigger or a list action) and need its current details; to find an event when you do not have its ID, use google_calendar_list_events or google_calendar_search_events_all_calendars instead. Resolve calendarId via google_calendar_list_calendars and eventId via google_calendar_list_events / google_calendar_search_events_all_calendars. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_id` | string | yes |  | Event ID. Paste the ID from the event URL or a previous step. |
| `max_attendees` | number | no |  | Max Attendees. Above this count, only you are returned. |
| `time_zone` | string | no |  | Time Zone. IANA name, e.g. America/New_York. Defaults to the calendar zone. |

Output fields:

- `summary`: Title
- `status`: Status
- `htmlLink`: Event Link (url)
- `id`: Event ID
- `eventType`: Event Type
- `start`: Start
- `start.dateTime`: Start Time (datetime)
- `start.timeZone`: Time Zone
- `end`: End
- `end.dateTime`: End Time (datetime)
- `end.timeZone`: Time Zone
- `creator`: Creator
- `creator.email`: Email (email)
- `organizer`: Organizer
- `organizer.email`: Email (email)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `iCalUID`: iCal UID

### `google_calendar_list_events`

**List Events.** List events from one calendar, optionally narrowed by a date range, a free-text search term (matched with Google's native q= filter), and event types, optionally expanding recurring events into individual instances. Use this to browse or find events in a known calendar, including text search within that calendar; to search across every calendar when you do not know which one holds the event, use google_calendar_search_events_all_calendars instead. Resolve calendarId via google_calendar_list_calendars (default "primary"). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_types` | array | yes | `["default","focusTime","outOfOffice"]` | Event Types. Only events of these types are returned. One of `"default"`, `"outOfOffice"`, `"focusTime"`, `"workingLocation"`. |
| `search` | string | no |  | Search Term. Exact phrase matched against title, description, location and guests. |
| `start_date` | ISO date-time string | no |  | Start Time. Only events that end after this time. |
| `end_date` | ISO date-time string | no |  | End Time. Only events starting before this. Requires Start Time. |
| `singleEvents` | boolean | no | `false` | Expand Recurring Events. Returns each occurrence of a recurring event separately. |

Output fields:

- `status`: Status Code
- `body.summary`: Calendar Summary
- `body.timeZone`: Time Zone
- `body.accessRole`: Access Role
- `body.updated`: Updated (datetime)
- `body.items`: Events
- `body.items[].summary`: Title
- `body.items[].status`: Status
- `body.items[].id`: Event ID
- `body.items[].eventType`: Event Type
- `body.items[].htmlLink`: Event Link (url)
- `body.items[].start.dateTime`: Start (datetime)
- `body.items[].end.dateTime`: End (datetime)
- `body.items[].creator.email`: Creator Email (email)
- `body.items[].organizer.email`: Organizer Email (email)
- `body.items[].created`: Created (datetime)
- `body.items[].updated`: Updated (datetime)
- `body.items[].iCalUID`: iCal UID

### `google_calendar_find_busy_periods`

**Find Busy Periods.** Query one or more calendars for their raw busy time blocks within a start/end window, without exposing event details (the low-level freebusy primitive). Use this when you need the busy intervals themselves (e.g. across several shared calendars); to get the inverse open slots directly, use google_calendar_find_free_slots instead. Resolve calendarId values via google_calendar_list_calendars. Requires the calendars to check and a time range. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_ids` | array | yes |  | Calendars. Calendars to check. Values the product loads from the provider, such as ids; write an array of them. |
| `start_date` | ISO date-time string | yes |  | Start Time. The start of the time range to check. |
| `end_date` | ISO date-time string | yes |  | End Time. The end of the time range to check. |

Output fields:

- `timeMin`: Time Min (datetime)
- `timeMax`: Time Max (datetime)
- `calendars`: Calendars (an object whose keys vary)
- `calendars.busy`: Busy Periods
- `calendars.busy[].start`: Start (datetime)
- `calendars.busy[].end`: End (datetime)

### `google_calendar_remove_attendee`

**Remove Attendee.** Remove a single attendee, matched by email, from an existing event by fetching the current attendee list, dropping that one guest, and patching the event. Use this to uninvite one person without disturbing the other guests; to add guests use the add-attendees action instead. Resolve calendarId via google_calendar_list_calendars and eventId via google_calendar_list_events / google_calendar_search_events_all_calendars. Not idempotent (notifications may fire), though re-removing an already-absent attendee is a no-op on state. It uses optimistic concurrency (If-Match on the event revision), so a simultaneous edit by someone else fails with a retry-able conflict instead of silently clobbering their change. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `event_id` | string | yes |  | Event ID. The ID of the event to remove the attendee from. Resolve it via List Events or Search Events Across Calendars. |
| `attendee_email` | string | yes |  | Attendee Email. Email address of the attendee to remove from the event. |
| `send_updates` | string | no | `"none"` | Send Notifications. Who should be notified about the attendee change. One of `"all"`, `"externalOnly"`, `"none"`. |

Output fields:

- `removed`: Removed (boolean)
- `attendee_email`: Attendee Email (email)
- `message`: Message
- `event`: Event
- `event.summary`: Title
- `event.status`: Status
- `event.htmlLink`: Event Link (url)
- `event.id`: Event ID
- `event.eventType`: Event Type
- `event.start`: Start
- `event.start.dateTime`: Start Time (datetime)
- `event.start.timeZone`: Time Zone
- `event.end`: End
- `event.end.dateTime`: End Time (datetime)
- `event.end.timeZone`: Time Zone
- `event.creator`: Creator
- `event.creator.email`: Email (email)
- `event.organizer`: Organizer
- `event.organizer.email`: Email (email)
- `event.created`: Created (datetime)
- `event.updated`: Updated (datetime)
- `event.iCalUID`: iCal UID

### `google_calendar_import_event`

**Import Event.** Import an existing event into a calendar as a private copy, keyed by its iCalUID with a start and end time (the events.import primitive, distinct from creating a brand-new event or moving one). Use this to copy or de-duplicate an event across calendars; re-importing the same iCalUID updates the existing copy rather than duplicating it. Resolve calendarId via google_calendar_list_calendars (default "primary"). Only default (non-special) events can be imported. Not idempotent: each import can create or mutate the destination copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |
| `ical_uid` | string | yes |  | iCal UID. The event's iCalUID (its globally unique identifier, e.g. "abc123@google.com"). This is the dedup key: re-importing the same UID updates the existing copy. |
| `summary` | string | yes |  | Title. Title (summary) of the imported event. |
| `start_date_time` | ISO date-time string | yes |  | Start Time. Event start as an ISO 8601 timestamp (e.g. "2026-06-01T09:00:00Z"). |
| `end_date_time` | ISO date-time string | yes |  | End Time. Event end as an ISO 8601 timestamp (e.g. "2026-06-01T10:00:00Z"). |
| `location` | string | no |  | Location. |
| `description` | string | no |  | Description. Description of the event. You can use HTML tags here. |

Output fields:

- `summary`: Title
- `status`: Status
- `htmlLink`: Event Link (url)
- `id`: Event ID
- `eventType`: Event Type
- `start`: Start
- `start.dateTime`: Start Time (datetime)
- `start.timeZone`: Time Zone
- `end`: End
- `end.dateTime`: End Time (datetime)
- `end.timeZone`: Time Zone
- `creator`: Creator
- `creator.email`: Email (email)
- `organizer`: Organizer
- `organizer.email`: Email (email)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `iCalUID`: iCal UID

### `google_calendar_list_calendars`

**List Calendars.** List all calendars on the user's calendar list, returning each one's calendarId, summary, accessRole, timeZone, and whether it is the primary calendar. This is the calendarId resolver: call it first to discover which calendars exist and obtain the calendarId that every event/freebusy atomic needs (default "primary"). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `calendars`: Calendars
- `calendars[].id`: Calendar ID
- `calendars[].summary`: Name
- `calendars[].description`: Description
- `calendars[].location`: Location
- `calendars[].timeZone`: Time Zone
- `calendars[].accessRole`: Access Role
- `calendars[].primary`: Primary (boolean)
- `calendars[].selected`: Selected (boolean)
- `calendars[].backgroundColor`: Background Color
- `calendars[].foregroundColor`: Foreground Color
- `count`: Count (number)

### `google_calendar_get_calendar`

**Get Calendar.** Fetch one calendar's metadata — summary, timeZone, description, and location — by its calendar ID. Use this to read a calendar's time zone, which is load-bearing when constructing correct event start/end windows. Resolve calendarId via google_calendar_list_calendars (default "primary"). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | yes |  | Calendar. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `summary`: Name
- `id`: Calendar ID
- `description`: Description
- `location`: Location
- `timeZone`: Time Zone

### `google_calendar_get_colors`

**Get Colors.** Fetch the global color palette: the mapping from each colorId to its background/foreground hex color, for both events and calendars. Use this to resolve a colorId before setting the color on google_calendar_create_event or google_calendar_update_event. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `calendar`: Calendar Colors (an object whose keys vary)
- `calendar.background`: Background Color
- `calendar.foreground`: Foreground Color
- `event`: Event Colors (an object whose keys vary)
- `event.background`: Background Color
- `event.foreground`: Foreground Color

### `google_calendar_list_settings`

**List Settings.** List all of the user's Google Calendar account settings as id/value pairs — including the account "timezone", "weekStart", and "format24HourTime". Use this to read the account time zone to anchor relative-date reasoning before building event windows, or to read a single setting (just pick its id from the returned list). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Settings
- `items[].id`: Setting ID
- `items[].value`: Value
- `count`: Count (number)

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
