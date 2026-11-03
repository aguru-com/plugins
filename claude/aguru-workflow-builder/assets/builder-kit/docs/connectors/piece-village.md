# Village

The Social Capital API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-village'
  version: '0.4.5'
```

Categories: PRODUCTIVITY, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Your Village API token. Generate one from your Village settings and paste it here.

## Actions

### `get_app_info`

**Get App Information.** Fetch metadata about the partner application tied to the current API token (title, domain, public key, active flag). Read-only and idempotent. Use to verify which app a token belongs to and confirm its configuration, not for user or team data. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `check_company_paths`

**Check Company Paths.** Read-only lightweight check of whether any introduction paths to a company exist, identified by domain, LinkedIn URL, or generic url (supply exactly one). Use as a cheap yes/no-with-score screen before calling Get Company Paths, which returns the actual reachable employees. Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Company domain, e.g. "acme.com" (provide one of: domain, linkedin_url, url) |
| `linkedin_url` | string | no |  | LinkedIn URL. LinkedIn company page URL, e.g. "https://linkedin.com/company/acme-corp" (provide one of: domain, linkedin_url, url) |
| `url` | string | no |  | URL. Generic company URL (auto-detected) (provide one of: domain, linkedin_url, url) |

### `companies_refresh`

**Refresh Companies.** Trigger a re-fetch or first-time import of companies from LinkedIn URLs and/or domains; it kicks off backend processing, so treat it as a non-idempotent write. Set realtime=true to wait up to ~25s for inline data, or false to get job IDs; pass those job_ids back on a later call to poll async results. To read an already-imported company without re-fetching, use Enrich Company. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_ids` | array | no |  | Job IDs. Job IDs to check status for (returned by async refresh calls). |
| `linkedin_urls` | array | no |  | LinkedIn URLs. LinkedIn company page URLs to refresh. |
| `domains` | array | no |  | Domains. Company domains to refresh, e.g. "example.com". |
| `realtime` | boolean | yes |  | Realtime. If true, wait for enrichment (up to ~25s) and return company data inline. If false, return job IDs immediately. |

### `enrich_company`

**Enrich Company.** Read-only firmographic lookup for one company you can already identify by domain, LinkedIn URL, or generic url (supply exactly one). Use when you have the identifier; for multiple companies use Enrich Company (Bulk), and to find companies by criteria use Search Companies. Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Company domain, e.g. "example.com" (provide one of: domain, linkedin_url, url) |
| `linkedin_url` | string | no |  | LinkedIn URL. LinkedIn company page URL, e.g. "https://linkedin.com/company/acme-corp" (provide one of: domain, linkedin_url, url) |
| `url` | string | no |  | URL. Generic company URL (auto-detected) (provide one of: domain, linkedin_url, url) |

### `enrich_company_bulk`

**Enrich Company (Bulk).** Read-only batch lookup of detailed firmographics for up to 10 companies, each identified by domain, LinkedIn URL, or generic url. Use when you already have multiple known companies; for one company use Enrich Company, and for criteria-based discovery use Search Companies. Per-row errors are returned for misses. Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifiers` | array | yes | `[]` | Identifiers. Up to 10 companies to look up. Each row specifies an identifier type and value. Each item: { `identifierType`, `identifierValue` }. |

### `get_company_paths`

**Get Company Paths.** Read-only lookup of the reachable employees at one company (identified by domain, LinkedIn URL, or generic url; supply exactly one), ranked by connection strength. Use when you want the actual people to approach; for a cheaper exists/score screen first use Check Company Paths. Cursor-paginated and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain. Company domain, e.g. "acme.com" (provide one of: domain, linkedin_url, url) |
| `linkedin_url` | string | no |  | LinkedIn URL. LinkedIn company page URL, e.g. "https://linkedin.com/company/acme-corp" (provide one of: domain, linkedin_url, url) |
| `url` | string | no |  | URL. Generic company URL (auto-detected) (provide one of: domain, linkedin_url, url) |
| `cursor` | string | no |  | Cursor. Opaque cursor for pagination (from previous response) |
| `limit` | number | no |  | Limit. Number of results per page (default 25, max 50) |
| `connection_degrees` | array | no |  | Connection Degrees. Filter by connection degree (1=direct, 2=second-degree, 3=third-degree). Provide one or more values. |

### `list_companies`

**List Companies.** Read-only browse of the companies your network reaches best, ranked by connection strength, with optional connection-degree filtering. Use to enumerate companies you already have a path into; for criteria-based discovery use Search Companies. Cursor-paginated and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cursor` | string | no |  | Cursor. Opaque cursor for pagination (from previous response) |
| `limit` | number | no |  | Limit. Number of results per page (default 25, max 100) |
| `connection_degrees` | array | no |  | Connection Degrees. Filter by connection degree (1=direct, 2=second-degree, 3=third-degree). Provide one or more values. |

