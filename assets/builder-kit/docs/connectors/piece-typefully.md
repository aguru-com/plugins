# Typefully

Write, schedule, and publish social media content.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-typefully'
  version: '0.3.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from **Typefully Settings → API**.

## Actions

### `typefully_create_draft`

**Create Draft Simple.** Creates a single-post draft in Typefully with the same text fanned out to one or more selected platforms (X, LinkedIn, Threads, Bluesky, Mastodon). Choose this for simple one-post content; use Create Draft Advanced for multi-post threads or per-platform content. Optionally schedule it via Publish At, otherwise it is saved as an unpublished draft. Each call creates a new draft, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `social_set_id` | string | yes |  | Social Set. The social set (account) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Post Text. The text content of the post. |
| `platforms` | array | yes |  | Platforms. Which platforms to publish to. At least one platform must be selected. One of `"x"`, `"linkedin"`, `"threads"`, `"bluesky"`, `"mastodon"`. |
| `draft_title` | string | no |  | Draft Title. An optional title for the draft (visible only in Typefully). |
| `tags` | array | no |  | Tags. Tags to apply to the draft. Values the product loads from the provider, such as ids; write an array of them. |
| `share` | boolean | no | `false` | Generate Share URL. Generate a share URL for the draft. |
| `publish_at` | ISO date-time string | no |  | Publish At. Schedule the draft for a specific date/time. Leave empty to save as draft. |
| `reply_to_url` | string | no |  | X Reply To URL. URL of an X post to reply to. |

### `typefully_create_draft_advanced`

**Create Draft Advanced.** Creates a Typefully draft from a raw per-platform JSON object, giving full control over multi-post threads, distinct content per platform, and attached media IDs. Choose this over Create Draft Simple when you need threads or platform-specific posts; the required Platforms JSON must be an object keyed by platform name, each with enabled and a posts array. Optionally schedule via Publish At. Each call creates a new draft, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `social_set_id` | string | yes |  | Social Set. The social set (account) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `platforms_json` | JSON | yes |  | Platforms (JSON). A JSON object defining per-platform content. Each key is a platform name (x, linkedin, threads, bluesky, mastodon) with an object containing "enabled" (boolean) and "posts" (array of {text} objects). For threads/X, add multiple posts. X also supports "settings": {"reply_to_url": "..."}. Example: {"… |
| `draft_title` | string | no |  | Draft Title. An optional title for the draft. |
| `tags` | array | no |  | Tags. Tags to apply to the draft. Values the product loads from the provider, such as ids; write an array of them. |
| `share` | boolean | no | `false` | Generate Share URL. Generate a share URL for the draft. |
| `publish_at` | ISO date-time string | no |  | Publish At. Schedule the draft for a specific date/time. Leave empty to save as draft. |

### `typefully_publish_draft_now`

**Publish Draft Now.** Immediately publishes an existing Typefully draft to all of its configured platforms by setting its publish time to now. Use when content is ready to go live right away; use Schedule Draft instead to publish at a future time. Requires the social set ID and the draft ID. Publishing is a one-time side effect, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `social_set_id` | string | yes |  | Social Set. The social set (account) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `draft_id` | string | yes |  | Draft ID. The ID of the draft to publish. |

### `typefully_schedule_draft`

**Schedule Draft.** Schedules an existing Typefully draft to publish at a specific future date and time (ISO 8601 with timezone). Use to queue content for later; use Publish Draft Now to go live immediately. Requires the social set ID, the draft ID, and the schedule time. Re-running with the same time leaves the draft scheduled for that time, so it is effectively idempotent on a stable input. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `social_set_id` | string | yes |  | Social Set. The social set (account) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `draft_id` | string | yes |  | Draft ID. The ID of the draft to schedule. |
| `schedule_at` | ISO date-time string | yes |  | Schedule At. The date and time to publish the draft (ISO 8601 format with timezone). |

### `typefully_get_draft`

**Get Draft.** Fetches a single Typefully draft by its draft ID within a social set. Use to read the current content, status, or schedule of a known draft. Requires both the social set ID and the draft ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `social_set_id` | string | yes |  | Social Set. The social set (account) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `draft_id` | string | yes |  | Draft ID. The ID of the draft to retrieve. |

### `typefully_list_drafts`

**List Drafts.** Lists drafts within a Typefully social set, optionally filtered by status (draft, scheduled, published, publishing, error) and sorted, returning up to the given limit (1-50, default 10). Use to discover draft IDs or survey drafts before reading, scheduling, publishing, or deleting them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `social_set_id` | string | yes |  | Social Set. The social set (account) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. Filter by draft status. One of `"draft"`, `"scheduled"`, `"published"`, `"publishing"`, `"error"`. |
| `order_by` | string | no |  | Order By. Sort order for the results. One of `"-created_at"`, `"created_at"`, `"-updated_at"`, `"updated_at"`, `"-scheduled_date"`, `"scheduled_date"`. |
| `limit` | number | no | `10` | Limit. Maximum number of drafts to return (1-50). |

### `typefully_delete_draft`

**Delete Draft.** Permanently deletes a Typefully draft identified by its draft ID within a social set. Use to remove an unwanted draft; this is destructive and cannot be undone. Requires both the social set ID and the draft ID. Repeating the call on an already-deleted draft has no further effect. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `social_set_id` | string | yes |  | Social Set. The social set (account) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `draft_id` | string | yes |  | Draft ID. The ID of the draft to delete. |

### `typefully_upload_media`

**Upload Media.** Uploads a media file (image, video, GIF, or PDF) to a Typefully social set and returns a media ID to reference when attaching media to drafts created via Create Draft Advanced. Use as a prerequisite step before building a draft that includes media. Requires the social set ID and the file. Each call uploads a new file, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `social_set_id` | string | yes |  | Social Set. The social set (account) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The media file to upload (image, video, GIF, or PDF). Files are not supported; an action that needs one fails. |

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
