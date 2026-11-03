# Blackbaud

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-blackbaud'
  version: '0.3.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Authentication

## Actions

### `search_contacts_after_date`

**Search Contacts After Date.** Search contacts. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_key` | string | yes |  | Subscription Key. |
| `last_modified_date` | string | yes | `"2021-01-01T00:00:00.000Z"` | Last Modified Date. The date to search for contacts modified after. |

### `upssert_contact_if_not_exists`

**Upsert Contact on Email.** Upsert Contact based on Email. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_key` | string | yes |  | Subscription Key. |
| `contact_json` | JSON | yes | `{"email":{"address":"Kilgore_Trout64@gmail.com","do_not_email":false,"inactive":false,"primary":true,"type":"Email"},"first":"Kilgore","last":"Trout","phone":{"do_not_call":false,"inactive":false,"number":"843-537-3397","primary":true,"type":"Home"},"address":{"street1":"Street 41","city":"Calforina","state":"CA","zip":"19941","type":"Business","country":"USA"},"type":"Individual"}` | Contact (JSON). The Contact JSON. |

### `get_gift_subtypes`

**Get Gift subtypes .** Returns a list of gift subtypes. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_key` | string | yes |  | Subscription Key. |

### `get_fundraising_list`

**Get Fundraising List.** Get Fundraising List. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_key` | string | yes |  | Subscription Key. |
| `fundraiser_list` | string | yes |  | Fundraising List. Select the List. One of `"campaigns"`, `"appeals"`, `"funds"`. |
| `last_modified_date` | string | no |  | Last Modified Date. The date to search for appeal modified after \| 2021-01-01T00:00:00.000Z. |
| `date_added` | string | no |  | Date added. The date to search for contacts modified after \| 2021-01-01T00:00:00.000Z. |
| `sort_token` | string | no |  | Sort token. Represents a token filter to provide the next stable-sorted list of appeals. |
| `include_inactive` | boolean | yes | `false` | Include inactive. Include inactive appeals in the response. |
| `limit` | number | no |  | Limit. Represents the number of records to return. The default is 500. The maximum is 5000. |

### `create_gift`

**Create gift.** Create gift. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription_key` | string | yes |  | Subscription Key. |
| `gift_json` | JSON | yes | `{"amount":{"value":100},"constituent_id":"280","gift_splits":[{"amount":{"value":100},"fund_id":"41"}],"type":"Donation","payments":[{"payment_method":"Cash"}]}` | Gift (JSON). The Gift JSON. |
