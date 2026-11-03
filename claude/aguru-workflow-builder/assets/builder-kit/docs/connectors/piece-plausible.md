# Plausible Analytics

Privacy-friendly website analytics

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-plausible'
  version: '0.2.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your Plausible Analytics account
> 2. Click your account name in the top-right menu and go to **Settings**
> 3. Go to **API Keys** in the left sidebar
> 4. Click **New API Key**, choose **Stats API** or **Sites API**, and save the key

## Actions

### `get_realtime_visitors`

**Get Realtime Visitors.** Fetches the count of visitors active on a Plausible-tracked site in real time. Use to check current live traffic on a specific site (chosen by domain). Read-only; safe to call repeatedly. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |

### `get_aggregate_stats`

**Get Aggregate Stats.** Returns aggregated analytics metrics (such as visitors, pageviews, bounce rate, or visit duration) for a site over a preset time period like the last 7 or 30 days. Use for high-level totals across a window rather than per-dimension breakdowns. Requires a site and at least one metric; read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes |  | Period. One of `"day"`, `"7d"`, `"30d"`, `"month"`, `"6mo"`, `"12mo"`. |
| `metrics` | array | yes |  | Metrics. One of `"visitors"`, `"pageviews"`, `"bounce_rate"`, `"visit_duration"`, `"views_per_visit"`. |

### `get_breakdown`

**Get Traffic Breakdown.** Breaks down a site's visitor stats by a single chosen dimension (page, source, country, browser, OS, or device) over a preset time period, returning the top entries up to an optional limit. Use to see which pages, sources, or segments drive traffic rather than overall totals. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes |  | Period. One of `"day"`, `"7d"`, `"30d"`, `"month"`, `"6mo"`, `"12mo"`. |
| `property` | string | yes |  | Breakdown By. One of `"event:page"`, `"visit:source"`, `"visit:country"`, `"visit:browser"`, `"visit:os"`, `"visit:device"`. |
| `limit` | number | no | `10` | Limit. |

### `list_sites`

**List Sites.** Lists all sites the authenticated Plausible account can access, each with its domain and timezone. Use to discover available site identifiers (domains) before calling actions that require a specific site. Takes no input; read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_site`

**Get Site.** Fetches the configuration details of a single Plausible site, including its tracker script settings. Use to inspect one site identified by its domain; for enumerating sites use List Sites instead. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |

### `create_site`

**Create Site.** Creates a new site in the Plausible account, optionally setting timezone, owning team, and tracker options like 404 tracking, hash-based routing, outbound-link, file-download, and form-submission tracking. Use when registering a new domain for analytics. The domain must be globally unique; not idempotent, as a repeat call with the same domain fails or creates a duplicate. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Domain of the site (must be globally unique) |
| `timezone` | string | no |  | Timezone. Timezone name according to IANA database (e.g., Europe/London). Defaults to Etc/UTC. |
| `team_id` | string | no |  | Team. Select a team. A value the product loads from the provider, such as an id; write the value itself. |
| `track_404_pages` | boolean | no | `false` | Track 404 Pages. Enable tracking of 404 error pages. |
| `hash_based_routing` | boolean | no | `false` | Hash-Based Routing. Enable hash-based routing for single-page applications. |
| `outbound_links` | boolean | no | `false` | Outbound Links. Track clicks on outbound links. |
| `file_downloads` | boolean | no | `false` | File Downloads. Track file downloads. |
| `form_submissions` | boolean | no | `false` | Form Submissions. Track form submissions. |

### `update_site`

**Update Site.** Updates an existing site identified by its domain, optionally renaming the domain and toggling tracker options such as 404 tracking, hash-based routing, outbound-link, file-download, and form-submission tracking; only the fields you provide are changed. Use to modify an already-registered site. Idempotent, since applying the same values yields the same resulting configuration. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `new_domain` | string | no |  | New Domain. New domain name for the site (leave empty to keep current) |
| `track_404_pages` | boolean | no |  | Track 404 Pages. Enable tracking of 404 error pages. |
| `hash_based_routing` | boolean | no |  | Hash-Based Routing. Enable hash-based routing for single-page applications. |
| `outbound_links` | boolean | no |  | Outbound Links. Track clicks on outbound links. |
| `file_downloads` | boolean | no |  | File Downloads. Track file downloads. |
| `form_submissions` | boolean | no |  | Form Submissions. Track form submissions. |

### `delete_site`

**Delete Site.** Permanently deletes a site (identified by its domain) and all of its analytics data from the Plausible account; the removal may take up to 48 hours to finalize. Use only when a site should be fully and irreversibly removed. Idempotent in effect, since the target ends up deleted regardless of repeats. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |

### `create_shared_link`

**Create Shared Link.** Returns a public shared dashboard link for a site, creating one with the given name if it does not already exist (find-or-create). Use to obtain a shareable analytics URL for a specific site and link name. Idempotent, as repeating with the same site and name returns the existing link rather than duplicating it. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Link Name. Name of the shared link (e.g., Wordpress) |

### `list_goals`

**List Goals.** Lists the conversion goals configured for a site, including each goal's id, type, and display name. Use to discover existing goals or obtain a goal id before deleting one. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |

### `create_goal`

**Create Goal.** Returns a conversion goal for a site, creating it if it does not already exist (find-or-create). Supports two goal types: an event goal (matched by event name) or a page goal (matched by page path, which may use wildcards); supply the field matching the chosen type. Idempotent, as repeating with the same definition returns the existing goal rather than duplicating it. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `goal_type` | string | yes |  | Goal Type. Type of goal to create. One of `"event"`, `"page"`. |
| `event_name` | string | no |  | Event Name. Name of the event (required if goal type is Event) |
| `page_path` | string | no |  | Page Path. Page path to track (required if goal type is Page). Supports wildcards. |
| `display_name` | string | no |  | Display Name. Custom display name for the goal in the dashboard. |

### `delete_goal`

**Delete Goal.** Deletes a conversion goal from a site, identified by the site and the goal id. Use List Goals first to obtain the goal id. Idempotent in effect, since the goal ends up removed regardless of repeats. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `goal_id` | string | yes |  | Goal. Select a goal. A value the product loads from the provider, such as an id; write the value itself. |

### `list_custom_properties`

**List Custom Properties.** Lists the custom event properties configured for a site. Use to discover which custom properties exist before creating or deleting one. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |

### `create_custom_property`

**Create Custom Property.** Registers a custom event property by name for a site so it can be tracked. Use to enable a new custom dimension on a specific site. Idempotent, as adding the same property name again leaves the site with that property present. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `property` | string | yes |  | Property Name. Name of the custom property. |

### `delete_custom_property`

**Delete Custom Property.** Removes a custom event property from a site, identified by the site and the property name. Use to stop tracking a custom dimension. Idempotent in effect, since the property ends up removed regardless of repeats. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `property` | string | yes |  | Custom Property. Select a custom property. A value the product loads from the provider, such as an id; write the value itself. |

### `list_guests`

**List Guests.** Lists the guest users and pending invitations for a site, with each guest's email, role, and status. Use to audit who has access or to find a guest email before removing access. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |

### `invite_guest`

**Invite Guest.** Grants a guest access to a site at a chosen role (viewer or editor) by email, or returns the existing invitation if one is already present (find-or-create). Use to share a site with another user. Idempotent, as re-inviting the same email returns the existing invitation rather than sending a duplicate. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. Guest's email address. |
| `role` | string | yes |  | Role. Role to assign to the guest. One of `"viewer"`, `"editor"`. |

### `remove_guest`

**Remove Guest.** Revokes a guest's access to a site (or cancels a pending invitation), identified by the site and the guest email. Use to remove someone's access. Idempotent in effect, since the guest ends up without access regardless of repeats. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. Select a site. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Guest. Select a guest. A value the product loads from the provider, such as an id; write the value itself. |

### `list_teams`

**List Teams.** Lists the teams the authenticated Plausible account can access, with each team's id and name. Use to discover a team id before creating a site under a specific team. Takes no input; read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

No inputs.

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
