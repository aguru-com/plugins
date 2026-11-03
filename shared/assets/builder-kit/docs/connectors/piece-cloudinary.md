# Cloudinary

Cloudinary is a cloud-based image and video management platform that allows you to upload, store, manage, and deliver your media assets. It provides a range of features for image and video optimization, transformation, and delivery.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cloudinary'
  version: '0.2.0'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your Cloudinary account credentials. Find these in your Cloudinary Console settings under the API keys page.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_key` | string | yes |  | API Key. Your Cloudinary API Key. Found in Console Settings → API Keys page. |
| `api_secret` | string | yes |  | API Secret. Your Cloudinary API Secret. Found in Console Settings → API Keys page. Keep this secure and never share publicly. |
| `cloud_name` | string | yes |  | Cloud Name. Your Cloudinary Cloud Name. Found in Console Settings → API Keys page or in your dashboard URL (e.g., "demo" from console.cloudinary.com/console/demo). |

## Actions

### `uploadResource`

**Upload Resource.** Uploads a file (image, video, or raw) to Cloudinary, optionally placing it in a folder, tagging it, and assigning a public ID. Use to ingest media into the account before transforming, delivering, or referencing it. Not idempotent: each call uploads the file and, unless overwrite is enabled with a fixed public_id, creates a distinct asset. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload to Cloudinary. Files are not supported; an action that needs one fails. |
| `public_id` | string | no |  | Public ID. The public ID for the uploaded resource. If not specified, a random ID will be generated. |
| `folder` | string | no |  | Folder. Select an existing folder or type a new folder path (e.g., "samples/animals") A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Select existing tags or type new ones. Values the product loads from the provider, such as ids; write an array of them. |
| `overwrite` | boolean | no | `true` | Overwrite. Whether to overwrite existing assets with the same public ID. |
| `use_filename` | boolean | no | `false` | Use Original Filename. Whether to use the original file name as the public ID. |

### `deleteResource`

**Delete Resource.** Permanently deletes Cloudinary assets, selected either by a list of public IDs, by a tag, or by a public-ID prefix. Use to remove media from the account; this is a destructive bulk operation, so confirm the selection before calling. Not idempotent: it mutates account state and can also strip derived assets or invalidate the CDN cache. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `deletion_mode` | string | yes | `"public_ids"` | Deletion Mode. Choose how to specify assets for deletion. One of `"public_ids"`, `"tag"`, `"prefix"`. |
| `resource_type` | string | yes |  | Resource Type. Select the type of resource to upload to Cloudinary. A value the product loads from the provider, such as an id; write the value itself. |
| `public_ids_dropdown` | array | no |  | Public IDs. Select assets to delete by their public IDs. Values the product loads from the provider, such as ids; write an array of them. |
| `public_ids_manual` | string | no |  | Manual Public IDs. Or type comma-separated public IDs manually (up to 100). Example: image1,image2,folder/image3. |
| `tag_dropdown` | string | no |  | Tags. Select existing tags or type new ones (comma-separated) A value the product loads from the provider, such as an id; write the value itself. |
| `tag_manual` | string | no |  | Manual Tag. Or type tag name manually to delete all assets with this tag (up to 1000 assets) |
| `prefix` | string | no |  | Prefix. Delete all assets whose public ID starts with this prefix (up to 1000 assets) |
| `type` | string | no | `"upload"` | Delivery Type. The delivery type of assets to delete. One of `"upload"`, `"private"`, `"authenticated"`. |
| `keep_original` | boolean | no | `false` | Keep Original. Delete only derived assets, keep the original. |
| `invalidate` | boolean | no | `false` | Invalidate CDN Cache. Whether to invalidate CDN cached copies. Takes a few minutes to propagate. |

### `createUsageReport`

**Create Usage Report.** Reads the Cloudinary account usage and quota figures (storage, bandwidth, transformations, requests, add-ons) for an optional date within the last three months. Use to check current consumption against plan limits. Read-only and idempotent; despite the name it creates nothing. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `date` | ISO date-time string | no |  | Report Date. Date for the usage report. Must be within the last 3 months. Leave empty for current date. |
| `include_breakdown` | boolean | no | `true` | Include Detailed Breakdown. Whether to include detailed breakdown of transformation types and add-on usage in the response. |

### `findResourceByPublicId`

**Find Resource by Public ID.** Looks up a single Cloudinary asset by its public ID, resource type, and delivery type, returning its metadata. Use to confirm an asset exists or fetch its details before transforming or deleting it; a missing asset returns a not-found result rather than erroring. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. Select the type of resource to upload to Cloudinary. A value the product loads from the provider, such as an id; write the value itself. |
| `public_id_dropdown` | string | no |  | Public ID. Select an asset to find by its public ID. A value the product loads from the provider, such as an id; write the value itself. |
| `public_id_manual` | string | no |  | Manual Public ID. Or enter the public ID manually if not found in dropdown (e.g., "sample", "folder/image-name") |
| `delivery_type` | string | no | `"upload"` | Delivery Type. The delivery type of the asset. One of `"upload"`, `"private"`, `"authenticated"`. |

### `transformResource`

**Transform Resource.** Builds a Cloudinary delivery URL for an existing asset with the requested transformations (resize, crop, format, quality, border, rotation, raw string, etc.), and optionally pre-warms the rendered derivative with a HEAD request. Use to produce a transformed image/video link for a known public ID. Idempotent: the same inputs always yield the same URL and no asset is mutated. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes |  | Resource Type. Select the type of resource to upload to Cloudinary. A value the product loads from the provider, such as an id; write the value itself. |
| `public_ids_dropdown` | array | no |  | Public IDs. Select assets to delete by their public IDs. Values the product loads from the provider, such as ids; write an array of them. |
| `public_id_manual` | string | no |  | Manual Public ID. Or enter public ID manually if not in dropdown. |
| `width` | number | no |  | Width. Target width in pixels. |
| `height` | number | no |  | Height. Target height in pixels. |
| `crop_mode` | string | no |  | Crop Mode. How to handle resizing when aspect ratios differ. One of `"scale"`, `"fill"`, `"fit"`, `"crop"`, `"thumb"`, `"limit"`. |
| `gravity` | string | no |  | Gravity. Which part to focus on when cropping. One of `"auto"`, `"face"`, `"center"`, `"north"`, `"south"`, `"east"`, `"west"`, `"north_west"`, `"north_east"`, `"south_west"`, `"south_east"`. |
| `format` | string | no |  | Output Format. Convert to this format. One of `"auto"`, `"jpg"`, `"png"`, `"webp"`, `"avif"`, `"gif"`, `"svg"`. |
| `quality` | string | no |  | Quality. Image quality/compression level. One of `"auto"`, `"90"`, `"80"`, `"70"`, `"50"`. |
| `border` | string | no |  | Border. Add border (e.g., "5px_solid_blue", "10px_solid_#ff0000") |
| `radius` | string | no |  | Border Radius. Round corners or make circular. One of `"10"`, `"20"`, `"50"`, `"max"`. |
| `opacity` | number | no |  | Opacity. Transparency level (0-100, where 100 is opaque) |
| `rotation` | number | no |  | Rotation. Rotate image by degrees (0-360) |
| `raw_transformation` | string | no |  | Raw Transformation. Advanced: Raw transformation string (e.g., "c_fill,w_300,h_200/e_sepia/r_20"). This will be applied after the above basic transformations. |
| `generate_url_only` | boolean | no | `true` | Generate URL Only. If true, only return the transformation URL. If false, also make a request to generate the transformed asset. |

Output fields:

- `transformation_url`: Transformation URL (url)
- `public_id`: Public ID
- `resource_type`: Resource Type
- `applied_transformations`: Applied Transformations
- `cloud_name`: Cloud Name

### `cloudinary_add_related_assets_by_asset_id`

**Add Related Assets by Asset ID.** Creates two-way relations between a source asset and up to 10 other assets, all identified by their immutable asset_id. Use Add Related Assets when you have public IDs. Returns success and failed lists. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_id` | string | yes |  | Asset ID. asset_id of the source asset. |
| `assets_to_relate` | array | yes |  | Asset IDs to Relate. Up to 10 asset_ids. |

Output fields:

- `failed`: Failed
- `success`: Success
- `success[].message`: Message
- `success[].code`: Code
- `success[].asset`: Asset
- `success[].status`: Status (number)

### `cloudinary_add_related_assets`

