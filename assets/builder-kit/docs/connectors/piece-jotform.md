# Jotform

Create online forms and surveys

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-jotform'
  version: '0.5.3'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain api key, follow the steps below:
> 1. Go to Settings -> API
> 2. Click on "Create New Key" button
> 3. Change the permissions to "Full Access"
> 4. Copy the API Key and paste it in the API Key field

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. |
| `region` | string | yes |  | Region. One of `"us"`, `"eu"`, `"hipaa"`. |

## Actions

### `jotform_get_user_details`

**Get User Details.** Returns the connected Jotform account's profile info: username, email, name, account type, time zone and avatar URL. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `username`: Username
- `name`: Name
- `email`: Email (email)
- `website`: Website (url)
- `time_zone`: Time Zone
- `account_type`: Account Type (url)
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `region`: Region
- `is_verified`: Is Verified (boolean)
- `usage`: Usage (url)
- `avatarUrl`: Avatar URL (image)
- `language`: Language
- `isHIPAA`: Is HIPAA (boolean)

### `jotform_list_forms`

**List Forms.** Lists forms owned by the connected account, each with its form ID, title and status. Use the returned form ID with other form and submission actions. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of forms to return. |
| `offset` | number | no |  | Offset. Number of forms to skip, for pagination. |

Output fields:

- `[].id`: ID
- `[].username`: Username
- `[].title`: Title
- `[].height`: Height
- `[].status`: Status
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)
- `[].last_submission`: Last Submission (datetime)
- `[].new`: New (number)
- `[].count`: Count (number)
- `[].type`: Type
- `[].favorite`: Favorite
- `[].archived`: Archived
- `[].url`: URL (url)

### `jotform_create_form`

**Create Form.** Creates a new form with the given title and question list (each question is a Jotform question object, e.g. {"type":"control_textbox","text":"Name"}). Returns the new form ID. Not idempotent — each call creates a new form. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title of the new form. |
| `questions` | JSON | no |  | Questions. Array of Jotform question objects to add to the form, e.g. [{"type":"control_textbox","text":"Name"}]. |

Output fields:

- `id`: ID
- `username`: Username
- `title`: Title
- `height`: Height
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `last_submission`: Last Submission (datetime)
- `new`: New (number)
- `count`: Count (number)
- `type`: Type
- `favorite`: Favorite
- `archived`: Archived
- `url`: URL (url)

### `jotform_bulk_replace_forms`

**Bulk Replace Forms.** Bulk creates or replaces forms from a JSON array of form objects. Each entry with an existing form ID replaces that form; entries without one create a new form. Not idempotent — a call with no IDs creates new forms every time. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `forms` | JSON | yes |  | Forms. JSON array of form objects to create or replace. |

Output fields:

- `id`: ID
- `username`: Username
- `title`: Title
- `height`: Height
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `last_submission`: Last Submission (datetime)
- `new`: New (number)
- `count`: Count (number)
- `type`: Type
- `favorite`: Favorite
- `archived`: Archived
- `url`: URL (url)

### `jotform_get_user_usage`

**Get User Usage.** Returns the connected account's current submission, upload and form usage alongside its plan limits, e.g. to check whether the account is near its cap. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `username`: Username
- `submissions`: Submissions
- `overSubmissions`: Over Submissions
- `ssl_submissions`: Ssl Submissions
- `payments`: Payments
- `uploads`: Uploads
- `total_submissions`: Total Submissions
- `tickets`: Tickets
- `views`: Views
- `signed_documents`: Signed Documents
- `workflow_runs`: Workflow Runs
- `ai_conversations`: Ai Conversations
- `ai_messages`: Ai Messages
- `ai_sessions`: Ai Sessions
- `ai_phone_call`: Ai Phone Call
- `ai_agent_sms`: Ai Agent Sms
- `ai_chatbot_conversations`: Ai Chatbot Conversations
- `pdf_attachment_submissions`: PDF Attachment Submissions
- `monthly_usage_reset_date`: Monthly Usage Reset Date (datetime)
- `mobile_submissions`: Mobile Submissions
- `noupe_ai_conversations`: Noupe Ai Conversations
- `sms_notifications`: Sms Notifications
- `whatsapp_notifications`: Whatsapp Notifications
- `pdf_generations`: PDF Generations
- `website_widget_views`: Website Widget Views
- `api`: API (number)
- `form_count`: Form Count
- `ai_agents`: Ai Agents (number)
- `ai_chatbot_agents`: Ai Chatbot Agents
- `ai_knowledge_base`: Ai Knowledge Base
- `created_at`: Created At (datetime)

