# EditionGuard

Secure eBook DRM and fulfillment — protect and deliver EPUB, MOBI, and PDF files with Adobe DRM, Readium LCP, or Social DRM.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-editionguard'
  version: '0.2.2'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Your EditionGuard API token.
>
> **How to get your API token:**
> 1. Log in to your [EditionGuard dashboard](https://app.editionguard.com)
> 2. Go to **Settings** (top-bar menu)
> 3. Find the **API** section and copy your **Rest API Token**

## Actions

### `send_ebook_download_links`

**Send eBook Download Links.** Creates an EditionGuard fulfillment transaction for a selected DRM-protected eBook (referenced by its resource_id) and generates protected download link(s) for a customer email. Use to deliver a purchased eBook after an order. The watermark name/email/phone inputs apply only to Social DRM (EditionMark) titles and are ignored for Adobe DRM or Readium LCP. Not idempotent: each call creates a new transaction and issues fresh links. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_id` | string | yes |  | eBook. Select the eBook to send to your customer. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_email` | string | yes |  | Customer Email. The customer's email address where the download instructions will be sent. |
| `order_number` | string | yes |  | Order Number. Your order or transaction reference number (e.g. from your eCommerce platform). Used for tracking and reporting. |
| `quantity` | number | no | `1` | Quantity. Number of download links to generate. Use 1 for a single copy. Increase for multi-seat or multi-device licenses. |
| `watermark_name` | string | no |  | Customer's Full Name (Social DRM). Only applies when the eBook uses **Social DRM (EditionMark)**. The customer's name will be embedded as a visible watermark in the eBook. Leave empty for Adobe DRM or Readium LCP books. |
| `watermark_email` | string | no |  | Customer's Email for Watermark (Social DRM). Only applies when the eBook uses **Social DRM (EditionMark)**. This email will be embedded as a watermark. Leave empty for Adobe DRM or Readium LCP books. |
| `watermark_phone` | string | no |  | Customer's Phone for Watermark (Social DRM). Only applies when the eBook uses **Social DRM (EditionMark)**. This phone number will be embedded as a watermark. Leave empty for Adobe DRM or Readium LCP books. |

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
