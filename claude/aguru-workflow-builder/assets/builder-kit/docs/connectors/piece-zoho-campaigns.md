# Zoho Campaigns

Zoho Campaigns is an email marketing platform for managing mailing lists, sending campaigns, tracking engagement, and automating subscriber workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zoho-campaigns'
  version: '0.2.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Zoho Campaigns account using OAuth2

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes |  | Data Center. The data center location of your Zoho Campaigns account. One of `"zoho.com"`, `"zoho.eu"`, `"zoho.in"`, `"zoho.com.au"`, `"zoho.jp"`, `"zoho.com.cn"`. |

## Actions

### `createCampaign`

**Create Campaign.** Creates a new draft email campaign in Zoho Campaigns with the given name, subject, sender name/address, topic, and target mailing list(s). Use to set up a campaign before sending or cloning it. Not idempotent: each call creates a separate campaign even with identical inputs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignname` | string | yes |  | Campaign Name. A name to your campaign. |
| `from_email` | string | yes |  | From Email. Sender email address for the campaign. |
| `subject` | string | yes |  | Subject. The subject line of the campaign. |
| `list_details` | array | yes |  | Mailing Lists. Select the mailing lists. Values the product loads from the provider, such as ids; write an array of them. |
| `content_url` | string | no |  | Content URL. Public URL containing the HTML content for your campaign. |
| `topicId` | string | no |  | Topic. Select the topic. A value the product loads from the provider, such as an id; write the value itself. |

### `cloneCampaign`

**Clone Campaign.** Duplicates an existing Zoho Campaigns campaign (identified by its campaign key) into a new draft, optionally overriding name, subject, sender name/address, reply-to, and encoding. Use to reuse a prior campaign as a starting point. Not idempotent: each call produces a new campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignkey` | string | yes |  | Campaign. Select the campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `campaignname` | string | no |  | Campaign Name. New name for the cloned campaign. |
| `subject` | string | no |  | Subject. New subject line for the cloned campaign. |
| `from_name` | string | no |  | From Name. Sender name for the cloned campaign. |
| `from_add` | string | no |  | From Email. Sender email address for the cloned campaign. |
| `reply_to` | string | no |  | Reply-To Email. Reply-to email address for the cloned campaign. |
| `encode_type` | string | no |  | Encoding Type. Email encoding type (e.g., UTF-8) |

### `sendCampaign`

**Send Campaign.** Sends an existing draft campaign (identified by its campaign key) to its configured mailing list recipients. Use after a campaign has been created or cloned and is ready to go out. Not idempotent and has an irreversible side effect: it dispatches email to subscribers. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignkey` | string | yes |  | Campaign. Select the campaign. A value the product loads from the provider, such as an id; write the value itself. |

### `addUpdateContact`

**Add/Update Contact.** Adds a contact to a mailing list or updates the existing contact matched by email, setting standard and custom fields. Use to create or keep a subscriber record current. Effectively an upsert keyed on email, so repeating with the same input converges to the same state and is idempotent; note a confirmation email may be sent depending on the list settings. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listkey` | string | yes |  | Mailing List. Select the mailing list. A value the product loads from the provider, such as an id; write the value itself. |
| `contactinfo` | object | yes |  | Contact Information. Information about the contact. An object whose fields depend on other inputs; the product shows them. |
| `source` | string | no |  | Source. Contact source can be added. |
| `topic_id` | string | no |  | Topic. Select the topic. A value the product loads from the provider, such as an id; write the value itself. |

### `addTagToContact`

**Add Tag to Contact.** Applies a tag to a contact identified by email address, first creating the tag in the account if it does not already exist. Use to label or segment a subscriber. Idempotent: re-applying the same tag to the same contact leaves the contact in the same tagged state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tagName` | string | yes |  | Tag. Select the tag to associate with the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `lead_email` | string | yes |  | Contact Email. Email address of the contact to tag. |

### `removeTag`

**Remove Tag.** Removes a tag from a contact. Use to unlabel or de-segment a subscriber. Idempotent: once the tag is gone, repeating the call leaves the contact in the same untagged state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tagName` | string | yes |  | Tag. Select the tag to associate with the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `lead_email` | string | yes |  | Contact Email. Email address of the contact to remove the tag from. |

### `unsubscribeContact`

**Unsubscribe Contact.** Unsubscribes a contact (matched by email) from a specified mailing list, optionally scoped to a particular topic. Use to opt a subscriber out of a list or topic. Idempotent: an already-unsubscribed contact stays unsubscribed on repeat calls. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listkey` | string | yes |  | Mailing List. Select the mailing list. A value the product loads from the provider, such as an id; write the value itself. |
| `contactinfo` | object | yes |  | Contact Information. Information about the contact. An object whose fields depend on other inputs; the product shows them. |
| `topic_id` | string | no |  | Topic. Select the topic. A value the product loads from the provider, such as an id; write the value itself. |

### `addContactToMailingList`

**Add Contact to Mailing List.** Adds one or more contacts (by email address) to a specified mailing list. Use to subscribe known emails in bulk to a list. Idempotent: re-adding emails already on the list leaves the membership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listkey` | string | yes |  | Mailing List. Select the mailing list. A value the product loads from the provider, such as an id; write the value itself. |
| `emails` | array | yes |  | Emails. Contacts email addresses to be added to the mailing list (maximum 10 emails) |

### `findContact`

**Find Contact.** Searches subscribers of a given mailing list and returns those whose email contains the supplied value (case-insensitive partial match); an empty email value effectively returns all contacts in the list, optionally filtered by subscription status and paginated. Use to resolve a contact or browse list members. Read-only and idempotent; throws if no contact matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listkey` | string | yes |  | Mailing List. Select the mailing list. A value the product loads from the provider, such as an id; write the value itself. |
| `contactEmail` | string | yes |  | Contact Email. Email of the contact to be found (partial matches supported) |
| `status` | string | yes |  | Contact Status. Filter contacts by status. One of `"active"`, `"recent"`, `"most recent"`, `"unsub"`, `"bounce"`. |
| `sort` | string | yes |  | Sort Order. Sort order for results. One of `"asc"`, `"desc"`. |
| `fromindex` | number | no |  | From Index. Starting index for pagination (optional, default: 1) |
| `range` | number | no |  | Range. Number of contacts to retrieve (optional, default: all) |

### `findCampaign`

**Find Campaign.** Searches recent campaigns in the account and returns those whose name contains the supplied value (case-insensitive partial match); an empty name effectively returns all campaigns, optionally filtered by status and paginated. Use to resolve a campaign key or browse campaigns. Read-only and idempotent; throws if no campaign matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignName` | string | yes |  | Campaign Name. Name of the campaign to be found (partial matches supported) |
| `status` | string | no |  | Campaign Status. Filter campaigns by status (optional) One of `"all"`, `"all campaigns"`, `"drafts"`, `"scheduled"`, `"inprogress"`, `"sent"`, `"stopped"`, `"canceled"`, `"tobereviewed"`, `"reviewed"`, `"paused"`, `"intesting"`. |
| `sort` | string | no |  | Sort Order. Sort order for results (optional) One of `"asc"`, `"desc"`. |
| `fromindex` | number | no |  | From Index. Starting index for pagination (optional, default: 1) |
| `range` | number | no |  | Range. Number of campaigns to retrieve (optional, default: 5) |

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
