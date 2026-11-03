# Strale

Trust layer for AI agents. 271 quality-scored API capabilities: company verification across 27 countries, sanctions screening, IBAN/VAT validation, web intelligence, and more. Every result includes a quality score and audit trail.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-strale'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Strale API key (starts with sk_live_). Get one free at https://strale.dev/signup — includes 2.00 EUR trial credits. Some actions (Search, Trust Profile) work without a key.

## Actions

### `search_capabilities`

**Search Capabilities.** Discover Strale API capabilities (company verification, sanctions screening, IBAN/VAT validation, web intelligence, etc.) by keyword or natural-language query, optionally narrowed to a single category. Use this first to find the slug to feed into Execute Capability. Read-only and idempotent; requires a search query. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Keyword or natural language description (e.g. "validate IBAN", "company data Sweden", "sanctions check") |
| `category` | string | no |  | Category. Filter results by category. One of `""`, `"compliance"`, `"company-data"`, `"financial"`, `"validation"`, `"web-intelligence"`, `"developer-tools"`, `"security"`, `"web3"`, `"data-processing"`. |

### `execute_capability`

**Execute Capability.** Run any Strale capability by slug, passing its required input fields (e.g. an IBAN to validate or a company to verify) and an optional spend cap. Choose this to actually perform a verification, validation, lookup, or data extraction after finding the slug via Search Capabilities. Not idempotent: each call executes the capability and may consume wallet balance; some capabilities are free while paid ones require an API key with sufficient funds. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `slug` | string | yes |  | Capability Slug. The slug of the capability to run (e.g. "iban-validate", "sanctions-check"). Use Search to find slugs. |
| `inputs` | JSON | yes | `{}` | Input Parameters. Input object matching the capability required fields (e.g. {"iban": "DE89370400440532013000"}) |
| `max_price_cents` | number | no | `200` | Max Price (EUR cents). Maximum price in EUR cents. Default: 200 (2.00 EUR). |

### `check_balance`

**Check Balance.** Look up the current Strale wallet balance (EUR cents plus a formatted EUR string). Use this to check available funds before running paid capabilities via Execute Capability. Read-only and idempotent; takes no input but requires an API key. Needs authentication.

Kind: safe to repeat.

No inputs.

### `trust_profile`

**Trust Profile.** Fetch the trust profile for a Strale slug — quality score (0-100), quality and reliability grades (A-F), and execution guidance. Set the type to look up either an individual capability or a bundled solution. Use this to gauge reliability before depending on a capability for high-stakes decisions. Read-only and idempotent; requires the target slug. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `slug` | string | yes |  | Capability Slug. The slug of the capability to check (e.g. "sanctions-check", "iban-validate") |
| `type` | string | no | `"capability"` | Type. Whether this is a capability or a bundled solution. One of `"capability"`, `"solution"`. |

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
