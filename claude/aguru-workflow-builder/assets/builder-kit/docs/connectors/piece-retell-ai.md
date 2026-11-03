# Retell AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-retell-ai'
  version: '0.2.1'
```

Categories: BUSINESS_INTELLIGENCE, PRODUCTIVITY, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Please follow these steps to get your Retell AI API key:
>
> 1. Log in to your Retell AI dashboard.
> 2. Navigate to the API section.
> 3. Generate a new API key or copy your existing one.
> 4. Use this API key to authenticate your requests.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Your Retell AI API Key. |

## Actions

### `make_phone_call`

**Make Phone Call.** Place an outbound phone call from a Retell-owned/imported number to a destination number, dialed by a Retell AI voice agent. Use to start a live AI-driven call. Both numbers must be in E.164 format; the agent version, metadata, dynamic prompt variables, and custom SIP headers can optionally be overridden per call. Not idempotent: each call places a new outbound call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromNumber` | string | yes |  | From Number. The number you own in E.164 format. Must be a number purchased from Retell or imported to Retell. |
| `toNumber` | string | yes |  | To Number. The number you want to call, in E.164 format. If using a number purchased from Retell, only US numbers are supported as destination. |
| `overrideAgentId` | string | no |  | Agent. Select the Retell AI agent. A value the product loads from the provider, such as an id; write the value itself. |
| `overrideAgentVersion` | number | no |  | Override Agent Version. For this particular call, override the agent version used with this version. This does not bind the agent version to this number, this is for one time override. |
| `metadata` | object | no |  | Metadata. An arbitrary object for storage purpose only. You can put anything here like your internal customer id associated with the call. |
| `dynamicVariables` | object | no |  | Dynamic Variables. Add optional dynamic variables in key value pairs of string that injects into your Response Engine prompt and tool description. Only applicable for Response Engine. |
| `customSipHeaders` | object | no |  | Custom SIP Headers. Add optional custom SIP headers to the call. |

### `create_phone_number`

**Create Phone Number.** Purchase a new US/Canada phone number from Retell and bind inbound and/or outbound AI agents to it. Either request a number by area code or pass a specific number in E.164 format; toll-free can be requested. Use to provision a callable number for an agent. Not idempotent: each call purchases a new number and incurs cost. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inboundAgentId` | string | no |  | Inbound Agent. Select the Retell AI agent. A value the product loads from the provider, such as an id; write the value itself. |
| `outboundAgentId` | string | no |  | Outbound Agent. Select the Retell AI agent. A value the product loads from the provider, such as an id; write the value itself. |
| `inboundAgentVersion` | number | no |  | Inbound Agent Version. Version of the inbound agent to bind to the number. If not provided, will default to latest version. |
| `outboundAgentVersion` | number | no |  | Outbound Agent Version. Version of the outbound agent to bind to the number. If not provided, will default to latest version. |
| `areaCode` | number | no |  | Area Code. Area code of the number to obtain. Format is a 3 digit integer. Currently only supports US area code. |
| `nickname` | string | yes |  | Nickname. Nickname of the number. This is for your reference only. |
| `inboundWebhookUrl` | string | no |  | Inbound Webhook URL. If set, will send a webhook for inbound calls, where you can to override agent id, set dynamic variables and other fields specific to that call. |
| `numberProvider` | string | no | `"twilio"` | Number Provider. The provider to purchase the phone number from. One of `"twilio"`, `"telnyx"`. |
| `countryCode` | string | no | `"US"` | Country Code. The country code for the phone number. One of `"US"`, `"CA"`. |
| `tollFree` | boolean | no | `false` | Toll Free. Whether to purchase a toll-free number. Toll-free numbers incur higher costs. |
| `phoneNumber` | string | no |  | Phone Number. The number you are trying to purchase in E.164 format of the number (+country code then number with no space and no special characters). |

### `get_call`

**Get Call.** Look up the full details of a single Retell call by its Call ID, including status, transcript, recording, and metadata. Use to inspect the outcome or content of a known call. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callId` | string | yes |  | Call ID. A value the product loads from the provider, such as an id; write the value itself. |

### `get_phone_number`

**Get Phone Number.** Look up the configuration of a phone number registered in Retell, including its bound inbound/outbound agents and webhook settings. The number, supplied in E.164 format, is the unique identifier. Use to inspect an existing number before reusing or updating it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phoneNumber` | string | yes |  | Phone Number. E.164 format of the number (+country code, then number with no space, no special characters), used as the unique identifier for phone number APIs. Example: "+14157774444". |

### `get_voice`

**Get Voice.** Look up the details of a single Retell voice by its Voice ID, such as provider, accent, gender, and preview. Use to inspect a voice before assigning it to an agent. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `voiceId` | string | yes |  | Voice. A value the product loads from the provider, such as an id; write the value itself. |

### `get_agent`

**Get Agent.** Look up the configuration of a single Retell AI agent by its Agent ID, optionally pinned to a specific version (defaults to the latest). Use to inspect an agent's settings before placing a call or binding it to a number. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. Select the Retell AI agent. A value the product loads from the provider, such as an id; write the value itself. |
| `version` | number | no |  | Version. Optional version of the API to use for this request. If not provided, will default to latest version. |

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
