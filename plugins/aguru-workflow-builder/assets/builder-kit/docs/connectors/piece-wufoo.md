# Wufoo

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wufoo'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your Wufoo API Key and Subdomain.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. |
| `subdomain` | string | yes |  | Subdomain. Your Wufoo account subdomain (e.g., for fishbowl.wufoo.com, use "fishbowl") |

## Actions

### `create-form-entry`

**Create Form Entry.** Submits a new entry to a specified Wufoo form, with values mapped to the form's dynamic fields. Use to programmatically fill and submit a form (e.g. record a lead or feedback response). Target the form by name or hash; not idempotent — each call creates a separate entry, and Wufoo rate-limits to 50 submissions per user per 5-minute window. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formIdentifier` | string | yes |  | Form Identifier (Name and Hash). Select a Wufoo form to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | yes | `"json"` | Response Format. Choose the format for the API response. JSON is recommended for most use cases. One of `"json"`, `"xml"`. |
| `formFields` | object | yes |  | Form Fields. Fill out the form fields with the data you want to submit. Field types and validation are automatically configured based on your form structure. An object whose fields depend on other inputs; the product shows them. |

### `find-form`

**Find Form by Name or Hash.** Retrieves a single Wufoo form's configuration and metadata (name, URL, entry limit, dates, and links to its fields/entries) by form name or hash. Use to look up form settings or resolve a form identifier before working with its entries; optionally include today's entry count. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formIdentifier` | string | yes |  | Form Identifier (Name and Hash). Select a Wufoo form to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | yes | `"json"` | Response Format. Choose the format for the API response. JSON is recommended for most integrations. One of `"json"`, `"xml"`. |
| `includeTodayCount` | boolean | no | `false` | Include Today Count. Include the number of entries submitted today in the response. Useful for daily analytics and monitoring. |

### `find-submission-by-field`

**Find Submission by Field Value.** Searches a Wufoo form's entries for those whose value in a given field matches a search value, with a selectable match type (exact, contains, starts/ends with, not-equal, not-contains). Use to look up a specific submission or check for duplicates before creating one. Requires the form identifier, the target field ID, and the value; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formIdentifier` | string | yes |  | Form Identifier (Name and Hash). Select a Wufoo form to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | yes | `"json"` | Response Format. Choose the format for the API response. JSON is recommended for most workflows. One of `"json"`, `"xml"`. |
| `fieldId` | string | yes |  | Field ID. The form field to search in (e.g., Field1 for first name, Field218 for email). You can find Field IDs in the form builder or via the Form Fields API. |
| `searchValue` | string | yes |  | Search Value. The value to search for in the specified field. For exact matches, use the complete value. |
| `matchType` | string | yes | `"Is_equal_to"` | Match Type. How to match the search value with field data. Choose based on your use case. One of `"Is_equal_to"`, `"Contains"`, `"Begins_with"`, `"Ends_with"`, `"Does_not_contain"`, `"Is_not_equal_to"`. |
| `maxResults` | number | no | `10` | Maximum Results. Limit the number of results returned (1-50). Lower numbers are faster for deduplication checks. |
| `sortOrder` | string | no | `"DESC"` | Sort Order. Order to return results. "Newest First" is best for finding recent duplicates. One of `"DESC"`, `"ASC"`. |
| `includeMetadata` | boolean | no | `false` | Include Metadata. Include additional information like submission date, IP address, and creation details. |

### `get-entry-details`

**Get Entry Details.** Retrieves entries from a Wufoo form, either a single entry by its Entry ID or a filtered/sorted/paginated list (up to two field filters combined with AND/OR). Use to fetch one known entry or to query and page through many submissions. Requires the form identifier; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formIdentifier` | string | yes |  | Form Identifier (Name and Hash). Select a Wufoo form to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | yes | `"json"` | Response Format. Choose the format for the API response. JSON is recommended for most integrations. One of `"json"`, `"xml"`. |
| `entryId` | number | no |  | Specific Entry ID (Optional). Enter a specific Entry ID to retrieve just that entry. Leave blank to get multiple entries with other filters. |
| `filterField` | string | no |  | Filter Field ID (Optional). The field ID to filter by (e.g., Field1, Field105, EntryId, DateCreated). Leave blank for no filtering. |
| `filterOperator` | string | no | `"Is_equal_to"` | Filter Operator. How to compare the filter value with the field data. One of `"Is_equal_to"`, `"Is_not_equal_to"`, `"Contains"`, `"Does_not_contain"`, `"Begins_with"`, `"Ends_with"`, `"Is_greater_than"`, `"Is_less_than"`, `"Is_on"`, `"Is_before"`, `"Is_after"`, `"Is_not_NULL"`. |
| `filterValue` | string | no |  | Filter Value (Optional). The value to filter by. For dates, use YYYY-MM-DD format or YYYY-MM-DD HH:MM:SS for specific times. |
| `additionalFilterField` | string | no |  | Second Filter Field (Optional). Add a second filter field for more complex queries. |
| `additionalFilterOperator` | string | no | `"Is_equal_to"` | Second Filter Operator. Operator for the second filter. One of `"Is_equal_to"`, `"Is_not_equal_to"`, `"Contains"`, `"Does_not_contain"`, `"Begins_with"`, `"Ends_with"`, `"Is_greater_than"`, `"Is_less_than"`, `"Is_on"`, `"Is_before"`, `"Is_after"`, `"Is_not_NULL"`. |
| `additionalFilterValue` | string | no |  | Second Filter Value (Optional). Value for the second filter. |
| `filterLogic` | string | no | `"AND"` | Filter Logic. How to combine multiple filters. Only applies when using multiple filters. One of `"AND"`, `"OR"`. |
| `sort` | string | no |  | Sort By Field ID (Optional). Sort results by field ID (e.g., EntryId, DateCreated, Field1). Leave blank for default order. |
| `sortDirection` | string | no | `"DESC"` | Sort Direction. Order to sort the results. One of `"DESC"`, `"ASC"`. |
| `pageStart` | number | no | `0` | Page Start. Starting entry number for pagination (0 = first entry). |
| `pageSize` | number | no | `25` | Page Size. Number of entries to return (maximum 100 per request). |
| `includeSystem` | boolean | no | `false` | Include System Fields. Include additional metadata like IP address, payment status, and completion status. |

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
