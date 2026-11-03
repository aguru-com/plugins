# Approval (Legacy)

Build approval process in your workflows

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-approval'
  version: '0.1.28'
```

Categories: CORE, FLOW_CONTROL. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `wait_for_approval`

**Wait for Approval.** Pauses the current flow run at a human approval gate and resumes only when the run's waitpoint resume URL is called with an approve or disapprove response, reporting the choice. Pick this when execution must block on a human decision; it returns no link itself, so use Create Approval Links when the flow should keep running and hand a link out. Takes no inputs and is a legacy piece: for a new flow prefer the approval actions in the Approvals tab, which deliver the request and wait in one step. Not idempotent, since each execution creates a new waitpoint.

Kind: read, not safe to repeat.

No inputs.

Output fields:

- `approved`: Approved (boolean)

### `create_approval_links`

**Create Approval Links.** Mints a resumable approval/disapproval link for the current flow run and returns it immediately without pausing execution, so a later step can email or post it. Pick this when the flow must continue after handing out the link; use Wait for Approval instead when the run should block until someone responds. Takes no inputs and is a legacy piece that remains supported because, unlike the approval actions in the Approvals tab, it hands out a link without pausing the run. Not idempotent, since each call creates a new waitpoint and the previously issued link is not returned.

Kind: read, not safe to repeat.

No inputs.

Output fields:

- `approvalLink`: Approval Link (url)
- `disapprovalLink`: Disapproval Link (url)
