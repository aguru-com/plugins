# Senja

Collect, manage, and share testimonials with Senja.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-senja'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your Senja API key:
> 1. Log in to your Senja account.
> 2. Go to **Automate** in the left sidebar.
> 3. Click **REST API** and copy your API key.

## Actions

### `list_testimonials`

**List Testimonials.** Lists testimonials from a Senja project, returning all of them or only those matching optional filters (full-text search, approval status, type, rating, source platform, tags, language) with sorting and pagination. Use to find, audit, or enumerate testimonials before acting on them. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search. Full-text search across testimonial text, title, customer name, customer email, and customer tagline. |
| `sort` | string | no | `"date"` | Sort By. Field used to sort the results. One of `"date"`, `"rating"`. |
| `order` | string | no | `"desc"` | Order. Sort direction. One of `"desc"`, `"asc"`. |
| `approved` | string | no |  | Approval Status. Filter by approval status. Leave empty to return all testimonials. One of `"true"`, `"false"`. |
| `type` | string | no |  | Testimonial Type. Filter by testimonial type. Leave empty to return all types. One of `"text"`, `"video"`. |
| `rating` | number | no |  | Rating. Filter testimonials by star rating (1 to 5). |
| `integration` | string | no |  | Source / Integration. Filter testimonials by their source platform (e.g. Google, Twitter). One of `"twitter"`, `"linkedin"`, `"google"`, `"facebook"`, `"airbnb"`, `"amazon"`, `"app_store"`, `"apple_podcasts"`, `"appsumo"`, `"capterra"`, `"chrome-web-store"`, `"embedsocial"`, `"fiverr"`, `"g2"`, `"homestars"`, `"instagram"`, `"play-store"`, `"product-hunt"`, `"realtor"`, `"reddit"`, `"skillshare"`, `"sourceforge"`, `"testimonial-to"`, `"tiktok"`, `"trustpilot"` and 7 more. |
| `tags` | array | no |  | Tags. Filter testimonials that have all of the specified tags. |
| `lang` | string | no |  | Language. Filter by language using an ISO 639 code (e.g. "en", "fr", "de"). |
| `limit` | number | no | `100` | Limit. Maximum number of testimonials to return (1–1000). |
| `page` | number | no |  | Page. Page number for pagination. Start at 1. |

Output fields:

- `[].id`: Testimonial ID
- `[].type`: Type
- `[].title`: Title
- `[].text`: Text
- `[].rating`: Rating (number)
- `[].url`: Source URL (url)
- `[].date`: Date (datetime)
- `[].approved`: Approved (boolean)
- `[].integration`: Source / Integration
- `[].tags`: Tags
- `[].lang`: Language
- `[].video_url`: Video URL (url)
- `[].thumbnail_url`: Thumbnail (image)
- `[].form_id`: Form ID
- `[].project_id`: Project ID
- `[].customer_name`: Customer Name
- `[].customer_email`: Customer Email (email)
- `[].customer_company`: Customer Company
- `[].customer_tagline`: Customer Tagline
- `[].customer_username`: Customer Username
- `[].customer_url`: Customer Profile URL (url)
- `[].customer_avatar`: Customer Avatar (image)
- `[].customer_company_logo`: Company Logo (image)
- `[].customer_custom_data`: Customer Custom Data (an object whose keys vary)
- `[].media`: Media
- `[].video_duration`: Video Duration (duration)
- `[].video_aspect_ratio`: Video Aspect Ratio
- `[].video_hls_url`: Video HLS URL (url)
- `[].video_mp4_low`: Video MP4 (Low) (url)
- `[].video_mp4_medium`: Video MP4 (Medium) (url)
- `[].video_mp4_high`: Video MP4 (High) (url)
- `[].video_transcript`: Video Transcript
- `[].translations`: Translations
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)

### `get_testimonial`

**Get Testimonial.** Fetches a single Senja testimonial by its unique ID. Use when you already have a testimonial ID (e.g. from List Testimonials or a trigger) and need its full details. Requires the testimonial ID; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Testimonial ID. The unique ID of the testimonial. You can find it in the URL when viewing a testimonial in Senja, or from the output of a "List Testimonials" step. |

