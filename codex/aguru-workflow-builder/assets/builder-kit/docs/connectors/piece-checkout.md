# Checkout.com

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-checkout'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Secret Key

> Your Checkout.com secret key. Use sandbox key (sk_sbox_...) for testing or production key (sk_...) for live transactions. You can find it in the Checkout.com dashboard under Developers > API keys.

## Actions

### `create_customer`

**Create Customer.** Creates a new Checkout.com customer record from an email (required) plus optional name, phone, metadata, and a default payment instrument, so the customer can be referenced in later payments. Choose it to register a payer before charging them or saving their card. Not idempotent: each call creates a separate customer even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The customer's email address. |
| `name` | string | no |  | Name. The customer's name. |
| `phone_country_code` | string | no |  | Phone Country Code. The international country calling code (e.g., +1, +44). Required if phone number is provided. |
| `phone_number` | string | no |  | Phone Number. The phone number (6-25 characters). Required if country code is provided. |
| `metadata` | object | no |  | Metadata. Additional information about the customer. Maximum 10 key-value pairs, each up to 100 characters. |
| `default` | string | no |  | Default Instrument ID. The ID of the payment instrument to set as this customer's default. |

### `update_customer`

**Update Customer.** Updates an existing Checkout.com customer identified by customer ID, changing supplied fields such as email, name, phone, default instrument, or metadata (metadata replaces any existing values rather than merging). Choose it to amend a known customer rather than create one. Idempotent: applying the same field values to the same customer ID yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. The ID of the customer to update (e.g., cus_y3oqhf46pyzuxjocn2giaqnb44) |
| `email` | string | no |  | Email. The customer's email address. |
| `name` | string | no |  | Name. The customer's name. |
| `phone_country_code` | string | no |  | Phone Country Code. The international country calling code (e.g., +1, +44). Required if phone number is provided. |
| `phone_number` | string | no |  | Phone Number. The phone number (6-25 characters). Required if country code is provided. |
| `metadata` | object | no |  | Metadata. Additional information about the customer. Will replace any existing metadata. |
| `default` | string | no |  | Default Instrument ID. The ID of this customer's default instrument. |

### `create_payment_link`

