# SOAP

Simple Object Access Protocol for communication between applications

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-soap'
  version: '0.1.6'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Authentication Type. One of `"None"`, `"WS"`, `"Basic"`, `"Header"`. |
| `username` | string | no |  | Username. The WS Security username. |
| `password` | string | no |  | Password. The WS Security password. |
| `customHeader` | string | no |  | Custom Header. Custom Header Content. |

## Actions

### `call_method`

**Call SOAP Method.** Invokes a SOAP web-service operation against a WSDL endpoint: provide the WSDL URL, the method name (one of the operations the WSDL exposes), and the method arguments. Use to integrate with legacy/enterprise SOAP APIs. Returns parsed output when the Parsed flag is set, otherwise the raw request/response XML. Not idempotent in general — the invoked operation may create or mutate remote state on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `wsdl` | string | yes |  | WSDL URL. |
| `method` | string | yes |  | Method. The SOAP Method. A value the product loads from the provider, such as an id; write the value itself. |
| `args` | object | yes |  | Parameters. Arguments for the SOAP method. An object whose fields depend on other inputs; the product shows them. |
| `parsed` | boolean | no | `false` | Parsed. |
