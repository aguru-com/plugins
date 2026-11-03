# Wrike

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wrike'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To obtain your OAuth2 credentials:
>
> 1. Go to Wrike (https://www.wrike.com/)
> 2. Sign in to your account or create one
> 3. Go to Apps & Integrations (https://www.wrike.com/apps/)
> 4. Click "Create new app" or use an existing one
> 5. For local development, add `http://localhost:4200/redirect` to the allowed redirect URIs
> 6. For production, add `https://cloud.activepieces.com/redirect` to the allowed redirect URIs
> 7. Copy the Client ID and Client Secret

## Actions

### `create_task`

**Create Task.** Create a task inside a specific Wrike folder, with optional status, importance, assignees (user IDs), start/due dates, duration, and custom fields. Use when an agent needs to add work items to a Wrike project or folder. Requires the target folder ID; each call creates a distinct task, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Folder ID. The ID of the folder where the task will be created. |
| `title` | string | yes |  | Task Title. The title of the task. |
| `description` | string | no |  | Description. The description of the task. |
| `status` | string | no |  | Status. The status of the task. One of `"Active"`, `"Completed"`, `"Deferred"`, `"Cancelled"`. |
| `importance` | string | no |  | Importance. The importance/priority of the task. One of `"Low"`, `"Normal"`, `"High"`, `"Critical"`. |
| `assignees` | array | no |  | Assignees. User IDs to assign to the task. Each item: { `userId` }. |
| `start_date` | ISO date-time string | no |  | Start Date. Task start date (format: YYYY-MM-DD) |
| `due_date` | ISO date-time string | no |  | Due Date. Task due date (format: YYYY-MM-DD) |
| `duration` | number | no |  | Duration. Task duration in minutes. |
| `customFields` | array | no |  | Custom Fields. Custom field values for the task. Each item: { `fieldId`, `value` }. |

### `update_task`

**Update Task.** Update an existing Wrike task identified by its task ID, setting only the provided fields (title, description, status, importance, assignees, dates, duration, custom fields); supplied assignees replace the existing ones. Use when an agent needs to modify a known task rather than create one. Requires the task ID; re-running with the same input leaves the task in the same state, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the task to update. |
| `title` | string | no |  | Task Title. The new title of the task. |
| `description` | string | no |  | Description. The new description of the task. |
| `status` | string | no |  | Status. The new status of the task. One of `"Active"`, `"Completed"`, `"Deferred"`, `"Cancelled"`. |
| `importance` | string | no |  | Importance. The new importance/priority of the task. One of `"Low"`, `"Normal"`, `"High"`, `"Critical"`. |
| `assignees` | array | no |  | Assignees. User IDs to assign to the task (replaces existing assignees) Each item: { `userId` }. |
| `start_date` | ISO date-time string | no |  | Start Date. Task start date (format: YYYY-MM-DD) |
| `due_date` | ISO date-time string | no |  | Due Date. Task due date (format: YYYY-MM-DD) |
| `duration` | number | no |  | Duration. Task duration in minutes. |
| `customFields` | array | no |  | Custom Fields. Custom field values to update for the task. Each item: { `fieldId`, `value` }. |

### `create_folder`

**Create Folder.** Create a folder in Wrike, either at root level or nested under a parent folder ID; enabling the project option turns it into a project with owner and start/end dates instead of a plain folder. Use when an agent needs to set up a new container for tasks. Each call creates a new folder, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentFolderId` | string | no |  | Parent Folder ID. The ID of the parent folder where the new folder will be created. Leave empty to create at root level. |
| `title` | string | yes |  | Folder Title. The title of the folder. |
| `description` | string | no |  | Description. The description of the folder. |
| `shareds` | array | no |  | Shared Users. User IDs to share the folder with. Each item: { `userId` }. |
| `project` | boolean | no | `false` | Create as Project. Whether this folder should be created as a project with additional project settings. |
| `projectOwnerId` | string | no |  | Project Owner ID. The ID of the user who will own the project (required when creating as project) |
| `projectStartDate` | ISO date-time string | no |  | Project Start Date. The start date of the project (format: YYYY-MM-DD) |
| `projectEndDate` | ISO date-time string | no |  | Project End Date. The end date of the project (format: YYYY-MM-DD) |

### `create_project`

**Create Project.** Create a project in Wrike (a folder configured as a project) at root level or under a parent folder ID, with optional owners, shared users, and start/end dates. Use when an agent needs a project container rather than a plain folder. Each call creates a new project, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentFolderId` | string | no |  | Parent Folder ID. The ID of the parent folder where the project will be created. Leave empty to create at root level. |
| `title` | string | yes |  | Project Title. The title of the project. |
| `description` | string | no |  | Description. The description of the project. |
| `ownerIds` | array | no |  | Owner IDs. User IDs who will own the project. Each item: { `userId` }. |
| `shareds` | array | no |  | Shared Users. User IDs to share the project with. Each item: { `userId` }. |
| `start_date` | ISO date-time string | no |  | Start Date. Project start date (format: YYYY-MM-DD) |
| `end_date` | ISO date-time string | no |  | End Date. Project end date (format: YYYY-MM-DD) |

### `add_comment`

**Add Comment.** Post a comment on a Wrike task or folder, selected via the entity type and entity ID; the comment text can be HTML or plain text. Use when an agent needs to annotate or leave a note on an item. Each call appends a new comment, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. Select whether you want to add the comment to a task or folder. One of `"tasks"`, `"folders"`. |
| `entityId` | string | yes |  | Entity ID. The ID of the task or folder to add the comment to. |
| `text` | string | yes |  | Comment Text. The text content of the comment. |
| `plainText` | boolean | no | `false` | Plain Text. Whether the comment should be treated as plain text (no HTML formatting). Default is HTML formatting. |

### `upload_attachment`

**Upload Attachment.** Upload a file and attach it to a Wrike task or folder, chosen via the entity type and entity ID, with an optional custom file name. Use when an agent needs to add a document or asset to an item. Each call uploads a new attachment, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. Select whether to attach the file to a task or folder. One of `"tasks"`, `"folders"`. |
| `entityId` | string | yes |  | Entity ID. The ID of the task or folder to attach the file to. |
| `file` | file | yes |  | File. The file to upload and attach. Files are not supported; an action that needs one fails. |
| `fileName` | string | no |  | File Name. Optional custom name for the uploaded file. |

### `find_task`

**Find Task.** Look up Wrike tasks: pass a task ID to fetch that exact task (other criteria are ignored), or omit it to search/filter by title, folder, status, importance, assignees, or authors with sorting and page size. Use when an agent needs to find or read tasks before acting on them. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | no |  | Task ID. The ID of the task to retrieve. If provided, other search criteria will be ignored. |
| `title` | string | no |  | Task Title. Search for tasks by title (partial match) |
| `folderId` | string | no |  | Folder ID. Search for tasks within a specific folder. |
| `status` | string | no |  | Status. Filter tasks by status. One of `"Active"`, `"Completed"`, `"Deferred"`, `"Cancelled"`. |
| `importance` | string | no |  | Importance. Filter tasks by importance/priority. One of `"Low"`, `"Normal"`, `"High"`, `"Critical"`. |
| `assignees` | array | no |  | Assignee IDs. Filter tasks by assignee user IDs. Each item: { `userId` }. |
| `authors` | array | no |  | Author IDs. Filter tasks by author user IDs. Each item: { `userId` }. |
| `pageSize` | number | no | `100` | Page Size. Maximum number of tasks to return (max 1000) |
| `sortField` | string | no |  | Sort Field. Field to sort tasks by. One of `"CreatedDate"`, `"UpdatedDate"`, `"DueDate"`, `"StartDate"`, `"CompletedDate"`, `"Title"`, `"Status"`, `"Importance"`. |
| `sortOrder` | string | no |  | Sort Order. Sort order for results. One of `"Asc"`, `"Desc"`. |

### `find_folder`

**Find Folder / Project.** Look up Wrike folders or projects: pass a folder ID to fetch that exact one (other criteria are ignored), or omit it to search/filter by title, parent folders, authors, owners, or the projects-only flag. Use when an agent needs to resolve or read folder/project metadata before acting. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | no |  | Folder ID. The ID of the folder/project to retrieve. If provided, other search criteria will be ignored. |
| `title` | string | no |  | Title. Search for folders/projects by title (partial match) |
| `parentIds` | array | no |  | Parent IDs. Search for folders/projects within specific parent folders. Each item: { `folderId` }. |
| `project` | boolean | no |  | Is Project. Filter to only return projects (folders marked as projects) |
| `pageSize` | number | no | `100` | Page Size. Maximum number of folders/projects to return (max 1000) |
| `authors` | array | no |  | Author IDs. Filter by authors (users who created the folders) Each item: { `userId` }. |
| `owners` | array | no |  | Owner IDs. Filter by owners (users who own the projects) Each item: { `userId` }. |

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
