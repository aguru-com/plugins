# Chainalysis Screening API

Chainalysis Screening API allows you to check if a blockchain address is sanctioned.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chainalysis-api'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API Key for Chainalysis Screening API

## Actions

### `checkAddressSanction`

**Check Address Sanctions.** Screens a single blockchain address against Chainalysis sanctions data to determine whether it is associated with a sanctioned entity. Use this when you need to verify the sanctions/compliance status of a wallet address before transacting or onboarding. Takes one address string; this is a read-only lookup and is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `address` | string | yes |  | Address. Address to check for sanctions. |
