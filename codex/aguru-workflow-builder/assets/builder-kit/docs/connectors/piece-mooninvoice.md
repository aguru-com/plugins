# Moon Invoice

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mooninvoice'
  version: '0.0.9'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: MoonInvoice API Key

> # MoonInvoice Authentication
>
> To authenticate with MoonInvoice API, you need:
>
> 1. **Email**: Your MoonInvoice account email address
> 2. **Secret Key**: Your MoonInvoice secret key for API access
>
> ## Getting Your Credentials
>
> If you don't have your API credentials yet, please contact us at **support@mooninvoice.com** to get your API secret key or if you have any queries.
>
> ## API Documentation
>
> For more information about MoonInvoice API, visit: https://www.mooninvoice.com/docs/api

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Your MoonInvoice account email address. |
| `secret_text` | string | yes |  | Secret Key. Your MoonInvoice API secret key (contact support@mooninvoice.com if you need one) |

## Actions

### `addNewContact`

**Add New Contact.** Creates a new contact (customer and/or vendor) under a given MoonInvoice company. Use when adding a person or organization that will later be billed, invoiced, or paid. Requires the target company; all contact details (name, email, addresses, tax/registration numbers, opening balance) are optional. Not idempotent — each call creates a separate contact, even with identical details. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select the company. A value the product loads from the provider, such as an id; write the value itself. |
| `organization` | string | no |  | Organization. Name of Organization/Company. |
| `firstName` | string | no |  | First Name. First Name of Contact. |
| `lastName` | string | no |  | Last Name. Last Name of Contact. |
| `email` | string | no |  | Email. Email of Contact person. |
| `mobileNo` | string | no |  | Mobile Number. Mobile No. of Contact person. |
| `businessNo` | string | no |  | Business Number. Business Ph No. of Contact person. |
| `homeNo` | string | no |  | Home Number. Home Ph No. of Contact person. |
| `vatNo` | string | no |  | VAT Number. VAT No. of Contact. |
| `regNo` | string | no |  | Registration Number. Registration No. |
| `faxNo` | string | no |  | Fax Number. Fax No. |
| `internalNotes` | string | no |  | Internal Notes. Internal Notes of Contact. |
| `hourlyRate` | number | no |  | Hourly Rate. Hourly Rate of Contact person. |
| `currencyCode` | string | no |  | Currency Code. Currency code like INR, USD, CAD etc. |
| `statusCustomer` | boolean | no |  | Is Customer. If Contact is customer. |
| `statusVendor` | boolean | no |  | Is Vendor. If Contact is vendor. |
| `paymentReminder` | boolean | no |  | Payment Reminder. Enable payment reminder. |
| `billingAddressStreet1` | string | no |  | Billing Address Street 1. Billing Address Street1 of Contact person. |
| `billingAddressStreet2` | string | no |  | Billing Address Street 2. Billing Address Street2 of Contact person. |
| `billingAddressCity` | string | no |  | Billing Address City. Billing Address City of Contact person. |
| `billingAddressState` | string | no |  | Billing Address State. Billing Address State of Contact person. |
| `billingAddressCountry` | string | no |  | Billing Address Country. Billing Address Country of Contact person. |
| `billingAddressZip` | string | no |  | Billing Address Zip. Billing Address Zip of Contact person. |
| `shippingAddressStreet1` | string | no |  | Shipping Address Street 1. Shipping Address Street1 of Contact person. |
| `shippingAddressStreet2` | string | no |  | Shipping Address Street 2. Shipping Address Street2 of Contact person. |
| `shippingAddressCity` | string | no |  | Shipping Address City. Shipping Address City of Contact person. |
| `shippingAddressState` | string | no |  | Shipping Address State. Shipping Address State of Contact person. |
| `shippingAddressCountry` | string | no |  | Shipping Address Country. Shipping Address Country of Contact person. |
| `shippingAddressZip` | string | no |  | Shipping Address Zip. Shipping Address Zip of Contact person. |
| `paymentTerms` | number | no |  | Payment Terms (Days). Payment terms must be 7, 10, 15, 30, 60, 90, or 180 days only. |
| `openingBalance` | number | no |  | Opening Balance. Opening Balance of Contact. |
| `openingBalanceDate` | string | no |  | Opening Balance Date. Opening Balance Date in format: "2025-1-8 15:9:40". |
| `bankDetails` | string | no |  | Bank Details. Bank details in format: "Account No: 78452356\nAccount Holder Name: Abby Hamill\nBranch Name: ABC". |

