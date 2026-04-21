# Retailer Store Contract

This draft covers the Phase 5 retailer store management surface.

## Purpose

- list retailer storefronts and setup state
- expose domain, status, product assignment, and revenue summaries
- support setup-pending and active store workflows
- prepare tenant-aware store resolution for public storefront phases

## Draft Endpoints

- `GET /api/retailer/stores`
- `GET /api/retailer/stores/{storeId}`
- `POST /api/retailer/stores`
- `PATCH /api/retailer/stores/{storeId}`
- `POST /api/retailer/stores/{storeId}/products`
- `PATCH /api/retailer/stores/{storeId}/status`

## Response Shape

- store id
- store name
- domain or subdomain
- setup status
- assigned product count
- monthly order count
- revenue summary
- low-stock count
- store note

## Workflow Notes

- setup-pending stores should remain unavailable for customer checkout
- active stores should preserve store-specific pricing and product visibility
- later tenant middleware will use this service to resolve public store context
