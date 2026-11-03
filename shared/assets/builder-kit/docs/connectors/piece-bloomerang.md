# Bloomerang

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bloomerang'
  version: '0.1.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API key acquired from your Bloomerang crm

## Actions

### `upsert_contact_duplicates`

**Upsert Contact (Duplicates).** Update or create bloomerang contact using duplicates. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | no |  | First name. First name. |
| `last_name` | string | no |  | Last name. Last name. |
| `organization_name` | string | no |  | Organization name. Organization name. |
| `street` | string | no |  | Street. Street. |
| `phone_number` | string | no |  | Phone number. Phone number. |
| `email_address` | string | no |  | Email. Email. |
| `type` | string | no |  | Type. Type. |
| `contact_json` | JSON | yes | `{"Type":"Individual","FirstName":"name","LastName":"surname","FullName":"full name","PrimaryEmail":{"Type":"Home","Value":"test@test.com"}}` | Contact (JSON). The Contact JSON. |

### `upsert_contact_search`

**Upsert Contact (Search).** Update or create bloomerang contact using the search. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Search. The text to search. |
| `skip` | number | no |  | Skip. The number of items to skip before starting to collect the result set. |
| `take` | number | no |  | Take. The number of items to include in the result set. |
| `contact_type` | string | no |  | Contact type. Select the object. One of `"Individual"`, `"Organization"`, `"Household"`. |
| `contact_json` | JSON | yes | `{"Type":"Individual","FirstName":"name","LastName":"surname","FullName":"full name","PrimaryEmail":{"Type":"Home","Value":"test@test.com"}}` | Contact (JSON). The Contact JSON. |

### `create_transaction`

**Create a transaction (Advanced).** Create a transaction. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transaction` | JSON | yes | `{"AccountId":0,"Date":"2023-06-13","Amount":0,"Method":"None","EntryMethod":"Tap","MethodOrigin":"Forms","CheckNumber":"string","CheckDate":"2023-06-13","CreditCardType":"Visa","CreditCardLastFourDigits":"string","CreditCardExpMonth":0,"CreditCardExpYear":0,"EftAccountType":"Checking","EftLastFourDigits":"string","EftRoutingNumber":"string","InKindDescription":"string","InKindType":"Goods","InKindMarketValue":0,"WalletItemId":0,"IntegrationUrl":"string","Designations":[{"Amount":0,"Note":"string","AcknowledgementStatus":"Yes","AcknowledgementInteractionIds":[0],"Type":"Donation","NonDeductibleAmount":0,"FundId":0,"QuickbooksAccountId":0,"CampaignId":0,"AppealId":0,"TributeId":0,"SoftCredits":[null],"CustomValues":[{"FieldId":0,"Value":"string"},{"FieldId":0,"ValueId":0},{"FieldId":0,"ValueIds":[0]}],"Attachments":[null,null]},{"PledgeFrequency":"Weekly","Amount":0,"Note":"string","AcknowledgementStatus":"Yes","AcknowledgementInteractionIds":[0],"Type":"Pledge","PledgeInstallments":[{"Date":"2023-06-13","Amount":0}],"NonDeductibleAmount":0,"FundId":0,"QuickbooksAccountId":0,"CampaignId":0,"AppealId":0,"TributeId":0,"SoftCredits":[null],"CustomValues":[{"FieldId":0,"Value":"string"},{"FieldId":0,"ValueId":0},{"FieldId":0,"ValueIds":[0]}],"Attachments":[null,null]},{"Amount":0,"Note":"string","AcknowledgementStatus":"Yes","AcknowledgementInteractionIds":[0],"Type":"PledgePayment","PledgeId":0,"CustomValues":[{"FieldId":0,"Value":"string"},{"FieldId":0,"ValueId":0},{"FieldId":0,"ValueIds":[0]}],"Attachments":[null,null]},{"RecurringDonationEndDate":"2023-06-13","Amount":0,"Note":"string","AcknowledgementStatus":"Yes","AcknowledgementInteractionIds":[0],"RecurringDonationFrequency":"Weekly","RecurringDonationDay1":0,"RecurringDonationDay2":0,"RecurringDonationStartDate":"2023-06-13","Type":"RecurringDonation","FundId":0,"QuickbooksAccountId":0,"CampaignId":0,"AppealId":0,"TributeId":0,"SoftCredits":[null],"CustomValues":[{"FieldId":0,"Value":"string"},{"FieldId":0,"ValueId":0},{"FieldId":0,"ValueIds":[0]}],"Attachments":[null,null]},{"Amount":0,"Note":"string","AcknowledgementStatus":"Yes","AcknowledgementInteractionIds":[0],"Type":"RecurringDonationPayment","RecurringDonationId":0,"FundId":0,"QuickbooksAccountId":0,"CampaignId":0,"AppealId":0,"IsExtraPayment":true,"CustomValues":[{"FieldId":0,"Value":"string"},{"FieldId":0,"ValueId":0},{"FieldId":0,"ValueIds":[0]}],"Attachments":[null,null]}],"Attachments":[{"Guid":"string","Name":"string","Extension":"string","Url":"string"},{"Id":0,"Name":"string","Extension":"string","Url":"string"}]}` | Transaction (JSON). The Transaction JSON. |

### `get_contacts`

**Get contacts.** Get all contacts after date. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `last_modified_date` | string | yes | `"1970-01-01T00:00:00.000Z"` | Last Modified Date. The date to search for contacts modified after. |
| `skip` | number | no |  | The number of items to skip. The number of items to skip before starting to collect the result set. |
| `take` | number | no |  | The number of items to include. The number of items to include in the result set. |
| `is_favorite` | boolean | no | `false` | Is favorite. Filters constituents to only constituents the user has favorited. |
| `type` | string | no |  | Contact type. Select the object. One of `"Individual"`, `"Organization"`, `"Household"`. |
| `order_by` | string | no |  | Sorts by Id, CreatedDate, or LastModifiedDate (default Id). Available values : Id, CreatedDate, LastModifiedDate. |
| `order_direction` | string | no |  | Sorts the orderBy in ascending or descending order.. Available values : Asc, Desc. |
| `id` | array | no |  | IDs list. Filters results based on the ID for the constituent. |

### `get_transaction_stuff`

**Get Transaction Stuff (Advanced).** Get Transaction Stuff. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transaction_stuff` | string | yes |  | Transaction stuff. Select the object. One of `"campaigns"`, `"appeals"`, `"funds"`. |
| `skip` | number | no |  | The number of items to skip. The number of items to skip before starting to collect the result set. |
| `take` | number | no |  | The number of items to include. The number of items to include in the result set. |
| `id` | array | no |  | IDs list. Filters to object with the IDs in the list (pipe-separated) |
| `include_inactive` | boolean | no | `false` | Filters to either active or inactive funds. Filters to either active or inactive funds. |
| `has_goal` | boolean | no | `false` | Filters to campaigns. Filters to campaigns that have either non-zero-dollar or zero-dollar goals. |
| `limit` | string | no |  | Filters to funds with names. Filters to funds with names that match any part of the search string. |
