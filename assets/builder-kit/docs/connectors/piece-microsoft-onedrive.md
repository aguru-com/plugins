# Microsoft OneDrive

Cloud storage by Microsoft

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-onedrive'
  version: '0.6.1'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you'd like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - Files.ReadWrite
> - offline_access

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `upload_onedrive_file`

**Upload file.** Upload a file to a Microsoft OneDrive folder, given a target file name, the file content, and an optional parent folder (defaults to the drive root). Large files (over 4MiB) are uploaded in chunks automatically. Idempotent: uploading the same file name to the same folder overwrites the existing item rather than creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileName` | string | yes |  | File name. The name the file should be saved as (e.g. file.txt) |
| `file` | file | yes |  | File. The file URL or base64 to upload. Files are not supported; an action that needs one fails. |
| `parentId` | string | no |  | Parent Folder. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Item ID
- `name`: Name
- `webUrl`: Web URL (url)
- `size`: Size (filesize)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `createdBy`: Created By
- `createdBy.user`: User
- `createdBy.user.displayName`: Name
- `createdBy.user.email`: Email (email)
- `createdBy.user.id`: User ID
- `lastModifiedBy`: Last Modified By
- `lastModifiedBy.user`: User
- `lastModifiedBy.user.displayName`: Name
- `lastModifiedBy.user.email`: Email (email)
- `lastModifiedBy.user.id`: User ID
- `parentReference`: Parent Folder
- `parentReference.id`: Folder ID
- `parentReference.name`: Folder Name
- `parentReference.path`: Folder Path
- `parentReference.driveId`: Drive ID
- `parentReference.driveType`: Drive Type
- `file`: File
- `file.mimeType`: MIME Type

### `download_file`

**Get File.** Retrieve a single file from Microsoft OneDrive and download its content, looking it up either by its File ID or by its exact file name (a name lookup searches the drive and resolves to the matching file). Use when you need the file bytes plus its metadata; when only metadata is needed prefer a list action. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookupBy` | string | yes | `"id"` | Look Up By. One of `"id"`, `"name"`. |
| `fileIdentifier` | string | yes |  | File ID / File Name. Enter the File ID or the exact filename depending on the "Look Up By" selection. |

Output fields:

- `id`: File ID
- `name`: Name
- `data`: File (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `webUrl`: Web URL (url)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `folderPath`: Folder Path
- `driveId`: Drive ID

### `copy_file`

**Copy File.** Creates a copy of a OneDrive file, optionally into a different folder and/or under a new name, and returns the copied item once the asynchronous copy completes. Use to duplicate a file or stamp out copies of a template document. Not idempotent: each run creates another copy — with the default rename conflict behavior, repeated runs produce numbered duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceFolderId` | string | no |  | Source Folder. The folder containing the file to copy. Leave empty to browse files in the root folder. A value the product loads from the provider, such as an id; write the value itself. |
| `fileId` | string | yes |  | File. The file to copy. If the file is not listed (up to 1000 files are fetched), toggle the dynamic input (F) and enter the file ID directly. A value the product loads from the provider, such as an id; write the value itself. |
| `destinationFolderId` | string | no |  | Destination Folder. The folder to copy the file into. Leave empty to copy it into the same folder as the source file. A value the product loads from the provider, such as an id; write the value itself. |
| `newName` | string | no |  | New Name. A new name for the copied file (e.g. report-copy.xlsx). If left empty, the original name is used. |
| `conflictBehavior` | string | yes | `"rename"` | Conflict Behavior. What to do if a file with the same name already exists in the destination folder. Note: personal OneDrive (consumer) accounts do not support this option and may fail on name conflicts regardless of the selection. One of `"rename"`, `"replace"`, `"fail"`. |

Output fields:

- `status`: Status
- `file`: Copied File
- `file.id`: Item ID
- `file.name`: Name
- `file.webUrl`: Web URL (url)
- `file.size`: Size (filesize)
- `file.createdDateTime`: Created At (datetime)
- `file.lastModifiedDateTime`: Last Modified At (datetime)
- `file.createdBy`: Created By
- `file.createdBy.user`: User
- `file.createdBy.user.displayName`: Name
- `file.createdBy.user.email`: Email (email)
- `file.createdBy.user.id`: User ID
- `file.lastModifiedBy`: Last Modified By
- `file.lastModifiedBy.user`: User
- `file.lastModifiedBy.user.displayName`: Name
- `file.lastModifiedBy.user.email`: Email (email)
- `file.lastModifiedBy.user.id`: User ID
- `file.parentReference`: Parent Folder
- `file.parentReference.id`: Folder ID
- `file.parentReference.name`: Folder Name
- `file.parentReference.path`: Folder Path
- `file.parentReference.driveId`: Drive ID
- `file.parentReference.driveType`: Drive Type
- `file.file`: File
- `file.file.mimeType`: MIME Type

### `list_files`

**List Files.** List the files contained in a Microsoft OneDrive folder, returning only file items (subfolders are excluded) and paging through all results. Provide a parent folder ID to scope the listing, or leave it empty to list from the drive root. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentFolder` | string | no |  | Parent Folder. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Item ID
- `[].name`: Name
- `[].webUrl`: Web URL (url)
- `[].size`: Size (filesize)
- `[].createdDateTime`: Created At (datetime)
- `[].lastModifiedDateTime`: Last Modified At (datetime)
- `[].createdBy`: Created By
- `[].createdBy.user`: User
- `[].createdBy.user.displayName`: Name
- `[].createdBy.user.email`: Email (email)
- `[].createdBy.user.id`: User ID
- `[].lastModifiedBy`: Last Modified By
- `[].lastModifiedBy.user`: User
- `[].lastModifiedBy.user.displayName`: Name
- `[].lastModifiedBy.user.email`: Email (email)
- `[].lastModifiedBy.user.id`: User ID
- `[].parentReference`: Parent Folder
- `[].parentReference.id`: Folder ID
- `[].parentReference.name`: Folder Name
- `[].parentReference.path`: Folder Path
- `[].parentReference.driveId`: Drive ID
- `[].parentReference.driveType`: Drive Type
- `[].file`: File
- `[].file.mimeType`: MIME Type

### `list_folders`

**List Folders.** List the subfolders contained in a Microsoft OneDrive folder (file items are excluded). Provide a parent folder ID to scope the listing, or leave it empty to list folders at the drive root; useful for discovering a folder ID to pass to other actions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentFolder` | string | no |  | Parent Folder. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Item ID
- `[].name`: Name
- `[].webUrl`: Web URL (url)
- `[].size`: Size (filesize)
- `[].createdDateTime`: Created At (datetime)
- `[].lastModifiedDateTime`: Last Modified At (datetime)
- `[].createdBy`: Created By
- `[].createdBy.user`: User
- `[].createdBy.user.displayName`: Name
- `[].createdBy.user.email`: Email (email)
- `[].createdBy.user.id`: User ID
- `[].lastModifiedBy`: Last Modified By
- `[].lastModifiedBy.user`: User
- `[].lastModifiedBy.user.displayName`: Name
- `[].lastModifiedBy.user.email`: Email (email)
- `[].lastModifiedBy.user.id`: User ID
- `[].parentReference`: Parent Folder
- `[].parentReference.id`: Folder ID
- `[].parentReference.name`: Folder Name
- `[].parentReference.path`: Folder Path
- `[].parentReference.driveId`: Drive ID
- `[].parentReference.driveType`: Drive Type
- `[].folder`: Folder
- `[].folder.childCount`: Child Count (number)

### `onedrive_add_item_to_bundle`

**Add Item to Bundle.** Add one existing file to an existing bundle or photo album in a personal OneDrive; the file stays where it is. Get the bundle ID from List Albums and Bundles or Create Bundle, and the item ID from Search Files and Folders or List Folder Contents; use Create Bundle to start a new one. Works only on personal OneDrive (Microsoft account); adding an item that is already in the bundle succeeds without duplicating it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bundleId` | string | yes |  | Bundle ID. Bundle ID from List Albums and Bundles or Create Bundle. |
| `itemId` | string | yes |  | Item ID. ID of the file to add, from Search or List Folder Contents. |

Output fields:

- `success`: Success (boolean)
- `bundleId`: Bundle ID
- `itemId`: Item ID

### `onedrive_checkin_item`

**Check In File.** Checks in a file previously checked out with Check Out File, publishing the changes and releasing the lock. Use Discard Check-Out instead to throw the changes away. Works on personal and business drives; checking in a file that is not checked out fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Use this or Item ID. |
| `comment` | string | no |  | Comment. Optional check-in comment saved with the new version. |

Output fields:

- `success`: Success (boolean)
- `itemId`: Item ID
- `path`: Path

### `onedrive_checkout_item`

**Check Out File.** Checks out a file, locking it for exclusive editing until Check In File or Discard Check-Out is called. Works on personal OneDrive and on OneDrive for Business or SharePoint libraries; checking out a file that is already checked out fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Use this or Item ID. |

Output fields:

- `success`: Success (boolean)
- `itemId`: Item ID
- `path`: Path

### `onedrive_copy_item`

**Copy File or Folder.** Starts an asynchronous copy of a file or a whole folder (with its contents) into a destination folder, optionally under a new name, and returns a monitor URL rather than the new item. Next, call Get Copy Status with that monitor URL until it reports completed; its resourceId is the new copy's ID, while the source ID keeps pointing at the original. Each call starts another copy; name conflicts are reported by Get Copy Status as failed, and the conflict setting is not supported on personal OneDrive. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. ID of the item to copy, from Search or List Folder Contents. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |
| `destinationFolderId` | string | no |  | Destination Folder ID. Folder to copy into. Leave empty for the drive root. |
| `newName` | string | no |  | New Name. Optional name for the copy. Leave empty to keep the original name. |
| `conflictBehavior` | string | no |  | If the Name Exists. What to do on a name clash. Not supported on personal OneDrive. One of `"fail"`, `"rename"`, `"replace"`. |

Output fields:

- `status`: Status
- `monitorUrl`: Monitor URL (url)

### `onedrive_create_bundle`

**Create Bundle.** Create a new bundle in a personal OneDrive that groups existing files, identified by at least two item IDs from Search Files and Folders or List Folder Contents, so they can be shared as one set without sharing their folders; the files are not moved or copied. Use Add Item to Bundle to extend an existing bundle instead. Works only on personal OneDrive (Microsoft account); each call creates a new bundle, and a duplicate name gets a number appended, so retries create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Bundle Name. |
| `itemIds` | array | yes |  | Item IDs. IDs of at least two files, from Search or List Folder Contents. |

Output fields:

- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID
- `bundleChildCount`: Items in Bundle (number)
- `isAlbum`: Is Album (boolean)

### `onedrive_create_folder`

**Create Folder.** Gets or creates a folder by name inside a parent folder (the drive root by default): if a folder with that name already exists it is returned with `created` false instead of making a duplicate. Call it before Upload File or Move File or Folder when the destination may not exist. It fails if a file (not a folder) already holds the name; safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentFolderId` | string | no |  | Parent Folder ID. Parent folder ID. Leave empty for the drive root. |
| `name` | string | yes |  | Folder Name. Folder name (a single name, not a path). |

Output fields:

- `created`: Created (boolean)
- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_create_sharing_link`

**Create Sharing Link.** Creates (or returns the existing) sharing link of the given type and scope for a file or folder, keeping its existing inherited access. Use it to get a URL anyone or an organization can open; to grant access to specific people by email use Share with People (Invite) instead. Embed links and passwords work on personal OneDrive only, and tenant policy may block anonymous links; calling again with the same type and scope returns the same link. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File or folder ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |
| `type` | string | yes | `"view"` | Link Type. View, Edit, or Embed (Embed is personal OneDrive only). One of `"view"`, `"edit"`, `"embed"`. |
| `scope` | string | no |  | Scope. Who can open the link. Leave empty for the account default. One of `"anonymous"`, `"organization"`, `"users"`. |
| `password` | string | no |  | Password. Optional password required to open the link. Personal OneDrive only. |
| `expirationDateTime` | ISO date-time string | no |  | Expiration. Optional date and time after which the link stops working. |

Output fields:

- `id`: Permission ID
- `roles`: Roles
- `linkType`: Link Type
- `linkScope`: Link Scope
- `linkWebUrl`: Link URL (url)
- `linkPreventsDownload`: Link Prevents Download (boolean)
- `grantedToName`: Granted To
- `grantedToEmail`: Granted To Email (email)
- `grantedToId`: Granted To ID
- `grantedToIdentities`: Granted To (Link Users)
- `invitationEmail`: Invitation Email (email)
- `inherited`: Inherited (boolean)
- `inheritedFromId`: Inherited From Folder ID
- `inheritedFromPath`: Inherited From Path
- `hasPassword`: Has Password (boolean)
- `expirationDateTime`: Expires At (datetime)
- `shareId`: Share ID

### `onedrive_create_text_file`

**Create Text File.** Creates a file in a OneDrive folder whose content is the given text (up to 4 MiB), without needing a file object; use Upload File for binary files and Replace File Content to overwrite a known item. It writes plain UTF-8 text only, so naming it `.docx` or `.xlsx` does not produce a real Word or Excel file. By default it fails if the name already exists; Rename or Replace change that, and each Rename call creates another file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | no |  | Folder ID. Destination folder ID. Leave empty for the drive root. |
| `fileName` | string | yes |  | File Name. File name including its extension. |
| `content` | string | yes |  | Content. The text to write into the file (up to 4 MiB). |
| `conflictBehavior` | string | yes | `"fail"` | If the Name Exists. What to do when the folder already has an item with this name. One of `"fail"`, `"rename"`, `"replace"`. |

Output fields:

- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_delete_item_permission`

**Remove Permission (Stop Sharing).** Permanently removes one permission from a file or folder, which revokes that person's access or disables that sharing link for everyone who has it; it cannot be undone except by sharing again. Get the permission ID from List File Permissions; only non-inherited permissions can be removed, and a retry after success fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File or folder ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |
| `permissionId` | string | yes |  | Permission ID. Permission ID from List File Permissions. Access ends at once. |

Output fields:

- `success`: Success (boolean)
- `itemId`: Item ID
- `permissionId`: Permission ID

### `onedrive_delete_item`

**Delete File or Folder (to Recycle Bin).** Deletes a file or folder by moving it to the OneDrive recycle bin, where the owner can still restore it; deleting a folder also deletes everything inside it. Confirm the exact item first (get its ID from Search Files and Folders or List Folder Contents); retrying after success fails because the item is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. ID of the item to delete, from Search or List Folder Contents. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |

Output fields:

- `success`: Success (boolean)
- `itemId`: Item ID
- `path`: Path

### `onedrive_discard_checkout`

**Discard Check-Out.** Releases the check-out on a file and permanently discards every change made while it was checked out, reverting to the last checked-in version. Use Check In File instead to keep the changes. Works on personal and business drives; a retry fails once the file is no longer checked out. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Use this or Item ID. |

Output fields:

- `success`: Success (boolean)
- `itemId`: Item ID
- `path`: Path

### `onedrive_download_file_as_format`

**Convert and Download File.** Have OneDrive convert one file to another format and download the converted copy; the stored file is not changed. Typical use is Word, Excel or PowerPoint to PDF; HTML works only for Loop, Fluid and whiteboard files, and JPG needs both Width and Height. Provide the item ID (from Search Files and Folders or List Folder Contents) or a path; use Download File for the original bytes. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | File ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Used when File ID is empty. |
| `format` | string | yes | `"pdf"` | Target Format. One of `"pdf"`, `"html"`, `"jpg"`. |
| `width` | number | no |  | Width. Image width in pixels. Required when Target Format is JPG. |
| `height` | number | no |  | Height. Image height in pixels. Required when Target Format is JPG. |

Output fields:

- `data`: Converted File (url)
- `convertedFormat`: Converted Format
- `convertedFileName`: Converted File Name
- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_download_file`

**Download File.** Download the current content of one file together with its metadata, returning a file reference other steps can use. Provide either the item ID (from Search Files and Folders or List Folder Contents) or a path relative to the drive root; use Get File or Folder when you only need metadata, and Convert and Download File to get an Office file as PDF. Folders are rejected. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | File ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Used when File ID is empty. |

Output fields:

- `data`: File (url)
- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_download_item_version`

**Download File Version.** Download the content of one earlier version of a file without restoring it. Get the version ID from List File Versions and provide the file ID (from Search Files and Folders or List Folder Contents) or a path; OneDrive does not serve the current version this way, so use Download File for the latest content. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | File ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Used when File ID is empty. |
| `versionId` | string | yes |  | Version ID. Earlier version ID from List File Versions (not the current one). |

Output fields:

- `data`: File (url)
- `itemId`: Item ID
- `name`: Name
- `versionId`: Version ID
- `mimeType`: MIME Type

### `onedrive_get_copy_status`

**Get Copy Status.** Reads the current status of a copy started by Copy File or Folder, once per call, from the monitor URL that action returned. Call it again later while the status is notStarted or inProgress; when it is completed, resourceId is the ID of the new copy, and when it is failed, errorMessage explains why (for example a name conflict). Only accepts monitor URLs on OneDrive and SharePoint hosts. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitorUrl` | string | yes |  | Monitor URL. The monitorUrl returned by Copy File or Folder. |

Output fields:

- `status`: Status
- `percentageComplete`: Percentage Complete (number)
- `resourceId`: Copied Item ID
- `errorCode`: Error Code
- `errorMessage`: Error Message

### `onedrive_get_drive`

**Get Drive.** Read the signed-in user's own OneDrive drive: its drive ID, whether it is a personal or business drive, and its storage quota. Use it to check free space or to learn the account type before calling actions that only work on personal OneDrive or only on OneDrive for Business. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Drive ID
- `name`: Name
- `driveType`: Drive Type
- `webUrl`: Web URL (url)
- `ownerName`: Owner
- `ownerEmail`: Owner Email (email)
- `quotaTotal`: Total Storage (filesize)
- `quotaUsed`: Used Storage (filesize)
- `quotaRemaining`: Remaining Storage (filesize)
- `quotaState`: Storage State
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `quotaDeleted`: Recycle Bin Size (filesize)

### `onedrive_get_item`

**Get File or Folder.** Read the metadata of one file or folder (name, size, type, parent, dates, web link) without downloading its content. Provide either the item ID (from Search Files and Folders or List Folder Contents; "root" is the drive root) or a path relative to the drive root; use Download File when you need the bytes. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. Item ID from Search or List Folder Contents, or "root". Or use Path. |
| `path` | string | no |  | Path. Path from the drive root. Used when Item ID is empty. |

Output fields:

- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_get_special_folder`

**Get Special Folder.** Resolve a well-known OneDrive folder (Documents, Photos, Camera Roll, Music, Recordings) to its folder ID, whatever its localized name is. Use it before listing or uploading into one of these folders instead of guessing a path. If the folder does not exist yet, OneDrive creates it on first access; later calls return the same folder, so it is safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes |  | Folder. One of `"documents"`, `"photos"`, `"cameraroll"`, `"music"`, `"recordings"`. |

Output fields:

- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_invite_to_item`

**Share with People (Invite).** Grants read or write access on a file or folder to specific people by email, keeping existing inherited access and requiring them to sign in. Use it for per-person sharing; for a link anyone or the organization can open use Create Sharing Link. No email is sent unless Send Invitation Email is true, and the root folder of a personal drive cannot be shared. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File or folder ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |
| `recipients` | array | yes |  | Recipient Emails. Email addresses of the people to share with. |
| `role` | string | yes | `"read"` | Role. Read lets recipients view, Write lets them edit. One of `"read"`, `"write"`. |
| `sendInvitation` | boolean | no | `false` | Send Invitation Email. If on, OneDrive emails each recipient. Off grants access silently. |
| `message` | string | no |  | Message. Message for the invitation email (only sent when emails are on). |

Output fields:

- `permissions`: Permissions
- `permissions[].id`: Permission ID
- `permissions[].roles`: Roles
- `permissions[].linkType`: Link Type
- `permissions[].linkScope`: Link Scope
- `permissions[].linkWebUrl`: Link URL (url)
- `permissions[].linkPreventsDownload`: Link Prevents Download (boolean)
- `permissions[].grantedToName`: Granted To
- `permissions[].grantedToEmail`: Granted To Email (email)
- `permissions[].grantedToId`: Granted To ID
- `permissions[].grantedToIdentities`: Granted To (Link Users)
- `permissions[].invitationEmail`: Invitation Email (email)
- `permissions[].inherited`: Inherited (boolean)
- `permissions[].inheritedFromId`: Inherited From Folder ID
- `permissions[].inheritedFromPath`: Inherited From Path
- `permissions[].hasPassword`: Has Password (boolean)
- `permissions[].expirationDateTime`: Expires At (datetime)
- `permissions[].shareId`: Share ID
- `count`: Count (number)
- `invitationSent`: Invitation Sent (boolean)

### `onedrive_list_bundles`

**List Albums and Bundles.** List the bundles in the user's drive, meaning photo albums and multi-file share sets, with each bundle's ID and item count, one page per call. Use it to find a bundle ID for Add Item to Bundle or Remove Item from Bundle. Works only on personal OneDrive (Microsoft account); OneDrive for Business has no bundles. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageToken` | string | no |  | Page Token. nextPageToken from the previous call. Empty for the first page. |

Output fields:

- `items`: Bundles
- `items[].id`: Item ID
- `items[].name`: Name
- `items[].type`: Type
- `items[].webUrl`: Web URL (url)
- `items[].mimeType`: MIME Type
- `items[].size`: Size (filesize)
- `items[].childCount`: Child Count (number)
- `items[].createdDateTime`: Created At (datetime)
- `items[].lastModifiedDateTime`: Last Modified At (datetime)
- `items[].parentId`: Parent Folder ID
- `items[].parentPath`: Parent Folder Path
- `items[].driveId`: Drive ID
- `items[].driveType`: Drive Type
- `items[].createdByName`: Created By
- `items[].createdByEmail`: Created By Email (email)
- `items[].lastModifiedByName`: Last Modified By
- `items[].lastModifiedByEmail`: Last Modified By Email (email)
- `items[].description`: Description
- `items[].deleted`: Deleted (boolean)
- `items[].remoteItemId`: Remote Item ID
- `items[].remoteDriveId`: Remote Drive ID
- `items[].bundleChildCount`: Items in Bundle (number)
- `items[].isAlbum`: Is Album (boolean)
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `onedrive_list_drive_changes`

**List Drive Changes (Delta).** Track changes across the whole drive, one page per call: with no token it enumerates every item, with a token it returns only items created, changed or deleted since then (deleted items have deleted = true). Keep calling with nextPageToken until it is null, then save deltaToken and pass it on a later call to get the next changes; set Start From Now to skip the full enumeration and get a deltaToken only. If a token has expired, the action fails and you must start again without a token. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageToken` | string | no |  | Page or Delta Token. nextPageToken or deltaToken from a previous call. Empty to start. |
| `startFromNow` | boolean | no | `false` | Start From Now. Without a token, skip current items and return only a deltaToken. |

Output fields:

- `items`: Changed Items
- `items[].id`: Item ID
- `items[].name`: Name
- `items[].type`: Type
- `items[].webUrl`: Web URL (url)
- `items[].mimeType`: MIME Type
- `items[].size`: Size (filesize)
- `items[].childCount`: Child Count (number)
- `items[].createdDateTime`: Created At (datetime)
- `items[].lastModifiedDateTime`: Last Modified At (datetime)
- `items[].parentId`: Parent Folder ID
- `items[].parentPath`: Parent Folder Path
- `items[].driveId`: Drive ID
- `items[].driveType`: Drive Type
- `items[].createdByName`: Created By
- `items[].createdByEmail`: Created By Email (email)
- `items[].lastModifiedByName`: Last Modified By
- `items[].lastModifiedByEmail`: Last Modified By Email (email)
- `items[].description`: Description
- `items[].deleted`: Deleted (boolean)
- `items[].remoteItemId`: Remote Item ID
- `items[].remoteDriveId`: Remote Drive ID
- `count`: Count (number)
- `nextPageToken`: Next Page Token
- `deltaToken`: Delta Token

### `onedrive_list_drives`

**List My Drives.** List the drives that belong to the signed-in user, with each drive's ID, type and quota. Use Get Drive instead when you only need the default drive; SharePoint site and group drives are not included. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageToken` | string | no |  | Page Token. nextPageToken from the previous call. Empty for the first page. |

Output fields:

- `items`: Drives
- `items[].id`: Drive ID
- `items[].name`: Name
- `items[].driveType`: Drive Type
- `items[].webUrl`: Web URL (url)
- `items[].ownerName`: Owner
- `items[].ownerEmail`: Owner Email (email)
- `items[].quotaTotal`: Total Storage (filesize)
- `items[].quotaUsed`: Used Storage (filesize)
- `items[].quotaRemaining`: Remaining Storage (filesize)
- `items[].quotaState`: Storage State
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `onedrive_list_folder_children`

**List Folder Contents.** List the direct children of one folder (the drive root when no folder is given), optionally keeping only files or only folders, one page per call. Use Search Files and Folders to find items by name anywhere in the drive. The type filter is applied after the page is fetched, so a page can come back empty while nextPageToken is still set: keep paging until nextPageToken is null. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | no |  | Folder ID. Folder ID. Leave this and Folder Path empty for the drive root. |
| `folderPath` | string | no |  | Folder Path. Folder path from the drive root. Used when Folder ID is empty. |
| `itemType` | string | no | `"all"` | Item Type. One of `"all"`, `"files"`, `"folders"`. |
| `pageSize` | number | no |  | Page Size. How many items to request per page (1-999). Defaults to 100. |
| `pageToken` | string | no |  | Page Token. nextPageToken from the previous call. Empty for the first page. |

Output fields:

- `items`: Items
- `items[].id`: Item ID
- `items[].name`: Name
- `items[].type`: Type
- `items[].webUrl`: Web URL (url)
- `items[].mimeType`: MIME Type
- `items[].size`: Size (filesize)
- `items[].childCount`: Child Count (number)
- `items[].createdDateTime`: Created At (datetime)
- `items[].lastModifiedDateTime`: Last Modified At (datetime)
- `items[].parentId`: Parent Folder ID
- `items[].parentPath`: Parent Folder Path
- `items[].driveId`: Drive ID
- `items[].driveType`: Drive Type
- `items[].createdByName`: Created By
- `items[].createdByEmail`: Created By Email (email)
- `items[].lastModifiedByName`: Last Modified By
- `items[].lastModifiedByEmail`: Last Modified By Email (email)
- `items[].description`: Description
- `items[].deleted`: Deleted (boolean)
- `items[].remoteItemId`: Remote Item ID
- `items[].remoteDriveId`: Remote Drive ID
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `onedrive_list_item_permissions`

**List File Permissions.** Lists the permissions on a file or folder: owner, per-person grants, sharing links and access inherited from parent folders. Use it to find the permission ID that Update Permission Role and Remove Permission need; permissions marked inherited can only be changed on the folder they are inherited from. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File or folder ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |
| `pageToken` | string | no |  | Page Token. nextPageToken from the previous call. Empty for the first page. |

Output fields:

- `items`: Permissions
- `items[].id`: Permission ID
- `items[].roles`: Roles
- `items[].linkType`: Link Type
- `items[].linkScope`: Link Scope
- `items[].linkWebUrl`: Link URL (url)
- `items[].linkPreventsDownload`: Link Prevents Download (boolean)
- `items[].grantedToName`: Granted To
- `items[].grantedToEmail`: Granted To Email (email)
- `items[].grantedToId`: Granted To ID
- `items[].grantedToIdentities`: Granted To (Link Users)
- `items[].invitationEmail`: Invitation Email (email)
- `items[].inherited`: Inherited (boolean)
- `items[].inheritedFromId`: Inherited From Folder ID
- `items[].inheritedFromPath`: Inherited From Path
- `items[].hasPassword`: Has Password (boolean)
- `items[].expirationDateTime`: Expires At (datetime)
- `items[].shareId`: Share ID
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `onedrive_list_item_thumbnails`

**Get File Thumbnails.** Get the thumbnail image URLs (small, medium, large, with sizes) that OneDrive generated for one file, for previews or image galleries. Provide the item ID (from Search Files and Folders or List Folder Contents) or a path; an empty result is normal for a new file whose thumbnails are not generated yet, or for file types without thumbnails. The URLs are short-lived. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Used when Item ID is empty. |

Output fields:

- `items`: Thumbnail Sets
- `items[].thumbnailSetId`: Thumbnail Set ID
- `items[].smallUrl`: Small (image)
- `items[].smallWidth`: Small Width (number)
- `items[].smallHeight`: Small Height (number)
- `items[].mediumUrl`: Medium (image)
- `items[].mediumWidth`: Medium Width (number)
- `items[].mediumHeight`: Medium Height (number)
- `items[].largeUrl`: Large (image)
- `items[].largeWidth`: Large Width (number)
- `items[].largeHeight`: Large Height (number)
- `count`: Count (number)

### `onedrive_list_item_versions`

**List File Versions.** List the version history of one file, newest first, with each version ID, size, modification time and who made it, one page per call. Use it to get the version ID that Download File Version and Restore File Version need. Provide the item ID (from Search Files and Folders or List Folder Contents) or a path; retention is controlled by the account or admin, so the list can be short. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | File ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Used when File ID is empty. |
| `pageToken` | string | no |  | Page Token. nextPageToken from the previous call. Empty for the first page. |

Output fields:

- `items`: Versions
- `items[].versionId`: Version ID
- `items[].lastModifiedDateTime`: Last Modified At (datetime)
- `items[].size`: Size (filesize)
- `items[].lastModifiedByName`: Last Modified By
- `items[].lastModifiedByEmail`: Last Modified By Email (email)
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `onedrive_move_item`

**Move File or Folder.** Moves a file or folder (with its contents) into another folder in the same drive, optionally renaming it; the item keeps its ID. Use Rename / Update File or Folder to rename without moving, and Copy File or Folder to keep the original. Fails if the destination already has an item with the same name unless you set New Name; moving between drives is not supported. Retrying by item ID is safe; after a move by path, use the returned item ID, because the old path no longer exists. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. ID of the item to move, from Search or List Folder Contents. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |
| `destinationFolderId` | string | no |  | Destination Folder ID. Folder to move into. Leave empty for the drive root. |
| `newName` | string | no |  | New Name. Optional new name for the item. Leave empty to keep its current name. |

Output fields:

- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_remove_item_from_bundle`

**Remove Item from Bundle.** Take one file out of a bundle or photo album in a personal OneDrive; the file itself is not deleted and stays in its folder. Get the bundle ID from List Albums and Bundles and the item ID from Search Files and Folders or List Folder Contents; to delete the file itself use Delete File or Folder instead. Works only on personal OneDrive (Microsoft account); repeating the call after success fails because the item is no longer in the bundle. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bundleId` | string | yes |  | Bundle ID. The ID of the bundle or album, from List Albums and Bundles. |
| `itemId` | string | yes |  | Item ID. The ID of the file to remove from the bundle. The file itself is kept. |

Output fields:

- `success`: Success (boolean)
- `bundleId`: Bundle ID
- `itemId`: Item ID

### `onedrive_replace_file_content`

**Replace File Content.** Overwrites the content of an existing file, identified by Item ID or Path, and keeps its ID, name and sharing links; files over 4 MiB are sent in chunks. Use Upload File to add a new file by folder and name. The item must already exist and be a file (not a folder); get its ID from Search Files and Folders or List Folder Contents. Re-running with the same content converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. ID of the file to overwrite. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Use this or Item ID. |
| `file` | file | yes |  | File. The new content, as a file URL or base64. Files are not supported; an action that needs one fails. |

Output fields:

- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_resolve_sharing_link`

**Resolve Sharing Link.** Turns a OneDrive (1drv.ms, onedrive.live.com) or SharePoint sharing URL, or an existing share token, into the item it points to, including its item ID and drive ID. Use it when a user pastes a link and you need the item for other actions; it only peeks at the link and does not add the item to the user's drive, and an item in someone else's drive has a different drive ID that the other item actions here cannot address. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sharingUrl` | string | yes |  | Sharing Link or Share Token. The sharing URL, or a share token starting with u! or s!. |

Output fields:

- `shareId`: Share ID
- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_restore_item_version`

**Restore File Version.** Restore an earlier version of one file by copying it into a new current version; the file keeps its ID and the replaced content stays in the version history. Get the version ID from List File Versions and provide the file ID (from Search Files and Folders or List Folder Contents) or a path; use Download File Version to inspect a version without restoring it. Each call adds another version, so retries are not no-ops. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | File ID. File ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. File path from the drive root. Used when File ID is empty. |
| `versionId` | string | yes |  | Version ID. The ID of the version to restore, from List File Versions. |

Output fields:

- `success`: Success (boolean)
- `itemId`: Item ID
- `versionId`: Restored Version ID

### `onedrive_search_items`

**Search Files and Folders.** Search the user's OneDrive for files and folders whose name, metadata or content matches a text query, one page per call; use it to find an item ID when you only know a name. Scope "my_files" searches only the user's own drive, while "include_shared" also returns items shared with the user, which come back as remote items whose remoteItemId and remoteDriveId belong to another drive that the other OneDrive actions cannot address. The search index lags, so very recently added files may be missing. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Text. The text to search for in file names, metadata and content. |
| `scope` | string | no | `"my_files"` | Scope. One of `"my_files"`, `"include_shared"`. |
| `pageSize` | number | no |  | Page Size. How many results to request per page (1-999). Defaults to 50. |
| `pageToken` | string | no |  | Page Token. nextPageToken from the previous call. Empty for the first page. |

Output fields:

- `items`: Items
- `items[].id`: Item ID
- `items[].name`: Name
- `items[].type`: Type
- `items[].webUrl`: Web URL (url)
- `items[].mimeType`: MIME Type
- `items[].size`: Size (filesize)
- `items[].childCount`: Child Count (number)
- `items[].createdDateTime`: Created At (datetime)
- `items[].lastModifiedDateTime`: Last Modified At (datetime)
- `items[].parentId`: Parent Folder ID
- `items[].parentPath`: Parent Folder Path
- `items[].driveId`: Drive ID
- `items[].driveType`: Drive Type
- `items[].createdByName`: Created By
- `items[].createdByEmail`: Created By Email (email)
- `items[].lastModifiedByName`: Last Modified By
- `items[].lastModifiedByEmail`: Last Modified By Email (email)
- `items[].description`: Description
- `items[].deleted`: Deleted (boolean)
- `items[].remoteItemId`: Remote Item ID
- `items[].remoteDriveId`: Remote Drive ID
- `count`: Count (number)
- `nextPageToken`: Next Page Token

### `onedrive_update_item_permission`

**Update Permission Role.** Sets the role of one existing permission on a file or folder to read or write, replacing its current roles. Get the permission ID from List File Permissions; inherited permissions cannot be changed here and must be changed on the parent folder they come from. Safe to retry with the same role. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File or folder ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |
| `permissionId` | string | yes |  | Permission ID. The ID of the permission to change, from List File Permissions. |
| `role` | string | yes |  | Role. The new role. Replaces the roles the permission has today. One of `"read"`, `"write"`. |

Output fields:

- `id`: Permission ID
- `roles`: Roles
- `linkType`: Link Type
- `linkScope`: Link Scope
- `linkWebUrl`: Link URL (url)
- `linkPreventsDownload`: Link Prevents Download (boolean)
- `grantedToName`: Granted To
- `grantedToEmail`: Granted To Email (email)
- `grantedToId`: Granted To ID
- `grantedToIdentities`: Granted To (Link Users)
- `invitationEmail`: Invitation Email (email)
- `inherited`: Inherited (boolean)
- `inheritedFromId`: Inherited From Folder ID
- `inheritedFromPath`: Inherited From Path
- `hasPassword`: Has Password (boolean)
- `expirationDateTime`: Expires At (datetime)
- `shareId`: Share ID

### `onedrive_update_item`

**Rename / Update File or Folder.** Renames a file or folder and/or sets its description, changing only the fields you provide; the item keeps its ID. Use Move File or Folder to change its folder. Description is supported on personal OneDrive only, and renaming fails if the folder already has an item with the new name. Retrying by item ID is safe; after a rename by path, use the returned item ID, because the old path no longer exists. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | string | no |  | Item ID. File or folder ID from Search or List Folder Contents. Or use Path. |
| `path` | string | no |  | Path. Path from the drive root. Use this or Item ID. |
| `name` | string | no |  | New Name. New name, with the extension for files. Empty keeps the name. |
| `description` | string | no |  | Description. New description (personal OneDrive only). Empty keeps it. |

Output fields:

- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

### `onedrive_upload_file`

**Upload File.** Uploads a file (URL or base64) into a OneDrive folder under the given name; files over 4 MiB are sent in chunks automatically. Use Create Text File to write plain text without a file object, and Replace File Content to overwrite a known item by ID. The destination folder must already exist (create it with Create Folder); uploading the same name to the same folder overwrites the existing file, so retries are safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | no |  | Folder ID. Destination folder ID. Leave empty for the drive root. |
| `fileName` | string | yes |  | File Name. File name including its extension. |
| `file` | file | yes |  | File. The file URL or base64 content to upload. Files are not supported; an action that needs one fails. |

Output fields:

- `id`: Item ID
- `name`: Name
- `type`: Type
- `webUrl`: Web URL (url)
- `mimeType`: MIME Type
- `size`: Size (filesize)
- `childCount`: Child Count (number)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `parentId`: Parent Folder ID
- `parentPath`: Parent Folder Path
- `driveId`: Drive ID
- `driveType`: Drive Type
- `createdByName`: Created By
- `createdByEmail`: Created By Email (email)
- `lastModifiedByName`: Last Modified By
- `lastModifiedByEmail`: Last Modified By Email (email)
- `description`: Description
- `deleted`: Deleted (boolean)
- `remoteItemId`: Remote Item ID
- `remoteDriveId`: Remote Drive ID

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
