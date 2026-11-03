# Mailjet

Email delivery service for sending transactional and marketing emails

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mailjet'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> Connect with a Mailjet API key and secret key.
>
> 1. Log in to [Mailjet](https://app.mailjet.com).
> 2. Open **Account settings** → **REST API** → **API Key Management (Primary and Sub-account)**, or go straight to [API keys](https://app.mailjet.com/account/apikeys).
> 3. Copy the **API Key** and the **Secret Key** and paste them below. If the secret is hidden, use **Generate Secret Key** and copy the new one.

## Actions

### `send_email`

**Send Email.** Sends an email to one or more recipients via the Mailjet transactional send API. Supply the body inline as plain text and/or HTML, or set a Mailjet template ID to render a predefined template with optional variables. Use when delivering a notification, alert, or transactional message; the sender address must be a verified Mailjet sender. Not idempotent — each call dispatches a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromEmail` | string | yes |  | From (Email). Sender email, must be verified in Mailjet. |
| `fromName` | string | no |  | From (Name). |
| `toEmails` | array | yes |  | Emails of recipients. |
| `subject` | string | yes |  | Subject. |
| `textPart` | string | no |  | Text part. |
| `htmlPart` | string | no |  | HTML part. |
| `templateId` | number | no |  | Template Id. Template Id (number) defined in Mailjet. |
| `templateVariables` | object | no |  | Template variables. |

Output fields:

- `Status`: Status
- `CustomID`: Custom ID
- `To`: To
- `To[].Email`: Email (email)
- `To[].MessageUUID`: Message UUID
- `To[].MessageID`: Message ID
- `To[].MessageHref`: Message Href (url)
- `Cc`: Cc
- `Bcc`: Bcc

### `mailjet_get_profile`

**Get Profile.** Gets the company profile of the account (company name, address, contact details). Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `Count`: Count (number)
- `Data`: Profiles
- `Data[].AddressCity`: Address City
- `Data[].AddressCountry`: Address Country
- `Data[].AddressPostalCode`: Address Postal Code
- `Data[].AddressState`: Address State
- `Data[].AddressStreet`: Address Street
- `Data[].BillingEmail`: Billing Email
- `Data[].BirthdayAt`: Birthday At
- `Data[].CompanyName`: Company Name
- `Data[].CompanyNumOfEmployees`: Company Num Of Employees
- `Data[].ContactPhone`: Contact Phone
- `Data[].EstimatedVolume`: Estimated Volume (number)
- `Data[].Features`: Features
- `Data[].Firstname`: Firstname
- `Data[].ID`: ID (number)
- `Data[].Industry`: Industry
- `Data[].JobTitle`: Job Title
- `Data[].Lastname`: Lastname
- `Data[].UserID`: User ID (number)
- `Data[].VAT`: VAT (number)
- `Data[].VATNumber`: VATNumber
- `Data[].Website`: Website
- `Total`: Total (number)

### `mailjet_get_user`

**Get User.** Gets the user of the account (email, locale, timezone, creation date). Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `Count`: Count (number)
- `Data`: Users
- `Data[].ACL`: ACL
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Email`: Email (email)
- `Data[].FirstIp`: First IP
- `Data[].ID`: ID (number)
- `Data[].LastIp`: Last IP
- `Data[].LastLoginAt`: Last Login At (datetime)
- `Data[].Locale`: Locale
- `Data[].MaxAllowedAPIKeys`: Max Allowed APIKeys (number)
- `Data[].Timezone`: Timezone
- `Data[].Username`: Username
- `Data[].WarnedRatelimitAt`: Warned Ratelimit At
- `Total`: Total (number)

### `mailjet_cancel_campaign_draft_schedule`

**Cancel Campaign Draft Schedule.** Cancels the schedule of a campaign draft so it goes back to draft state. The draft itself is kept. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_create_campaign_draft`

**Create Campaign Draft.** Creates a marketing campaign draft for a contact list. Set its content with Set Campaign Draft Content, then send it with Send Campaign Draft or schedule it with Schedule Campaign Draft. Sender Email must be a validated sender. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. Subject line of the campaign. |
| `locale` | string | yes |  | Locale. Locale of the campaign, e.g. "en_US". |
| `contactsListId` | number | no |  | Contact List ID. Numeric ID of the list to send to, from List Contact Lists. Required before sending. |
| `senderId` | string | no |  | Sender ID. Numeric ID of the validated sender, from List Senders. Needed to reschedule the draft with Update Campaign Draft Schedule. |
| `senderEmail` | string | no |  | Sender Email. Validated sender address. Required before sending. |
| `senderName` | string | no |  | Sender Name. Sender display name. |
| `title` | string | no |  | Title. Internal title of the draft. |
| `replyEmail` | string | no |  | Reply-To Email. Address replies go to. |
| `segmentationId` | number | no |  | Segment ID. Optional segment, from List Segments, to target part of the list. |
| `templateId` | number | no |  | Template ID. Optional template the draft is based on: the ExternalID field from Get Template or List Templates, not their ID field. |
| `editMode` | string | no |  | Edit Mode. Editor of the content: tool2 (drag and drop), html2 (HTML) or mjml. One of `"tool2"`, `"html2"`, `"mjml"`. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaign Drafts
- `Data[].AXFraction`: A/B Test Fraction (number)
- `Data[].AXFractionName`: A/B Test Fraction Name
- `Data[].ContactsListID`: Contacts List ID (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Current`: Current (number)
- `Data[].DeliveredAt`: Delivered At (datetime)
- `Data[].EditMode`: Edit Mode
- `Data[].ID`: ID (number)
- `Data[].IsCampaignTemplate`: Is Campaign Template (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].IsTextPartIncluded`: Is Text Part Included (boolean)
- `Data[].Locale`: Locale
- `Data[].ModifiedAt`: Modified At
- `Data[].Preset`: Preset
- `Data[].ReplyEmail`: Reply Email (email)
- `Data[].SegmentationID`: Segmentation ID (number)
- `Data[].Sender`: Sender
- `Data[].SenderEmail`: Sender Email (email)
- `Data[].SenderName`: Sender Name
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].Title`: Title
- `Data[].Url`: URL (url)
- `Data[].Used`: Used (boolean)
- `Data[].VarCount`: Var Count (number)
- `Data[].TemplateID`: Template ID (number)
- `Total`: Total (number)

### `mailjet_get_campaign`

**Get Campaign.** Gets a sent campaign by its numeric ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign ID. Numeric campaign ID, from List Campaigns. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaigns
- `Data[].CampaignType`: Campaign Type (number)
- `Data[].ClickTracked`: Click Tracked (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].CustomValue`: Custom Value
- `Data[].FirstMessageID`: First Message ID
- `Data[].FromEmail`: From Email (email)
- `Data[].FromID`: From ID (number)
- `Data[].FromName`: From Name
- `Data[].HasHtmlCount`: Has HTML Count (number)
- `Data[].HasTxtCount`: Has Txt Count (number)
- `Data[].ID`: ID (number)
- `Data[].IsDeleted`: Is Deleted (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].ListID`: List ID (number)
- `Data[].NewsLetterID`: Campaign Draft ID (number)
- `Data[].OpenTracked`: Open Tracked (number)
- `Data[].SegmentationID`: Segmentation ID (number)
- `Data[].SendEndAt`: Send End At (datetime)
- `Data[].SendStartAt`: Send Start At (datetime)
- `Data[].SpamassScore`: SpamAssassin Score (number)
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].UnsubscribeTrackedCount`: Unsubscribe Tracked Count (number)
- `Total`: Total (number)

### `mailjet_get_campaign_draft`

**Get Campaign Draft.** Gets a campaign draft by its numeric ID, including its list, sender, subject and status. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaign Drafts
- `Data[].AXFraction`: A/B Test Fraction (number)
- `Data[].AXFractionName`: A/B Test Fraction Name
- `Data[].ContactsListID`: Contacts List ID (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Current`: Current (number)
- `Data[].DeliveredAt`: Delivered At (datetime)
- `Data[].EditMode`: Edit Mode
- `Data[].ID`: ID (number)
- `Data[].IsCampaignTemplate`: Is Campaign Template (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].IsTextPartIncluded`: Is Text Part Included (boolean)
- `Data[].Locale`: Locale
- `Data[].ModifiedAt`: Modified At
- `Data[].Preset`: Preset
- `Data[].ReplyEmail`: Reply Email (email)
- `Data[].SegmentationID`: Segmentation ID (number)
- `Data[].Sender`: Sender
- `Data[].SenderEmail`: Sender Email (email)
- `Data[].SenderName`: Sender Name
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].Title`: Title
- `Data[].Url`: URL (url)
- `Data[].Used`: Used (boolean)
- `Data[].VarCount`: Var Count (number)
- `Data[].TemplateID`: Template ID (number)
- `Total`: Total (number)

### `mailjet_get_campaign_draft_content`

**Get Campaign Draft Content.** Gets the HTML, text and MJML content and headers of a campaign draft. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |

Output fields:

- `Count`: Count (number)
- `Data`: Content
- `Data[].Html-part`: HTML Part
- `Data[].Text-part`: Text Part
- `Total`: Total (number)

### `mailjet_get_campaign_draft_schedule`

**Get Campaign Draft Schedule.** Gets the scheduled date and status of a campaign draft. Returns a 404 error when the draft is not scheduled. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |

Output fields:

- `Count`: Count (number)
- `Data`: Schedule
- `Data[].Date`: Date (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_get_campaign_draft_status`

**Get Campaign Draft Status.** Gets the sending status of a campaign draft after Send Campaign Draft or Schedule Campaign Draft. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |

Output fields:

- `Count`: Count (number)
- `Data`: Status
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_list_campaign_drafts`

**List Campaign Drafts.** Lists campaign drafts with their IDs, subjects, lists and status. Filter by contact list, campaign or status. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactsListId` | number | no |  | Contact List ID. Only drafts for this list. |
| `campaignId` | number | no |  | Campaign ID. Only the draft of this sent campaign. |
| `status` | number | no |  | Status. Draft status code: 0 draft, 1 programmed, 2 sent, -1 archived, -2 deleted. |
| `isArchived` | string | no |  | Archived. Yes for archived drafts only. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaign Drafts
- `Data[].AXFraction`: A/B Test Fraction (number)
- `Data[].AXFractionName`: A/B Test Fraction Name
- `Data[].ContactsListID`: Contacts List ID (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Current`: Current (number)
- `Data[].DeliveredAt`: Delivered At (datetime)
- `Data[].EditMode`: Edit Mode
- `Data[].ID`: ID (number)
- `Data[].IsCampaignTemplate`: Is Campaign Template (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].IsTextPartIncluded`: Is Text Part Included (boolean)
- `Data[].Locale`: Locale
- `Data[].ModifiedAt`: Modified At
- `Data[].Preset`: Preset
- `Data[].ReplyEmail`: Reply Email (email)
- `Data[].SegmentationID`: Segmentation ID (number)
- `Data[].Sender`: Sender
- `Data[].SenderEmail`: Sender Email (email)
- `Data[].SenderName`: Sender Name
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].Title`: Title
- `Data[].Url`: URL (url)
- `Data[].Used`: Used (boolean)
- `Data[].VarCount`: Var Count (number)
- `Data[].TemplateID`: Template ID (number)
- `Total`: Total (number)

### `mailjet_list_campaigns`

**List Campaigns.** Lists sent campaigns (marketing and transactional groups) with their IDs and send dates. Filter by contact list, custom campaign name or deleted/starred state. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactsListId` | number | no |  | Contact List ID. Only campaigns sent to this list. |
| `customCampaign` | string | no |  | Custom Campaign. Only the campaign with this custom name. |
| `isStarred` | string | no |  | Starred. Yes for starred campaigns only. One of `true`, `false`. |
| `isDeleted` | string | no |  | Deleted. Yes for deleted campaigns only. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaigns
- `Data[].CampaignType`: Campaign Type (number)
- `Data[].ClickTracked`: Click Tracked (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].CustomValue`: Custom Value
- `Data[].FirstMessageID`: First Message ID
- `Data[].FromEmail`: From Email (email)
- `Data[].FromID`: From ID (number)
- `Data[].FromName`: From Name
- `Data[].HasHtmlCount`: Has HTML Count (number)
- `Data[].HasTxtCount`: Has Txt Count (number)
- `Data[].ID`: ID (number)
- `Data[].IsDeleted`: Is Deleted (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].ListID`: List ID (number)
- `Data[].NewsLetterID`: Campaign Draft ID (number)
- `Data[].OpenTracked`: Open Tracked (number)
- `Data[].SegmentationID`: Segmentation ID (number)
- `Data[].SendEndAt`: Send End At (datetime)
- `Data[].SendStartAt`: Send Start At (datetime)
- `Data[].SpamassScore`: SpamAssassin Score (number)
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].UnsubscribeTrackedCount`: Unsubscribe Tracked Count (number)
- `Total`: Total (number)

### `mailjet_schedule_campaign_draft`

**Schedule Campaign Draft.** Schedules a campaign draft for sending at the given time. The draft needs a list, a validated sender and content. Cancel with Cancel Campaign Draft Schedule. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |
| `date` | string | yes |  | Date. Send time as RFC 3339 (e.g. "2030-01-01T09:00:00Z") or a Unix timestamp. |

Output fields:

- `Count`: Count (number)
- `Data`: Schedule
- `Data[].Date`: Date (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_send_campaign_draft`

**Send Campaign Draft.** Sends the campaign draft immediately to every subscribed contact of its list (or segment). Cannot be undone. The draft needs a list, a validated sender and content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |

Output fields:

- `Count`: Count (number)
- `Data`: Status
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_send_campaign_draft_test`

**Send Campaign Draft Test.** Sends a test copy of a campaign draft to the given recipients without sending the campaign. The draft needs content and a validated sender. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |
| `recipients` | JSON | yes |  | Recipients. JSON array of test recipients, e.g. [{"Email":"me@example.com","Name":"Me"}]. |

Output fields:

- `Count`: Count (number)
- `Data`: Status
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_set_campaign_draft_content`

**Set Campaign Draft Content.** Sets the HTML and/or text content of a campaign draft, replacing what was there. Provide at least HTML Part or Text Part. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |
| `htmlPart` | string | no |  | HTML Part. HTML content of the campaign. |
| `textPart` | string | no |  | Text Part. Plain-text content of the campaign. |
| `headers` | object | no |  | Headers. Headers as name/value pairs; they override settings such as Subject. |

Output fields:

- `Count`: Count (number)
- `Data`: Content
- `Data[].Html-part`: HTML Part
- `Data[].Text-part`: Text Part
- `Data[].created_at`: Created At (number)
- `Total`: Total (number)

### `mailjet_update_campaign`

**Update Campaign.** Sets the starred and/or deleted flag of a sent campaign. Only the flags you set change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign ID. Numeric campaign ID, from List Campaigns. |
| `isStarred` | string | no |  | Starred. Yes stars the campaign, No unstars it. One of `true`, `false`. |
| `isDeleted` | string | no |  | Deleted. Yes marks the campaign deleted, No restores it. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaigns
- `Data[].CampaignType`: Campaign Type (number)
- `Data[].ClickTracked`: Click Tracked (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].CustomValue`: Custom Value
- `Data[].FirstMessageID`: First Message ID
- `Data[].FromEmail`: From Email (email)
- `Data[].FromID`: From ID (number)
- `Data[].FromName`: From Name
- `Data[].HasHtmlCount`: Has HTML Count (number)
- `Data[].HasTxtCount`: Has Txt Count (number)
- `Data[].ID`: ID (number)
- `Data[].IsDeleted`: Is Deleted (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].ListID`: List ID (number)
- `Data[].NewsLetterID`: Campaign Draft ID (number)
- `Data[].OpenTracked`: Open Tracked (number)
- `Data[].SegmentationID`: Segmentation ID (number)
- `Data[].SendEndAt`: Send End At (datetime)
- `Data[].SendStartAt`: Send Start At (datetime)
- `Data[].SpamassScore`: SpamAssassin Score (number)
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].UnsubscribeTrackedCount`: Unsubscribe Tracked Count (number)
- `Total`: Total (number)

### `mailjet_update_campaign_draft`

**Update Campaign Draft.** Updates the settings of a campaign draft that has not been sent. Only the fields you set change. Content is changed with Set Campaign Draft Content. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |
| `subject` | string | no |  | Subject. New subject line. |
| `locale` | string | no |  | Locale. Locale, e.g. "en_US". |
| `contactsListId` | number | no |  | Contact List ID. Numeric ID of the list to send to. |
| `senderId` | string | no |  | Sender ID. Numeric ID of the validated sender, from List Senders. Needed to reschedule the draft with Update Campaign Draft Schedule. |
| `senderEmail` | string | no |  | Sender Email. Validated sender address. |
| `senderName` | string | no |  | Sender Name. Sender display name. |
| `title` | string | no |  | Title. Internal title. |
| `replyEmail` | string | no |  | Reply-To Email. Address replies go to. |
| `segmentationId` | number | no |  | Segment ID. Segment to target, from List Segments. |
| `isStarred` | string | no |  | Starred. Yes stars the draft, No unstars it. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaign Drafts
- `Data[].AXFraction`: A/B Test Fraction (number)
- `Data[].AXFractionName`: A/B Test Fraction Name
- `Data[].ContactsListID`: Contacts List ID (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Current`: Current (number)
- `Data[].DeliveredAt`: Delivered At (datetime)
- `Data[].EditMode`: Edit Mode
- `Data[].ID`: ID (number)
- `Data[].IsCampaignTemplate`: Is Campaign Template (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].IsTextPartIncluded`: Is Text Part Included (boolean)
- `Data[].Locale`: Locale
- `Data[].ModifiedAt`: Modified At
- `Data[].Preset`: Preset
- `Data[].ReplyEmail`: Reply Email (email)
- `Data[].SegmentationID`: Segmentation ID (number)
- `Data[].Sender`: Sender
- `Data[].SenderEmail`: Sender Email (email)
- `Data[].SenderName`: Sender Name
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].Title`: Title
- `Data[].Url`: URL (url)
- `Data[].Used`: Used (boolean)
- `Data[].VarCount`: Var Count (number)
- `Total`: Total (number)

### `mailjet_update_campaign_draft_schedule`

**Update Campaign Draft Schedule.** Moves the send time of a scheduled campaign draft. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draftId` | string | yes |  | Campaign Draft ID. Numeric campaign draft ID, from List Campaign Drafts or Create Campaign Draft. |
| `date` | string | yes |  | Date. New send time as RFC 3339 (e.g. "2030-01-01T09:00:00Z") or a Unix timestamp. |

Output fields:

- `Count`: Count (number)
- `Data`: Schedule
- `Data[].Date`: Date (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_bulk_manage_list_contacts`

**Bulk Manage List Contacts.** Starts an asynchronous job that applies one action (addforce, addnoforce, remove, unsub) to many contacts in one list, creating missing contacts. Returns a JobID; read the result with Get Bulk Manage List Contacts Job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID, from List Contact Lists or Create Contact List. |
| `action` | string | yes |  | Action. What to do with every contact in this list. One of `"addforce"`, `"addnoforce"`, `"remove"`, `"unsub"`. |
| `contacts` | JSON | yes |  | Contacts. JSON array of contacts, e.g. [{"Email":"jane@example.com","Name":"Jane","Properties":{"city":"Paris"}}]. |

Output fields:

- `Count`: Count (number)
- `Data`: Jobs
- `Data[].JobID`: Job ID (number)
- `Total`: Total (number)

### `mailjet_create_csv_import`

**Create CSV Import.** Starts an import job for CSV data uploaded with Upload Contacts CSV. Returns the import job; read its progress with Get CSV Import and failed rows with Get CSV Import Errors. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactsListId` | number | yes |  | Contact List ID. Numeric ID of the list to import into; the same list the CSV was uploaded for. |
| `dataId` | number | yes |  | Data ID. ID returned by Upload Contacts CSV. |
| `method` | string | yes |  | Action. What to do with each imported contact in the list. One of `"addforce"`, `"addnoforce"`, `"remove"`, `"unsub"`. |
| `importOptions` | string | no |  | Import Options. Optional JSON string of import options, e.g. {"DateTimeFormat":"yyyy-mm-dd","TimezoneOffset":2,"FieldNames":["email","name"]}. |
| `errorThreshold` | number | no |  | Error Threshold. Number of row errors after which the import is aborted. |

Output fields:

- `Count`: Count (number)
- `Data`: Imports
- `Data[].AliveAt`: Alive At (datetime)
- `Data[].ContactsListID`: Contacts List ID (number)
- `Data[].Count`: Count (number)
- `Data[].Current`: Current (number)
- `Data[].DataID`: Data ID (number)
- `Data[].Errcount`: Error Count (number)
- `Data[].ErrTreshold`: Error Threshold (number)
- `Data[].ID`: ID (number)
- `Data[].ImportOptions`: Import Options
- `Data[].JobEnd`: Job End (datetime)
- `Data[].JobStart`: Job Start (datetime)
- `Data[].Method`: Method
- `Data[].RequestAt`: Request At (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_create_list`

**Create Contact List.** Creates a contact list. The name must be unique in the account. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. List name, unique in the account. |

Output fields:

- `Count`: Count (number)
- `Data`: Lists
- `Data[].Address`: Address
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].ID`: ID (number)
- `Data[].IsDeleted`: Is Deleted (boolean)
- `Data[].Name`: Name
- `Data[].SubscriberCount`: Subscriber Count (number)
- `Total`: Total (number)

### `mailjet_delete_list`

**Delete Contact List.** Deletes a contact list. The contacts themselves stay in the account. Use Update Contact List with Deleted = Yes for a reversible delete. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID, from List Contact Lists or Create Contact List. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_get_bulk_manage_list_contacts_job`

**Get Bulk Manage List Contacts Job.** Reads the status, counts and errors of a job started by Bulk Manage List Contacts. Call again until Status is Completed or Error. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID, from List Contact Lists or Create Contact List. |
| `jobId` | string | yes |  | Job ID. JobID returned by Bulk Manage List Contacts. |

Output fields:

- `Count`: Count (number)
- `Data`: Jobs
- `Data[].ContactsLists`: Contacts Lists
- `Data[].ContactsLists[].Action`: Action
- `Data[].ContactsLists[].ListID`: List ID (number)
- `Data[].Count`: Count (number)
- `Data[].Error`: Error
- `Data[].ErrorFile`: Error File
- `Data[].JobEnd`: Job End (datetime)
- `Data[].JobStart`: Job Start (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_get_csv_import`

**Get CSV Import.** Reads the status and counts of an import job from Create CSV Import. Call again until Status is Completed or Error. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `importJobId` | string | yes |  | Import Job ID. Import job ID returned by Create CSV Import. |

Output fields:

- `Count`: Count (number)
- `Data`: Imports
- `Data[].AliveAt`: Alive At (datetime)
- `Data[].ContactsListID`: Contacts List ID (number)
- `Data[].Count`: Count (number)
- `Data[].Current`: Current (number)
- `Data[].DataID`: Data ID (number)
- `Data[].Errcount`: Error Count (number)
- `Data[].ErrTreshold`: Error Threshold (number)
- `Data[].ID`: ID (number)
- `Data[].ImportOptions`: Import Options
- `Data[].JobEnd`: Job End (datetime)
- `Data[].JobStart`: Job Start (datetime)
- `Data[].Method`: Method
- `Data[].RequestAt`: Request At (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_get_csv_import_errors`

**Get CSV Import Errors.** Returns the CSV text of the rows a CSV import job rejected, with the error per row. Use the import job ID from Create CSV Import. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Import Job ID. Import job ID returned by Create CSV Import. |

Output fields:

- `csv`: CSV

### `mailjet_get_import_list_job`

**Get Import Contact List Job.** Reads the status and counts of a job started by Import Contact List. Call again until it completes. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Destination List ID. Numeric ID of the destination list used in Import Contact List. |
| `jobId` | string | yes |  | Job ID. JobID returned by Import Contact List. |

Output fields:

- `Count`: Count (number)
- `Data`: Jobs
- `Data[].Count`: Count (number)
- `Data[].Error`: Error
- `Data[].JobEnd`: Job End (datetime)
- `Data[].JobStart`: Job Start (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_get_list`

**Get Contact List.** Gets a contact list by its numeric ID, including its subscriber count. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID, from List Contact Lists or Create Contact List. |

Output fields:

- `Count`: Count (number)
- `Data`: Lists
- `Data[].Address`: Address
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].ID`: ID (number)
- `Data[].IsDeleted`: Is Deleted (boolean)
- `Data[].Name`: Name
- `Data[].SubscriberCount`: Subscriber Count (number)
- `Total`: Total (number)

### `mailjet_get_subscription`

**Get Subscription.** Gets one subscription record (a contact in a list) by its ID, from List Subscriptions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. Numeric subscription (list recipient) ID, from List Subscriptions. |

Output fields:

- `Count`: Count (number)
- `Data`: Subscriptions
- `Data[].ContactID`: Contact ID (number)
- `Data[].ID`: ID (number)
- `Data[].IsActive`: Is Active (boolean)
- `Data[].IsUnsubscribed`: Is Unsubscribed (boolean)
- `Data[].ListID`: List ID (number)
- `Data[].ListName`: List Name
- `Data[].SubscribedAt`: Subscribed At (datetime)
- `Data[].UnsubscribedAt`: Unsubscribed At
- `Total`: Total (number)

### `mailjet_get_verify_list_job`

**Get Verify Contact List Job.** Reads the status and results of a job started by Verify Contact List. Call again until it completes. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID, from List Contact Lists or Create Contact List. |
| `jobId` | string | yes |  | Job ID. Job ID returned by Verify Contact List. |

Output fields:

- `Count`: Count (number)
- `Data`: Jobs
- `Data[].Akid`: API Key ID (number)
- `Data[].ContactListID`: Contact List ID (number)
- `Data[].Count`: Count (number)
- `Data[].Error`: Error
- `Data[].ID`: ID (number)
- `Data[].JobEnd`: Job End
- `Data[].JobStart`: Job Start (datetime)
- `Data[].Method`: Method
- `Data[].ResponseUrl`: Response URL
- `Data[].Status`: Status
- `Data[].Summary`: Summary
- `Total`: Total (number)

### `mailjet_import_list`

**Import Contact List.** Starts an asynchronous job that applies an action to every contact of a source list in the destination list (e.g. addnoforce to copy them). Returns a JobID; read it with Get Import Contact List Job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Destination List ID. Numeric ID of the list that receives the contacts, from List Contact Lists. |
| `sourceListId` | number | yes |  | Source List ID. Numeric ID of the list the contacts come from. |
| `action` | string | yes |  | Action. What to do in the destination list with each contact of the source list. One of `"addforce"`, `"addnoforce"`, `"remove"`, `"unsub"`. |

Output fields:

- `Count`: Count (number)
- `Data`: Jobs
- `Data[].JobID`: Job ID (number)
- `Total`: Total (number)

### `mailjet_list_lists`

**List Contact Lists.** Lists contact lists with their IDs, names and subscriber counts. Filter by name or deleted state. Page with Limit and Offset; the response has Total. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Only the list with this exact name. |
| `isDeleted` | string | no |  | Deleted. Yes for lists marked deleted only, No for active lists only. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Lists
- `Data[].Address`: Address
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].ID`: ID (number)
- `Data[].IsDeleted`: Is Deleted (boolean)
- `Data[].Name`: Name
- `Data[].SubscriberCount`: Subscriber Count (number)
- `Total`: Total (number)

### `mailjet_list_signup_requests`

**List Signup Requests.** Lists subscription-widget signup requests with their confirmation state. Filter by contact list or email. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactsListId` | number | no |  | Contact List ID. Only requests for this list. |
| `email` | string | no |  | Email. Only requests from this email. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Signup Requests
- `Total`: Total (number)

### `mailjet_list_subscriptions`

**List Subscriptions.** Lists subscription records (one per contact per list) with their IDs and unsubscribed state. Filter by contact list, contact or email. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactsListId` | number | no |  | Contact List ID. Only subscriptions in this list. |
| `contactId` | number | no |  | Contact ID. Only subscriptions of this contact. |
| `contactEmail` | string | no |  | Contact Email. Only subscriptions of the contact with this email. |
| `unsub` | string | no |  | Unsubscribed. Yes for unsubscribed records only, No for subscribed only. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Subscriptions
- `Data[].ContactID`: Contact ID (number)
- `Data[].ID`: ID (number)
- `Data[].IsActive`: Is Active (boolean)
- `Data[].IsUnsubscribed`: Is Unsubscribed (boolean)
- `Data[].ListID`: List ID (number)
- `Data[].ListName`: List Name
- `Data[].SubscribedAt`: Subscribed At (datetime)
- `Data[].UnsubscribedAt`: Unsubscribed At
- `Total`: Total (number)

### `mailjet_manage_list_contact`

**Add Contact to List.** Applies one action to one email in a list: addforce (add and subscribe), addnoforce (add, keep unsubscribed state), remove or unsub. Creates the contact when it does not exist and can set its properties. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID, from List Contact Lists or Create Contact List. |
| `email` | string | yes |  | Email. Contact email address. |
| `action` | string | yes |  | Action. What to do with the contact in this list. One of `"addforce"`, `"addnoforce"`, `"remove"`, `"unsub"`. |
| `name` | string | no |  | Name. Contact display name, used when the contact is created. |
| `properties` | object | no |  | Properties. Contact property values as name/value pairs; the properties must exist. |

Output fields:

- `Count`: Count (number)
- `Data`: Results
- `Data[].ContactID`: Contact ID (number)
- `Data[].Email`: Email (email)
- `Data[].Action`: Action
- `Data[].Name`: Name
- `Data[].Properties`: Properties (an object whose keys vary)
- `Total`: Total (number)

### `mailjet_update_csv_import`

**Abort CSV Import.** Aborts a CSV import job that is still running by setting its status to Abort. Jobs that already finished cannot be aborted. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `importJobId` | string | yes |  | Import Job ID. Import job ID returned by Create CSV Import. |

Output fields:

- `Count`: Count (number)
- `Data`: Imports
- `Data[].AliveAt`: Alive At (datetime)
- `Data[].ContactsListID`: Contacts List ID (number)
- `Data[].Count`: Count (number)
- `Data[].Current`: Current (number)
- `Data[].DataID`: Data ID (number)
- `Data[].Errcount`: Error Count (number)
- `Data[].ErrTreshold`: Error Threshold (number)
- `Data[].ID`: ID (number)
- `Data[].ImportOptions`: Import Options
- `Data[].JobEnd`: Job End (datetime)
- `Data[].JobStart`: Job Start (datetime)
- `Data[].Method`: Method
- `Data[].RequestAt`: Request At (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_update_list`

**Update Contact List.** Updates the name and/or deleted state of a contact list. Only the fields you set change. Marking a list deleted can be reverted by setting Deleted to No. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID, from List Contact Lists or Create Contact List. |
| `name` | string | no |  | Name. New list name, unique in the account. |
| `isDeleted` | string | no |  | Deleted. Yes marks the list deleted, No restores it. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Lists
- `Data[].Address`: Address
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].ID`: ID (number)
- `Data[].IsDeleted`: Is Deleted (boolean)
- `Data[].Name`: Name
- `Data[].SubscriberCount`: Subscriber Count (number)
- `Total`: Total (number)

### `mailjet_upload_contacts_csv`

**Upload Contacts CSV.** Uploads CSV text (header row with email and property names, then one contact per row) for a contact list. Returns the data ID; then call Create CSV Import with it to run the import. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID the data is for, from List Contact Lists. |
| `csv` | string | yes |  | CSV. CSV text, e.g. "email,name\njane@example.com,Jane". |

Output fields:

- `ID`: ID (number)

### `mailjet_verify_list`

**Verify Contact List.** Starts an asynchronous email verification of a contact list. Spends email-verification credits from the account. Returns a job ID; read the result with Get Verify Contact List Job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List ID. Numeric contact list ID, from List Contact Lists or Create Contact List. |

Output fields:

- `Count`: Count (number)
- `Data`: Jobs
- `Data[].JobID`: Job ID (number)
- `Total`: Total (number)

### `mailjet_create_contact_property`

**Create Contact Property.** Creates a contact property that contacts can then hold values for (via Update Contact Data). The name must be unique within its namespace. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Property name, unique within the namespace. |
| `dataType` | string | no |  | Data Type. Value type: str, int, float, bool or datetime. One of `"str"`, `"int"`, `"float"`, `"bool"`, `"datetime"`. |
| `namespace` | string | no |  | Namespace. static keeps one value per contact (default); historic keeps every value set. One of `"static"`, `"historic"`. |

Output fields:

- `Count`: Count (number)
- `Data`: Properties
- `Data[].Datatype`: Data Type
- `Data[].ID`: ID (number)
- `Data[].Name`: Name
- `Data[].NameSpace`: Namespace
- `Total`: Total (number)

### `mailjet_delete_contact_property`

**Delete Contact Property.** Deletes a contact property and the values every contact held for it. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `propertyId` | string | yes |  | Property ID. Numeric property ID, from List Contact Properties. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_get_contact_property`

**Get Contact Property.** Gets a contact property definition by its numeric ID or its name. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `propertyId` | string | yes |  | Property ID or Name. Numeric property ID (from List Contact Properties) or the property name. |

Output fields:

- `Count`: Count (number)
- `Data`: Properties
- `Data[].Datatype`: Data Type
- `Data[].ID`: ID (number)
- `Data[].Name`: Name
- `Data[].NameSpace`: Namespace
- `Total`: Total (number)

### `mailjet_list_contact_properties`

**List Contact Properties.** Lists contact property definitions (name, data type, namespace) with their IDs. Use it to find property names for Update Contact Data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataType` | string | no |  | Data Type. Value type: str, int, float, bool or datetime. One of `"str"`, `"int"`, `"float"`, `"bool"`, `"datetime"`. |
| `namespace` | string | no |  | Namespace. static (one value per contact) or historic (keeps every value). One of `"static"`, `"historic"`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Properties
- `Data[].Datatype`: Data Type
- `Data[].ID`: ID (number)
- `Data[].Name`: Name
- `Data[].NameSpace`: Namespace
- `Total`: Total (number)

### `mailjet_update_contact_property`

**Update Contact Property.** Updates the name and/or data type of a contact property. Only the fields you set change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `propertyId` | string | yes |  | Property ID. Numeric property ID, from List Contact Properties. |
| `name` | string | no |  | Name. New property name. |
| `dataType` | string | no |  | Data Type. Value type: str, int, float, bool or datetime. One of `"str"`, `"int"`, `"float"`, `"bool"`, `"datetime"`. |

Output fields:

- `Count`: Count (number)
- `Data`: Properties
- `Data[].Datatype`: Data Type
- `Data[].ID`: ID (number)
- `Data[].Name`: Name
- `Data[].NameSpace`: Namespace
- `Total`: Total (number)

### `mailjet_bulk_manage_contacts`

**Bulk Manage Contacts.** Starts an asynchronous job that upserts many contacts (with properties) and applies list actions to all of them. Returns a JobID; read the result with Get Bulk Manage Contacts Job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contacts` | JSON | yes |  | Contacts. JSON array of contacts, e.g. [{"Email":"jane@example.com","Name":"Jane","Properties":{"city":"Paris"}}]. |
| `contactsLists` | JSON | no |  | Lists. Optional JSON array of list actions for every contact, e.g. [{"ListID":123,"Action":"addnoforce"}]. |

Output fields:

- `Count`: Count (number)
- `Data`: Jobs
- `Data[].JobID`: Job ID (number)
- `Total`: Total (number)

### `mailjet_create_contact`

**Create Contact.** Creates a contact in the account. Fails if the email already exists; use Get Contact to check first. To add the contact to a list use Add Contact to List, and to set property values use Update Contact Data. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Contact email address. Must not exist yet. |
| `name` | string | no |  | Name. Contact display name. |
| `isExcludedFromCampaigns` | string | no |  | Excluded From Campaigns. Yes adds the contact to the campaign exclusion list. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Contacts
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].Email`: Email (email)
- `Data[].ExclusionFromCampaignsUpdatedAt`: Exclusion From Campaigns Updated At (datetime)
- `Data[].ID`: ID (number)
- `Data[].IsExcludedFromCampaigns`: Is Excluded From Campaigns (boolean)
- `Data[].IsOptInPending`: Is Opt In Pending (boolean)
- `Data[].IsSpamComplaining`: Is Spam Complaining (boolean)
- `Data[].LastActivityAt`: Last Activity At (datetime)
- `Data[].LastUpdateAt`: Last Update At (datetime)
- `Data[].Name`: Name
- `Data[].UnsubscribedAt`: Unsubscribed At
- `Data[].UnsubscribedBy`: Unsubscribed By
- `Total`: Total (number)

### `mailjet_delete_contact`

**Delete Contact.** Permanently deletes a contact with its properties, list subscriptions and tracking history (GDPR erasure). Cannot be undone. Takes the numeric contact ID; use Get Contact to find it from an email. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Numeric contact ID, from Get Contact or List Contacts. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_delete_contact_data`

**Delete Contact Data.** Deletes the property values stored for one contact. The contact itself stays; to erase it use Delete Contact. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Numeric contact ID, from List Contacts or Get Contact. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_get_bulk_manage_contacts_job`

**Get Bulk Manage Contacts Job.** Reads the status, counts and error file of a job started by Bulk Manage Contacts. Call again until Status is Completed or Error. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Job ID. JobID returned by Bulk Manage Contacts. |

Output fields:

- `Count`: Count (number)
- `Data`: Jobs
- `Data[].ContactsLists`: Contacts Lists
- `Data[].ContactsLists[].Action`: Action
- `Data[].ContactsLists[].ListID`: List ID (number)
- `Data[].Count`: Count (number)
- `Data[].Error`: Error
- `Data[].ErrorFile`: Error File
- `Data[].JobEnd`: Job End (datetime)
- `Data[].JobStart`: Job Start (datetime)
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_get_contact`

**Get Contact.** Gets a contact by its numeric ID or by its email address. Returns a 404 error when no contact matches. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID or Email. Numeric contact ID (from List Contacts or Create Contact) or the contact email. |

Output fields:

- `Count`: Count (number)
- `Data`: Contacts
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].Email`: Email (email)
- `Data[].ExclusionFromCampaignsUpdatedAt`: Exclusion From Campaigns Updated At (datetime)
- `Data[].ID`: ID (number)
- `Data[].IsExcludedFromCampaigns`: Is Excluded From Campaigns (boolean)
- `Data[].IsOptInPending`: Is Opt In Pending (boolean)
- `Data[].IsSpamComplaining`: Is Spam Complaining (boolean)
- `Data[].LastActivityAt`: Last Activity At (datetime)
- `Data[].LastUpdateAt`: Last Update At (datetime)
- `Data[].Name`: Name
- `Data[].UnsubscribedAt`: Unsubscribed At
- `Data[].UnsubscribedBy`: Unsubscribed By
- `Total`: Total (number)

### `mailjet_get_contact_data`

**Get Contact Data.** Gets every contact property value set on one contact, as Name/Value pairs. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID or Email. Numeric contact ID (from List Contacts) or the contact email. |

Output fields:

- `Count`: Count (number)
- `Data`: Contact Data
- `Data[].ContactID`: Contact ID (number)
- `Data[].Data`: Properties
- `Data[].Data[].Name`: Name
- `Data[].Data[].Value`: Value
- `Data[].ID`: ID (number)
- `Data[].MethodCollection`: Method Collection
- `Total`: Total (number)

### `mailjet_list_contact_data`

**List Contact Data.** Lists the property values of contacts, filtered by contact list, campaign or email. Page with Limit and Offset. For one contact use Get Contact Data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactsListId` | number | no |  | Contact List ID. Only contacts in this list, from List Contact Lists. |
| `campaignId` | number | no |  | Campaign ID. Only contacts that received this campaign. |
| `contactEmail` | string | no |  | Contact Email. Only the contact with this email. |
| `fields` | string | no |  | Fields. Comma-separated property names to return; all properties when empty. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Contact Data
- `Data[].ContactID`: Contact ID (number)
- `Data[].Data`: Properties
- `Data[].Data[].Name`: Name
- `Data[].Data[].Value`: Value
- `Data[].ID`: ID (number)
- `Data[].MethodCollection`: Method Collection
- `Total`: Total (number)

### `mailjet_list_contacts`

**List Contacts.** Lists contacts with their IDs and emails. Filter by Contact List ID (from List Contact Lists) or Campaign ID. Page with Limit and Offset; the response has Total. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactsListId` | number | no |  | Contact List ID. Only contacts in this list, from List Contact Lists. |
| `campaignId` | number | no |  | Campaign ID. Only contacts that received this campaign, from List Campaigns. |
| `isExcludedFromCampaigns` | string | no |  | Excluded From Campaigns. Yes for excluded contacts only, No for the rest. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Contacts
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].Email`: Email (email)
- `Data[].ExclusionFromCampaignsUpdatedAt`: Exclusion From Campaigns Updated At (datetime)
- `Data[].ID`: ID (number)
- `Data[].IsExcludedFromCampaigns`: Is Excluded From Campaigns (boolean)
- `Data[].IsOptInPending`: Is Opt In Pending (boolean)
- `Data[].IsSpamComplaining`: Is Spam Complaining (boolean)
- `Data[].LastActivityAt`: Last Activity At (datetime)
- `Data[].LastUpdateAt`: Last Update At (datetime)
- `Data[].Name`: Name
- `Data[].UnsubscribedAt`: Unsubscribed At
- `Data[].UnsubscribedBy`: Unsubscribed By
- `Total`: Total (number)

### `mailjet_list_lists_for_contact`

**List Lists for Contact.** Lists every contact list the contact is in, with its subscription state (IsUnsub) per list. For all lists in the account use List Contact Lists. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID or Email. Numeric contact ID (from List Contacts) or the contact email. |

Output fields:

- `Count`: Count (number)
- `Data`: Lists
- `Data[].IsActive`: Is Active (boolean)
- `Data[].IsUnsub`: Is Unsubscribed (boolean)
- `Data[].ListID`: List ID (number)
- `Data[].SubscribedAt`: Subscribed At (datetime)
- `Total`: Total (number)

### `mailjet_update_contact`

**Update Contact.** Updates a contact name and/or campaign exclusion. Only the fields you set change. Contact property values are changed with Update Contact Data instead. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID or Email. Numeric contact ID (from List Contacts or Create Contact) or the contact email. |
| `name` | string | no |  | Name. New display name. |
| `isExcludedFromCampaigns` | string | no |  | Excluded From Campaigns. Yes excludes the contact from marketing campaigns, No includes it again. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Contacts
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].Email`: Email (email)
- `Data[].ExclusionFromCampaignsUpdatedAt`: Exclusion From Campaigns Updated At (datetime)
- `Data[].ID`: ID (number)
- `Data[].IsExcludedFromCampaigns`: Is Excluded From Campaigns (boolean)
- `Data[].IsOptInPending`: Is Opt In Pending (boolean)
- `Data[].IsSpamComplaining`: Is Spam Complaining (boolean)
- `Data[].LastActivityAt`: Last Activity At (datetime)
- `Data[].LastUpdateAt`: Last Update At (datetime)
- `Data[].Name`: Name
- `Data[].UnsubscribedAt`: Unsubscribed At
- `Data[].UnsubscribedBy`: Unsubscribed By
- `Total`: Total (number)

### `mailjet_update_contact_data`

**Update Contact Data.** Sets values for the given contact properties; properties not listed keep their value. Each property must exist first (see List Contact Properties / Create Contact Property). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID or Email. Numeric contact ID (from List Contacts) or the contact email. |
| `data` | JSON | yes |  | Data. JSON array of property values, e.g. [{"Name":"city","Value":"Paris"}]. |

Output fields:

- `Count`: Count (number)
- `Data`: Contact Data
- `Data[].ContactID`: Contact ID (number)
- `Data[].Data`: Properties
- `Data[].Data[].Name`: Name
- `Data[].Data[].Value`: Value
- `Data[].ID`: ID (number)
- `Data[].MethodCollection`: Method Collection
- `Total`: Total (number)

### `mailjet_update_contact_list_memberships`

**Update Contact List Memberships.** Applies one action per list to a single contact: addforce (add and subscribe), addnoforce (add, keep unsubscribed state), remove or unsub. For many contacts use Bulk Manage Contacts. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID or Email. Numeric contact ID (from List Contacts) or the contact email. |
| `contactsLists` | JSON | yes |  | Lists. JSON array of list actions, e.g. [{"ListID":123,"Action":"addforce"}]. Action is addforce, addnoforce, remove or unsub. |

Output fields:

- `Count`: Count (number)
- `Data`: Results
- `Data[].ContactsLists`: Contacts Lists
- `Data[].ContactsLists[].Action`: Action
- `Data[].ContactsLists[].ListID`: List ID (number)
- `Total`: Total (number)

### `mailjet_delete_image`

**Delete Image.** Permanently deletes an image from the gallery. Emails already sent keep working only if they host their own copy. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageId` | string | yes |  | Image ID. Image ID, from List Images or Upload Image. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_get_image`

**Get Image.** Gets an image by ID, including its URL and thumbnail URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageId` | string | yes |  | Image ID. Image ID, from List Images or Upload Image. |

Output fields:

- `Count`: Count (number)
- `Data`: Images
- `Data[].ID`: ID
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Data[].TargetContent`: Target Content
- `Data[].ImageSize`: Image Size (filesize)
- `Data[].ThumbnailSize`: Thumbnail Size (filesize)
- `Data[].TotalSize`: Total Size (filesize)
- `Data[].LabelIDs`: Label IDs
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].ImageUrl`: Image URL (image)
- `Data[].ThumbnailUrl`: Thumbnail URL (image)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Data[].ExpiresAt`: Expires At (datetime)
- `Total`: Total (number)

### `mailjet_list_images`

**List Images.** Lists gallery images with their IDs, names, URLs and status. Filter by name or starred flag. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partialName` | string | no |  | Name Contains. Only images whose name contains this text. |
| `isStarred` | string | no |  | Starred. Yes for starred images only. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Images
- `Data[].ID`: ID
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Data[].TargetContent`: Target Content
- `Data[].ImageSize`: Image Size (filesize)
- `Data[].ThumbnailSize`: Thumbnail Size (filesize)
- `Data[].TotalSize`: Total Size (filesize)
- `Data[].LabelIDs`: Label IDs
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].ImageUrl`: Image URL (image)
- `Data[].ThumbnailUrl`: Thumbnail URL (image)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Data[].ExpiresAt`: Expires At (datetime)
- `Total`: Total (number)

### `mailjet_replace_image`

**Replace Image.** Replaces the image file of an existing gallery image (Content) or uploads its thumbnail (Thumbnail). The image keeps its ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageId` | string | yes |  | Image ID. Image ID, from List Images or Upload Image. |
| `target` | string | yes |  | Target. content replaces the image itself, thumbnail sets its thumbnail. One of `"content"`, `"thumbnail"`. |
| `file` | file | yes |  | File. Image file, max 2 MB. Files are not supported; an action that needs one fails. |

Output fields:

- `Count`: Count (number)
- `Data`: Images
- `Data[].ID`: ID
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Data[].TargetContent`: Target Content
- `Data[].ImageSize`: Image Size (filesize)
- `Data[].ThumbnailSize`: Thumbnail Size (filesize)
- `Data[].TotalSize`: Total Size (filesize)
- `Data[].LabelIDs`: Label IDs
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].ImageUrl`: Image URL (image)
- `Data[].ThumbnailUrl`: Thumbnail URL (image)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Data[].ExpiresAt`: Expires At (datetime)
- `Total`: Total (number)

### `mailjet_update_image`

**Update Image.** Updates the name, status, labels or starred flag of an image. Only the fields you set change. To change the file use Replace Image. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageId` | string | yes |  | Image ID. Image ID, from List Images or Upload Image. |
| `name` | string | no |  | Name. New image name. |
| `status` | string | no |  | Status. open allows edits, locked prevents them. One of `"open"`, `"locked"`. |
| `labelIds` | array | no |  | Label IDs. Numeric label IDs, from List Labels. |
| `isStarred` | string | no |  | Starred. Yes stars the image, No unstars it. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Images
- `Data[].ID`: ID
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Data[].TargetContent`: Target Content
- `Data[].ImageSize`: Image Size (filesize)
- `Data[].ThumbnailSize`: Thumbnail Size (filesize)
- `Data[].TotalSize`: Total Size (filesize)
- `Data[].LabelIDs`: Label IDs
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].ImageUrl`: Image URL (image)
- `Data[].ThumbnailUrl`: Thumbnail URL (image)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Data[].ExpiresAt`: Expires At (datetime)
- `Total`: Total (number)

### `mailjet_upload_image`

**Upload Image.** Uploads a JPEG, PNG, GIF, SVG or WebP image (max 2 MB) to the gallery and returns its ID and URL for use in templates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Image file, max 2 MB. Files are not supported; an action that needs one fails. |
| `name` | string | yes |  | Name. Image name. |
| `status` | string | no |  | Status. open allows edits (default), locked prevents them. One of `"open"`, `"locked"`. |
| `labelIds` | array | no |  | Label IDs. Numeric label IDs, from List Labels. |

Output fields:

- `Count`: Count (number)
- `Data`: Images
- `Data[].ID`: ID
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Data[].TargetContent`: Target Content
- `Data[].ImageSize`: Image Size (filesize)
- `Data[].ThumbnailSize`: Thumbnail Size (filesize)
- `Data[].TotalSize`: Total Size (filesize)
- `Data[].LabelIDs`: Label IDs
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].ImageUrl`: Image URL (image)
- `Data[].ThumbnailUrl`: Thumbnail URL (image)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Data[].ExpiresAt`: Expires At (datetime)
- `Total`: Total (number)

### `mailjet_create_label`

**Create Label.** Creates a label for tagging templates (resource) or images (image). Names must be unique. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Label name, unique in the account. |
| `color` | string | yes |  | Color. Hex color, e.g. "#FF5733". |
| `usedFor` | string | no |  | Used For. resource for template labels (default), image for image labels. One of `"resource"`, `"image"`. |

Output fields:

- `Count`: Count (number)
- `Data`: Labels
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Color`: Color
- `Data[].UsedFor`: Used For
- `Total`: Total (number)

### `mailjet_delete_label`

**Delete Label.** Deletes a label and removes it from every template or image. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. Numeric label ID, from List Labels or Create Label. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_get_label`

**Get Label.** Gets a label by its numeric ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. Numeric label ID, from List Labels or Create Label. |

Output fields:

- `Count`: Count (number)
- `Data`: Labels
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Color`: Color
- `Data[].UsedFor`: Used For
- `Total`: Total (number)

### `mailjet_list_labels`

**List Labels.** Lists labels with their IDs, names and colors. Label IDs are used by template and image actions. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. Only the label with this name. |
| `usedFor` | string | no |  | Used For. resource for template labels, image for image labels. One of `"resource"`, `"image"`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Labels
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Color`: Color
- `Data[].UsedFor`: Used For
- `Total`: Total (number)

### `mailjet_update_label`

**Update Label.** Updates the name and/or color of a label. Only the fields you set change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `labelId` | string | yes |  | Label ID. Numeric label ID, from List Labels or Create Label. |
| `name` | string | no |  | Name. New label name. |
| `color` | string | no |  | Color. New hex color, e.g. "#FF5733". |

Output fields:

- `Count`: Count (number)
- `Data`: Labels
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].Color`: Color
- `Data[].UsedFor`: Used For
- `Total`: Total (number)

### `mailjet_get_message`

**Get Message.** Gets a sent message by ID with its status, arrival time and campaign. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Numeric message ID, from Send Email (MessageID) or List Messages. |

Output fields:

- `Count`: Count (number)
- `Data`: Messages
- `Data[].ArrivedAt`: Arrived At (datetime)
- `Data[].AttachmentCount`: Attachment Count (number)
- `Data[].AttemptCount`: Attempt Count (number)
- `Data[].ContactAlt`: Contact Alt (email)
- `Data[].ContactID`: Contact ID (number)
- `Data[].Delay`: Delay (duration)
- `Data[].DestinationID`: Destination ID (number)
- `Data[].FilterTime`: Filter Time (number)
- `Data[].ID`: ID
- `Data[].IsClickTracked`: Is Click Tracked (boolean)
- `Data[].IsHTMLPartIncluded`: HTML Part Included (boolean)
- `Data[].IsOpenTracked`: Is Open Tracked (boolean)
- `Data[].IsTextPartIncluded`: Is Text Part Included (boolean)
- `Data[].IsUnsubTracked`: Is Unsub Tracked (boolean)
- `Data[].MessageSize`: Message Size (filesize)
- `Data[].SenderID`: Sender ID (number)
- `Data[].SpamassassinScore`: SpamAssassin Score (number)
- `Data[].SpamassRules`: SpamAssassin Rules
- `Data[].StatePermanent`: State Permanent (boolean)
- `Data[].Status`: Status
- `Data[].Subject`: Subject
- `Data[].UUID`: UUID
- `Data[].CampaignID`: Campaign ID (number)
- `Total`: Total (number)

### `mailjet_get_message_history`

**Get Message History.** Lists the events of a sent message (sent, opened, clicked, bounced, ...) with their times. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Numeric message ID, from Send Email (MessageID) or List Messages. |

Output fields:

- `Count`: Count (number)
- `Data`: Events
- `Data[].Comment`: Comment
- `Data[].EventAt`: Event At (number)
- `Data[].EventType`: Event Type
- `Data[].State`: State
- `Data[].Useragent`: User Agent
- `Data[].UseragentID`: User Agent ID (number)
- `Total`: Total (number)

### `mailjet_get_message_information`

**Get Message Information.** Gets delivery details (size, spam score, queued time, ...) of one sent message. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Numeric message ID, from Send Email (MessageID) or List Messages. |

Output fields:

- `Count`: Count (number)
- `Data`: Messages
- `Data[].CampaignID`: Campaign ID (number)
- `Data[].ClickTrackedCount`: Click Tracked Count (number)
- `Data[].ContactID`: Contact ID (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].ID`: ID
- `Data[].MessageSize`: Message Size (filesize)
- `Data[].OpenTrackedCount`: Open Tracked Count (number)
- `Data[].QueuedCount`: Queued Count (number)
- `Data[].SendEndAt`: Send End At (datetime)
- `Data[].SentCount`: Sent Count (number)
- `Data[].SpamAssassinRules`: SpamAssassin Rules
- `Data[].SpamAssassinRules.ALT`: ALT
- `Data[].SpamAssassinRules.ID`: ID (number)
- `Data[].SpamAssassinScore`: SpamAssassin Score (number)
- `Total`: Total (number)

### `mailjet_list_bounces`

**List Bounces.** Lists bounce events with the message, contact, hard/soft flag and error. Filter by campaign, list or period. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | no |  | Campaign ID. Only this campaign, from List Campaigns. |
| `contactsListId` | number | no |  | Contact List ID. Only this contact list, from List Contact Lists. |
| `fromTs` | string | no |  | From. Start of the period, RFC 3339 or Unix timestamp. |
| `toTs` | string | no |  | To. End of the period, RFC 3339 or Unix timestamp. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Bounces
- `Total`: Total (number)

### `mailjet_list_clicks`

**List Clicks.** Lists click events with the message, contact, URL and time. Filter by campaign, list, message or period. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | no |  | Campaign ID. Only this campaign, from List Campaigns. |
| `contactsListId` | number | no |  | Contact List ID. Only this contact list, from List Contact Lists. |
| `messageId` | string | no |  | Message ID. Only clicks in this message: its message ID, from Send Email or List Messages. |
| `fromTs` | string | no |  | From. Start of the period, RFC 3339 or Unix timestamp. |
| `toTs` | string | no |  | To. End of the period, RFC 3339 or Unix timestamp. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Clicks
- `Data[].ClickedAt`: Clicked At (datetime)
- `Data[].ClickedDelay`: Clicked Delay (duration)
- `Data[].ContactID`: Contact ID (number)
- `Data[].ID`: ID (number)
- `Data[].MessageID`: Message ID
- `Data[].Url`: URL (url)
- `Data[].UserAgentID`: User Agent ID (number)
- `Total`: Total (number)

### `mailjet_list_message_information`

**List Message Information.** Lists delivery details (size, spam score, queued time, ...) of sent messages. Filter by campaign, list or period. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | no |  | Campaign ID. Only this campaign, from List Campaigns. |
| `contactsListId` | number | no |  | Contact List ID. Only this contact list, from List Contact Lists. |
| `fromTs` | string | no |  | From. Start of the period, RFC 3339 or Unix timestamp. |
| `toTs` | string | no |  | To. End of the period, RFC 3339 or Unix timestamp. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Messages
- `Data[].CampaignID`: Campaign ID (number)
- `Data[].ClickTrackedCount`: Click Tracked Count (number)
- `Data[].ContactID`: Contact ID (number)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].ID`: ID
- `Data[].MessageSize`: Message Size (filesize)
- `Data[].OpenTrackedCount`: Open Tracked Count (number)
- `Data[].QueuedCount`: Queued Count (number)
- `Data[].SendEndAt`: Send End At (datetime)
- `Data[].SentCount`: Sent Count (number)
- `Data[].SpamAssassinRules`: SpamAssassin Rules
- `Data[].SpamAssassinRules.ALT`: ALT
- `Data[].SpamAssassinRules.ID`: ID (number)
- `Data[].SpamAssassinScore`: SpamAssassin Score (number)
- `Total`: Total (number)

### `mailjet_list_messages`

**List Messages.** Lists sent messages with their IDs, status and arrival time. Filter by campaign, contact, custom ID or period. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | no |  | Campaign ID. Only this campaign, from List Campaigns. |
| `contactId` | number | no |  | Contact ID. Only messages to this contact. |
| `customId` | string | no |  | Custom ID. Only messages sent with this Custom ID. |
| `fromTs` | string | no |  | From. Start of the period, RFC 3339 or Unix timestamp. |
| `toTs` | string | no |  | To. End of the period, RFC 3339 or Unix timestamp. |
| `showSubject` | string | no |  | Show Subject. Yes adds the subject to each message. One of `true`, `false`. |
| `showContactAlt` | string | no |  | Show Recipient Email. Yes adds the recipient email to each message. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Messages
- `Data[].ArrivedAt`: Arrived At (datetime)
- `Data[].AttachmentCount`: Attachment Count (number)
- `Data[].AttemptCount`: Attempt Count (number)
- `Data[].ContactAlt`: Contact Alt (email)
- `Data[].ContactID`: Contact ID (number)
- `Data[].Delay`: Delay (duration)
- `Data[].DestinationID`: Destination ID (number)
- `Data[].FilterTime`: Filter Time (number)
- `Data[].ID`: ID
- `Data[].IsClickTracked`: Is Click Tracked (boolean)
- `Data[].IsHTMLPartIncluded`: HTML Part Included (boolean)
- `Data[].IsOpenTracked`: Is Open Tracked (boolean)
- `Data[].IsTextPartIncluded`: Is Text Part Included (boolean)
- `Data[].IsUnsubTracked`: Is Unsub Tracked (boolean)
- `Data[].MessageSize`: Message Size (filesize)
- `Data[].SenderID`: Sender ID (number)
- `Data[].SpamassassinScore`: SpamAssassin Score (number)
- `Data[].SpamassRules`: SpamAssassin Rules
- `Data[].StatePermanent`: State Permanent (boolean)
- `Data[].Status`: Status
- `Data[].Subject`: Subject
- `Data[].UUID`: UUID
- `Data[].CampaignID`: Campaign ID (number)
- `Total`: Total (number)

### `mailjet_list_opens`

**List Opens.** Lists open events with the message, contact and time. Filter by campaign, list or period. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | no |  | Campaign ID. Only this campaign, from List Campaigns. |
| `contactsListId` | number | no |  | Contact List ID. Only this contact list, from List Contact Lists. |
| `fromTs` | string | no |  | From. Start of the period, RFC 3339 or Unix timestamp. |
| `toTs` | string | no |  | To. End of the period, RFC 3339 or Unix timestamp. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Opens
- `Data[].ArrivedAt`: Arrived At (datetime)
- `Data[].CampaignID`: Campaign ID (number)
- `Data[].ContactID`: Contact ID (number)
- `Data[].ID`: ID (number)
- `Data[].MessageID`: Message ID
- `Data[].OpenedAt`: Opened At (datetime)
- `Data[].UserAgentFull`: User Agent Full
- `Data[].UserAgentID`: User Agent ID (number)
- `Total`: Total (number)

### `mailjet_create_segment`

**Create Segment.** Creates a segment that selects contacts by a rule over contact properties, for use as the segment of a campaign draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Segment name. |
| `expression` | string | yes |  | Expression. Segment rule in Mailjet segmentation syntax, e.g. "(age>35) AND (country='France')"; property names must exist. |
| `description` | string | no |  | Description. Optional description. |

Output fields:

- `Count`: Count (number)
- `Data`: Segments
- `Data[].Description`: Description
- `Data[].Expression`: Expression
- `Data[].ID`: ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_delete_segment`

**Delete Segment.** Deletes a segment. Contacts are not affected. Mailjet keeps the record: Get Segment then returns it with Status "deleted". Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `segmentId` | string | yes |  | Segment ID. Numeric segment ID, from List Segments or Create Segment. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_get_segment`

**Get Segment.** Gets a segment by its numeric ID, including its expression. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `segmentId` | string | yes |  | Segment ID. Numeric segment ID, from List Segments or Create Segment. |

Output fields:

- `Count`: Count (number)
- `Data`: Segments
- `Data[].Description`: Description
- `Data[].Expression`: Expression
- `Data[].ID`: ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_list_segments`

**List Segments.** Lists segments (contact filters) with their IDs, names and expressions. Segment IDs are used as the segment of a campaign draft. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `showDeleted` | string | no |  | Show Deleted. Yes includes deleted segments. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Segments
- `Data[].Description`: Description
- `Data[].Expression`: Expression
- `Data[].ID`: ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_update_segment`

**Update Segment.** Updates the name, expression and/or description of a segment. Only the fields you set change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `segmentId` | string | yes |  | Segment ID. Numeric segment ID, from List Segments or Create Segment. |
| `name` | string | no |  | Name. New segment name. |
| `expression` | string | no |  | Expression. Segment rule in Mailjet segmentation syntax, e.g. "(age>35) AND (country='France')"; property names must exist. |
| `description` | string | no |  | Description. New description. |

Output fields:

- `Count`: Count (number)
- `Data`: Segments
- `Data[].Description`: Description
- `Data[].Expression`: Expression
- `Data[].ID`: ID (number)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_send_email`

**Send Email.** Sends one transactional email. The sender must be a validated sender (see List Senders). Provide Text Part, HTML Part or Template ID; with a template, Variables fill its placeholders. Sandbox Mode validates the message without delivering it. A success status means accepted only: an unvalidated sender or a wrong template ID shows up later as Status "blocked" in Get Message. Not idempotent: each call sends a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromEmail` | string | yes |  | From Email. Sender address. Must be a validated sender or on a validated domain. |
| `fromName` | string | no |  | From Name. Sender display name. |
| `to` | JSON | yes |  | To. JSON array of recipients, e.g. [{"Email":"jane@example.com","Name":"Jane"}]. Name is optional. |
| `cc` | JSON | no |  | Cc. JSON array of Cc recipients, same shape as To. |
| `bcc` | JSON | no |  | Bcc. JSON array of Bcc recipients, same shape as To. |
| `replyTo` | string | no |  | Reply-To Email. Address replies go to. |
| `subject` | string | no |  | Subject. Subject line. Optional when the template sets one. |
| `textPart` | string | no |  | Text Part. Plain-text body. |
| `htmlPart` | string | no |  | HTML Part. HTML body. |
| `templateId` | number | no |  | Template ID. Numeric v3 template ID: the ExternalID field from Get Template or List Templates, not their ID field. Template language processing is turned on with it. |
| `variables` | object | no |  | Variables. Template variables as name/value pairs, used by {{var:name}} placeholders. |
| `attachments` | JSON | no |  | Attachments. JSON array of files, e.g. [{"ContentType":"text/plain","Filename":"a.txt","Base64Content":"SGVsbG8="}]. |
| `customId` | string | no |  | Custom ID. Your own ID for the message, returned in events and message lookups. |
| `customCampaign` | string | no |  | Custom Campaign. Campaign name to group this message under. |
| `headers` | object | no |  | Headers. Extra email headers as name/value pairs. |
| `sandboxMode` | string | no |  | Sandbox Mode. Yes validates the request and returns the result without sending the email. One of `true`, `false`. |

Output fields:

- `Messages`: Messages
- `Messages[].Status`: Status
- `Messages[].CustomID`: Custom ID
- `Messages[].To`: To
- `Messages[].To[].Email`: Email (email)
- `Messages[].To[].MessageUUID`: Message UUID
- `Messages[].To[].MessageID`: Message ID
- `Messages[].To[].MessageHref`: Message Href (url)
- `Messages[].Cc`: Cc
- `Messages[].Cc[].Email`: Email (email)
- `Messages[].Cc[].MessageUUID`: Message UUID
- `Messages[].Cc[].MessageID`: Message ID
- `Messages[].Cc[].MessageHref`: Message Href (url)
- `Messages[].Bcc`: Bcc
- `Messages[].Bcc[].Email`: Email (email)
- `Messages[].Bcc[].MessageUUID`: Message UUID
- `Messages[].Bcc[].MessageID`: Message ID
- `Messages[].Bcc[].MessageHref`: Message Href (url)

### `mailjet_check_dns`

**Check Domain DNS.** Runs a fresh SPF and DKIM check on a sending domain and returns the result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dnsId` | string | yes |  | DNS ID. Numeric DNS (domain) ID, from List Domains. |

Output fields:

- `Count`: Count (number)
- `Data`: Checks
- `Data[].DKIMErrors`: DKIMErrors
- `Data[].DKIMRecordCurrentValue`: DKIMRecord Current Value
- `Data[].DKIMStatus`: DKIMStatus
- `Data[].SPFErrors`: SPFErrors
- `Data[].SPFRecordsCurrentValues`: SPFRecords Current Values
- `Data[].SPFStatus`: SPFStatus
- `Total`: Total (number)

### `mailjet_create_metasender`

**Create Metasender.** Registers a sender address or domain (*@domain.com) usable by every API key of the account. Mailjet support must validate it before it can send. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Address, or *@domain.com for a domain. |
| `description` | string | no |  | Description. Readable description. |

Output fields:

- `Count`: Count (number)
- `Data`: Metasenders
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Description`: Description
- `Data[].Email`: Email (email)
- `Data[].Filename`: Filename
- `Data[].ID`: ID (number)
- `Data[].IsEnabled`: Is Enabled (boolean)
- `Total`: Total (number)

### `mailjet_create_sender`

**Create Sender.** Registers a sender address (or a whole domain as *@domain.com). Mailjet emails the address to confirm it; the sender stays Inactive until validated (see Validate Sender). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Sender address, or *@domain.com for a domain. |
| `name` | string | no |  | Name. Sender display name. |
| `emailType` | string | no |  | Email Type. Informative type of mail the sender sends. One of `"transactional"`, `"bulk"`, `"unknown"`. |
| `isDefaultSender` | string | no |  | Default Sender. Yes makes it the default sender. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Senders
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].DNSID`: DNSID (number)
- `Data[].Email`: Email (email)
- `Data[].EmailType`: Email Type
- `Data[].Filename`: Filename
- `Data[].ID`: ID (number)
- `Data[].IsDefaultSender`: Is Default Sender (boolean)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_delete_sender`

