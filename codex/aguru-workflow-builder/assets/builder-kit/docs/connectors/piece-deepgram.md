# Deepgram

Deepgram is an AI-powered speech recognition platform that provides real-time transcription, text-to-speech, and audio analysis capabilities.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-deepgram'
  version: '0.3.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from [Deepgram Console](https://console.deepgram.com/).

## Actions

### `transcribe_audio`

**Transcribe Audio.** Transcribes speech from a public audio/video URL or an uploaded file with Deepgram and returns the full transcript, optionally with speaker labels, paragraphs, detected language, entities and an English-only summary, topics, intents and sentiment. Use for recordings that finish processing within about 8 minutes; for very long files use Create Transcription (Callback). Each call is billed per audio minute, so retries are billed again. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audioUrl` | string | no |  | Audio URL. A public link to the audio or video file. Deepgram downloads it directly. Use this or Audio File. |
| `audioFile` | file | no |  | Audio File. The audio or video file to transcribe. Use this or Audio URL. Files are not supported; an action that needs one fails. |
| `model` | string | no |  | Model. Leave empty for nova-3, Deepgram's recommended model for most languages. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. Spoken language as a BCP-47 code, for example en, es, fr-CA or multi (several languages in one recording, nova-3 only). Leave empty for English, or turn on Detect Language. |
| `detectLanguage` | boolean | no | `false` | Detect Language. Let Deepgram detect the main spoken language. Ignores Language. |
| `smartFormat` | boolean | no | `true` | Smart Format. Add punctuation, capitals and readable numbers, dates and currency. |
| `diarize` | boolean | no | `false` | Identify Speakers. Label who speaks when and return a transcript split by speaker. |
| `paragraphs` | boolean | no | `false` | Paragraphs. Also return the transcript split into paragraphs. |
| `utterances` | boolean | no | `false` | Utterances. Also return the transcript as timed segments (sentences or speaker turns). |
| `multichannel` | boolean | no | `false` | Transcribe Each Channel Separately. For stereo recordings with one speaker per channel, such as call recordings. Billed per channel. |
| `keyterms` | array | no |  | Key Terms. Names, brands or jargon to recognize more reliably (nova-3 models only). Up to 100 terms. |
| `redact` | array | no |  | Redact. Replace sensitive information in the transcript. Billed as an add-on. One of `"pci"`, `"pii"`, `"phi"`, `"numbers"`. |
| `detectEntities` | boolean | no | `false` | Detect Entities. Return names, organizations, places, numbers and other entities found in the speech. |
| `summarize` | boolean | no | `false` | Summarize (English). Return a short summary. English audio only; needs more than about 50 spoken words. |
| `topics` | boolean | no | `false` | Detect Topics (English). |
| `intents` | boolean | no | `false` | Detect Intents (English). |
| `sentiment` | boolean | no | `false` | Analyze Sentiment (English). |
| `includeWords` | boolean | no | `false` | Include Word Timings. Return every word with its start and end time. Makes the output much larger. |
| `tags` | array | no |  | Tags. Labels for this request that show up in Deepgram usage reports. |

Output fields:

- `request_id`: Request ID
- `transcript`: Transcript
- `confidence`: Confidence (number)
- `duration_seconds`: Duration (seconds) (number)
- `detected_language`: Detected Language
- `language_confidence`: Language Confidence (number)
- `model_name`: Model
- `model_version`: Model Version
- `channel_count`: Channels (number)
- `paragraphs_text`: Transcript with Paragraphs
- `speaker_count`: Speakers (number)
- `speaker_transcript`: Transcript by Speaker
- `summary`: Summary
- `topics`: Topics
- `topics[].topic`: Topic
- `topics[].confidence`: Confidence (number)
- `topics[].text`: Text
- `intents`: Intents
- `intents[].intent`: Intent
- `intents[].confidence`: Confidence (number)
- `intents[].text`: Text
- `sentiment`: Overall Sentiment
- `sentiment_score`: Sentiment Score (number)
- `utterances`: Utterances
- `utterances[].speaker`: Speaker (number)
- `utterances[].channel`: Channel (number)
- `utterances[].start`: Start (seconds) (number)
- `utterances[].end`: End (seconds) (number)
- `utterances[].confidence`: Confidence (number)
- `utterances[].transcript`: Transcript
- `channels`: Channel Transcripts
- `channels[].channel`: Channel (number)
- `channels[].transcript`: Transcript
- `channels[].confidence`: Confidence (number)
- `channels[].detected_language`: Detected Language
- `entities`: Entities
- `entities[].label`: Type
- `entities[].value`: Value
- `entities[].confidence`: Confidence (number)
- `entities[].channel`: Channel (number)
- `words`: Words
- `words[].word`: Word
- `words[].punctuated_word`: Punctuated Word
- `words[].start`: Start (seconds) (number)
- `words[].end`: End (seconds) (number)
- `words[].confidence`: Confidence (number)
- `words[].speaker`: Speaker (number)
- `words[].channel`: Channel (number)
- `warnings`: Warnings

### `analyze_text`

**Analyze Text.** Runs Deepgram text intelligence on English text (or a public text URL) and returns a summary, topics, intents and/or sentiment; choose at least one. Use for text you already have; for audio use deepgram_transcribe_audio with the same options. Billed per token, so repeat calls are billed again. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | no |  | Text. The English text to analyze. Use this or Text URL. |
| `textUrl` | string | no |  | Text URL. A public link to a plain-text file. Deepgram downloads it directly. Use this or Text. |
| `summarize` | boolean | no | `true` | Summarize. |
| `topics` | boolean | no | `false` | Detect Topics. |
| `intents` | boolean | no | `false` | Detect Intents. |
| `sentiment` | boolean | no | `false` | Analyze Sentiment. |
| `customTopics` | array | no |  | Custom Topics. Topics to look for in addition to (or instead of) the detected ones. Up to 100. |
| `customTopicMode` | string | no |  | Custom Topic Mode. Extended adds your topics to the detected ones; Strict only returns your topics. One of `"extended"`, `"strict"`. |
| `customIntents` | array | no |  | Custom Intents. Intents to look for in addition to (or instead of) the detected ones. Up to 100. |
| `customIntentMode` | string | no |  | Custom Intent Mode. Extended adds your intents to the detected ones; Strict only returns your intents. One of `"extended"`, `"strict"`. |

Output fields:

- `request_id`: Request ID
- `language`: Language
- `summary`: Summary
- `topics`: Topics
- `topics[].topic`: Topic
- `topics[].confidence`: Confidence (number)
- `topics[].text`: Text
- `intents`: Intents
- `intents[].intent`: Intent
- `intents[].confidence`: Confidence (number)
- `intents[].text`: Text
- `sentiment`: Overall Sentiment
- `sentiment_score`: Sentiment Score (number)
- `sentiment_segments`: Sentiment by Segment
- `sentiment_segments[].text`: Text
- `sentiment_segments[].sentiment`: Sentiment
- `sentiment_segments[].sentiment_score`: Score (number)
- `input_tokens`: Input Tokens (number)
- `output_tokens`: Output Tokens (number)

### `create_summary`

**Create Summary.** Uploads an audio file to Deepgram and returns an AI-generated summary of its spoken content (summarize v2), synchronously. Pick this over Create Transcription when you need a condensed overview rather than the full text; by default it falls back to the full transcript if no summary is available. Re-running re-processes the audio and incurs another billed request, though it creates no persistent resource. Agents should use deepgram_transcribe_audio with Summarize on. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audioFile` | file | yes |  | Audio File. The English audio or video file to summarize. Files are not supported; an action that needs one fails. |
| `model` | string | no |  | Model. Leave empty for nova (Nova-1). For better accuracy choose nova-3-general. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. Summaries are only available for English (en, en-US, en-GB, en-AU, en-IN, en-NZ). Leave empty for en. One of `"bg"`, `"ca"`, `"zh"`, `"zh-CN"`, `"zh-TW"`, `"zh-HK"`, `"zh-Hans"`, `"zh-Hant"`, `"cs"`, `"da"`, `"da-DK"`, `"nl"`, `"nl-BE"`, `"en"`, `"en-US"`, `"en-AU"`, `"en-GB"`, `"en-NZ"`, `"en-IN"`, `"et"`, `"fi"`, `"fr"`, `"fr-CA"`, `"de"`, `"de-CH"` and 31 more. |
| `fallbackToTranscript` | boolean | no | `true` | Fallback to Full Transcript. Return full transcript if summary is not available. |

