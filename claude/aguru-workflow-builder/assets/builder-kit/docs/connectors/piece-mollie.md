# Mollie

Automate Mollie payments, orders, refunds, customers, and invoices. Triggers on payment events and statuses.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mollie'
  version: '0.1.6'
```

Categories: PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your Mollie API key (starts with live_ or test_)

## Actions

### `create_order`

**Create Order.** Creates a new order in Mollie via the legacy Orders API, with required order lines and a billing address. Use only when an integration specifically needs the deprecated Orders API; for new payment flows prefer Create Payment or Create Payment Link instead. Not idempotent: each call creates a separate order even with an identical order number. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderNumber` | string | yes |  | Order Number. The order number for this order. We recommend each order number to be unique. |
| `currency` | string | yes | `"EUR"` | Currency. A three-character ISO 4217 currency code (e.g. EUR, USD) |
| `amount` | string | yes |  | Total Amount. The total amount to charge (e.g. "10.00") |
| `lines` | array | yes |  | Order Lines. The order lines for the order. Each item: { `type`?, `name`, `quantity`, `unitPriceCurrency`, `unitPriceValue`, `totalAmountCurrency`, `totalAmountValue`, `vatRate`?, `vatAmountCurrency`?, `vatAmountValue`?, `sku`?, `discountAmountCurrency`?, `discountAmountValue`?, `imageUrl`?, `productUrl`?, `category`? }. |
| `billingTitle` | string | no |  | Billing Title. The title of the person (e.g. Mr., Mrs.) |
| `billingGivenName` | string | yes |  | Billing Given Name. The given name (first name) of the person. |
| `billingFamilyName` | string | yes |  | Billing Family Name. The family name (surname) of the person. |
| `billingOrganizationName` | string | no |  | Billing Organization Name. The name of the organization. |
| `billingStreetAndNumber` | string | yes |  | Billing Street and Number. A street and street number. |
| `billingStreetAdditional` | string | no |  | Billing Street Additional. Any additional addressing details. |
| `billingPostalCode` | string | yes |  | Billing Postal Code. A postal code. |
| `billingEmail` | string | yes |  | Billing Email. Email address. |
| `billingPhone` | string | no |  | Billing Phone. Phone number in E.164 format. |
| `billingCity` | string | yes |  | Billing City. City name. |
| `billingRegion` | string | no |  | Billing Region. Region or state. |
| `billingCountry` | string | yes |  | Billing Country. A country code in ISO 3166-1 alpha-2 format. |
| `includeShippingAddress` | boolean | no | `false` | Include Shipping Address. Whether to include a separate shipping address. |
| `shippingTitle` | string | no |  | Shipping Title. The title of the person (e.g. Mr., Mrs.) |
| `shippingGivenName` | string | no |  | Shipping Given Name. The given name (first name) of the person. |
| `shippingFamilyName` | string | no |  | Shipping Family Name. The family name (surname) of the person. |
| `shippingOrganizationName` | string | no |  | Shipping Organization Name. The name of the organization. |
| `shippingStreetAndNumber` | string | no |  | Shipping Street and Number. A street and street number. |
| `shippingStreetAdditional` | string | no |  | Shipping Street Additional. Any additional addressing details. |
| `shippingPostalCode` | string | no |  | Shipping Postal Code. A postal code. |
| `shippingEmail` | string | no |  | Shipping Email. Email address. |
| `shippingPhone` | string | no |  | Shipping Phone. Phone number in E.164 format. |
| `shippingCity` | string | no |  | Shipping City. City name. |
| `shippingRegion` | string | no |  | Shipping Region. Region or state. |
| `shippingCountry` | string | no |  | Shipping Country. A country code in ISO 3166-1 alpha-2 format. |
| `locale` | string | yes | `"en_US"` | Locale. The language to be used in the hosted payment pages. One of `"en_US"`, `"en_GB"`, `"nl_NL"`, `"nl_BE"`, `"de_DE"`, `"de_AT"`, `"de_CH"`, `"fr_FR"`, `"fr_BE"`, `"es_ES"`, `"ca_ES"`, `"pt_PT"`, `"it_IT"`, `"nb_NO"`, `"sv_SE"`, `"fi_FI"`, `"da_DK"`, `"is_IS"`, `"hu_HU"`, `"pl_PL"`, `"lv_LV"`, `"lt_LT"`. |
| `redirectUrl` | string | no |  | Redirect URL. The URL your customer will be redirected to after the payment process. |
| `cancelUrl` | string | no |  | Cancel URL. The URL your customer will be redirected to when they cancel the payment. |
| `webhookUrl` | string | no |  | Webhook URL. The webhook URL where order status updates will be sent. |
| `method` | string | no |  | Payment Method. Specific payment method to use (optional) One of `"applepay"`, `"bancomatpay"`, `"bancontact"`, `"banktransfer"`, `"belfius"`, `"billie"`, `"creditcard"`, `"directdebit"`, `"eps"`, `"giftcard"`, `"ideal"`, `"in3"`, `"kbc"`, `"klarna"`, `"klarnapaylater"`, `"klarnapaynow"`, `"klarnasliceit"`, `"mybank"`, `"paypal"`, `"paysafecard"`, `"przelewy24"`, `"riverty"`, `"satispay"`, `"trustly"`, `"twint"` and 1 more. |
| `shopperCountryMustMatchBillingCountry` | boolean | no |  | Shopper Country Must Match Billing Country. Restrict payment methods to those from the billing country only. |
| `expiresAt` | string | no |  | Expires At. The date the order should expire in YYYY-MM-DD format. |
| `consumerDateOfBirth` | ISO date-time string | no |  | Consumer Date of Birth. The date of birth of the consumer in YYYY-MM-DD format. |
| `testmode` | boolean | no | `false` | Test Mode. Whether to create the order in test mode. |

