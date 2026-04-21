# ClickMaart Backend

This folder contains the live Laravel 12 backend for ClickMaart.

## What Is Runtime Code

- `app/` contains controllers, middleware, models, and services.
- `routes/api.php` defines the live API under `/api/v1`.
- `database/` contains migrations, factories, and seed data.
- `tests/Feature/` contains backend API verification coverage.

## Implemented API Domains

- Public storefront and meta APIs:
  - `/api/v1/meta`
  - `/api/v1/storefront/snapshot`
  - `/api/v1/storefront/catalog`
  - `/api/v1/storefront/stores`
- Auth and onboarding APIs:
  - `/api/v1/auth/login`
  - `/api/v1/auth/register`
  - `/api/v1/auth/verify-otp`
  - `/api/v1/auth/resend-otp`
  - `/api/v1/auth/forgot-password`
  - `/api/v1/auth/me`
  - `/api/v1/auth/logout`
- Admin APIs:
  - dashboard and profile
  - wholesaler and retailer approval queues
  - product moderation
  - order queue and order detail
  - delivery tracking
  - commission settlements
  - reports and export creation
  - store management and store detail
- Wholesaler APIs:
  - dashboard
  - profile
  - products
  - orders
  - payouts
  - reports
- Retailer APIs:
  - dashboard
  - profile
  - catalog
  - stores
  - orders
  - payouts
  - reports

## Frontend Integration Status

The frontend is already wired to this Laravel app for:

- auth flows
- storefront snapshot resolution
- admin dashboard and operations read paths
- wholesaler dashboard and panel read paths
- retailer dashboard and panel read paths

Some public commerce flows still use frontend fixture data. The main remaining gaps are catalog detail, cart, checkout, order confirmation, and write-side mutations such as profile saves, document uploads, and admin action buttons.

## About `backend/apps`

The markdown files under `backend/apps/*` are reference contracts and service-boundary notes from the phase-by-phase build plan. They are not executed by Laravel and they are not the source of truth for current behavior.

When checking what actually runs, use:

- `routes/api.php`
- `app/`
- `database/`
- `tests/Feature/`

## Local Verification

Typical local commands:

- `php artisan migrate:fresh --seed --force`
- `php artisan test`
- `php artisan serve`
