# Chartly

Instant chart images. Zero servers. Transform any Chart.js configuration into cached PNG or SVG images via a simple REST API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chartly'
  version: '0.0.9'
```

Categories: DEVELOPER_TOOLS, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> 1. Visit chartly.dev to generate your free trial API key
> 2. Create an account to manage your API keys and access higher limits
> 3. Find your keys in your dashboard anytime
> 4. API keys look like: trial_abc123...xyz789

## Actions

### `create_chart`

**Create Chart.** Renders a Chart.js configuration into a PNG or SVG image via the Chartly API and returns it as a base64 data URL. Build the chart from the simple props (chart type, labels, dataset values, colors, dimensions) or, for full control, pass a complete Chart.js config JSON in the advanced config prop, which overrides the simple settings. Use when an agent needs to produce a chart visualization from numeric data. Each call creates a new cached chart on Chartly, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chart_type` | string | yes | `"bar"` | Chart Type. Type of chart to generate. One of `"bar"`, `"line"`, `"pie"`, `"doughnut"`, `"radar"`, `"polarArea"`, `"scatter"`, `"bubble"`. |
| `chart_title` | string | no |  | Chart Title. Title for the chart. |
| `labels` | array | yes |  | Labels. Labels for the data points (e.g., ["Jan", "Feb", "Mar"]) |
| `dataset_label` | string | yes | `"Data"` | Dataset Label. Label for the data series. |
| `data_values` | array | yes |  | Data Values. Numeric values for the chart (e.g., [10, 20, 30]) |
| `background_color` | string | no | `"rgba(54, 162, 235, 0.8)"` | Background Color. Background color for data points (e.g., "rgba(54, 162, 235, 0.8)" or "#36A2EB") |
| `width` | number | yes | `600` | Width. Image width in pixels (1-2000) |
| `height` | number | yes | `400` | Height. Image height in pixels (1-2000) |
| `format` | string | yes | `"png"` | Format. Output format for the chart image. One of `"png"`, `"svg"`. |
| `background_color_image` | string | no | `"white"` | Image Background Color. Background color for the image (e.g., "white", "transparent", "#FFFFFF") |
| `advanced_config` | string | no |  | Advanced Chart.js Configuration. Complete Chart.js configuration as JSON (overrides other settings) |

### `get_chart`

**Get Chart.** Fetches a previously created chart from Chartly by its chart ID and returns the cached image as a base64 data URL, auto-detecting PNG vs SVG from the response unless a format is specified. Use when an agent already has a chart ID (e.g. from a prior Create Chart call) and needs to re-fetch the image. Requires a valid chart ID; this is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chart_id` | string | yes |  | Chart ID. The ID of the chart to retrieve (from create chart response) |
| `format` | string | no | `"auto"` | Expected Format. Expected output format of the chart. One of `"png"`, `"svg"`, `"auto"`. |
