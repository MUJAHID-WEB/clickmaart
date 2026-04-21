# Retailer Order Tracking Contract

This draft covers the Phase 5 retailer order and delivery tracking surface.

## Purpose

- expose retailer orders by pending, in-delivery, and completed queues
- keep courier and tracking references visible for delivery monitoring
- feed completed orders into payout and reporting workflows
- prepare later delivery API connections without changing retailer screens

## Draft Endpoints

- `GET /api/retailer/orders?status=pending|in-delivery|completed`
- `GET /api/retailer/orders/{orderId}`
- `PATCH /api/retailer/orders/{orderId}/courier`
- `PATCH /api/retailer/orders/{orderId}/tracking`
- `POST /api/retailer/orders/{orderId}/complete`

## Response Shape

- order id
- customer display name
- item count
- gross order total
- courier name
- tracking reference
- destination region
- updated timestamp
- queue status

## Workflow Notes

- pending orders should remain visible until dispatch readiness is confirmed
- in-delivery orders should expose courier and tracking data clearly
- completed orders should move into retailer payout eligibility automatically
