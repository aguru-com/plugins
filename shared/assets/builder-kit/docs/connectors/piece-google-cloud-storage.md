# Google Cloud Storage

Automate file storage operations with Google Cloud Storage. Upload, download, manage buckets, set permissions, and monitor changes with real-time triggers.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-cloud-storage'
  version: '0.1.8'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_bucket`

**Create Bucket.** Creates a new Cloud Storage bucket in the given project, with optional location, storage class, versioning, uniform bucket-level access, and labels. Use to provision storage before uploading objects. Not idempotent: bucket names are globally unique, so re-running with the same name fails. Requires a project ID and a globally-unique bucket name. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Bucket Name. Unique name for your bucket (must be globally unique, 3-63 characters) |
| `location` | string | no |  | Location. One of `"US"`, `"EU"`, `"ASIA"`, `"us-central1"`, `"us-east1"`, `"us-east4"`, `"us-west1"`, `"us-west2"`, `"us-west3"`, `"us-west4"`, `"us-south1"`, `"europe-central2"`, `"europe-north1"`, `"europe-southwest1"`, `"europe-west1"`, `"europe-west2"`, `"europe-west3"`, `"europe-west4"`, `"europe-west6"`, `"europe-west8"`, `"europe-west9"`, `"asia-east1"`, `"asia-east2"`, `"asia-northeast1"`, `"asia-northeast2"` and 11 more. |
| `storageClass` | string | no |  | Storage Class. One of `"STANDARD"`, `"NEARLINE"`, `"COLDLINE"`, `"ARCHIVE"`, `"MULTI_REGIONAL"`, `"REGIONAL"`, `"DURABLE_REDUCED_AVAILABILITY"`. |
| `versioning` | boolean | no |  | Enable Versioning. |
| `uniformBucketLevelAccess` | boolean | no |  | Uniform Bucket Level Access. |
| `labels` | object | no |  | Labels. Key-value pairs for bucket labels. |

### `delete_empty_bucket`

**Delete Empty Bucket.** Permanently deletes a Cloud Storage bucket. Use to clean up an unused bucket. The bucket must be empty (no live or noncurrent objects) or the call fails, so delete its objects first. Not idempotent: the first call removes the bucket and a repeat fails because it no longer exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |

### `clone_object`

**Clone Object.** Copies an existing object to a destination bucket/name (same or different bucket), optionally overriding metadata such as contentType or cacheControl. Use to duplicate a file for backups or to move data between buckets. Not idempotent: it writes a new destination object on each call, creating a fresh generation. Requires the source bucket/object and a destination bucket and object name. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `sourceBucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `sourceObject` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `destBucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `destObject` | string | yes |  | Destination Object Name. Name for the copied object (must be valid object name) |
| `metadataOverrides` | object | no |  | Metadata Overrides. Optional metadata and properties to override in the copied object (contentType, cacheControl, contentDisposition, etc.) |

### `delete_object`

**Delete Object.** Permanently deletes an object from a bucket, optionally a specific generation/revision for versioned objects. Use to remove an obsolete or unwanted file. Not idempotent: the first call removes the object and a repeat fails because it no longer exists. Requires the bucket and object name. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `object` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `generation` | number | no |  | Generation. Optional generation number for versioned objects (permanently deletes a specific revision) |

### `search_objects`

**Search Objects.** Lists objects in a bucket, optionally narrowed by name prefix, glob pattern, delimiter (for hierarchical/folder listing), or object versions; with no filters it returns all objects. Use to find files or enumerate bucket contents, and pass the returned page token to paginate. Idempotent read that does not modify storage. Requires the bucket name. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `prefix` | string | no |  | Prefix. Filter objects whose names begin with this prefix. |
| `matchGlob` | string | no |  | Glob Pattern. Glob pattern to filter results (e.g., "folder/*", "backup-*.txt") |
| `delimiter` | string | no |  | Delimiter. Delimiter for hierarchical listing (commonly "/") |
| `includeFoldersAsPrefixes` | boolean | no |  | Include Folders. Include empty folders and managed folders in results. |
| `versions` | boolean | no |  | Include Versions. List all versions of objects as distinct results. |
| `pageToken` | string | no |  | Page Token. Token for pagination (from previous response) |
| `maxResults` | number | no |  | Max Results. Maximum number of objects to return (recommended: ≤1000) |

### `search_buckets`

**Search Buckets.** Lists buckets in a project, optionally filtered by name prefix, including soft-deleted versions, and choosing whether ACLs are returned; with no prefix it returns all buckets. Use to find a bucket or enumerate a project's buckets, and pass the returned page token to paginate. Idempotent read that does not modify storage. Requires the project ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `prefix` | string | no |  | Name Prefix. Filter buckets whose names begin with this prefix. |
| `includeSoftDeleted` | boolean | no |  | Include Soft-Deleted. Include soft-deleted bucket versions in results. |
| `projection` | string | no |  | Projection. Set of properties to return. One of `"noAcl"`, `"full"`. |
| `pageToken` | string | no |  | Page Token. Token for pagination (from previous response) |
| `maxResults` | number | no |  | Max Results. Maximum number of buckets to return. |

### `create_object_acl`

**Create Object ACL.** Grants an entity (user, group, domain, or special scope) a role on a single object's access-control list, optionally targeting a specific generation. Use to give read or owner access to one file. Not idempotent: adding an entry that already exists fails. Only works on buckets using fine-grained ACLs, not uniform bucket-level access; requires bucket, object, entity, and role. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `object` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `entity` | string | yes |  | Entity. The entity to grant access to. Must include the entity type prefix. Format: user-emailAddress, group-groupId, group-emailAddress, domain-domainName, project-team-projectId, allUsers, or allAuthenticatedUsers. Examples: user-liz@example.com, group-mygroup@googlegroups.com, domain-example.com, allUse… |
| `role` | string | yes |  | Role. One of `"READER"`, `"OWNER"`. |
| `generation` | number | no |  | Generation. Optional generation number for versioned objects. |

### `delete_object_acl`

**Delete Object ACL.** Removes an entity's entry from a single object's access-control list, optionally targeting a specific generation. Use to revoke a user or group's access to one file. Not idempotent: the first call removes the entry and a repeat fails because it no longer exists. Only works on buckets using fine-grained ACLs, not uniform bucket-level access; requires bucket, object, and entity. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `object` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `entity` | string | yes |  | Entity. The entity to grant access to. Must include the entity type prefix. Format: user-emailAddress, group-groupId, group-emailAddress, domain-domainName, project-team-projectId, allUsers, or allAuthenticatedUsers. Examples: user-liz@example.com, group-mygroup@googlegroups.com, domain-example.com, allUse… |
| `generation` | number | no |  | Generation. Optional generation number for versioned objects. |

### `create_bucket_acl`

**Create Bucket ACL.** Grants an entity (user, group, domain, or special scope) a role on a bucket's own access-control list. Use to let someone read or manage the bucket itself. Not idempotent: adding an entry that already exists fails. Only works on buckets using fine-grained ACLs, not uniform bucket-level access; requires bucket, entity, and role. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `entity` | string | yes |  | Entity. The entity to grant access to. Must include the entity type prefix. Format: user-emailAddress, group-groupId, group-emailAddress, domain-domainName, project-team-projectId, allUsers, or allAuthenticatedUsers. Examples: user-liz@example.com, group-mygroup@googlegroups.com, domain-example.com, allUse… |
| `role` | string | yes |  | Role. One of `"READER"`, `"WRITER"`, `"OWNER"`. |

### `delete_bucket_acl`

**Delete Bucket ACL.** Removes an entity's entry from a bucket's own access-control list. Use to revoke a user or group's access to the bucket. Not idempotent: the first call removes the entry and a repeat fails because it no longer exists. Only works on buckets using fine-grained ACLs, not uniform bucket-level access; requires bucket and entity. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `entity` | string | yes |  | Entity. The entity to grant access to. Must include the entity type prefix. Format: user-emailAddress, group-groupId, group-emailAddress, domain-domainName, project-team-projectId, allUsers, or allAuthenticatedUsers. Examples: user-liz@example.com, group-mygroup@googlegroups.com, domain-example.com, allUse… |

### `create_bucket_default_object_acl`

**Create Bucket Default Object ACL.** Adds an entry to a bucket's default object ACL, which is applied automatically to objects later uploaded without their own ACL. Use to pre-set permissions for future uploads. Not idempotent: adding an entry that already exists fails, and it does not affect existing objects. Only works on buckets using fine-grained ACLs, not uniform bucket-level access; requires bucket, entity, and role. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `entity` | string | yes |  | Entity. The entity to grant access to. Must include the entity type prefix. Format: user-emailAddress, group-groupId, group-emailAddress, domain-domainName, project-team-projectId, allUsers, or allAuthenticatedUsers. Examples: user-liz@example.com, group-mygroup@googlegroups.com, domain-example.com, allUse… |
| `role` | string | yes |  | Role. One of `"READER"`, `"OWNER"`. |

### `delete_bucket_default_object_acl`

**Delete Bucket Default Object ACL.** Removes an entity's entry from a bucket's default object ACL, so it no longer applies to future uploads. Use to revert a default-permission rule for new objects. Not idempotent: the first call removes the entry and a repeat fails because it no longer exists, and it does not affect already-uploaded objects. Only works on buckets using fine-grained ACLs, not uniform bucket-level access; requires bucket and entity. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `bucket` | string | yes |  | Bucket. A value the product loads from the provider, such as an id; write the value itself. |
| `entity` | string | yes |  | Entity. The entity to grant access to. Must include the entity type prefix. Format: user-emailAddress, group-groupId, group-emailAddress, domain-domainName, project-team-projectId, allUsers, or allAuthenticatedUsers. Examples: user-liz@example.com, group-mygroup@googlegroups.com, domain-example.com, allUse… |
