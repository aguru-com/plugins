# PDF.co

Automate PDF conversion, editing, extraction

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pdf-co'
  version: '0.2.0'
```

Categories: PRODUCTIVITY, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your PDF.co API key:
> 1. Sign in or create an account at [app.pdf.co](https://app.pdf.co/).
> 2. Open **API** in the left menu.
> 3. Copy the API key and paste it here.

## Actions

### `add_barcode_to_pdf`

**Add Barcode to PDF.** Generates a barcode (QR, DataMatrix, Code 128/39, PDF417, EAN-13, or UPC-A) and stamps it onto a source PDF (referenced by URL) at the given x/y coordinates (points from the top-left; page indexes start at 0). Use when an agent needs to embed a scannable code into an existing document. Each call produces a new output PDF file and consumes credits, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourcePdfUrl` | string | yes |  | Source PDF URL. URL of the PDF file to add the barcode to. |
| `barcodeValue` | string | yes |  | Barcode Value. The text or data to encode in the barcode. |
| `barcodeType` | string | yes |  | Barcode Type. Select the type of barcode to generate. One of `"QRCode"`, `"DataMatrix"`, `"Code128"`, `"Code39"`, `"PDF417"`, `"EAN13"`, `"UPCA"`. |
| `x` | number | yes |  | X Coordinate. X coordinate (from top-left corner) to place the barcode. |
| `y` | number | yes |  | Y Coordinate. Y coordinate (from top-left corner) to place the barcode. |
| `width` | number | no |  | Width (optional). Optional width for the barcode image on the PDF (in points). Aspect ratio is kept by default. |
| `height` | number | no |  | Height (optional). Optional height for the barcode image on the PDF (in points). Aspect ratio is kept by default. |
| `pages` | string | no |  | Pages. Comma-separated page indexes or ranges to add the barcode (first page is 0), e.g. "0,2,5-10". Leave empty for all pages. |
| `fileName` | string | no |  | File Name. Desired name for the output PDF file (e.g., "result.pdf"). |
| `expiration` | number | no |  | Expiration Time in Minutes. Set the expiration time for the output link in minutes (default is 60 i.e 60 minutes or 1 hour). |
| `pdfPassword` | string | no |  | Source PDF Password. Password if the source PDF is protected. |
| `httpUsername` | string | no |  | HTTP Username. HTTP auth username if required to access source url. |
| `httpPassword` | string | no |  | HTTP Password. HTTP auth password if required to access source url. |
| `saveOutputFile` | boolean | no | `false` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `url`: Result Link (url)
- `name`: File Name
- `pageCount`: Page Count (number)
- `credits`: Credits Used (number)
- `remainingCredits`: Remaining Credits (number)
- `outputLinkValidTill`: Link Valid Until (datetime)
- `duration`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `add_image_to_pdf`

**Add Image to PDF.** Overlays an image (referenced by URL) onto a source PDF (referenced by URL) at the given x/y coordinates, optionally on specific pages (first page is 0). Agents should use Edit PDF (AI), which adds several images, texts and form values in one call. Each call produces a new output PDF file and consumes credits, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Source PDF URL. URL of the PDF file to modify. |
| `imageUrl` | string | yes |  | Image URL. |
| `xCoordinate` | number | yes |  | X Coordinate. X coordinate (from top-left corner) to place the image. |
| `yCoordinate` | number | yes |  | Y Coordinate. Y coordinate (from top-left corner) to place the image. |
| `width` | number | no |  | Width. Optional width for the image on the PDF (in points). Aspect ratio is kept by default. |
| `height` | number | no |  | Height. Optional height for the image on the PDF (in points). Aspect ratio is kept by default. |
| `pages` | string | no |  | Target Pages. Page indexes as comma-separated values or ranges (first page is 0), e.g. "0, 1, 2-" or "1, 2, 3-7". |
| `fileName` | string | no |  | File Name. Desired name for the output PDF file (e.g., "result.pdf"). |
| `expiration` | number | no |  | Expiration Time in Minutes. Set the expiration time for the output link in minutes (default is 60 i.e 60 minutes or 1 hour). |
| `pdfPassword` | string | no |  | Source PDF Password. Password if the source PDF is protected. |
| `httpUsername` | string | no |  | HTTP Username. HTTP auth username if required to access source url. |
| `httpPassword` | string | no |  | HTTP Password. HTTP auth password if required to access source url. |
| `saveOutputFile` | boolean | no | `false` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `outputUrl`: Result Link (url)
- `pageCount`: Page Count (number)
- `outputName`: File Name
- `creditsUsed`: Credits Used (number)
- `remainingCredits`: Remaining Credits (number)
- `file`: Saved File
- `file_error`: File Save Error

### `add_text_to_pdf`

