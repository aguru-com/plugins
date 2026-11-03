# Hugging Face

Run inference on 100,000+ open ML models for NLP, vision, and audio tasks

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hugging-face'
  version: '0.3.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Your Hugging Face API token (get it from https://huggingface.co/settings/tokens)

## Actions

### `document_question_answering`

**Document Question Answering.** Answers a natural-language question about an uploaded document image (invoice, contract, form) with a layout-aware extractive model such as LayoutLM, returning the matching text span and its confidence score. Choose it to pull one specific value out of a scanned document - use image_classification or object_detection for general-purpose vision, and generate_chat_completion when the source text is already plain. Requires both a document image file and a question; read-only and idempotent, since it only analyses the supplied file. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"impira/layoutlm-document-qa"` | Model. Hugging Face document question answering model. One of `"impira/layoutlm-document-qa"`, `"microsoft/layoutlmv3-base"`, `"nielsr/layoutlmv2-finetuned-docvqa"`. |
| `image` | file | yes |  | Document Image. Image of the document to analyze (invoice, contract, etc.) Files are not supported; an action that needs one fails. |
| `question` | string | yes |  | Question. Question to ask about the document (e.g., 'What is the invoice total?') |
| `top_k` | number | no | `1` | Number of Answers. Number of top answers to return. |
| `max_answer_len` | number | no |  | Max Answer Length. Maximum length of predicted answers. |
| `handle_impossible_answer` | boolean | no | `true` | Handle Impossible Answers. Whether to accept 'impossible' as an answer when no answer is found. |
| `lang` | string | no | `"en"` | OCR Language. Language to use for OCR text extraction. One of `"en"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`. |
| `use_cache` | boolean | no | `true` | Use Cache. Use cached results if available. |
| `wait_for_model` | boolean | no | `false` | Wait for Model. Wait for model to load if not ready. |

### `language_translation`

**Language Translation.** Translates a block of text with a dedicated Hugging Face machine-translation model, chosen either from the dropdown of Helsinki-NLP opus-mt language pairs or by passing any translation model ID in the custom-model field, which takes precedence over the dropdown. Use it instead of generate_chat_completion whenever the task is purely translation, since these models are narrower and more consistent; the source and target language codes apply only to multilingual models, because a single-pair model already fixes the direction. Read-only and idempotent: it returns the translation and stores nothing. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"Helsinki-NLP/opus-mt-fr-en"` | Translation Model. Select a translation model or search from 7000+ available models. A value the product loads from the provider, such as an id; write the value itself. |
| `customModel` | string | no |  | Or Enter Custom Model ID. Alternative: Enter any Hugging Face translation model ID directly (e.g., Helsinki-NLP/opus-mt-ja-en) |
| `text` | string | yes |  | Text to Translate. The text content you want to translate. |
| `sourceLanguage` | string | no |  | Source Language (Optional). Source language code (e.g., "en", "es", "fr"). Only needed for multilingual models that support multiple language pairs. |
| `targetLanguage` | string | no |  | Target Language (Optional). Target language code (e.g., "fr", "de", "zh"). Only needed for multilingual models that support multiple language pairs. |
| `cleanUpSpaces` | boolean | no | `true` | Clean Up Extra Spaces. Remove potential extra spaces in the translation output. |
| `maxLength` | number | no |  | Max Translation Length. Maximum length of the translated text (leave empty for default) |
| `useCache` | boolean | no | `true` | Use Cache. Use cached results if available for faster responses. |
| `waitForModel` | boolean | no | `false` | Wait for Model. Wait for model to load if not immediately available. |

Output fields:

- `translatedText`: Translated Text
- `originalText`: Original Text
- `model`: Model
- `sourceLanguage`: Source Language
- `targetLanguage`: Target Language
- `parameters`: Parameters Sent
- `parameters.clean_up_tokenization_spaces`: Clean Up Spaces (boolean)
- `parameters.src_lang`: Source Language Code
- `parameters.tgt_lang`: Target Language Code
- `parameters.max_length`: Max Length (number)
- `rawResult`: Raw Provider Response

### `text_classification`

**Text Classification.** Scores a block of text against a set of labels and returns the ranked predictions, in one of three modes: zero-shot classifies into custom comma-separated categories you supply, pre-trained uses a curated sentiment, emotion, or topic model with its own fixed label set, and search runs any classification model looked up on the Hugging Face hub. Choose it to sort text into a known label set - use generate_chat_completion for open-ended reasoning about the text, text_summarization to condense it, and image_classification when the input is an image rather than text. Zero-shot mode fails without at least one category; read-only and idempotent, as classifying stores nothing. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `classificationMode` | string | yes | `"zero-shot"` | Classification Type. Choose your classification approach. One of `"zero-shot"`, `"pretrained"`, `"search"`. |
| `zeroShotModel` | string | no | `"facebook/bart-large-mnli"` | Zero-Shot Model. Model for classifying into your custom categories. One of `"facebook/bart-large-mnli"`, `"sileod/deberta-v3-base-tasksource-nli"`, `"MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli"`, `"lxyuan/distilbert-base-multilingual-cased-sentiments-student"`. |
| `customLabels` | string | no |  | Custom Categories. Enter categories separated by commas (e.g., "customer support, sales inquiry, spam, billing question") |
| `pretrainedModel` | string | no | `"cardiffnlp/twitter-roberta-base-sentiment-latest"` | Pre-trained Model. Select a specialized pre-trained classification model. One of `"cardiffnlp/twitter-roberta-base-sentiment-latest"`, `"distilbert/distilbert-base-uncased-finetuned-sst-2-english"`, `"nlptown/bert-base-multilingual-uncased-sentiment"`, `"ProsusAI/finbert"`, `"yiyanghkust/finbert-tone"`, `"facebook/roberta-hate-speech-dynabench-r4-target"`, `"tomh/toxigen_hatebert"`, `"Xuhui/ToxDect-roberta-large"`, `"atulgupta002/banking_customer_service_query_intent_classifier"`, `"wesleyacheng/sms-spam-classification-with-bert"`. |
| `searchModel` | string | no |  | Search Models. Search from all available text classification models. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Classify. The text content you want to classify. |
| `topK` | number | no | `3` | Number of Results. Number of top predictions to return. |
| `functionToApply` | string | no | `"softmax"` | Output Function. How to calculate confidence scores. One of `"softmax"`, `"sigmoid"`, `"none"`. |
| `useCache` | boolean | no | `true` | Use Cache. Use cached results for faster responses. |
| `waitForModel` | boolean | no | `false` | Wait for Model. Wait for model to load if not immediately available. |

Output fields:

- `predictions`: Predictions
- `predictions[].label`: Label
- `predictions[].score`: Score (number)
- `topPrediction`: Top Prediction
- `topPrediction.label`: Label
- `topPrediction.score`: Score (number)
- `text`: Text
- `model`: Model
- `classificationMode`: Classification Mode
- `customCategories`: Custom Categories
- `confidenceThreshold`: Confidence Threshold (number)
- `highConfidencePredictions`: High Confidence Predictions
- `highConfidencePredictions[].label`: Label
- `highConfidencePredictions[].score`: Score (number)
- `rawResult`: Raw Provider Response

### `text_summarization`

