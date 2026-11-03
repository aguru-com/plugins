# VidLab7

AI Avatars that pitch, show demos, qualify buyers, follow up, secure meetings and close deals – on autopilot.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vidlab7'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To generate your API key:
>
> 1. Log in to [studio.vidlab7.com](https://studio.vidlab7.com/)
> 2. Click on **API** in the bottom section of the left-hand menu
> 3. Click the **Generate new key** button at the top right
> 4. Give your key a descriptive name and click **Generate**
> 5. Copy and store the key securely (you'll only see it once)

## Actions

### `createVideo`

**Create Video.** Submits a video-generation job to VidLab7 from a studio avatar, a script, and a voice (avatar ID, voice ID, and script text are required). By default returns immediately with the video ID and status; enable wait-for-completion to poll until the video finishes and return its URL (this blocks for up to 300 seconds). Each call starts a new generation job, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `avatarId` | string | yes |  | Avatar ID. The ID of the avatar to be used for the video generation. |
| `script` | string | yes |  | Script. The script to be used for the video generation. |
| `voiceId` | string | yes |  | Voice ID. The ID of the voice to be used for the video generation. |
| `webhookUrl` | string | yes |  | Webhook URL. The URL to which the webhook will be sent when video generation is complete. |
| `similarity_boost` | number | no | `50` | Similarity Boost. Voice similarity boost setting (0-100) |
| `use_speaker_boost` | boolean | no | `true` | Use Speaker Boost. Enable speaker boost for better voice quality. |
| `style` | number | no | `0` | Style. Voice style setting. |
| `stability` | number | no | `50` | Stability. Voice stability setting (0-100) |
| `waitForCompletion` | boolean | no | `false` | Wait for Completion. Wait for the video generation to complete and return the video URL. If disabled, only returns the video ID. |
