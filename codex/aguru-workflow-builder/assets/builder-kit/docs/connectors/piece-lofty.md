# Lofty

Lofty is a product of the technology company Lofty Inc, which offers a complete tech solution for real estate agents.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lofty'
  version: '0.2.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API Key for Lofty

## Actions

### `createLead`

**Create Lead.** Creates a new lead (contact) in the Lofty real-estate CRM with the given name, email(s), and optional details such as phone, address, lead type, source, buyer/seller property criteria, and communication opt-ins. Use when adding a person to Lofty. First name and at least one email are required. Not idempotent: each call creates a new lead, so repeated calls produce duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First name. |
| `lastName` | string | no |  | Last name. |
| `emails` | array | yes |  | Email. Lead email address(s) |
| `phone` | string | no |  | Phone. |
| `birthday` | string | no |  | Birthday. YYYY-MM-DD. |
| `mailingAddress` | string | no |  | Street or Complete Address (Mailing Address). |
| `mailingCity` | string | no |  | City (Mailing Address). |
| `mailingState` | string | no |  | State (Mailing Address). |
| `mailingZipcode` | string | no |  | Zip Code (Mailing Address). |
| `leadType` | string | no |  | Lead Type. |
| `leadOwnershipLevel` | string | no |  | Lead Ownership Level. |
| `source` | string | no |  | Source. |
| `segment` | string | no |  | Segment. |
| `tags` | array | no |  | Tag(s). |
| `note` | string | no |  | Note. |
| `subscriptionSmartPlans` | boolean | no |  | Subscription - Smart Plans. |
| `subscriptionPropertyAlert` | boolean | no |  | Subscription - Property Alert. |
| `subscriptionMarketReport` | boolean | no |  | Subscription - Market Report. |
| `minPriceBuyer` | number | no |  | Min Price (Buyer). |
| `maxPriceBuyer` | number | no |  | Max Price (Buyer). |
| `locationDeprecated` | string | no |  | Location (Deprecated). |
| `buyerCity` | string | no |  | City (Buyer). |
| `buyerState` | string | no |  | State (Buyer). |
| `buyerZipcode` | string | no |  | Zipcode (Buyer). |
| `buyerAddress` | string | no |  | Address (Buyer). |
| `minBedsBuyer` | number | no |  | Min Beds (Buyer). |
| `minBathsBuyer` | number | no |  | Min Baths (Buyer). |
| `bedsSeller` | number | no |  | Beds (Seller). |
| `bathsSeller` | number | no |  | Baths (Seller). |
| `priceSeller` | number | no |  | Price (Seller). |
| `addressSeller` | string | no |  | Address (Seller). |
| `sqftSeller` | number | no |  | SqFt (Seller). |
| `citySeller` | string | no |  | City (Seller). |
| `stateSeller` | string | no |  | State (Seller). |
| `zipcodeSeller` | string | no |  | Zipcode (Seller). |
| `sendWelcomeEmail` | boolean | no |  | Send Welcome Email. |
| `callOptIn` | boolean | no |  | Call Opt In. |
| `textOptIn` | boolean | no |  | Text Opt In. |
| `emailOptIn` | boolean | no |  | Email Opt In. |
| `numberConsent` | boolean | no |  | Number Consent. |

### `createTransaction`

**Create Transaction.** Records a new transaction (e.g. a sale or rental deal with amount, property details, dates, and agent) against an existing Lofty lead. Use when logging a deal for a known lead; requires the lead id (selectable from the account or passed directly). Not idempotent: each call appends another transaction, so repeated calls create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead. Select a lead. A value the product loads from the provider, such as an id; write the value itself. |
| `transactionDate` | string | no |  | Transaction Date. YYYY-MM-DD. |
| `amount` | number | no |  | Amount. |
| `transactionType` | string | no |  | Transaction Type. e.g., sale, rent. |
| `propertyAddress` | string | no |  | Property Address. |
| `propertyCity` | string | no |  | Property City. |
| `propertyState` | string | no |  | Property State. |
| `propertyZipcode` | string | no |  | Property Zipcode. |
| `beds` | number | no |  | Beds. |
| `baths` | number | no |  | Baths. |
| `sqft` | number | no |  | SqFt. |
| `mlsNumber` | string | no |  | MLS Number. |
| `closingDate` | string | no |  | Closing Date. YYYY-MM-DD. |
| `agentId` | string | no |  | Agent ID. |
| `agentName` | string | no |  | Agent Name. |
| `agentEmail` | string | no |  | Agent Email. |
| `source` | string | no |  | Source. |
| `note` | string | no |  | Note. |

