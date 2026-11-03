# Muna

Run on-device AI predictions using Muna predictors.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-muna-ai'
  version: '0.1.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Go to [Muna Settings → Developer](https://muna.ai/settings/developer) to generate an access key.

## Actions

### `create_prediction`

**Create Prediction.** Creates a prediction against a named Muna predictor and returns the prediction record plus the resource URLs needed to run that predictor on-device; it provisions the run rather than returning model inference output, and it is the only purpose-built Muna action, so reach for the custom API call action for any other Muna endpoint. Requires the predictor tag (such as @org/my-model) and a client ID identifying the calling device or user; the optional configuration, device, and prior prediction IDs only steer which implementation Muna hands back. Not idempotent: each call creates a new prediction with a new ID. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | yes |  | Predictor Tag. The tag of the predictor to run (e.g. `@org/my-model`). |
| `clientId` | string | yes |  | Client ID. A unique identifier for the client making the prediction. Used to track usage per device or user. |
| `configurationId` | string | no |  | Configuration ID. Optional predictor configuration identifier. |
| `deviceId` | string | no |  | Device ID. Optional device identifier. Muna uses this to choose the optimal implementation to respond with. |
| `predictionId` | string | no |  | Prediction ID. For embedded predictors — providing the original prediction ID ensures the same implementation is delivered. |

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
