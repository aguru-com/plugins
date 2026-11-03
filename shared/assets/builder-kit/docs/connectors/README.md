# Connectors

Every third-party connector installed on the platform: 766 of them. A connector's actions run with the [`activepiece`](../blocks/activepiece.md) block, which pins the package and its exact version. Only actions are available; a connector's triggers are not. Each page lists the actions, their inputs and the authentication methods.

Most actions also list their output fields: paths under the block's `out`, so `channel.id` is read as `${ctx.post.channel.id}`. `[]` marks each item of a list, and a path starting with `[]` means the output itself is a list. The list is a selection; a run can return more. An action's kind says whether it reads, searches, writes or destroys data, and whether repeating it is safe.

```yaml
- id: post-update
  type: activepiece
  with:
    piece: '@activepieces/piece-slack' # the Package column
    version: '0.23.1' # the Version column, exactly
    action: send_channel_message # an action name from its page
    credential: acme-slack # a saved API & HTTP credential key
    input: { channel: C0123456789, text: "${ctx.text}" }
  out: post
```

## Authentication

Give an action that needs it either `credential` or `auth`, never both:

- **`credential`** names an API & HTTP credential saved in the org that runs the workflow. It is read when the block runs, so a wrong key shows up only then. Put the key in config so each installation picks its own. A key or token becomes `SECRET_TEXT`, a token also `OAUTH2` (refreshed by the platform), a username and password `BASIC_AUTH`. For `CUSTOM_AUTH`, the credential's key holds a JSON object of the method's fields.
- **`auth`** builds the value from secret references: `auth: '{{ secret("name") }}'` for `SECRET_TEXT`, `{ access_token: ... }` for `OAUTH2`, `{ username, password }` for `BASIC_AUTH`, and an object of the method's fields for `CUSTOM_AUTH`.
- **`auth-type`** picks the method when a connector has several. Set it whenever it does: without it the platform guesses from the credential's shape.

Credentials saved only in the browser cannot be used by a workflow.

## Limits

- Each action runs in its own process: 4 minutes, a 256 MiB heap and 8 MiB of output. Private network addresses are refused, as for `http`.
- An action that needs files, flow or waitpoint features, or a native driver fails; use native blocks for files and control flow.
- A failed attempt is retried, so a provider can see a side effect twice. Make actions idempotent where the provider allows it.
- A connector upgrade changes its version. A block pinned to a version no longer installed fails; the schema check catches it first.

## Installed connectors

