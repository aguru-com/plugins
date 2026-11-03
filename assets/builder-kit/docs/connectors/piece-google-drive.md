# Google Drive

Cloud storage and file backup

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-drive'
  version: '0.12.2'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Service Account (Advanced)

> Authenticate via service account from https://console.cloud.google.com/ > IAM & Admin > Service Accounts > Create Service Account > Keys > Add key.  <br> <br> You can optionally use domain-wide delegation (https://support.google.com/a/answer/162106?hl=en#zippy=%2Cset-up-domain-wide-delegation-for-a-client) to access files without adding the service account to each one. <br> <br> **Note:** Without a user email, the service account only has access to files/folders you explicitly share with it.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serviceAccount` | string | yes |  | Service Account JSON Key. |
| `userEmail` | string | no |  | User Email. Email address of the user to impersonate for domain-wide delegation. |

## Actions

### `create_new_gdrive_folder`

**Create Folder.** Creates a new empty folder in Google Drive, optionally nested under a parent folder. Use to set up a destination before uploading or moving files. Not idempotent: each call creates a distinct folder even with the same name (Drive permits duplicate folder names). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderName` | string | yes |  | Folder Name. |
| `parentFolder` | string | no |  | Parent Folder. Leave empty for the root of My Drive. Type to search by folder name. A value the product loads from the provider, such as an id; write the value itself. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `name`: Folder Name
- `id`: Folder ID
- `mimeType`: MIME Type
- `kind`: Kind

### `create_new_gdrive_file`

**Create File from Text.** Creates a new file in Google Drive from inline text content as plain text, CSV, or XML, optionally inside a parent folder. Use when an agent has generated text it needs to persist as a Drive file. Not idempotent: each call creates a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileName` | string | yes |  | File Name. Include the extension, for example report.csv. |
| `text` | string | yes |  | Content. The text written into the file. |
| `fileType` | string | yes | `"text/plain"` | File Type. Plain text, CSV or XML. Match the extension in the file name. One of `"text/plain"`, `"text/csv"`, `"text/xml"`. |
| `parentFolder` | string | no |  | Parent Folder. Leave empty for the root of My Drive. Type to search by folder name. A value the product loads from the provider, such as an id; write the value itself. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `name`: File Name
- `id`: File ID
- `mimeType`: MIME Type
- `kind`: Kind

### `upload_gdrive_file`

**Upload File.** Uploads a binary file (from a URL or base64 input) into Google Drive, optionally inside a parent folder. Use to store an existing file or attachment in Drive; the MIME type is inferred from the file extension. Not idempotent: each call creates a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileName` | string | yes |  | File Name. Name shown in Drive, including the extension. |
| `file` | file | yes |  | File. The file to upload, from an earlier step or a URL. Files are not supported; an action that needs one fails. |
| `parentFolder` | string | no |  | Parent Folder. Leave empty for the root of My Drive. Type to search by folder name. A value the product loads from the provider, such as an id; write the value itself. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `name`: File Name
- `id`: File ID
- `mimeType`: MIME Type
- `kind`: Kind

### `read-file`

**Download File.** Downloads the content of a Drive file by its file ID and returns it as a usable file reference. Use to retrieve a file an agent already knows the ID of (e.g. from a trigger or search). Read-only and idempotent. Requires the exact file ID, not a name. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File ID. Use the ID from a trigger or the Find File or Folder action. |
| `fileName` | string | no |  | File Name. Name for the saved file. Empty uses the file ID plus its extension. |

### `get-file-or-folder-by-id`

**Get File Information.** Fetches metadata for a single file or folder in Google Drive by its exact ID (name, MIME type, parents, etc.). Use when an agent already has a file/folder ID and needs its details. Read-only and idempotent. Requires the resource ID, not a name or path. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | File or Folder ID. The ID from the item's Drive URL or an earlier step. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `name`: Name
- `id`: File ID
- `mimeType`: MIME Type
- `kind`: Kind

### `list-files`

**List Files.** Lists files and subfolders inside a given Drive folder, with optional recursion to a chosen depth and optional download of each file's content. Use to enumerate the contents of a known folder ID. Read-only and idempotent. Requires the folder ID, not a name. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Folder ID. The ID after /folders/ in the folder URL, or from an earlier step. |
| `depthLevel` | number | no | `1` | Folder Depth. 1 lists only this folder; 2 adds its subfolders, and so on. |
| `downloadFiles` | boolean | no | `false` | Download Files. Also download every file. Slow for large folders. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |
| `includeTrashed` | boolean | no | `false` | Include Trashed. Also list files that are in the bin. |

Output fields:

- `files`: Files
- `files[].name`: Name
- `files[].id`: File ID
- `files[].mimeType`: MIME Type
- `files[].trashed`: Trashed (boolean)
- `files[].parents[0]`: Parent Folder ID
- `files[].downloadedFile`: Downloaded File URL (url)
- `incompleteSearch`: Incomplete Search (boolean)

### `search-folder`

**Find File or Folder.** Searches Google Drive for files or folders matching a name, full-text, or MIME-type query, optionally scoped to a parent folder and filtered to files or folders only. Use to resolve a file/folder ID from a human-readable name before acting on it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queryTerm` | string | yes | `"name"` | Search By. Match the file name, the text inside it, or its type. One of `"name"`, `"fullText"`, `"mimeType"`. |
| `operator` | string | yes | `"contains"` | Match. Contains finds partial matches; Equals needs the exact value. One of `"contains"`, `"="`. |
| `query` | string | yes |  | Search Text. The name, text or type to look for. |
| `type` | string | no | `"all"` | Show. Return everything, only files or only folders. One of `"all"`, `"file"`, `"folder"`. |
| `parentFolder` | string | no |  | Search in Folder. Leave empty to search all of Drive. Type to search by folder name. A value the product loads from the provider, such as an id; write the value itself. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `[].name`: Name
- `[].mimeType`: MIME Type
- `[].id`: File ID
- `[].createdTime`: Created Time (datetime)
- `[].modifiedTime`: Modified Time (datetime)

