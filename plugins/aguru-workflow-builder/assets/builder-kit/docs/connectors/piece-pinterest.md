# Pinterest

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pinterest'
  version: '0.2.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect a Pinterest **business** account.
>
> 1. Log in to [Pinterest Developers](https://developers.pinterest.com/apps/) and create an app.
> 2. In the app settings, add the Redirect URL shown below to the allowed redirect URIs.
> 3. New apps start with trial access: Pins and boards created through the API stay visible only to you until Pinterest grants standard access.

## Actions

### `createPin`

**Create Pin.** Creates a Pin on a Pinterest board by uploading media from a hosted image/video URL (or base64 image). Use to publish visual content to a board the user owns. Requires a valid board_id and a media source; each call creates a new Pin, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ad_account_id` | string | no |  | Ad Account. Only for ads accounts. Leave empty to use your own account. A value the product loads from the provider, such as an id; write the value itself. |
| `board_id` | string | yes |  | Board. A value the product loads from the provider, such as an id; write the value itself. |
| `board_section_id` | string | no |  | Board Section. Leave empty to save the Pin to the board itself. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. Up to 100 characters. |
| `description` | string | no |  | Description. Up to 800 characters. |
| `media_source_type` | string | yes | `"image_url"` | Media Type. One of `"image_url"`, `"image_base64"`. |
| `media_url` | string | yes |  | Media. Public image URL, or base64 data for the Base64 type. |
| `link` | string | no |  | Destination Link. Opens when someone clicks the Pin. |
| `dominant_color` | string | no |  | Dominant Color. Hex color shown while the image loads. |
| `alt_text` | string | no |  | Alt Text. Describes the image for screen readers. Up to 500 characters. |
| `parent_pin_id` | string | no |  | Parent Pin ID. ID of the Pin this one was saved from. |
| `sponsor_id` | string | no |  | Sponsor ID. Partner account for paid partnership Pins. Closed beta only. |
| `product_tags` | array | no |  | Product Tag Pins. Pins whose products to tag. Needs product tagging access. Values the product loads from the provider, such as ids; write an array of them. |
| `note` | string | no |  | Note. Private note only you can see. |
| `is_removable` | boolean | no | `false` | Removable. Marks an ad-only Pin that can be removed later. |

Output fields:

- `id`: Pin ID
- `title`: Title
- `description`: Description
- `alt_text`: Alt Text
- `link`: Destination Link (url)
- `board_id`: Board ID
- `board_section_id`: Board Section ID
- `board_owner`: Board Owner
- `board_owner.username`: Username
- `media`: Media
- `media.media_type`: Media Type
- `media.images`: Images (an object whose keys vary)
- `dominant_color`: Dominant Color
- `creative_type`: Creative Type
- `parent_pin_id`: Parent Pin ID
- `product_tags`: Product Tags
- `pin_metrics`: Pin Metrics
- `pin_metrics.90d`: Last 90 Days
- `pin_metrics.90d.impression`: Impressions (number)
- `pin_metrics.90d.save`: Saves (number)
- `pin_metrics.90d.pin_click`: Pin Clicks (number)
- `pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `pin_metrics.90d.user_follow`: User Follows (number)
- `pin_metrics.90d.profile_visit`: Profile Visits (number)
- `pin_metrics.90d.last_updated`: Last Updated
- `pin_metrics.lifetime_metrics`: Lifetime
- `pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `pin_metrics.lifetime_metrics.save`: Saves (number)
- `pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `pin_metrics.lifetime_metrics.comment`: Comments (number)
- `pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `is_owner`: Is Owner (boolean)
- `is_standard`: Is Standard (boolean)
- `is_product`: Is Product (boolean)
- `is_removable`: Is Removable (boolean)
- `has_been_promoted`: Has Been Promoted (boolean)
- `created_at`: Created At (datetime)

### `createBoard`

**Create Board.** Creates a new Pinterest board to organize Pins, with a name and optional description and privacy level. Use before adding Pins when no suitable board exists. Each call creates a separate board even with identical input, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ad_account_id` | string | no |  | Ad Account. Only for ads accounts. Leave empty to use your own account. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Board Name. Up to 180 characters. |
| `description` | string | no |  | Description. Up to 500 characters. |
| `privacy` | string | no | `"PUBLIC"` | Privacy. One of `"PUBLIC"`, `"PROTECTED"`, `"SECRET"`. |
| `is_ads_only` | boolean | no | `false` | Ads-Only Board. Pinterest names it "Ad-only Pins" and makes it protected. |

Output fields:

- `id`: Board ID
- `name`: Name
- `description`: Description
- `privacy`: Privacy
- `owner`: Owner
- `owner.username`: Username
- `pin_count`: Pin Count (number)
- `follower_count`: Follower Count (number)
- `collaborator_count`: Collaborator Count (number)
- `is_ads_only`: Ads Only (boolean)
- `media`: Media
- `media.image_cover_url`: Cover Image (image)
- `media.pin_thumbnail_urls`: Pin Thumbnails
- `created_at`: Created At (datetime)
- `board_pins_modified_at`: Pins Modified At (datetime)

### `deletePin`

**Delete Pin.** Permanently deletes a single Pin identified by its pin_id. Use to remove published content from Pinterest; this is destructive and cannot be undone. Repeating the call after the Pin is gone returns an error rather than re-deleting, so treat it as not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pin_id` | string | yes |  | Pin. A value the product loads from the provider, such as an id; write the value itself. |
| `ad_account_id` | string | no |  | Ad Account. Only for ads accounts. Leave empty to use your own account. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `pin_id`: Pin ID
- `message`: Message

### `findBoardByName`

**Find Board by Name.** Searches the authenticated account's boards by a text query and returns matching boards. Use to resolve a board name into a board_id before creating Pins or updating a board. Read-only and idempotent; supports pagination via a bookmark token. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Words in the board name. |
| `ad_account_id` | string | no |  | Ad Account. Only for ads accounts. Leave empty to use your own account. A value the product loads from the provider, such as an id; write the value itself. |
| `bookmark` | string | no |  | Bookmark. Bookmark from a previous run to fetch the next page. |

Output fields:

- `items`: Boards
- `items[].id`: Board ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].privacy`: Privacy
- `items[].owner`: Owner
- `items[].owner.username`: Username
- `items[].pin_count`: Pin Count (number)
- `items[].follower_count`: Follower Count (number)
- `items[].collaborator_count`: Collaborator Count (number)
- `items[].is_ads_only`: Ads Only (boolean)
- `items[].media`: Media
- `items[].media.image_cover_url`: Cover Image (image)
- `items[].media.pin_thumbnail_urls`: Pin Thumbnails
- `items[].created_at`: Created At (datetime)
- `items[].board_pins_modified_at`: Pins Modified At (datetime)
- `bookmark`: Next Page Bookmark

### `findPin`

**Find Pin by Keyword.** Searches the authenticated account's Pins by keywords matched against title, description, or tags (comma-separated pin IDs also work). Use to locate existing Pins or resolve a pin_id before deleting or referencing one. Read-only and idempotent; it returns at most max_results Pins, and the next batch is fetched by passing the returned bookmark back as bookmark. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ad_account_id` | string | no |  | Ad Account. Only for ads accounts. Leave empty to use your own account. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | Search Query. Words in the title, description or tags, or comma-separated Pin IDs. |
| `bookmark` | string | no |  | Bookmark. Bookmark from a previous run to continue where it stopped. |
| `max_results` | number | no | `25` | Max Results. Never returns more than this many Pins. |

Output fields:

- `items`: Pins
- `items[].id`: Pin ID
- `items[].title`: Title
- `items[].description`: Description
- `items[].alt_text`: Alt Text
- `items[].link`: Destination Link (url)
- `items[].board_id`: Board ID
- `items[].board_section_id`: Board Section ID
- `items[].board_owner`: Board Owner
- `items[].board_owner.username`: Username
- `items[].media`: Media
- `items[].media.media_type`: Media Type
- `items[].media.images`: Images (an object whose keys vary)
- `items[].dominant_color`: Dominant Color
- `items[].creative_type`: Creative Type
- `items[].parent_pin_id`: Parent Pin ID
- `items[].product_tags`: Product Tags
- `items[].pin_metrics`: Pin Metrics
- `items[].pin_metrics.90d`: Last 90 Days
- `items[].pin_metrics.90d.impression`: Impressions (number)
- `items[].pin_metrics.90d.save`: Saves (number)
- `items[].pin_metrics.90d.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.90d.user_follow`: User Follows (number)
- `items[].pin_metrics.90d.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.90d.last_updated`: Last Updated
- `items[].pin_metrics.lifetime_metrics`: Lifetime
- `items[].pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `items[].pin_metrics.lifetime_metrics.save`: Saves (number)
- `items[].pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `items[].pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `items[].pin_metrics.lifetime_metrics.comment`: Comments (number)
- `items[].pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `items[].is_owner`: Is Owner (boolean)
- `items[].is_standard`: Is Standard (boolean)
- `items[].is_product`: Is Product (boolean)
- `items[].is_removable`: Is Removable (boolean)
- `items[].has_been_promoted`: Has Been Promoted (boolean)
- `items[].created_at`: Created At (datetime)
- `total_results`: Total Results (number)
- `query_used`: Query Used
- `has_more`: Has More (boolean)
- `bookmark`: Next Page Bookmark

### `updateBoard`

**Update Board.** Updates an existing board's name, description, and/or privacy setting, identified by board_id. Use to rename or reconfigure a board the user owns; at least one field must be supplied. Mutates the board on each call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board. A value the product loads from the provider, such as an id; write the value itself. |
| `ad_account_id` | string | no |  | Ad Account. Only for ads accounts. Leave empty to use your own account. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Board Name. Leave empty to keep the current name. |
| `description` | string | no |  | Description. Leave empty to keep the current description. |
| `privacy` | string | no |  | Privacy. Leave empty to keep the current setting. One of `"PUBLIC"`, `"SECRET"`. |

Output fields:

- `id`: Board ID
- `name`: Name
- `description`: Description
- `privacy`: Privacy
- `owner`: Owner
- `owner.username`: Username
- `pin_count`: Pin Count (number)
- `follower_count`: Follower Count (number)
- `collaborator_count`: Collaborator Count (number)
- `is_ads_only`: Ads Only (boolean)
- `media`: Media
- `media.image_cover_url`: Cover Image (image)
- `media.pin_thumbnail_urls`: Pin Thumbnails
- `created_at`: Created At (datetime)
- `board_pins_modified_at`: Pins Modified At (datetime)

### `listBoards`

**List Boards.** Lists the boards the connected account owns or collaborates on, returning each board id alongside its name, privacy and pin count. Use this to resolve a board name into the board_id that every pin and section action needs; prefer Search Boards when the account has many boards and part of the name is known. Results page through an opaque bookmark cursor, so pass the returned bookmark back in for the next page; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `privacy` | string | no |  | Privacy. Return only boards with this privacy setting. Omit to return all of them. One of `"ALL"`, `"PUBLIC"`, `"PROTECTED"`, `"SECRET"`, `"PUBLIC_AND_SECRET"`. |
| `page_size` | number | no |  | Page Size. Boards per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Boards
- `items[].id`: Board ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].privacy`: Privacy
- `items[].owner`: Owner
- `items[].owner.username`: Username
- `items[].pin_count`: Pin Count (number)
- `items[].follower_count`: Follower Count (number)
- `items[].collaborator_count`: Collaborator Count (number)
- `items[].is_ads_only`: Ads Only (boolean)
- `items[].media`: Media
- `items[].media.image_cover_url`: Cover Image (image)
- `items[].media.pin_thumbnail_urls`: Pin Thumbnails
- `items[].created_at`: Created At (datetime)
- `items[].board_pins_modified_at`: Pins Modified At (datetime)
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark

### `getBoard`

**Get Board.** Reads one board by id and returns its name, description, privacy, owner and pin and follower counts. Use it to confirm a board exists and check its privacy before pinning to it; use List Boards or Search Boards when only the name is known. The board id is a numeric string taken from List Boards, Search Boards or a pin record; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |

Output fields:

- `id`: Board ID
- `name`: Name
- `description`: Description
- `privacy`: Privacy
- `owner`: Owner
- `owner.username`: Username
- `pin_count`: Pin Count (number)
- `follower_count`: Follower Count (number)
- `collaborator_count`: Collaborator Count (number)
- `is_ads_only`: Ads Only (boolean)
- `media`: Media
- `media.image_cover_url`: Cover Image (image)
- `media.pin_thumbnail_urls`: Pin Thumbnails
- `created_at`: Created At (datetime)
- `board_pins_modified_at`: Pins Modified At (datetime)

### `createNewBoard`

**Create New Board.** Creates a board and returns its new board id, optionally with a description and a privacy level of public or protected. Use it when no suitable board exists yet; check List Boards or Search Boards first, because Pinterest allows two boards with the same name and each call creates another one, which makes this not idempotent. Secret boards are not offered because this connection does not hold the scope Pinterest requires to write them. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Board Name. Name of the board (max 180 characters). |
| `description` | string | no |  | Description. Description of the board (max 500 characters). |
| `privacy` | string | no | `"PUBLIC"` | Privacy. Who can see the board. Defaults to public. Secret boards cannot be created through this connection. One of `"PUBLIC"`, `"PROTECTED"`. |

Output fields:

- `id`: Board ID
- `name`: Name
- `description`: Description
- `privacy`: Privacy
- `owner`: Owner
- `owner.username`: Username
- `pin_count`: Pin Count (number)
- `follower_count`: Follower Count (number)
- `collaborator_count`: Collaborator Count (number)
- `is_ads_only`: Ads Only (boolean)
- `media`: Media
- `media.image_cover_url`: Cover Image (image)
- `media.pin_thumbnail_urls`: Pin Thumbnails
- `created_at`: Created At (datetime)
- `board_pins_modified_at`: Pins Modified At (datetime)

### `updateBoardDetails`

**Update Board Details.** Updates a board in place: its name, description or privacy setting. Anything left unset keeps its current value, so one field can be corrected without resending the rest, and at least one field must be supplied. Use Rename Board Section for a section rather than a board. Re-sending the same values converges on the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |
| `name` | string | no |  | Board Name. New name (max 180 characters). Leave empty to keep it. |
| `description` | string | no |  | Description. New description (max 500 characters). Leave empty to keep it. |
| `privacy` | string | no |  | Privacy. New privacy setting. Leave empty to keep it. A board cannot be switched to secret through this connection. One of `"PUBLIC"`, `"PROTECTED"`. |

Output fields:

- `id`: Board ID
- `name`: Name
- `description`: Description
- `privacy`: Privacy
- `owner`: Owner
- `owner.username`: Username
- `pin_count`: Pin Count (number)
- `follower_count`: Follower Count (number)
- `collaborator_count`: Collaborator Count (number)
- `is_ads_only`: Ads Only (boolean)
- `media`: Media
- `media.image_cover_url`: Cover Image (image)
- `media.pin_thumbnail_urls`: Pin Thumbnails
- `created_at`: Created At (datetime)
- `board_pins_modified_at`: Pins Modified At (datetime)

### `deleteBoard`

**Delete Board.** Permanently deletes a board together with every Pin saved on it. This cannot be undone and destroys content, so confirm the board id with Get Board first and delete individual Pins instead when only some content should go. Deleting an already-deleted board returns an error rather than succeeding, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |

Output fields:

- `success`: Success (boolean)
- `board_id`: Board ID
- `message`: Message

### `searchBoards`

**Search Boards.** Searches the connected account's own boards by a text query and returns the matches with their board ids. Use it to resolve a board name into the board_id that pin and section actions need; use List Boards when the account has few boards and the whole set is wanted. The query matches board names and descriptions, only searches boards this account can see, and pages through an opaque bookmark cursor. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Text to match against board names and descriptions. |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Boards
- `items[].id`: Board ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].privacy`: Privacy
- `items[].owner`: Owner
- `items[].owner.username`: Username
- `items[].pin_count`: Pin Count (number)
- `items[].follower_count`: Follower Count (number)
- `items[].collaborator_count`: Collaborator Count (number)
- `items[].is_ads_only`: Ads Only (boolean)
- `items[].media`: Media
- `items[].media.image_cover_url`: Cover Image (image)
- `items[].media.pin_thumbnail_urls`: Pin Thumbnails
- `items[].created_at`: Created At (datetime)
- `items[].board_pins_modified_at`: Pins Modified At (datetime)
- `bookmark`: Next Page Bookmark

