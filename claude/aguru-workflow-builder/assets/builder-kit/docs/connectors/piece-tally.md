# Tally

Receive form submissions from Tally forms

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tally'
  version: '0.6.2'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
>
> 1. Sign in to [Tally](https://tally.so) and open **Settings**.
> 2. Go to **API keys** and click **Create API key**.
> 3. Copy the key and paste it below.

## Actions

### `list_forms`

**List Forms.** Lists forms with pagination, including each form's id, name, workspace id, status, submission count, and closed state. Use to discover form ids before calling other form/submission/analytics atomics. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no |  | Page. Page number, starting at 1. Defaults to 1. |
| `limit` | number | no |  | Limit. Number of forms per page (max 500). Defaults to 50. |

Output fields:

- `items`: Forms
- `items[].id`: Form ID
- `items[].name`: Name
- `items[].workspaceId`: Workspace ID
- `items[].folderId`: Folder ID
- `items[].status`: Status
- `items[].isClosed`: Closed (boolean)
- `items[].hasDraftBlocks`: Has Draft Blocks (boolean)
- `items[].numberOfSubmissions`: Number Of Submissions (number)
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `page`: Page (number)
- `total`: Total (number)
- `hasMore`: Has More (boolean)

### `create_form`

**Create Form.** Creates a new form from a raw Tally blocks array (the same structure the Tally editor produces/exports) and an initial status. Use Get Form on an existing form to see the exact block shape before authoring new blocks. Each call creates a new form, so it is not idempotent (retries duplicate). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `blocks` | JSON | yes |  | Blocks. Array of Tally block objects that define the form content and fields (titles, inputs, choices, etc). Fetch an existing form with Get Form to see the exact shape blocks must take. |
| `status` | string | yes |  | Status. BLANK has no content yet; DRAFT is editable and not publicly accessible; PUBLISHED is live and accepting submissions. One of `"BLANK"`, `"DRAFT"`, `"PUBLISHED"`. |
| `workspace_id` | string | no |  | Workspace. Defaults to your account's default workspace if left empty. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | no |  | Folder. Only folders inside the selected workspace are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `template_id` | string | no |  | Template ID. Optional Tally template ID to base the form on. |
| `settings` | JSON | no |  | Settings. Optional form settings object (language, notifications, redirects, data retention, styling, password protection, etc). |

Output fields:

- `id`: Form ID
- `name`: Name
- `workspaceId`: Workspace ID
- `folderId`: Folder ID
- `status`: Status
- `isClosed`: Closed (boolean)
- `hasDraftBlocks`: Has Draft Blocks (boolean)
- `numberOfSubmissions`: Number Of Submissions (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `get_form`

**Get Form.** Fetches one form by id with its full definition — blocks (the form content/fields) and settings — in addition to the summary fields List Forms already returns. Use to inspect a form's exact block shape before calling Update Form or Create Form. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Form ID
- `name`: Name
- `workspaceId`: Workspace ID
- `folderId`: Folder ID
- `status`: Status
- `isClosed`: Closed (boolean)
- `hasDraftBlocks`: Has Draft Blocks (boolean)
- `numberOfSubmissions`: Number Of Submissions (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `settings`: Settings
- `blocks`: Blocks

### `update_form`

**Update Form.** Partially updates a form: only the fields you provide are changed, everything else is left as-is. Passing blocks or settings replaces that whole field, so fetch the current form with Get Form first if you need to preserve unrelated blocks/settings. Repeating the same call converges on the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `status` | string | no |  | Status. One of `"BLANK"`, `"DRAFT"`, `"PUBLISHED"`. |
| `blocks` | JSON | no |  | Blocks. Replaces the entire blocks array. Use Get Form first to fetch the current blocks so you can merge your change into the full array rather than dropping the rest of the form content. |
| `settings` | JSON | no |  | Settings. Replaces the entire settings object. Use Get Form first if you need to preserve other settings. |

Output fields:

- `id`: Form ID
- `name`: Name
- `workspaceId`: Workspace ID
- `folderId`: Folder ID
- `status`: Status
- `isClosed`: Closed (boolean)
- `hasDraftBlocks`: Has Draft Blocks (boolean)
- `numberOfSubmissions`: Number Of Submissions (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `delete_form`

**Delete Form.** Permanently deletes a form and its submissions — Tally has no trash/undo for this endpoint, so confirm the caller genuinely wants the whole form removed. A repeat call errors once the form is gone, so this is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |

### `list_form_questions`

**List Form Questions.** Lists a form's questions with their ids, titles, and types. Use to resolve a questionId to its label before reading List Submissions / Get Submission responses, since raw submission answers are keyed by questionId, not by label. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `hasResponses`: Has Responses (boolean)
- `questions`: Questions
- `questions[].id`: Question ID
- `questions[].type`: Type
- `questions[].title`: Title
- `questions[].formId`: Form ID
- `questions[].isDeleted`: Deleted (boolean)
- `questions[].numberOfResponses`: Number Of Responses (number)

### `list_submissions`

**List Submissions.** Lists a form's submissions with pagination and optional completion/date filters, including each response keyed by questionId. Use List Form Questions to resolve questionId to a label. For a single known submission use Get Submission instead. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `filter` | string | no |  | Filter. Filter by submission completion status. Defaults to all. One of `"all"`, `"completed"`, `"partial"`. |
| `start_date` | string | no |  | Start Date. ISO 8601 date-time. Include submissions on or after this date. |
| `end_date` | string | no |  | End Date. ISO 8601 date-time. Include submissions on or before this date. |
| `after_id` | string | no |  | After Submission ID. Return submissions after this submission id (cursor-style pagination). |
| `page` | number | no |  | Page. Page number, starting at 1. Defaults to 1. |
| `limit` | number | no |  | Limit. Submissions per page (max 500). Defaults to 50. |

Output fields:

- `page`: Page (number)
- `hasMore`: Has More (boolean)
- `totalNumberOfSubmissionsPerFilter`: Totals
- `totalNumberOfSubmissionsPerFilter.all`: All (number)
- `totalNumberOfSubmissionsPerFilter.completed`: Completed (number)
- `totalNumberOfSubmissionsPerFilter.partial`: Partial (number)
- `questions`: Questions
- `questions[].id`: Question ID
- `questions[].type`: Type
- `questions[].title`: Title
- `questions[].formId`: Form ID
- `questions[].isDeleted`: Deleted (boolean)
- `questions[].numberOfResponses`: Number Of Responses (number)
- `submissions`: Submissions
- `submissions[].id`: Submission ID
- `submissions[].formId`: Form ID
- `submissions[].isCompleted`: Completed (boolean)
- `submissions[].submittedAt`: Submitted At (datetime)
- `submissions[].previewUrl`: Preview URL (url)
- `submissions[].pdfUrl`: PDF URL (url)
- `submissions[].responses`: Responses
- `submissions[].responses[].id`: Response ID
- `submissions[].responses[].questionId`: Question ID
- `submissions[].responses[].respondentId`: Respondent ID
- `submissions[].responses[].answer`: Answer

### `get_submission`

**Get Submission.** Fetches one submission by id with its full set of responses, plus the form's questions for label resolution. Use List Submissions or the New Submission trigger to obtain a submission id first. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `submission_id` | string | yes |  | Submission ID. Obtain from List Submissions or the New Submission trigger payload. |

Output fields:

- `questions`: Questions
- `questions[].id`: Question ID
- `questions[].type`: Type
- `questions[].title`: Title
- `questions[].formId`: Form ID
- `questions[].isDeleted`: Deleted (boolean)
- `questions[].numberOfResponses`: Number Of Responses (number)
- `submission`: Submission
- `submission.id`: Submission ID
- `submission.formId`: Form ID
- `submission.isCompleted`: Completed (boolean)
- `submission.submittedAt`: Submitted At (datetime)
- `submission.previewUrl`: Preview URL (url)
- `submission.pdfUrl`: PDF URL (url)
- `submission.responses`: Responses
- `submission.responses[].id`: Response ID
- `submission.responses[].questionId`: Question ID
- `submission.responses[].respondentId`: Respondent ID
- `submission.responses[].answer`: Answer

### `delete_submission`

**Delete Submission.** Permanently deletes one submission by id — irreversible, no trash/undo. Use List Submissions or Get Submission first to confirm you have the right one. A repeat call errors once the submission is gone, so this is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `submission_id` | string | yes |  | Submission ID. Obtain from List Submissions or Get Submission. |

### `get_form_metrics`

**Get Form Metrics.** Returns summary metrics for a form over the given period: visits, submissions, unique respondents, starts, completions, and completion rate. For a breakdown over time use Get Form Visit Analytics or Get Form Submission Analytics instead. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes |  | Period. One of `"today"`, `"yesterday"`, `"24h"`, `"7d"`, `"30d"`, `"3m"`, `"6m"`, `"12m"`, `"all"`. |

Output fields:

- `visits`: Visits (number)
- `submissions`: Submissions (number)
- `uniqueRespondents`: Unique Respondents (number)
- `starts`: Starts (number)
- `completions`: Completions (number)
- `completionRate`: Completion Rate (number)
- `visitDuration`: Visit Duration (seconds) (number)
- `completionDuration`: Completion Duration (seconds) (number)
- `totalViews`: Total Views (number)

### `get_form_visit_analytics`

**Get Form Visit Analytics.** Returns a time-bucketed breakdown of visit counts for a form over the given period. For a single summary number use Get Form Metrics instead. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes |  | Period. One of `"today"`, `"yesterday"`, `"24h"`, `"7d"`, `"30d"`, `"3m"`, `"6m"`, `"12m"`, `"all"`. |

### `get_form_submission_analytics`

**Get Form Submission Analytics.** Returns a time-bucketed breakdown of completed vs. partial submission counts for a form over the given period. For a single summary number use Get Form Metrics instead. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes |  | Period. One of `"today"`, `"yesterday"`, `"24h"`, `"7d"`, `"30d"`, `"3m"`, `"6m"`, `"12m"`, `"all"`. |

### `get_form_analytics_dimensions`

**Get Form Analytics Dimensions.** Returns visitor counts broken down by traffic source, browser, OS, device, country, and city for a form over the given period. Use to answer "where are visitors coming from" style questions. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes |  | Period. One of `"today"`, `"yesterday"`, `"24h"`, `"7d"`, `"30d"`, `"3m"`, `"6m"`, `"12m"`, `"all"`. |

### `get_form_drop_off_analytics`

**Get Form Drop-off Analytics.** Returns per-question view/answer/drop counts and drop-off rates for a form over the given period, so you can identify which question loses the most respondents. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Only forms this API key can access are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes |  | Period. One of `"today"`, `"yesterday"`, `"24h"`, `"7d"`, `"30d"`, `"3m"`, `"6m"`, `"12m"`, `"all"`. |

### `list_workspaces`

**List Workspaces.** Lists workspaces with their ids, names, members, pending invites, and folders. Use to resolve a workspace id before calling Create Form, Create Workspace-scoped Folder, or other workspace/folder atomics. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no |  | Page. Page number, starting at 1. Defaults to 1. |

Output fields:

- `items`: Workspaces
- `items[].id`: Workspace ID
- `items[].name`: Name
- `items[].createdByUserId`: Created By User ID
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `items[].members`: Members
- `items[].members[].id`: User ID
- `items[].members[].fullName`: Full Name
- `items[].members[].email`: Email (email)
- `items[].members[].avatarUrl`: Avatar URL (image)
- `items[].members[].timezone`: Timezone
- `items[].members[].organizationId`: Organization ID
- `items[].members[].isBlocked`: Blocked (boolean)
- `items[].members[].createdAt`: Created At (datetime)
- `items[].members[].updatedAt`: Updated At (datetime)
- `page`: Page (number)
- `total`: Total (number)
- `hasMore`: Has More (boolean)

### `create_workspace`

**Create Workspace.** Creates a new workspace by name. Requires a Pro (or higher) subscription — fails with a permission error on a Free plan. Each call creates a new workspace, so it is not idempotent (retries duplicate). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |

### `get_workspace`

**Get Workspace.** Fetches one workspace by id with its members, pending invites, and folders. Use List Workspaces first to resolve a workspace id. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Workspace ID
- `name`: Name
- `createdByUserId`: Created By User ID
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `members`: Members
- `members[].id`: User ID
- `members[].fullName`: Full Name
- `members[].email`: Email (email)
- `members[].avatarUrl`: Avatar URL (image)
- `members[].timezone`: Timezone
- `members[].organizationId`: Organization ID
- `members[].isBlocked`: Blocked (boolean)
- `members[].createdAt`: Created At (datetime)
- `members[].updatedAt`: Updated At (datetime)

### `rename_workspace`

**Rename Workspace.** Renames a workspace to the given name. Repeating the same call converges on the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | New Name. |

### `delete_workspace`

**Delete Workspace.** Permanently deletes a workspace along with every form, folder, and submission inside it — irreversible, no trash/undo. Only use this when the caller explicitly wants to remove the entire workspace, not a single form (use Delete Form for that). A repeat call errors once the workspace is gone, so this is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |

### `list_workspace_folders`

**List Workspace Folders.** Lists the folders inside a workspace, including nested folders (via each folder's parentId). Use to resolve a folder id before calling Create Form, Rename Folder, or Delete Folder. Requires the workspace to be on a Pro (or higher) plan. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |

### `create_folder`

**Create Folder.** Creates a folder inside a workspace, optionally nested under a parent folder. Requires a Pro (or higher) plan. Each call creates a new folder, so it is not idempotent (retries duplicate). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. |
| `parent_id` | string | no |  | Folder. Only folders inside the selected workspace are shown. A value the product loads from the provider, such as an id; write the value itself. |

### `rename_folder`

**Rename Folder.** Renames a folder to the given name. Requires a Pro (or higher) plan. Repeating the same call converges on the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | yes |  | Folder. Only folders inside the selected workspace are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | New Name. |

### `delete_folder`

**Delete Folder.** Deletes a folder and its entire subtree of nested folders. Forms inside are moved to trash, not permanently deleted — recoverable from Tally's trash within its retention window. Requires a Pro (or higher) plan. A repeat call errors once the folder is gone, so this is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_id` | string | yes |  | Folder. Only folders inside the selected workspace are shown. A value the product loads from the provider, such as an id; write the value itself. |

### `get_current_user`

**Get Current User.** Returns the connected account's profile (name, email) and subscription plan (FREE, PRO, or BUSINESS). Use to check whether the account can call Pro-gated atomics like Create Workspace or the folder actions before attempting them. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `fullName`: Full Name
- `email`: Email (email)
- `avatarUrl`: Avatar URL (image)
- `timezone`: Timezone
- `organizationId`: Organization ID
- `isBlocked`: Blocked (boolean)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `isOrganizationOwner`: Is Organization Owner (boolean)
- `subscriptionPlan`: Subscription Plan
- `canAccessBilling`: Can Access Billing (boolean)

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