**Text Summarization.** Condenses one long block of text into a shorter abstractive summary with a Hugging Face summarization model such as BART or Pegasus, targeting either a brief, medium, or detailed length preset or explicit min and max token counts. Choose it over generate_chat_completion when the task is purely summarization, since it decodes greedily for stable output; use text_classification to label the text instead, or language_translation to change its language. Works best on inputs of roughly 512 to 1024 tokens and needs a truncation strategy for anything longer; read-only and idempotent, as it stores nothing. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contentType` | string | yes | `"news"` | Content Type. What type of content are you summarizing? One of `"news"`, `"email"`, `"meeting"`, `"general"`, `"medical"`, `"multilingual"`, `"search"`. |
| `model` | string | yes | `"facebook/bart-large-cnn"` | Summarization Model. Select the best model for your content type. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Summarize. The long text content you want to summarize (most models work best with 512-1024 tokens) |
| `summaryLength` | string | no | `"medium"` | Summary Length. How long should the summary be? One of `"brief"`, `"medium"`, `"detailed"`, `"custom"`. |
| `customMinLength` | number | no |  | Custom Min Length. Minimum number of tokens for the summary. |
| `customMaxLength` | number | no |  | Custom Max Length. Maximum number of tokens for the summary. |
| `cleanUpSpaces` | boolean | no | `true` | Clean Up Extra Spaces. Remove extra spaces and clean up formatting. |
| `truncationStrategy` | string | no | `"longest_first"` | Truncation Strategy. How to handle text that exceeds model limits. One of `"do_not_truncate"`, `"longest_first"`, `"only_first"`, `"only_second"`. |
| `useCache` | boolean | no | `true` | Use Cache. Use cached results for faster responses. |
| `waitForModel` | boolean | no | `false` | Wait for Model. Wait for model to load if not immediately available. |

Output fields:

- `summary`: Summary
- `originalText`: Original Text
- `statistics`: Statistics
- `statistics.originalLength`: Original Length (number)
- `statistics.originalWords`: Original Words (number)
- `statistics.summaryLength`: Summary Length (number)
- `statistics.summaryWords`: Summary Words (number)
- `statistics.compressionRatio`: Compression Ratio
- `statistics.lengthCategory`: Length Category
- `model`: Model
- `contentType`: Content Type
- `businessInsights`: Insights
- `businessInsights.readingTimeSaved`: Reading Time Saved
- `businessInsights.useCase`: Use Case
- `businessInsights.qualityTips`: Quality Tips
- `rawResult`: Raw Provider Response

### `chat_completion`

**Chat Completion.** Runs a free-form chat completion against a Hugging Face instruct model (Llama, Mistral, Qwen and similar) and returns the assistant reply, in one of three conversation modes: a single user message, a multi-turn exchange assembled from a conversation-history array, or a template mode that prepends a canned persona system prompt. This is the only open-ended text generator in this piece - prefer text_summarization to condense a document, language_translation to move text between languages, and text_classification to assign labels from a fixed set. A user message is required in single and template modes; not idempotent: each call is a fresh sampled completion and the wording varies between runs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `useCase` | string | yes | `"faq"` | Use Case. What type of chat assistant are you building? One of `"faq"`, `"content"`, `"chat"`, `"search"`. |
| `model` | string | yes | `"meta-llama/Llama-3.2-1B-Instruct"` | Chat Model. Select the best model for your use case. A value the product loads from the provider, such as an id; write the value itself. |
| `conversationMode` | string | yes | `"single"` | Conversation Mode. How do you want to build the conversation? One of `"single"`, `"multi"`, `"template"`. |
| `userMessage` | string | no |  | User Message. The user message or question to respond to. |
| `systemPrompt` | string | no |  | System Prompt (Optional). Instructions for how the assistant should behave. |
| `conversationHistory` | array | no |  | Conversation History. Previous messages in the conversation (for multi-turn chat) |
| `template` | string | no |  | Response Template. Pre-built templates for common business scenarios. One of `"support"`, `"faq"`, `"writer"`, `"email"`, `"ecommerce"`. |
| `responseLength` | string | no | `"normal"` | Response Length. How long should the response be? One of `"brief"`, `"normal"`, `"detailed"`, `"custom"`. |
| `customMaxTokens` | number | no |  | Custom Max Tokens. Maximum number of tokens to generate. |
| `temperature` | number | no | `0.7` | Creativity Level. How creative should responses be? (0.1 = focused, 1.0 = creative) |
| `topP` | number | no | `0.9` | Response Variety. Controls response diversity (0.1 = focused, 1.0 = varied) |
| `stopSequences` | array | no |  | Stop Sequences (Optional). Text sequences that will stop generation. |
| `frequencyPenalty` | number | no | `0` | Repetition Penalty. Reduce repetitive responses (-2.0 to 2.0) |
| `presencePenalty` | number | no | `0` | Topic Diversity. Encourage diverse topics (-2.0 to 2.0) |
| `useCache` | boolean | no | `true` | Use Cache. Use cached responses for identical requests. |
| `waitForModel` | boolean | no | `false` | Wait for Model. Wait for model to load if not immediately available. |

Output fields:

- `response`: Response
- `conversation`: Conversation
- `conversation.userMessage`: User Message
- `conversation.assistantMessage`: Assistant Message
- `conversation.fullConversation`: Full Conversation
- `conversation.fullConversation[].role`: Role
- `conversation.fullConversation[].content`: Content
- `metadata`: Metadata
- `metadata.model`: Model
- `metadata.useCase`: Use Case
- `metadata.conversationMode`: Conversation Mode
- `metadata.template`: Template
- `metadata.finishReason`: Finish Reason
- `metrics`: Metrics
- `metrics.userMessageLength`: User Message Length (number)
- `metrics.responseLength`: Response Length (number)
- `metrics.tokensUsed`: Tokens Used (number)
- `metrics.promptTokens`: Prompt Tokens (number)
- `metrics.completionTokens`: Completion Tokens (number)
- `metrics.estimatedCost`: Estimated Cost
- `businessInsights`: Insights
- `businessInsights.useCase`: Use Case
- `businessInsights.qualityTips`: Quality Tips
- `businessInsights.nextSteps`: Next Steps
- `rawResult`: Raw Provider Response

### `create_image`

**Create Image.** Generates an image from a text prompt with a Hugging Face text-to-image diffusion model (Stable Diffusion, FLUX and similar), sized by an aspect-ratio preset or custom width and height, and tuned by a quality preset that maps to a denoising-step count. This is the only action here that produces an image; the vision actions image_classification, object_detection, and document_question_answering consume one instead. A non-empty prompt is required; not idempotent: each call renders a new image, and unless an explicit seed is supplied the result differs every run. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `useCase` | string | yes | `"quality"` | Use Case. What type of image generation do you need? One of `"speed"`, `"quality"`, `"business"`, `"search"`. |
| `model` | string | yes |  | Image Generation Model. Select the best model for your use case. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes | `""` | Text Prompt. Describe the image you want to generate. Be specific about style, colors, composition, and details. |
| `aspectRatio` | string | no | `"square"` | Aspect Ratio. Choose the dimensions for your image. One of `"portrait"`, `"landscape"`, `"square"`, `"wide"`, `"custom"`. |
| `customWidth` | number | no |  | Custom Width. Width in pixels (64-1024) |
| `customHeight` | number | no |  | Custom Height. Height in pixels (64-1024) |
| `negativePrompt` | string | no |  | Negative Prompt. Describe what you DON'T want in the image (blur, low quality, distorted, etc.) |
| `qualitySettings` | string | no | `"balanced"` | Quality vs Speed. Balance between image quality and generation time. One of `"fast"`, `"balanced"`, `"quality"`, `"maximum"`, `"custom"`. |
| `customSteps` | number | no |  | Custom Inference Steps. Number of denoising steps (1-100) |
| `guidanceScale` | number | no | `7.5` | Guidance Scale. How closely to follow the prompt (1-20). Higher values = more prompt adherence but may reduce creativity. |
| `seed` | number | no |  | Seed (Optional). Set a seed for reproducible results. Leave empty for random generation. |
| `scheduler` | string | no |  | Scheduler. Advanced: Choose the noise scheduler algorithm. One of `"DPM++2MKarras"`, `"EulerA"`, `"DDIM"`, `"LMS"`. |

Output fields:

- `image`: Image (Base64)
- `imageData`: Image Data
- `imageData.format`: Format
- `imageData.width`: Width (number)
- `imageData.height`: Height (number)
- `imageData.sizeKB`: Size (KB) (number)
- `imageData.base64`: Data URI (image)
- `generation`: Generation
- `generation.prompt`: Prompt
- `generation.negativePrompt`: Negative Prompt
- `generation.model`: Model
- `generation.useCase`: Use Case
- `parameters`: Parameters
- `parameters.width`: Width (number)
- `parameters.height`: Height (number)
- `parameters.aspectRatio`: Aspect Ratio
- `parameters.guidanceScale`: Guidance Scale (number)
- `parameters.inferenceSteps`: Inference Steps (number)
- `parameters.scheduler`: Scheduler
- `parameters.seed`: Seed
- `metrics`: Metrics
- `metrics.generationTimeSeconds`: Generation Time (Seconds) (number)
- `metrics.imageSizeKB`: Image Size (KB) (number)
- `metrics.resolution`: Resolution
- `metrics.qualitySetting`: Quality Setting
- `metrics.estimatedCost`: Estimated Cost
- `businessInsights`: Insights
- `businessInsights.useCase`: Use Case
- `businessInsights.qualityTips`: Quality Tips
- `businessInsights.nextSteps`: Next Steps
- `rawResult`: Raw Provider Response

### `object_detection`

**Object Detection.** Locates the individual objects in an uploaded image with a DETR or YOLOS-style detection model, returning each one with a label, a confidence score, and bounding-box coordinates; a filter preset chooses the confidence cut-off (high, balanced, all, or a custom threshold) and a cap limits how many detections come back. Choose it when the positions or counts of objects matter - prefer image_classification for a single whole-image label, and document_question_answering to read a value out of a document scan. Requires an uploaded image file; read-only and idempotent, as it only analyses the image. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `useCase` | string | yes | `"general"` | Use Case. What type of object detection do you need? One of `"general"`, `"documents"`, `"security"`, `"business"`, `"search"`. |
| `model` | string | yes |  | Detection Model. Select the best model for your detection task. A value the product loads from the provider, such as an id; write the value itself. |
| `image` | file | yes |  | Image to Analyze. Upload an image for object detection. Supports JPG, PNG, WebP formats. Files are not supported; an action that needs one fails. |
| `confidenceThreshold` | number | no | `0.5` | Confidence Threshold. Minimum confidence score for detections (0.1-0.9). Higher values = fewer but more accurate detections. |
| `maxDetections` | number | no | `50` | Max Detections. Maximum number of objects to detect (1-100) |
| `filterSettings` | string | no | `"balanced"` | Detection Filter. How to handle detection results. One of `"high_confidence"`, `"balanced"`, `"all_results"`, `"custom"`. |
| `outputFormat` | string | no | `"business"` | Output Format. How to structure the detection results. One of `"business"`, `"technical"`, `"analytics"`, `"comprehensive"`. |

Output fields:

- `detections`: Detections
- `detections[].id`: ID (number)
- `detections[].label`: Label
- `detections[].confidence`: Confidence (number)
- `detections[].confidencePercent`: Confidence (%) (number)
- `detections[].boundingBox`: Bounding Box
- `detections[].boundingBox.xmin`: X Min (number)
- `detections[].boundingBox.ymin`: Y Min (number)
- `detections[].boundingBox.xmax`: X Max (number)
- `detections[].boundingBox.ymax`: Y Max (number)
- `detections[].metadata`: Metadata
- `detections[].metadata.area`: Area (number)
- `detections[].metadata.center`: Center
- `detections[].metadata.center.x`: X (number)
- `detections[].metadata.center.y`: Y (number)
- `detections[].metadata.width`: Width (number)
- `detections[].metadata.height`: Height (number)
- `summary`: Summary
- `summary.totalObjectsDetected`: Total Objects Detected (number)
- `summary.objectCategories`: Object Categories (number)
- `summary.mostFrequentObject`: Most Frequent Object
- `summary.averageConfidence`: Average Confidence (number)
- `summary.highConfidenceDetections`: High Confidence Detections (number)
- `technical`: Technical
- `technical.model`: Model
- `technical.threshold`: Threshold (number)
- `technical.processingTime`: Processing Time (number)
- `technical.imageFormat`: Image Format
- `technical.detectionCount`: Detection Count (number)
- `technical.truncated`: Truncated (boolean)
- `analytics`: Analytics
- `analytics.labelDistribution`: Label Distribution (an object whose keys vary)
- `analytics.confidenceStatistics`: Confidence Statistics
- `analytics.confidenceStatistics.average`: Average (number)
- `analytics.confidenceStatistics.maximum`: Maximum (number)
- `analytics.confidenceStatistics.minimum`: Minimum (number)
- `analytics.confidenceStatistics.standardDeviation`: Standard Deviation (number)
- `analytics.qualityMetrics`: Quality Metrics
- `analytics.qualityMetrics.highQuality`: High Quality (number)
- `analytics.qualityMetrics.mediumQuality`: Medium Quality (number)
- `analytics.qualityMetrics.lowQuality`: Low Quality (number)
- `detection`: Detection
- `detection.useCase`: Use Case
- `detection.model`: Model
- `detection.imageFile`: Image File
- `detection.threshold`: Threshold (number)
- `detection.maxDetections`: Max Detections (number)
- `metrics`: Metrics
- `metrics.detectionTimeSeconds`: Detection Time (Seconds) (number)
- `metrics.totalDetections`: Total Detections (number)
- `metrics.displayedDetections`: Displayed Detections (number)
- `metrics.averageConfidence`: Average Confidence (number)
- `metrics.processingCost`: Processing Cost
- `businessInsights`: Insights
- `businessInsights.useCase`: Use Case
- `businessInsights.detectionTips`: Detection Tips
- `businessInsights.nextSteps`: Next Steps
- `rawResults`: Raw Provider Response

### `image_classification`

**Image Classification.** Assigns category labels to a whole image, supplied either as an uploaded file or as a URL the action fetches, in one of two modes: standard mode returns labels from the set the pre-trained model was trained on, while zero-shot mode scores the image against custom candidate categories you supply. Pick it for whole-image tagging or moderation; use object_detection when the positions or counts of individual objects matter, and document_question_answering to read a specific value out of a scanned document. Zero-shot mode requires a non-empty category list; read-only and idempotent, as it only analyses the image. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `classificationMode` | string | yes | `"standard"` | Classification Mode. How do you want to classify your images? One of `"standard"`, `"zero_shot"`. |
| `useCase` | string | yes | `"general"` | Use Case. What type of image classification do you need? One of `"moderation"`, `"general"`, `"people"`, `"creative"`, `"business"`, `"search"`. |
| `model` | string | yes |  | Classification Model. Select the best model for your use case. A value the product loads from the provider, such as an id; write the value itself. |
| `imageSource` | string | yes | `"upload"` | Image Source. How do you want to provide the image? One of `"upload"`, `"url"`. |
| `imageFile` | file | yes |  | Image File. Upload an image file for classification (JPG, PNG, WebP) Files are not supported; an action that needs one fails. |
| `imageUrl` | string | yes |  | Image URL. URL of the image to classify. |
| `customCategories` | array | yes |  | Custom Categories. Enter the categories you want to classify the image into (e.g., "dog", "cat", "bird") |
| `hypothesisTemplate` | string | no | `"This image shows {}"` | Classification Template. Template for classification (advanced). Default: "This image shows {}". |
| `topK` | number | no | `5` | Number of Results. Maximum number of classification results to return (1-20) |
| `confidenceThreshold` | number | no | `0.1` | Confidence Threshold. Minimum confidence score for results (0.0-1.0) |
| `outputFormat` | string | no | `"business"` | Output Format. How to structure the classification results. One of `"business"`, `"technical"`, `"analytics"`, `"comprehensive"`. |

Output fields:

- `classifications`: Classifications
- `classifications[].rank`: Rank (number)
- `classifications[].label`: Label
- `classifications[].confidence`: Confidence (number)
- `classifications[].confidencePercent`: Confidence (%) (number)
- `classifications[].category`: Category
- `classifications[].isHighConfidence`: High Confidence (boolean)
- `classifications[].isMediumConfidence`: Medium Confidence (boolean)
- `classifications[].isLowConfidence`: Low Confidence (boolean)
- `summary`: Summary
- `summary.topCategory`: Top Category
- `summary.topConfidence`: Top Confidence (number)
- `summary.totalCategories`: Total Categories (number)
- `summary.highConfidenceResults`: High Confidence Results (number)
- `summary.recommendedAction`: Recommended Action
- `classification`: Classification
- `classification.mode`: Mode
- `classification.useCase`: Use Case
- `classification.model`: Model
- `classification.topCategory`: Top Category
- `classification.confidence`: Confidence (number)
- `metrics`: Metrics
- `metrics.processingTimeSeconds`: Processing Time (Seconds) (number)
- `metrics.totalResults`: Total Results (number)
- `metrics.displayedResults`: Displayed Results (number)
- `metrics.averageConfidence`: Average Confidence (number)
- `metrics.estimatedCost`: Estimated Cost
- `businessInsights`: Insights
- `businessInsights.useCase`: Use Case
- `businessInsights.classificationTips`: Classification Tips
- `businessInsights.nextSteps`: Next Steps
- `rawResults`: Raw Provider Response

### `search_models`

**Search Models.** Searches the Hugging Face Hub model catalogue by free text, author, tag filters, pipeline task and Inference Provider availability, returning one page of model summaries plus a next_cursor. Use it to find a model ID before calling Get Model, Generate Chat Completion (pipeline_tag 'text-generation', inference_provider 'all') or Generate Text Embeddings (pipeline_tag 'feature-extraction'); use Search Datasets or Search Spaces for other repo types. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Free-text match on the model ID, for example 'llama' or 'bert-base'. |
| `author` | string | no |  | Author. Only models owned by this user or organization, for example 'meta-llama'. |
| `filter` | array | no |  | Tag Filters. Hub tags every result must carry, for example 'text-classification', 'pytorch', 'license:apache-2.0' or 'language:en'. Discover valid values with List Hub Tags by Type. |
| `pipeline_tag` | string | no |  | Pipeline Task. Only models for this task, for example 'text-generation', 'feature-extraction' or 'image-classification'. |
| `inference_provider` | string | no |  | Inference Provider. Only models served by Inference Providers: 'all' for any provider, or one provider name such as 'groq', 'together' or 'hf-inference'. |
| `sort` | string | no |  | Sort By. Sort order (always descending). Defaults to trending. One of `"trendingScore"`, `"downloads"`, `"likes"`, `"createdAt"`, `"lastModified"`. |
| `limit` | number | no | `20` | Limit. Maximum number of results in this page (1 to 1000). |
| `full` | boolean | no | `false` | Include Full Details. Return extra fields such as the file list and last-modified date for each model. |
| `cursor` | string | no |  | Cursor. The 'next_cursor' value returned by a previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `models`: Models
- `models[].id`: Repo ID
- `models[].likes`: Likes (number)
- `models[].trendingScore`: Trending Score (number)
- `models[].private`: Private (boolean)
- `models[].tags`: Tags
- `models[].createdAt`: Created At (datetime)
- `models[].pipeline_tag`: Pipeline Task
- `models[].library_name`: Library
- `models[].downloads`: Downloads (number)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `search_datasets`

**Search Datasets.** Searches Hugging Face Hub datasets by free text, author, tag filters and gating, returning one page of dataset summaries plus a next_cursor. Task filtering goes through Tag Filters (for example 'task_categories:text-classification'), not a pipeline field. Use Get Dataset for one dataset's metadata and Search Models or Search Spaces for other repo types. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Free-text match on the dataset ID, for example 'imdb' or 'squad'. |
| `author` | string | no |  | Author. Only datasets owned by this user or organization, for example 'stanfordnlp'. |
| `filter` | array | no |  | Tag Filters. Hub tags every result must carry, for example 'task_categories:text-classification', 'language:en' or 'size_categories:10K<n<100K'. Discover valid values with List Hub Tags by Type. |
| `gated` | string | no |  | Gated. Only gated datasets, only non-gated datasets, or leave empty for both. One of `"true"`, `"false"`. |
| `sort` | string | no |  | Sort By. Sort order (always descending). Defaults to trending. One of `"trendingScore"`, `"downloads"`, `"likes"`, `"createdAt"`, `"lastModified"`. |
| `limit` | number | no | `20` | Limit. Maximum number of results in this page (1 to 1000). |
| `full` | boolean | no | `false` | Include Full Details. Return extra fields such as the card data and file list for each dataset. |
| `cursor` | string | no |  | Cursor. The 'next_cursor' value returned by a previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `datasets`: Datasets
- `datasets[].id`: Repo ID
- `datasets[].likes`: Likes (number)
- `datasets[].trendingScore`: Trending Score (number)
- `datasets[].private`: Private (boolean)
- `datasets[].tags`: Tags
- `datasets[].createdAt`: Created At (datetime)
- `datasets[].author`: Author
- `datasets[].description`: Description
- `datasets[].downloads`: Downloads (number)
- `datasets[].lastModified`: Last Modified (datetime)
- `datasets[].gated`: Gated
- `datasets[].disabled`: Disabled (boolean)
- `datasets[].sha`: Latest Commit SHA
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `search_spaces`

**Search Spaces.** Searches Hugging Face Spaces (hosted Gradio, Docker or static ML apps) by free text, author and tag filters, returning one page of Space summaries plus a next_cursor. Use Get Space for one Space's SDK, hardware and runtime stage; use Search Models or Search Datasets for other repo types. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Free-text match on the Space ID, for example 'whisper' or 'chatbot'. |
| `author` | string | no |  | Author. Only Spaces owned by this user or organization, for example 'huggingface'. |
| `filter` | array | no |  | Tag Filters. Hub tags every result must carry, for example 'gradio', 'docker' or 'region:us'. |
| `sort` | string | no |  | Sort By. Sort order (always descending). Defaults to trending. One of `"trendingScore"`, `"likes"`, `"createdAt"`, `"lastModified"`. |
| `limit` | number | no | `20` | Limit. Maximum number of results in this page (1 to 1000). |
| `full` | boolean | no | `false` | Include Full Details. Return extra fields such as the card data and file list for each Space. |
| `cursor` | string | no |  | Cursor. The 'next_cursor' value returned by a previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `spaces`: Spaces
- `spaces[].id`: Repo ID
- `spaces[].likes`: Likes (number)
- `spaces[].trendingScore`: Trending Score (number)
- `spaces[].private`: Private (boolean)
- `spaces[].tags`: Tags
- `spaces[].createdAt`: Created At (datetime)
- `spaces[].sdk`: SDK
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_model`