### `search_companies`

**Search Companies.** Read-only discovery search for companies by a natural-language prompt and/or structured firmographic filters (at least one required); scope restricts to your network or searches globally. Use when you do not already have a domain or URL — for a known company use Enrich Company. Cursor-paginated and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | no |  | Prompt. Natural language search query, e.g. "Find B2B SaaS companies with 50-200 employees in California". Either prompt or filters must be provided. |
| `filters` | JSON | no |  | Filters. Structured filters. Supported keys: name, domain, linkedinUrl, linkedinId, industry, companySize, companyType, country, city, foundedAfter, foundedBefore, keywords. |
| `limit` | number | no |  | Limit. Maximum number of results per page (default 25, max 100) |
| `mode` | string | no |  | Mode. Search mode: auto (let system decide), lookup (direct match), simple (LLM-powered), or complex (thinking + high-reasoning SQL generation). One of `"auto"`, `"lookup"`, `"simple"`, `"complex"`. |
| `scope` | string | no |  | Scope. Search scope: network (connections first) or global (all companies). One of `"network"`, `"global"`. |
| `cursor` | string | no |  | Cursor. Pagination cursor (encoded string) from a previous response. |
| `network_filters` | JSON | no |  | Network Filters. Network path and relationship filters. |
| `include_counts` | string | no |  | Include Counts. Inline count scope to compute on the first page only. Ignored when cursor is provided and adds latency. One of `"global"`, `"network"`, `"all"`. |

### `sort_companies`

**Sort Companies.** Read-only ranking of a caller-supplied set of companies (up to 100 LinkedIn URLs or domains) by how strongly your network reaches people there, ordered strongest-first. Use when you already have specific companies to prioritize; to discover companies use Search Companies. Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companies` | array | yes |  | Companies. Array of company URLs (LinkedIn URLs or domains), e.g. "https://linkedin.com/company/acme-corp" or "example.com". Max 100. |

### `join_group`

**Join Group.** Add yourself to a group via its invite-link code, which changes your membership and grants access to the group's shared network. This is a state-changing write, not a read; to enumerate groups you already belong to use List Groups, and to exit one use Leave Group. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_invite_link` | string | yes |  | Group Invite Link. The invite link code shared by a group admin or member. |

### `leave_group`