### `createCreditNote`

**Create Credit Note.** Creates a new credit note for a contact under a MoonInvoice company. Use when issuing a refund or credit against prior billing. Requires the company, contact, a credit note number, and an entry date; line items (products and tasks) are supplied as JSON arrays. Not idempotent — each call creates a new credit note regardless of the credit note number. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select the company. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `creditNotesNumber` | string | yes |  | Credit Note Number. Credit Note Number. |
| `entryDate` | string | yes |  | Entry Date. Entry Date of Credit Note (e.g., "2025-02-20") |
| `creditNotesHeader` | string | no |  | Credit Note Header. Title or Header of Credit Note. |
| `creditNotesTerms` | string | no |  | Credit Note Terms. Terms of Credit Note. |
| `notes` | string | no |  | Notes. Notes/Description of Credit Note. |
| `selectedCurrency` | string | no |  | Selected Currency. Currency code like en_IN, en_US etc. |
| `discountBeforeTax` | boolean | no |  | Discount Before Tax. Discount applied before tax. |
| `isRoundOff` | boolean | no |  | Round Off. Round off the final amount. |
| `roundedAmount` | number | no |  | Rounded Amount. Rounded amount value. |
| `percentage` | number | no |  | Discount Percentage. Discount percentage from total amount. |
| `billingStreet1` | string | no |  | Billing Address Street 1. Billing Address Street1. |
| `billingStreet2` | string | no |  | Billing Address Street 2. Billing Address Street2. |
| `billingCity` | string | no |  | Billing Address City. Billing Address City. |
| `billingState` | string | no |  | Billing Address State. Billing Address State. |
| `billingCountry` | string | no |  | Billing Address Country. Billing Address Country. |
| `billingZip` | string | no |  | Billing Address Zip. Billing Address Zip. |
| `shippingStreet1` | string | no |  | Shipping Address Street 1. Shipping Address Street1. |
| `shippingStreet2` | string | no |  | Shipping Address Street 2. Shipping Address Street2. |
| `shippingCity` | string | no |  | Shipping Address City. Shipping Address City. |
| `shippingState` | string | no |  | Shipping Address State. Shipping Address State. |
| `shippingCountry` | string | no |  | Shipping Address Country. Shipping Address Country. |
| `shippingZip` | string | no |  | Shipping Address Zip. Shipping Address Zip. |
| `productDataJson` | string | no |  | Product Data (JSON). Product Data as JSON array. Each item should contain: ProductName, HSNCode, Quantity, UnitCost, ProductNotes, ProductID, Total, SubAmount, DiscountIsPercentage, ProductType, DiscountValue, TaxID (array), TaxType. |
| `taskDataJson` | string | no |  | Task Data (JSON). Task Data as JSON array. Each item should contain: TaskName, Hours, TaskRate, TimeNotes, TaskID, Total, DiscountIsPercentage, TaskType, DiscountValue, TaxID (array), TaxType. |

### `createEstimate`

