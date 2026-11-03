# Cal.com

Open-source alternative to Calendly

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cal-com'
  version: '0.5.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API Key provided by cal.com

## Actions

### `calcom_list_event_types`

**List Event Types.** Lists event types. With no filters, returns the event types owned by the connected API key. Use this to resolve an event type id before creating or updating a booking or event type. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | no |  | Username. Only event types owned by this Cal.com username. Leave empty to list your own. |
| `event_slug` | string | no |  | Event Slug. Filter to the event type with this exact slug. Requires Username to be set too. |
| `org_slug` | string | no |  | Organization Slug. Only used together with Username / Event Slug when booking through an organization. |

Output fields:

- `[].id`: Event Type ID
- `[].title`: Title
- `[].slug`: Slug
- `[].description`: Description
- `[].lengthInMinutes`: Length (Minutes) (number)
- `[].hidden`: Hidden (boolean)
- `[].scheduleId`: Schedule ID (number)
- `[].bookingUrl`: Booking URL (url)
- `[].price`: Price (number)
- `[].currency`: Currency

### `calcom_get_event_type`

**Get Event Type.** Retrieves full details for one event type by id, including duration, booking window and location settings. Get the id from List Event Types. Does not include the event type's bookings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_type_id` | number | yes |  | Event Type ID. Get this from List Event Types. |

Output fields:

- `id`: Event Type ID
- `title`: Title
- `slug`: Slug
- `description`: Description
- `lengthInMinutes`: Length (Minutes) (number)
- `hidden`: Hidden (boolean)
- `scheduleId`: Schedule ID (number)
- `bookingUrl`: Booking URL (url)
- `price`: Price (number)
- `currency`: Currency

### `calcom_create_event_type`

**Create Event Type.** Creates a new bookable event type with a title, slug and length. Use Additional Fields for any of the many advanced Cal.com event-type settings not exposed directly here (e.g. booking limits, recurrence, locations) — it is merged into the same request. Not idempotent: each call creates a new event type, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `slug` | string | yes |  | Slug. URL-safe identifier for the event type, must be unique. |
| `length_in_minutes` | number | yes |  | Length (Minutes). |
| `description` | string | no |  | Description. |
| `schedule_id` | number | no |  | Schedule ID. Assign a different availability schedule than the owner's default one. Get this from List Schedules. |
| `hidden` | boolean | no |  | Hidden. |
| `additional_fields` | JSON | no |  | Additional Fields. Advanced event-type fields not listed above, as a JSON object matching the Cal.com v2 Create Event Type request body (e.g. {"bookingLimitsCount": {...}}). |

Output fields:

- `id`: Event Type ID
- `title`: Title
- `slug`: Slug
- `description`: Description
- `lengthInMinutes`: Length (Minutes) (number)
- `hidden`: Hidden (boolean)
- `scheduleId`: Schedule ID (number)
- `bookingUrl`: Booking URL (url)
- `price`: Price (number)
- `currency`: Currency

### `calcom_update_event_type`

**Update Event Type.** Partially updates an event type by id: an omitted field keeps its current value. Get the id from List Event Types. Use Additional Fields for any of the many advanced Cal.com event-type settings not exposed directly here (e.g. booking limits, recurrence, locations) — it is merged into the same request. To clear Title/Description, pass a single space; Cal.com silently ignores a true empty string. Idempotent: repeating with the same input yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_type_id` | number | yes |  | Event Type ID. Get this from List Event Types. |
| `title` | string | no |  | Title. |
| `slug` | string | no |  | Slug. |
| `description` | string | no |  | Description. |
| `length_in_minutes` | number | no |  | Length (Minutes). |
| `schedule_id` | number | no |  | Schedule ID. Assign a different availability schedule than the owner's default one. Get this from List Schedules. |
| `hidden` | string | no |  | Hidden. Leave unset to keep the current visibility. One of `"true"`, `"false"`. |
| `additional_fields` | JSON | no |  | Additional Fields. Advanced event-type fields not listed above, as a JSON object matching the Cal.com v2 Update Event Type request body (e.g. {"bookingLimitsCount": {...}}). |

Output fields:

- `id`: Event Type ID
- `title`: Title
- `slug`: Slug
- `description`: Description
- `lengthInMinutes`: Length (Minutes) (number)
- `hidden`: Hidden (boolean)
- `scheduleId`: Schedule ID (number)
- `bookingUrl`: Booking URL (url)
- `price`: Price (number)
- `currency`: Currency

### `calcom_delete_event_type`

**Delete Event Type.** Permanently deletes an event type by id. Existing bookings for it are unaffected, but no new bookings can be made against it afterward. Not idempotent: a repeat call on the same id fails because it is already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_type_id` | number | yes |  | Event Type ID. Get this from List Event Types. |

Output fields:

- `id`: Event Type ID
- `title`: Title
- `slug`: Slug
- `lengthInMinutes`: Length (Minutes) (number)

### `calcom_list_bookings`

**List Bookings.** Lists bookings with optional filters, including a team ID from List Teams. Returns { bookings, nextCursor, hasMore } — pass nextCursor as Cursor on the next call when hasMore is true. Use Get Booking for the full detail of a single result. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. One of `"upcoming"`, `"recurring"`, `"past"`, `"cancelled"`, `"unconfirmed"`. |
| `attendee_email` | string | no |  | Attendee Email. |
| `attendee_name` | string | no |  | Attendee Name. |
| `event_type_id` | number | no |  | Event Type ID. |
| `team_id` | number | no |  | Team ID. Get this from List Teams. |
| `after_start` | string | no |  | Starting After. ISO 8601 timestamp. Only bookings starting after this time. |
| `before_end` | string | no |  | Ending Before. ISO 8601 timestamp. Only bookings ending before this time. |
| `limit` | number | no |  | Limit. 1-100, default 50. |
| `cursor` | string | no |  | Cursor. Pass the cursor from a previous call to get the next page. |

Output fields:

- `bookings`: Bookings
- `bookings[].id`: Booking ID
- `bookings[].uid`: Booking UID
- `bookings[].title`: Title
- `bookings[].description`: Description
- `bookings[].status`: Status
- `bookings[].start`: Start Time (datetime)
- `bookings[].end`: End Time (datetime)
- `bookings[].duration`: Duration (Minutes) (number)
- `bookings[].location`: Location (url)
- `bookings[].meetingUrl`: Meeting URL (url)
- `bookings[].cancellationReason`: Cancellation Reason
- `bookings[].eventTypeId`: Event Type ID (number)
- `bookings[].eventType`: Event Type
- `bookings[].eventType.id`: Event Type ID
- `bookings[].eventType.slug`: Slug
- `bookings[].hosts`: Hosts
- `bookings[].hosts[].id`: Host ID
- `bookings[].hosts[].name`: Name
- `bookings[].hosts[].email`: Email (email)
- `bookings[].hosts[].timeZone`: Timezone
- `bookings[].attendees`: Attendees
- `bookings[].attendees[].name`: Name
- `bookings[].attendees[].email`: Email (email)
- `bookings[].attendees[].timeZone`: Timezone
- `bookings[].attendees[].absent`: Absent (boolean)
- `nextCursor`: Next Cursor
- `hasMore`: Has More (boolean)

### `calcom_get_booking`

**Get Booking.** Retrieves full details for one booking by uid, including its attendees. Get the uid from List Bookings or from a booking trigger payload. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `booking_uid` | string | yes |  | Booking UID. Get this from List Bookings. |

Output fields:

- `id`: Booking ID
- `uid`: Booking UID
- `title`: Title
- `description`: Description
- `status`: Status
- `start`: Start Time (datetime)
- `end`: End Time (datetime)
- `duration`: Duration (Minutes) (number)
- `location`: Location (url)
- `meetingUrl`: Meeting URL (url)
- `cancellationReason`: Cancellation Reason
- `eventTypeId`: Event Type ID (number)
- `eventType`: Event Type
- `eventType.id`: Event Type ID
- `eventType.slug`: Slug
- `hosts`: Hosts
- `hosts[].id`: Host ID
- `hosts[].name`: Name
- `hosts[].email`: Email (email)
- `hosts[].timeZone`: Timezone
- `attendees`: Attendees
- `attendees[].name`: Name
- `attendees[].email`: Email (email)
- `attendees[].timeZone`: Timezone
- `attendees[].absent`: Absent (boolean)

### `calcom_create_booking`