**Leave Group.** Remove yourself from a group by group_id, a state-changing write that revokes your access to its shared network; if you are the last member the group is deleted entirely. Admins must remove all other members before they can leave. Find the group_id via List Groups. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_id` | string | yes |  | Group ID. ID of the group to leave. |

### `list_groups`

**List Groups.** Read-only listing of every group you currently belong to, useful for discovering group_ids needed by Leave Group or Create or Update Group. Takes no input. Pure query, safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `upsert_group`

**Create or Update Group.** Create a new group or update an existing one in a single write. Omit group_id to create (a new id is generated); pass an existing group_id to update its name/logo (requires admin permissions). Updating by a stable group_id is idempotent, but omitting it creates a fresh group on each call. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Group name (max 100 characters) |
| `group_id` | string | no |  | Group ID. Existing group ID to update. Omit to create a new group. |
| `logo` | string | no |  | Logo. URL to the group logo image. |

### `list_integrations`

**List Gmail Integrations.** List the caller's connected Gmail integrations with their rate limits, timezone, and default-sender status. Read-only and idempotent. Use to discover integration IDs before updating or resyncing one. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `resync_integration`

**Reset Integration.** Trigger a full resync of a Google or LinkedIn integration by numeric ID, clearing sync cursors and re-importing all contacts and calendar data. Idempotent: graph writes use MERGE, so repeating it re-imports without creating duplicates. Use when synced network data looks stale or incomplete. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | yes |  | Integration ID. Numeric ID of the integration to resync. |

### `update_integration`

**Update Gmail Integration.** Update settings on an existing connected Gmail integration by numeric ID: email send rate limits, minimum delay, timezone, connection status, or default-sender flag. Idempotent: only the supplied fields change and re-applying the same values is a no-op. Use List Gmail Integrations to find the ID first. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | yes |  | Integration ID. Numeric ID of the integration to update. |
| `email_sending_per_day` | number | no |  | Emails Per Day. Daily email sending limit (1-500) |
| `email_sending_per_hour` | number | no |  | Emails Per Hour. Hourly email sending limit (1-100) |
| `email_sending_min_delay_seconds` | number | no |  | Minimum Delay (seconds). Minimum delay between emails in seconds (60-3600) |
| `timezone` | string | no |  | Timezone. Timezone for scheduling, e.g. "America/New_York". |
| `status` | string | no |  | Status. Integration status. One of `"connected"`, `"disconnected"`, `"failed"`. |
| `email_sending_default` | boolean | no |  | Set as Default. Whether this should be the default integration for email sending. |

### `add_list_items`

**Add items to list.** Add up to 100 people or companies to an existing list, resolving each identifier (LinkedIn URL, company domain, email, or graph ID) to an entity. Effectively idempotent per entity: re-adding one already on the list does not duplicate it. Per-item results report which identifiers resolved and were added. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | List ID. List ID. |
| `items` | array | yes |  | Items. Items to add to the list (max 100) Each item: { `identifier`, `type`? }. |

### `check_list_membership`

**Check list membership.** For up to 1000 entity IDs (all people or all companies), look up which lists each one belongs to. Read-only and idempotent despite using POST. Use to reverse the list-to-members relationship — finding an entity's memberships rather than reading a list's contents. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_ids` | array | yes |  | Entity IDs. Array of entity IDs (person or company IDs) to check membership for (max 1000) |
| `entity_type` | string | yes |  | Entity Type. Type of entities being checked. One of `"people"`, `"company"`. |

### `create_list`

**Create a list.** Create a new people or company list, making the caller its owner. Not idempotent: each call creates a separate list even with the same title, and the entity type is fixed at creation. Subscription plan limits may cap how many lists can exist. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. List title. |
| `type` | string | no | `"people"` | Type. Type of entities in the list. One of `"people"`, `"company"`. |
| `description` | string | no |  | Description. Optional list description. |
| `is_public` | boolean | no | `false` | Is Public. Whether the list is publicly accessible. |

### `delete_list`

**Delete a list.** Permanently delete an entire list and all its items by list ID; this cannot be undone. To remove only specific entries while keeping the list, use Remove items from list instead. Effectively idempotent once deleted. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | List ID. List ID. |

### `get_list`

**Get a list.** Fetch a single list by ID along with its items, paginated via an opaque cursor. Read-only and idempotent. Use this to read members of one known list (and to obtain item IDs for removal); use List all lists to discover list IDs first. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | List ID. List ID. |
| `cursor` | string | no |  | Cursor. Opaque cursor for items pagination (from previous response) |
| `limit` | number | no | `20` | Limit. Number of items per page (max 100) |

### `list_lists`

**List all lists.** List the caller's saved lists, with optional cursor pagination, type filter (people or company), and title search. Read-only and idempotent. Use to discover list IDs and titles; use Get a list to read the items inside a specific list. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cursor` | string | no |  | Cursor. Opaque cursor for pagination (from previous response) |
| `limit` | number | no | `20` | Limit. Number of lists per page (max 100) |
| `type` | string | no |  | Type. Filter lists by type. One of `"people"`, `"company"`. |
| `search` | string | no |  | Search. Search lists by title. |

### `remove_list_items`

**Remove items from list.** Remove up to 100 items from a list by their list-item IDs, which you must first obtain from Get a list (these are not entity/person IDs). Effectively idempotent: removing an item already gone is a no-op rather than an error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | List ID. List ID. |
| `item_ids` | array | yes |  | Item IDs. Array of item IDs to remove from the list (max 100) |

### `update_list`

**Update a list.** Update an existing list's title and/or description by ID; at least one field must be supplied. Idempotent: applying the same values repeatedly yields the same result. The list type (people vs company) is fixed at creation and cannot be changed here. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | List ID. List ID. |
| `title` | string | no |  | Title. New list title. |
| `description` | string | no |  | Description. New list description. Leave blank to keep unchanged. |

