# Zoom

Video conferencing, web conferencing, webinars, screen sharing

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zoom'
  version: '0.9.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> 1. Go to [marketplace.zoom.us](https://marketplace.zoom.us/) and log in to your account.
> 2. In the upper-right corner, click **Develop** then **Build App**.
> 3. Select **General App**.
> 4. Copy the Client ID and Client Secret.Add Redirect URL and press continue.
> 5. Go to **Scopes** from left side bar and add the scopes for the actions you use:
> - Meetings: **meeting:write:meeting**, **meeting:read:meeting**, **meeting:read:list_meetings**, **meeting:update:meeting**, **meeting:delete:meeting**
> - Registrants: **meeting:write:registrant**
> - Past meetings: **meeting:read:list_past_instances**
> - Cloud recordings: **cloud_recording:read:list_user_recordings**
> - Current user: **user:read:user**
> 6. After adding scopes to an existing app, reconnect this connection so Zoom grants them.

## Actions

### `zoom_create_meeting`

**Create Zoom Meeting.** Schedules a new Zoom meeting on the authenticated user's account, returning the meeting ID and join URL. Use to set up a video call; only the topic is required, with optional start time and timezone, duration, password, sign-in requirement and audio/recording settings. Each call creates a distinct meeting, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Meeting's topic. The meeting's topic. |
| `start_time` | string | no |  | Start Time. Meeting start date-time, for example 2026-11-01T15:00:00 (read in the Timezone below) or 2026-11-01T15:00:00Z (UTC). |
| `timezone` | string | no |  | Timezone. IANA timezone for the start time, for example America/New_York. Defaults to UTC. |
| `duration` | number | no |  | Duration (in Minutes). Duration of the meeting. |
| `auto_recording` | string | no |  | Auto Recording. One of `"local"`, `"cloud"`, `"none"`. |
| `audio` | string | no |  | Audio. One of `"both"`, `"telephony"`, `"voip"`, `"thirdParty"`. |
| `agenda` | string | no |  | Agenda. The meeting's agenda. |
| `password` | string | no |  | Password. The password required to join the meeting. By default, a password can only have a maximum length of 10 characters and only contain alphanumeric characters and the @, -, _, and * characters. |
| `pre_schedule` | boolean | no |  | Pre Schedule. Whether the prescheduled meeting was created via the GSuite app. |
| `schedule_for` | string | no |  | Schedule for. The email address or user ID of the user to schedule a meeting for. |
| `join_url` | string | no |  | Join URL. Not used by Zoom (kept for compatibility). Zoom creates the join URL and returns it in the output. |
| `require_authentication` | boolean | no | `true` | Require Zoom Sign-in to Join. When on, only participants signed in to a Zoom account can join. Turn off to let anyone with the link join. |

Output fields:

- `id`: Meeting ID (number)
- `uuid`: Meeting UUID
- `topic`: Topic
- `type`: Type (number)
- `status`: Status
- `start_time`: Start Time (datetime)
- `duration`: Duration (minutes) (number)
- `timezone`: Timezone
- `agenda`: Agenda
- `join_url`: Join URL (url)
- `registration_url`: Registration URL (url)
- `password`: Passcode
- `host_id`: Host ID
- `host_email`: Host Email (email)
- `created_at`: Created At (datetime)
- `pre_schedule`: Pre-scheduled (boolean)
- `occurrences`: Occurrences
- `occurrences[].occurrence_id`: Occurrence ID
- `occurrences[].start_time`: Start Time (datetime)
- `occurrences[].duration`: Duration (minutes) (number)
- `occurrences[].status`: Status
- `settings`: Settings
- `settings.host_video`: Host Video On (boolean)
- `settings.participant_video`: Participant Video On (boolean)
- `settings.join_before_host`: Join Before Host (boolean)
- `settings.mute_upon_entry`: Mute Upon Entry (boolean)
- `settings.waiting_room`: Waiting Room (boolean)
- `settings.meeting_authentication`: Sign-in Required (boolean)
- `settings.auto_recording`: Auto Recording
- `settings.audio`: Audio
- `settings.approval_type`: Registration Approval Type (number)
- `settings.alternative_hosts`: Alternative Hosts

### `zoom_create_meeting_registrant`

