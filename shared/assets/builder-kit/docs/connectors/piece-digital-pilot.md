# DigitalPilot

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-digital-pilot'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your DigitalPilot API key

## Actions

### `add_target_account`

**Add Target Account.** Adds a company domain as a target account to a specific DigitalPilot list (identified by tag and list IDs) so its website visits are tracked as high-priority. Use to build or grow an account-based marketing target list. Requires the tag ID, list ID, and the account domain (e.g. example.com); idempotent, since re-adding the same domain leaves the list membership unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tagId` | string | yes |  | Tag ID. The ID of the tag. |
| `listId` | string | yes |  | List ID. The ID of the list. |
| `domain` | string | yes |  | Domain. Account domain name (e.g., example.com) |

### `remove_target_account`

**Remove Target Account.** Removes a company domain from a specific DigitalPilot target-account list (identified by tag and list IDs), stopping it from being tracked as a high-priority account. Use to prune an account-based marketing target list. Requires the tag ID, list ID, and the account domain; idempotent, since removing an already-absent domain leaves the list membership unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tagId` | string | yes |  | Tag ID. The ID of the tag. |
| `listId` | string | yes |  | List ID. The ID of the list. |
| `domain` | string | yes |  | Domain. Account domain name (e.g., example.com) |
