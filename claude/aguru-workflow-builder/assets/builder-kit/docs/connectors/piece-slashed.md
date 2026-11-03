# SlashedCloud

AV1 video encoding and transcoding via slashed.cloud.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-slashed'
  version: '0.1.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Your Bearer Token from the slashed.cloud dashboard. Go to your service settings to find or generate it.

## Actions

### `encode_video`

**Encode a Video.** Submits a new AV1 video encoding/transcoding job to slashed.cloud for a given service ID, pointing at a source file (path or URL in the service's configured storage) and a `jobs` array of operations to apply. Use to kick off transcoding; optionally set a callback URL to be POSTed when encoding completes. Not idempotent — each call queues a separate encoding job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `service_id` | number | yes |  | Service ID. Your service ID from the slashed.cloud dashboard. Found under your service settings. |
| `source` | string | yes |  | Source File. Path or URL of the source video file in the storage you have configured for your service. |
| `jobs` | JSON | yes |  | Jobs. Array of encoding job objects to apply to the source file. Each object must include a `type` field specifying the job type (e.g. `{ "type": "encode", "output": "output.mp4" }`). |
| `priority` | string | no |  | Priority. Processing priority for this encoding request. One of `"low"`, `"high"`. |
| `callback` | string | no |  | Callback URL. Optional URL to receive a POST request when encoding completes. Slashed will send the result to this endpoint. |

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