### `updateLead`

**Update Lead.** Updates fields on an existing Lofty lead identified by lead id, sending only the fields you provide (name, emails, phone, address, lead type, source, buyer/seller criteria, opt-ins, etc.). Use to modify a known lead rather than create one. Idempotent: applying the same field values repeatedly leaves the lead in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead. Select a lead. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First name. |
| `lastName` | string | no |  | Last name. |
| `emails` | array | no |  | Email. Lead email address(s) |
| `phone` | string | no |  | Phone. |
| `birthday` | string | no |  | Birthday. YYYY-MM-DD. |
| `mailingAddress` | string | no |  | Street or Complete Address (Mailing Address). |
| `mailingCity` | string | no |  | City (Mailing Address). |
| `mailingState` | string | no |  | State (Mailing Address). |
| `mailingZipcode` | string | no |  | Zip Code (Mailing Address). |
| `leadType` | string | no |  | Lead Type. |
| `leadOwnershipLevel` | string | no |  | Lead Ownership Level. |
| `source` | string | no |  | Source. |
| `segment` | string | no |  | Segment. |
| `tags` | array | no |  | Tag(s). |
| `note` | string | no |  | Note. |
| `subscriptionSmartPlans` | boolean | no |  | Subscription - Smart Plans. |
| `subscriptionPropertyAlert` | boolean | no |  | Subscription - Property Alert. |
| `subscriptionMarketReport` | boolean | no |  | Subscription - Market Report. |
| `minPriceBuyer` | number | no |  | Min Price (Buyer). |
| `maxPriceBuyer` | number | no |  | Max Price (Buyer). |
| `locationDeprecated` | string | no |  | Location (Deprecated). |
| `buyerCity` | string | no |  | City (Buyer). |
| `buyerState` | string | no |  | State (Buyer). |
| `buyerZipcode` | string | no |  | Zipcode (Buyer). |
| `buyerAddress` | string | no |  | Address (Buyer). |
| `minBedsBuyer` | number | no |  | Min Beds (Buyer). |
| `minBathsBuyer` | number | no |  | Min Baths (Buyer). |
| `bedsSeller` | number | no |  | Beds (Seller). |
| `bathsSeller` | number | no |  | Baths (Seller). |
| `priceSeller` | number | no |  | Price (Seller). |
| `addressSeller` | string | no |  | Address (Seller). |
| `sqftSeller` | number | no |  | SqFt (Seller). |
| `citySeller` | string | no |  | City (Seller). |
| `stateSeller` | string | no |  | State (Seller). |
| `zipcodeSeller` | string | no |  | Zipcode (Seller). |
| `sendWelcomeEmail` | boolean | no |  | Send Welcome Email. |
| `callOptIn` | boolean | no |  | Call Opt In. |
| `textOptIn` | boolean | no |  | Text Opt In. |
| `emailOptIn` | boolean | no |  | Email Opt In. |
| `numberConsent` | boolean | no |  | Number Consent. |

### `updateTransaction`

**Update Transaction.** Updates an existing transaction on a Lofty lead, identified by both the lead id and transaction id, sending only the provided fields (amount, property details, dates, agent, source, note). Use to amend a known deal rather than create one. Idempotent: applying the same field values repeatedly leaves the transaction in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead. Select a lead. A value the product loads from the provider, such as an id; write the value itself. |
| `transactionId` | string | yes |  | Transaction. Select a transaction. A value the product loads from the provider, such as an id; write the value itself. |
| `transactionDate` | string | no |  | Transaction Date. YYYY-MM-DD. |
| `amount` | number | no |  | Amount. |
| `transactionType` | string | no |  | Transaction Type. e.g., sale, rent. |
| `propertyAddress` | string | no |  | Property Address. |
| `propertyCity` | string | no |  | Property City. |
| `propertyState` | string | no |  | Property State. |
| `propertyZipcode` | string | no |  | Property Zipcode. |
| `beds` | number | no |  | Beds. |
| `baths` | number | no |  | Baths. |
| `sqft` | number | no |  | SqFt. |
| `mlsNumber` | string | no |  | MLS Number. |
| `closingDate` | string | no |  | Closing Date. YYYY-MM-DD. |
| `agentId` | string | no |  | Agent ID. |
| `agentName` | string | no |  | Agent Name. |
| `agentEmail` | string | no |  | Agent Email. |
| `source` | string | no |  | Source. |
| `note` | string | no |  | Note. |

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
