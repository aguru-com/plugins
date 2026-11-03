# WordPress

Open-source website creation software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wordpress'
  version: '0.7.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect with a WordPress **application password**:
>
> 1. In your WordPress admin, open **Users → Profile**.
> 2. Under **Application Passwords**, type a name and click **Add New Application Password**.
> 3. Copy the generated password and paste it below together with your username.
>
> Your site must use HTTPS: the password travels with every request. On WordPress older than 5.6, install the [Basic Auth plugin](https://github.com/WP-API/Basic-Auth) and use your login password instead, still over HTTPS.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The WordPress user the flow acts as. |
| `password` | string | yes |  | Password. Application password, or the login password with the Basic Auth plugin. |
| `website_url` | string | yes |  | Website URL. Address of your WordPress site. |

## Actions

### `create_post`

**Create Post.** Publishes a new blog post on a WordPress site via the REST API, with optional status (draft/publish/etc.), categories, tags, excerpt, featured image, and custom ACF fields. Choose this to add fresh content; for editing an existing post use Update Post. Requires a title and HTML content; not idempotent — each call creates a separate post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `content` | string | yes |  | Content. Body of the post. HTML is allowed. |
| `status` | string | no |  | Status. Publish now, schedule it, or save as a draft. One of `"publish"`, `"future"`, `"draft"`, `"pending"`, `"private"`, `"trash"`. |
| `date` | string | no |  | Publish Date. Publish date and time in the site's timezone. |
| `categories` | array | no |  | Categories. Pick existing categories. Create new ones in WordPress. Values the product loads from the provider, such as ids; write an array of them. |
| `tags` | array | no |  | Tags. Pick existing tags. Create new ones in WordPress. Values the product loads from the provider, such as ids; write an array of them. |
| `featured_media` | string | no |  | Featured Image. Pick an image already in your media library. A value the product loads from the provider, such as an id; write the value itself. |
| `featured_media_file` | file | no |  | Featured Image File. Upload an image or paste its URL. Overrides Featured Image. Files are not supported; an action that needs one fails. |
| `excerpt` | string | no |  | Excerpt. Short summary shown in listings. HTML is allowed. |
| `slug` | string | no |  | Slug. Last part of the URL. |
| `acfFields` | object | no |  | ACF Fields. Field names and values for the Advanced Custom Fields plugin. |
| `comment_status` | boolean | no |  | Allow Comments. On lets readers comment. Off leaves the setting as is. |
| `ping_status` | boolean | no |  | Allow Pingbacks. On accepts pingbacks and trackbacks. Off leaves it as is. |

Output fields:

- `body.id`: Post ID (number)
- `body.title`: Title
- `body.title.rendered`: Rendered (html)
- `body.link`: Link (url)
- `body.slug`: Slug
- `body.status`: Status
- `body.type`: Type
- `body.date`: Published Date (datetime)
- `body.date_gmt`: Published Date (GMT) (datetime)
- `body.modified`: Modified Date (datetime)
- `body.modified_gmt`: Modified Date (GMT) (datetime)
- `body.content`: Content
- `body.content.rendered`: Rendered (html)
- `body.content.protected`: Password Protected (boolean)
- `body.excerpt`: Excerpt
- `body.excerpt.rendered`: Rendered (html)
- `body.excerpt.protected`: Password Protected (boolean)
- `body.guid`: GUID
- `body.guid.rendered`: Rendered (url)
- `body.author`: Author ID (number)
- `body.featured_media`: Featured Media ID (number)
- `body.sticky`: Sticky (boolean)
- `body.format`: Format
- `body.categories`: Category IDs
- `body.tags`: Tag IDs
- `body.comment_status`: Comment Status
- `body.ping_status`: Ping Status

### `create_page`

**Create Page.** Publishes a new static page (not a blog post) on a WordPress site via the REST API, with optional status, slug, excerpt, and comment settings. Choose this for standalone pages like About or Contact rather than dated posts. Requires a title and HTML content; not idempotent — each call creates a separate page. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `content` | string | yes |  | Content. Body of the page. HTML is allowed. |
| `status` | string | no |  | Status. Publish now, schedule it, or save as a draft. One of `"publish"`, `"future"`, `"draft"`, `"pending"`, `"private"`. |
| `date` | string | no |  | Publish Date. Publish date and time in the site's timezone. |
| `slug` | string | no |  | Slug. Last part of the URL. |
| `excerpt` | string | no |  | Excerpt. Short summary shown in listings. HTML is allowed. |
| `comment_status` | boolean | no |  | Allow Comments. On lets readers comment. Off leaves the setting as is. |
| `ping_status` | boolean | no |  | Allow Pingbacks. On accepts pingbacks and trackbacks. Off leaves it as is. |

Output fields:

- `body.id`: Page ID (number)
- `body.title`: Title
- `body.title.rendered`: Rendered (html)
- `body.link`: Link (url)
- `body.slug`: Slug
- `body.status`: Status
- `body.type`: Type
- `body.date`: Published Date (datetime)
- `body.date_gmt`: Published Date (GMT) (datetime)
- `body.modified`: Modified Date (datetime)
- `body.modified_gmt`: Modified Date (GMT) (datetime)
- `body.content`: Content
- `body.content.rendered`: Rendered (html)
- `body.content.protected`: Password Protected (boolean)
- `body.excerpt`: Excerpt
- `body.excerpt.rendered`: Rendered (html)
- `body.excerpt.protected`: Password Protected (boolean)
- `body.guid`: GUID
- `body.guid.rendered`: Rendered (url)
- `body.author`: Author ID (number)
- `body.featured_media`: Featured Media ID (number)
- `body.parent`: Parent Page ID (number)
- `body.menu_order`: Menu Order (number)
- `body.comment_status`: Comment Status
- `body.ping_status`: Ping Status

### `update_post`

**Update Post.** Updates an existing WordPress post identified by its post ID, changing only the fields you supply (title, content, status, categories, tags, excerpt, featured image, or ACF fields). Choose this to edit or republish a known post rather than create a new one. Requires the target post ID; idempotent — repeating with the same input leaves the post in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. New title. Empty keeps the current one. |
| `content` | string | no |  | Content. New body, HTML allowed. Empty keeps the current one. |
| `status` | string | no |  | Status. Publish now, schedule it, or save as a draft. One of `"publish"`, `"future"`, `"draft"`, `"pending"`, `"private"`, `"trash"`. |
| `categories` | array | no |  | Categories. Pick existing categories. Create new ones in WordPress. Values the product loads from the provider, such as ids; write an array of them. |
| `tags` | array | no |  | Tags. Pick existing tags. Create new ones in WordPress. Values the product loads from the provider, such as ids; write an array of them. |
| `featured_media` | string | no |  | Featured Image. Pick an image already in your media library. A value the product loads from the provider, such as an id; write the value itself. |
| `featured_media_file` | file | no |  | Featured Image File. Upload an image or paste its URL. Overrides Featured Image. Files are not supported; an action that needs one fails. |
| `excerpt` | string | no |  | Excerpt. Short summary shown in listings. HTML is allowed. |
| `date` | string | no |  | Publish Date. Publish date and time in the site's timezone. |
| `slug` | string | no |  | Slug. Last part of the URL. |
| `acfFields` | object | no |  | ACF Fields. Field names and values for the Advanced Custom Fields plugin. |
| `comment_status` | boolean | no |  | Allow Comments. On lets readers comment. Off leaves the setting as is. |
| `ping_status` | boolean | no |  | Allow Pingbacks. On accepts pingbacks and trackbacks. Off leaves it as is. |

Output fields:

- `id`: Post ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.protected`: Password Protected (boolean)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `sticky`: Sticky (boolean)
- `format`: Format
- `categories`: Category IDs
- `tags`: Tag IDs
- `comment_status`: Comment Status
- `ping_status`: Ping Status

### `get_post`

**Get Post Details.** Fetches a single WordPress post by its numeric post ID via the REST API. Use it to read the current content, status, or metadata of a known post before acting on it. Requires the post ID; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | yes |  | Post ID. Number after post= in the post's edit URL. |

Output fields:

- `body.id`: Post ID (number)
- `body.title`: Title
- `body.title.rendered`: Rendered (html)
- `body.link`: Link (url)
- `body.slug`: Slug
- `body.status`: Status
- `body.type`: Type
- `body.date`: Published Date (datetime)
- `body.date_gmt`: Published Date (GMT) (datetime)
- `body.modified`: Modified Date (datetime)
- `body.modified_gmt`: Modified Date (GMT) (datetime)
- `body.content`: Content
- `body.content.rendered`: Rendered (html)
- `body.content.protected`: Password Protected (boolean)
- `body.excerpt`: Excerpt
- `body.excerpt.rendered`: Rendered (html)
- `body.excerpt.protected`: Password Protected (boolean)
- `body.guid`: GUID
- `body.guid.rendered`: Rendered (url)
- `body.author`: Author ID (number)
- `body.featured_media`: Featured Media ID (number)
- `body.sticky`: Sticky (boolean)
- `body.format`: Format
- `body.categories`: Category IDs
- `body.tags`: Tag IDs
- `body.comment_status`: Comment Status
- `body.ping_status`: Ping Status

### `list_posts`

**List Posts.** Lists WordPress blog posts with full post fields, filtered by keyword, status, category IDs, tag IDs, author or date range. Use it to find post IDs for get_post_by_id, update_blog_post or trash_post; use search_site_content for a quick keyword lookup across posts and pages together. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only posts whose title, content or excerpt contain this text. |
| `status` | array | no |  | Status. Post statuses to include. Defaults to published only. "Any" includes every status except trash. One of `"publish"`, `"draft"`, `"pending"`, `"private"`, `"future"`, `"trash"`, `"any"`. |
| `categories` | array | no |  | Category IDs. Only posts in any of these category IDs (from list_categories). |
| `tags` | array | no |  | Tag IDs. Only posts with any of these tag IDs (from list_tags). |
| `author` | number | no |  | Author ID. Only posts by this user ID (from list_users). |
| `after` | string | no |  | Published After. Only posts published after this ISO 8601 date, e.g. 2026-01-31T00:00:00. |
| `before` | string | no |  | Published Before. Only posts published before this ISO 8601 date. |
| `orderby` | string | no |  | Order By. Sort field. Defaults to date. "Relevance" needs Search. One of `"date"`, `"modified"`, `"title"`, `"id"`, `"slug"`, `"relevance"`. |
| `order` | string | no |  | Order. Sort direction. Defaults to descending. One of `"desc"`, `"asc"`. |
| `per_page` | number | no | `10` | Results Per Page. How many results to return, from 1 to 100. Defaults to 10. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. The output reports total_pages. |

Output fields:

- `posts`: Posts
- `posts[].id`: Post ID (number)
- `posts[].title`: Title
- `posts[].title.rendered`: Rendered (html)
- `posts[].content`: Content
- `posts[].content.rendered`: Rendered (html)
- `posts[].content.protected`: Password Protected (boolean)
- `posts[].excerpt`: Excerpt
- `posts[].excerpt.rendered`: Rendered (html)
- `posts[].excerpt.protected`: Password Protected (boolean)
- `posts[].guid`: GUID
- `posts[].guid.rendered`: Rendered (url)
- `posts[].date`: Published Date (datetime)
- `posts[].date_gmt`: Published Date (GMT) (datetime)
- `posts[].modified`: Modified Date (datetime)
- `posts[].modified_gmt`: Modified Date (GMT) (datetime)
- `posts[].link`: Link (url)
- `posts[].slug`: Slug
- `posts[].status`: Status
- `posts[].type`: Type
- `posts[].author`: Author ID (number)
- `posts[].featured_media`: Featured Media ID (number)
- `posts[].comment_status`: Comment Status
- `posts[].ping_status`: Ping Status
- `posts[].template`: Template
- `posts[].meta`: Meta
- `posts[].class_list`: CSS Classes
- `posts[].sticky`: Sticky (boolean)
- `posts[].format`: Format
- `posts[].categories`: Category IDs
- `posts[].tags`: Tag IDs
- `count`: Returned Count (number)
- `total`: Total Matches (number)
- `total_pages`: Total Pages (number)

### `get_post_by_id`

**Get Post by ID.** Returns one WordPress blog post by ID, including drafts and private posts the connected user can edit. Get the ID from list_posts or search_site_content; use get_page for pages. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | number | yes |  | Post ID. ID of the post, from list_posts or search_site_content. |

Output fields:

- `id`: Post ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.protected`: Password Protected (boolean)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `sticky`: Sticky (boolean)
- `format`: Format
- `categories`: Category IDs
- `tags`: Tag IDs

### `create_blog_post`

**Create Blog Post.** Creates a WordPress blog post from HTML content, optionally with categories, tags and a featured image. With no status the post is saved as a draft; set status "publish" to publish now, or "future" with a Publish Date to schedule (a past date publishes immediately). Custom ACF fields can be set by field name when the site exposes ACF over the REST API. Use create_site_page for static pages. Each call creates a new post, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The post title. |
| `content` | string | yes |  | Content. The post body as HTML. |
| `status` | string | no |  | Status. Leave empty to save the post as a draft. "Scheduled (future)" needs a Publish Date. One of `"publish"`, `"draft"`, `"pending"`, `"private"`, `"future"`. |
| `date` | string | no |  | Publish Date. Publish date in the site's timezone, ISO 8601 (e.g. 2030-01-31T09:00:00). A past date with status "future" publishes immediately. |
| `slug` | string | no |  | Slug. URL slug. |
| `featured_media` | number | no |  | Featured Media ID. ID of an uploaded image to use as the featured image. Get it from upload_media or list_media. |
| `author` | number | no |  | Author ID. User ID of the author. Get it from list_users or get_current_user. Leave empty for the connected user. |
| `comment_status` | string | no |  | Comments. Whether visitors can comment. One of `"open"`, `"closed"`. |
| `ping_status` | string | no |  | Pingbacks. Whether the post accepts pingbacks and trackbacks. One of `"open"`, `"closed"`. |
| `excerpt` | string | no |  | Excerpt. Short summary of the post. |
| `categories` | array | no |  | Category IDs. Category IDs from list_categories or create_category. |
| `tags` | array | no |  | Tag IDs. Tag IDs from list_tags or create_tag. |
| `sticky` | string | no |  | Sticky. Whether the post is pinned to the top of the blog. One of `"true"`, `"false"`. |
| `format` | string | no |  | Format. Post format. Only formats the active theme supports are accepted. One of `"standard"`, `"aside"`, `"chat"`, `"gallery"`, `"link"`, `"image"`, `"quote"`, `"status"`, `"video"`, `"audio"`. |
| `acf` | object | no |  | Custom ACF Fields. Advanced Custom Fields values as field name and value pairs; field names come from the ACF plugin menu. Only the fields you supply are written. Requires the site to expose ACF over the REST API. |

Output fields:

- `id`: Post ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `title.raw`: Raw
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.raw`: Raw
- `content.protected`: Password Protected (boolean)
- `content.block_version`: Block Version (number)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.raw`: Raw
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `guid.raw`: Raw (url)
- `password`: Post Password
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `sticky`: Sticky (boolean)
- `format`: Format
- `categories`: Category IDs
- `tags`: Tag IDs
- `permalink_template`: Permalink Template
- `generated_slug`: Generated Slug

### `update_blog_post`

**Update Blog Post.** Updates an existing WordPress blog post by ID, sending only the fields you supply; everything else stays as it is. Category IDs and Tag IDs replace the current set. Also sets comments or pingbacks open or closed, and writes only the custom ACF fields you supply. To trash a post use trash_post. Safe to retry with the same input. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | number | yes |  | Post ID. ID of the post to update, from list_posts. |
| `title` | string | no |  | Title. The post title. Leave empty to keep the current value. |
| `content` | string | no |  | Content. The post body as HTML. Leave empty to keep the current value. |
| `status` | string | no |  | Status. New status. Leave empty to keep the current value. To trash the post, use the trash action instead. One of `"publish"`, `"draft"`, `"pending"`, `"private"`, `"future"`. |
| `date` | string | no |  | Publish Date. Publish date in the site's timezone, ISO 8601 (e.g. 2030-01-31T09:00:00). A past date with status "future" publishes immediately. Leave empty to keep the current value. |
| `slug` | string | no |  | Slug. URL slug. Leave empty to keep the current value. |
| `featured_media` | number | no |  | Featured Media ID. ID of an uploaded image to use as the featured image. Get it from upload_media or list_media. Leave empty to keep the current value. |
| `author` | number | no |  | Author ID. User ID of the author. Get it from list_users or get_current_user. Leave empty for the connected user. |
| `comment_status` | string | no |  | Comments. Whether visitors can comment. Leave empty to keep the current value. One of `"open"`, `"closed"`. |
| `ping_status` | string | no |  | Pingbacks. Whether the post accepts pingbacks and trackbacks. Leave empty to keep the current value. One of `"open"`, `"closed"`. |
| `excerpt` | string | no |  | Excerpt. Short summary of the post. Leave empty to keep the current value. |
| `categories` | array | no |  | Category IDs. Category IDs from list_categories or create_category. The list replaces the post's current set. Leave empty to keep the current value. |
| `tags` | array | no |  | Tag IDs. Tag IDs from list_tags or create_tag. The list replaces the post's current set. Leave empty to keep the current value. |
| `sticky` | string | no |  | Sticky. Whether the post is pinned to the top of the blog. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `format` | string | no |  | Format. Post format. Only formats the active theme supports are accepted. Leave empty to keep the current value. One of `"standard"`, `"aside"`, `"chat"`, `"gallery"`, `"link"`, `"image"`, `"quote"`, `"status"`, `"video"`, `"audio"`. |
| `acf` | object | no |  | Custom ACF Fields. Advanced Custom Fields values as field name and value pairs; field names come from the ACF plugin menu. Only the fields you supply are written. Requires the site to expose ACF over the REST API. Leave empty to keep the current value. |

Output fields:

- `id`: Post ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `title.raw`: Raw
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.raw`: Raw
- `content.protected`: Password Protected (boolean)
- `content.block_version`: Block Version (number)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.raw`: Raw
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `guid.raw`: Raw (url)
- `password`: Post Password
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `sticky`: Sticky (boolean)
- `format`: Format
- `categories`: Category IDs
- `tags`: Tag IDs
- `permalink_template`: Permalink Template
- `generated_slug`: Generated Slug

### `trash_post`

**Move Post to Trash.** Moves a WordPress blog post to the trash; it can be restored from the WordPress admin until the trash is emptied. Prefer this over delete_post_permanently unless the post must be gone for good. Calling it on a post that is already trashed returns the post unchanged, so it is safe to retry. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | number | yes |  | Post ID. ID of the post to trash, from list_posts. |

Output fields:

- `id`: Post ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `title.raw`: Raw
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.raw`: Raw
- `content.protected`: Password Protected (boolean)
- `content.block_version`: Block Version (number)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.raw`: Raw
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `guid.raw`: Raw (url)
- `password`: Post Password
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `sticky`: Sticky (boolean)
- `format`: Format
- `categories`: Category IDs
- `tags`: Tag IDs
- `permalink_template`: Permalink Template
- `generated_slug`: Generated Slug

### `delete_post_permanently`

**Delete Post Permanently.** Permanently deletes a WordPress blog post in any status, bypassing the trash; it cannot be restored. Use trash_post instead when the post may need to come back. Returns the deleted post; a repeat call fails because the post no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | number | yes |  | Post ID. ID of the post to delete, from list_posts. |

Output fields:

- `deleted`: Deleted (boolean)
- `previous`: Deleted Item
- `previous.id`: Post ID (number)
- `previous.title`: Title
- `previous.title.rendered`: Rendered (html)
- `previous.title.raw`: Raw
- `previous.content`: Content
- `previous.content.rendered`: Rendered (html)
- `previous.content.raw`: Raw
- `previous.content.protected`: Password Protected (boolean)
- `previous.content.block_version`: Block Version (number)
- `previous.excerpt`: Excerpt
- `previous.excerpt.rendered`: Rendered (html)
- `previous.excerpt.raw`: Raw
- `previous.excerpt.protected`: Password Protected (boolean)
- `previous.guid`: GUID
- `previous.guid.rendered`: Rendered (url)
- `previous.guid.raw`: Raw (url)
- `previous.password`: Post Password
- `previous.date`: Published Date (datetime)
- `previous.date_gmt`: Published Date (GMT) (datetime)
- `previous.modified`: Modified Date (datetime)
- `previous.modified_gmt`: Modified Date (GMT) (datetime)
- `previous.link`: Link (url)
- `previous.slug`: Slug
- `previous.status`: Status
- `previous.type`: Type
- `previous.author`: Author ID (number)
- `previous.featured_media`: Featured Media ID (number)
- `previous.comment_status`: Comment Status
- `previous.ping_status`: Ping Status
- `previous.template`: Template
- `previous.meta`: Meta
- `previous.class_list`: CSS Classes
- `previous.sticky`: Sticky (boolean)
- `previous.format`: Format
- `previous.categories`: Category IDs
- `previous.tags`: Tag IDs
- `previous.permalink_template`: Permalink Template
- `previous.generated_slug`: Generated Slug

### `list_pages`

**List Pages.** Lists WordPress static pages with full page fields, filtered by keyword, status or parent page. Use it to find page IDs for get_page, update_page or trash_page; use list_posts for blog posts. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only pages whose title or content contain this text. |
| `status` | array | no |  | Status. Page statuses to include. Defaults to published only. "Any" includes every status except trash. One of `"publish"`, `"draft"`, `"pending"`, `"private"`, `"future"`, `"trash"`, `"any"`. |
| `parent` | number | no |  | Parent Page ID. Only direct children of this page ID. Use 0 for top-level pages. |
| `orderby` | string | no |  | Order By. Sort field. Defaults to date. "Relevance" needs Search. One of `"date"`, `"modified"`, `"title"`, `"id"`, `"slug"`, `"menu_order"`, `"relevance"`. |
| `order` | string | no |  | Order. Sort direction. Defaults to descending. One of `"desc"`, `"asc"`. |
| `per_page` | number | no | `10` | Results Per Page. How many results to return, from 1 to 100. Defaults to 10. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. The output reports total_pages. |

Output fields:

- `pages`: Pages
- `pages[].id`: Page ID (number)
- `pages[].title`: Title
- `pages[].title.rendered`: Rendered (html)
- `pages[].content`: Content
- `pages[].content.rendered`: Rendered (html)
- `pages[].content.protected`: Password Protected (boolean)
- `pages[].excerpt`: Excerpt
- `pages[].excerpt.rendered`: Rendered (html)
- `pages[].excerpt.protected`: Password Protected (boolean)
- `pages[].guid`: GUID
- `pages[].guid.rendered`: Rendered (url)
- `pages[].date`: Published Date (datetime)
- `pages[].date_gmt`: Published Date (GMT) (datetime)
- `pages[].modified`: Modified Date (datetime)
- `pages[].modified_gmt`: Modified Date (GMT) (datetime)
- `pages[].link`: Link (url)
- `pages[].slug`: Slug
- `pages[].status`: Status
- `pages[].type`: Type
- `pages[].author`: Author ID (number)
- `pages[].featured_media`: Featured Media ID (number)
- `pages[].comment_status`: Comment Status
- `pages[].ping_status`: Ping Status
- `pages[].template`: Template
- `pages[].meta`: Meta
- `pages[].class_list`: CSS Classes
- `pages[].parent`: Parent Page ID (number)
- `pages[].menu_order`: Menu Order (number)
- `count`: Returned Count (number)
- `total`: Total Matches (number)
- `total_pages`: Total Pages (number)

### `get_page`

**Get Page.** Returns one WordPress static page by ID, including drafts the connected user can edit. Get the ID from list_pages or search_site_content; use get_post_by_id for blog posts. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | number | yes |  | Page ID. ID of the page, from list_pages or search_site_content. |

Output fields:

- `id`: Page ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.protected`: Password Protected (boolean)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `parent`: Parent Page ID (number)
- `menu_order`: Menu Order (number)

### `create_site_page`

**Create Site Page.** Creates a WordPress static page (About, Contact and similar) from HTML content, optionally under a parent page. With no status the page is saved as a draft; set status "publish" to publish now. Use create_blog_post for dated blog posts. Each call creates a new page, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The page title. |
| `content` | string | yes |  | Content. The page body as HTML. |
| `status` | string | no |  | Status. Leave empty to save the page as a draft. "Scheduled (future)" needs a Publish Date. One of `"publish"`, `"draft"`, `"pending"`, `"private"`, `"future"`. |
| `date` | string | no |  | Publish Date. Publish date in the site's timezone, ISO 8601 (e.g. 2030-01-31T09:00:00). A past date with status "future" publishes immediately. |
| `slug` | string | no |  | Slug. URL slug. |
| `featured_media` | number | no |  | Featured Media ID. ID of an uploaded image to use as the featured image. Get it from upload_media or list_media. |
| `author` | number | no |  | Author ID. User ID of the author. Get it from list_users or get_current_user. Leave empty for the connected user. |
| `comment_status` | string | no |  | Comments. Whether visitors can comment. One of `"open"`, `"closed"`. |
| `ping_status` | string | no |  | Pingbacks. Whether the page accepts pingbacks and trackbacks. One of `"open"`, `"closed"`. |
| `excerpt` | string | no |  | Excerpt. Short summary of the page. Takes effect only when the theme or site supports page excerpts; WordPress silently ignores it otherwise. |
| `parent` | number | no |  | Parent Page ID. ID of the parent page, from list_pages. |
| `menu_order` | number | no |  | Menu Order. Position of the page among its siblings. |

Output fields:

- `id`: Page ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `title.raw`: Raw
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.raw`: Raw
- `content.protected`: Password Protected (boolean)
- `content.block_version`: Block Version (number)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.raw`: Raw
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `guid.raw`: Raw (url)
- `password`: Page Password
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `parent`: Parent Page ID (number)
- `menu_order`: Menu Order (number)
- `permalink_template`: Permalink Template
- `generated_slug`: Generated Slug

### `update_page`

**Update Page.** Updates an existing WordPress static page by ID, sending only the fields you supply; everything else stays as it is. To trash a page use trash_page; use update_blog_post for blog posts. Safe to retry with the same input. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | number | yes |  | Page ID. ID of the page to update, from list_pages. |
| `title` | string | no |  | Title. The page title. Leave empty to keep the current value. |
| `content` | string | no |  | Content. The page body as HTML. Leave empty to keep the current value. |
| `status` | string | no |  | Status. New status. Leave empty to keep the current value. To trash the page, use the trash action instead. One of `"publish"`, `"draft"`, `"pending"`, `"private"`, `"future"`. |
| `date` | string | no |  | Publish Date. Publish date in the site's timezone, ISO 8601 (e.g. 2030-01-31T09:00:00). A past date with status "future" publishes immediately. Leave empty to keep the current value. |
| `slug` | string | no |  | Slug. URL slug. Leave empty to keep the current value. |
| `featured_media` | number | no |  | Featured Media ID. ID of an uploaded image to use as the featured image. Get it from upload_media or list_media. Leave empty to keep the current value. |
| `author` | number | no |  | Author ID. User ID of the author. Get it from list_users or get_current_user. Leave empty for the connected user. |
| `comment_status` | string | no |  | Comments. Whether visitors can comment. Leave empty to keep the current value. One of `"open"`, `"closed"`. |
| `ping_status` | string | no |  | Pingbacks. Whether the page accepts pingbacks and trackbacks. Leave empty to keep the current value. One of `"open"`, `"closed"`. |
| `excerpt` | string | no |  | Excerpt. Short summary of the page. Takes effect only when the theme or site supports page excerpts; WordPress silently ignores it otherwise. Leave empty to keep the current value. |
| `parent` | number | no |  | Parent Page ID. ID of the parent page, from list_pages. Leave empty to keep the current value. |
| `menu_order` | number | no |  | Menu Order. Position of the page among its siblings. Leave empty to keep the current value. |

Output fields:

- `id`: Page ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `title.raw`: Raw
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.raw`: Raw
- `content.protected`: Password Protected (boolean)
- `content.block_version`: Block Version (number)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.raw`: Raw
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `guid.raw`: Raw (url)
- `password`: Page Password
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `parent`: Parent Page ID (number)
- `menu_order`: Menu Order (number)
- `permalink_template`: Permalink Template
- `generated_slug`: Generated Slug

### `trash_page`

**Move Page to Trash.** Moves a WordPress static page to the trash; it can be restored from the WordPress admin until the trash is emptied. Child pages are not trashed. Calling it on a page that is already trashed returns the page unchanged, so it is safe to retry. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | number | yes |  | Page ID. ID of the page to trash, from list_pages. |

Output fields:

- `id`: Page ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `title.raw`: Raw
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.raw`: Raw
- `content.protected`: Password Protected (boolean)
- `content.block_version`: Block Version (number)
- `excerpt`: Excerpt
- `excerpt.rendered`: Rendered (html)
- `excerpt.raw`: Raw
- `excerpt.protected`: Password Protected (boolean)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `guid.raw`: Raw (url)
- `password`: Page Password
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `parent`: Parent Page ID (number)
- `menu_order`: Menu Order (number)
- `permalink_template`: Permalink Template
- `generated_slug`: Generated Slug

### `list_categories`

**List Categories.** Lists WordPress post categories with their IDs, names, slugs, parents and post counts. Use it to turn a category name into the ID that create_blog_post, update_blog_post and list_posts need; use create_category to add a missing one. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only categories whose name or slug contain this text. |
| `slug` | string | no |  | Slug. Only the category with this exact slug. |
| `parent` | number | no |  | Parent Category ID. Only direct children of this category ID. Use 0 for top-level categories. |
| `post` | number | no |  | Post ID. Only categories assigned to this post ID (from list_posts). |
| `hide_empty` | string | no |  | Hide Empty. Whether to leave out categories with no published posts. Defaults to No. One of `"true"`, `"false"`. |
| `per_page` | number | no | `10` | Results Per Page. How many results to return, from 1 to 100. Defaults to 10. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. The output reports total_pages. |

Output fields:

- `categories`: Categories
- `categories[].id`: Term ID (number)
- `categories[].name`: Name
- `categories[].slug`: Slug
- `categories[].description`: Description
- `categories[].count`: Published Post Count (number)
- `categories[].link`: Archive Link (url)
- `categories[].taxonomy`: Taxonomy
- `categories[].meta`: Meta
- `categories[].parent`: Parent Category ID (number)
- `count`: Returned Count (number)
- `total`: Total Matches (number)
- `total_pages`: Total Pages (number)

### `create_category`

**Create Category.** Gets or creates a WordPress post category by name. If a category with that name already exists under the same parent it is returned unchanged with created=false (its description is not updated); otherwise a new one is created with created=true. Use the returned ID in create_blog_post. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Category name. |
| `description` | string | no |  | Description. Category description, used only when a new category is created. |
| `slug` | string | no |  | Slug. URL slug. Leave empty to generate it from the name. Fails if another category already uses it. |
| `parent` | number | no |  | Parent Category ID. ID of the parent category, from list_categories. Leave empty for a top-level category. |

Output fields:

- `id`: Term ID (number)
- `name`: Name
- `slug`: Slug
- `description`: Description
- `count`: Published Post Count (number)
- `link`: Archive Link (url)
- `taxonomy`: Taxonomy
- `meta`: Meta
- `parent`: Parent Category ID (number)
- `created`: Created (boolean)

### `delete_category`

**Delete Category.** Permanently deletes a WordPress category; categories have no trash. Posts in it keep their other categories, and posts left with none move to the default category. The site's default category (usually "Uncategorized") cannot be deleted and returns a 403. A repeat call fails because the category no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `category_id` | number | yes |  | Category ID. ID of the category to delete, from list_categories. |

Output fields:

- `deleted`: Deleted (boolean)
- `previous`: Deleted Item
- `previous.id`: Term ID (number)
- `previous.name`: Name
- `previous.slug`: Slug
- `previous.description`: Description
- `previous.count`: Published Post Count (number)
- `previous.link`: Archive Link (url)
- `previous.taxonomy`: Taxonomy
- `previous.meta`: Meta
- `previous.parent`: Parent Category ID (number)

### `list_tags`

**List Tags.** Lists WordPress post tags with their IDs, names, slugs and post counts. Use it to turn a tag name into the ID that create_blog_post, update_blog_post and list_posts need; use create_tag to add a missing one. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only tags whose name or slug contain this text. |
| `slug` | string | no |  | Slug. Only the tag with this exact slug. |
| `post` | number | no |  | Post ID. Only tags assigned to this post ID (from list_posts). |
| `hide_empty` | string | no |  | Hide Empty. Whether to leave out tags with no published posts. Defaults to No. One of `"true"`, `"false"`. |
| `per_page` | number | no | `10` | Results Per Page. How many results to return, from 1 to 100. Defaults to 10. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. The output reports total_pages. |

Output fields:

- `tags`: Tags
- `tags[].id`: Term ID (number)
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].count`: Published Post Count (number)
- `tags[].link`: Archive Link (url)
- `tags[].taxonomy`: Taxonomy
- `tags[].meta`: Meta
- `count`: Returned Count (number)
- `total`: Total Matches (number)
- `total_pages`: Total Pages (number)

### `create_tag`

**Create Tag.** Gets or creates a WordPress post tag by name. If a tag with that name already exists it is returned unchanged with created=false; otherwise a new one is created with created=true. Use the returned ID in create_blog_post. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Tag name. |
| `description` | string | no |  | Description. Tag description, used only when a new tag is created. |
| `slug` | string | no |  | Slug. URL slug. Leave empty to generate it from the name. Fails if another tag already uses it. |

Output fields:

- `id`: Term ID (number)
- `name`: Name
- `slug`: Slug
- `description`: Description
- `count`: Published Post Count (number)
- `link`: Archive Link (url)
- `taxonomy`: Taxonomy
- `meta`: Meta
- `created`: Created (boolean)

### `delete_tag`

**Delete Tag.** Permanently deletes a WordPress tag and removes it from every post; tags have no trash. To take a tag off one post only, use update_blog_post with the new tag list. A repeat call fails because the tag no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | number | yes |  | Tag ID. ID of the tag to delete, from list_tags. |

Output fields:

- `deleted`: Deleted (boolean)
- `previous`: Deleted Item
- `previous.id`: Term ID (number)
- `previous.name`: Name
- `previous.slug`: Slug
- `previous.description`: Description
- `previous.count`: Published Post Count (number)
- `previous.link`: Archive Link (url)
- `previous.taxonomy`: Taxonomy
- `previous.meta`: Meta

### `list_comments`

**List Comments.** Lists WordPress comments filtered by post, moderation status, author or keyword. Defaults to approved comments; pick status "hold" to find comments awaiting moderation for moderate_comment. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | number | no |  | Post ID. Only comments on this post or page ID (from list_posts or list_pages). |
| `status` | string | no |  | Status. Moderation status to list. Defaults to approved. Other statuses need a moderator (Editor or Administrator) connection. One of `"approve"`, `"hold"`, `"spam"`, `"trash"`. |
| `search` | string | no |  | Search. Only comments containing this text. |
| `author` | number | no |  | Author User ID. Only comments written by this registered user ID (from list_users). |
| `parent` | number | no |  | Parent Comment ID. Only replies to this comment ID. Use 0 for top-level comments. |
| `order` | string | no |  | Order. Sort direction by date. Defaults to newest first. One of `"desc"`, `"asc"`. |
| `per_page` | number | no | `10` | Results Per Page. How many results to return, from 1 to 100. Defaults to 10. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. The output reports total_pages. |

Output fields:

- `comments`: Comments
- `comments[].id`: Comment ID (number)
- `comments[].post`: Post ID (number)
- `comments[].parent`: Parent Comment ID (number)
- `comments[].author`: Author User ID (number)
- `comments[].author_name`: Author Name
- `comments[].author_url`: Author URL (url)
- `comments[].date`: Date (datetime)
- `comments[].date_gmt`: Date (GMT) (datetime)
- `comments[].content`: Content
- `comments[].content.rendered`: Rendered (html)
- `comments[].link`: Link (url)
- `comments[].status`: Status
- `comments[].type`: Type
- `comments[].author_avatar_urls`: Author Avatars
- `comments[].author_avatar_urls.24`: Avatar 24px (image)
- `comments[].author_avatar_urls.48`: Avatar 48px (image)
- `comments[].author_avatar_urls.96`: Avatar 96px (image)
- `comments[].meta`: Meta
- `count`: Returned Count (number)
- `total`: Total Matches (number)
- `total_pages`: Total Pages (number)

### `create_comment`

**Create Comment.** Posts a comment as the connected WordPress user on a published post or page, or replies to an existing comment. Fails if the post is not published or its comments are closed. Each call adds a new comment, so retries duplicate (WordPress rejects an exact duplicate). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | number | yes |  | Post ID. ID of a published post or page with comments open, from list_posts or list_pages. |
| `content` | string | yes |  | Comment. Comment text. Basic HTML is allowed. |
| `parent` | number | no |  | Reply To Comment ID. ID of the comment to reply to, from list_comments. Leave empty for a top-level comment. |

Output fields:

- `id`: Comment ID (number)
- `post`: Post ID (number)
- `parent`: Parent Comment ID (number)
- `author`: Author User ID (number)
- `author_name`: Author Name
- `author_url`: Author URL (url)
- `date`: Date (datetime)
- `date_gmt`: Date (GMT) (datetime)
- `link`: Link (url)
- `status`: Status
- `type`: Type
- `author_avatar_urls`: Author Avatars
- `author_avatar_urls.24`: Avatar 24px (image)
- `author_avatar_urls.48`: Avatar 48px (image)
- `author_avatar_urls.96`: Avatar 96px (image)
- `meta`: Meta
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.raw`: Raw
- `author_email`: Author Email (email)
- `author_ip`: Author IP
- `author_user_agent`: Author User Agent

