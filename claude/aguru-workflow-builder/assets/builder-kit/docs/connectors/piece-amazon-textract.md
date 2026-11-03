# AWS Textract

Extract text, forms, tables, signatures, and structured data from documents using AWS Textract.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-amazon-textract'
  version: '0.4.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: AWS Textract (Access Key)

> Authenticate with AWS using your Access Key ID and Secret Access Key. The IAM user or role must have permissions for AWS Textract (e.g., the `AmazonTextractFullAccess` managed policy).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessKeyId` | string | yes |  | Access Key ID. Your AWS access key ID. Found in AWS IAM Console → Users → Security credentials. |
| `secretAccessKey` | string | yes |  | Secret Access Key. Your AWS secret access key. Only shown once when you create the access key — store it safely. |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"ap-south-1"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-west-3"`, `"eu-south-2"`, `"us-gov-east-1"`, `"us-gov-west-1"`. |

### `OIDC`: AWS Textract (IAM Role / OIDC)

> Connect AWS Textract using an IAM Role via OIDC. No permanent keys required.
>
> Activepieces acts as an OIDC identity provider. AWS trusts this provider and issues temporary credentials via `AssumeRoleWithWebIdentity`.
>
> **Setup steps:**
> 1. In AWS IAM → Identity Providers → Create Provider:
> - Provider type: **OpenID Connect**
> - Provider URL: `{{frontendUrl}}`
> - Audience: `sts.amazonaws.com`
>
> > AWS fetches `{{frontendUrl}}/.well-known/openid-configuration` to discover the OIDC metadata. If your frontend and API run on different domains, make sure the API server is reachable at `{{frontendUrl}}` (or that your frontend proxies `/.well-known/*` to the API), otherwise `AssumeRoleWithWebIdentity` will fail.
> 2. Create an IAM Role with this trust policy:
> ```json
> {
> "Version": "2012-10-17",
> "Statement": [{
> "Effect": "Allow",
> "Principal": { "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/{{frontendHost}}" },
> "Action": "sts:AssumeRoleWithWebIdentity",
> "Condition": {
> "StringEquals": {
> "{{frontendHost}}:aud": "sts.amazonaws.com"
> },
> "StringLike": {
> "{{frontendHost}}:sub": "platform:{{platformId}}:project:{{projectId}}"
> }
> }
> }]
> }
> ```
> For an AWS GovCloud (US) region, use `arn:aws-us-gov:iam::` instead of `arn:aws:iam::` in the `Federated` principal.
> 3. Attach Textract permissions to the role (e.g. the `AmazonTextractFullAccess` policy), plus `s3:GetObject` on any bucket you read documents from, and paste the **Role ARN** below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roleArn` | string | yes |  | Role ARN. The ARN of the IAM role to assume (e.g. arn:aws:iam::123456789012:role/MyRole). |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"ap-south-1"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-west-3"`, `"eu-south-2"`, `"us-gov-east-1"`, `"us-gov-west-1"`. |

## Actions

### `analyze-document`

**Analyze Document.** Synchronously analyze a single-page document with AWS Textract to pull out forms (key-value pairs), tables, and signatures, optionally answering natural-language queries about it. Choose it when you need structured layout extraction rather than just raw text (use Detect Document Text for plain text only) and the document is one page. The source can be an uploaded file or an S3 object in JPEG, PNG, or single-page PDF/TIFF format; for multi-page PDFs use the S3 multi-page action. Idempotent: it is a stateless read-only inference that returns the same result for the same input. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | yes | `"file"` | Document Source. Choose how to provide the document — upload a file directly or reference one already in S3. One of `"file"`, `"s3"`. |
| `document` | object | yes |  | Document. An object whose fields depend on other inputs; the product shows them. |
| `featureTypes` | array | yes | `["TABLES","FORMS"]` | Feature Types. Select what to extract. TABLES extracts table data. FORMS extracts key-value pairs. SIGNATURES detects signatures. One of `"TABLES"`, `"FORMS"`, `"SIGNATURES"`. |
| `queries` | array | no |  | Queries. Optional. Natural-language questions to ask about the document (e.g. "What is the patient name?"). When provided, the QUERIES feature is automatically enabled. |