**Add Related Assets.** Creates two-way relations between a source asset (by public ID) and up to 10 other assets, given as "resource_type/type/public_id" paths (e.g. "image/upload/shoe-side"). Relations show in Get Resource as related_assets. Returns success and failed lists; re-adding an existing relation is reported, not duplicated. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_id` | string | yes |  | Public ID. Public ID of the source asset. |
| `assets_to_relate` | array | yes |  | Assets to Relate. Up to 10 asset paths as resource_type/type/public_id (e.g. "image/upload/shoe-side"). |

Output fields:

- `failed`: Failed
- `success`: Success
- `success[].message`: Message
- `success[].code`: Code
- `success[].asset`: Asset
- `success[].status`: Status (number)

### `cloudinary_concatenate_videos`

**Concatenate Videos.** Concatenates two or more videos, given as ordered URLs, into one new MP4 video asset. Processing is asynchronous: the response has status and public_id; call Get Resource (resource type video) on the public_id to check when it is ready. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | Video URLs. At least two video URLs, in playback order. |
| `public_id` | string | no |  | Public ID. Public ID for the combined video. Leave empty for a random ID. |
| `asset_folder` | string | no |  | Asset Folder. Folder for the combined video. |
| `notification_url` | string | no |  | Notification URL. Webhook URL called when processing finishes. |

Output fields:

- `status`: Status
- `unique_upload_id`: Unique Upload ID
- `public_id`: Public ID
- `resource_type`: Resource Type

### `cloudinary_create_folder`

**Create Folder.** Creates an empty folder at the given path, creating missing parents too. Succeeds without change if the folder already exists. Returns name, path and the folder external_id. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes |  | Folder Path. Full folder path (e.g. "marketing/banners"). |

Output fields:

- `success`: Success (boolean)
- `path`: Path
- `name`: Name
- `external_id`: External ID

### `cloudinary_create_image_from_text`

**Create Image from Text.** Creates a new image asset that renders the given text with optional font, size, color, weight, style, alignment and background. Returns the asset with its public_id and URLs. Not idempotent: each call creates an asset unless the same Public ID is reused. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to render. |
| `public_id` | string | no |  | Public ID. Public ID for the new image. Leave empty for a random ID. |
| `font_family` | string | no |  | Font Family. Font name (e.g. "Arial"). Defaults to Arial. |
| `font_size` | number | no |  | Font Size. Font size in points. Defaults to 12. |
| `font_color` | string | no |  | Font Color. Color name or hex (e.g. "red", "#FF0000"). Defaults to black. |
| `font_weight` | string | no |  | Font Weight. Normal or bold. One of `"normal"`, `"bold"`. |
| `font_style` | string | no |  | Font Style. Normal or italic. One of `"normal"`, `"italic"`. |
| `text_align` | string | no |  | Text Align. Alignment for multi-line text. One of `"left"`, `"center"`, `"right"`, `"justify"`. |
| `background` | string | no |  | Background. Background color name or hex. Defaults to transparent. |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `version`: Version (number)
- `version_id`: Version ID
- `signature`: Signature
- `width`: Width (number)
- `height`: Height (number)
- `format`: Format
- `resource_type`: Resource Type
- `created_at`: Created At (datetime)
- `tags`: Tags
- `bytes`: Bytes (number)
- `type`: Type
- `etag`: Etag
- `placeholder`: Placeholder (boolean)
- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `asset_folder`: Asset Folder
- `display_name`: Display Name

### `cloudinary_create_metadata_field`

**Create Metadata Field.** Creates a structured metadata field of type string, integer, date, enum (single choice) or set (multiple choice). Enum and set fields need Allowed Values. A mandatory field needs a Default Value. Fails if the external_id already exists. Returns the field definition, including its datasource values with their external_ids. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Field Type. The value type. One of `"string"`, `"integer"`, `"date"`, `"enum"`, `"set"`. |
| `label` | string | yes |  | Label. Display label of the field. |
| `external_id` | string | no |  | External ID. Unique ID for the field. Generated when empty. |
| `datasource_values` | array | no |  | Allowed Values. Allowed values for enum or set fields. |
| `mandatory` | boolean | no | `false` | Mandatory. Every asset must have a value (requires Default Value). |
| `default_value` | string | no |  | Default Value. Default value. For integer fields a number; for enum/set the external_id of a datasource value. |

Output fields:

- `type`: Type
- `external_id`: External ID
- `label`: Label
- `mandatory`: Mandatory (boolean)
- `default_value`: Default Value
- `validation`: Validation
- `default_disabled`: Default Disabled (boolean)
- `restrictions`: Restrictions
- `restrictions.readonly_ui`: Readonly Ui (boolean)
- `restrictions.hidden_ui`: Hidden Ui (boolean)
- `restrictions.excluded_from_search`: Excluded From Search (boolean)
- `group`: Group
- `datasource`: Datasource
- `datasource.values`: Values
- `datasource.values[].external_id`: External ID
- `datasource.values[].value`: Value
- `datasource.values[].state`: State
- `lazy_datasource_update`: Lazy Datasource Update (boolean)
- `allow_dynamic_list_values`: Allow Dynamic List Values (boolean)
- `alphabetically_sorted`: Alphabetically Sorted (boolean)

### `cloudinary_create_multi_resource`

**Create Animation from Images.** Combines all images carrying a tag (in public ID order), or an ordered list of image URLs, into one animated image, video or PDF. Set Format to gif, webp, mp4 or pdf, and optionally a transformation such as "dl_200" for frame delay. Returns the new asset's URL. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | no |  | Tag. Combine all images with this tag. Use either this or URLs. |
| `urls` | array | no |  | Image URLs. Ordered Cloudinary delivery URLs of the images. Use either this or Tag. |
| `format` | string | no | `"gif"` | Output Format. The output file type. Defaults to gif. One of `"gif"`, `"webp"`, `"png"`, `"mp4"`, `"webm"`, `"pdf"`. |
| `transformation` | string | no |  | Transformation. Transformation applied to each frame (e.g. "c_fill,w_400,h_400/dl_200"). |
| `async` | boolean | no | `false` | Process Asynchronously. Return immediately and generate in the background. |

Output fields:

- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `asset_id`: Asset ID
- `public_id`: Public ID
- `version`: Version (number)

### `cloudinary_create_transformation`

**Create Named Transformation.** Creates a named transformation, so delivery URLs can use t_<name> instead of the full parameter string (e.g. name "thumb" for "c_fill,w_200,h_200/f_auto,q_auto"). Fails if the name exists; use Update Named Transformation to change it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Transformation Name. Named transformation name, without the t_ prefix. |
| `transformation` | string | yes |  | Transformation. Transformation string (e.g. "c_fill,w_200,h_200/f_auto,q_auto"). |
| `allowed_for_strict` | boolean | no | `false` | Allowed for Strict Mode. Allow this transformation when strict transformations are enabled. |

Output fields:

- `message`: Message

### `cloudinary_delete_derived_resources`

**Delete Derived Resources.** Deletes up to 100 derived versions (transformed copies) by derived resource ID, keeping the originals. The IDs are the "id" values in the derived array returned by Get Resource. Cloudinary regenerates a derived version on its next request. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `derived_resource_ids` | array | yes |  | Derived Resource IDs. Up to 100 derived resource IDs, from the derived array of Get Resource. |
| `invalidate` | boolean | no | `false` | Invalidate CDN Cache. Also invalidate cached copies on the CDN (takes a few minutes to propagate). |

Output fields:

- `deleted`: Deleted (an object whose keys vary)

### `cloudinary_delete_folder`

**Delete Folder.** Deletes a folder and its empty subfolders. Fails if the folder still contains assets (including backed-up ones); delete or move those first. Returns the deleted folder paths. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes |  | Folder Path. Full folder path (e.g. "marketing/banners"). |

Output fields:

- `deleted`: Deleted

### `cloudinary_delete_metadata_datasource_entries`

**Delete Metadata Datasource Values.** Soft-deletes allowed values of an enum or set metadata field by value external_id; they disappear from the field and can be brought back with Restore Metadata Datasource Values. Returns the remaining values. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |
| `value_external_ids` | array | yes |  | Value External IDs. external_ids of the datasource values, from Get Metadata Field. |

Output fields:

- `values`: Values
- `values[].external_id`: External ID
- `values[].value`: Value

### `cloudinary_delete_metadata_field`

**Delete Metadata Field.** Permanently deletes a structured metadata field definition by external_id, removing its values from every asset. Irreversible. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |

Output fields:

- `message`: Message

### `cloudinary_delete_related_assets_by_asset_id`

**Remove Related Assets by Asset ID.** Removes the relations between a source asset and up to 10 related assets, all identified by asset_id. The assets themselves are not deleted. Returns success and failed lists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_id` | string | yes |  | Asset ID. asset_id of the source asset. |
| `assets_to_unrelate` | array | yes |  | Asset IDs to Unrelate. Up to 10 asset_ids. |

Output fields:

- `failed`: Failed
- `success`: Success
- `success[].message`: Message
- `success[].code`: Code
- `success[].asset`: Asset
- `success[].status`: Status (number)

### `cloudinary_delete_related_assets`

