# Avoma

Avoma is an AI Meeting Assistant that automatically records, transcribes, and summarizes your meetings.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-avoma'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Avoma API Key (Bearer token). Generate it from your Avoma API Integration settings: https://help.avoma.com/api-integration-for-avoma

## Actions

### `create_call`

**Create Call.** Imports an external dialer call (Zoom, Twilio, Aircall, HubSpot, etc.) into Avoma for AI recording, transcription, and analysis. Use when ingesting call data captured outside Avoma; requires a publicly accessible recording URL, an Avoma user email, and a unique external_id. Not idempotent — each call creates a new record, and reposting the same external_id and source will fail as a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | External ID. Unique id of the call from the dialer system like hubspot, twilio, zoom, etc. |
| `user_email` | string | yes |  | User Email. Email of the user who made or received the call. This should be an Avoma user's email. |
| `source` | string | yes |  | Source. Source of the call. One of `"zoom"`, `"zoomphone"`, `"twilio"`, `"phoneburner"`, `"ringcentral"`, `"aircall"`, `"hubspot"`, `"other"`. |
| `direction` | string | yes |  | Direction. Direction of the call. One of `"Inbound"`, `"Outbound"`. |
| `start_at` | ISO date-time string | yes |  | Start Time. Start time of the call. |
| `frm` | string | yes |  | From Phone Number. Phone number from which call was made (e.g., +11234567890) |
| `to` | string | yes |  | To Phone Number. Phone number to which call was made (e.g., +12234567890) |
| `recording_url` | string | yes |  | Recording URL. URL of the recording of the call. This should be a public URL that Avoma can access. |
| `participants` | array | yes |  | Participants. List of participants in the call. First entry should be the prospect/lead. Each item: { `name`, `email`, `crm_id`?, `crm_type`?, `crm_system`? }. |
| `end_at` | ISO date-time string | no |  | End Time. End time of the call. |
| `frm_name` | string | no |  | From Name. Name of the caller who made the call. |
| `to_name` | string | no |  | To Name. Name of the person to whom call was made. |
| `answered` | boolean | no |  | Answered. Whether the call was answered. |
| `is_voicemail` | boolean | no | `false` | Is Voicemail. Indicates if the call is a voicemail. |
| `additional_details` | string | no |  | Additional Details. Additional details of the call (JSON object as string) |

### `get_meeting_recording`

**Get Meeting Recording.** Fetches the audio and video recording URLs for a single Avoma meeting by its meeting UUID. Use to obtain downloadable media links for a recorded meeting; the returned URLs are time-limited (expire in ~5 days) and the recording may still be processing (not yet available). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meeting_uuid` | string | yes |  | Meeting. Select a meeting from your Avoma account. A value the product loads from the provider, such as an id; write the value itself. |

### `get_meeting_transcription`

**Get Meeting Transcription.** Fetches the transcription for a single Avoma meeting by its transcription UUID, including speaker-labeled segments and a downloadable VTT subtitle URL. Use to retrieve the text of a recorded meeting or call. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transcription_uuid` | string | yes |  | Transcription. Select a transcription from your Avoma meetings. A value the product loads from the provider, such as an id; write the value itself. |