**Get Model.** Returns the Hub metadata of one model: card data, tags, pipeline_tag, library, file list (siblings), gating, downloads and likes, optionally at a specific revision. Use it after Search Models to inspect a model before running it or reading its files with Read Repo File. Legacy un-namespaced IDs such as 'gpt2' are followed to their canonical owner. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `revision` | string | no |  | Revision. Optional branch, tag, or commit SHA, for example 'main' or 'refs/pr/1'. Leave empty for the default branch. |

Output fields:

- `id`: Repo ID
- `author`: Author
- `tags`: Tags
- `likes`: Likes (number)
- `sha`: Latest Commit SHA
- `lastModified`: Last Modified (datetime)
- `createdAt`: Created At (datetime)
- `private`: Private (boolean)
- `gated`: Gated
- `disabled`: Disabled (boolean)
- `usedStorage`: Used Storage (filesize)
- `pipeline_tag`: Pipeline Task
- `library_name`: Library
- `downloads`: Downloads (Last 30 Days) (number)
- `cardData`: Model Card Metadata
- `cardData.license`: License
- `cardData.language`: Language
- `safetensors`: Safetensors
- `safetensors.total`: Total Parameters (number)
- `siblings`: Files
- `siblings[].rfilename`: File Path
- `spaces`: Spaces Using This Model

### `get_dataset`

**Get Dataset.** Returns the Hub repository metadata of one dataset: card data, tags, file list (siblings), gating, downloads and likes, optionally at a specific revision. Use it after Search Datasets to inspect a dataset repository; its README or other text files can then be read with Read Repo File. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `revision` | string | no |  | Revision. Optional branch, tag, or commit SHA, for example 'main' or 'refs/pr/1'. Leave empty for the default branch. |

Output fields:

- `id`: Repo ID
- `author`: Author
- `tags`: Tags
- `likes`: Likes (number)
- `sha`: Latest Commit SHA
- `lastModified`: Last Modified (datetime)
- `createdAt`: Created At (datetime)
- `private`: Private (boolean)
- `gated`: Gated
- `disabled`: Disabled (boolean)
- `usedStorage`: Used Storage (filesize)
- `description`: Description
- `downloads`: Downloads (Last 30 Days) (number)
- `paperswithcode_id`: Papers with Code ID
- `cardData`: Dataset Card Metadata
- `cardData.pretty_name`: Pretty Name
- `cardData.license`: License
- `cardData.language`: Language
- `cardData.task_categories`: Task Categories
- `cardData.size_categories`: Size Categories
- `siblings`: Files
- `siblings[].rfilename`: File Path

### `get_space`

**Get Space.** Returns the Hub metadata of one Space: its SDK, runtime stage (for example RUNNING, BUILDING, SLEEPING or RUNTIME_ERROR), hardware, file list, tags and likes, optionally at a specific revision. Use it after Search Spaces to check whether a Space is up and how it is built. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `revision` | string | no |  | Revision. Optional branch, tag, or commit SHA, for example 'main' or 'refs/pr/1'. Leave empty for the default branch. |

Output fields:

- `id`: Repo ID
- `author`: Author
- `tags`: Tags
- `likes`: Likes (number)
- `sha`: Latest Commit SHA
- `lastModified`: Last Modified (datetime)
- `createdAt`: Created At (datetime)
- `private`: Private (boolean)
- `gated`: Gated
- `disabled`: Disabled (boolean)
- `usedStorage`: Used Storage (filesize)
- `sdk`: SDK
- `host`: App URL (url)
- `subdomain`: Subdomain
- `region`: Region
- `cardData`: Space Card Metadata
- `cardData.title`: Title
- `cardData.emoji`: Emoji
- `cardData.sdk_version`: SDK Version
- `cardData.app_file`: App File
- `runtime`: Runtime
- `runtime.stage`: Stage
- `runtime.hardware`: Hardware
- `runtime.hardware.current`: Current
- `runtime.hardware.requested`: Requested
- `siblings`: Files
- `siblings[].rfilename`: File Path

### `list_trending_repos`

**List Trending Repos.** Lists the models, datasets and Spaces currently trending on the Hugging Face Hub (up to 20), each tagged with its repo_type. Use it to answer "what is popular right now"; for keyword or tag search use Search Models, Search Datasets or Search Spaces instead. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no | `"all"` | Repository Type. Only trending repositories of this type. Defaults to all types. One of `"all"`, `"model"`, `"dataset"`, `"space"`. |
| `limit` | number | no | `10` | Limit. Number of trending repositories to return (1 to 20). Defaults to 10. |

Output fields:

- `repos`: Trending Repos
- `repos[].repo_type`: Repo Type
- `repos[].id`: Repo ID
- `repos[].author`: Author
- `repos[].likes`: Likes (number)
- `repos[].downloads`: Downloads (number)
- `repos[].lastModified`: Last Modified (datetime)
- `repos[].gated`: Gated
- `repos[].private`: Private (boolean)
- `repos[].pipeline_tag`: Pipeline Task
- `repos[].numParameters`: Parameters (number)
- `repos[].title`: Title
- `repos[].emoji`: Emoji
- `repos[].shortDescription`: Short Description
- `repos[].ai_short_description`: AI Short Description
- `repos[].ai_category`: AI Category
- `repos[].runtime`: Runtime
- `repos[].runtime.stage`: Stage
- `count`: Count (number)

### `list_hub_tags`

**List Hub Tags by Type.** Lists the Hub's valid filter tags for models or datasets, grouped by tag type (for models: pipeline_tag, library, language, license and more; for datasets: task_categories, size_categories, modality, format and more). Call it to find the exact 'filter' values to pass to Search Models or Search Datasets. Spaces have no tag catalogue. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. Whose tags to list: 'model' or 'dataset'. One of `"model"`, `"dataset"`. |
| `tag_type` | string | no |  | Tag Type. Only tags of this type. Models: pipeline_tag, library, dataset, language, license, arxiv, doi, region, deploy, other. Datasets: benchmark, task_categories, task_ids, size_categories, modality, format, library, language, license, arxiv, doi, region, annotations_creators, language_creators, multiling… |

### `list_repo_files`

**List Repo Files.** Lists the files and folders under a path of a Hub repository at a revision, one page per call with a next_cursor; each entry carries its type, path, size and LFS info. Use it to discover file paths before Read Repo File or Get File/Folder Info; set Recursive to walk sub-folders. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `revision` | string | no | `"main"` | Revision. Branch, tag, or commit SHA to read, for example 'main', 'v1.0' or 'refs/pr/1'. Defaults to 'main'. List available refs with List Branches & Tags. |
| `path` | string | no |  | Folder Path. Folder inside the repository to list, for example 'onnx' or 'data/train'. Leave empty for the root. |
| `recursive` | boolean | no | `false` | Recursive. List every file in sub-folders too. |
| `expand` | boolean | no | `false` | Include Last Commit. Add the last commit and security-scan status to each entry. Limits a page to 100 entries. |
| `limit` | number | no |  | Limit. Maximum entries in this page: up to 1000, or up to 100 when Include Last Commit is on. |
| `cursor` | string | no |  | Cursor. The 'next_cursor' value returned by a previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `files`: Files
- `files[].path`: Path
- `files[].type`: Type
- `files[].size`: Size (filesize)
- `files[].oid`: Git Object ID
- `files[].lfs`: LFS
- `files[].lfs.size`: Size (filesize)
- `files[].lfs.oid`: SHA-256
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_repo_paths_info`

**Get File/Folder Info.** Returns details for up to 2000 known paths in a Hub repository at a revision: type (file or directory), size, blob id, LFS info and, with Include Last Commit, the last commit and security status. Use it when you already know the paths (from List Repo Files) and need their sizes, for example to check a file fits the Read Repo File limit. Read-only and safe to retry; paths that do not exist are simply left out. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `revision` | string | no | `"main"` | Revision. Branch, tag, or commit SHA to read, for example 'main', 'v1.0' or 'refs/pr/1'. Defaults to 'main'. List available refs with List Branches & Tags. |
| `paths` | array | yes |  | Paths. File or folder paths inside the repository, for example 'config.json' or 'onnx/model.onnx'. Up to 2000. |
| `expand` | boolean | no | `false` | Include Last Commit. Add the last commit and security-scan status for each path. |

Output fields:

- `paths`: Paths
- `paths[].path`: Path
- `paths[].type`: Type
- `paths[].size`: Size (filesize)
- `paths[].oid`: Git Object ID
- `paths[].lastCommit`: Last Commit
- `paths[].lastCommit.id`: Commit SHA
- `paths[].lastCommit.title`: Title
- `paths[].lastCommit.date`: Date (datetime)
- `paths[].securityFileStatus`: Security Status
- `paths[].securityFileStatus.status`: Overall Status
- `count`: Count (number)

### `read_repo_file`

**Read Repo File.** Downloads one UTF-8 text file from a model, dataset or Space repository at a revision and returns its content, for example README.md, config.json or a training script. Files over 1 MiB or binary files (weights, images, parquet) fail with FILE_TOO_LARGE or BINARY_FILE and the download URL instead; check sizes first with Get File/Folder Info. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `path` | string | yes |  | File Path. Path of the file inside the repository, for example 'README.md' or 'configs/config.json'. |
| `revision` | string | no | `"main"` | Revision. Branch, tag, or commit SHA to read, for example 'main', 'v1.0' or 'refs/pr/1'. Defaults to 'main'. List available refs with List Branches & Tags. |

Output fields:

- `content`: Content
- `path`: Path
- `size_bytes`: Size (filesize)
- `url`: Download URL (url)
- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `revision`: Revision

### `list_repo_commits`

**List Repo Commits.** Lists the commit history of a Hub repository revision, newest first, one page per call (page-number pagination with next_page); each commit carries its id, title, message, authors and date. Use commit ids as revisions for Compare Revisions or Read Repo File; use List Branches & Tags to find branch names. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `revision` | string | no | `"main"` | Revision. Branch, tag, or commit SHA to read, for example 'main', 'v1.0' or 'refs/pr/1'. Defaults to 'main'. List available refs with List Branches & Tags. |
| `page` | number | no | `0` | Page. Zero-based page number. Use 0 for the first page, then the returned next_page value. |
| `limit` | number | no | `50` | Limit. Maximum number of results in this page (1 to 1000). |

Output fields:

- `commits`: Commits
- `commits[].id`: Commit SHA
- `commits[].title`: Title
- `commits[].message`: Message
- `commits[].date`: Date (datetime)
- `commits[].authors`: Authors
- `commits[].authors[].user`: Username
- `commits[].authors[].avatar`: Avatar (image)
- `count`: Count (number)
- `page`: Page (number)
- `next_page`: Next Page (number)

### `list_repo_refs`

**List Branches & Tags.** Lists every git ref of a Hub repository: branches, tags, converted refs (such as 'refs/convert/parquet') and, optionally, pull-request refs ('refs/pr/N'), each with its target commit. Use it to find a valid revision before reading files, listing commits or comparing revisions. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `include_prs` | boolean | no | `false` | Include Pull Request Refs. Also list the 'refs/pr/N' refs of open and closed pull requests. |

Output fields:

- `branches`: Branches
- `branches[].name`: Name
- `branches[].ref`: Ref
- `branches[].targetCommit`: Target Commit
- `tags`: Tags
- `tags[].name`: Name
- `tags[].ref`: Ref
- `tags[].targetCommit`: Target Commit
- `converts`: Converts
- `converts[].name`: Name
- `converts[].ref`: Ref
- `converts[].targetCommit`: Target Commit
- `pullRequests`: Pull Requests
- `pullRequests[].name`: Name
- `pullRequests[].ref`: Ref
- `pullRequests[].targetCommit`: Target Commit

### `compare_repo_revisions`

**Compare Revisions.** Returns the raw git diff between two revisions (branches, tags or commit ids) of a Hub repository, for example to see what a pull request ref changes against main. The diff is cut at 100000 characters and truncated is set when that happens; large binary or LFS changes appear only as pointer changes. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `base` | string | yes |  | Base Revision. The older revision, for example 'main', 'v1.0' or a commit id. |
| `head` | string | yes |  | Head Revision. The newer revision, for example 'refs/pr/1' or a commit id. |

Output fields:

- `diff`: Diff
- `base`: Base Revision
- `head`: Head Revision
- `truncated`: Truncated (boolean)
- `diff_length`: Diff Length (number)

### `get_repo_size`

**Get Repo Size.** Returns the total size in bytes of every file under a path of a Hub repository at a revision (the whole repository when the path is empty), counting LFS files at their real size. Use it to judge download cost before fetching a model; for per-file sizes use List Repo Files or Get File/Folder Info. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `revision` | string | no | `"main"` | Revision. Branch, tag, or commit SHA to read, for example 'main', 'v1.0' or 'refs/pr/1'. Defaults to 'main'. List available refs with List Branches & Tags. |
| `path` | string | no |  | Folder Path. Folder to measure, for example 'onnx'. Leave empty for the whole repository. |

Output fields:

- `path`: Path
- `size`: Size (filesize)

### `get_repo_security_scan`

**Get Security Scan.** Returns the Hub's malware and pickle-import security scan status for a repository: whether scans are done and which files were flagged, each with a level such as safe, caution, suspicious or unsafe. Use it as a safety check before recommending that someone download or load a model's weights. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |

Output fields:

- `scansDone`: Scans Done (boolean)
- `filesWithIssues`: Files With Issues

### `get_current_user`

**Get Current User & Token.** Returns the account behind the connected token (username, full name, email, PRO status, organizations with the user's role in each) and the token's name, role ('read', 'write' or 'fineGrained') and fine-grained permissions. Call it first to learn the username or organization namespaces, or to diagnose 401/403 errors: a 'read' token cannot perform Hub writes. Never returns the token value. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `username`: Username
- `full_name`: Full Name
- `email`: Email (email)
- `email_verified`: Email Verified (boolean)
- `is_pro`: Is Pro (boolean)
- `avatar_url`: Avatar URL
- `account_type`: Account Type
- `organizations`: Organizations
- `organizations[].name`: Name
- `organizations[].full_name`: Full Name
- `organizations[].role_in_org`: Role
- `organizations[].is_enterprise`: Is Enterprise (boolean)
- `token_name`: Token Name
- `token_created_at`: Token Created At (datetime)
- `token_role`: Token Role
- `token_can_read_gated_repos`: Token Can Read Gated Repos (boolean)
- `token_global_permissions`: Token Global Permissions
- `token_scoped_permissions`: Token Scoped Permissions
- `token_scoped_permissions[].entity_type`: Entity Type
- `token_scoped_permissions[].entity_name`: Entity Name
- `token_scoped_permissions[].permissions`: Permissions

### `get_user_overview`

**Get User Profile.** Returns the public profile of a Hugging Face user: full name, avatar URL, PRO status, organizations, follower counts and how many models, datasets and Spaces they own. Use Get Current User & Token for the connected account itself and Get Organization Profile for an organization. Social handles are not included. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The user's Hub username, for example 'julien-c'. |

Output fields:

- `user`: Username
- `fullname`: Full Name
- `type`: Account Type
- `details`: Bio
- `avatarUrl`: Avatar (image)
- `isPro`: Is Pro (boolean)
- `createdAt`: Joined At (datetime)
- `numModels`: Models (number)
- `numDatasets`: Datasets (number)
- `numSpaces`: Spaces (number)
- `numPapers`: Papers (number)
- `numDiscussions`: Discussions (number)
- `numUpvotes`: Upvotes (number)
- `numLikes`: Likes (number)
- `numFollowers`: Followers (number)
- `numFollowing`: Following (number)
- `orgs`: Organizations
- `orgs[].name`: Name
- `orgs[].fullname`: Full Name

### `get_organization_overview`

**Get Organization Profile.** Returns the public profile of a Hugging Face organization: full name, avatar URL, verification and Enterprise status, follower and member counts, and how many models, datasets and Spaces it owns. Use List Organization Members for its members and Get User Profile for an individual user. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization` | string | yes |  | Organization. The organization's Hub name, for example 'huggingface' or 'meta-llama'. |