**Remove Related Assets.** Removes the relations between a source asset (by public ID) and up to 10 related assets, given as "resource_type/type/public_id" paths. The assets themselves are not deleted. Returns success and failed lists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_id` | string | yes |  | Public ID. Public ID of the source asset. |
| `assets_to_unrelate` | array | yes |  | Assets to Unrelate. Up to 10 asset paths as resource_type/type/public_id. |

Output fields:

- `failed`: Failed
- `success`: Success
- `success[].message`: Message
- `success[].code`: Code
- `success[].asset`: Asset
- `success[].status`: Status (number)

### `cloudinary_delete_resources_by_tag`

**Delete Resources by Tag.** Permanently deletes every asset of one resource type carrying the given tag, up to 1000 per call; partial=true in the result means more remain, so call again. Irreversible unless backups are enabled. Check what matches first with List Resources by Tag. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `tag` | string | yes |  | Tag. The exact tag whose assets will be deleted. |
| `keep_original` | boolean | no | `false` | Keep Original. Delete only derived versions and keep the original files. |
| `invalidate` | boolean | no | `false` | Invalidate CDN Cache. Also invalidate cached copies on the CDN (takes a few minutes to propagate). |

Output fields:

- `deleted`: Deleted (an object whose keys vary)
- `deleted_counts`: Deleted Counts (an object whose keys vary)
- `deleted_counts.original`: Original (number)
- `deleted_counts.derived`: Derived (number)
- `partial`: Partial (boolean)

### `cloudinary_delete_resources`

**Delete Resources.** Permanently deletes up to 100 assets of one resource type and delivery type, given either a list of public IDs or a public ID prefix (not both). Irreversible unless backups are enabled. Returns a deleted map of public_id to "deleted" or "not_found", and partial=true when more remain for a prefix (call again). To delete by tag use Delete Resources by Tag. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_ids` | array | no |  | Public IDs. Up to 100 public IDs to delete. Use either this or Prefix. |
| `prefix` | string | no |  | Prefix. Delete every asset whose public ID starts with this value. Use either this or Public IDs. |
| `keep_original` | boolean | no | `false` | Keep Original. Delete only derived versions and keep the original files. |
| `invalidate` | boolean | no | `false` | Invalidate CDN Cache. Also invalidate cached copies on the CDN (takes a few minutes to propagate). |

Output fields:

- `deleted`: Deleted (an object whose keys vary)
- `deleted_counts`: Deleted Counts (an object whose keys vary)
- `deleted_counts.original`: Original (number)
- `deleted_counts.derived`: Derived (number)
- `partial`: Partial (boolean)

### `cloudinary_delete_transformation`

**Delete Named Transformation.** Deletes a named transformation; URLs using t_<name> stop generating new derived assets. Optionally invalidates already-derived copies on the CDN. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Transformation Name. Named transformation name, without the t_ prefix. |
| `invalidate` | boolean | no | `false` | Invalidate CDN Cache. Also invalidate cached copies on the CDN (takes a few minutes to propagate). |

Output fields:

- `message`: Message

### `cloudinary_destroy_asset_by_id`

**Destroy Asset by Asset ID.** Permanently deletes a single asset identified by its asset_id, regardless of resource type or delivery type. Returns result "ok", or "not found" when nothing matched. For several assets by public ID use Delete Resources. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_id` | string | yes |  | Asset ID. The asset's immutable asset_id. |
| `invalidate` | boolean | no | `false` | Invalidate CDN Cache. Also invalidate cached copies on the CDN (takes a few minutes to propagate). |

Output fields:

- `result`: Result

### `cloudinary_explicit_resource`

**Apply Operations to Resource.** Applies upload-style operations to an existing asset without re-uploading it, most often to pre-generate derived versions with eager transformations (e.g. "c_fill,w_400,h_400|f_webp,q_auto"). Can also set tags, context or structured metadata. Use eager async for videos. Returns the asset with an eager array of the generated URLs. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_id` | string | yes |  | Public ID. The asset's public ID. |
| `eager` | string | no |  | Eager Transformations. Transformations to generate now, pipe-separated (e.g. "c_fill,w_400,h_400\|f_webp,q_auto"). |
| `eager_async` | boolean | no | `false` | Generate Asynchronously. Generate eager transformations in the background (recommended for videos). |
| `tags` | array | no |  | Tags. Replaces the asset's tags with this list. |
| `context` | string | no |  | Context. Contextual metadata as pipe-separated key=value pairs. |
| `invalidate` | boolean | no | `false` | Invalidate CDN Cache. Also invalidate cached copies on the CDN (takes a few minutes to propagate). |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `version`: Version (number)
- `version_id`: Version ID
- `signature`: Signature
- `width`: Width (number)
- `height`: Height (number)
- `format`: Format
- `resource_type`: Resource Type
- `created_at`: Created At (datetime)
- `tags`: Tags
- `bytes`: Bytes (number)
- `type`: Type
- `placeholder`: Placeholder (boolean)
- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `asset_folder`: Asset Folder
- `display_name`: Display Name
- `eager`: Eager
- `eager[].transformation`: Transformation
- `eager[].width`: Width (number)
- `eager[].height`: Height (number)
- `eager[].bytes`: Bytes (number)
- `eager[].format`: Format
- `eager[].url`: URL (image)
- `eager[].secure_url`: Secure URL (image)

### `cloudinary_explode_resource`

**Explode Multi-Page Resource.** Asynchronously generates a separate derived image for every page of a multi-page PDF or every frame of an animated GIF/WebP. The transformation must contain "pg_all" (default). Returns status "processing" and a batch_id; the derived images then appear in Get Resource's derived list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `public_id` | string | yes |  | Public ID. Public ID of the PDF or animated image. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `transformation` | string | no |  | Transformation. Must include pg_all. Defaults to "pg_all". |
| `format` | string | no |  | Format. Output format of each page (e.g. "png", "jpg"). |
| `notification_url` | string | no |  | Notification URL. Webhook URL called when done. |

Output fields:

- `status`: Status
- `batch_id`: Batch ID

### `cloudinary_generate_archive`

**Generate Archive.** Bundles assets selected by public IDs, tags and/or public ID prefixes into a ZIP or TGZ file, stored in Cloudinary as a new raw asset; returns its secure_url, resource_count and any missing IDs. Use to hand off many files as one download. Not idempotent: each call creates a new archive asset unless Target Public ID is reused. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | no | `"image"` | Resource Type. Which asset type to include. Defaults to image. One of `"image"`, `"video"`, `"raw"`, `"all"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_ids` | array | no |  | Public IDs. Assets to include. |
| `tags` | array | no |  | Tags. Include all assets with any of these tags. |
| `prefixes` | array | no |  | Prefixes. Include all assets whose public ID starts with any of these. |
| `target_format` | string | no |  | Archive Format. Defaults to zip. One of `"zip"`, `"tgz"`. |
| `target_public_id` | string | no |  | Target Public ID. Public ID for the archive file. |
| `flatten_folders` | boolean | no | `false` | Flatten Folders. Put all files at the archive root. |
| `allow_missing` | boolean | no | `false` | Allow Missing. Create the archive even if some requested assets do not exist. |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `version`: Version (number)
- `version_id`: Version ID
- `signature`: Signature
- `resource_type`: Resource Type
- `created_at`: Created At (datetime)
- `tags`: Tags
- `bytes`: Bytes (number)
- `type`: Type
- `etag`: Etag
- `placeholder`: Placeholder (boolean)
- `url`: URL (url)
- `secure_url`: Secure URL (url)
- `asset_folder`: Asset Folder
- `display_name`: Display Name
- `resource_count`: Resource Count (number)
- `file_count`: File Count (number)

### `cloudinary_generate_download_url`

**Generate Download URL.** Builds a signed URL that downloads the original file of an asset, which works for private and authenticated assets that have no public delivery URL. Identify the asset by Public ID (with resource type, delivery type and file format) or by Asset ID, not both. The URL is signed locally and expires after the given number of seconds (default 1 hour); nothing is changed in Cloudinary. For a transformed public delivery URL use Transform Resource. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `public_id` | string | no |  | Public ID. The asset's public ID. Use either this or Asset ID. |
| `asset_id` | string | no |  | Asset ID. The asset's immutable asset_id. Use either this or Public ID. |
| `resource_type` | string | no |  | Resource Type. The asset type. Leave empty to include all types. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `format` | string | no |  | Format. File format/extension of the download (e.g. "jpg", "pdf"). Required with Public ID for images and videos. |
| `expires_in_seconds` | number | no |  | Expires In (Seconds). How long the URL stays valid. Defaults to 3600. |
| `attachment` | boolean | no | `false` | Force Download. Make browsers save the file instead of displaying it. |
| `target_filename` | string | no |  | Target Filename. File name to suggest when the file is saved. |

Output fields:

- `download_url`: Download URL (url)
- `expires_at`: Expires At (datetime)
- `public_id`: Public ID
- `asset_id`: Asset ID

### `cloudinary_get_config`

**Get Environment Config.** Returns the cloud name and environment settings, notably folder_mode ("dynamic" or "fixed"). Check it before folder operations: asset folders, Rename Folder and List Resources by Asset Folder need dynamic mode; on fixed mode, folders are public ID prefixes. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `cloud_name`: Cloud Name
- `created_at`: Created At (datetime)
- `id`: ID
- `settings`: Settings
- `settings.folder_mode`: Folder Mode