### `jotform_get_system_plan`

**Get System Plan.** Looks up the public feature and limit details of a named Jotform plan (e.g. FREE, BRONZE, SILVER, GOLD), useful for comparing the account's plan against another tier. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planName` | string | yes |  | Plan Name. The plan name to look up, e.g. "FREE". |

Output fields:

- `name`: Name
- `currency`: Currency
- `limits`: Limits
- `limits.submissions`: Submissions (number)
- `limits.overSubmissions`: Over Submissions (number)
- `limits.sslSubmissions`: Ssl Submissions (number)
- `limits.payments`: Payments (number)
- `limits.uploads`: Uploads (number)
- `limits.tickets`: Tickets (number)
- `limits.subusers`: Subusers (number)
- `limits.api-daily-limit`: API Daily Limit (number)
- `limits.views`: Views (number)
- `limits.formCount`: Form Count (number)
- `limits.hipaaCompliance`: Hipaa Compliance (boolean)
- `limits.emails`: Emails
- `limits.emails.reminderEmailBlocks`: Reminder Email Blocks (number)
- `limits.fieldPerForm`: Field Per Form (number)
- `limits.totalSubmissions`: Total Submissions (number)
- `limits.signedDocuments`: Signed Documents (number)
- `limits.elementPerWorkflow`: Element Per Workflow (number)
- `limits.aiAgents`: Ai Agents (number)
- `limits.aiConversations`: Ai Conversations (number)
- `limits.aiSessions`: Ai Sessions (number)
- `limits.aiPhoneCall`: Ai Phone Call (number)
- `limits.aiKnowledgeBase`: Ai Knowledge Base (number)
- `limits.aiAgentSms`: Ai Agent Sms (number)
- `prices`: Prices
- `prices.monthly`: Monthly (number)
- `prices.yearly`: Yearly (number)
- `prices.biyearly`: Biyearly (number)
- `plimusIDs`: Plimus IDs
- `plimusIDs.monthly`: Monthly (number)
- `plimusIDs.yearly`: Yearly (number)
- `plimusIDs.biyearly`: Biyearly (number)
- `fastSpringURLs`: Fast Spring URLs
- `fastSpringURLs.monthly`: Monthly
- `fastSpringURLs.yearly`: Yearly
- `fastSpringURLs.biyearly`: Biyearly
- `planType`: Plan Type
- `currentPlanType`: Current Plan Type
- `fullPrices`: Full Prices
- `fullPrices.monthly`: Monthly (number)
- `fullPrices.yearly`: Yearly (number)
- `fullPrices.biyearly`: Biyearly (number)
- `campaign_status`: Campaign Status
- `isVisible`: Is Visible (boolean)

### `jotform_list_all_submissions`

**List All Submissions.** Lists submissions across all of the connected account's forms, each with its submission ID, form ID, submitter IP, creation date, status and answers. Use List Form Submissions instead when only one form matters. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of submissions to return. |
| `offset` | number | no |  | Offset. Number of submissions to skip, for pagination. |

Output fields:

- `[].id`: ID
- `[].form_id`: Form ID
- `[].ip`: IP
- `[].created_at`: Created At (datetime)
- `[].status`: Status
- `[].new`: New
- `[].flag`: Flag
- `[].notes`: Notes
- `[].updated_at`: Updated At (datetime)
- `[].answers`: Answers (an object whose keys vary)
- `[].answers.name`: Name
- `[].answers.order`: Order
- `[].answers.text`: Text
- `[].answers.type`: Type
- `[].answers.answer`: Answer

### `jotform_list_all_reports`

**List All Reports.** Lists reports (analytics/exports) across all of the connected account's forms, each with its report ID, title, type and the form it belongs to. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of reports to return. |
| `offset` | number | no |  | Offset. Number of reports to skip, for pagination. |

Output fields:

- `[].id`: ID
- `[].form_id`: Form ID
- `[].title`: Title
- `[].fields`: Fields
- `[].list_type`: List Type
- `[].status`: Status
- `[].settings`: Settings
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)
- `[].url`: URL (url)
- `[].isProtected`: Is Protected (boolean)
- `[].type`: Type
- `[].form_title`: Form Title
- `[].form_count`: Form Count (number)
- `[].form_url`: Form URL (url)
- `[].last_submission`: Last Submission
- `[].properties`: Properties

### `jotform_get_user_history`

**Get User History.** Returns the connected account's activity log (action, date, IP address), optionally filtered by action type and date range. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `action` | string | no |  | Action. Filter by action type, e.g. "userLogin" or "formCreate". |
| `startDate` | string | no |  | Start Date. Only include history on or after this date (MM/DD/YYYY). |
| `endDate` | string | no |  | End Date. Only include history on or before this date (MM/DD/YYYY). |

Output fields:

- `[].type`: Type
- `[].formID`: Form ID
- `[].username`: Username
- `[].creator`: Creator
- `[].formTitle`: Form Title
- `[].formStatus`: Form Status
- `[].formSlug`: Form Slug
- `[].ip`: IP
- `[].timestamp`: Timestamp (number)
- `[].formType`: Form Type

### `jotform_get_user_settings`

**Get User Settings.** Returns the connected account's account settings as a key/value map. Use Get User Setting by Key to read a single one. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `username`: Username
- `name`: Name
- `email`: Email (email)
- `website`: Website (url)
- `time_zone`: Time Zone
- `account_type`: Account Type (url)
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `region`: Region
- `is_verified`: Is Verified (boolean)
- `usage`: Usage (url)
- `avatarUrl`: Avatar URL (image)
- `language`: Language
- `isHIPAA`: Is HIPAA (boolean)

### `jotform_update_user_settings`

**Update User Settings.** Updates the connected account's account settings from a key/value map, e.g. {"time_format":"24"}. Only the supplied keys change; every other setting is left alone. Idempotent — setting the same value again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `settings` | JSON | yes |  | Settings. Key/value map of settings to update, e.g. {"time_format":"24"}. |

### `jotform_get_user_setting_by_key`

**Get User Setting by Key.** Returns the value of a single account setting by its key, e.g. "time_format". Resolve the available keys with Get User Settings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `settingsKey` | string | yes |  | Settings Key. The setting key to read, e.g. "time_format". |

### `jotform_get_form`

**Get Form.** Returns a form's metadata: title, status, height and URL. Use List Forms to find the form ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |

Output fields:

- `id`: ID
- `username`: Username
- `title`: Title
- `height`: Height
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `last_submission`: Last Submission (datetime)
- `new`: New (number)
- `count`: Count (number)
- `type`: Type
- `favorite`: Favorite
- `archived`: Archived
- `url`: URL (url)

### `jotform_delete_form`

**Delete Form.** Moves a form to the connected account's trash. Recoverable from the Jotform UI, not a hard delete. Pairs with Create Form. Re-deleting an already-trashed form is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form to delete, from List Forms. |

Output fields:

- `id`: ID
- `username`: Username
- `title`: Title
- `height`: Height
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `last_submission`: Last Submission (datetime)
- `new`: New (number)
- `count`: Count (number)
- `type`: Type
- `favorite`: Favorite
- `archived`: Archived

