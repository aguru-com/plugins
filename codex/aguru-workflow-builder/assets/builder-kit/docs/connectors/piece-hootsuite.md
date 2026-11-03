# Hootsuite

Social media management — schedule posts and manage multiple networks from one dashboard.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hootsuite'
  version: '0.1.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Hootsuite account. Create an OAuth2 app and get your client credentials at https://developer.hootsuite.com.

## Actions

### `create_message`

**Schedule Post.** Publishes a post to one or more connected Hootsuite social profiles, either immediately or scheduled for a future time depending on whether a scheduled time is provided (leave it empty to post now; a future time must be at least 5 minutes ahead and in UTC). Use to create and distribute social media content across networks. Not idempotent: each call creates a new post, so repeating it produces duplicate posts. Requires the target social profile IDs and the post text. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `socialProfileIds` | array | yes |  | Social Profiles. Select the social media profiles to post to. Values the product loads from the provider, such as ids; write an array of them. |
| `text` | string | yes |  | Post Text. The text content of your post. |
| `scheduledSendTime` | ISO date-time string | no |  | Scheduled Time. When to publish the post (UTC, must be at least 5 minutes in the future). Leave empty to post immediately. |
| `emailNotification` | boolean | no | `false` | Email Notification. Send an email notification when the post is published. |

### `get_message`

**Get Post Details.** Looks up a single Hootsuite post by its ID and returns its current details and state (e.g. scheduled, sent, errored). Use to inspect or confirm a post created earlier or referenced from the dashboard. Idempotent read-only lookup. Requires the post ID, obtainable from a Schedule Post output or the Hootsuite dashboard URL. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Post ID. The unique ID of the post. You can get this from a previous "Schedule Post" action output or from the Hootsuite dashboard URL. |

### `delete_message`

**Delete Post.** Permanently deletes a Hootsuite post by its ID. Use to cancel or remove a scheduled post before it sends. Only posts in a deletable state (e.g. SCHEDULED) can be removed; already-sent posts cannot. Not idempotent: the first call removes the post and subsequent calls with the same ID will fail since it no longer exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Post ID. The unique ID of the post to delete. You can get this from the "Schedule Post" or "Get Post Details" action. |

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
