# PollyBot AI

Automate lead management with PollyBot AI chatbot integration.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pollybot-ai'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect to your PollyBot instance

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | PollyBot API Key. Your API Key starting with `sk-workspace_...`. Find your API Key in your [PollyBot Dashboard Settings](https://pollybot.app/docs/authentication). |
| `chatbotId` | string | yes |  | Chatbot ID. The unique ID for the specific chatbot (e.g., `cmhm6o40a05h8mn12dv3tc456`). Learn more in the [PollyBot Authentication docs](https://pollybot.app/docs/authentication). |

## Actions

### `create_lead`

**Create Lead.** Create a new lead record under the configured PollyBot chatbot. Requires name. Automatically assigns status NEW and priority MEDIUM. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Lead's full name (1-100 characters) |
| `email` | string | no |  | Email. Valid email address. Must be unique for this chatbot. |
| `phone` | string | no |  | Phone. The lead's phone number (maximum 20 characters). |
| `discord` | string | no |  | Discord. The lead's Discord username or handle (maximum 50 characters). |
| `company` | string | no |  | Company. The company or organization name (maximum 100 characters). |
| `message` | string | no |  | Message. The inquiry or message submitted by the lead (maximum 1000 characters). |
| `preferredMethod` | string | no | `"email"` | Preferred Method. The contact method preferred by the lead. One of `"email"`, `"phone"`, `"discord"`. |
| `urgency` | string | no | `"low"` | Urgency. The urgency level reported by the lead. One of `"low"`, `"medium"`, `"high"`. |
| `source` | string | no |  | Source. The origin of the lead (maximum 50 characters, defaults to "api"). |
| `customFields` | JSON | no |  | Custom Fields. Custom data as a valid JSON object (e.g., {"plan": "enterprise"}) |
| `tags` | array | no |  | Tags. Tags attached to the lead (maximum 10 tags, each up to 50 characters). |

### `get_Lead`

**Get Lead.** Fetch a single lead from the configured PollyBot chatbot by its unique lead ID. Use when you already have a lead ID and need its current details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Lead ID. The unique identifier of the lead to retrieve. |

### `update_lead`

**Update Lead.** Update an existing lead in the configured PollyBot chatbot. Replaces provided fields, leaves omitted fields intact. Requires at least one field to change. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Lead ID. The unique ID of the lead to update. |
| `name` | string | no |  | Name. The full name of the lead (1-100 characters). |
| `email` | string | no |  | Email. Valid email address. Must be unique for this chatbot. |
| `phone` | string | no |  | Phone. The lead's phone number (maximum 20 characters). |
| `discord` | string | no |  | Discord. The lead's Discord username or handle (maximum 50 characters). |
| `company` | string | no |  | Company. The company or organization name (maximum 100 characters). |
| `message` | string | no |  | Message. The inquiry or message submitted by the lead (maximum 1000 characters). |
| `preferredMethod` | string | no |  | Preferred Method. The contact method preferred by the lead. One of `"email"`, `"phone"`, `"discord"`. |
| `urgency` | string | no |  | Urgency. The urgency level reported by the lead. One of `"low"`, `"medium"`, `"high"`. |
| `status` | string | no |  | Status. Update the pipeline status of the lead. One of `"NEW"`, `"CONTACTED"`, `"QUALIFIED"`, `"NEGOTIATING"`, `"CONVERTED"`, `"LOST"`, `"UNRESPONSIVE"`. |
| `priority` | string | no |  | Priority. Update the priority level of the lead. One of `"LOW"`, `"MEDIUM"`, `"HIGH"`, `"URGENT"`. |
| `notes` | string | no |  | Notes. Internal notes regarding the lead (maximum 2000 characters). |
| `customFields` | JSON | no |  | Custom Fields. Replaces the stored customFields object entirely. |
| `tags` | array | no |  | Tags. Replaces the stored tags array entirely. |

### `delete_lead`

**Delete Lead.** Permanently delete a lead from the configured PollyBot chatbot by its unique lead ID. Use only when a lead should be removed for good; this cannot be undone. Idempotent on the end state once the lead is gone, though a repeat call on a missing ID may error. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Lead ID. The unique identifier of the lead to delete. |

### `list_leads`

**List Leads.** List leads for the configured PollyBot chatbot. Supports pagination, search, and filtering. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. |
| `limit` | number | no | `50` | Limit. The maximum number of leads to return (max 100) |
| `status` | string | no |  | Status. Filter leads by their current pipeline status. One of `"NEW"`, `"CONTACTED"`, `"QUALIFIED"`, `"NEGOTIATING"`, `"CONVERTED"`, `"LOST"`, `"UNRESPONSIVE"`. |
| `priority` | string | no |  | Priority. Filter leads by their assigned priority level. One of `"LOW"`, `"MEDIUM"`, `"HIGH"`, `"URGENT"`. |
| `search` | string | no |  | Search. Case-insensitive substring search matching name, email, or company. |
| `sortBy` | string | no | `"createdAt"` | Sort By. Field to sort the retrieved leads by. One of `"createdAt"`, `"updatedAt"`, `"name"`, `"email"`, `"status"`, `"priority"`. |
| `sortOrder` | string | no | `"desc"` | Sort Order. Direction to sort results. One of `"desc"`, `"asc"`. |
