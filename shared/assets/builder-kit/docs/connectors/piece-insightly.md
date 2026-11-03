# Insightly

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-insightly'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Insightly API key. You can find this in your Insightly account under User Settings > API Keys.

## Actions

### `create_record`

**Create Record.** Creates a new record in a chosen Insightly CRM object (Contact, Lead, Opportunity, Organization, Project, Task, Event, Product, or Quote), with field values supplied per the selected object type. Use to add a new entity to Insightly. Not idempotent: each call creates another record. Requires the Insightly pod (e.g. "na1") that matches your account region. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pod` | string | yes | `"na1"` | Pod. Your Insightly pod (e.g., "na1", "eu1"). Find this in your API URL: https://api.{pod}.insightly.com. |
| `objectName` | string | yes |  | Object Type. Select the type of record to create. One of `"Contacts"`, `"Leads"`, `"Opportunities"`, `"Organisations"`, `"Projects"`, `"Tasks"`, `"Events"`, `"Products"`, `"Quotations"`. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `update_record`

**Update Record.** Updates field values on an existing record in a chosen Insightly CRM object (Contact, Lead, Opportunity, etc.), identified by its record ID. Use to modify an entity that already exists. Sending the same field values repeatedly leaves the record in the same state, but the call always overwrites the targeted fields. Requires the matching Insightly pod (e.g. "na1") and the record ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pod` | string | yes | `"na1"` | Pod. Your Insightly pod (e.g., "na1", "eu1"). Find this in your API URL: https://api.{pod}.insightly.com. |
| `objectName` | string | yes |  | Object Type. Select the type of object that contains the record you want to update. One of `"Contacts"`, `"Leads"`, `"Opportunities"`, `"Organisations"`, `"Projects"`, `"Tasks"`, `"Events"`, `"Products"`, `"Quotations"`. |
| `recordId` | string | yes |  | Record ID. Select the record to update. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. The new field values to update. An object whose fields depend on other inputs; the product shows them. |

### `get_record`

**Get Record.** Retrieves a single record by its ID from a chosen Insightly CRM object (Contact, Lead, Opportunity, etc.). Use to look up the full details of one known entity. Read-only and idempotent. Requires the matching Insightly pod (e.g. "na1") and the record ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pod` | string | yes | `"na1"` | Pod. Your Insightly pod (e.g., "na1", "eu1"). Find this in your API URL: https://api.{pod}.insightly.com. |
| `objectName` | string | yes |  | Object Type. Select the type of record to retrieve. One of `"Contacts"`, `"Leads"`, `"Opportunities"`, `"Organisations"`, `"Projects"`, `"Tasks"`, `"Events"`, `"Products"`, `"Quotations"`. |
| `recordId` | string | yes |  | Record ID. Select the record to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_record`

**Delete Record.** Permanently deletes a single record by its ID from a chosen Insightly CRM object (Contact, Lead, Opportunity, etc.). Use to remove an entity. Destructive: repeating the call on the same ID after deletion errors with a not-found, so treat as not idempotent. Requires the matching Insightly pod (e.g. "na1") and the record ID. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pod` | string | yes | `"na1"` | Pod. Your Insightly pod (e.g., "na1", "eu1"). Find this in your API URL: https://api.{pod}.insightly.com. |
| `objectName` | string | yes |  | Object Type. Select the type of record to delete. One of `"Contacts"`, `"Leads"`, `"Opportunities"`, `"Organisations"`, `"Projects"`, `"Tasks"`, `"Events"`, `"Products"`, `"Quotations"`. |
| `recordId` | string | yes |  | Record ID. Select the record to delete. A value the product loads from the provider, such as an id; write the value itself. |

### `find_records`

**Find Records.** Searches a chosen Insightly CRM object (Contact, Lead, Opportunity, etc.) for records where a given field matches a value, optionally capped by a limit. Use to locate records by a known field value (e.g. an email or name) rather than by ID. Read-only and idempotent. Requires the matching Insightly pod (e.g. "na1"), the field to search, and the value to match. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pod` | string | yes | `"na1"` | Pod. Your Insightly pod (e.g., "na1", "eu1"). |
| `objectName` | string | yes |  | Object Type. Select the type of records to find. One of `"Contacts"`, `"Leads"`, `"Opportunities"`, `"Organisations"`, `"Projects"`, `"Tasks"`, `"Events"`, `"Products"`, `"Quotations"`. |
| `fieldName` | string | yes |  | Field Name. Select the field to search by. A value the product loads from the provider, such as an id; write the value itself. |
| `fieldValue` | string | yes |  | Field Value. The value to search for. |
| `top` | number | no |  | Limit. Maximum number of records to return. |
