# Supabase

The open-source Firebase alternative

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-supabase'
  version: '0.4.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> ## Supabase Connection Setup
>
> ### 1. Get Your Project URL
> - Go to your [Supabase Dashboard](https://supabase.com/dashboard)
> - Select your project
> - Go to **Settings** → **API**
> - Copy the **Project URL** (format: `https://your-project-ref.supabase.co`)
>
> ### 2. Get Your API Key
> Choose the appropriate key based on your use case:
>
> **For Actions (Database Operations):**
> - Use **Service Role Key** (secret) for server-side operations
> - Has full access to bypass Row Level Security (RLS)
>
> **For Triggers (Webhooks):**
> - Use **Anonymous Key** (public) if your webhooks don't need elevated permissions
> - Use **Service Role Key** for elevated permissions
>
> **Security Note:** Keep your Service Role Key secret - it bypasses all RLS policies.
>
> Find your keys in **Settings** → **API** → **Project API keys**

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Project URL. Your Supabase project URL (e.g., https://your-project-ref.supabase.co) |
| `apiKey` | string | yes |  | API Key. Service Role Key (for actions) or Anonymous Key (for basic triggers) |

## Actions

### `upload-file`

**Upload File.** Uploads a file (provided as base64 or a URL) to a Supabase Storage bucket at a given path, then returns its public URL. Use to persist binary content (images, documents, exports) in object storage rather than a database table. Not idempotent: each call writes the object and will error if the path already exists in the bucket. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. The bucket's name, as shown in Storage. |
| `filePath` | string | yes |  | File Path. Where to save it in the bucket, including the file name. |
| `file` | file | yes |  | File. A file from an earlier step, or a URL to download. Files are not supported; an action that needs one fails. |

Output fields:

- `publicUrl`: Public URL (url)

### `create_row`

**Create Row.** Inserts a new row into a Postgres table via the Supabase REST API, mapping provided field values to columns. Use to add a record when you do not need to match or replace an existing one (use Upsert Row for insert-or-update). Not idempotent: each call appends another row and will error on unique-constraint, foreign-key, or not-null violations. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_name` | string | yes |  | Table. Only tables exposed through the Supabase Data API are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `row_data` | object | yes |  | Row Data. Pick a table to load one field per column. An object whose fields depend on other inputs; the product shows them. |
| `return_row` | boolean | no | `true` | Return Created Row. When off, the step outputs nothing. |

Output fields:

- `[].title`: Title
- `[].status`: Status
- `[].priority`: Priority (number)
- `[].is_done`: Is Done (boolean)
- `[].tags`: Tags
- `[].due_date`: Due Date (date)
- `[].created_at`: Created At (datetime)
- `[].id`: ID

### `update_row`

**Update Row.** Updates existing rows in a Supabase table by applying the same field values to every row matching a filter (equals, in-list, or greater-than on a chosen column). Use to modify records you can identify by a filter; it does not create rows that do not exist. Idempotent: re-running with the same filter and values leaves the matched rows in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_name` | string | yes |  | Table. Only tables exposed through the Supabase Data API are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `filter_column` | string | yes |  | Column. Rows are matched on this column. A value the product loads from the provider, such as an id; write the value itself. |
| `filter_type` | string | yes | `"eq"` | Condition. How the column is compared with the value. One of `"eq"`, `"in"`, `"gt"`. |
| `filter_value` | string | no |  | Value. Used by every condition except Is one of. |
| `filter_values` | array | no |  | Values. Used only by Is one of. |
| `update_data` | object | yes |  | New Values. Pick a table to load one field per column. An object whose fields depend on other inputs; the product shows them. |
| `count_updated` | boolean | no | `false` | Count Updated Rows. Adds the number of updated rows to the output. |
| `return_updated` | boolean | no | `false` | Return Updated Rows. Adds the updated rows to the output. |

Output fields:

- `success`: Success (boolean)
- `updated_count`: Updated Count (number)
- `updated_rows`: Updated Rows
- `updated_rows[].title`: Title
- `updated_rows[].status`: Status
- `updated_rows[].id`: ID
- `updated_rows[].priority`: Priority (number)
- `updated_rows[].is_done`: Is Done (boolean)
- `updated_rows[].tags`: Tags
- `updated_rows[].due_date`: Due Date (date)
- `updated_rows[].created_at`: Created At (datetime)

### `upsert_row`

**Upsert Row.** Inserts a row into a Supabase table, or updates the existing row when it collides on the specified unique conflict column. Use when you want to write a record without first checking whether it exists. Idempotent: requires a unique conflict column, and re-running with the same data converges to the same single row. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_name` | string | yes |  | Table. Only tables exposed through the Supabase Data API are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `on_conflict` | string | yes |  | Match Column. A unique column. Rows with the same value here are updated. A value the product loads from the provider, such as an id; write the value itself. |
| `row_data` | object | yes |  | Row Data. Pick a table to load one field per column. An object whose fields depend on other inputs; the product shows them. |
| `count_upserted` | boolean | no | `false` | Count Upserted Rows. Adds the number of written rows to the output. |
| `return_upserted` | boolean | no | `false` | Return Upserted Rows. Adds the written rows to the output. |

Output fields:

- `success`: Success (boolean)
- `upserted_count`: Upserted Count (number)
- `upserted_rows`: Upserted Rows
- `upserted_rows[].title`: Title
- `upserted_rows[].status`: Status
- `upserted_rows[].id`: ID
- `upserted_rows[].priority`: Priority (number)
- `upserted_rows[].is_done`: Is Done (boolean)
- `upserted_rows[].created_at`: Created At (datetime)

### `delete_rows`

**Delete Rows.** Deletes rows from a Supabase table that match a single filter condition (equals, not-equals, in-list, range comparisons, null checks, or LIKE pattern on a chosen column). Use to remove records you can identify by one filter; a filter is required so it will not blindly clear a table. Idempotent: re-running deletes nothing further once the matching rows are gone. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_name` | string | yes |  | Table. Only tables exposed through the Supabase Data API are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `filter_column` | string | yes |  | Column. Rows are matched on this column. A value the product loads from the provider, such as an id; write the value itself. |
| `filter_type` | string | yes | `"in"` | Condition. How the column is compared with the value. One of `"eq"`, `"neq"`, `"in"`, `"gt"`, `"gte"`, `"lt"`, `"lte"`, `"is_null"`, `"is_not_null"`, `"like"`, `"ilike"`. |
| `filter_value` | string | no |  | Value. Not used by Is one of, Is null or Is not null. |
| `filter_values` | array | no |  | Values. Used only by Is one of. |
| `count_deleted` | boolean | no | `false` | Count Deleted Rows. Adds the number of deleted rows to the output. |
| `return_deleted` | boolean | no | `false` | Return Deleted Rows. Adds the deleted rows to the output. |

Output fields:

- `success`: Success (boolean)
- `deleted_count`: Deleted Count (number)
- `deleted_rows`: Deleted Rows
- `deleted_rows[].title`: Title
- `deleted_rows[].status`: Status
- `deleted_rows[].priority`: Priority (number)
- `deleted_rows[].is_done`: Is Done (boolean)
- `deleted_rows[].due_date`: Due Date (date)
- `deleted_rows[].created_at`: Created At (datetime)
- `deleted_rows[].id`: ID

### `search_rows`

**Search Rows.** Queries rows from a Supabase table, applying an optional list of column filters (equality, comparison, LIKE, in-list, JSON containment) with column selection and page-based pagination. Use to look up or list records before acting on them, or to fetch a specific subset. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_name` | string | yes |  | Table. Only tables exposed through the Supabase Data API are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `columns` | string | no |  | Columns. Comma-separated. Leave empty to return every column. |
| `filters` | array | no |  | Filters. A row is returned only if it matches every filter. Each item: { `field`, `operator`, `value` }. |
| `page` | number | no | `1` | Page. Starts at 1. |
| `pageSize` | number | no | `20` | Rows Per Page. Between 1 and 1000. |
| `countOption` | string | no |  | Total Count. Leave empty to skip counting; count is then 0. One of `"exact"`, `"planned"`, `"estimated"`. |

Output fields:

- `data`: Rows
- `data[].title`: Title
- `data[].status`: Status
- `data[].id`: ID
- `data[].priority`: Priority (number)
- `data[].is_done`: Is Done (boolean)
- `data[].tags`: Tags
- `data[].due_date`: Due Date (date)
- `data[].created_at`: Created At (datetime)
- `count`: Count (number)
- `page`: Page (number)
- `pageSize`: Page Size (number)
- `total_pages`: Total Pages (number)
- `range`: Range
- `range.from`: From (number)
- `range.to`: To (number)
- `range.returned`: Returned (number)

### `list_tables`

**List Tables.** Lists the names of all public tables and views in the connected Supabase database. Use this first to discover which tables exist before reading or writing rows. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].name`: Name

### `get_table_schema`

**Get Table Schema.** Returns the column definitions (name, data type, format, description) for a named Supabase table. Use to learn a table's structure before constructing inserts, updates, or filters. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table_name` | string | yes |  | Table. Only tables exposed through the Supabase Data API are listed. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].column_name`: Column Name
- `[].data_type`: Data Type
- `[].format`: Format
- `[].description`: Description

### `create_bucket`

**Create Storage Bucket.** Creates a new Storage bucket with a given name, either public (files reachable by direct URL) or private (files require a signed URL or download). Use before uploading files to a bucket that does not exist yet. Not idempotent: creating a bucket with a name that already exists errors. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Bucket Name. Must be unique in the project. |
| `public` | boolean | no | `false` | Public. Whether files in this bucket are publicly readable by URL. |
| `fileSizeLimit` | number | no |  | Max File Size. In bytes. Empty uses the project's upload limit. |

Output fields:

- `name`: Name

### `delete_bucket`

**Delete Storage Bucket.** Permanently deletes a Storage bucket by name. The bucket must already be empty (delete its files first) or the call fails. Use only once you have confirmed the bucket name and that it should be removed entirely. Idempotent: deleting an already-deleted bucket errors without further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Bucket. The bucket's name, as shown in Storage. |

Output fields:

- `success`: Success (boolean)

### `list_buckets`

**List Storage Buckets.** Lists every Storage bucket in the connected Supabase project, with each bucket's visibility (public/private) and file size limit. Use to discover which buckets exist before uploading, listing, or downloading files. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `[].id`: ID
- `[].name`: Name
- `[].public`: Public (boolean)
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)

### `list_files`

**List Files in Bucket.** Lists files and folders inside a Storage bucket, optionally scoped to a folder path. Use to discover what's already stored before downloading, deleting, or generating a link for a file. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. The bucket's name, as shown in Storage. |
| `path` | string | no |  | Folder Path. Leave empty to list the bucket root. |

Output fields:

- `[].name`: Name
- `[].id`: ID
- `[].updated_at`: Updated At (datetime)
- `[].created_at`: Created At (datetime)
- `[].last_accessed_at`: Last Accessed At (datetime)
- `[].size`: Size (bytes) (number)
- `[].mimetype`: MIME Type

### `download_file`

**Download File.** Downloads a file from a Storage bucket by its path and returns its content as base64, along with its MIME type and size. Use when you need the actual file content rather than a link (for example, to read a small text/JSON file or pass an image on for processing). For large files, prefer Create Temporary File Link instead of loading the full content. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. The bucket's name, as shown in Storage. |
| `path` | string | yes |  | File Path. The file's path in the bucket, including its name. |

Output fields:

- `base64`: File Content (base64)
- `mimeType`: MIME Type
- `size`: Size (bytes) (number)

### `delete_file`

**Delete Files.** Permanently deletes one or more files from a Storage bucket, given their full paths. Use only once you have confirmed the paths (List Files in Bucket first). Idempotent: re-running on paths that no longer exist deletes nothing further. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. The bucket's name, as shown in Storage. |
| `paths` | array | yes |  | File Paths. One path per entry, like folder/report.pdf. |

Output fields:

- `[].name`: Name

### `create_signed_url`

**Create Temporary File Link.** Generates a time-limited signed URL for a file in a Storage bucket, so it can be accessed (e.g. shared or fetched) without making the bucket public. Use for files in private buckets, or when a temporary link is preferable to returning the full file content. Read-only and idempotent: repeated calls just mint a new link with the same expiry window. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bucket` | string | yes |  | Bucket. The bucket's name, as shown in Storage. |
| `path` | string | yes |  | File Path. The file's path in the bucket, including its name. |
| `expiresIn` | number | no | `3600` | Expires In. Seconds the link stays valid. Default is one hour. |

Output fields:

- `signedUrl`: Signed URL (url)

### `list_users`

**List Users.** Lists users registered in the connected Supabase project's Auth system, paginated. Requires the Service Role Key. Use to look up or browse accounts before acting on a specific user. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Starts at 1. |
| `perPage` | number | no | `50` | Users Per Page. How many users each page returns. |

Output fields:

- `[].id`: ID
- `[].email`: Email
- `[].phone`: Phone
- `[].created_at`: Created At (datetime)
- `[].last_sign_in_at`: Last Sign In At (datetime)
- `[].confirmed_at`: Confirmed At (datetime)

### `get_user`

**Get User.** Returns a single user's Auth record (email, phone, metadata, confirmation and sign-in timestamps) by user ID. Requires the Service Role Key. Use after List Users to inspect one account in full. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. Find it under Authentication, Users in Supabase. |

Output fields:

- `id`: ID
- `email`: Email
- `phone`: Phone
- `user_metadata`: User Metadata
- `app_metadata`: App Metadata
- `created_at`: Created At (datetime)
- `last_sign_in_at`: Last Sign In At (datetime)
- `confirmed_at`: Confirmed At (datetime)

### `create_user`

**Create User.** Creates a new user in Auth with an email/phone and password that can sign in immediately, skipping the invite/confirmation email flow. Requires the Service Role Key. Use for programmatic account provisioning; use Invite User by Email instead if the user should set their own password via an email link. Not idempotent: calling twice with the same email creates a conflict error, not a second identical user. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. Include the country code. |
| `password` | string | no |  | Password. Leave empty for passwordless sign-in. |
| `emailConfirm` | boolean | no | `false` | Mark Email as Confirmed. Lets the user sign in without confirming by email. |
| `userMetadata` | JSON | no |  | User Metadata. Custom data saved on the user, as JSON. |

Output fields:

- `id`: ID
- `email`: Email
- `phone`: Phone
- `created_at`: Created At (datetime)

### `update_user`

**Update User.** Updates an existing user's email, phone, password, or metadata by user ID. Requires the Service Role Key. Only the fields provided are changed; leave the rest empty to keep them as-is. Idempotent: setting the same values again has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. Find it under Authentication, Users in Supabase. |
| `email` | string | no |  | Email. |
| `phone` | string | no |  | Phone. Include the country code. |
| `password` | string | no |  | Password. Leave empty to keep the current password. |
| `userMetadata` | JSON | no |  | User Metadata. Custom data saved on the user, as JSON. |

Output fields:

- `id`: ID
- `email`: Email
- `phone`: Phone
- `updated_at`: Updated At (datetime)

### `delete_user`

**Delete User.** Permanently deletes a user from Auth by ID, removing their ability to sign in. Requires the Service Role Key. Use only once you have confirmed the user ID (Get User or List Users first) — this cannot be undone. Idempotent: deleting an already-deleted user ID errors without further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. Find it under Authentication, Users in Supabase. |

Output fields:

- `success`: Success (boolean)

### `invite_user`

**Invite User by Email.** Creates a new user and sends them an invite email with a link to set their own password. Requires the Service Role Key. Use for user-facing onboarding; use Create User instead when you need to provision a login programmatically without an email step. Not idempotent: calling twice for the same email errors on the second call once the account exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `userMetadata` | JSON | no |  | User Metadata. Custom data saved on the user, as JSON. |
| `redirectTo` | string | no |  | Redirect URL. Page the user lands on after accepting. |

Output fields:

- `id`: ID
- `email`: Email
- `invited_at`: Invited At (datetime)

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