**Delete Sender.** Deletes a sender; it can no longer send. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `senderId` | string | yes |  | Sender ID. Numeric sender ID, from List Senders or Create Sender. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_get_dns`

**Get Domain.** Gets a sending domain by its DNS ID or domain name, with its SPF and DKIM records and status. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dnsId` | string | yes |  | DNS ID or Domain. Numeric DNS ID (from List Domains or Get Sender) or the domain name. |

Output fields:

- `Count`: Count (number)
- `Data`: DNS Records
- `Data[].DKIMRecordName`: DKIMRecord Name
- `Data[].DKIMRecordValue`: DKIMRecord Value
- `Data[].DKIMStatus`: DKIMStatus
- `Data[].Domain`: Domain
- `Data[].ID`: ID (number)
- `Data[].IsCheckInProgress`: Is Check In Progress (boolean)
- `Data[].LastCheckAt`: Last Check At (datetime)
- `Data[].OwnerShipToken`: Ownership Token
- `Data[].OwnerShipTokenRecordName`: Ownership Token Record Name
- `Data[].SPFRecordValue`: SPFRecord Value
- `Data[].SPFStatus`: SPFStatus
- `Total`: Total (number)

### `mailjet_get_metasender`

**Get Metasender.** Gets a metasender by its numeric ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `metasenderId` | string | yes |  | Metasender ID. Numeric metasender ID, from List Metasenders or Create Metasender. |

