# Image Helper

Tools for image manipulations

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-image-helper'
  version: '0.1.22'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `image_to_base64`

**Image to Base64.** Turns an image file into an inline data URL string (data:<mime>;base64,...), inferring the MIME type from the file extension with an optional explicit override. Use it when a downstream HTTP body, HTML snippet, or vision model needs the image inlined rather than passed as a file reference; use convert_image_format first if the consumer only accepts one specific format. Base64 inflates the payload by roughly a third so very large images can hit request limits, and an override is needed when the source has no reliable extension - pure encoding, read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. The image to convert. Files are not supported; an action that needs one fails. |
| `override_mime_type` | string | no |  | Override mime type. The mime type to use when converting the image. In case you want to override the default mime type. Example image/png. |

### `get_meta_data`

**Get image metadata.** Reads the embedded EXIF/XMP/IPTC tag block of an image file and returns the parsed tags - dimensions, orientation, camera settings, timestamps, GPS. Use it to inspect an image before deciding how to transform it (for example checking orientation before rotate_image); it never alters the image and cannot write metadata back. Only tags actually present in the file are returned, so stripped or re-exported images may yield almost nothing; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. Files are not supported; an action that needs one fails. |

### `crop_image`

**Crop an image.** Cuts a rectangular region out of an image file, given the left and top offset plus the width and height of the region in source pixels, and writes it as a new file in the original format. Choose this to trim or extract part of an image; use resize_image to scale the whole image instead, or rotate_image to reorient it. All four numeric bounds are required and must fall within the source dimensions - pure pixel computation and idempotent, so the same image and box always yield the same crop.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. Files are not supported; an action that needs one fails. |
| `left` | number | yes |  | Left. Specifies the horizontal position, indicating where the cropping starts from the left side of the image. |
| `top` | number | yes |  | Top. Represents the vertical position, indicating the starting point from the top of the image. |
| `width` | number | yes |  | Width. Determines the horizontal size of the cropped area. |
| `height` | number | yes |  | Height. Determines the vertical size of the cropped area. |
| `resultFileName` | string | no |  | Result File Name. Specifies the output file name for the cropped image (without extension). |

### `rotate_image`

**Rotate an image.** Rotates an image clockwise by a fixed 90, 180, or 270 degrees and writes the result as a new file in the source format. Use it to reorient a photo or scan (get_meta_data can report the stored EXIF orientation first); use crop_image to trim edges or resize_image to change dimensions. Only those three degree values are accepted, so arbitrary angles are not supported; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. Files are not supported; an action that needs one fails. |
| `degree` | string | yes |  | Degree. Specifies the degree of clockwise rotation applied to the image. One of `90`, `180`, `270`. |
| `resultFileName` | string | no |  | Result File Name. Specifies the output file name for the result image (without extension). |

### `resize_image`

**Resize an image.** Scales an image to an explicit pixel width and height, or to a width with the height derived automatically when the maintain-aspect-ratio option is set, writing the result as a new file in the source format. Pick this to change dimensions; use compress_image when the dimensions are fine and only file size must drop, or crop_image to cut out a region instead of squeezing the whole frame. Width and height are both required numbers even when aspect ratio is maintained (height is then ignored), and mismatched ratios stretch rather than letterbox the image; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. Files are not supported; an action that needs one fails. |
| `width` | number | yes |  | Width. Specifies the width of the image. |
| `height` | number | yes |  | Height. Specifies the height of the image. |
| `aspectRatio` | boolean | no | `false` | Maintain aspect ratio for height. |
| `resultFileName` | string | no |  | Result File Name. Specifies the output file name for the result image (without extension). |

### `compress_image`

**Compresses an image.** Re-encodes an image file at a chosen quality level (high ~90 or lossy ~60), keeping the original pixel dimensions and the source file format, so pick it to shrink file size only - use resize_image to change dimensions or convert_image_format to change format. Requires an image file plus a quality and format choice, but the format choice only sets the output file extension while the pixels are re-encoded in the source format, and quality applies only to lossy JPEG-style encoding; deterministic and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. Files are not supported; an action that needs one fails. |
| `quality` | string | yes |  | Quality. Specifies the quality of the image after compression (0-100). One of `90`, `60`. |
| `format` | string | yes |  | Format. Specifies the format of the image after compression. One of `"jpg"`, `"png"`. |
| `resultFileName` | string | no |  | Result File Name. Specifies the output file name for the result image (without extension). |

### `convert_image_format`

**Image Conversion Helper.** Converts an uploaded image file to JPEG, PNG, TIFF, BMP, or AVIF, transparently decoding HEIC/HEIF sources first. Use it when a downstream step needs one specific format - use compress_image to only shrink a file in place, or image_to_base64 to inline an image as a data URL. Requires an image file and one target format, and HEIC/HEIF sources are detected only from the file extension or name, so an extensionless HEIC may fail to decode; deterministic and idempotent for the same input.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. Files are not supported; an action that needs one fails. |
| `outputFormat` | string | yes |  | Output Format. The format to convert the image to. One of `"JPEG"`, `"PNG"`, `"TIFF"`, `"BMP"`, `"AVIF"`. |
| `resultFileName` | string | no |  | Result File Name. Specifies the output file name for the result image (without extension). |
