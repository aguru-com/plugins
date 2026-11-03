# Supadata

YouTube Transcripts

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-supadata'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE, DEVELOPER_TOOLS, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your free Supadata API Key, sign up at [Supadata](https://supadata.ai) and then copy the key available in the [dashboard](https://dash.supadata.ai).

## Actions

### `get_transcript`

**Get Transcript.** Retrieves the transcript text of a single YouTube video via the Supadata API, given the video URL. Use to read the spoken content of a video for summarization, search, or analysis; optionally request a preferred language and choose between one merged text block or timestamped chunks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | YouTube URL. The URL of a single YouTube video. |
| `lang` | string | no |  | Language Preference. Preferred language of the transcript. If not available, the first available language will be returned. |
| `text` | boolean | no | `true` | Merge Text. If true, the transcript will be merged into a single text instead of timestamped chunks. |

Output fields:

- `content`: Content
- `lang`: Language
- `availableLangs`: Available Languages

### `supadata_get_transcript`

**Get Transcript From URL.** Retrieves the transcript of a video from YouTube, TikTok, Instagram, X (Twitter), Facebook or a public file URL; falls back to AI generation when no native transcript exists. Large videos return a jobId instead of content: pass it to supadata_get_transcript_job. Works for any platform; the existing get_transcript is YouTube-only. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Video URL. URL of the video or media file. |
| `lang` | string | no |  | Language. Preferred transcript language (ISO 639-1 code), e.g. en. |
| `text` | boolean | no | `true` | Merge Text. If true, returns the transcript as one text block instead of timestamped chunks. |
| `chunkSize` | number | no |  | Chunk Size. Maximum characters per chunk when Merge Text is off. |
| `mode` | string | no |  | Mode. native uses existing transcripts only, generate forces AI transcription, auto tries native then AI. One of `"native"`, `"auto"`, `"generate"`. |

Output fields:

- `content`: Content
- `lang`: Language
- `availableLangs`: Available Languages

### `supadata_get_transcript_job`

**Get Transcript Job.** Reads the status of a transcript job started by supadata_get_transcript and returns the content once completed. Call once per check; it does not wait. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Job ID. The job id returned by supadata_get_transcript. |

Output fields:

- `status`: Status
- `content`: Content
- `lang`: Language
- `availableLangs`: Available Languages
- `error`: Error

### `supadata_get_media_metadata`

**Get Media Metadata.** Returns unified metadata (title, author, stats, media, tags) for a social media post or video from YouTube, TikTok, Instagram, X (Twitter) or Facebook given its URL. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Media URL. URL of the post or video. |

Output fields:

- `platform`: Platform
- `type`: Type
- `id`: ID
- `url`: URL (url)
- `title`: Title
- `description`: Description
- `author`: Author
- `author.displayName`: Display Name
- `stats`: Stats
- `stats.views`: Views (number)
- `stats.likes`: Likes (number)
- `stats.comments`: Comments (number)
- `stats.shares`: Shares (number)
- `media`: Media
- `media.type`: Type
- `media.duration`: Duration (number)
- `media.thumbnailUrl`: Thumbnail URL (image)
- `tags`: Tags
- `createdAt`: Created At (datetime)
- `additionalData`: Additional Data
- `additionalData.channelId`: Channel ID

### `supadata_get_youtube_video`

**Get YouTube Video.** Returns metadata of one YouTube video (title, description, duration, channel, view and like counts, transcript languages) by id or URL. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Video ID or URL. YouTube video id or URL. |

Output fields:

- `id`: ID
- `description`: Description
- `title`: Title
- `channel`: Channel
- `channel.id`: ID
- `channel.name`: Name
- `tags`: Tags
- `thumbnail`: Thumbnail (image)
- `uploadDate`: Upload Date (datetime)
- `viewCount`: View Count (number)
- `likeCount`: Like Count (number)
- `isLive`: Is Live (boolean)
- `duration`: Duration (number)
- `transcriptLanguages`: Transcript Languages

### `supadata_get_youtube_channel`

**Get YouTube Channel.** Returns metadata of a YouTube channel (name, handle, description, subscriber, video and view counts) by channel URL, handle or id. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Channel ID, Handle or URL. YouTube channel URL, handle (e.g. @name) or id. |

Output fields:

- `id`: ID
- `name`: Name
- `description`: Description
- `handle`: Handle
- `thumbnail`: Thumbnail (image)
- `banner`: Banner (url)
- `subscriberCount`: Subscriber Count (number)
- `videoCount`: Video Count (number)
- `viewCount`: View Count (number)

### `supadata_list_youtube_channel_videos`

**List YouTube Channel Videos.** Lists the ids of videos, shorts and live streams on a YouTube channel, optionally limited to one type. Returns ids only; pass them to supadata_get_youtube_video for details. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Channel ID, Handle or URL. YouTube channel URL, handle (e.g. @name) or id. |
| `limit` | number | no |  | Limit. Maximum number of ids to return. |
| `type` | string | no |  | Type. Which kind of videos to list. One of `"all"`, `"video"`, `"short"`, `"live"`. |

Output fields:

- `videoIds`: Video IDs
- `shortIds`: Short IDs
- `liveIds`: Live IDs

