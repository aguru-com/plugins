# Salsa

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-salsa'
  version: '0.1.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API key acquired from your Salsa crm

## Actions

### `supporter-search`

**Get supporters.** Get all supporters after date. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes | `"https://api.salsalbs.org/api"` | API Url. API url acquired from your Salsa API. |
| `identifiers` | array | no |  | A list of ids to search for. Filters results based on the ID for the supporters. |
| `identifierType` | string | no | `"SEARCH_STRING"` | Identifier Type. Select the object. A value the product loads from the provider, such as an id; write the value itself. |
| `searchString` | string | no |  | The string to search for. The value to search for if identifierType is SEARCH_STRING. If you provide 2 words separated by a space, it will search first and last names respectively. A single search term will search first name, last name and email. |
| `modifiedFrom` | string | yes | `"1970-01-01T00:00:00.000Z"` | Starting Modified Date. Starting date time to base a search. |
| `modifiedTo` | string | no |  | Last Modified Date. End date time for a search. Optional and if not provided defaults to now. |
| `offset` | number | no | `0` | The starting index of items. Starting index to retrieve values from. This allows you to paginate larger results set. |
| `count` | number | no | `0` | The count of items. The maximum number of items to retrieve. |
| `includeCellOnly` | boolean | no | `true` | Include cell-phone. Should cell-phone only supporters be included in the results. |
| `includeNormal` | boolean | no | `true` | Include Normal. Should normal supporters be included in the results. |

### `supporter_upsert`

**Upsert Supporter on Email.** Upsert Supporter based on Email. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes | `"https://api.salsalbs.org/api"` | API Url. API url acquired from your Salsa API. |
| `supporters` | JSON | yes |  | Supporters (JSON Array). The Supporters JSON Array. |

### `offline_donation_upsert`

**Upsert Offline Donation.** Upsert Offline Donation based on Email. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes | `"https://api.salsalbs.org/api"` | API Url. API url acquired from your Salsa API. |
| `donations` | JSON | yes |  | Offline Donation (JSON Array). The Offline Donation JSON Array. |