**Create Booking.** Creates a standard (non-recurring, non-instant) booking for an event type at an exact start time. Use Get Available Slots first to find a valid start time. The booking status is ACCEPTED, or PENDING if the event type requires host confirmation (use Confirm Booking / Decline Booking to resolve it). Not idempotent: each call creates a new booking, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_type_id` | number | yes |  | Event Type ID. Get this from List Event Types. |
| `start` | string | yes |  | Start Time. ISO 8601 timestamp in UTC, e.g. 2026-03-05T15:00:00Z. Get a valid value from Get Available Slots. |
| `attendee_name` | string | yes |  | Attendee Name. |
| `attendee_time_zone` | string | yes |  | Attendee Timezone. IANA timezone, e.g. Europe/Berlin. Get valid values from List Timezones. |
| `attendee_email` | string | no |  | Attendee Email. |
| `attendee_phone_number` | string | no |  | Attendee Phone Number. International format, e.g. +14155552671. |
| `guests` | array | no |  | Guest Emails. |
| `length_in_minutes` | number | no |  | Length (Minutes). Only for event types offering multiple possible durations. |

Output fields:

- `id`: Booking ID
- `uid`: Booking UID
- `title`: Title
- `description`: Description
- `status`: Status
- `start`: Start Time (datetime)
- `end`: End Time (datetime)
- `duration`: Duration (Minutes) (number)
- `location`: Location (url)
- `meetingUrl`: Meeting URL (url)
- `cancellationReason`: Cancellation Reason
- `eventTypeId`: Event Type ID (number)
- `eventType`: Event Type
- `eventType.id`: Event Type ID
- `eventType.slug`: Slug
- `hosts`: Hosts
- `hosts[].id`: Host ID
- `hosts[].name`: Name
- `hosts[].email`: Email (email)
- `hosts[].timeZone`: Timezone
- `attendees`: Attendees
- `attendees[].name`: Name
- `attendees[].email`: Email (email)
- `attendees[].timeZone`: Timezone
- `attendees[].absent`: Absent (boolean)

### `calcom_cancel_booking`

**Cancel Booking.** Cancels an active booking by uid, notifying the attendee. Get the uid from List Bookings or Get Booking. Not idempotent: a repeat call on an already-cancelled booking errors. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `booking_uid` | string | yes |  | Booking UID. |
| `cancellation_reason` | string | no |  | Cancellation Reason. |

Output fields:

- `id`: Booking ID
- `uid`: Booking UID
- `title`: Title
- `description`: Description
- `status`: Status
- `start`: Start Time (datetime)
- `end`: End Time (datetime)
- `duration`: Duration (Minutes) (number)
- `location`: Location (url)
- `meetingUrl`: Meeting URL (url)
- `cancellationReason`: Cancellation Reason
- `eventTypeId`: Event Type ID (number)
- `eventType`: Event Type
- `eventType.id`: Event Type ID
- `eventType.slug`: Slug
- `hosts`: Hosts
- `hosts[].id`: Host ID
- `hosts[].name`: Name
- `hosts[].email`: Email (email)
- `hosts[].timeZone`: Timezone
- `attendees`: Attendees
- `attendees[].name`: Name
- `attendees[].email`: Email (email)
- `attendees[].timeZone`: Timezone
- `attendees[].absent`: Absent (boolean)

### `calcom_reschedule_booking`

**Reschedule Booking.** Reschedules a booking to a new start time; the vendor issues a new booking uid for the moved booking, returned in the response. Use Get Available Slots to find a valid new time. Not idempotent: repeating the same call reschedules again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `booking_uid` | string | yes |  | Booking UID. |
| `start` | string | yes |  | New Start Time. ISO 8601 timestamp. |
| `rescheduling_reason` | string | no |  | Reason. |

Output fields:

- `id`: Booking ID
- `uid`: Booking UID
- `title`: Title
- `description`: Description
- `status`: Status
- `start`: Start Time (datetime)
- `end`: End Time (datetime)
- `duration`: Duration (Minutes) (number)
- `location`: Location (url)
- `meetingUrl`: Meeting URL (url)
- `cancellationReason`: Cancellation Reason
- `eventTypeId`: Event Type ID (number)
- `eventType`: Event Type
- `eventType.id`: Event Type ID
- `eventType.slug`: Slug
- `hosts`: Hosts
- `hosts[].id`: Host ID
- `hosts[].name`: Name
- `hosts[].email`: Email (email)
- `hosts[].timeZone`: Timezone
- `attendees`: Attendees
- `attendees[].name`: Name
- `attendees[].email`: Email (email)
- `attendees[].timeZone`: Timezone
- `attendees[].absent`: Absent (boolean)

### `calcom_confirm_booking`

**Confirm Booking.** Confirms a pending booking, finalizing it. Only applies to bookings whose event type requires manual confirmation. Idempotent: confirming an already-confirmed booking is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `booking_uid` | string | yes |  | Booking UID. |

Output fields:

- `id`: Booking ID
- `uid`: Booking UID
- `title`: Title
- `description`: Description
- `status`: Status
- `start`: Start Time (datetime)
- `end`: End Time (datetime)
- `duration`: Duration (Minutes) (number)
- `location`: Location (url)
- `meetingUrl`: Meeting URL (url)
- `cancellationReason`: Cancellation Reason
- `eventTypeId`: Event Type ID (number)
- `eventType`: Event Type
- `eventType.id`: Event Type ID
- `eventType.slug`: Slug
- `hosts`: Hosts
- `hosts[].id`: Host ID
- `hosts[].name`: Name
- `hosts[].email`: Email (email)
- `hosts[].timeZone`: Timezone
- `attendees`: Attendees
- `attendees[].name`: Name
- `attendees[].email`: Email (email)
- `attendees[].timeZone`: Timezone
- `attendees[].absent`: Absent (boolean)

### `calcom_decline_booking`

**Decline Booking.** Declines a pending booking, notifying the attendee it was not accepted. Only applies to bookings awaiting confirmation. Not idempotent: a repeat call on an already-declined booking errors. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `booking_uid` | string | yes |  | Booking UID. |
| `reason` | string | no |  | Reason. |

Output fields:

- `id`: Booking ID
- `uid`: Booking UID
- `title`: Title
- `description`: Description
- `status`: Status
- `start`: Start Time (datetime)
- `end`: End Time (datetime)
- `duration`: Duration (Minutes) (number)
- `location`: Location (url)
- `meetingUrl`: Meeting URL (url)
- `cancellationReason`: Cancellation Reason
- `eventTypeId`: Event Type ID (number)
- `eventType`: Event Type
- `eventType.id`: Event Type ID
- `eventType.slug`: Slug
- `hosts`: Hosts
- `hosts[].id`: Host ID
- `hosts[].name`: Name
- `hosts[].email`: Email (email)
- `hosts[].timeZone`: Timezone
- `attendees`: Attendees
- `attendees[].name`: Name
- `attendees[].email`: Email (email)
- `attendees[].timeZone`: Timezone
- `attendees[].absent`: Absent (boolean)

### `calcom_mark_booking_no_show`

**Mark Booking No-Show.** Flags whether the host and/or one attendee (by email) were absent for a booking. At least one of Host Absent or Attendee Email must be set. Idempotent: re-applying the same absent flag is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `booking_uid` | string | yes |  | Booking UID. |
| `host_absent` | string | no |  | Host Absent. One of `"true"`, `"false"`. |
| `attendee_email` | string | no |  | Attendee Email. Leave empty to only set Host Absent. |
| `attendee_absent` | string | no |  | Attendee Absent. Only used together with Attendee Email. Defaults to Yes. One of `"true"`, `"false"`. |

Output fields:

- `id`: Booking ID
- `uid`: Booking UID
- `title`: Title
- `description`: Description
- `status`: Status
- `start`: Start Time (datetime)
- `end`: End Time (datetime)
- `duration`: Duration (Minutes) (number)
- `location`: Location (url)
- `meetingUrl`: Meeting URL (url)
- `cancellationReason`: Cancellation Reason
- `eventTypeId`: Event Type ID (number)
- `eventType`: Event Type
- `eventType.id`: Event Type ID
- `eventType.slug`: Slug
- `hosts`: Hosts
- `hosts[].id`: Host ID
- `hosts[].name`: Name
- `hosts[].email`: Email (email)
- `hosts[].timeZone`: Timezone
- `attendees`: Attendees
- `attendees[].name`: Name
- `attendees[].email`: Email (email)
- `attendees[].timeZone`: Timezone
- `attendees[].absent`: Absent (boolean)

### `calcom_add_attendee`

**Add Attendee to Booking.** Adds one attendee to an existing booking. Get the booking uid from List Bookings or Get Booking. Not idempotent: each call adds another attendee, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `booking_uid` | string | yes |  | Booking UID. |
| `name` | string | yes |  | Attendee Name. |
| `email` | string | yes |  | Attendee Email. |
| `time_zone` | string | yes |  | Attendee Timezone. IANA timezone, e.g. Europe/Berlin. Get valid values from List Timezones. |
| `phone_number` | string | no |  | Attendee Phone Number. |

Output fields:

- `id`: Attendee ID
- `bookingId`: Booking ID
- `name`: Name
- `email`: Email (email)
- `timeZone`: Timezone
- `absent`: Absent (boolean)

### `calcom_get_available_slots`

**Get Available Slots.** Returns available start times for an event type between Start and End, accounting for existing bookings and availability. Use before Create Booking to pick a valid start time. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_type_id` | number | yes |  | Event Type ID. Get this from List Event Types. |
| `start` | string | yes |  | Start. ISO 8601 timestamp for the beginning of the search range. |
| `end` | string | yes |  | End. ISO 8601 timestamp for the end of the search range. |
| `time_zone` | string | no |  | Timezone. IANA timezone the returned slots are expressed in. |
| `duration` | number | no |  | Duration (Minutes). Only for event types offering multiple possible durations. |

