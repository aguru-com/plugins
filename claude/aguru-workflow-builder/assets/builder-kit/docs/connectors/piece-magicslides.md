# MagicSlides

Create PowerPoint presentations from topics, summaries, or YouTube videos using AI.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-magicslides'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **Enter your MagicSlides Access ID (API key).**
> ---
> ### How to obtain your API key
> 1. Sign up or log in at [magicslides.app](https://www.magicslides.app/).
> 2. Go to **Dashboard → API**.
> 3. Copy your **Access ID** and paste it here.
> 4. And copy your registered email address and paste it here.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessId` | string | yes |  | Access ID. Enter your MagicSlides Access ID. |
| `email` | string | yes |  | Email. Enter your registered email address. |

## Actions

### `createPptFromTopic`

**Create PPT from Topic.** Generate a new PowerPoint presentation from a short topic string using AI, with optional control over slide count, language, template, AI model, and image sourcing. Choose this when the only input is a subject line and you want the AI to research and author the deck; use the summary or YouTube variants instead when starting from existing text or a video. Each call generates a fresh presentation, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. |
| `slideCount` | number | no | `10` | Number of slides. |
| `language` | string | no | `"en"` | Language. One of `"en"`, `"hi"`, `"es"`, `"fr"`, `"de"`, `"zh"`. |
| `template` | string | no | `"bullet-point1"` | Template. One of `"bullet-point1"`, `"bullet-point2"`, `"bullet-point4"`, `"bullet-point5"`, `"bullet-point6"`, `"bullet-point7"`, `"bullet-point8"`, `"bullet-point9"`, `"bullet-point10"`, `"pitchdeckorignal"`, `"pitch-deck-2"`, `"pitch-deck-3"`, `"custom2"`, `"custom3"`, `"verticalBulletPoint1"`, `"verticalCustom1"`. |
| `model` | string | no | `"gpt-4"` | AI Model. One of `"gpt-4"`, `"gpt-3.5"`. |
| `extraInfoSource` | string | no |  | Extra Information Source. Provide a URL or text to give additional context for the presentation. |
| `aiImages` | boolean | no | `false` | Use AI Images. |
| `imageForEachSlide` | boolean | no | `true` | Image for Each Slide. |
| `googleImage` | boolean | no | `false` | Use Google Images. |
| `googleText` | boolean | no | `false` | Use Google Text. |
| `include_images` | boolean | no | `true` | Include images. |
| `presentationFor` | string | no |  | Presentation For (Audience). |
| `watermark` | JSON | no |  | Watermark. Add a watermark to the presentation. e.g., {"width": "48", "height": "48", "brandURL": "https://...png", "position": "BottomRight"}. |

### `createPptFromText`

**Create PPT from Text/Summary.** Generate a new PowerPoint presentation from a block of supplied text or summary using AI, with optional control over slide count, language, template, AI model, and image sourcing. Choose this when you already have the source content as text and want it turned into a deck, rather than the topic variant (generates from a subject line) or the YouTube variant. Each call generates a fresh presentation, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `msSummaryText` | string | yes |  | Summary Text. |
| `slideCount` | number | no | `10` | Number of Slides. |
| `language` | string | no | `"en"` | Language. One of `"en"`, `"hi"`, `"es"`, `"fr"`, `"de"`, `"zh"`. |
| `template` | string | no | `"bullet-point1"` | Template. One of `"bullet-point1"`, `"bullet-point2"`, `"bullet-point4"`, `"bullet-point5"`, `"bullet-point6"`, `"bullet-point7"`, `"bullet-point8"`, `"bullet-point9"`, `"bullet-point10"`, `"pitchdeckorignal"`, `"pitch-deck-2"`, `"pitch-deck-3"`, `"custom2"`, `"custom3"`, `"verticalBulletPoint1"`, `"verticalCustom1"`. |
| `model` | string | no | `"gpt-4"` | AI Model. One of `"gpt-4"`, `"gpt-3.5"`. |
| `aiImages` | boolean | no | `false` | Use AI Images. |
| `imageForEachSlide` | boolean | no | `true` | Image for Each Slide. |
| `googleImage` | boolean | no | `false` | Use Google Images. |
| `googleText` | boolean | no | `false` | Use Google Text. |
| `presentationFor` | string | no |  | Presentation For (Audience). |
| `watermark` | JSON | no |  | Watermark. Optional watermark e.g., {"width":"48","height":"48","brandURL":"https://...png","position":"BottomRight"}. |

### `createPptFromYoutube`

**Create PPT from YouTube Video.** Generate a new PowerPoint presentation from a YouTube video URL using AI, which extracts the video content into slides with optional control over slide count, language, template, AI model, and image sourcing. Choose this when the source material is a video; use the topic or text/summary variants when starting from a subject line or existing text. Requires a valid YouTube URL. Each call generates a fresh presentation, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `youtubeURL` | string | yes |  | YouTube Video URL. |
| `template` | string | no | `"bullet-point1"` | Template. One of `"bullet-point1"`, `"bullet-point2"`, `"bullet-point4"`, `"pitch-deck-3"`, `"pitch-deck-2"`, `"custom Dark 1"`, `"verticalBulletPoint1"`. |
| `language` | string | no | `"en"` | Language. |
| `slideCount` | number | no | `10` | Number of slides. |
| `aiImages` | boolean | no | `false` | Enable AI Images. |
| `imageForEachSlide` | boolean | no | `true` | Include Image on Every Slide. |
| `googleImage` | boolean | no | `false` | Use Google Images. |
| `googleText` | boolean | no | `false` | Enhance Content with Google Search. |
| `model` | string | no | `"gpt-4"` | AI Model. One of `"gpt-4"`, `"gpt-3.5"`. |
| `presentationFor` | string | no |  | Presentation For (Audience). |
| `watermark` | JSON | no |  | Watermark. Optional watermark e.g., {"width":"48","height":"48","brandURL":"https://...png","position":"BottomRight"}. |