**Add Text to PDF.** Stamps a text annotation onto a source PDF (referenced by URL) at the given x/y coordinates, with optional font, size, color, and styling. Page indexes start at 0. Agents should use Edit PDF (AI), which adds several texts, images and form values in one call. Each call produces a new output PDF file and consumes credits, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Source PDF URL. URL of the PDF file to modify. |
| `text` | string | yes |  | Text to Add. |
| `xCoordinate` | number | yes |  | X Coordinate. |
| `yCoordinate` | number | yes |  | Y Coordinate. |
| `fontSize` | number | no |  | Font Size. |
| `color` | string | no | `"#000000"` | Color. |
| `fontBold` | boolean | no |  | Bold Font ?. |
| `fontStrikeout` | boolean | no |  | Stikeout Font ?. |
| `fontUnderline` | boolean | no |  | Underline Font ?. |
| `fontName` | string | no | `"Arial"` | Font Name. |
| `pages` | string | no |  | Target Pages. Page indexes as comma-separated values or ranges (first page is 0), e.g. "0, 1, 2-" or "1, 2, 3-7". |
| `textBoxHeight` | number | no |  | Text Box Height. |
| `textBoxWidth` | number | no |  | Text Box Width. |
| `textBoxAlignment` | string | no | `"left"` | Text Box Alignment. One of `"left"`, `"right"`, `"center"`. |
| `fileName` | string | no |  | File Name. Desired name for the output PDF file (e.g., "result.pdf"). |
| `expiration` | number | no |  | Expiration Time in Minutes. Set the expiration time for the output link in minutes (default is 60 i.e 60 minutes or 1 hour). |
| `pdfPassword` | string | no |  | Source PDF Password. Password if the source PDF is protected. |
| `httpUsername` | string | no |  | HTTP Username. HTTP auth username if required to access source url. |
| `httpPassword` | string | no |  | HTTP Password. HTTP auth password if required to access source url. |
| `saveOutputFile` | boolean | no | `false` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `outputUrl`: Result Link (url)
- `pageCount`: Page Count (number)
- `outputName`: File Name
- `creditsUsed`: Credits Used (number)
- `remainingCredits`: Remaining Credits (number)
- `file`: Saved File
- `file_error`: File Save Error

### `convert_html_to_pdf`

**Convert HTML to PDF.** Renders a block of HTML into a new PDF document, with optional paper size, orientation, margins, header/footer, and media-type controls. Use when an agent needs to turn HTML markup into a downloadable PDF. Each call generates a new output file and consumes credits, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `html` | string | yes |  | HTML Content. The HTML code to convert to PDF. |
| `name` | string | no |  | Output File Name. Desired name for the output PDF file (e.g., "result.pdf"). |
| `margins` | string | no |  | Margins. CSS style margins (e.g., "10px", "5mm 5mm 5mm 5mm" for top, right, bottom, left). |
| `paperSize` | string | no |  | Paper Size. Select a standard paper size. For another size, fill Custom Paper Size below. One of `"A4"`, `"Letter"`, `"Legal"`, `"Tabloid"`, `"Ledger"`, `"A0"`, `"A1"`, `"A2"`, `"A3"`, `"A5"`, `"A6"`. |
| `orientation` | string | no |  | Orientation. Set page orientation. One of `"Portrait"`, `"Landscape"`. |
| `printBackground` | boolean | no | `true` | Print Background ?. Set to true to print background graphics and colors (default is true). |
| `mediaType` | string | no |  | Media Type. CSS media type to emulate. One of `"print"`, `"screen"`, `"none"`. |
| `header` | string | no |  | Header HTML. HTML content for the page header. |
| `footer` | string | no |  | Footer HTML. HTML content for the page footer. |
| `doNotWaitFullLoad` | boolean | no |  | Do not wait till full page load ?. |
| `expiration` | number | no |  | Output Link Expiration (minutes). Set the expiration time for the output link in minutes (default is 60). |
| `profiles` | JSON | no |  | Profiles. JSON object for additional configurations. |
| `customPaperSize` | string | no |  | Custom Paper Size. Width and height with units, e.g. "200mm 300mm" or "8.5in 11in". Overrides Paper Size when set. |
| `saveOutputFile` | boolean | no | `false` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `outputUrl`: Result Link (url)
- `pageCount`: Page Count (number)
- `outputName`: File Name
- `creditsUsed`: Credits Used (number)
- `remainingCredits`: Remaining Credits (number)
- `file`: Saved File
- `file_error`: File Save Error

### `convert_pdf_to_structured_format`

**Convert PDF to JSON/CSV/XML/Excel/HTML.** Converts a source PDF (referenced by URL) to a JSON, CSV, XML, XLSX, XLS or HTML file and returns a temporary link to the result file; optional OCR language handles scanned documents and page indexes start at 0. Agents wanting the content inline should use Convert PDF (AI). Not idempotent: each call runs a new conversion job and consumes credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Source PDF URL. URL of the PDF file to convert. |
| `outputFormat` | string | yes |  | Output Format. Select the desired structured output format. One of `"json"`, `"csv"`, `"xml"`, `"xlsx"`, `"xls"`, `"html"`. |
| `pages` | string | no |  | Pages. Comma-separated page indexes or ranges (first page is 0), e.g. "0,2,5-10". Leave empty for all pages. |
| `lang` | string | no |  | OCR Language. Language for OCR if processing scanned documents (e.g., "eng", "deu", "eng+deu"). See PDF.co docs for list. |
| `profiles` | JSON | no |  | Profiles. JSON object for additional configurations. |
| `fileName` | string | no |  | File Name. Desired name for the output PDF file (e.g., "result.pdf"). |
| `expiration` | number | no |  | Expiration Time in Minutes. Set the expiration time for the output link in minutes (default is 60 i.e 60 minutes or 1 hour). |
| `pdfPassword` | string | no |  | Source PDF Password. Password if the source PDF is protected. |
| `httpUsername` | string | no |  | HTTP Username. HTTP auth username if required to access source url. |
| `httpPassword` | string | no |  | HTTP Password. HTTP auth password if required to access source url. |
| `saveOutputFile` | boolean | no | `false` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `url`: Result Link (url)
- `name`: File Name
- `pageCount`: Page Count (number)
- `credits`: Credits Used (number)
- `remainingCredits`: Remaining Credits (number)
- `outputLinkValidTill`: Link Valid Until (datetime)
- `duration`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `extract_tables_from_pdf`

