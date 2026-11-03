# Canva

Create stunning designs with Canva's powerful design automation tools

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-canva'
  version: '0.2.1'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To connect Canva, follow these steps:
> 1. Go to https://www.canva.com/developers/integrations and sign in.
> 2. Click **Create an integration** and fill in the app name and description.
> 3. Under **Configure** → **Authentication**, set the redirect URL to the one shown above.
> 4. Under **Configure** → **Scopes**, enable: `design:content:read`, `design:content:write`, `design:meta:read`, `asset:read`, `asset:write`, `folder:read`, `folder:write`, `profile:read`.
> 5. Copy the **Client ID** and **Client secret** and paste them above.

## Actions

### `create_design`

**Create Design.** Creates a brand-new Canva design, either from a preset type (doc, whiteboard, presentation) or with custom pixel dimensions (40-8000px), optionally titled and seeded with an existing image asset. Pick this to start a fresh design; use Import Design instead when converting an existing file like a PDF or PPTX. Not idempotent: every call creates another design, and untouched blank designs are auto-deleted after 7 days. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `designTypeOption` | string | yes | `"preset"` | 🎨 Design Type. Choose how to create your design - preset templates or custom dimensions. One of `"preset"`, `"custom"`. |
| `presetName` | string | no |  | Preset Design Type. ⚠️ Only fill this if you selected "Preset Design Type" above. One of `"doc"`, `"whiteboard"`, `"presentation"`. |
| `customWidth` | number | no |  | Custom Width (pixels). ⚠️ Only fill this if you selected "Custom Dimensions" above. Min: 40, Max: 8000. |
| `customHeight` | number | no |  | Custom Height (pixels). ⚠️ Only fill this if you selected "Custom Dimensions" above. Min: 40, Max: 8000. |
| `title` | string | no |  | 🏷️ Design Title. Optional: Name for your design (1-255 characters). If empty, Canva will auto-generate a title. |
| `assetId` | string | no |  | Asset. Optional: Select an existing image asset to add to the design. A value the product loads from the provider, such as an id; write the value itself. |

### `get_design`

**Get Design.** Fetches metadata for a single Canva design by design ID, including owner, edit/view URLs, and thumbnail. Pick this when you already know the design ID; use Find Design first if you only have a title or keywords. Read-only and idempotent; fails with 404 if the design does not exist or is inaccessible. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `designId` | string | yes |  | Design. Select the design to retrieve metadata for. A value the product loads from the provider, such as an id; write the value itself. |

### `upload_asset`

**Upload Asset.** Uploads an image (max 50MB) or video (max 500MB) file into the user's Canva media library via an asynchronous job, with a required asset name of at most 50 characters. Pick this to add media for later use in designs; use Import Design instead when the file should become an editable design itself. Not idempotent: each call starts a new upload and creates a duplicate asset. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Asset File. 📁 Supported formats: 🖼️ Images (max 50MB): JPG, JPEG, PNG, HEIC, GIF, TIFF, WEBP 🎬 Videos (max 500MB): M4V, MKV, MP4, MPEG, MOV, WEBM. Files are not supported; an action that needs one fails. |
| `assetName` | string | yes |  | Asset Name. 🏷️ Name for the asset (max 50 characters, supports emojis and special characters) |

### `import_design`

**Import Design.** Uploads an external document or design file (PDF, DOCX, PPTX, XLSX, PSD, AI, and similar) and converts it into a new Canva design via an asynchronous import job, with a required title of at most 50 characters. Pick this to bring existing files into Canva as editable designs; use Create Design for a blank design and Upload Asset for images/videos meant for the media library. Not idempotent: each call starts a new import and can create duplicate designs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Design File. 📄 Supported formats: 📋 Documents: PDF, DOC, DOCX, ODT, Pages 📊 Presentations: PPT, PPTX, ODP, Keynote 📈 Spreadsheets: XLS, XLSX, ODS, Numbers 🎨 Design Files: AI (Illustrator), PSD (Photoshop), ODG. Files are not supported; an action that needs one fails. |
| `designTitle` | string | yes |  | Design Title. 🏷️ Title for the imported design (max 50 characters, supports emojis and special characters) |
| `autoDetectMimeType` | boolean | no | `true` | 🔍 Auto-detect File Type. ✅ Recommended: Let Canva automatically detect the file type. Uncheck to manually specify MIME type from file extension. |

### `export_design`

