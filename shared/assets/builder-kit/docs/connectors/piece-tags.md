# Tags

Add custom tags to your run for filtration

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tags'
  version: '0.0.23'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `add_tag`

**Add Tag.** Attaches a label to the flow run that is currently executing, so that run can later be located or grouped by that tag when listing runs through the Activepieces API. Pick this to mark a run with a business identifier or a branch it took (e.g. a customer id, "retry", "escalated"); it affects only the current run and the tag is surfaced through the API rather than the run UI. Requires a tag name; idempotent, since the run holds a de-duplicated set of tags, so adding the same name again leaves the same end state.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Tag Name. |
