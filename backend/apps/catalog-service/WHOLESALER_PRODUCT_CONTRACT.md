# Wholesaler Product Contract

This draft covers the Phase 4 wholesaler product management workflows.

## Purpose

- create product submissions
- edit draft or moderated products
- list products by moderation status
- expose admin review notes
- keep stock and product media references available

## Draft Endpoints

- `GET /api/wholesaler/products?status=pending|approved|rejected`
- `POST /api/wholesaler/products`
- `GET /api/wholesaler/products/{productId}`
- `PATCH /api/wholesaler/products/{productId}`
- `POST /api/wholesaler/products/{productId}/media`
- `GET /api/wholesaler/products/{productId}/moderation`

## Response Shape

- product id
- product name
- category
- base price
- stock
- submission timestamp
- moderation status
- admin moderation note
- listing state when approved

## Validation Notes

- product submissions must include required media and a valid price
- stock counts should remain non-negative
- rejected products must keep the latest admin note visible for resubmission
