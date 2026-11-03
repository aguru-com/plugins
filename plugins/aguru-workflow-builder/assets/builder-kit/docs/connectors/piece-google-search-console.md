# Google Search Console

Monitor your site's Google Search traffic, sitemaps and index status.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-search-console'
  version: '0.4.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> 1. Sign in to [Google Cloud Console](https://console.cloud.google.com/) and create a project, or pick an existing one.
> 2. Go to **APIs & Services > Library**, search for **Google Search Console API** and click **Enable**. It must be enabled in the same project as the OAuth client you create below.
> 3. Go to **OAuth consent screen**, choose **External**, fill in the app name and the support and developer emails, and save.
> 4. In **Scopes** (Data access), add `https://www.googleapis.com/auth/webmasters` and `email`, then save.
> 5. While the app is in **Testing**, add the Google account you will connect under **Test users**. Tokens of apps in Testing expire after 7 days; publish the app to avoid reconnecting.
> 6. Go to **Credentials > Create Credentials > OAuth client ID** and choose **Web application**.
> 7. Under **Authorized redirect URIs**, add the Redirect URL shown in this dialog, then click **Create**.
> 8. Copy the **Client ID** and **Client Secret** into the fields below.

## Actions

### `search_analytics`

**Search Analytics.** Queries clicks, impressions, CTR and position for a property picked from a list. Agents use Search Analytics (by Site URL). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteUrl` | string | yes |  | Site URL. The Search Console property. Only properties you have verified access to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | ISO date-time string | yes |  | Start Date. First day of the range (YYYY-MM-DD), in Pacific Time. Search Console data lags 2-3 days and is kept for about 16 months. |
| `endDate` | ISO date-time string | yes |  | End Date. Last day of the range (YYYY-MM-DD, inclusive), in Pacific Time. A range that covers only today or yesterday usually has no data yet. |
| `dimensions` | array | no |  | Dimensions. The dimensions to group results by, in order. Valid values: "query", "page", "country", "device", "searchAppearance", "date", "hour". Each row of the output gets one column per dimension. |
| `searchType` | string | no |  | Search Type. The Google surface to report on. Defaults to "web". Discover and Google News have no search queries. One of `"web"`, `"discover"`, `"googleNews"`, `"news"`, `"image"`, `"video"`. |
| `filters` | array | no |  | Filters. Optional filters. All filters are combined with AND. Each item: { `dimension`, `operator`, `expression` }. |
| `aggregationType` | string | no |  | Aggregation Type. How results are aggregated. Defaults to "auto". "byProperty" cannot be used with the page dimension or a page filter. One of `"auto"`, `"byPage"`, `"byProperty"`, `"byNewsShowcasePanel"`. |
| `dataState` | string | no |  | Data State. Which data to include. "final" (default) has only finalized data; "all" adds fresh, still-changing data from the last days; "hourly_all" is required for the hour dimension and is selected automatically when you group by hour. One of `"final"`, `"all"`, `"hourly_all"`. |
| `rowLimit` | number | no |  | Row Limit. The maximum number of rows to return, from 1 to 25,000. Defaults to 1,000. |
| `startRow` | number | no |  | Start Row. Zero-based index of the first row to return. Use with Row Limit to page through results. Defaults to 0. |

Output fields:

- `rows`: Rows
- `rows[].date`: Date (date)
- `rows[].hour`: Hour (datetime)
- `rows[].query`: Query
- `rows[].page`: Page (url)
- `rows[].country`: Country
- `rows[].device`: Device
- `rows[].search_appearance`: Search Appearance
- `rows[].clicks`: Clicks (number)
- `rows[].impressions`: Impressions (number)
- `rows[].ctr`: CTR (number)
- `rows[].position`: Average Position (number)
- `row_count`: Row Count (number)
- `data`: Google Response
- `data.responseAggregationType`: Aggregation Type
- `data.metadata`: Metadata
- `data.metadata.firstIncompleteDate`: First Incomplete Date (date)
- `data.metadata.firstIncompleteHour`: First Incomplete Hour (datetime)
- `status`: HTTP Status (number)

### `search_analytics_by_site_url`

**Search Analytics (by Site URL).** Returns Google Search clicks, impressions, CTR (0-1) and average position for a property, grouped by up to seven dimensions (date, hour, query, page, country, device, searchAppearance). Dates are Pacific Time, data lags 2-3 days and is kept about 16 months; rows without impressions are usually left out (position is null when a row has no impressions). Prefer last_n_days for "last week/month"; page with next_start_row while has_more is true. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Site URL. The Search Console property exactly as List Sites returns it: a URL-prefix property ends with "/" (e.g. "https://www.example.com/"), a domain property starts with "sc-domain:" (e.g. "sc-domain:example.com"). |
| `last_n_days` | number | no |  | Last N Days. Number of days ending yesterday (Pacific Time), from 1 to 500. Used when Start Date is empty; defaults to 28. Do not combine with Start Date/End Date. |
| `start_date` | string | no |  | Start Date. First day of the range, YYYY-MM-DD (Pacific Time). Leave empty to use Last N Days. |
| `end_date` | string | no |  | End Date. Last day of the range (inclusive), YYYY-MM-DD (Pacific Time). Defaults to yesterday when Start Date is set. |
| `dimensions` | array | no |  | Dimensions. Group results by these dimensions, in this order. Leave empty for one totals row. "hour" covers only the last few days. One of `"date"`, `"hour"`, `"query"`, `"page"`, `"country"`, `"device"`, `"searchAppearance"`. |
| `search_type` | string | no |  | Search Type. The Google surface to report on. Defaults to "web". Discover and Google News have no search queries. One of `"web"`, `"discover"`, `"googleNews"`, `"news"`, `"image"`, `"video"`. |
| `filters` | array | no |  | Filters. Optional filters. All filters are combined with AND. Each item: { `dimension`, `operator`, `expression` }. |
| `aggregation_type` | string | no |  | Aggregation Type. How results are aggregated. Defaults to "auto". "byProperty" cannot be used with the page dimension or a page filter. One of `"auto"`, `"byPage"`, `"byProperty"`, `"byNewsShowcasePanel"`. |
| `data_state` | string | no |  | Data State. Which data to include. "final" (default) has only finalized data; "all" adds fresh, still-changing data from the last days; "hourly_all" is required for the hour dimension and is selected automatically when you group by hour. One of `"final"`, `"all"`, `"hourly_all"`. |
| `row_limit` | number | no |  | Row Limit. Maximum rows to return, from 1 to 1000. Defaults to 100. |
| `start_row` | number | no |  | Start Row. Zero-based index of the first row; pass next_start_row from the previous call to get the next page. Defaults to 0. |

Output fields:

- `rows`: Rows
- `rows[].date`: Date (date)
- `rows[].hour`: Hour (datetime)
- `rows[].query`: Query
- `rows[].page`: Page (url)
- `rows[].country`: Country
- `rows[].device`: Device
- `rows[].search_appearance`: Search Appearance
- `rows[].clicks`: Clicks (number)
- `rows[].impressions`: Impressions (number)
- `rows[].ctr`: CTR (number)
- `rows[].position`: Average Position (number)
- `row_count`: Row Count (number)
- `has_more`: Has More (boolean)
- `next_start_row`: Next Start Row (number)
- `start_date`: Start Date (date)
- `end_date`: End Date (date)
- `data_state`: Data State
- `aggregation_type`: Aggregation Type
- `first_incomplete_date`: First Incomplete Date (date)
- `first_incomplete_hour`: First Incomplete Hour (datetime)

### `list_sitemaps`

**List Sitemaps.** Lists the sitemaps submitted for a property picked from a list, with their processing status. Agents use List Sitemaps (by Site URL). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteUrl` | string | yes |  | Site URL. The Search Console property. Only properties you have verified access to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `sitemapIndex` | string | no |  | Sitemap Index URL. Optional. The full URL of a sitemap index to list only the sitemaps inside it. |