**Create Estimate.** Creates a new estimate (quote) for a contact under a MoonInvoice company. Use when generating a price quote before invoicing. Requires the company, contact, an estimate number, and an entry date; line items (products and tasks) are supplied as JSON arrays. Not idempotent — each call creates a new estimate regardless of the estimate number. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select the company. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `estimateNumber` | string | yes |  | Estimate Number. Estimate Number. |
| `entryDate` | string | yes |  | Entry Date. Entry Date of Estimate (e.g., "2025-02-20") |
| `estimateHeader` | string | no |  | Estimate Header. Title or Header of Estimate. |
| `estimateTerms` | string | no |  | Estimate Terms. Terms of Estimate. |
| `estimateNotes` | string | no |  | Estimate Notes. Notes/Description of Estimate. |
| `selectedCurrency` | string | no |  | Selected Currency. Currency code like en_IN, en_US etc. |
| `shippingCost` | number | no |  | Shipping Cost. Shipping Cost of Estimate. |
| `shippingMethod` | string | no |  | Shipping Method. Shipping Method of Estimate. |
| `discountAmount` | number | no |  | Discount Amount. Discount Amount on Estimate total. |
| `discountBeforeTax` | boolean | no |  | Discount Before Tax. Discount applied before tax. |
| `isRoundOff` | boolean | no |  | Round Off. Round off the final amount. |
| `roundedAmount` | number | no |  | Rounded Amount. Rounded amount value. |
| `percentage` | number | no |  | Discount Percentage. Discount percentage from total amount. |
| `billingStreet1` | string | no |  | Billing Address Street 1. Billing Address Street1. |
| `billingStreet2` | string | no |  | Billing Address Street 2. Billing Address Street2. |
| `billingCity` | string | no |  | Billing Address City. Billing Address City. |
| `billingState` | string | no |  | Billing Address State. Billing Address State. |
| `billingCountry` | string | no |  | Billing Address Country. Billing Address Country. |
| `billingZip` | string | no |  | Billing Address Zip. Billing Address Zip. |
| `shippingStreet1` | string | no |  | Shipping Address Street 1. Shipping Address Street1. |
| `shippingStreet2` | string | no |  | Shipping Address Street 2. Shipping Address Street2. |
| `shippingCity` | string | no |  | Shipping Address City. Shipping Address City. |
| `shippingState` | string | no |  | Shipping Address State. Shipping Address State. |
| `shippingCountry` | string | no |  | Shipping Address Country. Shipping Address Country. |
| `shippingZip` | string | no |  | Shipping Address Zip. Shipping Address Zip. |
| `productDataJson` | string | no |  | Product Data (JSON). Product Data as JSON array. Each item: ProductName, Quantity, UnitCost, ProductNotes, ProductID, Total, SubAmount, DiscountIsPercentage, ProductType, DiscountValue, TaxID (array), TaxType. |
| `taskDataJson` | string | no |  | Task Data (JSON). Task Data as JSON array. Each item: TaskName, Hours, TaskRate, TimeNotes, TaskID, Total, DiscountIsPercentage, TaskType, DiscountValue, TaxID (array), TaxType. |

### `createExpense`

**Create Expense.** Records a new expense against a contact under a MoonInvoice company, optionally as a recurring expense on a chosen interval. Use when logging a cost or vendor payment. Requires the company, contact, an expense number, and a date; tax IDs are supplied as a JSON array. Not idempotent — each call creates a new expense regardless of the expense number. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select the company. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | string | yes |  | Date. Date of Expense (e.g., "2025-02-20") |
| `expenseNumber` | string | yes |  | Expense Number. Expense Number. |
| `contactId` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `expenseCost` | number | no |  | Expense Cost. Cost of Expense. |
| `expenseNotes` | string | no |  | Expense Notes. Expense Notes. |
| `totalAmount` | number | no |  | Total Amount. Total Amount of Expense. |
| `categoryName` | string | no |  | Category Name. Category Name of Expense (e.g., Wages, Supplies, etc.) |
| `paymentType` | string | no |  | Payment Type. Type of Payment (e.g., Visa, Cash, UPI, etc.) |
| `selectedCurrency` | string | no |  | Selected Currency. Currency code like en_IN, en_US etc. |
| `isRecurring` | boolean | no |  | Is Recurring. If Expense is recurring. |
| `recurringEndDate` | string | no |  | Recurring End Date. End Date of Expense recurring (e.g., "2025-12-31") |
| `recurringIntervalInDay` | number | no |  | Recurring Interval (Days). No of Days for Expense recurring. |
| `recurringIntervalInString` | string | no |  | Recurring Period. Expense recurring period. One of `"Daily"`, `"Weekly"`, `"Fortnightly"`, `"Monthly"`, `"BiMonthly"`, `"Quarterly"`, `"6-Months"`, `"Annually"`, `"2-Years"`. |
| `isRoundOff` | boolean | no |  | Round Off. Total Amount Round off or not. |
| `roundedAmount` | number | no |  | Rounded Amount. Total Amount Rounded. |
| `taxIdJson` | string | no |  | Tax IDs (JSON). TaxID is an array of Tax IDs. Example: ["1C34BE89-2FC6-48A4-9808-99490F40D3E1", "95A1956E-E60A-4FAC-8EC4-C88EE7431280"]. |
| `taxType` | boolean | no |  | Tax is Inclusive. If Tax is Inclusive then true otherwise false. |