Output fields:

- `Count`: Count (number)
- `Data`: Metasenders
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Description`: Description
- `Data[].Email`: Email (email)
- `Data[].Filename`: Filename
- `Data[].ID`: ID (number)
- `Data[].IsEnabled`: Is Enabled (boolean)
- `Total`: Total (number)

### `mailjet_get_sender`

**Get Sender.** Gets a sender by its numeric ID, including its status and DNS ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `senderId` | string | yes |  | Sender ID. Numeric sender ID, from List Senders or Create Sender. |

Output fields:

- `Count`: Count (number)
- `Data`: Senders
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].DNSID`: DNSID (number)
- `Data[].Email`: Email (email)
- `Data[].EmailType`: Email Type
- `Data[].Filename`: Filename
- `Data[].ID`: ID (number)
- `Data[].IsDefaultSender`: Is Default Sender (boolean)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_list_dns`

**List Domains.** Lists the sending domains of the account with their DNS ID, SPF and DKIM status and the records to publish. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: DNS Records
- `Data[].DKIMRecordName`: DKIMRecord Name
- `Data[].DKIMRecordValue`: DKIMRecord Value
- `Data[].DKIMStatus`: DKIMStatus
- `Data[].Domain`: Domain
- `Data[].ID`: ID (number)
- `Data[].IsCheckInProgress`: Is Check In Progress (boolean)
- `Data[].LastCheckAt`: Last Check At (datetime)
- `Data[].OwnerShipToken`: Ownership Token
- `Data[].OwnerShipTokenRecordName`: Ownership Token Record Name
- `Data[].SPFRecordValue`: SPFRecord Value
- `Data[].SPFStatus`: SPFStatus
- `Total`: Total (number)

### `mailjet_list_metasenders`

**List Metasenders.** Lists metasenders (sender addresses or domains usable by every API key of the account). Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Metasenders
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Description`: Description
- `Data[].Email`: Email (email)
- `Data[].Filename`: Filename
- `Data[].ID`: ID (number)
- `Data[].IsEnabled`: Is Enabled (boolean)
- `Total`: Total (number)

