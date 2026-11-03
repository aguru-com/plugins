# Synthesia

Create AI videos from text in minutes using Synthesia

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-synthesia'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your Synthesia API Key:
>
> 1. Go to the upper right corner of the Synthesia application and click on your account.
> 2. Select **Integrations**
> 3. Click on **Add** to add a new Synthesia API key.
> 4. Copy this key using the 3-dot button on the right side of your API key.
> 5. Paste it below.
>
> **Note:** When you create an API key it will belong to your account, not the workspace.

## Actions

### `createAVideoFromATemplate`

**Create a video from a template.** Submits a video-generation job to Synthesia from an existing template, passing template-variable values as case-sensitive key-value pairs. Choose this when the user wants a video built from a pre-designed template rather than authored scene-by-scene; requires a valid template ID. Each call queues a new video, so it is not idempotent. Enable test mode to produce a watermarked preview. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template. Select the template to use for video creation. A value the product loads from the provider, such as an id; write the value itself. |
| `templateData` | object | no |  | Template Data. Key-value pairs for template variables. Keys must match variable names in the template (case-sensitive) |
| `test` | boolean | no | `false` | Test Mode. If enabled, creates a test video with a watermark. |
| `title` | string | no |  | Title. Custom title for the video. |
| `visibility` | string | no | `"private"` | Visibility. The visibility setting for the video. One of `"private"`, `"public"`. |
| `description` | string | no |  | Description. Custom description for the video. |
| `brandKitId` | string | no | `"workspace_default"` | Brand Kit ID. The ID of the brand kit to use (use "workspace_default" for default) |

### `createVideo`

**Create video.** Submits a video-generation job to Synthesia built from a text script, a chosen avatar, and a background (stock preset, custom asset ID, or URL). Choose this to generate a video from scratch from raw script text rather than from a saved template; script text and avatar are required. Each call queues a new video, so it is not idempotent. Enable test mode for a watermarked preview, or set a webhook URL to be notified when the video completes. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `input_scriptText` | string | yes |  | Input Script Text. An array of scenes to be included in the video. |
| `input_scriptAudioUrl` | string | no |  | Input Script Audio URL. URL of the audio file to be used for the video script (optional) |
| `input_avatar` | string | yes | `"anna_costume1_cameraA"` | Input Avatar. The avatar to be used in the video https://docs.synthesia.io/reference/avatars) |
| `input_background` | string | yes | `"green_screen"` | Background. Background for the video. Can be a stock background, custom asset ID, or URL. One of `"green_screen"`, `"off_white"`, `"warm_white"`, `"light_pink"`, `"soft_pink"`, `"light_blue"`, `"dark_blue"`, `"soft_cyan"`, `"strong_cyan"`, `"light_orange"`, `"soft_orange"`, `"white_studio"`, `"white_cafe"`, `"luxury_lobby"`, `"large_window"`, `"white_meeting_room"`, `"open_office"`. |
| `test` | boolean | no | `false` | Test Mode. If enabled, creates a test video with a watermark. |
| `title` | string | no |  | Title. Custom title for the video (displayed on the share page) |
| `description` | string | no |  | Description. Custom description for the video (displayed on the share page) |
| `visibility` | string | no | `"private"` | Visibility. Video visibility setting. One of `"private"`, `"public"`. |
| `brandKitId` | string | no | `"workspace_default"` | Brand Kit ID. The ID of the brand kit to use (use "workspace_default" for default) |
| `callbackId` | string | no |  | Callback ID. Arbitrary metadata/identifier for the video. |
| `pushServiceUrl` | string | no |  | Webhook URL. Webhook URL for push notifications when video completes. |