### `calcom_list_schedules`

**List Schedules.** Lists the authenticated user's availability schedules, including which one is marked default. Use to resolve a schedule id before Get Schedule, Update Schedule or Delete Schedule. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Schedule ID
- `[].name`: Name
- `[].timeZone`: Timezone
- `[].isDefault`: Is Default (boolean)
- `[].availability`: Availability
- `[].availability[].days`: Days
- `[].availability[].startTime`: Start Time
- `[].availability[].endTime`: End Time
- `[].overrides`: Date Overrides
- `[].overrides[].date`: Date (date)
- `[].overrides[].startTime`: Start Time
- `[].overrides[].endTime`: End Time

### `calcom_get_schedule`

**Get Schedule.** Retrieves full details for one availability schedule by id, including its weekly availability blocks and date overrides. Get the id from List Schedules. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `schedule_id` | number | yes |  | Schedule ID. Get this from List Schedules. |

Output fields:

- `id`: Schedule ID
- `name`: Name
- `timeZone`: Timezone
- `isDefault`: Is Default (boolean)
- `availability`: Availability
- `availability[].days`: Days
- `availability[].startTime`: Start Time
- `availability[].endTime`: End Time
- `overrides`: Date Overrides
- `overrides[].date`: Date (date)
- `overrides[].startTime`: Start Time
- `overrides[].endTime`: End Time