### `listBoardSections`

**List Board Sections.** Lists the sections of one board, returning each section id and name. Use it to resolve a section name into the board_section_id that Create Pin and List Pins on Board Section take. A section id is only meaningful together with its board id, so always carry both; results page through an opaque bookmark cursor. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |
| `page_size` | number | no |  | Page Size. Sections per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Sections
- `items[].id`: Section ID
- `items[].name`: Name
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark

### `createBoardSection`

**Create Board Section.** Creates a named section inside an existing board and returns the new section id. Use it to group Pins within a board before creating Pins into that section. Check List Board Sections first: Pinterest allows two sections with the same name, so each call adds another section rather than reusing one, which makes this not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |
| `name` | string | yes |  | Section Name. The name of the new section. |

Output fields:

- `id`: Section ID
- `name`: Name

### `renameBoardSection`

**Rename Board Section.** Renames an existing board section. The name is the only field Pinterest allows to be changed on a section, so this is a rename rather than a general update, and it moves no Pins. Requires both the board id and the section id from List Board Sections; sending the same name again converges on the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |
| `section_id` | string | yes |  | Section ID. Numeric section id, as returned by List Board Sections for this board. |
| `name` | string | yes |  | Section Name. The new name for the section. |

Output fields:

- `id`: Section ID
- `name`: Name

