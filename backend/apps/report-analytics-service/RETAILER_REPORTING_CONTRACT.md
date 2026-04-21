# Retailer Reporting Contract

This draft covers the Phase 5 retailer reports and analytics surface.

## Purpose

- expose daily, weekly, and monthly retailer sales windows
- provide top-product reporting for retailer catalog decisions
- keep store, order, and payout insights ready for export jobs
- prepare CSV and PDF reporting workflows for later phases

## Draft Endpoints

- `GET /api/retailer/reports/sales?range=daily|weekly|monthly`
- `GET /api/retailer/reports/orders?range=daily|weekly|monthly`
- `GET /api/retailer/reports/top-products?range=monthly`
- `GET /api/retailer/reports/store-health?range=monthly`
- `POST /api/retailer/reports/export`

## Response Shape

- reporting window label
- sales value
- order count
- completion rate
- payout readiness summary
- top product list
- store health summary

## Export Notes

- export requests should support `csv` and `pdf`
- store, catalog, and payout metrics should share one reporting snapshot shape
- later phases can move export generation into queue-backed jobs
