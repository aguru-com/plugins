# SendIt

Multi-platform social media publishing. Schedule and publish content to LinkedIn, Instagram, Threads, TikTok, X, and 30+ more platforms.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-send-it'
  version: '0.2.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your SendIt API key:
> 1. Log in to your [SendIt dashboard](https://sendit.infiniteappsai.com/dashboard)
> 2. Go to **Settings > API Keys**
> 3. Click **Create API Key** — the key is only shown once, so copy it immediately
> 4. Paste the key below (it starts with `sk_live_`)

## Actions

### `publish_post`

**Publish Post.** Immediately publishes a post (text plus optional image/video URL or a multi-image carousel) to one or more connected social platforms (X, LinkedIn, Instagram, Threads, TikTok, and others). Choose this to post right now rather than at a future time (use Schedule Post for that). Requires at least one selected platform whose account is connected in SendIt; note Instagram and TikTok require a media URL. Not idempotent: each call publishes a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `platforms` | array | yes |  | Platforms. Select one or more social media platforms to publish to. Make sure your accounts are connected in the SendIt dashboard under **Settings > Connected Accounts**. One of `"x"`, `"linkedin"`, `"linkedin-page"`, `"facebook"`, `"instagram"`, `"instagram-standalone"`, `"threads"`, `"bluesky"`, `"mastodon"`, `"warpcast"`, `"nostr"`, `"vk"`, `"youtube"`, `"tiktok"`, `"reddit"`, `"lemmy"`, `"discord"`, `"slack"`, `"telegram"`, `"pinterest"`, `"dribbble"`, `"medium"`, `"devto"`, `"hashnode"`, `"wordpress"` and 7 more. |
| `text` | string | yes |  | Post Text. The text content of your post. Character limits vary by platform (e.g. X/Twitter: 280, LinkedIn: 3000, Instagram: 2200). |
| `mediaUrl` | string | no |  | Media URL. A publicly accessible URL to an image (JPG, PNG, GIF) or video (MP4). **Required for Instagram and TikTok.** Images must be under 10 MB and videos under 100 MB. |
| `mediaUrls` | array | no |  | Media URLs (Carousel). Add multiple publicly accessible image URLs to create a carousel post. Supported on Instagram and Threads. Add one URL per item. |
| `mediaType` | string | no | `"auto"` | Media Type. Leave as **Auto-detect** unless SendIt misidentifies your media. Choose **Image** or **Video** to force a specific type. One of `"auto"`, `"image"`, `"video"`. |

### `schedule_post`

**Schedule Post.** Queues a post (text plus optional media URL) to be published at a specified future time on one or more connected social platforms. Choose this when publishing should be deferred; use Publish Post to send immediately. The scheduled time must be in the future and is interpreted in UTC. Not idempotent: each call creates a new scheduled post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `platforms` | array | yes |  | Platforms. Select one or more social media platforms to publish to. Make sure your accounts are connected in the SendIt dashboard under **Settings > Connected Accounts**. One of `"x"`, `"linkedin"`, `"linkedin-page"`, `"facebook"`, `"instagram"`, `"instagram-standalone"`, `"threads"`, `"bluesky"`, `"mastodon"`, `"warpcast"`, `"nostr"`, `"vk"`, `"youtube"`, `"tiktok"`, `"reddit"`, `"lemmy"`, `"discord"`, `"slack"`, `"telegram"`, `"pinterest"`, `"dribbble"`, `"medium"`, `"devto"`, `"hashnode"`, `"wordpress"` and 7 more. |
| `text` | string | yes |  | Post Text. The text content of your post. Character limits vary by platform (e.g. X/Twitter: 280, LinkedIn: 3000, Instagram: 2200). |
| `mediaUrl` | string | no |  | Media URL. A publicly accessible URL to an image (JPG, PNG, GIF) or video (MP4). **Required for Instagram and TikTok.** Images must be under 10 MB and videos under 100 MB. |
| `scheduledTime` | ISO date-time string | yes |  | Scheduled Time. When to publish the post. Must be in the future. Times are interpreted in UTC — convert your local time if needed. |

### `cancel_scheduled_post`

**Cancel Scheduled Post.** Cancels a pending scheduled post by its schedule ID so it will not be published. Use this to call off a future post created by Schedule Post; only posts in Pending status can be cancelled. Idempotent: cancelling an already-cancelled or non-existent schedule leaves it in the same cancelled end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduleId` | string | yes |  | Scheduled Post. Select the scheduled post you want to act on. Only posts with a **Pending** status are listed. A value the product loads from the provider, such as an id; write the value itself. |

### `trigger_scheduled_post`

**Trigger Scheduled Post Now.** Publishes a pending scheduled post right away instead of waiting for its scheduled time, identified by its schedule ID. Use this to push out a queued post early. Not idempotent: it performs an actual publish, so repeating the call can re-publish the content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduleId` | string | yes |  | Scheduled Post. Select the scheduled post you want to act on. Only posts with a **Pending** status are listed. A value the product loads from the provider, such as an id; write the value itself. |

### `validate_content`

**Validate Content.** Validates that a post (text plus optional media) meets the requirements of the selected social platforms, such as character limits and media rules, without publishing anything. Use this as a pre-flight check before Publish Post or Schedule Post. Idempotent: it is a read-only check with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `platforms` | array | yes |  | Platforms. Select one or more social media platforms to publish to. Make sure your accounts are connected in the SendIt dashboard under **Settings > Connected Accounts**. One of `"x"`, `"linkedin"`, `"linkedin-page"`, `"facebook"`, `"instagram"`, `"instagram-standalone"`, `"threads"`, `"bluesky"`, `"mastodon"`, `"warpcast"`, `"nostr"`, `"vk"`, `"youtube"`, `"tiktok"`, `"reddit"`, `"lemmy"`, `"discord"`, `"slack"`, `"telegram"`, `"pinterest"`, `"dribbble"`, `"medium"`, `"devto"`, `"hashnode"`, `"wordpress"` and 7 more. |
| `text` | string | yes |  | Post Text. The text content of your post. Character limits vary by platform (e.g. X/Twitter: 280, LinkedIn: 3000, Instagram: 2200). |
| `mediaUrl` | string | no |  | Media URL. A publicly accessible URL to an image (JPG, PNG, GIF) or video (MP4). **Required for Instagram and TikTok.** Images must be under 10 MB and videos under 100 MB. |
| `mediaUrls` | array | no |  | Media URLs (Carousel). Add multiple publicly accessible image URLs to create a carousel post. Supported on Instagram and Threads. Add one URL per item. |
| `mediaType` | string | no | `"auto"` | Media Type. Leave as **Auto-detect** unless SendIt misidentifies your media. Choose **Image** or **Video** to force a specific type. One of `"auto"`, `"image"`, `"video"`. |

### `list_accounts`

**List Connected Accounts.** Retrieves the social media accounts currently connected to the SendIt account. Use this to discover which platforms are available before publishing or scheduling, or to verify a connection exists. Takes no input. Idempotent: it is a read-only lookup. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `list_scheduled_posts`

**List Scheduled Posts.** Lists pending scheduled posts, optionally filtered to a single platform; leaving the platform filter empty returns scheduled posts across all platforms. Use this to find the schedule ID of a post you want to cancel or trigger early, or to review the publishing queue. Idempotent: it is a read-only list. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `platformFilter` | string | no |  | Platform Filter. Only return scheduled posts for a specific platform. Leave empty to see all platforms. One of `"x"`, `"linkedin"`, `"linkedin-page"`, `"facebook"`, `"instagram"`, `"instagram-standalone"`, `"threads"`, `"bluesky"`, `"mastodon"`, `"warpcast"`, `"nostr"`, `"vk"`, `"youtube"`, `"tiktok"`, `"reddit"`, `"lemmy"`, `"discord"`, `"slack"`, `"telegram"`, `"pinterest"`, `"dribbble"`, `"medium"`, `"devto"`, `"hashnode"`, `"wordpress"` and 7 more. |

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
