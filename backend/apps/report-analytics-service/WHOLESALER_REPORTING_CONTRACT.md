# Wholesaler Reporting Contract

This draft covers the Phase 4 wholesaler reports and analytics surface.

## Purpose

- expose sales windows for daily, weekly, and monthly reporting
- provide top-product reporting
- prepare CSV and PDF export jobs for later phases

## Draft Endpoints

- `GET /api/wholesaler/reports/sales?range=daily|weekly|monthly`
- `GET /api/wholesaler/reports/orders?range=daily|weekly|monthly`
- `GET /api/wholesaler/reports/top-products?range=monthly`
- `POST /api/wholesaler/reports/export`

## Response Shape

- reporting window label
- revenue value
- order count
- fulfillment rate
- payout health summary
- top product list

## Export Notes

- export requests should support `csv` and `pdf`
- report jobs are expected to move through queue-backed processing later
