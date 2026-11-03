# Tenzo

Extract data and insights from the Tenzo platform for sales, forecasting, and analytics.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tenzo'
  version: '0.0.8'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Tenzo account using OAuth2. Supports both Authorization Code and Client Credentials flows.

### `SECRET_TEXT`: API Key

> API Key for Tenzo. Use "Token" prefix authentication method.

### `CUSTOM_AUTH`: App Credentials

> Use Application ID and API Secret Key for authentication.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | Application ID. |
| `apiSecret` | string | yes |  | API Secret Key. |

## Actions

None.