Output fields:

- `id`: Testimonial ID
- `type`: Type
- `title`: Title
- `text`: Text
- `rating`: Rating (number)
- `url`: Source URL (url)
- `date`: Date (datetime)
- `approved`: Approved (boolean)
- `integration`: Source / Integration
- `tags`: Tags
- `lang`: Language
- `video_url`: Video URL (url)
- `thumbnail_url`: Thumbnail (image)
- `form_id`: Form ID
- `project_id`: Project ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `customer_company`: Customer Company
- `customer_tagline`: Customer Tagline
- `customer_username`: Customer Username
- `customer_url`: Customer Profile URL (url)
- `customer_avatar`: Customer Avatar (image)
- `customer_company_logo`: Company Logo (image)
- `customer_custom_data`: Customer Custom Data (an object whose keys vary)
- `media`: Media
- `video_duration`: Video Duration (duration)
- `video_aspect_ratio`: Video Aspect Ratio
- `video_hls_url`: Video HLS URL (url)
- `video_mp4_low`: Video MP4 (Low) (url)
- `video_mp4_medium`: Video MP4 (Medium) (url)
- `video_mp4_high`: Video MP4 (High) (url)
- `video_transcript`: Video Transcript
- `translations`: Translations
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `create_testimonial`

**Create Testimonial.** Creates a new testimonial in a Senja project, either a text or a video testimonial (set by type). Use to import or record a customer testimonial along with its customer details, rating, tags, and source. Requires type and customer name; text needs body text and video needs a video URL. Not idempotent — each call creates a separate testimonial. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Testimonial Type. Choose "Text" for a written testimonial or "Video" for a video testimonial. One of `"text"`, `"video"`. |
| `customer_name` | string | yes |  | Customer Name. Full name of the person giving the testimonial. |
| `title` | string | no |  | Title. A short headline for the testimonial. |
| `text` | string | no |  | Testimonial Text. The body of the testimonial. Required for text testimonials. |
| `rating` | number | no |  | Rating. Star rating from 1 (lowest) to 5 (highest). |
| `approved` | boolean | no | `false` | Approved. Check to mark the testimonial as approved immediately. Leave unchecked to keep it pending. |
| `date` | ISO date-time string | no |  | Date. Date the testimonial was given. Leave empty to use today's date. |
| `url` | string | no |  | Source URL. Link to the original testimonial (e.g. a tweet URL, Google review link). |
| `video_url` | string | no |  | Video URL. URL of the video testimonial. Required when Testimonial Type is "Video". |
| `customer_email` | string | no |  | Customer Email. Email address of the customer. |
| `customer_company` | string | no |  | Customer Company. Company or organisation the customer belongs to. |
| `customer_tagline` | string | no |  | Customer Tagline. Short role or tagline for the customer (e.g. "CEO at Acme"). |
| `customer_username` | string | no |  | Customer Username. Social media handle or username of the customer (e.g. "@johndoe"). |
| `customer_url` | string | no |  | Customer Profile URL. Link to the customer's social profile or website. |
| `customer_avatar` | string | no |  | Customer Avatar URL. Direct URL to the customer's profile picture. |
| `customer_company_logo` | string | no |  | Company Logo URL. Direct URL to the customer's company logo. |
| `integration` | string | no |  | Source / Integration. The platform where this testimonial originally came from. One of `"twitter"`, `"linkedin"`, `"google"`, `"facebook"`, `"airbnb"`, `"amazon"`, `"app_store"`, `"apple_podcasts"`, `"appsumo"`, `"capterra"`, `"chrome-web-store"`, `"embedsocial"`, `"fiverr"`, `"g2"`, `"homestars"`, `"instagram"`, `"play-store"`, `"product-hunt"`, `"realtor"`, `"reddit"`, `"skillshare"`, `"sourceforge"`, `"testimonial-to"`, `"tiktok"`, `"trustpilot"` and 7 more. |
| `tags` | array | no |  | Tags. Tags to attach to this testimonial for organisation and filtering. |
| `thumbnail_url` | string | no |  | Thumbnail URL. URL of the thumbnail image for this testimonial. |
| `form_id` | string | no |  | Form ID. ID of the Senja form to associate this testimonial with. |
| `media` | array | no |  | Media (Images). List of image URLs to attach to this testimonial. Each entry must be a JSON object with a "url" field and optionally "alt" text, e.g. {"url": "https://...", "alt": "description"}. |

