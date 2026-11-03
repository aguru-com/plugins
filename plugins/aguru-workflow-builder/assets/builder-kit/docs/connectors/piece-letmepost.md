# Letmepost

Publish and schedule posts to Bluesky, X, LinkedIn, Instagram, Threads, Facebook, Pinterest, and TikTok through one API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-letmepost'
  version: '0.1.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: letmepost Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes | `"https://api.letmepost.dev"` | Base URL. The API base URL. Use `https://api.letmepost.dev` for the hosted service, or your own origin when self-hosting. |
| `api_key` | string | yes |  | API Key. Your letmepost API key (`lmp_live_…` or `lmp_test_…`). Create one in the dashboard under API keys. |

## Actions

### `publish_post`

**Publish a Post.** Sends one body of text and optional media to one or more connected accounts in a single call, either immediately or scheduled for a future time. Use to push content out through letmepost. A schedule time is required when Publish Now is off. Not idempotent unless an Idempotency Key is supplied, in which case replays within 24 hours return the original result. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accounts` | array | yes |  | Accounts. The connected accounts to publish to. Values the product loads from the provider, such as ids; write an array of them. |
| `text` | string | no |  | Text. The post body. Optional when the post is media-only on platforms that allow it. |
| `media` | array | no |  | Media. Media attachments. Give each item a public URL or an existing letmepost media ID, not both. Each item: { `kind`, `url`?, `mediaId`?, `altText`? }. |
| `firstComment` | string | no |  | First comment. Posted as the first comment under the published post, where the platform supports it. |
| `publishNow` | boolean | no | `true` | Publish now. Publish immediately. Turn off to schedule for a future time. |
| `scheduledAt` | ISO date-time string | no |  | Schedule at. When to publish the post (ISO 8601). Required when Publish Now is off. |
| `profileId` | string | no |  | Profile ID. Optional profile to attribute this post to. |
| `idempotencyKey` | string | no |  | Idempotency key. Reusing the same key never publishes twice, which makes retries safe. |

### `get_post`

**Get a Post.** Fetches one post by id, including its status, scheduled and published times, the connected account it went to, and the resulting platform URL. Use to check whether a post published or to read back its details. Idempotent, a read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postId` | string | yes |  | Post ID. The ID of the post to retrieve. |

### `list_accounts`

**List Accounts.** Lists every connected account, returning each id, platform, and display name. Use to discover which accounts are available and to resolve the account id required by Publish a Post. Idempotent, a read-only lookup. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `list_media`

**List Media.** Lists uploaded media assets, returning each id, URL, content type, and size. Use to find an existing media id to reuse in Publish a Post instead of re-uploading. Idempotent, a read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of media assets to return. |

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
