# Opportify

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-opportify'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from [API Key List](https://app.opportify.ai/api-keys/list).

## Actions

### `analyze-email`

**Analyze Email.** Validates a single email address via the Opportify API and reports its deliverability, with optional auto-correction of likely typos and optional AI-assisted analysis. Use when an agent needs to verify whether an email is valid or deliverable before sending or storing it. Requires the email string; this is a read-only lookup and is safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `enableAutoCorrection` | boolean | no |  | Enable Auto Correction?. |
| `enableAI` | boolean | no |  | Enable AI?. |

### `analyze-ip-address`

**Analyze IP Address.** Looks up a single IP address via the Opportify API and returns insights about it (such as geolocation, network, and risk signals), with optional AI-assisted analysis. Use when an agent needs to enrich, geolocate, or assess the risk of an IP. Requires the IP address string; this is a read-only lookup and is safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ip` | string | yes |  | Ip Address. |
| `enableAI` | boolean | no |  | Enable AI?. |
