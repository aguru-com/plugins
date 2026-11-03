# VTEX

Unified commerce platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vtex'
  version: '0.3.0'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **Host Url**: The VTEX store host (e.g `{{accountName}}.{{environment}}.com`)
> **App Key** and **App Token**: To get your app key and app token, follow the steps below:
> 1. Go to your vtex account on **Account Settings** -> **Account** -> **Security**
> 2. Click on **Generate access key and secret**
> 4. Copy the access key as your **App Key** and the secret is your **App Token**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hostUrl` | string | yes |  | Host Url. {accountName}.{environment}.com. |
| `appKey` | string | yes |  | App Key. VTEX App Key. |
| `appToken` | string | yes |  | App Token. VTEX App Token. |

## Actions

### `get-product-by-id`

**Get Product By ID.** Retrieve a single catalog product from a VTEX store by its numeric product ID. Use to look up product details when you already know the product ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | yes |  | Product ID. The product ID. |

### `create-product`

**Create New Product.** Create a new product in a VTEX store catalog, requiring name, title, description, and an existing brand ID and category ID. Optionally pass a product ID to set it explicitly. Not idempotent: each call creates a separate product. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Name` | string | yes |  | Name. |
| `Title` | string | yes |  | Title. |
| `Description` | string | yes |  | Description. |
| `BrandId` | number | yes |  | Brand ID. |
| `CategoryId` | number | yes |  | Category ID. |
| `LinkId` | string | no |  | Link ID. |
| `RefId` | string | no |  | Ref ID. |
| `Id` | number | no |  | Product ID. Set the product ID. |
| `IsVisible` | boolean | no |  | Is Visible. |
| `DescriptionShort` | string | no |  | Short Description. |
| `ReleaseDate` | string | no |  | Release Date. |
| `KeyWords` | string | no |  | Key Words. Similar words. |
| `IsActive` | boolean | no |  | Is Active. |
| `TaxCode` | string | no |  | Tax Code. |
| `MetaTagDescription` | string | no |  | Metatag description. |
| `ShowWithoutStock` | boolean | no |  | Show Without Stock. |
| `Score` | number | no |  | Score. |

### `Update-product`

**Update a Product.** Update an existing catalog product in a VTEX store, identified by its product ID. Requires the full set of core fields (name, title, description, brand ID, category ID, department ID) since it replaces the product record. Idempotent: repeating with the same input leaves the product in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | yes |  | Product ID. Set the product ID. |
| `Name` | string | yes |  | Name. |
| `Title` | string | yes |  | Title. |
| `Description` | string | yes |  | Description. |
| `BrandId` | number | yes |  | Brand ID. |
| `CategoryId` | number | yes |  | Category ID. |
| `DepartmentId` | number | yes |  | DepartmentId. |
| `LinkId` | string | no |  | Link ID. |
| `RefId` | string | no |  | Ref ID. |
| `BrandName` | string | no |  | Brand Name. |
| `IsVisible` | boolean | no |  | Is Visible. |
| `DescriptionShort` | string | no |  | Short Description. |
| `ReleaseDate` | string | no |  | Release Date. |
| `KeyWords` | string | no |  | Key Words. Similar words. |
| `IsActive` | boolean | no |  | Is Active. |
| `TaxCode` | string | no |  | Tax Code. |
| `MetaTagDescription` | string | no |  | Metatag description. |
| `ShowWithoutStock` | boolean | no |  | Show Without Stock. |
| `Score` | number | no |  | Score. |

### `get-brand-list`

**Get Brand List.** List all brands in a VTEX store catalog. Use to enumerate brands or to resolve a brand name to its ID before creating or updating products. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get-brand-by-id`

**Get Brand By ID.** Retrieve a single brand from a VTEX store catalog by its numeric brand ID. Use when you already know the brand ID and need its details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `BrandId` | number | yes |  | Brand ID. The Brand ID. |

### `create-brand`

**Create new Brand.** Create a new brand in a VTEX store catalog; only the brand name is required. Optionally pass a brand ID to set it explicitly. Not idempotent: each call creates a separate brand. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Name` | string | yes |  | Name. |
| `SiteTitle` | string | no |  | Site Title. |
| `LinkId` | string | no |  | Link ID. |
| `Id` | number | no |  | Brand ID. Set the brand ID. |
| `Text` | string | no |  | Text. |
| `MenuHome` | boolean | no |  | Menu Home. |
| `Keywords` | string | no |  | Keywords. Similar words. |
| `Active` | boolean | no |  | Active. |
| `Score` | number | no |  | Score. |

