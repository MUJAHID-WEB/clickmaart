# Export Pipeline Contract

This draft covers the Phase 7 CSV and PDF export workflow.

## Purpose

- create queue-backed export jobs for operational reports
- expose job status for admin, wholesaler, and retailer reporting surfaces
- support CSV and PDF outputs without coupling generation to the request lifecycle
- provide one contract for download links, retries, and audit-safe export metadata

## Draft Endpoints

- `POST /api/reports/exports`
- `GET /api/reports/exports`
- `GET /api/reports/exports/{jobId}`
- `POST /api/reports/exports/{jobId}/retry`
- `GET /api/reports/exports/{jobId}/download`

## Request Shape

- report type
- report scope
- format `csv|pdf`
- range
- requester identity
- optional filters

## Response Shape

- export job id
- report name
- format
- queue status
- generated timestamp
- expiry timestamp
- download url when ready

## Pipeline Notes

- export creation should emit a background job rather than blocking the UI
- download links should be signed and short-lived
- failed jobs should retain the reason for operator review and retry
- export completion should emit in-app and email notifications where configured
