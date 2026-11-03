# SAP Ariba

Automate procurement, contracts, and invoices with SAP Ariba.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sap-ariba'
  version: '0.0.8'
```

Categories: BUSINESS_INTELLIGENCE, COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Authenticate to SAP Ariba APIs.
>
> **Option 1: API Key Only**
> - Fill in only Application Key and API Base URL.
>
> **Option 2: OAuth + API Key**
> - Fill in all fields including OAuth Client ID, Client Secret, and OAuth Server URL.
>
> **Steps:**
> 1. Log in to the [SAP Ariba Developer Portal](https://developer.ariba.com/api/).
> 2. Click **Manage** and select your application.
> 3. **Application Key**: Copy from the **Application Key** field.
> 4. **OAuth Client ID** (optional): Copy from the **OAuth Client ID** field.
> 5. **OAuth Client Secret** (optional): Click **Actions** > **Generate OAuth Secret**. Copy immediately.
> 6. **OAuth Server URL** (optional): Find in **Environment details** (e.g., `https://api.ariba.com`).
> 7. **API Base URL**: The API runtime URL (e.g., `https://openapi.ariba.com/api/purchase-orders-buyer/v1/prod`).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | Application Key (APIKey). The Application Key for your application. |
| `baseUrl` | string | yes |  | API Base URL. The API Runtime URL (e.g., https://openapi.ariba.com/api/purchase-orders-buyer/v1/prod). |
| `clientId` | string | no |  | OAuth Client ID. The OAuth Client ID (optional, for OAuth authentication). |
| `clientSecret` | string | no |  | OAuth Client Secret. The OAuth Client Secret (optional, for OAuth authentication). |
| `oauthServerUrl` | string | no |  | OAuth Server URL Prefix. The OAuth Server URL (optional, e.g., https://api.ariba.com). |

## Actions

### `list_purchase_orders`

**List Purchase Orders.** List purchase order headers from SAP Ariba Network for a buyer (required buyer ANID). Use to find or browse POs; optional filters (supplier ANID, document number, order/routing status, date range capped at 31 days) narrow the results, and leaving them empty returns all of the buyer's orders paginated. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `buyerANID` | string | yes |  | Buyer ANID. The buyer's Ariba Network ID. |
| `supplierANID` | string | no |  | Supplier ANID. Filter by supplier's Ariba Network ID. |
| `documentNumber` | string | no |  | Document Number. Filter by order ID / purchase order number. |
| `orderStatus` | string | no |  | Order Status. Filter by order processing state. One of `"New"`, `"Changed"`, `"Confirmed"`, `"Shipped"`, `"Invoiced"`, `"Canceled"`. |
| `routingStatus` | string | no |  | Routing Status. Filter by routing status. One of `"Queued"`, `"Sent"`, `"Acknowledged"`, `"Failed"`. |
| `startDate` | ISO date-time string | no |  | Start Date. Filter orders received on or after this date. Max range: 31 days. |
| `endDate` | ISO date-time string | no |  | End Date. Filter orders received on or before this date. Max range: 31 days. |
| `top` | number | no | `50` | Page Size. Number of items to return. |
| `skip` | number | no | `0` | Offset. Number of items to skip. |

### `list_purchase_order_items`

**List Purchase Order Line Items.** List purchase-order line items from SAP Ariba Network for a buyer (required buyer ANID). Use when you need item-level detail rather than PO headers; optional filters (document number, order/routing status, date range capped at 31 days) narrow results, and leaving them empty returns all line items paginated. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `buyerANID` | string | yes |  | Buyer ANID. The buyer's Ariba Network ID. |
| `documentNumber` | string | no |  | Document Number. Filter by order ID / purchase order number. |
| `orderStatus` | string | no |  | Order Status. Filter by order processing state. One of `"New"`, `"Changed"`, `"Confirmed"`, `"Shipped"`, `"Invoiced"`, `"Canceled"`. |
| `routingStatus` | string | no |  | Routing Status. Filter by routing status. One of `"Queued"`, `"Sent"`, `"Acknowledged"`, `"Failed"`. |
| `startDate` | ISO date-time string | no |  | Start Date. Filter orders received on or after this date. Max range: 31 days. |
| `endDate` | ISO date-time string | no |  | End Date. Filter orders received on or before this date. Max range: 31 days. |
| `top` | number | no | `50` | Page Size. Number of items to return. |
| `skip` | number | no | `0` | Offset. Number of items to skip. |

### `get_document_changes`

**Get Document Changes.** List changes to approvable documents in a SAP Ariba realm (required). Use to poll for incremental updates: pass a change sequence ID to return only changes after that point, or leave it empty to fetch all changes. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Unique identifier of the realm. |
| `changeSequenceId` | number | no |  | Change Sequence ID. Only return changes after this sequence ID. Leave empty to get all changes. |
| `count` | boolean | no | `false` | Include Count. Include total count in response. |
| `top` | number | no |  | Page Size. Number of records to return (max 1000, default 10). |
| `skip` | number | no |  | Offset. Number of records to skip. |

### `get_pending_approvables`

**Get Pending Approvables.** List documents and tasks awaiting approval in a SAP Ariba realm (required). Use to find pending approvals; optional filters narrow by approvable type (requisitions, invoices, contracts, payment), user, or password adapter, and leaving them empty returns all pending items. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Unique identifier of the realm. |
| `approvableType` | string | no |  | Approvable Type. Filter by document type. One of `"requisitions"`, `"invoices"`, `"contracts"`, `"payment"`. |
| `user` | string | no |  | User. Filter by username. |
| `passwordAdapter` | string | no |  | Password Adapter. Filter by password adapter. |
| `count` | boolean | no | `false` | Include Count. Include total count in response. |
| `top` | number | no |  | Page Size. Number of records to return (max 100, default 100). |
| `skip` | number | no |  | Offset. Number of records to skip. |

### `get_catalog_items`

**Get Catalog Items.** Retrieve catalog items for a specific supplier and catalog in a SAP Ariba realm. Use to look up product/part data within a known catalog; requires realm, catalog name, supplier ID, and the comma-separated output fields to return, with an optional RSQL filter expression to narrow matches. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Realm name. |
| `catalogName` | string | yes |  | Catalog Name. Name of the catalog. |
| `supplierId` | string | yes |  | Supplier ID. Supplier ID domain value pair (e.g., buyersystemid:Supplier16). |
| `select` | string | yes | `"SupplierPartId,SupplierId"` | Select Fields. Output fields to return, comma-separated (e.g., SupplierPartId,SupplierId,LeadTime). |
| `rsqlfilter` | string | no |  | RSQL Filter. Optional RSQL filter expression (e.g., CatalogName==JCNTechnologies). |
| `offset` | number | yes | `1` | Offset. Starting position for results. |
| `limit` | number | no | `1000` | Limit. Maximum number of items to return (default 1000). |

### `get_active_catalogs`

**Get Active Catalogs.** List active catalogs and their supplier values in a SAP Ariba realm, returning those activated on or after a required date. Use to discover available catalogs; optional filters narrow by supplier domain or subscription name. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Realm name. |
| `date` | ISO date-time string | yes |  | Activated From Date. Get catalogs activated from this date (ISO format). |
| `supplierdomain` | string | no |  | Supplier Domain. Filter by Supplier Domain ID (e.g., buyersystemid:Supplier16). |
| `subscriptionName` | string | no |  | Subscription Name. Filter by Subscription Name. |
| `showAll` | boolean | no | `false` | Show All. Show all records. |
| `showAdditionalFields` | boolean | no | `false` | Show Additional Fields. Include additional fields in response. |

### `get_facet_data`

**Get Facet Data.** Retrieve catalog facet data (e.g. distinct classification codes) for a SAP Ariba realm. Use to enumerate facet values for filtering or grouping catalog content; requires realm, the facet field to select, and an RSQL filter expression. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Realm name. |
| `select` | string | yes | `"ClassificationCode"` | Select Field. Facet field to select (e.g., ClassificationCode). |
| `rsqlfilter` | string | yes |  | RSQL Filter. RSQL Filter expression (e.g., CatalogName==JCNTechnologies). |

### `list_invoices`

**List Invoices.** List invoice headers from SAP Ariba Network for a given Ariba Network ID (required). Use to find or browse invoices; optional filters narrow by buyer/supplier ANID, document number, document/routing status, document purpose, and creation or status-update date ranges, and leaving them empty returns all invoices paginated. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `anId` | string | yes |  | Ariba Network ID. Buyer/Supplier Ariba Network ID (ANID). |
| `buyerANID` | string | no |  | Filter: Buyer ANID. Filter by Buyer's ANID. |
| `supplierANID` | string | no |  | Filter: Supplier ANID. Filter by Supplier's ANID. |
| `documentNumber` | string | no |  | Filter: Document Number. Filter by Invoice Document Number. |
| `documentStatus` | string | no |  | Filter: Document Status. Filter by processing status. One of `"Sent"`, `"Acknowledged"`, `"Failed"`, `"Rejected"`, `"Paid"`, `"Approved"`. |
| `routingStatus` | string | no |  | Filter: Routing Status. Filter by routing status. One of `"Sent"`, `"Acknowledged"`, `"Failed"`. |
| `startDate` | ISO date-time string | no |  | Filter: Created Start Date. Filter by creation date (start). |
| `endDate` | ISO date-time string | no |  | Filter: Created End Date. Filter by creation date (end). |
| `documentStatusUpdatedStartDate` | ISO date-time string | no |  | Filter: Updated Start Date. Filter by status updated date (start). |
| `documentStatusUpdatedEndDate` | ISO date-time string | no |  | Filter: Updated End Date. Filter by status updated date (end). |
| `documentPurpose` | string | no |  | Filter: Document Purpose. Filter by document purpose. One of `"standard"`, `"creditMemo"`, `"debitMemo"`. |
| `includeInvoiceProfile` | boolean | no | `false` | Include Invoice Profile. Display Invoice Profile related fields (e.g., Address, Tax Id). |
| `top` | number | no | `100` | Page Size. Number of items to return (max 100). |
| `skip` | number | no |  | Offset. Number of items to skip. |

### `search_contract_workspaces`

**Search Contract Workspaces.** Search contract workspaces in a SAP Ariba Contracts realm, acting on behalf of a user (requires realm, user, and password adapter). Use to find contracts by attributes when you do not have an exact ID; an optional filter expression narrows matches and leaving it empty returns all accessible workspaces paginated. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Unique identifier of the realm. |
| `user` | string | yes |  | User. User ID to perform the action on behalf of. |
| `passwordAdapter` | string | yes |  | Password Adapter. Password adapter to authenticate the user. |
| `select` | string | no |  | Select Fields. Comma-separated metadata fields to retrieve (e.g., title,contractid,region). |
| `filter` | string | no |  | Filter. Filter criteria (e.g., LastModified ge '2023-01-01T00:00:00Z'). |
| `top` | number | no | `500` | Page Size. Number of records to return (default 500, max 500). |
| `skip` | number | no | `0` | Offset. Number of records to skip. |
| `count` | boolean | no | `false` | Include Count. Include total number of records in response. |
| `expand` | string | no |  | Expand. Additional information to fetch (e.g., relatedFactories). |

### `get_contract_workspace`

**Get Contract Workspace.** Fetch a single contract workspace by its contract ID from a SAP Ariba Contracts realm, acting on behalf of a user (requires realm, user, and password adapter). Use when you already know the exact contract ID; for attribute-based discovery use Search Contract Workspaces instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Unique identifier of the realm. |
| `user` | string | yes |  | User. User ID to perform the action on behalf of. |
| `passwordAdapter` | string | yes |  | Password Adapter. Password adapter to authenticate the user. |
| `contractId` | string | yes |  | Contract ID. Contract ID (e.g., CW0001). |
| `expand` | string | no |  | Expand. Additional information to fetch (e.g., relatedFactories). |

### `create_contract_workspace`

**Create Contract Workspace.** Create a new contract workspace in a SAP Ariba Contracts realm, acting on behalf of a user (requires realm, user, password adapter, and a title). Use to start a new contract; optional fields set template, dates, amount/currency, owner, and supplier. Not idempotent: each call creates a separate workspace. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Unique identifier of the realm. |
| `user` | string | yes |  | User. User ID to perform the action on behalf of. |
| `passwordAdapter` | string | yes |  | Password Adapter. Password adapter to authenticate the user. |
| `title` | string | yes |  | Title. Contract workspace title. |
| `description` | string | no |  | Description. Contract workspace description. |
| `templateId` | string | no |  | Template ID. Template ID for the contract workspace. |
| `effectiveDate` | ISO date-time string | no |  | Effective Date. Contract effective date. |
| `expirationDate` | ISO date-time string | no |  | Expiration Date. Contract expiration date. |
| `contractAmount` | number | no |  | Contract Amount. Contract amount value. |
| `contractCurrency` | string | no |  | Contract Currency. Currency code (e.g., USD). |
| `ownerUniqueName` | string | no |  | Owner Unique Name. Owner user unique name. |
| `ownerPasswordAdapter` | string | no |  | Owner Password Adapter. Owner password adapter. |
| `supplierName` | string | no |  | Supplier Name. Supplier organization name. |
| `supplierSystemId` | string | no |  | Supplier System ID. Supplier system ID. |
| `isTestProject` | boolean | no | `false` | Is Test Project. Mark as test project. |
| `additionalFields` | JSON | no |  | Additional Fields. Additional fields as JSON object to merge with the request body. |

### `update_contract_workspace`

**Update Contract Workspace.** Update fields (title, description, dates, amount/currency, amendment reason) on an existing contract workspace in a SAP Ariba Contracts realm, identified by contract ID and acting on behalf of a user (requires realm, user, and password adapter). Idempotent: repeating the call with the same field values converges to the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Unique identifier of the realm. |
| `user` | string | yes |  | User. User ID to perform the action on behalf of. |
| `passwordAdapter` | string | yes |  | Password Adapter. Password adapter to authenticate the user. |
| `contractId` | string | yes |  | Contract ID. The ID of the contract workspace to update. |
| `silentUpdate` | string | no |  | Silent Update. Update without changing the last modified date. One of `"Yes"`, `"No"`. |
| `title` | string | no |  | Title. New title. |
| `description` | string | no |  | Description. New description. |
| `effectiveDate` | ISO date-time string | no |  | Effective Date. New effective date. |
| `expirationDate` | ISO date-time string | no |  | Expiration Date. New expiration date. |
| `contractAmount` | number | no |  | Contract Amount. New contract amount value. |
| `contractCurrency` | string | no |  | Contract Currency. Currency code (e.g., USD). |
| `amendmentReason` | string | no |  | Amendment Reason. Reason for amendment. |
| `additionalFields` | JSON | no |  | Additional Fields. Additional fields as JSON object to merge with the request body. |

### `update_contract_status`

**Update Contract Status.** Perform a status-change action on a contract workspace in a SAP Ariba Contracts realm, identified by contract ID and acting on behalf of a user (requires realm, user, and password adapter). The action prop selects the transition: amend, completeAmendment, putOnHold, resume, or close (amend also takes an amendment type and reason). Not idempotent: each call drives a state transition that depends on the contract's current status. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Unique identifier of the realm. |
| `user` | string | yes |  | User. User ID to perform the action on behalf of. |
| `passwordAdapter` | string | yes |  | Password Adapter. Password adapter to authenticate the user. |
| `contractId` | string | yes |  | Contract ID. The ID of the contract workspace. |
| `action` | string | yes |  | Action. The status change action to perform. One of `"amend"`, `"completeAmendment"`, `"putOnHold"`, `"resume"`, `"close"`. |
| `amendmentType` | string | no |  | Amendment Type. Required if action is Amend. One of `"Administrative"`, `"Renewal"`, `"Amendment"`, `"Termination"`, `"PriceUpdate"`. |
| `amendmentReason` | string | no |  | Amendment Reason. Reason for the amendment. |
| `isTemplateUpgradeRequired` | boolean | no | `false` | Is Template Upgrade Required. Whether template upgrade is required (for Amend action). |

### `delete_contract_workspace`

**Delete Contract Workspace.** Delete a contract workspace by its contract ID from a SAP Ariba Contracts realm, acting on behalf of a user (requires realm, user, and password adapter). Use to permanently remove a workspace. Idempotent: once deleted, repeating the call leaves the workspace gone. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `realm` | string | yes |  | Realm. Name of the SAP Ariba Contract site (e.g., testrealm). |
| `user` | string | yes |  | User. User ID to perform the action on behalf of (e.g., testUser). |
| `passwordAdapter` | string | yes |  | Password Adapter. Password adapter to authenticate the user (e.g., PasswordAdapter1). |
| `contractId` | string | yes |  | Contract ID. The ID of the contract workspace to delete (e.g., CW0001). |
