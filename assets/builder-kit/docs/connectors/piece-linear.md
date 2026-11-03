# Linear

Issue tracking for modern software teams

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-linear'
  version: '0.9.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
>
> 1. In Linear, open **Settings** from the workspace menu at the top left.
> 2. Go to **Security & access**.
> 3. Under **Personal API keys**, enter a label and click **Create key**.
> 4. Copy the key (it starts with `lin_api_`) and paste it here.
>
> Triggers need a key created by a workspace admin.

## Actions

### `linear_create_issue`

**Create Issue.** Creates a new issue in a Linear team, with optional assignee, status, labels, priority, template, project, cycle, parent issue (its identifier such as ENG-123, its ID, or its exact title), due date (YYYY-MM-DD) and estimate (points). Use to file a task, bug, or work item. Requires a team ID and title; not idempotent, each call creates a distinct issue. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. The team the issue is created in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. Markdown is supported. |
| `state_id` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `priority_id` | string | no |  | Priority. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee_id` | string | no |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |
| `labels` | array | no |  | Labels. Values the product loads from the provider, such as ids; write an array of them. |
| `template_id` | string | no |  | Template. Prefills the issue from one of the team's templates. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | no |  | Project. The project to add the issue to. A value the product loads from the provider, such as an id; write the value itself. |
| `cycle_id` | string | no |  | Cycle. Current and upcoming cycles of the selected team. A value the product loads from the provider, such as an id; write the value itself. |
| `parent_id` | string | no |  | Parent Issue. The parent's key, ID or exact title. |
| `due_date` | ISO date-time string | no |  | Due Date. Only the day is used; the time is ignored. |
| `estimate` | number | no |  | Estimate. Points on the team's estimate scale. Needs estimates turned on. |

Output fields:

- `success`: Success (boolean)
- `lastSyncId`: Last Sync ID (number)
- `issue`: Issue
- `issue.id`: Issue ID
- `issue.identifier`: Identifier
- `issue.number`: Number (number)
- `issue.title`: Title
- `issue.description`: Description
- `issue.url`: URL (url)
- `issue.priority`: Priority (number)
- `issue.priorityLabel`: Priority Label
- `issue.estimate`: Estimate (number)
- `issue.dueDate`: Due Date (date)
- `issue.branchName`: Git Branch Name
- `issue.createdAt`: Created At (datetime)
- `issue.updatedAt`: Updated At (datetime)
- `issue.startedAt`: Started At (datetime)
- `issue.completedAt`: Completed At (datetime)
- `issue.canceledAt`: Canceled At (datetime)
- `issue._team`: Team
- `issue._team.id`: ID
- `issue._state`: Status
- `issue._state.id`: ID
- `issue._assignee`: Assignee
- `issue._assignee.id`: ID
- `issue._creator`: Creator
- `issue._creator.id`: ID
- `issue._project`: Project
- `issue._project.id`: ID
- `issue._projectMilestone`: Milestone
- `issue._projectMilestone.id`: ID
- `issue._cycle`: Cycle
- `issue._cycle.id`: ID
- `issue._parent`: Parent Issue
- `issue._parent.id`: ID

### `linear_update_issue`

**Update Issue.** Updates an existing Linear issue identified by its issue ID, changing fields such as title, description, assignee, status, labels, priority, project, cycle, parent issue (its identifier such as ENG-123, its ID, or its exact title), due date (YYYY-MM-DD) or estimate (points). Use to modify an issue already created. Only the provided fields are changed; repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. The issue's team. Its issues, statuses and labels are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_id` | string | yes |  | Issue. Type a key or title words to find older issues. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `state_id` | string | no |  | Status. A value the product loads from the provider, such as an id; write the value itself. |
| `priority_id` | string | no |  | Priority. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee_id` | string | no |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |
| `labels` | array | no |  | Labels. Replaces all of the issue's current labels. Values the product loads from the provider, such as ids; write an array of them. |
| `project_id` | string | no |  | Project. The project to move the issue to. A value the product loads from the provider, such as an id; write the value itself. |
| `cycle_id` | string | no |  | Cycle. Current and upcoming cycles of the selected team. A value the product loads from the provider, such as an id; write the value itself. |
| `parent_id` | string | no |  | Parent Issue. The parent's key, ID or exact title. |
| `due_date` | ISO date-time string | no |  | Due Date. Only the day is used; the time is ignored. |
| `estimate` | number | no |  | Estimate. Points on the team's estimate scale. Needs estimates turned on. |

Output fields:

- `success`: Success (boolean)
- `lastSyncId`: Last Sync ID (number)
- `issue`: Issue
- `issue.id`: Issue ID
- `issue.identifier`: Identifier
- `issue.number`: Number (number)
- `issue.title`: Title
- `issue.description`: Description
- `issue.url`: URL (url)
- `issue.priority`: Priority (number)
- `issue.priorityLabel`: Priority Label
- `issue.estimate`: Estimate (number)
- `issue.dueDate`: Due Date (date)
- `issue.branchName`: Git Branch Name
- `issue.createdAt`: Created At (datetime)
- `issue.updatedAt`: Updated At (datetime)
- `issue.startedAt`: Started At (datetime)
- `issue.completedAt`: Completed At (datetime)
- `issue.canceledAt`: Canceled At (datetime)
- `issue._team`: Team
- `issue._team.id`: ID
- `issue._state`: Status
- `issue._state.id`: ID
- `issue._assignee`: Assignee
- `issue._assignee.id`: ID
- `issue._creator`: Creator
- `issue._creator.id`: ID
- `issue._project`: Project
- `issue._project.id`: ID
- `issue._projectMilestone`: Milestone
- `issue._projectMilestone.id`: ID
- `issue._cycle`: Cycle
- `issue._cycle.id`: ID
- `issue._parent`: Parent Issue
- `issue._parent.id`: ID

### `linear_create_project`

**Create Project.** Creates a new project under a Linear team, with optional description, icon, color, start/target dates, and status. Use to set up a new project to group issues. Requires a team ID and project name; not idempotent, each call creates a distinct project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. The team the project is created in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `icon` | string | no |  | Icon. |
| `color` | string | no |  | Color. A hex color code. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `targetDate` | ISO date-time string | no |  | Target Date. |
| `state` | string | no |  | Status. Leave empty to use the default status. One of `"backlog"`, `"planned"`, `"started"`, `"paused"`, `"completed"`, `"canceled"`. |

Output fields:

- `success`: Success (boolean)
- `lastSyncId`: Last Sync ID (number)
- `project`: Project
- `project.id`: Project ID
- `project.name`: Name
- `project.description`: Description
- `project.color`: Color
- `project.icon`: Icon
- `project.state`: State
- `project.startDate`: Start Date (date)
- `project.targetDate`: Target Date (date)
- `project.progress`: Progress (number)
- `project.url`: URL (url)
- `project.createdAt`: Created At (datetime)
- `project.updatedAt`: Updated At (datetime)

### `linear_update_project`

**Update Project.** Updates an existing Linear project identified by its project ID, changing fields such as name, description, icon, color, start/target dates, or status, and adds the selected team to the project without removing its other teams. Use to modify a project already created. Repeating the same update is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. Added to the project's teams if it is not one already. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. The project to change. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `icon` | string | no |  | Icon. |
| `color` | string | no |  | Color. A hex color code. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `targetDate` | ISO date-time string | no |  | Target Date. |
| `state` | string | no |  | Status. One of `"backlog"`, `"planned"`, `"started"`, `"paused"`, `"completed"`, `"canceled"`. |

Output fields:

- `success`: Success (boolean)
- `lastSyncId`: Last Sync ID (number)
- `project`: Project
- `project.id`: Project ID
- `project.name`: Name
- `project.description`: Description
- `project.color`: Color
- `project.icon`: Icon
- `project.state`: State
- `project.startDate`: Start Date (date)
- `project.targetDate`: Target Date (date)
- `project.progress`: Progress (number)
- `project.url`: URL (url)
- `project.createdAt`: Created At (datetime)
- `project.updatedAt`: Updated At (datetime)

### `linear_create_comment`

**Create Comment.** Posts a new comment on a Linear issue identified by its issue ID. Use to add a note, reply, or status update to an existing issue. Requires the issue ID and comment body; not idempotent, each call appends a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. The issue's team, used to list its issues. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | no |  | Assignee. Not used. Comments are always posted as the API key's owner. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_id` | string | yes |  | Issue. Type a key or title words to find older issues. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Comment. Markdown is supported. |

Output fields:

- `success`: Success (boolean)
- `lastSyncId`: Last Sync ID (number)
- `comment`: Comment
- `comment.id`: Comment ID
- `comment.body`: Body (Markdown)
- `comment.url`: URL (url)
- `comment.createdAt`: Created At (datetime)
- `comment.updatedAt`: Updated At (datetime)
- `comment._issue`: Issue
- `comment._issue.id`: ID
- `comment._user`: Author
- `comment._user.id`: ID

### `linear_get_issue`

**Get Issue.** Fetches one Linear issue by its UUID or its human identifier such as ENG-123, returning status, team, assignee, project, cycle, parent and labels. Use when a flow already holds an issue reference (from Slack, email or GitHub) and needs its current details; use Search Issues to find issues by text. Read-only and idempotent. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. The key shown on the issue in Linear, or the issue ID. |

Output fields:

- `id`: Issue ID
- `identifier`: Identifier
- `number`: Number (number)
- `title`: Title
- `description`: Description
- `url`: URL (url)
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `estimate`: Estimate (number)
- `due_date`: Due Date (date)
- `branch_name`: Git Branch Name
- `state_id`: Status ID
- `state_name`: Status
- `state_type`: Status Type
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `assignee_id`: Assignee ID
- `assignee_name`: Assignee Name
- `assignee_email`: Assignee Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `creator_email`: Creator Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `project_milestone_id`: Milestone ID
- `project_milestone_name`: Milestone Name
- `cycle_id`: Cycle ID
- `cycle_number`: Cycle Number (number)
- `cycle_name`: Cycle Name
- `parent_id`: Parent Issue ID
- `parent_identifier`: Parent Identifier
- `parent_title`: Parent Title
- `label_ids`: Label IDs
- `label_names`: Labels
- `labels_complete`: All Labels Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_search_issues`

**Search Issues.** Runs a Linear full-text and semantic search over issue titles and descriptions (optionally comments), optionally limited to one team, and returns the best matches first. When has_next_page is true, pass end_cursor as cursor to get the next page. Use to find an existing issue before creating a duplicate; use Get Issue when the identifier is already known. Linear limits search to 30 requests per minute, and a just-created issue can take a moment to appear. Read-only and idempotent. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Search Text. |
| `team_id` | string | no |  | Team. Only return issues from this team. Empty: every team. A value the product loads from the provider, such as an id; write the value itself. |
| `include_comments` | boolean | no | `false` | Include Comments. Also match words in issue comments. |
| `include_archived` | boolean | no | `false` | Include Archived Issues. |
| `limit` | number | no | `25` | Max Results. How many issues to return, up to 100. Empty: 25. |
| `cursor` | string | no |  | Cursor. The end_cursor of the previous search. Empty: first page. |

Output fields:

- `items`: Issues
- `items[].id`: Issue ID
- `items[].identifier`: Identifier
- `items[].number`: Number (number)
- `items[].title`: Title
- `items[].description`: Description
- `items[].url`: URL (url)
- `items[].priority`: Priority (number)
- `items[].priority_label`: Priority Label
- `items[].estimate`: Estimate (number)
- `items[].due_date`: Due Date (date)
- `items[].branch_name`: Git Branch Name
- `items[].state_id`: Status ID
- `items[].state_name`: Status
- `items[].state_type`: Status Type
- `items[].team_id`: Team ID
- `items[].team_key`: Team Key
- `items[].team_name`: Team Name
- `items[].assignee_id`: Assignee ID
- `items[].assignee_name`: Assignee Name
- `items[].assignee_email`: Assignee Email (email)
- `items[].creator_id`: Creator ID
- `items[].creator_name`: Creator Name
- `items[].creator_email`: Creator Email (email)
- `items[].project_id`: Project ID
- `items[].project_name`: Project Name
- `items[].project_milestone_id`: Milestone ID
- `items[].project_milestone_name`: Milestone Name
- `items[].cycle_id`: Cycle ID
- `items[].cycle_number`: Cycle Number (number)
- `items[].cycle_name`: Cycle Name
- `items[].parent_id`: Parent Issue ID
- `items[].parent_identifier`: Parent Identifier
- `items[].parent_title`: Parent Title
- `items[].label_ids`: Label IDs
- `items[].label_names`: Labels
- `items[].labels_complete`: All Labels Loaded (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].started_at`: Started At (datetime)
- `items[].completed_at`: Completed At (datetime)
- `items[].canceled_at`: Canceled At (datetime)
- `items[].archived_at`: Archived At (datetime)
- `items[].trashed`: In Trash (boolean)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor
- `total_count`: Total Matches (number)

### `linear_add_label_to_issue`

**Add Label to Issue.** Adds one label to a Linear issue and keeps every label it already has. Use instead of Update Issue, whose Labels field replaces the whole label set. Needs the issue and the label ID (team or workspace label). Idempotent: adding a label the issue already has changes nothing. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. Only used to list labels. Pick the issue's team. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_id` | string | yes |  | Issue. The key shown on the issue in Linear, or the issue ID. |
| `label_id` | string | yes |  | Label. Labels of the selected team, then workspace labels. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Issue ID
- `identifier`: Identifier
- `number`: Number (number)
- `title`: Title
- `description`: Description
- `url`: URL (url)
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `estimate`: Estimate (number)
- `due_date`: Due Date (date)
- `branch_name`: Git Branch Name
- `state_id`: Status ID
- `state_name`: Status
- `state_type`: Status Type
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `assignee_id`: Assignee ID
- `assignee_name`: Assignee Name
- `assignee_email`: Assignee Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `creator_email`: Creator Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `project_milestone_id`: Milestone ID
- `project_milestone_name`: Milestone Name
- `cycle_id`: Cycle ID
- `cycle_number`: Cycle Number (number)
- `cycle_name`: Cycle Name
- `parent_id`: Parent Issue ID
- `parent_identifier`: Parent Identifier
- `parent_title`: Parent Title
- `label_ids`: Label IDs
- `label_names`: Labels
- `labels_complete`: All Labels Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_remove_label_from_issue`

**Remove Label from Issue.** Removes one label from a Linear issue and keeps its other labels; the label itself is not deleted. Use instead of Update Issue, whose Labels field replaces the whole label set. Needs the issue and the label ID. Idempotent: removing a label the issue does not have changes nothing. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. Only used to list labels. Pick the issue's team. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_id` | string | yes |  | Issue. The key shown on the issue in Linear, or the issue ID. |
| `label_id` | string | yes |  | Label. Labels of the selected team, then workspace labels. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Issue ID
- `identifier`: Identifier
- `number`: Number (number)
- `title`: Title
- `description`: Description
- `url`: URL (url)
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `estimate`: Estimate (number)
- `due_date`: Due Date (date)
- `branch_name`: Git Branch Name
- `state_id`: Status ID
- `state_name`: Status
- `state_type`: Status Type
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `assignee_id`: Assignee ID
- `assignee_name`: Assignee Name
- `assignee_email`: Assignee Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `creator_email`: Creator Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `project_milestone_id`: Milestone ID
- `project_milestone_name`: Milestone Name
- `cycle_id`: Cycle ID
- `cycle_number`: Cycle Number (number)
- `cycle_name`: Cycle Name
- `parent_id`: Parent Issue ID
- `parent_identifier`: Parent Identifier
- `parent_title`: Parent Title
- `label_ids`: Label IDs
- `label_names`: Labels
- `labels_complete`: All Labels Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_delete_issue`

**Delete Issue.** Moves a Linear issue to the trash, where Linear keeps it for 30 days before deleting it for good; it is never deleted permanently by this action. Use for cleanup or de-duplication flows; to hide a finished issue without deleting it, archive it instead. Not idempotent: a second call on the same issue may fail because it is already in the trash. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. The key shown on the issue in Linear, or the issue ID. |

Output fields:

- `success`: Success (boolean)
- `id`: Issue ID
- `identifier`: Identifier
- `title`: Title
- `url`: URL (url)
- `trashed`: In Trash (boolean)
- `archived_at`: Archived At (datetime)

### `linear_attach_link`

**Attach Link to Issue.** Attaches an external link (support ticket, pull request, document, dashboard) to a Linear issue, shown in the issue sidebar with a title and optional subtitle. Use to connect records in other tools to an issue; use Create Comment to post text instead. Idempotent: Linear updates the existing attachment when the same URL is attached to the same issue again. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. The key shown on the issue in Linear, or the issue ID. |
| `url` | string | yes |  | URL. Must start with http:// or https://. |
| `title` | string | yes |  | Title. Shown as the link's name on the issue. |
| `subtitle` | string | no |  | Subtitle. A second line under the title. |

Output fields:

- `id`: Attachment ID
- `title`: Title
- `subtitle`: Subtitle
- `url`: URL (url)
- `source_type`: Source Type
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `linear_create_project_status_update`

**Post Project Status Update.** Posts a status update on a Linear project: a markdown body plus an optional health of on track, at risk or off track, shown in the project Updates tab. This does not change the project itself; use Update Project to edit its name, dates or status. Not idempotent: each call posts a new update. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team. Needed to load the project list below. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. The project to post the update on. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Update. Markdown is supported. |
| `health` | string | no |  | Health. Leave empty to post without a health rating. One of `"onTrack"`, `"atRisk"`, `"offTrack"`. |

Output fields:

- `id`: Status Update ID
- `body`: Body (Markdown)
- `health`: Health
- `url`: URL (url)
- `is_diff_hidden`: Diff Hidden (boolean)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)
- `archived_at`: Archived At (datetime)

### `rawGraphqlQuery`

**Raw GraphQL Query.** Sends an arbitrary GraphQL query or mutation directly to the Linear API with optional variables. Use as an escape hatch when no dedicated action covers the needed operation. Idempotency depends entirely on the supplied query; a read query is safe to repeat, a mutation is not. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. |
| `variables` | object | no |  | Variables. Values for the $variables used in the query. |

### `linear_issue_create`

**Create Issue (AI).** Creates one Linear issue in a team from plain IDs: title plus optional description (markdown), assignee, status, priority, labels, project, milestone, cycle, parent (making it a sub-issue), due date, estimate and template. Resolve IDs first with List Teams, List Workflow States, List Users, List Issue Labels, List Projects and List Cycles, and check for duplicates with Search Issues. Not idempotent: each call creates a new issue. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team ID. UUID of the team that owns the issue. Get it from List Teams. |
| `title` | string | yes |  | Title. Issue title, for example "Login page times out on Safari". |
| `description` | string | no |  | Description. Issue body in Markdown. |
| `assignee_id` | string | no |  | Assignee ID. UUID of the user to assign. Get it from List Users or Get Current User. |
| `state_id` | string | no |  | Status ID. UUID of a workflow state of this team. Get it from List Workflow States. Leave empty for the team's default status. |
| `priority` | number | no |  | Priority. 0 none, 1 urgent, 2 high, 3 medium, 4 low. |
| `label_ids` | array | no |  | Label IDs. UUIDs of team or workspace labels. Get them from List Issue Labels. |
| `project_id` | string | no |  | Project ID. UUID of a project the team belongs to. Get it from List Projects. |
| `project_milestone_id` | string | no |  | Project Milestone ID. UUID of a milestone of that project. Get it from Get Project. |
| `cycle_id` | string | no |  | Cycle ID. UUID of a cycle of this team. Get it from List Cycles. |
| `parent_id` | string | no |  | Parent Issue. UUID or identifier (for example ENG-123) of the parent issue, to create a sub-issue. |
| `due_date` | string | no |  | Due Date. Date in YYYY-MM-DD format, for example 2026-10-15. |
| `estimate` | number | no |  | Estimate. Whole number of estimate points in the team's scale, for example 3. |
| `template_id` | string | no |  | Template ID. UUID of an issue template of this team. Leave empty for none. |

Output fields:

- `id`: Issue ID
- `identifier`: Identifier
- `number`: Number (number)
- `title`: Title
- `description`: Description
- `url`: URL (url)
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `estimate`: Estimate (number)
- `due_date`: Due Date (date)
- `branch_name`: Git Branch Name
- `state_id`: Status ID
- `state_name`: Status
- `state_type`: Status Type
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `assignee_id`: Assignee ID
- `assignee_name`: Assignee Name
- `assignee_email`: Assignee Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `creator_email`: Creator Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `project_milestone_id`: Milestone ID
- `project_milestone_name`: Milestone Name
- `cycle_id`: Cycle ID
- `cycle_number`: Cycle Number (number)
- `cycle_name`: Cycle Name
- `parent_id`: Parent Issue ID
- `parent_identifier`: Parent Identifier
- `parent_title`: Parent Title
- `label_ids`: Label IDs
- `label_names`: Labels
- `labels_complete`: All Labels Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_issue_update`

