# Buffer

Schedule, publish and analyze social media posts across multiple channels with Buffer.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-buffer'
  version: '0.1.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Access Token

> **How to get your Buffer access token:**
>
> 1. Sign in to Buffer at https://buffer.com and open the [Developer Apps](https://publish.buffer.com/developers/apps) page.
> 2. Click **Create New App** and fill in the basic details (callback URL can be any placeholder).
> 3. After the app is created, copy the **Access Token** shown on the app's page.
> 4. Paste it below.
>
> The token is sent as a Bearer token to the Buffer GraphQL API (https://api.buffer.com).

## Actions

### `create_post`

**Create Post.** Creates a social media post in Buffer for one or more channels, where the share mode controls timing: add to the channel queue, share next (skip the queue), share now, or schedule for a custom time. Choose it to draft or publish content to connected social accounts. A custom-scheduled post requires the scheduled time; posting to multiple channels creates a separate post per channel. Not idempotent — each call creates new posts. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | string | yes |  | Organization. The Buffer organization to use. A value the product loads from the provider, such as an id; write the value itself. |
| `channelIds` | array | yes |  | Channels. The Buffer channels to publish to. Values the product loads from the provider, such as ids; write an array of them. |
| `text` | string | yes |  | Text. The text content of the post. |
| `mode` | string | yes | `"addToQueue"` | Share Mode. When and how the post should be published. One of `"addToQueue"`, `"shareNext"`, `"shareNow"`, `"customScheduled"`. |
| `dueAt` | ISO date-time string | no |  | Scheduled Time. When to publish the post. Required when Share Mode is "Schedule for Custom Time". ISO 8601 (UTC). |
| `schedulingType` | string | yes | `"automatic"` | Scheduling Type. Use "Automatic" for channels Buffer can publish to directly. Use "Notification" for channels that require manual publishing via the Buffer mobile app (e.g. Instagram personal accounts). One of `"automatic"`, `"notification"`. |
| `saveToDraft` | boolean | no | `false` | Save as Draft. Save the post as a draft instead of scheduling it. Drafts are not published until explicitly scheduled. |
| `imageUrls` | array | no |  | Image URLs. Public URLs of images to attach to the post. |
| `linkUrl` | string | no |  | Link URL. A link to attach to the post (used as a link preview). |

### `create_idea`

**Create Idea.** Saves a new draft idea (title, body text, and/or attached images) to a Buffer organization's Idea Bank for later use. Choose it to stash content concepts without scheduling them to a channel. The idea must include at least a title, text, or one image. Not idempotent — each call creates a new idea. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationId` | string | yes |  | Organization. The Buffer organization to use. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. A short title or headline for the idea. |
| `text` | string | no |  | Text. The main body of the idea. |
| `imageUrls` | array | no |  | Image URLs. Public URLs of images to attach to the idea. |
| `aiAssisted` | boolean | no | `false` | AI Assisted. Mark this idea as created with AI assistance. |

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
