# Jira Cloud

Issue tracking and project management

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-jira-cloud'
  version: '0.5.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> You can generate your API token from:
> ***https://id.atlassian.com/manage-profile/security/api-tokens***

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `instanceUrl` | string | yes |  | Instance URL. The link of your Jira instance (e.g https://example.atlassian.net) |
| `email` | string | yes |  | Email. The email you use to login to Jira. |
| `apiToken` | string | yes |  | API Token. Your Jira API Token. |

## Actions

### `create_issue`

**Create Issue.** Create a new Jira issue in a given project and issue type, with fields driven by that type's create screen (summary, description, custom fields, etc.); selected rich-text fields can be supplied as raw ADF JSON. Use for brand-new work items — to modify an existing one use Update Issue. Not idempotent: every run creates another issue. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueTypeId` | string | yes |  | Issue Type. A value the product loads from the provider, such as an id; write the value itself. |
| `issueFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |
| `adfFields` | array | no |  | Fields in JSON Atlassian Document Format. https://developer.atlassian.com/cloud/jira/platform/apis/document/structure. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Issue ID
- `key`: Issue Key
- `self`: API URL (url)
- `fields`: Fields
- `fields.summary`: Summary
- `fields.status`: Status
- `fields.status.id`: Status ID
- `fields.status.name`: Status
- `fields.status.description`: Description
- `fields.status.statusCategory`: Status Category
- `fields.status.statusCategory.key`: Category Key
- `fields.status.statusCategory.name`: Category Name
- `fields.issuetype`: Issue Type
- `fields.issuetype.id`: Issue Type ID
- `fields.issuetype.name`: Issue Type
- `fields.issuetype.subtask`: Subtask (boolean)
- `fields.priority`: Priority
- `fields.priority.id`: Priority ID
- `fields.priority.name`: Priority
- `fields.project`: Project
- `fields.project.id`: Project ID
- `fields.project.key`: Project Key
- `fields.project.name`: Project Name
- `fields.assignee`: Assignee
- `fields.assignee.accountId`: Account ID
- `fields.assignee.displayName`: Display Name
- `fields.assignee.emailAddress`: Email (email)
- `fields.assignee.active`: Active (boolean)
- `fields.assignee.timeZone`: Time Zone
- `fields.assignee.accountType`: Account Type
- `fields.reporter`: Reporter
- `fields.reporter.accountId`: Account ID
- `fields.reporter.displayName`: Display Name
- `fields.reporter.emailAddress`: Email (email)
- `fields.reporter.active`: Active (boolean)
- `fields.reporter.timeZone`: Time Zone
- `fields.reporter.accountType`: Account Type
- `fields.creator`: Creator
- `fields.creator.accountId`: Account ID
- `fields.creator.displayName`: Display Name
- `fields.creator.emailAddress`: Email (email)
- `fields.creator.active`: Active (boolean)
- `fields.creator.timeZone`: Time Zone
- `fields.creator.accountType`: Account Type
- `fields.labels`: Labels
- `fields.created`: Created (datetime)
- `fields.updated`: Updated (datetime)
- `fields.duedate`: Due Date (date)
- `fields.resolutiondate`: Resolved (datetime)
- `fields.resolution`: Resolution
- `fields.resolution.id`: Resolution ID
- `fields.resolution.name`: Resolution
- `fields.parent`: Parent
- `fields.parent.id`: Parent ID
- `fields.parent.key`: Parent Key
- `fields.description`: Description (Atlassian Document Format)
- `fields.fixVersions`: Fix Versions
- `fields.fixVersions[].id`: Version ID
- `fields.fixVersions[].name`: Name
- `fields.fixVersions[].description`: Description
- `fields.fixVersions[].released`: Released (boolean)
- `fields.fixVersions[].archived`: Archived (boolean)
- `fields.fixVersions[].releaseDate`: Release Date (date)
- `fields.components`: Components
- `fields.attachment`: Attachments
- `fields.attachment[].id`: Attachment ID
- `fields.attachment[].filename`: File Name
- `fields.attachment[].mimeType`: MIME Type
- `fields.attachment[].size`: Size (filesize)
- `fields.attachment[].content`: Content URL (url)
- `fields.attachment[].thumbnail`: Thumbnail URL (image)
- `fields.attachment[].created`: Created (datetime)
- `fields.attachment[].author`: Author
- `fields.attachment[].author.accountId`: Account ID
- `fields.attachment[].author.displayName`: Display Name
- `fields.attachment[].author.emailAddress`: Email (email)
- `fields.attachment[].author.active`: Active (boolean)
- `fields.attachment[].author.timeZone`: Time Zone
- `fields.attachment[].author.accountType`: Account Type
- `fields.issuelinks`: Issue Links
- `fields.issuelinks[].id`: Link ID
- `fields.issuelinks[].type`: Link Type
- `fields.issuelinks[].type.name`: Name
- `fields.issuelinks[].type.inward`: Inward Description
- `fields.issuelinks[].type.outward`: Outward Description
- `fields.issuelinks[].inwardIssue`: Inward Issue
- `fields.issuelinks[].inwardIssue.key`: Issue Key
- `fields.issuelinks[].outwardIssue`: Outward Issue
- `fields.issuelinks[].outwardIssue.key`: Issue Key
- `fields.subtasks`: Subtasks
- `fields.subtasks[].id`: Issue ID
- `fields.subtasks[].key`: Issue Key

### `update_issue`

**Update Issue.** Update fields on an existing Jira issue (by ID or key) using its edit screen — summary, description, custom fields, etc. — with optional ADF JSON for rich-text fields, and optionally trigger a status transition in the same run; returns the refreshed issue. Use to modify existing items rather than Create Issue. Field updates are idempotent (same values yield the same state), though a repeated status transition may fail once already applied. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `statusId` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `issueFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |
| `adfFields` | array | no |  | Fields in JSON Atlassian Document Format. https://developer.atlassian.com/cloud/jira/platform/apis/document/structure. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Issue ID
- `key`: Issue Key
- `self`: API URL (url)
- `fields`: Fields
- `fields.summary`: Summary
- `fields.status`: Status
- `fields.status.id`: Status ID
- `fields.status.name`: Status
- `fields.status.description`: Description
- `fields.status.statusCategory`: Status Category
- `fields.status.statusCategory.key`: Category Key
- `fields.status.statusCategory.name`: Category Name
- `fields.issuetype`: Issue Type
- `fields.issuetype.id`: Issue Type ID
- `fields.issuetype.name`: Issue Type
- `fields.issuetype.subtask`: Subtask (boolean)
- `fields.priority`: Priority
- `fields.priority.id`: Priority ID
- `fields.priority.name`: Priority
- `fields.project`: Project
- `fields.project.id`: Project ID
- `fields.project.key`: Project Key
- `fields.project.name`: Project Name
- `fields.assignee`: Assignee
- `fields.assignee.accountId`: Account ID
- `fields.assignee.displayName`: Display Name
- `fields.assignee.emailAddress`: Email (email)
- `fields.assignee.active`: Active (boolean)
- `fields.assignee.timeZone`: Time Zone
- `fields.assignee.accountType`: Account Type
- `fields.reporter`: Reporter
- `fields.reporter.accountId`: Account ID
- `fields.reporter.displayName`: Display Name
- `fields.reporter.emailAddress`: Email (email)
- `fields.reporter.active`: Active (boolean)
- `fields.reporter.timeZone`: Time Zone
- `fields.reporter.accountType`: Account Type
- `fields.creator`: Creator
- `fields.creator.accountId`: Account ID
- `fields.creator.displayName`: Display Name
- `fields.creator.emailAddress`: Email (email)
- `fields.creator.active`: Active (boolean)
- `fields.creator.timeZone`: Time Zone
- `fields.creator.accountType`: Account Type
- `fields.labels`: Labels
- `fields.created`: Created (datetime)
- `fields.updated`: Updated (datetime)
- `fields.duedate`: Due Date (date)
- `fields.resolutiondate`: Resolved (datetime)
- `fields.resolution`: Resolution
- `fields.resolution.id`: Resolution ID
- `fields.resolution.name`: Resolution
- `fields.parent`: Parent
- `fields.parent.id`: Parent ID
- `fields.parent.key`: Parent Key
- `fields.description`: Description (Atlassian Document Format)
- `fields.fixVersions`: Fix Versions
- `fields.fixVersions[].id`: Version ID
- `fields.fixVersions[].name`: Name
- `fields.fixVersions[].description`: Description
- `fields.fixVersions[].released`: Released (boolean)
- `fields.fixVersions[].archived`: Archived (boolean)
- `fields.fixVersions[].releaseDate`: Release Date (date)
- `fields.components`: Components
- `fields.attachment`: Attachments
- `fields.attachment[].id`: Attachment ID
- `fields.attachment[].filename`: File Name
- `fields.attachment[].mimeType`: MIME Type
- `fields.attachment[].size`: Size (filesize)
- `fields.attachment[].content`: Content URL (url)
- `fields.attachment[].thumbnail`: Thumbnail URL (image)
- `fields.attachment[].created`: Created (datetime)
- `fields.attachment[].author`: Author
- `fields.attachment[].author.accountId`: Account ID
- `fields.attachment[].author.displayName`: Display Name
- `fields.attachment[].author.emailAddress`: Email (email)
- `fields.attachment[].author.active`: Active (boolean)
- `fields.attachment[].author.timeZone`: Time Zone
- `fields.attachment[].author.accountType`: Account Type
- `fields.issuelinks`: Issue Links
- `fields.issuelinks[].id`: Link ID
- `fields.issuelinks[].type`: Link Type
- `fields.issuelinks[].type.name`: Name
- `fields.issuelinks[].type.inward`: Inward Description
- `fields.issuelinks[].type.outward`: Outward Description
- `fields.issuelinks[].inwardIssue`: Inward Issue
- `fields.issuelinks[].inwardIssue.key`: Issue Key
- `fields.issuelinks[].outwardIssue`: Outward Issue
- `fields.issuelinks[].outwardIssue.key`: Issue Key
- `fields.subtasks`: Subtasks
- `fields.subtasks[].id`: Issue ID
- `fields.subtasks[].key`: Issue Key

### `find-user`

**Find User.** Search Jira users by a keyword matched against display name and email, returning all matches plus a found flag. Use to resolve a person's name or email into a Jira accountId before assigning issues or adding watchers. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyword` | string | yes |  | Keyword. |

Output fields:

- `found`: Found (boolean)
- `data`: Users
- `data[].accountId`: Account ID
- `data[].displayName`: Display Name
- `data[].emailAddress`: Email (email)
- `data[].active`: Active (boolean)
- `data[].timeZone`: Time Zone
- `data[].accountType`: Account Type

### `search_issues`

**Search Issues.** Search Jira issues with an arbitrary JQL query, paginating automatically up to a max-results cap (1-5000) and optionally restricting which fields are returned or mapping field IDs to readable names. The go-to tool for finding issues by project, status, assignee, dates, or any JQL-expressible criteria; limit returned fields on large result sets to avoid memory issues. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jql` | string | yes | `"type = story and created > '2023-12-13 14:00'"` | JQL. The JQL query to use in search (Tip: Use single quotes for strings/dates) |
| `fields` | array | no |  | Fields to Return. List of exact Jira Field IDs to return (e.g., 'summary', 'customfield_10016'). Special commands: - Use *all for every field. - Use *navigable for standard fields (default). - Prefix with a minus to exclude (e.g., -description). Example: *all and -comment returns everything except comments. |
| `mapNames` | boolean | yes | `false` | Map Field Names. Map human readable names to Fields in the output. Notes: - If there are fields with the same name, they may be overridden. |
| `maxResults` | number | yes | `50` | Max Results. |
| `sanitizeJql` | boolean | yes | `true` | Sanitize JQL. |

Output fields:

- `[].id`: Issue ID
- `[].key`: Issue Key
- `[].self`: API URL (url)
- `[].fields`: Fields
- `[].fields.summary`: Summary
- `[].fields.status`: Status
- `[].fields.status.id`: Status ID
- `[].fields.status.name`: Status
- `[].fields.status.description`: Description
- `[].fields.status.statusCategory`: Status Category
- `[].fields.status.statusCategory.key`: Category Key
- `[].fields.status.statusCategory.name`: Category Name
- `[].fields.issuetype`: Issue Type
- `[].fields.issuetype.id`: Issue Type ID
- `[].fields.issuetype.name`: Issue Type
- `[].fields.issuetype.subtask`: Subtask (boolean)
- `[].fields.priority`: Priority
- `[].fields.priority.id`: Priority ID
- `[].fields.priority.name`: Priority
- `[].fields.project`: Project
- `[].fields.project.id`: Project ID
- `[].fields.project.key`: Project Key
- `[].fields.project.name`: Project Name
- `[].fields.assignee`: Assignee
- `[].fields.assignee.accountId`: Account ID
- `[].fields.assignee.displayName`: Display Name
- `[].fields.assignee.emailAddress`: Email (email)
- `[].fields.assignee.active`: Active (boolean)
- `[].fields.assignee.timeZone`: Time Zone
- `[].fields.assignee.accountType`: Account Type
- `[].fields.reporter`: Reporter
- `[].fields.reporter.accountId`: Account ID
- `[].fields.reporter.displayName`: Display Name
- `[].fields.reporter.emailAddress`: Email (email)
- `[].fields.reporter.active`: Active (boolean)
- `[].fields.reporter.timeZone`: Time Zone
- `[].fields.reporter.accountType`: Account Type
- `[].fields.creator`: Creator
- `[].fields.creator.accountId`: Account ID
- `[].fields.creator.displayName`: Display Name
- `[].fields.creator.emailAddress`: Email (email)
- `[].fields.creator.active`: Active (boolean)
- `[].fields.creator.timeZone`: Time Zone
- `[].fields.creator.accountType`: Account Type
- `[].fields.labels`: Labels
- `[].fields.created`: Created (datetime)
- `[].fields.updated`: Updated (datetime)
- `[].fields.duedate`: Due Date (date)
- `[].fields.resolutiondate`: Resolved (datetime)
- `[].fields.resolution`: Resolution
- `[].fields.resolution.id`: Resolution ID
- `[].fields.resolution.name`: Resolution
- `[].fields.parent`: Parent
- `[].fields.parent.id`: Parent ID
- `[].fields.parent.key`: Parent Key
- `[].fields.description`: Description (Atlassian Document Format)
- `[].fields.fixVersions`: Fix Versions
- `[].fields.fixVersions[].id`: Version ID
- `[].fields.fixVersions[].name`: Name
- `[].fields.fixVersions[].description`: Description
- `[].fields.fixVersions[].released`: Released (boolean)
- `[].fields.fixVersions[].archived`: Archived (boolean)
- `[].fields.fixVersions[].releaseDate`: Release Date (date)
- `[].fields.components`: Components
- `[].fields.attachment`: Attachments
- `[].fields.attachment[].id`: Attachment ID
- `[].fields.attachment[].filename`: File Name
- `[].fields.attachment[].mimeType`: MIME Type
- `[].fields.attachment[].size`: Size (filesize)
- `[].fields.attachment[].content`: Content URL (url)
- `[].fields.attachment[].thumbnail`: Thumbnail URL (image)
- `[].fields.attachment[].created`: Created (datetime)
- `[].fields.attachment[].author`: Author
- `[].fields.attachment[].author.accountId`: Account ID
- `[].fields.attachment[].author.displayName`: Display Name
- `[].fields.attachment[].author.emailAddress`: Email (email)
- `[].fields.attachment[].author.active`: Active (boolean)
- `[].fields.attachment[].author.timeZone`: Time Zone
- `[].fields.attachment[].author.accountType`: Account Type
- `[].fields.issuelinks`: Issue Links
- `[].fields.issuelinks[].id`: Link ID
- `[].fields.issuelinks[].type`: Link Type
- `[].fields.issuelinks[].type.name`: Name
- `[].fields.issuelinks[].type.inward`: Inward Description
- `[].fields.issuelinks[].type.outward`: Outward Description
- `[].fields.issuelinks[].inwardIssue`: Inward Issue
- `[].fields.issuelinks[].inwardIssue.key`: Issue Key
- `[].fields.issuelinks[].outwardIssue`: Outward Issue
- `[].fields.issuelinks[].outwardIssue.key`: Issue Key
- `[].fields.subtasks`: Subtasks
- `[].fields.subtasks[].id`: Issue ID
- `[].fields.subtasks[].key`: Issue Key

### `assign_issue`

**Assign Issue.** Set the assignee of an existing Jira issue to a chosen user, replacing any current assignee. Use to route ownership of an issue; it changes only the assignee field, nothing else. Idempotent: assigning the same user again leaves the issue unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee` | string | yes |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |

### `add_issue_attachment`

**Add Attachment to Issue.** Upload a file as an attachment on an existing Jira issue, identified by project and issue. Use when a file (image, log, document) needs to be stored on the issue itself rather than referenced in a comment. Not idempotent: re-running uploads a duplicate copy of the same file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `attachment` | file | yes |  | Attachment. Files are not supported; an action that needs one fails. |

Output fields:

- `[].id`: Attachment ID
- `[].filename`: File Name
- `[].mimeType`: MIME Type
- `[].size`: Size (filesize)
- `[].content`: Content URL (url)
- `[].thumbnail`: Thumbnail URL (image)
- `[].created`: Created (datetime)
- `[].author`: Author
- `[].author.accountId`: Account ID
- `[].author.displayName`: Display Name
- `[].author.emailAddress`: Email (email)
- `[].author.active`: Active (boolean)
- `[].author.timeZone`: Time Zone
- `[].author.accountType`: Account Type

### `get-issue-attachment`

**Get Issue Attachment.** Download a Jira attachment by its attachment ID, fetching both its metadata and the file content itself for use in later steps. Use when you already have the attachment ID (e.g. from Get Issue) and need the actual file, not just a link. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachmentId` | string | yes |  | Attachment ID. |

Output fields:

- `id`: Attachment ID
- `filename`: File Name
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `content`: Content URL (url)
- `thumbnail`: Thumbnail URL (image)
- `created`: Created (datetime)
- `author`: Author
- `author.accountId`: Account ID
- `author.displayName`: Display Name
- `author.emailAddress`: Email (email)
- `author.active`: Active (boolean)
- `author.timeZone`: Time Zone
- `author.accountType`: Account Type
- `file`: File (url)

### `add-watcher-to-issue`

**Add Watcher to Issue.** Subscribe a specific user as a watcher on a Jira issue (by issue ID/key and user account) so they get notifications about its updates. Use to loop someone in without assigning or commenting. Effectively idempotent: adding a user who already watches the issue leaves it unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | yes |  | User. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `error`: Error

### `add_issue_comment`

**Add Issue Comment.** Post a new comment on an existing Jira issue. Accepts plain text by default, or raw Atlassian Document Format (ADF) JSON when the ADF flag is set — use the Markdown to Jira Format action to produce ADF from markdown. Not idempotent: each run appends another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment Body. |
| `isADF` | boolean | no | `false` | Comment is in JSON Atlassian Document Format. https://developer.atlassian.com/cloud/jira/platform/apis/document/structure. |

Output fields:

- `id`: Comment ID
- `author`: Author
- `author.accountId`: Account ID
- `author.displayName`: Display Name
- `author.emailAddress`: Email (email)
- `author.active`: Active (boolean)
- `author.timeZone`: Time Zone
- `author.accountType`: Account Type
- `updateAuthor`: Last Updated By
- `updateAuthor.accountId`: Account ID
- `updateAuthor.displayName`: Display Name
- `updateAuthor.emailAddress`: Email (email)
- `updateAuthor.active`: Active (boolean)
- `updateAuthor.timeZone`: Time Zone
- `updateAuthor.accountType`: Account Type
- `renderedBody`: Body (HTML) (html)
- `body`: Body (Atlassian Document Format)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `jsdPublic`: Public (boolean)

### `update_issue_comment`

**Update Issue Comment.** Replace the body of an existing comment (by comment ID) on a Jira issue, in plain text or raw ADF JSON when the ADF flag is set. Use to correct or extend an earlier comment instead of posting a new one with Add Issue Comment. Idempotent: re-running with the same body leaves the comment unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `commentId` | string | yes |  | Comment ID. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment Body. |
| `isADF` | boolean | no | `false` | Comment is in JSON Atlassian Document Format. https://developer.atlassian.com/cloud/jira/platform/apis/document/structure. |

Output fields:

- `id`: Comment ID
- `author`: Author
- `author.accountId`: Account ID
- `author.displayName`: Display Name
- `author.emailAddress`: Email (email)
- `author.active`: Active (boolean)
- `author.timeZone`: Time Zone
- `author.accountType`: Account Type
- `updateAuthor`: Last Updated By
- `updateAuthor.accountId`: Account ID
- `updateAuthor.displayName`: Display Name
- `updateAuthor.emailAddress`: Email (email)
- `updateAuthor.active`: Active (boolean)
- `updateAuthor.timeZone`: Time Zone
- `updateAuthor.accountType`: Account Type
- `renderedBody`: Body (HTML) (html)
- `body`: Body (Atlassian Document Format)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `jsdPublic`: Public (boolean)

### `link-issues`

**Link Issues.** Create a directional link of a chosen type (e.g. blocks, relates to, duplicates) between two existing Jira issues, given both issue IDs/keys. Use to express dependencies or relationships; direction matters, with the first issue taking the outward role. Not idempotent: re-running can add a duplicate link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstIssueId` | string | yes |  | First Issue. A value the product loads from the provider, such as an id; write the value itself. |
| `issueLinkTypeId` | string | yes |  | Link Type. A value the product loads from the provider, such as an id; write the value itself. |
| `secondIssueId` | string | yes |  | Second Issue. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message

### `list_issue_comments`

**List Issue Comments.** List comments on a Jira issue, ordered by creation date (ascending or descending) and capped at a configurable limit, including rendered HTML bodies. Use to read an issue's discussion before replying or summarizing. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `orderBy` | string | yes | `"-created"` | Order By. One of `"-created"`, `"+created"`. |
| `limit` | number | yes | `10` | Limit. Maximum number of results. |

Output fields:

- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].author`: Author
- `comments[].author.accountId`: Account ID
- `comments[].author.displayName`: Display Name
- `comments[].author.emailAddress`: Email (email)
- `comments[].author.active`: Active (boolean)
- `comments[].author.timeZone`: Time Zone
- `comments[].author.accountType`: Account Type
- `comments[].updateAuthor`: Last Updated By
- `comments[].updateAuthor.accountId`: Account ID
- `comments[].updateAuthor.displayName`: Display Name
- `comments[].updateAuthor.emailAddress`: Email (email)
- `comments[].updateAuthor.active`: Active (boolean)
- `comments[].updateAuthor.timeZone`: Time Zone
- `comments[].updateAuthor.accountType`: Account Type
- `comments[].renderedBody`: Body (HTML) (html)
- `comments[].body`: Body (Atlassian Document Format)
- `comments[].created`: Created (datetime)
- `comments[].updated`: Updated (datetime)
- `comments[].jsdPublic`: Public (boolean)
- `total`: Total (number)
- `startAt`: Start At (number)
- `maxResults`: Max Results (number)

### `delete_issue_comment`

**Delete Issue Comment.** Permanently remove a specific comment (by comment ID) from a Jira issue. Use to clean up an outdated or incorrect comment; the deletion cannot be undone. Idempotent in effect — the comment ends up gone either way — though a repeat call on an already-deleted comment returns a not-found error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `commentId` | string | yes |  | Comment ID. A value the product loads from the provider, such as an id; write the value itself. |

### `markdownToJiraFormat`

**Markdown to Jira format.** Convert markdown text into an Atlassian Document Format (ADF) JSON document, locally with no API call or auth needed. Use before Add/Update Issue Comment or rich-text issue fields whenever content is authored in markdown, since Jira Cloud rich text requires ADF. Pure transformation, fully idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `markdown` | string | yes |  | Markdown text. |

Output fields:

- `type`: Document Type
- `version`: Version (number)
- `content`: Content

### `get_issue`

**Get Issue.** Fetch a single Jira issue by project and issue, optionally expanding extras like rendered fields, transitions, edit metadata, or changelog, and optionally remapping cryptic field/transition IDs to human-readable names. Use when you know which issue you want; to find issues by criteria use Search Issues instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `expand` | array | no |  | Expand. Include additional information about the issue in the response. One of `"renderedFields"`, `"names"`, `"schema"`, `"transitions"`, `"editmeta"`, `"changelog"`. |
| `mapNames` | boolean | yes | `false` | Map Field Names. Map human readable names to Fields, Rendered Fields, Schema and Edit Meta. Notes: - This would implicitly add "names" to the expand field - If there are fields with the same name, they may be overridden. |
| `mapTransitions` | boolean | yes | `false` | Map Transition Names. Map human readable names to Transitions. Notes: - If there are transitions with the same name, they may be overridden - This changes the original data structure from list to map. |

Output fields:

- `id`: Issue ID
- `key`: Issue Key
- `self`: API URL (url)
- `fields`: Fields
- `fields.summary`: Summary
- `fields.status`: Status
- `fields.status.id`: Status ID
- `fields.status.name`: Status
- `fields.status.description`: Description
- `fields.status.statusCategory`: Status Category
- `fields.status.statusCategory.key`: Category Key
- `fields.status.statusCategory.name`: Category Name
- `fields.issuetype`: Issue Type
- `fields.issuetype.id`: Issue Type ID
- `fields.issuetype.name`: Issue Type
- `fields.issuetype.subtask`: Subtask (boolean)
- `fields.priority`: Priority
- `fields.priority.id`: Priority ID
- `fields.priority.name`: Priority
- `fields.project`: Project
- `fields.project.id`: Project ID
- `fields.project.key`: Project Key
- `fields.project.name`: Project Name
- `fields.assignee`: Assignee
- `fields.assignee.accountId`: Account ID
- `fields.assignee.displayName`: Display Name
- `fields.assignee.emailAddress`: Email (email)
- `fields.assignee.active`: Active (boolean)
- `fields.assignee.timeZone`: Time Zone
- `fields.assignee.accountType`: Account Type
- `fields.reporter`: Reporter
- `fields.reporter.accountId`: Account ID
- `fields.reporter.displayName`: Display Name
- `fields.reporter.emailAddress`: Email (email)
- `fields.reporter.active`: Active (boolean)
- `fields.reporter.timeZone`: Time Zone
- `fields.reporter.accountType`: Account Type
- `fields.creator`: Creator
- `fields.creator.accountId`: Account ID
- `fields.creator.displayName`: Display Name
- `fields.creator.emailAddress`: Email (email)
- `fields.creator.active`: Active (boolean)
- `fields.creator.timeZone`: Time Zone
- `fields.creator.accountType`: Account Type
- `fields.labels`: Labels
- `fields.created`: Created (datetime)
- `fields.updated`: Updated (datetime)
- `fields.duedate`: Due Date (date)
- `fields.resolutiondate`: Resolved (datetime)
- `fields.resolution`: Resolution
- `fields.resolution.id`: Resolution ID
- `fields.resolution.name`: Resolution
- `fields.parent`: Parent
- `fields.parent.id`: Parent ID
- `fields.parent.key`: Parent Key
- `fields.description`: Description (Atlassian Document Format)
- `fields.fixVersions`: Fix Versions
- `fields.fixVersions[].id`: Version ID
- `fields.fixVersions[].name`: Name
- `fields.fixVersions[].description`: Description
- `fields.fixVersions[].released`: Released (boolean)
- `fields.fixVersions[].archived`: Archived (boolean)
- `fields.fixVersions[].releaseDate`: Release Date (date)
- `fields.components`: Components
- `fields.attachment`: Attachments
- `fields.attachment[].id`: Attachment ID
- `fields.attachment[].filename`: File Name
- `fields.attachment[].mimeType`: MIME Type
- `fields.attachment[].size`: Size (filesize)
- `fields.attachment[].content`: Content URL (url)
- `fields.attachment[].thumbnail`: Thumbnail URL (image)
- `fields.attachment[].created`: Created (datetime)
- `fields.attachment[].author`: Author
- `fields.attachment[].author.accountId`: Account ID
- `fields.attachment[].author.displayName`: Display Name
- `fields.attachment[].author.emailAddress`: Email (email)
- `fields.attachment[].author.active`: Active (boolean)
- `fields.attachment[].author.timeZone`: Time Zone
- `fields.attachment[].author.accountType`: Account Type
- `fields.issuelinks`: Issue Links
- `fields.issuelinks[].id`: Link ID
- `fields.issuelinks[].type`: Link Type
- `fields.issuelinks[].type.name`: Name
- `fields.issuelinks[].type.inward`: Inward Description
- `fields.issuelinks[].type.outward`: Outward Description
- `fields.issuelinks[].inwardIssue`: Inward Issue
- `fields.issuelinks[].inwardIssue.key`: Issue Key
- `fields.issuelinks[].outwardIssue`: Outward Issue
- `fields.issuelinks[].outwardIssue.key`: Issue Key
- `fields.subtasks`: Subtasks
- `fields.subtasks[].id`: Issue ID
- `fields.subtasks[].key`: Issue Key

### `transition_issue`

**Transition Issue.** Execute a workflow transition on a Jira issue to move it to a new status (e.g. In Progress to Done), returning the refreshed issue. The transition must be valid from the issue's current status under its workflow, so it is not idempotent: re-running after the move succeeds fails because the transition is no longer available. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `issueId` | string | yes |  | Issue ID or Key. A value the product loads from the provider, such as an id; write the value itself. |
| `transitionId` | string | yes |  | Transition. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `issue`: Issue
- `issue.id`: Issue ID
- `issue.key`: Issue Key
- `issue.self`: API URL (url)
- `issue.fields`: Fields
- `issue.fields.summary`: Summary
- `issue.fields.status`: Status
- `issue.fields.status.id`: Status ID
- `issue.fields.status.name`: Status
- `issue.fields.status.description`: Description
- `issue.fields.status.statusCategory`: Status Category
- `issue.fields.status.statusCategory.key`: Category Key
- `issue.fields.status.statusCategory.name`: Category Name
- `issue.fields.issuetype`: Issue Type
- `issue.fields.issuetype.id`: Issue Type ID
- `issue.fields.issuetype.name`: Issue Type
- `issue.fields.issuetype.subtask`: Subtask (boolean)
- `issue.fields.priority`: Priority
- `issue.fields.priority.id`: Priority ID
- `issue.fields.priority.name`: Priority
- `issue.fields.project`: Project
- `issue.fields.project.id`: Project ID
- `issue.fields.project.key`: Project Key
- `issue.fields.project.name`: Project Name
- `issue.fields.assignee`: Assignee
- `issue.fields.assignee.accountId`: Account ID
- `issue.fields.assignee.displayName`: Display Name
- `issue.fields.assignee.emailAddress`: Email (email)
- `issue.fields.assignee.active`: Active (boolean)
- `issue.fields.assignee.timeZone`: Time Zone
- `issue.fields.assignee.accountType`: Account Type
- `issue.fields.reporter`: Reporter
- `issue.fields.reporter.accountId`: Account ID
- `issue.fields.reporter.displayName`: Display Name
- `issue.fields.reporter.emailAddress`: Email (email)
- `issue.fields.reporter.active`: Active (boolean)
- `issue.fields.reporter.timeZone`: Time Zone
- `issue.fields.reporter.accountType`: Account Type
- `issue.fields.creator`: Creator
- `issue.fields.creator.accountId`: Account ID
- `issue.fields.creator.displayName`: Display Name
- `issue.fields.creator.emailAddress`: Email (email)
- `issue.fields.creator.active`: Active (boolean)
- `issue.fields.creator.timeZone`: Time Zone
- `issue.fields.creator.accountType`: Account Type
- `issue.fields.labels`: Labels
- `issue.fields.created`: Created (datetime)
- `issue.fields.updated`: Updated (datetime)
- `issue.fields.duedate`: Due Date (date)
- `issue.fields.resolutiondate`: Resolved (datetime)
- `issue.fields.resolution`: Resolution
- `issue.fields.resolution.id`: Resolution ID
- `issue.fields.resolution.name`: Resolution
- `issue.fields.parent`: Parent
- `issue.fields.parent.id`: Parent ID
- `issue.fields.parent.key`: Parent Key
- `issue.fields.description`: Description (Atlassian Document Format)
- `issue.fields.fixVersions`: Fix Versions
- `issue.fields.fixVersions[].id`: Version ID
- `issue.fields.fixVersions[].name`: Name
- `issue.fields.fixVersions[].description`: Description
- `issue.fields.fixVersions[].released`: Released (boolean)
- `issue.fields.fixVersions[].archived`: Archived (boolean)
- `issue.fields.fixVersions[].releaseDate`: Release Date (date)
- `issue.fields.components`: Components
- `issue.fields.attachment`: Attachments
- `issue.fields.attachment[].id`: Attachment ID
- `issue.fields.attachment[].filename`: File Name
- `issue.fields.attachment[].mimeType`: MIME Type
- `issue.fields.attachment[].size`: Size (filesize)
- `issue.fields.attachment[].content`: Content URL (url)
- `issue.fields.attachment[].thumbnail`: Thumbnail URL (image)
- `issue.fields.attachment[].created`: Created (datetime)
- `issue.fields.attachment[].author`: Author
- `issue.fields.attachment[].author.accountId`: Account ID
- `issue.fields.attachment[].author.displayName`: Display Name
- `issue.fields.attachment[].author.emailAddress`: Email (email)
- `issue.fields.attachment[].author.active`: Active (boolean)
- `issue.fields.attachment[].author.timeZone`: Time Zone
- `issue.fields.attachment[].author.accountType`: Account Type
- `issue.fields.issuelinks`: Issue Links
- `issue.fields.issuelinks[].id`: Link ID
- `issue.fields.issuelinks[].type`: Link Type
- `issue.fields.issuelinks[].type.name`: Name
- `issue.fields.issuelinks[].type.inward`: Inward Description
- `issue.fields.issuelinks[].type.outward`: Outward Description
- `issue.fields.issuelinks[].inwardIssue`: Inward Issue
- `issue.fields.issuelinks[].inwardIssue.key`: Issue Key
- `issue.fields.issuelinks[].outwardIssue`: Outward Issue
- `issue.fields.issuelinks[].outwardIssue.key`: Issue Key
- `issue.fields.subtasks`: Subtasks
- `issue.fields.subtasks[].id`: Issue ID
- `issue.fields.subtasks[].key`: Issue Key

### `add_comment`

**Add Comment.** Post a new comment on an issue. The text is written in markdown and converted to Jira rich text automatically, so no separate conversion step is needed. Not idempotent: each call adds another comment, so check List Comments before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `comment` | string | yes |  | Comment. The comment text. Markdown is supported and converted to Atlassian Document Format. |

Output fields:

- `id`: Comment ID
- `author`: Author
- `author.accountId`: Account ID
- `author.displayName`: Display Name
- `author.emailAddress`: Email (email)
- `author.active`: Active (boolean)
- `author.timeZone`: Time Zone
- `author.accountType`: Account Type
- `updateAuthor`: Last Updated By
- `updateAuthor.accountId`: Account ID
- `updateAuthor.displayName`: Display Name
- `updateAuthor.emailAddress`: Email (email)
- `updateAuthor.active`: Active (boolean)
- `updateAuthor.timeZone`: Time Zone
- `updateAuthor.accountType`: Account Type
- `renderedBody`: Body (HTML) (html)
- `body`: Body (Atlassian Document Format)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `jsdPublic`: Public (boolean)

### `add_watcher`

**Add Watcher.** Add one user, by account ID, to the watcher list of an issue so they get its notifications. Adding someone other than yourself needs the Manage watcher list permission. Idempotent: adding an existing watcher changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `accountId` | string | yes |  | Account ID. The Atlassian account ID of the user. Resolve it with Find Users or Get Current User. |

Output fields:

- `success`: Success (boolean)
- `issue`: Issue
- `account_id`: Account ID

### `add_worklog`

**Add Worklog.** Log time spent on an issue as a worklog entry, with an optional start time and comment, adjusting the remaining estimate automatically unless told otherwise. Time tracking must be enabled on the site. Not idempotent: each call adds another entry, so use Get Worklogs to check before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `timeSpent` | string | yes |  | Time Spent. Time spent in Jira duration format, e.g. 3h 20m, 1d, 45m. |
| `started` | ISO date-time string | no |  | Started. When the work started (ISO 8601). Defaults to now. |
| `comment` | string | no |  | Comment. Optional description of the work done. Markdown is supported and converted to Atlassian Document Format. |
| `adjustEstimate` | string | no |  | Adjust Remaining Estimate. How to update the remaining estimate. Defaults to auto (reduce by the time spent). One of `"auto"`, `"leave"`, `"new"`, `"manual"`. |
| `newEstimate` | string | no |  | New Estimate. New remaining estimate, e.g. 2d. Required when Adjust Remaining Estimate is Set to New Estimate. |
| `reduceBy` | string | no |  | Reduce By. Amount to reduce the remaining estimate by, e.g. 2h. Required when Adjust Remaining Estimate is Reduce by Reduce By. |

Output fields:

- `id`: Worklog ID
- `issueId`: Issue ID
- `timeSpent`: Time Spent
- `timeSpentSeconds`: Time Spent (Seconds) (number)
- `started`: Started (datetime)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `author`: Author
- `author.accountId`: Account ID
- `author.displayName`: Display Name
- `author.emailAddress`: Email (email)
- `author.active`: Active (boolean)
- `author.timeZone`: Time Zone
- `author.accountType`: Account Type
- `comment`: Comment (Atlassian Document Format)

### `assign_issue_to_user`

**Assign Issue to User.** Assign an issue to a user by account ID, or unassign it by leaving the account ID empty. Resolve a name or email to an account ID with Find Users, or use Get Current User for yourself. The user must be assignable in the project. Idempotent: assigning the same user again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `accountId` | string | no |  | Assignee Account ID. Account ID of the new assignee. Leave empty to unassign the issue. |

Output fields:

- `success`: Success (boolean)
- `issue`: Issue
- `assignee_account_id`: Assignee Account ID

### `bulk_create_issues`

**Bulk Create Issues.** Create up to 50 issues in one project in a single request, each with its own summary, issue type and optional fields. Use it instead of repeated Create Issue with Fields calls when adding many issues; failures are reported per issue while the rest are still created. Not idempotent: each run creates new issues. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIdOrKey` | string | yes |  | Project ID or Key. The project key (e.g. PROJ) or numeric project ID that every issue is created in. Find it with List Projects. |
| `issues` | JSON | yes |  | Issues. JSON array (1-50 items). Each item: {"summary": string, "issueTypeId": string, "description"?: markdown string, "assigneeAccountId"?: string, "priorityId"?: string, "labels"?: string[], "parentKey"?: string, "dueDate"?: "YYYY-MM-DD", "fields"?: object of extra field IDs to values}. Issue type IDs c… |

