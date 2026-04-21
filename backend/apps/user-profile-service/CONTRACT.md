# User Profile Service Contract Draft

This contract defines Phase 2 profile CRUD foundations for wholesaler and retailer account holders.

## Base Paths

- `/api/v1/profiles/wholesalers`
- `/api/v1/profiles/retailers`

## Shared Personal Fields

- `full_name`
- `email`
- `phone`
- `profile_photo`

## Wholesaler Profile

### Get Profile

- `GET /api/v1/profiles/wholesalers/me`
- Response:
  - `personal`
  - `business`
  - `documents`
  - `updated_at`

### Update Profile

- `PUT /api/v1/profiles/wholesalers/me`
- Request body:
  - `full_name`
  - `email`
  - `phone`
  - `business_name`
  - `tax_id`
  - `address`
  - `profile_photo`
  - `business_document`
- Response:
  - `status`
  - `message`
  - `profile`

## Retailer Profile

### Get Profile

- `GET /api/v1/profiles/retailers/me`
- Response:
  - `personal`
  - `business`
  - `documents`
  - `updated_at`

### Update Profile

- `PUT /api/v1/profiles/retailers/me`
- Request body:
  - `owner_name`
  - `email`
  - `phone`
  - `shop_name`
  - `shop_type`
  - `address`
  - `profile_photo`
  - `trade_license`
- Response:
  - `status`
  - `message`
  - `profile`

## Document Rules

- profile images: `jpg`, `jpeg`, `png`
- business docs: `pdf`, `jpg`, `jpeg`, `png`
- documents return metadata and storage URLs, not binary payloads

## Audit and Notifications

- profile update audit trail stays enabled for all writes
- successful updates trigger confirmation messaging to the account owner