**Update Issue (AI).** Partially updates one Linear issue (UUID or identifier like ENG-123): only the fields you pass change and everything else is left as it is. Labels have three modes: Label IDs replaces the whole set, Add Label IDs and Remove Label IDs change it incrementally; to empty a field such as the assignee, due date or project, list it in Clear Fields. Idempotent: repeating the same update leaves the issue in the same state. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |
| `title` | string | no |  | Title. New title. |
| `description` | string | no |  | Description. New body in Markdown. Replaces the current description. |
| `assignee_id` | string | no |  | Assignee ID. UUID of the new assignee. Get it from List Users. |
| `state_id` | string | no |  | Status ID. UUID of a workflow state of the issue's team. Get it from List Workflow States. |
| `priority` | number | no |  | Priority. 0 none, 1 urgent, 2 high, 3 medium, 4 low. |
| `label_ids` | array | no |  | Label IDs (replace all). Replaces every label on the issue with exactly these label UUIDs. Cannot be combined with Add or Remove Label IDs. |
| `add_label_ids` | array | no |  | Add Label IDs. Label UUIDs to add, keeping the current labels. |
| `remove_label_ids` | array | no |  | Remove Label IDs. Label UUIDs to remove, keeping the other labels. |
| `team_id` | string | no |  | Move to Team ID. UUID of another team to move the issue to. Leave empty to keep the team. |
| `project_id` | string | no |  | Project ID. UUID of the project to move the issue into. |
| `project_milestone_id` | string | no |  | Project Milestone ID. UUID of a milestone of the project. |
| `cycle_id` | string | no |  | Cycle ID. UUID of a cycle of the team. Get it from List Cycles. |
| `parent_id` | string | no |  | Parent Issue. UUID or identifier of the new parent issue. |
| `due_date` | string | no |  | Due Date. Date in YYYY-MM-DD format, for example 2026-10-15. |
| `estimate` | number | no |  | Estimate. Whole number of estimate points. |
| `clear_fields` | array | no |  | Clear Fields. Fields to empty on the issue. A field listed here must not also be given a new value. One of `"assigneeId"`, `"description"`, `"dueDate"`, `"estimate"`, `"projectId"`, `"projectMilestoneId"`, `"cycleId"`, `"parentId"`, `"labelIds"`. |

Output fields:

- `id`: Issue ID
- `identifier`: Identifier
- `number`: Number (number)
- `title`: Title
- `description`: Description
- `url`: URL (url)
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `estimate`: Estimate (number)
- `due_date`: Due Date (date)
- `branch_name`: Git Branch Name
- `state_id`: Status ID
- `state_name`: Status
- `state_type`: Status Type
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `assignee_id`: Assignee ID
- `assignee_name`: Assignee Name
- `assignee_email`: Assignee Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `creator_email`: Creator Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `project_milestone_id`: Milestone ID
- `project_milestone_name`: Milestone Name
- `cycle_id`: Cycle ID
- `cycle_number`: Cycle Number (number)
- `cycle_name`: Cycle Name
- `parent_id`: Parent Issue ID
- `parent_identifier`: Parent Identifier
- `parent_title`: Parent Title
- `label_ids`: Label IDs
- `label_names`: Labels
- `labels_complete`: All Labels Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_issue_get`

**Get Issue (AI).** Returns one Linear issue by UUID or by identifier such as ENG-123, with status, team, assignee, project, milestone, cycle, parent and labels. Use when the issue is already known; use List Issues for structured filters and Search Issues for free text. Read-only and idempotent. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |

Output fields:

- `id`: Issue ID
- `identifier`: Identifier
- `number`: Number (number)
- `title`: Title
- `description`: Description
- `url`: URL (url)
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `estimate`: Estimate (number)
- `due_date`: Due Date (date)
- `branch_name`: Git Branch Name
- `state_id`: Status ID
- `state_name`: Status
- `state_type`: Status Type
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `assignee_id`: Assignee ID
- `assignee_name`: Assignee Name
- `assignee_email`: Assignee Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `creator_email`: Creator Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `project_milestone_id`: Milestone ID
- `project_milestone_name`: Milestone Name
- `cycle_id`: Cycle ID
- `cycle_number`: Cycle Number (number)
- `cycle_name`: Cycle Name
- `parent_id`: Parent Issue ID
- `parent_identifier`: Parent Identifier
- `parent_title`: Parent Title
- `label_ids`: Label IDs
- `label_names`: Labels
- `labels_complete`: All Labels Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_issues_list`

