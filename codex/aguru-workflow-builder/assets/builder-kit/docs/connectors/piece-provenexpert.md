# ProvenExpert

Collect customer reviews, send survey invitations, and pull rating data from ProvenExpert.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-provenexpert'
  version: '0.1.0'
```

Categories: MARKETING, FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect your ProvenExpert account to access reviews, surveys, and invitations.
>
> **How to get your API credentials:**
> 1. Log in to your [ProvenExpert account](https://www.provenexpert.com/).
> 2. Go to **integrations ** from the left side panel.
> 3.  Copy your **Username** and **API Key**.
> 4. Paste them into the fields below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_id` | string | yes |  | Username. Your ProvenExpert Username. |
| `api_key` | string | yes |  | API Key. Your ProvenExpert API Key. |

## Actions

### `get_rating_summary`

**Get Rating Summary.** Fetches the aggregate rating value and total review count for the authenticated ProvenExpert profile. Use to read a single profile-wide rating score, not individual reviews. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `create_survey_invitation_url`

**Create Survey Invitation URL.** Generates a personalised, one-time-use survey invitation link for a specific survey and recipient email, returning the URL for you to deliver yourself (rather than having ProvenExpert email it). Requires a valid survey code and the recipient email the link is bound to. Not idempotent: each call mints a fresh invitation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `survey_code` | string | yes |  | Survey. Pick the survey to use. Surveys are created in your ProvenExpert account under the Surveys section. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Recipient Email. Email address of the customer who will receive the survey link. The link is tied to this address. |
| `name` | string | no |  | Recipient Name. Optional full name of the recipient. Used to personalise the survey experience. |

### `send_survey_invitation_email`

**Send Survey Invitation Email.** Sends a survey invitation email to one recipient via ProvenExpert, optionally with a custom subject, salutation, and body, and an optional automatic 7-day reminder. Choose this over Create Survey Invitation URL when ProvenExpert should deliver the email itself. Requires a valid survey code and recipient email. Not idempotent: each call dispatches a new email. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `survey_code` | string | yes |  | Survey. Pick the survey to use. Surveys are created in your ProvenExpert account under the Surveys section. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Recipient Email. Email address that should receive the invitation. |
| `name` | string | no |  | Recipient Name. Optional full name of the recipient — used to address them in the email. |
| `subject` | string | no |  | Email Subject. Optional custom subject line for the invitation. Leave empty to use the survey default. |
| `salutation` | string | no |  | Email Salutation. Optional custom greeting line (e.g. "Hi Jane,"). Leave empty to use the survey default. |
| `text` | string | no |  | Email Body. Optional custom message body. Leave empty to use the survey default body. |
| `send_reminder` | boolean | no | `true` | Send 7-day Reminder. When enabled, ProvenExpert sends a reminder email after 7 days if the recipient has not responded. |

### `list_surveys`

**List Surveys.** Lists all surveys on the authenticated ProvenExpert profile, including each survey code, name, active state, and share links. Use to discover available surveys or to resolve a survey code needed by the invitation actions. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_profile`

**Get Profile.** Retrieves the company and contact details (company name, email, address, phone, website, public status) of the authenticated ProvenExpert profile. Use to read account/profile information rather than rating or survey data. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

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
