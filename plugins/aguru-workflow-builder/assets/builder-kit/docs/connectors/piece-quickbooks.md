# Quickbooks Online

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-quickbooks'
  version: '0.3.3'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> You can find Company ID under **settings->Additional Info**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company ID. |

## Actions

### `find_invoice`

**Find Invoice.** Look up a single QuickBooks invoice by its document number (DocNumber), returning the first match. Use to resolve an invoice reference to its full record before reading or acting on it; the document number is required. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice_number` | string | yes |  | Invoice Number. The document number (DocNumber) of the invoice to search for. |

### `find_customer`

**Find Customer.** Look up a single QuickBooks customer by exact display name, returning the first match. Use to resolve a customer name to its full record (including its Id) before referencing it elsewhere; the match is exact, not fuzzy. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_term` | string | yes |  | Customer Name. The display name of the customer to search for. |

### `find_payment`

**Find Payment.** List all QuickBooks payments belonging to a given customer, identified by the customer Id (not name). Use to retrieve a customer's payment history or to check whether they have any payments on record. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. The ID of the customer to find payments for. |

### `create_invoice`

**Create Invoice.** Create a new QuickBooks invoice for a customer with one or more line items (each line needs an amount and an Item/product Id). Optionally set due date, transaction date, invoice number, memos, and email status; setting email status to "Needs To Be Sent" requires a billing email. Not idempotent: each call creates a new invoice, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerRef` | string | yes |  | Customer. A value the product loads from the provider, such as an id; write the value itself. |
| `lineItems` | array | yes |  | Line Items. Line items for the invoice. Each item: { `description`?, `amount`, `detailType`, `itemId`, `quantity`?, `unitPrice`? }. |
| `emailStatus` | string | no | `"NotSet"` | Email Status. Specify whether the invoice should be emailed after creation. One of `"NotSet"`, `"NeedToSend"`. |
| `billEmail` | string | no |  | Billing Email Address. Email address to send the invoice to. Required if Email Status is "Needs To Be Sent". Overrides customer default. |
| `dueDate` | ISO date-time string | no |  | Due Date. The date when the payment for the invoice is due. If not provided, default term from customer or company is used. |
| `docNumber` | string | no |  | Invoice Number. Optional reference number for the invoice. If not provided, QuickBooks assigns the next sequential number. |
| `txnDate` | ISO date-time string | no |  | Transaction Date. The date entered on the transaction. Defaults to the current date if not specified. |
| `privateNote` | string | no |  | Private Note (Memo). Note to self. Does not appear on the invoice sent to the customer. |
| `customerMemo` | string | no |  | Customer Memo (Statement Memo). Memo to be displayed on the invoice sent to the customer (appears on statement). |

### `create_expense`

**Create Expense.** Record a new expense (purchase) paid from a chosen bank or credit-card account, with one or more account-based line items (each needs an amount and an expense account Id) and a payment type of cash, check, or credit card. Optionally attach a payee/vendor, payment date, and memo. Not idempotent: each call creates a new purchase, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountRef` | string | yes |  | Bank/Credit Card Account. The account from which the expense was paid. A value the product loads from the provider, such as an id; write the value itself. |
| `paymentType` | string | yes | `"Cash"` | Payment Type. One of `"Cash"`, `"Check"`, `"CreditCard"`. |
| `entityRef` | string | no |  | Payee (Vendor). Optional - The vendor the expense was paid to. A value the product loads from the provider, such as an id; write the value itself. |
| `txnDate` | ISO date-time string | no |  | Payment Date. The date the expense occurred. |
| `lineItems` | array | yes |  | Line Items. Details of the expense (e.g., categories or items purchased). At least one line is required. Each item: { `amount`, `description`?, `detailType`, `expenseAccountId` }. |
| `privateNote` | string | no |  | Memo (Private Note). Internal note about the expense. |

### `create_bill`

**Create Bill.** Record a new bill owed to a vendor, with one or more account-based line items (each needs an amount and an expense account Id, and optionally a Class Id on QuickBooks Plus/Advanced). Optionally set the bill date, due date, bill number, and memo. Not idempotent: each call creates a new bill, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorRef` | string | yes |  | Vendor. A value the product loads from the provider, such as an id; write the value itself. |
| `lineItems` | array | yes |  | Line Items. Details of the bill (expense categories). At least one line is required. Each item: { `amount`, `description`?, `detailType`, `expenseAccountId`, `classId`? }. |
| `txnDate` | ISO date-time string | no |  | Bill Date. The date of the bill. Defaults to today if empty. |
| `dueDate` | ISO date-time string | no |  | Due Date. The date the payment is due. If empty, the vendor/company term is used. |
| `docNumber` | string | no |  | Bill Number. Reference number for the bill. |
| `privateNote` | string | no |  | Memo (Private Note). Internal note about the bill. |

### `create_vendor`

**Create Vendor.** Create a new QuickBooks vendor with a display name and optional company name, email, phone, billing address, 1099 tracking flag, tax identifier, account number, and payment term. Not idempotent: each call creates a new vendor, so guard against duplicates (e.g. with Find Vendor first). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | yes |  | Vendor Display Name. The name QuickBooks will show for this vendor. Must be unique across all vendors, customers, and employees. |
| `companyName` | string | no |  | Company Name. |
| `email` | string | no |  | Email Address. |
| `phone` | string | no |  | Phone Number. |
| `billAddrLine1` | string | no |  | Billing Address Line 1. |
| `billAddrCity` | string | no |  | Billing Address City. |
| `billAddrState` | string | no |  | Billing Address State. State or province code, e.g. CA. |
| `billAddrPostalCode` | string | no |  | Billing Address Postal Code. |
| `vendor1099` | boolean | no | `false` | Track for 1099. Whether this vendor should be tracked for 1099 reporting. |
| `taxIdentifier` | string | no |  | Tax ID (SSN or EIN). |
| `acctNum` | string | no |  | Account Number. Your own reference/account number for this vendor (external ID). Shown on checks. |
| `termRef` | string | no |  | Payment Term. Optional. The default payment term for bills from this vendor. A value the product loads from the provider, such as an id; write the value itself. |

### `find_vendor`

**Find Vendor.** Look up a single QuickBooks vendor by exact display name, email address, or account number (external ID), returning the first match. Use to resolve a vendor to its full record (including its Id) before referencing it elsewhere; the match is exact, not fuzzy. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchBy` | string | no | `"DisplayName"` | Search By. One of `"DisplayName"`, `"Email"`, `"AcctNum"`. |
| `search_term` | string | yes |  | Search Value. The exact vendor display name, email address, or account number to search for, depending on Search By. |