### `duplicate_file`

**Duplicate File.** Copies an existing Drive file into a target folder under a new name, optionally converting it to a Google Sheet or Google Doc. Use to clone a file or create an editable Google-format copy. Requires the source file ID and destination folder ID. Not idempotent: each call creates a new copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File ID. The ID of the file to copy. |
| `name` | string | yes |  | New File Name. Name of the copy. |
| `folderId` | string | yes |  | Destination Folder ID. The ID of the folder that receives the copy. |
| `mimeType` | string | no |  | Convert To. Empty keeps the original format. One of `"application/vnd.google-apps.spreadsheet"`, `"application/vnd.google-apps.document"`. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `name`: File Name
- `id`: File ID
- `mimeType`: MIME Type
- `kind`: Kind

### `save_file_as_pdf`

**Save Document as PDF.** Exports a Google document to PDF and saves it as a new file in a target Drive folder. Use to produce a PDF rendition of a Google Doc/Sheet/Slides for sharing or archival. Requires the source document ID and destination folder ID. Not idempotent: each call creates a new PDF file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The ID of the Google Doc, Sheet or Slides to export. |
| `folderId` | string | yes |  | Destination Folder ID. The ID of the folder that receives the PDF. |
| `name` | string | yes |  | File Name. Without the extension; .pdf is added. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `name`: File Name
- `id`: File ID
- `mimeType`: MIME Type
- `kind`: Kind

### `update_permissions`

**Share File or Folder.** Grants a specified role (reader, commenter, writer, fileOrganizer, or organizer) on a Drive file or folder to a user identified by email, optionally sending a notification email. Use to share a resource with a person. Requires the file/folder ID and target email. Not idempotent: each call creates a new permission grant. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File or Folder ID. The ID from the item's Drive URL or an earlier step. |
| `user_email` | string | yes |  | User Email. The person who receives the access. |
| `permission_name` | string | yes |  | Role. What the person can do. Manager roles apply to shared drives only. One of `"organizer"`, `"fileOrganizer"`, `"writer"`, `"commenter"`, `"reader"`. |
| `send_invitation_email` | boolean | yes |  | Send Invitation Email. Email the person that they now have access. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `role`: Role
- `type`: Type
- `id`: Permission ID

### `delete_permissions`

**Remove Access.** Revokes a specific role from a user (matched by email and role) on a Drive file or folder. Use to unshare or downgrade access for someone. Requires the file/folder ID, the user email, and the role to remove. Idempotent: if no matching permission exists, the call is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File or Folder ID. The ID from the item's Drive URL or an earlier step. |
| `user_email` | string | yes |  | User Email. The person whose access is removed. |
| `permission_name` | string | yes |  | Role. The role to remove. Other roles the person has stay. One of `"organizer"`, `"fileOrganizer"`, `"writer"`, `"commenter"`, `"reader"`. |

Output fields:

- `removed`: Removed (boolean)
- `message`: Message

### `set_public_access`

**Set Public Access.** Makes a Drive file or folder accessible to anyone with the link at the chosen role (reader, commenter, or writer) and returns its shareable view/download URL. Use to publish a resource publicly. Requires the file/folder ID. Not idempotent: each call adds a new anyone-with-link permission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File or Folder ID. The ID from the item's Drive URL or an earlier step. |
| `role` | string | yes | `"reader"` | Role. What anyone with the link can do. One of `"reader"`, `"commenter"`, `"writer"`. |

Output fields:

- `type`: Type
- `role`: Role
- `id`: Permission ID
- `allowFileDiscovery`: Allow File Discovery (boolean)
- `downloadUrl`: Download URL (url)
- `kind`: Kind

### `google-drive-move-file`

**Move File.** Relocates a Drive file to a target folder, detaching it from its current parents and attaching it to the new one. Use to reorganize a file once you know its ID and the destination folder ID. Idempotent: repeating with the same destination leaves the file in the same folder. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File ID. Use the ID from a trigger or the Find File or Folder action. |
| `folderId` | string | no |  | Destination Folder. The folder to move the file into. Type to search by folder name. A value the product loads from the provider, such as an id; write the value itself. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `name`: File Name
- `id`: File ID
- `mimeType`: MIME Type
- `webViewLink`: View Link (url)
- `webContentLink`: Download Link (url)
- `iconLink`: Icon (image)
- `size`: Size (filesize)
- `fileExtension`: File Extension
- `starred`: Starred (boolean)
- `trashed`: Trashed (boolean)
- `shared`: Shared (boolean)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `parents`: Parent Folder IDs
- `owners`: Owners
- `owners[].displayName`: Name
- `owners[].emailAddress`: Email (email)
- `owners[].photoLink`: Photo (image)
- `owners[].me`: Is Me (boolean)
- `lastModifyingUser`: Last Modifying User
- `lastModifyingUser.displayName`: Name
- `lastModifyingUser.emailAddress`: Email (email)
- `lastModifyingUser.photoLink`: Photo (image)
- `permissions`: Permissions
- `permissions[].displayName`: Name
- `permissions[].emailAddress`: Email (email)
- `permissions[].role`: Role
- `permissions[].type`: Type
- `permissions[].id`: Permission ID

