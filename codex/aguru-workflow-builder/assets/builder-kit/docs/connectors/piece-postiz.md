# Postiz

Open-source social media scheduling tool supporting 30+ platforms

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-postiz'
  version: '0.1.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Postiz Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes | `"https://api.postiz.com/public/v1"` | Base URL. The API base URL. Use `https://api.postiz.com/public/v1` for Postiz Cloud, or `https://your-domain.com/api/public/v1` for self-hosted instances. |
| `api_key` | string | yes |  | API Key. To get your API key: 1. Log in to your Postiz dashboard 2. Go to **Settings > Developers > Public API** 3. Generate a new API key and copy it. |

## Actions

### `create_post`

**Create Post.** Publishes content to a connected social channel in one of three modes selectable via the post type: publish immediately, schedule for a future date, or save as a draft. Use to push a message out through Postiz; a publish date is required when scheduling, and media must be a path returned by the Upload File from URL action. Not idempotent — each call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes | `"schedule"` | Post Type. Choose whether to publish immediately, schedule for later, or save as draft. One of `"schedule"`, `"now"`, `"draft"`. |
| `date` | ISO date-time string | no |  | Publish Date. The date and time to publish the post (ISO 8601 format). Required for scheduled posts. |
| `integration` | string | yes |  | Channel. Select the connected social media channel. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Content. The text content of the post. |
| `media` | array | no |  | Media Paths. File paths of images or videos to attach. Upload media first using the "Upload File from URL" action, then paste the returned path here. |
| `shortLink` | boolean | no | `false` | Shorten Links. Automatically shorten URLs in the post content. |
| `settings` | JSON | no |  | Settings. Optional platform-specific settings (e.g. approval workflow overrides) |

### `list_posts`

**List Posts.** Retrieves posts scheduled or published within a given date range across all connected channels. Use to inspect what is on the calendar or to obtain post IDs for analytics or deletion. Both start and end dates are required. Idempotent — a read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `startDate` | ISO date-time string | yes |  | Start Date. Start of the date range (ISO 8601 format) |
| `endDate` | ISO date-time string | yes |  | End Date. End of the date range (ISO 8601 format) |

### `delete_post`

**Delete Post.** Deletes a post by its ID, along with every other post in the same group (a post fanned out to multiple channels). Use to cancel or remove a scheduled or published post. Requires a post ID, obtainable from List Posts or the New Published Post trigger. Effectively idempotent — re-deleting an already-removed post has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postId` | string | yes |  | Post ID. The ID of the post to delete. You can get this from the "List Posts" or "New Published Post" trigger output. |

### `list_integrations`

**List Channels.** Lists every social media channel connected to the organization, returning each channel id, name, and provider. Use to discover which channels are available and to resolve the integration id required by Create Post, Find Available Slot, and Get Platform Analytics. Idempotent — a read-only lookup. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `find_available_slot`

**Find Available Slot.** Returns the next free posting time slot for a connected channel based on its posting schedule. Use before scheduling to pick a non-conflicting publish date for Create Post. Requires the channel integration id (resolve via List Channels). Idempotent — a read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `integration` | string | yes |  | Channel. Select the connected social media channel. A value the product loads from the provider, such as an id; write the value itself. |

### `get_platform_analytics`

**Get Platform Analytics.** Retrieves channel-level analytics (followers, impressions, engagement and their change) for a connected channel over a configurable lookback window in days. Use to report on overall account performance rather than a single post. Requires the channel integration id (resolve via List Channels). Idempotent — a read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `integration` | string | yes |  | Channel. Select the connected social media channel. A value the product loads from the provider, such as an id; write the value itself. |
| `days` | number | yes | `30` | Lookback Days. Number of days to look back for analytics (e.g. 7, 30, 90) |

### `get_post_analytics`

**Get Post Analytics.** Retrieves engagement analytics (likes, comments, shares, impressions and their change) for a single published post over a configurable lookback window in days. Use to measure how one specific post performed. Requires the post ID (from List Posts or the New Published Post trigger). Idempotent — a read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postId` | string | yes |  | Post ID. The ID of the published post. You can get this from the "List Posts" or "New Published Post" trigger output. |
| `days` | number | yes | `30` | Lookback Days. Number of days to look back for analytics (e.g. 7, 30, 90) |

### `upload_file_from_url`

**Upload File from URL.** Downloads an image or video from a public URL and uploads it into Postiz media storage, returning a file path to attach to Create Post. Use this first whenever a post needs media. Requires a publicly reachable file URL. Not idempotent — each call uploads a new media file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | File URL. The public URL of the image or video to upload. |

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