Output fields:

- `sitemap`: Sitemaps
- `sitemap[].path`: Sitemap URL (url)
- `sitemap[].type`: Type
- `sitemap[].lastSubmitted`: Last Submitted (datetime)
- `sitemap[].lastDownloaded`: Last Downloaded (datetime)
- `sitemap[].isPending`: Is Pending (boolean)
- `sitemap[].isSitemapsIndex`: Is Sitemap Index (boolean)
- `sitemap[].errors`: Errors (number)
- `sitemap[].warnings`: Warnings (number)
- `sitemap[].contents`: Contents
- `sitemap[].contents[].type`: Type
- `sitemap[].contents[].submitted`: Submitted URLs (number)
- `count`: Count (number)

### `list_sitemaps_by_site_url`

**List Sitemaps (by Site URL).** Lists the sitemaps submitted for a property with their health: errors, warnings, pending state, last download and submitted URL counts. Use Get Sitemap when you already know the sitemap URL; pass sitemap_index to list the children of a sitemap index. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Site URL. The Search Console property exactly as List Sites returns it: a URL-prefix property ends with "/" (e.g. "https://www.example.com/"), a domain property starts with "sc-domain:" (e.g. "sc-domain:example.com"). |
| `sitemap_index` | string | no |  | Sitemap Index URL. Optional. The full URL of a sitemap index; only the sitemaps inside it are listed. |