### `delete_gdrive_file`

**Delete File.** Permanently deletes a file from Google Drive by its ID, bypassing the trash and making it unrecoverable. Use only when permanent removal is intended; prefer Trash file for reversible deletion. Requires the file ID. Not idempotent: a repeat call fails because the file no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File ID. The ID of the file to delete. This cannot be undone. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

### `trash_gdrive_file`

**Move File to Trash.** Moves a Drive file to the trash by its ID, a reversible deletion that can be restored from Drive. Use for safe removal instead of permanent deletion. Requires the file ID. Idempotent: re-trashing an already-trashed file leaves it in the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File ID. The ID of the file to trash. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |

Output fields:

- `name`: File Name
- `id`: File ID
- `mimeType`: MIME Type
- `kind`: Kind

### `drive_export_folder_as_zip`

**Export Folder as Zip.** Recursively downloads every file in a Drive folder (including subfolders) and packages them into a single zip whose internal paths mirror the folder hierarchy. Native Google Docs/Sheets/Slides are converted per user-chosen format (PDF/Office format) or skipped. Fails the whole action if any single file cannot be downloaded/exported. Optionally password-protects the zip. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Folder. Everything inside it, including subfolders, goes into the zip. A value the product loads from the provider, such as an id; write the value itself. |
| `includeTeamDrives` | boolean | no | `false` | Include Team Drives. Also include shared drives, not only My Drive. |
| `googleDocsFormat` | string | yes | `"docx"` | Google Docs As. Convert Docs to Word or PDF, or leave them out. One of `"docx"`, `"pdf"`, `"skip"`. |
| `googleSheetsFormat` | string | yes | `"xlsx"` | Google Sheets As. Convert Sheets to Excel or PDF, or leave them out. One of `"xlsx"`, `"pdf"`, `"skip"`. |
| `googleSlidesFormat` | string | yes | `"pptx"` | Google Slides As. Convert Slides to PowerPoint or PDF, or leave them out. One of `"pptx"`, `"pdf"`, `"skip"`. |
| `outputFileName` | string | yes | `"export.zip"` | Zip File Name. Include the .zip extension. |
| `usePassword` | boolean | no | `false` | Use Password. Encrypt the zip so a password is needed to open it. |
| `passwordOptions` | object | no |  | Password Options. An object whose fields depend on other inputs; the product shows them. |

### `drive_create_folder`

**Create Folder.** Creates a new empty folder in Google Drive, optionally nested under a parent folder (resolve the parent ID via `drive_search_files`). Use to set up a destination before uploading or moving files. Each call creates a distinct folder even with the same name, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_name` | string | yes |  | Folder name. The name of the new folder. |
| `parent_folder_id` | string | no |  | Parent Folder ID. The ID of the folder to create the new folder inside. Leave empty to create it in the root of My Drive. Resolve a folder ID with `drive_search_files`. |

Output fields:

- `id`: Folder ID
- `name`: Folder Name
- `mimeType`: MIME Type
- `kind`: Kind
- `createdTime`: Created Time (datetime)
- `parents`: Parent Folder IDs
- `webViewLink`: View Link (url)

### `drive_create_file_from_text`

**Create File from Text.** Creates a new Drive file from inline text content as plain text, CSV, or XML. Use when an agent has generated text it needs to persist as a Drive file; for binary or existing files use `drive_upload_file` instead. Each call creates a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_name` | string | yes |  | File name. The name of the new text file. |
| `text` | string | yes |  | Text. The text content to add to file. |
| `content_type` | string | yes | `"plain/text"` | Content type. Select file type. One of `"plain/text"`, `"text/csv"`, `"text/xml"`. |
| `parent_folder_id` | string | no |  | Parent Folder ID. The ID of the folder to create the file inside. Leave empty to create it in the root of My Drive. Resolve a folder ID with `drive_search_files`. |

Output fields:

- `id`: File ID
- `name`: File Name
- `mimeType`: MIME Type
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)
- `webContentLink`: Download Link (url)
- `fileExtension`: File Extension
- `size`: Size (filesize)
- `parents`: Parent Folder IDs
- `owners`: Owners
- `owners[].displayName`: Name
- `owners[].emailAddress`: Email (email)
- `owners[].photoLink`: Photo (image)
- `owners[].me`: Is Me (boolean)
- `lastModifyingUser`: Last Modifying User
- `lastModifyingUser.displayName`: Name
- `lastModifyingUser.emailAddress`: Email (email)
- `lastModifyingUser.photoLink`: Photo (image)
- `shared`: Shared (boolean)

### `drive_upload_file`

