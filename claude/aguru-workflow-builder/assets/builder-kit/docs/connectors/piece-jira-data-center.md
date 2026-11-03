# Jira Data Center

Issue tracking and project management for Jira Data Center and Server

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-jira-data-center'
  version: '0.1.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To generate a Personal Access Token (PAT):
> 1. Log in to your Jira Data Center instance.
> 2. Click your **profile icon** (top-right) → **Profile**.
> 3. Go to **Personal Access Tokens** → **Create token**.
> 4. Set a name and expiry, then copy the generated token.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `instanceUrl` | string | yes |  | Instance URL. The URL of your Jira Data Center instance (e.g. https://jira.yourcompany.com) |
| `personalAccessToken` | string | yes |  | Personal Access Token. Your Jira Data Center Personal Access Token (PAT) |

## Actions

### `create_issue`

**Create Issue.** Creates a new issue (ticket) in a Jira Data Center/Server project. Use when an agent needs to file a bug, task, story, or other work item; the field set is driven by the chosen project and issue type, so both a project and an issue-type ID are required. Not idempotent — each call creates a separate issue. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueTypeId` | string | yes |  | Issue Type. A value the product loads from the provider, such as an id; write the value itself. |
| `issueFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `update_issue`

**Update Issue.** Updates fields on an existing Jira Data Center/Server issue, identified by its ID or key. Can optionally transition the issue to a new status (workflow transition) in the same call when a status is supplied. Use to edit an already-created issue rather than create one. Repeating with the same field values converges on the same state, so it is effectively idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `statusId` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `issueFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `get_issue`

**Get Issue.** Retrieves the full data for a single Jira Data Center/Server issue by ID or key. Use to read an issue's fields, status, comments, or changelog; optional expand selections (rendered fields, names, schema, transitions, edit-meta, changelog) and human-readable field/transition name mapping can enrich the result. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `expand` | array | no |  | Expand. Include additional information about the issue in the response. One of `"renderedFields"`, `"names"`, `"schema"`, `"transitions"`, `"editmeta"`, `"changelog"`. |
| `mapNames` | boolean | yes | `false` | Map Field Names. Map human readable names to Fields, Rendered Fields, Schema and Edit Meta. Notes: - This would implicitly add "names" to the expand field - If there are fields with the same name, they may be overridden. |
| `mapTransitions` | boolean | yes | `false` | Map Transition Names. Map human readable names to Transitions. Notes: - If there are transitions with the same name, they may be overridden - This changes the original data structure from list to map. |

### `find-user`

**Find User.** Searches Jira Data Center/Server users by a keyword (matched against username) and returns the matching accounts. Use to resolve a person to a Jira user before assigning an issue or adding a watcher. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyword` | string | yes |  | Keyword. |

### `search_issues`

**Search Issues.** Searches issues in Jira Data Center/Server using a JQL query and returns the matching issues (capped by Max Results, 1-100). Use when an agent needs to find or list issues by any criteria expressible in JQL — project, status, assignee, date, label, etc. Requires a valid JQL string. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jql` | string | yes | `"type = story and created > '2023-12-13 14:00'"` | JQL. The JQL query to use in the search. |
| `maxResults` | number | yes | `50` | Max Results. |

### `assign_issue`

**Assign Issue.** Sets the assignee of a Jira Data Center/Server issue to a chosen user. Use to (re)assign an issue to a specific person; the assignee is provided as a Jira username. Idempotent — assigning the same user repeatedly leaves the issue on that assignee. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee` | string | yes |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |

### `add_issue_attachment`

**Add Attachment to Issue.** Uploads a file and attaches it to a Jira Data Center/Server issue. Use to add a document, image, or log to an existing issue. Not idempotent — each call adds another attachment, even if the same file was already attached. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `attachment` | file | yes |  | Attachment. Files are not supported; an action that needs one fails. |

### `get-issue-attachment`

**Get Issue Attachment.** Downloads a single attachment from Jira Data Center/Server by its attachment ID, returning the attachment metadata and the file contents. Use when an agent already has an attachment ID (e.g. from reading an issue) and needs the actual file. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachmentId` | string | yes |  | Attachment ID. |

### `add-watcher-to-issue`

**Add Watcher to Issue.** Adds a user as a watcher on a Jira Data Center/Server issue so they receive notifications about it. Identify the issue by ID or key and the watcher by Jira username. Idempotent — adding an already-watching user does not create a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | yes |  | User. A value the product loads from the provider, such as an id; write the value itself. |

### `add_issue_comment`

**Add Issue Comment.** Posts a new comment on a Jira Data Center/Server issue. Use to add a note, update, or reply to an existing issue. Not idempotent — each call appends another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment Body. |

### `update_issue_comment`

**Update Issue Comment.** Replaces the body of an existing comment on a Jira Data Center/Server issue, identified by issue and comment ID. Use to edit a previously posted comment rather than add a new one. Idempotent — re-running with the same body leaves the comment unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `commentId` | string | yes |  | Comment ID. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment Body. |

### `link-issues`

**Link Issues.** Creates a typed link between two Jira Data Center/Server issues (e.g. blocks, relates to, duplicates), using a link-type ID and the two issue IDs/keys. Use to relate one issue to another. Not idempotent — repeating the call adds another link of that type. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstIssueId` | string | yes |  | First Issue. A value the product loads from the provider, such as an id; write the value itself. |
| `issueLinkTypeId` | string | yes |  | Link Type. A value the product loads from the provider, such as an id; write the value itself. |
| `secondIssueId` | string | yes |  | Second Issue. A value the product loads from the provider, such as an id; write the value itself. |

### `list_issue_comments`

**List Issue Comments.** Returns the comments on a Jira Data Center/Server issue, ordered by creation date (ascending or descending) and capped by a limit. Use to read the discussion history of an issue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `orderBy` | string | yes | `"-created"` | Order By. One of `"-created"`, `"+created"`. |
| `limit` | number | yes | `10` | Limit. Maximum number of results. |

### `delete_issue_comment`

**Delete Issue Comment.** Permanently deletes a specific comment from a Jira Data Center/Server issue, identified by issue and comment ID. Use to remove a comment that was posted in error. Idempotent on its target — once the comment is gone, the end state is unchanged by repeating. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `commentId` | string | yes |  | Comment ID. A value the product loads from the provider, such as an id; write the value itself. |

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