| Connector | Package | Version | Actions | Authentication |
| --- | --- | --- | --- | --- |
| [0CodeKit](piece-0codekit.md) | `@activepieces/piece-0codekit` | 0.1.2 | 75 | `SECRET_TEXT` |
| [1ClickImpact](piece-oneclickimpact.md) | `@activepieces/piece-oneclickimpact` | 0.1.0 | 5 | `SECRET_TEXT` |
| [ActiveCampaign](piece-activecampaign.md) | `@activepieces/piece-activecampaign` | 0.1.9 | 7 | `CUSTOM_AUTH` |
| [Activepieces Platform](piece-activepieces.md) | `@activepieces/piece-activepieces` | 0.5.2 | 4 | `CUSTOM_AUTH` |
| [Actual Budget](piece-actualbudget.md) | `@activepieces/piece-actualbudget` | 0.1.9 | 5 | `CUSTOM_AUTH` |
| [Acuity Scheduling](piece-acuity-scheduling.md) | `@activepieces/piece-acuity-scheduling` | 0.2.1 | 8 | `OAUTH2` |
| [Acumbamail](piece-acumbamail.md) | `@activepieces/piece-acumbamail` | 0.2.7 | 7 | `SECRET_TEXT` |
| [AddEvent](piece-add-event.md) | `@activepieces/piece-add-event` | 0.1.2 | 9 | `SECRET_TEXT` |
| [Afforai](piece-afforai.md) | `@activepieces/piece-afforai` | 0.1.7 | 1 | `SECRET_TEXT` |
| [AgentX](piece-agentx.md) | `@activepieces/piece-agentx` | 0.1.7 | 5 | `SECRET_TEXT` |
| [AI](piece-ai.md) | `@activepieces/piece-ai` | 0.11.0 | 6 | none |
| [AI Answer](piece-aianswer.md) | `@activepieces/piece-aianswer` | 0.2.1 | 6 | `SECRET_TEXT` |
| [Aidbase](piece-aidbase.md) | `@activepieces/piece-aidbase` | 0.2.1 | 7 | `SECRET_TEXT` |
| [AiPrise](piece-aiprise.md) | `@activepieces/piece-aiprise` | 0.2.2 | 17 | `CUSTOM_AUTH` |
| [Aircall](piece-aircall.md) | `@activepieces/piece-aircall` | 0.2.1 | 8 | `BASIC_AUTH` |
| [AirOps](piece-air-ops.md) | `@activepieces/piece-air-ops` | 0.2.1 | 4 | `SECRET_TEXT` |
| [Airparser](piece-airparser.md) | `@activepieces/piece-airparser` | 0.1.7 | 2 | `SECRET_TEXT` |
| [Airtable](piece-airtable.md) | `@activepieces/piece-airtable` | 0.9.2 | 34 | `SECRET_TEXT` |
| [Airtop](piece-airtop.md) | `@activepieces/piece-airtop` | 0.2.1 | 12 | `SECRET_TEXT` |
| [AITable](piece-apitable.md) | `@activepieces/piece-apitable` | 0.4.2 | 12 | `CUSTOM_AUTH` |
| [Alai](piece-alai.md) | `@activepieces/piece-alai` | 0.2.0 | 6 | `CUSTOM_AUTH` |
| [Algolia](piece-algolia.md) | `@activepieces/piece-algolia` | 0.1.2 | 4 | `CUSTOM_AUTH` |
| [AltText.ai](piece-alt-text-ai.md) | `@activepieces/piece-alt-text-ai` | 0.2.1 | 2 | `SECRET_TEXT` |
| [AltTextify](piece-alttextify.md) | `@activepieces/piece-alttextify` | 0.2.1 | 2 | `SECRET_TEXT` |
| [Amazon S3](piece-amazon-s3.md) | `@activepieces/piece-amazon-s3` | 0.8.0 | 19 | `CUSTOM_AUTH`, `OIDC` |
| [Amazon SES](piece-amazon-ses.md) | `@activepieces/piece-amazon-ses` | 0.1.7 | 7 | `CUSTOM_AUTH` |
| [Amazon SNS](piece-amazon-sns.md) | `@activepieces/piece-amazon-sns` | 0.1.7 | 1 | `CUSTOM_AUTH` |
| [Amazon SQS](piece-amazon-sqs.md) | `@activepieces/piece-amazon-sqs` | 0.1.7 | 1 | `CUSTOM_AUTH` |
| [Aminos](piece-aminos.md) | `@activepieces/piece-aminos` | 0.1.7 | 1 | `CUSTOM_AUTH` |
| [AMPECO](piece-ampeco.md) | `@activepieces/piece-ampeco` | 0.3.1 | 377 | `CUSTOM_AUTH` |
| [Anthropic Claude](piece-claude.md) | `@activepieces/piece-claude` | 0.7.2 | 12 | `SECRET_TEXT` |
| [AnyHook GraphQL](piece-anyhook-graphql.md) | `@activepieces/piece-anyhook-graphql` | 0.1.7 | 0 | `CUSTOM_AUTH` |
| [AnyHook Websocket](piece-anyhook-websocket.md) | `@activepieces/piece-anyhook-websocket` | 0.1.7 | 0 | `CUSTOM_AUTH` |
| [Apify](piece-apify.md) | `@activepieces/piece-apify` | 0.3.1 | 38 | `CUSTOM_AUTH` |
| [APITemplate.io](piece-apitemplate-io.md) | `@activepieces/piece-apitemplate-io` | 0.3.1 | 13 | `CUSTOM_AUTH` |
| [Apollo](piece-apollo.md) | `@activepieces/piece-apollo` | 0.2.1 | 7 | `SECRET_TEXT` |
| [AppFollow](piece-appfollow.md) | `@activepieces/piece-appfollow` | 0.2.1 | 3 | `SECRET_TEXT` |
| [Approval (Legacy)](piece-approval.md) | `@activepieces/piece-approval` | 0.1.28 | 2 | none |
| [Asana](piece-asana.md) | `@activepieces/piece-asana` | 0.7.2 | 126 | `OAUTH2` |
| [Ashby](piece-ashby.md) | `@activepieces/piece-ashby` | 0.2.1 | 1 | `CUSTOM_AUTH` |
| [AskHandle](piece-ask-handle.md) | `@activepieces/piece-ask-handle` | 0.1.8 | 4 | `SECRET_TEXT` |
| [AskNews](piece-asknews.md) | `@activepieces/piece-asknews` | 0.1.0 | 8 | `SECRET_TEXT` |
| [Assembled](piece-assembled.md) | `@activepieces/piece-assembled` | 0.1.9 | 6 | `SECRET_TEXT` |
| [AssemblyAI](piece-assemblyai.md) | `@activepieces/piece-assemblyai` | 1.1.10 | 14 | `SECRET_TEXT` |
| [Attio](piece-attio.md) | `@activepieces/piece-attio` | 0.3.1 | 92 | `SECRET_TEXT` |
| [Autocalls](piece-autocalls.md) | `@activepieces/piece-autocalls` | 0.1.7 | 5 | `SECRET_TEXT` |
| [Avian](piece-avian.md) | `@activepieces/piece-avian` | 0.0.8 | 1 | `SECRET_TEXT` |
| [Avoma](piece-avoma.md) | `@activepieces/piece-avoma` | 0.1.7 | 3 | `SECRET_TEXT` |
| [AWS Bedrock](piece-amazon-bedrock.md) | `@activepieces/piece-amazon-bedrock` | 0.4.1 | 5 | `CUSTOM_AUTH`, `OIDC` |
| [AWS Secrets Manager](piece-amazon-secrets-manager.md) | `@activepieces/piece-amazon-secrets-manager` | 0.2.1 | 6 | `CUSTOM_AUTH`, `OIDC` |
| [AWS Textract](piece-amazon-textract.md) | `@activepieces/piece-amazon-textract` | 0.4.0 | 5 | `CUSTOM_AUTH`, `OIDC` |
| [Azure Active Directory](piece-azure-ad.md) | `@activepieces/piece-azure-ad` | 0.3.2 | 17 | `OAUTH2` |
| [Azure Blob Storage](piece-azure-blob-storage.md) | `@activepieces/piece-azure-blob-storage` | 0.1.10 | 9 | `CUSTOM_AUTH` |
| [Azure Communication Services](piece-azure-communication-services.md) | `@activepieces/piece-azure-communication-services` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Azure DevOps](piece-azure-devops.md) | `@activepieces/piece-azure-devops` | 0.1.2 | 6 | `CUSTOM_AUTH` |
| [Azure OpenAI](piece-azure-openai.md) | `@activepieces/piece-azure-openai` | 0.2.1 | 2 | `CUSTOM_AUTH` |
| [Backblaze](piece-backblaze.md) | `@activepieces/piece-backblaze` | 0.1.7 | 2 | `CUSTOM_AUTH` |
| [BambooHR](piece-bamboohr.md) | `@activepieces/piece-bamboohr` | 0.3.1 | 1 | `CUSTOM_AUTH` |
| [Bannerbear](piece-bannerbear.md) | `@activepieces/piece-bannerbear` | 0.5.1 | 2 | `SECRET_TEXT` |
| [Barcode Lookup](piece-barcode-lookup.md) | `@activepieces/piece-barcode-lookup` | 0.0.9 | 1 | `SECRET_TEXT` |
| [Baremetrics](piece-baremetrics.md) | `@activepieces/piece-baremetrics` | 0.0.9 | 4 | `OAUTH2`, `SECRET_TEXT` |
| [Base44](piece-base44.md) | `@activepieces/piece-base44` | 0.1.8 | 3 | `CUSTOM_AUTH` |
| [Baserow](piece-baserow.md) | `@activepieces/piece-baserow` | 0.11.2 | 46 | `CUSTOM_AUTH` |
| [Beamer](piece-beamer.md) | `@activepieces/piece-beamer` | 0.2.1 | 5 | `SECRET_TEXT` |
| [Beebole](piece-beebole.md) | `@activepieces/piece-beebole` | 0.2.2 | 8 | `SECRET_TEXT` |
| [Beehiiv](piece-beehiiv.md) | `@activepieces/piece-beehiiv` | 0.4.1 | 8 | `SECRET_TEXT` |
| [Bettermode](piece-bettermode.md) | `@activepieces/piece-bettermode` | 0.2.1 | 5 | `CUSTOM_AUTH` |
| [Bexio](piece-bexio.md) | `@activepieces/piece-bexio` | 0.2.1 | 24 | `OAUTH2` |
| [BigCommerce](piece-bigcommerce.md) | `@activepieces/piece-bigcommerce` | 0.2.1 | 16 | `CUSTOM_AUTH` |
| [Bigin by Zoho CRM](piece-bigin-by-zoho.md) | `@activepieces/piece-bigin-by-zoho` | 0.1.7 | 16 | `OAUTH2` |
| [Bika.ai](piece-bika.md) | `@activepieces/piece-bika` | 0.3.1 | 14 | `CUSTOM_AUTH` |
| [Billplz](piece-billplz.md) | `@activepieces/piece-billplz` | 0.0.9 | 2 | `SECRET_TEXT` |
| [Binance](piece-binance.md) | `@activepieces/piece-binance` | 0.5.1 | 11 | none |
| [Bird](piece-messagebird.md) | `@activepieces/piece-messagebird` | 0.3.1 | 3 | `CUSTOM_AUTH` |
| [Bitly](piece-bitly.md) | `@activepieces/piece-bitly` | 0.2.0 | 6 | `CUSTOM_AUTH` |
| [Blackbaud](piece-blackbaud.md) | `@activepieces/piece-blackbaud` | 0.3.0 | 5 | `OAUTH2` |
| [Bland AI](piece-bland-ai.md) | `@activepieces/piece-bland-ai` | 0.2.2 | 4 | `SECRET_TEXT` |
| [Blockscout](piece-blockscout.md) | `@activepieces/piece-blockscout` | 0.1.7 | 34 | none |
| [Bloomerang](piece-bloomerang.md) | `@activepieces/piece-bloomerang` | 0.1.1 | 5 | `SECRET_TEXT` |
| [Bluesky](piece-bluesky.md) | `@activepieces/piece-bluesky` | 0.2.0 | 40 | `CUSTOM_AUTH` |
| [Bocha](piece-bocha-search.md) | `@activepieces/piece-bocha-search` | 0.1.2 | 2 | `SECRET_TEXT` |
| [Bokio](piece-bokio.md) | `@activepieces/piece-bokio` | 0.1.0 | 11 | `CUSTOM_AUTH` |
| [Bolna AI](piece-bolna.md) | `@activepieces/piece-bolna` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Bonjoro](piece-bonjoro.md) | `@activepieces/piece-bonjoro` | 0.2.0 | 2 | `CUSTOM_AUTH` |
| [Bookedin](piece-bookedin.md) | `@activepieces/piece-bookedin` | 0.2.0 | 7 | `SECRET_TEXT` |
| [Box](piece-box.md) | `@activepieces/piece-box` | 0.2.1 | 1 | `OAUTH2` |
| [Brave Search](piece-brave-search.md) | `@activepieces/piece-brave-search` | 0.1.0 | 2 | `SECRET_TEXT` |
| [Brevo](piece-sendinblue.md) | `@activepieces/piece-sendinblue` | 0.5.1 | 39 | `SECRET_TEXT` |
| [Brilliant Directories](piece-brilliant-directories.md) | `@activepieces/piece-brilliant-directories` | 0.2.0 | 2 | `CUSTOM_AUTH` |
| [Browse AI](piece-browse-ai.md) | `@activepieces/piece-browse-ai` | 0.2.0 | 4 | `SECRET_TEXT` |
| [Browserless](piece-browserless.md) | `@activepieces/piece-browserless` | 0.2.1 | 19 | `CUSTOM_AUTH` |
| [Bubble](piece-bubble.md) | `@activepieces/piece-bubble` | 0.1.8 | 5 | none |
| [Buffer](piece-buffer.md) | `@activepieces/piece-buffer` | 0.1.2 | 3 | `SECRET_TEXT` |
| [Bumpups](piece-bumpups.md) | `@activepieces/piece-bumpups` | 0.2.0 | 7 | `SECRET_TEXT` |
| [BurstyAI](piece-bursty-ai.md) | `@activepieces/piece-bursty-ai` | 0.1.8 | 1 | `SECRET_TEXT` |
| [Buttondown](piece-buttondown.md) | `@activepieces/piece-buttondown` | 0.0.8 | 4 | `SECRET_TEXT` |
| [Cal.com](piece-cal-com.md) | `@activepieces/piece-cal-com` | 0.5.0 | 26 | `SECRET_TEXT` |
| [Calendly](piece-calendly.md) | `@activepieces/piece-calendly` | 0.6.0 | 27 | `SECRET_TEXT` |
| [Call-rounded](piece-rounded-studio.md) | `@activepieces/piece-rounded-studio` | 0.3.1 | 1 | `SECRET_TEXT` |
| [Camb.AI](piece-camb-ai.md) | `@activepieces/piece-camb-ai` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Campaign Monitor](piece-campaign-monitor.md) | `@activepieces/piece-campaign-monitor` | 0.1.8 | 4 | `SECRET_TEXT` |
| [Canny](piece-canny.md) | `@activepieces/piece-canny` | 0.2.2 | 5 | `SECRET_TEXT` |
| [Canva](piece-canva.md) | `@activepieces/piece-canva` | 0.2.1 | 10 | `OAUTH2` |
| [Capsule CRM](piece-capsule-crm.md) | `@activepieces/piece-capsule-crm` | 0.1.7 | 10 | `OAUTH2` |
| [Captain-data](piece-captain-data.md) | `@activepieces/piece-captain-data` | 0.2.0 | 3 | `CUSTOM_AUTH` |
| [Carbone](piece-carbone.md) | `@activepieces/piece-carbone` | 0.1.2 | 8 | `SECRET_TEXT` |
| [Cartloom](piece-cartloom.md) | `@activepieces/piece-cartloom` | 0.2.0 | 8 | `CUSTOM_AUTH` |
| [Cashfree Payments](piece-cashfree-payments.md) | `@activepieces/piece-cashfree-payments` | 0.1.8 | 9 | `CUSTOM_AUTH` |
| [Certopus](piece-certopus.md) | `@activepieces/piece-certopus` | 0.3.0 | 2 | `SECRET_TEXT` |
| [Chainalysis Screening API](piece-chainalysis-api.md) | `@activepieces/piece-chainalysis-api` | 0.1.7 | 1 | `SECRET_TEXT` |
| [ChainAware.AI](piece-chain-aware.md) | `@activepieces/piece-chain-aware` | 0.1.0 | 6 | `SECRET_TEXT` |
| [Chaindesk](piece-chaindesk.md) | `@activepieces/piece-chaindesk` | 0.2.2 | 4 | `SECRET_TEXT` |
| [Chargebee](piece-chargebee.md) | `@activepieces/piece-chargebee` | 0.1.2 | 5 | `CUSTOM_AUTH` |
| [ChargeKeep](piece-chargekeep.md) | `@activepieces/piece-chargekeep` | 0.3.7 | 6 | `CUSTOM_AUTH` |
| [Chartly](piece-chartly.md) | `@activepieces/piece-chartly` | 0.0.9 | 2 | `SECRET_TEXT` |
| [Chat Aid](piece-chat-aid.md) | `@activepieces/piece-chat-aid` | 0.2.0 | 4 | `SECRET_TEXT` |
| [Chat Data](piece-chat-data.md) | `@activepieces/piece-chat-data` | 0.1.8 | 6 | `SECRET_TEXT` |
| [Chatbase](piece-chatbase.md) | `@activepieces/piece-chatbase` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Chatfly](piece-chatfly.md) | `@activepieces/piece-chatfly` | 0.1.8 | 1 | `SECRET_TEXT` |
| [Chatling](piece-chatling.md) | `@activepieces/piece-chatling` | 0.2.0 | 3 | `SECRET_TEXT` |
| [ChatNode](piece-chatnode.md) | `@activepieces/piece-chatnode` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Chatsistant](piece-chatsistant.md) | `@activepieces/piece-chatsistant` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Chatwoot](piece-chatwoot.md) | `@activepieces/piece-chatwoot` | 0.1.2 | 2 | `CUSTOM_AUTH` |
| [Checkout.com](piece-checkout.md) | `@activepieces/piece-checkout` | 0.1.7 | 7 | `SECRET_TEXT` |
| [Chess.com](piece-chess-com.md) | `@activepieces/piece-chess-com` | 0.0.8 | 3 | none |
| [Circle](piece-circle.md) | `@activepieces/piece-circle` | 0.2.0 | 7 | `SECRET_TEXT` |
| [Cisco Webex Meetings](piece-webex.md) | `@activepieces/piece-webex` | 0.1.1 | 6 | `OAUTH2` |
| [Clarifai](piece-clarifai.md) | `@activepieces/piece-clarifai` | 0.4.1 | 10 | `SECRET_TEXT` |
| [Clay](piece-clay.md) | `@activepieces/piece-clay` | 0.2.1 | 4 | `SECRET_TEXT` |
| [Clearout](piece-clearout.md) | `@activepieces/piece-clearout` | 0.2.0 | 2 | `CUSTOM_AUTH` |
| [ClearoutPhone](piece-clearoutphone.md) | `@activepieces/piece-clearoutphone` | 0.1.8 | 3 | `SECRET_TEXT` |
| [Clicdata](piece-clicdata.md) | `@activepieces/piece-clicdata` | 0.0.10 | 2 | `OAUTH2`, `SECRET_TEXT`, `CUSTOM_AUTH` |
| [ClickFunnels](piece-clickfunnels.md) | `@activepieces/piece-clickfunnels` | 0.2.0 | 7 | `CUSTOM_AUTH` |
| [ClickSend SMS](piece-clicksend.md) | `@activepieces/piece-clicksend` | 0.2.0 | 10 | `BASIC_AUTH` |
| [ClickUp](piece-clickup.md) | `@activepieces/piece-clickup` | 0.9.1 | 90 | `OAUTH2` |
| [Clockify](piece-clockify.md) | `@activepieces/piece-clockify` | 0.2.1 | 8 | `SECRET_TEXT` |
| [Clockodo](piece-clockodo.md) | `@activepieces/piece-clockodo` | 0.2.8 | 33 | `CUSTOM_AUTH` |
| [Close](piece-close.md) | `@activepieces/piece-close` | 0.2.1 | 6 | `SECRET_TEXT` |
| [CloudConvert](piece-cloudconvert.md) | `@activepieces/piece-cloudconvert` | 0.2.1 | 7 | `OAUTH2` |
| [Cloudinary](piece-cloudinary.md) | `@activepieces/piece-cloudinary` | 0.2.0 | 70 | `CUSTOM_AUTH` |
| [Cloutly](piece-cloutly.md) | `@activepieces/piece-cloutly` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Coda](piece-coda.md) | `@activepieces/piece-coda` | 0.3.1 | 41 | `SECRET_TEXT` |
| [Cody](piece-cody.md) | `@activepieces/piece-cody` | 0.3.1 | 26 | `SECRET_TEXT` |
| [Cognito Forms](piece-cognito-forms.md) | `@activepieces/piece-cognito-forms` | 0.2.2 | 5 | `SECRET_TEXT` |
| [Cohere](piece-cohere.md) | `@activepieces/piece-cohere` | 0.1.3 | 2 | `SECRET_TEXT` |
| [CometAPI](piece-cometapi.md) | `@activepieces/piece-cometapi` | 0.2.1 | 2 | `SECRET_TEXT` |
| [Comfy.ICU](piece-comfyicu.md) | `@activepieces/piece-comfyicu` | 0.1.6 | 4 | `SECRET_TEXT` |
| [Confluence](piece-confluence.md) | `@activepieces/piece-confluence` | 0.3.2 | 21 | `CUSTOM_AUTH` |
| [Connections](piece-connections.md) | `@activepieces/piece-connections` | 0.5.10 | 1 | none |
| [ConnectUC](piece-connectuc.md) | `@activepieces/piece-connectuc` | 0.0.13 | 6 | `OAUTH2` |
| [Constant Contact](piece-constant-contact.md) | `@activepieces/piece-constant-contact` | 0.3.1 | 2 | `OAUTH2` |
| [Contentful](piece-contentful.md) | `@activepieces/piece-contentful` | 0.2.1 | 4 | `CUSTOM_AUTH` |
| [Contextual AI](piece-contextual-ai.md) | `@activepieces/piece-contextual-ai` | 0.1.8 | 7 | `CUSTOM_AUTH` |
| [Contiguity](piece-contiguity.md) | `@activepieces/piece-contiguity` | 0.3.1 | 3 | `SECRET_TEXT` |
| [ConvertAPI](piece-convertapi.md) | `@activepieces/piece-convertapi` | 0.0.3 | 4 | `SECRET_TEXT` |
| [ConvertKit](piece-convertkit.md) | `@activepieces/piece-convertkit` | 0.4.1 | 69 | `SECRET_TEXT` |
| [Copper](piece-copper.md) | `@activepieces/piece-copper` | 0.2.0 | 20 | `CUSTOM_AUTH` |
| [Copy.ai](piece-copy-ai.md) | `@activepieces/piece-copy-ai` | 0.1.6 | 3 | `SECRET_TEXT` |
| [Coralogix](piece-coralogix.md) | `@activepieces/piece-coralogix` | 0.2.3 | 10 | `CUSTOM_AUTH` |
| [Couchbase](piece-couchbase.md) | `@activepieces/piece-couchbase` | 0.1.7 | 5 | `CUSTOM_AUTH` |
| [Coupa](piece-coupa.md) | `@activepieces/piece-coupa` | 0.1.2 | 13 | `CUSTOM_AUTH` |
| [Crisp](piece-crisp.md) | `@activepieces/piece-crisp` | 0.2.1 | 7 | `CUSTOM_AUTH` |
| [Crypto](piece-crypto.md) | `@activepieces/piece-crypto` | 0.0.29 | 7 | none |
| [Cryptolens](piece-cryptolens.md) | `@activepieces/piece-cryptolens` | 0.2.0 | 5 | `SECRET_TEXT` |
| [CSV](piece-csv.md) | `@activepieces/piece-csv` | 0.5.0 | 12 | none |
| [Cursor](piece-cursor.md) | `@activepieces/piece-cursor` | 0.1.7 | 4 | `SECRET_TEXT` |
| [customer.io](piece-customer-io.md) | `@activepieces/piece-customer-io` | 0.5.1 | 3 | `CUSTOM_AUTH` |
| [CustomGPT](piece-customgpt.md) | `@activepieces/piece-customgpt` | 0.1.8 | 8 | `SECRET_TEXT` |
| [CyberArk](piece-cyberark.md) | `@activepieces/piece-cyberark` | 0.1.8 | 17 | `CUSTOM_AUTH` |
| [Dappier](piece-dappier.md) | `@activepieces/piece-dappier` | 0.1.7 | 4 | `SECRET_TEXT` |
| [Dashworks](piece-dashworks.md) | `@activepieces/piece-dashworks` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Data Mapper](piece-data-mapper.md) | `@activepieces/piece-data-mapper` | 0.3.21 | 1 | none |
| [Data Summarizer](piece-data-summarizer.md) | `@activepieces/piece-data-summarizer` | 0.0.16 | 4 | none |
| [Datadog](piece-datadog.md) | `@activepieces/piece-datadog` | 0.2.2 | 3 | `CUSTOM_AUTH` |
| [DataForB2B](piece-dataforb2b.md) | `@activepieces/piece-dataforb2b` | 0.1.2 | 7 | `SECRET_TEXT` |
| [DataFuel](piece-datafuel.md) | `@activepieces/piece-datafuel` | 0.2.0 | 4 | `SECRET_TEXT` |
| [Date Helper](piece-date-helper.md) | `@activepieces/piece-date-helper` | 0.2.0 | 9 | none |
| [Dato CMS](piece-datocms.md) | `@activepieces/piece-datocms` | 0.2.0 | 1 | `CUSTOM_AUTH` |
| [Deepgram](piece-deepgram.md) | `@activepieces/piece-deepgram` | 0.3.1 | 33 | `SECRET_TEXT` |
| [DeepL](piece-deepl.md) | `@activepieces/piece-deepl` | 0.2.2 | 2 | `CUSTOM_AUTH` |
| [DeepSeek](piece-deepseek.md) | `@activepieces/piece-deepseek` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Deftform](piece-deftform.md) | `@activepieces/piece-deftform` | 0.1.2 | 8 | `SECRET_TEXT` |
| [Delay](piece-delay.md) | `@activepieces/piece-delay` | 0.4.0 | 2 | none |
| [Denser.ai](piece-denser-ai.md) | `@activepieces/piece-denser-ai` | 0.1.7 | 1 | `CUSTOM_AUTH` |
| [Descript](piece-descript.md) | `@activepieces/piece-descript` | 0.1.2 | 7 | `SECRET_TEXT` |
| [DETECTING-AI.COM](piece-detecting-ai.md) | `@activepieces/piece-detecting-ai` | 0.1.0 | 4 | `SECRET_TEXT` |
| [Devin AI](piece-devin.md) | `@activepieces/piece-devin` | 0.1.6 | 3 | `SECRET_TEXT` |
| [DigitalOcean](piece-digital-ocean.md) | `@activepieces/piece-digital-ocean` | 0.1.1 | 11 | `OAUTH2`, `SECRET_TEXT` |
| [DigitalPilot](piece-digital-pilot.md) | `@activepieces/piece-digital-pilot` | 0.1.7 | 2 | `SECRET_TEXT` |
| [DIMO](piece-dimo.md) | `@activepieces/piece-dimo` | 0.3.7 | 38 | `CUSTOM_AUTH` |
| [Discord](piece-discord.md) | `@activepieces/piece-discord` | 0.7.2 | 61 | `SECRET_TEXT` |
| [Discourse](piece-discourse.md) | `@activepieces/piece-discourse` | 0.2.1 | 6 | `CUSTOM_AUTH` |
| [Dittofeed](piece-dittofeed.md) | `@activepieces/piece-dittofeed` | 0.1.6 | 3 | `CUSTOM_AUTH` |
| [DocsBot](piece-docsbot.md) | `@activepieces/piece-docsbot` | 0.2.1 | 6 | `SECRET_TEXT` |
| [Doctly AI](piece-doctly.md) | `@activepieces/piece-doctly` | 0.2.1 | 2 | `SECRET_TEXT` |
| [DocumentPro](piece-documentpro.md) | `@activepieces/piece-documentpro` | 0.2.2 | 3 | `SECRET_TEXT` |
| [DocuMerge](piece-documerge.md) | `@activepieces/piece-documerge` | 0.1.8 | 5 | `SECRET_TEXT` |
| [Docusign](piece-docusign.md) | `@activepieces/piece-docusign` | 0.3.3 | 8 | `CUSTOM_AUTH` |
| [Drip](piece-drip.md) | `@activepieces/piece-drip` | 0.6.1 | 36 | `SECRET_TEXT` |
| [Dropbox](piece-dropbox.md) | `@activepieces/piece-dropbox` | 0.9.2 | 40 | `OAUTH2` |
| [Drupal](piece-drupal.md) | `@activepieces/piece-drupal` | 1.1.11 | 6 | `CUSTOM_AUTH` |
| [Dub](piece-dub.md) | `@activepieces/piece-dub` | 0.1.2 | 6 | `SECRET_TEXT` |
| [DuckDB](piece-duckdb.md) | `@activepieces/piece-duckdb` | 0.0.9 | 1 | none |
| [Dumpling AI](piece-dumpling-ai.md) | `@activepieces/piece-dumpling-ai` | 0.2.1 | 7 | `SECRET_TEXT` |
| [Dust](piece-dust.md) | `@activepieces/piece-dust` | 0.3.0 | 7 | `CUSTOM_AUTH` |
| [Easy-Peasy.AI](piece-easy-peasy-ai.md) | `@activepieces/piece-easy-peasy-ai` | 0.2.0 | 4 | `SECRET_TEXT` |
| [Echowin](piece-echowin.md) | `@activepieces/piece-echowin` | 0.1.7 | 3 | `SECRET_TEXT` |
| [Eden AI](piece-eden-ai.md) | `@activepieces/piece-eden-ai` | 0.2.5 | 13 | `SECRET_TEXT` |
| [EditionGuard](piece-editionguard.md) | `@activepieces/piece-editionguard` | 0.2.2 | 2 | `SECRET_TEXT` |
| [Elastic Email](piece-elastic-email.md) | `@activepieces/piece-elastic-email` | 0.3.2 | 11 | `SECRET_TEXT` |
| [ElevenLabs](piece-elevenlabs.md) | `@activepieces/piece-elevenlabs` | 0.4.0 | 89 | `CUSTOM_AUTH` |
| [Emailit](piece-emailit.md) | `@activepieces/piece-emailit` | 0.2.1 | 28 | `SECRET_TEXT` |
| [EmailOctopus](piece-emailoctopus.md) | `@activepieces/piece-emailoctopus` | 0.2.1 | 8 | `SECRET_TEXT` |
| [Enrich Layer](piece-enrichlayer.md) | `@activepieces/piece-enrichlayer` | 0.1.2 | 26 | `SECRET_TEXT` |
| [eSignatures](piece-esignatures.md) | `@activepieces/piece-esignatures` | 0.2.1 | 2 | `SECRET_TEXT` |
| [Ethereum Name Service (ENS)](piece-eth-name-service.md) | `@activepieces/piece-eth-name-service` | 0.1.6 | 1 | `SECRET_TEXT` |
| [Everhour](piece-everhour.md) | `@activepieces/piece-everhour` | 0.2.2 | 4 | `SECRET_TEXT` |
| [Exa](piece-exa.md) | `@activepieces/piece-exa` | 0.3.1 | 12 | `SECRET_TEXT` |
| [Extracta.ai](piece-extracta-ai.md) | `@activepieces/piece-extracta-ai` | 0.1.7 | 3 | `SECRET_TEXT` |
| [Facebook Leads](piece-facebook-leads.md) | `@activepieces/piece-facebook-leads` | 0.4.1 | 9 | `OAUTH2` |
| [Facebook Pages](piece-facebook-pages.md) | `@activepieces/piece-facebook-pages` | 0.4.2 | 19 | `OAUTH2` |
| [Famulor AI - Voice Agent](piece-famulor.md) | `@activepieces/piece-famulor` | 0.2.5 | 25 | `SECRET_TEXT` |
| [Fathom](piece-fathom.md) | `@activepieces/piece-fathom` | 0.3.0 | 14 | `OAUTH2`, `SECRET_TEXT` |
| [Fathom Analytics](piece-fathom-analytics.md) | `@activepieces/piece-fathom-analytics` | 0.1.2 | 6 | `SECRET_TEXT` |
| [Feathery](piece-feathery.md) | `@activepieces/piece-feathery` | 0.1.7 | 5 | `SECRET_TEXT` |
| [FeedHive](piece-feedhive.md) | `@activepieces/piece-feedhive` | 0.1.2 | 8 | `SECRET_TEXT` |
| [Fellow.ai](piece-fellow.md) | `@activepieces/piece-fellow` | 0.2.1 | 2 | `CUSTOM_AUTH` |
| [Figma](piece-figma.md) | `@activepieces/piece-figma` | 0.6.3 | 4 | `OAUTH2` |
| [Files Helper](piece-file-helper.md) | `@activepieces/piece-file-helper` | 0.2.0 | 7 | none |
| [FileToPDF](piece-filetopdf.md) | `@activepieces/piece-filetopdf` | 0.0.9 | 4 | `SECRET_TEXT` |
| [Fillout Forms](piece-fillout-forms.md) | `@activepieces/piece-fillout-forms` | 0.2.0 | 4 | `SECRET_TEXT` |
| [Fireberry](piece-fireberry.md) | `@activepieces/piece-fireberry` | 0.1.7 | 4 | `SECRET_TEXT` |
| [Firecrawl](piece-firecrawl.md) | `@activepieces/piece-firecrawl` | 0.6.1 | 21 | `SECRET_TEXT` |
| [Fireflies.ai](piece-fireflies-ai.md) | `@activepieces/piece-fireflies-ai` | 0.1.7 | 5 | `SECRET_TEXT` |
| [Flipando AI](piece-flipando.md) | `@activepieces/piece-flipando` | 0.1.1 | 5 | `SECRET_TEXT` |
| [Fliqr AI](piece-fliqr-ai.md) | `@activepieces/piece-fliqr-ai` | 0.2.1 | 3 | `SECRET_TEXT` |
| [Floqer](piece-floqer.md) | `@activepieces/piece-floqer` | 0.1.2 | 4 | `SECRET_TEXT` |
| [Flow Helper](piece-flow-helper.md) | `@activepieces/piece-flow-helper` | 0.1.8 | 3 | none |
| [Flowise](piece-flowise.md) | `@activepieces/piece-flowise` | 0.3.0 | 42 | `CUSTOM_AUTH` |
| [Flowlu](piece-flowlu.md) | `@activepieces/piece-flowlu` | 0.2.1 | 36 | `CUSTOM_AUTH` |
| [FlowParser](piece-flow-parser.md) | `@activepieces/piece-flow-parser` | 0.1.8 | 1 | `SECRET_TEXT` |
| [Folk](piece-folk.md) | `@activepieces/piece-folk` | 0.1.8 | 8 | `SECRET_TEXT` |
| [Foreplay](piece-foreplay-co.md) | `@activepieces/piece-foreplay-co` | 0.1.9 | 5 | `SECRET_TEXT` |
| [Form.io](piece-formio.md) | `@activepieces/piece-formio` | 0.1.3 | 8 | `CUSTOM_AUTH` |
| [Formbricks](piece-formbricks.md) | `@activepieces/piece-formbricks` | 0.3.2 | 1 | `CUSTOM_AUTH` |
| [Formitable](piece-formitable.md) | `@activepieces/piece-formitable` | 0.0.8 | 0 | `SECRET_TEXT` |
| [Formsite](piece-formsite.md) | `@activepieces/piece-formsite` | 0.1.8 | 0 | none |
| [Formspark](piece-formspark.md) | `@activepieces/piece-formspark` | 0.1.6 | 0 | none |
| [Formstack](piece-formstack.md) | `@activepieces/piece-formstack` | 0.2.0 | 5 | `OAUTH2` |
| [Fountain](piece-fountain.md) | `@activepieces/piece-fountain` | 0.1.7 | 10 | `CUSTOM_AUTH` |
| [Fragment](piece-fragment.md) | `@activepieces/piece-fragment` | 0.1.7 | 6 | `SECRET_TEXT` |
| [Frame](piece-frame.md) | `@activepieces/piece-frame` | 0.2.1 | 1 | `SECRET_TEXT` |
| [FreeAgent](piece-free-agent.md) | `@activepieces/piece-free-agent` | 0.1.8 | 2 | `OAUTH2` |
| [Freshdesk](piece-freshdesk.md) | `@activepieces/piece-freshdesk` | 0.3.1 | 6 | `CUSTOM_AUTH` |
| [Freshsales](piece-freshsales.md) | `@activepieces/piece-freshsales` | 0.5.2 | 2 | `BASIC_AUTH` |
| [Freshservice](piece-freshservice.md) | `@activepieces/piece-freshservice` | 0.2.3 | 12 | `CUSTOM_AUTH` |
| [Frill](piece-frill.md) | `@activepieces/piece-frill` | 0.1.2 | 9 | `SECRET_TEXT` |
| [Front](piece-front.md) | `@activepieces/piece-front` | 0.2.2 | 21 | `SECRET_TEXT` |
| [FTP/SFTP](piece-sftp.md) | `@activepieces/piece-sftp` | 0.5.10 | 8 | `CUSTOM_AUTH` |
| [Gameball](piece-gameball.md) | `@activepieces/piece-gameball` | 0.1.6 | 1 | `SECRET_TEXT` |
| [Gamma](piece-gamma.md) | `@activepieces/piece-gamma` | 0.1.9 | 2 | `CUSTOM_AUTH` |
| [GCloud Pub/Sub](piece-gcloud-pubsub.md) | `@activepieces/piece-gcloud-pubsub` | 0.1.8 | 1 | `CUSTOM_AUTH` |
| [Gender API](piece-gender-api.md) | `@activepieces/piece-gender-api` | 0.1.1 | 4 | `SECRET_TEXT` |
| [GenerateBanners](piece-generatebanners.md) | `@activepieces/piece-generatebanners` | 0.4.7 | 1 | `BASIC_AUTH` |
| [GetResponse](piece-getresponse.md) | `@activepieces/piece-getresponse` | 0.1.2 | 6 | `OAUTH2`, `CUSTOM_AUTH` |
| [GhostCMS](piece-ghostcms.md) | `@activepieces/piece-ghostcms` | 0.3.1 | 69 | `CUSTOM_AUTH` |
| [Giftbit](piece-giftbit.md) | `@activepieces/piece-giftbit` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Gistly](piece-gistly.md) | `@activepieces/piece-gistly` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Gitea](piece-gitea.md) | `@activepieces/piece-gitea` | 0.1.2 | 4 | `OAUTH2` |
| [GitHub](piece-github.md) | `@activepieces/piece-github` | 0.10.1 | 93 | `OAUTH2`, `CUSTOM_AUTH`, `SECRET_TEXT` |
| [GitLab](piece-gitlab.md) | `@activepieces/piece-gitlab` | 0.4.2 | 114 | `OAUTH2` |
| [Gladia](piece-gladia.md) | `@activepieces/piece-gladia` | 0.2.0 | 3 | `SECRET_TEXT` |
| [Glide](piece-glide.md) | `@activepieces/piece-glide` | 0.1.2 | 6 | `SECRET_TEXT` |
| [Gmail](piece-gmail.md) | `@activepieces/piece-gmail` | 0.18.1 | 37 | `OAUTH2`, `CUSTOM_AUTH` |
| [GoodMem](piece-goodmem.md) | `@activepieces/piece-goodmem` | 0.0.8 | 5 | `CUSTOM_AUTH` |
| [Google BigQuery](piece-google-bigquery.md) | `@activepieces/piece-google-bigquery` | 0.1.2 | 10 | `OAUTH2`, `CUSTOM_AUTH` |
| [Google Calendar](piece-google-calendar.md) | `@activepieces/piece-google-calendar` | 0.12.3 | 25 | `OAUTH2`, `CUSTOM_AUTH` |
| [Google Chat](piece-googlechat.md) | `@activepieces/piece-googlechat` | 0.1.8 | 6 | `OAUTH2` |
| [Google Cloud Storage](piece-google-cloud-storage.md) | `@activepieces/piece-google-cloud-storage` | 0.1.8 | 12 | `OAUTH2` |
| [Google Contacts](piece-google-contacts.md) | `@activepieces/piece-google-contacts` | 0.5.4 | 23 | `OAUTH2` |
| [Google Docs](piece-google-docs.md) | `@activepieces/piece-google-docs` | 0.6.0 | 43 | `OAUTH2`, `CUSTOM_AUTH` |
| [Google Document AI](piece-google-document-ai.md) | `@activepieces/piece-google-document-ai` | 0.0.2 | 2 | `CUSTOM_AUTH`, `OAUTH2` |
| [Google Drive](piece-google-drive.md) | `@activepieces/piece-google-drive` | 0.12.2 | 53 | `OAUTH2`, `CUSTOM_AUTH` |
| [Google Forms](piece-google-forms.md) | `@activepieces/piece-google-forms` | 0.7.3 | 4 | `OAUTH2`, `CUSTOM_AUTH` |
| [Google Gemini](piece-google-gemini.md) | `@activepieces/piece-google-gemini` | 0.5.1 | 11 | `SECRET_TEXT` |
| [Google My Business](piece-google-my-business.md) | `@activepieces/piece-google-my-business` | 0.5.2 | 18 | `OAUTH2` |
| [Google Search](piece-google-search.md) | `@activepieces/piece-google-search` | 0.0.9 | 1 | `CUSTOM_AUTH` |
| [Google Search Console](piece-google-search-console.md) | `@activepieces/piece-google-search-console` | 0.4.1 | 17 | `OAUTH2` |
| [Google Sheets](piece-google-sheets.md) | `@activepieces/piece-google-sheets` | 0.18.2 | 61 | `OAUTH2`, `CUSTOM_AUTH` |
| [Google Slides](piece-google-slides.md) | `@activepieces/piece-google-slides` | 0.4.2 | 35 | `OAUTH2`, `CUSTOM_AUTH` |
| [Google Tasks](piece-google-tasks.md) | `@activepieces/piece-google-tasks` | 0.7.1 | 11 | `OAUTH2` |
| [Google Translate](piece-google-translate.md) | `@activepieces/piece-google-translate` | 0.0.2 | 4 | `OAUTH2` |
| [Google Vertex AI](piece-google-vertexai.md) | `@activepieces/piece-google-vertexai` | 0.1.8 | 3 | `CUSTOM_AUTH` |
| [Gorgias](piece-gorgias.md) | `@activepieces/piece-gorgias` | 0.1.0 | 7 | `CUSTOM_AUTH` |
| [Gotify](piece-gotify.md) | `@activepieces/piece-gotify` | 0.4.7 | 1 | `CUSTOM_AUTH` |
| [GPTZero](piece-gptzero-detect-ai.md) | `@activepieces/piece-gptzero-detect-ai` | 0.1.8 | 2 | `SECRET_TEXT` |
| [Granola](piece-granola.md) | `@activepieces/piece-granola` | 0.1.2 | 3 | `SECRET_TEXT` |
| [GraphQL](piece-graphql.md) | `@activepieces/piece-graphql` | 0.0.20 | 1 | none |
| [Gravity Forms](piece-gravityforms.md) | `@activepieces/piece-gravityforms` | 0.1.7 | 0 | none |
| [Greenhouse](piece-greenhouse.md) | `@activepieces/piece-greenhouse` | 0.1.0 | 8 | `OAUTH2` |
| [GreenPT](piece-greenpt.md) | `@activepieces/piece-greenpt` | 0.2.1 | 4 | `SECRET_TEXT` |
| [Greip](piece-greip.md) | `@activepieces/piece-greip` | 0.1.8 | 6 | `SECRET_TEXT` |
| [Griptape Cloud](piece-griptape.md) | `@activepieces/piece-griptape` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Grist](piece-grist.md) | `@activepieces/piece-grist` | 0.3.0 | 28 | `CUSTOM_AUTH` |
| [Grok by xAI](piece-grok-xai.md) | `@activepieces/piece-grok-xai` | 0.2.1 | 5 | `SECRET_TEXT` |
| [Groq](piece-groq.md) | `@activepieces/piece-groq` | 0.4.2 | 4 | `SECRET_TEXT` |
| [GuideLite](piece-guidelite.md) | `@activepieces/piece-guidelite` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Hacker News](piece-hackernews.md) | `@activepieces/piece-hackernews` | 0.5.0 | 12 | none |
| [Harvest](piece-harvest.md) | `@activepieces/piece-harvest` | 0.2.0 | 11 | `OAUTH2` |
| [HashiCorp Vault](piece-hashi-corp-vault.md) | `@activepieces/piece-hashi-corp-vault` | 0.1.0 | 5 | `CUSTOM_AUTH` |
| [Hastewire](piece-hastewire.md) | `@activepieces/piece-hastewire` | 0.1.7 | 2 | `SECRET_TEXT` |
| [Heartbeat](piece-heartbeat.md) | `@activepieces/piece-heartbeat` | 0.3.1 | 46 | `SECRET_TEXT` |
| [Hedy](piece-hedy.md) | `@activepieces/piece-hedy` | 0.2.5 | 19 | `CUSTOM_AUTH` |
| [Help Scout](piece-help-scout.md) | `@activepieces/piece-help-scout` | 0.2.1 | 9 | `OAUTH2` |
| [HeyGen](piece-heygen.md) | `@activepieces/piece-heygen` | 0.2.0 | 10 | `SECRET_TEXT` |
| [Heymarket SMS](piece-heymarket-sms.md) | `@activepieces/piece-heymarket-sms` | 0.1.0 | 5 | `SECRET_TEXT` |
| [Hootsuite](piece-hootsuite.md) | `@activepieces/piece-hootsuite` | 0.1.0 | 4 | `OAUTH2` |
| [Housecall Pro](piece-housecall-pro.md) | `@activepieces/piece-housecall-pro` | 0.2.1 | 46 | `SECRET_TEXT` |
| [HTTP](piece-http.md) | `@activepieces/piece-http` | 0.13.0 | 2 | none |
| [HTTP (OAuth2)](piece-http-oauth2.md) | `@activepieces/piece-http-oauth2` | 0.3.1 | 1 | `OAUTH2` |
| [HubSpot](piece-hubspot.md) | `@activepieces/piece-hubspot` | 0.12.1 | 54 | `OAUTH2`, `CUSTOM_AUTH` |
| [Hugging Face](piece-hugging-face.md) | `@activepieces/piece-hugging-face` | 0.3.1 | 84 | `SECRET_TEXT` |
| [Human Input](piece-forms.md) | `@activepieces/piece-forms` | 0.5.0 | 1 | none |
| [Hume AI](piece-hume-ai.md) | `@activepieces/piece-hume-ai` | 0.1.8 | 6 | `SECRET_TEXT` |
| [Hunter](piece-hunter.md) | `@activepieces/piece-hunter` | 0.1.7 | 9 | `SECRET_TEXT` |
| [Hystruct](piece-hystruct.md) | `@activepieces/piece-hystruct` | 0.1.7 | 1 | `SECRET_TEXT` |
| [IBM Cognos Analytics](piece-ibm-cognose.md) | `@activepieces/piece-ibm-cognose` | 0.2.0 | 9 | `CUSTOM_AUTH` |
| [iLoveAPI](piece-iloveapi.md) | `@activepieces/piece-iloveapi` | 0.0.6 | 22 | `SECRET_TEXT` |
| [Image Helper](piece-image-helper.md) | `@activepieces/piece-image-helper` | 0.1.22 | 7 | none |
| [ImageRouter](piece-image-router.md) | `@activepieces/piece-image-router` | 0.2.0 | 11 | `SECRET_TEXT` |
| [IMAP](piece-imap.md) | `@activepieces/piece-imap` | 0.6.2 | 19 | `CUSTOM_AUTH` |
| [iMeetify](piece-imeetify.md) | `@activepieces/piece-imeetify` | 0.0.5 | 0 | none |
| [Inbox](piece-useinbox.md) | `@activepieces/piece-useinbox` | 0.1.0 | 7 | `BASIC_AUTH` |
| [Influencers.club](piece-influencers-club.md) | `@activepieces/piece-influencers-club` | 0.1.0 | 4 | `SECRET_TEXT` |
| [Insightly](piece-insightly.md) | `@activepieces/piece-insightly` | 0.1.7 | 5 | `SECRET_TEXT` |
| [Insighto.ai](piece-insighto-ai.md) | `@activepieces/piece-insighto-ai` | 0.1.7 | 4 | `SECRET_TEXT` |
| [Instabase](piece-instabase.md) | `@activepieces/piece-instabase` | 0.2.0 | 3 | `CUSTOM_AUTH` |
| [InstaCharts](piece-insta-charts.md) | `@activepieces/piece-insta-charts` | 0.0.8 | 1 | `OAUTH2` |
| [Instagram for Business](piece-instagram-business.md) | `@activepieces/piece-instagram-business` | 1.0.2 | 27 | `OAUTH2` |
| [Instantly.ai](piece-instantly-ai.md) | `@activepieces/piece-instantly-ai` | 0.2.1 | 6 | `SECRET_TEXT` |
| [Instasent](piece-instasent.md) | `@activepieces/piece-instasent` | 0.1.7 | 3 | `CUSTOM_AUTH` |
| [Intercom](piece-intercom.md) | `@activepieces/piece-intercom` | 0.9.2 | 57 | `OAUTH2`, `CUSTOM_AUTH` |
| [Intruder](piece-intruder.md) | `@activepieces/piece-intruder` | 0.1.0 | 6 | `SECRET_TEXT` |
| [Invoice Ninja](piece-invoiceninja.md) | `@activepieces/piece-invoiceninja` | 0.4.1 | 10 | `CUSTOM_AUTH` |
| [Jina AI](piece-jina-ai.md) | `@activepieces/piece-jina-ai` | 0.2.0 | 13 | `SECRET_TEXT` |
| [Jira Cloud](piece-jira-cloud.md) | `@activepieces/piece-jira-cloud` | 0.5.2 | 77 | `CUSTOM_AUTH` |
| [Jira Data Center](piece-jira-data-center.md) | `@activepieces/piece-jira-data-center` | 0.1.1 | 15 | `CUSTOM_AUTH` |
| [Jira Service Management Operations](piece-jsm-operations.md) | `@activepieces/piece-jsm-operations` | 0.0.2 | 16 | `CUSTOM_AUTH`, `BASIC_AUTH` |
| [JoggAI](piece-jogg-ai.md) | `@activepieces/piece-jogg-ai` | 0.1.7 | 8 | `SECRET_TEXT` |
| [Jotform](piece-jotform.md) | `@activepieces/piece-jotform` | 0.5.3 | 45 | `CUSTOM_AUTH` |
| [JSON](piece-json.md) | `@activepieces/piece-json` | 0.1.14 | 4 | none |
| [JumpCloud](piece-jumpcloud.md) | `@activepieces/piece-jumpcloud` | 0.0.2 | 16 | `CUSTOM_AUTH` |
| [Jungle Grid](piece-jungle-grid.md) | `@activepieces/piece-jungle-grid` | 0.2.1 | 10 | `CUSTOM_AUTH` |
| [JustInvoice](piece-just-invoice.md) | `@activepieces/piece-just-invoice` | 0.0.8 | 6 | `SECRET_TEXT` |
| [Kallabot](piece-kallabot-ai.md) | `@activepieces/piece-kallabot-ai` | 0.4.7 | 8 | `SECRET_TEXT` |
| [Kapso](piece-kapso.md) | `@activepieces/piece-kapso` | 0.2.0 | 15 | `SECRET_TEXT` |
| [Katana](piece-katana.md) | `@activepieces/piece-katana` | 0.2.0 | 4 | `SECRET_TEXT` |
| [Kimai](piece-kimai.md) | `@activepieces/piece-kimai` | 0.3.1 | 2 | `CUSTOM_AUTH` |
| [Kissflow](piece-kissflow.md) | `@activepieces/piece-kissflow` | 0.2.0 | 2 | `CUSTOM_AUTH` |
| [Kizeo Forms](piece-kizeo-forms.md) | `@activepieces/piece-kizeo-forms` | 0.5.1 | 11 | `SECRET_TEXT` |
| [Klaviyo](piece-klaviyo.md) | `@activepieces/piece-klaviyo` | 0.2.1 | 11 | `SECRET_TEXT`, `OAUTH2` |
| [Klenty](piece-klenty.md) | `@activepieces/piece-klenty` | 0.1.0 | 5 | `CUSTOM_AUTH` |
| [Klipy](piece-klipy.md) | `@activepieces/piece-klipy` | 0.1.0 | 4 | `SECRET_TEXT` |
| [Knack](piece-knack.md) | `@activepieces/piece-knack` | 0.2.1 | 5 | `CUSTOM_AUTH` |
| [Knock](piece-knock.md) | `@activepieces/piece-knock` | 0.2.0 | 7 | `SECRET_TEXT` |
| [Ko-fi](piece-ko-fi.md) | `@activepieces/piece-ko-fi` | 0.0.5 | 0 | `SECRET_TEXT` |
| [Kommo](piece-kommo.md) | `@activepieces/piece-kommo` | 0.2.1 | 8 | `CUSTOM_AUTH` |
| [KrispCall](piece-krisp-call.md) | `@activepieces/piece-krisp-call` | 0.1.7 | 4 | `CUSTOM_AUTH` |
| [Kudosity](piece-kudosity.md) | `@activepieces/piece-kudosity` | 0.2.0 | 7 | `SECRET_TEXT` |
| [Kustomer](piece-kustomer.md) | `@activepieces/piece-kustomer` | 0.1.0 | 6 | `SECRET_TEXT` |
| [LeadConnector](piece-lead-connector.md) | `@activepieces/piece-lead-connector` | 0.4.1 | 11 | `OAUTH2` |
| [Leap AI](piece-leap-ai.md) | `@activepieces/piece-leap-ai` | 0.0.8 | 2 | `SECRET_TEXT` |
| [Leexi](piece-leexi.md) | `@activepieces/piece-leexi` | 0.2.1 | 2 | `BASIC_AUTH` |
| [Lemlist](piece-lemlist.md) | `@activepieces/piece-lemlist` | 0.1.11 | 13 | `SECRET_TEXT` |
| [Lemon Squeezy](piece-lemon-squeezy.md) | `@activepieces/piece-lemon-squeezy` | 0.3.1 | 37 | `SECRET_TEXT` |
| [Let's Calendar](piece-lets-calendar.md) | `@activepieces/piece-lets-calendar` | 0.1.0 | 2 | `CUSTOM_AUTH` |
| [Letmepost](piece-letmepost.md) | `@activepieces/piece-letmepost` | 0.1.1 | 5 | `CUSTOM_AUTH` |
| [Letta](piece-letta.md) | `@activepieces/piece-letta` | 0.1.8 | 4 | `CUSTOM_AUTH` |
| [Lever](piece-lever.md) | `@activepieces/piece-lever` | 0.2.0 | 6 | `CUSTOM_AUTH` |
| [Lightfunnels](piece-lightfunnels.md) | `@activepieces/piece-lightfunnels` | 0.1.7 | 10 | `OAUTH2` |
| [Line Bot](piece-line.md) | `@activepieces/piece-line` | 0.2.1 | 2 | `SECRET_TEXT` |
| [Linear](piece-linear.md) | `@activepieces/piece-linear` | 0.9.1 | 58 | `SECRET_TEXT` |
| [Linka](piece-linka.md) | `@activepieces/piece-linka` | 0.1.6 | 6 | `CUSTOM_AUTH` |
| [LinkedIn](piece-linkedin.md) | `@activepieces/piece-linkedin` | 0.5.1 | 9 | `OAUTH2` |
| [Linkup](piece-linkup.md) | `@activepieces/piece-linkup` | 0.1.7 | 2 | `SECRET_TEXT` |
| [LinkupAPI](piece-linkupapi.md) | `@activepieces/piece-linkupapi` | 0.1.0 | 12 | `SECRET_TEXT` |
| [LiveSession](piece-livesession.md) | `@activepieces/piece-livesession` | 0.1.0 | 1 | `SECRET_TEXT` |
| [LLMRails](piece-llmrails.md) | `@activepieces/piece-llmrails` | 0.2.0 | 2 | `SECRET_TEXT` |
| [LobsterMail](piece-lobstermail.md) | `@activepieces/piece-lobstermail` | 0.2.1 | 10 | `SECRET_TEXT` |
| [LocalAI](piece-localai.md) | `@activepieces/piece-localai` | 0.3.1 | 6 | `CUSTOM_AUTH` |
| [Lofty](piece-lofty.md) | `@activepieces/piece-lofty` | 0.2.1 | 5 | `SECRET_TEXT` |
| [LogRocket](piece-logrocket.md) | `@activepieces/piece-logrocket` | 0.1.7 | 2 | `SECRET_TEXT` |
| [LogSnag](piece-logsnag.md) | `@activepieces/piece-logsnag` | 0.1.1 | 2 | `SECRET_TEXT` |
| [Lokalise](piece-lokalise.md) | `@activepieces/piece-lokalise` | 0.1.0 | 12 | `SECRET_TEXT` |
| [Loops](piece-loops.md) | `@activepieces/piece-loops` | 0.1.1 | 6 | `SECRET_TEXT` |
| [Lucidya](piece-lucidya.md) | `@activepieces/piece-lucidya` | 0.0.8 | 0 | `SECRET_TEXT` |
| [Lusha](piece-lusha.md) | `@activepieces/piece-lusha` | 0.2.0 | 3 | `SECRET_TEXT` |
| [Luxury Presence](piece-luxury-presence.md) | `@activepieces/piece-luxury-presence` | 0.1.7 | 0 | `SECRET_TEXT` |
| [Magical API](piece-magical-api.md) | `@activepieces/piece-magical-api` | 0.2.1 | 6 | `SECRET_TEXT` |
| [MagicSlides](piece-magicslides.md) | `@activepieces/piece-magicslides` | 0.1.7 | 3 | `CUSTOM_AUTH` |
| [Mailchain](piece-mailchain.md) | `@activepieces/piece-mailchain` | 0.1.6 | 2 | `SECRET_TEXT` |
| [Mailchimp](piece-mailchimp.md) | `@activepieces/piece-mailchimp` | 0.5.10 | 17 | `OAUTH2` |
| [Mailercheck](piece-mailercheck.md) | `@activepieces/piece-mailercheck` | 0.2.0 | 2 | `SECRET_TEXT` |
| [MailerLite](piece-mailer-lite.md) | `@activepieces/piece-mailer-lite` | 0.9.1 | 48 | `SECRET_TEXT` |
| [Maileroo](piece-maileroo.md) | `@activepieces/piece-maileroo` | 0.3.0 | 34 | `CUSTOM_AUTH` |
| [Mailgun](piece-mailgun.md) | `@activepieces/piece-mailgun` | 0.1.1 | 9 | `CUSTOM_AUTH` |
| [Mailjet](piece-mailjet.md) | `@activepieces/piece-mailjet` | 0.2.0 | 120 | `BASIC_AUTH` |
| [Manual Trigger](piece-manual-trigger.md) | `@activepieces/piece-manual-trigger` | 0.0.8 | 0 | none |
| [Manus](piece-manus.md) | `@activepieces/piece-manus` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Manychat](piece-manychat.md) | `@activepieces/piece-manychat` | 0.1.7 | 7 | `SECRET_TEXT` |
| [Mastodon](piece-mastodon.md) | `@activepieces/piece-mastodon` | 0.8.2 | 86 | `CUSTOM_AUTH` |
| [Math Helper](piece-math-helper.md) | `@activepieces/piece-math-helper` | 0.1.0 | 6 | none |
| [Matomo](piece-matomo.md) | `@activepieces/piece-matomo` | 0.2.2 | 2 | `CUSTOM_AUTH` |
| [Matrix](piece-matrix.md) | `@activepieces/piece-matrix` | 0.5.1 | 2 | `CUSTOM_AUTH` |
| [Mattermost](piece-mattermost.md) | `@activepieces/piece-mattermost` | 0.5.1 | 2 | `CUSTOM_AUTH` |
| [Mautic](piece-mautic.md) | `@activepieces/piece-mautic` | 0.7.0 | 200 | `CUSTOM_AUTH` |
| [MCP](piece-mcp.md) | `@activepieces/piece-mcp` | 0.0.21 | 1 | none |
| [MCP Client](piece-mcp-client.md) | `@activepieces/piece-mcp-client` | 0.0.6 | 1 | `CUSTOM_AUTH` |
| [Medullar](piece-medullar.md) | `@activepieces/piece-medullar` | 0.3.7 | 6 | `SECRET_TEXT` |
| [Meetgeek](piece-meetgeek-ai.md) | `@activepieces/piece-meetgeek-ai` | 0.1.7 | 6 | `SECRET_TEXT` |
| [MeisterTask](piece-meistertask.md) | `@activepieces/piece-meistertask` | 0.2.2 | 13 | `OAUTH2` |
| [Mem](piece-mem.md) | `@activepieces/piece-mem` | 0.2.1 | 4 | `SECRET_TEXT` |
| [Mempool](piece-mempool-space.md) | `@activepieces/piece-mempool-space` | 0.2.0 | 35 | none |
| [Metabase](piece-metabase.md) | `@activepieces/piece-metabase` | 0.3.1 | 5 | `CUSTOM_AUTH` |
| [Metatext](piece-metatext.md) | `@activepieces/piece-metatext` | 0.1.7 | 3 | `SECRET_TEXT` |
| [Microsoft 365 Copilot](piece-microsoft-copilot.md) | `@activepieces/piece-microsoft-copilot` | 0.2.3 | 3 | `OAUTH2` |
| [Microsoft 365 People](piece-microsoft-365-people.md) | `@activepieces/piece-microsoft-365-people` | 0.3.1 | 7 | `OAUTH2` |
| [Microsoft 365 Planner](piece-microsoft-365-planner.md) | `@activepieces/piece-microsoft-365-planner` | 0.3.2 | 12 | `OAUTH2` |
| [Microsoft Dynamics 365 Business Central](piece-microsoft-dynamics-365-business-central.md) | `@activepieces/piece-microsoft-dynamics-365-business-central` | 0.3.0 | 6 | `OAUTH2` |
| [Microsoft Dynamics CRM](piece-microsoft-dynamics-crm.md) | `@activepieces/piece-microsoft-dynamics-crm` | 0.4.1 | 5 | `OAUTH2` |
| [Microsoft Excel 365](piece-microsoft-excel-365.md) | `@activepieces/piece-microsoft-excel-365` | 0.8.2 | 33 | `OAUTH2` |
| [Microsoft OneDrive](piece-microsoft-onedrive.md) | `@activepieces/piece-microsoft-onedrive` | 0.6.1 | 41 | `OAUTH2` |
| [Microsoft OneNote](piece-microsoft-onenote.md) | `@activepieces/piece-microsoft-onenote` | 0.4.2 | 7 | `OAUTH2` |
| [Microsoft Outlook](piece-microsoft-outlook.md) | `@activepieces/piece-microsoft-outlook` | 0.7.3 | 57 | `OAUTH2` |
| [Microsoft Outlook Calendar](piece-microsoft-outlook-calendar.md) | `@activepieces/piece-microsoft-outlook-calendar` | 0.3.1 | 4 | `OAUTH2` |
| [Microsoft Power BI](piece-microsoft-power-bi.md) | `@activepieces/piece-microsoft-power-bi` | 0.4.2 | 9 | `OAUTH2` |
| [Microsoft SharePoint](piece-microsoft-sharepoint.md) | `@activepieces/piece-microsoft-sharepoint` | 0.4.2 | 16 | `OAUTH2` |
| [Microsoft SQL Server](piece-microsoft-sql-server.md) | `@activepieces/piece-microsoft-sql-server` | 0.1.1 | 7 | `CUSTOM_AUTH` |
| [Microsoft Teams](piece-microsoft-teams.md) | `@activepieces/piece-microsoft-teams` | 0.7.3 | 16 | `OAUTH2` |
| [Microsoft Teams Bot](piece-microsoft-teams-bot.md) | `@activepieces/piece-microsoft-teams-bot` | 0.1.1 | 1 | `CUSTOM_AUTH` |
| [Microsoft To Do](piece-microsoft-todo.md) | `@activepieces/piece-microsoft-todo` | 0.5.1 | 42 | `OAUTH2` |
| [MillionVerifier](piece-millionverifier.md) | `@activepieces/piece-millionverifier` | 0.1.8 | 1 | `SECRET_TEXT` |
| [Mindee](piece-mindee.md) | `@activepieces/piece-mindee` | 0.3.1 | 2 | `SECRET_TEXT` |
| [MindStudio](piece-mind-studio.md) | `@activepieces/piece-mind-studio` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Missive](piece-missive.md) | `@activepieces/piece-missive` | 0.2.0 | 6 | `SECRET_TEXT` |
| [Mistral AI](piece-mistral-ai.md) | `@activepieces/piece-mistral-ai` | 0.4.0 | 48 | `SECRET_TEXT`, `CUSTOM_AUTH` |
| [Mixmax](piece-mixmax.md) | `@activepieces/piece-mixmax` | 0.1.0 | 6 | `SECRET_TEXT` |
| [Mixpanel](piece-mixpanel.md) | `@activepieces/piece-mixpanel` | 0.2.1 | 2 | `SECRET_TEXT` |
| [ModelsLab](piece-modelslab.md) | `@activepieces/piece-modelslab` | 0.0.5 | 1 | `SECRET_TEXT` |
| [Mollie](piece-mollie.md) | `@activepieces/piece-mollie` | 0.1.6 | 8 | `SECRET_TEXT` |
| [monday.com](piece-monday.md) | `@activepieces/piece-monday` | 0.4.0 | 100 | `SECRET_TEXT` |
| [MongoDB](piece-mongodb.md) | `@activepieces/piece-mongodb` | 0.1.7 | 7 | `CUSTOM_AUTH` |
| [Moon Invoice](piece-mooninvoice.md) | `@activepieces/piece-mooninvoice` | 0.0.9 | 7 | `CUSTOM_AUTH` |
| [Moonclerk](piece-moonclerk.md) | `@activepieces/piece-moonclerk` | 0.1.0 | 2 | `SECRET_TEXT` |
| [Motion](piece-motion.md) | `@activepieces/piece-motion` | 0.2.1 | 7 | `SECRET_TEXT` |
| [MotionTools](piece-motiontools.md) | `@activepieces/piece-motiontools` | 0.1.7 | 2 | `SECRET_TEXT` |
| [Moveo](piece-moveo-ai.md) | `@activepieces/piece-moveo-ai` | 0.1.0 | 1 | `SECRET_TEXT` |
| [Moxie](piece-moxie-crm.md) | `@activepieces/piece-moxie-crm` | 0.4.0 | 59 | `CUSTOM_AUTH` |
| [Muna](piece-muna-ai.md) | `@activepieces/piece-muna-ai` | 0.1.0 | 2 | `SECRET_TEXT` |
| [Murf AI](piece-murf-api.md) | `@activepieces/piece-murf-api` | 0.2.2 | 5 | `SECRET_TEXT` |
| [MyCase](piece-mycase-piece.md) | `@activepieces/piece-mycase-piece` | 0.1.7 | 37 | `OAUTH2` |
| [Mysendingbox](piece-mysendingbox.md) | `@activepieces/piece-mysendingbox` | 0.1.0 | 1 | `CUSTOM_AUTH` |
| [MySQL](piece-mysql.md) | `@activepieces/piece-mysql` | 0.3.0 | 7 | `CUSTOM_AUTH` |
| [Netlify](piece-netlify.md) | `@activepieces/piece-netlify` | 0.1.7 | 4 | `OAUTH2` |
| [NetSuite](piece-netsuite.md) | `@activepieces/piece-netsuite` | 0.2.1 | 5 | `CUSTOM_AUTH` |
| [NeverBounce](piece-neverbounce.md) | `@activepieces/piece-neverbounce` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Nifty](piece-nifty.md) | `@activepieces/piece-nifty` | 0.3.0 | 22 | `OAUTH2` |
| [Ninety](piece-ninety.md) | `@activepieces/piece-ninety` | 0.1.1 | 14 | `SECRET_TEXT` |
| [NinjaPipe](piece-ninjapipe.md) | `@activepieces/piece-ninjapipe` | 0.1.1 | 51 | `CUSTOM_AUTH` |
| [Ninox](piece-ninox.md) | `@activepieces/piece-ninox` | 0.2.1 | 8 | `SECRET_TEXT` |
| [NocoDB](piece-nocodb.md) | `@activepieces/piece-nocodb` | 0.5.0 | 17 | `CUSTOM_AUTH` |
| [Notion](piece-notion.md) | `@activepieces/piece-notion` | 0.7.5 | 37 | `OAUTH2`, `CUSTOM_AUTH` |
| [ntfy](piece-ntfy.md) | `@activepieces/piece-ntfy` | 0.4.1 | 13 | `CUSTOM_AUTH` |
| [Nuelink](piece-nuelink.md) | `@activepieces/piece-nuelink` | 0.2.1 | 29 | `SECRET_TEXT`, `CUSTOM_AUTH` |
| [Octopush SMS](piece-octopush-sms.md) | `@activepieces/piece-octopush-sms` | 0.2.0 | 3 | `CUSTOM_AUTH` |
| [Odoo](piece-odoo.md) | `@activepieces/piece-odoo` | 0.3.2 | 49 | `CUSTOM_AUTH` |
| [Okta](piece-okta.md) | `@activepieces/piece-okta` | 0.2.0 | 10 | `CUSTOM_AUTH` |
| [Omni](piece-omni-co.md) | `@activepieces/piece-omni-co` | 0.2.0 | 9 | `SECRET_TEXT` |
| [Omni HR](piece-omnihr.md) | `@activepieces/piece-omnihr` | 0.2.1 | 6 | `CUSTOM_AUTH` |
| [Omnisend](piece-omnisend.md) | `@activepieces/piece-omnisend` | 0.1.0 | 6 | `SECRET_TEXT` |
| [Oncehub](piece-oncehub.md) | `@activepieces/piece-oncehub` | 0.2.1 | 3 | `SECRET_TEXT` |
| [Onfleet](piece-onfleet.md) | `@activepieces/piece-onfleet` | 0.2.0 | 33 | `SECRET_TEXT` |
| [OpenAI](piece-openai.md) | `@activepieces/piece-openai` | 0.13.2 | 19 | `SECRET_TEXT` |
| [OpenMic AI](piece-openmic-ai.md) | `@activepieces/piece-openmic-ai` | 0.2.0 | 6 | `SECRET_TEXT` |
| [OpenPhone](piece-open-phone.md) | `@activepieces/piece-open-phone` | 0.1.7 | 4 | `SECRET_TEXT` |
| [OpenRouter](piece-open-router.md) | `@activepieces/piece-open-router` | 0.3.0 | 9 | `SECRET_TEXT` |
| [Opnform](piece-opnform.md) | `@activepieces/piece-opnform` | 0.3.0 | 17 | `CUSTOM_AUTH` |
| [Opportify](piece-opportify.md) | `@activepieces/piece-opportify` | 0.1.7 | 2 | `SECRET_TEXT` |
| [Oracle Database](piece-oracle-database.md) | `@activepieces/piece-oracle-database` | 0.1.15 | 6 | `CUSTOM_AUTH` |
| [Oracle Fusion Cloud ERP](piece-oracle-fusion-cloud-erp.md) | `@activepieces/piece-oracle-fusion-cloud-erp` | 0.1.1 | 23 | `CUSTOM_AUTH` |
| [Orimon](piece-orimon.md) | `@activepieces/piece-orimon` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Outseta](piece-outseta.md) | `@activepieces/piece-outseta` | 0.3.2 | 44 | `CUSTOM_AUTH` |
| [Paddle](piece-paddle.md) | `@activepieces/piece-paddle` | 0.1.0 | 6 | `SECRET_TEXT` |
| [PagerDuty](piece-pagerduty.md) | `@activepieces/piece-pagerduty` | 0.2.0 | 6 | `SECRET_TEXT` |
| [PandaDoc](piece-pandadoc.md) | `@activepieces/piece-pandadoc` | 0.2.2 | 8 | `SECRET_TEXT` |
| [Paperform](piece-paperform.md) | `@activepieces/piece-paperform` | 0.2.0 | 14 | `SECRET_TEXT` |
| [Parallel](piece-parallel.md) | `@activepieces/piece-parallel` | 0.1.1 | 9 | `SECRET_TEXT` |
| [Parser Expert](piece-parser-expert.md) | `@activepieces/piece-parser-expert` | 0.1.7 | 2 | `SECRET_TEXT` |
| [Parseur](piece-parseur.md) | `@activepieces/piece-parseur` | 0.2.2 | 6 | `SECRET_TEXT` |
| [Pastebin](piece-pastebin.md) | `@activepieces/piece-pastebin` | 0.2.8 | 2 | `CUSTOM_AUTH` |
| [Pastefy](piece-pastefy.md) | `@activepieces/piece-pastefy` | 0.3.1 | 9 | `CUSTOM_AUTH` |
| [Paywhirl](piece-paywhirl.md) | `@activepieces/piece-paywhirl` | 0.1.0 | 6 | `CUSTOM_AUTH` |
| [PDF](piece-pdf.md) | `@activepieces/piece-pdf` | 0.6.0 | 9 | none |
| [PDF.co](piece-pdf-co.md) | `@activepieces/piece-pdf-co` | 0.2.0 | 37 | `SECRET_TEXT` |
| [PDF4me](piece-pdf4me.md) | `@activepieces/piece-pdf4me` | 0.1.0 | 8 | `SECRET_TEXT` |
| [Pdfcrowd](piece-pdfcrowd.md) | `@activepieces/piece-pdfcrowd` | 0.2.1 | 3 | `BASIC_AUTH` |
| [PDFMonkey](piece-pdfmonkey.md) | `@activepieces/piece-pdfmonkey` | 0.2.1 | 4 | `SECRET_TEXT` |
| [PeekShot](piece-peekshot.md) | `@activepieces/piece-peekshot` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Pendo](piece-pendo.md) | `@activepieces/piece-pendo` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Perplexity AI](piece-perplexity-ai.md) | `@activepieces/piece-perplexity-ai` | 0.4.1 | 1 | `SECRET_TEXT` |
| [Personal AI](piece-personal-ai.md) | `@activepieces/piece-personal-ai` | 0.1.8 | 10 | `SECRET_TEXT` |
| [PhantomBuster](piece-phantombuster.md) | `@activepieces/piece-phantombuster` | 0.2.0 | 2 | `SECRET_TEXT` |
| [Phone Validator](piece-phone-validator.md) | `@activepieces/piece-phone-validator` | 0.0.8 | 1 | `SECRET_TEXT` |
| [Photoroom](piece-photoroom.md) | `@activepieces/piece-photoroom` | 0.1.9 | 1 | `CUSTOM_AUTH` |
| [Pinch Payments](piece-pinch-payments.md) | `@activepieces/piece-pinch-payments` | 0.0.11 | 8 | `CUSTOM_AUTH` |
| [Pinecone](piece-pinecone.md) | `@activepieces/piece-pinecone` | 0.1.7 | 7 | `CUSTOM_AUTH` |
| [Pinterest](piece-pinterest.md) | `@activepieces/piece-pinterest` | 0.2.2 | 35 | `OAUTH2` |
| [Pipedrive](piece-pipedrive.md) | `@activepieces/piece-pipedrive` | 0.10.2 | 62 | `OAUTH2` |
| [Placid](piece-placid.md) | `@activepieces/piece-placid` | 0.2.0 | 8 | `SECRET_TEXT` |
| [Plausible Analytics](piece-plausible.md) | `@activepieces/piece-plausible` | 0.2.0 | 20 | `SECRET_TEXT` |
| [Plunk](piece-plunk.md) | `@activepieces/piece-plunk` | 0.1.0 | 5 | `CUSTOM_AUTH` |
| [Pocketbase](piece-pocketbase.md) | `@activepieces/piece-pocketbase` | 0.0.6 | 6 | `CUSTOM_AUTH` |
| [Podio](piece-podio.md) | `@activepieces/piece-podio` | 0.2.2 | 10 | `OAUTH2` |
| [PollyBot AI](piece-pollybot-ai.md) | `@activepieces/piece-pollybot-ai` | 0.2.0 | 5 | `CUSTOM_AUTH` |
| [PolyDoc](piece-polydoc.md) | `@activepieces/piece-polydoc` | 0.1.1 | 4 | `CUSTOM_AUTH` |
| [Poper](piece-poper.md) | `@activepieces/piece-poper` | 0.2.7 | 0 | none |
| [Postgres](piece-postgres.md) | `@activepieces/piece-postgres` | 0.4.1 | 7 | `CUSTOM_AUTH` |
| [PostHog](piece-posthog.md) | `@activepieces/piece-posthog` | 0.6.1 | 5 | `CUSTOM_AUTH` |
| [Postiz](piece-postiz.md) | `@activepieces/piece-postiz` | 0.1.2 | 9 | `CUSTOM_AUTH` |
| [Postmark](piece-postmark.md) | `@activepieces/piece-postmark` | 0.1.1 | 5 | `SECRET_TEXT` |
| [PredictLeads](piece-predict-leads.md) | `@activepieces/piece-predict-leads` | 0.2.0 | 12 | `CUSTOM_AUTH` |
| [Predis.ai](piece-predis-ai.md) | `@activepieces/piece-predis-ai` | 0.0.8 | 1 | `SECRET_TEXT` |
| [Presenton](piece-presentation.md) | `@activepieces/piece-presentation` | 0.3.0 | 17 | `SECRET_TEXT` |
| [Productboard](piece-productboard.md) | `@activepieces/piece-productboard` | 0.1.8 | 4 | `SECRET_TEXT` |
| [Produktly](piece-produktly.md) | `@activepieces/piece-produktly` | 0.1.1 | 15 | `SECRET_TEXT` |
| [PromoteKit](piece-promotekit.md) | `@activepieces/piece-promotekit` | 0.4.1 | 14 | `SECRET_TEXT` |
| [PromptHub](piece-prompthub.md) | `@activepieces/piece-prompthub` | 0.2.1 | 5 | `SECRET_TEXT` |
| [PromptMate](piece-promptmate.md) | `@activepieces/piece-promptmate` | 0.2.0 | 9 | `SECRET_TEXT` |
| [ProvenExpert](piece-provenexpert.md) | `@activepieces/piece-provenexpert` | 0.1.0 | 6 | `CUSTOM_AUTH` |
| [Proxycurl](piece-proxycurl.md) | `@activepieces/piece-proxycurl` | 0.1.4 | 5 | `SECRET_TEXT` |
| [Pubrio](piece-pubrio.md) | `@activepieces/piece-pubrio` | 0.1.1 | 28 | `SECRET_TEXT` |
| [Pushbullet](piece-pushbullet.md) | `@activepieces/piece-pushbullet` | 0.2.0 | 3 | `SECRET_TEXT` |
| [Pushover](piece-pushover.md) | `@activepieces/piece-pushover` | 0.2.10 | 20 | `CUSTOM_AUTH` |
| [Pylon](piece-pylon.md) | `@activepieces/piece-pylon` | 0.2.0 | 1 | `SECRET_TEXT` |
| [Qawafel](piece-qawafel.md) | `@activepieces/piece-qawafel` | 0.1.0 | 15 | `CUSTOM_AUTH` |
| [Qdrant](piece-qdrant.md) | `@activepieces/piece-qdrant` | 0.3.7 | 7 | `CUSTOM_AUTH` |
| [QR Code](piece-qrcode.md) | `@activepieces/piece-qrcode` | 0.0.18 | 1 | none |
| [Quaderno](piece-quaderno.md) | `@activepieces/piece-quaderno` | 0.1.0 | 5 | `CUSTOM_AUTH` |
| [Queue](piece-queue.md) | `@activepieces/piece-queue` | 0.2.0 | 5 | none |
| [Quickbase](piece-quickbase.md) | `@activepieces/piece-quickbase` | 0.2.0 | 7 | `CUSTOM_AUTH` |
| [QuickBooks Desktop (via Conductor)](piece-quickbooks-desktop-conductor.md) | `@activepieces/piece-quickbooks-desktop-conductor` | 0.1.2 | 8 | `CUSTOM_AUTH` |
| [Quickbooks Online](piece-quickbooks.md) | `@activepieces/piece-quickbooks` | 0.3.3 | 13 | `OAUTH2` |
| [QuickBooks Online (Sandbox)](piece-quickbooks-sandbox.md) | `@activepieces/piece-quickbooks-sandbox` | 0.2.2 | 13 | `OAUTH2` |
| [Quickzu](piece-quickzu.md) | `@activepieces/piece-quickzu` | 0.1.7 | 15 | `SECRET_TEXT` |
| [Quizell](piece-quizell.md) | `@activepieces/piece-quizell` | 0.1.0 | 8 | `SECRET_TEXT` |
| [Qwilr](piece-qwilr.md) | `@activepieces/piece-qwilr` | 0.2.0 | 2 | `SECRET_TEXT` |
| [RabbitMQ](piece-rabbitmq.md) | `@activepieces/piece-rabbitmq` | 0.1.7 | 2 | `CUSTOM_AUTH` |
| [raia](piece-raia-ai.md) | `@activepieces/piece-raia-ai` | 0.2.0 | 3 | `SECRET_TEXT` |
| [Raindrop](piece-raindrop.md) | `@activepieces/piece-raindrop` | 0.1.2 | 6 | `OAUTH2` |
| [RapidText AI](piece-rapidtext-ai.md) | `@activepieces/piece-rapidtext-ai` | 0.1.7 | 2 | `SECRET_TEXT` |
| [Razorpay](piece-razorpay.md) | `@activepieces/piece-razorpay` | 0.2.1 | 2 | `CUSTOM_AUTH` |
| [re:tune](piece-retune.md) | `@activepieces/piece-retune` | 0.2.1 | 2 | `CUSTOM_AUTH` |
| [Reachinbox](piece-reachinbox.md) | `@activepieces/piece-reachinbox` | 0.2.1 | 13 | `SECRET_TEXT` |
| [Readwise](piece-readwise.md) | `@activepieces/piece-readwise` | 0.2.0 | 3 | `SECRET_TEXT` |
| [Recall.ai](piece-recall-ai.md) | `@activepieces/piece-recall-ai` | 0.2.0 | 4 | `CUSTOM_AUTH` |
| [Recurly](piece-recurly.md) | `@activepieces/piece-recurly` | 0.1.0 | 5 | `SECRET_TEXT` |
| [Reddit](piece-reddit.md) | `@activepieces/piece-reddit` | 0.4.0 | 57 | `OAUTH2` |
| [Rendex](piece-rendex.md) | `@activepieces/piece-rendex` | 0.1.1 | 2 | `SECRET_TEXT` |
| [Reoon Email Verifier](piece-reoon-verifier.md) | `@activepieces/piece-reoon-verifier` | 0.2.1 | 6 | `SECRET_TEXT` |
| [Reply.io](piece-reply-io.md) | `@activepieces/piece-reply-io` | 0.2.0 | 10 | `SECRET_TEXT` |
| [Resend](piece-resend.md) | `@activepieces/piece-resend` | 0.5.2 | 58 | `SECRET_TEXT` |
| [Respaid](piece-respaid.md) | `@activepieces/piece-respaid` | 0.1.7 | 4 | `SECRET_TEXT` |
| [Respond.io](piece-respond-io.md) | `@activepieces/piece-respond-io` | 0.2.0 | 9 | `CUSTOM_AUTH` |
| [Retable](piece-retable.md) | `@activepieces/piece-retable` | 0.2.0 | 7 | `SECRET_TEXT` |
| [Retell AI](piece-retell-ai.md) | `@activepieces/piece-retell-ai` | 0.2.1 | 7 | `CUSTOM_AUTH` |
| [Returning AI](piece-returning-ai.md) | `@activepieces/piece-returning-ai` | 0.2.5 | 3 | `SECRET_TEXT` |
| [RingCentral](piece-ringcentral.md) | `@activepieces/piece-ringcentral` | 0.1.2 | 8 | `OAUTH2` |
| [Robolly](piece-robolly.md) | `@activepieces/piece-robolly` | 0.3.0 | 11 | `SECRET_TEXT` |
| [Roe AI](piece-roe-ai.md) | `@activepieces/piece-roe-ai` | 0.1.0 | 3 | `CUSTOM_AUTH` |
| [RSS Feed](piece-rss.md) | `@activepieces/piece-rss` | 0.7.0 | 3 | none |
| [Runware](piece-runware.md) | `@activepieces/piece-runware` | 0.1.7 | 4 | `SECRET_TEXT` |
| [Runway](piece-runway.md) | `@activepieces/piece-runway` | 0.1.7 | 4 | `SECRET_TEXT` |
| [Saastic](piece-saastic.md) | `@activepieces/piece-saastic` | 0.2.1 | 3 | `SECRET_TEXT` |
| [Sage Accounting](piece-sage-accounting.md) | `@activepieces/piece-sage-accounting` | 0.0.1 | 30 | `OAUTH2` |
| [Saleor](piece-saleor.md) | `@activepieces/piece-saleor` | 0.1.6 | 3 | `CUSTOM_AUTH` |
| [Salesforce](piece-salesforce.md) | `@activepieces/piece-salesforce` | 0.9.4 | 104 | `OAUTH2` |
| [Salesloft](piece-salesloft.md) | `@activepieces/piece-salesloft` | 0.1.0 | 8 | `SECRET_TEXT` |
| [Salsa](piece-salsa.md) | `@activepieces/piece-salsa` | 0.1.2 | 3 | `SECRET_TEXT` |
| [SAP Ariba](piece-sap-ariba.md) | `@activepieces/piece-sap-ariba` | 0.0.8 | 14 | `CUSTOM_AUTH` |
| [Sardis](piece-sardis.md) | `@activepieces/piece-sardis` | 0.2.0 | 6 | `SECRET_TEXT` |
| [SavvyCal](piece-savvycal.md) | `@activepieces/piece-savvycal` | 0.2.2 | 15 | `OAUTH2`, `CUSTOM_AUTH` |
| [Scenario](piece-scenario.md) | `@activepieces/piece-scenario` | 0.2.0 | 1 | `BASIC_AUTH` |
| [Schedule](piece-schedule.md) | `@activepieces/piece-schedule` | 0.1.22 | 0 | none |
| [ScrapeGraphAI](piece-scrapegrapghai.md) | `@activepieces/piece-scrapegrapghai` | 0.3.1 | 24 | `SECRET_TEXT` |
| [SeekTable](piece-seek-table.md) | `@activepieces/piece-seek-table` | 0.0.9 | 2 | `SECRET_TEXT` |
| [Segment](piece-segment.md) | `@activepieces/piece-segment` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Sender](piece-sender.md) | `@activepieces/piece-sender` | 0.1.7 | 7 | `SECRET_TEXT` |
| [SendFox](piece-sendfox.md) | `@activepieces/piece-sendfox` | 0.2.0 | 4 | `SECRET_TEXT` |
| [SendGrid](piece-sendgrid.md) | `@activepieces/piece-sendgrid` | 0.6.3 | 8 | `SECRET_TEXT`, `CUSTOM_AUTH` |
| [SendIt](piece-send-it.md) | `@activepieces/piece-send-it` | 0.2.0 | 8 | `SECRET_TEXT` |
| [SendPulse](piece-sendpulse.md) | `@activepieces/piece-sendpulse` | 0.2.1 | 6 | `CUSTOM_AUTH` |
| [Sendr](piece-sendr.md) | `@activepieces/piece-sendr` | 0.1.0 | 19 | `SECRET_TEXT` |
| [Sendy](piece-sendy.md) | `@activepieces/piece-sendy` | 0.1.7 | 10 | `CUSTOM_AUTH` |
| [Senja](piece-senja.md) | `@activepieces/piece-senja` | 0.2.1 | 11 | `SECRET_TEXT` |
| [SerpApi](piece-serp-api.md) | `@activepieces/piece-serp-api` | 0.1.10 | 21 | `SECRET_TEXT` |
| [Serpstat](piece-serpstat.md) | `@activepieces/piece-serpstat` | 0.2.0 | 3 | `SECRET_TEXT` |
| [ServiceNow](piece-service-now.md) | `@activepieces/piece-service-now` | 0.3.1 | 17 | `CUSTOM_AUTH` |
| [Sessions.us](piece-sessions-us.md) | `@activepieces/piece-sessions-us` | 0.2.1 | 4 | `SECRET_TEXT` |
| [seven](piece-seven.md) | `@activepieces/piece-seven` | 0.1.8 | 4 | `SECRET_TEXT` |
| [Shippo](piece-shippo.md) | `@activepieces/piece-shippo` | 0.1.7 | 3 | `SECRET_TEXT` |
| [Shopify](piece-shopify.md) | `@activepieces/piece-shopify` | 0.9.1 | 291 | `CUSTOM_AUTH`, `OAUTH2` |
| [Short.io](piece-short-io.md) | `@activepieces/piece-short-io` | 0.3.1 | 35 | `CUSTOM_AUTH` |
| [SignNow](piece-sign-now.md) | `@activepieces/piece-sign-now` | 0.0.8 | 8 | `OAUTH2`, `CUSTOM_AUTH` |
| [Signrequest](piece-signrequest.md) | `@activepieces/piece-signrequest` | 0.2.0 | 2 | `SECRET_TEXT` |
| [SimplePDF](piece-simplepdf.md) | `@activepieces/piece-simplepdf` | 1.1.7 | 0 | none |
| [SimpliRoute](piece-simpliroute.md) | `@activepieces/piece-simpliroute` | 0.2.0 | 35 | `SECRET_TEXT` |
| [SimplyBook.me](piece-simplybookme.md) | `@activepieces/piece-simplybookme` | 0.1.7 | 10 | `CUSTOM_AUTH` |
| [SimplyPrint](piece-simplyprint.md) | `@activepieces/piece-simplyprint` | 0.6.7 | 63 | `OAUTH2` |
| [SiteSpeakAI](piece-sitespeakai.md) | `@activepieces/piece-sitespeakai` | 0.1.6 | 3 | `SECRET_TEXT` |
| [SkyPrep](piece-skyprep.md) | `@activepieces/piece-skyprep` | 0.0.9 | 3 | `SECRET_TEXT` |
| [Skyvern](piece-skyvern.md) | `@activepieces/piece-skyvern` | 0.2.1 | 6 | `SECRET_TEXT` |
| [Slack](piece-slack.md) | `@activepieces/piece-slack` | 0.23.1 | 73 | `OAUTH2`, `CUSTOM_AUTH` |
| [SlashedCloud](piece-slashed.md) | `@activepieces/piece-slashed` | 0.1.0 | 2 | `SECRET_TEXT` |
| [SlideSpeak](piece-slidespeak.md) | `@activepieces/piece-slidespeak` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Slite](piece-slite.md) | `@activepieces/piece-slite` | 0.1.0 | 9 | `SECRET_TEXT` |
| [Smaily](piece-smaily.md) | `@activepieces/piece-smaily` | 0.2.0 | 3 | `CUSTOM_AUTH` |
| [SmartLead](piece-smartlead.md) | `@activepieces/piece-smartlead` | 0.1.1 | 5 | `SECRET_TEXT` |
| [Smartsheet](piece-smartsheet.md) | `@activepieces/piece-smartsheet` | 0.1.10 | 6 | `SECRET_TEXT` |
| [SmartSuite](piece-smartsuite.md) | `@activepieces/piece-smartsuite` | 0.3.1 | 46 | `CUSTOM_AUTH` |
| [Smoove](piece-smoove.md) | `@activepieces/piece-smoove` | 0.1.7 | 4 | `SECRET_TEXT` |
| [smsmode](piece-smsmode.md) | `@activepieces/piece-smsmode` | 0.1.0 | 2 | `SECRET_TEXT` |
| [SMTP](piece-smtp.md) | `@activepieces/piece-smtp` | 0.5.0 | 1 | `CUSTOM_AUTH` |
| [Snowflake](piece-snowflake.md) | `@activepieces/piece-snowflake` | 0.3.6 | 14 | `OAUTH2`, `CUSTOM_AUTH` |
| [SOAP](piece-soap.md) | `@activepieces/piece-soap` | 0.1.6 | 1 | `CUSTOM_AUTH` |
| [Socialkit](piece-socialkit.md) | `@activepieces/piece-socialkit` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Softr](piece-softr.md) | `@activepieces/piece-softr` | 0.3.1 | 32 | `SECRET_TEXT` |
| [Sofya](piece-sofya.md) | `@activepieces/piece-sofya` | 0.1.1 | 5 | `SECRET_TEXT` |
| [Sperse](piece-sperse.md) | `@activepieces/piece-sperse` | 0.1.7 | 6 | `CUSTOM_AUTH` |
| [Splitwise](piece-splitwise.md) | `@activepieces/piece-splitwise` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Spotify](piece-spotify.md) | `@activepieces/piece-spotify` | 0.6.1 | 15 | `OAUTH2` |
| [Square](piece-square.md) | `@activepieces/piece-square` | 1.0.1 | 39 | `OAUTH2` |
| [Stability AI](piece-stability-ai.md) | `@activepieces/piece-stability-ai` | 0.3.1 | 2 | `CUSTOM_AUTH` |
| [Stable Dffusion web UI](piece-stable-diffusion-webui.md) | `@activepieces/piece-stable-diffusion-webui` | 0.1.6 | 1 | `CUSTOM_AUTH` |
| [Storage](piece-store.md) | `@activepieces/piece-store` | 0.6.20 | 6 | none |
| [Strale](piece-strale.md) | `@activepieces/piece-strale` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Streak](piece-streak.md) | `@activepieces/piece-streak` | 0.1.1 | 11 | `SECRET_TEXT` |
| [Stripe](piece-stripe.md) | `@activepieces/piece-stripe` | 0.8.1 | 98 | `SECRET_TEXT` |
| [Sub Flows](piece-subflows.md) | `@activepieces/piece-subflows` | 0.7.0 | 3 | none |
| [Supabase](piece-supabase.md) | `@activepieces/piece-supabase` | 0.4.1 | 22 | `CUSTOM_AUTH` |
| [Supadata](piece-supadata.md) | `@activepieces/piece-supadata` | 0.2.0 | 16 | `SECRET_TEXT` |
| [SurrealDB](piece-surrealdb.md) | `@activepieces/piece-surrealdb` | 0.1.7 | 1 | `CUSTOM_AUTH` |
| [SurveyMonkey](piece-surveymonkey.md) | `@activepieces/piece-surveymonkey` | 0.3.1 | 1 | `OAUTH2` |
| [SurveyTale](piece-surveytale.md) | `@activepieces/piece-surveytale` | 0.1.0 | 1 | `SECRET_TEXT` |
| [SwarmNode](piece-swarmnode.md) | `@activepieces/piece-swarmnode` | 0.2.0 | 3 | `SECRET_TEXT` |
| [Synthesia](piece-synthesia.md) | `@activepieces/piece-synthesia` | 0.1.7 | 2 | `SECRET_TEXT` |
| [Systeme.io](piece-systeme-io.md) | `@activepieces/piece-systeme-io` | 0.2.1 | 27 | `SECRET_TEXT` |
| [Tableau](piece-tableau.md) | `@activepieces/piece-tableau` | 0.1.6 | 5 | `CUSTOM_AUTH` |
| [Tables](piece-tables.md) | `@activepieces/piece-tables` | 0.5.3 | 9 | none |
| [Tags](piece-tags.md) | `@activepieces/piece-tags` | 0.0.23 | 1 | none |
| [Talkable](piece-talkable.md) | `@activepieces/piece-talkable` | 0.3.1 | 14 | `CUSTOM_AUTH` |
| [Tally](piece-tally.md) | `@activepieces/piece-tally` | 0.6.2 | 25 | `SECRET_TEXT` |
| [Tapfiliate](piece-tapfiliate.md) | `@activepieces/piece-tapfiliate` | 0.2.0 | 5 | `SECRET_TEXT` |
| [Tarvent](piece-tarvent.md) | `@activepieces/piece-tarvent` | 0.1.8 | 18 | `CUSTOM_AUTH` |
| [Taskade](piece-taskade.md) | `@activepieces/piece-taskade` | 0.3.1 | 42 | `SECRET_TEXT` |
| [Tavily](piece-tavily.md) | `@activepieces/piece-tavily` | 0.3.2 | 8 | `SECRET_TEXT` |
| [Teable](piece-teable.md) | `@activepieces/piece-teable` | 0.3.2 | 22 | `OAUTH2`, `CUSTOM_AUTH` |
| [Teamhood](piece-teamhood.md) | `@activepieces/piece-teamhood` | 0.1.0 | 8 | `CUSTOM_AUTH` |
| [Teamleader](piece-teamleader.md) | `@activepieces/piece-teamleader` | 0.2.0 | 13 | `OAUTH2` |
| [Teamwork](piece-teamwork.md) | `@activepieces/piece-teamwork` | 0.1.7 | 18 | `CUSTOM_AUTH` |
| [Telegram Bot](piece-telegram-bot.md) | `@activepieces/piece-telegram-bot` | 0.9.1 | 41 | `SECRET_TEXT` |
| [Telnyx](piece-telnyx.md) | `@activepieces/piece-telnyx` | 0.1.0 | 3 | `SECRET_TEXT` |
| [Tenzo](piece-tenzo.md) | `@activepieces/piece-tenzo` | 0.0.8 | 0 | `OAUTH2`, `SECRET_TEXT`, `CUSTOM_AUTH` |
| [Text Helper](piece-text-helper.md) | `@activepieces/piece-text-helper` | 0.6.6 | 12 | none |
| [TextCortex AI](piece-textcortex-ai.md) | `@activepieces/piece-textcortex-ai` | 0.2.1 | 9 | `SECRET_TEXT` |
| [Thankster](piece-thankster.md) | `@activepieces/piece-thankster` | 0.1.8 | 1 | `SECRET_TEXT` |
| [TickTick](piece-ticktick.md) | `@activepieces/piece-ticktick` | 0.3.0 | 54 | `OAUTH2` |
| [Tidely](piece-tidely.md) | `@activepieces/piece-tidely` | 0.1.0 | 3 | `SECRET_TEXT` |
| [TidyCal](piece-tidycal.md) | `@activepieces/piece-tidycal` | 0.2.0 | 1 | `SECRET_TEXT` |
| [TimelinesAI](piece-timelines-ai.md) | `@activepieces/piece-timelines-ai` | 0.2.2 | 11 | `SECRET_TEXT` |
| [TimeOps](piece-time-ops.md) | `@activepieces/piece-time-ops` | 0.1.0 | 6 | `SECRET_TEXT` |
| [Tiny Talk AI](piece-tiny-talk-ai.md) | `@activepieces/piece-tiny-talk-ai` | 0.1.8 | 1 | `SECRET_TEXT` |
| [tl;dv](piece-tl-dv.md) | `@activepieces/piece-tl-dv` | 0.1.7 | 5 | `SECRET_TEXT` |
| [Todoist](piece-todoist.md) | `@activepieces/piece-todoist` | 0.6.1 | 47 | `OAUTH2` |
| [Todos](piece-todos.md) | `@activepieces/piece-todos` | 0.0.17 | 3 | none |
| [Toggl Track](piece-toggl-track.md) | `@activepieces/piece-toggl-track` | 0.2.1 | 36 | `SECRET_TEXT`, `CUSTOM_AUTH` |
| [Total CMS](piece-totalcms.md) | `@activepieces/piece-totalcms` | 1.0.1 | 31 | `CUSTOM_AUTH` |
| [Trello](piece-trello.md) | `@activepieces/piece-trello` | 0.7.1 | 75 | `BASIC_AUTH` |
| [TrueLayer](piece-truelayer.md) | `@activepieces/piece-truelayer` | 0.2.1 | 39 | `OAUTH2` |
| [Trust](piece-trust.md) | `@activepieces/piece-trust` | 0.1.0 | 12 | `CUSTOM_AUTH` |
| [Twenty](piece-twenty.md) | `@activepieces/piece-twenty` | 0.1.1 | 8 | `CUSTOM_AUTH` |
| [Twilio](piece-twilio.md) | `@activepieces/piece-twilio` | 0.7.0 | 6 | `BASIC_AUTH` |
| [Twin Web Agent](piece-twin-labs.md) | `@activepieces/piece-twin-labs` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Twitch](piece-twitch.md) | `@activepieces/piece-twitch` | 0.1.0 | 1 | `OAUTH2` |
| [Twitter](piece-twitter.md) | `@activepieces/piece-twitter` | 0.5.1 | 3 | `CUSTOM_AUTH` |
| [Typeform](piece-typeform.md) | `@activepieces/piece-typeform` | 0.6.2 | 28 | `OAUTH2` |
| [Typefully](piece-typefully.md) | `@activepieces/piece-typefully` | 0.3.2 | 9 | `SECRET_TEXT` |
| [Umami](piece-umami.md) | `@activepieces/piece-umami` | 0.3.1 | 7 | `CUSTOM_AUTH`, `SECRET_TEXT` |
| [Upgrade.chat](piece-upgradechat.md) | `@activepieces/piece-upgradechat` | 0.1.6 | 6 | `CUSTOM_AUTH` |
| [UptimeRobot](piece-uptimerobot.md) | `@activepieces/piece-uptimerobot` | 0.0.5 | 5 | `SECRET_TEXT` |
| [Uscreen](piece-uscreen.md) | `@activepieces/piece-uscreen` | 0.2.0 | 3 | `SECRET_TEXT` |
| [UXsniff](piece-uxsniff.md) | `@activepieces/piece-uxsniff` | 0.1.0 | 1 | `SECRET_TEXT` |
| [Vadoo AI](piece-vadoo-ai.md) | `@activepieces/piece-vadoo-ai` | 0.1.7 | 4 | `SECRET_TEXT` |
| [ValidatedMails](piece-validatedmails.md) | `@activepieces/piece-validatedmails` | 0.1.1 | 2 | `SECRET_TEXT` |
| [Valyu](piece-valyu.md) | `@activepieces/piece-valyu` | 0.1.0 | 7 | `SECRET_TEXT` |
| [Vapi](piece-vapi.md) | `@activepieces/piece-vapi` | 0.1.0 | 4 | `SECRET_TEXT` |
| [VBOUT](piece-vbout.md) | `@activepieces/piece-vbout` | 0.1.7 | 10 | `SECRET_TEXT` |
| [Vercel](piece-vercel.md) | `@activepieces/piece-vercel` | 0.1.1 | 6 | `CUSTOM_AUTH` |
| [Vero](piece-vero.md) | `@activepieces/piece-vero` | 0.1.7 | 7 | `SECRET_TEXT` |
| [VideoAsk](piece-videoask.md) | `@activepieces/piece-videoask` | 0.2.0 | 6 | `OAUTH2` |
| [VidLab7](piece-vidlab7.md) | `@activepieces/piece-vidlab7` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Vidnoz](piece-vidnoz.md) | `@activepieces/piece-vidnoz` | 0.0.8 | 2 | `SECRET_TEXT` |
| [Village](piece-village.md) | `@activepieces/piece-village` | 0.4.5 | 40 | `SECRET_TEXT` |
| [Vimeo](piece-vimeo.md) | `@activepieces/piece-vimeo` | 0.2.1 | 5 | `OAUTH2` |
| [Visible](piece-visible.md) | `@activepieces/piece-visible` | 0.0.9 | 4 | `SECRET_TEXT` |
| [VLM Run](piece-vlm-run.md) | `@activepieces/piece-vlm-run` | 0.2.0 | 6 | `SECRET_TEXT` |
| [VoIPstudio](piece-voipstudio.md) | `@activepieces/piece-voipstudio` | 0.2.0 | 6 | `SECRET_TEXT` |
| [Vouchery](piece-vouchery-io.md) | `@activepieces/piece-vouchery-io` | 0.1.0 | 4 | `SECRET_TEXT` |
| [VTEX](piece-vtex.md) | `@activepieces/piece-vtex` | 0.3.0 | 17 | `CUSTOM_AUTH` |
| [Vtiger](piece-vtiger.md) | `@activepieces/piece-vtiger` | 1.5.1 | 32 | `CUSTOM_AUTH` |
| [Wafeq](piece-wafeq.md) | `@activepieces/piece-wafeq` | 0.1.0 | 15 | `SECRET_TEXT` |
| [WaitWhile](piece-waitwhile.md) | `@activepieces/piece-waitwhile` | 0.1.0 | 5 | `SECRET_TEXT` |
| [Wayfront](piece-wayfront.md) | `@activepieces/piece-wayfront` | 0.0.5 | 11 | `CUSTOM_AUTH` |
| [Wealthbox](piece-wealthbox.md) | `@activepieces/piece-wealthbox` | 0.1.6 | 11 | `SECRET_TEXT` |
| [Webflow](piece-webflow.md) | `@activepieces/piece-webflow` | 0.3.0 | 13 | `OAUTH2` |
| [Webhook](piece-webhook.md) | `@activepieces/piece-webhook` | 0.1.42 | 2 | none |
| [Webling](piece-webling.md) | `@activepieces/piece-webling` | 0.1.6 | 1 | `CUSTOM_AUTH` |
| [WebScraping AI](piece-webscraping-ai.md) | `@activepieces/piece-webscraping-ai` | 0.2.0 | 19 | `SECRET_TEXT` |
| [Wedof](piece-wedof.md) | `@activepieces/piece-wedof` | 1.4.8 | 45 | `SECRET_TEXT` |
| [Weekdone](piece-week-done.md) | `@activepieces/piece-week-done` | 0.1.0 | 14 | `OAUTH2` |
| [Weekdone](piece-weekdone.md) | `@activepieces/piece-weekdone` | 0.1.0 | 5 | `OAUTH2` |
| [WhatConverts](piece-what-converts.md) | `@activepieces/piece-what-converts` | 0.1.7 | 4 | `CUSTOM_AUTH` |
| [Whatsable](piece-whatsable.md) | `@activepieces/piece-whatsable` | 0.1.7 | 1 | `SECRET_TEXT` |
| [WhatsApp Business](piece-whatsapp.md) | `@activepieces/piece-whatsapp` | 1.0.1 | 23 | `CUSTOM_AUTH` |
| [WhatsScale](piece-whatsscale.md) | `@activepieces/piece-whatsscale` | 1.1.0 | 56 | `SECRET_TEXT` |
| [Wistia](piece-wistia.md) | `@activepieces/piece-wistia` | 0.1.0 | 8 | `SECRET_TEXT` |
| [Wonderchat](piece-wonderchat.md) | `@activepieces/piece-wonderchat` | 0.1.7 | 4 | `SECRET_TEXT` |
| [WooCommerce](piece-woocommerce.md) | `@activepieces/piece-woocommerce` | 0.4.1 | 55 | `CUSTOM_AUTH` |
| [Woodpecker](piece-woodpecker.md) | `@activepieces/piece-woodpecker` | 0.1.0 | 6 | `SECRET_TEXT` |
| [Wootric](piece-wootric.md) | `@activepieces/piece-wootric` | 0.1.6 | 1 | `OAUTH2` |
| [WordPress](piece-wordpress.md) | `@activepieces/piece-wordpress` | 0.7.1 | 35 | `CUSTOM_AUTH` |
| [Workable](piece-workable.md) | `@activepieces/piece-workable` | 0.2.1 | 7 | `SECRET_TEXT` |
| [Workday](piece-workday.md) | `@activepieces/piece-workday` | 0.3.0 | 25 | `OAUTH2`, `CUSTOM_AUTH` |
| [Wrike](piece-wrike.md) | `@activepieces/piece-wrike` | 0.2.0 | 9 | `OAUTH2` |
| [Writesonic](piece-writesonic-bulk.md) | `@activepieces/piece-writesonic-bulk` | 0.2.0 | 11 | `SECRET_TEXT` |
| [Wufoo](piece-wufoo.md) | `@activepieces/piece-wufoo` | 0.2.0 | 5 | `CUSTOM_AUTH` |
| [Xero](piece-xero.md) | `@activepieces/piece-xero` | 0.8.1 | 58 | `OAUTH2` |
| [XML](piece-xml.md) | `@activepieces/piece-xml` | 0.2.1 | 3 | none |
| [Xquik](piece-xquik.md) | `@activepieces/piece-xquik` | 0.1.1 | 7 | `SECRET_TEXT` |
| [YouCanBookMe](piece-youcanbookme.md) | `@activepieces/piece-youcanbookme` | 0.2.0 | 3 | `SECRET_TEXT` |
| [Youform](piece-youform.md) | `@activepieces/piece-youform` | 0.1.8 | 0 | `SECRET_TEXT` |
| [YouTrack](piece-youtrack.md) | `@activepieces/piece-youtrack` | 0.2.1 | 19 | `CUSTOM_AUTH` |
| [YouTube](piece-youtube.md) | `@activepieces/piece-youtube` | 0.8.1 | 33 | `OAUTH2` |
| [Zendesk](piece-zendesk.md) | `@activepieces/piece-zendesk` | 0.5.1 | 117 | `CUSTOM_AUTH`, `OAUTH2` |
| [Zendesk-sell](piece-zendesk-sell.md) | `@activepieces/piece-zendesk-sell` | 0.2.1 | 12 | `CUSTOM_AUTH` |
| [Zeplin](piece-zeplin.md) | `@activepieces/piece-zeplin` | 0.1.0 | 6 | `SECRET_TEXT` |
| [ZeroBounce](piece-zerobounce.md) | `@activepieces/piece-zerobounce` | 0.1.7 | 1 | `SECRET_TEXT` |
| [Zoho Bookings](piece-zoho-bookings.md) | `@activepieces/piece-zoho-bookings` | 0.1.8 | 5 | `OAUTH2` |
| [Zoho Books](piece-zoho-books.md) | `@activepieces/piece-zoho-books` | 0.2.0 | 1 | `OAUTH2` |
| [Zoho Campaigns](piece-zoho-campaigns.md) | `@activepieces/piece-zoho-campaigns` | 0.2.2 | 11 | `OAUTH2` |
| [Zoho CRM](piece-zoho-crm.md) | `@activepieces/piece-zoho-crm` | 0.4.1 | 45 | `OAUTH2` |
| [Zoho Desk](piece-zoho-desk.md) | `@activepieces/piece-zoho-desk` | 0.2.2 | 4 | `OAUTH2` |
| [Zoho Invoice](piece-zoho-invoice.md) | `@activepieces/piece-zoho-invoice` | 0.2.2 | 1 | `OAUTH2` |
| [Zoho Mail](piece-zoho-mail.md) | `@activepieces/piece-zoho-mail` | 0.2.2 | 8 | `OAUTH2` |
| [Zoo](piece-zoo.md) | `@activepieces/piece-zoo` | 0.1.8 | 81 | `SECRET_TEXT` |
| [Zoom](piece-zoom.md) | `@activepieces/piece-zoom` | 0.9.1 | 12 | `OAUTH2` |
| [Zuora](piece-zuora.md) | `@activepieces/piece-zuora` | 0.1.6 | 4 | `CUSTOM_AUTH` |