### `createInvoice`

**Create Invoice.** Creates a new invoice for a contact under a MoonInvoice company, optionally as a recurring invoice on a chosen interval. Use when billing a customer. Requires the company, contact, an invoice number, an entry date, and a due date; payment methods and line items (products and tasks) are supplied as JSON arrays. Not idempotent — each call creates a new invoice regardless of the invoice number. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select the company. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes |  | Contact. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `invoiceNumber` | string | yes |  | Invoice Number. Invoice Number. |
| `entryDate` | string | yes |  | Entry Date. Entry Date of Invoice (e.g., "2025-02-20") |
| `dueDate` | string | yes |  | Due Date. Payment Due Date of Invoice (e.g., "2025-03-20") |
| `invoiceHeader` | string | no |  | Invoice Header. Title or Header of Invoice. |
| `terms` | string | no |  | Terms. Terms of Invoice. |
| `notes` | string | no |  | Notes. Notes/Description of Invoice. |
| `selectedCurrency` | string | no |  | Selected Currency. Currency code like en_IN, en_US etc. |
| `shippingCost` | number | no |  | Shipping Cost. Shipping Cost of Invoice. |
| `shippingMethod` | string | no |  | Shipping Method. Shipping Method of Invoice. |
| `poNo` | string | no |  | PO Number. PO No of Invoice. |
| `discountAmount` | number | no |  | Discount Amount. Discount Amount on invoice total. |
| `discountBeforeTax` | boolean | no |  | Discount Before Tax. Discount applied before tax. |
| `depositeAmount` | number | no |  | Deposite Amount. Deposite Amount of Invoice. |
| `amountDue` | number | no |  | Amount Due. Remaining Payment Amount of Invoice. |
| `amountPaid` | number | no |  | Amount Paid. Total Paid Amount of Invoice. |
| `totalAmount` | number | no |  | Total Amount. Total Amount of Invoice. |
| `subTotal` | number | no |  | Sub Total. Sub Total Amount of Invoice. |
| `isRecurring` | boolean | no |  | Is Recurring. If Invoice is recurring. |
| `recurringEndDate` | string | no |  | Recurring End Date. End Date of Invoice recurring (e.g., "2025-12-31") |
| `recurringIntervalInString` | string | no |  | Recurring Period. Invoice recurring period. One of `"Daily"`, `"Weekly"`, `"Fortnightly"`, `"Monthly"`, `"BiMonthly"`, `"Quarterly"`, `"6-Months"`, `"Annually"`, `"2-Years"`. |
| `billingStreet1` | string | no |  | Billing Address Street 1. Billing Address Street1. |
| `billingStreet2` | string | no |  | Billing Address Street 2. Billing Address Street2. |
| `billingCity` | string | no |  | Billing Address City. Billing Address City. |
| `billingState` | string | no |  | Billing Address State. Billing Address State. |
| `billingCountry` | string | no |  | Billing Address Country. Billing Address Country. |
| `billingZip` | string | no |  | Billing Address Zip. Billing Address Zip. |
| `shippingStreet1` | string | no |  | Shipping Address Street 1. Shipping Address Street1. |
| `shippingStreet2` | string | no |  | Shipping Address Street 2. Shipping Address Street2. |
| `shippingCity` | string | no |  | Shipping Address City. Shipping Address City. |
| `shippingState` | string | no |  | Shipping Address State. Shipping Address State. |
| `shippingCountry` | string | no |  | Shipping Address Country. Shipping Address Country. |
| `shippingZip` | string | no |  | Shipping Address Zip. Shipping Address Zip. |
| `paymentMethodsJson` | string | no |  | Payment Methods (JSON). PaymentMethods is array and contains Payment Method IDs. Example: ["3A72C3BF-1B42-4A62-9E8E-5C4178E07D2F", "D89F53D9-7E01-4438-88BD-74D9C4101D7C"]. |
| `productDataJson` | string | no |  | Product Data (JSON). Product Data as JSON array. Each item: ProductName, Quantity, UnitCost, ProductNotes, ProductID, Total, SubAmount, DiscountIsPercentage, ProductType, DiscountValue, TaxID (array), TaxType. |
| `taskDataJson` | string | no |  | Task Data (JSON). Task Data as JSON array. Each item: TaskName, Hours, TaskRate, TimeNotes, TaskID, Total, DiscountIsPercentage, TaskType, DiscountValue, TaxID (array), TaxType. |

