# ConvertAPI

Convert, merge and split documents, images and PDFs with 300+ file converters.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-convertapi'
  version: '0.0.3'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> To get your API token:
> 1. Sign in to [ConvertAPI](https://www.convertapi.com/a).
> 2. Open **Authentication** (https://www.convertapi.com/a/authentication).
> 3. Copy an existing **API Token**, or create a new one, and paste it here.

## Actions

### `merge_pdf`

**Merge PDF Files.** Merges two or more PDF files into a single new PDF with ConvertAPI, keeping the listed order, and returns it as a stored file. Use Split PDF File to break a PDF apart, or Convert File to merge Word or PowerPoint documents. Each call uses ConvertAPI conversions and creates a new output file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `files` | array | yes |  | PDF Files. Add the PDFs in the order they should appear. At least two are needed. Each item: { `file` }. |
| `fileName` | string | no |  | Output File Name. Merged file name, without the extension. Leave empty for a default. |
| `password` | string | no |  | Password. Only needed if the PDFs are password-protected. Used for every file. |
| `bookmarksTableOfContents` | string | no | `"disabled"` | Bookmark Each File. Add a top-level bookmark for each merged file. One of `"disabled"`, `"filename"`, `"title"`. |
| `pageSize` | string | no | `"default"` | Page Size. Scale every page to this size, or keep the original size. One of `"default"`, `"a2"`, `"a3"`, `"a4"`, `"a5"`, `"a6"`, `"letter"`, `"legal"`. |
| `pageOrientation` | string | no | `"default"` | Page Orientation. Rotate every page to this orientation, or keep the original. One of `"default"`, `"portrait"`, `"landscape"`. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `file_extension`: File Extension
- `file_size`: File Size (filesize)
- `conversion_cost`: Conversion Cost (number)

### `split_pdf`

**Split PDF File.** Splits one PDF into multiple new PDFs with ConvertAPI and returns a list with one stored file per part. Pick the mode that matches the request: fixed page counts, explicit page ranges, individual pages, a regular expression that starts each new part, or the document bookmarks. Use Merge PDF Files for the opposite. Each call uses ConvertAPI conversions and creates new output files. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | PDF File. The PDF to split. Files are not supported; an action that needs one fails. |
| `mode` | string | yes | `"pagecount"` | Split By. How the PDF is cut into parts. One of `"pagecount"`, `"ranges"`, `"singlepages"`, `"text"`, `"bookmark"`. |
| `value` | string | no |  | Split Value. What to split on. The format depends on the Split By mode. |
| `mergeOutput` | boolean | no | `false` | Merge Parts Into One PDF. Join the parts back into one PDF, e.g. to extract selected pages. |
| `password` | string | no |  | Password. Only needed if the PDF is password-protected. |
| `fileName` | string | no |  | Output File Name. Base name for the parts, without extension. Each part gets a number. |

Output fields:

- `[].file`: File (url)
- `[].file_name`: File Name
- `[].file_extension`: File Extension
- `[].file_size`: File Size (filesize)

### `convert_file`

**Convert File.** Converts a file between formats with any ConvertAPI converter (Office, PDF, images, HTML, CAD, email and more) and returns a list with one stored file per output, since some conversions produce several files (for example one image per PDF page). Prefer Merge PDF Files or Split PDF File for those PDF jobs. Secondary file inputs such as TemplateFile or OverlayFile are not exposed; use Custom API Call for converters that need them. Each call uses ConvertAPI conversions and creates new output files. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From Format. The format of the file you are converting. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To Format. What to convert the file into. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to convert. Files are not supported; an action that needs one fails. |
| `additionalFiles` | array | no |  | Additional Files. Files to add after the main one, for converters that combine files. Each item: { `file` }. |
| `options` | object | no |  | Conversion Options. Options of the chosen converter. Leave empty for the defaults. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `[].file`: File (url)
- `[].file_name`: File Name
- `[].file_extension`: File Extension
- `[].file_size`: File Size (filesize)

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
