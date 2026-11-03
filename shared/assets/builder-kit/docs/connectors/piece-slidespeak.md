# SlideSpeak

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-slidespeak'
  version: '0.2.0'
```

Categories: CONTENT_AND_FILES, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key by navigating to [API Settings](https://app.slidespeak.co/settings/developer).

## Actions

### `create-presentation`

**Create Presentation.** Generates a new AI-built slide deck from a topic prompt, optionally grounded in previously uploaded documents (pass their UUIDs) and styled with a template, tone, verbosity, language, and PowerPoint or PDF output. Use to produce a presentation from scratch; the call blocks while polling until generation finishes (up to ~5 minutes) and creates a new deck on each invocation, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `plain_text` | string | yes |  | Topic. Topic of presentation. |
| `length` | number | no |  | Number of Slides. |
| `document_uuids` | array | no |  | Documents. Uploaded docuemts to use in presentation. |
| `template` | string | no |  | Dropdown. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. |
| `custom_user_instructions` | string | no |  | Custom User Instructions. |
| `fetch_images` | boolean | no |  | Fetch Images. Whether to include stock images. |
| `tone` | string | no |  | Tone. The tone to use for the text. One of `"default"`, `"casual"`, `"professional"`, `"funny"`, `"educational"`, `"sales_pitch"`. |
| `verbosity` | string | no |  | Verbosity. How verbose, or long, the text should be. One of `"concise"`, `"standard"`, `"text-heavy"`. |
| `include_cover` | boolean | no |  | include the ‘cover’ slide.. |
| `include_table_of_contents` | boolean | no |  |  include the ‘table of contents’ slides.. |
| `response_format` | string | no |  | Response Format. One of `"powerpoint"`, `"pdf"`. |

### `edit-presentation`

**Edit Presentation.** Modifies an existing PowerPoint (.pptx) by applying a config of shape replacements (each targeting a named shape and supplying new content). Use to programmatically swap text/placeholder values in a deck you already have. Requires the .pptx file and a replacements config; each call submits a new edit job, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pptx_file` | file | yes |  | Powepoint File (.pptx). Files are not supported; an action that needs one fails. |
| `config` | JSON | yes | `{"replacements":[{"shape_name":"TARGET_TITLE","content":"Your new title"}]}` | Config. |

### `get-task-status`

**Get Task Status.** Looks up the current status and result of an asynchronous SlideSpeak task (such as a presentation generation or document upload job) by its task ID. Use to poll for completion or retrieve the output of a previously started job. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. |

### `upload-docuemnt`

**Upload Document.** Uploads a document file to SlideSpeak so it can later be used as source material when creating a presentation (reference the returned task/document id in Create Presentation). Use as the first step before grounding a generated deck in your own content; the call blocks while polling until processing finishes (up to ~5 minutes) and uploads a new document each time, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |

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