### `enrich_person`

**Enrich Person.** Read-only profile lookup for one person you can already identify by their LinkedIn URL (or a generic url to auto-detect; supply exactly one). Use when you have the URL and want their profile attributes; to find candidates by criteria use Search People, and to get someone's email use Enrich Person Email (Bulk). Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkedin_url` | string | no |  | LinkedIn URL. LinkedIn profile URL, e.g. https://linkedin.com/in/johndoe (provide this OR url) |
| `url` | string | no |  | URL. Generic URL — auto-detected (provide this OR linkedin_url) |

### `enrich_person_bulk`

**Enrich Person (Bulk).** Retrieve detailed profiles for up to 10 people in one call, each identified by a LinkedIn URL or generic URL. Read-only and idempotent; partial results are returned with per-person success or error status when some lookups fail. Use for full profile enrichment; use Enrich Person Email when only an email address is needed. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifiers` | array | yes | `[]` | Identifiers. Up to 10 people to enrich. Each row is one person. Each item: { `identifierType`, `identifierValue` }. |

### `enrich_person_email`

**Enrich Person Email.** Look up a single person's email address from exactly one identifier — either a LinkedIn URL or a generic URL (provide one, not both). Read-only and idempotent. Use for email discovery specifically; use Enrich Person (Bulk) for full profile data on many people. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkedin_url` | string | no |  | LinkedIn URL. LinkedIn profile URL, e.g. https://linkedin.com/in/johndoe (provide this OR url) |
| `url` | string | no |  | URL. Generic URL — auto-detected (provide this OR linkedin_url) |

### `enrich_person_email_bulk`

**Enrich Person Email (Bulk).** Read-only batch lookup of email addresses for up to 10 people, each identified by a LinkedIn URL or generic URL. Use specifically when you need contact emails; for general profile attributes use Enrich Person. Per-row errors are returned for misses rather than failing the whole call. Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifiers` | array | yes | `[]` | Identifiers. Up to 10 people to look up emails for. Each row is one person. Each item: { `identifierType`, `identifierValue` }. |

### `get_person_paths`

**Get Person Paths.** Read-only lookup of warm-introduction paths to one person via your network, identified by their LinkedIn URL (or a generic url to auto-detect; supply exactly one). Use for a single target; for many targets at once use Get Person Paths (Bulk). Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkedin_url` | string | no |  | LinkedIn URL. LinkedIn profile URL of the target person, e.g. https://linkedin.com/in/johndoe (provide this OR url) |
| `url` | string | no |  | URL. Generic URL — auto-detected (provide this OR linkedin_url) |

### `get_person_paths_bulk`

**Get Person Paths (Bulk).** Read-only batch lookup of warm-introduction paths to many people at once, keyed by LinkedIn ID (the slug after linkedin.com/in/, not a full URL). Pick this over Get Person Paths when you have more than one target to evaluate together; capped at 100 IDs per call. Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkedin_ids` | array | yes | `[]` | LinkedIn IDs. LinkedIn identifiers (e.g. "johndoe" from linkedin.com/in/johndoe). Max 100 per request. |

### `list_people`

**List People.** Read-only browse of your own network contacts ranked by connection strength, with optional filtering by connection degree or current company domain. Use to enumerate who you already know; for criteria-based discovery beyond your contacts use Search People. Cursor-paginated and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cursor` | string | no |  | Cursor. Opaque cursor for pagination (from previous response) |
| `limit` | number | no | `25` | Limit. Number of results per page (default 25, max 100) |
| `connection_degrees` | array | no |  | Connection Degrees. Filter by connection degree (1=direct, 2=second-degree, 3=third-degree). Provide one or more values. |
| `company_domain` | string | no |  | Company Domain. Filter by current company domain (exact match), e.g. "google.com". |

### `people_refresh`

