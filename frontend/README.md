# ClickMaart Frontend

This workspace contains the ClickMaart frontend built with `Next.js`.

## Current State

- The legacy UI is preserved inside `src/pages`, `src/components`, and `src/admin`.
- App Router migration has started under `src/app`.
- The migration is being done incrementally to avoid breaking the existing design.
- Shared providers now live under `src/providers`.
- Route migration wrappers now live under `src/modules/shared/components/migration`.
- Shared header and admin shell components are no longer tied to `next/router`, so they can be reused inside App Router layouts.
- The first public routes have now been migrated into `src/app/(public)`.
- Base auth routes now live in `src/app/(auth)/auth`.
- The admin root now resolves through App Router and redirects to `/admin/dashboard`.
- Core admin operational routes now live in App Router for:
  - wholesaler management
  - retailer management
  - product moderation
  - order operations
  - order detail
  - delivery tracking
  - commission management
  - reports and analytics
  - store administration
  - admin profile management
- Wholesaler business panel routes now live in App Router for:
  - dashboard
  - product management
  - order workflow
  - payment system
  - reports and analytics
- Retailer business panel routes now live in App Router for:
  - dashboard
  - catalog management
  - store management
  - order and delivery tracking
  - payout system
  - reports and analytics
- Public storefront routes now use a tenant-aware shared storefront shell for:
  - homepage
  - catalog
  - product details
  - cart
  - checkout
  - order confirmation
  - about
  - contact
- Public storefront preview routes now exist for:
  - admin public store
  - retailer public stores
- Tenant/domain request context strategy now lives in `src/lib/tenant` and is applied from `middleware.ts`.
- Role-aware identity routes now exist for:
  - admin login
  - wholesaler login, registration, OTP, approval status, profile
  - retailer login, registration, OTP, approval status, profile
  - customer login, registration, OTP
- Route-by-route migration tracking now lives in `src/app/ROUTE_MIGRATION_MAP.md`.
- Phase 7 contract and operations planning coverage now exists for:
  - full order management
  - carrier tracking
  - admin commission release
  - admin store management
  - admin reporting and export pipeline
  - operations automation events

## Frontend Responsibilities

- retailer public website
- admin dashboard
- wholesaler profile management
- wholesaler panel
- retailer panel
- public eCommerce flows

## Structure

```text
frontend/
├── public/
├── src/
│   ├── app/          # New App Router foundation
│   ├── modules/      # Feature-first module organization
│   ├── pages/        # Legacy Pages Router, kept during migration
│   ├── components/   # Shared legacy UI
│   ├── admin/        # Legacy admin UI
│   └── ...
└── package.json
```

## Migration Strategy

1. Keep the existing design unchanged.
2. Move shared logic and layout concerns into App Router-safe modules.
3. Migrate route groups gradually:
   - public
   - auth
   - admin
   - wholesaler
   - retailer
4. Use shared migration wrappers and role session entry points to bridge legacy UI into App Router.
5. Use middleware request headers to carry locale-aware tenant context for future admin-store and retailer-store resolution.
6. Retire `src/pages` only after App Router parity is complete.
