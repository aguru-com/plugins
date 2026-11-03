# AiPrise

KYC, KYB, and fraud prevention platform — verify user identities, onboard businesses, run AML/sanctions checks, and detect fraud signals.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-aiprise'
  version: '0.2.2'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: API Key

> To get your AiPrise API key:
> 1. Log in to your [AiPrise dashboard](https://app.aiprise.com)
> 2. Go to **Settings > API Keys**
> 3. Copy your API key and paste it here

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secret_text` | string | yes |  | API Key. Your AiPrise API key. |
| `environment` | string | yes |  | Environment. Select the AiPrise environment to use. One of `"production"`, `"sandbox"`. |

## Actions

### `run_user_verification_profile`

**Start Identity Verification for profile.** Starts a server-side identity (KYC) verification for an existing user profile by running the checks bundled in a given AiPrise template (ID scan, liveness, address, etc.). Use when you want to programmatically begin verifying a person you have already created a profile for, rather than sending them a hosted link. Requires a template ID and your user_profile_id. Not idempotent — each call launches a new verification session. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Verification Template. Which set of checks to run. To find this: log in to AiPrise → go to **Templates** → open the template you want → copy the **Template ID** shown at the top of the page. |
| `user_profile_id` | string | yes |  | User Profile ID. Your own identifier for this person — for example their user ID, email address, or order number. AiPrise stores this alongside the verification so you can match results back to your records. |

### `get_verification_url`

**Get Identity Verification Link.** Creates a unique hosted-verification URL for a given template that you can send to a person so they complete their identity (KYC) check on an AiPrise-hosted page. Use this for the no-code/self-service flow instead of collecting data yourself. Requires a template ID and a redirect URL the person returns to afterward. Not idempotent — each call mints a new verification link/session. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Verification Template. Which set of checks the person will go through. To find this: log in to AiPrise → go to **Templates** → open the template you want → copy the **Template ID** shown at the top of the page. |
| `redirect_uri` | string | yes |  | Redirect URL. The page the person will be sent to after they finish the verification on the AiPrise-hosted form (e.g. a "Thank you" or confirmation page on your website). |

### `get_verification_result`

**Get Identity Verification Result.** Looks up the current status and decision (in progress, approved, or declined) of a single identity (KYC) verification by its session ID. Use this to poll or read the outcome of a previously started user verification. Requires the verification session ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session_id` | string | yes |  | Verification Session ID. The ID of the specific verification to look up. You can get this from the output of the **Start Identity Verification** action, or from the **session_id** field in any webhook payload from AiPrise. |

### `get_user_input_data`

**Get Person's Submitted Verification Data.** Retrieves the raw data a person submitted during an identity verification — the details they typed and the documents they uploaded — for a single verification session. Use this when you need the person's submitted input itself rather than the pass/fail decision (see Get Identity Verification Result for the outcome). Requires the verification session ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session_id` | string | yes |  | Verification Session ID. The ID of the verification to retrieve data from. You can get this from the output of the **Start Identity Verification** action, or from the **session_id** field in any webhook payload from AiPrise. |

### `update_verification_result`

**Override Identity Verification Decision.** Manually overrides the decision on an existing identity verification, setting it to Approved, Declined, Review (back to manual review), or Deactivated. Use this to implement a human-review/escalation step on a case AiPrise flagged. Requires the verification session ID and the target decision. Idempotent — it sets the decision to an explicit value, so repeating the same call leaves the case in the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `verification_session_id` | string | yes |  | Verification Session ID. The ID of the verification whose decision you want to change. You can get this from the output of the **Start Identity Verification** action, or from the **session_id** field in any webhook payload from AiPrise. |
| `result` | string | yes |  | New Decision. The outcome you want to set. Choose **Approved** to pass the person, **Declined** to reject them, or **Pending** to put the case back into manual review. One of `"APPROVED"`, `"DECLINED"`, `"REVIEW"`, `"DEACTIVATED"`. |

### `run_business_verification`

**Start Business Verification.** Starts a business (KYB) verification on an existing business profile by running the checks bundled in a given template (registry lookup, UBO/ownership, sanctions screening, adverse media). Use when you want to begin verifying a company you have already created or looked up a profile for. Requires a template ID and the business_profile_id. Not idempotent — each call launches a new verification session. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Verification Template. Which set of checks to run on the business. To find this: log in to AiPrise → go to **Templates** → open the template you want → copy the **Template ID** shown at the top of the page. |
| `business_profile_id` | string | yes |  | Business Profile ID. The ID of the business profile you want to verify. This is returned when you create a business profile, or you can look it up using the List Business Profiles action. |

### `get_business_verification_result`

**Get Business Verification Result.** Looks up the current status and decision (running, approved, or declined) of a single business (KYB) verification by its session ID. Use this to poll or read the outcome of a previously started business verification. Requires the verification session ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session_id` | string | yes |  | Verification Session ID. The ID of the business verification to look up. You can get this from the output of the **Start Business Verification** action, or from the **session_id** field in any webhook payload from AiPrise. |

### `get_business_input_data`

**Get Business's Submitted Verification Data.** Retrieves the company data submitted for a single business verification session — name, registration number, directors, ownership, etc. Use this when you need the business's submitted input itself rather than the pass/fail decision (see Get Business Verification Result for the outcome). Requires the verification session ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session_id` | string | yes |  | Verification Session ID. The ID of the business verification to retrieve data from. You can get this from the output of the **Start Business Verification** action, or from the **session_id** field in any webhook payload from AiPrise. |

### `run_document_check`

**Run Business Document Check.** Runs a verification check on a single previously-uploaded document attached to a business profile, processing the file against a chosen template. Use when you need to validate a specific business document (rather than running a full business verification). Requires the business_profile_id, a template ID, and the file UUID of the already-uploaded document. Not idempotent — each call launches a new document check. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `business_profile_id` | string | yes |  | Business Profile ID. The ID of the business profile the document belongs to. You can find this in AiPrise → **Businesses** → open the business → copy the **Profile ID**. |
| `template_id` | string | yes |  | Verification Template. Which set of checks to run. To find this: log in to AiPrise → go to **Templates** → open the template you want → copy the **Template ID** shown at the top of the page. |
| `file_uuid` | string | yes |  | File UUID. The UUID of the document file that was previously uploaded to AiPrise. |
| `document_input_title` | string | no |  | Document Input Title. An optional unique identifier for this document input. This value is included in webhook payloads and API responses so you can distinguish between multiple documents. |
| `client_reference_id` | string | no |  | Client Reference ID. Your own identifier to associate with this request — for example an order number or internal case ID. |
| `client_reference_data` | JSON | no |  | Client Reference Data. Any additional JSON data you want to store alongside this request. |

### `create_business_profile`

**Create Business Profile.** Creates a new business (company) profile in AiPrise from supplied details (name, tax ID, addresses, contacts, etc.); the resulting profile is the entity you later run business verifications or document checks against. Use this as the setup step before Start Business Verification or Run Business Document Check. Only the business name is required. Not idempotent — each call creates a separate profile, even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Business Name. The business name. The legal name is preferred. |
| `alternate_name` | string | no |  | Alternate Name (DBA). An alternate "doing business as" name, if any. |
| `tax_identification_number` | string | no |  | Tax Identification Number. The tax ID for this business (e.g. EIN in the US). |
| `website` | string | no |  | Website. The business website URL. |
| `formation_date` | string | no |  | Formation Date. The date the business was formed, in YYYY-MM-DD format. |
| `country_code` | string | no |  | Country Code. The 2-letter ISO country code where the business is registered (e.g. US, GB). |
| `state_code` | string | no |  | State Code. The state or province code where the business is registered (e.g. CA, NY). |
| `business_entity_id` | string | no |  | Business Entity ID. A government-issued entity identifier for this business. |
| `addresses` | array | no |  | Addresses. A JSON array of address objects associated with the business. Each item: { `address_street_1`?, `address_street_2`?, `address_city`?, `address_state`?, `address_zip_code`?, `address_country`? }. |
| `phone_numbers` | array | no |  | Phone Numbers. One or more phone numbers associated with the business. |
| `email_addresses` | array | no |  | Email Addresses. One or more email addresses associated with the business. |
| `additional_information` | array | no |  | Additional Information. A JSON array of supporting documents or extra data for this business. |
| `client_reference_id` | string | no |  | Client Reference ID. Your own internal identifier for this business. |
| `callback_url` | string | no |  | Callback URL. A webhook URL that AiPrise will call with verification results. |
| `events_callback_url` | string | no |  | Events Callback URL. A webhook URL that AiPrise will call with event notifications. |
| `tags` | array | no |  | Tags. Tag names used to categorize this business profile. |

### `create_user_profile`

**Create User Profile.** Creates a new person (user) profile in AiPrise from supplied identity details (name, date of birth, contact, address, etc.); the resulting profile is the entity you later run identity verifications or ongoing monitoring against. Use this as the setup step before Start Identity Verification for a profile. All fields are optional. Not idempotent — each call creates a separate profile, even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | no |  | First Name. |
| `middle_name` | string | no |  | Middle Name. |
| `last_name` | string | no |  | Last Name. |
| `second_last_name` | string | no |  | Second Last Name. User's second surname, where applicable (e.g. in some Latin American naming conventions). |
| `full_name` | string | no |  | Full Name. The complete name. Use this if you do not have the name split into parts. |
| `date_of_birth` | string | no |  | Date of Birth. User's date of birth in YYYY-MM-DD format. |
| `email_address` | string | no |  | Email Address. |
| `phone_number` | string | no |  | Phone Number. |
| `address_street_1` | string | no |  | Street Address 1. |
| `address_street_2` | string | no |  | Street Address 2. |
| `address_city` | string | no |  | City. |
| `address_state` | string | no |  | State/Province. |
| `address_zip_code` | string | no |  | ZIP/Postal Code. |
| `address_country` | string | no |  | Country Code. 2-letter ISO country code (e.g. US, GB). |
| `client_reference_id` | string | no |  | Client Reference ID. Your own internal identifier for this user. |
| `events_callback_url` | string | no |  | Events Callback URL. A webhook URL that AiPrise will call with event notifications for this profile. Paste the webhook URL from the **Verification Event Received** trigger here. |
| `tags` | array | no |  | Tags. Tag names used to categorize this user profile. Tags are created if they do not already exist. |

### `get_user_profile`

**Get User Profile.** Fetches a single user (person) profile by its ID, returning the stored identity details, tags, linked verification sessions, and metadata. Use this to read back a profile you created or referenced. Requires the user_profile_id. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_profile_id` | string | yes |  | User Profile ID. The ID of the user profile to retrieve. You can get this from the output of the **Create User Profile** action, or from the `user_profile_id` field in any webhook payload from AiPrise. |

### `get_business_profile`

**Get Business Profile.** Fetches a single business (company) profile by its ID, returning the stored company details, addresses, tags, linked verification sessions, and metadata. Use this to read back a business profile you created or referenced. Requires the business_profile_id. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `business_profile_id` | string | yes |  | Business Profile ID. The ID of the business profile to retrieve. You can get this from the output of the **Create Business Profile** action, or from the `business_profile_id` field in any webhook payload from AiPrise. |

### `search_businesses`

**Search Businesses.** Searches public business registries by company name and country (optionally narrowed by state/province), returning matching companies with their registry entity IDs, types, and addresses. Use this to look up and identify a real-world business before creating a profile or running a verification. Requires a business name and a 2-letter country code; partial name matches are supported. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Business Name. The business name to search for. Partial matches are supported by AiPrise. |
| `country_code` | string | yes |  | Country Code. 2-letter ISO country code where the business is registered (e.g. US, GB). |
| `state_code` | string | no |  | State/Province Code. Optional state or province code to narrow the search (e.g. CA, NY for the US). Leave empty to search the whole country. |

### `get_additional_user_info`

**Get Person's Additional Info.** Retrieves supplementary information gathered from a person during an identity verification — anything beyond the core identity fields, such as follow-up answers, extra documents, or custom form data — for a single session. Use when the primary submitted data (Get Person's Submitted Verification Data) is not enough. Requires the verification session ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session_id` | string | yes |  | Verification Session ID. The ID of the verification to look up. You can get this from the output of the **Start Identity Verification** action. |

### `get_business_documents`

**Get Business Documents.** Lists every document attached to a given business profile, including each file's UUID, name, download URL, and the verification session it belongs to. Use this to discover a document's file UUID before running a document check, or to inventory what files a business has on file. Requires the business_profile_id. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `business_profile_id` | string | yes |  | Business Profile ID. The ID of the business profile whose documents you want to list. You can get this from the output of the **Create Business Profile** action. |

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
