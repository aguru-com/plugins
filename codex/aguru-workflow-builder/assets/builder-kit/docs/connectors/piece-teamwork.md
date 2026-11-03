# Teamwork

Teamwork is a work and project management tool that helps teams improve collaboration, visibility, and accountability.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-teamwork'
  version: '0.1.7'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your Teamwork username (email address) and password.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. Your Teamwork email address. |
| `password` | string | yes |  | Password. |
| `subdomain` | string | yes |  | Subdomain. Your Teamwork site subdomain (e.g., mycompany for mycompany.teamwork.com) |

## Actions

### `create_project`

**Create Project.** Creates a new Teamwork project under a company. Use to spin up a project workspace before adding task lists, tasks, or milestones; requires a name and a company to associate it with, and accepts optional category, tags, dates, owner, and custom fields. Not idempotent — each call creates a separate project even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the project. |
| `description` | string | no |  | Description. A description for the project. |
| `companyId` | string | yes |  | Company. The company to associate the project with. A value the product loads from the provider, such as an id; write the value itself. |
| `category-id` | string | no |  | Category. The category to assign the project to. A value the product loads from the provider, such as an id; write the value itself. |
| `tagIds` | array | no |  | Tags. Tags to associate with the project. Values the product loads from the provider, such as ids; write an array of them. |
| `start-date` | ISO date-time string | no |  | Start Date. The start date of the project. |
| `end-date` | ISO date-time string | no |  | End Date. The end date of the project. |
| `projectOwnerId` | string | no |  | Project Owner. The user to assign as the project owner. A value the product loads from the provider, such as an id; write the value itself. |
| `customFields` | object | no |  | Custom Fields. Custom fields for this project. An object whose fields depend on other inputs; the product shows them. |

### `create_task_list`

**Create Task List.** Creates a new task list inside an existing Teamwork project to group related tasks. Use after a project exists and before creating tasks that should live in a specific list; requires the target project and a list name, and can set default priority/tags for tasks added later. Not idempotent — each call adds another list even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. The project to create the task list in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The name of the task list. |
| `description` | string | no |  | Description. A description for the task list. |
| `private` | boolean | no |  | Private. Set to true to make the task list private. |
| `priority` | string | no |  | Default Task Priority. The default priority for new tasks in this list. One of `""`, `"low"`, `"medium"`, `"high"`. |
| `tags` | array | no |  | Default Task Tags. Default tags for new tasks in this list. Values the product loads from the provider, such as ids; write an array of them. |

### `create_task`

**Create Task.** Creates a task within a project and task list in Teamwork. Use to add an actionable item with content, optional due/start dates, assignees, priority, tags, custom fields, and an optional file attachment (uploaded via presigned URL before the task is created). Requires the target project and task list. Not idempotent — each call creates a new task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. The project to create the task in. A value the product loads from the provider, such as an id; write the value itself. |
| `tasklistId` | string | yes |  | Task List. The task list to add the task to. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Content. The content of the task. |
| `responsible-party-id` | array | no |  | Responsible Parties. The users responsible for the task. Values the product loads from the provider, such as ids; write an array of them. |
| `start-date` | ISO date-time string | no |  | Start Date. The start date of the task. |
| `due-date` | ISO date-time string | no |  | Due Date. The due date of the task. |
| `description` | string | no |  | Description. A description for the task. |
| `priority` | string | no |  | Priority. The priority of the task. One of `""`, `"low"`, `"medium"`, `"high"`. |
| `tagIds` | array | no |  | Tags. Tags to associate with the task. Values the product loads from the provider, such as ids; write an array of them. |
| `attachment` | file | no |  | Attachment. A file to attach to the task. Files are not supported; an action that needs one fails. |
| `customFields` | object | no |  | Custom Fields. Custom fields for this task. An object whose fields depend on other inputs; the product shows them. |

### `mark_task_complete`

**Mark Task Complete.** Marks an existing Teamwork task as complete by its task ID. Use to close out a task once its work is done. Idempotent — re-running on an already-completed task leaves it completed with no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. The task to mark as complete. A value the product loads from the provider, such as an id; write the value itself. |

### `create_company`