### `jotform_clone_form`

**Clone Form.** Creates a copy of an existing form, including its questions and properties, and returns the new form ID. Not idempotent — each call creates another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form to clone, from List Forms. |

Output fields:

- `id`: ID
- `username`: Username
- `title`: Title
- `height`: Height
- `status`: Status
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `last_submission`: Last Submission (datetime)
- `new`: New (number)
- `count`: Count (number)
- `type`: Type
- `favorite`: Favorite
- `archived`: Archived
- `url`: URL (url)
- `clonedPdfIdMapping`: Cloned PDF ID Mapping

### `jotform_list_form_files`

**List Form Files.** Lists files uploaded to a form's submissions: URL, file name, size and the owning submission ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |

Output fields:

- `[].url`: URL (url)
- `[].name`: Name
- `[].size`: Size (filesize)
- `[].submission_id`: Submission ID

### `jotform_list_form_questions`

**List Form Questions.** Lists a form's questions, each with its question ID, type, text, field name, order and required flag. Use the returned question ID with the other question actions. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |

Output fields:

- `name`: Name
- `order`: Order
- `qid`: Qid (number)
- `text`: Text
- `type`: Type

### `jotform_add_form_question`

**Add Form Question.** Adds one or more questions to an existing form, each a Jotform question object, e.g. {"type":"control_textbox","text":"Name"}. Not idempotent — each call adds new questions. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `questions` | JSON | yes |  | Questions. Array of Jotform question objects to add, e.g. [{"type":"control_textbox","text":"Name"}]. |

Output fields:

- `[].name`: Name
- `[].text`: Text
- `[].type`: Type
- `[].order`: Order
- `[].qid`: Qid (number)

### `jotform_get_form_question`

**Get Form Question.** Returns a single question's detail: type, text, field name, order and required flag. Use List Form Questions to find the question ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `questionId` | string | yes |  | Question ID. The ID of the question, from List Form Questions. |

Output fields:

- `name`: Name
- `text`: Text
- `type`: Type
- `order`: Order
- `qid`: Qid (number)

### `jotform_update_form_question`

**Update Form Question.** Updates a single question from a key/value map of question properties, e.g. {"text":"Full Name","required":"Yes"}. Only the supplied keys change; every other property is left alone. Idempotent — setting the same value again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `questionId` | string | yes |  | Question ID. The ID of the question, from List Form Questions. |
| `question` | JSON | yes |  | Question Properties. Key/value map of question properties to update, e.g. {"text":"Full Name","required":"Yes"}. |

Output fields:

- `[].text`: Text
- `[].type`: Type

### `jotform_delete_form_question`

**Delete Form Question.** Permanently deletes a question from a form. Pairs with Add Form Question. Not idempotent — deleting an already-removed question fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `questionId` | string | yes |  | Question ID. The ID of the question to delete, from List Form Questions. |

### `jotform_bulk_replace_form_questions`

**Bulk Replace Form Questions.** Replaces a form's questions from a JSON array of question objects. Each entry with a "qid" replaces that existing question in place; entries with no qid are appended as new questions numbered from the array position. Not a merge — read the form's current questions first if any should be kept. Not idempotent — every call rewrites the question set. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `questions` | JSON | yes |  | Questions. JSON array of question objects to replace the form's questions with. |

Output fields:

- `name`: Name
- `text`: Text
- `type`: Type
- `order`: Order
- `qid`: Qid (number)

### `jotform_get_form_properties`

**Get Form Properties.** Returns all of a form's properties as a key/value map: title, height, theme and style settings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |

Output fields:

- `activeRedirect`: Active Redirect
- `defaultAutoResponderEmailAssigned`: Default Auto Responder Email Assigned
- `defaultEmailAssigned`: Default Email Assigned
- `formType`: Form Type
- `formWidth`: Form Width
- `labelWidth`: Label Width
- `lastQuestionID`: Last Question ID
- `styles`: Styles
- `thanktext`: Thanktext
- `emails`: Emails
- `emails[].body`: Body
- `emails[].branding21Email`: Branding21 Email
- `emails[].dirty`: Dirty
- `emails[].from`: From
- `emails[].hideEmptyFields`: Hide Empty Fields
- `emails[].html`: HTML
- `emails[].lastQuestionID`: Last Question ID
- `emails[].name`: Name
- `emails[].newDisableFlow`: New Disable Flow
- `emails[].pdfattachment`: Pdfattachment
- `emails[].replyTo`: Reply To
- `emails[].sendOnEdit`: Send On Edit
- `emails[].sendOnSubmit`: Send On Submit
- `emails[].subject`: Subject
- `emails[].to`: To (email)
- `emails[].type`: Type
- `emails[].uniqueID`: Unique ID
- `emails[].uploadAttachment`: Upload Attachment
- `submissionSettings`: Submission Settings
- `integrations`: Integrations
- `slug`: Slug
- `id`: ID
- `count`: Count
- `title`: Title
- `height`: Height
- `status`: Status
- `type`: Type
- `formOwnerAccountType`: Form Owner Account Type
- `isHIPAA`: Is HIPAA
- `owner`: Owner
- `formOwnerName`: Form Owner Name
- `isEUForm`: Is EUForm
- `defaultTheme`: Default Theme
- `isNewPDFUser`: Is New PDFUser (boolean)

### `jotform_update_form_properties`

**Update Form Properties.** Updates one or more of a form's properties from a key/value map, e.g. {"title":"New Title"}. Only the supplied keys change; every other property is left alone. Idempotent — setting the same value again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `properties` | JSON | yes |  | Properties. Key/value map of properties to update, e.g. {"title":"New Title"}. |

Output fields:

- `formWidth`: Form Width
- `labelWidth`: Label Width
- `formID`: Form ID

### `jotform_bulk_replace_form_properties`

**Bulk Replace Form Properties.** Replaces a form's properties from a JSON object keyed by property name. Not a merge — read the form's current properties first if any should be kept. Not idempotent — every call rewrites the property set. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `properties` | JSON | yes |  | Properties. JSON object of properties to replace the form's properties with. |

Output fields:

- `formWidth`: Form Width
- `activeRedirect`: Active Redirect
- `formID`: Form ID

### `jotform_get_form_property_by_key`

**Get Form Property by Key.** Returns the value of a single form property by its key, e.g. "title". Resolve the available keys with Get Form Properties. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `propertyKey` | string | yes |  | Property Key. The property key to read, e.g. "title". |

### `jotform_list_form_reports`

**List Form Reports.** Lists the reports (analytics/exports) created for a single form, each with its report ID, title and type. Idempotent — a repeated call returns the same list. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |

Output fields:

- `[].id`: ID
- `[].form_id`: Form ID
- `[].title`: Title
- `[].fields`: Fields
- `[].list_type`: List Type
- `[].status`: Status
- `[].settings`: Settings
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)
- `[].url`: URL (url)
- `[].isProtected`: Is Protected (boolean)

### `jotform_create_form_report`

**Create Form Report.** Creates a new report for a form, e.g. a grid, table or RSS export of its submissions. Returns the new report ID. Not idempotent — each call creates a new report. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `title` | string | yes |  | Title. The title of the new report. |
| `listType` | string | yes |  | List Type. The report type, e.g. "grid", "table" or "rss". |

Output fields:

- `id`: ID
- `form_id`: Form ID
- `title`: Title
- `fields`: Fields
- `list_type`: List Type
- `status`: Status
- `settings`: Settings
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `url`: URL (url)
- `isProtected`: Is Protected (boolean)

### `jotform_list_form_submissions`

**List Form Submissions.** Lists a form's submissions: submission ID, status, created date and answers keyed by question ID. Idempotent — a repeated call returns the same list. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `limit` | number | no |  | Limit. Maximum number of submissions to return. |
| `offset` | number | no |  | Offset. Number of submissions to skip, for pagination. |

