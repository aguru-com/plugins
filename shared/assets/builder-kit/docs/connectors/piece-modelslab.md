# ModelsLab

ModelsLab is a developer-first AI API platform for text-to-image generation, video creation, voice cloning, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-modelslab'
  version: '0.0.5'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Get your API key at https://modelslab.com/account/api-key

## Actions

### `text-to-image`

**Text to Image.** Generates one or more images from a natural-language text prompt via the ModelsLab text-to-image API; use it to synthesize new artwork rather than edit or fetch existing images. Optionally control the diffusion model, dimensions, sample count, and a seed. Not idempotent: each call submits a fresh generation request and returns newly created images (with the default seed of -1 results vary even for an identical prompt); it also polls until the asynchronous job completes. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. The text prompt to generate an image from. |
| `negative_prompt` | string | no |  | Negative Prompt. Things to exclude from the image. |
| `model_id` | string | no |  | Model. The model to use for image generation. One of `"flux"`, `"sdxl"`, `"stable-diffusion-2-1"`, `"realistic-vision-v5"`, `"dream-shaper-8797"`. |
| `width` | number | no | `512` | Width. Image width in pixels (256–1024, divisible by 8). |
| `height` | number | no | `512` | Height. Image height in pixels (256–1024, divisible by 8). |
| `num_inference_steps` | number | no | `30` | Steps. Number of inference steps (20–50). |
| `guidance_scale` | number | no | `7.5` | Guidance Scale. How closely the image follows the prompt (1–20). |
| `samples` | number | no | `1` | Samples. Number of images to generate (1–4). |
| `seed` | number | no | `-1` | Seed. Random seed for reproducibility (-1 for random). |
| `safety_checker` | boolean | no | `true` | Safety Checker. Enable safety filter. |