### `detect-document-text`

**Detect Document Text.** Synchronously OCR a single-page document with AWS Textract and return its plain text content (lines and words), without forms, tables, or signatures. Choose it when you only need the raw text — it is faster and cheaper than Analyze Document. The source can be an uploaded file or an S3 object in JPEG, PNG, or single-page PDF/TIFF format. Idempotent: it is a stateless read-only inference that returns the same result for the same input. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | yes | `"file"` | Document Source. Choose how to provide the document — upload a file directly or reference one already in S3. One of `"file"`, `"s3"`. |
| `document` | object | yes |  | Document. An object whose fields depend on other inputs; the product shows them. |

### `analyze-expense`

**Analyze Expense.** Synchronously analyze a receipt or invoice with AWS Textract to extract structured financial fields such as vendor name, totals, tax, dates, and line items. Choose it specifically for expense documents rather than the general Analyze Document action. The source can be an uploaded file or an S3 object in JPEG, PNG, or single-page PDF/TIFF format. Idempotent: it is a stateless read-only inference that returns the same result for the same input. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | yes | `"file"` | Document Source. Choose how to provide the document — upload a file directly or reference one already in S3. One of `"file"`, `"s3"`. |
| `document` | object | yes |  | Document. An object whose fields depend on other inputs; the product shows them. |

### `analyze-id`

**Analyze ID Document.** Synchronously analyze a US identity document (driver's license or passport) with AWS Textract to extract fields like name, date of birth, ID number, and expiry date. Choose it specifically for ID documents rather than the general Analyze Document action. The source can be an uploaded file or an S3 object, but only JPEG and PNG are accepted here — PDF and TIFF are not supported. Idempotent: it is a stateless read-only inference that returns the same result for the same input. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source` | string | yes | `"file"` | Document Source. Choose how to provide the document — upload a file directly or reference one already in S3. One of `"file"`, `"s3"`. |
| `document` | object | yes |  | Document. An object whose fields depend on other inputs; the product shows them. |

### `analyze-document-async`

**Analyze Document from S3 (Multi-Page).** Analyze a multi-page (or single-page) document stored in S3 with AWS Textract, extracting forms, tables, signatures, and layout structure, optionally answering natural-language queries. Choose it for multi-page PDFs or TIFFs that the synchronous Analyze Document action cannot handle; the document must already be in S3 (no direct upload). It starts an async Textract job and blocks while polling until results are ready (up to a 5-minute timeout), then returns all pages. Effectively idempotent: it is a read-only extraction, and supplying the optional deduplication token makes AWS return the original job result if the same token is reused within 5 minutes. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `s3Bucket` | string | yes |  | S3 Bucket. The name of the S3 bucket containing your document. |
| `s3Key` | string | yes |  | S3 File Path. The path to the file in your S3 bucket (e.g. "reports/contract.pdf"). Supports JPEG, PNG, PDF, and TIFF. Multi-page PDFs and TIFFs are fully supported. |
| `featureTypes` | array | yes | `["TABLES","FORMS"]` | What to Extract. Choose what to extract. Tables: structured grid data. Forms: labelled fields and their values (e.g. "Name: John"). Signatures: signature locations. Layout: document structure like titles, headers, and sections. One of `"TABLES"`, `"FORMS"`, `"SIGNATURES"`, `"LAYOUT"`. |
| `queries` | array | no |  | Questions to Ask (Optional). Ask plain-English questions about the document and get direct answers (e.g. "What is the invoice total?" or "What is the patient name?"). |
| `clientRequestToken` | string | no |  | Deduplication Token (Optional). A unique string (e.g. "invoice-2024-001") to prevent accidentally running the same job twice. If you submit the same token again within 5 minutes, AWS returns the original job result instead of starting a new one. |