Output fields:

- `issues`: Created Issues
- `issues[].id`: Issue ID
- `issues[].key`: Issue Key
- `issues[].self`: API URL (url)
- `errors`: Errors
- `created_count`: Created (number)
- `failed_count`: Failed (number)

### `bulk_get_issues`

**Bulk Get Issues.** Fetch up to 100 known issues by key or ID in a single request, optionally limiting the returned fields. Use it when you already hold a list of issue keys; to find issues by criteria use Search Issues by JQL. Keys that do not exist or are not visible are left out of issues without an error, so compare the returned keys with the requested ones. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdsOrKeys` | array | yes |  | Issue IDs or Keys. Up to 100 issue keys (e.g. PROJ-123) or numeric issue IDs. |
| `fields` | array | no |  | Fields. Field IDs to return, e.g. summary, status, assignee, customfield_10016. Leave empty for all navigable fields. |

Output fields:

- `issues`: Issues
- `issues[].id`: Issue ID
- `issues[].key`: Issue Key
- `issues[].self`: API URL (url)
- `issues[].fields`: Fields
- `issues[].fields.summary`: Summary
- `issues[].fields.status`: Status
- `issues[].fields.status.id`: Status ID
- `issues[].fields.status.name`: Status
- `issues[].fields.status.description`: Description
- `issues[].fields.status.statusCategory`: Status Category
- `issues[].fields.status.statusCategory.key`: Category Key
- `issues[].fields.status.statusCategory.name`: Category Name
- `issues[].fields.issuetype`: Issue Type
- `issues[].fields.issuetype.id`: Issue Type ID
- `issues[].fields.issuetype.name`: Issue Type
- `issues[].fields.issuetype.subtask`: Subtask (boolean)
- `issues[].fields.priority`: Priority
- `issues[].fields.priority.id`: Priority ID
- `issues[].fields.priority.name`: Priority
- `issues[].fields.project`: Project
- `issues[].fields.project.id`: Project ID
- `issues[].fields.project.key`: Project Key
- `issues[].fields.project.name`: Project Name
- `issues[].fields.assignee`: Assignee
- `issues[].fields.assignee.accountId`: Account ID
- `issues[].fields.assignee.displayName`: Display Name
- `issues[].fields.assignee.emailAddress`: Email (email)
- `issues[].fields.assignee.active`: Active (boolean)
- `issues[].fields.assignee.timeZone`: Time Zone
- `issues[].fields.assignee.accountType`: Account Type
- `issues[].fields.reporter`: Reporter
- `issues[].fields.reporter.accountId`: Account ID
- `issues[].fields.reporter.displayName`: Display Name
- `issues[].fields.reporter.emailAddress`: Email (email)
- `issues[].fields.reporter.active`: Active (boolean)
- `issues[].fields.reporter.timeZone`: Time Zone
- `issues[].fields.reporter.accountType`: Account Type
- `issues[].fields.creator`: Creator
- `issues[].fields.creator.accountId`: Account ID
- `issues[].fields.creator.displayName`: Display Name
- `issues[].fields.creator.emailAddress`: Email (email)
- `issues[].fields.creator.active`: Active (boolean)
- `issues[].fields.creator.timeZone`: Time Zone
- `issues[].fields.creator.accountType`: Account Type
- `issues[].fields.labels`: Labels
- `issues[].fields.created`: Created (datetime)
- `issues[].fields.updated`: Updated (datetime)
- `issues[].fields.duedate`: Due Date (date)
- `issues[].fields.resolutiondate`: Resolved (datetime)
- `issues[].fields.resolution`: Resolution
- `issues[].fields.resolution.id`: Resolution ID
- `issues[].fields.resolution.name`: Resolution
- `issues[].fields.parent`: Parent
- `issues[].fields.parent.id`: Parent ID
- `issues[].fields.parent.key`: Parent Key
- `issues[].fields.description`: Description (Atlassian Document Format)
- `issues[].fields.fixVersions`: Fix Versions
- `issues[].fields.fixVersions[].id`: Version ID
- `issues[].fields.fixVersions[].name`: Name
- `issues[].fields.fixVersions[].description`: Description
- `issues[].fields.fixVersions[].released`: Released (boolean)
- `issues[].fields.fixVersions[].archived`: Archived (boolean)
- `issues[].fields.fixVersions[].releaseDate`: Release Date (date)
- `issues[].fields.components`: Components
- `issues[].fields.attachment`: Attachments
- `issues[].fields.attachment[].id`: Attachment ID
- `issues[].fields.attachment[].filename`: File Name
- `issues[].fields.attachment[].mimeType`: MIME Type
- `issues[].fields.attachment[].size`: Size (filesize)
- `issues[].fields.attachment[].content`: Content URL (url)
- `issues[].fields.attachment[].thumbnail`: Thumbnail URL (image)
- `issues[].fields.attachment[].created`: Created (datetime)
- `issues[].fields.attachment[].author`: Author
- `issues[].fields.attachment[].author.accountId`: Account ID
- `issues[].fields.attachment[].author.displayName`: Display Name
- `issues[].fields.attachment[].author.emailAddress`: Email (email)
- `issues[].fields.attachment[].author.active`: Active (boolean)
- `issues[].fields.attachment[].author.timeZone`: Time Zone
- `issues[].fields.attachment[].author.accountType`: Account Type
- `issues[].fields.issuelinks`: Issue Links
- `issues[].fields.issuelinks[].id`: Link ID
- `issues[].fields.issuelinks[].type`: Link Type
- `issues[].fields.issuelinks[].type.name`: Name
- `issues[].fields.issuelinks[].type.inward`: Inward Description
- `issues[].fields.issuelinks[].type.outward`: Outward Description
- `issues[].fields.issuelinks[].inwardIssue`: Inward Issue
- `issues[].fields.issuelinks[].inwardIssue.key`: Issue Key
- `issues[].fields.issuelinks[].outwardIssue`: Outward Issue
- `issues[].fields.issuelinks[].outwardIssue.key`: Issue Key
- `issues[].fields.subtasks`: Subtasks
- `issues[].fields.subtasks[].id`: Issue ID
- `issues[].fields.subtasks[].key`: Issue Key
- `issue_errors`: Issue Errors
- `count`: Returned (number)

### `count_issues`

**Count Issues.** Return an approximate count of the issues matching a JQL query without fetching them. Use it for totals and reporting; to read the issues use Search Issues by JQL. The JQL must be bounded by at least one restriction such as a project, assignee or date clause, otherwise Jira rejects it. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jql` | string | yes |  | JQL. A bounded JQL query, e.g. project = PROJ AND status = "In Progress". |

