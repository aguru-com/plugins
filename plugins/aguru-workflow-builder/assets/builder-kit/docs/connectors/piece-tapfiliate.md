# Tapfiliate

Affiliate tracking and conversion management platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tapfiliate'
  version: '0.2.0'
```

Categories: MARKETING, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API key:
>
> 1. Log in to your Tapfiliate account.
> 2. Open your account settings.
> 3. Find the API key section.
> 4. Copy the API key and paste it here.

## Actions

### `create_affiliate`

**Create Affiliate.** Registers a new affiliate account in Tapfiliate from a name, email, and password, with optional company and address details. Use it to onboard a partner into the program. Not idempotent: each call creates a new affiliate, and a duplicate email will be rejected by Tapfiliate. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstname` | string | yes |  | First Name. |
| `lastname` | string | yes |  | Last Name. |
| `email` | string | yes |  | Email. |
| `password` | string | yes |  | Password. Password for the new affiliate account. |
| `companyName` | string | no |  | Company Name. |
| `companyDescription` | string | no |  | Company Description. |
| `addressLine1` | string | no |  | Address Line 1. |
| `addressLine2` | string | no |  | Address Line 2. |
| `postalCode` | string | no |  | Postal Code. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State. |
| `countryCode` | string | no |  | Country Code. ISO 3166-1 alpha-2 code, e.g. US or NL. |
| `customFields` | JSON | no |  | Custom Fields. |

### `get_affiliate`

**Get Affiliate.** Fetches a single Tapfiliate affiliate by its unique affiliate ID. Use it to look up an affiliate's details when you already have its ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `affiliateId` | string | yes |  | Affiliate ID. The unique Tapfiliate affiliate ID. Find it on the affiliate detail page in your Tapfiliate dashboard. |

### `list_affiliates`

**List Affiliates.** Lists affiliates in the Tapfiliate account, paginating through all results. With no filters it returns every affiliate; supplying any of email, referral code, click ID, source ID, parent affiliate ID, or affiliate group ID narrows to matching records. Use it to discover affiliates or resolve an affiliate ID from an email. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clickId` | string | no |  | Click ID. |
| `sourceId` | string | no |  | Source ID. |
| `email` | string | no |  | Email. |
| `referralCode` | string | no |  | Referral Code. |
| `parentId` | string | no |  | Parent Affiliate ID. |
| `affiliateGroupId` | string | no |  | Affiliate Group ID. |

### `create_conversion`

**Create Conversion.** Records a conversion (e.g. a sale or signup) in Tapfiliate so the responsible affiliate earns commission. Requires an amount plus at least one attribution key — Customer ID, Referral Code, Tracking ID, Click ID, Coupon, or Asset ID together with Source ID — or the call is rejected. Not idempotent: each call appends a new conversion, so guard against duplicate sends. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `referralCode` | string | no |  | Referral Code. The affiliate's referral code used to attribute this conversion. |
| `trackingId` | string | no |  | Tracking ID. The Tapfiliate tracking ID stored in the affiliate click cookie. |
| `clickId` | string | no |  | Click ID. The Tapfiliate click ID from the affiliate referral link. |
| `coupon` | string | no |  | Coupon. A coupon code linked to an affiliate to attribute this conversion. |
| `currency` | string | no |  | Currency. Three-letter ISO currency code such as USD or EUR. |
| `assetId` | string | no |  | Asset ID. The Tapfiliate asset ID. Must be provided together with Source ID. |
| `sourceId` | string | no |  | Source ID. The Tapfiliate source ID. Must be provided together with Asset ID. |
| `externalId` | string | no |  | External ID. Your own unique identifier for this conversion, such as an order number. |
| `amount` | number | yes |  | Amount. Conversion amount used to calculate commissions. |
| `customerId` | string | no |  | Customer ID. Your customer identifier to attribute this conversion to the matching affiliate. |
| `overrideMaxCookieTime` | boolean | no | `false` | Override Max Cookie Time. Override the maximum cookie time for this conversion. |
| `userAgent` | string | no |  | User Agent. |
| `ip` | string | no |  | IP Address. |
| `metaData` | JSON | no |  | Meta Data. |

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