**Extract Tables from PDF (using Template).** Extracts table data from a source PDF (referenced by URL) using a predefined PDF.co Document Parser template; requires a Template ID created beforehand in the PDF.co dashboard. Agents should use Parse Document (AI), which also returns the template fields. Read-only and idempotent (consumes credits). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Source PDF URL. URL of the PDF file to extract tables from. |
| `templateId` | string | yes |  | Template ID. The ID of your Document Parser template (created in PDF.co dashboard) designed to extract the table(s). |
| `pages` | string | no |  | Pages. Comma-separated page indexes or ranges (first page is 0), e.g. "0,2,5-10". Overrides template settings if provided. |
| `profiles` | JSON | no |  | Profiles. JSON object for additional configurations. |
| `fileName` | string | no |  | File Name. Desired name for the output PDF file (e.g., "result.pdf"). |
| `expiration` | number | no |  | Expiration Time in Minutes. Set the expiration time for the output link in minutes (default is 60 i.e 60 minutes or 1 hour). |
| `pdfPassword` | string | no |  | Source PDF Password. Password if the source PDF is protected. |
| `httpUsername` | string | no |  | HTTP Username. HTTP auth username if required to access source url. |
| `httpPassword` | string | no |  | HTTP Password. HTTP auth password if required to access source url. |

Output fields:

- `extractedTables`: Tables
- `extractedTables[].name`: Table Name
- `extractedTables[].objectType`: Object Type
- `extractedTables[].pageIndex`: Page (0-based) (number)
- `extractedTables[].rows`: Rows
- `templateNameUsed`: Template Name

### `extract_text_from_pdf`

**Extract Plain Text from PDF.** Extracts the text of a source PDF (referenced by URL), optionally limited to specific pages (first page is 0). By default it reads the embedded text (4 credits per page); turn on OCR for scanned documents or layout-preserving text (21 credits per page). Use when an agent needs the raw text of a document. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Source PDF URL. URL of the PDF file to extract text from. |
| `pages` | string | no |  | Pages. Comma-separated page indexes or ranges (first page is 0), e.g. "0,2,5-10". Leave empty for all pages. |
| `password` | string | no |  | Source PDF Password. Password if the source PDF is protected. |
| `outputName` | string | no |  | File Name. Desired name for the output PDF file (e.g., "result.pdf"). |
| `httpUsername` | string | no |  | HTTP Username. HTTP auth username if required to access source url. |
| `httpPassword` | string | no |  | HTTP Password. HTTP auth password if required to access source url. |
| `useOcr` | boolean | no | `false` | Use OCR (Scanned PDFs). Read scanned pages and keep the layout. Costs 21 credits per page instead of 4. |
| `lang` | string | no |  | OCR Language. Only with OCR: language of the text, e.g. "eng", "deu", or "eng+deu". Default "eng". |

Output fields:

- `extractedText`: Extracted Text
- `pageCount`: Page Count (number)
- `outputName`: File Name
- `creditsUsed`: Credits Used (number)
- `remainingCredits`: Remaining Credits (number)

### `search_and_replace_text`

**Search and Replace Text in PDF.** Finds occurrences of given texts in a source PDF (referenced by URL) and replaces each with the replacement at the same position in the list, with optional case-sensitive matching or regular-expression patterns; both lists must have the same length and page indexes start at 0. Use when an agent needs to edit textual content in an existing document. Each call produces a new output PDF file and consumes credits, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | PDF URL. URL to the source PDF file. |
| `searchStrings` | array | yes |  | Text to Locate. Texts to find. Each one is replaced by the Replacement Text in the same position. |
| `replaceStrings` | array | yes |  | Replacement Text. One replacement per Text to Locate, in the same order. |
| `caseSensitive` | boolean | no | `true` | Case Sensitive. Set to true for case-sensitive search, false otherwise. |
| `regex` | boolean | no | `false` | Use Regular Expressions ?. Set to true to use regular expressions for search texts. |
| `pages` | string | no |  | Pages. Comma-separated page indexes or ranges (first page is 0), e.g. "0,2,5-10". Leave empty for all pages. |
| `fileName` | string | no |  | File Name. Desired name for the output PDF file (e.g., "result.pdf"). |
| `expiration` | number | no |  | Expiration Time in Minutes. Set the expiration time for the output link in minutes (default is 60 i.e 60 minutes or 1 hour). |
| `pdfPassword` | string | no |  | Source PDF Password. Password if the source PDF is protected. |
| `httpUsername` | string | no |  | HTTP Username. HTTP auth username if required to access source url. |
| `httpPassword` | string | no |  | HTTP Password. HTTP auth password if required to access source url. |
| `replacementLimit` | number | no |  | Max Replacements per Text. Maximum replacements for each text. Leave empty or 0 to replace every match. |
| `saveOutputFile` | boolean | no | `false` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `url`: Result Link (url)
- `name`: File Name
- `pageCount`: Page Count (number)
- `credits`: Credits Used (number)
- `remainingCredits`: Remaining Credits (number)
- `outputLinkValidTill`: Link Valid Until (datetime)
- `duration`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `merge_pdfs`

