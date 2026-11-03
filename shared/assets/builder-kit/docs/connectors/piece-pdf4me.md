# PDF4me

Convert, merge, split, compress, and protect PDF documents.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pdf4me'
  version: '0.1.0'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your PDF4me API key:
> 1. Go to your [API Keys dashboard](https://dev.pdf4me.com/dashboard/#/api-keys/)
> 2. Sign in or create a free account if you don't have one
> 3. Copy your API key and paste it here

## Actions

### `convert_to_pdf`

**Convert File to PDF.** Converts a single office or image file (DOCX/DOC, XLSX/XLS, PPTX/PPT, PNG/JPG/GIF/BMP/TIFF) into a PDF via the PDF4me API. Use when an agent needs a non-PDF document rendered as PDF; the input file is required. A pure conversion that is idempotent — the same input always yields the same PDF with no stored side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to convert. Supported formats: DOCX, DOC, XLSX, XLS, PPTX, PPT, PNG, JPG, JPEG, GIF, BMP, TIFF. Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | Output Filename. Name for the resulting PDF file (without the .pdf extension). Defaults to the original filename. |

### `merge_pdfs`

**Merge PDF Files.** Merges two PDF files into one combined PDF via the PDF4me API, with the first file placed before the second. Use when an agent needs to concatenate two PDFs into a single document; both PDF files are required. A pure transformation that is idempotent — the same inputs always produce the same merged PDF with no stored side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file1` | file | yes |  | First PDF File. The first PDF file to merge. It will appear first in the merged result. Files are not supported; an action that needs one fails. |
| `file2` | file | yes |  | Second PDF File. The second PDF file to merge. Files are not supported; an action that needs one fails. |
| `filename` | string | no | `"merged"` | Output Filename. Name for the merged PDF file (without the .pdf extension). |

### `split_pdf`

**Split PDF.** Splits a PDF into multiple documents via the PDF4me API using one of four strategies selected by the Split Strategy prop: split after a given page, recurring split every N pages, split by a sequence of page counts, or split by custom ranges; the numeric prop controls the chosen strategy. Use when an agent needs to break one PDF into parts. The PDF file is required. A pure transformation that is idempotent — the same input and settings always produce the same parts with no stored side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. The PDF file to split. Files are not supported; an action that needs one fails. |
| `splitAction` | string | yes | `"SplitAfterPage"` | Split Strategy. How the PDF should be split. One of `"SplitAfterPage"`, `"RecurringSplitAfterPage"`, `"SplitSequence"`, `"SplitRanges"`. |
| `splitSettings` | object | yes |  | Split Settings. An object whose fields depend on other inputs; the product shows them. |

### `compress_pdf`

**Compress PDF.** Reduces the size of a PDF via the PDF4me Optimize API, with an optional compression profile that trades size against quality (web, print, grayscale, or aggressive-maximum modes). Use when an agent needs to shrink a PDF for storage or delivery; the PDF file is required. A pure transformation that is idempotent — the same input and profile always yield the same optimized PDF with no stored side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. The PDF file to compress. Files are not supported; an action that needs one fails. |
| `optimizeProfile` | string | no | `"Default"` | Compression Profile. Controls the trade-off between file size and output quality. One of `"Default"`, `"Web"`, `"WebMax"`, `"Print"`, `"PrintMax"`, `"PrintGray"`, `"Compress"`, `"CompressMax"`, `"Max"`. |

### `protect_pdf`

**Protect PDF with Password.** Encrypts a PDF with an open password via the PDF4me Protect API, optionally restricting permissions (copy, annotate, fill forms, print, etc.). Use when an agent needs to password-protect a PDF before sharing; the PDF file and password are required. A pure transformation that is idempotent — the same input, password, and permission setting always produce an equivalently protected PDF with no stored side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. The PDF file to protect with a password. Files are not supported; an action that needs one fails. |
| `password` | string | yes |  | Password. The password users will need to open the protected PDF. |
| `pdfPermission` | string | no | `"All"` | PDF Permissions. Permissions granted to users who open the protected PDF. One of `"All"`, `"None"`, `"Copy"`, `"Annotate"`, `"Fill Forms"`, `"Support Disabilities"`, `"Assemble"`, `"Digital Print"`. |

### `pdf_to_word`

**Convert PDF to Word.** Converts a PDF into an editable Word (DOCX) document via the PDF4me API, with a quality mode (Draft for one-call processing vs. High per-page processing) and optional OCR for scanned/image-based PDFs. Use when an agent needs the text of a PDF as an editable Word file; the PDF file is required, and setting the correct document language improves OCR accuracy. A pure conversion that is idempotent — the same input and settings always yield the same DOCX with no stored side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. The PDF file to convert to Word format. Files are not supported; an action that needs one fails. |
| `qualityType` | string | no | `"Draft"` | Conversion Quality. Draft processes the entire file in one API call. High uses per-page processing — best for scanned or image-heavy PDFs. One of `"Draft"`, `"High"`. |
| `language` | string | no | `"English"` | Document Language. Language of the text in the PDF. Used to improve OCR accuracy. One of `"English"`, `"French"`, `"German"`, `"Spanish"`, `"Italian"`, `"Portuguese"`, `"Dutch"`, `"Russian"`, `"Chinese"`, `"Japanese"`, `"Korean"`, `"Arabic"`, `"Hindi"`, `"Turkish"`, `"Polish"`, `"Swedish"`, `"Danish"`, `"Norwegian"`, `"Finnish"`, `"Czech"`. |
| `mergeAllSheets` | boolean | no | `false` | Merge All Sheets. Merge all pages into a single Word document sheet. |
| `ocrWhenNeeded` | boolean | no | `false` | Enable OCR for Scanned PDFs. Automatically apply OCR when the PDF contains scanned images instead of selectable text. |

### `pdf_to_image`

**Convert PDF to Image.** Renders selected pages of a PDF as images via the PDF4me API; the page selection accepts a single page, a comma list, a range, or "all", and the output format (PNG, JPG, TIFF, BMP) and width in pixels are configurable. Use when an agent needs a rasterized image of PDF pages rather than the PDF itself; the PDF file is required. A pure transformation that is idempotent — the same input and settings always produce the same image(s) with no stored side effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. The PDF file to convert to an image. Files are not supported; an action that needs one fails. |
| `pageNrs` | string | no | `"1"` | Page Numbers. Pages to convert. Examples: "1" (first page only), "1,3,5" (specific pages), "2-5" (range), "all" (every page). Defaults to the first page. |
| `imageFormat` | string | no | `"PNG"` | Image Format. The output image format. One of `"PNG"`, `"JPG"`, `"TIF"`, `"BMP"`. |
| `widthPixel` | number | no | `1920` | Width (pixels). Output image width in pixels. Height is calculated automatically to maintain the page aspect ratio. |

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
