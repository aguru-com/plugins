# Fathom

Fathom is an AI meeting assistant that automatically records, transcribes, highlights, and generates AI summaries and action items from your meetings. Integrate with workflows to react to meeting events and retrieve meeting data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-fathom'
  version: '0.3.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Sign in with Fathom

> Connect your Fathom account using OAuth2. Under OAuth, List Meetings cannot embed summaries or transcripts; use Get Recording Summary and Get Recording Transcript instead.

### `SECRET_TEXT`: API Key

> To get your Fathom API key:
> 1. Sign in to Fathom and open **Settings**.
> 2. Go to **API Access**.
> 3. Click **Generate API Key**, give it a name and copy the key.
> 4. Paste it here.

## Actions

### `getRecordingSummary`

**Get Recording Summary.** Retrieves the AI summary (markdown) of one Fathom recording picked from a list of recent meetings, or asks Fathom to POST it to a destination URL instead. Agents should use Get Recording Summary (AI), which takes a recording ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recording_id` | string | yes |  | Meeting Recording. Select the meeting recording to get the summary for. A value the product loads from the provider, such as an id; write the value itself. |
| `destination_url` | string | no |  | Destination URL. Optional: URL where Fathom will POST the summary. Leave empty to get data directly in response. |

Output fields:

- `summary`: Summary
- `summary.templateName`: Template
- `summary.markdownFormatted`: Summary (Markdown)
- `destinationUrl`: Destination URL (url)

### `getRecordingTranscript`

**Get Recording Transcript.** Retrieves the speaker-attributed transcript of one Fathom recording picked from a list of recent meetings, or asks Fathom to POST it to a destination URL instead. Agents should use Get Recording Transcript (AI), which takes a recording ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recording_id` | string | yes |  | Meeting Recording. Select the meeting recording to get the transcript for. A value the product loads from the provider, such as an id; write the value itself. |
| `destination_url` | string | no |  | Destination URL. Optional: URL where Fathom will POST the transcript. Leave empty to get data directly in response. |

Output fields:

- `transcript`: Transcript
- `transcript[].speaker`: Speaker
- `transcript[].speaker.displayName`: Name
- `transcript[].speaker.matchedCalendarInviteeEmail`: Matched Invitee Email (email)
- `transcript[].text`: Text
- `transcript[].timestamp`: Timestamp (HH:MM:SS)
- `destinationUrl`: Destination URL (url)

### `listMeetings`

**List Meetings.** Lists Fathom meetings with filters (invitee domains, internal/external, recorder, team, created window) and optional embedded transcript, summary, action items and CRM matches, following pages to the end unless a page limit is set. Agents should prefer List Meetings (AI), which returns one page at a time. Transcript and summary flags need an API-key connection. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `calendar_invitees` | array | no |  | Calendar Invitees. Email addresses of calendar invitees to filter by. Fathom no longer documents this filter and may ignore it; prefer Calendar Invitees Domains or Recorded By. |
| `calendar_invitees_domains` | array | no |  | Calendar Invitees Domains. Domains of the companies to filter by (e.g., acme.com) |
| `calendar_invitees_domains_type` | string | no | `"all"` | Calendar Invitees Domains Type. Filter by whether calendar invitee list includes external email domains. One of `"all"`, `"only_internal"`, `"one_or_more_external"`. |
| `recorded_by` | array | no |  | Recorded By. Email addresses of users who recorded meetings. |
| `teams` | array | no |  | Teams. Team names to filter by (e.g., Sales, Engineering) |
| `created_after` | string | no |  | Created After. Filter to meetings created after this timestamp (e.g., 2025-01-01T00:00:00Z) |
| `created_before` | string | no |  | Created Before. Filter to meetings created before this timestamp (e.g., 2025-01-01T00:00:00Z) |
| `include_transcript` | boolean | no | `false` | Include Transcript. Include the transcript for each meeting. API key connections only; with OAuth use Get Recording Transcript. |
| `include_summary` | boolean | no | `false` | Include Summary. Include the summary for each meeting. API key connections only; with OAuth use Get Recording Summary. |
| `include_action_items` | boolean | no | `false` | Include Action Items. Include the action items for each meeting. |
| `include_crm_matches` | boolean | no | `false` | Include CRM Matches. Include CRM matches for each meeting. |
| `cursor` | string | no |  | Cursor. Cursor for pagination (from previous response) |
| `max_pages` | number | no |  | Max Pages. Stop after this many pages of meetings. Leave empty to fetch every page (each page holds about 10 meetings). |

