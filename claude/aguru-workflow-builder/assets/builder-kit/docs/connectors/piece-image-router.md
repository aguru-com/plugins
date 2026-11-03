# ImageRouter

Generate images with any model available on ImageRouter.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-image-router'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your ImageRouter API key. You can get your API key from the [ImageRouter API Keys page](https://imagerouter.io/api-keys).

## Actions

### `createImage`

**Create Image.** Generates brand-new images from a text prompt alone, routing the request through ImageRouter to whichever hosted image model is named in the required Model input, then downloading each result and saving it as a flow file. Pick this when there is no source picture to work from; use Image to Image instead to edit, mask, or transform images you already have. Quality and size are advisory and are ignored by models that do not support them. Not idempotent: each call runs a fresh generation and returns different images. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Text prompt describing the image you want to generate. |
| `model` | string | yes |  | Model. Select an image generation model. A value the product loads from the provider, such as an id; write the value itself. |
| `quality` | string | no | `"auto"` | Quality. Image quality (not all models support this) One of `"auto"`, `"low"`, `"medium"`, `"high"`. |
| `size` | string | no | `"auto"` | Size. Image size (e.g., 1024x1024). Use "auto" for default size. |
| `responseFormat` | string | no | `"url"` | Response Format. How to receive the generated image. One of `"url"`, `"b64_json"`, `"b64_ephemeral"`. |

Output fields:

- `images`: Saved Images
- `images[].index`: Index (number)
- `images[].savedFile`: Saved File (url)
- `images[].fileName`: File Name
- `images[].url`: Image URL (image)
- `images[].b64_json`: Base64 Image
- `images[].revised_prompt`: Revised Prompt
- `data`: Raw Images
- `data[].url`: Image URL (image)
- `data[].b64_json`: Base64 Image
- `data[].revised_prompt`: Revised Prompt
- `created`: Created At (datetime)
- `latency`: Latency (ms) (number)
- `cost`: Cost (currency)

### `imageToImage`

**Image to Image.** Edits or transforms one to sixteen supplied image files against a text prompt via ImageRouter's image-edit endpoint, either rewriting the whole picture or, when mask files are attached, confining the changes to the masked areas (some models require a mask). Choose this whenever a source image must be sent - inpainting, style transfer, background swaps, multi-image composition; use Create Image when generating from a prompt with no input image. At least one image file is required and the selected model must support editing. Not idempotent: each call renders new output images. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Text prompt describing the image transformation. |
| `model` | string | yes |  | Model. Select an image generation model. A value the product loads from the provider, such as an id; write the value itself. |
| `images` | array | yes |  | Input Images. Input image(s) for editing (up to 16 images) Each item: { `image` }. |
| `masks` | array | no |  | Masks. Mask file(s) to specify areas to edit (some models require this) Each item: { `mask` }. |
| `quality` | string | no | `"auto"` | Quality. Image quality (not all models support this) One of `"auto"`, `"low"`, `"medium"`, `"high"`. |
| `size` | string | no | `"auto"` | Size. Image size (e.g., 1024x1024). Use "auto" for default size. |
| `responseFormat` | string | no | `"url"` | Response Format. How to receive the generated image. One of `"url"`, `"b64_json"`, `"b64_ephemeral"`. |

Output fields:

- `images`: Saved Images
- `images[].index`: Index (number)
- `images[].savedFile`: Saved File (url)
- `images[].fileName`: File Name
- `images[].url`: Image URL (image)
- `images[].b64_json`: Base64 Image
- `images[].revised_prompt`: Revised Prompt
- `data`: Raw Images
- `data[].url`: Image URL (image)
- `data[].b64_json`: Base64 Image
- `data[].revised_prompt`: Revised Prompt
- `created`: Created At (datetime)
- `latency`: Latency (ms) (number)
- `cost`: Cost (currency)

### `image_router_generate_image`

**Generate Image.** Generates new images from a text prompt with the chosen ImageRouter model and returns hosted image URLs (kept 30 days), plus the credits charged. Use Edit Image instead when you have source images to transform. Pick a model whose output_modalities include image from List Models; free models such as "test/test" cost nothing. Not idempotent: each call runs and bills a new generation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Model id, e.g. "openai/gpt-image-2". Use List Models to find ids and what each model supports. |
| `prompt` | string | yes |  | Prompt. What the image should show. |
| `quality` | string | no |  | Quality. Output quality for models that support it. Defaults to auto. One of `"auto"`, `"low"`, `"medium"`, `"high"`. |
| `size` | string | no |  | Size. "auto" or WIDTHxHEIGHT such as "1024x1024". Allowed sizes per model are in Get Model. Defaults to auto. |
| `outputFormat` | string | no |  | Output Format. Image file format. Defaults to webp. One of `"webp"`, `"jpeg"`, `"png"`. |

