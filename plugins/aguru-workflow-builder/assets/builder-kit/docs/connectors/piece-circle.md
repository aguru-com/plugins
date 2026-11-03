# Circle

Circle.so is a platform for creating and managing communities.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-circle'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> You can obtain your API token by navigating to **Settings->Developers->Tokens**.

## Actions

### `create_post`

**Create Post.** Publishes a new post into a given Circle space, accepting body content as either plain text or a full TipTap JSON document (JSON wins if both are supplied). Use to programmatically add community content; status can be draft, published, or scheduled (a scheduled status needs a future publish time). Creates a new post on each call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Post Name/Title. The title of the post. |
| `text_body` | string | no |  | Post Body (Plain Text). Simple plain text content for the post. Used if 'Tiptap Body JSON' is not provided. |
| `tiptap_body_json` | JSON | no |  | Tiptap Body JSON. Full TipTap JSON object for the post body. If provided, 'Post Body (Plain Text)' is ignored. |
| `status` | string | no | `"published"` | Status. The status of the post. One of `"draft"`, `"published"`, `"scheduled"`. |
| `published_at` | ISO date-time string | no |  | Published At (for Scheduled). If status is 'scheduled', provide the future date and time for publishing. |
| `is_comments_enabled` | boolean | no | `true` | Enable Comments. Allow comments on this post? |
| `skip_notifications` | boolean | no | `false` | Skip Notifications. Prevent notifications from being sent for this post? |
| `user_email` | string | no |  | Post As User Email (Optional). Email of an existing community member to create this post as. If empty, posts as the authenticated admin. |

### `create_comment`

**Create Comment.** Adds a comment to a Circle post, identified by its post ID. Use to reply within a discussion; supplying a parent comment ID makes it a threaded reply rather than a top-level comment. Posts a new comment on each call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `post_id` | string | yes |  | Post. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Comment Body. The content of the comment. |
| `parent_comment_id` | number | no |  | Parent Comment ID (Optional). ID of the comment to reply to. Leave empty if not a reply. |
| `skip_notifications` | boolean | no | `false` | Skip Notifications. Skip sending notifications for this comment? |

### `add_member_to_space`

**Add Member to Space.** Grants an existing community member access to a specific Circle space, matched by their email address. Use to expand a member into additional spaces; the member must already exist in the community. Effectively keyed on the space/email pair, so re-running with the same inputs is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Member Email. The email address of the member to add to the space. |

### `find_member_by_email`

**Find Member by Email.** Looks up a single community member by their exact email address. Use to resolve an email into a member record (e.g. to obtain the member ID) before acting on them. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the member to find. |

### `get_post_details`

**Get Post Details.** Retrieves the full details of a single Circle post by its post ID. Use to read a known post's content and metadata. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `post_id` | string | yes |  | Post. A value the product loads from the provider, such as an id; write the value itself. |

### `get_member_details`

**Get Member Details.** Fetches the full profile of a single community member by their member ID. Use when you already have the member ID (e.g. from Find Member by Email) and need their complete profile data. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Community Member. A value the product loads from the provider, such as an id; write the value itself. |

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
