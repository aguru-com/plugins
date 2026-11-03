# Murf AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-murf-api'
  version: '0.2.2'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your API key from https://murf.ai

## Actions

### `list-voices`

**List Voices.** Retrieves the catalog of Murf text-to-speech voices, optionally narrowing the result to a given locale and/or voice style; leave both filters empty to fetch every available voice. Use this to discover a valid voiceId (and its supported locales/styles) before calling Text to Speech or Voice Changer. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `locale` | string | yes |  | Language. Select your preferred language for the translated output. A value the product loads from the provider, such as an id; write the value itself. |
| `style` | string | no |  | Style. Filter by style (optional) A value the product loads from the provider, such as an id; write the value itself. |

### `translateText`

**Translate Text.** Translates one or more text strings into a target language using Murf. Choose it when you need translated text (often as a precursor to generating multilingual speech). Requires the target language code and at least one input string. Each call issues a fresh translation request and is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `targetLanguage` | string | yes |  | Language. Select your preferred language for the translated output. A value the product loads from the provider, such as an id; write the value itself. |
| `texts` | array | yes |  | Texts. List of texts to translate. |

### `voice-changer-convert`

**Voice Changer.** Re-renders an existing audio recording in a different Murf voice. Supply the source audio either as a publicly accessible URL or as an uploaded file (provide exactly one, not both) along with the target voiceId. Use it to change the speaker of existing audio rather than synthesizing from text. Each call generates new audio and is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `language` | string | yes |  | Language. Select your preferred language for the translated output. A value the product loads from the provider, such as an id; write the value itself. |
| `voiceId` | string | yes |  | Voice. Choose a voice for converting text into speech. A value the product loads from the provider, such as an id; write the value itself. |
| `fileUrl` | string | no |  | File URL. Publicly accessible URL of the input audio file. Either provide this or upload a file. |
| `file` | file | no |  | Upload File. Upload an audio file for voice conversion. Files are not supported; an action that needs one fails. |
| `format` | string | no |  | Output Format. Format of the generated audio file. One of `"MP3"`, `"WAV"`, `"FLAC"`, `"OGG"`. |
| `channelType` | string | no |  | Channel Type. Choose MONO or STEREO output. One of `"MONO"`, `"STEREO"`. |
| `pitch` | number | no |  | Pitch. Pitch adjustment (-50 to 50) |
| `rate` | number | no |  | Rate. Speed adjustment (-50 to 50) |
| `encodeOutputAsBase64` | boolean | no |  | Encode Output as Base64. Receive audio directly as Base64 instead of a file URL. |

### `text_to_speech`

**Text to Speech.** Synthesizes spoken audio from input text using a chosen Murf voice. Choose it to generate narration or voiceovers from text; requires the text and a valid voiceId (use List Voices to find one). Returns audio as a URL or, when Base64 encoding is enabled, inline. Each call generates fresh audio and is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `language` | string | yes |  | Language. Select your preferred language for the translated output. A value the product loads from the provider, such as an id; write the value itself. |
| `voiceId` | string | yes |  | Voice. Choose a voice for converting text into speech. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. The text to be synthesized. |
| `audioDuration` | number | no |  | Audio Duration (seconds). Specify audio length. If 0, Murf ignores this. Only for Gen2 model. |
| `channelType` | string | no |  | Channel Type. Mono or Stereo output. One of `"MONO"`, `"STEREO"`. |
| `encodeAsBase64` | boolean | no |  | Encode as Base64. Return Base64 encoded audio instead of URL (zero retention). |
| `format` | string | no |  | Audio Format. Select audio format. One of `"MP3"`, `"WAV"`, `"FLAC"`, `"ALAW"`, `"ULAW"`, `"PCM"`, `"OGG"`. |
| `modelVersion` | string | no |  | Model Version. Choose Gen1 or Gen2. One of `"GEN1"`, `"GEN2"`. |
| `multiNativeLocale` | string | no |  | Multi Native Locale. Set multi-language voice (e.g., en-US, es-ES). Only for Gen2. |
| `pitch` | number | no |  | Pitch. Pitch adjustment (-50 to 50). |
| `rate` | number | no |  | Rate. Speed adjustment (-50 to 50). |
| `style` | string | no |  | Style. Voice style (e.g., 'default', 'calm', 'energetic'). Check voice details. |
| `sampleRate` | number | no |  | Sample Rate. Defaults to 44100. Allowed: 8000, 24000, 44100, 48000. |
| `variation` | number | no |  | Variation. Variation level (0–5). Defaults to 1. Higher = more natural pauses/pitch/speed. |
| `wordDurationsAsOriginalText` | boolean | no |  | Word Durations as Original Text. If true, response word timings map to original text. (English only). |
| `pronunciationDictionary` | JSON | no |  | Pronunciation Dictionary. Custom word pronunciations. |

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