**List Issues (AI).** Lists Linear issues matching structured filters (team, project, assignee, status or status type, label, cycle, priority, updated since), one page at a time with a cursor. Use for exact filtering such as "open issues assigned to X in team Y"; use Search Issues for free-text matching. All filters are combined with AND; with no filter it lists every issue you can access. Read-only and idempotent. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team ID. Only issues of this team (UUID from List Teams). |
| `project_id` | string | no |  | Project ID. Only issues in this project (UUID from List Projects). |
| `assignee_id` | string | no |  | Assignee ID. Only issues assigned to this user (UUID from List Users). |
| `state_id` | string | no |  | Status ID. Only issues in this workflow state (UUID from List Workflow States). |
| `state_type` | string | no |  | Status Type. Only issues whose status is of this type, across teams. One of `"triage"`, `"backlog"`, `"unstarted"`, `"started"`, `"completed"`, `"canceled"`. |
| `label_id` | string | no |  | Label ID. Only issues that have this label (UUID from List Issue Labels). |
| `cycle_id` | string | no |  | Cycle ID. Only issues in this cycle (UUID from List Cycles). |
| `priority` | number | no |  | Priority. Only issues with this priority: 0 none, 1 urgent, 2 high, 3 medium, 4 low. |
| `updated_after` | string | no |  | Updated After. Only issues updated after this ISO 8601 time, for example 2026-09-01T00:00:00Z. |
| `include_archived` | boolean | no | `false` | Include Archived. |
| `order_by` | string | no |  | Order By. Sort order. Default: newest created first. One of `"createdAt"`, `"updatedAt"`. |
| `limit` | number | no | `50` | Limit. How many records to return in this page, 1 to 250. Default 50. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Issues
- `items[].id`: Issue ID
- `items[].identifier`: Identifier
- `items[].number`: Number (number)
- `items[].title`: Title
- `items[].description`: Description
- `items[].url`: URL (url)
- `items[].priority`: Priority (number)
- `items[].priority_label`: Priority Label
- `items[].estimate`: Estimate (number)
- `items[].due_date`: Due Date (date)
- `items[].branch_name`: Git Branch Name
- `items[].state_id`: Status ID
- `items[].state_name`: Status
- `items[].state_type`: Status Type
- `items[].team_id`: Team ID
- `items[].team_key`: Team Key
- `items[].team_name`: Team Name
- `items[].assignee_id`: Assignee ID
- `items[].assignee_name`: Assignee Name
- `items[].assignee_email`: Assignee Email (email)
- `items[].creator_id`: Creator ID
- `items[].creator_name`: Creator Name
- `items[].creator_email`: Creator Email (email)
- `items[].project_id`: Project ID
- `items[].project_name`: Project Name
- `items[].project_milestone_id`: Milestone ID
- `items[].project_milestone_name`: Milestone Name
- `items[].cycle_id`: Cycle ID
- `items[].cycle_number`: Cycle Number (number)
- `items[].cycle_name`: Cycle Name
- `items[].parent_id`: Parent Issue ID
- `items[].parent_identifier`: Parent Identifier
- `items[].parent_title`: Parent Title
- `items[].label_ids`: Label IDs
- `items[].label_names`: Labels
- `items[].labels_complete`: All Labels Loaded (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].started_at`: Started At (datetime)
- `items[].completed_at`: Completed At (datetime)
- `items[].canceled_at`: Canceled At (datetime)
- `items[].archived_at`: Archived At (datetime)
- `items[].trashed`: In Trash (boolean)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_issues_search`

**Search Issues (AI).** Searches Linear issues by free text (full-text plus semantic ranking) over titles and descriptions, optionally comments, optionally limited to one team, best matches first. Use to find duplicates or an issue described in words; use List Issues for exact field filters. Rate-limited by Linear to 30 requests per minute and new issues may take a moment to be indexed. Read-only and idempotent. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Search Text. Words to search for, for example "login timeout safari". |
| `team_id` | string | no |  | Team ID. Only return issues of this team (UUID from List Teams). |
| `include_comments` | boolean | no | `false` | Search Comments Too. |
| `include_archived` | boolean | no | `false` | Include Archived. |
| `limit` | number | no | `25` | Limit. How many records to return in this page, 1 to 100. Default 25. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Issues
- `items[].id`: Issue ID
- `items[].identifier`: Identifier
- `items[].number`: Number (number)
- `items[].title`: Title
- `items[].description`: Description
- `items[].url`: URL (url)
- `items[].priority`: Priority (number)
- `items[].priority_label`: Priority Label
- `items[].estimate`: Estimate (number)
- `items[].due_date`: Due Date (date)
- `items[].branch_name`: Git Branch Name
- `items[].state_id`: Status ID
- `items[].state_name`: Status
- `items[].state_type`: Status Type
- `items[].team_id`: Team ID
- `items[].team_key`: Team Key
- `items[].team_name`: Team Name
- `items[].assignee_id`: Assignee ID
- `items[].assignee_name`: Assignee Name
- `items[].assignee_email`: Assignee Email (email)
- `items[].creator_id`: Creator ID
- `items[].creator_name`: Creator Name
- `items[].creator_email`: Creator Email (email)
- `items[].project_id`: Project ID
- `items[].project_name`: Project Name
- `items[].project_milestone_id`: Milestone ID
- `items[].project_milestone_name`: Milestone Name
- `items[].cycle_id`: Cycle ID
- `items[].cycle_number`: Cycle Number (number)
- `items[].cycle_name`: Cycle Name
- `items[].parent_id`: Parent Issue ID
- `items[].parent_identifier`: Parent Identifier
- `items[].parent_title`: Parent Title
- `items[].label_ids`: Label IDs
- `items[].label_names`: Labels
- `items[].labels_complete`: All Labels Loaded (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].started_at`: Started At (datetime)
- `items[].completed_at`: Completed At (datetime)
- `items[].canceled_at`: Canceled At (datetime)
- `items[].archived_at`: Archived At (datetime)
- `items[].trashed`: In Trash (boolean)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor
- `total_count`: Total Matches (number)

### `linear_issue_archive`

**Archive Issue (AI).** Archives a Linear issue so it disappears from active views and boards while staying searchable; restore it with Unarchive Issue. Use to tidy finished or obsolete work without deleting it; use Delete Issue to move it to the trash. Idempotent: archiving an already archived issue leaves it archived. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |

Output fields:

- `success`: Success (boolean)
- `id`: Issue ID
- `identifier`: Identifier
- `title`: Title
- `url`: URL (url)
- `trashed`: In Trash (boolean)
- `archived_at`: Archived At (datetime)

### `linear_issue_unarchive`

**Unarchive Issue (AI).** Restores a Linear issue that was archived or moved to the trash (within the 30-day grace period), bringing it back to active views. Use to undo Archive Issue or Delete Issue. Idempotent: restoring an active issue leaves it active. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |

Output fields:

- `success`: Success (boolean)
- `id`: Issue ID
- `identifier`: Identifier
- `title`: Title
- `url`: URL (url)
- `trashed`: In Trash (boolean)
- `archived_at`: Archived At (datetime)

### `linear_issue_delete`

**Delete Issue (AI).** Moves a Linear issue to the trash; Linear deletes it for good after 30 days, and Unarchive Issue restores it before then. This never deletes permanently. Prefer Archive Issue when the work is only finished. Not idempotent: a second call on a trashed issue may fail. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |

Output fields:

- `success`: Success (boolean)
- `id`: Issue ID
- `identifier`: Identifier
- `title`: Title
- `url`: URL (url)
- `trashed`: In Trash (boolean)
- `archived_at`: Archived At (datetime)

### `linear_issue_relation_create`

**Create Issue Relation (AI).** Links two Linear issues: "blocks" means the first issue blocks the related issue, "duplicate" marks the first issue as a duplicate of the related one, "related" is a plain link. Use to record dependencies or duplicates; to nest an issue under another use Update Issue with a parent instead. Not idempotent: each call creates a relation record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the first issue, for example ENG-12. |
| `related_issue_id` | string | yes |  | Related Issue. UUID or identifier of the second issue, for example ENG-34. |
| `type` | string | yes |  | Relation Type. One of `"blocks"`, `"duplicate"`, `"related"`. |

Output fields:

- `id`: Relation ID
- `type`: Type
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `related_issue_id`: Related Issue ID
- `related_issue_identifier`: Related Issue Identifier
- `related_issue_title`: Related Issue Title
- `created_at`: Created At (datetime)

### `linear_issue_add_label`

**Add Label to Issue (AI).** Adds one label (team or workspace) to a Linear issue and keeps the labels it already has. Use this rather than Update Issue with Label IDs, which replaces the whole set. Resolve the label with List Issue Labels or create it with Create Issue Label. Idempotent: adding a label the issue already has changes nothing. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |
| `label_id` | string | yes |  | Label ID. UUID of the label. Get it from List Issue Labels. |

Output fields:

- `id`: Issue ID
- `identifier`: Identifier
- `number`: Number (number)
- `title`: Title
- `description`: Description
- `url`: URL (url)
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `estimate`: Estimate (number)
- `due_date`: Due Date (date)
- `branch_name`: Git Branch Name
- `state_id`: Status ID
- `state_name`: Status
- `state_type`: Status Type
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `assignee_id`: Assignee ID
- `assignee_name`: Assignee Name
- `assignee_email`: Assignee Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `creator_email`: Creator Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `project_milestone_id`: Milestone ID
- `project_milestone_name`: Milestone Name
- `cycle_id`: Cycle ID
- `cycle_number`: Cycle Number (number)
- `cycle_name`: Cycle Name
- `parent_id`: Parent Issue ID
- `parent_identifier`: Parent Identifier
- `parent_title`: Parent Title
- `label_ids`: Label IDs
- `label_names`: Labels
- `labels_complete`: All Labels Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_issue_remove_label`