Output fields:

- `id`: Testimonial ID
- `type`: Type
- `title`: Title
- `text`: Text
- `rating`: Rating (number)
- `url`: Source URL (url)
- `date`: Date (datetime)
- `approved`: Approved (boolean)
- `integration`: Source / Integration
- `tags`: Tags
- `lang`: Language
- `video_url`: Video URL (url)
- `thumbnail_url`: Thumbnail (image)
- `form_id`: Form ID
- `project_id`: Project ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `customer_company`: Customer Company
- `customer_tagline`: Customer Tagline
- `customer_username`: Customer Username
- `customer_url`: Customer Profile URL (url)
- `customer_avatar`: Customer Avatar (image)
- `customer_company_logo`: Company Logo (image)
- `customer_custom_data`: Customer Custom Data (an object whose keys vary)
- `media`: Media
- `video_duration`: Video Duration (duration)
- `video_aspect_ratio`: Video Aspect Ratio
- `video_hls_url`: Video HLS URL (url)
- `video_mp4_low`: Video MP4 (Low) (url)
- `video_mp4_medium`: Video MP4 (Medium) (url)
- `video_mp4_high`: Video MP4 (High) (url)
- `video_transcript`: Video Transcript
- `translations`: Translations
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_testimonial`

**Update Testimonial.** Updates an existing Senja testimonial identified by ID, changing its approval status and/or adding or removing tags. Use to publish/unpublish a testimonial or manage its tags. Requires the testimonial ID and at least one of approval status, tags to add, or tags to remove, or the call fails. Idempotent — applying the same change yields the same final state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Testimonial ID. The unique ID of the testimonial. You can find it in the URL when viewing a testimonial in Senja, or from the output of a "List Testimonials" step. |
| `approved` | string | no |  | Approval Status. Set to "Approved" to publish the testimonial, or "Pending" to unpublish it. Leave empty to keep the current status. One of `"true"`, `"false"`. |
| `add_tags` | array | no |  | Add Tags. Tag names to add to this testimonial. Tags are created automatically if they do not already exist. |
| `remove_tags` | array | no |  | Remove Tags. Tag names to remove from this testimonial. |

Output fields:

- `id`: Testimonial ID
- `type`: Type
- `title`: Title
- `text`: Text
- `rating`: Rating (number)
- `url`: Source URL (url)
- `date`: Date (datetime)
- `approved`: Approved (boolean)
- `integration`: Source / Integration
- `tags`: Tags
- `lang`: Language
- `video_url`: Video URL (url)
- `thumbnail_url`: Thumbnail (image)
- `form_id`: Form ID
- `project_id`: Project ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `customer_company`: Customer Company
- `customer_tagline`: Customer Tagline
- `customer_username`: Customer Username
- `customer_url`: Customer Profile URL (url)
- `customer_avatar`: Customer Avatar (image)
- `customer_company_logo`: Company Logo (image)
- `customer_custom_data`: Customer Custom Data (an object whose keys vary)
- `media`: Media
- `video_duration`: Video Duration (duration)
- `video_aspect_ratio`: Video Aspect Ratio
- `video_hls_url`: Video HLS URL (url)
- `video_mp4_low`: Video MP4 (Low) (url)
- `video_mp4_medium`: Video MP4 (Medium) (url)
- `video_mp4_high`: Video MP4 (High) (url)
- `video_transcript`: Video Transcript
- `translations`: Translations
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `delete_testimonial`

**Delete Testimonial.** Permanently deletes a Senja testimonial by its ID; this cannot be undone. Use only when you intend to remove a testimonial for good. Requires the testimonial ID. Not idempotent — the testimonial exists only on the first successful call and a repeat targets a missing resource. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Testimonial ID. The unique ID of the testimonial to delete. You can find it in the URL when viewing a testimonial in Senja, or from the output of a "List Testimonials" step. |

Output fields:

- `message`: Message

### `find_testimonials`

**Find Testimonials.** Searches and lists Senja testimonials, returning all of them or only those matching optional filters (full-text query, approval status, type, rating, source platform, tags, language) with sorting and pagination. Pick this over Get Testimonial when you do not yet have a testimonial ID — it is the resolver that returns the IDs the get/update/delete atomics require. Read-only. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search. Full-text search across testimonial text, title, customer name, customer email, and customer tagline. |
| `sort` | string | no | `"date"` | Sort By. Field used to sort the results. One of `"date"`, `"rating"`. |
| `order` | string | no | `"desc"` | Order. Sort direction. One of `"desc"`, `"asc"`. |
| `approved` | string | no |  | Approval Status. Filter by approval status. Leave empty to return all testimonials. One of `"true"`, `"false"`. |
| `type` | string | no |  | Testimonial Type. Filter by testimonial type. Leave empty to return all types. One of `"text"`, `"video"`. |
| `rating` | number | no |  | Rating. Filter testimonials by star rating (1 to 5). |
| `integration` | string | no |  | Source / Integration. Filter testimonials by their source platform (e.g. Google, Twitter). One of `"twitter"`, `"linkedin"`, `"google"`, `"facebook"`, `"airbnb"`, `"amazon"`, `"app_store"`, `"apple_podcasts"`, `"appsumo"`, `"capterra"`, `"chrome-web-store"`, `"embedsocial"`, `"fiverr"`, `"g2"`, `"homestars"`, `"instagram"`, `"play-store"`, `"product-hunt"`, `"realtor"`, `"reddit"`, `"skillshare"`, `"sourceforge"`, `"testimonial-to"`, `"tiktok"`, `"trustpilot"` and 7 more. |
| `tags` | array | no |  | Tags. Filter testimonials that have all of the specified tags. |
| `lang` | string | no |  | Language. Filter by language using an ISO 639 code (e.g. "en", "fr", "de"). |
| `limit` | number | no | `100` | Limit. Maximum number of testimonials to return (1–1000). |
| `page` | number | no |  | Page. Page number for pagination. Start at 1. |

Output fields:

- `[].id`: Testimonial ID
- `[].type`: Type
- `[].title`: Title
- `[].text`: Text
- `[].rating`: Rating (number)
- `[].url`: Source URL (url)
- `[].date`: Date (datetime)
- `[].approved`: Approved (boolean)
- `[].integration`: Source / Integration
- `[].tags`: Tags
- `[].lang`: Language
- `[].video_url`: Video URL (url)
- `[].thumbnail_url`: Thumbnail (image)
- `[].form_id`: Form ID
- `[].project_id`: Project ID
- `[].customer_name`: Customer Name
- `[].customer_email`: Customer Email (email)
- `[].customer_company`: Customer Company
- `[].customer_tagline`: Customer Tagline
- `[].customer_username`: Customer Username
- `[].customer_url`: Customer Profile URL (url)
- `[].customer_avatar`: Customer Avatar (image)
- `[].customer_company_logo`: Company Logo (image)
- `[].customer_custom_data`: Customer Custom Data (an object whose keys vary)
- `[].media`: Media
- `[].video_duration`: Video Duration (duration)
- `[].video_aspect_ratio`: Video Aspect Ratio
- `[].video_hls_url`: Video HLS URL (url)
- `[].video_mp4_low`: Video MP4 (Low) (url)
- `[].video_mp4_medium`: Video MP4 (Medium) (url)
- `[].video_mp4_high`: Video MP4 (High) (url)
- `[].video_transcript`: Video Transcript
- `[].translations`: Translations
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)

### `fetch_testimonial`

**Fetch Testimonial.** Fetches one Senja testimonial's full details by its ID. Pick this over Find Testimonials when you already hold a specific testimonial ID (from Find Testimonials or the Testimonial Event trigger) and want only that record. Requires the testimonial ID; resolve unknown IDs via Find Testimonials first. Read-only. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Testimonial ID. The unique ID of the testimonial. You can find it in the URL when viewing a testimonial in Senja, or from the output of a "List Testimonials" step. |

Output fields:

- `id`: Testimonial ID
- `type`: Type
- `title`: Title
- `text`: Text
- `rating`: Rating (number)
- `url`: Source URL (url)
- `date`: Date (datetime)
- `approved`: Approved (boolean)
- `integration`: Source / Integration
- `tags`: Tags
- `lang`: Language
- `video_url`: Video URL (url)
- `thumbnail_url`: Thumbnail (image)
- `form_id`: Form ID
- `project_id`: Project ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `customer_company`: Customer Company
- `customer_tagline`: Customer Tagline
- `customer_username`: Customer Username
- `customer_url`: Customer Profile URL (url)
- `customer_avatar`: Customer Avatar (image)
- `customer_company_logo`: Company Logo (image)
- `customer_custom_data`: Customer Custom Data (an object whose keys vary)
- `media`: Media
- `video_duration`: Video Duration (duration)
- `video_aspect_ratio`: Video Aspect Ratio
- `video_hls_url`: Video HLS URL (url)
- `video_mp4_low`: Video MP4 (Low) (url)
- `video_mp4_medium`: Video MP4 (Medium) (url)
- `video_mp4_high`: Video MP4 (High) (url)
- `video_transcript`: Video Transcript
- `translations`: Translations
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `add_testimonial`

**Add Testimonial.** Creates a new Senja testimonial — text or video, set by type — with the customer's details, rating, tags, and source. Requires type and customer name; a text testimonial also needs body text and a video testimonial needs a video URL. Each call creates a separate record (no de-duplication), so do not retry blindly on timeout. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Testimonial Type. Choose "Text" for a written testimonial or "Video" for a video testimonial. One of `"text"`, `"video"`. |
| `customer_name` | string | yes |  | Customer Name. Full name of the person giving the testimonial. |
| `title` | string | no |  | Title. A short headline for the testimonial. |
| `text` | string | no |  | Testimonial Text. The body of the testimonial. Required for text testimonials. |
| `rating` | number | no |  | Rating. Star rating from 1 (lowest) to 5 (highest). |
| `approved` | boolean | no | `false` | Approved. Check to mark the testimonial as approved immediately. Leave unchecked to keep it pending. |
| `date` | ISO date-time string | no |  | Date. Date the testimonial was given. Leave empty to use today's date. |
| `url` | string | no |  | Source URL. Link to the original testimonial (e.g. a tweet URL, Google review link). |
| `video_url` | string | no |  | Video URL. URL of the video testimonial. Required when Testimonial Type is "Video". |
| `customer_email` | string | no |  | Customer Email. Email address of the customer. |
| `customer_company` | string | no |  | Customer Company. Company or organisation the customer belongs to. |
| `customer_tagline` | string | no |  | Customer Tagline. Short role or tagline for the customer (e.g. "CEO at Acme"). |
| `customer_username` | string | no |  | Customer Username. Social media handle or username of the customer (e.g. "@johndoe"). |
| `customer_url` | string | no |  | Customer Profile URL. Link to the customer's social profile or website. |
| `customer_avatar` | string | no |  | Customer Avatar URL. Direct URL to the customer's profile picture. |
| `customer_company_logo` | string | no |  | Company Logo URL. Direct URL to the customer's company logo. |
| `integration` | string | no |  | Source / Integration. The platform where this testimonial originally came from. One of `"twitter"`, `"linkedin"`, `"google"`, `"facebook"`, `"airbnb"`, `"amazon"`, `"app_store"`, `"apple_podcasts"`, `"appsumo"`, `"capterra"`, `"chrome-web-store"`, `"embedsocial"`, `"fiverr"`, `"g2"`, `"homestars"`, `"instagram"`, `"play-store"`, `"product-hunt"`, `"realtor"`, `"reddit"`, `"skillshare"`, `"sourceforge"`, `"testimonial-to"`, `"tiktok"`, `"trustpilot"` and 7 more. |
| `tags` | array | no |  | Tags. Tags to attach to this testimonial for organisation and filtering. |
| `thumbnail_url` | string | no |  | Thumbnail URL. URL of the thumbnail image for this testimonial. |
| `form_id` | string | no |  | Form ID. ID of the Senja form to associate this testimonial with. |
| `media` | array | no |  | Media (Images). List of image URLs to attach to this testimonial. Each entry must be a JSON object with a "url" field and optionally "alt" text, e.g. {"url": "https://...", "alt": "description"}. |

Output fields:

- `id`: Testimonial ID
- `type`: Type
- `title`: Title
- `text`: Text
- `rating`: Rating (number)
- `url`: Source URL (url)
- `date`: Date (datetime)
- `approved`: Approved (boolean)
- `integration`: Source / Integration
- `tags`: Tags
- `lang`: Language
- `video_url`: Video URL (url)
- `thumbnail_url`: Thumbnail (image)
- `form_id`: Form ID
- `project_id`: Project ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `customer_company`: Customer Company
- `customer_tagline`: Customer Tagline
- `customer_username`: Customer Username
- `customer_url`: Customer Profile URL (url)
- `customer_avatar`: Customer Avatar (image)
- `customer_company_logo`: Company Logo (image)
- `customer_custom_data`: Customer Custom Data (an object whose keys vary)
- `media`: Media
- `video_duration`: Video Duration (duration)
- `video_aspect_ratio`: Video Aspect Ratio
- `video_hls_url`: Video HLS URL (url)
- `video_mp4_low`: Video MP4 (Low) (url)
- `video_mp4_medium`: Video MP4 (Medium) (url)
- `video_mp4_high`: Video MP4 (High) (url)
- `video_transcript`: Video Transcript
- `translations`: Translations
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `modify_testimonial`

**Modify Testimonial.** Updates an existing Senja testimonial by ID — change its approval status (publish/unpublish) and/or add or remove tags. Requires the testimonial ID (resolve via Find Testimonials) plus at least one of approval status, tags to add, or tags to remove, or it fails. Applying the same change again converges to the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Testimonial ID. The unique ID of the testimonial. You can find it in the URL when viewing a testimonial in Senja, or from the output of a "List Testimonials" step. |
| `approved` | string | no |  | Approval Status. Set to "Approved" to publish the testimonial, or "Pending" to unpublish it. Leave empty to keep the current status. One of `"true"`, `"false"`. |
| `add_tags` | array | no |  | Add Tags. Tag names to add to this testimonial. Tags are created automatically if they do not already exist. |
| `remove_tags` | array | no |  | Remove Tags. Tag names to remove from this testimonial. |

Output fields:

- `id`: Testimonial ID
- `type`: Type
- `title`: Title
- `text`: Text
- `rating`: Rating (number)
- `url`: Source URL (url)
- `date`: Date (datetime)
- `approved`: Approved (boolean)
- `integration`: Source / Integration
- `tags`: Tags
- `lang`: Language
- `video_url`: Video URL (url)
- `thumbnail_url`: Thumbnail (image)
- `form_id`: Form ID
- `project_id`: Project ID
- `customer_name`: Customer Name
- `customer_email`: Customer Email (email)
- `customer_company`: Customer Company
- `customer_tagline`: Customer Tagline
- `customer_username`: Customer Username
- `customer_url`: Customer Profile URL (url)
- `customer_avatar`: Customer Avatar (image)
- `customer_company_logo`: Company Logo (image)
- `customer_custom_data`: Customer Custom Data (an object whose keys vary)
- `media`: Media
- `video_duration`: Video Duration (duration)
- `video_aspect_ratio`: Video Aspect Ratio
- `video_hls_url`: Video HLS URL (url)
- `video_mp4_low`: Video MP4 (Low) (url)
- `video_mp4_medium`: Video MP4 (Medium) (url)
- `video_mp4_high`: Video MP4 (High) (url)
- `video_transcript`: Video Transcript
- `translations`: Translations
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `remove_testimonial`

**Remove Testimonial.** Permanently deletes a Senja testimonial by ID; this cannot be undone and there is no archive or recovery. Use only when removal is explicitly intended. Requires the testimonial ID (resolve via Find Testimonials). Destructive — a repeat call targets a now-missing record and returns 404. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Testimonial ID. The unique ID of the testimonial to delete. You can find it in the URL when viewing a testimonial in Senja, or from the output of a "List Testimonials" step. |

Output fields:

- `message`: Message

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
