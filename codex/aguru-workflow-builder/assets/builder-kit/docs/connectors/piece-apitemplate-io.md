# APITemplate.io

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-apitemplate-io'
  version: '0.3.1'
```

Categories: CONTENT_AND_FILES, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain your API key:
> 1. Go to https://app.apitemplate.io/.
> 2. Navigate to API Integration section.
> 3. Copy your API key.
>
> Select the region closest to your location for better performance.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `region` | string | yes | `"default"` | Region. Select your preferred API region for better performance. One of `"default"`, `"europe"`, `"us"`, `"australia"`, `"alt-default"`, `"alt-europe"`, `"alt-us"`. |
| `apiKey` | string | yes |  | API Key. Your APITemplate.io API key. |

## Actions

### `createImage`

**Create Image.** Renders a new image from a saved APITemplate.io template, merging in the supplied JSON `overrides` array to fill template objects. Requires a template ID (pick from the dropdown). Not idempotent: each call generates and stores a new image with its own transaction reference. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | JSON | yes |  | Template Data. JSON data with overrides array to populate the template. Format: {"overrides": [{"name": "object_name", "property": "value"}]}. |
| `generationDelay` | number | no |  | Generation Delay (ms). Delay in milliseconds before PDF generation. |
| `meta` | string | no |  | External Reference ID. Specify an external reference ID for your own reference. |

Output fields:

- `download_url`: Download URL (url)
- `transaction_ref`: Transaction Ref
- `total_pages`: Total Pages (number)
- `status`: Status
- `template_id`: Template ID

### `createPdfFromHtml`

**Create PDF From HTML.** Renders a new PDF directly from raw HTML (with optional CSS, templating data, and page settings such as size, orientation, margins, and headers/footers). Use when you have ad-hoc HTML markup rather than a saved template or a live URL. Requires the HTML body. Not idempotent: each call generates and stores a new PDF. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `html` | string | yes |  | HTML Content. The HTML content to convert to PDF. Can include CSS styles and external resources. |
| `css` | string | no |  | CSS Styles. Optional CSS styles to apply to the HTML content. Can include inline styles or external stylesheets. |
| `data` | JSON | no |  | Data for Templating. Optional JSON data to use for templating the HTML content. Can include variables and dynamic content. |
| `expiration` | number | no |  | Expiration (minutes). Expiration of the generated PDF in minutes. Use 0 to store permanently, or 1-10080 minutes (7 days) to specify expiration. |
| `pageSize` | string | no | `"A4"` | Page Size. PDF page size format. One of `"A4"`, `"A3"`, `"A5"`, `"Letter"`, `"Legal"`, `"Tabloid"`. |
| `orientation` | string | no | `"portrait"` | Page Orientation. PDF page orientation. One of `"portrait"`, `"landscape"`. |
| `marginTop` | number | no |  | Margin Top (mm). Top margin in millimeters. |
| `marginBottom` | number | no |  | Margin Bottom (mm). Bottom margin in millimeters. |
| `marginLeft` | number | no |  | Margin Left (mm). Left margin in millimeters. |
| `marginRight` | number | no |  | Margin Right (mm). Right margin in millimeters. |
| `printBackground` | boolean | no | `true` | Print Background. Whether to print background graphics and colors. |
| `headerFontSize` | string | no |  | Header Font Size. Font size for header (e.g., "9px") |
| `displayHeaderFooter` | boolean | no | `false` | Display Header/Footer. Whether to display header and footer. |
| `customHeader` | string | no |  | Custom Header HTML. Custom HTML content for header. |
| `customFooter` | string | no |  | Custom Footer HTML. Custom HTML content for footer. |
| `scale` | number | no |  | Scale. Scale factor for the PDF (0.1 to 2.0) |
| `waitForTimeout` | number | no |  | Wait Timeout (ms). Time to wait before generating PDF (in milliseconds) |
| `meta` | string | no |  | External Reference ID. Specify an external reference ID for your own reference. |

Output fields:

- `download_url`: Download URL (url)
- `transaction_ref`: Transaction Ref
- `total_pages`: Total Pages (number)
- `status`: Status

### `createPdfFromUrl`

**Create PDF From URL.** Renders a new PDF by loading and capturing a live webpage at the given URL, with optional page settings (size, orientation, margins), viewport sizing, full-page capture, and wait-for-selector/timeout controls for dynamic content. Use when the source is a public web page rather than supplied HTML or a saved template. Requires the URL. Not idempotent: each call generates and stores a new PDF. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The URL of the webpage to convert to PDF. |
| `expiration` | number | no |  | Expiration (minutes). Expiration of the generated PDF in minutes. Use 0 to store permanently, or 1-10080 minutes (7 days) to specify expiration. |
| `pageSize` | string | no | `"A4"` | Page Size. PDF page size format. One of `"A4"`, `"A3"`, `"A5"`, `"Letter"`, `"Legal"`, `"Tabloid"`. |
| `orientation` | string | no | `"portrait"` | Page Orientation. PDF page orientation. One of `"portrait"`, `"landscape"`. |
| `marginTop` | number | no |  | Margin Top (mm). Top margin in millimeters. |
| `marginBottom` | number | no |  | Margin Bottom (mm). Bottom margin in millimeters. |
| `marginLeft` | number | no |  | Margin Left (mm). Left margin in millimeters. |
| `marginRight` | number | no |  | Margin Right (mm). Right margin in millimeters. |
| `printBackground` | boolean | no | `true` | Print Background. Whether to print background graphics and colors. |
| `headerFontSize` | string | no |  | Header Font Size. Font size for header (e.g., "9px") |
| `displayHeaderFooter` | boolean | no | `false` | Display Header/Footer. Whether to display header and footer. |
| `customHeader` | string | no |  | Custom Header HTML. Custom HTML content for header. |
| `customFooter` | string | no |  | Custom Footer HTML. Custom HTML content for footer. |
| `scale` | number | no |  | Scale. Scale factor for the PDF (0.1 to 2.0) |
| `waitForTimeout` | number | no |  | Wait Timeout (ms). Time to wait for page to load before generating PDF (in milliseconds) |
| `waitForSelector` | string | no |  | Wait for Selector. CSS selector to wait for before generating PDF (e.g., ".content-loaded") |
| `viewportWidth` | number | no | `1920` | Viewport Width. Browser viewport width in pixels (default: 1920) |
| `viewportHeight` | number | no | `1080` | Viewport Height. Browser viewport height in pixels (default: 1080) |
| `fullPage` | boolean | no | `true` | Full Page. Capture the full scrollable page. |
| `meta` | string | no |  | External Reference ID. Specify an external reference ID for your own reference. |

Output fields:

- `download_url`: Download URL (url)
- `transaction_ref`: Transaction Ref
- `total_pages`: Total Pages (number)
- `status`: Status

### `createPdf`

**Create PDF.** Renders a new PDF from a saved APITemplate.io template, merging in the supplied JSON `overrides` array to fill template objects. Use when the layout is already designed as a template; for ad-hoc HTML or a webpage use the from-HTML or from-URL actions instead. Requires a template ID. Not idempotent: each call generates and stores a new PDF. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | JSON | yes |  | Template Data. JSON data with overrides array to populate the template. Format: {"overrides": [{"name": "object_name", "property": "value"}]}. |
| `expiration` | number | no | `0` | Expiration (minutes). Expiration of the generated PDF in minutes. Use 0 to store permanently, or 1-10080 minutes (7 days) to specify expiration. |
| `generationDelay` | number | no |  | Generation Delay (ms). Delay in milliseconds before PDF generation. |
| `meta` | string | no |  | External Reference ID. Specify an external reference ID for your own reference. |

Output fields:

- `download_url`: Download URL (url)
- `transaction_ref`: Transaction Ref
- `total_pages`: Total Pages (number)
- `status`: Status
- `template_id`: Template ID

### `deleteObject`

**Delete Object.** Permanently deletes a previously generated PDF or image, identified by its transaction reference (pick from the dropdown of recent objects). Use to clean up stored output. Idempotent in effect: once the object is gone, repeating the call leaves the same deleted state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionRef` | string | no |  | Transaction Reference. Select a transaction reference to filter objects. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `status`: Status
- `transaction_ref`: Transaction Ref

