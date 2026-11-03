# Fillout Forms

Create interactive forms and automate workflows with Fillout

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-fillout-forms'
  version: '0.2.0'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Go to your Fillout account settings.
> 2. Click on "Developer settings".
> 3. Generate and copy your API key.
> 4. Paste it here.

## Actions

### `getFormResponses`

**Get Form Responses.** Lists submissions for a specific Fillout form (identified by form ID), optionally narrowed by date range, search text, completion status (finished by default, or in-progress), sort order, limit, and offset for pagination. With no filters it returns all submissions; supply filters to fetch only matching ones. Use to retrieve or page through collected form responses. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. Max number of submissions to retrieve (1-150). |
| `afterDate` | ISO date-time string | no |  | After Date. Filter submissions after this date (YYYY-MM-DDTHH:mm:ss.sssZ). |
| `beforeDate` | ISO date-time string | no |  | Before Date. Filter submissions before this date (YYYY-MM-DDTHH:mm:ss.sssZ). |
| `offset` | number | no |  | Offset. Starting position for fetching submissions. |
| `status` | string | no |  | Status. By default, only finished submissions are returned. Select "In Progress" to get unfinished submissions instead. One of `"in_progress"`. |
| `includeEditLink` | boolean | no |  | Include Edit Link. Include a link to edit the submission. |
| `includePreview` | boolean | no |  | Include Preview. Include preview responses. |
| `sort` | string | no |  | Sort. Sort order. One of `"asc"`, `"desc"`. |
| `search` | string | no |  | Search. Filter for submissions containing this text. |

Output fields:

- `totalResponses`: Total Responses (number)
- `pageCount`: Page Count (number)
- `responses`: Responses
- `responses[].submissionId`: Submission ID
- `responses[].submissionTime`: Submission Time (datetime)
- `responses[].questions`: Questions
- `responses[].questions[].id`: Question ID
- `responses[].questions[].name`: Question Name
- `responses[].questions[].type`: Question Type
- `responses[].questions[].value`: Answer
- `responses[].calculations`: Calculations
- `responses[].calculations[].id`: Calculation ID
- `responses[].calculations[].name`: Calculation Name
- `responses[].calculations[].type`: Calculation Type
- `responses[].calculations[].value`: Value
- `responses[].urlParameters`: URL Parameters
- `responses[].urlParameters[].id`: Parameter ID
- `responses[].urlParameters[].name`: Parameter Name
- `responses[].urlParameters[].value`: Value
- `responses[].lastUpdatedAt`: Last Updated At (datetime)
- `responses[].startedAt`: Started At (datetime)
- `responses[].editLink`: Edit Link (url)

### `getSingleResponse`

**Get Single Response.** Retrieves one specific submission from a Fillout form, keyed by form ID and submission ID. Use when you already know the submission ID and need its full details, rather than listing all responses. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `submissionId` | string | yes |  | Submission. Select from the 50 most recent submissions for the chosen form. A value the product loads from the provider, such as an id; write the value itself. |
| `includeEditLink` | boolean | no |  | Include Edit Link. Include a link to edit the submission. |

Output fields:

- `submission`: Submission
- `submission.submissionId`: Submission ID
- `submission.submissionTime`: Submission Time (datetime)
- `submission.questions`: Questions
- `submission.questions[].id`: Question ID
- `submission.questions[].name`: Question Name
- `submission.questions[].type`: Question Type
- `submission.questions[].value`: Answer
- `submission.calculations`: Calculations
- `submission.calculations[].id`: Calculation ID
- `submission.calculations[].name`: Calculation Name
- `submission.calculations[].type`: Calculation Type
- `submission.calculations[].value`: Value
- `submission.urlParameters`: URL Parameters
- `submission.urlParameters[].id`: Parameter ID
- `submission.urlParameters[].name`: Parameter Name
- `submission.urlParameters[].value`: Value
- `submission.lastUpdatedAt`: Last Updated At (datetime)
- `submission.startedAt`: Started At (datetime)
- `submission.editLink`: Edit Link (url)

### `findFormByTitle`

**Find Form by Title.** Searches the account's Fillout forms for those whose title contains the given text (case-insensitive partial match) and returns the matches. Use to resolve a form name to its form ID before calling response-fetching actions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Form Title. The (partial or full) title of the form to search for. |

Output fields:

- `found`: Found (boolean)
- `result`: Matching Forms
- `result[].name`: Name
- `result[].formId`: Form ID
- `result[].id`: Numeric ID
- `result[].isPublished`: Is Published (boolean)
- `result[].tags`: Tags

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