### `deleteBoardSection`

**Delete Board Section.** Deletes a section from a board. The Pins that were in the section stay on the board and become unsectioned, so this removes the grouping rather than the content; use Delete Board to remove the Pins as well. Requires both the board id and the section id, and deleting an already-deleted section errors rather than succeeding, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |
| `section_id` | string | yes |  | Section ID. Numeric section id, as returned by List Board Sections for this board. |

Output fields:

- `success`: Success (boolean)
- `board_id`: Board ID
- `section_id`: Section ID
- `message`: Message

### `listPinsOnBoard`

**List Pins on Board.** Lists the Pins saved on one board, returning each pin id with its title, description, link and media. Use it to audit or pick a Pin from a known board; use List Pins for every Pin on the account regardless of board, and List Pins on Board Section to narrow to a single section. Requires a numeric board id from List Boards and pages through an opaque bookmark cursor; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |
| `page_size` | number | no |  | Page Size. Pins per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Pins
- `items[].id`: Pin ID
- `items[].title`: Title
- `items[].description`: Description
- `items[].alt_text`: Alt Text
- `items[].link`: Destination Link (url)
- `items[].board_id`: Board ID
- `items[].board_section_id`: Board Section ID
- `items[].board_owner`: Board Owner
- `items[].board_owner.username`: Username
- `items[].media`: Media
- `items[].media.media_type`: Media Type
- `items[].media.images`: Images (an object whose keys vary)
- `items[].dominant_color`: Dominant Color
- `items[].creative_type`: Creative Type
- `items[].parent_pin_id`: Parent Pin ID
- `items[].product_tags`: Product Tags
- `items[].pin_metrics`: Pin Metrics
- `items[].pin_metrics.90d`: Last 90 Days
- `items[].pin_metrics.90d.impression`: Impressions (number)
- `items[].pin_metrics.90d.save`: Saves (number)
- `items[].pin_metrics.90d.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.90d.user_follow`: User Follows (number)
- `items[].pin_metrics.90d.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.90d.last_updated`: Last Updated
- `items[].pin_metrics.lifetime_metrics`: Lifetime
- `items[].pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `items[].pin_metrics.lifetime_metrics.save`: Saves (number)
- `items[].pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `items[].pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `items[].pin_metrics.lifetime_metrics.comment`: Comments (number)
- `items[].pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `items[].is_owner`: Is Owner (boolean)
- `items[].is_standard`: Is Standard (boolean)
- `items[].is_product`: Is Product (boolean)
- `items[].is_removable`: Is Removable (boolean)
- `items[].has_been_promoted`: Has Been Promoted (boolean)
- `items[].created_at`: Created At (datetime)
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark

### `listPinsOnBoardSection`

**List Pins on Board Section.** Lists the Pins inside a single section of a board. Use it when Pins are grouped into sections and only one group is wanted; use List Pins on Board for the whole board, including Pins that sit in no section. Requires both the board id and the section id from List Board Sections and pages through an opaque bookmark cursor; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |
| `section_id` | string | yes |  | Section ID. Numeric section id, as returned by List Board Sections for this board. |
| `page_size` | number | no |  | Page Size. Pins per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Pins
- `items[].id`: Pin ID
- `items[].title`: Title
- `items[].description`: Description
- `items[].alt_text`: Alt Text
- `items[].link`: Destination Link (url)
- `items[].board_id`: Board ID
- `items[].board_section_id`: Board Section ID
- `items[].board_owner`: Board Owner
- `items[].board_owner.username`: Username
- `items[].media`: Media
- `items[].media.media_type`: Media Type
- `items[].media.images`: Images (an object whose keys vary)
- `items[].dominant_color`: Dominant Color
- `items[].creative_type`: Creative Type
- `items[].parent_pin_id`: Parent Pin ID
- `items[].product_tags`: Product Tags
- `items[].pin_metrics`: Pin Metrics
- `items[].pin_metrics.90d`: Last 90 Days
- `items[].pin_metrics.90d.impression`: Impressions (number)
- `items[].pin_metrics.90d.save`: Saves (number)
- `items[].pin_metrics.90d.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.90d.user_follow`: User Follows (number)
- `items[].pin_metrics.90d.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.90d.last_updated`: Last Updated
- `items[].pin_metrics.lifetime_metrics`: Lifetime
- `items[].pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `items[].pin_metrics.lifetime_metrics.save`: Saves (number)
- `items[].pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `items[].pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `items[].pin_metrics.lifetime_metrics.comment`: Comments (number)
- `items[].pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `items[].is_owner`: Is Owner (boolean)
- `items[].is_standard`: Is Standard (boolean)
- `items[].is_product`: Is Product (boolean)
- `items[].is_removable`: Is Removable (boolean)
- `items[].has_been_promoted`: Has Been Promoted (boolean)
- `items[].created_at`: Created At (datetime)
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark

### `listPins`

