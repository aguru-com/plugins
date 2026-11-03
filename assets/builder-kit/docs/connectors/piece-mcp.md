# MCP

Connect to your hosted MCP Server using any MCP client to communicate with tools

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mcp'
  version: '0.0.21'
```

Categories: ARTIFICIAL_INTELLIGENCE, UNIVERSAL_AI. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `reply_to_mcp_client`

**Reply to MCP Client.** Send a result payload back to the MCP client that invoked this flow through the MCP Tool trigger, supplied either as key-value pairs (Simple mode) or as raw JSON (Advanced mode), and either stop the run there or respond and let the remaining steps continue. Only meaningful in a flow started by the MCP Tool trigger with Wait for Response enabled; without that the client receives nothing. Not idempotent: each call emits a response to the waiting client and changes the run execution state.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"simple"` | Mode. Choose Simple for key-value or Advanced for JSON. One of `"simple"`, `"advanced"`. |
| `response` | object | yes |  | Response. An object whose fields depend on other inputs; the product shows them. |
| `respond` | string | no | `"stop"` | Flow Execution. One of `"stop"`, `"respond"`. |
