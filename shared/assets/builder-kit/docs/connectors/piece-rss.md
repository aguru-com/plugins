# RSS Feed

Stay updated with RSS feeds

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-rss'
  version: '0.7.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `rss_read_feed`

**Read Feed.** Fetches one RSS, RDF or Atom feed by its feed URL and returns the feed details plus its items, newest first, optionally filtered by publish date or keyword. Use RSS: Read Multiple Feeds for several feeds at once, and RSS: Find Site Feeds first when you only have a website or article URL rather than the feed URL. A feed only carries its most recent entries (often 10–50), so older items are not reachable.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `rss_feed_url` | string | yes |  | RSS Feed URL. Link to the feed itself, not the site homepage; Atom works too. |
| `limit` | number | no | `20` | Limit. Maximum number of items to return, newest first (1–100). Defaults to 20. |
| `published_after` | ISO date-time string | no |  | Published After. Only return items published after this date and time. Items without a publish date are left out. |
| `keyword` | string | no |  | Keyword. Only return items whose title, summary or content contains this text (case-insensitive). |

Output fields:

- `feed`: Feed
- `feed.title`: Title
- `feed.description`: Description
- `feed.site_url`: Site URL (url)
- `feed.feed_url`: Feed URL (url)
- `feed.language`: Language
- `feed.author`: Author
- `feed.updated_at`: Updated At (datetime)
- `feed.image_url`: Image (image)
- `feed.format`: Format
- `items`: Items
- `items[].id`: Item ID
- `items[].title`: Title
- `items[].link`: Link (url)
- `items[].author`: Author
- `items[].published_at`: Published At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].summary`: Summary (html)
- `items[].content`: Content (html)
- `items[].categories`: Categories
- `items[].image_url`: Image (image)
- `items[].enclosures`: Enclosures
- `items[].enclosures[].url`: URL (url)
- `items[].enclosures[].type`: Media Type
- `items[].enclosures[].length`: Size (filesize)
- `count`: Items Returned (number)
- `total_in_feed`: Total Items in Feed (number)

### `rss_read_multiple_feeds`

**Read Multiple Feeds.** Fetches up to 20 RSS, RDF or Atom feeds in parallel and merges their items into one list, newest first, each tagged with the feed it came from; filters by publish date or keyword apply after merging, and the limit applies to the merged list. A feed that fails to load is skipped and listed under failed; the action only errors when every feed fails. Use RSS: Read Feed for a single feed.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `rss_feed_urls` | array | yes | `[]` | RSS Feed URLs. One feed address per row; a feed that fails to load is skipped. |
| `limit` | number | no | `20` | Limit. Maximum number of items to return, newest first (1–100). Defaults to 20. |
| `published_after` | ISO date-time string | no |  | Published After. Only return items published after this date and time. Items without a publish date are left out. |
| `keyword` | string | no |  | Keyword. Only return items whose title, summary or content contains this text (case-insensitive). |

Output fields:

- `items`: Items
- `items[].id`: Item ID
- `items[].title`: Title
- `items[].link`: Link (url)
- `items[].author`: Author
- `items[].published_at`: Published At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].summary`: Summary (html)
- `items[].content`: Content (html)
- `items[].categories`: Categories
- `items[].image_url`: Image (image)
- `items[].enclosures`: Enclosures
- `items[].feed_title`: Feed Title
- `items[].feed_url`: Feed URL (url)
- `count`: Items Returned (number)
- `feeds`: Loaded Feeds
- `feeds[].feed_url`: Feed URL (url)
- `feeds[].title`: Title
- `feeds[].site_url`: Site URL (url)
- `feeds[].item_count`: Items in Feed (number)
- `failed`: Failed Feeds
- `failed[].feed_url`: Feed URL (url)
- `failed[].error`: Error

### `rss_find_site_feeds`

**Find Site Feeds.** Loads a web page (a homepage, blog or article URL) and returns the RSS, RDF and Atom feed URLs it advertises in its <link rel="alternate"> tags; if the URL is itself a feed, returns that feed. Use it to get the feed URL that RSS: Read Feed and RSS: Read Multiple Feeds need. Sites that publish a feed without advertising it in the page are not found.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Website URL. A page on the site, such as its homepage or a blog post. |

Output fields:

- `feeds`: Feeds
- `feeds[].url`: Feed URL (url)
- `feeds[].title`: Title
- `feeds[].format`: Format
- `count`: Feeds Found (number)