**List Pins.** Lists the Pins the connected account owns across every board, newest first, returning each pin id with its title, link, board and media. Use it to survey recent content or find a pin id; use List Pins on Board when the board is already known, and Search Pins to match on text. Pages through an opaque bookmark cursor; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pin_filter` | string | no |  | Pin Filter. Restrict the results to a subset of the account Pins. One of `"exclude_native"`, `"exclude_repins"`, `"has_been_promoted"`. |
| `page_size` | number | no |  | Page Size. Pins per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Pins
- `items[].id`: Pin ID
- `items[].title`: Title
- `items[].description`: Description
- `items[].alt_text`: Alt Text
- `items[].link`: Destination Link (url)
- `items[].board_id`: Board ID
- `items[].board_section_id`: Board Section ID
- `items[].board_owner`: Board Owner
- `items[].board_owner.username`: Username
- `items[].media`: Media
- `items[].media.media_type`: Media Type
- `items[].media.images`: Images (an object whose keys vary)
- `items[].dominant_color`: Dominant Color
- `items[].creative_type`: Creative Type
- `items[].parent_pin_id`: Parent Pin ID
- `items[].product_tags`: Product Tags
- `items[].pin_metrics`: Pin Metrics
- `items[].pin_metrics.90d`: Last 90 Days
- `items[].pin_metrics.90d.impression`: Impressions (number)
- `items[].pin_metrics.90d.save`: Saves (number)
- `items[].pin_metrics.90d.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.90d.user_follow`: User Follows (number)
- `items[].pin_metrics.90d.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.90d.last_updated`: Last Updated
- `items[].pin_metrics.lifetime_metrics`: Lifetime
- `items[].pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `items[].pin_metrics.lifetime_metrics.save`: Saves (number)
- `items[].pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `items[].pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `items[].pin_metrics.lifetime_metrics.comment`: Comments (number)
- `items[].pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `items[].is_owner`: Is Owner (boolean)
- `items[].is_standard`: Is Standard (boolean)
- `items[].is_product`: Is Product (boolean)
- `items[].is_removable`: Is Removable (boolean)
- `items[].has_been_promoted`: Has Been Promoted (boolean)
- `items[].created_at`: Created At (datetime)
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark

### `getPin`

**Get Pin.** Reads one Pin by id and returns its title, description, destination link, alt text, media and the board it lives on. Use it to inspect a Pin before updating or deleting it; use Search Pins or List Pins when only the text or board is known. Enable Include Metrics to add 90-day and lifetime counts, which Pinterest omits by default. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pin_id` | string | yes |  | Pin ID. Numeric pin id, as returned by List Pins or Search Pins. |
| `pin_metrics` | boolean | no | `false` | Include Metrics. Return 90-day and lifetime metrics alongside the Pin. Total comments and reactions are lifetime-only. |

Output fields:

- `id`: Pin ID
- `title`: Title
- `description`: Description
- `alt_text`: Alt Text
- `link`: Destination Link (url)
- `board_id`: Board ID
- `board_section_id`: Board Section ID
- `board_owner`: Board Owner
- `board_owner.username`: Username
- `media`: Media
- `media.media_type`: Media Type
- `media.images`: Images (an object whose keys vary)
- `dominant_color`: Dominant Color
- `creative_type`: Creative Type
- `parent_pin_id`: Parent Pin ID
- `product_tags`: Product Tags
- `pin_metrics`: Pin Metrics
- `pin_metrics.90d`: Last 90 Days
- `pin_metrics.90d.impression`: Impressions (number)
- `pin_metrics.90d.save`: Saves (number)
- `pin_metrics.90d.pin_click`: Pin Clicks (number)
- `pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `pin_metrics.90d.user_follow`: User Follows (number)
- `pin_metrics.90d.profile_visit`: Profile Visits (number)
- `pin_metrics.90d.last_updated`: Last Updated
- `pin_metrics.lifetime_metrics`: Lifetime
- `pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `pin_metrics.lifetime_metrics.save`: Saves (number)
- `pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `pin_metrics.lifetime_metrics.comment`: Comments (number)
- `pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `is_owner`: Is Owner (boolean)
- `is_standard`: Is Standard (boolean)
- `is_product`: Is Product (boolean)
- `is_removable`: Is Removable (boolean)
- `has_been_promoted`: Has Been Promoted (boolean)
- `created_at`: Created At (datetime)

### `searchPins`

**Search Pins.** Searches the connected account's own Pins by text matched against titles, descriptions and tags, and returns the matches with their pin ids. Use it to resolve a Pin before reading, updating or deleting it; use List Pins on Board when the board is known. Only this account's Pins are searched, and paging uses an opaque bookmark cursor rather than a page size. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Text to match against Pin titles, descriptions and tags. Comma-separated pin ids also work. |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |
| `max_results` | number | no |  | Maximum Results. Return at most this many Pins, 1 to 250. Pinterest has no page-size parameter for Pin search, so further pages are followed until the count is reached. |

Output fields:

- `items`: Pins
- `items[].id`: Pin ID
- `items[].title`: Title
- `items[].description`: Description
- `items[].alt_text`: Alt Text
- `items[].link`: Destination Link (url)
- `items[].board_id`: Board ID
- `items[].board_section_id`: Board Section ID
- `items[].board_owner`: Board Owner
- `items[].board_owner.username`: Username
- `items[].media`: Media
- `items[].media.media_type`: Media Type
- `items[].media.images`: Images (an object whose keys vary)
- `items[].dominant_color`: Dominant Color
- `items[].creative_type`: Creative Type
- `items[].parent_pin_id`: Parent Pin ID
- `items[].product_tags`: Product Tags
- `items[].pin_metrics`: Pin Metrics
- `items[].pin_metrics.90d`: Last 90 Days
- `items[].pin_metrics.90d.impression`: Impressions (number)
- `items[].pin_metrics.90d.save`: Saves (number)
- `items[].pin_metrics.90d.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.90d.user_follow`: User Follows (number)
- `items[].pin_metrics.90d.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.90d.last_updated`: Last Updated
- `items[].pin_metrics.lifetime_metrics`: Lifetime
- `items[].pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `items[].pin_metrics.lifetime_metrics.save`: Saves (number)
- `items[].pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `items[].pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `items[].pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `items[].pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `items[].pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `items[].pin_metrics.lifetime_metrics.comment`: Comments (number)
- `items[].pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `items[].is_owner`: Is Owner (boolean)
- `items[].is_standard`: Is Standard (boolean)
- `items[].is_product`: Is Product (boolean)
- `items[].is_removable`: Is Removable (boolean)
- `items[].has_been_promoted`: Has Been Promoted (boolean)
- `items[].created_at`: Created At (datetime)
- `total_results`: Total Results (number)
- `query_used`: Query Used
- `has_more`: Has More (boolean)
- `bookmark`: Next Page Bookmark

### `createPinFromMedia`

**Create Pin from Media.** Publishes a new Pin to a board from a hosted image URL and returns the new pin id. Use it to put new content on Pinterest, and Save Pin to repin content that already exists. The image must be a URL Pinterest can fetch without authentication; this action cannot publish video, and raw image data is not accepted here. Requires a board id from List Boards and a title, and each call publishes another Pin, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `board_id` | string | yes |  | Board ID. Numeric board id, as returned by List Boards. |
| `title` | string | yes |  | Title. Title of the Pin (max 100 characters). |
| `media_url` | string | yes |  | Image URL. Publicly reachable URL of the image. Pinterest fetches it, so it must be reachable without authentication. |
| `board_section_id` | string | no |  | Board Section ID. Optional section on that board, as returned by List Board Sections. |
| `description` | string | no |  | Description. Description of the Pin (max 800 characters). |
| `link` | string | no |  | Destination Link. URL the Pin opens when clicked. |
| `alt_text` | string | no |  | Alt Text. Accessibility text for the media (max 500 characters). |
| `dominant_color` | string | no |  | Dominant Color. Hex color code such as #6E7874. |

Output fields:

- `id`: Pin ID
- `title`: Title
- `description`: Description
- `alt_text`: Alt Text
- `link`: Destination Link (url)
- `board_id`: Board ID
- `board_section_id`: Board Section ID
- `board_owner`: Board Owner
- `board_owner.username`: Username
- `media`: Media
- `media.media_type`: Media Type
- `media.images`: Images (an object whose keys vary)
- `dominant_color`: Dominant Color
- `creative_type`: Creative Type
- `parent_pin_id`: Parent Pin ID
- `product_tags`: Product Tags
- `pin_metrics`: Pin Metrics
- `pin_metrics.90d`: Last 90 Days
- `pin_metrics.90d.impression`: Impressions (number)
- `pin_metrics.90d.save`: Saves (number)
- `pin_metrics.90d.pin_click`: Pin Clicks (number)
- `pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `pin_metrics.90d.user_follow`: User Follows (number)
- `pin_metrics.90d.profile_visit`: Profile Visits (number)
- `pin_metrics.90d.last_updated`: Last Updated
- `pin_metrics.lifetime_metrics`: Lifetime
- `pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `pin_metrics.lifetime_metrics.save`: Saves (number)
- `pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `pin_metrics.lifetime_metrics.comment`: Comments (number)
- `pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `is_owner`: Is Owner (boolean)
- `is_standard`: Is Standard (boolean)
- `is_product`: Is Product (boolean)
- `is_removable`: Is Removable (boolean)
- `has_been_promoted`: Has Been Promoted (boolean)
- `created_at`: Created At (datetime)

### `savePin`

**Save Pin.** Saves an existing Pin, including any public Pin created by someone else, onto a board the connected account owns. Use this to repin curated content; use Create Pin instead to publish new media the account owns. Requires the source pin id and the destination board id, and optionally a section on that board. Saving the same Pin again creates another copy, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pin_id` | string | yes |  | Pin ID. Numeric id of the Pin to save. |
| `board_id` | string | yes |  | Destination Board ID. Numeric board id to save the Pin onto, as returned by List Boards. |
| `board_section_id` | string | no |  | Destination Section ID. Optional section on that board, as returned by List Board Sections. |

Output fields:

- `id`: Pin ID
- `title`: Title
- `description`: Description
- `alt_text`: Alt Text
- `link`: Destination Link (url)
- `board_id`: Board ID
- `board_section_id`: Board Section ID
- `board_owner`: Board Owner
- `board_owner.username`: Username
- `media`: Media
- `media.media_type`: Media Type
- `media.images`: Images (an object whose keys vary)
- `dominant_color`: Dominant Color
- `creative_type`: Creative Type
- `parent_pin_id`: Parent Pin ID
- `product_tags`: Product Tags
- `pin_metrics`: Pin Metrics
- `pin_metrics.90d`: Last 90 Days
- `pin_metrics.90d.impression`: Impressions (number)
- `pin_metrics.90d.save`: Saves (number)
- `pin_metrics.90d.pin_click`: Pin Clicks (number)
- `pin_metrics.90d.outbound_click`: Outbound Clicks (number)
- `pin_metrics.90d.user_follow`: User Follows (number)
- `pin_metrics.90d.profile_visit`: Profile Visits (number)
- `pin_metrics.90d.last_updated`: Last Updated
- `pin_metrics.lifetime_metrics`: Lifetime
- `pin_metrics.lifetime_metrics.impression`: Impressions (number)
- `pin_metrics.lifetime_metrics.save`: Saves (number)
- `pin_metrics.lifetime_metrics.pin_click`: Pin Clicks (number)
- `pin_metrics.lifetime_metrics.outbound_click`: Outbound Clicks (number)
- `pin_metrics.lifetime_metrics.user_follow`: User Follows (number)
- `pin_metrics.lifetime_metrics.profile_visit`: Profile Visits (number)
- `pin_metrics.lifetime_metrics.reaction`: Reactions (number)
- `pin_metrics.lifetime_metrics.comment`: Comments (number)
- `pin_metrics.lifetime_metrics.last_updated`: Last Updated
- `is_owner`: Is Owner (boolean)
- `is_standard`: Is Standard (boolean)
- `is_product`: Is Product (boolean)
- `is_removable`: Is Removable (boolean)
- `has_been_promoted`: Has Been Promoted (boolean)
- `created_at`: Created At (datetime)