Output fields:

- `name`: Name
- `fullname`: Full Name
- `details`: Description
- `avatarUrl`: Avatar (image)
- `isVerified`: Verified (boolean)
- `plan`: Plan
- `numUsers`: Members (number)
- `numModels`: Models (number)
- `numDatasets`: Datasets (number)
- `numSpaces`: Spaces (number)
- `numPapers`: Papers (number)
- `numFollowers`: Followers (number)

### `list_organization_members`

**List Organization Members.** Lists the members of a Hugging Face organization, one page per call with a next_cursor; each member has a username, full name, avatar and, where visible, their org role. Optionally narrow by a name search. The Email filter and member emails are only available to organization admins; other tokens should leave Email empty. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization` | string | yes |  | Organization. The organization's Hub name, for example 'huggingface'. |
| `search` | string | no |  | Search. Only members whose username or full name matches this text. |
| `email` | string | no |  | Email. Only the member with this email address. Organization admins only. |
| `limit` | number | no | `100` | Limit. Maximum number of results in this page (1 to 10000). |
| `cursor` | string | no |  | Cursor. The 'next_cursor' value returned by a previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `members`: Members
- `members[].user`: Username
- `members[].fullname`: Full Name
- `members[].type`: Account Type
- `members[].isPro`: Is Pro (boolean)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `list_discussions`

**List Discussions & PRs.** Lists the discussions and pull requests of a model, dataset or Space repository, one page per call (page-number pagination with next_page), filterable by kind, status, author and text search. Each entry carries its per-repository number, which Get Discussion or PR needs. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `kind` | string | no | `"all"` | Kind. Only discussions, only pull requests, or both. Defaults to both. One of `"all"`, `"discussion"`, `"pull_request"`. |
| `status` | string | no | `"all"` | Status. Only open, only closed, or both. Defaults to both. One of `"all"`, `"open"`, `"closed"`. |
| `author` | string | no |  | Author. Only threads opened by this Hub username, for example 'julien-c'. |
| `search` | string | no |  | Search. Only threads whose title matches this text. |
| `sort` | string | no | `"recently-created"` | Sort By. Sort order. Defaults to most recently created. One of `"recently-created"`, `"trending"`, `"reactions"`. |
| `page` | number | no | `0` | Page. Zero-based page number. Use 0 for the first page, then the returned next_page value. |

Output fields:

- `discussions`: Discussions
- `discussions[].num`: Number (number)
- `discussions[].title`: Title
- `discussions[].status`: Status
- `discussions[].isPullRequest`: Is Pull Request (boolean)
- `discussions[].pinned`: Pinned (boolean)
- `discussions[].createdAt`: Created At (datetime)
- `discussions[].author`: Author
- `discussions[].author.name`: Username
- `discussions[].author.fullname`: Full Name
- `discussions[].author.type`: Account Type
- `discussions[].repo`: Repo
- `discussions[].repo.name`: Repo ID
- `discussions[].repo.type`: Repo Type
- `discussions[].numComments`: Comments (number)
- `count`: Count (number)
- `total_count`: Total Count (number)
- `page`: Page (number)
- `next_page`: Next Page (number)

### `get_discussion`

**Get Discussion or PR.** Returns one discussion or pull request of a Hub repository by its per-repository number: title, status, author, every comment and status/title event and, for pull requests, the diff URL, target branch and merge info. Get the number from List Discussions & PRs. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `discussion_number` | number | yes |  | Discussion Number. The discussion or pull request number within the repository, for example 12 (the 'num' from List Discussions & PRs). |

Output fields:

- `num`: Number (number)
- `title`: Title
- `status`: Status
- `isPullRequest`: Is Pull Request (boolean)
- `pinned`: Pinned (boolean)
- `createdAt`: Created At (datetime)
- `author`: Author
- `author.name`: Username
- `author.fullname`: Full Name
- `author.type`: Account Type
- `repo`: Repo
- `repo.name`: Repo ID
- `repo.type`: Repo Type
- `locked`: Locked (boolean)
- `events`: Events
- `events[].id`: Event ID
- `events[].type`: Event Type
- `events[].createdAt`: Created At (datetime)
- `events[].author`: Author
- `events[].author.name`: Username
- `events[].author.fullname`: Full Name
- `events[].author.type`: Account Type
- `events[].data`: Data
- `events[].data.latest`: Latest Version
- `events[].data.latest.raw`: Text (Markdown)
- `events[].data.latest.html`: Text (HTML) (html)
- `events[].data.latest.updatedAt`: Updated At (datetime)
- `events[].data.edited`: Edited (boolean)
- `events[].data.hidden`: Hidden (boolean)
- `events[].data.numEdits`: Edit Count (number)

### `list_daily_papers`

**List Daily Papers.** Lists the research papers featured on Hugging Face Daily Papers for one day, ISO week or month (or the latest when none is given), sorted by publish date or trending, one page per call with next_page. Set at most one of Date, Week or Month. Use Search Papers to find papers by topic and Get Paper for one paper's details. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `date` | string | no |  | Date. Papers featured on this day, in 'YYYY-MM-DD' form, for example '2026-09-22'. |
| `week` | string | no |  | Week. Papers featured in this ISO week, in 'YYYY-Www' form, for example '2026-W38'. |
| `month` | string | no |  | Month. Papers featured in this month, in 'YYYY-MM' form, for example '2026-09'. |
| `submitter` | string | no |  | Submitter. Only papers submitted by this Hub username. |
| `sort` | string | no | `"publishedAt"` | Sort By. Sort order. Defaults to publish date. One of `"publishedAt"`, `"trending"`. |
| `limit` | number | no | `50` | Limit. Maximum number of results in this page (1 to 100). |
| `page` | number | no | `0` | Page. Zero-based page number. Use 0 for the first page, then the returned next_page value. |

Output fields:

- `papers`: Papers
- `papers[].title`: Title
- `papers[].publishedAt`: Published At (datetime)
- `papers[].thumbnail`: Thumbnail (image)
- `papers[].numComments`: Comments (number)
- `papers[].paper`: Paper
- `papers[].paper.id`: Paper ID
- `papers[].paper.title`: Title
- `papers[].paper.summary`: Abstract
- `papers[].paper.publishedAt`: Published At (datetime)
- `papers[].paper.upvotes`: Upvotes (number)
- `papers[].paper.authors`: Authors
- `papers[].paper.authors[].name`: Name
- `papers[].paper.discussionId`: Discussion ID
- `papers[].paper.submittedOnDailyAt`: Submitted to Daily Papers At (datetime)
- `papers[].submittedBy`: Submitted By
- `papers[].submittedBy.name`: Username
- `papers[].submittedBy.fullname`: Full Name
- `papers[].submittedBy.type`: Account Type
- `count`: Count (number)
- `page`: Page (number)
- `next_page`: Next Page (number)

### `search_papers`

**Search Papers.** Searches the research papers indexed on Hugging Face Papers with a hybrid semantic and full-text query, returning up to 120 matches with their arXiv-style IDs, titles, authors and summaries. Use it to find papers on a topic; use List Daily Papers for what was featured on a given day and Get Paper for one paper's full details. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. What to search for, up to 250 characters, for example 'retrieval augmented generation'. |
| `limit` | number | no | `20` | Limit. Maximum number of results in this page (1 to 120). |

Output fields:

- `papers`: Papers
- `papers[].title`: Title
- `papers[].publishedAt`: Published At (datetime)
- `papers[].thumbnail`: Thumbnail (image)
- `papers[].numComments`: Comments (number)
- `papers[].paper`: Paper
- `papers[].paper.id`: Paper ID
- `papers[].paper.title`: Title
- `papers[].paper.summary`: Abstract
- `papers[].paper.publishedAt`: Published At (datetime)
- `papers[].paper.upvotes`: Upvotes (number)
- `papers[].paper.authors`: Authors
- `papers[].paper.authors[].name`: Name
- `papers[].paper.discussionId`: Discussion ID
- `papers[].paper.ai_summary`: AI Summary
- `papers[].paper.ai_keywords`: AI Keywords
- `count`: Count (number)

### `get_paper`

**Get Paper.** Returns one research paper on Hugging Face Papers by its arXiv ID: title, authors, summary, publish date, upvotes and linked resources, plus its discussion comments (with comment IDs) when Include Comments is on. Get the ID from Search Papers or List Daily Papers. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paper_id` | string | yes |  | Paper ID. The paper's arXiv ID, for example '2307.09288'. |
| `include_comments` | boolean | no | `false` | Include Comments. Also return the comments on the paper page, with their comment IDs. |
| `include_submission_deadline` | boolean | no | `false` | Include Submission Deadline. Also return the conference submission deadline linked to the paper, when there is one. |

Output fields:

- `id`: Paper ID
- `title`: Title
- `summary`: Abstract
- `publishedAt`: Published At (datetime)
- `upvotes`: Upvotes (number)
- `authors`: Authors
- `authors[].name`: Name
- `discussionId`: Discussion ID
- `ai_summary`: AI Summary
- `ai_keywords`: AI Keywords
- `submittedOnDailyAt`: Submitted to Daily Papers At (datetime)
- `submittedOnDailyBy`: Submitted By
- `submittedOnDailyBy.user`: Username
- `submittedOnDailyBy.fullname`: Full Name
- `githubRepo`: GitHub Repo (url)
- `githubStars`: GitHub Stars (number)
- `linkedModels`: Linked Models
- `linkedModels[].id`: Repo ID
- `linkedModels[].author`: Author
- `linkedModels[].likes`: Likes (number)
- `linkedModels[].downloads`: Downloads (number)
- `linkedModels[].lastModified`: Last Modified (datetime)
- `linkedModels[].gated`: Gated
- `linkedModels[].private`: Private (boolean)
- `linkedModels[].pipeline_tag`: Pipeline Task
- `linkedModels[].numParameters`: Parameters (number)
- `numTotalModels`: Total Linked Models (number)
- `linkedDatasets`: Linked Datasets
- `linkedDatasets[].id`: Repo ID
- `linkedDatasets[].author`: Author
- `linkedDatasets[].likes`: Likes (number)
- `linkedDatasets[].downloads`: Downloads (number)
- `linkedDatasets[].lastModified`: Last Modified (datetime)
- `linkedDatasets[].gated`: Gated
- `linkedDatasets[].private`: Private (boolean)
- `numTotalDatasets`: Total Linked Datasets (number)
- `linkedSpaces`: Linked Spaces
- `linkedSpaces[].id`: Space ID
- `linkedSpaces[].emoji`: Emoji
- `linkedSpaces[].shortDescription`: Short Description
- `linkedSpaces[].running`: Running (boolean)
- `numTotalSpaces`: Total Linked Spaces (number)
- `comments`: Comments
- `comments[].id`: Event ID
- `comments[].type`: Event Type
- `comments[].createdAt`: Created At (datetime)
- `comments[].author`: Author
- `comments[].author.name`: Username
- `comments[].author.fullname`: Full Name
- `comments[].author.type`: Account Type
- `comments[].data`: Data
- `comments[].data.latest`: Latest Version
- `comments[].data.latest.raw`: Text (Markdown)
- `comments[].data.latest.html`: Text (HTML) (html)
- `comments[].data.latest.updatedAt`: Updated At (datetime)
- `comments[].data.edited`: Edited (boolean)
- `comments[].data.hidden`: Hidden (boolean)
- `comments[].data.numEdits`: Edit Count (number)
- `comments[].replies`: Replies
- `comments[].replies[].id`: Event ID
- `comments[].replies[].type`: Event Type
- `comments[].replies[].createdAt`: Created At (datetime)
- `comments[].replies[].author`: Author
- `comments[].replies[].author.name`: Username
- `comments[].replies[].author.fullname`: Full Name
- `comments[].replies[].author.type`: Account Type
- `comments[].replies[].data`: Data
- `comments[].replies[].data.latest`: Latest Version
- `comments[].replies[].data.latest.raw`: Text (Markdown)
- `comments[].replies[].data.latest.html`: Text (HTML) (html)
- `comments[].replies[].data.latest.updatedAt`: Updated At (datetime)
- `comments[].replies[].data.edited`: Edited (boolean)
- `comments[].replies[].data.hidden`: Hidden (boolean)
- `comments[].replies[].data.numEdits`: Edit Count (number)

### `list_collections`

**List Collections.** Lists Hugging Face collections (curated groups of models, datasets, Spaces and papers), filterable by owner, contained item and text, one page per call with a next_cursor. Each entry carries its slug ('namespace/title-id'), which Get Collection needs to return every item. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | no |  | Owner. Only collections owned by this user or organization, for example 'huggingface'. |
| `item` | string | no |  | Contains Item. Only collections that contain this item, written as '<type>/<id>', for example 'models/openai-community/gpt2', 'datasets/stanfordnlp/imdb' or 'papers/2307.09288'. |
| `search` | string | no |  | Search. Only collections whose title matches this text. |
| `sort` | string | no |  | Sort By. Sort order. Defaults to trending. One of `"trending"`, `"upvotes"`, `"lastModified"`. |
| `limit` | number | no | `10` | Limit. Maximum number of results in this page (1 to 100). |
| `cursor` | string | no |  | Cursor. The 'next_cursor' value returned by a previous call, to fetch the next page. Leave empty for the first page. |

Output fields:

- `collections`: Collections
- `collections[].slug`: Collection Slug
- `collections[].title`: Title
- `collections[].description`: Description
- `collections[].lastUpdated`: Last Updated (datetime)
- `collections[].private`: Private (boolean)
- `collections[].upvotes`: Upvotes (number)
- `collections[].owner`: Owner
- `collections[].owner.name`: Username
- `collections[].owner.fullname`: Full Name
- `collections[].owner.type`: Account Type
- `collections[].items`: Items
- `collections[].items[].type`: Item Type
- `collections[].items[].position`: Position (number)
- `collections[].items[].id`: Repo ID
- `collections[].items[].author`: Author
- `collections[].items[].likes`: Likes (number)
- `collections[].items[].downloads`: Downloads (number)
- `collections[].items[].lastModified`: Last Modified (datetime)
- `collections[].items[].gated`: Gated
- `collections[].items[].private`: Private (boolean)
- `collections[].items[].pipeline_tag`: Pipeline Task
- `collections[].items[].numParameters`: Parameters (number)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_collection`

**Get Collection.** Returns one Hugging Face collection by its slug: title, description, owner, visibility, upvotes and every item (models, datasets, Spaces, papers or nested collections) with its type, ID and note. Get the slug from List Collections or the collection URL. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `slug` | string | yes |  | Collection Slug. The full collection slug in 'namespace/title-id' form, for example 'meta-llama/llama-32-66f448ffc8c32f949b04c8cf' (the part after huggingface.co/collections/). |

Output fields:

- `slug`: Collection Slug
- `title`: Title
- `description`: Description
- `lastUpdated`: Last Updated (datetime)
- `private`: Private (boolean)
- `upvotes`: Upvotes (number)
- `owner`: Owner
- `owner.name`: Username
- `owner.fullname`: Full Name
- `owner.type`: Account Type
- `items`: Items
- `items[].type`: Item Type
- `items[].position`: Position (number)
- `items[].id`: Repo ID
- `items[].author`: Author
- `items[].likes`: Likes (number)
- `items[].downloads`: Downloads (number)
- `items[].lastModified`: Last Modified (datetime)
- `items[].gated`: Gated
- `items[].private`: Private (boolean)
- `items[].pipeline_tag`: Pipeline Task
- `items[].numParameters`: Parameters (number)
- `shareUrl`: Share URL (url)

### `generate_chat_completion`

**Generate Chat Completion.** Runs one OpenAI-style chat completion on a Hugging Face model served by Inference Providers and returns the assistant reply, finish reason and token usage. Use it for open-ended generation, reasoning or structured JSON output (set Response Format); prefer text_summarization, language_translation or text_classification for those narrower tasks. Reasoning models such as openai/gpt-oss-20b spend part of max_tokens on hidden reasoning, so an empty content with finish_reason 'length' means max_tokens must be raised to a few hundred or more. Each call spends the account's Inference Providers credits (free monthly allowance, then pay-as-you-go) and sampled output varies between runs, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | no | `"openai/gpt-oss-20b"` | Model. Model ID served by Inference Providers, for example 'openai/gpt-oss-20b' or 'Qwen/Qwen3-8B'. Find others with Search Models (pipeline_tag 'text-generation', inference_provider 'all'); append ':<provider>' (for example ':groq') or ':preferred' to pick the provider. Leave empty to use openai/gpt-oss-… |
| `provider` | string | no |  | Provider. Inference provider to run the model on. Leave empty (or 'auto') to use the first available provider in your Hugging Face provider preference order. One of `"black-forest-labs"`, `"cerebras"`, `"cohere"`, `"fal-ai"`, `"featherless-ai"`, `"fireworks-ai"`, `"groq"`, `"hf-inference"`, `"hyperbolic"`, `"nebius"`, `"novita"`, `"nscale"`, `"openai"`, `"ovhcloud"`, `"replicate"`, `"sambanova"`, `"scaleway"`, `"together"`, `"auto"`. |
| `messages` | JSON | yes |  | Messages. The conversation as a JSON array of {"role", "content"} objects, oldest first, for example [{"role": "user", "content": "Summarize this in one line: ..."}]. Roles are system, user and assistant. For vision models, content may be an array of parts such as {"type": "text", "text": "..."} and {"type":… |
| `system_prompt` | string | no |  | System Prompt. Optional instructions sent as a leading system message. Nothing is added when empty. |
| `max_tokens` | number | no |  | Max Tokens. Maximum number of tokens to generate in the reply, for example 512. Reasoning models such as openai/gpt-oss-20b spend part of this on hidden reasoning, so an empty reply with finish_reason 'length' means you should raise it to a few hundred or more. |
| `temperature` | number | no |  | Temperature. Sampling temperature between 0 and 2. 0 is the most deterministic. Leave empty for the model default. |
| `top_p` | number | no |  | Top P. Nucleus sampling probability mass between 0 and 1, for example 0.9. Leave empty for the model default. |
| `stop` | array | no |  | Stop Sequences. Up to 4 text sequences at which generation stops. |
| `seed` | number | no |  | Seed. Random seed for more repeatable sampling, where the provider supports it. |
| `response_format` | string | no |  | Response Format. 'json_object' forces valid JSON; 'json_schema' forces JSON matching the JSON Schema field. Defaults to plain text. One of `"text"`, `"json_object"`, `"json_schema"`. |
| `json_schema` | JSON | no |  | JSON Schema. Required when Response Format is json_schema: {"name": "answer", "schema": {...JSON Schema...}, "strict": true}. A bare JSON Schema object is also accepted. |

Output fields:

- `content`: Reply
- `finish_reason`: Finish Reason
- `model`: Model
- `id`: Completion ID
- `usage`: Token Usage
- `usage.prompt_tokens`: Prompt Tokens (number)
- `usage.completion_tokens`: Completion Tokens (number)
- `usage.total_tokens`: Total Tokens (number)

### `generate_embeddings`

**Generate Text Embeddings.** Converts one or more texts into numeric embedding vectors with a Hugging Face feature-extraction model served by Inference Providers, for semantic search, clustering or similarity. One text returns a single embedding with its dimensions; several texts return one vector per text in the same order. Spends Inference Providers credits; the result is deterministic for a fixed model, so it is safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"BAAI/bge-small-en-v1.5"` | Model. Feature-extraction model ID, for example 'BAAI/bge-small-en-v1.5' (384 dimensions) or 'intfloat/multilingual-e5-large'. Find others with Search Models (pipeline_tag 'feature-extraction', inference_provider 'all'); append ':<provider>' to pick the provider. |
| `provider` | string | no |  | Provider. Inference provider to run the model on. Leave empty (or 'auto') to use the first available provider in your Hugging Face provider preference order. One of `"black-forest-labs"`, `"cerebras"`, `"cohere"`, `"fal-ai"`, `"featherless-ai"`, `"fireworks-ai"`, `"groq"`, `"hf-inference"`, `"hyperbolic"`, `"nebius"`, `"novita"`, `"nscale"`, `"openai"`, `"ovhcloud"`, `"replicate"`, `"sambanova"`, `"scaleway"`, `"together"`, `"auto"`. |
| `inputs` | array | yes |  | Texts. The texts to embed. One text returns one embedding; several texts return one embedding each, in order. |
| `normalize` | string | no |  | Normalize. Scale each vector to unit length. Leave empty for the model default. One of `"true"`, `"false"`. |
| `truncate` | string | no |  | Truncate. Cut texts longer than the model's maximum input length instead of failing. Leave empty for the model default. One of `"true"`, `"false"`. |
| `truncation_direction` | string | no |  | Truncation Direction. Which end of an over-long text to cut when truncating. Leave empty for the model default (right). One of `"right"`, `"left"`. |
| `prompt_name` | string | no |  | Prompt Name. Name of a prompt template defined in the model's Sentence Transformers config, for example 'query' or 'passage' for retrieval models. Leave empty when the model has none. |

Output fields:

- `model`: Model
- `dimensions`: Dimensions (number)
- `embedding`: Embedding
- `embeddings`: Embeddings
- `count`: Count (number)

### `check_dataset_viewer_support`

**Check Dataset Viewer Support.** Capability gate for every dataset viewer action: returns five booleans, preview (Preview Dataset Rows), viewer (Get Dataset Rows, parquet, size, info), search (Search Dataset Rows), filter (Filter Dataset Rows) and statistics (Get Column Statistics), optionally narrowed to one subset or split. Call it first whenever you are unsure whether a dataset is served. Private datasets are only served for PRO or Enterprise owners, gated ones only after access is granted. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | no |  | Subset (Config). Optional subset (config) name, for example 'plain_text'. Leave empty to cover every subset. List valid names with List Dataset Subsets & Splits. |
| `split` | string | no |  | Split. Optional split name, for example 'train'. Only used together with a subset (config). |

Output fields:

- `preview`: Preview Supported (boolean)
- `viewer`: Viewer Supported (boolean)
- `search`: Search Supported (boolean)
- `filter`: Filter Supported (boolean)
- `statistics`: Statistics Supported (boolean)

### `list_dataset_splits`

**List Dataset Subsets & Splits.** Lists every subset (config) and split of a dataset, the resolver for the config and split inputs of every other dataset viewer action; pending lists subsets still being processed and failed lists subsets the viewer could not process. If unsure whether the dataset is served at all, call Check Dataset Viewer Support first. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | no |  | Subset (Config). Optional subset (config) name, for example 'plain_text'. Leave empty to cover every subset. List valid names with List Dataset Subsets & Splits. |

Output fields:

- `splits`: Splits
- `splits[].dataset`: Dataset ID
- `splits[].config`: Subset (Config)
- `splits[].split`: Split
- `count`: Count (number)
- `pending`: Pending
- `failed`: Failed

### `preview_dataset_rows`

**Preview Dataset Rows.** Returns the column features and the first rows (up to 100, default 20) of one dataset split. Works whenever Check Dataset Viewer Support reports preview:true, even when viewer:false makes Get Dataset Rows unavailable; use Get Dataset Rows instead to page past the first rows. Long cell values are cut and listed per row in truncated_cells. Resolve config and split with List Dataset Subsets & Splits. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | yes |  | Subset (Config). The subset (config) name, for example 'plain_text' or 'default'. List valid names with List Dataset Subsets & Splits. |
| `split` | string | yes |  | Split. The split name, for example 'train', 'test' or 'validation'. List valid names with List Dataset Subsets & Splits. |
| `max_rows` | number | no | `20` | Max Rows. How many of the first rows to return (1 to 100). Defaults to 20. |

Output fields:

- `dataset`: Dataset ID
- `config`: Subset (Config)
- `split`: Split
- `features`: Columns
- `features[].feature_idx`: Column Index (number)
- `features[].name`: Column Name
- `features[].type`: Column Type
- `rows`: Rows
- `rows[].row_idx`: Row Index (number)
- `rows[].row`: Row (an object whose keys vary)
- `rows[].truncated_cells`: Truncated Cells
- `count`: Count (number)
- `rows_available`: Rows Available in Preview (number)
- `truncated`: Truncated (boolean)

### `get_dataset_rows`

**Get Dataset Rows.** Returns one page of up to 100 rows from a dataset split starting at offset, plus the column features, num_rows_total and next_offset (null on the last page) for paging; partial:true means the viewer only indexed part of a very large split. Needs viewer:true from Check Dataset Viewer Support (call it first when unsure); otherwise use Preview Dataset Rows. For keyword or condition queries use Search Dataset Rows or Filter Dataset Rows. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | yes |  | Subset (Config). The subset (config) name, for example 'plain_text' or 'default'. List valid names with List Dataset Subsets & Splits. |
| `split` | string | yes |  | Split. The split name, for example 'train', 'test' or 'validation'. List valid names with List Dataset Subsets & Splits. |
| `offset` | number | no | `0` | Offset. Zero-based index of the first row to return. Use 0 for the first page, then the returned next_offset value. |
| `length` | number | no | `20` | Length. Number of rows to return in this page (1 to 100). |

Output fields:

- `features`: Columns
- `features[].feature_idx`: Column Index (number)
- `features[].name`: Column Name
- `features[].type`: Column Type
- `rows`: Rows
- `rows[].row_idx`: Row Index (number)
- `rows[].row`: Row (an object whose keys vary)
- `rows[].truncated_cells`: Truncated Cells
- `count`: Count (number)
- `offset`: Offset (number)
- `next_offset`: Next Offset (number)
- `num_rows_total`: Total Rows (number)
- `num_rows_per_page`: Rows per Page (number)
- `partial`: Partial (boolean)

### `search_dataset_rows`

**Search Dataset Rows.** Full-text searches the string columns of one dataset split and returns one page of up to 100 matching rows with their original row_idx, plus num_rows_total (total matches) and next_offset for paging. Only works when Check Dataset Viewer Support reports search:true (call it first when unsure). For exact column conditions such as label=1 use Filter Dataset Rows instead. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | yes |  | Subset (Config). The subset (config) name, for example 'plain_text' or 'default'. List valid names with List Dataset Subsets & Splits. |
| `split` | string | yes |  | Split. The split name, for example 'train', 'test' or 'validation'. List valid names with List Dataset Subsets & Splits. |
| `query` | string | yes |  | Query. Words to look for in the text columns, for example 'wonderful acting'. |
| `offset` | number | no | `0` | Offset. Zero-based index of the first row to return. Use 0 for the first page, then the returned next_offset value. |
| `length` | number | no | `20` | Length. Number of rows to return in this page (1 to 100). |

Output fields:

- `features`: Columns
- `features[].feature_idx`: Column Index (number)
- `features[].name`: Column Name
- `features[].type`: Column Type
- `rows`: Rows
- `rows[].row_idx`: Row Index (number)
- `rows[].row`: Row (an object whose keys vary)
- `rows[].truncated_cells`: Truncated Cells
- `count`: Count (number)
- `offset`: Offset (number)
- `next_offset`: Next Offset (number)
- `num_rows_total`: Total Rows (number)
- `num_rows_per_page`: Rows per Page (number)
- `partial`: Partial (boolean)

### `filter_dataset_rows`

**Filter Dataset Rows.** Returns one page of up to 100 rows from a dataset split that match a SQL-like WHERE condition, optionally sorted, plus num_rows_total (total matches) and next_offset for paging. Column names must be double-quoted, for example "label"=1 AND "idx">100; get column names from Preview Dataset Rows or Get Dataset Schema & Info. Only works when Check Dataset Viewer Support reports filter:true (call it first when unsure); for free-text matching use Search Dataset Rows. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | yes |  | Subset (Config). The subset (config) name, for example 'plain_text' or 'default'. List valid names with List Dataset Subsets & Splits. |
| `split` | string | yes |  | Split. The split name, for example 'train', 'test' or 'validation'. List valid names with List Dataset Subsets & Splits. |
| `where` | string | no |  | Where. SQL-like condition with double-quoted column names, for example "label"=1 or "score">0.5 AND "lang"='en'. String values use single quotes. |
| `orderby` | string | no |  | Order By. Optional sort with double-quoted column names, for example "idx" DESC or "score" ASC. |
| `offset` | number | no | `0` | Offset. Zero-based index of the first row to return. Use 0 for the first page, then the returned next_offset value. |
| `length` | number | no | `20` | Length. Number of rows to return in this page (1 to 100). |

Output fields:

- `features`: Columns
- `features[].feature_idx`: Column Index (number)
- `features[].name`: Column Name
- `features[].type`: Column Type
- `rows`: Rows
- `rows[].row_idx`: Row Index (number)
- `rows[].row`: Row (an object whose keys vary)
- `rows[].truncated_cells`: Truncated Cells
- `count`: Count (number)
- `offset`: Offset (number)
- `next_offset`: Next Offset (number)
- `num_rows_total`: Total Rows (number)
- `num_rows_per_page`: Rows per Page (number)
- `partial`: Partial (boolean)

### `get_dataset_viewer_info`

**Get Dataset Schema & Info.** Returns the dataset viewer's info for a dataset: column features (the schema, including class label names), description, license, citation, homepage and per-split example counts and bytes. With a subset (config), dataset_info describes that subset; without one, dataset_info is keyed by subset name. Use Get Dataset instead for Hub repository metadata (tags, files, downloads); if unsure the viewer serves this dataset, call Check Dataset Viewer Support first. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | no |  | Subset (Config). Optional subset (config) name, for example 'plain_text'. Leave empty to cover every subset. List valid names with List Dataset Subsets & Splits. |

Output fields:

- `dataset_info`: Dataset Info
- `partial`: Partial (boolean)

### `get_dataset_size`

**Get Dataset Size.** Returns row counts, column counts and byte sizes (original files, parquet, in memory) for the whole dataset, each subset (config) and each split, optionally narrowed to one subset. Use it to decide how many pages Get Dataset Rows would need or whether a download is practical. If unsure the viewer serves this dataset, call Check Dataset Viewer Support first. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | no |  | Subset (Config). Optional subset (config) name, for example 'plain_text'. Leave empty to cover every subset. List valid names with List Dataset Subsets & Splits. |

Output fields:

- `size`: Size
- `size.dataset`: Whole Dataset
- `size.dataset.dataset`: Dataset ID
- `size.dataset.num_rows`: Rows (number)
- `size.dataset.num_bytes_parquet_files`: Parquet Size (filesize)
- `size.dataset.num_bytes_memory`: In-Memory Size (filesize)
- `size.dataset.estimated_num_rows`: Estimated Rows (number)
- `size.dataset.num_bytes_original_files`: Original Files Size (filesize)
- `size.configs`: Subsets
- `size.configs[].dataset`: Dataset ID
- `size.configs[].num_rows`: Rows (number)
- `size.configs[].num_bytes_parquet_files`: Parquet Size (filesize)
- `size.configs[].num_bytes_memory`: In-Memory Size (filesize)
- `size.configs[].estimated_num_rows`: Estimated Rows (number)
- `size.configs[].config`: Subset (Config)
- `size.configs[].num_columns`: Columns (number)
- `size.configs[].num_bytes_original_files`: Original Files Size (filesize)
- `size.splits`: Splits
- `size.splits[].dataset`: Dataset ID
- `size.splits[].num_rows`: Rows (number)
- `size.splits[].num_bytes_parquet_files`: Parquet Size (filesize)
- `size.splits[].num_bytes_memory`: In-Memory Size (filesize)
- `size.splits[].estimated_num_rows`: Estimated Rows (number)
- `size.splits[].config`: Subset (Config)
- `size.splits[].split`: Split
- `size.splits[].num_columns`: Columns (number)
- `pending`: Pending
- `failed`: Failed
- `partial`: Partial (boolean)

### `get_dataset_statistics`

**Get Column Statistics.** Returns per-column statistics for one dataset split: null counts and proportions, min, max, mean, median, standard deviation and histograms for numeric and text-length columns, and value frequencies for class labels and booleans; partial:true means they were computed on a sample. Only works when Check Dataset Viewer Support reports statistics:true (call it first when unsure). Resolve config and split with List Dataset Subsets & Splits. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | yes |  | Subset (Config). The subset (config) name, for example 'plain_text' or 'default'. List valid names with List Dataset Subsets & Splits. |
| `split` | string | yes |  | Split. The split name, for example 'train', 'test' or 'validation'. List valid names with List Dataset Subsets & Splits. |

Output fields:

- `num_examples`: Rows in Split (number)
- `statistics`: Column Statistics
- `statistics[].column_name`: Column Name
- `statistics[].column_type`: Column Type
- `statistics[].column_statistics`: Statistics
- `partial`: Partial (boolean)

### `list_dataset_parquet_files`

**List Parquet Files.** Lists the Parquet files the dataset viewer converted a dataset into (under the refs/convert/parquet revision), one entry per file with its subset (config), split, filename, size in bytes and download URL, optionally narrowed to one subset. The URLs are binary download URLs for external tools, not readable with Read Repo File; to read rows use Get Dataset Rows. If unsure the viewer serves this dataset, call Check Dataset Viewer Support first. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `config` | string | no |  | Subset (Config). Optional subset (config) name, for example 'plain_text'. Leave empty to cover every subset. List valid names with List Dataset Subsets & Splits. |

Output fields:

- `parquet_files`: Parquet Files
- `parquet_files[].dataset`: Dataset ID
- `parquet_files[].config`: Subset (Config)
- `parquet_files[].split`: Split
- `parquet_files[].filename`: File Name
- `parquet_files[].url`: Download URL (url)
- `parquet_files[].size`: Size (filesize)
- `count`: Count (number)
- `pending`: Pending
- `failed`: Failed
- `partial`: Partial (boolean)

### `get_dataset_leaderboard`

**Get Dataset Leaderboard.** Returns the Hub leaderboard of a benchmark dataset (for example openai/gsm8k or TIGER-Lab/MMLU-Pro): models ranked by their reported evaluation score, each with rank, model_id, score value, whether lower is better, parameter count, verification status and the source of the result. Most non-benchmark datasets return an empty list. Filter by task, maximum model size, or base models versus fine-tunes; use Get Model for details of a ranked model. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dataset` | string | yes |  | Dataset ID. The dataset ID in 'namespace/name' form, for example 'stanfordnlp/imdb'. Find it with Search Datasets. |
| `task_id` | string | no |  | Task ID. Optional benchmark task for datasets with several tasks, for example 'gsm8k'. It matches the eval result file name (.eval_results/<task>.yaml). Leave empty for the default task. |
| `max_params` | string | no |  | Max Parameters. Only models up to this size, for example '10B', '500M' or a raw count such as '7000000000'. |
| `base_model` | string | no |  | Model Scope. Leave empty for the Hub default (base models only), or include fine-tuned and derived models as well. One of `"true"`, `"false"`. |

Output fields:

- `entries`: Leaderboard Entries
- `entries[].rank`: Rank (number)
- `entries[].model_id`: Model ID
- `entries[].value`: Score (number)
- `entries[].lower_is_better`: Lower Is Better (boolean)
- `entries[].num_parameters`: Parameters (number)
- `entries[].verified`: Verified (boolean)
- `entries[].author_name`: Author
- `entries[].author_fullname`: Author Full Name
- `entries[].author_type`: Author Type
- `entries[].source_name`: Source
- `entries[].source_url`: Source URL (url)
- `entries[].source_is_external`: Source Is External (boolean)
- `entries[].pull_request`: Pull Request Number (number)
- `entries[].filename`: Eval Results File
- `count`: Count (number)

### `create_repo`

**Create Repository.** Creates a model, dataset or Space repository under the connected user or an organization, private by default; if a repository with that name already exists it is returned unchanged with created:false, so retries are safe. Only set Visibility to Public when the user explicitly asks, because a public repository is visible to everyone. Spaces need an SDK: 'static' is free for everyone, while 'gradio' and 'docker' need a PRO/Team subscription or billing on the account; no paid hardware is ever requested. Add files afterwards with Commit Files. Requires a write-role token (and write rights in the organization). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `name` | string | yes |  | Repository Name. The repository name, for example 'my-model'. You may also pass 'namespace/name' to create it under an organization. |
| `organization` | string | no |  | Organization. Optional organization to create the repository in. Leave empty to create it under the connected user. |
| `visibility` | string | no | `"private"` | Visibility. Private (default) or Public. Public repositories are visible to everyone, so choose Public only when explicitly asked. One of `"private"`, `"public"`. |
| `space_sdk` | string | no |  | Space SDK. Required when Repository Type is 'space': the framework the Space runs. 'static' is free for everyone; 'gradio' and 'docker' need a PRO/Team subscription or billing. Ignored for models and datasets. One of `"static"`, `"gradio"`, `"docker"`. |

Output fields:

- `created`: Created (boolean)
- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `url`: Repo URL (url)
- `private`: Private (boolean)

### `update_repo_settings`

**Update Repo Settings.** Changes only the settings you provide on a model, dataset or Space repository (visibility, discussions on/off, gated access mode, gated-request notifications); every setting left empty is kept as it is. Warning: switching Visibility to Public exposes the repository and its files to everyone, and setting Gated Access to 'Not gated' removes the access gate, so only do either when the user explicitly asks. Safe to retry. Requires a write-role token with admin rights on the repository. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `visibility` | string | no |  | Visibility. Leave empty to keep the current visibility. Public makes the repository and all its files visible to everyone. One of `"private"`, `"public"`. |
| `discussions` | string | no |  | Discussions. Leave empty to keep the current setting. Disabled hides the Community tab and blocks new discussions. One of `"enabled"`, `"disabled"`. |
| `gated` | string | no |  | Gated Access. Leave empty to keep the current gate. 'Automatic approval' and 'Manual approval' require users to request access; 'Not gated' removes the gate. Not available for Spaces. One of `"false"`, `"auto"`, `"manual"`. |
| `gated_notifications_mode` | string | no |  | Access Request Notifications. Leave empty to keep the current mode. How the owner is notified of new gated-access requests. One of `"real-time"`, `"bulk"`. |
| `gated_notifications_email` | string | no |  | Notification Email. Leave empty to keep the current address. The email address that receives gated-access request notifications. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `updated_settings`: Updated Settings
- `settings`: Settings (an object whose keys vary)

### `create_repo_branch`

**Create Branch.** Creates a new branch in a model, dataset or Space repository, starting from a given branch, tag or commit (the default branch when empty), or as an empty branch. Never overwrites: if the branch already exists the call fails with BRANCH_EXISTS, so a retry after success fails too. Check existing branches with List Branches & Tags; commit to the new branch with Commit Files. Requires a write-role token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `branch` | string | yes |  | Branch Name. The name of the new branch, for example 'dev' or 'experiment-1'. |
| `starting_point` | string | no |  | Starting Point. Optional branch, tag or commit SHA the new branch starts from, for example 'main' or 'v1.0'. Leave empty to start from the default branch. |
| `empty_branch` | boolean | no | `false` | Empty Branch. Create the branch with no history and no files instead of copying a starting point. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `branch`: Branch
- `starting_point`: Starting Point
- `empty_branch`: Empty Branch (boolean)
- `created`: Created (boolean)

### `delete_repo_branch`

**Delete Branch.** Permanently deletes a branch from a model, dataset or Space repository ('main' is always refused); commits reachable only from that branch are lost. Confirm the exact branch with List Branches & Tags first and only delete branches the user asked to remove. A retry after success fails because the branch is gone. Requires a write-role token. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `branch` | string | yes |  | Branch Name. The branch to delete, for example 'dev'. The 'main' branch cannot be deleted with this action. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `branch`: Branch
- `deleted`: Deleted (boolean)

### `create_repo_tag`

**Create Tag.** Creates a git tag (for example a release like 'v1.0') pointing at a branch, tag or commit of a model, dataset or Space repository. Fails with TAG_EXISTS if the tag is already there, so a retry after success fails too; check existing tags with List Branches & Tags. Requires a write-role token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `tag` | string | yes |  | Tag Name. The tag to create, for example 'v1.0'. |
| `revision` | string | yes |  | Revision. The branch, tag or commit SHA to tag, for example 'main', 'dev' or a commit SHA. Get branch names from List Branches & Tags and commit SHAs from List Repo Commits. |
| `message` | string | no |  | Message. Optional annotation message stored with the tag. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `tag`: Tag
- `revision`: Tagged Revision
- `created`: Created (boolean)

### `delete_repo_tag`

**Delete Tag.** Permanently deletes a git tag from a model, dataset or Space repository; the tagged commits stay, but anything pinned to that tag loses it. Confirm the exact tag with List Branches & Tags and only delete tags the user asked to remove. A retry after success fails because the tag is gone. Requires a write-role token. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `tag` | string | yes |  | Tag Name. The tag to delete, for example 'v1.0'. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `tag`: Tag
- `deleted`: Deleted (boolean)

### `commit_files`

**Commit Files.** Writes one commit to a branch of a model, dataset or Space repository: adds or overwrites small inline text files (utf-8 or base64 text, 1 MiB total) and can delete paths in the same commit, which is destructive for the deleted files. Binary or large files are refused (LFS uploads are not supported). Turn on Open as Pull Request to propose the change instead of writing to the branch (the safe mode on repositories the user does not own; returns pullRequestUrl); set Parent Commit to fail rather than overwrite a concurrent edit. Each call creates a new commit, so retries duplicate. Requires a write-role token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `branch` | string | yes |  | Branch. The branch to commit to, for example 'main', 'dev', or 'refs/pr/3' to add a commit to an open pull request. Get the branch names from List Branches & Tags. |
| `summary` | string | yes |  | Commit Title. A one-line commit summary, for example 'Update README'. Also used as the pull request title. |
| `commit_description` | string | no |  | Commit Description. Optional longer commit message. Also used as the pull request description. |
| `files` | array | no |  | Files to Write. Text files to create or overwrite. Each needs a repository path and its content; binary files and anything over 1 MiB in total are refused. Each item: { `path`, `content`, `encoding`? }. |
| `deleted_paths` | array | no |  | Paths to Delete. Repository paths to delete in the same commit, for example 'old_notes.txt'. Deleted files are removed from the branch. |
| `parent_commit` | string | no |  | Parent Commit. Optional 40-character commit SHA the branch must still point to. If someone committed since, the commit fails instead of overwriting their change. Get it from List Repo Commits. |
| `create_pr` | boolean | no | `false` | Open as Pull Request. Open a pull request with this commit instead of writing directly to the branch. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `branch`: Branch
- `commit_oid`: Commit SHA
- `commit_url`: Commit URL (url)
- `pull_request_url`: Pull Request URL (url)
- `pull_request_number`: Pull Request Number (number)
- `pull_request_revision`: Pull Request Revision
- `files_written`: Files Written
- `paths_deleted`: Paths Deleted
- `total_bytes`: Total Size Written (filesize)

### `create_discussion`

**Create Discussion.** Opens a new discussion thread on a model, dataset or Space repository, posted publicly under the connected user's name (visible to everyone who can see the repository). With Open as Pull Request it instead opens an empty draft pull request: add files to it with Commit Files using the returned pull_request_revision (refs/pr/N) as the branch, or use Commit Files with Open as Pull Request to do both in one step. Each call creates a new thread, so retries duplicate. Requires a write-role token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `title` | string | yes |  | Title. The discussion title, 3 to 200 characters. |
| `description` | string | yes |  | Description. The opening message, in Markdown (up to 65,536 characters). |
| `pull_request` | boolean | no | `false` | Open as Pull Request. Open an empty draft pull request instead of a discussion. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `discussion_number`: Discussion Number (number)
- `title`: Title
- `is_pull_request`: Is Pull Request (boolean)
- `pull_request_revision`: Pull Request Revision
- `url`: Discussion Path

### `comment_on_discussion`

**Comment on Discussion.** Posts a new comment on an existing discussion or pull request of a model, dataset or Space repository, publicly under the connected user's name. Get the discussion number from List Discussions & PRs. Each call adds another comment, so retries duplicate. Requires a write-role token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `discussion_number` | number | yes |  | Discussion Number. The discussion or pull request number within the repository (the 'num' from List Discussions & PRs). |
| `comment` | string | yes |  | Comment. The comment text, in Markdown (up to 65,536 characters). |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `discussion_number`: Discussion Number (number)
- `comment_id`: Comment ID
- `created_at`: Created At (datetime)
- `url`: Comment URL (url)

### `change_discussion_status`

**Open or Close Discussion.** Closes or reopens a discussion or pull request of a model, dataset or Space repository, optionally with a public closing comment. Closing is the reversible alternative to Delete Discussion, so prefer it. Every call records a new status event and re-posts the comment, so avoid blind retries. Requires a write-role token and being the thread author or having write access to the repository. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `discussion_number` | number | yes |  | Discussion Number. The discussion or pull request number within the repository (the 'num' from List Discussions & PRs). |
| `status` | string | yes |  | Status. The new status: Closed or Open (reopen). One of `"closed"`, `"open"`. |
| `comment` | string | no |  | Comment. Optional public comment posted with the status change, for example the reason for closing. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `discussion_number`: Discussion Number (number)
- `status`: Status
- `event_id`: Event ID
- `created_at`: Changed At (datetime)

### `rename_discussion`

**Rename Discussion.** Changes the title of an existing discussion or pull request of a model, dataset or Space repository; the change is shown publicly in the thread. Re-applying the same title converges, so it is safe to retry. Requires a write-role token and being the thread author or having write access to the repository. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `discussion_number` | number | yes |  | Discussion Number. The discussion or pull request number within the repository (the 'num' from List Discussions & PRs). |
| `title` | string | yes |  | New Title. The new title, 3 to 200 characters. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `discussion_number`: Discussion Number (number)
- `title`: New Title
- `previous_title`: Previous Title
- `event_id`: Event ID

### `pin_discussion`

**Pin or Unpin Discussion.** Pins a discussion or pull request to the top of a model, dataset or Space repository's Community tab, or unpins it. Setting the same state again is a no-op, so it is safe to retry. Requires a write-role token with write or admin rights on the repository. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `discussion_number` | number | yes |  | Discussion Number. The discussion or pull request number within the repository (the 'num' from List Discussions & PRs). |
| `action` | string | yes | `"pin"` | Action. Pin or unpin the discussion. One of `"pin"`, `"unpin"`. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `discussion_number`: Discussion Number (number)
- `pinned`: Pinned (boolean)

### `delete_discussion`

**Delete Discussion.** Permanently deletes a discussion or pull request, with all its comments, from a model, dataset or Space repository; it cannot be undone. Prefer Open or Close Discussion (closed) unless the user explicitly asks to delete. A retry after success fails because the thread is gone. Requires a write-role token with admin rights on the repository. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. The kind of Hub repository: 'model', 'dataset' or 'space'. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `discussion_number` | number | yes |  | Discussion Number. The discussion or pull request number within the repository (the 'num' from List Discussions & PRs). |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `discussion_number`: Discussion Number (number)
- `deleted`: Deleted (boolean)

### `comment_on_paper`

**Comment on Paper.** Posts a new top-level comment on a Hugging Face Papers page, publicly and permanently visible to everyone under the connected user's name. Only post when the user explicitly asks and approves the text. To answer an existing comment use Reply to Paper Comment instead. Each call adds another comment, so retries duplicate. Requires a write-role token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paper_id` | string | yes |  | Paper ID. The paper's arXiv ID, for example '2307.09288'. Find it with Search Papers or List Daily Papers. |
| `comment` | string | yes |  | Comment. The public comment text, in Markdown (up to 65,536 characters). |