Output fields:

- `data`: Images
- `data[].url`: Image URL (image)
- `data[].revised_prompt`: Revised Prompt
- `created`: Created At (datetime)
- `latency`: Latency (ms) (number)
- `cost`: Cost (currency)

### `image_router_edit_image`

**Edit Image.** Sends 1 to 16 source images (http(s) URLs or data URIs) with an optional prompt and optional masks to an ImageRouter editing model, and returns hosted URLs of the new images plus the credits charged. Use for image-to-image work (style transfer, inpainting, combining images); use Generate Image when there is no source image. The model must accept image input (input_modalities include image in List Models); masks only work with models listing mask. Not idempotent: each call runs and bills a new generation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Model id, e.g. "openai/gpt-image-2". Use List Models to find ids and what each model supports. |
| `images` | array | yes |  | Images. Source images, 1 to 16, each an http(s) URL or a data URI such as "data:image/png;base64,...". |
| `prompt` | string | no |  | Prompt. How to change the images. Most models need one; a few (e.g. upscalers) do not. |
| `masks` | array | no |  | Masks. Optional mask images (URL or data URI) marking the area to edit, for models that support masks. |
| `quality` | string | no |  | Quality. Output quality for models that support it. Defaults to auto. One of `"auto"`, `"low"`, `"medium"`, `"high"`. |
| `size` | string | no |  | Size. "auto" or WIDTHxHEIGHT such as "1024x1024". Allowed sizes per model are in Get Model. Defaults to auto. |
| `outputFormat` | string | no |  | Output Format. Image file format. Defaults to webp. One of `"webp"`, `"jpeg"`, `"png"`. |

Output fields:

- `data`: Images
- `data[].url`: Image URL (image)
- `data[].revised_prompt`: Revised Prompt
- `created`: Created At (datetime)
- `latency`: Latency (ms) (number)
- `cost`: Cost (currency)

### `image_router_generate_video`

**Generate Video.** Generates a video with the chosen ImageRouter video model from a text prompt and/or one start image (http(s) URL or data URI), waits for it to finish, and returns the hosted video URL (kept 30 days) plus the credits charged. Pick a model whose output_modalities include video from List Models and check its allowed sizes and seconds with Get Model; "ir/test-video" is free. Not idempotent: each call runs and bills a new generation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Video model id, e.g. "ir/test-video". Use List Models with output modality "video" to find ids. |
| `prompt` | string | no |  | Prompt. What the video should show. Most models need one. |
| `image` | string | no |  | Start Image. Optional start image for image-to-video models: an http(s) URL or a data URI. |
| `size` | string | no |  | Size. "auto" or WIDTHxHEIGHT such as "1280x720". Allowed sizes per model are in Get Model (sizes). Defaults to auto. |
| `seconds` | number | no |  | Duration (seconds). Video length in seconds; allowed values per model are in Get Model (seconds). Defaults to the model default. |

Output fields:

- `data`: Videos
- `data[].url`: Video URL (url)
- `created`: Created At (datetime)
- `latency`: Latency (ms) (number)
- `cost`: Cost (currency)

### `image_router_create_chat_completion`

**Create Chat Completion.** Sends an OpenAI-format list of chat messages to the chosen ImageRouter text model and returns the completion: choices (reply text in choices[0].message.content, finish reason, tool calls), token usage and the credits charged. Pick a model whose output_modalities include text from List Models; text models are paid, so check Get Credits first. Use Create Response for the Responses format with a single input. Not idempotent: each call runs and bills a new completion. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Text model id, e.g. "openai/gpt-4o-mini". Use List Models with output modality "text" to find ids. |
| `messages` | JSON | yes |  | Messages. The conversation as a JSON array of {"role", "content"} objects, e.g. [{"role":"system","content":"Be brief."},{"role":"user","content":"Hi"}]. Roles: system, developer, user, assistant, tool. |
| `temperature` | number | no |  | Temperature. Sampling temperature from 0 to 2. Leave empty for the model default. |
| `maxTokens` | number | no |  | Max Tokens. Maximum tokens in the reply. Leave empty for the model default. |
| `additionalParameters` | JSON | no |  | Additional Parameters. Optional JSON object of other OpenAI chat parameters passed to the model as-is, e.g. {"top_p":0.9,"response_format":{"type":"json_object"}}. Model, messages, temperature and max tokens above take precedence. |

