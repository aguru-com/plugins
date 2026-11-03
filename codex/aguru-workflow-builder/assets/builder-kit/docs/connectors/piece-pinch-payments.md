# Pinch Payments

Australian payment processing platform for direct debits, credit cards, and recurring payments. Create payers, process payments, manage subscriptions, and handle payment sources with comprehensive webhook support.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pinch-payments'
  version: '0.0.11'
```

Categories: PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect your Pinch Payments account
>
> This connector requires Pinch Payments API credentials. (Application ID and Secret Key)
>
> How to generate API keys:
> 1. Sign in to your Pinch Payments account at https://web.getpinch.com.au
> 2. Navigate to API Keys: https://web.getpinch.com.au/api-keys
> 3. Create an Application to generate API credentials
> 4. Copy your Application ID and Secret Key (either live or test depending on the environment)
>
> Authentication uses Basic Auth where:
> - Username: Your Application ID
> - Password: Your Secret Key

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Application ID. Your Application ID. |
| `password` | string | yes |  | Secret Key. Your Secret Key. |
| `environment` | string | yes |  | Environment. Pinch API environment to use. One of `"live"`, `"test"`. |

## Actions

### `create_or_update_payer`

**Create or Update Payer.** Creates or updates a Pinch Payments payer (a customer/contact who can be charged). Operates in two modes: pass an existing payer id to update that record, or omit it to create a new payer. Optionally attaches a payment source (bank account or credit card) via a capture-script token in the same call. First name and email are required. The update-by-id path is idempotent; omitting the id creates a new payer on each call. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payerId` | string | no |  | Payer. Select an existing payer to update, or leave empty to create a new one. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | yes |  | First Name. First name of the payer. |
| `lastName` | string | no |  | Last Name. Last name of the payer. |
| `emailAddress` | string | yes |  | Email Address. Email address of the payer. |
| `mobileNumber` | string | no |  | Mobile Number. Mobile phone number. |
| `companyName` | string | no |  | Company Name. Company name. |
| `companyRegistrationNumber` | string | no |  | Company Registration Number. Company registration number (ABN, etc.) |
| `streetAddress` | string | no |  | Street Address. Street address. |
| `suburb` | string | no |  | Suburb. Suburb or city. |
| `state` | string | no |  | State. State or territory. |
| `postcode` | string | no |  | Postcode. Postal code. |
| `country` | string | no |  | Country. Country. |
| `metadata` | string | no |  | Metadata. Custom metadata for the payer. |
| `addPaymentSource` | boolean | no | `false` | Add Payment Source. Add a payment source (bank account or credit card) to this payer. |
| `sourceType` | string | no |  | Source Type. Type of payment source. One of `"bank-account"`, `"credit-card"`. |
| `sourceToken` | string | no |  | Source Token. The token created by the Pinch capture script. |
| `ipAddress` | string | no |  | IP Address. IP address of the payer (for payment source) |

### `create_realtime_payment`

**Create Realtime Payment.** Charges a one-off real-time payment against a credit card or bank account in Pinch Payments. Bill either an existing payer (set Use Existing Payer and select the payer) or new payer details supplied inline. Amount is required and given in cents. Use when an agent needs to take an immediate payment rather than schedule one. Not idempotent: each call attempts a new charge; supply a nonce to guard against accidental double submissions. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payerId` | string | no |  | Payer. Select an existing payer for this payment. A value the product loads from the provider, such as an id; write the value itself. |
| `useExistingPayer` | boolean | no | `false` | Use Existing Payer. Check if you want to use an existing payer instead of creating a new one. |
| `fullName` | string | no |  | Full Name. Full name of the payer (use this OR First Name + Last Name) |
| `firstName` | string | no |  | First Name. First name of the payer (use this OR Full Name) |
| `lastName` | string | no |  | Last Name. Last name of the payer (use this OR Full Name) |
| `email` | string | no |  | Email. Email address of the payer. |
| `mobileNumber` | string | no |  | Mobile Number. Australian 10-digit mobile number (non-international) |
| `amount` | number | yes |  | Amount (cents). Payment amount in cents (e.g., $10.50 = 1050) |
| `applicationFee` | number | no |  | Application Fee (cents). Optional additional fee in cents (Managed Merchants Only) |
| `description` | string | no |  | Description. Optional description for the payment (visible to payer, max 1000 characters) |
| `sourceId` | string | no |  | Source ID. Existing payment source ID to use (leave empty to use default or create new source) |
| `token` | string | no |  | Payment Token. Credit card or bank account token from capture script (for new payment source) |
| `surcharge` | array | no |  | Surcharge Source Types. Select source types to surcharge (pass fees to customer) One of `"bank-account"`, `"credit-card"`. |
| `nonce` | string | no |  | Nonce. Optional one-time-use reference to prevent double submissions. |
| `metadata` | string | no |  | Metadata. Free text field for storing state or accounting integration data. |

### `add_source_to_payer`

**Add Source to Payer.** Adds a payment source (bank account or credit card) to an existing Pinch Payments payer. Two input modes: a capture-script token (works for both source types, IP address recommended) or manual bank-account details (account number, BSB, name — bank accounts only; credit cards must use a token). Requires the target payer id. Not idempotent: each call appends a new source to the payer. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payerId` | string | yes |  | Payer. Select the payer to add a payment source to. A value the product loads from the provider, such as an id; write the value itself. |
| `sourceType` | string | yes |  | Source Type. Type of payment source to add. One of `"bank-account"`, `"credit-card"`. |
| `useToken` | boolean | no | `true` | Use Token. Use a token from the capture script instead of manual bank account details. |
| `token` | string | no |  | Payment Token. The token created by the Pinch capture script (for both bank accounts and credit cards) |
| `ipAddress` | string | no |  | IP Address. IP address of the payer (required for token-based sources) |
| `bankAccountNumber` | string | no |  | Bank Account Number. The bank account number (only for manual bank account entry) |
| `bankAccountBsb` | string | no |  | BSB. The BSB (Bank-State-Branch) number (only for manual bank account entry) |
| `bankAccountName` | string | no |  | Account Name. The name on the bank account (only for manual bank account entry) |

