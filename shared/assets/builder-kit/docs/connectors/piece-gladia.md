# Gladia

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gladia'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Gladia API Key

> Enter your Gladia API Key. You can find it in your Gladia account (https://app.gladia.io/apikeys).

## Actions

### `createTranscription`

**Create Transcription.** Submits a pre-recorded audio or video file (referenced by URL) to Gladia for speech-to-text transcription, then fetches the created job by id. The audio_url must point to a publicly reachable file or a Gladia-hosted upload (use the Upload Audio File action first for local files). Optional flags enable add-ons like language hints, code switching, subtitles, diarization, translation, summarization, sentiment analysis, and sentence detection. Not idempotent: each call starts a new transcription job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audio_url` | string | yes |  | Audio URL. URL to a Gladia file or to an external audio or video file. |
| `languages` | string | no |  | Language. Select the language spoken in the audio for better transcription accuracy. One of `"auto"`, `"af"`, `"am"`, `"ar"`, `"as"`, `"az"`, `"ba"`, `"be"`, `"bg"`, `"bn"`, `"bo"`, `"br"`, `"bs"`, `"ca"`, `"cs"`, `"cy"`, `"da"`, `"de"`, `"el"`, `"en"`, `"es"`, `"et"`, `"eu"`, `"fa"`, `"fi"` and 75 more. |
| `code_switching` | boolean | no | `false` | Enable Code Switching. Enable code switching to handle multiple languages in the audio. |
| `subtitles` | boolean | no | `false` | Enable Subtitles. Enable subtitles generation for this transcription. |
| `subtitles_format` | string | no |  | Subtitles Format. Select the subtitle format(s) for transcription output. A value the product loads from the provider, such as an id; write the value itself. |
| `diarization` | boolean | no | `false` | Enable Diarization. Enable speaker recognition (diarization) for this audio. |
| `translation` | boolean | no | `false` | Enable Translation. Enable translation for this audio. |
| `summarization` | boolean | no | `false` | Enable Summarization. Enable summarization for this audio. |
| `summarization_type` | string | no |  | Summarization Type. Choose the type of summarization to apply. A value the product loads from the provider, such as an id; write the value itself. |
| `sentiment_analysis` | boolean | no | `false` | Enable Sentiment Analysis. Enable sentiment analysis for this audio. |
| `sentences` | boolean | no | `false` | Enable Sentences. Enable sentence detection for this audio. |
| `custom_metadata` | object | no |  | Custom Metadata. Add custom metadata to the transcription job. |

### `uploadAFile`

**Upload Audio File.** Uploads a local audio or video file to Gladia and returns a Gladia-hosted URL that can be passed to the Create Transcription action. Choose this when the source media is a file rather than an already-public URL. Not idempotent: each call uploads a new file and produces a new reference. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audio_file` | file | yes |  | Audio File. The audio or video file to upload. Files are not supported; an action that needs one fails. |

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