### `deletePinById`

**Delete Pin by ID.** Permanently deletes one Pin by id. Pinterest has no trash for Pins, so this cannot be undone; confirm the Pin with Get Pin first, and use Update Pin to move a Pin to another board when the goal is to tidy up rather than destroy. Deleting an already-deleted Pin returns an error rather than succeeding, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pin_id` | string | yes |  | Pin ID. Numeric pin id, as returned by List Pins or Search Pins. |

Output fields:

- `success`: Success (boolean)
- `pin_id`: Pin ID
- `message`: Message

### `listPinProductTags`

**List Pin Product Tags.** Lists the product tags attached to one Pin, returning each tagged product with its id and position on the image. Use it to check what a shoppable Pin currently links to before editing it. Requires a numeric pin id from List Pins, and returns an empty list for Pins with no tags rather than failing. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pin_id` | string | yes |  | Pin ID. Numeric pin id, as returned by List Pins. |

Output fields:

- `items`: Product Tags
- `items[].pin_id`: Tagged Product Pin ID
- `count`: Count (number)

### `getPinAnalytics`

**Get Pin Analytics.** Reads performance metrics for one Pin over a date range, such as impressions, saves, outbound clicks and video views. Use it to judge how a specific Pin performed; use Get Account Analytics for the whole profile and Get Top Pins for a ranked comparison. Start date, end date and at least one metric are all required, dates use YYYY-MM-DD, the range cannot start more than 90 days ago or span more than 90 days, and video metrics return zero on image Pins. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pin_id` | string | yes |  | Pin ID. Numeric pin id, as returned by List Pins. |
| `start_date` | string | yes |  | Start Date. YYYY-MM-DD, at most 90 days ago. |
| `end_date` | string | yes |  | End Date. YYYY-MM-DD, at most 90 days after the start date. |
| `metric_types` | array | yes |  | Metrics. One or more metrics to return. One of `"IMPRESSION"`, `"OUTBOUND_CLICK"`, `"PIN_CLICK"`, `"SAVE"`, `"SAVE_RATE"`, `"TOTAL_COMMENTS"`, `"TOTAL_REACTIONS"`, `"USER_FOLLOW"`, `"PROFILE_VISIT"`, `"VIDEO_MRC_VIEW"`, `"VIDEO_10S_VIEW"`, `"QUARTILE_95_PERCENT_VIEW"`, `"VIDEO_V50_WATCH_TIME"`, `"VIDEO_START"`, `"VIDEO_AVG_WATCH_TIME"`. |

Output fields:

- `all`: All App Types
- `all.summary_metrics`: Summary Metrics (an object whose keys vary)
- `all.daily_metrics`: Daily Metrics
- `all.daily_metrics[].date`: Date (date)
- `all.daily_metrics[].data_status`: Data Status
- `all.daily_metrics[].metrics`: Metrics (an object whose keys vary)

### `getUserAccount`

**Get User Account.** Reads the connected account profile: username, account type, display name, website, and pin, board and follower counts. Use it to confirm which account a connection belongs to before writing content, or to report follower totals. Takes no input and never changes anything; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Account ID
- `username`: Username
- `account_type`: Account Type
- `business_name`: Business Name
- `website_url`: Website (url)
- `about`: About
- `profile_image`: Profile Image (image)
- `board_count`: Board Count (number)
- `pin_count`: Pin Count (number)
- `follower_count`: Follower Count (number)
- `following_count`: Following Count (number)
- `monthly_views`: Monthly Views (number)

### `getUserAccountAnalytics`

**Get Account Analytics.** Reads profile-wide performance metrics over a date range, such as impressions, engagements, saves and outbound clicks. Use it for an account-level summary; use Get Pin Analytics for one Pin and Get Top Pins for a ranked list. Start and end date are required as YYYY-MM-DD and the range cannot start more than 90 days ago; unlike the Pin endpoint, metrics are optional here and Pinterest returns all of them when none are given. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start_date` | string | yes |  | Start Date. YYYY-MM-DD, at most 90 days ago. |
| `end_date` | string | yes |  | End Date. YYYY-MM-DD, at most 90 days after the start date. |
| `metric_types` | array | no |  | Metrics. Leave empty to return every available metric. One of `"ENGAGEMENT"`, `"ENGAGEMENT_RATE"`, `"IMPRESSION"`, `"OUTBOUND_CLICK"`, `"OUTBOUND_CLICK_RATE"`, `"PIN_CLICK"`, `"PIN_CLICK_RATE"`, `"SAVE"`, `"SAVE_RATE"`. |

Output fields:

- `all`: All Pin Formats
- `all.summary_metrics`: Summary Metrics (an object whose keys vary)
- `all.daily_metrics`: Daily Metrics
- `all.daily_metrics[].date`: Date (date)
- `all.daily_metrics[].data_status`: Data Status
- `all.daily_metrics[].metrics`: Metrics (an object whose keys vary)

### `getTopPinsAnalytics`

