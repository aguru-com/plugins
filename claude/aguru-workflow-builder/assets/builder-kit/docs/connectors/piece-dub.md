# Dub

Dub is the modern link attribution platform for creating, managing, and analysing short links, tracking conversions, and running affiliate programmes.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dub'
  version: '0.1.2'
```

Categories: MARKETING, DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your Dub API key:
> 1. Go to [https://app.dub.co/settings/tokens](https://app.dub.co/settings/tokens)
> 2. Click **Create API Key**
> 3. Give your key a name and select the required scopes
> 4. Copy the key — it starts with `dub_` (e.g. `dub_xxxxxxxxxxxxxxxx`)
> 5. Paste it here
>
> > **Required scopes:** `links.read`, `links.write`, `webhooks.write` (for triggers)

## Actions

### `create_link`

**Create Link.** Creates a new Dub short link for a destination URL, optionally with a custom domain, slug, tags, UTM parameters, expiration, password protection, and device-specific redirects. Use when an agent needs to generate a trackable short link. Not idempotent: each call creates a separate link, and if no slug is supplied a new random one is generated, so repeating the call yields duplicate links. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Destination URL. The full destination URL the short link should redirect to. |
| `domain` | string | no |  | Domain. The domain to use for the short link (e.g. `dub.sh`). If omitted, the primary workspace domain is used. |
| `key` | string | no |  | Short Link Slug. Custom slug for the short link (e.g. `my-promo`). If omitted, a random 7-character slug is generated. |
| `externalId` | string | no |  | External ID. Your internal database ID for this link. Must be unique per workspace. Useful for looking up the link later. |
| `title` | string | no |  | Title. A human-readable title for the link (used in the Dub dashboard). |
| `description` | string | no |  | Description. A short description of what the link points to. |
| `image` | string | no |  | OG Image URL. Custom link preview image (og:image). Used when Custom Link Previews (`proxy`) is enabled. |
| `video` | string | no |  | OG Video URL. Custom link preview video (og:video). Used when Custom Link Previews (`proxy`) is enabled. |
| `tags` | array | no |  | Tag Names. List of tag names to attach to this link. |
| `folderId` | string | no |  | Folder ID. The unique ID of an existing folder to assign this link to. |
| `expiresAt` | string | no |  | Expires At. ISO 8601 datetime when the link should expire (e.g. `2025-12-31T23:59:59Z`). Expired links redirect to the expiration URL. |
| `expiredUrl` | string | no |  | Expired URL. URL to redirect to after the link expires. |
| `password` | string | no |  | Password. Password-protect the link. Visitors must enter this password before being redirected. |
| `trackConversion` | boolean | no | `false` | Track Conversions. Whether to track conversions for this link. |
| `proxy` | boolean | no | `false` | Custom Link Previews. Enable Custom Link Previews (og:title, og:description, og:image) for this link. |
| `rewrite` | boolean | no | `false` | Cloaked URL (URL Rewriting). Cloak the destination URL — visitors see the short link URL in the browser. |
| `doIndex` | boolean | no | `false` | Allow Search Engine Indexing. Allow search engines to index this short link. |
| `archived` | boolean | no | `false` | Archived. Archive this link immediately after creation. |
| `ios` | string | no |  | iOS Redirect URL. Redirect iOS device visitors to this URL instead. |
| `android` | string | no |  | Android Redirect URL. Redirect Android device visitors to this URL instead. |
| `comments` | string | no |  | Comments. Internal notes about this link (not shown to visitors). |
| `utm_source` | string | no |  | UTM Source. UTM source parameter (e.g. `newsletter`, `twitter`). |
| `utm_medium` | string | no |  | UTM Medium. UTM medium parameter (e.g. `email`, `social`). |
| `utm_campaign` | string | no |  | UTM Campaign. UTM campaign parameter (e.g. `spring-sale`). |
| `utm_term` | string | no |  | UTM Term. UTM term parameter for paid search keywords. |
| `utm_content` | string | no |  | UTM Content. UTM content parameter for A/B testing. |

### `get_link`

**Get Link.** Fetches the full details of a single existing Dub link. Choose the lookup mode: by Dub link ID, by your own external ID (prefixed with ext_), or by domain + slug key. Use when an agent has a known identifier and needs the current link record. Idempotent read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookupMethod` | string | yes | `"linkId"` | Look Up By. How to identify the link you want to retrieve. One of `"linkId"`, `"externalId"`, `"domainKey"`. |
| `linkId` | string | no |  | Link ID. The Dub-generated link ID (e.g. `clv3g2...`). Used when Look Up By = Link ID. |
| `externalId` | string | no |  | External ID. Your internal ID for the link. Pass with prefix `ext_` (e.g. `ext_123456`). Used when Look Up By = External ID. |
| `domain` | string | no |  | Domain. The domain of the link (e.g. `dub.sh`). Used when Look Up By = Domain + Key. |
| `key` | string | no |  | Key (Slug). The slug of the link (e.g. `my-promo`). Used when Look Up By = Domain + Key. |

