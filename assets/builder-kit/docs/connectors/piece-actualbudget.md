# Actual Budget

Personal finance app

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-actualbudget'
  version: '0.1.9'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter authentication details

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `server_url` | string | yes |  | Server URL. This is the URL of your running server. |
| `password` | string | yes |  | Password. This is the password you use to log into the server. |
| `sync_id` | string | yes |  | Sync ID. This is the ID from Settings → Show advanced settings → Sync ID. |
| `encryption_password` | string | no |  | End-to-end encryption password. if you have end-to-end encryption enabled. |

## Actions

### `get_budget`

**Get Budget.** Retrieves the budget for a single month from an Actual Budget server, including each category group and category for that month. Use it to read budgeted, spent, and balance figures for a specific period; the month and year must be supplied as separate inputs. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `month` | string | yes |  | Month. The month of the budget you want to get. One of `"01"`, `"02"`, `"03"`, `"04"`, `"05"`, `"06"`, `"07"`, `"08"`, `"09"`, `"10"`, `"11"`, `"12"`. |
| `year` | string | yes |  | Year. The year of the budget you want to get. One of `"2016"`, `"2017"`, `"2018"`, `"2019"`, `"2020"`, `"2021"`, `"2022"`, `"2023"`, `"2024"`, `"2025"`, `"2026"`, `"2027"`, `"2028"`, `"2029"`, `"2030"`, `"2031"`. |

### `import_transaction`

**Import Transaction.** Adds a single transaction to a specified account in Actual Budget. Use it to record one transaction with fields such as date, amount, payee, category, and notes; the target account ID is required. Not idempotent — each call appends another transaction unless an Imported ID is supplied, which Actual uses to deduplicate against prior imports. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. ID of the account you want to import a transaction to. |
| `date` | ISO date-time string | yes |  | Date. Date the transaction took place. |
| `payee_name` | string | no |  | Payee Name. Name of the payee. |
| `amount` | number | no |  | Amount. The dollar value of the transaction. |
| `category` | string | no |  | Category ID. ID of the transaction category. |
| `notes` | string | no |  | Notes. Additional notes about the transaction. |
| `imported_id` | string | no |  | Imported ID. Unique ID given by the bank for importing. |
| `transfer_id` | string | no |  | Transfer ID. ID of the transaction in the other account for the transfer. |
| `cleared` | boolean | no |  | Cleared. Flag indicating if the transaction has cleared or not. |
| `imported_payee` | string | no |  | Imported Payee. Raw description when importing, representing the original value. |

### `import_transactions`

**Import Transactions.** Bulk-imports an array of transaction objects into a specified account in Actual Budget. Use it to add many transactions at once rather than one at a time; requires the target account ID and a JSON array of transactions (errors if not an array). Not idempotent — each call appends the transactions unless individual entries carry an Imported ID, which Actual uses to deduplicate against prior imports. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. ID of the account you want to import a transaction to. |
| `transactions` | JSON | yes | `[{"payee_name":"Kroger","date":"2026-12-25","amount":1200}]` | Transactions. A json array of the transaction object. |

### `get_categories`

**Get Categories.** Lists all budget categories from an Actual Budget server. Use it to discover available categories and their IDs, typically to resolve a category ID before importing a transaction. Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `get_accounts`

**Get Accounts.** Lists all accounts from an Actual Budget server. Use it to discover available accounts and their IDs, typically to resolve the account ID required by the import-transaction actions. Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.