Output fields:

- `count`: Approximate Count (number)
- `jql`: JQL

### `create_board`

**Create Board.** Create a Scrum or Kanban board whose issues come from an existing saved filter, optionally placing it in a project. The filter ID comes from Search Filters, and the user must be able to see that filter. Requires Jira Software. Not idempotent: each call creates another board. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `type` | string | yes |  | Board Type. One of `"scrum"`, `"kanban"`. |
| `filterId` | number | yes |  | Filter ID. ID of the saved filter that selects the board issues. Find it with Search Filters. |
| `projectKeyOrId` | string | no |  | Project ID or Key. Project to place the board in. Leave empty to create it in the user profile. |

Output fields:

- `id`: Board ID
- `name`: Name
- `type`: Type

### `create_issue_link`

**Create Issue Link.** Link two issues with a named link type such as Blocks, Relates or Duplicates, with an optional comment on the inward issue. Direction matters: the outward issue gets the outward wording (e.g. "blocks") and the inward issue the inward wording (e.g. "is blocked by"); get valid names and wording from Get Issue Link Types. Not idempotent: Jira may add a duplicate link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkTypeName` | string | yes |  | Link Type Name. Name of the link type, e.g. Blocks. Find it with Get Issue Link Types. |
| `outwardIssueKey` | string | yes |  | Outward Issue Key. The issue on the outward side, e.g. the issue that blocks the other one. |
| `inwardIssueKey` | string | yes |  | Inward Issue Key. The issue on the inward side, e.g. the issue that is blocked. |
| `comment` | string | no |  | Comment. Optional comment added to the inward issue. Markdown is supported and converted to Atlassian Document Format. |

Output fields:

- `success`: Success (boolean)
- `link_type`: Link Type
- `outward_issue`: Outward Issue
- `inward_issue`: Inward Issue

### `create_issue_with_fields`

**Create Issue with Fields.** Create one issue in a project with a summary, issue type and optional description, assignee, priority, labels, parent, due date and any custom fields by field ID. Get the issue type ID from Get Issue Types and the required custom fields from Get Issue Type Create Fields; for many issues at once use Bulk Create Issues. Not idempotent: each call creates a new issue. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIdOrKey` | string | yes |  | Project ID or Key. The project key (e.g. PROJ) or numeric project ID. Find it with List Projects. |
| `issueTypeId` | string | yes |  | Issue Type ID. The numeric issue type ID. Find it with Get Issue Types. |
| `summary` | string | yes |  | Summary. |
| `description` | string | no |  | Description. Issue description. Markdown is supported and converted to Atlassian Document Format. |
| `assigneeAccountId` | string | no |  | Assignee Account ID. Account ID of the assignee. Resolve it with Find Users. |
| `priorityId` | string | no |  | Priority ID. The priority ID. Find it with Get Priorities. |
| `labels` | array | no |  | Labels. Labels to add. Labels cannot contain spaces. |
| `parentKey` | string | no |  | Parent Issue Key. Key of the parent issue or epic. Required when the issue type is a subtask. |
| `dueDate` | string | no |  | Due Date. Due date in YYYY-MM-DD format. |
| `fields` | JSON | no |  | Additional Fields. JSON object of other field IDs to values in Jira REST format, e.g. {"customfield_10016": 5, "components": [{"id": "10000"}], "fixVersions": [{"id": "10001"}]}. Field IDs come from Get Fields or Get Issue Type Create Fields. |

Output fields:

- `id`: Issue ID
- `key`: Issue Key
- `self`: API URL (url)
- `browse_url`: Issue URL (url)

### `create_sprint`

**Create Sprint.** Create a sprint on a Scrum board with optional start date, end date and goal. The sprint is always created in the future state; starting it is done in Jira. Board IDs come from List Boards. Not idempotent: each call creates another sprint. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `originBoardId` | number | yes |  | Board ID. The numeric ID of the Scrum board. Find it with List Boards. |
| `startDate` | ISO date-time string | no |  | Start Date. Planned start (ISO 8601). |
| `endDate` | ISO date-time string | no |  | End Date. Planned end (ISO 8601). |
| `goal` | string | no |  | Goal. |

Output fields:

- `id`: Sprint ID
- `name`: Name
- `state`: State
- `goal`: Goal
- `startDate`: Start Date (datetime)
- `endDate`: End Date (datetime)
- `completeDate`: Completed (datetime)
- `createdDate`: Created (datetime)
- `originBoardId`: Board ID

### `delete_attachment`

**Delete Attachment.** Permanently delete an attachment from its issue by attachment ID. This cannot be undone, so confirm with the user first. Attachment IDs are in the attachment field of Fetch Issue. Not idempotent: a retry returns not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachmentId` | string | yes |  | Attachment ID. The numeric attachment ID, from the attachment field of Fetch Issue. |

Output fields:

- `success`: Success (boolean)
- `attachment_id`: Attachment ID
- `deleted`: Deleted (boolean)

### `delete_comment`

**Delete Comment.** Permanently delete one comment from an issue. This cannot be undone; to change the text use Update Comment instead. Comment IDs come from List Comments. Not idempotent: a retry returns not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `commentId` | string | yes |  | Comment ID. The numeric comment ID. Find it with List Comments. |

Output fields:

- `success`: Success (boolean)
- `issue`: Issue
- `comment_id`: Comment ID
- `deleted`: Deleted (boolean)

### `delete_issue`

**Delete Issue.** Permanently delete a Jira issue and, if requested, its subtasks. This cannot be undone, so confirm with the user first; to close an issue instead, use Transition Issue Status. Fails when the issue has subtasks and Delete Subtasks is off. Not idempotent: a retry returns not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `deleteSubtasks` | boolean | no | `false` | Delete Subtasks. Also delete the subtasks of the issue. Required when the issue has subtasks. |

Output fields:

- `success`: Success (boolean)
- `issue`: Issue
- `deleted`: Deleted (boolean)

### `delete_worklog`

**Delete Worklog.** Permanently delete one worklog entry from an issue, restoring the logged time to the remaining estimate automatically unless told otherwise. Worklog IDs come from Get Worklogs. Not idempotent: a retry returns not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `worklogId` | string | yes |  | Worklog ID. The numeric worklog ID. Find it with Get Worklogs. |
| `adjustEstimate` | string | no |  | Adjust Remaining Estimate. How to update the remaining estimate. Defaults to auto (increase by the deleted time). One of `"auto"`, `"leave"`, `"new"`, `"manual"`. |
| `newEstimate` | string | no |  | New Estimate. New remaining estimate, e.g. 2d. Required when Adjust Remaining Estimate is Set to New Estimate. |
| `increaseBy` | string | no |  | Increase By. Amount to increase the remaining estimate by, e.g. 2h. Required when Adjust Remaining Estimate is Increase by Increase By. |

Output fields:

- `success`: Success (boolean)
- `issue`: Issue
- `worklog_id`: Worklog ID
- `deleted`: Deleted (boolean)

### `download_attachment`

**Download Attachment.** Download an attachment by attachment ID and return its file together with its name, MIME type, size, author and creation date. Attachment IDs are in the attachment field of Fetch Issue. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachmentId` | string | yes |  | Attachment ID. The numeric attachment ID, from the attachment field of Fetch Issue. |

Output fields:

- `id`: Attachment ID
- `filename`: File Name
- `mime_type`: MIME Type
- `size`: Size (filesize)
- `created`: Created (datetime)
- `author_account_id`: Author Account ID
- `author_display_name`: Author
- `file`: File (url)

### `edit_issue`

**Edit Issue.** Update selected fields of an existing issue: summary, description, assignee, priority, labels, parent, due date, issue type or any field by ID. Only the fields you supply change; everything else is left alone, and labels replace the current list. Status is not a field, use Transition Issue Status for that. Idempotent: applying the same values again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `summary` | string | no |  | Summary. |
| `description` | string | no |  | Description. New issue description, replacing the current one. Markdown is supported and converted to Atlassian Document Format. |
| `assigneeAccountId` | string | no |  | Assignee Account ID. Account ID of the new assignee. Resolve it with Find Users; to unassign use Assign Issue to User. |
| `priorityId` | string | no |  | Priority ID. The priority ID. Find it with Get Priorities. |
| `labels` | array | no |  | Labels. Labels that replace the current labels. Pass an empty list to remove all labels. Labels cannot contain spaces. |
| `parentKey` | string | no |  | Parent Issue Key. Key of the new parent issue or epic. |
| `dueDate` | string | no |  | Due Date. Due date in YYYY-MM-DD format. |
| `issueTypeId` | string | no |  | Issue Type ID. New issue type ID. Find it with Get Issue Types. |
| `fields` | JSON | no |  | Additional Fields. JSON object of other field IDs to values in Jira REST format, e.g. {"customfield_10016": 8}. Set a field to null to clear it. Editable field IDs come from Get Issue Edit Metadata. |
| `notifyUsers` | boolean | no | `true` | Notify Watchers. Send the usual update email to watchers. Turning it off needs admin rights. |

Output fields:

- `id`: Issue ID
- `key`: Issue Key
- `self`: API URL (url)
- `fields`: Fields
- `fields.summary`: Summary
- `fields.status`: Status
- `fields.status.id`: Status ID
- `fields.status.name`: Status
- `fields.status.description`: Description
- `fields.status.statusCategory`: Status Category
- `fields.status.statusCategory.key`: Category Key
- `fields.status.statusCategory.name`: Category Name
- `fields.issuetype`: Issue Type
- `fields.issuetype.id`: Issue Type ID
- `fields.issuetype.name`: Issue Type
- `fields.issuetype.subtask`: Subtask (boolean)
- `fields.priority`: Priority
- `fields.priority.id`: Priority ID
- `fields.priority.name`: Priority
- `fields.project`: Project
- `fields.project.id`: Project ID
- `fields.project.key`: Project Key
- `fields.project.name`: Project Name
- `fields.assignee`: Assignee
- `fields.assignee.accountId`: Account ID
- `fields.assignee.displayName`: Display Name
- `fields.assignee.emailAddress`: Email (email)
- `fields.assignee.active`: Active (boolean)
- `fields.assignee.timeZone`: Time Zone
- `fields.assignee.accountType`: Account Type
- `fields.reporter`: Reporter
- `fields.reporter.accountId`: Account ID
- `fields.reporter.displayName`: Display Name
- `fields.reporter.emailAddress`: Email (email)
- `fields.reporter.active`: Active (boolean)
- `fields.reporter.timeZone`: Time Zone
- `fields.reporter.accountType`: Account Type
- `fields.creator`: Creator
- `fields.creator.accountId`: Account ID
- `fields.creator.displayName`: Display Name
- `fields.creator.emailAddress`: Email (email)
- `fields.creator.active`: Active (boolean)
- `fields.creator.timeZone`: Time Zone
- `fields.creator.accountType`: Account Type
- `fields.labels`: Labels
- `fields.created`: Created (datetime)
- `fields.updated`: Updated (datetime)
- `fields.duedate`: Due Date (date)
- `fields.resolutiondate`: Resolved (datetime)
- `fields.resolution`: Resolution
- `fields.resolution.id`: Resolution ID
- `fields.resolution.name`: Resolution
- `fields.parent`: Parent
- `fields.parent.id`: Parent ID
- `fields.parent.key`: Parent Key
- `fields.description`: Description (Atlassian Document Format)
- `fields.fixVersions`: Fix Versions
- `fields.fixVersions[].id`: Version ID
- `fields.fixVersions[].name`: Name
- `fields.fixVersions[].description`: Description
- `fields.fixVersions[].released`: Released (boolean)
- `fields.fixVersions[].archived`: Archived (boolean)
- `fields.fixVersions[].releaseDate`: Release Date (date)
- `fields.components`: Components
- `fields.attachment`: Attachments
- `fields.attachment[].id`: Attachment ID
- `fields.attachment[].filename`: File Name
- `fields.attachment[].mimeType`: MIME Type
- `fields.attachment[].size`: Size (filesize)
- `fields.attachment[].content`: Content URL (url)
- `fields.attachment[].thumbnail`: Thumbnail URL (image)
- `fields.attachment[].created`: Created (datetime)
- `fields.attachment[].author`: Author
- `fields.attachment[].author.accountId`: Account ID
- `fields.attachment[].author.displayName`: Display Name
- `fields.attachment[].author.emailAddress`: Email (email)
- `fields.attachment[].author.active`: Active (boolean)
- `fields.attachment[].author.timeZone`: Time Zone
- `fields.attachment[].author.accountType`: Account Type
- `fields.issuelinks`: Issue Links
- `fields.issuelinks[].id`: Link ID
- `fields.issuelinks[].type`: Link Type
- `fields.issuelinks[].type.name`: Name
- `fields.issuelinks[].type.inward`: Inward Description
- `fields.issuelinks[].type.outward`: Outward Description
- `fields.issuelinks[].inwardIssue`: Inward Issue
- `fields.issuelinks[].inwardIssue.key`: Issue Key
- `fields.issuelinks[].outwardIssue`: Outward Issue
- `fields.issuelinks[].outwardIssue.key`: Issue Key
- `fields.subtasks`: Subtasks
- `fields.subtasks[].id`: Issue ID
- `fields.subtasks[].key`: Issue Key

### `fetch_issue`

**Fetch Issue.** Fetch one issue by key or ID with its fields (status, assignee, priority, description, attachments, issue links, custom fields), optionally limited to chosen fields and expanded with rendered HTML, field names, transitions or changelog. Use it when you know the issue; to find issues by criteria use Search Issues by JQL. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `fields` | array | no |  | Fields. Field IDs to return, e.g. summary, status, customfield_10016. Leave empty for all fields. |
| `expand` | array | no |  | Expand. One of `"renderedFields"`, `"names"`, `"transitions"`, `"changelog"`. |

Output fields:

- `id`: Issue ID
- `key`: Issue Key
- `self`: API URL (url)
- `fields`: Fields
- `fields.summary`: Summary
- `fields.status`: Status
- `fields.status.id`: Status ID
- `fields.status.name`: Status
- `fields.status.description`: Description
- `fields.status.statusCategory`: Status Category
- `fields.status.statusCategory.key`: Category Key
- `fields.status.statusCategory.name`: Category Name
- `fields.issuetype`: Issue Type
- `fields.issuetype.id`: Issue Type ID
- `fields.issuetype.name`: Issue Type
- `fields.issuetype.subtask`: Subtask (boolean)
- `fields.priority`: Priority
- `fields.priority.id`: Priority ID
- `fields.priority.name`: Priority
- `fields.project`: Project
- `fields.project.id`: Project ID
- `fields.project.key`: Project Key
- `fields.project.name`: Project Name
- `fields.assignee`: Assignee
- `fields.assignee.accountId`: Account ID
- `fields.assignee.displayName`: Display Name
- `fields.assignee.emailAddress`: Email (email)
- `fields.assignee.active`: Active (boolean)
- `fields.assignee.timeZone`: Time Zone
- `fields.assignee.accountType`: Account Type
- `fields.reporter`: Reporter
- `fields.reporter.accountId`: Account ID
- `fields.reporter.displayName`: Display Name
- `fields.reporter.emailAddress`: Email (email)
- `fields.reporter.active`: Active (boolean)
- `fields.reporter.timeZone`: Time Zone
- `fields.reporter.accountType`: Account Type
- `fields.creator`: Creator
- `fields.creator.accountId`: Account ID
- `fields.creator.displayName`: Display Name
- `fields.creator.emailAddress`: Email (email)
- `fields.creator.active`: Active (boolean)
- `fields.creator.timeZone`: Time Zone
- `fields.creator.accountType`: Account Type
- `fields.labels`: Labels
- `fields.created`: Created (datetime)
- `fields.updated`: Updated (datetime)
- `fields.duedate`: Due Date (date)
- `fields.resolutiondate`: Resolved (datetime)
- `fields.resolution`: Resolution
- `fields.resolution.id`: Resolution ID
- `fields.resolution.name`: Resolution
- `fields.parent`: Parent
- `fields.parent.id`: Parent ID
- `fields.parent.key`: Parent Key
- `fields.description`: Description (Atlassian Document Format)
- `fields.fixVersions`: Fix Versions
- `fields.fixVersions[].id`: Version ID
- `fields.fixVersions[].name`: Name
- `fields.fixVersions[].description`: Description
- `fields.fixVersions[].released`: Released (boolean)
- `fields.fixVersions[].archived`: Archived (boolean)
- `fields.fixVersions[].releaseDate`: Release Date (date)
- `fields.components`: Components
- `fields.attachment`: Attachments
- `fields.attachment[].id`: Attachment ID
- `fields.attachment[].filename`: File Name
- `fields.attachment[].mimeType`: MIME Type
- `fields.attachment[].size`: Size (filesize)
- `fields.attachment[].content`: Content URL (url)
- `fields.attachment[].thumbnail`: Thumbnail URL (image)
- `fields.attachment[].created`: Created (datetime)
- `fields.attachment[].author`: Author
- `fields.attachment[].author.accountId`: Account ID
- `fields.attachment[].author.displayName`: Display Name
- `fields.attachment[].author.emailAddress`: Email (email)
- `fields.attachment[].author.active`: Active (boolean)
- `fields.attachment[].author.timeZone`: Time Zone
- `fields.attachment[].author.accountType`: Account Type
- `fields.issuelinks`: Issue Links
- `fields.issuelinks[].id`: Link ID
- `fields.issuelinks[].type`: Link Type
- `fields.issuelinks[].type.name`: Name
- `fields.issuelinks[].type.inward`: Inward Description
- `fields.issuelinks[].type.outward`: Outward Description
- `fields.issuelinks[].inwardIssue`: Inward Issue
- `fields.issuelinks[].inwardIssue.key`: Issue Key
- `fields.issuelinks[].outwardIssue`: Outward Issue
- `fields.issuelinks[].outwardIssue.key`: Issue Key
- `fields.subtasks`: Subtasks
- `fields.subtasks[].id`: Issue ID
- `fields.subtasks[].key`: Issue Key