**Upload File.** Uploads a binary file (from a URL or base64 input) into Drive; MIME type is inferred from the extension. Use to store an existing file or attachment; for plain generated text use `drive_create_file_from_text`, and to fetch a remote URL server-side use `drive_upload_from_url`. Each call creates a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_name` | string | yes |  | File name. The name of the file. |
| `file` | file | yes |  | File. The file URL or base64 to upload. Files are not supported; an action that needs one fails. |
| `parent_folder_id` | string | no |  | Parent Folder ID. The ID of the folder to upload the file into. Leave empty to upload to the root of My Drive. Resolve a folder ID with `drive_search_files`. |

Output fields:

- `id`: File ID
- `name`: File Name
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)
- `webContentLink`: Download Link (url)
- `iconLink`: Icon (image)
- `fileExtension`: File Extension
- `parents`: Parent Folder IDs
- `owners`: Owners
- `owners[].displayName`: Name
- `owners[].emailAddress`: Email (email)
- `owners[].me`: Is Me (boolean)

### `drive_upload_from_url`

**Upload File from URL.** Fetches a file from a public URL and uploads it into Drive in one step (server-side fetch, no base64 round-trip). Use when the agent has a downloadable link rather than file bytes; for bytes already in hand use `drive_upload_file`, and for plain generated text use `drive_create_file_from_text`. Each call creates a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_url` | string | yes |  | Source URL. The publicly accessible URL to fetch the file from. Only public URLs are supported (no authentication headers are sent). |
| `file_name` | string | yes |  | File name. The name to give the uploaded file in Drive. |
| `mime_type` | string | no |  | MIME Type. Optional MIME type for the uploaded file (e.g. application/pdf). Provide this when the URL has no file extension; otherwise the type is inferred from the URL. |
| `parent_folder_id` | string | no |  | Parent Folder ID. The ID of the folder to upload the file into. Leave empty to upload to the root of My Drive. Resolve a folder ID with `drive_search_files`. |

Output fields:

- `id`: File ID
- `name`: File Name
- `mimeType`: MIME Type
- `kind`: Kind

### `drive_replace_file_content`

**Replace File Content.** Replaces the contents of an existing Drive file with new bytes, keeping the same file ID, name, and location. Use to update a file in place (e.g. overwrite a report); to create a brand-new file use `drive_upload_file`, and to rename without changing content use `drive_update_file_metadata`. Each call overwrites the previous content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the existing file whose content to replace. Resolve it via `drive_search_files` or `drive_get_file`. |
| `file` | file | yes |  | New File Content. The file URL or base64 whose bytes will replace the existing content. Files are not supported; an action that needs one fails. |
| `mime_type` | string | no |  | MIME Type. Optional MIME type for the new content (e.g. application/pdf). Provide this when the source has no file extension; otherwise the type is inferred from the extension. |

Output fields:

- `id`: File ID
- `name`: File Name
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)

### `drive_download_file`

**Download File Content.** Downloads a Drive file's bytes by ID and returns a file reference; native Google files (Docs/Sheets/Slides) are auto-exported to their default Office format. Use to retrieve content of a file you have the ID for (obtain it from `drive_search_files` or `drive_get_file`). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file to download. Resolve it via `drive_search_files` or `drive_get_file`. |
| `destination_file_name` | string | no |  | Destination File name. |

### `drive_export_workspace_file`

**Export Google Doc/Sheet/Slides.** Exports a native Google Workspace file (Doc/Sheet/Slides) to a caller-chosen format and returns the bytes. Use when you need a specific format such as PDF, HTML, CSV, or Markdown; for the default rendition or for ordinary binary files use `drive_download_file`. The chosen format must match the source type (Doc formats for a Doc, Sheet formats for a Sheet, etc.). Read-only. Export size is capped at ~10 MB by Drive. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the native Google Workspace file to export. Resolve it via `drive_search_files` or `drive_get_file`. |
| `mime_type` | string | yes |  | Export Format. The target format. It must match the source type: Doc formats for a Google Doc, Sheet formats for a Google Sheet, Slides formats for Google Slides. An incompatible pairing returns an error. One of `"application/vnd.openxmlformats-officedocument.wordprocessingml.document"`, `"application/pdf"`, `"text/html"`, `"text/plain"`, `"application/rtf"`, `"application/vnd.oasis.opendocument.text"`, `"application/epub+zip"`, `"text/markdown"`, `"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`, `"text/csv"`, `"text/tab-separated-values"`, `"application/vnd.oasis.opendocument.spreadsheet"`, `"application/vnd.openxmlformats-officedocument.presentationml.presentation"`, `"application/vnd.oasis.opendocument.presentation"`, `"image/png"`, `"image/svg+xml"`. |

### `drive_get_file`

**Get File or Folder.** Fetches metadata for a single file or folder by its exact ID (name, MIME type, parents, owners, links). Use when you already have an ID (e.g. from a trigger or `drive_search_files`) and need its details, including its parent folder IDs. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File / Folder ID. The ID of the file/folder to fetch. Resolve it via `drive_search_files` or `drive_list_files`. |

Output fields:

- `id`: File ID
- `name`: File Name
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)
- `webContentLink`: Download Link (url)
- `iconLink`: Icon (image)
- `fileExtension`: File Extension
- `starred`: Starred (boolean)
- `trashed`: Trashed (boolean)
- `shared`: Shared (boolean)
- `parents`: Parent Folder IDs
- `owners`: Owners
- `owners[].displayName`: Name
- `owners[].emailAddress`: Email (email)
- `owners[].photoLink`: Photo (image)
- `owners[].me`: Is Me (boolean)
- `lastModifyingUser`: Last Modifying User
- `lastModifyingUser.displayName`: Name
- `lastModifyingUser.emailAddress`: Email (email)
- `lastModifyingUser.photoLink`: Photo (image)

### `drive_list_files`

**List Folder Contents.** Lists files and subfolders inside a given folder ID, optionally recursing to a chosen depth and downloading each file's content. Use to enumerate the contents of a known folder; to find a file by name across Drive use `drive_search_files`. Read-only. Requires the folder ID, not a name. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder to list. Resolve it via `drive_search_files` (or any other source). |
| `include_trashed` | boolean | no | `false` | Include Trashed. Include new files that have been trashed. |
| `depth_level` | number | no | `1` | Depth Level. How many levels deep to search for files. 1 = current folder only, 2 = current + next level, etc. |
| `download_files` | boolean | no | `false` | Download Files. Download all file contents in a list. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Determines if folders from Team Drives should be included in the results. |

