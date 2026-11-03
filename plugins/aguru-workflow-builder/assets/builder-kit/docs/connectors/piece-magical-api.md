# Magical API

Automate resume parsing, review, scoring, and LinkedIn profile/company data retrieval with Magical API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-magical-api'
  version: '0.2.1'
```

Categories: HUMAN_RESOURCES, SALES_AND_CRM, BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Magical API Key

> Enter your Magical API key from your MagicalAPI dashboard.

## Actions

### `parse_resume`

**Parse Resume.** Parses a publicly accessible resume file (PDF/DOC/DOCX) at a given URL into structured fields such as name, contact info, experience, education, and skills. Use to turn an unstructured resume into machine-readable data. Either supply the resume URL to start a job, or pass the Request ID from a prior timed-out run to retrieve that result instead; the call polls until parsing completes. Idempotent: re-running with the same URL re-parses the same document and yields the same data. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | no |  | Resume URL. Provide the direct link to a publicly accessible resume file (PDF, DOC, or DOCX) |
| `request_id` | string | no |  | Request ID (for retries). If a previous run timed out, paste the Request ID here to get the result. |

### `review_resume`

**Review Resume.** Analyzes a publicly accessible resume file (PDF/DOC/DOCX) at a given URL against predefined review criteria, returning an assessment with a score. Use to evaluate resume quality without a specific job description. Either supply the resume URL to start a job, or pass the Request ID from a prior timed-out run to retrieve that result; the call polls until the review completes. Idempotent: re-running with the same URL re-evaluates the same resume. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | no |  | Resume URL. Provide a direct URL to a publicly accessible resume file (PDF, DOC, or DOCX). |
| `request_id` | string | no |  | Request ID (for retries). If a previous run timed out, paste the Request ID here to get the result. |

### `get_profile_data`

**Get Profile Data.** Retrieves comprehensive public LinkedIn profile data (experience, education, headline, etc.) for a given profile username — the slug from the profile URL, e.g. "williamhgates", not a full URL or display name. Use to enrich a person record from their LinkedIn handle. Either supply the profile username to start a lookup, or pass the Request ID from a prior timed-out run to retrieve that result; the call polls until data is ready. Idempotent: it is a read-only lookup that returns the same profile for the same username. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profile_name` | string | no |  | LinkedIn Profile Username. Provide the username from the LinkedIn profile URL (e.g., 'williamhgates'). |
| `request_id` | string | no |  | Request ID (for retries). If a previous run timed out, paste the Request ID here to get the result. |

### `get_company_data`

**Get Company Data.** Fetches comprehensive public company data from any one of three identifiers: a company name (e.g. "Microsoft"), its LinkedIn username slug (e.g. "microsoft"), or its website URL. Use to enrich a company record when you have any of those handles. At least one identifier is required; alternatively pass the Request ID from a prior timed-out run to retrieve that result. The call polls until data is ready. Idempotent: it is a read-only lookup returning the same company for the same identifier. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_name` | string | no |  | Company Name. Provide the company's legal name (e.g., 'Microsoft'). |
| `company_username` | string | no |  | Company LinkedIn Username. Provide the username from the company's LinkedIn URL (e.g., 'microsoft'). |
| `company_website` | string | no |  | Company Website. Provide the company's official website URL. |
| `request_id` | string | no |  | Request ID (for retries). If a previous run timed out, paste the Request ID here to get the result. |

### `score_resume`

**Score Resume.** Scores how well a publicly accessible resume file (PDF/DOC/DOCX) at a given URL matches a supplied job description, returning a fit score with reasoning. Use to rank or screen candidates against a specific role. Both the resume URL and the job description are required to start a job; alternatively pass the Request ID from a prior timed-out run to retrieve that result. The call polls until scoring completes. Idempotent: re-running with the same resume and job description yields the same score. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | no |  | Resume URL. Provide a direct URL to a publicly accessible resume file (PDF, DOC, or DOCX). |
| `job_description` | string | no |  | Job Description. Provide the job description to score the resume against. |
| `request_id` | string | no |  | Request ID (for retries). If a previous run timed out, paste the Request ID here to get the result. |

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