Output fields:

- `paper_id`: Paper ID
- `comment_id`: Comment ID
- `created_at`: Created At (datetime)
- `url`: Comment URL (url)

### `reply_to_paper_comment`

**Reply to Paper Comment.** Posts a reply under an existing comment on a Hugging Face Papers page, publicly and permanently visible to everyone under the connected user's name. Only post when the user explicitly asks and approves the text. Get the comment ID from Get Paper with Include Comments on. Each call adds another reply, so retries duplicate. Requires a write-role token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paper_id` | string | yes |  | Paper ID. The paper's arXiv ID, for example '2307.09288'. |
| `comment_id` | string | yes |  | Comment ID. The ID of the comment to reply to, from Get Paper with Include Comments on. |
| `comment` | string | yes |  | Reply. The public reply text, in Markdown (up to 65,536 characters). |

Output fields:

- `paper_id`: Paper ID
- `parent_comment_id`: Parent Comment ID
- `comment_id`: Reply ID
- `created_at`: Created At (datetime)
- `url`: Reply URL (url)

### `create_collection`

**Create Collection.** Creates a collection (a curated list of models, datasets, Spaces and papers) under the connected user or an organization, private by default, optionally seeded with one item. If a collection with that title already exists in the namespace it is returned unchanged with created:false (the seed item is then not added), so retries are safe. Returns the slug that Add Item to Collection and Get Collection need. Only make it public when the user asks. Requires a write-role token. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The collection title, 1 to 60 characters. |
| `namespace` | string | no |  | Namespace. The user or organization that owns the collection. Leave empty for the connected user. |
| `description` | string | no |  | Description. Optional short description, up to 150 characters. |
| `private` | boolean | no | `true` | Private. Keep the collection private (default). Turn off only to publish it to everyone. |
| `item_type` | string | no |  | First Item Type. Optional type of an item to add right away. Requires First Item ID. One of `"model"`, `"dataset"`, `"space"`, `"paper"`, `"collection"`. |
| `item_id` | string | no |  | First Item ID. Optional ID of the first item: a repository ID like 'openai-community/gpt2', an arXiv ID like '2307.09288', or a collection slug. Requires First Item Type. |

Output fields:

- `created`: Created (boolean)
- `title`: Title
- `description`: Description
- `private`: Private (boolean)
- `slug`: Collection Slug
- `item_count`: Item Count (number)
- `url`: Collection URL (url)

### `add_collection_item`

**Add Item to Collection.** Adds one model, dataset, Space, paper or nested collection to an existing collection, with an optional note. Get the collection slug from Create Collection, List Collections or the collection URL. If the Hub reports the item as already present the call fails with ITEM_ALREADY_IN_COLLECTION; before retrying a failed call, check the items with Get Collection. Requires a write-role token with write access to the collection owner. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `slug` | string | yes |  | Collection Slug. The full collection slug in 'namespace/title-id' form, for example 'my-user/my-picks-66f448ffc8c32f949b04c8cf' (the part after huggingface.co/collections/). |
| `item_type` | string | yes | `"model"` | Item Type. The kind of item to add. One of `"model"`, `"dataset"`, `"space"`, `"paper"`, `"collection"`. |
| `item_id` | string | yes |  | Item ID. The item to add: a repository ID like 'openai-community/gpt2', an arXiv ID like '2307.09288', or a collection slug. |
| `note` | string | no |  | Note. Optional note shown next to the item, up to 500 characters. |

Output fields:

- `item_type`: Item Type
- `item_id`: Item ID
- `item_object_id`: Item Object ID
- `slug`: Collection Slug
- `item_count`: Item Count (number)
- `url`: Collection URL (url)

### `list_gated_access_requests`

**List Gated Access Requests.** Lists the users who requested access to a gated model or dataset, filtered by status (pending, accepted, rejected or reset) and optionally by requester text or request date, with each requester's username, contact email and the answers to the gate form. Use it to find the username for Accept or Reject Access Request. Page with Requested Before / After using the returned oldest/newest request times. Read-only and safe to retry, but only repository owners or admins can call it (write-role token). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. Gated access exists for models and datasets only. One of `"model"`, `"dataset"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `status` | string | yes | `"pending"` | Status. Which requests to list. Defaults to pending. One of `"pending"`, `"accepted"`, `"rejected"`, `"reset"`. |
| `search` | string | no |  | Search. Only requests whose requester username, full name, email, email domain or verified organization matches this text. |
| `after` | ISO date-time string | no |  | Requested After. Only requests made after this date and time (ISO 8601). |
| `before` | ISO date-time string | no |  | Requested Before. Only requests made before this date and time (ISO 8601). |
| `limit` | number | no | `100` | Limit. Maximum number of requests to return (10 to 1000). Defaults to 100. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `status`: Status Filter
- `requests`: Access Requests
- `requests[].username`: Username
- `requests[].user_id`: User ID
- `requests[].fullname`: Full Name
- `requests[].email`: Email (email)
- `requests[].status`: Status
- `requests[].requested_at`: Requested At (datetime)
- `requests[].reviewed_at`: Reviewed At (datetime)
- `requests[].granted_by`: Granted By
- `requests[].fields`: Gate Form Answers (an object whose keys vary)
- `count`: Count (number)
- `oldest_requested_at`: Oldest Requested At (datetime)
- `newest_requested_at`: Newest Requested At (datetime)

### `handle_gated_access_request`

**Accept or Reject Access Request.** Sets the status of one user's access request to a gated model or dataset: accepted (grants that person access to the gated files), rejected, pending, or reset. Only accept when the user explicitly approves that requester. Find requesters with List Gated Access Requests. Setting the same status again converges, so it is safe to retry. Requires a write-role token with owner or admin rights on the repository. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repo_type` | string | yes | `"model"` | Repository Type. Gated access exists for models and datasets only. One of `"model"`, `"dataset"`. |
| `repo_id` | string | yes |  | Repository ID. The repository ID in 'namespace/name' form, for example 'openai-community/gpt2' or 'stanfordnlp/imdb'. Find it with Search Models, Search Datasets or Search Spaces. |
| `username` | string | yes |  | Username. The Hub username of the requester, for example 'julien-c' (the 'username' from List Gated Access Requests). |
| `status` | string | yes |  | New Status. Accepted grants access; Rejected refuses it; Pending moves it back to the queue; Reset clears it so the user must request again. One of `"accepted"`, `"rejected"`, `"pending"`, `"reset"`. |
| `reason` | string | no |  | Reason. Optional reason shown to the requester, up to 200 characters. Only used with Rejected or Reset. |

Output fields:

- `repo_id`: Repo ID
- `repo_type`: Repo Type
- `username`: Username
- `status`: New Status
- `reason`: Reason

### `upsert_space_secret`

**Set Space Secret.** Creates or overwrites a secret (a private environment variable such as an API key) on a Space, keyed by name. Setting a secret restarts the Space, which briefly takes it offline and, on paid hardware, bills the restart. The value is never returned or readable back; the result only confirms the key. For non-sensitive settings use Set Space Variable. Re-setting the same key and value converges, so it is safe to retry. Requires a write-role token. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The Space ID in 'namespace/name' form, for example 'my-user/my-demo'. |
| `key` | string | yes |  | Key. The secret name: starts with a letter, then letters, digits or underscores, for example 'OPENAI_API_KEY'. |
| `value` | string | yes |  | Value. The secret value. It is stored encrypted and never shown again. |
| `description` | string | no |  | Description. Optional note about what the secret is for. |

Output fields:

- `space_id`: Space ID
- `key`: Key
- `updated`: Updated (boolean)

### `delete_space_secret`

**Delete Space Secret.** Permanently deletes a secret from a Space; the value cannot be recovered and code that reads it will stop working. Deleting a secret restarts the Space. Only delete secrets the user asked to remove. Do not blindly retry: the key is already gone after a success. Requires a write-role token. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The Space ID in 'namespace/name' form, for example 'my-user/my-demo'. |
| `key` | string | yes |  | Key. The name of the secret to delete, for example 'OPENAI_API_KEY'. |

Output fields:

- `space_id`: Space ID
- `key`: Key
- `deleted`: Deleted (boolean)

### `upsert_space_variable`

**Set Space Variable.** Creates or overwrites a public environment variable (a non-sensitive setting such as a model name) on a Space, keyed by name. Variables are visible to anyone who can see the Space, so put API keys and passwords in Set Space Secret instead. Setting a variable restarts the Space. Re-setting the same key and value converges, so it is safe to retry. Requires a write-role token. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The Space ID in 'namespace/name' form, for example 'my-user/my-demo'. |
| `key` | string | yes |  | Key. The variable name: starts with a letter, then letters, digits or underscores, for example 'MODEL_NAME'. |
| `value` | string | yes |  | Value. The variable value. It is visible to anyone who can see the Space. |
| `description` | string | no |  | Description. Optional note about what the variable is for. |

Output fields:

- `space_id`: Space ID
- `key`: Key
- `updated`: Updated (boolean)

### `delete_space_variable`