Output fields:

- `files`: Files
- `files[].id`: File ID
- `files[].name`: File Name
- `files[].mimeType`: MIME Type
- `files[].size`: Size (filesize)
- `files[].createdTime`: Created Time (datetime)
- `files[].modifiedTime`: Modified Time (datetime)
- `files[].webViewLink`: View Link (url)
- `files[].webContentLink`: Download Link (url)
- `files[].fileExtension`: File Extension
- `files[].starred`: Starred (boolean)
- `files[].trashed`: Trashed (boolean)
- `files[].shared`: Shared (boolean)
- `files[].downloadedFile`: Downloaded File URL (url)
- `incompleteSearch`: Incomplete Search (boolean)

### `drive_search_files`

**Search Files and Folders.** Searches Drive for files or folders matching a name, full-text, or MIME-type query, optionally scoped to a parent folder. Use this to resolve a human-readable name into a file/folder ID before acting on it; to list a known folder's children use `drive_list_files` instead. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query_term` | string | yes | `"name"` | Query Term. The Query term or field of file/folder to search upon. One of `"name"`, `"fullText"`, `"mimeType"`. |
| `operator` | string | yes | `"contains"` | Operator. The operator to create criteria. One of `"contains"`, `"="`. |
| `value` | string | yes |  | Value. Value of the field of file/folder to search for. |
| `type` | string | no | `"all"` | File Type. (Optional) Choose between files and folders. One of `"all"`, `"file"`, `"folder"`. |
| `parent_folder_id` | string | no |  | Parent Folder ID. (Optional) Restrict the search to files/folders inside this folder ID. |
| `include_team_drives` | boolean | no | `false` | Include Team Drives. Determines if folders from Team Drives should be included in the results. |

Output fields:

- `files`: Search Results
- `files[].id`: File ID
- `files[].name`: File Name
- `files[].mimeType`: MIME Type
- `files[].size`: Size (filesize)
- `files[].createdTime`: Created Time (datetime)
- `files[].modifiedTime`: Modified Time (datetime)
- `files[].webViewLink`: View Link (url)
- `files[].webContentLink`: Download Link (url)
- `files[].fileExtension`: File Extension

### `drive_copy_file`

**Copy File.** Copies an existing Drive file into a target folder under a new name, optionally converting it to a Google Sheet or Doc. Use to clone a file or make an editable Google-format copy; to relocate the original instead of copying use `drive_move_file`. Requires source file ID and destination folder ID. Each call creates a new copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file to duplicate. Resolve it via `drive_search_files`. |
| `name` | string | yes |  | Name. The name of the new file. |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder where the file will be duplicated. Resolve it via `drive_search_files`. |
| `convert_to` | string | no |  | Duplicate as. If left unselected the file will be duplicated as it is. One of `"application/vnd.google-apps.spreadsheet"`, `"application/vnd.google-apps.document"`. |

Output fields:

- `id`: File ID
- `name`: File Name
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)
- `webContentLink`: Download Link (url)
- `fileExtension`: File Extension
- `parents`: Parent Folder IDs
- `owners`: Owners
- `owners[].displayName`: Name
- `owners[].emailAddress`: Email (email)
- `owners[].me`: Is Me (boolean)

### `drive_move_file`

**Move File.** Relocates a file to a target folder, detaching it from its current parents and attaching the new one. Use to reorganize a file by ID; to copy instead of move use drive_copy_file, and to rename without moving use drive_update_file_metadata. Safe to retry — repeating leaves the file in the same destination. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file to move. Resolve it via drive_search_files or drive_get_file. |
| `folder_id` | string | yes |  | Destination Folder ID. The ID of the folder to move the file into. Resolve it via drive_search_files; leave empty for the root of My Drive. |

Output fields:

- `id`: File ID
- `name`: File Name
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)
- `webContentLink`: Download Link (url)
- `fileExtension`: File Extension
- `parents`: Parent Folder IDs
- `shared`: Shared (boolean)
- `owners`: Owners
- `owners[].displayName`: Name
- `owners[].emailAddress`: Email (email)
- `owners[].me`: Is Me (boolean)

### `drive_update_file_metadata`

**Update File Metadata (Rename).** Renames a file/folder or updates its description or starred flag via a metadata-only PATCH. Use to rename or annotate a resource; this never changes the file's location — to re-parent use `drive_move_file`, and to replace the file's bytes use `drive_replace_file_content`. Safe to retry — re-applying the same values is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File or Folder ID. The ID of the file or folder to update. Resolve it via `drive_search_files` or `drive_get_file`. |
| `name` | string | no |  | New Name. A new name for the file or folder. Leave empty to keep the current name. |
| `description` | string | no |  | Description. A new description for the file or folder. Leave empty to keep the current description. |
| `starred` | boolean | no |  | Starred. Whether to mark the file or folder as starred. |

Output fields:

- `id`: File ID
- `name`: File Name
- `description`: Description
- `mimeType`: MIME Type
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `starred`: Starred (boolean)
- `trashed`: Trashed (boolean)
- `webViewLink`: View Link (url)
- `size`: Size (filesize)

### `drive_save_file_as_pdf`

**Save File as PDF.** Exports a native Google document to PDF and saves it as a new file in a target Drive folder. Use to produce a PDF rendition of a Google Doc/Sheet/Slides for sharing or archival (resolve the source and folder IDs via `drive_search_files`). Each call creates a new PDF file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document ID. The ID of the document to export. Resolve it via `drive_search_files`. |
| `folder_id` | string | yes |  | Folder ID. The ID of the folder where the file will be exported. Resolve it via `drive_search_files`. |
| `name` | string | yes |  | Name. The name of the new file (do not include the extension) |

