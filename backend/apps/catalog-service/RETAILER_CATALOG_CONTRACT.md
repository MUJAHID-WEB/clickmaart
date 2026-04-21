# Retailer Catalog Contract

This draft covers the Phase 5 retailer catalog management surface.

## Purpose

- expose retailer-visible catalog items by operational state
- preserve wholesale price, selling price, margin, and stock data
- support draft, live, and low-stock catalog workflows
- keep store assignment references visible for merchandising decisions

## Draft Endpoints

- `GET /api/retailer/catalog?status=live|draft|low-stock`
- `GET /api/retailer/catalog/{catalogItemId}`
- `PATCH /api/retailer/catalog/{catalogItemId}`
- `POST /api/retailer/catalog/{catalogItemId}/publish`
- `POST /api/retailer/catalog/{catalogItemId}/unpublish`

## Response Shape

- catalog item id
- product name
- category
- assigned store
- wholesale price
- selling price
- retailer margin
- stock count
- operational status
- updated timestamp
- merchandising note

## Validation Notes

- selling price must remain above wholesale price
- low-stock thresholds should stay configurable per store
- draft items should not appear on public storefront projections
