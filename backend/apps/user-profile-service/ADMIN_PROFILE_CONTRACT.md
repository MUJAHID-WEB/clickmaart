# Admin Profile Contract

This draft covers the Phase 3 admin profile management surface.

## Purpose

- fetch admin account profile details
- update contact information
- update business identity metadata
- support profile image and document uploads
- keep profile changes auditable

## Draft Endpoints

- `GET /api/admin/profile`
- `PATCH /api/admin/profile`
- `POST /api/admin/profile/avatar`
- `POST /api/admin/profile/documents`

## Profile Response Shape

- admin id
- name
- email
- phone
- designation
- company name
- business address
- trade license reference
- avatar media reference
- updated at timestamp

## Validation Notes

- email must stay unique and valid
- phone should preserve country code formatting
- profile images should accept jpg and png with size limits
- document uploads should keep version history in audit metadata
