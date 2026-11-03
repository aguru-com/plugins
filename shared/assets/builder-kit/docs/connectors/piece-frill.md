# Frill

Collect feedback, manage ideas, and publish announcements with Frill.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-frill'
  version: '0.1.2'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your Frill API key:
> 1. Log in to your Frill dashboard at https://app.frill.co
> 2. Go to **Settings > API**
> 3. Click **Create API Key**
> 4. Copy the key and paste it here
>
> The key is used in the Authorization header as a Bearer token.

## Actions

### `create_idea`

**Create Idea.** Creates a new feedback idea or feature request in Frill, optionally tagged with topics, a status, a bug flag, and roadmap visibility. Use to capture incoming feedback or seed roadmap items. Not idempotent: each call creates a distinct idea even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Title. The title of the idea or feedback. |
| `description` | string | no |  | Description. The description of the idea in Markdown format. |
| `topics` | array | no |  | Topics. Select one or more topics to tag the idea with. Values the product loads from the provider, such as ids; write an array of them. |
| `status` | string | no |  | Status. Select the status for the idea. A value the product loads from the provider, such as an id; write the value itself. |
| `is_bug` | boolean | no | `false` | Mark as Bug. Check if this idea represents a bug. |
| `show_in_roadmap` | boolean | no | `true` | Show in Roadmap. Display this idea on the public roadmap. |
| `cover_image` | string | no |  | Cover Image URL. Optional URL for a cover image shown on the roadmap. |

### `update_idea`

**Update Idea.** Updates fields of an existing Frill idea identified by its idea ID, such as title, description, status, topics, bug/archive/completed flags, and roadmap visibility; only the fields you set are changed. Use to modify or transition an idea you already know the ID of. Idempotent: re-running with the same input leaves the idea in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idea` | string | yes |  | Idea. Select the feedback or idea to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Title. New title for the idea. Leave empty to keep unchanged. |
| `description` | string | no |  | Description. New description in Markdown. Leave empty to keep unchanged. |
| `status` | string | no |  | Status. Select the status for the idea. A value the product loads from the provider, such as an id; write the value itself. |
| `topics` | array | no |  | Topics. Select one or more topics to tag the idea with. Values the product loads from the provider, such as ids; write an array of them. |
| `is_bug` | boolean | no |  | Mark as Bug. Check to mark this idea as a bug. Leave empty to keep unchanged. |
| `is_archived` | boolean | no |  | Archive. Check to archive this idea. Leave empty to keep unchanged. |
| `is_completed` | boolean | no |  | Mark Completed. Check to mark this idea as completed. Leave empty to keep unchanged. |
| `show_in_roadmap` | boolean | no |  | Show in Roadmap. Display this idea on the public roadmap. Leave empty to keep unchanged. |

### `create_comment`

**Create Comment.** Posts a comment on an existing Frill idea (identified by idea ID), either as a public comment or, when the internal-note flag is set, as a private internal note. Use to reply to or annotate feedback. Not idempotent: each call appends a new comment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idea` | string | yes |  | Idea. Select the feedback or idea to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. The comment text in Markdown format. |
| `is_private` | boolean | no | `false` | Internal Note. Check to post this as a private internal note instead of a public comment. |

### `create_announcement`

**Create Announcement.** Creates a changelog or product-update announcement in Frill, either published immediately or saved as a draft depending on the publish flag, optionally filed under a category. Use to broadcast product updates. Not idempotent: each call creates a separate announcement. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Title. The title of the announcement. |
| `content` | string | yes |  | Content. The announcement body in Markdown format. |
| `category` | string | no |  | Category. Select the announcement category. A value the product loads from the provider, such as an id; write the value itself. |
| `is_published` | boolean | no | `true` | Publish Immediately. Check to publish immediately. Uncheck to save as draft. |

### `create_follower`

**Create Follower.** Adds a new follower (end user) to Frill by name and email, optionally with custom attributes and associated companies (each company needs an id and name). Use to register a user so they can be linked to feedback. Not idempotent: each call creates a follower, so use Update Follower to change an existing one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Full name of the follower. |
| `email` | string | yes |  | Email. Email address of the follower. |
| `attributes` | object | no |  | Custom Attributes. Optional custom attributes as key-value pairs (requires custom attributes feature). |
| `companies` | array | no |  | Companies. Companies to associate with this follower. Find company IDs in your Frill dashboard under Settings > Companies. Each item: { `id`, `name` }. |

### `update_follower`

**Update Follower.** Updates an existing Frill follower identified by follower ID, changing name or email and merging in custom attributes and company associations; only the fields you set are applied. Use to enrich or correct a known follower. Idempotent: re-running with the same input converges to the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `follower` | string | yes |  | Follower (User). Select a follower to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. New name for the follower. Leave empty to keep unchanged. |
| `email` | string | no |  | Email. New email address. Leave empty to keep unchanged. |
| `attributes` | object | no |  | Custom Attributes. Custom attributes to merge with existing ones (requires custom attributes feature). |
| `companies` | array | no |  | Companies. Companies to merge with this follower's existing associations. Find company IDs in your Frill dashboard under Settings > Companies. Each item: { `id`, `name` }. |

### `get_ideas`

**Get Ideas.** Retrieves a list of ideas/feedback entries from Frill, optionally filtered by status, with a result limit (defaults to 20). Use to browse or search existing feedback, e.g. to find an idea ID before commenting or updating. Idempotent: read-only. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of ideas to return. Defaults to 20. |
| `status` | string | no |  | Status. Select the status for the idea. A value the product loads from the provider, such as an id; write the value itself. |

### `get_comments`

**Get Comments.** Retrieves comments from Frill: scoped to a single idea when an idea ID is supplied, or all recent comments across ideas when left empty, up to the result limit (defaults to 20). Use to read discussion on feedback. Idempotent: read-only. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idea` | string | no |  | Idea. Optionally filter comments by a specific idea. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `20` | Limit. Maximum number of comments to return. Defaults to 20. |

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
