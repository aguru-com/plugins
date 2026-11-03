# ElevenLabs

AI Voice Generator & Text to Speech

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-elevenlabs'
  version: '0.4.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these instructions to get your API Key:
> 1. Visit your Elevenlabs dashboard.
> 2. Once there, click on your account in the bottom left corner.
> 3. Press Profile + API Key.
> 4. Create or copy your API Key. Enable the permissions for every area you plan to use: user, text to speech, speech to speech, voices, models, history, dubbing, Audio Native, pronunciation dictionaries, and Conversational AI (agents, tests, conversations, knowledge base, tools and secrets). An action whose area is not enabled on the key returns a permission error from ElevenLabs.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `region` | string | yes |  | Region. Use according URL in Custom API Call pieces. One of `"default"`, `"us"`, `"eu"`. |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `elevenlabs-text-to-speech`

**Text to Speech.** Synthesizes spoken audio from a text string using a chosen ElevenLabs voice, returning an MP3 file. Use to turn written content into a narrated voiceover or speech clip. Requires a voice (selected from the account's available voices) and the text; the model is optional and defaults to ElevenLabs' default. Not idempotent — each call generates a new audio file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | no |  | Model. A value the product loads from the provider, such as an id; write the value itself. |
| `voice` | string | yes |  | Voice. Select the voice for the text to speech. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. The text to convert to speech. |

### `elevenlabs_add_pronunciation_rules`

**Add Pronunciation Rules.** Adds alias or phoneme rules to a pronunciation dictionary and returns the new version_id. Each call creates a new dictionary version, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pronunciationDictionaryId` | string | yes |  | Pronunciation Dictionary ID. The id from Create Pronunciation Dictionary or List Pronunciation Dictionaries. |
| `rules` | JSON | yes |  | Rules. JSON array of rules, such as [{"type": "alias", "string_to_replace": "AP", "alias": "Activepieces"}] or {"type": "phoneme", "string_to_replace": "...", "phoneme": "...", "alphabet": "ipa"}. |

Output fields:

- `id`: ID
- `version_id`: Version ID
- `version_rules_num`: Version Rules Num (number)

### `elevenlabs_calculate_agent_llm_usage`

**Calculate Agent LLM Usage.** Estimates the expected LLM price per minute for an agent across the available LLMs. Read-only despite using POST. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |
| `promptLength` | number | no |  | Prompt Length. Prompt length in characters, defaults to the agent prompt. |
| `numberOfPages` | number | no |  | Number Of Pages. Knowledge base pages, defaults to the agent knowledge base. |
| `ragEnabled` | string | no |  | Rag Enabled. Whether RAG is enabled. One of `true`, `false`. |

Output fields:

- `llm_prices`: Llm Prices
- `llm_prices[].llm`: Llm
- `llm_prices[].price_per_minute`: Price Per Minute (number)
- `llm_prices[].price_per_message`: Price Per Message (number)

### `elevenlabs_calculate_llm_usage`

**Calculate LLM Usage.** Estimates the expected LLM price per minute for a prompt length and knowledge base size across the available LLMs. Read-only despite using POST. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `promptLength` | number | yes |  | Prompt Length. Prompt length in characters. |
| `numberOfPages` | number | yes |  | Number Of Pages. Knowledge base pages. |
| `ragEnabled` | string | yes |  | Rag Enabled. Whether RAG is enabled. One of `true`, `false`. |

Output fields:

- `llm_prices`: Llm Prices
- `llm_prices[].llm`: Llm
- `llm_prices[].price_per_minute`: Price Per Minute (number)
- `llm_prices[].price_per_message`: Price Per Message (number)

### `elevenlabs_convert_speech_to_speech`

**Convert Speech To Speech.** Converts an uploaded audio recording into speech in the chosen voice, keeping the original delivery, and returns the audio as a file. Use to change who is speaking in an existing recording. Not idempotent: each call consumes credits and produces new audio. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `voiceId` | string | yes |  | Voice ID. The voice_id from List Voices. |
| `audio` | file | yes |  | Audio. Recording to convert. Files are not supported; an action that needs one fails. |
| `modelId` | string | no |  | Model ID. Speech-to-speech model id from List Models, such as eleven_multilingual_sts_v2. |
| `removeBackgroundNoise` | string | no |  | Remove Background Noise. Remove background noise from the input. One of `true`, `false`. |
| `outputFormat` | string | no |  | Output Format. Defaults to mp3_44100_128. One of `"mp3_44100_128"`, `"mp3_44100_192"`, `"mp3_22050_32"`, `"pcm_16000"`, `"pcm_44100"`. |

Output fields:

- `file`: File (url)
- `content_type`: Content Type

### `elevenlabs_create_agent_test`

**Create Agent Test.** Creates a test that checks how an agent responds: an llm test judges the reply against a success condition, a tool test checks tool calls, a simulation test runs a full conversation. Returns the test id, which Run Agent Tests takes. Not idempotent: each call creates another test. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Test name. |
| `type` | string | no |  | Type. Defaults to llm. One of `"llm"`, `"tool"`, `"simulation"`. |
| `successCondition` | string | no |  | Success Condition. What a passing response must do. |
| `chatHistory` | JSON | no |  | Chat History. Conversation so far, as a JSON array of transcript turns. |
| `successExamples` | JSON | no |  | Success Examples. JSON array such as [{"response": "...", "type": "success"}]. |
| `failureExamples` | JSON | no |  | Failure Examples. JSON array such as [{"response": "...", "type": "failure"}]. |
| `dynamicVariables` | JSON | no |  | Dynamic Variables. Dynamic variables as a JSON object. |

Output fields:

- `id`: ID

### `elevenlabs_create_agent`

**Create Agent.** Creates a conversational AI agent from a conversation_config JSON (prompt, first message, voice, language) and returns its agent_id. Start from the config of an existing agent via Get Agent. Not idempotent: each call creates another agent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversationConfig` | JSON | yes |  | Conversation Config. Agent configuration, such as {"agent": {"prompt": {"prompt": "You are..."}, "first_message": "Hi"}}. |
| `platformSettings` | JSON | no |  | Platform Settings. Optional platform settings. |
| `name` | string | no |  | Name. Agent name. |
| `tags` | array | no |  | Tags. Tags for the agent. |

Output fields:

- `agent_id`: Agent ID
- `main_branch_id`: Main Branch ID
- `initial_version_id`: Initial Version ID

### `elevenlabs_create_audio_native_project`

**Create Audio Native Project.** Creates an Audio Native project (an embeddable audio player for an article) from an uploaded text or HTML file and returns the project_id and embed html_snippet. Set auto_convert to generate the audio right away. Not idempotent: each call creates a new project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Project name. |
| `title` | string | no |  | Title. Title shown in the player. |
| `author` | string | no |  | Author. Author shown in the player. |
| `file` | file | no |  | File. Article as a .txt or .html file. Files are not supported; an action that needs one fails. |
| `voiceId` | string | no |  | Voice ID. voice_id from List Voices. |
| `modelId` | string | no |  | Model ID. Model id from List Models. |
| `textColor` | string | no |  | Text Color. Player text colour, such as #000000. |
| `backgroundColor` | string | no |  | Background Color. Player background colour, such as #FFFFFF. |
| `small` | string | no |  | Small. Use the compact player. One of `true`, `false`. |
| `autoConvert` | string | no |  | Auto Convert. Generate the audio right after creation. One of `true`, `false`. |

Output fields:

- `project_id`: Project ID
- `converting`: Converting (boolean)
- `html_snippet`: HTML Snippet

### `elevenlabs_create_dubbing`

**Create Dubbing.** Starts a dubbing job that translates and re-voices a media file or a source URL into the target language, and returns a dubbing_id immediately. Poll Get Dubbing until status is dubbed, then fetch the result with Get Dubbed File. Not idempotent: each call starts a new billable job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | no |  | File. Media file to dub. Provide this or a Source URL. Files are not supported; an action that needs one fails. |
| `sourceUrl` | string | no |  | Source Url. URL of the media to dub, such as a YouTube link. |
| `name` | string | no |  | Name. Name of the dubbing project. |
| `targetLang` | string | yes |  | Target Lang. Language code to dub into, such as es. |
| `sourceLang` | string | no |  | Source Lang. Language code of the original, or auto. |
| `numSpeakers` | number | no |  | Num Speakers. Number of speakers, 0 detects automatically. |
| `watermark` | string | no |  | Watermark. Add a watermark. One of `true`, `false`. |
| `dropBackgroundAudio` | string | no |  | Drop Background Audio. Remove the background audio. One of `true`, `false`. |
| `highestResolution` | string | no |  | Highest Resolution. Use the highest video resolution. One of `true`, `false`. |

Output fields:

- `dubbing_id`: Dubbing ID
- `expected_duration_sec`: Expected Duration Sec (number)

### `elevenlabs_create_kb_file_document`

**Create KB File Document.** Uploads a file (pdf, txt, docx, html or epub) as a knowledge base document and returns its id. Not idempotent: each call adds another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. File to add. Files are not supported; an action that needs one fails. |
| `name` | string | no |  | Name. Document name. |
| `parentFolderId` | string | no |  | Parent Folder ID. Folder id to place it in, from List KB Documents. |

Output fields:

- `id`: ID
- `name`: Name
- `folder_path`: Folder Path

### `elevenlabs_create_kb_folder`

**Create KB Folder.** Creates a folder in the knowledge base and returns its id. Not idempotent: each call creates another folder. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Folder name. |
| `parentFolderId` | string | no |  | Parent Folder ID. Folder id to place it in, from List KB Documents. |

Output fields:

- `id`: ID
- `name`: Name
- `folder_path`: Folder Path

### `elevenlabs_create_kb_rag_index`

**Create KB RAG Index.** Starts building a RAG index for a knowledge base document with the chosen embedding model and returns the index. Poll Get KB Document RAG Indexes until its status is succeeded. Re-running for the same model returns the existing index. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |
| `model` | string | yes |  | Model. Embedding model. One of `"e5_mistral_7b_instruct"`, `"multilingual_e5_large_instruct"`. |

Output fields:

- `id`: ID
- `model`: Model
- `status`: Status
- `progress_percentage`: Progress Percentage (number)
- `document_model_index_usage`: Document Model Index Usage
- `document_model_index_usage.used_bytes`: Used Bytes (number)

### `elevenlabs_create_kb_text_document`

**Create KB Text Document.** Adds a text snippet as a knowledge base document and returns its id. Not idempotent: each call adds another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The document text. |
| `name` | string | no |  | Name. Document name. |
| `parentFolderId` | string | no |  | Parent Folder ID. Folder id to place it in, from List KB Documents. |

Output fields:

- `id`: ID
- `name`: Name
- `folder_path`: Folder Path

### `elevenlabs_create_kb_url_document`

**Create KB URL Document.** Scrapes a web page and adds it as a knowledge base document, returning its id. Not idempotent: each call adds another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Url. Page URL. |
| `name` | string | no |  | Name. Document name. |
| `parentFolderId` | string | no |  | Parent Folder ID. Folder id to place it in, from List KB Documents. |

Output fields:

- `id`: ID
- `name`: Name
- `folder_path`: Folder Path

### `elevenlabs_create_pronunciation_dictionary_from_file`

**Create Pronunciation Dictionary From File.** Creates a pronunciation dictionary from an uploaded PLS file and returns its id and version_id. Not idempotent: each call creates another dictionary. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Dictionary name. |
| `file` | file | no |  | File. PLS file with the rules. Files are not supported; an action that needs one fails. |
| `description` | string | no |  | Description. |

Output fields:

- `id`: ID
- `name`: Name
- `created_by`: Created By
- `creation_time_unix`: Creation Time Unix (number)
- `version_id`: Version ID
- `version_rules_num`: Version Rules Num (number)
- `description`: Description
- `permission_on_resource`: Permission On Resource

### `elevenlabs_create_pronunciation_dictionary_from_rules`

**Create Pronunciation Dictionary From Rules.** Creates a pronunciation dictionary from a list of alias or phoneme rules and returns its id and version_id. Not idempotent: each call creates another dictionary. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Dictionary name. |
| `rules` | JSON | yes |  | Rules. JSON array of rules, such as [{"type": "alias", "string_to_replace": "AP", "alias": "Activepieces"}] or {"type": "phoneme", "string_to_replace": "...", "phoneme": "...", "alphabet": "ipa"}. |
| `description` | string | no |  | Description. |

Output fields:

- `id`: ID
- `name`: Name
- `created_by`: Created By
- `creation_time_unix`: Creation Time Unix (number)
- `version_id`: Version ID
- `version_rules_num`: Version Rules Num (number)
- `description`: Description
- `permission_on_resource`: Permission On Resource

### `elevenlabs_create_secret`

**Create Secret.** Stores a secret value for use by agent tools and returns its secret_id. The value cannot be read back. Not idempotent: each call creates another secret. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Secret name. |
| `value` | string | yes |  | Value. Secret value. |

Output fields:

- `type`: Type
- `secret_id`: Secret ID
- `name`: Name

### `elevenlabs_create_tool`

**Create Tool.** Creates a webhook, client or system tool for agents from a tool_config JSON and returns its id. Not idempotent: each call creates another tool. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toolConfig` | JSON | yes |  | Tool Config. Tool configuration, such as {"type": "webhook", "name": "lookup_order", "description": "...", "api_schema": {"url": "https://...", "method": "GET"}}. |

Output fields:

- `id`: ID
- `tool_config`: Tool Config
- `tool_config.type`: Type
- `tool_config.name`: Name
- `tool_config.description`: Description
- `tool_config.response_timeout_secs`: Response Timeout Secs (number)
- `tool_config.disable_interruptions`: Disable Interruptions (boolean)
- `tool_config.interruption_mode`: Interruption Mode
- `tool_config.force_pre_tool_speech`: Force Pre Tool Speech (boolean)
- `tool_config.pre_tool_speech`: Pre Tool Speech
- `tool_config.assignments`: Assignments
- `tool_config.tool_call_sound`: Tool Call Sound
- `tool_config.tool_call_sound_behavior`: Tool Call Sound Behavior
- `tool_config.tool_error_handling_mode`: Tool Error Handling Mode
- `tool_config.dynamic_variables`: Dynamic Variables
- `tool_config.dynamic_variables.dynamic_variable_placeholders`: Dynamic Variable Placeholders
- `tool_config.execution_mode`: Execution Mode
- `tool_config.api_schema`: API Schema
- `tool_config.api_schema.request_headers`: Request Headers
- `tool_config.api_schema.kind`: Kind
- `tool_config.api_schema.url`: URL (url)
- `tool_config.api_schema.method`: Method
- `tool_config.api_schema.path_params_schema`: Path Params Schema
- `tool_config.api_schema.query_params_schema`: Query Params Schema
- `tool_config.api_schema.request_body_schema`: Request Body Schema
- `tool_config.api_schema.request_body_schema.description`: Description
- `tool_config.api_schema.request_body_schema.dynamic_variable`: Dynamic Variable
- `tool_config.api_schema.request_body_schema.is_omitted`: Is Omitted (boolean)
- `tool_config.api_schema.request_body_schema.type`: Type
- `tool_config.api_schema.request_body_schema.required`: Required
- `tool_config.api_schema.request_body_schema.properties`: Properties
- `tool_config.api_schema.request_body_schema.properties.q`: Q
- `tool_config.api_schema.response_body_schema`: Response Body Schema
- `tool_config.api_schema.response_filter`: Response Filter
- `tool_config.api_schema.content_type`: Content Type
- `tool_config.api_schema.auth_resolved_params`: Auth Resolved Params
- `tool_config.api_schema.auth_connection`: Auth Connection
- `tool_config.api_schema.mtls_auth_connection`: Mtls Auth Connection
- `tool_config.follow_redirects`: Follow Redirects (boolean)
- `tool_config.follow_redirects_allowed_domains`: Follow Redirects Allowed Domains
- `access_info`: Access Info
- `access_info.is_creator`: Is Creator (boolean)
- `access_info.creator_name`: Creator Name
- `access_info.creator_email`: Creator Email (email)
- `access_info.role`: Role
- `access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `access_info.access_source`: Access Source
- `usage_stats`: Usage Stats
- `usage_stats.total_calls`: Total Calls (number)
- `usage_stats.avg_latency_secs`: Avg Latency Secs (number)
- `response_mocks`: Response Mocks

### `elevenlabs_delete_dubbing`

**Delete Dubbing.** Permanently deletes a dubbing project and its results. Cannot be undone; a second call on the same id fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dubbingId` | string | yes |  | Dubbing ID. The dubbing_id from List Dubbings. |

Output fields:

- `status`: Status

### `elevenlabs_delete_kb_document`

**Delete KB Document.** Permanently deletes a knowledge base document or folder. Set force to delete it even when agents depend on it. A second call on the same id fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |
| `force` | string | no |  | Force. Delete even if agents use it. One of `true`, `false`. |

Output fields:

- `success`: Success (boolean)

### `elevenlabs_delete_kb_rag_index`

**Delete KB RAG Index.** Deletes one RAG index of a knowledge base document. The rag_index_id comes from Get KB Document RAG Indexes. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |
| `ragIndexId` | string | yes |  | Rag Index ID. The index id from Get KB Document RAG Indexes. |

Output fields:

- `success`: Success (boolean)

### `elevenlabs_delete_secret`

**Delete Secret.** Permanently deletes a workspace secret. A second call on the same id fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretId` | string | yes |  | Secret ID. The secret_id from List Secrets. |

Output fields:

- `success`: Success (boolean)

### `elevenlabs_delete_tool`

**Delete Tool.** Permanently deletes a tool. Set force to delete it even when agents use it. A second call on the same id fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toolId` | string | yes |  | Tool ID. The tool id from List Tools or Create Tool. |
| `force` | string | no |  | Force. Delete even if agents use it. One of `true`, `false`. |

Output fields:

- `success`: Success (boolean)

### `elevenlabs_download_history_items`

**Download History Items.** Downloads one or more generated audio items and returns them as a file (a single audio file for one item, a zip for several). The history_item_ids come from List History Items. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `historyItemIds` | array | yes |  | History Item Ids. The history_item_ids from List History Items. |
| `outputFormat` | string | no |  | Output Format. Leave empty to keep the original format. One of `"wav"`. |

Output fields:

- `file`: File (url)
- `content_type`: Content Type

### `elevenlabs_duplicate_agent`

**Duplicate Agent.** Creates a copy of an agent, optionally under a new name, and returns the new agent_id. Not idempotent: each call creates another agent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |
| `name` | string | no |  | Name. Name of the copy. |

Output fields:

- `agent_id`: Agent ID
- `main_branch_id`: Main Branch ID
- `initial_version_id`: Initial Version ID

### `elevenlabs_find_similar_voices`

**Find Similar Voices.** Uploads an audio sample and returns public library voices that sound similar to it. Use to pick a stock voice close to a target speaker. Results carry the ids that Add Shared Voice needs. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audioFile` | file | yes |  | Audio Sample. Files are not supported; an action that needs one fails. |
| `similarityThreshold` | number | no |  | Similarity Threshold. 0 to 2. Lower returns closer matches only. |
| `topK` | number | no |  | Max Results. Between 1 and 100. |

Output fields:

- `voices`: Voices
- `voices[].public_owner_id`: Public Owner ID
- `voices[].voice_id`: Voice ID
- `voices[].date_unix`: Date Unix (number)
- `voices[].name`: Name
- `voices[].accent`: Accent
- `voices[].gender`: Gender
- `voices[].age`: Age
- `voices[].descriptive`: Descriptive
- `voices[].use_case`: Use Case
- `voices[].category`: Category
- `voices[].language`: Language
- `voices[].locale`: Locale
- `voices[].description`: Description
- `voices[].preview_url`: Preview URL (url)
- `voices[].usage_character_count_1y`: Usage Character Count 1y (number)
- `voices[].usage_character_count_7d`: Usage Character Count 7d (number)
- `voices[].play_api_usage_character_count_1y`: Play API Usage Character Count 1y (number)
- `voices[].cloned_by_count`: Cloned By Count (number)
- `voices[].rate`: Rate (number)
- `voices[].fiat_rate`: Fiat Rate
- `voices[].free_users_allowed`: Free Users Allowed (boolean)
- `voices[].live_moderation_enabled`: Live Moderation Enabled (boolean)
- `voices[].featured`: Featured (boolean)
- `voices[].verified_languages`: Verified Languages
- `voices[].verified_languages[].language`: Language
- `voices[].verified_languages[].model_id`: Model ID
- `voices[].verified_languages[].accent`: Accent
- `voices[].verified_languages[].locale`: Locale
- `voices[].verified_languages[].preview_url`: Preview URL (url)
- `voices[].notice_period`: Notice Period (number)
- `voices[].instagram_username`: Instagram Username
- `voices[].twitter_username`: Twitter Username
- `voices[].youtube_username`: Youtube Username
- `voices[].tiktok_username`: Tiktok Username
- `voices[].image_url`: Image URL
- `voices[].is_added_by_user`: Is Added By User (boolean)
- `voices[].is_bookmarked`: Is Bookmarked
- `voices[].orb_thumbnail_signed_urls`: Orb Thumbnail Signed Urls
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `total_count`: Total Count (number)

### `elevenlabs_get_agent_knowledge_base_size`

**Get Agent Knowledge Base Size.** Returns the number of pages in the knowledge base attached to an agent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |

Output fields:

- `number_of_pages`: Number Of Pages (number)

### `elevenlabs_get_agent_link`

**Get Agent Link.** Returns the shareable link token of an agent, used to open it in the ElevenLabs web talk page. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |

Output fields:

- `agent_id`: Agent ID
- `token`: Token

### `elevenlabs_get_agent_test_summaries`

**Get Agent Test Summaries.** Returns short summaries for a list of test ids. Read-only despite using POST. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `testIds` | array | yes |  | Test Ids. Test ids from List Agent Tests. |

Output fields:

- `tests`: Tests By Test ID (an object whose keys vary)
- `tests.id`: ID
- `tests.name`: Name
- `tests.access_info`: Access Info
- `tests.access_info.is_creator`: Is Creator (boolean)
- `tests.access_info.creator_name`: Creator Name
- `tests.access_info.creator_email`: Creator Email (email)
- `tests.access_info.role`: Role
- `tests.access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `tests.access_info.access_source`: Access Source
- `tests.created_at_unix_secs`: Created At Unix Secs (number)
- `tests.last_updated_at_unix_secs`: Last Updated At Unix Secs (number)
- `tests.type`: Type
- `tests.entity_type`: Entity Type
- `tests.folder_parent_id`: Folder Parent ID
- `tests.folder_path`: Folder Path
- `tests.children_count`: Children Count
- `tests.conversation_initiation_source`: Conversation Initiation Source

### `elevenlabs_get_agent_test`

**Get Agent Test.** Returns one agent test with its type, success condition and examples. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `testId` | string | yes |  | Test ID. The test id from Create Agent Test or List Agent Tests. |

Output fields:

- `from_conversation_metadata`: From Conversation Metadata
- `dynamic_variables`: Dynamic Variables
- `chat_history`: Chat History
- `chat_history[].role`: Role
- `chat_history[].agent_metadata`: Agent Metadata
- `chat_history[].message`: Message
- `chat_history[].multivoice_message`: Multivoice Message
- `chat_history[].tool_calls`: Tool Calls
- `chat_history[].tool_results`: Tool Results
- `chat_history[].feedback`: Feedback
- `chat_history[].llm_override`: Llm Override
- `chat_history[].producing_llm`: Producing Llm
- `chat_history[].time_in_call_secs`: Time In Call Secs (number)
- `chat_history[].conversation_turn_metrics`: Conversation Turn Metrics
- `chat_history[].rag_retrieval_info`: Rag Retrieval Info
- `chat_history[].llm_usage`: Llm Usage
- `chat_history[].interrupted`: Interrupted (boolean)
- `chat_history[].ignored_as_backchannel`: Ignored As Backchannel (boolean)
- `chat_history[].original_message`: Original Message
- `chat_history[].reasoning`: Reasoning
- `chat_history[].source_medium`: Source Medium
- `chat_history[].source_event_id`: Source Event ID
- `chat_history[].used_static_kb_document_ids`: Used Static Kb Document IDs
- `chat_history[].analysis`: Analysis
- `chat_history[].user_identifier`: User Identifier
- `chat_history[].id`: ID
- `chat_history[].compaction`: Compaction
- `chat_history[].triggered_guardrails`: Triggered Guardrails
- `conversation_initiation_source`: Conversation Initiation Source
- `environment`: Environment
- `type`: Type
- `success_condition`: Success Condition
- `success_examples`: Success Examples
- `success_examples[].response`: Response
- `success_examples[].type`: Type
- `failure_examples`: Failure Examples
- `failure_examples[].response`: Response
- `failure_examples[].type`: Type
- `id`: ID
- `name`: Name

### `elevenlabs_get_agent_widget`

**Get Agent Widget.** Returns the website widget configuration of an agent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |

Output fields:

- `agent_id`: Agent ID
- `widget_config`: Widget Config
- `widget_config.variant`: Variant
- `widget_config.placement`: Placement
- `widget_config.expandable`: Expandable
- `widget_config.avatar`: Avatar
- `widget_config.avatar.type`: Type
- `widget_config.avatar.color_1`: Color 1
- `widget_config.avatar.color_2`: Color 2
- `widget_config.feedback_mode`: Feedback Mode
- `widget_config.end_feedback`: End Feedback
- `widget_config.end_feedback.type`: Type
- `widget_config.bg_color`: Bg Color
- `widget_config.text_color`: Text Color
- `widget_config.btn_color`: Btn Color
- `widget_config.btn_text_color`: Btn Text Color
- `widget_config.border_color`: Border Color
- `widget_config.focus_color`: Focus Color
- `widget_config.border_radius`: Border Radius
- `widget_config.btn_radius`: Btn Radius
- `widget_config.action_text`: Action Text
- `widget_config.start_call_text`: Start Call Text
- `widget_config.end_call_text`: End Call Text
- `widget_config.expand_text`: Expand Text
- `widget_config.listening_text`: Listening Text
- `widget_config.speaking_text`: Speaking Text
- `widget_config.shareable_page_text`: Shareable Page Text
- `widget_config.shareable_page_show_terms`: Shareable Page Show Terms (boolean)
- `widget_config.terms_text`: Terms Text
- `widget_config.terms_html`: Terms HTML
- `widget_config.terms_key`: Terms Key
- `widget_config.show_avatar_when_collapsed`: Show Avatar When Collapsed (boolean)
- `widget_config.disable_banner`: Disable Banner (boolean)
- `widget_config.override_link`: Override Link
- `widget_config.markdown_link_allowed_hosts`: Markdown Link Allowed Hosts
- `widget_config.markdown_link_include_www`: Markdown Link Include Www (boolean)
- `widget_config.markdown_link_allow_http`: Markdown Link Allow Http (boolean)
- `widget_config.mic_muting_enabled`: Mic Muting Enabled (boolean)
- `widget_config.transcript_enabled`: Transcript Enabled (boolean)
- `widget_config.text_input_enabled`: Text Input Enabled (boolean)
- `widget_config.conversation_mode_toggle_enabled`: Conversation Mode Toggle Enabled (boolean)
- `widget_config.default_expanded`: Default Expanded (boolean)
- `widget_config.always_expanded`: Always Expanded (boolean)
- `widget_config.dismissible`: Dismissible (boolean)
- `widget_config.show_agent_status`: Show Agent Status (boolean)
- `widget_config.show_conversation_id`: Show Conversation ID (boolean)
- `widget_config.strip_audio_tags`: Strip Audio Tags (boolean)
- `widget_config.syntax_highlight_theme`: Syntax Highlight Theme
- `widget_config.text_contents`: Text Contents
- `widget_config.text_contents.main_label`: Main Label
- `widget_config.text_contents.start_call`: Start Call
- `widget_config.text_contents.start_chat`: Start Chat
- `widget_config.text_contents.new_call`: New Call
- `widget_config.text_contents.end_call`: End Call
- `widget_config.text_contents.mute_microphone`: Mute Microphone
- `widget_config.text_contents.change_language`: Change Language
- `widget_config.text_contents.collapse`: Collapse
- `widget_config.text_contents.expand`: Expand
- `widget_config.text_contents.copied`: Copied
- `widget_config.text_contents.accept_terms`: Accept Terms
- `widget_config.text_contents.dismiss_terms`: Dismiss Terms
- `widget_config.text_contents.listening_status`: Listening Status
- `widget_config.text_contents.speaking_status`: Speaking Status
- `widget_config.text_contents.connecting_status`: Connecting Status
- `widget_config.text_contents.chatting_status`: Chatting Status
- `widget_config.text_contents.queue_waiting_status`: Queue Waiting Status
- `widget_config.text_contents.queue_waiting_status_short`: Queue Waiting Status Short
- `widget_config.text_contents.input_label`: Input Label
- `widget_config.text_contents.input_placeholder`: Input Placeholder
- `widget_config.text_contents.input_placeholder_text_only`: Input Placeholder Text Only
- `widget_config.text_contents.input_placeholder_new_conversation`: Input Placeholder New Conversation
- `widget_config.text_contents.user_ended_conversation`: User Ended Conversation
- `widget_config.text_contents.agent_ended_conversation`: Agent Ended Conversation
- `widget_config.text_contents.conversation_id`: Conversation ID
- `widget_config.text_contents.error_occurred`: Error Occurred
- `widget_config.text_contents.queue_timed_out`: Queue Timed Out
- `widget_config.text_contents.copy_id`: Copy ID
- `widget_config.text_contents.initiate_feedback`: Initiate Feedback
- `widget_config.text_contents.request_follow_up_feedback`: Request Follow Up Feedback
- `widget_config.text_contents.thanks_for_feedback`: Thanks For Feedback
- `widget_config.text_contents.thanks_for_feedback_details`: Thanks For Feedback Details
- `widget_config.text_contents.follow_up_feedback_placeholder`: Follow Up Feedback Placeholder
- `widget_config.text_contents.submit`: Submit
- `widget_config.text_contents.go_back`: Go Back
- `widget_config.text_contents.send_message`: Send Message
- `widget_config.text_contents.text_mode`: Text Mode
- `widget_config.text_contents.voice_mode`: Voice Mode
- `widget_config.text_contents.switched_to_text_mode`: Switched To Text Mode
- `widget_config.text_contents.switched_to_voice_mode`: Switched To Voice Mode
- `widget_config.text_contents.copy`: Copy
- `widget_config.text_contents.download`: Download
- `widget_config.text_contents.wrap`: Wrap
- `widget_config.text_contents.agent_working`: Agent Working
- `widget_config.text_contents.agent_done`: Agent Done
- `widget_config.text_contents.agent_error`: Agent Error
- `widget_config.text_contents.attach_file`: Attach File
- `widget_config.text_contents.remove_file`: Remove File
- `widget_config.text_contents.file_upload_error`: File Upload Error
- `widget_config.text_contents.file_type_unsupported`: File Type Unsupported
- `widget_config.text_contents.file_too_large`: File Too Large
- `widget_config.text_contents.file_limit_reached`: File Limit Reached
- `widget_config.text_contents.typing_indicator`: Typing Indicator
- `widget_config.text_contents.rich_content_unavailable`: Rich Content Unavailable
- `widget_config.styles`: Styles
- `widget_config.styles.base`: Base
- `widget_config.styles.base_hover`: Base Hover
- `widget_config.styles.base_active`: Base Active
- `widget_config.styles.base_border`: Base Border
- `widget_config.styles.base_subtle`: Base Subtle
- `widget_config.styles.base_primary`: Base Primary
- `widget_config.styles.base_error`: Base Error
- `widget_config.styles.accent`: Accent
- `widget_config.styles.accent_hover`: Accent Hover
- `widget_config.styles.accent_active`: Accent Active
- `widget_config.styles.accent_border`: Accent Border
- `widget_config.styles.accent_subtle`: Accent Subtle
- `widget_config.styles.accent_primary`: Accent Primary
- `widget_config.styles.overlay_padding`: Overlay Padding
- `widget_config.styles.button_radius`: Button Radius
- `widget_config.styles.input_radius`: Input Radius
- `widget_config.styles.bubble_radius`: Bubble Radius
- `widget_config.styles.sheet_radius`: Sheet Radius
- `widget_config.styles.compact_sheet_radius`: Compact Sheet Radius
- `widget_config.styles.dropdown_sheet_radius`: Dropdown Sheet Radius
- `widget_config.show_resize_button`: Show Resize Button (boolean)
- `widget_config.language`: Language
- `widget_config.supported_language_overrides`: Supported Language Overrides
- `widget_config.language_presets`: Language Presets
- `widget_config.text_only`: Text Only (boolean)
- `widget_config.supports_text_only`: Supports Text Only (boolean)
- `widget_config.first_message`: First Message
- `widget_config.use_rtc`: Use Rtc
- `widget_config.file_input_config`: File Input Config
- `widget_config.file_input_config.enabled`: Enabled (boolean)
- `widget_config.file_input_config.max_files_in_memory`: Max Files In Memory (number)
- `widget_config.file_input_config.max_files_per_conversation`: Max Files Per Conversation (number)
- `widget_config.first_message_rich_content`: First Message Rich Content

### `elevenlabs_get_agent`

**Get Agent.** Returns an agent with its full configuration: prompt, voice, language, tools, phone numbers and platform settings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |

Output fields:

- `agent_id`: Agent ID
- `name`: Name
- `conversation_config`: Conversation Config
- `conversation_config.asr`: Asr
- `conversation_config.asr.quality`: Quality
- `conversation_config.asr.provider`: Provider
- `conversation_config.asr.user_input_audio_format`: User Input Audio Format
- `conversation_config.asr.keywords`: Keywords
- `conversation_config.turn`: Turn
- `conversation_config.turn.turn_timeout`: Turn Timeout (number)
- `conversation_config.turn.initial_wait_time`: Initial Wait Time
- `conversation_config.turn.silence_end_call_timeout`: Silence End Call Timeout (number)
- `conversation_config.turn.mode`: Mode
- `conversation_config.turn.turn_eagerness`: Turn Eagerness
- `conversation_config.turn.spelling_patience`: Spelling Patience
- `conversation_config.turn.speculative_turn`: Speculative Turn (boolean)
- `conversation_config.turn.retranscribe_on_turn_timeout`: Retranscribe On Turn Timeout (boolean)
- `conversation_config.turn.turn_model`: Turn Model
- `conversation_config.turn.interruption_ignore_terms`: Interruption Ignore Terms
- `conversation_config.turn.interruption_ignore_term_languages`: Interruption Ignore Term Languages
- `conversation_config.turn.merge_with_default_ignore_terms`: Merge With Default Ignore Terms (boolean)
- `conversation_config.turn.transcribe_on_disabled_interruptions`: Transcribe On Disabled Interruptions (boolean)
- `conversation_config.turn.soft_timeout_config`: Soft Timeout Config
- `conversation_config.turn.soft_timeout_config.timeout_seconds`: Timeout Seconds (number)
- `conversation_config.turn.soft_timeout_config.message`: Message
- `conversation_config.turn.soft_timeout_config.additional_soft_timeout_messages`: Additional Soft Timeout Messages
- `conversation_config.turn.soft_timeout_config.use_llm_generated_message`: Use Llm Generated Message (boolean)
- `conversation_config.turn.soft_timeout_config.randomize_fillers`: Randomize Fillers (boolean)
- `conversation_config.turn.soft_timeout_config.max_soft_timeouts_per_generation`: Max Soft Timeouts Per Generation (number)
- `conversation_config.turn.soft_timeout_config.llm_generated_message_prompt_override`: Llm Generated Message Prompt Override
- `conversation_config.turn.soft_timeout_config.disable_until_first_user_message`: Disable Until First User Message (boolean)
- `conversation_config.tts`: Tts
- `conversation_config.tts.model_id`: Model ID
- `conversation_config.tts.voice_id`: Voice ID
- `conversation_config.tts.supported_voices`: Supported Voices
- `conversation_config.tts.expressive_mode`: Expressive Mode (boolean)
- `conversation_config.tts.suggested_audio_tags`: Suggested Audio Tags
- `conversation_config.tts.agent_output_audio_format`: Agent Output Audio Format
- `conversation_config.tts.optimize_streaming_latency`: Optimize Streaming Latency (number)
- `conversation_config.tts.stability`: Stability (number)
- `conversation_config.tts.speed`: Speed (number)
- `conversation_config.tts.similarity_boost`: Similarity Boost (number)
- `conversation_config.tts.text_normalisation_type`: Text Normalisation Type
- `conversation_config.tts.pronunciation_dictionary_locators`: Pronunciation Dictionary Locators
- `conversation_config.tts.enable_phoneme_tags`: Enable Phoneme Tags (boolean)
- `conversation_config.tts.audio_effects`: Audio Effects
- `conversation_config.conversation`: Conversation
- `conversation_config.conversation.text_only`: Text Only (boolean)
- `conversation_config.conversation.max_duration_seconds`: Max Duration Seconds (number)
- `conversation_config.conversation.max_duration_seconds_after_last_agent_message`: Max Duration Seconds After Last Agent Message
- `conversation_config.conversation.client_events`: Client Events
- `conversation_config.conversation.file_input`: File Input
- `conversation_config.conversation.file_input.enabled`: Enabled (boolean)
- `conversation_config.conversation.file_input.max_files_in_memory`: Max Files In Memory (number)
- `conversation_config.conversation.file_input.max_files_per_conversation`: Max Files Per Conversation (number)
- `conversation_config.conversation.monitoring_enabled`: Monitoring Enabled (boolean)
- `conversation_config.conversation.monitoring_events`: Monitoring Events
- `conversation_config.conversation.dtmf_input_settings`: Dtmf Input Settings
- `conversation_config.conversation.background_sound`: Background Sound
- `conversation_config.conversation.background_sound.source_type`: Source Type
- `conversation_config.conversation.background_sound.source_id`: Source ID
- `conversation_config.conversation.background_sound.volume`: Volume (number)
- `conversation_config.conversation.background_sound.crossfade_loop`: Crossfade Loop (boolean)
- `conversation_config.conversation.compaction`: Compaction
- `conversation_config.conversation.compaction.enabled`: Enabled
- `conversation_config.conversation.compaction.soft_trigger_fraction`: Soft Trigger Fraction
- `conversation_config.conversation.compaction.tail_size`: Tail Size
- `conversation_config.conversation.compaction.min_reclaimable_tokens`: Min Reclaimable Tokens
- `conversation_config.conversation.source_attribution`: Source Attribution (boolean)
- `conversation_config.language_presets`: Language Presets
- `conversation_config.vad`: Vad
- `conversation_config.vad.background_voice_detection`: Background Voice Detection (boolean)
- `conversation_config.realtime_model`: Realtime Model
- `conversation_config.agent`: Agent
- `conversation_config.agent.first_message`: First Message
- `conversation_config.agent.language`: Language
- `conversation_config.agent.hinglish_mode`: Hinglish Mode (boolean)
- `conversation_config.agent.dynamic_variables`: Dynamic Variables
- `conversation_config.agent.dynamic_variables.dynamic_variable_placeholders`: Dynamic Variable Placeholders
- `conversation_config.agent.disable_first_message_interruptions`: Disable First Message Interruptions (boolean)
- `conversation_config.agent.max_conversation_duration_message`: Max Conversation Duration Message
- `conversation_config.agent.text_behavior_overrides`: Text Behavior Overrides
- `conversation_config.agent.subagents`: Subagents
- `conversation_config.agent.prompt`: Prompt
- `conversation_config.agent.prompt.prompt`: Prompt
- `conversation_config.agent.prompt.llm`: Llm
- `conversation_config.agent.prompt.reasoning_effort`: Reasoning Effort
- `conversation_config.agent.prompt.service_tier`: Service Tier
- `conversation_config.agent.prompt.opener`: Opener
- `conversation_config.agent.prompt.thinking_budget`: Thinking Budget
- `conversation_config.agent.prompt.enable_reasoning_summary`: Enable Reasoning Summary (boolean)
- `conversation_config.agent.prompt.temperature`: Temperature (number)
- `conversation_config.agent.prompt.max_tokens`: Max Tokens (number)
- `conversation_config.agent.prompt.tool_ids`: Tool IDs
- `conversation_config.agent.prompt.built_in_tools`: Built In Tools
- `conversation_config.agent.prompt.built_in_tools.transfer_to_agent`: Transfer To Agent
- `conversation_config.agent.prompt.built_in_tools.update_state`: Update State
- `conversation_config.agent.prompt.built_in_tools.memory_entry_search`: Memory Entry Search
- `conversation_config.agent.prompt.built_in_tools.run_subagent`: Run Subagent
- `conversation_config.agent.prompt.built_in_tools.flag_issue_for_review`: Flag Issue For Review
- `conversation_config.agent.prompt.built_in_tools.end_call`: End Call
- `conversation_config.agent.prompt.built_in_tools.language_detection`: Language Detection
- `conversation_config.agent.prompt.built_in_tools.transfer_to_number`: Transfer To Number
- `conversation_config.agent.prompt.built_in_tools.skip_turn`: Skip Turn
- `conversation_config.agent.prompt.built_in_tools.play_keypad_touch_tone`: Play Keypad Touch Tone
- `conversation_config.agent.prompt.built_in_tools.voicemail_detection`: Voicemail Detection
- `conversation_config.agent.prompt.built_in_tools.transfer_to_genesys`: Transfer To Genesys
- `conversation_config.agent.prompt.built_in_tools.transfer_to_genesys_chat`: Transfer To Genesys Chat
- `conversation_config.agent.prompt.built_in_tools.transfer_to_genesys_bot`: Transfer To Genesys Bot
- `conversation_config.agent.prompt.enable_parallel_tool_calls`: Enable Parallel Tool Calls (boolean)
- `conversation_config.agent.prompt.mcp_server_ids`: Mcp Server IDs
- `conversation_config.agent.prompt.native_mcp_server_ids`: Native Mcp Server IDs
- `conversation_config.agent.prompt.knowledge_base`: Knowledge Base
- `conversation_config.agent.prompt.custom_llm`: Custom Llm
- `conversation_config.agent.prompt.bedrock_llm`: Bedrock Llm
- `conversation_config.agent.prompt.speech_engine`: Speech Engine
- `conversation_config.agent.prompt.ignore_default_personality`: Ignore Default Personality (boolean)
- `conversation_config.agent.prompt.rag`: Rag
- `conversation_config.agent.prompt.rag.enabled`: Enabled (boolean)
- `conversation_config.agent.prompt.rag.embedding_model`: Embedding Model
- `conversation_config.agent.prompt.rag.optional_rag_enabled`: Optional Rag Enabled (boolean)
- `conversation_config.agent.prompt.rag.max_vector_distance`: Max Vector Distance (number)
- `conversation_config.agent.prompt.rag.max_documents_length`: Max Documents Length (number)
- `conversation_config.agent.prompt.rag.max_retrieved_rag_chunks_count`: Max Retrieved Rag Chunks Count (number)
- `conversation_config.agent.prompt.rag.num_candidates`: Num Candidates
- `conversation_config.agent.prompt.rag.query_rewrite_prompt_override`: Query Rewrite Prompt Override
- `conversation_config.agent.prompt.rag.knowledge_base_tool_info`: Knowledge Base Tool Info
- `conversation_config.agent.prompt.rag.include_source_urls`: Include Source Urls (boolean)
- `conversation_config.agent.prompt.timezone`: Timezone
- `conversation_config.agent.prompt.backup_llm_config`: Backup Llm Config
- `conversation_config.agent.prompt.backup_llm_config.preference`: Preference
- `conversation_config.agent.prompt.cascade_timeout_seconds`: Cascade Timeout Seconds (number)
- `conversation_config.agent.prompt.tools`: Tools
- `metadata`: Metadata
- `metadata.created_at_unix_secs`: Created At Unix Secs (number)
- `metadata.updated_at_unix_secs`: Updated At Unix Secs (number)
- `platform_settings`: Platform Settings
- `platform_settings.evaluation`: Evaluation
- `platform_settings.evaluation.criteria`: Criteria
- `platform_settings.widget`: Widget
- `platform_settings.widget.variant`: Variant
- `platform_settings.widget.placement`: Placement
- `platform_settings.widget.expandable`: Expandable
- `platform_settings.widget.avatar`: Avatar
- `platform_settings.widget.avatar.type`: Type
- `platform_settings.widget.avatar.color_1`: Color 1
- `platform_settings.widget.avatar.color_2`: Color 2
- `platform_settings.widget.feedback_mode`: Feedback Mode
- `platform_settings.widget.end_feedback`: End Feedback
- `platform_settings.widget.end_feedback.type`: Type
- `platform_settings.widget.bg_color`: Bg Color
- `platform_settings.widget.text_color`: Text Color
- `platform_settings.widget.btn_color`: Btn Color
- `platform_settings.widget.btn_text_color`: Btn Text Color
- `platform_settings.widget.border_color`: Border Color
- `platform_settings.widget.focus_color`: Focus Color
- `platform_settings.widget.border_radius`: Border Radius
- `platform_settings.widget.btn_radius`: Btn Radius
- `platform_settings.widget.action_text`: Action Text
- `platform_settings.widget.start_call_text`: Start Call Text
- `platform_settings.widget.end_call_text`: End Call Text
- `platform_settings.widget.expand_text`: Expand Text
- `platform_settings.widget.listening_text`: Listening Text
- `platform_settings.widget.speaking_text`: Speaking Text
- `platform_settings.widget.shareable_page_text`: Shareable Page Text
- `platform_settings.widget.shareable_page_show_terms`: Shareable Page Show Terms (boolean)
- `platform_settings.widget.terms_text`: Terms Text
- `platform_settings.widget.terms_html`: Terms HTML
- `platform_settings.widget.terms_key`: Terms Key
- `platform_settings.widget.show_avatar_when_collapsed`: Show Avatar When Collapsed (boolean)
- `platform_settings.widget.disable_banner`: Disable Banner (boolean)
- `platform_settings.widget.override_link`: Override Link
- `platform_settings.widget.markdown_link_allowed_hosts`: Markdown Link Allowed Hosts
- `platform_settings.widget.markdown_link_include_www`: Markdown Link Include Www (boolean)
- `platform_settings.widget.markdown_link_allow_http`: Markdown Link Allow Http (boolean)
- `platform_settings.widget.mic_muting_enabled`: Mic Muting Enabled (boolean)
- `platform_settings.widget.transcript_enabled`: Transcript Enabled (boolean)
- `platform_settings.widget.text_input_enabled`: Text Input Enabled (boolean)
- `platform_settings.widget.conversation_mode_toggle_enabled`: Conversation Mode Toggle Enabled (boolean)
- `platform_settings.widget.default_expanded`: Default Expanded (boolean)
- `platform_settings.widget.always_expanded`: Always Expanded (boolean)
- `platform_settings.widget.dismissible`: Dismissible (boolean)
- `platform_settings.widget.show_agent_status`: Show Agent Status (boolean)
- `platform_settings.widget.show_conversation_id`: Show Conversation ID (boolean)
- `platform_settings.widget.strip_audio_tags`: Strip Audio Tags (boolean)
- `platform_settings.widget.syntax_highlight_theme`: Syntax Highlight Theme
- `platform_settings.widget.text_contents`: Text Contents
- `platform_settings.widget.text_contents.main_label`: Main Label
- `platform_settings.widget.text_contents.start_call`: Start Call
- `platform_settings.widget.text_contents.start_chat`: Start Chat
- `platform_settings.widget.text_contents.new_call`: New Call
- `platform_settings.widget.text_contents.end_call`: End Call
- `platform_settings.widget.text_contents.mute_microphone`: Mute Microphone
- `platform_settings.widget.text_contents.change_language`: Change Language
- `platform_settings.widget.text_contents.collapse`: Collapse
- `platform_settings.widget.text_contents.expand`: Expand
- `platform_settings.widget.text_contents.copied`: Copied
- `platform_settings.widget.text_contents.accept_terms`: Accept Terms
- `platform_settings.widget.text_contents.dismiss_terms`: Dismiss Terms
- `platform_settings.widget.text_contents.listening_status`: Listening Status
- `platform_settings.widget.text_contents.speaking_status`: Speaking Status
- `platform_settings.widget.text_contents.connecting_status`: Connecting Status
- `platform_settings.widget.text_contents.chatting_status`: Chatting Status
- `platform_settings.widget.text_contents.queue_waiting_status`: Queue Waiting Status
- `platform_settings.widget.text_contents.queue_waiting_status_short`: Queue Waiting Status Short
- `platform_settings.widget.text_contents.input_label`: Input Label
- `platform_settings.widget.text_contents.input_placeholder`: Input Placeholder
- `platform_settings.widget.text_contents.input_placeholder_text_only`: Input Placeholder Text Only
- `platform_settings.widget.text_contents.input_placeholder_new_conversation`: Input Placeholder New Conversation
- `platform_settings.widget.text_contents.user_ended_conversation`: User Ended Conversation
- `platform_settings.widget.text_contents.agent_ended_conversation`: Agent Ended Conversation
- `platform_settings.widget.text_contents.conversation_id`: Conversation ID
- `platform_settings.widget.text_contents.error_occurred`: Error Occurred
- `platform_settings.widget.text_contents.queue_timed_out`: Queue Timed Out
- `platform_settings.widget.text_contents.copy_id`: Copy ID
- `platform_settings.widget.text_contents.initiate_feedback`: Initiate Feedback
- `platform_settings.widget.text_contents.request_follow_up_feedback`: Request Follow Up Feedback
- `platform_settings.widget.text_contents.thanks_for_feedback`: Thanks For Feedback
- `platform_settings.widget.text_contents.thanks_for_feedback_details`: Thanks For Feedback Details
- `platform_settings.widget.text_contents.follow_up_feedback_placeholder`: Follow Up Feedback Placeholder
- `platform_settings.widget.text_contents.submit`: Submit
- `platform_settings.widget.text_contents.go_back`: Go Back
- `platform_settings.widget.text_contents.send_message`: Send Message
- `platform_settings.widget.text_contents.text_mode`: Text Mode
- `platform_settings.widget.text_contents.voice_mode`: Voice Mode
- `platform_settings.widget.text_contents.switched_to_text_mode`: Switched To Text Mode
- `platform_settings.widget.text_contents.switched_to_voice_mode`: Switched To Voice Mode
- `platform_settings.widget.text_contents.copy`: Copy
- `platform_settings.widget.text_contents.download`: Download
- `platform_settings.widget.text_contents.wrap`: Wrap
- `platform_settings.widget.text_contents.agent_working`: Agent Working
- `platform_settings.widget.text_contents.agent_done`: Agent Done
- `platform_settings.widget.text_contents.agent_error`: Agent Error
- `platform_settings.widget.text_contents.attach_file`: Attach File
- `platform_settings.widget.text_contents.remove_file`: Remove File
- `platform_settings.widget.text_contents.file_upload_error`: File Upload Error
- `platform_settings.widget.text_contents.file_type_unsupported`: File Type Unsupported
- `platform_settings.widget.text_contents.file_too_large`: File Too Large
- `platform_settings.widget.text_contents.file_limit_reached`: File Limit Reached
- `platform_settings.widget.text_contents.typing_indicator`: Typing Indicator
- `platform_settings.widget.text_contents.rich_content_unavailable`: Rich Content Unavailable
- `platform_settings.widget.styles`: Styles
- `platform_settings.widget.styles.base`: Base
- `platform_settings.widget.styles.base_hover`: Base Hover
- `platform_settings.widget.styles.base_active`: Base Active
- `platform_settings.widget.styles.base_border`: Base Border
- `platform_settings.widget.styles.base_subtle`: Base Subtle
- `platform_settings.widget.styles.base_primary`: Base Primary
- `platform_settings.widget.styles.base_error`: Base Error
- `platform_settings.widget.styles.accent`: Accent
- `platform_settings.widget.styles.accent_hover`: Accent Hover
- `platform_settings.widget.styles.accent_active`: Accent Active
- `platform_settings.widget.styles.accent_border`: Accent Border
- `platform_settings.widget.styles.accent_subtle`: Accent Subtle
- `platform_settings.widget.styles.accent_primary`: Accent Primary
- `platform_settings.widget.styles.overlay_padding`: Overlay Padding
- `platform_settings.widget.styles.button_radius`: Button Radius
- `platform_settings.widget.styles.input_radius`: Input Radius
- `platform_settings.widget.styles.bubble_radius`: Bubble Radius
- `platform_settings.widget.styles.sheet_radius`: Sheet Radius
- `platform_settings.widget.styles.compact_sheet_radius`: Compact Sheet Radius
- `platform_settings.widget.styles.dropdown_sheet_radius`: Dropdown Sheet Radius
- `platform_settings.widget.show_resize_button`: Show Resize Button (boolean)
- `platform_settings.widget.language_selector`: Language Selector (boolean)
- `platform_settings.widget.supports_text_only`: Supports Text Only (boolean)
- `platform_settings.widget.custom_avatar_path`: Custom Avatar Path
- `platform_settings.widget.language_presets`: Language Presets
- `platform_settings.widget.first_message_quick_replies`: First Message Quick Replies
- `platform_settings.data_collection`: Data Collection
- `platform_settings.data_collection_scopes`: Data Collection Scopes
- `platform_settings.analysis_items`: Analysis Items
- `platform_settings.analysis_items.evaluation_criteria`: Evaluation Criteria
- `platform_settings.analysis_items.data_collection`: Data Collection
- `platform_settings.overrides`: Overrides
- `platform_settings.overrides.conversation_config_override`: Conversation Config Override
- `platform_settings.overrides.conversation_config_override.asr`: Asr
- `platform_settings.overrides.conversation_config_override.asr.keywords`: Keywords (boolean)
- `platform_settings.overrides.conversation_config_override.turn`: Turn
- `platform_settings.overrides.conversation_config_override.turn.soft_timeout_config`: Soft Timeout Config
- `platform_settings.overrides.conversation_config_override.tts`: Tts
- `platform_settings.overrides.conversation_config_override.tts.model_id`: Model ID (boolean)
- `platform_settings.overrides.conversation_config_override.tts.voice_id`: Voice ID (boolean)
- `platform_settings.overrides.conversation_config_override.tts.supported_voices`: Supported Voices (boolean)
- `platform_settings.overrides.conversation_config_override.tts.stability`: Stability (boolean)
- `platform_settings.overrides.conversation_config_override.tts.speed`: Speed (boolean)
- `platform_settings.overrides.conversation_config_override.tts.similarity_boost`: Similarity Boost (boolean)
- `platform_settings.overrides.conversation_config_override.tts.pronunciation_dictionary_locators`: Pronunciation Dictionary Locators (boolean)
- `platform_settings.overrides.conversation_config_override.conversation`: Conversation
- `platform_settings.overrides.conversation_config_override.conversation.text_only`: Text Only (boolean)
- `platform_settings.overrides.conversation_config_override.conversation.max_duration_seconds`: Max Duration Seconds (boolean)
- `platform_settings.overrides.conversation_config_override.agent`: Agent
- `platform_settings.overrides.conversation_config_override.agent.first_message`: First Message (boolean)
- `platform_settings.overrides.conversation_config_override.agent.language`: Language (boolean)
- `platform_settings.overrides.conversation_config_override.agent.max_conversation_duration_message`: Max Conversation Duration Message (boolean)
- `platform_settings.overrides.conversation_config_override.agent.prompt`: Prompt
- `platform_settings.overrides.custom_llm_extra_body`: Custom Llm Extra Body (boolean)
- `platform_settings.overrides.enable_conversation_initiation_client_data_from_webhook`: Enable Conversation Initiation Client Data From Webhook (boolean)
- `platform_settings.overrides.enable_starting_workflow_node_id_from_client`: Enable Starting Workflow Node ID From Client (boolean)
- `platform_settings.overrides.enable_procedure_ids_from_client`: Enable Procedure IDs From Client (boolean)
- `platform_settings.workspace_overrides`: Workspace Overrides
- `platform_settings.workspace_overrides.conversation_initiation_client_data_webhook`: Conversation Initiation Client Data Webhook
- `platform_settings.workspace_overrides.webhooks`: Webhooks
- `platform_settings.workspace_overrides.webhooks.post_call_webhook_id`: Post Call Webhook ID
- `platform_settings.workspace_overrides.webhooks.events`: Events
- `platform_settings.workspace_overrides.webhooks.transcript_format`: Transcript Format
- `platform_settings.workspace_overrides.webhooks.send_audio`: Send Audio (boolean)
- `platform_settings.workspace_overrides.cloud_storage_export`: Cloud Storage Export
- `platform_settings.workspace_overrides.cloud_storage_export.destination_id`: Destination ID
- `platform_settings.workspace_overrides.cloud_storage_export.events`: Events
- `platform_settings.workspace_overrides.cloud_storage_export.transcript_format`: Transcript Format
- `platform_settings.testing`: Testing
- `platform_settings.testing.attached_tests`: Attached Tests
- `platform_settings.testing.referenced_tests_ids`: Referenced Tests IDs
- `platform_settings.archived`: Archived (boolean)
- `platform_settings.guardrails`: Guardrails
- `platform_settings.guardrails.version`: Version
- `platform_settings.guardrails.focus`: Focus
- `platform_settings.guardrails.focus.is_enabled`: Is Enabled (boolean)
- `platform_settings.guardrails.prompt_injection`: Prompt Injection
- `platform_settings.guardrails.prompt_injection.is_enabled`: Is Enabled (boolean)
- `platform_settings.guardrails.synthetic_voice`: Synthetic Voice
- `platform_settings.guardrails.synthetic_voice.is_enabled`: Is Enabled (boolean)
- `platform_settings.guardrails.synthetic_voice.trigger_action`: Trigger Action
- `platform_settings.guardrails.synthetic_voice.trigger_action.type`: Type
- `platform_settings.guardrails.content`: Content
- `platform_settings.guardrails.content.execution_mode`: Execution Mode
- `platform_settings.guardrails.content.trigger_action`: Trigger Action
- `platform_settings.guardrails.content.trigger_action.type`: Type
- `platform_settings.guardrails.moderation`: Moderation
- `platform_settings.guardrails.custom`: Custom
- `platform_settings.summary_language`: Summary Language
- `platform_settings.auto_translate_transcript_to_app_language`: Auto Translate Transcript To App Language
- `platform_settings.auth`: Auth
- `platform_settings.auth.enable_auth`: Enable Auth (boolean)
- `platform_settings.auth.allowlist`: Allowlist
- `platform_settings.auth.require_origin_header`: Require Origin Header (boolean)
- `platform_settings.auth.shareable_token`: Shareable Token
- `platform_settings.call_limits`: Call Limits
- `platform_settings.call_limits.agent_concurrency_limit`: Agent Concurrency Limit (number)
- `platform_settings.call_limits.daily_limit`: Daily Limit (number)
- `platform_settings.call_limits.bursting_enabled`: Bursting Enabled (boolean)
- `platform_settings.queueing_config`: Queueing Config
- `platform_settings.queueing_config.enabled`: Enabled (boolean)
- `platform_settings.queueing_config.wait_timeout_seconds`: Wait Timeout Seconds (number)
- `platform_settings.queueing_config.hold_audio`: Hold Audio
- `platform_settings.ban`: Ban
- `platform_settings.smb_metadata`: Smb Metadata
- `platform_settings.privacy`: Privacy
- `platform_settings.privacy.record_voice`: Record Voice (boolean)
- `platform_settings.privacy.retention_days`: Retention Days (number)
- `platform_settings.privacy.delete_transcript_and_pii`: Delete Transcript And Pii (boolean)
- `platform_settings.privacy.delete_audio`: Delete Audio (boolean)
- `platform_settings.privacy.apply_to_existing_conversations`: Apply To Existing Conversations (boolean)
- `platform_settings.privacy.zero_retention_mode`: Zero Retention Mode (boolean)
- `platform_settings.privacy.nested_history_redaction`: Nested History Redaction (boolean)
- `platform_settings.privacy.conversation_history_redaction`: Conversation History Redaction
- `platform_settings.privacy.conversation_history_redaction.enabled`: Enabled (boolean)
- `platform_settings.privacy.conversation_history_redaction.entities`: Entities
- `platform_settings.privacy.user_memory`: User Memory
- `platform_settings.privacy.user_memory.enabled`: Enabled (boolean)
- `platform_settings.privacy.user_memory.scale`: Scale
- `platform_settings.trust_context`: Trust Context
- `platform_settings.analysis_llm`: Analysis Llm
- `platform_settings.analysis_bedrock_llm`: Analysis Bedrock Llm
- `platform_settings.analysis_llm_billed`: Analysis Llm Billed (boolean)
- `platform_settings.topic_discovery`: Topic Discovery
- `platform_settings.topic_discovery.enabled`: Enabled (boolean)
- `platform_settings.sentiment_analysis`: Sentiment Analysis
- `platform_settings.sentiment_analysis.enabled`: Enabled (boolean)
- `platform_settings.simulation_library`: Simulation Library
- `platform_settings.simulation_library.enabled`: Enabled (boolean)
- `platform_settings.simulation_library.test_ids`: Test IDs
- `platform_settings.alerting`: Alerting
- `platform_settings.overview_dashboard_template_id`: Overview Dashboard Template ID
- `platform_settings.safety`: Safety
- `platform_settings.safety.is_blocked_ivc`: Is Blocked Ivc (boolean)
- `platform_settings.safety.is_blocked_non_ivc`: Is Blocked Non Ivc (boolean)
- `platform_settings.safety.ignore_safety_evaluation`: Ignore Safety Evaluation (boolean)
- `phone_numbers`: Phone Numbers
- `whatsapp_accounts`: Whatsapp Accounts
- `workflow`: Workflow
- `workflow.edges`: Edges
- `workflow.nodes`: Nodes
- `workflow.nodes.start_node`: Start Node
- `workflow.nodes.start_node.type`: Type
- `workflow.nodes.start_node.position`: Position
- `workflow.nodes.start_node.position.x`: X (number)
- `workflow.nodes.start_node.position.y`: Y (number)
- `workflow.nodes.start_node.edge_order`: Edge Order
- `workflow.nodes.start_node.parent_subgraph_id`: Parent Subgraph ID
- `workflow.subgraphs`: Subgraphs
- `workflow.prevent_subagent_loops`: Prevent Subagent Loops (boolean)
- `access_info`: Access Info
- `access_info.is_creator`: Is Creator (boolean)
- `access_info.creator_name`: Creator Name
- `access_info.creator_email`: Creator Email (email)
- `access_info.role`: Role
- `access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `access_info.access_source`: Access Source
- `access_permissions`: Access Permissions
- `tags`: Tags
- `version_id`: Version ID
- `branch_id`: Branch ID
- `main_branch_id`: Main Branch ID
- `procedures`: Procedures
- `trust_context`: Trust Context
- `default_hold_audio_url`: Default Hold Audio URL (url)

### `elevenlabs_get_audio_native_settings`

**Get Audio Native Settings.** Returns whether the Audio Native project is enabled, its current snapshot id and the player settings. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project_id returned by Create Audio Native Project. |

Output fields:

- `enabled`: Enabled (boolean)
- `snapshot_id`: Snapshot ID
- `settings`: Settings
- `settings.title`: Title
- `settings.image`: Image
- `settings.author`: Author
- `settings.small`: Small (boolean)
- `settings.text_color`: Text Color
- `settings.background_color`: Background Color
- `settings.sessionization`: Sessionization (number)
- `settings.audio_path`: Audio Path
- `settings.audio_url`: Audio URL
- `settings.status`: Status

### `elevenlabs_get_conversation_signed_url`

**Get Conversation Signed URL.** Returns a short-lived signed URL for connecting to a private agent over websocket. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents. |

Output fields:

- `signed_url`: Signed URL

### `elevenlabs_get_default_voice_settings`

**Get Default Voice Settings.** Returns the default voice settings (stability, similarity_boost, style, speed, use_speaker_boost) applied to voices that have no custom settings. Use as a reference before tuning a voice. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `stability`: Stability (number)
- `use_speaker_boost`: Use Speaker Boost (boolean)
- `similarity_boost`: Similarity Boost (number)
- `style`: Style (number)
- `speed`: Speed (number)

### `elevenlabs_get_dubbed_file`

**Get Dubbed File.** Downloads the finished dub for one language as a file. Only works once Get Dubbing reports status dubbed. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dubbingId` | string | yes |  | Dubbing ID. The dubbing_id returned by Create Dubbing or List Dubbings. |
| `languageCode` | string | yes |  | Language Code. Target language code, such as es. |

Output fields:

- `file`: File (url)
- `content_type`: Content Type

### `elevenlabs_get_dubbing_transcript_formatted`

**Get Dubbing Transcript Formatted.** Returns the transcript of a finished dub for one language in the requested format (srt, webvtt or json). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dubbingId` | string | yes |  | Dubbing ID. The dubbing_id returned by Create Dubbing or List Dubbings. |
| `languageCode` | string | yes |  | Language Code. Language code, such as es. |
| `formatType` | string | yes |  | Format Type. One of srt, webvtt or json. |

Output fields:

- `transcript_format`: Transcript Format
- `srt`: Srt

### `elevenlabs_get_dubbing_transcript`

**Get Dubbing Transcript.** Returns the transcript of a finished dub for one language, as structured utterances or as srt or webvtt text. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dubbingId` | string | yes |  | Dubbing ID. The dubbing_id returned by Create Dubbing or List Dubbings. |
| `languageCode` | string | yes |  | Language Code. Language code, such as es. |
| `formatType` | string | no |  | Format Type. One of `"srt"`, `"webvtt"`, `"json"`. |

Output fields:

- `language`: Language
- `utterances`: Utterances
- `utterances[].text`: Text
- `utterances[].speaker_id`: Speaker ID
- `utterances[].start_s`: Start S (number)
- `utterances[].end_s`: End S (number)
- `utterances[].words`: Words
- `utterances[].words[].text`: Text
- `utterances[].words[].word_type`: Word Type
- `utterances[].words[].start_s`: Start S (number)
- `utterances[].words[].end_s`: End S (number)
- `utterances[].words[].characters`: Characters
- `utterances[].words[].characters[].text`: Text
- `utterances[].words[].characters[].start_s`: Start S (number)
- `utterances[].words[].characters[].end_s`: End S (number)

### `elevenlabs_get_dubbing`

**Get Dubbing.** Returns a dubbing job with its status (dubbing, dubbed or failed), languages and any error. Poll this after Create Dubbing. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dubbingId` | string | yes |  | Dubbing ID. The dubbing_id returned by Create Dubbing or List Dubbings. |

Output fields:

- `dubbing_id`: Dubbing ID
- `name`: Name
- `status`: Status
- `source_language`: Source Language
- `target_languages`: Target Languages
- `editable`: Editable (boolean)
- `created_at`: Created At (datetime)
- `media_metadata`: Media Metadata
- `media_metadata.content_type`: Content Type
- `media_metadata.duration`: Duration (number)
- `error`: Error
- `model`: Model

### `elevenlabs_get_history_item_audio`

**Get History Item Audio.** Downloads the audio of one generated item and returns it as a file. The history_item_id comes from List History Items. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `historyItemId` | string | yes |  | History Item ID. The history_item_id from List History Items. |

Output fields:

- `file`: File (url)
- `content_type`: Content Type

### `elevenlabs_get_history_item`

**Get History Item.** Returns the metadata of one generated audio item: text, voice, model, character count, state and settings. The history_item_id comes from List History Items. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `historyItemId` | string | yes |  | History Item ID. The history_item_id from List History Items. |

Output fields:

- `history_item_id`: History Item ID
- `request_id`: Request ID
- `voice_id`: Voice ID
- `model_id`: Model ID
- `voice_name`: Voice Name
- `voice_category`: Voice Category
- `text`: Text
- `date_unix`: Date Unix (number)
- `character_count_change_from`: Character Count Change From (number)
- `character_count_change_to`: Character Count Change To (number)
- `content_type`: Content Type
- `state`: State
- `settings`: Settings
- `settings.style`: Style (number)
- `settings.use_speaker_boost`: Use Speaker Boost (boolean)
- `settings.stability`: Stability (number)
- `settings.speed`: Speed (number)
- `settings.similarity_boost`: Similarity Boost (number)
- `feedback`: Feedback
- `share_link_id`: Share Link ID
- `source`: Source
- `alignments`: Alignments
- `alignments.alignment`: Alignment
- `alignments.alignment.characters`: Characters
- `alignments.alignment.character_start_times_seconds`: Character Start Times Seconds
- `alignments.alignment.character_end_times_seconds`: Character End Times Seconds
- `alignments.normalized_alignment`: Normalized Alignment
- `alignments.normalized_alignment.characters`: Characters
- `alignments.normalized_alignment.character_start_times_seconds`: Character Start Times Seconds
- `alignments.normalized_alignment.character_end_times_seconds`: Character End Times Seconds
- `dialogue`: Dialogue
- `output_format`: Output Format
- `avatar_context`: Avatar Context

### `elevenlabs_get_kb_document_content`

**Get KB Document Content.** Returns the extracted text content of a knowledge base document. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |

### `elevenlabs_get_kb_document_rag_indexes`

**Get KB Document RAG Indexes.** Returns the RAG indexes of a knowledge base document with their model and build status. Poll this after Create KB RAG Index. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |

Output fields:

- `indexes`: Indexes
- `indexes[].id`: ID
- `indexes[].model`: Model
- `indexes[].status`: Status
- `indexes[].progress_percentage`: Progress Percentage (number)
- `indexes[].document_model_index_usage`: Document Model Index Usage
- `indexes[].document_model_index_usage.used_bytes`: Used Bytes (number)

### `elevenlabs_get_kb_document_source_url`

**Get KB Document Source URL.** Returns a signed URL to download the original file of an uploaded knowledge base document. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |

Output fields:

- `signed_url`: Signed URL (url)

### `elevenlabs_get_kb_document`

**Get KB Document.** Returns a knowledge base document with its type, metadata and folder path. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |

Output fields:

- `id`: ID
- `name`: Name
- `metadata`: Metadata
- `metadata.created_at_unix_secs`: Created At Unix Secs (number)
- `metadata.last_updated_at_unix_secs`: Last Updated At Unix Secs (number)
- `metadata.size_bytes`: Size Bytes (number)
- `supported_usages`: Supported Usages
- `access_info`: Access Info
- `access_info.is_creator`: Is Creator (boolean)
- `access_info.creator_name`: Creator Name
- `access_info.creator_email`: Creator Email (email)
- `access_info.role`: Role
- `access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `access_info.access_source`: Access Source
- `folder_parent_id`: Folder Parent ID
- `chunking_override`: Chunking Override
- `folder_path`: Folder Path
- `type`: Type
- `extracted_inner_html`: Extracted Inner HTML
- `content_format`: Content Format

### `elevenlabs_get_kb_rag_index_overview`

**Get KB RAG Index Overview.** Returns the total RAG index storage used and available, per embedding model. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `total_used_bytes`: Total Used Bytes (number)
- `total_max_bytes`: Total Max Bytes (number)
- `models`: Models

### `elevenlabs_get_kb_summaries`

**Get KB Summaries.** Returns the summary of one knowledge base document by id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. A document id from List KB Documents. |

Output fields:

- `status`: Status
- `data`: Data
- `data.id`: ID
- `data.name`: Name
- `data.metadata`: Metadata
- `data.metadata.created_at_unix_secs`: Created At Unix Secs (number)
- `data.metadata.last_updated_at_unix_secs`: Last Updated At Unix Secs (number)
- `data.metadata.size_bytes`: Size Bytes (number)
- `data.supported_usages`: Supported Usages
- `data.access_info`: Access Info
- `data.access_info.is_creator`: Is Creator (boolean)
- `data.access_info.creator_name`: Creator Name
- `data.access_info.creator_email`: Creator Email (email)
- `data.access_info.role`: Role
- `data.access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `data.access_info.access_source`: Access Source
- `data.folder_parent_id`: Folder Parent ID
- `data.chunking_override`: Chunking Override
- `data.folder_path`: Folder Path
- `data.dependent_agents`: Dependent Agents
- `data.type`: Type

### `elevenlabs_get_live_conversation_count`

**Get Live Conversation Count.** Returns how many conversations are live right now, optionally for one agent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | no |  | Agent ID. Only this agent. |

Output fields:

- `count`: Count (number)

### `elevenlabs_get_pronunciation_dictionary_version`

**Get Pronunciation Dictionary Version.** Downloads the PLS file with the rules of one pronunciation dictionary version as a file. The version_id comes from the dictionary actions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dictionaryId` | string | yes |  | Dictionary ID. The dictionary id from List Pronunciation Dictionaries. |
| `versionId` | string | yes |  | Version ID. The version_id of the dictionary. |

Output fields:

- `file`: File (url)
- `content_type`: Content Type

### `elevenlabs_get_pronunciation_dictionary`

**Get Pronunciation Dictionary.** Returns a pronunciation dictionary with its latest version_id and rules. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pronunciationDictionaryId` | string | yes |  | Pronunciation Dictionary ID. The id from Create Pronunciation Dictionary or List Pronunciation Dictionaries. |

Output fields:

- `id`: ID
- `latest_version_id`: Latest Version ID
- `latest_version_rules_num`: Latest Version Rules Num (number)
- `name`: Name
- `permission_on_resource`: Permission On Resource
- `created_by`: Created By
- `creation_time_unix`: Creation Time Unix (number)
- `archived_time_unix`: Archived Time Unix
- `description`: Description
- `rules`: Rules
- `rules[].string_to_replace`: String To Replace
- `rules[].case_sensitive`: Case Sensitive (boolean)
- `rules[].word_boundaries`: Word Boundaries (boolean)
- `rules[].type`: Type
- `rules[].alias`: Alias

### `elevenlabs_get_subscription`

**Get Subscription.** Returns the subscription tier and usage: characters used and remaining, voice slots, and the reset date. Use to check remaining credits before large generations. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `tier`: Tier
- `character_count`: Character Count (number)
- `character_limit`: Character Limit (number)
- `max_character_limit_extension`: Max Character Limit Extension (number)
- `max_credit_limit_extension`: Max Credit Limit Extension (number)
- `can_extend_character_limit`: Can Extend Character Limit (boolean)
- `allowed_to_extend_character_limit`: Allowed To Extend Character Limit (boolean)
- `next_character_count_reset_unix`: Next Character Count Reset Unix (number)
- `voice_slots_used`: Voice Slots Used (number)
- `professional_voice_slots_used`: Professional Voice Slots Used (number)
- `professional_voice_slots_used_in_workspace`: Professional Voice Slots Used In Workspace (number)
- `voice_limit`: Voice Limit (number)
- `max_voice_add_edits`: Max Voice Add Edits (number)
- `voice_add_edit_counter`: Voice Add Edit Counter (number)
- `professional_voice_limit`: Professional Voice Limit (number)
- `can_extend_voice_limit`: Can Extend Voice Limit (boolean)
- `can_use_instant_voice_cloning`: Can Use Instant Voice Cloning (boolean)
- `can_use_professional_voice_cloning`: Can Use Professional Voice Cloning (boolean)
- `currency`: Currency
- `current_overage`: Current Overage
- `current_overage.amount`: Amount
- `current_overage.currency`: Currency
- `status`: Status
- `billing_period`: Billing Period
- `character_refresh_period`: Character Refresh Period
- `next_invoice`: Next Invoice
- `open_invoices`: Open Invoices
- `has_open_invoices`: Has Open Invoices (boolean)
- `pending_change`: Pending Change
- `has_used_starter_coupon_on_account`: Has Used Starter Coupon On Account (boolean)
- `has_used_creator_coupon_on_account`: Has Used Creator Coupon On Account (boolean)

### `elevenlabs_get_test_invocation`

**Get Test Invocation.** Returns a test invocation with the result of each test run. Poll this after Run Agent Tests. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `testInvocationId` | string | yes |  | Test Invocation ID. The id from Run Agent Tests or List Test Invocations. |

Output fields:

- `id`: ID
- `agent_id`: Agent ID
- `branch_id`: Branch ID
- `version_id`: Version ID
- `ran_against_draft`: Ran Against Draft (boolean)
- `created_at`: Created At (number)
- `folder_id`: Folder ID
- `repeat_count`: Repeat Count (number)
- `bucketing_status`: Bucketing Status
- `result_groups`: Result Groups
- `test_runs`: Test Runs
- `test_runs[].test_run_id`: Test Run ID
- `test_runs[].test_info`: Test Info
- `test_runs[].test_info.from_conversation_metadata`: From Conversation Metadata
- `test_runs[].test_info.dynamic_variables`: Dynamic Variables
- `test_runs[].test_info.chat_history`: Chat History
- `test_runs[].test_info.chat_history[].role`: Role
- `test_runs[].test_info.chat_history[].agent_metadata`: Agent Metadata
- `test_runs[].test_info.chat_history[].message`: Message
- `test_runs[].test_info.chat_history[].multivoice_message`: Multivoice Message
- `test_runs[].test_info.chat_history[].tool_calls`: Tool Calls
- `test_runs[].test_info.chat_history[].tool_results`: Tool Results
- `test_runs[].test_info.chat_history[].feedback`: Feedback
- `test_runs[].test_info.chat_history[].llm_override`: Llm Override
- `test_runs[].test_info.chat_history[].producing_llm`: Producing Llm
- `test_runs[].test_info.chat_history[].time_in_call_secs`: Time In Call Secs (number)
- `test_runs[].test_info.chat_history[].conversation_turn_metrics`: Conversation Turn Metrics
- `test_runs[].test_info.chat_history[].rag_retrieval_info`: Rag Retrieval Info
- `test_runs[].test_info.chat_history[].llm_usage`: Llm Usage
- `test_runs[].test_info.chat_history[].interrupted`: Interrupted (boolean)
- `test_runs[].test_info.chat_history[].ignored_as_backchannel`: Ignored As Backchannel (boolean)
- `test_runs[].test_info.chat_history[].original_message`: Original Message
- `test_runs[].test_info.chat_history[].reasoning`: Reasoning
- `test_runs[].test_info.chat_history[].source_medium`: Source Medium
- `test_runs[].test_info.chat_history[].source_event_id`: Source Event ID
- `test_runs[].test_info.chat_history[].used_static_kb_document_ids`: Used Static Kb Document IDs
- `test_runs[].test_info.chat_history[].analysis`: Analysis
- `test_runs[].test_info.chat_history[].user_identifier`: User Identifier
- `test_runs[].test_info.chat_history[].id`: ID
- `test_runs[].test_info.chat_history[].compaction`: Compaction
- `test_runs[].test_info.chat_history[].triggered_guardrails`: Triggered Guardrails
- `test_runs[].test_info.conversation_initiation_source`: Conversation Initiation Source
- `test_runs[].test_info.environment`: Environment
- `test_runs[].test_info.type`: Type
- `test_runs[].test_info.success_condition`: Success Condition
- `test_runs[].test_info.success_examples`: Success Examples
- `test_runs[].test_info.success_examples[].response`: Response
- `test_runs[].test_info.success_examples[].type`: Type
- `test_runs[].test_info.failure_examples`: Failure Examples
- `test_runs[].test_info.failure_examples[].response`: Response
- `test_runs[].test_info.failure_examples[].type`: Type
- `test_runs[].test_invocation_id`: Test Invocation ID
- `test_runs[].agent_id`: Agent ID
- `test_runs[].branch_id`: Branch ID
- `test_runs[].version_id`: Version ID
- `test_runs[].ran_against_draft`: Ran Against Draft (boolean)
- `test_runs[].workflow_node_id`: Workflow Node ID
- `test_runs[].status`: Status
- `test_runs[].agent_responses`: Agent Responses
- `test_runs[].agent_responses[].role`: Role
- `test_runs[].agent_responses[].agent_metadata`: Agent Metadata
- `test_runs[].agent_responses[].message`: Message
- `test_runs[].agent_responses[].multivoice_message`: Multivoice Message
- `test_runs[].agent_responses[].tool_calls`: Tool Calls
- `test_runs[].agent_responses[].tool_results`: Tool Results
- `test_runs[].agent_responses[].feedback`: Feedback
- `test_runs[].agent_responses[].llm_override`: Llm Override
- `test_runs[].agent_responses[].producing_llm`: Producing Llm
- `test_runs[].agent_responses[].time_in_call_secs`: Time In Call Secs (number)
- `test_runs[].agent_responses[].conversation_turn_metrics`: Conversation Turn Metrics
- `test_runs[].agent_responses[].rag_retrieval_info`: Rag Retrieval Info
- `test_runs[].agent_responses[].llm_usage`: Llm Usage
- `test_runs[].agent_responses[].interrupted`: Interrupted (boolean)
- `test_runs[].agent_responses[].ignored_as_backchannel`: Ignored As Backchannel (boolean)
- `test_runs[].agent_responses[].original_message`: Original Message
- `test_runs[].agent_responses[].reasoning`: Reasoning
- `test_runs[].agent_responses[].source_medium`: Source Medium
- `test_runs[].agent_responses[].source_event_id`: Source Event ID (number)
- `test_runs[].agent_responses[].used_static_kb_document_ids`: Used Static Kb Document IDs
- `test_runs[].agent_responses[].analysis`: Analysis
- `test_runs[].agent_responses[].user_identifier`: User Identifier
- `test_runs[].agent_responses[].id`: ID
- `test_runs[].agent_responses[].compaction`: Compaction
- `test_runs[].agent_responses[].triggered_guardrails`: Triggered Guardrails
- `test_runs[].test_id`: Test ID
- `test_runs[].test_name`: Test Name
- `test_runs[].condition_result`: Condition Result
- `test_runs[].condition_result.result`: Result
- `test_runs[].condition_result.rationale`: Rationale
- `test_runs[].condition_result.rationale.messages`: Messages
- `test_runs[].condition_result.rationale.summary`: Summary
- `test_runs[].last_updated_at_unix`: Last Updated At Unix (number)
- `test_runs[].metadata`: Metadata
- `test_runs[].metadata.workspace_id`: Workspace ID
- `test_runs[].metadata.test_name`: Test Name
- `test_runs[].metadata.ran_by_user_email`: Ran By User Email (email)
- `test_runs[].metadata.test_type`: Test Type
- `test_runs[].root_folder_id`: Root Folder ID
- `test_runs[].root_folder_name`: Root Folder Name
- `test_runs[].environment`: Environment
- `test_runs[].credits_used`: Credits Used (number)
- `test_runs[].charging`: Charging
- `test_runs[].charging.dev_discount`: Dev Discount (boolean)
- `test_runs[].charging.is_burst`: Is Burst (boolean)
- `test_runs[].charging.tier`: Tier
- `test_runs[].charging.llm_usage`: Llm Usage
- `test_runs[].charging.llm_usage.irreversible_generation`: Irreversible Generation
- `test_runs[].charging.llm_usage.irreversible_generation.model_usage`: Model Usage
- `test_runs[].charging.llm_usage.irreversible_generation.detailed_model_usage`: Detailed Model Usage
- `test_runs[].charging.llm_usage.initiated_generation`: Initiated Generation
- `test_runs[].charging.llm_usage.initiated_generation.model_usage`: Model Usage
- `test_runs[].charging.llm_usage.initiated_generation.detailed_model_usage`: Detailed Model Usage
- `test_runs[].charging.llm_price`: Llm Price (number)
- `test_runs[].charging.llm_charge`: Llm Charge (number)
- `test_runs[].charging.call_charge`: Call Charge (number)
- `test_runs[].charging.platform_charge`: Platform Charge (number)
- `test_runs[].charging.platform_usage`: Platform Usage
- `test_runs[].charging.platform_usage.category_usage`: Category Usage
- `test_runs[].charging.platform_usage.category_usage.text_message`: Text Message
- `test_runs[].charging.platform_price`: Platform Price (number)
- `test_runs[].charging.free_minutes_consumed`: Free Minutes Consumed (number)
- `test_runs[].charging.free_llm_dollars_consumed`: Free Llm Dollars Consumed (number)
- `test_runs[].charging.tts_usage`: Tts Usage
- `test_runs[].charging.asr_usage`: Asr Usage
- `test_runs[].charging.analysis`: Analysis

### `elevenlabs_get_tool`

**Get Tool.** Returns one tool with its configuration and usage stats. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toolId` | string | yes |  | Tool ID. The tool id from List Tools or Create Tool. |

Output fields:

- `id`: ID
- `tool_config`: Tool Config
- `tool_config.type`: Type
- `tool_config.name`: Name
- `tool_config.description`: Description
- `tool_config.response_timeout_secs`: Response Timeout Secs (number)
- `tool_config.disable_interruptions`: Disable Interruptions (boolean)
- `tool_config.interruption_mode`: Interruption Mode
- `tool_config.force_pre_tool_speech`: Force Pre Tool Speech (boolean)
- `tool_config.pre_tool_speech`: Pre Tool Speech
- `tool_config.assignments`: Assignments
- `tool_config.tool_call_sound`: Tool Call Sound
- `tool_config.tool_call_sound_behavior`: Tool Call Sound Behavior
- `tool_config.tool_error_handling_mode`: Tool Error Handling Mode
- `tool_config.dynamic_variables`: Dynamic Variables
- `tool_config.dynamic_variables.dynamic_variable_placeholders`: Dynamic Variable Placeholders
- `tool_config.execution_mode`: Execution Mode
- `tool_config.api_schema`: API Schema
- `tool_config.api_schema.request_headers`: Request Headers
- `tool_config.api_schema.kind`: Kind
- `tool_config.api_schema.url`: URL (url)
- `tool_config.api_schema.method`: Method
- `tool_config.api_schema.path_params_schema`: Path Params Schema
- `tool_config.api_schema.query_params_schema`: Query Params Schema
- `tool_config.api_schema.request_body_schema`: Request Body Schema
- `tool_config.api_schema.request_body_schema.description`: Description
- `tool_config.api_schema.request_body_schema.dynamic_variable`: Dynamic Variable
- `tool_config.api_schema.request_body_schema.is_omitted`: Is Omitted (boolean)
- `tool_config.api_schema.request_body_schema.type`: Type
- `tool_config.api_schema.request_body_schema.required`: Required
- `tool_config.api_schema.request_body_schema.properties`: Properties
- `tool_config.api_schema.request_body_schema.properties.q`: Q
- `tool_config.api_schema.response_body_schema`: Response Body Schema
- `tool_config.api_schema.response_filter`: Response Filter
- `tool_config.api_schema.content_type`: Content Type
- `tool_config.api_schema.auth_resolved_params`: Auth Resolved Params
- `tool_config.api_schema.auth_connection`: Auth Connection
- `tool_config.api_schema.mtls_auth_connection`: Mtls Auth Connection
- `tool_config.follow_redirects`: Follow Redirects (boolean)
- `tool_config.follow_redirects_allowed_domains`: Follow Redirects Allowed Domains
- `access_info`: Access Info
- `access_info.is_creator`: Is Creator (boolean)
- `access_info.creator_name`: Creator Name
- `access_info.creator_email`: Creator Email (email)
- `access_info.role`: Role
- `access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `access_info.access_source`: Access Source
- `usage_stats`: Usage Stats
- `usage_stats.total_calls`: Total Calls (number)
- `usage_stats.avg_latency_secs`: Avg Latency Secs (number)
- `response_mocks`: Response Mocks

### `elevenlabs_get_user`

**Get User.** Returns the user behind the API key: user id, name, API key preview and subscription summary. Use to check which account a connection belongs to. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `user_id`: User ID
- `subscription`: Subscription
- `subscription.tier`: Tier
- `subscription.character_count`: Character Count (number)
- `subscription.character_limit`: Character Limit (number)
- `subscription.max_character_limit_extension`: Max Character Limit Extension (number)
- `subscription.max_credit_limit_extension`: Max Credit Limit Extension (number)
- `subscription.can_extend_character_limit`: Can Extend Character Limit (boolean)
- `subscription.allowed_to_extend_character_limit`: Allowed To Extend Character Limit (boolean)
- `subscription.next_character_count_reset_unix`: Next Character Count Reset Unix (number)
- `subscription.voice_slots_used`: Voice Slots Used (number)
- `subscription.professional_voice_slots_used`: Professional Voice Slots Used (number)
- `subscription.professional_voice_slots_used_in_workspace`: Professional Voice Slots Used In Workspace (number)
- `subscription.voice_limit`: Voice Limit (number)
- `subscription.max_voice_add_edits`: Max Voice Add Edits (number)
- `subscription.voice_add_edit_counter`: Voice Add Edit Counter (number)
- `subscription.professional_voice_limit`: Professional Voice Limit (number)
- `subscription.can_extend_voice_limit`: Can Extend Voice Limit (boolean)
- `subscription.can_use_instant_voice_cloning`: Can Use Instant Voice Cloning (boolean)
- `subscription.can_use_professional_voice_cloning`: Can Use Professional Voice Cloning (boolean)
- `subscription.currency`: Currency
- `subscription.current_overage`: Current Overage
- `subscription.current_overage.amount`: Amount
- `subscription.current_overage.currency`: Currency
- `subscription.status`: Status
- `subscription.billing_period`: Billing Period
- `subscription.character_refresh_period`: Character Refresh Period
- `subscription_extras`: Subscription Extras
- `is_new_user`: Is New User (boolean)
- `can_use_delayed_payment_methods`: Can Use Delayed Payment Methods (boolean)
- `is_onboarding_completed`: Is Onboarding Completed (boolean)
- `is_onboarding_checklist_completed`: Is Onboarding Checklist Completed (boolean)
- `show_compliance_terms`: Show Compliance Terms (boolean)
- `first_name`: First Name
- `is_api_key_hashed`: Is API Key Hashed (boolean)
- `xi_api_key_preview`: Xi API Key Preview
- `referral_link_code`: Referral Link Code
- `partnerstack_partner_default_link`: Partnerstack Partner Default Link
- `created_at`: Created At (number)
- `seat_type`: Seat Type

### `elevenlabs_get_voice_settings`

**Get Voice Settings.** Returns the current text-to-speech settings of a voice: stability, similarity_boost, style, speed and use_speaker_boost. Use before Edit Voice Settings to see what will change. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `voiceId` | string | yes |  | Voice ID. The voice_id from List Voices. |

Output fields:

- `stability`: Stability (number)
- `use_speaker_boost`: Use Speaker Boost (boolean)
- `similarity_boost`: Similarity Boost (number)
- `style`: Style (number)
- `speed`: Speed (number)

### `elevenlabs_get_voice`

**Get Voice.** Fetches one voice by voice_id, including its name, category, labels, samples, settings and preview URL. Use after List Voices to inspect a voice before using or editing it. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `voiceId` | string | yes |  | Voice ID. The voice_id from List Voices. |

Output fields:

- `voice_id`: Voice ID
- `name`: Name
- `samples`: Samples
- `category`: Category
- `fine_tuning`: Fine Tuning
- `fine_tuning.is_allowed_to_fine_tune`: Is Allowed To Fine Tune (boolean)
- `fine_tuning.state`: State
- `fine_tuning.state.eleven_multilingual_v2`: Eleven Multilingual V2
- `fine_tuning.state.eleven_v2_5_flash`: Eleven V2 5 Flash
- `fine_tuning.state.eleven_turbo_v2`: Eleven Turbo V2
- `fine_tuning.state.eleven_v2_flash`: Eleven V2 Flash
- `fine_tuning.state.eleven_flash_v2_5`: Eleven Flash V2 5
- `fine_tuning.state.eleven_turbo_v2_5`: Eleven Turbo V2 5
- `fine_tuning.state.eleven_flash_v2`: Eleven Flash V2
- `fine_tuning.verification_failures`: Verification Failures
- `fine_tuning.verification_attempts_count`: Verification Attempts Count (number)
- `fine_tuning.manual_verification_requested`: Manual Verification Requested (boolean)
- `fine_tuning.language`: Language
- `fine_tuning.progress`: Progress
- `fine_tuning.message`: Message
- `fine_tuning.message.eleven_multilingual_v2`: Eleven Multilingual V2
- `fine_tuning.message.eleven_v2_5_flash`: Eleven V2 5 Flash
- `fine_tuning.message.eleven_turbo_v2`: Eleven Turbo V2
- `fine_tuning.message.eleven_v2_flash`: Eleven V2 Flash
- `fine_tuning.message.eleven_flash_v2_5`: Eleven Flash V2 5
- `fine_tuning.message.eleven_turbo_v2_5`: Eleven Turbo V2 5
- `fine_tuning.message.eleven_flash_v2`: Eleven Flash V2
- `fine_tuning.dataset_duration_seconds`: Dataset Duration Seconds
- `fine_tuning.verification_attempts`: Verification Attempts
- `fine_tuning.slice_ids`: Slice IDs
- `fine_tuning.manual_verification`: Manual Verification
- `fine_tuning.max_verification_attempts`: Max Verification Attempts (number)
- `fine_tuning.next_max_verification_attempts_reset_unix_ms`: Next Max Verification Attempts Reset Unix Ms (number)
- `labels`: Labels
- `labels.use_case`: Use Case
- `labels.descriptive`: Descriptive
- `labels.language`: Language
- `labels.accent`: Accent
- `labels.age`: Age
- `labels.gender`: Gender
- `description`: Description
- `preview_url`: Preview URL (url)
- `available_for_tiers`: Available For Tiers
- `settings`: Settings
- `settings.stability`: Stability (number)
- `settings.use_speaker_boost`: Use Speaker Boost (boolean)
- `settings.similarity_boost`: Similarity Boost (number)
- `settings.style`: Style (number)
- `settings.speed`: Speed (number)
- `sharing`: Sharing
- `high_quality_base_model_ids`: High Quality Base Model IDs
- `verified_languages`: Verified Languages
- `verified_languages[].language`: Language
- `verified_languages[].model_id`: Model ID
- `verified_languages[].accent`: Accent
- `verified_languages[].locale`: Locale
- `verified_languages[].preview_url`: Preview URL (url)
- `collection_ids`: Collection IDs
- `safety_control`: Safety Control
- `voice_verification`: Voice Verification
- `voice_verification.requires_verification`: Requires Verification (boolean)
- `voice_verification.is_verified`: Is Verified (boolean)
- `voice_verification.verification_failures`: Verification Failures
- `voice_verification.verification_attempts_count`: Verification Attempts Count (number)
- `voice_verification.language`: Language
- `voice_verification.verification_attempts`: Verification Attempts
- `permission_on_resource`: Permission On Resource
- `is_owner`: Is Owner
- `is_legacy`: Is Legacy (boolean)
- `is_mixed`: Is Mixed (boolean)
- `favorited_at_unix`: Favorited At Unix
- `created_at_unix`: Created At Unix (number)
- `is_bookmarked`: Is Bookmarked
- `recording_quality`: Recording Quality
- `labelling_status`: Labelling Status
- `recording_quality_reason`: Recording Quality Reason
- `orb_thumbnail_signed_urls`: Orb Thumbnail Signed Urls

### `elevenlabs_isolate_audio`

**Isolate Audio.** Removes background noise and music from an audio file, keeping the speech, and returns the cleaned audio as a file. Use to clean a recording before cloning a voice or transcribing it. Not idempotent: each call consumes credits. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audio` | file | yes |  | Audio. Recording to clean. Files are not supported; an action that needs one fails. |

Output fields:

- `file`: File (url)
- `content_type`: Content Type

### `elevenlabs_list_agent_tests`

**List Agent Tests.** Lists agent tests with their ids and names. Search by name and page with next_cursor. Use to find test ids for Run Agent Tests. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text matched against the test name. |
| `pageSize` | number | no |  | Page Size. Between 1 and 100. |
| `cursor` | string | no |  | Cursor. next_cursor from a previous call. |

Output fields:

- `tests`: Tests
- `tests[].id`: ID
- `tests[].name`: Name
- `tests[].access_info`: Access Info
- `tests[].access_info.is_creator`: Is Creator (boolean)
- `tests[].access_info.creator_name`: Creator Name
- `tests[].access_info.creator_email`: Creator Email (email)
- `tests[].access_info.role`: Role
- `tests[].access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `tests[].access_info.access_source`: Access Source
- `tests[].created_at_unix_secs`: Created At Unix Secs (number)
- `tests[].last_updated_at_unix_secs`: Last Updated At Unix Secs (number)
- `tests[].type`: Type
- `tests[].entity_type`: Entity Type
- `tests[].folder_parent_id`: Folder Parent ID
- `tests[].folder_path`: Folder Path
- `tests[].children_count`: Children Count
- `tests[].conversation_initiation_source`: Conversation Initiation Source
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_agents`

**List Agents.** Lists agents with their ids and names. Search by name and page with next_cursor. Use to find an agent_id. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text matched against the agent name. |
| `pageSize` | number | no |  | Page Size. Between 1 and 100. |
| `cursor` | string | no |  | Cursor. next_cursor from a previous call. |
| `archived` | string | no |  | Archived. Only archived agents. One of `true`, `false`. |
| `sortDirection` | string | no |  | Sort Direction. One of `"asc"`, `"desc"`. |

Output fields:

- `agents`: Agents
- `agents[].agent_id`: Agent ID
- `agents[].name`: Name
- `agents[].voice_id`: Voice ID
- `agents[].tags`: Tags
- `agents[].created_at_unix_secs`: Created At Unix Secs (number)
- `agents[].access_info`: Access Info
- `agents[].access_info.is_creator`: Is Creator (boolean)
- `agents[].access_info.creator_name`: Creator Name
- `agents[].access_info.creator_email`: Creator Email (email)
- `agents[].access_info.role`: Role
- `agents[].access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `agents[].access_info.access_source`: Access Source
- `agents[].last_call_time_unix_secs`: Last Call Time Unix Secs
- `agents[].archived`: Archived (boolean)
- `agents[].last_7_day_call_count`: Last 7 Day Call Count (number)
- `agents[].trust_context`: Trust Context
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_batch_calls`

**List Batch Calls.** Lists batch calls in the workspace with status and progress counts. Page with next_doc. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Between 1 and 100. |
| `lastDoc` | string | no |  | Last Doc. next_doc from a previous call. |
| `agentId` | string | no |  | Agent ID. Only this agent. |

Output fields:

- `batch_calls`: Batch Calls
- `next_doc`: Next Doc
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_conversations`

**List Conversations.** Lists conversations with their ids, agent, duration and success status. Filter by agent, outcome or start time and page with next_cursor. Use to find a conversation_id. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | no |  | Agent ID. Only this agent. |
| `cursor` | string | no |  | Cursor. next_cursor from a previous call. |
| `callSuccessful` | string | no |  | Call Successful. One of `"success"`, `"failure"`, `"unknown"`. |
| `callStartAfterUnix` | number | no |  | Call Start After Unix. Unix time lower bound. |
| `callStartBeforeUnix` | number | no |  | Call Start Before Unix. Unix time upper bound. |
| `userId` | string | no |  | User ID. |

Output fields:

- `conversations`: Conversations
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_dubbings`

**List Dubbings.** Lists dubbing projects with their ids, names and status. Filter by status and page with next_cursor. Use to find a dubbing_id. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cursor` | string | no |  | Cursor. next_cursor from a previous call. |
| `pageSize` | number | no |  | Page Size. Between 1 and 200. |
| `dubbingStatus` | string | no |  | Dubbing Status. One of `"dubbing"`, `"dubbed"`, `"failed"`. |
| `orderBy` | string | no |  | Order By. One of `"created_at"`, `"name"`. |
| `orderDirection` | string | no |  | Order Direction. One of `"DESCENDING"`, `"ASCENDING"`. |

Output fields:

- `dubs`: Dubs
- `dubs[].dubbing_id`: Dubbing ID
- `dubs[].name`: Name
- `dubs[].status`: Status
- `dubs[].source_language`: Source Language
- `dubs[].target_languages`: Target Languages
- `dubs[].editable`: Editable (boolean)
- `dubs[].created_at`: Created At (datetime)
- `dubs[].media_metadata`: Media Metadata
- `dubs[].error`: Error
- `dubs[].model`: Model
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_history_items`

**List History Items.** Lists generated audio (text-to-speech, speech-to-speech) from the account history with the text, voice and model used. Filter by voice, model, source or search text and page with last_history_item_id. Use to find a history_item_id for Get History Item Audio. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageSize` | number | no |  | Page Size. Between 1 and 1000. Defaults to 100. |
| `startAfterHistoryItemId` | string | no |  | Start After History Item ID. last_history_item_id from a previous call to get the next page. |
| `voiceId` | string | no |  | Voice ID. Only items generated with this voice. |
| `modelId` | string | no |  | Model ID. Only items generated with this model. |
| `search` | string | no |  | Search. Text matched against the generated text. |
| `source` | string | no |  | Source. One of `"TTS"`, `"STS"`, `"Flows"`. |
| `sortDirection` | string | no |  | Sort Direction. One of `"asc"`, `"desc"`. |

Output fields:

- `history`: History
- `history[].history_item_id`: History Item ID
- `history[].request_id`: Request ID
- `history[].voice_id`: Voice ID
- `history[].model_id`: Model ID
- `history[].voice_name`: Voice Name
- `history[].voice_category`: Voice Category
- `history[].text`: Text
- `history[].date_unix`: Date Unix (number)
- `history[].character_count_change_from`: Character Count Change From (number)
- `history[].character_count_change_to`: Character Count Change To (number)
- `history[].content_type`: Content Type
- `history[].state`: State
- `history[].settings`: Settings
- `history[].settings.similarity_boost`: Similarity Boost (number)
- `history[].settings.stability`: Stability (number)
- `history[].settings.speed`: Speed (number)
- `history[].settings.use_speaker_boost`: Use Speaker Boost (boolean)
- `history[].settings.style`: Style (number)
- `history[].feedback`: Feedback
- `history[].share_link_id`: Share Link ID
- `history[].source`: Source
- `history[].alignments`: Alignments
- `history[].dialogue`: Dialogue
- `history[].output_format`: Output Format
- `history[].avatar_context`: Avatar Context
- `last_history_item_id`: Last History Item ID
- `has_more`: Has More (boolean)
- `scanned_until`: Scanned Until
- `count`: Count (number)

### `elevenlabs_list_kb_dependent_agents`

**List KB Dependent Agents.** Lists the agents that use a knowledge base document. Check this before deleting a document. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |
| `dependentType` | string | no |  | Dependent Type. One of `"direct"`, `"transitive"`, `"all"`. |
| `pageSize` | number | no |  | Page Size. |
| `cursor` | string | no |  | Cursor. |

Output fields:

- `agents`: Agents
- `branches`: Branches
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_kb_documents`

**List KB Documents.** Lists knowledge base documents and folders with their ids, names and types. Search by name and page with next_cursor. Use to find a documentation_id. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text matched against the document name. |
| `pageSize` | number | no |  | Page Size. Between 1 and 100. |
| `cursor` | string | no |  | Cursor. next_cursor from a previous call. |
| `parentFolderId` | string | no |  | Parent Folder ID. Only items in this folder. |

Output fields:

- `documents`: Documents
- `documents[].id`: ID
- `documents[].name`: Name
- `documents[].metadata`: Metadata
- `documents[].metadata.created_at_unix_secs`: Created At Unix Secs (number)
- `documents[].metadata.last_updated_at_unix_secs`: Last Updated At Unix Secs (number)
- `documents[].metadata.size_bytes`: Size Bytes (number)
- `documents[].supported_usages`: Supported Usages
- `documents[].access_info`: Access Info
- `documents[].access_info.is_creator`: Is Creator (boolean)
- `documents[].access_info.creator_name`: Creator Name
- `documents[].access_info.creator_email`: Creator Email (email)
- `documents[].access_info.role`: Role
- `documents[].access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `documents[].access_info.access_source`: Access Source
- `documents[].folder_parent_id`: Folder Parent ID
- `documents[].chunking_override`: Chunking Override
- `documents[].folder_path`: Folder Path
- `documents[].dependent_agents`: Dependent Agents
- `documents[].type`: Type
- `documents[].children_count`: Children Count (number)
- `documents[].document_count`: Document Count (number)
- `documents[].auto_sync_info`: Auto Sync Info
- `documents[].external_sync_info`: External Sync Info
- `documents[].is_frozen`: Is Frozen (boolean)
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_models`

**List Models.** Lists every model with its id, supported languages, character limits and capabilities such as text-to-speech or voice conversion. Use to find the model_id that other actions need. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Items
- `items[].model_id`: Model ID
- `items[].name`: Name
- `items[].can_be_finetuned`: Can Be Finetuned (boolean)
- `items[].can_do_text_to_speech`: Can Do Text To Speech (boolean)
- `items[].can_do_voice_conversion`: Can Do Voice Conversion (boolean)
- `items[].can_use_style`: Can Use Style (boolean)
- `items[].can_use_speaker_boost`: Can Use Speaker Boost (boolean)
- `items[].serves_pro_voices`: Serves Pro Voices (boolean)
- `items[].token_cost_factor`: Token Cost Factor (number)
- `items[].description`: Description
- `items[].requires_alpha_access`: Requires Alpha Access (boolean)
- `items[].max_characters_request_free_user`: Max Characters Request Free User (number)
- `items[].max_characters_request_subscribed_user`: Max Characters Request Subscribed User (number)
- `items[].maximum_text_length_per_request`: Maximum Text Length Per Request (number)
- `items[].languages`: Languages
- `items[].languages[].language_id`: Language ID
- `items[].languages[].name`: Name
- `items[].model_rates`: Model Rates
- `items[].model_rates.character_cost_multiplier`: Character Cost Multiplier (number)
- `items[].model_rates.cost_discount_multiplier`: Cost Discount Multiplier (number)
- `items[].concurrency_group`: Concurrency Group
- `count`: Count (number)

### `elevenlabs_list_phone_numbers`

**List Phone Numbers.** Lists imported phone numbers with the agent each is assigned to. The phone_number_id feeds Make Outbound Call and Submit Batch Call. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | no |  | Agent ID. Only numbers assigned to this agent. |

Output fields:

- `items`: Items
- `count`: Count (number)

### `elevenlabs_list_pronunciation_dictionaries`

**List Pronunciation Dictionaries.** Lists pronunciation dictionaries with their ids and latest version ids. Page with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cursor` | string | no |  | Cursor. next_cursor from a previous call. |
| `pageSize` | number | no |  | Page Size. Between 1 and 100. |
| `sort` | string | no |  | Sort. One of `"creation_time_unix"`, `"name"`. |
| `includeArchived` | string | no |  | Include Archived. Include archived dictionaries. One of `true`, `false`. |

Output fields:

- `pronunciation_dictionaries`: Pronunciation Dictionaries
- `pronunciation_dictionaries[].id`: ID
- `pronunciation_dictionaries[].latest_version_id`: Latest Version ID
- `pronunciation_dictionaries[].latest_version_rules_num`: Latest Version Rules Num (number)
- `pronunciation_dictionaries[].name`: Name
- `pronunciation_dictionaries[].permission_on_resource`: Permission On Resource
- `pronunciation_dictionaries[].created_by`: Created By
- `pronunciation_dictionaries[].creation_time_unix`: Creation Time Unix (number)
- `pronunciation_dictionaries[].archived_time_unix`: Archived Time Unix
- `pronunciation_dictionaries[].description`: Description
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_secrets`

**List Secrets.** Lists workspace secrets with their ids and names. Values are never returned. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. |
| `pageSize` | number | no |  | Page Size. |
| `cursor` | string | no |  | Cursor. |

Output fields:

- `secrets`: Secrets
- `secrets[].type`: Type
- `secrets[].secret_id`: Secret ID
- `secrets[].name`: Name
- `secrets[].used_by`: Used By
- `secrets[].used_by.tools`: Tools
- `secrets[].used_by.tools_has_more`: Tools Has More (boolean)
- `secrets[].used_by.agents`: Agents
- `secrets[].used_by.agents_has_more`: Agents Has More (boolean)
- `secrets[].used_by.phone_numbers`: Phone Numbers
- `secrets[].used_by.phone_numbers_has_more`: Phone Numbers Has More (boolean)
- `secrets[].used_by.mcp_servers`: Mcp Servers
- `secrets[].used_by.others`: Others
- `next_cursor`: Next Cursor
- `count`: Count (number)

### `elevenlabs_list_shared_voices`

**List Shared Voices.** Searches the public voice library by text, gender, age, accent, language or category. Returns each voice with its public_owner_id and voice_id, which Add Shared Voice needs to copy it into the account. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. |
| `category` | string | no |  | Category. One of `"professional"`, `"famous"`, `"high_quality"`. |
| `gender` | string | no |  | Gender. For example male or female. |
| `age` | string | no |  | Age. For example young, middle_aged or old. |
| `accent` | string | no |  | Accent. |
| `language` | string | no |  | Language. Language code such as en or es. |
| `pageSize` | number | no |  | Page Size. Up to 100. Defaults to 30. |
| `page` | number | no |  | Page. Zero-based page number. |

Output fields:

- `voices`: Voices
- `voices[].public_owner_id`: Public Owner ID
- `voices[].voice_id`: Voice ID
- `voices[].date_unix`: Date Unix (number)
- `voices[].name`: Name
- `voices[].accent`: Accent
- `voices[].gender`: Gender
- `voices[].age`: Age
- `voices[].descriptive`: Descriptive
- `voices[].use_case`: Use Case
- `voices[].category`: Category
- `voices[].language`: Language
- `voices[].locale`: Locale
- `voices[].description`: Description
- `voices[].preview_url`: Preview URL (url)
- `voices[].usage_character_count_1y`: Usage Character Count 1y (number)
- `voices[].usage_character_count_7d`: Usage Character Count 7d (number)
- `voices[].play_api_usage_character_count_1y`: Play API Usage Character Count 1y (number)
- `voices[].cloned_by_count`: Cloned By Count (number)
- `voices[].rate`: Rate (number)
- `voices[].fiat_rate`: Fiat Rate
- `voices[].free_users_allowed`: Free Users Allowed (boolean)
- `voices[].live_moderation_enabled`: Live Moderation Enabled (boolean)
- `voices[].featured`: Featured (boolean)
- `voices[].verified_languages`: Verified Languages
- `voices[].verified_languages[].language`: Language
- `voices[].verified_languages[].model_id`: Model ID
- `voices[].verified_languages[].accent`: Accent
- `voices[].verified_languages[].locale`: Locale
- `voices[].verified_languages[].preview_url`: Preview URL (url)
- `voices[].notice_period`: Notice Period (number)
- `voices[].instagram_username`: Instagram Username
- `voices[].twitter_username`: Twitter Username
- `voices[].youtube_username`: Youtube Username
- `voices[].tiktok_username`: Tiktok Username
- `voices[].image_url`: Image URL
- `voices[].is_added_by_user`: Is Added By User (boolean)
- `voices[].is_bookmarked`: Is Bookmarked
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `total_count`: Total Count (number)

### `elevenlabs_list_test_invocations`

**List Test Invocations.** Lists past test runs, optionally for one agent. Page with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | no |  | Agent ID. Only runs for this agent. |
| `pageSize` | number | no |  | Page Size. Between 1 and 100. |
| `cursor` | string | no |  | Cursor. next_cursor from a previous call. |

Output fields:

- `meta`: Meta
- `meta.total`: Total
- `meta.page`: Page
- `meta.page_size`: Page Size
- `results`: Results
- `results[].id`: ID
- `results[].agent_id`: Agent ID
- `results[].branch_id`: Branch ID
- `results[].version_id`: Version ID
- `results[].ran_against_draft`: Ran Against Draft (boolean)
- `results[].runs_diverged_from_version`: Runs Diverged From Version (boolean)
- `results[].created_at_unix_secs`: Created At Unix Secs (number)
- `results[].test_run_count`: Test Run Count (number)
- `results[].passed_count`: Passed Count (number)
- `results[].failed_count`: Failed Count (number)
- `results[].pending_count`: Pending Count (number)
- `results[].title`: Title
- `results[].access_info`: Access Info
- `results[].access_info.is_creator`: Is Creator (boolean)
- `results[].access_info.creator_name`: Creator Name
- `results[].access_info.creator_email`: Creator Email (email)
- `results[].access_info.role`: Role
- `results[].access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `results[].access_info.access_source`: Access Source
- `results[].repeat_count`: Repeat Count (number)
- `results[].credits_used`: Credits Used (number)
- `results[].total_price`: Total Price (number)
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_tool_dependent_agents`

**List Tool Dependent Agents.** Lists the agents that use a tool. Check this before deleting a tool. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toolId` | string | yes |  | Tool ID. The tool id from List Tools or Create Tool. |
| `cursor` | string | no |  | Cursor. |
| `pageSize` | number | no |  | Page Size. |

Output fields:

- `agents`: Agents
- `branches`: Branches
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_tools`

**List Tools.** Lists workspace agent tools with their ids and configuration. Search by name and page with next_cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text matched against the tool name. |
| `pageSize` | number | no |  | Page Size. |
| `cursor` | string | no |  | Cursor. next_cursor from a previous call. |

Output fields:

- `tools`: Tools
- `next_cursor`: Next Cursor
- `has_more`: Has More (boolean)
- `count`: Count (number)

### `elevenlabs_list_voices`

**List Voices.** Lists or searches the voices in the account (premade, cloned, generated and library voices), returning ids, names, categories and labels. Use to find the voice_id needed by text-to-speech, edit, or delete actions. Supports paging through next_page_token. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text matched against voice name, description and labels. |
| `category` | string | no |  | Category. One of `"premade"`, `"cloned"`, `"generated"`, `"professional"`. |
| `voiceType` | string | no |  | Voice Type. One of `"personal"`, `"community"`, `"default"`, `"workspace"`, `"non-default"`, `"saved"`. |
| `pageSize` | number | no |  | Page Size. Between 1 and 100. Defaults to 10. |
| `nextPageToken` | string | no |  | Next Page Token. next_page_token from a previous call. |

Output fields:

- `voices`: Voices
- `voices[].voice_id`: Voice ID
- `voices[].name`: Name
- `voices[].samples`: Samples
- `voices[].category`: Category
- `voices[].fine_tuning`: Fine Tuning
- `voices[].fine_tuning.is_allowed_to_fine_tune`: Is Allowed To Fine Tune (boolean)
- `voices[].fine_tuning.state`: State
- `voices[].fine_tuning.state.eleven_multilingual_v2`: Eleven Multilingual V2
- `voices[].fine_tuning.state.eleven_v2_5_flash`: Eleven V2 5 Flash
- `voices[].fine_tuning.state.eleven_turbo_v2`: Eleven Turbo V2
- `voices[].fine_tuning.state.eleven_v2_flash`: Eleven V2 Flash
- `voices[].fine_tuning.state.eleven_flash_v2_5`: Eleven Flash V2 5
- `voices[].fine_tuning.state.eleven_turbo_v2_5`: Eleven Turbo V2 5
- `voices[].fine_tuning.state.eleven_flash_v2`: Eleven Flash V2
- `voices[].fine_tuning.verification_failures`: Verification Failures
- `voices[].fine_tuning.verification_attempts_count`: Verification Attempts Count (number)
- `voices[].fine_tuning.manual_verification_requested`: Manual Verification Requested (boolean)
- `voices[].fine_tuning.language`: Language
- `voices[].fine_tuning.progress`: Progress
- `voices[].fine_tuning.progress.eleven_v2_5_flash`: Eleven V2 5 Flash (number)
- `voices[].fine_tuning.progress.eleven_v2_flash`: Eleven V2 Flash (number)
- `voices[].fine_tuning.progress.eleven_flash_v2_5`: Eleven Flash V2 5 (number)
- `voices[].fine_tuning.progress.eleven_flash_v2`: Eleven Flash V2 (number)
- `voices[].fine_tuning.message`: Message
- `voices[].fine_tuning.message.eleven_multilingual_v2`: Eleven Multilingual V2
- `voices[].fine_tuning.message.eleven_v2_5_flash`: Eleven V2 5 Flash
- `voices[].fine_tuning.message.eleven_turbo_v2`: Eleven Turbo V2
- `voices[].fine_tuning.message.eleven_v2_flash`: Eleven V2 Flash
- `voices[].fine_tuning.message.eleven_flash_v2_5`: Eleven Flash V2 5
- `voices[].fine_tuning.message.eleven_turbo_v2_5`: Eleven Turbo V2 5
- `voices[].fine_tuning.message.eleven_flash_v2`: Eleven Flash V2
- `voices[].fine_tuning.dataset_duration_seconds`: Dataset Duration Seconds
- `voices[].fine_tuning.verification_attempts`: Verification Attempts
- `voices[].fine_tuning.slice_ids`: Slice IDs
- `voices[].fine_tuning.manual_verification`: Manual Verification
- `voices[].fine_tuning.max_verification_attempts`: Max Verification Attempts (number)
- `voices[].fine_tuning.next_max_verification_attempts_reset_unix_ms`: Next Max Verification Attempts Reset Unix Ms (number)
- `voices[].labels`: Labels
- `voices[].labels.use_case`: Use Case
- `voices[].labels.descriptive`: Descriptive
- `voices[].labels.language`: Language
- `voices[].labels.accent`: Accent
- `voices[].labels.age`: Age
- `voices[].labels.gender`: Gender
- `voices[].description`: Description
- `voices[].preview_url`: Preview URL (url)
- `voices[].available_for_tiers`: Available For Tiers
- `voices[].settings`: Settings
- `voices[].sharing`: Sharing
- `voices[].high_quality_base_model_ids`: High Quality Base Model IDs
- `voices[].verified_languages`: Verified Languages
- `voices[].verified_languages[].language`: Language
- `voices[].verified_languages[].model_id`: Model ID
- `voices[].verified_languages[].accent`: Accent
- `voices[].verified_languages[].locale`: Locale
- `voices[].verified_languages[].preview_url`: Preview URL (url)
- `voices[].collection_ids`: Collection IDs
- `voices[].safety_control`: Safety Control
- `voices[].voice_verification`: Voice Verification
- `voices[].voice_verification.requires_verification`: Requires Verification (boolean)
- `voices[].voice_verification.is_verified`: Is Verified (boolean)
- `voices[].voice_verification.verification_failures`: Verification Failures
- `voices[].voice_verification.verification_attempts_count`: Verification Attempts Count (number)
- `voices[].voice_verification.language`: Language
- `voices[].voice_verification.verification_attempts`: Verification Attempts
- `voices[].permission_on_resource`: Permission On Resource
- `voices[].is_owner`: Is Owner (boolean)
- `voices[].is_legacy`: Is Legacy (boolean)
- `voices[].is_mixed`: Is Mixed (boolean)
- `voices[].favorited_at_unix`: Favorited At Unix
- `voices[].created_at_unix`: Created At Unix (number)
- `voices[].is_bookmarked`: Is Bookmarked
- `voices[].recording_quality`: Recording Quality
- `voices[].labelling_status`: Labelling Status
- `voices[].recording_quality_reason`: Recording Quality Reason
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `total_count`: Total Count (number)
- `next_page_token`: Next Page Token

### `elevenlabs_move_kb_document`

**Move KB Document.** Moves a knowledge base document or folder into another folder. Leave the destination empty to move it to the root. Re-applying the same move is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. The document id from List KB Documents. |
| `moveTo` | string | no |  | Move To. Destination folder id, empty for the root. |

Output fields:

- `success`: Success (boolean)

### `elevenlabs_move_kb_documents_bulk`

**Move KB Documents Bulk.** Moves several knowledge base documents into one folder in a single call. Re-applying the same move is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentIds` | array | yes |  | Document Ids. Document ids from List KB Documents. |
| `moveTo` | string | no |  | Move To. Destination folder id, empty for the root. |

Output fields:

- `success`: Success (boolean)

### `elevenlabs_remove_pronunciation_rules`

**Remove Pronunciation Rules.** Removes rules from a pronunciation dictionary by their string_to_replace values and returns the new version_id. Removing rules that are already gone changes nothing. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pronunciationDictionaryId` | string | yes |  | Pronunciation Dictionary ID. The id from Create Pronunciation Dictionary or List Pronunciation Dictionaries. |
| `ruleStrings` | array | yes |  | Rule Strings. The string_to_replace values of the rules to remove. |

Output fields:

- `id`: ID
- `version_id`: Version ID
- `version_rules_num`: Version Rules Num (number)

### `elevenlabs_resubmit_test_invocation`

**Resubmit Test Invocation.** Re-runs selected test runs of a previous invocation against the agent. Not idempotent: each call starts new runs. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `testInvocationId` | string | yes |  | Test Invocation ID. The id from List Test Invocations. |
| `testRunIds` | array | yes |  | Test Run Ids. test_run ids from Get Test Invocation. |
| `agentId` | string | yes |  | Agent ID. The agent to run against. |

Output fields:

- `success`: Success (boolean)

### `elevenlabs_run_agent_tests`

**Run Agent Tests.** Starts a run of the given tests against an agent and returns a test invocation. Poll Get Test Invocation until the runs finish. Not idempotent: each call starts a new run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents. |
| `tests` | JSON | yes |  | Tests. JSON array of tests to run, such as [{"test_id": "..."}]. |
| `repeatCount` | number | no |  | Repeat Count. Times to run each test. |

Output fields:

- `id`: ID
- `agent_id`: Agent ID
- `branch_id`: Branch ID
- `version_id`: Version ID
- `ran_against_draft`: Ran Against Draft (boolean)
- `created_at`: Created At (number)
- `folder_id`: Folder ID
- `repeat_count`: Repeat Count (number)
- `bucketing_status`: Bucketing Status
- `result_groups`: Result Groups
- `test_runs`: Test Runs
- `test_runs[].test_run_id`: Test Run ID
- `test_runs[].test_info`: Test Info
- `test_runs[].test_invocation_id`: Test Invocation ID
- `test_runs[].agent_id`: Agent ID
- `test_runs[].branch_id`: Branch ID
- `test_runs[].version_id`: Version ID
- `test_runs[].ran_against_draft`: Ran Against Draft (boolean)
- `test_runs[].workflow_node_id`: Workflow Node ID
- `test_runs[].status`: Status
- `test_runs[].agent_responses`: Agent Responses
- `test_runs[].test_id`: Test ID
- `test_runs[].test_name`: Test Name
- `test_runs[].condition_result`: Condition Result
- `test_runs[].last_updated_at_unix`: Last Updated At Unix (number)
- `test_runs[].metadata`: Metadata
- `test_runs[].metadata.workspace_id`: Workspace ID
- `test_runs[].metadata.test_name`: Test Name
- `test_runs[].metadata.ran_by_user_email`: Ran By User Email (email)
- `test_runs[].metadata.test_type`: Test Type
- `test_runs[].root_folder_id`: Root Folder ID
- `test_runs[].root_folder_name`: Root Folder Name
- `test_runs[].environment`: Environment
- `test_runs[].credits_used`: Credits Used
- `test_runs[].charging`: Charging

### `elevenlabs_set_agent_avatar`

**Set Agent Avatar.** Uploads an image as the agent avatar and returns the avatar URL. Uploading the same image again gives the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |
| `avatarFile` | file | yes |  | Avatar File. Image file for the avatar. Files are not supported; an action that needs one fails. |

Output fields:

- `agent_id`: Agent ID
- `avatar_url`: Avatar URL (image)

### `elevenlabs_simulate_agent_conversation`

**Simulate Agent Conversation.** Runs a simulated conversation between the agent and a simulated user described by simulation_specification, and returns the transcript and analysis. Use to test an agent without a live call. Not idempotent: each run differs and consumes credits. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |
| `simulationSpecification` | JSON | yes |  | Simulation Specification. Simulated user, such as {"simulated_user_config": {"prompt": {"prompt": "You are a customer asking about pricing"}}}. |
| `newTurnsLimit` | number | no |  | New Turns Limit. Maximum turns to simulate. |

Output fields:

- `simulated_conversation`: Simulated Conversation
- `simulated_conversation[].role`: Role
- `simulated_conversation[].agent_metadata`: Agent Metadata
- `simulated_conversation[].agent_metadata.agent_id`: Agent ID
- `simulated_conversation[].agent_metadata.branch_id`: Branch ID
- `simulated_conversation[].agent_metadata.workflow_node_id`: Workflow Node ID
- `simulated_conversation[].agent_metadata.version_id`: Version ID
- `simulated_conversation[].message`: Message
- `simulated_conversation[].multivoice_message`: Multivoice Message
- `simulated_conversation[].tool_calls`: Tool Calls
- `simulated_conversation[].tool_results`: Tool Results
- `simulated_conversation[].feedback`: Feedback
- `simulated_conversation[].llm_override`: Llm Override
- `simulated_conversation[].producing_llm`: Producing Llm
- `simulated_conversation[].time_in_call_secs`: Time In Call Secs (number)
- `simulated_conversation[].conversation_turn_metrics`: Conversation Turn Metrics
- `simulated_conversation[].conversation_turn_metrics.metrics`: Metrics
- `simulated_conversation[].conversation_turn_metrics.metrics.convai_llm_service_ttf_sentence`: Convai Llm Service Ttf Sentence
- `simulated_conversation[].conversation_turn_metrics.metrics.convai_llm_service_ttf_sentence.elapsed_time`: Elapsed Time (number)
- `simulated_conversation[].conversation_turn_metrics.metrics.convai_llm_service_ttfb`: Convai Llm Service Ttfb
- `simulated_conversation[].conversation_turn_metrics.metrics.convai_llm_service_ttfb.elapsed_time`: Elapsed Time (number)
- `simulated_conversation[].conversation_turn_metrics.metrics.convai_llm_service_tt_last_sentence`: Convai Llm Service Tt Last Sentence
- `simulated_conversation[].conversation_turn_metrics.metrics.convai_llm_service_tt_last_sentence.elapsed_time`: Elapsed Time (number)
- `simulated_conversation[].conversation_turn_metrics.convai_asr_provider`: Convai Asr Provider
- `simulated_conversation[].conversation_turn_metrics.convai_tts_model`: Convai Tts Model
- `simulated_conversation[].conversation_turn_metrics.convai_tts_cascade`: Convai Tts Cascade
- `simulated_conversation[].rag_retrieval_info`: Rag Retrieval Info
- `simulated_conversation[].llm_usage`: Llm Usage
- `simulated_conversation[].interrupted`: Interrupted (boolean)
- `simulated_conversation[].ignored_as_backchannel`: Ignored As Backchannel (boolean)
- `simulated_conversation[].original_message`: Original Message
- `simulated_conversation[].reasoning`: Reasoning
- `simulated_conversation[].source_medium`: Source Medium
- `simulated_conversation[].source_event_id`: Source Event ID (number)
- `simulated_conversation[].used_static_kb_document_ids`: Used Static Kb Document IDs
- `simulated_conversation[].analysis`: Analysis
- `simulated_conversation[].user_identifier`: User Identifier
- `simulated_conversation[].id`: ID
- `simulated_conversation[].compaction`: Compaction
- `simulated_conversation[].triggered_guardrails`: Triggered Guardrails
- `simulated_conversation[].file_input`: File Input
- `simulated_conversation[].file_inputs`: File Inputs
- `simulated_conversation[].contextual_update_info`: Contextual Update Info
- `simulated_conversation[].config_snapshot_id`: Config Snapshot ID
- `simulated_conversation[].reasoned`: Reasoned (boolean)
- `analysis`: Analysis
- `analysis.evaluation_criteria_results`: Evaluation Criteria Results
- `analysis.data_collection_results`: Data Collection Results
- `analysis.evaluation_criteria_results_list`: Evaluation Criteria Results List
- `analysis.data_collection_results_list`: Data Collection Results List
- `analysis.call_successful`: Call Successful
- `analysis.call_success_score`: Call Success Score
- `analysis.transcript_summary`: Transcript Summary
- `analysis.call_summary_title`: Call Summary Title
- `analysis.scoped`: Scoped
- `analysis.sentiment_analysis`: Sentiment Analysis
- `guardrails_result`: Guardrails Result

### `elevenlabs_update_agent_test`

**Update Agent Test.** Updates an agent test. The API replaces the whole test, so the action reads the current test and re-sends it with only the supplied fields changed. Re-applying the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `testId` | string | yes |  | Test ID. The test id from Create Agent Test or List Agent Tests. |
| `name` | string | no |  | Name. |
| `successCondition` | string | no |  | Success Condition. What a passing response must do. |
| `successExamples` | JSON | no |  | Success Examples. Replaces the examples, JSON array such as [{"response": "...", "type": "success"}]. |
| `failureExamples` | JSON | no |  | Failure Examples. Replaces the examples, JSON array such as [{"response": "...", "type": "failure"}]. |

Output fields:

- `from_conversation_metadata`: From Conversation Metadata
- `dynamic_variables`: Dynamic Variables
- `chat_history`: Chat History
- `chat_history[].role`: Role
- `chat_history[].agent_metadata`: Agent Metadata
- `chat_history[].message`: Message
- `chat_history[].multivoice_message`: Multivoice Message
- `chat_history[].tool_calls`: Tool Calls
- `chat_history[].tool_results`: Tool Results
- `chat_history[].feedback`: Feedback
- `chat_history[].llm_override`: Llm Override
- `chat_history[].producing_llm`: Producing Llm
- `chat_history[].time_in_call_secs`: Time In Call Secs (number)
- `chat_history[].conversation_turn_metrics`: Conversation Turn Metrics
- `chat_history[].rag_retrieval_info`: Rag Retrieval Info
- `chat_history[].llm_usage`: Llm Usage
- `chat_history[].interrupted`: Interrupted (boolean)
- `chat_history[].ignored_as_backchannel`: Ignored As Backchannel (boolean)
- `chat_history[].original_message`: Original Message
- `chat_history[].reasoning`: Reasoning
- `chat_history[].source_medium`: Source Medium
- `chat_history[].source_event_id`: Source Event ID
- `chat_history[].used_static_kb_document_ids`: Used Static Kb Document IDs
- `chat_history[].analysis`: Analysis
- `chat_history[].user_identifier`: User Identifier
- `chat_history[].id`: ID
- `chat_history[].compaction`: Compaction
- `chat_history[].triggered_guardrails`: Triggered Guardrails
- `conversation_initiation_source`: Conversation Initiation Source
- `environment`: Environment
- `type`: Type
- `success_condition`: Success Condition
- `success_examples`: Success Examples
- `success_examples[].response`: Response
- `success_examples[].type`: Type
- `failure_examples`: Failure Examples
- `failure_examples[].response`: Response
- `failure_examples[].type`: Type
- `id`: ID
- `name`: Name

### `elevenlabs_update_agent`

**Update Agent.** Updates an agent. Only the supplied fields change; conversation_config and platform_settings are merged by the API. Use Get Agent first to see the current values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent ID. The agent_id from List Agents or Create Agent. |
| `name` | string | no |  | Name. New agent name. |
| `conversationConfig` | JSON | no |  | Conversation Config. Partial configuration to change, such as {"agent": {"first_message": "Hello"}}. |
| `platformSettings` | JSON | no |  | Platform Settings. Partial platform settings to change. |
| `tags` | array | no |  | Tags. Replaces the tags. |

Output fields:

- `agent_id`: Agent ID
- `name`: Name
- `conversation_config`: Conversation Config
- `conversation_config.asr`: Asr
- `conversation_config.asr.quality`: Quality
- `conversation_config.asr.provider`: Provider
- `conversation_config.asr.user_input_audio_format`: User Input Audio Format
- `conversation_config.asr.keywords`: Keywords
- `conversation_config.turn`: Turn
- `conversation_config.turn.turn_timeout`: Turn Timeout (number)
- `conversation_config.turn.initial_wait_time`: Initial Wait Time
- `conversation_config.turn.silence_end_call_timeout`: Silence End Call Timeout (number)
- `conversation_config.turn.mode`: Mode
- `conversation_config.turn.turn_eagerness`: Turn Eagerness
- `conversation_config.turn.spelling_patience`: Spelling Patience
- `conversation_config.turn.speculative_turn`: Speculative Turn (boolean)
- `conversation_config.turn.retranscribe_on_turn_timeout`: Retranscribe On Turn Timeout (boolean)
- `conversation_config.turn.turn_model`: Turn Model
- `conversation_config.turn.interruption_ignore_terms`: Interruption Ignore Terms
- `conversation_config.turn.interruption_ignore_term_languages`: Interruption Ignore Term Languages
- `conversation_config.turn.merge_with_default_ignore_terms`: Merge With Default Ignore Terms (boolean)
- `conversation_config.turn.transcribe_on_disabled_interruptions`: Transcribe On Disabled Interruptions (boolean)
- `conversation_config.turn.soft_timeout_config`: Soft Timeout Config
- `conversation_config.turn.soft_timeout_config.timeout_seconds`: Timeout Seconds (number)
- `conversation_config.turn.soft_timeout_config.message`: Message
- `conversation_config.turn.soft_timeout_config.additional_soft_timeout_messages`: Additional Soft Timeout Messages
- `conversation_config.turn.soft_timeout_config.use_llm_generated_message`: Use Llm Generated Message (boolean)
- `conversation_config.turn.soft_timeout_config.randomize_fillers`: Randomize Fillers (boolean)
- `conversation_config.turn.soft_timeout_config.max_soft_timeouts_per_generation`: Max Soft Timeouts Per Generation (number)
- `conversation_config.turn.soft_timeout_config.llm_generated_message_prompt_override`: Llm Generated Message Prompt Override
- `conversation_config.turn.soft_timeout_config.disable_until_first_user_message`: Disable Until First User Message (boolean)
- `conversation_config.tts`: Tts
- `conversation_config.tts.model_id`: Model ID
- `conversation_config.tts.voice_id`: Voice ID
- `conversation_config.tts.supported_voices`: Supported Voices
- `conversation_config.tts.expressive_mode`: Expressive Mode (boolean)
- `conversation_config.tts.suggested_audio_tags`: Suggested Audio Tags
- `conversation_config.tts.agent_output_audio_format`: Agent Output Audio Format
- `conversation_config.tts.optimize_streaming_latency`: Optimize Streaming Latency (number)
- `conversation_config.tts.stability`: Stability (number)
- `conversation_config.tts.speed`: Speed (number)
- `conversation_config.tts.similarity_boost`: Similarity Boost (number)
- `conversation_config.tts.text_normalisation_type`: Text Normalisation Type
- `conversation_config.tts.pronunciation_dictionary_locators`: Pronunciation Dictionary Locators
- `conversation_config.tts.enable_phoneme_tags`: Enable Phoneme Tags (boolean)
- `conversation_config.tts.audio_effects`: Audio Effects
- `conversation_config.conversation`: Conversation
- `conversation_config.conversation.text_only`: Text Only (boolean)
- `conversation_config.conversation.max_duration_seconds`: Max Duration Seconds (number)
- `conversation_config.conversation.max_duration_seconds_after_last_agent_message`: Max Duration Seconds After Last Agent Message
- `conversation_config.conversation.client_events`: Client Events
- `conversation_config.conversation.file_input`: File Input
- `conversation_config.conversation.file_input.enabled`: Enabled (boolean)
- `conversation_config.conversation.file_input.max_files_in_memory`: Max Files In Memory (number)
- `conversation_config.conversation.file_input.max_files_per_conversation`: Max Files Per Conversation (number)
- `conversation_config.conversation.monitoring_enabled`: Monitoring Enabled (boolean)
- `conversation_config.conversation.monitoring_events`: Monitoring Events
- `conversation_config.conversation.dtmf_input_settings`: Dtmf Input Settings
- `conversation_config.conversation.background_sound`: Background Sound
- `conversation_config.conversation.background_sound.source_type`: Source Type
- `conversation_config.conversation.background_sound.source_id`: Source ID
- `conversation_config.conversation.background_sound.volume`: Volume (number)
- `conversation_config.conversation.background_sound.crossfade_loop`: Crossfade Loop (boolean)
- `conversation_config.conversation.compaction`: Compaction
- `conversation_config.conversation.compaction.enabled`: Enabled
- `conversation_config.conversation.compaction.soft_trigger_fraction`: Soft Trigger Fraction
- `conversation_config.conversation.compaction.tail_size`: Tail Size
- `conversation_config.conversation.compaction.min_reclaimable_tokens`: Min Reclaimable Tokens
- `conversation_config.conversation.source_attribution`: Source Attribution (boolean)
- `conversation_config.language_presets`: Language Presets
- `conversation_config.vad`: Vad
- `conversation_config.vad.background_voice_detection`: Background Voice Detection (boolean)
- `conversation_config.realtime_model`: Realtime Model
- `conversation_config.agent`: Agent
- `conversation_config.agent.first_message`: First Message
- `conversation_config.agent.language`: Language
- `conversation_config.agent.hinglish_mode`: Hinglish Mode (boolean)
- `conversation_config.agent.dynamic_variables`: Dynamic Variables
- `conversation_config.agent.dynamic_variables.dynamic_variable_placeholders`: Dynamic Variable Placeholders
- `conversation_config.agent.disable_first_message_interruptions`: Disable First Message Interruptions (boolean)
- `conversation_config.agent.max_conversation_duration_message`: Max Conversation Duration Message
- `conversation_config.agent.text_behavior_overrides`: Text Behavior Overrides
- `conversation_config.agent.subagents`: Subagents
- `conversation_config.agent.prompt`: Prompt
- `conversation_config.agent.prompt.prompt`: Prompt
- `conversation_config.agent.prompt.llm`: Llm
- `conversation_config.agent.prompt.reasoning_effort`: Reasoning Effort
- `conversation_config.agent.prompt.service_tier`: Service Tier
- `conversation_config.agent.prompt.opener`: Opener
- `conversation_config.agent.prompt.thinking_budget`: Thinking Budget
- `conversation_config.agent.prompt.enable_reasoning_summary`: Enable Reasoning Summary (boolean)
- `conversation_config.agent.prompt.temperature`: Temperature (number)
- `conversation_config.agent.prompt.max_tokens`: Max Tokens (number)
- `conversation_config.agent.prompt.tool_ids`: Tool IDs
- `conversation_config.agent.prompt.built_in_tools`: Built In Tools
- `conversation_config.agent.prompt.built_in_tools.transfer_to_agent`: Transfer To Agent
- `conversation_config.agent.prompt.built_in_tools.update_state`: Update State
- `conversation_config.agent.prompt.built_in_tools.memory_entry_search`: Memory Entry Search
- `conversation_config.agent.prompt.built_in_tools.run_subagent`: Run Subagent
- `conversation_config.agent.prompt.built_in_tools.flag_issue_for_review`: Flag Issue For Review
- `conversation_config.agent.prompt.built_in_tools.end_call`: End Call
- `conversation_config.agent.prompt.built_in_tools.language_detection`: Language Detection
- `conversation_config.agent.prompt.built_in_tools.transfer_to_number`: Transfer To Number
- `conversation_config.agent.prompt.built_in_tools.skip_turn`: Skip Turn
- `conversation_config.agent.prompt.built_in_tools.play_keypad_touch_tone`: Play Keypad Touch Tone
- `conversation_config.agent.prompt.built_in_tools.voicemail_detection`: Voicemail Detection
- `conversation_config.agent.prompt.built_in_tools.transfer_to_genesys`: Transfer To Genesys
- `conversation_config.agent.prompt.built_in_tools.transfer_to_genesys_chat`: Transfer To Genesys Chat
- `conversation_config.agent.prompt.built_in_tools.transfer_to_genesys_bot`: Transfer To Genesys Bot
- `conversation_config.agent.prompt.enable_parallel_tool_calls`: Enable Parallel Tool Calls (boolean)
- `conversation_config.agent.prompt.mcp_server_ids`: Mcp Server IDs
- `conversation_config.agent.prompt.native_mcp_server_ids`: Native Mcp Server IDs
- `conversation_config.agent.prompt.knowledge_base`: Knowledge Base
- `conversation_config.agent.prompt.custom_llm`: Custom Llm
- `conversation_config.agent.prompt.bedrock_llm`: Bedrock Llm
- `conversation_config.agent.prompt.speech_engine`: Speech Engine
- `conversation_config.agent.prompt.ignore_default_personality`: Ignore Default Personality (boolean)
- `conversation_config.agent.prompt.rag`: Rag
- `conversation_config.agent.prompt.rag.enabled`: Enabled (boolean)
- `conversation_config.agent.prompt.rag.embedding_model`: Embedding Model
- `conversation_config.agent.prompt.rag.optional_rag_enabled`: Optional Rag Enabled (boolean)
- `conversation_config.agent.prompt.rag.max_vector_distance`: Max Vector Distance (number)
- `conversation_config.agent.prompt.rag.max_documents_length`: Max Documents Length (number)
- `conversation_config.agent.prompt.rag.max_retrieved_rag_chunks_count`: Max Retrieved Rag Chunks Count (number)
- `conversation_config.agent.prompt.rag.num_candidates`: Num Candidates
- `conversation_config.agent.prompt.rag.query_rewrite_prompt_override`: Query Rewrite Prompt Override
- `conversation_config.agent.prompt.rag.knowledge_base_tool_info`: Knowledge Base Tool Info
- `conversation_config.agent.prompt.rag.include_source_urls`: Include Source Urls (boolean)
- `conversation_config.agent.prompt.timezone`: Timezone
- `conversation_config.agent.prompt.backup_llm_config`: Backup Llm Config
- `conversation_config.agent.prompt.backup_llm_config.preference`: Preference
- `conversation_config.agent.prompt.cascade_timeout_seconds`: Cascade Timeout Seconds (number)
- `conversation_config.agent.prompt.tools`: Tools
- `metadata`: Metadata
- `metadata.created_at_unix_secs`: Created At Unix Secs (number)
- `metadata.updated_at_unix_secs`: Updated At Unix Secs (number)
- `platform_settings`: Platform Settings
- `platform_settings.evaluation`: Evaluation
- `platform_settings.evaluation.criteria`: Criteria
- `platform_settings.widget`: Widget
- `platform_settings.widget.variant`: Variant
- `platform_settings.widget.placement`: Placement
- `platform_settings.widget.expandable`: Expandable
- `platform_settings.widget.avatar`: Avatar
- `platform_settings.widget.avatar.type`: Type
- `platform_settings.widget.avatar.color_1`: Color 1
- `platform_settings.widget.avatar.color_2`: Color 2
- `platform_settings.widget.feedback_mode`: Feedback Mode
- `platform_settings.widget.end_feedback`: End Feedback
- `platform_settings.widget.end_feedback.type`: Type
- `platform_settings.widget.bg_color`: Bg Color
- `platform_settings.widget.text_color`: Text Color
- `platform_settings.widget.btn_color`: Btn Color
- `platform_settings.widget.btn_text_color`: Btn Text Color
- `platform_settings.widget.border_color`: Border Color
- `platform_settings.widget.focus_color`: Focus Color
- `platform_settings.widget.border_radius`: Border Radius
- `platform_settings.widget.btn_radius`: Btn Radius
- `platform_settings.widget.action_text`: Action Text
- `platform_settings.widget.start_call_text`: Start Call Text
- `platform_settings.widget.end_call_text`: End Call Text
- `platform_settings.widget.expand_text`: Expand Text
- `platform_settings.widget.listening_text`: Listening Text
- `platform_settings.widget.speaking_text`: Speaking Text
- `platform_settings.widget.shareable_page_text`: Shareable Page Text
- `platform_settings.widget.shareable_page_show_terms`: Shareable Page Show Terms (boolean)
- `platform_settings.widget.terms_text`: Terms Text
- `platform_settings.widget.terms_html`: Terms HTML
- `platform_settings.widget.terms_key`: Terms Key
- `platform_settings.widget.show_avatar_when_collapsed`: Show Avatar When Collapsed (boolean)
- `platform_settings.widget.disable_banner`: Disable Banner (boolean)
- `platform_settings.widget.override_link`: Override Link
- `platform_settings.widget.markdown_link_allowed_hosts`: Markdown Link Allowed Hosts
- `platform_settings.widget.markdown_link_include_www`: Markdown Link Include Www (boolean)
- `platform_settings.widget.markdown_link_allow_http`: Markdown Link Allow Http (boolean)
- `platform_settings.widget.mic_muting_enabled`: Mic Muting Enabled (boolean)
- `platform_settings.widget.transcript_enabled`: Transcript Enabled (boolean)
- `platform_settings.widget.text_input_enabled`: Text Input Enabled (boolean)
- `platform_settings.widget.conversation_mode_toggle_enabled`: Conversation Mode Toggle Enabled (boolean)
- `platform_settings.widget.default_expanded`: Default Expanded (boolean)
- `platform_settings.widget.always_expanded`: Always Expanded (boolean)
- `platform_settings.widget.dismissible`: Dismissible (boolean)
- `platform_settings.widget.show_agent_status`: Show Agent Status (boolean)
- `platform_settings.widget.show_conversation_id`: Show Conversation ID (boolean)
- `platform_settings.widget.strip_audio_tags`: Strip Audio Tags (boolean)
- `platform_settings.widget.syntax_highlight_theme`: Syntax Highlight Theme
- `platform_settings.widget.text_contents`: Text Contents
- `platform_settings.widget.text_contents.main_label`: Main Label
- `platform_settings.widget.text_contents.start_call`: Start Call
- `platform_settings.widget.text_contents.start_chat`: Start Chat
- `platform_settings.widget.text_contents.new_call`: New Call
- `platform_settings.widget.text_contents.end_call`: End Call
- `platform_settings.widget.text_contents.mute_microphone`: Mute Microphone
- `platform_settings.widget.text_contents.change_language`: Change Language
- `platform_settings.widget.text_contents.collapse`: Collapse
- `platform_settings.widget.text_contents.expand`: Expand
- `platform_settings.widget.text_contents.copied`: Copied
- `platform_settings.widget.text_contents.accept_terms`: Accept Terms
- `platform_settings.widget.text_contents.dismiss_terms`: Dismiss Terms
- `platform_settings.widget.text_contents.listening_status`: Listening Status
- `platform_settings.widget.text_contents.speaking_status`: Speaking Status
- `platform_settings.widget.text_contents.connecting_status`: Connecting Status
- `platform_settings.widget.text_contents.chatting_status`: Chatting Status
- `platform_settings.widget.text_contents.queue_waiting_status`: Queue Waiting Status
- `platform_settings.widget.text_contents.queue_waiting_status_short`: Queue Waiting Status Short
- `platform_settings.widget.text_contents.input_label`: Input Label
- `platform_settings.widget.text_contents.input_placeholder`: Input Placeholder
- `platform_settings.widget.text_contents.input_placeholder_text_only`: Input Placeholder Text Only
- `platform_settings.widget.text_contents.input_placeholder_new_conversation`: Input Placeholder New Conversation
- `platform_settings.widget.text_contents.user_ended_conversation`: User Ended Conversation
- `platform_settings.widget.text_contents.agent_ended_conversation`: Agent Ended Conversation
- `platform_settings.widget.text_contents.conversation_id`: Conversation ID
- `platform_settings.widget.text_contents.error_occurred`: Error Occurred
- `platform_settings.widget.text_contents.queue_timed_out`: Queue Timed Out
- `platform_settings.widget.text_contents.copy_id`: Copy ID
- `platform_settings.widget.text_contents.initiate_feedback`: Initiate Feedback
- `platform_settings.widget.text_contents.request_follow_up_feedback`: Request Follow Up Feedback
- `platform_settings.widget.text_contents.thanks_for_feedback`: Thanks For Feedback
- `platform_settings.widget.text_contents.thanks_for_feedback_details`: Thanks For Feedback Details
- `platform_settings.widget.text_contents.follow_up_feedback_placeholder`: Follow Up Feedback Placeholder
- `platform_settings.widget.text_contents.submit`: Submit
- `platform_settings.widget.text_contents.go_back`: Go Back
- `platform_settings.widget.text_contents.send_message`: Send Message
- `platform_settings.widget.text_contents.text_mode`: Text Mode
- `platform_settings.widget.text_contents.voice_mode`: Voice Mode
- `platform_settings.widget.text_contents.switched_to_text_mode`: Switched To Text Mode
- `platform_settings.widget.text_contents.switched_to_voice_mode`: Switched To Voice Mode
- `platform_settings.widget.text_contents.copy`: Copy
- `platform_settings.widget.text_contents.download`: Download
- `platform_settings.widget.text_contents.wrap`: Wrap
- `platform_settings.widget.text_contents.agent_working`: Agent Working
- `platform_settings.widget.text_contents.agent_done`: Agent Done
- `platform_settings.widget.text_contents.agent_error`: Agent Error
- `platform_settings.widget.text_contents.attach_file`: Attach File
- `platform_settings.widget.text_contents.remove_file`: Remove File
- `platform_settings.widget.text_contents.file_upload_error`: File Upload Error
- `platform_settings.widget.text_contents.file_type_unsupported`: File Type Unsupported
- `platform_settings.widget.text_contents.file_too_large`: File Too Large
- `platform_settings.widget.text_contents.file_limit_reached`: File Limit Reached
- `platform_settings.widget.text_contents.typing_indicator`: Typing Indicator
- `platform_settings.widget.text_contents.rich_content_unavailable`: Rich Content Unavailable
- `platform_settings.widget.styles`: Styles
- `platform_settings.widget.styles.base`: Base
- `platform_settings.widget.styles.base_hover`: Base Hover
- `platform_settings.widget.styles.base_active`: Base Active
- `platform_settings.widget.styles.base_border`: Base Border
- `platform_settings.widget.styles.base_subtle`: Base Subtle
- `platform_settings.widget.styles.base_primary`: Base Primary
- `platform_settings.widget.styles.base_error`: Base Error
- `platform_settings.widget.styles.accent`: Accent
- `platform_settings.widget.styles.accent_hover`: Accent Hover
- `platform_settings.widget.styles.accent_active`: Accent Active
- `platform_settings.widget.styles.accent_border`: Accent Border
- `platform_settings.widget.styles.accent_subtle`: Accent Subtle
- `platform_settings.widget.styles.accent_primary`: Accent Primary
- `platform_settings.widget.styles.overlay_padding`: Overlay Padding
- `platform_settings.widget.styles.button_radius`: Button Radius
- `platform_settings.widget.styles.input_radius`: Input Radius
- `platform_settings.widget.styles.bubble_radius`: Bubble Radius
- `platform_settings.widget.styles.sheet_radius`: Sheet Radius
- `platform_settings.widget.styles.compact_sheet_radius`: Compact Sheet Radius
- `platform_settings.widget.styles.dropdown_sheet_radius`: Dropdown Sheet Radius
- `platform_settings.widget.show_resize_button`: Show Resize Button (boolean)
- `platform_settings.widget.language_selector`: Language Selector (boolean)
- `platform_settings.widget.supports_text_only`: Supports Text Only (boolean)
- `platform_settings.widget.custom_avatar_path`: Custom Avatar Path
- `platform_settings.widget.language_presets`: Language Presets
- `platform_settings.widget.first_message_quick_replies`: First Message Quick Replies
- `platform_settings.data_collection`: Data Collection
- `platform_settings.data_collection_scopes`: Data Collection Scopes
- `platform_settings.analysis_items`: Analysis Items
- `platform_settings.analysis_items.evaluation_criteria`: Evaluation Criteria
- `platform_settings.analysis_items.data_collection`: Data Collection
- `platform_settings.overrides`: Overrides
- `platform_settings.overrides.conversation_config_override`: Conversation Config Override
- `platform_settings.overrides.conversation_config_override.asr`: Asr
- `platform_settings.overrides.conversation_config_override.asr.keywords`: Keywords (boolean)
- `platform_settings.overrides.conversation_config_override.turn`: Turn
- `platform_settings.overrides.conversation_config_override.turn.soft_timeout_config`: Soft Timeout Config
- `platform_settings.overrides.conversation_config_override.tts`: Tts
- `platform_settings.overrides.conversation_config_override.tts.model_id`: Model ID (boolean)
- `platform_settings.overrides.conversation_config_override.tts.voice_id`: Voice ID (boolean)
- `platform_settings.overrides.conversation_config_override.tts.supported_voices`: Supported Voices (boolean)
- `platform_settings.overrides.conversation_config_override.tts.stability`: Stability (boolean)
- `platform_settings.overrides.conversation_config_override.tts.speed`: Speed (boolean)
- `platform_settings.overrides.conversation_config_override.tts.similarity_boost`: Similarity Boost (boolean)
- `platform_settings.overrides.conversation_config_override.tts.pronunciation_dictionary_locators`: Pronunciation Dictionary Locators (boolean)
- `platform_settings.overrides.conversation_config_override.conversation`: Conversation
- `platform_settings.overrides.conversation_config_override.conversation.text_only`: Text Only (boolean)
- `platform_settings.overrides.conversation_config_override.conversation.max_duration_seconds`: Max Duration Seconds (boolean)
- `platform_settings.overrides.conversation_config_override.agent`: Agent
- `platform_settings.overrides.conversation_config_override.agent.first_message`: First Message (boolean)
- `platform_settings.overrides.conversation_config_override.agent.language`: Language (boolean)
- `platform_settings.overrides.conversation_config_override.agent.max_conversation_duration_message`: Max Conversation Duration Message (boolean)
- `platform_settings.overrides.conversation_config_override.agent.prompt`: Prompt
- `platform_settings.overrides.custom_llm_extra_body`: Custom Llm Extra Body (boolean)
- `platform_settings.overrides.enable_conversation_initiation_client_data_from_webhook`: Enable Conversation Initiation Client Data From Webhook (boolean)
- `platform_settings.overrides.enable_starting_workflow_node_id_from_client`: Enable Starting Workflow Node ID From Client (boolean)
- `platform_settings.overrides.enable_procedure_ids_from_client`: Enable Procedure IDs From Client (boolean)
- `platform_settings.workspace_overrides`: Workspace Overrides
- `platform_settings.workspace_overrides.conversation_initiation_client_data_webhook`: Conversation Initiation Client Data Webhook
- `platform_settings.workspace_overrides.webhooks`: Webhooks
- `platform_settings.workspace_overrides.webhooks.post_call_webhook_id`: Post Call Webhook ID
- `platform_settings.workspace_overrides.webhooks.events`: Events
- `platform_settings.workspace_overrides.webhooks.transcript_format`: Transcript Format
- `platform_settings.workspace_overrides.webhooks.send_audio`: Send Audio (boolean)
- `platform_settings.workspace_overrides.cloud_storage_export`: Cloud Storage Export
- `platform_settings.workspace_overrides.cloud_storage_export.destination_id`: Destination ID
- `platform_settings.workspace_overrides.cloud_storage_export.events`: Events
- `platform_settings.workspace_overrides.cloud_storage_export.transcript_format`: Transcript Format
- `platform_settings.testing`: Testing
- `platform_settings.testing.attached_tests`: Attached Tests
- `platform_settings.testing.referenced_tests_ids`: Referenced Tests IDs
- `platform_settings.archived`: Archived (boolean)
- `platform_settings.guardrails`: Guardrails
- `platform_settings.guardrails.version`: Version
- `platform_settings.guardrails.focus`: Focus
- `platform_settings.guardrails.focus.is_enabled`: Is Enabled (boolean)
- `platform_settings.guardrails.prompt_injection`: Prompt Injection
- `platform_settings.guardrails.prompt_injection.is_enabled`: Is Enabled (boolean)
- `platform_settings.guardrails.synthetic_voice`: Synthetic Voice
- `platform_settings.guardrails.synthetic_voice.is_enabled`: Is Enabled (boolean)
- `platform_settings.guardrails.synthetic_voice.trigger_action`: Trigger Action
- `platform_settings.guardrails.synthetic_voice.trigger_action.type`: Type
- `platform_settings.guardrails.content`: Content
- `platform_settings.guardrails.content.execution_mode`: Execution Mode
- `platform_settings.guardrails.content.trigger_action`: Trigger Action
- `platform_settings.guardrails.content.trigger_action.type`: Type
- `platform_settings.guardrails.moderation`: Moderation
- `platform_settings.guardrails.custom`: Custom
- `platform_settings.summary_language`: Summary Language
- `platform_settings.auto_translate_transcript_to_app_language`: Auto Translate Transcript To App Language
- `platform_settings.auth`: Auth
- `platform_settings.auth.enable_auth`: Enable Auth (boolean)
- `platform_settings.auth.allowlist`: Allowlist
- `platform_settings.auth.require_origin_header`: Require Origin Header (boolean)
- `platform_settings.auth.shareable_token`: Shareable Token
- `platform_settings.call_limits`: Call Limits
- `platform_settings.call_limits.agent_concurrency_limit`: Agent Concurrency Limit (number)
- `platform_settings.call_limits.daily_limit`: Daily Limit (number)
- `platform_settings.call_limits.bursting_enabled`: Bursting Enabled (boolean)
- `platform_settings.queueing_config`: Queueing Config
- `platform_settings.queueing_config.enabled`: Enabled (boolean)
- `platform_settings.queueing_config.wait_timeout_seconds`: Wait Timeout Seconds (number)
- `platform_settings.queueing_config.hold_audio`: Hold Audio
- `platform_settings.ban`: Ban
- `platform_settings.smb_metadata`: Smb Metadata
- `platform_settings.privacy`: Privacy
- `platform_settings.privacy.record_voice`: Record Voice (boolean)
- `platform_settings.privacy.retention_days`: Retention Days (number)
- `platform_settings.privacy.delete_transcript_and_pii`: Delete Transcript And Pii (boolean)
- `platform_settings.privacy.delete_audio`: Delete Audio (boolean)
- `platform_settings.privacy.apply_to_existing_conversations`: Apply To Existing Conversations (boolean)
- `platform_settings.privacy.zero_retention_mode`: Zero Retention Mode (boolean)
- `platform_settings.privacy.nested_history_redaction`: Nested History Redaction (boolean)
- `platform_settings.privacy.conversation_history_redaction`: Conversation History Redaction
- `platform_settings.privacy.conversation_history_redaction.enabled`: Enabled (boolean)
- `platform_settings.privacy.conversation_history_redaction.entities`: Entities
- `platform_settings.privacy.user_memory`: User Memory
- `platform_settings.privacy.user_memory.enabled`: Enabled (boolean)
- `platform_settings.privacy.user_memory.scale`: Scale
- `platform_settings.trust_context`: Trust Context
- `platform_settings.analysis_llm`: Analysis Llm
- `platform_settings.analysis_bedrock_llm`: Analysis Bedrock Llm
- `platform_settings.analysis_llm_billed`: Analysis Llm Billed (boolean)
- `platform_settings.topic_discovery`: Topic Discovery
- `platform_settings.topic_discovery.enabled`: Enabled (boolean)
- `platform_settings.sentiment_analysis`: Sentiment Analysis
- `platform_settings.sentiment_analysis.enabled`: Enabled (boolean)
- `platform_settings.simulation_library`: Simulation Library
- `platform_settings.simulation_library.enabled`: Enabled (boolean)
- `platform_settings.simulation_library.test_ids`: Test IDs
- `platform_settings.alerting`: Alerting
- `platform_settings.overview_dashboard_template_id`: Overview Dashboard Template ID
- `platform_settings.safety`: Safety
- `platform_settings.safety.is_blocked_ivc`: Is Blocked Ivc (boolean)
- `platform_settings.safety.is_blocked_non_ivc`: Is Blocked Non Ivc (boolean)
- `platform_settings.safety.ignore_safety_evaluation`: Ignore Safety Evaluation (boolean)
- `phone_numbers`: Phone Numbers
- `whatsapp_accounts`: Whatsapp Accounts
- `workflow`: Workflow
- `workflow.edges`: Edges
- `workflow.nodes`: Nodes
- `workflow.nodes.start_node`: Start Node
- `workflow.nodes.start_node.type`: Type
- `workflow.nodes.start_node.position`: Position
- `workflow.nodes.start_node.position.x`: X (number)
- `workflow.nodes.start_node.position.y`: Y (number)
- `workflow.nodes.start_node.edge_order`: Edge Order
- `workflow.nodes.start_node.parent_subgraph_id`: Parent Subgraph ID
- `workflow.subgraphs`: Subgraphs
- `workflow.prevent_subagent_loops`: Prevent Subagent Loops (boolean)
- `access_info`: Access Info
- `access_info.is_creator`: Is Creator (boolean)
- `access_info.creator_name`: Creator Name
- `access_info.creator_email`: Creator Email (email)
- `access_info.role`: Role
- `access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `access_info.access_source`: Access Source
- `access_permissions`: Access Permissions
- `tags`: Tags
- `version_id`: Version ID
- `branch_id`: Branch ID
- `main_branch_id`: Main Branch ID
- `procedures`: Procedures
- `trust_context`: Trust Context
- `default_hold_audio_url`: Default Hold Audio URL (url)

### `elevenlabs_update_audio_native_content`

**Update Audio Native Content.** Replaces the article content of an Audio Native project with an uploaded file, optionally regenerating and publishing the audio. Re-applying the same file gives the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. The project_id returned by Create Audio Native Project. |
| `file` | file | yes |  | File. New article as a .txt or .html file. Files are not supported; an action that needs one fails. |
| `autoConvert` | string | no |  | Auto Convert. Regenerate the audio. One of `true`, `false`. |
| `autoPublish` | string | no |  | Auto Publish. Publish after conversion. One of `true`, `false`. |

Output fields:

- `project_id`: Project ID
- `converting`: Converting (boolean)
- `publishing`: Publishing (boolean)
- `html_snippet`: HTML Snippet

### `elevenlabs_update_kb_document`

**Update KB Document.** Renames a knowledge base document or replaces its text content. Only the supplied fields change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentationId` | string | yes |  | Documentation ID. The document id from List KB Documents or a create action. |
| `name` | string | no |  | Name. New name. |
| `content` | string | no |  | Content. New text content. |

Output fields:

- `id`: ID
- `name`: Name
- `metadata`: Metadata
- `metadata.created_at_unix_secs`: Created At Unix Secs (number)
- `metadata.last_updated_at_unix_secs`: Last Updated At Unix Secs (number)
- `metadata.size_bytes`: Size Bytes (number)
- `supported_usages`: Supported Usages
- `access_info`: Access Info
- `access_info.is_creator`: Is Creator (boolean)
- `access_info.creator_name`: Creator Name
- `access_info.creator_email`: Creator Email (email)
- `access_info.role`: Role
- `access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `access_info.access_source`: Access Source
- `folder_parent_id`: Folder Parent ID
- `chunking_override`: Chunking Override
- `folder_path`: Folder Path
- `type`: Type
- `extracted_inner_html`: Extracted Inner HTML
- `content_format`: Content Format

### `elevenlabs_update_pronunciation_dictionary`

**Update Pronunciation Dictionary.** Renames a pronunciation dictionary or archives it. Only the supplied fields change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pronunciationDictionaryId` | string | yes |  | Pronunciation Dictionary ID. The id from Create Pronunciation Dictionary or List Pronunciation Dictionaries. |
| `name` | string | no |  | Name. |
| `archived` | string | no |  | Archived. Archive the dictionary. One of `true`, `false`. |

Output fields:

- `id`: ID
- `latest_version_id`: Latest Version ID
- `latest_version_rules_num`: Latest Version Rules Num (number)
- `name`: Name
- `permission_on_resource`: Permission On Resource
- `created_by`: Created By
- `creation_time_unix`: Creation Time Unix (number)
- `archived_time_unix`: Archived Time Unix (number)
- `description`: Description

### `elevenlabs_update_secret`

**Update Secret.** Replaces the name and value of a secret. Both are required. Re-applying the same values is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretId` | string | yes |  | Secret ID. The secret_id from List Secrets. |
| `name` | string | yes |  | Name. Secret name. |
| `value` | string | yes |  | Value. Secret value. |

Output fields:

- `type`: Type
- `secret_id`: Secret ID
- `name`: Name

### `elevenlabs_update_tool`

**Update Tool.** Replaces the configuration of a tool. tool_config is required in full, so start from Get Tool. Re-applying the same config is safe. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toolId` | string | yes |  | Tool ID. The tool id from List Tools or Create Tool. |
| `toolConfig` | JSON | yes |  | Tool Config. Full tool configuration, from Get Tool. |

Output fields:

- `id`: ID
- `tool_config`: Tool Config
- `tool_config.type`: Type
- `tool_config.name`: Name
- `tool_config.description`: Description
- `tool_config.response_timeout_secs`: Response Timeout Secs (number)
- `tool_config.disable_interruptions`: Disable Interruptions (boolean)
- `tool_config.interruption_mode`: Interruption Mode
- `tool_config.force_pre_tool_speech`: Force Pre Tool Speech (boolean)
- `tool_config.pre_tool_speech`: Pre Tool Speech
- `tool_config.assignments`: Assignments
- `tool_config.tool_call_sound`: Tool Call Sound
- `tool_config.tool_call_sound_behavior`: Tool Call Sound Behavior
- `tool_config.tool_error_handling_mode`: Tool Error Handling Mode
- `tool_config.dynamic_variables`: Dynamic Variables
- `tool_config.dynamic_variables.dynamic_variable_placeholders`: Dynamic Variable Placeholders
- `tool_config.execution_mode`: Execution Mode
- `tool_config.api_schema`: API Schema
- `tool_config.api_schema.request_headers`: Request Headers
- `tool_config.api_schema.kind`: Kind
- `tool_config.api_schema.url`: URL (url)
- `tool_config.api_schema.method`: Method
- `tool_config.api_schema.path_params_schema`: Path Params Schema
- `tool_config.api_schema.query_params_schema`: Query Params Schema
- `tool_config.api_schema.request_body_schema`: Request Body Schema
- `tool_config.api_schema.request_body_schema.description`: Description
- `tool_config.api_schema.request_body_schema.dynamic_variable`: Dynamic Variable
- `tool_config.api_schema.request_body_schema.is_omitted`: Is Omitted (boolean)
- `tool_config.api_schema.request_body_schema.type`: Type
- `tool_config.api_schema.request_body_schema.required`: Required
- `tool_config.api_schema.request_body_schema.properties`: Properties
- `tool_config.api_schema.request_body_schema.properties.q`: Q
- `tool_config.api_schema.response_body_schema`: Response Body Schema
- `tool_config.api_schema.response_filter`: Response Filter
- `tool_config.api_schema.content_type`: Content Type
- `tool_config.api_schema.auth_resolved_params`: Auth Resolved Params
- `tool_config.api_schema.auth_connection`: Auth Connection
- `tool_config.api_schema.mtls_auth_connection`: Mtls Auth Connection
- `tool_config.follow_redirects`: Follow Redirects (boolean)
- `tool_config.follow_redirects_allowed_domains`: Follow Redirects Allowed Domains
- `access_info`: Access Info
- `access_info.is_creator`: Is Creator (boolean)
- `access_info.creator_name`: Creator Name
- `access_info.creator_email`: Creator Email (email)
- `access_info.role`: Role
- `access_info.anonymous_access_level_override`: Anonymous Access Level Override
- `access_info.access_source`: Access Source
- `usage_stats`: Usage Stats
- `usage_stats.total_calls`: Total Calls (number)
- `usage_stats.avg_latency_secs`: Avg Latency Secs (number)
- `response_mocks`: Response Mocks

### `custom_api_call`

**Custom API Call.** Check [Elevenlabs API reference](https://elevenlabs.io/docs/api-reference/introduction) for the list of available endpoints. Needs authentication.

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
