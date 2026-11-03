# YouTrack

JetBrains project management and issue tracking for agile teams.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-youtrack'
  version: '0.2.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: YouTrack Connection

> Connect your YouTrack instance.
>
> **How to get your permanent token:**
> 1. Log in to your YouTrack instance
> 2. Click your avatar -> **Profile** -> **Authentication** tab
> 3. Click **New permanent token**
> 4. Name it (e.g. "Activepieces") and click **Create**
> 5. **Copy the token immediately** - it is shown only once
> 6. Paste it below with your Instance URL
>
> Your **Instance URL** is your browser address, e.g. https://example.youtrack.cloud

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes |  | Instance URL. Your YouTrack URL (e.g. https://example.youtrack.cloud). Do NOT include /api. |
| `apiToken` | string | yes |  | Permanent Token. From Profile -> Authentication -> Permanent Tokens. Starts with "perm:". |

## Actions

### `create_issue`

**Create Issue.** Create a new issue in a YouTrack project, requiring the target project ID and a summary; optionally set a description and custom fields (priority, assignee, etc.) via a JSON array. Use to file a bug, task, or request. Not idempotent: each call creates a distinct issue. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select the YouTrack project to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `summary` | string | yes |  | Summary. A short, one-line title for the issue. |
| `description` | string | no |  | Description. Detailed description. Supports Markdown. |
| `customFieldsJson` | JSON | no |  | Custom Fields (JSON). Set custom field values on creation. Example: [ { "name": "Priority", "$type": "SingleEnumIssueCustomField", "value": { "name": "Critical" } }, { "name": "Assignee", "$type": "SingleUserIssueCustomField", "value": { "login": "jane.doe" } } ]. |

Output fields:

- `idReadable`: Issue ID
- `summary`: Summary
- `description`: Description
- `id`: Internal ID
- `project_id`: Project ID
- `project_name`: Project Name
- `project_shortName`: Project Short Name
- `reporter_id`: Reporter ID
- `reporter_name`: Reporter Name
- `reporter_login`: Reporter Login
- `customFields`: Custom Fields (an object whose keys vary)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `resolved`: Resolved (datetime)
- `commentsCount`: Comments Count (number)
- `votes`: Votes (number)

### `get_issue`

**Get Issue.** Fetch the full details of a single issue by its ID, including summary, description, and all custom field values. Use to read the current state of a known issue. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `idReadable`: Issue ID
- `summary`: Summary
- `description`: Description
- `id`: Internal ID
- `project_id`: Project ID
- `project_name`: Project Name
- `project_shortName`: Project Short Name
- `reporter_id`: Reporter ID
- `reporter_name`: Reporter Name
- `reporter_login`: Reporter Login
- `customFields`: Custom Fields (an object whose keys vary)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `resolved`: Resolved (datetime)
- `commentsCount`: Comments Count (number)
- `votes`: Votes (number)

### `search_issues`

**Search Issues.** Search issues using YouTrack query syntax (e.g. #unresolved, assignee: me, Priority: Critical), optionally scoped to one project. Leave both the project and query empty to list all accessible issues, or supply filters to narrow results. Use to find issues matching criteria before acting on them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. Optional: filter by project. Leave empty to search across all projects. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | no |  | Search Query. YouTrack search query. Examples: - #unresolved — all unresolved issues - assignee: me — assigned to you - Priority: Critical — critical priority - created: this week — created this week - summary: login — issues mentioning "login". |
| `limit` | number | no | `100` | Limit. Maximum issues to return. Default is 100. |

Output fields:

- `[].idReadable`: Issue ID
- `[].summary`: Summary
- `[].description`: Description
- `[].id`: Internal ID
- `[].project_id`: Project ID
- `[].project_name`: Project Name
- `[].project_shortName`: Project Short Name
- `[].reporter_id`: Reporter ID
- `[].reporter_name`: Reporter Name
- `[].reporter_login`: Reporter Login
- `[].customFields`: Custom Fields (an object whose keys vary)
- `[].created`: Created (datetime)
- `[].updated`: Updated (datetime)
- `[].resolved`: Resolved (datetime)
- `[].commentsCount`: Comments Count (number)
- `[].votes`: Votes (number)

### `update_issue`

**Update Issue.** Update an existing issue identified by its ID, changing summary, description, and/or custom fields (priority, assignee, etc.); only the fields you provide are modified. Use to edit issue content or set field values. Idempotent: re-applying the same values leaves the issue in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `summary` | string | no |  | Summary. New summary. Leave empty to keep. |
| `description` | string | no |  | Description. New description. Leave empty to keep. |
| `customFieldsJson` | JSON | no |  | Custom Fields (JSON). Set custom fields. Example: [{ "name": "Priority", "$type": "SingleEnumIssueCustomField", "value": { "name": "Critical" } }]. |

Output fields:

- `idReadable`: Issue ID
- `summary`: Summary
- `description`: Description
- `id`: Internal ID
- `project_id`: Project ID
- `project_name`: Project Name
- `project_shortName`: Project Short Name
- `reporter_id`: Reporter ID
- `reporter_name`: Reporter Name
- `reporter_login`: Reporter Login
- `customFields`: Custom Fields (an object whose keys vary)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `resolved`: Resolved (datetime)
- `commentsCount`: Comments Count (number)
- `votes`: Votes (number)

### `apply_command`

**Apply Command.** Apply a free-text YouTrack command to an issue (e.g. "State Fixed", "assignee jane.doe", "Priority Critical") to change its state, assignment, fields, or sprint in one step, optionally with a comment and silent (no-notification) mode. Use for workflow transitions expressed as commands. Mutating; idempotency depends on the command — setting a state or field is idempotent, while appending a comment is not. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `command` | string | yes |  | Command. YouTrack command. Examples: State Fixed \| assignee jane.doe \| Priority Critical \| for me Critical. |
| `comment` | string | no |  | Comment. Optional comment. |
| `silent` | boolean | no | `false` | Apply silently?. No notifications if enabled. |

Output fields:

- `success`: Success (boolean)
- `command`: Command

### `add_tag_to_issue`

**Add Tag to Issue.** Attach an existing tag to an issue, given both the issue ID and the tag ID; the tag must already exist (use Create Tag first if needed). Idempotent: adding a tag already present leaves the issue unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | string | yes |  | Tag. Select a tag to apply to the issue. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Tag ID
- `name`: Name

### `remove_tag_from_issue`

**Remove Tag from Issue.** Detach a tag from an issue, given both the issue ID and the tag ID. Idempotent: removing a tag that is not present has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | string | yes |  | Tag. Select a tag to apply to the issue. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `create_tag`

**Create Tag.** Create a new tag in YouTrack with a given name, optionally set to auto-remove when an issue is resolved. Use to define a label before applying it to issues. Not idempotent: repeating the call creates another tag with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Tag Name. Name like "Regression" or "To deploy". |
| `untagOnResolve` | boolean | no | `false` | Remove when resolved?. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `owner_id`: Owner ID
- `owner_name`: Owner Name
- `untagOnResolve`: Remove When Resolved (boolean)

### `list_tags`

**List Tags.** List tags visible to the current user, optionally filtered by a name substring; leave the filter empty to return all tags. Use to discover tag IDs before adding or removing tags on an issue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Filter by Name. Filter tags by name. Leave empty for all. |
| `limit` | number | no | `100` | Limit. Max tags. Default 100. |

Output fields:

- `[].id`: Tag ID
- `[].name`: Name
- `[].owner_id`: Owner ID
- `[].owner_name`: Owner Name
- `[].visible_for_name`: Visible For
- `[].updateable_by_name`: Updateable By
- `[].untag_on_resolve`: Remove When Resolved (boolean)

### `upload_attachment`

**Upload Attachment.** Attach one or more files to an existing issue, given the issue ID plus a file name and Base64-encoded content for each file. Use to add screenshots, logs, or documents to an issue. Not idempotent: each call appends new attachments. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `files` | array | yes |  | Files. Add files to attach. Each needs a file name and base64-encoded content. Each item: { `fileName`, `fileContent` }. |

Output fields:

- `[].id`: Attachment ID
- `[].name`: File Name

### `delete_attachment`

**Delete Attachment.** Delete a single attachment from an issue, given the issue ID and the attachment database ID (e.g. "134-31", found via List Attachments or Get Issue). Idempotent: deleting an already-removed attachment has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `attachmentId` | string | yes |  | Attachment ID. The database ID of the attachment (e.g. "134-31"). You can find attachment IDs by using the "Get Issue" action — look for the attachment IDs in the output. |

Output fields:

- `success`: Success (boolean)

### `download_attachment`

**Download Attachment.** Download a single attachment from an issue and return its content as Base64 plus metadata, given the issue ID and attachment database ID (e.g. "134-31", found via List Attachments). Use to retrieve file bytes for forwarding to another step. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `attachmentId` | string | yes |  | Attachment ID. The attachment database ID (e.g. "134-31"). Use "List Attachments" to find it. |

Output fields:

- `file_name`: File Name
- `attachment_id`: Attachment ID
- `content_type`: Content Type
- `size_bytes`: Size (filesize)
- `base64_content`: Base64 Content

### `get_issue_history`

**Get Issue History.** Retrieve the change history (activity log) for an issue, given its ID, filtered to the selected activity types (custom field changes and/or comments). Use to audit what changed on an issue and by whom. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `categories` | array | yes | `["CustomFieldCategory","CommentsCategory"]` | Activity Types. Select which types of activities to include. One of `"CustomFieldCategory"`, `"CommentsCategory"`. |

Output fields:

- `[].type`: Activity Type
- `[].timestamp`: Timestamp (datetime)
- `[].author_name`: Author Name
- `[].author_login`: Author Login
- `[].added_values`: Added Values
- `[].removed_values`: Removed Values
- `[].comment_text`: Comment Text

### `add_comment`

**Add Comment.** Post a comment on an issue, given the issue ID and Markdown text; optionally restrict visibility to a specific group. Use to add a note or reply on an issue. Not idempotent: each call appends a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Comment Text. The comment text. Use Markdown for formatting. Mention users with @username. |
| `visibleToGroup` | string | no |  | Visible to Group. Restrict comment visibility to a group. Leave empty for everyone. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Comment ID
- `text`: Text
- `author_name`: Author Name
- `author_login`: Author Login
- `created`: Created (datetime)

### `list_comments`

**List Comments.** List the comments on an issue, given its ID, with author and timestamp details (capped by an optional limit). Use to read the discussion on a known issue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `100` | Limit. Max comments. Default 100. |

Output fields:

- `[].id`: Comment ID
- `[].text`: Text
- `[].author_name`: Author Name
- `[].author_login`: Author Login
- `[].created`: Created (datetime)
- `[].updated`: Updated (datetime)

### `add_user_to_team`

**Add User to Project Team.** Add a user as a direct member of a project team, granting them access to the project; requires the project ID and the user ID. Idempotent: adding a user who is already a team member leaves membership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select the YouTrack project to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `user` | string | yes |  | User. Select a YouTrack user. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: User ID
- `name`: Name
- `login`: Login

### `link_issues`

**Link Issues.** Create a directional relationship between two issues, given the source issue ID, the readable target issue ID (e.g. "NP-92"), and a link type (relates to, depends on, duplicates, parent for, subtask of, etc.). Idempotent: re-creating an existing link of the same type leaves the relationship unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceIssue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `targetIssueId` | string | yes |  | Target Issue ID. The readable ID of the issue to link to (e.g. "NP-92"). You can find this in the issue URL or header. |
| `linkType` | string | yes | `"relates to"` | Link Type. The type of relationship between the issues. One of `"relates to"`, `"depends on"`, `"is duplicated by"`, `"duplicates"`, `"parent for"`, `"subtask of"`. |

Output fields:

- `success`: Success (boolean)
- `link_type`: Link Type
- `target_issue`: Target Issue

### `list_attachments`

**List Attachments.** List the attachments on an issue, given its ID, with metadata (name, size, content type, author) capped by an optional limit. Use to discover attachment IDs before downloading or deleting them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue` | string | yes |  | Issue. Select the issue to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `50` | Limit. Max attachments. Default 50. |

Output fields:

- `[].id`: Attachment ID
- `[].name`: File Name
- `[].content_type`: Content Type
- `[].size_bytes`: Size (filesize)
- `[].author_name`: Author Name
- `[].author_login`: Author Login
- `[].created`: Created (datetime)

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
