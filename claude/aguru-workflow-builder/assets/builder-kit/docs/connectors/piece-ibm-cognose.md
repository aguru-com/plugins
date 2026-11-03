# IBM Cognos Analytics

Business intelligence and performance management suite for data analysis and reporting

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ibm-cognose'
  version: '0.2.0'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> ## IBM Cognos Analytics Authentication
>
> Enter your Cognos Analytics credentials:
> - **Username**: Your Cognos username
> - **Password**: Your Cognos password

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseurl` | string | yes |  | Base URL. Cognos server URL (e.g., https://your-cognos-server.com) |
| `CAMNamespace` | string | yes |  | CAM Namespace. CAM namespace for authentication (e.g., LDAP) |
| `username` | string | yes |  | Username. Cognos username. |
| `password` | string | yes |  | Password. Cognos password. |

## Actions

### `create_data_source`

**Create Data Source.** Create a new data source in IBM Cognos Analytics from a JDBC connection string, optionally attaching a database driver and a signon (username/password) credential. Use when provisioning a database connection for reporting. Not idempotent: each call creates a new data source and fails if one with the same name already exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `defaultName` | string | yes |  | Data Source Name. Name for the new data source. |
| `connectionString` | string | yes | `"jdbc:db2://localhost:50000/SAMPLE"` | Connection String. JDBC URL or database connection string. |
| `driverName` | string | no | `"com.ibm.db2.jcc.DB2Driver"` | Driver Name. Database driver class name. |
| `username` | string | no |  | Database Username. Username for database connection. |
| `password` | string | no |  | Database Password. Password for database connection. |
| `signonDefaultName` | string | no |  | Signon Name. Name for the database credentials. |

### `get_data_source`

**Get Data Source.** Fetch the details of a single IBM Cognos data source by its id. Use to read or verify a data source's configuration before acting on it; optionally request extra fields such as connections or signons. Idempotent read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasourceId` | string | yes |  | Data Source. Select a data source. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | string | no |  | Extra Fields. Comma-separated list of extra fields (e.g., connections,signons) |

### `update_data_source`

**Update Data Source.** Update an existing IBM Cognos data source identified by its id, changing its name and/or its disabled/hidden flags. At least one field must be supplied. Idempotent: re-applying the same values leaves the data source in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasourceId` | string | yes |  | Data Source. Select a data source. A value the product loads from the provider, such as an id; write the value itself. |
| `defaultName` | string | no |  | Data Source Name. New name for the data source. |
| `disabled` | boolean | no | `false` | Disabled. Disable the data source. |
| `hidden` | boolean | no | `false` | Hidden. Hide the data source. |

### `delete_data_source`

**Delete Data Source.** Permanently delete an IBM Cognos data source by its id. Use to remove a database connection that is no longer needed. Destructive and not idempotent: a repeat call on an already-deleted data source returns not-found. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasourceId` | string | yes |  | Data Source. Select a data source. A value the product loads from the provider, such as an id; write the value itself. |

### `get_content_object`

**Get Content Object.** Fetch the details of a single content-store object (report, dashboard, folder, etc.) by its id from the IBM Cognos content tree. Use to inspect an object before moving, copying, or updating it; optionally request extra fields such as owner, permissions, or children. Idempotent read-only lookup. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectId` | string | yes |  | Content Object. Select a content object. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | string | no |  | Extra Fields. Comma-separated list of extra fields (e.g., owner,permissions,children) |

### `update_content_object`

**Update Content Object.** Update an existing content-store object (report, dashboard, folder, etc.) identified by its id, changing its name and/or description. The object type is required, and an optional version enables optimistic-concurrency checking that rejects the update if the object changed since it was fetched. Idempotent: re-applying the same values leaves the object in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectId` | string | yes |  | Content Object. Select a content object. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | yes |  | Type. Object type (e.g., report, dashboard, folder) |
| `defaultName` | string | no |  | Name. New name for the object. |
| `defaultDescriptions` | string | no |  | Description. New description for the object. |
| `version` | number | no |  | Version. Current version for optimistic concurrency. |

### `move_content_object`

**Move Content Object.** Move a content-store object, together with all of its descendants, from its current location into a destination container within the IBM Cognos content tree. Use to reorganize reports, dashboards, or folders. Source and destination must differ. Not idempotent: a repeat call after the object has moved fails because the source no longer exists at its original location. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceId` | string | yes |  | Content Object. Select a content object. A value the product loads from the provider, such as an id; write the value itself. |
| `destinationId` | string | yes |  | Destination Container. Destination container where the object will be moved. A value the product loads from the provider, such as an id; write the value itself. |

### `copy_content_object`

**Copy Content Object.** Copy a content-store object into a destination container within the IBM Cognos content tree, optionally including all of its descendants (recursive, on by default). Use to duplicate reports, dashboards, or folders. Source and destination must differ. Not idempotent: each call creates a new copy. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceId` | string | yes |  | Content Object. Select a content object. A value the product loads from the provider, such as an id; write the value itself. |
| `destinationId` | string | yes |  | Destination Container. Destination container where the object will be copied. A value the product loads from the provider, such as an id; write the value itself. |
| `recursive` | boolean | no | `true` | Recursive Copy. Copy all descendants (child objects) |

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
