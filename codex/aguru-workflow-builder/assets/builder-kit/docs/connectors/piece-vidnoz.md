# Vidnoz

AI video generation platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vidnoz'
  version: '0.0.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Vidnoz API Key. You can get this from your Vidnoz account under API Credentials.

## Actions

### `generate_video_with_avatar`

**Generate Video with Avatar.** Submits a Vidnoz job to generate a talking-avatar video, returning a task id for the queued generation (poll separately for the finished video). Choose this to drive a chosen avatar from scratch rather than a pre-made template. Requires an avatar id and a voice configuration whose voiceMode selects the source — text-to-speech, an audio file, or silence — and a backgroundMode of either solid color or image/video. Not idempotent: each call queues a new video generation task. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Video Name. |
| `aspect` | string | no | `1` | Aspect Ratio. One of `1`, `2`, `3`. |
| `avatarId` | string | yes |  | Avatar. Select the avatar to use. |
| `avatarStyle` | string | no | `1` | Avatar Style. One of `1`, `2`, `3`. |
| `avatarCircleBgColor` | string | no |  | Avatar Circle Background Color. |
| `avatarScale` | number | no |  | Avatar Scale. |
| `avatarOffsetX` | number | no |  | Avatar Offset X. |
| `avatarOffsetY` | number | no |  | Avatar Offset Y. |
| `voiceMode` | string | yes | `"tts"` | Voice Mode. One of `"tts"`, `"file"`, `"silence"`. |
| `voice` | object | yes |  | Voice Settings. An object whose fields depend on other inputs; the product shows them. |
| `backgroundMode` | string | yes | `"color"` | Background Mode. One of `"color"`, `"media"`. |
| `background` | object | yes |  | Background Settings. An object whose fields depend on other inputs; the product shows them. |

### `generate_video_with_template`

**Generate Video with Template.** Submits a Vidnoz job to generate a video from a pre-built template, returning a task id for the queued generation (poll separately for the finished video). Choose this when starting from one of the account templates rather than composing an avatar scene yourself. Requires a template id and a per-scene voices array, where each scene picks a voice source — text-to-speech, an audio file, or silence. Not idempotent: each call queues a new video generation task. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Video Name. |
| `templateId` | string | yes |  | Template. A value the product loads from the provider, such as an id; write the value itself. |
| `voices` | array | yes |  | Voices (Per Scene). Each item: { `mode`, `ttsVoiceId`?, `ttsText`?, `fileAssetId`?, `fileUrl`?, `silenceDuration`? }. |
