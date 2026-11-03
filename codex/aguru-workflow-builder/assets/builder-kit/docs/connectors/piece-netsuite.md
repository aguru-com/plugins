# NetSuite

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-netsuite'
  version: '0.2.1'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. Your NetSuite account ID. |
| `consumerKey` | string | yes |  | Consumer Key. Your NetSuite consumer key. |
| `consumerSecret` | string | yes |  | Consumer Secret. Your NetSuite consumer secret. |
| `tokenId` | string | yes |  | Token ID. Your NetSuite token ID. |
| `tokenSecret` | string | yes |  | Token Secret. Your NetSuite token secret. |

## Actions

### `getVendor`

**Get Vendor.** Fetches a single vendor record from NetSuite by its internal record ID. Use when you already have the vendor ID and need its full details; this is a read-only lookup that is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorId` | string | yes |  | Vendor ID. The ID of the vendor to retrieve. |

### `getCustomer`

**Get Customer.** Fetches a single customer record from NetSuite by its internal record ID. Use when you already have the customer ID and need its full details; this is a read-only lookup that is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. The ID of the customer to retrieve. |

### `runSuiteQL`

**Run SuiteQL Query.** Runs an arbitrary SuiteQL (Oracle SQL) query against NetSuite and returns all matching rows, auto-paginating across results. Use this for flexible read queries across any NetSuite record type when no dedicated action fits. Pass dynamic values via numbered placeholders (:1, :2, ...) and the Arguments list rather than interpolating into the query string. This is a read-only query and is safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Please use :1, :2, :3 etc. for parameterized queries. |
| `args` | array | no |  | Arguments. Arguments to be used in the query. |

### `executeDataset`

**Execute Dataset.** Runs a saved NetSuite dataset (workbook query) by its dataset ID and returns all result rows, auto-paginating across them. Use when a predefined dataset already captures the query you need, rather than writing raw SuiteQL. The dataset ID is selected from the datasets available on the connected account. This is a read-only execution and is safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasetId` | string | yes |  | Dataset. A value the product loads from the provider, such as an id; write the value itself. |

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
