# iLoveAPI

Compress, merge, split, convert, OCR, watermark, protect and sign PDFs and images using iLovePDF / iLoveIMG / iLoveSign.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-iloveapi'
  version: '0.0.6'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Project Public Key

> To get your project public key:
>
> 1. Sign up or log in at https://developer.ilovepdf.com/
> 2. Open your project on the developer dashboard
> 3. Copy the **Project public key** (starts with `project_public_`)
> 4. Paste it here
>
> Only the public key is required. Tokens are issued automatically per request.

## Actions

### `compress_pdf`

**Compress PDF.** Shrink a PDF file size, choosing a compression level: "extreme" for the smallest file at lower quality, "recommended" for a balanced result (default), or "low" for the largest file at best quality. Each run produces a new compressed file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. PDF file to compress. Files are not supported; an action that needs one fails. |
| `compression_level` | string | no | `"recommended"` | Compression Level. One of `"extreme"`, `"recommended"`, `"low"`. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `merge_pdf`

**Merge PDF.** Concatenate two or more PDF files into one document, preserving the order in which they are listed. Requires at least two input files. Each run generates a new merged file, so re-running does not deduplicate against earlier outputs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `files` | array | yes |  | PDF Files. List of PDF files to merge. The output preserves the listed order. Each item: { `file` }. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `split_pdf`

**Split PDF.** Split one PDF into multiple PDFs via the iLoveAPI service. Pick this to break a document apart by explicit page ranges, fixed batches of N pages, by removing specific pages, or by a maximum output file size (MB) — the split mode determines which range/size input is required. Optionally merge the pieces back into a single PDF. Each call produces new output files, so repeated runs are not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `split_mode` | string | yes | `"ranges"` | Split Mode. One of `"ranges"`, `"fixed_range"`, `"remove_pages"`, `"filesize"`. |
| `ranges` | string | no |  | Ranges. Used with mode "Page Ranges". Example: "1-5,7,10-13". Each range becomes a separate PDF. |
| `fixed_range` | number | no |  | Fixed Range Size. Used with mode "Fixed Range". Number of pages per output PDF (e.g. 1 splits into one PDF per page). |
| `remove_pages` | string | no |  | Remove Pages. Used with mode "Remove Pages". Pages to delete, e.g. "2,4-6". The remaining pages stay in one PDF. |
| `filesize` | number | no |  | File Size (MB). Used with mode "By File Size". Maximum size in megabytes per output PDF. |
| `merge_after` | boolean | no | `false` | Merge results back into one PDF. When enabled, merges the split outputs into a single PDF. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `pdf_to_jpg`

**PDF to JPG.** Turn a PDF into JPG images. Choose the "pages" mode to render each page as a full JPG, or the "extract" mode to pull out only the raster images already embedded inside the PDF. Each run produces a new converted output, so re-running creates a fresh result rather than reusing a prior one. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `pdfjpg_mode` | string | no | `"pages"` | Mode. One of `"pages"`, `"extract"`. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `jpg_to_pdf`

**JPG to PDF.** Convert one or more JPG/PNG images into PDF, with control over orientation, page size, and margin. By default all images are merged into a single PDF; disable "Merge into single PDF" to instead get one PDF per image. Each run produces new output rather than reusing a prior result. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `images` | array | yes |  | Images. Images to include in the PDF, in order. Each item: { `file` }. |
| `orientation` | string | no | `"portrait"` | Orientation. One of `"portrait"`, `"landscape"`. |
| `margin` | number | no |  | Margin (px). Page margin in pixels around each image. Default 0. |
| `pagesize` | string | no | `"fit"` | Page Size. One of `"fit"`, `"A4"`, `"letter"`. |
| `merge_after` | boolean | no | `true` | Merge into single PDF. When enabled (default), produces one PDF for all images. When disabled, produces one PDF per image. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `office_to_pdf`

**Office to PDF.** Convert a single Office document (DOCX, XLSX, PPTX, ODT, ODS, ODP, RTF, or TXT) into a PDF. Use this when the source is an Office/text file; for images use JPG to PDF and for web pages use HTML to PDF. Each run produces a new converted file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Office File. Supported formats include DOCX, XLSX, PPTX, ODT, ODS, ODP, RTF, TXT. Files are not supported; an action that needs one fails. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `html_to_pdf`

**HTML to PDF.** Render a publicly reachable web page, given its http(s) URL, into a PDF. The URL must be publicly accessible (no auth-gated or private pages). Use Office to PDF or JPG to PDF instead when the source is a local file rather than a live web page. Each run produces a new output. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Page URL. Public URL of the web page to render as PDF. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `ocr_pdf`

**OCR PDF.** Add a searchable, selectable text layer to a scanned or image-only PDF via OCR, defaulting to English when no language is given (accepts one or more ISO 639-2 codes such as eng, fra, deu, chi_sim). Use this before extracting or searching text in scanned documents. Each run produces a new output file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `ocr_languages` | array | no |  | OCR Languages. ISO 639-2 language codes (e.g. eng, fra, deu, spa, ita, por, rus, chi_sim, jpn, ara). Defaults to English. Each item: {  }. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `watermark_pdf`

