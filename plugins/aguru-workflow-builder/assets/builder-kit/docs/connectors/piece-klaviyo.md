# Klaviyo

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-klaviyo'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Private API Key

> Authenticate using your Klaviyo Private API Key.
>
> **Steps:**
> 1. Log in to Klaviyo → go to **Settings → API Keys**
> 2. Click **Create Private API Key**
> 3. Give it a name and select the required scopes
> 4. Copy the key (starts with `pk_`) and paste it below

### `OAUTH2`: Connection

> To connect via OAuth2, follow the [Klaviyo OAuth setup guide](https://developers.klaviyo.com/en/docs/set_up_oauth) to register your app, then set the **Redirect URI** to {{redirectUrl}} and enable the following **scopes** in your app settings:
> - profiles:read
> - profiles:write
> - lists:read
> - lists:write
> - tags:read
> - segments:read
> - events:read
> - events:write
> - subscriptions:read
> - subscriptions:write
> - accounts:read

## Actions

### `createProfile`

**Create Profile.** Creates a new profile (contact) in Klaviyo with identity, location, and custom-property attributes. Use when adding a person who is not yet in Klaviyo; to modify someone who already exists use Update Profile. Requires at least one identifier (email, phone number, or external ID); not idempotent, so each call creates a profile. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Email address (recommended identifier) |
| `phone_number` | string | no |  | Phone Number. Phone number in E.164 format (e.g., +15005550006) |
| `external_id` | string | no |  | External ID. Unique identifier from external system. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `organization` | string | no |  | Organization. Company name. |
| `locale` | string | no |  | Locale. Language tag (e.g., en-US) |
| `title` | string | no |  | Job Title. |
| `image` | string | no |  | Image URL. Profile image URL. |
| `address1` | string | no |  | Address 1. Street address line 1. |
| `address2` | string | no |  | Address 2. Street address line 2. |
| `city` | string | no |  | City. |
| `country` | string | no |  | Country. |
| `region` | string | no |  | Region/State. |
| `zip` | string | no |  | Zip Code. |
| `timezone` | string | no |  | Timezone. IANA timezone (e.g., America/New_York) |
| `ip` | string | no |  | IP Address. |
| `latitude` | number | no |  | Latitude. Latitude coordinate (4 decimal places recommended) |
| `longitude` | number | no |  | Longitude. Longitude coordinate (4 decimal places recommended) |
| `custom_properties` | object | no |  | Custom Properties. Key-value pairs for segmentation and personalization. |
| `include_subscriptions` | boolean | no | `false` | Include Subscriptions. Return subscription data in response. |
| `include_predictive_analytics` | boolean | no | `false` | Include Predictive Analytics. Return predictive analytics in response. |

### `updateProfile`

**Update Profile.** Updates an existing Klaviyo profile by its profile ID, overwriting only the supplied identity, location, and custom-property fields. Use when modifying a known profile; the profile ID is required, so resolve it first (e.g. via Find Profile by Email/Phone). Idempotent: re-running with the same input leaves the profile in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profile_id` | string | yes |  | Profile Id. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. Individual's email address. |
| `phone_number` | string | no |  | Phone Number. Phone number in E.164 format (e.g., +15005550006) |
| `external_id` | string | no |  | External ID. Unique identifier from external system (e.g., POS system) |
| `anonymous_id` | string | no |  | Anonymous ID. Anonymous identifier for the profile. |
| `first_name` | string | no |  | First Name. Individual's first name. |
| `last_name` | string | no |  | Last Name. Individual's last name. |
| `organization` | string | no |  | Organization. Company or organization name. |
| `locale` | string | no |  | Locale. Locale in IETF BCP 47 format (e.g., en-US) |
| `title` | string | no |  | Title. Individual's job title. |
| `image` | string | no |  | Image URL. URL pointing to profile image location. |
| `address1` | string | no |  | Address 1. First line of street address. |
| `address2` | string | no |  | Address 2. Second line of street address. |
| `city` | string | no |  | City. City name. |
| `country` | string | no |  | Country Code. Enter 2-letter ISO country code. Popular: US, GB, CA, DE, FR, AU, JP, CN, IN, BR. |
| `region` | string | no |  | Region. Region within country (state/province) |
| `zip` | string | no |  | Zip Code. Postal/zip code. |
| `timezone` | string | no |  | Timezone. IANA timezone (e.g., America/New_York) |
| `ip` | string | no |  | IP Address. IP address of the profile. |
| `latitude` | number | no |  | Latitude. Latitude coordinate (4 decimal places recommended) |
| `longitude` | number | no |  | Longitude. Longitude coordinate (4 decimal places recommended) |
| `custom_properties` | object | no |  | Custom Properties. Key/value pairs for custom profile properties. |
| `include_subscriptions` | boolean | no | `false` | Include Subscriptions. Include subscription data in response. |
| `include_predictive_analytics` | boolean | no | `false` | Include Predictive Analytics. Include predictive analytics data in response. |

### `addProfileToList`

**Add Profile to List.** Adds one or more existing profiles (by profile ID) to a Klaviyo list as members, without altering their email/SMS subscription consent. Use to manage list membership; for opt-in/consent changes use Subscribe Profile instead. Requires a list ID and at least one profile ID; idempotent, since re-adding an existing member is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List Id. A value the product loads from the provider, such as an id; write the value itself. |
| `profile_id` | array | yes |  | Profile Ids. Select one or more Klaviyo profiles. Values the product loads from the provider, such as ids; write an array of them. |

### `createList`

**Create List.** Creates a new, empty subscriber list in Klaviyo with the given name. Use when you need a fresh list to group profiles into; to find an existing list use Find List by Name. Requires a non-empty name; not idempotent, so each call creates another list even if the name matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | List Name. Name for the new list. |

### `findListByName`

**Find List by Name.** Looks up Klaviyo lists by an exact name match and returns the matching lists with their IDs. Use to resolve a list name into a list ID before actions that require one (add/remove/subscribe). Requires a list name; matching is exact, not partial. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_query` | string | yes |  | List Name(s). Enter list name. |
| `include_additional_data` | boolean | no | `false` | Include Additional Data. Include related flow and tag information. |

### `findProfileByEmailPhone`

**Find Profile by Email/Phone.** Looks up a Klaviyo profile by exact email address or phone number and returns matching profiles with their IDs. The search value is auto-detected as an email (must contain "@" and be valid) or a phone number (E.164 recommended). Use to resolve a contact into a profile ID before update/subscribe/list actions. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_query` | string | yes |  | Email or Phone Number. Enter an email address or phone number (E.164 format recommended) |
| `include_additional_data` | boolean | no | `false` | Include Additional Data. Include subscriptions and predictive analytics data. |

### `findTagByName`

**Find Tag by Name.** Searches Klaviyo tags by a partial (contains) name match and returns matching tags with their IDs. Use to discover tag IDs by keyword. Requires a search value; matching is substring-based, not exact. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_query` | string | yes |  | Tag Name. Search for tags whose name contains this value. |

### `removeProfileFromList`

**Remove Profile from List.** Removes one or more profiles (by profile ID) from a Klaviyo list, ending their membership without changing subscription consent. Use to take profiles off a list; requires a list ID and at least one profile ID (max 1000 per call). Idempotent, since removing a profile that is not a member is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List Id. A value the product loads from the provider, such as an id; write the value itself. |
| `profile_ids` | array | yes |  | Profile Ids. Select one or more Klaviyo profiles. Values the product loads from the provider, such as ids; write an array of them. |

### `subscribeProfile`

**Subscribe Profile.** Opts profiles in to email and/or SMS marketing consent via a bulk subscription job, optionally scoped to a list. At least one channel must be selected; enabling historical import bypasses double opt-in and requires a consent date. Use this for consent changes rather than Add Profile to List (which only sets membership). Not idempotent: each call queues a new subscription job (max 1000 profiles). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List Id. A value the product loads from the provider, such as an id; write the value itself. |
| `profile_ids` | array | yes |  | Profile Ids. Select one or more Klaviyo profiles. Values the product loads from the provider, such as ids; write an array of them. |
| `subscribe_email` | boolean | no | `true` | Subscribe to Email. Subscribe selected profiles to email marketing. |
| `subscribe_sms` | boolean | no | `false` | Subscribe to SMS. Subscribe selected profiles to SMS marketing. |
| `historical_import` | boolean | no | `false` | Historical Import. Bypass double opt-in and mark as a historical import. |
| `consented_at` | string | no |  | Consent Date. ISO 8601 datetime when consent was given (required for historical import, e.g. 2024-01-15T10:00:00Z). |
| `custom_source` | string | no |  | Custom Source. Label for the subscription source (e.g. "Website Form"). |

### `unsubscribeProfile`

**Unsubscribe Profile.** Opts profiles out of email, SMS, and/or SMS transactional consent via a bulk unsubscribe job, optionally scoped to a list. At least one channel must be selected. Use to revoke marketing consent; not idempotent, since each call queues a new unsubscribe job (max 100 profiles). Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List Id. A value the product loads from the provider, such as an id; write the value itself. |
| `profile_ids` | array | yes |  | Profile Ids. Select one or more Klaviyo profiles. Values the product loads from the provider, such as ids; write an array of them. |
| `unsubscribe_email` | boolean | no | `true` | Unsubscribe from Email. Unsubscribe selected profiles from email marketing. |
| `unsubscribe_sms` | boolean | no | `false` | Unsubscribe from SMS. Unsubscribe selected profiles from SMS marketing. |
| `unsubscribe_sms_transactional` | boolean | no | `false` | Unsubscribe from SMS Transactional. Unsubscribe selected profiles from SMS transactional messages. |

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
