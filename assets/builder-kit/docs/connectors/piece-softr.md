# Softr

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-softr'
  version: '0.3.1'
```

Categories: CONTENT_AND_FILES, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Create a personal access token in Softr under **Workspace settings → API tokens** (see [Softr API setup](https://docs.softr.io/softr-api/softr-database-api/authorisation)). The token needs access to the workspace whose databases and apps you want to use.

## Actions

### `createAppUser`

**Create App User.** Creates a user account in a published Softr app. Needs the app domain, email and full name; the password is optional (Softr makes one if empty) and it can also return a magic login link. Returns the new user. A second call with the same email fails because the user already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the new user. |
| `full_name` | string | yes |  | Name. The full name of the new user. |
| `password` | string | no |  | Password. The password for the new user. Leave empty to let Softr generate one. |
| `domain` | string | yes |  | Domain. Domain of the published Softr app to add the user to. |
| `generate_magic_link` | boolean | no | `false` | Generate Magic Link. If checked, a magic link will be generated for the user. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `user`: User
- `user.status`: HTTP Status (number)
- `user.body`: Softr User
- `user.body.email`: Email (email)
- `user.body.full_name`: Full Name
- `user.body.magic_link`: Magic Link (url)
- `user.body.created`: Created
- `user.body.updated`: Updated

### `createDatabaseRecord`

**Create Database Record.** Adds one new record to a Softr table using the table field form. Empty values are skipped. Each call adds a new record, so a retry makes a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `fields`: Fields (an object whose keys vary)

### `deleteAppUser`

**Delete App User.** Permanently deletes a user from a published Softr app. Needs the app domain and user email. This cannot be undone; to only block login, use Deactivate App User. A second call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | User Email. The email address of the app user. |
| `domain` | string | yes |  | Softr Domain. The domain or subdomain of the published Softr app, e.g. myapp.softr.app or portal.example.com. |

### `deleteDatabaseRecord`

**Delete Database Record.** Permanently deletes one record from a Softr table by its record ID (from Find Records or the trigger). This cannot be undone. A second call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The ID of the record, e.g. from the Find Records action or the New Database Record trigger. |

### `findDatabaseRecord`

**Find Database Record.** Finds the first record in a Softr table where one field equals a value. Returns found (true or false) and the record. For several conditions, other operators or many results, use Find Records. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `fieldId` | string | yes |  | Field. A value the product loads from the provider, such as an id; write the value itself. |
| `fieldValue` | string | yes |  | Field Value. The value to match exactly. Use "true" or "false" for checkbox fields. |

Output fields:

- `found`: Found (boolean)
- `data`: Record
- `data.id`: Record ID
- `data.createdAt`: Created At (datetime)
- `data.updatedAt`: Updated At (datetime)
- `data.fields`: Fields (an object whose keys vary)

### `updateDatabaseRecord`

**Update Database Record.** Changes some fields of one existing Softr record by its record ID, using the table field form. Only the given fields change; empty values are skipped, so it cannot clear a field. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The ID of the record, e.g. from the Find Records action or the New Database Record trigger. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `fields`: Fields (an object whose keys vary)

### `getDatabaseRecord`

**Get Database Record.** Gets one record from a Softr table by its record ID, with values keyed by column name. To look records up by value, use Find Records. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The ID of the record, e.g. from the Find Records action or the New Database Record trigger. |

Output fields:

- `id`: Record ID
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `fields`: Fields (an object whose keys vary)

### `findRecords`

**Find Records.** Searches a Softr table with one or more conditions (equals, contains, greater than, between, one of, is empty, ...) joined by AND or OR, with optional sorting. Give fields by name or ID; leave conditions empty to list the whole table. For between, put the upper limit in Upper Bound; for one of, separate values with commas. Returns up to 200 records plus the total count; use Offset for the next page. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `conditions` | array | no |  | Conditions. Each condition compares one field. Leave empty to return all records. Each item: { `field`, `operator`, `value`?, `upperBound`? }. |
| `matchType` | string | yes | `"AND"` | Match. Whether records must match all conditions or any of them. One of `"AND"`, `"OR"`. |
| `sortField` | string | no |  | Sort By Field (name or ID). A field name or ID, or created_at / updated_at. |
| `sortDirection` | string | no | `"ASC"` | Sort Direction. One of `"ASC"`, `"DESC"`. |
| `limit` | number | no | `50` | Limit. Maximum number of records to return (1-200). |
| `offset` | number | no | `0` | Offset. Number of matching records to skip, for paging through results. |

Output fields:

- `found`: Found (boolean)
- `count`: Records Returned (number)
- `total`: Total Matches (number)
- `offset`: Offset (number)
- `hasMore`: Has More (boolean)
- `records`: Records
- `records[].id`: Record ID
- `records[].createdAt`: Created At (datetime)
- `records[].updatedAt`: Updated At (datetime)
- `records[].fields`: Fields (an object whose keys vary)

### `listDatabases`

**List Databases.** Lists every Softr database the API key can access, with ID, name and table count. Call this first to get the database ID that the other actions need. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `databases`: Databases
- `databases[].id`: Database ID
- `databases[].name`: Database Name
- `databases[].description`: Description
- `databases[].workspaceId`: Workspace ID
- `databases[].tablesCount`: Tables Count (number)
- `databases[].createdAt`: Created At (datetime)
- `databases[].updatedAt`: Updated At (datetime)

### `listTables`

**List Tables.** Lists the tables in a Softr database with their IDs, names and columns. Agents: Get Database Schema (Agent) returns the same in a simpler shape, with select options. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `count`: Count (number)
- `tables`: Tables
- `tables[].id`: Table ID
- `tables[].name`: Table Name
- `tables[].description`: Description
- `tables[].primaryFieldId`: Primary Field ID
- `tables[].fields`: Fields
- `tables[].fields[].id`: Field ID
- `tables[].fields[].name`: Field Name
- `tables[].fields[].type`: Type
- `tables[].fields[].readonly`: Read Only (boolean)
- `tables[].fields[].required`: Required (boolean)
- `tables[].fields[].allowMultipleEntries`: Allows Multiple Values (boolean)
- `tables[].createdAt`: Created At (datetime)
- `tables[].updatedAt`: Updated At (datetime)

### `getTable`

**Get Table.** Gets one Softr table with all its columns: field IDs, names, types, select options, read-only and required. Use it before writing or searching records; agents can use Get Database Schema (Agent) to see every table in one call. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `primaryFieldId`: Primary Field ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Type
- `fields[].readonly`: Read Only (boolean)
- `fields[].required`: Required (boolean)
- `fields[].allowMultipleEntries`: Allows Multiple Values (boolean)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `activateAppUser`

**Activate App User.** Lets a deactivated user of a published Softr app log in again. Needs the app domain and the user email. Undoes Deactivate App User. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | User Email. The email address of the app user. |
| `domain` | string | yes |  | Softr Domain. The domain or subdomain of the published Softr app, e.g. myapp.softr.app or portal.example.com. |

Output fields:

- `success`: Success (boolean)
- `email`: Email (email)
- `message`: Message

### `deactivateAppUser`

**Deactivate App User.** Stops a user of a published Softr app from logging in but keeps the account, which then no longer counts toward the plan user limit. Needs the app domain and user email. Prefer this over Delete App User when access may come back; undo it with Activate App User. Safe to retry. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | User Email. The email address of the app user. |
| `domain` | string | yes |  | Softr Domain. The domain or subdomain of the published Softr app, e.g. myapp.softr.app or portal.example.com. |

Output fields:

- `success`: Success (boolean)
- `email`: Email (email)
- `message`: Message

### `inviteAppUser`

**Invite App User.** Sends a Softr invitation email to an existing user of a published Softr app and marks them Invited. Needs the app domain and user email; create the user first with Create App User. Each call sends another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | User Email. The email address of the app user. |
| `domain` | string | yes |  | Softr Domain. The domain or subdomain of the published Softr app, e.g. myapp.softr.app or portal.example.com. |

Output fields:

- `success`: Success (boolean)
- `email`: Email (email)
- `message`: Message

### `generateMagicLink`

**Generate Magic Link.** Creates a magic login link for an existing user of a published Softr app and returns it, so you can send it another way. Needs the app domain and user email. Each call makes a new link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | User Email. The email address of the app user. |
| `domain` | string | yes |  | Softr Domain. The domain or subdomain of the published Softr app, e.g. myapp.softr.app or portal.example.com. |

Output fields:

- `email`: Email (email)
- `magicLink`: Magic Link (url)

### `getDatabase`

**Get Database.** Gets one Softr database by ID: name, description, workspace ID and table count. Use List Databases to find the ID. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Database ID
- `name`: Database Name
- `description`: Description
- `workspaceId`: Workspace ID
- `tablesCount`: Tables Count (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `listTableViews`

**List Table Views.** Lists the views of a Softr table, with view IDs and names. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `count`: Count (number)
- `views`: Views
- `views[].id`: View ID
- `views[].tableId`: Table ID
- `views[].name`: View Name
- `views[].description`: Description
- `views[].createdAt`: Created At (datetime)
- `views[].updatedAt`: Updated At (datetime)

### `createDatabase`

**Create Database.** Creates a new, empty Softr database and returns its ID. Needs the workspace ID, which the user copies from the Softr Studio URL (no API can look it up). Add tables next with Create Table. Each call creates another database. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace ID. Copy it from the Softr Studio URL, after /workspaces/. |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |

Output fields:

- `id`: Database ID
- `name`: Database Name
- `description`: Description
- `workspaceId`: Workspace ID
- `tablesCount`: Tables Count (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `updateDatabase`

**Update Database.** Renames a Softr database and/or changes its description. Only the values you give change; the API cannot clear a description. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Name. Leave empty to keep the current name. |
| `description` | string | no |  | New Description. Leave empty to keep the current description. |

Output fields:

- `id`: Database ID
- `name`: Database Name
- `description`: Description
- `workspaceId`: Workspace ID
- `tablesCount`: Tables Count (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `deleteDatabase`

**Delete Database.** Permanently deletes a Softr database. With Force Delete it also deletes all its tables and records; without it, Softr refuses while the database still has tables. Only use when the user clearly asked for it: this cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `force` | boolean | no | `false` | Force Delete (deletes all tables and records). Without this, Softr only deletes an empty database. |

### `createTable`

**Create Table.** Creates a table in a Softr database with the columns you list (name, type, optional JSON options). Primary Field Name picks the primary column; otherwise the first one is used. Returns the table with its field IDs. Each call creates another table. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Table Name. |
| `description` | string | no |  | Description. |
| `primaryFieldName` | string | no |  | Primary Field Name. Additional field to use as the primary field. Defaults to the first. |
| `fields` | array | no |  | Additional Fields. Each item: { `name`, `type`, `options`? }. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `primaryFieldId`: Primary Field ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Type
- `fields[].readonly`: Read Only (boolean)
- `fields[].required`: Required (boolean)
- `fields[].allowMultipleEntries`: Allows Multiple Values (boolean)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `updateTable`

**Update Table.** Renames a Softr table and/or changes its description (use Update Table Field for columns). Only the values you give change; tick Clear Description to blank it. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Name. Leave empty to keep the current name. |
| `description` | string | no |  | New Description. Leave empty to keep the current description. |
| `clearDescription` | boolean | no | `false` | Clear Description. |

Output fields:

- `id`: Table ID
- `name`: Table Name
- `description`: Description
- `primaryFieldId`: Primary Field ID
- `fields`: Fields
- `fields[].id`: Field ID
- `fields[].name`: Field Name
- `fields[].type`: Type
- `fields[].readonly`: Read Only (boolean)
- `fields[].required`: Required (boolean)
- `fields[].allowMultipleEntries`: Allows Multiple Values (boolean)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `deleteTable`

**Delete Table.** Permanently deletes a Softr table. With Force Delete it also deletes all its records; without it, Softr refuses while the table still has records. Only use when the user clearly asked for it: this cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `force` | boolean | no | `false` | Force Delete (deletes all records). Without this, Softr only deletes an empty table. |

### `createTableField`

**Create Table Field.** Adds a column to a Softr table. Needs a name and a Softr field type; options are optional JSON, e.g. select choices or {"precision":"DATE"} for a date-only DATETIME. Returns the new field with its ID. Each call adds another column. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Field Name. |
| `type` | string | yes |  | Field Type. One of `"SINGLE_LINE_TEXT"`, `"LONG_TEXT"`, `"NUMBER"`, `"CURRENCY"`, `"PERCENT"`, `"RATING"`, `"CHECKBOX"`, `"DATETIME"`, `"DURATION"`, `"EMAIL"`, `"URL"`, `"PHONE"`, `"SELECT"`, `"ATTACHMENT"`, `"LINKED_RECORD"`, `"USER"`, `"LOOKUP"`, `"ROLLUP"`, `"FORMULA"`, `"CREATED_AT"`, `"UPDATED_AT"`, `"CREATED_BY"`, `"UPDATED_BY"`, `"AUTONUMBER"`, `"RECORD_ID"`. |
| `options` | JSON | no |  | Options. Type-specific JSON options. LINKED_RECORD, LOOKUP, ROLLUP need them. |

Output fields:

- `id`: Field ID
- `name`: Field Name
- `type`: Type
- `readonly`: Read Only (boolean)
- `required`: Required (boolean)
- `allowMultipleEntries`: Allows Multiple Values (boolean)
- `description`: Description
- `options`: Options
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `getTableField`

**Get Table Field.** Gets one column of a Softr table by field ID: name, type, options (such as select choices), read-only and required. To see all columns at once, use Get Table. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `fieldId` | string | yes |  | Field. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Field ID
- `name`: Field Name
- `type`: Type
- `readonly`: Read Only (boolean)
- `required`: Required (boolean)
- `allowMultipleEntries`: Allows Multiple Values (boolean)
- `description`: Description
- `options`: Options
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `updateTableField`

**Update Table Field.** Changes a column of a Softr table: name, type and/or JSON options. Empty inputs keep the current value. New options replace all existing options, e.g. the full list of select choices. Changing the type can convert or drop data, so only do it when the user asked. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `fieldId` | string | yes |  | Field. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | New Name. Leave empty to keep the current name. |
| `type` | string | no |  | Field Type. One of `"SINGLE_LINE_TEXT"`, `"LONG_TEXT"`, `"NUMBER"`, `"CURRENCY"`, `"PERCENT"`, `"RATING"`, `"CHECKBOX"`, `"DATETIME"`, `"DURATION"`, `"EMAIL"`, `"URL"`, `"PHONE"`, `"SELECT"`, `"ATTACHMENT"`, `"LINKED_RECORD"`, `"USER"`, `"LOOKUP"`, `"ROLLUP"`, `"FORMULA"`, `"CREATED_AT"`, `"UPDATED_AT"`, `"CREATED_BY"`, `"UPDATED_BY"`, `"AUTONUMBER"`, `"RECORD_ID"`. |
| `options` | JSON | no |  | New Options. Leave empty to keep. When set, replaces all options and choices. |

Output fields:

- `id`: Field ID
- `name`: Field Name
- `type`: Type
- `readonly`: Read Only (boolean)
- `required`: Required (boolean)
- `allowMultipleEntries`: Allows Multiple Values (boolean)
- `description`: Description
- `options`: Options
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `deleteTableField`

**Delete Table Field.** Permanently deletes a column from a Softr table, including its value in every record. Only use when the user clearly asked for it: this cannot be undone. A second call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. Select the database. A value the product loads from the provider, such as an id; write the value itself. |
| `tableId` | string | yes |  | Table ID. Select the table. A value the product loads from the provider, such as an id; write the value itself. |
| `fieldId` | string | yes |  | Field. A value the product loads from the provider, such as an id; write the value itself. |

### `get_database_schema_ai`

**Get Database Schema (Agent).** Returns every table in a Softr database with all its columns: field ID, column name, type, required, read-only and select options (ID and label). Call this first, before you create, update or search records. Needs the database ID from List Databases. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. The Softr database ID. Get it from List Databases. |

Output fields:

- `databaseId`: Database ID
- `tableCount`: Table Count (number)
- `tables`: Tables
- `tables[].id`: Table ID
- `tables[].name`: Table Name
- `tables[].description`: Description
- `tables[].primaryFieldId`: Primary Field ID
- `tables[].fields`: Fields
- `tables[].fields[].id`: Field ID
- `tables[].fields[].name`: Column Name
- `tables[].fields[].type`: Type
- `tables[].fields[].required`: Required (boolean)
- `tables[].fields[].readonly`: Read Only (boolean)
- `tables[].fields[].allowMultipleEntries`: Allows Multiple Values (boolean)
- `tables[].fields[].options`: Select Options
- `tables[].fields[].options[].id`: Option ID
- `tables[].fields[].options[].label`: Option Label

### `create_record_ai`

**Create Record (Agent).** Adds one new record to a Softr table. Agents: use this instead of Create Database Record. Needs the database ID, the table name or ID, and a JSON object of values keyed by column name or field ID (see Get Database Schema (Agent)). Returns the new record with values keyed by column name. Each call adds a new record, so a retry makes a duplicate; use Upsert Record (Agent) to avoid that. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. The Softr database ID. Get it from List Databases. |
| `table` | string | yes |  | Table (name or ID). The table name or table ID. Get both from Get Database Schema (Agent). |
| `fields` | JSON | yes |  | Fields. A JSON object keyed by column name or field ID, e.g. {"Name": "Jane", "Age": 30, "Status": "Open"}. Select columns take the option label or ID; multi-select columns take a list. |

Output fields:

- `id`: Record ID
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `fields`: Fields (an object whose keys vary)

### `update_record_ai`

**Update Record (Agent).** Changes the given columns of one existing Softr record; other columns stay as they are. Agents: use this instead of Update Database Record. Needs the database ID, the table name or ID, the record ID (from Find Records) and a JSON object of new values keyed by column name or field ID. Empty values are skipped, so it cannot clear a column. Returns the updated record. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. The Softr database ID. Get it from List Databases. |
| `table` | string | yes |  | Table (name or ID). The table name or table ID. Get both from Get Database Schema (Agent). |
| `recordId` | string | yes |  | Record ID. The ID of the record to change. Get it from Find Records. |
| `fields` | JSON | yes |  | Fields. A JSON object keyed by column name or field ID, e.g. {"Name": "Jane", "Age": 30, "Status": "Open"}. Select columns take the option label or ID; multi-select columns take a list. |

Output fields:

- `id`: Record ID
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `fields`: Fields (an object whose keys vary)

### `upsert_record_ai`

**Upsert Record (Agent).** Finds the record whose key column equals the key value in Fields (matching ignores letter case). If none exists it creates one; if one exists it updates it; if several match it stops with an error and changes nothing. Use this to avoid duplicates, e.g. key on Email, but run upserts for the same key one at a time: Softr has no atomic create-if-absent, so two parallel calls with the same new key can both create a record. Needs the database ID, the table name or ID, the key column, and Fields including the key value. Returns {action: "created" or "updated", record}. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `databaseId` | string | yes |  | Database ID. The Softr database ID. Get it from List Databases. |
| `table` | string | yes |  | Table (name or ID). The table name or table ID. Get both from Get Database Schema (Agent). |
| `keyField` | string | yes |  | Key Column (name or ID). The column that identifies the record, e.g. Email. |
| `fields` | JSON | yes |  | Fields. A JSON object keyed by column name or field ID, e.g. {"Name": "Jane", "Age": 30, "Status": "Open"}. Select columns take the option label or ID; multi-select columns take a list. |

Output fields:

- `action`: Action
- `record`: Record
- `record.id`: Record ID
- `record.createdAt`: Created At (datetime)
- `record.updatedAt`: Updated At (datetime)
- `record.fields`: Fields (an object whose keys vary)

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