**Remove Label from Issue (AI).** Removes one label from a Linear issue and keeps its other labels; the label itself still exists in the workspace. Use this rather than Update Issue with Label IDs, which replaces the whole set. Idempotent: removing a label the issue does not have changes nothing. labels_complete is false when Linear did not return every label page; label_ids and label_names then hold only the labels read. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |
| `label_id` | string | yes |  | Label ID. UUID of the label. Get it from List Issue Labels. |

Output fields:

- `id`: Issue ID
- `identifier`: Identifier
- `number`: Number (number)
- `title`: Title
- `description`: Description
- `url`: URL (url)
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `estimate`: Estimate (number)
- `due_date`: Due Date (date)
- `branch_name`: Git Branch Name
- `state_id`: Status ID
- `state_name`: Status
- `state_type`: Status Type
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `assignee_id`: Assignee ID
- `assignee_name`: Assignee Name
- `assignee_email`: Assignee Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `creator_email`: Creator Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `project_milestone_id`: Milestone ID
- `project_milestone_name`: Milestone Name
- `cycle_id`: Cycle ID
- `cycle_number`: Cycle Number (number)
- `cycle_name`: Cycle Name
- `parent_id`: Parent Issue ID
- `parent_identifier`: Parent Identifier
- `parent_title`: Parent Title
- `label_ids`: Label IDs
- `label_names`: Labels
- `labels_complete`: All Labels Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_issue_label_create`

**Create Issue Label (AI).** Returns the issue label with this name (case-insensitive) that the given team can use (its own label first, else a workspace label), or the workspace label when no team is given, and creates it only if none exists yet; created tells which happened. Without a team it fails with a clear message when only a team label of that name exists (Linear does not allow the duplicate); pass that team instead. Use before labelling issues by name. Idempotent: repeat calls return the same label, though two calls at the same moment can still race. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Label name, for example "Bug". |
| `team_id` | string | no |  | Team ID. UUID of the team for a team label (from List Teams). Leave empty for a workspace label shared by all teams. |
| `color` | string | no |  | Color. Hex color used when the label is created, for example #EB5757. |
| `description` | string | no |  | Description. Used only when the label is created. |

Output fields:

- `created`: Created Now (boolean)
- `id`: Label ID
- `name`: Name
- `color`: Color
- `description`: Description
- `is_group`: Label Group (boolean)
- `is_workspace_label`: Workspace Label (boolean)
- `team_id`: Team ID
- `team_key`: Team Key
- `team_name`: Team Name
- `parent_id`: Parent Label ID
- `parent_name`: Parent Label
- `created_at`: Created At (datetime)

### `linear_issue_labels_list`

**List Issue Labels (AI).** Lists Linear issue labels with their IDs: every label, or with a team ID that team's labels plus the workspace labels every team can use, optionally narrowed by a name fragment. Use to resolve a label name to the ID that Create Issue, Update Issue and Add Label to Issue need. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team ID. UUID of a team (from List Teams). Returns that team's labels and the workspace labels. |
| `name_contains` | string | no |  | Name Contains. Only labels whose name contains this text (case-insensitive). |
| `limit` | number | no | `100` | Limit. How many records to return in this page, 1 to 250. Default 100. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Labels
- `items[].id`: Label ID
- `items[].name`: Name
- `items[].color`: Color
- `items[].description`: Description
- `items[].is_group`: Label Group (boolean)
- `items[].is_workspace_label`: Workspace Label (boolean)
- `items[].team_id`: Team ID
- `items[].team_key`: Team Key
- `items[].team_name`: Team Name
- `items[].parent_id`: Parent Label ID
- `items[].parent_name`: Parent Label
- `items[].created_at`: Created At (datetime)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_workflow_states_list`

**List Workflow States (AI).** Lists issue workflow states (statuses such as Backlog, Todo, In Progress, Done, Canceled) with IDs and type, for one team or all teams. Statuses belong to a team, so filter by the issue's team to get a valid Status ID for Create Issue or Update Issue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team ID. UUID of the team (from List Teams). Leave empty for every team. |
| `limit` | number | no | `100` | Limit. How many records to return in this page, 1 to 250. Default 100. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Statuses
- `items[].id`: Status ID
- `items[].name`: Name
- `items[].type`: Type
- `items[].color`: Color
- `items[].position`: Position (number)
- `items[].description`: Description
- `items[].team_id`: Team ID
- `items[].team_key`: Team Key
- `items[].team_name`: Team Name
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_teams_list`

**List Teams (AI).** Lists the Linear teams the API key can access, with ID, key (the ENG in ENG-123) and settings such as cycles and triage. This is the first call to resolve a team name or key to the Team ID that most other actions need. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `include_archived` | boolean | no | `false` | Include Archived Teams. |
| `limit` | number | no | `100` | Limit. How many records to return in this page, 1 to 250. Default 100. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Teams
- `items[].id`: Team ID
- `items[].key`: Team Key
- `items[].name`: Name
- `items[].description`: Description
- `items[].icon`: Icon
- `items[].color`: Color
- `items[].timezone`: Timezone
- `items[].cycles_enabled`: Cycles Enabled (boolean)
- `items[].triage_enabled`: Triage Enabled (boolean)
- `items[].default_issue_estimate`: Default Estimate (number)
- `items[].issue_estimation_type`: Estimation Type
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].archived_at`: Archived At (datetime)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_team_get`

**Get Team (AI).** Returns one Linear team by ID with the defaults new issues get: default status, default estimate and estimation scale, and whether triage and cycles are on, plus its issue count. Use before creating issues to learn what a team expects, or to check if it has cycles. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team ID. UUID of the team. Get it from List Teams. |

Output fields:

- `id`: Team ID
- `key`: Team Key
- `name`: Name
- `description`: Description
- `icon`: Icon
- `color`: Color
- `timezone`: Timezone
- `cycles_enabled`: Cycles Enabled (boolean)
- `triage_enabled`: Triage Enabled (boolean)
- `default_issue_estimate`: Default Estimate (number)
- `issue_estimation_type`: Estimation Type
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `archived_at`: Archived At (datetime)
- `issue_count`: Issue Count (number)
- `default_issue_state_id`: Default Status ID
- `default_issue_state_name`: Default Status
- `default_issue_state_type`: Default Status Type

### `linear_team_create`

**Create Team (AI).** Creates a new Linear team, which gets its own issue key, workflow statuses and settings. Only create a team when asked: check List Teams first, since a team with the same name or key may already exist. The key (1 to 7 letters or digits) prefixes every issue identifier of the team; Linear derives one from the name when it is left empty. May need an admin key, and the Free plan allows only 2 teams. Not idempotent: each call adds a team. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Team name, for example "Platform". |
| `key` | string | no |  | Key. Issue key, for example PLT. Leave empty to let Linear derive one from the name. |
| `description` | string | no |  | Description. |
| `icon` | string | no |  | Icon. |
| `color` | string | no |  | Color. Hex color, for example #5E6AD2. |
| `timezone` | string | no |  | Timezone. IANA timezone, for example Europe/Berlin. |
| `cycles_enabled` | string | no |  | Cycles. Turn cycles on or off. Leave empty for the Linear default. One of `"true"`, `"false"`. |
| `triage_enabled` | string | no |  | Triage. Turn triage on or off. Leave empty for the Linear default. One of `"true"`, `"false"`. |

Output fields:

- `id`: Team ID
- `key`: Team Key
- `name`: Name
- `description`: Description
- `icon`: Icon
- `color`: Color
- `timezone`: Timezone
- `cycles_enabled`: Cycles Enabled (boolean)
- `triage_enabled`: Triage Enabled (boolean)
- `default_issue_estimate`: Default Estimate (number)
- `issue_estimation_type`: Estimation Type
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `archived_at`: Archived At (datetime)

### `linear_team_update`

**Update Team (AI).** Partially updates a Linear team: only the settings you pass change (name, key, description, icon, color, timezone, cycles and triage on or off). Changing the key changes every issue identifier of the team, so only do it when asked. May need an admin key. Idempotent: repeating the same update leaves the team in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team ID. UUID of the team. Get it from List Teams. |
| `name` | string | no |  | Name. |
| `key` | string | no |  | Key. New issue key, for example PLT. Renames every issue identifier of the team. |
| `description` | string | no |  | Description. |
| `icon` | string | no |  | Icon. |
| `color` | string | no |  | Color. Hex color, for example #5E6AD2. |
| `timezone` | string | no |  | Timezone. IANA timezone, for example Europe/Berlin. |
| `cycles_enabled` | string | no |  | Cycles. Turn cycles on or off. Leave empty to keep the current setting. One of `"true"`, `"false"`. |
| `triage_enabled` | string | no |  | Triage. Turn triage on or off. Leave empty to keep the current setting. One of `"true"`, `"false"`. |

Output fields:

- `id`: Team ID
- `key`: Team Key
- `name`: Name
- `description`: Description
- `icon`: Icon
- `color`: Color
- `timezone`: Timezone
- `cycles_enabled`: Cycles Enabled (boolean)
- `triage_enabled`: Triage Enabled (boolean)
- `default_issue_estimate`: Default Estimate (number)
- `issue_estimation_type`: Estimation Type
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `archived_at`: Archived At (datetime)

### `linear_users_list`

**List Users (AI).** Lists members of the Linear workspace with ID, name, email and role flags, optionally matching an exact email (case-insensitive) or a name fragment. Use to turn a person's email or name into the Assignee ID other actions need; use Get Current User for the key owner. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Exact email address to look up, for example jane@acme.com. |
| `name_contains` | string | no |  | Name Contains. Only users whose name contains this text (case-insensitive). |
| `include_disabled` | boolean | no | `false` | Include Deactivated Users. |
| `limit` | number | no | `100` | Limit. How many records to return in this page, 1 to 250. Default 100. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Users
- `items[].id`: User ID
- `items[].name`: Name
- `items[].display_name`: Display Name
- `items[].email`: Email (email)
- `items[].active`: Active (boolean)
- `items[].admin`: Admin (boolean)
- `items[].guest`: Guest (boolean)
- `items[].url`: Profile URL (url)
- `items[].avatar_url`: Avatar (image)
- `items[].timezone`: Timezone
- `items[].created_at`: Created At (datetime)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_viewer_get`

