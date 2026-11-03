# Photoroom

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-photoroom'
  version: '0.1.9'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API key. |

## Actions

### `removeBackground`

**Remove background.** Removes the background from an input image using the Photoroom segmentation API and writes the cutout to a file. Choose this to isolate a subject or produce a transparent-background version of a photo. Requires the raw image as a file input plus a filename for the generated output. Not idempotent: each call performs a fresh server-side segmentation that produces a new file and consumes Photoroom account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Image file. Files are not supported; an action that needs one fails. |
| `filename` | string | yes |  | Generated filename. |
