# JoggAI

AI-powered content creation platform for generating avatar photos, videos, and product content using advanced AI technology.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-jogg-ai'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Jogg AI API Key

## Actions

### `createAiAvatarPhoto`

**Create AI Avatar Photo.** Generates a brand-new AI avatar photo on JoggAI from specified traits (age, gender, style, ethnicity, aspect ratio, model) plus optional appearance/background text or a reference image URL. Use to produce an avatar still image for downstream avatar-video creation. Not idempotent: each call generates and is billed for a new photo. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `age` | string | yes |  | Age. The age group for the avatar. One of `"Teenager"`, `"Young adult"`, `"Adult"`, `"Elderly"`. |
| `appearance` | string | no |  | Appearance. Description of the appearance. |
| `aspect_ratio` | string | yes |  | Aspect Ratio. Photo aspect ratio. One of `0`, `1`. |
| `avatar_style` | string | yes |  | Avatar Style. Style of the avatar. One of `"Professional"`, `"Social"`. |
| `background` | string | no |  | Background. Description of the background. |
| `ethnicity` | string | no |  | Ethnicity. The ethnicity for the avatar. One of `"European"`, `"African"`, `"South Asian"`, `"East Asian"`, `"Middle Eastern"`, `"South American"`, `"North American"`. |
| `gender` | string | yes |  | Gender. The gender for the avatar. One of `"Female"`, `"Male"`. |
| `image_url` | string | no |  | Image URL. URL of an existing image to use as reference. |
| `model` | string | yes |  | Model. The AI model to use. One of `"classic"`, `"modern"`. |

### `createAvatarVideo`

**Create Avatar Video.** Starts generation of a talking-avatar video on JoggAI from a chosen avatar and voice, with the speech sourced either from a typed script OR from an audio URL (exactly one is required, never both). Use to turn a script or voiceover into a narrated avatar video; the call kicks off an async job whose output is polled via Get Generated Video or received through the video-generation triggers. Not idempotent: each call queues and is billed for a new video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `screen_style` | string | yes |  | Screen Style. Background style. One of `1`, `2`, `3`. |
| `avatar_id` | string | yes |  | Avatar. Select an avatar to use. A value the product loads from the provider, such as an id; write the value itself. |
| `avatar_type` | string | yes |  | Avatar Type. Source type of the avatar. One of `0`, `1`. |
| `voice_id` | string | yes |  | Voice. Select a voice to use. A value the product loads from the provider, such as an id; write the value itself. |
| `script` | string | no |  | Script. Script content for the avatar to speak. Must provide either script or audio_url. |
| `audio_url` | string | no |  | Audio URL. URL for audio. Must provide either script or audio_url. |
| `aspect_ratio` | string | no | `0` | Aspect Ratio. Aspect ratio of the output video. One of `0`, `1`, `2`. |
| `caption` | boolean | no | `true` | Caption. Enable subtitles. |
| `video_name` | string | no |  | Video Name. Name of the generated video. |

### `createProductFromUrl`

**Create Product from URL.** Creates a JoggAI product by crawling a single product page URL and extracting its details automatically. Use when you have only a product page link and want JoggAI to derive the product info for you; choose Create Product from Product Info instead when you already have the name, description, or media to supply directly. Not idempotent: each call creates a new product record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Product URL. URL of the product to crawl and extract information from. |

### `createProductFromProductInfo`

**Create Product from Product Info.** Creates a JoggAI product from supplied details (name, description, target audience, and media items) and/or a product URL. Use when you already hold the product info to pass directly; at least one of a URL or some product info must be provided, otherwise the call is rejected. Not idempotent: each call creates a new product record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | no |  | Product URL. URL of the product to crawl for information. |
| `name` | string | no |  | Product Name. Name of the product. |
| `description` | string | no |  | Product Description. Product introduction and selling points. |
| `target_audience` | string | no |  | Target Audience. Target audience for the product. |
| `media` | array | no |  | Media. Media resources for the product. Each item: { `type`, `name`, `url`, `description`? }. |

### `updateProductInfo`

**Update Product Info.** Updates an existing JoggAI product identified by its product_id, overwriting any supplied fields (name, description, target audience, media); supplied media replaces the product’s existing media rather than appending. Use to modify a product you already created; requires the product_id and at least one field to change. Idempotent: re-sending the same fields leaves the product in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | string | yes |  | Product ID. Product ID obtained from product creation. |
| `name` | string | no |  | Product Name. Updated product name. |
| `description` | string | no |  | Product Description. Updated product description. |
| `target_audience` | string | no |  | Target Audience. Updated target audience for the product. |
| `media` | array | no |  | Media. Updated media resources for the product (replaces existing media) Each item: { `type`, `name`, `url`, `description`? }. |

### `getGeneratedVideo`

**Get Generated Video.** Retrieves the current status and details of a JoggAI video project by its project_id. Use to poll an in-progress avatar/template video generation job for completion or to fetch the finished video URL. Idempotent: a read-only lookup with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. The ID of the project to retrieve information for. |

### `uploadMedia`

**Upload Media.** Requests a signed upload URL from JoggAI for a given filename (must include a file extension and no special characters); the caller then PUTs the actual file bytes to the returned sign_url. Use as the first step to get media into JoggAI before referencing it in product or video actions. Not idempotent: each call mints a new signed upload target. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filename` | string | yes |  | Filename. Name of the file to upload with extension (e.g., "image.jpg", "video.mp4") |

### `createVideoFromTemplate`

**Create Video from Template.** Starts generation of a JoggAI video from a template, choosing the template from either the common library or the user’s own templates, and filling in template variables (text/script content or image/video URLs) plus optional avatar, voice, captions, and music. Use to render a video off a predefined template rather than building one from scratch; the call queues an async job whose output is polled via Get Generated Video. Not idempotent: each call queues and is billed for a new video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_type` | string | yes |  | Template Type. Template source type. One of `"common"`, `"user"`. |
| `template_id` | string | yes |  | Template. Select a template to use. A value the product loads from the provider, such as an id; write the value itself. |
| `lang` | string | yes | `"english"` | Language. Language for text-to-speech conversion. |
| `variables` | array | no |  | Variables. Variables to replace in the template. Each item: { `type`, `name`, `content`?, `url`? }. |
| `avatar_type` | string | no |  | Avatar Type. Source type of the avatar. One of `0`, `1`. |
| `avatar_id` | string | no |  | Avatar. Select an avatar to use. A value the product loads from the provider, such as an id; write the value itself. |
| `voice_id` | string | no |  | Voice ID. Voice ID for text-to-speech (optional) |
| `caption` | boolean | no | `true` | Enable Captions. Whether to enable captions. |
| `music_id` | number | no |  | Music ID. Background music ID (optional) |
| `video_name` | string | no |  | Video Name. Name of the generated video (optional) |