### `create_payment_link`

**Create Payment Link.** Creates a shareable Mollie payment link a customer can open to pay. Can carry a fixed amount, an open/minimum amount the customer fills in, and can be one-off or reusable for multiple payments. Choose this for sending a checkout URL (invoice, donation, manual collection) rather than driving a redirect-based checkout in code. Not idempotent: each call creates a new link. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. A short description of the payment link (max 255 characters) |
| `includeAmount` | boolean | no | `true` | Include Fixed Amount. Whether to include a fixed amount or let customer enter amount. |
| `currency` | string | no | `"EUR"` | Currency. A three-character ISO 4217 currency code (e.g. EUR, USD) |
| `amount` | string | no |  | Amount. The amount to charge (e.g. "10.00") |
| `includeMinimumAmount` | boolean | no | `false` | Include Minimum Amount. Whether to set a minimum amount (only when no fixed amount) |
| `minimumAmountCurrency` | string | no | `"EUR"` | Minimum Amount Currency. Currency for minimum amount. |
| `minimumAmount` | string | no |  | Minimum Amount. The minimum amount (e.g. "5.00") |
| `redirectUrl` | string | no |  | Redirect URL. URL to redirect customer after payment completion. |
| `webhookUrl` | string | no |  | Webhook URL. URL for payment status updates. |
| `includeLines` | boolean | no | `false` | Include Order Lines. Whether to include detailed order line items. |
| `lines` | array | no |  | Order Lines. Order line items (required for certain payment methods) Each item: { `type`?, `description`, `quantity`, `quantityUnit`?, `unitPriceCurrency`, `unitPriceValue`, `totalAmountCurrency`, `totalAmountValue`, `vatRate`?, `vatAmountCurrency`?, `vatAmountValue`?, `sku`?, `discountAmountCurrency`?, `discountAmountValue`?, `imageUrl`?, `productUrl`? }. |
| `includeBillingAddress` | boolean | no | `false` | Include Billing Address. Whether to include billing address details. |
| `billingTitle` | string | no |  | Billing Title. Title (e.g. Mr., Mrs.) |
| `billingGivenName` | string | no |  | Billing Given Name. First name. |
| `billingFamilyName` | string | no |  | Billing Family Name. Last name. |
| `billingOrganizationName` | string | no |  | Billing Organization. Organization name. |
| `billingStreetAndNumber` | string | no |  | Billing Street and Number. Street address with number. |
| `billingStreetAdditional` | string | no |  | Billing Street Additional. Additional address details. |
| `billingPostalCode` | string | no |  | Billing Postal Code. Postal code. |
| `billingEmail` | string | no |  | Billing Email. Email address. |
| `billingPhone` | string | no |  | Billing Phone. Phone in E.164 format. |
| `billingCity` | string | no |  | Billing City. City name. |
| `billingRegion` | string | no |  | Billing Region. State or region. |
| `billingCountry` | string | no |  | Billing Country. ISO 3166-1 alpha-2 country code. |
| `includeShippingAddress` | boolean | no | `false` | Include Shipping Address. Whether to include shipping address details. |
| `shippingTitle` | string | no |  | Shipping Title. Title (e.g. Mr., Mrs.) |
| `shippingGivenName` | string | no |  | Shipping Given Name. First name. |
| `shippingFamilyName` | string | no |  | Shipping Family Name. Last name. |
| `shippingOrganizationName` | string | no |  | Shipping Organization. Organization name. |
| `shippingStreetAndNumber` | string | no |  | Shipping Street and Number. Street address with number. |
| `shippingStreetAdditional` | string | no |  | Shipping Street Additional. Additional address details. |
| `shippingPostalCode` | string | no |  | Shipping Postal Code. Postal code. |
| `shippingEmail` | string | no |  | Shipping Email. Email address. |
| `shippingPhone` | string | no |  | Shipping Phone. Phone in E.164 format. |
| `shippingCity` | string | no |  | Shipping City. City name. |
| `shippingRegion` | string | no |  | Shipping Region. State or region. |
| `shippingCountry` | string | no |  | Shipping Country. ISO 3166-1 alpha-2 country code. |
| `reusable` | boolean | no | `false` | Reusable. Allow multiple payments using the same link. |
| `expiresAt` | string | no |  | Expires At. Expiry date in ISO 8601 format (e.g. 2024-12-31T23:59:59Z) |
| `allowedMethods` | array | no |  | Allowed Payment Methods. Payment methods allowed for this link (empty = all enabled methods) Values the product loads from the provider, such as ids; write an array of them. |
| `sequenceType` | string | no | `"oneoff"` | Sequence Type. Type of payment sequence. One of `"oneoff"`, `"first"`. |
| `customerId` | string | no |  | Customer ID. Customer ID (only relevant for first sequence type) |
| `testmode` | boolean | no | `false` | Test Mode. Whether to create the payment link in test mode. |