**Watermark PDF.** Overlay a watermark onto chosen pages of a PDF. Pick "text" mode to stamp a string (with font, color, rotation, transparency, mosaic, and layer controls) or "image" mode to stamp a supplied JPG/PNG; the matching text or image input is required for the selected mode. Each run writes a new watermarked file rather than reusing a previous result. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `mode` | string | yes | `"text"` | Watermark Mode. One of `"text"`, `"image"`. |
| `text` | string | no |  | Text. Required when mode is "Text". The watermark text to stamp. |
| `image` | file | no |  | Watermark Image. Required when mode is "Image". JPG/PNG image used as the watermark. Files are not supported; an action that needs one fails. |
| `pages` | string | no | `"all"` | Pages. Pages to apply watermark to. Use "all", a single page, or ranges like "1-3,5". |
| `vertical_position` | string | no | `"middle"` | Vertical Position. One of `"top"`, `"middle"`, `"bottom"`. |
| `horizontal_position` | string | no | `"center"` | Horizontal Position. One of `"left"`, `"center"`, `"right"`. |
| `rotation` | number | no | `0` | Rotation (degrees). Rotation between 0 and 360 degrees. |
| `transparency` | number | no | `0` | Transparency (%). 0 = solid, 100 = fully transparent. |
| `mosaic` | boolean | no | `false` | Mosaic. Repeat the watermark across the entire page. |
| `layer` | string | no | `"above"` | Layer. Place the watermark above or below the page content. One of `"above"`, `"below"`. |
| `font_family` | string | no | `"Arial"` | Font (text mode). One of `"Arial"`, `"Arial Unicode MS"`, `"Verdana"`, `"Courier"`, `"Times New Roman"`, `"Comic Sans MS"`, `"WenQuanYi Zen Hei"`, `"Lohit Marathi"`. |
| `font_size` | number | no | `14` | Font Size (text mode). |
| `font_color` | string | no | `"#000000"` | Font Color (text mode). Hex color, e.g. #000000. |
| `font_style` | string | no | `""` | Font Style (text mode). One of `""`, `"Bold"`, `"Italic"`. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `protect_pdf`

**Protect PDF.** Encrypt a PDF with a password so it cannot be opened without that password. Use Unlock PDF for the reverse operation of removing a known password. Each run produces a new protected file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `password` | string | yes |  | Password. Password used to encrypt the PDF. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `unlock_pdf`

**Unlock PDF.** Strip password protection from a PDF, producing an unencrypted copy. You must supply the current password that protects the file. Use the Protect PDF action for the reverse operation of adding a password. Each run produces a new output file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `password` | string | yes |  | Current Password. The current password protecting the PDF. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `page_numbers_pdf`

**Add Page Numbers to PDF.** Print page numbers onto a PDF, with control over which pages, the starting number, the {n}/{p} number format, facing-page (book) layout, cover-skip, and font styling. Each run produces a new numbered file, so re-running re-stamps rather than reusing an earlier output. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `pages` | string | no | `"all"` | Pages. Pages to number. Use "all" or ranges like "2-5,7". Defaults to all. |
| `starting_number` | number | no | `1` | Starting Number. First page number to print. Defaults to 1. |
| `first_cover` | boolean | no | `false` | Skip First Page (Cover). When enabled, skips numbering the first page. |
| `facing_pages` | boolean | no | `false` | Facing Pages (book mode). Alternate horizontal position for left/right pages, like a printed book. |
| `vertical_position` | string | no | `"bottom"` | Vertical Position. One of `"top"`, `"bottom"`. |
| `horizontal_position` | string | no | `"center"` | Horizontal Position. One of `"left"`, `"center"`, `"right"`. |
| `text` | string | no | `"{n}"` | Number Format. Use {n} for current page and {p} for total pages. Example: "{n} of {p}". |
| `font_family` | string | no | `"Arial"` | Font. One of `"Arial"`, `"Verdana"`, `"Courier"`, `"Times New Roman"`, `"Comic Sans MS"`. |
| `font_size` | number | no | `14` | Font Size. |
| `font_color` | string | no | `"#000000"` | Font Color. Hex color, e.g. #000000. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `rotate_pdf`

**Rotate PDF.** Rotate all pages of a PDF by a fixed 90, 180, or 270 degrees. The rotation is relative to the current orientation, so it is not idempotent: applying it repeatedly keeps turning the pages rather than settling on an absolute angle. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `rotation` | string | yes | `90` | Rotation. One of `90`, `180`, `270`. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `extract_text_pdf`

**Extract Text from PDF.** Extract the text content of a PDF via the iLoveAPI service. Pick this to pull readable text out of a PDF (e.g. for parsing or downstream analysis); enable detailed mode when you need per-block positional and font metadata for layout-aware parsing rather than plain text. Each call re-runs extraction and writes a fresh output file, so repeated runs are not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `detailed` | boolean | no | `false` | Detailed Output. Include positional and font metadata for each text block. Useful for downstream layout-aware parsing. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `repair_pdf`

