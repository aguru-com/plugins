# Hume AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hume-ai'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Hume AI API key from the Hume Portal (https://platform.hume.ai/settings/keys)

## Actions

### `generate_text_to_speech`

**Generate Text to Speech.** Synthesize expressive speech audio from text via Hume AI and return it as an audio file (mp3/wav/pcm). Optionally steer the voice with a natural-language description (omit to generate a dynamic voice) and request multiple generations in one call. Use to produce spoken audio from a text string. Each call generates fresh audio, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to convert to speech. |
| `voiceDescription` | string | no |  | Voice Description. Natural language description of how the speech should sound (tone, accent, style, etc.). If no voice is specified, this will generate a dynamic voice. |
| `format` | string | yes | `"mp3"` | Audio Format. The output audio file format. One of `"mp3"`, `"wav"`, `"pcm"`. |
| `speed` | number | no | `1` | Speed. Speed multiplier for the synthesized speech (0.75-1.5 recommended) |
| `numGenerations` | number | no | `1` | Number of Generations. Number of audio generations to produce (1-5 recommended) |
| `contextText` | string | no |  | Context Text. Optional context text to influence speech style and prosody consistency. |
| `contextDescription` | string | no |  | Context Description. Description for the context text (how it should sound) |
| `trailingSilence` | number | no |  | Trailing Silence (seconds). Duration of silence to add at the end of the speech. |
| `splitUtterances` | boolean | no | `true` | Split Utterances. Automatically split text into natural-sounding speech segments. |

### `generate_speech_from_file`

**Generate Speech from File.** Synthesize expressive speech from text via Hume AI and return a single downloadable audio file (mp3/wav/pcm). Like Generate Text to Speech but returns the raw audio file directly rather than JSON metadata; choose this when you just need the audio file output. Optionally steer the voice with a natural-language description. Each call generates fresh audio, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to convert to speech. |
| `voiceDescription` | string | no |  | Voice Description. Natural language description of how the speech should sound (tone, accent, style, etc.). If no voice is specified, this will generate a dynamic voice. |
| `format` | string | yes | `"mp3"` | Audio Format. The output audio file format. One of `"mp3"`, `"wav"`, `"pcm"`. |
| `speed` | number | no | `1` | Speed. Speed multiplier for the synthesized speech (0.75-1.5 recommended) |
| `contextText` | string | no |  | Context Text. Optional context text to influence speech style and prosody consistency. |
| `contextDescription` | string | no |  | Context Description. Description for the context text (how it should sound) |
| `trailingSilence` | number | no |  | Trailing Silence (seconds). Duration of silence to add at the end of the speech. |
| `splitUtterances` | boolean | no | `true` | Split Utterances. Automatically split text into natural-sounding speech segments. |

### `create_voice`

**Create Voice.** Save a reusable custom voice in your Hume AI account from a prior TTS generation ID, under a chosen name. Use after generating speech you want to persist and reuse in later synthesis calls. Requires a valid generation ID from an earlier Generate Text to Speech result; creates a new voice resource on each call (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `generationId` | string | yes |  | Generation ID. The unique ID from a previous TTS generation to save as a custom voice. |
| `voiceName` | string | yes |  | Voice Name. A descriptive name for your custom voice. |

### `delete_voice`

**Delete Voice.** Permanently remove a saved custom voice from your Hume AI account, identified by its voice name. Use to clean up voices that are no longer needed. Deletion is keyed on the name and converges to the same end state, so re-running with the same name is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `voiceName` | string | yes |  | Voice Name. The name of the custom voice to delete. |

### `analyze_emotions_from_url`

**Analyze Emotions from URL.** Start an asynchronous Hume AI Expression Measurement batch job over media (image, video, audio) referenced by URL, returning a job ID; results are fetched later with Get Emotion Results. Use to measure emotional expression in hosted media. Accepts up to 100 URLs or archives, with optional model selection, transcription, callback URL, and email notification. Each call queues a new job, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | Media URLs. URLs to media files to analyze (images, videos, audio). Supports up to 100 URLs or archives (.zip, .tar.gz) |
| `models` | object | no |  | Models Configuration. Specify which models to use for inference. Leave empty to run all models. |
| `transcription` | boolean | no | `false` | Include Transcription. Include speech-to-text transcription in the analysis. |
| `callbackUrl` | string | no |  | Callback URL. Optional webhook URL to receive results when the job completes. |
| `notify` | boolean | no | `true` | Email Notification. Send email notification upon job completion or failure. |

### `get_emotion_results`

**Get Emotion Results.** Fetch the predictions and current state of a Hume AI Expression Measurement batch job by its job ID. Use after starting a job with Analyze Emotions from URL to poll for and collect results; the job may still be processing if not yet complete. This is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Job ID. The ID of the emotion analysis job to retrieve results for. |
