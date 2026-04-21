# Providers

This directory contains the shared provider composition layer for both legacy `pages/` routes and new App Router route groups.

Current responsibilities:

- `SharedAppProviders.tsx`
  - shared language provider
  - optional cart provider for commerce-facing routes
- `AppRouteProviders.tsx`
  - route-group aware provider composition for:
    - public
    - auth
    - admin
    - wholesaler
    - retailer
- `session/*`
  - role-specific session entry points for:
    - admin
    - wholesaler
    - retailer

Usage direction:

- legacy `pages/_app.tsx` should use the shared provider layer
- App Router layouts should use route-group aware providers
- role-specific auth/session wiring should be plugged in here without touching page-level UI
