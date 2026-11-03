# Meetgeek

AI-powered meeting assistant that automates note-taking, summarization, and insights generation for your meetings.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-meetgeek-ai'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your MeetGeek API key to authenticate.
>
> ## Acquiring a Token
>
> For service accounts and enterprise company-wide integrations, please use [this form](https://meetgeek.ai/contact) to talk to our team and request a custom quote.
>
> To access the public API, you will need an API key. Follow these steps to obtain your key:
>
> 1. Sign up for an account at [app.meetgeek.ai](https://app.meetgeek.ai)
> 2. Generate your API key by going to **Integrations → Public API Card**
> 3. Copy and paste the API key into the field below.

## Actions

### `getHighlights`

**Get Highlights.** Fetch the AI-generated highlights for a single MeetGeek meeting, identified by its meeting ID. Use to pull key moments after a meeting has been analyzed. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingId` | string | yes |  | Meeting. Select the meeting. A value the product loads from the provider, such as an id; write the value itself. |

### `getMeetingDetails`

**Get Meeting Details.** Look up the metadata for one MeetGeek meeting by its meeting ID (host, participants, timestamps, source). Use when an agent needs a meeting's context rather than its content. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingId` | string | yes |  | Meeting. Select the meeting. A value the product loads from the provider, such as an id; write the value itself. |

### `getMeetingsSummaryInsights`

**Get Meeting Summary & AI Insights.** Fetch the AI-generated summary and insights for a single MeetGeek meeting by its meeting ID. Use to get a condensed overview rather than the full transcript. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingId` | string | yes |  | Meeting. Select the meeting. A value the product loads from the provider, such as an id; write the value itself. |

### `getTeamMeetings`

**Get Team Meetings.** List the past meetings belonging to a given MeetGeek team, identified by team ID. Use to discover meeting IDs to feed into the per-meeting lookup actions. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. Select the team. A value the product loads from the provider, such as an id; write the value itself. |

### `getTranscript`

**Get Transcript.** Fetch the full transcript (all sentences) for a single MeetGeek meeting by its meeting ID. Use when an agent needs the verbatim spoken content rather than a summary or highlights. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingId` | string | yes |  | Meeting. Select the meeting. A value the product loads from the provider, such as an id; write the value itself. |

### `uploadRecording`

**Upload Recording.** Submit a video or audio recording to MeetGeek for transcription and AI analysis by passing a publicly accessible download URL (e.g. an S3 signed URL); analysis runs asynchronously and completion is signaled via the New Meeting webhook. Use to ingest an external recording into MeetGeek. Not idempotent: each call queues a new analysis job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `download_url` | string | yes |  | Download URL. A publicly accessible URL that initiates a direct download when accessed (e.g., S3 signed URL) |
| `language_code` | string | no | `"en-US"` | Language Code. Language code for the recording (e.g., en-US, es-ES, fr-FR). See MeetGeek documentation for all available options. |
| `template_name` | string | no | `"General meeting"` | Template Name. Meeting template to use for analysis (e.g., "General meeting", "Sales call", "Interview"). See MeetGeek documentation for all available templates. |
