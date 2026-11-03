# ClearoutPhone

ClearoutPhone is a phone number validation and verification service that helps businesses ensure the accuracy and validity of their phone number data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clearoutphone'
  version: '0.1.8'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> ClearoutPhone API Key
>
> ## Generating an API Token
>
> Once signed up and logged in, click on **Dashboard -> API** tab available on left sidebar and then click on **"Generate API Token"**.
> .

## Actions

### `findPhoneNumberCarrier`

**Find Phone Number Carrier.** Look up the telecom carrier of a single phone number via ClearoutPhone, also returning line type and country details. Use when an agent needs to identify which provider owns a number. Requires the number in international format (e.g. +447766733573); this is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phoneNumber` | string | yes |  | Phone Number. The phone number to validate (e.g., +447766733573 ) |

### `findPhoneNumberIsMobile`

**Find Phone Number Is Mobile.** Check whether a single phone number is a mobile (vs. landline or other) line type via ClearoutPhone. Use when an agent needs to decide if a number can receive SMS or routing depends on mobile vs. fixed lines. Requires the number in international format (e.g. +447766733573); this is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phoneNumber` | string | yes |  | Phone Number. The phone number to validate (e.g., +447766733573 ) |

### `validatePhoneNumber`

**Validate Phone Number.** Validate a single phone number via ClearoutPhone and retrieve comprehensive details including validity, line type, carrier, location, country, timezone, and formatted representations (international, local, E.164). Use this as the broadest lookup when an agent needs full number metadata rather than just carrier or mobile status. Requires the number in international format (e.g. +447766733573); this is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phoneNumber` | string | yes |  | Phone Number. The phone number to validate (e.g., +447766733573 ) |