**Create Zoom Meeting Registrant.** Registers an attendee for an existing Zoom meeting identified by its meeting ID, capturing their name, email, and optional profile/custom-question fields. Use to add a participant to a meeting that has registration enabled. Each call submits a new registration, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. The meeting ID. |
| `first_name` | string | yes |  | First name. The registrant's first name. |
| `last_name` | string | no |  | Last name. The registrant's last name. |
| `email` | string | yes |  | Email. The registrant's email address. |
| `address` | string | no |  | Address. The registrant's address. |
| `city` | string | no |  | City. The registrant's city. |
| `state` | string | no |  | State. The registrant's state or province. |
| `zip` | string | no |  | Zip. The registrant's zip or postal code. |
| `country` | string | no |  | Country. The registrant's two-letter country code. |
| `phone` | string | no |  | Phone. The registrant's phone number. |
| `comments` | string | no |  | Comments. The registrant's questions and comments. |
| `custom_questions` | object | no |  | Custom questions. Answers to the meeting's custom registration questions: use the question title as the key and the answer as the value. |
| `industry` | string | no |  | Industry. The registrant's industry. |
| `job_title` | string | no |  | Job title. The registrant's job title. |
| `no_of_employees` | string | no |  | No of employees. The registrant's number of employees. One of `"1-20"`, `"21-50"`, `"51-100"`, `"101-500"`, `"500-1,000"`, `"1,001-5,000"`, `"5,001-10,000"`, `"More than 10,000"`. |
| `org` | string | no |  | Organization. The registrant's organization. |
| `purchasing_time_frame` | string | no |  | Purchasing time frame. The registrant's purchasing time frame. One of `"Within a month"`, `"1-3 months"`, `"4-6 months"`, `"More than 6 months"`, `"No timeframe"`. |
| `role_in_purchase_process` | string | no |  | Role in purchase process. The registrant's role in the purchase process. One of `"Decision Maker"`, `"Evaluator/Recommender"`, `"Influencer"`, `"Not involved"`. |

Output fields:

- `registrant_id`: Registrant ID
- `id`: Meeting ID (number)
- `topic`: Topic
- `start_time`: Start Time (datetime)
- `join_url`: Personal Join URL (url)
- `participant_pin_code`: Participant PIN Code (number)
- `occurrences`: Occurrences
- `occurrences[].occurrence_id`: Occurrence ID
- `occurrences[].start_time`: Start Time (datetime)
- `occurrences[].duration`: Duration (minutes) (number)
- `occurrences[].status`: Status

### `zoom_find_meeting`

**Find Zoom Meeting.** Fetches the full details of an existing Zoom meeting by its meeting ID. Use to look up a meeting before acting on it; optionally target a specific occurrence of a recurring meeting or include all previous occurrences. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting. Select a meeting from your Zoom account. A value the product loads from the provider, such as an id; write the value itself. |
| `occurrence_id` | string | no |  | Occurrence ID. Meeting Occurrence ID. Provide this field to view meeting details of a particular occurrence of the recurring meeting. |
| `show_previous_occurrences` | boolean | no | `false` | Show Previous Occurrences. Set to true if you would like to view meeting details of all previous occurrences of a recurring meeting. |

Output fields:

- `id`: Meeting ID (number)
- `uuid`: Meeting UUID
- `topic`: Topic
- `type`: Type (number)
- `status`: Status
- `start_time`: Start Time (datetime)
- `duration`: Duration (minutes) (number)
- `timezone`: Timezone
- `agenda`: Agenda
- `join_url`: Join URL (url)
- `registration_url`: Registration URL (url)
- `password`: Passcode
- `host_id`: Host ID
- `host_email`: Host Email (email)
- `created_at`: Created At (datetime)
- `pre_schedule`: Pre-scheduled (boolean)
- `occurrences`: Occurrences
- `occurrences[].occurrence_id`: Occurrence ID
- `occurrences[].start_time`: Start Time (datetime)
- `occurrences[].duration`: Duration (minutes) (number)
- `occurrences[].status`: Status
- `settings`: Settings
- `settings.host_video`: Host Video On (boolean)
- `settings.participant_video`: Participant Video On (boolean)
- `settings.join_before_host`: Join Before Host (boolean)
- `settings.mute_upon_entry`: Mute Upon Entry (boolean)
- `settings.waiting_room`: Waiting Room (boolean)
- `settings.meeting_authentication`: Sign-in Required (boolean)
- `settings.auto_recording`: Auto Recording
- `settings.audio`: Audio
- `settings.approval_type`: Registration Approval Type (number)
- `settings.alternative_hosts`: Alternative Hosts

