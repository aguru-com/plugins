# JustInvoice

Create and manage invoices with JustInvoice API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-just-invoice'
  version: '0.0.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your JustInvoice API key. You can find this in your JustInvoice account settings.

## Actions

### `create_invoice`

**Create Invoice.** Creates a new invoice in JustInvoice for a customer, with at least one line item, optionally setting it to Draft or Final status on creation. Use to bill a customer or generate an invoice record. Not idempotent: each call mints a new invoice even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerEmail` | string | yes |  | Customer Email. Email address of the customer. |
| `customerFirstName` | string | no |  | Customer First Name. First name of the customer. |
| `customerLastName` | string | no |  | Customer Last Name. Last name of the customer. |
| `customerCompanyName` | string | no |  | Customer Company Name. Company name of the customer. |
| `customerAddress` | string | no |  | Customer Address. Street address of the customer. |
| `customerCity` | string | no |  | Customer City. City of the customer. |
| `customerProvinceState` | string | no |  | Customer Province/State. Province or state of the customer. |
| `customerPostalCode` | string | no |  | Customer Postal Code. Postal code of the customer. |
| `customerCountry` | string | no |  | Customer Country. Country code of the customer (e.g., US, CA) |
| `invoiceDate` | ISO date-time string | no |  | Invoice Date. Date of the invoice. |
| `invoiceStatus` | string | no | `0` | Invoice Status. Initial status of the invoice. One of `0`, `5`. |
| `currencyCode` | string | no | `"USD"` | Currency Code. Currency code (e.g., USD, EUR) |
| `noteToCustomer` | string | no |  | Note to Customer. Additional notes for the customer. |
| `lineItems` | array | yes |  | Line Items. Products or services being billed. Each item: { `description`, `quantity`, `unitPrice` }. |

### `get_invoice`

**Get Invoice.** Retrieves full details of a single JustInvoice invoice by its ID or invoice number. Use to look up an invoice before acting on it or to read its current status. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The ID or invoice number of the invoice to retrieve. |

### `mark_invoice_final`

**Mark Invoice Final.** Transitions a draft JustInvoice invoice (by ID or invoice number) to final status so it can accept payment. Use after a draft invoice is ready to issue. Idempotent: an invoice already final stays final. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The ID or invoice number of the invoice to mark as final. |

### `mark_invoice_cancelled`

**Mark Invoice Cancelled.** Transitions a final JustInvoice invoice (by ID or invoice number) to cancelled status. Use to void an issued invoice instead of deleting it. Idempotent: an invoice already cancelled stays cancelled. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The ID or invoice number of the invoice to mark as cancelled. |

### `mark_invoice_paid`

**Mark Invoice Paid.** Marks a final JustInvoice invoice (by ID or invoice number) as paid. Use to record that payment for an issued invoice has been received. Idempotent: an invoice already marked paid stays paid. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The ID or invoice number of the invoice to mark as paid. |

### `delete_invoice`

**Delete Invoice.** Permanently deletes a JustInvoice invoice by its ID or invoice number. Use to remove an invoice entirely; prefer cancelling instead of deleting an issued invoice. Idempotent in effect: once removed, the invoice stays gone. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The ID or invoice number of the invoice to delete. |