Output fields:

- `[].result`: Page
- `[].result.items`: Meetings
- `[].result.items[].recordingId`: Recording ID (number)
- `[].result.items[].title`: Title
- `[].result.items[].meetingTitle`: Calendar Event Title
- `[].result.items[].url`: Fathom URL (url)
- `[].result.items[].shareUrl`: Share URL (url)
- `[].result.items[].createdAt`: Created At (datetime)
- `[].result.items[].scheduledStartTime`: Scheduled Start (datetime)
- `[].result.items[].scheduledEndTime`: Scheduled End (datetime)
- `[].result.items[].recordingStartTime`: Recording Start (datetime)
- `[].result.items[].recordingEndTime`: Recording End (datetime)
- `[].result.items[].calendarInviteesDomainsType`: Invitee Domains Type
- `[].result.items[].transcriptLanguage`: Transcript Language
- `[].result.items[].recordedBy`: Recorded By
- `[].result.items[].recordedBy.name`: Name
- `[].result.items[].recordedBy.email`: Email (email)
- `[].result.items[].recordedBy.emailDomain`: Email Domain
- `[].result.items[].recordedBy.team`: Team
- `[].result.items[].calendarInvitees`: Calendar Invitees
- `[].result.items[].calendarInvitees[].name`: Name
- `[].result.items[].calendarInvitees[].email`: Email (email)
- `[].result.items[].calendarInvitees[].emailDomain`: Email Domain
- `[].result.items[].calendarInvitees[].isExternal`: External (boolean)
- `[].result.items[].calendarInvitees[].matchedSpeakerDisplayName`: Matched Speaker
- `[].result.items[].defaultSummary`: Summary
- `[].result.items[].defaultSummary.templateName`: Template
- `[].result.items[].defaultSummary.markdownFormatted`: Summary (Markdown)
- `[].result.items[].actionItems`: Action Items
- `[].result.items[].actionItems[].description`: Description
- `[].result.items[].actionItems[].completed`: Completed (boolean)
- `[].result.items[].actionItems[].userGenerated`: Added by a User (boolean)
- `[].result.items[].actionItems[].recordingTimestamp`: Recording Timestamp
- `[].result.items[].actionItems[].recordingPlaybackUrl`: Playback URL (url)
- `[].result.items[].actionItems[].assignee`: Assignee
- `[].result.items[].actionItems[].assignee.name`: Name
- `[].result.items[].actionItems[].assignee.email`: Email (email)
- `[].result.items[].actionItems[].assignee.team`: Team
- `[].result.items[].transcript`: Transcript
- `[].result.items[].transcript[].speaker`: Speaker
- `[].result.items[].transcript[].speaker.displayName`: Name
- `[].result.items[].transcript[].speaker.matchedCalendarInviteeEmail`: Matched Invitee Email (email)
- `[].result.items[].transcript[].text`: Text
- `[].result.items[].transcript[].timestamp`: Timestamp (HH:MM:SS)
- `[].result.items[].crmMatches`: CRM Matches
- `[].result.items[].crmMatches.contacts`: Contacts
- `[].result.items[].crmMatches.contacts[].name`: Name
- `[].result.items[].crmMatches.contacts[].email`: Email (email)
- `[].result.items[].crmMatches.contacts[].recordUrl`: Record URL (url)
- `[].result.items[].crmMatches.companies`: Companies
- `[].result.items[].crmMatches.companies[].name`: Name
- `[].result.items[].crmMatches.companies[].recordUrl`: Record URL (url)
- `[].result.items[].crmMatches.deals`: Deals
- `[].result.items[].crmMatches.deals[].name`: Name
- `[].result.items[].crmMatches.deals[].amount`: Amount (number)
- `[].result.items[].crmMatches.deals[].recordUrl`: Record URL (url)
- `[].result.items[].crmMatches.error`: CRM Error
- `[].result.nextCursor`: Next Cursor
- `[].result.limit`: Page Size (number)