### `update-brand`

**Update Brand.** Update an existing brand in a VTEX store catalog, identified by its brand ID. Replaces the brand record, so all core fields (name, site title, link ID, text, menu home, keywords, active, score) must be supplied. Idempotent: repeating with the same input leaves the brand in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `Id` | number | yes |  | Brand ID. Set the brand ID. |
| `Name` | string | yes |  | Name. |
| `SiteTitle` | string | yes |  | Site Title. |
| `LinkId` | string | yes |  | Link ID. |
| `Text` | string | yes |  | Text. |
| `MenuHome` | boolean | yes |  | Menu Home. |
| `Keywords` | string | yes |  | Keywords. Similar words. |
| `Active` | boolean | yes |  | Active. |
| `Score` | number | yes |  | Score. |

### `delete-brand`

**Delete Brand.** Delete a brand from a VTEX store catalog by its numeric brand ID. Destructive and irreversible. Idempotent in effect: once the brand is gone, repeating leaves it absent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | number | yes |  | Brand ID. The Brand ID. |

### `get-category-by-id`

**Get Category.** Retrieve a VTEX store catalog category. Pass a category ID to fetch that single category, or omit it to fetch all categories. Use to look up a category or resolve a category ID needed when creating products. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `categoryId` | number | no |  | Category ID. The Category ID. |

### `get-sku-by-product-id`

**Get SKU By Product ID.** List the SKUs (product variations) associated with a given product in a VTEX store catalog, identified by the numeric product ID. Use to enumerate a product's variants. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | number | yes |  | Product ID. The Product ID. |

### `create-sku`

**Create New Sku.** Create a new SKU (product variation) in a VTEX store catalog, associated with an existing product ID. Requires the SKU name and packaging dimensions/weight. Optionally pass a SKU ID to set it explicitly. Not idempotent: each call creates a separate SKU. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ProductId` | number | yes |  | Product ID. ID of the product to be associated with this SKU. |
| `Name` | string | yes |  | SKU Name. Name the variation of the product. |
| `PackagedHeight` | number | yes |  | Package Height. |
| `PackagedLength` | number | yes |  | Package Length. |
| `PackagedWidth` | number | yes |  | Package Width. |
| `PackagedWeightKg` | number | yes |  | Package Weight (Kg). |
| `IsActive` | boolean | no |  | Is Active. |
| `IsKit` | boolean | no |  | Is Kit. |
| `Id` | number | no |  | Sku ID. Set the Sku ID. |

### `create-sku-file`

**Create New Sku File.** Attach an image file to an existing SKU in a VTEX store catalog, identified by the SKU ID, from a publicly accessible image URL. Requires the image URL, name, and whether it is the main image. Not idempotent: each call attaches another image to the SKU. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `SkuId` | number | yes |  | Sku ID. Set the Sku ID. |
| `Url` | string | yes |  | Image Url. |
| `Name` | string | yes |  | Image Name. |
| `IsMain` | boolean | yes |  | Is Main Image. |
| `Label` | string | no |  | Image Label. |
| `Text` | string | no |  | Image Name. General text of the image. |

### `get-client-list`

**Get Client List.** List all clients (customers) registered in the VTEX store master data. Use to enumerate customers. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get-client-by-id`

**Get Client By ID.** Retrieve a single client (customer) from the VTEX store master data by its client ID. Use when you already know the client ID and need its details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | number | yes |  | Client ID. The Client ID. |

### `get-order-by-id`

**Get Order By ID.** Retrieve a single order from the VTEX store order management system (OMS) by its order ID. Use when you already know the order ID and need its details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `OrderId` | number | yes |  | Order ID. The Order ID. |

### `get-order-list`

**Get Orders List.** List orders from the VTEX store order management system (OMS) created within a date range, specified as from/to year (required) plus optional month and day. Use to find orders over a period rather than by a single ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromYear` | number | yes |  | From (Year). |
| `toYear` | string | yes | `"2026"` | To (Year). |
| `fromMonth` | string | no | `"01"` | From (Month). |
| `toMonth` | string | no | `"12"` | To (Month). |
| `fromDay` | string | no | `"01"` | From (Day). |
| `toDay` | string | no | `"28"` | To (Day). |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |
