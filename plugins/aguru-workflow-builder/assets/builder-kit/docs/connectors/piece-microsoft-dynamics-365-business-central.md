# Microsoft Dynamics 365 Business Central

All-in-one business management solution by Microsoft.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-dynamics-365-business-central'
  version: '0.3.0'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you’d like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Dynamics 365 Business Central permissions** under **API permissions**:
> - Financials.ReadWrite.All
> - user_impersonation

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |
| `environment` | string | yes | `"Production"` | Environment. Name of the environment to connect to, e.g. 'Production' or 'Sandbox'. Environment names can be found in the Business Central Admin Center. |

## Actions

### `create-record`

**Create Record.** Creates a new record in a Microsoft Dynamics 365 Business Central company, of a chosen entity type (e.g. customers, items, sales invoices, or line entities like salesInvoiceLines/salesOrderLines that are created under a parent record via its id field). Use to add business data; requires the company id, the record type, and the field values for the new record. Not idempotent — each call inserts a new record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company. A value the product loads from the provider, such as an id; write the value itself. |
| `record_type` | string | yes |  | Record Type. One of `"bankAccounts"`, `"contacts"`, `"currencies"`, `"customers"`, `"disputeStatus"`, `"employees"`, `"itemCategories"`, `"items"`, `"itemVariants"`, `"journals"`, `"locations"`, `"paymentMethods"`, `"paymentTerms"`, `"projects"`, `"salesInvoiceLines"`, `"salesInvoices"`, `"salesOrderLines"`, `"salesOrders"`, `"salesQuoteLines"`, `"salesQuotes"`, `"shipmentMethods"`, `"vendors"`. |
| `record_fields` | object | yes |  | Record Fields. An object whose fields depend on other inputs; the product shows them. |

### `delete-record`

**Delete Record.** Permanently deletes a record of a chosen entity type from a Microsoft Dynamics 365 Business Central company, identified by company id, record type, and record id. Use to remove business data. Repeating the call is safe (the record is already gone), but it deletes on the matched record, so treat with care. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company. A value the product loads from the provider, such as an id; write the value itself. |
| `record_type` | string | yes |  | Record Type. One of `"bankAccounts"`, `"contacts"`, `"currencies"`, `"customers"`, `"disputeStatus"`, `"employees"`, `"itemCategories"`, `"items"`, `"itemVariants"`, `"journals"`, `"locations"`, `"paymentMethods"`, `"paymentTerms"`, `"projects"`, `"salesInvoiceLines"`, `"salesInvoices"`, `"salesOrderLines"`, `"salesOrders"`, `"salesQuoteLines"`, `"salesQuotes"`, `"shipmentMethods"`, `"vendors"`. |
| `record_id` | string | yes |  | Record ID. |

### `get-record`

**Get Record.** Fetches a single record of a chosen entity type from a Microsoft Dynamics 365 Business Central company by its exact record id. Use when you already know the id and want one record; to find records by criteria use Search Records instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company. A value the product loads from the provider, such as an id; write the value itself. |
| `record_type` | string | yes |  | Record Type. One of `"bankAccounts"`, `"contacts"`, `"currencies"`, `"customers"`, `"disputeStatus"`, `"employees"`, `"itemCategories"`, `"items"`, `"itemVariants"`, `"journals"`, `"locations"`, `"paymentMethods"`, `"paymentTerms"`, `"projects"`, `"salesInvoiceLines"`, `"salesInvoices"`, `"salesOrderLines"`, `"salesOrders"`, `"salesQuoteLines"`, `"salesQuotes"`, `"shipmentMethods"`, `"vendors"`. |
| `record_id` | string | yes |  | Record ID. |

### `update-record`

**Update Record.** Updates fields on an existing record of a chosen entity type in a Microsoft Dynamics 365 Business Central company, identified by company id, record type, and record id (line entities like salesInvoiceLines/salesOrderLines also need the parent record id in their fields). Use to modify existing business data. Effectively idempotent — re-sending the same field values leaves the record in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company. A value the product loads from the provider, such as an id; write the value itself. |
| `record_type` | string | yes |  | Record Type. One of `"bankAccounts"`, `"contacts"`, `"currencies"`, `"customers"`, `"disputeStatus"`, `"employees"`, `"itemCategories"`, `"items"`, `"itemVariants"`, `"journals"`, `"locations"`, `"paymentMethods"`, `"paymentTerms"`, `"projects"`, `"salesInvoiceLines"`, `"salesInvoices"`, `"salesOrderLines"`, `"salesOrders"`, `"salesQuoteLines"`, `"salesQuotes"`, `"shipmentMethods"`, `"vendors"`. |
| `record_id` | string | yes |  | Record ID. |
| `record_fields` | object | yes |  | Record Fields. An object whose fields depend on other inputs; the product shows them. |

### `search-records`

**Search Records.** Lists records of a chosen entity type from a Microsoft Dynamics 365 Business Central company. Optionally filters by exact, case-sensitive matches on one or more property fields (all conditions are AND-ed); leave the filter fields empty to return all records of that type. Use to find records when you do not have a specific id. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company. A value the product loads from the provider, such as an id; write the value itself. |
| `record_type` | string | yes |  | Record Type. One of `"bankAccounts"`, `"contacts"`, `"currencies"`, `"customers"`, `"disputeStatus"`, `"employees"`, `"itemCategories"`, `"items"`, `"itemVariants"`, `"journals"`, `"locations"`, `"paymentMethods"`, `"paymentTerms"`, `"projects"`, `"salesInvoices"`, `"salesOrders"`, `"salesQuotes"`, `"shipmentMethods"`, `"vendors"`. |
| `record_filter_fields` | object | yes |  | Filter Fields. An object whose fields depend on other inputs; the product shows them. |

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
