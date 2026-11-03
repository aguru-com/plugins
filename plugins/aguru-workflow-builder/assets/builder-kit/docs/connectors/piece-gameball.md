# Gameball

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gameball'
  version: '0.1.6'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Please use your gameball api key. visit [help center](https://help.gameball.co/en/articles/3467114-get-your-account-integration-details-api-key-and-transaction-key) for more information

## Actions

### `sendEvent`

**Send event.** Records a custom behavioral event (by event name) for a specific player in Gameball, identified by their player unique ID, so it can drive loyalty/gamification rules. Use when an agent needs to log that a player performed an action. Not idempotent: each call posts the event again, so repeats register as additional occurrences. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playerUniqueId` | string | yes |  | Your Player Unique Id. |
| `eventName` | string | yes |  | Event Name. |
