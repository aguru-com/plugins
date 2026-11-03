# Thankster

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-thankster'
  version: '0.1.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Go My Profile page to find your API Key at the bottom.

## Actions

### `send_handwritten_cards`

**Send Cards.** Sends a physical handwritten card via Thankster, using one of the account's saved card templates, to a recipient mailing address. Choose this to mail a real card (thank-you, greeting, marketing) from an automation. Requires a valid template ID plus sender and recipient name/address; the optional text and image-URL fields override the template's corresponding text/image boxes, otherwise the template's own content is used. Not idempotent — each call places a new card order. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateID` | string | yes |  | Select a Thankster Template. If you are passing text or images from prior steps in this step into the Thankster template chosen above, be sure to select a template that has corresponding text or images boxes to pass it into. Either way, the font and style of your cards will be taken from the template you select. A value the product loads from the provider, such as an id; write the value itself. |
| `fname` | string | yes |  | Sender Firstname. Sender first name. |
| `lname` | string | no |  | Sender Lastname. Sender last name. |
| `company` | string | no |  | Sender Company Name. Enter sender company name. |
| `address` | string | yes |  | Sender Address1. Enter sender address1. |
| `address2` | string | no |  | Sender Address2. Enter sender address2. |
| `city` | string | yes |  | Sender City. Enter sender city. |
| `state` | string | no |  | Sender State. Enter sender state. |
| `zip` | string | yes |  | Sender Zip. Enter sender zip. |
| `country` | string | no | `"US"` | Sender Country. If not US, type the two character country code. |
| `r_fname` | string | yes |  | Receiver Firstname. Receiver first name. |
| `r_lname` | string | no |  | Receiver Lastname. Receiver last name. |
| `r_company` | string | no |  | Receiver Company. Receiver company name. |
| `r_address` | string | yes |  | Receiver Address1. Receiver address1. |
| `r_address2` | string | no |  | Receiver Address2. Receiver address2. |
| `r_city` | string | yes |  | Receiver City. Receiver city. |
| `r_state` | string | no |  | Receiver State. Receiver state. |
| `r_zip` | string | yes |  | Receiver Zip. Receiver zip. |
| `r_country` | string | no | `"US"` | Receiver Country. If not US, type the two character country code. |
| `api_text_one` | string | no |  | Text One. Optional - if left blank, it will take the message from your Thankster template. Otherwise, map this to an api text box in the Thankster template being in Thankster Template field, 200 character maximum suggested. |
| `api_text_two` | string | no |  | Text Two. Optional - if left blank, it will take the message from your Thankster template. Otherwise, map this to an api text box in the Thankster template being in Thankster Template field, 200 character maximum suggested. |
| `api_text_three` | string | no |  | Text Three. Optional - if left blank, it will take the message from your Thankster template. Otherwise, map this to an api text box in the Thankster template being in Thankster Template field, 200 character maximum suggested. |
| `api_text_four` | string | no |  | Text Four. Optional - if left blank, it will take the message from your Thankster template. Otherwise, map this to an api text box in the Thankster template being in Thankster Template field, 200 character maximum suggested. |
| `api_image_one` | string | no |  | Image One (URL). Optional image URL for image one. Be sure this image is at least 1500 x 1900 pixels and has that aspect ratio to avoid stretching or pixelated. |
| `api_image_two` | string | no |  | Image Two (URL). Optional image URL for image one. Be sure this image is at least 1500 x 1900 pixels and has that aspect ratio to avoid stretching or pixelated. |
| `api_image_three` | string | no |  | Image Three (URL). Optional image URL for image one. Be sure this image is at least 1500 x 1900 pixels and has that aspect ratio to avoid stretching or pixelated. |
| `api_image_four` | string | no |  | Image Four (URL). Optional image URL for image one. Be sure this image is at least 1500 x 1900 pixels and has that aspect ratio to avoid stretching or pixelated. |
| `sender_image` | string | no |  | Sender Image. Optional image URL for return address (on the envelope). The recommended image size is 300x120 pixels or that aspect ratio to avoid stretching or pixelation. The image will be on top of the text and it will be downsized preserving the aspect ratio to fit the boundaries if necessary. |
| `recipient_image` | string | no |  | Recipient Image. Optional image URL for return address (on the envelope). The recommended image size is 300x120 pixels or that aspect ratio to avoid stretching or pixelation. The image will be on top of the text and it will be downsized preserving the aspect ratio to fit the boundaries if necessary. |
