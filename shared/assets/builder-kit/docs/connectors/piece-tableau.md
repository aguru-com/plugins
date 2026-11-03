# Tableau

Business intelligence and analytics platform for data visualization

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tableau'
  version: '0.1.6'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> ## Tableau Authentication Setup
>
> ### For Tableau Cloud:
> - **Server URL**: Use your Tableau Cloud URL (e.g., https://10az.online.tableau.com or https://us-east-1.online.tableau.com)
> - **Site Content URL**: Your site name (leave empty for default site)
>
> ### For Tableau Server:
> - **Server URL**: Your Tableau Server URL (e.g., https://tableau.yourcompany.com)
> - **Site Content URL**: Your site name (leave empty for default site)
>
> ### Authentication Methods:
> Choose **either** Username/Password **or** Personal Access Token:
>
> #### Option 1: Username and Password
> - Enter your Tableau username and password
> - For Tableau Cloud, use your email address as username
> - For Tableau Server, use your domain\username if using Active Directory
>
> #### Option 2: Personal Access Token (Recommended)
> - Go to your Tableau account settings
> - Generate a Personal Access Token
> - Enter the token name and secret
>
> **Security Note:** Personal Access Tokens are recommended for production use as they provide better security and can be revoked individually.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serverUrl` | string | yes |  | Server URL. Your Tableau Server or Tableau Cloud URL (e.g., https://10az.online.tableau.com) |
| `apiVersion` | string | yes | `"3.26"` | API Version. Tableau REST API version (e.g., 3.19, 3.20, 3.26). Check your Tableau server documentation for supported versions. Use 3.26 for most Tableau Cloud instances. |
| `siteContentUrl` | string | no |  | Site Content URL. Your Tableau site name (leave empty for default site) |
| `username` | string | no |  | Username. Your Tableau username (email for Tableau Cloud, or domain\username for Server) |
| `password` | string | no |  | Password. Your Tableau password. |
| `personalAccessTokenName` | string | no |  | Personal Access Token Name. Name of your Personal Access Token. |
| `personalAccessTokenSecret` | string | no |  | Personal Access Token Secret. Secret value of your Personal Access Token. |

## Actions

### `download_view`

**Download View.** Exports a single Tableau view (identified by its view ID) as a file in one of four formats — CSV data, PNG image, PDF, or Excel crosstab — each producing a different output and accepting format-specific sizing/page options. Use to capture a view's rendered content or underlying data for sharing or downstream processing. Read-only against Tableau and safe to repeat, though the rendered result reflects data current at call time (subject to the cache max-age). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `viewId` | string | yes |  | View. Select the view to download. A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | yes |  | Format. The format to download the view in. One of `"csv"`, `"image"`, `"pdf"`, `"excel"`. |
| `maxAge` | number | no | `60` | Max Age (minutes). Maximum age of cached data in minutes (default: 60) |
| `resolution` | string | no |  | Image Resolution. Resolution for image format (high for maximum pixel density) |
| `vizWidth` | number | no |  | Visualization Width. Width of the rendered image/PDF in pixels. |
| `vizHeight` | number | no |  | Visualization Height. Height of the rendered image/PDF in pixels. |
| `pageType` | string | no |  | Page Type. Page size for PDF format. One of `"Letter"`, `"Legal"`, `"A4"`, `"A3"`, `"A5"`, `"B5"`, `"Executive"`, `"Folio"`, `"Ledger"`, `"Note"`, `"Quarto"`, `"Tabloid"`. |
| `orientation` | string | no |  | Orientation. Page orientation for PDF format. One of `"Portrait"`, `"Landscape"`. |

### `run_extract_refresh_task`

**Run Extract Refresh Task.** Triggers an existing extract refresh task (by task ID) to run immediately, queuing a background job on the Tableau site and returning the new job's identifier. Use to force an on-demand refresh of a scheduled extract rather than waiting for its schedule. Not idempotent: each call enqueues a new refresh job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Extract Refresh Task. Select the extract refresh task to run. A value the product loads from the provider, such as an id; write the value itself. |

### `refresh_workbook`

**Refresh Workbook.** Queues an immediate extract refresh for a workbook (by workbook ID), starting a background job on the Tableau site and returning its job identifier. Use to update a workbook's extracted data on demand. Not idempotent: each call enqueues a new refresh job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workbookId` | string | yes |  | Workbook. Select the workbook to refresh. A value the product loads from the provider, such as an id; write the value itself. |

### `find_view`

**Find View.** Looks up a single Tableau view by its URL name (the slug from /views/workbook/<name>, e.g. "Sheet1") and returns its metadata including the resolved view ID, owner, workbook, and project. Use to resolve a human-facing view name into the ID needed by other actions; errors if no matching view exists. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `viewName` | string | yes |  | View Name. The URL name of the view to find (e.g., Sheet1 from /views/workbook/Sheet1) |

### `find_workbook`

**Find Workbook.** Looks up a single Tableau workbook and returns its full metadata (name, project, owner, views, timestamps). Search By selects the lookup mode: by workbook ID, or by content URL (the slug from /workbooks/<name>) — supply the field matching the chosen mode. Use to resolve a workbook reference into details or its ID; errors if not found. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchType` | string | yes |  | Search By. Choose whether to search by workbook ID or content URL. One of `"id"`, `"contentUrl"`. |
| `workbookId` | string | no |  | Workbook ID. The ID of the workbook to find. |
| `contentUrl` | string | no |  | Content URL. The content URL of the workbook to find (e.g., "MyWorkbook" from /workbooks/MyWorkbook) |
