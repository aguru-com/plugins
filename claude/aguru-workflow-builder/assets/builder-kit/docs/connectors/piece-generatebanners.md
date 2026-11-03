# GenerateBanners

Image generation API for banners and social media posts

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-generatebanners'
  version: '0.4.7'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> To obtain your GenerateBanners public and secret API Keys, you can follow the steps below:
>
> 1. Go to the [GenerateBanners homepage](https://www.generatebanners.com/).
> 2. Sign up or log in into your account.
> 3. Go to your [account page](https://www.generatebanners.com/app/account).
> 4. The public and secret API keys are now displayed, copy them one by one into the right Activepieces fields.

## Actions

### `render_template`

**Render Template.** Renders a GenerateBanners design template into an image or document and returns a signed URL to the generated file. Choose a template by id, pick the output file type (jpg, png, or pdf), and supply values for the template's variable fields to fill in dynamic text. Use this to produce banners, social posts, or PDFs from a predefined template. Read-only/idempotent: the same template id, file type, and variable values always yield the same rendered output with no extra side effect. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template. A value the product loads from the provider, such as an id; write the value itself. |
| `filetype` | string | yes | `"jpg"` | File type. One of `"jpg"`, `"png"`, `"pdf"`. |
| `variables` | object | yes |  | Variables. An object whose fields depend on other inputs; the product shows them. |