**Create Company.** Creates a new company record in Teamwork. Use to register a client or organization before associating projects or people with it; requires a name and accepts optional address, contact, profile, and custom-field details. Not idempotent — each call creates a separate company even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the company. |
| `website` | string | no |  | Website. Company's website address. |
| `addressOne` | string | no |  | Address 1. Primary address line. |
| `addressTwo` | string | no |  | Address 2. Secondary address line. |
| `city` | string | no |  | City. City name. |
| `state` | string | no |  | State. State or province. |
| `zip` | string | no |  | Zip Code. Postal or zip code. |
| `countrycode` | string | no |  | Country Code. 2-letter ISO country code (e.g., US, GB). |
| `phone` | string | no |  | Phone. Primary phone number. |
| `fax` | string | no |  | Fax. Fax number. |
| `emailOne` | string | no |  | Email 1. Primary email address. |
| `emailTwo` | string | no |  | Email 2. Secondary email address. |
| `emailThree` | string | no |  | Email 3. Tertiary email address. |
| `profile` | string | no |  | Profile. Public company profile or 'About Us' text. |
| `privateNotes` | string | no |  | Private Notes. Notes visible only to internal users. |
| `customFields` | object | no |  | Custom Fields. Custom fields for this company. An object whose fields depend on other inputs; the product shows them. |

### `create_person`

**Create Person.** Creates a new person in Teamwork as a standard user, collaborator, or contact (chosen via user type). Use to add a team member or external contact, optionally tied to a company and optionally sent an invite email. Requires first name, last name, email, and user type. Not idempotent — each call creates a new person. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first-name` | string | yes |  | First Name. The user's first name. |
| `last-name` | string | yes |  | Last Name. The user's last name. |
| `email-address` | string | yes |  | Email. The user's email address. |
| `user-type` | string | yes |  | User Type. The type of user to create. One of `"account"`, `"collaborator"`, `"contact"`. |
| `company-id` | string | no |  | Company. The company to associate the user with. A value the product loads from the provider, such as an id; write the value itself. |
| `sendInvite` | boolean | no |  | Send Invite. Send an invitation email to the new user. |
| `title` | string | no |  | Title. The user's job title. |

### `update_task`

**Update Task.** Updates fields on an existing Teamwork task identified by task ID — only the fields you supply (content, description, assignees, start/due dates, priority, tags) are changed. Use to edit a task after it exists. Idempotent — repeating the same update yields the same final task state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. The task to update. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | no |  | Content. The new content of the task. |
| `description` | string | no |  | Description. The new description for the task. |
| `responsible-party-id` | array | no |  | Responsible Parties. The new users responsible for the task. Values the product loads from the provider, such as ids; write an array of them. |
| `start-date` | ISO date-time string | no |  | Start Date. The new start date of the task. |
| `due-date` | ISO date-time string | no |  | Due Date. The new due date of the task. |
| `priority` | string | no |  | Priority. The new priority of the task. One of `""`, `"low"`, `"medium"`, `"high"`. |
| `tagIds` | array | no |  | Tags. New tags to associate with the task. Values the product loads from the provider, such as ids; write an array of them. |

### `create_task_comment`

**Create Task Comment.** Posts a comment on an existing Teamwork task, optionally private and with notification (nobody, followers, or all project users) and an optional file attachment uploaded via presigned URL. Use to add a note or reply on a task. Requires the task ID and comment body. Not idempotent — each call adds another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. The task to add a comment to. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Comment. The content of the comment. |
| `attachment` | file | no |  | Attachment. A file to attach to the comment. Files are not supported; an action that needs one fails. |
| `notify` | string | no |  | Notify. Who to notify about this comment. One of `""`, `"true"`, `"all"`. |
| `isprivate` | boolean | no |  | Private. Set to true to make the comment private. |

### `create_time_entry_on_task`

**Create Time Entry on Task.** Logs a time entry against an existing Teamwork task, recording hours and minutes for a given date (optionally a start time, description, and billable flag). Use to track work time on a task. Requires the task ID, date, hours, and minutes. Not idempotent — each call appends a new time log. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | yes |  | Date. Date of the time entry (yyyy-mm-dd) |
| `time` | string | no |  | Time. Time of the entry (hh:mm:ss) |
| `hours` | number | yes |  | Hours. |
| `minutes` | number | yes |  | Minutes. Duration in minutes. |
| `description` | string | no |  | Description. |
| `isBillable` | boolean | no |  | Is Billable. |

### `create_expense`

**Create Expense.** Records an expense against a Teamwork project with a name, cost, and date (and optional description). Use to log a project cost for billing or tracking. Requires the project, name, cost, and date. Not idempotent — each call creates a new expense. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project-id` | string | yes |  | Project. The project to log the expense against. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The name of the expense. |
| `cost` | number | yes |  | Cost. The cost of the expense. |
| `date` | ISO date-time string | yes |  | Date. The date of the expense. |
| `description` | string | no |  | Description. A description for the expense. |