**Refresh People.** Trigger a re-fetch or first-time import of people into your network from LinkedIn URLs; this kicks off backend processing, so treat it as a non-idempotent write rather than a plain read. Set realtime=true to wait up to ~25s for enriched data inline, or false to get job IDs to poll later. To read already-imported profiles without re-fetching, use Enrich Person instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkedin_urls` | array | yes | `[]` | LinkedIn URLs. LinkedIn profile URLs to refresh. At least one is required. |
| `realtime` | boolean | yes |  | Realtime. If true, waits synchronously for results (up to 25s). If false, returns job IDs for async processing. |

### `search_people`

**Search People.** Read-only discovery search for people by a natural-language prompt and/or structured filters (at least one required); scope controls whether you search your network, everyone (global), or a caller-supplied candidate list. Use when you do not already have a specific profile URL — for a known person use Enrich Person instead. Cursor-paginated and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | no |  | Prompt. Natural language search query (e.g. "Find CTOs at SaaS companies in San Francisco") |
| `filters` | JSON | no |  | Filters. Structured search filters as JSON (alternative or complement to prompt). Either prompt or filters must be provided. |
| `limit` | number | no | `25` | Limit. Maximum number of results per page (1-100, default 25) |
| `mode` | string | no |  | Mode. Search execution mode. "auto" classifies the query. Use "lookup" for direct matches, "simple" for firmographic queries, and "complex" for multi-step queries. One of `"auto"`, `"lookup"`, `"simple"`, `"complex"`. |
| `scope` | string | no |  | Scope. "network" searches your connections first, "global" searches everyone, "specific_list" restricts to caller-provided identifiers (requires specific_list_data). One of `"network"`, `"global"`, `"specific_list"`. |
| `cursor` | string | no |  | Cursor. Pagination cursor (encoded string from a previous response) |
| `network_filters` | JSON | no |  | Network Filters. Network filtering options as JSON. |
| `include_counts` | string | no |  | Include Counts. Inline count scopes to compute on the first page only. Ignored when cursor is provided and adds latency. One of `"global"`, `"network"`, `"all"`. |
| `specific_list_data` | JSON | no |  | Specific List Data. Required when scope="specific_list". Caller-supplied candidate set (1..50,000 entries). Each entry is a bare LinkedIn identifier or { id, score? }. |

### `sort_people`

**Sort People.** Read-only ranking of a caller-supplied set of people (LinkedIn profile URLs) by how strongly you are connected to each, ordered strongest-first. Use when you already have specific candidates and want them prioritized; to discover candidates use Search People. Pure query, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `people` | array | yes | `[]` | People. Array of LinkedIn person profile URLs (e.g. https://linkedin.com/in/johndoe). At least one is required. |

### `join_team`

**Join Team.** Add the authenticated user to a team using an invite-link code (the segment after /join/ in the share URL). Use when you have an invite code rather than wanting to create a team. Not idempotent in effect, though re-joining a team the user already belongs to is harmless. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_invite_link` | string | yes |  | Team Invite Link. The invite link code shared by a team admin (e.g. the part after /join/ in the invite URL) |

### `leave_team`

**Leave Team.** Remove the authenticated user from a team by team ID. Not idempotent: leaving the same team again fails since membership is already gone, and leaving as the last member of a non-paid team deletes the team. Admins of paid teams cannot leave this way. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | yes |  | Team ID. ID of the team to leave. |

### `list_teams`

**List Teams.** List every team the authenticated user belongs to, including each team ID and the admin-status flag. Read-only and idempotent. Use to discover team IDs before joining, leaving, or updating a team. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `upsert_team`

**Create or Update Team.** Create a team, or update an existing one when a team with the same name already exists since the team ID is derived from the name. Idempotent by stable name: repeating the same name and fields converges to one team rather than creating duplicates (updating requires admin permission on that team). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Team name (max 100 characters) |
| `logo` | string | no |  | Logo. URL to the team logo image. |

### `get_current_user`

**Get Current User.** Fetch the authenticated user's own profile, including their ID and a sync-completion flag. Read-only and idempotent. Use to confirm the token is valid and to check whether the user's network data has finished syncing before relying on graph queries. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `import_relationships`

**Import Relationships.** Import up to 1000 manual relationships into the network graph, each identified by email or LinkedIn URL with an optional 0-10 strength score and relationship type. Effectively idempotent per person: re-importing the same identifier updates that relationship rather than duplicating it. Use to add people known offline who would not surface from a synced integration. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `people` | array | yes | `[]` | People. Up to 1000 people to import. Each row: identifier (email or LinkedIn URL), optional score (0-10), optional relationship type. Each item: { `identifier`, `score`?, `user_relationship_type`? }. |
| `min_score` | number | no |  | Default Score. Default score (0-10) applied to rows without an explicit score. |
