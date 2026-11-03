# Bettermode

Feature-rich engagement platform. Browse beautifully designed templates, each flexible for precise customization to your needs.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bettermode'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Your domain should be the base URL of your Bettermode community. Example: community.example.com

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `region` | string | yes |  | Region. The region of your Bettermode account. One of `"https://api.bettermode.com"`, `"https://api.bettermode.de"`. |
| `domain` | string | yes |  | BetterMode Domain. The domain of your Bettermode account. |
| `email` | string | yes |  | Email. Email address for your Bettermode account. |
| `password` | string | yes |  | Password. Password for your Bettermode account. |

## Actions

### `create_discussion`

**Create Discussion Post.** Publishes a new discussion post (title, HTML content, optional comma-separated tags, optional locked flag) into a Bettermode community space identified by its space ID. Use to start a conversation thread programmatically. Not idempotent: each call publishes a separate post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. The space to create the discussion in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the discussion. |
| `content` | string | yes |  | Content. The content of the discussion. |
| `tagNames` | string | no |  | Tags. The tags to add to the discussion. |
| `locked` | boolean | no | `false` | Locked. If the discussion should be locked. |

### `create_question`

**Create Question Post.** Publishes a new question post (title, HTML content, optional comma-separated tags, optional locked flag) into a Bettermode community space identified by its space ID. Use to post a question thread programmatically; the post type is "Question" rather than a discussion. Not idempotent: each call publishes a separate post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. The space to create the question in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the question. |
| `content` | string | yes |  | Content. The content of the question. |
| `tagNames` | string | no |  | Tags. The tags to add to the question. |
| `locked` | boolean | no | `false` | Locked. If the question should be locked. |

### `assign_badge`

**Assign Badge to Member.** Grants an existing Bettermode badge (by badge ID) to the member resolved from the given email address. The badge must already exist and the email must match a network member, or the call fails. Idempotent: the member ends up holding the badge regardless of how many times it is called. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `badgeId` | string | yes |  | Badge. The badge to assign. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The email of the member to assign the badge to. |

### `revoke_badge`

**Revoke Badge from Member.** Removes a Bettermode badge (by badge ID) from the member resolved from the given email address. The email must match a network member, or the call fails. Idempotent: the member ends up without the badge regardless of how many times it is called. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `badgeId` | string | yes |  | Badge. The badge to revoke. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The email of the member to revoke the badge from. |

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