### `upload_file_to_project`

**Upload File to Project.** Uploads a file to a Teamwork project (via presigned URL, then finalized as a project file), optionally with a description, category, and private flag. Use to attach a document to a project. Requires the target project and the file. Not idempotent — each call uploads a new file entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. The project to upload the file to. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload. Files are not supported; an action that needs one fails. |
| `description` | string | no |  | Description. A description for the file. |
| `categoryId` | string | no |  | Category. The category to assign the file to. A value the product loads from the provider, such as an id; write the value itself. |
| `private` | boolean | no |  | Private. Set to true to make the file private. |

### `create_message_reply`

**Create Message Reply.** Posts a reply to an existing Teamwork message thread, optionally notifying all project users. Use to respond within a message/discussion. Requires the message ID and reply body. Not idempotent — each call adds another reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message. The message to reply to. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Body. The content of the reply. |
| `notify` | boolean | no |  | Notify All. Notify all project users of this reply. |

### `create_milestone`

**Create Milestone.** Creates a milestone in a Teamwork project with a title, deadline, and responsible parties (optionally a description, notify flag, and private flag). Use to set a dated project goal. Requires the project, title, deadline, and at least one responsible party. Not idempotent — each call creates a new milestone. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. The project to create the milestone in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the milestone. |
| `deadline` | ISO date-time string | yes |  | Deadline. The due date of the milestone. |
| `responsible-party-ids` | array | yes |  | Responsible Parties. The users responsible for the milestone. Values the product loads from the provider, such as ids; write an array of them. |
| `description` | string | no |  | Description. A description for the milestone. |
| `notify` | boolean | no |  | Notify. Notify responsible parties about the milestone. |
| `private` | boolean | no |  | Private. Set to true to make the milestone private. |

### `add_people_to_project`

**Add People to Project.** Adds existing Teamwork users to a project as members. Use to grant people access to a project after both the project and the users exist. Requires the target project and a list of user IDs. Idempotent — re-adding users already on the project leaves the membership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. The project to add people to. A value the product loads from the provider, such as an id; write the value itself. |
| `userIdList` | array | yes |  | Users. The users to add to the project. Values the product loads from the provider, such as ids; write an array of them. |

### `find_task`

**Find Task.** Searches Teamwork tasks by keyword, optionally scoped to a single project. Use to locate a task and obtain its ID before updating, commenting on, or completing it. Requires a search term. Idempotent — a read-only search with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchTerm` | string | yes |  | Search Term. The keyword to search for. |
| `projectId` | string | no |  | Project. Limit the search to a specific project. A value the product loads from the provider, such as an id; write the value itself. |

### `find_company`

**Find Company.** Searches Teamwork companies by name or domain, optionally scoped to a single project. Use to look up a company and obtain its ID before associating projects or people with it. Requires a search term. Idempotent — a read-only search with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchTerm` | string | yes |  | Search Term. The name or domain to search for. |
| `projectId` | string | no |  | Project. Limit the search to a specific project. A value the product loads from the provider, such as an id; write the value itself. |

### `find_milestone`

**Find Milestone.** Searches Teamwork milestones by name or due date, optionally scoped to a single project. Use to locate a milestone and obtain its details/ID. Requires a search term. Idempotent — a read-only search with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchTerm` | string | yes |  | Search Term. The name or due date to search for. |
| `projectId` | string | no |  | Project. Limit the search to a specific project. A value the product loads from the provider, such as an id; write the value itself. |

### `find_notebook_or_comment`

**Find Notebook / Notebook Comment.** Searches Teamwork by keyword for either notebooks or notebook comments (selected via the search-for mode), optionally scoped to a single project. Use to locate a notebook or its comments and obtain their details. Requires choosing the item type and a search term. Idempotent — a read-only search with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchFor` | string | yes |  | Search For. The type of item to search for. One of `"notebooks"`, `"notebookComments"`. |
| `searchTerm` | string | yes |  | Search Term. The keyword to search for. |
| `projectId` | string | no |  | Project. Limit the search to a specific project. A value the product loads from the provider, such as an id; write the value itself. |
