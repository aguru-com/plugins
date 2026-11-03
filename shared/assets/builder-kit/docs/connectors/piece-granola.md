# Granola

AI-powered meeting notes — automatically captures and summarizes your meetings.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-granola'
  version: '0.1.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Open the **Granola desktop app**.
> 2. Go to **Settings > API**.
> 3. Click **Create API Key**.
> 4. Copy the key and paste it here.
>
> **Note:** You need a Business or Enterprise plan to use API keys.

## Actions

### `list_notes`

**List Notes.** Lists the authenticated user's Granola meeting notes, returning a page of note summaries. With no date filters it returns the most recent notes; supply created-after/created-before/updated-after bounds to narrow to a time window (e.g. notes modified since a given time). Use it to discover notes and their IDs before fetching details with Get Note. Page size is capped at 30. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `created_after` | ISO date-time string | no |  | Created After. Only return notes created after this date. Leave empty to return all notes. |
| `created_before` | ISO date-time string | no |  | Created Before. Only return notes created before this date. Leave empty for no upper limit. |
| `updated_after` | ISO date-time string | no |  | Updated After. Only return notes updated after this date. Useful to find recently modified notes. |
| `page_size` | number | no | `10` | Page Size. Number of notes to return per page (1–30). |

### `get_note`

**Get Note.** Fetches one Granola meeting note by its note ID, including title, owner, calendar/attendee details, and AI summary. Enable the include-transcript option to also return the full speaker-by-speaker meeting transcript. Use it after List Notes (or a note trigger) to read a specific note in depth. Requires a valid note ID (format `not_` followed by 14 characters). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Note ID. The ID of the note to retrieve. Starts with `not_` followed by 14 characters (e.g. `not_1d3tmYTlCICgjy`). You can get this from the **List Notes** action. |
| `include_transcript` | boolean | no | `false` | Include Transcript. Include the full meeting transcript in the response. The transcript shows who said what and when. |

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
