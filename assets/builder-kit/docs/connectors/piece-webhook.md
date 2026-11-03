# Webhook

Receive HTTP requests and trigger flows using unique URLs.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-webhook'
  version: '0.1.42'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `return_response`

**Return Response.** Sends the HTTP response for a run started by the Catch Webhook trigger, with the body typed as JSON, Raw, or Redirect and Flow Execution choosing whether the run stops here or responds and continues; leave Flow Execution unset and no response is emitted. Prefer Respond and Wait for Next Webhook when the flow must answer then pause for a follow-up call, or the Forms piece Respond on UI action for form and chat triggers. Only synchronous (/sync) webhook calls receive it; not idempotent, since each call emits a response.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `responseType` | string | no | `"json"` | Response Type. One of `"json"`, `"raw"`, `"redirect"`. |
| `fields` | object | yes |  | Response. An object whose fields depend on other inputs; the product shows them. |
| `respond` | string | no | `"stop"` | Flow Execution. One of `"stop"`, `"respond"`. |

### `return_response_and_wait_for_next_webhook`

**Respond and Wait for Next Webhook.** Replies to a webhook caller with a JSON, Raw, or Redirect body and attaches an x-activepieces-resume-webhook-url header holding a freshly minted callback URL, then suspends the run until that URL is called. Pick it for a multi-request handshake inside one flow; prefer plain Return Response when no follow-up call is needed, or Wait for Approval or the Delay piece when a human or a timer resumes the flow. Not idempotent: each execution creates a new waitpoint with a different resume URL and suspends the run again.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `responseType` | string | no | `"json"` | Response Type. One of `"json"`, `"raw"`, `"redirect"`. |
| `fields` | object | yes |  | Response. An object whose fields depend on other inputs; the product shows them. |