**Merge PDFs.** Merges two or more PDFs, given as public URLs and/or files, into one new PDF in the order listed (URLs first, then files) and returns a temporary link, optionally saving the file. Use to combine documents; convert Word, Excel or images to PDF first. Costs 2 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrls` | array | no |  | PDF URLs. Public links to the PDFs, in merge order. These come before any files below. |
| `sourceFiles` | array | no |  | PDF Files. PDFs from earlier steps, merged after the URLs. Each file is uploaded to PDF.co first (7 credits each). Each item: { `file` }. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `split_pdf`

**Split PDF.** Splits a PDF (public URL or file) into several PDFs by page ranges and returns one temporary link per part, optionally saving each part as a file. Page numbers start at 1 here (e.g. "1-2,3-"); "*" makes one file per page. Costs 2 credits per page. Not idempotent: each call runs a new job and creates new outputs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `pages` | string | yes | `"*"` | Page Ranges. Comma-separated ranges, one output file per range. The first page is 1 (not 0). Example: "1-2,3-" gives pages 1-2 and page 3 to the end. Use "*" for one file per page. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error
- `urls`: Result Links
- `files`: Saved Files

### `delete_pdf_pages`

**Delete Pages from PDF.** Creates a new PDF from a source PDF (public URL or file) with the listed pages removed; the source file is not changed. Page numbers start at 1 here (e.g. "1,3-4"). Costs 5 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `pages` | string | yes |  | Pages to Delete. Pages to remove, comma-separated. The first page is 1 (not 0). Example: "1,3-4" or "5-" for page 5 to the end. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `rotate_pdf_pages`

**Rotate PDF Pages.** Rotates the selected pages of a PDF (public URL or file) clockwise by 90, 180 or 270 degrees into a new PDF; leave pages empty to rotate every page. Page numbers start at 0 here. Costs 7 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `angle` | string | yes | `"90"` | Angle. How far to rotate the pages clockwise. One of `"90"`, `"180"`, `"270"`. |
| `pages` | string | no |  | Pages. Comma-separated pages or ranges, e.g. "0,2,5-10" or "3-" (first page is 0). Use "!0" for the last page. Leave empty for all pages. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `compress_pdf`

**Compress PDF.** Reduces the file size of a PDF (public URL or file) using a compression preset (low, medium, high or aggressive) and an optional image quality, returning the smaller copy. Use before emailing or archiving large PDFs. Costs 35 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `compressionLevel` | string | no | `"medium"` | Compression Level. Stronger levels make smaller files with lower image quality. One of `"low"`, `"medium"`, `"high"`, `"aggressive"`. |
| `colorQuality` | number | no |  | Image Quality (1-100). JPEG quality for color and grayscale images. Lower is smaller. Leave empty for the preset default. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `add_password_to_pdf`

**Protect PDF with Password.** Creates a password-protected copy of a PDF (public URL or file) with an owner password, an optional password to open it, and permission flags (print, copy, edit, fill forms, annotate, assemble). Costs 3 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `ownerPassword` | string | yes |  | Owner Password. Password that allows changing the security settings. |
| `userPassword` | string | no |  | Open Password. Password readers need to open the PDF. Leave empty to let anyone open it with the permissions below. |
| `encryptionAlgorithm` | string | no | `"AES_128bit"` | Encryption. One of `"AES_128bit"`, `"AES_256bit"`, `"RC4_40bit"`, `"RC4_128bit"`. |
| `allowPrintDocument` | boolean | no | `false` | Allow Printing. |
| `allowContentExtraction` | boolean | no | `false` | Allow Copying Content. |
| `allowModifyDocument` | boolean | no | `false` | Allow Editing. |
| `allowFillForms` | boolean | no | `false` | Allow Filling Forms. |
| `allowModifyAnnotations` | boolean | no | `false` | Allow Annotations. |
| `allowAssemblyDocument` | boolean | no | `false` | Allow Assembling Pages. |
| `allowAccessibilitySupport` | boolean | no | `false` | Allow Accessibility Tools. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `remove_password_from_pdf`

**Remove PDF Password.** Creates an unprotected copy of a password-protected PDF (public URL or file) given its password; the source file is not changed. Costs 3 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `password` | string | yes |  | PDF Password. The owner or open password of the PDF. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `make_pdf_searchable`

**Make PDF Searchable (OCR).** Runs OCR on a scanned PDF or image (public URL or file) and returns a copy with a selectable, searchable text layer. Use before text extraction on scans when Extract Text with OCR is not enough; pages start at 0. Costs 35 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `lang` | string | no |  | OCR Language. Language of the text, e.g. "eng", "deu", or "eng+deu" for several. Default "eng". |
| `pages` | string | no |  | Pages. Comma-separated pages or ranges, e.g. "0,2,5-10" or "3-" (first page is 0). Use "!0" for the last page. Leave empty for all pages. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `get_pdf_info`

**Get PDF Info.** Reads a PDF's metadata (public URL or file): page count, title, author, dates, page size, encryption and permission flags. Use to check the page count or protection before other steps. Costs 7 credits per page. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |

Output fields:

- `page_count`: Page Count (number)
- `title`: Title
- `author`: Author
- `subject`: Subject
- `keywords`: Keywords
- `creator`: Creator
- `producer`: Producer
- `creation_date`: Created
- `modification_date`: Modified
- `page_width`: Page Width (pt) (number)
- `page_height`: Page Height (pt) (number)
- `encrypted`: Encrypted (boolean)
- `password_protected`: Password Protected (boolean)
- `encryption_algorithm`: Encryption Algorithm
- `permission_printing`: Can Print (boolean)
- `permission_modify_document`: Can Modify (boolean)
- `permission_content_extraction`: Can Copy Content (boolean)
- `permission_modify_annotations`: Can Annotate (boolean)
- `permission_fill_forms`: Can Fill Forms (boolean)
- `permission_assemble`: Can Assemble (boolean)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `get_pdf_form_fields`

**Get PDF Form Fields.** Lists the fillable form fields of a PDF (public URL or file): exact field name, type, page (0-based), current value and position, so Fill PDF Form can target them by name. Costs 8 credits per call. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |

Output fields:

- `page_count`: Page Count (number)
- `field_count`: Field Count (number)
- `fields`: Form Fields
- `fields[].field_name`: Field Name
- `fields[].type`: Type
- `fields[].value`: Current Value
- `fields[].page_index`: Page (0-based) (number)
- `fields[].left`: Left (number)
- `fields[].top`: Top (number)
- `fields[].width`: Width (number)
- `fields[].height`: Height (number)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `fill_pdf_form`

**Fill PDF Form.** Fills existing form fields of a fillable PDF (public URL or file) by exact field name, optionally flattening the result so it can no longer be edited. Get the exact names from Get PDF Form Fields; checkboxes take "true". Costs 21 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `fields` | array | yes |  | Fields. One entry per form field. Use Get PDF Form Fields to see the exact names. Each item: { `fieldName`, `text`, `pages`? }. |
| `flatten` | boolean | no | `false` | Flatten Form. Make the filled form read-only so values can no longer be changed. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `find_text_in_pdf`

**Find Text in PDF.** Finds every occurrence of a text or regular expression in a PDF (public URL or file) and returns each match's text, page (0-based) and coordinates. Use to locate where to stamp text or images, or to check a document contains a phrase. Costs 35 credits per page. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `searchString` | string | yes |  | Text to Find. The word or phrase to look for, or a regular expression when "Use Regular Expression" is on. |
| `regexSearch` | boolean | no | `false` | Use Regular Expression. |
| `wordMatchingMode` | string | no | `"SmartMatch"` | Word Matching. Smart Match (default) matches whole words flexibly; Exact Match needs the exact word; None matches any part of the text. One of `"SmartMatch"`, `"ExactMatch"`, `"None"`. |
| `pages` | string | no |  | Pages. Comma-separated pages or ranges, e.g. "0,2,5-10" or "3-" (first page is 0). Use "!0" for the last page. Leave empty for all pages. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |

Output fields:

- `match_count`: Matches Found (number)
- `matches`: Matches
- `matches[].text`: Text
- `matches[].page_index`: Page (0-based) (number)
- `matches[].left`: Left (number)
- `matches[].top`: Top (number)
- `matches[].width`: Width (number)
- `matches[].height`: Height (number)
- `page_count`: Pages Searched (number)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `delete_text_from_pdf`

**Delete (Redact) Text in PDF.** Creates a copy of a PDF (public URL or file) with every match of the given texts or regular expressions removed, e.g. to redact names or numbers; the source file is not changed. Pages start at 0. Costs 21 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `searchStrings` | array | yes |  | Text to Remove. Words, phrases or (with Regular Expressions on) patterns to delete. |
| `caseSensitive` | boolean | no | `true` | Case Sensitive. |
| `regex` | boolean | no | `false` | Use Regular Expressions. |
| `replacementLimit` | number | no |  | Max Matches per Text. Maximum matches to remove for each text. Leave empty or 0 to remove every match. |
| `pages` | string | no |  | Pages. Comma-separated pages or ranges, e.g. "0,2,5-10" or "3-" (first page is 0). Use "!0" for the last page. Leave empty for all pages. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `read_barcodes_from_file`

**Read Barcodes.** Detects and decodes barcodes and QR codes in a PDF or image (public URL or file), returning each value, type, page (0-based), position and confidence. Choose the barcode types to look for. Costs 35 credits per page. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the PDF or image. Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `types` | array | yes | `["QRCode","Code128","Code39","EAN13","DataMatrix"]` | Barcode Types. Which barcode types to look for. Fewer types read faster. One of `"QRCode"`, `"DataMatrix"`, `"Code128"`, `"Code39"`, `"PDF417"`, `"EAN13"`, `"UPCA"`, `"Interleaved2of5"`. |
| `pages` | string | no |  | Pages. Comma-separated pages or ranges, e.g. "0,2,5-10" or "3-" (first page is 0). Use "!0" for the last page. Leave empty for all pages. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |

Output fields:

- `barcode_count`: Barcodes Found (number)
- `barcodes`: Barcodes
- `barcodes[].value`: Value
- `barcodes[].type`: Type
- `barcodes[].page`: Page (0-based) (number)
- `barcodes[].rect`: Position
- `barcodes[].confidence`: Confidence (number)
- `page_count`: Page Count (number)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `generate_barcode`

**Generate Barcode Image.** Generates a QR code or barcode image (QR, DataMatrix, Code 128/39, PDF417, EAN-13, UPC-A) for a value and returns a temporary PNG link, optionally saving the file. Use Add Barcode to PDF to stamp one onto a document. Costs 7 credits per call. Not idempotent: each call creates a new image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `value` | string | yes |  | Value. The text, number or link to encode. |
| `type` | string | yes | `"QRCode"` | Barcode Type. One of `"QRCode"`, `"DataMatrix"`, `"Code128"`, `"Code39"`, `"PDF417"`, `"EAN13"`, `"UPCA"`. |
| `decorationImage` | string | no |  | Logo URL. QR codes only: public link to a small logo placed in the middle. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `convert_pdf_to_image`

**Convert PDF to Images.** Renders the pages of a PDF (public URL or file) to JPG, PNG or WEBP images (one image per page) or one multi-page TIFF, returning a temporary link per image and optionally saving the files. Use for previews and thumbnails; pages start at 0. Costs 12 (JPG), 15 (PNG), 18 (WEBP) or 28 (TIFF) credits per page. Not idempotent: each call runs a new job and creates new outputs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `format` | string | yes | `"png"` | Image Format. One of `"jpg"`, `"png"`, `"webp"`, `"tiff"`. |
| `pages` | string | no |  | Pages. Comma-separated pages or ranges, e.g. "0,2,5-10" or "3-" (first page is 0). Use "!0" for the last page. Leave empty for all pages. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error
- `urls`: Result Links
- `files`: Saved Files

### `convert_url_to_pdf`

**Convert Web Page to PDF.** Renders a public web page URL into a PDF with optional paper size, orientation, margins, header and footer, returning a temporary link and optionally the file. The page must be reachable without login. Costs 9 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageUrl` | string | yes |  | Web Page URL. The public page to convert, e.g. https://example.com/report. |
| `paperSize` | string | no |  | Paper Size. Standard paper size. For a custom size use Custom Paper Size instead. One of `"A4"`, `"Letter"`, `"Legal"`, `"Tabloid"`, `"Ledger"`, `"A0"`, `"A1"`, `"A2"`, `"A3"`, `"A5"`, `"A6"`. |
| `customPaperSize` | string | no |  | Custom Paper Size. Width and height with units, e.g. "200mm 300mm" or "8.5in 11in". Overrides Paper Size when set. |
| `orientation` | string | no |  | Orientation. One of `"Portrait"`, `"Landscape"`. |
| `margins` | string | no |  | Margins. CSS-style margins: one value for all sides or "top right bottom left", e.g. "10mm" or "5mm 5mm 5mm 5mm". |
| `printBackground` | boolean | no | `true` | Print Background. Include background colors and images. |
| `header` | string | no |  | Header HTML. HTML shown at the top of every page. |
| `footer` | string | no |  | Footer HTML. HTML shown at the bottom of every page. |
| `renderTimeout` | number | no |  | Render Wait (ms). Extra time to let heavy JavaScript pages finish rendering, in milliseconds. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `convert_document_to_pdf`

