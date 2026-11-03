# Carbone

Generate documents (PDF, DOCX, XLSX, ODS, and more) from templates and JSON data using the Carbone report generator.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-carbone'
  version: '0.1.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your Carbone API key:
> 1. Log in to your [Carbone account](https://account.carbone.io/)
> 2. Navigate to **API keys** in your account settings.
> 3. Create or copy your API key.

## Actions

### `carbone_render_document`

**Render Document.** Merges a stored Carbone template (referenced by template ID) with a JSON data object and produces the generated document, optionally converting it to another format such as PDF, XLSX, or DOCX. Use this to produce a finished report or document from a template the agent has already uploaded; the JSON keys must match the `{d.variableName}` placeholders in the template. Not idempotent: each call generates and writes a new output file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Select a template to render. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | JSON | yes |  | Data (JSON). JSON object containing the data to inject into the template. Keys must match the `{d.variableName}` placeholders in your template. |
| `convertTo` | string | no |  | Convert To (optional). Output format (e.g. `pdf`, `xlsx`, `csv`, `docx`). For PDF, you can also use advanced options via JSON like `{"formatName":"pdf","formatOptions":{"Watermark":"Confidential"}}`. |
| `lang` | string | no |  | Language (optional). Locale for number/date formatting (e.g. `en-us`, `fr-fr`, `de-de`). Defaults to `en-us`. |
| `converter` | string | no |  | PDF Converter (optional). PDF converter engine: **L** (LibreOffice, default - best balance), **O** (OnlyOffice - ideal for DOCX/XLSX/PPTX), **C** (Chromium - high-fidelity HTML-to-PDF). Only applies when convertTo is "pdf" or an object with formatName "pdf". One of `"L"`, `"O"`, `"C"`. |
| `timezone` | string | no |  | Timezone (optional). Timezone for date formatting (e.g. `Europe/Paris`, `America/New_York`). Defaults to UTC. |
| `reportName` | string | no |  | Report Name (optional). Custom filename for the generated document. Can use template variables like `{d.date}`. Returned in Content-Disposition header. |
| `complement` | JSON | no |  | Complement Data (optional). Extra data object merged into template with tags `{c.}` (complement prefix). |
| `currencySource` | string | no |  | Currency Source (optional). Source currency code (e.g. `EUR`) for currency conversion. Use with Currency Target and Currency Rates. |
| `currencyTarget` | string | no |  | Currency Target (optional). Target currency code (e.g. `USD`) for currency conversion. Used by formatC formatter. |
| `currencyRates` | JSON | no |  | Currency Rates (optional). Exchange rates object for currency conversion. Example: `{"EUR": 1, "USD": 1.14}`. |

### `carbone_upload_template`

**Upload Template.** Uploads a template file (DOCX, XLSX, ODS, ODT, PPTX, CSV, or HTML) to Carbone and returns a template ID used later by the render action. Operates in two modes: by default it creates a new versioned template, or when an existing template ID is supplied it adds the file as a new version of that template. Use before rendering when the target template is not yet stored in Carbone. Not idempotent: each call uploads a new template or template version. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Template File. Supported formats: DOCX, XLSX, ODS, ODT, PPTX, CSV, HTML. Files are not supported; an action that needs one fails. |
| `filename` | string | yes |  | Filename. The filename including extension (e.g. `invoice-template.docx`). The extension determines the output format. |
| `versioning` | boolean | no | `true` | Enable Versioning (optional). If enabled (default), creates a template ID that can hold multiple versions. If disabled, creates a standalone template (legacy mode). |
| `existingTemplateId` | string | no |  | Existing Template ID (optional). If provided, adds this upload as a new version to an existing template ID. Only works when versioning is enabled. |
| `name` | string | no |  | Template Name (optional). Friendly name for the template. |
| `comment` | string | no |  | Comment (optional). Description or notes about the template. |
| `category` | string | no |  | Category (optional). Category/folder to organize templates (e.g. "invoices", "contracts"). |
| `tags` | array | no |  | Tags (optional). Tags to categorize the template (e.g. "v1", "2024"). Each item: { `tag` }. |

### `carbone_delete_template`

**Delete Template.** Permanently deletes a stored Carbone template (or specific version) identified by its template/version ID. Use to remove a template that is no longer needed. Not idempotent: the first call removes the template and a repeat call on the same ID fails because it no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID or Version ID. Select a template to delete. A value the product loads from the provider, such as an id; write the value itself. |

### `carbone_update_template`

**Update Template Metadata.** Updates metadata (name, comment, category, tags, deploy/expire timestamps) on an existing Carbone template or version identified by its ID; only the fields supplied are changed and tags are replaced wholesale. Use to rename, recategorize, or schedule deployment/expiry of a stored template. Idempotent: repeating the call with the same fields leaves the template in the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID or Version ID. Select a template to update. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Template Name (optional). New name for the template. |
| `comment` | string | no |  | Comment (optional). New comment/description for the template. |
| `category` | string | no |  | Category (optional). New category for the template. |
| `tags` | array | no |  | Tags (optional). Replace tags with a new list. Each item: { `tag` }. |
| `deployedAt` | string | no |  | Deployed At (optional). UTC Unix timestamp for when this version should be considered deployed. Values >= 42000000000 (year 3300) = "NOW". Used to determine active version. |
| `expireAt` | string | no |  | Expire At (optional). UTC Unix timestamp for when to delete the template. Values >= 42000000000 (year 3300) = "now". This effectively schedules deletion. |

### `carbone_list_templates`

**List Templates.** Lists deployed Carbone templates, optionally narrowed by template ID, version ID, category, or a fuzzy name search, with cursor-based pagination. Leaving all filters empty returns all templates; supplying a filter restricts to matches. Use to discover available templates or look up a template ID before rendering, updating, or deleting. Idempotent: read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | no |  | Template ID Filter (optional). Filter by specific Template ID (64-bit format). Exact match. |
| `versionId` | string | no |  | Version ID Filter (optional). Filter by specific Version ID (SHA256 format). Exact match. |
| `category` | string | no |  | Category Filter (optional). Filter by category name. |
| `search` | string | no |  | Search (optional). Fuzzy search in template name, or exact match for ID/Version ID. |
| `includeVersions` | boolean | no | `false` | Include All Versions. If checked, returns all versions for a specific template ID (when ID filter is provided). |
| `limit` | number | no |  | Limit (optional). Maximum number of templates to return. Default is 100. |
| `cursor` | string | no |  | Cursor (optional). Pagination cursor for fetching the next set of results. |

### `carbone_list_categories`

**List Categories.** Returns all category names currently used to organize Carbone templates. Use to discover valid category values before filtering, uploading, or updating templates. Idempotent: read-only lookup with no inputs. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `carbone_list_tags`

**List Tags.** Returns all tag names currently used to organize Carbone templates. Use to discover valid tag values before filtering, uploading, or updating templates. Idempotent: read-only lookup with no inputs. Needs authentication.

Kind: search, safe to repeat.

No inputs.

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