### `moderate_comment`

**Moderate Comment.** Sets the moderation status of a WordPress comment: approve, hold for review, spam, trash, or reverse spam/trash. Trash is recoverable; use delete_comment only to remove a comment for good. Setting the status a comment already has returns the comment unchanged, so it is safe to retry. Needs a moderator (Editor or Administrator) connection. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | number | yes |  | Comment ID. ID of the comment, from list_comments. |
| `status` | string | yes |  | Action. The moderation action to apply. One of `"approve"`, `"hold"`, `"spam"`, `"unspam"`, `"trash"`, `"untrash"`. |

Output fields:

- `id`: Comment ID (number)
- `post`: Post ID (number)
- `parent`: Parent Comment ID (number)
- `author`: Author User ID (number)
- `author_name`: Author Name
- `author_url`: Author URL (url)
- `date`: Date (datetime)
- `date_gmt`: Date (GMT) (datetime)
- `link`: Link (url)
- `status`: Status
- `type`: Type
- `author_avatar_urls`: Author Avatars
- `author_avatar_urls.24`: Avatar 24px (image)
- `author_avatar_urls.48`: Avatar 48px (image)
- `author_avatar_urls.96`: Avatar 96px (image)
- `meta`: Meta
- `content`: Content
- `content.rendered`: Rendered (html)
- `content.raw`: Raw
- `author_email`: Author Email (email)
- `author_ip`: Author IP
- `author_user_agent`: Author User Agent

