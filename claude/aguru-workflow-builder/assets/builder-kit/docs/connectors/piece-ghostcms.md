# GhostCMS

Publishing platform for professional bloggers

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ghostcms'
  version: '0.3.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To generate an API key, follow the steps below in GhostCMS:
> 1. Go to Settings -> Advanced -> Integrations.
> 2. Scroll down to Custom Integrations and click Add custom integration.
> 3. Enter integration name and click create.
> 4. Copy the API URL and the Admin API Key into the fields below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes |  | API URL. The API URL of your application (https://test-publication.ghost.io) |
| `apiKey` | string | yes |  | Admin API Key. The admin API key for your application. |

## Actions

### `create_member`

**Create Member.** Creates a new member in a Ghost publication from an email (required), with optional name, internal note, and newsletter subscriptions. Use to add a subscriber/member to the audience. Not idempotent: each call creates a member and re-running with the same email may produce a duplicate or error. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `name` | string | no |  | Full Name. |
| `note` | string | no |  | Note. |
| `newsletters` | array | no |  | Newsletters. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `members`: Members
- `members[].id`: Member ID
- `members[].uuid`: UUID
- `members[].email`: Email (email)
- `members[].name`: Name
- `members[].note`: Note
- `members[].status`: Status
- `members[].geolocation`: Geolocation
- `members[].email_count`: Emails Received (number)
- `members[].email_opened_count`: Emails Opened (number)
- `members[].email_open_rate`: Email Open Rate (number)
- `members[].last_seen_at`: Last Seen At (datetime)
- `members[].created_at`: Created At (datetime)
- `members[].updated_at`: Updated At (datetime)
- `members[].labels`: Labels
- `members[].labels[].id`: Label ID
- `members[].labels[].name`: Name
- `members[].labels[].slug`: Slug
- `members[].labels[].created_at`: Created At (datetime)
- `members[].labels[].updated_at`: Updated At (datetime)
- `members[].newsletters`: Newsletters
- `members[].newsletters[].id`: Newsletter ID
- `members[].newsletters[].name`: Name
- `members[].newsletters[].description`: Description
- `members[].newsletters[].status`: Status
- `members[].subscribed`: Subscribed (boolean)
- `members[].comped`: Comped (boolean)
- `members[].avatar_image`: Avatar Image (image)
- `members[].tiers`: Tiers
- `members[].unsubscribe_url`: Unsubscribe URL (url)
- `members[].attribution`: Attribution
- `members[].attribution.referrer_source`: Referrer Source
- `members[].attribution.referrer_medium`: Referrer Medium
- `members[].attribution.referrer_url`: Referrer URL (url)
- `members[].attribution.url`: Signup Page URL (url)
- `members[].attribution.title`: Signup Page Title

### `update_member`

**Update Member.** Updates an existing Ghost member identified by member id, changing any supplied fields (email, name, note, newsletter subscriptions); omitted fields are left unchanged. Use to edit a known member. Requires the target member id. Idempotent: re-applying the same field values yields the same member state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member` | string | yes |  | Member. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. |
| `name` | string | no |  | Full Name. |
| `note` | string | no |  | Note. |
| `newsletters` | array | no |  | Newsletters. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `members`: Members
- `members[].id`: Member ID
- `members[].uuid`: UUID
- `members[].email`: Email (email)
- `members[].name`: Name
- `members[].note`: Note
- `members[].status`: Status
- `members[].geolocation`: Geolocation
- `members[].email_count`: Emails Received (number)
- `members[].email_opened_count`: Emails Opened (number)
- `members[].email_open_rate`: Email Open Rate (number)
- `members[].last_seen_at`: Last Seen At (datetime)
- `members[].created_at`: Created At (datetime)
- `members[].updated_at`: Updated At (datetime)
- `members[].labels`: Labels
- `members[].labels[].id`: Label ID
- `members[].labels[].name`: Name
- `members[].labels[].slug`: Slug
- `members[].labels[].created_at`: Created At (datetime)
- `members[].labels[].updated_at`: Updated At (datetime)
- `members[].newsletters`: Newsletters
- `members[].newsletters[].id`: Newsletter ID
- `members[].newsletters[].name`: Name
- `members[].newsletters[].description`: Description
- `members[].newsletters[].status`: Status
- `members[].subscribed`: Subscribed (boolean)
- `members[].comped`: Comped (boolean)
- `members[].avatar_image`: Avatar Image (image)
- `members[].tiers`: Tiers
- `members[].unsubscribe_url`: Unsubscribe URL (url)
- `members[].attribution`: Attribution
- `members[].attribution.referrer_source`: Referrer Source
- `members[].attribution.referrer_medium`: Referrer Medium
- `members[].attribution.referrer_url`: Referrer URL (url)
- `members[].attribution.url`: Signup Page URL (url)
- `members[].attribution.title`: Signup Page Title

### `create_post`

**Create Post.** Creates a new post in a Ghost publication from a title and HTML content, with the status controlling whether it is saved as a draft, published immediately, or scheduled (scheduled requires a future Published At). Supports optional slug, excerpt, author, tags, and a featured flag. Not idempotent: each call creates a separate post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `slug` | string | no |  | Slug. |
| `status` | string | yes |  | Status. One of `"draft"`, `"published"`, `"scheduled"`. |
| `publishedAt` | ISO date-time string | no |  | Published At. |
| `html` | string | yes |  | Content (HTML). |
| `customExcerpt` | string | no |  | Custom Excerpt. |
| `author` | string | yes |  | Author. A value the product loads from the provider, such as an id; write the value itself. |
| `featured` | boolean | no |  | Featured. |
| `tags` | array | no |  | Tags. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `posts`: Posts
- `posts[].id`: ID
- `posts[].uuid`: UUID
- `posts[].title`: Title
- `posts[].slug`: Slug
- `posts[].status`: Status
- `posts[].visibility`: Visibility
- `posts[].url`: URL (url)
- `posts[].excerpt`: Excerpt
- `posts[].custom_excerpt`: Custom Excerpt
- `posts[].featured`: Featured (boolean)
- `posts[].feature_image`: Feature Image (image)
- `posts[].feature_image_alt`: Feature Image Alt Text
- `posts[].feature_image_caption`: Feature Image Caption
- `posts[].reading_time`: Reading Time (minutes) (number)
- `posts[].meta_title`: Meta Title
- `posts[].meta_description`: Meta Description
- `posts[].canonical_url`: Canonical URL (url)
- `posts[].created_at`: Created At (datetime)
- `posts[].updated_at`: Updated At (datetime)
- `posts[].published_at`: Published At (datetime)
- `posts[].tags`: Tags
- `posts[].tags[].id`: Tag ID
- `posts[].tags[].name`: Name
- `posts[].tags[].slug`: Slug
- `posts[].tags[].description`: Description
- `posts[].tags[].visibility`: Visibility
- `posts[].tags[].accent_color`: Accent Color
- `posts[].tags[].feature_image`: Feature Image (image)
- `posts[].tags[].meta_title`: Meta Title
- `posts[].tags[].meta_description`: Meta Description
- `posts[].tags[].url`: URL (url)
- `posts[].tags[].created_at`: Created At (datetime)
- `posts[].tags[].updated_at`: Updated At (datetime)
- `posts[].authors`: Authors
- `posts[].authors[].id`: User ID
- `posts[].authors[].name`: Name
- `posts[].authors[].slug`: Slug
- `posts[].authors[].email`: Email (email)
- `posts[].authors[].status`: Status
- `posts[].authors[].profile_image`: Profile Image (image)
- `posts[].authors[].bio`: Bio
- `posts[].authors[].website`: Website (url)
- `posts[].authors[].location`: Location
- `posts[].authors[].url`: Author Page URL (url)
- `posts[].primary_tag`: Primary Tag
- `posts[].primary_tag.id`: Tag ID
- `posts[].primary_tag.name`: Name
- `posts[].primary_tag.slug`: Slug
- `posts[].primary_tag.description`: Description
- `posts[].primary_tag.visibility`: Visibility
- `posts[].primary_tag.accent_color`: Accent Color
- `posts[].primary_tag.feature_image`: Feature Image (image)
- `posts[].primary_tag.meta_title`: Meta Title
- `posts[].primary_tag.meta_description`: Meta Description
- `posts[].primary_tag.url`: URL (url)
- `posts[].primary_tag.created_at`: Created At (datetime)
- `posts[].primary_tag.updated_at`: Updated At (datetime)
- `posts[].primary_author`: Primary Author
- `posts[].primary_author.id`: User ID
- `posts[].primary_author.name`: Name
- `posts[].primary_author.slug`: Slug
- `posts[].primary_author.email`: Email (email)
- `posts[].primary_author.status`: Status
- `posts[].primary_author.profile_image`: Profile Image (image)
- `posts[].primary_author.bio`: Bio
- `posts[].primary_author.website`: Website (url)
- `posts[].primary_author.location`: Location
- `posts[].primary_author.url`: Author Page URL (url)
- `posts[].email_only`: Email Only (boolean)
- `posts[].email_segment`: Email Segment
- `posts[].email_subject`: Email Subject

### `find_member`

**Find Member.** Looks up Ghost members filtered by an exact email address and returns the matches. Use to check whether a member exists or to resolve a member id before updating. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

Output fields:

- `members`: Members
- `members[].id`: Member ID
- `members[].uuid`: UUID
- `members[].email`: Email (email)
- `members[].name`: Name
- `members[].note`: Note
- `members[].status`: Status
- `members[].geolocation`: Geolocation
- `members[].email_count`: Emails Received (number)
- `members[].email_opened_count`: Emails Opened (number)
- `members[].email_open_rate`: Email Open Rate (number)
- `members[].last_seen_at`: Last Seen At (datetime)
- `members[].created_at`: Created At (datetime)
- `members[].updated_at`: Updated At (datetime)
- `members[].labels`: Labels
- `members[].labels[].id`: Label ID
- `members[].labels[].name`: Name
- `members[].labels[].slug`: Slug
- `members[].labels[].created_at`: Created At (datetime)
- `members[].labels[].updated_at`: Updated At (datetime)
- `members[].newsletters`: Newsletters
- `members[].newsletters[].id`: Newsletter ID
- `members[].newsletters[].name`: Name
- `members[].newsletters[].description`: Description
- `members[].newsletters[].status`: Status
- `members[].subscribed`: Subscribed (boolean)
- `members[].comped`: Comped (boolean)
- `members[].avatar_image`: Avatar Image (image)

### `find_user`

**Find User.** Looks up Ghost staff users (authors/admins, not members) filtered by an exact email address and returns the matches. Use to resolve a staff user id, e.g. to set as a post author. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

Output fields:

- `users`: Users
- `users[].id`: User ID
- `users[].name`: Name
- `users[].slug`: Slug
- `users[].email`: Email (email)
- `users[].status`: Status
- `users[].profile_image`: Profile Image (image)
- `users[].bio`: Bio
- `users[].website`: Website (url)
- `users[].location`: Location
- `users[].url`: Author Page URL (url)
- `users[].cover_image`: Cover Image (image)
- `users[].last_seen`: Last Seen (datetime)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)

### `ghost_list_posts`

**List Posts.** Lists posts of any status with pagination totals, optionally narrowed by an NQL filter such as status:draft or tag:news. Use it to find a post ID or slug; use Get Post for one post with its full HTML. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. status:published+tag:news or title:~'launch'. Quote values that contain spaces or special characters with single quotes. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |
| `page` | number | no | `1` | Page. The page number to return. Defaults to 1. |
| `order` | string | no |  | Order. Sort order as "<field> asc\|desc", e.g. published_at desc. |
| `include_content` | boolean | no | `false` | Include Content. Return the HTML body of each post. Off by default to keep the result small. |

Output fields:

- `posts`: Posts
- `posts[].id`: ID
- `posts[].uuid`: UUID
- `posts[].title`: Title
- `posts[].slug`: Slug
- `posts[].status`: Status
- `posts[].visibility`: Visibility
- `posts[].url`: URL (url)
- `posts[].html`: HTML (html)
- `posts[].excerpt`: Excerpt
- `posts[].custom_excerpt`: Custom Excerpt
- `posts[].featured`: Featured (boolean)
- `posts[].feature_image`: Feature Image (image)
- `posts[].feature_image_alt`: Feature Image Alt Text
- `posts[].feature_image_caption`: Feature Image Caption
- `posts[].reading_time`: Reading Time (minutes) (number)
- `posts[].meta_title`: Meta Title
- `posts[].meta_description`: Meta Description
- `posts[].canonical_url`: Canonical URL (url)
- `posts[].created_at`: Created At (datetime)
- `posts[].updated_at`: Updated At (datetime)
- `posts[].published_at`: Published At (datetime)
- `posts[].tags`: Tags
- `posts[].tags[].id`: Tag ID
- `posts[].tags[].name`: Name
- `posts[].tags[].slug`: Slug
- `posts[].tags[].description`: Description
- `posts[].tags[].visibility`: Visibility
- `posts[].tags[].accent_color`: Accent Color
- `posts[].tags[].feature_image`: Feature Image (image)
- `posts[].tags[].meta_title`: Meta Title
- `posts[].tags[].meta_description`: Meta Description
- `posts[].tags[].url`: URL (url)
- `posts[].tags[].created_at`: Created At (datetime)
- `posts[].tags[].updated_at`: Updated At (datetime)
- `posts[].authors`: Authors
- `posts[].authors[].id`: User ID
- `posts[].authors[].name`: Name
- `posts[].authors[].slug`: Slug
- `posts[].authors[].email`: Email (email)
- `posts[].authors[].status`: Status
- `posts[].authors[].profile_image`: Profile Image (image)
- `posts[].authors[].bio`: Bio
- `posts[].authors[].website`: Website (url)
- `posts[].authors[].location`: Location
- `posts[].authors[].url`: Author Page URL (url)
- `posts[].primary_tag`: Primary Tag
- `posts[].primary_tag.id`: Tag ID
- `posts[].primary_tag.name`: Name
- `posts[].primary_tag.slug`: Slug
- `posts[].primary_tag.description`: Description
- `posts[].primary_tag.visibility`: Visibility
- `posts[].primary_tag.accent_color`: Accent Color
- `posts[].primary_tag.feature_image`: Feature Image (image)
- `posts[].primary_tag.meta_title`: Meta Title
- `posts[].primary_tag.meta_description`: Meta Description
- `posts[].primary_tag.url`: URL (url)
- `posts[].primary_tag.created_at`: Created At (datetime)
- `posts[].primary_tag.updated_at`: Updated At (datetime)
- `posts[].primary_author`: Primary Author
- `posts[].primary_author.id`: User ID
- `posts[].primary_author.name`: Name
- `posts[].primary_author.slug`: Slug
- `posts[].primary_author.email`: Email (email)
- `posts[].primary_author.status`: Status
- `posts[].primary_author.profile_image`: Profile Image (image)
- `posts[].primary_author.bio`: Bio
- `posts[].primary_author.website`: Website (url)
- `posts[].primary_author.location`: Location
- `posts[].primary_author.url`: Author Page URL (url)
- `posts[].email_only`: Email Only (boolean)
- `posts[].email_segment`: Email Segment
- `posts[].email_subject`: Email Subject
- `page`: Page (number)
- `limit`: Limit
- `total_pages`: Total Pages (number)
- `total`: Total (number)
- `next`: Next Page (number)
- `prev`: Previous Page (number)

### `ghost_get_post`

**Get Post.** Returns one post by ID with its HTML body, tags, authors, status and URL. Use Get Post by Slug when only the slug is known, or List Posts to find the ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The post ID, from List Posts. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `email_only`: Email Only (boolean)
- `email_segment`: Email Segment
- `email_subject`: Email Subject

### `ghost_get_post_by_slug`

**Get Post by Slug.** Returns one post by its slug, the last part of the post URL, with its HTML body, tags and authors. Use Get Post when the ID is known. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `slug` | string | yes |  | Slug. The post slug, e.g. "welcome" for https://example.com/welcome/. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `email_only`: Email Only (boolean)
- `email_segment`: Email Segment
- `email_subject`: Email Subject

### `ghost_create_post`

**Create Post.** Creates a post from a title and optional HTML, tags (by name, created if missing) and authors. It is saved as a draft unless Status says otherwise; this never emails subscribers, so use Publish Post with a newsletter to send it. Each call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The post title. |
| `html` | string | no |  | Content (HTML). The post body as HTML. Ghost converts it to its editor format. |
| `slug` | string | no |  | Slug. The URL slug of the post. Ghost generates one from the title when empty. |
| `custom_excerpt` | string | no |  | Excerpt. A short summary shown in lists and previews. |
| `feature_image` | string | no |  | Feature Image URL. The URL of the feature image, for example one returned by Upload Image. |
| `featured` | string | no |  | Featured. Mark the post as featured. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `visibility` | string | no |  | Visibility. Who can read the content on the site. One of `"public"`, `"members"`, `"paid"`. |
| `tags` | array | no |  | Tags. Tag names. Missing tags are created. |
| `authors` | array | no |  | Authors. Staff user IDs or emails, from List Users. Defaults to the integration owner. |
| `meta_title` | string | no |  | Meta Title. The SEO title. |
| `meta_description` | string | no |  | Meta Description. The SEO description. |
| `status` | string | no | `"draft"` | Status. Draft (default), published now, or scheduled for Published At. One of `"draft"`, `"published"`, `"scheduled"`. |
| `published_at` | ISO date-time string | no |  | Published At. Required when Status is Scheduled and must be in the future. Optional backdate for Published. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `email_only`: Email Only (boolean)
- `email_segment`: Email Segment
- `email_subject`: Email Subject

### `ghost_update_post`

**Update Post.** Edits a post by ID; only the inputs you supply change. Tags and Authors replace the whole list, so pass the full list you want; an empty Tags list removes every tag, and Authors can never be empty. Clear Fields blanks the excerpt, feature image or SEO fields. It cannot change status: use Publish Post, Schedule Post or Unpublish Post for that. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The post ID, from List Posts. |
| `title` | string | no |  | Title. The post title. |
| `html` | string | no |  | Content (HTML). The post body as HTML. Ghost converts it to its editor format. Supplying it replaces the whole body. |
| `slug` | string | no |  | Slug. The URL slug of the post. Ghost generates one from the title when empty. |
| `custom_excerpt` | string | no |  | Excerpt. A short summary shown in lists and previews. |
| `feature_image` | string | no |  | Feature Image URL. The URL of the feature image, for example one returned by Upload Image. |
| `featured` | string | no |  | Featured. Mark the post as featured. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `visibility` | string | no |  | Visibility. Who can read the content on the site. One of `"public"`, `"members"`, `"paid"`. |
| `tags` | array | no |  | Tags. Tag names. Missing tags are created. Supplying tags replaces the full tag list; an empty list removes every tag, and leaving it out keeps the current tags. |
| `authors` | array | no |  | Authors. Staff user IDs or emails, from List Users. Supplying authors replaces the full author list. Ghost needs at least one author, so an empty list is rejected. |
| `meta_title` | string | no |  | Meta Title. The SEO title. |
| `meta_description` | string | no |  | Meta Description. The SEO description. |
| `clear_fields` | array | no |  | Clear Fields. Fields to blank out on the record. A field listed here must not also be given a new value. Leave empty to clear nothing. One of `"custom_excerpt"`, `"feature_image"`, `"meta_title"`, `"meta_description"`. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `email_only`: Email Only (boolean)
- `email_segment`: Email Segment
- `email_subject`: Email Subject

### `ghost_publish_post`

**Publish Post.** Publishes a post immediately. With Newsletter Slug it also emails the post to that newsletter (all members, or Email Segment), and Email Only sends the email without putting it on the site. An email can only be sent once, so do not retry after success. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The post ID, from List Posts. |
| `newsletter` | string | no |  | Newsletter Slug. Send the post by email to this newsletter, e.g. "default-newsletter". Get slugs from List Newsletters. Leave empty to publish on the site only. |
| `email_segment` | string | no |  | Email Segment. Which members receive the email: "all", "status:free", "status:-free" (paid) or another member NQL filter. Only used with Newsletter Slug. Defaults to all. |
| `email_only` | boolean | no | `false` | Email Only. Send the post as an email to the newsletter without publishing it on the site. Requires Newsletter Slug. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `email_only`: Email Only (boolean)
- `email_segment`: Email Segment
- `email_subject`: Email Subject
- `email`: Email
- `email.id`: Email ID
- `email.status`: Status
- `email.subject`: Subject
- `email.recipient_filter`: Recipient Filter
- `email.email_count`: Recipients (number)
- `email.delivered_count`: Delivered (number)
- `email.opened_count`: Opened (number)
- `email.failed_count`: Failed (number)
- `email.submitted_at`: Submitted At (datetime)
- `email.newsletter_id`: Newsletter ID
- `email.error`: Error
- `newsletter`: Newsletter
- `newsletter.id`: Newsletter ID
- `newsletter.name`: Name
- `newsletter.slug`: Slug
- `newsletter.status`: Status

### `ghost_schedule_post`

**Schedule Post.** Schedules a draft or already scheduled post to publish at a future Published At; Ghost rejects times in the past or only moments away. With Newsletter Slug the post is also emailed when it goes live. Use Unpublish Post to cancel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The post ID, from List Posts. |
| `published_at` | ISO date-time string | yes |  | Published At. When to publish. Must be in the future. |
| `newsletter` | string | no |  | Newsletter Slug. Send the post by email to this newsletter, e.g. "default-newsletter". Get slugs from List Newsletters. Leave empty to publish on the site only. |
| `email_segment` | string | no |  | Email Segment. Which members receive the email: "all", "status:free", "status:-free" (paid) or another member NQL filter. Only used with Newsletter Slug. Defaults to all. |
| `email_only` | boolean | no | `false` | Email Only. Send the post as an email to the newsletter without publishing it on the site. Requires Newsletter Slug. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `email_only`: Email Only (boolean)
- `email_segment`: Email Segment
- `email_subject`: Email Subject

### `ghost_unpublish_post`

**Unpublish Post.** Sets a published or scheduled post back to draft, which removes it from the site and cancels a pending scheduled publish and its email. An email that was already sent cannot be recalled. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The post ID, from List Posts. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `email_only`: Email Only (boolean)
- `email_segment`: Email Segment
- `email_subject`: Email Subject

### `ghost_copy_post`

**Copy Post.** Duplicates a post into a new draft with the same content, tags and authors and returns the copy. Each call creates another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The ID of the post to copy, from List Posts. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `email_only`: Email Only (boolean)
- `email_segment`: Email Segment
- `email_subject`: Email Subject

### `ghost_delete_post`

**Delete Post.** Permanently deletes a post by ID; it cannot be restored. Prefer Unpublish Post to take a post off the site. A retry fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The post ID, from List Posts. |

Output fields:

- `success`: Success (boolean)
- `post_id`: Post ID

### `ghost_list_pages`

**List Pages.** Lists static pages (not posts) of any status with pagination totals, optionally narrowed by an NQL filter. Use it to find a page ID or slug; use Get Page for the full HTML. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. status:published or title:~'about'. Quote values that contain spaces or special characters with single quotes. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |
| `page` | number | no | `1` | Page. The page number to return. Defaults to 1. |
| `order` | string | no |  | Order. Sort order as "<field> asc\|desc", e.g. updated_at desc. |
| `include_content` | boolean | no | `false` | Include Content. Return the HTML body of each page. Off by default to keep the result small. |

Output fields:

- `pages`: Pages
- `pages[].id`: ID
- `pages[].uuid`: UUID
- `pages[].title`: Title
- `pages[].slug`: Slug
- `pages[].status`: Status
- `pages[].visibility`: Visibility
- `pages[].url`: URL (url)
- `pages[].html`: HTML (html)
- `pages[].excerpt`: Excerpt
- `pages[].custom_excerpt`: Custom Excerpt
- `pages[].featured`: Featured (boolean)
- `pages[].feature_image`: Feature Image (image)
- `pages[].feature_image_alt`: Feature Image Alt Text
- `pages[].feature_image_caption`: Feature Image Caption
- `pages[].reading_time`: Reading Time (minutes) (number)
- `pages[].meta_title`: Meta Title
- `pages[].meta_description`: Meta Description
- `pages[].canonical_url`: Canonical URL (url)
- `pages[].created_at`: Created At (datetime)
- `pages[].updated_at`: Updated At (datetime)
- `pages[].published_at`: Published At (datetime)
- `pages[].tags`: Tags
- `pages[].tags[].id`: Tag ID
- `pages[].tags[].name`: Name
- `pages[].tags[].slug`: Slug
- `pages[].tags[].description`: Description
- `pages[].tags[].visibility`: Visibility
- `pages[].tags[].accent_color`: Accent Color
- `pages[].tags[].feature_image`: Feature Image (image)
- `pages[].tags[].meta_title`: Meta Title
- `pages[].tags[].meta_description`: Meta Description
- `pages[].tags[].url`: URL (url)
- `pages[].tags[].created_at`: Created At (datetime)
- `pages[].tags[].updated_at`: Updated At (datetime)
- `pages[].authors`: Authors
- `pages[].authors[].id`: User ID
- `pages[].authors[].name`: Name
- `pages[].authors[].slug`: Slug
- `pages[].authors[].email`: Email (email)
- `pages[].authors[].status`: Status
- `pages[].authors[].profile_image`: Profile Image (image)
- `pages[].authors[].bio`: Bio
- `pages[].authors[].website`: Website (url)
- `pages[].authors[].location`: Location
- `pages[].authors[].url`: Author Page URL (url)
- `pages[].primary_tag`: Primary Tag
- `pages[].primary_tag.id`: Tag ID
- `pages[].primary_tag.name`: Name
- `pages[].primary_tag.slug`: Slug
- `pages[].primary_tag.description`: Description
- `pages[].primary_tag.visibility`: Visibility
- `pages[].primary_tag.accent_color`: Accent Color
- `pages[].primary_tag.feature_image`: Feature Image (image)
- `pages[].primary_tag.meta_title`: Meta Title
- `pages[].primary_tag.meta_description`: Meta Description
- `pages[].primary_tag.url`: URL (url)
- `pages[].primary_tag.created_at`: Created At (datetime)
- `pages[].primary_tag.updated_at`: Updated At (datetime)
- `pages[].primary_author`: Primary Author
- `pages[].primary_author.id`: User ID
- `pages[].primary_author.name`: Name
- `pages[].primary_author.slug`: Slug
- `pages[].primary_author.email`: Email (email)
- `pages[].primary_author.status`: Status
- `pages[].primary_author.profile_image`: Profile Image (image)
- `pages[].primary_author.bio`: Bio
- `pages[].primary_author.website`: Website (url)
- `pages[].primary_author.location`: Location
- `pages[].primary_author.url`: Author Page URL (url)
- `pages[].show_title_and_feature_image`: Show Title and Feature Image (boolean)
- `page`: Page (number)
- `limit`: Limit
- `total_pages`: Total Pages (number)
- `total`: Total (number)
- `next`: Next Page (number)
- `prev`: Previous Page (number)

### `ghost_get_page`

**Get Page.** Returns one static page by ID with its HTML body, tags, authors, status and URL. Use Get Page by Slug when only the slug is known. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The page ID, from List Pages. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `show_title_and_feature_image`: Show Title and Feature Image (boolean)

### `ghost_get_page_by_slug`

**Get Page by Slug.** Returns one static page by its slug, the last part of its URL, with its HTML body. Use Get Page when the ID is known. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `slug` | string | yes |  | Slug. The page slug, e.g. "about" for https://example.com/about/. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `show_title_and_feature_image`: Show Title and Feature Image (boolean)

### `ghost_create_page`

**Create Page.** Creates a static page (such as About or Contact, not a blog post) from a title and optional HTML. It is saved as a draft unless Status says otherwise; pages are never emailed. Each call creates a new page. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The page title. |
| `html` | string | no |  | Content (HTML). The page body as HTML. Ghost converts it to its editor format. |
| `slug` | string | no |  | Slug. The URL slug of the page. Ghost generates one from the title when empty. |
| `custom_excerpt` | string | no |  | Excerpt. A short summary shown in lists and previews. |
| `feature_image` | string | no |  | Feature Image URL. The URL of the feature image, for example one returned by Upload Image. |
| `featured` | string | no |  | Featured. Mark the page as featured. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `visibility` | string | no |  | Visibility. Who can read the content on the site. One of `"public"`, `"members"`, `"paid"`. |
| `tags` | array | no |  | Tags. Tag names. Missing tags are created. |
| `authors` | array | no |  | Authors. Staff user IDs or emails, from List Users. Defaults to the integration owner. |
| `meta_title` | string | no |  | Meta Title. The SEO title. |
| `meta_description` | string | no |  | Meta Description. The SEO description. |
| `status` | string | no | `"draft"` | Status. Draft (default), published now, or scheduled for Published At. One of `"draft"`, `"published"`, `"scheduled"`. |
| `published_at` | ISO date-time string | no |  | Published At. Required when Status is Scheduled and must be in the future. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `show_title_and_feature_image`: Show Title and Feature Image (boolean)

### `ghost_update_page`

**Update Page.** Edits a static page by ID; only the inputs you supply change, and Status can publish, schedule or unpublish it because pages are never emailed. Tags and Authors replace the whole list; an empty Tags list removes every tag, and Authors can never be empty. Clear Fields blanks the excerpt, feature image or SEO fields. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The page ID, from List Pages. |
| `title` | string | no |  | Title. The page title. |
| `html` | string | no |  | Content (HTML). The page body as HTML. Ghost converts it to its editor format. Supplying it replaces the whole body. |
| `slug` | string | no |  | Slug. The URL slug of the page. Ghost generates one from the title when empty. |
| `custom_excerpt` | string | no |  | Excerpt. A short summary shown in lists and previews. |
| `feature_image` | string | no |  | Feature Image URL. The URL of the feature image, for example one returned by Upload Image. |
| `featured` | string | no |  | Featured. Mark the page as featured. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `visibility` | string | no |  | Visibility. Who can read the content on the site. One of `"public"`, `"members"`, `"paid"`. |
| `tags` | array | no |  | Tags. Tag names. Missing tags are created. Supplying tags replaces the full tag list; an empty list removes every tag, and leaving it out keeps the current tags. |
| `authors` | array | no |  | Authors. Staff user IDs or emails, from List Users. Supplying authors replaces the full author list. Ghost needs at least one author, so an empty list is rejected. |
| `meta_title` | string | no |  | Meta Title. The SEO title. |
| `meta_description` | string | no |  | Meta Description. The SEO description. |
| `clear_fields` | array | no |  | Clear Fields. Fields to blank out on the record. A field listed here must not also be given a new value. Leave empty to clear nothing. One of `"custom_excerpt"`, `"feature_image"`, `"meta_title"`, `"meta_description"`. |
| `status` | string | no |  | Status. Change the page status. Scheduled requires a future Published At. Leave empty to keep it. One of `"draft"`, `"published"`, `"scheduled"`. |
| `published_at` | ISO date-time string | no |  | Published At. The publish time. Must be in the future when Status is Scheduled. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `show_title_and_feature_image`: Show Title and Feature Image (boolean)

### `ghost_copy_page`

**Copy Page.** Duplicates a static page into a new draft with the same content and returns the copy. Each call creates another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The ID of the page to copy, from List Pages. |

Output fields:

- `id`: ID
- `uuid`: UUID
- `title`: Title
- `slug`: Slug
- `status`: Status
- `visibility`: Visibility
- `url`: URL (url)
- `html`: HTML (html)
- `excerpt`: Excerpt
- `custom_excerpt`: Custom Excerpt
- `featured`: Featured (boolean)
- `feature_image`: Feature Image (image)
- `feature_image_alt`: Feature Image Alt Text
- `feature_image_caption`: Feature Image Caption
- `reading_time`: Reading Time (minutes) (number)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `canonical_url`: Canonical URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `authors`: Authors
- `authors[].id`: User ID
- `authors[].name`: Name
- `authors[].slug`: Slug
- `authors[].email`: Email (email)
- `authors[].status`: Status
- `authors[].profile_image`: Profile Image (image)
- `authors[].bio`: Bio
- `authors[].website`: Website (url)
- `authors[].location`: Location
- `authors[].url`: Author Page URL (url)
- `primary_tag`: Primary Tag
- `primary_tag.id`: Tag ID
- `primary_tag.name`: Name
- `primary_tag.slug`: Slug
- `primary_tag.description`: Description
- `primary_tag.visibility`: Visibility
- `primary_tag.accent_color`: Accent Color
- `primary_tag.feature_image`: Feature Image (image)
- `primary_tag.meta_title`: Meta Title
- `primary_tag.meta_description`: Meta Description
- `primary_tag.url`: URL (url)
- `primary_tag.created_at`: Created At (datetime)
- `primary_tag.updated_at`: Updated At (datetime)
- `primary_author`: Primary Author
- `primary_author.id`: User ID
- `primary_author.name`: Name
- `primary_author.slug`: Slug
- `primary_author.email`: Email (email)
- `primary_author.status`: Status
- `primary_author.profile_image`: Profile Image (image)
- `primary_author.bio`: Bio
- `primary_author.website`: Website (url)
- `primary_author.location`: Location
- `primary_author.url`: Author Page URL (url)
- `show_title_and_feature_image`: Show Title and Feature Image (boolean)

### `ghost_delete_page`

**Delete Page.** Permanently deletes a static page by ID; it cannot be restored. Prefer Update Page with Status Draft to take it off the site. A retry fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The page ID, from List Pages. |

Output fields:

- `success`: Success (boolean)
- `page_id`: Page ID

### `ghost_list_tags`

**List Tags.** Lists post tags with their post counts and pagination totals, optionally narrowed by an NQL filter such as visibility:public. Use it to find a tag ID or slug. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. visibility:public or name:~'news'. Quote values that contain spaces or special characters with single quotes. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |
| `page` | number | no | `1` | Page. The page number to return. Defaults to 1. |
| `order` | string | no |  | Order. Sort order as "<field> asc\|desc", e.g. name asc. |

Output fields:

- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].slug`: Slug
- `tags[].description`: Description
- `tags[].visibility`: Visibility
- `tags[].accent_color`: Accent Color
- `tags[].feature_image`: Feature Image (image)
- `tags[].meta_title`: Meta Title
- `tags[].meta_description`: Meta Description
- `tags[].url`: URL (url)
- `tags[].created_at`: Created At (datetime)
- `tags[].updated_at`: Updated At (datetime)
- `tags[].count`: Count
- `tags[].count.posts`: Posts (number)
- `page`: Page (number)
- `limit`: Limit
- `total_pages`: Total Pages (number)
- `total`: Total (number)
- `next`: Next Page (number)
- `prev`: Previous Page (number)

### `ghost_get_tag`

**Get Tag.** Returns one tag by ID with its description, visibility and post count. Use Get Tag by Slug when only the slug is known. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag ID. The tag ID, from List Tags. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `visibility`: Visibility
- `accent_color`: Accent Color
- `feature_image`: Feature Image (image)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `url`: URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `count`: Count
- `count.posts`: Posts (number)

### `ghost_get_tag_by_slug`

**Get Tag by Slug.** Returns one tag by its slug, e.g. "news" from /tag/news/, with its post count. Use Get Tag when the ID is known. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `slug` | string | yes |  | Slug. The tag slug, e.g. "news". |

Output fields:

- `id`: Tag ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `visibility`: Visibility
- `accent_color`: Accent Color
- `feature_image`: Feature Image (image)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `url`: URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `count`: Count
- `count.posts`: Posts (number)

### `ghost_create_tag`

**Create Tag.** Creates a post tag. Not needed before tagging a post, because Create Post and Update Post create missing tags by name. Each call creates a new tag, so check List Tags first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The tag name. Start it with # to make an internal tag that is hidden from readers. |
| `slug` | string | no |  | Slug. The URL slug. Ghost generates one from the name when empty. |
| `description` | string | no |  | Description. The tag description shown on its archive page. |
| `accent_color` | string | no |  | Accent Color. A hex color, e.g. #FF5733. |
| `meta_title` | string | no |  | Meta Title. The SEO title of the tag page. |
| `meta_description` | string | no |  | Meta Description. The SEO description of the tag page. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `visibility`: Visibility
- `accent_color`: Accent Color
- `feature_image`: Feature Image (image)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `url`: URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `ghost_update_tag`

**Update Tag.** Edits a tag by ID; only the inputs you supply change, and Clear Fields blanks the description, accent color or SEO fields. Changing the slug changes the tag page URL. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag ID. The tag ID, from List Tags. |
| `name` | string | no |  | Name. The tag name. Start it with # to make an internal tag that is hidden from readers. |
| `slug` | string | no |  | Slug. The URL slug. Ghost generates one from the name when empty. |
| `description` | string | no |  | Description. The tag description shown on its archive page. |
| `accent_color` | string | no |  | Accent Color. A hex color, e.g. #FF5733. |
| `meta_title` | string | no |  | Meta Title. The SEO title of the tag page. |
| `meta_description` | string | no |  | Meta Description. The SEO description of the tag page. |
| `clear_fields` | array | no |  | Clear Fields. Fields to blank out on the record. A field listed here must not also be given a new value. Leave empty to clear nothing. One of `"description"`, `"accent_color"`, `"meta_title"`, `"meta_description"`. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `visibility`: Visibility
- `accent_color`: Accent Color
- `feature_image`: Feature Image (image)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `url`: URL (url)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `ghost_delete_tag`

**Delete Tag.** Permanently deletes a tag and removes it from every post that has it; the posts themselves stay. It cannot be restored, and a retry fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag ID. The tag ID, from List Tags. |

Output fields:

- `success`: Success (boolean)
- `tag_id`: Tag ID

### `ghost_list_members`

**List Members.** Lists members with their labels, newsletters and status and pagination totals. Narrow with an NQL filter (status:paid, label:vip, subscribed:true) or a free-text Search on name and email. Use Get Member by Email for an exact email. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. status:paid+label:vip. Quote values that contain spaces or special characters with single quotes. |
| `search` | string | no |  | Search. Free-text search on member name and email. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |
| `page` | number | no | `1` | Page. The page number to return. Defaults to 1. |
| `order` | string | no |  | Order. Sort order as "<field> asc\|desc", e.g. created_at desc. |

Output fields:

- `members`: Members
- `members[].id`: Member ID
- `members[].uuid`: UUID
- `members[].email`: Email (email)
- `members[].name`: Name
- `members[].note`: Note
- `members[].status`: Status
- `members[].geolocation`: Geolocation
- `members[].email_count`: Emails Received (number)
- `members[].email_opened_count`: Emails Opened (number)
- `members[].email_open_rate`: Email Open Rate (number)
- `members[].last_seen_at`: Last Seen At (datetime)
- `members[].created_at`: Created At (datetime)
- `members[].updated_at`: Updated At (datetime)
- `members[].labels`: Labels
- `members[].labels[].id`: Label ID
- `members[].labels[].name`: Name
- `members[].labels[].slug`: Slug
- `members[].labels[].created_at`: Created At (datetime)
- `members[].labels[].updated_at`: Updated At (datetime)
- `members[].newsletters`: Newsletters
- `members[].newsletters[].id`: Newsletter ID
- `members[].newsletters[].name`: Name
- `members[].newsletters[].description`: Description
- `members[].newsletters[].status`: Status
- `members[].subscribed`: Subscribed (boolean)
- `members[].comped`: Comped (boolean)
- `members[].avatar_image`: Avatar Image (image)
- `page`: Page (number)
- `limit`: Limit
- `total_pages`: Total Pages (number)
- `total`: Total (number)
- `next`: Next Page (number)
- `prev`: Previous Page (number)

### `ghost_get_member`

**Get Member.** Returns one member by ID with labels, newsletter subscriptions, tiers and paid status. Use Get Member by Email when only the email is known. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Member ID. The member ID, from List Members or Get Member by Email. |

Output fields:

- `id`: Member ID
- `uuid`: UUID
- `email`: Email (email)
- `name`: Name
- `note`: Note
- `status`: Status
- `geolocation`: Geolocation
- `email_count`: Emails Received (number)
- `email_opened_count`: Emails Opened (number)
- `email_open_rate`: Email Open Rate (number)
- `last_seen_at`: Last Seen At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].slug`: Slug
- `labels[].created_at`: Created At (datetime)
- `labels[].updated_at`: Updated At (datetime)
- `newsletters`: Newsletters
- `newsletters[].id`: Newsletter ID
- `newsletters[].name`: Name
- `newsletters[].description`: Description
- `newsletters[].status`: Status
- `subscribed`: Subscribed (boolean)
- `comped`: Comped (boolean)
- `avatar_image`: Avatar Image (image)
- `tiers`: Tiers
- `unsubscribe_url`: Unsubscribe URL (url)
- `attribution`: Attribution
- `attribution.referrer_source`: Referrer Source
- `attribution.referrer_medium`: Referrer Medium
- `attribution.referrer_url`: Referrer URL (url)
- `attribution.url`: Signup Page URL (url)
- `attribution.title`: Signup Page Title

### `ghost_get_member_by_email`

**Get Member by Email.** Looks up a member by exact email address and returns found true with the member, or found false when no member has that email. Use it to check whether someone is already a member before Create Member. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The member email address. |

Output fields:

- `found`: Found (boolean)
- `member`: Member
- `member.id`: Member ID
- `member.uuid`: UUID
- `member.email`: Email (email)
- `member.name`: Name
- `member.note`: Note
- `member.status`: Status
- `member.geolocation`: Geolocation
- `member.email_count`: Emails Received (number)
- `member.email_opened_count`: Emails Opened (number)
- `member.email_open_rate`: Email Open Rate (number)
- `member.last_seen_at`: Last Seen At (datetime)
- `member.created_at`: Created At (datetime)
- `member.updated_at`: Updated At (datetime)
- `member.labels`: Labels
- `member.labels[].id`: Label ID
- `member.labels[].name`: Name
- `member.labels[].slug`: Slug
- `member.labels[].created_at`: Created At (datetime)
- `member.labels[].updated_at`: Updated At (datetime)
- `member.newsletters`: Newsletters
- `member.newsletters[].id`: Newsletter ID
- `member.newsletters[].name`: Name
- `member.newsletters[].description`: Description
- `member.newsletters[].status`: Status
- `member.subscribed`: Subscribed (boolean)
- `member.comped`: Comped (boolean)
- `member.avatar_image`: Avatar Image (image)

### `ghost_create_member`

**Create Member.** Adds a free member by email with optional name, note, labels (by name, created if missing) and newsletter IDs. Without Newsletter IDs Ghost subscribes the member to the newsletters that auto-subscribe new signups. Ghost rejects an email that is already a member, so use Get Member by Email first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The member email address. |
| `name` | string | no |  | Name. The member full name. |
| `note` | string | no |  | Note. A private note about the member, visible only to staff. |
| `labels` | array | no |  | Labels. Label names to apply. Missing labels are created. |
| `newsletter_ids` | array | no |  | Newsletter IDs. The newsletters to subscribe the member to, from List Newsletters. |

Output fields:

- `id`: Member ID
- `uuid`: UUID
- `email`: Email (email)
- `name`: Name
- `note`: Note
- `status`: Status
- `geolocation`: Geolocation
- `email_count`: Emails Received (number)
- `email_opened_count`: Emails Opened (number)
- `email_open_rate`: Email Open Rate (number)
- `last_seen_at`: Last Seen At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].slug`: Slug
- `labels[].created_at`: Created At (datetime)
- `labels[].updated_at`: Updated At (datetime)
- `newsletters`: Newsletters
- `newsletters[].id`: Newsletter ID
- `newsletters[].name`: Name
- `newsletters[].description`: Description
- `newsletters[].status`: Status
- `subscribed`: Subscribed (boolean)
- `comped`: Comped (boolean)
- `avatar_image`: Avatar Image (image)
- `tiers`: Tiers
- `unsubscribe_url`: Unsubscribe URL (url)
- `attribution`: Attribution
- `attribution.referrer_source`: Referrer Source
- `attribution.referrer_medium`: Referrer Medium
- `attribution.referrer_url`: Referrer URL (url)
- `attribution.url`: Signup Page URL (url)
- `attribution.title`: Signup Page Title

