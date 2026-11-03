# CustomGPT

CustomGPT allows you to create and deploy custom AI chatbots tailored to your specific needs.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-customgpt'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your CustomGPT API Key:
>
> 1. Log in to [CustomGPT](https://app.customgpt.ai/login)
> 2. Click the circle in the top right corner of the page and select **My Profile**
> 3. Select the **API** tab
> 4. Click the **Create API Key** button at the bottom of the page
> 5. Copy your API key and paste it below
>
> For more details, visit the [API Keys and Authentication guide](https://docs.customgpt.ai/reference/api-keys-and-authentication).

## Actions

### `createAgent`

**Create Agent.** Creates a new CustomGPT agent (project) and seeds its knowledge base from either a sitemap URL or an uploaded file. Use when provisioning a brand-new chatbot agent before configuring or chatting with it; a project name is required and you supply one of the two knowledge sources. Not idempotent: each call creates a separate agent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_name` | string | yes |  | Project Name. The name for your agent/project. |
| `sitemap_path` | string | no |  | Sitemap URL. URL to a sitemap for importing agent knowledge (leave empty if uploading a file) |
| `file` | file | no |  | File. Upload a file (text, audio, or video format) for agent knowledge (leave empty if using sitemap) Files are not supported; an action that needs one fails. |

### `createConversation`

**Create Conversation.** Opens a new conversation (chat session) inside an existing CustomGPT agent, returning a session identifier used to send messages. Use this before sending the first message in a fresh chat thread; the target agent project is required and the conversation name is optional. Not idempotent: each call starts a new conversation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Agent. Select the agent to use. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Conversation Name. Optional name for the conversation. |

### `deleteAgent`

**Delete Agent.** Permanently deletes a CustomGPT agent (project) identified by its project id, removing the agent and its conversations. Use when decommissioning an agent; this is destructive and cannot be undone. Not idempotent: repeating it after deletion targets a project that no longer exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Agent. Select the agent to use. A value the product loads from the provider, such as an id; write the value itself. |

### `export_conversation`

**Export Conversation.** Retrieves a full export of a single conversation within an agent, including all messages, authors, feedback, and metadata. Use when you need the complete transcript of a known conversation; requires the agent project id and the conversation session id. Idempotent: it is a read-only fetch that does not modify the conversation. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Agent. Select the agent to use. A value the product loads from the provider, such as an id; write the value itself. |
| `session_id` | string | yes |  | Session ID. The session ID of the conversation to export. |

### `findConversation`

**Find Conversation.** Lists conversations for a CustomGPT agent, optionally filtered by name, by which user created them, and by a last-updated cutoff date; with no filters it returns all conversations for the agent. Use to look up a conversation or its session id before sending or exporting messages. Requires the agent project id. Idempotent: read-only search with no side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Agent. Select the agent to use. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Conversation Name. Filter conversations by name (optional) |
| `userFilter` | string | no | `"all"` | User Filter. Filter by user who created the conversation (default: all) One of `"all"`, `"anonymous"`, `"team_member"`, `"me"`. |
| `lastUpdatedAfter` | ISO date-time string | no |  | Last Updated After. Only return conversations with messages after this date (optional) e.g. 2025-01-09T18:30:00Z. |

### `sendMessage`

**Send Message.** Sends a user prompt to an existing conversation in a CustomGPT agent and returns the agent reply, optionally overriding the model, persona, response source, capability mode, language, or attaching a file. Use this to ask the chatbot a question or continue a chat thread; requires the agent project id, an existing conversation session id, and the prompt text. Not idempotent: each call posts a new message and generates a new response. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Agent. Select the agent to use. A value the product loads from the provider, such as an id; write the value itself. |
| `session_id` | string | yes |  | Session ID. The session ID of the conversation. |
| `prompt` | string | yes |  | Prompt. The message/question to send. |
| `stream` | boolean | no | `false` | Enable Streaming. Stream the response in real-time (default: false) |
| `custom_persona` | string | no |  | Custom Persona. Custom persona/instructions for the agent (optional) |
| `chatbot_model` | string | no |  | Agent Model. AI model to use for the conversation (optional) One of `"gpt-4o"`, `"gpt-4o-mini"`, `"gpt-4-turbo"`, `"gpt-4"`, `"gpt-3.5-turbo"`, `"claude-3-5-sonnet-20240620"`, `"claude-3-opus-20240229"`, `"claude-3-sonnet-20240229"`, `"claude-3-haiku-20240307"`, `"gemini-1.5-pro"`, `"gemini-1.5-flash"`, `"o1-preview"`. |
| `response_source` | string | no | `"default"` | Response Source. Source for generating responses (default: use only your content) One of `"default"`, `"own_content"`, `"openai_content"`. |
| `agent_capability` | string | no | `"fastest-responses"` | Agent Capability. Capability mode for the agent (default: fastest-responses) One of `"fastest-responses"`, `"optimal-choice"`, `"advanced-reasoning"`, `"complex-tasks"`. |
| `lang` | string | no | `"en"` | Language. Language code for the prompt (default: en) |
| `custom_context` | string | no |  | Custom Context. Additional context for the conversation (optional) |
| `file` | file | no |  | File. File to upload with the message (Max 5MB: pdf, docx, doc, odt, txt, jpg, jpeg, png, webp) Files are not supported; an action that needs one fails. |

### `update_agent`

**Update Agent.** Updates an existing CustomGPT agent identified by its project id, changing fields such as the agent name, sharing/public visibility, sitemap source, OCR, anonymization, license, and data-retention options, or attaching a file. Use to reconfigure an already-created agent; only the fields you provide are changed. Treat as not idempotent: it can re-upload an attached file and re-trigger sitemap crawling on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Agent. Select the agent to use. A value the product loads from the provider, such as an id; write the value itself. |
| `project_name` | string | no |  | Agent Name. The name of the agent. |
| `is_shared` | boolean | no |  | Is Shared. Whether the agent is public or not. |
| `sitemap_path` | string | no |  | Sitemap Path. URL of the sitemap to crawl. |
| `file_data_retension` | boolean | no |  | File Data Retention. Enable file data retention. |
| `is_ocr_enabled` | boolean | no |  | OCR Enabled. Enable Optical Character Recognition for images. |
| `is_anonymized` | boolean | no |  | Anonymized. Enable anonymization of data. |
| `file` | file | no |  | File. Upload a file to the agent. Files are not supported; an action that needs one fails. |
| `are_licenses_allowed` | boolean | no | `false` | Are Licenses Allowed. Whether project licenses are allowed. |

### `update_settings`

**Update Agent Settings.** Updates the chatbot UI and behavior settings of an existing CustomGPT agent identified by its project id, covering the default prompt, response source, colors, avatar and background images, persona, citation and feedback options, default model, branding, reCAPTCHA, and selling toggles. Use to customize an agent's appearance and conversational behavior; only the fields you provide are changed. Treat as not idempotent: it can re-upload avatar/background image files on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Agent. Select the agent to use. A value the product loads from the provider, such as an id; write the value itself. |
| `default_prompt` | string | no |  | Default Prompt. Default prompt text shown to users (e.g., "Ask Me Anything ...") |
| `response_source` | string | no |  | Response Source. Source for generating responses. One of `"default"`, `"own_content"`, `"openai_content"`. |
| `chat_bot_avatar` | file | no |  | Chatbot Avatar. Upload avatar image for the chatbot. Files are not supported; an action that needs one fails. |
| `chat_bot_bg` | file | no |  | Chatbot Background. Upload background image for the chatbot. Files are not supported; an action that needs one fails. |
| `chatbot_msg_lang` | string | no |  | Chatbot Message Language. Language code for chatbot messages (e.g., "en", "es", "ur") |
| `chatbot_color` | string | no |  | Chatbot Color. Primary color for chatbot UI (hex color code, e.g., "#0e57cc") |
| `chatbot_toolbar_color` | string | no |  | Chatbot Toolbar Color. Toolbar color for chatbot UI (hex color code) |
| `persona_instructions` | string | no |  | Persona Instructions. Custom persona/behavior instructions for the chatbot. |
| `citations_answer_source_label_msg` | string | no |  | Citations Answer Source Label. Label message for citation answer sources. |
| `citations_sources_label_msg` | string | no |  | Citations Sources Label. Label message for citation sources. |
| `hang_in_there_msg` | string | no |  | Hang In There Message. Message shown during long processing times. |
| `chatbot_siesta_msg` | string | no |  | Chatbot Siesta Message. Message shown when chatbot is temporarily unavailable. |
| `is_loading_indicator_enabled` | boolean | no |  | Enable Loading Indicator. Show loading indicator during responses. |
| `enable_citations` | boolean | no |  | Enable Citations. Enable citation display in responses. |
| `enable_feedbacks` | boolean | no |  | Enable Feedbacks. Enable user feedback collection. |
| `citations_view_type` | string | no |  | Citations View Type. How citations should be displayed. One of `"user"`, `"show"`, `"hide"`. |
| `no_answer_message` | string | no |  | No Answer Message. Message shown when no answer is found. |
| `ending_message` | string | no |  | Ending Message. Message shown at the end of conversations. |
| `remove_branding` | boolean | no |  | Remove Branding. Remove CustomGPT branding from the chatbot. |
| `enable_recaptcha_for_public_chatbots` | boolean | no |  | Enable reCAPTCHA. Enable reCAPTCHA for public chatbots. |
| `chatbot_model` | string | no |  | Chatbot Model. Default AI model for the chatbot. One of `"gpt-4o"`, `"gpt-4o-mini"`, `"gpt-4-turbo"`, `"gpt-4"`, `"claude-3-5-sonnet-20240620"`, `"claude-3-sonnet-20240229"`. |
| `is_selling_enabled` | boolean | no |  | Enable Selling. Enable selling features. |