**Repair PDF.** Attempt to recover a damaged or corrupted PDF into a readable file. Best-effort: success depends on the extent of corruption and is not guaranteed. Each run produces a new output file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. Files are not supported; an action that needs one fails. |
| `output_filename` | string | no |  | Output Filename. Output file name without extension. Use {date}, {n} or {filename} placeholders. |
| `packaged_filename` | string | no |  | Packaged ZIP Filename. Name of the ZIP archive when the result contains multiple files. No extension. |

### `create_signature_request`

**Create Signature Request.** Start an electronic signature request: upload one or more PDFs and define the signers (by name and email, each as signer, validator, or viewer) plus optional field placeholders matched to signers by email. Returns a requester token used by the status, reminder, void, expiration, and download actions. Each call creates a brand-new request and dispatches invitation emails, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `files` | array | yes |  | PDF Files. Documents to send for signature. Each item: { `file` }. |
| `signers` | array | yes |  | Signers. People who will receive the document. Each item: { `name`, `email`, `phone`?, `type`?, `force_signature_type`?, `access_code`? }. |
| `elements` | array | no |  | Signature Elements. Placeholders to drop on each PDF page. Match them to signers by email. If empty, iLovePDF will let signers place fields freely. Each item: { `signer_email`, `type`, `position`, `pages`, `size`?, `content`?, `color`? }. |
| `brand_name` | string | no |  | Brand Name. Sender name shown in the email and signing page. |
| `language` | string | no | `"en-US"` | Language. One of `"en-US"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"ca"`, `"nl"`. |
| `subject_signer` | string | no |  | Email Subject. Subject line for the signature invitation email. |
| `message_signer` | string | no |  | Email Message. Body for the signature invitation email. |
| `expiration_days` | number | no |  | Expiration (days). Days until the request expires. 1 to 130. Default 120. |
| `lock_order` | boolean | no | `false` | Sign in Order. When enabled, signers receive the document one at a time in the listed order. |
| `signer_reminders` | boolean | no | `true` | Auto Reminders. Send reminder emails to signers who have not yet signed. |
| `signer_reminder_days_cycle` | number | no |  | Reminder Frequency (days). Days between auto-reminders. Default 1. |
| `certified` | boolean | no | `true` | Certified Signature. Apply a certified-signature seal to the final PDF. |

### `get_signature_status`

**Get Signature Status.** Look up the current status of a signature request by its requester token, including the per-signer state. Read-only and safe to poll repeatedly; use this to check whether a request is completed before downloading signed files or the audit trail. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token_requester` | string | yes |  | Requester Token. The "token_requester" returned when the signature request was created. |

### `send_signer_reminder`

**Send Signer Reminder.** Send a manual nudge email to outstanding signers of an existing signature request, identified by its requester token. Each call sends a fresh reminder (not idempotent) and the provider caps this at 2 calls per day per request; for scheduled automatic reminders configure them on the request itself at creation time instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token_requester` | string | yes |  | Requester Token. The "token_requester" of the signature request. |

### `void_signature`

**Void Signature.** Permanently cancel an in-progress signature request by its requester token, after which the document can no longer be signed and becomes inaccessible to every signer. This is a destructive, irreversible state change; calling it again on an already-voided request has no further effect. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token_requester` | string | yes |  | Requester Token. The "token_requester" of the signature request to void. |

### `increase_expiration_days`

**Increase Expiration Days.** Push back the expiration date of an existing signature request (by requester token) by a given number of days, where the added amount must be 1 to 130 and the resulting total cannot exceed 130 days from now. Not idempotent: each call adds days on top of the current expiration rather than setting it to an absolute date. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token_requester` | string | yes |  | Requester Token. The "token_requester" of the signature request. |
| `days` | number | yes |  | Additional Days. Number of days to add. Must be between 1 and 130. |

### `download_signed_files`

**Download Signed Files.** Retrieve the finished signed document for a signature request by its requester token, returning a single PDF or a ZIP when several files were signed. The request must already be in "completed" status (check first with Get Signature Status); for the evidence log use Download Audit Trail. Read-only retrieval, safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token_requester` | string | yes |  | Requester Token. The "token_requester" of the completed signature request. |
| `file_name` | string | no |  | Output File Name. Name to store the downloaded file under. Defaults to "signed-{token}.pdf". |

### `download_audit_trail`

**Download Audit Trail.** Fetch the audit-trail PDF (the legal evidence/event log) for a completed signature request, identified by its requester token, for compliance and dispute resolution. Read-only retrieval, safe to repeat; to get the actual signed documents use Download Signed Files instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token_requester` | string | yes |  | Requester Token. The "token_requester" of the completed signature request. |
| `file_name` | string | no |  | Output File Name. Name to store the audit PDF under. Defaults to "audit-{token}.pdf". |
