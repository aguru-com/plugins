# Stability AI

Generative AI video model based on the image model Stable Diffusion.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-stability-ai'
  version: '0.3.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Please visit https://platform.stability.ai/docs/getting-started/authentication to get your API Key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_key` | string | yes |  | API Key. |

## Actions

### `text-to-image`

**Text to Image.** Generates one or more images from a text prompt using a Stable Diffusion engine (selectable via the required Engine ID, e.g. SDXL or older v1/v2 models). Use to create original imagery from a description; optionally steer output with a style preset, dimensions, sampling steps, and prompt-adherence (cfg_scale). Not idempotent: each call invokes the generative model and returns fresh images, so repeating the same input yields different results. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. The text to transform in image. |
| `cfg_scale` | number | no | `7` | cfg_scale. How strictly the diffusion process adheres to the prompt text (higher values keep your image closer to your prompt) (MIN:0; MAX:35) |
| `height` | number | no |  | height. Height of the image in pixels. Must be in increments of 64 and >= 128. |
| `width` | number | no |  | width. Width of the image in pixels. Must be in increments of 64 and >= 128. |
| `samples` | string | no |  | samples. Number of images to generate (MAX:10) |
| `steps` | number | no |  | steps. Number of diffusion steps to run (MIN:10; MAX:150) |
| `weight` | number | no | `1` | weight. |
| `clip_guidance_preset` | string | no |  | clip_guidance_preset. One of `"NONE"`, `"FAST_BLUE"`, `"FAST_GREEN"`, `"SIMPLE"`, `"SLOW"`, `"SLOWER"`, `"SLOWEST"`. |
| `style_preset` | string | no |  | style_preset. Pass in a style preset to guide the image model towards a particular style. One of `"enhance"`, `"anime"`, `"photographic"`, `"digital-art"`, `"comic-book"`, `"fantasy-art"`, `"line-art"`, `"analog-film"`, `"neon-punk"`, `"isometric"`, `"low-poly"`, `"origami"`, `"modeling-compound"`, `"cinematic"`, `"3d-model"`, `"pixel-art"`, `"tile-texture"`. |
| `engine_id` | string | yes |  | Engine ID. One of `"stable-diffusion-xl-1024-v1-0"`, `"stable-diffusion-768-v2-1"`, `"stable-diffusion-512-v2-1"`, `"stable-diffusion-768-v2-0"`, `"stable-diffusion-512-v2-0"`, `"stable-diffusion-v1-5"`, `"stable-diffusion-v1"`. |

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