### `ghost_update_member`

**Update Member.** Edits a member by ID; only the inputs you supply change, and Clear Fields blanks the name or note. Labels and Newsletter IDs replace the full list, and an empty list removes all of them; to add or remove one item use Add Member Label, Remove Member Label, Subscribe Member to Newsletters or Unsubscribe Member from Newsletters. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Member ID. The member ID, from List Members or Get Member by Email. |
| `email` | string | no |  | Email. The new email address. |
| `name` | string | no |  | Name. The new full name. |
| `note` | string | no |  | Note. The new private staff note. |
| `labels` | array | no |  | Labels. The complete list of label names the member should have. Missing labels are created, and an empty list removes every label. |
| `newsletter_ids` | array | no |  | Newsletter IDs. The complete list of newsletter IDs the member should be subscribed to. An empty list unsubscribes the member from every newsletter. |
| `clear_fields` | array | no |  | Clear Fields. Fields to blank out on the record. A field listed here must not also be given a new value. Leave empty to clear nothing. One of `"name"`, `"note"`. |

Output fields:

- `id`: Member ID
- `uuid`: UUID
- `email`: Email (email)
- `name`: Name
- `note`: Note
- `status`: Status
- `geolocation`: Geolocation
- `email_count`: Emails Received (number)
- `email_opened_count`: Emails Opened (number)
- `email_open_rate`: Email Open Rate (number)
- `last_seen_at`: Last Seen At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].slug`: Slug
- `labels[].created_at`: Created At (datetime)
- `labels[].updated_at`: Updated At (datetime)
- `newsletters`: Newsletters
- `newsletters[].id`: Newsletter ID
- `newsletters[].name`: Name
- `newsletters[].description`: Description
- `newsletters[].status`: Status
- `subscribed`: Subscribed (boolean)
- `comped`: Comped (boolean)
- `avatar_image`: Avatar Image (image)
- `tiers`: Tiers
- `unsubscribe_url`: Unsubscribe URL (url)
- `attribution`: Attribution
- `attribution.referrer_source`: Referrer Source
- `attribution.referrer_medium`: Referrer Medium
- `attribution.referrer_url`: Referrer URL (url)
- `attribution.url`: Signup Page URL (url)
- `attribution.title`: Signup Page Title

### `ghost_delete_member`

**Delete Member.** Permanently deletes a member and their history; it cannot be restored. A paid member keeps being billed by Stripe unless Cancel Stripe Subscriptions is on. A retry fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Member ID. The member ID, from List Members or Get Member by Email. |
| `cancel_stripe_subscriptions` | boolean | no | `false` | Cancel Stripe Subscriptions. Also cancel the member paid Stripe subscriptions. Off by default. |

Output fields:

- `success`: Success (boolean)
- `member_id`: Member ID
- `stripe_subscriptions_cancelled`: Stripe Subscriptions Cancelled (boolean)

### `ghost_add_member_label`

**Add Member Label.** Adds one existing label to a member without touching their other labels, and returns the updated member. Get the label ID from List Labels or Create Label. Adding a label the member already has is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Member ID. The member ID, from List Members or Get Member by Email. |
| `label_id` | string | yes |  | Label ID. The label ID, from List Labels. |

Output fields:

- `id`: Member ID
- `uuid`: UUID
- `email`: Email (email)
- `name`: Name
- `note`: Note
- `status`: Status
- `geolocation`: Geolocation
- `email_count`: Emails Received (number)
- `email_opened_count`: Emails Opened (number)
- `email_open_rate`: Email Open Rate (number)
- `last_seen_at`: Last Seen At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].slug`: Slug
- `labels[].created_at`: Created At (datetime)
- `labels[].updated_at`: Updated At (datetime)
- `newsletters`: Newsletters
- `newsletters[].id`: Newsletter ID
- `newsletters[].name`: Name
- `newsletters[].description`: Description
- `newsletters[].status`: Status
- `subscribed`: Subscribed (boolean)
- `comped`: Comped (boolean)
- `avatar_image`: Avatar Image (image)
- `tiers`: Tiers
- `unsubscribe_url`: Unsubscribe URL (url)
- `attribution`: Attribution
- `attribution.referrer_source`: Referrer Source
- `attribution.referrer_medium`: Referrer Medium
- `attribution.referrer_url`: Referrer URL (url)
- `attribution.url`: Signup Page URL (url)
- `attribution.title`: Signup Page Title