### `create_or_update_scheduled_payment`

**Create or Update Scheduled Payment.** Schedules a future-dated payment for a payer in Pinch Payments, or updates an existing scheduled payment when a payment id is provided. Use this (not Create Realtime Payment) when the charge should be attempted on a specific transaction date rather than immediately. Requires payer, amount in cents, and a transaction date. The update-by-id path is idempotent; omitting the id creates a new scheduled payment on each call. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paymentId` | string | no |  | Payment ID. Enter an existing payment ID to update, or leave empty to create a new payment. |
| `payerId` | string | yes |  | Payer. Select the payer for this scheduled payment. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | yes |  | Amount (cents). Payment amount in cents (e.g., $10.50 = 1050) |
| `transactionDate` | ISO date-time string | yes |  | Transaction Date. The date to attempt the transaction. |
| `description` | string | no |  | Description. Optional description for the payment (visible to payer, max 1000 characters) |
| `sourceId` | string | no |  | Source ID. Optional: ID of the payment source to use. If omitted, the first valid source will be used. |
| `surcharge` | array | no |  | Surcharge Source Types. Select source types to surcharge (pass fees to customer) One of `"bank-account"`, `"credit-card"`. |
| `applicationFee` | number | no |  | Application Fee (cents). Optional additional fee in cents (Managed Merchants Only) |
| `nonce` | string | no |  | Nonce. Optional one-time-use reference to prevent double submissions. |

### `add_subscription`

**Add Subscription.** Creates a recurring subscription linking an existing Pinch Payments payer to an existing plan. Use when an agent needs to enroll a customer in ongoing/recurring billing. Requires a plan id and payer id; total amount is required only for percentage-based plans, and leaving the start date blank begins it immediately. Not idempotent: each call creates a new subscription. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planId` | string | yes |  | Plan. Select the plan for this subscription. A value the product loads from the provider, such as an id; write the value itself. |
| `payerId` | string | yes |  | Payer. Select the payer for this subscription. A value the product loads from the provider, such as an id; write the value itself. |
| `totalAmount` | number | no |  | Total Amount (cents). Required for percentage-based plans: total amount in cents (e.g., $100.00 = 10000) |
| `startDate` | ISO date-time string | no |  | Start Date. When the subscription should start. Leave blank for immediate start. |
| `sourceId` | string | no |  | Source ID. Optional: Specific payment source ID to use. If omitted, a source will be automatically selected. |
| `surcharge` | array | no |  | Surcharge Source Types. Select source types to surcharge (pass fees to customer) One of `"bank-account"`, `"credit-card"`. |

### `find_event`

**Find Event.** Retrieves a single Pinch Payments event by its event id (evt_ prefix). Use to look up the details of a specific webhook/notification event. Read-only and idempotent; requires a known event id (this does not list or search events). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventId` | string | yes |  | Event ID. The Event ID in evt_XXXXXXXXXXXXXX format. |

### `find_payer`

**Find Payer.** Retrieves a single Pinch Payments payer by their payer id (pyr_ prefix). Use to fetch a customer record when you already have its id. Read-only and idempotent; requires a known payer id (this does not search by name or email). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `payerId` | string | yes |  | Payer ID. The Payer ID in pyr_XXXXXXXXXXXXX format. |

### `find_subscription`

**Find Subscription.** Retrieves a single Pinch Payments subscription by its subscription id (sub_ prefix). Use to check the status or details of a known recurring subscription. Read-only and idempotent; requires a known subscription id (this does not list or search subscriptions). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. The Subscription ID in sub_XXXXXXXXXXXXXX format. |