### `mailjet_list_senders`

**List Senders.** Lists senders (addresses or *@domain) with their IDs and status; only Active senders can send. Filter by email, domain or status. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Only this sender address. |
| `domain` | string | no |  | Domain. Only senders on this domain. |
| `status` | string | no |  | Status. Only senders with this status. One of `"Inactive"`, `"Active"`, `"Deleted"`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Senders
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].DNSID`: DNSID (number)
- `Data[].Email`: Email (email)
- `Data[].EmailType`: Email Type
- `Data[].Filename`: Filename
- `Data[].ID`: ID (number)
- `Data[].IsDefaultSender`: Is Default Sender (boolean)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_update_metasender`

**Update Metasender.** Sets the description of a metasender (from List Metasenders). The address itself cannot be changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `metasenderId` | string | yes |  | Metasender ID. Numeric metasender ID, from List Metasenders or Create Metasender. |
| `description` | string | yes |  | Description. New description. |

Output fields:

- `Count`: Count (number)
- `Data`: Metasenders
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].Description`: Description
- `Data[].Email`: Email (email)
- `Data[].Filename`: Filename
- `Data[].ID`: ID (number)
- `Data[].IsEnabled`: Is Enabled (boolean)
- `Total`: Total (number)

### `mailjet_update_sender`

**Update Sender.** Updates the name, email type or default flag of a sender. Only the fields you set change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `senderId` | string | yes |  | Sender ID. Numeric sender ID, from List Senders or Create Sender. |
| `name` | string | no |  | Name. New display name. |
| `emailType` | string | no |  | Email Type. Informative type of mail the sender sends. One of `"transactional"`, `"bulk"`, `"unknown"`. |
| `isDefaultSender` | string | no |  | Default Sender. Yes makes it the default sender. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Senders
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].DNSID`: DNSID (number)
- `Data[].Email`: Email (email)
- `Data[].EmailType`: Email Type
- `Data[].Filename`: Filename
- `Data[].ID`: ID (number)
- `Data[].IsDefaultSender`: Is Default Sender (boolean)
- `Data[].Name`: Name
- `Data[].Status`: Status
- `Total`: Total (number)

