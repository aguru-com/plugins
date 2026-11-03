# Xero

Beautiful accounting software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-xero'
  version: '0.8.1'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> 1. Log in to Xero.
> 2. Go to [Developer portal](https://developer.xero.com/app/manage/).
> 3. Click on the App you want to integrate.
> 4. On the left, click on `Configuration`.
> 5. Enter your `redirect url`.
> 6. Copy the `Client Id` and `Client Secret`.
>
> The connection requests Xero's granular scopes (for example `accounting.invoices` and `accounting.payments` instead of `accounting.transactions`), which apps created on or after 2 March 2026 require. Receipts, Expense Claims and Journals are not available on connections created with this version.

## Actions

### `xero_create_contact`

**Create or Update Contact.** Create a new Xero contact (customer or supplier) or update an existing one when a contact ID is supplied. Pick this to maintain the contact record that invoices, bills, and payments attach to. Supplying an existing contact ID updates that record in place (idempotent on a fixed ID); omitting it creates a new contact each call, so de-duplicate by looking the contact up first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | no |  | Contact ID. ID of the contact to create invoice for. |
| `name` | string | yes |  | Contact Name. Contact name, in full. |
| `email` | string | no |  | Contact Email. Email address of the contact. |

Output fields:

- `Status`: Response Status
- `Contacts`: Contacts
- `Contacts[].ContactID`: Contact ID
- `Contacts[].Name`: Name
- `Contacts[].FirstName`: First Name
- `Contacts[].LastName`: Last Name
- `Contacts[].EmailAddress`: Email (email)
- `Contacts[].ContactStatus`: Status
- `Contacts[].IsCustomer`: Is Customer (boolean)
- `Contacts[].IsSupplier`: Is Supplier (boolean)
- `Contacts[].TaxNumber`: Tax Number
- `Contacts[].DefaultCurrency`: Default Currency
- `Contacts[].Phones`: Phones
- `Contacts[].Phones[].PhoneType`: Type
- `Contacts[].Phones[].PhoneNumber`: Number
- `Contacts[].Phones[].PhoneAreaCode`: Area Code
- `Contacts[].Phones[].PhoneCountryCode`: Country Code
- `Contacts[].Addresses`: Addresses
- `Contacts[].Addresses[].AddressType`: Type
- `Contacts[].Addresses[].AddressLine1`: Line 1
- `Contacts[].Addresses[].AddressLine2`: Line 2
- `Contacts[].Addresses[].City`: City
- `Contacts[].Addresses[].Region`: Region
- `Contacts[].Addresses[].PostalCode`: Postal Code
- `Contacts[].Addresses[].Country`: Country
- `Contacts[].HasAttachments`: Has Attachments (boolean)

### `xero_create_invoice`

**Create or Update Invoice.** Create a new ACCREC sales invoice for a customer (resolving or creating the contact from name/email) or update an existing invoice when an invoice ID is supplied. Use this for a single sales invoice; for recurring billing use Create Repeating Sales Invoice. Supplying an invoice ID updates that record (idempotent on a fixed ID); omitting it creates a new invoice each call. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | no |  | Invoice. Select an invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Contact Name. Contact name, in full. |
| `email` | string | no |  | Contact Email. Email address of the contact. |
| `line_item` | object | yes |  | Line Item. One invoice line as key/value pairs, e.g. Description, Quantity, UnitAmount, AccountCode (such as 200 for Sales) and TaxType. Use List Accounts and List Tax Rates to find valid codes. |
| `date` | string | no |  | Date Prepared. Date the invoice was created. Format example: 2019-03-11. |
| `due_date` | string | yes |  | Due Date. Due date of the invoice. Format example: 2019-03-11. |
| `reference` | string | no |  | Invoice Reference. Reference number of the Invoice. |
| `status` | string | yes |  | Status. Invoice Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`, `"DELETED"`, `"VOIDED"`. |

Output fields:

- `Status`: Response Status
- `Invoices`: Invoices
- `Invoices[].InvoiceID`: Invoice ID
- `Invoices[].InvoiceNumber`: Invoice Number
- `Invoices[].Type`: Type (ACCREC sales / ACCPAY bill)
- `Invoices[].Status`: Status
- `Invoices[].Reference`: Reference
- `Invoices[].Contact`: Contact
- `Invoices[].Contact.ContactID`: Contact ID
- `Invoices[].Contact.Name`: Contact Name
- `Invoices[].Contact.EmailAddress`: Contact Email (email)
- `Invoices[].DateString`: Date (date)
- `Invoices[].DueDateString`: Due Date (date)
- `Invoices[].LineAmountTypes`: Line Amount Types
- `Invoices[].SubTotal`: Subtotal (number)
- `Invoices[].TotalTax`: Total Tax (number)
- `Invoices[].Total`: Total (number)
- `Invoices[].CurrencyCode`: Currency
- `Invoices[].CurrencyRate`: Currency Rate (number)
- `Invoices[].AmountDue`: Amount Due (number)
- `Invoices[].AmountPaid`: Amount Paid (number)
- `Invoices[].AmountCredited`: Amount Credited (number)
- `Invoices[].SentToContact`: Sent to Contact (boolean)
- `Invoices[].BrandingThemeID`: Branding Theme ID
- `Invoices[].Url`: Source URL (url)
- `Invoices[].HasAttachments`: Has Attachments (boolean)
- `Invoices[].LineItems`: Line Items
- `Invoices[].LineItems[].LineItemID`: Line Item ID
- `Invoices[].LineItems[].Description`: Description
- `Invoices[].LineItems[].Quantity`: Quantity (number)
- `Invoices[].LineItems[].UnitAmount`: Unit Amount (number)
- `Invoices[].LineItems[].ItemCode`: Item Code
- `Invoices[].LineItems[].AccountCode`: Account Code
- `Invoices[].LineItems[].TaxType`: Tax Type
- `Invoices[].LineItems[].TaxAmount`: Tax Amount (number)
- `Invoices[].LineItems[].LineAmount`: Line Amount (number)
- `Invoices[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `Invoices[].LineItems[].Tracking`: Tracking
- `Invoices[].LineItems[].Tracking[].Name`: Tracking Category
- `Invoices[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_allocate_credit_note_to_invoice`

**Allocate Credit Note to Invoice.** Apply a specified amount of an existing credit note against a specific invoice in Xero, both referenced by ID. Pick this to offset an outstanding invoice with available credit. Not idempotent: each call records another allocation, so re-running over-allocates; resolve the credit-note and invoice IDs and the remaining credit first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `credit_note_id` | string | yes |  | Credit Note. Select a credit note to allocate from. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | yes |  | Invoice. Select an invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | yes |  | Amount. The amount of the credit to allocate. |
| `date` | string | no |  | Allocation Date. Date of allocation. Format: YYYY-MM-DD. Optional. |

Output fields:

- `Status`: Response Status
- `Allocations`: Allocations
- `Allocations[].AllocationID`: Allocation ID
- `Allocations[].Amount`: Amount (number)
- `Allocations[].DateString`: Date (date)
- `Allocations[].Invoice`: Invoice
- `Allocations[].Invoice.InvoiceID`: Invoice ID
- `Allocations[].Invoice.InvoiceNumber`: Invoice Number
- `Allocations[].CreditNote`: Credit Note
- `Allocations[].CreditNote.CreditNoteID`: Credit Note ID
- `Allocations[].CreditNote.CreditNoteNumber`: Credit Note Number

### `xero_create_bank_transfer`

**Create Bank Transfer.** Record a transfer of money between two of the organization's own Xero bank accounts (the two account currencies must match). Pick this for internal account-to-account movements, not for paying invoices (use Create Payment). Not idempotent: each call records another transfer, so re-running duplicates it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `from_bank_account_id` | string | yes |  | From Bank Account. The bank account the money leaves. A value the product loads from the provider, such as an id; write the value itself. |
| `to_bank_account_id` | string | yes |  | To Bank Account. The bank account the money arrives in. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | yes |  | Amount. Amount to transfer. Currencies must match between accounts. |
| `date` | string | no |  | Transfer Date. YYYY-MM-DD. Defaults to today if not provided. |
| `reference` | string | no |  | Reference. Reference for the transfer. |
| `from_is_reconciled` | boolean | no | `false` | From Is Reconciled. Mark source account transaction as reconciled. |
| `to_is_reconciled` | boolean | no | `false` | To Is Reconciled. Mark destination account transaction as reconciled. |

Output fields:

- `Status`: Response Status
- `BankTransfers`: Bank Transfers
- `BankTransfers[].BankTransferID`: Bank Transfer ID
- `BankTransfers[].Amount`: Amount (number)
- `BankTransfers[].DateString`: Date (date)
- `BankTransfers[].Reference`: Reference
- `BankTransfers[].CurrencyRate`: Currency Rate (number)
- `BankTransfers[].FromBankAccount`: From Bank Account
- `BankTransfers[].FromBankAccount.AccountID`: Account ID
- `BankTransfers[].FromBankAccount.Code`: Account Code
- `BankTransfers[].FromBankAccount.Name`: Account Name
- `BankTransfers[].ToBankAccount`: To Bank Account
- `BankTransfers[].ToBankAccount.AccountID`: Account ID
- `BankTransfers[].ToBankAccount.Code`: Account Code
- `BankTransfers[].ToBankAccount.Name`: Account Name
- `BankTransfers[].FromBankTransactionID`: From Bank Transaction ID
- `BankTransfers[].ToBankTransactionID`: To Bank Transaction ID

### `xero_create_quote_draft`

**Create New Quote Draft.** Create a new draft sales quote in Xero for a contact, with at least one line item (Description required) plus optional title, summary, terms, and expiry. Pick this to draft a customer-facing quote before it becomes an invoice. Not idempotent: each call creates another quote. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | string | yes |  | Date. Date the quote was issued (YYYY-MM-DD). |
| `expiry_date` | string | no |  | Expiry Date. Date the quote expires (YYYY-MM-DD). |
| `line_item` | object | yes | `{"Description":"Consulting services"}` | Line Item. At minimum, provide a Description. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `reference` | string | no |  | Reference. |
| `quote_number` | string | no |  | Quote Number. |
| `title` | string | no |  | Title. |
| `summary` | string | no |  | Summary. |
| `terms` | string | no |  | Terms. |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`. |

Output fields:

- `Status`: Response Status
- `Quotes`: Quotes
- `Quotes[].QuoteID`: Quote ID
- `Quotes[].QuoteNumber`: Quote Number
- `Quotes[].Reference`: Reference
- `Quotes[].Status`: Status
- `Quotes[].Title`: Title
- `Quotes[].Terms`: Terms
- `Quotes[].Contact`: Contact
- `Quotes[].Contact.ContactID`: Contact ID
- `Quotes[].Contact.Name`: Contact Name
- `Quotes[].Contact.EmailAddress`: Contact Email (email)
- `Quotes[].DateString`: Date (date)
- `Quotes[].ExpiryDateString`: Expiry Date (date)
- `Quotes[].LineAmountTypes`: Line Amount Types
- `Quotes[].SubTotal`: Subtotal (number)
- `Quotes[].TotalTax`: Total Tax (number)
- `Quotes[].Total`: Total (number)
- `Quotes[].CurrencyCode`: Currency
- `Quotes[].CurrencyRate`: Currency Rate (number)
- `Quotes[].LineItems`: Line Items
- `Quotes[].LineItems[].LineItemID`: Line Item ID
- `Quotes[].LineItems[].Description`: Description
- `Quotes[].LineItems[].Quantity`: Quantity (number)
- `Quotes[].LineItems[].UnitAmount`: Unit Amount (number)
- `Quotes[].LineItems[].ItemCode`: Item Code
- `Quotes[].LineItems[].AccountCode`: Account Code
- `Quotes[].LineItems[].TaxType`: Tax Type
- `Quotes[].LineItems[].TaxAmount`: Tax Amount (number)
- `Quotes[].LineItems[].LineAmount`: Line Amount (number)
- `Quotes[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `Quotes[].LineItems[].Tracking`: Tracking
- `Quotes[].LineItems[].Tracking[].Name`: Tracking Category
- `Quotes[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_send_invoice_email`

**Send Sales Invoice by Email.** Email an existing sales invoice to its contact via Xero, using the contact email and branding already on the invoice. Pick this to deliver an invoice that is created and ready to send. Not idempotent: each call sends the email again; the invoice must already exist and be in a sendable state. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | yes |  | Sales Invoice (Sendable). Select a sales invoice with a valid status for sending email (SUBMITTED, AUTHORISED, or PAID). A value the product loads from the provider, such as an id; write the value itself. |

### `xero_create_bill`

**Create Bill.** Create a new accounts-payable (ACCPAY) bill from a supplier contact, with at least one line item (Description required) and optional dates, reference, and status. Pick this for money the organization owes a supplier; for customer-facing sales invoices use Create or Update Invoice instead. Not idempotent: each call creates another bill. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `line_item` | object | yes | `{"Description":"Goods/Services"}` | Line Item. At minimum, provide a Description. |
| `date` | string | no |  | Date. Date the bill was issued (YYYY-MM-DD). Optional. |
| `due_date` | string | no |  | Due Date. Date the bill is due (YYYY-MM-DD). Optional. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `invoice_number` | string | no |  | Bill Number (Reference). |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`. |

Output fields:

- `Status`: Response Status
- `Invoices`: Invoices
- `Invoices[].InvoiceID`: Invoice ID
- `Invoices[].InvoiceNumber`: Invoice Number
- `Invoices[].Type`: Type (ACCREC sales / ACCPAY bill)
- `Invoices[].Status`: Status
- `Invoices[].Reference`: Reference
- `Invoices[].Contact`: Contact
- `Invoices[].Contact.ContactID`: Contact ID
- `Invoices[].Contact.Name`: Contact Name
- `Invoices[].Contact.EmailAddress`: Contact Email (email)
- `Invoices[].DateString`: Date (date)
- `Invoices[].DueDateString`: Due Date (date)
- `Invoices[].LineAmountTypes`: Line Amount Types
- `Invoices[].SubTotal`: Subtotal (number)
- `Invoices[].TotalTax`: Total Tax (number)
- `Invoices[].Total`: Total (number)
- `Invoices[].CurrencyCode`: Currency
- `Invoices[].CurrencyRate`: Currency Rate (number)
- `Invoices[].AmountDue`: Amount Due (number)
- `Invoices[].AmountPaid`: Amount Paid (number)
- `Invoices[].AmountCredited`: Amount Credited (number)
- `Invoices[].SentToContact`: Sent to Contact (boolean)
- `Invoices[].BrandingThemeID`: Branding Theme ID
- `Invoices[].Url`: Source URL (url)
- `Invoices[].HasAttachments`: Has Attachments (boolean)
- `Invoices[].LineItems`: Line Items
- `Invoices[].LineItems[].LineItemID`: Line Item ID
- `Invoices[].LineItems[].Description`: Description
- `Invoices[].LineItems[].Quantity`: Quantity (number)
- `Invoices[].LineItems[].UnitAmount`: Unit Amount (number)
- `Invoices[].LineItems[].ItemCode`: Item Code
- `Invoices[].LineItems[].AccountCode`: Account Code
- `Invoices[].LineItems[].TaxType`: Tax Type
- `Invoices[].LineItems[].TaxAmount`: Tax Amount (number)
- `Invoices[].LineItems[].LineAmount`: Line Amount (number)
- `Invoices[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `Invoices[].LineItems[].Tracking`: Tracking
- `Invoices[].LineItems[].Tracking[].Name`: Tracking Category
- `Invoices[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_create_payment`

**Create Payment.** Record a payment against an existing Xero invoice (or bill), paid from a specific bank account. Pick this once an invoice exists and you need to settle it for an amount up to the amount due. Not idempotent: each call records another payment, so re-running double-pays; resolve the target invoice and bank account IDs first (separate find/lookup actions). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | yes |  | Invoice (Authorised). Select an authorised invoice (sales or bill) to apply payment to. A value the product loads from the provider, such as an id; write the value itself. |
| `account_id` | string | yes |  | Bank Account. Select a bank account. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | yes |  | Amount. Payment amount (must be <= amount due). |
| `date` | string | yes |  | Payment Date. YYYY-MM-DD. |
| `reference` | string | no |  | Reference. |
| `is_reconciled` | boolean | no | `false` | Is Reconciled. Mark payment as reconciled (optional). |

Output fields:

- `Status`: Response Status
- `Payments`: Payments
- `Payments[].PaymentID`: Payment ID
- `Payments[].Amount`: Amount (number)
- `Payments[].BankAmount`: Bank Amount (number)
- `Payments[].CurrencyRate`: Currency Rate (number)
- `Payments[].Reference`: Reference
- `Payments[].Status`: Status
- `Payments[].PaymentType`: Payment Type
- `Payments[].IsReconciled`: Is Reconciled (boolean)
- `Payments[].Invoice`: Invoice
- `Payments[].Invoice.InvoiceID`: Invoice ID
- `Payments[].Invoice.InvoiceNumber`: Invoice Number
- `Payments[].Invoice.Type`: Invoice Type
- `Payments[].Invoice.Contact`: Contact
- `Payments[].Invoice.Contact.ContactID`: Contact ID
- `Payments[].Invoice.Contact.Name`: Contact Name
- `Payments[].Invoice.Contact.EmailAddress`: Contact Email (email)
- `Payments[].Account`: Bank Account
- `Payments[].Account.AccountID`: Account ID
- `Payments[].Account.Code`: Account Code
- `Payments[].Account.Name`: Account Name

### `xero_create_purchase_order`

**Create Purchase Order.** Create a new Xero purchase order for a supplier contact, with at least one line item (Description required) and optional delivery, reference, and status details. Pick this to raise a new order to a supplier; to change an existing one use Update Purchase Order. Not idempotent: each call creates another purchase order. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `line_item` | object | yes | `{"Description":"Item"}` | Line Item. At minimum, provide a Description. |
| `date` | string | no |  | Date. Date the purchase order was issued (YYYY-MM-DD). Optional. |
| `delivery_date` | string | no |  | Delivery Date. Date goods are to be delivered (YYYY-MM-DD). Optional. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `purchase_order_number` | string | no |  | Purchase Order Number. |
| `reference` | string | no |  | Reference. |
| `branding_theme_id` | string | no |  | Branding Theme. Select a branding theme. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`, `"BILLED"`, `"DELETED"`. |
| `delivery_address` | string | no |  | Delivery Address. |
| `attention_to` | string | no |  | Attention To. |
| `telephone` | string | no |  | Telephone. |
| `delivery_instructions` | string | no |  | Delivery Instructions. |
| `expected_arrival_date` | string | no |  | Expected Arrival Date. YYYY-MM-DD. Optional. |

Output fields:

- `Status`: Response Status
- `PurchaseOrders`: Purchase Orders
- `PurchaseOrders[].PurchaseOrderID`: Purchase Order ID
- `PurchaseOrders[].PurchaseOrderNumber`: Purchase Order Number
- `PurchaseOrders[].Reference`: Reference
- `PurchaseOrders[].Status`: Status
- `PurchaseOrders[].Contact`: Supplier
- `PurchaseOrders[].Contact.ContactID`: Contact ID
- `PurchaseOrders[].Contact.Name`: Contact Name
- `PurchaseOrders[].Contact.EmailAddress`: Contact Email (email)
- `PurchaseOrders[].DateString`: Date (date)
- `PurchaseOrders[].DeliveryDateString`: Delivery Date (date)
- `PurchaseOrders[].DeliveryAddress`: Delivery Address
- `PurchaseOrders[].AttentionTo`: Attention To
- `PurchaseOrders[].Telephone`: Telephone
- `PurchaseOrders[].DeliveryInstructions`: Delivery Instructions
- `PurchaseOrders[].SentToContact`: Sent to Contact (boolean)
- `PurchaseOrders[].LineAmountTypes`: Line Amount Types
- `PurchaseOrders[].SubTotal`: Subtotal (number)
- `PurchaseOrders[].TotalTax`: Total Tax (number)
- `PurchaseOrders[].Total`: Total (number)
- `PurchaseOrders[].CurrencyCode`: Currency
- `PurchaseOrders[].CurrencyRate`: Currency Rate (number)
- `PurchaseOrders[].LineItems`: Line Items
- `PurchaseOrders[].LineItems[].LineItemID`: Line Item ID
- `PurchaseOrders[].LineItems[].Description`: Description
- `PurchaseOrders[].LineItems[].Quantity`: Quantity (number)
- `PurchaseOrders[].LineItems[].UnitAmount`: Unit Amount (number)
- `PurchaseOrders[].LineItems[].ItemCode`: Item Code
- `PurchaseOrders[].LineItems[].AccountCode`: Account Code
- `PurchaseOrders[].LineItems[].TaxType`: Tax Type
- `PurchaseOrders[].LineItems[].TaxAmount`: Tax Amount (number)
- `PurchaseOrders[].LineItems[].LineAmount`: Line Amount (number)
- `PurchaseOrders[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `PurchaseOrders[].LineItems[].Tracking`: Tracking
- `PurchaseOrders[].LineItems[].Tracking[].Name`: Tracking Category
- `PurchaseOrders[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_update_purchase_order`

**Update Purchase Order.** Update an existing Xero purchase order identified by its ID, changing fields such as status, delivery address/instructions, attention-to, telephone, or expected arrival date. Idempotent on a fixed purchase-order ID. To raise a new order use Create Purchase Order instead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `purchase_order_id` | string | yes |  | Purchase Order. Select a purchase order to update. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`, `"BILLED"`, `"DELETED"`. |
| `sent_to_contact` | boolean | no | `false` | Mark as Sent to Contact. |
| `delivery_address` | string | no |  | Delivery Address. |
| `attention_to` | string | no |  | Attention To. |
| `telephone` | string | no |  | Telephone. |
| `delivery_instructions` | string | no |  | Delivery Instructions. |
| `expected_arrival_date` | string | no |  | Expected Arrival Date (YYYY-MM-DD). |

Output fields:

- `Status`: Response Status
- `PurchaseOrders`: Purchase Orders
- `PurchaseOrders[].PurchaseOrderID`: Purchase Order ID
- `PurchaseOrders[].PurchaseOrderNumber`: Purchase Order Number
- `PurchaseOrders[].Reference`: Reference
- `PurchaseOrders[].Status`: Status
- `PurchaseOrders[].Contact`: Supplier
- `PurchaseOrders[].Contact.ContactID`: Contact ID
- `PurchaseOrders[].Contact.Name`: Contact Name
- `PurchaseOrders[].Contact.EmailAddress`: Contact Email (email)
- `PurchaseOrders[].DateString`: Date (date)
- `PurchaseOrders[].DeliveryDateString`: Delivery Date (date)
- `PurchaseOrders[].DeliveryAddress`: Delivery Address
- `PurchaseOrders[].AttentionTo`: Attention To
- `PurchaseOrders[].Telephone`: Telephone
- `PurchaseOrders[].DeliveryInstructions`: Delivery Instructions
- `PurchaseOrders[].SentToContact`: Sent to Contact (boolean)
- `PurchaseOrders[].LineAmountTypes`: Line Amount Types
- `PurchaseOrders[].SubTotal`: Subtotal (number)
- `PurchaseOrders[].TotalTax`: Total Tax (number)
- `PurchaseOrders[].Total`: Total (number)
- `PurchaseOrders[].CurrencyCode`: Currency
- `PurchaseOrders[].CurrencyRate`: Currency Rate (number)
- `PurchaseOrders[].LineItems`: Line Items
- `PurchaseOrders[].LineItems[].LineItemID`: Line Item ID
- `PurchaseOrders[].LineItems[].Description`: Description
- `PurchaseOrders[].LineItems[].Quantity`: Quantity (number)
- `PurchaseOrders[].LineItems[].UnitAmount`: Unit Amount (number)
- `PurchaseOrders[].LineItems[].ItemCode`: Item Code
- `PurchaseOrders[].LineItems[].AccountCode`: Account Code
- `PurchaseOrders[].LineItems[].TaxType`: Tax Type
- `PurchaseOrders[].LineItems[].TaxAmount`: Tax Amount (number)
- `PurchaseOrders[].LineItems[].LineAmount`: Line Amount (number)
- `PurchaseOrders[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `PurchaseOrders[].LineItems[].Tracking`: Tracking
- `PurchaseOrders[].LineItems[].Tracking[].Name`: Tracking Category
- `PurchaseOrders[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_upload_attachment`

**Upload Attachment.** Attach a file (max 10MB) to an existing Xero record such as an invoice, bill, credit note, purchase order, quote, contact, or bank transaction, selected by resource type and ID. Pick this to add supporting documents (receipts, PDFs) to an already-created record, not to create the record itself. Not idempotent: it appends a new attachment per call; IncludeOnline only applies to ACCREC invoices and credit notes. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `resource_type` | string | yes |  | Resource Type. The Xero resource to attach the file to. Receipt works only on connections created before version 0.8.0. One of `"Invoices"`, `"CreditNotes"`, `"PurchaseOrders"`, `"Quotes"`, `"BankTransfers"`, `"BankTransactions"`, `"Contacts"`, `"Accounts"`, `"ManualJournals"`, `"Receipts"`, `"RepeatingInvoices"`. |
| `resource_id` | string | yes |  | Resource. Select the specific resource to attach the file to. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload. Max 10MB per Xero limits. Files are not supported; an action that needs one fails. |
| `file_name` | string | no |  | File Name (override). Optional file name to use in Xero. Avoid characters: < > : " / \ \| ? *. |
| `content_type` | string | no |  | Content Type. MIME type of the file (e.g., image/png). If not set, will be inferred or default to application/octet-stream. |
| `include_online` | boolean | no | `false` | Include with Online Invoice. Only applicable to ACCREC invoices and ACCREC credit notes. Adds IncludeOnline=true query parameter. |

Output fields:

- `Status`: Response Status
- `Attachments`: Attachments
- `Attachments[].AttachmentID`: Attachment ID
- `Attachments[].FileName`: File Name
- `Attachments[].Url`: URL (url)
- `Attachments[].MimeType`: MIME Type
- `Attachments[].ContentLength`: Size (filesize)
- `Attachments[].IncludeOnline`: Included Online (boolean)

### `xero_add_items_to_sales_invoice`

**Add Items to Existing Sales Invoice.** Append new line items to an existing ACCREC sales invoice, preserving its current lines (the action fetches the invoice and merges). Pick this to add charges to an invoice without touching existing lines; to edit or replace existing lines use Update Sales Invoice instead. Not idempotent: re-running appends the same items again. AUTHORISED invoices require the allow-authorised flag. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | yes |  | Invoice. Select an invoice. A value the product loads from the provider, such as an id; write the value itself. |
| `allow_authorised` | boolean | no | `false` | Allow AUTHORISED invoices. Enable adding items to AUTHORISED invoices (Xero allows limited updates for paid/part-paid ACCREC). |
| `new_line_items` | array | yes |  | New Line Items. Each item: { `Description`, `Quantity`?, `UnitAmount`?, `AccountCode`?, `ItemCode`?, `TaxType`?, `DiscountRate`? }. |

Output fields:

- `Status`: Response Status
- `Invoices`: Invoices
- `Invoices[].InvoiceID`: Invoice ID
- `Invoices[].InvoiceNumber`: Invoice Number
- `Invoices[].Type`: Type (ACCREC sales / ACCPAY bill)
- `Invoices[].Status`: Status
- `Invoices[].Reference`: Reference
- `Invoices[].Contact`: Contact
- `Invoices[].Contact.ContactID`: Contact ID
- `Invoices[].Contact.Name`: Contact Name
- `Invoices[].Contact.EmailAddress`: Contact Email (email)
- `Invoices[].DateString`: Date (date)
- `Invoices[].DueDateString`: Due Date (date)
- `Invoices[].LineAmountTypes`: Line Amount Types
- `Invoices[].SubTotal`: Subtotal (number)
- `Invoices[].TotalTax`: Total Tax (number)
- `Invoices[].Total`: Total (number)
- `Invoices[].CurrencyCode`: Currency
- `Invoices[].CurrencyRate`: Currency Rate (number)
- `Invoices[].AmountDue`: Amount Due (number)
- `Invoices[].AmountPaid`: Amount Paid (number)
- `Invoices[].AmountCredited`: Amount Credited (number)
- `Invoices[].SentToContact`: Sent to Contact (boolean)
- `Invoices[].BrandingThemeID`: Branding Theme ID
- `Invoices[].Url`: Source URL (url)
- `Invoices[].HasAttachments`: Has Attachments (boolean)
- `Invoices[].LineItems`: Line Items
- `Invoices[].LineItems[].LineItemID`: Line Item ID
- `Invoices[].LineItems[].Description`: Description
- `Invoices[].LineItems[].Quantity`: Quantity (number)
- `Invoices[].LineItems[].UnitAmount`: Unit Amount (number)
- `Invoices[].LineItems[].ItemCode`: Item Code
- `Invoices[].LineItems[].AccountCode`: Account Code
- `Invoices[].LineItems[].TaxType`: Tax Type
- `Invoices[].LineItems[].TaxAmount`: Tax Amount (number)
- `Invoices[].LineItems[].LineAmount`: Line Amount (number)
- `Invoices[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `Invoices[].LineItems[].Tracking`: Tracking
- `Invoices[].LineItems[].Tracking[].Name`: Tracking Category
- `Invoices[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_create_credit_note`

**Create Credit Note.** Create a new Xero credit note for a contact, either accounts-receivable (ACCRECCREDIT, customer refunds) or accounts-payable (ACCPAYCREDIT, supplier credits), with optional line items and status. Pick this to issue credit; to apply it against an invoice afterward use Allocate Credit Note to Invoice. Not idempotent: each call creates another credit note. Reference is honored only for ACCRECCREDIT. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | yes | `"ACCRECCREDIT"` | Type. One of `"ACCRECCREDIT"`, `"ACCPAYCREDIT"`. |
| `contact_id` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | string | no |  | Date. YYYY-MM-DD. Defaults to today if not provided. |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"AUTHORISED"`. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `credit_note_number` | string | no |  | Credit Note Number. |
| `reference` | string | no |  | Reference (ACCRECCREDIT only). |
| `currency_code` | string | no |  | Currency Code. |
| `branding_theme_id` | string | no |  | Branding Theme. Select a branding theme. A value the product loads from the provider, such as an id; write the value itself. |
| `line_items` | array | no |  | Line Items. Add one or more line items. At minimum, each line needs a Description. Each item: { `Description`, `Quantity`?, `UnitAmount`?, `AccountCode`?, `ItemCode`?, `TaxType`? }. |

Output fields:

- `Status`: Response Status
- `CreditNotes`: Credit Notes
- `CreditNotes[].CreditNoteID`: Credit Note ID
- `CreditNotes[].CreditNoteNumber`: Credit Note Number
- `CreditNotes[].Type`: Type
- `CreditNotes[].Status`: Status
- `CreditNotes[].Reference`: Reference
- `CreditNotes[].Contact`: Contact
- `CreditNotes[].Contact.ContactID`: Contact ID
- `CreditNotes[].Contact.Name`: Contact Name
- `CreditNotes[].Contact.EmailAddress`: Contact Email (email)
- `CreditNotes[].DateString`: Date (date)
- `CreditNotes[].LineAmountTypes`: Line Amount Types
- `CreditNotes[].SubTotal`: Subtotal (number)
- `CreditNotes[].TotalTax`: Total Tax (number)
- `CreditNotes[].Total`: Total (number)
- `CreditNotes[].CurrencyCode`: Currency
- `CreditNotes[].CurrencyRate`: Currency Rate (number)
- `CreditNotes[].RemainingCredit`: Remaining Credit (number)
- `CreditNotes[].Allocations`: Allocations
- `CreditNotes[].Allocations[].AllocationID`: Allocation ID
- `CreditNotes[].Allocations[].Amount`: Amount (number)
- `CreditNotes[].Allocations[].Invoice`: Invoice
- `CreditNotes[].Allocations[].Invoice.InvoiceID`: Invoice ID
- `CreditNotes[].Allocations[].Invoice.InvoiceNumber`: Invoice Number
- `CreditNotes[].LineItems`: Line Items
- `CreditNotes[].LineItems[].LineItemID`: Line Item ID
- `CreditNotes[].LineItems[].Description`: Description
- `CreditNotes[].LineItems[].Quantity`: Quantity (number)
- `CreditNotes[].LineItems[].UnitAmount`: Unit Amount (number)
- `CreditNotes[].LineItems[].ItemCode`: Item Code
- `CreditNotes[].LineItems[].AccountCode`: Account Code
- `CreditNotes[].LineItems[].TaxType`: Tax Type
- `CreditNotes[].LineItems[].TaxAmount`: Tax Amount (number)
- `CreditNotes[].LineItems[].LineAmount`: Line Amount (number)
- `CreditNotes[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `CreditNotes[].LineItems[].Tracking`: Tracking
- `CreditNotes[].LineItems[].Tracking[].Name`: Tracking Category
- `CreditNotes[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_create_inventory_item`

**Create Inventory Item.** Creates a Xero item (product or service) keyed by its item code, optionally tracked as inventory via sales, purchase, COGS and inventory-asset accounts picked by account. Pick this to register a catalog item that line items can later reference by ItemCode; use Create or Update Item to work with account codes directly. Idempotent on the code: if an item with this code already exists, Xero updates it instead of creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `code` | string | yes |  | Item Code. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Sales Description. |
| `purchase_description` | string | no |  | Purchase Description. |
| `is_sold` | boolean | no | `true` | Is Sold. |
| `is_purchased` | boolean | no | `true` | Is Purchased. |
| `sales_details` | object | no | `{"UnitPrice":0}` | Sales Details. |
| `sales_account_id` | string | no |  | Account. Select an account. A value the product loads from the provider, such as an id; write the value itself. |
| `purchase_details` | object | no | `{"UnitPrice":0}` | Purchase Details. |
| `purchase_account_id` | string | no |  | Account. Select an account. A value the product loads from the provider, such as an id; write the value itself. |
| `cogs_account_id` | string | no |  | Account. Select an account. A value the product loads from the provider, such as an id; write the value itself. |
| `inventory_asset_account_id` | string | no |  | Account. Select an account. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `Status`: Response Status
- `Items`: Items
- `Items[].ItemID`: Item ID
- `Items[].Code`: Item Code
- `Items[].Name`: Name
- `Items[].Description`: Sales Description
- `Items[].IsSold`: Is Sold (boolean)
- `Items[].IsPurchased`: Is Purchased (boolean)
- `Items[].IsTrackedAsInventory`: Is Tracked as Inventory (boolean)
- `Items[].InventoryAssetAccountCode`: Inventory Asset Account Code
- `Items[].QuantityOnHand`: Quantity on Hand (number)
- `Items[].TotalCostPool`: Total Cost Pool (number)
- `Items[].SalesDetails`: Sales Details
- `Items[].SalesDetails.UnitPrice`: Unit Price (number)
- `Items[].SalesDetails.AccountCode`: Account Code
- `Items[].SalesDetails.COGSAccountCode`: COGS Account Code
- `Items[].SalesDetails.TaxType`: Tax Type
- `Items[].PurchaseDetails`: Purchase Details
- `Items[].PurchaseDetails.UnitPrice`: Unit Price (number)
- `Items[].PurchaseDetails.AccountCode`: Account Code
- `Items[].PurchaseDetails.COGSAccountCode`: COGS Account Code
- `Items[].PurchaseDetails.TaxType`: Tax Type

### `xero_create_project`

**Create Project.** Create a new Xero Projects project for a contact, with a name and optional deadline (UTC ISO-8601) and estimate amount. Pick this for time/cost tracking on the Xero Projects product, distinct from accounting invoices. Not idempotent: each call creates another project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Project Name. |
| `deadline_utc` | string | no |  | Deadline (UTC ISO-8601). Example: 2017-04-23T18:25:43.511Z. |
| `estimate_amount` | number | no |  | Estimate Amount. |

Output fields:

- `projectId`: Project ID
- `name`: Name
- `contactId`: Contact ID
- `status`: Status
- `currencyCode`: Currency
- `deadlineUtc`: Deadline (datetime)
- `minutesLogged`: Minutes Logged (number)
- `estimate`: Estimate
- `estimate.currency`: Currency
- `estimate.value`: Amount (number)
- `totalTaskAmount`: Total Task Amount
- `totalTaskAmount.currency`: Currency
- `totalTaskAmount.value`: Amount (number)
- `totalInvoiced`: Total Invoiced
- `totalInvoiced.currency`: Currency
- `totalInvoiced.value`: Amount (number)
- `totalToBeInvoiced`: Total To Be Invoiced
- `totalToBeInvoiced.currency`: Currency
- `totalToBeInvoiced.value`: Amount (number)

### `xero_update_sales_invoice`

**Update Sales Invoice.** Update an existing ACCREC sales invoice identified by its ID, changing fields like reference, due date, status, contact, or line items. By default line-item changes merge into the existing lines (matching by LineItemID, appending new ones); enable Replace All Line Items to overwrite the full set instead. AUTHORISED invoices can only be edited when the allow-authorised flag is set. Not idempotent when line items without a LineItemID are passed in merge mode, because each run appends them again; field-only changes converge. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `allow_authorised` | boolean | no | `false` | Allow AUTHORISED invoices. Enable updates for AUTHORISED invoices (Xero allows limited updates for paid/part-paid ACCREC). |
| `invoice_id` | string | yes |  | Sales Invoice (Editable). Select a sales invoice (ACCREC) with DRAFT or SUBMITTED status. A value the product loads from the provider, such as an id; write the value itself. |
| `reference` | string | no |  | Reference. |
| `due_date` | string | no |  | Due Date (YYYY-MM-DD). |
| `invoice_number` | string | no |  | Invoice Number. |
| `branding_theme_id` | string | no |  | Branding Theme. Select a branding theme. A value the product loads from the provider, such as an id; write the value itself. |
| `url` | string | no |  | Source URL. |
| `contact_id` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`, `"VOIDED"`, `"DELETED"`. |
| `sent_to_contact` | boolean | no | `false` | Mark as Sent to Contact. |
| `replace_all_line_items` | boolean | no | `false` | Replace All Line Items. If enabled, only the provided line_items will remain. If disabled, we will merge with current lines by updating matching LineItemID and appending new items. |
| `line_items` | array | no |  | Line Items (updates/additions). Each item: { `LineItemID`?, `Description`?, `Quantity`?, `UnitAmount`?, `AccountCode`?, `ItemCode`?, `TaxType`?, `DiscountRate`? }. |

Output fields:

- `Status`: Response Status
- `Invoices`: Invoices
- `Invoices[].InvoiceID`: Invoice ID
- `Invoices[].InvoiceNumber`: Invoice Number
- `Invoices[].Type`: Type (ACCREC sales / ACCPAY bill)
- `Invoices[].Status`: Status
- `Invoices[].Reference`: Reference
- `Invoices[].Contact`: Contact
- `Invoices[].Contact.ContactID`: Contact ID
- `Invoices[].Contact.Name`: Contact Name
- `Invoices[].Contact.EmailAddress`: Contact Email (email)
- `Invoices[].DateString`: Date (date)
- `Invoices[].DueDateString`: Due Date (date)
- `Invoices[].LineAmountTypes`: Line Amount Types
- `Invoices[].SubTotal`: Subtotal (number)
- `Invoices[].TotalTax`: Total Tax (number)
- `Invoices[].Total`: Total (number)
- `Invoices[].CurrencyCode`: Currency
- `Invoices[].CurrencyRate`: Currency Rate (number)
- `Invoices[].AmountDue`: Amount Due (number)
- `Invoices[].AmountPaid`: Amount Paid (number)
- `Invoices[].AmountCredited`: Amount Credited (number)
- `Invoices[].SentToContact`: Sent to Contact (boolean)
- `Invoices[].BrandingThemeID`: Branding Theme ID
- `Invoices[].Url`: Source URL (url)
- `Invoices[].HasAttachments`: Has Attachments (boolean)
- `Invoices[].LineItems`: Line Items
- `Invoices[].LineItems[].LineItemID`: Line Item ID
- `Invoices[].LineItems[].Description`: Description
- `Invoices[].LineItems[].Quantity`: Quantity (number)
- `Invoices[].LineItems[].UnitAmount`: Unit Amount (number)
- `Invoices[].LineItems[].ItemCode`: Item Code
- `Invoices[].LineItems[].AccountCode`: Account Code
- `Invoices[].LineItems[].TaxType`: Tax Type
- `Invoices[].LineItems[].TaxAmount`: Tax Amount (number)
- `Invoices[].LineItems[].LineAmount`: Line Amount (number)
- `Invoices[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `Invoices[].LineItems[].Tracking`: Tracking
- `Invoices[].LineItems[].Tracking[].Name`: Tracking Category
- `Invoices[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_create_repeating_sales_invoice`

**Create Repeating Sales Invoice.** Set up a recurring accounts-receivable (ACCREC) sales invoice template in Xero that auto-generates invoices on a weekly or monthly schedule. Pick this for subscriptions or retainers that bill a contact on a repeating cadence, not for a single invoice (use Create Invoice for that). Not idempotent: each call creates another recurring template; the schedule unit constrains which due-date types are valid. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `schedule_period` | number | yes |  | Schedule Period. Integer period (e.g., 1 every week, 2 every month). |
| `schedule_unit` | string | yes |  | Schedule Unit. One of `"WEEKLY"`, `"MONTHLY"`. |
| `due_date` | number | yes |  | Due Date (number). Day number used with due date type (e.g., 20, 31). |
| `due_date_type` | string | yes |  | Due Date Type. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | string | yes |  | Start Date (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date (YYYY-MM-DD). |
| `line_amount_types` | string | yes | `"Exclusive"` | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `currency_code` | string | yes |  | Currency. Select a currency code. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes | `"DRAFT"` | Status. One of `"DRAFT"`, `"AUTHORISED"`. |
| `reference` | string | no |  | Reference. |
| `branding_theme_id` | string | no |  | Branding Theme. Select a branding theme. A value the product loads from the provider, such as an id; write the value itself. |
| `approved_for_sending` | boolean | no | `false` | Approved For Sending. |
| `send_copy` | boolean | no | `false` | Send Copy. |
| `mark_as_sent` | boolean | no | `false` | Mark As Sent. |
| `include_pdf` | boolean | no | `false` | Include PDF. |
| `line_items` | array | yes |  | Line Items. Each item: { `Description`, `Quantity`?, `UnitAmount`?, `AccountCode`?, `ItemCode`?, `TaxType`?, `DiscountRate`? }. |

Output fields:

- `Status`: Response Status
- `RepeatingInvoices`: Repeating Invoices
- `RepeatingInvoices[].RepeatingInvoiceID`: Repeating Invoice ID
- `RepeatingInvoices[].Type`: Type
- `RepeatingInvoices[].Status`: Status
- `RepeatingInvoices[].Reference`: Reference
- `RepeatingInvoices[].Contact`: Contact
- `RepeatingInvoices[].Contact.ContactID`: Contact ID
- `RepeatingInvoices[].Contact.Name`: Contact Name
- `RepeatingInvoices[].Contact.EmailAddress`: Contact Email (email)
- `RepeatingInvoices[].Schedule`: Schedule
- `RepeatingInvoices[].Schedule.Period`: Every (Period) (number)
- `RepeatingInvoices[].Schedule.Unit`: Unit
- `RepeatingInvoices[].Schedule.DueDate`: Due Day (number)
- `RepeatingInvoices[].Schedule.DueDateType`: Due Date Type
- `RepeatingInvoices[].Schedule.NextScheduledDateString`: Next Scheduled Date (date)
- `RepeatingInvoices[].ApprovedForSending`: Approved for Sending (boolean)
- `RepeatingInvoices[].LineAmountTypes`: Line Amount Types
- `RepeatingInvoices[].SubTotal`: Subtotal (number)
- `RepeatingInvoices[].TotalTax`: Total Tax (number)
- `RepeatingInvoices[].Total`: Total (number)
- `RepeatingInvoices[].CurrencyCode`: Currency
- `RepeatingInvoices[].CurrencyRate`: Currency Rate (number)
- `RepeatingInvoices[].LineItems`: Line Items
- `RepeatingInvoices[].LineItems[].LineItemID`: Line Item ID
- `RepeatingInvoices[].LineItems[].Description`: Description
- `RepeatingInvoices[].LineItems[].Quantity`: Quantity (number)
- `RepeatingInvoices[].LineItems[].UnitAmount`: Unit Amount (number)
- `RepeatingInvoices[].LineItems[].ItemCode`: Item Code
- `RepeatingInvoices[].LineItems[].AccountCode`: Account Code
- `RepeatingInvoices[].LineItems[].TaxType`: Tax Type
- `RepeatingInvoices[].LineItems[].TaxAmount`: Tax Amount (number)
- `RepeatingInvoices[].LineItems[].LineAmount`: Line Amount (number)
- `RepeatingInvoices[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `RepeatingInvoices[].LineItems[].Tracking`: Tracking
- `RepeatingInvoices[].LineItems[].Tracking[].Name`: Tracking Category
- `RepeatingInvoices[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_find_contact`

**Find Contact.** Read-only lookup of Xero contacts in a tenant; pick when you need to locate a contact or its ID before invoicing or other operations. Choose the search mode via Search By: exact Name or Account Number, or a broad Search Term for fuzzy matching across fields. Returns matching contacts without modifying anything; supply the tenant ID and use Summary Only / Page for large result sets. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `search_by` | string | yes | `"NAME"` | Search By. One of `"NAME"`, `"ACCOUNT_NUMBER"`, `"SEARCH_TERM"`. |
| `value` | string | yes |  | Value. Name, Account Number, or Search Term depending on Search By. |
| `include_archived` | boolean | no | `false` | Include Archived. |
| `summary_only` | boolean | no | `true` | Summary Only (faster, lighter). Recommended for broad searches (Search Term). Excludes heavy fields. |
| `page` | number | no |  | Page. Pagination page (optional). |

Output fields:

- `Status`: Response Status
- `Contacts`: Contacts
- `Contacts[].ContactID`: Contact ID
- `Contacts[].Name`: Name
- `Contacts[].FirstName`: First Name
- `Contacts[].LastName`: Last Name
- `Contacts[].EmailAddress`: Email (email)
- `Contacts[].ContactStatus`: Status
- `Contacts[].IsCustomer`: Is Customer (boolean)
- `Contacts[].IsSupplier`: Is Supplier (boolean)
- `Contacts[].TaxNumber`: Tax Number
- `Contacts[].DefaultCurrency`: Default Currency
- `Contacts[].Phones`: Phones
- `Contacts[].Phones[].PhoneType`: Type
- `Contacts[].Phones[].PhoneNumber`: Number
- `Contacts[].Phones[].PhoneAreaCode`: Area Code
- `Contacts[].Phones[].PhoneCountryCode`: Country Code
- `Contacts[].Addresses`: Addresses
- `Contacts[].Addresses[].AddressType`: Type
- `Contacts[].Addresses[].AddressLine1`: Line 1
- `Contacts[].Addresses[].AddressLine2`: Line 2
- `Contacts[].Addresses[].City`: City
- `Contacts[].Addresses[].Region`: Region
- `Contacts[].Addresses[].PostalCode`: Postal Code
- `Contacts[].Addresses[].Country`: Country
- `Contacts[].HasAttachments`: Has Attachments (boolean)

### `xero_find_invoice`

**Find Invoice.** Look up Xero invoices by exact invoice number, exact reference, or a fuzzy search term, optionally filtered to sales invoices (ACCREC) or bills (ACCPAY). Read-only and idempotent; use it to resolve an invoice ID before recording a payment, sending, or allocating a credit note. The search-term mode matches invoice number or reference more loosely than the exact modes. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `search_by` | string | yes | `"INVOICE_NUMBER"` | Search By. One of `"INVOICE_NUMBER"`, `"REFERENCE"`, `"SEARCH_TERM"`. |
| `value` | string | yes |  | Value. Invoice Number, Reference, or Search Term. |
| `type_filter` | string | no |  | Type Filter. One of `"ACCREC"`, `"ACCPAY"`. |
| `summary_only` | boolean | no | `true` | Summary Only (faster, lighter). |
| `page` | number | no |  | Page. |

Output fields:

- `Status`: Response Status
- `Invoices`: Invoices
- `Invoices[].InvoiceID`: Invoice ID
- `Invoices[].InvoiceNumber`: Invoice Number
- `Invoices[].Type`: Type (ACCREC sales / ACCPAY bill)
- `Invoices[].Status`: Status
- `Invoices[].Reference`: Reference
- `Invoices[].Contact`: Contact
- `Invoices[].Contact.ContactID`: Contact ID
- `Invoices[].Contact.Name`: Contact Name
- `Invoices[].Contact.EmailAddress`: Contact Email (email)
- `Invoices[].DateString`: Date (date)
- `Invoices[].DueDateString`: Due Date (date)
- `Invoices[].LineAmountTypes`: Line Amount Types
- `Invoices[].SubTotal`: Subtotal (number)
- `Invoices[].TotalTax`: Total Tax (number)
- `Invoices[].Total`: Total (number)
- `Invoices[].CurrencyCode`: Currency
- `Invoices[].CurrencyRate`: Currency Rate (number)
- `Invoices[].AmountDue`: Amount Due (number)
- `Invoices[].AmountPaid`: Amount Paid (number)
- `Invoices[].AmountCredited`: Amount Credited (number)
- `Invoices[].SentToContact`: Sent to Contact (boolean)
- `Invoices[].BrandingThemeID`: Branding Theme ID
- `Invoices[].Url`: Source URL (url)
- `Invoices[].HasAttachments`: Has Attachments (boolean)
- `Invoices[].LineItems`: Line Items
- `Invoices[].LineItems[].LineItemID`: Line Item ID
- `Invoices[].LineItems[].Description`: Description
- `Invoices[].LineItems[].Quantity`: Quantity (number)
- `Invoices[].LineItems[].UnitAmount`: Unit Amount (number)
- `Invoices[].LineItems[].ItemCode`: Item Code
- `Invoices[].LineItems[].AccountCode`: Account Code
- `Invoices[].LineItems[].TaxType`: Tax Type
- `Invoices[].LineItems[].TaxAmount`: Tax Amount (number)
- `Invoices[].LineItems[].LineAmount`: Line Amount (number)
- `Invoices[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `Invoices[].LineItems[].Tracking`: Tracking
- `Invoices[].LineItems[].Tracking[].Name`: Tracking Category
- `Invoices[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_find_item`

**Find Item.** Look up a Xero item by exact code or exact name, with optional ordering. Read-only and idempotent; use it to confirm an item exists or resolve its details before referencing it on a line item or creating a duplicate. Both search modes require an exact match. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `search_by` | string | yes | `"CODE"` | Search By. One of `"CODE"`, `"NAME"`. |
| `value` | string | yes |  | Value. Item Code or Name (exact match). |
| `order` | string | no |  | Order (optional). e.g. Name or Name DESC. |

Output fields:

- `Status`: Response Status
- `Items`: Items
- `Items[].ItemID`: Item ID
- `Items[].Code`: Item Code
- `Items[].Name`: Name
- `Items[].Description`: Sales Description
- `Items[].IsSold`: Is Sold (boolean)
- `Items[].IsPurchased`: Is Purchased (boolean)
- `Items[].IsTrackedAsInventory`: Is Tracked as Inventory (boolean)
- `Items[].InventoryAssetAccountCode`: Inventory Asset Account Code
- `Items[].QuantityOnHand`: Quantity on Hand (number)
- `Items[].TotalCostPool`: Total Cost Pool (number)
- `Items[].SalesDetails`: Sales Details
- `Items[].SalesDetails.UnitPrice`: Unit Price (number)
- `Items[].SalesDetails.AccountCode`: Account Code
- `Items[].SalesDetails.COGSAccountCode`: COGS Account Code
- `Items[].SalesDetails.TaxType`: Tax Type
- `Items[].PurchaseDetails`: Purchase Details
- `Items[].PurchaseDetails.UnitPrice`: Unit Price (number)
- `Items[].PurchaseDetails.AccountCode`: Account Code
- `Items[].PurchaseDetails.COGSAccountCode`: COGS Account Code
- `Items[].PurchaseDetails.TaxType`: Tax Type

### `xero_find_purchase_order`

**Find Purchase Order.** Look up Xero purchase orders by exact number, exact reference, or GUID ID, with optional filters for contact, status, date range, and paging. Read-only and idempotent; use it to resolve a purchase-order ID or inspect orders before updating one. Searching by ID fetches that single record directly; the other modes run a filtered list query. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | no |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `search_by` | string | yes | `"NUMBER"` | Search By. One of `"NUMBER"`, `"REFERENCE"`, `"ID"`. |
| `value` | string | yes |  | Value. Number, Reference or ID depending on Search By. |
| `statuses` | array | no |  | Statuses. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`, `"BILLED"`, `"DELETED"`. |
| `date_from` | string | no |  | Date From (YYYY-MM-DD). |
| `date_to` | string | no |  | Date To (YYYY-MM-DD). |
| `order` | string | no |  | Order (e.g., Date DESC). |
| `page` | number | no |  | Page. |
| `page_size` | number | no |  | Page Size (1-1000). |

Output fields:

- `Status`: Response Status
- `PurchaseOrders`: Purchase Orders
- `PurchaseOrders[].PurchaseOrderID`: Purchase Order ID
- `PurchaseOrders[].PurchaseOrderNumber`: Purchase Order Number
- `PurchaseOrders[].Reference`: Reference
- `PurchaseOrders[].Status`: Status
- `PurchaseOrders[].Contact`: Supplier
- `PurchaseOrders[].Contact.ContactID`: Contact ID
- `PurchaseOrders[].Contact.Name`: Contact Name
- `PurchaseOrders[].Contact.EmailAddress`: Contact Email (email)
- `PurchaseOrders[].DateString`: Date (date)
- `PurchaseOrders[].DeliveryDateString`: Delivery Date (date)
- `PurchaseOrders[].DeliveryAddress`: Delivery Address
- `PurchaseOrders[].AttentionTo`: Attention To
- `PurchaseOrders[].Telephone`: Telephone
- `PurchaseOrders[].DeliveryInstructions`: Delivery Instructions
- `PurchaseOrders[].SentToContact`: Sent to Contact (boolean)
- `PurchaseOrders[].LineAmountTypes`: Line Amount Types
- `PurchaseOrders[].SubTotal`: Subtotal (number)
- `PurchaseOrders[].TotalTax`: Total Tax (number)
- `PurchaseOrders[].Total`: Total (number)
- `PurchaseOrders[].CurrencyCode`: Currency
- `PurchaseOrders[].CurrencyRate`: Currency Rate (number)
- `PurchaseOrders[].LineItems`: Line Items
- `PurchaseOrders[].LineItems[].LineItemID`: Line Item ID
- `PurchaseOrders[].LineItems[].Description`: Description
- `PurchaseOrders[].LineItems[].Quantity`: Quantity (number)
- `PurchaseOrders[].LineItems[].UnitAmount`: Unit Amount (number)
- `PurchaseOrders[].LineItems[].ItemCode`: Item Code
- `PurchaseOrders[].LineItems[].AccountCode`: Account Code
- `PurchaseOrders[].LineItems[].TaxType`: Tax Type
- `PurchaseOrders[].LineItems[].TaxAmount`: Tax Amount (number)
- `PurchaseOrders[].LineItems[].LineAmount`: Line Amount (number)
- `PurchaseOrders[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `PurchaseOrders[].LineItems[].Tracking`: Tracking
- `PurchaseOrders[].LineItems[].Tracking[].Name`: Tracking Category
- `PurchaseOrders[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_get_invoice_history`

**Get Invoice History.** Retrieve the history and notes for a Xero invoice by its InvoiceID. Read-only and idempotent; returns HistoryRecords describing changes, the acting user, timestamps, and details. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | yes |  | Invoice. Select an invoice. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `Status`: Response Status
- `HistoryRecords`: History Records
- `HistoryRecords[].Changes`: Change
- `HistoryRecords[].DateUTCString`: Date (datetime)
- `HistoryRecords[].User`: User
- `HistoryRecords[].Details`: Details

### `xero_create_bank_transaction`

**Create Bank Transaction.** Record a Spend Money (SPEND) or Receive Money (RECEIVE) bank transaction against one of the organization's bank accounts, attributed to a contact with at least one line item (Description, UnitAmount, AccountCode). Pick this for direct money in/out of a bank account, not for paying an invoice (use Create Payment) or moving money between own accounts (use Create Bank Transfer). Not idempotent: each call records another transaction. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | yes | `"SPEND"` | Type. One of `"SPEND"`, `"RECEIVE"`. |
| `contact_id` | string | yes |  | Contact. Select a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `bank_account_id` | string | yes |  | Bank Account. Select a bank account. A value the product loads from the provider, such as an id; write the value itself. |
| `line_item` | object | yes | `{"Description":"Goods/Services","UnitAmount":0,"AccountCode":""}` | Line Item. At minimum, provide a Description, UnitAmount, and AccountCode. |
| `date` | string | no |  | Date. Date the transaction occurred (YYYY-MM-DD). Optional. |
| `reference` | string | no |  | Reference. Reference for the transaction. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `is_reconciled` | boolean | no | `false` | Is Reconciled. Mark the transaction as reconciled. |

Output fields:

- `Status`: Response Status
- `BankTransactions`: Bank Transactions
- `BankTransactions[].BankTransactionID`: Bank Transaction ID
- `BankTransactions[].Type`: Type
- `BankTransactions[].Status`: Status
- `BankTransactions[].Reference`: Reference
- `BankTransactions[].Contact`: Contact
- `BankTransactions[].Contact.ContactID`: Contact ID
- `BankTransactions[].Contact.Name`: Contact Name
- `BankTransactions[].Contact.EmailAddress`: Contact Email (email)
- `BankTransactions[].BankAccount`: Bank Account
- `BankTransactions[].BankAccount.AccountID`: Account ID
- `BankTransactions[].BankAccount.Code`: Account Code
- `BankTransactions[].BankAccount.Name`: Account Name
- `BankTransactions[].DateString`: Date (date)
- `BankTransactions[].IsReconciled`: Is Reconciled (boolean)
- `BankTransactions[].Url`: Source URL (url)
- `BankTransactions[].LineAmountTypes`: Line Amount Types
- `BankTransactions[].SubTotal`: Subtotal (number)
- `BankTransactions[].TotalTax`: Total Tax (number)
- `BankTransactions[].Total`: Total (number)
- `BankTransactions[].CurrencyCode`: Currency
- `BankTransactions[].CurrencyRate`: Currency Rate (number)
- `BankTransactions[].LineItems`: Line Items
- `BankTransactions[].LineItems[].LineItemID`: Line Item ID
- `BankTransactions[].LineItems[].Description`: Description
- `BankTransactions[].LineItems[].Quantity`: Quantity (number)
- `BankTransactions[].LineItems[].UnitAmount`: Unit Amount (number)
- `BankTransactions[].LineItems[].ItemCode`: Item Code
- `BankTransactions[].LineItems[].AccountCode`: Account Code
- `BankTransactions[].LineItems[].TaxType`: Tax Type
- `BankTransactions[].LineItems[].TaxAmount`: Tax Amount (number)
- `BankTransactions[].LineItems[].LineAmount`: Line Amount (number)
- `BankTransactions[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `BankTransactions[].LineItems[].Tracking`: Tracking
- `BankTransactions[].LineItems[].Tracking[].Name`: Tracking Category
- `BankTransactions[].LineItems[].Tracking[].Option`: Tracking Option

### `xero_find_or_create_contact`

**Find or Create Contact.** Look up a Xero contact by exact name and return it if it exists, otherwise create it. Pick this to de-duplicate contacts before invoicing so re-runs reuse the same record instead of creating duplicates. Idempotent on the contact name: the same name always resolves to the same contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Contact Name. Contact name, in full. |
| `email` | string | no |  | Contact Email. Email address of the contact. |

Output fields:

- `Status`: Response Status
- `Contacts`: Contacts
- `Contacts[].ContactID`: Contact ID
- `Contacts[].Name`: Name
- `Contacts[].FirstName`: First Name
- `Contacts[].LastName`: Last Name
- `Contacts[].EmailAddress`: Email (email)
- `Contacts[].ContactStatus`: Status
- `Contacts[].IsCustomer`: Is Customer (boolean)
- `Contacts[].IsSupplier`: Is Supplier (boolean)
- `Contacts[].TaxNumber`: Tax Number
- `Contacts[].DefaultCurrency`: Default Currency
- `Contacts[].Phones`: Phones
- `Contacts[].Phones[].PhoneType`: Type
- `Contacts[].Phones[].PhoneNumber`: Number
- `Contacts[].Phones[].PhoneAreaCode`: Area Code
- `Contacts[].Phones[].PhoneCountryCode`: Country Code
- `Contacts[].Addresses`: Addresses
- `Contacts[].Addresses[].AddressType`: Type
- `Contacts[].Addresses[].AddressLine1`: Line 1
- `Contacts[].Addresses[].AddressLine2`: Line 2
- `Contacts[].Addresses[].City`: City
- `Contacts[].Addresses[].Region`: Region
- `Contacts[].Addresses[].PostalCode`: Postal Code
- `Contacts[].Addresses[].Country`: Country
- `Contacts[].HasAttachments`: Has Attachments (boolean)

### `xero_list_organisations`

**List Organisations.** Lists every Xero organisation (tenant) the connection was authorised for, with its tenant ID, name and type. Call this first when an action needs an Organisation ID and the connection may cover more than one organisation. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Organisations
- `items[].tenantId`: Organisation ID (Tenant ID)
- `items[].tenantName`: Name
- `items[].tenantType`: Type
- `items[].connectionId`: Connection ID
- `items[].createdDateUtc`: Connected At (datetime)
- `items[].updatedDateUtc`: Updated At (datetime)
- `count`: Count (number)

### `xero_get_organisation`

**Get Organisation Details.** Returns the selected Xero organisation's settings: name, base currency, country, timezone, tax defaults and financial year end. Use it before creating documents to pick the right currency or report period. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `OrganisationID`: Organisation ID
- `Name`: Name
- `LegalName`: Legal Name
- `ShortCode`: Short Code
- `BaseCurrency`: Base Currency
- `CountryCode`: Country Code
- `Timezone`: Timezone
- `OrganisationType`: Organisation Type
- `OrganisationStatus`: Status
- `Class`: Subscription Class
- `Edition`: Edition
- `IsDemoCompany`: Is Demo Company (boolean)
- `PaysTax`: Pays Tax (boolean)
- `DefaultSalesTax`: Default Sales Tax
- `DefaultPurchasesTax`: Default Purchases Tax
- `FinancialYearEndDay`: Financial Year End Day (number)
- `FinancialYearEndMonth`: Financial Year End Month (number)
- `LineOfBusiness`: Line of Business

### `xero_get_invoice`

**Get Invoice.** Fetches a single sales invoice or supplier bill by its Xero InvoiceID or its invoice number, with line items, totals, amounts due and paid. Use it when you already know which invoice you need; use Search Invoices to find invoices by contact, status or date. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | yes |  | Invoice ID or Number. The Xero InvoiceID (a GUID) or the invoice number, for example INV-0042. |

Output fields:

- `InvoiceID`: Invoice ID
- `InvoiceNumber`: Invoice Number
- `Type`: Type (ACCREC sales / ACCPAY bill)
- `Status`: Status
- `Reference`: Reference
- `Contact`: Contact
- `Contact.ContactID`: Contact ID
- `Contact.Name`: Contact Name
- `Contact.EmailAddress`: Contact Email (email)
- `DateString`: Date (date)
- `DueDateString`: Due Date (date)
- `LineAmountTypes`: Line Amount Types
- `SubTotal`: Subtotal (number)
- `TotalTax`: Total Tax (number)
- `Total`: Total (number)
- `CurrencyCode`: Currency
- `CurrencyRate`: Currency Rate (number)
- `AmountDue`: Amount Due (number)
- `AmountPaid`: Amount Paid (number)
- `AmountCredited`: Amount Credited (number)
- `SentToContact`: Sent to Contact (boolean)
- `BrandingThemeID`: Branding Theme ID
- `Url`: Source URL (url)
- `HasAttachments`: Has Attachments (boolean)
- `LineItems`: Line Items
- `LineItems[].LineItemID`: Line Item ID
- `LineItems[].Description`: Description
- `LineItems[].Quantity`: Quantity (number)
- `LineItems[].UnitAmount`: Unit Amount (number)
- `LineItems[].ItemCode`: Item Code
- `LineItems[].AccountCode`: Account Code
- `LineItems[].TaxType`: Tax Type
- `LineItems[].TaxAmount`: Tax Amount (number)
- `LineItems[].LineAmount`: Line Amount (number)
- `LineItems[].DiscountRate`: Discount Rate (%) (number)
- `LineItems[].Tracking`: Tracking
- `LineItems[].Tracking[].Name`: Tracking Category
- `LineItems[].Tracking[].Option`: Tracking Option

### `xero_search_invoices`

**Search Invoices.** Searches sales invoices (ACCREC) and supplier bills (ACCPAY) by type, statuses, contact ID, invoice date range or a free-text term, newest first, and returns one page with a hasMore flag; request the next page to continue. Use Get Invoice when you already have the ID or number. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | no |  | Type. Leave empty to include both sales invoices and bills. One of `"ACCREC"`, `"ACCPAY"`. |
| `statuses` | array | no |  | Statuses. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`, `"PAID"`, `"VOIDED"`, `"DELETED"`. |
| `contact_id` | string | no |  | Contact ID. Only invoices for this Xero ContactID. Use Find Contact to get it. |
| `date_from` | string | no |  | Invoice Date From (YYYY-MM-DD). |
| `date_to` | string | no |  | Invoice Date To (YYYY-MM-DD). |
| `search_term` | string | no |  | Search Term. Matches invoice number and reference (case-insensitive, partial). |
| `summary_only` | boolean | no | `true` | Summary Only. Leave on for faster results without line items; use Get Invoice for the full invoice. |
| `page` | number | no | `1` | Page. Page number, starting at 1. |
| `page_size` | number | no | `100` | Page Size. Invoices per page, 1 to 100. |

Output fields:

- `items`: Invoices
- `items[].InvoiceID`: Invoice ID
- `items[].InvoiceNumber`: Invoice Number
- `items[].Type`: Type (ACCREC sales / ACCPAY bill)
- `items[].Status`: Status
- `items[].Reference`: Reference
- `items[].Contact`: Contact
- `items[].Contact.ContactID`: Contact ID
- `items[].Contact.Name`: Contact Name
- `items[].Contact.EmailAddress`: Contact Email (email)
- `items[].DateString`: Date (date)
- `items[].DueDateString`: Due Date (date)
- `items[].LineAmountTypes`: Line Amount Types
- `items[].SubTotal`: Subtotal (number)
- `items[].TotalTax`: Total Tax (number)
- `items[].Total`: Total (number)
- `items[].CurrencyCode`: Currency
- `items[].CurrencyRate`: Currency Rate (number)
- `items[].AmountDue`: Amount Due (number)
- `items[].AmountPaid`: Amount Paid (number)
- `items[].AmountCredited`: Amount Credited (number)
- `items[].SentToContact`: Sent to Contact (boolean)
- `items[].BrandingThemeID`: Branding Theme ID
- `items[].Url`: Source URL (url)
- `items[].HasAttachments`: Has Attachments (boolean)
- `items[].LineItems`: Line Items
- `items[].LineItems[].LineItemID`: Line Item ID
- `items[].LineItems[].Description`: Description
- `items[].LineItems[].Quantity`: Quantity (number)
- `items[].LineItems[].UnitAmount`: Unit Amount (number)
- `items[].LineItems[].ItemCode`: Item Code
- `items[].LineItems[].AccountCode`: Account Code
- `items[].LineItems[].TaxType`: Tax Type
- `items[].LineItems[].TaxAmount`: Tax Amount (number)
- `items[].LineItems[].LineAmount`: Line Amount (number)
- `items[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `items[].LineItems[].Tracking`: Tracking
- `items[].LineItems[].Tracking[].Name`: Tracking Category
- `items[].LineItems[].Tracking[].Option`: Tracking Option
- `page`: Page (number)
- `pageSize`: Page Size (number)
- `hasMore`: Has More Pages (boolean)

### `xero_download_invoice_pdf`

**Download Invoice PDF.** Downloads the Xero-rendered PDF of one invoice or bill by InvoiceID and stores it as a file for later steps (email attachment, cloud storage). Use Get Invoice for the invoice data itself. Read-only and idempotent: repeating the call returns the same document. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | yes |  | Invoice ID. The Xero InvoiceID (a GUID). Use Search Invoices or Get Invoice to find it. |
| `file_name` | string | no |  | File Name. Defaults to invoice-<InvoiceID>.pdf. |

Output fields:

- `file`: PDF File (url)
- `fileName`: File Name
- `size`: Size (filesize)
- `invoiceId`: Invoice ID

### `xero_get_contact`

**Get Contact.** Fetches a single Xero contact by ContactID with its email, addresses, phones, status and whether it is a customer or supplier. Use Find Contact to look a contact up by name or email first. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact ID. The Xero ContactID (a GUID). Use Find Contact to get it. |

Output fields:

- `ContactID`: Contact ID
- `Name`: Name
- `FirstName`: First Name
- `LastName`: Last Name
- `EmailAddress`: Email (email)
- `ContactStatus`: Status
- `IsCustomer`: Is Customer (boolean)
- `IsSupplier`: Is Supplier (boolean)
- `TaxNumber`: Tax Number
- `DefaultCurrency`: Default Currency
- `Phones`: Phones
- `Phones[].PhoneType`: Type
- `Phones[].PhoneNumber`: Number
- `Phones[].PhoneAreaCode`: Area Code
- `Phones[].PhoneCountryCode`: Country Code
- `Addresses`: Addresses
- `Addresses[].AddressType`: Type
- `Addresses[].AddressLine1`: Line 1
- `Addresses[].AddressLine2`: Line 2
- `Addresses[].City`: City
- `Addresses[].Region`: Region
- `Addresses[].PostalCode`: Postal Code
- `Addresses[].Country`: Country
- `HasAttachments`: Has Attachments (boolean)

### `xero_archive_contact`

**Archive Contact.** Archives a Xero contact by ContactID, hiding it from contact lists and new transactions; Xero does not allow deleting contacts. Xero refuses to archive a contact with outstanding balances or linked repeating invoices (even deleted ones). Idempotent: archiving an already archived contact leaves it archived. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact ID. The Xero ContactID (a GUID) of the contact to archive. |

Output fields:

- `ContactID`: Contact ID
- `Name`: Name
- `FirstName`: First Name
- `LastName`: Last Name
- `EmailAddress`: Email (email)
- `ContactStatus`: Status
- `IsCustomer`: Is Customer (boolean)
- `IsSupplier`: Is Supplier (boolean)
- `TaxNumber`: Tax Number
- `DefaultCurrency`: Default Currency
- `Phones`: Phones
- `Phones[].PhoneType`: Type
- `Phones[].PhoneNumber`: Number
- `Phones[].PhoneAreaCode`: Area Code
- `Phones[].PhoneCountryCode`: Country Code
- `Addresses`: Addresses
- `Addresses[].AddressType`: Type
- `Addresses[].AddressLine1`: Line 1
- `Addresses[].AddressLine2`: Line 2
- `Addresses[].City`: City
- `Addresses[].Region`: Region
- `Addresses[].PostalCode`: Postal Code
- `Addresses[].Country`: Country
- `HasAttachments`: Has Attachments (boolean)

### `xero_upsert_item`

**Create or Update Item.** Creates or updates a Xero item (product or service) keyed by its Item Code, with sales and purchase prices, account codes and tax types; set an Inventory Asset Account Code and a COGS Account Code to make it a tracked inventory item. When updating, pass every sales or purchase price, account and tax field you want to keep, because Xero replaces each details block as a whole. Use Find Item to read an item. Idempotent on the code: Xero updates the item that already has this code instead of creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `code` | string | yes |  | Item Code. Unique code of the item (max 30 characters). |
| `name` | string | no |  | Name. Item name (max 50 characters). |
| `description` | string | no |  | Sales Description. |
| `purchase_description` | string | no |  | Purchase Description. |
| `is_sold` | boolean | no |  | Is Sold. |
| `is_purchased` | boolean | no |  | Is Purchased. |
| `sales_unit_price` | number | no |  | Sales Unit Price. Up to 4 decimal places. |
| `sales_account_code` | string | no |  | Sales Account Code. Revenue account code, e.g. 200. Use List Accounts to find codes. |
| `sales_tax_type` | string | no |  | Sales Tax Type. Tax type from List Tax Rates, e.g. OUTPUT. |
| `purchase_unit_price` | number | no |  | Purchase Unit Price. Up to 4 decimal places. |
| `purchase_account_code` | string | no |  | Purchase Account Code. Expense account code, e.g. 400. Not used for tracked inventory items. |
| `purchase_tax_type` | string | no |  | Purchase Tax Type. Tax type from List Tax Rates, e.g. INPUT. |
| `cogs_account_code` | string | no |  | COGS Account Code. Cost of goods sold account code; required for tracked inventory items. |
| `inventory_asset_account_code` | string | no |  | Inventory Asset Account Code. Inventory asset account code. Setting it makes the item a tracked inventory item. |

Output fields:

- `ItemID`: Item ID
- `Code`: Item Code
- `Name`: Name
- `Description`: Sales Description
- `IsSold`: Is Sold (boolean)
- `IsPurchased`: Is Purchased (boolean)
- `IsTrackedAsInventory`: Is Tracked as Inventory (boolean)
- `InventoryAssetAccountCode`: Inventory Asset Account Code
- `QuantityOnHand`: Quantity on Hand (number)
- `TotalCostPool`: Total Cost Pool (number)
- `SalesDetails`: Sales Details
- `SalesDetails.UnitPrice`: Unit Price (number)
- `SalesDetails.AccountCode`: Account Code
- `SalesDetails.COGSAccountCode`: COGS Account Code
- `SalesDetails.TaxType`: Tax Type
- `PurchaseDetails`: Purchase Details
- `PurchaseDetails.UnitPrice`: Unit Price (number)
- `PurchaseDetails.AccountCode`: Account Code
- `PurchaseDetails.COGSAccountCode`: COGS Account Code
- `PurchaseDetails.TaxType`: Tax Type

### `xero_search_payments`

**Search Payments.** Searches payments recorded against invoices, bills and credit notes, filtered by invoice ID, status, payment type, reference or payment date range, newest first; returns one page with a hasMore flag. Use it to check whether an invoice was paid or to find a PaymentID before Delete Payment. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | no |  | Invoice ID. Only payments on this Xero InvoiceID (a GUID). |
| `status` | string | no |  | Status. One of `"AUTHORISED"`, `"DELETED"`. |
| `payment_type` | string | no |  | Payment Type. One of `"ACCRECPAYMENT"`, `"ACCPAYPAYMENT"`, `"ARCREDITPAYMENT"`, `"APCREDITPAYMENT"`, `"AROVERPAYMENTPAYMENT"`, `"APOVERPAYMENTPAYMENT"`, `"ARPREPAYMENTPAYMENT"`, `"APPREPAYMENTPAYMENT"`. |
| `reference` | string | no |  | Reference (exact). |
| `date_from` | string | no |  | Payment Date From (YYYY-MM-DD). |
| `date_to` | string | no |  | Payment Date To (YYYY-MM-DD). |
| `page` | number | no | `1` | Page. Page number, starting at 1. |
| `page_size` | number | no | `100` | Page Size. Payments per page, 1 to 100. |

Output fields:

- `items`: Payments
- `items[].PaymentID`: Payment ID
- `items[].Amount`: Amount (number)
- `items[].BankAmount`: Bank Amount (number)
- `items[].CurrencyRate`: Currency Rate (number)
- `items[].Reference`: Reference
- `items[].Status`: Status
- `items[].PaymentType`: Payment Type
- `items[].IsReconciled`: Is Reconciled (boolean)
- `items[].Invoice`: Invoice
- `items[].Invoice.InvoiceID`: Invoice ID
- `items[].Invoice.InvoiceNumber`: Invoice Number
- `items[].Invoice.Type`: Invoice Type
- `items[].Invoice.Contact`: Contact
- `items[].Invoice.Contact.ContactID`: Contact ID
- `items[].Invoice.Contact.Name`: Contact Name
- `items[].Invoice.Contact.EmailAddress`: Contact Email (email)
- `items[].Account`: Bank Account
- `items[].Account.AccountID`: Account ID
- `items[].Account.Code`: Account Code
- `items[].Account.Name`: Account Name
- `page`: Page (number)
- `pageSize`: Page Size (number)
- `hasMore`: Has More Pages (boolean)

### `xero_delete_payment`

**Delete Payment.** Deletes a payment by PaymentID by setting its status to DELETED, which puts the amount back on the invoice or bill; Xero refuses reconciled payments and batch payments. Use Search Payments to find the PaymentID. Idempotent: deleting an already deleted payment leaves it deleted. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `payment_id` | string | yes |  | Payment ID. The Xero PaymentID (a GUID) to delete. |

Output fields:

- `PaymentID`: Payment ID
- `Amount`: Amount (number)
- `BankAmount`: Bank Amount (number)
- `CurrencyRate`: Currency Rate (number)
- `Reference`: Reference
- `Status`: Status
- `PaymentType`: Payment Type
- `IsReconciled`: Is Reconciled (boolean)
- `Invoice`: Invoice
- `Invoice.InvoiceID`: Invoice ID
- `Invoice.InvoiceNumber`: Invoice Number
- `Invoice.Type`: Invoice Type
- `Invoice.Contact`: Contact
- `Invoice.Contact.ContactID`: Contact ID
- `Invoice.Contact.Name`: Contact Name
- `Invoice.Contact.EmailAddress`: Contact Email (email)
- `Account`: Bank Account
- `Account.AccountID`: Account ID
- `Account.Code`: Account Code
- `Account.Name`: Account Name

### `xero_void_invoice`

**Void or Delete Invoice.** Cancels an invoice or bill by InvoiceID: DRAFT and SUBMITTED invoices are deleted, AUTHORISED invoices are voided. Paid or part-paid invoices are refused; delete their payments first with Delete Payment. Idempotent: an invoice that is already voided or deleted is returned unchanged. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `invoice_id` | string | yes |  | Invoice ID. The Xero InvoiceID (a GUID) or invoice number. |

Output fields:

- `InvoiceID`: Invoice ID
- `InvoiceNumber`: Invoice Number
- `Type`: Type (ACCREC sales / ACCPAY bill)
- `Status`: Status
- `Reference`: Reference
- `Contact`: Contact
- `Contact.ContactID`: Contact ID
- `Contact.Name`: Contact Name
- `Contact.EmailAddress`: Contact Email (email)
- `DateString`: Date (date)
- `DueDateString`: Due Date (date)
- `LineAmountTypes`: Line Amount Types
- `SubTotal`: Subtotal (number)
- `TotalTax`: Total Tax (number)
- `Total`: Total (number)
- `CurrencyCode`: Currency
- `CurrencyRate`: Currency Rate (number)
- `AmountDue`: Amount Due (number)
- `AmountPaid`: Amount Paid (number)
- `AmountCredited`: Amount Credited (number)
- `SentToContact`: Sent to Contact (boolean)
- `BrandingThemeID`: Branding Theme ID
- `Url`: Source URL (url)
- `HasAttachments`: Has Attachments (boolean)
- `LineItems`: Line Items
- `LineItems[].LineItemID`: Line Item ID
- `LineItems[].Description`: Description
- `LineItems[].Quantity`: Quantity (number)
- `LineItems[].UnitAmount`: Unit Amount (number)
- `LineItems[].ItemCode`: Item Code
- `LineItems[].AccountCode`: Account Code
- `LineItems[].TaxType`: Tax Type
- `LineItems[].TaxAmount`: Tax Amount (number)
- `LineItems[].LineAmount`: Line Amount (number)
- `LineItems[].DiscountRate`: Discount Rate (%) (number)
- `LineItems[].Tracking`: Tracking
- `LineItems[].Tracking[].Name`: Tracking Category
- `LineItems[].Tracking[].Option`: Tracking Option

### `xero_search_bank_transactions`

**Search Bank Transactions.** Searches bank transactions (spend money, receive money, overpayments, prepayments, transfers) filtered by type, status, bank account ID, contact ID, reconciled flag or date range, newest first; returns one page with a hasMore flag. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | no |  | Type. One of `"RECEIVE"`, `"SPEND"`, `"RECEIVE-OVERPAYMENT"`, `"SPEND-OVERPAYMENT"`, `"RECEIVE-PREPAYMENT"`, `"SPEND-PREPAYMENT"`, `"RECEIVE-TRANSFER"`, `"SPEND-TRANSFER"`. |
| `status` | string | no |  | Status. One of `"AUTHORISED"`, `"DELETED"`. |
| `bank_account_id` | string | no |  | Bank Account ID. Xero AccountID of the bank account (List Accounts). |
| `contact_id` | string | no |  | Contact ID. |
| `is_reconciled` | string | no |  | Reconciled. One of `"true"`, `"false"`. |
| `date_from` | string | no |  | Date From (YYYY-MM-DD). |
| `date_to` | string | no |  | Date To (YYYY-MM-DD). |
| `page` | number | no | `1` | Page. Page number, starting at 1. |
| `page_size` | number | no | `100` | Page Size. Transactions per page, 1 to 100. |

Output fields:

- `items`: Bank Transactions
- `items[].BankTransactionID`: Bank Transaction ID
- `items[].Type`: Type
- `items[].Status`: Status
- `items[].Reference`: Reference
- `items[].Contact`: Contact
- `items[].Contact.ContactID`: Contact ID
- `items[].Contact.Name`: Contact Name
- `items[].Contact.EmailAddress`: Contact Email (email)
- `items[].BankAccount`: Bank Account
- `items[].BankAccount.AccountID`: Account ID
- `items[].BankAccount.Code`: Account Code
- `items[].BankAccount.Name`: Account Name
- `items[].DateString`: Date (date)
- `items[].IsReconciled`: Is Reconciled (boolean)
- `items[].Url`: Source URL (url)
- `items[].LineAmountTypes`: Line Amount Types
- `items[].SubTotal`: Subtotal (number)
- `items[].TotalTax`: Total Tax (number)
- `items[].Total`: Total (number)
- `items[].CurrencyCode`: Currency
- `items[].CurrencyRate`: Currency Rate (number)
- `items[].LineItems`: Line Items
- `items[].LineItems[].LineItemID`: Line Item ID
- `items[].LineItems[].Description`: Description
- `items[].LineItems[].Quantity`: Quantity (number)
- `items[].LineItems[].UnitAmount`: Unit Amount (number)
- `items[].LineItems[].ItemCode`: Item Code
- `items[].LineItems[].AccountCode`: Account Code
- `items[].LineItems[].TaxType`: Tax Type
- `items[].LineItems[].TaxAmount`: Tax Amount (number)
- `items[].LineItems[].LineAmount`: Line Amount (number)
- `items[].LineItems[].DiscountRate`: Discount Rate (%) (number)
- `items[].LineItems[].Tracking`: Tracking
- `items[].LineItems[].Tracking[].Name`: Tracking Category
- `items[].LineItems[].Tracking[].Option`: Tracking Option
- `page`: Page (number)
- `pageSize`: Page Size (number)
- `hasMore`: Has More Pages (boolean)

### `xero_create_manual_journal`

**Create Manual Journal.** Creates a manual journal from journal lines where positive LineAmount values are debits and negative values are credits; the lines must add up to exactly zero and are checked before anything is sent. Saved as DRAFT unless Status is POSTED. Not idempotent: each call creates another journal. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `narration` | string | yes |  | Narration. Description of the journal. |
| `journal_lines` | JSON | yes |  | Journal Lines. JSON array of lines, e.g. [{"LineAmount":100,"AccountCode":"400","Description":"Accrual"},{"LineAmount":-100,"AccountCode":"800"}]. Positive amounts are debits, negative are credits, and the total must be 0. Allowed keys: LineAmount, AccountCode, AccountID, Description, TaxType, TaxAmount, Tracking. |
| `date` | string | no |  | Date (YYYY-MM-DD). Defaults to today in Xero. |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"POSTED"`. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `show_on_cash_basis_reports` | boolean | no |  | Show on Cash Basis Reports. |

Output fields:

- `ManualJournalID`: Manual Journal ID
- `Narration`: Narration
- `Status`: Status
- `LineAmountTypes`: Line Amount Types
- `ShowOnCashBasisReports`: Show on Cash Basis Reports (boolean)
- `Url`: Source URL (url)
- `JournalLines`: Journal Lines
- `JournalLines[].LineAmount`: Line Amount (number)
- `JournalLines[].AccountCode`: Account Code
- `JournalLines[].AccountID`: Account ID
- `JournalLines[].Description`: Description
- `JournalLines[].TaxType`: Tax Type
- `JournalLines[].TaxAmount`: Tax Amount (number)

### `xero_list_accounts`

**List Accounts.** Lists accounts from the chart of accounts with their code, name, type, class, tax type and whether payments are enabled, optionally filtered by type (e.g. BANK, REVENUE, EXPENSE), class or status. Use it to find the AccountCode for line items or the bank account for payments. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | no |  | Type. One of `"BANK"`, `"CURRENT"`, `"CURRLIAB"`, `"DEPRECIATN"`, `"DIRECTCOSTS"`, `"EQUITY"`, `"EXPENSE"`, `"FIXED"`, `"INVENTORY"`, `"LIABILITY"`, `"NONCURRENT"`, `"OTHERINCOME"`, `"OVERHEADS"`, `"PREPAYMENT"`, `"REVENUE"`, `"SALES"`, `"TERMLIAB"`. |
| `account_class` | string | no |  | Class. One of `"ASSET"`, `"EQUITY"`, `"EXPENSE"`, `"LIABILITY"`, `"REVENUE"`. |
| `status` | string | no | `"ACTIVE"` | Status. One of `"ACTIVE"`, `"ARCHIVED"`. |
| `payments_enabled_only` | boolean | no | `false` | Only Accounts That Accept Payments. Keep only bank accounts and accounts with "Enable payments to this account" on. |

Output fields:

- `items`: Accounts
- `items[].AccountID`: Account ID
- `items[].Code`: Code
- `items[].Name`: Name
- `items[].Status`: Status
- `items[].Type`: Type
- `items[].Class`: Class
- `items[].TaxType`: Tax Type
- `items[].Description`: Description
- `items[].BankAccountType`: Bank Account Type
- `items[].BankAccountNumber`: Bank Account Number
- `items[].CurrencyCode`: Currency
- `items[].EnablePaymentsToAccount`: Payments Enabled (boolean)
- `items[].ShowInExpenseClaims`: Shown in Expense Claims (boolean)
- `items[].SystemAccount`: System Account
- `items[].ReportingCode`: Reporting Code
- `items[].ReportingCodeName`: Reporting Code Name
- `count`: Count (number)

### `xero_list_tax_rates`

**List Tax Rates.** Lists the organisation's tax rates with the TaxType code to put on invoice, bill and transaction lines, the effective rate and which account types each applies to. Use it before creating documents with tax. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `tax_type` | string | no |  | Tax Type. Only the rate with this TaxType code, e.g. OUTPUT. |
| `active_only` | boolean | no | `true` | Active Only. |

Output fields:

- `items`: Tax Rates
- `items[].Name`: Name
- `items[].TaxType`: Tax Type
- `items[].Status`: Status
- `items[].ReportTaxType`: Report Tax Type
- `items[].DisplayTaxRate`: Display Rate (%) (number)
- `items[].EffectiveRate`: Effective Rate (%) (number)
- `items[].CanApplyToRevenue`: Applies to Revenue (boolean)
- `items[].CanApplyToExpenses`: Applies to Expenses (boolean)
- `items[].CanApplyToAssets`: Applies to Assets (boolean)
- `items[].CanApplyToLiabilities`: Applies to Liabilities (boolean)
- `items[].CanApplyToEquity`: Applies to Equity (boolean)
- `items[].TaxComponents`: Tax Components
- `items[].TaxComponents[].Name`: Name
- `items[].TaxComponents[].Rate`: Rate (%) (number)
- `items[].TaxComponents[].IsCompound`: Is Compound (boolean)
- `items[].TaxComponents[].IsNonRecoverable`: Is Non-Recoverable (boolean)
- `count`: Count (number)

### `xero_list_tracking_categories`

**List Tracking Categories.** Lists the organisation's tracking categories (for example Region or Department) with their options, which line items reference as Tracking {Name, Option}. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `include_archived` | boolean | no | `false` | Include Archived. |

Output fields:

- `items`: Tracking Categories
- `items[].TrackingCategoryID`: Tracking Category ID
- `items[].Name`: Name
- `items[].Status`: Status
- `items[].Options`: Options
- `items[].Options[].TrackingOptionID`: Option ID
- `items[].Options[].Name`: Name
- `items[].Options[].Status`: Status
- `count`: Count (number)

### `xero_get_profit_and_loss`

**Get Profit and Loss.** Runs the Profit and Loss report for a date range (defaults to the current month) and returns it as flat rows with a section, a label and one value per column, optionally compared with earlier months, quarters or years. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `from_date` | string | no |  | From Date (YYYY-MM-DD). |
| `to_date` | string | no |  | To Date (YYYY-MM-DD). |
| `timeframe` | string | no |  | Period Length. Length of each comparison period. One of `"MONTH"`, `"QUARTER"`, `"YEAR"`. |
| `periods` | number | no |  | Comparison Periods. Number of earlier periods to compare with, 1 to 11. |
| `standard_layout` | boolean | no |  | Standard Layout. Ignore custom report layouts. |
| `payments_only` | boolean | no |  | Cash Basis (Payments Only). |

Output fields:

- `reportId`: Report ID
- `reportName`: Report Name
- `reportType`: Report Type
- `reportDate`: Report Date
- `reportTitles`: Report Titles
- `columns`: Columns
- `rows`: Rows
- `rows[].section`: Section
- `rows[].rowType`: Row Type
- `rows[].label`: Label
- `rows[].values`: Values
- `rows[].accountId`: Account ID
- `rows[].invoiceId`: Invoice ID

### `xero_get_balance_sheet`

**Get Balance Sheet.** Runs the Balance Sheet report as at a date (defaults to the end of the current month) and returns flat rows with a section, a label and one value per column, optionally compared with earlier periods. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | string | no |  | As At Date (YYYY-MM-DD). |
| `timeframe` | string | no |  | Period Length. Length of each comparison period. One of `"MONTH"`, `"QUARTER"`, `"YEAR"`. |
| `periods` | number | no |  | Comparison Periods. Number of earlier periods to compare with, 1 to 11. |
| `standard_layout` | boolean | no |  | Standard Layout. Ignore custom report layouts. |
| `payments_only` | boolean | no |  | Cash Basis (Payments Only). |

Output fields:

- `reportId`: Report ID
- `reportName`: Report Name
- `reportType`: Report Type
- `reportDate`: Report Date
- `reportTitles`: Report Titles
- `columns`: Columns
- `rows`: Rows
- `rows[].section`: Section
- `rows[].rowType`: Row Type
- `rows[].label`: Label
- `rows[].values`: Values
- `rows[].accountId`: Account ID
- `rows[].invoiceId`: Invoice ID

### `xero_get_bank_summary`

**Get Bank Summary.** Runs the Bank Summary report for a date range (defaults to the current month): one row per bank account with opening balance, cash received, cash spent and closing balance. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `from_date` | string | no |  | From Date (YYYY-MM-DD). |
| `to_date` | string | no |  | To Date (YYYY-MM-DD). |

Output fields:

- `reportId`: Report ID
- `reportName`: Report Name
- `reportType`: Report Type
- `reportDate`: Report Date
- `reportTitles`: Report Titles
- `columns`: Columns
- `rows`: Rows
- `rows[].section`: Section
- `rows[].rowType`: Row Type
- `rows[].label`: Label
- `rows[].values`: Values
- `rows[].accountId`: Account ID
- `rows[].invoiceId`: Invoice ID

### `xero_get_trial_balance`

**Get Trial Balance.** Runs the Trial Balance report as at a date (defaults to today): one row per account with debit, credit and year-to-date columns. Needs a connection created with Xero piece 0.8.0 or later (trial balance permission). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | string | no |  | As At Date (YYYY-MM-DD). |
| `payments_only` | boolean | no |  | Cash Basis (Payments Only). |

Output fields:

- `reportId`: Report ID
- `reportName`: Report Name
- `reportType`: Report Type
- `reportDate`: Report Date
- `reportTitles`: Report Titles
- `columns`: Columns
- `rows`: Rows
- `rows[].section`: Section
- `rows[].rowType`: Row Type
- `rows[].label`: Label
- `rows[].values`: Values
- `rows[].accountId`: Account ID
- `rows[].invoiceId`: Invoice ID

### `xero_get_executive_summary`

**Get Executive Summary.** Runs the Executive Summary report for the month containing a date (defaults to the current month), comparing it with the previous month: cash, income, expenses, receivables, payables and ratios. Needs a connection created with Xero piece 0.8.0 or later. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | string | no |  | Month Date (YYYY-MM-DD). Any date in the month to report on. |

Output fields:

- `reportId`: Report ID
- `reportName`: Report Name
- `reportType`: Report Type
- `reportDate`: Report Date
- `reportTitles`: Report Titles
- `columns`: Columns
- `rows`: Rows
- `rows[].section`: Section
- `rows[].rowType`: Row Type
- `rows[].label`: Label
- `rows[].values`: Values
- `rows[].accountId`: Account ID
- `rows[].invoiceId`: Invoice ID

### `xero_get_aged_receivables`

**Get Aged Receivables for Contact.** Runs the Aged Receivables by Contact report for one customer ContactID: each outstanding sales invoice with its amount due and how overdue it is. Use it to chase a customer; use Get Contact for the totals only. Needs a connection created with Xero piece 0.8.0 or later. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact ID. The Xero ContactID (a GUID). Use Find Contact to get it. |
| `date` | string | no |  | Aged As At (YYYY-MM-DD). Defaults to today. |
| `from_date` | string | no |  | Show Invoices From (YYYY-MM-DD). |
| `to_date` | string | no |  | Show Invoices To (YYYY-MM-DD). |

Output fields:

- `reportId`: Report ID
- `reportName`: Report Name
- `reportType`: Report Type
- `reportDate`: Report Date
- `reportTitles`: Report Titles
- `columns`: Columns
- `rows`: Rows
- `rows[].section`: Section
- `rows[].rowType`: Row Type
- `rows[].label`: Label
- `rows[].values`: Values
- `rows[].accountId`: Account ID
- `rows[].invoiceId`: Invoice ID

### `xero_get_aged_payables`

**Get Aged Payables for Contact.** Runs the Aged Payables by Contact report for one supplier ContactID: each outstanding bill with its amount due and how overdue it is. Needs a connection created with Xero piece 0.8.0 or later. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | yes |  | Organization. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact ID. The Xero ContactID (a GUID). Use Find Contact to get it. |
| `date` | string | no |  | Aged As At (YYYY-MM-DD). Defaults to today. |
| `from_date` | string | no |  | Show Invoices From (YYYY-MM-DD). |
| `to_date` | string | no |  | Show Invoices To (YYYY-MM-DD). |

Output fields:

- `reportId`: Report ID
- `reportName`: Report Name
- `reportType`: Report Type
- `reportDate`: Report Date
- `reportTitles`: Report Titles
- `columns`: Columns
- `rows`: Rows
- `rows[].section`: Section
- `rows[].rowType`: Row Type
- `rows[].label`: Label
- `rows[].values`: Values
- `rows[].accountId`: Account ID
- `rows[].invoiceId`: Invoice ID

### `xero_create_invoice_ai`

**Create Invoice or Bill.** Creates one sales invoice (Type ACCREC) or supplier bill (Type ACCPAY) for an existing ContactID with JSON line items, saved as DRAFT unless Status says SUBMITTED or AUTHORISED. Resolve the contact with Find Contact and account codes with List Accounts first; use Update Invoice to change an existing one. Not idempotent: each call creates another invoice, so pass a unique Reference and check Search Invoices before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `type` | string | yes |  | Type. One of `"ACCREC"`, `"ACCPAY"`. |
| `contact_id` | string | yes |  | Contact ID. Xero ContactID (a GUID) of the customer or supplier. |
| `line_items` | JSON | yes |  | Line Items. JSON array of line items, e.g. [{"Description":"Consulting","Quantity":2,"UnitAmount":150.5,"AccountCode":"200","TaxType":"OUTPUT"}]. Each line needs a Description or an ItemCode. Allowed keys: Description, Quantity, UnitAmount, LineAmount, AccountCode, ItemCode, TaxType, TaxAmount, DiscountRate, T… |
| `date` | string | no |  | Date (YYYY-MM-DD). Invoice date; Xero uses today when empty. |
| `due_date` | string | no |  | Due Date (YYYY-MM-DD). Required by Xero before the invoice can be approved. |
| `reference` | string | no |  | Reference. |
| `invoice_number` | string | no |  | Invoice Number. Leave empty to let Xero number sales invoices automatically. |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `currency_code` | string | no |  | Currency Code. ISO code such as USD; defaults to the organisation base currency. |
| `branding_theme_id` | string | no |  | Branding Theme ID. |

Output fields:

- `InvoiceID`: Invoice ID
- `InvoiceNumber`: Invoice Number
- `Type`: Type (ACCREC sales / ACCPAY bill)
- `Status`: Status
- `Reference`: Reference
- `Contact`: Contact
- `Contact.ContactID`: Contact ID
- `Contact.Name`: Contact Name
- `Contact.EmailAddress`: Contact Email (email)
- `DateString`: Date (date)
- `DueDateString`: Due Date (date)
- `LineAmountTypes`: Line Amount Types
- `SubTotal`: Subtotal (number)
- `TotalTax`: Total Tax (number)
- `Total`: Total (number)
- `CurrencyCode`: Currency
- `CurrencyRate`: Currency Rate (number)
- `AmountDue`: Amount Due (number)
- `AmountPaid`: Amount Paid (number)
- `AmountCredited`: Amount Credited (number)
- `SentToContact`: Sent to Contact (boolean)
- `BrandingThemeID`: Branding Theme ID
- `Url`: Source URL (url)
- `HasAttachments`: Has Attachments (boolean)
- `LineItems`: Line Items
- `LineItems[].LineItemID`: Line Item ID
- `LineItems[].Description`: Description
- `LineItems[].Quantity`: Quantity (number)
- `LineItems[].UnitAmount`: Unit Amount (number)
- `LineItems[].ItemCode`: Item Code
- `LineItems[].AccountCode`: Account Code
- `LineItems[].TaxType`: Tax Type
- `LineItems[].TaxAmount`: Tax Amount (number)
- `LineItems[].LineAmount`: Line Amount (number)
- `LineItems[].DiscountRate`: Discount Rate (%) (number)
- `LineItems[].Tracking`: Tracking
- `LineItems[].Tracking[].Name`: Tracking Category
- `LineItems[].Tracking[].Option`: Tracking Option

### `xero_update_invoice_ai`

**Update Invoice or Bill.** Updates an existing invoice or bill by InvoiceID: reference, dates, invoice number, contact, status (DRAFT, SUBMITTED or AUTHORISED) and line items. Line items replace the whole set unless Merge Line Items is on, which keeps existing lines, updates those whose LineItemID you pass and appends the rest. DRAFT and SUBMITTED invoices are fully editable; AUTHORISED ones only partly. Use Void or Delete Invoice to cancel one. Not idempotent when lines are appended; field-only changes converge. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `invoice_id` | string | yes |  | Invoice ID. Xero InvoiceID (a GUID) of the invoice or bill to update. |
| `reference` | string | no |  | Reference. |
| `date` | string | no |  | Date (YYYY-MM-DD). |
| `due_date` | string | no |  | Due Date (YYYY-MM-DD). |
| `invoice_number` | string | no |  | Invoice Number. |
| `contact_id` | string | no |  | Contact ID. Move the invoice to this ContactID. |
| `status` | string | no |  | Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`. |
| `line_items` | JSON | no |  | Line Items. JSON array of line items, e.g. [{"Description":"Consulting","Quantity":2,"UnitAmount":150.5,"AccountCode":"200","TaxType":"OUTPUT"}]. Each line needs a Description or an ItemCode. Allowed keys: Description, Quantity, UnitAmount, LineAmount, AccountCode, ItemCode, TaxType, TaxAmount, DiscountRate, T… |
| `merge_line_items` | boolean | no | `false` | Merge Line Items. Keep the existing lines, update lines whose LineItemID is given and append new ones. Off replaces all lines. |

Output fields:

- `InvoiceID`: Invoice ID
- `InvoiceNumber`: Invoice Number
- `Type`: Type (ACCREC sales / ACCPAY bill)
- `Status`: Status
- `Reference`: Reference
- `Contact`: Contact
- `Contact.ContactID`: Contact ID
- `Contact.Name`: Contact Name
- `Contact.EmailAddress`: Contact Email (email)
- `DateString`: Date (date)
- `DueDateString`: Due Date (date)
- `LineAmountTypes`: Line Amount Types
- `SubTotal`: Subtotal (number)
- `TotalTax`: Total Tax (number)
- `Total`: Total (number)
- `CurrencyCode`: Currency
- `CurrencyRate`: Currency Rate (number)
- `AmountDue`: Amount Due (number)
- `AmountPaid`: Amount Paid (number)
- `AmountCredited`: Amount Credited (number)
- `SentToContact`: Sent to Contact (boolean)
- `BrandingThemeID`: Branding Theme ID
- `Url`: Source URL (url)
- `HasAttachments`: Has Attachments (boolean)
- `LineItems`: Line Items
- `LineItems[].LineItemID`: Line Item ID
- `LineItems[].Description`: Description
- `LineItems[].Quantity`: Quantity (number)
- `LineItems[].UnitAmount`: Unit Amount (number)
- `LineItems[].ItemCode`: Item Code
- `LineItems[].AccountCode`: Account Code
- `LineItems[].TaxType`: Tax Type
- `LineItems[].TaxAmount`: Tax Amount (number)
- `LineItems[].LineAmount`: Line Amount (number)
- `LineItems[].DiscountRate`: Discount Rate (%) (number)
- `LineItems[].Tracking`: Tracking
- `LineItems[].Tracking[].Name`: Tracking Category
- `LineItems[].Tracking[].Option`: Tracking Option

### `xero_email_invoice_ai`

**Email Invoice.** Emails a SUBMITTED, AUTHORISED or PAID sales invoice (ACCREC) to its contact's email address through Xero, using the organisation's email template; the contact must have an email address. Not idempotent: each call sends another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `invoice_id` | string | yes |  | Invoice ID. Xero InvoiceID (a GUID) of the sales invoice to email. |

Output fields:

- `success`: Sent (boolean)
- `invoiceId`: Invoice ID

### `xero_create_payment_ai`

**Record Payment.** Records a payment of an amount against an AUTHORISED invoice or bill by InvoiceID, paid into or out of a bank account given by AccountID or account code; the amount must not exceed the amount due. Use List Accounts (Only Accounts That Accept Payments) to find the account. Not idempotent: a re-run pays twice; Delete Payment reverses it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `invoice_id` | string | yes |  | Invoice ID. Xero InvoiceID (a GUID) of the AUTHORISED invoice or bill. |
| `account_id` | string | no |  | Account ID. AccountID of the bank account. Give this or Account Code. |
| `account_code` | string | no |  | Account Code. Code of the bank account, e.g. 090. Give this or Account ID. |
| `amount` | number | yes |  | Amount. Payment amount in the invoice currency, up to 2 decimal places. |
| `date` | string | yes |  | Payment Date (YYYY-MM-DD). |
| `reference` | string | no |  | Reference. |
| `currency_rate` | number | no |  | Currency Rate. Exchange rate for foreign-currency invoices. |

Output fields:

- `PaymentID`: Payment ID
- `Amount`: Amount (number)
- `BankAmount`: Bank Amount (number)
- `CurrencyRate`: Currency Rate (number)
- `Reference`: Reference
- `Status`: Status
- `PaymentType`: Payment Type
- `IsReconciled`: Is Reconciled (boolean)
- `Invoice`: Invoice
- `Invoice.InvoiceID`: Invoice ID
- `Invoice.InvoiceNumber`: Invoice Number
- `Invoice.Type`: Invoice Type
- `Invoice.Contact`: Contact
- `Invoice.Contact.ContactID`: Contact ID
- `Invoice.Contact.Name`: Contact Name
- `Invoice.Contact.EmailAddress`: Contact Email (email)
- `Account`: Bank Account
- `Account.AccountID`: Account ID
- `Account.Code`: Account Code
- `Account.Name`: Account Name

### `xero_create_credit_note_ai`

**Create Credit Note.** Creates a credit note for an existing ContactID: ACCRECCREDIT for a customer (reduces what they owe) or ACCPAYCREDIT for a supplier, with JSON line items; saved as DRAFT unless Status is SUBMITTED or AUTHORISED. Use Allocate Credit Note to Invoice afterwards to apply it. Not idempotent: each call creates another credit note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `type` | string | yes |  | Type. One of `"ACCRECCREDIT"`, `"ACCPAYCREDIT"`. |
| `contact_id` | string | yes |  | Contact ID. Xero ContactID (a GUID). |
| `line_items` | JSON | yes |  | Line Items. JSON array of line items, e.g. [{"Description":"Consulting","Quantity":2,"UnitAmount":150.5,"AccountCode":"200","TaxType":"OUTPUT"}]. Each line needs a Description or an ItemCode. Allowed keys: Description, Quantity, UnitAmount, LineAmount, AccountCode, ItemCode, TaxType, TaxAmount, DiscountRate, T… |
| `date` | string | no |  | Date (YYYY-MM-DD). |
| `reference` | string | no |  | Reference. |
| `credit_note_number` | string | no |  | Credit Note Number. |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `currency_code` | string | no |  | Currency Code. ISO code such as USD; defaults to the organisation base currency. |

Output fields:

- `CreditNoteID`: Credit Note ID
- `CreditNoteNumber`: Credit Note Number
- `Type`: Type
- `Status`: Status
- `Reference`: Reference
- `Contact`: Contact
- `Contact.ContactID`: Contact ID
- `Contact.Name`: Contact Name
- `Contact.EmailAddress`: Contact Email (email)
- `DateString`: Date (date)
- `LineAmountTypes`: Line Amount Types
- `SubTotal`: Subtotal (number)
- `TotalTax`: Total Tax (number)
- `Total`: Total (number)
- `CurrencyCode`: Currency
- `CurrencyRate`: Currency Rate (number)
- `RemainingCredit`: Remaining Credit (number)
- `Allocations`: Allocations
- `Allocations[].AllocationID`: Allocation ID
- `Allocations[].Amount`: Amount (number)
- `Allocations[].Invoice`: Invoice
- `Allocations[].Invoice.InvoiceID`: Invoice ID
- `Allocations[].Invoice.InvoiceNumber`: Invoice Number
- `LineItems`: Line Items
- `LineItems[].LineItemID`: Line Item ID
- `LineItems[].Description`: Description
- `LineItems[].Quantity`: Quantity (number)
- `LineItems[].UnitAmount`: Unit Amount (number)
- `LineItems[].ItemCode`: Item Code
- `LineItems[].AccountCode`: Account Code
- `LineItems[].TaxType`: Tax Type
- `LineItems[].TaxAmount`: Tax Amount (number)
- `LineItems[].LineAmount`: Line Amount (number)
- `LineItems[].DiscountRate`: Discount Rate (%) (number)
- `LineItems[].Tracking`: Tracking
- `LineItems[].Tracking[].Name`: Tracking Category
- `LineItems[].Tracking[].Option`: Tracking Option

### `xero_allocate_credit_note_ai`

**Allocate Credit Note to Invoice.** Applies an amount from an AUTHORISED credit note (CreditNoteID) to an AUTHORISED invoice or bill of the same contact (InvoiceID), reducing what is due. The amount cannot exceed the remaining credit or the amount due. Not idempotent: each call allocates again, and allocations cannot be removed through the API. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `credit_note_id` | string | yes |  | Credit Note ID. Xero CreditNoteID (a GUID). |
| `invoice_id` | string | yes |  | Invoice ID. Xero InvoiceID (a GUID) to apply the credit to. |
| `amount` | number | yes |  | Amount. Amount to allocate, up to 2 decimal places. |
| `date` | string | no |  | Date (YYYY-MM-DD). Defaults to today in Xero. |

Output fields:

- `AllocationID`: Allocation ID
- `Amount`: Amount (number)
- `DateString`: Date (date)
- `Invoice`: Invoice
- `Invoice.InvoiceID`: Invoice ID
- `Invoice.InvoiceNumber`: Invoice Number
- `CreditNote`: Credit Note
- `CreditNote.CreditNoteID`: Credit Note ID
- `CreditNote.CreditNoteNumber`: Credit Note Number

### `xero_create_quote_ai`

**Create Quote.** Creates a sales quote for an existing customer ContactID with a quote date and JSON line items, plus optional title, summary, terms and expiry date; saved as DRAFT unless Status is SENT. Not idempotent: each call creates another quote, so check before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `contact_id` | string | yes |  | Contact ID. Xero ContactID (a GUID) of the customer. |
| `date` | string | yes |  | Quote Date (YYYY-MM-DD). |
| `line_items` | JSON | yes |  | Line Items. JSON array of line items, e.g. [{"Description":"Consulting","Quantity":2,"UnitAmount":150.5,"AccountCode":"200","TaxType":"OUTPUT"}]. Each line needs a Description or an ItemCode. Allowed keys: Description, Quantity, UnitAmount, LineAmount, AccountCode, ItemCode, TaxType, TaxAmount, DiscountRate, T… |
| `expiry_date` | string | no |  | Expiry Date (YYYY-MM-DD). |
| `reference` | string | no |  | Reference. |
| `quote_number` | string | no |  | Quote Number. |
| `title` | string | no |  | Title. |
| `summary` | string | no |  | Summary. |
| `terms` | string | no |  | Terms. |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"SENT"`. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `currency_code` | string | no |  | Currency Code. ISO code such as USD; defaults to the organisation base currency. |

Output fields:

- `QuoteID`: Quote ID
- `QuoteNumber`: Quote Number
- `Reference`: Reference
- `Status`: Status
- `Title`: Title
- `Terms`: Terms
- `Contact`: Contact
- `Contact.ContactID`: Contact ID
- `Contact.Name`: Contact Name
- `Contact.EmailAddress`: Contact Email (email)
- `DateString`: Date (date)
- `ExpiryDateString`: Expiry Date (date)
- `LineAmountTypes`: Line Amount Types
- `SubTotal`: Subtotal (number)
- `TotalTax`: Total Tax (number)
- `Total`: Total (number)
- `CurrencyCode`: Currency
- `CurrencyRate`: Currency Rate (number)
- `LineItems`: Line Items
- `LineItems[].LineItemID`: Line Item ID
- `LineItems[].Description`: Description
- `LineItems[].Quantity`: Quantity (number)
- `LineItems[].UnitAmount`: Unit Amount (number)
- `LineItems[].ItemCode`: Item Code
- `LineItems[].AccountCode`: Account Code
- `LineItems[].TaxType`: Tax Type
- `LineItems[].TaxAmount`: Tax Amount (number)
- `LineItems[].LineAmount`: Line Amount (number)
- `LineItems[].DiscountRate`: Discount Rate (%) (number)
- `LineItems[].Tracking`: Tracking
- `LineItems[].Tracking[].Name`: Tracking Category
- `LineItems[].Tracking[].Option`: Tracking Option

### `xero_create_purchase_order_ai`

**Create Purchase Order.** Creates a purchase order to an existing supplier ContactID with JSON line items and optional delivery details; saved as DRAFT unless Status is SUBMITTED or AUTHORISED. Use Update Purchase Order to change it later. Not idempotent: each call creates another purchase order. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `contact_id` | string | yes |  | Contact ID. Xero ContactID (a GUID) of the supplier. |
| `line_items` | JSON | yes |  | Line Items. JSON array of line items, e.g. [{"Description":"Consulting","Quantity":2,"UnitAmount":150.5,"AccountCode":"200","TaxType":"OUTPUT"}]. Each line needs a Description or an ItemCode. Allowed keys: Description, Quantity, UnitAmount, LineAmount, AccountCode, ItemCode, TaxType, TaxAmount, DiscountRate, T… |
| `date` | string | no |  | Date (YYYY-MM-DD). |
| `delivery_date` | string | no |  | Delivery Date (YYYY-MM-DD). |
| `reference` | string | no |  | Reference. |
| `purchase_order_number` | string | no |  | Purchase Order Number. |
| `delivery_address` | string | no |  | Delivery Address. |
| `attention_to` | string | no |  | Attention To. |
| `telephone` | string | no |  | Telephone. |
| `delivery_instructions` | string | no |  | Delivery Instructions. |
| `status` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"SUBMITTED"`, `"AUTHORISED"`. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `currency_code` | string | no |  | Currency Code. ISO code such as USD; defaults to the organisation base currency. |

Output fields:

- `PurchaseOrderID`: Purchase Order ID
- `PurchaseOrderNumber`: Purchase Order Number
- `Reference`: Reference
- `Status`: Status
- `Contact`: Supplier
- `Contact.ContactID`: Contact ID
- `Contact.Name`: Contact Name
- `Contact.EmailAddress`: Contact Email (email)
- `DateString`: Date (date)
- `DeliveryDateString`: Delivery Date (date)
- `DeliveryAddress`: Delivery Address
- `AttentionTo`: Attention To
- `Telephone`: Telephone
- `DeliveryInstructions`: Delivery Instructions
- `SentToContact`: Sent to Contact (boolean)
- `LineAmountTypes`: Line Amount Types
- `SubTotal`: Subtotal (number)
- `TotalTax`: Total Tax (number)
- `Total`: Total (number)
- `CurrencyCode`: Currency
- `CurrencyRate`: Currency Rate (number)
- `LineItems`: Line Items
- `LineItems[].LineItemID`: Line Item ID
- `LineItems[].Description`: Description
- `LineItems[].Quantity`: Quantity (number)
- `LineItems[].UnitAmount`: Unit Amount (number)
- `LineItems[].ItemCode`: Item Code
- `LineItems[].AccountCode`: Account Code
- `LineItems[].TaxType`: Tax Type
- `LineItems[].TaxAmount`: Tax Amount (number)
- `LineItems[].LineAmount`: Line Amount (number)
- `LineItems[].DiscountRate`: Discount Rate (%) (number)
- `LineItems[].Tracking`: Tracking
- `LineItems[].Tracking[].Name`: Tracking Category
- `LineItems[].Tracking[].Option`: Tracking Option

### `xero_create_bank_transaction_ai`

**Create Bank Transaction.** Records a spend money (SPEND) or receive money (RECEIVE) transaction for a ContactID on a bank account given by AccountID or account code, with JSON line items; use it for money that is not paying an invoice (use Record Payment for invoices). Not idempotent: each call records another transaction. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `type` | string | yes |  | Type. One of `"SPEND"`, `"RECEIVE"`. |
| `contact_id` | string | yes |  | Contact ID. Xero ContactID (a GUID). |
| `bank_account_id` | string | no |  | Bank Account ID. AccountID of the bank account. Give this or Bank Account Code. |
| `bank_account_code` | string | no |  | Bank Account Code. Code of the bank account, e.g. 090. Give this or Bank Account ID. |
| `line_items` | JSON | yes |  | Line Items. JSON array of line items, e.g. [{"Description":"Consulting","Quantity":2,"UnitAmount":150.5,"AccountCode":"200","TaxType":"OUTPUT"}]. Each line needs a Description or an ItemCode. Allowed keys: Description, Quantity, UnitAmount, LineAmount, AccountCode, ItemCode, TaxType, TaxAmount, DiscountRate, T… |
| `date` | string | no |  | Date (YYYY-MM-DD). |
| `reference` | string | no |  | Reference. |
| `is_reconciled` | boolean | no | `false` | Mark as Reconciled. |
| `line_amount_types` | string | no |  | Line Amount Types. One of `"Exclusive"`, `"Inclusive"`, `"NoTax"`. |
| `currency_code` | string | no |  | Currency Code. ISO code such as USD; defaults to the organisation base currency. |

Output fields:

- `BankTransactionID`: Bank Transaction ID
- `Type`: Type
- `Status`: Status
- `Reference`: Reference
- `Contact`: Contact
- `Contact.ContactID`: Contact ID
- `Contact.Name`: Contact Name
- `Contact.EmailAddress`: Contact Email (email)
- `BankAccount`: Bank Account
- `BankAccount.AccountID`: Account ID
- `BankAccount.Code`: Account Code
- `BankAccount.Name`: Account Name
- `DateString`: Date (date)
- `IsReconciled`: Is Reconciled (boolean)
- `Url`: Source URL (url)
- `LineAmountTypes`: Line Amount Types
- `SubTotal`: Subtotal (number)
- `TotalTax`: Total Tax (number)
- `Total`: Total (number)
- `CurrencyCode`: Currency
- `CurrencyRate`: Currency Rate (number)
- `LineItems`: Line Items
- `LineItems[].LineItemID`: Line Item ID
- `LineItems[].Description`: Description
- `LineItems[].Quantity`: Quantity (number)
- `LineItems[].UnitAmount`: Unit Amount (number)
- `LineItems[].ItemCode`: Item Code
- `LineItems[].AccountCode`: Account Code
- `LineItems[].TaxType`: Tax Type
- `LineItems[].TaxAmount`: Tax Amount (number)
- `LineItems[].LineAmount`: Line Amount (number)
- `LineItems[].DiscountRate`: Discount Rate (%) (number)
- `LineItems[].Tracking`: Tracking
- `LineItems[].Tracking[].Name`: Tracking Category
- `LineItems[].Tracking[].Option`: Tracking Option

### `xero_upload_attachment_ai`

**Upload Attachment.** Attaches a file (max 10 MB) to an existing Xero record given by resource type and record ID, such as an invoice, bill, credit note, purchase order, quote, contact, bank transaction or manual journal. Include Online only applies to sales invoices and credit notes. Attachments cannot be deleted through the API. Not idempotent: each call adds another attachment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenant_id` | string | no |  | Organisation ID. Xero tenant ID of the organisation to use, from List Organisations. Leave empty when the connection has only one organisation. |
| `resource_type` | string | yes |  | Resource Type. One of `"Invoices"`, `"CreditNotes"`, `"PurchaseOrders"`, `"Quotes"`, `"BankTransactions"`, `"BankTransfers"`, `"Contacts"`, `"Accounts"`, `"ManualJournals"`, `"RepeatingInvoices"`. |
| `resource_id` | string | yes |  | Record ID. Xero ID (a GUID) of the record, e.g. the InvoiceID. |
| `file` | file | yes |  | File. The file to attach, up to 10 MB. Files are not supported; an action that needs one fails. |
| `file_name` | string | no |  | File Name. Defaults to the file's own name. |
| `include_online` | boolean | no | `false` | Include Online. Show the attachment on the online invoice (sales invoices and credit notes only). |

Output fields:

- `AttachmentID`: Attachment ID
- `FileName`: File Name
- `Url`: URL (url)
- `MimeType`: MIME Type
- `ContentLength`: Size (filesize)
- `IncludeOnline`: Included Online (boolean)

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
