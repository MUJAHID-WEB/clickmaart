# Full Order Management Contract

This draft covers the Phase 7 multi-party order orchestration layer.

## Purpose

- connect admin, wholesaler, retailer, and customer order surfaces to one lifecycle
- expose warehouse receipt, customer dispatch, COD confirmation, and dispute handling
- keep delivery and settlement services attached to the same order aggregate
- support both storefront orders and external marketing orders without separate screens

## Draft Endpoints

- `GET /api/admin/orders?status=pending|shipped|received|out-for-delivery|payment-done`
- `GET /api/admin/orders/{orderId}`
- `POST /api/admin/orders/{orderId}/stage-transitions`
- `POST /api/admin/orders/{orderId}/warehouse-receipts`
- `POST /api/admin/orders/{orderId}/customer-dispatch`
- `POST /api/admin/orders/{orderId}/damage-reports`
- `POST /api/admin/orders/{orderId}/cod-confirmations`

## Response Shape

- order id
- order source
- retailer summary
- wholesaler summary
- customer summary with role-based masking rules
- lifecycle stage
- warehouse receipt state
- inbound and outbound tracking references
- COD state
- settlement readiness
- dispute and damage flags

## Workflow Notes

- lifecycle remains `pending -> shipped -> received -> out-for-delivery -> payment-done`
- customer contact stays masked for wholesaler-facing reads
- warehouse receipt must be logged before admin-to-customer dispatch becomes available
- damage reports require evidence payloads before payout release can continue
