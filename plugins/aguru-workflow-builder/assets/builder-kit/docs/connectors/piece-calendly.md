# Calendly

Simple, modern scheduling

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-calendly'
  version: '0.6.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Personal Token

> ## Obtain your Calendly Personal Token
> 1. Go to https://calendly.com/integrations/api_webhooks
> 2. Click on "Create New Token"
> 3. Select these scopes: `users:read`, `organizations:read`, `event_types:read`, `event_types:write`, `availability:read`, `availability:write`, `scheduled_events:read`, `scheduled_events:write`, `scheduling_links:write`, `shares:write`, `locations:read`, `webhooks:read`, `webhooks:write`
> 4. Copy the token and paste it in the field below

## Actions

### `cancel_scheduled_event`

**Cancel Event.** Cancel one upcoming booked Calendly meeting by URI or UUID; Calendly emails the invitees with the optional Reason. Past meetings, already canceled meetings and meetings the connected user does not host cannot be canceled. Cannot be undone; confirm with the user first. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduledEvent` | string | yes |  | Scheduled Event. Scheduled event URI (https://api.calendly.com/scheduled_events/...) or UUID, from List Scheduled Events or a trigger. |
| `reason` | string | no |  | Reason. Shown to the invitees. Up to 10,000 characters. |

Output fields:

- `canceled_by`: Canceled By
- `canceler_type`: Canceler Type
- `reason`: Reason
- `created_at`: Canceled At (datetime)

### `create_event_type`

**Create Event Type.** Create a new one-on-one (solo) Calendly event type owned by a user (defaults to the connected user). Only one-on-one event types can be created through the API. Returns the new event type with its URI and scheduling URL. Not idempotent: each call creates another event type. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | no |  | Owner. User URI or UUID of the host. Leave empty for the connected user. |
| `name` | string | yes |  | Name. |
| `duration` | number | no |  | Duration (minutes). |
| `description` | string | no |  | Description. |
| `color` | string | no |  | Color. Hex color, for example #ff5733. |
| `active` | string | no |  | Status. One of `"true"`, `"false"`. |
| `locations` | array | no |  | Locations. Replaces all locations of the event type when set. Each item: { `kind`, `location`?, `phone_number`?, `additional_info`? }. |

Output fields:

- `uri`: Event Type URI (url)
- `name`: Name
- `slug`: Slug
- `scheduling_url`: Scheduling URL (url)
- `active`: Active (boolean)
- `duration`: Duration (minutes) (number)
- `kind`: Kind
- `type`: Type
- `pooling_type`: Pooling Type
- `secret`: Secret (boolean)
- `color`: Color
- `description_plain`: Description
- `locations`: Locations
- `locations[].kind`: Kind
- `locations[].location`: Location
- `profile`: Host
- `profile.name`: Name
- `profile.owner`: Owner URI (url)
- `profile.type`: Type
- `custom_questions`: Booking Questions
- `custom_questions[].name`: Question
- `custom_questions[].type`: Type
- `custom_questions[].required`: Required (boolean)
- `custom_questions[].enabled`: Enabled (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `create_one_off_event_type`

**Create One-Off Meeting Link.** Create a Calendly one-off meeting: a temporary event type bookable only between Start Date and End Date, outside the host's regular event types. Returns the one-off event type with its scheduling_url to send to the invitee. Not idempotent: each call creates another one-off meeting. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `duration` | number | yes |  | Duration (minutes). |
| `startDate` | string | yes |  | Start Date. First bookable date, YYYY-MM-DD. |
| `endDate` | string | yes |  | End Date. Last bookable date, YYYY-MM-DD. |
| `timezone` | string | no |  | Timezone. IANA timezone such as America/New_York. Defaults to the host's timezone. |
| `host` | string | no |  | Host. User URI or UUID of the host. Leave empty for the connected user. |
| `locationKind` | string | no |  | Location. One of `"google_conference"`, `"zoom_conference"`, `"microsoft_teams_conference"`, `"webex_conference"`, `"gotomeeting_conference"`, `"physical"`, `"inbound_call"`, `"outbound_call"`, `"custom"`, `"ask_invitee"`. |
| `location` | string | no |  | Location Details. Address for in person, text for custom, or the phone number for inbound calls. |

Output fields:

- `uri`: Event Type URI (url)
- `name`: Name
- `slug`: Slug
- `scheduling_url`: Scheduling URL (url)
- `active`: Active (boolean)
- `duration`: Duration (minutes) (number)
- `kind`: Kind
- `type`: Type
- `pooling_type`: Pooling Type
- `secret`: Secret (boolean)
- `color`: Color
- `description_plain`: Description
- `locations`: Locations
- `locations[].kind`: Kind
- `locations[].location`: Location
- `profile`: Host
- `profile.name`: Name
- `profile.owner`: Owner URI (url)
- `profile.type`: Type
- `custom_questions`: Booking Questions
- `custom_questions[].name`: Question
- `custom_questions[].type`: Type
- `custom_questions[].required`: Required (boolean)
- `custom_questions[].enabled`: Enabled (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `create_scheduling_link`

**Create Single-Use Scheduling Link.** Create a single-use Calendly booking link for an active event type: the booking_url expires after one meeting is booked. Use it to send one person a private link; use the event type scheduling_url for a reusable link. Not idempotent: each call creates a new link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventType` | string | yes |  | Event Type. Event type URI (https://api.calendly.com/event_types/...) or UUID, from List Event Types. |

Output fields:

- `booking_url`: Booking URL (url)
- `owner`: Event Type URI (url)
- `owner_type`: Owner Type

### `create_share`

**Create Customized Share Link.** Create a customized one-time share of a one-on-one (solo) Calendly event type, overriding its name, duration or booking window without changing the event type itself. Returns scheduling_links with the booking_url to send. Only one-on-one event types can be shared. Not idempotent: each call creates a new share. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventType` | string | yes |  | Event Type. Event type URI (https://api.calendly.com/event_types/...) or UUID, from List Event Types. |
| `name` | string | no |  | Name. |
| `duration` | number | no |  | Duration (minutes). |
| `startDate` | string | no |  | Start Date. First bookable date, YYYY-MM-DD. Set together with End Date to limit the booking window. |
| `endDate` | string | no |  | End Date. Last bookable date, YYYY-MM-DD. |
| `hideLocation` | boolean | no |  | Hide Location Until Booked. |

Output fields:

- `uri`: Share URI (url)
- `scheduling_links`: Booking Links
- `scheduling_links[].booking_url`: Booking URL (url)
- `scheduling_links[].owner`: Event Type URI (url)
- `scheduling_links[].owner_type`: Owner Type
- `share_override`: Overrides
- `share_override.name`: Name
- `share_override.duration`: Duration (minutes) (number)
- `share_override.period_type`: Booking Window
- `share_override.start_date`: Start Date (date)
- `share_override.end_date`: End Date (date)
- `share_override.hide_location`: Hide Location (boolean)

### `find_invitee_bookings`

**Find Invitee by Email.** Find the Calendly meetings a person booked with the connected user, by the invitee's email: up to the 100 most recent, newest first. Returns found=false when there are none. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Invitee Email. |
| `status` | string | no |  | Status. One of `"active"`, `"canceled"`. |

Output fields:

- `found`: Found (boolean)
- `count`: Count (number)
- `events`: Events
- `events[].uri`: Event URI (url)
- `events[].name`: Name
- `events[].status`: Status
- `events[].start_time`: Start Time (datetime)
- `events[].end_time`: End Time (datetime)
- `events[].event_type`: Event Type URI (url)
- `events[].location`: Location
- `events[].location.type`: Type
- `events[].location.join_url`: Join URL (url)
- `events[].location.location`: Location
- `events[].location.status`: Status
- `events[].invitees_counter`: Invitees
- `events[].invitees_counter.active`: Active (number)
- `events[].invitees_counter.total`: Total (number)
- `events[].invitees_counter.limit`: Limit (number)
- `events[].event_memberships`: Hosts
- `events[].event_memberships[].user`: User URI (url)
- `events[].event_memberships[].user_name`: Name
- `events[].event_memberships[].user_email`: Email (email)
- `events[].cancellation`: Cancellation
- `events[].cancellation.canceled_by`: Canceled By
- `events[].cancellation.canceler_type`: Canceler Type
- `events[].cancellation.reason`: Reason
- `events[].cancellation.created_at`: Canceled At (datetime)
- `events[].meeting_notes_plain`: Meeting Notes
- `events[].created_at`: Created At (datetime)
- `events[].updated_at`: Updated At (datetime)

### `find_user`

**Find User.** Find a member of the connected user's Calendly organization by exact email. Returns found=false when nobody matches, otherwise the user (URI, name, email, scheduling URL, timezone) and their role. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

Output fields:

- `found`: Found (boolean)
- `user`: User
- `user.uri`: User URI (url)
- `user.name`: Name
- `user.email`: Email (email)
- `user.slug`: Slug
- `user.scheduling_url`: Scheduling URL (url)
- `user.timezone`: Timezone
- `user.avatar_url`: Avatar (image)
- `user.locale`: Locale
- `user.created_at`: Created At (datetime)
- `user.updated_at`: Updated At (datetime)
- `role`: Role
- `membership_uri`: Membership URI (url)

### `get_event_invitee`

**Get Event Invitee.** Get one invitee of a booked Calendly meeting by the invitee URI (or its UUID plus the scheduled event): name, email, status, timezone, booking question answers, UTM tracking, payment, no-show record and cancel/reschedule URLs. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invitee` | string | yes |  | Invitee. Invitee URI (https://api.calendly.com/scheduled_events/.../invitees/...), or its UUID together with Scheduled Event. |
| `scheduledEvent` | string | no |  | Scheduled Event. Scheduled event URI or UUID. Only needed when Invitee is a UUID. |

Output fields:

- `uri`: Invitee URI (url)
- `name`: Name
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `status`: Status
- `timezone`: Timezone
- `event`: Event URI (url)
- `rescheduled`: Rescheduled (boolean)
- `cancel_url`: Cancel URL (url)
- `reschedule_url`: Reschedule URL (url)
- `questions_and_answers`: Answers
- `questions_and_answers[].question`: Question
- `questions_and_answers[].answer`: Answer
- `tracking`: Tracking
- `tracking.utm_source`: UTM Source
- `tracking.utm_medium`: UTM Medium
- `tracking.utm_campaign`: UTM Campaign
- `tracking.utm_content`: UTM Content
- `tracking.utm_term`: UTM Term
- `no_show`: No Show
- `no_show.uri`: No Show URI (url)
- `no_show.created_at`: Marked At (datetime)
- `payment`: Payment
- `payment.external_id`: Payment ID
- `payment.provider`: Provider
- `payment.amount`: Amount (number)
- `payment.currency`: Currency
- `payment.successful`: Successful (boolean)
- `payment.terms`: Terms
- `reconfirmation`: Reconfirmation
- `reconfirmation.created_at`: Requested At (datetime)
- `reconfirmation.confirmed_at`: Confirmed At (datetime)
- `text_reminder_number`: Text Reminder Number
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `get_event_type_availability`

**Get Event Type Availability.** Get the weekly availability schedule of one Calendly event type: timezone and rules (per weekday or per date, each with from/to intervals). Call this before Update Event Type Availability, because an update replaces every rule. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventType` | string | yes |  | Event Type. Event type URI (https://api.calendly.com/event_types/...) or UUID, from List Event Types. |

Output fields:

- `items`: Availability Schedules
- `items[].event_type`: Event Type URI (url)
- `items[].availability_setting`: Availability Setting
- `items[].availability_rule`: Availability
- `items[].availability_rule.uri`: Schedule URI (url)
- `items[].availability_rule.name`: Schedule Name
- `items[].availability_rule.timezone`: Timezone
- `items[].availability_rule.rules`: Rules
- `items[].availability_rule.rules[].type`: Type
- `items[].availability_rule.rules[].wday`: Weekday
- `items[].availability_rule.rules[].date`: Date (date)
- `items[].availability_rule.rules[].intervals`: Intervals
- `items[].availability_rule.rules[].intervals[].from`: From
- `items[].availability_rule.rules[].intervals[].to`: To
- `count`: Count (number)

### `get_event_type`

**Get Event Type.** Get one Calendly event type by URI or UUID: name, duration and duration options, kind, active flag, locations, custom questions, profile and scheduling URL. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventType` | string | yes |  | Event Type. Event type URI (https://api.calendly.com/event_types/...) or UUID, from List Event Types. |

Output fields:

- `uri`: Event Type URI (url)
- `name`: Name
- `slug`: Slug
- `scheduling_url`: Scheduling URL (url)
- `active`: Active (boolean)
- `duration`: Duration (minutes) (number)
- `kind`: Kind
- `type`: Type
- `pooling_type`: Pooling Type
- `secret`: Secret (boolean)
- `color`: Color
- `description_plain`: Description
- `locations`: Locations
- `locations[].kind`: Kind
- `locations[].location`: Location
- `profile`: Host
- `profile.name`: Name
- `profile.owner`: Owner URI (url)
- `profile.type`: Type
- `custom_questions`: Booking Questions
- `custom_questions[].name`: Question
- `custom_questions[].type`: Type
- `custom_questions[].required`: Required (boolean)
- `custom_questions[].enabled`: Enabled (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `get_organization_membership`

**Get Organization Membership.** Get one Calendly organization membership by its URI or UUID (from List Organization Members): the member's role and user profile. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `membership` | string | yes |  | Membership. Organization membership URI or UUID. |

Output fields:

- `uri`: Membership URI (url)
- `role`: Role
- `organization`: Organization URI (url)
- `user`: User
- `user.uri`: User URI (url)
- `user.name`: Name
- `user.email`: Email (email)
- `user.slug`: Slug
- `user.scheduling_url`: Scheduling URL (url)
- `user.timezone`: Timezone
- `user.avatar_url`: Avatar (image)
- `user.locale`: Locale
- `user.created_at`: Created At (datetime)
- `user.updated_at`: Updated At (datetime)
- `created_at`: Created At (datetime)

### `get_organization`

**Get Organization.** Get a Calendly organization's name, plan (basic, standard, teams, enterprise...) and stage (free, trial, paid). Leave Organization empty for the connected user's organization. Use it to check whether plan-gated features are available. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization` | string | no |  | Organization. Organization URI (https://api.calendly.com/organizations/...) or UUID. Leave empty to use the connected user's organization. |

Output fields:

- `uri`: Organization URI (url)
- `name`: Name
- `plan`: Plan
- `stage`: Stage
- `kind`: Kind
- `created_at`: Created At (datetime)

### `get_scheduled_event`

**Find Event.** Get one booked Calendly meeting by URI or UUID: name, status, start and end time, event type, location (join URL for video calls), hosts, invitee counts and cancellation details when canceled. Invitees are not included; use List Event Invitees. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduledEvent` | string | yes |  | Scheduled Event. Scheduled event URI (https://api.calendly.com/scheduled_events/...) or UUID, from List Scheduled Events or a trigger. |

Output fields:

- `uri`: Event URI (url)
- `name`: Name
- `status`: Status
- `start_time`: Start Time (datetime)
- `end_time`: End Time (datetime)
- `event_type`: Event Type URI (url)
- `location`: Location
- `location.type`: Type
- `location.join_url`: Join URL (url)
- `location.location`: Location
- `location.status`: Status
- `invitees_counter`: Invitees
- `invitees_counter.active`: Active (number)
- `invitees_counter.total`: Total (number)
- `invitees_counter.limit`: Limit (number)
- `event_memberships`: Hosts
- `event_memberships[].user`: User URI (url)
- `event_memberships[].user_name`: Name
- `event_memberships[].user_email`: Email (email)
- `cancellation`: Cancellation
- `cancellation.canceled_by`: Canceled By
- `cancellation.canceler_type`: Canceler Type
- `cancellation.reason`: Reason
- `cancellation.created_at`: Canceled At (datetime)
- `meeting_notes_plain`: Meeting Notes
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `get_user_availability_schedule`

**Get User Availability Schedule.** Get one Calendly user availability schedule by URI or UUID (from List User Availability Schedules): name, default flag, timezone and rules. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `schedule` | string | yes |  | Availability Schedule. Availability schedule URI or UUID. |

Output fields:

- `uri`: Schedule URI (url)
- `name`: Name
- `default`: Default (boolean)
- `timezone`: Timezone
- `user`: User URI (url)
- `rules`: Rules
- `rules[].type`: Type
- `rules[].wday`: Weekday
- `rules[].date`: Date (date)
- `rules[].intervals`: Intervals
- `rules[].intervals[].from`: From
- `rules[].intervals[].to`: To

### `get_user`

**Get User.** Get a Calendly user's profile: URI, name, email, scheduling URL, timezone and current organization URI. Leave User empty to get the connected account (who am I); the returned uri and current_organization are the User and Organization values other Calendly actions need. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User. User URI or UUID. Leave empty to get the connected user. |

Output fields:

- `uri`: User URI (url)
- `name`: Name
- `email`: Email (email)
- `slug`: Slug
- `scheduling_url`: Scheduling URL (url)
- `timezone`: Timezone
- `avatar_url`: Avatar (image)
- `locale`: Locale
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `current_organization`: Organization URI (url)

### `list_available_times`

**List Available Times.** List the open start times of one Calendly event type between Start Time and End Time (at most 31 days apart, End Time in the future; a past Start Time is moved to now). Each slot has start_time, invitees_remaining and a scheduling_url that books that slot. Use it to answer "when is X free" or before sending someone a time. Not paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventType` | string | yes |  | Event Type. Event type URI (https://api.calendly.com/event_types/...) or UUID, from List Event Types. |
| `startTime` | ISO date-time string | yes |  | Start Time. |
| `endTime` | ISO date-time string | yes |  | End Time. At most 31 days after Start Time. |

Output fields:

- `items`: Available Times
- `items[].start_time`: Start Time (datetime)
- `items[].status`: Status
- `items[].invitees_remaining`: Spots Left (number)
- `items[].scheduling_url`: Booking URL (url)
- `count`: Count (number)

### `list_event_invitees`

**List Event Invitees.** List the invitees of one booked Calendly meeting with each invitee URI, name, email, status, timezone, answers to booking questions, no-show record and cancel/reschedule URLs. Filter by email or status. The invitee uri is what Mark Invitee as No Show needs. Paginated with Page Token. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduledEvent` | string | yes |  | Scheduled Event. Scheduled event URI (https://api.calendly.com/scheduled_events/...) or UUID, from List Scheduled Events or a trigger. |
| `email` | string | no |  | Email. |
| `status` | string | no |  | Status. One of `"active"`, `"canceled"`. |
| `count` | number | no | `20` | Page Size. How many items to return, from 1 to 100. |
| `pageToken` | string | no |  | Page Token. Next Page Token from a previous call. Leave empty for the first page. |

Output fields:

- `items`: Invitees
- `items[].uri`: Invitee URI (url)
- `items[].name`: Name
- `items[].email`: Email (email)
- `items[].first_name`: First Name
- `items[].last_name`: Last Name
- `items[].status`: Status
- `items[].timezone`: Timezone
- `items[].event`: Event URI (url)
- `items[].rescheduled`: Rescheduled (boolean)
- `items[].cancel_url`: Cancel URL (url)
- `items[].reschedule_url`: Reschedule URL (url)
- `items[].questions_and_answers`: Answers
- `items[].questions_and_answers[].question`: Question
- `items[].questions_and_answers[].answer`: Answer
- `items[].tracking`: Tracking
- `items[].tracking.utm_source`: UTM Source
- `items[].tracking.utm_medium`: UTM Medium
- `items[].tracking.utm_campaign`: UTM Campaign
- `items[].tracking.utm_content`: UTM Content
- `items[].tracking.utm_term`: UTM Term
- `items[].no_show`: No Show
- `items[].no_show.uri`: No Show URI (url)
- `items[].no_show.created_at`: Marked At (datetime)
- `items[].payment`: Payment
- `items[].payment.external_id`: Payment ID
- `items[].payment.provider`: Provider
- `items[].payment.amount`: Amount (number)
- `items[].payment.currency`: Currency
- `items[].payment.successful`: Successful (boolean)
- `items[].payment.terms`: Terms
- `items[].reconfirmation`: Reconfirmation
- `items[].reconfirmation.created_at`: Requested At (datetime)
- `items[].reconfirmation.confirmed_at`: Confirmed At (datetime)
- `items[].text_reminder_number`: Text Reminder Number
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `list_event_type_hosts`

**List Event Type Hosts.** List the hosts (members) of one Calendly event type, each with the member user URI, name and email. Useful for group, collective and round-robin event types. Paginated with Page Token. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventType` | string | yes |  | Event Type. Event type URI (https://api.calendly.com/event_types/...) or UUID, from List Event Types. |
| `count` | number | no | `20` | Page Size. How many items to return, from 1 to 100. |
| `pageToken` | string | no |  | Page Token. Next Page Token from a previous call. Leave empty for the first page. |

Output fields:

- `items`: Hosts
- `items[].uri`: Host Membership URI (url)
- `items[].member`: Host
- `items[].member.uri`: User URI (url)
- `items[].member.name`: Name
- `items[].member.email`: Email (email)
- `items[].member.slug`: Slug
- `items[].member.scheduling_url`: Scheduling URL (url)
- `items[].member.timezone`: Timezone
- `items[].member.avatar_url`: Avatar (image)
- `items[].member.locale`: Locale
- `items[].member.created_at`: Created At (datetime)
- `items[].member.updated_at`: Updated At (datetime)
- `items[].created_at`: Added At (datetime)
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `list_event_types`

**List Event Types.** List Calendly event types (bookable meeting templates) with each URI, name, duration, kind, active flag and scheduling URL. Defaults to the connected user's event types; set Organization instead to list every event type in the organization (admin only). The returned uri is the Event Type value other actions need. Paginated with Page Token. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User. User URI (https://api.calendly.com/users/...) or UUID. Leave empty to use the connected user. |
| `organization` | string | no |  | Organization. Organization URI or UUID. When set, lists the whole organization instead of one user. |
| `active` | string | no |  | Status. One of `"true"`, `"false"`. |
| `count` | number | no | `20` | Page Size. How many items to return, from 1 to 100. |
| `pageToken` | string | no |  | Page Token. Next Page Token from a previous call. Leave empty for the first page. |

Output fields:

- `items`: Event Types
- `items[].uri`: Event Type URI (url)
- `items[].name`: Name
- `items[].slug`: Slug
- `items[].scheduling_url`: Scheduling URL (url)
- `items[].active`: Active (boolean)
- `items[].duration`: Duration (minutes) (number)
- `items[].kind`: Kind
- `items[].type`: Type
- `items[].pooling_type`: Pooling Type
- `items[].secret`: Secret (boolean)
- `items[].color`: Color
- `items[].description_plain`: Description
- `items[].locations`: Locations
- `items[].locations[].kind`: Kind
- `items[].locations[].location`: Location
- `items[].profile`: Host
- `items[].profile.name`: Name
- `items[].profile.owner`: Owner URI (url)
- `items[].profile.type`: Type
- `items[].custom_questions`: Booking Questions
- `items[].custom_questions[].name`: Question
- `items[].custom_questions[].type`: Type
- `items[].custom_questions[].required`: Required (boolean)
- `items[].custom_questions[].enabled`: Enabled (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `list_organization_memberships`

**List Organization Members.** List the members of a Calendly organization with each membership URI, role (owner, admin, user) and the member's user URI, name and email. Leave Organization empty for the connected user's organization. Filter by email or role. Paginated with Page Token. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization` | string | no |  | Organization. Organization URI (https://api.calendly.com/organizations/...) or UUID. Leave empty to use the connected user's organization. |
| `email` | string | no |  | Email. Only return the member with this email. |
| `role` | string | no |  | Role. One of `"owner"`, `"admin"`, `"user"`. |
| `count` | number | no | `20` | Page Size. How many items to return, from 1 to 100. |
| `pageToken` | string | no |  | Page Token. Next Page Token from a previous call. Leave empty for the first page. |

Output fields:

- `items`: Members
- `items[].uri`: Membership URI (url)
- `items[].role`: Role
- `items[].organization`: Organization URI (url)
- `items[].user`: User
- `items[].user.uri`: User URI (url)
- `items[].user.name`: Name
- `items[].user.email`: Email (email)
- `items[].user.slug`: Slug
- `items[].user.scheduling_url`: Scheduling URL (url)
- `items[].user.timezone`: Timezone
- `items[].user.avatar_url`: Avatar (image)
- `items[].user.locale`: Locale
- `items[].user.created_at`: Created At (datetime)
- `items[].user.updated_at`: Updated At (datetime)
- `items[].created_at`: Created At (datetime)
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `list_scheduled_events`

**List Scheduled Events.** List booked Calendly meetings with each URI, name, status, start and end time, event type, location and invitee counts. Defaults to the connected user's meetings; set Organization to list the whole organization (admin only). Filter by invitee email, status and a start-time range (UTC ISO 8601). Invitees are not included; use List Event Invitees. Paginated with Page Token. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User. User URI (https://api.calendly.com/users/...) or UUID. Leave empty to use the connected user. |
| `organization` | string | no |  | Organization. Organization URI or UUID. When set, lists the whole organization instead of one user. |
| `inviteeEmail` | string | no |  | Invitee Email. |
| `status` | string | no |  | Status. One of `"active"`, `"canceled"`. |
| `minStartTime` | ISO date-time string | no |  | Starts After. |
| `maxStartTime` | ISO date-time string | no |  | Starts Before. |
| `sort` | string | no | `"start_time:asc"` | Sort. One of `"start_time:asc"`, `"start_time:desc"`. |
| `count` | number | no | `20` | Page Size. How many items to return, from 1 to 100. |
| `pageToken` | string | no |  | Page Token. Next Page Token from a previous call. Leave empty for the first page. |

Output fields:

- `items`: Events
- `items[].uri`: Event URI (url)
- `items[].name`: Name
- `items[].status`: Status
- `items[].start_time`: Start Time (datetime)
- `items[].end_time`: End Time (datetime)
- `items[].event_type`: Event Type URI (url)
- `items[].location`: Location
- `items[].location.type`: Type
- `items[].location.join_url`: Join URL (url)
- `items[].location.location`: Location
- `items[].location.status`: Status
- `items[].invitees_counter`: Invitees
- `items[].invitees_counter.active`: Active (number)
- `items[].invitees_counter.total`: Total (number)
- `items[].invitees_counter.limit`: Limit (number)
- `items[].event_memberships`: Hosts
- `items[].event_memberships[].user`: User URI (url)
- `items[].event_memberships[].user_name`: Name
- `items[].event_memberships[].user_email`: Email (email)
- `items[].cancellation`: Cancellation
- `items[].cancellation.canceled_by`: Canceled By
- `items[].cancellation.canceler_type`: Canceler Type
- `items[].cancellation.reason`: Reason
- `items[].cancellation.created_at`: Canceled At (datetime)
- `items[].meeting_notes_plain`: Meeting Notes
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `list_user_availability_schedules`

**List User Availability Schedules.** List a Calendly user's availability schedules (working hours), each with URI, name, default flag, timezone and weekday/date rules. Defaults to the connected user. Not paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User. User URI (https://api.calendly.com/users/...) or UUID. Leave empty to use the connected user. |

Output fields:

- `items`: Availability Schedules
- `items[].uri`: Schedule URI (url)
- `items[].name`: Name
- `items[].default`: Default (boolean)
- `items[].timezone`: Timezone
- `items[].user`: User URI (url)
- `items[].rules`: Rules
- `items[].rules[].type`: Type
- `items[].rules[].wday`: Weekday
- `items[].rules[].date`: Date (date)
- `items[].rules[].intervals`: Intervals
- `items[].rules[].intervals[].from`: From
- `items[].rules[].intervals[].to`: To
- `count`: Count (number)

### `list_user_busy_times`

**List User Busy Times.** List a Calendly user's busy intervals between Start Time and End Time (at most 7 days apart, End Time in the future; a past Start Time is moved to now), in ascending order. Includes Calendly bookings and events from connected calendars that have conflict checking on. Each item has type (calendly or external), start_time and end_time. Defaults to the connected user. Not paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User. User URI (https://api.calendly.com/users/...) or UUID. Leave empty to use the connected user. |
| `startTime` | ISO date-time string | yes |  | Start Time. |
| `endTime` | ISO date-time string | yes |  | End Time. At most 7 days after Start Time. |

Output fields:

- `items`: Busy Times
- `items[].type`: Type
- `items[].start_time`: Start Time (datetime)
- `items[].end_time`: End Time (datetime)
- `items[].buffered_start_time`: Buffered Start Time (datetime)
- `items[].buffered_end_time`: Buffered End Time (datetime)
- `items[].event`: Event
- `items[].event.uri`: Event URI (url)
- `count`: Count (number)

### `list_user_locations`

**List User Meeting Locations.** List the meeting location kinds a Calendly user can use (zoom_conference, google_conference, physical, ...) and whether each one is connected. Check this before choosing a location for Create Event Type or Create One-Off Meeting Link. Defaults to the connected user. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User. User URI (https://api.calendly.com/users/...) or UUID. Leave empty to use the connected user. |

Output fields:

- `items`: Locations
- `items[].kind`: Kind
- `items[].connected`: Connected (boolean)
- `count`: Count (number)

### `update_event_type_availability`

**Update Event Type Availability.** Replace the availability schedule of one Calendly event type. Rules REPLACES every existing rule, so first call Get Event Type Availability, change the rules you need and send back the full list. Each rule is {"type":"wday","wday":"monday","intervals":[{"from":"09:00","to":"17:00"}]} or {"type":"date","date":"2026-12-24","intervals":[]} (empty intervals = unavailable that day). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventType` | string | yes |  | Event Type. Event type URI (https://api.calendly.com/event_types/...) or UUID, from List Event Types. |
| `timezone` | string | yes |  | Timezone. IANA timezone such as America/New_York. |
| `rules` | JSON | yes |  | Rules. Full list of rules, replacing the current ones. Example: [{"type":"wday","wday":"monday","intervals":[{"from":"09:00","to":"17:00"}]}]. |

Output fields:

- `event_type`: Event Type URI (url)
- `availability_setting`: Availability Setting
- `availability_rule`: Availability
- `availability_rule.uri`: Schedule URI (url)
- `availability_rule.name`: Schedule Name
- `availability_rule.timezone`: Timezone
- `availability_rule.rules`: Rules
- `availability_rule.rules[].type`: Type
- `availability_rule.rules[].wday`: Weekday
- `availability_rule.rules[].date`: Date (date)
- `availability_rule.rules[].intervals`: Intervals
- `availability_rule.rules[].intervals[].from`: From
- `availability_rule.rules[].intervals[].to`: To

### `update_event_type`

**Update Event Type.** Update a one-on-one (solo) Calendly event type: name, duration, description, color, active status or locations. Only the fields you set are changed, except Locations, which replaces the whole location list when set. Group, collective and round-robin event types cannot be updated through the API. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventType` | string | yes |  | Event Type. Event type URI (https://api.calendly.com/event_types/...) or UUID, from List Event Types. |
| `name` | string | no |  | Name. |
| `duration` | number | no |  | Duration (minutes). |
| `description` | string | no |  | Description. |
| `color` | string | no |  | Color. Hex color, for example #ff5733. |
| `active` | string | no |  | Status. One of `"true"`, `"false"`. |
| `locations` | array | no |  | Locations. Replaces all locations of the event type when set. Each item: { `kind`, `location`?, `phone_number`?, `additional_info`? }. |

Output fields:

- `uri`: Event Type URI (url)
- `name`: Name
- `slug`: Slug
- `scheduling_url`: Scheduling URL (url)
- `active`: Active (boolean)
- `duration`: Duration (minutes) (number)
- `kind`: Kind
- `type`: Type
- `pooling_type`: Pooling Type
- `secret`: Secret (boolean)
- `color`: Color
- `description_plain`: Description
- `locations`: Locations
- `locations[].kind`: Kind
- `locations[].location`: Location
- `profile`: Host
- `profile.name`: Name
- `profile.owner`: Owner URI (url)
- `profile.type`: Type
- `custom_questions`: Booking Questions
- `custom_questions[].name`: Question
- `custom_questions[].type`: Type
- `custom_questions[].required`: Required (boolean)
- `custom_questions[].enabled`: Enabled (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

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