### `create_payment`

**Create Payment.** Creates a payment in Mollie and returns a hosted checkout URL the customer is redirected to; a redirect URL is required. Supports one-off, first (to set up a mandate), and recurring sequences — recurring requires a customer ID and mandate. This is the recommended way to collect a payment. Not idempotent: each call creates a new payment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. Description of the payment (max 255 characters) |
| `currency` | string | yes | `"EUR"` | Currency. A three-character ISO 4217 currency code (e.g. EUR, USD) |
| `amount` | string | yes |  | Amount. The amount to charge (e.g. "10.00") |
| `redirectUrl` | string | yes |  | Redirect URL. URL to redirect customer after payment completion. |
| `cancelUrl` | string | no |  | Cancel URL. URL to redirect customer when they cancel payment. |
| `webhookUrl` | string | no |  | Webhook URL. URL for payment status updates. |
| `includeLines` | boolean | no | `false` | Include Order Lines. Whether to include detailed order line items. |
| `lines` | array | no |  | Order Lines. Order line items (required for certain payment methods) Each item: { `type`?, `description`, `quantity`, `quantityUnit`?, `unitPriceCurrency`, `unitPriceValue`, `totalAmountCurrency`, `totalAmountValue`, `vatRate`?, `vatAmountCurrency`?, `vatAmountValue`?, `sku`?, `discountAmountCurrency`?, `discountAmountValue`?, `imageUrl`?, `productUrl`? }. |
| `includeBillingAddress` | boolean | no | `false` | Include Billing Address. Whether to include billing address details. |
| `billingTitle` | string | no |  | Billing Title. Title (e.g. Mr., Mrs.) |
| `billingGivenName` | string | no |  | Billing Given Name. First name. |
| `billingFamilyName` | string | no |  | Billing Family Name. Last name. |
| `billingOrganizationName` | string | no |  | Billing Organization. Organization name. |
| `billingStreetAndNumber` | string | no |  | Billing Street and Number. Street address with number. |
| `billingStreetAdditional` | string | no |  | Billing Street Additional. Additional address details. |
| `billingPostalCode` | string | no |  | Billing Postal Code. Postal code. |
| `billingEmail` | string | no |  | Billing Email. Email address. |
| `billingPhone` | string | no |  | Billing Phone. Phone in E.164 format. |
| `billingCity` | string | no |  | Billing City. City name. |
| `billingRegion` | string | no |  | Billing Region. State or region. |
| `billingCountry` | string | no |  | Billing Country. ISO 3166-1 alpha-2 country code. |
| `includeShippingAddress` | boolean | no | `false` | Include Shipping Address. Whether to include shipping address details. |
| `shippingTitle` | string | no |  | Shipping Title. Title (e.g. Mr., Mrs.) |
| `shippingGivenName` | string | no |  | Shipping Given Name. First name. |
| `shippingFamilyName` | string | no |  | Shipping Family Name. Last name. |
| `shippingOrganizationName` | string | no |  | Shipping Organization. Organization name. |
| `shippingStreetAndNumber` | string | no |  | Shipping Street and Number. Street address with number. |
| `shippingStreetAdditional` | string | no |  | Shipping Street Additional. Additional address details. |
| `shippingPostalCode` | string | no |  | Shipping Postal Code. Postal code. |
| `shippingEmail` | string | no |  | Shipping Email. Email address. |
| `shippingPhone` | string | no |  | Shipping Phone. Phone in E.164 format. |
| `shippingCity` | string | no |  | Shipping City. City name. |
| `shippingRegion` | string | no |  | Shipping Region. State or region. |
| `shippingCountry` | string | no |  | Shipping Country. ISO 3166-1 alpha-2 country code. |
| `locale` | string | no |  | Locale. The language to be used in the hosted payment pages. One of `"en_US"`, `"en_GB"`, `"nl_NL"`, `"nl_BE"`, `"de_DE"`, `"de_AT"`, `"de_CH"`, `"fr_FR"`, `"fr_BE"`, `"es_ES"`, `"ca_ES"`, `"pt_PT"`, `"it_IT"`, `"nb_NO"`, `"sv_SE"`, `"fi_FI"`, `"da_DK"`, `"is_IS"`, `"hu_HU"`, `"pl_PL"`, `"lv_LV"`, `"lt_LT"`. |
| `method` | string | no |  | Payment Method. Specific payment method to use (optional) One of `"alma"`, `"applepay"`, `"bacs"`, `"bancomatpay"`, `"bancontact"`, `"banktransfer"`, `"belfius"`, `"billie"`, `"bizum"`, `"blik"`, `"creditcard"`, `"directdebit"`, `"eps"`, `"giftcard"`, `"ideal"`, `"in3"`, `"kbc"`, `"klarna"`, `"klarnapaylater"`, `"klarnapaynow"`, `"klarnasliceit"`, `"mbway"`, `"multibanco"`, `"mybank"`, `"paybybank"` and 11 more. |
| `restrictPaymentMethodsToCountry` | string | no |  | Restrict Payment Methods to Country. ISO 3166-1 alpha-2 country code to restrict payment methods. |
| `sequenceType` | string | no | `"oneoff"` | Sequence Type. Type of payment sequence. One of `"oneoff"`, `"first"`, `"recurring"`. |
| `customerId` | string | no |  | Customer ID. Customer ID (required for recurring payments) |
| `mandateId` | string | no |  | Mandate ID. Mandate ID (for recurring payments) |
| `captureMode` | string | no | `"automatic"` | Capture Mode. When to capture the payment. One of `"automatic"`, `"manual"`. |
| `captureDelay` | string | no |  | Capture Delay. Delay before automatic capture (e.g. "8 hours", "2 days") |
| `testmode` | boolean | no | `false` | Test Mode. Whether to create the payment in test mode. |

