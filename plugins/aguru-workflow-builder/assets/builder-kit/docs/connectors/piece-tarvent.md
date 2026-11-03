# Tarvent

Tarvent is an email marketing, automation, and email API platform that allows to you to send campaigns, manage contacts, automate your marketing, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tarvent'
  version: '0.1.8'
```

Categories: MARKETING, FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain your Tarvent Account ID and API Key, follow these steps:
>
> 1. Log in to your Tarvent account.
> 2. Go to **Account->API Keys** section.
> 3. **Create an API key** and copy it. Make sure to give it the correct permissions.
> 4. The **Account ID** is available to copy at the top right

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `tarvent_create_contact`

**Create/Update Contact.** Creates a contact in a Tarvent audience, or updates the existing one matched by email/custom identifier; choose whether a duplicate is updated or returns an error, and whether group/tag assignments replace or add to current ones. Use to onboard or maintain a subscriber profile. Not idempotent: it creates on the first call and, in add-only mode, appends to groups/tags. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audienceId` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes | `""` | Email. Enter the contacts email. NOTE: If the audience uses a custom contact identifier and overwrite is enabled, then this will update the FIRST contact that matches the email. |
| `updateAction` | string | yes |  | Update existing contact. Update the contact's profile if it already exists. Otherwise, return the "Duplicate" error. One of `"Update"`, `"ReturnError"`. |
| `groupAction` | string | no |  | Replace existing groups. Select whether to replace or only add to contact groups. NOTE: Add only will only add the contact to the groups they are not already in. Replace will remove the contact from all existing groups and add them to the selected groups. One of `"Replace"`, `"Add"`. |
| `groupIds` | array | no |  | Audience group. Values the product loads from the provider, such as ids; write an array of them. |
| `tagAction` | string | no |  | Replace existing tags. Select whether to replace or only add to contact tags of an existing contact. NOTE: Add only will only add the tags the contact does not already have. Replace will replace all contact tags with the entered tags. One of `"Replace"`, `"Add"`. |
| `tagIds` | array | no |  | Tags. Select which tags you would like to add to the contact. Values the product loads from the provider, such as ids; write an array of them. |
| `firstName` | string | no | `""` | First name. The contacts first name. |
| `lastName` | string | no | `""` | Last name. The contacts last name. |
| `streetAddress` | string | no | `""` | Street address. |
| `streetAddress2` | string | no | `""` | Street address 2. |
| `addressLocality` | string | no | `""` | City (Locality). |
| `addressRegion` | string | no | `""` | State (Region). |
| `postalCode` | string | no | `""` | Zip code (Postal code). |
| `addressCountry` | string | no | `""` | Country. |
| `audienceDataFields` | object | no |  | Data fields. An object whose fields depend on other inputs; the product shows them. |

### `tarvent_update_contact_tag`

**Add/Remove Contact Tag.** Adds or removes one or more tags on a Tarvent contact, with the direction (add vs. remove) chosen by the action input. Use to label or unlabel a contact for segmentation. Idempotent: re-running with the same tags and direction leaves the contact in the same tagged state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audienceId` | string | yes |  | Audience. If specified, the trigger will only fire if contact is in the selected audience. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes | `""` | Contact ID. Find this in the edit contact dialog on the details page. |
| `action` | string | yes | `"Add"` | Tag action. Select whether to add or remove tags. One of `"Add"`, `"remove"`. |
| `tagIds` | array | yes |  | Tags. Enter which tags you would like to add or remove. Values the product loads from the provider, such as ids; write an array of them. |

### `tarvent_update_contact_group`

**Add/Remove Contact From Audience Group.** Adds or removes a Tarvent contact from a specific audience group, with the direction (add vs. remove) chosen by the action input. Use to manage group membership for segmentation. Idempotent: re-running with the same group and direction leaves membership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audienceId` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |
| `groupId` | string | yes |  | Audience group. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes | `""` | Contact ID. Find this in the edit contact dialog on the details page. |
| `action` | string | yes |  | Add or remove. Select whether to add or remove the contact from the group. One of `"Add"`, `"Remove"`. |

### `tarvent_create_contact_note`

**Add Note To Contact.** Appends a free-text note to a Tarvent contact record. Use to log context or activity against a contact. Not idempotent: each call adds another note, so repeating creates duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes | `""` | Contact ID. Find this in the edit contact dialog on the details page. |
| `note` | string | yes |  | Note. Enter the note you would like to add to the contact. |