### `mailjet_validate_sender`

**Validate Sender.** Asks Mailjet to validate a sender through its domain DNS records or validation email, and returns the result and any errors. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `senderId` | string | yes |  | Sender ID. Numeric sender ID, from List Senders or Create Sender. |

Output fields:

- `ValidationMethod`: Validation Method
- `Errors`: Errors
- `Errors.FileValidationError`: File Validation Error
- `Errors.DNSValidationError`: DNS Validation Error
- `GlobalError`: Global Error

### `mailjet_get_campaign_overview`

**Get Campaign Overview.** Gets the overview (subject, status, key counts) of one campaign, draft or A/B test, by the IDType and ID pair from List Campaign Overviews. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idType` | string | yes |  | ID Type. IDType of the overview, from List Campaign Overviews, e.g. "Campaign". |
| `overviewId` | string | yes |  | Overview ID. ID of the campaign overview, from List Campaign Overviews. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaign Overviews
- `Data[].ClickedCount`: Clicked Count (number)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].EditMode`: Edit Mode
- `Data[].EditType`: Edit Type
- `Data[].ID`: ID (number)
- `Data[].IDType`: IDType
- `Data[].OpenedCount`: Opened Count (number)
- `Data[].ProcessedCount`: Processed Count (number)
- `Data[].SendTimeStart`: Send Time Start (number)
- `Data[].Starred`: Starred (boolean)
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].Title`: Title
- `Total`: Total (number)

### `mailjet_get_contact_statistics`

**Get Contact Statistics.** Gets how many messages one contact was sent, opened, clicked, bounced or marked spam. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID or Email. Numeric contact ID (from List Contacts) or the contact email. |

Output fields:

- `Count`: Count (number)
- `Data`: Contact Statistics
- `Data[].BlockedCount`: Blocked Count (number)
- `Data[].BouncedCount`: Bounced Count (number)
- `Data[].ClickedCount`: Clicked Count (number)
- `Data[].ContactID`: Contact ID (number)
- `Data[].DeferredCount`: Deferred Count (number)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].HardBouncedCount`: Hard Bounced Count (number)
- `Data[].LastActivityAt`: Last Activity At (datetime)
- `Data[].MarketingContacts`: Marketing Contacts (number)
- `Data[].OpenedCount`: Opened Count (number)
- `Data[].PreQueuedCount`: Pre Queued Count (number)
- `Data[].ProcessedCount`: Processed Count (number)
- `Data[].QueuedCount`: Queued Count (number)
- `Data[].SoftBouncedCount`: Soft Bounced Count (number)
- `Data[].SpamComplaintCount`: Spam Complaint Count (number)
- `Data[].UnsubscribedCount`: Unsubscribed Count (number)
- `Data[].UserMarketingContacts`: User Marketing Contacts (number)
- `Data[].WorkFlowExitedCount`: Work Flow Exited Count (number)
- `Total`: Total (number)

### `mailjet_get_geo_statistics`

**Get Geographical Statistics.** Gets open and click counts per country for the account, a campaign or a list. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | no |  | Campaign ID. Only this campaign, from List Campaigns. |
| `contactsListId` | number | no |  | Contact List ID. Only this contact list, from List Contact Lists. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Countries
- `Data[].ClickedCount`: Clicked Count (number)
- `Data[].Country`: Country
- `Data[].OpenedCount`: Opened Count (number)
- `Total`: Total (number)

### `mailjet_get_link_click_statistics`

**Get Link Click Statistics.** Gets, for every link in a campaign, its URL, position and unique and total clicks. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | yes |  | Campaign ID. Numeric campaign ID, from List Campaigns. |

Output fields:

- `Count`: Count (number)
- `Data`: Links
- `Data[].URL`: URL (url)
- `Data[].PositionIndex`: Position Index (number)
- `Data[].ClickedMessagesCount`: Clicked Messages Count (number)
- `Data[].ClickedEventsCount`: Clicked Events Count (number)
- `Total`: Total (number)

### `mailjet_get_recipient_esp_statistics`

**Get Mailbox Provider Statistics.** Gets delivered, opened, clicked and bounced counts of a campaign per recipient mailbox provider (Gmail, Outlook, ...). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | yes |  | Campaign ID. Numeric campaign ID, from List Campaigns. |

