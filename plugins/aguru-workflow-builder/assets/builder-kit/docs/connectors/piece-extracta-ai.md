# Extracta.ai

An AI document extraction & content analysis platform that transforms unstructured files (PDFs, images, URLs, etc.) into structured data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-extracta-ai'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Extracta-ai API key

## Actions

### `extract_file_data`

**Extract File Data.** Runs an end-to-end Extracta.ai extraction in one call: creates a new extraction configuration from the schema of fields you define (each with a key, type, and description), uploads the given file (PDF, image, Word doc, or text), and returns the resulting extraction/batch identifiers. Choose this when you have a file in hand and want structured data out without managing the extraction and upload steps separately. The field schema and the file are required; not idempotent, since each call provisions a fresh extraction and upload. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload for extraction. Supported: PDF, images (JPEG, PNG, TIFF, BMP), Word docs (DOC, DOCX), text files (TXT) Files are not supported; an action that needs one fails. |
| `name` | string | yes |  | Extraction Name. A descriptive name for the extraction. |
| `language` | string | yes | `"English"` | Language. Document's language for accurate extraction. Extracta.ai supports multiple languages with advanced AI algorithms designed to parse linguistic nuances. One of `"Multi-Lingual"`, `"Arabic"`, `"Bangla"`, `"Bulgarian"`, `"Croatian"`, `"Czech"`, `"English"`, `"Filipino"`, `"French"`, `"German"`, `"Hindi"`, `"Hungarian"`, `"Italian"`, `"Nepali"`, `"Polish"`, `"Portuguese"`, `"Romanian"`, `"Russian"`, `"Serbian"`, `"Spanish"`, `"Turkish"`, `"Ukrainian"`, `"Urdu"`, `"Vietnamese"`. |
| `fields` | array | yes |  | Fields to Extract. Define the data fields you want to extract from documents. Each item: { `key`, `type`, `description`, `example`?, `objectProperties`?, `arrayItemProperties`? }. |
| `description` | string | no |  | Description. A description for the extraction. |
| `hasTable` | boolean | no | `false` | Has Table. Whether the document contains tables. |
| `hasVisuals` | boolean | no | `false` | Has Visuals. Whether the document contains charts, graphs, or diagrams. |
| `handwrittenTextRecognition` | boolean | no | `false` | Handwritten Text Recognition. Whether to recognize handwritten text. |
| `checkboxRecognition` | boolean | no | `false` | Checkbox Recognition. Whether to recognize checkboxes and their states. |
| `longDocument` | boolean | no | `false` | Long Document. Enable for very large or complex documents. |
| `splitPdfPages` | boolean | no | `false` | Split PDF Pages. Treat each PDF page as a separate extraction unit. |
| `specificPageProcessing` | boolean | no | `false` | Specific Page Processing. Extract only a specified range of pages. |
| `pageFrom` | number | no |  | Page From. Starting page number (required if Specific Page Processing is enabled) |
| `pageTo` | number | no |  | Page To. Ending page number (required if Specific Page Processing is enabled) |

### `upload_file`

**Upload File.** Uploads a document file to an already-existing Extracta.ai extraction (identified by extractionId) so it can be processed against that extraction's field schema; optionally adds it to a given batch, otherwise a new batch is created. Use this when the extraction config already exists and you only need to feed it another file. Requires a valid extractionId; not idempotent, since each call uploads the file and starts new processing. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `extractionId` | string | yes |  | Extraction ID. Unique identifier for the extraction. |
| `file` | file | yes |  | File. Document file to upload (PDF, images, etc.) Files are not supported; an action that needs one fails. |
| `batchId` | string | no |  | Batch ID. The ID of the batch to add files to (optional). If not provided, a new batch will be created. |

### `get_extraction_results`

**Get Extraction Results.** Retrieves the extracted structured data for a previously submitted Extracta.ai batch, identified by extractionId and batchId; optionally narrow to a single file by passing its fileId. Use this to poll for or read back results after a file has been uploaded for extraction. Idempotent read; the API recommends spacing requests by ~2 seconds to avoid rate limits. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `extractionId` | string | yes |  | Extraction ID. The ID of the extraction. |
| `batchId` | string | yes |  | Batch ID. The ID of the batch. |
| `fileId` | string | no |  | File ID. The ID of the file (optional). If provided, filters results to only that file. |