### `zoom_update_meeting`

**Update Zoom Meeting.** Modifies an existing Zoom meeting identified by its meeting ID, applying only the fields you supply (topic, start time, duration, timezone, password, and audio/video/recording/waiting-room settings). Use to reschedule or reconfigure a meeting. Repeating the call with the same values produces the same end state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting. Select a meeting from your Zoom account. A value the product loads from the provider, such as an id; write the value itself. |
| `topic` | string | no |  | Meeting's topic. The meeting's topic. |
| `start_time` | string | no |  | Start Time. Meeting start date-time (ISO 8601 format, e.g., 2023-05-01T12:00:00Z) |
| `duration` | number | no |  | Duration (in Minutes). Duration of the meeting. |
| `timezone` | string | no |  | Timezone. Timezone for the meeting (e.g., UTC, America/New_York) |
| `auto_recording` | string | no |  | Auto Recording. One of `"local"`, `"cloud"`, `"none"`. |
| `audio` | string | no |  | Audio. One of `"both"`, `"telephony"`, `"voip"`, `"thirdParty"`. |
| `agenda` | string | no |  | Agenda. The meeting's agenda. |
| `password` | string | no |  | Password. The password required to join the meeting. By default, a password can only have a maximum length of 10 characters and only contain alphanumeric characters and the @, -, _, and * characters. |
| `host_video` | boolean | no |  | Host Video. Whether to start video when the host joins the meeting. |
| `participant_video` | boolean | no |  | Participant Video. Whether to start video when participants join the meeting. |
| `join_before_host` | boolean | no |  | Join Before Host. Whether participants can join the meeting before the host starts the meeting. |
| `mute_upon_entry` | boolean | no |  | Mute Upon Entry. Whether to mute participants upon entry. |
| `waiting_room` | boolean | no |  | Waiting Room. Whether to enable waiting room. |

Output fields:

- `success`: Success (boolean)
- `meeting_id`: Meeting ID
- `message`: Message

### `zoom_get_meeting`

**Get Meeting.** Fetches one Zoom meeting by its numeric meeting ID, optionally a specific occurrence of a recurring meeting. Use after List Meetings or Create Meeting to read the join URL, settings or start time. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. The numeric Zoom meeting ID, for example 85746065432. |
| `occurrence_id` | string | no |  | Occurrence ID. Only for recurring meetings: the occurrence ID of one specific occurrence. Leave empty to target the whole meeting. |
| `show_previous_occurrences` | boolean | no | `false` | Show Previous Occurrences. For recurring meetings: also include occurrences that already happened. |

Output fields:

- `id`: Meeting ID (number)
- `uuid`: Meeting UUID
- `topic`: Topic
- `type`: Type (number)
- `status`: Status
- `start_time`: Start Time (datetime)
- `duration`: Duration (minutes) (number)
- `timezone`: Timezone
- `agenda`: Agenda
- `join_url`: Join URL (url)
- `registration_url`: Registration URL (url)
- `password`: Passcode
- `host_id`: Host ID
- `host_email`: Host Email (email)
- `created_at`: Created At (datetime)
- `pre_schedule`: Pre-scheduled (boolean)
- `occurrences`: Occurrences
- `occurrences[].occurrence_id`: Occurrence ID
- `occurrences[].start_time`: Start Time (datetime)
- `occurrences[].duration`: Duration (minutes) (number)
- `occurrences[].status`: Status
- `settings`: Settings
- `settings.host_video`: Host Video On (boolean)
- `settings.participant_video`: Participant Video On (boolean)
- `settings.join_before_host`: Join Before Host (boolean)
- `settings.mute_upon_entry`: Mute Upon Entry (boolean)
- `settings.waiting_room`: Waiting Room (boolean)
- `settings.meeting_authentication`: Sign-in Required (boolean)
- `settings.auto_recording`: Auto Recording
- `settings.audio`: Audio
- `settings.approval_type`: Registration Approval Type (number)
- `settings.alternative_hosts`: Alternative Hosts