Output fields:

- `Count`: Count (number)
- `Data`: Mailbox Providers
- `Data[].ESPName`: Mailbox Provider
- `Data[].DeliveredMessagesCount`: Delivered Messages Count (number)
- `Data[].AttemptedMessagesCount`: Attempted Messages Count (number)
- `Data[].OpenedMessagesCount`: Opened Messages Count (number)
- `Data[].ClickedMessagesCount`: Clicked Messages Count (number)
- `Data[].DeferredMessagesCount`: Deferred Messages Count (number)
- `Data[].SoftBouncedMessagesCount`: Soft Bounced Messages Count (number)
- `Data[].HardBouncedMessagesCount`: Hard Bounced Messages Count (number)
- `Data[].UnsubscribedMessagesCount`: Unsubscribed Messages Count (number)
- `Data[].SpamReportsCount`: Spam Reports Count (number)
- `Data[].OpenRate`: Open Rate (number)
- `Data[].ClickThroughRate`: Click Through Rate (number)
- `Data[].SoftBouncedRate`: Soft Bounced Rate (number)
- `Data[].HardBouncedRate`: Hard Bounced Rate (number)
- `Data[].UnsubscribedRate`: Unsubscribed Rate (number)
- `Data[].SpamReportsRate`: Spam Reports Rate (number)
- `Data[].DeferredRate`: Deferred Rate (number)
- `Total`: Total (number)

### `mailjet_get_stat_counters`

**Get Statistics.** Gets sent, delivered, opened, clicked, bounced and other counters for the API key, a campaign, a list or a sender, over the lifetime or per day/hour. List stats need Message timing and Lifetime resolution; sender stats need Message timing. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `counterSource` | string | yes |  | Source. What to count for: APIKey (whole account), Campaign, List or Sender. One of `"APIKey"`, `"Campaign"`, `"List"`, `"Sender"`. |
| `counterTiming` | string | yes |  | Timing. Message counts by send time, Event by event time. One of `"Message"`, `"Event"`. |
| `counterResolution` | string | yes |  | Resolution. Lifetime for one total, Day or Hour for a time series. One of `"Lifetime"`, `"Day"`, `"Hour"`. |
| `sourceId` | number | no |  | Source ID. ID of the campaign, list or sender; not used for APIKey. |
| `fromTs` | string | no |  | From. Start of the period, RFC 3339 or Unix timestamp. |
| `toTs` | string | no |  | To. End of the period, RFC 3339 or Unix timestamp. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Counters
- `Data[].APIKeyID`: APIKey ID (number)
- `Data[].EventClickDelay`: Event Click Delay (duration)
- `Data[].EventClickedCount`: Event Clicked Count (number)
- `Data[].EventOpenDelay`: Event Open Delay (duration)
- `Data[].EventOpenedCount`: Event Opened Count (number)
- `Data[].EventSpamCount`: Event Spam Count (number)
- `Data[].EventUnsubscribedCount`: Event Unsubscribed Count (number)
- `Data[].EventWorkflowExitedCount`: Event Workflow Exited Count (number)
- `Data[].MessageBlockedCount`: Message Blocked Count (number)
- `Data[].MessageClickedCount`: Message Clicked Count (number)
- `Data[].MessageDeferredCount`: Message Deferred Count (number)
- `Data[].MessageHardBouncedCount`: Message Hard Bounced Count (number)
- `Data[].MessageOpenedCount`: Message Opened Count (number)
- `Data[].MessageQueuedCount`: Message Queued Count (number)
- `Data[].MessageSentCount`: Message Sent Count (number)
- `Data[].MessageSoftBouncedCount`: Message Soft Bounced Count (number)
- `Data[].MessageSpamCount`: Message Spam Count (number)
- `Data[].MessageUnsubscribedCount`: Message Unsubscribed Count (number)
- `Data[].MessageWorkFlowExitedCount`: Message Work Flow Exited Count (number)
- `Data[].SourceID`: Source ID (number)
- `Data[].Timeslice`: Timeslice (datetime)
- `Data[].Total`: Total (number)
- `Total`: Total (number)

### `mailjet_get_subscription_statistics`

**Get Subscription Statistics.** Gets the sent, opened, clicked and bounced counts of one subscription, from List Subscriptions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionId` | string | yes |  | Subscription ID. Numeric subscription (list recipient) ID, from List Subscriptions. |

Output fields:

- `Count`: Count (number)
- `Data`: Subscription Statistics
- `Data[].BlockedCount`: Blocked Count (number)
- `Data[].BouncedCount`: Bounced Count (number)
- `Data[].ClickedCount`: Clicked Count (number)
- `Data[].DeferredCount`: Deferred Count (number)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].HardBouncedCount`: Hard Bounced Count (number)
- `Data[].LastActivityAt`: Last Activity At (datetime)
- `Data[].ListRecipientID`: List Recipient ID (number)
- `Data[].OpenedCount`: Opened Count (number)
- `Data[].PreQueuedCount`: Pre Queued Count (number)
- `Data[].ProcessedCount`: Processed Count (number)
- `Data[].QueuedCount`: Queued Count (number)
- `Data[].SoftBouncedCount`: Soft Bounced Count (number)
- `Data[].SpamComplaintCount`: Spam Complaint Count (number)
- `Data[].UnsubscribedCount`: Unsubscribed Count (number)
- `Data[].WorkFlowExitedCount`: Work Flow Exited Count (number)
- `Total`: Total (number)

### `mailjet_get_user_agent_statistics`

**Get User Agent Statistics.** Gets open or click counts per user agent (email client, browser, platform) for the account, a campaign or a list. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event` | string | no |  | Event. Count opens or clicks. One of `"open"`, `"click"`. |
| `campaignId` | number | no |  | Campaign ID. Only this campaign, from List Campaigns. |
| `contactsListId` | number | no |  | Contact List ID. Only this contact list, from List Contact Lists. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: User Agents
- `Data[].Count`: Count (number)
- `Data[].DistinctCount`: Distinct Count (number)
- `Data[].Platform`: Platform
- `Data[].UserAgent`: User Agent
- `Total`: Total (number)

### `mailjet_list_campaign_overviews`

**List Campaign Overviews.** Lists campaigns and drafts with subject, send date and delivered/opened/clicked counts. Filter by sent, draft, scheduled, archived or starred. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sent` | string | no |  | Sent. Yes for sent campaigns. One of `true`, `false`. |
| `drafts` | string | no |  | Drafts. Yes for drafts. One of `true`, `false`. |
| `programmed` | string | no |  | Scheduled. Yes for scheduled campaigns. One of `true`, `false`. |
| `archived` | string | no |  | Archived. Yes for archived campaigns. One of `true`, `false`. |
| `starred` | string | no |  | Starred. Yes for starred campaigns. One of `true`, `false`. |
| `subject` | string | no |  | Subject. Only campaigns with this subject. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Campaign Overviews
- `Data[].ClickedCount`: Clicked Count (number)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].EditMode`: Edit Mode
- `Data[].EditType`: Edit Type
- `Data[].ID`: ID (number)
- `Data[].IDType`: IDType
- `Data[].OpenedCount`: Opened Count (number)
- `Data[].ProcessedCount`: Processed Count (number)
- `Data[].SendTimeStart`: Send Time Start (number)
- `Data[].Starred`: Starred (boolean)
- `Data[].Status`: Status (number)
- `Data[].Subject`: Subject
- `Data[].Title`: Title
- `Total`: Total (number)

### `mailjet_list_contact_statistics`

**List Contact Statistics.** Lists, per contact, how many messages were sent, opened, clicked, bounced or marked spam. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `click` | string | no |  | Clicked. Yes for contacts that clicked. One of `true`, `false`. |
| `open` | string | no |  | Opened. Yes for contacts that opened. One of `true`, `false`. |
| `bounced` | string | no |  | Bounced. Yes for contacts with bounces. One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Contact Statistics
- `Data[].BlockedCount`: Blocked Count (number)
- `Data[].BouncedCount`: Bounced Count (number)
- `Data[].ClickedCount`: Clicked Count (number)
- `Data[].ContactID`: Contact ID (number)
- `Data[].DeferredCount`: Deferred Count (number)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].HardBouncedCount`: Hard Bounced Count (number)
- `Data[].LastActivityAt`: Last Activity At (datetime)
- `Data[].MarketingContacts`: Marketing Contacts (number)
- `Data[].OpenedCount`: Opened Count (number)
- `Data[].PreQueuedCount`: Pre Queued Count (number)
- `Data[].ProcessedCount`: Processed Count (number)
- `Data[].QueuedCount`: Queued Count (number)
- `Data[].SoftBouncedCount`: Soft Bounced Count (number)
- `Data[].SpamComplaintCount`: Spam Complaint Count (number)
- `Data[].UnsubscribedCount`: Unsubscribed Count (number)
- `Data[].UserMarketingContacts`: User Marketing Contacts (number)
- `Data[].WorkFlowExitedCount`: Work Flow Exited Count (number)
- `Total`: Total (number)

