# Zuora

Cloud-based subscription management platform that enables businesses to launch and monetize subscription services.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zuora'
  version: '0.1.6'
```

Categories: SALES_AND_CRM, PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> - **Establish a Dedicated API User** : Zuora recommends creating a distinct API user specifically for OAuth authentication with write permissions. Refer to the [API User Creation Guide](https://knowledgecenter.zuora.com/Zuora_Central_Platform/Tenant_Management/A_Administrator_Settings/Manage_Users/Create_an_API_User) for detailed instructions on setting up this user.
> - **Create OAuth Client** : After setting up the API user, it's essential to create an OAuth client tailored for this user.Detailed instructions can be found in the [OAuth Client Creation Guide](https://knowledgecenter.zuora.com/Zuora_Central_Platform/Tenant_Management/A_Administrator_Settings/Manage_Users).
> - **Refer to Base API URL** : Utilize the [Base API URL](https://developer.zuora.com/v1-api-reference/introduction/#section/Introduction/Access-to-the-API) provided by Zuora for your environment. This URL serves as the entry point for accessing the Zuora API.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client ID. |
| `clientSecret` | string | yes |  | Client Secret. |
| `environment` | string | yes |  | Environment. One of `"https://rest.na.zuora.com"`, `"https://rest.sandbox.na.zuora.com"`, `"https://rest.zuora.com"`, `"https://rest.apisandbox.zuora.com"`, `"https://rest.test.zuora.com"`, `"https://rest.eu.zuora.com"`, `"https://rest.sandbox.eu.zuora.com"`, `"https://rest.test.eu.zuora.com"`. |

## Actions

### `create-invoice`

**Create Invoice.** Creates a standalone invoice in Zuora for a given customer account, with one or more line items billed to product rate plan charges. Use when an agent needs to bill an account outside the normal subscription cycle; the target account is identified by its account number and each invoice item must reference a product rate plan charge ID. Not idempotent: each call posts a new invoice, so repeating it produces duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountNumber` | string | yes |  | Customer Account Number. The number of the customer account associated with the invoice. |
| `autoPay` | boolean | no |  | Auto Pay?. Whether invoices are automatically picked up for processing in the corresponding payment run. |
| `comments` | string | no |  | Comments. |
| `dueDate` | ISO date-time string | yes |  | Due Date. Provide YYYY-MM-DD format. |
| `invoiceDate` | ISO date-time string | yes |  | Invoice Date. Provide YYYY-MM-DD format. |
| `invoiceItems` | array | no |  | Invoice Items. Each item: { `productRatePlanChargeId`, `amount`, `description`?, `purchaseOrderNumber`?, `quantity`?, `serviceStartDate`, `serviceEndDate`? }. |
| `status` | string | no | `"Draft"` | Status. One of `"Draft"`, `"Posted"`. |

### `find-account`

**Find Customer Account.** Looks up Zuora customer accounts whose name exactly matches the given value, via an object query. Use to resolve an account before billing or further account operations; matching is an exact equality on the account name, not a partial or fuzzy search. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Account Name. |

### `find-product-rate-plan`

**Find Product Rate Plan.** Looks up a Zuora product rate plan (and its expanded rate plan charges) by exact rate plan name scoped to a specific product ID. Use to find the rate plan charge IDs needed when creating an invoice or subscription; both the rate plan name and the product ID are required and matched by exact equality. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Product Rate Plan Name. i.e. StealthCo Premium. |
| `productid` | string | yes |  | Product ID. |

### `find-product`

**Find Product.** Looks up a Zuora product by exact SKU match via an object query. Use to resolve a product (e.g. to obtain its product ID before finding rate plans) when you know the SKU; matching is exact equality on the SKU, not a partial search. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sku` | string | yes |  | Product SKU. |