### `find_users`

**Find Users.** Find users whose display name or email address matches a query, returning their account IDs, display names, active status and email when visible. The way to turn a person's name or email into the account ID that assign, watcher and notification actions need. Email matching depends on site privacy settings. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Text matched against display name and email address, e.g. jane or jane@example.com. |
| `includeInactive` | boolean | no | `false` | Include Inactive Users. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page (up to 1000). |

Output fields:

- `items`: Users
- `items[].accountId`: Account ID
- `items[].displayName`: Display Name
- `items[].emailAddress`: Email (email)
- `items[].active`: Active (boolean)
- `items[].timeZone`: Time Zone
- `items[].accountType`: Account Type
- `count`: Returned (number)

### `get_comment`

**Get Comment.** Fetch one comment on an issue by its comment ID, including author, timestamps, visibility and the body as Atlassian Document Format plus rendered HTML. Use List Comments to discover comment IDs. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `commentId` | string | yes |  | Comment ID. The numeric comment ID. Find it with List Comments. |

Output fields:

- `id`: Comment ID
- `author`: Author
- `author.accountId`: Account ID
- `author.displayName`: Display Name
- `author.emailAddress`: Email (email)
- `author.active`: Active (boolean)
- `author.timeZone`: Time Zone
- `author.accountType`: Account Type
- `updateAuthor`: Last Updated By
- `updateAuthor.accountId`: Account ID
- `updateAuthor.displayName`: Display Name
- `updateAuthor.emailAddress`: Email (email)
- `updateAuthor.active`: Active (boolean)
- `updateAuthor.timeZone`: Time Zone
- `updateAuthor.accountType`: Account Type
- `renderedBody`: Body (HTML) (html)
- `body`: Body (Atlassian Document Format)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `jsdPublic`: Public (boolean)

### `get_current_user`

**Get Current User.** Return the Jira user the connection is authenticated as, including account ID, display name, email (when visible), time zone and groups. Use it to get your own account ID for "assigned to me" requests or for Assign Issue to User. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `accountId`: Account ID
- `displayName`: Display Name
- `emailAddress`: Email (email)
- `active`: Active (boolean)
- `timeZone`: Time Zone
- `accountType`: Account Type
- `locale`: Locale
- `groups`: Groups
- `groups.size`: Group Count (number)
- `groups.items`: Groups
- `groups.items[].name`: Name
- `groups.items[].groupId`: Group ID

### `get_favorite_filters`

**Get Favorite Filters.** List the saved filters the connected user has starred as favourites, with each filter ID, name and JQL. A quick way to find the searches the user relies on; use Search Filters to search all visible filters. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Filters
- `items[].id`: Filter ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].jql`: JQL
- `items[].viewUrl`: View URL (url)
- `items[].favourite`: Favourite (boolean)
- `items[].owner`: Owner
- `items[].owner.accountId`: Account ID
- `items[].owner.displayName`: Display Name
- `count`: Returned (number)

### `get_fields`

**Get Fields.** List every system and custom issue field with its ID (e.g. customfield_10016), name and schema type. Use it to translate a field name into the ID that Create Issue, Edit Issue and JQL need; for the fields allowed on one project and issue type use Get Issue Type Create Fields instead. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `nameContains` | string | no |  | Name Contains. Only return fields whose name contains this text (case-insensitive). |
| `customOnly` | boolean | no | `false` | Custom Fields Only. Only return custom fields. |

Output fields:

- `items`: Fields
- `items[].id`: Field ID
- `items[].name`: Name
- `items[].custom`: Custom (boolean)
- `items[].searchable`: Searchable (boolean)
- `items[].clauseNames`: JQL Names
- `items[].schema`: Schema
- `items[].schema.type`: Type
- `items[].schema.items`: Item Type
- `items[].schema.custom`: Custom Type
- `count`: Returned (number)

### `get_filter`

**Get Filter.** Fetch one saved filter by ID, including its name, owner, JQL, sharing permissions and view URL. Use it to reuse the filter JQL in Search Issues by JQL or Count Issues. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filterId` | string | yes |  | Filter ID. The numeric filter ID. Find it with Search Filters or Get Favorite Filters. |

Output fields:

- `id`: Filter ID
- `name`: Name
- `description`: Description
- `jql`: JQL
- `viewUrl`: View URL (url)
- `favourite`: Favourite (boolean)
- `owner`: Owner
- `owner.accountId`: Account ID
- `owner.displayName`: Display Name
- `searchUrl`: Search API URL (url)
- `favouritedCount`: Favourited By (number)

### `get_issue_edit_metadata`

**Get Issue Edit Metadata.** List the fields that can be edited on one existing issue, keyed by field ID, with each field schema, allowed operations and allowed values. Call it before Edit Issue to learn which fields and option IDs the issue accepts. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |

Output fields:

- `fields`: Editable Fields (an object whose keys vary)
- `fields.name`: Name
- `fields.required`: Required (boolean)
- `fields.operations`: Operations
- `fields.allowedValues`: Allowed Values

### `get_issue_link_types`

**Get Issue Link Types.** List the issue link types configured on the site (e.g. Blocks, Relates, Duplicates), each with its name and inward/outward wording. Call it before Create Issue Link to pick a valid link type name and the correct direction. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Link Types
- `items[].id`: Link Type ID
- `items[].name`: Name
- `items[].inward`: Inward Description
- `items[].outward`: Outward Description
- `count`: Returned (number)

### `get_issue_resolutions`

**Get Issue Resolutions.** List the issue resolutions configured on the site (e.g. Done, Won't Do, Duplicate) with their IDs. Use it to find the resolution ID a transition screen requires when closing an issue with Transition Issue Status. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page. |

Output fields:

- `items`: Resolutions
- `items[].id`: Resolution ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].isDefault`: Default (boolean)
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `get_issue_transitions`

**Get Issue Transitions.** List the workflow transitions the connected user can perform on an issue from its current status, each with its numeric ID, name and target status. Call it before Transition Issue Status, which needs the numeric transition ID rather than a status name. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `includeFields` | boolean | no | `false` | Include Transition Screen Fields. Also return the fields shown on each transition screen, such as a required resolution. |

Output fields:

- `items`: Transitions
- `items[].id`: Transition ID
- `items[].name`: Name
- `items[].to`: Target Status
- `items[].to.id`: Status ID
- `items[].to.name`: Status
- `items[].to.description`: Description
- `items[].to.statusCategory`: Status Category
- `items[].to.statusCategory.key`: Category Key
- `items[].to.statusCategory.name`: Category Name
- `items[].hasScreen`: Has Screen (boolean)
- `items[].isAvailable`: Available (boolean)
- `items[].isConditional`: Conditional (boolean)
- `items[].fields`: Screen Fields
- `count`: Returned (number)

### `get_issue_type_create_fields`

**Get Issue Type Create Fields.** List the fields that can be set when creating an issue of one issue type in one project, with whether each is required, its schema and its allowed values. Call it before Create Issue with Fields to learn which custom fields are mandatory and what IDs they accept. Issue type IDs come from Get Issue Types. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIdOrKey` | string | yes |  | Project ID or Key. The project key (e.g. PROJ) or numeric project ID. Find it with List Projects. |
| `issueTypeId` | string | yes |  | Issue Type ID. The numeric issue type ID. Find it with Get Issue Types. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `100` | Max Results. Maximum number of items to return in this page (up to 200). |

Output fields:

- `items`: Fields
- `items[].fieldId`: Field ID
- `items[].name`: Name
- `items[].required`: Required (boolean)
- `items[].hasDefaultValue`: Has Default (boolean)
- `items[].schema`: Schema
- `items[].schema.type`: Type
- `items[].schema.items`: Item Type
- `items[].allowedValues`: Allowed Values
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `get_issue_types`

**Get Issue Types.** List the issue types (Task, Bug, Story, Epic, Subtask and custom ones) available in one project, with their numeric IDs and whether each is a subtask type. Call it to get the issue type ID that Create Issue with Fields and Get Issue Type Create Fields require. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIdOrKey` | string | yes |  | Project ID or Key. The project key (e.g. PROJ) or numeric project ID. Find it with List Projects. |

Output fields:

- `project_id`: Project ID
- `items`: Issue Types
- `items[].id`: Issue Type ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].subtask`: Subtask (boolean)
- `items[].hierarchyLevel`: Hierarchy Level (number)
- `items[].iconUrl`: Icon (image)
- `count`: Returned (number)

### `get_issue_votes`

**Get Issue Votes.** Return the number of votes on an issue, whether the connected user has voted, and the voters when the user may see them. Voting must be enabled on the site. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |

Output fields:

- `votes`: Votes (number)
- `hasVoted`: You Have Voted (boolean)
- `voters`: Voters
- `voters[].accountId`: Account ID
- `voters[].displayName`: Display Name
- `voters[].emailAddress`: Email (email)
- `voters[].active`: Active (boolean)
- `voters[].timeZone`: Time Zone
- `voters[].accountType`: Account Type

### `get_issue_watchers`

**Get Issue Watchers.** List the users watching an issue, with their account IDs and whether the connected user is one of them. Use it before Add Watcher or Remove Watcher to check the current list. Watcher details may be hidden by site privacy settings. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |

Output fields:

- `items`: Watchers
- `items[].accountId`: Account ID
- `items[].displayName`: Display Name
- `items[].emailAddress`: Email (email)
- `items[].active`: Active (boolean)
- `items[].timeZone`: Time Zone
- `items[].accountType`: Account Type
- `count`: Returned (number)
- `watch_count`: Watch Count (number)
- `is_watching`: You Are Watching (boolean)

### `get_jql_field_suggestions`

**Get JQL Field Suggestions.** Suggest valid JQL values for one field, e.g. the exact names of statuses, sprints, labels or custom field options, optionally matching partially typed text. Use it to write exact values in JQL for Search Issues by JQL; field names come from Get JQL Reference Data. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fieldName` | string | yes |  | Field Name. The JQL field name, e.g. status, labels, sprint, or cf[10016]. |
| `fieldValue` | string | no |  | Partial Value. Partially typed value to match. |

Output fields:

- `items`: Suggestions
- `items[].value`: Value
- `items[].displayName`: Display Name (html)
- `count`: Returned (number)

### `get_jql_reference_data`

**Get JQL Reference Data.** Return the field names (with their operators and types), functions and reserved words usable in JQL on this site, optionally filtered by field name. Use it to write a valid JQL clause for a custom field, then Get JQL Field Suggestions for its values. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fieldNameContains` | string | no |  | Field Name Contains. Only return fields whose name or display name contains this text (case-insensitive). |

Output fields:

- `fields`: Fields
- `fields[].value`: JQL Name
- `fields[].displayName`: Display Name
- `fields[].cfid`: Custom Field Reference
- `fields[].operators`: Operators
- `fields[].types`: Types
- `field_count`: Field Count (number)
- `functions`: Functions
- `functions[].value`: Function
- `functions[].displayName`: Display Name
- `reserved_words`: Reserved Words

### `get_my_permissions`

**Get My Permissions.** Check whether the connected user holds specific permissions, globally or within one project or issue, returning havePermission for each key. Use it before a write to explain a likely permission failure; to list every project where a permission holds use Get Permitted Projects. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `permissions` | array | yes |  | Permission Keys. Permission keys to check, e.g. BROWSE_PROJECTS, CREATE_ISSUES, EDIT_ISSUES, TRANSITION_ISSUES, ASSIGN_ISSUES, ADD_COMMENTS, DELETE_ISSUES, WORK_ON_ISSUES, ADMINISTER_PROJECTS. |
| `projectKey` | string | no |  | Project Key. Check the permissions within this project. |
| `issueKey` | string | no |  | Issue Key. Check the permissions on this issue. |

Output fields:

- `items`: Permissions
- `items[].key`: Permission Key
- `items[].name`: Name
- `items[].type`: Type
- `items[].havePermission`: Granted (boolean)
- `items[].description`: Description
- `count`: Returned (number)

### `get_permitted_projects`

**Get Permitted Projects.** List the projects in which the connected user holds every one of the given project permissions, e.g. the projects where they can create issues. Returns project IDs and keys only; use Get Project for details. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `permissions` | array | yes |  | Permission Keys. Project permission keys that must all be held, e.g. CREATE_ISSUES, EDIT_ISSUES, TRANSITION_ISSUES. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID
- `items[].key`: Project Key
- `count`: Returned (number)

