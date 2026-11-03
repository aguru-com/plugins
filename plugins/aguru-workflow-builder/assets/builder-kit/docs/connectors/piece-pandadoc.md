# PandaDoc

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pandadoc'
  version: '0.2.2'
```

Categories: CONTENT_AND_FILES, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your PandaDoc API key. Get it from the Developer Dashboard in your PandaDoc account.

## Actions

### `createDocumentFromTemplate`

**Create Document from Template.** Create a new PandaDoc document from an existing template, supplying recipients, prefilled field/token values, folder, tags, and metadata. Use to generate a contract or agreement that can then be sent for signature. Requires a valid template UUID; not idempotent — each call creates a separate document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_uuid` | string | yes |  | Template. Select a template from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Document Name. Name the document you are creating. |
| `recipients` | array | yes |  | Recipients. List of recipients to whom the document will be sent. Each item: { `email`?, `phone`?, `first_name`?, `last_name`?, `role`?, `custom_role`?, `signing_order`? }. |
| `fields` | object | no |  | Template Fields. An object whose fields depend on other inputs; the product shows them. |
| `tokens` | array | no |  | Variables/Tokens. Pass values for the variables in the template. Each item: { `name`, `value` }. |
| `folder_uuid` | string | no |  | Folder. Select a folder from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Tag the document for filtering and organization. Each item: { `tag`?, `custom_tag`? }. |
| `metadata` | object | no |  | Metadata. Additional data in key-value format to associate with document. |

### `createAttachment`

**Create Attachment.** Attach a file (fetched from a public file URL) to an existing PandaDoc document, with an optional display name. Requires the target document ID and a reachable source URL. Not idempotent — each call appends another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document. Select a document from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `source` | string | yes |  | File URL. URL link to the file to be attached to the document. |
| `name` | string | no |  | Attachment Name. Optional name to set for the uploaded file. |

### `createOrUpdateContact`

**Create or Update Contact.** Create a new PandaDoc contact or update an existing one, depending on whether a contact ID is supplied: with an ID it patches that contact, without one it creates a new contact. Use to maintain recipient/contact records. Not idempotent in create mode — omitting the contact ID creates a duplicate on each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | no |  | Contact ID (for Update). Select a contact to update. Leave empty to create a new contact. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. An email address of the contact. |
| `first_name` | string | no |  | First Name. Contact's first name. |
| `last_name` | string | no |  | Last Name. Contact's last name. |
| `company` | string | no |  | Company. Contact's company name. |
| `job_title` | string | no |  | Job Title. Select a common job title or choose "Other" to enter a custom title. One of `"CEO"`, `"CTO"`, `"CFO"`, `"COO"`, `"President"`, `"Vice President"`, `"Director"`, `"Manager"`, `"Sales Manager"`, `"Sales Representative"`, `"Account Manager"`, `"Business Development Manager"`, `"Marketing Manager"`, `"Marketing Coordinator"`, `"Software Engineer"`, `"Senior Software Engineer"`, `"Lead Developer"`, `"DevOps Engineer"`, `"Data Scientist"`, `"Product Manager"`, `"IT Manager"`, `"Operations Manager"`, `"Project Manager"`, `"Program Manager"`, `"Business Analyst"` and 11 more. |
| `custom_job_title` | string | no |  | Custom Job Title. Enter a custom job title (only used if "Other" is selected above) |
| `industry` | string | no |  | Industry. Select an industry or choose "Other" to enter a custom industry. One of `"Technology"`, `"Software"`, `"Financial Services"`, `"Healthcare"`, `"Manufacturing"`, `"Retail"`, `"E-commerce"`, `"Education"`, `"Consulting"`, `"Real Estate"`, `"Construction"`, `"Legal Services"`, `"Marketing & Advertising"`, `"Media & Entertainment"`, `"Telecommunications"`, `"Transportation & Logistics"`, `"Energy & Utilities"`, `"Automotive"`, `"Aerospace & Defense"`, `"Pharmaceuticals"`, `"Biotechnology"`, `"Insurance"`, `"Banking"`, `"Investment"`, `"Non-Profit"` and 6 more. |
| `custom_industry` | string | no |  | Custom Industry. Enter a custom industry (only used if "Other" is selected above) |
| `phone` | string | no |  | Phone. A phone number. |
| `country` | string | no |  | Country. Select a country or choose "Other" to enter a custom country. One of `"United States"`, `"Canada"`, `"United Kingdom"`, `"Australia"`, `"Germany"`, `"France"`, `"Spain"`, `"Italy"`, `"Netherlands"`, `"Sweden"`, `"Norway"`, `"Denmark"`, `"Finland"`, `"Brazil"`, `"Mexico"`, `"Japan"`, `"South Korea"`, `"China"`, `"India"`, `"Singapore"`, `"Switzerland"`, `"Austria"`, `"Belgium"`, `"Poland"`, `"Ireland"` and 5 more. |
| `custom_country` | string | no |  | Custom Country. Enter your country name (only used if "Other" is selected above) |
| `state` | string | no |  | State/Province. Select a state/province or choose "Other" to enter a custom value. One of `"Alabama"`, `"Alaska"`, `"Arizona"`, `"Arkansas"`, `"California"`, `"Colorado"`, `"Connecticut"`, `"Delaware"`, `"Florida"`, `"Georgia"`, `"Hawaii"`, `"Idaho"`, `"Illinois"`, `"Indiana"`, `"Iowa"`, `"Kansas"`, `"Kentucky"`, `"Louisiana"`, `"Maine"`, `"Maryland"`, `"Massachusetts"`, `"Michigan"`, `"Minnesota"`, `"Mississippi"`, `"Missouri"` and 49 more. |
| `custom_state` | string | no |  | Custom State/Province. Enter your state/province name (only used if "Other" is selected above) |
| `street_address` | string | no |  | Street Address. A street address. |
| `city` | string | no |  | City. A city name. |
| `postal_code` | string | no |  | Postal Code. A postal code. |

