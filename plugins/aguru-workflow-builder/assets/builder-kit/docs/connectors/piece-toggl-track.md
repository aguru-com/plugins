# Toggl Track

Toggl Track is a time tracking application that allows users to track their daily activities across different platforms. Works with classic Toggl Track and Toggl 2.0 accounts.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-toggl-track'
  version: '0.2.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Toggl Track (Classic)

> Use this for classic Toggl Track accounts (track.toggl.com).
>
> 1. Log in to [Toggl Track](https://track.toggl.com).
> 2. Open your **Profile settings** (https://track.toggl.com/profile).
> 3. Scroll to **API Token** at the bottom of the page and copy it (a 32-character code).

### `CUSTOM_AUTH`: Toggl 2.0

> Use this for Toggl 2.0 accounts (focus.toggl.com).
>
> **API token**
> 1. Log in to [Toggl 2.0](https://focus.toggl.com).
> 2. Open **Settings** (https://focus.toggl.com/settings) and go to the **API token** section of your account settings.
> 3. Create a token and copy it. It starts with `toggl_sk_`. Tokens can expire, so create a new one and update this connection if requests start failing.
>
> **Organization ID**
> Open Toggl 2.0 in your browser and look at the address bar. The number after `/organizations/` is your organization ID (for example `https://focus.toggl.com/.../organizations/12345678/workspaces/...`).
>
> Note: Toggl 2.0 limits API requests per hour (30 on the Free plan, 240 on Starter, 600 on Premium).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token` | string | yes |  | API Token. The Toggl 2.0 API token (starts with toggl_sk_). |
| `organization_id` | string | yes |  | Organization ID. The number after /organizations/ in the Toggl 2.0 address bar. |

## Actions

### `create_client`

**Create Client.** Creates a client in a workspace. Needs the workspace and a name; notes and external reference are saved on Classic only. Returns the new client. A retry creates a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Client Name. The name of the new client. |
| `external_reference` | string | no |  | External Reference. External system reference. Toggl Track (Classic) only. |
| `notes` | string | no |  | Notes. Notes for the client. Toggl Track (Classic) only. |

Output fields:

- `id`: Client ID (number)
- `name`: Name
- `wid`: Workspace ID (number)
- `archived`: Archived (boolean)
- `notes`: Notes
- `external_reference`: External Reference
- `creator_id`: Creator ID (number)
- `at`: Last Updated (datetime)

### `create_project`

**Create Project.** Creates a project in a workspace. Needs the workspace and a name; client, privacy, billable, color, estimate, fee, and dates are optional (hourly rate and external reference are Classic only). Returns the new project. A retry creates a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Project Name. The name of the new project. |
| `client_id` | string | no |  | Client. The client to associate the project with. A value the product loads from the provider, such as an id; write the value itself. |
| `is_private` | boolean | no | `false` | Private. Whether the project is private or not. |
| `billable` | boolean | no | `false` | Billable. Whether the project is billable. (Premium feature) |
| `template` | boolean | no | `false` | Is Template. Whether the project is a template. (Premium feature) |
| `external_reference` | string | no |  | External Reference. External system reference. Toggl Track (Classic) only. |
| `color` | string | no |  | Project Color. Project color in hex format (e.g. #ff0000). |
| `active` | boolean | no | `true` | Active. Whether the project is active. Toggl Track (Classic) only. |
| `auto_estimates` | boolean | no | `false` | Auto Estimates. Whether estimates are based on task hours. (Premium feature) |
| `estimated_hours` | number | no |  | Estimated Hours. Estimated hours for the project. (Premium feature) |
| `rate` | number | no |  | Hourly Rate. Hourly rate. Premium feature, Toggl Track (Classic) only. |
| `fixed_fee` | number | no |  | Fixed Fee. Project fixed fee, in the workspace currency. (Premium feature) |
| `start_date` | string | no |  | Start Date. Start date of project timeframe (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. End date of project timeframe (YYYY-MM-DD). |

Output fields:

- `id`: Project ID (number)
- `name`: Name
- `workspace_id`: Workspace ID (number)
- `client_id`: Client ID (number)
- `client_name`: Client Name
- `status`: Status
- `active`: Active (boolean)
- `is_private`: Private (boolean)
- `billable`: Billable (boolean)
- `template`: Template (boolean)
- `pinned`: Pinned (boolean)
- `color`: Color
- `estimated_hours`: Estimated Hours (number)
- `actual_hours`: Tracked Hours (number)
- `actual_seconds`: Tracked Seconds (number)
- `rate`: Hourly Rate (number)
- `fixed_fee`: Fixed Fee (number)
- `currency`: Currency
- `start_date`: Start Date (date)
- `end_date`: End Date (date)
- `created_at`: Created At (datetime)
- `at`: Last Updated (datetime)

### `create_task`

**Create Task.** Creates a task under a project. Needs the workspace, project, and a name; external reference and the Active flag are Classic only. Returns the new task. A retry creates a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. The project to create the task under. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Task Name. The name of the new task. |
| `estimated_seconds` | number | no |  | Estimated Seconds. Estimated time in seconds. Toggl 2.0 stores whole minutes. |
| `external_reference` | string | no |  | External Reference. External system reference. Toggl Track (Classic) only. |
| `active` | boolean | no | `true` | Active. Uncheck to mark the task done. Toggl Track (Classic) only. |
| `user_id` | number | no |  | Creator User ID. Creator user ID, defaults to yours. Toggl 2.0 assigns them the task. |

Output fields:

- `id`: Task ID (number)
- `name`: Name
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `project_name`: Project Name
- `user_id`: User ID (number)
- `active`: Active (boolean)
- `estimated_seconds`: Estimated Seconds (number)
- `tracked_seconds`: Tracked Seconds (number)
- `recurring`: Recurring (boolean)
- `at`: Last Updated (datetime)

### `create_tag`

**Create Tag.** Creates a tag in a workspace. Needs the workspace and a name. Returns the new tag. A retry creates a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Tag Name. The name of the new tag. |

Output fields:

- `id`: Tag ID (number)
- `name`: Name
- `workspace_id`: Workspace ID (number)
- `creator_id`: Creator ID (number)
- `deleted_at`: Deleted At (datetime)
- `at`: Last Updated (datetime)

### `create_time_entry`

**Create Time Entry.** Creates a time entry with a start time and a duration in seconds (a negative duration with no stop starts a running timer). Returns the created entry. A retry creates a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `start` | ISO date-time string | yes |  | Start Time. The start time of the entry in UTC. |
| `duration` | number | yes |  | Duration (in seconds). Duration of the time entry. Use a negative number (e.g., -1) to start a running timer. |
| `stop` | ISO date-time string | no |  | Stop Time. The stop time of the entry in UTC. Can be omitted if still running. |
| `task_id` | string | no |  | Task. The task to select. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | no |  | Project. The project to associate the time entry with. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Tags to associate with the time entry. Tags that do not exist yet are created in the workspace. Values the product loads from the provider, such as ids; write an array of them. |
| `billable` | boolean | no | `false` | Billable. Whether the time entry is marked as billable. |
| `user_id` | number | no |  | Creator User ID. Time entry creator ID. If omitted, will use requester user ID. |

Output fields:

- `id`: Time Entry ID (number)
- `description`: Description
- `start`: Start (datetime)
- `stop`: Stop (datetime)
- `duration`: Duration (Seconds) (number)
- `billable`: Billable (boolean)
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `task_id`: Task ID (number)
- `user_id`: User ID (number)
- `tags`: Tags
- `tag_ids`: Tag IDs
- `at`: Last Updated (datetime)

### `start_time_entry`

**Start Time Entry.** Starts a running timer now, optionally linked to a project, task, and tags. Returns the running entry; end it with Stop Time Entry. A retry starts another timer (on Toggl 2.0 it also stops the previous one). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `project_id` | string | no |  | Project. The project to associate the time entry with. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Tags to associate with the time entry. Tags that do not exist yet are created in the workspace. Values the product loads from the provider, such as ids; write an array of them. |
| `billable` | boolean | no | `false` | Billable. Whether the time entry is marked as billable. |
| `task_id` | string | no |  | Task. The task to select. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Time Entry ID (number)
- `description`: Description
- `start`: Start (datetime)
- `stop`: Stop (datetime)
- `duration`: Duration (Seconds) (number)
- `billable`: Billable (boolean)
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `task_id`: Task ID (number)
- `user_id`: User ID (number)
- `tags`: Tags
- `tag_ids`: Tag IDs
- `at`: Last Updated (datetime)

### `stop_time_entry`

**Stop Time Entry.** Stops the current user's running time entry and returns the stopped entry, or { success: false, message } when nothing is running. On Toggl 2.0 only the given workspace is checked. Safe to retry once stopped. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Time Entry ID (number)
- `description`: Description
- `start`: Start (datetime)
- `stop`: Stop (datetime)
- `duration`: Duration (Seconds) (number)
- `billable`: Billable (boolean)
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `task_id`: Task ID (number)
- `user_id`: User ID (number)
- `tags`: Tags
- `tag_ids`: Tag IDs
- `at`: Last Updated (datetime)
- `success`: Success (boolean)
- `message`: Message

### `find_user`

**Find User.** Lists the members of a workspace, optionally filtered by name or email. Returns an array with id, user_id, name, email, and active. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `organization_id` | string | yes |  | Organization. The organization to operate in. For Toggl 2.0 this is the organization from the connection. A value the product loads from the provider, such as an id; write the value itself. |
| `search_term` | string | no |  | Name or Email. The name or email of the user to find. |
| `active` | boolean | no | `true` | Active Users Only. Return only active users. |
| `page` | number | no |  | Page Number. Page number for pagination. |
| `per_page` | number | no |  | Items Per Page. Number of items per page. |

Output fields:

- `[].id`: Workspace User ID (number)
- `[].user_id`: User ID (number)
- `[].name`: Name
- `[].email`: Email (email)
- `[].workspace_id`: Workspace ID (number)
- `[].active`: Active (boolean)
- `[].admin`: Admin (boolean)
- `[].role`: Role
- `[].timezone`: Timezone
- `[].at`: Last Updated (datetime)

### `find_project`

**Find Project.** Lists projects in a workspace, optionally filtered by name, status, billable, ownership, or template flag. On Toggl 2.0 "inactive" means archived. Returns an array of projects. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Project Name. The name of the project to find. |
| `active` | string | no | `"true"` | Project Status. Return active, inactive, or both types of projects. One of `"true"`, `"false"`, `"both"`. |
| `billable` | boolean | no |  | Billable Only. Return only billable projects. |
| `only_me` | boolean | no | `false` | My Projects Only. Get only projects assigned to the current user. |
| `only_templates` | boolean | no | `false` | Templates Only. Return only template projects. |
| `page` | number | no |  | Page Number. Page number for pagination. |
| `per_page` | number | no |  | Items Per Page. Number of items per page (max 200; Toggl 2.0: max 100). |

Output fields:

- `[].id`: Project ID (number)
- `[].name`: Name
- `[].workspace_id`: Workspace ID (number)
- `[].client_id`: Client ID (number)
- `[].client_name`: Client Name
- `[].status`: Status
- `[].active`: Active (boolean)
- `[].is_private`: Private (boolean)
- `[].billable`: Billable (boolean)
- `[].template`: Template (boolean)
- `[].pinned`: Pinned (boolean)
- `[].color`: Color
- `[].estimated_hours`: Estimated Hours (number)
- `[].actual_hours`: Tracked Hours (number)
- `[].actual_seconds`: Tracked Seconds (number)
- `[].rate`: Hourly Rate (number)
- `[].fixed_fee`: Fixed Fee (number)
- `[].currency`: Currency
- `[].start_date`: Start Date (date)
- `[].end_date`: End Date (date)
- `[].created_at`: Created At (datetime)
- `[].at`: Last Updated (datetime)

### `find_task`

**Find Task.** Lists tasks in a workspace, optionally filtered by name, project, status, and date range. Returns { total_count, page, per_page, data }. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Task Name. Search by task name. |
| `project_id` | number | no |  | Project ID. Filter by project ID. |
| `active` | string | no |  | Status. Filter by active state. One of `"true"`, `"false"`, `"both"`. |
| `page` | number | no |  | Page Number. Page number for pagination. |
| `per_page` | number | no |  | Items Per Page. Number of items per page (default 50). |
| `sort_field` | string | no |  | Sort Field. Field used for sorting. One of `"name"`, `"created_at"`. |
| `sort_order` | string | no |  | Sort Order. Sort order. One of `"ASC"`, `"DESC"`. |
| `start_date` | string | no |  | Start Date. Smallest boundary date (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. Biggest boundary date (YYYY-MM-DD). |

Output fields:

- `total_count`: Total Count (number)
- `page`: Page (number)
- `per_page`: Per Page (number)
- `data`: Tasks
- `data[].id`: Task ID (number)
- `data[].name`: Name
- `data[].workspace_id`: Workspace ID (number)
- `data[].project_id`: Project ID (number)
- `data[].project_name`: Project Name
- `data[].user_id`: User ID (number)
- `data[].active`: Active (boolean)
- `data[].estimated_seconds`: Estimated Seconds (number)
- `data[].tracked_seconds`: Tracked Seconds (number)
- `data[].recurring`: Recurring (boolean)
- `data[].at`: Last Updated (datetime)

### `find_client`

**Find Client.** Lists clients in a workspace, optionally filtered by name and active/archived status. Returns an array of clients. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Client Name. The name of the client to find (case-insensitive). |
| `status` | string | no |  | Status. Filter clients by their status. One of `"active"`, `"archived"`, `"both"`. |

Output fields:

- `[].id`: Client ID (number)
- `[].name`: Name
- `[].wid`: Workspace ID (number)
- `[].archived`: Archived (boolean)
- `[].notes`: Notes
- `[].external_reference`: External Reference
- `[].creator_id`: Creator ID (number)
- `[].at`: Last Updated (datetime)

### `find_tag`

**Find Tag.** Lists tags in a workspace, optionally filtered by name. Returns an array of tags. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Tag Name. Search by tag name. |
| `page` | number | no |  | Page Number. Page number for pagination. |
| `per_page` | number | no |  | Items Per Page. Number of items per page (Toggl 2.0: max 100). |

Output fields:

- `[].id`: Tag ID (number)
- `[].name`: Name
- `[].workspace_id`: Workspace ID (number)
- `[].creator_id`: Creator ID (number)
- `[].deleted_at`: Deleted At (datetime)
- `[].at`: Last Updated (datetime)

### `find_time_entry`

**Find Time Entry.** Lists the current user's time entries, optionally bounded by dates and filtered by description text. Agents: use Time Summary (Agent) for totals. On Toggl 2.0 the last 9 days are searched when no dates are given. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | no |  | Workspace. The workspace to search in. Toggl Track (Classic): leave empty to search all workspaces. Toggl 2.0: leave empty to use your current workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description Contains. Search for time entries containing this text in description. |
| `start_date` | string | no |  | Start Date. Get entries from start_date (YYYY-MM-DD or RFC3339 format). |
| `end_date` | string | no |  | End Date. Get entries until end_date (YYYY-MM-DD or RFC3339 format). |
| `before` | string | no |  | Before Date. Get entries before given date (YYYY-MM-DD or RFC3339 format). |
| `since` | number | no |  | Since Timestamp. Entries modified since this UNIX timestamp (range start on Toggl 2.0). |
| `meta` | boolean | no | `false` | Include Meta Data. Include meta entity data. Toggl Track (Classic) only. |
| `include_sharing` | boolean | no | `false` | Include Sharing. Include sharing details in the response. Toggl Track (Classic) only. |

Output fields:

- `[].id`: Time Entry ID (number)
- `[].description`: Description
- `[].start`: Start (datetime)
- `[].stop`: Stop (datetime)
- `[].duration`: Duration (Seconds) (number)
- `[].billable`: Billable (boolean)
- `[].workspace_id`: Workspace ID (number)
- `[].project_id`: Project ID (number)
- `[].task_id`: Task ID (number)
- `[].user_id`: User ID (number)
- `[].tags`: Tags
- `[].tag_ids`: Tag IDs
- `[].at`: Last Updated (datetime)

### `log_time_ai`

**Log Time (Agent).** Logs a completed time entry. Agents: use this instead of Create Time Entry. Needs a description, a start ("now" or an ISO datetime) and a duration in minutes; the project is optional, by name or ID (ambiguous or unknown names fail with the candidates listed). Returns the created entry. Each call creates a new entry, so a retry makes a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. What the time was spent on. |
| `project` | string | no |  | Project. Project name or ID. Leave empty for no project. |
| `start` | string | yes |  | Start. Start time: an ISO datetime, or "now". |
| `duration_minutes` | number | yes |  | Duration (minutes). How long the work took, in minutes. |

Output fields:

- `id`: Time Entry ID (number)
- `description`: Description
- `start`: Start (datetime)
- `stop`: Stop (datetime)
- `duration`: Duration (Seconds) (number)
- `billable`: Billable (boolean)
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `task_id`: Task ID (number)
- `user_id`: User ID (number)
- `tags`: Tags
- `tag_ids`: Tag IDs
- `at`: Last Updated (datetime)

### `start_timer_ai`

**Start Timer (Agent).** Starts a running timer now. Agents: use this instead of Start Time Entry, and Log Time (Agent) when the work is already done. Needs a description; the project is optional, by name or ID (ambiguous or unknown names fail with the candidates listed). Returns the running entry; stop it with Stop Time Entry. Each call starts a new timer (on Toggl 2.0 it also stops the previous one). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. What the timer is for. |
| `project` | string | no |  | Project. Project name or ID. Leave empty for no project. |

Output fields:

- `id`: Time Entry ID (number)
- `description`: Description
- `start`: Start (datetime)
- `stop`: Stop (datetime)
- `duration`: Duration (Seconds) (number)
- `billable`: Billable (boolean)
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `task_id`: Task ID (number)
- `user_id`: User ID (number)
- `tags`: Tags
- `tag_ids`: Tag IDs
- `at`: Last Updated (datetime)

### `time_summary_ai`

**Time Summary (Agent).** Sums the tracked time of a workspace between two dates (YYYY-MM-DD, inclusive), grouped by "project" (default), "user", or "client". Agents: use this for totals instead of paging through Search Detailed Report or Find Time Entry. An optional project name or ID narrows the summary to that project. Returns { total_hours, total_seconds, groups: [{ name, id, hours, seconds, entry_count }] }. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start_date` | string | yes |  | Start Date. First day of the range (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. Last day of the range (YYYY-MM-DD, inclusive). Leave empty for today. |
| `group_by` | string | no |  | Group By. "project" (default), "user", or "client". |
| `project` | string | no |  | Project. Project name or ID. Leave empty for all projects. |

Output fields:

- `start_date`: Start Date (date)
- `end_date`: End Date (date)
- `group_by`: Grouped By
- `total_hours`: Total Hours (number)
- `total_seconds`: Total Seconds (number)
- `groups`: Groups
- `groups[].name`: Name
- `groups[].id`: ID (number)
- `groups[].hours`: Hours (number)
- `groups[].seconds`: Seconds (number)
- `groups[].entry_count`: Entries (number)

### `get_client`

**Get Client.** Returns one client by ID. Notes and external reference are null on Toggl 2.0. Fails clearly when it does not exist. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `client_id` | string | yes |  | Client. The client to use. Agents can pass the client ID directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Client ID (number)
- `name`: Name
- `wid`: Workspace ID (number)
- `archived`: Archived (boolean)
- `notes`: Notes
- `external_reference`: External Reference
- `creator_id`: Creator ID (number)
- `at`: Last Updated (datetime)

### `update_client`

**Update Client.** Updates a client by ID; omitted fields keep their value, and Clear Notes empties the notes. Notes and external reference are Classic only. Returns the updated client. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `client_id` | string | yes |  | Client. The client to use. Agents can pass the client ID directly. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Name. Leave empty to keep the current name. |
| `notes` | string | no |  | Notes. Leave empty to keep the current notes. Toggl Track (Classic) only. |
| `clear_notes` | boolean | no | `false` | Clear Notes. Remove the notes. Toggl Track (Classic) only. |
| `external_reference` | string | no |  | External Reference. Leave empty to keep the current value. Toggl Track (Classic) only. |

Output fields:

- `id`: Client ID (number)
- `name`: Name
- `wid`: Workspace ID (number)
- `archived`: Archived (boolean)
- `notes`: Notes
- `external_reference`: External Reference
- `creator_id`: Creator ID (number)
- `at`: Last Updated (datetime)

### `delete_client`

**Delete Client.** Permanently deletes a client by ID. Returns { success, id }; a second call fails because it is already gone. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `client_id` | string | yes |  | Client. The client to use. Agents can pass the client ID directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `id`: Deleted ID (number)

### `get_project`

**Get Project.** Returns one project by ID with status, flags, estimate, and tracked time. Fails clearly when it does not exist. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. The project to create the task under. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Project ID (number)
- `name`: Name
- `workspace_id`: Workspace ID (number)
- `client_id`: Client ID (number)
- `client_name`: Client Name
- `status`: Status
- `active`: Active (boolean)
- `is_private`: Private (boolean)
- `billable`: Billable (boolean)
- `template`: Template (boolean)
- `pinned`: Pinned (boolean)
- `color`: Color
- `estimated_hours`: Estimated Hours (number)
- `actual_hours`: Tracked Hours (number)
- `actual_seconds`: Tracked Seconds (number)
- `rate`: Hourly Rate (number)
- `fixed_fee`: Fixed Fee (number)
- `currency`: Currency
- `start_date`: Start Date (date)
- `end_date`: End Date (date)
- `created_at`: Created At (datetime)
- `at`: Last Updated (datetime)

### `update_project`

**Update Project.** Updates a project by ID; omitted fields keep their value, and Active = No archives it. Hourly rate is Classic only. Returns the updated project. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. The project to create the task under. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Name. Leave empty to keep the current name. |
| `client_id` | string | no |  | Client. The client to associate the project with. A value the product loads from the provider, such as an id; write the value itself. |
| `is_private` | string | no |  | Private. Whether the project is private. Leave empty to keep the current value. One of `"yes"`, `"no"`. |
| `billable` | string | no |  | Billable. Whether the project is billable. (Premium feature) Leave empty to keep the current value. One of `"yes"`, `"no"`. |
| `active` | string | no |  | Active. No archives the project, Yes restores it. Leave empty to keep the current value. One of `"yes"`, `"no"`. |
| `color` | string | no |  | Project Color. Hex color like #ff0000. Leave empty to keep the current color. |
| `estimated_hours` | number | no |  | Estimated Hours. Leave empty to keep the current estimate. (Premium feature) |
| `rate` | number | no |  | Hourly Rate. Leave empty to keep it. Premium, Toggl Track (Classic) only. |
| `start_date` | string | no |  | Start Date. Start date of the project timeframe (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. End date of the project timeframe (YYYY-MM-DD). |

Output fields:

- `id`: Project ID (number)
- `name`: Name
- `workspace_id`: Workspace ID (number)
- `client_id`: Client ID (number)
- `client_name`: Client Name
- `status`: Status
- `active`: Active (boolean)
- `is_private`: Private (boolean)
- `billable`: Billable (boolean)
- `template`: Template (boolean)
- `pinned`: Pinned (boolean)
- `color`: Color
- `estimated_hours`: Estimated Hours (number)
- `actual_hours`: Tracked Hours (number)
- `actual_seconds`: Tracked Seconds (number)
- `rate`: Hourly Rate (number)
- `fixed_fee`: Fixed Fee (number)
- `currency`: Currency
- `start_date`: Start Date (date)
- `end_date`: End Date (date)
- `created_at`: Created At (datetime)
- `at`: Last Updated (datetime)

### `update_tag`

**Update Tag.** Renames a tag by ID; time entries keep the tag under its new name. Returns the updated tag. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `tag_id` | string | yes |  | Tag. The tag to use. Agents can pass the tag ID directly. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | New Name. The new name of the tag. |

Output fields:

- `id`: Tag ID (number)
- `name`: Name
- `workspace_id`: Workspace ID (number)
- `creator_id`: Creator ID (number)
- `deleted_at`: Deleted At (datetime)
- `at`: Last Updated (datetime)

### `delete_tag`

**Delete Tag.** Permanently deletes a tag by ID and removes it from every time entry. Returns { success, id }; a second call fails because it is already gone. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `tag_id` | string | yes |  | Tag. The tag to use. Agents can pass the tag ID directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `id`: Deleted ID (number)

### `get_time_entry`

**Get Time Entry.** Returns one time entry by ID. A running entry has duration -1 and no stop. Fails clearly when it does not exist. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | no |  | Workspace. The workspace to search in. Toggl Track (Classic): leave empty to search all workspaces. Toggl 2.0: leave empty to use your current workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `time_entry_id` | string | yes |  | Time Entry ID. The ID of the time entry (from Find Time Entry or a trigger). |

Output fields:

- `id`: Time Entry ID (number)
- `description`: Description
- `start`: Start (datetime)
- `stop`: Stop (datetime)
- `duration`: Duration (Seconds) (number)
- `billable`: Billable (boolean)
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `task_id`: Task ID (number)
- `user_id`: User ID (number)
- `tags`: Tags
- `tag_ids`: Tag IDs
- `at`: Last Updated (datetime)

### `get_current_time_entry`

**Get Current Time Entry.** Returns the running time entry with running = true, or { running: false } when no timer runs. On Toggl 2.0 only the given workspace is checked. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | no |  | Workspace. The workspace to search in. Toggl Track (Classic): leave empty to search all workspaces. Toggl 2.0: leave empty to use your current workspace. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `running`: Running (boolean)
- `id`: Time Entry ID (number)
- `description`: Description
- `start`: Start (datetime)
- `stop`: Stop (datetime)
- `duration`: Duration (Seconds) (number)
- `billable`: Billable (boolean)
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `task_id`: Task ID (number)
- `user_id`: User ID (number)
- `tags`: Tags
- `tag_ids`: Tag IDs
- `at`: Last Updated (datetime)

### `update_time_entry`

**Update Time Entry.** Updates one time entry by ID; omitted fields keep their value, Tags replaces the whole list, Clear Tags removes every tag, and a new stop time wins over duration. Returns the updated entry. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `time_entry_id` | string | yes |  | Time Entry ID. The ID of the time entry to update. |
| `description` | string | no |  | Description. Leave empty to keep the current description. |
| `clear_description` | boolean | no | `false` | Clear Description. Remove the description. |
| `start` | ISO date-time string | no |  | Start Time. New start time. Leave empty to keep the current start. |
| `stop` | ISO date-time string | no |  | Stop Time. New stop time. Leave empty to keep the current stop. |
| `duration` | number | no |  | Duration (in seconds). New duration; ignored when Stop Time is given. Empty keeps current. |
| `project_id` | string | no |  | Project. The project to associate the time entry with. A value the product loads from the provider, such as an id; write the value itself. |
| `task_id` | string | no |  | Task. The task to select. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Tags to associate with the time entry. Tags that do not exist yet are created in the workspace. Values the product loads from the provider, such as ids; write an array of them. |
| `clear_tags` | boolean | no | `false` | Clear Tags. Remove every tag from the time entry. |
| `billable` | string | no |  | Billable. Whether the time entry is billable. Leave empty to keep the current value. One of `"yes"`, `"no"`. |

Output fields:

- `id`: Time Entry ID (number)
- `description`: Description
- `start`: Start (datetime)
- `stop`: Stop (datetime)
- `duration`: Duration (Seconds) (number)
- `billable`: Billable (boolean)
- `workspace_id`: Workspace ID (number)
- `project_id`: Project ID (number)
- `task_id`: Task ID (number)
- `user_id`: User ID (number)
- `tags`: Tags
- `tag_ids`: Tag IDs
- `at`: Last Updated (datetime)

### `delete_time_entry`

**Delete Time Entry.** Deletes a time entry by ID. Returns { success, id }; a second call fails because it is already gone. Cannot be undone from Activepieces. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `time_entry_id` | string | yes |  | Time Entry ID. The ID of the time entry to delete. |

Output fields:

- `success`: Success (boolean)
- `id`: Deleted ID (number)

### `search_detailed_report`

**Search Detailed Report.** Returns one page of all members' time entries between two dates, with project, user, client, and description filters (the client filter is Classic only). Agents: use Time Summary (Agent) for totals. Returns { rows, next_cursor, has_more }; pass next_cursor back for the next page. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | string | yes |  | Start Date. First day of the report (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. Last day of the report (YYYY-MM-DD, inclusive). Leave empty for today. |
| `project_ids` | string | no |  | Project IDs. Comma-separated project IDs to include. |
| `user_ids` | string | no |  | User IDs. Comma-separated user IDs to include. |
| `client_ids` | string | no |  | Client IDs. Comma-separated client IDs to include. Toggl Track (Classic) only. |
| `description` | string | no |  | Description Contains. Only entries whose description contains this text. |
| `page_size` | number | no |  | Page Size. Rows per page (default 50, max 100 on Toggl 2.0). |
| `cursor` | string | no |  | Next Page Cursor. Pass next_cursor from the last result; empty for the first page. |

Output fields:

- `rows`: Rows
- `rows[].description`: Description
- `rows[].user_id`: User ID (number)
- `rows[].username`: User Name
- `rows[].project_id`: Project ID (number)
- `rows[].project_name`: Project Name
- `rows[].client_name`: Client Name
- `rows[].task_id`: Task ID (number)
- `rows[].task_name`: Task Name
- `rows[].billable`: Billable (boolean)
- `rows[].tag_ids`: Tag IDs
- `rows[].tag_names`: Tag Names
- `rows[].row_number`: Row Number (number)
- `rows[].time_entries`: Time Entries
- `rows[].time_entries[].id`: Time Entry ID (number)
- `rows[].time_entries[].seconds`: Seconds (number)
- `rows[].time_entries[].start`: Start (datetime)
- `rows[].time_entries[].stop`: Stop (datetime)
- `rows[].time_entries[].at`: Last Updated (datetime)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Page Cursor

### `list_workspaces`

**List Workspaces.** Lists the workspaces the connection can reach (id, name, organization ID). On Toggl 2.0 the other fields are null. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Workspace ID (number)
- `[].name`: Name
- `[].organization_id`: Organization ID (number)
- `[].role`: Role
- `[].admin`: Admin (boolean)
- `[].premium`: Premium (boolean)
- `[].default_currency`: Default Currency
- `[].default_hourly_rate`: Default Hourly Rate (number)
- `[].active_project_count`: Active Projects (number)
- `[].logo_url`: Logo (image)
- `[].last_modified`: Last Modified (datetime)
- `[].at`: Last Updated (datetime)

### `get_workspace`

**Get Workspace.** Returns one workspace by ID. On Toggl 2.0 only id, name, organization ID, and currency are filled. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Workspace ID (number)
- `name`: Name
- `organization_id`: Organization ID (number)
- `role`: Role
- `admin`: Admin (boolean)
- `premium`: Premium (boolean)
- `default_currency`: Default Currency
- `default_hourly_rate`: Default Hourly Rate (number)
- `active_project_count`: Active Projects (number)
- `logo_url`: Logo (image)
- `last_modified`: Last Modified (datetime)
- `at`: Last Updated (datetime)

### `list_organization_users`

**List Organization Users.** Lists every member of the organization across its workspaces, optionally filtered by name or email. Use Find User for a single workspace. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization. The organization to operate in. For Toggl 2.0 this is the organization from the connection. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Name or Email. Only members whose name or email contains this text. |

Output fields:

- `[].id`: Organization User ID (number)
- `[].user_id`: User ID (number)
- `[].name`: Name
- `[].email`: Email (email)
- `[].admin`: Admin (boolean)
- `[].owner`: Owner (boolean)
- `[].inactive`: Inactive (boolean)
- `[].joined`: Joined (boolean)
- `[].workspace_ids`: Workspace IDs

### `invite_user`

**Invite User to Organization.** Sends a Toggl invitation email to one address for the given workspace. Classic only. Returns the created invitations and messages. A retry can send another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization. The organization to operate in. For Toggl 2.0 this is the organization from the connection. A value the product loads from the provider, such as an id; write the value itself. |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The email address to invite. |
| `admin` | boolean | no | `false` | Workspace Admin. Make the invited user an admin of the workspace. |

Output fields:

- `invitations`: Invitations
- `messages`: Messages

### `add_user_to_project`

**Add User to Project.** Adds a workspace member to a project by user ID, optionally as manager. Classic only. Returns the project membership; fails if they are already a member. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. The project to create the task under. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User ID. The user_id of the member (from Find User). |
| `manager` | boolean | no | `false` | Project Manager. Make the user a manager of the project. |

Output fields:

- `id`: Project User ID (number)
- `project_id`: Project ID (number)
- `user_id`: User ID (number)
- `workspace_id`: Workspace ID (number)
- `manager`: Manager (boolean)
- `rate`: Hourly Rate (number)
- `at`: Last Updated (datetime)

### `create_group`

**Create Group.** Creates a group (team) in the organization with optional members. Returns { group_id, name, workspace_ids, user_ids }. A retry creates a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization. The organization to operate in. For Toggl 2.0 this is the organization from the connection. A value the product loads from the provider, such as an id; write the value itself. |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Group Name. |
| `user_ids` | string | no |  | Member Organization User IDs. Comma-separated IDs from List Organization Users. |
| `emoji` | string | no | `"👥"` | Emoji. Group emoji. Toggl 2.0 only. |

Output fields:

- `group_id`: Group ID (number)
- `name`: Name
- `workspace_ids`: Workspace IDs
- `user_ids`: Member IDs
- `at`: Last Updated (datetime)

### `delete_group`

**Delete Group.** Permanently deletes a group by ID; members stay in the organization. Returns { success, id }; a second call fails because it is already gone. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization. The organization to operate in. For Toggl 2.0 this is the organization from the connection. A value the product loads from the provider, such as an id; write the value itself. |
| `workspace_id` | string | yes |  | Workspace. The workspace to operate in. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | yes |  | Group ID. The ID of the group to delete (group_id from Create Group). |

Output fields:

- `success`: Success (boolean)
- `id`: Deleted ID (number)

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
