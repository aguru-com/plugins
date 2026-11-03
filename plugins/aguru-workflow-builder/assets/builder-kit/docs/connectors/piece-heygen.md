# HeyGen

Generate and manage AI avatar videos using HeyGen.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-heygen'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key by navigating to your Space Settings in HeyGen App.

## Actions

### `create-video-from-template`

**Create Video from Template.** Submits a new HeyGen avatar-video render from an existing template, filling in the template variables (text, image/video/audio URLs, character, voice). Use to programmatically generate videos at scale from a reusable template; requires a valid template ID and produces a new render each call (not idempotent). Rendering is asynchronous — poll Retrieve Video Status or use the completion trigger for the finished output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template. Select the template to generate the video. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Video Title. Title of the generated video. |
| `caption` | boolean | no | `false` | Enable Captions. |
| `includeGif` | boolean | no | `false` | Include GIF Preview. |
| `enableSharing` | boolean | no | `false` | Enable Public Sharing. |
| `folderId` | string | no |  | Folder. Select the folder to store the video. A value the product loads from the provider, such as an id; write the value itself. |
| `brandVoiceId` | string | no |  | Brand Voice. Select the Brand Voice to apply to the video. A value the product loads from the provider, such as an id; write the value itself. |
| `callbackUrl` | string | no |  | Callback URL. Webhook URL to notify when video rendering is complete. |
| `dimensionWidth` | number | no | `1280` | Video Width. |
| `dimensionHeight` | number | no | `720` | Video Height. |
| `variables` | object | no |  | Template Varriables. An object whose fields depend on other inputs; the product shows them. |

### `retrieve-translated-video-status`

**Retrieve Translated Video Status.** Looks up the current processing status (and result details) of a video-translation job by its translation video ID. Use to poll whether a previously submitted Translate Video job has completed. Read-only and idempotent. Note the ID here is the translate-job ID, distinct from the avatar-video ID used by Retrieve Video Status. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The ID of the translated video to check the status for. |

### `retrieve_video_status`

**Retrieve Video Status.** Looks up the processing status and details (including the output URL once ready) of an avatar/template-generated video by its video ID. Use to poll whether a generation job has finished before downloading or sharing. Read-only and idempotent. For video-translation jobs use Retrieve Translated Video Status instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The ID of the video to retrieve the status for. |

### `retrieve_sharable_video_url`

**Retrieve Sharable Video URL.** Enables public sharing for a finished video and returns a publicly accessible share URL, given the video ID. Use when an agent needs a link it can hand out without authentication. This is a server-side mutation that toggles the video to shareable, so treat it as not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The ID of the video to generate a shareable URL for. |

### `upload_asset`

**Upload an Asset.** Uploads a media file (image, video, or audio) to HeyGen so it can be referenced in later video/template generation. Use to stage assets before composing a video. Only JPEG, PNG, MP4, WEBM, and MPEG are accepted; content type is inferred from the file extension. Each call creates a new asset, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload (JPEG, PNG, MP4, WEBM, or MPEG). Files are not supported; an action that needs one fails. |

### `translate_video`

**Translate Video.** Submits a video-translation job that dubs a source video into a target language with natural voice and lip-sync, optionally audio-only (no face modification). Use to localize an existing video given its URL (direct, Google Drive, or YouTube) and an output language. Processing is asynchronous and each call starts a new job (not idempotent); poll Retrieve Translated Video Status for the result. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoUrl` | string | yes |  | Video URL. URL of the video file to be translated. Supports direct URLs, Google Drive, and YouTube. |
| `title` | string | no |  | Title. Optional title of the translated video. |
| `outputLanguage` | string | yes |  | Supported Language. Select the language for video translation. A value the product loads from the provider, such as an id; write the value itself. |
| `translateAudioOnly` | boolean | no | `false` | Translate Audio Only. Only translate the audio without modifying faces. |
| `speakerNum` | number | no |  | Number of Speakers. Number of speakers in the video (if applicable). |
| `brandVoiceId` | string | no |  | Brand Voice. Select the Brand Voice to apply to the video. A value the product loads from the provider, such as an id; write the value itself. |
| `callbackId` | string | no |  | Callback ID. Custom ID returned in webhook callback. |
| `callbackUrl` | string | no |  | Callback URL. URL to notify when translation is complete. |

### `list_avatars`

**List Avatars.** Retrieves all avatars available to the account. Use to discover avatar IDs before composing or generating a video. Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `list_voices`

**List Voices.** Retrieves all voices available to the account. Use to discover voice IDs before composing or generating a video. Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `list_videos`

**List Videos.** Lists previously generated videos on the account, optionally capped by a limit (default 20, max 100). Use to enumerate videos and their IDs/statuses for follow-up lookups. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of videos to retrieve (max 100). |

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
