# GreenPT

GreenPT is a green AI and privacy friendly GPT-powered chat platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-greenpt'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API Key for Greenpt

## Actions

### `chatCompletion`

**Ask GreenPT.** Sends one user message to a GreenPT chat model (green-l, green-r, or their raw variants) and returns the generated reply as plain text, carrying a single user turn only with no system prompt or conversation history. Choose this for text generation or question answering on GreenPT; use Create Embeddings for vector output and Transcribe Audio for speech-to-text. Not idempotent: each call runs a fresh, non-deterministic completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The model to use. One of `"green-l"`, `"green-l-raw"`, `"green-r"`, `"green-r-raw"`. |
| `messages` | string | yes |  | Message. Message to send. |

### `createEmbeddings`

**Create Embeddings.** Converts text into embedding vectors with GreenPT's fixed green-embedding model, returned as floats or base64; newline-separated input is split so each non-empty line is embedded as its own vector, while single-line input embeds one string. Use for semantic search, clustering, or similarity scoring, rather than Ask GreenPT which returns generated text. Idempotent: no resource is created and the same text with the same encoding format yields the same vectors. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `input` | string | yes |  | Input Text. Input text to embed. Can be a single string or multiple texts separated by newlines. |
| `encoding_format` | string | no | `"float"` | Encoding Format. The format to return the embeddings in. One of `"float"`, `"base64"`. |

### `transcribeAudio`

**Transcribe Audio.** Transcribes a pre-recorded audio file with a GreenPT speech-to-text model (green-s or green-s-pro), with optional speaker diarization, punctuation, smart formatting, filler words, numeral conversion, and sentiment, topic, or intent analysis. Requires the audio as a file input, supplied either as base64 data or as a URL the engine fetches, language is auto-detected unless a code is supplied, and only the plain transcript text is returned. Use this for speech input; use Ask GreenPT for text generation. Read-only inference and idempotent: nothing is created and the same file with the same options yields the same transcript. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audioUrl` | file | yes |  | Audio File. Audio file to transcribe (WAV, MP3, FLAC, etc.) Files are not supported; an action that needs one fails. |
| `model` | string | no | `"green-s"` | Model. Speech-to-text model to use. One of `"green-s"`, `"green-s-pro"`. |
| `language` | string | no |  | Language. Language code (e.g., en, fr, de). Auto-detected if not specified. |
| `diarize` | boolean | no | `false` | Speaker Diarization. Enable speaker diarization to identify different speakers. |
| `punctuate` | boolean | no | `true` | Punctuate. Add punctuation and capitalization to transcript. |
| `smart_format` | boolean | no | `false` | Smart Format. Apply formatting to transcript output for improved readability. |
| `filler_words` | boolean | no | `false` | Include Filler Words. Include filler words like "uh" and "um" in transcript. |
| `numerals` | boolean | no | `false` | Convert Numerals. Convert numbers from written format to numerical format. |
| `sentiment` | boolean | no | `false` | Analyze Sentiment. Analyze sentiment throughout the transcript. |
| `topics` | boolean | no | `false` | Detect Topics. Detect topics throughout the transcript. |
| `intents` | boolean | no | `false` | Recognize Intents. Recognize speaker intent throughout the transcript. |

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