**Export Design.** Starts an asynchronous export job that renders an existing Canva design as PDF, JPG, PNG, GIF, PPTX, or MP4, with format-specific options (quality, page selection, custom image dimensions, PDF paper size). Pick this when you need downloadable output files from a design; download URLs expire after 24 hours and the job may need to be polled for completion. Not idempotent: each call queues a new export job. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `designId` | string | yes |  | Design. Select the design to export. A value the product loads from the provider, such as an id; write the value itself. |
| `exportFormat` | string | yes |  | Export Format. The format to export the design to. One of `"pdf"`, `"jpg"`, `"png"`, `"gif"`, `"pptx"`, `"mp4"`. |
| `exportQuality` | string | no | `"regular"` | Export Quality. Export quality level (Pro quality may require premium elements license) One of `"regular"`, `"pro"`. |
| `pages` | array | no |  | Specific Pages. Page numbers to export (leave empty to export all pages). First page is 1. |
| `jpegQuality` | number | no | `80` | 📸 JPEG Quality. 🎯 JPEG ONLY: Compression quality (1-100, higher = better quality, larger file) |
| `pdfSize` | string | no | `"a4"` | 📄 PDF Paper Size. 🎯 PDF ONLY: Paper size for PDF export (only for Canva Docs) One of `"a4"`, `"a3"`, `"letter"`, `"legal"`. |
| `mp4Quality` | string | no | `"horizontal_1080p"` | 🎬 MP4 Quality. 🎯 MP4 ONLY: Video orientation and resolution for MP4 export. One of `"horizontal_480p"`, `"horizontal_720p"`, `"horizontal_1080p"`, `"horizontal_4k"`, `"vertical_480p"`, `"vertical_720p"`, `"vertical_1080p"`, `"vertical_4k"`. |
| `customWidth` | number | no |  | 📐 Custom Width (pixels). 🎯 IMAGES ONLY (JPG/PNG/GIF): Custom width (40-25000px). Leave empty for original size. |
| `customHeight` | number | no |  | 📐 Custom Height (pixels). 🎯 IMAGES ONLY (JPG/PNG/GIF): Custom height (40-25000px). Leave empty for original size. |
| `pngLossless` | boolean | no | `true` | 🔧 PNG Lossless Compression. 🎯 PNG ONLY: Export PNG without compression (default: true). Lossy compression requires Pro plan. |
| `pngTransparentBackground` | boolean | no | `false` | 🫥 PNG Transparent Background. 🎯 PNG ONLY: Export PNG with transparent background (Pro feature) |
| `pngSingleImage` | boolean | no | `false` | 📑 PNG Merge Multi-page. 🎯 PNG ONLY: Merge multi-page designs into a single image (default: separate images per page) |

### `move_folder_item`

**Move Folder Item.** Moves a design or image asset into a specified destination folder in Canva, identified by item ID and folder ID. Pick this to reorganize library content; it fails for items that currently live in multiple folders (those must be moved in the Canva UI). Effectively idempotent: repeating the same move leaves the item in the same destination folder. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to_folder_id` | string | yes |  | Destination Folder. Select the folder to move the item to. A value the product loads from the provider, such as an id; write the value itself. |
| `item_type` | string | yes | `"design"` | Item Type. Select the type of item you want to move. One of `"design"`, `"image"`. |
| `item_id` | string | yes |  | Item to Move. Select the item you want to move. A value the product loads from the provider, such as an id; write the value itself. |

### `find_design`

**Find Design.** Searches the user's Canva design library by keyword, with ownership (owned/shared) and sort filters plus continuation-token pagination; an empty query lists all designs. Pick this to discover or look up design IDs before getting, exporting, or moving a design, rather than creating a duplicate. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | 🔍 Search Query. Enter keywords to search designs by title or content (leave empty to get all designs) |
| `ownership` | string | no | `"any"` | 👥 Ownership Filter. Filter designs by who owns them. One of `"any"`, `"owned"`, `"shared"`. |
| `sort_by` | string | no | `"modified_descending"` | 📊 Sort By. How to order the search results. One of `"modified_descending"`, `"relevance"`, `"modified_ascending"`, `"title_ascending"`, `"title_descending"`. |
| `limit` | number | no | `20` | ⚙️ Result Limit (Advanced). Max designs to return (default: 20, max: 100). Higher numbers may be slower. |
| `continuation` | string | no |  | ⚙️ Continuation Token (Advanced). For pagination: token from previous search to get next page of results. |

### `get_folder`

**Get Folder.** Fetches metadata for a single Canva folder by folder ID, including its name, created/updated timestamps, and thumbnail. Pick this to verify a folder exists or get its details before moving items into it; it returns folder metadata only, not the folder contents. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder. Select the folder to retrieve metadata for. A value the product loads from the provider, such as an id; write the value itself. |

### `get_asset`

**Get Asset.** Fetches metadata for a single Canva library asset (image or video) by asset ID, including name, tags, timestamps, thumbnail, and import status. Pick this when you already have an asset ID and need its details or to confirm an upload finished importing; it is about library assets, not designs (use Get Design for those). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_id` | string | yes |  | Asset. Select the asset to retrieve metadata for. A value the product loads from the provider, such as an id; write the value itself. |

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
