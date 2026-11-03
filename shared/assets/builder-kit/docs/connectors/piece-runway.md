# Runway

AI-powered content generation platform for creating high-quality images and videos using text prompts

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-runway'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Runway API key. Get it from your Runway account settings.

## Actions

### `generate_image_from_text`

**Generate Image From Text.** Submits a text-to-image generation job to Runway and returns the created task ID; the image is produced asynchronously, so poll Get Task Details with that ID to retrieve the result. Choose when an agent needs to create an image from a prompt. Each call starts a new billable generation, so it is not idempotent; the gen4_image_turbo model requires at least one reference image. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. AI model to use for image generation. One of `"gen4_image"`, `"gen4_image_turbo"`. |
| `promptText` | string | yes |  | Prompt. Describe what you want to see in the image (max 1000 characters) |
| `ratio` | string | yes |  | Image Ratio. Resolution of the output image. One of `"1920:1080"`, `"1080:1920"`, `"1024:1024"`, `"1360:768"`, `"1080:1080"`, `"1168:880"`, `"1440:1080"`, `"1080:1440"`, `"1808:768"`, `"2112:912"`, `"1280:720"`, `"720:1280"`, `"720:720"`, `"960:720"`, `"720:960"`, `"1680:720"`. |
| `seed` | number | no |  | Seed (Optional). Random seed for reproducible results (0-4294967295) |
| `referenceImages` | array | no |  | Reference Images (Optional). Up to 3 reference images (required for gen4_image_turbo) Each item: { `uri`, `tag`? }. |
| `publicFigureThreshold` | string | no | `"auto"` | Public Figure Detection. How strict content moderation should be for recognizable public figures. One of `"auto"`, `"low"`. |

### `generate_video_from_image`

**Generate Video From Image.** Submits an image-to-video generation job to Runway from a starting frame and optional prompt, returning the created task ID; the video is produced asynchronously, so poll Get Task Details with that ID for the result. Provide the starting frame as exactly one of an uploaded file or an HTTPS image URL (not both). Choose when an agent needs to animate an image into a clip. Each call starts a new billable generation, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. AI model to use for video generation. One of `"gen4_turbo"`, `"gen3a_turbo"`, `"veo3"`. |
| `promptImageFile` | file | no |  | Prompt Image File. Upload an image file to use as the video's starting frame. Files are not supported; an action that needs one fails. |
| `promptImageUrl` | string | no |  | Prompt Image URL. HTTPS URL of an image to use as the video's starting frame. |
| `imagePosition` | string | no | `"first"` | Image Position. Position of the image in the video (last frame only supported by gen3a_turbo) One of `"first"`, `"last"`. |
| `promptText` | string | no |  | Prompt Text (Optional). Describe what should happen in the video (max 1000 characters) |
| `ratio` | object | yes |  | Video Resolution. Available resolutions depend on the selected model. An object whose fields depend on other inputs; the product shows them. |
| `duration` | object | yes |  | Video Duration. Available durations depend on the selected model. An object whose fields depend on other inputs; the product shows them. |
| `seed` | number | no |  | Seed (Optional). Random seed for reproducible results (0-4294967295) |
| `contentModeration` | object | no |  | Content Moderation. Content moderation settings (not available for veo3) An object whose fields depend on other inputs; the product shows them. |

### `get_task_details`

**Get Task Details.** Looks up a Runway generation task by its ID and returns its current status, progress, and output URLs; optionally downloads the generated files as attachments when the task has succeeded. Use to poll the result of an image or video generation started by the generate actions. Read-only and idempotent; requires a valid task UUID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The unique ID of the task to retrieve (UUID format) |
| `downloadOutput` | boolean | no | `false` | Download Output Files. Download and return the generated files as attachments (if task succeeded) |

### `cancel_or_delete_task`

**Cancel or Delete Task.** Aborts or removes a Runway task by ID: a running, pending, or throttled task is cancelled, while an already-completed task is deleted. Use when an agent needs to stop a generation in progress or clean up a finished task. Mutating and not idempotent (a repeat call on an already-removed task reports it as already deleted); requires a valid task UUID. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the task to cancel or delete (UUID format) |
