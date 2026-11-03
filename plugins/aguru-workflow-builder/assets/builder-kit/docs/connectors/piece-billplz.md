# Billplz

Create and manage bills and collections with Billplz API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-billplz'
  version: '0.0.9'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Secret Key

> Enter your Billplz API Secret Key. You can find this in your Billplz account settings.

## Actions

### `create_bill`

**Create Bill.** Creates a new Billplz bill (payment request) inside a given collection, charging a recipient identified by email and/or mobile for an amount in Malaysian Ringgit. Either email or mobile is required, along with a recipient name, description, and callback URL; optionally set a due date, redirect URL, and reference fields. Enabling the deliver option sends the recipient an email/SMS notification. Not idempotent: each call creates a distinct bill and may dispatch a notification. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection. Select the collection to create the bill in. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. Recipient email address (required if mobile not provided) |
| `mobile` | string | no |  | Mobile Number. Recipient mobile number with country code (required if email not provided) |
| `name` | string | yes |  | Recipient Name. Name of the bill recipient. |
| `amount` | number | yes |  | Amount (RM). Amount in Malaysian Ringgit (e.g., 2.00 for RM 2.00) |
| `description` | string | yes |  | Description. Bill description that will be displayed on the bill. |
| `callback_url` | string | yes |  | Callback URL. Webhook URL to receive payment completion notifications. |
| `due_at` | string | no |  | Due Date. Due date in YYYY-MM-DD format (optional, defaults to today) |
| `redirect_url` | string | no |  | Redirect URL. URL to redirect customer after payment completion. |
| `deliver` | boolean | no | `false` | Send Email/SMS. Automatically send email and SMS notification to recipient. |
| `reference_1_label` | string | no | `"Reference 1"` | Reference 1 Label. Label for first reference field. |
| `reference_1` | string | no |  | Reference 1 Value. Value for first reference field. |
| `reference_2_label` | string | no | `"Reference 2"` | Reference 2 Label. Label for second reference field. |
| `reference_2` | string | no |  | Reference 2 Value. Value for second reference field. |

### `get_bill`

**Get Bill.** Looks up a single Billplz bill by its bill ID, returning its details and payment status. Use to check whether a bill has been paid or to fetch its current state. Requires a known bill ID. Idempotent: a read-only lookup with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bill_id` | string | yes |  | Bill ID. The ID of the bill to retrieve. |
