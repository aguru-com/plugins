# Lemlist

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lemlist'
  version: '0.1.11'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Lemlist API Key

> 1.Click on your profile picture in the bottom left-hand corner and click on Settings.
> 2.Go to the Integrations tab.
> 3.Click on Generate a new API key.
> 4.Store it securely because you won’t be able to see it again

## Actions

### `markLeadFromOneCampaignAsInterested`

**Mark Lead From One Campaign as Interested.** Sets the "interested" status on a lead within one specific Lemlist campaign, identified by the campaign and the lead's email. Use when you want to flag interest scoped to a single campaign rather than across all of them. Idempotent: re-running leaves the lead in the same interested state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to mark as interested. |

### `markLeadFromOneCampaignAsNotInterested`

**Mark Lead From One Campaign as Not Interested.** Sets the "not interested" status on a lead within one specific Lemlist campaign, identified by the campaign and the lead's email. Use when disqualifying interest scoped to a single campaign rather than across all of them. Idempotent: re-running leaves the lead in the same not-interested state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to mark as not interested. |

### `markLeadFromAllCampaignAsInterested`

**Mark Lead From All Campaign as Interested.** Sets the "interested" status on a lead, identified by email, across every Lemlist campaign the lead belongs to. Use when interest is not campaign-specific; for a single campaign use the per-campaign variant instead. Idempotent: re-running leaves the lead in the same interested state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Lead Email. The email of the lead to mark as interested. |

### `markLeadFromAllCampaignsAsNotInterested`

**Mark Lead From All Campaigns as Not Interested.** Sets the "not interested" status on a lead, identified by email, across every Lemlist campaign the lead belongs to. Use when disqualifying interest globally; for a single campaign use the per-campaign variant instead. Idempotent: re-running leaves the lead in the same not-interested state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Lead Email. The email of the lead to mark as not interested. |

### `pauseLeadFromAllOrSpecificCampaigns`

**Pause Lead From All or Specific Campaigns.** Pauses outreach sequencing for a lead, identified by email. Operates in two modes: supply a campaign to pause the lead only in that campaign, or leave the campaign empty to pause the lead across all campaigns. Idempotent: re-running leaves the lead paused. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | no |  | Campaign. Select a campaign (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to pause. |

### `resumeLeadFromAllOrSpecificCampaigns`

**Resume Lead From All or Specific Campaigns.** Resumes (restarts) outreach sequencing for a previously paused lead, identified by email. Operates in two modes: supply a campaign to resume the lead only in that campaign, or leave the campaign empty to resume across all campaigns. Idempotent: re-running leaves the lead active. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | no |  | Campaign. Select a campaign (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to resume. |

### `removeLeadFromUnsubscribeList`

**Remove Lead From Unsubscribe List.** Removes a lead, identified by email, from the team-wide unsubscribe (do-not-contact) list so they become eligible for outreach again. Use to re-enable contacting a previously unsubscribed lead. Idempotent: re-running leaves the lead off the unsubscribe list. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Lead Email. The email of the lead to remove from the unsubscribe list. |

### `removeLeadFromACampaign`

**Remove Lead from A Campaign.** Removes a lead, identified by email, from one specific Lemlist campaign, stopping their sequence in it. Requires both the campaign and the lead email. Idempotent: re-running on an already-removed lead leaves them absent from the campaign. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to remove. |

### `unsubscribeALead`

**Unsubscribe a Lead.** Unsubscribes a lead, identified by email, from a specific Lemlist campaign, stopping further emails to them in it. Use to honor an opt-out or stop contacting a lead in one campaign; requires both the campaign and the lead email. Idempotent: re-running leaves the lead unsubscribed. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to unsubscribe. |

### `addLeadToACampaign`

**Add Lead To A Campaign.** Adds a lead (by email, with optional name, company, phone, LinkedIn and other details) to a specific Lemlist campaign, optionally running enrichment such as email/phone finding, email verification, or LinkedIn lookup. Use to enroll a new contact into outreach. Not idempotent: each call adds the lead and re-runs requested enrichment unless the deduplicate option is enabled to skip leads already present in any campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to add. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `picture` | string | no |  | Picture URL. |
| `phone` | string | no |  | Phone. |
| `linkedinUrl` | string | no |  | LinkedIn URL. |
| `companyName` | string | no |  | Company Name. |
| `companyDomain` | string | no |  | Company Domain. |
| `icebreaker` | string | no |  | Icebreaker. |
| `jobTitle` | string | no |  | Job Title. |
| `deduplicate` | boolean | no | `false` | Deduplicate. Avoid adding the lead if it already exists in any campaign. |
| `linkedinEnrichment` | boolean | no | `false` | LinkedIn Enrichment. Run LinkedIn enrichment for this lead. |
| `findEmail` | boolean | no | `false` | Find Email. Try to find a verified email for this lead. |
| `verifyEmail` | boolean | no | `false` | Verify Email. Verify the lead’s email using debounce. |
| `findPhone` | boolean | no | `false` | Find Phone. Try to find a phone number for this lead. |

### `addCustomVariablesOnLead`

**Add Custom Variables on Lead.** Creates new custom variables on a specific lead (identified by its Lemlist lead id) and sets each variable’s value for that lead. Variable names must be new — the call fails if a name matches a default field (email, firstName, lastName, picture, phone, linkedinUrl, companyName, companyDomain, icebreaker) or a previously created custom variable. Use to add extra mail-merge fields beyond the standard ones. Not idempotent: re-running with the same variable names returns an error. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `leadId` | string | yes |  | Lead ID. The unique identifier of the lead (e.g. lea_8xJSc7sV7ggpiVnXe). Available as the _id field returned by the Add Lead To A Campaign and Search Lead actions. |
| `customVariables` | object | yes |  | Custom Variables. New custom variables to create on the lead. Each key is the variable name and each value is its content. Names must not match an existing default or custom variable. |

### `updateLeadFromCampaign`

**Update Lead From Campaign.** Updates an existing lead's details (name, company, phone, LinkedIn, icebreaker, job title, etc.) within a specific Lemlist campaign, identified by the campaign and the lead's email. Use to edit profile fields on a lead already enrolled in a campaign. Idempotent: re-applying the same field values yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to update. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `picture` | string | no |  | Picture URL. |
| `phone` | string | no |  | Phone. |
| `linkedinUrl` | string | no |  | LinkedIn URL. |
| `companyName` | string | no |  | Company Name. |
| `companyDomain` | string | no |  | Company Domain. |
| `icebreaker` | string | no |  | Icebreaker. |
| `jobTitle` | string | no |  | Job Title. |

### `searchLead`

**Search Lead.** Looks up a lead by email across the account and returns matching lead records. Operates in two modes: supply a campaign to filter results to that campaign, or leave it empty to return all campaigns the lead belongs to; returns a not-found result when no match exists. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | no |  | Campaign. Select a campaign (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Lead Email. The email of the lead to look up. |