### `ghost_remove_member_label`

**Remove Member Label.** Removes one label from a member without touching their other labels, and returns the updated member. The label itself is kept; use Delete Label to remove it everywhere. Removing a label the member does not have is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Member ID. The member ID, from List Members or Get Member by Email. |
| `label_id` | string | yes |  | Label ID. The label ID, from List Labels or Get Member. |

Output fields:

- `id`: Member ID
- `uuid`: UUID
- `email`: Email (email)
- `name`: Name
- `note`: Note
- `status`: Status
- `geolocation`: Geolocation
- `email_count`: Emails Received (number)
- `email_opened_count`: Emails Opened (number)
- `email_open_rate`: Email Open Rate (number)
- `last_seen_at`: Last Seen At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].slug`: Slug
- `labels[].created_at`: Created At (datetime)
- `labels[].updated_at`: Updated At (datetime)
- `newsletters`: Newsletters
- `newsletters[].id`: Newsletter ID
- `newsletters[].name`: Name
- `newsletters[].description`: Description
- `newsletters[].status`: Status
- `subscribed`: Subscribed (boolean)
- `comped`: Comped (boolean)
- `avatar_image`: Avatar Image (image)
- `tiers`: Tiers
- `unsubscribe_url`: Unsubscribe URL (url)
- `attribution`: Attribution
- `attribution.referrer_source`: Referrer Source
- `attribution.referrer_medium`: Referrer Medium
- `attribution.referrer_url`: Referrer URL (url)
- `attribution.url`: Signup Page URL (url)
- `attribution.title`: Signup Page Title

### `ghost_subscribe_member_to_newsletters`

**Subscribe Member to Newsletters.** Subscribes a member to one or more newsletters while keeping their current subscriptions, and returns the updated member. Newsletter IDs come from List Newsletters. Re-subscribing is a no-op. Ghost has no single-newsletter subscribe call, so this reads the member subscription list and saves it back in one step; a change to that member subscription list made in the same moment can be overwritten. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Member ID. The member ID, from List Members or Get Member by Email. |
| `newsletter_ids` | array | yes |  | Newsletter IDs. The newsletters to add, from List Newsletters. |

Output fields:

- `id`: Member ID
- `uuid`: UUID
- `email`: Email (email)
- `name`: Name
- `note`: Note
- `status`: Status
- `geolocation`: Geolocation
- `email_count`: Emails Received (number)
- `email_opened_count`: Emails Opened (number)
- `email_open_rate`: Email Open Rate (number)
- `last_seen_at`: Last Seen At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].slug`: Slug
- `labels[].created_at`: Created At (datetime)
- `labels[].updated_at`: Updated At (datetime)
- `newsletters`: Newsletters
- `newsletters[].id`: Newsletter ID
- `newsletters[].name`: Name
- `newsletters[].description`: Description
- `newsletters[].status`: Status
- `subscribed`: Subscribed (boolean)
- `comped`: Comped (boolean)
- `avatar_image`: Avatar Image (image)
- `tiers`: Tiers
- `unsubscribe_url`: Unsubscribe URL (url)
- `attribution`: Attribution
- `attribution.referrer_source`: Referrer Source
- `attribution.referrer_medium`: Referrer Medium
- `attribution.referrer_url`: Referrer URL (url)
- `attribution.url`: Signup Page URL (url)
- `attribution.title`: Signup Page Title

