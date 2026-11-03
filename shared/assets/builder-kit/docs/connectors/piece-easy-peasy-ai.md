# Easy-Peasy.AI

Create professional-quality music in any genre with just a text prompt. From hip-hop to classical, our AI generates custom tracks for your projects in seconds.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-easy-peasy-ai'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Easy Peasy AI API Key. Get it from [Easy Peasy AI Settings](https://easy-peasy.ai/settings) - Navigate to the **API** tab from the top bar

## Actions

### `customGeneratorText`

**Custom Generator (Text).** Generate freeform text from keywords/instructions via Easy-Peasy.AI's custom-generator preset. Choose this for open-ended copy or content generation where no purpose-specific template fits; supply the prompt in Keywords, optionally set language, output count, and a GPT-4 toggle. Each call produces fresh generated text, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keywords` | string | yes |  | Keywords. What do you want to generate? (max 1000 characters) |
| `extra1` | string | no |  | Background Information. Additional context or background information (optional, max 1000 characters) |
| `outputs` | number | no | `1` | Number of Outputs. How many outputs to generate (default: 1) |
| `language` | string | no | `"English"` | Language. Language for the generated text (default: English) One of `"English"`, `"Spanish"`, `"French"`, `"German"`, `"Italian"`, `"Portuguese"`, `"Dutch"`, `"Russian"`, `"Chinese"`, `"Japanese"`, `"Korean"`, `"Hindi"`, `"Arabic"`. |
| `shouldUseGPT4` | boolean | no | `false` | Use GPT-4. Use GPT-4 model for generation (may incur higher costs) |

### `generateAiImage`

**Generate AI Image.** Generate an image from a text prompt via Easy-Peasy.AI, selecting the generation model (DALL-E 3/2, Midjourney, or Stable Diffusion) and optionally style, artist inspiration, dimensions, HD quality, and a reference image URL. Choose this to produce visual content from a description; the prompt and model are required. Each call creates a new image, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Description of the image you want to generate. |
| `model` | string | yes |  | Model. AI model to use for image generation. One of `"DALL-E 3"`, `"DALL-E 2"`, `"Midjourney"`, `"Stable Diffusion"`. |
| `style` | string | no |  | Style. Art style or aesthetic for the generated image (e.g., "oil painting", "watercolor", "cyberpunk") |
| `artist` | string | no |  | Artist Inspiration. Art style inspired by a specific artist (e.g., "Van Gogh", "Picasso") |
| `dimensions` | string | no | `"1024x1024"` | Dimensions. Image dimensions/aspect ratio. One of `"1024x1024"`, `"1024x1792"`, `"1792x1024"`, `"512x512"`, `"256x256"`. |
| `useHD` | boolean | no | `true` | Use HD Quality. Generate image in HD quality (may incur higher costs) |
| `image` | string | no |  | Image Reference URL. Optional URL to a reference image for style consistency. |

### `getAiTranscription`

**Get AI Transcription.** Submit an audio file (by URL) to Easy-Peasy.AI for transcription, with optional speaker detection and enhanced-quality processing. Choose this to convert podcasts, interviews, meetings, lectures, or other recordings into text; the audio URL, a name, and an audio type are required. Each call creates a new transcription, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Audio File URL. URL to the audio file to transcribe. |
| `name` | string | yes |  | Transcription Name. Name or title for this transcription. |
| `audio_type` | string | yes |  | Audio Type. Type of audio content being transcribed. One of `"podcast"`, `"interview"`, `"meeting"`, `"lecture"`, `"presentation"`, `"other"`. |
| `language` | string | no | `"English"` | Language. Language of the audio content. One of `"English"`, `"Spanish"`, `"French"`, `"German"`, `"Italian"`, `"Portuguese"`, `"Dutch"`, `"Russian"`, `"Chinese"`, `"Japanese"`, `"Korean"`, `"Hindi"`, `"Arabic"`. |
| `detect_speakers` | boolean | no | `true` | Detect Speakers. Automatically detect and identify different speakers in the audio. |
| `enhanced_quality` | boolean | no | `true` | Enhanced Quality. Use enhanced quality processing for better transcription accuracy. |

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
