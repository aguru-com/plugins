# Cashfree Payments

Cashfree Payments integration for processing payments, refunds, and managing payment links and cashgrams.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cashfree-payments'
  version: '0.1.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect your Cashfree account
>
> This connector requires Cashfree API credentials (Client ID and Client Secret). Important: each Cashfree product is a separate product and requires its own credentials. For example, the Payments API and the Payouts API each need their own Client ID / Client Secret pairs.
>
> Create two connections (recommended)
> - For clarity and security we recommend creating two separate Activepieces connections:
> 1. **Payments connection** — use the Payments API Client ID / Client Secret. Use this connection for payments-related actions (create order, payment links, refunds, etc.).
> 2. **Payouts connection** — use the Payouts API Client ID / Client Secret. Use this connection for Cashgram and other payouts-related actions.
>
> Which keys to use
> - Payments API: use the credentials generated for the Payments product.
> - Payouts API (required by Cashgram actions): use credentials generated from the Payouts dashboard.
>
> How to generate API keys:
> 1. Sign in to your Cashfree account and open the *Payouts* dashboard.
> 2. In the navigation panel select **Developers**.
> 3. Click **API Keys**.
> 4. Click **Generate API Keys** on the API Keys screen.
> 5. The **New API Keys** popup displays the Client ID and Client Secret.
> 6. Click **Download API Keys** to save the keys locally. Keep these secret — do not share them.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | no |  | Cashfree Client ID. Your Cashfree Client ID. |
| `clientSecret` | string | no |  | Cashfree Client Secret. Your Cashfree Client Secret. |

## Actions

### `create-order`

