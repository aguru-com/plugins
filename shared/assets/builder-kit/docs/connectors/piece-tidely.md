# Tidely

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tidely'
  version: '0.1.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Tidely API Key

> Your Tidely API Key. Get it from your Tidely account settings.

## Actions

### `importInvoice`

**Import Invoice.** Imports an invoice into Tidely via its open-api import endpoint. Provide an Invoice ID to upsert/match an existing invoice, or omit it to create a new one on each call. Use to push invoice data (number, contact, dates, amounts, type) from an external source into Tidely. Requires invoice number, contact name, invoice date, type, net and gross amounts, and currency. Not idempotent without a stable Invoice ID — repeating without one creates duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | no |  | Invoice ID. Unique identifier for the invoice. |
| `invoiceNumber` | string | yes |  | Invoice Number. Invoice number or reference. |
| `contactName` | string | yes |  | Contact Name. Name of the contact/customer. |
| `invoiceDate` | string | yes |  | Invoice Date. Date the invoice was issued (format: dd/MM/yy, M/dd/yy, or yyyy-MM-dd) |
| `dueDate` | string | no |  | Due Date. Date the invoice is due (format: dd/MM/yy, M/dd/yy, or yyyy-MM-dd) |
| `paidDate` | string | no |  | Paid Date. Date the invoice was paid (format: yyyy-MM-dd HH:mm:ss or yyyy-MM-dd'T'HH:mm:ss) |
| `createdDate` | string | no |  | Created Date. Date the invoice was created (format: dd/MM/yy, M/dd/yy, or yyyy-MM-dd) |
| `updatedDate` | string | no |  | Updated Date. Date the invoice was last updated (format: dd/MM/yy, M/dd/yy, or yyyy-MM-dd) |
| `invoiceType` | string | yes |  | Invoice Type. Type of invoice. One of `"SALES_INVOICE"`, `"PURCHASE_INVOICE"`, `"CREDIT_NOTE"`, `"DEBIT_NOTE"`. |
| `invoiceStatus` | string | no |  | Invoice Status. Current status of the invoice. One of `"DRAFT"`, `"SENT"`, `"VIEWED"`, `"OVERDUE"`, `"PAID"`, `"CANCELLED"`. |
| `totalNetAmount` | number | yes |  | Total Net Amount. Total amount before tax. |
| `totalTaxAmount` | number | no |  | Total Tax Amount. Total tax amount. |
| `totalGrossAmount` | number | yes |  | Total Gross Amount. Total amount including tax. |
| `openAmount` | number | no |  | Open Amount. Amount still outstanding. |
| `currency` | string | yes |  | Currency. Currency code (e.g., USD, EUR, GBP) |
| `description` | string | no |  | Description. Invoice description or notes. |
| `categoryId` | number | no |  | Category ID. ID of the invoice category. |

### `createAPlan`

**Create a Plan.** Creates a new financial plan entry in Tidely for cash-flow planning, with a name, amount, period (daily/weekly/monthly), type (one-time/recurring), and date; optionally tied to a category and scenario. Use to add planned inflows or outflows to a Tidely forecast. Not idempotent — each call creates a new plan. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Plan Name. Name of the plan. |
| `amount` | number | yes |  | Amount. Plan amount. |
| `period` | string | yes |  | Period. Frequency of the plan. One of `"DAILY"`, `"WEEKLY"`, `"MONTHLY"`. |
| `type` | string | yes |  | Plan Type. Type of plan. One of `"ONE_TIME"`, `"RECURRING"`. |
| `date` | string | yes |  | Date. Plan date (format: dd/MM/yy, M/dd/yy, or yyyy-MM-dd) |
| `categoryId` | number | no |  | Category ID. ID of the plan category. |
| `categoryName` | string | no |  | Category Name. Name of the plan category. |
| `scenarioId` | number | no |  | Scenario ID. ID of the scenario. |
| `scenarioName` | string | no |  | Scenario Name. Name of the scenario. |
| `replaceCurrentValuesForThePeriod` | boolean | no |  | Replace Current Values for the Period. Whether to replace current values for the period. |

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
