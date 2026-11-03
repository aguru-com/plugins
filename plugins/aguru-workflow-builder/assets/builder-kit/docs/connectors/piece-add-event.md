# AddEvent

Create and manage calendars, events, and RSVPs with AddEvent — the add-to-calendar service.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-add-event'
  version: '0.1.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> **Authenticate with your AddEvent API key.**
>
> 1. Sign in to your AddEvent account at https://dashboard.addevent.com.
> 2. Open **Account → Settings** (https://dashboard.addevent.com/account/settings).
> 3. Copy your **API key** and paste it below.
>
> Note: API access requires a paid AddEvent plan — the free Hobby plan does not support the API.

## Actions

### `create_event`

**Create Event.** Creates a new event on an AddEvent calendar from the supplied title, schedule, and details. Use when an agent needs to add a brand-new calendar event. Not idempotent: each call creates a separate event, so repeating it produces duplicates; to avoid that, use Find or Create Event instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The event title. |
| `calendar_id` | string | no |  | Calendar. The calendar to use. A value the product loads from the provider, such as an id; write the value itself. |
| `datetime_start` | string | yes |  | Start Date/Time. Format: 'YYYY-MM-DD HH:mm:ss' (24-hour), interpreted in the event's timezone. Example: 2025-06-15 14:30:00. A date alone (YYYY-MM-DD) is also accepted. |
| `datetime_end` | string | no |  | End Date/Time. Same format as the start. Defaults to one hour after the start. |
| `all_day_event` | boolean | no | `false` | All-day Event. |
| `timezone` | string | no |  | Timezone. The event's timezone. Defaults to the calendar's timezone if left blank. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Plain text or HTML (around 500 characters recommended). |
| `location` | string | no |  | Location. A physical address or a URL. Leave blank if you set a saved Location ID instead. |
| `location_id` | number | no |  | Saved Location ID. The ID of a saved location in AddEvent. Use this instead of Location. |
| `organizer_name` | string | no |  | Organizer Name. Required if you set an organizer email. |
| `organizer_email` | string | no |  | Organizer Email. Required if you set an organizer name. |
| `reminder` | number | no | `30` | Reminder (minutes before). Minutes before the event to remind attendees (0–10800). |
| `color` | number | no | `1` | Color. Color from the calendar palette (1–20). |
| `free_busy` | string | no | `"default"` | Show As. How the event appears in attendees' calendars. One of `"default"`, `"busy"`, `"free"`. |
| `recurring_rule` | string | no |  | Recurrence Rule. An iCalendar RRULE, e.g. FREQ=WEEKLY;BYDAY=MO. Leave blank for a one-time event. |
| `internal_name` | string | no |  | Internal Name. A private label for your reference; not shown to attendees. |
| `landing_page_template_id` | string | no |  | Landing Page Template ID. A custom landing page template ID, or 'default'. |
| `rsvp_enabled` | boolean | no | `false` | Enable RSVP. |
| `rsvp_form_id` | string | no |  | RSVP Form ID. A custom RSVP form ID, or 'default'. Only used when RSVP is enabled. |
| `custom_data` | object | no |  | Custom Data. Arbitrary key-value pairs (use snake_case keys). |

### `update_event`

**Update Event.** Updates an existing AddEvent event identified by its event ID, applying a partial change where only the fields you provide are modified. Use when an agent needs to edit details of an event that already exists. Requires a valid event ID; idempotent, since reapplying the same field values to the same event leaves it in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_id` | string | yes |  | Event. Start typing to search your events by title. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. The event title. |
| `calendar_id` | string | no |  | Calendar. The calendar to use. A value the product loads from the provider, such as an id; write the value itself. |
| `datetime_start` | string | no |  | Start Date/Time. Format: 'YYYY-MM-DD HH:mm:ss' (24-hour), interpreted in the event's timezone. Example: 2025-06-15 14:30:00. A date alone (YYYY-MM-DD) is also accepted. |
| `datetime_end` | string | no |  | End Date/Time. Same format as the start. Defaults to one hour after the start. |
| `all_day_event` | string | no |  | All-day Event. Leave blank to keep the current value. One of `true`, `false`. |
| `timezone` | string | no |  | Timezone. The event's timezone. Defaults to the calendar's timezone if left blank. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Plain text or HTML (around 500 characters recommended). |
| `location` | string | no |  | Location. A physical address or a URL. Leave blank if you set a saved Location ID instead. |
| `location_id` | number | no |  | Saved Location ID. The ID of a saved location in AddEvent. Use this instead of Location. |
| `organizer_name` | string | no |  | Organizer Name. Required if you set an organizer email. |
| `organizer_email` | string | no |  | Organizer Email. Required if you set an organizer name. |
| `reminder` | number | no |  | Reminder (minutes before). Minutes before the event to remind attendees (0–10800). |
| `color` | number | no |  | Color. Color from the calendar palette (1–20). |
| `free_busy` | string | no |  | Show As. How the event appears in attendees' calendars. One of `"default"`, `"busy"`, `"free"`. |
| `recurring_rule` | string | no |  | Recurrence Rule. An iCalendar RRULE, e.g. FREQ=WEEKLY;BYDAY=MO. Leave blank for a one-time event. |
| `internal_name` | string | no |  | Internal Name. A private label for your reference; not shown to attendees. |
| `landing_page_template_id` | string | no |  | Landing Page Template ID. A custom landing page template ID, or 'default'. |
| `rsvp_enabled` | string | no |  | Enable RSVP. Leave blank to keep the current value. One of `true`, `false`. |
| `rsvp_form_id` | string | no |  | RSVP Form ID. A custom RSVP form ID, or 'default'. Only used when RSVP is enabled. |
| `custom_data` | object | no |  | Custom Data. Arbitrary key-value pairs (use snake_case keys). |

### `delete_event`

**Delete Event.** Permanently deletes an AddEvent event identified by its event ID. Use when an agent needs to remove an event entirely. Requires a valid event ID; idempotent, since once the event is deleted, repeating the call leaves it absent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_id` | string | yes |  | Event. Start typing to search your events by title. A value the product loads from the provider, such as an id; write the value itself. |

### `find_event`

**Find Event.** Searches AddEvent events by a required search term matched against title, internal name, description, and location, returning up to 20 matches. Use when an agent needs to look up existing events; optionally narrow by calendar and by an earliest/latest start datetime. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Search Term. Searches the title, internal name, description, and location of your events. |
| `calendar_id` | string | no |  | Calendar. The calendar to use. A value the product loads from the provider, such as an id; write the value itself. |
| `datetime_min` | string | no |  | Earliest Start. Only return events starting on or after this time. Format: 'YYYY-MM-DD HH:mm:ss' or 'YYYY-MM-DD'. |
| `datetime_max` | string | no |  | Latest Start. Only return events starting on or before this time. Format: 'YYYY-MM-DD HH:mm:ss' or 'YYYY-MM-DD'. |

### `find_or_create_event`

**Find or Create Event.** Searches AddEvent events by a term and returns the first match; if none is found, creates a new event from the supplied details. Use when an agent wants an event to exist without risking a duplicate. Not strictly idempotent: the search term is not a guaranteed unique key, so concurrent or near-duplicate inputs can still create more than one event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Search Term. Searches the title, internal name, description, and location of your events. The first match is returned. |
| `title` | string | yes |  | Title. The event title. |
| `calendar_id` | string | no |  | Calendar. The calendar to use. A value the product loads from the provider, such as an id; write the value itself. |
| `datetime_start` | string | yes |  | Start Date/Time. Format: 'YYYY-MM-DD HH:mm:ss' (24-hour), interpreted in the event's timezone. Example: 2025-06-15 14:30:00. A date alone (YYYY-MM-DD) is also accepted. |
| `datetime_end` | string | no |  | End Date/Time. Same format as the start. Defaults to one hour after the start. |
| `all_day_event` | boolean | no | `false` | All-day Event. |
| `timezone` | string | no |  | Timezone. The event's timezone. Defaults to the calendar's timezone if left blank. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Plain text or HTML (around 500 characters recommended). |
| `location` | string | no |  | Location. A physical address or a URL. Leave blank if you set a saved Location ID instead. |
| `location_id` | number | no |  | Saved Location ID. The ID of a saved location in AddEvent. Use this instead of Location. |
| `organizer_name` | string | no |  | Organizer Name. Required if you set an organizer email. |
| `organizer_email` | string | no |  | Organizer Email. Required if you set an organizer name. |
| `reminder` | number | no | `30` | Reminder (minutes before). Minutes before the event to remind attendees (0–10800). |
| `color` | number | no | `1` | Color. Color from the calendar palette (1–20). |
| `free_busy` | string | no | `"default"` | Show As. How the event appears in attendees' calendars. One of `"default"`, `"busy"`, `"free"`. |
| `recurring_rule` | string | no |  | Recurrence Rule. An iCalendar RRULE, e.g. FREQ=WEEKLY;BYDAY=MO. Leave blank for a one-time event. |
| `internal_name` | string | no |  | Internal Name. A private label for your reference; not shown to attendees. |
| `landing_page_template_id` | string | no |  | Landing Page Template ID. A custom landing page template ID, or 'default'. |
| `rsvp_enabled` | boolean | no | `false` | Enable RSVP. |
| `rsvp_form_id` | string | no |  | RSVP Form ID. A custom RSVP form ID, or 'default'. Only used when RSVP is enabled. |
| `custom_data` | object | no |  | Custom Data. Arbitrary key-value pairs (use snake_case keys). |

### `create_rsvp_attendee`

**Create RSVP Attendee.** Adds an RSVP attendee (email, name, and response of going/maybe/not-going) to a specific AddEvent event. Use when an agent needs to register someone for an event. Requires a valid event ID; not idempotent, since each call creates another attendee record and, if notifications are enabled, sends a confirmation and organizer email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_id` | string | yes |  | Event. Start typing to search your events by title. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The attendee's email address. Event updates and reminders are sent here. |
| `name` | string | yes |  | Name. The attendee's name (required by the default RSVP form). |
| `attending` | string | no | `"going"` | Attending. The attendee's response. One of `"going"`, `"maybe"`, `"not-going"`. |
| `notify` | boolean | no | `false` | Send Notification Emails. Send a confirmation email to the attendee and a notification to the organizer. |
| `rsvp_form_data` | object | no |  | Additional Form Fields. Extra RSVP form values for custom forms, as key-value pairs. The name is set by the Name field above. |

### `delete_calendar_subscriber`

**Delete Calendar Subscriber.** Removes a subscriber from an AddEvent calendar, identified by subscriber ID. Use when an agent needs to unsubscribe someone from a calendar. Requires a valid subscriber ID; idempotent, since once removed, repeating the call leaves the subscriber absent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | no |  | Calendar. The calendar to use. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriber_id` | string | yes |  | Subscriber. Pick a calendar above to narrow this list. A value the product loads from the provider, such as an id; write the value itself. |

### `create_add_to_calendar_links`

**Create Dynamic Add to Calendar Links.** Creates an AddEvent event and returns shareable "Add to Calendar" links that let recipients add it to Apple, Google, Outlook, and other calendars. Use when an agent needs distributable per-recipient calendar links rather than a managed calendar entry. Requires a title and start datetime; not idempotent, since each call creates a new event and a unique set of links. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_id` | string | no |  | Calendar. The calendar to use. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The event title shown in the calendar. |
| `datetime_start` | string | yes |  | Start Date/Time. Format: 'YYYY-MM-DD HH:mm:ss' (24-hour), interpreted in the event's timezone. Example: 2025-06-15 14:30:00. A date alone (YYYY-MM-DD) is also accepted. |
| `datetime_end` | string | no |  | End Date/Time. Same format as the start. Defaults to one hour after the start. |
| `all_day_event` | boolean | no | `false` | All-day Event. |
| `timezone` | string | no |  | Timezone. The event's timezone. Defaults to the calendar's timezone if left blank. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Plain text or HTML (around 500 characters recommended). |
| `location` | string | no |  | Location. A physical address or a URL. |

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
