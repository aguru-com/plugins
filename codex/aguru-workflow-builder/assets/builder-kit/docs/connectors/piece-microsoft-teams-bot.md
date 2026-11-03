# Microsoft Teams Bot

Send messages to Teams channels from the Activepieces Bot, once it has been installed into a team.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-teams-bot'
  version: '0.1.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Register a **single-tenant** Azure Bot in your own Microsoft tenant, then paste its credentials below. Microsoft deprecated multi-tenant bots, so the bot must live in the **same tenant** you use Microsoft Teams from. Sign in to the [Azure Portal](https://portal.azure.com) with an admin of that tenant.
>
> 📖 **[Full step-by-step guide (bot setup + packaging the Teams app)](https://github.com/activepieces/activepieces/blob/main/packages/pieces/community/microsoft-teams-bot/teams-app/README.md)**: the steps below are the short version.
>
> **1. Create the Azure Bot**
> - Create an **Azure Bot** resource → **Pricing tier: Free (F0)** → **Type of App: Single Tenant** → **Create new Microsoft App ID**. This creates the App Registration.
>
> **2. Enable the Teams channel**
> - On the Bot resource → **Channels** → add **Microsoft Teams** and Apply. (Without this, installing the app fails.)
>
> **3. Set the messaging endpoint**
> On the Bot resource → **Configuration** → **Messaging endpoint**, paste:
>
> ```text
> {{frontendUrl}}/api/v1/app-events/microsoft-teams-bot
> ```
>
> Azure requires a messaging endpoint. The app **must** be installed in the team for sending to work.
>
> **4. Create a secret**
> - App Registration → **Certificates & secrets** → **New client secret** → copy the **Value** (not the Secret ID).
>
> **5. Grant Graph permissions (for the Team & Channel dropdowns)**
> - App Registration → **API permissions** → **Add → Microsoft Graph → Application permissions** → add `Team.ReadBasic.All` and `Channel.ReadBasic.All` → **Grant admin consent** (both must show green).
>
> **6. Install the bot in your team**
> - Package your Teams app (`manifest.json` `botId` = this App ID) and add it to the team/channel you want to post to. Sending fails until the bot is a member of the team.
>
> Then fill in:
> - **Bot App ID**: the Application (client) ID
> - **Bot App Secret**: the client secret **Value**
> - **Tenant ID**: your Directory (tenant) ID

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | Bot App ID. |
| `appSecret` | string | yes |  | Bot App Secret. |
| `tenantId` | string | yes |  | Tenant ID. Your Directory (tenant) ID. Must be the same tenant you use Microsoft Teams from. The bot is single-tenant and cannot post into another tenant. |

## Actions

### `microsoft_teams_send_channel_message_as_bot`

**Send Channel Message as Bot.** Sends a message to a Teams channel as the Activepieces Bot, instead of as the connected user. Requires the bot to already be installed in the target team (via the Teams app store or a sideloaded package). Each call posts a new message, so retries duplicate. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `channelId` | string | yes |  | Channel ID. A value the product loads from the provider, such as an id; write the value itself. |
| `contentType` | string | yes | `"text"` | Content Type. One of `"text"`, `"html"`. |
| `content` | string | yes |  | Message. |
