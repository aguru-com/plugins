# SurveyMonkey

Receive survey responses from SurveyMonkey

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-surveymonkey'
  version: '0.3.1'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To connect SurveyMonkey, create your own app:
> 1. Go to https://developer.surveymonkey.com/apps/ and click **Add a New App**.
> 2. On the app's **Settings** tab, set the **OAuth Redirect URL** to the redirect URL shown above.
> 3. Under **Scopes**, set these to **Required** and click **Update Scopes**: View Surveys, View Responses, View Response Details, View Webhooks, Create/Modify Webhooks, View Users.
> 4. Copy the **Client ID** and **Secret** from the **Credentials** section and paste them above.
>
> A new app starts as a draft that only your own SurveyMonkey account can connect, for 90 days. To keep using it, deploy it as **Private** (needs a paid plan) or **Public** (needs SurveyMonkey review).

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