### `ghost_unsubscribe_member_from_newsletters`

**Unsubscribe Member from Newsletters.** Unsubscribes a member from the given newsletters, or from every newsletter when Unsubscribe from All is on, keeping the member account. Each newsletter is removed on its own in Ghost, so a subscription added to the member at the same time is never lost. Returns the updated member. Unsubscribing twice is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `member_id` | string | yes |  | Member ID. The member ID, from List Members or Get Member by Email. |
| `newsletter_ids` | array | no |  | Newsletter IDs. The newsletters to remove, from Get Member or List Newsletters. |
| `unsubscribe_from_all` | boolean | no | `false` | Unsubscribe from All. Remove every newsletter subscription. Newsletter IDs are ignored when on. |

Output fields:

- `id`: Member ID
- `uuid`: UUID
- `email`: Email (email)
- `name`: Name
- `note`: Note
- `status`: Status
- `geolocation`: Geolocation
- `email_count`: Emails Received (number)
- `email_opened_count`: Emails Opened (number)
- `email_open_rate`: Email Open Rate (number)
- `last_seen_at`: Last Seen At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].slug`: Slug
- `labels[].created_at`: Created At (datetime)
- `labels[].updated_at`: Updated At (datetime)
- `newsletters`: Newsletters
- `newsletters[].id`: Newsletter ID
- `newsletters[].name`: Name
- `newsletters[].description`: Description
- `newsletters[].status`: Status
- `subscribed`: Subscribed (boolean)
- `comped`: Comped (boolean)
- `avatar_image`: Avatar Image (image)
- `tiers`: Tiers
- `unsubscribe_url`: Unsubscribe URL (url)
- `attribution`: Attribution
- `attribution.referrer_source`: Referrer Source
- `attribution.referrer_medium`: Referrer Medium
- `attribution.referrer_url`: Referrer URL (url)
- `attribution.url`: Signup Page URL (url)
- `attribution.title`: Signup Page Title

### `ghost_list_labels`

**List Labels.** Lists member labels (not post tags) with member counts and pagination totals. Use it to find the label ID that Add Member Label and Remove Member Label need. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. name:~'vip'. Quote values that contain spaces or special characters with single quotes. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |
| `page` | number | no | `1` | Page. The page number to return. Defaults to 1. |
| `order` | string | no |  | Order. Sort order as "<field> asc\|desc", e.g. name asc. |

Output fields:

- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].slug`: Slug
- `labels[].created_at`: Created At (datetime)
- `labels[].updated_at`: Updated At (datetime)
- `labels[].count`: Count
- `labels[].count.members`: Members (number)
- `page`: Page (number)
- `limit`: Limit
- `total_pages`: Total Pages (number)
- `total`: Total (number)
- `next`: Next Page (number)
- `prev`: Previous Page (number)