### `findTeam`

**Find Team.** Lists the teams in the connected Fathom account, one page per call; pass the returned cursor to get the next page. Use to get exact team names for the team filters of List Meetings or List Team Members. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cursor` | string | no |  | Cursor. Cursor for pagination (from previous response) |

Output fields:

- `result`: Result
- `result.items`: Teams
- `result.items[].name`: Name
- `result.items[].createdAt`: Created At (datetime)
- `result.nextCursor`: Next Cursor
- `result.limit`: Page Size (number)

### `findTeamMember`

**Find Team Member.** Lists members (name, email, join date) of the Fathom account, optionally only those of one team given by exact team name, one page per call with a cursor. Use Find Team Member by Email for a single-person lookup. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | no |  | Team. Team name to filter by. |
| `cursor` | string | no |  | Cursor. Cursor for pagination (from previous response) |

Output fields:

- `result`: Result
- `result.items`: Members
- `result.items[].name`: Name
- `result.items[].email`: Email (email)
- `result.items[].createdAt`: Joined At (datetime)
- `result.nextCursor`: Next Cursor
- `result.limit`: Page Size (number)

### `find_team_member_by_email`

**Find Team Member by Email.** Looks up one Fathom team member by exact email (case-insensitive), optionally within a team, and returns their name, email and join date, or found=false. Use to check whether someone is on the Fathom account before filtering meetings by recorder. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address of the member, e.g. jane@acme.com. |
| `team` | string | no |  | Team. Optional exact team name to search within. |

Output fields:

- `found`: Found (boolean)
- `member`: Member
- `member.name`: Name
- `member.email`: Email (email)
- `member.created_at`: Joined At (datetime)

### `list_meeting_types`

**List Meeting Types.** Lists the meeting types defined in the Fathom org (name, active/inactive, created date), optionally only active or only inactive ones. Use to get the exact name for the meeting_type filter of List Meetings; an unknown name there returns nothing. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no | `"all"` | Status. Active types can be assigned to new meetings; inactive ones only appear on older meetings. One of `"all"`, `"active"`, `"inactive"`. |

Output fields:

- `items`: Meeting Types
- `items[].name`: Name
- `items[].status`: Status
- `items[].created_at`: Created At (datetime)
- `count`: Count (number)

### `list_users`

**List Users and Permissions.** Lists users of the Fathom account with status and their settings and view permissions, one page per call with a cursor, optionally filtered by team, status or admin level. Requires the connected user to be an account admin (403 otherwise); the invited status cannot be combined with an admin level filter. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team` | string | no |  | Team. Exact team name to filter by (see Find Team). |
| `status` | string | no |  | Status. One of `"active"`, `"deactivated"`, `"invited"`. |
| `settings_access` | string | no |  | Admin Level. Filter by settings access. Not available together with Status = Invited. One of `"none"`, `"team_admin"`, `"account_admin"`. |
| `cursor` | string | no |  | Cursor. next_cursor from the previous call. |

Output fields:

- `items`: Users
- `items[].name`: Name
- `items[].email`: Email (email)
- `items[].status`: Status
- `items[].created_at`: Created At (datetime)
- `items[].permissions`: Permissions
- `items[].permissions.settings_access`: Settings Access
- `items[].permissions.settings_access.level`: Level
- `items[].permissions.settings_access.teams`: Teams
- `items[].permissions.view_access`: View Access
- `items[].permissions.view_access.level`: Level
- `items[].permissions.view_access.teams`: Teams
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)

### `request_recording_download`

