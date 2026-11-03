# Vadoo AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vadoo-ai'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can create API key from [Profile Settings](https://ai.vadoo.tv/profile).

## Actions

### `generate_video`

**Generate Video.** Generates an AI video on Vadoo from a topic or custom script and waits (polls up to ~5 minutes) for it to finish, returning the completed video URL. Supports two content modes: pick a topic from the account list (or set topic to "Custom" and supply a prompt for a custom script), or pass a blog URL for blog-to-video. Optional voice, theme, language, duration, aspect ratio, captions, and background music control the output. Each call starts a new generation job, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | no |  | Topic. To create content for AI Video. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | no |  | Custom Prompt. Prompt to generate a custom script (required when topic is 'Custom') |
| `voice` | string | no |  | Voice. The voice for AI Video. A value the product loads from the provider, such as an id; write the value itself. |
| `theme` | string | no |  | Theme. To display captions with style. A value the product loads from the provider, such as an id; write the value itself. |
| `style` | string | no | `"None"` | Style. AI image style. |
| `language` | string | no |  | Language. To generate video in language you want. A value the product loads from the provider, such as an id; write the value itself. |
| `duration` | string | no | `"30-60"` | Duration. Video Duration. One of `"30-60"`, `"60-90"`, `"90-120"`, `"5 min"`, `"10 min"`. |
| `aspect_ratio` | string | no | `"9:16"` | Aspect Ratio. Video aspect ratio. One of `"9:16"`, `"1:1"`, `"16:9"`. |
| `custom_instruction` | string | no |  | Custom Instructions. Custom instructions to guide AI (character descriptions, image visuals, background styles, etc.) |
| `use_ai` | string | no | `"1"` | Use AI to Modify Script. Modify script with AI. One of `"1"`, `"0"`. |
| `include_voiceover` | string | no | `"1"` | Include Voiceover. Include AI voiceover in the video. One of `"1"`, `"0"`. |
| `size` | string | no |  | Caption Size. Size of captions (take reference values from dashboard) |
| `ypos` | string | no |  | Caption Position. Position of captions (take reference values from dashboard) |
| `url` | string | no |  | Blog URL. URL input for Blog to Video. |
| `bg_music` | string | no |  | Background Music. Background music to use along with the video. A value the product loads from the provider, such as an id; write the value itself. |
| `bg_music_volume` | number | no |  | Background Music Volume. Background music volume (1-100) |

### `generate_podcast`

**Generate Podcast.** Generates a two-speaker podcast-style video on Vadoo from source content and waits (polls up to ~5 minutes) for it to finish, returning the completed video URL. The content source is selectable: either a website/PDF URL or custom text, and the matching field is required for the chosen source. Requires host and guest names; optional voices, theme, language, duration, and tone shape the output. Each call starts a new generation job, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content_source` | string | yes |  | Content Source. Choose the source of content for the podcast. One of `"url"`, `"text"`. |
| `url` | string | no |  | Website/PDF URL. URL of the website or PDF to create a podcast from. |
| `text` | string | no |  | Custom Content. Custom content for the podcast. |
| `name1` | string | yes |  | Host Name. The host name for AI Podcast. |
| `voice1` | string | no |  | Host Voice. The host voice for AI Podcast. A value the product loads from the provider, such as an id; write the value itself. |
| `name2` | string | yes |  | Guest Name. The guest name for AI Podcast. |
| `voice2` | string | no |  | Guest Voice. The guest voice for AI Podcast. A value the product loads from the provider, such as an id; write the value itself. |
| `theme` | string | no |  | Theme. To display captions with style. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. To generate video in language you want. A value the product loads from the provider, such as an id; write the value itself. |
| `duration` | string | no | `"1-2"` | Duration. Podcast Duration in minutes. One of `"1-2"`, `"3-5"`. |
| `tone` | string | no | `"Friendly"` | Tone. Tone of the Podcast. |

### `generate_ai_image`

**Generate AI Image.** Generates an AI image for an existing Vadoo character from a text prompt and waits (polls up to ~5 minutes) for it to finish, returning the completed image URL. Requires the character ID (selected from the account character list), an aspect ratio, and a prompt. Each call starts a new generation job, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Character. Select the character to generate an image for. A value the product loads from the provider, such as an id; write the value itself. |
| `ratio` | string | yes |  | Aspect Ratio. The aspect ratio for the generated image. One of `"9:16"`, `"1:1"`, `"16:9"`, `"3:4"`, `"4:3"`. |
| `prompt` | string | yes |  | Image Prompt. Prompt to generate a character image. |

### `generate_ai_captions`

**Generate AI Captions.** Adds AI-generated captions to an existing video on Vadoo and waits (polls up to ~5 minutes) for processing to finish, returning the completed captioned video URL. Requires the source video URL; optional theme and language control caption styling and language. Each call starts a new captioning job, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Video URL. URL of the input video to add captions to. |
| `theme` | string | no |  | Theme. To display captions with style. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. To generate captions in language you want. A value the product loads from the provider, such as an id; write the value itself. |
