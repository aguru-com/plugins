# VoIPstudio

VoIPstudio is a complete business phone system and scalable call center

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-voipstudio'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> VoIPstudio API Key
>
> **Web Dashboard - Add API Key**
>
> Follow steps below to add API Key for a user:
>
> 1. In Administration panel edit user for whom API Keys needs to be added.
> 2. Go to API Keys section.
> 3. Enter a name for your API Key, this can be anything you like. For example a name of your application that will use this API Key.
> 4. Click "Add" button.
> 5. Click "Eye" icon to retrieve the actual API Key

## Actions

### `createContact`

**Create Contact.** Creates a new contact in the VoIPstudio address book, capturing name, company, email, multiple phone/mobile/speed-dial numbers, labels, groups, and notes. All fields are optional, so pass whatever identifying details are available. Not idempotent: each call adds another contact record, so re-running with the same input produces duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Type. Contact type. |
| `dialler_source_id` | number | no |  | Dialler Source ID. Dialler source ID. |
| `outcome_id` | number | no |  | Outcome ID. Outcome ID. |
| `group_name` | string | no |  | Group Name. Group name. |
| `first_name` | string | no |  | First Name. Contact first name. |
| `last_name` | string | no |  | Last Name. Contact last name. |
| `email` | string | no |  | Email. Contact email address. |
| `company` | string | no |  | Company. Company name. |
| `tel` | string | no |  | Telephone. Primary telephone number. |
| `tel_1` | string | no |  | Telephone 1. Secondary telephone number. |
| `tel_2` | string | no |  | Telephone 2. Tertiary telephone number. |
| `speed_dial_phone` | string | no |  | Speed Dial Phone. Primary speed dial phone number. |
| `speed_dial_phone_1` | string | no |  | Speed Dial Phone 1. Secondary speed dial phone number. |
| `speed_dial_phone_2` | string | no |  | Speed Dial Phone 2. Tertiary speed dial phone number. |
| `mobile` | string | no |  | Mobile. Primary mobile number. |
| `mobile_1` | string | no |  | Mobile 1. Secondary mobile number. |
| `mobile_2` | string | no |  | Mobile 2. Tertiary mobile number. |
| `speed_dial_mobile` | string | no |  | Speed Dial Mobile. Primary speed dial mobile number. |
| `speed_dial_mobile_1` | string | no |  | Speed Dial Mobile 1. Secondary speed dial mobile number. |
| `speed_dial_mobile_2` | string | no |  | Speed Dial Mobile 2. Tertiary speed dial mobile number. |
| `notes` | string | no |  | Notes. Contact notes. |
| `labels` | array | no |  | Labels. Contact labels. |
| `groups` | array | no |  | Groups. Contact groups. |
| `transfer_list` | boolean | no |  | Transfer List. Whether to add to transfer list. |
| `user_id` | number | no |  | User ID. User ID. |

### `makeACallToLead`

**Make a Call to Lead.** Places an outbound lead call to a destination number (E.164 or extension) and plays a text-to-speech message; all three inputs (caller ID, destination, TTS text) are required. Choose this for automated outreach calls that announce a spoken message rather than connecting two people. Not idempotent: each call initiates a new phone call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `caller_id` | string | yes |  | Caller ID. Caller ID. |
| `to` | string | yes |  | To. Destination number in e164 format or extension. |
| `tts` | string | yes |  | Text to Speech. Text to speech content. |

### `makeACall`

**Make a Call.** Initiates an outbound call to a destination number in E.164 format; only the destination is required, while the originating user ID and caller ID (an E.164 number or 'anonymous') are optional. Use this to place a standard phone call from a VoIPstudio user. Not idempotent: each call starts a new call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. Destination number in e164 format. |
| `from` | string | no |  | From. User ID from which call should originate. |
| `caller_id` | string | no |  | Caller ID. Caller ID to use for the call. E164 number or 'anonymous'. |

### `makeAWebcall`

**Make a Webcall.** Initiates a webcall that bridges a source number to a destination number or extension; both the source (E.164) and destination (E.164 or extension) are required. Use this to connect two parties by calling the source first, then the destination. Not idempotent: each call starts a new call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. Source number in e164 format. |
| `to` | string | yes |  | To. Destination number in e164 format or extension. |

### `sendSms`

**Send SMS.** Sends an SMS text message to a destination number in E.164 format; the destination and message text are required, while the sender number is optional. Use this for outbound text notifications. Not idempotent: each call sends a new message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no |  | From. From number in e164 format. |
| `to` | string | yes |  | To. Destination number in e164 format. |
| `message` | string | yes |  | Message. Message to send. |

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
