# Total CMS

Flat-file content management system for websites, with collections, blogs, images and files.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-totalcms'
  version: '1.0.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Total CMS Connection

> Connect a Total CMS 3 site.
>
> 1. Sign in to your Total CMS admin.
> 2. Go to **Utilities → API Keys** (or open `/admin/utils/api-keys`).
> 3. Click **Create New API Key**, give it a name, choose the HTTP methods and endpoints Activepieces may use (all endpoints is simplest), and copy the key. It is shown only once.
> 4. Paste your site address and the key below.
>
> API keys need the Pro edition of Total CMS (local development domains such as localhost include it).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Site URL. The address of your Total CMS site, e.g. https://www.example.com. |
| `apiKey` | string | yes |  | API Key. A Total CMS API key, starting with tcms_. |

## Actions

### `list_collections`

**List Collections.** Lists every Total CMS collection on the site with its ID, schema (blog, text, image and so on) and object count. Call it first to find the collection ID other actions need. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `collections`: Collections
- `collections[].id`: Collection ID
- `collections[].name`: Name
- `collections[].schema`: Schema
- `collections[].description`: Description
- `collections[].object_count`: Objects (number)
- `collections[].label_singular`: Singular Label
- `collections[].label_plural`: Plural Label
- `collections[].singleton`: Single Object (boolean)
- `collections[].last_updated`: Last Updated (datetime)
- `count`: Count (number)

### `get_collection_schema`

**Get Collection Fields.** Returns the field list of a Total CMS collection (name, label, field type, data type, required, and whether Find Objects returns it). Call it before Create Object or Update Object to learn which field names to send. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `collection`: Collection
- `schema`: Schema ID
- `description`: Description
- `fields`: Fields
- `fields[].key`: Field Name
- `fields[].label`: Label
- `fields[].field_type`: Field Type
- `fields[].data_type`: Data Type
- `fields[].required`: Required (boolean)
- `fields[].in_index`: Returned by Find Objects (boolean)
- `fields[].help`: Help Text

### `find_objects`

**Find Objects.** Searches a Total CMS collection by full-text search, include/exclude filters (e.g. draft:false, price:lte:100) and sort (e.g. -created), returning up to 100 objects per call with total, has_more and next_offset for paging. Returns index fields only; use Get Object for long fields such as blog content. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Search. Words to search for in any field. Use "quotes" for an exact phrase and "or" between words to match any. |
| `include` | string | no |  | Only Include. Keep only objects matching ALL of these filters, separated by commas. Examples: draft:false, featured, category:in:news\|events, price:lte:100. |
| `exclude` | string | no |  | Exclude. Drop objects matching ANY of these filters, separated by commas. Example: draft:true. |
| `sort` | string | no |  | Sort By. A field name to sort by. Put - in front for newest or largest first, for example -created or -date. |
| `limit` | number | no | `20` | Limit. How many objects to return (1-100). |
| `offset` | number | no | `0` | Offset. How many matching objects to skip. Use Next Offset from a previous run to get the next page. |

Output fields:

- `objects`: Objects
- `count`: Returned (number)
- `total`: Total Matches (number)
- `offset`: Offset (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)

### `get_content`

**Get Object.** Reads one Total CMS object with all its fields, given the collection and the object ID. Use it to fetch full content (Find Objects only returns index fields). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Object. The object to use. The list shows each object by title and ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)

### `get_object_by_id`

**Get Object (by ID).** Reads one Total CMS object with all its fields, given the collection ID (from List Collections) and object ID (from Find Objects (by Collection ID)). Use it to fetch long fields such as blog content, which Find Objects leaves out. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection ID. The collection ID, for example blog. Get it from List Collections. |
| `object_id` | string | yes |  | Object ID. The object ID (its URL slug). Get it from Find Objects (by Collection ID). |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)

### `create_object`