### `supadata_get_youtube_playlist`

**Get YouTube Playlist.** Returns metadata of a YouTube playlist (title, description, video count, view count, channel) by playlist URL or id. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Playlist ID or URL. YouTube playlist URL or id. |

Output fields:

- `id`: ID
- `title`: Title
- `description`: Description
- `videoCount`: Video Count (number)
- `viewCount`: View Count (number)
- `lastUpdated`: Last Updated (datetime)
- `channel`: Channel
- `channel.id`: ID
- `channel.name`: Name

### `supadata_list_youtube_playlist_videos`

**List YouTube Playlist Videos.** Lists the ids of the videos in a YouTube playlist. Returns ids only; pass them to supadata_get_youtube_video for details. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Playlist ID or URL. YouTube playlist URL or id. |
| `limit` | number | no |  | Limit. Maximum number of ids to return. |

Output fields:

- `videoIds`: Video IDs
- `shortIds`: Short IDs
- `liveIds`: Live IDs

### `supadata_search_youtube`

**Search YouTube.** Searches YouTube for videos, channels, playlists or movies with optional filters. Without Limit it returns one page plus a nextPageToken; pass that token back as Next Page Token to continue (other filters are then ignored). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search text. |
| `type` | string | no |  | Type. Filter by content type. One of `"all"`, `"video"`, `"channel"`, `"playlist"`, `"movie"`. |
| `uploadDate` | string | no |  | Upload Date. Filter by upload date (videos and movies only). One of `"all"`, `"hour"`, `"today"`, `"week"`, `"month"`, `"year"`. |
| `duration` | string | no |  | Duration. short is under 4 minutes, medium 4-20 minutes, long over 20 minutes (videos and movies only). One of `"all"`, `"short"`, `"medium"`, `"long"`. |
| `sortBy` | string | no |  | Sort By. Sort order of results. One of `"relevance"`, `"rating"`, `"date"`, `"views"`. |
| `features` | array | no |  | Features. Special features to filter by (videos and movies only). One of `"hd"`, `"subtitles"`, `"creative-commons"`, `"3d"`, `"live"`, `"4k"`, `"360"`, `"location"`, `"hdr"`, `"vr180"`. |
| `limit` | number | no |  | Limit. Maximum number of results; the API paginates automatically up to this many. |
| `nextPageToken` | string | no |  | Next Page Token. Token from a previous search to fetch the next page. |

Output fields:

- `query`: Query
- `results`: Results
- `results[].type`: Type
- `results[].id`: ID
- `results[].title`: Title
- `results[].description`: Description
- `results[].thumbnail`: Thumbnail (image)
- `results[].duration`: Duration (number)
- `results[].viewCount`: View Count (number)
- `results[].uploadDate`: Upload Date
- `results[].channel`: Channel
- `results[].channel.id`: ID
- `results[].channel.name`: Name
- `results[].channel.thumbnail`: Thumbnail (image)
- `totalResults`: Total Results (number)
- `nextPageToken`: Next Page Token

### `supadata_start_video_extraction`

**Start Video Extraction.** Starts an asynchronous AI job that analyses a video (YouTube, TikTok, Instagram, X, Facebook or a media file URL) and extracts data matching a prompt, a JSON Schema, or both. Provide at least one of Prompt or Schema. Returns a jobId: poll it with supadata_get_video_extraction_result. Not idempotent; uses credits. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Video URL. URL of the video or media file. |
| `prompt` | string | no |  | Prompt. Describes what to extract. |
| `schema` | JSON | no |  | Schema. JSON Schema describing the output format. |

Output fields:

- `jobId`: Job ID

### `supadata_get_video_extraction_result`

**Get Video Extraction Result.** Reads the status and extracted data of a job started by supadata_start_video_extraction. Call once per check; it does not wait. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Job ID. The job id returned by supadata_start_video_extraction. |

Output fields:

- `status`: Status
- `data`: Extracted Data (an object whose keys vary)

### `supadata_scrape_web_page`

**Scrape Web Page.** Fetches a web page and returns its content as Markdown with title, description and the links found on it. Use for reading one page; use supadata_start_web_crawl for a whole site. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. URL of the page to scrape. |
| `noLinks` | boolean | no |  | Exclude Links. If true, links are stripped from the Markdown. |
| `lang` | string | no |  | Language. Preferred page language (ISO 639-1 code). |

Output fields:

- `url`: URL (url)
- `content`: Content
- `name`: Name
- `description`: Description
- `ogUrl`: Open Graph URL
- `countCharacters`: Character Count (number)
- `urls`: URLs

### `supadata_map_website`

**Map Website.** Scans a whole website and returns the URLs found on it, useful for building a sitemap or choosing pages to scrape. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Website URL to map. |

Output fields:

- `urls`: URLs

### `supadata_get_account`

**Get Account.** Returns the organization id, plan and credit usage (used and maximum) of the connected Supadata account. Use to check remaining credits before starting batch, crawl or extraction jobs. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `organizationId`: Organization ID
- `plan`: Plan
- `maxCredits`: Max Credits (number)
- `usedCredits`: Used Credits (number)

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
