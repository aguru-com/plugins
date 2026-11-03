# FeedHive

Schedule, manage and publish social media content with FeedHive.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-feedhive'
  version: '0.1.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your FeedHive API key:
> 1. Log in to your FeedHive account.
> 2. Go to **Settings** → **Account** (or **Workspace**).
> 3. Find the **API Key** section and copy your key.
>
> Your key starts with `fh_`.

## Actions

### `create_post`

**Create Post.** Creates a new FeedHive social media post from provided text, either saved as a draft or scheduled for a chosen publish date (set Status to "scheduled" and supply a date/time). Use to author and queue content for one or more connected social accounts. Each call creates a separate post, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Post Text. The main content of your post. |
| `status` | string | yes | `"draft"` | Status. Choose "Draft" to save without scheduling, or "Scheduled" to set a publish date. One of `"draft"`, `"scheduled"`. |
| `scheduled_at` | ISO date-time string | no |  | Scheduled Date & Time. Required when Status is "Scheduled". The exact date and time the post should be published. |
| `accounts` | array | no |  | Social Accounts. Select the social media accounts to publish this post to. Values the product loads from the provider, such as ids; write an array of them. |
| `labels` | array | no |  | Labels. Optionally assign labels to organise this post in FeedHive. Values the product loads from the provider, such as ids; write an array of them. |
| `notes` | string | no |  | Internal Notes. Private notes visible only to your team in FeedHive. Not published. |
| `short_link_enabled` | boolean | no | `false` | Enable Short Links. Automatically shorten URLs in your post text. |

### `update_post`

**Update Post.** Updates an existing FeedHive post identified by its post ID; only the fields you supply (text, status, schedule, accounts, labels, notes) are changed, leaving the rest intact. Use to edit or reschedule a draft or scheduled post. Idempotent: applying the same field values repeatedly leaves the post in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post. Select the post you want to act on. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | no |  | Post Text. The new content of the post. Leave empty to keep the current text. |
| `status` | string | no |  | Status. Change the post status. Leave empty to keep the current status. One of `"draft"`, `"scheduled"`. |
| `scheduled_at` | ISO date-time string | no |  | Scheduled Date & Time. Update the scheduled publish date and time. |
| `accounts` | array | no |  | Social Accounts. Select the social media accounts to publish this post to. Values the product loads from the provider, such as ids; write an array of them. |
| `labels` | array | no |  | Labels. Optionally assign labels to organise this post in FeedHive. Values the product loads from the provider, such as ids; write an array of them. |
| `notes` | string | no |  | Internal Notes. Update the private notes for this post. |
| `short_link_enabled` | boolean | no |  | Enable Short Links. Automatically shorten URLs in the post text. |

### `get_post`

**Get Post.** Fetches the full details of a single FeedHive post by its post ID. Use to read a post's current content, status, schedule, accounts, and labels before acting on it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post. Select the post you want to act on. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_post`

**Delete Post.** Permanently deletes a FeedHive post by its post ID; this cannot be undone. Use to remove a draft or scheduled post you no longer want. Idempotent: once the post is gone, repeating the call leaves it deleted with no further effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post. Select the post you want to act on. A value the product loads from the provider, such as an id; write the value itself. |

### `list_posts`

**List Posts.** Lists FeedHive posts, optionally narrowed by status (draft, scheduled, publishing, published, failed) and/or labels; leaving both filters empty returns all posts up to the result limit (max 100). Use to discover post IDs or survey the content queue. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Filter by Status. Only return posts with this status. Leave empty to return all posts. One of `"draft"`, `"scheduled"`, `"publishing"`, `"published"`, `"failed"`. |
| `labels` | array | no |  | Labels. Optionally assign labels to organise this post in FeedHive. Values the product loads from the provider, such as ids; write an array of them. |
| `limit` | number | no | `20` | Maximum Results. Maximum number of posts to return. Between 1 and 100. |

### `create_label`

**Create Label.** Creates a new label in FeedHive that can later be attached to posts for organisation. Use when a label an agent needs does not yet exist. Not idempotent: each call creates a new label even if one with the same title already exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Label Name. The name of the label (e.g. "Campaign Q1", "Evergreen Content"). |

### `fire_workflow_trigger`

**Create Post via Trigger.** Fires a pre-configured FeedHive workflow trigger (identified by its Trigger ID) to create a post, letting the workflow decide accounts, AI model, and defaults; you can optionally override with explicit text, an AI prompt, schedule, media URLs, title/link, or template variables that fill [[placeholder]] tokens in the workflow template. Use when posting through an existing FeedHive workflow rather than building the post directly. Not idempotent: each call fires the workflow and creates a new post. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `trigger_id` | string | yes |  | Trigger ID. The ID of your FeedHive workflow trigger. Found in FeedHive → Workflows → your workflow settings. |
| `text` | string | no |  | Post Text. The content of the post. Leave empty to let your workflow generate or use a template. |
| `prompt` | string | no |  | AI Prompt. Ask FeedHive AI to generate the post content. Only used if your workflow is configured for AI generation. |
| `scheduled` | ISO date-time string | no |  | Scheduled Date & Time. When to publish the post. Leave empty to use the schedule defined in the workflow. |
| `media_urls` | array | no |  | Media URLs. Public URLs of images or videos to include in the post (e.g. https://example.com/photo.jpg). |
| `title` | string | no |  | Title. Post title — only applicable for YouTube, Google My Business, and Pinterest posts. |
| `link` | string | no |  | Link URL. A URL to attach to the post — only applicable for YouTube, Google My Business, and Pinterest posts. |
| `template_variables` | object | no |  | Template Variables. If your workflow template uses placeholders like [[first_name]], provide them here as key-value pairs (e.g. first_name → John). Each key maps directly to a [[placeholder]] in your template. |

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
