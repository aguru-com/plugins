# Foreplay

Competitive advertising data and creative insights platform. Search, filter, and analyze ads and brands with live and historical ad creatives, metadata, and competitive intelligence.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-foreplay-co'
  version: '0.1.9'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Foreplay.co API key

## Actions

### `getAdById`

**Get Ad by ID.** Fetch the full details of one Foreplay ad by its ad ID. Use when you already have a specific ad ID (e.g. from a search or a trigger) and need its complete metadata. Requires the exact ad ID; read-only, so repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ad_id` | string | yes |  | Ad ID. The unique identifier of the ad (e.g., "ad_1234567890"). You can find this ID from other Foreplay actions or the platform. |

### `getAdsByPage`

**Get Ads by Page.** List the ads run by a specific advertiser, keyed by their Facebook Page ID, with optional filters (date range, platform, format, niche, market, language, live-only) and cursor pagination. Use when you want every ad from one known page rather than a free-text search across all advertisers. Requires the Facebook Page ID; read-only, so repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The numeric Facebook page ID (e.g., "123456789"). You can find this in your Facebook page settings or from other Foreplay actions. |
| `start_date` | ISO date-time string | no |  | Start Date. Start date (inclusive). Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS. |
| `end_date` | ISO date-time string | no |  | End Date. End date (inclusive). Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS. |
| `order` | string | no |  | Order. Order of results: newest (default), oldest, longest_running, or most_relevant. One of `"newest"`, `"oldest"`, `"longest_running"`, `"most_relevant"`. |
| `live` | string | no |  | Live Status. Filter ads by live status. true means currently active ads, false means inactive ads. One of `"true"`, `"false"`. |
| `display_format` | array | no |  | Display Format. Filter by one or more display formats. Values the product loads from the provider, such as ids; write an array of them. |
| `publisher_platform` | array | no |  | Publisher Platform. Filter by one or more publisher platforms. Values the product loads from the provider, such as ids; write an array of them. |
| `niches` | array | no |  | Niches. Filter by one or more niches. Values the product loads from the provider, such as ids; write an array of them. |
| `market_target` | array | no |  | Market Target. Filter by market target. Values the product loads from the provider, such as ids; write an array of them. |
| `languages` | array | no |  | Languages. Filter by languages. Accepts various language formats. Values the product loads from the provider, such as ids; write an array of them. |
| `cursor` | string | no |  | Cursor. Cursor for pagination. Use the cursor value from the previous response. |
| `limit` | number | no | `10` | Limit. Pagination limit (default 10, max 250). Controls the number of ads returned per request. |

### `findBrands`

**Find Brands.** Search the Foreplay brand directory by name using fuzzy matching, returning matching brands. Use to resolve a brand name to its Foreplay brand record (e.g. to discover a brand ID before fetching its ads). Requires a query string; read-only, so repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Brand Name. Brand name to search for (e.g., "Nike", "Apple"). Supports fuzzy matching for partial names. |
| `limit` | number | no | `10` | Limit. Number of brands to return (max 10). |

### `findAds`

**Find Ads.** Search the Foreplay ad discovery library across all advertisers, optionally filtered by free-text query, date range, platform, display format, niche, market, language, and live-only status, with cursor pagination. With no query or filters it returns the broad feed; supply filters to narrow to matching ads. Use for cross-advertiser ad research rather than pulling ads for one known page. Read-only, so repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Search text for ad name or description. Leave empty to search all ads with filters only. |
| `start_date` | ISO date-time string | no |  | Start Date. Start date (inclusive). Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS. |
| `end_date` | ISO date-time string | no |  | End Date. End date (inclusive). Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS. |
| `order` | string | no |  | Order. Order of results: newest (default), oldest, longest_running, or most_relevant. One of `"newest"`, `"oldest"`, `"longest_running"`, `"most_relevant"`. |
| `live` | string | no |  | Live Status. Filter ads by live status. true means currently active ads, false means inactive ads. One of `"true"`, `"false"`. |
| `display_format` | array | no |  | Display Format. Filter by one or more display formats. Values the product loads from the provider, such as ids; write an array of them. |
| `publisher_platform` | array | no |  | Publisher Platform. Filter by one or more publisher platforms. Values the product loads from the provider, such as ids; write an array of them. |
| `niches` | array | no |  | Niches. Filter by one or more niches. Values the product loads from the provider, such as ids; write an array of them. |
| `market_target` | array | no |  | Market Target. Filter by market target. Values the product loads from the provider, such as ids; write an array of them. |
| `languages` | array | no |  | Languages. Filter by languages. Accepts various language formats. Values the product loads from the provider, such as ids; write an array of them. |
| `cursor` | string | no |  | Cursor. Cursor for pagination. Use the cursor value from the previous response. |
| `limit` | number | no | `10` | Limit. Pagination limit (default 10, max 250). Controls the number of ads returned per request. |

### `findBoards`

**Find Boards.** List the saved ad boards belonging to the authenticated Foreplay account, with offset/limit pagination. Use to discover available board IDs and names, for example before watching a board for new ads. Read-only, so repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `offset` | number | no | `0` | Offset. The offset for pagination (default 0). |
| `limit` | number | no | `10` | Limit. The limit for pagination (default 10, max 10). |