### `create_transcription_callback`

**Create Transcription (Callback).** Submits an audio file to Deepgram for asynchronous speech-to-text: the action returns only a request ID immediately, and the finished transcript is delivered later to the callback URL you provide. Pick this for long audio or when a webhook endpoint will consume the result; it does not return the transcript itself. Each run submits a new billed transcription job, so it is not idempotent. Agents should use deepgram_transcribe_audio. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audioFile` | file | no |  | Audio File. The audio or video file to transcribe. Use this or Audio URL. Files are not supported; an action that needs one fails. |
| `audioUrl` | string | no |  | Audio URL. A public link to the audio or video file. Deepgram downloads it directly. Use this or Audio File. |
| `model` | string | no |  | Model. Leave empty for nova (Nova-1, English, Spanish and Hindi only). For other languages choose nova-3-general or nova-2-general. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. Spoken language. Leave empty for en. The default model nova only supports en, es and hi-Latn; pick a nova-3 or nova-2 model for other languages. One of `"bg"`, `"ca"`, `"zh"`, `"zh-CN"`, `"zh-TW"`, `"zh-HK"`, `"zh-Hans"`, `"zh-Hant"`, `"cs"`, `"da"`, `"da-DK"`, `"nl"`, `"nl-BE"`, `"en"`, `"en-US"`, `"en-AU"`, `"en-GB"`, `"en-NZ"`, `"en-IN"`, `"et"`, `"fi"`, `"fr"`, `"fr-CA"`, `"de"`, `"de-CH"` and 31 more. |
| `callbackUrl` | string | yes |  | Callback URL. URL to receive the transcription when ready. Must use port 80, 443, 8080 or 8443. Basic-auth credentials (https://user:password@host) are allowed and hidden in the output. |
| `callbackMethod` | string | no |  | Callback Method. How Deepgram sends the result. Defaults to POST. One of `"POST"`, `"PUT"`. |
| `smartFormat` | boolean | no | `false` | Smart Format. Add punctuation, capitals and readable numbers, dates and currency. |
| `diarize` | boolean | no | `false` | Identify Speakers. Label who speaks when. |
| `paragraphs` | boolean | no | `false` | Paragraphs. |
| `utterances` | boolean | no | `false` | Utterances. |

Output fields:

- `requestId`: Request ID
- `callbackUrl`: Callback URL
- `status`: Status

### `text_to_speech`

**Text to Speech.** Synthesizes speech from text using a Deepgram Aura voice and saves the result as an audio file in a chosen encoding (mp3 by default). Pick this only for generating spoken audio from text, the inverse of the transcription actions. Each run produces a newly generated, billed audio file, so it is not idempotent. For agents: use Generate Speech. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Up to 2,000 characters. Split longer text into several steps. |
| `model` | string | no |  | Voice. Leave empty for aura-asteria-en. Aura-2 voices sound more natural and cover more languages. A value the product loads from the provider, such as an id; write the value itself. |
| `encoding` | string | no | `"mp3"` | Output Format. One of `"linear16"`, `"flac"`, `"mulaw"`, `"alaw"`, `"mp3"`, `"opus"`, `"aac"`. |
| `container` | string | no |  | Container. For linear16, mulaw and alaw only. WAV (default) adds a file header; None returns raw audio for telephony systems. One of `"wav"`, `"none"`. |
| `sampleRate` | number | no |  | Sample Rate (Hz). Optional. linear16: 8000-48000 (default 24000); mulaw/alaw: 8000 or 16000; flac: 8000-48000. Not used for mp3, opus or aac. |
| `bitRate` | number | no |  | Bit Rate (bps). Optional. mp3: 32000 or 48000; opus: 4000-650000; aac: 4000-192000. |
| `speed` | number | no |  | Speed. Speaking rate from 0.5 to 1.5 (1 is normal). Not supported by every voice. |

Output fields:

- `file`: Audio File (url)
- `file_name`: File Name
- `content_type`: Content Type
- `size_bytes`: Size (filesize)
- `characters`: Characters Billed (number)
- `request_id`: Request ID
- `model`: Voice
- `encoding`: Encoding

### `deepgram_generate_speech`

**Generate Speech.** Converts up to 2,000 characters of text to speech with a Deepgram Aura voice ID (default aura-2-thalia-en; Aura-2 voices exist for en, es, de, fr, nl, it and ja) and returns an audio file. Get voice IDs from deepgram_list_models with type tts. Each call is billed per character, so retries are billed again. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to speak, up to 2,000 characters. |
| `voice` | string | no |  | Voice ID. A Deepgram voice ID such as aura-2-thalia-en or aura-2-celeste-es. Leave empty for aura-2-thalia-en. |
| `encoding` | string | no | `"mp3"` | Audio Format. One of `"mp3"`, `"linear16"`, `"flac"`, `"mulaw"`, `"alaw"`, `"opus"`, `"aac"`. |
| `speed` | number | no |  | Speed. Speaking rate from 0.5 to 1.5 (1 is normal). Not supported by every voice. |

Output fields:

- `file`: Audio File (url)
- `file_name`: File Name
- `content_type`: Content Type
- `size_bytes`: Size (filesize)
- `characters`: Characters Billed (number)
- `request_id`: Request ID
- `model`: Voice
- `encoding`: Encoding

### `list_models`

**List Models and Voices.** Lists Deepgram speech-to-text models and text-to-speech voices with their canonical IDs, languages and voice traits, one row per model (versions merged). Use to pick a model ID for deepgram_transcribe_audio or a voice ID for deepgram_generate_speech; filter by type and language. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes | `"all"` | Type. One of `"all"`, `"stt"`, `"tts"`. |
| `language` | string | no |  | Language. Only list models for this language code, for example en, es or de. "en" also matches en-US and en-GB. |
| `project` | string | no |  | Project. Pick a project to also list custom models trained for it. Leave empty for the public catalog. A value the product loads from the provider, such as an id; write the value itself. |
| `includeOutdated` | boolean | no | `false` | Include Older Versions. Also consider models that are no longer the latest version. |

Output fields:

- `count`: Count (number)
- `models`: Models
- `models[].canonical_name`: Model ID
- `models[].type`: Type
- `models[].name`: Name
- `models[].architecture`: Architecture
- `models[].languages`: Languages
- `models[].version`: Version
- `models[].batch`: Pre-recorded (boolean)
- `models[].streaming`: Streaming (boolean)
- `models[].accent`: Accent
- `models[].age`: Age
- `models[].gender`: Gender
- `models[].voice_tags`: Voice Traits
- `models[].sample_url`: Sample (url)

### `list_projects`

**List Projects.** Fetches all Deepgram projects accessible to the authenticated API key, with no inputs or filters. Use it to discover project IDs before project-scoped operations or to verify account access. Read-only and safe to call repeatedly. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `projects`: Projects
- `projects[].project_id`: Project ID
- `projects[].name`: Name
- `projects[].mip_opt_out`: Model Improvement Opt-Out (boolean)
- `projects[].allowed_providers`: Allowed Providers

### `get_project`

**Get Project.** Returns one Deepgram project by ID with its name and model-improvement opt-out setting. Leave the project empty when the key has a single project. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `project_id`: Project ID
- `name`: Name
- `mip_opt_out`: Model Improvement Opt-Out (boolean)

### `update_project`

**Rename Project.** Renames a Deepgram project and returns the project as stored afterwards. Only the name changes. Setting the same name again changes nothing, so it is idempotent. May require an owner API key, since changing project settings is owner-only. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | New Name. The new name of the project. |

Output fields:

- `project_id`: Project ID
- `name`: Name
- `mip_opt_out`: Model Improvement Opt-Out (boolean)
- `message`: Message

### `list_project_members`

**List Project Members.** Lists every member of a Deepgram project with email, name and scopes (roles). Use to audit who has access. Requires an admin or owner API key; a member key gets a permission error. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `members`: Members
- `members[].member_id`: Member ID
- `members[].email`: Email (email)
- `members[].first_name`: First Name
- `members[].last_name`: Last Name
- `members[].scopes`: Scopes

### `list_project_keys`

**List API Keys.** Lists API key records of a Deepgram project with ID, comment, scopes, creation date and owner email; the secret key value is never returned. Member keys only see keys they created; admin and owner keys see all. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. Only list keys with this status. Leave empty for all keys. One of `"active"`, `"expired"`. |

Output fields:

- `keys`: API Keys
- `keys[].api_key_id`: API Key ID
- `keys[].comment`: Comment
- `keys[].scopes`: Scopes
- `keys[].created`: Created (datetime)
- `keys[].expiration_date`: Expires (datetime)
- `keys[].member_id`: Member ID
- `keys[].member_email`: Member Email (email)

### `list_requests`

**List Requests.** Lists past API requests of a Deepgram project, newest first, with status code, audio duration and cost in USD, filterable by date range, endpoint, method and success. Use to audit usage or find a request ID. Returns one page; has_more is true when the page is full, so ask for the next page number. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |
| `start` | ISO date-time string | no |  | From. Only requests made at or after this time. |
| `end` | ISO date-time string | no |  | To. Only requests made at or before this time. |
| `endpoint` | string | no |  | Endpoint. One of `"listen"`, `"read"`, `"speak"`, `"agent"`. |
| `method` | string | no |  | Method. One of `"sync"`, `"async"`, `"streaming"`. |
| `status` | string | no |  | Status. One of `"succeeded"`, `"failed"`. |
| `limit` | number | no | `50` | Limit. Requests per page, from 1 to 1000. Defaults to 50. |
| `page` | number | no | `0` | Page. Page number, starting at 0. |

Output fields:

- `requests`: Requests
- `requests[].request_id`: Request ID
- `requests[].created`: Created (datetime)
- `requests[].completed`: Completed (datetime)
- `requests[].endpoint`: Endpoint
- `requests[].path`: Path
- `requests[].api_key_id`: API Key ID
- `requests[].status_code`: Status Code (number)
- `requests[].method`: Method
- `requests[].deployment`: Deployment
- `requests[].duration_seconds`: Duration (seconds) (number)
- `requests[].total_audio_seconds`: Total Audio (seconds) (number)
- `requests[].channels`: Channels (number)
- `requests[].usd`: Cost (currency)
- `requests[].models`: Models
- `requests[].features`: Features
- `requests[].tags`: Tags
- `requests[].tier`: Tier
- `requests[].callback_status_code`: Callback Response Code (number)
- `requests[].callback_attempts`: Callback Attempts (number)
- `page`: Page (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)

### `get_request`

**Get Request.** Returns one past Deepgram API request by its request ID with status code, completion time, audio duration and cost in USD. Use to check whether a callback transcription finished or what a call cost. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |
| `requestId` | string | yes |  | Request ID. The request ID returned by a Deepgram action, for example Create Transcription (Callback). |

Output fields:

- `request_id`: Request ID
- `created`: Created (datetime)
- `completed`: Completed (datetime)
- `endpoint`: Endpoint
- `path`: Path
- `api_key_id`: API Key ID
- `status_code`: Status Code (number)
- `method`: Method
- `deployment`: Deployment
- `duration_seconds`: Duration (seconds) (number)
- `total_audio_seconds`: Total Audio (seconds) (number)
- `channels`: Channels (number)
- `usd`: Cost (currency)
- `models`: Models
- `features`: Features
- `tags`: Tags
- `tier`: Tier
- `callback_status_code`: Callback Response Code (number)
- `callback_attempts`: Callback Attempts (number)

### `get_usage`

**Get Usage Breakdown.** Returns usage totals of a Deepgram project for a date range (audio hours, requests, text-to-speech characters, tokens), split per day or grouped by endpoint, model, method, tag, key, feature set or deployment. Use for usage reports; use deepgram_get_billing_breakdown for dollars. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |
| `start` | ISO date-time string | no |  | Start Date. First day to include. Deepgram defaults to 30 days ago. |
| `end` | ISO date-time string | no |  | End Date. Last day to include. Deepgram defaults to today. |
| `groupBy` | string | no |  | Group By. One of `"endpoint"`, `"models"`, `"method"`, `"tags"`, `"accessor"`, `"feature_set"`, `"deployment"`. |
| `endpoint` | string | no |  | Endpoint. Only count requests to this endpoint. One of `"listen"`, `"read"`, `"speak"`, `"agent"`. |
| `tag` | string | no |  | Tag. Only count requests sent with this tag. |

Output fields:

- `start`: Start (date)
- `end`: End (date)
- `resolution`: Resolution
- `total_hours`: Total Hours (number)
- `total_requests`: Total Requests (number)
- `total_tts_characters`: Total TTS Characters (number)
- `total_tokens_in`: Total Tokens In (number)
- `total_tokens_out`: Total Tokens Out (number)
- `results`: Rows
- `results[].start`: Start (date)
- `results[].end`: End (date)
- `results[].hours`: Hours (number)
- `results[].total_hours`: Total Hours (number)
- `results[].agent_hours`: Agent Hours (number)
- `results[].requests`: Requests (number)
- `results[].tts_characters`: TTS Characters (number)
- `results[].tokens_in`: Tokens In (number)
- `results[].tokens_out`: Tokens Out (number)
- `results[].endpoint`: Endpoint
- `results[].method`: Method
- `results[].models`: Models
- `results[].tags`: Tags
- `results[].accessor`: API Key (Accessor)
- `results[].feature_set`: Feature Set
- `results[].deployment`: Deployment

### `get_balances`

**Get Credit Balance.** Returns the remaining prepaid credit balances of a Deepgram project, each with its amount and units. Use before large batches to avoid out-of-credit (402) errors. Requires an admin or owner key. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `balances`: Balances
- `balances[].balance_id`: Balance ID
- `balances[].amount`: Amount (number)
- `balances[].units`: Units
- `balances[].purchase_order_id`: Purchase Order ID

### `get_billing_breakdown`

**Get Cost Breakdown.** Returns the dollar cost of a Deepgram project for a date range, split per day or grouped by line item (for example streaming::nova-3), API key, deployment or tag, plus the total. Requires an admin or owner key. Use deepgram_get_usage_breakdown for hours and requests. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | no |  | Project. The Deepgram project to use. Leave empty when your API key belongs to a single project. A value the product loads from the provider, such as an id; write the value itself. |
| `start` | ISO date-time string | no |  | Start Date. First day to include. |
| `end` | ISO date-time string | no |  | End Date. Last day to include. |
| `groupBy` | array | no |  | Group By. One of `"line_item"`, `"accessor"`, `"deployment"`, `"tags"`. |
| `lineItem` | string | no |  | Line Item. Only include this line item, for example streaming::nova-3. |

Output fields:

- `start`: Start (date)
- `end`: End (date)
- `total_dollars`: Total (currency)
- `results`: Rows
- `results[].dollars`: Amount (currency)
- `results[].start`: Start (date)
- `results[].end`: End (date)
- `results[].line_item`: Line Item
- `results[].accessor`: API Key (Accessor)
- `results[].deployment`: Deployment
- `results[].tags`: Tags

### `deepgram_transcribe_audio`

**Transcribe Audio (Agent).** Transcribes speech from a public audio/video URL or a file from an earlier step with Deepgram and returns the full transcript and its request_id, optionally with speaker labels, paragraphs, detected language, entities and an English-only summary, topics, intents and sentiment. Suits recordings that finish processing within about 8 minutes. Each call is billed per audio minute, so retries are billed again. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audioUrl` | string | no |  | Audio URL. A public link to the audio or video file. Deepgram downloads it directly. Use this or Audio File. |
| `audioFile` | file | no |  | Audio File. The audio or video file to transcribe. Use this or Audio URL. Files are not supported; an action that needs one fails. |
| `model` | string | no | `"nova-3"` | Model. A Deepgram speech-to-text model: a short alias such as nova-3 or nova-2, or a canonical name from deepgram_list_models such as nova-3-general. Leave empty for nova-3. |
| `language` | string | no |  | Language. Spoken language as a BCP-47 code, for example en, es, fr-CA or multi (several languages in one recording, nova-3 only). Leave empty for English, or turn on Detect Language. |
| `detectLanguage` | boolean | no | `false` | Detect Language. Let Deepgram detect the main spoken language. Ignores Language. |
| `smartFormat` | boolean | no | `true` | Smart Format. Add punctuation, capitals and readable numbers, dates and currency. |
| `diarize` | boolean | no | `false` | Identify Speakers. Label who speaks when and return a transcript split by speaker. |
| `paragraphs` | boolean | no | `false` | Paragraphs. Also return the transcript split into paragraphs. |
| `utterances` | boolean | no | `false` | Utterances. Also return the transcript as timed segments (sentences or speaker turns). |
| `multichannel` | boolean | no | `false` | Transcribe Each Channel Separately. For stereo recordings with one speaker per channel, such as call recordings. Billed per channel. |
| `keyterms` | array | no |  | Key Terms. Names, brands or jargon to recognize more reliably (nova-3 models only). Up to 100 terms. |
| `redact` | array | no |  | Redact. Replace sensitive information in the transcript. Billed as an add-on. One of `"pci"`, `"pii"`, `"phi"`, `"numbers"`. |
| `detectEntities` | boolean | no | `false` | Detect Entities. Return names, organizations, places, numbers and other entities found in the speech. |
| `summarize` | boolean | no | `false` | Summarize (English). Return a short summary. English audio only; needs more than about 50 spoken words. |
| `topics` | boolean | no | `false` | Detect Topics (English). |
| `intents` | boolean | no | `false` | Detect Intents (English). |
| `sentiment` | boolean | no | `false` | Analyze Sentiment (English). |
| `includeWords` | boolean | no | `false` | Include Word Timings. Return every word with its start and end time. Makes the output much larger. |
| `tags` | array | no |  | Tags. Labels for this request that show up in Deepgram usage reports. |

