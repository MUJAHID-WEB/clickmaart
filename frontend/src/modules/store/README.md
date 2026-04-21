# Store Module

Responsibilities:

- retailer storefront configuration
- admin public store configuration
- domain-aware storefront rendering
- store-level product visibility and pricing rules
- public storefront route components such as homepage entry views

Current App Router coverage:

- shared tenant-aware storefront shell for:
  - homepage
  - catalog
  - product details
  - cart
  - checkout
  - order confirmation
  - about
  - contact
- admin public storefront preview routes
- retailer public storefront preview routes
- server-side storefront snapshot resolution from tenant headers
- admin store administration routes at:
  - `/admin/stores`
  - `/admin/stores/{id}`
