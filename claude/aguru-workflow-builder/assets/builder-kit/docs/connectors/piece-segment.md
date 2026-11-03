# Segment

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-segment'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Analytics Key

> Copy and paste your analytics write key here

## Actions

### `identifyUser`

**Identify User.** Sends a Segment Identify call that associates a user (by required userId) with a set of traits, registering or updating that profile in Segment. Use when an agent needs to record who a user is and their attributes for downstream analytics/tooling. Not idempotent: each call emits a new Identify event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. |
| `traits` | object | yes |  | Traits. The traits to associate with the user. |
