# Predis.ai

AI-powered social media content creation platform. Generate posts, videos, carousels, images, quotes, and memes with automated creation and webhook notifications.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-predis-ai'
  version: '0.0.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> In Predis.ai, go to Pricing & Account -> Rest API to generate an API key.

## Actions

### `create_content`

**Create Content.** Generates social media content (single image, carousel, video, quote, or meme) on Predis.ai from a text topic for a given brand. Use to produce ready-to-post creatives; the media type, post type, model version, languages, and quantity (1-10 posts) are configurable. Requires a Predis.ai brand_id and a topic of at least 20 characters and 3 words. Not idempotent: each call kicks off a new generation job and produces new posts. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brand_id` | string | yes |  | Brand ID. Unique identifier of your brand. Find it in Predis.ai under your brand settings. |
| `text` | string | yes |  | Topic. The topic for your post. Must be at least 20 characters and 3 words. |
| `model_version` | string | no | `"4"` | Model Version. Version 4 offers higher quality but only supports single_image and carousel. One of `"4"`, `"2"`. |
| `media_type` | string | no | `"single_image"` | Media Type. Type of media to generate. Video is only supported by model version 2. One of `"single_image"`, `"carousel"`, `"video"`. |
| `post_type` | string | no | `"generic"` | Post Type. Type of post to generate. Only supported by model version 2. One of `"generic"`, `"meme"`, `"quotes"`. |
| `n_posts` | number | no | `1` | Number of Posts. Number of posts to generate (1-10). |
| `input_language` | string | no | `"english"` | Input Language. Language of your input text. One of `"english"`, `"malay"`, `"chinese (traditional)"`, `"croatian"`, `"dutch"`, `"indonesian"`, `"vietnamese"`, `"portuguese_br"`, `"finnish"`, `"french"`, `"german"`, `"italian"`, `"norwegian"`, `"polish"`, `"romanian"`, `"czech"`, `"spanish"`, `"swedish"`, `"turkish"`, `"danish"`, `"hungarian"`. |
| `output_language` | string | no | `"english"` | Output Language. Language for the generated post. One of `"english"`, `"malay"`, `"chinese (traditional)"`, `"croatian"`, `"dutch"`, `"indonesian"`, `"vietnamese"`, `"portuguese_br"`, `"finnish"`, `"french"`, `"german"`, `"italian"`, `"norwegian"`, `"polish"`, `"romanian"`, `"czech"`, `"spanish"`, `"swedish"`, `"turkish"`, `"danish"`, `"hungarian"`. |
| `video_duration` | string | no |  | Video Duration. Required when media type is video. One of `"short"`, `"long"`. |
| `color_palette_type` | string | no | `"ai_suggested"` | Color Palette. Color palette for generated content. One of `"ai_suggested"`, `"brand"`. |
| `author` | string | no |  | Author. Author name. Required when post type is quotes. |
| `template_ids` | array | no |  | Template IDs. List of template IDs to use. Only supported by model version 2. |
| `media_urls` | array | no |  | Media URLs. List of image/video URLs to use in your post. Only supported by model version 2. |
