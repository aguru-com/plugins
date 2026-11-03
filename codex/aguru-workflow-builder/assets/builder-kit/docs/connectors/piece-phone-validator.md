# Phone Validator

Validate phone numbers and retrieve line type, carrier, and location information

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-phone-validator'
  version: '0.0.8'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API Key:
>
> 1. Sign up and create an account at Phone Validator
> 2. Visit your account information to obtain your API key
> 3. Copy your API key and paste it here

## Actions

### `validatePhone`

**Validate Phone Number.** Looks up a phone number via the PhoneValidator API to determine whether it is valid and real. Choose the search type: "basic" returns line type, carrier, location, and a fake-number check, while "fake" runs only the fake/disposable-number check. Use it to verify or enrich a phone number before contacting it; the number can be passed in various formats (e.g. 7029270000 or 1-702-927-0000). This is a read-only lookup, safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phoneNumber` | string | yes |  | Phone Number. The phone number to validate (e.g., 7029270000, 1-702-927-0000) |
| `searchType` | string | yes | `"basic"` | Search Type. Type of phone lookup to perform. One of `"basic"`, `"fake"`. |
