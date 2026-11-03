# Anthropic Claude

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-claude'
  version: '0.7.2'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these instructions to get your Claude API Key:
>
> 1. Visit the following website: https://console.anthropic.com/settings/keys.
> 2. Once on the website, locate and click on the option to obtain your Claude API Key.

## Actions

### `ask_claude`

**Ask Claude.** Sends a free-form question or instruction to a chosen Anthropic Claude model and returns the reply as plain text, optionally with an image attached for vision and earlier user/assistant turns supplied as Roles for multi-turn context; enabling Extended Thinking Mode routes the call to Claude 3.7 Sonnet with a separate reasoning token budget. Prefer the sibling Extract Structured Data action when the answer must be constrained to defined fields rather than prose. Requires a model and a question, with temperature between 0 and 1; not idempotent, since each call is a fresh generation that can return different text. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The Claude model to use. Newest models are listed first. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Question. What you want Claude to answer or do. |
| `systemPrompt` | string | no | `"You're a helpful assistant."` | System Prompt. Standing instructions, such as a role or tone, for Claude to follow. |
| `image` | file | no |  | Image. An image for Claude to look at along with your question. Files are not supported; an action that needs one fails. |
| `maxTokens` | number | no |  | Maximum Tokens. Longest reply in tokens, about 4 characters each. Empty: 1,000. |
| `temperature` | number | no |  | Temperature. From 0 to 1. Lower is more focused, higher is more varied. |
| `roles` | JSON | no | `[]` | Roles. Extra messages sent after the question, as user or assistant turns. |
| `thinkingMode` | boolean | no | `false` | Extended Thinking Mode. Lets Claude reason first. Uses Claude 3.7 Sonnet, regardless of Model. |
| `thinkingModeParams` | object | no |  | . An object whose fields depend on other inputs; the product shows them. |

### `extract-structured-data`

**Extract Structured Data.** Runs a Claude model over supplied text, an image, or a PDF and returns only the fields you defined, using a forced tool call so the output matches your schema. The Field Definition prop switches between Field List mode (a list of named fields with types and required flags) and JSON Schema mode (a raw JSON Schema object); prefer the sibling Ask Claude action when you want free-form prose instead of typed fields. Requires a model, the field definitions, and at least one of Text, or an Image or PDF; not idempotent, since each call re-runs the model and extraction can vary. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The Claude model to use. Newest models are listed first. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | no |  | Text. Text to pull the fields from. |
| `image` | file | no |  | Image or PDF. An image or PDF to pull the fields from. Files are not supported; an action that needs one fails. |
| `mode` | string | yes | `"simple"` | Field Definition. One of `"simple"`, `"advanced"`. |
| `schema` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |
| `maxTokens` | number | no |  | Maximum Tokens. Longest reply in tokens, about 4 characters each. Empty: 2,000. |
| `prompt` | string | no | `"Extract the following data from the provided data."` | Instructions. Tells Claude what to extract. The default suits most cases. |

Output fields:

- `name`: Name
- `email`: Email (email)
- `phone`: Phone
- `city`: City

### `list_models`

**List Models.** Lists the Claude models available for use, most recently released first, returning each model's ID and display name. Use to discover a valid model ID before calling Ask Claude, Extract Structured Data, or Create Message Batch. Idempotent: it only reads data. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `models`: Models
- `models[].id`: Model ID
- `models[].display_name`: Display Name
- `models[].created_at`: Created At (datetime)
- `models[].max_input_tokens`: Max Input Tokens (number)
- `models[].max_tokens`: Max Output Tokens (number)
- `models[].capabilities`: Capabilities
- `models[].capabilities.batch`: Batch API
- `models[].capabilities.batch.supported`: Supported (boolean)
- `models[].capabilities.citations`: Citations
- `models[].capabilities.citations.supported`: Supported (boolean)
- `models[].capabilities.code_execution`: Code Execution
- `models[].capabilities.code_execution.supported`: Supported (boolean)
- `models[].capabilities.image_input`: Image Input
- `models[].capabilities.image_input.supported`: Supported (boolean)
- `models[].capabilities.pdf_input`: PDF Input
- `models[].capabilities.pdf_input.supported`: Supported (boolean)
- `models[].capabilities.structured_outputs`: Structured Outputs
- `models[].capabilities.structured_outputs.supported`: Supported (boolean)
- `models[].capabilities.thinking`: Extended Thinking
- `models[].capabilities.thinking.supported`: Supported (boolean)
- `models[].capabilities.thinking.types`: Types
- `models[].capabilities.thinking.types.adaptive`: Adaptive
- `models[].capabilities.thinking.types.adaptive.supported`: Supported (boolean)
- `models[].capabilities.thinking.types.enabled`: Enabled
- `models[].capabilities.thinking.types.enabled.supported`: Supported (boolean)

