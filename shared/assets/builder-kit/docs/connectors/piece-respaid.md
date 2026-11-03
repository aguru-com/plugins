# Respaid

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-respaid'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can find API Key in your Respaid account

## Actions

### `create_new_campaign`

**Create New Campaign.** Creates a new Respaid debt-collection campaign by importing a batch of invoices/debtor records (each with debtor contact details, due amount, and invoice info). Use to kick off collection on a set of unpaid invoices. Requires importData to be an array of invoice objects; creates a new campaign on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_name` | string | yes |  | Campaign Name. |
| `is_agency_collection` | boolean | no | `false` | Agency collection?. |
| `importData` | JSON | yes |  | Import Data (Array of Invoices). Provide an array of invoice objects with the following example structure: [{ "unique_identifier": "123", "company_name": "Company XYZ", "email": "john@example.com", "invoice_number": "INV123", "invoice_date": "01/01/2025", "description": "Invoice for service" "due_amount": 1000, "invoicing_entity_n… |

### `stop_collection_client_paid_directly`

**Stop Collection for Direct Full Payment.** Halts the Respaid collection process for a single case and marks the debt as paid in full directly to the creditor (outside Respaid). Use when a debtor settled the invoice with the creditor directly. The case must be identified by either unique_identifier or email (one is required); it mutates case state, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `unique_identifier` | string | no |  | Unique Identifier. |
| `email` | string | no |  | Email. |
| `invoice_number` | string | no |  | Invoice Number. |

### `stop_collection_for_direct_partial_payment`

**Stop Collection for Direct Partial Payment.** Halts the Respaid collection process for a single case and records a partial payment made directly to the creditor (outside Respaid), passing the paid amount. Use when a debtor settled part of the invoice with the creditor directly. The case must be identified by either unique_identifier or email (one is required); it records a payment and mutates case state, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `unique_identifier` | string | no |  | Unique Identifier. |
| `amount` | string | no |  | Amount. |
| `email` | string | no |  | Email. |
| `invoice_number` | string | no |  | Invoice Number. |

### `stop_collection_for_direct_instalment_payment`

**Stop Collection for Direct Instalment Payment.** Halts the Respaid collection process for a single case because the debtor and creditor agreed on a direct instalment (payment plan) arrangement. Use when collection should pause in favour of a creditor-side instalment plan rather than full settlement. The case must be identified by either unique_identifier or email (one is required); it mutates case state, so it is not idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `unique_identifier` | string | no |  | Unique Identifier. |
| `email` | string | no |  | Email. |
| `invoice_number` | string | no |  | Invoice Number. |
