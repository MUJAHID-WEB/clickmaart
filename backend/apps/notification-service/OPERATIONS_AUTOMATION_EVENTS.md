# Operations Automation Events

This draft covers the Phase 7 order, delivery, payout, stock, and reporting event map.

## Purpose

- define the operational events that should fan out to SMS, email, and in-app notifications
- keep delivery, finance, and storefront automation aligned across services
- document which system owns each event so retry and audit behavior stays predictable

## Event Catalog

### Order and Delivery

- `order.placed`
  - source: `order-orchestration-service`
  - audiences: admin, retailer
  - channels: in-app, email
- `order.received_at_warehouse`
  - source: `order-orchestration-service`
  - audiences: admin, retailer
  - channels: in-app
- `delivery.exception_detected`
  - source: `delivery-tracking-service`
  - audiences: admin delivery ops
  - channels: in-app, email
- `delivery.out_for_delivery`
  - source: `delivery-tracking-service`
  - audiences: retailer, customer
  - channels: in-app, sms
- `delivery.delivered`
  - source: `delivery-tracking-service`
  - audiences: admin, retailer, customer
  - channels: in-app, email

### Payment and Commission

- `cod.confirmed`
  - source: `payment-commission-service`
  - audiences: admin finance, wholesaler, retailer
  - channels: in-app, email
- `payout.ready_for_release`
  - source: `payment-commission-service`
  - audiences: admin finance
  - channels: in-app
- `payout.processed`
  - source: `payment-commission-service`
  - audiences: wholesaler, retailer
  - channels: in-app, sms, email
- `payment.delay_detected`
  - source: `payment-commission-service`
  - audiences: admin finance
  - channels: in-app, email

### Store and Reporting

- `store.low_stock`
  - source: `store-service`
  - audiences: admin, retailer
  - channels: in-app, sms
- `store.domain_validation_failed`
  - source: `store-service`
  - audiences: admin, retailer
  - channels: in-app, email
- `reports.export_ready`
  - source: `report-analytics-service`
  - audiences: requesting operator
  - channels: in-app, email
- `reports.export_failed`
  - source: `report-analytics-service`
  - audiences: requesting operator, admin ops
  - channels: in-app, email

## Delivery Rules

- all operational events should carry tenant, role, and correlation identifiers
- retryable delivery failures should not duplicate in-app notifications after a successful retry
- payout and export events should preserve audit references for later reconciliation
