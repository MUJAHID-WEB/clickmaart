# Tenant Middleware Strategy

This folder holds the Phase 1 tenant and domain foundation for the App Router migration.

Current strategy:

- locale redirect stays active for `bn` and `en`
- middleware resolves whether the request is for:
  - `core`
  - `admin-store`
  - `retailer-store`
- request and response headers now carry tenant metadata so later store resolution can read:
  - `x-clickmaart-tenant-host`
  - `x-clickmaart-tenant-surface`
  - `x-clickmaart-tenant-key`
  - `x-clickmaart-locale`

Environment hooks:

- `CLICKMAART_ADMIN_STORE_HOSTS`
- `CLICKMAART_RETAILER_STORE_HOSTS`

Phase 6 update:

- shared public storefront routes now read tenant metadata and render core, admin-store, or retailer-store storefront framing
- preview routes exist so admin and retailer storefront behavior can be reviewed without relying on live domains
- the same tenant headers now act as the bridge into future public store data loading and API integration phases