### `tarvent_update_contact_journey`

**Add/Remove A Contact From A Journey.** Enrolls a Tarvent contact into an automation journey or removes them from it, with the direction (add vs. remove) chosen by the action input. Use to start or stop a contact in an automated flow. Not idempotent on add: re-adding can re-enter the contact and re-run journey steps. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes | `""` | Contact ID. Find this in the edit contact dialog on the details page. |
| `journeyId` | string | yes |  | Journey. Select which journey to start or stop. A value the product loads from the provider, such as an id; write the value itself. |
| `action` | string | yes |  | Add or remove. Select whether to add or remove the contact from the journey. One of `"Add"`, `"Remove"`. |

### `tarvent_update_contact_status`

**Subscribe/Unsubscribe Contact From Audience.** Sets a Tarvent contact's subscription status to subscribed (active) or unsubscribed (opt-out), chosen by the action input. Use to manage consent or suppression for a contact. Idempotent: it sets an absolute status, so repeating with the same value yields the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes | `""` | Contact ID. Find this in the edit contact dialog on the details page. |
| `action` | string | yes |  | Status. Select whether to subscribe or unsubscribe the contact. One of `"ACTIVE"`, `"OPT_OUT"`. |

### `tarvent_create_audience_group`

**Create An Audience Group.** Creates a new group within a Tarvent audience, optionally marked public so it appears as a question on forms. Use to set up a segment before assigning contacts to it. Not idempotent: each call creates another group, even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audienceId` | string | yes |  | Audience. Audience to create the group in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes | `""` | Group name. Enter the group name. (100 character limit) |
| `description` | string | no | `""` | Group description. Use the description to describe what the group is for. NOTE: If the group is public this description will show up in forms that have the groups question. |
| `isPublic` | string | yes |  | Public group. Select whether the group is public or not. Public groups are shown in forms with the groups question. One of `"true"`, `"false"`. |

### `tarvent_update_journey_status`

**Start/Stop Journey.** Starts or stops a Tarvent automation journey, with the direction chosen by the action input. Use to activate or pause an entire journey (not an individual contact). Idempotent: it sets the journey to a target run state, so repeating with the same value has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `journeyId` | string | yes |  | Journey. Select which journey to start or stop. A value the product loads from the provider, such as an id; write the value itself. |
| `action` | string | yes |  | Action. Select whether to start or stop the journey. One of `"Start"`, `"Stop"`. |

### `tarvent_create_transaction`

**Send A Transactional Email.** Sends a one-off transactional email through Tarvent to a specified recipient (with optional CC/BCC), using either an existing template or inline HTML/plain-text content with merge variables. Use for individual triggered messages such as receipts or confirmations, not bulk campaigns. Consumes email API credits and sends on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupName` | string | no |  | Transaction group name. Choose an existing group name or use "Custom" to enter a new group name. This name is used for reporting. A value the product loads from the provider, such as an id; write the value itself. |
| `fromEmail` | string | yes | `""` | From email. Enter who this transaction is from. |
| `fromName` | string | no | `""` | From name. Enter a friendly name for who this transaction is from. |
| `toEmail` | string | yes | `""` | To email. Enter the email that the transaction should be sent to. |
| `ccEmail` | array | no | `[]` | CC Emails. Enter emails that this transaction should be CC'd to. Each item: { `email`? }. |
| `bccEmail` | array | no | `[]` | BCC Emails. Enter emails that this transaction should be BCC'd to. Each item: { `email`? }. |
| `subject` | string | yes | `""` | Subject line. Enter a subject line for the transaction. |
| `replyToEmail` | string | yes | `""` | Reply to email. Enter the email that the replies should go to. |
| `replyToName` | string | no | `""` | Reply to name. Enter a friendly name the replies should go to. |
| `variables` | object | no | `""` | Variables. NOTE: Variable names (first column) can have Letters, numbers, underscores, and hyphens. Any other characters in the first column only will be removed. |
| `templateId` | string | no |  | Template. Select which template you'd like to used for this transaction. A value the product loads from the provider, such as an id; write the value itself. |
| `mimeType` | string | no |  | Message type. If "Template" is specified, this will be ignored.. One of `"HTML"`, `"TEXT"`. |
| `content` | string | no |  | Content. To merge in variables, you must use the syntax [[Tx.VariableData.VariableName]] (ex. Variable name is FirstName, merge syntax would be [[Tx.VariableData.FirstName]]) If "Template" is specified, this will be ignored. |
| `ignoreSuppressCheck` | string | yes | `"false"` | Ignore suppression filters. Select if the suppression filters on your account should be ignored for this transaction. One of `"true"`, `"false"`. |

