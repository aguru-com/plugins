# Coupa

Business spend management — automate procurement, approvals, purchase orders, and ERP integrations with the Coupa Core API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-coupa'
  version: '0.1.2'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect using an OAuth 2.0 OpenID Connect client with the **Client Credentials** grant. In Coupa, go to **Setup → Integrations → OAuth2/OpenID Connect Clients**, create a client, and copy the Client ID and Client Secret. Scopes use the form `core.accounting.read` — list yours at `https://{your-instance}/oauth2/scopes`.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `instanceUrl` | string | yes |  | Coupa Instance URL. Your Coupa hostname only, e.g. `company.coupahost.com` (without `https://`). |
| `clientId` | string | yes |  | Client ID. |
| `clientSecret` | string | yes |  | Client Secret. |
| `scope` | string | yes | `"core.common.read core.common.write"` | OAuth Scopes. Space-separated scopes granted to your OIDC client, e.g. `core.purchase_order.read core.purchase_order.write`. |

## Actions

### `create_object`

**Create Object.** Create a new record in a Coupa module — purchase orders, suppliers, contracts, or any other resource via the custom-module option — from a raw JSON body matching the Coupa API schema. Not idempotent: each run POSTs a new record, so retries create duplicates. Use Update Object to modify an existing record instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. Coupa module to work with: Purchase Orders, Suppliers, or Contracts. Pick "Custom resource" to target any other endpoint. One of `"purchase_orders"`, `"suppliers"`, `"contracts"`, `"__custom__"`. |
| `customResource` | string | no |  | Custom Resource Path. API resource segment when Module is **Custom resource**, e.g. `invoices` or `approvals`. |
| `body` | JSON | yes |  | Request Body (JSON). JSON payload sent to Coupa, using Coupa field names in kebab-case (e.g. `po-number`, `supplier-id`). See the examples above for each module. |

### `update_object`

**Update Object.** Update an existing Coupa record by ID — in purchase orders, suppliers, contracts, or any other resource via the custom-module option — by PUTting a raw JSON body of the fields to change. Requires a known record ID; use Create Object for new records. Effectively idempotent: re-sending the same body to the same ID yields the same record state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. Coupa module to work with: Purchase Orders, Suppliers, or Contracts. Pick "Custom resource" to target any other endpoint. One of `"purchase_orders"`, `"suppliers"`, `"contracts"`, `"__custom__"`. |
| `customResource` | string | no |  | Custom Resource Path. API resource segment when Module is **Custom resource**, e.g. `invoices` or `approvals`. |
| `record` | object | yes |  | Record. Pick the record by name. For a custom resource, enter its numeric ID. An object whose fields depend on other inputs; the product shows them. |
| `body` | JSON | yes |  | Request Body (JSON). JSON payload sent to Coupa, using Coupa field names in kebab-case (e.g. `po-number`, `supplier-id`). See the examples above for each module. |

### `get_object_by_id`

**Get Object by ID.** Fetch one Coupa record by its ID from purchase orders, suppliers, contracts, or any other resource via the custom-module option, with optional query parameters such as a fields filter. Use this when you already know the record ID; use Search Objects to find records by criteria. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. Coupa module to work with: Purchase Orders, Suppliers, or Contracts. Pick "Custom resource" to target any other endpoint. One of `"purchase_orders"`, `"suppliers"`, `"contracts"`, `"__custom__"`. |
| `customResource` | string | no |  | Custom Resource Path. API resource segment when Module is **Custom resource**, e.g. `invoices` or `approvals`. |
| `record` | object | yes |  | Record. Pick the record by name. For a custom resource, enter its numeric ID. An object whose fields depend on other inputs; the product shows them. |
| `queryParams` | JSON | no |  | Query Parameters (JSON). Optional query filters, e.g. `{ "status[in]": "issued,closed", "exported": false }`. |

### `search_objects`

**Search Objects (Batch).** Search and list records in a Coupa module — purchase orders, suppliers, contracts, or any other resource via the custom-module option — using optional Coupa query parameters as filters, auto-paginating through all matching pages. Use this to find records by criteria; use Get Object by ID when you already have an ID. Read-only and idempotent, but unfiltered searches on large modules can be slow. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. Coupa module to work with: Purchase Orders, Suppliers, or Contracts. Pick "Custom resource" to target any other endpoint. One of `"purchase_orders"`, `"suppliers"`, `"contracts"`, `"__custom__"`. |
| `customResource` | string | no |  | Custom Resource Path. API resource segment when Module is **Custom resource**, e.g. `invoices` or `approvals`. |
| `queryParams` | JSON | no |  | Query Parameters (JSON). Optional query filters, e.g. `{ "status[in]": "issued,closed", "exported": false }`. |

