# Azure Blob Storage

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-azure-blob-storage'
  version: '0.1.10'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Azure Blob Storage Auth

> Authenticate with Azure Blob Storage using Account Name and Account Key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `connectionString` | string | yes |  | Connection String. You can obtain it from 'Security + networking -> Access Keys' menu. |

## Actions

### `listContainers`

**List Containers.** Lists the containers in an Azure Blob Storage account. Use to discover available containers before reading or writing blobs; optionally narrow results with a name prefix and toggle inclusion of deleted or system containers. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeDeleted` | boolean | no | `false` | Include Deleted Containers. Whether to include deleted containers in the list. |
| `includeSystem` | boolean | no | `true` | Include System Containers. Whether to include system containers in the list. |
| `prefix` | string | no |  | Prefix Filter. Filter containers by prefix. |

### `createContainer`

**Create Container.** Creates a new container in the Azure Blob Storage account with the given name. Use when you need a fresh container to store blobs. Not idempotent: the container name must not already exist or the call fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `containerName` | string | yes |  | Container Name. The name for the newly created container. |

### `deleteContainer`

**Delete Container.** Permanently deletes a container and all blobs it holds from the Azure Blob Storage account. Use only to remove an entire container; this is destructive and cannot be undone. Not idempotent: a second call against an already-deleted container fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `container` | string | yes |  | Container. Select the container. A value the product loads from the provider, such as an id; write the value itself. |

### `listBlobs`

**List Blobs.** Lists the blobs in a given container, returning each blob name with its properties and metadata. Use to enumerate or discover blobs before reading or processing them; optionally narrow by a name prefix and include snapshots. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `container` | string | yes |  | Container. Select the container. A value the product loads from the provider, such as an id; write the value itself. |
| `includeSnapshots` | boolean | no | `false` | Include Snapshots. Whether to include snapshots in the list. |
| `prefix` | string | no |  | Prefix Filter. Filter blobs by prefix. |

### `createBlob`

**Create Blob.** Uploads file data as a blob to the given container under the specified blob name, optionally attaching tags. Use to store or update a file in Azure Blob Storage. Idempotent on the blob name: re-uploading to the same name overwrites the existing blob rather than creating duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `container` | string | yes |  | Container. Select the container. A value the product loads from the provider, such as an id; write the value itself. |
| `blobName` | string | yes |  | Blob Name. The name of the blob to create. |
| `file` | file | yes |  | File. The file to upload as a blob. Files are not supported; an action that needs one fails. |
| `tags` | object | no |  | Tags. Optional tags to associate with the blob. |

### `readBlob`

**Read Blob.** Downloads the blob at the given container and blob name and returns it as a file. Use to fetch the contents of a known blob for downstream processing; the blob name must already exist. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `container` | string | yes |  | Container. Select the container. A value the product loads from the provider, such as an id; write the value itself. |
| `blobName` | string | yes |  | Blob Name. The name of the blob to read. |

### `deleteBlob`

**Delete Blob.** Deletes the blob at the given container and blob name. Use to remove a single blob; this is destructive. Idempotent: it deletes only if the blob exists, so repeating the call against an already-deleted blob succeeds without error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `container` | string | yes |  | Container. Select the container. A value the product loads from the provider, such as an id; write the value itself. |
| `blobName` | string | yes |  | Blob Name. The name of the blob to create. |

### `addTagsToBlob`

**Add Tags to Blob.** Sets key-value tags on the blob at the given container and blob name. Operates in two modes: by default it replaces all existing tags with the supplied set, or with the keep-existing-tags option it merges the new tags onto the current ones. Use to label or categorize a blob for later tag-based search. Idempotent: applying the same tags yields the same final tag set. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `container` | string | yes |  | Container. Select the container. A value the product loads from the provider, such as an id; write the value itself. |
| `blobName` | string | yes |  | Blob Name. The name of the blob to add tags to. |
| `tags` | object | no | `{}` | Tags. The tags to add to the blob. |
| `keepExistingTags` | boolean | no | `false` | Keep Existing Tags. Whether to keep existing tags on the blob. |

### `findBlobs`

**Find Blobs.** Searches a container for blobs matching the supplied tag key-value pairs, returning the names of blobs whose tags satisfy all conditions (combined with AND). Use to locate blobs by tag rather than by name or prefix. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `container` | string | yes |  | Container. Select the container. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | object | yes |  | Tags. The tags to filter blobs by. |
