# Cryptolens

Cryptolens is a Software Licensing as a Service (SLaaS) platform that provides developers with tools to manage software licenses, protect against piracy, and analyze usage data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cryptolens'
  version: '0.2.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Access Token

> Your Cryptolens access token. Get it from https://app.cryptolens.io/User/AccessToken

## Actions

### `addCustomer`

**Add Customer.** Creates a new customer record in a Cryptolens account, optionally enabling a customer portal so the customer can self-manage their licenses and device activations. Use to onboard a license holder before associating keys with them. Requires name, email, and company name; not idempotent — each call creates a separate customer. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the customer (max 100 characters) |
| `email` | string | yes |  | Email. The email of the customer (max 100 characters) |
| `companyName` | string | yes |  | Company Name. The company name the customer belongs to (max 100 characters) |
| `notes` | string | no |  | Notes. Optional notes field (max 1000 characters) |
| `enableCustomerAssociation` | boolean | no |  | Enable Customer Portal. If enabled, a portal link will be returned where the customer can view their licenses. |
| `allowActivationManagement` | boolean | no |  | Allow Activation Management. If enabled, the customer can activate and deactivate devices through the customer portal. |
| `allowMultipleUserAssociation` | boolean | no |  | Allow Multiple User Association. If enabled, multiple user accounts can be associated with this customer. |

Output fields:

- `customerId`: Customer ID (number)
- `secret`: Customer Secret
- `portalLink`: Customer Portal Link (url)
- `result`: Result Code (number)
- `message`: Message

### `blockKey`

**Block Key.** Blocks a specific license key for a product so it is rejected by most Cryptolens Web API methods (e.g. activation/validation). Use to revoke or suspend a license. Requires the product ID and the serial key string. Blocking is a state change, but re-blocking an already-blocked key has no additional effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | yes |  | Product ID. The product ID. |
| `key` | string | yes |  | License Key. The serial key string to block. |

Output fields:

- `result`: Result Code (number)
- `message`: Message

### `createKey`

**Create Key.** Generates one or more new license keys for a Cryptolens product, with configurable validity period, feature flags (F1-F8), machine activation limits, trial activation, and optional association to a customer or reseller. Use to issue licenses for a product. Requires the product ID; not idempotent — each call mints new key(s), and Number of Keys can generate up to 1000 at once. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | yes |  | Product ID. The product ID. |
| `period` | number | no |  | Validity Period (days). The number of days from today the license key should be valid. Default is 0 (no expiration). |
| `f1` | boolean | no |  | Feature 1. Enable Feature 1. |
| `f2` | boolean | no |  | Feature 2. Enable Feature 2. |
| `f3` | boolean | no |  | Feature 3. Enable Feature 3. |
| `f4` | boolean | no |  | Feature 4. Enable Feature 4. |
| `f5` | boolean | no |  | Feature 5. Enable Feature 5. |
| `f6` | boolean | no |  | Feature 6. Enable Feature 6. |
| `f7` | boolean | no |  | Feature 7. Enable Feature 7. |
| `f8` | boolean | no |  | Feature 8. Enable Feature 8. |
| `notes` | string | no |  | Notes. Additional notes about the license key (max 500 characters) |
| `block` | boolean | no |  | Block Key. Block the key from being accessed by the Activation method. |
| `customerId` | number | no |  | Customer ID. The ID of the customer to associate with this license key. |
| `trialActivation` | boolean | no |  | Enable Trial Activation. Enable or disable trial activation. |
| `maxNoOfMachines` | number | no |  | Max Number of Machines. The maximum number of computers that can activate the key. Default is 0 (unlimited). |
| `allowedMachines` | string | no |  | Allowed Machines. A list of machine codes (separated by new lines) that will be prioritized during activation. |
| `resellerId` | number | no |  | Reseller ID. The ID of the reseller to associate with this license key. |
| `noOfKeys` | number | no |  | Number of Keys. The number of keys to generate. Default is 1. Maximum 1000 per request. |

Output fields:

- `key`: License Key
- `keys`: License Keys
- `keys[].key`: License Key
- `keys[].result`: Result Code (number)
- `keys[].message`: Message
- `result`: Result Code (number)
- `message`: Message

### `extendLicense`

**Extend License.** Extends the expiration date of an existing Cryptolens license key by a number of days, or shortens it with a negative number. Use to renew or adjust a license without issuing a new key. Requires the product ID and the serial key string; not idempotent — each call shifts the expiration date again. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | yes |  | Product ID. The product ID. |
| `key` | string | yes |  | License Key. The serial key string to extend. |
| `noOfDays` | number | no |  | Number of Days. The number of days to extend the license. Use negative numbers to decrease the expiration date. |

Output fields:

- `result`: Result Code (number)
- `message`: Message

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
