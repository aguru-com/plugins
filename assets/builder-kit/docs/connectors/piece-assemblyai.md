# AssemblyAI

Transcribe and extract data from audio using AssemblyAI's Speech AI.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-assemblyai'
  version: '1.1.10'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can retrieve your AssemblyAI API key within your AssemblyAI [Account Settings](https://www.assemblyai.com/app/account?utm_source=activepieces).

## Actions

### `uploadFile`

**Upload File.** Uploads a local audio or video file to AssemblyAI and returns an upload URL that can be passed to the Transcribe action. Use this when the media is a file (not already a publicly reachable URL) that AssemblyAI must access. Each call uploads a new copy, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Audio File. The File or URL of the audio or video file. Files are not supported; an action that needs one fails. |

### `transcribe`

**Transcribe.** Submits an audio or video file (by URL or prior upload) to AssemblyAI for speech-to-text transcription, optionally with extra speech models like speaker diarization, PII redaction, and sentiment. Can either wait synchronously until the transcript is ready or return immediately and continue via webhook (the wait-until-ready and webhook-URL modes are mutually exclusive). Use this to start a new transcription job; each call creates a new transcript, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audio_url` | string | yes |  | Audio URL. The URL of the audio or video file to transcribe. |
| `language_code` | string | no |  | Language Code. The language of your audio file. Possible values are found in [Supported Languages](https://www.assemblyai.com/docs/concepts/supported-languages). The default value is 'en_us'. One of `"en"`, `"en_au"`, `"en_uk"`, `"en_us"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"nl"`, `"af"`, `"sq"`, `"am"`, `"ar"`, `"hy"`, `"as"`, `"az"`, `"ba"`, `"eu"`, `"be"`, `"bn"`, `"bs"`, `"br"`, `"bg"`, `"my"` and 77 more. |
| `language_detection` | boolean | no | `false` | Language Detection. Enable [Automatic language detection](https://www.assemblyai.com/docs/models/speech-recognition#automatic-language-detection), either true or false. |
| `language_confidence_threshold` | number | no |  | Language Confidence Threshold. The confidence threshold for the automatically detected language. An error will be returned if the language confidence is below this threshold. Defaults to 0. |
| `speech_model` | string | no |  | Speech Model. The speech model to use for the transcription. When `null`, the "best" model is used. One of `"best"`, `"nano"`. |
| `punctuate` | boolean | no | `true` | Punctuate. Enable Automatic Punctuation, can be true or false. |
| `format_text` | boolean | no | `true` | Format Text. Enable Text Formatting, can be true or false. |
| `disfluencies` | boolean | no | `false` | Disfluencies. Transcribe Filler Words, like "umm", in your media file; can be true or false. |
| `dual_channel` | boolean | no | `false` | Dual Channel. Enable [Dual Channel](https://www.assemblyai.com/docs/models/speech-recognition#dual-channel-transcription) transcription, can be true or false. |
| `webhook_url` | string | no |  | Webhook URL. The URL to which we send webhook requests. We sends two different types of webhook requests. One request when a transcript is completed or failed, and one request when the redacted audio is ready if redact_pii_audio is enabled. |
| `webhook_auth_header_name` | string | no |  | Webhook Auth Header Name. The header name to be sent with the transcript completed or failed webhook requests. |
| `webhook_auth_header_value` | string | no |  | Webhook Auth Header Value. The header value to send back with the transcript completed or failed webhook requests for added security. |
| `auto_highlights` | boolean | no | `false` | Key Phrases. Enable Key Phrases, either true or false. |
| `audio_start_from` | number | no |  | Audio Start From. The point in time, in milliseconds, to begin transcribing in your media file. |
| `audio_end_at` | number | no |  | Audio End At. The point in time, in milliseconds, to stop transcribing in your media file. |
| `word_boost` | array | no |  | Word Boost. The list of custom vocabulary to boost transcription probability for. |
| `boost_param` | string | no |  | Word Boost Level. How much to boost specified words. One of `"low"`, `"default"`, `"high"`. |
| `filter_profanity` | boolean | no | `false` | Filter Profanity. Filter profanity from the transcribed text, can be true or false. |
| `redact_pii` | boolean | no | `false` | Redact PII. Redact PII from the transcribed text using the Redact PII model, can be true or false. |
| `redact_pii_audio` | boolean | no | `false` | Redact PII Audio. Generate a copy of the original media file with spoken PII "beeped" out, can be true or false. See [PII redaction](https://www.assemblyai.com/docs/models/pii-redaction) for more details. |
| `redact_pii_audio_quality` | string | no |  | Redact PII Audio Quality. Controls the filetype of the audio created by redact_pii_audio. Currently supports mp3 (default) and wav. See [PII redaction](https://www.assemblyai.com/docs/models/pii-redaction) for more details. One of `"mp3"`, `"wav"`. |
| `redact_pii_policies` | array | no |  | Redact PII Policies. The list of PII Redaction policies to enable. See [PII redaction](https://www.assemblyai.com/docs/models/pii-redaction) for more details. One of `"account_number"`, `"banking_information"`, `"blood_type"`, `"credit_card_cvv"`, `"credit_card_expiration"`, `"credit_card_number"`, `"date"`, `"date_interval"`, `"date_of_birth"`, `"drivers_license"`, `"drug"`, `"duration"`, `"email_address"`, `"event"`, `"filename"`, `"gender_sexuality"`, `"healthcare_number"`, `"injury"`, `"ip_address"`, `"language"`, `"location"`, `"marital_status"`, `"medical_condition"`, `"medical_process"`, `"money_amount"` and 19 more. |
| `redact_pii_sub` | string | no |  | Redact PII Substitution. The replacement logic for detected PII, can be "entity_type" or "hash". See [PII redaction](https://www.assemblyai.com/docs/models/pii-redaction) for more details. One of `"entity_name"`, `"hash"`. |
| `speaker_labels` | boolean | no | `false` | Speaker Labels. Enable [Speaker diarization](https://www.assemblyai.com/docs/models/speaker-diarization), can be true or false. |
| `speakers_expected` | number | no |  | Speakers Expected. Tells the speaker label model how many speakers it should attempt to identify, up to 10. See [Speaker diarization](https://www.assemblyai.com/docs/models/speaker-diarization) for more details. |
| `content_safety` | boolean | no | `false` | Content Moderation. Enable [Content Moderation](https://www.assemblyai.com/docs/models/content-moderation), can be true or false. |
| `content_safety_confidence` | number | no |  | Content Moderation Confidence. The confidence threshold for the Content Moderation model. Values must be between 25 and 100. |
| `iab_categories` | boolean | no | `false` | Topic Detection. Enable [Topic Detection](https://www.assemblyai.com/docs/models/topic-detection), can be true or false. |
| `custom_spelling` | JSON | no |  | Custom Spellings. Customize how words are spelled and formatted using to and from values. Use a JSON array of objects of the following format: ``` [ { "from": ["original", "spelling"], "to": "corrected" } ] ```. |
| `sentiment_analysis` | boolean | no | `false` | Sentiment Analysis. Enable [Sentiment Analysis](https://www.assemblyai.com/docs/models/sentiment-analysis), can be true or false. |
| `auto_chapters` | boolean | no | `false` | Auto Chapters. Enable [Auto Chapters](https://www.assemblyai.com/docs/models/auto-chapters), can be true or false. |
| `entity_detection` | boolean | no | `false` | Entity Detection. Enable [Entity Detection](https://www.assemblyai.com/docs/models/entity-detection), can be true or false. |
| `speech_threshold` | number | no |  | Speech Threshold. Reject audio files that contain less than this fraction of speech. Valid values are in the range [0, 1] inclusive. |
| `summarization` | boolean | no | `false` | Enable Summarization. Enable [Summarization](https://www.assemblyai.com/docs/models/summarization), can be true or false. |
| `summary_model` | string | no |  | Summary Model. The model to summarize the transcript. One of `"informative"`, `"conversational"`, `"catchy"`. |
| `summary_type` | string | no |  | Summary Type. The type of summary. One of `"bullets"`, `"bullets_verbose"`, `"gist"`, `"headline"`, `"paragraph"`. |
| `custom_topics` | boolean | no | `false` | Enable Custom Topics. Enable custom topics, either true or false. |
| `topics` | array | no |  | Custom Topics. The list of custom topics. |
| `wait_until_ready` | boolean | yes | `true` | Wait until transcript is ready. Wait until the transcript status is "completed" or "error" before moving on to the next step. |
| `throw_on_error` | boolean | yes | `true` | Throw if transcript status is error. If the transcript status is "error", throw an error. |

### `getTranscript`

**Get Transcript.** Fetches a single existing transcript by its ID, including its status and transcribed text. Use this to poll or read back a transcript created by the Transcribe action. Requires a valid transcript ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Transcript ID. |

### `getTranscriptSentences`

**Get Transcript Sentences.** Returns the sentence-level segmentation of an existing transcript, identified by its ID, with per-sentence text and timestamps. Use this when you need the transcript broken into sentences rather than the raw text. Requires a valid transcript ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Transcript ID. |

### `getTranscriptParagraphs`

**Get Transcript Paragraphs.** Returns the paragraph-level segmentation of an existing transcript, identified by its ID, with per-paragraph text and timestamps. Use this when you need the transcript grouped into paragraphs rather than the raw text or individual sentences. Requires a valid transcript ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Transcript ID. |

### `getSubtitles`

**Get Transcript Subtitles.** Exports an existing transcript, identified by its ID, as a subtitle file in either SRT or VTT format (selectable). Use this to produce captions from a completed transcript, optionally capping characters per caption. Requires a valid transcript ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Transcript ID. |
| `format` | string | yes | `"srt"` | Subtitles Format. One of `"srt"`, `"vtt"`. |
| `chars_per_caption` | number | no |  | Number of Characters per Caption. The maximum number of characters per caption. |

### `getRedactedAudio`

**Get Transcript Redacted Audio.** Retrieves the PII-redacted audio result for an existing transcript by its ID; if redaction is ready it returns the redacted audio URL and can optionally download the file into Activepieces storage. Use this only for transcripts created with PII audio redaction enabled. Requires a valid transcript ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Transcript ID. |
| `download_file` | boolean | yes | `false` | Download file?. |
| `download_file_name` | string | yes | `"redacted-audio.mp3"` | Download File Name. The desired file name for storing in ActivePieces. Make sure the file extension is correct. |

### `wordSearch`

**Search words in transcript.** Searches an existing transcript, identified by its ID, for one or more keywords and returns where each match occurs (individual words, numbers, or short phrases of up to five tokens). Use this to locate specific terms within a completed transcript. Requires a valid transcript ID and a list of search terms; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Transcript ID. |
| `words` | array | yes |  | Words. Keywords to search for. |

### `listTranscripts`

**List transcripts.** Lists transcripts you have created, newest first, with paging support. Use this to discover transcript IDs or browse past transcription jobs when you do not already have a specific ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum amount of transcripts to retrieve. |
| `status` | string | no |  | Status. Filter by transcript status. One of `"queued"`, `"processing"`, `"completed"`, `"error"`. |
| `created_on` | ISO date-time string | no |  | Created On. Only get transcripts created on this date. |
| `before_id` | string | no |  | Before ID. Get transcripts that were created before this transcript ID. |
| `after_id` | string | no |  | After ID. Get transcripts that were created after this transcript ID. |
| `throttled_only` | boolean | no | `false` | Throttled Only. Only get throttled transcripts, overrides the status filter. |

### `deleteTranscript`

**Delete transcript.** Permanently removes the data of an existing transcript, identified by its ID, and marks it deleted. Use this to purge a transcript's contents; this is a destructive mutation. Requires a valid transcript ID. Repeating the call after deletion does not restore data, but it changes server state on the first successful call, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Transcript ID. |

### `lemurTask`

**Run a Task using LeMUR.** Runs a custom LLM prompt over one or more existing transcripts using AssemblyAI LeMUR, returning the model-generated response. Use this to summarize, answer questions about, or otherwise reason over transcript content with your own prompt. Requires transcript IDs and a prompt; each call invokes the LLM and produces a new request, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Your text to prompt the model to produce a desired output, including any context you want to pass into the model. |
| `transcript_ids` | array | no |  | Transcript IDs. A list of completed transcripts with text. Up to a maximum of 100 files or 100 hours, whichever is lower. Use either transcript_ids or input_text as input into LeMUR. |
| `input_text` | string | no |  | Input Text. Custom formatted transcript data. Maximum size is the context limit of the selected model, which defaults to 100000. Use either transcript_ids or input_text as input into LeMUR. |
| `context` | string | no |  | Context. Context to provide the model. This can be a string or a free-form JSON value. |
| `final_model` | string | no |  | Final Model. The model that is used for the final prompt after compression is performed. One of `"anthropic/claude-3-5-sonnet"`, `"anthropic/claude-3-opus"`, `"anthropic/claude-3-haiku"`, `"anthropic/claude-3-sonnet"`, `"anthropic/claude-2-1"`, `"anthropic/claude-2"`, `"default"`, `"anthropic/claude-instant-1-2"`, `"basic"`, `"assemblyai/mistral-7b"`. |
| `max_output_size` | number | no |  | Maximum Output Size. Max output size in tokens, up to 4000. |
| `temperature` | number | no |  | Temperature. The temperature to use for the model. Higher values result in answers that are more creative, lower values are more conservative. Can be any value between 0.0 and 1.0 inclusive. |

### `getLemurResponse`

**Retrieve LeMUR response.** Fetches a previously generated LeMUR response by its request ID. Use this to read back the result of an earlier LeMUR task without re-running the LLM. Requires a valid LeMUR request ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `request_id` | string | yes |  | LeMUR request ID. The ID of the LeMUR request whose data you want to delete. This would be found in the response of the original request. |

### `purgeLemurRequestData`

**Purge LeMUR request data.** Permanently deletes the data of a previously submitted LeMUR request, identified by its request ID, including the LLM response and any context from the original request. Use this to purge LeMUR data for privacy or compliance; this is a destructive mutation. Requires a valid LeMUR request ID and is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `request_id` | string | yes |  | LeMUR request ID. The ID of the LeMUR request whose data you want to delete. This would be found in the response of the original request. |

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
