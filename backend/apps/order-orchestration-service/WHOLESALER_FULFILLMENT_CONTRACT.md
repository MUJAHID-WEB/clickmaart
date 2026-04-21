# Wholesaler Fulfillment Contract

This draft covers the Phase 4 wholesaler order workflow from pending
fulfillment to shipment and payment completion.

## Purpose

- list wholesaler orders by operational queue
- allow tracking upload for shipped orders
- preserve masked customer visibility rules
- expose payment-done readiness for settlement workflows

## Draft Endpoints

- `GET /api/wholesaler/orders?status=pending|shipped|payment-done`
- `GET /api/wholesaler/orders/{orderId}`
- `POST /api/wholesaler/orders/{orderId}/ship`
- `PATCH /api/wholesaler/orders/{orderId}/tracking`

## Response Shape

- order id
- retailer name
- masked customer identifier
- item count
- cod amount
- shipment destination
- tracking value
- latest updated timestamp
- queue status

## Workflow Notes

- pending orders become shipped after carrier data is attached
- shipped orders remain visible until admin-side receipt or settlement progression
- payment-done rows should feed payout eligibility in the payment service
