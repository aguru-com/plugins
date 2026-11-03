# Clay

Search Clay's GTM database, and move table rows in and out of Clay.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clay'
  version: '0.2.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Create a key from [Settings > Account > API keys (beta)](https://app.clay.com/workspaces/~/settings/account?accountTab=api-keys-beta), then paste it here.

## Actions

### `search_companies`

**Search Companies.** Search Clay's proprietary GTM database for companies matching structured filters (identifiers, industry, size, revenue, type, headquarters country, keyword). Use Search People instead when looking up individuals. Safe to retry; results may change between calls. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_identifiers` | array | no |  | Company Identifiers. Domains or LinkedIn company URLs to match exactly, e.g. "stripe.com". |
| `industries` | array | no |  | Industry. One of `"Abrasives and Nonmetallic Minerals Manufacturing"`, `"Accessible Architecture and Design"`, `"Accommodation Services"`, `"Accounting"`, `"Administration of Justice"`, `"Administrative and Support Services"`, `"Advertising Services"`, `"Agricultural Chemical Manufacturing"`, `"Agriculture, Construction, Mining Machinery Manufacturing"`, `"Air, Water, and Waste Program Management"`, `"Airlines and Aviation"`, `"Alternative Dispute Resolution"`, `"Alternative Medicine"`, `"Ambulance Services"`, `"Amusement Parks and Arcades"`, `"Animal Feed Manufacturing"`, `"Animation"`, `"Animation and Post-production"`, `"Apparel Manufacturing"`, `"Apparel and Fashion"`, `"Appliances, Electrical, and Electronics Manufacturing"`, `"Architectural and Structural Metal Manufacturing"`, `"Architecture and Planning"`, `"Armed Forces"`, `"Artists and Writers"` and 432 more. |
| `company_sizes` | array | no |  | Company Size. One of `"1"`, `"2-10"`, `"11-50"`, `"51-200"`, `"201-500"`, `"501-1,000"`, `"1,001-5,000"`, `"5,001-10,000"`, `"10,001+"`. |
| `annual_revenues` | array | no |  | Annual Revenue. One of `"0-500K"`, `"500K-1M"`, `"1M-5M"`, `"5M-10M"`, `"10M-25M"`, `"25M-75M"`, `"75M-200M"`, `"200M-500M"`, `"500M-1B"`, `"1B-10B"`, `"10B-100B"`, `"100B-1T"`. |
| `company_types` | array | no |  | Company Type. One of `"Privately Held"`, `"Public Company"`, `"Partnership"`, `"Self Employed"`, `"Non Profit"`, `"Educational"`, `"Self Owned"`, `"Government Agency"`. |
| `headquarters_countries` | array | no |  | Headquarters Country. One of `"Afghanistan"`, `"Albania"`, `"Algeria"`, `"Andorra"`, `"Angola"`, `"Anguilla"`, `"Antarctica"`, `"Antigua and Barbuda"`, `"Argentina"`, `"Armenia"`, `"Aruba"`, `"Australia"`, `"Austria"`, `"Azerbaijan"`, `"Bahamas"`, `"Bahrain"`, `"Bangladesh"`, `"Barbados"`, `"Belarus"`, `"Belgium"`, `"Belize"`, `"Benin"`, `"Bermuda"`, `"Bhutan"`, `"Bolivia"` and 195 more. |
| `headquarters_only` | boolean | no | `false` | Match headquarters location only. Only match the office marked as the company headquarters, not any office. |
| `keyword` | string | no |  | Description Keyword. Matches companies whose description contains this word or phrase. |
| `advanced_filter` | string | no |  | Advanced Filter (Clay query syntax). Optional raw filter, ANDed onto the filters above. See Clay's advanced search query syntax: https://developers.clay.com/searches/advanced. |
| `limit` | number | no | `20` | Max results. |

### `search_people`

**Search People.** Search Clay's proprietary GTM database for people matching structured filters (job title, seniority, employer, location, keyword). Use Search Companies instead when looking up companies rather than individuals. Safe to retry; results may change between calls. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `full_name_contains` | string | no |  | Full Name Contains. |
| `job_titles` | array | no |  | Job Title. Matches similar titles too (e.g. "VP of Sales" also matches "Head of Sales"). |
| `seniorities` | array | no |  | Seniority. One of `"Founder"`, `"Owner"`, `"Board Member"`, `"Partner"`, `"C-suite"`, `"VP"`, `"Director"`, `"Head"`, `"Manager"`, `"Senior"`, `"Mid-level"`, `"Entry"`, `"Intern / In Training"`, `"Unknown"`. |
| `tenure` | string | no | `"current"` | Employment Tenure. One of `"current"`, `"past"`, `"any"`. |
| `company_identifiers` | array | no |  | Employer (Domains or LinkedIn URLs). Matches people at these exact companies. Scoped by Employment Tenure above. |
| `company_name_contains` | string | no |  | Employer Name Contains. Fuzzy employer name match, use when you don't have a domain. Scoped by Employment Tenure above. |
| `location_cities` | array | no |  | City. |
| `location_states` | array | no |  | State / Province. |
| `location_countries` | array | no |  | Country. One of `"Afghanistan"`, `"Åland Islands"`, `"Albania"`, `"Algeria"`, `"American Samoa"`, `"Andorra"`, `"Angola"`, `"Anguilla"`, `"Antarctica"`, `"Antigua and Barbuda"`, `"Argentina"`, `"Armenia"`, `"Aruba"`, `"Australia"`, `"Austria"`, `"Azerbaijan"`, `"Bahamas"`, `"Bahrain"`, `"Bangladesh"`, `"Barbados"`, `"Belarus"`, `"Belgium"`, `"Belize"`, `"Benin"`, `"Bermuda"` and 222 more. |
| `location_regions` | array | no |  | Region. One of `"APAC"`, `"EMEA"`, `"LATAM"`, `"NAM"`. |
| `languages` | array | no |  | Languages. |
| `headline_contains` | string | no |  | Headline Contains. |
| `about_contains` | string | no |  | About Contains. |
| `advanced_filter` | string | no |  | Advanced Filter (Clay query syntax). Optional raw filter, ANDed onto the filters above. See Clay's advanced search query syntax: https://developers.clay.com/searches/advanced. |
| `limit` | number | no | `20` | Max results. |

### `send_row_to_table`

**Send Row to Clay Table.** Sends one row of data into a Clay table through that table's webhook source, where it runs the table's enrichment columns. Requires the table's webhook URL, which is generated in Clay on the table itself and must be an https address on clay.com, plus that source's authentication token when it has one. Clay only acknowledges receipt, so a successful call means the row was accepted, not that enrichment has finished. Whether re-sending the same data updates the existing row or appends another one depends on the table's own configuration, so treat a retry as capable of adding a duplicate row.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookUrl` | string | yes |  | Webhook URL. From the table's webhook source in Clay, the value in its Webhook URL panel. Only https addresses on clay.com are accepted. |
| `authToken` | string | no |  | Authentication Token. The token Clay showed when the source was created. Leave empty only if the source has none. Clay shows it once, so use Refresh auth token on the source if it was not saved. |
| `row` | object | yes |  | Row. The fields to send, as key-value pairs. Keys should match the source's Setup mapping panel. |

Output fields:

- `success`: Accepted (boolean)
- `response`: Clay Response

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
