# Admin Public Storefront Contract

This draft covers the Phase 6 admin public storefront surface.

## Purpose

- expose admin-curated public storefront metadata
- provide featured assortment, pricing, and campaign blocks for the admin store
- keep public homepage, catalog, cart, checkout, and confirmation routes aligned
- support one shared public commerce shell on top of admin-owned store context

## Draft Endpoints

- `GET /api/public/admin-store`
- `GET /api/public/admin-store/products`
- `GET /api/public/admin-store/products/{productId}`
- `GET /api/public/admin-store/campaigns`

## Response Shape

- storefront id
- store name
- domain
- hero campaign data
- featured collection blocks
- visible catalog items
- pricing summary
- support contact data

## Notes

- admin public store stays platform-managed
- public cart and checkout should reuse the shared commerce flow
- tenant context should identify this surface as `admin-store`
