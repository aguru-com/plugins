# Dappier

Enable fast, free real-time web search and access premium data from trusted media brands—news, financial markets, sports, entertainment, weather, and more. Build powerful AI agents with Dappier

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dappier'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE, BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Dappier API Key. You can generate one at https://platform.dappier.com/profile/api-keys.

## Actions

### `real_time_web_search`

**Real Time Data.** Runs a real-time Google-style web search via Dappier and returns AI-summarized results for a free-text query covering general topics like news, weather, travel, and deals. Choose this for broad, up-to-the-minute open-web lookups rather than a specific vertical (stocks, sports, or lifestyle). Requires a natural-language search query; read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Enter your search query. |

### `stock_market_data_search`

**Stock Market Data.** Queries Dappier for real-time stock market data — financial news, live prices, and trades sourced from polygon.io — with AI-generated insights for a free-text query. Choose this for finance and equities questions specifically, rather than the general web search action. Requires a natural-language stock market query; read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Enter your stock market query. |

### `sports_news_search`

**Sports News.** Searches Dappier sports-news sources for articles matching a natural-language query or URL. Choose this for sports-specific content rather than the general web search action. Optionally tune result count, restrict to a preferred domain, and pick the search algorithm (semantic, most recent, most recent + semantic, or trending) to control whether matching is contextual or recency-driven. Read-only and safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Enter a natural language query or URL. |
| `similarity_top_k` | number | no |  | Number of Results. Number of articles to return (default is 9) |
| `ref` | string | no |  | Preferred Domain. Restrict results to a domain (e.g., sportsnaut.com) |
| `num_articles_ref` | number | no |  | Guaranteed Articles from Domain. Minimum number of articles to match the preferred domain. |
| `search_algorithm` | string | no |  | Search Algorithm. Choose how to match articles. One of `"semantic"`, `"most_recent"`, `"most_recent_semantic"`, `"trending"`. |

### `lifestyle_news_search`

**Lifestyle News.** Searches Dappier lifestyle-news sources for articles matching a natural-language query or URL. Choose this for lifestyle content rather than the general web search, stock, or sports actions. Optionally tune result count, restrict to a preferred domain, and pick the search algorithm (semantic, most recent, most recent + semantic, or trending) to control whether matching is contextual or recency-driven. Read-only and safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Enter a natural language query or URL. |
| `similarity_top_k` | number | no |  | Number of Results. Number of articles to return (default is 9) |
| `ref` | string | no |  | Preferred Domain. Restrict results to a domain (e.g., familyproof.com) |
| `num_articles_ref` | number | no |  | Guaranteed Articles from Domain. Minimum number of articles to match the preferred domain. |
| `search_algorithm` | string | no |  | Search Algorithm. Choose how to match articles. One of `"semantic"`, `"most_recent"`, `"most_recent_semantic"`, `"trending"`. |