Output fields:

- `sitemaps`: Sitemaps
- `sitemaps[].path`: Sitemap URL (url)
- `sitemaps[].type`: Type
- `sitemaps[].is_sitemaps_index`: Is Sitemap Index (boolean)
- `sitemaps[].is_pending`: Is Pending (boolean)
- `sitemaps[].last_submitted`: Last Submitted (datetime)
- `sitemaps[].last_downloaded`: Last Downloaded (datetime)
- `sitemaps[].errors`: Errors (number)
- `sitemaps[].warnings`: Warnings (number)
- `sitemaps[].submitted_urls`: Submitted URLs (number)
- `sitemaps[].contents`: Contents
- `sitemaps[].contents[].type`: Type
- `sitemaps[].contents[].submitted`: Submitted URLs (number)
- `count`: Count (number)

### `get_sitemap`

**Get Sitemap.** Reads the health of one submitted sitemap by its URL: errors, warnings, pending state, last submitted and downloaded times, and submitted URL counts. Use List Sitemaps (by Site URL) when the sitemap URL is unknown. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Site URL. The Search Console property exactly as List Sites returns it: a URL-prefix property ends with "/" (e.g. "https://www.example.com/"), a domain property starts with "sc-domain:" (e.g. "sc-domain:example.com"). |
| `feedpath` | string | yes |  | Sitemap URL. The full URL of the sitemap, e.g. "https://www.example.com/sitemap.xml". |

Output fields:

- `path`: Sitemap URL (url)
- `type`: Type
- `is_sitemaps_index`: Is Sitemap Index (boolean)
- `is_pending`: Is Pending (boolean)
- `last_submitted`: Last Submitted (datetime)
- `last_downloaded`: Last Downloaded (datetime)
- `errors`: Errors (number)
- `warnings`: Warnings (number)
- `submitted_urls`: Submitted URLs (number)
- `contents`: Contents
- `contents[].type`: Type
- `contents[].submitted`: Submitted URLs (number)

### `submit_sitemap`

