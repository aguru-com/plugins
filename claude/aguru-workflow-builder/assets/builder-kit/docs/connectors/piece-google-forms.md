# Google Forms

Receive form responses from Google Forms

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-forms'
  version: '0.7.3'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Service Account (Advanced)

> Connect with a Google Cloud service account.
>
> **How to get the key:**
> 1. Open the [Google Cloud console](https://console.cloud.google.com/iam-admin/serviceaccounts) → **IAM & Admin** → **Service Accounts**.
> 2. Create a service account, or pick an existing one.
> 3. Open **Keys** → **Add key** → **Create new key** → **JSON** and download the file.
> 4. Share each form with the service account's email, or set up [domain-wide delegation](https://support.google.com/a/answer/162106) and fill in **User Email** below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serviceAccount` | string | yes |  | Service Account JSON Key. Paste the full contents of the downloaded key file. |
| `userEmail` | string | no |  | User Email. Email address of the user to impersonate for domain-wide delegation. |

## Actions

### `forms_get_form`

**Get Form.** Fetches a form's full structure: its title/description, settings, the ordered list of items with their itemId and index, the questionId of each question, and the current revisionId. Use this before any edit (to get item indices and the revision) and before reading responses (to map answer questionIds to prompts). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. The ID of the form to fetch. Obtain it from forms_create_form, forms_list_responses, or the New Response trigger. |

Output fields:

- `formId`: Form ID
- `info`: Info
- `info.title`: Title
- `info.documentTitle`: Document Title
- `settings`: Settings
- `settings.emailCollectionType`: Email Collection Type
- `revisionId`: Revision ID
- `responderUri`: Responder Link (url)
- `items`: Items
- `items[].itemId`: Item ID
- `items[].title`: Title
- `items[].questionItem`: Question
- `items[].questionItem.question`: Question
- `items[].questionItem.question.questionId`: Question ID
- `items[].questionItem.question.required`: Required (boolean)
- `publishSettings`: Publish Settings
- `publishSettings.publishState`: Publish State
- `publishSettings.publishState.isPublished`: Is Published (boolean)
- `publishSettings.publishState.isAcceptingResponses`: Is Accepting Responses (boolean)

### `forms_list_responses`

**List Form Responses.** Lists submitted responses for a form, with each response's responseId, timestamps, and answers keyed by questionId. Answers are keyed by opaque questionId — call forms_get_form to map them to prompts. Supports a "timestamp > / <" filter and pagination via page_token; an empty list is valid (no submissions yet). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. The ID of the form whose responses to list. Obtain it from forms_create_form, forms_get_form, or the New Response trigger. |
| `filter` | string | no |  | Filter. Optional filter on submission time, e.g. "timestamp > 2026-01-01T00:00:00Z" or "timestamp < 2026-06-01T00:00:00Z". Only the timestamp field is supported. |
| `page_size` | number | no |  | Page Size. Maximum number of responses to return per page (default 5000). |
| `page_token` | string | no |  | Page Token. Token from a previous call's nextPageToken to fetch the next page of responses. |

Output fields:

- `responses`: Responses
- `responses[].responseId`: Response ID
- `responses[].createTime`: Create Time (datetime)
- `responses[].lastSubmittedTime`: Last Submitted Time (datetime)
- `responses[].answers`: Answers (an object whose keys vary)
- `responses[].answers.questionId`: Question ID
- `responses[].answers.textAnswers`: Text Answers
- `responses[].answers.textAnswers.answers`: Values
- `responses[].answers.textAnswers.answers[].value`: Value
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `forms_get_response`

**Get Form Response.** Fetches one full submission by its responseId (resolve via forms_list_responses or the New Response trigger), including all answers keyed by questionId and submission timestamps. Use when you need one submission in detail; to enumerate submissions use forms_list_responses. Answers are keyed by questionId — use forms_get_form to interpret them. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. The ID of the form the response belongs to. Obtain it from forms_list_responses or the New Response trigger. |
| `response_id` | string | yes |  | Response ID. The ID of the response to fetch. Obtain it from forms_list_responses or the New Response trigger. |

Output fields:

- `formId`: Form ID
- `responseId`: Response ID
- `createTime`: Create Time (datetime)
- `lastSubmittedTime`: Last Submitted Time (datetime)
- `answers`: Answers (an object whose keys vary)
- `answers.questionId`: Question ID
- `answers.textAnswers`: Text Answers
- `answers.textAnswers.answers`: Values
- `answers.textAnswers.answers[].value`: Value

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