### `delete_comment`

**Delete Comment Permanently.** Permanently deletes a WordPress comment, bypassing the trash; it cannot be restored. Use moderate_comment with "trash" or "spam" when the comment may need to come back. A repeat call fails because the comment no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | number | yes |  | Comment ID. ID of the comment to delete, from list_comments. |

Output fields:

- `deleted`: Deleted (boolean)
- `previous`: Deleted Item
- `previous.id`: Comment ID (number)
- `previous.post`: Post ID (number)
- `previous.parent`: Parent Comment ID (number)
- `previous.author`: Author User ID (number)
- `previous.author_name`: Author Name
- `previous.author_url`: Author URL (url)
- `previous.date`: Date (datetime)
- `previous.date_gmt`: Date (GMT) (datetime)
- `previous.link`: Link (url)
- `previous.status`: Status
- `previous.type`: Type
- `previous.author_avatar_urls`: Author Avatars
- `previous.author_avatar_urls.24`: Avatar 24px (image)
- `previous.author_avatar_urls.48`: Avatar 48px (image)
- `previous.author_avatar_urls.96`: Avatar 96px (image)
- `previous.meta`: Meta
- `previous.content`: Content
- `previous.content.rendered`: Rendered (html)
- `previous.content.raw`: Raw
- `previous.author_email`: Author Email (email)
- `previous.author_ip`: Author IP
- `previous.author_user_agent`: Author User Agent

