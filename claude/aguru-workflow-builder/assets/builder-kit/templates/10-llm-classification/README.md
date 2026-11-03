# 10 LLM classification

A complete first LLM project: save a provider key, pick the model, deploy the
project, and classify a message. It needs no email connector, attachment or
Acme API. Start here before adding the document and SCM steps in template 09.

## Save the provider key

In the org where you will run the project, open **Settings → API & HTTP
Credentials** and add a credential:

| Field               | Value                                                    |
| ------------------- | -------------------------------------------------------- |
| Key                 | `acme-anthropic-key`                                     |
| Authentication Type | API Key                                                  |
| API Key             | Your Anthropic provider key, entered only in the product |
| Header Name         | Leave blank                                              |

This is the key issued by the model provider. `AGURU_API_KEY` is a separate
Aguru access token used to deploy and inspect runs; it does not authenticate
the model. Setting a provider key in the agent's shell does not configure an
Aguru model.

## Pick the model

The block runs with `model: '${config.classifierModel}'`, an `LLM_MODEL`
field in the manifest's `env` tier: one value, set in the project's settings,
for every installation. Its default:

```yaml
provider: anthropic
model: claude-haiku-4-5
max-tokens: 256
api-key: acme-anthropic-key # the credential's key, never its value
```

The model id is an example. If this deployment does not offer it, choose an
available text model and a key for that provider. Other settings:
`temperature` (default `0`), `thinking-budget`, `reasoning-effort`.

Copy this folder into `message-classifier/`, leaving out `test/`. Rename the
project and workflow refs with your own project prefix and use that workflow
ref when starting runs. Change the default in `manifest.yaml` before the first
deploy; once the field is saved in the project's settings, edit it there, since
a changed default does not overwrite a saved value.

`api-key` is looked up when the block runs, in the org that runs it and then
its ancestors. The manifest does not create the credential. Keep the system
prompt, task prompt and output schema in the workflow.

## Deploy and run

From the builder workspace, with its Aguru connection configured as described
in [the deployment guide](../../docs/deploy.md):

```sh
pnpm check message-classifier/manifest.yaml message-classifier/acme-classify-message.yaml
pnpm exec aguru project create message-classifier
pnpm exec aguru project deploy message-classifier
```

Use the workflow id and your own org's installation id returned by deployment
and project creation to start it with `POST /api/executions/start-enhanced`:

```json
{
  "workflowDefinitionId": "<deployed workflow id>",
  "installationId": "<your installation id>",
  "params": { "message": "Please move the engineer visit to Friday morning." }
}
```

Read `GET /api/executions/<execution id>/history`. Expect the
`classify-message` input to carry the `classifierModel` settings and the
supplied message, its output to contain `category: scheduling`, and the
completed run's result to be `{ "category": "scheduling" }`.

Run these inputs too:

| Message                                                      | Expected category |
| ------------------------------------------------------------ | ----------------- |
| Please send the current safety certificate for job JOB-0042. | `certificate`     |
| Thank you for your help.                                     | `other`           |

The template tests mock the provider and verify that project config and
message params reach the model, and that its output is projected to the public
result. They do not prove model quality or credentials. Complete these live
runs before calling the project verified. If the block holds on a key, billing or
model error, fix the credential or `classifierModel` and retry on the
Approvals page.

**Change first:** the prompt, output schema, and `classifierModel` for your
use case. Keep provider credentials in the org's credential store.