### `list_links`

**List Links.** Lists short links in the Dub workspace, with optional filters by domain, tag names, user, archived status, and a free-text search over URL/title/slug; leave filters empty to return all links. Use when an agent needs to discover links or find a link ID without already knowing an identifier. Supports pagination and sorting. Idempotent read-only query. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | no |  | Domain Filter. Filter by a specific domain (e.g. `dub.sh`). Leave empty to return all domains. |
| `tagNames` | array | no |  | Tag Name Filter. Filter by one or more tag names. |
| `search` | string | no |  | Search Query. Search links by their URL, title, or slug. |
| `userId` | string | no |  | User ID Filter. Filter links created by a specific user ID. |
| `showArchived` | boolean | no | `false` | Include Archived Links. Whether to include archived links in the results. |
| `page` | number | no | `1` | Page. Page number for pagination (starts at 1). |
| `pageSize` | number | no | `100` | Page Size. Number of links to return per page (1–100). Default is 100. |
| `sort` | string | no | `"createdAt"` | Sort By. Field to sort results by. One of `"createdAt"`, `"clicks"`, `"lastClicked"`. |

### `update_link`

**Update Link.** Updates an existing Dub link identified by its link ID, applying only the fields supplied (destination URL, slug, tags, UTM parameters, expiration, password, device redirects, archived state, etc.). Use when an agent needs to modify a known link rather than create one. Requires the link ID and at least one field to change. Idempotent: applying the same field values repeatedly leaves the link in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. The ID of the link to update (e.g. `clv3g2...`). Find this from the Create Link or List Links actions. |
| `url` | string | no |  | New Destination URL. Update the destination URL the link redirects to. |
| `key` | string | no |  | New Slug. Update the short link slug (the part after the domain). |
| `title` | string | no |  | Title. Update the human-readable title. |
| `description` | string | no |  | Description. Update the link description. |
| `image` | string | no |  | OG Image URL. Update the custom link preview image (og:image). |
| `video` | string | no |  | OG Video URL. Update the custom link preview video (og:video). |
| `tags` | array | no |  | Tag Names. Replace the link's tags with this new list of tag names. Send an empty array to clear all tags. |
| `folderId` | string | no |  | Folder ID. Move this link to a different folder by its ID. |
| `expiresAt` | string | no |  | Expires At. ISO 8601 datetime when the link should expire. Set to empty to remove expiration. |
| `expiredUrl` | string | no |  | Expired URL. URL to redirect to after expiration. |
| `password` | string | no |  | Password. Update the password for this link. Leave blank to remove password protection. |
| `trackConversion` | boolean | no |  | Track Conversions. Whether to track conversions for this link. |
| `proxy` | boolean | no |  | Custom Link Previews. Enable or disable Custom Link Previews (og:title, og:description, og:image) for this link. |
| `rewrite` | boolean | no |  | Cloaked URL (URL Rewriting). Toggle URL cloaking. |
| `doIndex` | boolean | no |  | Allow Search Engine Indexing. Allow search engines to index this short link. |
| `archived` | boolean | no |  | Archived. Archive or unarchive the link. |
| `ios` | string | no |  | iOS Redirect URL. Update the iOS-specific redirect URL. |
| `android` | string | no |  | Android Redirect URL. Update the Android-specific redirect URL. |
| `comments` | string | no |  | Comments. Update internal notes for this link. |
| `utm_source` | string | no |  | UTM Source. Update the UTM source parameter. |
| `utm_medium` | string | no |  | UTM Medium. Update the UTM medium parameter. |
| `utm_campaign` | string | no |  | UTM Campaign. Update the UTM campaign parameter. |
| `utm_term` | string | no |  | UTM Term. Update the UTM term parameter. |
| `utm_content` | string | no |  | UTM Content. Update the UTM content parameter. |

### `delete_link`

**Delete Link.** Permanently deletes a Dub link by its link ID; this is destructive and cannot be undone. Use only when an agent is certain the link should be removed. Idempotent on end state — once deleted the link stays gone — but a repeat call targets an already-removed link. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkId` | string | yes |  | Link ID. The ID of the link to delete (e.g. `clv3g2...`). Find this from the Create Link or List Links actions. |

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
