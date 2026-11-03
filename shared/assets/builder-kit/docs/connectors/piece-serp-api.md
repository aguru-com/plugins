# SerpApi

Search Google, YouTube, News, and Trends with powerful filtering and analysis capabilities

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-serp-api'
  version: '0.1.10'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from [Dashboard](https://serpapi.com/dashboard).

## Actions

### `google_search`

**Google Search.** Runs a Google web search via SerpApi and returns organic results for a query. Use to look up current web information, check rankings, or research a topic with controls for location, language, country, device, and pagination. Read-only and idempotent; requires the search query and a SerpApi API key. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Search query to execute. |
| `location_search` | string | no |  | Location Search. Type location name to search. |
| `location` | string | no |  | Location. Geographic location for results. A value the product loads from the provider, such as an id; write the value itself. |
| `hl` | string | no | `"en"` | Host Language (hl). Language for search results. One of `"en"`, `"af"`, `"ak"`, `"sq"`, `"am"`, `"ar"`, `"hy"`, `"az"`, `"eu"`, `"be"`, `"bem"`, `"bn"`, `"bh"`, `"bs"`, `"br"`, `"bg"`, `"bt"`, `"km"`, `"ca"`, `"chr"`, `"ny"`, `"zh-cn"`, `"zh-tw"`, `"co"`, `"hr"` and 126 more. |
| `google_domain` | string | no | `"google.com"` | Google Domain. Google domain to use. One of `"google.com"`, `"google.ad"`, `"google.ae"`, `"google.al"`, `"google.am"`, `"google.as"`, `"google.at"`, `"google.az"`, `"google.ba"`, `"google.be"`, `"google.bf"`, `"google.bg"`, `"google.bi"`, `"google.bj"`, `"google.bs"`, `"google.bt"`, `"google.by"`, `"google.ca"`, `"google.cd"`, `"google.cf"`, `"google.cg"`, `"google.ch"`, `"google.ci"`, `"google.cl"`, `"google.cm"` and 160 more. |
| `gl` | string | no |  | Country (gl). Country for search results. One of `"us"`, `"af"`, `"al"`, `"dz"`, `"as"`, `"ad"`, `"ao"`, `"ai"`, `"aq"`, `"ag"`, `"ar"`, `"am"`, `"aw"`, `"au"`, `"at"`, `"az"`, `"bs"`, `"bh"`, `"bd"`, `"bb"`, `"by"`, `"be"`, `"bz"`, `"bj"`, `"bm"` and 219 more. |
| `no_cache` | string | no | `"false"` | No Cache. Force fresh results. One of `"false"`, `"true"`. |
| `async` | string | no | `"false"` | Async. Submit search asynchronously. One of `"false"`, `"true"`. |
| `num_results` | number | no | `10` | Number of Results. Number of results to return (1-100) |
| `start` | number | no | `0` | Start Position. Starting position for pagination (0-990) |
| `safe` | string | no | `"active"` | Safe Search. Safe search filtering level. One of `"active"`, `"off"`. |
| `device` | string | no | `"desktop"` | Device Type. Device type for search simulation. One of `"desktop"`, `"mobile"`, `"tablet"`. |
| `filter` | string | no | `"0"` | Result Filter. Filter duplicate results. One of `"0"`, `"1"`. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.search_information`: Search Information
- `data.search_information.total_results`: Total Results (number)
- `data.search_information.time_taken_displayed`: Time Taken (s) (number)
- `data.organic_results`: Results
- `data.organic_results[].position`: Position (number)
- `data.organic_results[].title`: Title
- `data.organic_results[].link`: Link (url)
- `data.organic_results[].displayed_link`: Displayed Link
- `data.organic_results[].snippet`: Snippet
- `data.organic_results[].favicon`: Favicon (image)
- `data.related_questions`: Related Questions
- `data.related_questions[].question`: Question
- `data.related_questions[].snippet`: Snippet
- `data.related_questions[].link`: Link (url)
- `data.related_searches`: Related Searches
- `data.related_searches[].query`: Query
- `data.related_searches[].link`: Link (url)

### `google_news_search`

**Google News Search.** Searches Google News via SerpApi for recent articles matching a query. Use to monitor brand or topic mentions in the news, surface breaking coverage, or gather current headlines, scoped by language and country. Read-only and idempotent; requires the query and a SerpApi API key. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. News search query. |
| `hl` | string | no | `"en"` | Host Language (hl). Language for search results. One of `"en"`, `"af"`, `"ak"`, `"sq"`, `"am"`, `"ar"`, `"hy"`, `"az"`, `"eu"`, `"be"`, `"bem"`, `"bn"`, `"bh"`, `"bs"`, `"br"`, `"bg"`, `"bt"`, `"km"`, `"ca"`, `"chr"`, `"ny"`, `"zh-cn"`, `"zh-tw"`, `"co"`, `"hr"` and 126 more. |
| `gl` | string | no |  | Country (gl). Country for search results. One of `"us"`, `"af"`, `"al"`, `"dz"`, `"as"`, `"ad"`, `"ao"`, `"ai"`, `"aq"`, `"ag"`, `"ar"`, `"am"`, `"aw"`, `"au"`, `"at"`, `"az"`, `"bs"`, `"bh"`, `"bd"`, `"bb"`, `"by"`, `"be"`, `"bz"`, `"bj"`, `"bm"` and 219 more. |
| `no_cache` | string | no | `"false"` | No Cache. Force fresh results. One of `"false"`, `"true"`. |
| `async` | string | no | `"false"` | Async. Submit search asynchronously. One of `"false"`, `"true"`. |
| `output` | string | no | `"json"` | Output. Output format for results. One of `"json"`, `"html"`. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.news_results`: News
- `data.news_results[].position`: Position (number)
- `data.news_results[].title`: Title
- `data.news_results[].link`: Link (url)
- `data.news_results[].thumbnail`: Thumbnail (image)
- `data.news_results[].date`: Date
- `data.news_results[].iso_date`: ISO Date (datetime)
- `data.news_results[].source`: Source
- `data.news_results[].source.name`: Source Name
- `data.news_results[].source.icon`: Source Icon (image)

### `youtube_search`

**YouTube Search.** Searches YouTube via SerpApi for videos matching a query. Use to find video content on a topic, discover channels, or research what is being published, scoped by language and country. Read-only and idempotent; requires the search query and a SerpApi API key. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. YouTube search query. |
| `hl` | string | no | `"en"` | Host Language (hl). Language for search results. One of `"en"`, `"af"`, `"ak"`, `"sq"`, `"am"`, `"ar"`, `"hy"`, `"az"`, `"eu"`, `"be"`, `"bem"`, `"bn"`, `"bh"`, `"bs"`, `"br"`, `"bg"`, `"bt"`, `"km"`, `"ca"`, `"chr"`, `"ny"`, `"zh-cn"`, `"zh-tw"`, `"co"`, `"hr"` and 126 more. |
| `gl` | string | no |  | Country (gl). Country for search results. One of `"us"`, `"af"`, `"al"`, `"dz"`, `"as"`, `"ad"`, `"ao"`, `"ai"`, `"aq"`, `"ag"`, `"ar"`, `"am"`, `"aw"`, `"au"`, `"at"`, `"az"`, `"bs"`, `"bh"`, `"bd"`, `"bb"`, `"by"`, `"be"`, `"bz"`, `"bj"`, `"bm"` and 219 more. |
| `no_cache` | string | no | `"false"` | No Cache. Force fresh results. One of `"false"`, `"true"`. |
| `async` | string | no | `"false"` | Async. Submit search asynchronously. One of `"false"`, `"true"`. |
| `output` | string | no | `"json"` | Output. Output format for results. One of `"json"`, `"html"`. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.video_results`: Videos
- `data.video_results[].title`: Title
- `data.video_results[].link`: Link (url)
- `data.video_results[].video_id`: Video ID
- `data.video_results[].published_date`: Published
- `data.video_results[].views`: Views (number)
- `data.video_results[].length`: Length
- `data.video_results[].description`: Description
- `data.video_results[].channel`: Channel
- `data.video_results[].channel.name`: Channel Name
- `data.video_results[].channel.link`: Channel Link (url)
- `data.video_results[].channel.verified`: Verified (boolean)
- `data.video_results[].channel.thumbnail`: Channel Thumbnail (image)
- `data.video_results[].thumbnail`: Thumbnail
- `data.video_results[].thumbnail.static`: Thumbnail Image (image)
- `data.shorts_results`: Shorts
- `data.shorts_results[].position_on_page`: Position On Page (number)
- `data.shorts_results[].shorts`: Shorts
- `data.shorts_results[].shorts[].title`: Title
- `data.shorts_results[].shorts[].link`: Link (url)
- `data.shorts_results[].shorts[].thumbnail`: Thumbnail (image)
- `data.shorts_results[].shorts[].views`: Views (number)

### `google_trends_search`

**Google Trends Search.** Queries Google Trends via SerpApi for interest in a keyword over time and across regions. Use to gauge a topic's popularity trajectory, compare geographic interest, or find related/rising queries for content and market research. Read-only and idempotent; requires the query, a SerpApi API key, and a chosen data type (interest over time, by region, related topics, or related queries). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The keyword or topic to analyze trends for (e.g., "artificial intelligence", "cryptocurrency", "climate change") |
| `hl` | string | no | `"en"` | Host Language (hl). Language for search results. One of `"en"`, `"af"`, `"ak"`, `"sq"`, `"am"`, `"ar"`, `"hy"`, `"az"`, `"eu"`, `"be"`, `"bem"`, `"bn"`, `"bh"`, `"bs"`, `"br"`, `"bg"`, `"bt"`, `"km"`, `"ca"`, `"chr"`, `"ny"`, `"zh-cn"`, `"zh-tw"`, `"co"`, `"hr"` and 126 more. |
| `geo` | string | no | `""` | Geographic Location. Location from where you want the search to originate. One of `""`, `"AF"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 215 more. |
| `data_type` | string | no | `"TIMESERIES"` | Data Type. Type of trends data to retrieve. One of `"TIMESERIES"`, `"GEO_MAP"`, `"GEO_MAP_0"`, `"RELATED_TOPICS"`, `"RELATED_QUERIES"`. |
| `time_period` | string | no | `"today 12-m"` | Time Period. Time range for the trends data. One of `"now 1-H"`, `"now 4-H"`, `"now 1-d"`, `"now 7-d"`, `"today 1-m"`, `"today 3-m"`, `"today 12-m"`, `"today 5-y"`, `"all"`. |
| `category` | number | no | `0` | Category. Google Trends category ID (0 for all categories) |
| `property_filter` | string | no | `""` | Property Filter (grop). Filter by Google property. One of `""`, `"images"`, `"news"`, `"froogle"`, `"youtube"`. |
| `no_cache` | string | no | `"false"` | No Cache. Force SerpApi to fetch the Google results even if a cached version is already present. One of `"false"`, `"true"`. |
| `async` | string | no | `"false"` | Async. Defines the way you want to submit your search to SerpApi. It can be set to false (default) to open an HTTP connection and keep it open until you got your search results, or true to just submit your search to SerpApi and retrieve them later. One of `"false"`, `"true"`. |
| `output` | string | no | `"json"` | Output. Defines the final output format you want. One of `"json"`, `"html"`. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.interest_over_time`: Interest Over Time
- `data.interest_over_time.timeline_data`: Timeline
- `data.interest_over_time.timeline_data[].date`: Date
- `data.interest_over_time.timeline_data[].timestamp`: Timestamp
- `data.interest_over_time.timeline_data[].values`: Values
- `data.interest_over_time.timeline_data[].values[].query`: Query
- `data.interest_over_time.timeline_data[].values[].value`: Value
- `data.interest_over_time.timeline_data[].values[].extracted_value`: Extracted Value (number)
- `data.related_topics`: Related Topics
- `data.related_topics.top`: Top Topics
- `data.related_topics.top[].topic`: Topic
- `data.related_topics.top[].topic.title`: Title
- `data.related_topics.top[].topic.type`: Type
- `data.related_topics.top[].value`: Trend Label
- `data.related_topics.top[].extracted_value`: Extracted Value (number)
- `data.related_topics.top[].link`: Google Trends Link (url)
- `data.related_topics.rising`: Rising Topics
- `data.related_topics.rising[].topic`: Topic
- `data.related_topics.rising[].topic.title`: Title
- `data.related_topics.rising[].topic.type`: Type
- `data.related_topics.rising[].value`: Trend Label
- `data.related_topics.rising[].extracted_value`: Extracted Value (number)
- `data.related_topics.rising[].link`: Google Trends Link (url)
- `data.related_queries`: Related Queries
- `data.related_queries.top`: Top Queries
- `data.related_queries.top[].query`: Query
- `data.related_queries.top[].value`: Trend Label
- `data.related_queries.top[].extracted_value`: Extracted Value (number)
- `data.related_queries.top[].link`: Google Trends Link (url)
- `data.related_queries.rising`: Rising Queries
- `data.related_queries.rising[].query`: Query
- `data.related_queries.rising[].value`: Trend Label
- `data.related_queries.rising[].extracted_value`: Extracted Value (number)
- `data.related_queries.rising[].link`: Google Trends Link (url)
- `data.compared_breakdown_by_region`: Compared Breakdown By Region
- `data.compared_breakdown_by_region[].geo`: Geo Code
- `data.compared_breakdown_by_region[].location`: Location
- `data.compared_breakdown_by_region[].max_value_index`: Max Value Index (number)
- `data.compared_breakdown_by_region[].values`: Values
- `data.compared_breakdown_by_region[].values[].query`: Query
- `data.compared_breakdown_by_region[].values[].value`: Value
- `data.compared_breakdown_by_region[].values[].extracted_value`: Extracted Value (number)
- `data.interest_by_region`: Interest By Region
- `data.interest_by_region[].geo`: Geo Code
- `data.interest_by_region[].location`: Location
- `data.interest_by_region[].max_value_index`: Max Value Index (number)
- `data.interest_by_region[].value`: Value
- `data.interest_by_region[].extracted_value`: Extracted Value (number)

### `search_google_web_ai`

**Google Search (Agent).** Search the web with Google and get ranked organic results for a query. Use for general web lookups, current information, rankings, or topic research. For news pick Search Google News, for videos Search YouTube, for products Search Google Shopping. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The web search query to execute, e.g. "best electric cars 2024". |
| `location` | string | no |  | Location. Free-text geographic location to originate the search from, e.g. "Austin, Texas, United States". SerpApi resolves it server-side. Optional. |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es", "fr". Optional. |
| `gl` | string | no |  | Country (gl). Two-character lowercase ISO 3166-1 country code, e.g. "us", "gb", "de". Optional. |
| `device` | string | no |  | Device. Device to simulate: one of "desktop", "mobile", or "tablet". Optional. |
| `safe` | string | no |  | Safe Search. Safe-search level: "active" or "off". Optional. |
| `num_results` | number | no |  | Number of Results. Number of results to return (1-100). Optional. |
| `start` | number | no |  | Start Position. Zero-based offset for pagination (0-990). Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.search_information`: Search Information
- `data.search_information.total_results`: Total Results (number)
- `data.search_information.time_taken_displayed`: Time Taken (s) (number)
- `data.organic_results`: Results
- `data.organic_results[].position`: Position (number)
- `data.organic_results[].title`: Title
- `data.organic_results[].link`: Link (url)
- `data.organic_results[].displayed_link`: Displayed Link
- `data.organic_results[].snippet`: Snippet
- `data.organic_results[].favicon`: Favicon (image)
- `data.related_questions`: Related Questions
- `data.related_questions[].question`: Question
- `data.related_questions[].snippet`: Snippet
- `data.related_questions[].link`: Link (url)
- `data.related_searches`: Related Searches
- `data.related_searches[].query`: Query
- `data.related_searches[].link`: Link (url)

### `search_google_news_ai`

**Google News Search (Agent).** Search Google News for recent news articles matching a query. Use to get the latest news headlines about a company, brand, person, or topic, monitor press and media mentions, or track breaking news coverage. For general web results pick Search Google instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The news search query, e.g. "renewable energy policy". |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es", "fr". Optional. |
| `gl` | string | no |  | Country (gl). Two-character lowercase ISO 3166-1 country code, e.g. "us", "gb", "de". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.news_results`: News
- `data.news_results[].position`: Position (number)
- `data.news_results[].title`: Title
- `data.news_results[].link`: Link (url)
- `data.news_results[].thumbnail`: Thumbnail (image)
- `data.news_results[].date`: Date
- `data.news_results[].iso_date`: ISO Date (datetime)
- `data.news_results[].source`: Source
- `data.news_results[].source.name`: Source Name
- `data.news_results[].source.icon`: Source Icon (image)

### `search_youtube_ai`

**YouTube Search (Agent).** Search YouTube for videos about a topic or query. Use to find videos, discover channels, look up video content, or research what is being published about a subject. For news articles pick Search Google News. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The YouTube search query, e.g. "how to bake sourdough". |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es", "fr". Optional. |
| `gl` | string | no |  | Country (gl). Two-character lowercase ISO 3166-1 country code, e.g. "us", "gb", "de". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.video_results`: Videos
- `data.video_results[].title`: Title
- `data.video_results[].link`: Link (url)
- `data.video_results[].video_id`: Video ID
- `data.video_results[].published_date`: Published
- `data.video_results[].views`: Views (number)
- `data.video_results[].length`: Length
- `data.video_results[].description`: Description
- `data.video_results[].channel`: Channel
- `data.video_results[].channel.name`: Channel Name
- `data.video_results[].channel.link`: Channel Link (url)
- `data.video_results[].channel.verified`: Verified (boolean)
- `data.video_results[].channel.thumbnail`: Channel Thumbnail (image)
- `data.video_results[].thumbnail`: Thumbnail
- `data.video_results[].thumbnail.static`: Thumbnail Image (image)
- `data.shorts_results`: Shorts
- `data.shorts_results[].position_on_page`: Position On Page (number)
- `data.shorts_results[].shorts`: Shorts
- `data.shorts_results[].shorts[].title`: Title
- `data.shorts_results[].shorts[].link`: Link (url)
- `data.shorts_results[].shorts[].thumbnail`: Thumbnail (image)
- `data.shorts_results[].shorts[].views`: Views (number)

### `search_google_trends_ai`

**Google Trends Search (Agent).** Look up Google Trends data for how search interest in a keyword or topic changes over time and by region. Use to gauge a topic's popularity trajectory, compare geographic interest, or find related and rising queries. Choose the data type: "TIMESERIES" (interest over time), "GEO_MAP" (interest by region), "RELATED_TOPICS", or "RELATED_QUERIES". Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The keyword or topic to analyze trends for, e.g. "artificial intelligence". |
| `data_type` | string | no |  | Data Type. Type of trends data: one of "TIMESERIES" (interest over time, default), "GEO_MAP" (interest by region), "RELATED_TOPICS", or "RELATED_QUERIES". Optional. |
| `geo` | string | no |  | Geographic Location. Uppercase two-letter region code to scope the trend to, e.g. "US", "GB", "JP". Leave empty for worldwide. Optional. |
| `date` | string | no |  | Time Period. Trends date range token, e.g. "today 12-m" (past 12 months), "today 5-y", "now 7-d", or "all". Optional. |
| `category` | number | no |  | Category. Google Trends category id (0 for all categories). Optional. |
| `gprop` | string | no |  | Property Filter. Google property to filter by: empty for web, or "images", "news", "froogle" (shopping), "youtube". Optional. |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es", "fr". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.interest_over_time`: Interest Over Time
- `data.interest_over_time.timeline_data`: Timeline
- `data.interest_over_time.timeline_data[].date`: Date
- `data.interest_over_time.timeline_data[].timestamp`: Timestamp
- `data.interest_over_time.timeline_data[].values`: Values
- `data.interest_over_time.timeline_data[].values[].query`: Query
- `data.interest_over_time.timeline_data[].values[].value`: Value
- `data.interest_over_time.timeline_data[].values[].extracted_value`: Extracted Value (number)
- `data.related_topics`: Related Topics
- `data.related_topics.top`: Top Topics
- `data.related_topics.top[].topic`: Topic
- `data.related_topics.top[].topic.title`: Title
- `data.related_topics.top[].topic.type`: Type
- `data.related_topics.top[].value`: Trend Label
- `data.related_topics.top[].extracted_value`: Extracted Value (number)
- `data.related_topics.top[].link`: Google Trends Link (url)
- `data.related_topics.rising`: Rising Topics
- `data.related_topics.rising[].topic`: Topic
- `data.related_topics.rising[].topic.title`: Title
- `data.related_topics.rising[].topic.type`: Type
- `data.related_topics.rising[].value`: Trend Label
- `data.related_topics.rising[].extracted_value`: Extracted Value (number)
- `data.related_topics.rising[].link`: Google Trends Link (url)
- `data.related_queries`: Related Queries
- `data.related_queries.top`: Top Queries
- `data.related_queries.top[].query`: Query
- `data.related_queries.top[].value`: Trend Label
- `data.related_queries.top[].extracted_value`: Extracted Value (number)
- `data.related_queries.top[].link`: Google Trends Link (url)
- `data.related_queries.rising`: Rising Queries
- `data.related_queries.rising[].query`: Query
- `data.related_queries.rising[].value`: Trend Label
- `data.related_queries.rising[].extracted_value`: Extracted Value (number)
- `data.related_queries.rising[].link`: Google Trends Link (url)
- `data.compared_breakdown_by_region`: Compared Breakdown By Region
- `data.compared_breakdown_by_region[].geo`: Geo Code
- `data.compared_breakdown_by_region[].location`: Location
- `data.compared_breakdown_by_region[].max_value_index`: Max Value Index (number)
- `data.compared_breakdown_by_region[].values`: Values
- `data.compared_breakdown_by_region[].values[].query`: Query
- `data.compared_breakdown_by_region[].values[].value`: Value
- `data.compared_breakdown_by_region[].values[].extracted_value`: Extracted Value (number)
- `data.interest_by_region`: Interest By Region
- `data.interest_by_region[].geo`: Geo Code
- `data.interest_by_region[].location`: Location
- `data.interest_by_region[].max_value_index`: Max Value Index (number)
- `data.interest_by_region[].value`: Value
- `data.interest_by_region[].extracted_value`: Extracted Value (number)

### `search_google_maps`

**Search Google Maps.** Search Google Maps for local businesses and places matching a query: names, ratings, reviews, addresses, phone numbers, opening hours, and GPS coordinates. Use to find businesses, restaurants, or services in an area. Pass `ll` to anchor the search to a map center; `ll` is effectively required once you paginate with `start`. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. What to search for, e.g. "coffee shops" or "Pizza Hut". |
| `ll` | string | no |  | Map Center (ll). GPS coordinates of the map center as "@latitude,longitude,zoom", e.g. "@40.7455096,-74.0083012,14z". Required once you paginate with Start. Optional otherwise. |
| `start` | number | no |  | Start Position. Zero-based offset for pagination (multiples of 20). Requires Map Center (ll). Optional. |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es". Optional. |
| `gl` | string | no |  | Country (gl). Two-character lowercase ISO 3166-1 country code, e.g. "us", "gb". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.local_results`: Places
- `data.local_results[].position`: Position (number)
- `data.local_results[].title`: Title
- `data.local_results[].place_id`: Place ID
- `data.local_results[].data_id`: Data ID
- `data.local_results[].data_cid`: Data CID
- `data.local_results[].rating`: Rating (number)
- `data.local_results[].reviews`: Review Count (number)
- `data.local_results[].price`: Price Range
- `data.local_results[].type`: Primary Type
- `data.local_results[].address`: Address
- `data.local_results[].phone`: Phone
- `data.local_results[].website`: Website (url)
- `data.local_results[].hours`: Hours
- `data.local_results[].gps_coordinates`: GPS Coordinates
- `data.local_results[].gps_coordinates.latitude`: Latitude (number)
- `data.local_results[].gps_coordinates.longitude`: Longitude (number)

### `search_google_scholar`

**Search Google Scholar.** Search Google Scholar for academic papers, scholarly articles, and citations matching a query. Use to research literature, find citations, or gather academic sources. Restrict by publication year with `as_ylo`/`as_yhi`. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The academic search query, e.g. "transformer neural networks". |
| `num_results` | number | no |  | Number of Results. Number of results to return (1-20). Optional. |
| `start` | number | no |  | Start Position. Zero-based offset for pagination (multiples of 10). Optional. |
| `as_ylo` | number | no |  | From Year. Lower bound of the publication year range, e.g. 2018. Optional. |
| `as_yhi` | number | no |  | To Year. Upper bound of the publication year range, e.g. 2024. Optional. |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.organic_results`: Results
- `data.organic_results[].position`: Position (number)
- `data.organic_results[].title`: Title
- `data.organic_results[].result_id`: Result ID
- `data.organic_results[].link`: Link (url)
- `data.organic_results[].snippet`: Snippet
- `data.organic_results[].publication_info`: Publication Info
- `data.organic_results[].publication_info.summary`: Summary
- `data.organic_results[].resources`: Resources
- `data.organic_results[].resources[].title`: Source
- `data.organic_results[].resources[].file_format`: File Format
- `data.organic_results[].resources[].link`: Link (url)
- `data.organic_results[].inline_links`: Links
- `data.organic_results[].inline_links.cited_by`: Cited By
- `data.organic_results[].inline_links.cited_by.total`: Citation Count (number)
- `data.organic_results[].inline_links.cited_by.link`: Citations Link (url)
- `data.organic_results[].inline_links.versions`: Versions
- `data.organic_results[].inline_links.versions.total`: Version Count (number)
- `data.organic_results[].inline_links.versions.link`: Versions Link (url)

### `search_google_images`

**Search Google Images.** Search Google Images for pictures and photos matching a query. Use to discover images on a topic, find a full-resolution image URL, or locate the page an image came from. Page through results with the page index. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. What images to search for, e.g. "golden gate bridge". |
| `num_results` | number | no |  | Number of Results. Number of image results to return (up to 100). Optional. |
| `ijn` | number | no |  | Page Index. Zero-based page index for image pagination (0 = first page, 1 = second, ...). Optional. |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es". Optional. |
| `gl` | string | no |  | Country (gl). Two-character lowercase ISO 3166-1 country code, e.g. "us", "gb". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.images_results`: Images
- `data.images_results[].position`: Position (number)
- `data.images_results[].title`: Title
- `data.images_results[].link`: Source Page Link (url)
- `data.images_results[].source`: Source
- `data.images_results[].original`: Original Image (image)
- `data.images_results[].original_width`: Width (number)
- `data.images_results[].original_height`: Height (number)
- `data.images_results[].thumbnail`: Thumbnail (image)
- `data.related_searches`: Related Searches
- `data.related_searches[].query`: Query

### `search_google_shopping`

**Search Google Shopping.** Search Google Shopping for products matching a query, to compare prices, merchants, and ratings across stores. Use for product research or price comparison before buying. Paginate with Start (preferred on this engine). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The product to search for, e.g. "wireless headphones". |
| `start` | number | no |  | Start Position. Zero-based offset for pagination (multiples of 60). Optional. |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es". Optional. |
| `gl` | string | no |  | Country (gl). Two-character lowercase ISO 3166-1 country code, e.g. "us", "gb". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.shopping_results`: Products
- `data.shopping_results[].position`: Position (number)
- `data.shopping_results[].title`: Title
- `data.shopping_results[].product_id`: Product ID
- `data.shopping_results[].source`: Source
- `data.shopping_results[].price`: Price
- `data.shopping_results[].extracted_price`: Extracted Price (number)
- `data.shopping_results[].old_price`: Old Price
- `data.shopping_results[].extracted_old_price`: Extracted Old Price (number)
- `data.shopping_results[].rating`: Rating (number)
- `data.shopping_results[].reviews`: Review Count (number)
- `data.shopping_results[].snippet`: Snippet
- `data.shopping_results[].thumbnail`: Thumbnail (image)
- `data.shopping_results[].tag`: Tag
- `data.shopping_results[].delivery`: Delivery

### `search_google_jobs`

**Search Google Jobs.** Search Google Jobs for job listings, job openings, and vacancies matching a role, title, or keyword. Use to find open positions or job postings, optionally narrowed with a free-text Location; set Listing Type to "1" for remote / work-from-home roles. Paginate with the next page token from a prior response. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The job role to search for, e.g. "software engineer". |
| `location` | string | no |  | Location. Free-text location, e.g. "New York, NY". SerpApi resolves it server-side. Optional. |
| `ltype` | string | no |  | Listing Type. Set to "1" to return only work-from-home jobs. Optional. |
| `next_page_token` | string | no |  | Next Page Token. Pagination token from the `next_page_token` field of a previous response. Optional. |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es". Optional. |
| `gl` | string | no |  | Country (gl). Two-character lowercase ISO 3166-1 country code, e.g. "us", "gb". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.jobs_results`: Jobs
- `data.jobs_results[].title`: Job Title
- `data.jobs_results[].company_name`: Company
- `data.jobs_results[].location`: Location
- `data.jobs_results[].via`: Source
- `data.jobs_results[].description`: Description
- `data.jobs_results[].thumbnail`: Company Logo (image)
- `data.jobs_results[].job_id`: Job ID
- `data.jobs_results[].detected_extensions`: Details
- `data.jobs_results[].detected_extensions.posted_at`: Posted At
- `data.jobs_results[].detected_extensions.schedule_type`: Schedule Type
- `data.jobs_results[].detected_extensions.qualifications`: Qualifications
- `data.jobs_results[].apply_options`: Apply Options
- `data.jobs_results[].apply_options[].title`: Source
- `data.jobs_results[].apply_options[].link`: Apply Link (url)
- `data.serpapi_pagination`: Pagination
- `data.serpapi_pagination.next_page_token`: Next Page Token

### `search_google_lens`

**Search Google Lens.** Run a Google Lens reverse image search on a publicly accessible image URL to find visual matches for a picture. Use to identify what is in an image, find where an image appears online, or find visually similar items. Optionally refine with a text query. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Image URL. Publicly accessible URL of the image to analyze, e.g. "https://example.com/photo.jpg". |
| `query` | string | no |  | Text Refinement. Optional text query to refine the visual search. |
| `country` | string | no |  | Country. Two-letter country code for results, e.g. "us", "gb". Optional. |
| `type` | string | no |  | Search Type. Lens search type, e.g. "all" (default), "products", or "visual_matches". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.ai_overview`: AI Overview
- `data.ai_overview.page_token`: AI Overview Page Token
- `data.visual_matches`: Visual Matches
- `data.visual_matches[].position`: Position (number)
- `data.visual_matches[].title`: Title
- `data.visual_matches[].link`: Link (url)
- `data.visual_matches[].source`: Source
- `data.visual_matches[].thumbnail`: Thumbnail (image)
- `data.knowledge_graph`: Knowledge Graph
- `data.knowledge_graph.title`: Title
- `data.knowledge_graph.subtitle`: Subtitle
- `data.knowledge_graph.link`: Link (url)
- `data.knowledge_graph.thumbnail`: Thumbnail (image)

### `search_google_local_services`

**Search Google Local Services.** Search Google Local Services Ads for vetted local service providers (plumbers, electricians, cleaners, and similar trades) matching a query. Requires a Data CID identifying the geographic region; this is an opaque id with no resolver in this piece, so it must be supplied by the caller. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The service category to search for, e.g. "plumber" or "electrician". |
| `data_cid` | string | yes |  | Data CID. Opaque region identifier (data_cid) for the local-services area. Must be supplied by the caller; this piece has no resolver for it. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.local_ads`: Local Service Ads
- `data.local_ads[].title`: Business Name
- `data.local_ads[].link`: Profile Link (url)
- `data.local_ads[].rating`: Rating (number)
- `data.local_ads[].reviews`: Review Count (number)
- `data.local_ads[].phone`: Phone
- `data.local_ads[].type`: Service Type
- `data.local_ads[].service_area`: Service Area
- `data.local_ads[].years_in_business`: Years In Business (number)
- `data.local_ads[].thumbnail`: Thumbnail (image)
- `data.local_ads[].hours`: Hours
- `data.local_ads[].hours.currently`: Currently

### `search_apple_app_store`

**Search Apple App Store.** Search the Apple App Store for iOS apps matching a name or keyword. Use to discover iOS apps, look up a specific app, or check an app's developer, rating, and price. For Android apps use Search Google Play instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Search Term. The app or keyword to search for, e.g. "meditation". |
| `num_results` | number | no |  | Number of Results. Number of results to return. Optional. |
| `country` | string | no |  | Country. Two-letter App Store country/storefront code, e.g. "us", "gb". Optional. |
| `lang` | string | no |  | Language. Language code for results, e.g. "en-us". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.search_information`: Search Information
- `data.search_information.results_count`: Results Count (number)
- `data.organic_results`: Apps
- `data.organic_results[].position`: Position (number)
- `data.organic_results[].id`: App ID
- `data.organic_results[].title`: Title
- `data.organic_results[].link`: App Store Link (url)
- `data.organic_results[].bundle_id`: Bundle ID
- `data.organic_results[].version`: Version
- `data.organic_results[].description`: Description
- `data.organic_results[].age_rating`: Age Rating
- `data.organic_results[].release_date`: Release Date
- `data.organic_results[].seller_link`: Seller Link (url)
- `data.organic_results[].price`: Price
- `data.organic_results[].price.type`: Price Type
- `data.organic_results[].rating`: Ratings
- `data.organic_results[].rating[].type`: Rating Type
- `data.organic_results[].rating[].rating`: Rating (number)
- `data.organic_results[].rating[].count`: Rating Count (number)
- `data.organic_results[].genres`: Genres
- `data.organic_results[].genres[].name`: Genre Name
- `data.organic_results[].developer`: Developer
- `data.organic_results[].developer.name`: Developer Name
- `data.organic_results[].developer.id`: Developer ID
- `data.organic_results[].developer.link`: Developer Link (url)

### `search_google_play`

**Search Google Play.** Search the Google Play store for Android apps, games, movies, or books matching a query. Use to discover Android apps or other Play content; set Store to "apps" (default), "games", "movies", or "books". For iOS apps use Search Apple App Store instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. What to search for, e.g. "puzzle games". |
| `store` | string | no |  | Store Section. Store section: "apps" (default), "games", "movies", or "books". Optional. |
| `apps_category` | string | no |  | Apps Category. Optional Google Play apps category filter, e.g. "GAME_PUZZLE". |
| `next_page_token` | string | no |  | Next Page Token. Pagination token from the `next_page_token` field of a previous response. Optional. |
| `hl` | string | no |  | Language (hl). Two-character lowercase ISO 639-1 language code, e.g. "en", "es". Optional. |
| `gl` | string | no |  | Country (gl). Two-character lowercase ISO 3166-1 country code, e.g. "us", "gb". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.organic_results`: Result Groups
- `data.organic_results[].items`: Apps
- `data.organic_results[].items[].title`: Title
- `data.organic_results[].items[].link`: Store Link (url)
- `data.organic_results[].items[].product_id`: Product ID
- `data.organic_results[].items[].rating`: Rating (number)
- `data.organic_results[].items[].author`: Developer
- `data.organic_results[].items[].category`: Category
- `data.organic_results[].items[].downloads`: Downloads
- `data.organic_results[].items[].description`: Description
- `data.organic_results[].items[].thumbnail`: Thumbnail (image)

### `search_yelp`

**Search Yelp.** Search Yelp for local businesses matching a description in a location: restaurants, shops, and services with ratings, review counts, categories, and price levels. Use to find well-rated businesses nearby or in a named city. Both what to search (Find Description) and where (Find Location) are required. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `find_desc` | string | yes |  | Find Description. What to search for, e.g. "italian restaurants" or "auto repair". |
| `find_loc` | string | yes |  | Find Location. Where to search, e.g. "San Francisco, CA". |
| `sortby` | string | no |  | Sort By. Sort order: "recommended" (default), "rating", or "review_count". Optional. |
| `attrs` | string | no |  | Attributes. Attribute filters, e.g. "RestaurantsPriceRange2.2". Optional. |
| `start` | number | no |  | Start Position. Zero-based offset for pagination (multiples of 10). Optional. |
| `yelp_domain` | string | no |  | Yelp Domain. Yelp domain to use, e.g. "yelp.com" (default). Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.organic_results`: Businesses
- `data.organic_results[].position`: Position (number)
- `data.organic_results[].title`: Title
- `data.organic_results[].link`: Link (url)
- `data.organic_results[].price`: Price Range
- `data.organic_results[].rating`: Rating (number)
- `data.organic_results[].reviews`: Review Count (number)
- `data.organic_results[].neighborhoods`: Neighborhood
- `data.organic_results[].open_state`: Open State
- `data.organic_results[].snippet`: Snippet
- `data.organic_results[].thumbnail`: Thumbnail (image)
- `data.organic_results[].categories`: Categories
- `data.organic_results[].categories[].title`: Category
- `data.organic_results[].categories[].link`: Link (url)

### `search_walmart`

**Search Walmart.** Search Walmart for products matching a query, to check prices, ratings, and availability. Use to look up Walmart product listings for price checks or stock research. Filter by price range and minimum rating, sort, and paginate by page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The product to search for, e.g. "office chair". |
| `page` | number | no |  | Page. Page number for pagination (1-based). Optional. |
| `sort` | string | no |  | Sort By. Sort order, e.g. "price_low", "price_high", "best_seller", "rating_high". Optional. |
| `min_price` | number | no |  | Minimum Price. Lowest product price to include. Optional. |
| `max_price` | number | no |  | Maximum Price. Highest product price to include. Optional. |
| `min_rating` | number | no |  | Minimum Rating. Lowest average rating to include (e.g. 4). Optional. |
| `store_id` | string | no |  | Store ID. Walmart store id to scope availability. Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.organic_results`: Products
- `data.organic_results[].us_item_id`: Item ID
- `data.organic_results[].product_id`: Product ID
- `data.organic_results[].title`: Title
- `data.organic_results[].thumbnail`: Thumbnail (image)
- `data.organic_results[].rating`: Rating (number)
- `data.organic_results[].reviews`: Review Count (number)
- `data.organic_results[].seller_name`: Seller Name
- `data.organic_results[].out_of_stock`: Out Of Stock (boolean)
- `data.organic_results[].free_shipping`: Free Shipping (boolean)
- `data.organic_results[].product_page_url`: Product Page (url)
- `data.organic_results[].primary_offer`: Offer
- `data.organic_results[].primary_offer.offer_price`: Price (currency)
- `data.organic_results[].primary_offer.min_price`: Minimum Price (currency)

### `search_bing`

**Search Bing.** Search the web with Bing and get ranked organic results for a query. Use as an alternative web search engine to cross-check or supplement Google web results. Paginate with Count (results per page) and First (offset of the first result). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The web search query to execute, e.g. "climate change report". |
| `cc` | string | no |  | Country Code (cc). Two-letter country code to scope results, e.g. "us", "gb". Optional. |
| `mkt` | string | no |  | Market (mkt). Market locale in language-country form, e.g. "en-US", "de-DE". Optional. |
| `count` | number | no |  | Count. Number of results to return per page. Optional. |
| `first` | number | no |  | First Result Offset. One-based index of the first result to return, for pagination. Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.search_information`: Search Information
- `data.search_information.total_results`: Total Results (number)
- `data.organic_results`: Results
- `data.organic_results[].position`: Position (number)
- `data.organic_results[].title`: Title
- `data.organic_results[].link`: Link (url)
- `data.organic_results[].displayed_link`: Displayed Link
- `data.organic_results[].snippet`: Snippet
- `data.organic_results[].thumbnail`: Thumbnail (image)

### `search_duckduckgo`

**Search DuckDuckGo.** Search the web with DuckDuckGo and get ranked organic results for a query. Use as a privacy-oriented alternative web search engine to cross-check or supplement Google and Bing web results. Scope results to a region with the Region code. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The web search query to execute, e.g. "open source databases". |
| `kl` | string | no |  | Region (kl). Region locale in country-language form, e.g. "us-en", "uk-en", "de-de". Optional. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.organic_results`: Results
- `data.organic_results[].position`: Position (number)
- `data.organic_results[].title`: Title
- `data.organic_results[].link`: Link (url)
- `data.organic_results[].snippet`: Snippet
- `data.organic_results[].date`: Date
- `data.organic_results[].favicon`: Favicon (image)
- `data.organic_results[].sitelinks`: Sitelinks
- `data.organic_results[].sitelinks[].title`: Title
- `data.organic_results[].sitelinks[].link`: Link (url)
- `data.organic_results[].sitelinks[].snippet`: Snippet
- `data.related_searches`: Related Searches
- `data.related_searches[].query`: Query
- `data.related_searches[].link`: Link (url)