### `ghost_get_label`

**Get Label.** Returns one member label by ID with its name, slug and member count. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The label ID, from List Labels. |

Output fields:

- `id`: Label ID
- `name`: Name
- `slug`: Slug
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `count`: Count
- `count.members`: Members (number)

### `ghost_create_label`

**Create Label.** Creates a member label used to segment members. Ghost rejects a duplicate name, so check List Labels first. Returns the label ID for Add Member Label. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The label name. |

Output fields:

- `id`: Label ID
- `name`: Name
- `slug`: Slug
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `ghost_update_label`

**Update Label.** Renames a member label by ID; members keep the label. Filters that reference the old label slug may stop matching. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The label ID, from List Labels. |
| `name` | string | no |  | Name. The new label name. |
| `slug` | string | no |  | Slug. The new label slug. |

Output fields:

- `id`: Label ID
- `name`: Name
- `slug`: Slug
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `ghost_delete_label`

**Delete Label.** Permanently deletes a member label and removes it from every member; the members stay. It cannot be restored, and a retry fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The label ID, from List Labels. |

Output fields:

- `success`: Success (boolean)
- `label_id`: Label ID

### `ghost_list_newsletters`

**List Newsletters.** Lists newsletters with their ID, slug, status and settings. The slug is what Publish Post and Schedule Post need to email a post, and the ID is what the member subscribe actions need. Filter status:active to hide archived ones. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. status:active. Quote values that contain spaces or special characters with single quotes. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |
| `page` | number | no | `1` | Page. The page number to return. Defaults to 1. |
| `order` | string | no |  | Order. Sort order as "<field> asc\|desc", e.g. sort_order asc. |

