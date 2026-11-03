# PolyDoc

Convert HTML or a URL to PDF, capture screenshots, and generate EU e-invoices (Factur-X / ZUGFeRD).

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-polydoc'
  version: '0.1.1'
```

Categories: CONTENT_AND_FILES, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Get an API key from the PolyDoc dashboard (dashboard.polydoc.tech, API Keys). It is sent as Authorization: Bearer <key>.
>
> Turn on **Sandbox** to test against sandbox quota (output is watermarked). Leave it off for production conversions.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Your PolyDoc API key from dashboard.polydoc.tech. |
| `sandbox` | boolean | no | `false` | Sandbox. Use sandbox quota (watermarked output). |

## Actions

### `convert_to_pdf`

**Convert to PDF.** Converts a URL, an inline HTML string, or a saved PolyDoc template into a PDF and returns the file (or delivers it to cloud storage / a webhook). Use it to render documents like invoices, reports, or contracts. Not idempotent: each call performs a fresh conversion on PolyDoc that produces a new file and consumes account credits, and the cloud-storage and webhook delivery modes send the file to an external destination. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceType` | string | yes | `"url"` | Source Type. Where the content comes from. One of `"url"`, `"html"`, `"template"`. |
| `source` | string | yes |  | Source. The URL, inline HTML, or saved template ID, matching the Source Type above. |
| `templateData` | JSON | no | `{}` | Template Data. Data passed to the Liquid template renderer (used only when Source Type is Template). |
| `format` | string | no | `"A4"` | Page Format. One of `"A3"`, `"A4"`, `"A5"`, `"Ledger"`, `"Legal"`, `"Letter"`, `"Tabloid"`. |
| `landscape` | boolean | no | `false` | Landscape. |
| `printBackground` | boolean | no | `true` | Print Background. Print background graphics and colors. |
| `scale` | number | no |  | Scale. Render scale (0.1 to 2). |
| `pageRanges` | string | no |  | Page Ranges. Pages to include, e.g. "1-5, 8". Empty means all pages. |
| `outline` | boolean | no | `false` | Outline (Bookmarks). Generate PDF bookmarks from HTML headings. |
| `tagged` | boolean | no | `false` | Tagged (Accessible). Produce a tagged, accessible PDF. |
| `marginTop` | string | no |  | Margin Top. Top margin with optional unit, e.g. 10mm, 1cm, 0.5in. |
| `marginRight` | string | no |  | Margin Right. |
| `marginBottom` | string | no |  | Margin Bottom. |
| `marginLeft` | string | no |  | Margin Left. |
| `deliveryMode` | string | yes | `"download"` | Delivery. How the generated file is returned. One of `"download"`, `"cloudStorage"`, `"webhook"`. |
| `presignedUrl` | string | no |  | Presigned URL. HTTP PUT presigned URL from your storage provider (required for Cloud Storage delivery). |
| `webhookUrl` | string | no |  | Webhook URL. URL the generated file is delivered to (required for Webhook delivery). |
| `webhookOptions` | JSON | no | `{}` | Webhook Options. Extra webhook settings merged with the URL: async, method, headers, retries, retryDelay, timeout. |
| `filename` | string | no |  | Filename. Output filename (overrides the default). |
| `tag` | string | no |  | Tag. Label for logging and analytics (max 30 characters). |
| `timeout` | number | no |  | Timeout (ms). Conversion timeout in milliseconds. |
| `advanced` | JSON | no | `{}` | Advanced (JSON). Raw fields deep-merged into the request body for any API option not exposed above (e.g. pdf.watermark, pdf.pdfa, render, request). |

### `capture_screenshot`

