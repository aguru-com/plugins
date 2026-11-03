# PDF

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pdf'
  version: '0.6.0'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `extractText`

**Extract Text.** Extracts the text layer of a PDF supplied as an uploaded file or a URL, merging every page into a single string. Use this to read a text-based PDF before parsing, classifying or summarizing it; for a scanned/rasterized PDF use Convert to Image plus an OCR or vision step instead, and use PDF Page Count when only the document length matters. Requires a loadable PDF and returns nothing useful when the pages are just embedded scan images; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File or URL. Files are not supported; an action that needs one fails. |

### `convertToImage`

**Convert to Image.** Rasterizes a PDF to PNG images, either as one tall combined image or as a separate image per page (selected via Output Image Type). Pick this when a downstream vision or OCR step needs pixels rather than a text layer; prefer Extract Text for text-based PDFs and Image to PDF for the reverse direction. Requires the pdftoppm binary on the worker and a PDF no larger than 16 MB; the render is deterministic, so idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File or URL. Files are not supported; an action that needs one fails. |
| `imageOutputType` | string | yes | `"multiple"` | Output Image Type. One tall image of all pages, or one image per page. One of `"single"`, `"multiple"`. |

Output fields:

- `image`: Combined Image URL (url)
- `images`: Image URLs (url)

### `textToPdf`

**Text to PDF.** Renders a plain-text string into a brand-new A4 PDF, word-wrapping and paginating automatically at a fixed Helvetica 12pt layout. Use it to turn text into an attachable document; use Add Text to PDF to stamp text onto an existing PDF instead, and Image to PDF when the source is an image. Text is the only input and newlines are treated as paragraph breaks; the same text always produces the same document content, so idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Line breaks start a new paragraph. Helvetica 12 pt on A4. |

### `imageToPdf`

**Image to PDF.** Wraps a single PNG or JPEG image into a new one-page A4 PDF, scaling it to fit inside the margins and correcting the EXIF orientation. Use it to make an image attachable or printable as a document; use Add Image to PDF to stamp an image onto an existing PDF, and Merge PDFs to combine several single-image results. Accepts one image per call and only the png/jpg/jpeg extensions; layout and page size are fixed and repeating the call produces the same document content, so idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image File or URL. PNG or JPEG. Large images are scaled down to fit the page. Files are not supported; an action that needs one fails. |

### `pdfPageCount`

**PDF Page Count.** Returns the number of pages in a PDF given as an uploaded file or a URL. Use it as a cheap pre-check before any paging, splitting or looping logic — Extract PDF Pages performs the actual splitting and Extract Text pulls the content. Requires a loadable, non-encrypted PDF; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File or URL. Files are not supported; an action that needs one fails. |

### `extractPdfPages`

**Extract PDF Pages.** Builds a new PDF from page ranges taken from a source PDF; because ranges are copied in the order given, it both extracts/trims and reorders pages. Use it to split or resequence one document — use Merge PDFs to join separate files, and PDF Page Count first if bounds are unknown. Ranges are 1-indexed and inclusive, negatives count from the end (start -5, end -1 is the last five pages), and no range may span across 0; the source file is untouched and repeating the call produces the same page content, so idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File or URL. Files are not supported; an action that needs one fails. |
| `pageRanges` | array | yes |  | Page Ranges. One item per range. Order here is the page order in the output. Each item: { `startPage`, `endPage` }. |

### `mergePdfs`

**Merge PDFs.** Concatenates two or more PDF files into one new PDF, keeping the order in which the files are listed. Use it to join separate documents; use Extract PDF Pages to pull out or resequence pages inside a single document, and Image to PDF first if a source is an image rather than a PDF. Requires at least 2 files and each filename must end in .pdf; the source files are never modified and repeating the call produces the same merged content, so idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pdfFiles` | array | yes |  | PDF Files. Add the files in the order they should appear. Each item: { `file` }. |
| `outputFileName` | string | no | `"merged-document"` | Output File Name. File name for the merged PDF, without the extension. |

### `addTextToPdf`

**Add Text to PDF.** Stamps one or more text strings onto an existing PDF at exact point offsets from the top-left corner, each item targeting either a single page or every page. Use it for headers, dates or reference numbers — prefer Add Image to PDF for signatures and logos, and Text to PDF to build a document from scratch. Only the 14 standard PDF fonts are available and the call fails if any text would run off a page edge; the input file is never modified and repeating the call produces the same stamped content, so idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File or URL. Files are not supported; an action that needs one fails. |
| `textItems` | array | yes |  | Text to Stamp. One item per text block. Each can target one page or all pages. Each item: { `text`, `applyToAllPages`?, `pageNumber`?, `distanceFromLeft`, `distanceFromTop`, `font`, `fontSize`, `lineSpacing`? }. |

### `addImageToPdf`

**Add Image to PDF.** Stamps one or more PNG or JPEG images onto an existing PDF at exact point offsets from the top-left corner, each item targeting either a single page or every page. Use it for signatures, logos or watermarks — prefer Add Text to PDF for text, and Image to PDF to turn an image into a standalone document. Each image must have a positive scale and fit entirely within the page bounds, otherwise the call fails; the input file is never modified and repeating the call produces the same stamped content, so idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File or URL. Files are not supported; an action that needs one fails. |
| `imageItems` | array | yes |  | Images to Stamp. One item per image. Each can target one page or all pages. Each item: { `imageFile`, `applyToAllPages`?, `pageNumber`?, `distanceFromLeft`, `distanceFromTop`, `scale` }. |