**Create Payment Link.** Creates a hosted Checkout.com Payment Link for a given amount, currency, billing country, and processing channel that a customer can open to enter their details and pay, optionally restricting payment methods, attaching products, customer, and shipping info. Choose it when you need a shareable pay-by-link page rather than charging a card directly. Not idempotent: each call generates a new payment link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. The payment amount in minor units (e.g., cents for USD) |
| `currency` | string | yes |  | Currency. The three-letter ISO currency code (e.g., USD, EUR) |
| `reference` | string | no |  | Reference. A reference to identify the payment (e.g., order number) |
| `description` | string | no |  | Description. A description of the payment. |
| `billing_country` | string | yes |  | Billing Country. The two-letter ISO country code (e.g., US, GB) |
| `billing_address_line1` | string | no |  | Billing Address Line 1. The first line of the billing address. |
| `billing_address_line2` | string | no |  | Billing Address Line 2. The second line of the billing address. |
| `billing_city` | string | no |  | Billing City. The billing address city. |
| `billing_state` | string | no |  | Billing State. The state or province (ISO 3166-2 code) |
| `billing_zip` | string | no |  | Billing ZIP. The billing address zip or postal code. |
| `billing_phone_country_code` | string | no |  | Billing Phone Country Code. The international country calling code (e.g., +1) |
| `billing_phone_number` | string | no |  | Billing Phone Number. The phone number (6-25 characters) |
| `customer_email` | string | no |  | Customer Email. The customer's email address. |
| `customer_name` | string | no |  | Customer Name. The customer's name. |
| `customer_phone_country_code` | string | no |  | Customer Phone Country Code. The international country calling code (e.g., +1) |
| `customer_phone_number` | string | no |  | Customer Phone Number. The customer's phone number. |
| `expires_in` | number | no |  | Expires In (seconds). Time for which the link remains valid (default: 86400) |
| `display_name` | string | no |  | Display Name. The merchant name to display to customers on the checkout page. |
| `return_url` | string | no |  | Return URL. URL to redirect customer after successful payment. |
| `locale` | string | no |  | Locale. Language and region for the payment page. One of `"en-GB"`, `"ar"`, `"da-DK"`, `"de-DE"`, `"el"`, `"es-ES"`, `"fi-FI"`, `"fil-PH"`, `"fr-FR"`, `"hi-IN"`, `"id-ID"`, `"it-IT"`, `"ja-JP"`, `"ms-MY"`, `"nb-NO"`, `"nl-NL"`, `"pt-PT"`, `"sv-SE"`, `"th-TH"`, `"vi-VN"`, `"zh-CN"`, `"zh-HK"`, `"zh-TW"`. |
| `allow_payment_methods` | array | no |  | Allow Payment Methods. Specific payment methods to present to customers. One of `"card"`, `"paypal"`, `"applepay"`, `"googlepay"`, `"klarna"`, `"alipay_cn"`, `"bancontact"`, `"ideal"`, `"sepa"`, `"benefit"`, `"knet"`, `"stcpay"`, `"tabby"`, `"tamara"`. |
| `disabled_payment_methods` | array | no |  | Disabled Payment Methods. Payment methods to NOT present to customers. One of `"card"`, `"paypal"`, `"applepay"`, `"googlepay"`, `"klarna"`, `"alipay_cn"`, `"bancontact"`, `"ideal"`, `"sepa"`, `"benefit"`, `"knet"`, `"stcpay"`, `"tabby"`, `"tamara"`. |
| `products` | array | no |  | Products. Details about the products in the order. Each item: { `name`, `quantity`, `price`, `reference`? }. |
| `shipping_country` | string | no |  | Shipping Country. The two-letter ISO country code for shipping. |
| `shipping_address_line1` | string | no |  | Shipping Address Line 1. The first line of the shipping address. |
| `shipping_address_line2` | string | no |  | Shipping Address Line 2. The second line of the shipping address. |
| `shipping_city` | string | no |  | Shipping City. The shipping address city. |
| `shipping_state` | string | no |  | Shipping State. The state or province for shipping. |
| `shipping_zip` | string | no |  | Shipping ZIP. The shipping address zip or postal code. |
| `payment_type` | string | no |  | Payment Type. Type of payment for card transactions. One of `"Regular"`, `"Recurring"`. |
| `processing_channel_id` | string | yes |  | Processing Channel ID. The processing channel to be used for the payment. Find this in your Checkout.com dashboard under Settings > Processing Channels. Format: pc_xxxxxxxxxxxxxxxxxxxxxxxxxx. |
| `capture` | boolean | no |  | Capture Payment. Whether to capture the payment immediately. |
| `enable_3ds` | boolean | no |  | Enable 3D Secure. Whether to process as 3D Secure payment. |
| `challenge_3ds` | string | no |  | 3DS Challenge Preference. Preference for 3DS challenge. One of `"no_preference"`, `"no_challenge_requested"`, `"challenge_requested"`. |
| `metadata` | object | no |  | Metadata. Additional key-value pairs for transaction information. |

### `create_payment`