Output fields:

- `id`: File ID
- `name`: File Name
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)

### `drive_trash_file`

**Trash File.** Moves a file to the trash by ID — a reversible deletion restorable from Drive. Use for safe removal; for irreversible removal use drive_delete_file, and to restore use drive_untrash_file. Safe to retry — re-trashing leaves it trashed. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file to trash. Resolve it via drive_search_files or drive_get_file. |

Output fields:

- `id`: File ID
- `name`: File Name
- `trashed`: Trashed (boolean)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)

### `drive_untrash_file`

**Restore File from Trash.** Restores a trashed file by ID back to its original location. Use to undo a `drive_trash_file`; to permanently purge instead use `drive_empty_trash` or `drive_delete_file`. Safe to retry — re-restoring an active file is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the trashed file to restore. Resolve it via drive_search_files or drive_get_file. |

Output fields:

- `id`: File ID
- `name`: File Name
- `trashed`: Trashed (boolean)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `webViewLink`: View Link (url)

### `drive_delete_file`

**Delete File Permanently.** Permanently deletes a file by ID, bypassing the trash — unrecoverable. Use only when permanent removal is intended; for reversible deletion prefer drive_trash_file. A repeat call fails because the file no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file to permanently delete. Resolve it via drive_search_files or drive_get_file. |

### `drive_empty_trash`

**Empty Trash.** DESTRUCTIVE: permanently deletes EVERY file currently in the trash — this is an irreversible, account-wide purge (not a single file), or scoped to one shared drive if `drive_id` is given. The entire trash is emptied, so any file the user trashed is gone for good. Use only as a deliberate cleanup step; to remove a single file reversibly use `drive_trash_file`, and to permanently remove one specific file use `drive_delete_file`. Not safe to retry casually — it purges whatever is in the trash at call time. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `drive_id` | string | no |  | Shared Drive ID. Optional. Restrict the purge to a single shared drive's trash (resolve via drive_list_shared_drives). Leave empty to empty the entire My Drive trash for the connected account. |

Output fields:

- `success`: Success (boolean)
- `driveId`: Drive ID

### `drive_share_file`

**Share File with User.** Grants a role to a user (by email) on a file or folder, optionally emailing them. Use to share with a specific person; to share with anyone-with-the-link use drive_set_public_access, and to change an existing collaborator's role use drive_update_permission. Each call creates a new permission grant. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File or Folder ID. The ID of the file or folder to share. Resolve it via drive_search_files or drive_get_file. |
| `user_email` | string | yes |  | User Email. The email address of the user to grant access to. |
| `role` | string | yes |  | Role. The role to grant to the user. See https://developers.google.com/drive/api/guides/ref-roles. One of `"organizer"`, `"fileOrganizer"`, `"writer"`, `"commenter"`, `"reader"`. |
| `send_invitation_email` | boolean | yes |  | Send Invitation Email. Send an email to the user to notify them of the new permission. |

Output fields:

- `id`: Permission ID
- `type`: Type
- `role`: Role
- `emailAddress`: Email Address (email)
- `displayName`: Display Name
- `photoLink`: Photo (image)
- `pendingOwner`: Pending Owner (boolean)
- `deleted`: Deleted (boolean)
- `permissionDetails`: Permission Details
- `permissionDetails[].role`: Role
- `permissionDetails[].permissionType`: Permission Type
- `permissionDetails[].inherited`: Inherited (boolean)

### `drive_set_public_access`

**Set Public Access.** Makes a file or folder accessible to anyone with the link at the chosen role and returns its shareable view/download URL. Use to publish a resource publicly; to share with a named person instead use drive_share_file. Each call adds a new anyone-with-link permission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File or Folder ID. The ID of the file or folder to make public. Resolve it via drive_search_files or drive_get_file. |
| `role` | string | yes | `"reader"` | Role. The role to assign for public access. One of `"reader"`, `"commenter"`, `"writer"`. |

Output fields:

- `id`: Permission ID
- `type`: Type
- `role`: Role
- `allowFileDiscovery`: Allow File Discovery (boolean)
- `permissionDetails`: Permission Details
- `permissionDetails[].role`: Role
- `permissionDetails[].permissionType`: Permission Type
- `permissionDetails[].inherited`: Inherited (boolean)

### `drive_list_permissions`

**List Permissions.** Lists every permission (who has access and at what role) on a file or folder, with each permission's id, type, role, and email/domain. Use to audit sharing before granting or revoking; it is the resolver for the permissionId other sharing atomics need. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File or Folder ID. The ID of the file or folder whose permissions to list. Resolve it via drive_search_files or drive_get_file. |

Output fields:

- `permissions`: Permissions
- `permissions[].id`: Permission ID
- `permissions[].type`: Type
- `permissions[].role`: Role
- `permissions[].emailAddress`: Email Address (email)
- `permissions[].displayName`: Display Name
- `permissions[].photoLink`: Photo (image)
- `permissions[].deleted`: Deleted (boolean)
- `permissions[].pendingOwner`: Pending Owner (boolean)

### `drive_update_permission`

