# Carrier Tracking Contract

This draft covers the Phase 7 delivery-tracking and courier integration layer.

## Purpose

- unify FedEx and Steadfast tracking visibility for inbound and outbound shipment legs
- expose tracking state to admin, retailer, and customer surfaces
- support retry, delay, and manual override flows when carrier sync fails
- keep shipment history queryable without duplicating order state

## Draft Endpoints

- `GET /api/delivery/shipments?carrier=fedex|steadfast&status=scheduled|in-transit|out-for-delivery|delivered|delayed`
- `GET /api/delivery/shipments/{shipmentId}`
- `POST /api/delivery/shipments/{shipmentId}/sync`
- `PATCH /api/delivery/shipments/{shipmentId}/manual-status`
- `GET /api/delivery/carriers/health`
- `POST /api/delivery/webhooks/fedex`
- `POST /api/delivery/webhooks/steadfast`

## Response Shape

- shipment id
- related order id
- shipment leg
- carrier name
- tracking reference
- courier status
- destination summary
- next checkpoint
- last sync timestamp
- sync health status
- exception note

## Integration Notes

- polling cadence stays at 15 minutes unless a carrier webhook updates the shipment sooner
- carrier health responses should expose retry counts and last successful sync
- delayed shipments should emit notification-service events for admin escalation
- manual overrides must be written to audit logs with operator identity