### `get_model`

**Get Model.** Reads a single Claude model by ID or alias (e.g. 'claude-3-7-sonnet-latest'), returning its resolved ID, display name, and release date. Use to confirm a model ID is valid or resolve an alias before using it elsewhere. Idempotent: it only reads data. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelId` | string | yes |  | Model ID. The model ID or alias to look up. |

Output fields:

- `id`: Model ID
- `display_name`: Display Name
- `created_at`: Created At (datetime)
- `max_input_tokens`: Max Input Tokens (number)
- `max_tokens`: Max Output Tokens (number)
- `capabilities`: Capabilities
- `capabilities.batch`: Batch API
- `capabilities.batch.supported`: Supported (boolean)
- `capabilities.citations`: Citations
- `capabilities.citations.supported`: Supported (boolean)
- `capabilities.code_execution`: Code Execution
- `capabilities.code_execution.supported`: Supported (boolean)
- `capabilities.image_input`: Image Input
- `capabilities.image_input.supported`: Supported (boolean)
- `capabilities.pdf_input`: PDF Input
- `capabilities.pdf_input.supported`: Supported (boolean)
- `capabilities.structured_outputs`: Structured Outputs
- `capabilities.structured_outputs.supported`: Supported (boolean)
- `capabilities.thinking`: Extended Thinking
- `capabilities.thinking.supported`: Supported (boolean)
- `capabilities.thinking.types`: Types
- `capabilities.thinking.types.adaptive`: Adaptive
- `capabilities.thinking.types.adaptive.supported`: Supported (boolean)
- `capabilities.thinking.types.enabled`: Enabled
- `capabilities.thinking.types.enabled.supported`: Supported (boolean)

### `create_message_batch`

**Create Message Batch.** Submits multiple Messages API requests as a single asynchronous batch (up to 24h to complete), cheaper than calling Ask Claude repeatedly for large volumes. Each request needs a unique custom_id and a params object shaped like the Messages API (model, messages, max_tokens, system). Poll status with Get Message Batch and read output with Get Message Batch Results once processing_status is 'ended'. Not idempotent: each call creates a new batch. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `requests` | JSON | yes | `[{"custom_id":"request-1","params":{"model":"claude-3-5-haiku-latest","max_tokens":1024,"messages":[{"role":"user","content":"Hello, Claude!"}]}}]` | Requests. Array of { custom_id, params } objects. Each custom_id must be unique within the batch; each params object matches the Messages API request body (model, messages, max_tokens, system, etc). |

Output fields:

- `id`: Batch ID
- `processing_status`: Status
- `request_counts`: Request Counts
- `request_counts.processing`: Processing (number)
- `request_counts.succeeded`: Succeeded (number)
- `request_counts.errored`: Errored (number)
- `request_counts.canceled`: Canceled (number)
- `request_counts.expired`: Expired (number)
- `created_at`: Created At (datetime)
- `expires_at`: Expires At (datetime)
- `ended_at`: Ended At (datetime)
- `archived_at`: Archived At (datetime)
- `cancel_initiated_at`: Cancel Initiated At (datetime)
- `results_url`: Results URL (url)

### `get_message_batch`

**Get Message Batch.** Reads a message batch by ID, returning its processing_status ('in_progress', 'canceling', or 'ended') and a tally of succeeded/errored/canceled/expired requests. Poll this after Create Message Batch until processing_status is 'ended', then call Get Message Batch Results. Idempotent: it only reads data. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageBatchId` | string | yes |  | Message Batch ID. |

Output fields:

- `id`: Batch ID
- `processing_status`: Status
- `request_counts`: Request Counts
- `request_counts.processing`: Processing (number)
- `request_counts.succeeded`: Succeeded (number)
- `request_counts.errored`: Errored (number)
- `request_counts.canceled`: Canceled (number)
- `request_counts.expired`: Expired (number)
- `created_at`: Created At (datetime)
- `expires_at`: Expires At (datetime)
- `ended_at`: Ended At (datetime)
- `archived_at`: Archived At (datetime)
- `cancel_initiated_at`: Cancel Initiated At (datetime)
- `results_url`: Results URL (url)

### `list_message_batches`

