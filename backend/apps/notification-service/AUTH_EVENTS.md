# Identity and Onboarding Notification Events

This document tracks the user-facing notifications required by Phase 2 identity flows.

## Login and Security

- `auth.login.success`
  - recipients:
    - user
  - examples:
    - welcome back
    - last login summary

- `auth.login.failed`
  - recipients:
    - user
  - examples:
    - invalid credential notice
    - remaining attempt count

- `auth.account.locked`
  - recipients:
    - user
  - examples:
    - account locked after 3 failed attempts
    - reset link sent

- `auth.new_device.detected`
  - recipients:
    - user
  - examples:
    - new device login
    - location and timestamp context

- `auth.password.reset.requested`
  - recipients:
    - user
  - examples:
    - password reset link sent

## OTP and Registration

- `auth.otp.sent`
  - recipients:
    - wholesaler
    - retailer
    - customer

- `auth.otp.verified`
  - recipients:
    - wholesaler
    - retailer
    - customer

## Approval Workflow

- `approval.pending`
  - recipients:
    - admin

- `approval.approved`
  - recipients:
    - wholesaler
    - retailer

- `approval.rejected`
  - recipients:
    - wholesaler
    - retailer
  - includes:
    - rejection reason

## Delivery Channels

- email
- SMS
- in-app alert
