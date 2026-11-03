# Influencers.club

Connect to Influencers.club to enrich and find influencers for your marketing campaigns.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-influencers-club'
  version: '0.1.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Influencers Club API Key

> API Key for Influencers Club

## Actions

### `enrichCreatorByEmail`

**Enrich Creator by Email.** Look up and enrich a creator/influencer profile from a known email address, returning their connected social accounts and profile stats. Choose this when you have an email and want the matching creator data; use the by-handle action instead when you only have a social handle. Optionally filter results by minimum follower count or exclude specific platforms. This is a read-only lookup and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the creator to enrich. |
| `exclude_platforms` | array | no |  | Exclude Platforms. Platforms to exclude from enrichment (optional) One of `"instagram"`, `"tiktok"`, `"youtube"`, `"twitter"`, `"twitch"`, `"onlyfans"`, `"linkedin"`, `"facebook"`, `"snapchat"`, `"reddit"`, `"pinterest"`, `"discord"`. |
| `min_followers` | number | no | `1000` | Minimum Followers. Minimum follower count filter (default: 1000) |

### `enrichCreatorByHandle`

**Enrich Creator Social Profile by Handle.** Look up and enrich a creator/influencer profile from a social media handle plus the platform it belongs to (Instagram, TikTok, YouTube, Twitter/X, Twitch, or OnlyFans), returning their connected platforms and detailed stats. Choose this when you have a handle rather than an email; use the by-email action when you only have an email. The platform is required, and you can require a valid email be present (must_have) or accept partial data (preferred). This is a read-only lookup and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `handle` | string | yes |  | Handle. The social media handle of the creator. |
| `platform` | string | yes |  | Platform. The social media platform for the handle. One of `"instagram"`, `"tiktok"`, `"youtube"`, `"twitter"`, `"twitch"`, `"onlyfans"`. |
| `include_lookalikes` | boolean | no | `true` | Include Lookalikes. Include similar creators for faster discovery (30-40% quicker). Default: true. |
| `email_required` | string | no | `"preferred"` | Email Requirement. Controls how to handle email availability. One of `"preferred"`, `"must_have"`. |

### `findSimilarCreator`

**Find Similar Creator.** Discover creators/influencers similar to a seed creator on a given platform, identifying that seed by URL, username, or platform user ID (set via the filter key). Choose this for lookalike discovery once you have a reference creator. Optionally narrow results by follower-count range, engagement-rate range, verified-only, or excluding private profiles, and cap the result count (1-50). This is a read-only search and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `platform` | string | yes |  | Platform. The social media platform. One of `"instagram"`, `"tiktok"`, `"youtube"`, `"twitch"`, `"twitter"`, `"onlyfans"`. |
| `filter_key` | string | yes |  | Filter Key. The type of identifier for the creator. One of `"url"`, `"username"`, `"id"`. |
| `filter_value` | string | yes |  | Filter Value. Platform URL, profile handle, or user ID. |
| `limit` | number | no | `10` | Results Limit. Maximum number of similar creators to return (min: 1, max: 50) |
| `number_of_followers` | object | no |  | Follower Count Range. Filter by follower count (min and max) |
| `engagement_percent` | object | no |  | Engagement Percentage Range. Filter by engagement rate (min and max) |
| `is_verified` | boolean | no |  | Verified Only. Only return verified creators. |
| `exclude_private_profile` | boolean | no |  | Exclude Private Profiles. Exclude creators with private profiles. |

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
