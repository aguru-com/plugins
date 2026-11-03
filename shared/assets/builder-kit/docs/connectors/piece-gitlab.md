# GitLab

Collaboration tool for developers

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gitlab'
  version: '0.4.2'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_issue`

**Create Issue.** Creates a new issue in a GitLab project chosen from a dropdown, with a title and optional description. Not idempotent: each call creates a separate issue even with identical inputs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Issue Title. |
| `description` | string | no |  | Issue Description. |

Output fields:

- `id`: Issue ID (number)
- `iid`: Issue IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `confidential`: Confidential (boolean)
- `discussion_locked`: Discussion Locked (boolean)
- `due_date`: Due Date (date)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `closed_by`: Closed By
- `closed_by.id`: User ID (number)
- `closed_by.username`: Username
- `closed_by.name`: Name
- `closed_by.state`: State
- `closed_by.avatar_url`: Avatar (image)
- `closed_by.web_url`: Profile URL (url)
- `user_notes_count`: Comment Count (number)
- `issue_type`: Type
- `web_url`: URL (url)
- `time_stats`: Time Tracking
- `time_stats.time_estimate`: Estimate (seconds) (number)
- `time_stats.total_time_spent`: Time Spent (seconds) (number)
- `references`: References
- `references.full`: Full Reference

### `add_issue_spent_time`

**Add Spent Time.** Adds a time-spent entry to a GitLab issue, e.g. 1h30m, with an optional summary. Not idempotent: each call adds to the total; use Reset Spent Time to wipe it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `duration` | string | yes |  | Duration. GitLab duration such as 1h30m, 2d or 1w. |
| `summary` | string | no |  | Summary. |

Output fields:

- `time_estimate`: Estimate (seconds) (number)
- `total_time_spent`: Time Spent (seconds) (number)
- `human_time_estimate`: Estimate
- `human_total_time_spent`: Time Spent

### `create_issue_note`

**Add Issue Comment.** Posts a Markdown comment on a GitLab issue. Quick actions such as /label or /close in the body are executed by GitLab. Not idempotent: each call posts a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `body` | string | yes |  | Comment. |
| `internal` | string | no |  | Internal. Internal notes are visible only to project members with at least Reporter role. One of `"true"`, `"false"`. |

Output fields:

- `id`: Note ID (number)
- `body`: Body
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `system`: System Note (boolean)
- `internal`: Internal (boolean)
- `noteable_type`: Attached To
- `noteable_iid`: Attached To IID (number)
- `resolvable`: Resolvable (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `create_project_issue`

**Create Project Issue.** Creates a new issue in a GitLab project identified by numeric ID or full path, with optional labels, assignees, milestone, due date and confidentiality. Use to open a bug, task or feature request. Not idempotent: each call creates a separate issue. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. Markdown body of the issue. |
| `labels` | array | no |  | Labels. Label names. Labels that do not exist yet are created. |
| `assigneeIds` | array | no |  | Assignee User IDs. Numeric user IDs. Resolve a username with List Users. |
| `milestoneId` | number | no |  | Milestone ID. Global milestone ID (not the iid). |
| `dueDate` | string | no |  | Due Date. YYYY-MM-DD. |
| `confidential` | string | no |  | Confidential. Make the issue visible only to project members with at least Planner role. One of `"true"`, `"false"`. |

Output fields:

- `id`: Issue ID (number)
- `iid`: Issue IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `confidential`: Confidential (boolean)
- `discussion_locked`: Discussion Locked (boolean)
- `due_date`: Due Date (date)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `closed_by`: Closed By
- `closed_by.id`: User ID (number)
- `closed_by.username`: Username
- `closed_by.name`: Name
- `closed_by.state`: State
- `closed_by.avatar_url`: Avatar (image)
- `closed_by.web_url`: Profile URL (url)
- `user_notes_count`: Comment Count (number)
- `issue_type`: Type
- `web_url`: URL (url)
- `time_stats`: Time Tracking
- `time_stats.time_estimate`: Estimate (seconds) (number)
- `time_stats.total_time_spent`: Time Spent (seconds) (number)
- `references`: References
- `references.full`: Full Reference

### `delete_issue_note`

**Delete Issue Comment.** Permanently deletes one comment from a GitLab issue; it cannot be restored. A second call for the same note fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `noteId` | number | yes |  | Note ID. Numeric ID of the comment (note). |

Output fields:

- `deleted`: Deleted (boolean)
- `noteId`: Note ID (number)
- `issueIid`: Issue IID (number)

### `get_issue_note`

**Get Issue Comment.** Returns one comment on a GitLab issue by note ID, including author, body, timestamps and whether it is a system note. Use List Issue Comments to find the note ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `noteId` | number | yes |  | Note ID. Numeric ID of the comment (note). |

Output fields:

- `id`: Note ID (number)
- `body`: Body
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `system`: System Note (boolean)
- `internal`: Internal (boolean)
- `noteable_type`: Attached To
- `noteable_iid`: Attached To IID (number)
- `resolvable`: Resolvable (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `get_issue_time_stats`

**Get Time Tracking Stats.** Returns the time estimate and total time spent on a GitLab issue, in seconds and in human-readable form. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |

Output fields:

- `time_estimate`: Estimate (seconds) (number)
- `total_time_spent`: Time Spent (seconds) (number)
- `human_time_estimate`: Estimate
- `human_total_time_spent`: Time Spent

### `get_issue`

**Get Issue.** Returns one GitLab issue (title, description, state, labels, assignees, milestone, dates, web URL) by project ID/path and issue IID. Use when the issue number is known; use List Issues to find it by text or filters. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |

Output fields:

- `id`: Issue ID (number)
- `iid`: Issue IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `confidential`: Confidential (boolean)
- `discussion_locked`: Discussion Locked (boolean)
- `due_date`: Due Date (date)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `closed_by`: Closed By
- `closed_by.id`: User ID (number)
- `closed_by.username`: Username
- `closed_by.name`: Name
- `closed_by.state`: State
- `closed_by.avatar_url`: Avatar (image)
- `closed_by.web_url`: Profile URL (url)
- `user_notes_count`: Comment Count (number)
- `issue_type`: Type
- `web_url`: URL (url)
- `time_stats`: Time Tracking
- `time_stats.time_estimate`: Estimate (seconds) (number)
- `time_stats.total_time_spent`: Time Spent (seconds) (number)
- `references`: References
- `references.full`: Full Reference

### `list_issue_notes`

**List Issue Comments.** Lists comments on a GitLab issue, including system notes such as label or state changes. Returns one page plus nextPage/hasMore. Use to read a discussion or find a note ID for Update or Delete Issue Comment. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `orderBy` | string | no |  | Order By. One of `"created_at"`, `"updated_at"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Comments
- `items[].id`: Note ID (number)
- `items[].body`: Body
- `items[].author`: Author
- `items[].author.id`: User ID (number)
- `items[].author.username`: Username
- `items[].author.name`: Name
- `items[].author.state`: State
- `items[].author.avatar_url`: Avatar (image)
- `items[].author.web_url`: Profile URL (url)
- `items[].system`: System Note (boolean)
- `items[].internal`: Internal (boolean)
- `items[].noteable_type`: Attached To
- `items[].noteable_iid`: Attached To IID (number)
- `items[].resolvable`: Resolvable (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_issues`

**List Issues.** Lists issues in a GitLab project with optional filters (state, labels, text search, assignee, author, milestone, updated after). Returns one page plus nextPage/hasMore; call again with nextPage to continue. Use to find an issue IID before Get Issue or Update Issue. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `state` | string | no |  | State. One of `"opened"`, `"closed"`, `"all"`. |
| `search` | string | no |  | Search. Matches title and description. |
| `labels` | array | no |  | Labels. Issues must have all of these labels. |
| `assigneeId` | number | no |  | Assignee User ID. |
| `authorId` | number | no |  | Author User ID. |
| `milestone` | string | no |  | Milestone Title. |
| `updatedAfter` | string | no |  | Updated After. ISO 8601 date-time. |
| `orderBy` | string | no |  | Order By. One of `"created_at"`, `"updated_at"`, `"due_date"`, `"priority"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Issues
- `items[].id`: Issue ID (number)
- `items[].iid`: Issue IID (number)
- `items[].project_id`: Project ID (number)
- `items[].title`: Title
- `items[].description`: Description
- `items[].state`: State
- `items[].labels`: Labels
- `items[].author`: Author
- `items[].author.id`: User ID (number)
- `items[].author.username`: Username
- `items[].author.name`: Name
- `items[].author.state`: State
- `items[].author.avatar_url`: Avatar (image)
- `items[].author.web_url`: Profile URL (url)
- `items[].assignees`: Assignees
- `items[].assignees[].id`: User ID (number)
- `items[].assignees[].username`: Username
- `items[].assignees[].name`: Name
- `items[].assignees[].state`: State
- `items[].assignees[].avatar_url`: Avatar (image)
- `items[].assignees[].web_url`: Profile URL (url)
- `items[].milestone`: Milestone
- `items[].milestone.id`: Milestone ID (number)
- `items[].milestone.iid`: Milestone IID (number)
- `items[].milestone.title`: Title
- `items[].milestone.state`: State
- `items[].milestone.due_date`: Due Date (date)
- `items[].milestone.web_url`: URL (url)
- `items[].confidential`: Confidential (boolean)
- `items[].discussion_locked`: Discussion Locked (boolean)
- `items[].due_date`: Due Date (date)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].closed_at`: Closed At (datetime)
- `items[].closed_by`: Closed By
- `items[].closed_by.id`: User ID (number)
- `items[].closed_by.username`: Username
- `items[].closed_by.name`: Name
- `items[].closed_by.state`: State
- `items[].closed_by.avatar_url`: Avatar (image)
- `items[].closed_by.web_url`: Profile URL (url)
- `items[].user_notes_count`: Comment Count (number)
- `items[].issue_type`: Type
- `items[].web_url`: URL (url)
- `items[].time_stats`: Time Tracking
- `items[].time_stats.time_estimate`: Estimate (seconds) (number)
- `items[].time_stats.total_time_spent`: Time Spent (seconds) (number)
- `items[].references`: References
- `items[].references.full`: Full Reference
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `move_issue`

**Move Issue.** Moves a GitLab issue to another project; the returned issue has a new IID in the target project and the original is closed. Not idempotent: a second call on the original IID fails because it was already moved. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric ID or full path of the project the issue is in now. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `toProjectId` | number | yes |  | Target Project ID. Numeric ID of the destination project. |

Output fields:

- `id`: Issue ID (number)
- `iid`: Issue IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `confidential`: Confidential (boolean)
- `discussion_locked`: Discussion Locked (boolean)
- `due_date`: Due Date (date)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `closed_by`: Closed By
- `closed_by.id`: User ID (number)
- `closed_by.username`: Username
- `closed_by.name`: Name
- `closed_by.state`: State
- `closed_by.avatar_url`: Avatar (image)
- `closed_by.web_url`: Profile URL (url)
- `user_notes_count`: Comment Count (number)
- `issue_type`: Type
- `web_url`: URL (url)
- `time_stats`: Time Tracking
- `time_stats.time_estimate`: Estimate (seconds) (number)
- `time_stats.total_time_spent`: Time Spent (seconds) (number)
- `references`: References
- `references.full`: Full Reference

### `reset_issue_spent_time`

**Reset Spent Time.** Deletes every time-spent entry on a GitLab issue and sets the total to zero; the logged history cannot be restored. Calling it again leaves the total at zero. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |

Output fields:

- `time_estimate`: Estimate (seconds) (number)
- `total_time_spent`: Time Spent (seconds) (number)
- `human_time_estimate`: Estimate
- `human_total_time_spent`: Time Spent

### `reset_issue_time_estimate`

**Reset Time Estimate.** Removes the time estimate of a GitLab issue (sets it to zero). Logged time spent is not affected. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |

Output fields:

- `time_estimate`: Estimate (seconds) (number)
- `total_time_spent`: Time Spent (seconds) (number)
- `human_time_estimate`: Estimate
- `human_total_time_spent`: Time Spent

### `set_issue_time_estimate`

**Set Time Estimate.** Sets the time estimate of a GitLab issue to a duration such as 3h30m, replacing any previous estimate. Use Reset Time Estimate to remove it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `duration` | string | yes |  | Estimate. GitLab duration such as 3h30m, 2d or 1w. |

Output fields:

- `time_estimate`: Estimate (seconds) (number)
- `total_time_spent`: Time Spent (seconds) (number)
- `human_time_estimate`: Estimate
- `human_total_time_spent`: Time Spent

### `update_issue_note`

**Update Issue Comment.** Replaces the body of an existing comment on a GitLab issue. Only the author (or an admin) can edit a note. Re-sending the same text leaves the note unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `noteId` | number | yes |  | Note ID. Numeric ID of the comment (note). |
| `body` | string | yes |  | Comment. |

Output fields:

- `id`: Note ID (number)
- `body`: Body
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `system`: System Note (boolean)
- `internal`: Internal (boolean)
- `noteable_type`: Attached To
- `noteable_iid`: Attached To IID (number)
- `resolvable`: Resolvable (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_issue`

