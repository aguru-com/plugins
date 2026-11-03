# Proxycurl

Enrich LinkedIn people and company profiles with Proxycurl.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-proxycurl'
  version: '0.1.4'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Proxycurl API Key

> To use Proxycurl:
> 1. Sign in to your Proxycurl account at https://nubela.co/proxycurl.
> 2. Open your dashboard and copy your API key.
> 3. Paste the API key here.
>
> Authentication note:
> - Proxycurl's public SDK/docs show Bearer token authorization for API requests.

## Actions

### `get_person_profile`

**Get Person Profile.** Enrich a single individual by fetching their LinkedIn person profile from Proxycurl. Choose this when you already have a person's public LinkedIn profile URL and need their structured profile data; for finding people without a known URL use Search People instead. Requires the public LinkedIn profile URL (e.g. https://www.linkedin.com/in/williamhgates). Read-only lookup, safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkedin_profile_url` | string | yes |  | LinkedIn Profile URL. Public LinkedIn profile URL, for example https://www.linkedin.com/in/williamhgates. |

### `get_company_profile`

**Get Company Profile.** Enrich a company by fetching its LinkedIn company profile from Proxycurl. Choose this when you have a company's LinkedIn URL and need its structured firmographic data. Requires the LinkedIn company URL (e.g. https://www.linkedin.com/company/apple/). Read-only lookup, safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | LinkedIn Company URL. LinkedIn company URL, for example https://www.linkedin.com/company/apple/. |

### `search_people`

**Search People.** Find people via Proxycurl using keyword filters (country, headline keywords, summary keywords) when you do not already have a specific LinkedIn profile URL; to enrich a known URL use Get Person Profile instead. At least one filter must be provided or the call fails. Read-only search, safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `country` | string | no |  | Country. Optional country filter, for example us, gb, or sg. |
| `headline` | string | no |  | Headline Keywords. Optional keywords expected in the person headline. |
| `summary_keywords` | string | no |  | Summary Keywords. Optional keywords expected in the summary/about section. |

### `lookup_person_email`

**Lookup Person Email.** Resolve the work email address for a person from their LinkedIn profile URL via Proxycurl. Choose this when you have a profile URL and specifically need a contact email rather than the full profile. Requires the public LinkedIn profile URL; an optional callback URL receives an async completion webhook. Read-only lookup, safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkedin_profile_url` | string | yes |  | LinkedIn Profile URL. Public LinkedIn profile URL to enrich. |
| `callback_url` | string | no |  | Callback URL. Optional webhook URL for async completion callbacks from Proxycurl. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to any Proxycurl endpoint.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes |  | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | yes |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | yes |  | Query Parameters. |
| `body_type` | string | no | `"none"` | Body Type. One of `"none"`, `"json"`, `"form_data"`, `"raw"`. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary ?. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | No Error on Failure. |
| `timeout` | number | no |  | Timeout (in seconds). |
| `followRedirects` | boolean | no | `false` | Follow redirects. |
