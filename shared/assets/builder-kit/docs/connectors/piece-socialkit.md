# Socialkit

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-socialkit'
  version: '0.2.0'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Access Key

> To get your Access Key:
> 1. Sign up at SocialKit Dashboard
> 2. Copy your Access Key from the project Access Keys tab.
> **Important:** Keep your Access Key confidential.

## Actions

### `get_youtube_details`

**Get YouTube Details.** Looks up metadata and statistics for a single YouTube video (title, description, view/like/dislike counts, duration, channel info) given its watch URL. Use to enrich or inspect a known video. Read-only and idempotent; requires a valid YouTube video URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | YouTube Video URL. The URL of the YouTube video you want to get details from. (e.g., https://www.youtube.com/watch?v=VIDEO_ID) |

### `get_youtube_transcript`

**Get YouTube Transcript.** Retrieves the full timestamped transcript of a YouTube video from its watch URL. Use when you need the spoken text/captions for downstream summarization, search, or analysis. Read-only and idempotent; only works for videos that have captions or subtitles available. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | YouTube Video URL. The URL of the YouTube video to get the transcript from. (e.g., https://www.youtube.com/watch?v=VIDEO_ID) |

### `get_youtube_summary`

**Get YouTube Summary.** Returns an AI-generated summary of a YouTube video given its watch URL. Use when you want the gist of a video without processing the raw transcript yourself. The summary is derived server-side from the video; the call is read-only and idempotent for a given URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | YouTube Video URL. The URL of the YouTube video to summarize. (e.g., https://www.youtube.com/watch?v=VIDEO_ID) |

### `get_youtube_comments`

**Get YouTube Comments.** Fetches comments for a YouTube video given its watch URL, optionally capped by a limit (default 10, max 100) and ordered newest-first or by top engagement. Use to read audience reactions or feed comment text into analysis. Read-only and idempotent, though results may shift as new comments are posted. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | YouTube Video URL. The URL of the YouTube video to fetch comments from. (e.g., https://www.youtube.com/watch?v=VIDEO_ID) |
| `limit` | number | no | `10` | Limit. The number of comments to retrieve (default is 10, maximum is 100). |
| `sortBy` | string | no | `"new"` | Sort By. The sorting order for the comments. One of `"new"`, `"top"`. |

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
