# Freshsales

Sales CRM software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-freshsales'
  version: '0.5.2'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> To obtain your API key and bundle alias, follow these steps:
>
> 1. Log in to your Freshsales account.
> 2. Click on your profile icon in the top-right corner of the screen and select **Settings** from the dropdown menu.
> 3. In the settings menu, select **API Settings** from the left-hand navigation panel.
> 4. You should now see your API key displayed on the screen. If you don't see an API key.
> 5. Copy the alias e.g **https://<alias>.myfreshworks.com**

## Actions

### `freshsales_create_contact`

**Create Contact.** Creates a new contact record in Freshsales CRM with the given details (email is required; name, phone, address, social handles, owner/territory/account IDs, and marketing attribution fields are optional). Use when an agent needs to add a person to the CRM. Not idempotent: each call creates a new contact and may produce duplicates if repeated. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | no |  | First name. First name of the contact. |
| `last_name` | string | no |  | Last name. Last name of the contact. |
| `job_title` | string | no |  | Job title. Designation of the contact in the account they belong to. |
| `email` | string | yes |  | Email. Primary email address of the contact. |
| `work_number` | string | no |  | Work number. Work phone number of the contact. |
| `mobile_number` | string | no |  | Mobile number. Mobile phone number of the contact. |
| `address` | string | no |  | Address. Address of the contact. |
| `city` | string | no |  | City. City that the contact belongs to. |
| `state` | string | no |  | State. State that the contact belongs to. |
| `zipcode` | string | no |  | Zip code. Zipcode of the region that the contact belongs to. |
| `country` | string | no |  | Country. Country that the contact belongs to. |
| `territory_id` | string | no |  | Territory id. ID of the territory that the contact belongs to. |
| `owner_id` | string | no |  | Owner id. ID of the user to whom the contact has been assigned. |
| `subscription_status` | string | no |  | Subscription status. Status of subscription that the contact is in. |
| `medium` | string | no |  | Medium. The medium that led your contact to your website/web app. |
| `campaign_id` | string | no |  | Campaign id. The campaign that led your contact to your web app. |
| `keyword` | string | no |  | Keyword. The keywords that the contact used to reach your website/web app. |
| `time_zone` | string | no |  | Timezone. Timezone that the contact belongs to. |
| `facebook` | string | no |  | Facebook. Facebook username of the contact. |
| `twitter` | string | no |  | Twitter. Twitter username of the contact. |
| `linkedin` | string | no |  | Linkedin. LinkedIn account of the contact. |
| `contact_status_id` | string | no |  | Contact status id. ID of the contact status that the contact belongs to. |
| `sales_account_id` | string | no |  | Sales account id. ID of the primary account that the contact belongs to. |

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
