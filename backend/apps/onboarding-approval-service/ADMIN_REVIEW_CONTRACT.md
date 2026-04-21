# Admin Review Contract

This draft covers the Phase 3 admin review workflows for wholesaler and retailer
account operations.

## Purpose

- list pending, approved, and rejected accounts
- approve or reject pending accounts
- suspend or remove approved accounts
- re-open rejected accounts for review
- keep admin notes and audit history visible

## Draft Endpoints

### Wholesalers

- `GET /api/admin/wholesalers?status=pending|approved|rejected`
- `POST /api/admin/wholesalers/{accountId}/approve`
- `POST /api/admin/wholesalers/{accountId}/reject`
- `POST /api/admin/wholesalers/{accountId}/suspend`
- `DELETE /api/admin/wholesalers/{accountId}`
- `POST /api/admin/wholesalers/{accountId}/re-approve`

### Retailers

- `GET /api/admin/retailers?status=pending|approved|rejected`
- `POST /api/admin/retailers/{accountId}/approve`
- `POST /api/admin/retailers/{accountId}/reject`
- `POST /api/admin/retailers/{accountId}/suspend`
- `DELETE /api/admin/retailers/{accountId}`
- `POST /api/admin/retailers/{accountId}/re-approve`

## Response Shape

Each record should return:

- account id
- business name
- contact email
- business type or category
- submitted date
- verification state
- current status
- rejection reason when applicable
- audit metadata for latest status transition

## Event Notes

- approval, rejection, suspension, and restoration must emit notification events
- every status change must write to the audit log