### `create_customer`

**Create Customer.** Creates a customer record in Mollie (optional name, email, locale, and metadata) to associate with payments and mandates for recurring billing. Use before setting up recurring or first-sequence payments that need a customer ID. Not idempotent: each call creates a new customer, with no deduplication on email. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. The full name of the customer. |
| `email` | string | no |  | Email. The email address of the customer. |
| `locale` | string | no |  | Locale. The language to be used in the hosted payment pages. One of `"en_US"`, `"en_GB"`, `"nl_NL"`, `"nl_BE"`, `"de_DE"`, `"de_AT"`, `"de_CH"`, `"fr_FR"`, `"fr_BE"`, `"es_ES"`, `"ca_ES"`, `"pt_PT"`, `"it_IT"`, `"nb_NO"`, `"sv_SE"`, `"fi_FI"`, `"da_DK"`, `"is_IS"`, `"hu_HU"`, `"pl_PL"`, `"lv_LV"`, `"lt_LT"`. |
| `metadata` | string | no |  | Metadata. Additional data to save alongside the customer (JSON string) |
| `testmode` | boolean | no | `false` | Test Mode. Whether to create the customer in test mode. |

### `create_payment_refund`

**Create Payment Refund.** Refunds an existing Mollie payment, fully or partially, by specifying the refund amount and currency against a target payment ID. Use to return funds for a charged payment. Not idempotent: each call issues another refund against the payment, so repeating it can over-refund. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paymentId` | string | yes |  | Payment. Select the payment to refund. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. The description of the refund (max 255 characters) |
| `currency` | string | yes | `"EUR"` | Currency. A three-character ISO 4217 currency code (e.g. EUR, USD) |
| `amount` | string | yes |  | Refund Amount. The amount to refund (e.g. "10.00") |
| `metadata` | string | no |  | Metadata. Additional data to save alongside the refund (JSON string) |
| `includeExternalReference` | boolean | no | `false` | Include External Reference. Whether to include external reference details. |
| `externalReferenceType` | string | no |  | External Reference Type. Type of external reference. One of `"acquirer-reference"`. |
| `externalReferenceId` | string | no |  | External Reference ID. Unique reference from the payment provider. |
| `reverseRouting` | boolean | no | `false` | Reverse Routing. Pull back funds routed to connected merchants (full refund only) |
| `includeRoutingReversals` | boolean | no | `false` | Include Routing Reversals. Specify detailed routing reversals for partial refunds. |
| `routingReversals` | array | no |  | Routing Reversals. Detailed routing reversals for connected merchants. Each item: { `amountCurrency`, `amountValue`, `sourceType`, `organizationId` }. |
| `testmode` | boolean | no | `false` | Test Mode. Whether to create the refund in test mode. |

### `search_order`

**Search Order.** Lists orders from the legacy Mollie Orders API, paginated with an optional cursor (from order ID), limit, sort direction, and profile filter. Use only when working with the deprecated Orders API; prefer Search Payment for current payment flows. Idempotent: read-only listing with no side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no |  | From Order ID. Start the result set from this order ID onwards. |
| `limit` | number | no |  | Limit. Maximum number of orders to return (1-250, default: 50) |
| `sort` | string | no | `"desc"` | Sort Direction. Sort orders by creation date. One of `"desc"`, `"asc"`. |
| `profileId` | string | no |  | Profile ID. Profile ID to retrieve orders for (optional) |
| `testmode` | boolean | no | `false` | Test Mode. Whether to search in test mode. |

### `search_payment`

**Search Payment.** Lists payments for the connected Mollie profile, paginated with an optional cursor (from payment ID), limit, sort direction, and profile filter. Use to look up existing payments or page through payment history. Idempotent: read-only listing with no side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no |  | From Payment ID. Start the result set from this payment ID onwards. |
| `limit` | number | no |  | Limit. Maximum number of payments to return (1-250, default: 50) |
| `sort` | string | no | `"desc"` | Sort Direction. Sort payments by creation date. One of `"desc"`, `"asc"`. |
| `profileId` | string | no |  | Profile ID. Profile ID to retrieve payments for (optional) |
| `testmode` | boolean | no | `false` | Test Mode. Whether to search in test mode. |

### `search_customer`

**Search Customer.** Lists customers in the connected Mollie account, paginated with an optional cursor (from customer ID), limit, and sort direction. Use to look up existing customers or page through the customer list. Idempotent: read-only listing with no side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no |  | From Customer ID. Start the result set from this customer ID onwards. |
| `limit` | number | no |  | Limit. Maximum number of customers to return (1-250, default: 50) |
| `sort` | string | no | `"desc"` | Sort Direction. Sort customers by creation date. One of `"desc"`, `"asc"`. |
| `testmode` | boolean | no | `false` | Test Mode. Whether to search in test mode. |