Output fields:

- `request_id`: Request ID
- `transcript`: Transcript
- `confidence`: Confidence (number)
- `duration_seconds`: Duration (seconds) (number)
- `detected_language`: Detected Language
- `language_confidence`: Language Confidence (number)
- `model_name`: Model
- `model_version`: Model Version
- `channel_count`: Channels (number)
- `paragraphs_text`: Transcript with Paragraphs
- `speaker_count`: Speakers (number)
- `speaker_transcript`: Transcript by Speaker
- `summary`: Summary
- `topics`: Topics
- `topics[].topic`: Topic
- `topics[].confidence`: Confidence (number)
- `topics[].text`: Text
- `intents`: Intents
- `intents[].intent`: Intent
- `intents[].confidence`: Confidence (number)
- `intents[].text`: Text
- `sentiment`: Overall Sentiment
- `sentiment_score`: Sentiment Score (number)
- `utterances`: Utterances
- `utterances[].speaker`: Speaker (number)
- `utterances[].channel`: Channel (number)
- `utterances[].start`: Start (seconds) (number)
- `utterances[].end`: End (seconds) (number)
- `utterances[].confidence`: Confidence (number)
- `utterances[].transcript`: Transcript
- `channels`: Channel Transcripts
- `channels[].channel`: Channel (number)
- `channels[].transcript`: Transcript
- `channels[].confidence`: Confidence (number)
- `channels[].detected_language`: Detected Language
- `entities`: Entities
- `entities[].label`: Type
- `entities[].value`: Value
- `entities[].confidence`: Confidence (number)
- `entities[].channel`: Channel (number)
- `words`: Words
- `words[].word`: Word
- `words[].punctuated_word`: Punctuated Word
- `words[].start`: Start (seconds) (number)
- `words[].end`: End (seconds) (number)
- `words[].confidence`: Confidence (number)
- `words[].speaker`: Speaker (number)
- `words[].channel`: Channel (number)
- `warnings`: Warnings

