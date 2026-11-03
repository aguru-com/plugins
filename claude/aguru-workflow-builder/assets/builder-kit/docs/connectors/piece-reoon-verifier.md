# Reoon Email Verifier

Email validation service that cleans invalid, temporary & unsafe email addresses.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-reoon-verifier'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain a Reoon API key, follow these steps:
> 1. Navigate to [API Setting](https://emailverifier.reoon.com/api-settings).
> 2. Click on the **Create New API Key** button.
> 3. Enter a valid title and copy the API key.

## Actions

### `verifyEmail`

**Verify Email.** Validates one email address against the Reoon email verification API, returning deliverability and risk signals (e.g. invalid, disposable, role-based). Choose between a fast Quick mode and a slower, more accurate Power mode. Use for checking a single address before sending; for many addresses use the bulk action instead. Idempotent: a read-only lookup that returns the same result for the same input. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email to verify. |
| `mode` | string | yes | `"power"` | Mode. Verification mode (Power mode is more accurate but a bit slower) One of `"quick"`, `"power"`. |

Output fields:

- `email`: Email (email)
- `domain`: Domain
- `username`: Username
- `status`: Status
- `overall_score`: Overall Score (number)
- `is_valid_syntax`: Valid Syntax (boolean)
- `is_disposable`: Disposable (boolean)
- `is_role_account`: Role Account (boolean)
- `is_free_email`: Free Email Provider (boolean)
- `is_spamtrap`: Spamtrap (boolean)
- `is_forwarded`: Forwarded (boolean)
- `is_catch_all`: Catch-All Domain (boolean)
- `is_disabled`: Disabled (boolean)
- `is_deliverable`: Deliverable (boolean)
- `is_safe_to_send`: Safe To Send (boolean)
- `can_connect_smtp`: Can Connect Via SMTP (boolean)
- `has_inbox_full`: Inbox Full (boolean)
- `mx_accepts_mail`: MX Accepts Mail (boolean)
- `mx_records`: MX Records
- `verification_mode`: Verification Mode

### `bulkEmailVerificationTask`

**Create Bulk Email Verification.** Submits a named batch of email addresses to the Reoon API for asynchronous bulk verification and returns the task identifier used to poll for results later (pair with the Get Bulk Verification Result action). Use when validating many addresses at once rather than one-by-one; emails may be passed as separate entries or comma-separated. Not idempotent: each call creates a new verification task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskName` | string | yes |  | Task Name. Name of the verification task. |
| `emails` | array | yes |  | Emails. Emails to verify (You can also provide multiple emails separated by comma) |

Output fields:

- `status`: Status
- `task_id`: Task ID
- `count_submitted`: Emails Submitted (number)
- `count_processing`: Emails Processing (number)
- `count_rejected_emails`: Emails Rejected (number)
- `count_duplicates_removed`: Duplicates Removed (number)

### `bulkVerificationResult`

**Get Bulk Verification Result.** Fetches the current status and verification results for a previously created bulk email verification task, identified by its task ID (obtained from the Create Bulk Email Verification action). Use to poll for or read back batch results. Idempotent: a read-only lookup that does not change the task. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. Provide the task ID for the bulk verification task. You can fetch this from the `Create Bulk Email Verification` action. |

Output fields:

- `task_id`: Task ID
- `name`: Task Name
- `status`: Status
- `progress_percentage`: Progress Percentage (number)
- `count_total`: Total Emails (number)
- `count_checked`: Emails Checked (number)
- `results`: Results (an object whose keys vary)
- `results.email`: Email (email)
- `results.domain`: Domain
- `results.username`: Username
- `results.status`: Status
- `results.overall_score`: Overall Score (number)
- `results.is_valid_syntax`: Valid Syntax (boolean)
- `results.is_disposable`: Disposable (boolean)
- `results.is_role_account`: Role Account (boolean)
- `results.is_free_email`: Free Email Provider (boolean)
- `results.is_spamtrap`: Spamtrap (boolean)
- `results.is_forwarded`: Forwarded (boolean)
- `results.is_catch_all`: Catch-All Domain (boolean)
- `results.is_disabled`: Disabled (boolean)
- `results.is_deliverable`: Deliverable (boolean)
- `results.is_safe_to_send`: Safe To Send (boolean)
- `results.can_connect_smtp`: Can Connect Via SMTP (boolean)
- `results.has_inbox_full`: Inbox Full (boolean)
- `results.mx_accepts_mail`: MX Accepts Mail (boolean)
- `results.mx_records`: MX Records

### `verify_email_address`

**Verify Email Address.** Verifies a single email address synchronously via Reoon and returns deliverability and risk signals (valid / invalid / disposable / role-based, etc.). Use this for one address at a time and when you need the result immediately; for many addresses use Create Bulk Email Verification instead. Each call consumes Reoon verification credits, and Power mode (more accurate, slower) costs more than Quick mode. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email to verify. |
| `mode` | string | yes | `"power"` | Mode. Verification mode (Power mode is more accurate but a bit slower) One of `"quick"`, `"power"`. |

Output fields:

- `email`: Email (email)
- `domain`: Domain
- `username`: Username
- `status`: Status
- `overall_score`: Overall Score (number)
- `is_valid_syntax`: Valid Syntax (boolean)
- `is_disposable`: Disposable (boolean)
- `is_role_account`: Role Account (boolean)
- `is_free_email`: Free Email Provider (boolean)
- `is_spamtrap`: Spamtrap (boolean)
- `is_forwarded`: Forwarded (boolean)
- `is_catch_all`: Catch-All Domain (boolean)
- `is_disabled`: Disabled (boolean)
- `is_deliverable`: Deliverable (boolean)
- `is_safe_to_send`: Safe To Send (boolean)
- `can_connect_smtp`: Can Connect Via SMTP (boolean)
- `has_inbox_full`: Inbox Full (boolean)
- `mx_accepts_mail`: MX Accepts Mail (boolean)
- `mx_records`: MX Records
- `verification_mode`: Verification Mode

### `create_bulk_email_verification`

**Create Bulk Email Verification.** Submits a named batch of email addresses to Reoon for asynchronous bulk verification and returns a task_id used to poll for results. Use this instead of single-email verify when validating many addresses at once; results are not immediate — afterward call Get Bulk Email Verification Result with the returned task_id. Each address verified consumes Reoon credits. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskName` | string | yes |  | Task Name. Name of the verification task. |
| `emails` | array | yes |  | Emails. Emails to verify (You can also provide multiple emails separated by comma) |

Output fields:

- `status`: Status
- `task_id`: Task ID
- `count_submitted`: Emails Submitted (number)
- `count_processing`: Emails Processing (number)
- `count_rejected_emails`: Emails Rejected (number)
- `count_duplicates_removed`: Duplicates Removed (number)

### `get_bulk_email_verification_result`

**Get Bulk Email Verification Result.** Reads the current status and verification results of a bulk email verification task by its task_id. The task_id is obtained from the Create Bulk Email Verification action (run that first); poll this until the task reports complete. Read-only — does not change the task or consume additional verification credits. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. Provide the task ID for the bulk verification task. You can fetch this from the `Create Bulk Email Verification` action. |

Output fields:

- `task_id`: Task ID
- `name`: Task Name
- `status`: Status
- `progress_percentage`: Progress Percentage (number)
- `count_total`: Total Emails (number)
- `count_checked`: Emails Checked (number)
- `results`: Results (an object whose keys vary)
- `results.email`: Email (email)
- `results.domain`: Domain
- `results.username`: Username
- `results.status`: Status
- `results.overall_score`: Overall Score (number)
- `results.is_valid_syntax`: Valid Syntax (boolean)
- `results.is_disposable`: Disposable (boolean)
- `results.is_role_account`: Role Account (boolean)
- `results.is_free_email`: Free Email Provider (boolean)
- `results.is_spamtrap`: Spamtrap (boolean)
- `results.is_forwarded`: Forwarded (boolean)
- `results.is_catch_all`: Catch-All Domain (boolean)
- `results.is_disabled`: Disabled (boolean)
- `results.is_deliverable`: Deliverable (boolean)
- `results.is_safe_to_send`: Safe To Send (boolean)
- `results.can_connect_smtp`: Can Connect Via SMTP (boolean)
- `results.has_inbox_full`: Inbox Full (boolean)
- `results.mx_accepts_mail`: MX Accepts Mail (boolean)
- `results.mx_records`: MX Records
