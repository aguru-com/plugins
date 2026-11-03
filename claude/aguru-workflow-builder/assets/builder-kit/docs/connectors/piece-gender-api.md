# Gender API

Predict the gender of a person based on their name using Gender-api service.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gender-api'
  version: '0.1.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> The API key for accessing the Gender-api service

## Actions

### `getGenderByFirstName`

**Get Gender by First Name.** Predicts the likely gender of a person from a single first name via the Gender API. Use when you have only a given name (not a full name); optionally pass a country code and/or locale to improve accuracy for region-specific names. Read-only lookup that is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | yes |  | First Name. The first name to query. |
| `country_code` | string | no |  | Country Code. ISO 3166-1 alpha-2 country code to improve accuracy (e.g., "US", "DE") |
| `locale` | string | no |  | Locale. Browser locale for localization (e.g., "en-US", "de-DE") |

### `getGenderByFullName`

**Get Gender by Full Name.** Predicts the likely gender of a person from a full name (first and last) via the Gender API, which extracts the first name internally. Use when you have the complete name rather than only a given name; optionally pass a country code and/or locale to improve accuracy for region-specific names. Read-only lookup that is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `full_name` | string | yes |  | Full Name. The full name (first and last name) to query. |
| `country_code` | string | no |  | Country Code. ISO 3166-1 alpha-2 country code to improve accuracy (e.g., "US", "DE") |
| `locale` | string | no |  | Locale. Browser locale for localization (e.g., "en-US", "de-DE") |

### `getStatistics`

**Get Statistics.** Retrieves the Gender API account statistics, including remaining credits and usage information. Use to check quota before running batches of name lookups. Takes no input; read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

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