### `deepgram_list_models`

**List Models and Voices (Agent).** Lists Deepgram speech-to-text models and text-to-speech voices with canonical IDs, languages and voice traits. Use to pick a model for deepgram_transcribe_audio or a voice (type tts) for deepgram_generate_speech. Turn on One Row per Build to get build UUIDs for deepgram_get_model; then narrow with language, because one model can have over 100 builds. Empty project ID lists the public catalog. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes | `"all"` | Type. One of `"all"`, `"stt"`, `"tts"`. |
| `language` | string | no |  | Language. Only list models for this language code, for example en, es or de. "en" also matches en-US and en-GB. |
| `includeOutdated` | boolean | no | `false` | Include Older Versions. Also consider models that are no longer the latest version. |
| `project_id` | string | no |  | Project ID. A project ID from List Projects (list_projects) to also list custom models trained for it. Leave empty for the public catalog. |
| `perBuild` | boolean | no | `false` | One Row per Build. Return one row per language/version build with its UUID instead of one merged row per model. |

Output fields:

- `count`: Count (number)
- `models`: Models
- `models[].uuid`: Build UUID
- `models[].canonical_name`: Model ID
- `models[].type`: Type
- `models[].name`: Name
- `models[].architecture`: Architecture
- `models[].languages`: Languages
- `models[].version`: Version
- `models[].batch`: Pre-recorded (boolean)
- `models[].streaming`: Streaming (boolean)
- `models[].accent`: Accent
- `models[].age`: Age
- `models[].gender`: Gender
- `models[].voice_tags`: Voice Traits
- `models[].sample_url`: Sample (url)

