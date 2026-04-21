# Admin Operations Contract

This draft covers the Phase 3 admin order queue surface.

## Purpose

- list orders by core operational queue
- keep tracking and ETA visible
- expose the minimum order data needed for admin queue management
- prepare the route surface for deeper order lifecycle actions in later phases

## Draft Endpoints

- `GET /api/admin/orders?status=pending|shipped|delivered`
- `GET /api/admin/orders/{orderId}`
- `PATCH /api/admin/orders/{orderId}/status`
- `PATCH /api/admin/orders/{orderId}/tracking`

## Queue Response Shape

- order id
- retailer name
- wholesaler name
- customer name
- item count
- cod amount
- tracking code
- eta
- current queue status

## Lifecycle Notes

- this Phase 3 surface focuses on pending, shipped, and delivered queues
- later phases should expand into full received, sent-to-customer, and payment-done transitions
- all status updates must keep notification and audit hooks available