### `get_priorities`

**Get Priorities.** List the issue priorities (e.g. Highest, High, Medium, Low) with their IDs, optionally limited to those available in one project. Use it to get the priority ID that Create Issue with Fields and Edit Issue expect. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | no |  | Project ID. Only return priorities available in this project. Must be the numeric project ID (see Get Project); leave empty for all. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page. |

Output fields:

- `items`: Priorities
- `items[].id`: Priority ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].statusColor`: Color
- `items[].iconUrl`: Icon (image)
- `items[].isDefault`: Default (boolean)
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `get_project_components`

**Get Project Components.** List the components of one project, optionally filtered by name or description text, with their IDs, leads and issue counts. Use it to find component IDs for the components field of Create Issue with Fields or Edit Issue. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIdOrKey` | string | yes |  | Project ID or Key. The project key (e.g. PROJ) or numeric project ID. Find it with List Projects. |
| `query` | string | no |  | Query. Only return components whose name or description contains this text. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page. |

Output fields:

- `items`: Components
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `get_project_versions`

**Get Project Versions.** List the versions (releases) of one project, optionally filtered by name and by released, unreleased or archived status, with their IDs and release dates. Use it to find the version IDs that the fixVersions field of Create Issue with Fields or Edit Issue expects. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIdOrKey` | string | yes |  | Project ID or Key. The project key (e.g. PROJ) or numeric project ID. Find it with List Projects. |
| `query` | string | no |  | Query. Only return versions whose name or description contains this text. |
| `status` | array | no |  | Status. Only return versions with these statuses. One of `"released"`, `"unreleased"`, `"archived"`. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page. |

Output fields:

- `items`: Versions
- `items[].id`: Version ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].released`: Released (boolean)
- `items[].archived`: Archived (boolean)
- `items[].overdue`: Overdue (boolean)
- `items[].startDate`: Start Date (date)
- `items[].releaseDate`: Release Date (date)
- `items[].projectId`: Project ID
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `get_project`

**Get Project.** Fetch one project by key or ID, including its numeric ID, name, description, lead, project type, issue types, components and versions. Use List Projects to find a project by name. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectIdOrKey` | string | yes |  | Project ID or Key. The project key (e.g. PROJ) or numeric project ID. Find it with List Projects. |

Output fields:

- `id`: Project ID
- `key`: Project Key
- `name`: Name
- `description`: Description
- `projectTypeKey`: Project Type
- `style`: Style
- `simplified`: Team-Managed (boolean)
- `isPrivate`: Private (boolean)
- `lead`: Lead
- `lead.accountId`: Account ID
- `lead.displayName`: Display Name
- `assigneeType`: Default Assignee
- `issueTypes`: Issue Types
- `issueTypes[].id`: Issue Type ID
- `issueTypes[].name`: Name
- `issueTypes[].description`: Description
- `issueTypes[].subtask`: Subtask (boolean)
- `issueTypes[].hierarchyLevel`: Hierarchy Level (number)
- `issueTypes[].iconUrl`: Icon (image)
- `versions`: Versions
- `versions[].id`: Version ID
- `versions[].name`: Name
- `versions[].description`: Description
- `versions[].released`: Released (boolean)
- `versions[].archived`: Archived (boolean)
- `versions[].overdue`: Overdue (boolean)
- `versions[].startDate`: Start Date (date)
- `versions[].releaseDate`: Release Date (date)
- `versions[].projectId`: Project ID
- `components`: Components

### `get_recent_projects`

**Get Recent Projects.** List up to 20 projects the connected user viewed most recently, newest first. A quick way to guess which project the user means; use List Projects to search all projects. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Projects
- `items[].id`: Project ID
- `items[].key`: Project Key
- `items[].name`: Name
- `items[].description`: Description
- `items[].projectTypeKey`: Project Type
- `items[].style`: Style
- `items[].simplified`: Team-Managed (boolean)
- `items[].isPrivate`: Private (boolean)
- `items[].lead`: Lead
- `items[].lead.accountId`: Account ID
- `items[].lead.displayName`: Display Name
- `count`: Returned (number)

### `get_remote_issue_links`

**Get Remote Issue Links.** List the remote links on an issue that point outside Jira, such as Confluence pages, pull requests or web URLs, with each title and URL. Links between two Jira issues are not included; read those from the issuelinks field of Fetch Issue. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |

Output fields:

- `items`: Remote Links
- `count`: Returned (number)

### `get_sprint`

**Get Sprint.** Fetch one sprint by its numeric ID, including name, state, start, end and completion dates, goal and board. Use List Sprints to find sprint IDs. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sprintId` | number | yes |  | Sprint ID. The numeric sprint ID. Find it with List Sprints. |

Output fields:

- `id`: Sprint ID
- `name`: Name
- `state`: State
- `goal`: Goal
- `startDate`: Start Date (datetime)
- `endDate`: End Date (datetime)
- `completeDate`: Completed (datetime)
- `createdDate`: Created (datetime)
- `originBoardId`: Board ID

### `get_statuses`

**Get Statuses.** List the issue statuses used in active workflows, with their IDs, names and status category (To Do, In Progress, Done). Use it to write valid status names in JQL; to move an issue to a status use Get Issue Transitions, since statuses cannot be set directly. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `nameContains` | string | no |  | Name Contains. Only return statuses whose name contains this text (case-insensitive). |

Output fields:

- `items`: Statuses
- `items[].id`: Status ID
- `items[].name`: Status
- `items[].description`: Description
- `items[].statusCategory`: Status Category
- `items[].statusCategory.key`: Category Key
- `items[].statusCategory.name`: Category Name
- `count`: Returned (number)

### `get_user_groups`

**Get User Groups.** List the groups one user belongs to, with each group name and group ID. Use it to check group membership or to get group IDs for Send Issue Notification. Needs the Browse users and groups permission. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. The Atlassian account ID of the user. Resolve it with Find Users or Get Current User. |

Output fields:

- `items`: Groups
- `items[].name`: Name
- `items[].groupId`: Group ID
- `count`: Returned (number)

### `get_worklogs`

**Get Worklogs.** List the worklog entries of an issue, oldest first, with author, time spent in seconds, start time and comment, optionally limited to work started within a date range. Use it for time reports or to find a worklog ID for Delete Worklog. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `startedAfter` | ISO date-time string | no |  | Started After. Only return worklogs started on or after this time (ISO 8601). |
| `startedBefore` | ISO date-time string | no |  | Started Before. Only return worklogs started on or before this time (ISO 8601). |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page (up to 5000). |

Output fields:

- `items`: Worklogs
- `items[].id`: Worklog ID
- `items[].issueId`: Issue ID
- `items[].timeSpent`: Time Spent
- `items[].timeSpentSeconds`: Time Spent (Seconds) (number)
- `items[].started`: Started (datetime)
- `items[].created`: Created (datetime)
- `items[].updated`: Updated (datetime)
- `items[].author`: Author
- `items[].author.accountId`: Account ID
- `items[].author.displayName`: Display Name
- `items[].author.emailAddress`: Email (email)
- `items[].author.active`: Active (boolean)
- `items[].author.timeZone`: Time Zone
- `items[].author.accountType`: Account Type
- `items[].comment`: Comment (Atlassian Document Format)
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `list_boards`

**List Boards.** List the Jira Software boards visible to the connected user, optionally filtered by name, type (scrum or kanban) and project, with their numeric board IDs. Board IDs are required by List Sprints and Create Sprint. Requires Jira Software on the site. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Only return boards whose name contains this text. |
| `type` | string | no |  | Board Type. One of `"scrum"`, `"kanban"`. |
| `projectKeyOrId` | string | no |  | Project ID or Key. Only return boards that include this project. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page. |

Output fields:

- `items`: Boards
- `items[].id`: Board ID
- `items[].name`: Name
- `items[].type`: Type
- `items[].isPrivate`: Private (boolean)
- `items[].location`: Location
- `items[].location.projectId`: Project ID
- `items[].location.projectKey`: Project Key
- `items[].location.projectName`: Project Name
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `list_comments`

**List Comments.** List the comments on an issue, oldest or newest first, with each comment ID, author, timestamps and body as Atlassian Document Format plus rendered HTML. Use it to read a discussion or to find comment IDs for Update Comment and Delete Comment. Paginated with Start At. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `orderBy` | string | no | `"created"` | Order. One of `"created"`, `"-created"`. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page (up to 5000). |

Output fields:

- `items`: Comments
- `items[].id`: Comment ID
- `items[].author`: Author
- `items[].author.accountId`: Account ID
- `items[].author.displayName`: Display Name
- `items[].author.emailAddress`: Email (email)
- `items[].author.active`: Active (boolean)
- `items[].author.timeZone`: Time Zone
- `items[].author.accountType`: Account Type
- `items[].updateAuthor`: Last Updated By
- `items[].updateAuthor.accountId`: Account ID
- `items[].updateAuthor.displayName`: Display Name
- `items[].updateAuthor.emailAddress`: Email (email)
- `items[].updateAuthor.active`: Active (boolean)
- `items[].updateAuthor.timeZone`: Time Zone
- `items[].updateAuthor.accountType`: Account Type
- `items[].renderedBody`: Body (HTML) (html)
- `items[].body`: Body (Atlassian Document Format)
- `items[].created`: Created (datetime)
- `items[].updated`: Updated (datetime)
- `items[].jsdPublic`: Public (boolean)
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `list_projects`

**List Projects.** List the projects visible to the connected user, optionally filtered by text in the project name or key and by project type, with each project ID, key, name and type. The starting point for resolving a project name to the key or ID that other actions need. Paginated with Start At. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Only return projects whose name or key contains this text (case-insensitive). |
| `typeKey` | string | no |  | Project Type. One of `"software"`, `"business"`, `"service_desk"`, `"product_discovery"`. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page (up to 100). |

Output fields:

- `items`: Projects
- `items[].id`: Project ID
- `items[].key`: Project Key
- `items[].name`: Name
- `items[].description`: Description
- `items[].projectTypeKey`: Project Type
- `items[].style`: Style
- `items[].simplified`: Team-Managed (boolean)
- `items[].isPrivate`: Private (boolean)
- `items[].lead`: Lead
- `items[].lead.accountId`: Account ID
- `items[].lead.displayName`: Display Name
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `list_sprints`

**List Sprints.** List the sprints of one Scrum board, optionally filtered by state (future, active, closed), with their numeric IDs, dates and goals. Use it to find the sprint ID for Move Issues to Sprint; Kanban boards have no sprints and return an error. Board IDs come from List Boards. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `boardId` | number | yes |  | Board ID. The numeric board ID. Find it with List Boards. |
| `state` | array | no |  | State. One of `"future"`, `"active"`, `"closed"`. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page. |

Output fields:

- `items`: Sprints
- `items[].id`: Sprint ID
- `items[].name`: Name
- `items[].state`: State
- `items[].goal`: Goal
- `items[].startDate`: Start Date (datetime)
- `items[].endDate`: End Date (datetime)
- `items[].completeDate`: Completed (datetime)
- `items[].createdDate`: Created (datetime)
- `items[].originBoardId`: Board ID
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `move_issues_to_sprint`

**Move Issues to Sprint.** Move up to 50 issues into an open (future or active) sprint, taking them out of the backlog or any other sprint. Closed sprints are rejected. Sprint IDs come from List Sprints. Idempotent: moving issues already in the sprint leaves them there. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sprintId` | number | yes |  | Sprint ID. The numeric ID of a future or active sprint. Find it with List Sprints. |
| `issues` | array | yes |  | Issue Keys. Up to 50 issue keys (e.g. PROJ-123) or numeric issue IDs. |

Output fields:

- `success`: Success (boolean)
- `sprint_id`: Sprint ID
- `issues`: Moved Issues
- `count`: Returned (number)

### `parse_jql`

**Parse JQL.** Validate one or more JQL queries and return, for each, its parsed structure plus any errors or warnings such as unknown fields or values. Use it to check a generated query before Search Issues by JQL or Count Issues. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queries` | array | yes |  | Queries. JQL queries to parse. |
| `validation` | string | no | `"strict"` | Validation. Strict reports unknown fields and values as errors, warn reports them as warnings, none only checks syntax. One of `"strict"`, `"warn"`, `"none"`. |

Output fields:

- `items`: Parsed Queries
- `items[].query`: Query
- `items[].errors`: Errors
- `items[].warnings`: Warnings
- `items[].structure`: Structure
- `count`: Returned (number)

### `remove_watcher`