### `deepgram_get_model`

**Get Model.** Returns one Deepgram speech-to-text model or text-to-speech voice build by its UUID: canonical name, architecture, languages, version, batch/streaming support and voice traits. Get the UUID from deepgram_list_models with One Row per Build on; a canonical name such as nova-3-general is not accepted. Empty project ID reads the public catalog. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model_id` | string | yes |  | Model UUID. The build UUID from deepgram_list_models with One Row per Build on. |
| `project_id` | string | no |  | Project ID. A project ID from List Projects (list_projects) to read a custom model of that project. Leave empty for the public catalog. |

Output fields:

- `uuid`: Build UUID
- `canonical_name`: Model ID
- `type`: Type
- `name`: Name
- `architecture`: Architecture
- `languages`: Languages
- `version`: Version
- `batch`: Pre-recorded (boolean)
- `streaming`: Streaming (boolean)
- `accent`: Accent
- `age`: Age
- `gender`: Gender
- `voice_tags`: Voice Traits
- `sample_url`: Sample (url)

### `deepgram_list_requests`

**List Requests (Agent).** Lists past API requests of a Deepgram project, newest first, with status code, audio duration and cost in USD, filterable by date range (YYYY-MM-DD or ISO date-time), endpoint, method and success. Use to audit usage or to find a request ID for deepgram_get_request. Returns one page; has_more is true when the page is full, so ask for the next page number. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `start` | ISO date-time string | no |  | From. Only requests made at or after this time. |
| `end` | ISO date-time string | no |  | To. Only requests made at or before this time. |
| `endpoint` | string | no |  | Endpoint. One of `"listen"`, `"read"`, `"speak"`, `"agent"`. |
| `method` | string | no |  | Method. One of `"sync"`, `"async"`, `"streaming"`. |
| `status` | string | no |  | Status. One of `"succeeded"`, `"failed"`. |
| `limit` | number | no | `50` | Limit. Requests per page, from 1 to 1000. Defaults to 50. |
| `page` | number | no | `0` | Page. Page number, starting at 0. |

Output fields:

- `requests`: Requests
- `requests[].request_id`: Request ID
- `requests[].created`: Created (datetime)
- `requests[].completed`: Completed (datetime)
- `requests[].endpoint`: Endpoint
- `requests[].path`: Path
- `requests[].api_key_id`: API Key ID
- `requests[].status_code`: Status Code (number)
- `requests[].method`: Method
- `requests[].deployment`: Deployment
- `requests[].duration_seconds`: Duration (seconds) (number)
- `requests[].total_audio_seconds`: Total Audio (seconds) (number)
- `requests[].channels`: Channels (number)
- `requests[].usd`: Cost (currency)
- `requests[].models`: Models
- `requests[].features`: Features
- `requests[].tags`: Tags
- `requests[].tier`: Tier
- `requests[].callback_status_code`: Callback Response Code (number)
- `requests[].callback_attempts`: Callback Attempts (number)
- `page`: Page (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)

### `deepgram_get_request`

**Get Request (Agent).** Returns one past Deepgram API request by its request ID with status code, completion time, audio duration, cost in USD and callback delivery status. Get the ID from deepgram_list_requests or from the request_id that deepgram_transcribe_audio returns. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `requestId` | string | yes |  | Request ID. The request ID returned by a Deepgram action, for example Create Transcription (Callback). |

Output fields:

- `request_id`: Request ID
- `created`: Created (datetime)
- `completed`: Completed (datetime)
- `endpoint`: Endpoint
- `path`: Path
- `api_key_id`: API Key ID
- `status_code`: Status Code (number)
- `method`: Method
- `deployment`: Deployment
- `duration_seconds`: Duration (seconds) (number)
- `total_audio_seconds`: Total Audio (seconds) (number)
- `channels`: Channels (number)
- `usd`: Cost (currency)
- `models`: Models
- `features`: Features
- `tags`: Tags
- `tier`: Tier
- `callback_status_code`: Callback Response Code (number)
- `callback_attempts`: Callback Attempts (number)

### `deepgram_list_project_members`

**List Project Members (Agent).** Lists every member of a Deepgram project with email, name and scopes (roles), so it also answers which scopes each member holds. Use to audit who has access. Needs an admin or owner key; a member key gets a permission error. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |

Output fields:

- `members`: Members
- `members[].member_id`: Member ID
- `members[].email`: Email (email)
- `members[].first_name`: First Name
- `members[].last_name`: Last Name
- `members[].scopes`: Scopes

### `deepgram_get_usage_breakdown`

**Get Usage Breakdown (Agent).** Returns usage totals of a Deepgram project for a date range (audio hours, requests, text-to-speech characters, tokens), split per day or grouped by endpoint, model, method, tag, key, feature set or deployment. Valid tag values come from deepgram_list_usage_fields. Use deepgram_get_billing_breakdown for dollars. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `start` | ISO date-time string | no |  | Start Date. First day to include. Deepgram defaults to 30 days ago. |
| `end` | ISO date-time string | no |  | End Date. Last day to include. Deepgram defaults to today. |
| `groupBy` | string | no |  | Group By. One of `"endpoint"`, `"models"`, `"method"`, `"tags"`, `"accessor"`, `"feature_set"`, `"deployment"`. |
| `endpoint` | string | no |  | Endpoint. Only count requests to this endpoint. One of `"listen"`, `"read"`, `"speak"`, `"agent"`. |
| `tag` | string | no |  | Tag. Only count requests sent with this tag. |

Output fields:

- `start`: Start (date)
- `end`: End (date)
- `resolution`: Resolution
- `total_hours`: Total Hours (number)
- `total_requests`: Total Requests (number)
- `total_tts_characters`: Total TTS Characters (number)
- `total_tokens_in`: Total Tokens In (number)
- `total_tokens_out`: Total Tokens Out (number)
- `results`: Rows
- `results[].start`: Start (date)
- `results[].end`: End (date)
- `results[].hours`: Hours (number)
- `results[].total_hours`: Total Hours (number)
- `results[].agent_hours`: Agent Hours (number)
- `results[].requests`: Requests (number)
- `results[].tts_characters`: TTS Characters (number)
- `results[].tokens_in`: Tokens In (number)
- `results[].tokens_out`: Tokens Out (number)
- `results[].endpoint`: Endpoint
- `results[].method`: Method
- `results[].models`: Models
- `results[].tags`: Tags
- `results[].accessor`: API Key (Accessor)
- `results[].feature_set`: Feature Set
- `results[].deployment`: Deployment

### `deepgram_get_usage_summary`

**Get Usage Summary.** Returns the usage summary of a Deepgram project for a date range (YYYY-MM-DD), filterable by API key, tag, model build UUID, endpoint, method and deployment. Valid tag and model values come from deepgram_list_usage_fields; a model name such as nova-3 does not match. Returns per-day totals of audio hours, requests, text-to-speech characters and tokens plus overall totals; use deepgram_get_usage_breakdown to group by endpoint, model, tag or key. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `start` | ISO date-time string | no |  | Start Date. First day to include. Deepgram defaults to 30 days ago. |
| `end` | ISO date-time string | no |  | End Date. Last day to include. Deepgram defaults to today. |
| `accessor` | string | no |  | API Key ID. Only count requests made with this API key ID. |
| `tag` | string | no |  | Tag. Only count requests with this tag, from deepgram_list_usage_fields. |
| `model` | string | no |  | Model UUID. Only count requests to this model build, using a model_id from deepgram_list_usage_fields. |
| `endpoint` | string | no |  | Endpoint. One of `"listen"`, `"read"`, `"speak"`, `"agent"`. |
| `method` | string | no |  | Method. One of `"sync"`, `"async"`, `"streaming"`. |
| `deployment` | string | no |  | Deployment. One of `"hosted"`, `"beta"`, `"self-hosted"`. |

Output fields:

- `start`: Start (date)
- `end`: End (date)
- `resolution`: Resolution
- `total_hours`: Total Hours (number)
- `total_requests`: Total Requests (number)
- `total_tts_characters`: Total TTS Characters (number)
- `total_tts_requests`: Total TTS Requests (number)
- `total_tokens_in`: Total Tokens In (number)
- `total_tokens_out`: Total Tokens Out (number)
- `results`: Days
- `results[].start`: Start (date)
- `results[].end`: End (date)
- `results[].hours`: Hours (number)
- `results[].total_hours`: Total Hours (number)
- `results[].requests`: Requests (number)
- `results[].tts_characters`: TTS Characters (number)
- `results[].tts_requests`: TTS Requests (number)
- `results[].tokens_in`: Tokens In (number)
- `results[].tokens_out`: Tokens Out (number)

### `deepgram_list_usage_fields`

**List Usage Filter Values.** Lists the tags, model builds (with model_id UUIDs), processing methods and features a Deepgram project actually used in a date range (YYYY-MM-DD). Use to find valid tag and model values for deepgram_get_usage_summary and deepgram_get_usage_breakdown; tags are returned without the tag= prefix. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `start` | ISO date-time string | no |  | Start Date. First day to include. |
| `end` | ISO date-time string | no |  | End Date. Last day to include. |

Output fields:

- `accessors`: API Key IDs
- `tags`: Tags
- `models`: Model Builds
- `models[].model_id`: Model UUID
- `models[].name`: Name
- `models[].language`: Language
- `models[].version`: Version
- `processing_methods`: Processing Methods
- `features`: Features

### `deepgram_list_balances`

**List Credit Balances.** Lists every prepaid credit balance of a Deepgram project with its ID, amount and units; amounts in different units are never added up. Use before large batches to avoid out-of-credit errors, or to get a balance ID for deepgram_get_balance. Needs an admin or owner key. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |

Output fields:

- `balances`: Balances
- `balances[].balance_id`: Balance ID
- `balances[].amount`: Amount (number)
- `balances[].units`: Units
- `balances[].purchase_order_id`: Purchase Order ID

### `deepgram_get_balance`

**Get Credit Balance by ID.** Returns one prepaid credit balance of a Deepgram project by its balance ID, with amount and units. Get the ID from deepgram_list_balances, which already returns every balance. Needs an admin or owner key. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `balance_id` | string | yes |  | Balance ID. The balance ID from deepgram_list_balances. |

Output fields:

- `balance_id`: Balance ID
- `amount`: Amount (number)
- `units`: Units
- `purchase_order_id`: Purchase Order ID

### `deepgram_get_billing_breakdown`

**Get Cost Breakdown (Agent).** Returns the dollar cost of a Deepgram project for a date range, split per day or grouped by line item (for example streaming::nova-3), API key, deployment or tag, plus the total. Valid line items, keys and tags come from deepgram_list_billing_fields; use deepgram_get_usage_breakdown for hours and requests. Needs an admin or owner key. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `start` | ISO date-time string | no |  | Start Date. First day to include. |
| `end` | ISO date-time string | no |  | End Date. Last day to include. |
| `groupBy` | array | no |  | Group By. One of `"line_item"`, `"accessor"`, `"deployment"`, `"tags"`. |
| `lineItem` | string | no |  | Line Item. Only include this line item, for example streaming::nova-3. |

Output fields:

- `start`: Start (date)
- `end`: End (date)
- `total_dollars`: Total (currency)
- `results`: Rows
- `results[].dollars`: Amount (currency)
- `results[].start`: Start (date)
- `results[].end`: End (date)
- `results[].line_item`: Line Item
- `results[].accessor`: API Key (Accessor)
- `results[].deployment`: Deployment
- `results[].tags`: Tags

### `deepgram_list_billing_fields`

**List Billing Filter Values.** Lists the API key IDs, deployments, tags and line items (with descriptions) billed to a Deepgram project in a date range (YYYY-MM-DD). Use to find valid line items and tags for deepgram_get_billing_breakdown. Needs an admin or owner key. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `start` | ISO date-time string | no |  | Start Date. First day to include. |
| `end` | ISO date-time string | no |  | End Date. Last day to include. |

Output fields:

- `accessors`: API Key IDs
- `deployments`: Deployments
- `tags`: Tags
- `line_items`: Line Items
- `line_items[].line_item`: Line Item
- `line_items[].description`: Description

### `deepgram_list_purchases`

**List Purchases.** Lists the most recent credit purchases (orders) of a Deepgram project with amount, units, order type, creation and expiry date. Returns at most Limit orders and cannot page further. Use deepgram_list_balances for the credit that is left. Needs an admin or owner key. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | no |  | Project ID. The Deepgram project ID, from List Projects (list_projects). Leave empty when the API key belongs to a single project. |
| `limit` | number | no | `10` | Limit. How many recent purchases to return, from 1 to 1000. Defaults to 10. |

Output fields:

- `count`: Count (number)
- `orders`: Purchases
- `orders[].order_id`: Order ID
- `orders[].created`: Created (datetime)
- `orders[].expiration`: Expires (datetime)
- `orders[].amount`: Amount (number)
- `orders[].units`: Units
- `orders[].order_type`: Order Type

### `deepgram_list_think_models`

**List Voice Agent LLMs.** Lists the LLMs (OpenAI, Anthropic, Google, Groq, Amazon Bedrock and others) that a Deepgram Voice Agent can use for its think step, each with its model ID, name and provider. Use when configuring a Deepgram Voice Agent. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `models`: Models
- `models[].id`: Model ID
- `models[].name`: Name
- `models[].provider`: Provider

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