### `cloudinary_get_folder`

**Get Folder.** Returns one folder's name, path, external_id, created_at, resource_count, total_bytes, last_uploaded_at and ancestors, looked up by path or by folder external_id (not both). Folder IDs come from List Root Folders, List Subfolders or Search Folders. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | no |  | Folder Path. Full folder path. Use either this or Folder ID. |
| `folder_id` | string | no |  | Folder ID. The folder external_id. Use either this or Folder Path. |
| `case_sensitive` | boolean | no | `false` | Case Sensitive. Match the path case-sensitively. |

Output fields:

- `name`: Name
- `path`: Path
- `external_id`: External ID

### `cloudinary_get_metadata_field`

**Get Metadata Field.** Returns one structured metadata field definition by external_id, including its datasource values for enum and set fields. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |

Output fields:

- `type`: Type
- `external_id`: External ID
- `label`: Label
- `mandatory`: Mandatory (boolean)
- `default_value`: Default Value
- `validation`: Validation
- `default_disabled`: Default Disabled (boolean)
- `restrictions`: Restrictions
- `restrictions.readonly_ui`: Readonly Ui (boolean)
- `restrictions.hidden_ui`: Hidden Ui (boolean)
- `restrictions.excluded_from_search`: Excluded From Search (boolean)
- `group`: Group
- `datasource`: Datasource
- `datasource.values`: Values
- `datasource.values[].external_id`: External ID
- `datasource.values[].value`: Value
- `datasource.values[].state`: State
- `lazy_datasource_update`: Lazy Datasource Update (boolean)
- `allow_dynamic_list_values`: Allow Dynamic List Values (boolean)
- `alphabetically_sorted`: Alphabetically Sorted (boolean)

### `cloudinary_get_resource_by_asset_id`

**Get Resource by Asset ID.** Returns the full details of one asset by its asset_id, the immutable 32-character ID returned by upload, list and search that survives renames and moves. Use Get Resource when you only have the public ID. Fails with Not found when the asset does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_id` | string | yes |  | Asset ID. The asset's immutable asset_id. |
| `include_colors` | boolean | no | `false` | Include Colors. Include the predominant colors and color histogram (images only). |
| `include_media_metadata` | boolean | no | `false` | Include Media Metadata. Include IPTC, XMP and detailed Exif metadata. |
| `include_faces` | boolean | no | `false` | Include Faces. Include detected face coordinates (images only). |
| `include_quality_analysis` | boolean | no | `false` | Include Quality Analysis. Include the quality analysis score (images only). |
| `include_versions` | boolean | no | `false` | Include Versions. Include backed-up versions of the asset, when backups are enabled. |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `format`: Format
- `version`: Version (number)
- `resource_type`: Resource Type
- `type`: Type
- `created_at`: Created At (datetime)
- `bytes`: Bytes (number)
- `width`: Width (number)
- `height`: Height (number)
- `asset_folder`: Asset Folder
- `display_name`: Display Name
- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `context`: Context
- `context.custom`: Custom (an object whose keys vary)
- `last_updated`: Last Updated
- `tags`: Tags
- `next_cursor`: Next Cursor
- `derived`: Derived

### `cloudinary_get_resource`

**Get Resource.** Returns the full details of one asset (URLs, format, size, dimensions, tags, context, structured metadata, derived versions) by resource type, delivery type and public ID. Use Get Resource by Asset ID when you hold the immutable asset_id instead. Fails with Not found when the asset does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_id` | string | yes |  | Public ID. The asset's public ID, without file extension for images and videos (e.g. "products/shoe"). |
| `include_colors` | boolean | no | `false` | Include Colors. Include the predominant colors and color histogram (images only). |
| `include_media_metadata` | boolean | no | `false` | Include Media Metadata. Include IPTC, XMP and detailed Exif metadata. |
| `include_faces` | boolean | no | `false` | Include Faces. Include detected face coordinates (images only). |
| `include_quality_analysis` | boolean | no | `false` | Include Quality Analysis. Include the quality analysis score (images only). |
| `include_versions` | boolean | no | `false` | Include Versions. Include backed-up versions of the asset, when backups are enabled. |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `format`: Format
- `version`: Version (number)
- `resource_type`: Resource Type
- `type`: Type
- `created_at`: Created At (datetime)
- `bytes`: Bytes (number)
- `width`: Width (number)
- `height`: Height (number)
- `asset_folder`: Asset Folder
- `display_name`: Display Name
- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `context`: Context
- `context.custom`: Custom (an object whose keys vary)
- `last_updated`: Last Updated
- `tags`: Tags
- `next_cursor`: Next Cursor
- `derived`: Derived
- `colors`: Colors
- `predominant`: Predominant
- `predominant.google`: Google
- `predominant.cloudinary`: Cloudinary
- `pages`: Pages (number)
- `usage`: Usage
- `etag`: Etag

### `cloudinary_get_transformation`

**Get Transformation.** Returns one transformation (by name, or by its transformation string such as "c_fill,w_200"), including whether it is named, allowed in strict mode, its parameters, and derived assets that use it. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Transformation. A named transformation name, or a transformation string (e.g. "c_fill,w_200"). |

Output fields:

- `name`: Name
- `allowed_for_strict`: Allowed For Strict (boolean)
- `used`: Used (boolean)
- `named`: Named (boolean)
- `info`: Info
- `info[].width`: Width (number)
- `info[].height`: Height (number)
- `info[].crop`: Crop
- `derived`: Derived

### `cloudinary_get_upload_preset`

**Get Upload Preset.** Returns one upload preset's name, unsigned flag and settings (folder, tags, transformations, moderation, etc.). Names come from List Upload Presets. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Preset Name. The upload preset name. |

Output fields:

- `name`: Name
- `unsigned`: Unsigned (boolean)
- `settings`: Settings
- `settings.asset_folder`: Asset Folder
- `settings.folder`: Folder
- `settings.tags`: Tags
- `settings.resource_type`: Resource Type
- `settings.type`: Type
- `settings.use_filename`: Use Filename (boolean)
- `settings.unique_filename`: Unique Filename (boolean)
- `settings.overwrite`: Overwrite (boolean)
- `settings.invalidate`: Invalidate (boolean)
- `settings.allowed_formats`: Allowed Formats
- `settings.moderation`: Moderation
- `settings.notification_url`: Notification URL (url)
- `settings.eager`: Eager Transformations
- `settings.transformation`: Transformation

### `cloudinary_get_usage`

**Get Usage.** Returns the plan name and usage against limits for storage, bandwidth, transformations, objects, requests and credits, for today or a given date within the last 3 months. Use to check remaining quota before heavy uploads or transformations. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `date` | string | no |  | Date. Day to report, as YYYY-MM-DD, within the last 3 months. Leave empty for the latest figures. |

Output fields:

- `plan`: Plan
- `last_updated`: Last Updated (date)
- `date_requested`: Date Requested (datetime)
- `transformations`: Transformations
- `transformations.usage`: Usage (number)
- `transformations.credits_usage`: Credits Usage (number)
- `transformations.breakdown`: Breakdown
- `transformations.breakdown.transformation`: Transformation (number)
- `objects`: Objects
- `objects.usage`: Usage (number)
- `bandwidth`: Bandwidth
- `bandwidth.usage`: Usage (number)
- `bandwidth.credits_usage`: Credits Usage (number)
- `storage`: Storage
- `storage.usage`: Usage (number)
- `storage.credits_usage`: Credits Usage (number)
- `impressions`: Impressions
- `impressions.usage`: Usage (number)
- `impressions.credits_usage`: Credits Usage (number)
- `seconds_delivered`: Seconds Delivered
- `seconds_delivered.usage`: Usage (number)
- `seconds_delivered.credits_usage`: Credits Usage (number)
- `credits`: Credits
- `credits.usage`: Usage (number)
- `credits.limit`: Limit (number)
- `credits.used_percent`: Used Percent (number)
- `resources`: Resources (number)
- `derived_resources`: Derived Resources (number)
- `requests`: Requests (number)
- `media_limits`: Media Limits
- `media_limits.image_max_size_bytes`: Image Max Size Bytes (number)
- `media_limits.video_max_size_bytes`: Video Max Size Bytes (number)
- `media_limits.raw_max_size_bytes`: Raw Max Size Bytes (number)
- `media_limits.image_max_px`: Image Max Px (number)
- `media_limits.asset_max_total_px`: Asset Max Total Px (number)

### `cloudinary_get_video_views`

**Get Video Views.** Returns individual video view events tracked by the Cloudinary Video Player (public ID, watch time, duration, country, OS, app, end time), optionally filtered with an expression such as `video_public_id=my_video` or `view_ended_at>2026-01-01`. Empty when no views were tracked. Pages with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `expression` | string | no |  | Expression. Filter expression (e.g. "video_public_id=my_video"). |
| `sort_by` | string | no |  | Sort By. Sort order. Defaults to most recent view first. One of `"-view_ended_at"`, `"view_ended_at"`, `"-view_watch_time"`, `"-video_duration"`. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `views`: Views
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_list_metadata_fields`

**List Metadata Fields.** Lists all structured metadata fields (type, external_id, label, mandatory, default, validation, datasource values), or only the given external_ids. Use to find the field and value external_ids that Update Resource Metadata and Search Assets (metadata.<id>) need. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_ids` | array | no |  | External IDs. Only return these fields. Leave empty for all. |

