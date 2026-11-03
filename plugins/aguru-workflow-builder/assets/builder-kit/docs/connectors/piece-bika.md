# Bika.ai

Interactive spreadsheets with collaboration

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bika'
  version: '0.3.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect Bika.ai with a personal API token.
>
> 1. Sign in to [Bika.ai](https://bika.ai).
> 2. Click your avatar at the bottom left and open **My Settings**.
> 3. Open **Developer** and click **Generate new token**.
> 4. Copy the token and paste it below.
>
> The token can reach every space your Bika user belongs to. On the Free plan each space allows 100 API requests a month.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token` | string | yes |  | Token. The API token from Bika (My Settings > Developer). |

## Actions

### `bika_create_record`

**Create Record.** Creates one record in a Bika.ai database picked from dropdowns, with one input per writable field; files given for attachment fields are uploaded first. Read-only fields (formula, lookup, auto number, created/modified time and by) are not offered. Each call adds a new record, so a retry creates a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The Bika space that holds the database. A value the product loads from the provider, such as an id; write the value itself. |
| `database_id` | string | yes |  | Database. The database (table) to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. The values for the new record. Empty inputs are left blank. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `code`: Status Code (number)
- `message`: Message
- `data`: Data
- `data.records`: Created Records
- `data.records[].id`: Record ID
- `data.records[].createdAt`: Created At (datetime)
- `data.records[].updatedAt`: Updated At (datetime)
- `data.records[].fields`: Fields (an object whose keys vary)

### `bika_find_records`

**Find Records.** Lists records of a Bika.ai database picked from dropdowns, optionally narrowed by a filter in the Bika filter query language, following pages up to Max Records (default 100, at most 1,000). Returns hasMore and an offset to continue. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The Bika space that holds the database. A value the product loads from the provider, such as an id; write the value itself. |
| `database_id` | string | yes |  | Database. The database (table) to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `maxRecords` | number | no |  | Max Records. How many records to return in total (default 100, at most 1,000). |
| `pageSize` | number | no |  | Page Size. How many records to fetch per API request (default 100, at most 1,000). Larger pages use fewer of your Bika API requests. |
| `filter` | string | no |  | Filter. Only return records that match, for example {Stage}=="Close Deals";{Score}>10. Put field names with spaces in {}, join conditions with ; (and) or , (or). See https://bika.ai/help/guide/developer/filter-query-language. |
| `offset` | string | no |  | Offset. To continue a previous search, paste the offset it returned. Leave empty to start from the first record. |

Output fields:

- `success`: Success (boolean)
- `code`: Status Code (number)
- `message`: Message
- `data`: Data
- `data.records`: Records
- `data.records[].id`: Record ID
- `data.records[].createdAt`: Created At (datetime)
- `data.records[].updatedAt`: Updated At (datetime)
- `data.records[].fields`: Fields (an object whose keys vary)
- `data.hasMore`: Has More (boolean)
- `data.offset`: Next Offset

### `bika_find_record`

**Get Record.** Gets one Bika.ai record by its record ID from a database picked from dropdowns. Use Find Records to search by field values instead. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The Bika space that holds the database. A value the product loads from the provider, such as an id; write the value itself. |
| `database_id` | string | yes |  | Database. The database (table) to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The ID of the record to get (starts with "rec"). |

Output fields:

- `success`: Success (boolean)
- `code`: Status Code (number)
- `message`: Message
- `data`: Record
- `data.id`: Record ID
- `data.createdAt`: Created At (datetime)
- `data.updatedAt`: Updated At (datetime)
- `data.fields`: Fields (an object whose keys vary)

### `bika_update_record`

**Update Record.** Updates the fields of one existing Bika.ai record, given its record ID, in a database picked from dropdowns. Only the fields you fill in are changed; empty inputs keep their current value. Repeating the call with the same values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The Bika space that holds the database. A value the product loads from the provider, such as an id; write the value itself. |
| `database_id` | string | yes |  | Database. The database (table) to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The ID of the record to update (starts with "rec"). |
| `fields` | object | yes |  | Fields. The new values. Empty inputs keep their current value. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `code`: Status Code (number)
- `message`: Message
- `data`: Record
- `data.id`: Record ID
- `data.createdAt`: Created At (datetime)
- `data.updatedAt`: Updated At (datetime)
- `data.fields`: Fields (an object whose keys vary)

### `bika_delete_record`

**Delete Record.** Permanently deletes one Bika.ai record by its record ID from a database picked from dropdowns. A retry after success fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space. The Bika space that holds the database. A value the product loads from the provider, such as an id; write the value itself. |
| `database_id` | string | yes |  | Database. The database (table) to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The ID of the record to delete (starts with "rec"). |

Output fields:

- `success`: Success (boolean)
- `code`: Status Code (number)
- `message`: Message
- `data`: Data
- `data.id`: Record ID
- `data.deleted`: Deleted (boolean)

### `list_spaces`

**List Spaces.** Lists the Bika.ai spaces the connected token can reach, with each space ID, name and plan. Start here to get the space ID that List Databases and every record action need. Read-only; costs one API request. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `spaces`: Spaces
- `spaces[].id`: Space ID
- `spaces[].name`: Name
- `spaces[].plan`: Plan
- `spaces[].member_count`: Members (number)
- `spaces[].created_at`: Created At (datetime)
- `count`: Count (number)

### `list_databases_by_id`

**List Databases.** Lists the databases (tables) in a Bika.ai space, given its space ID from List Spaces, with each database ID, name and folder path (first 200). Use it to find the database ID that Get Database Fields and the record actions need. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The space ID (starts with "spc"). Use List Spaces to find it. |

Output fields:

- `space_id`: Space ID
- `databases`: Databases
- `databases[].id`: Database ID
- `databases[].name`: Name
- `databases[].path`: Folder Path
- `databases[].parent_id`: Parent Folder ID
- `count`: Count (number)
- `truncated`: Truncated (boolean)

### `get_database_fields_by_id`

**Get Database Fields.** Returns the fields (columns) of a Bika.ai database, given its space and database IDs: exact name, type, whether it is writable, the value format to write, and option names for select fields. Call it before creating, updating or filtering records so field names and values match. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The space ID (starts with "spc"). Use List Spaces to find it. |
| `database_id` | string | yes |  | Database ID. The database ID (starts with "dat"). Use List Databases to find it. |

Output fields:

- `database_id`: Database ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Name
- `fields[].type`: Type
- `fields[].primary`: Primary (boolean)
- `fields[].writable`: Writable (boolean)
- `fields[].value_format`: Value Format
- `fields[].options`: Options
- `fields[].description`: Description
- `count`: Count (number)

### `find_records_by_id`

**Find Records (by ID).** Searches records of a Bika.ai database, given its space and database IDs, with an optional filter in the Bika filter query language (field==value, field names with spaces in {}, ; for AND or , for OR but never both, dates compared by day), optional sort and field list. Returns up to Limit records (default 20, max 100) with has_more and next_offset for paging; sorted results cannot be paged, so with a sort raise Limit or narrow the filter instead. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The space ID (starts with "spc"). Use List Spaces to find it. |
| `database_id` | string | yes |  | Database ID. The database ID (starts with "dat"). Use List Databases to find it. |
| `filter` | string | no |  | Filter. For example {Stage}=="Close Deals";Score>10. Leave empty to list all records. |
| `fields` | array | no |  | Fields. Field names to return. Leave empty to return all fields. |
| `sort_field` | string | no |  | Sort Field. A field name to sort by. Sorted results come back in one page only (no Offset). |
| `sort_order` | string | no | `"asc"` | Sort Order. One of `"asc"`, `"desc"`. |
| `limit` | number | no | `20` | Limit. How many records to return (1 to 100, default 20). |
| `offset` | string | no |  | Offset. The next_offset from a previous call, to get the next page. |

Output fields:

- `records`: Records
- `records[].id`: Record ID
- `records[].database_id`: Database ID
- `records[].created_at`: Created At (datetime)
- `records[].updated_at`: Updated At (datetime)
- `records[].fields`: Fields (an object whose keys vary)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_offset`: Next Offset
- `truncated_fields`: Truncated Fields

### `get_record_by_id`

**Get Record (by ID).** Gets one Bika.ai record, given its space, database and record IDs, with its cell values keyed by field name. Use Find Records (by ID) when you do not know the record ID. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The space ID (starts with "spc"). Use List Spaces to find it. |
| `database_id` | string | yes |  | Database ID. The database ID (starts with "dat"). Use List Databases to find it. |
| `record_id` | string | yes |  | Record ID. The record ID (starts with "rec"). |

Output fields:

- `id`: Record ID
- `database_id`: Database ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `fields`: Fields (an object whose keys vary)
- `truncated_fields`: Truncated Fields

### `create_record_by_id`

**Create Record (by ID).** Creates one record in a Bika.ai database, given its space and database IDs, from a JSON object keyed by exact field names (from Get Database Fields). Formats: text, URL, email and phone as strings; numbers as numbers; checkbox as true/false; single select as the option name; multi select as a list of option names; member as a list of member IDs; link as a list of record IDs; date as ISO 8601; date range as "start/end". Leave out read-only fields (formula, lookup, auto number, created/modified time and by). Each call adds a new record, so a retry creates a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The space ID (starts with "spc"). Use List Spaces to find it. |
| `database_id` | string | yes |  | Database ID. The database ID (starts with "dat"). Use List Databases to find it. |
| `fields` | JSON | yes | `{}` | Fields. Field values keyed by field name, for example {"Full name": "Ada Lovelace", "Stage": "Identify Needs"}. |

Output fields:

- `id`: Record ID
- `database_id`: Database ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `fields`: Fields (an object whose keys vary)
- `truncated_fields`: Truncated Fields

### `update_record_by_id`

**Update Record (by ID).** Updates one Bika.ai record, given its space, database and record IDs, from a JSON object keyed by exact field names; only the listed fields change and null clears a field. Value formats are the same as Create Record (by ID). Repeating the call with the same values leaves the record in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The space ID (starts with "spc"). Use List Spaces to find it. |
| `database_id` | string | yes |  | Database ID. The database ID (starts with "dat"). Use List Databases to find it. |
| `record_id` | string | yes |  | Record ID. The ID of the record to update (starts with "rec"). |
| `fields` | JSON | yes | `{}` | Fields. Field values to change, keyed by field name, for example {"Stage": "Close Deals", "Notes": null}. |

Output fields:

- `id`: Record ID
- `database_id`: Database ID
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `fields`: Fields (an object whose keys vary)
- `truncated_fields`: Truncated Fields

### `delete_record_by_id`

**Delete Record (by ID).** Permanently deletes one Bika.ai record, given its space, database and record IDs. There is no undo; confirm the record with Get Record (by ID) first if unsure. A retry after success fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The space ID (starts with "spc"). Use List Spaces to find it. |
| `database_id` | string | yes |  | Database ID. The database ID (starts with "dat"). Use List Databases to find it. |
| `record_id` | string | yes |  | Record ID. The ID of the record to delete (starts with "rec"). |

Output fields:

- `id`: Record ID
- `deleted`: Deleted (boolean)

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
