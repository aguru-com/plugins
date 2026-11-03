# Netlify

Netlify is a platform for building and deploying websites and apps.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-netlify'
  version: '0.1.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To authenticate with Netlify:
>
> 1. Go to your Netlify user settings
> 2. Navigate to "Applications" → "OAuth applications"
> 3. Click "New OAuth application"
> 4. Add https://cloud.activepieces.com/redirect to authorized redirect URIs
> 5. Copy the Client ID and Client Secret
> 6. Use the OAuth2 flow below
>
> **Note:** If your team uses SAML SSO, you must grant access to the team when generating your token.

## Actions

### `start_deploy`

**Start Deploy.** Triggers a new build/deploy for a Netlify site, identified by its site ID. Optionally clears the build cache before building. Not idempotent: each call queues a fresh deploy, so calling repeatedly starts multiple builds. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. Select the site to deploy. A value the product loads from the provider, such as an id; write the value itself. |
| `clearCache` | boolean | no | `false` | Clear Build Cache. Whether to clear the build cache before building. |

### `get_site`

**Get Site.** Retrieves the configuration and metadata for a single Netlify site by its site ID. Use it to look up details such as the site URL, build settings, or deploy info. Read-only and idempotent. Note: site environment variables are no longer included here and must be fetched from the dedicated env-vars endpoint. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. Select the site to retrieve information for. A value the product loads from the provider, such as an id; write the value itself. |

### `list_site_deploys`

**List Site Deploys.** Lists the deploys (builds) for a Netlify site by its site ID, ordered most-recent first, with optional page and per-page pagination. Use it to inspect deploy history or find a deploy state/ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. Select the site to list deploys for. A value the product loads from the provider, such as an id; write the value itself. |
| `page` | number | no | `1` | Page. Page number for pagination (starts from 1) |
| `perPage` | number | no | `100` | Per Page. Number of items per page (max 100) |

### `list_files`

**List Files.** Lists all files in the current (published) deploy of a Netlify site, identified by its site ID. Use it to inspect which files are served for the live site. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteId` | string | yes |  | Site. Select the site to list files for. A value the product loads from the provider, such as an id; write the value itself. |