Output fields:

- `metadata_fields`: Metadata Fields
- `metadata_fields[].type`: Type
- `metadata_fields[].external_id`: External ID
- `metadata_fields[].label`: Label
- `metadata_fields[].mandatory`: Mandatory (boolean)
- `metadata_fields[].default_value`: Default Value
- `metadata_fields[].validation`: Validation
- `metadata_fields[].default_disabled`: Default Disabled (boolean)
- `metadata_fields[].restrictions`: Restrictions
- `metadata_fields[].restrictions.readonly_ui`: Readonly Ui (boolean)
- `metadata_fields[].restrictions.hidden_ui`: Hidden Ui (boolean)
- `metadata_fields[].restrictions.excluded_from_search`: Excluded From Search (boolean)
- `metadata_fields[].group`: Group
- `metadata_fields[].datasource`: Datasource
- `metadata_fields[].datasource.values`: Values
- `metadata_fields[].datasource.values[].external_id`: External ID
- `metadata_fields[].datasource.values[].value`: Value
- `metadata_fields[].datasource.values[].state`: State
- `metadata_fields[].lazy_datasource_update`: Lazy Datasource Update (boolean)
- `metadata_fields[].allow_dynamic_list_values`: Allow Dynamic List Values (boolean)
- `metadata_fields[].alphabetically_sorted`: Alphabetically Sorted (boolean)
- `count`: Count (number)

### `cloudinary_list_resource_types`

**List Resource Types.** Returns which resource types (image, video, raw) currently hold assets in this Cloudinary product environment. Use before listing or searching to know which resource_type values are worth querying. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `resource_types`: Resource Types
- `count`: Count (number)

### `cloudinary_list_resources_by_asset_folder`

**List Resources by Asset Folder.** Lists the assets placed directly in an asset folder (dynamic folder mode), across all resource types unless one is given. Folder paths come from List Root Folders or List Subfolders. On fixed-folder accounts, use List Resources with a public ID prefix instead. Pages with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_folder` | string | yes |  | Asset Folder. Full folder path (e.g. "marketing/banners"). |
| `resource_type` | string | no |  | Resource Type. The asset type. Leave empty to include all types. One of `"image"`, `"video"`, `"raw"`. |
| `direction` | string | no |  | Sort Direction. Sort by creation time. Defaults to newest first. One of `"desc"`, `"asc"`. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `resources`: Resources
- `resources[].asset_id`: Asset ID
- `resources[].public_id`: Public ID
- `resources[].format`: Format
- `resources[].version`: Version (number)
- `resources[].resource_type`: Resource Type
- `resources[].type`: Type
- `resources[].created_at`: Created At (datetime)
- `resources[].bytes`: Bytes (number)
- `resources[].width`: Width (number)
- `resources[].height`: Height (number)
- `resources[].asset_folder`: Asset Folder
- `resources[].display_name`: Display Name
- `resources[].url`: URL (image)
- `resources[].secure_url`: Secure URL (image)
- `resources[].context`: Context
- `resources[].context.custom`: Custom (an object whose keys vary)
- `resources[].last_updated`: Last Updated
- `count`: Count (number)
- `total_count`: Total Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_list_resources_by_asset_ids`

**List Resources by Asset IDs.** Fetches up to 100 assets in one call by their asset IDs (the immutable 32-character asset_id returned by upload, list and search). Use for a known set of IDs; for a single asset with full details use Get Resource by Asset ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_ids` | array | yes |  | Asset IDs. Up to 100 asset IDs. |
| `resource_type` | string | no |  | Resource Type. The asset type. Leave empty to include all types. One of `"image"`, `"video"`, `"raw"`. |

Output fields:

- `resources`: Resources
- `resources[].asset_id`: Asset ID
- `resources[].public_id`: Public ID
- `resources[].format`: Format
- `resources[].version`: Version (number)
- `resources[].resource_type`: Resource Type
- `resources[].type`: Type
- `resources[].created_at`: Created At (datetime)
- `resources[].bytes`: Bytes (number)
- `resources[].width`: Width (number)
- `resources[].height`: Height (number)
- `resources[].asset_folder`: Asset Folder
- `resources[].display_name`: Display Name
- `resources[].url`: URL (image)
- `resources[].secure_url`: Secure URL (image)
- `resources[].context`: Context
- `resources[].context.custom`: Custom (an object whose keys vary)
- `resources[].last_updated`: Last Updated
- `count`: Count (number)
- `total_count`: Total Count
- `next_cursor`: Next Cursor

### `cloudinary_list_resources_by_context`

**List Resources by Context.** Lists assets of one resource type whose contextual metadata (free-form key=value pairs such as alt or caption) contains the given key, optionally matching an exact value. For structured metadata fields use Search Assets instead. Pages with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `key` | string | yes |  | Context Key. The contextual metadata key to match (e.g. "alt", "caption"). |
| `value` | string | no |  | Context Value. Only return assets where the key has exactly this value. Leave empty to match any value. |
| `direction` | string | no |  | Sort Direction. Sort by creation time. Defaults to newest first. One of `"desc"`, `"asc"`. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `resources`: Resources
- `resources[].asset_id`: Asset ID
- `resources[].public_id`: Public ID
- `resources[].format`: Format
- `resources[].version`: Version (number)
- `resources[].resource_type`: Resource Type
- `resources[].type`: Type
- `resources[].created_at`: Created At (datetime)
- `resources[].bytes`: Bytes (number)
- `resources[].width`: Width (number)
- `resources[].height`: Height (number)
- `resources[].asset_folder`: Asset Folder
- `resources[].display_name`: Display Name
- `resources[].url`: URL (image)
- `resources[].secure_url`: Secure URL (image)
- `resources[].context`: Context
- `resources[].context.custom`: Custom (an object whose keys vary)
- `resources[].last_updated`: Last Updated
- `count`: Count (number)
- `total_count`: Total Count
- `next_cursor`: Next Cursor

### `cloudinary_list_resources_by_external_ids`

**List Resources by External IDs.** Fetches up to 100 assets by external ID, the caller-assigned identifier set on an asset (for example by a DAM or PIM sync). Use when the caller only knows its own IDs, not Cloudinary public IDs or asset IDs. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_ids` | array | yes |  | External IDs. Up to 100 external IDs. |
| `resource_type` | string | no |  | Resource Type. The asset type. Leave empty to include all types. One of `"image"`, `"video"`, `"raw"`. |
| `include_tags` | boolean | no | `false` | Include Tags. Include each asset's tags. |
| `include_context` | boolean | no | `false` | Include Context. Include each asset's contextual metadata. |
| `include_metadata` | boolean | no | `false` | Include Structured Metadata. Include each asset's structured metadata values. |

Output fields:

- `resources`: Resources
- `resources[].asset_id`: Asset ID
- `resources[].public_id`: Public ID
- `resources[].format`: Format
- `resources[].version`: Version (number)
- `resources[].resource_type`: Resource Type
- `resources[].type`: Type
- `resources[].created_at`: Created At (datetime)
- `resources[].bytes`: Bytes (number)
- `resources[].width`: Width (number)
- `resources[].height`: Height (number)
- `resources[].asset_folder`: Asset Folder
- `resources[].display_name`: Display Name
- `resources[].url`: URL (image)
- `resources[].secure_url`: Secure URL (image)
- `resources[].context`: Context
- `resources[].context.custom`: Custom (an object whose keys vary)
- `resources[].last_updated`: Last Updated
- `count`: Count (number)
- `total_count`: Total Count
- `next_cursor`: Next Cursor

### `cloudinary_list_resources_by_tag`

**List Resources by Tag.** Lists assets of one resource type that carry an exact tag. Use when you know the tag; List Tags returns the available tag names. Pages with next_cursor (max 500 per page). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `tag` | string | yes |  | Tag. The exact tag to match. Use List Tags to find existing tags. |
| `direction` | string | no |  | Sort Direction. Sort by creation time. Defaults to newest first. One of `"desc"`, `"asc"`. |
| `include_tags` | boolean | no | `false` | Include Tags. Include each asset's tags. |
| `include_context` | boolean | no | `false` | Include Context. Include each asset's contextual metadata. |
| `include_metadata` | boolean | no | `false` | Include Structured Metadata. Include each asset's structured metadata values. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `resources`: Resources
- `resources[].asset_id`: Asset ID
- `resources[].public_id`: Public ID
- `resources[].format`: Format
- `resources[].version`: Version (number)
- `resources[].resource_type`: Resource Type
- `resources[].type`: Type
- `resources[].created_at`: Created At (datetime)
- `resources[].bytes`: Bytes (number)
- `resources[].width`: Width (number)
- `resources[].height`: Height (number)
- `resources[].asset_folder`: Asset Folder
- `resources[].display_name`: Display Name
- `resources[].url`: URL (image)
- `resources[].secure_url`: Secure URL (image)
- `resources[].tags`: Tags
- `count`: Count (number)
- `total_count`: Total Count
- `next_cursor`: Next Cursor

