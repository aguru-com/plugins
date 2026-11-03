# Crypto

Generate random passwords and hash existing text

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-crypto'
  version: '0.0.29'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `hash-text`

**Text to Hash.** Computes a one-way cryptographic digest of a text string as a hex value, with the algorithm chosen from MD5, SHA256, SHA512 or SHA3-512. Pick this for checksums, fingerprints or de-duplication keys; use Generate HMAC Signature when the digest must be keyed with a shared secret, and Base64 Encode when you need reversible encoding instead of a hash. Requires the text plus an algorithm; pure computation and idempotent, since identical input always yields the same digest.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `method` | string | yes |  | Method. The hashing algorithm to use. One of `"md5"`, `"sha256"`, `"sha512"`, `"sha3-512"`. |
| `text` | string | yes |  | Text. The text to be hashed. |

### `hmac-signature`

**Generate HMAC Signature.** Computes a keyed HMAC digest of a text string with a secret key, selecting the hash algorithm and how the secret key itself is interpreted (UTF-8, hex or base64). Pick this to sign or verify webhook payloads and API requests that use a shared secret; use Text to Hash for an unkeyed digest and Generate RSA Signature for asymmetric private-key signing. The secret-key encoding must match how the key was issued or the signature will not match; pure computation and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `secretKey` | string | yes |  | Secret key. The secret key to encrypt. |
| `secretKeyEncoding` | string | yes |  | Secret key encoding. The secret key encoding to use. One of `"utf-8"`, `"hex"`, `"base64"`. |
| `method` | string | yes |  | Method. The hashing algorithm to use. One of `"md5"`, `"sha256"`, `"sha512"`. |
| `text` | string | yes |  | Text. The text to be hashed and encrypted. |
| `outputEncoding` | string | no | `"hex"` | Output Encoding. The encoding of the output signature. One of `"hex"`, `"base64"`. |

### `rsa-signature`

**Generate RSA Signature.** Signs a text payload with an RSA private key in PEM format (PKCS#1 or PKCS#8), hashing with SHA-256, SHA-384 or SHA-512. Pick this for asymmetric request signing where the verifier holds only the public key; use Generate HMAC Signature when both sides share one symmetric secret, and Text to Hash for a plain unkeyed digest. Requires the private key plus its passphrase if the key is encrypted; signing uses deterministic PKCS#1 v1.5 padding, so it is idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `privateKey` | string | yes |  | Private Key. The RSA private key in PEM format (PKCS#1 or PKCS#8) |
| `passphrase` | string | no |  | Passphrase. The passphrase protecting the private key, leave empty if it is not encrypted. |
| `method` | string | yes | `"sha256"` | Method. The hashing algorithm to use. One of `"sha256"`, `"sha384"`, `"sha512"`. |
| `text` | string | yes |  | Text. The text to be signed. |
| `outputEncoding` | string | no | `"base64"` | Output Encoding. The encoding of the output signature. One of `"base64"`, `"hex"`. |

### `generate-password`

**Generate Password.** Generates a random password of a given length, from either an alphanumeric character set or alphanumeric plus symbols. Pick this when a flow needs a fresh secret or random token to hand to a later step; it is a value generator, not a digest, so use Text to Hash or Generate HMAC Signature to hash existing text. Length must be 256 or less; not idempotent: every call returns a different password, so capture the output once and reuse it rather than re-running.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `length` | number | yes |  | Password Length. The length of the password (maximum 256) |
| `characterSet` | string | yes | `"alphanumeric"` | Character Set. The character set to use when generating the password. One of `"alphanumeric"`, `"alphanumeric-symbols"`. |

### `base64-decode`

**Base64 Decode.** Decodes a base64-encoded string back to plain text. Pick this to read a base64 field from an API response or header; use Base64 Encode for the opposite direction, and note that a digest from Text to Hash cannot be reversed this way. Requires a base64 text string rather than a binary file, and invalid base64 characters are silently dropped rather than raising an error; pure computation and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to be decoded. |

### `base64-encode`

**Base64 Encode.** Encodes a plain-text string into base64. Pick this when a downstream API, header or payload field requires base64 (e.g. a Basic-auth credential); use Base64 Decode to reverse it, or Text to Hash if you need a one-way digest rather than reversible encoding. Accepts a text string only, not a binary file; pure computation and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to be encoded. |

### `openpgpEncrypt`

**OpenPGP Encrypt.** Encrypts a binary file with an OpenPGP public key in ASCII-armor format and writes out an armored .pgp file. Pick this to protect an attachment before handing it to a recipient who holds the matching private key; this piece offers no decrypt counterpart. Requires a valid armored public key, and an unreadable key is reported as a failed result rather than raising an error; not idempotent: each call derives a fresh random session key, so the same input produces different ciphertext.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to encrypt. Files are not supported; an action that needs one fails. |
| `publicKey` | string | yes |  | Public Key. The PGP public key in ASCII armor format. |

Output fields:

- `success`: Success (boolean)
- `filename`: File Name
- `file`: Encrypted File (url)
- `error`: Error