### `calcom_create_schedule`

**Create Schedule.** Creates a new availability schedule with a weekly recurring pattern and optional date overrides. Setting Is Default to Yes replaces the user's current default schedule. Not idempotent: each call creates a new schedule, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `time_zone` | string | yes |  | Timezone. IANA timezone, e.g. Europe/Berlin. Get valid values from List Timezones. |
| `is_default` | boolean | yes |  | Is Default. Each user has exactly one default schedule; setting this replaces it. |
| `availability` | JSON | no |  | Availability. Array of weekly availability blocks, e.g. [{"days": ["Monday", "Tuesday"], "startTime": "09:00", "endTime": "17:00"}]. Leave empty for Cal.com's default Mon-Fri 9-17 pattern. |
| `overrides` | JSON | no |  | Date Overrides. Array of date-specific overrides, e.g. [{"date": "2026-05-20", "startTime": "12:00", "endTime": "13:00"}]. |

Output fields:

- `id`: Schedule ID
- `name`: Name
- `timeZone`: Timezone
- `isDefault`: Is Default (boolean)
- `availability`: Availability
- `availability[].days`: Days
- `availability[].startTime`: Start Time
- `availability[].endTime`: End Time
- `overrides`: Date Overrides
- `overrides[].date`: Date (date)
- `overrides[].startTime`: Start Time
- `overrides[].endTime`: End Time

### `calcom_update_schedule`