### `getAccountInformation`

**Get Account Information.** Fetches the APITemplate.io account profile, including plan and generation usage/quota stats. Use to check remaining quota or account status before generating documents. Read-only and idempotent; takes no input. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `status`: Status
- `subscription_product`: Subscription Product
- `subscription_current_period_start`: Subscription Current Period Start (datetime)
- `subscription_current_period_end`: Subscription Current Period End (datetime)
- `subscription_status`: Subscription Status
- `subscription_interval`: Subscription Interval
- `api_quota`: API Quota (number)
- `api_remaining`: API Remaining (number)
- `api_used`: API Used (number)
- `template_remaining`: Template Remaining (number)
- `template_count`: Template Count (number)
- `template_quota`: Template Quota (number)
- `message`: Message

### `listObjects`

**List Objects.** Lists previously generated PDFs and images for the account, optionally narrowed by template ID, transaction reference, date range, or external reference (meta); with no filters it returns the full recent set. Supports limit/offset pagination (max 300 per call). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `300` | Limit. Maximum number of objects to return (default: 300, max: 300) |
| `offset` | number | no | `0` | Offset. Number of objects to skip for pagination (default: 0) |
| `templateId` | string | no |  | Template ID. Filter objects by template ID (optional) |
| `transactionRef` | string | no |  | Transaction Reference. Filter by specific transaction reference (optional) |
| `dateFrom` | string | no |  | Date From. Start date for filtering (YYYY-MM-DD format, optional) |
| `dateTo` | string | no |  | Date To. End date for filtering (YYYY-MM-DD format, optional) |
| `meta` | string | no |  | Meta Filter. Filter by external reference ID (meta field) |

Output fields:

- `status`: Status
- `objects`: Objects
- `objects[].transaction_ref`: Transaction Ref
- `objects[].template_id`: Template ID
- `objects[].description`: Description
- `objects[].meta`: Meta
- `objects[].source`: Source
- `objects[].transaction_type`: Transaction Type
- `objects[].primary_url`: Primary URL (url)
- `objects[].secondary_url`: Secondary URL (url)
- `objects[].deleted_at`: Deleted At (datetime)
- `objects[].created_at`: Created At (datetime)

### `apitemplate_io_create_pdf_from_markdown`

**Create PDF From Markdown.** Renders a new PDF from raw Markdown text (with optional CSS and templating data). Use when the source is Markdown rather than a saved template, raw HTML, or a live URL. Requires the Markdown body. Not idempotent: each call generates and stores a new PDF. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `body` | string | yes |  | Markdown Content. The Markdown content to convert to PDF. |
| `css` | string | no |  | CSS Styles. Optional CSS styles to apply to the rendered Markdown. |
| `data` | JSON | no |  | Template Data. Optional JSON data to use for templating the Markdown content. |
| `expiration` | number | no | `0` | Expiration (minutes). Expiration of the generated PDF in minutes. Use 0 to store permanently, or 1-10080 minutes (7 days) to specify expiration. |
| `meta` | string | no |  | External Reference ID. Specify an external reference ID for your own reference. It appears in the list-objects response. |

Output fields:

- `download_url`: Download URL (url)
- `transaction_ref`: Transaction Ref
- `total_pages`: Total Pages (number)
- `status`: Status
- `post_actions`: Post Actions
- `post_actions[].action`: Action
- `post_actions[].name`: Name
- `post_actions[].bucket`: Bucket
- `post_actions[].status`: Status
- `post_actions[].file`: File
- `post_actions[].message`: Message
- `template_id`: Template ID

### `apitemplate_io_list_templates`

**List Templates.** Lists the PDF and image templates saved in the account, optionally narrowed by format, template ID, or group name. Use to discover a template ID before calling create-pdf/create-image, get-template, or update-template. Supports limit/offset pagination (default 300 per call). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `300` | Limit. Maximum number of templates to return (default: 300). |
| `offset` | number | no | `0` | Offset. Number of templates to skip for pagination (default: 0). |
| `format` | string | no |  | Format. Filter templates by format. One of `"PDF"`, `"JPEG"`. |
| `templateId` | string | no |  | Template ID. Filter templates by template ID. |
| `groupName` | string | no |  | Group Name. Filter templates by group name. |
| `withLayerInfo` | boolean | no | `false` | With Layer Info. Return layer information for image templates. |

Output fields:

- `status`: Status
- `templates`: Templates
- `templates[].template_id`: Template ID
- `templates[].name`: Name
- `templates[].status`: Status
- `templates[].format`: Format
- `templates[].created_at`: Created At (datetime)
- `templates[].updated_at`: Updated At (datetime)
- `templates[].group_name`: Group Name

### `apitemplate_io_get_template`

**Get Template.** Fetches the HTML body, CSS, and print settings of a single PDF template, identified by its template ID (get one from list-templates). This is an experimental vendor endpoint limited to PDF templates and may not be available on every account. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Only PDF templates are shown; this endpoint does not support image templates. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `status`: Status
- `template_id`: Template ID
- `body`: Body (html)
- `css`: CSS
- `sample_json`: Sample JSON
- `settings`: Settings

### `apitemplate_io_update_template`

**Update Template.** Updates the HTML body, CSS, and/or print settings of an existing PDF template, identified by its template ID (get one from list-templates). Any field left empty leaves the current value unchanged. This is an experimental vendor endpoint limited to PDF templates and may not be available on every account. Update-to-state, idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Only PDF templates are shown; this endpoint does not support image templates. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | no |  | HTML Body. New HTML body for the template. Leave empty to keep the current body. |
| `css` | string | no |  | CSS. New CSS for the template. Leave empty to keep the current CSS. |
| `settings` | JSON | no |  | Settings. New print settings for the template. Leave empty to keep the current settings. |

Output fields:

- `status`: Status

### `apitemplate_io_merge_pdfs`

**Merge PDFs.** Joins an ordered list of PDF URLs (normal http/https URLs or base64 data: URIs) into a single PDF, in the order given. Use after generating individual PDFs to combine them into one document. Requires at least one URL. Not idempotent: each call generates and stores a new merged PDF. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | PDF URLs. URLs of the PDFs to merge, in order. Supports http/https URLs and data: URIs. |
| `expiration` | number | no | `0` | Expiration (minutes). Expiration of the generated PDF in minutes. Use 0 to store permanently, or 1-43200 minutes (30 days) to specify expiration. |
| `meta` | string | no |  | External Reference ID. Specify an external reference ID for your own reference. It appears in the list-objects response. |

Output fields:

- `primary_url`: Primary URL (url)
- `status`: Status
- `transaction_ref`: Transaction Ref
- `total_pages`: Total Pages (number)
- `post_actions`: Post Actions
- `post_actions[].action`: Action
- `post_actions[].name`: Name
- `post_actions[].bucket`: Bucket
- `post_actions[].status`: Status
- `post_actions[].file`: File
- `post_actions[].message`: Message

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