**Get Current User (AI).** Returns the Linear user who owns the connection's API key (ID, name, email, admin flag) and the workspace it belongs to. Use to assign something to "me", to check whether the key is an admin key before webhook or team actions, or to confirm the connection works. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `name`: Name
- `display_name`: Display Name
- `email`: Email (email)
- `active`: Active (boolean)
- `admin`: Admin (boolean)
- `guest`: Guest (boolean)
- `url`: Profile URL (url)
- `avatar_url`: Avatar (image)
- `timezone`: Timezone
- `created_at`: Created At (datetime)
- `organization_id`: Workspace ID
- `organization_name`: Workspace Name
- `organization_url_key`: Workspace URL Key

### `linear_cycles_list`

**List Cycles (AI).** Lists Linear cycles (time-boxed sprints) with number, dates and progress, for one team or all teams, optionally only the current, next or previous cycle. Use to find the Cycle ID for Create Issue or Update Issue, for example "put this in the next cycle". Teams without cycles enabled return none. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team ID. UUID of the team (from List Teams). Leave empty for every team. |
| `which` | string | no |  | Which Cycles. Leave empty for all cycles. One of `"isActive"`, `"isNext"`, `"isPrevious"`. |
| `limit` | number | no | `50` | Limit. How many records to return in this page, 1 to 250. Default 50. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Cycles
- `items[].id`: Cycle ID
- `items[].number`: Number (number)
- `items[].name`: Name
- `items[].starts_at`: Starts At (datetime)
- `items[].ends_at`: Ends At (datetime)
- `items[].completed_at`: Completed At (datetime)
- `items[].progress`: Progress (number)
- `items[].is_active`: Current Cycle (boolean)
- `items[].is_next`: Next Cycle (boolean)
- `items[].is_previous`: Previous Cycle (boolean)
- `items[].team_id`: Team ID
- `items[].team_key`: Team Key
- `items[].team_name`: Team Name
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_comment_create`

**Create Comment (AI).** Posts a markdown comment on a Linear issue (UUID or identifier like ENG-123) as the API key owner, optionally as a reply in the thread of an existing comment. Use to add notes or updates to an issue; use Update Comment to edit one. Not idempotent: each call posts a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |
| `body` | string | yes |  | Body. Comment text in Markdown. |
| `parent_id` | string | no |  | Reply To Comment ID. UUID of a comment on the same issue to reply to (from List Comments). Leave empty for a new thread. |

Output fields:

- `id`: Comment ID
- `body`: Body (Markdown)
- `url`: URL (url)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `parent_id`: Parent Comment ID
- `resolved_at`: Resolved At (datetime)
- `resolving_user_id`: Resolved By ID
- `resolving_user_name`: Resolved By
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)

### `linear_comment_get`

**Get Comment (AI).** Returns one Linear comment by ID with its markdown body, author, issue, parent comment and resolved state. Use when a comment ID is already known (for example from the New Comment trigger); use List Comments to browse an issue's comments. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. UUID of the comment. |

Output fields:

- `id`: Comment ID
- `body`: Body (Markdown)
- `url`: URL (url)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `parent_id`: Parent Comment ID
- `resolved_at`: Resolved At (datetime)
- `resolving_user_id`: Resolved By ID
- `resolving_user_name`: Resolved By
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)

### `linear_comments_list`

**List Comments (AI).** Lists Linear comments with body, author and thread parent, normally for one issue (UUID or identifier like ENG-123), one page at a time. Without an issue it lists recent comments across the workspace. Use to read a discussion or find the comment ID to reply to, resolve or react to. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | no |  | Issue. UUID or identifier of the issue, for example ENG-123. Leave empty for every issue. |
| `limit` | number | no | `50` | Limit. How many records to return in this page, 1 to 250. Default 50. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Comments
- `items[].id`: Comment ID
- `items[].body`: Body (Markdown)
- `items[].url`: URL (url)
- `items[].user_id`: Author ID
- `items[].user_name`: Author Name
- `items[].user_email`: Author Email (email)
- `items[].issue_id`: Issue ID
- `items[].issue_identifier`: Issue Identifier
- `items[].issue_title`: Issue Title
- `items[].parent_id`: Parent Comment ID
- `items[].resolved_at`: Resolved At (datetime)
- `items[].resolving_user_id`: Resolved By ID
- `items[].resolving_user_name`: Resolved By
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].edited_at`: Edited At (datetime)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_comment_update`

**Update Comment (AI).** Replaces the markdown body of an existing Linear comment; Linear normally only lets the author edit their own comment. Use to correct or extend a comment the flow posted earlier; use Create Comment to add a new one. Idempotent: setting the same body again leaves the comment unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. UUID of the comment (from List Comments or Create Comment). |
| `body` | string | yes |  | Body. The new comment text in Markdown. Replaces the whole body. |

Output fields:

- `id`: Comment ID
- `body`: Body (Markdown)
- `url`: URL (url)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `parent_id`: Parent Comment ID
- `resolved_at`: Resolved At (datetime)
- `resolving_user_id`: Resolved By ID
- `resolving_user_name`: Resolved By
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)

### `linear_comment_resolve`

**Resolve Comment Thread (AI).** Marks a Linear comment thread as resolved, which collapses it on the issue; pass the top comment of the thread, optionally with the reply that resolved it. Use when a question in a thread has been answered; use Unresolve Comment Thread to reopen it. Idempotent: resolving a resolved thread keeps it resolved. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Thread Comment ID. UUID of the first comment of the thread. |
| `resolving_comment_id` | string | no |  | Resolving Reply ID. UUID of the reply that resolved the thread, if any. |

Output fields:

- `id`: Comment ID
- `body`: Body (Markdown)
- `url`: URL (url)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `parent_id`: Parent Comment ID
- `resolved_at`: Resolved At (datetime)
- `resolving_user_id`: Resolved By ID
- `resolving_user_name`: Resolved By
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)

### `linear_comment_unresolve`

**Unresolve Comment Thread (AI).** Reopens a resolved Linear comment thread so it shows as open on the issue again; pass the first comment of the thread. Use to undo Resolve Comment Thread when a discussion needs more work. Idempotent: reopening an open thread keeps it open. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Thread Comment ID. UUID of the first comment of the thread. |

Output fields:

- `id`: Comment ID
- `body`: Body (Markdown)
- `url`: URL (url)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `parent_id`: Parent Comment ID
- `resolved_at`: Resolved At (datetime)
- `resolving_user_id`: Resolved By ID
- `resolving_user_name`: Resolved By
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)

### `linear_comment_reaction_create`

**React to Comment (AI).** Adds an emoji reaction from the API key owner to a Linear comment, for example to acknowledge it without writing a reply. Pass the emoji as its name (thumbsup, eyes, white_check_mark) or as the emoji character. Remove it later with Delete Reaction using the returned ID. Not idempotent: a repeat call may add a second reaction or fail. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. UUID of the comment. |
| `emoji` | string | yes |  | Emoji. Emoji name such as thumbsup or eyes, or the emoji itself. |

Output fields:

- `id`: Reaction ID
- `emoji`: Emoji
- `user_id`: User ID
- `user_name`: User Name
- `comment_id`: Comment ID
- `created_at`: Created At (datetime)

### `linear_reaction_delete`

**Delete Reaction (AI).** Removes one emoji reaction from a Linear comment, identified by the reaction ID returned by React to Comment. Only the reaction is removed, never the comment. Not idempotent: a second call fails because the reaction is already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reaction_id` | string | yes |  | Reaction ID. UUID of the reaction (from React to Comment). |