Output fields:

- `[].id`: ID
- `[].form_id`: Form ID
- `[].ip`: IP
- `[].created_at`: Created At (datetime)
- `[].status`: Status
- `[].new`: New
- `[].flag`: Flag
- `[].notes`: Notes
- `[].updated_at`: Updated At (datetime)
- `[].answers`: Answers (an object whose keys vary)
- `[].answers.name`: Name
- `[].answers.order`: Order
- `[].answers.text`: Text
- `[].answers.type`: Type
- `[].answers.answer`: Answer

### `jotform_create_form_submission`

**Create Form Submission.** Submits a form with the given answers, keyed by question ID, e.g. {"3":"John Doe"}. Returns the new submission ID. Not idempotent — each call creates a new submission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `answers` | JSON | yes |  | Answers. Key/value map of question ID to answer, e.g. {"3":"John Doe"}. Resolve question IDs with List Form Questions. |

Output fields:

- `submissionID`: Submission ID
- `URL`: URL (url)

### `jotform_bulk_create_form_submissions`

**Bulk Create Form Submissions.** Bulk creates submissions for a form from a JSON array of answer maps (each keyed by question ID). Not idempotent — each call creates new submissions. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form ID. The ID of the form, from List Forms. |
| `submissions` | JSON | yes |  | Submissions. JSON array of answer maps, each keyed by question ID, e.g. [{"3":"John Doe"}]. |

Output fields:

- `[].submissionID`: Submission ID
- `[].URL`: URL (url)

### `jotform_get_submission`

**Get Submission.** Returns a single submission's detail: status, created date and answers keyed by question ID, each with its text, answer and type. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `submissionId` | string | yes |  | Submission ID. The ID of the submission, from List Form Submissions. |

Output fields:

- `id`: ID
- `form_id`: Form ID
- `ip`: IP
- `created_at`: Created At (datetime)
- `status`: Status
- `new`: New
- `flag`: Flag
- `notes`: Notes
- `updated_at`: Updated At (datetime)
- `answers`: Answers (an object whose keys vary)
- `answers.name`: Name
- `answers.order`: Order
- `answers.text`: Text
- `answers.type`: Type
- `answers.answer`: Answer

### `jotform_update_submission`

**Update Submission.** Edits a submission from a key/value map, e.g. {"status":"ACTIVE"} or {"3":"Jane Doe"} to change an answer. Only the supplied keys change. Idempotent — setting the same value again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `submissionId` | string | yes |  | Submission ID. The ID of the submission, from List Form Submissions. |
| `updates` | JSON | yes |  | Updates. Key/value map to update, e.g. {"status":"ACTIVE"} or a question ID to a new answer. |

Output fields:

- `submissionID`: Submission ID
- `URL`: URL (url)

### `jotform_delete_submission`

**Delete Submission.** Permanently deletes a submission. Pairs with Create Form Submission. Not idempotent — deleting an already-removed submission fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `submissionId` | string | yes |  | Submission ID. The ID of the submission, from List Form Submissions. |

### `jotform_get_report`

**Get Report.** Returns a single report's metadata: title, list type, owning form and URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reportId` | string | yes |  | Report ID. The ID of the report, from List Form Reports or List All Reports. |

Output fields:

- `id`: ID
- `form_id`: Form ID
- `title`: Title
- `fields`: Fields
- `list_type`: List Type
- `status`: Status
- `settings`: Settings
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `url`: URL (url)
- `isProtected`: Is Protected (boolean)

### `jotform_delete_report`

