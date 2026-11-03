# Contentful

Content infrastructure for digital teams

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-contentful'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | Contentful Access Token. |
| `space` | string | yes |  | Space. |
| `environment` | string | yes |  | Environment. |

## Actions

### `contentful_record_search`

**Search Records.** Lists entries of a given Contentful content type within a space, optionally filtered by a raw Content Delivery API query formula and paginated via limit/skip. Use to find or retrieve multiple records by criteria; pass an empty query to fetch all entries of the content type. Read-only and idempotent. Requires the content model (content type) ID; the query formula uses Contentful search-parameter syntax. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contentModel` | string | yes |  | Content Model. A value the product loads from the provider, such as an id; write the value itself. |
| `locale` | string | yes |  | Content Locale. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | JSON | yes | `{}` | Query Formula. The query formula to use to search for records. See https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters for more information. |
| `limit` | number | no | `10` | Limit. The maximum number of records to return. |
| `skip` | number | no | `0` | Skip. The number of records to skip. |
| `include` | number | no | `1` | Relationship Include Depth. Number of levels to include for entries and assets. See https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/resource-links/retrieval-of-linked-resource-links. |
| `select` | array | no |  | Return Fields. The fields to return for each record. Values the product loads from the provider, such as ids; write an array of them. |

### `contentful_record_get`

**Get Record.** Fetches a single Contentful entry by its entry ID. Use when you already know the exact record ID and need its full data; for finding records by criteria use Search Records instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityId` | string | yes |  | Entity ID. The ID of the record to get. |

### `contentful_record_create`

**Create Record.** Creates a new Contentful entry under a given content type, mapping field values to the specified locale, and optionally publishes it immediately after creation. Use to add a new record; not idempotent, since each call creates a distinct entry. Requires the content model (content type) ID and field values matching that model. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `locale` | string | yes |  | Content Locale. A value the product loads from the provider, such as an id; write the value itself. |
| `contentModel` | string | yes |  | Content Model. A value the product loads from the provider, such as an id; write the value itself. |
| `publishOnCreate` | boolean | yes | `false` | Publish after Creating. Whether or not to publish this record after creating it. |
| `fields` | object | yes |  | Fields. Fields for Content Model. An object whose fields depend on other inputs; the product shows them. |

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
