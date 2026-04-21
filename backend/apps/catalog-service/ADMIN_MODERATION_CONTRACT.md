# Admin Moderation Contract

This draft covers the Phase 3 admin product moderation surface.

## Purpose

- list products by moderation status
- approve or reject submissions
- update basic product metadata before approval
- control admin store listing state
- preserve rejection notes and audit history

## Draft Endpoints

- `GET /api/admin/products?status=pending|approved|rejected`
- `GET /api/admin/products/{productId}`
- `PATCH /api/admin/products/{productId}`
- `POST /api/admin/products/{productId}/approve`
- `POST /api/admin/products/{productId}/reject`
- `POST /api/admin/products/{productId}/re-approve`
- `POST /api/admin/products/{productId}/store-listings`
- `PATCH /api/admin/products/{productId}/store-listings/{listingId}`

## Product Response Shape

- product id
- product name
- category
- wholesaler source
- base price
- stock
- moderation status
- rejection reason when applicable
- listing state
- markup percentage

## Validation Notes

- markup must stay between 5% and 50%
- rejection requests must include a reason
- listing actions should synchronize inventory through later integration work