**Capture Screenshot.** Captures a screenshot (PNG, JPEG, or WebP) of a URL, an inline HTML string, or a saved PolyDoc template. Supports full-page capture, custom viewport, and base64 or file output. Not idempotent: each call performs a fresh capture on PolyDoc that produces a new file and consumes account credits, and a URL capture reflects the page as it is at capture time. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceType` | string | yes | `"url"` | Source Type. Where the content comes from. One of `"url"`, `"html"`, `"template"`. |
| `source` | string | yes |  | Source. The URL, inline HTML, or saved template ID, matching the Source Type above. |
| `templateData` | JSON | no | `{}` | Template Data. Data passed to the Liquid template renderer (used only when Source Type is Template). |
| `imageType` | string | no | `"png"` | Image Type. One of `"png"`, `"jpeg"`, `"webp"`. |
| `fullPage` | boolean | no | `false` | Full Page. Capture the entire scrollable page. |
| `quality` | number | no |  | Quality. Compression quality for JPEG/WebP (0 to 100). |
| `viewportWidth` | number | no |  | Viewport Width. Viewport width in CSS pixels. |
| `viewportHeight` | number | no |  | Viewport Height. Viewport height in CSS pixels. |
| `devicePixelRatio` | number | no |  | Device Pixel Ratio. Device pixel ratio, e.g. 2 for retina (0 to 10). |
| `outputEncoding` | string | no | `"binaryFile"` | Output. Return the image as a file (default) or as a base64 string. One of `"binaryFile"`, `"base64"`. |
| `deliveryMode` | string | yes | `"download"` | Delivery. How the generated file is returned. One of `"download"`, `"cloudStorage"`, `"webhook"`. |
| `presignedUrl` | string | no |  | Presigned URL. HTTP PUT presigned URL from your storage provider (required for Cloud Storage delivery). |
| `webhookUrl` | string | no |  | Webhook URL. URL the generated file is delivered to (required for Webhook delivery). |
| `webhookOptions` | JSON | no | `{}` | Webhook Options. Extra webhook settings merged with the URL: async, method, headers, retries, retryDelay, timeout. |
| `filename` | string | no |  | Filename. Output filename (overrides the default). |
| `tag` | string | no |  | Tag. Label for logging and analytics (max 30 characters). |
| `timeout` | number | no |  | Timeout (ms). Conversion timeout in milliseconds. |
| `advanced` | JSON | no | `{}` | Advanced (JSON). Raw fields deep-merged into the request body for any API option not exposed above (e.g. pdf.watermark, pdf.pdfa, render, request). |

### `generate_einvoice`

**Generate E-Invoice.** Generates a hybrid e-invoice PDF (Factur-X / ZUGFeRD, EN 16931) by embedding structured invoice XML into a visual PDF layout. EN 16931 requires payment terms or a due date, a seller tax ID for VAT category S, and consistent totals. Not idempotent: each call performs a fresh generation on PolyDoc that produces a new file and consumes account credits, and the cloud-storage and webhook delivery modes send the file to an external destination. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceType` | string | yes | `"html"` | Source Type. Where the content comes from. One of `"url"`, `"html"`, `"template"`. |
| `source` | string | yes |  | Source. The URL, inline HTML, or saved template ID, matching the Source Type above. |
| `templateData` | JSON | no | `{}` | Template Data. Data passed to the Liquid template renderer (used only when Source Type is Template). |
| `standard` | string | yes | `"zugferd"` | Standard. The hybrid e-invoice standard to embed. One of `"zugferd"`, `"facturx"`. |
| `profile` | string | yes | `"en16931"` | Profile. The data granularity profile to validate against. One of `"minimum"`, `"basicwl"`, `"basic"`, `"en16931"`, `"extended"`. |
| `invoice` | JSON | yes | `{"number":"INV-001","issueDate":"2026-01-31","dueDate":"2026-03-02","currencyCode":"EUR","seller":{"name":"Your Company GmbH","address":{"line1":"Main St 1","city":"Berlin","postalCode":"10115","countryCode":"DE"},"taxId":"DE123456789"},"buyer":{"name":"Customer SARL","address":{"line1":"Rue 2","city":"Paris","postalCode":"75001","countryCode":"FR"}},"lines":[{"description":"Widget","quantity":2,"unitPrice":10,"lineTotal":20,"vatRate":19,"vatCategoryCode":"S"}],"taxSummary":[{"categoryCode":"S","rate":19,"taxableAmount":20,"taxAmount":3.8}],"paymentTerms":"Net 30 days","totalNetAmount":20,"totalTaxAmount":3.8,"totalGrossAmount":23.8}` | Invoice Data. Structured invoice data: number, dates, currency, seller, buyer, lines, totals. EN 16931 needs payment terms (or due date), seller taxId for VAT category S, and consistent totals. See docs.polydoc.tech. |
| `verify` | boolean | no | `false` | Verify. Validate PDF/A and e-invoice compliance (returns an error if it fails). |
| `deliveryMode` | string | yes | `"download"` | Delivery. How the generated file is returned. One of `"download"`, `"cloudStorage"`, `"webhook"`. |
| `presignedUrl` | string | no |  | Presigned URL. HTTP PUT presigned URL from your storage provider (required for Cloud Storage delivery). |
| `webhookUrl` | string | no |  | Webhook URL. URL the generated file is delivered to (required for Webhook delivery). |
| `webhookOptions` | JSON | no | `{}` | Webhook Options. Extra webhook settings merged with the URL: async, method, headers, retries, retryDelay, timeout. |
| `filename` | string | no |  | Filename. Output filename (overrides the default). |
| `tag` | string | no |  | Tag. Label for logging and analytics (max 30 characters). |
| `timeout` | number | no |  | Timeout (ms). Conversion timeout in milliseconds. |
| `advanced` | JSON | no | `{}` | Advanced (JSON). Raw fields deep-merged into the request body for any API option not exposed above (e.g. pdf.watermark, pdf.pdfa, render, request). |

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
