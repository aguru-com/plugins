# Short.io

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-short-io'
  version: '0.3.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your Short.io API Key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `create-country-targeting-rule`

**Create Country Targeting Rule.** Adds a country-targeting rule to an existing short link so visitors from a given country are redirected to a country-specific URL instead of the default destination. Requires the link, a 2-letter ISO country code and a valid redirect URL. Not idempotent: Short.io may reject a second rule for the same country. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the domain to use for the link. A value the product loads from the provider, such as an id; write the value itself. |
| `linkId` | string | yes |  | Short Link. Select the short link from the domain (the newest 1,500 links are listed). A value the product loads from the provider, such as an id; write the value itself. |
| `country` | string | yes |  | Country Code. ISO 3166-1 alpha-2 country code (e.g., US, GB, CA, IN). Must be exactly 2 characters. |
| `originalURL` | string | yes |  | Country-Specific Redirect URL. The destination URL when users from this country access the link. Must be a valid URL. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.country`: Country Code
- `data.originalURL`: Country Redirect URL (url)

### `create-short-link`

**Create Short Link.** Creates a new short link on a Short.io domain pointing to a target URL, with optional path/slug, title, UTM tags, expiration, click limit, cloaking, A/B split, and analytics integrations. Use to generate a shortened URL. Requires an original URL and a domain; not idempotent — each call creates a new link (set Allow Duplicates to avoid 409 conflicts on a repeated path). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `originalURL` | string | yes |  | Original URL. |
| `domain` | string | yes |  | Domain. Select the domain to use for the link. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. |
| `folderId` | string | no |  | Folder. Select the folder to add the link to. A value the product loads from the provider, such as an id; write the value itself. |
| `cloaking` | boolean | no |  | Enable Cloaking. |
| `password` | string | no |  | Password. |
| `redirectType` | string | no |  | Redirect Type. The HTTP status code for the redirect. The default is 302 (Found). One of `"301"`, `"302"`, `"303"`, `"307"`, `"308"`. |
| `expiresAt` | ISO date-time string | no |  | Expiration Date. The date and time when the link will become inactive. |
| `expiredURL` | string | no |  | Expired Redirect URL. |
| `tags` | array | no |  | Tags. Array of tags for the link. |
| `utmSource` | string | no |  | UTM Source. |
| `utmMedium` | string | no |  | UTM Medium. |
| `utmCampaign` | string | no |  | UTM Campaign. |
| `utmTerm` | string | no |  | UTM Term. |
| `utmContent` | string | no |  | UTM Content. |
| `ttl` | number | no |  | Time to Live (in seconds). Permanently deletes the link this many seconds from now (minimum 604800 = 7 days). Short.io may delete it up to 2 hours later. This cannot be undone. |
| `androidURL` | string | no |  | Android URL. |
| `iphoneURL` | string | no |  | iPhone URL. |
| `createdAt` | ISO date-time string | no |  | Creation Time. Overrides the creation time of the link. |
| `clicksLimit` | number | no |  | Clicks Limit. Disable link after specified number of clicks (minimum: 1) |
| `passwordContact` | boolean | no |  | Show Contact for Password Recovery. |
| `skipQS` | boolean | no |  | Skip Query String Merge. |
| `archived` | boolean | no |  | Archive Link. |
| `splitURL` | string | no |  | Split URL. |
| `splitPercent` | number | no |  | Split Percent. Split URL percentage (1-100) |
| `integrationAdroll` | string | no |  | Adroll Integration ID. |
| `integrationFB` | string | no |  | Facebook Integration ID. |
| `integrationGA` | string | no |  | Google Analytics ID. |
| `integrationGTM` | string | no |  | Google Tag Manager ID. |
| `allowDuplicates` | boolean | no |  | Allow Duplicates. |
| `path` | string | no |  | Path. Custom path for the short link (optional). |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.idString`: Link ID
- `data.linkId`: Link ID (copy)
- `data.id`: Legacy Numeric ID
- `data.shortURL`: Short URL (url)
- `data.secureShortURL`: Secure Short URL (url)
- `data.originalURL`: Original URL (url)
- `data.path`: Path
- `data.title`: Title
- `data.tags`: Tags
- `data.DomainId`: Domain ID (number)
- `data.FolderId`: Folder ID
- `data.OwnerId`: Owner ID (number)
- `data.hasPassword`: Password Protected (boolean)
- `data.cloaking`: Cloaking (boolean)
- `data.redirectType`: Redirect Type
- `data.archived`: Archived (boolean)
- `data.expiresAt`: Expires At
- `data.expiredURL`: Expired Redirect URL (url)
- `data.clicksLimit`: Clicks Limit (number)
- `data.ttl`: Scheduled Deletion Time
- `data.createdAt`: Created At (datetime)
- `data.utmSource`: UTM Source
- `data.utmMedium`: UTM Medium
- `data.utmCampaign`: UTM Campaign
- `data.utmTerm`: UTM Term
- `data.utmContent`: UTM Content
- `data.androidURL`: Android URL (url)
- `data.iphoneURL`: iPhone URL (url)
- `data.splitURL`: Split URL (url)
- `data.splitPercent`: Split Percent (number)
- `data.User`: Owner
- `data.User.id`: User ID (number)
- `data.User.name`: Name
- `data.User.email`: Email (email)

### `delete-short-link`