**Update Permission Role.** Changes an existing collaborator's role in place (e.g. reader to writer), resolving the permission by their email internally. Use to upgrade or downgrade access without unsharing; to grant net-new access use drive_share_file. If the user has no existing grant it is a no-op (it never silently creates one). Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File or Folder ID. The ID of the file or folder whose permission to update. Resolve it via drive_search_files or drive_get_file. |
| `user_email` | string | yes |  | User Email. The email address of the collaborator whose role to change. The existing permission is matched by this email; list current grants via drive_list_permissions. |
| `new_role` | string | yes |  | New Role. The role to set for the user. See https://developers.google.com/drive/api/guides/ref-roles. One of `"organizer"`, `"fileOrganizer"`, `"writer"`, `"commenter"`, `"reader"`. |

Output fields:

- `id`: Permission ID
- `type`: Type
- `role`: Role
- `emailAddress`: Email Address (email)
- `displayName`: Display Name
- `photoLink`: Photo (image)

### `drive_remove_permission`

**Remove Permission.** Revokes a specific role from a user (matched by email and role) on a file or folder, resolving the permission ID internally. Use to unshare or remove access; to lower a role instead of removing it use drive_update_permission. Safe to retry — if no matching permission exists it is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File or Folder ID. The ID of the file or folder to remove the permission from. Resolve it via drive_search_files or drive_get_file. |
| `user_email` | string | yes |  | User Email. The email address of the user whose access to revoke. |
| `role` | string | yes |  | Role. The role to remove from the user. The grant is matched by email and role. One of `"organizer"`, `"fileOrganizer"`, `"writer"`, `"commenter"`, `"reader"`. |

Output fields:

- `removed`: Removed (boolean)
- `message`: Message

### `drive_list_shared_drives`

**List Shared Drives.** Lists the shared drives the account can access, with each drive's id and name. Use to discover a driveId before creating or listing content in a shared drive or before drive_get_shared_drive, drive_update_shared_drive, or drive_delete_shared_drive. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Optional search query to filter shared drives, e.g. name contains 'marketing'. See https://developers.google.com/drive/api/guides/search-shareddrives. |
| `page_size` | number | no |  | Page Size. Maximum number of shared drives to return (1-100). Defaults to 100. |

Output fields:

- `drives`: Shared Drives
- `drives[].id`: Drive ID
- `drives[].name`: Drive Name
- `drives[].kind`: Kind
- `drives[].colorRgb`: Color
- `drives[].createdTime`: Created Time (datetime)

### `drive_get_shared_drive`

**Get Shared Drive.** Fetches metadata and capabilities for one shared drive by ID (resolve the ID via drive_list_shared_drives). Use to inspect a shared drive's settings before modifying it. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `drive_id` | string | yes |  | Shared Drive ID. The ID of the shared drive. Resolve it via drive_list_shared_drives. |

Output fields:

- `id`: Drive ID
- `name`: Drive Name
- `kind`: Kind
- `colorRgb`: Color
- `createdTime`: Created Time (datetime)
- `restrictions`: Restrictions
- `restrictions.adminManagedRestrictions`: Admin Managed (boolean)
- `restrictions.copyRequiresWriterPermission`: Copy Requires Writer Permission (boolean)
- `restrictions.domainUsersOnly`: Domain Users Only (boolean)
- `restrictions.driveMembersOnly`: Drive Members Only (boolean)

### `drive_create_shared_drive`

**Create Shared Drive.** Creates a new shared drive (Team Drive) with the given name; the action supplies the required idempotency requestId internally. Use to set up a shared workspace. Each call creates a distinct shared drive. Your Workspace admin must have shared-drive creation enabled (a 403 here is an admin-policy issue, not a scope issue). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the new shared drive. |

Output fields:

- `id`: Drive ID
- `name`: Drive Name
- `kind`: Kind
- `colorRgb`: Color
- `createdTime`: Created Time (datetime)

### `drive_update_shared_drive`

**Update Shared Drive.** Renames or updates a shared drive's settings by ID (resolve via drive_list_shared_drives). Use to rename a shared drive; to remove it entirely use drive_delete_shared_drive. Safe to retry — re-applying the same values is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `drive_id` | string | yes |  | Shared Drive ID. The ID of the shared drive to update. Resolve it via drive_list_shared_drives. |
| `name` | string | no |  | Name. The new name for the shared drive. Leave empty to keep the current name. |

Output fields:

- `id`: Drive ID
- `name`: Drive Name
- `kind`: Kind
- `colorRgb`: Color
- `createdTime`: Created Time (datetime)

### `drive_delete_shared_drive`

**Delete Shared Drive.** Permanently deletes a shared drive by ID (it must already be empty). Irreversible. Use only to remove a no-longer-needed shared drive. A repeat call fails because the drive no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `drive_id` | string | yes |  | Shared Drive ID. The ID of the shared drive to delete. Resolve it via drive_list_shared_drives. |

Output fields:

- `deleted`: Deleted (boolean)
- `driveId`: Drive ID

### `drive_create_comment`

**Create Comment.** Adds a new top-level comment to a file. Use to leave feedback or a note on a file (resolve the file ID via drive_search_files); to respond to an existing comment use drive_create_reply instead. Each call creates a new comment, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file to comment on. Resolve it via drive_search_files or drive_get_file. |
| `content` | string | yes |  | Content. The plain-text content of the comment. |

Output fields:

- `id`: Comment ID
- `content`: Content
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `author`: Author
- `author.displayName`: Name
- `author.emailAddress`: Email (email)
- `author.photoLink`: Photo (image)
- `author.me`: Is Me (boolean)

### `drive_list_comments`

**List Comments.** Lists the comments on a file with each comment's id, author, content, and resolved state. Use to read discussion on a file or to resolve a commentId before replying (drive_create_reply) or listing its replies (drive_list_replies). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file whose comments to list. Resolve it via drive_search_files or drive_get_file. |

