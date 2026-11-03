# Microsoft SharePoint

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-sharepoint'
  version: '0.4.2'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you'd like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - Sites.Read.All
> - Sites.ReadWrite.All
> - Sites.Manage.All
> - Files.ReadWrite.All
> - openid
> - email
> - profile
> - offline_access

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `microsoft_sharepoint_create_folder`

**Create Folder.** Creates a folder at a given path inside a SharePoint document library (drive), creating it relative to a parent folder path or the drive root. Use to provision a destination folder before uploading or moving files. Requires the target site and drive; the folder is keyed on its path, so re-running with the same path leaves the existing folder in place rather than producing a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `driveId` | string | yes |  | Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `parentFolder` | string | yes | `"/"` | Parent Folder. Parent folder,like "/demo/" or "/docs/assignment/".Leave it default if you want to create folder at the root (**/**) level. |
| `folderName` | string | yes |  | Folder Name. |

### `microsoft_sharepoint_create_list`

**Create List.** Creates a new SharePoint list (with a display name and description) on a given site. Use when an agent needs a fresh list to hold structured items. Not idempotent: each call creates another list even if one with the same name already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `displayName` | string | yes |  | List Name. |
| `description` | string | yes |  | List Description. |

### `microsoft_sharepoint_create_list_item`

**Create List Item.** Adds a new item (row) to a SharePoint list on a given site, setting the list column field values you provide. Use to record a new entry in an existing list. Not idempotent: each call appends another item, so repeating it creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `listColumns` | object | yes |  | List Columns. An object whose fields depend on other inputs; the product shows them. |

### `microsoft_sharepoint_update_list_item`

**Update List Item.** Updates the column field values of an existing item in a SharePoint list, identified by its list item ID on a given site. Use to edit a known row rather than create one. Requires a valid item ID; idempotent, since re-applying the same field values leaves the item in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `listItemId` | string | yes |  | List Item. A value the product loads from the provider, such as an id; write the value itself. |
| `listColumns` | object | yes |  | List Columns. An object whose fields depend on other inputs; the product shows them. |

### `microsoft_sharepoint_delete_list_item`

**Delete List Item.** Permanently removes an item from a SharePoint list, identified by its list item ID on a given site. Use to clean up or retract a specific row. Destructive but idempotent: once the item is gone, repeating the call with the same ID leaves the list unchanged. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `listItemId` | string | yes |  | List Item. A value the product loads from the provider, such as an id; write the value itself. |

### `microsoft_sharepoint_search_list_item`

**Find List Item.** Looks up items in a SharePoint list by exact Title match on a given site, returning the matching items with their fields. Use to resolve a list item ID (or confirm existence) before updating or deleting it. Read-only and idempotent; matches only the Title column, not arbitrary fields. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `searchValue` | string | yes |  | Title. Item title to search. |

### `microsoft_sharepoint_upload_file`

**Upload File.** Uploads file content to a SharePoint document library (drive), placing it under a parent folder path with the file name you specify. Files over 250 MB are uploaded in chunks automatically. Use to push a file (from a prior step or URL) into a site. Idempotent on the target path: uploading the same name to the same folder replaces the existing file rather than creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `driveId` | string | yes |  | Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file or url you want to upload. Files are not supported; an action that needs one fails. |
| `parentFolder` | string | yes | `"/"` | Parent Folder. Parent folder, like "/demo/" or "/docs/assignment/".Leave it default if you want to create folder at the root (**CHANGE THIS BACK//**) level. |
| `fileName` | string | yes |  | File Name. |

### `microsoft_sharepoint_publish_page`

**Publish Page.** Publishes a SharePoint site page by its page ID on a given site, making the latest version visible to all users (auto-checking it in if needed). Use to make page edits live. Idempotent: re-publishing an already-published page leaves it published. A page awaiting an approval flow will not publish until approval completes. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |

### `microsoft_sharepoint_copy_item`

**Copy File or Folder (Across Sites).** Copies a file or folder from one SharePoint site/drive to a destination site, drive, and folder within the same tenant, optionally renaming the copy. Use to duplicate content across sites; for same-site copies use the within-site variant. The conflict behavior (fail, replace, or rename) controls what happens on a name clash. Not idempotent: each run produces another copy (rename mode) or overwrites the target (replace mode). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `driveId` | string | yes |  | Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Source File or Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `destination_site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `destination_drive_id` | string | yes |  | Destination Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `destination_folder_id` | string | no |  | Destination Folder. The folder to copy the item into. Defaults to the root of the drive. A value the product loads from the provider, such as an id; write the value itself. |
| `new_name` | string | no |  | New Name (Optional). A new name for the copied item. If not provided, the original name is used. |
| `conflict_behavior` | string | yes | `"fail"` | Conflict Behavior. Action to take if a file with the same name already exists. One of `"fail"`, `"replace"`, `"rename"`. |

### `microsoft_sharepoint_copy_item_within_site`

**Copy File or Folder (Within Site).** Copies a file or folder to another folder within the same SharePoint site and drive, optionally renaming the copy; select the root to copy to the drive top level. Use for same-site duplication; for cross-site copies use the across-sites variant. The conflict behavior (fail, replace, or rename) controls name clashes. Not idempotent: each run produces another copy (rename mode) or overwrites the target (replace mode). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `driveId` | string | yes |  | Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Source File or Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `destinationFolderId` | string | yes |  | Destination Folder. The folder to copy the item into. Select "Root" to copy to the top level of the drive. A value the product loads from the provider, such as an id; write the value itself. |
| `newName` | string | no |  | New Name (Optional). A new name for the copied item. If not provided, the original name is used. |
| `conflictBehavior` | string | yes | `"fail"` | Conflict Behavior. Action to take if a file with the same name already exists in the destination. One of `"fail"`, `"replace"`, `"rename"`. |

### `microsoft_sharepoint_move_file`

**Move File.** Moves a file to a different folder within the same SharePoint drive, optionally renaming it in the process; select the root to move to the drive top level. Use to relocate an existing file rather than copy it. Idempotent: moving a file already at the destination (with the same name) leaves it where it is. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `driveId` | string | yes |  | Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `fileId` | string | yes |  | File to Move. The file you want to move. A value the product loads from the provider, such as an id; write the value itself. |
| `destinationFolderId` | string | yes |  | Destination Folder. The folder to move the file into. Select "Root" to move to the top level of the drive. A value the product loads from the provider, such as an id; write the value itself. |
| `newName` | string | no |  | New Name (Optional). Provide a new name to rename the file during the move. |

### `microsoft_sharepoint_find_file`

**Find File.** Locates files in a SharePoint document library (drive) on a given site, either by exact path from the drive root or by keyword search on the file name (optionally scoped to a folder). Use to resolve a file ID/metadata before downloading, moving, or copying. Read-only and idempotent; path mode returns an empty result rather than erroring when the file is missing. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `driveId` | string | yes |  | Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `findMethod` | string | yes | `"search"` | Find Method. Choose how to find the file. One of `"path"`, `"search"`. |
| `filePath` | string | no |  | File Path. The exact path to the file from the drive's root. **Required if finding by path.** Example: `Documents/Reports/Q1-Report.docx`. |
| `searchQuery` | string | no |  | Search Query. The file name or keyword to search for. **Required if searching by name.** Example: `Q1-Report.docx`. |
| `searchFolderId` | string | no |  | Folder to Search In (Optional). The folder to search within. If not specified, the entire drive will be searched. **Only applies when searching by name.**. A value the product loads from the provider, such as an id; write the value itself. |

### `microsoft_sharepoint_get_folder_contents`

**Get Folder Contents.** Lists the immediate files and subfolders of a folder in a SharePoint document library (drive) on a given site, with optional paging, field selection, sorting, and inclusion of custom SharePoint column metadata. Use to enumerate or browse a folder one level deep. Read-only and idempotent; returns one page (default 200 items) with an @odata.nextLink for further pages. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `driveId` | string | yes |  | Drive. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | yes |  | Folder. The folder whose contents you want to list. Select "Root Folder" for the top-level folder. A value the product loads from the provider, such as an id; write the value itself. |
| `includeCustomFields` | boolean | no | `false` | Include Custom Metadata. Check this to include SharePoint-specific metadata (custom columns). This may slow down the request. |
| `top` | number | no |  | Page Size. The maximum number of items to return. The API default is 200. If more items exist, the output will contain a field `@odata.nextLink` that you can use in a custom API call to get the next page. |
| `select` | string | no |  | Select Fields (Optional). A comma-separated list of properties to return. Example: `id,name,size,webUrl`. |
| `orderby` | string | no |  | Order By (Optional). Specifies how to sort the returned items. Example: `name asc` or `lastModifiedDateTime desc`. |

### `microsoft_sharepoint_get_site_information`

**Get Site Information.** Fetches metadata for a single SharePoint site by its site ID (title, URL, description, and similar properties), with optional field selection. Use to inspect or confirm site details once you have its ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `select` | string | no |  | Select Fields (Optional). A comma-separated list of properties to return. If left blank, all default properties are returned. Example: `id,displayName,webUrl,description`. |

### `microsoft_sharepoint_find_site`

**Find Site.** Searches SharePoint sites across the tenant by a name keyword and returns matching sites with their IDs, names, and URLs. Use as the entry point to resolve a site ID needed by other SharePoint actions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchTerm` | string | yes |  | Site Name. The name or keyword to search for. |

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