### `find_account`

**Find Account.** List QuickBooks chart-of-accounts entries to resolve an account name to its Id. Optionally filter by a name substring and/or account type (e.g. Expense, Bank, Accounts Payable). Use this to find the expense-account Id required by Create Bill / Create Expense line items. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_term` | string | no |  | Account Name Contains. Optional. Filter accounts whose name contains this text. |
| `accountType` | string | no |  | Account Type. Optional. Filter by account type. One of `"Bank"`, `"Accounts Receivable"`, `"Other Current Asset"`, `"Fixed Asset"`, `"Other Asset"`, `"Accounts Payable"`, `"Credit Card"`, `"Other Current Liability"`, `"Long Term Liability"`, `"Equity"`, `"Income"`, `"Cost of Goods Sold"`, `"Expense"`, `"Other Income"`, `"Other Expense"`. |

### `record_payment`

**Record Payment.** Record a payment received from a customer for a given total amount. Optionally apply the payment to one or more specific invoices by their transaction Id, set the deposit-to account, payment date, and reference number. If no invoices are specified, QuickBooks leaves the amount unapplied. Not idempotent: each call creates a new payment, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerRef` | string | yes |  | Customer. A value the product loads from the provider, such as an id; write the value itself. |
| `totalAmount` | number | yes |  | Total Amount. The total amount of the payment received. |
| `lineItems` | array | no |  | Apply to Invoices. Optional. Apply this payment to specific invoices. Leave empty to keep the amount unapplied. Each item: { `invoiceId`, `amount` }. |
| `depositToAccountId` | string | no |  | Deposit To Account ID. Optional. The account to deposit the payment into. Defaults to Undeposited Funds if empty. |
| `txnDate` | ISO date-time string | no |  | Payment Date. The date the payment was received. Defaults to today if empty. |
| `paymentRefNum` | string | no |  | Reference Number. Optional reference number for the payment (e.g. check number). |
| `privateNote` | string | no |  | Memo (Private Note). Internal note about the payment. |

### `record_bill_payment`

**Record Bill Payment (AP).** Record a payment made to a vendor to settle one or more outstanding bills, by check or credit card. Each bill line takes the amount applied so partial payments and paying several bills in a single payment are both supported. Not idempotent: each call creates a new bill payment, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorRef` | string | yes |  | Vendor. A value the product loads from the provider, such as an id; write the value itself. |
| `payType` | string | yes | `"Check"` | Pay With. One of `"Check"`, `"CreditCard"`. |
| `payFromAccountRef` | string | yes |  | Pay From Account. The checking/savings account (for Check) or credit card account (for Credit Card) the payment is made from. A value the product loads from the provider, such as an id; write the value itself. |
| `billLines` | array | yes |  | Bills To Pay. One or more bills this payment applies to. Amounts can be less than the bill balance for a partial payment. Each item: { `billId`, `amount` }. |
| `txnDate` | ISO date-time string | no |  | Payment Date. Defaults to today if empty. |
| `docNumber` | string | no |  | Reference / Check Number. |
| `privateNote` | string | no |  | Memo (Private Note). |

### `read_aging_report`

**Read AR/AP Aging.** Fetch an aging report showing outstanding receivables (money owed to the company) or payables (money the company owes), bucketed by how overdue they are. Choose the report type, optionally set the as-of date, the number of days per aging bucket, the number of buckets, the aging method, and a minimum past-due days filter. Returns both the raw QuickBooks report and a flattened "rows" array (one object per report line, columns as keys) ready for reconciliation or spreadsheet export. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reportType` | string | yes | `"AgedReceivables"` | Report. One of `"AgedReceivables"`, `"AgedReceivableDetail"`, `"AgedPayables"`, `"AgedPayableDetail"`. |
| `reportDate` | ISO date-time string | no |  | As Of Date. The date to age balances against. Defaults to today if empty. |
| `agingPeriod` | number | no |  | Days Per Period. Number of days in each aging bucket (e.g. 30). |
| `numPeriods` | number | no |  | Number of Periods. How many aging buckets to include. |
| `agingMethod` | string | no |  | Aging Method. Whether buckets are calculated from the report date or from each transaction's due date. One of `"Report_Date"`, `"Current"`. |
| `pastDue` | number | no |  | Minimum Days Past Due. Only include transactions overdue by at least this many days. |

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