**Get Top Pins.** Returns the account best-performing Pins over a date range, ranked by the chosen metric. Use it to find what worked without pulling analytics for each Pin one by one; use Get Top Video Pins for video-specific rankings. Start date, end date and the sort metric are all required, dates are YYYY-MM-DD and the range cannot start more than 90 days ago. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start_date` | string | yes |  | Start Date. YYYY-MM-DD, at most 90 days ago. |
| `end_date` | string | yes |  | End Date. YYYY-MM-DD, at most 90 days after the start date. |
| `sort_by` | string | yes |  | Sort By. The metric the ranking is based on. One of `"ENGAGEMENT"`, `"SAVE"`, `"IMPRESSION"`, `"OUTBOUND_CLICK"`, `"PIN_CLICK"`. |
| `num_of_pins` | number | no |  | Number of Pins. How many Pins to return (1-50, Pinterest defaults to 10). |

Output fields:

- `sort_by`: Sorted By
- `pins`: Top Pins
- `pins[].pin_id`: Pin ID
- `pins[].metrics`: Metrics (an object whose keys vary)
- `pins[].data_status`: Data Status (an object whose keys vary)
- `date_availability`: Date Availability
- `date_availability.latest_available_timestamp`: Latest Available (datetime)
- `date_availability.is_realtime`: Is Realtime (boolean)

### `getTopVideoPinsAnalytics`

**Get Top Video Pins.** Returns the account best-performing video Pins over a date range, ranked by a video metric such as watch time or 10-second views. Use it for video content specifically; use Get Top Pins for all Pin formats ranked by engagement. Start date, end date and the sort metric are all required, dates are YYYY-MM-DD and the range cannot start more than 90 days ago. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start_date` | string | yes |  | Start Date. YYYY-MM-DD, at most 90 days ago. |
| `end_date` | string | yes |  | End Date. YYYY-MM-DD, at most 90 days after the start date. |
| `sort_by` | string | yes |  | Sort By. The video metric the ranking is based on. One of `"SAVE"`, `"IMPRESSION"`, `"OUTBOUND_CLICK"`, `"VIDEO_MRC_VIEW"`, `"VIDEO_AVG_WATCH_TIME"`, `"VIDEO_V50_WATCH_TIME"`, `"QUARTILE_95_PERCENT_VIEW"`, `"VIDEO_10S_VIEW"`, `"VIDEO_START"`. |
| `num_of_pins` | number | no |  | Number of Pins. How many Pins to return (1-50, Pinterest defaults to 10). |

Output fields:

- `sort_by`: Sorted By
- `pins`: Top Pins
- `pins[].pin_id`: Pin ID
- `pins[].metrics`: Metrics (an object whose keys vary)
- `pins[].data_status`: Data Status (an object whose keys vary)
- `date_availability`: Date Availability
- `date_availability.latest_available_timestamp`: Latest Available (datetime)
- `date_availability.is_realtime`: Is Realtime (boolean)

### `listFollowers`

**List Followers.** Lists the accounts that follow the connected account, newest first. Pinterest returns only a username and account type per follower, so use Get User Account for richer profile data. Use List Following for the accounts this account follows instead. Pages through an opaque bookmark cursor, so a large audience needs several calls. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_size` | number | no |  | Page Size. Followers per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Accounts
- `items[].username`: Username
- `items[].type`: Account Type
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark

### `listFollowing`

**List Following.** Lists the accounts the connected account follows, returning each username with its follower count. Use it to check whether the account already follows someone; use List Followers for the other direction and List Followed Boards for boards rather than people. Pages through an opaque bookmark cursor. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `feed_type` | string | no |  | Feed Type. Which followees to keep. Pinterest defaults to all of them. One of `"ALL"`, `"RANKED"`, `"CREATOR_ONLY"`, `"RANKED_CREATOR_ONLY"`. |
| `page_size` | number | no |  | Page Size. Accounts per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Accounts
- `items[].username`: Username
- `items[].type`: Account Type
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark

### `listFollowedBoards`

**List Followed Boards.** Lists boards owned by other accounts that the connected account follows. Use it to see which boards feed this account; use List Boards for the boards the account itself owns, which is what pin actions need. Pages through an opaque bookmark cursor. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_size` | number | no |  | Page Size. Boards per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Boards
- `items[].id`: Board ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].privacy`: Privacy
- `items[].owner`: Owner
- `items[].owner.username`: Username
- `items[].pin_count`: Pin Count (number)
- `items[].follower_count`: Follower Count (number)
- `items[].collaborator_count`: Collaborator Count (number)
- `items[].is_ads_only`: Ads Only (boolean)
- `items[].media`: Media
- `items[].media.image_cover_url`: Cover Image (image)
- `items[].media.pin_thumbnail_urls`: Pin Thumbnails
- `items[].created_at`: Created At (datetime)
- `items[].board_pins_modified_at`: Pins Modified At (datetime)
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark

### `listLinkedBusinesses`

**List Linked Businesses.** Lists the business accounts linked to the connected account, returning each business id and username. Use it when an action needs to operate on behalf of a linked business rather than the personal account. Takes no input; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `items`: Linked Businesses
- `items[].username`: Username
- `items[].image_small_url`: Small Image (image)
- `items[].image_medium_url`: Medium Image (image)
- `items[].image_large_url`: Large Image (image)
- `items[].image_xlarge_url`: Extra Large Image (image)
- `count`: Count (number)

### `listVerifiedWebsites`

**List Verified Websites.** Lists the websites the connected account has claimed, with the verification status and method for each. Use it to check whether a domain is claimed before publishing Pins that link to it, since claimed domains attribute traffic back to the account. Read-only and idempotent; claiming a new website needs a scope this connection does not hold. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_size` | number | no |  | Page Size. Websites per page (1-250, Pinterest defaults to 25). |
| `bookmark` | string | no |  | Bookmark. Opaque cursor returned by a previous call; omit to read the first page. |

Output fields:

- `items`: Websites
- `items[].website`: Website (url)
- `items[].status`: Verification Status
- `items[].verified_at`: Verified At (datetime)
- `count`: Count on This Page (number)
- `bookmark`: Next Page Bookmark
