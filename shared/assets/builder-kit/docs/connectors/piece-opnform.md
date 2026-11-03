# Opnform

Create beautiful online forms and surveys with unlimited fields and submissions

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-opnform'
  version: '0.3.0'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Please use your Opnform API Key. [Click here for create API Key](https://opnform.com/home?user-settings=access-tokens)
>
> Grant the abilities the steps you use need: workspaces-read/write, workspace-users-read/write, forms-read/write and manage-integrations.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseApiUrl` | string | no |  | Base URL. Default value is 'https://api.opnform.com'. |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `opnform_get_current_user`

**Get Current User.** Gets the OpnForm user that owns the connected API key, to check which account the connection acts as. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `name`: Name
- `email`: Email (email)

### `opnform_list_workspaces`

**List Workspaces.** Lists every workspace the connected user belongs to, with its numeric id and name. Use it to find the Workspace ID other actions need. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `workspaces`: Workspaces
- `workspaces[].id`: Workspace ID (number)
- `workspaces[].name`: Name
- `workspaces[].icon`: Icon
- `workspaces[].plan_tier`: Plan Tier
- `workspaces[].is_trialing`: Is Trialing (boolean)
- `workspaces[].users_count`: Users Count (number)
- `workspaces[].is_admin`: Is Admin (boolean)
- `workspaces[].is_readonly`: Is Read-Only (boolean)
- `workspaces[].custom_domains`: Custom Domains
- `workspaces[].max_file_size`: Max File Size (MB) (number)
- `workspaces[].limits`: Limits
- `workspaces[].limits.file_upload_size`: File Upload Size (filesize)
- `workspaces[].limits.custom_domain_count`: Custom Domain Count (number)
- `workspaces[].limits.workspace_count`: Workspace Count (number)
- `workspaces[].users`: Users
- `workspaces[].users[].id`: User ID (number)
- `workspaces[].users[].name`: Name
- `workspaces[].users[].email`: Email (email)
- `workspaces[].users[].photo_url`: Photo URL (image)
- `workspaces[].users[].email_verified_at`: Email Verified At (datetime)
- `workspaces[].users[].created_at`: Created At (datetime)
- `workspaces[].users[].updated_at`: Updated At (datetime)
- `workspaces[].users[].pivot`: Membership
- `workspaces[].users[].pivot.workspace_id`: Workspace ID (number)
- `workspaces[].users[].pivot.user_id`: User ID (number)
- `workspaces[].users[].pivot.role`: Role
- `workspaces[].created_at`: Created At (datetime)
- `workspaces[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `opnform_update_workspace`

**Update Workspace.** Renames a workspace or changes its emoji icon. Fields left empty keep their current value. Requires workspace admin. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. Numeric workspace ID, e.g. "12". Use List Workspaces to find it. |
| `name` | string | no |  | Name. New workspace name. Leave empty to keep the current name. |
| `emoji` | string | no |  | Emoji. New emoji icon, e.g. "🚀". Leave empty to keep the current icon. |

Output fields:

- `type`: Type
- `message`: Message
- `workspace`: Workspace
- `workspace.id`: Workspace ID (number)
- `workspace.name`: Name
- `workspace.icon`: Icon
- `workspace.plan_tier`: Plan Tier
- `workspace.is_trialing`: Is Trialing (boolean)
- `workspace.users_count`: Users Count (number)
- `workspace.is_admin`: Is Admin (boolean)
- `workspace.is_readonly`: Is Read-Only (boolean)
- `workspace.custom_domains`: Custom Domains
- `workspace.max_file_size`: Max File Size (MB) (number)
- `workspace.limits`: Limits
- `workspace.limits.file_upload_size`: File Upload Size (filesize)
- `workspace.limits.custom_domain_count`: Custom Domain Count (number)
- `workspace.limits.workspace_count`: Workspace Count (number)
- `workspace.users`: Users
- `workspace.users[].id`: User ID (number)
- `workspace.users[].name`: Name
- `workspace.users[].email`: Email (email)
- `workspace.users[].photo_url`: Photo URL (image)
- `workspace.users[].email_verified_at`: Email Verified At (datetime)
- `workspace.users[].created_at`: Created At (datetime)
- `workspace.users[].updated_at`: Updated At (datetime)
- `workspace.users[].pivot`: Membership
- `workspace.users[].pivot.workspace_id`: Workspace ID (number)
- `workspace.users[].pivot.user_id`: User ID (number)
- `workspace.users[].pivot.role`: Role
- `workspace.created_at`: Created At (datetime)
- `workspace.updated_at`: Updated At (datetime)

### `opnform_list_workspace_users`

**List Workspace Users.** Lists every member of a workspace with their user id, name, email and role. Use it to find the User ID for Update Workspace User Role. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. Numeric workspace ID, e.g. "12". Use List Workspaces to find it. |

Output fields:

- `users`: Users
- `users[].id`: User ID (number)
- `users[].name`: Name
- `users[].email`: Email (email)
- `users[].photo_url`: Photo URL (image)
- `users[].email_verified_at`: Email Verified At (datetime)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].pivot`: Membership
- `users[].pivot.workspace_id`: Workspace ID (number)
- `users[].pivot.user_id`: User ID (number)
- `users[].pivot.role`: Role
- `count`: Count (number)

### `opnform_update_workspace_user_role`

**Update Workspace User Role.** Sets a workspace member's role to admin, user or readonly. Requires workspace admin. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. Numeric workspace ID, e.g. "12". Use List Workspaces to find it. |
| `userId` | string | yes |  | User ID. Numeric user ID of the member, from List Workspace Users. |
| `role` | string | yes |  | Role. Workspace role: admin, user (can edit forms) or readonly. One of `"admin"`, `"user"`, `"readonly"`. |

Output fields:

- `type`: Type
- `message`: Message

### `opnform_list_workspace_invites`

**List Workspace Invites.** Lists the invites of a workspace with their id, email, role, status and expiry. Requires workspace admin. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. Numeric workspace ID, e.g. "12". Use List Workspaces to find it. |

Output fields:

- `invites`: Invites
- `count`: Count (number)

### `opnform_list_forms`

**List Forms.** Lists one page of form summaries in a workspace: numeric id, slug, title, visibility, submission count and share URL. Fields are not included; use Get Form for them. Page through with Page and Per Page using the returned meta. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. Numeric workspace ID, e.g. "12". Use List Workspaces to find it. |
| `page` | number | no |  | Page. Page number, starting at 1. Defaults to 1. |
| `perPage` | number | no |  | Per Page. Items per page (1-100). Defaults to 10. |

Output fields:

- `data`: Forms
- `data[].id`: Form ID (number)
- `data[].slug`: Slug
- `data[].title`: Title
- `data[].visibility`: Visibility
- `data[].workspace_id`: Workspace ID (number)
- `data[].share_url`: Share URL (url)
- `data[].tags`: Tags
- `data[].views_count`: Views Count (number)
- `data[].submissions_count`: Submissions Count (number)
- `data[].is_closed`: Is Closed (boolean)
- `data[].closes_at`: Closes At (datetime)
- `data[].max_submissions_count`: Max Submissions Count (number)
- `data[].max_number_of_submissions_reached`: Max Submissions Reached (boolean)
- `data[].last_edited_human`: Last Edited
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)
- `links`: Page Links
- `links.first`: First Page (url)
- `links.last`: Last Page (url)
- `links.prev`: Previous Page (url)
- `links.next`: Next Page (url)
- `meta`: Pagination
- `meta.current_page`: Current Page (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.total`: Total (number)
- `meta.path`: Path (url)

### `opnform_get_form`

**Get Form.** Gets one form by slug or UUID, including its settings and its fields (`properties`, each with the field id used as the answer key in Create Submission, Update Submission and Export Submissions). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formSlug` | string | yes |  | Form Slug. The form slug or UUID (the `slug` field), e.g. "customer-feedback-x1y2z3". Use List Forms to find it. |

Output fields:

- `id`: Form ID (number)
- `slug`: Slug
- `title`: Title
- `visibility`: Visibility
- `language`: Language
- `workspace_id`: Workspace ID (number)
- `creator_id`: Creator ID (number)
- `share_url`: Share URL (url)
- `submissions_url`: Submissions URL (url)
- `properties`: Fields
- `properties[].id`: Field ID
- `properties[].name`: Name
- `properties[].type`: Type
- `properties[].required`: Required (boolean)
- `submitted_text`: Submitted Text (html)
- `redirect_url`: Redirect URL (url)
- `tags`: Tags
- `views_count`: Views Count (number)
- `submissions_count`: Submissions Count (number)
- `is_closed`: Is Closed (boolean)
- `is_password_protected`: Is Password Protected (boolean)
- `max_number_of_submissions_reached`: Max Submissions Reached (boolean)
- `submission_retention_value`: Submission Retention Value (number)
- `submission_retention_unit`: Submission Retention Unit
- `theme`: Theme
- `presentation_style`: Presentation Style
- `width`: Width
- `size`: Size
- `border_radius`: Border Radius
- `dark_mode`: Dark Mode
- `color`: Color
- `uppercase_labels`: Uppercase Labels (boolean)
- `no_branding`: No Branding (boolean)
- `transparent_background`: Transparent Background (boolean)
- `last_edited_human`: Last Edited
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `description`: Description (html)
- `submit_button_text`: Submit Button Text
- `re_fillable`: Allow Refill (boolean)
- `re_fill_button_text`: Refill Button Text
- `closes_at`: Closes At (datetime)
- `closed_text`: Closed Text (html)
- `max_submissions_count`: Max Submissions Count (number)
- `max_submissions_reached_text`: Max Submissions Reached Text (html)
- `editable_submissions`: Editable Submissions (boolean)
- `use_captcha`: Use Captcha (boolean)
- `enable_partial_submissions`: Partial Submissions (boolean)
- `logo_picture`: Logo (image)
- `cover_picture`: Cover Image (image)
- `font_family`: Font Family
- `custom_domain`: Custom Domain

### `opnform_create_form`

**Create Form.** Creates a new form in a workspace with the given fields, and returns the full form with its id and slug. Not idempotent: each call creates another form. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. Numeric workspace ID, e.g. "12". Use List Workspaces to find it. |
| `title` | string | yes |  | Title. Form title, up to 60 characters. |
| `visibility` | string | yes |  | Visibility. public (accepts submissions), draft or closed. One of `"public"`, `"draft"`, `"closed"`. |
| `language` | string | yes |  | Language. Two-letter ISO language code, e.g. "en". |
| `properties` | JSON | yes |  | Fields. JSON array of form fields. Each needs a unique `id`, a `type` (e.g. "text", "email", "number", "select", "checkbox", "date") and a `name`; optional `required`, `placeholder`, `help`. Example: [{"id": "f1", "type": "text", "name": "Full name", "required": true}]. |
| `additionalFields` | JSON | no |  | Additional Settings. Optional JSON object of other form settings, e.g. {"submitted_text": "Thanks!", "tags": ["leads"], "closes_at": "2026-12-31T23:59:59Z"}. Also overrides the display defaults: theme "default", presentation_style "classic", width "centered", size "md", border_radius "small", dark_mode "light", color "… |

Output fields:

- `type`: Type
- `message`: Message
- `form`: Form
- `form.id`: Form ID (number)
- `form.slug`: Slug
- `form.title`: Title
- `form.visibility`: Visibility
- `form.language`: Language
- `form.workspace_id`: Workspace ID (number)
- `form.creator_id`: Creator ID (number)
- `form.share_url`: Share URL (url)
- `form.submissions_url`: Submissions URL (url)
- `form.properties`: Fields
- `form.properties[].id`: Field ID
- `form.properties[].name`: Name
- `form.properties[].type`: Type
- `form.properties[].required`: Required (boolean)
- `form.submitted_text`: Submitted Text (html)
- `form.redirect_url`: Redirect URL (url)
- `form.tags`: Tags
- `form.views_count`: Views Count (number)
- `form.submissions_count`: Submissions Count (number)
- `form.is_closed`: Is Closed (boolean)
- `form.is_password_protected`: Is Password Protected (boolean)
- `form.max_number_of_submissions_reached`: Max Submissions Reached (boolean)
- `form.submission_retention_value`: Submission Retention Value (number)
- `form.submission_retention_unit`: Submission Retention Unit
- `form.theme`: Theme
- `form.presentation_style`: Presentation Style
- `form.width`: Width
- `form.size`: Size
- `form.border_radius`: Border Radius
- `form.dark_mode`: Dark Mode
- `form.color`: Color
- `form.uppercase_labels`: Uppercase Labels (boolean)
- `form.no_branding`: No Branding (boolean)
- `form.transparent_background`: Transparent Background (boolean)
- `form.last_edited_human`: Last Edited
- `form.created_at`: Created At (datetime)
- `form.updated_at`: Updated At (datetime)
- `users_first_form`: User's First Form (boolean)

### `opnform_update_form`

**Update Form.** Updates a form. Reads the current form first and changes only the fields you set, since the API needs the full form on every update. Fields replaces all of the form's fields, so pass the complete list from Get Form with your edits. Not safe against a concurrent edit of the same form. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formSlug` | string | yes |  | Form Slug. The form slug or UUID (the `slug` field), e.g. "customer-feedback-x1y2z3". Use List Forms to find it. |
| `title` | string | no |  | Title. New form title, up to 60 characters. |
| `visibility` | string | no |  | Visibility. public (accepts submissions), draft or closed. One of `"public"`, `"draft"`, `"closed"`. |
| `properties` | JSON | no |  | Fields. Optional JSON array that replaces ALL form fields. Start from the `properties` returned by Get Form and keep each field `id`, or existing answers lose their field. |
| `submissionRetentionValue` | number | no |  | Submission Retention. Automatically delete submissions older than this many units (set together with Retention Unit). Deleted submissions cannot be restored. |
| `submissionRetentionUnit` | string | no |  | Retention Unit. Unit for Submission Retention. One of `"day"`, `"week"`, `"month"`, `"year"`. |
| `additionalFields` | JSON | no |  | Additional Settings. Optional JSON object of other form settings to change, e.g. {"submitted_text": "Thanks!", "closes_at": "2026-12-31T23:59:59Z"}. The fields above take precedence. |

Output fields:

- `type`: Type
- `message`: Message
- `form`: Form
- `form.id`: Form ID (number)
- `form.slug`: Slug
- `form.title`: Title
- `form.visibility`: Visibility
- `form.language`: Language
- `form.workspace_id`: Workspace ID (number)
- `form.creator_id`: Creator ID (number)
- `form.share_url`: Share URL (url)
- `form.submissions_url`: Submissions URL (url)
- `form.properties`: Fields
- `form.properties[].id`: Field ID
- `form.properties[].name`: Name
- `form.properties[].type`: Type
- `form.properties[].required`: Required (boolean)
- `form.submitted_text`: Submitted Text (html)
- `form.redirect_url`: Redirect URL (url)
- `form.tags`: Tags
- `form.views_count`: Views Count (number)
- `form.submissions_count`: Submissions Count (number)
- `form.is_closed`: Is Closed (boolean)
- `form.is_password_protected`: Is Password Protected (boolean)
- `form.max_number_of_submissions_reached`: Max Submissions Reached (boolean)
- `form.submission_retention_value`: Submission Retention Value (number)
- `form.submission_retention_unit`: Submission Retention Unit
- `form.theme`: Theme
- `form.presentation_style`: Presentation Style
- `form.width`: Width
- `form.size`: Size
- `form.border_radius`: Border Radius
- `form.dark_mode`: Dark Mode
- `form.color`: Color
- `form.uppercase_labels`: Uppercase Labels (boolean)
- `form.no_branding`: No Branding (boolean)
- `form.transparent_background`: Transparent Background (boolean)
- `form.last_edited_human`: Last Edited
- `form.created_at`: Created At (datetime)
- `form.updated_at`: Updated At (datetime)

### `opnform_delete_form`

**Delete Form.** Deletes a form by its numeric id (from List Forms). There is no restore endpoint in the API. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. Numeric form ID (the `id` field, not the slug), e.g. "42". Use List Forms to find it. |

Output fields:

- `success`: Success (boolean)
- `form_id`: Form ID

### `opnform_list_submissions`

**List Submissions.** Lists one page of submissions for a form, each with its id and answers keyed by field id. Optionally filter by a search term or by status. Page through with Page and Per Page using the returned meta. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. Numeric form ID (the `id` field, not the slug), e.g. "42". Use List Forms to find it. |
| `search` | string | no |  | Search. Optional text to search for in the answers. |
| `status` | string | no |  | Status. completed, partial (unfinished submissions, on forms with partial submissions enabled) or all. Leave empty for the API default. One of `"completed"`, `"partial"`, `"all"`. |
| `page` | number | no |  | Page. Page number, starting at 1. Defaults to 1. |
| `perPage` | number | no |  | Per Page. Items per page (1-100). Defaults to 10. |

Output fields:

- `data`: Submissions
- `data[].id`: Submission ID (number)
- `data[].form_id`: Form ID (number)
- `data[].data`: Answers (an object whose keys vary)
- `data[].completion_time`: Completion Time (s) (number)
- `data[].meta`: Meta
- `data[].meta.attribution`: Attribution (an object whose keys vary)
- `links`: Page Links
- `links.first`: First Page (url)
- `links.last`: Last Page (url)
- `links.prev`: Previous Page (url)
- `links.next`: Next Page (url)
- `meta`: Pagination
- `meta.current_page`: Current Page (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.total`: Total (number)
- `meta.path`: Path (url)

### `opnform_create_submission`

**Create Submission.** Submits answers to a public form, as if someone filled it in, so the form's active integrations may fire. Answers are keyed by field id from Get Form. Draft, closed, password- or captcha-protected forms may reject it. Not idempotent: each call adds a submission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formSlug` | string | yes |  | Form Slug. The form slug or UUID (the `slug` field), e.g. "customer-feedback-x1y2z3". Use List Forms to find it. |
| `answers` | JSON | yes |  | Answers. JSON object of answers keyed by field id (from Get Form), e.g. {"3700d380-197b-47b9-a008-3acc31bbd506": "Alice", "12461db5-0c19-429e-840b-8de1e359c42f": "alice@example.com"}. Text fields take strings, number fields numbers, checkboxes booleans, multi-selects arrays. |
| `completionTime` | number | no |  | Completion Time. Optional time spent filling the form, in seconds. |
| `trackingParameters` | JSON | no |  | Tracking Parameters. Optional campaign attribution, e.g. {"utm_source": "newsletter", "utm_campaign": "summer-launch"}. Supported keys: utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content, gclid, fbclid and similar click ids. |

Output fields:

- `type`: Type
- `message`: Message
- `submission_id`: Submission ID
- `is_first_submission`: Is First Submission (boolean)
- `redirect`: Redirect (boolean)

### `opnform_update_submission`

**Update Submission.** Changes some of a submission's answers; answers not passed keep their value. Answers are keyed by field id from Get Form, and the submission id comes from List Submissions. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. Numeric form ID (the `id` field, not the slug), e.g. "42". Use List Forms to find it. |
| `submissionId` | string | yes |  | Submission ID. Numeric submission ID, from List Submissions or Create Submission. |
| `answers` | JSON | yes |  | Answers. JSON object of the answers to change, keyed by field id (from Get Form), e.g. {"3700d380-197b-47b9-a008-3acc31bbd506": "Alice Smith"}. |

Output fields:

- `type`: Type
- `message`: Message
- `data`: Submission
- `data.id`: Submission ID (number)
- `data.form_id`: Form ID (number)
- `data.data`: Answers (an object whose keys vary)
- `data.completion_time`: Completion Time (s) (number)
- `data.meta`: Meta
- `data.meta.attribution`: Attribution (an object whose keys vary)

### `opnform_delete_submission`

**Delete Submission.** Permanently deletes one submission of a form. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. Numeric form ID (the `id` field, not the slug), e.g. "42". Use List Forms to find it. |
| `submissionId` | string | yes |  | Submission ID. Numeric submission ID, from List Submissions. |

Output fields:

- `type`: Type
- `message`: Message

### `opnform_export_submissions`

**Export Submissions.** Exports a form's submissions as CSV. Small forms return the CSV text right away (`is_async` false); large forms instead start a background export job (`is_async` true) and return its `job_id`, with no CSV. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. Numeric form ID (the `id` field, not the slug), e.g. "42". Use List Forms to find it. |
| `columns` | JSON | yes |  | Columns. JSON object of the columns to include, keyed by field id (from Get Form) or system column, with true to include, e.g. {"3700d380-197b-47b9-a008-3acc31bbd506": true, "created_at": true}. |

Output fields:

- `is_async`: Is Async (boolean)
- `csv`: CSV
- `job_id`: Job ID
- `message`: Message

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
