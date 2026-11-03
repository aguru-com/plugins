# Microsoft 365 Planner

Microsoft 365 Planner is part of the Microsoft 365 suite, offering lightweight task and bucket-based planning for teams. This integration supports creating plans, buckets, tasks, fetching them, deleting them, and custom API calls.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-365-planner'
  version: '0.3.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you'd like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - Group.Read.All
> - Tasks.ReadWrite
> - User.Read

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `createPlan`

**Create Plan.** Creates a new Microsoft 365 Planner plan with the given title, owned by a specified Microsoft 365 group. Use to set up a fresh planning board before adding buckets or tasks. The group must already exist; each call creates a separate plan, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group. Select the Grroup. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the plan. |

### `createBucket`

**Create Bucket.** Creates a new bucket (a column/category for grouping tasks) under an existing Planner plan, identified by plan ID. Use to organize tasks within a plan. Each call adds another bucket, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Bucket Name. The name of the bucket to be created. |
| `orderHint` | string | no |  | Order Hint. Hint used to order items of this type in a list. The format is defined as outlined here: https://learn.microsoft.com/en-us/graph/api/resources/planner-order-hint-format?view=graph-rest-1.0. |

### `createTask`

**Create Task.** Creates a new task in a Planner plan, optionally placing it in a bucket and setting assignees, due/start dates, priority, and percent complete. Use to add work items to a plan. Each call creates a separate task, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `bucketId` | string | no |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the task to be created. |
| `assignments` | array | no |  | Assignments. Select users to assign the task to. If left empty, the task will be unassigned. Values the product loads from the provider, such as ids; write an array of them. |
| `dueDateTime` | ISO date-time string | no |  | Due Date. The due date and time for the task. |
| `percentComplete` | number | no |  | Percent Complete. The completion percentage of the task (0-100) |
| `priority` | number | no |  | Priority. The priority of the task between 0 and 10, with the increasing value being lower priority (0 has the highest priority and 10 has the lowest priority). |
| `startDateTime` | ISO date-time string | no |  | Start Date. The start date and time for the task. |

### `deleteBucket`

**Delete Bucket.** Permanently deletes a bucket from a Planner plan by bucket ID. Use to remove a category and stop grouping tasks under it. Destructive and not idempotent; once removed, repeating the call fails because the bucket no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `id` | string | yes |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |

### `deleteTask`

**Delete Task.** Permanently deletes a task from a Planner plan by task ID. Use to remove a work item. Destructive and not idempotent; once removed, repeating the call fails because the task no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `id` | string | yes |  | Task. Select the task. A value the product loads from the provider, such as an id; write the value itself. |

### `updatePlan`

**Update Plan.** Updates an existing Planner plan's title, identified by plan ID. Use to rename a plan. Idempotent: setting the same title repeatedly leaves the plan in the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The new title of the plan. |

### `updateBucket`

**Update Bucket.** Updates an existing bucket's name and/or order hint, identified by bucket ID within a plan. Use to rename or reorder a bucket. Idempotent: applying the same field values repeatedly leaves the bucket in the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `id` | string | yes |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. The new name of the bucket. |
| `orderHint` | string | no |  | Order Hint. Hint used to order items of this type in a list. The format is defined as outlined here: https://learn.microsoft.com/en-us/graph/api/resources/planner-order-hint-format?view=graph-rest-1.0. |

### `updateTask`

**Update Task.** Updates fields on an existing Planner task identified by task ID, such as title, assignees, due/start dates, priority, and percent complete. Use to edit a task; only provided fields are changed. Idempotent: applying the same field values repeatedly leaves the task in the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `id` | string | yes |  | Task. Select the task. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. The new title of the task. |
| `assignments` | array | no |  | Assignments. Select users to assign the task to. If left empty, the task will be unassigned. Values the product loads from the provider, such as ids; write an array of them. |
| `dueDateTime` | ISO date-time string | no |  | Due Date. The due date and time for the task. |
| `percentComplete` | number | no |  | Percent Complete. The completion percentage of the task (0-100) |
| `priority` | number | no |  | Priority. The priority of the task between 0 and 10, with the increasing value being lower priority (0 has the highest priority and 10 has the lowest priority). |
| `startDateTime` | ISO date-time string | no |  | Start Date. The start date and time for the task. |

### `findAPlan`

**Find a Plan.** Searches across the authenticated user's Planner plans and returns those whose title contains the given text (case-insensitive substring match). Use to resolve a plan name into its plan ID before acting on it. Read-only and idempotent; the title input is required. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title of the plan to search for. |

### `getABucket`

**Get a Bucket.** Retrieves the details of a single Planner bucket by its bucket ID (within a known plan). Use to inspect a bucket's current name and order hint. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `bucketId` | string | yes |  | Bucket. Select the bucket. A value the product loads from the provider, such as an id; write the value itself. |

### `findTask`

**Find Task.** Searches the tasks of a given Planner plan and returns those whose title contains the given text (case-insensitive substring match). Use to locate a task ID within a known plan. Read-only and idempotent; both plan ID and title are required. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the task to search for. |

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
