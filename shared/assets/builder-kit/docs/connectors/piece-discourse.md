# Discourse

Modern open source forum software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-discourse'
  version: '0.2.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> *Get your api Key: https://discourse.yourinstance.com/admin/api/keys

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_key` | string | yes |  | API Key. |
| `api_username` | string | yes |  | API Username. |
| `website_url` | string | yes |  | Website URL. URL of the discourse url i.e https://discourse.yourinstance.com. |

## Actions

### `create_post`

**Create Post.** Add a reply post to an existing Discourse topic, identified by its numeric topic ID. Use when an agent needs to append a message to a thread that already exists (to start a new thread instead, use Create Topic). Each call creates a new post, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `raw` | string | yes |  | Post Content. Content of the post. |
| `topic_id` | string | yes |  | Topic ID. ID of the topic to post in. A value the product loads from the provider, such as an id; write the value itself. |

### `create_topic`

**Create Topic.** Start a new Discourse topic (thread) with a title and body, optionally filed under a category ID. Use when an agent needs to open a new discussion rather than reply to an existing thread (use Create Post for replies). Each call creates a new topic, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Post Title. Title of the Topic. |
| `raw` | string | yes |  | Topic Content. Content of the topic. |
| `category` | string | no |  | Category ID. ID of the category to post in. A value the product loads from the provider, such as an id; write the value itself. |

### `change_user_trust_level`

**Change User Trust Level.** Set a Discourse user account to a specific trust level, identified by the numeric user ID. Use when an agent needs to promote or demote a member to control their permissions. Because it sets an absolute target level rather than incrementing, repeating the same call leaves the user at the same level. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. ID of the user. |
| `new_trust_level` | string | yes |  | New Trust Level. New trust level of the user. A value the product loads from the provider, such as an id; write the value itself. |

### `add_users_to_group`

**Add Users to Group.** Add one or more users (by username) as members of a Discourse group, identified by its numeric group ID. Use when an agent needs to grant group membership. Re-adding users who are already members has no additional effect, so the call is effectively idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_id` | string | yes |  | Group Id. Id of the group. A value the product loads from the provider, such as an id; write the value itself. |
| `users` | array | yes |  | Users. List of users to add to the group. |

### `send_private_message`

**Send Private Message.** Send a private message to one or more Discourse users (by username) with a title and body. Use when an agent needs to message members directly rather than post publicly. Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Post Title. Title for the PM. |
| `raw` | string | yes |  | Post Content. Content of the post. |
| `target_recipients` | array | yes |  | Users. List of users to send the PM to (can be one or more) |

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