Output fields:

- `newsletters`: Newsletters
- `newsletters[].id`: Newsletter ID
- `newsletters[].uuid`: UUID
- `newsletters[].name`: Name
- `newsletters[].slug`: Slug
- `newsletters[].description`: Description
- `newsletters[].status`: Status
- `newsletters[].visibility`: Visibility
- `newsletters[].subscribe_on_signup`: Subscribe on Signup (boolean)
- `newsletters[].sender_name`: Sender Name
- `newsletters[].sender_email`: Sender Email (email)
- `newsletters[].sender_reply_to`: Reply To
- `newsletters[].sort_order`: Sort Order (number)
- `newsletters[].created_at`: Created At (datetime)
- `newsletters[].updated_at`: Updated At (datetime)
- `page`: Page (number)
- `limit`: Limit
- `total_pages`: Total Pages (number)
- `total`: Total (number)
- `next`: Next Page (number)
- `prev`: Previous Page (number)

### `ghost_get_newsletter`

**Get Newsletter.** Returns one newsletter by ID with its slug, status, sender and design settings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `newsletter_id` | string | yes |  | Newsletter ID. The newsletter ID, from List Newsletters. |

Output fields:

- `id`: Newsletter ID
- `uuid`: UUID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `status`: Status
- `visibility`: Visibility
- `subscribe_on_signup`: Subscribe on Signup (boolean)
- `sender_name`: Sender Name
- `sender_email`: Sender Email (email)
- `sender_reply_to`: Reply To
- `sort_order`: Sort Order (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `ghost_create_newsletter`

**Create Newsletter.** Creates a newsletter members can subscribe to; it changes the public signup options of the site. Opt In Existing Members subscribes every current member at once. The sender email is not set here because Ghost must verify it by email first. Each call creates a new newsletter. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The newsletter name. |
| `description` | string | no |  | Description. A description shown to members when they choose newsletters. |
| `sender_name` | string | no |  | Sender Name. The From name of the emails. Defaults to the site title. |
| `sender_reply_to` | string | no |  | Reply-To. Where member replies go. One of `"newsletter"`, `"support"`. |
| `visibility` | string | no |  | Audience. Who can subscribe to the newsletter. One of `"members"`, `"paid"`. |
| `subscribe_on_signup` | string | no |  | Subscribe on Signup. Automatically subscribe new members to this newsletter. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `opt_in_existing` | boolean | no | `false` | Opt In Existing Members. Subscribe every existing member who is subscribed to at least one newsletter. |

Output fields:

- `id`: Newsletter ID
- `uuid`: UUID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `status`: Status
- `visibility`: Visibility
- `subscribe_on_signup`: Subscribe on Signup (boolean)
- `sender_name`: Sender Name
- `sender_email`: Sender Email (email)
- `sender_reply_to`: Reply To
- `sort_order`: Sort Order (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `ghost_update_newsletter`

**Update Newsletter.** Edits a newsletter by ID; only the inputs you supply change, and Clear Fields blanks the description or sender name. It cannot archive the newsletter (use Archive Newsletter) or change the sender email, which Ghost must verify by email first. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `newsletter_id` | string | yes |  | Newsletter ID. The newsletter ID, from List Newsletters. |
| `name` | string | no |  | Name. The newsletter name. |
| `description` | string | no |  | Description. A description shown to members when they choose newsletters. |
| `sender_name` | string | no |  | Sender Name. The From name of the emails. Defaults to the site title. |
| `sender_reply_to` | string | no |  | Reply-To. Where member replies go. One of `"newsletter"`, `"support"`. |
| `visibility` | string | no |  | Audience. Who can subscribe to the newsletter. One of `"members"`, `"paid"`. |
| `subscribe_on_signup` | string | no |  | Subscribe on Signup. Automatically subscribe new members to this newsletter. Leave empty to keep the current value. One of `"true"`, `"false"`. |
| `clear_fields` | array | no |  | Clear Fields. Fields to blank out on the record. A field listed here must not also be given a new value. Leave empty to clear nothing. One of `"description"`, `"sender_name"`. |

Output fields:

- `id`: Newsletter ID
- `uuid`: UUID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `status`: Status
- `visibility`: Visibility
- `subscribe_on_signup`: Subscribe on Signup (boolean)
- `sender_name`: Sender Name
- `sender_email`: Sender Email (email)
- `sender_reply_to`: Reply To
- `sort_order`: Sort Order (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `ghost_archive_newsletter`

**Archive Newsletter.** Archives a newsletter: members can no longer subscribe and posts can no longer be emailed to it. Staff can reactivate it in Ghost Admin. Archiving an archived newsletter is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `newsletter_id` | string | yes |  | Newsletter ID. The newsletter ID, from List Newsletters. |

Output fields:

- `id`: Newsletter ID
- `uuid`: UUID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `status`: Status
- `visibility`: Visibility
- `subscribe_on_signup`: Subscribe on Signup (boolean)
- `sender_name`: Sender Name
- `sender_email`: Sender Email (email)
- `sender_reply_to`: Reply To
- `sort_order`: Sort Order (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `ghost_list_tiers`

**List Tiers.** Lists membership tiers (the free tier and paid tiers) with prices, benefits and active state. Filter type:paid+active:true for sellable paid tiers. The tier ID is what Create Offer needs. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. type:paid+active:true. Quote values that contain spaces or special characters with single quotes. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |
| `page` | number | no | `1` | Page. The page number to return. Defaults to 1. |
| `order` | string | no |  | Order. Sort order as "<field> asc\|desc", e.g. monthly_price asc. |

Output fields:

- `tiers`: Tiers
- `tiers[].id`: Tier ID
- `tiers[].name`: Name
- `tiers[].slug`: Slug
- `tiers[].description`: Description
- `tiers[].type`: Type
- `tiers[].active`: Active (boolean)
- `tiers[].visibility`: Visibility
- `tiers[].welcome_page_url`: Welcome Page URL (url)
- `tiers[].trial_days`: Trial Days (number)
- `tiers[].benefits`: Benefits
- `tiers[].created_at`: Created At (datetime)
- `tiers[].updated_at`: Updated At (datetime)
- `tiers[].currency`: Currency
- `tiers[].monthly_price`: Monthly Price (cents) (number)
- `tiers[].yearly_price`: Yearly Price (cents) (number)
- `page`: Page (number)
- `limit`: Limit
- `total_pages`: Total Pages (number)
- `total`: Total (number)
- `next`: Next Page (number)
- `prev`: Previous Page (number)

### `ghost_get_tier`

**Get Tier.** Returns one membership tier by ID with its prices, currency, benefits, visibility and active state. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tier_id` | string | yes |  | Tier ID. The tier ID, from List Tiers. |

Output fields:

- `id`: Tier ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `type`: Type
- `active`: Active (boolean)
- `visibility`: Visibility
- `welcome_page_url`: Welcome Page URL (url)
- `trial_days`: Trial Days (number)
- `benefits`: Benefits
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `currency`: Currency
- `monthly_price`: Monthly Price (cents) (number)
- `yearly_price`: Yearly Price (cents) (number)

### `ghost_create_tier`

**Create Tier.** Creates a paid membership tier with prices in the smallest currency unit; a public tier appears on the site pricing page right away, so confirm pricing before calling. Selling it needs Stripe connected in Ghost. Each call creates a new tier. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The tier name shown on the pricing page. |
| `description` | string | no |  | Description. A short description shown on the pricing page. |
| `monthly_price` | number | no |  | Monthly Price. The monthly price in the smallest currency unit, e.g. 500 for 5.00 USD. |
| `yearly_price` | number | no |  | Yearly Price. The yearly price in the smallest currency unit, e.g. 5000 for 50.00 USD. |
| `currency` | string | no |  | Currency. The three-letter currency code, e.g. usd. Required with a price. |
| `benefits` | array | no |  | Benefits. The benefit lines shown on the pricing page. |
| `visibility` | string | no |  | Visibility. Whether the tier is shown on the public pricing page. One of `"public"`, `"none"`. |
| `welcome_page_url` | string | no |  | Welcome Page URL. Where new subscribers of this tier land after signup. |
| `trial_days` | number | no |  | Trial Days. The free trial length in days. 0 for no trial. |

Output fields:

- `id`: Tier ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `type`: Type
- `active`: Active (boolean)
- `visibility`: Visibility
- `welcome_page_url`: Welcome Page URL (url)
- `trial_days`: Trial Days (number)
- `benefits`: Benefits
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `currency`: Currency
- `monthly_price`: Monthly Price (cents) (number)
- `yearly_price`: Yearly Price (cents) (number)

### `ghost_update_tier`

**Update Tier.** Edits a membership tier by ID; only the inputs you supply change, Benefits replaces the full list (an empty list removes every benefit), and Clear Fields blanks the description or welcome page URL. New prices apply to new subscribers only and change the public pricing page. Use Archive Tier to stop selling it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tier_id` | string | yes |  | Tier ID. The tier ID, from List Tiers. |
| `name` | string | no |  | Name. The tier name shown on the pricing page. |
| `description` | string | no |  | Description. A short description shown on the pricing page. |
| `monthly_price` | number | no |  | Monthly Price. The monthly price in the smallest currency unit, e.g. 500 for 5.00 USD. |
| `yearly_price` | number | no |  | Yearly Price. The yearly price in the smallest currency unit, e.g. 5000 for 50.00 USD. |
| `currency` | string | no |  | Currency. The three-letter currency code, e.g. usd. Required with a price. |
| `benefits` | array | no |  | Benefits. The benefit lines shown on the pricing page. Supplying benefits replaces the full list, and an empty list removes every benefit. |
| `visibility` | string | no |  | Visibility. Whether the tier is shown on the public pricing page. One of `"public"`, `"none"`. |
| `welcome_page_url` | string | no |  | Welcome Page URL. Where new subscribers of this tier land after signup. |
| `trial_days` | number | no |  | Trial Days. The free trial length in days. 0 for no trial. |
| `clear_fields` | array | no |  | Clear Fields. Fields to blank out on the record. A field listed here must not also be given a new value. Leave empty to clear nothing. One of `"description"`, `"welcome_page_url"`. |

Output fields:

- `id`: Tier ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `type`: Type
- `active`: Active (boolean)
- `visibility`: Visibility
- `welcome_page_url`: Welcome Page URL (url)
- `trial_days`: Trial Days (number)
- `benefits`: Benefits
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `currency`: Currency
- `monthly_price`: Monthly Price (cents) (number)
- `yearly_price`: Yearly Price (cents) (number)

### `ghost_archive_tier`

**Archive Tier.** Archives a paid membership tier: it disappears from the pricing page and cannot be bought, while existing subscribers keep it. Staff can reactivate it in Ghost Admin. Archiving an archived tier is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tier_id` | string | yes |  | Tier ID. The tier ID, from List Tiers. |

Output fields:

- `id`: Tier ID
- `name`: Name
- `slug`: Slug
- `description`: Description
- `type`: Type
- `active`: Active (boolean)
- `visibility`: Visibility
- `welcome_page_url`: Welcome Page URL (url)
- `trial_days`: Trial Days (number)
- `benefits`: Benefits
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `currency`: Currency
- `monthly_price`: Monthly Price (cents) (number)
- `yearly_price`: Yearly Price (cents) (number)

### `ghost_list_offers`

**List Offers.** Lists all discount and free-trial offers with their code, discount, duration, tier and status in one call; Ghost does not paginate offers. Filter status:active to hide archived ones. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. status:active. Quote values that contain spaces or special characters with single quotes. |

Output fields:

- `offers`: Offers
- `offers[].id`: Offer ID
- `offers[].name`: Name
- `offers[].code`: Code
- `offers[].display_title`: Display Title
- `offers[].display_description`: Display Description
- `offers[].type`: Discount Type
- `offers[].amount`: Amount (number)
- `offers[].currency`: Currency
- `offers[].cadence`: Cadence
- `offers[].duration`: Duration
- `offers[].duration_in_months`: Duration in Months (number)
- `offers[].status`: Status
- `offers[].redemption_count`: Redemptions (number)
- `offers[].redemption_type`: Redemption Type
- `offers[].created_at`: Created At (datetime)
- `offers[].last_redeemed`: Last Redeemed (datetime)
- `offers[].tier`: Tier
- `offers[].tier.id`: Tier ID
- `offers[].tier.name`: Name
- `count`: Count (number)

### `ghost_get_offer`

**Get Offer.** Returns one offer by ID with its code, discount type and amount, duration, cadence, tier and redemption count. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `offer_id` | string | yes |  | Offer ID. The offer ID, from List Offers. |

Output fields:

- `id`: Offer ID
- `name`: Name
- `code`: Code
- `display_title`: Display Title
- `display_description`: Display Description
- `type`: Discount Type
- `amount`: Amount (number)
- `currency`: Currency
- `cadence`: Cadence
- `duration`: Duration
- `duration_in_months`: Duration in Months (number)
- `status`: Status
- `redemption_count`: Redemptions (number)
- `redemption_type`: Redemption Type
- `created_at`: Created At (datetime)
- `last_redeemed`: Last Redeemed (datetime)
- `tier`: Tier
- `tier.id`: Tier ID
- `tier.name`: Name

### `ghost_create_offer`

**Create Offer.** Creates a public discount or free-trial offer on a paid tier; anyone with the code or offer link can redeem it, so confirm the terms before calling. Percent and fixed offers need Duration, and a fixed offer needs Currency. Ghost rejects a code already in use. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The internal offer name. |
| `code` | string | yes |  | Code. The code used in the offer URL, e.g. black-friday. |
| `tier_id` | string | yes |  | Tier ID. The paid tier the offer applies to, from List Tiers. |
| `cadence` | string | yes |  | Cadence. Whether the offer applies to the monthly or the yearly price. One of `"month"`, `"year"`. |
| `type` | string | yes |  | Type. Percentage discount, fixed amount off, or a free trial. One of `"percent"`, `"fixed"`, `"trial"`. |
| `amount` | number | yes |  | Amount. Percent: 1 to 100. Fixed: the amount off in the smallest currency unit (500 = 5.00). Trial: the number of free days. |
| `duration` | string | no |  | Duration. How long a percent or fixed discount lasts. Ignored for trials. One of `"once"`, `"repeating"`, `"forever"`. |
| `duration_in_months` | number | no |  | Duration in Months. Required when Duration is Several months. |
| `currency` | string | no |  | Currency. The three-letter currency code of a fixed discount, e.g. usd. |
| `display_title` | string | no |  | Display Title. The headline shown to visitors on the offer page. |
| `display_description` | string | no |  | Display Description. The text shown to visitors on the offer page. |

Output fields:

- `id`: Offer ID
- `name`: Name
- `code`: Code
- `display_title`: Display Title
- `display_description`: Display Description
- `type`: Discount Type
- `amount`: Amount (number)
- `currency`: Currency
- `cadence`: Cadence
- `duration`: Duration
- `duration_in_months`: Duration in Months (number)
- `status`: Status
- `redemption_count`: Redemptions (number)
- `redemption_type`: Redemption Type
- `created_at`: Created At (datetime)
- `last_redeemed`: Last Redeemed (datetime)
- `tier`: Tier
- `tier.id`: Tier ID

### `ghost_update_offer`

**Update Offer.** Edits an offer by ID; only the name, code and display text can change, not the discount terms, and Clear Fields blanks the display description. Changing the code breaks links that use the old code. Use Archive Offer to stop redemptions. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `offer_id` | string | yes |  | Offer ID. The offer ID, from List Offers. |
| `name` | string | no |  | Name. The new internal name. |
| `code` | string | no |  | Code. The new offer code. |
| `display_title` | string | no |  | Display Title. The new headline shown on the offer page. |
| `display_description` | string | no |  | Display Description. The new text shown on the offer page. |
| `clear_fields` | array | no |  | Clear Fields. Fields to blank out on the record. A field listed here must not also be given a new value. Leave empty to clear nothing. One of `"display_description"`. |

Output fields:

- `id`: Offer ID
- `name`: Name
- `code`: Code
- `display_title`: Display Title
- `display_description`: Display Description
- `type`: Discount Type
- `amount`: Amount (number)
- `currency`: Currency
- `cadence`: Cadence
- `duration`: Duration
- `duration_in_months`: Duration in Months (number)
- `status`: Status
- `redemption_count`: Redemptions (number)
- `redemption_type`: Redemption Type
- `created_at`: Created At (datetime)
- `last_redeemed`: Last Redeemed (datetime)
- `tier`: Tier
- `tier.id`: Tier ID
- `tier.name`: Name

### `ghost_archive_offer`

**Archive Offer.** Archives an offer: its link and code stop working for new redemptions, while members who already redeemed it keep their discount. Staff can reactivate it in Ghost Admin. Archiving an archived offer is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `offer_id` | string | yes |  | Offer ID. The offer ID, from List Offers. |

Output fields:

- `id`: Offer ID
- `name`: Name
- `code`: Code
- `display_title`: Display Title
- `display_description`: Display Description
- `type`: Discount Type
- `amount`: Amount (number)
- `currency`: Currency
- `cadence`: Cadence
- `duration`: Duration
- `duration_in_months`: Duration in Months (number)
- `status`: Status
- `redemption_count`: Redemptions (number)
- `redemption_type`: Redemption Type
- `created_at`: Created At (datetime)
- `last_redeemed`: Last Redeemed (datetime)
- `tier`: Tier
- `tier.id`: Tier ID
- `tier.name`: Name

### `ghost_list_users`

**List Users.** Lists staff users (owner, admins, editors, authors, contributors), not members, with their roles and post counts. Use it to find the author IDs that Create Post and Update Post accept. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. status:active. Quote values that contain spaces or special characters with single quotes. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |
| `page` | number | no | `1` | Page. The page number to return. Defaults to 1. |
| `order` | string | no |  | Order. Sort order as "<field> asc\|desc", e.g. name asc. |

Output fields:

- `users`: Users
- `users[].id`: User ID
- `users[].name`: Name
- `users[].slug`: Slug
- `users[].email`: Email (email)
- `users[].status`: Status
- `users[].profile_image`: Profile Image (image)
- `users[].bio`: Bio
- `users[].website`: Website (url)
- `users[].location`: Location
- `users[].url`: Author Page URL (url)
- `users[].cover_image`: Cover Image (image)
- `users[].last_seen`: Last Seen (datetime)
- `users[].created_at`: Created At (datetime)
- `users[].updated_at`: Updated At (datetime)
- `users[].roles`: Roles
- `users[].roles[].id`: Role ID
- `users[].roles[].name`: Name
- `users[].roles[].description`: Description
- `users[].count`: Count
- `users[].count.posts`: Posts (number)
- `page`: Page (number)
- `limit`: Limit
- `total_pages`: Total Pages (number)
- `total`: Total (number)
- `next`: Next Page (number)
- `prev`: Previous Page (number)

### `ghost_get_user`

**Get User.** Returns one staff user by ID with their name, email, slug, bio, roles and post count. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. The staff user ID, from List Users. |

Output fields:

- `id`: User ID
- `name`: Name
- `slug`: Slug
- `email`: Email (email)
- `status`: Status
- `profile_image`: Profile Image (image)
- `bio`: Bio
- `website`: Website (url)
- `location`: Location
- `url`: Author Page URL (url)
- `cover_image`: Cover Image (image)
- `last_seen`: Last Seen (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `roles`: Roles
- `roles[].id`: Role ID
- `roles[].name`: Name
- `roles[].description`: Description
- `count`: Count
- `count.posts`: Posts (number)

### `ghost_get_user_by_email`

**Get User by Email.** Looks up a staff user (not a member) by exact email and returns found true with the user, or found false. Use Get Member by Email for members. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The staff user email address. |

Output fields:

- `found`: Found (boolean)
- `user`: User
- `user.id`: User ID
- `user.name`: Name
- `user.slug`: Slug
- `user.email`: Email (email)
- `user.status`: Status
- `user.profile_image`: Profile Image (image)
- `user.bio`: Bio
- `user.website`: Website (url)
- `user.location`: Location
- `user.url`: Author Page URL (url)
- `user.cover_image`: Cover Image (image)
- `user.last_seen`: Last Seen (datetime)
- `user.created_at`: Created At (datetime)
- `user.updated_at`: Updated At (datetime)
- `user.roles`: Roles
- `user.roles[].id`: Role ID
- `user.roles[].name`: Name
- `user.roles[].description`: Description
- `user.count`: Count
- `user.count.posts`: Posts (number)

### `ghost_upload_image`

**Upload Image.** Uploads a PNG, JPG, GIF, WebP, SVG or ICO image to the Ghost media library and returns its public URL, to use as a post Feature Image URL or inside post HTML. Each call stores a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Image. The image file to upload. Files are not supported; an action that needs one fails. |
| `purpose` | string | no | `"image"` | Purpose. How Ghost validates the image. Defaults to a content image. One of `"image"`, `"profile_image"`, `"icon"`. |
| `ref` | string | no |  | Reference. An optional value returned unchanged, e.g. the original file name. |

Output fields:

- `url`: Image URL (image)
- `ref`: Reference

### `ghost_get_site`

**Get Site.** Returns basic site information: title, description, public URL, logo, icon, accent color and Ghost version. Use it to confirm which publication the connection points at. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `title`: Title
- `description`: Description
- `url`: URL (url)
- `version`: Ghost Version
- `locale`: Locale
- `timezone`: Timezone
- `accent_color`: Accent Color
- `logo`: Logo (image)
- `icon`: Icon (image)
- `cover_image`: Cover Image (image)
- `allow_external_signup`: Allows External Signup (boolean)
- `site_uuid`: Site UUID

### `ghost_upload_media`

**Upload Media.** Uploads an MP4, WebM, OGV, MP3, WAV, OGG or M4A file to the Ghost media library and returns its public URL, to embed in post HTML as a video or audio card. Use Upload Image for pictures and Upload File for any other download. Each call stores a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Media File. The video or audio file to upload. Files are not supported; an action that needs one fails. |
| `ref` | string | no |  | Reference. An optional value returned unchanged, e.g. the original file name. |

Output fields:

- `url`: Media URL (url)
- `thumbnail_url`: Thumbnail URL (image)
- `ref`: Reference

### `ghost_upload_file`

**Upload File.** Uploads a file such as a PDF, ZIP, CSV, DOCX or EPUB to Ghost and returns its public URL, to link from a post as a file card or download. Ghost only accepts known extensions; zip anything else. Use Upload Image or Upload Media for pictures, video and audio. Each call stores a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload. Its name must end with a supported extension, e.g. .pdf or .zip. Files are not supported; an action that needs one fails. |
| `ref` | string | no |  | Reference. An optional value returned unchanged, e.g. the original file name. |

Output fields:

- `url`: File URL (url)
- `ref`: Reference

### `ghost_get_settings`

**Get Settings.** Returns the publication settings an editor needs: title, description, branding images, accent color, locale and timezone, SEO and social meta, navigation menus, active theme, and membership, portal, comments and email-tracking options. Secrets such as Stripe or Mailgun keys and the site password are never returned. Use Get Site for the Ghost version and URL. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `title`: Title
- `description`: Description
- `timezone`: Timezone
- `locale`: Locale
- `accent_color`: Accent Color
- `logo`: Logo (image)
- `icon`: Icon (image)
- `cover_image`: Cover Image (image)
- `meta_title`: Meta Title
- `meta_description`: Meta Description
- `og_image`: Open Graph Image (image)
- `og_title`: Open Graph Title
- `og_description`: Open Graph Description
- `twitter_image`: X Card Image (image)
- `twitter_title`: X Card Title
- `twitter_description`: X Card Description
- `facebook`: Facebook
- `twitter`: X (Twitter)
- `navigation`: Navigation
- `navigation[].label`: Label
- `navigation[].url`: URL (url)
- `secondary_navigation`: Secondary Navigation
- `secondary_navigation[].label`: Label
- `secondary_navigation[].url`: URL (url)
- `active_theme`: Active Theme
- `is_private`: Private Site (boolean)
- `default_content_visibility`: Default Content Visibility
- `members_enabled`: Members Enabled (boolean)
- `members_invite_only`: Members Invite Only (boolean)
- `members_signup_access`: Member Signup Access
- `members_support_address`: Members Support Address
- `paid_members_enabled`: Paid Members Enabled (boolean)
- `portal_name`: Portal Asks for Name (boolean)
- `portal_plans`: Portal Plans
- `portal_default_plan`: Portal Default Plan
- `comments_enabled`: Comments Enabled
- `recommendations_enabled`: Recommendations Enabled (boolean)
- `email_track_opens`: Track Email Opens (boolean)
- `email_track_clicks`: Track Email Clicks (boolean)
- `donations_enabled`: Donations Enabled (boolean)
- `donations_currency`: Donations Currency
- `donations_suggested_amount`: Suggested Donation (cents) (number)
- `editor_default_email_recipients`: Default Email Recipients
- `default_email_address`: Default Email Address (email)
- `support_email_address`: Support Email Address (email)

### `ghost_list_member_activity`

**List Member Activity.** Returns the newest member activity events, newest first: signups, logins, newsletter subscribe/unsubscribe, email deliveries, opens and clicks, comments, feedback, donations, email address changes and paid subscription changes. Give a Member ID for one member's timeline, an Event Type to narrow it, or an NQL filter for anything else. Page back by filtering on data.created_at older than the last event returned. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `memberId` | string | no |  | Member ID. Only return events for this member. Get the ID from List Members or Get Member by Email. |
| `eventType` | string | no |  | Event Type. Only return this kind of event. One of `"signup_event"`, `"login_event"`, `"newsletter_event"`, `"email_delivered_event"`, `"email_opened_event"`, `"click_event"`, `"email_failed_event"`, `"comment_event"`, `"feedback_event"`, `"subscription_event"`, `"payment_event"`, `"email_change_event"`, `"donation_event"`. |
| `filter` | string | no |  | Filter. A Ghost NQL filter, e.g. data.created_at:<'2026-01-01 00:00:00'. Quote values that contain spaces or special characters with single quotes. |
| `limit` | number | no | `15` | Limit. How many records to return per page, from 1 to 100. Defaults to 15. |

Output fields:

- `events`: Events
- `events[].type`: Event Type
- `events[].id`: Event ID
- `events[].created_at`: Created At (datetime)
- `events[].member_id`: Member ID
- `events[].member_name`: Member Name
- `events[].member_email`: Member Email (email)
- `events[].data`: Event Data
- `count`: Count (number)
- `total`: Total (number)

### `ghost_get_member_stats`

**Get Member Stats.** Returns how many members the publication has right now, split into free, paid, comped and gift, plus one row per day with the counts on that day. Use it to answer growth questions; use List Members to see who the members are. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `total`: Total Members (number)
- `free`: Free (number)
- `paid`: Paid (number)
- `comped`: Comped (number)
- `gift`: Gift (number)
- `as_of`: As Of (date)
- `history`: History
- `history[].date`: Date (date)
- `history[].free`: Free (number)
- `history[].paid`: Paid (number)
- `history[].comped`: Comped (number)
- `history[].gift`: Gift (number)

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