### `zoom_update_meeting_by_id`

**Update Meeting (by ID).** Changes an existing meeting's topic, start time, duration, timezone, agenda, passcode or settings; omitted fields stay as they are and Clear Agenda blanks the agenda. Use to reschedule or reconfigure a meeting; target one occurrence of a recurring meeting with occurrence_id. Repeating the call with the same values gives the same meeting, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. The numeric Zoom meeting ID to change, for example 85746065432. |
| `occurrence_id` | string | no |  | Occurrence ID. Only for recurring meetings: the occurrence ID of one specific occurrence. Leave empty to target the whole meeting. |
| `topic` | string | no |  | Topic. New meeting topic. |
| `start_time` | string | no |  | Start Time. New start date-time, for example 2026-11-01T15:00:00 (read in the meeting timezone) or 2026-11-01T15:00:00Z (UTC). |
| `duration` | number | no |  | Duration (minutes). New duration in minutes. |
| `timezone` | string | no |  | Timezone. IANA timezone, for example America/New_York. |
| `agenda` | string | no |  | Agenda. New agenda text. |
| `clear_agenda` | boolean | no | `false` | Clear Agenda. Turn on to remove the current agenda. Ignored when Agenda is filled in. |
| `password` | string | no |  | Passcode. New passcode: up to 10 characters, letters, numbers and @ - _ * only. |
| `auto_recording` | string | no |  | Auto Recording. One of `"local"`, `"cloud"`, `"none"`. |
| `audio` | string | no |  | Audio. One of `"both"`, `"telephony"`, `"voip"`, `"thirdParty"`. |
| `host_video` | boolean | no |  | Host Video. Start video when the host joins. |
| `participant_video` | boolean | no |  | Participant Video. Start video when participants join. |
| `join_before_host` | boolean | no |  | Join Before Host. Let participants join before the host. |
| `mute_upon_entry` | boolean | no |  | Mute Upon Entry. Mute participants when they join. |
| `waiting_room` | boolean | no |  | Waiting Room. Turn the waiting room on or off. |

Output fields:

- `success`: Success (boolean)
- `meeting_id`: Meeting ID
- `occurrence_id`: Occurrence ID
- `updated_fields`: Updated Fields

### `zoom_list_meetings`

**List Meetings.** Lists the connected user's meetings of one type (scheduled, live, upcoming or previous), one page at a time with a next_page_token. Use to find a meeting ID before getting, updating or deleting it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no | `"scheduled"` | Meeting Type. Which meetings to list. One of `"scheduled"`, `"live"`, `"upcoming"`, `"upcoming_meetings"`, `"previous_meetings"`. |
| `page_size` | number | no | `30` | Page Size. How many records to return in this page (1-300). Default 30. |
| `next_page_token` | string | no |  | Next Page Token. Leave empty for the first page. To get the next page, paste the Next Page Token from the previous run. |

Output fields:

- `meetings`: Meetings
- `meetings[].id`: Meeting ID (number)
- `meetings[].uuid`: Meeting UUID
- `meetings[].topic`: Topic
- `meetings[].type`: Type (number)
- `meetings[].start_time`: Start Time (datetime)
- `meetings[].duration`: Duration (minutes) (number)
- `meetings[].timezone`: Timezone
- `meetings[].agenda`: Agenda
- `meetings[].join_url`: Join URL (url)
- `meetings[].host_id`: Host ID
- `meetings[].created_at`: Created At (datetime)
- `next_page_token`: Next Page Token
- `has_more`: Has More Pages (boolean)
- `page_size`: Page Size (number)
- `total_records`: Total Records (all pages) (number)

### `zoom_delete_meeting`