**Delete Short Link.** Permanently deletes a short link identified by its link ID (lnk_…); the short URL stops working and this cannot be undone. Not idempotent: a repeat call fails with a not-found error once the link is gone (Delete Short Link (AI) reports alreadyDeleted instead). Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. The ID of the short link you want to delete (e.g., lnk_61Mb_0dnRUg3vvtmAPZh3dhQh6) |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.success`: Deleted (boolean)
- `data.idString`: Link ID

### `expire-short-link`

**Expire Short Link.** Sets an expiration on an existing short link so it deactivates at a given date/time or after a number of clicks, optionally sending expired visitors to a fallback URL. Requires an expiration date or a click limit. Idempotent: re-applying the same settings leaves the link unchanged. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the domain to use for the link. A value the product loads from the provider, such as an id; write the value itself. |
| `linkId` | string | yes |  | Short Link. Select the short link from the domain (the newest 1,500 links are listed). A value the product loads from the provider, such as an id; write the value itself. |
| `expiresAt` | ISO date-time string | no |  | Expiration Date. The date and time when the link will become inactive. |
| `clicksLimit` | number | no |  | Clicks Limit. Disable link after specified number of clicks (minimum: 1) |
| `expiredURL` | string | no |  | Expired Redirect URL. Optional URL to redirect users when the link has expired. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.idString`: Link ID
- `data.linkId`: Link ID (copy)
- `data.id`: Legacy Numeric ID
- `data.shortURL`: Short URL (url)
- `data.secureShortURL`: Secure Short URL (url)
- `data.originalURL`: Original URL (url)
- `data.path`: Path
- `data.title`: Title
- `data.tags`: Tags
- `data.DomainId`: Domain ID (number)
- `data.FolderId`: Folder ID
- `data.OwnerId`: Owner ID (number)
- `data.hasPassword`: Password Protected (boolean)
- `data.cloaking`: Cloaking (boolean)
- `data.redirectType`: Redirect Type
- `data.archived`: Archived (boolean)
- `data.expiresAt`: Expires At
- `data.expiredURL`: Expired Redirect URL (url)
- `data.clicksLimit`: Clicks Limit (number)
- `data.ttl`: Scheduled Deletion Time
- `data.createdAt`: Created At (datetime)
- `data.utmSource`: UTM Source
- `data.utmMedium`: UTM Medium
- `data.utmCampaign`: UTM Campaign
- `data.utmTerm`: UTM Term
- `data.utmContent`: UTM Content
- `data.androidURL`: Android URL (url)
- `data.iphoneURL`: iPhone URL (url)
- `data.splitURL`: Split URL (url)
- `data.splitPercent`: Split Percent (number)
- `data.User`: Owner
- `data.User.id`: User ID (number)
- `data.User.name`: Name
- `data.User.email`: Email (email)

### `get-domain-statistics`

**Domain Statistics.** Retrieves aggregate click and link statistics for a whole Short.io domain over a preset period (today, last 7/30 days, this/last month) or a custom start/end date. Custom range requires both dates. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domainId` | string | yes |  | Domain. Select the domain to get statistics for. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes | `"last30"` | Time Period. Select a predefined time interval or choose "Custom" to set specific dates. One of `"today"`, `"yesterday"`, `"last7"`, `"last30"`, `"month"`, `"lastmonth"`, `"total"`, `"custom"`. |
| `startDate` | ISO date-time string | no |  | Start Date. Start date for statistics (required when period is "Custom"). The calendar day you pick is sent as is. |
| `endDate` | ISO date-time string | no |  | End Date. End date for statistics (required when period is "Custom"). The calendar day you pick is sent as is. |
| `tz` | string | no |  | Timezone. Timezone for statistics (e.g., UTC, America/New_York, Europe/London). Defaults to UTC. |
| `clicksChartInterval` | string | no |  | Chart Interval. Granularity for click statistics chart data. One of `"hour"`, `"day"`, `"week"`, `"month"`. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.clicks`: Total Clicks (number)
- `data.humanClicks`: Human Clicks (number)
- `data.links`: Links Created (number)
- `data.clicksPerLink`: Clicks per Link
- `data.prevClicks`: Clicks in Previous Period (number)
- `data.prevHumanClicks`: Human Clicks in Previous Period (number)
- `data.interval`: Interval
- `data.interval.startDate`: Start (datetime)
- `data.interval.endDate`: End (datetime)
- `data.interval.tz`: Timezone
- `data.clickStatistics`: Clicks Over Time
- `data.country`: Top Countries
- `data.country[].country`: Value
- `data.country[].score`: Clicks (number)
- `data.referer`: Top Referrers
- `data.referer[].referer`: Value
- `data.referer[].score`: Clicks (number)
- `data.browser`: Top Browsers
- `data.browser[].browser`: Value
- `data.browser[].score`: Clicks (number)
- `data.os`: Top Operating Systems
- `data.os[].os`: Value
- `data.os[].score`: Clicks (number)
- `data.social`: Top Social Networks
- `data.social[].social`: Value
- `data.social[].score`: Clicks (number)
- `data.city`: Top Cities
- `data.city[].name`: Value
- `data.city[].score`: Clicks (number)

### `get-short-link-info-by-path`