### `list_media`

**List Media.** Lists files in the WordPress media library with their IDs, URLs, MIME types and sizes, filtered by keyword, media type, MIME type or the post they are attached to. Use it to find a media ID for featured_media in create_blog_post, or for get_media and update_media_details. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only files whose title, caption or file name contain this text. |
| `media_type` | string | no |  | Media Type. Only files of this general type. One of `"image"`, `"video"`, `"audio"`, `"text"`, `"application"`. |
| `mime_type` | string | no |  | MIME Type. Only files with this exact MIME type, e.g. image/png. |
| `parent` | number | no |  | Attached Post ID. Only files attached to this post or page ID. Use 0 for unattached files. |
| `per_page` | number | no | `10` | Results Per Page. How many results to return, from 1 to 100. Defaults to 10. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. The output reports total_pages. |

Output fields:

- `media`: Media
- `media[].id`: Media ID (number)
- `media[].title`: Title
- `media[].title.rendered`: Rendered (html)
- `media[].guid`: GUID
- `media[].guid.rendered`: Rendered (url)
- `media[].description`: Description
- `media[].description.rendered`: Rendered (html)
- `media[].caption`: Caption
- `media[].caption.rendered`: Rendered (html)
- `media[].date`: Published Date (datetime)
- `media[].date_gmt`: Published Date (GMT) (datetime)
- `media[].modified`: Modified Date (datetime)
- `media[].modified_gmt`: Modified Date (GMT) (datetime)
- `media[].link`: Link (url)
- `media[].slug`: Slug
- `media[].status`: Status
- `media[].type`: Type
- `media[].author`: Author ID (number)
- `media[].featured_media`: Featured Media ID (number)
- `media[].comment_status`: Comment Status
- `media[].ping_status`: Ping Status
- `media[].template`: Template
- `media[].meta`: Meta
- `media[].class_list`: CSS Classes
- `media[].alt_text`: Alt Text
- `media[].media_type`: Media Type
- `media[].mime_type`: MIME Type
- `media[].source_url`: File URL (url)
- `media[].filename`: File Name
- `media[].filesize`: File Size (filesize)
- `media[].post`: Attached Post ID (number)
- `media[].media_details`: Media Details
- `media[].media_details.width`: Width (number)
- `media[].media_details.height`: Height (number)
- `media[].media_details.file`: Relative File Path
- `media[].media_details.filesize`: File Size (filesize)
- `media[].media_details.sizes`: Sizes (an object whose keys vary)
- `media[].media_details.image_meta`: Image Metadata
- `count`: Returned Count (number)
- `total`: Total Matches (number)
- `total_pages`: Total Pages (number)