**Submit a Sitemap.** Submits or resubmits a sitemap URL for a property picked from a list. Agents use Submit Sitemap (by Site URL). Resubmitting the same URL only refreshes it, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteUrl` | string | yes |  | Site URL. The Search Console property. Only properties you have verified access to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `feedpath` | string | yes |  | Sitemap Path. The full URL of the sitemap, e.g. "https://www.example.com/sitemap.xml". |

Output fields:

- `success`: Success (boolean)
- `siteUrl`: Site URL
- `feedpath`: Sitemap URL (url)

### `submit_sitemap_by_site_url`

**Submit Sitemap (by Site URL).** Submits a sitemap URL to a property so Google can find its pages, or resubmits it after the sitemap changed. Needs siteOwner or siteFullUser permission. Resubmitting the same URL only refreshes it, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Site URL. The Search Console property exactly as List Sites returns it: a URL-prefix property ends with "/" (e.g. "https://www.example.com/"), a domain property starts with "sc-domain:" (e.g. "sc-domain:example.com"). |
| `feedpath` | string | yes |  | Sitemap URL. The full URL of the sitemap, e.g. "https://www.example.com/sitemap.xml". |

Output fields:

- `success`: Success (boolean)
- `site_url`: Site URL
- `feedpath`: Sitemap URL (url)

### `delete_sitemap`

**Delete a Sitemap.** Removes a sitemap picked from a list from the Sitemaps report of a property. Agents use Delete Sitemap (by Site URL). Deleting a sitemap that is already gone also succeeds, so it is safe to retry. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteUrl` | string | yes |  | Site URL. The Search Console property. Only properties you have verified access to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `feedpath` | string | yes |  | Sitemap. A sitemap submitted to the selected property. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `siteUrl`: Site URL
- `feedpath`: Sitemap URL (url)

### `delete_sitemap_by_site_url`

**Delete Sitemap (by Site URL).** Removes a submitted sitemap from the Sitemaps report of a property. Google may keep crawling the sitemap and its URLs; resubmitting restores the entry. Needs siteOwner or siteFullUser permission; confirm with the user first. Deleting a sitemap that is already gone also succeeds, so it is safe to retry. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Site URL. The Search Console property exactly as List Sites returns it: a URL-prefix property ends with "/" (e.g. "https://www.example.com/"), a domain property starts with "sc-domain:" (e.g. "sc-domain:example.com"). |
| `feedpath` | string | yes |  | Sitemap URL. The full URL of the sitemap, e.g. "https://www.example.com/sitemap.xml". |

Output fields:

- `success`: Success (boolean)
- `site_url`: Site URL
- `feedpath`: Sitemap URL (url)

### `list_sites`

**List Sites.** Lists every Search Console property the connected Google account can see, with its permission level (siteOwner, siteFullUser, siteRestrictedUser, siteUnverifiedUser). Call it first to get the exact Site URL string the other actions need; unverified properties cannot be queried. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `siteEntry`: Sites
- `siteEntry[].siteUrl`: Site URL
- `siteEntry[].permissionLevel`: Permission Level
- `count`: Count (number)

### `get_site`

**Get Site.** Reads one Search Console property by its exact Site URL and reports the permission level and whether it is verified. Use it to check access before reading data or changing sitemaps (that needs siteOwner or siteFullUser); use List Sites to discover properties. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Site URL. The Search Console property exactly as List Sites returns it: a URL-prefix property ends with "/" (e.g. "https://www.example.com/"), a domain property starts with "sc-domain:" (e.g. "sc-domain:example.com"). |

Output fields:

- `site_url`: Site URL
- `permission_level`: Permission Level
- `is_verified`: Is Verified (boolean)

### `add_site`

**Add a Site.** Adds a property to the connected account's Search Console. The property stays unverified (permission siteUnverifiedUser) until someone verifies ownership in the Search Console UI; the API cannot verify it, and unverified properties return no data. Adding a property that is already there changes nothing, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteUrl` | string | yes |  | Site URL. A URL-prefix property such as "https://www.example.com/" (a missing trailing slash is added) or a domain property such as "sc-domain:example.com". |

Output fields:

- `success`: Success (boolean)
- `siteUrl`: Site URL
- `permissionLevel`: Permission Level

### `delete_site`

**Delete a Site.** Removes a property picked from a list from the connected account's Search Console. Agents use Delete Site (by Site URL). A second call for the same property fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteUrl` | string | yes |  | Site URL. The Search Console property. Unverified properties are listed too. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `siteUrl`: Site URL

### `delete_site_by_site_url`

**Delete Site (by Site URL).** Removes a property from the connected account's Search Console list. Only this account loses it; other owners and the collected data are not affected, but a verified property must be verified again to come back. Confirm with the user first. A second call for the same property fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Site URL. The Search Console property exactly as List Sites returns it: a URL-prefix property ends with "/" (e.g. "https://www.example.com/"), a domain property starts with "sc-domain:" (e.g. "sc-domain:example.com"). |