### `createProduct`

**Create Product.** Creates a new product (catalog item) under a MoonInvoice company that can later be added to invoices, estimates, or credit notes. Use when adding a sellable item with its costs, codes, and stock/serial/batch options. Requires the company and a product name; buy/sales tax IDs are supplied as JSON arrays. Not idempotent — each call creates a new product even with the same name. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select the company. A value the product loads from the provider, such as an id; write the value itself. |
| `productName` | string | yes |  | Product Name. Name of product. |
| `productCode` | string | no |  | Product Code. SKU code of product. |
| `productBuyCost` | number | no |  | Product Buy Cost. Buy cost of product. |
| `productUnitCost` | number | no |  | Product Unit Cost. Sell or Unit cost of product. |
| `productType` | string | no |  | Product Type. Type of product like kg, piece, liter etc. |
| `productQuantity` | number | no |  | Product Quantity. Quantity of product. |
| `productNotes` | string | no |  | Product Notes. Note or Description about product. |
| `productCategory` | string | no |  | Product Category. Category of product. |
| `productSelectedCurrency` | string | no |  | Product Currency. Currency code like INR, USD, CAD etc. |
| `hsnCode` | string | no |  | HSN Code. HSNCode of product. |
| `productStockManage` | boolean | no |  | Stock Manage. Enable stock management for this product. |
| `showInMenu` | boolean | no |  | Show In Menu. Show product in POS menu. |
| `productSerialized` | boolean | no |  | Product Serialized. Enable serial number tracking for each unit. |
| `productBatched` | boolean | no |  | Product Batched. Enable batch management for this product. |
| `productDietType` | string | no |  | Product Diet Type. Dietary classification of the product. One of `"1"`, `"2"`, `"3"`, `"4"`. |
| `productBuyTaxJson` | string | no |  | Product Buy Tax (JSON). Array of tax IDs applied on product buy. Example: ["95A1956E-E60A-4FAC-8EC4-C88EE7431280"]. |
| `productSalesTaxJson` | string | no |  | Product Sales Tax (JSON). Array of tax IDs applied on product sales. Example: ["95A1956E-E60A-4FAC-8EC4-C88EE7431280"]. |

### `createTask`

**Create Task.** Creates a new billable task (time/service line item) under a project within a MoonInvoice company that can later be added to invoices or estimates. Use when defining work to bill by hours and rate. Requires the company, a project, and a task name; tax IDs are supplied as a JSON array. Not idempotent — each call creates a new task even with the same name. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select the company. A value the product loads from the provider, such as an id; write the value itself. |
| `taskName` | string | yes |  | Task Name. Name of Task. |
| `projectId` | string | yes |  | Project. Select the project. A value the product loads from the provider, such as an id; write the value itself. |
| `hours` | number | no |  | Hours. Task hours. |
| `notes` | string | no |  | Notes. Task notes. |
| `rate` | number | no |  | Rate. Rate of task. |
| `taskType` | string | no |  | Task Type. Type of task like Hours, Minutes etc. |
| `sacCode` | string | no |  | SAC Code. SACCode of task. |
| `taskTaxJson` | string | no |  | Task Tax (JSON). Array of TaxID for task. Example: ["95A1956E-E60A-4FAC-8EC4-C88EE7431280", "CBC0A8DD-EDF5-47B2-B8DB-E7BA953E2C86"]. |
