# Microsoft Dynamics CRM

Customer relationship management software package developed by Microsoft.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-dynamics-crm'
  version: '0.4.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the **Dynamics CRM (Delegated) permissions** under **API permissions**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |
| `hostUrl` | string | yes |  | Host URL (without trailing slash). Host URL without trailing slash.For example **https://demo.crm.dynamics.com**. |
| `tenantId` | string | yes | `"common"` | Tenant ID. You can find this in the Azure portal. |
| `proxyUrl` | string | no |  | Proxy URL with Port. Keep empty if not needed. Optional proxy URL used for establishing connections when proxying requests is needed. For example: **https://proxy.com:8080**. |

## Actions

### `dynamics_crm_create_record`

**Create Record.** Creates a new record of a chosen Dynamics 365 / Dataverse entity type (e.g. accounts, contacts, leads), passing the field values for that entity. Pick the entity from its discovered entity-set name or map a raw entity-set name. Not idempotent: each call inserts a new record, so repeated calls create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. Select or map the entity for which you want to create the record. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Entity Fields. An object whose fields depend on other inputs; the product shows them. |

### `dynamics_crm_delete_record`

**Delete Record.** Permanently deletes a single record from a chosen Dynamics 365 / Dataverse entity type, identified by its record ID (the entity primary-key GUID). Use when an agent must remove a specific known record. Destructive and not idempotent: the first call removes the record and subsequent calls for the same ID fail since it no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. Select or map the entity name whose records you want to delete. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. A value the product loads from the provider, such as an id; write the value itself. |

### `dynamics_crm_get_record`

**Get Record.** Fetches a single record from a chosen Dynamics 365 / Dataverse entity type by its record ID (the entity primary-key GUID). Use to read a specific known record before updating, deleting, or referencing it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. Select or map the entity name whose records you want to retrieve. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. A value the product loads from the provider, such as an id; write the value itself. |

### `dynamics_crm_update_record`

**Update Record.** Updates an existing record of a chosen Dynamics 365 / Dataverse entity type, identified by its record ID (the entity primary-key GUID), applying the supplied field values. Use to modify a specific known record rather than create one. Idempotent: re-sending the same field values to the same ID leaves the record in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entityType` | string | yes |  | Entity Type. Select or map the entity for which you want to update the record. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Entity Fields. An object whose fields depend on other inputs; the product shows them. |

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
