# Gitea

Self-hosted Git service

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gitea'
  version: '0.1.2'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To connect Gitea, create an OAuth2 application in your Gitea instance: **Settings → Applications → Manage OAuth2 Applications → Create Application**. Set the redirect URI to the one provided by Activepieces, then copy the Client ID and Client Secret here.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes | `"https://gitea.com"` | Base URL. Enter your Gitea instance URL (e.g., https://gitea.com) |

## Actions

### `create_issue`

**Create Issue.** Opens a new issue on a Gitea repository with a title and optional body. Use to file a bug, task, or feature request. Requires the target repository; each call creates a separate issue, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `body` | string | no |  | Body. |

### `create_comment`

**Add Comment to Issue/PR.** Posts a comment on a Gitea issue or pull request, identified by its index number within the repository (issues and PRs share the same number space). Use to reply, give feedback, or note status. Each call appends a new comment, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. A value the product loads from the provider, such as an id; write the value itself. |
| `index` | number | yes |  | Issue/PR Index. The index of the issue or pull request. |
| `body` | string | yes |  | Comment Body. |

### `update_repo`

**Update Repository.** Updates settings on an existing Gitea repository such as its name, description, website, or private/public visibility; only the fields you supply are changed. Use to rename a repo or adjust its metadata. Repeating the call with the same values leaves the repository in the same state, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. The name of the repository. |
| `description` | string | no |  | Description. |
| `private` | boolean | no |  | Private. |
| `website` | string | no |  | Website. |

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