**Get Link by Path.** Looks up one short link and its details by domain plus path/slug (rather than by link ID). Requires a domain and the bare slug. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the domain to use for the link. A value the product loads from the provider, such as an id; write the value itself. |
| `path` | string | yes |  | Link Path. The path/slug of the short link (e.g., "abc123", "my-link"). Do not include domain or slashes. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.idString`: Link ID
- `data.linkId`: Link ID (copy)
- `data.id`: Legacy Numeric ID
- `data.shortURL`: Short URL (url)
- `data.secureShortURL`: Secure Short URL (url)
- `data.originalURL`: Original URL (url)
- `data.path`: Path
- `data.title`: Title
- `data.tags`: Tags
- `data.DomainId`: Domain ID (number)
- `data.FolderId`: Folder ID
- `data.OwnerId`: Owner ID (number)
- `data.hasPassword`: Password Protected (boolean)
- `data.cloaking`: Cloaking (boolean)
- `data.redirectType`: Redirect Type
- `data.archived`: Archived (boolean)
- `data.expiresAt`: Expires At
- `data.expiredURL`: Expired Redirect URL (url)
- `data.clicksLimit`: Clicks Limit (number)
- `data.ttl`: Scheduled Deletion Time
- `data.createdAt`: Created At (datetime)
- `data.utmSource`: UTM Source
- `data.utmMedium`: UTM Medium
- `data.utmCampaign`: UTM Campaign
- `data.utmTerm`: UTM Term
- `data.utmContent`: UTM Content
- `data.androidURL`: Android URL (url)
- `data.iphoneURL`: iPhone URL (url)
- `data.splitURL`: Split URL (url)
- `data.splitPercent`: Split Percent (number)
- `data.User`: Owner
- `data.User.id`: User ID (number)
- `data.User.name`: Name
- `data.User.email`: Email (email)

### `get-link-clicks`

**Get Link Clicks.** Retrieves click counts for one or more short links (by link ID) on a domain, optionally for a start/end date range (both dates needed). Returns a map of link ID to clicks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the domain containing the links. A value the product loads from the provider, such as an id; write the value itself. |
| `ids` | array | yes |  | Link IDs. List of link IDs to fetch click statistics for (e.g., lnk_61Mb_0dnRUg3vvtmAPZh3dhQh6). |
| `startDate` | ISO date-time string | no |  | Start Date. Start date for click statistics (optional). The calendar day you pick is sent as is. |
| `endDate` | ISO date-time string | no |  | End Date. End date for click statistics (optional). The calendar day you pick is sent as is. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data

### `list-short-links`

**List Links.** Lists one page of short links on a domain, with optional folder, link ID, creation-date and sort filters. Pass the returned nextPageToken as Page Token to get the next page. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the domain to retrieve links from. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | no |  | Folder. Select the folder to add the link to. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. Number of results to return (1-150). Default is 50. |
| `idString` | string | no |  | Link ID Filter. Filter by specific link ID (optional). |
| `createdAt` | string | no |  | Exact Creation Time. Filter by exact creation time (ISO format or timestamp). |
| `beforeDate` | ISO date-time string | no |  | Before Date. Return links created before this date and time. |
| `afterDate` | ISO date-time string | no |  | After Date. Return links created after this date and time. |
| `dateSortOrder` | string | no |  | Date Sort Order. Order links by creation date. One of `"asc"`, `"desc"`. |
| `pageToken` | string | no |  | Page Token. Token for paginated results (get this from previous response). |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.count`: Total Links (number)
- `data.nextPageToken`: Next Page Token
- `data.links`: Links
- `data.links[].idString`: Link ID
- `data.links[].linkId`: Link ID (copy)
- `data.links[].id`: Legacy Numeric ID
- `data.links[].shortURL`: Short URL (url)
- `data.links[].secureShortURL`: Secure Short URL (url)
- `data.links[].originalURL`: Original URL (url)
- `data.links[].path`: Path
- `data.links[].title`: Title
- `data.links[].tags`: Tags
- `data.links[].DomainId`: Domain ID (number)
- `data.links[].FolderId`: Folder ID
- `data.links[].OwnerId`: Owner ID (number)
- `data.links[].hasPassword`: Password Protected (boolean)
- `data.links[].cloaking`: Cloaking (boolean)
- `data.links[].redirectType`: Redirect Type
- `data.links[].archived`: Archived (boolean)
- `data.links[].expiresAt`: Expires At
- `data.links[].expiredURL`: Expired Redirect URL (url)
- `data.links[].clicksLimit`: Clicks Limit (number)
- `data.links[].ttl`: Scheduled Deletion Time
- `data.links[].createdAt`: Created At (datetime)
- `data.links[].utmSource`: UTM Source
- `data.links[].utmMedium`: UTM Medium
- `data.links[].utmCampaign`: UTM Campaign
- `data.links[].utmTerm`: UTM Term
- `data.links[].utmContent`: UTM Content
- `data.links[].androidURL`: Android URL (url)
- `data.links[].iphoneURL`: iPhone URL (url)
- `data.links[].splitURL`: Split URL (url)
- `data.links[].splitPercent`: Split Percent (number)
- `data.links[].User`: Owner
- `data.links[].User.id`: User ID (number)
- `data.links[].User.name`: Name
- `data.links[].User.email`: Email (email)

### `update-short-link`

**Update Short Link.** Updates properties of an existing short link identified by its link ID — destination URL, path/slug, title, folder, UTM tags, expiration, cloaking, A/B split, and analytics integrations. Use to modify a link you already created rather than making a new one. Only the fields you set are changed; idempotent — re-sending the same values keyed on the link ID yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Select the domain to use for the link. A value the product loads from the provider, such as an id; write the value itself. |
| `linkId` | string | yes |  | Short Link. Select the short link from the domain (the newest 1,500 links are listed). A value the product loads from the provider, such as an id; write the value itself. |
| `originalURL` | string | no |  | Original URL. |
| `path` | string | no |  | Custom Path (Slug). |
| `title` | string | no |  | Title. |
| `folderId` | string | no |  | Folder. Select the folder to add the link to. A value the product loads from the provider, such as an id; write the value itself. |
| `cloaking` | boolean | no |  | Enable Cloaking. |
| `password` | string | no |  | Password. |
| `redirectType` | string | no |  | Redirect Type. The HTTP status code for the redirect. The default is 302 (Found). One of `"301"`, `"302"`, `"303"`, `"307"`, `"308"`. |
| `expiresAt` | ISO date-time string | no |  | Expiration Date. The date and time when the link will become inactive. |
| `expiredURL` | string | no |  | Expired Redirect URL. |
| `tags` | array | no |  | Tags. Array of tags for the link. |
| `utmSource` | string | no |  | UTM Source. |
| `utmMedium` | string | no |  | UTM Medium. |
| `utmCampaign` | string | no |  | UTM Campaign. |
| `utmTerm` | string | no |  | UTM Term. |
| `utmContent` | string | no |  | UTM Content. |
| `ttl` | number | no |  | Time to Live (in seconds). Permanently deletes the link this many seconds from now (minimum 604800 = 7 days). Short.io may delete it up to 2 hours later. This cannot be undone. |
| `androidURL` | string | no |  | Android URL. |
| `iphoneURL` | string | no |  | iPhone URL. |
| `createdAt` | ISO date-time string | no |  | Creation Time. Overrides the creation time of the link. |
| `clicksLimit` | number | no |  | Clicks Limit. Disable link after specified number of clicks (minimum: 1) |
| `passwordContact` | boolean | no |  | Show Contact for Password Recovery. |
| `skipQS` | boolean | no |  | Skip Query String Merge. |
| `archived` | boolean | no |  | Archive Link. |
| `splitURL` | string | no |  | Split URL. |
| `splitPercent` | number | no |  | Split Percent. Split URL percentage (1-100) |
| `integrationAdroll` | string | no |  | Adroll Integration ID. |
| `integrationFB` | string | no |  | Facebook Integration ID. |
| `integrationGA` | string | no |  | Google Analytics ID. |
| `integrationGTM` | string | no |  | Google Tag Manager ID. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `data`: Data
- `data.idString`: Link ID
- `data.linkId`: Link ID (copy)
- `data.id`: Legacy Numeric ID
- `data.shortURL`: Short URL (url)
- `data.secureShortURL`: Secure Short URL (url)
- `data.originalURL`: Original URL (url)
- `data.path`: Path
- `data.title`: Title
- `data.tags`: Tags
- `data.DomainId`: Domain ID (number)
- `data.FolderId`: Folder ID
- `data.OwnerId`: Owner ID (number)
- `data.hasPassword`: Password Protected (boolean)
- `data.cloaking`: Cloaking (boolean)
- `data.redirectType`: Redirect Type
- `data.archived`: Archived (boolean)
- `data.expiresAt`: Expires At
- `data.expiredURL`: Expired Redirect URL (url)
- `data.clicksLimit`: Clicks Limit (number)
- `data.ttl`: Scheduled Deletion Time
- `data.createdAt`: Created At (datetime)
- `data.utmSource`: UTM Source
- `data.utmMedium`: UTM Medium
- `data.utmCampaign`: UTM Campaign
- `data.utmTerm`: UTM Term
- `data.utmContent`: UTM Content
- `data.androidURL`: Android URL (url)
- `data.iphoneURL`: iPhone URL (url)
- `data.splitURL`: Split URL (url)
- `data.splitPercent`: Split Percent (number)
- `data.User`: Owner
- `data.User.id`: User ID (number)
- `data.User.name`: Name
- `data.User.email`: Email (email)