### `get_media`

**Get Media.** Returns one WordPress media library item by ID, with its file URL, MIME type, alt text, caption and image sizes. Get the ID from list_media or upload_media. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | number | yes |  | Media ID. ID of the media item, from list_media or upload_media. |

Output fields:

- `id`: Media ID (number)
- `title`: Title
- `title.rendered`: Rendered (html)
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `description`: Description
- `description.rendered`: Rendered (html)
- `caption`: Caption
- `caption.rendered`: Rendered (html)
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `alt_text`: Alt Text
- `media_type`: Media Type
- `mime_type`: MIME Type
- `source_url`: File URL (url)
- `filename`: File Name
- `filesize`: File Size (filesize)
- `post`: Attached Post ID (number)
- `media_details`: Media Details
- `media_details.width`: Width (number)
- `media_details.height`: Height (number)
- `media_details.file`: Relative File Path
- `media_details.filesize`: File Size (filesize)
- `media_details.sizes`: Sizes (an object whose keys vary)
- `media_details.image_meta`: Image Metadata

### `upload_media`

**Upload Media.** Uploads a file (image, PDF, video and so on) to the WordPress media library in one request, optionally setting its title, alt text, caption, description and the post it is attached to. Returns the media ID and public URL; pass the ID as featured_media to create_blog_post. Each call uploads a new copy, so retries duplicate. The site limits allowed file types and size. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload, as a URL or base64 data. The file name and extension decide its type. Files are not supported; an action that needs one fails. |
| `title` | string | no |  | Title. Media title. Defaults to the file name. |
| `alt_text` | string | no |  | Alt Text. Alternative text describing the image for screen readers. |
| `caption` | string | no |  | Caption. Caption shown with the file. |
| `description` | string | no |  | Description. Longer description of the file. |
| `post` | number | no |  | Attach To Post ID. ID of the post or page to attach the file to, from list_posts or list_pages. |

