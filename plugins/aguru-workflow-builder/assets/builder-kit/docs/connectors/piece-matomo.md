# Matomo

Open source alternative to Google Analytics

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-matomo'
  version: '0.2.2'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Authenticate with Matomo.
>
> Your Matomo domain is the URL of your Matomo account, e.g. https://matomo.example.com
>
> Your Token Auth key can be found in your Matomo account under Settings > API.
>
> Your Site ID can be found in your Matomo account under Administration > Websites.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Matomo Domain. The domain of your Matomo account: https://matomo.example.com. |
| `tokenAuth` | string | yes |  | Token Auth. The Token Auth key from your Matomo account. |
| `siteId` | string | yes |  | Site ID. The site ID that will be associated to this connection. Site IDs can be found on the main Websites page. |

## Actions

### `add_annotation`

**Add Annotation.** Creates a dated annotation (a note marking an event) on the configured Matomo site, optionally starred. Use to flag a date in analytics reports, e.g. tagging a deployment or campaign launch. Requires the note text and a date in YYYY-MM-DD format. Not idempotent: each call adds a new annotation, even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note` | string | yes |  | Note. The note to add. |
| `date` | ISO date-time string | yes |  | Date. The date to add the note to. Format: YYYY-MM-DD. |
| `starred` | boolean | yes |  | Starred. Whether or not the note should be starred. |

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