### `tarvent_send_campaign`

**Send Campaign.** Triggers Tarvent to send a copy of an existing, fully configured campaign to its audience. Use to dispatch a prepared campaign; the campaign must already have its from address, subject, and content set up. Not idempotent: each call sends the campaign again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select which campaign to send. **NOTE:** Make sure all campaign settings are correct (from, subject, content) before configuring this automation. A value the product loads from the provider, such as an id; write the value itself. |

### `tarvent_generate_custom_event`

**Generate A Custom Event.** Fires a predefined custom event in Tarvent for a specific contact, which can drive journeys and automations listening for that event. Use to signal that a contact performed a tracked action. Not idempotent: each call emits another event occurrence. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customEventId` | string | yes |  | Custom event. A value the product loads from the provider, such as an id; write the value itself. |
| `contactId` | string | yes | `""` | Contact ID. Find this in the edit contact dialog on the details page. |

### `tarvent_get_audiences`

**Find Audience.** Searches Tarvent audiences, optionally filtered by name and/or comma-separated tags; leaving the filters empty returns all audiences. Use to look up an audience or its ID before acting on contacts. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no | `""` | Audience name. Find an audience by searching using its name. |
| `tags` | string | no | `""` | Audience tags. Find an audience by searching using its tags. To search using multiple tags, separate the tags with a comma. |

### `tarvent_get_audience_groups`

**Find Audience Group.** Searches the groups within a given Tarvent audience, optionally filtered by name; leaving the name empty returns all groups in that audience. Use to look up a group or its ID before assigning contacts. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audienceId` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no | `""` | Audience name. Find an audience by searching using its name. |

### `tarvent_create_suppression_filter`

**Add Contact To Suppression List.** Adds an email address to the Tarvent account-level suppression list so it is blocked from future sends, with an optional reason. Use to permanently stop messaging a specific address. Not idempotent: each call creates another suppression filter record. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes | `""` | Email address. Enter the email to add to the suppression list. |
| `reason` | string | no | `""` | Suppression reason. Use the description to describe why this contact is being suppressed. |

### `tarvent_get_campaigns`

**Find Campaign.** Searches Tarvent campaigns, optionally filtered by name, comma-separated tags, and/or status (sent, draft, scheduled, paused, etc.); leaving the filters empty returns all campaigns. Use to look up a campaign or its ID, e.g. before sending it. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no | `""` | Campaign name. Find a campaign by searching using its name. |
| `tags` | string | no | `""` | Campaign tags. Find a campaign by searching using its tags. To search using multiple tags, separate the tags with a comma. |
| `status` | string | no |  | Campaign status. One of `"COMPLETED"`, `"READY_TO_SEND"`, `"NOT_SCHEDULED"`, `"PENDING"`, `"Paused"`, `"STOPPED"`, `"SENDING_PENDING_AB_WINNER"`. |

### `tarvent_get_contact`

**Find Contact.** Looks up a contact within a Tarvent audience by email (the audience's key field). Use to retrieve a contact or its ID before acting on it. If the audience uses a custom identifier, this returns the first contact matching the email, so target a specific record by ID when precision matters. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audienceId` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes | `""` | Contact email. Search for a contact by email. If the audience uses a custom contact identifier, then the search returns the FIRST contact that matches the email address. To target a specific contact, please use the contact's ID. |

### `tarvent_get_custom_event`

**Find Custom Event.** Searches the custom event definitions in a Tarvent account, optionally filtered by name; leaving the name empty returns all custom events. Use to look up a custom event or its ID before generating it for a contact. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no | `""` | Custom event name. Find a custom event by searching using its name. |

### `tarvent_get_journey`

**Find Journey.** Searches Tarvent automation journeys, optionally filtered by name, comma-separated tags, and/or run status (running or not running); leaving the filters empty returns all journeys. Use to look up a journey or its ID before starting/stopping it or enrolling contacts. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no | `""` | Journey name. Find a journey by searching using its name. |
| `tags` | string | no | `""` | Journey tags. Find a journey by searching using its tags. To search using multiple tags, separate the tags with a comma. |
| `status` | string | no |  | Journey status. One of `"RUNNING"`, `"NOT_RUNNING"`. |
