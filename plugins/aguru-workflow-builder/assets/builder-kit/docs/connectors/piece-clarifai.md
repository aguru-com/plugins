# Clarifai

AI-powered visual recognition

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clarifai'
  version: '0.4.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: PAT Key

> Follow these instructions to get your Clarifai (Personal Access Token) PAT Key:
> 1. Go to the [security tab](https://clarifai.com/settings/security) in your Clarifai account and generate a new PAT token.
> 2. Copy the PAT token and paste it in the PAT Key field.

## Actions

### `ask-llm`

**Ask LLM.** Sends a text prompt to a Clarifai-hosted LLM (e.g. GPT-4) and returns the generated text completion. Use to generate or transform text via Clarifai rather than calling the provider directly; supply the Clarifai model id (looked up by name) and the prompt. Generative and non-deterministic, so repeated calls may return different text. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `models` | string | yes | `"GPT-4"` | Model Id. The model which will generate the response. If the model is not listed, get the model id from the clarifai website. Example : 'GPT-4' you can get the model id from here [https://clarifai.com/openai/chat-completion/models/GPT-4](https://clarifai.com/openai/chat-completion/models/GPT-4) A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The prompt to send to the model. |

### `generate-igm`

**Ask IGM.** Generates an image from a text prompt using a Clarifai text-to-image model (e.g. DALL-E mini) and returns it as a written file. Use when an agent needs to create a picture from a description; supply the Clarifai model id (looked up by name) and the prompt. Generative, so each call produces a new image. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `models` | string | yes | `"general-image-generator-dalle-mini"` | Model Id. The model which will generate the response. If the model is not listed, get the model id from the clarifai website. Example : 'GPT-4' you can get the model id from here [https://clarifai.com/openai/chat-completion/models/GPT-4](https://clarifai.com/openai/chat-completion/models/GPT-4) A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The prompt to send to the model. |

### `visual_classifier_model`

**Classify Images or Videos.** Runs an image or video through a Clarifai visual classification model and returns the recognized concepts with confidence scores. Use to tag, categorize, or detect content in visual media; supply the model URL and the file as a URL or base64 bytes. Read-only inference, safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelUrl` | string | yes |  | Model URL. URL of the Clarifai model. For example https://clarifai.com/clarifai/main/models/general-image-recognition OR a specific version such as https://clarifai.com/clarifai/main/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40. Find more models at https://clarifai.com/explore/mo… |
| `file` | file | yes |  | Input URL or bytes. URL or base64 bytes of the image or video to classify. Files are not supported; an action that needs one fails. |

### `text_classifier_model`

**Classify Text.** Runs input text through a Clarifai text classification model and returns the recognized concepts with confidence scores (e.g. sentiment or topic labels). Use to categorize or score text; supply the model URL and the text. Read-only inference, safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelUrl` | string | yes |  | Model URL. URL of the Clarifai model. For example https://clarifai.com/clarifai/main/models/general-image-recognition OR a specific version such as https://clarifai.com/clarifai/main/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40. Find more models at https://clarifai.com/explore/mo… |
| `txt` | string | yes |  | Input Text. Text to classify. |

### `image_text_model`

**Image to Text.** Runs an image through a Clarifai image-to-text model and returns the generated text (e.g. a caption or description). Use to describe or extract text from an image; supply the model URL and the file as a URL or base64 bytes. Read-only inference, safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelUrl` | string | yes |  | Model URL. URL of the Clarifai model. For example https://clarifai.com/clarifai/main/models/general-image-recognition OR a specific version such as https://clarifai.com/clarifai/main/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40. Find more models at https://clarifai.com/explore/mo… |
| `file` | file | yes |  | Input URL or bytes. URL or base64 bytes of the image to classify. Files are not supported; an action that needs one fails. |

### `text_text_model`

**Text to Text.** Runs input text through a Clarifai text-to-text model and returns the generated text (e.g. translation, summarization, or rewriting). Use to transform text via a specific Clarifai model; supply the model URL and the input text. Generative, so repeated calls may return different output. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelUrl` | string | yes |  | Model URL. URL of the Clarifai model. For example https://clarifai.com/clarifai/main/models/general-image-recognition OR a specific version such as https://clarifai.com/clarifai/main/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40. Find more models at https://clarifai.com/explore/mo… |
| `txt` | string | yes |  | Input Text. Text to classify. |

### `audio_text_model`

**Audio to Text.** Runs an audio file through a Clarifai audio-to-text model and returns the transcribed text. Use to transcribe speech or audio; supply the model URL and the file as a URL or base64 bytes. Read-only inference, safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelUrl` | string | yes |  | Model URL. URL of the Clarifai model. For example https://clarifai.com/clarifai/main/models/general-image-recognition OR a specific version such as https://clarifai.com/clarifai/main/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40. Find more models at https://clarifai.com/explore/mo… |
| `file` | file | yes |  | Input URL or bytes. URL or base64 bytes of the audio to classify. Files are not supported; an action that needs one fails. |

### `post_inputs`

**Add Inputs.** Uploads a file (image, video, audio, or text) as a new input into a specific Clarifai app, where it is stored for indexing, search, or training. Use to add data to a Clarifai dataset; requires the target user ID, app ID, and the file as a URL or base64 bytes. Each call appends a new input, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. User ID to associate with the input. |
| `appId` | string | yes |  | App ID. App ID (project) to associate with the input. |
| `file` | file | yes |  | Input URL or bytes. URL or base64 bytes of the audio to classify. Files are not supported; an action that needs one fails. |

### `workflow_predict`

**Run Workflow.** Runs a single input (image, video, text, or audio) through a multi-model Clarifai workflow and returns the per-model results. Use to apply a chained pipeline of Clarifai models in one call; supply the workflow URL and a file as a URL or base64 bytes, matching the data type the workflow expects. Read-only prediction that stores nothing, so repeating the call yields the same results. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowUrl` | string | yes |  | Workflow URL. URL of the Clarifai workflow. For example https://clarifai.com/clarifai/main/workflows/Demographics. Find more workflows at https://clarifai.com/explore/workflows. |
| `file` | file | yes |  | Input URL or bytes. URL or base64 bytes of the incoming image/video/text/audio to run through the workflow. Note: must be appropriate first step of the workflow to handle that data type. Files are not supported; an action that needs one fails. |

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