Output fields:

- `success`: Success (boolean)
- `deleted_id`: Deleted Reaction ID

### `linear_attachment_create`

**Attach Link to Issue (AI).** Attaches an external URL (pull request, support ticket, document) to a Linear issue with a title and optional subtitle, shown in the issue sidebar. Use to link records in other tools to an issue; this does not upload files. Idempotent: attaching the same URL to the same issue again updates the existing attachment instead of adding another. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issue_id` | string | yes |  | Issue. UUID or identifier of the issue, for example ENG-123. |
| `url` | string | yes |  | URL. Full link, for example https://github.com/acme/app/pull/42. |
| `title` | string | yes |  | Title. Text shown for the link, for example "PR #42". |
| `subtitle` | string | no |  | Subtitle. Optional second line, for example "Merged". |

Output fields:

- `id`: Attachment ID
- `title`: Title
- `subtitle`: Subtitle
- `url`: URL (url)
- `source_type`: Source Type
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `linear_attachment_get`

**Get Attachment (AI).** Returns one Linear issue attachment by ID: its URL, title, subtitle, source type and the issue it belongs to. Use to inspect a link attached to an issue; to fetch the bytes of a file uploaded into Linear, use Download Linear Upload with the uploads.linear.app URL instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachment_id` | string | yes |  | Attachment ID. UUID of the attachment. |

Output fields:

- `id`: Attachment ID
- `title`: Title
- `subtitle`: Subtitle
- `url`: URL (url)
- `source_type`: Source Type
- `issue_id`: Issue ID
- `issue_identifier`: Issue Identifier
- `issue_title`: Issue Title
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `linear_upload_download`

**Download Linear Upload (AI).** Downloads a private file uploaded to Linear, such as an image or log embedded in an issue description or comment, from its https://uploads.linear.app/... link and returns it as a flow file. Only uploads.linear.app links are accepted, because the API key is sent with the request, and redirects are followed only to Linear file hosts. The file size limit of this Activepieces deployment applies. Read-only and idempotent: the same link returns the same file. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Upload URL. The https://uploads.linear.app/... link, copied from the markdown of an issue or comment. |
| `file_name` | string | no |  | File Name. Name for the saved file. Leave empty to use the last part of the link. |

Output fields:

- `file`: File
- `file_name`: File Name
- `mime_type`: MIME Type
- `size_bytes`: Size (filesize)

### `linear_project_create`

**Create Project (AI).** Creates a Linear project shared by one or more teams, with optional description, lead, priority, status, start and target dates (YYYY-MM-DD), icon and color. Use to set up a new body of work; check List Projects first to avoid a duplicate, and use Create Project Milestone and Post Project Status Update afterwards. Not idempotent: each call creates a new project. teams_complete is false when Linear did not return every team page; team_ids and team_names then hold only the teams read. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_ids` | array | yes |  | Team IDs. UUIDs of the teams the project belongs to (from List Teams). At least one. |
| `name` | string | yes |  | Name. Project name, for example "Website relaunch". |
| `description` | string | no |  | Summary. Short one-line summary shown under the project name. |
| `lead_id` | string | no |  | Lead ID. UUID of the project lead (from List Users). |
| `priority` | number | no |  | Priority. 0 none, 1 urgent, 2 high, 3 medium, 4 low. |
| `status_id` | string | no |  | Status ID. UUID of a project status. Leave empty for the default status. |
| `start_date` | string | no |  | Start Date. YYYY-MM-DD, for example 2026-10-01. |
| `target_date` | string | no |  | Target Date. YYYY-MM-DD, for example 2026-12-15. |
| `icon` | string | no |  | Icon. Linear icon name, for example "Rocket". |
| `color` | string | no |  | Color. Hex color, for example #5E6AD2. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `url`: URL (url)
- `icon`: Icon
- `color`: Color
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `progress`: Progress (number)
- `health`: Health
- `start_date`: Start Date (date)
- `target_date`: Target Date (date)
- `status_id`: Status ID
- `status_name`: Status
- `status_type`: Status Type
- `lead_id`: Lead ID
- `lead_name`: Lead Name
- `lead_email`: Lead Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `team_ids`: Team IDs
- `team_names`: Teams
- `teams_complete`: All Teams Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_project_update`

**Update Project (AI).** Partially edits a Linear project (name, summary, lead, priority, status, dates, icon, color): only the fields you pass change. The team list is only touched when Team IDs is given, and then it replaces the whole list. To post a progress report use Post Project Status Update instead; to empty the lead or a date list it in Clear Fields. Idempotent: repeating the same update leaves the project in the same state. teams_complete is false when Linear did not return every team page; team_ids and team_names then hold only the teams read. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. UUID of the project (from List Projects). |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Summary. Short one-line summary. |
| `lead_id` | string | no |  | Lead ID. UUID of the new lead (from List Users). |
| `priority` | number | no |  | Priority. 0 none, 1 urgent, 2 high, 3 medium, 4 low. |
| `status_id` | string | no |  | Status ID. UUID of a project status. |
| `start_date` | string | no |  | Start Date. YYYY-MM-DD. |
| `target_date` | string | no |  | Target Date. YYYY-MM-DD. |
| `icon` | string | no |  | Icon. |
| `color` | string | no |  | Color. Hex color, for example #5E6AD2. |
| `team_ids` | array | no |  | Team IDs (replace all). Replaces the teams of the project with exactly these team UUIDs. Leave empty to keep the current teams. |
| `clear_fields` | array | no |  | Clear Fields. Fields to empty on the project. A field listed here must not also be given a value. One of `"leadId"`, `"startDate"`, `"targetDate"`. |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `url`: URL (url)
- `icon`: Icon
- `color`: Color
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `progress`: Progress (number)
- `health`: Health
- `start_date`: Start Date (date)
- `target_date`: Target Date (date)
- `status_id`: Status ID
- `status_name`: Status
- `status_type`: Status Type
- `lead_id`: Lead ID
- `lead_name`: Lead Name
- `lead_email`: Lead Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `team_ids`: Team IDs
- `team_names`: Teams
- `teams_complete`: All Teams Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)

### `linear_projects_list`