Output fields:

- `id`: Completion ID
- `model`: Model
- `created`: Created At (Unix seconds) (number)
- `choices`: Choices
- `choices[].index`: Index (number)
- `choices[].message`: Message
- `choices[].message.role`: Role
- `choices[].message.content`: Reply
- `choices[].message.tool_calls`: Tool Calls
- `choices[].finish_reason`: Finish Reason
- `usage`: Usage
- `usage.prompt_tokens`: Input Tokens (number)
- `usage.completion_tokens`: Output Tokens (number)
- `usage.total_tokens`: Total Tokens (number)
- `usage.cost`: Upstream Cost (currency)
- `cost`: Credits Charged (currency)

### `image_router_create_response`

**Create Response.** Sends a plain-text input, or a JSON array of OpenAI Responses input items (for images or multi-turn input), to the chosen ImageRouter text model and returns the response: output items (the reply text is in output[].content[].text), status, token usage and the credits charged. Pass exactly one of input or inputItems. Text models are paid; check Get Credits first. Use Create Chat Completion for a classic messages list. Not idempotent: each call runs and bills a new response. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Text model id, e.g. "openai/gpt-4o-mini". Use List Models with output modality "text" to find ids. |
| `input` | string | no |  | Input. The prompt as plain text. Use this or Input Items, not both. |
| `inputItems` | JSON | no |  | Input Items. The input as a JSON array of OpenAI Responses input items, e.g. [{"role":"user","content":[{"type":"input_text","text":"Describe this"},{"type":"input_image","image_url":"https://..."}]}]. Use this or Input, not both. |
| `instructions` | string | no |  | Instructions. Optional system-level instructions for the model. |
| `maxOutputTokens` | number | no |  | Max Output Tokens. Maximum tokens in the reply. Leave empty for the model default. |
| `temperature` | number | no |  | Temperature. Sampling temperature from 0 to 2. Leave empty for the model default. |
| `additionalParameters` | JSON | no |  | Additional Parameters. Optional JSON object of other OpenAI Responses parameters passed as-is, e.g. {"top_p":0.9}. The fields above take precedence. |

Output fields:

- `id`: Response ID
- `model`: Model
- `status`: Status
- `created_at`: Created At (Unix seconds) (number)
- `output`: Output
- `output[].type`: Type
- `output[].role`: Role
- `output[].content`: Content
- `output[].content[].type`: Type
- `output[].content[].text`: Text
- `usage`: Usage
- `usage.input_tokens`: Input Tokens (number)
- `usage.output_tokens`: Output Tokens (number)
- `usage.total_tokens`: Total Tokens (number)
- `usage.cost`: Upstream Cost (currency)
- `cost`: Credits Charged (currency)

### `image_router_list_models`

**List Models.** Lists ImageRouter models, filtered by output modality (image, video, text), input modality (e.g. image for editing models, mask for inpainting), provider, free or paid, and name or alias, with each model id, modalities, supported parameters, allowed sizes and durations, and pricing. Use it to pick the model id for Generate Image, Edit Image, Generate Video, Create Chat Completion or Create Response. Returns at most limit models (default 50, max 500) with no paging, so narrow with filters. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `outputModality` | string | no |  | Output Modality. Only models producing this: image, video or text. One of `"image"`, `"video"`, `"text"`. |
| `inputModality` | string | no |  | Input Modality. Only models accepting this input, e.g. image for editing or image-to-video models, mask for inpainting. One of `"image"`, `"mask"`, `"text"`, `"audio"`, `"video"`. |
| `provider` | string | no |  | Provider. Provider name, partial and case-insensitive, e.g. "google" or "openai". |
| `free` | string | no |  | Free. Yes for free models only, No for paid models only. Leave empty for both. One of `"true"`, `"false"`. |
| `name` | string | no |  | Name. Model name or alias, partial and case-insensitive, e.g. "flux". |
| `sort` | string | no |  | Sort. Sort by name, provider, price or date (release date). One of `"name"`, `"provider"`, `"price"`, `"date"`. |
| `limit` | number | no |  | Limit. Maximum models to return, 1 to 500. Defaults to 50. |