**Create Object.** Creates a new object in a Total CMS collection from a JSON object of field values (get the field names from Get Collection Fields). Fails if the ID already exists; leave the ID empty to let Total CMS make one from the title when the schema allows it. Each call creates a new object. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | no |  | Object ID. The ID (URL slug) for the new object. Leave empty to let Total CMS generate it, when the collection supports that. |
| `fields` | JSON | yes | `{}` | Fields. The field values as JSON, for example {"title": "Hello", "draft": false}. Use Get Collection Fields to see the field names. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)

### `update_object`

**Update Object.** Updates only the given fields of an existing Total CMS object and keeps all other fields as stored. Use Create Object for new objects and Duplicate Object to copy one under a new ID. Sending the same values again changes nothing, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Object. The object to use. The list shows each object by title and ID. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | JSON | yes | `{}` | Fields to Change. Only the fields to change, as JSON, for example {"title": "New title"}. Use Get Collection Fields to see the field names. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)

### `update_object_by_id`

**Update Object (by ID).** Updates only the given fields of an existing Total CMS object, given the collection ID (from List Collections) and object ID (from Find Objects (by Collection ID)); other fields stay as stored. Get field names from Get Collection Fields (by ID). Fails if the object does not exist. Sending the same values again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection ID. The collection ID, for example blog. Get it from List Collections. |
| `object_id` | string | yes |  | Object ID. The object ID (its URL slug). Get it from Find Objects (by Collection ID). |
| `fields` | JSON | yes | `{}` | Fields to Change. Only the fields to change, as JSON, for example {"title": "New title"}. Use Get Collection Fields to see the field names. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)

### `clone_object`

**Duplicate Object.** Copies an existing Total CMS object, with its fields and files, to a new ID in the same collection. Use it to start a new post or page from a template. Fails if the new ID already exists, so a retry does not create a second copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Object. The object to copy. A value the product loads from the provider, such as an id; write the value itself. |
| `new_id` | string | yes |  | New Object ID. The ID (URL slug) for the copy, for example my-post-copy. Must not exist yet. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)

### `delete_object`

**Delete Object.** Permanently deletes one Total CMS object, including its uploaded files. This cannot be undone; a second call fails because the object is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Object. The object to delete. This cannot be undone. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `deleted`: Deleted (boolean)
- `collection`: Collection
- `id`: Object ID

### `upload_file`

**Upload File to Field.** Uploads a file (file or public URL) into an image, gallery, file or depot field of an existing Total CMS object. Image and file fields are replaced; gallery and depot fields get one more entry per call, so retries can add duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Object. The object to use. The list shows each object by title and ID. A value the product loads from the provider, such as an id; write the value itself. |
| `field` | string | yes |  | Field. The image, gallery, file or depot field to upload to. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | no |  | File. The file to upload. Leave empty to use File URL instead. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | File URL. A public link to the file, ending in its file name with extension (for example https://example.com/photo.jpg). Your Total CMS site downloads it. Use either this or File. |
| `folder` | string | no |  | Folder. Depot fields only: an optional folder path, such as 2026/reports. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)
- `field`: Field
- `preview_url`: Preview URL (url)

### `adjust_number`

**Increase or Decrease Number.** Adds to or subtracts from a number field of a Total CMS object in one step, for counters such as views, votes or stock. Use Update Object to set an exact value instead. Every call changes the number again, so retries double count. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection. The Total CMS collection to use. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Object. The object to use. The list shows each object by title and ID. A value the product loads from the provider, such as an id; write the value itself. |
| `field` | string | yes |  | Number Field. The number field to change. A value the product loads from the provider, such as an id; write the value itself. |
| `direction` | string | yes | `"increment"` | Change. One of `"increment"`, `"decrement"`. |
| `amount` | number | yes | `1` | Amount. How much to add or subtract. Must be more than 0. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `field`: Field
- `value`: New Value (number)

### `get_blog_post`

