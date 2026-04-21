# Identity Service Contract Draft

This draft is the Phase 1 handoff into Phase 2 identity work.

## Base Path

- `/api/v1/auth`

## Core Endpoints

### Role Login

- `POST /login`
- Request body:
  - `identifier`
  - `password`
  - `role`
  - `remember`
- Expected roles:
  - `admin`
  - `wholesaler`
  - `retailer`
  - `customer`
- Response:
  - `access_token`
  - `refresh_token` or session metadata
  - `user`
  - `role`
  - `redirect_to`
  - `lock_state`

### Forgot Password

- `POST /forgot-password`
- Request body:
  - `identifier`
  - `role`
- Response:
  - `status`
  - `message`
  - `reset_channel`

### Reset Password

- `POST /reset-password`
- Request body:
  - `token`
  - `password`
  - `password_confirmation`
- Response:
  - `status`
  - `message`

### Google OAuth Start

- `GET /oauth/google/redirect`
- Query:
  - `role`
  - `return_to`

### Google OAuth Callback

- `GET /oauth/google/callback`
- Response:
  - `access_token`
  - `user`
  - `role`
  - `redirect_to`

### Lock Status

- `GET /lock-status`
- Query:
  - `identifier`
  - `role`
- Response:
  - `locked`
  - `remaining_attempts`
  - `unlock_at`

## Frontend Route Pairing

- `/auth/signin` -> `POST /api/v1/auth/login`
- `/auth/forgot-password` -> `POST /api/v1/auth/forgot-password`
- future admin login route -> same endpoint with `role=admin`
- future wholesaler login route -> same endpoint with `role=wholesaler`
- future retailer login route -> same endpoint with `role=retailer`

## Phase 2 Notes

- OTP verification will be coordinated with onboarding approval and profile services.
- Account lock policy remains:
  - 3 failed attempts
  - temporary lock
  - reset link trigger
- Role-based redirect values must match frontend route groups:
  - admin -> `/admin/dashboard`
  - wholesaler -> `/wholesaler`
  - retailer -> `/retailer`
  - customer -> localized public storefront
