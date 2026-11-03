# InstaCharts

Chart creation and visualization platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-insta-charts'
  version: '0.0.8'
```

Categories: MARKETING, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> InstaCharts OAuth2 Authentication

## Actions

### `generate_chart_image`

**Generate Chart Image.** Renders a chart as a PNG image via the InstaCharts API and returns it as a file, given a template plus X/Y (and optional breakdown or series) data arrays. Use to turn tabular numbers into a downloadable chart for embedding in messages, reports, or documents; pick the chart shape via the chartType option (bar, stackedBar, line, scatter, area, pie, radar, and grouped variants). Requires a valid templateId from the account; each call produces a fresh temporary image, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template. Select a chart template to use. A value the product loads from the provider, such as an id; write the value itself. |
| `chartType` | string | no | `"stackedBar"` | Chart Type. Type of chart to generate. One of `"bar"`, `"stackedBar"`, `"groupedBar"`, `"line"`, `"groupedLine"`, `"scatter"`, `"groupedScatter"`, `"area"`, `"groupedArea"`, `"pie"`, `"radar"`. |
| `title` | string | no |  | Title. Main chart title. |
| `subtitle` | string | no |  | Subtitle. Secondary chart title. |
| `xTitle` | string | no |  | X-Axis Title. Title for the X-axis. |
| `yTitle` | string | no |  | Y-Axis Title. Title for the Y-axis. |
| `zTitle` | string | no |  | Legend Title. Title for the legend. |
| `x` | array | yes |  | X-Axis Data. X-axis data values (e.g., ["Mobile", "Desktop", "Tablet"]) |
| `y` | array | yes |  | Y-Axis Data. Y-axis data values (e.g., [100, 200, 400]) |
| `z` | array | no |  | Breakdown Data. Breakdown axis data for unaggregated charts (e.g., ["Site A", "Site A", "Site B"]) |
| `series` | array | no |  | Series Data. Series data as objects with label and data (e.g., [{"label":"Site A","data":[1,2,3]}]) |
| `dLabel` | boolean | no | `false` | Show Data Labels. Show data labels near the chart pieces. |
| `overrides` | string | no |  | Override Parameters. Additional query parameters (e.g., color=cccccc&width=500) |
