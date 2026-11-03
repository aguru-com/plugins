# Greip

Detect and prevent fraud in your website or app with Greip's Fraud Prevention API. Protect your business from financial losses and gain better insights into your users.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-greip'
  version: '0.1.8'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API Key:
>
> 1. Go to your Greip account dashboard
> 2. Navigate to API settings
> 3. Copy your API key
> 4. Paste it here

## Actions

### `asn_lookup`

**ASN Lookup.** Look up registration and network details for an Autonomous System Number (ASN), accepting the number with or without the "AS" prefix (e.g. AS6167 or 6167). Use to identify the organization, allocation, or routing info behind an ASN. Read-only lookup; safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `asn` | string | yes |  | AS Number. The AS Number to lookup (e.g., AS6167 or 6167) |
| `format` | string | no | `"JSON"` | Response Format. Format of the response. One of `"JSON"`, `"XML"`, `"CSV"`, `"Newline"`. |
| `mode` | string | no | `"live"` | Environment. Environment mode for testing or production. One of `"live"`, `"test"`. |
| `callback` | string | no |  | JSONP Callback. Function name for JSONP response format. |

### `bin_lookup`

**BIN Lookup.** Look up the issuing bank, card scheme, type, and country behind a payment card from its BIN/IIN (the leading digits). Accepts either the first 6+ digits or a full card number (only the leading digits are used). Use for card validation or fraud-screening enrichment. Read-only lookup; safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bin` | string | yes |  | BIN/IIN. The BIN/IIN of the card (minimum 6 digits). Can be partial like "456789" or full card number. |
| `format` | string | no | `"JSON"` | Response Format. Format of the response. One of `"JSON"`, `"XML"`, `"CSV"`, `"Newline"`. |
| `mode` | string | no | `"live"` | Environment. Environment mode for testing or production. One of `"live"`, `"test"`. |
| `userID` | string | no |  | User Identifier. Identify requests from specific users for monitoring (e.g., email, phone, user ID) |
| `callback` | string | no |  | JSONP Callback. Function name for JSONP response format. |

### `ip_lookup`

**IP Lookup.** Look up geolocation, ISP, timezone, currency, and security/risk signals for an IPv4 or IPv6 address. Optionally narrow the response to specific modules (security, currency, timezone, location) via a comma-separated list. Use to geolocate or fraud-screen an IP. Read-only lookup; safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ip` | string | yes |  | IP Address. The IP address to lookup (IPv4 or IPv6) |
| `params` | string | no |  | Modules. Comma-separated list of modules to include: security, currency, timezone, location (e.g., "security,timezone,currency") |
| `format` | string | no | `"JSON"` | Response Format. Format of the response. One of `"JSON"`, `"XML"`, `"CSV"`, `"Newline"`. |
| `lang` | string | no | `"EN"` | Response Language. Language for the response. One of `"EN"`, `"AR"`, `"DE"`, `"FR"`, `"ES"`, `"JA"`, `"ZH"`, `"RU"`. |
| `mode` | string | no | `"live"` | Environment. Environment mode for testing or production. One of `"live"`, `"test"`. |
| `userID` | string | no |  | User Identifier. Identify requests from specific users for monitoring (e.g., email, phone, user ID) |
| `callback` | string | no |  | JSONP Callback. Function name for JSONP response format. |

### `email_validation`

**Email Validation.** Validate and risk-score a single email address, checking domain/MX validity, disposable-email detection, and fraud indicators. Use to verify an email before signup, contact, or fraud screening. Read-only scoring call; safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The email address to validate. |
| `format` | string | no | `"JSON"` | Response Format. Format of the response. One of `"JSON"`, `"XML"`, `"CSV"`, `"Newline"`. |
| `mode` | string | no | `"live"` | Environment. Environment mode for testing or production. One of `"live"`, `"test"`. |
| `userID` | string | no |  | User Identifier. Identify requests from specific users for monitoring (e.g., email, phone, user ID) |
| `callback` | string | no |  | JSONP Callback. Function name for JSONP response format. |

### `profanity_detection`

**Detect Profanity.** Scan a block of text for offensive or inappropriate language and return a risk/safety assessment. Can return just the score and safety flag, or additionally list the bad words found. Use to moderate user-generated content. Read-only scoring call; safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to check for profanity. |
| `scoreOnly` | string | no | `"no"` | Score Only. Return only the score and safety status. One of `"no"`, `"yes"`. |
| `listBadWords` | string | no | `"no"` | List Bad Words. Include a list of bad words found in the text. One of `"no"`, `"yes"`. |
| `format` | string | no | `"JSON"` | Response Format. Format of the response. One of `"JSON"`, `"XML"`, `"CSV"`. |
| `mode` | string | no | `"live"` | Environment. Environment mode for testing or production. One of `"live"`, `"test"`. |
| `callback` | string | no |  | JSONP Callback. Function name for JSONP response format. |

### `phone_validation`

**Phone Validation.** Validate a phone number against its country, checking syntax and reporting validity and operational status. Requires both the phone number (any common format) and the ISO 3166-1 alpha-2 country code (e.g. US, GB, FR). Use to verify a phone before contact or fraud screening. Read-only scoring call; safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone` | string | yes |  | Phone Number. The phone number to validate (e.g., +12121234567, 0012121234567, 12121234567, or 2121234567) |
| `countryCode` | string | yes |  | Country Code. ISO 3166-1 alpha-2 country code (e.g., US, GB, FR) |
| `format` | string | no | `"JSON"` | Response Format. Format of the response. One of `"JSON"`, `"XML"`, `"CSV"`, `"Newline"`. |
| `mode` | string | no | `"live"` | Environment. Environment mode for testing or production. One of `"live"`, `"test"`. |
| `userID` | string | no |  | User Identifier. Identify requests from specific users for monitoring (e.g., email, phone, user ID) |
| `callback` | string | no |  | JSONP Callback. Function name for JSONP response format. |