### `cloudinary_list_resources_in_moderation`

**List Resources in Moderation.** Lists assets of one resource type that are in a moderation queue with a given status, for example manual moderation pending review. Add-on moderation kinds (webpurify, aws_rek, perception_point, etc.) only return results when that add-on is enabled. Pages with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `moderation_kind` | string | yes | `"manual"` | Moderation Kind. The moderation type. One of `"manual"`, `"webpurify"`, `"aws_rek"`, `"aws_rek_video"`, `"perception_point"`, `"google_video_moderation"`, `"duplicate"`. |
| `moderation_status` | string | yes | `"pending"` | Moderation Status. The moderation status to match. One of `"pending"`, `"approved"`, `"rejected"`, `"queued"`, `"aborted"`. |
| `direction` | string | no |  | Sort Direction. Sort by creation time. Defaults to newest first. One of `"desc"`, `"asc"`. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `resources`: Resources
- `count`: Count (number)
- `total_count`: Total Count
- `next_cursor`: Next Cursor

### `cloudinary_list_resources`

**List Resources.** Lists assets of one resource type (image, video or raw) and delivery type, newest first, optionally narrowed by a public ID prefix or start date. Use for browsing; prefer Search Assets for filtering by tags, format, size or other attributes. Pages with next_cursor (max 500 per page). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `prefix` | string | no |  | Public ID Prefix. Only return assets whose public ID starts with this value (e.g. "products/"). |
| `start_at` | string | no |  | Start At. Only return assets created after this ISO 8601 date-time. Cannot be combined with Next Cursor. |
| `direction` | string | no |  | Sort Direction. Sort by creation time. Defaults to newest first. One of `"desc"`, `"asc"`. |
| `include_tags` | boolean | no | `false` | Include Tags. Include each asset's tags. |
| `include_context` | boolean | no | `false` | Include Context. Include each asset's contextual metadata. |
| `include_metadata` | boolean | no | `false` | Include Structured Metadata. Include each asset's structured metadata values. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `resources`: Resources
- `resources[].asset_id`: Asset ID
- `resources[].public_id`: Public ID
- `resources[].format`: Format
- `resources[].version`: Version (number)
- `resources[].resource_type`: Resource Type
- `resources[].type`: Type
- `resources[].created_at`: Created At (datetime)
- `resources[].bytes`: Bytes (number)
- `resources[].width`: Width (number)
- `resources[].height`: Height (number)
- `resources[].asset_folder`: Asset Folder
- `resources[].display_name`: Display Name
- `resources[].url`: URL (image)
- `resources[].secure_url`: Secure URL (image)
- `resources[].tags`: Tags
- `count`: Count (number)
- `total_count`: Total Count
- `next_cursor`: Next Cursor

### `cloudinary_list_root_folders`

**List Root Folders.** Lists the top-level folders (name, path, external_id). Use List Subfolders to go deeper, or Search Folders to find folders by name or path anywhere. Pages with next_cursor (max 500). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `folders`: Folders
- `folders[].name`: Name
- `folders[].path`: Path
- `folders[].external_id`: External ID
- `count`: Count (number)
- `total_count`: Total Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_list_subfolders`

**List Subfolders.** Lists the direct subfolders of a folder path (name, path, external_id). Root folders come from List Root Folders. Fails with Not found if the folder does not exist. Pages with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes |  | Folder Path. Full folder path (e.g. "marketing/banners"). |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `folders`: Folders
- `folders[].name`: Name
- `folders[].path`: Path
- `folders[].external_id`: External ID
- `count`: Count (number)
- `total_count`: Total Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_list_tags`

**List Tags.** Lists the tag names in use on assets of one resource type, optionally only those starting with a prefix. Use to discover tags before List Resources by Tag or Delete Resources by Tag. Pages with next_cursor (max 500). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `prefix` | string | no |  | Prefix. Only return tags starting with this value. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `tags`: Tags
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_list_transformations`

**List Transformations.** Lists transformations (name, named flag, used flag, allowed_for_strict) generated or defined in the account. Set Named Only to list reusable named transformations, which deliver as t_<name> in URLs. Pages with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `named` | string | no |  | Named Only. Yes for named transformations only, No for unnamed only. Leave empty to keep the default. One of `"true"`, `"false"`. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `transformations`: Transformations
- `transformations[].name`: Name
- `transformations[].allowed_for_strict`: Allowed For Strict (boolean)
- `transformations[].used`: Used (boolean)
- `transformations[].named`: Named (boolean)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_list_upload_presets`

**List Upload Presets.** Lists upload presets (name, unsigned flag and settings). Pass a preset name to Upload Asset to apply its folder, tags, transformations and other upload settings. Pages with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `presets`: Presets
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_order_metadata_datasource`

**Sort Metadata Field Values.** Sorts the allowed values of an enum or set metadata field alphabetically by value, ascending or descending. Returns the reordered values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |
| `direction` | string | yes | `"asc"` | Direction. Sort direction. One of `"asc"`, `"desc"`. |

Output fields:

- `values`: Values
- `values[].external_id`: External ID
- `values[].value`: Value

### `cloudinary_rename_folder`

**Rename Folder.** Renames or moves a folder and everything in it to a new path (dynamic folder mode). Public IDs and delivery URLs of the assets do not change. Not idempotent: a second call fails because the source path no longer exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes |  | Folder Path. Full folder path (e.g. "marketing/banners"). |
| `to_folder` | string | yes |  | New Folder Path. The new full path (e.g. "marketing/archive/banners"). |

Output fields:

- `from`: From
- `from.name`: Name
- `from.path`: Path
- `to`: To
- `to.name`: Name
- `to.path`: Path

### `cloudinary_rename_resource`

**Rename Resource.** Renames an asset by changing its public ID (which also changes its delivery URL), and can move it between upload, private and authenticated delivery types. Fails if the target public ID exists unless Overwrite is set. The asset_id stays the same. Not idempotent: a second call fails because the source ID no longer exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `from_public_id` | string | yes |  | Current Public ID. The asset's current public ID. |
| `to_public_id` | string | yes |  | New Public ID. The new public ID. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `to_type` | string | no |  | New Delivery Type. Move the asset to this delivery type. Leave empty to keep it. One of `"upload"`, `"private"`, `"authenticated"`. |
| `overwrite` | boolean | no | `false` | Overwrite. Replace an existing asset that already has the new public ID. |
| `invalidate` | boolean | no | `false` | Invalidate CDN Cache. Also invalidate cached copies on the CDN (takes a few minutes to propagate). |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `version`: Version (number)
- `version_id`: Version ID
- `signature`: Signature
- `width`: Width (number)
- `height`: Height (number)
- `format`: Format
- `resource_type`: Resource Type
- `created_at`: Created At (datetime)
- `tags`: Tags
- `bytes`: Bytes (number)
- `type`: Type
- `placeholder`: Placeholder (boolean)
- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `asset_folder`: Asset Folder
- `display_name`: Display Name

### `cloudinary_reorder_metadata_field`

**Move Metadata Field.** Moves one metadata field to a 1-based position in the field order shown in the Media Library. To sort all fields at once use Sort Metadata Fields. Returns the full ordered list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |
| `position` | number | yes |  | Position. New 1-based position. |

Output fields:

- `metadata_fields`: Metadata Fields
- `metadata_fields[].type`: Type
- `metadata_fields[].external_id`: External ID
- `metadata_fields[].label`: Label
- `metadata_fields[].mandatory`: Mandatory (boolean)
- `metadata_fields[].default_value`: Default Value
- `metadata_fields[].validation`: Validation
- `metadata_fields[].default_disabled`: Default Disabled (boolean)
- `metadata_fields[].restrictions`: Restrictions
- `metadata_fields[].restrictions.readonly_ui`: Readonly Ui (boolean)
- `metadata_fields[].restrictions.hidden_ui`: Hidden Ui (boolean)
- `metadata_fields[].restrictions.excluded_from_search`: Excluded From Search (boolean)
- `metadata_fields[].group`: Group
- `metadata_fields[].datasource`: Datasource
- `metadata_fields[].datasource.values`: Values
- `metadata_fields[].datasource.values[].external_id`: External ID
- `metadata_fields[].datasource.values[].value`: Value
- `metadata_fields[].datasource.values[].state`: State
- `metadata_fields[].lazy_datasource_update`: Lazy Datasource Update (boolean)
- `metadata_fields[].allow_dynamic_list_values`: Allow Dynamic List Values (boolean)
- `metadata_fields[].alphabetically_sorted`: Alphabetically Sorted (boolean)

### `cloudinary_reorder_metadata_fields`

**Sort Metadata Fields.** Sorts the whole metadata field list by label, created_at or external_id. Returns the ordered list. To move a single field use Move Metadata Field. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order_by` | string | yes | `"label"` | Order By. Sort key. One of `"label"`, `"created_at"`, `"external_id"`. |
| `direction` | string | no |  | Direction. Defaults to ascending. One of `"asc"`, `"desc"`. |