### `mailjet_list_subscription_statistics`

**List Subscription Statistics.** Lists, per subscription (contact in a list), the sent, opened, clicked and bounced counts. Filter by list or contact. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactsListId` | number | no |  | Contact List ID. Only this contact list, from List Contact Lists. |
| `contactId` | number | no |  | Contact ID. Only this contact. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Subscription Statistics
- `Data[].BlockedCount`: Blocked Count (number)
- `Data[].BouncedCount`: Bounced Count (number)
- `Data[].ClickedCount`: Clicked Count (number)
- `Data[].DeferredCount`: Deferred Count (number)
- `Data[].DeliveredCount`: Delivered Count (number)
- `Data[].HardBouncedCount`: Hard Bounced Count (number)
- `Data[].LastActivityAt`: Last Activity At (datetime)
- `Data[].ListRecipientID`: List Recipient ID (number)
- `Data[].OpenedCount`: Opened Count (number)
- `Data[].PreQueuedCount`: Pre Queued Count (number)
- `Data[].ProcessedCount`: Processed Count (number)
- `Data[].QueuedCount`: Queued Count (number)
- `Data[].SoftBouncedCount`: Soft Bounced Count (number)
- `Data[].SpamComplaintCount`: Spam Complaint Count (number)
- `Data[].UnsubscribedCount`: Unsubscribed Count (number)
- `Data[].WorkFlowExitedCount`: Work Flow Exited Count (number)
- `Total`: Total (number)

### `mailjet_list_top_links`

**List Top Clicked Links.** Lists the most clicked links with click counts, for the account or one campaign or list. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | number | no |  | Campaign ID. Only this campaign, from List Campaigns. |
| `contactsListId` | number | no |  | Contact List ID. Only this contact list, from List Contact Lists. |
| `fromTs` | string | no |  | From. Start of the period, RFC 3339 or Unix timestamp. |
| `toTs` | string | no |  | To. End of the period, RFC 3339 or Unix timestamp. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Links
- `Data[].ClickedCount`: Clicked Count (number)
- `Data[].LinkId`: Link ID (number)
- `Data[].Url`: URL
- `Total`: Total (number)

### `mailjet_create_template`

**Create Template.** Creates an empty email template. Add its content with Create Template Content, then Publish Template Content before using it in Send Email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Template name, unique in the account. |
| `description` | string | no |  | Description. Short description. |
| `purposes` | array | no |  | Purposes. What the template is for; needed for it to appear in the Mailjet app. One of `"marketing"`, `"transactional"`, `"automation"`, `"opt-in"`. |
| `editMode` | string | no |  | Edit Mode. Editor of the template: HTML builder (default) or MJML builder. One of `2`, `4`. |
| `labelIds` | array | no |  | Label IDs. Numeric label IDs, from List Labels. |

Output fields:

- `Count`: Count (number)
- `Data`: Templates
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].EditMode`: Edit Mode (number)
- `Data[].LabelIDs`: Label IDs
- `Data[].LastContentType`: Last Content Type
- `Data[].PartialIDs`: Partial IDs
- `Data[].Purposes`: Purposes
- `Data[].Categories`: Categories
- `Data[].Presets`: Presets
- `Data[].ExternalID`: External ID
- `Data[].Description`: Description
- `Data[].IsPublished`: Is Published (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].SoftDeleted`: Soft Deleted (boolean)
- `Data[].IsTextPartGenerationEnabled`: Is Text Part Generation Enabled (boolean)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Total`: Total (number)

### `mailjet_create_template_content`

**Create Template Content.** Saves a new draft content version (HTML, text and/or MJML plus headers) for a template. Provide at least one of HTML Part, Text Part or MJML Part. Publish it with Publish Template Content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |
| `locale` | string | yes |  | Locale. Locale of the content, e.g. "en_US". |
| `htmlPart` | string | no |  | HTML Part. HTML content. |
| `textPart` | string | no |  | Text Part. Plain-text content. |
| `mjmlPart` | string | no |  | MJML Part. MJML source, for MJML templates. |
| `headers` | object | no |  | Headers. Template headers such as Subject, SenderName, SenderEmail, Reply-To. |
| `name` | string | no |  | Name. Name of this content version. |
| `author` | string | no |  | Author. Who wrote this content. |

Output fields:

- `Count`: Count (number)
- `Data`: Contents
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].UserID`: User ID (number)
- `Data[].TemplateID`: Template ID (number)
- `Data[].ContentType`: Content Type
- `Data[].Author`: Author
- `Data[].Name`: Name
- `Data[].IsLocked`: Is Locked (boolean)
- `Data[].Locale`: Locale
- `Data[].HTMLPart`: HTML Part
- `Data[].TextPart`: Text Part
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Data[].MJMLPart`: MJML Part
- `Total`: Total (number)

### `mailjet_delete_template`

**Delete Template.** Permanently deletes a template and all its content versions. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |

Output fields:

- `deleted`: Deleted (boolean)

### `mailjet_get_template`

**Get Template.** Gets a template by its numeric ID, including its ExternalID and publish state. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |

Output fields:

- `Count`: Count (number)
- `Data`: Templates
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].EditMode`: Edit Mode (number)
- `Data[].LabelIDs`: Label IDs
- `Data[].LastContentType`: Last Content Type
- `Data[].PartialIDs`: Partial IDs
- `Data[].Purposes`: Purposes
- `Data[].Categories`: Categories
- `Data[].Presets`: Presets
- `Data[].ExternalID`: External ID
- `Data[].Description`: Description
- `Data[].IsPublished`: Is Published (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].SoftDeleted`: Soft Deleted (boolean)
- `Data[].IsTextPartGenerationEnabled`: Is Text Part Generation Enabled (boolean)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Total`: Total (number)

### `mailjet_get_template_content`

**Get Template Content.** Gets the latest draft or published content of a template. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |
| `contentType` | string | yes |  | Version. D for the draft content, P for the published content. One of `"D"`, `"P"`. |

Output fields:

- `Count`: Count (number)
- `Data`: Contents
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].UserID`: User ID (number)
- `Data[].TemplateID`: Template ID (number)
- `Data[].ContentType`: Content Type
- `Data[].Author`: Author
- `Data[].Name`: Name
- `Data[].IsLocked`: Is Locked (boolean)
- `Data[].Locale`: Locale
- `Data[].HTMLPart`: HTML Part
- `Data[].TextPart`: Text Part
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Total`: Total (number)

### `mailjet_list_template_contents`

**List Template Contents.** Lists the draft and published content versions of a template. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |
| `locale` | string | no |  | Locale. Only content in this locale. |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Contents
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].UserID`: User ID (number)
- `Data[].TemplateID`: Template ID (number)
- `Data[].ContentType`: Content Type
- `Data[].Author`: Author
- `Data[].Name`: Name
- `Data[].IsLocked`: Is Locked (boolean)
- `Data[].Locale`: Locale
- `Data[].HTMLPart`: HTML Part
- `Data[].TextPart`: Text Part
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Total`: Total (number)

### `mailjet_list_templates`

**List Templates.** Lists email templates with their IDs, names and ExternalID (the ID used as Template ID in Send Email once the template is published). Filter by name, publish state or label. Page with Limit and Offset. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partialName` | string | no |  | Name Contains. Only templates whose name contains this text. |
| `isPublished` | string | no |  | Published. Yes for published templates only, No for unpublished. One of `true`, `false`. |
| `isStarred` | string | no |  | Starred. Yes for starred templates only. One of `true`, `false`. |
| `locale` | string | no |  | Locale. Only templates in this locale, e.g. "en_US". |
| `limit` | number | no |  | Limit. Maximum number of records to return (1-1000). Mailjet defaults to 10. |
| `offset` | number | no |  | Offset. Number of records to skip. Add the limit to it to fetch the next page. |
| `sort` | string | no |  | Sort. Field to sort by, optionally followed by " DESC", e.g. "ID DESC". Some resources reject DESC or a field with a 400; omit sort then. |

Output fields:

- `Count`: Count (number)
- `Data`: Templates
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].EditMode`: Edit Mode (number)
- `Data[].LabelIDs`: Label IDs
- `Data[].LastContentType`: Last Content Type
- `Data[].PartialIDs`: Partial IDs
- `Data[].Purposes`: Purposes
- `Data[].Categories`: Categories
- `Data[].Presets`: Presets
- `Data[].ExternalID`: External ID
- `Data[].Description`: Description
- `Data[].IsPublished`: Is Published (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].SoftDeleted`: Soft Deleted (boolean)
- `Data[].IsTextPartGenerationEnabled`: Is Text Part Generation Enabled (boolean)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Total`: Total (number)

### `mailjet_lock_template_content`

**Lock Template Content.** Locks the template content so it cannot be edited until unlocked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |

Output fields:

- `locked`: Locked (boolean)

### `mailjet_publish_template_content`

**Publish Template Content.** Publishes the latest draft content of a template so Send Email uses it. Republishing the same draft changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |

Output fields:

- `Count`: Count (number)
- `Data`: Contents
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].UserID`: User ID (number)
- `Data[].TemplateID`: Template ID (number)
- `Data[].ContentType`: Content Type
- `Data[].Author`: Author
- `Data[].Name`: Name
- `Data[].IsLocked`: Is Locked (boolean)
- `Data[].Locale`: Locale
- `Data[].HTMLPart`: HTML Part
- `Data[].TextPart`: Text Part
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Total`: Total (number)

### `mailjet_unlock_template_content`

**Unlock Template Content.** Unlocks template content locked with Lock Template Content. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |

Output fields:

- `locked`: Locked (boolean)

### `mailjet_update_template`

**Update Template.** Updates the name, description, purposes, labels or starred flag of a template. Only the fields you set change. Content is changed with Update Template Content. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |
| `name` | string | no |  | Name. New template name. |
| `description` | string | no |  | Description. New description. |
| `purposes` | array | no |  | Purposes. What the template is for; needed for it to appear in the Mailjet app. One of `"marketing"`, `"transactional"`, `"automation"`, `"opt-in"`. |
| `labelIds` | array | no |  | Label IDs. Numeric label IDs, from List Labels. |
| `isStarred` | string | no |  | Starred. Yes stars the template, No unstars it. One of `true`, `false`. |

Output fields:

- `Count`: Count (number)
- `Data`: Templates
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].Name`: Name
- `Data[].EditMode`: Edit Mode (number)
- `Data[].LabelIDs`: Label IDs
- `Data[].LastContentType`: Last Content Type
- `Data[].PartialIDs`: Partial IDs
- `Data[].Purposes`: Purposes
- `Data[].Categories`: Categories
- `Data[].Presets`: Presets
- `Data[].ExternalID`: External ID
- `Data[].Description`: Description
- `Data[].IsPublished`: Is Published (boolean)
- `Data[].IsStarred`: Is Starred (boolean)
- `Data[].SoftDeleted`: Soft Deleted (boolean)
- `Data[].IsTextPartGenerationEnabled`: Is Text Part Generation Enabled (boolean)
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Total`: Total (number)

### `mailjet_update_template_content`

**Update Template Content.** Updates the latest draft content of a template. Only the fields you set change. Fails when the content is locked (see Unlock Template Content). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. Numeric template ID, from List Templates or Create Template. |
| `locale` | string | no |  | Locale. Locale of the content, e.g. "en_US". |
| `htmlPart` | string | no |  | HTML Part. HTML content. |
| `textPart` | string | no |  | Text Part. Plain-text content. |
| `mjmlPart` | string | no |  | MJML Part. MJML source, for MJML templates. |
| `headers` | object | no |  | Headers. Template headers such as Subject, SenderName, SenderEmail, Reply-To. |
| `name` | string | no |  | Name. Name of this content version. |
| `author` | string | no |  | Author. Who wrote this content. |

Output fields:

- `Count`: Count (number)
- `Data`: Contents
- `Data[].ID`: ID (number)
- `Data[].OrganisationID`: Organisation ID (number)
- `Data[].UserID`: User ID (number)
- `Data[].TemplateID`: Template ID (number)
- `Data[].ContentType`: Content Type
- `Data[].Author`: Author
- `Data[].Name`: Name
- `Data[].IsLocked`: Is Locked (boolean)
- `Data[].Locale`: Locale
- `Data[].HTMLPart`: HTML Part
- `Data[].TextPart`: Text Part
- `Data[].CreatedAt`: Created At (datetime)
- `Data[].UpdatedAt`: Updated At (datetime)
- `Data[].MJMLPart`: MJML Part
- `Total`: Total (number)

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