**Get Blog Post.** Reads one blog post (title, content, summary, author, categories, tags, image, gallery, draft and featured flags) from a Total CMS blog collection, given the post ID. Use Find Objects to search posts first. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Blog. The blog collection. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Post. The blog post to get. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `collection`: Collection
- `id`: Post ID
- `title`: Title
- `date`: Date (datetime)
- `author`: Author
- `draft`: Draft (boolean)
- `featured`: Featured (boolean)
- `summary`: Summary (html)
- `content`: Content (html)
- `extra`: Extra Content (html)
- `media`: Media URL (url)
- `categories`: Categories
- `tags`: Tags
- `image`: Image
- `image.name`: File Name
- `image.alt`: Alt Text
- `image.mime`: MIME Type
- `image.size`: Size (filesize)
- `image.width`: Width (number)
- `image.height`: Height (number)
- `image.uploadDate`: Uploaded At (datetime)
- `gallery`: Gallery
- `gallery[].name`: File Name
- `gallery[].alt`: Alt Text
- `gallery[].mime`: MIME Type
- `gallery[].size`: Size (filesize)
- `gallery[].width`: Width (number)
- `gallery[].height`: Height (number)
- `gallery[].uploadDate`: Uploaded At (datetime)
- `created`: Created At (datetime)
- `updated`: Updated At (datetime)

### `save_blog_post`

