# Grok by xAI

AI chatbot by xAI that answers questions, generates text, extracts data, and provides real-time insights.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-grok-xai'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> **Get your xAI API Key**
>
> 1. Sign up at [xAI](https://x.ai)
> 2. Go to your [API dashboard](https://console.x.ai)
> 3. Generate a new API key
> 4. Copy and paste the key here
>
> Your API key should start with `xai-`

## Actions

### `ask_grok`

**Ask Grok.** Sends a prompt to a Grok chat model and returns the completion, carrying the conversation as a required Messages array of role-and-content turns, which also covers a single-turn question as one user message and can pair it with an image URL for vision models. It is the general-purpose Grok call and the only one here that can turn on real-time web, news, and X search with citations, declare callable functions, or carry conversation history across runs via a memory key; prefer categorize_text to assign labels from a fixed set, extract_data_from_text to pull named fields out of prose, and generate_image for pictures. Messages must be supplied; the Quick Prompt field is a builder-side alternative that run() only reads when Messages is left empty. Not idempotent: each call produces a fresh completion and, when a memory key is set, appends to the stored history. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"grok-3-beta"` | Model. Grok model to use for generating the response. A value the product loads from the provider, such as an id; write the value itself. |
| `messages` | array | yes |  | Messages. Conversation messages for multi-turn conversations. Each item: { `role`, `content`, `name`?, `tool_call_id`? }. |
| `quickPrompt` | string | no |  | Quick Prompt (Alternative). Simple text prompt for single-turn conversations. Ignored if Messages is provided. |
| `systemMessage` | string | no | `"You are Grok, a helpful and witty AI assistant that provides accurate, truthful answers."` | System Instructions. System message to set behavior and context. |
| `imageUrl` | string | no |  | Image URL (Optional). Image URL for vision models. Works with quick prompt mode. |
| `temperature` | number | no | `1` | Temperature. Controls randomness (0-2): 0 = deterministic, 1 = balanced, 2 = creative. |
| `maxCompletionTokens` | number | no |  | Max Completion Tokens. Maximum tokens for the response. |
| `responseFormat` | string | no | `"text"` | Response Format. Output format for the response. One of `"text"`, `"json_object"`, `"json_schema"`. |
| `jsonSchema` | string | no |  | JSON Schema. JSON schema for structured output (when response format is json_schema). |
| `enableRealTimeSearch` | boolean | no | `false` | Enable Real-Time Search. Allow Grok to search the web and X for current information. |
| `searchMode` | string | no | `"auto"` | Search Mode. How to handle real-time data search. One of `"auto"`, `"on"`, `"off"`. |
| `maxSearchResults` | number | no | `15` | Max Search Results. Maximum number of search results to use (1-30). |
| `searchSources` | array | no |  | Search Sources. Sources to search in. Values the product loads from the provider, such as ids; write an array of them. |
| `tools` | array | no |  | Tools/Functions. Functions the model can call. Each item: { `name`, `description`?, `parameters` }. |
| `toolChoice` | string | no | `"auto"` | Tool Choice. How the model should use tools. One of `"auto"`, `"none"`, `"required"`. |
| `parallelToolCalls` | boolean | no | `true` | Parallel Tool Calls. Allow model to call multiple tools simultaneously. |
| `reasoningEffort` | string | no |  | Reasoning Effort. How hard reasoning models should think (not for grok-4). One of `""`, `"low"`, `"high"`. |
| `memoryKey` | string | no |  | Memory Key. Keep conversation history across runs. |

Output fields:

- `content`: Content
- `reasoning_content`: Reasoning Content
- `refusal`: Refusal
- `role`: Role
- `finish_reason`: Finish Reason
- `model`: Model
- `id`: Response ID
- `created`: Created (Unix Seconds)
- `tool_calls`: Tool Calls
- `tool_calls[].id`: Tool Call ID
- `tool_calls[].type`: Type
- `tool_calls[].function`: Function
- `tool_calls[].function.name`: Name
- `tool_calls[].function.arguments`: Arguments (JSON)
- `citations`: Citations
- `usage`: Usage
- `usage.prompt_tokens`: Prompt Tokens (number)
- `usage.completion_tokens`: Completion Tokens (number)
- `usage.total_tokens`: Total Tokens (number)
- `usage.num_sources_used`: Sources Used (number)

### `extract_data_from_text`

**Extract Data From Text.** Pulls a caller-defined set of typed fields (string, number, boolean, array, or object, each named, described, and individually required or optional) out of one block of unstructured text and returns them as a structured object with extraction notes and optional per-field confidence scores; a strict mode restricts it to information explicitly present instead of allowing inference from context. Choose it to turn prose into known fields; prefer categorize_text when the goal is assigning a label from a fixed set, and ask_grok for open-ended generation or free-form structured output. Non-empty text and at least one field definition are required; not idempotent: each call is a fresh model completion and the extracted values can vary between runs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"grok-3-beta"` | Model. Grok model to use for data extraction. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Extract From. Text to extract data from. |
| `extractionPrompt` | string | no | `"Extract the following structured data from the provided text. Be accurate and only extract information that is explicitly present. If a field is not found, use null."` | Extraction Instructions. How to extract the data. |
| `fields` | array | yes |  | Fields to Extract. Define the structured fields to extract from the text. Each item: { `fieldName`, `fieldType`, `fieldDescription`, `required`? }. |
| `enableContextSearch` | boolean | no | `false` | Enable Context Search. Search for additional context to improve extraction. |
| `strictExtraction` | boolean | no | `true` | Strict Extraction. Only extract explicitly present information. |
| `temperature` | number | no | `0.1` | Temperature. Controls randomness (0-2): 0 = deterministic, 1 = balanced, 2 = creative. |
| `maxCompletionTokens` | number | no | `1000` | Max Completion Tokens. Maximum tokens for the response. |
| `reasoningEffort` | string | no |  | Reasoning Effort. How thoroughly to analyze the text. One of `""`, `"low"`, `"high"`. |
| `includeConfidence` | boolean | no | `true` | Include Confidence Scores. Include confidence scores for extracted fields. |

Output fields:

- `extracted_data`: Extracted Data (an object whose keys vary)
- `extraction_success`: Extraction Success (boolean)
- `extraction_notes`: Extraction Notes
- `fields_extracted`: Fields Extracted (number)
- `fields_requested`: Fields Requested (number)
- `completion_rate`: Completion Rate (number)
- `required_fields_found`: Required Fields Found (number)
- `required_fields_missing`: Required Fields Missing (number)
- `confidence_scores`: Confidence Scores (an object whose keys vary)
- `avg_confidence`: Average Confidence (number)
- `max_confidence`: Max Confidence (number)
- `min_confidence`: Min Confidence (number)
- `reasoning_content`: Reasoning Content
- `model`: Model
- `finish_reason`: Finish Reason
- `citations`: Citations
- `usage`: Usage
- `usage.prompt_tokens`: Prompt Tokens (number)
- `usage.completion_tokens`: Completion Tokens (number)
- `usage.total_tokens`: Total Tokens (number)
- `usage.num_sources_used`: Sources Used (number)

### `categorize_text`

**Categorize Text.** Classifies one block of text against a caller-defined list of categories, each supplied as a name plus a description, returning the chosen labels with the model reasoning and optional per-category confidence scores; a flag switches it between single-label and multi-label assignment, and an optional context search lets the model consult the web before deciding. Pick it when the goal is sorting text into a known label set, rather than pulling values out of it (extract_data_from_text) or generating free-form output (ask_grok). Non-empty text and at least one category are required; not idempotent: each call is a fresh model completion and the assigned labels can vary between runs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"grok-3-beta"` | Model. Grok model to use for text categorization. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Categorize. Text content to categorize. |
| `categories` | array | yes |  | Categories. Define the categories for classification. Each item: { `name`, `description` }. |
| `allowMultiple` | boolean | no | `false` | Allow Multiple Categories. Text can be assigned to multiple categories. |
| `includeConfidence` | boolean | no | `true` | Include Confidence Scores. Include confidence scores for each category. |
| `customInstructions` | string | no | `"Analyze the text and assign it to the most appropriate category based on its content, tone, and context."` | Custom Instructions. Additional instructions for categorization. |
| `enableContextSearch` | boolean | no | `false` | Enable Context Search. Search for additional context to improve categorization. |
| `temperature` | number | no | `0.2` | Temperature. Controls randomness (0-2): 0 = deterministic, 1 = balanced, 2 = creative. |
| `maxCompletionTokens` | number | no | `500` | Max Completion Tokens. Maximum tokens for the response. |
| `reasoningEffort` | string | no |  | Reasoning Effort. How thoroughly to analyze the text. One of `""`, `"low"`, `"high"`. |

Output fields:

- `categories`: Categories
- `primary_category`: Primary Category
- `total_categories_assigned`: Total Categories Assigned (number)
- `multiple_categories`: Multiple Categories Allowed (boolean)
- `reasoning`: Reasoning
- `reasoning_content`: Reasoning Content
- `confidence_scores`: Confidence Scores (an object whose keys vary)
- `avg_confidence`: Average Confidence (number)
- `max_confidence`: Max Confidence (number)
- `min_confidence`: Min Confidence (number)
- `model`: Model
- `finish_reason`: Finish Reason
- `citations`: Citations
- `usage`: Usage
- `usage.prompt_tokens`: Prompt Tokens (number)
- `usage.completion_tokens`: Completion Tokens (number)
- `usage.total_tokens`: Total Tokens (number)
- `usage.num_sources_used`: Sources Used (number)

### `generate_image`

**Generate Image.** Generates one to ten images from a text prompt with a Grok image model, delivered either as hosted URLs or as base64 payloads depending on the chosen response format. This is the only action in the piece that produces images; ask_grok can accept an image URL as vision input but only ever returns text. Requires a non-empty prompt of at most 4000 characters, and the model must be an image model (the dropdown filters to those). Not idempotent: each call renders new images. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Image Prompt. Detailed description of the image you want to generate. |
| `model` | string | yes | `"grok-2-image-1212"` | Image Model. Image generation model to use. A value the product loads from the provider, such as an id; write the value itself. |
| `numberOfImages` | number | no | `1` | Number of Images. Number of images to generate (1-10). |
| `responseFormat` | string | no | `"url"` | Response Format. Format of the generated images. One of `"url"`, `"b64_json"`. |

Output fields:

- `images`: Images
- `images[].index`: Index (number)
- `images[].url`: URL (url)
- `images[].b64_json`: Base64 JSON
- `images[].revised_prompt`: Revised Prompt
- `total_images`: Total Images (number)
- `prompt_used`: Prompt Used
- `model_used`: Model Used
- `response_format`: Response Format

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
