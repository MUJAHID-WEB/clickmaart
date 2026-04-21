# Onboarding Approval Service Contract Draft

This contract covers wholesaler and retailer registration flows, OTP verification checkpoints, approval queues, and status transitions.

## Base Paths

- `/api/v1/onboarding/wholesalers`
- `/api/v1/onboarding/retailers`

## Shared Status Values

- `draft`
- `otp_pending`
- `otp_verified`
- `pending_approval`
- `approved`
- `rejected`
- `suspended`

## Wholesaler Endpoints

### Register Wholesaler

- `POST /api/v1/onboarding/wholesalers`
- Request body:
  - `business_name`
  - `tax_id`
  - `contact_person`
  - `email`
  - `phone`
  - `address`
  - `password`
  - `password_confirmation`
  - `business_license`
- Response:
  - `application_id`
  - `status`
  - `otp_channel`

### Verify Wholesaler OTP

- `POST /api/v1/onboarding/wholesalers/verify-otp`
- Request body:
  - `application_id`
  - `otp`
- Response:
  - `status`
  - `next_step`

### Wholesaler Approval Status

- `GET /api/v1/onboarding/wholesalers/{application_id}/status`
- Response:
  - `status`
  - `approval_notes`
  - `submitted_at`
  - `reviewed_at`

## Retailer Endpoints

### Register Retailer

- `POST /api/v1/onboarding/retailers`
- Request body:
  - `shop_name`
  - `shop_type`
  - `owner_name`
  - `email`
  - `phone`
  - `address`
  - `password`
  - `password_confirmation`
  - `trade_license`
- Response:
  - `application_id`
  - `status`
  - `otp_channel`

### Verify Retailer OTP

- `POST /api/v1/onboarding/retailers/verify-otp`
- Request body:
  - `application_id`
  - `otp`
- Response:
  - `status`
  - `next_step`

### Retailer Approval Status

- `GET /api/v1/onboarding/retailers/{application_id}/status`
- Response:
  - `status`
  - `approval_notes`
  - `submitted_at`
  - `reviewed_at`

## Admin Review Endpoints

- `GET /api/v1/onboarding/admin/pending`
- `POST /api/v1/onboarding/admin/{application_type}/{application_id}/approve`
- `POST /api/v1/onboarding/admin/{application_type}/{application_id}/reject`
- `POST /api/v1/onboarding/admin/{application_type}/{application_id}/reopen`

## Notification Hooks

- OTP sent
- OTP verified
- Application pending approval
- Application approved
- Application rejected
