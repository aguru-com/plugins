# Google Vertex AI

Generate content and images using Gemini and Imagen models on Google Vertex AI.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-vertexai'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To authenticate with Google Vertex AI using a Service Account:
> 1. Go to [Google Cloud Console](https://console.cloud.google.com).
> 2. Create a new project or select an existing one.
> 3. Enable the **Vertex AI API** under *APIs & Services > Enabled APIs*.
> 4. Create a Service Account:
> - Go to **IAM & Admin > Service Accounts**.
> - Click **Create Service Account**, fill in the details and click **Create**.
> - Grant the **Vertex AI User** role.
> 5. Create a JSON key:
> - Click on the created service account.
> - Go to the **Keys** tab.
> - Click **Add Key > Create new key**, choose **JSON** and click **Create**.
> - The JSON key file will be downloaded automatically.
> 6. Copy the **entire contents** of the downloaded JSON file and paste it below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serviceAccountJson` | string | yes |  | Service Account JSON. The complete JSON content from your Google Service Account key file. |

## Actions

### `generate_content`

**Generate Content.** Sends a prompt (with optional system instruction) to a Gemini model on Google Vertex AI and returns the generated text. Multimodal: you can attach files, public image URLs, or a YouTube video URL for the model to analyze alongside the prompt. Use for free-form text generation, summarization, extraction, or analysis of supplied media. Requires a Vertex AI service-account credential and a region/model selection. Not idempotent — each call is a fresh generation and output varies (especially with non-zero temperature). Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes | `"us-central1"` | Location. Google Cloud region where your Vertex AI resources are hosted. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | yes | `"gemini-2.5-flash"` | Model. Gemini model to use for content generation. A value the product loads from the provider, such as an id; write the value itself. |
| `systemMessage` | string | no |  | System Message. Instructions that guide the model's behavior throughout the conversation. |
| `userMessage` | string | yes |  | User Message. The prompt to send to the model. |
| `files` | array | no |  | Files. Optional files to include in the prompt (images, PDFs, text, audio, video) Each item: { `file` }. |
| `youtubeUrl` | string | no |  | YouTube URL. Optional public YouTube video URL for the AI to use as a reference. |
| `imageUrls` | array | no |  | Image URLs. Public image URLs to include alongside the user message. The model will analyze these images. |
| `temperature` | number | no |  | Temperature. Controls randomness. Lower values are more deterministic (0–2). Leave empty to use the model default. |
| `maxOutputTokens` | number | no |  | Max Output Tokens. Maximum number of tokens to generate. Leave empty to use the model default. |
| `thinkingLevel` | string | no |  | Thinking Level. Controls how much the model thinks before responding. Supported on Gemini 2.5 and later models. One of `"LOW"`, `"MEDIUM"`, `"HIGH"`. |
| `thinkingBudget` | number | no |  | Thinking Budget (tokens). Maximum number of tokens the model can use for internal reasoning. Set to 0 to disable thinking. Supported on Gemini 2.5 and later models. |
| `includeThoughts` | boolean | no | `false` | Include Thoughts in Response. When enabled, the model's reasoning is returned alongside the final response. Supported on Gemini 2.5 and later models. |

### `generate_image`

**Generate Image.** Generates one or more images from a text prompt on Google Vertex AI, returning them as files. The selected model determines the path: Gemini image models support image-to-image editing from a supplied input image and a configurable aspect ratio, while Imagen models support a negative prompt, person-generation safety controls, output format, seed, and prompt enhancement. Use to create or edit images from a description. Requires a Vertex AI service-account credential and a region/model selection. Not idempotent — each call produces fresh, varying output. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes | `"us-central1"` | Location. Google Cloud region where your Vertex AI resources are hosted. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | yes |  | Model. Model to use for image generation. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. A text description of the image you want to generate. |
| `modelOptions` | object | yes |  | Model Configurations. An object whose fields depend on other inputs; the product shows them. |

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
