# Webling

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-webling'
  version: '0.1.6'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes | `"example.webling.ch"` | Base URL. |
| `apikey` | string | yes |  | API Key. |

## Actions

### `EventsById`

**Get Events by ID.** Fetches Webling calendar events by their IDs, optionally narrowing the result to a single calendar. Use it when you already have event IDs and need their full details. Pass IDs as a comma-separated string (e.g. "536,525,506"); if any ID does not exist the entire request fails with a 404. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventIds` | string | yes |  | Event ID list. Comma separated list of event IDs (e.g. '536,525,506,535'). When at least one ID doesn't exist the whole query return a 404 error. |
| `calendarId` | string | no |  | Calendar. Calendar to filter the events by. A value the product loads from the provider, such as an id; write the value itself. |