Output fields:

- `id`: Media ID (number)
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `alt_text`: Alt Text
- `media_type`: Media Type
- `mime_type`: MIME Type
- `source_url`: File URL (url)
- `filename`: File Name
- `filesize`: File Size (filesize)
- `post`: Attached Post ID (number)
- `media_details`: Media Details
- `media_details.width`: Width (number)
- `media_details.height`: Height (number)
- `media_details.file`: Relative File Path
- `media_details.filesize`: File Size (filesize)
- `media_details.sizes`: Sizes (an object whose keys vary)
- `media_details.image_meta`: Image Metadata
- `title`: Title
- `title.rendered`: Rendered (html)
- `title.raw`: Raw
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `guid.raw`: Raw (url)
- `description`: Description
- `description.rendered`: Rendered (html)
- `description.raw`: Raw
- `caption`: Caption
- `caption.rendered`: Rendered (html)
- `caption.raw`: Raw
- `permalink_template`: Permalink Template
- `generated_slug`: Generated Slug
- `missing_image_sizes`: Missing Image Sizes
- `exif_orientation`: EXIF Orientation (number)
- `image_output_format`: Image Output Format
- `image_save_progressive`: Save Progressive (boolean)
- `image_quality`: Image Quality

### `update_media_details`

**Update Media Details.** Updates the details of an existing WordPress media item by ID, sending only the fields you supply; the file itself is not replaced. Use it to add alt text or a caption after upload_media. Safe to retry with the same input. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | number | yes |  | Media ID. ID of the media item, from list_media or upload_media. |
| `title` | string | no |  | Title. New title. Leave empty to keep the current value. |
| `alt_text` | string | no |  | Alt Text. New alternative text. Leave empty to keep the current value. |
| `caption` | string | no |  | Caption. New caption. Leave empty to keep the current value. |
| `description` | string | no |  | Description. New description. Leave empty to keep the current value. |
| `post` | number | no |  | Attach To Post ID. ID of the post or page to attach the file to. Leave empty to keep the current value. |

