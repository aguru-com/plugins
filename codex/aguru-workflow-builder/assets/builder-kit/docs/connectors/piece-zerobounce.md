# ZeroBounce

ZeroBounce is an email validation service that helps you reduce bounces, improve email deliverability and increase email marketing ROI.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zerobounce'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

## Actions

### `validateEmail`

**Validate Email.** Validates a single email address through ZeroBounce, returning its deliverability status (e.g. valid, invalid, catch-all, abuse) plus related quality signals. Use to verify an address before sending or storing it. Optionally caches the result in the project store so repeat lookups of the same address skip the API call; this is a read-only check that is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `cacheResponse` | boolean | no | `true` | Cache Response. Store the response in the project store for future use. |
