# tl;dv

Record meetings, get transcripts, and access meeting notes automatically.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tl-dv'
  version: '0.1.7'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your tl;dv API key. You can find this at https://tldv.io/app/settings/personal-settings/api-keys

## Actions

### `upload_recording`

**Upload Recording.** Imports an external recording into tl;dv by ingesting it from a publicly accessible media URL (.mp3/.mp4/.wav/.m4a/.mkv/.mov/.avi/.wma/.flac), queuing it for transcription and processing. Use to bring a recording hosted elsewhere into tl;dv. Each call creates a new import job (not idempotent); set dryRun to validate the import without persisting it. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Meeting Name. The name of the meeting or recording. |
| `url` | string | yes |  | Recording URL. Publicly accessible URL of the recording. Supported formats: .mp3, .mp4, .wav, .m4a, .mkv, .mov, .avi, .wma, .flac. |
| `happenedAt` | ISO date-time string | no |  | Meeting Date. The date and time when the meeting occurred. If not provided, the current date will be used. |
| `dryRun` | boolean | no | `false` | Dry Run. Test the import without persisting to the database. |
| `participants` | array | no |  | Participants. Email addresses of meeting participants. Each item: { `email` }. |

### `list_meetings`

**List Meetings.** Lists meetings from the tl;dv account, paginated. With an empty search query it returns all meetings; supplying a query filters to matches by name or content, and optional date range, participation, and internal/external type filters further narrow results. Use to discover meetings or find a meeting id to feed into other actions. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Search for meetings by name or content. |
| `page` | number | no | `1` | Page. Page number to return (default: 1) |
| `limit` | number | no | `50` | Results Per Page. Number of results per page (default: 50) |
| `from` | ISO date-time string | no |  | From Date. Search meetings from this date. |
| `to` | ISO date-time string | no |  | To Date. Search meetings up to this date. |
| `onlyParticipated` | boolean | no | `false` | Only Participated. Only return meetings you participated in. |
| `meetingType` | string | no |  | Meeting Type. Filter by meeting type. One of `""`, `"internal"`, `"external"`. |

### `get_meeting`

**Get Meeting.** Retrieves the metadata for a single tl;dv meeting by its id, including name, date, duration, organizer, invitees, and the meeting URL. Use when you already have a meeting id and need its details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingId` | string | yes |  | Meeting. Select a meeting. A value the product loads from the provider, such as an id; write the value itself. |

### `get_transcript`

**Get Transcript.** Retrieves the full speaker-attributed, time-stamped transcript for a tl;dv meeting identified by its meeting id. Use when you need the spoken content of a meeting (the transcript must already be generated). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingId` | string | yes |  | Meeting. Select a meeting. A value the product loads from the provider, such as an id; write the value itself. |

### `get_highlights`

**Get Highlights.** Retrieves the highlights and notes captured for a tl;dv meeting identified by its meeting id. Use to pull the key moments or noted points from a meeting rather than the full transcript. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingId` | string | yes |  | Meeting. Select a meeting. A value the product loads from the provider, such as an id; write the value itself. |
