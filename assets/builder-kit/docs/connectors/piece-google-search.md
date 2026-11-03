# Google Search

Search using Vertex AI Search (Discovery Engine)

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-search'
  version: '0.0.9'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these steps to obtain your Google Cloud API Key:
>
> 1. Go to [Google Cloud Console](https://console.cloud.google.com/).
> 2. Create or select a project.
> 3. Navigate to **APIs & Services** > **Enabled APIs & services**.
> 4. Click **+ ENABLE APIS AND SERVICES** and enable **Vertex AI Search** (Discovery Engine API).
> 5. Go to **APIs & Services** > **Credentials**.
> 6. Click **Create Credentials** > **API key**.
> 7. Copy the API key and paste it below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Your Google Cloud API key with Vertex AI Search access. |
| `projectId` | string | yes |  | Project ID. Your Google Cloud project ID. |
| `appId` | string | yes |  | App ID. The Vertex AI Search app (engine) ID. |

## Actions

### `search`

**Search.** Runs a query against a Google Cloud Vertex AI Search (Discovery Engine) app and returns matching results from that app's indexed data store. Choose this to search a private/enterprise corpus configured in Discovery Engine — not the public Google web. Requires the query text plus the connection's project, app, and API key; an optional user pseudo ID can be passed to improve personalization. Read-only and idempotent — the same query returns the same results without side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The query text to search. |
| `userPseudoId` | string | no |  | User Pseudo ID. A pseudonymized identifier for the user (max 128 chars). Improves personalization. |
