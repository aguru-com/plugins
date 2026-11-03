# Stable Dffusion web UI

A web interface for Stable Diffusion

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-stable-diffusion-webui'
  version: '0.1.6'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes |  | Stable Diffusion web UI API base URL. |

## Actions

### `textToImage`

**Text to Image.** Generate one or more images from a text prompt by calling a Stable Diffusion web UI (AUTOMATIC1111) txt2img endpoint, selecting the checkpoint model and optionally passing raw API parameters (sampler, steps, dimensions, etc.) as key/value overrides. Use when an agent needs to synthesize new imagery from a description against a self-hosted Stable Diffusion server. Requires the server base URL via auth and a model from the connected instance; each call produces fresh images, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. |
| `model` | string | yes |  | Model. A value the product loads from the provider, such as an id; write the value itself. |
| `advancedParameters` | object | no |  | Advanced parameters (key/value). Refer to API documentation. |
