# Algolia

Manage your Algolia search indices — add, browse, and delete records.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-algolia'
  version: '0.1.2'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Authenticate with your Algolia Application ID and API key.
>
> To get your credentials:
> 1. Sign in to the Algolia dashboard.
> 2. Open **Settings > API Keys**.
> 3. Copy your **Application ID**.
> 4. Copy an API key that can list indexes and manage records.
>
> This piece needs permissions for `listIndexes`, `browse`, `addObject`, and `deleteObject`. Search-only API keys won't work for these actions.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `applicationId` | string | yes |  | Application ID. Your Algolia application ID. |
| `apiKey` | string | yes |  | API Key. An Algolia API key with index browsing and record write permissions. |

## Actions

### `save-records`

**Save Records.** Adds or updates one or more records in an Algolia search index (creating the index if it does not yet exist). Pass an array of JSON objects; include an `objectID` on a record to overwrite that existing record, or omit it to have Algolia generate a new one. Not idempotent: records without an `objectID` create a fresh record on every call, so repeating the call appends duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `indexName` | string | yes |  | Index Name. Enter an existing index name or a new one — Algolia creates it automatically. |
| `records` | JSON | yes |  | Records. Provide an array of JSON objects to save. Include `objectID` to update an existing record, or omit it to let Algolia create one. |

### `browse-records`

**Browse Records.** Retrieves the raw records stored in an Algolia index, paging through them up to an optional limit (default 10,000). Use this to dump or inspect index contents; it is a read-only lookup, not a relevance-ranked query, so it does not accept a search term. Idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `indexName` | string | yes |  | Index. Select the Algolia index to use. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `10000` | Limit. Maximum number of records to retrieve. Defaults to 10,000. |

### `delete-records`

**Delete Records.** Deletes records from an Algolia index by their objectIDs. Provide an array of the exact objectIDs to remove from the selected index. Idempotent: deleting the same IDs again leaves the index in the same state (already-absent IDs are simply no-ops). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `indexName` | string | yes |  | Index. Select the Algolia index to use. A value the product loads from the provider, such as an id; write the value itself. |
| `recordIds` | array | yes |  | Record IDs. Provide the Algolia objectIDs to delete from the selected index. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |
