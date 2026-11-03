# Flow Helper

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-flow-helper'
  version: '0.1.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `getRunId`

**Get Run Info.** Returns the identifier of the flow run that is currently executing, along with a direct link to that run in the Activepieces UI. Use it when a later step needs to reference or report the run itself (e.g. embedding a run link in a Slack alert or a support ticket); it only ever describes the in-progress run and cannot look up a different one. Takes no inputs; read-only and idempotent.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Run ID
- `url`: Run URL (url)

### `failFlow`

**Fail Flow.** Aborts the current flow run by throwing the supplied message as an error, so the run is recorded as failed and no later steps execute. Use it to hard-fail on an unrecoverable condition; prefer Stop Flow when the early exit is a normal outcome that should still count as a success. Requires an error message, and the run continues past this step if continue-on-failure is enabled on it; idempotent, since it drives the run to the same failed end state and creates nothing.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message` | string | yes |  | Error Message. The error message to show when the flow fails. |

### `stopFlow`

**Stop Flow.** Ends the current flow run at this step and marks it as stopped rather than failed, so no later steps execute. Use it for an early exit when a condition means there is nothing left to do; prefer Fail Flow when the exit should be recorded as an error instead. Takes no inputs and stops the run without a custom webhook response; idempotent, since it drives the run to the same stopped end state and creates nothing.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `success`: Success (boolean)
- `message`: Message
