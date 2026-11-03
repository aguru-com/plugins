# Twitch

Twitch is the world's leading live streaming platform for gamers and the things we love!

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-twitch'
  version: '0.1.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To get your credentials, follow these steps:
>
> 1. **Register Your App**
> - Go to [Twitch Developer Console](https://dev.twitch.tv/console)
> - Log in with your Twitch account (or create one if needed)
> - Enable [Two-Factor Authentication](https://www.twitch.tv/settings/security) on your account
> - Navigate to the Applications tab and click "Register Your Application"
> - Set your application name (must be unique)
> - Add an OAuth Redirect URL
> - Select a category for your application
> - Select the Client Type as "Confidential"
> - Click Create
>
> 2. **Get Your Credentials**
> - Go to Applications tab and click "Manage" on your app
> - Copy your **Client ID** (public, can be shared)
> - Click "New Secret" to generate a **Client Secret** (keep this confidential)
>
> For more details, visit the [Twitch Authentication Documentation](https://dev.twitch.tv/docs/authentication/register-app/)

## Actions

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