Output fields:

- `models`: Models
- `models[].id`: Model ID
- `models[].architecture`: Architecture
- `models[].architecture.input_modalities`: Input Modalities
- `models[].architecture.output_modalities`: Output Modalities
- `models[].created`: Release Date (Unix seconds) (number)
- `models[].supported_parameters`: Supported Parameters
- `models[].parameters`: Allowed Values
- `models[].parameters.size`: Sizes
- `models[].parameters.seconds`: Durations (seconds)
- `models[].context_length`: Context Length (tokens) (number)
- `models[].pricing`: Pricing
- `models[].pricing.min`: Min Price per Generation (currency)
- `models[].pricing.average`: Average Price per Generation (currency)
- `models[].pricing.max`: Max Price per Generation (currency)
- `models[].pricing.prompt`: Price per Input Token
- `models[].pricing.completion`: Price per Output Token
- `models[].pricing.image`: Price per Input Image
- `models[].pricing.request`: Price per Request
- `models[].pricing.input_cache_read`: Price per Cached Input Token
- `models[].pricing.input_cache_write`: Price per Cache Write Token
- `models[].pricing.input_cache_write_1h`: Price per 1h Cache Write Token
- `models[].pricing.web_search`: Price per Web Search
- `models[].pricing.internal_reasoning`: Price per Reasoning Token
- `models[].provider`: Provider
- `count`: Count (number)

### `image_router_get_model`

**Get Model.** Gets one ImageRouter model by exact id (e.g. "openai/gpt-image-2"): its input and output modalities, supported parameters (quality, size, seconds, mask, or OpenAI text parameters), allowed sizes and durations, context length for text models, and pricing. Use it before a generation to choose valid size, quality or seconds values. Ids come from List Models. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelId` | string | yes |  | Model ID. Exact model id, e.g. "openai/gpt-image-2", from List Models. |

Output fields:

- `id`: Model ID
- `architecture`: Architecture
- `architecture.input_modalities`: Input Modalities
- `architecture.output_modalities`: Output Modalities
- `created`: Release Date (Unix seconds) (number)
- `supported_parameters`: Supported Parameters
- `parameters`: Allowed Values
- `parameters.size`: Sizes
- `parameters.seconds`: Durations (seconds)
- `context_length`: Context Length (tokens) (number)
- `pricing`: Pricing
- `pricing.min`: Min Price per Generation (currency)
- `pricing.average`: Average Price per Generation (currency)
- `pricing.max`: Max Price per Generation (currency)
- `pricing.prompt`: Price per Input Token
- `pricing.completion`: Price per Output Token
- `pricing.image`: Price per Input Image
- `pricing.request`: Price per Request
- `pricing.input_cache_read`: Price per Cached Input Token
- `pricing.input_cache_write`: Price per Cache Write Token
- `pricing.input_cache_write_1h`: Price per 1h Cache Write Token
- `pricing.web_search`: Price per Web Search
- `pricing.internal_reasoning`: Price per Reasoning Token
- `aliases`: Aliases

### `image_router_get_credits`

**Get Credits.** Gets the ImageRouter account balance in USD: remaining credits, total usage and total deposits, and optionally a per-API-key breakdown (usage, request count, spend limit and current-period spend). Use it before paid generations to check there are enough credits. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeKeyUsage` | boolean | no | `false` | Include Usage per API Key. Also return usage for each API key on the account. Defaults to off. |

Output fields:

- `remaining_credits`: Remaining Credits (currency)
- `credit_usage`: Credit Usage (currency)
- `total_deposits`: Total Deposits (currency)
- `usage_by_api_key`: Usage by API Key
- `usage_by_api_key[].api_key_id`: API Key ID
- `usage_by_api_key[].api_key_name`: API Key Name
- `usage_by_api_key[].credit_usage`: Credit Usage (currency)
- `usage_by_api_key[].total_requests`: Total Requests (number)
- `usage_by_api_key[].created_at`: Created At (datetime)
- `usage_by_api_key[].is_active`: Active (boolean)
- `usage_by_api_key[].spend_limit`: Spend Limit (currency)
- `usage_by_api_key[].spend_limit_period`: Spend Limit Period
- `usage_by_api_key[].period_spend`: Spend This Period (currency)
- `usage_by_api_key[].period_start`: Period Start (datetime)
- `usage_by_api_key[].expires_at`: Expires At (datetime)

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