**List Projects (AI).** Lists Linear projects with status, lead, dates, progress and teams, optionally only those of one team, of one status type (backlog, planned, started, paused, completed, canceled) or whose name contains a text. Use to resolve a project name to its ID or to review active work. Read-only and idempotent. teams_complete is false when Linear did not return every team page; team_ids and team_names then hold only the teams read. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team ID. Only projects of this team (UUID from List Teams). |
| `status_type` | string | no |  | Status Type. One of `"backlog"`, `"planned"`, `"started"`, `"paused"`, `"completed"`, `"canceled"`. |
| `name_contains` | string | no |  | Name Contains. Case-insensitive name fragment. |
| `include_archived` | boolean | no | `false` | Include Archived. |
| `limit` | number | no | `50` | Limit. How many records to return in this page, 1 to 250. Default 50. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Projects
- `items[].id`: Project ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].url`: URL (url)
- `items[].icon`: Icon
- `items[].color`: Color
- `items[].priority`: Priority (number)
- `items[].priority_label`: Priority Label
- `items[].progress`: Progress (number)
- `items[].health`: Health
- `items[].start_date`: Start Date (date)
- `items[].target_date`: Target Date (date)
- `items[].status_id`: Status ID
- `items[].status_name`: Status
- `items[].status_type`: Status Type
- `items[].lead_id`: Lead ID
- `items[].lead_name`: Lead Name
- `items[].lead_email`: Lead Email (email)
- `items[].creator_id`: Creator ID
- `items[].creator_name`: Creator Name
- `items[].team_ids`: Team IDs
- `items[].team_names`: Teams
- `items[].teams_complete`: All Teams Loaded (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].completed_at`: Completed At (datetime)
- `items[].canceled_at`: Canceled At (datetime)
- `items[].archived_at`: Archived At (datetime)
- `items[].trashed`: In Trash (boolean)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_project_get`

**Get Project (AI).** Returns one Linear project by ID with status, health, progress, dates, lead, teams and its milestones (the Milestone IDs Create Issue accepts). Use when the project is known; use List Projects to find it by name or team. All milestones are returned, however many the project has. teams_complete is false when Linear did not return every team page; team_ids and team_names then hold only the teams read. milestones_complete is false when Linear did not return every milestone page. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. UUID of the project (from List Projects). |

Output fields:

- `id`: Project ID
- `name`: Name
- `description`: Description
- `url`: URL (url)
- `icon`: Icon
- `color`: Color
- `priority`: Priority (number)
- `priority_label`: Priority Label
- `progress`: Progress (number)
- `health`: Health
- `start_date`: Start Date (date)
- `target_date`: Target Date (date)
- `status_id`: Status ID
- `status_name`: Status
- `status_type`: Status Type
- `lead_id`: Lead ID
- `lead_name`: Lead Name
- `lead_email`: Lead Email (email)
- `creator_id`: Creator ID
- `creator_name`: Creator Name
- `team_ids`: Team IDs
- `team_names`: Teams
- `teams_complete`: All Teams Loaded (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `completed_at`: Completed At (datetime)
- `canceled_at`: Canceled At (datetime)
- `archived_at`: Archived At (datetime)
- `trashed`: In Trash (boolean)
- `milestones`: Milestones
- `milestones[].id`: Milestone ID
- `milestones[].name`: Name
- `milestones[].target_date`: Target Date (date)
- `milestones[].status`: Status
- `milestones_complete`: All Milestones Loaded (boolean)

### `linear_project_delete`

**Delete Project (AI).** Moves a Linear project to the trash; its issues are kept, and Restore Project brings it back. Use only when a project was created by mistake or is no longer wanted; to finish a project set its status with Update Project instead. Not idempotent: a second call on a trashed project may fail. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. UUID of the project (from List Projects). |

Output fields:

- `success`: Success (boolean)
- `id`: Project ID
- `name`: Name
- `url`: URL (url)
- `trashed`: In Trash (boolean)
- `archived_at`: Archived At (datetime)

### `linear_project_unarchive`

**Restore Project (AI).** Restores a Linear project that was deleted (trashed) or archived, bringing it back to active views. Use to undo Delete Project. Idempotent: restoring an active project leaves it active. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. UUID of the project (from List Projects). |

Output fields:

- `success`: Success (boolean)
- `id`: Project ID
- `name`: Name
- `url`: URL (url)
- `trashed`: In Trash (boolean)
- `archived_at`: Archived At (datetime)

### `linear_project_milestone_create`

**Create Project Milestone (AI).** Adds a milestone (a named checkpoint with an optional target date) to a Linear project; issues can then be assigned to it with Create Issue or Update Issue. Check Get Project first, which lists existing milestones, to avoid a duplicate. Not idempotent: each call adds a milestone. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. UUID of the project (from List Projects). |
| `name` | string | yes |  | Name. Milestone name, for example "Beta". |
| `description` | string | no |  | Description. Markdown description. |
| `target_date` | string | no |  | Target Date. YYYY-MM-DD, for example 2026-11-30. |

Output fields:

- `id`: Milestone ID
- `name`: Name
- `description`: Description
- `target_date`: Target Date (date)
- `sort_order`: Sort Order (number)
- `status`: Status
- `progress`: Progress (number)
- `project_id`: Project ID
- `project_name`: Project Name
- `created_at`: Created At (datetime)

### `linear_project_status_update_create`

**Post Project Status Update (AI).** Posts a project status update, the progress report in a Linear project's Updates tab: a markdown body with an optional health of onTrack, atRisk or offTrack. This does not edit the project; use Update Project for its fields. Not idempotent: each call posts another update. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. UUID of the project (from List Projects). |
| `body` | string | yes |  | Body. Update text in Markdown. |
| `health` | string | no |  | Health. onTrack, atRisk or offTrack. Leave empty for no health rating. One of `"onTrack"`, `"atRisk"`, `"offTrack"`. |

Output fields:

- `id`: Status Update ID
- `body`: Body (Markdown)
- `health`: Health
- `url`: URL (url)
- `is_diff_hidden`: Diff Hidden (boolean)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)
- `archived_at`: Archived At (datetime)

### `linear_project_status_update_get`

**Get Project Status Update (AI).** Returns one Linear project status update (progress report) by ID with its markdown body, health, author and project. Use when the update ID is known, for example from the New Project Status Update trigger; use List Project Status Updates to browse a project's history. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_update_id` | string | yes |  | Status Update ID. UUID of the project status update. |

Output fields:

- `id`: Status Update ID
- `body`: Body (Markdown)
- `health`: Health
- `url`: URL (url)
- `is_diff_hidden`: Diff Hidden (boolean)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)
- `archived_at`: Archived At (datetime)

### `linear_project_status_updates_list`

**List Project Status Updates (AI).** Lists Linear project status updates (progress reports with health), normally for one project, one page at a time. Use to read how a project has been reported over time or to find an update ID to edit or archive. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. Only updates of this project (UUID from List Projects). Leave empty for all projects. |
| `include_archived` | boolean | no | `false` | Include Archived. |
| `limit` | number | no | `25` | Limit. How many records to return in this page, 1 to 250. Default 25. |
| `cursor` | string | no |  | Page Cursor. Pass end_cursor from the previous call to get the next page. Leave empty for the first page. |

Output fields:

- `items`: Status Updates
- `items[].id`: Status Update ID
- `items[].body`: Body (Markdown)
- `items[].health`: Health
- `items[].url`: URL (url)
- `items[].is_diff_hidden`: Diff Hidden (boolean)
- `items[].user_id`: Author ID
- `items[].user_name`: Author Name
- `items[].user_email`: Author Email (email)
- `items[].project_id`: Project ID
- `items[].project_name`: Project Name
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].edited_at`: Edited At (datetime)
- `items[].archived_at`: Archived At (datetime)
- `count`: Returned Count (number)
- `has_next_page`: Has More (boolean)
- `end_cursor`: Next Page Cursor

### `linear_project_status_update_edit`

**Edit Project Status Update (AI).** Edits a posted Linear project status update: replaces its markdown body and/or changes its health; whatever you leave out stays as it is. This edits the progress report, not the project (use Update Project for that). Idempotent: repeating the same edit leaves the update unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_update_id` | string | yes |  | Status Update ID. UUID of the project status update. |
| `body` | string | no |  | Body. New update text in Markdown. Replaces the whole body. |
| `health` | string | no |  | Health. New health. Leave empty to keep the current one. One of `"onTrack"`, `"atRisk"`, `"offTrack"`. |

Output fields:

- `id`: Status Update ID
- `body`: Body (Markdown)
- `health`: Health
- `url`: URL (url)
- `is_diff_hidden`: Diff Hidden (boolean)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)
- `archived_at`: Archived At (datetime)

### `linear_project_status_update_archive`

**Archive Project Status Update (AI).** Archives a Linear project status update so it no longer shows in the project Updates tab; Unarchive Project Status Update restores it. Use to retract a report posted by mistake. Idempotent: archiving an archived update keeps it archived. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_update_id` | string | yes |  | Status Update ID. UUID of the project status update. |

Output fields:

- `success`: Success (boolean)
- `id`: Status Update ID
- `body`: Body (Markdown)
- `health`: Health
- `url`: URL (url)
- `is_diff_hidden`: Diff Hidden (boolean)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)
- `archived_at`: Archived At (datetime)

### `linear_project_status_update_unarchive`

**Unarchive Project Status Update (AI).** Restores an archived Linear project status update so it shows in the project Updates tab again. Use to undo Archive Project Status Update. Idempotent: restoring a visible update keeps it visible. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_update_id` | string | yes |  | Status Update ID. UUID of the project status update. |

Output fields:

- `success`: Success (boolean)
- `id`: Status Update ID
- `body`: Body (Markdown)
- `health`: Health
- `url`: URL (url)
- `is_diff_hidden`: Diff Hidden (boolean)
- `user_id`: Author ID
- `user_name`: Author Name
- `user_email`: Author Email (email)
- `project_id`: Project ID
- `project_name`: Project Name
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `edited_at`: Edited At (datetime)
- `archived_at`: Archived At (datetime)