Output fields:

- `success`: Success (boolean)
- `site_url`: Site URL

### `urlInspection`

**URL Inspection.** Reports Google's index status of one URL in a property picked from a list. Agents use Inspect URL (by Site URL). Read-only and safe to retry; limited to 2,000 inspections per property per day. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteUrl` | string | yes |  | Site URL. The Search Console property. Only properties you have verified access to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `url` | string | yes |  | URL to Inspect. The full URL of the page. It must belong to the selected property. |
| `languageCode` | string | no |  | Language Code. Optional language for the issue messages, as a BCP-47 code such as "en-US" or "de". Defaults to English. |

Output fields:

- `inspectionResult`: Inspection Result
- `inspectionResult.inspectionResultLink`: Search Console Link (url)
- `inspectionResult.indexStatusResult`: Index Status
- `inspectionResult.indexStatusResult.verdict`: Verdict
- `inspectionResult.indexStatusResult.coverageState`: Coverage State
- `inspectionResult.indexStatusResult.indexingState`: Indexing State
- `inspectionResult.indexStatusResult.robotsTxtState`: robots.txt State
- `inspectionResult.indexStatusResult.pageFetchState`: Page Fetch State
- `inspectionResult.indexStatusResult.lastCrawlTime`: Last Crawl Time (datetime)
- `inspectionResult.indexStatusResult.crawledAs`: Crawled As
- `inspectionResult.indexStatusResult.googleCanonical`: Google Canonical (url)
- `inspectionResult.indexStatusResult.userCanonical`: User Canonical (url)
- `inspectionResult.indexStatusResult.sitemap`: Sitemaps
- `inspectionResult.indexStatusResult.referringUrls`: Referring URLs
- `inspectionResult.richResultsResult`: Rich Results
- `inspectionResult.richResultsResult.verdict`: Verdict
- `inspectionResult.mobileUsabilityResult`: Mobile Usability
- `inspectionResult.mobileUsabilityResult.verdict`: Verdict

### `inspect_url_by_site_url`

**Inspect URL (by Site URL).** Reports Google's index status of one page in a property: verdict, coverage, last crawl, canonicals, robots.txt and rich result issues. Use it to diagnose why a specific page is or is not indexed. Limited to 2,000 inspections per property per day, so do not loop over a whole site. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_url` | string | yes |  | Site URL. The Search Console property exactly as List Sites returns it: a URL-prefix property ends with "/" (e.g. "https://www.example.com/"), a domain property starts with "sc-domain:" (e.g. "sc-domain:example.com"). |
| `inspection_url` | string | yes |  | URL to Inspect. The full URL of the page. It must belong to the property (same protocol and host, under the property path, or any subdomain of a domain property). |
| `language_code` | string | no |  | Language Code. Optional BCP-47 language for issue messages, e.g. "en-US". Defaults to English. |

Output fields:

- `inspected_url`: Inspected URL (url)
- `verdict`: Verdict
- `coverage_state`: Coverage State
- `indexing_state`: Indexing State
- `robots_txt_state`: robots.txt State
- `page_fetch_state`: Page Fetch State
- `last_crawl_time`: Last Crawl Time (datetime)
- `crawled_as`: Crawled As
- `google_canonical`: Google Canonical (url)
- `user_canonical`: User Canonical (url)
- `sitemaps`: Sitemaps
- `referring_urls`: Referring URLs
- `referring_urls_truncated`: Referring URLs Truncated (boolean)
- `rich_results_verdict`: Rich Results Verdict
- `rich_result_types`: Rich Result Types
- `rich_result_issues`: Rich Result Issues
- `rich_result_issues[].type`: Rich Result Type
- `rich_result_issues[].item`: Item
- `rich_result_issues[].severity`: Severity
- `rich_result_issues[].message`: Message
- `amp_verdict`: AMP Verdict
- `mobile_usability_verdict`: Mobile Usability Verdict
- `inspection_result_link`: Search Console Link (url)

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