Output fields:

- `metadata_fields`: Metadata Fields
- `metadata_fields[].type`: Type
- `metadata_fields[].external_id`: External ID
- `metadata_fields[].label`: Label
- `metadata_fields[].mandatory`: Mandatory (boolean)
- `metadata_fields[].default_value`: Default Value
- `metadata_fields[].validation`: Validation
- `metadata_fields[].default_disabled`: Default Disabled (boolean)
- `metadata_fields[].restrictions`: Restrictions
- `metadata_fields[].restrictions.readonly_ui`: Readonly Ui (boolean)
- `metadata_fields[].restrictions.hidden_ui`: Hidden Ui (boolean)
- `metadata_fields[].restrictions.excluded_from_search`: Excluded From Search (boolean)
- `metadata_fields[].group`: Group
- `metadata_fields[].datasource`: Datasource
- `metadata_fields[].datasource.values`: Values
- `metadata_fields[].datasource.values[].external_id`: External ID
- `metadata_fields[].datasource.values[].value`: Value
- `metadata_fields[].datasource.values[].state`: State
- `metadata_fields[].lazy_datasource_update`: Lazy Datasource Update (boolean)
- `metadata_fields[].allow_dynamic_list_values`: Allow Dynamic List Values (boolean)
- `metadata_fields[].alphabetically_sorted`: Alphabetically Sorted (boolean)

### `cloudinary_restore_metadata_datasource_entries`

**Restore Metadata Datasource Values.** Restores allowed values of an enum or set metadata field that were removed with Delete Metadata Datasource Values, by value external_id. Returns the active values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |
| `value_external_ids` | array | yes |  | Value External IDs. external_ids of the datasource values, from Get Metadata Field. |

Output fields:

- `values`: Values
- `values[].external_id`: External ID
- `values[].value`: Value

### `cloudinary_search_all_metadata_datasources`

**Search All Metadata Values.** Searches allowed values across all enum and set metadata fields, returning field_id, value id and value for each match. Use when you know a value (e.g. a color) but not which field holds it. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Search Term. Text to match in the values. |
| `max_results` | number | no |  | Max Results. Maximum values to return. |

Output fields:

- `values`: Values
- `values[].field_id`: Field ID
- `values[].id`: ID
- `values[].value`: Value
- `count`: Count (number)

### `cloudinary_search_assets`