### `list_domains`

**List Domains.** Lists all branded domains on the connected Short.io account with their numeric ID and hostname. Use first to learn which domain to pass to other Short.io steps. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Domains
- `items[].id`: Domain ID (number)
- `items[].hostname`: Hostname
- `items[].unicodeHostname`: Unicode Hostname
- `items[].state`: State
- `items[].linkType`: Link Type
- `items[].cloaking`: Cloaking (boolean)
- `items[].caseSensitive`: Case Sensitive (boolean)
- `items[].redirect404`: 404 Redirect (url)
- `items[].httpsLinks`: HTTPS Links (boolean)
- `items[].TeamId`: Team ID (number)
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `count`: Count (number)

### `get_domain`

**Get Domain.** Returns the details of one Short.io domain (ID, hostname, state, link type, redirects) given its hostname or numeric ID. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |

Output fields:

- `id`: Domain ID (number)
- `hostname`: Hostname
- `unicodeHostname`: Unicode Hostname
- `state`: State
- `linkType`: Link Type
- `cloaking`: Cloaking (boolean)
- `caseSensitive`: Case Sensitive (boolean)
- `redirect404`: 404 Redirect (url)
- `httpsLinks`: HTTPS Links (boolean)
- `TeamId`: Team ID (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `get_link`

**Get Link by ID.** Returns one short link (short URL, original URL, path, title, tags, expiry, folder) by its link ID. Returns found=false when no link has that ID. The link password is never returned. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |

Output fields:

- `found`: Found (boolean)
- `link`: Link
- `link.idString`: Link ID
- `link.linkId`: Link ID (copy)
- `link.id`: Legacy Numeric ID
- `link.shortURL`: Short URL (url)
- `link.secureShortURL`: Secure Short URL (url)
- `link.originalURL`: Original URL (url)
- `link.path`: Path
- `link.title`: Title
- `link.tags`: Tags
- `link.DomainId`: Domain ID (number)
- `link.FolderId`: Folder ID
- `link.OwnerId`: Owner ID (number)
- `link.hasPassword`: Password Protected (boolean)
- `link.cloaking`: Cloaking (boolean)
- `link.redirectType`: Redirect Type
- `link.archived`: Archived (boolean)
- `link.expiresAt`: Expires At
- `link.expiredURL`: Expired Redirect URL (url)
- `link.clicksLimit`: Clicks Limit (number)
- `link.ttl`: Scheduled Deletion Time
- `link.createdAt`: Created At (datetime)
- `link.utmSource`: UTM Source
- `link.utmMedium`: UTM Medium
- `link.utmCampaign`: UTM Campaign
- `link.utmTerm`: UTM Term
- `link.utmContent`: UTM Content
- `link.androidURL`: Android URL (url)
- `link.iphoneURL`: iPhone URL (url)
- `link.splitURL`: Split URL (url)
- `link.splitPercent`: Split Percent (number)
- `link.User`: Owner
- `link.User.id`: User ID (number)
- `link.User.name`: Name
- `link.User.email`: Email (email)

### `find_links_by_original_url`

**Find Links by Original URL.** Finds all short links on a domain whose destination (original URL) exactly equals the given URL. Use to check whether a URL was already shortened before creating a new link. Returns an empty list when none match. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `originalURL` | string | yes |  | Original URL. The full destination URL to look up, exactly as it was shortened. |

Output fields:

- `items`: Links
- `items[].idString`: Link ID
- `items[].linkId`: Link ID (copy)
- `items[].id`: Legacy Numeric ID
- `items[].shortURL`: Short URL (url)
- `items[].secureShortURL`: Secure Short URL (url)
- `items[].originalURL`: Original URL (url)
- `items[].path`: Path
- `items[].title`: Title
- `items[].tags`: Tags
- `items[].DomainId`: Domain ID (number)
- `items[].FolderId`: Folder ID
- `items[].OwnerId`: Owner ID (number)
- `items[].hasPassword`: Password Protected (boolean)
- `items[].cloaking`: Cloaking (boolean)
- `items[].redirectType`: Redirect Type
- `items[].archived`: Archived (boolean)
- `items[].expiresAt`: Expires At
- `items[].expiredURL`: Expired Redirect URL (url)
- `items[].clicksLimit`: Clicks Limit (number)
- `items[].ttl`: Scheduled Deletion Time
- `items[].createdAt`: Created At (datetime)
- `items[].utmSource`: UTM Source
- `items[].utmMedium`: UTM Medium
- `items[].utmCampaign`: UTM Campaign
- `items[].utmTerm`: UTM Term
- `items[].utmContent`: UTM Content
- `items[].androidURL`: Android URL (url)
- `items[].iphoneURL`: iPhone URL (url)
- `items[].splitURL`: Split URL (url)
- `items[].splitPercent`: Split Percent (number)
- `items[].User`: Owner
- `items[].User.id`: User ID (number)
- `items[].User.name`: Name
- `items[].User.email`: Email (email)
- `count`: Count (number)

### `create_links_bulk`

**Create Short Links (Bulk).** Creates up to 1000 short links on one domain in a single call. Each item needs originalURL and may set path, title, tags, UTM fields, expiresAt and redirectType. Returns the created links plus per-item errors. Not idempotent: a repeat call without fixed paths creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `links` | JSON | yes |  | Links. JSON array of links, e.g. [{"originalURL": "https://example.com/a", "path": "a"}, {"originalURL": "https://example.com/b"}]. Allowed keys: originalURL (required), path, title, tags, utmSource, utmMedium, utmCampaign, utmTerm, utmContent, expiresAt, expiredURL, redirectType, androidURL, iphoneURL, c… |
| `folderId` | string | no |  | Folder ID. Optional folder ID (use List Folders to find it). |
| `allowDuplicates` | boolean | no | `false` | Allow Duplicates. Create a new link even when one already points to the same URL. |

Output fields:

- `items`: Created Links
- `items[].idString`: Link ID
- `items[].linkId`: Link ID (copy)
- `items[].id`: Legacy Numeric ID
- `items[].shortURL`: Short URL (url)
- `items[].secureShortURL`: Secure Short URL (url)
- `items[].originalURL`: Original URL (url)
- `items[].path`: Path
- `items[].title`: Title
- `items[].tags`: Tags
- `items[].DomainId`: Domain ID (number)
- `items[].FolderId`: Folder ID
- `items[].OwnerId`: Owner ID (number)
- `items[].hasPassword`: Password Protected (boolean)
- `items[].cloaking`: Cloaking (boolean)
- `items[].redirectType`: Redirect Type
- `items[].archived`: Archived (boolean)
- `items[].expiresAt`: Expires At
- `items[].expiredURL`: Expired Redirect URL (url)
- `items[].clicksLimit`: Clicks Limit (number)
- `items[].ttl`: Scheduled Deletion Time
- `items[].createdAt`: Created At (datetime)
- `items[].utmSource`: UTM Source
- `items[].utmMedium`: UTM Medium
- `items[].utmCampaign`: UTM Campaign
- `items[].utmTerm`: UTM Term
- `items[].utmContent`: UTM Content
- `items[].androidURL`: Android URL (url)
- `items[].iphoneURL`: iPhone URL (url)
- `items[].splitURL`: Split URL (url)
- `items[].splitPercent`: Split Percent (number)
- `items[].User`: Owner
- `items[].User.id`: User ID (number)
- `items[].User.name`: Name
- `items[].User.email`: Email (email)
- `createdCount`: Created (number)
- `errors`: Failed Items
- `errors[].index`: Input Index (number)
- `errors[].originalURL`: Original URL (url)
- `errors[].error`: Error
- `errorCount`: Failed (number)

### `archive_link`

**Archive Short Link.** Archives a short link by link ID, hiding it from the default dashboard list; the short URL keeps working. Reversible with Unarchive Short Link. Idempotent: archiving an archived link changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |

Output fields:

- `linkId`: Link ID
- `archived`: Archived (boolean)

### `unarchive_link`

**Unarchive Short Link.** Restores an archived short link (by link ID) to the active link list. Idempotent: unarchiving an active link changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |

Output fields:

- `linkId`: Link ID
- `archived`: Archived (boolean)

### `add_tag_to_links`

**Add Tag to Links.** Appends a single tag to one or more short links given their link IDs; existing tags are kept. Idempotent: tagging a link that already has the tag changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | yes |  | Tag. The tag to add. |
| `linkIds` | array | yes |  | Link IDs. Link IDs to tag (the idString of each link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye). |

Output fields:

- `tag`: Tag
- `linkIds`: Link IDs
- `count`: Links Tagged (number)

### `generate_qr_code`

**Generate QR Code.** Generates a QR code image for a short link (by link ID) and returns it as a file. Optional colors, size (1-99) and PNG or SVG format. Does not change the link. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |
| `type` | string | no | `"png"` | Format. One of `"png"`, `"svg"`. |
| `size` | number | no |  | Size. Scale factor from 1 to 99 (Short.io default when empty). |
| `color` | string | no |  | Color. Hex color of the code, e.g. 000000. |
| `backgroundColor` | string | no |  | Background Color. Hex background color, e.g. FFFFFF. |

Output fields:

- `linkId`: Link ID
- `format`: Format
- `fileName`: File Name
- `file`: File
- `size`: Size (bytes) (filesize)

### `list_folders`

**List Folders.** Lists the link folders of a Short.io domain with their IDs and names, to use as Folder ID in other steps. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |

Output fields:

- `items`: Folders
- `items[].id`: Folder ID
- `items[].name`: Name
- `count`: Count (number)

### `create_folder`

**Create Folder.** Creates a new link folder on a Short.io domain and returns its ID. Not idempotent: a repeat call may create a second folder with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `name` | string | yes |  | Folder Name. |

Output fields:

- `id`: Folder ID
- `name`: Name
- `domainId`: Domain ID (number)

### `list_country_rules`

**List Country Targeting Rules.** Lists the country-targeting rules of a short link (by link ID): which countries get redirected to which URL. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |

Output fields:

- `linkId`: Link ID
- `items`: Rules
- `items[].country`: Country Code
- `items[].originalURL`: Redirect URL (url)
- `count`: Count (number)

### `delete_country_rule`

**Delete Country Targeting Rule.** Removes the country-targeting rule for one country (2-letter code) from a short link; visitors from that country then go to the default destination. A repeat call reports alreadyDeleted. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |
| `country` | string | yes |  | Country Code. ISO 3166-1 alpha-2 code of the rule to remove, e.g. US. |

Output fields:

- `linkId`: Link ID
- `country`: Country Code
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Already Deleted (boolean)

### `list_recent_clicks`

**List Recent Clicks.** Lists the most recent individual clicks on a Short.io domain, newest first, with time, path, country, city, referrer, browser and OS. Output includes visitor IP addresses and user agents (personal data). Optional filter by link path and human clicks only. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `limit` | number | no |  | Limit. How many clicks to return (1-1000). Default 30. |
| `paths` | array | no |  | Link Paths. Only clicks on these paths, e.g. promo. Needs a Short.io Team plan. |
| `humanOnly` | boolean | no | `false` | Human Clicks Only. Skip clicks Short.io identifies as bots. |

Output fields:

- `items`: Clicks
- `items[].dt`: Clicked At (datetime)
- `items[].path`: Path
- `items[].url`: Short URL (url)
- `items[].host`: Host
- `items[].country`: Country
- `items[].city`: City
- `items[].ref`: Referrer URL
- `items[].refhost`: Referrer Host
- `items[].browser`: Browser
- `items[].os`: Operating System
- `items[].social`: Social Network
- `items[].human`: Human (boolean)
- `items[].st`: HTTP Status (number)
- `items[].utm_source`: UTM Source
- `items[].utm_medium`: UTM Medium
- `items[].utm_campaign`: UTM Campaign
- `items[].ip`: Visitor IP
- `items[].ua`: User Agent
- `count`: Count (number)

### `get_top_links`

**Get Top Links.** Returns the most-clicked link paths on a Short.io domain for a period, ordered by clicks (descending), with the click count of each. Custom period needs start and end dates (YYYY-MM-DD). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `period` | string | no | `"last30"` | Period. Time period to rank links over. Default: last 30 days. One of `"today"`, `"yesterday"`, `"last7"`, `"last30"`, `"week"`, `"month"`, `"lastmonth"`, `"total"`, `"custom"`. |
| `startDate` | string | no |  | Start Date. First day (YYYY-MM-DD) when Period is "custom". |
| `endDate` | string | no |  | End Date. Last day (YYYY-MM-DD) when Period is "custom". |
| `tz` | string | no |  | Timezone. IANA timezone for day boundaries, e.g. UTC or America/New_York. Defaults to UTC. |
| `limit` | number | no |  | Limit. How many links to return (1-100). Default 10. |

Output fields:

- `items`: Top Links
- `items[].path`: Path
- `items[].clicks`: Clicks (number)
- `count`: Count (number)

### `duplicate_link`

**Duplicate Short Link.** Creates a new short link on the same domain that copies an existing link (destination URL, title, tags, UTM and redirect settings), optionally with a custom slug. Use to make a variant of a link, e.g. one per campaign channel, without re-entering its settings. Returns the new link and duplicatedFrom. Without a slug every call creates another copy; a repeat call with the same slug returns the existing copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |
| `path` | string | no |  | New Path (Slug). Slug for the copy, e.g. spring-sale-email. Empty = Short.io generates one. |

Output fields:

- `duplicatedFrom`: Copied From Link ID
- `idString`: Link ID
- `linkId`: Link ID (copy)
- `id`: Legacy Numeric ID
- `shortURL`: Short URL (url)
- `secureShortURL`: Secure Short URL (url)
- `originalURL`: Original URL (url)
- `path`: Path
- `title`: Title
- `tags`: Tags
- `DomainId`: Domain ID (number)
- `FolderId`: Folder ID
- `OwnerId`: Owner ID (number)
- `hasPassword`: Password Protected (boolean)
- `cloaking`: Cloaking (boolean)
- `redirectType`: Redirect Type
- `archived`: Archived (boolean)
- `expiresAt`: Expires At
- `expiredURL`: Expired Redirect URL (url)
- `clicksLimit`: Clicks Limit (number)
- `ttl`: Scheduled Deletion Time
- `createdAt`: Created At (datetime)
- `utmSource`: UTM Source
- `utmMedium`: UTM Medium
- `utmCampaign`: UTM Campaign
- `utmTerm`: UTM Term
- `utmContent`: UTM Content
- `androidURL`: Android URL (url)
- `iphoneURL`: iPhone URL (url)
- `splitURL`: Split URL (url)
- `splitPercent`: Split Percent (number)
- `User`: Owner
- `User.id`: User ID (number)
- `User.name`: Name
- `User.email`: Email (email)

### `get_folder`

**Get Folder.** Returns one link folder (ID and name) on a Short.io domain, given the domain and the folder ID from List Folders or a link’s FolderId. Use to turn a link’s folder ID into its name. Returns found=false when no folder has that ID. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `folderId` | string | yes |  | Folder ID. The folder ID, e.g. the FolderId field of a link. |

Output fields:

- `found`: Found (boolean)
- `folder`: Folder
- `folder.id`: Folder ID
- `folder.name`: Name
- `folder.domainId`: Domain ID (number)

### `get_link_open_graph`

**Get Link Social Preview (OpenGraph).** Returns the custom OpenGraph properties (og title, description, image, twitter card…) set on a short link, i.e. what social networks show when the link is shared. Use to check or report a link’s social preview. Empty when none are set (custom OpenGraph needs a Short.io Pro plan). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |

Output fields:

- `linkId`: Link ID
- `properties`: Properties (an object whose keys vary)
- `items`: Property List
- `items[].property`: Property
- `items[].value`: Value
- `count`: Count (number)

### `create_link`

**Create Short Link (AI).** Creates a short link on a Short.io domain for a long URL, optionally with a custom slug, title, tags, UTM parameters, expiry date or scheduled deletion. Not idempotent: a repeat call with no slug creates another link; with the same slug it fails unless the URL matches. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `originalURL` | string | yes |  | Original URL. The long URL the short link redirects to. |
| `path` | string | no |  | Path (Slug). Custom slug after the domain, e.g. spring-sale. Empty = Short.io generates one. |
| `title` | string | no |  | Title. |
| `tags` | array | no |  | Tags. Tags for the link. On update this replaces the existing tags. |
| `folderId` | string | no |  | Folder ID. Folder ID from List Folders. |
| `utmSource` | string | no |  | UTM Source. |
| `utmMedium` | string | no |  | UTM Medium. |
| `utmCampaign` | string | no |  | UTM Campaign. |
| `utmTerm` | string | no |  | UTM Term. |
| `utmContent` | string | no |  | UTM Content. |
| `redirectType` | string | no |  | Redirect Type. One of `"301"`, `"302"`, `"303"`, `"307"`, `"308"`. |
| `expiresAt` | string | no |  | Expires At. ISO 8601 date-time after which the link shows the expired page (it is not deleted). |
| `expiredURL` | string | no |  | Expired Redirect URL. Where visitors go after the link expires. |
| `clicksLimit` | number | no |  | Clicks Limit. Expire the link after this many clicks (minimum 1). |
| `deleteAt` | string | no |  | Delete At. ISO 8601 date-time at which Short.io permanently deletes the link; must be at least 7 days ahead. Deletion may lag by up to 2 hours. |

Output fields:

- `idString`: Link ID
- `linkId`: Link ID (copy)
- `id`: Legacy Numeric ID
- `shortURL`: Short URL (url)
- `secureShortURL`: Secure Short URL (url)
- `originalURL`: Original URL (url)
- `path`: Path
- `title`: Title
- `tags`: Tags
- `DomainId`: Domain ID (number)
- `FolderId`: Folder ID
- `OwnerId`: Owner ID (number)
- `hasPassword`: Password Protected (boolean)
- `cloaking`: Cloaking (boolean)
- `redirectType`: Redirect Type
- `archived`: Archived (boolean)
- `expiresAt`: Expires At
- `expiredURL`: Expired Redirect URL (url)
- `clicksLimit`: Clicks Limit (number)
- `ttl`: Scheduled Deletion Time
- `createdAt`: Created At (datetime)
- `utmSource`: UTM Source
- `utmMedium`: UTM Medium
- `utmCampaign`: UTM Campaign
- `utmTerm`: UTM Term
- `utmContent`: UTM Content
- `androidURL`: Android URL (url)
- `iphoneURL`: iPhone URL (url)
- `splitURL`: Split URL (url)
- `splitPercent`: Split Percent (number)
- `User`: Owner
- `User.id`: User ID (number)
- `User.name`: Name
- `User.email`: Email (email)

### `update_link`

**Update Short Link (AI).** Updates an existing short link by link ID: destination URL, slug, title, tags (replaces the list), folder, UTM fields, expiry or scheduled deletion. Only fields you provide change. Idempotent: sending the same values again leaves the link the same. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |
| `originalURL` | string | no |  | Original URL. New destination URL. |
| `path` | string | no |  | Path (Slug). Custom slug after the domain, e.g. spring-sale. Empty = Short.io generates one. |
| `title` | string | no |  | Title. |
| `tags` | array | no |  | Tags. Tags for the link. On update this replaces the existing tags. |
| `folderId` | string | no |  | Folder ID. Folder ID from List Folders. |
| `utmSource` | string | no |  | UTM Source. |
| `utmMedium` | string | no |  | UTM Medium. |
| `utmCampaign` | string | no |  | UTM Campaign. |
| `utmTerm` | string | no |  | UTM Term. |
| `utmContent` | string | no |  | UTM Content. |
| `redirectType` | string | no |  | Redirect Type. One of `"301"`, `"302"`, `"303"`, `"307"`, `"308"`. |
| `expiresAt` | string | no |  | Expires At. ISO 8601 date-time after which the link shows the expired page (it is not deleted). |
| `expiredURL` | string | no |  | Expired Redirect URL. Where visitors go after the link expires. |
| `clicksLimit` | number | no |  | Clicks Limit. Expire the link after this many clicks (minimum 1). |
| `deleteAt` | string | no |  | Delete At. ISO 8601 date-time at which Short.io permanently deletes the link; must be at least 7 days ahead. Deletion may lag by up to 2 hours. |

Output fields:

- `idString`: Link ID
- `linkId`: Link ID (copy)
- `id`: Legacy Numeric ID
- `shortURL`: Short URL (url)
- `secureShortURL`: Secure Short URL (url)
- `originalURL`: Original URL (url)
- `path`: Path
- `title`: Title
- `tags`: Tags
- `DomainId`: Domain ID (number)
- `FolderId`: Folder ID
- `OwnerId`: Owner ID (number)
- `hasPassword`: Password Protected (boolean)
- `cloaking`: Cloaking (boolean)
- `redirectType`: Redirect Type
- `archived`: Archived (boolean)
- `expiresAt`: Expires At
- `expiredURL`: Expired Redirect URL (url)
- `clicksLimit`: Clicks Limit (number)
- `ttl`: Scheduled Deletion Time
- `createdAt`: Created At (datetime)
- `utmSource`: UTM Source
- `utmMedium`: UTM Medium
- `utmCampaign`: UTM Campaign
- `utmTerm`: UTM Term
- `utmContent`: UTM Content
- `androidURL`: Android URL (url)
- `iphoneURL`: iPhone URL (url)
- `splitURL`: Split URL (url)
- `splitPercent`: Split Percent (number)
- `User`: Owner
- `User.id`: User ID (number)
- `User.name`: Name
- `User.email`: Email (email)

### `find_link_by_path`

**Find Link by Short URL (AI).** Looks up a short link from its public short URL (e.g. https://link.example.com/promo) or from a domain plus slug, returning the link ID and settings. Returns found=false when the slug does not exist. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `shortUrl` | string | yes |  | Short URL or Slug. Full short URL like https://link.example.com/promo, or just the slug "promo" when Domain is given. |
| `domain` | string | no |  | Domain. Domain hostname or ID; needed only when Short URL is a bare slug. |

Output fields:

- `found`: Found (boolean)
- `link`: Link
- `link.idString`: Link ID
- `link.linkId`: Link ID (copy)
- `link.id`: Legacy Numeric ID
- `link.shortURL`: Short URL (url)
- `link.secureShortURL`: Secure Short URL (url)
- `link.originalURL`: Original URL (url)
- `link.path`: Path
- `link.title`: Title
- `link.tags`: Tags
- `link.DomainId`: Domain ID (number)
- `link.FolderId`: Folder ID
- `link.OwnerId`: Owner ID (number)
- `link.hasPassword`: Password Protected (boolean)
- `link.cloaking`: Cloaking (boolean)
- `link.redirectType`: Redirect Type
- `link.archived`: Archived (boolean)
- `link.expiresAt`: Expires At
- `link.expiredURL`: Expired Redirect URL (url)
- `link.clicksLimit`: Clicks Limit (number)
- `link.ttl`: Scheduled Deletion Time
- `link.createdAt`: Created At (datetime)
- `link.utmSource`: UTM Source
- `link.utmMedium`: UTM Medium
- `link.utmCampaign`: UTM Campaign
- `link.utmTerm`: UTM Term
- `link.utmContent`: UTM Content
- `link.androidURL`: Android URL (url)
- `link.iphoneURL`: iPhone URL (url)
- `link.splitURL`: Split URL (url)
- `link.splitPercent`: Split Percent (number)
- `link.User`: Owner
- `link.User.id`: User ID (number)
- `link.User.name`: Name
- `link.User.email`: Email (email)

### `list_links`

**List Links (AI).** Lists one page (up to 150) of short links on a domain, optionally in one folder or created before/after a date. Returns items, nextPageToken and hasMore; pass nextPageToken back as Page Token for the next page. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `folderId` | string | no |  | Folder ID. Optional folder ID (use List Folders to find it). |
| `createdAfter` | string | no |  | Created After. ISO 8601 date-time; only links created after it. |
| `createdBefore` | string | no |  | Created Before. ISO 8601 date-time; only links created before it. |
| `sortOrder` | string | no | `"desc"` | Sort Order. One of `"desc"`, `"asc"`. |
| `limit` | number | no |  | Limit. Links per page (1-150). Default 50. |
| `pageToken` | string | no |  | Page Token. nextPageToken from a previous call. |

Output fields:

- `items`: Links
- `items[].idString`: Link ID
- `items[].linkId`: Link ID (copy)
- `items[].id`: Legacy Numeric ID
- `items[].shortURL`: Short URL (url)
- `items[].secureShortURL`: Secure Short URL (url)
- `items[].originalURL`: Original URL (url)
- `items[].path`: Path
- `items[].title`: Title
- `items[].tags`: Tags
- `items[].DomainId`: Domain ID (number)
- `items[].FolderId`: Folder ID
- `items[].OwnerId`: Owner ID (number)
- `items[].hasPassword`: Password Protected (boolean)
- `items[].cloaking`: Cloaking (boolean)
- `items[].redirectType`: Redirect Type
- `items[].archived`: Archived (boolean)
- `items[].expiresAt`: Expires At
- `items[].expiredURL`: Expired Redirect URL (url)
- `items[].clicksLimit`: Clicks Limit (number)
- `items[].ttl`: Scheduled Deletion Time
- `items[].createdAt`: Created At (datetime)
- `items[].utmSource`: UTM Source
- `items[].utmMedium`: UTM Medium
- `items[].utmCampaign`: UTM Campaign
- `items[].utmTerm`: UTM Term
- `items[].utmContent`: UTM Content
- `items[].androidURL`: Android URL (url)
- `items[].iphoneURL`: iPhone URL (url)
- `items[].splitURL`: Split URL (url)
- `items[].splitPercent`: Split Percent (number)
- `items[].User`: Owner
- `items[].User.id`: User ID (number)
- `items[].User.name`: Name
- `items[].User.email`: Email (email)
- `count`: Count on This Page (number)
- `nextPageToken`: Next Page Token
- `hasMore`: Has More (boolean)

### `delete_link`

**Delete Short Link (AI).** Permanently deletes a short link by ID; the short URL stops working. A repeat call reports already deleted. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |

Output fields:

- `linkId`: Link ID
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Already Deleted (boolean)

### `set_country_rule`

**Add Country Targeting Rule (AI).** Adds a country-targeting rule to a short link (by link ID): visitors from the given country (2-letter ISO code) are sent to the given URL instead of the default destination. Not idempotent: a second rule for the same country may be rejected. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. Short.io link ID: the idString field of a link, e.g. link_8yXK_034ebx7JWAtAAK3vFcl6ye. |
| `country` | string | yes |  | Country Code. ISO 3166-1 alpha-2 code, e.g. US, DE. |
| `originalURL` | string | yes |  | Country Redirect URL. Where visitors from that country go. |

Output fields:

- `linkId`: Link ID
- `country`: Country Code
- `originalURL`: Redirect URL (url)
- `rule`: Raw Rule

### `get_domain_statistics`

**Get Domain Statistics (AI).** Returns total and human clicks, links created, and top countries, referrers and browsers for a whole Short.io domain over a period. Custom period needs start and end dates (YYYY-MM-DD). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Short.io domain hostname (e.g. link.example.com) or its numeric domain ID. Use List Domains to see them. |
| `period` | string | no | `"last30"` | Period. Time period for the statistics. Default: last 30 days. One of `"today"`, `"yesterday"`, `"last7"`, `"last30"`, `"week"`, `"month"`, `"lastmonth"`, `"total"`, `"custom"`. |
| `startDate` | string | no |  | Start Date. First day (YYYY-MM-DD) when Period is "custom". |
| `endDate` | string | no |  | End Date. Last day (YYYY-MM-DD) when Period is "custom". |
| `tz` | string | no |  | Timezone. IANA timezone for day boundaries, e.g. UTC or America/New_York. Defaults to UTC. |

Output fields:

- `clicks`: Total Clicks (number)
- `humanClicks`: Human Clicks (number)
- `links`: Links Created (number)
- `clicksPerLink`: Clicks per Link
- `prevClicks`: Clicks in Previous Period (number)
- `prevHumanClicks`: Human Clicks in Previous Period (number)
- `interval`: Interval
- `interval.startDate`: Start (datetime)
- `interval.endDate`: End (datetime)
- `interval.tz`: Timezone
- `clickStatistics`: Clicks Over Time
- `country`: Top Countries
- `country[].country`: Value
- `country[].score`: Clicks (number)
- `referer`: Top Referrers
- `referer[].referer`: Value
- `referer[].score`: Clicks (number)
- `browser`: Top Browsers
- `browser[].browser`: Value
- `browser[].score`: Clicks (number)
- `os`: Top Operating Systems
- `os[].os`: Value
- `os[].score`: Clicks (number)
- `social`: Top Social Networks
- `social[].social`: Value
- `social[].score`: Clicks (number)
- `city`: Top Cities
- `city[].name`: Value
- `city[].score`: Clicks (number)

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