**Convert Document to PDF.** Converts a Word/RTF/TXT/XPS document, a CSV/XLS/XLSX spreadsheet, or one or more images (combined into one PDF) to a PDF, given as public URLs or a file; choose the source type. Costs 21 credits per page for documents and spreadsheets, 9 for images. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceType` | string | yes | `"document"` | Source Type. One of `"document"`, `"spreadsheet"`, `"image"`. |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `extraImageUrls` | array | no |  | More Image URLs. Images only: more public image links, added as further pages after the first image. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `convert_html_template_to_pdf`

**Create PDF from HTML Template.** Fills a saved PDF.co HTML template (Mustache/Handlebars macros) with JSON data and renders it to a PDF, e.g. invoices or certificates; requires a template ID (see List HTML Templates). Costs 9 credits per page. Not idempotent: each call runs a new job and creates a new output. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template. An HTML template from PDF.co (app.pdf.co > HTML to PDF Templates). Loading this list costs 2 credits. A value the product loads from the provider, such as an id; write the value itself. |
| `templateData` | JSON | yes |  | Template Data. JSON object with the values for the template macros, e.g. {"invoice_id":"123","paid":true}. |
| `paperSize` | string | no |  | Paper Size. Standard paper size. For a custom size use Custom Paper Size instead. One of `"A4"`, `"Letter"`, `"Legal"`, `"Tabloid"`, `"Ledger"`, `"A0"`, `"A1"`, `"A2"`, `"A3"`, `"A5"`, `"A6"`. |
| `customPaperSize` | string | no |  | Custom Paper Size. Width and height with units, e.g. "200mm 300mm" or "8.5in 11in". Overrides Paper Size when set. |
| `orientation` | string | no |  | Orientation. One of `"Portrait"`, `"Landscape"`. |
| `margins` | string | no |  | Margins. CSS-style margins: one value for all sides or "top right bottom left", e.g. "10mm" or "5mm 5mm 5mm 5mm". |
| `printBackground` | boolean | no | `true` | Print Background. Include background colors and images. |
| `header` | string | no |  | Header HTML. HTML shown at the top of every page. |
| `footer` | string | no |  | Footer HTML. HTML shown at the bottom of every page. |
| `outputName` | string | no |  | Output File Name. Name for the result file, e.g. "result.pdf". Leave empty to let PDF.co pick one. |
| `expiration` | number | no |  | Link Expiration (minutes). How long the PDF.co result link stays valid. Default 60. The maximum depends on your PDF.co plan. |
| `runInBackground` | boolean | no | `false` | Run in Background. For large files. PDF.co processes the job in the background and this step checks it for up to 4 minutes (each check costs 2 credits). If it is still running, the step returns the job ID; use Check Job Status later. |
| `saveOutputFile` | boolean | no | `true` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `list_html_templates`

**List HTML Templates.** Lists every HTML-to-PDF template (built-in system ones and your own) with ID, title, type and sample JSON data. Use to find the template ID for Create PDF from HTML Template. Costs 2 credits per call. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `template_count`: Template Count (number)
- `templates`: Templates
- `templates[].id`: Template ID
- `templates[].title`: Title
- `templates[].description`: Description
- `templates[].type`: Type
- `templates[].sample_data`: Sample Data (JSON)
- `templates[].updated_at`: Updated At (datetime)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `parse_document`

**Parse Document with Template.** Extracts every field and table defined by a PDF.co Document Parser template from a PDF or scan (public URL or file), e.g. invoices, statements or orders, returning fields as name/value pairs plus tables. Requires a template; use Parse Invoice with AI for invoice layouts without one. Costs 42 credits per page. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the file (for example a PDF on Google Drive, Dropbox or S3). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `templateId` | string | yes |  | Template. A Document Parser template from PDF.co (app.pdf.co > Document Parser). Loading this list costs 2 credits. A value the product loads from the provider, such as an id; write the value itself. |
| `pages` | string | no |  | Pages. Comma-separated pages or ranges, e.g. "0,2,5-10" or "3-" (first page is 0). Use "!0" for the last page. Leave empty for all pages. |
| `pdfPassword` | string | no |  | Source PDF Password. Password to open the source PDF, if it is protected. |
| `httpUsername` | string | no |  | HTTP Username. Username if the source URL needs HTTP basic auth. |
| `httpPassword` | string | no |  | HTTP Password. Password if the source URL needs HTTP basic auth. |

Output fields:

- `template_name`: Template Name
- `fields`: Fields
- `tables`: Tables
- `tables[].name`: Table Name
- `tables[].page_index`: Page (0-based) (number)
- `tables[].rows`: Rows
- `page_count`: Page Count (number)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `list_document_parser_templates`

**List Document Parser Templates.** Lists every Document Parser template (built-in system ones such as "Invoice Parser" and your own) with ID, title, type and description. Use to find the template ID for Parse Document with Template. Costs 2 credits per call. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `template_count`: Template Count (number)
- `templates`: Templates
- `templates[].id`: Template ID
- `templates[].title`: Title
- `templates[].description`: Description
- `templates[].type`: Type
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `parse_invoice_with_ai`

**Parse Invoice with AI.** Uses PDF.co's AI Invoice Parser to extract vendor, customer, invoice number, dates, totals, tax and line items from an invoice PDF of any layout (public URL or file), no template needed. The job runs in the background and is checked for up to 4 minutes; if still running, status "working" and the job ID are returned: call this action again with only that Job ID to get the fields without starting a new parse. Costs 100 credits per page. Not idempotent: AI output can differ between runs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceUrl` | string | no |  | Source File URL. Public link to the invoice PDF (one invoice per file). Fill this or pick a file below, not both. |
| `sourceFile` | file | no |  | Source File. A file from an earlier step. It is uploaded to PDF.co temporary storage first (7 extra credits). Fill this or the URL above, not both. Files are not supported; an action that needs one fails. |
| `customFields` | array | no |  | Custom Fields. Extra fields to extract, in camelCase, e.g. storeNumber, deliveryDate. |
| `lineItemStructure` | JSON | no |  | Line Item Structure. Optional shape for each line item: field name to "string" or "number", e.g. {"description":"string","quantity":"number"}. |
| `jobId` | string | no |  | Job ID. To read an invoice job that returned status "working", paste its Job ID. The source and fields above are then not used and no new parse is started. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `vendor_name`: Vendor Name
- `customer_name`: Bill-To Name
- `invoice_number`: Invoice Number
- `invoice_date`: Invoice Date
- `due_date`: Due Date
- `po_number`: PO Number
- `total`: Total
- `subtotal`: Subtotal
- `tax`: Tax
- `line_items`: Line Items
- `invoice`: Full Invoice Data
- `page_count`: Page Count (number)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `upload_file`