### `findDocument`

**Find Document(s).** Search and list PandaDoc documents, optionally narrowed by query text, status, template, form, folder, contact, tags, date ranges, or metadata; with no filters it returns all documents (paginated). Use to locate documents or enumerate them before acting on a specific one. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | no |  | Search Query. Search documents by name or reference number. |
| `id` | string | no |  | Document ID. Search for document by its specific ID. |
| `status` | string | no |  | Status. Filter documents by status. One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`. |
| `status__ne` | string | no |  | Exclude Status. Exclude documents with this status. One of `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`. |
| `template_id` | string | no |  | Template. Filter by parent template (cannot be used with Form) A value the product loads from the provider, such as an id; write the value itself. |
| `form_id` | string | no |  | Form. Select a form from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `folder_uuid` | string | no |  | Folder. Select a folder from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | no |  | Contact. Select a contact from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `membership_id` | string | no |  | Member. Select a workspace member. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | string | no |  | Tag. Select a common tag or choose "Custom" to enter your own. One of `"contract"`, `"proposal"`, `"quote"`, `"invoice"`, `"agreement"`, `"nda"`, `"employment"`, `"vendor"`, `"client"`, `"urgent"`, `"priority"`, `"review"`, `"approval"`, `"legal"`, `"finance"`, `"hr"`, `"sales"`, `"marketing"`, `"template"`, `"final"`, `"draft"`, `"custom"`. |
| `custom_tag` | string | no |  | Custom Tag. Enter a custom tag (only used if "Custom" is selected above) |
| `created_from` | ISO date-time string | no |  | Created From. Include only documents created on or after this date. |
| `created_to` | ISO date-time string | no |  | Created To. Include only documents created before this date. |
| `completed_from` | ISO date-time string | no |  | Completed From. Include only documents completed on or after this date. |
| `completed_to` | ISO date-time string | no |  | Completed To. Include only documents completed before this date. |
| `modified_from` | ISO date-time string | no |  | Modified From. Include only documents modified on or after this date. |
| `modified_to` | ISO date-time string | no |  | Modified To. Include only documents modified before this date. |
| `deleted` | boolean | no |  | Show Deleted Documents. Return only deleted documents. |
| `count` | number | no |  | Results Count. Number of documents to return (default: 50, max: 100) |
| `page` | number | no |  | Page Number. Page number for pagination (starts with 1) |
| `order_by` | string | no |  | Order By. Sort results by field. One of `"date_status_changed"`, `"date_created"`, `"-date_created"`, `"date_modified"`, `"-date_modified"`, `"name"`, `"-name"`. |
| `metadata` | object | no |  | Metadata Filters. Filter by metadata key-value pairs. Use format: {"key": "value"}. |

### `getDocumentAttachments`

**Get Document Attachment.** Retrieve details of a single attachment on a PandaDoc document, identified by document ID and attachment ID. Use to inspect a known attachment. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document. Select a document from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `attachment_id` | string | yes |  | Attachment. Select an attachment from the document. A value the product loads from the provider, such as an id; write the value itself. |

### `getDocumentDetails`

**Get Document.** Retrieve the full detail record for a single PandaDoc document by its ID, including status, recipients, fields, and metadata. Use when you already know the document ID and need its complete data. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document. Select a document from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |

### `downloadDocument`

**Download Document.** Download a PandaDoc document by ID as a PDF file, optionally as a zip of separate per-section PDFs and with configurable watermark text, color, font size, and opacity. Use to fetch the rendered document for storage or forwarding. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document_id` | string | yes |  | Document. Select a document from your PandaDoc workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `separate_files` | boolean | no | `false` | Download as Separate Files. Download document bundle as a zip archive of separate PDFs (1 file per section) |
| `watermark_text` | string | no |  | Watermark Text. Select common watermark text or choose "Custom" to enter your own. One of `"CONFIDENTIAL"`, `"DRAFT"`, `"COPY"`, `"SAMPLE"`, `"FOR REVIEW ONLY"`, `"INTERNAL USE ONLY"`, `"PROPRIETARY"`, `"PRELIMINARY"`, `"FINAL"`, `"APPROVED"`, `"VOID"`, `"DUPLICATE"`, `"NOT FOR DISTRIBUTION"`, `"TRADE SECRET"`, `"custom"`. |
| `custom_watermark_text` | string | no |  | Custom Watermark Text. Enter custom watermark text (only used if "Custom" is selected above) |
| `watermark_color` | string | no |  | Watermark Color. Select a watermark color or use custom HEX code. One of `"#FF0000"`, `"#0000FF"`, `"#00FF00"`, `"#000000"`, `"#808080"`, `"#FF7F00"`, `"#800080"`, `"custom"`. |
| `custom_watermark_color` | string | no |  | Custom Watermark Color. Enter a custom HEX color code (e.g., #FF5733). Only used if "Custom HEX Code" is selected above. |
| `watermark_font_size` | number | no |  | Watermark Font Size. Font size of the watermark text. |
| `watermark_opacity` | number | no |  | Watermark Opacity. Opacity of the watermark (0.0 to 1.0) |

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