**Create Order.** Creates a payment order in the Cashfree Payment Gateway (PG) given an amount, currency, and customer details, returning the order and its session for collecting payment. Use this to start a checkout/payment flow. Targets sandbox or production via the Environment prop; if no Order ID is supplied a unique one is auto-generated, so each call creates a distinct order and is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `orderAmount` | number | yes |  | Order Amount. Bill amount for the order. Provide up to two decimals (e.g., 10.15 means Rs 10 and 15 paisa) |
| `orderCurrency` | string | yes | `"INR"` | Order Currency. Currency for the order. One of `"INR"`, `"USD"`, `"EUR"`, `"GBP"`. |
| `customerId` | string | yes |  | Customer ID. A unique identifier for the customer. Use alphanumeric values only (3-50 characters) |
| `customerPhone` | string | yes |  | Customer Phone. Customer phone number (minimum 10 digits). For international numbers, prefix with +. |
| `customerEmail` | string | no |  | Customer Email. Customer email address (3-100 characters) |
| `customerName` | string | no |  | Customer Name. Name of the customer (3-100 characters) |
| `customerBankAccountNumber` | string | no |  | Customer Bank Account Number. Customer bank account. Required for TPV (Third Party Verification) (3-20 characters) |
| `customerBankIfsc` | string | no |  | Customer Bank IFSC. Customer bank IFSC. Required for TPV (Third Party Verification) |
| `customerBankCode` | number | no |  | Customer Bank Code. Customer bank code. Required for net banking payments with TPV. |
| `orderId` | string | no |  | Order ID. Order identifier in your system. Alphanumeric, "_" and "-" only (3-45 characters). Will be auto-generated if not provided. |
| `orderNote` | string | no |  | Order Note. Order note for reference (3-200 characters) |
| `orderExpiryTime` | string | no |  | Order Expiry Time. ISO 8601 format. Example: 2021-07-02T10:20:12+05:30. |
| `returnUrl` | string | no |  | Return URL. URL to redirect customer after payment completion (max 250 characters) |
| `notifyUrl` | string | no |  | Notify URL. HTTPS URL for server-to-server notifications (max 250 characters) |
| `paymentMethods` | string | no |  | Payment Methods. Comma-separated values: cc,dc,ccc,ppc,nb,upi,paypal,app,paylater,cardlessemi,dcemi,ccemi,banktransfer. |
| `cartName` | string | no |  | Cart Name. Name of the cart. |
| `customerNote` | string | no |  | Customer Note. Note from customer. |
| `shippingCharge` | number | no |  | Shipping Charge. Shipping charges for the order. |
| `shippingFullName` | string | no |  | Shipping - Full Name. Full name for shipping address. |
| `shippingCountry` | string | no |  | Shipping - Country. Country for shipping address. |
| `shippingCity` | string | no |  | Shipping - City. City for shipping address. |
| `shippingState` | string | no |  | Shipping - State. State for shipping address. |
| `shippingPincode` | string | no |  | Shipping - Pincode. Pincode for shipping address. |
| `shippingAddress1` | string | no |  | Shipping - Address Line 1. Primary address line for shipping. |
| `shippingAddress2` | string | no |  | Shipping - Address Line 2. Secondary address line for shipping. |
| `billingFullName` | string | no |  | Billing - Full Name. Full name for billing address. |
| `billingCountry` | string | no |  | Billing - Country. Country for billing address. |
| `billingCity` | string | no |  | Billing - City. City for billing address. |
| `billingState` | string | no |  | Billing - State. State for billing address. |
| `billingPincode` | string | no |  | Billing - Pincode. Pincode for billing address. |
| `billingAddress1` | string | no |  | Billing - Address Line 1. Primary address line for billing. |
| `billingAddress2` | string | no |  | Billing - Address Line 2. Secondary address line for billing. |
| `terminalType` | string | no |  | Terminal Type. Type of terminal (e.g., SPOS) for SoftPOS orders (4-10 characters) |
| `terminalId` | string | no |  | Terminal ID. Terminal ID for merchant reference (3-100 characters) |
| `terminalPhoneNo` | string | no |  | Terminal Phone Number. Mobile number of the terminal/agent/storefront. |
| `terminalName` | string | no |  | Terminal Name. Name of terminal/agent/storefront. |
| `terminalAddress` | string | no |  | Terminal Address. Location of terminal. |
| `terminalNote` | string | no |  | Terminal Note. Note given by merchant while creating the terminal. |
| `oneClickCheckoutEnabled` | boolean | no |  | Enable One Click Checkout. Enable One Click Checkout feature. |
| `verifyPayEnabled` | boolean | no |  | Enable Verify and Pay. Enable Verify and Pay feature. |
| `orderTags` | string | no |  | Order Tags. Custom tags as JSON object. Example: {"product":"Laptop","city":"Bangalore"}. Maximum 10 tags. |

### `create-payment-link`