**Upload File to PDF.co.** Uploads a file to PDF.co temporary storage (kept for 1 hour) and returns a URL that any PDF.co action accepts as its source. Use when a PDF.co action only takes a URL and the file is not public. Costs 7 credits. Not idempotent: each call stores a new copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload, for example a PDF from an earlier step. Files are not supported; an action that needs one fails. |

Output fields:

- `url`: File URL (url)
- `name`: File Name
- `link_valid_until`: Link Valid Until (datetime)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `check_job_status`

**Check Job Status.** Returns the status (working, success, failed or aborted) and result link of a background PDF.co job started with "Run in Background", optionally saving the finished result as a file. Use when an earlier PDF.co step returned status "working" and a job ID. Each check costs 2 credits; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Job ID. The Job ID returned by an earlier PDF.co step that ran in the background. |
| `saveOutputFile` | boolean | no | `false` | Save Result as File. Download the result and keep it as a file in this flow, so later steps can use it after the PDF.co link expires (links last 60 minutes by default). Files over 100 MB are not saved; the link is still returned. |

Output fields:

- `job_id`: Job ID
- `status`: Status
- `message`: Message
- `url`: Result Link (url)
- `urls`: Result Links
- `page_count`: Page Count (number)
- `link_valid_until`: Link Valid Until (datetime)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `file`: Saved File
- `files`: Saved Files
- `file_error`: File Save Error

