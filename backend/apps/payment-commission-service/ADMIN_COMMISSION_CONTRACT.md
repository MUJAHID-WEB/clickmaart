# Admin Commission Contract

This draft covers the Phase 7 admin commission oversight and payout release layer.

## Purpose

- expose platform commission, wholesaler payable, and retailer payable summaries
- support admin approval and processing of payout release decisions
- connect COD confirmation to settlement readiness
- keep payout reporting and audit-friendly state changes attached to each order

## Draft Endpoints

- `GET /api/admin/commission/overview`
- `GET /api/admin/commission/settlements?status=ready|pending-approval|processed|paid`
- `GET /api/admin/commission/settlements/{settlementId}`
- `POST /api/admin/commission/settlements/{settlementId}/approve-wholesaler`
- `POST /api/admin/commission/settlements/{settlementId}/approve-retailer`
- `POST /api/admin/commission/settlements/{settlementId}/process`
- `POST /api/admin/commission/settlements/{settlementId}/reject`

## Response Shape

- settlement id
- related order id
- gross order value
- platform commission amount
- wholesaler payable amount
- retailer profit amount
- retailer net payable amount
- COD state
- payout status
- release timestamp
- settlement note

## Rules

- platform commission remains fixed at 10%
- wholesaler and retailer payouts cannot move past `pending-approval` until COD and dispute checks pass
- retailer net payable remains `retailer profit - 10% of retailer profit`
- all release and rejection actions must emit audit and notification events
