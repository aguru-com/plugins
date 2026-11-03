# MCP Client

Call tools on an external MCP server deterministically, without an LLM.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mcp-client'
  version: '0.0.6'
```

Categories: ARTIFICIAL_INTELLIGENCE, UNIVERSAL_AI. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect to an external MCP server. Fill only the fields relevant to the chosen authentication method.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serverUrl` | string | yes |  | Server URL. The MCP server endpoint, e.g. https://example.com/mcp. |
| `protocol` | string | yes | `"streamable-http"` | Transport. One of `"streamable-http"`, `"http"`, `"sse"`. |
| `authType` | string | yes | `"none"` | Authentication. One of `"none"`, `"access_token"`, `"api_key"`, `"headers"`. |
| `accessToken` | string | no |  | Bearer Token. Used when Authentication is "Bearer Token". |
| `apiKey` | string | no |  | API Key. Used when Authentication is "API Key". |
| `apiKeyHeader` | string | no |  | API Key Header Name. Header carrying the API key, e.g. "x-api-key". Used when Authentication is "API Key". |
| `headers` | string | no |  | Custom Headers. A JSON object of header name/value pairs, e.g. {"x-tenant": "acme"}. Used when Authentication is "Custom Headers". |

## Actions

### `call-tool`

**Call Tool.** Invokes one named tool on the connected external MCP server with arguments matching that tool's own input schema; the tool list and its input fields are discovered live from the server, so what is callable varies by which MCP server the connection points at. Use it to call a third-party MCP tool deterministically as a flow step instead of delegating the choice to an LLM. Requires the exact tool name the server exposes, and it fails when the server flags the result as an error. Not idempotent: the effect depends on the remote tool invoked, which may create or mutate data on every call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tool` | string | yes |  | Tool. The tool to call. The list is loaded from the MCP server. A value the product loads from the provider, such as an id; write the value itself. |
| `args` | object | no |  | Tool Inputs. An object whose fields depend on other inputs; the product shows them. |
