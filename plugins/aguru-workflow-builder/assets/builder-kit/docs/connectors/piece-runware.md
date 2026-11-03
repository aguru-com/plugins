# Runware

Runware.AI is a high-performance, cost-effective AI media generation API specializing in images and videos. Through this integration, workflows can automatically generate visuals via text or image prompts and interact with Runware’s full-featured API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-runware'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can get the API key from your Runware account

## Actions

### `generateImagesFromText`

**Generate Images from Text.** Generates one or more brand-new images from a text prompt using Runware (text-to-image). Choose this for pure text-to-image generation when no source image is supplied; requires a positive prompt, a model AIR identifier, and width/height. Not idempotent: each call runs a fresh generation, and unless a fixed seed is provided the output varies between runs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. You can find model in the Model Explorer (https://my.runware.ai/models/all) tool. |
| `positivePrompt` | string | yes |  | Positive Prompt. A positive prompt is a text instruction to guide the model on generating the image. It is usually a sentence or a paragraph that provides positive guidance for the task. This parameter is essential to shape the desired results. |
| `negativePrompt` | string | no |  | Negative Prompt. A negative prompt is a text instruction to guide the model on generating the image. It is usually a sentence or a paragraph that provides negative guidance for the task. This parameter helps to avoid certain undesired results. |
| `height` | number | yes |  | Height. Used to define the height dimension of the generated image. Certain models perform better with specific dimensions. |
| `width` | number | yes |  | Width. Used to define the width dimension of the generated image. Certain models perform better with specific dimensions. |
| `steps` | number | no |  | Steps. The number of steps is the number of iterations the model will perform to generate the image. The higher the number of steps, the more detailed the image will be. However, increasing the number of steps will also increase the time it takes to generate the image and may not always result in a better… |
| `CFGScale` | number | no |  | CFG Scale. Guidance scale represents how closely the images will resemble the prompt or how much freedom the AI model has. Higher values are closer to the prompt. Low values may reduce the quality of the results. |
| `scheduler` | string | no |  | Scheduler. An scheduler is a component that manages the inference process. Different schedulers can be used to achieve different results like more detailed images, faster inference, or more accurate results. |
| `seed` | number | no |  | Seed. A seed is a value used to randomize the image generation. If you want to make images reproducible (generate the same image multiple times), you can use the same seed value. |
| `vae` | string | no |  | VAE. VAE (Variational Autoencoder) is a type of neural network architecture used for generating images. Some models may require a specific VAE to work properly. If you want to use a specific VAE, you can provide its AIR identifier here. |
| `clipSkip` | number | no |  | Clip Skip. Defines additional layer skips during prompt processing in the CLIP model. Some models already skip layers by default, this parameter adds extra skips on top of those. Different values affect how your prompt is interpreted, which can lead to variations in the generated image. |

### `generateImagesFromExistingImage`

**Generate Images from Existing Image.** Generates new images conditioned on a source seed image plus a text prompt using Runware (image-to-image). Choose this over text-to-image when transforming or restyling an existing picture; requires the seed image as a URL, a model AIR identifier, a positive prompt, and width/height, with an optional strength controlling how far the result departs from the source. Not idempotent: each call runs a fresh generation that varies unless a fixed seed is set. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `seedImage` | string | yes |  | Seed Image. A URL for the seed image to base the generation on. |
| `model` | string | yes |  | Model. You can find model in the Model Explorer (https://my.runware.ai/models/all) tool. |
| `positivePrompt` | string | yes |  | Positive Prompt. A positive prompt is a text instruction to guide the model on generating the image. It is usually a sentence or a paragraph that provides positive guidance for the task. This parameter is essential to shape the desired results. |
| `height` | number | yes |  | Height. Used to define the height dimension of the generated image. Certain models perform better with specific dimensions. |
| `width` | number | yes |  | Width. Used to define the width dimension of the generated image. Certain models perform better with specific dimensions. |
| `negativePrompt` | string | no |  | Negative Prompt. A negative prompt is a text instruction to guide the model on generating the image. It is usually a sentence or a paragraph that provides negative guidance for the task. This parameter helps to avoid certain undesired results. |
| `strength` | number | no |  | Strength. A value between 0 and 1 that indicates how much to transform the seed image. A value of 0 will keep the image as is, while a value of 1 will completely transform it according to the prompt. |
| `steps` | number | no |  | Steps. The number of steps is the number of iterations the model will perform to generate the image. The higher the number of steps, the more detailed the image will be. However, increasing the number of steps will also increase the time it takes to generate the image and may not always result in a better… |
| `CFGScale` | number | no |  | CFG Scale. Guidance scale represents how closely the images will resemble the prompt or how much freedom the AI model has. Higher values are closer to the prompt. Low values may reduce the quality of the results. |
| `scheduler` | string | no |  | Scheduler. An scheduler is a component that manages the inference process. Different schedulers can be used to achieve different results like more detailed images, faster inference, or more accurate results. |

### `generateVideoFromText`

**Generate Video from Text.** Generates one or more videos from a text prompt using Runware (text-to-video). Choose this for producing video clips rather than still images; requires a positive prompt and a model AIR identifier, with optional duration, fps, and output format (MP4, WEBM, or MOV). Not idempotent: each call runs a fresh generation and output varies between runs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `positivePrompt` | string | yes |  | Positive Prompt. A positive prompt is a text instruction to guide the model on generating the image. It is usually a sentence or a paragraph that provides positive guidance for the task. This parameter is essential to shape the desired results. |
| `negativePrompt` | string | no |  | Negative Prompt. A negative prompt is a text instruction to guide the model on generating the image. It is usually a sentence or a paragraph that provides negative guidance for the task. This parameter helps to avoid certain undesired results. |
| `model` | string | yes |  | Model. You can find model in the Model Explorer (https://my.runware.ai/models/all) tool. |
| `duration` | number | no |  | Duration. The duration of the generated video in seconds. |
| `fps` | number | no |  | FPS. Frames per second for the generated video. |
| `outputFormat` | string | no |  | Output Format. The format of the generated video. One of `"MP4"`, `"WEBM"`, `"MOV"`. |
| `outputQuality` | number | no |  | Output Quality. Sets the compression quality of the output video. Higher values preserve more quality but increase file size, lower values reduce file size but decrease quality. |
| `uploadEndpoint` | string | no |  | Upload Endpoint. Specifies a URL where the generated content will be automatically uploaded using the HTTP PUT method. The raw binary data of the media file is sent directly as the request body. For secure uploads to cloud storage, use presigned URLs that include temporary authentication credentials. |
| `numberResults` | number | no |  | Number of Results. Specifies how many videos to generate for the given parameters. Each video will have the same parameters but different seeds, resulting in variations of the same concept. |

### `imageBackgroundRemoval`

**Image Background Removal.** Removes the background from an input image using Runware, returning a newly generated image (optionally PNG, JPG, or WEBP). Choose this to isolate a subject or produce a transparent cutout; requires the input image as a URL and a model AIR identifier. Not idempotent: each call submits a fresh generation request rather than returning a stored result. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputImage` | string | yes |  | Input Image. A URL for the image to have its background removed. |
| `model` | string | yes |  | Model. You can find model in the Model Explorer (https://my.runware.ai/models/all) tool. |
| `outputFormat` | string | no |  | Output Format. The format of the output image with the background removed. One of `"PNG"`, `"JPG"`, `"WEBP"`. |
| `outputQuality` | number | no |  | Output Quality. Sets the compression quality of the output image. Higher values preserve more quality but increase file size, lower values reduce file size but decrease quality. |
| `uploadEndpoint` | string | no |  | Upload Endpoint. Specifies a URL where the generated content will be automatically uploaded using the HTTP PUT method. The raw binary data of the media file is sent directly as the request body. For secure uploads to cloud storage, use presigned URLs that include temporary authentication credentials. |
