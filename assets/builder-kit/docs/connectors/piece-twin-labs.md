# Twin Web Agent

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-twin-labs'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Please use ***your-twin-labs-api-key*** as value for API Key

## Actions

### `startBrowsingTask`

**Browse.** Launches an autonomous AI web-navigation agent that starts at a given URL and pursues a free-text goal (e.g. find a price, extract a fact, locate a page), then blocks polling until the task completes or a 15-minute timeout elapses, returning the agent's text output. Choose it when a task requires live, multi-step browsing of a website rather than a single fixed API call or scrape. Requires a starting URL and a goal; each call spins up a fresh browsing run, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `startUrl` | string | yes | `""` | startUrl. The URL where the browsing task should begin. |
| `goal` | string | yes |  | Goal. The goal or objective of the browsing task. |
