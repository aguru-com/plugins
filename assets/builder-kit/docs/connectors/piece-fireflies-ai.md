# Fireflies.ai

Meeting assistant that automatically records, transcribes, and analyzes conversations

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-fireflies-ai'
  version: '0.1.7'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To use Fireflies.ai, you need to get an API key:
> 1. Login to your account at https://fireflies.ai.
> 2. Navigate to Settings > Developer Settings in the left sidebar.
> 3. Copy the API key from the API Key section.

## Actions

### `find-meeting-by-id`

**Find Meeting by ID.** Fetches a single Fireflies meeting transcript (with summary, speakers, attendees, and media URLs) by its exact transcript/meeting ID. Use when you already have a known meeting ID and want its full details; if you only have search criteria like title or date, use the search action instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingId` | string | yes |  | Meeting ID. The ID of the meeting to retrieve. |

### `find_recent_meeting`

**Find Recent Meeting.** Returns the most recently transcribed Fireflies meeting for the authenticated account, including its full transcript and summary. Use when the agent wants the latest meeting without knowing its ID; takes no inputs. Returns a found:false result when the account has no recent meeting. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `find_meeting_by_query`

**Find Meeting by Call Deatils.** Searches Fireflies meeting transcripts, optionally filtered by title, host email, participant email, and/or date, paging through all matches. Use when locating meetings by attributes rather than a known ID; leaving all filters empty returns the full meeting history. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Meeting Title. |
| `hostEmail` | string | no |  | Host Email. Filter meetings by host email. |
| `participantEmail` | string | no |  | Participant Email. Filter meetings by participant email. |
| `date` | ISO date-time string | no |  | Date. Filter meetings on this date (YYYY-MM-DD). |

### `upload_audio`

**Upload Audio.** Submits a publicly accessible audio/video URL (mp3, mp4, wav, m4a, ogg) to Fireflies to create a new meeting and transcribe it. Use when the agent has a recording it wants transcribed and analyzed. The API accepts only URLs, not direct file uploads. Not idempotent: each call queues a new transcription job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audioUrl` | string | yes |  | Audio URL. The publicly accessible URL to your audio file (mp3, mp4, wav, m4a, ogg). Fireflies API only accepts URLs, not direct file uploads. For private files, consider using signed URLs with short expiry times. |
| `title` | string | yes |  | Title. |

### `get-user-details`

**Get User Details.** Fetches a Fireflies user profile (name, email, admin status, transcript counts, integrations) by user ID. Use when the agent needs account details for a specific user; requires the exact user ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. |