**Create Payment.** Submits a payment to Checkout.com for a given currency and amount, drawing from one of several source types selected by the source type field: raw card details, a saved customer ID, a token, or a stored instrument. Choose it to actually charge a payer (or run a zero-amount card verification), as opposed to generating a shareable link. Supports capture, 3D Secure, and risk options. Not idempotent: each call initiates a new payment and moves money. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currency` | string | yes |  | Currency. The three-letter ISO currency code (e.g., USD, EUR) |
| `amount` | number | no |  | Amount. The payment amount in minor units (e.g., cents for USD). Use 0 for card verification. |
| `reference` | string | no |  | Reference. Your reference for the payment (e.g., order number) |
| `description` | string | no |  | Description. A description of the payment. |
| `source_type` | string | yes |  | Payment Source Type. The type of payment source. One of `"card"`, `"customer"`, `"token"`, `"instrument"`. |
| `card_number` | string | no |  | Card Number. The card number (without separators). Required for card payments. |
| `expiry_month` | number | no |  | Expiry Month. The expiry month of the card (1-12) |
| `expiry_year` | number | no |  | Expiry Year. The expiry year of the card (4 digits) |
| `cvv` | string | no |  | CVV. The card verification code (3-4 digits) |
| `cardholder_name` | string | no |  | Cardholder Name. The name of the cardholder. |
| `customer_id` | string | no |  | Customer ID. The customer ID (for customer source type, e.g., cus_y3oqhf46pyzuxjocn2giaqnb44) |
| `token_id` | string | no |  | Token ID. The token ID (for token source type) |
| `instrument_id` | string | no |  | Instrument ID. The instrument ID (for instrument source type) |
| `billing_address_line1` | string | no |  | Billing Address Line 1. The first line of the billing address. |
| `billing_address_line2` | string | no |  | Billing Address Line 2. The second line of the billing address. |
| `billing_city` | string | no |  | Billing City. The billing city. |
| `billing_state` | string | no |  | Billing State. The billing state or province. |
| `billing_zip` | string | no |  | Billing ZIP. The billing ZIP or postal code. |
| `billing_country` | string | no |  | Billing Country. The two-letter ISO country code. |
| `billing_phone_country_code` | string | no |  | Billing Phone Country Code. The international country calling code (e.g., +1) |
| `billing_phone_number` | string | no |  | Billing Phone Number. The phone number (6-25 characters) |
| `account_holder_first_name` | string | no |  | Account Holder First Name. The first name of the account holder. |
| `account_holder_last_name` | string | no |  | Account Holder Last Name. The last name of the account holder. |
| `account_holder_middle_name` | string | no |  | Account Holder Middle Name. The middle name of the account holder. |
| `customer_email` | string | no |  | Customer Email. The customer's email address. |
| `customer_name` | string | no |  | Customer Name. The customer's name. |
| `customer_phone_country_code` | string | no |  | Customer Phone Country Code. The international country calling code. |
| `customer_phone_number` | string | no |  | Customer Phone Number. The customer's phone number. |
| `shipping_first_name` | string | no |  | Shipping First Name. The first name for shipping. |
| `shipping_last_name` | string | no |  | Shipping Last Name. The last name for shipping. |
| `shipping_email` | string | no |  | Shipping Email. The email for shipping notifications. |
| `shipping_address_line1` | string | no |  | Shipping Address Line 1. The first line of the shipping address. |
| `shipping_address_line2` | string | no |  | Shipping Address Line 2. The second line of the shipping address. |
| `shipping_city` | string | no |  | Shipping City. The shipping city. |
| `shipping_state` | string | no |  | Shipping State. The shipping state or province. |
| `shipping_zip` | string | no |  | Shipping ZIP. The shipping ZIP or postal code. |
| `shipping_country` | string | no |  | Shipping Country. The two-letter ISO country code for shipping. |
| `payment_type` | string | no |  | Payment Type. The type of payment. One of `"Regular"`, `"Recurring"`, `"MOTO"`, `"Installment"`, `"PayLater"`, `"Unscheduled"`. |
| `capture` | boolean | no |  | Capture Payment. Whether to capture the payment immediately. |
| `authorization_type` | string | no |  | Authorization Type. The type of authorization. One of `"Final"`, `"Estimated"`. |
| `enable_3ds` | boolean | no |  | Enable 3D Secure. Whether to process as 3D Secure payment. |
| `challenge_3ds` | string | no |  | 3DS Challenge Preference. Preference for 3DS challenge. One of `"no_preference"`, `"no_challenge_requested"`, `"challenge_requested"`, `"challenge_requested_mandate"`. |
| `allow_3ds_upgrade` | boolean | no |  | Allow 3DS Upgrade. Process as 3DS if soft declined due to 3DS authentication required. |
| `enable_risk_assessment` | boolean | no |  | Enable Risk Assessment. Whether to perform risk assessment. |
| `customer_ip` | string | no |  | Customer IP Address. The customer's IP address (IPv4 or IPv6) |
| `processing_channel_id` | string | no |  | Processing Channel ID. The processing channel to use for the payment. |
| `previous_payment_id` | string | no |  | Previous Payment ID. Link to existing payment series (for recurring payments) |
| `success_url` | string | no |  | Success URL. Success redirect URL for redirect payment methods. |
| `failure_url` | string | no |  | Failure URL. Failure redirect URL for redirect payment methods. |
| `metadata` | object | no |  | Metadata. Additional key-value pairs for transaction information. |

### `refund_payment`

**Refund a Payment.** Refunds a captured Checkout.com payment, fully (omit amount) or partially (specify amount in minor units), with optional split allocations to sub-entities, line items, and a bank-account destination for methods like giropay/EPS. Requires the payment ID, resolved from an order reference. Choose it to return funds to a payer. Not idempotent: each call issues a separate refund and moves money. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reference` | string | yes |  | Reference. A reference, such as an order ID, that can be used to identify the payment. |
| `payment_id` | string | yes |  | Payment ID. Select the payment to refund. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | no |  | Refund Amount. The amount to refund in minor units. If not specified, full payment amount will be refunded. |
| `refund_reference` | string | no |  | Refund Reference. Your reference for the refund (max 80 chars, 30 for Amex, 50 for TWINT) |
| `capture_action_id` | string | no |  | Capture Action ID. The action ID of the capture to refund (only for PayPal and Riverty) |
| `amount_allocations` | array | no |  | Amount Allocations. Split refund allocations for sub-entities. Each item: { `id`, `amount`, `reference`?, `commission_amount`?, `commission_percentage`? }. |
| `items` | array | no |  | Line Items. Order line items for the refund. Each item: { `type`?, `name`?, `quantity`?, `unit_price`?, `reference`?, `total_amount`?, `tax_rate`?, `tax_amount`?, `discount_amount`?, `url`?, `image_url`? }. |
| `destination_country` | string | no |  | Destination Country. Two-letter ISO country code for bank account (required for giropay/EPS) |
| `destination_account_number` | string | no |  | Account Number. The bank account number. |
| `destination_bank_code` | string | no |  | Bank Code. The code that identifies the bank. |
| `destination_iban` | string | no |  | IBAN. International Bank Account Number. |
| `destination_swift_bic` | string | no |  | SWIFT BIC. 8 or 11-digit code identifying the bank. |
| `account_holder_first_name` | string | no |  | Account Holder First Name. The account holder's first name. |
| `account_holder_last_name` | string | no |  | Account Holder Last Name. The account holder's last name. |
| `account_holder_type` | string | no |  | Account Holder Type. The type of account holder. One of `"individual"`, `"corporate"`, `"government"`. |
| `account_holder_company_name` | string | no |  | Company Name. Company name for corporate account holders. |
| `account_holder_email` | string | no |  | Account Holder Email. The account holder's email address. |
| `account_holder_phone_country_code` | string | no |  | Phone Country Code. International country calling code. |
| `account_holder_phone_number` | string | no |  | Phone Number. The account holder's phone number. |
| `account_holder_address_line1` | string | no |  | Address Line 1. First line of the account holder's address. |
| `account_holder_address_line2` | string | no |  | Address Line 2. Second line of the account holder's address. |
| `account_holder_city` | string | no |  | City. Account holder's city. |
| `account_holder_state` | string | no |  | State. Account holder's state or province. |
| `account_holder_zip` | string | no |  | ZIP Code. Account holder's ZIP or postal code. |
| `account_holder_country` | string | no |  | Country. Two-letter ISO country code. |
| `bank_name` | string | no |  | Bank Name. The name of the bank. |
| `bank_branch` | string | no |  | Bank Branch. The name of the bank branch. |
| `bank_address_line1` | string | no |  | Bank Address Line 1. First line of the bank's address. |
| `bank_address_line2` | string | no |  | Bank Address Line 2. Second line of the bank's address. |
| `bank_city` | string | no |  | Bank City. The bank's city. |
| `bank_country` | string | no |  | Bank Country. Two-letter ISO country code for the bank. |
| `metadata` | object | no |  | Metadata. Additional key-value pairs for the refund request. |

### `get_payment_details`

**Get Payment Details.** Retrieves the full details of a single Checkout.com payment by its payment ID (resolved from an order reference), including amount and status. Choose it to inspect a transaction, for example to verify it is captured before issuing a refund. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reference` | string | yes |  | Reference. A reference, such as an order ID, that can be used to identify the payment. |
| `paymentId` | string | yes |  | Payment ID. Select the payment to get details for. A value the product loads from the provider, such as an id; write the value itself. |

### `get_payment_actions`

**Get Payment Actions.** Retrieves the list of actions (authorization, capture, refund, void, etc.) that have occurred on a single Checkout.com payment, identified by its payment ID (resolved from an order reference). Choose it to reconstruct a transaction's lifecycle for audit or status tracking. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reference` | string | yes |  | Reference. A reference, such as an order ID, that can be used to identify the payment. |
| `paymentId` | string | yes |  | Payment ID. Select the payment to get actions for. A value the product loads from the provider, such as an id; write the value itself. |