Output fields:

- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].content`: Content
- `comments[].createdTime`: Created Time (datetime)
- `comments[].modifiedTime`: Modified Time (datetime)
- `comments[].author`: Author
- `comments[].author.displayName`: Name
- `comments[].author.emailAddress`: Email (email)
- `comments[].author.photoLink`: Photo (image)

### `drive_create_reply`

**Reply to Comment.** Adds a reply to an existing comment, optionally resolving or reopening the comment via the action field. Use to respond to a comment (resolve the commentId via drive_list_comments); to start a new top-level comment use drive_create_comment instead. Each call creates a new reply, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file the comment belongs to. Resolve it via drive_search_files or drive_get_file. |
| `comment_id` | string | yes |  | Comment ID. The ID of the comment to reply to. Resolve it via drive_list_comments. |
| `content` | string | yes |  | Content. The plain-text content of the reply. |
| `action` | string | no |  | Action. Optionally change the parent comment's state: resolve (mark resolved) or reopen. One of `"resolve"`, `"reopen"`. |

Output fields:

- `id`: Reply ID
- `content`: Content
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `author`: Author
- `author.displayName`: Name
- `author.emailAddress`: Email (email)
- `author.photoLink`: Photo (image)
- `author.me`: Is Me (boolean)

### `drive_get_reply`

**Get Reply.** Fetches a single reply by ID, including its author, content, and action. Use when you already have a replyId (resolve it via drive_list_replies) and need that one reply's details. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file the comment belongs to. Resolve it via drive_search_files or drive_get_file. |
| `comment_id` | string | yes |  | Comment ID. The ID of the parent comment. Resolve it via drive_list_comments. |
| `reply_id` | string | yes |  | Reply ID. The ID of the reply to fetch. Resolve it via drive_list_replies. |

Output fields:

- `id`: Reply ID
- `content`: Content
- `htmlContent`: HTML Content (html)
- `createdTime`: Created Time (datetime)
- `modifiedTime`: Modified Time (datetime)
- `deleted`: Deleted (boolean)
- `author`: Author
- `author.displayName`: Name
- `author.emailAddress`: Email (email)
- `author.photoLink`: Photo (image)
- `author.me`: Is Me (boolean)

### `drive_list_replies`

**List Replies.** Lists the replies under a given comment with each reply's id, author, content, and action. Use to read a comment thread or to resolve a replyId before fetching (drive_get_reply), editing (drive_update_reply), or deleting (drive_delete_reply) a reply. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file the comment belongs to. Resolve it via drive_search_files or drive_get_file. |
| `comment_id` | string | yes |  | Comment ID. The ID of the comment whose replies to list. Resolve it via drive_list_comments. |

Output fields:

- `replies`: Replies
- `replies[].id`: Reply ID
- `replies[].content`: Content
- `replies[].createdTime`: Created Time (datetime)
- `replies[].modifiedTime`: Modified Time (datetime)
- `replies[].deleted`: Deleted (boolean)
- `replies[].author`: Author
- `replies[].author.displayName`: Name
- `replies[].author.emailAddress`: Email (email)
- `replies[].author.photoLink`: Photo (image)

### `drive_update_reply`

**Update Reply.** Edits the text of an existing reply by ID (resolve via drive_list_replies). Use to correct or revise a reply you control; to add a new reply instead use drive_create_reply. Safe to retry — re-applying the same content is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file the comment belongs to. Resolve it via drive_search_files or drive_get_file. |
| `comment_id` | string | yes |  | Comment ID. The ID of the parent comment. Resolve it via drive_list_comments. |
| `reply_id` | string | yes |  | Reply ID. The ID of the reply to update. Resolve it via drive_list_replies. |
| `content` | string | yes |  | Content. The new plain-text content for the reply. |

Output fields:

- `id`: Reply ID
- `content`: Content
- `modifiedTime`: Modified Time (datetime)
- `deleted`: Deleted (boolean)
- `author`: Author
- `author.displayName`: Name
- `author.emailAddress`: Email (email)
- `author.photoLink`: Photo (image)
- `author.me`: Is Me (boolean)

### `drive_delete_reply`

**Delete Reply.** Permanently deletes a reply by ID (resolve via drive_list_replies). Use to remove a reply you control; to edit it instead use drive_update_reply. A repeat call fails because the reply is already gone, so it is not safe to retry blindly. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The ID of the file the comment belongs to. Resolve it via drive_search_files or drive_get_file. |
| `comment_id` | string | yes |  | Comment ID. The ID of the parent comment. Resolve it via drive_list_comments. |
| `reply_id` | string | yes |  | Reply ID. The ID of the reply to delete. Resolve it via drive_list_replies. |

Output fields:

- `success`: Success (boolean)
- `reply_id`: Reply ID

### `drive_get_about`

**Get Account & Storage Info.** Returns the authenticated user's Drive info: account identity, storage quota and usage, and supported import/export formats. Use to check available space before a large upload, confirm which account is connected, or look up valid export MIME types. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `user`: Current User
- `user.displayName`: Display Name
- `user.emailAddress`: Email Address (email)
- `user.photoLink`: Photo (image)
- `user.me`: Is Me (boolean)
- `user.permissionId`: Permission ID
- `storageQuota`: Storage Quota
- `storageQuota.limit`: Total Limit (filesize)
- `storageQuota.usage`: Used Space (filesize)
- `storageQuota.usageInDrive`: Used in Drive (filesize)
- `storageQuota.usageInDriveTrash`: Used in Trash (filesize)
- `maxUploadSize`: Max Upload Size (filesize)

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
