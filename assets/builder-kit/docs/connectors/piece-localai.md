# LocalAI

The free, Self-hosted, community-driven and local-first. Drop-in replacement for OpenAI running on consumer-grade hardware. No GPU required.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-localai'
  version: '0.3.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Server URL. The address of your LocalAI server, for example http://localhost:8080/v1. It must be reachable from Activepieces. |
| `access_token` | string | no |  | Access Token. One of the API keys your server was started with (--api-keys or API_KEY). Leave empty if the server has no keys. |

## Actions

### `ask_localai`

**Ask LocalAI.** Sends a prompt to a chat model running on your own self-hosted LocalAI server, through the OpenAI-compatible chat completions endpoint at the server URL stored on the connection, with optional sampling controls and a roles array for system or assistant priming, and returns the reply as plain text. It keeps no conversation memory, so every call is stateless. Pick it only when inference must stay on your own LocalAI instance rather than a cloud provider such as OpenAI, Groq, or DeepSeek. Requires a question and a model id installed on that instance: call list_models first when unsure which ids exist. Use create_embedding for vectors, text_to_speech or transcribe_audio for audio, and the Custom API Call action for other LocalAI endpoints. Not idempotent: each call produces a fresh completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The chat model on your LocalAI server that will write the answer. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Question. |
| `temperature` | number | no |  | Temperature. Higher is more random, lower is more focused. Defaults to 0.9. |
| `maxTokens` | number | no |  | Maximum Tokens. Longest answer to generate, in tokens. Defaults to 2048. |
| `topP` | number | no |  | Top P. Nucleus sampling, from 0 to 1. Defaults to 1. |
| `frequencyPenalty` | number | no |  | Frequency penalty. From -2 to 2. Higher repeats lines less. Defaults to 0. |
| `presencePenalty` | number | no |  | Presence penalty. From -2 to 2. Higher moves to new topics. Defaults to 0.6. |
| `roles` | JSON | no | `[{"role":"system","content":"You are a helpful assistant."}]` | Roles. Messages sent before the question, each with a role and content. |

### `list_models`

**List Models.** Returns the ids of the models installed on the connected self-hosted LocalAI server, optionally only those whose id contains a case-insensitive text such as llama, embed, or whisper. The list covers every kind of model the server has (chat, embedding, speech, transcription) and LocalAI does not say which is which, so pick by name. Use it to confirm a model id exists before calling ask_localai, create_embedding, text_to_speech, or transcribe_audio. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contains` | string | no |  | Name Contains. Only return models whose id includes this text. |

Output fields:

- `count`: Count (number)
- `models`: Models
- `models[].id`: Model ID

### `create_embedding`

**Create Embedding.** Converts one block of text into a numeric embedding vector with an embedding model installed on the connected self-hosted LocalAI server, for storing in a vector database or for semantic search, clustering, and RAG, without the text leaving your infrastructure. The model must be an embedding model (for example mxbai-embed-large or nomic-embed), not a chat model: call list_models when unsure. Returns the vector and its length; one input per call, so loop to embed several texts. Deterministic for the same model and text, so repeat calls are idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. An embedding model installed on your LocalAI server. A value the product loads from the provider, such as an id; write the value itself. |
| `input` | string | yes |  | Text. The text to turn into a vector. |

Output fields:

- `model`: Model
- `dimensions`: Dimensions (number)
- `embedding`: Embedding

### `text_to_speech`

**Text to Speech.** Converts text into a spoken audio file with a text-to-speech model installed on the connected self-hosted LocalAI server (for example a piper, kokoro, or bark voice), and saves it as a file in the flow, returning the file reference, name, format, and size. The model must be a speech model, not a chat model: call list_models when unsure. Voice is optional and model-specific, and only some backends honor the output format, so WAV is the safe choice. Each call writes a new file, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. A text-to-speech model installed on your LocalAI server. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. The text to read aloud. |
| `voice` | string | no |  | Voice. For models with several voices. Empty uses the default. |
| `format` | string | yes | `"wav"` | Audio Format. Not every LocalAI backend supports every format. One of `"wav"`, `"mp3"`, `"ogg"`, `"flac"`. |
| `fileName` | string | no | `"speech"` | File Name. Name for the audio file, without the extension. |

Output fields:

- `file`: Audio File (url)
- `file_name`: File Name
- `format`: Format
- `size_bytes`: Size (filesize)
- `model`: Model

### `transcribe_audio`

**Transcribe Audio.** Transcribes the speech in an audio file into text with a speech-recognition model installed on the connected self-hosted LocalAI server (for example a whisper model), so the audio never leaves your infrastructure. Takes a file from an earlier step (wav, mp3, ogg, m4a and other formats ffmpeg can read) and an optional language hint, and returns the full text plus timed segments. The model must be a transcription model, not a chat model: call list_models when unsure. Read-only; repeat calls on the same file return the same text. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. A speech-recognition model (for example whisper) installed on your LocalAI server. A value the product loads from the provider, such as an id; write the value itself. |
| `audio` | file | yes |  | Audio. The recording to transcribe. Files are not supported; an action that needs one fails. |
| `language` | string | no |  | Language. Language code of the speech. Empty auto-detects. |

Output fields:

- `text`: Text
- `duration`: Duration (Seconds) (number)
- `segments`: Segments
- `segments[].id`: ID (number)
- `segments[].start`: Start (Seconds) (number)
- `segments[].end`: End (Seconds) (number)
- `segments[].text`: Text

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