**Delete Report.** Permanently deletes a report. Pairs with Create Form Report. Not idempotent — deleting an already-removed report fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reportId` | string | yes |  | Report ID. The ID of the report, from List Form Reports or List All Reports. |

### `jotform_list_labels`

**List Labels.** Lists the labels on the connected account, each with its ID, name, color and parent label. Idempotent — a repeated call returns the same list. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `id`: ID
- `owner`: Owner
- `owner_type`: Owner Type
- `created_at`: Created At (datetime)
- `sublabels`: Sublabels
- `sublabels[].id`: ID
- `sublabels[].name`: Name
- `sublabels[].order`: Order
- `sublabels[].color`: Color
- `sublabels[].created_at`: Created At (datetime)
- `sublabels[].updated_at`: Updated At
- `sublabels[].parent_label_id`: Parent Label ID
- `sublabels[].owner`: Owner
- `sublabels[].sublabels`: Sublabels

### `jotform_get_label`

**Get Label.** Returns a single label's detail: name, color and parent label. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. The ID of the label, from List Labels. |

Output fields:

- `id`: ID
- `name`: Name
- `order`: Order
- `color`: Color
- `created_at`: Created At (datetime)
- `updated_at`: Updated At
- `owner`: Owner
- `ownerType`: Owner Type

### `jotform_get_label_resources`

**Get Label Resources.** Lists the resources tagged with a label — forms, workflows, sheets or portals — each with its ID, type and status. Idempotent — a repeated call returns the same list. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. The ID of the label, from List Labels. |
| `status` | string | no |  | Status. Filter resources by status, e.g. "ENABLED". |
| `limit` | number | no |  | Limit. Maximum number of resources to return. |
| `offset` | number | no |  | Offset. Number of resources to skip, for pagination. |

Output fields:

- `[].id`: ID
- `[].username`: Username
- `[].title`: Title
- `[].height`: Height
- `[].status`: Status
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)
- `[].last_submission`: Last Submission (datetime)
- `[].new`: New (number)
- `[].count`: Count (number)
- `[].type`: Type
- `[].favorite`: Favorite
- `[].archived`: Archived
- `[].assetType`: Asset Type
- `[].labels`: Labels

### `jotform_create_label`

**Create Label.** Creates a new label with a name, optional color and optional parent label. Returns the new label ID. Not idempotent — each call creates a new label. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the new label. |
| `color` | string | no |  | Color. The label color, e.g. "#FF0000". |
| `parentId` | string | no |  | Parent Label ID. The ID of the parent label, to nest this label inside it. |

Output fields:

- `id`: ID
- `name`: Name
- `color`: Color
- `created_at`: Created At (datetime)
- `updated_at`: Updated At
- `owner`: Owner

### `jotform_update_label`

**Update Label.** Updates a label from a key/value map, e.g. {"name":"Priority"} or {"color":"#00FF00"}. Only the supplied keys change. Idempotent — setting the same value again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. The ID of the label, from List Labels. |
| `updates` | JSON | yes |  | Updates. Key/value map of label properties to update, e.g. {"name":"Priority"}. |

Output fields:

- `name`: Name

### `jotform_add_label_resources`

**Add Label Resources.** Attaches resources to a label from a JSON array of {"id":"...","type":"FORM"} entries. Idempotent — re-attaching an already-attached resource is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. The ID of the label, from List Labels. |
| `resources` | JSON | yes |  | Resources. JSON array of resources to attach, e.g. [{"id":"123","type":"FORM"}]. |

Output fields:

- `[].id`: ID
- `[].type`: Type

### `jotform_remove_label_resources`

**Remove Label Resources.** Detaches resources from a label from a JSON array of {"id":"...","type":"FORM"} entries. Idempotent — detaching an already-detached resource is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. The ID of the label, from List Labels. |
| `resources` | JSON | yes |  | Resources. JSON array of resources to detach, e.g. [{"id":"123","type":"FORM"}]. |

Output fields:

- `[].id`: ID
- `[].type`: Type

### `jotform_delete_label`

**Delete Label.** Permanently deletes a label. Pairs with Create Label. Not idempotent — deleting an already-removed label fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. The ID of the label, from List Labels. |

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
