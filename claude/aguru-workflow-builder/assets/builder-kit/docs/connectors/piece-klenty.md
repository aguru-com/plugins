# Klenty

Sales engagement platform for managing prospects and adding them to outreach cadences.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-klenty'
  version: '0.1.0'
```

Categories: SALES_AND_CRM, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **Generating Klenty API Key**
>
> To access the Klenty REST APIs, you need to authenticate your requests using the Klenty API Key.
>
> 1. Login to your Klenty account.
> 2. Go to **Settings → Integrations → Klenty API Key**.
> 3. Click on the key icon to generate an API Key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username / Email. The Klenty username or email used in the API URL path (for example: you@company.com). |
| `apiKey` | string | yes |  | API Key. Your Klenty API key. |

## Actions

### `create_prospect`

**Create Prospect.** Creates a new prospect (contact) in Klenty from an email and first name plus optional contact fields. Use to add a lead to a Klenty account before enrolling them in outreach. Not idempotent: each call posts a new prospect, so repeating it may create duplicates — to modify an existing prospect use Update Prospect instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `firstName` | string | yes |  | First Name. |
| `company` | string | no |  | Company. |
| `fullName` | string | no |  | Full Name. |
| `lastName` | string | no |  | Last Name. |
| `middleName` | string | no |  | Middle Name. |
| `account` | string | no |  | Account. |
| `department` | string | no |  | Department. |
| `companyDomain` | string | no |  | Company Domain. |
| `title` | string | no |  | Title. |
| `location` | string | no |  | Location. |
| `phone` | string | no |  | Phone. |
| `twitterId` | string | no |  | Twitter ID. |
| `companyPhone` | string | no |  | Company Phone. |
| `companyEmail` | string | no |  | Company Email. |
| `linkedinURL` | string | no |  | LinkedIn URL. |
| `city` | string | no |  | City. |
| `country` | string | no |  | Country. |
| `listName` | string | no |  | List. Select a Klenty list. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | string | no |  | Tags. Pipe-separated tag names, for example: Tag1\|Tag2. |
| `outcome` | string | no |  | Outcome. Klenty outcome value. Case-sensitive. |
| `owner` | string | no |  | Owner. Email address of the Klenty user to assign as prospect owner. |
| `customFields` | array | no |  | Custom Fields. Key/value pairs to send in Klenty CustomFields. Each item: { `key`, `value`? }. |

### `update_prospect`

**Update Prospect.** Updates an existing Klenty prospect identified by their current email address, overwriting the supplied contact fields (including optionally a new email). Use to edit a known prospect's details rather than create one. Idempotent: the prospect is keyed on the current email, so repeating the call with the same input yields the same record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currentEmail` | string | yes |  | Current Prospect Email. The current email used to identify the prospect in Klenty. |
| `email` | string | no |  | New Email. |
| `firstName` | string | no |  | First Name. |
| `company` | string | no |  | Company. |
| `fullName` | string | no |  | Full Name. |
| `lastName` | string | no |  | Last Name. |
| `middleName` | string | no |  | Middle Name. |
| `account` | string | no |  | Account. |
| `department` | string | no |  | Department. |
| `companyDomain` | string | no |  | Company Domain. |
| `title` | string | no |  | Title. |
| `location` | string | no |  | Location. |
| `phone` | string | no |  | Phone. |
| `twitterId` | string | no |  | Twitter ID. |
| `companyPhone` | string | no |  | Company Phone. |
| `companyEmail` | string | no |  | Company Email. |
| `linkedinURL` | string | no |  | LinkedIn URL. |
| `city` | string | no |  | City. |
| `country` | string | no |  | Country. |
| `listName` | string | no |  | List. Select a Klenty list. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | string | no |  | Tags. Pipe-separated tag names, for example: Tag1\|Tag2. |
| `outcome` | string | no |  | Outcome. Klenty outcome value. Case-sensitive. |
| `owner` | string | no |  | Owner. Email address of the Klenty user to assign as prospect owner. |
| `customFields` | array | no |  | Custom Fields. Key/value pairs to send in Klenty CustomFields. Each item: { `key`, `value`? }. |

### `get_prospect`

**Get Prospect by Email.** Looks up a single Klenty prospect by exact email address and returns their record, throwing an error if no prospect matches. Use to read or verify a prospect before updating or enrolling them. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address of the prospect to find. |

### `add_prospect_to_campaign`

**Add Prospect to Campaign.** Enrolls a prospect (by email) into a named Klenty cadence/campaign, starting the outreach sequence for them. Use to kick off automated emails to an existing prospect; the prospect should already exist in Klenty and the cadence name must match one configured in the account. Not idempotent: it triggers cadence enrollment as an outbound side effect on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Prospect Email. |
| `cadenceName` | string | yes |  | Cadence. Select a Klenty cadence. A value the product loads from the provider, such as an id; write the value itself. |

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
