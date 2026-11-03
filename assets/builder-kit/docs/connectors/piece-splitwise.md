# Splitwise

Splitwise is a expense splitting app that helps you track and settle bills with friends, family, and roommates.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-splitwise'
  version: '0.1.7'
```

Categories: ACCOUNTING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can generate an API key from your app's details page on Splitwise.
> The API key should be kept secure as it provides access to your personal account.

## Actions

### `create_expense`

**Create Expense.** Records a new shared expense in Splitwise under a group, supporting two split modes: split equally among all group members, or split by custom per-user paid/owed shares (each user identified by Splitwise user ID, or by name/email when no ID is known). Use to log a bill an agent needs to track and settle; a group is required and the cost is a string amount (e.g. "25.50"). Not idempotent — each call posts a new expense, so repeating it creates duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `split_type` | string | yes | `"equal_group_split"` | Split Type. How to split the expense. One of `"equal_group_split"`, `"by_shares"`. |
| `cost` | string | yes |  | Cost. Amount (e.g., "25.50") |
| `description` | string | yes |  | Description. Short description of the expense. |
| `details` | string | no |  | Details/Notes. Additional notes about the expense. |
| `date` | ISO date-time string | no |  | Date. Date and time the expense took place. |
| `repeat_interval` | string | no | `"never"` | Repeat Interval. How often to repeat this expense. One of `"never"`, `"weekly"`, `"fortnightly"`, `"monthly"`, `"yearly"`. |
| `currency_code` | string | no | `"USD"` | Currency Code. Currency code (e.g., USD, EUR) |
| `category_id` | string | no |  | Category. Expense category. A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | yes |  | Group. Group to put this expense in (required for equal split) A value the product loads from the provider, such as an id; write the value itself. |
| `users` | array | no |  | Users (Custom Split). Users and their shares for custom split (only used when Split Type is "by_shares") Each item: { `user_id`?, `first_name`?, `last_name`?, `email`?, `paid_share`, `owed_share` }. |
