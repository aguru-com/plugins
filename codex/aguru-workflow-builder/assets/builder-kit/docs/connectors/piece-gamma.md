# Gamma

An AI-powered design partner that helps users generate presentations, documents, social media posts, cards, etc., via natural language.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gamma'
  version: '0.1.9'
```

Categories: CONTENT_AND_FILES, ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these steps to get your Gamma API Key:
>
> 1.  Log in to your Gamma account. You must have a **Pro or Ultra plan** to access the API.
> 2.  Navigate to **Settings & Members** (click your workspace name in the top-left).
> 3.  Go to the **API Key** tab.
> 4.  Click **Create API key** and give it a name (e.g., "Activepieces").
> 5.  Copy the key (it starts with `sk-gamma-`) and paste it below.
>
> **Direct Link to API Settings:** [**https://gamma.app/settings/api**](https://gamma.app/settings/api)

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Paste your API key here. |

## Actions

### `generateGamma`

**Generate Gamma.** Starts an asynchronous Gamma generation job from input text, producing a presentation, document, social post, or webpage (set via the format prop). Use to kick off AI content creation; the job runs in the background, so follow up with "Get Generation" using the returned generation ID to poll for completion and outputs. Requires input text (1-400,000 chars); not idempotent — each call queues a new generation and consumes credits. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | no |  | Folder. The folder to save the generated gamma into. A value the product loads from the provider, such as an id; write the value itself. |
| `inputText` | string | yes |  | Input Text. Text used to generate your gamma (1-400,000 characters). |
| `textMode` | string | no |  | Text Mode. How you want your inputText to be modified. One of `"generate"`, `"condense"`, `"preserve"`. |
| `format` | string | no |  | Format. The type of artifact you want to create. One of `"presentation"`, `"document"`, `"social"`, `"webpage"`. |
| `themeName` | string | no |  | Theme Name. The theme from Gamma to be used. Defaults to workspace default. |
| `numCards` | number | no |  | Number of Cards. How many cards to create (default 10). Pro: 1-50, Ultra: 1-75. |
| `cardSplit` | string | no |  | Card Split. How your content will be divided into cards. Use '---' in text for breaks. One of `"auto"`, `"inputTextBreaks"`. |
| `additionalInstructions` | string | no |  | Additional Instructions. Extra specifications about the desired content and layouts (1-500 characters). |
| `exportAs` | string | no |  | Export As. Additional file types for saving your gamma. One of `"pdf"`, `"pptx"`. |
| `textOptions` | JSON | no | `{}` | Text Options. JSON object for text attributes (e.g., amount, tone, audience, language). |
| `imageOptions` | JSON | no | `{}` | Image Options. JSON object for image attributes (e.g., source, model, style). |
| `cardOptions` | JSON | no | `{}` | Card Options. JSON object for card attributes (e.g., dimensions). |
| `sharingOptions` | JSON | no | `{}` | Sharing Options. JSON object for sharing attributes (e.g., workspaceAccess, externalAccess). |

### `getGeneration`

**Get Generation.** Fetches the current status, outputs, and metadata of a Gamma generation job by its generation ID (returned from "Generate Gamma"). Use to poll an in-progress generation until it completes and to retrieve the resulting URLs/files. Read-only and idempotent — safe to call repeatedly while waiting for the job to finish. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `generationId` | string | yes |  | Generation ID. The ID of the generation job (from the "Generate Gamma" action). |