### `get_credit_balance`

**Get Credit Balance.** Returns the remaining PDF.co credits of the connected account. Use before a large batch to avoid "not enough credits" (402) failures. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `remaining_credits`: Remaining Credits (number)

### `pdf_co_convert_pdf`

**Convert PDF (AI).** Converts a PDF at a public URL into plain text, OCR text (for scans), CSV, JSON, XML or HTML and returns the converted content directly, cut to max_chars with a truncated flag. Use when the agent needs to read a PDF's content; pages are 0-based. Credits per page: text 4, text_ocr 21, csv/json 28, xml 35, html 21. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_url` | string | yes |  | Source URL. Public http(s) URL of the PDF. |
| `format` | string | no |  | Format. One of: text, text_ocr, csv, json, xml, html. Default text. |
| `pages` | string | no |  | Pages. Optional 0-based pages or ranges, e.g. "0,2-4". Empty = all pages. |
| `lang` | string | no |  | OCR Language. Optional OCR language for text_ocr, csv, json, xml and html, e.g. "eng" or "eng+deu". |
| `password` | string | no |  | PDF Password. Optional password if the PDF is protected. |
| `max_chars` | number | no |  | Max Characters. Maximum characters of content to return (default 50000, max 200000). |

Output fields:

- `format`: Format
- `content`: Content
- `truncated`: Truncated (boolean)
- `total_chars`: Total Characters (number)
- `page_count`: Page Count (number)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)