**Create Payment Link.** Creates a shareable Cashfree payment link for a given amount, currency, and purpose that a customer can pay through, optionally sending it via SMS/email and supporting partial payments. Use this to collect payment without building a full checkout. Targets sandbox or production via the Environment prop; if no Link ID is supplied a unique one is auto-generated, so each call creates a new link and is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `linkAmount` | number | yes |  | Link Amount. Amount to be collected using this link. Provide up to two decimals for paise. |
| `linkCurrency` | string | yes | `"INR"` | Link Currency. Currency for the payment link. One of `"INR"`, `"USD"`, `"EUR"`, `"GBP"`. |
| `linkPurpose` | string | yes |  | Link Purpose. A brief description for which payment must be collected (max 500 characters) |
| `customerPhone` | string | yes |  | Customer Phone. Customer phone number (required) |
| `customerEmail` | string | no |  | Customer Email. Customer email address. |
| `customerName` | string | no |  | Customer Name. Customer name. |
| `customerBankAccountNumber` | string | no |  | Customer Bank Account Number. Customer bank account number. |
| `customerBankIfsc` | string | no |  | Customer Bank IFSC. Customer bank IFSC code. |
| `customerBankCode` | string | no |  | Customer Bank Code. Customer bank code for net banking. One of `3003`, `3005`, `3006`, `3010`, `3012`, `3016`, `3019`, `3020`, `3021`, `3022`, `3023`, `3024`, `3026`, `3027`, `3028`, `3029`, `3030`, `3031`, `3032`, `3033`, `7001`. |
| `linkId` | string | no |  | Link ID. Unique identifier for the link. Alphanumeric, "-" and "_" only (max 50 characters). Auto-generated if not provided. |
| `linkPartialPayments` | boolean | no |  | Enable Partial Payments. Allow customers to make partial payments for the link. |
| `linkMinimumPartialAmount` | number | no |  | Minimum Partial Amount. Minimum amount in first installment (required if partial payments enabled) |
| `linkExpiryTime` | string | no |  | Link Expiry Time. ISO 8601 format. Example: 2021-07-02T10:20:12+05:30. Default is 30 days. |
| `sendSms` | boolean | no |  | Send SMS Notification. Send SMS notification to customer phone. |
| `sendEmail` | boolean | no |  | Send Email Notification. Send email notification to customer email. |
| `linkAutoReminders` | boolean | no |  | Auto Reminders. Send automatic reminders to customers for payment collection. |
| `notifyUrl` | string | no |  | Notify URL. HTTPS URL for server-to-server notifications. |
| `returnUrl` | string | no |  | Return URL. URL to redirect user after payment completion (max 250 characters) |
| `upiIntent` | boolean | no |  | UPI Intent. Directly open UPI Intent flow on mobile devices. |
| `paymentMethods` | string | no |  | Payment Methods. Comma-separated values: cc,dc,ccc,ppc,nb,upi,paypal,app. Leave blank for all methods. |
| `linkNotes` | string | no |  | Link Notes. Key-value pairs as JSON. Maximum 5 key-value pairs. Example: {"key_1":"value_1","key_2":"value_2"}. |
| `orderSplits` | string | no |  | Order Splits. JSON array for Easy Split. Example: [{"vendor_id":"vendor1","amount":100}]. |

### `create-refund`

**Create Refund.** Initiates a refund against an existing Cashfree order, identified by its Order ID, for a specified refund amount (must not exceed the original transaction) and a caller-supplied Refund ID. Use this to return money to a customer for a completed payment; refunds are only allowed within six months of the original transaction. Each call moves money so it is not idempotent, though passing the same Refund ID (or the optional Idempotency Key header) lets Cashfree deduplicate retries. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `orderId` | string | yes |  | Order ID. The ID which uniquely identifies your order. |
| `refundAmount` | number | yes |  | Refund Amount. Amount to be refunded. Should be lesser than or equal to the transaction amount. (Decimals allowed) |
| `refundId` | string | yes |  | Refund ID. An unique ID to associate the refund with. Provide alphanumeric values (3-40 characters) |
| `refundNote` | string | no |  | Refund Note. A refund note for your reference (3-100 characters) |
| `refundSpeed` | string | no | `"STANDARD"` | Refund Speed. Speed at which the refund is processed. One of `"STANDARD"`, `"INSTANT"`. |
| `refundSplits` | string | no |  | Refund Splits. JSON array for vendor splits. Example: [{"vendor_id":"vendor1","amount":100},{"vendor_id":"vendor2","percentage":25}]. |
| `tags` | string | no |  | Custom Tags. Custom Tags in JSON format {"key":"value"}. Maximum 10 tags allowed. Example: {"refund_reason":"customer_request","processed_by":"admin"}. |
| `requestId` | string | no |  | Request ID. Request ID for the API call. Can be used to resolve tech issues. |
| `idempotencyKey` | string | no |  | Idempotency Key. UUID format idempotency key to avoid duplicate actions if request fails or times out. |

### `cancel-payment-link`

**Cancel Payment Link.** Cancels an existing Cashfree payment link, identified by its Link ID, so it can no longer be paid. Use this to revoke a link you previously issued. Only links in ACTIVE status can be cancelled (already-cancelled or paid links return a conflict). Cancelling an already-cancelled link has no further effect, but the operation mutates link state and is not treated as idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `linkId` | string | yes |  | Payment Link ID. The payment link ID that you want to cancel. Only ACTIVE links can be cancelled. |
| `requestId` | string | no |  | Request ID. Request ID for the API call. Can be used to resolve tech issues. |
| `idempotencyKey` | string | no |  | Idempotency Key. UUID format idempotency key to avoid duplicate actions if request fails or times out. |