**Request Recording Download.** Starts generating a downloadable video or audio file for one Fathom recording and returns a download_id with status; audio-only recordings may complete immediately with the file URL. Then call Get Recording Download until status is completed; URLs expire after about 24 hours. Fails with 403 for limited-access shares and 422 when there is no media. Not idempotent: each call creates a new download job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recording_id` | string | yes |  | Recording ID. The numeric recording_id from New Recording or List Meetings. |

Output fields:

- `download_id`: Download ID
- `recording_id`: Recording ID (number)
- `status`: Status
- `video`: Video File
- `video.url`: File URL (url)
- `video.content_type`: Content Type
- `video.file_size_bytes`: File Size (filesize)
- `video.expires_at`: Expires At (datetime)
- `audio`: Audio File
- `audio.url`: File URL (url)
- `audio.content_type`: Content Type
- `audio.file_size_bytes`: File Size (filesize)
- `audio.expires_at`: Expires At (datetime)
- `failure_reason`: Failure Reason

### `get_recording_download`

**Get Recording Download.** Gets the status of a Fathom recording download (processing, completed, failed, expired) and, once completed, the signed file URL, content type, size and expiry. Only works for downloads created by this same connection. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recording_id` | string | yes |  | Recording ID. The numeric recording_id the download was requested for. |
| `download_id` | string | yes |  | Download ID. The download_id returned by Request Recording Download. |

Output fields:

- `download_id`: Download ID
- `recording_id`: Recording ID (number)
- `status`: Status
- `video`: Video File
- `video.url`: File URL (url)
- `video.content_type`: Content Type
- `video.file_size_bytes`: File Size (filesize)
- `video.expires_at`: Expires At (datetime)
- `audio`: Audio File
- `audio.url`: File URL (url)
- `audio.content_type`: Content Type
- `audio.file_size_bytes`: File Size (filesize)
- `audio.expires_at`: Expires At (datetime)
- `failure_reason`: Failure Reason

### `fathom_list_meetings`

**List Meetings (AI).** Returns one page of Fathom meetings, newest first, with recording IDs, links, invitees and recorder, optionally filtered by date window, recorder email, team, company domain, internal/external or meeting type, and optionally embedding action items, highlights, CRM matches, summary or transcript. Use it to find a recording ID before getting its summary or transcript; pass next_cursor to continue. Summary and transcript flags work only on API-key connections (use the Get Recording actions under OAuth). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `created_after` | ISO date-time string | no |  | Created After. Only meetings created after this ISO 8601 date-time. |
| `created_before` | ISO date-time string | no |  | Created Before. Only meetings created before this ISO 8601 date-time. |
| `recorded_by` | array | no |  | Recorded By. Emails of the Fathom users who recorded the meetings. |
| `teams` | array | no |  | Teams. Exact team names (see Find Team). |
| `calendar_invitees_domains` | array | no |  | Company Domains. Company domains of the invitees, exact match (e.g. acme.com). |
| `calendar_invitees_domains_type` | string | no |  | Internal or External. Only internal meetings, or only meetings with at least one external invitee. One of `"all"`, `"only_internal"`, `"one_or_more_external"`. |
| `meeting_type` | string | no |  | Meeting Type. Exact meeting type name from List Meeting Types. An unknown name returns no meetings. |
| `include_action_items` | boolean | no | `false` | Include Action Items. |
| `include_highlights` | boolean | no | `false` | Include Highlights. |
| `include_crm_matches` | boolean | no | `false` | Include CRM Matches. |
| `include_summary` | boolean | no | `false` | Include Summary. API key connections only. |
| `include_transcript` | boolean | no | `false` | Include Transcript. API key connections only. |
| `cursor` | string | no |  | Cursor. next_cursor from the previous call. |

Output fields:

- `items`: Meetings
- `items[].recording_id`: Recording ID (number)
- `items[].title`: Title
- `items[].meeting_title`: Calendar Event Title
- `items[].meeting_type`: Meeting Type
- `items[].url`: Fathom URL (url)
- `items[].share_url`: Share URL (url)
- `items[].meeting_url`: Meeting Link (url)
- `items[].created_at`: Created At (datetime)
- `items[].scheduled_start_time`: Scheduled Start (datetime)
- `items[].scheduled_end_time`: Scheduled End (datetime)
- `items[].recording_start_time`: Recording Start (datetime)
- `items[].recording_end_time`: Recording End (datetime)
- `items[].calendar_invitees_domains_type`: Invitee Domains Type
- `items[].shared_with`: Shared With
- `items[].transcript_language`: Transcript Language
- `items[].recorded_by`: Recorded By
- `items[].recorded_by.name`: Name
- `items[].recorded_by.email`: Email (email)
- `items[].recorded_by.email_domain`: Email Domain
- `items[].recorded_by.team`: Team
- `items[].calendar_invitees`: Calendar Invitees
- `items[].calendar_invitees[].name`: Name
- `items[].calendar_invitees[].email`: Email (email)
- `items[].calendar_invitees[].email_domain`: Email Domain
- `items[].calendar_invitees[].is_external`: External (boolean)
- `items[].calendar_invitees[].matched_speaker_display_name`: Matched Speaker
- `items[].default_summary`: Summary
- `items[].default_summary.template_name`: Template
- `items[].default_summary.markdown_formatted`: Summary (Markdown)
- `items[].action_items`: Action Items
- `items[].action_items[].description`: Description
- `items[].action_items[].completed`: Completed (boolean)
- `items[].action_items[].user_generated`: Added by a User (boolean)
- `items[].action_items[].recording_timestamp`: Recording Timestamp
- `items[].action_items[].recording_playback_url`: Playback URL (url)
- `items[].action_items[].assignee`: Assignee
- `items[].action_items[].assignee.name`: Name
- `items[].action_items[].assignee.email`: Email (email)
- `items[].action_items[].assignee.team`: Team
- `items[].highlights`: Highlights
- `items[].highlights[].type`: Type
- `items[].highlights[].summary`: Summary
- `items[].highlights[].text`: Text
- `items[].highlights[].start_time`: Start (seconds) (number)
- `items[].highlights[].end_time`: End (seconds) (number)
- `items[].transcript`: Transcript
- `items[].transcript[].speaker`: Speaker
- `items[].transcript[].speaker.display_name`: Name
- `items[].transcript[].speaker.matched_calendar_invitee_email`: Matched Invitee Email (email)
- `items[].transcript[].text`: Text
- `items[].transcript[].timestamp`: Timestamp (HH:MM:SS)
- `items[].crm_matches`: CRM Matches
- `items[].crm_matches.contacts`: Contacts
- `items[].crm_matches.contacts[].name`: Name
- `items[].crm_matches.contacts[].email`: Email (email)
- `items[].crm_matches.contacts[].record_url`: Record URL (url)
- `items[].crm_matches.companies`: Companies
- `items[].crm_matches.companies[].name`: Name
- `items[].crm_matches.companies[].record_url`: Record URL (url)
- `items[].crm_matches.deals`: Deals
- `items[].crm_matches.deals[].name`: Name
- `items[].crm_matches.deals[].amount`: Amount (number)
- `items[].crm_matches.deals[].record_url`: Record URL (url)
- `items[].crm_matches.error`: CRM Error
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)

### `fathom_get_recording_summary`

**Get Recording Summary (AI).** Gets the Fathom AI summary of one recording as markdown, with the template name. Use after a trigger or List Meetings gives you a recording_id, when a recap is enough; use Get Recording Transcript for verbatim text. Counts against Fathom's heavy-request limit (30/min, sometimes 5/min). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recording_id` | string | yes |  | Recording ID. The numeric recording_id from New Recording or List Meetings. |

Output fields:

- `recording_id`: Recording ID (number)
- `summary`: Summary
- `summary.template_name`: Template
- `summary.markdown_formatted`: Summary (Markdown)

### `fathom_get_recording_transcript`

**Get Recording Transcript (AI).** Gets the full speaker-attributed transcript of one Fathom recording, each line with speaker name, matched invitee email and HH:MM:SS timestamp. Use when exact wording or who-said-what matters; prefer Get Recording Summary for a recap. Heavy-request limit applies. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recording_id` | string | yes |  | Recording ID. The numeric recording_id from New Recording or List Meetings. |

Output fields:

- `recording_id`: Recording ID (number)
- `transcript`: Transcript
- `transcript[].speaker`: Speaker
- `transcript[].speaker.display_name`: Name
- `transcript[].speaker.matched_calendar_invitee_email`: Matched Invitee Email (email)
- `transcript[].text`: Text
- `transcript[].timestamp`: Timestamp (HH:MM:SS)

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
