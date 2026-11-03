# Barcode Lookup

Lookup product information by barcode number

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-barcode-lookup'
  version: '0.0.9'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API Key for Barcode Lookup

## Actions

### `searchByBarcode`

**Search By Barcode.** Looks up product information from the Barcode Lookup API for a single barcode/UPC/EAN number. Use it to resolve a barcode into product details such as name, brand, and category. Requires the exact barcode number as input; this is a read-only lookup that is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `barcode` | string | yes |  | Barcode. The barcode/UPC/EAN number to search for. |
| `formatted` | boolean | no | `true` | Formatted Output. Return results in a clean, easy to read format. |
