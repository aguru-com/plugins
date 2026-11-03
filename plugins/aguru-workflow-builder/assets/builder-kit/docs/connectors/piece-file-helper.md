# Files Helper

Read, create, convert, check, zip and unzip files in your flow.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-file-helper'
  version: '0.2.0'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `read_file`

**Read File.** Decodes an input file and returns its contents as either UTF-8 text or a base64 string, selected by the output-format option. Use it to turn a file from a trigger or earlier step into a usable value - Text for text-based files such as .txt/.json, Base64 for binary files or API payloads; use Create File for the reverse direction, and Convert CSV to JSON in the CSV piece when you need parsed rows. Requires a file input and an output format (any other value errors); read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Pick a file from an earlier step or paste a URL to download. Files are not supported; an action that needs one fails. |
| `readOptions` | string | yes |  | Output Format. Text for text files, Base64 for images, PDFs and other binaries. One of `"text"`, `"base64"`. |

Output fields:

- `text`: Text
- `base64`: Base64
- `base64WithMimeType`: Base64 Data URL

### `createFile`

**Create File.** Writes a text string out to a new file with the given file name and character encoding (utf8 by default). Use it when a downstream step needs an actual file rather than a value - for example to attach generated CSV or JSON text to an email - and use Read File for the opposite direction. Requires the content and file name, and the encoding must be one of the supported Buffer encodings; nothing outside the run is changed, so it is idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. The text to write into the file. |
| `fileName` | string | yes |  | File Name. Include the extension so other steps know the file type. |
| `encoding` | string | yes | `"utf8"` | Encoding. How to read the content. Keep UTF-8 for text, Base64 for binary data. One of `"ascii"`, `"utf8"`, `"utf16le"`, `"ucs2"`, `"base64"`, `"base64url"`, `"latin1"`, `"binary"`, `"hex"`. |

Output fields:

- `fileName`: File Name
- `url`: File URL (url)

### `change_file_encoding`

**Change File Encoding.** Re-encodes the bytes of a file from one character encoding to another (e.g. latin1 to utf8), writing the result to a new file under the output name you give. Use it when a downstream step mis-reads a file because of its character set; use Read File to simply get the content as text, or Create File to build a file from a string. The declared source encoding must actually match the file, since it is decoded blindly - a wrong choice silently corrupts characters rather than failing; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputFile` | file | yes |  | Source File. Pick a file from an earlier step or paste a URL to download. Files are not supported; an action that needs one fails. |
| `inputEncoding` | string | yes |  | Source Encoding. The encoding the file is in now. A wrong choice garbles characters. One of `"ascii"`, `"utf8"`, `"utf16le"`, `"ucs2"`, `"base64"`, `"base64url"`, `"latin1"`, `"binary"`, `"hex"`. |
| `outputFileName` | string | yes |  | Output File Name. Include the file extension. |
| `outputEncoding` | string | yes |  | Output Encoding. The encoding the new file is saved in. UTF-8 works almost everywhere. One of `"ascii"`, `"utf8"`, `"utf16le"`, `"ucs2"`, `"base64"`, `"base64url"`, `"latin1"`, `"binary"`, `"hex"`. |

### `checkFileType`

**Check File Type.** Determines the MIME type of a file from its extension and reports whether it matches the selected MIME type. Use it as a guard before a format-specific step (e.g. only continue for images or PDFs); use Get File Name if you only want the name, or Read File to get the contents. Detection is extension-based only - contents are never sniffed, so the extension is trusted as-is and only a missing or unrecognized one falls back to application/octet-stream; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Pick a file from an earlier step or paste a URL to download. Files are not supported; an action that needs one fails. |
| `mimeTypes` | string | yes |  | Expected File Type. Matched against the type worked out from the file extension. One of `"application/octet-stream"`, `"text/plain"`, `"text/css"`, `"text/html"`, `"text/javascript"`, `"text/csv"`, `"text/calendar"`, `"image/apng"`, `"image/avif"`, `"image/gif"`, `"image/jpeg"`, `"image/png"`, `"image/svg+xml"`, `"image/webp"`, `"image/bmp"`, `"image/vnd.microsoft.icon"`, `"image/tiff"`, `"audio/aac"`, `"audio/mpeg"`, `"audio/ogg"`, `"audio/wav"`, `"audio/flac"`, `"audio/midi"`, `"audio/webm"`, `"video/mp4"` and 49 more. |

Output fields:

- `mimeType`: MIME Type
- `isMatch`: Is Match (boolean)

### `zipFiles`

**Zip Files.** Compresses one or many input files into a single zip archive, optionally placing each entry at a custom path inside the archive (e.g. foo/test.txt) and optionally password-protecting it with ZipCrypto or AES-256. Use it to bundle several files into one attachment or download; use Unzip File for the reverse direction. Requires the list of files and an output file name; entries default to their own file names, reusing the same in-zip path keeps only the later file, and there are no external side effects, so it is idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `files` | array | yes |  | Files. One row per file to add to the archive. Each item: { `file`, `filePath`? }. |
| `outputFileName` | string | yes |  | Output File Name. Include the .zip extension. |
| `usePassword` | boolean | no | `false` | Use Password. Require a password to open the archive. |
| `passwordOptions` | object | no |  | Password Options. An object whose fields depend on other inputs; the product shows them. |

### `unzipFile`

**Unzip File.** Extracts every file entry from a zip archive, writing each one out as its own file; supports password-protected archives. Use it to reach the contents of a zip attachment before processing them; use Zip Files for the reverse direction. Set Max Files to throw when an untrusted archive exceeds that entry count; directory entries are skipped, a wrong or missing password makes extraction fail, and the source archive is unchanged, so it is idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Zip File. Pick a zip from an earlier step or paste a URL to download. Files are not supported; an action that needs one fails. |
| `maxResults` | number | no | `0` | Max Files. Fail if the zip holds more files than this. 0 or empty: no limit. |
| `usePassword` | boolean | no | `false` | Use Password. Turn on if the zip needs a password to open. |
| `passwordOptions` | object | no |  | Password Options. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `[].file`: File URL (url)
- `[].filePath`: File Path

### `get_file_name`

**Get File Name.** Returns only the file name of an input file, without reading or decoding its contents. Use it when the name itself is what you need - to build a path, log it, or branch on the extension - and prefer Read File to get the content or Check File Type to resolve the MIME type. Requires a file input; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Pick a file from an earlier step or paste a URL to download. Files are not supported; an action that needs one fails. |

Output fields:

- `fileName`: File Name