**List Message Batches.** Lists message batches in the workspace, most recently created first, returning each batch's ID and processing_status. Use to discover a batch ID before calling Get Message Batch, Get Message Batch Results, Cancel Message Batch, or Delete Message Batch. Idempotent: it only reads data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Number of batches to return per page (default 20, max 1000). |
| `afterId` | string | no |  | After ID. Return the page of batches immediately after this batch ID. |
| `beforeId` | string | no |  | Before ID. Return the page of batches immediately before this batch ID. |

Output fields:

- `data`: Batches
- `data[].id`: Batch ID
- `data[].processing_status`: Status
- `data[].request_counts`: Request Counts
- `data[].request_counts.processing`: Processing (number)
- `data[].request_counts.succeeded`: Succeeded (number)
- `data[].request_counts.errored`: Errored (number)
- `data[].request_counts.canceled`: Canceled (number)
- `data[].request_counts.expired`: Expired (number)
- `data[].created_at`: Created At (datetime)
- `data[].expires_at`: Expires At (datetime)
- `data[].ended_at`: Ended At (datetime)
- `data[].archived_at`: Archived At (datetime)
- `data[].cancel_initiated_at`: Cancel Initiated At (datetime)
- `data[].results_url`: Results URL (url)
- `has_more`: Has More (boolean)
- `first_id`: First ID
- `last_id`: Last ID

### `cancel_message_batch`

**Cancel Message Batch.** Cancels a message batch that is still 'in_progress'. The batch moves to 'canceling' and the system finishes any non-interruptible requests already underway before finalizing; check request_counts.canceled via Get Message Batch to see how many were actually stopped. Idempotent: canceling an already-canceling or ended batch has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageBatchId` | string | yes |  | Message Batch ID. |

Output fields:

- `id`: Batch ID
- `processing_status`: Status
- `request_counts`: Request Counts
- `request_counts.processing`: Processing (number)
- `request_counts.succeeded`: Succeeded (number)
- `request_counts.errored`: Errored (number)
- `request_counts.canceled`: Canceled (number)
- `request_counts.expired`: Expired (number)
- `created_at`: Created At (datetime)
- `expires_at`: Expires At (datetime)
- `ended_at`: Ended At (datetime)
- `archived_at`: Archived At (datetime)
- `cancel_initiated_at`: Cancel Initiated At (datetime)
- `results_url`: Results URL (url)

### `delete_message_batch`

**Delete Message Batch.** Permanently deletes a message batch, once its processing_status is 'ended' (an in-progress batch must be canceled first via Cancel Message Batch). This removes access to the batch's results. Not idempotent: deleting an already-deleted batch fails with not_found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageBatchId` | string | yes |  | Message Batch ID. |

Output fields:

- `id`: Batch ID
- `type`: Type

### `get_message_batch_results`

**Get Message Batch Results.** Reads the results of a message batch once Get Message Batch reports processing_status 'ended', returning each request's custom_id alongside its outcome ('succeeded' with the Message, or 'errored'/'canceled'/'expired'). Results are not guaranteed to be in request order; match on custom_id. Idempotent: it only reads data. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageBatchId` | string | yes |  | Message Batch ID. |
| `maxResults` | number | no |  | Max Results. Maximum number of results to return (default 100). |

Output fields:

- `results`: Results
- `results[].custom_id`: Custom ID
- `results[].result`: Result
- `results[].result.type`: Type
- `results[].result.message`: Message
- `results[].result.message.id`: Message ID
- `results[].result.message.model`: Model
- `results[].result.message.stop_reason`: Stop Reason
- `results[].result.message.content`: Content
- `results[].result.message.content[].type`: Type
- `results[].result.message.content[].text`: Text
- `results[].result.message.usage`: Usage
- `results[].result.message.usage.input_tokens`: Input Tokens (number)
- `results[].result.message.usage.output_tokens`: Output Tokens (number)
- `results[].result.error`: Error
- `results[].result.error.request_id`: Request ID
- `results[].result.error.error`: Error
- `results[].result.error.error.type`: Type
- `results[].result.error.error.message`: Message

### `count_tokens`

**Count Tokens.** Counts the input tokens a prompt and optional system prompt would use for a given Claude model, without sending it to be answered. Use to check a prompt fits a model's context window or to estimate cost before calling Ask Claude or Extract Structured Data. Idempotent: it only counts, it never generates. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The Claude model to use. Newest models are listed first. A value the product loads from the provider, such as an id; write the value itself. |
| `systemPrompt` | string | no |  | System Prompt. |
| `prompt` | string | yes |  | Prompt. |

Output fields:

- `input_tokens`: Input Tokens (number)

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
