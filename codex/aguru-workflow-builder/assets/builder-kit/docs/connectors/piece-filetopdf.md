# FileToPDF

Convert files, HTML, and Markdown to PDF. Office documents (DOCX, XLSX, PPTX), images, web pages, and Markdown become clean PDFs over a simple API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-filetopdf'
  version: '0.0.9'
```

Categories: CONTENT_AND_FILES, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your FileToPDF API key (format `sk_live_...`).
>
> Get one in seconds: open [filetopdf.dev](https://filetopdf.dev) and click **Get a free API key** on the home page for an instant trial key (no account, 10 free conversions), or create one in the [dashboard](https://filetopdf.dev).

## Actions

### `convert_file`

**Convert a File.** Converts an existing document to PDF, choosing the rendering engine from the file extension (Office formats, images, HTML, Markdown, or PDF passthrough). Operates in one of two source modes: upload binary file data, or pass a public http(s) file URL the server downloads (private/internal addresses are rejected). Choose this when the agent already has a source file or its URL, rather than raw HTML/Markdown text. Not idempotent: each call performs a fresh conversion on the FileToPDF service that produces a new file and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | yes | `"file"` | Source. Convert an uploaded file or a public file URL. One of `"file"`, `"url"`. |
| `input` | object | yes |  | File. An object whose fields depend on other inputs; the product shows them. |
| `landscape` | boolean | no |  | Landscape Orientation. |
| `nativePageRanges` | string | no |  | Page Ranges. Limit output to specific pages, e.g. "1-3" or "2,5-7". |
| `pdfa` | string | no |  | PDF/A Archival Format. Produce an ISO-standardised archival PDF. One of `"PDF/A-1b"`, `"PDF/A-2b"`, `"PDF/A-3b"`. |
| `pdfua` | boolean | no |  | PDF/UA (Accessibility). |
| `password` | string | no |  | Source Document Password. Password to open a protected source document (office files only). |
| `userPassword` | string | no |  | Output Open Password. Encrypt the resulting PDF; this password is required to open it. |
| `ownerPassword` | string | no |  | Output Permissions Password. Restrict editing/printing of the resulting PDF. |

### `convert_html`

**Convert HTML.** Renders a raw HTML string (with optional injected CSS) to PDF via Chromium. Choose this when the agent holds HTML markup it generated or assembled in memory, rather than a file or URL. Requires the HTML content as input. Not idempotent: each call performs a fresh remote render on the FileToPDF service that produces a new file and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `html` | string | yes |  | HTML. The HTML markup to render. |
| `css` | string | no |  | CSS. Optional CSS, injected into the document head. |
| `landscape` | boolean | no |  | Landscape Orientation. |
| `paperWidth` | number | no |  | Paper Width (Inches). Default 8.5 (Letter). A4 is 8.27. |
| `paperHeight` | number | no |  | Paper Height (Inches). Default 11 (Letter). A4 is 11.7. |
| `marginTop` | number | no |  | Margin Top (Inches). |
| `marginBottom` | number | no |  | Margin Bottom (Inches). |
| `marginLeft` | number | no |  | Margin Left (Inches). |
| `marginRight` | number | no |  | Margin Right (Inches). |
| `scale` | number | no |  | Scale. Render scale, e.g. 0.8 to shrink content. Default 1. |
| `printBackground` | boolean | no |  | Print Background Graphics. |
| `preferCssPageSize` | boolean | no |  | Prefer CSS @page Size. |
| `nativePageRanges` | string | no |  | Page Ranges. Limit output to specific pages, e.g. "1-3" or "2,5-7". |
| `pdfa` | string | no |  | PDF/A Archival Format. Produce an ISO-standardised archival PDF. One of `"PDF/A-1b"`, `"PDF/A-2b"`, `"PDF/A-3b"`. |
| `pdfua` | boolean | no |  | PDF/UA (Accessibility). |
| `userPassword` | string | no |  | Output Open Password. Encrypt the resulting PDF; this password is required to open it. |
| `ownerPassword` | string | no |  | Output Permissions Password. Restrict editing/printing of the resulting PDF. |

### `convert_markdown`

**Convert Markdown.** Renders a raw Markdown string to PDF, applying a default stylesheet when no CSS is supplied (custom CSS overrides it). Choose this when the agent holds Markdown text it generated or assembled in memory, rather than a file, URL, or HTML. Requires the Markdown content as input. Not idempotent: each call performs a fresh remote render on the FileToPDF service that produces a new file and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `markdown` | string | yes |  | Markdown. The Markdown content to render. |
| `css` | string | no |  | CSS. Optional CSS to style the rendered Markdown. Overrides the default stylesheet. |
| `landscape` | boolean | no |  | Landscape Orientation. |
| `paperWidth` | number | no |  | Paper Width (Inches). Default 8.5 (Letter). A4 is 8.27. |
| `paperHeight` | number | no |  | Paper Height (Inches). Default 11 (Letter). A4 is 11.7. |
| `marginTop` | number | no |  | Margin Top (Inches). |
| `marginBottom` | number | no |  | Margin Bottom (Inches). |
| `marginLeft` | number | no |  | Margin Left (Inches). |
| `marginRight` | number | no |  | Margin Right (Inches). |
| `scale` | number | no |  | Scale. Render scale, e.g. 0.8 to shrink content. Default 1. |
| `printBackground` | boolean | no |  | Print Background Graphics. |
| `preferCssPageSize` | boolean | no |  | Prefer CSS @page Size. |
| `nativePageRanges` | string | no |  | Page Ranges. Limit output to specific pages, e.g. "1-3" or "2,5-7". |
| `pdfa` | string | no |  | PDF/A Archival Format. Produce an ISO-standardised archival PDF. One of `"PDF/A-1b"`, `"PDF/A-2b"`, `"PDF/A-3b"`. |
| `pdfua` | boolean | no |  | PDF/UA (Accessibility). |
| `userPassword` | string | no |  | Output Open Password. Encrypt the resulting PDF; this password is required to open it. |
| `ownerPassword` | string | no |  | Output Permissions Password. Restrict editing/printing of the resulting PDF. |

### `get_account`

**Get Account Status.** Fetches the FileToPDF workspace account status: plan, remaining credits, and subscription status. Use this to check available credits before queuing conversion calls or to report quota. Read-only and free — never consumes credits; idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.
