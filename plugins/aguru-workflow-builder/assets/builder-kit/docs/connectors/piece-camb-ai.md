# Camb.AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-camb-ai'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key, please follow these steps:
> 1. Log in to your [CAMB.AI Studio](https://camb.ai/studio/) account.
> 2. Navigate to your workspace's API Keys dashboard.
> 3. Create a new key if you haven't already.
> 4. Copy the API key and paste it here.

## Actions

### `create_text_to_sound`

**Create Text-to-Sound.** Generates a sound-effect audio clip from a text prompt describing the desired effect using Camb.AI, polling until the generation task completes and returning the audio. Use to synthesize non-speech sound effects (not spoken voice — use Create Text-to-Speech for that). Duration is capped at 10 seconds (defaults to 8). Not idempotent: each call starts a new generation task and produces fresh audio. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. A clear, descriptive explanation of the desired audio effect. Concise prompts yield more accurate results. |
| `duration` | number | no |  | Duration (seconds). The desired length of the audio in seconds (max 10). Defaults to 8 if not set. |
| `project_name` | string | no |  | Project Name. A memorable name for your project to help organize tasks in your Camb.ai workspace. |
| `project_description` | string | no |  | Project Description. Provide details about your project's goals and specifications for documentation purposes. |
| `folder_id` | string | no |  | Folder. Select the folder to save the task in. A value the product loads from the provider, such as an id; write the value itself. |

### `create_text_to_speech`

**Create Text-to-Speech.** Synthesizes spoken-voice audio from text via Camb.AI text-to-speech, polling until the task completes and writing the resulting WAV to a file. Requires a language and a voice_id (both selected from Camb.AI dropdowns); optionally tune gender and age. Use for spoken narration/dialogue; for non-speech sound effects use Create Text-to-Sound instead. Not idempotent: each call starts a new synthesis task and produces a new audio file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to be converted to speech. |
| `language` | string | yes |  | Source Language. Select the original language of the input text. A value the product loads from the provider, such as an id; write the value itself. |
| `voice_id` | string | yes |  | Voice. Select the voice to generate the speech. A value the product loads from the provider, such as an id; write the value itself. |
| `gender` | string | no |  | Gender. The gender of the speaker. One of `1`, `2`, `0`, `9`. |
| `age` | number | no |  | Age. The age of the speaker to be generated. |
| `project_name` | string | no |  | Project Name. A memorable name for your project to help organize tasks in your Camb.ai workspace. |
| `project_description` | string | no |  | Project Description. Provide details about your project's goals and specifications for documentation purposes. |
| `folder_id` | string | no |  | Folder. Select the folder to save the task in. A value the product loads from the provider, such as an id; write the value itself. |

### `create_translation`

**Create Translation.** Translates text from a source language to a target language via Camb.AI, polling until the translation task completes. Each input line is treated as a separate segment to translate, and both languages are chosen from Camb.AI dropdowns; optionally tune formality, gender, and target audience age. Use for text translation only (not audio — use Create Transcription for speech-to-text). Not idempotent: each call starts a new translation task. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `texts` | string | yes |  | Text to Translate. The text to be translated. You can enter multiple lines; each line will be treated as a separate text segment. |
| `source_language` | string | yes |  | Source Language. Select the original language of the input text. A value the product loads from the provider, such as an id; write the value itself. |
| `target_language` | string | yes |  | Target Language. Select the language to translate the text into. A value the product loads from the provider, such as an id; write the value itself. |
| `formality` | string | no |  | Formality. Adjust the formality level to match your context. One of `1`, `2`. |
| `gender` | string | no |  | Gender. Specify grammatical gender preferences when relevant in the target language. One of `1`, `2`, `0`, `9`. |
| `age` | number | no |  | Audience Age. Helps adjust vocabulary and expressions to be age-appropriate. |
| `project_name` | string | no |  | Project Name. A memorable name for your project to help organize tasks in your Camb.ai workspace. |

### `create_transcription`

**Create Transcription.** Transcribes speech from an audio/video source into text via Camb.AI, polling until the transcription task completes. The media can be supplied either as an uploaded file (max 20MB) or as a public file URL, selected via the media source mode; you must specify the spoken language. Use to convert recorded speech to text. Not idempotent: each call starts a new transcription task. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `language` | string | yes |  | Source Language. Select the original language of the input text. A value the product loads from the provider, such as an id; write the value itself. |
| `source_type` | string | yes | `"file"` | Media Source. Choose whether to upload a file or provide a URL. One of `"file"`, `"url"`. |
| `media` | object | yes |  | Media. An object whose fields depend on other inputs; the product shows them. |
| `project_name` | string | no |  | Project Name. A memorable name for your project to help organize tasks in your Camb.ai workspace. |
| `project_description` | string | no |  | Project Description. Provide details about your project's goals and specifications for documentation purposes. |
| `folder_id` | string | no |  | Folder. Select the folder to save the task in. A value the product loads from the provider, such as an id; write the value itself. |

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
