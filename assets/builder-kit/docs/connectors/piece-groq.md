# Groq

Use Groq's fast language models and audio processing capabilities.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-groq'
  version: '0.4.2'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Open [console.groq.com/keys](https://console.groq.com/keys).
> 2. Click **Create API Key**, name it, and copy it.

## Actions

### `ask-ai`

**Ask AI.** Sends a prompt to a Groq-hosted chat model (Whisper speech models are excluded from the model list) and returns the generated text, with optional sampling controls and a roles array for system instructions. Runs stateless by default, or shares conversation history across runs and flows when a memory key is set. This is the only text-generation action in the piece - pick the sibling Transcribe Audio or Translate Audio actions when the input is a sound file rather than text. Requires a model, a question, and a maximum token count; not idempotent: each call produces a fresh completion and, when a memory key is set, appends to the stored project-scoped history. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"llama-3.1-70b-versatile"` | Model. Speech models are left out; use the audio actions for them. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Question. What you want the model to answer or do. |
| `temperature` | number | no | `0.9` | Temperature. From 0 to 2. Lower is more focused, higher is more varied. |
| `maxTokens` | number | yes | `2048` | Maximum Tokens. Longest reply in tokens, about 4 characters each. |
| `topP` | number | no | `1` | Top P. From 0 to 1. Adjust this or Temperature, not both. |
| `frequencyPenalty` | number | no | `0` | Frequency Penalty. From -2 to 2. Groq models do not support this yet. |
| `presencePenalty` | number | no | `0.6` | Presence Penalty. From -2 to 2. Groq models do not support this yet. |
| `memoryKey` | string | no |  | Conversation Memory ID. Runs that share this ID continue one conversation. Empty: no memory. |
| `roles` | JSON | no | `[{"role":"system","content":"You are a helpful assistant."}]` | Roles. Messages sent before the question, such as a system instruction. |

Output fields:

- `[].Content`: Content

### `transcribe-audio`

**Transcribe Audio.** Runs Groq speech-to-text (Whisper) over an uploaded audio file and returns the spoken content transcribed in its original language; a response-format prop switches between plain text, JSON, and verbose JSON with segment timings. Choose this over the sibling Translate Audio action whenever the transcript must stay in the language that was spoken, since Translate Audio always renders English. Requires an audio file (flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm) and a Whisper model, with an optional ISO-639-1 language hint that improves accuracy; not idempotent: each call re-runs the model and may return slightly different text. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Audio File. flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav or webm. Files are not supported; an action that needs one fails. |
| `model` | string | yes | `"whisper-large-v3"` | Model. whisper-large-v3 is the most accurate; turbo is faster. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. ISO-639-1 code of the spoken language, for better accuracy. |
| `prompt` | string | no |  | Prompt. Spellings or text that came just before, in the audio's language. |
| `temperature` | number | no | `0` | Temperature. From 0 to 1. Groq recommends 0. |
| `responseFormat` | string | no | `"json"` | Response Format. Text returns the words alone; Verbose JSON adds segment timings. One of `"json"`, `"text"`, `"verbose_json"`. |

Output fields:

- `text`: Transcribed Text
- `x_groq.id`: Request ID

### `translate-audio`

**Translate Audio.** Runs Groq speech-to-text (Whisper) over an uploaded audio file and returns the spoken content as English text, translating from whatever language was spoken; a response-format prop switches between plain text, JSON, and verbose JSON with segment timings. Pick this only when English output is wanted - the target language cannot be changed, and the sibling Transcribe Audio action keeps the transcript in the original spoken language. Requires an audio file (flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm) and a Whisper model; not idempotent: each call re-runs the model and may return slightly different text. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Audio File. flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav or webm. Files are not supported; an action that needs one fails. |
| `model` | string | yes | `"whisper-large-v3"` | Model. Use whisper-large-v3; the turbo model cannot translate. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | no |  | Prompt. Spellings or earlier text in English to guide the translation. |
| `temperature` | number | no | `0` | Temperature. From 0 to 1. Groq recommends 0. |
| `responseFormat` | string | no | `"json"` | Response Format. Text returns the words alone; Verbose JSON adds segment timings. One of `"json"`, `"text"`, `"verbose_json"`. |

Output fields:

- `text`: Translated Text

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