**Search Assets.** Searches all assets with a Lucene-like expression, e.g. `resource_type:image AND tags:sale AND uploaded_at>1d`, `folder:products/*`, `format:png AND bytes>1mb`, or `metadata.sku=123`. Use this for any attribute filter; simple browsing by type or tag can use List Resources or List Resources by Tag. Newly uploaded assets can take a few seconds to become searchable. Pages with next_cursor (max 500). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `expression` | string | no |  | Expression. Search expression (e.g. "resource_type:image AND tags:sale"). Leave empty to match all assets. |
| `sort_by` | string | no |  | Sort By Field. Field to sort by (e.g. "created_at", "public_id", "bytes"). Defaults to relevance, then created_at. |
| `sort_direction` | string | no |  | Sort Direction. Sort by creation time. Defaults to newest first. One of `"desc"`, `"asc"`. |
| `with_field` | array | no |  | Include Fields. Extra data to return for each asset. One of `"tags"`, `"context"`, `"metadata"`, `"image_metadata"`, `"image_analysis"`, `"quality_analysis"`, `"accessibility_analysis"`. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `resources`: Resources
- `resources[].asset_id`: Asset ID
- `resources[].public_id`: Public ID
- `resources[].asset_folder`: Asset Folder
- `resources[].filename`: Filename
- `resources[].display_name`: Display Name
- `resources[].format`: Format
- `resources[].version`: Version (number)
- `resources[].resource_type`: Resource Type
- `resources[].type`: Type
- `resources[].created_at`: Created At (datetime)
- `resources[].uploaded_at`: Uploaded At (datetime)
- `resources[].bytes`: Bytes (number)
- `resources[].backup_bytes`: Backup Bytes (number)
- `resources[].width`: Width (number)
- `resources[].height`: Height (number)
- `resources[].aspect_ratio`: Aspect Ratio (number)
- `resources[].pixels`: Pixels (number)
- `resources[].tags`: Tags
- `resources[].url`: URL (image)
- `resources[].secure_url`: Secure URL (image)
- `resources[].status`: Status
- `resources[].access_mode`: Access Mode
- `resources[].access_control`: Access Control
- `resources[].etag`: Etag
- `resources[].created_by`: Created By
- `resources[].created_by.access_key`: Access Key
- `resources[].uploaded_by`: Uploaded By
- `resources[].uploaded_by.access_key`: Access Key
- `count`: Count (number)
- `total_count`: Total Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_search_folders`

**Search Folders.** Finds folders anywhere in the tree with an expression on name, path, id or created_at, e.g. `name:banners`, `path:marketing/*`, `created_at>1w`. Returns name, path, external_id and created_at for each. Pages with next_cursor (max 500). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `expression` | string | no |  | Expression. Search expression (e.g. "name:banners"). Leave empty to list all folders. |
| `sort_by` | string | no |  | Sort By Field. Field to sort by (e.g. "name", "created_at"). |
| `sort_direction` | string | no |  | Sort Direction. Sort by creation time. Defaults to newest first. One of `"desc"`, `"asc"`. |
| `max_results` | number | no |  | Max Results. Maximum number of items to return (1-500). Defaults to 10. |
| `next_cursor` | string | no |  | Next Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `folders`: Folders
- `folders[].name`: Name
- `folders[].path`: Path
- `folders[].created_at`: Created At (datetime)
- `folders[].external_id`: External ID
- `count`: Count (number)
- `total_count`: Total Count (number)
- `next_cursor`: Next Cursor

### `cloudinary_search_metadata_field_datasource`

**Search Metadata Field Values.** Searches the allowed values of one enum or set metadata field by text, returning matching values with their external_ids (needed to set the field on assets). To search across every field use Search All Metadata Values. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |
| `term` | string | yes |  | Search Term. Text to match in the values. |
| `exact_match` | boolean | no | `false` | Exact Match. Only return values equal to the term. |
| `max_results` | number | no |  | Max Results. Maximum values to return. |

Output fields:

- `values`: Values
- `values[].external_id`: External ID
- `values[].value`: Value

### `cloudinary_update_metadata_field_datasource`

**Update Metadata Field Datasource.** Upserts allowed values of an enum or set metadata field: a value with an existing external_id is renamed, a value with a new external_id is added; an empty external_id defaults to the value itself, so repeating the call does not create duplicates. Existing values not listed are kept. Returns the full value list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |
| `values` | array | yes |  | Values. Values to add or update. Each item: { `value`, `external_id`? }. |

Output fields:

- `values`: Values
- `values[].external_id`: External ID
- `values[].value`: Value

### `cloudinary_update_metadata_field`

**Update Metadata Field.** Updates the label, mandatory flag, default value or disabled-default flag of a metadata field; omitted settings stay unchanged. The field type cannot change. To change allowed values use Update Metadata Field Datasource. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `external_id` | string | yes |  | Field External ID. The metadata field external_id, from List Metadata Fields. |
| `label` | string | no |  | Label. New display label. |
| `mandatory` | string | no |  | Mandatory. Whether every asset must have a value. Leave empty to keep the default. One of `"true"`, `"false"`. |
| `default_value` | string | no |  | Default Value. New default value. |
| `default_disabled` | string | no |  | Default Disabled. Stop applying the default value to new assets. Leave empty to keep the default. One of `"true"`, `"false"`. |

Output fields:

- `type`: Type
- `external_id`: External ID
- `label`: Label
- `mandatory`: Mandatory (boolean)
- `default_value`: Default Value
- `validation`: Validation
- `default_disabled`: Default Disabled (boolean)
- `restrictions`: Restrictions
- `restrictions.readonly_ui`: Readonly Ui (boolean)
- `restrictions.hidden_ui`: Hidden Ui (boolean)
- `restrictions.excluded_from_search`: Excluded From Search (boolean)
- `group`: Group
- `datasource`: Datasource
- `datasource.values`: Values
- `datasource.values[].external_id`: External ID
- `datasource.values[].value`: Value
- `datasource.values[].state`: State
- `lazy_datasource_update`: Lazy Datasource Update (boolean)
- `allow_dynamic_list_values`: Allow Dynamic List Values (boolean)
- `alphabetically_sorted`: Alphabetically Sorted (boolean)

### `cloudinary_update_resource_by_asset_id`

**Update Resource by Asset ID.** Same as Update Resource but targets the asset by its immutable asset_id; omitted fields stay unchanged. Tags and Context replace the existing values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asset_id` | string | yes |  | Asset ID. The asset's immutable asset_id. |
| `display_name` | string | no |  | Display Name. New display name. |
| `asset_folder` | string | no |  | Asset Folder. Move the asset to this folder (dynamic folder mode). |
| `tags` | array | no |  | Tags. Replaces ALL existing tags with this list. To add or remove single tags use Update Resource Tags. |
| `context` | string | no |  | Context. Replaces contextual metadata, as pipe-separated key=value pairs (e.g. "alt=Red shoe\|caption=Summer"). |
| `metadata` | object | no |  | Structured Metadata. Structured metadata values keyed by field external_id. Only the given fields change. |
| `moderation_status` | string | no |  | Moderation Status. Approve or reject an asset in manual moderation. One of `"approved"`, `"rejected"`. |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `format`: Format
- `version`: Version (number)
- `resource_type`: Resource Type
- `type`: Type
- `created_at`: Created At (datetime)
- `bytes`: Bytes (number)
- `width`: Width (number)
- `height`: Height (number)
- `asset_folder`: Asset Folder
- `display_name`: Display Name
- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `context`: Context
- `context.custom`: Custom (an object whose keys vary)
- `last_updated`: Last Updated
- `tags`: Tags

### `cloudinary_update_resource_context`

**Update Resource Context.** Adds or updates contextual metadata keys (free-form key=value pairs such as alt or caption) on up to 1000 assets, or removes all context from them. Existing keys not mentioned stay. For typed structured metadata fields use Update Resource Metadata. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_ids` | array | yes |  | Public IDs. Public IDs of the assets to update (up to 1000). |
| `command` | string | yes | `"add"` | Command. Add/update keys, or remove all context. One of `"add"`, `"remove_all"`. |
| `context` | string | no |  | Context. Pipe-separated key=value pairs (e.g. "alt=Red shoe\|caption=Summer"). Required for Add. |

Output fields:

- `public_ids`: Public IDs

### `cloudinary_update_resource_metadata`

**Update Resource Metadata.** Sets structured metadata values on up to 100 assets, keyed by metadata field external_id (List Metadata Fields returns them). Enum and set fields take datasource value external_ids, set fields an array of them. Fields not given are unchanged; an empty string clears a field. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_ids` | array | yes |  | Public IDs. Public IDs of the assets to update (up to 100). |
| `metadata` | object | yes |  | Metadata. Field external_id to value, e.g. {"sku": "A-100", "color": ["red_id"]}. |
| `clear_invalid` | boolean | no | `false` | Clear Invalid Values. Drop existing values that no longer pass field validation instead of failing. |

Output fields:

- `public_ids`: Public IDs

### `cloudinary_update_resource_tags`

**Update Resource Tags.** Changes tags on many assets of one resource type in one call: add tags, remove tags, replace all tags with the given ones, or remove all tags. Public IDs times tags must not exceed 1000. Returns the public_ids that were updated. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_ids` | array | yes |  | Public IDs. Public IDs of the assets to update (up to 1000). |
| `command` | string | yes | `"add"` | Command. What to do with the tags. One of `"add"`, `"remove"`, `"replace"`, `"remove_all"`. |
| `tags` | array | no |  | Tags. Tags to add, remove or set. Not used with Remove all tags. |

Output fields:

- `public_ids`: Public IDs

### `cloudinary_update_resource`

**Update Resource.** Updates attributes of one asset identified by resource type, delivery type and public ID; omitted fields stay unchanged. Tags and Context replace the existing values, so use Update Resource Tags / Update Resource Context to add or remove single entries. To change the public ID itself use Rename Resource; with only an asset_id use Update Resource by Asset ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resource_type` | string | yes | `"image"` | Resource Type. The asset type. One of `"image"`, `"video"`, `"raw"`. |
| `type` | string | no | `"upload"` | Delivery Type. The storage/delivery type of the asset. Defaults to upload. One of `"upload"`, `"private"`, `"authenticated"`, `"fetch"`. |
| `public_id` | string | yes |  | Public ID. The asset's public ID. |
| `display_name` | string | no |  | Display Name. New display name. |
| `asset_folder` | string | no |  | Asset Folder. Move the asset to this folder (dynamic folder mode). |
| `tags` | array | no |  | Tags. Replaces ALL existing tags with this list. To add or remove single tags use Update Resource Tags. |
| `context` | string | no |  | Context. Replaces contextual metadata, as pipe-separated key=value pairs (e.g. "alt=Red shoe\|caption=Summer"). |
| `metadata` | object | no |  | Structured Metadata. Structured metadata values keyed by field external_id. Only the given fields change. |
| `moderation_status` | string | no |  | Moderation Status. Approve or reject an asset in manual moderation. One of `"approved"`, `"rejected"`. |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `format`: Format
- `version`: Version (number)
- `resource_type`: Resource Type
- `type`: Type
- `created_at`: Created At (datetime)
- `bytes`: Bytes (number)
- `width`: Width (number)
- `height`: Height (number)
- `asset_folder`: Asset Folder
- `display_name`: Display Name
- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `context`: Context
- `context.custom`: Custom (an object whose keys vary)
- `last_updated`: Last Updated
- `tags`: Tags

### `cloudinary_update_transformation`

**Update Named Transformation.** Replaces the definition of an existing named transformation and/or its allowed-for-strict flag; omitted settings stay unchanged. Already-generated derived assets keep the old result until invalidated. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Transformation Name. Named transformation name, without the t_ prefix. |
| `transformation` | string | no |  | New Transformation. New transformation string. |
| `allowed_for_strict` | string | no |  | Allowed for Strict Mode. Allow this transformation when strict transformations are enabled. Leave empty to keep the default. One of `"true"`, `"false"`. |

Output fields:

- `message`: Message

### `cloudinary_upload_asset`

**Upload Asset.** Uploads one file from a remote URL (http/https/s3/gs) or a base64 data URI, with resource type auto-detected by default. Optionally sets the public ID, asset folder, tags, contextual metadata, display name or an upload preset. Returns the new asset_id, public_id and delivery URLs. Not idempotent: each call creates a new asset unless a fixed Public ID is given with Overwrite. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | string | yes |  | File URL or Data URI. A publicly reachable URL of the file, or a data URI (data:image/png;base64,...). |
| `resource_type` | string | no | `"auto"` | Resource Type. Asset type. Defaults to auto-detect. One of `"auto"`, `"image"`, `"video"`, `"raw"`. |
| `public_id` | string | no |  | Public ID. Public ID to assign (without extension). Leave empty for a random ID. |
| `asset_folder` | string | no |  | Asset Folder. Folder to place the asset in (e.g. "marketing/banners"). |
| `display_name` | string | no |  | Display Name. Human-readable name shown in the Media Library. |
| `tags` | array | no |  | Tags. Tags to add to the asset. |
| `context` | string | no |  | Context. Contextual metadata as pipe-separated key=value pairs (e.g. "alt=Red shoe\|caption=Summer"). |
| `upload_preset` | string | no |  | Upload Preset. Name of an upload preset to apply. List Upload Presets returns the names. |
| `overwrite` | string | no |  | Overwrite. Replace an existing asset with the same Public ID. Leave empty to keep the default. One of `"true"`, `"false"`. |
| `use_filename` | boolean | no | `false` | Use Original Filename. Use the source file name as the public ID (when Public ID is empty). |

Output fields:

- `asset_id`: Asset ID
- `public_id`: Public ID
- `version`: Version (number)
- `version_id`: Version ID
- `signature`: Signature
- `width`: Width (number)
- `height`: Height (number)
- `format`: Format
- `resource_type`: Resource Type
- `created_at`: Created At (datetime)
- `tags`: Tags
- `bytes`: Bytes (number)
- `type`: Type
- `etag`: Etag
- `placeholder`: Placeholder (boolean)
- `url`: URL (image)
- `secure_url`: Secure URL (image)
- `asset_folder`: Asset Folder
- `display_name`: Display Name
- `context`: Context
- `context.custom`: Custom (an object whose keys vary)
- `pages`: Pages (number)
- `playback_url`: Playback URL (url)
- `audio`: Audio
- `audio.codec`: Codec
- `audio.bit_rate`: Bit Rate
- `audio.frequency`: Frequency (number)
- `audio.channels`: Channels (number)
- `audio.channel_layout`: Channel Layout
- `video`: Video
- `video.pix_format`: Pix Format
- `video.codec`: Codec
- `video.level`: Level (number)
- `video.profile`: Profile
- `video.bit_rate`: Bit Rate
- `video.dar`: Dar
- `video.time_base`: Time Base
- `is_audio`: Is Audio (boolean)
- `frame_rate`: Frame Rate (number)
- `bit_rate`: Bit Rate (number)
- `duration`: Duration (number)
- `rotation`: Rotation (number)
- `nb_frames`: Nb Frames (number)
- `original_filename`: Original Filename

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
