# ClickSend SMS

Cloud-based messaging platform for sending SMS, MMS, voice, email, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-clicksend'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> You can get your API credentials by clicking 'API Credentials' on the top right of the dashboard.

## Actions

### `send_sms`

**Send SMS.** Sends one or more SMS text messages via ClickSend, each with its own recipient phone number (in international format) and body. Choose this to deliver text notifications, alerts, or one-off messages to phone numbers. Not idempotent: each call dispatches the messages again, so repeating it sends duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messages` | array | yes |  | Messages. Each item: { `to`, `body`, `from`?, `custom_string`?, `country`?, `message_expiry`?, `priority`? }. |

### `send_mms`

**Send MMS.** Sends an MMS multimedia message via ClickSend to a recipient phone number, attaching a media file referenced by URL along with a subject and body. Choose this over Send SMS when the message must include an image, video, or other media. Requires a publicly reachable media URL; not idempotent, as each call dispatches the message again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. The phone number (with country code, e.g., +1234567890) |
| `body` | string | yes |  | Message Body. The body of the message to send. |
| `subject` | string | yes |  | Subject. |
| `from` | string | yes |  | From. A value the product loads from the provider, such as an id; write the value itself. |
| `media_url` | string | yes |  | Media URL. The URL of the media file to send (image, video, etc.) |

### `create_contact`

**Create Contact.** Adds a new contact (phone number plus optional email, name, company, and address fields) to a specific ClickSend contact list identified by its list id. Choose this to populate a list before messaging. Requires a valid phone number; not idempotent, as repeating the call attempts to create another contact and the API rejects duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_list_id` | string | yes |  | Contact List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `phone_number` | string | yes |  | Phone Number. The phone number of the contact. |
| `email` | string | no |  | Email Address. The email address of the contact. |
| `first_name` | string | no |  | First Name. The first name of the contact. |
| `last_name` | string | no |  | Last Name. The last name of the contact. |
| `company_name` | string | no |  | Company Name. The company name of the contact. |
| `address_line_1` | string | no |  | Address Line 1. The first line of the address. |
| `address_line_2` | string | no |  | Address Line 2. The second line of the address. |
| `city` | string | no |  | City. The city of the contact. |
| `state` | string | no |  | State/Province. The state/province of the contact. |
| `postal_code` | string | no |  | Postal Code. The postal code of the contact. |
| `country` | string | no |  | Country. The country of the contact. |

### `update_contact`

**Update Contact.** Updates the details of an existing ClickSend contact, identified by its contact id within a given contact list, applying only the fields you supply (phone, email, name, company, address). Choose this to edit a known contact rather than create one. Idempotent: re-sending the same values leaves the contact in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_list_id` | string | yes |  | Contact List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |
| `phone_number` | string | no |  | Phone Number. The phone number of the contact. |
| `email` | string | no |  | Email Address. The email address of the contact. |
| `first_name` | string | no |  | First Name. The first name of the contact. |
| `last_name` | string | no |  | Last Name. The last name of the contact. |
| `company_name` | string | no |  | Company Name. The company name of the contact. |
| `address_line_1` | string | no |  | Address Line 1. The first line of the address. |
| `address_line_2` | string | no |  | Address Line 2. The second line of the address. |
| `city` | string | no |  | City. The city of the contact. |
| `state` | string | no |  | State/Province. The state/province of the contact. |
| `postal_code` | string | no |  | Postal Code. The postal code of the contact. |
| `country` | string | no |  | Country. The country of the contact. |

### `delete_contact`

**Delete Contact.** Removes a contact, identified by its contact id, from a specific ClickSend contact list. Choose this to permanently delete a known contact from a list. Effectively idempotent: once removed, repeating the call has no further effect (a missing contact returns a not-found error rather than altering state). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_list_id` | string | yes |  | Contact List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |

### `create_contact_list`

**Create Contact List.** Creates a new ClickSend contact list with the given name, returning a list id that other contact actions reference. Choose this to set up a list before adding contacts. Requires a non-empty name; not idempotent, as repeating the call attempts to create another list and the API rejects a duplicate name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_name` | string | yes |  | List Name. |

### `find_contact_by_email`

**Find Contact by Email.** Searches a specific ClickSend contact list for a contact whose email exactly matches the given address, paging through the whole list until a match is found. Choose this to look up or verify a contact by email before updating or messaging them. Requires a valid email and the target list id; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_list_id` | string | yes |  | Contact List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address. |

### `find_contact_by_phone`

**Find Contact by Phone.** Searches a specific ClickSend contact list for a contact whose phone number exactly matches the given value, paging through the whole list until a match is found. Choose this to look up or verify a contact by phone before updating or messaging them. Requires a valid phone number and the target list id; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_list_id` | string | yes |  | Contact List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `phone_number` | string | yes |  | Phone Number. The phone number (with country code, e.g., +1234567890) |

### `find_contact_lists`

**Find Contact List.** Searches all ClickSend contact lists for one whose name exactly matches the given search term, paging through every list until a match is found. Choose this to resolve a list name to its list id for use by the contact actions. Matching is exact (not partial); read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Search. Search by list name. |

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
