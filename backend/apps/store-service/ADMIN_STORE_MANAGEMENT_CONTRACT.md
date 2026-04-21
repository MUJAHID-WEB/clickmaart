# Admin Store Management Contract

This draft covers the Phase 7 admin store management and storefront oversight layer.

## Purpose

- manage the admin-owned public store and oversee retailer storefront readiness from one service boundary
- expose domain health, merchandising readiness, and operational store metrics
- support DNS validation and storefront launch gating
- keep store-level stock, order, and catalog health aligned with reporting workflows

## Draft Endpoints

- `GET /api/admin/stores`
- `GET /api/admin/stores/{storeId}`
- `PATCH /api/admin/stores/{storeId}`
- `POST /api/admin/stores/{storeId}/validate-domain`
- `POST /api/admin/stores/{storeId}/products/sync`
- `PATCH /api/admin/stores/{storeId}/status`

## Response Shape

- store id
- store name
- owner type
- domain summary
- DNS health
- assigned product count
- 30-day order count
- revenue summary
- low-stock alert count
- store note

## Workflow Notes

- stores with `dns-pending` status should remain blocked from public launch
- admin-owned and retailer-owned storefronts should share one operational read model
- store metrics should be queryable by the report-analytics service without reshaping the payload
- low-stock events should fan out into notification automation