**Create or Update Blog Post.** Creates a Total CMS blog post, or updates only the fields you pass on an existing post when Post ID matches one. Leave Post ID empty to create a post whose ID is made from the title. Creating twice with an empty Post ID fails on the duplicate ID; updates are safe to repeat. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"blog"` | Collection ID. The ID of a collection that uses the Blog schema. The built-in Blog collection is called blog. Find other IDs with List Collections. |
| `post_id` | string | no |  | Post ID. The post ID (URL slug), for example my-first-post. If a post with this ID exists it is updated, otherwise a new post is created. Leave empty to create a new post with an ID made from the title. |
| `title` | string | no |  | Title. Required when creating a post. |
| `date` | ISO date-time string | no |  | Date. The publication date. Defaults to now for new posts. |
| `author` | string | no |  | Author. |
| `summary` | string | no |  | Summary. HTML is allowed. |
| `content` | string | no |  | Content. The post body. HTML is allowed. |
| `extra` | string | no |  | Extra Content. HTML is allowed. |
| `media` | string | no |  | Media URL. A link to related media, such as a video or podcast episode. |
| `categories` | string | no |  | Categories. Replaces the post categories. Separate them with commas, or map a list. Use a JSON list such as ["News, Events"] when a name contains a comma. Leave empty to keep the current ones. |
| `tags` | string | no |  | Tags. Replaces the post tags. Separate them with commas, or map a list. Use a JSON list such as ["News, Events"] when a name contains a comma. Leave empty to keep the current ones. |
| `draft` | string | no |  | Status. Leave empty to keep the current status (new posts are published). One of `"published"`, `"draft"`. |
| `featured` | string | no |  | Featured. Leave empty to keep the current value. One of `"yes"`, `"no"`. |

Output fields:

- `result`: Result
- `collection`: Collection
- `id`: Post ID
- `title`: Title
- `date`: Date (datetime)
- `author`: Author
- `draft`: Draft (boolean)
- `featured`: Featured (boolean)
- `summary`: Summary (html)
- `content`: Content (html)
- `extra`: Extra Content (html)
- `media`: Media URL (url)
- `categories`: Categories
- `tags`: Tags
- `image`: Image
- `image.name`: File Name
- `image.alt`: Alt Text
- `image.mime`: MIME Type
- `image.size`: Size (filesize)
- `image.width`: Width (number)
- `image.height`: Height (number)
- `image.uploadDate`: Uploaded At (datetime)
- `gallery`: Gallery
- `gallery[].name`: File Name
- `gallery[].alt`: Alt Text
- `gallery[].mime`: MIME Type
- `gallery[].size`: Size (filesize)
- `gallery[].width`: Width (number)
- `gallery[].height`: Height (number)
- `gallery[].uploadDate`: Uploaded At (datetime)
- `created`: Created At (datetime)
- `updated`: Updated At (datetime)

### `save_blog_image`

**Set Blog Post Image.** Uploads the main image (file or public URL) of an existing Total CMS blog post, replacing the current image. Optional alt text is saved with it. Running it again with the same image leaves the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Blog. The blog collection. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Post. The blog post to update. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | no |  | Image. The image to upload. Leave empty to use Image URL instead. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | Image URL. A public link to the image, ending in its file name with extension (for example https://example.com/photo.jpg). Your Total CMS site downloads it. Use either this or Image. |
| `alt` | string | no |  | Alt Text. Describes the image for screen readers and search engines. |

Output fields:

- `collection`: Collection
- `id`: Post ID
- `title`: Title
- `date`: Date (datetime)
- `author`: Author
- `draft`: Draft (boolean)
- `featured`: Featured (boolean)
- `summary`: Summary (html)
- `content`: Content (html)
- `extra`: Extra Content (html)
- `media`: Media URL (url)
- `categories`: Categories
- `tags`: Tags
- `image`: Image
- `image.name`: File Name
- `image.alt`: Alt Text
- `image.mime`: MIME Type
- `image.size`: Size (filesize)
- `image.width`: Width (number)
- `image.height`: Height (number)
- `image.uploadDate`: Uploaded At (datetime)
- `gallery`: Gallery
- `gallery[].name`: File Name
- `gallery[].alt`: Alt Text
- `gallery[].mime`: MIME Type
- `gallery[].size`: Size (filesize)
- `gallery[].width`: Width (number)
- `gallery[].height`: Height (number)
- `gallery[].uploadDate`: Uploaded At (datetime)
- `created`: Created At (datetime)
- `updated`: Updated At (datetime)
- `preview_url`: Preview URL (url)
- `warning`: Warning

### `save_blog_gallery`

**Add Image to Blog Post Gallery.** Adds one image (file or public URL) to the gallery of an existing Total CMS blog post. Optional alt text is saved on the new image. Each call adds another image, so retries add duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Blog. The blog collection. A value the product loads from the provider, such as an id; write the value itself. |
| `object_id` | string | yes |  | Post. The blog post to update. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | no |  | Image. The image to upload. Leave empty to use Image URL instead. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | Image URL. A public link to the image, ending in its file name with extension (for example https://example.com/photo.jpg). Your Total CMS site downloads it. Use either this or Image. |
| `alt` | string | no |  | Alt Text. Describes the image for screen readers and search engines. |

Output fields:

- `collection`: Collection
- `id`: Post ID
- `title`: Title
- `date`: Date (datetime)
- `author`: Author
- `draft`: Draft (boolean)
- `featured`: Featured (boolean)
- `summary`: Summary (html)
- `content`: Content (html)
- `extra`: Extra Content (html)
- `media`: Media URL (url)
- `categories`: Categories
- `tags`: Tags
- `image`: Image
- `image.name`: File Name
- `image.alt`: Alt Text
- `image.mime`: MIME Type
- `image.size`: Size (filesize)
- `image.width`: Width (number)
- `image.height`: Height (number)
- `image.uploadDate`: Uploaded At (datetime)
- `gallery`: Gallery
- `gallery[].name`: File Name
- `gallery[].alt`: Alt Text
- `gallery[].mime`: MIME Type
- `gallery[].size`: Size (filesize)
- `gallery[].width`: Width (number)
- `gallery[].height`: Height (number)
- `gallery[].uploadDate`: Uploaded At (datetime)
- `created`: Created At (datetime)
- `updated`: Updated At (datetime)
- `preview_url`: Preview URL (url)
- `warning`: Warning

### `save_text`

**Save Text.** Sets the text of a Total CMS text object, creating the object if the ID is new and replacing its text otherwise. Use for site snippets such as headlines. Repeating the call with the same values leaves the same result, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"text"` | Collection ID. The ID of a collection that uses the Text schema. The built-in Text collection is called text. Find other IDs with List Collections. |
| `object_id` | string | yes |  | Object ID. The ID of the text object, for example headline. A new ID creates the object. |
| `text` | string | yes |  | Text. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `text`: Text