### `fetch-payment-link-details`

**Fetch Payment Link Details.** Retrieves the full details and current status of a single Cashfree payment link identified by its Link ID. Use this to check whether a link is active, expired, or paid, or to read back its configuration. Read-only lookup, so it is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `linkId` | string | yes |  | Payment Link ID. The payment link ID for which you want to view the details. |
| `requestId` | string | no |  | Request ID. Request ID for the API call. Can be used to resolve tech issues. |
| `idempotencyKey` | string | no |  | Idempotency Key. UUID format idempotency key for request deduplication. |

### `create-cashgram`

**Create Cashgram.** Creates a Cashfree Payout "Cashgram" — a shareable link that lets a contact claim a money transfer for a given amount — addressed to a name and phone, with an expiry within 30 days. Use this to disburse funds without knowing the recipient bank details. Each call creates a new payout keyed on the caller-supplied Cashgram ID (a duplicate ID returns a conflict), and it moves money, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `cashgramId` | string | yes |  | Cashgram ID. Unique ID of the Cashgram. Alphanumeric, underscore (_), and hyphen (-) allowed (35 character limit) |
| `amount` | number | yes |  | Amount. Amount to be transferred (minimum 1.00) |
| `name` | string | yes |  | Contact Name. Name of the contact. |
| `phone` | string | yes |  | Phone Number. Phone number of the contact. |
| `linkExpiry` | string | yes |  | Link Expiry Date. Date to expire the cashgram link. Format: YYYY/MM/DD (maximum 30 days from creation) |
| `email` | string | no |  | Email. Email of the contact. |
| `remarks` | string | no |  | Remarks. Specify remarks, if any. |
| `notifyCustomer` | boolean | no | `true` | Notify Customer. If enabled, a link is sent to customer phone and email. |

### `get-orders-for-payment-link`

**Get Orders for Payment Link.** Lists the orders associated with a Cashfree payment link, identified by its Link ID, along with summary totals. Use this to see who paid a link and reconcile collections. The Order Status Filter selects between all orders or paid-only (the default); read-only listing, so it is idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `linkId` | string | yes |  | Payment Link ID. The payment link ID for which you want to view the order details. |
| `status` | string | no | `"PAID"` | Order Status Filter. Filter orders by status (default is PAID) One of `"ALL"`, `"PAID"`. |
| `requestId` | string | no |  | Request ID. Request ID for the API call. Can be used to resolve tech issues. |
| `idempotencyKey` | string | no |  | Idempotency Key. UUID format idempotency key for request deduplication. |

### `get-all-refunds-for-order`

**Get All Refunds for Order.** Lists all refunds processed against a Cashfree order, identified by its Order ID, with summary totals and per-refund status. Use this to check refund progress or reconcile refunds for an order. Read-only listing, so it is idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `orderId` | string | yes |  | Order ID. The ID which uniquely identifies your order. |
| `requestId` | string | no |  | Request ID. Request ID for the API call. Can be used to resolve tech issues. |
| `idempotencyKey` | string | no |  | Idempotency Key. UUID format idempotency key for request deduplication. |

### `deactivate-cashgram`

**Deactivate Cashgram.** Deactivates an existing Cashfree Payout Cashgram, identified by its Cashgram ID, so the recipient can no longer redeem it. Use this to revoke a money-transfer link you previously created. Deactivating an already-deactivated Cashgram returns a conflict; the operation mutates payout state and is not treated as idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"sandbox"` | Environment. Choose the environment for API calls. One of `"sandbox"`, `"production"`. |
| `cashgramId` | string | yes |  | Cashgram ID. ID of the Cashgram to be deactivated. Alphanumeric and underscore (_) allowed (35 character limit) |
