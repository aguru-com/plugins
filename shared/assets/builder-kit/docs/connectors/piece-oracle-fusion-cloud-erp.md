# Oracle Fusion Cloud ERP

Enterprise resource planning suite covering financials, procurement, project accounting, supply chain, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-oracle-fusion-cloud-erp'
  version: '0.1.1'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect to your Oracle Fusion Cloud ERP instance using Basic Authentication.
>
> **Required:**
> - **Server URL**: Your Oracle Fusion instance URL (e.g., https://your-instance.fa.us2.oraclecloud.com)
> - **Username**: Your Oracle Cloud username with API access
> - **Password**: Your Oracle Cloud password
>
> Contact your Oracle administrator if you need REST API access enabled.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serverUrl` | string | yes |  | Server URL. Your Oracle Fusion Cloud instance URL (e.g., https://your-instance.fa.us2.oraclecloud.com) |
| `username` | string | yes |  | Username. Your Oracle Cloud username. |
| `password` | string | yes |  | Password. Your Oracle Cloud password. |

## Actions

### `create_invoice`

**Create Invoice.** Create a new payables (supplier) invoice, requiring invoice number, business unit, supplier and supplier site, amount, currencies, key dates, and payment method. Not idempotent: each call inserts a new invoice and repeats create duplicates (the supplier invoice number is not deduplicated here). Use for bills you owe suppliers; for customer billing use Create Receivables Invoice instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceNumber` | string | yes |  | Invoice Number. Unique invoice number from the supplier. |
| `businessUnit` | string | yes |  | Business Unit. The business unit name for the invoice. |
| `supplier` | string | yes |  | Supplier. The supplier name on the invoice. |
| `supplierSite` | string | yes |  | Supplier Site. The supplier site from where goods/services are rendered. |
| `invoiceAmount` | number | yes |  | Invoice Amount. The total invoice amount. |
| `invoiceCurrency` | string | yes | `"USD"` | Invoice Currency. Currency code (e.g., USD, EUR). |
| `paymentCurrency` | string | yes | `"USD"` | Payment Currency. Currency used for payment. |
| `invoiceDate` | string | yes |  | Invoice Date. Invoice date in YYYY-MM-DD format. |
| `accountingDate` | string | yes |  | Accounting Date. Accounting date in YYYY-MM-DD format. |
| `termsDate` | string | yes |  | Terms Date. Date used with payment terms to calculate due dates (YYYY-MM-DD). |
| `paymentMethodCode` | string | yes |  | Payment Method Code. Payment method code (e.g., CHECK, EFT). |
| `paymentTerms` | string | no |  | Payment Terms. Payment terms used to calculate due dates. |
| `description` | string | no |  | Description. Description of the invoice. |
| `invoiceGroup` | string | no |  | Invoice Group. Group name for reporting and payment purposes. |
| `invoiceType` | string | no |  | Invoice Type. Type of invoice. One of `"Standard"`, `"Prepayment"`, `"Credit Memo"`, `"Debit Memo"`. |
| `requester` | string | no |  | Requester. Name of the person who requested the goods or services. |

### `get_invoice`

**Get Invoice.** Fetch one payables (supplier) invoice by its InvoiceId. Read-only and idempotent. Use when you already have the payables invoice ID; to look one up by number, supplier, or status use Find Invoices first. Distinct from Get Receivables Invoice, which retrieves customer-billing (AR) invoices. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The unique identifier of the invoice (InvoiceId or invoicesUniqID). |

### `find_invoices`

**Find Invoices.** List or search payables (supplier) invoices, optionally filtering by invoice number, supplier, business unit, or validation status, with limit/offset paging (default 25, max 500). Read-only and idempotent. Use to discover supplier bills or resolve an InvoiceId; for customer-billing invoices use Find Receivables Invoices instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceNumber` | string | no |  | Invoice Number. Filter by invoice number. |
| `supplier` | string | no |  | Supplier. Filter by supplier name. |
| `businessUnit` | string | no |  | Business Unit. Filter by business unit. |
| `validationStatus` | string | no |  | Validation Status. Filter by validation status. One of `"Not Validated"`, `"Validated"`, `"Needs Revalidation"`. |
| `limit` | number | no | `25` | Limit. Maximum number of records to return (default: 25, max: 500). |
| `offset` | number | no | `0` | Offset. Number of records to skip for pagination. |

### `update_invoice`

**Update Invoice.** Modify an existing payables (supplier) invoice by InvoiceId; only a limited set of fields (description, payment terms, pay group, invoice group, payment method, remittance messages) can be changed and cascade defaulting does not apply. At least one field must be supplied or the call fails. Effectively idempotent since it sets the given values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The unique identifier of the invoice to update. |
| `description` | string | no |  | Description. Updated description for the invoice. |
| `paymentTerms` | string | no |  | Payment Terms. Updated payment terms. |
| `payGroup` | string | no |  | Pay Group. Updated pay group. |
| `invoiceGroup` | string | no |  | Invoice Group. Updated invoice group. |
| `paymentMethodCode` | string | no |  | Payment Method Code. Updated payment method code. |
| `remittanceMessageOne` | string | no |  | Remittance Message 1. Remittance message for payment processing. |
| `remittanceMessageTwo` | string | no |  | Remittance Message 2. Additional remittance message. |
| `remittanceMessageThree` | string | no |  | Remittance Message 3. Additional remittance message. |

### `delete_invoice`

**Delete Invoice.** Permanently delete a payables (supplier) invoice by its InvoiceId. Destructive; idempotent in effect since a removed invoice cannot be deleted again. Oracle typically allows deletion only for unvalidated/unpaid invoices; to back out a validated invoice without removing it use Cancel Invoice instead. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The unique identifier of the invoice to delete. |

### `validate_invoice`

**Validate Invoice.** Run Oracle validation on a payables (supplier) invoice by InvoiceId, checking it and applying any holds so it can proceed to payment. State-changing but effectively idempotent: re-validating an already-validated invoice has no further effect. Use before paying a supplier bill; this does not create or cancel the invoice. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The unique identifier of the invoice to validate. |

### `cancel_invoice`

**Cancel Invoice.** Cancel a payables (supplier) invoice by InvoiceId, voiding its amount so it is no longer payable. State-changing; effectively idempotent since an already-cancelled invoice stays cancelled, though a paid or validated invoice may be rejected by Oracle. Use to back out a supplier bill in place; to remove it entirely use Delete Invoice. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceId` | string | yes |  | Invoice ID. The unique identifier of the invoice to cancel. |

### `create_receivables_invoice`

**Create Receivables Invoice.** Create a new accounts-receivable (customer-billing) invoice, requiring at minimum a business unit, transaction type, and bill-to customer account number. Not idempotent: each call creates a new invoice, and an omitted transaction number is auto-generated, so re-running produces duplicates. Use for billing customers; for supplier bills you owe, use Create Invoice (payables) instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessUnit` | string | yes |  | Business Unit. The business unit under which the invoice is created. |
| `transactionType` | string | yes |  | Transaction Type. The transaction type assigned to the invoice. |
| `transactionSource` | string | no |  | Transaction Source. The transaction source assigned to the invoice. |
| `transactionNumber` | string | no |  | Transaction Number. The transaction number assigned to the invoice. If not provided, it will be auto-generated. |
| `transactionDate` | string | no |  | Transaction Date. The date when the invoice was created (YYYY-MM-DD). |
| `accountingDate` | string | no |  | Accounting Date. The accounting date assigned to the invoice (YYYY-MM-DD). |
| `billToCustomerNumber` | string | yes |  | Bill-to Customer Account Number. The account number of the bill-to customer. |
| `billToCustomerName` | string | no |  | Bill-to Customer Name. The name of the bill-to customer. |
| `billToSite` | string | no |  | Bill-to Site. The number that identifies the bill-to customer site. |
| `invoiceCurrencyCode` | string | no | `"USD"` | Invoice Currency. The currency code of the invoice (e.g., USD, EUR). |
| `paymentTerms` | string | no |  | Payment Terms. The payment terms assigned to the invoice. |
| `dueDate` | string | no |  | Due Date. The date when the invoice is due (YYYY-MM-DD). |
| `purchaseOrder` | string | no |  | PO Number. The purchase order number on the invoice. |
| `comments` | string | no |  | Comments. Comments that accompany the invoice. |
| `invoiceStatus` | string | no | `"Complete"` | Invoice Status. The completion status of the invoice. Must be Complete when creating. One of `"Complete"`, `"Incomplete"`. |
| `shipToCustomerNumber` | string | no |  | Ship-to Customer. The registry identifier of the ship-to customer. |
| `shipToCustomerName` | string | no |  | Ship-to Customer Name. The name of the customer who receives the goods or services. |
| `legalEntityIdentifier` | string | no |  | Legal Entity Identifier. The unique identifier of the legal entity. |
| `crossReference` | string | no |  | Reference. The reference field default value from the transaction source. |

### `get_receivables_invoice`

**Get Receivables Invoice.** Fetch one accounts-receivable (customer) invoice by its CustomerTransactionId. Read-only and idempotent. Use when you already have the AR invoice ID; to look one up by transaction number, customer, or date range use Find Receivables Invoices first. Distinct from Get Invoice, which retrieves payables (supplier) invoices. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerTransactionId` | string | yes |  | Customer Transaction ID. The unique identifier of the receivables invoice. |

### `find_receivables_invoices`

**Find Receivables Invoices.** List or search accounts-receivable (customer) invoices, optionally filtering by transaction number, bill-to customer, status, or a billing-date range, with limit/offset paging (default 25, max 500). Read-only and idempotent. Use this to discover AR invoices or resolve a CustomerTransactionId; for payables (supplier) invoices use Find Invoices instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionNumber` | string | no |  | Transaction Number. Filter by transaction number. |
| `billToCustomerNumber` | string | no |  | Bill-to Customer Account Number. Filter by bill-to customer account number. |
| `invoiceStatus` | string | no |  | Invoice Status. Filter by invoice status. One of `"Complete"`, `"Incomplete"`, `"Frozen"`. |
| `billingDateFrom` | string | no |  | Billing Date From. Filter invoices with billing date on or after this date (YYYY-MM-DD). |
| `billingDateTo` | string | no |  | Billing Date To. Filter invoices with billing date on or before this date (YYYY-MM-DD). |
| `limit` | number | no | `25` | Limit. Maximum number of records to return (default: 25, max: 500). |
| `offset` | number | no | `0` | Offset. Number of records to skip for pagination. |

### `update_receivables_invoice`

**Update Receivables Invoice.** Modify an existing accounts-receivable invoice identified by CustomerTransactionId; only invoice status, payment terms, and transaction date are editable. At least one field must be supplied or the call fails. Effectively idempotent since it sets fields to the values given. The invoice must already exist; use Create Receivables Invoice to add a new one. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerTransactionId` | string | yes |  | Customer Transaction ID. The unique identifier of the receivables invoice to update. |
| `invoiceStatus` | string | no |  | Invoice Status. The completion status of the invoice. One of `"Complete"`, `"Incomplete"`, `"Frozen"`. |
| `paymentTerms` | string | no |  | Payment Terms. The payment terms assigned to the invoice. |
| `transactionDate` | string | no |  | Transaction Date. The date when the invoice was created (YYYY-MM-DD). |

### `delete_receivables_invoice`

**Delete Receivables Invoice.** Permanently delete an accounts-receivable (customer) invoice by its CustomerTransactionId. Destructive; idempotent in effect since a deleted invoice cannot be deleted again (re-running on a missing ID errors). Use only when the invoice should be fully removed rather than corrected; to change status or fields use Update Receivables Invoice. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerTransactionId` | string | yes |  | Customer Transaction ID. The unique identifier of the receivables invoice to delete. |

### `create_payment`

**Create Payment.** Record a manual payables payment (e.g. a check or EFT), requiring business unit, payment number, date, currency, and payment method. Not idempotent: each call records a new payment and re-running issues a duplicate. Use to disburse funds to a payee; to reverse a payment use Void Payment, or Stop Payment to halt one before it clears. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessUnit` | string | yes |  | Business Unit. The business unit name for the payment. |
| `paymentNumber` | number | yes |  | Payment Number. The check number printed on physical check. |
| `paymentDate` | string | yes |  | Payment Date. The date when the payment is made (YYYY-MM-DD). |
| `paymentCurrency` | string | yes | `"USD"` | Payment Currency. The currency in which payment is made (e.g., USD). |
| `paymentMethodCode` | string | yes |  | Payment Method Code. The payment method code (e.g., CHECK, EFT). |
| `payee` | string | no |  | Payee. The party name to whom payment is made. |
| `payeeSite` | string | no |  | Payee Site. The supplier site name to whom payment is made. |
| `paymentProcessProfile` | string | no |  | Payment Process Profile. The payment process profile name. |
| `paymentDocument` | string | no |  | Payment Document. The name of the payment document. |
| `paymentDescription` | string | no |  | Payment Description. The user description for the payment. |
| `disbursementBankAccountName` | string | no |  | Disbursement Bank Account. The name of the internal bank account from where the payment is made. |
| `remitToAccountNumber` | string | no |  | Remit-to Account Number. The supplier's bank account number for electronic payment. |
| `conversionRateType` | string | no |  | Conversion Rate Type. The type of conversion rate used for foreign currency payments. |
| `conversionRate` | number | no |  | Conversion Rate. The conversion rate for foreign currency payments. |
| `addressLine1` | string | no |  | Address Line 1. The first address line of party to whom the payment is made. |
| `city` | string | no |  | City. The city name of the party to whom the payment is made. |
| `state` | string | no |  | State. The state name of the party to whom the payment is made. |
| `country` | string | no |  | Country. The country name of the party to whom the payment is made. |
| `zip` | string | no |  | Postal Code. The postal code of the party to whom the payment is made. |

### `get_payment`

**Get Payment.** Fetch one payables payment by its CheckId. Read-only and idempotent. Use when you already have the payment/check identifier to inspect its status, amount, or payee before voiding or stopping it. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checkId` | string | yes |  | Check ID. The unique identifier of the payment. |

### `find_payments`

**Find Payments.** Read-only search of Oracle Fusion accounts-payable payments, optionally filtered by payment number, payee, business unit, status (Negotiable, Voided, Stopped, Cleared), or a payment-date range, with limit/offset paging. Use to look up or list payments; it never modifies data. To change a payment use Update Payment instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paymentNumber` | number | no |  | Payment Number. Filter by payment number. |
| `payee` | string | no |  | Payee. Filter by payee name. |
| `businessUnit` | string | no |  | Business Unit. Filter by business unit. |
| `paymentStatus` | string | no |  | Payment Status. Filter by payment status. One of `"Negotiable"`, `"Voided"`, `"Stopped"`, `"Cleared"`. |
| `paymentDateFrom` | string | no |  | Payment Date From. Filter payments on or after this date (YYYY-MM-DD). |
| `paymentDateTo` | string | no |  | Payment Date To. Filter payments on or before this date (YYYY-MM-DD). |
| `limit` | number | no | `25` | Limit. Maximum number of records to return (default: 25, max: 500). |
| `offset` | number | no | `0` | Offset. Number of records to skip for pagination. |

### `update_payment`

**Update Payment.** Update an existing Oracle Fusion accounts-payable payment identified by its Check ID, setting its description and/or void dates (void date and void accounting date). Requires the payment to already exist and at least one field to change; only the supplied fields are modified, so reapplying the same values leaves the payment unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checkId` | string | yes |  | Check ID. The unique identifier of the payment to update. |
| `paymentDescription` | string | no |  | Payment Description. Updated description for the payment. |
| `voidDate` | string | no |  | Void Date. The date when the payment is voided (YYYY-MM-DD). |
| `voidAccountingDate` | string | no |  | Void Accounting Date. The date when the voided payment is accounted (YYYY-MM-DD). |

### `stop_payment`

**Stop Payment.** Place a stop-payment request on an issued payables payment by CheckId, with an optional reason and reference, to prevent it from being cashed. State-changing; effectively idempotent since repeating the request leaves the payment stopped. Use when a payment has gone out but should not clear; to fully reverse one already cleared use Void Payment instead. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checkId` | string | yes |  | Check ID. The unique identifier of the payment to stop. |
| `stopReason` | string | no |  | Stop Reason. The reason for stopping the payment. |
| `stopReference` | string | no |  | Stop Reference. A reference for the stop payment request. |

### `void_payment`

**Void Payment.** Void an already-issued payables payment by CheckId, setting its void date (defaults to today) and optional void accounting date. State-changing; effectively idempotent since a voided payment stays voided. Use to reverse a payment that has been issued; to prevent one from clearing before it is cashed use Stop Payment instead. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `checkId` | string | yes |  | Check ID. The unique identifier of the payment to void. |
| `voidDate` | string | no |  | Void Date. The date when the payment is voided (YYYY-MM-DD). Defaults to today. |
| `voidAccountingDate` | string | no |  | Void Accounting Date. The date when the voided payment is accounted (YYYY-MM-DD). |

### `get_journal_batch`

**Get Journal Batch.** Fetch one general-ledger journal batch by its JeBatchId, optionally expanding child resources such as journal headers, errors, action logs, attachments, or descriptive flexfields. Read-only and idempotent. Use when you already have the batch ID; to search by name, status, or period use Find Journal Batches first. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jeBatchId` | string | yes |  | Journal Batch ID. The unique identifier of the journal batch. |
| `expand` | array | no |  | Expand Child Resources. Select child resources to include in the response. One of `"journalHeaders"`, `"journalErrors"`, `"journalActionLogs"`, `"batchAttachment"`, `"journalBatchDFF"`. |

### `find_journal_batches`

**Find Journal Batches.** List or search general-ledger journal batches, optionally filtering by batch name, status (unposted/posted/error), period, journal source, or creator, with limit/offset paging (default 25, max 500). Read-only and idempotent. Use to discover batches or resolve a JeBatchId before fetching or updating a specific batch. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `batchName` | string | no |  | Batch Name. Filter by batch name. |
| `status` | string | no |  | Status. Filter by batch status. One of `"U"`, `"P"`, `"E"`. |
| `defaultPeriodName` | string | no |  | Period Name. Filter by accounting period name. |
| `userJeSourceName` | string | no |  | Journal Source. Filter by journal source name. |
| `createdBy` | string | no |  | Created By. Filter by the user who created the batch. |
| `limit` | number | no | `25` | Limit. Maximum number of records to return (default: 25, max: 500). |
| `offset` | number | no | `0` | Offset. Number of records to skip for pagination. |

### `update_journal_batch`

**Update Journal Batch.** Modify a general-ledger journal batch identified by JeBatchId; only its status and reversal attributes (reverse flag, reversal date/period/method) are editable. At least one field must be supplied or the call fails. Effectively idempotent since it sets the given fields. The batch must already exist; use Find Journal Batches to locate it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jeBatchId` | string | yes |  | Journal Batch ID. The unique identifier of the journal batch to update. |
| `status` | string | no |  | Batch Status. The status of the batch. One of `"U"`, `"P"`. |
| `reversalFlag` | boolean | no | `false` | Reverse Journals. Indicates whether to reverse all journals in the batch. |
| `reversalDate` | string | no |  | Reversal Date. The reversal date for the journals in the batch (YYYY-MM-DD). |
| `reversalPeriod` | string | no |  | Reversal Period. The reversal period for the journals in the batch. |
| `reversalMethodMeaning` | string | no |  | Reversal Method. The reversal method for the journals in the batch. One of `"Change sign"`, `"Switch debit or credit"`. |

### `delete_journal_batch`

**Delete Journal Batch.** Permanently delete a general-ledger journal batch by its JeBatchId. Destructive; idempotent in effect since a removed batch cannot be deleted again. Typically only unposted batches can be removed; use when discarding a draft batch rather than correcting it (use Update Journal Batch to change status or reversal attributes). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jeBatchId` | string | yes |  | Journal Batch ID. The unique identifier of the journal batch to delete. |

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