**Delete Space Variable.** Permanently deletes a public environment variable from a Space; code that reads it will stop working. Deleting a variable restarts the Space. Only delete variables the user asked to remove. Do not blindly retry: the key is already gone after a success. Requires a write-role token. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_id` | string | yes |  | Space ID. The Space ID in 'namespace/name' form, for example 'my-user/my-demo'. |
| `key` | string | yes |  | Key. The name of the variable to delete, for example 'MODEL_NAME'. |

Output fields:

- `space_id`: Space ID
- `key`: Key
- `deleted`: Deleted (boolean)

### `list_notifications`

**List Notifications.** Lists the connected account's Hub notifications (discussion and pull-request activity on repositories, paper discussions, posts and community blogs), one page per call with a next_page, optionally only unread ones or only those for one repository or where the user is mentioned. Each entry carries a 24-character discussion_id, which is what Delete Notifications needs (not the per-repository discussion number). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `read_status` | string | no | `"all"` | Read Status. Return all notifications or only unread ones. Defaults to all. One of `"all"`, `"unread"`. |
| `mention` | string | no | `"all"` | Involvement. All notifications, only threads the user participates in, or only threads where the user is mentioned. Defaults to all. One of `"all"`, `"participating"`, `"mentions"`. |
| `repo_type` | string | no |  | Repository Type. Only notifications about this kind of repository. Leave empty for every kind. One of `"model"`, `"dataset"`, `"space"`. |
| `repo_name` | string | no |  | Repository ID. Only notifications about this repository, in 'namespace/name' form, for example 'openai-community/gpt2'. |
| `page` | number | no | `0` | Page. Zero-based page number. Use 0 for the first page, then the returned next_page value. |

Output fields:

- `notifications`: Notifications
- `notifications[].type`: Type
- `notifications[].title`: Title
- `notifications[].read`: Read (boolean)
- `notifications[].updated_at`: Updated At (datetime)
- `notifications[].discussion_id`: Discussion ID
- `notifications[].repo_id`: Repo ID
- `notifications[].repo_type`: Repo Type
- `notifications[].discussion_num`: Discussion Number (number)
- `notifications[].discussion_status`: Discussion Status
- `notifications[].is_pull_request`: Is Pull Request (boolean)
- `notifications[].paper_id`: Paper ID
- `notifications[].post_id`: Post ID
- `notifications[].post_slug`: Post Slug
- `notifications[].post_author`: Post Author
- `notifications[].participants`: Participants
- `count`: Count (number)
- `total_matching`: Total Matching (number)
- `total_unread`: Total Unread (number)
- `total_all`: Total Notifications (number)
- `next_page`: Next Page (number)

### `delete_notifications`

**Delete Notifications.** Permanently removes the notifications for the given discussions from the connected account's Hub inbox; the discussions themselves are untouched. Pass the 24-character discussion_id values returned by List Notifications, not per-repository discussion numbers. Only the listed notifications are removed, never the whole inbox. Needs a 'write' role token. Cannot be undone, and a retry after success has nothing left to delete. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `discussion_ids` | array | yes |  | Discussion IDs. The 24-character hexadecimal discussion_id of each notification to delete, for example '6390e855e30d9209411de93b'. Get them from List Notifications. |

Output fields:

- `deleted`: Deleted (boolean)
- `deleted_discussion_ids`: Deleted Discussion IDs
- `count`: Count (number)

### `update_watch_list`

**Watch or Unwatch.** Adds items to, or removes items from, the connected account's Hub watch list, which controls the discussion notifications the user receives. Items are users, organizations, or model, dataset or Space repositories, given by name; each is resolved to its Hub ObjectId first, so an unknown name fails with 404 before anything changes. Only the listed items change; the rest of the watch list is untouched. Needs a 'write' role token. Safe to retry: watching an already-watched item or unwatching one that is not watched is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `watch` | array | no |  | Watched Items. Users, organizations or repositories to start watching. Each item: { `type`, `name` }. |
| `unwatch` | array | no |  | Watched Items. Users, organizations or repositories to stop watching. Each item: { `type`, `name` }. |

Output fields:

- `watched`: Now Watching
- `watched[].type`: Type
- `watched[].name`: Name
- `watched[].id`: Hub ID
- `watched[].watch_type`: Watch Type
- `unwatched`: No Longer Watching
- `unwatched[].type`: Type
- `unwatched[].name`: Name
- `unwatched[].id`: Hub ID
- `unwatched[].watch_type`: Watch Type
- `watched_count`: Watched Count (number)
- `unwatched_count`: Unwatched Count (number)

### `list_webhooks`

**List Webhooks.** Lists every webhook on the connected account's Hub settings: ID, target URL, whether it is enabled (or why it is disabled), the watched users, organizations and repositories, the event domains and whether a signing secret is set. The secret itself is never returned. Use it to find a webhook ID for Get, Update, Enable or Disable, or Delete Webhook. Needs a 'write' role token or a fine-grained token with webhook permission. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `webhooks`: Webhooks
- `webhooks[].id`: Webhook ID
- `webhooks[].url`: Target URL (url)
- `webhooks[].enabled`: Enabled (boolean)
- `webhooks[].disabled_reason`: Disabled Reason
- `webhooks[].watched`: Watched Items
- `webhooks[].watched[].type`: Type
- `webhooks[].watched[].name`: Name
- `webhooks[].domains`: Event Domains
- `webhooks[].has_secret`: Has Secret (boolean)
- `webhooks[].runs_job`: Runs a Job (boolean)
- `webhooks[].last_trigger_at`: Last Triggered At (datetime)
- `count`: Count (number)

### `get_webhook`

**Get Webhook.** Returns one webhook by its 24-character ID: target URL, enabled state (or why it is disabled), watched users, organizations and repositories, event domains, whether a signing secret is set and when it last fired. The secret itself is never returned. Find the ID with List Webhooks. Needs a 'write' role token or a fine-grained token with webhook permission. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook ID. The webhook's 24-character hexadecimal ID. Find it with List Webhooks. |

Output fields:

- `id`: Webhook ID
- `url`: Target URL (url)
- `enabled`: Enabled (boolean)
- `disabled_reason`: Disabled Reason
- `watched`: Watched Items
- `watched[].type`: Type
- `watched[].name`: Name
- `domains`: Event Domains
- `has_secret`: Has Secret (boolean)
- `runs_job`: Runs a Job (boolean)
- `last_trigger_at`: Last Triggered At (datetime)

### `create_webhook`

**Create Webhook.** Creates a user-level Hub webhook that POSTs an event to an https target URL (for example an Activepieces Catch Webhook URL) whenever a watched user, organization or repository changes: repository updates (commits, tags, settings) and/or discussion and pull-request activity. An optional secret is sent back in the X-Webhook-Secret header so the receiver can verify the call; it is never returned by any action. Needs a 'write' role token or a fine-grained token with webhook permission. Each call creates a new webhook, so a retry creates a duplicate; check List Webhooks first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Target URL. The https:// address the Hub will POST events to. |
| `watched` | array | yes |  | Watched Items. The users, organizations or repositories whose changes trigger the webhook. At least one. Each item: { `type`, `name` }. |
| `domains` | array | yes |  | Domains. Which kinds of events to send: repository changes, discussion and pull-request activity, or both. One of `"repo"`, `"discussion"`. |
| `secret` | string | no |  | Secret. Optional shared secret, sent in the X-Webhook-Secret header of every delivery. Printable ASCII only. It cannot be read back later. |

Output fields:

- `id`: Webhook ID
- `url`: Target URL (url)
- `enabled`: Enabled (boolean)
- `disabled_reason`: Disabled Reason
- `watched`: Watched Items
- `watched[].type`: Type
- `watched[].name`: Name
- `domains`: Event Domains
- `has_secret`: Has Secret (boolean)
- `runs_job`: Runs a Job (boolean)
- `last_trigger_at`: Last Triggered At (datetime)

### `update_webhook`

**Update Webhook.** Updates a webhook by its 24-character ID. It reads the current webhook first and changes only the fields you provide: Watched Items and Domains, when given, replace the whole existing list, so include every item to keep. The signing secret is sent only when you provide a new one; whether the Hub keeps an existing secret when it is omitted is not yet verified, so the result reports secret_status ('kept', 'replaced', 'set', 'cleared' or 'none') and a warning if it was cleared, in which case call again with the secret. Webhooks that run a Hub Job are refused. To pause deliveries use Enable or Disable Webhook. Needs a 'write' role token or a fine-grained token with webhook permission. Safe to retry with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook ID. The webhook's 24-character hexadecimal ID. Find it with List Webhooks. |
| `url` | string | no |  | Target URL. New https:// address for deliveries. Leave empty to keep the current URL. |
| `watched` | array | no |  | Watched Items. Replaces the full list of watched users, organizations and repositories. Leave empty to keep the current list. Each item: { `type`, `name` }. |
| `domains` | array | no |  | Domains. Replaces the event domains. Leave empty to keep the current domains. One of `"repo"`, `"discussion"`. |
| `secret` | string | no |  | New Secret. A new shared secret for the X-Webhook-Secret header. Leave empty to not send one. Printable ASCII only. |

Output fields:

- `id`: Webhook ID
- `url`: Target URL (url)
- `enabled`: Enabled (boolean)
- `disabled_reason`: Disabled Reason
- `watched`: Watched Items
- `watched[].type`: Type
- `watched[].name`: Name
- `domains`: Event Domains
- `has_secret`: Has Secret (boolean)
- `runs_job`: Runs a Job (boolean)
- `last_trigger_at`: Last Triggered At (datetime)
- `secret_status`: Secret Status
- `warning`: Warning

### `delete_webhook`

**Delete Webhook.** Permanently deletes a webhook by its 24-character ID; the Hub stops calling its URL and the configuration, including any signing secret, is lost. To pause deliveries reversibly, prefer Enable or Disable Webhook. Find the ID with List Webhooks. Needs a 'write' role token or a fine-grained token with webhook permission. Cannot be undone, and a retry after success fails with 404. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook ID. The webhook's 24-character hexadecimal ID. Find it with List Webhooks. |

Output fields:

- `webhook_id`: Webhook ID
- `deleted`: Deleted (boolean)

### `set_webhook_enabled`

**Enable or Disable Webhook.** Enables or disables a webhook by its 24-character ID without changing its configuration: a disabled webhook keeps its URL, watched items and secret but receives no deliveries. Use it to pause or resume a webhook, including one the Hub suspended after repeated failures; prefer it over Delete Webhook. Find the ID with List Webhooks. Needs a 'write' role token or a fine-grained token with webhook permission. Safe to retry: setting the same state again converges. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook ID. The webhook's 24-character hexadecimal ID. Find it with List Webhooks. |
| `enabled` | boolean | yes | `true` | Enabled. Checked to enable the webhook, unchecked to disable it. |

Output fields:

- `id`: Webhook ID
- `url`: Target URL (url)
- `enabled`: Enabled (boolean)
- `disabled_reason`: Disabled Reason
- `watched`: Watched Items
- `watched[].type`: Type
- `watched[].name`: Name
- `domains`: Event Domains
- `has_secret`: Has Secret (boolean)
- `runs_job`: Runs a Job (boolean)
- `last_trigger_at`: Last Triggered At (datetime)

### `list_inference_endpoints`

**List Inference Endpoints.** Lists the dedicated Inference Endpoints (paid, billing-enabled deployments) of a namespace, which defaults to the connected user: name, model repository, task, framework, state (for example 'running', 'paused' or 'scaledToZero'), public URL, access type, hardware, cloud vendor and region, and replica bounds. Pass an organization name to list its endpoints. A namespace without a payment method has no endpoints and may answer 401. Environment variables and secrets of the endpoints are never returned. For the serverless Inference Providers, use the inference actions instead. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `namespace` | string | no |  | Namespace. The user or organization that owns the endpoints, for example 'my-org'. Leave empty for the connected user. Get organization names from Get Current User & Token. |

Output fields:

- `namespace`: Namespace
- `endpoints`: Endpoints
- `endpoints[].name`: Name
- `endpoints[].type`: Access Type
- `endpoints[].state`: State
- `endpoints[].url`: Endpoint URL (url)
- `endpoints[].status_message`: Status Message
- `endpoints[].created_at`: Created At (datetime)
- `endpoints[].updated_at`: Updated At (datetime)
- `endpoints[].repository`: Model Repository
- `endpoints[].revision`: Model Revision
- `endpoints[].task`: Task
- `endpoints[].framework`: Framework
- `endpoints[].accelerator`: Accelerator
- `endpoints[].instance_type`: Instance Type
- `endpoints[].instance_size`: Instance Size
- `endpoints[].min_replica`: Min Replicas (number)
- `endpoints[].max_replica`: Max Replicas (number)
- `endpoints[].vendor`: Cloud Vendor
- `endpoints[].region`: Region
- `count`: Count (number)

### `get_user_socials`

**Get User Social Handles.** Returns the social media handles a Hugging Face user has added to their profile (Twitter/X, GitHub, LinkedIn, Bluesky); a handle the user has not provided is null. Get User Profile has the rest of the profile but no handles; use Get Organization Social Handles for an organization. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The user's Hub username, for example 'julien-c'. |

Output fields:

- `username`: Username
- `twitter`: X (Twitter) Handle
- `github`: GitHub Handle
- `linkedin`: LinkedIn Handle
- `bluesky`: Bluesky Handle

### `get_organization_socials`

**Get Organization Social Handles.** Returns the social media handles a Hugging Face organization has added to its profile (Twitter/X, GitHub, LinkedIn); a handle it has not provided is null. Get Organization Profile has the rest of the profile but no handles; use Get User Social Handles for a person. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization` | string | yes |  | Organization. The organization's Hub name, for example 'huggingface'. |

Output fields:

- `organization`: Organization
- `twitter`: X (Twitter) Handle
- `github`: GitHub Handle
- `linkedin`: LinkedIn Handle

### `search_hf_docs`

**Search Hugging Face Docs.** Searches the official Hugging Face documentation (Hub, Transformers, Datasets, Inference Providers, Inference Endpoints, the huggingface_hub client and many more) and returns the best-matching passages, each with its page title, section headings, URL and text. Optionally restrict to one product. Use it to look up how a Hub feature, API parameter or library works. Returns at most 25 passages and no pagination. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. What to look for, in plain words, for example 'webhook secret header'. Up to 250 characters. |
| `product` | string | no |  | Product. Only search the documentation of this product. Leave empty to search all of them. One of `"hub"`, `"transformers"`, `"diffusers"`, `"datasets"`, `"gradio"`, `"trackio"`, `"smolagents"`, `"huggingface_hub"`, `"cli"`, `"huggingface.js"`, `"transformers.js"`, `"inference-providers"`, `"inference-endpoints"`, `"peft"`, `"accelerate"`, `"optimum"`, `"optimum-habana"`, `"optimum-neuron"`, `"optimum-intel"`, `"optimum-executorch"`, `"optimum-tpu"`, `"tokenizers"`, `"llm-course"`, `"context-course"`, `"robotics-course"` and 36 more. |
| `limit` | number | no | `10` | Limit. Maximum number of passages to return (1 to 25). Defaults to 10. |

Output fields:

- `results`: Passages
- `results[].title`: Page Title
- `results[].url`: URL (url)
- `results[].product`: Product
- `results[].section`: Section
- `results[].text`: Text (Markdown)
- `count`: Count (number)
