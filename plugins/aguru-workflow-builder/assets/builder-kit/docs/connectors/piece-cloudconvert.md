# CloudConvert

File conversion and processing platform supporting 200+ formats

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cloudconvert'
  version: '0.2.1'
```

Categories: DEVELOPER_TOOLS, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your CloudConvert account using OAuth2

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `region` | string | yes | `"auto"` | Region. CloudConvert processing region. One of `"auto"`, `"eu-central"`, `"us-east"`. |

## Actions

### `convert_file`

**Convert File.** Converts a single file from one format to another via CloudConvert (200+ formats; input format auto-detected unless specified). Choose this to transform a document, image, audio, or video file into a different format. Supply the input via one of three import methods — a public URL, an uploaded file, or a previously stored Activepieces file ID — and set the target output_format. Each call creates a new conversion job, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `import_method` | string | yes | `"upload"` | Import Method. How to import the file for conversion. One of `"upload"`, `"url"`, `"stored_file"`. |
| `file` | file | no |  | File. File to upload and convert (select from your device) Files are not supported; an action that needs one fails. |
| `url` | string | no |  | File URL. URL of the file to convert. |
| `stored_file_id` | string | no |  | Stored File ID. ID of a previously stored file in Activepieces to convert. |
| `input_format` | string | no | `"auto"` | Input Format. The format of the input file. Leave as "Auto-detect" to let CloudConvert detect automatically. One of `"auto"`, `"pdf"`, `"docx"`, `"doc"`, `"txt"`, `"jpg"`, `"png"`, `"html"`, `"other"`. |
| `output_format` | string | yes |  | Output Format. The target format to convert to. A value the product loads from the provider, such as an id; write the value itself. |
| `filename` | string | no | `"converted-file"` | Output Filename. Choose a filename (including extension) for the output file. |
| `engine` | string | no |  | Engine. Use a specific engine for the conversion. A value the product loads from the provider, such as an id; write the value itself. |
| `engine_version` | string | no |  | Engine Version. Use a specific engine version for the conversion. |
| `timeout` | number | no |  | Timeout (seconds). Timeout in seconds after which the task will be cancelled. |
| `wait_for_completion` | boolean | yes | `true` | Wait for Completion. Wait for the conversion to complete before returning. |
| `store_file` | boolean | no | `true` | Store File. Download and store the converted file in Activepieces. |

### `capture_website`

**Capture Website.** Renders a live webpage at a given URL and captures it as a PDF, PNG, or JPG via CloudConvert, with optional page sizing, margins, and render-wait controls. Choose this to snapshot or archive a web page rather than convert an existing file. Requires a reachable URL and an output_format. Each call creates a new capture task, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Website URL. The URL of the website to capture. |
| `output_format` | string | yes | `"pdf"` | Output Format. The target format to convert to. One of `"pdf"`, `"png"`, `"jpg"`. |
| `pages` | string | no |  | Pages. Page range (e.g. 1-3) or comma separated list (e.g. 1,2,3) of pages. |
| `zoom` | number | no |  | Zoom Level. Zoom level to display the website. Defaults to 1. |
| `page_width` | number | no |  | Page Width (cm). Page width in cm. |
| `page_height` | number | no |  | Page Height (cm). Page height in cm. |
| `page_format` | string | no |  | Page Format. Paper format type when printing a PDF. Overrides page_width and page_height. One of `"letter"`, `"legal"`, `"tabloid"`, `"ledger"`, `"a0"`, `"a1"`, `"a2"`, `"a3"`, `"a4"`, `"a5"`, `"a6"`. |
| `page_orientation` | string | no | `"portrait"` | Page Orientation. Page orientation for PDF output. One of `"portrait"`, `"landscape"`. |
| `margin_top` | number | no |  | Top Margin (mm). Page top margin in mm. |
| `margin_bottom` | number | no |  | Bottom Margin (mm). Page bottom margin in mm. |
| `margin_left` | number | no |  | Left Margin (mm). Page left margin in mm. |
| `margin_right` | number | no |  | Right Margin (mm). Page right margin in mm. |
| `print_background` | boolean | no | `true` | Print Background. Render the background of websites. |
| `display_header_footer` | boolean | no |  | Display Header/Footer. Create a header and a footer with the URL and page numbers. |
| `header_template` | string | no |  | Header Template. HTML template for the print header with classes: date, title, url, pageNumber, totalPages. |
| `footer_template` | string | no |  | Footer Template. HTML template for the print footer with classes: date, title, url, pageNumber, totalPages. |
| `wait_until` | string | no | `"load"` | Wait Until. When to consider navigation finished. One of `"load"`, `"domcontentloaded"`, `"networkidle0"`, `"networkidle2"`. |
| `wait_for_element` | string | no |  | Wait for Element. CSS selector for element to wait for (e.g. "body" or "#element") |
| `wait_time` | number | no |  | Wait Time (ms). Additional time in ms to wait after the page load. |
| `css_media_type` | string | no | `"print"` | CSS Media Type. Changes the CSS media type of the page. One of `"print"`, `"screen"`. |
| `filename` | string | no | `"captured-website"` | Output Filename. Choose a filename (including extension) for the output file. |
| `engine` | string | no |  | Engine. Use a specific engine for the conversion. One of `"chrome"`, `"wkhtml"`. |
| `engine_version` | string | no |  | Engine Version. Use a specific engine version for the conversion. |
| `timeout` | number | no |  | Timeout (seconds). Timeout in seconds after the task will be cancelled. |
| `wait_for_completion` | boolean | yes | `true` | Wait for Completion. Wait for the capture to complete before returning. |
| `store_file` | boolean | no | `true` | Store File. Download and store the captured file in Activepieces. |

### `merge_pdf`

**Merge Files to PDF.** Merges two or more files into a single PDF via CloudConvert. Choose this to combine separate documents or images into one PDF. Requires at least two input files supplied via the selected import method (file URL or previously stored Activepieces file ID; multi-file uploads are not supported). Each call creates a new merge job, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `import_method` | string | yes | `"upload"` | Import Method. How to import the files for merging. One of `"upload"`, `"url"`, `"stored_file"`. |
| `files` | array | yes |  | Files to Merge. List of files to merge into a single PDF. Each item: { `url`?, `file`?, `stored_file_id`?, `filename`? }. |
| `filename` | string | no | `"merged-document.pdf"` | Output Filename. Choose a filename (including extension) for the output file. |
| `engine` | string | no |  | Engine. Use a specific engine for the conversion. One of `"3heights"`, `"pdftron"`, `"mupdf"`, `"poppler"`, `"libreoffice"`. |
| `engine_version` | string | no |  | Engine Version. Use a specific engine version for the conversion. |
| `timeout` | number | no |  | Timeout (seconds). Timeout in seconds after which the task will be cancelled. |
| `wait_for_completion` | boolean | yes | `true` | Wait for Completion. Wait for the merge to complete before returning. |
| `store_file` | boolean | no | `true` | Store File. Download and store the merged PDF in Activepieces. |

### `download_file`

**Download a File.** Retrieves a finished CloudConvert task by its ID and returns its output file download URLs, optionally fetching and storing the files in Activepieces. Choose this to collect results from a conversion/merge/archive/optimize job that was started without waiting for completion. The task must already be finished; if it lacks download URLs an export task is created on the fly, so this is not strictly idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. ID of the CloudConvert task to retrieve. |
| `include` | array | no |  | Include Additional Data. Additional data to include in the response. Values the product loads from the provider, such as ids; write an array of them. |
| `store_file` | boolean | no | `true` | Store File. Download and store the output files in Activepieces. |

### `archive_file`

**Archive File.** Bundles one or more files into a single archive (ZIP, RAR, 7Z, TAR, TAR.GZ, or TAR.BZ2) via CloudConvert. Choose this to compress or package multiple files together. Requires at least one input file supplied via the selected import method (file URL or previously stored Activepieces file ID; multi-file uploads are not supported) and an output archive format. Each call creates a new archive job, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `import_method` | string | yes | `"upload"` | Import Method. How to import the files for archiving. One of `"upload"`, `"url"`, `"stored_file"`. |
| `files` | array | yes |  | Files to Archive. List of files to include in the archive. Each item: { `url`?, `file`?, `stored_file_id`?, `filename`? }. |
| `output_format` | string | yes | `"zip"` | Archive Format. The archive format to create. One of `"zip"`, `"rar"`, `"7z"`, `"tar"`, `"targz"`, `"tarbz2"`. |
| `filename` | string | no | `"archive.zip"` | Archive Filename. Choose a filename (including extension) for the archive file. |
| `engine` | string | no |  | Engine. Use a specific engine for the archiving. One of `"7z"`, `"archivetool"`. |
| `engine_version` | string | no |  | Engine Version. Use a specific engine version for the archiving. |
| `timeout` | number | no |  | Timeout (seconds). Timeout in seconds after which the task will be cancelled. |
| `wait_for_completion` | boolean | yes | `true` | Wait for Completion. Wait for the archive creation to complete before returning. |
| `store_file` | boolean | no | `true` | Store File. Download and store the created archive in Activepieces. |

### `optimize_file`

**Optimize File.** Compresses and optimizes a PDF or image (PNG/JPG) to reduce file size via CloudConvert, targeting a profile such as web, print, archive, MRC, or max. Choose this to shrink a file without changing its format. Supply the input via one of three import methods — a public URL, an uploaded file, or a previously stored Activepieces file ID. Each call creates a new optimize job, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `import_method` | string | yes | `"upload"` | Import Method. How to import the file for optimization. One of `"upload"`, `"url"`, `"stored_file"`. |
| `file` | file | no |  | File. File to upload and optimize (PDF, PNG, JPG) Files are not supported; an action that needs one fails. |
| `url` | string | no |  | File URL. URL of the file to optimize. |
| `stored_file_id` | string | no |  | Stored File ID. ID of a previously stored file in Activepieces to optimize. |
| `input_format` | string | no |  | Input Format. The current format of the file. If not set, the extension of the input file is used. One of `"pdf"`, `"png"`, `"jpg"`. |
| `profile` | string | no | `"web"` | Optimization Profile. Optimization profile for specific target needs. One of `"web"`, `"print"`, `"archive"`, `"mrc"`, `"max"`. |
| `flatten_signatures` | boolean | no | `false` | Flatten Signatures. Flatten visible signatures and keep them as non-editable graphics. |
| `colorspace` | string | no |  | Color Space. Color space of raster images. One of `"unchanged"`, `"rgb"`, `"cmyk"`, `"grayscale"`. |
| `filename` | string | no | `"optimized-document.pdf"` | Output Filename. Choose a filename (including extension) for the output file. |
| `engine` | string | no |  | Engine. Use a specific engine for the optimization. One of `"3heights"`, `"pdftools"`. |
| `engine_version` | string | no |  | Engine Version. Use a specific engine version for the optimization. |
| `timeout` | number | no |  | Timeout (seconds). Timeout in seconds after which the task will be cancelled. |
| `wait_for_completion` | boolean | yes | `true` | Wait for Completion. Wait for the optimization to complete before returning. |
| `store_file` | boolean | no | `true` | Store File. Download and store the optimized file in Activepieces. |

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
