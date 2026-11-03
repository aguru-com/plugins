# Kizeo Forms

Create custom mobile forms

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-kizeo-forms'
  version: '0.5.1'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Kizeo Forms API Key

> To connect to Kizeo Forms, you need an API Token provided by their support team.

## Actions

### `get_data_definition`

**Get Data Definition.** Retrieve a single submitted data record (the answers) from a Kizeo Forms form by its form ID and data ID. Use to read back the contents of one specific submission. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `dataId` | number | yes |  | Data Id. |

### `push_data`

**Push Data.** Push a new prefilled data record into a Kizeo Forms form, optionally assigning it to a recipient user, so it appears in the mobile app. Use to send field values to be filled or completed on a device. Each call creates a separate record, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | yes |  | User. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Form. An object whose fields depend on other inputs; the product shows them. |

### `download_standard_pdf`

**Download Standard PDF.** Download the standard PDF rendering of one submitted Kizeo Forms data record, identified by form ID and data ID, returned as a base64 data URI. Use when you need the generated PDF document for a specific submission. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `dataId` | number | yes |  | Data Id. |

### `download_custom_export_in_its_original_format`

**Download custom export in its original format.** Download a generated export of one submitted Kizeo Forms data record (form ID plus data ID) as a base64 data URI, returning either the standard PDF or a configured custom export (e.g. Word) in its original format depending on the PDF toggle. Use to fetch a document for a submission; the custom-export mode requires an export ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `exportId` | string | yes |  | Export. A value the product loads from the provider, such as an id; write the value itself. |
| `exportInPdf` | boolean | yes |  | Export in PDF. |
| `dataId` | number | yes |  | Data Id. |

### `get_list_definition`

**Get List Definition.** Retrieve the definition (schema/structure) of a Kizeo Forms external list by its list ID, including its configured properties. Use to discover a list's columns before reading or writing items. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |

### `get_list_item`

**Get List Item.** Retrieve a single item from a Kizeo Forms external list by its list ID and item ID. Use when you already know the item ID and need that one record; to search or browse a list use Get All List Items instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Item Id. The ID of the item you want to retrieve from the list. |

### `get_all_list_items`

**Get All List Items.** List items from a Kizeo Forms external list by its list ID, with optional search pattern, pagination (offset/limit) and sorting; leaving the search empty returns all items while a search value filters to matches. Use to browse or look up items when you do not have a specific item ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Pattern to search. |
| `offset` | number | no |  | Offset. |
| `limit` | number | no |  | Limit. Max number of results to return. |
| `sort` | string | no |  | Sort. Target for sorting. |
| `direction` | string | no |  | Direction. Sorting: asc or desc. |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |

### `create_list_item`

**Create List Item.** Create a new item in a Kizeo Forms external list, identified by list ID, with a label and a set of property values. Use to add a row to a list. Each call appends a new item, so it is not idempotent; to change an existing item use Edit List Item. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `itemLabel` | string | yes |  | Item Label. Label for the new list item. |
| `properties` | object | yes |  | List. An object whose fields depend on other inputs; the product shows them. |

### `edit_list_item`

**Edit List Item.** Update an existing item in a Kizeo Forms external list, identified by list ID and item ID, overwriting its label and property values with the ones supplied. Use to modify a known item rather than add one. Idempotent: repeating the call with the same item ID and values leaves the item in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Item Id. The ID of the item to edit. |
| `itemLabel` | string | yes |  | Item Label. Label for the new list item. |
| `properties` | object | yes |  | List. An object whose fields depend on other inputs; the product shows them. |

### `delete_list_item`

**Delete List Item.** Delete a specific item from a Kizeo Forms external list by its list ID and item ID. Use to permanently remove a single list row. Idempotent on the end state: once the item is deleted, repeating the call leaves it absent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Item Id. The ID of the item to delete. |

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
