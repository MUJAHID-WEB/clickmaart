# Admin Operations Reporting Contract

This draft covers the Phase 7 admin reporting, analytics, and operations dashboard layer.

## Purpose

- expose daily, weekly, monthly, and yearly operational reporting windows
- combine revenue, order volume, commission, and delivery health in one snapshot
- support sales and commission reporting views without separate data contracts
- keep export jobs and dashboard cards aligned with the same reporting aggregates

## Draft Endpoints

- `GET /api/admin/reports/overview?range=daily|weekly|monthly|yearly`
- `GET /api/admin/reports/sales?range=daily|weekly|monthly|yearly`
- `GET /api/admin/reports/commissions?range=daily|weekly|monthly|yearly`
- `GET /api/admin/reports/store-health?range=monthly`
- `GET /api/admin/reports/delivery-exceptions?range=daily|weekly`

## Response Shape

- reporting window label
- revenue value
- order count
- commission value
- growth percentage
- store health summary
- delivery exception summary
- export-ready flag

## Notes

- overview, sales, and commission screens should share the same base metrics contract
- store and delivery rollups should remain composable so dashboards can stay fast
- heavy chart aggregation should be cacheable without changing response shape