### `save_toggle`

**Save Toggle.** Sets a Total CMS toggle object on or off, creating the object if the ID is new. Use to switch site features such as a banner. Setting the same state again changes nothing, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"toggle"` | Collection ID. The ID of a collection that uses the Toggle schema. The built-in Toggle collection is called toggle. Find other IDs with List Collections. |
| `object_id` | string | yes |  | Object ID. The ID of the toggle object. A new ID creates the object. |
| `status` | boolean | yes | `true` | On. Checked turns the toggle on, unchecked turns it off. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `status`: On (boolean)

### `save_date`

**Save Date.** Sets the date and time stored in a Total CMS date object, creating the object if the ID is new. Use for countdowns or event dates shown on the site. Takes an ISO 8601 date; repeating the call is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"date"` | Collection ID. The ID of a collection that uses the Date schema. The built-in Date collection is called date. Find other IDs with List Collections. |
| `object_id` | string | yes |  | Object ID. The ID of the date object. A new ID creates the object. |
| `date` | ISO date-time string | yes |  | Date. The date and time to store, for example 2026-12-31T18:00:00Z. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `date`: Date (datetime)

### `save_image`

**Save Image.** Uploads an image (file or public URL) to a Total CMS image object, replacing its current image and creating the object if the ID is new. Optional alt text is saved with it. Running it again with the same image leaves the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"image"` | Collection ID. The ID of a collection that uses the Image schema. The built-in Image collection is called image. Find other IDs with List Collections. |
| `object_id` | string | yes |  | Object ID. The ID of the image object. A new ID creates the object. |
| `file` | file | no |  | Image. The image to upload. Leave empty to use Image URL instead. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | Image URL. A public link to the image, ending in its file name with extension (for example https://example.com/photo.jpg). Your Total CMS site downloads it. Use either this or Image. |
| `alt` | string | no |  | Alt Text. Describes the image for screen readers and search engines. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `image`: Image
- `image.name`: File Name
- `image.alt`: Alt Text
- `image.mime`: MIME Type
- `image.size`: Size (filesize)
- `image.width`: Width (number)
- `image.height`: Height (number)
- `image.uploadDate`: Uploaded At (datetime)
- `preview_url`: Preview URL (url)
- `warning`: Warning

### `save_gallery`

**Add Image to Gallery.** Adds one image (file or public URL) to the end of a Total CMS gallery object, creating the object if the ID is new. Optional alt text is saved on the new image. Each call adds another image, so retries add duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"gallery"` | Collection ID. The ID of a collection that uses the Gallery schema. The built-in Gallery collection is called gallery. Find other IDs with List Collections. |
| `object_id` | string | yes |  | Object ID. The ID of the gallery object. A new ID creates the object. |
| `file` | file | no |  | Image. The image to upload. Leave empty to use Image URL instead. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | Image URL. A public link to the image, ending in its file name with extension (for example https://example.com/photo.jpg). Your Total CMS site downloads it. Use either this or Image. |
| `alt` | string | no |  | Alt Text. Describes the image for screen readers and search engines. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `gallery`: Gallery Images
- `gallery[].name`: File Name
- `gallery[].alt`: Alt Text
- `gallery[].mime`: MIME Type
- `gallery[].size`: Size (filesize)
- `gallery[].width`: Width (number)
- `gallery[].height`: Height (number)
- `gallery[].uploadDate`: Uploaded At (datetime)
- `preview_url`: Preview URL (url)
- `warning`: Warning

### `save_file`

**Save File.** Uploads a file (file or public URL) to a Total CMS file object, replacing its current file and creating the object if the ID is new. Use for downloadable documents. Running it again with the same file leaves the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"file"` | Collection ID. The ID of a collection that uses the File schema. The built-in File collection is called file. Find other IDs with List Collections. |
| `object_id` | string | yes |  | Object ID. The ID of the file object. A new ID creates the object. |
| `file` | file | no |  | File. The file to upload. Leave empty to use File URL instead. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | File URL. A public link to the file, ending in its file name with extension (for example https://example.com/photo.jpg). Your Total CMS site downloads it. Use either this or File. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `file`: File
- `file.name`: File Name
- `file.mime`: MIME Type
- `file.ext`: Extension
- `file.size`: Size (filesize)
- `file.uploadDate`: Uploaded At (datetime)

### `save_depot`

**Add File to Depot.** Adds one file (file or public URL) to a Total CMS depot object, optionally inside a folder, creating the object if the ID is new. Each call adds another file, so retries add duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"depot"` | Collection ID. The ID of a collection that uses the Depot schema. The built-in Depot collection is called depot. Find other IDs with List Collections. |
| `object_id` | string | yes |  | Object ID. The ID of the depot object. A new ID creates the object. |
| `file` | file | no |  | File. The file to upload. Leave empty to use File URL instead. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | File URL. A public link to the file, ending in its file name with extension (for example https://example.com/photo.jpg). Your Total CMS site downloads it. Use either this or File. |
| `folder` | string | no |  | Folder. Optional folder path inside the depot, such as 2026/reports. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `depot`: Depot
- `depot.files`: Files and Folders
- `depot.files[].name`: File Name
- `depot.files[].mime`: MIME Type
- `depot.files[].ext`: Extension
- `depot.files[].size`: Size (filesize)
- `depot.files[].uploadDate`: Uploaded At (datetime)
- `depot.files[].files`: Folder Contents

### `save_video`

**Save Video.** Sets the video link (YouTube, Vimeo, Loom, Wistia, a direct MP4 and others) of a Total CMS video object, creating the object if the ID is new. Total CMS detects the provider and thumbnail. Repeating the call with the same link is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes | `"video"` | Collection ID. The ID of a collection that uses the Video schema. The built-in Video collection is called video. Find other IDs with List Collections. |
| `object_id` | string | yes |  | Object ID. The ID of the video object. A new ID creates the object. |
| `video` | string | yes |  | Video URL. The video page link from YouTube, Vimeo, Loom or similar. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `video`: Video
- `video.url`: Video URL (url)
- `video.provider`: Provider
- `video.videoId`: Provider Video ID
- `video.thumbnail`: Thumbnail (image)
- `video.title`: Title
- `video.aspectRatio`: Aspect Ratio

### `get_collection_fields_by_id`

**Get Collection Fields (by ID).** Returns the field list of a Total CMS collection, given its ID (from List Collections): name, label, field type, data type, required, and whether Find Objects returns it. Call it before Create Object (by ID) or Update Object (by ID) to learn the field names. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection ID. The collection ID, for example blog. Get it from List Collections. |

Output fields:

- `collection`: Collection
- `schema`: Schema ID
- `description`: Description
- `fields`: Fields
- `fields[].key`: Field Name
- `fields[].label`: Label
- `fields[].field_type`: Field Type
- `fields[].data_type`: Data Type
- `fields[].required`: Required (boolean)
- `fields[].in_index`: Returned by Find Objects (boolean)
- `fields[].help`: Help Text

### `find_objects_by_id`

**Find Objects (by Collection ID).** Searches a Total CMS collection, given its ID (from List Collections), by full-text search, include/exclude filters (e.g. draft:false, price:lte:100) and sort (e.g. -created), returning up to 100 objects with total, has_more and next_offset for paging. Returns index fields only; use Get Object (by ID) for long fields such as blog content. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection ID. The collection ID, for example blog. Get it from List Collections. |
| `search` | string | no |  | Search. Words to search for in any field. Use "quotes" for an exact phrase and "or" between words to match any. |
| `include` | string | no |  | Only Include. Keep only objects matching ALL of these filters, separated by commas. Examples: draft:false, featured, category:in:news\|events, price:lte:100. |
| `exclude` | string | no |  | Exclude. Drop objects matching ANY of these filters, separated by commas. Example: draft:true. |
| `sort` | string | no |  | Sort By. A field name to sort by. Put - in front for newest or largest first, for example -created or -date. |
| `limit` | number | no | `20` | Limit. How many objects to return (1-100). |
| `offset` | number | no | `0` | Offset. How many matching objects to skip. Use Next Offset from a previous run to get the next page. |

Output fields:

- `objects`: Objects
- `count`: Returned (number)
- `total`: Total Matches (number)
- `offset`: Offset (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset (number)

### `create_object_by_id`

**Create Object (by Collection ID).** Creates a new object in a Total CMS collection, given its ID (from List Collections), from a JSON object of field values (names from Get Collection Fields (by ID)). Fails if the object ID already exists; leave it empty to let Total CMS make one from the title when the schema allows it. Each call creates a new object. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection ID. The collection ID, for example blog. Get it from List Collections. |
| `object_id` | string | no |  | Object ID. The ID (URL slug) for the new object. Leave empty to let Total CMS generate it, when the collection supports that. |
| `fields` | JSON | yes | `{}` | Fields. The field values as JSON, for example {"title": "Hello", "draft": false}. Use Get Collection Fields to see the field names. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)

### `upload_file_by_id`

**Upload File to Field (by ID).** Uploads a file (public URL or file) into an image, gallery, file or depot field of a Total CMS object, given the collection ID, object ID and field name (from Get Collection Fields (by ID)). Image and file fields are replaced; gallery and depot fields get one more entry per call, so retries can add duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection ID. The collection ID, for example blog. Get it from List Collections. |
| `object_id` | string | yes |  | Object ID. The object ID (its URL slug). Get it from Find Objects (by Collection ID). |
| `field` | string | yes |  | Field Name. The image, gallery, file or depot field name, such as image. |
| `file` | file | no |  | File. The file to upload. Leave empty to use File URL instead. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | File URL. A public link to the file, ending in its file name with extension (for example https://example.com/photo.jpg). Your Total CMS site downloads it. Use either this or File. |
| `folder` | string | no |  | Folder. Depot fields only: an optional folder path, such as 2026/reports. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)
- `field`: Field
- `preview_url`: Preview URL (url)

### `adjust_number_by_id`

**Increase or Decrease Number (by ID).** Adds to or subtracts from a number field of a Total CMS object, given the collection ID, object ID and field name, for counters such as views, votes or stock. Use Update Object (by ID) to set an exact value. Every call changes the number again, so retries double count. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection ID. The collection ID, for example blog. Get it from List Collections. |
| `object_id` | string | yes |  | Object ID. The object ID (its URL slug). Get it from Find Objects (by Collection ID). |
| `field` | string | yes |  | Field Name. The name of the number field, for example views. |
| `direction` | string | yes | `"increment"` | Change. One of `"increment"`, `"decrement"`. |
| `amount` | number | yes | `1` | Amount. How much to add or subtract. Must be more than 0. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `field`: Field
- `value`: New Value (number)

### `clone_object_by_id`

**Duplicate Object (by ID).** Copies a Total CMS object, given the collection ID and object ID, with its fields and files, to a new ID in the same collection. Use it to start new content from a template. Fails if the new ID already exists, so a retry does not create a second copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection` | string | yes |  | Collection ID. The collection ID, for example blog. Get it from List Collections. |
| `object_id` | string | yes |  | Object ID. The object ID (its URL slug). Get it from Find Objects (by Collection ID). |
| `new_id` | string | yes |  | New Object ID. The ID (URL slug) for the copy, for example my-post-copy. Must not exist yet. |

Output fields:

- `collection`: Collection
- `id`: Object ID
- `object`: Fields (an object whose keys vary)

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