**Update Issue.** Changes an existing GitLab issue: title, description, close or reopen, add or remove labels, assignees, milestone, due date, confidential, discussion lock. Only the fields you set are sent; use the Clear options to blank a field. Use Move Issue to change its project. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `issueIid` | number | yes |  | Issue IID. The issue number inside the project (the `iid`, shown as #12 in GitLab), not the global issue ID. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `clearDescription` | boolean | no | `false` | Clear Description. |
| `stateEvent` | string | no |  | State Change. One of `"close"`, `"reopen"`. |
| `addLabels` | array | no |  | Add Labels. |
| `removeLabels` | array | no |  | Remove Labels. |
| `assigneeIds` | array | no |  | Assignee User IDs. Replaces the current assignees. |
| `clearAssignees` | boolean | no | `false` | Remove All Assignees. |
| `milestoneId` | number | no |  | Milestone ID. Global milestone ID (not the iid). |
| `clearMilestone` | boolean | no | `false` | Remove Milestone. |
| `dueDate` | string | no |  | Due Date. YYYY-MM-DD. |
| `clearDueDate` | boolean | no | `false` | Clear Due Date. |
| `confidential` | string | no |  | Confidential. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `discussionLocked` | string | no |  | Discussion Locked. Leave empty to keep the current value. One of `"true"`, `"false"`. |

Output fields:

- `id`: Issue ID (number)
- `iid`: Issue IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `confidential`: Confidential (boolean)
- `discussion_locked`: Discussion Locked (boolean)
- `due_date`: Due Date (date)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `closed_by`: Closed By
- `closed_by.id`: User ID (number)
- `closed_by.username`: Username
- `closed_by.name`: Name
- `closed_by.state`: State
- `closed_by.avatar_url`: Avatar (image)
- `closed_by.web_url`: Profile URL (url)
- `user_notes_count`: Comment Count (number)
- `issue_type`: Type
- `web_url`: URL (url)
- `time_stats`: Time Tracking
- `time_stats.time_estimate`: Estimate (seconds) (number)
- `time_stats.total_time_spent`: Time Spent (seconds) (number)
- `references`: References
- `references.full`: Full Reference

### `approve_merge_request`

**Approve Merge Request.** Adds the connected user's approval to a GitLab merge request. GitLab answers 401 if this user already approved it or may not approve it (on gitlab.com authors usually cannot approve their own merge request), so check user_can_approve with Get Merge Request Approvals first. Undo with Unapprove Merge Request. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `sha` | string | no |  | Expected Head SHA. If set, the approval fails when the source branch head is not this SHA. |

Output fields:

- `iid`: Merge Request IID (number)
- `approved`: Approved (boolean)
- `approvals_required`: Approvals Required (number)
- `approvals_left`: Approvals Left (number)
- `user_has_approved`: Connected User Approved (boolean)
- `user_can_approve`: Connected User Can Approve (boolean)
- `approved_by`: Approved By
- `approved_by[].user`: User
- `approved_by[].user.id`: User ID (number)
- `approved_by[].user.username`: Username
- `approved_by[].user.name`: Name
- `approved_by[].user.state`: State
- `approved_by[].user.avatar_url`: Avatar (image)
- `approved_by[].user.web_url`: Profile URL (url)
- `updated_at`: Updated At (datetime)

### `create_merge_request_draft_note`

**Create Merge Request Draft Comment.** Adds a draft (unpublished, pending review) comment to a GitLab merge request; it is visible only to its author until the review is submitted in GitLab. Not idempotent: each call adds another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `note` | string | yes |  | Comment. |

Output fields:

- `id`: Draft Note ID (number)
- `author_id`: Author ID (number)
- `merge_request_id`: Merge Request ID (number)
- `note`: Comment
- `discussion_id`: Discussion ID
- `resolve_discussion`: Resolves Discussion (boolean)

### `create_merge_request`

**Create Merge Request.** Opens a GitLab merge request from a source branch into a target branch, with optional description, labels, assignees, reviewers and milestone. GitLab refuses a second open merge request for the same branch pair, so a retry fails with a conflict rather than duplicating. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `sourceBranch` | string | yes |  | Source Branch. Branch with the changes. |
| `targetBranch` | string | yes |  | Target Branch. Branch to merge into, e.g. main. |
| `title` | string | yes |  | Title. Prefix with "Draft:" to open it as a draft. |
| `description` | string | no |  | Description. |
| `labels` | array | no |  | Labels. |
| `assigneeIds` | array | no |  | Assignee User IDs. |
| `reviewerIds` | array | no |  | Reviewer User IDs. |
| `milestoneId` | number | no |  | Milestone ID. Global milestone ID (not the iid). |
| `removeSourceBranch` | string | no |  | Delete Source Branch on Merge. Leave empty to use the project default. One of `"true"`, `"false"`. |
| `squash` | string | no |  | Squash Commits on Merge. Leave empty to use the project default. One of `"true"`, `"false"`. |

Output fields:

- `id`: Merge Request ID (number)
- `iid`: Merge Request IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `draft`: Draft (boolean)
- `source_branch`: Source Branch
- `target_branch`: Target Branch
- `sha`: Head SHA
- `merge_commit_sha`: Merge Commit SHA
- `squash_commit_sha`: Squash Commit SHA
- `detailed_merge_status`: Merge Status
- `has_conflicts`: Has Conflicts (boolean)
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `reviewers`: Reviewers
- `reviewers[].id`: User ID (number)
- `reviewers[].username`: Username
- `reviewers[].name`: Name
- `reviewers[].state`: State
- `reviewers[].avatar_url`: Avatar (image)
- `reviewers[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `merged_by`: Merged By
- `merged_by.id`: User ID (number)
- `merged_by.username`: Username
- `merged_by.name`: Name
- `merged_by.state`: State
- `merged_by.avatar_url`: Avatar (image)
- `merged_by.web_url`: Profile URL (url)
- `merged_at`: Merged At (datetime)
- `closed_at`: Closed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `squash`: Squash on Merge (boolean)
- `force_remove_source_branch`: Delete Source Branch on Merge (boolean)
- `user_notes_count`: Comment Count (number)
- `web_url`: URL (url)
- `references`: References
- `references.full`: Full Reference

### `delete_merge_request`

**Delete Merge Request.** Permanently deletes a GitLab merge request with its discussion; only project Owners or admins may do it. To stop a merge request without losing it, use Update Merge Request with State Change Close instead. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |

Output fields:

- `deleted`: Deleted (boolean)
- `mergeRequestIid`: Merge Request IID (number)

### `get_merge_request_approvals`

**Get Merge Request Approvals.** Returns the approval status of a GitLab merge request: whether it is approved, approvals required and left, and the users who approved. Works on every GitLab tier. Check it before Approve Merge Request to avoid a duplicate-approval error. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |

Output fields:

- `iid`: Merge Request IID (number)
- `approved`: Approved (boolean)
- `approvals_required`: Approvals Required (number)
- `approvals_left`: Approvals Left (number)
- `user_has_approved`: Connected User Approved (boolean)
- `user_can_approve`: Connected User Can Approve (boolean)
- `approved_by`: Approved By
- `approved_by[].user`: User
- `approved_by[].user.id`: User ID (number)
- `approved_by[].user.username`: Username
- `approved_by[].user.name`: Name
- `approved_by[].user.state`: State
- `approved_by[].user.avatar_url`: Avatar (image)
- `approved_by[].user.web_url`: Profile URL (url)
- `updated_at`: Updated At (datetime)

### `get_merge_request`

**Get Merge Request.** Returns one GitLab merge request by project and IID: title, description, branches, state, merge status, author, assignees, reviewers, SHA and web URL. Use List Merge Requests to find the IID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |

Output fields:

- `id`: Merge Request ID (number)
- `iid`: Merge Request IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `draft`: Draft (boolean)
- `source_branch`: Source Branch
- `target_branch`: Target Branch
- `sha`: Head SHA
- `merge_commit_sha`: Merge Commit SHA
- `squash_commit_sha`: Squash Commit SHA
- `detailed_merge_status`: Merge Status
- `has_conflicts`: Has Conflicts (boolean)
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `reviewers`: Reviewers
- `reviewers[].id`: User ID (number)
- `reviewers[].username`: Username
- `reviewers[].name`: Name
- `reviewers[].state`: State
- `reviewers[].avatar_url`: Avatar (image)
- `reviewers[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `merged_by`: Merged By
- `merged_by.id`: User ID (number)
- `merged_by.username`: Username
- `merged_by.name`: Name
- `merged_by.state`: State
- `merged_by.avatar_url`: Avatar (image)
- `merged_by.web_url`: Profile URL (url)
- `merged_at`: Merged At (datetime)
- `closed_at`: Closed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `squash`: Squash on Merge (boolean)
- `force_remove_source_branch`: Delete Source Branch on Merge (boolean)
- `user_notes_count`: Comment Count (number)
- `web_url`: URL (url)
- `references`: References
- `references.full`: Full Reference

### `list_merge_request_commits`

**List Merge Request Commits.** Lists the commits in a GitLab merge request, newest first. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Commits
- `items[].id`: SHA
- `items[].short_id`: Short SHA
- `items[].title`: Title
- `items[].message`: Message
- `items[].author_name`: Author Name
- `items[].author_email`: Author Email (email)
- `items[].authored_date`: Authored At (datetime)
- `items[].committer_name`: Committer Name
- `items[].committed_date`: Committed At (datetime)
- `items[].parent_ids`: Parent SHAs
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_merge_request_diff_versions`

**List Merge Request Diff Versions.** Lists the diff versions of a GitLab merge request (one per push), with head, base and start SHAs. Returns one page plus nextPage/hasMore. Use List Merge Request Diffs for the file changes themselves. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Diff Versions
- `items[].id`: Version ID (number)
- `items[].head_commit_sha`: Head SHA
- `items[].base_commit_sha`: Base SHA
- `items[].start_commit_sha`: Start SHA
- `items[].state`: State
- `items[].real_size`: Changed Files
- `items[].created_at`: Created At (datetime)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_merge_request_diffs`

**List Merge Request Diffs.** Lists the files changed in a GitLab merge request with old/new paths, new/renamed/deleted flags and the unified diff text. Each diff is cut at 20,000 characters (diffTruncated tells you); read the full file with Get File. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Changed Files
- `items[].old_path`: Old Path
- `items[].new_path`: New Path
- `items[].new_file`: New File (boolean)
- `items[].renamed_file`: Renamed (boolean)
- `items[].deleted_file`: Deleted (boolean)
- `items[].generated_file`: Generated (boolean)
- `items[].diff`: Diff
- `items[].diffTruncated`: Diff Truncated (boolean)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_merge_request_discussions`

**List Merge Request Discussions.** Lists discussion threads on a GitLab merge request, each with its notes and, for diff comments, the file position and resolved state. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Discussions
- `items[].id`: Discussion ID
- `items[].individual_note`: Single Comment (boolean)
- `items[].notes`: Comments
- `items[].notes[].id`: Note ID (number)
- `items[].notes[].body`: Body
- `items[].notes[].author`: Author
- `items[].notes[].author.id`: User ID (number)
- `items[].notes[].author.username`: Username
- `items[].notes[].author.name`: Name
- `items[].notes[].author.state`: State
- `items[].notes[].author.avatar_url`: Avatar (image)
- `items[].notes[].author.web_url`: Profile URL (url)
- `items[].notes[].system`: System Note (boolean)
- `items[].notes[].internal`: Internal (boolean)
- `items[].notes[].noteable_type`: Attached To
- `items[].notes[].noteable_iid`: Attached To IID (number)
- `items[].notes[].resolvable`: Resolvable (boolean)
- `items[].notes[].created_at`: Created At (datetime)
- `items[].notes[].updated_at`: Updated At (datetime)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_merge_request_notes`

**List Merge Request Comments.** Lists comments on a GitLab merge request, including system notes. Returns one page plus nextPage/hasMore. Use List Merge Request Discussions to see comments grouped into threads. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `orderBy` | string | no |  | Order By. One of `"created_at"`, `"updated_at"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Comments
- `items[].id`: Note ID (number)
- `items[].body`: Body
- `items[].author`: Author
- `items[].author.id`: User ID (number)
- `items[].author.username`: Username
- `items[].author.name`: Name
- `items[].author.state`: State
- `items[].author.avatar_url`: Avatar (image)
- `items[].author.web_url`: Profile URL (url)
- `items[].system`: System Note (boolean)
- `items[].internal`: Internal (boolean)
- `items[].noteable_type`: Attached To
- `items[].noteable_iid`: Attached To IID (number)
- `items[].resolvable`: Resolvable (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_merge_requests`

**List Merge Requests.** Lists GitLab merge requests in one project, or across every project the user can see when Project is empty. Without a project, Scope decides whose merge requests are returned and GitLab defaults to only those created by the connected user, so set Scope to All to see everyone's. Scope All without a project returns public merge requests from all of gitlab.com and can time out, so give a project for that. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | no |  | Project ID or Path. Optional. Leave empty to search across projects. |
| `scope` | string | no |  | Scope. Whose merge requests to return. Without a project GitLab defaults to Created by Me; in a project it defaults to All. One of `"created_by_me"`, `"assigned_to_me"`, `"all"`. |
| `state` | string | no |  | State. One of `"opened"`, `"closed"`, `"locked"`, `"merged"`, `"all"`. |
| `search` | string | no |  | Search. Matches title and description. |
| `labels` | array | no |  | Labels. |
| `sourceBranch` | string | no |  | Source Branch. |
| `targetBranch` | string | no |  | Target Branch. |
| `authorId` | number | no |  | Author User ID. |
| `reviewerId` | number | no |  | Reviewer User ID. |
| `updatedAfter` | string | no |  | Updated After. ISO 8601 date-time. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Merge Requests
- `items[].id`: Merge Request ID (number)
- `items[].iid`: Merge Request IID (number)
- `items[].project_id`: Project ID (number)
- `items[].title`: Title
- `items[].description`: Description
- `items[].state`: State
- `items[].draft`: Draft (boolean)
- `items[].source_branch`: Source Branch
- `items[].target_branch`: Target Branch
- `items[].sha`: Head SHA
- `items[].merge_commit_sha`: Merge Commit SHA
- `items[].squash_commit_sha`: Squash Commit SHA
- `items[].detailed_merge_status`: Merge Status
- `items[].has_conflicts`: Has Conflicts (boolean)
- `items[].labels`: Labels
- `items[].author`: Author
- `items[].author.id`: User ID (number)
- `items[].author.username`: Username
- `items[].author.name`: Name
- `items[].author.state`: State
- `items[].author.avatar_url`: Avatar (image)
- `items[].author.web_url`: Profile URL (url)
- `items[].assignees`: Assignees
- `items[].assignees[].id`: User ID (number)
- `items[].assignees[].username`: Username
- `items[].assignees[].name`: Name
- `items[].assignees[].state`: State
- `items[].assignees[].avatar_url`: Avatar (image)
- `items[].assignees[].web_url`: Profile URL (url)
- `items[].reviewers`: Reviewers
- `items[].reviewers[].id`: User ID (number)
- `items[].reviewers[].username`: Username
- `items[].reviewers[].name`: Name
- `items[].reviewers[].state`: State
- `items[].reviewers[].avatar_url`: Avatar (image)
- `items[].reviewers[].web_url`: Profile URL (url)
- `items[].milestone`: Milestone
- `items[].milestone.id`: Milestone ID (number)
- `items[].milestone.iid`: Milestone IID (number)
- `items[].milestone.title`: Title
- `items[].milestone.state`: State
- `items[].milestone.due_date`: Due Date (date)
- `items[].milestone.web_url`: URL (url)
- `items[].merged_by`: Merged By
- `items[].merged_by.id`: User ID (number)
- `items[].merged_by.username`: Username
- `items[].merged_by.name`: Name
- `items[].merged_by.state`: State
- `items[].merged_by.avatar_url`: Avatar (image)
- `items[].merged_by.web_url`: Profile URL (url)
- `items[].merged_at`: Merged At (datetime)
- `items[].closed_at`: Closed At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].squash`: Squash on Merge (boolean)
- `items[].force_remove_source_branch`: Delete Source Branch on Merge (boolean)
- `items[].user_notes_count`: Comment Count (number)
- `items[].web_url`: URL (url)
- `items[].references`: References
- `items[].references.full`: Full Reference
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `merge_merge_request`

**Merge Merge Request.** Merges a GitLab merge request into its target branch, optionally squashing and deleting the source branch; this changes the target branch and cannot be undone through the API. Pass the expected head SHA to refuse the merge if new commits were pushed. With Auto Merge, GitLab merges once the pipeline succeeds instead of now. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `sha` | string | no |  | Expected Head SHA. If set, the merge fails when the source branch head is not this SHA. |
| `squash` | string | no |  | Squash Commits. Leave empty to use the merge request setting. One of `"true"`, `"false"`. |
| `shouldRemoveSourceBranch` | string | no |  | Delete Source Branch. Leave empty to use the merge request setting. One of `"true"`, `"false"`. |
| `mergeCommitMessage` | string | no |  | Merge Commit Message. |
| `squashCommitMessage` | string | no |  | Squash Commit Message. |
| `autoMerge` | string | no |  | Auto Merge. Merge when the pipeline succeeds instead of immediately. One of `"true"`, `"false"`. |

Output fields:

- `id`: Merge Request ID (number)
- `iid`: Merge Request IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `draft`: Draft (boolean)
- `source_branch`: Source Branch
- `target_branch`: Target Branch
- `sha`: Head SHA
- `merge_commit_sha`: Merge Commit SHA
- `squash_commit_sha`: Squash Commit SHA
- `detailed_merge_status`: Merge Status
- `has_conflicts`: Has Conflicts (boolean)
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `reviewers`: Reviewers
- `reviewers[].id`: User ID (number)
- `reviewers[].username`: Username
- `reviewers[].name`: Name
- `reviewers[].state`: State
- `reviewers[].avatar_url`: Avatar (image)
- `reviewers[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `merged_by`: Merged By
- `merged_by.id`: User ID (number)
- `merged_by.username`: Username
- `merged_by.name`: Name
- `merged_by.state`: State
- `merged_by.avatar_url`: Avatar (image)
- `merged_by.web_url`: Profile URL (url)
- `merged_at`: Merged At (datetime)
- `closed_at`: Closed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `squash`: Squash on Merge (boolean)
- `force_remove_source_branch`: Delete Source Branch on Merge (boolean)
- `user_notes_count`: Comment Count (number)
- `web_url`: URL (url)
- `references`: References
- `references.full`: Full Reference

### `unapprove_merge_request`

**Unapprove Merge Request.** Withdraws the connected user's approval from a GitLab merge request. GitLab answers 404 if the user had not approved it, so a second call fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |

Output fields:

- `iid`: Merge Request IID (number)
- `approved`: Approved (boolean)
- `approvals_required`: Approvals Required (number)
- `approvals_left`: Approvals Left (number)
- `user_has_approved`: Connected User Approved (boolean)
- `user_can_approve`: Connected User Can Approve (boolean)
- `approved_by`: Approved By
- `approved_by[].user`: User
- `approved_by[].user.id`: User ID (number)
- `approved_by[].user.username`: Username
- `approved_by[].user.name`: Name
- `approved_by[].user.state`: State
- `approved_by[].user.avatar_url`: Avatar (image)
- `approved_by[].user.web_url`: Profile URL (url)
- `updated_at`: Updated At (datetime)

### `update_merge_request`

**Update Merge Request.** Changes an open GitLab merge request: title, description, target branch, close or reopen, add or remove labels, assignees, reviewers, milestone, squash and delete-source-branch settings. Only the fields you set are sent; use the Clear options to blank a field. Use Merge Merge Request to merge it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `clearDescription` | boolean | no | `false` | Clear Description. |
| `targetBranch` | string | no |  | Target Branch. |
| `stateEvent` | string | no |  | State Change. One of `"close"`, `"reopen"`. |
| `addLabels` | array | no |  | Add Labels. |
| `removeLabels` | array | no |  | Remove Labels. |
| `assigneeIds` | array | no |  | Assignee User IDs. Replaces the current assignees. |
| `clearAssignees` | boolean | no | `false` | Remove All Assignees. |
| `reviewerIds` | array | no |  | Reviewer User IDs. Replaces the current reviewers. |
| `clearReviewers` | boolean | no | `false` | Remove All Reviewers. |
| `milestoneId` | number | no |  | Milestone ID. Global milestone ID (not the iid). |
| `clearMilestone` | boolean | no | `false` | Remove Milestone. |
| `removeSourceBranch` | string | no |  | Delete Source Branch on Merge. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `squash` | string | no |  | Squash Commits on Merge. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `discussionLocked` | string | no |  | Discussion Locked. Leave empty to keep the current value. One of `"true"`, `"false"`. |

Output fields:

- `id`: Merge Request ID (number)
- `iid`: Merge Request IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `draft`: Draft (boolean)
- `source_branch`: Source Branch
- `target_branch`: Target Branch
- `sha`: Head SHA
- `merge_commit_sha`: Merge Commit SHA
- `squash_commit_sha`: Squash Commit SHA
- `detailed_merge_status`: Merge Status
- `has_conflicts`: Has Conflicts (boolean)
- `labels`: Labels
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `assignees`: Assignees
- `assignees[].id`: User ID (number)
- `assignees[].username`: Username
- `assignees[].name`: Name
- `assignees[].state`: State
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].web_url`: Profile URL (url)
- `reviewers`: Reviewers
- `reviewers[].id`: User ID (number)
- `reviewers[].username`: Username
- `reviewers[].name`: Name
- `reviewers[].state`: State
- `reviewers[].avatar_url`: Avatar (image)
- `reviewers[].web_url`: Profile URL (url)
- `milestone`: Milestone
- `milestone.id`: Milestone ID (number)
- `milestone.iid`: Milestone IID (number)
- `milestone.title`: Title
- `milestone.state`: State
- `milestone.due_date`: Due Date (date)
- `milestone.web_url`: URL (url)
- `merged_by`: Merged By
- `merged_by.id`: User ID (number)
- `merged_by.username`: Username
- `merged_by.name`: Name
- `merged_by.state`: State
- `merged_by.avatar_url`: Avatar (image)
- `merged_by.web_url`: Profile URL (url)
- `merged_at`: Merged At (datetime)
- `closed_at`: Closed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `squash`: Squash on Merge (boolean)
- `force_remove_source_branch`: Delete Source Branch on Merge (boolean)
- `user_notes_count`: Comment Count (number)
- `web_url`: URL (url)
- `references`: References
- `references.full`: Full Reference

### `create_branch`

**Create Branch.** Creates a new branch in a GitLab repository from an existing branch, tag or commit SHA. GitLab answers 400 if the branch already exists, so a second call fails; use Get Branch to check first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `branch` | string | yes |  | Branch Name. Name of the new branch. |
| `ref` | string | yes |  | Create From. Branch, tag or commit SHA to start from. |

Output fields:

- `name`: Name
- `merged`: Merged (boolean)
- `protected`: Protected (boolean)
- `default`: Default Branch (boolean)
- `developers_can_push`: Developers Can Push (boolean)
- `developers_can_merge`: Developers Can Merge (boolean)
- `can_push`: Connected User Can Push (boolean)
- `web_url`: URL (url)
- `commit`: Latest Commit
- `commit.id`: SHA
- `commit.short_id`: Short SHA
- `commit.title`: Title
- `commit.message`: Message
- `commit.author_name`: Author Name
- `commit.author_email`: Author Email (email)
- `commit.authored_date`: Authored At (datetime)
- `commit.committer_name`: Committer Name
- `commit.committed_date`: Committed At (datetime)
- `commit.parent_ids`: Parent SHAs
- `commit.web_url`: URL (url)

### `create_commit_comment`

**Add Commit Comment.** Posts a comment on a GitLab commit, either on the whole commit or on one line of a changed file (set File Path, Line and Line Type together; the line must be part of that commit's diff, otherwise GitLab posts it as a general comment and lineAnchored is false). Not idempotent: each call posts a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `sha` | string | yes |  | Commit SHA. Commit SHA, or a branch or tag name that resolves to a commit. |
| `note` | string | yes |  | Comment. |
| `path` | string | no |  | File Path. |
| `line` | number | no |  | Line. |
| `lineType` | string | no |  | Line Type. One of `"new"`, `"old"`. |

Output fields:

- `note`: Comment
- `path`: File Path
- `line`: Line (number)
- `line_type`: Line Type
- `author`: Author
- `author.id`: User ID (number)
- `author.username`: Username
- `author.name`: Name
- `author.state`: State
- `author.avatar_url`: Avatar (image)
- `author.web_url`: Profile URL (url)
- `created_at`: Created At (datetime)
- `lineAnchored`: Anchored to Line (boolean)

### `create_commit`

**Create Commit.** Creates one GitLab commit on a branch that applies several file operations together (create, update, delete, move, chmod). Set Start Branch to create the branch from another one in the same call. Not idempotent: a second call makes another commit or fails because files already exist. For a single file, Create File or Update File is simpler. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `branch` | string | yes |  | Branch. Branch to commit to. It must exist unless Start Branch is set. |
| `commitMessage` | string | yes |  | Commit Message. |
| `actions` | JSON | yes |  | File Actions. JSON array, e.g. [{"action":"create","file_path":"docs/a.md","content":"Hello"},{"action":"delete","file_path":"old.txt"}]. Each entry: action (create, update, delete, move, chmod), file_path, and as needed content, previous_path, encoding (text or base64), execute_filemode, last_commit_id. |
| `startBranch` | string | no |  | Start Branch. Create Branch from this branch first. |
| `authorName` | string | no |  | Author Name. |
| `authorEmail` | string | no |  | Author Email. |

Output fields:

- `id`: SHA
- `short_id`: Short SHA
- `title`: Title
- `message`: Message
- `author_name`: Author Name
- `author_email`: Author Email (email)
- `authored_date`: Authored At (datetime)
- `committer_name`: Committer Name
- `committed_date`: Committed At (datetime)
- `parent_ids`: Parent SHAs
- `web_url`: URL (url)
- `stats`: Stats
- `stats.additions`: Additions (number)
- `stats.deletions`: Deletions (number)
- `stats.total`: Total (number)
- `last_pipeline`: Last Pipeline
- `last_pipeline.id`: Pipeline ID (number)
- `last_pipeline.status`: Status
- `last_pipeline.web_url`: URL (url)

### `create_file`

**Create File.** Creates a new file on a branch of a GitLab repository as one commit. GitLab answers 400 if the file already exists, so a second call fails; use Update File to change it. Use Create Commit for several files at once. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `filePath` | string | yes |  | File Path. Path from the repository root, e.g. docs/readme.md. |
| `branch` | string | yes |  | Branch. Branch to commit to. It must exist unless Start Branch is set. |
| `content` | string | yes |  | Content. |
| `commitMessage` | string | yes |  | Commit Message. |
| `encoding` | string | no | `"text"` | Content Encoding. One of `"text"`, `"base64"`. |
| `startBranch` | string | no |  | Start Branch. Create Branch from this branch first. |
| `authorName` | string | no |  | Author Name. |
| `authorEmail` | string | no |  | Author Email. |

Output fields:

- `file_path`: File Path
- `branch`: Branch

### `delete_branch`

**Delete Branch.** Deletes one branch from a GitLab repository; commits only on that branch become unreachable. Protected and default branches cannot be deleted. A second call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `branch` | string | yes |  | Branch. Branch name. |

Output fields:

- `deleted`: Deleted (boolean)
- `branch`: Branch

### `delete_file`

**Delete File.** Deletes one file from a branch of a GitLab repository as a new commit. The file stays in history but is gone from the branch. A second call fails because the file no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `filePath` | string | yes |  | File Path. |
| `branch` | string | yes |  | Branch. Branch name. |
| `commitMessage` | string | yes |  | Commit Message. |
| `lastCommitId` | string | no |  | Last Commit ID. last_commit_id from Get File. The delete fails if the file changed since. |

Output fields:

- `deleted`: Deleted (boolean)
- `file_path`: File Path
- `branch`: Branch

### `get_branch`

**Get Branch.** Returns one GitLab branch by name: latest commit, whether it is merged, protected or the default branch, and push/merge permissions for the connected user. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `branch` | string | yes |  | Branch. Branch name. |

Output fields:

- `name`: Name
- `merged`: Merged (boolean)
- `protected`: Protected (boolean)
- `default`: Default Branch (boolean)
- `developers_can_push`: Developers Can Push (boolean)
- `developers_can_merge`: Developers Can Merge (boolean)
- `can_push`: Connected User Can Push (boolean)
- `web_url`: URL (url)
- `commit`: Latest Commit
- `commit.id`: SHA
- `commit.short_id`: Short SHA
- `commit.title`: Title
- `commit.message`: Message
- `commit.author_name`: Author Name
- `commit.author_email`: Author Email (email)
- `commit.authored_date`: Authored At (datetime)
- `commit.committer_name`: Committer Name
- `commit.committed_date`: Committed At (datetime)
- `commit.parent_ids`: Parent SHAs
- `commit.web_url`: URL (url)

### `get_commit_refs`

**Get Commit Branches and Tags.** Lists the branches and/or tags of a GitLab repository that contain a given commit, e.g. to check whether a fix reached a release branch. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `sha` | string | yes |  | Commit SHA. Commit SHA, or a branch or tag name that resolves to a commit. |
| `type` | string | no | `"all"` | Type. One of `"all"`, `"branch"`, `"tag"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Refs
- `items[].type`: Type
- `items[].name`: Name
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `get_commit_sequence`

**Get Commit Sequence Number.** Returns the sequence number of a GitLab commit: the count of commits reachable from it, following first parents only when that option is set. Useful for build numbers. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `sha` | string | yes |  | Commit SHA. Commit SHA, or a branch or tag name that resolves to a commit. |
| `firstParent` | string | no |  | First Parent Only. Count only first-parent commits. One of `"true"`, `"false"`. |

Output fields:

- `count`: Sequence Number (number)

### `get_commit`

**Get Commit.** Returns one GitLab commit (message, author, dates, parent SHAs, line stats, web URL) by SHA or by a branch or tag name, which resolves to its latest commit. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `sha` | string | yes |  | Commit SHA. Commit SHA, or a branch or tag name that resolves to a commit. |

Output fields:

- `id`: SHA
- `short_id`: Short SHA
- `title`: Title
- `message`: Message
- `author_name`: Author Name
- `author_email`: Author Email (email)
- `authored_date`: Authored At (datetime)
- `committer_name`: Committer Name
- `committed_date`: Committed At (datetime)
- `parent_ids`: Parent SHAs
- `web_url`: URL (url)
- `stats`: Stats
- `stats.additions`: Additions (number)
- `stats.deletions`: Deletions (number)
- `stats.total`: Total (number)
- `last_pipeline`: Last Pipeline
- `last_pipeline.id`: Pipeline ID (number)
- `last_pipeline.status`: Status
- `last_pipeline.web_url`: URL (url)

### `get_file`

**Get File.** Reads one file from a GitLab repository at a branch, tag or commit and returns its text content plus metadata (size, blob ID, last commit ID). Text over 1 MB is cut (truncated is true); binary files return isBinary true and no content. Pass last_commit_id to Update File to guard against concurrent edits. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `filePath` | string | yes |  | File Path. Path from the repository root, e.g. src/index.ts. |
| `ref` | string | yes |  | Branch, Tag or Commit. |

Output fields:

- `file_name`: File Name
- `file_path`: File Path
- `size`: Size (filesize)
- `content`: Content
- `isBinary`: Binary (boolean)
- `truncated`: Truncated (boolean)
- `ref`: Ref
- `blob_id`: Blob ID
- `commit_id`: Commit ID
- `last_commit_id`: Last Commit ID
- `content_sha256`: SHA-256

### `list_branches`

**List Branches.** Lists branches of a GitLab repository, optionally filtered by a search term (use ^term or term$ to match the start or end). Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `search` | string | no |  | Search. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Branches
- `items[].name`: Name
- `items[].merged`: Merged (boolean)
- `items[].protected`: Protected (boolean)
- `items[].default`: Default Branch (boolean)
- `items[].developers_can_push`: Developers Can Push (boolean)
- `items[].developers_can_merge`: Developers Can Merge (boolean)
- `items[].can_push`: Connected User Can Push (boolean)
- `items[].web_url`: URL (url)
- `items[].commit`: Latest Commit
- `items[].commit.id`: SHA
- `items[].commit.short_id`: Short SHA
- `items[].commit.title`: Title
- `items[].commit.message`: Message
- `items[].commit.author_name`: Author Name
- `items[].commit.author_email`: Author Email (email)
- `items[].commit.authored_date`: Authored At (datetime)
- `items[].commit.committer_name`: Committer Name
- `items[].commit.committed_date`: Committed At (datetime)
- `items[].commit.parent_ids`: Parent SHAs
- `items[].commit.web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_commit_comments`

**List Commit Comments.** Lists comments on a GitLab commit, including line comments with their file path and line. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `sha` | string | yes |  | Commit SHA. Commit SHA, or a branch or tag name that resolves to a commit. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Comments
- `items[].note`: Comment
- `items[].path`: File Path
- `items[].line`: Line (number)
- `items[].line_type`: Line Type
- `items[].author`: Author
- `items[].author.id`: User ID (number)
- `items[].author.username`: Username
- `items[].author.name`: Name
- `items[].author.state`: State
- `items[].author.avatar_url`: Avatar (image)
- `items[].author.web_url`: Profile URL (url)
- `items[].created_at`: Created At (datetime)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_commits`

**List Commits.** Lists commits in a GitLab repository, newest first, optionally limited to a branch or tag, a file path, an author and a date range. Defaults to the default branch. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `refName` | string | no |  | Branch or Tag. Defaults to the default branch. |
| `path` | string | no |  | File Path. Only commits that touch this path. |
| `author` | string | no |  | Author. Author name or email. |
| `since` | string | no |  | Since. ISO 8601 date-time. |
| `until` | string | no |  | Until. ISO 8601 date-time. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Commits
- `items[].id`: SHA
- `items[].short_id`: Short SHA
- `items[].title`: Title
- `items[].message`: Message
- `items[].author_name`: Author Name
- `items[].author_email`: Author Email (email)
- `items[].authored_date`: Authored At (datetime)
- `items[].committer_name`: Committer Name
- `items[].committed_date`: Committed At (datetime)
- `items[].parent_ids`: Parent SHAs
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_repository_tree`

**List Repository Files.** Lists files (blob) and folders (tree) in a GitLab repository at a path and branch/tag/commit, optionally recursively. Returns one page plus nextPage/hasMore. Use Get File to read a file found here. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `path` | string | no |  | Folder Path. Defaults to the repository root. |
| `ref` | string | no |  | Branch, Tag or Commit. Defaults to the default branch. |
| `recursive` | string | no |  | Recursive. Include everything below the folder. One of `"true"`, `"false"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Entries
- `items[].id`: Object ID
- `items[].name`: Name
- `items[].type`: Type
- `items[].path`: Path
- `items[].mode`: Mode
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_tags`

**List Tags.** Lists tags of a GitLab repository with their commit and release notes, optionally filtered by a search term (^term or term$ match the start or end). Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `search` | string | no |  | Search. |
| `orderBy` | string | no |  | Order By. One of `"updated"`, `"name"`, `"version"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Tags
- `items[].name`: Name
- `items[].message`: Message
- `items[].target`: Target SHA
- `items[].protected`: Protected (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].commit`: Commit
- `items[].commit.id`: SHA
- `items[].commit.short_id`: Short SHA
- `items[].commit.title`: Title
- `items[].commit.message`: Message
- `items[].commit.author_name`: Author Name
- `items[].commit.author_email`: Author Email (email)
- `items[].commit.authored_date`: Authored At (datetime)
- `items[].commit.committer_name`: Committer Name
- `items[].commit.committed_date`: Committed At (datetime)
- `items[].commit.parent_ids`: Parent SHAs
- `items[].commit.web_url`: URL (url)
- `items[].release`: Release
- `items[].release.tag_name`: Tag Name
- `items[].release.description`: Description
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `protect_branch`

**Protect Branch.** Protects a GitLab branch name or wildcard (e.g. release/*) and sets who may push and merge. Requires Maintainer role. GitLab answers 409 if it is already protected, so a second call fails; undo with Unprotect Branch. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `name` | string | yes |  | Branch or Pattern. Branch name or wildcard such as release/*. |
| `pushAccessLevel` | string | no |  | Allowed to Push. Leave empty for the GitLab default (Maintainers). One of `0`, `30`, `40`. |
| `mergeAccessLevel` | string | no |  | Allowed to Merge. Leave empty for the GitLab default (Maintainers). One of `0`, `30`, `40`. |
| `allowForcePush` | string | no |  | Allow Force Push. Leave empty for the GitLab default (no). One of `"true"`, `"false"`. |

Output fields:

- `id`: Protection ID (number)
- `name`: Branch or Pattern
- `allow_force_push`: Allow Force Push (boolean)
- `push_access_levels`: Allowed to Push
- `push_access_levels[].access_level`: Access Level (number)
- `push_access_levels[].access_level_description`: Description
- `merge_access_levels`: Allowed to Merge
- `merge_access_levels[].access_level`: Access Level (number)
- `merge_access_levels[].access_level_description`: Description

### `unprotect_branch`

**Unprotect Branch.** Removes branch protection from a GitLab branch name or wildcard, so anyone with Developer role can push, force-push or delete it. Requires Maintainer role. If the branch is not protected the call succeeds with alreadyUnprotected true. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `name` | string | yes |  | Branch or Pattern. Exactly as it was protected, e.g. release/*. |

Output fields:

- `unprotected`: Unprotected (boolean)
- `alreadyUnprotected`: Was Not Protected (boolean)
- `name`: Branch or Pattern

### `update_file`

**Update File.** Replaces the whole content of an existing file on a branch of a GitLab repository as one commit. Pass Last Commit ID (from Get File) to fail instead of overwriting someone else's newer change. Not idempotent: each call makes a new commit. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `filePath` | string | yes |  | File Path. Path from the repository root, e.g. docs/readme.md. |
| `branch` | string | yes |  | Branch. Branch to commit to. It must exist unless Start Branch is set. |
| `content` | string | yes |  | Content. |
| `commitMessage` | string | yes |  | Commit Message. |
| `encoding` | string | no | `"text"` | Content Encoding. One of `"text"`, `"base64"`. |
| `startBranch` | string | no |  | Start Branch. Create Branch from this branch first. |
| `lastCommitId` | string | no |  | Last Commit ID. last_commit_id from Get File. The update fails if the file changed since. |
| `authorName` | string | no |  | Author Name. |
| `authorEmail` | string | no |  | Author Email. |

Output fields:

- `file_path`: File Path
- `branch`: Branch

### `get_current_user`

**Get Current User.** Returns the GitLab user the connection authenticates as (ID, username, name, email, state, web URL). Use it to learn your own user ID for assignee, reviewer or author filters, or to confirm the connection works. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID (number)
- `username`: Username
- `name`: Name
- `state`: State
- `avatar_url`: Avatar (image)
- `web_url`: Profile URL (url)
- `public_email`: Public Email (email)
- `bio`: Bio
- `location`: Location
- `job_title`: Job Title
- `organization`: Organization
- `bot`: Bot (boolean)
- `created_at`: Created At (datetime)
- `email`: Email (email)
- `commit_email`: Commit Email (email)
- `last_activity_on`: Last Activity (date)
- `can_create_project`: Can Create Projects (boolean)
- `can_create_group`: Can Create Groups (boolean)

### `get_user_status`

**Get User Status.** Returns a GitLab user's status: emoji, message, availability (busy or not set) and when it clears. Leave User empty for the connected user, or pass a numeric ID or username. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User ID or Username. Leave empty for the connected user. |

Output fields:

- `emoji`: Emoji
- `message`: Message
- `availability`: Availability
- `clear_status_at`: Clears At (datetime)

### `get_user`

**Get User.** Returns a GitLab user's public profile by numeric user ID. To look a user up by username, use List Users with the Username filter instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | number | yes |  | User ID. Numeric user ID. Usernames are not accepted here. |

Output fields:

- `id`: User ID (number)
- `username`: Username
- `name`: Name
- `state`: State
- `avatar_url`: Avatar (image)
- `web_url`: Profile URL (url)
- `public_email`: Public Email (email)
- `bio`: Bio
- `location`: Location
- `job_title`: Job Title
- `organization`: Organization
- `bot`: Bot (boolean)
- `created_at`: Created At (datetime)

### `list_users`

**List Users.** Searches GitLab users by name, username or public email, or finds one user by exact username. Use it to turn a username into the numeric user ID other actions need. Set Search or Username: without either gitlab.com returns an unhelpful list of arbitrary users. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Name, username or public email. |
| `username` | string | no |  | Username. Exact username, without @. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Users
- `items[].id`: User ID (number)
- `items[].username`: Username
- `items[].name`: Name
- `items[].state`: State
- `items[].avatar_url`: Avatar (image)
- `items[].web_url`: Profile URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `set_user_status`

**Set User Status.** Sets the connected GitLab user's status emoji, message, availability and auto-clear time. Fields you leave empty keep their current value (the action reads the status first and merges); use Clear Message, Clear Emoji or Clear Whole Status to blank them. GitLab shows the speech_balloon emoji when a message has no emoji, and any earlier auto-clear time is removed unless Clear Status After is set again. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message` | string | no |  | Message. Up to 100 characters. |
| `clearMessage` | boolean | no | `false` | Clear Message. |
| `emoji` | string | no |  | Emoji. Emoji name without colons, e.g. coffee or palm_tree. |
| `clearEmoji` | boolean | no | `false` | Clear Emoji. |
| `availability` | string | no |  | Availability. One of `"busy"`, `"not_set"`. |
| `clearStatusAfter` | string | no |  | Clear Status After. One of `"30_minutes"`, `"3_hours"`, `"8_hours"`, `"1_day"`, `"3_days"`, `"7_days"`, `"30_days"`. |
| `clearAll` | boolean | no | `false` | Clear Whole Status. Removes message, emoji and availability. Other fields are ignored. |

Output fields:

- `emoji`: Emoji
- `message`: Message
- `availability`: Availability
- `clear_status_at`: Clears At (datetime)

### `cancel_job`

**Cancel Job.** Cancels one running or pending GitLab CI/CD job; it stops and cannot be resumed (a retry is a new job run). Cancelling a finished job changes nothing. Use Cancel Pipeline to stop every job of a pipeline. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `jobId` | number | yes |  | Job ID. Numeric job ID. Find it with List Pipeline Jobs. |

Output fields:

- `id`: Job ID (number)
- `name`: Name
- `stage`: Stage
- `status`: Status
- `ref`: Ref
- `tag`: Is Tag (boolean)
- `allow_failure`: Allow Failure (boolean)
- `created_at`: Created At (datetime)
- `started_at`: Started At (datetime)
- `finished_at`: Finished At (datetime)
- `erased_at`: Erased At (datetime)
- `duration`: Duration (seconds) (number)
- `queued_duration`: Queued (seconds) (number)
- `user`: User
- `user.id`: User ID (number)
- `user.username`: Username
- `user.name`: Name
- `user.state`: State
- `user.avatar_url`: Avatar (image)
- `user.web_url`: Profile URL (url)
- `commit`: Commit
- `commit.id`: SHA
- `commit.short_id`: Short SHA
- `commit.title`: Title
- `pipeline`: Pipeline
- `pipeline.id`: Pipeline ID (number)
- `pipeline.ref`: Ref
- `pipeline.status`: Status
- `web_url`: URL (url)

### `cancel_pipeline`

**Cancel Pipeline.** Cancels a running or pending GitLab pipeline; its unfinished jobs stop and cannot be resumed (Retry Pipeline starts the failed and canceled jobs again as new runs). Cancelling a finished pipeline changes nothing and returns it as is. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `pipelineId` | number | yes |  | Pipeline ID. Numeric pipeline ID (not the pipeline IID). Find it with List Pipelines. |

Output fields:

- `id`: Pipeline ID (number)
- `iid`: Pipeline IID (number)
- `project_id`: Project ID (number)
- `status`: Status
- `source`: Source
- `ref`: Ref
- `sha`: Commit SHA
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `web_url`: URL (url)
- `before_sha`: Before SHA
- `tag`: Is Tag (boolean)
- `yaml_errors`: YAML Errors
- `user`: Triggered By
- `user.id`: User ID (number)
- `user.username`: Username
- `user.name`: Name
- `user.state`: State
- `user.avatar_url`: Avatar (image)
- `user.web_url`: Profile URL (url)
- `started_at`: Started At (datetime)
- `finished_at`: Finished At (datetime)
- `committed_at`: Committed At (datetime)
- `duration`: Duration (seconds) (number)
- `queued_duration`: Queued (seconds) (number)
- `coverage`: Coverage
- `detailed_status`: Detailed Status
- `detailed_status.text`: Text
- `detailed_status.label`: Label
- `detailed_status.group`: Group

### `create_pipeline`

**Run Pipeline.** Starts a new GitLab CI/CD pipeline on a branch or tag, optionally with pipeline variables. Every call starts another pipeline. Returns the pipeline ID; follow it with Get Pipeline or List Pipeline Jobs. The project needs a .gitlab-ci.yml on that ref. Variables are refused (400 Insufficient permissions) unless the project CI/CD setting allows the connected user role to set pipeline variables; new gitlab.com projects allow no one by default. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `ref` | string | yes |  | Branch or Tag. Branch or tag to run the pipeline on. |
| `variables` | object | no |  | Variables. Pipeline variables as name to value, e.g. DEPLOY_ENV = staging. |

Output fields:

- `id`: Pipeline ID (number)
- `iid`: Pipeline IID (number)
- `project_id`: Project ID (number)
- `status`: Status
- `source`: Source
- `ref`: Ref
- `sha`: Commit SHA
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `web_url`: URL (url)
- `before_sha`: Before SHA
- `tag`: Is Tag (boolean)
- `yaml_errors`: YAML Errors
- `user`: Triggered By
- `user.id`: User ID (number)
- `user.username`: Username
- `user.name`: Name
- `user.state`: State
- `user.avatar_url`: Avatar (image)
- `user.web_url`: Profile URL (url)
- `started_at`: Started At (datetime)
- `finished_at`: Finished At (datetime)
- `committed_at`: Committed At (datetime)
- `duration`: Duration (seconds) (number)
- `queued_duration`: Queued (seconds) (number)
- `coverage`: Coverage
- `detailed_status`: Detailed Status
- `detailed_status.text`: Text
- `detailed_status.label`: Label
- `detailed_status.group`: Group

### `delete_pipeline`

**Delete Pipeline.** Permanently deletes a GitLab pipeline together with its jobs, job logs and artifacts; it cannot be restored. Requires the Owner role. A second call fails with not found. Use Cancel Pipeline to only stop it. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `pipelineId` | number | yes |  | Pipeline ID. Numeric pipeline ID (not the pipeline IID). Find it with List Pipelines. |

Output fields:

- `deleted`: Deleted (boolean)
- `pipelineId`: Pipeline ID (number)

### `erase_job`

**Erase Job.** Permanently erases the console log and artifacts of a finished GitLab CI/CD job; they cannot be restored. The job record stays with erased_at set. Fails on a running job, and a second call on the same job fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `jobId` | number | yes |  | Job ID. Numeric job ID. Find it with List Pipeline Jobs. |

Output fields:

- `id`: Job ID (number)
- `name`: Name
- `stage`: Stage
- `status`: Status
- `ref`: Ref
- `tag`: Is Tag (boolean)
- `allow_failure`: Allow Failure (boolean)
- `created_at`: Created At (datetime)
- `started_at`: Started At (datetime)
- `finished_at`: Finished At (datetime)
- `erased_at`: Erased At (datetime)
- `duration`: Duration (seconds) (number)
- `queued_duration`: Queued (seconds) (number)
- `user`: User
- `user.id`: User ID (number)
- `user.username`: Username
- `user.name`: Name
- `user.state`: State
- `user.avatar_url`: Avatar (image)
- `user.web_url`: Profile URL (url)
- `commit`: Commit
- `commit.id`: SHA
- `commit.short_id`: Short SHA
- `commit.title`: Title
- `pipeline`: Pipeline
- `pipeline.id`: Pipeline ID (number)
- `pipeline.ref`: Ref
- `pipeline.status`: Status
- `web_url`: URL (url)

### `get_job_log`

**Get Job Log.** Returns the console log (trace) of a GitLab CI/CD job, keeping only the last Max Characters (default 20000, up to 100000) because errors are usually at the end, with terminal color codes removed; truncated says whether the start was cut. Use to explain why a job failed. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `jobId` | number | yes |  | Job ID. Numeric job ID. Find it with List Pipeline Jobs. |
| `maxChars` | number | no |  | Max Characters. Characters kept from the end of the log. Default 20000, max 100000. |

Output fields:

- `jobId`: Job ID (number)
- `log`: Log
- `truncated`: Truncated (boolean)
- `totalLength`: Full Log Length (characters) (number)

### `get_job`

**Get Job.** Returns one GitLab CI/CD job by its numeric ID: name, stage, status, failure reason, timings, commit and pipeline. Use Get Job Log for its console output. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `jobId` | number | yes |  | Job ID. Numeric job ID. Find it with List Pipeline Jobs. |

Output fields:

- `id`: Job ID (number)
- `name`: Name
- `stage`: Stage
- `status`: Status
- `ref`: Ref
- `tag`: Is Tag (boolean)
- `allow_failure`: Allow Failure (boolean)
- `created_at`: Created At (datetime)
- `started_at`: Started At (datetime)
- `finished_at`: Finished At (datetime)
- `erased_at`: Erased At (datetime)
- `duration`: Duration (seconds) (number)
- `queued_duration`: Queued (seconds) (number)
- `user`: User
- `user.id`: User ID (number)
- `user.username`: Username
- `user.name`: Name
- `user.state`: State
- `user.avatar_url`: Avatar (image)
- `user.web_url`: Profile URL (url)
- `commit`: Commit
- `commit.id`: SHA
- `commit.short_id`: Short SHA
- `commit.title`: Title
- `pipeline`: Pipeline
- `pipeline.id`: Pipeline ID (number)
- `pipeline.ref`: Ref
- `pipeline.status`: Status
- `web_url`: URL (url)

### `get_pipeline`

**Get Pipeline.** Returns one GitLab CI/CD pipeline by its numeric ID: status (created, pending, running, success, failed, canceled, skipped, manual), ref, SHA, who triggered it, timings and URL. Use List Pipeline Jobs for its jobs. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `pipelineId` | number | yes |  | Pipeline ID. Numeric pipeline ID (not the pipeline IID). Find it with List Pipelines. |

Output fields:

- `id`: Pipeline ID (number)
- `iid`: Pipeline IID (number)
- `project_id`: Project ID (number)
- `status`: Status
- `source`: Source
- `ref`: Ref
- `sha`: Commit SHA
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `web_url`: URL (url)
- `before_sha`: Before SHA
- `tag`: Is Tag (boolean)
- `yaml_errors`: YAML Errors
- `user`: Triggered By
- `user.id`: User ID (number)
- `user.username`: Username
- `user.name`: Name
- `user.state`: State
- `user.avatar_url`: Avatar (image)
- `user.web_url`: Profile URL (url)
- `started_at`: Started At (datetime)
- `finished_at`: Finished At (datetime)
- `committed_at`: Committed At (datetime)
- `duration`: Duration (seconds) (number)
- `queued_duration`: Queued (seconds) (number)
- `coverage`: Coverage
- `detailed_status`: Detailed Status
- `detailed_status.text`: Text
- `detailed_status.label`: Label
- `detailed_status.group`: Group

### `list_pipeline_jobs`

**List Pipeline Jobs.** Lists the jobs of one GitLab pipeline with their stage and status, optionally filtered by status. Returns one page plus nextPage/hasMore. Use to find a job ID for Get Job Log, Play Manual Job, Cancel Job or Erase Job. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `pipelineId` | number | yes |  | Pipeline ID. Numeric pipeline ID (not the pipeline IID). Find it with List Pipelines. |
| `scope` | array | no |  | Statuses. Only jobs in these statuses. Leave empty for all. One of `"created"`, `"pending"`, `"running"`, `"failed"`, `"success"`, `"canceled"`, `"skipped"`, `"waiting_for_resource"`, `"manual"`. |
| `includeRetried` | string | no |  | Include Retried Jobs. Leave empty to hide earlier attempts of retried jobs. One of `"true"`, `"false"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Jobs
- `items[].id`: Job ID (number)
- `items[].name`: Name
- `items[].stage`: Stage
- `items[].status`: Status
- `items[].ref`: Ref
- `items[].tag`: Is Tag (boolean)
- `items[].allow_failure`: Allow Failure (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].started_at`: Started At (datetime)
- `items[].finished_at`: Finished At (datetime)
- `items[].erased_at`: Erased At (datetime)
- `items[].duration`: Duration (seconds) (number)
- `items[].queued_duration`: Queued (seconds) (number)
- `items[].user`: User
- `items[].user.id`: User ID (number)
- `items[].user.username`: Username
- `items[].user.name`: Name
- `items[].user.state`: State
- `items[].user.avatar_url`: Avatar (image)
- `items[].user.web_url`: Profile URL (url)
- `items[].commit`: Commit
- `items[].commit.id`: SHA
- `items[].commit.short_id`: Short SHA
- `items[].commit.title`: Title
- `items[].pipeline`: Pipeline
- `items[].pipeline.id`: Pipeline ID (number)
- `items[].pipeline.ref`: Ref
- `items[].pipeline.status`: Status
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_pipelines`

**List Pipelines.** Lists GitLab CI/CD pipelines of a project with optional filters (status, branch or tag, commit SHA, source, triggering username, updated after/before). Returns one page plus nextPage/hasMore. Use to find a pipeline ID for Get Pipeline, Retry Pipeline or Cancel Pipeline. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `status` | string | no |  | Status. One of `"created"`, `"waiting_for_resource"`, `"preparing"`, `"pending"`, `"running"`, `"success"`, `"failed"`, `"canceled"`, `"skipped"`, `"manual"`, `"scheduled"`. |
| `ref` | string | no |  | Branch or Tag. |
| `sha` | string | no |  | Commit SHA. |
| `source` | string | no |  | Source. e.g. push, web, api, schedule, merge_request_event. |
| `username` | string | no |  | Triggered By Username. |
| `updatedAfter` | string | no |  | Updated After. ISO 8601 date-time. |
| `updatedBefore` | string | no |  | Updated Before. ISO 8601 date-time. |
| `orderBy` | string | no |  | Order By. One of `"id"`, `"status"`, `"ref"`, `"updated_at"`, `"user_id"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Pipelines
- `items[].id`: Pipeline ID (number)
- `items[].iid`: Pipeline IID (number)
- `items[].project_id`: Project ID (number)
- `items[].status`: Status
- `items[].source`: Source
- `items[].ref`: Ref
- `items[].sha`: Commit SHA
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `play_manual_job`

**Play Manual Job.** Starts a GitLab CI/CD job that waits for a manual action (status manual), e.g. a deploy step, optionally with job variables. Only works on manual jobs; a job that already ran fails with a 400 or 403. Find manual jobs with List Pipeline Jobs filtered to manual. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `jobId` | number | yes |  | Job ID. Numeric job ID. Find it with List Pipeline Jobs. |
| `variables` | object | no |  | Job Variables. Variables as name to value for this run. |

Output fields:

- `id`: Job ID (number)
- `name`: Name
- `stage`: Stage
- `status`: Status
- `ref`: Ref
- `tag`: Is Tag (boolean)
- `allow_failure`: Allow Failure (boolean)
- `created_at`: Created At (datetime)
- `started_at`: Started At (datetime)
- `finished_at`: Finished At (datetime)
- `erased_at`: Erased At (datetime)
- `duration`: Duration (seconds) (number)
- `queued_duration`: Queued (seconds) (number)
- `user`: User
- `user.id`: User ID (number)
- `user.username`: Username
- `user.name`: Name
- `user.state`: State
- `user.avatar_url`: Avatar (image)
- `user.web_url`: Profile URL (url)
- `commit`: Commit
- `commit.id`: SHA
- `commit.short_id`: Short SHA
- `commit.title`: Title
- `pipeline`: Pipeline
- `pipeline.id`: Pipeline ID (number)
- `pipeline.ref`: Ref
- `pipeline.status`: Status
- `web_url`: URL (url)

### `retry_pipeline`

**Retry Pipeline.** Retries the failed or canceled jobs of a GitLab pipeline as new job runs in the same pipeline. Each call queues new job runs, so do not repeat it while the pipeline is still running. Use Run Pipeline to start a fresh pipeline instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `pipelineId` | number | yes |  | Pipeline ID. Numeric pipeline ID (not the pipeline IID). Find it with List Pipelines. |

Output fields:

- `id`: Pipeline ID (number)
- `iid`: Pipeline IID (number)
- `project_id`: Project ID (number)
- `status`: Status
- `source`: Source
- `ref`: Ref
- `sha`: Commit SHA
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `web_url`: URL (url)
- `before_sha`: Before SHA
- `tag`: Is Tag (boolean)
- `yaml_errors`: YAML Errors
- `user`: Triggered By
- `user.id`: User ID (number)
- `user.username`: Username
- `user.name`: Name
- `user.state`: State
- `user.avatar_url`: Avatar (image)
- `user.web_url`: Profile URL (url)
- `started_at`: Started At (datetime)
- `finished_at`: Finished At (datetime)
- `committed_at`: Committed At (datetime)
- `duration`: Duration (seconds) (number)
- `queued_duration`: Queued (seconds) (number)
- `coverage`: Coverage
- `detailed_status`: Detailed Status
- `detailed_status.text`: Text
- `detailed_status.label`: Label
- `detailed_status.group`: Group

### `archive_project`

**Archive Project.** Archives a GitLab project: it becomes read-only (no pushes, issues, merge requests or pipelines) and is hidden from default lists. Requires Maintainer or Owner role. Archiving an archived project changes nothing. Undo with Unarchive Project. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |

Output fields:

- `id`: Project ID (number)
- `name`: Name
- `name_with_namespace`: Name With Namespace
- `path`: Path
- `path_with_namespace`: Full Path
- `description`: Description
- `default_branch`: Default Branch
- `star_count`: Stars (number)
- `forks_count`: Forks (number)
- `topics`: Topics
- `namespace`: Namespace
- `namespace.id`: Namespace ID (number)
- `namespace.name`: Name
- `namespace.path`: Path
- `namespace.kind`: Kind
- `namespace.full_path`: Full Path
- `namespace.web_url`: URL (url)
- `created_at`: Created At (datetime)
- `last_activity_at`: Last Activity (datetime)
- `http_url_to_repo`: HTTP Clone URL (url)
- `ssh_url_to_repo`: SSH Clone URL
- `web_url`: URL (url)
- `visibility`: Visibility
- `archived`: Archived (boolean)
- `import_status`: Import Status

### `create_project`

**Create Project.** Creates a new GitLab project (repository) in the connected user namespace, or in a group when Namespace ID is set. Give a name, a path or both. Each call creates another project; a name or path already taken fails with 400. Visibility follows the GitLab default when empty. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Display name. Required unless Path is set. |
| `path` | string | no |  | Path. URL slug. Defaults to the name. |
| `namespaceId` | number | no |  | Namespace ID. Numeric ID of the group to create the project in (Get Group returns it). Empty = your personal namespace. |
| `description` | string | no |  | Description. |
| `visibility` | string | no |  | Visibility. Leave empty for the GitLab default. One of `"private"`, `"internal"`, `"public"`. |
| `initializeWithReadme` | boolean | no | `false` | Initialize With README. Create a first commit with a README. |
| `defaultBranch` | string | no |  | Default Branch. Only applied together with Initialize With README. |

Output fields:

- `id`: Project ID (number)
- `name`: Name
- `name_with_namespace`: Name With Namespace
- `path`: Path
- `path_with_namespace`: Full Path
- `description`: Description
- `default_branch`: Default Branch
- `star_count`: Stars (number)
- `forks_count`: Forks (number)
- `topics`: Topics
- `namespace`: Namespace
- `namespace.id`: Namespace ID (number)
- `namespace.name`: Name
- `namespace.path`: Path
- `namespace.kind`: Kind
- `namespace.full_path`: Full Path
- `namespace.web_url`: URL (url)
- `created_at`: Created At (datetime)
- `last_activity_at`: Last Activity (datetime)
- `http_url_to_repo`: HTTP Clone URL (url)
- `ssh_url_to_repo`: SSH Clone URL
- `web_url`: URL (url)
- `visibility`: Visibility
- `archived`: Archived (boolean)
- `import_status`: Import Status

### `delete_project`

**Delete Project.** Deletes a GitLab project with its repository, issues, merge requests and pipelines. On gitlab.com the project is first marked for deletion and removed after the retention period (an Owner can restore it in the UI until then). Requires the Owner role. Use Archive Project to make it read-only instead. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |

Output fields:

- `deletionRequested`: Deletion Requested (boolean)
- `projectId`: Project ID or Path
- `message`: GitLab Message

### `fork_project`

**Fork Project.** Forks a GitLab project into the connected user namespace or a target group. The copy runs in the background: the result has import_status (scheduled, started, finished); poll Get Project on the new ID until it is finished. A second fork into the same namespace with the same path fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric ID or full path of the project to fork. |
| `namespaceId` | number | no |  | Target Namespace ID. Numeric ID of the group to fork into. Empty = your personal namespace. |
| `namespacePath` | string | no |  | Target Namespace Path. Full path of the group to fork into. Use instead of Target Namespace ID. |
| `name` | string | no |  | New Name. |
| `path` | string | no |  | New Path. |
| `description` | string | no |  | Description. |
| `visibility` | string | no |  | Visibility. Leave empty to copy the source visibility. One of `"private"`, `"internal"`, `"public"`. |

Output fields:

- `id`: Project ID (number)
- `name`: Name
- `name_with_namespace`: Name With Namespace
- `path`: Path
- `path_with_namespace`: Full Path
- `description`: Description
- `default_branch`: Default Branch
- `star_count`: Stars (number)
- `forks_count`: Forks (number)
- `topics`: Topics
- `namespace`: Namespace
- `namespace.id`: Namespace ID (number)
- `namespace.name`: Name
- `namespace.path`: Path
- `namespace.kind`: Kind
- `namespace.full_path`: Full Path
- `namespace.web_url`: URL (url)
- `created_at`: Created At (datetime)
- `last_activity_at`: Last Activity (datetime)
- `http_url_to_repo`: HTTP Clone URL (url)
- `ssh_url_to_repo`: SSH Clone URL
- `web_url`: URL (url)
- `visibility`: Visibility
- `archived`: Archived (boolean)
- `import_status`: Import Status

### `get_project_languages`

**Get Project Languages.** Returns the programming languages detected in a GitLab project repository with the percentage of code in each, largest first. Empty for an empty repository. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |

Output fields:

- `languages`: Languages
- `languages[].language`: Language
- `languages[].percentage`: Percentage (number)
- `count`: Language Count (number)

### `get_project_member`

**Get Project Member.** Returns one user membership in a GitLab project with the access level. By default only direct members are found; set Include Inherited to also find members who get access through a parent or shared group. Not found means the user is not a member. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `userId` | number | yes |  | User ID. Numeric GitLab user ID. Find it with List Users. |
| `includeInherited` | string | no |  | Include Inherited. Also match members inherited from groups. One of `"true"`, `"false"`. |

Output fields:

- `id`: User ID (number)
- `username`: Username
- `name`: Name
- `state`: State
- `avatar_url`: Avatar (image)
- `web_url`: Profile URL (url)
- `access_level`: Access Level (number)
- `expires_at`: Expires At (date)
- `created_at`: Added At (datetime)
- `membership_state`: Membership State

### `get_project`

**Get Project.** Returns one GitLab project by numeric ID or full path (group/project): name, numeric ID, namespace, default branch, visibility, archived flag, stars, forks and clone URLs. Use it to turn a path into the numeric project ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |

Output fields:

- `id`: Project ID (number)
- `name`: Name
- `name_with_namespace`: Name With Namespace
- `path`: Path
- `path_with_namespace`: Full Path
- `description`: Description
- `default_branch`: Default Branch
- `star_count`: Stars (number)
- `forks_count`: Forks (number)
- `topics`: Topics
- `namespace`: Namespace
- `namespace.id`: Namespace ID (number)
- `namespace.name`: Name
- `namespace.path`: Path
- `namespace.kind`: Kind
- `namespace.full_path`: Full Path
- `namespace.web_url`: URL (url)
- `created_at`: Created At (datetime)
- `last_activity_at`: Last Activity (datetime)
- `http_url_to_repo`: HTTP Clone URL (url)
- `ssh_url_to_repo`: SSH Clone URL
- `web_url`: URL (url)
- `visibility`: Visibility
- `archived`: Archived (boolean)
- `import_status`: Import Status

### `import_project_members`

**Import Project Members.** Copies the direct members of a source GitLab project into a target project with their roles; the source must be given as a numeric project ID. Members who cannot be added are listed in errors with the reason, and status is error when any failed. Running it again with the same members succeeded unchanged in testing. Requires Maintainer role on the target. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric ID or full path of the project that receives the members. |
| `sourceProjectId` | number | yes |  | Source Project ID. Numeric ID of the project to copy the members from (a path is rejected by GitLab). Get Project returns it. |

Output fields:

- `status`: Status
- `sourceProjectId`: Source Project ID (number)
- `errors`: Per-User Errors
- `errors[].user`: User
- `errors[].message`: Message

### `list_group_projects`

**List Group Projects.** Lists the projects in a GitLab group, optionally including its subgroups, with search, archived and visibility filters. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID or Path. Numeric group ID or full path, e.g. `my-group/sub-group`. |
| `search` | string | no |  | Search. Matches project name and path. |
| `includeSubgroups` | string | no |  | Include Subgroups. Also list projects in subgroups. One of `"true"`, `"false"`. |
| `archived` | string | no |  | Archived. Yes = only archived, No = only active, empty = both. One of `"true"`, `"false"`. |
| `visibility` | string | no |  | Visibility. Only projects with this visibility. One of `"private"`, `"internal"`, `"public"`. |
| `orderBy` | string | no |  | Order By. One of `"created_at"`, `"last_activity_at"`, `"name"`, `"path"`, `"updated_at"`, `"id"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID (number)
- `items[].name`: Name
- `items[].name_with_namespace`: Name With Namespace
- `items[].path`: Path
- `items[].path_with_namespace`: Full Path
- `items[].description`: Description
- `items[].default_branch`: Default Branch
- `items[].star_count`: Stars (number)
- `items[].forks_count`: Forks (number)
- `items[].topics`: Topics
- `items[].namespace`: Namespace
- `items[].namespace.id`: Namespace ID (number)
- `items[].namespace.name`: Name
- `items[].namespace.path`: Path
- `items[].namespace.kind`: Kind
- `items[].namespace.full_path`: Full Path
- `items[].namespace.web_url`: URL (url)
- `items[].created_at`: Created At (datetime)
- `items[].last_activity_at`: Last Activity (datetime)
- `items[].http_url_to_repo`: HTTP Clone URL (url)
- `items[].ssh_url_to_repo`: SSH Clone URL
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_project_groups`

**List Project Ancestor Groups.** Lists the ancestor groups of a GitLab project (its parent group chain), and with Include Shared Groups also the groups it is shared with. Returns one page plus nextPage/hasMore. Use List Project Invited Groups for only the shared groups. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `search` | string | no |  | Search. Text to match against names. |
| `withShared` | string | no |  | Include Shared Groups. Also list groups the project is shared with. One of `"true"`, `"false"`. |
| `sharedMinAccessLevel` | string | no |  | Shared Minimum Access Level. Only shared groups with at least this access. One of `10`, `15`, `20`, `30`, `40`, `50`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Groups
- `items[].id`: Group ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].full_path`: Full Path
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_project_invited_groups`

**List Project Invited Groups.** Lists the groups a GitLab project is shared with (invited groups), with optional name search and minimum access level. Returns one page plus nextPage/hasMore. Share a project with Share Project With Group. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `search` | string | no |  | Search. Text to match against names. |
| `minAccessLevel` | string | no |  | Minimum Access Level. Only groups where the connected user has at least this access. One of `10`, `15`, `20`, `30`, `40`, `50`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Groups
- `items[].id`: Group ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].full_path`: Full Path
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_project_members`

**List Project Members.** Lists every member of a GitLab project with their access level (10 Guest, 20 Reporter, 30 Developer, 40 Maintainer, 50 Owner), including members inherited from parent groups and shared groups. Optional name search. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `query` | string | no |  | Search. Matches name, username or public email. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Members
- `items[].id`: User ID (number)
- `items[].username`: Username
- `items[].name`: Name
- `items[].state`: State
- `items[].avatar_url`: Avatar (image)
- `items[].web_url`: Profile URL (url)
- `items[].access_level`: Access Level (number)
- `items[].expires_at`: Expires At (date)
- `items[].created_at`: Added At (datetime)
- `items[].membership_state`: Membership State
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_project_share_locations`

**List Project Share Locations.** Lists the groups the connected user may share a GitLab project with. Returns one page plus nextPage/hasMore. Use to find a group ID for Share Project With Group. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `search` | string | no |  | Search. Text to match against names. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Groups
- `items[].id`: Group ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].full_path`: Full Path
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_project_transfer_locations`

**List Project Transfer Locations.** Lists the groups the connected user may transfer (move) a GitLab project to. Read-only; it does not move anything. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `search` | string | no |  | Search. Text to match against names. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Groups
- `items[].id`: Group ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].full_path`: Full Path
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_project_users`

**List Project Users.** Lists the users of a GitLab project (everyone who can be assigned or mentioned there), with optional name or username search, without roles. Returns one page plus nextPage/hasMore. Use List Project Members to see access levels. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `search` | string | no |  | Search. Matches name and username. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Users
- `items[].id`: User ID (number)
- `items[].username`: Username
- `items[].name`: Name
- `items[].state`: State
- `items[].avatar_url`: Avatar (image)
- `items[].web_url`: Profile URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_projects`

**List Projects.** Lists GitLab projects the connected user is a member of (Member Only defaults to yes), with optional name search, owned-only, archived and visibility filters. Member Only can be set to no only together with Search or Owned Only, because gitlab.com would otherwise return every public project. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Matches project name and path. |
| `membership` | string | no |  | Member Only. Defaults to yes. Set to no only together with Search or Owned Only. One of `"true"`, `"false"`. |
| `owned` | string | no |  | Owned Only. Only projects owned by the connected user. One of `"true"`, `"false"`. |
| `archived` | string | no |  | Archived. Yes = only archived, No = only active, empty = both. One of `"true"`, `"false"`. |
| `visibility` | string | no |  | Visibility. Only projects with this visibility. One of `"private"`, `"internal"`, `"public"`. |
| `orderBy` | string | no |  | Order By. One of `"created_at"`, `"last_activity_at"`, `"name"`, `"path"`, `"updated_at"`, `"id"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID (number)
- `items[].name`: Name
- `items[].name_with_namespace`: Name With Namespace
- `items[].path`: Path
- `items[].path_with_namespace`: Full Path
- `items[].description`: Description
- `items[].default_branch`: Default Branch
- `items[].star_count`: Stars (number)
- `items[].forks_count`: Forks (number)
- `items[].topics`: Topics
- `items[].namespace`: Namespace
- `items[].namespace.id`: Namespace ID (number)
- `items[].namespace.name`: Name
- `items[].namespace.path`: Path
- `items[].namespace.kind`: Kind
- `items[].namespace.full_path`: Full Path
- `items[].namespace.web_url`: URL (url)
- `items[].created_at`: Created At (datetime)
- `items[].last_activity_at`: Last Activity (datetime)
- `items[].http_url_to_repo`: HTTP Clone URL (url)
- `items[].ssh_url_to_repo`: SSH Clone URL
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_user_projects`

**List User Projects.** Lists GitLab projects in a given user personal namespace that the connected user can see, with optional search, archived and visibility filters. Takes a numeric user ID (find it with List Users). Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | number | yes |  | User ID. Numeric GitLab user ID. Find it with List Users. |
| `search` | string | no |  | Search. Matches project name and path. |
| `archived` | string | no |  | Archived. Yes = only archived, No = only active, empty = both. One of `"true"`, `"false"`. |
| `visibility` | string | no |  | Visibility. Only projects with this visibility. One of `"private"`, `"internal"`, `"public"`. |
| `orderBy` | string | no |  | Order By. One of `"created_at"`, `"last_activity_at"`, `"name"`, `"path"`, `"updated_at"`, `"id"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID (number)
- `items[].name`: Name
- `items[].name_with_namespace`: Name With Namespace
- `items[].path`: Path
- `items[].path_with_namespace`: Full Path
- `items[].description`: Description
- `items[].default_branch`: Default Branch
- `items[].star_count`: Stars (number)
- `items[].forks_count`: Forks (number)
- `items[].topics`: Topics
- `items[].namespace`: Namespace
- `items[].namespace.id`: Namespace ID (number)
- `items[].namespace.name`: Name
- `items[].namespace.path`: Path
- `items[].namespace.kind`: Kind
- `items[].namespace.full_path`: Full Path
- `items[].namespace.web_url`: URL (url)
- `items[].created_at`: Created At (datetime)
- `items[].last_activity_at`: Last Activity (datetime)
- `items[].http_url_to_repo`: HTTP Clone URL (url)
- `items[].ssh_url_to_repo`: SSH Clone URL
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `share_project_with_group`

**Share Project With Group.** Shares a GitLab project with a group so its members get the chosen access level, optionally until an expiry date. Find candidate groups with List Project Share Locations. Sharing with a group that already has access fails with 409. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `groupId` | number | yes |  | Group ID. Numeric ID of the group to share with. |
| `groupAccess` | string | yes |  | Access Level. Role the group members get in the project. One of `10`, `15`, `20`, `30`, `40`, `50`. |
| `expiresAt` | string | no |  | Expires At. YYYY-MM-DD. Empty = no expiry. |

Output fields:

- `id`: Link ID (number)
- `project_id`: Project ID (number)
- `group_id`: Group ID (number)
- `group_access`: Access Level (number)
- `expires_at`: Expires At (date)

### `star_project`

**Star Project.** Stars a GitLab project for the connected user. If it is already starred the call succeeds with unchanged true. Undo with Unstar Project. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |

Output fields:

- `starred`: Starred (boolean)
- `unchanged`: Already In This State (boolean)
- `projectId`: Project ID (number)
- `path_with_namespace`: Full Path
- `star_count`: Stars (number)

### `unarchive_project`

**Unarchive Project.** Unarchives an archived GitLab project so pushes, issues, merge requests and pipelines work again. Requires Maintainer or Owner role. Unarchiving an active project changes nothing. Reverses Archive Project. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |

Output fields:

- `id`: Project ID (number)
- `name`: Name
- `name_with_namespace`: Name With Namespace
- `path`: Path
- `path_with_namespace`: Full Path
- `description`: Description
- `default_branch`: Default Branch
- `star_count`: Stars (number)
- `forks_count`: Forks (number)
- `topics`: Topics
- `namespace`: Namespace
- `namespace.id`: Namespace ID (number)
- `namespace.name`: Name
- `namespace.path`: Path
- `namespace.kind`: Kind
- `namespace.full_path`: Full Path
- `namespace.web_url`: URL (url)
- `created_at`: Created At (datetime)
- `last_activity_at`: Last Activity (datetime)
- `http_url_to_repo`: HTTP Clone URL (url)
- `ssh_url_to_repo`: SSH Clone URL
- `web_url`: URL (url)
- `visibility`: Visibility
- `archived`: Archived (boolean)
- `import_status`: Import Status

### `unstar_project`

**Unstar Project.** Removes the connected user star from a GitLab project. If it is not starred the call succeeds with unchanged true. Reverses Star Project. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |

Output fields:

- `starred`: Starred (boolean)
- `unchanged`: Already In This State (boolean)
- `projectId`: Project ID (number)
- `path_with_namespace`: Full Path
- `star_count`: Stars (number)

### `create_group`

**Create Group.** Creates a GitLab group, or a subgroup when Parent Group ID is set. On gitlab.com new top-level groups usually cannot be created through the API, so create subgroups under a group where the connected user is Owner or Maintainer. A path already taken fails with 400. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `path` | string | yes |  | Path. URL slug, e.g. my-team. |
| `parentId` | number | no |  | Parent Group ID. Numeric ID of the parent group, for a subgroup. |
| `description` | string | no |  | Description. |
| `visibility` | string | no |  | Visibility. Leave empty for the GitLab default. A subgroup cannot be more visible than its parent. One of `"private"`, `"internal"`, `"public"`. |

Output fields:

- `id`: Group ID (number)
- `name`: Name
- `full_name`: Full Name
- `full_path`: Full Path
- `web_url`: URL (url)
- `path`: Path
- `description`: Description
- `visibility`: Visibility
- `parent_id`: Parent Group ID (number)
- `created_at`: Created At (datetime)

### `delete_group`

**Delete Group.** Deletes a GitLab group together with all its subgroups and projects. On gitlab.com the group is first marked for deletion and removed after the retention period (an Owner can restore it in the UI until then). Requires the Owner role. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID or Path. Numeric group ID or full path, e.g. `my-group/sub-group`. |

Output fields:

- `deletionRequested`: Deletion Requested (boolean)
- `groupId`: Group ID or Path
- `message`: GitLab Message

### `get_group_member`

**Get Group Member.** Returns one user direct membership in a GitLab group with the access level (10 Guest, 20 Reporter, 30 Developer, 40 Maintainer, 50 Owner). Members inherited from a parent group are not found here; use List Group Members with Include Inherited for those. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID or Path. Numeric group ID or full path, e.g. `my-group/sub-group`. |
| `userId` | number | yes |  | User ID. Numeric GitLab user ID. Find it with List Users. |

Output fields:

- `id`: User ID (number)
- `username`: Username
- `name`: Name
- `state`: State
- `avatar_url`: Avatar (image)
- `web_url`: Profile URL (url)
- `access_level`: Access Level (number)
- `expires_at`: Expires At (date)
- `created_at`: Added At (datetime)
- `membership_state`: Membership State

### `get_group`

**Get Group.** Returns one GitLab group by numeric ID or full path: name, numeric ID, full path, visibility, parent group and URL. Use it to turn a group path into the numeric ID other actions need. Use List Group Projects for its projects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID or Path. Numeric group ID or full path, e.g. `my-group/sub-group`. |

Output fields:

- `id`: Group ID (number)
- `name`: Name
- `full_name`: Full Name
- `full_path`: Full Path
- `web_url`: URL (url)
- `path`: Path
- `description`: Description
- `visibility`: Visibility
- `parent_id`: Parent Group ID (number)
- `created_at`: Created At (datetime)

### `list_group_billable_members`

**List Group Billable Members.** Lists the billable members (used seats) of a top-level GitLab group, including members of its subgroups and projects, with last activity. Only works on a top-level group and requires the Owner role. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID or Path. Numeric ID or path of a top-level group. |
| `search` | string | no |  | Search. Matches name, username or email. |
| `sort` | string | no |  | Sort. One of `"last_activity_on_desc"`, `"last_activity_on_asc"`, `"name_asc"`, `"name_desc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Billable Members
- `items[].id`: User ID (number)
- `items[].username`: Username
- `items[].name`: Name
- `items[].state`: State
- `items[].avatar_url`: Avatar (image)
- `items[].web_url`: Profile URL (url)
- `items[].last_activity_on`: Last Activity (date)
- `items[].membership_type`: Membership Type
- `items[].removable`: Removable (boolean)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_group_members`

**List Group Members.** Lists members of a GitLab group with their access level. Only direct members by default; set Include Inherited to add members inherited from parent groups. Optional name search. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID or Path. Numeric group ID or full path, e.g. `my-group/sub-group`. |
| `includeInherited` | string | no |  | Include Inherited. Also list members inherited from parent groups. One of `"true"`, `"false"`. |
| `query` | string | no |  | Search. Matches name, username or public email. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Members
- `items[].id`: User ID (number)
- `items[].username`: Username
- `items[].name`: Name
- `items[].state`: State
- `items[].avatar_url`: Avatar (image)
- `items[].web_url`: Profile URL (url)
- `items[].access_level`: Access Level (number)
- `items[].expires_at`: Expires At (date)
- `items[].created_at`: Added At (datetime)
- `items[].membership_state`: Membership State
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_group_pending_members`

**List Group Pending Members.** Lists members of a top-level GitLab group (and its subgroups and projects) that are awaiting Owner approval, for example because of a user cap, including pending email invitations. Requires the Owner role on a top-level group. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID or Path. Numeric ID or path of a top-level group. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Pending Members
- `items[].id`: Member ID (number)
- `items[].username`: Username
- `items[].name`: Name
- `items[].email`: Invited Email (email)
- `items[].invited`: Invited (boolean)
- `items[].approved`: Approved (boolean)
- `items[].web_url`: Profile URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_groups`

**List Groups.** Lists GitLab groups and subgroups the connected user is a member of, with optional search, owned-only, top-level-only and minimum access level filters. Search can miss a group created moments ago; use Get Group by path for that. Returns one page plus nextPage/hasMore. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Matches group name and path. |
| `owned` | string | no |  | Owned Only. Only groups the connected user owns. One of `"true"`, `"false"`. |
| `topLevelOnly` | string | no |  | Top-Level Only. Hide subgroups. One of `"true"`, `"false"`. |
| `minAccessLevel` | string | no |  | Minimum Access Level. Only groups where the connected user has at least this role. One of `10`, `15`, `20`, `30`, `40`, `50`. |
| `orderBy` | string | no |  | Order By. One of `"name"`, `"path"`, `"id"`. |
| `sort` | string | no |  | Sort. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Groups
- `items[].id`: Group ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].full_path`: Full Path
- `items[].web_url`: URL (url)
- `items[].path`: Path
- `items[].description`: Description
- `items[].visibility`: Visibility
- `items[].parent_id`: Parent Group ID (number)
- `items[].created_at`: Created At (datetime)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `update_group`

**Update Group.** Changes a GitLab group name, path, description or visibility. Only the fields you set are sent; use Clear Description to blank it. Changing the path changes the URL of the group and of every project in it. Requires the Owner role. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID or Path. Numeric group ID or full path, e.g. `my-group/sub-group`. |
| `name` | string | no |  | Name. |
| `path` | string | no |  | Path. New URL slug. Changes every project URL in the group. |
| `description` | string | no |  | Description. |
| `clearDescription` | boolean | no | `false` | Clear Description. |
| `visibility` | string | no |  | Visibility. Leave empty to keep the current value. One of `"private"`, `"internal"`, `"public"`. |

Output fields:

- `id`: Group ID (number)
- `name`: Name
- `full_name`: Full Name
- `full_path`: Full Path
- `web_url`: URL (url)
- `path`: Path
- `description`: Description
- `visibility`: Visibility
- `parent_id`: Parent Group ID (number)
- `created_at`: Created At (datetime)

### `create_label`

**Create Label.** Creates a project label with a name and color, optionally a description and priority. A label with the same name already in the project fails with 409; check List Labels first. Apply labels to issues with Update Issue. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `name` | string | yes |  | Name. |
| `color` | string | yes |  | Color. Hex color such as #FF0000, or a CSS color name. |
| `description` | string | no |  | Description. |
| `priority` | number | no |  | Priority. Whole number, 0 or more; lower sorts first. Empty = no priority. |

Output fields:

- `id`: Label ID (number)
- `name`: Name
- `color`: Color
- `text_color`: Text Color
- `description`: Description
- `priority`: Priority (number)
- `is_project_label`: Project Label (boolean)
- `subscribed`: Subscribed (boolean)

### `create_milestone`

**Create Milestone.** Creates a GitLab project milestone with a title and optional description, start date and due date. A title already used in the project fails with 400; check List Milestones first. The result id (not iid) is what Update Issue and the other milestone actions take. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. |
| `startDate` | string | no |  | Start Date. YYYY-MM-DD. |
| `dueDate` | string | no |  | Due Date. YYYY-MM-DD. |

Output fields:

- `id`: Milestone ID (number)
- `iid`: Milestone IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `start_date`: Start Date (date)
- `due_date`: Due Date (date)
- `expired`: Expired (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `web_url`: URL (url)

### `delete_label`

**Delete Label.** Permanently deletes a GitLab project label and removes it from every issue and merge request that has it; it cannot be restored. A second call fails with not found. Group labels cannot be deleted here. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `labelId` | string | yes |  | Label ID or Name. Numeric label ID or the exact label name. |

Output fields:

- `deleted`: Deleted (boolean)
- `label`: Label ID or Name

### `delete_milestone`

**Delete Milestone.** Permanently deletes a GitLab project milestone by its global id and unsets it on every issue and merge request; it cannot be restored. Requires the Planner, Reporter or higher role. A second call fails with not found. Use Update Milestone to close it instead. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `milestoneId` | number | yes |  | Milestone ID. The global milestone `id` (not the `iid` shown in the GitLab UI). Find it with List Milestones. |

Output fields:

- `deleted`: Deleted (boolean)
- `milestoneId`: Milestone ID (number)

### `get_label`

**Get Label.** Returns one GitLab project label by numeric ID or exact name: color, description, priority and whether it is a project or group label. Group labels are found when Include Group Labels is yes. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `labelId` | string | yes |  | Label ID or Name. Numeric label ID or the exact label name. |
| `includeAncestorGroups` | string | no |  | Include Group Labels. Also look in labels inherited from parent groups. One of `"true"`, `"false"`. |

Output fields:

- `id`: Label ID (number)
- `name`: Name
- `color`: Color
- `text_color`: Text Color
- `description`: Description
- `priority`: Priority (number)
- `is_project_label`: Project Label (boolean)
- `subscribed`: Subscribed (boolean)

### `get_milestone`

**Get Milestone.** Returns one GitLab project milestone by its global id (not the iid shown in the UI): title, description, state, start and due dates, expired flag and URL. Find the id with List Milestones. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `milestoneId` | number | yes |  | Milestone ID. The global milestone `id` (not the `iid` shown in the GitLab UI). Find it with List Milestones. |

Output fields:

- `id`: Milestone ID (number)
- `iid`: Milestone IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `start_date`: Start Date (date)
- `due_date`: Due Date (date)
- `expired`: Expired (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `web_url`: URL (url)

### `list_labels`

**List Labels.** Lists the labels available in a GitLab project, including labels inherited from parent groups unless Include Group Labels is no, with optional name search. Returns one page plus nextPage/hasMore. Use to check a label exists before Create Label or Update Issue. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `search` | string | no |  | Search. Matches the label name. |
| `includeAncestorGroups` | string | no |  | Include Group Labels. Leave empty for the GitLab default (yes). One of `"true"`, `"false"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Labels
- `items[].id`: Label ID (number)
- `items[].name`: Name
- `items[].color`: Color
- `items[].text_color`: Text Color
- `items[].description`: Description
- `items[].priority`: Priority (number)
- `items[].is_project_label`: Project Label (boolean)
- `items[].subscribed`: Subscribed (boolean)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `list_milestones`

**List Milestones.** Lists GitLab project milestones with optional state (active or closed), exact title and text search filters. Returns one page plus nextPage/hasMore. Each item has the global id (used by Get Milestone, Update Milestone and Update Issue) and the iid. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `state` | string | no |  | State. One of `"active"`, `"closed"`. |
| `title` | string | no |  | Exact Title. |
| `search` | string | no |  | Search. Matches title and description. |
| `includeAncestors` | string | no |  | Include Group Milestones. Also list milestones of parent groups. One of `"true"`, `"false"`. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Milestones
- `items[].id`: Milestone ID (number)
- `items[].iid`: Milestone IID (number)
- `items[].project_id`: Project ID (number)
- `items[].title`: Title
- `items[].description`: Description
- `items[].state`: State
- `items[].start_date`: Start Date (date)
- `items[].due_date`: Due Date (date)
- `items[].expired`: Expired (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].web_url`: URL (url)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `update_label`

**Update Label.** Changes a GitLab project label: new name, color, description or priority. Only the fields you set are sent; use the Clear options to remove the description or priority. Renaming updates the label on every issue and merge request that has it. Group labels cannot be changed here. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `labelId` | string | yes |  | Label ID or Name. Numeric label ID or the exact label name. |
| `newName` | string | no |  | New Name. |
| `color` | string | no |  | Color. Hex color such as #FF0000, or a CSS color name. |
| `description` | string | no |  | Description. |
| `clearDescription` | boolean | no | `false` | Clear Description. |
| `priority` | number | no |  | Priority. Whole number, 0 or more. |
| `clearPriority` | boolean | no | `false` | Remove Priority. |

Output fields:

- `id`: Label ID (number)
- `name`: Name
- `color`: Color
- `text_color`: Text Color
- `description`: Description
- `priority`: Priority (number)
- `is_project_label`: Project Label (boolean)
- `subscribed`: Subscribed (boolean)

### `update_milestone`

**Update Milestone.** Changes a GitLab project milestone: title, description, start and due dates, or closes / reactivates it. Takes the global milestone id. Only the fields you set are sent; use the Clear options to blank the description or a date. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `milestoneId` | number | yes |  | Milestone ID. The global milestone `id` (not the `iid` shown in the GitLab UI). Find it with List Milestones. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `clearDescription` | boolean | no | `false` | Clear Description. |
| `startDate` | string | no |  | Start Date. YYYY-MM-DD. |
| `clearStartDate` | boolean | no | `false` | Clear Start Date. |
| `dueDate` | string | no |  | Due Date. YYYY-MM-DD. |
| `clearDueDate` | boolean | no | `false` | Clear Due Date. |
| `stateEvent` | string | no |  | State Change. One of `"close"`, `"activate"`. |

Output fields:

- `id`: Milestone ID (number)
- `iid`: Milestone IID (number)
- `project_id`: Project ID (number)
- `title`: Title
- `description`: Description
- `state`: State
- `start_date`: Start Date (date)
- `due_date`: Due Date (date)
- `expired`: Expired (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `web_url`: URL (url)

### `create_project_webhook`

**Create Project Webhook.** Adds a webhook to a GitLab project that POSTs to a URL on the events set to yes (push events default to yes in GitLab, the rest to no). No secret token is set here so it never lands in run history; add one in GitLab if the receiver needs it. Each call adds another webhook, even for the same URL; check List Project Webhooks first. Requires Maintainer role. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `url` | string | yes |  | URL. Address GitLab will POST events to. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `pushEventsBranchFilter` | string | no |  | Push Branch Filter. Only push events for branches matching this wildcard, e.g. main or release/*. |
| `enableSslVerification` | string | no |  | SSL Verification. Leave empty for the GitLab default (yes). One of `"true"`, `"false"`. |
| `pushEvents` | string | no |  | Push Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `tagPushEvents` | string | no |  | Tag Push Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `issuesEvents` | string | no |  | Issue Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `confidentialIssuesEvents` | string | no |  | Confidential Issue Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `mergeRequestsEvents` | string | no |  | Merge Request Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `noteEvents` | string | no |  | Comment Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `pipelineEvents` | string | no |  | Pipeline Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `jobEvents` | string | no |  | Job Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `releasesEvents` | string | no |  | Release Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |
| `wikiPageEvents` | string | no |  | Wiki Page Events. Leave empty for the GitLab default. One of `"true"`, `"false"`. |

Output fields:

- `id`: Webhook ID (number)
- `url`: URL (url)
- `name`: Name
- `description`: Description
- `project_id`: Project ID (number)
- `push_events`: Push Events (boolean)
- `push_events_branch_filter`: Push Branch Filter
- `issues_events`: Issue Events (boolean)
- `confidential_issues_events`: Confidential Issue Events (boolean)
- `merge_requests_events`: Merge Request Events (boolean)
- `tag_push_events`: Tag Push Events (boolean)
- `note_events`: Comment Events (boolean)
- `job_events`: Job Events (boolean)
- `pipeline_events`: Pipeline Events (boolean)
- `wiki_page_events`: Wiki Page Events (boolean)
- `releases_events`: Release Events (boolean)
- `enable_ssl_verification`: SSL Verification (boolean)
- `created_at`: Created At (datetime)

### `delete_project_webhook`

**Delete Project Webhook.** Permanently deletes a GitLab project webhook so its URL stops receiving events; it cannot be restored. Deleting a webhook created by an Activepieces trigger breaks that trigger until it is re-enabled, so check the URL with Get Project Webhook first. A second call fails with not found. Requires Maintainer role. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `hookId` | number | yes |  | Webhook ID. Numeric webhook ID. Find it with List Project Webhooks. |

Output fields:

- `deleted`: Deleted (boolean)
- `hookId`: Webhook ID (number)

### `get_project_webhook`

**Get Project Webhook.** Returns one GitLab project webhook by numeric ID: URL, name, which events it fires on, branch filter and SSL verification. The secret token is never returned. Requires Maintainer role. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `hookId` | number | yes |  | Webhook ID. Numeric webhook ID. Find it with List Project Webhooks. |

Output fields:

- `id`: Webhook ID (number)
- `url`: URL (url)
- `name`: Name
- `description`: Description
- `project_id`: Project ID (number)
- `push_events`: Push Events (boolean)
- `push_events_branch_filter`: Push Branch Filter
- `issues_events`: Issue Events (boolean)
- `confidential_issues_events`: Confidential Issue Events (boolean)
- `merge_requests_events`: Merge Request Events (boolean)
- `tag_push_events`: Tag Push Events (boolean)
- `note_events`: Comment Events (boolean)
- `job_events`: Job Events (boolean)
- `pipeline_events`: Pipeline Events (boolean)
- `wiki_page_events`: Wiki Page Events (boolean)
- `releases_events`: Release Events (boolean)
- `enable_ssl_verification`: SSL Verification (boolean)
- `created_at`: Created At (datetime)

### `list_project_webhooks`

**List Project Webhooks.** Lists the webhooks of a GitLab project with their URL and enabled events (secret tokens are never returned), including the ones Activepieces triggers created. Returns one page plus nextPage/hasMore. Requires Maintainer role. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `page` | number | no |  | Page. Page number to fetch, starting at 1. Use `nextPage` from the previous result to continue. |
| `perPage` | number | no |  | Per Page. Items per page, 1 to 100. Defaults to 20. |

Output fields:

- `items`: Webhooks
- `items[].id`: Webhook ID (number)
- `items[].url`: URL (url)
- `items[].name`: Name
- `items[].description`: Description
- `items[].project_id`: Project ID (number)
- `items[].push_events`: Push Events (boolean)
- `items[].push_events_branch_filter`: Push Branch Filter
- `items[].issues_events`: Issue Events (boolean)
- `items[].confidential_issues_events`: Confidential Issue Events (boolean)
- `items[].merge_requests_events`: Merge Request Events (boolean)
- `items[].tag_push_events`: Tag Push Events (boolean)
- `items[].note_events`: Comment Events (boolean)
- `items[].job_events`: Job Events (boolean)
- `items[].pipeline_events`: Pipeline Events (boolean)
- `items[].wiki_page_events`: Wiki Page Events (boolean)
- `items[].releases_events`: Release Events (boolean)
- `items[].enable_ssl_verification`: SSL Verification (boolean)
- `items[].created_at`: Created At (datetime)
- `count`: Items on This Page (number)
- `page`: Page (number)
- `nextPage`: Next Page (number)
- `hasMore`: Has More (boolean)
- `total`: Total (number)

### `update_project_webhook`

**Update Project Webhook.** Changes a GitLab project webhook: URL, name, description, branch filter, SSL verification and which events fire it. URL is required (GitLab needs it on every update; pass the current one to keep it). Only the other fields you set are sent; use Clear Fields to remove a description or branch filter. The secret token is not managed here. Changing a webhook created by an Activepieces trigger can stop that trigger. Requires Maintainer role. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `hookId` | number | yes |  | Webhook ID. Numeric webhook ID. Find it with List Project Webhooks. |
| `url` | string | yes |  | URL. Address GitLab will POST events to. Enter the current URL to keep it. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `pushEventsBranchFilter` | string | no |  | Push Branch Filter. Only push events for branches matching this wildcard, e.g. main or release/*. |
| `enableSslVerification` | string | no |  | SSL Verification. Leave empty for the GitLab default (yes). One of `"true"`, `"false"`. |
| `clearFields` | array | no |  | Clear Fields. Settings to remove from the webhook. One of `"description"`, `"push_events_branch_filter"`. |
| `pushEvents` | string | no |  | Push Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `tagPushEvents` | string | no |  | Tag Push Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `issuesEvents` | string | no |  | Issue Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `confidentialIssuesEvents` | string | no |  | Confidential Issue Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `mergeRequestsEvents` | string | no |  | Merge Request Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `noteEvents` | string | no |  | Comment Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `pipelineEvents` | string | no |  | Pipeline Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `jobEvents` | string | no |  | Job Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `releasesEvents` | string | no |  | Release Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `wikiPageEvents` | string | no |  | Wiki Page Events. Leave empty to keep the current value. One of `"true"`, `"false"`. |

Output fields:

- `id`: Webhook ID (number)
- `url`: URL (url)
- `name`: Name
- `description`: Description
- `project_id`: Project ID (number)
- `push_events`: Push Events (boolean)
- `push_events_branch_filter`: Push Branch Filter
- `issues_events`: Issue Events (boolean)
- `confidential_issues_events`: Confidential Issue Events (boolean)
- `merge_requests_events`: Merge Request Events (boolean)
- `tag_push_events`: Tag Push Events (boolean)
- `note_events`: Comment Events (boolean)
- `job_events`: Job Events (boolean)
- `pipeline_events`: Pipeline Events (boolean)
- `wiki_page_events`: Wiki Page Events (boolean)
- `releases_events`: Release Events (boolean)
- `enable_ssl_verification`: SSL Verification (boolean)
- `created_at`: Created At (datetime)

### `get_merge_request_approval_state`

**Get Merge Request Approval Rules.** Returns the approval rules that apply to a GitLab merge request (eligible approvers, approvals required per rule, who approved, whether each rule is met). Rules are a GitLab Premium or Ultimate feature; on Free the list is empty or the call fails with 403 or 404, so use Get Merge Request Approvals there. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID or Path. Numeric project ID or full path, e.g. `my-group/my-project`. Shown on the project overview page. |
| `mergeRequestIid` | number | yes |  | Merge Request IID. The merge request number inside the project (the `iid`, shown as !12 in GitLab), not the global ID. |

Output fields:

- `approval_rules_overwritten`: Rules Overridden On This Merge Request (boolean)
- `rules`: Approval Rules
- `rules[].id`: Rule ID (number)
- `rules[].name`: Name
- `rules[].rule_type`: Rule Type
- `rules[].approvals_required`: Approvals Required (number)
- `rules[].approved`: Approved (boolean)
- `rules[].approved_by`: Approved By
- `rules[].approved_by[].id`: User ID (number)
- `rules[].approved_by[].username`: Username
- `rules[].approved_by[].name`: Name
- `rules[].approved_by[].state`: State
- `rules[].approved_by[].avatar_url`: Avatar (image)
- `rules[].approved_by[].web_url`: Profile URL (url)
- `rules[].eligible_approvers`: Eligible Approvers
- `rules[].eligible_approvers[].id`: User ID (number)
- `rules[].eligible_approvers[].username`: Username
- `rules[].eligible_approvers[].name`: Name
- `rules[].eligible_approvers[].state`: State
- `rules[].eligible_approvers[].avatar_url`: Avatar (image)
- `rules[].eligible_approvers[].web_url`: Profile URL (url)

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