**Remove Watcher.** Remove one user, by account ID, from the watcher list of an issue so they stop receiving its notifications. Removing another user needs the Manage watcher list permission. Not idempotent: a retry fails when the user is no longer watching. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `accountId` | string | yes |  | Account ID. Account ID of the watcher to remove. Find it with Get Issue Watchers. |

Output fields:

- `success`: Success (boolean)
- `issue`: Issue
- `account_id`: Account ID

### `search_dashboards`

**Search Dashboards.** Search the dashboards visible to the connected user by name or owner, returning each dashboard ID, name, owner and view URL. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dashboardName` | string | no |  | Dashboard Name. Only return dashboards whose name contains this text (case-insensitive). |
| `ownerAccountId` | string | no |  | Owner Account ID. Only return dashboards owned by this user. Resolve it with Find Users. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page (up to 100). |

Output fields:

- `items`: Dashboards
- `items[].id`: Dashboard ID
- `items[].name`: Name
- `items[].view`: View Path
- `items[].isFavourite`: Favourite (boolean)
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `search_filters`

**Search Filters.** Search the saved filters visible to the connected user by name or owner, returning each filter ID, name, owner, JQL and view URL. Use the returned JQL with Search Issues by JQL, or the filter ID with Create Board; for only the user's starred filters use Get Favorite Filters. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filterName` | string | no |  | Filter Name. Only return filters whose name contains this text (case-insensitive). |
| `ownerAccountId` | string | no |  | Owner Account ID. Only return filters owned by this user. Resolve it with Find Users. |
| `startAt` | number | no | `0` | Start At. Zero-based index of the first item to return, for pagination. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of items to return in this page (up to 100). |

Output fields:

- `items`: Filters
- `items[].id`: Filter ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].jql`: JQL
- `items[].viewUrl`: View URL (url)
- `items[].favourite`: Favourite (boolean)
- `items[].owner`: Owner
- `items[].owner.accountId`: Account ID
- `items[].owner.displayName`: Display Name
- `count`: Returned (number)
- `start_at`: Start At (number)
- `max_results`: Max Results (number)
- `total`: Total (number)
- `is_last`: Last Page (boolean)

### `search_issues_by_jql`

**Search Issues by JQL.** Search issues with a JQL query (e.g. project = PROJ AND assignee = currentUser() AND statusCategory != Done ORDER BY updated DESC) and return one page of up to 100 issues with a lean default field set. Pass the returned next_page_token to get the next page; for just a total use Count Issues. JQL must be bounded by at least one restriction. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jql` | string | yes |  | JQL. The JQL query. Use single quotes or escaped double quotes around values with spaces. |
| `fields` | array | no |  | Fields. Field IDs to return. Defaults to summary, status, assignee, reporter, priority, issuetype, project, created, updated. Use *all for every field. |
| `maxResults` | number | no | `50` | Max Results. Issues per page (1-100). |
| `nextPageToken` | string | no |  | Next Page Token. The next_page_token from a previous call, to fetch the following page. |

Output fields:

- `items`: Issues
- `items[].id`: Issue ID
- `items[].key`: Issue Key
- `items[].self`: API URL (url)
- `items[].fields`: Fields
- `items[].fields.summary`: Summary
- `items[].fields.status`: Status
- `items[].fields.status.id`: Status ID
- `items[].fields.status.name`: Status
- `items[].fields.status.description`: Description
- `items[].fields.status.statusCategory`: Status Category
- `items[].fields.status.statusCategory.key`: Category Key
- `items[].fields.status.statusCategory.name`: Category Name
- `items[].fields.issuetype`: Issue Type
- `items[].fields.issuetype.id`: Issue Type ID
- `items[].fields.issuetype.name`: Issue Type
- `items[].fields.issuetype.subtask`: Subtask (boolean)
- `items[].fields.priority`: Priority
- `items[].fields.priority.id`: Priority ID
- `items[].fields.priority.name`: Priority
- `items[].fields.project`: Project
- `items[].fields.project.id`: Project ID
- `items[].fields.project.key`: Project Key
- `items[].fields.project.name`: Project Name
- `items[].fields.assignee`: Assignee
- `items[].fields.assignee.accountId`: Account ID
- `items[].fields.assignee.displayName`: Display Name
- `items[].fields.assignee.emailAddress`: Email (email)
- `items[].fields.assignee.active`: Active (boolean)
- `items[].fields.assignee.timeZone`: Time Zone
- `items[].fields.assignee.accountType`: Account Type
- `items[].fields.reporter`: Reporter
- `items[].fields.reporter.accountId`: Account ID
- `items[].fields.reporter.displayName`: Display Name
- `items[].fields.reporter.emailAddress`: Email (email)
- `items[].fields.reporter.active`: Active (boolean)
- `items[].fields.reporter.timeZone`: Time Zone
- `items[].fields.reporter.accountType`: Account Type
- `items[].fields.creator`: Creator
- `items[].fields.creator.accountId`: Account ID
- `items[].fields.creator.displayName`: Display Name
- `items[].fields.creator.emailAddress`: Email (email)
- `items[].fields.creator.active`: Active (boolean)
- `items[].fields.creator.timeZone`: Time Zone
- `items[].fields.creator.accountType`: Account Type
- `items[].fields.labels`: Labels
- `items[].fields.created`: Created (datetime)
- `items[].fields.updated`: Updated (datetime)
- `items[].fields.duedate`: Due Date (date)
- `items[].fields.resolutiondate`: Resolved (datetime)
- `items[].fields.resolution`: Resolution
- `items[].fields.resolution.id`: Resolution ID
- `items[].fields.resolution.name`: Resolution
- `items[].fields.parent`: Parent
- `items[].fields.parent.id`: Parent ID
- `items[].fields.parent.key`: Parent Key
- `items[].fields.description`: Description (Atlassian Document Format)
- `items[].fields.fixVersions`: Fix Versions
- `items[].fields.fixVersions[].id`: Version ID
- `items[].fields.fixVersions[].name`: Name
- `items[].fields.fixVersions[].description`: Description
- `items[].fields.fixVersions[].released`: Released (boolean)
- `items[].fields.fixVersions[].archived`: Archived (boolean)
- `items[].fields.fixVersions[].releaseDate`: Release Date (date)
- `items[].fields.components`: Components
- `items[].fields.attachment`: Attachments
- `items[].fields.attachment[].id`: Attachment ID
- `items[].fields.attachment[].filename`: File Name
- `items[].fields.attachment[].mimeType`: MIME Type
- `items[].fields.attachment[].size`: Size (filesize)
- `items[].fields.attachment[].content`: Content URL (url)
- `items[].fields.attachment[].thumbnail`: Thumbnail URL (image)
- `items[].fields.attachment[].created`: Created (datetime)
- `items[].fields.attachment[].author`: Author
- `items[].fields.attachment[].author.accountId`: Account ID
- `items[].fields.attachment[].author.displayName`: Display Name
- `items[].fields.attachment[].author.emailAddress`: Email (email)
- `items[].fields.attachment[].author.active`: Active (boolean)
- `items[].fields.attachment[].author.timeZone`: Time Zone
- `items[].fields.attachment[].author.accountType`: Account Type
- `items[].fields.issuelinks`: Issue Links
- `items[].fields.issuelinks[].id`: Link ID
- `items[].fields.issuelinks[].type`: Link Type
- `items[].fields.issuelinks[].type.name`: Name
- `items[].fields.issuelinks[].type.inward`: Inward Description
- `items[].fields.issuelinks[].type.outward`: Outward Description
- `items[].fields.issuelinks[].inwardIssue`: Inward Issue
- `items[].fields.issuelinks[].inwardIssue.key`: Issue Key
- `items[].fields.issuelinks[].outwardIssue`: Outward Issue
- `items[].fields.issuelinks[].outwardIssue.key`: Issue Key
- `items[].fields.subtasks`: Subtasks
- `items[].fields.subtasks[].id`: Issue ID
- `items[].fields.subtasks[].key`: Issue Key
- `count`: Returned (number)
- `next_page_token`: Next Page Token
- `is_last`: Last Page (boolean)

### `send_issue_notification`

**Send Issue Notification.** Send a custom email notification about an issue to its reporter, assignee, watchers, voters, specific users (by account ID) or groups (by group ID). At least one recipient must be selected. Jira queues the email, so delivery is not confirmed. Not idempotent: every call sends another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `subject` | string | no |  | Subject. Email subject. Defaults to the issue key and summary. |
| `textBody` | string | yes |  | Text Body. Plain-text body of the email. |
| `htmlBody` | string | no |  | HTML Body. Optional HTML body of the email. |
| `notifyReporter` | boolean | no | `false` | Notify Reporter. |
| `notifyAssignee` | boolean | no | `false` | Notify Assignee. |
| `notifyWatchers` | boolean | no | `false` | Notify Watchers. |
| `notifyVoters` | boolean | no | `false` | Notify Voters. |
| `userAccountIds` | array | no |  | User Account IDs. Account IDs of additional users to notify. Resolve them with Find Users. |
| `groupIds` | array | no |  | Group IDs. IDs of groups to notify. Find them with Get User Groups. |

### `transition_issue_status`

**Transition Issue Status.** Move an issue to a new status by performing a workflow transition, optionally setting a resolution, other screen fields and a comment. Needs the numeric transition ID from Get Issue Transitions, which also shows the fields a transition requires. Not idempotent: once moved, the same transition is usually no longer available. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `transitionId` | string | yes |  | Transition ID. The numeric transition ID. Find it with Get Issue Transitions. |
| `resolutionId` | string | no |  | Resolution ID. Resolution to set when the transition screen asks for one. Find it with Get Issue Resolutions. |
| `comment` | string | no |  | Comment. Optional comment added with the transition. Markdown is supported and converted to Atlassian Document Format. |
| `fields` | JSON | no |  | Additional Fields. JSON object of other transition screen field IDs to values, e.g. {"customfield_10020": "value"}. |

Output fields:

- `success`: Success (boolean)
- `issue`: Issue
- `transition_id`: Transition ID
- `status`: New Status
- `status.id`: Status ID
- `status.name`: Status
- `status.description`: Description
- `status.statusCategory`: Status Category
- `status.statusCategory.key`: Category Key
- `status.statusCategory.name`: Category Name

### `update_comment`

**Update Comment.** Replace the text of an existing comment on an issue with new markdown text; the comment keeps its author and visibility. Comment IDs come from List Comments, and only the author or a user with edit-all-comments permission may edit. Idempotent: writing the same text again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `commentId` | string | yes |  | Comment ID. The numeric comment ID. Find it with List Comments. |
| `comment` | string | yes |  | Comment. The new comment text. Markdown is supported and converted to Atlassian Document Format. |
| `notifyUsers` | boolean | no | `true` | Notify Watchers. |

Output fields:

- `id`: Comment ID
- `author`: Author
- `author.accountId`: Account ID
- `author.displayName`: Display Name
- `author.emailAddress`: Email (email)
- `author.active`: Active (boolean)
- `author.timeZone`: Time Zone
- `author.accountType`: Account Type
- `updateAuthor`: Last Updated By
- `updateAuthor.accountId`: Account ID
- `updateAuthor.displayName`: Display Name
- `updateAuthor.emailAddress`: Email (email)
- `updateAuthor.active`: Active (boolean)
- `updateAuthor.timeZone`: Time Zone
- `updateAuthor.accountType`: Account Type
- `renderedBody`: Body (HTML) (html)
- `body`: Body (Atlassian Document Format)
- `created`: Created (datetime)
- `updated`: Updated (datetime)
- `jsdPublic`: Public (boolean)

### `upload_attachment`

**Upload Attachment.** Upload a file and attach it to an issue, returning the new attachment ID, name, size and content URL. Attachments must be enabled and the file within the site size limit. Not idempotent: each call adds another copy of the file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueIdOrKey` | string | yes |  | Issue ID or Key. The issue key (e.g. PROJ-123) or numeric issue ID. Find it with Search Issues by JQL. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `fileName` | string | no |  | File Name. Name to give the attachment, including extension. Defaults to the original file name. |

Output fields:

- `items`: Attachments
- `items[].id`: Attachment ID
- `items[].filename`: File Name
- `items[].mimeType`: MIME Type
- `items[].size`: Size (filesize)
- `items[].content`: Content URL (url)
- `items[].thumbnail`: Thumbnail URL (image)
- `items[].created`: Created (datetime)
- `items[].author`: Author
- `items[].author.accountId`: Account ID
- `items[].author.displayName`: Display Name
- `items[].author.emailAddress`: Email (email)
- `items[].author.active`: Active (boolean)
- `items[].author.timeZone`: Time Zone
- `items[].author.accountType`: Account Type
- `count`: Returned (number)

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
