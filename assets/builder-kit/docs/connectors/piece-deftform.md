# Deftform

Build powerful forms and automate your workflow with Deftform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-deftform'
  version: '0.1.2'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your Deftform API key:
> 1. Log in to your Deftform workspace at https://deftform.com
> 2. Go to **Settings > API** (https://deftform.com/settings/api)
> 3. Click **Create API Key**
> 4. Copy the key and paste it here
>
> Need help? See https://deftform.com/docs/api

## Actions

### `get_workspace_details`

**Get Workspace Details.** Fetch the Deftform workspace details (plan, limits, account-level settings). Use it to confirm the connection works or to read workspace-level context before working with forms. Read-only and idempotent; takes no input. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `get_all_forms`

**Get All Forms and Fields.** List every form in the workspace along with each form fields and metadata (id, name, slug, closed status, response limit). Use it to discover available forms and their ids before targeting a specific form. Read-only and idempotent; takes no input. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_form_fields`

**Get Form Fields.** Fetch the field definitions of one form (label, type, required flag, options, validation). Use it to learn a form schema before submitting a response with Add Form Response, since that action keys values by field UUID. Requires the form id. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. Select the form to use. A value the product loads from the provider, such as an id; write the value itself. |

### `get_form_responses`

**Get Form Responses.** Retrieve all submitted responses for one form, with each response answers flattened by field key plus submission metadata (id, uuid, number, timestamps). Use it for reporting, exports, or to look up a response UUID needed by Get Submission PDF. Requires the form id. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. Select the form to use. A value the product loads from the provider, such as an id; write the value itself. |

### `get_submission_pdf`

**Get Submission PDF.** Get a downloadable PDF link for a single form submission, identified by its response UUID (obtainable from Get Form Responses). Use it when you need a printable or shareable copy of one response. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `responseUuid` | string | yes |  | Response UUID. The unique identifier of the submission. You can find this in the form responses list. |

### `add_form_response`

**Add Form Response.** Programmatically submit a new response to a form. Use it to record form data on behalf of a respondent without going through the public form page; note it does not send the usual admin email notification. Requires the form id and a response-data object keyed by field UUID (use Get Form Fields to resolve UUIDs). Not idempotent: each call creates a separate submission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. Select the form to use. A value the product loads from the provider, such as an id; write the value itself. |
| `responseData` | object | yes |  | Response Data. Key-value pairs where each key is the field UUID and the value is the user input. |

### `update_form_settings`

**Update Form Settings.** Update one form configuration in a single call, covering any subset of general info, after-submission behaviour, admin/respondent email, SEO, integration toggles (Slack, Discord, Google Sheets, HubSpot), security/CAPTCHA, layout, and submission numbering. Only the fields you provide are changed; omitted fields are left untouched. Requires the form id. Idempotent: re-sending the same values leaves the form in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. Select the form to use. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Form Name. New display name of the form. Leave empty to keep the current value. |
| `description` | string | no |  | Form Description. New description shown on the public form page. |
| `isClosed` | boolean | no |  | Close Form. When checked, the form stops accepting new submissions. |
| `responsesLimit` | number | no |  | Responses Limit. Maximum number of submissions allowed. Leave empty for unlimited responses. |
| `afterMessage` | string | no |  | After-Submission Message. Message shown on screen after the user submits the form. |
| `afterRedirectUrl` | string | no |  | After-Submission Redirect URL. URL to redirect the respondent to after submission (instead of showing a message). |
| `afterRedirectDelay` | number | no |  | Redirect Delay (seconds). Number of seconds to wait before redirecting. Leave empty for instant redirect. |
| `ctaLabel` | string | no |  | CTA Label. Text on the primary button shown after submission (e.g. "Download"). |
| `ctaLabelContinue` | string | no |  | CTA Label Continue. Text on the secondary button shown after submission (e.g. "Next"). |
| `closedMessage` | string | no |  | Closed Form Message. Message shown when a user tries to access a closed form. |
| `adminEmailSubject` | string | no |  | Notification Email Subject. Subject line of the email sent to admins on each new submission. |
| `adminEmailNote` | string | no |  | Notification Email Note. Custom note added to the top of the admin notification email. |
| `adminEmailAttachPdf` | boolean | no |  | Attach Submission PDF. Attach a PDF version of the submission to the admin email. |
| `includeResponseInEmail` | boolean | no |  | Include Response in Email. Include the full response data in the admin notification body. |
| `afterMessageEmail` | string | no |  | Respondent Confirmation Email Message. Message sent to the respondent in their confirmation email (if enabled). |
| `afterMessageEmailSubject` | string | no |  | Respondent Confirmation Email Subject. Subject line of the confirmation email sent to the respondent. |
| `seoTitle` | string | no |  | SEO Title. Custom HTML title tag for the public form page. |
| `seoDescription` | string | no |  | SEO Description. Meta description for the public form page. |
| `seoAllowBots` | boolean | no |  | Allow Search-Engine Bots. When checked, search engines may index the public form page. |
| `discordEnabled` | boolean | no |  | Discord Notifications. When checked, a notification is sent to the configured Discord channel on each submission. |
| `slackEnabled` | boolean | no |  | Slack Notifications. When checked, a notification is sent to the configured Slack channel on each submission. |
| `googleSheetsEnabled` | boolean | no |  | Google Sheets Integration. When checked, submissions are automatically synced to Google Sheets. |
| `hubspotEnabled` | boolean | no |  | HubSpot Integration. When checked, submissions are pushed to HubSpot as contacts or deals. |
| `captcha` | string | no |  | CAPTCHA. Protection against spam bots. One of `"altcha"`, `"turnstile"`, `"recaptcha"`, `"none"`. |
| `captureLocation` | boolean | no |  | Capture Location. Record the respondent location (IP-based geolocation). |
| `showFormTitle` | boolean | no |  | Show Form Title. Display the form title at the top of the public page. |
| `showMultipageProgress` | boolean | no |  | Show Multi-Page Progress. Show a progress bar when the form has multiple pages. |
| `aiSummaryEnabled` | boolean | no |  | AI Summary. Enable the AI-powered summary on the form dashboard. |
| `sendPdfToRespondent` | boolean | no |  | Send PDF to Respondent. Attach a PDF version of the submission to the respondent confirmation email. |
| `numberPrefix` | string | no |  | Number Prefix. Text added before the submission number (e.g. "INV-"). |
| `numberSuffix` | string | no |  | Number Suffix. Text added after the submission number (e.g. "-A"). |

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