**Update Schedule.** Partially updates a schedule by id: an omitted field keeps its current value, except Availability and Date Overrides, which are fully replaced (not merged) when supplied — read the current schedule with Get Schedule first if you need to change one block while keeping the rest. Idempotent: repeating with the same input yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `schedule_id` | number | yes |  | Schedule ID. Get this from List Schedules. |
| `name` | string | no |  | Name. |
| `time_zone` | string | no |  | Timezone. |
| `is_default` | string | no |  | Is Default. Leave unset to keep the current default schedule unchanged. One of `"true"`, `"false"`. |
| `availability` | JSON | no |  | Availability (full replacement). If set, replaces the entire weekly availability array, e.g. [{"days": ["Monday"], "startTime": "09:00", "endTime": "17:00"}]. |
| `overrides` | JSON | no |  | Date Overrides (full replacement). If set, replaces the entire date-overrides array, e.g. [{"date": "2026-05-20", "startTime": "12:00", "endTime": "13:00"}]. |

Output fields:

- `id`: Schedule ID
- `name`: Name
- `timeZone`: Timezone
- `isDefault`: Is Default (boolean)
- `availability`: Availability
- `availability[].days`: Days
- `availability[].startTime`: Start Time
- `availability[].endTime`: End Time
- `overrides`: Date Overrides
- `overrides[].date`: Date (date)
- `overrides[].startTime`: Start Time
- `overrides[].endTime`: End Time

### `calcom_delete_schedule`

**Delete Schedule.** Permanently deletes an availability schedule by id. Get the id from List Schedules. Not idempotent: a repeat call on the same id fails because it is already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `schedule_id` | number | yes |  | Schedule ID. |

### `calcom_get_default_schedule`

**Get Default Schedule.** Retrieves the authenticated user's own default availability schedule directly, without needing its id. Prefer List Schedules when you need every schedule, not just the default. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Schedule ID
- `name`: Name
- `timeZone`: Timezone
- `isDefault`: Is Default (boolean)
- `availability`: Availability
- `availability[].days`: Days
- `availability[].startTime`: Start Time
- `availability[].endTime`: End Time
- `overrides`: Date Overrides
- `overrides[].date`: Date (date)
- `overrides[].startTime`: Start Time
- `overrides[].endTime`: End Time

### `calcom_list_timezones`

**List Timezones.** Lists valid IANA timezone identifiers (e.g. Europe/Berlin), optionally filtered by a search term. Use to find a valid value for actions that take a timezone, such as Create Booking or Create Schedule. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. |
| `limit` | number | no |  | Limit. |

Output fields:

- `[].city`: City
- `[].timezone`: Timezone
- `[].country`: Country
- `[].region`: Region

### `calcom_get_my_profile`

**Get My Profile.** Retrieves the authenticated user's own profile: id, name, email, username and default timezone. Common prerequisite for actions that need the current user's id or timezone. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `username`: Username
- `name`: Name
- `email`: Email (email)
- `bio`: Bio
- `timeZone`: Timezone
- `weekStart`: Week Start
- `timeFormat`: Time Format (number)
- `defaultScheduleId`: Default Schedule ID (number)
- `avatarUrl`: Avatar URL (image)

### `calcom_update_my_profile`

**Update My Profile.** Partially updates the authenticated user's own profile: an omitted field keeps its current value. To clear Bio, pass a single space; Cal.com silently ignores a true empty string. Idempotent: repeating with the same input yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. |
| `email` | string | no |  | Email. |
| `time_zone` | string | no |  | Timezone. IANA timezone, e.g. Europe/Berlin. Get valid values from List Timezones. |
| `default_schedule_id` | number | no |  | Default Schedule ID. Get this from List Schedules. |
| `week_start` | string | no |  | Week Start. e.g. Monday. |
| `time_format` | string | no |  | Time Format. One of `"12"`, `"24"`. |
| `locale` | string | no |  | Locale. |
| `bio` | string | no |  | Bio. |

Output fields:

- `id`: User ID
- `username`: Username
- `name`: Name
- `email`: Email (email)
- `bio`: Bio
- `timeZone`: Timezone
- `weekStart`: Week Start
- `timeFormat`: Time Format (number)
- `defaultScheduleId`: Default Schedule ID (number)
- `avatarUrl`: Avatar URL (image)

### `calcom_list_teams`

**List Teams.** Lists the authenticated user's teams, with their ids. Use to resolve a team id for filtering List Bookings by team. Needs authentication.

Kind: search, safe to repeat.

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