**Delete Meeting.** Deletes a Zoom meeting, or one occurrence of a recurring meeting, and can email the host and registrants a cancellation. Use only when the user asks to cancel a meeting; this cannot be undone. Not idempotent: a repeat call fails with meeting not found, because Zoom cannot tell an already-deleted meeting from a wrong ID. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. The numeric Zoom meeting ID to delete, for example 85746065432. Find it with List Meetings. |
| `occurrence_id` | string | no |  | Occurrence ID. Only for recurring meetings: the occurrence ID of one specific occurrence. Leave empty to target the whole meeting. |
| `schedule_for_reminder` | boolean | no | `false` | Notify Host and Alternative Hosts. Email the host and alternative hosts that the meeting was cancelled. |
| `cancel_meeting_reminder` | boolean | no | `false` | Notify Registrants. Email registrants that the meeting was cancelled. |

Output fields:

- `success`: Success (boolean)
- `meeting_id`: Meeting ID
- `occurrence_id`: Occurrence ID

### `zoom_get_current_user`

**Get Current User.** Returns the profile of the Zoom user behind this connection (ID, email, name, plan type, timezone, personal meeting ID). Use to learn whose account the agent acts on, whether the plan is free or licensed, or the user's timezone before scheduling. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `display_name`: Display Name
- `type`: Plan Type (number)
- `timezone`: Timezone
- `pmi`: Personal Meeting ID (number)
- `personal_meeting_url`: Personal Meeting URL (url)
- `language`: Language
- `status`: Status
- `role_name`: Role
- `account_id`: Account ID
- `pic_url`: Picture (image)
- `user_created_at`: Created At (datetime)
- `last_login_time`: Last Login (datetime)

### `zoom_list_past_meeting_instances`

**List Past Meeting Instances.** Lists the ended instances (UUID and start time) of a Zoom meeting ID. Use to find when a meeting, or each occurrence of a recurring meeting, actually took place and get each instance UUID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_id` | string | yes |  | Meeting ID. The numeric Zoom meeting ID, for example 85746065432. |

Output fields:

- `meeting_id`: Meeting ID
- `meetings`: Instances
- `meetings[].uuid`: Instance UUID
- `meetings[].start_time`: Start Time (datetime)

### `zoom_list_recordings`

**List Cloud Recordings.** Lists the connected user's Zoom cloud recordings for meetings between two dates at most one month apart, one page at a time with a next_page_token. When passing next_page_token, also pass the from and to values returned with it. Use to find recordings of recent meetings; needs a paid plan with cloud recording. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From Date. Start date in YYYY-MM-DD format (UTC), for example 2026-10-01. |
| `to` | string | no |  | To Date. End date in YYYY-MM-DD format (UTC), at most one month after From Date. Defaults to today, or to one month after From Date if that is earlier. Required with Next Page Token: use the To value from the previous page so every page covers the same dates. |
| `page_size` | number | no | `30` | Page Size. How many records to return in this page (1-300). Default 30. |
| `next_page_token` | string | no |  | Next Page Token. Leave empty for the first page. To get the next page, paste the Next Page Token from the previous run. |

Output fields:

- `from`: From (date)
- `to`: To (date)
- `meetings`: Recorded Meetings
- `meetings[].id`: Meeting ID (number)
- `meetings[].uuid`: Meeting UUID
- `meetings[].topic`: Topic
- `meetings[].start_time`: Start Time (datetime)
- `meetings[].duration`: Duration (minutes) (number)
- `meetings[].timezone`: Timezone
- `meetings[].total_size`: Total Size (filesize)
- `meetings[].recording_count`: Recording Count (number)
- `meetings[].share_url`: Share URL (url)
- `meetings[].host_id`: Host ID
- `meetings[].recording_files`: Recording Files
- `meetings[].recording_files[].id`: File ID
- `meetings[].recording_files[].recording_type`: Recording Type
- `meetings[].recording_files[].file_type`: File Type
- `meetings[].recording_files[].file_extension`: File Extension
- `meetings[].recording_files[].file_size`: File Size (filesize)
- `meetings[].recording_files[].recording_start`: Recording Start (datetime)
- `meetings[].recording_files[].recording_end`: Recording End (datetime)
- `meetings[].recording_files[].play_url`: Play URL (url)
- `meetings[].recording_files[].download_url`: Download URL (url)
- `meetings[].recording_files[].status`: Status
- `next_page_token`: Next Page Token
- `has_more`: Has More Pages (boolean)
- `page_size`: Page Size (number)
- `total_records`: Total Records (all pages) (number)

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
