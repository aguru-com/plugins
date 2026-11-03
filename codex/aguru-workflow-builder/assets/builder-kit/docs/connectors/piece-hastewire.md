# Hastewire

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hastewire'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [Settings](https://hastewire.com/humanizer/account/api-keys).

## Actions

### `detect-text`

**Detect Text.** Runs AI-detection on a block of text via the Hastewire API, scoring how likely it is to be AI-generated versus human-written. Choose this to classify or vet content before acting on it; it only reads/analyzes the supplied text and does not modify or store it, so repeating the same input yields the same score. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Input Text. |

### `humanize-text`

**Humanize Text.** Rewrites AI-generated text into a more human-sounding version via the Hastewire API, optionally targeting a writing style (formal, standard, or academic). Choose this to make machine-written content read naturally or to reduce AI-detection signals. Each call performs a fresh generative rewrite, so it is not idempotent and repeated calls may return different output. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Input Text. |
| `style` | string | no |  | Text Style. The desired writing style for the output. One of `"formal"`, `"standard"`, `"academic"`. |