### `pdf_co_edit_pdf`

**Edit PDF (AI).** Adds any mix of text annotations, images and form-field values to a PDF at a public URL in one pass and returns a temporary link to the new PDF. Coordinates are points from the top-left corner; pages are 0-based. Costs 21 credits per page. Not idempotent: each call creates a new output and consumes credits. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_url` | string | yes |  | Source URL. Public http(s) URL of the PDF. |
| `annotations` | JSON | no |  | Text Annotations. Optional JSON array of {text, x, y, pages?, size?, fontName?, color?, fontBold?, alignment?, width?, height?}. |
| `images` | JSON | no |  | Images. Optional JSON array of {url, x, y, pages?, width?, height?, link?, keepAspectRatio?}; url must be a public image link. |
| `fields` | JSON | no |  | Form Fields. Optional JSON array of {fieldName, text, pages?} to fill existing form fields by exact name. |
| `password` | string | no |  | PDF Password. Optional password if the PDF is protected. |
| `output_name` | string | no |  | Output Name. Optional name for the result file. |

Output fields:

- `status`: Status
- `job_id`: Job ID
- `url`: Result Link (url)
- `name`: File Name
- `page_count`: Page Count (number)
- `file_size`: File Size (filesize)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
- `link_valid_until`: Link Valid Until (datetime)
- `duration_ms`: Duration (ms) (number)
- `file`: Saved File
- `file_error`: File Save Error

### `pdf_co_parse_document`

**Parse Document (AI).** Extracts the fields (as name/value pairs) and tables defined by a PDF.co Document Parser template from a PDF or scan at a public URL; get template IDs from List Document Parser Templates (1 = built-in Invoice Parser). Costs 42 credits per page. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_url` | string | yes |  | Source URL. Public http(s) URL of the PDF or image. |
| `template_id` | string | yes |  | Template ID. Numeric Document Parser template ID, e.g. "1". |
| `pages` | string | no |  | Pages. Optional 0-based pages or ranges, e.g. "0,2-4". |
| `password` | string | no |  | PDF Password. Optional password if the PDF is protected. |

Output fields:

- `template_name`: Template Name
- `fields`: Fields
- `tables`: Tables
- `tables[].name`: Table Name
- `tables[].page_index`: Page (0-based) (number)
- `tables[].rows`: Rows
- `page_count`: Page Count (number)
- `credits_used`: Credits Used (number)
- `remaining_credits`: Remaining Credits (number)