### `cancel_purchase_order`

**Cancel Purchase Order.** Cancel an existing Coupa purchase order by ID, voiding it rather than completing it — use Close Purchase Order to finalize a fulfilled order instead. This is an irreversible workflow transition and not idempotent: re-running against an already-cancelled order may fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `purchaseOrderId` | string | yes |  | Purchase Order. Select a purchase order from your Coupa instance (most recent 50). A value the product loads from the provider, such as an id; write the value itself. |

### `close_purchase_order`

**Close Purchase Order.** Close an existing Coupa purchase order by ID, marking it complete so no further receiving or invoicing occurs — use Cancel Purchase Order to void an order instead. Not idempotent: closing is a one-way workflow transition and re-running on an already-closed order may fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `purchaseOrderId` | string | yes |  | Purchase Order. Select a purchase order from your Coupa instance (most recent 50). A value the product loads from the provider, such as an id; write the value itself. |

### `add_file_attachment_to_object`

**Add File Attachment to Object.** Attach a file or a URL link to an existing Coupa purchase order, supplier, or contract record. Pick the mode via attachmentSource: upload a file directly, or link a URL instead. Not idempotent — each run appends a new attachment to the record, so retries create duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `module` | string | yes |  | Module. The type of record to attach the file to. One of `"purchase_orders"`, `"suppliers"`, `"contracts"`. |
| `parentRecord` | object | yes |  | Record. The record to attach to. Pick it by name after choosing a module. An object whose fields depend on other inputs; the product shows them. |
| `attachmentSource` | string | yes | `"file"` | Attachment Type. Choose whether to upload a file directly or attach a link (URL). One of `"file"`, `"url"`. |
| `attachment` | object | yes |  | Attachment. The file to upload or the URL to link. An object whose fields depend on other inputs; the product shows them. |
| `intent` | string | no |  | Intent. Optional Coupa attachment intent that controls who can see the attachment (e.g. `Supplier`). Leave empty to use the Coupa default. |

### `get_remit_to_addresses_by_object_id`

**Get Remit-To Addresses by Object ID.** List the remit-to (payment) addresses on file for a Coupa supplier. Works in two modes: pass a supplier ID directly, or pass a purchase order ID and it resolves the linked supplier first (failing if the order has no supplier). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentModule` | string | yes |  | Parent Module. Where to look up remit-to addresses from: a Supplier directly, or the supplier linked to a Purchase Order. One of `"suppliers"`, `"purchase_orders"`. |
| `parentRecord` | object | yes |  | Record. An object whose fields depend on other inputs; the product shows them. |

### `get_supplier_sites_by_supplier`

**Get Supplier Sites by Supplier.** List all supplier sites (locations/storefronts) configured under a given Coupa supplier ID. Use this to enumerate a supplier's sites; use Get Remit-To Addresses for payment addresses instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `supplierId` | string | yes |  | Supplier. Select a supplier from your Coupa instance (most recent 50). A value the product loads from the provider, such as an id; write the value itself. |

### `grant_approval`

**Grant Approval.** Approve a pending Coupa approval (e.g. a requisition or purchase order awaiting decision) by its approval ID, advancing the document through its approval chain. Use Reject Approval to decline instead. Not idempotent: the approval must be in a pending state, and re-running after it is decided may fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `approvalId` | string | yes |  | Approval. Select a pending approval awaiting a decision. Shows the most recent 50 pending approvals. A value the product loads from the provider, such as an id; write the value itself. |

### `reject_approval`

**Reject Approval.** Reject a pending Coupa approval (e.g. a requisition or purchase order awaiting decision) by its approval ID, optionally recording a rejection reason. Use Grant Approval to approve instead. Not idempotent: the approval must be in a pending state, and re-running after it is decided may fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `approvalId` | string | yes |  | Approval. Select a pending approval awaiting a decision. Shows the most recent 50 pending approvals. A value the product loads from the provider, such as an id; write the value itself. |
| `reason` | string | no |  | Rejection Reason. Optional note explaining why the approval was rejected. |

### `set_integration_run_status`

**Set Integration Run Status.** Set the status of a Coupa integration run by ID to one of: run, success, fail, pause, or pending — used to report progress of an external integration job back to Coupa. Not idempotent: each call is a status transition, and Coupa may reject transitions that are invalid from the run's current state. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `integrationRunId` | number | yes |  | Object ID. Numeric Coupa ID of the record. |
| `status` | string | yes |  | Status. One of `"run"`, `"success"`, `"fail"`, `"pause"`, `"pending"`. |

### `custom_action`

**Custom Action.** Make a custom API call to any Coupa endpoint (Purchase Orders, Suppliers, Contracts, or other resources). Needs authentication.

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
