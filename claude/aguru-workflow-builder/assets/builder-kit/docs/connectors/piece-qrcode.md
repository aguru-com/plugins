# QR Code

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-qrcode'
  version: '0.0.18'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `text_to_qrcode`

**Text to QR Code.** Encodes a text string (URL, plain text, or any short payload) into a QR code image and returns it as a PNG file; this piece has no counterpart action for decoding or reading a QR code. Takes only the text content - no size, margin, or color options - and throws if the content exceeds the QR format's few-kilobyte capacity ceiling; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Content. |
