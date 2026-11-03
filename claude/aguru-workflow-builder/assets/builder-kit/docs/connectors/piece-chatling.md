# Chatling

Build AI chatbots trained on your data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chatling'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API key:
>
> 1. Go to your [Chatling account](https://app.chatling.ai)
> 2. Open **Project Settings**
> 3. Click the **API Keys** tab
> 4. Press **New API key** and generate a new key
> 5. Copy the key (it's only shown once)

## Actions

### `send_message`

**Send Message.** Send a user message to a specific Chatling chatbot and get back the AI-generated reply, querying the bot's knowledge base. Use to converse with or test a deployed chatbot programmatically. Requires the chatbot ID and message; optionally pass a conversation_id to continue an existing thread (omit it to start a new one) and tune the AI model, language, temperature, or extra instructions. Not idempotent — each call generates a fresh response and appends to the conversation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot. Select a chatbot. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. The message to send to the AI. |
| `ai_model_id` | string | yes |  | AI Model. Select the AI model to use. A value the product loads from the provider, such as an id; write the value itself. |
| `conversation_id` | string | no |  | Conversation. Continue an existing conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | no |  | Contact. Associate the conversation with a contact. A value the product loads from the provider, such as an id; write the value itself. |
| `language_id` | string | no |  | Language. Select the language for the AI response. A value the product loads from the provider, such as an id; write the value itself. |
| `temperature` | number | no | `0` | Temperature. Controls randomness (0 = focused, 1 = creative). Default is 0. |
| `instructions` | array | no |  | Instructions. Additional instructions to tailor the AI response. |

### `create_chatbot`

**Create Chatbot.** Create a new Chatling chatbot in the account, either seeded from an existing template or built from scratch when no template is given. Use when an agent needs to provision a new bot. Requires a name; the template ID is optional. Not idempotent — each call creates a separate chatbot, even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the chatbot. |
| `template_id` | string | no |  | Template. Use a template to create the chatbot. A value the product loads from the provider, such as an id; write the value itself. |

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