Output fields:

- `id`: Media ID (number)
- `date`: Published Date (datetime)
- `date_gmt`: Published Date (GMT) (datetime)
- `modified`: Modified Date (datetime)
- `modified_gmt`: Modified Date (GMT) (datetime)
- `link`: Link (url)
- `slug`: Slug
- `status`: Status
- `type`: Type
- `author`: Author ID (number)
- `featured_media`: Featured Media ID (number)
- `comment_status`: Comment Status
- `ping_status`: Ping Status
- `template`: Template
- `meta`: Meta
- `class_list`: CSS Classes
- `alt_text`: Alt Text
- `media_type`: Media Type
- `mime_type`: MIME Type
- `source_url`: File URL (url)
- `filename`: File Name
- `filesize`: File Size (filesize)
- `post`: Attached Post ID (number)
- `media_details`: Media Details
- `media_details.width`: Width (number)
- `media_details.height`: Height (number)
- `media_details.file`: Relative File Path
- `media_details.filesize`: File Size (filesize)
- `media_details.sizes`: Sizes (an object whose keys vary)
- `media_details.image_meta`: Image Metadata
- `title`: Title
- `title.rendered`: Rendered (html)
- `title.raw`: Raw
- `guid`: GUID
- `guid.rendered`: Rendered (url)
- `guid.raw`: Raw (url)
- `description`: Description
- `description.rendered`: Rendered (html)
- `description.raw`: Raw
- `caption`: Caption
- `caption.rendered`: Rendered (html)
- `caption.raw`: Raw
- `permalink_template`: Permalink Template
- `generated_slug`: Generated Slug
- `missing_image_sizes`: Missing Image Sizes
- `exif_orientation`: EXIF Orientation (number)
- `image_output_format`: Image Output Format
- `image_save_progressive`: Save Progressive (boolean)
- `image_quality`: Image Quality

### `delete_media`

