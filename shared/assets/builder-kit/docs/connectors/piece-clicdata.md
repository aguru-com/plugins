# Clicdata

ClicData enables True Performance with an end-to-end data analytics platform: connect, transform, automate, visualize and share data from 300+ sources.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clicdata'
  version: '0.0.10'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your ClicData account using OAuth2. Supports both Authorization Code (user-based) and Client Credentials (server-to-server) flows. Configure your preferred flow in ClicData under Account > API Apps.

### `SECRET_TEXT`: API Key

> API key generated in ClicData under Account > API Apps

### `CUSTOM_AUTH`: Basic Auth

> Sign in using your ClicData user credentials (used to build the Basic token).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client ID. |
| `userEmail` | string | yes |  | User Email. |
| `userPassword` | string | yes |  | User Password. |

## Actions

### `insert_row`

**Insert Row.** Appends rows to a ClicData table by table ID. Use to push new records into an existing table; supply the data as an array of objects keyed by column name. Capped at 500 rows per call and not idempotent — each call appends the rows again, creating duplicates if repeated. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table to insert data into. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | JSON | yes | `[{"Column1":"value1","Column2":"value2"}]` | Row Data. Array of objects representing rows to insert. Each object should have column names as keys. Maximum 500 rows. |
| `apiVersion` | string | no |  | API Version. Defaults to 2022.01. |

### `refresh_table`

**Refresh Table.** Triggers a refresh of a ClicData table by table ID to re-pull or recompute its data. The refresh mode is required and controls how data is applied — reload, rebuild, update, append, or update+append. Use after a source changes to update the table. Not idempotent: append-based modes add rows on each call, so repeated runs change the result. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_id` | string | yes |  | Table. Select the table to insert data into. A value the product loads from the provider, such as an id; write the value itself. |
| `mode` | string | yes | `"reload"` | Refresh Mode. Select the refresh mode for the table. One of `"reload"`, `"rebuild"`, `"update"`, `"append"`, `"updateappend"`. |
| `apiVersion` | string | no |  | API Version. Defaults to 2022.01. |
