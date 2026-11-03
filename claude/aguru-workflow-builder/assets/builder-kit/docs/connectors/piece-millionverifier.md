# MillionVerifier

MillionVerifier is an email verifier service and API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-millionverifier'
  version: '0.1.8'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: MillionVerifier API Key

> API Key for MillionVerifier.
>
> API key you can find on this page: https://app.millionverifier.com/api
>
> **Test API key for development:** `API_KEY_FOR_TEST`. This API key will return random results.

## Actions

### `verifyEmail`

**Verify Email.** Validates a single email address against the MillionVerifier real-time API, returning its deliverability status (e.g. deliverable, undeliverable, risky). Use to check whether an email is valid and safe to send to before adding it to a list or sending mail. Requires one email address; the call is read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The email address to verify. |
| `timeout` | number | no | `10` | Timeout. Timeout in seconds (default: 10) |