**Delete Media.** Permanently deletes a WordPress media item and removes its files from the server; media has no trash by default, so there is no recoverable alternative. Posts that used it as a featured image or embedded it will show a missing image. A repeat call fails because the item no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | number | yes |  | Media ID. ID of the media item to delete, from list_media. |

Output fields:

- `deleted`: Deleted (boolean)
- `previous`: Deleted Item
- `previous.id`: Media ID (number)
- `previous.date`: Published Date (datetime)
- `previous.date_gmt`: Published Date (GMT) (datetime)
- `previous.modified`: Modified Date (datetime)
- `previous.modified_gmt`: Modified Date (GMT) (datetime)
- `previous.link`: Link (url)
- `previous.slug`: Slug
- `previous.status`: Status
- `previous.type`: Type
- `previous.author`: Author ID (number)
- `previous.featured_media`: Featured Media ID (number)
- `previous.comment_status`: Comment Status
- `previous.ping_status`: Ping Status
- `previous.template`: Template
- `previous.meta`: Meta
- `previous.class_list`: CSS Classes
- `previous.alt_text`: Alt Text
- `previous.media_type`: Media Type
- `previous.mime_type`: MIME Type
- `previous.source_url`: File URL (url)
- `previous.filename`: File Name
- `previous.filesize`: File Size (filesize)
- `previous.post`: Attached Post ID (number)
- `previous.media_details`: Media Details
- `previous.media_details.width`: Width (number)
- `previous.media_details.height`: Height (number)
- `previous.media_details.file`: Relative File Path
- `previous.media_details.filesize`: File Size (filesize)
- `previous.media_details.sizes`: Sizes (an object whose keys vary)
- `previous.media_details.image_meta`: Image Metadata
- `previous.title`: Title
- `previous.title.rendered`: Rendered (html)
- `previous.title.raw`: Raw
- `previous.guid`: GUID
- `previous.guid.rendered`: Rendered (url)
- `previous.guid.raw`: Raw (url)
- `previous.description`: Description
- `previous.description.rendered`: Rendered (html)
- `previous.description.raw`: Raw
- `previous.caption`: Caption
- `previous.caption.rendered`: Rendered (html)
- `previous.caption.raw`: Raw
- `previous.permalink_template`: Permalink Template
- `previous.generated_slug`: Generated Slug
- `previous.missing_image_sizes`: Missing Image Sizes
- `previous.exif_orientation`: EXIF Orientation (number)
- `previous.image_output_format`: Image Output Format
- `previous.image_save_progressive`: Save Progressive (boolean)
- `previous.image_quality`: Image Quality

### `get_current_user`

**Get Current User.** Returns the WordPress user the connection authenticates as: ID, name, email, roles and capabilities. Use it to check that the connection works and whether the role allows a write (for example edit_pages, moderate_comments, manage_categories) before attempting it. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID (number)
- `name`: Display Name
- `slug`: Slug
- `url`: Website (url)
- `description`: Biography
- `link`: Author Archive Link (url)
- `avatar_urls`: Avatars
- `avatar_urls.24`: Avatar 24px (image)
- `avatar_urls.48`: Avatar 48px (image)
- `avatar_urls.96`: Avatar 96px (image)
- `meta`: Meta
- `is_super_admin`: Is Super Admin (boolean)
- `username`: Username
- `first_name`: First Name
- `last_name`: Last Name
- `email`: Email (email)
- `nickname`: Nickname
- `locale`: Locale
- `registered_date`: Registered Date (datetime)
- `roles`: Roles
- `capabilities`: Capabilities (an object whose keys vary)
- `extra_capabilities`: Extra Capabilities (an object whose keys vary)

### `list_users`

**List Users.** Lists WordPress users with their IDs, display names and slugs, filtered by keyword or role. Use it to find an author ID for create_blog_post or list_posts; use get_current_user for the connected account. Without the list_users capability (Administrator) only users with published posts are returned and role filtering fails. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only users whose name, slug, email or URL contain this text. |
| `roles` | array | no |  | Roles. Only users with any of these role slugs, e.g. administrator, editor, author, contributor, subscriber. |
| `per_page` | number | no | `10` | Results Per Page. How many results to return, from 1 to 100. Defaults to 10. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. The output reports total_pages. |

Output fields:

- `users`: Users
- `users[].id`: User ID (number)
- `users[].name`: Display Name
- `users[].slug`: Slug
- `users[].url`: Website (url)
- `users[].description`: Biography
- `users[].link`: Author Archive Link (url)
- `users[].avatar_urls`: Avatars
- `users[].avatar_urls.24`: Avatar 24px (image)
- `users[].avatar_urls.48`: Avatar 48px (image)
- `users[].avatar_urls.96`: Avatar 96px (image)
- `users[].meta`: Meta
- `users[].is_super_admin`: Is Super Admin (boolean)
- `count`: Returned Count (number)
- `total`: Total Matches (number)
- `total_pages`: Total Pages (number)

### `search_site_content`

**Search Site Content.** Keyword search across the WordPress site, returning only ID, title, URL and type for each match. By default it searches published posts and pages together; set Type to "term" to search categories and tags. Use list_posts or list_pages instead when you need drafts, full fields or filters. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Search. Text to search for. |
| `type` | string | no |  | Type. What to search. Defaults to posts and pages. One of `"post"`, `"term"`, `"post-format"`. |
| `subtype` | string | no |  | Subtype. Narrow the search within the chosen Type. "Post" and "Page" work only with Type "Posts and pages"; "Category" and "Tag" only with Type "Categories and tags". Leave empty for all. One of `"post"`, `"page"`, `"category"`, `"post_tag"`. |
| `per_page` | number | no | `10` | Results Per Page. How many results to return, from 1 to 100. Defaults to 10. |
| `page` | number | no | `1` | Page. Page of results to return, starting at 1. The output reports total_pages. |

Output fields:

- `results`: Results
- `results[].id`: ID (number)
- `results[].title`: Title
- `results[].url`: URL (url)
- `results[].type`: Type
- `results[].subtype`: Subtype
- `count`: Returned Count (number)
- `total`: Total Matches (number)
- `total_pages`: Total Pages (number)

### `get_site_settings`

**Get Site Settings.** Returns the WordPress site settings: title, tagline, URL, admin email, timezone, date and time formats, default category and post format, and front-page setup. Use it to learn the site timezone before scheduling a post, or the default category ID. Needs an Administrator connection. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `title`: Site Title
- `description`: Tagline
- `url`: Site URL (url)
- `email`: Admin Email (email)
- `timezone`: Timezone
- `date_format`: Date Format
- `time_format`: Time Format
- `start_of_week`: Start of Week (number)
- `language`: Language
- `use_smilies`: Convert Emoticons (boolean)
- `default_category`: Default Category ID (number)
- `default_post_format`: Default Post Format
- `posts_per_page`: Posts Per Page (number)
- `show_on_front`: Front Page Shows
- `page_on_front`: Front Page ID (number)
- `page_for_posts`: Posts Page ID (number)
- `default_ping_status`: Default Ping Status
- `default_comment_status`: Default Comment Status
- `site_logo`: Site Logo Media ID (number)
- `site_icon`: Site Icon Media ID (number)

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
