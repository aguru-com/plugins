# Bumpups

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bumpups'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Bumpups API Key

> **Enter your Bumpups API Key.**
> ---
> ### How to obtain your API key
> 1. Sign up or log in at [bumpups.com](https://bumpups.com).
> 2. Go to **Settings** → **API**.
> 3. Enable API access and generate a key.
> 4. Copy and paste it here.

## Actions

### `generateCreatorDescription`

**Generate Creator Description.** Calls the Bumpups AI model on a public YouTube video URL to generate a ready-to-use video description from the video content. Use when an agent needs a written description for a specific YouTube video; the video URL is required and an optional language code controls the output language. Not idempotent — each call invokes the model and may produce different text. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoUrl` | string | yes |  | Video URL. The YouTube video URL. |
| `model` | string | yes | `"bump-1.0"` | Model. One of `"bump-1.0"`. |
| `language` | string | no | `"en"` | Language. One of `"en"`, `"hi"`, `"es"`, `"pt"`, `"ru"`, `"de"`, `"fr"`, `"ja"`, `"ko"`, `"ar"`. |

### `generateCreatorHashtags`

**Generate Creator Hashtags.** Calls the Bumpups AI model on a public YouTube video URL to generate social tags from the video content, with an output-format option to return either hashtags or plain keywords. Use when an agent needs discoverability tags for a specific YouTube video; the video URL is required and an optional language code sets the output language. Not idempotent — each call invokes the model and may produce different tags. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoUrl` | string | yes |  | Video URL. The YouTube video URL. |
| `model` | string | yes | `"bump-1.0"` | Model. One of `"bump-1.0"`. |
| `language` | string | no | `"en"` | Language. One of `"en"`, `"hi"`, `"es"`, `"pt"`, `"ru"`, `"de"`, `"fr"`, `"ja"`, `"ko"`, `"ar"`. |
| `output_format` | string | no | `"text"` | Output Format. One of `"hashtags"`, `"keywords"`. |

### `generateCreatorTakeaways`

**Generate Creator Takeaways.** Calls the Bumpups AI model on a public YouTube video URL to generate key takeaways summarizing the video content, optionally including emojis. Use when an agent needs a bullet-style summary of the main points of a specific YouTube video; the video URL is required and an optional language code sets the output language. Not idempotent — each call invokes the model and may produce different text. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoUrl` | string | yes |  | Video URL. The YouTube video URL. |
| `model` | string | yes | `"bump-1.0"` | Model. One of `"bump-1.0"`. |
| `language` | string | no | `"en"` | Language. One of `"en"`, `"hi"`, `"es"`, `"pt"`, `"ru"`, `"de"`, `"fr"`, `"ja"`, `"ko"`, `"ar"`. |
| `emojis_enabled` | boolean | no | `false` | Include Emojis. Whether to include emojis in the generated takeaways. |

### `generateCreatorTitles`

**Generate Creator Titles.** Calls the Bumpups AI model on a public YouTube video URL to generate engaging title suggestions from the video content. Use when an agent needs candidate titles for a specific YouTube video; the video URL is required and an optional language code sets the output language. Not idempotent — each call invokes the model and may produce different titles. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoUrl` | string | yes |  | Video URL. The YouTube video URL. |
| `model` | string | yes | `"bump-1.0"` | Model. One of `"bump-1.0"`. |
| `language` | string | no | `"en"` | Language. One of `"en"`, `"hi"`, `"es"`, `"pt"`, `"ru"`, `"de"`, `"fr"`, `"ja"`, `"ko"`, `"ar"`. |

### `generateTimestamps`

**Generate Timestamps.** Calls the Bumpups AI model on a public YouTube video URL to generate chapter timestamps from the video content, with a style option for long or short timestamp segments. Use when an agent needs chaptered timestamps for a specific YouTube video; the video URL is required and an optional language code sets the output language. Not idempotent — each call invokes the model and may produce different timestamps. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoUrl` | string | yes |  | Video URL. The YouTube video URL. |
| `model` | string | yes | `"bump-1.0"` | Model. One of `"bump-1.0"`. |
| `language` | string | no | `"en"` | Language. One of `"en"`, `"hi"`, `"es"`, `"pt"`, `"ru"`, `"de"`, `"fr"`, `"ja"`, `"ko"`, `"ar"`. |
| `timestamps_style` | string | no | `"long"` | Timestamps Style. Preferred length of each timestamp. One of `"long"`, `"short"`. |

### `send_chat`

**Send Chat.** Sends a question or instruction about a public YouTube video to the Bumpups chat model and returns its answer grounded in the video content, with an output-format option for plain text or markdown. Use for free-form queries about a specific video (the general-purpose option versus the fixed description/hashtags/takeaways/titles/timestamps actions); the video URL is required, while the prompt is optional and defaults to a summary if omitted (max 500 chars). Not idempotent — each call invokes the model and may produce different responses. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoUrl` | string | yes |  | Video URL. The YouTube video URL. |
| `model` | string | yes | `"bump-1.0"` | Model. One of `"bump-1.0"`. |
| `prompt` | string | no |  | Prompt. Message or query about the video (max 500 chars). If empty, defaults to "summary". |
| `language` | string | no | `"en"` | Language. One of `"en"`, `"hi"`, `"es"`, `"pt"`, `"ru"`, `"de"`, `"fr"`, `"ja"`, `"ko"`, `"ar"`. |
| `output_format` | string | no | `"text"` | Output Format. One of `"text"`, `"markdown"`. |

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
