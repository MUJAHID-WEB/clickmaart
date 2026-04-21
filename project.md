# ClickMaart Project Scope and Phase-wise Delivery Plan

## 1. Document Goal

This `project.md` is the master scope, architecture, and delivery roadmap for rebuilding and completing the ClickMaart platform using:

- `Next.js` with `App Router` for the frontend
- `Laravel API` for backend services
- `MySQL` for persistent storage

This document is created from the provided requirement set and is organized so the project can be completed phase by phase without losing any feature scope.

Important rules for this project:

- Existing design must be preserved.
- Existing frontend must be migrated from `Next.js Pages Router` to `Next.js App Router`.
- Frontend must handle:
  - retailer public website
  - admin dashboard
  - wholesaler profile management
  - retailer panel
  - wholesaler panel
  - public eCommerce flows
- Backend must be organized in module-wise microservice-ready architecture so the code is easy to manage, edit, and scale.
- Frontend must also be organized module-wise so the project outline is easy to understand just by looking at the codebase.
- No unique scope item from the provided requirements is dropped in this document.
- Repeated Bengali/English duplicate descriptions are normalized into one implementation scope without removing any functional rule.

---

## 2. Current Repository Observation

The current repository is a single Next.js application using `pages/` routing. It already contains:

- public storefront pages
- auth pages
- admin pages
- reusable common components
- homepage media assets
- Bengali and English i18n files
- cart, checkout, product, and admin-related UI components

Current notable paths:

- `src/pages/*`
- `src/components/*`
- `src/admin/*`
- `src/contexts/*`
- `public/images/homepage/*`
- `public/locales/bn/*`
- `public/locales/en/*`

This is useful because the existing design language, component behavior, assets, and bilingual content can be reused during migration.

---

## 3. Target Repository Structure

Target root structure:

```text
clickmaart-root/
├── frontend/          # Next.js App Router frontend
├── backend/           # Laravel API + module-wise microservice-ready services
└── project.md         # master scope and roadmap
```

### 3.1 Frontend Target Structure

```text
frontend/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── (admin)/
│   │   ├── (wholesaler)/
│   │   ├── (retailer)/
│   │   └── api/
│   ├── modules/
│   │   ├── shared/
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── wholesaler/
│   │   ├── retailer/
│   │   ├── customer/
│   │   ├── catalog/
│   │   ├── store/
│   │   ├── order/
│   │   ├── payment/
│   │   ├── report/
│   │   ├── delivery/
│   │   └── notification/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── providers/
│   ├── styles/
│   ├── types/
│   └── utils/
├── public/
└── tests/
```

### 3.2 Backend Target Structure

Recommended approach: `modular microservice-ready monorepo`.

This keeps Laravel manageable and lets the team extract modules into separate deployable services later if needed.

```text
backend/
├── apps/
│   ├── gateway-api/
│   ├── identity-service/
│   ├── user-profile-service/
│   ├── onboarding-approval-service/
│   ├── catalog-service/
│   ├── store-service/
│   ├── order-orchestration-service/
│   ├── delivery-tracking-service/
│   ├── payment-commission-service/
│   ├── report-analytics-service/
│   ├── notification-service/
│   └── media-document-service/
├── packages/
│   ├── shared-kernel/
│   ├── contracts/
│   ├── auth/
│   ├── events/
│   └── support/
└── infrastructure/
    ├── mysql/
    ├── queue/
    ├── cache/
    └── storage/
```

### 3.3 Practical Delivery Note

If full multi-app deployment is too heavy in the first implementation phase, the backend can start as:

- one Laravel codebase
- separate modules/packages
- isolated route files
- isolated controllers/services/actions/models per domain
- separate queues/events/contracts

Then later it can be split into independent services without redesigning the business logic.

---

## 4. Non-Negotiable Product Constraints

### 4.1 Design Preservation

- Existing visual identity must remain.
- Existing homepage, header, footer, carousel, section layout, imagery, and admin layout patterns should be preserved.
- Existing Bengali and English content strategy must remain.
- Migration must avoid visual regression.
- App Router conversion must keep the current user-facing design while improving code structure.

### 4.2 Frontend Responsibilities

The frontend must contain:

- Admin dashboard and admin operational UI
- Wholesaler dashboard and profile management UI
- Retailer panel and retailer storefront management UI
- Retailer public website
- Admin public store
- Customer registration, cart, checkout, and order confirmation flows

### 4.3 Backend Responsibilities

The backend must be organized module-wise with microservice-ready boundaries for:

- auth and identity
- registration and approval
- profile management
- store management
- product management
- order orchestration
- delivery tracking
- commission and payout
- reports and analytics
- notifications
- media and document management
- audit logging

### 4.4 Readability Rule

Code structure must make the project outline easy to understand immediately:

- route groups by domain
- modules by business capability
- shared contracts and DTOs
- feature-first folder organization
- minimal cross-module coupling

---

## 5. High-Level Business Scope

ClickMaart is a multi-role eCommerce and order orchestration platform with:

- Admin operations
- Wholesaler onboarding and product supply
- Retailer onboarding, marketing, store management, and resale
- Customer ordering through retailer store and admin store
- Multi-party order lifecycle management
- Commission and payout flows
- Delivery tracking
- Reports and analytics

Primary roles:

- Admin
- Wholesaler
- Retailer
- Customer

Secondary system capabilities:

- OTP verification
- Google OAuth
- role-based redirects
- account locking
- profile and business document management
- public storefronts
- real-time order visibility
- notification system
- downloadable reporting
- delivery API integrations

---

## 6. Cross-Cutting Functional Requirements

### 6.1 Authentication and Access

- Email/mobile + password login
- Google OAuth login
- OTP verification for registration
- Role-based redirect
- Account activation and approval checks
- Failed attempt counter
- Account locking after 3 failed attempts
- Password reset by email
- New device login notifications where required
- Session/JWT token-based security

### 6.2 Profiles and Business Verification

- Personal profile data
- Business profile data
- Document upload and replacement
- Trade license / PAN / GST / business license management
- Profile picture upload
- Admin review and approval pipelines

### 6.3 Product and Catalog

- Product creation and moderation
- Pending/approved/rejected product states
- Product media management
- Product pricing and markup controls
- Category filters
- Search and sorting
- Retailer catalog with wholesaler anonymity
- Public storefront product discovery

### 6.4 Orders and Fulfillment

- Multi-stage order lifecycle
- Pending -> shipped from wholesaler -> received by admin -> sent to customer -> payment done
- External marketing orders
- Storefront orders
- Tracking number management
- Delivery partner assignment
- Damage reporting
- COD verification
- Multi-party visibility and role-specific views

### 6.5 Payments, Commission, and Payouts

- 10% platform commission
- wholesaler payable calculation
- retailer profit payable calculation
- withdrawal enable/disable
- admin approval flow
- payout status tracking
- bKash support for retailer payout
- payout reports and audit

### 6.6 Notifications

- SMS
- Email
- In-app alerts
- Login success/failure/lock alerts
- Approval/rejection notices
- Product moderation notices
- Order status notices
- Payment and payout notices
- Store and stock notices

### 6.7 Reporting and Analytics

- daily/weekly/monthly/yearly sales reports
- order status analytics
- revenue and commission analytics
- growth comparison charts
- downloadable CSV/PDF

### 6.8 Security and Compliance

- bcrypt password hashing
- encrypted financial data
- TLS 1.3 for external integrations
- IP-restricted delivery API access where applicable
- audit logs for all state changes
- customer contact masking for wholesalers
- dispute windows and reversal rules

### 6.9 Localization

- Bengali + English ready content and UI
- support for role-specific and admin-specific translations

---

## 7. Recommended Architecture

### 7.1 Frontend Architecture

Use one Next.js App Router project with route groups:

- `(public)` for customer-facing public stores
- `(auth)` for auth and registration
- `(admin)` for admin panel
- `(wholesaler)` for wholesaler panel
- `(retailer)` for retailer panel

Use module-first feature organization:

- each business module owns components, schemas, services, hooks, and pages
- shared UI components stay in `modules/shared`
- feature state remains close to each domain

Recommended frontend patterns:

- server components for data-heavy pages
- client components only where interaction is needed
- typed API client layer
- middleware-based tenant/domain resolution
- form schemas with validation
- chart wrappers for dashboards
- upload adapters for media/documents

### 7.2 Backend Architecture

Use Laravel API with domain modules separated by business capability.

Core services:

1. `identity-service`
   - login
   - OAuth
   - OTP
   - password reset
   - account lock
   - token issuance

2. `user-profile-service`
   - personal profile
   - business profile
   - document uploads
   - profile media

3. `onboarding-approval-service`
   - wholesaler registration approval
   - retailer registration approval
   - account status transitions
   - audit logs

4. `catalog-service`
   - product CRUD
   - product moderation
   - category management
   - product media
   - retailer catalog projection

5. `store-service`
   - admin store management
   - retailer store management
   - domain/subdomain mapping
   - store pricing and listing rules

6. `order-orchestration-service`
   - order creation
   - order stage transitions
   - order history
   - dispute flags
   - visibility rules

7. `delivery-tracking-service`
   - wholesaler shipment tracking
   - admin-to-customer tracking
   - carrier API sync
   - tracking events

8. `payment-commission-service`
   - commission calculation
   - payout eligibility
   - withdrawal requests
   - COD confirmation
   - settlement status

9. `report-analytics-service`
   - dashboards
   - aggregated KPIs
   - sales reports
   - commission reports
   - growth reports

10. `notification-service`
    - SMS
    - Email
    - in-app notifications
    - event subscribers

11. `media-document-service`
    - image/video/document storage
    - preview metadata
    - watermark configuration
    - file validation rules

### 7.3 Data Ownership

Suggested main entities:

- users
- roles
- auth_providers
- otp_verifications
- login_attempts
- password_resets
- profiles
- business_profiles
- documents
- stores
- store_domains
- categories
- products
- product_variants
- product_media
- product_reviews
- product_approvals
- orders
- order_items
- order_stage_history
- shipments
- tracking_events
- payments
- commission_records
- payout_requests
- notification_logs
- analytics_snapshots
- audit_logs

---

## 8. Delivery Phases

### Phase 0: Discovery, Restructure, and Technical Baseline

Goals:

- freeze current visual design
- document current pages-router assets and components
- define target App Router routes
- define backend service boundaries
- create migration and testing baseline

Deliverables:

- frontend route inventory
- component reuse map
- backend service map
- database domain model draft
- design preservation checklist
- `frontend/` and `backend/` folder strategy finalized

### Phase 1: Frontend App Router Migration Foundation

Goals:

- migrate from `pages/` to `app/`
- preserve existing visual design
- set up route groups and module folders
- move common providers, i18n, cart, auth shells, and layouts

Deliverables:

- `app/(public)` base storefront
- `app/(auth)` base auth flows
- `app/(admin)` layout shell
- `app/(wholesaler)` layout shell
- `app/(retailer)` layout shell
- shared design tokens and global styles
- tenant/domain middleware strategy

### Phase 2: Identity, Registration, Approval, and Profile Systems

Goals:

- complete all auth and onboarding foundations for admin, wholesaler, retailer, and customer
- add OTP, OAuth, account locking, password reset, approval states, and profile CRUD

Scope:

- Admin login
- Wholesaler registration + OTP + admin approval
- Wholesaler login
- Wholesaler profile management
- Retailer registration + OTP + admin approval
- Retailer login
- Retailer profile management
- Customer registration + OTP
- Forgot password
- new device and lock notifications where required

### Phase 3: Admin Core Operations

Goals:

- deliver the main admin operational control center

Scope:

- Admin dashboard
- Wholesaler management
- Retailer management
- Product management moderation
- basic order management screens
- admin profile management

### Phase 4: Wholesaler Business Panel

Goals:

- make wholesaler onboarding, product, order, payout, and reports production-ready

Scope:

- Wholesaler dashboard
- Wholesaler product management
- Orders from customer / to admin flow
- Wholesaler payment system
- Wholesaler reports and analytics

### Phase 5: Retailer Business Panel

Goals:

- complete retailer business workflows

Scope:

- Retailer dashboard
- Retailer product catalog
- Retailer store management
- Retailer order management
- Retailer delivery tracking
- Retailer payout management
- Retailer reports and analytics

### Phase 6: Public Storefronts

Goals:

- deliver public purchasing experience for both retailer store and admin store

Scope:

- Retailer public eCommerce
- Admin public eCommerce
- homepage
- category listing
- product details
- cart
- customer registration
- checkout
- order confirmation

### Phase 7: Advanced Operations and Integrations

Goals:

- finish multi-party orchestration and operational automation

Scope:

- Full order management system
- Delivery tracking system
- Commission management system
- Admin store management system
- Reports and analytics
- notification automation
- CSV/PDF export
- FedEx/Steadfast integrations

### Phase 8: Hardening, QA, UAT, and Launch

Goals:

- security hardening
- performance tuning
- regression testing
- UAT with role-based scenarios
- production deployment readiness

Deliverables:

- QA test cases
- seed/demo data
- monitoring and alerting plan
- backup and recovery plan
- deployment SOP

### 8.1 Live Execution Tracker

This subsection must be updated as implementation progresses so anyone opening `project.md` can immediately understand:

- which phase is currently active
- what has already been completed
- what is currently in progress
- what the next tasks are

Current execution snapshot:

- Current active phase: `Phase 8 preparation`
- Most recently completed task group: `Public commerce integration and live write-side API wiring`
- Current active task group: `Hardening, QA, UAT, and launch-readiness planning`
- Immediate next phase after current work: `Execute Phase 8 verification and operational readiness tasks`
- Current repo state:
  - root split into `frontend/` and `backend/`
  - legacy Next.js code moved into `frontend/`
  - `frontend/` contains broad App Router coverage for public, auth, admin, wholesaler, retailer, and storefront preview routes
  - frontend route modules are organized under `frontend/src/modules/*`
  - `backend/` contains the live Laravel 12 application with API routes, middleware, models, services, migrations, seeders, and feature tests
  - `backend/apps/*` now serves as reference-only contract and service-boundary documentation rather than runtime code
  - auth flows are wired to the live backend
  - admin, wholesaler, retailer, and storefront pages have Laravel-backed read paths with fallback behavior
  - public commerce now uses live Laravel catalog, checkout, order creation, confirmation, and order-detail flows
  - admin approvals, product moderation, order-stage changes, report export queueing, and store-status changes are wired to live backend mutations
  - wholesaler and retailer profile updates, document uploads, catalog edits, and store updates are wired to live backend mutations
  - frontend browser mutations now flow through a dedicated internal proxy route for stable local development without exposing service tokens
  - Phase 8 assets such as QA checklists, UAT scripts, monitoring setup, deployment SOPs, backup plans, and rollback playbooks are not yet present in the repo

#### Repo Reality Check

##### Done in Repo

- Monorepo/workspace split and root roadmap documentation.
- Frontend App Router migration foundation and route coverage across public, auth, admin, wholesaler, retailer, and storefront preview surfaces.
- Shared provider composition, migration wrappers, and tenant-context utilities for the frontend.
- Frontend UI plus live Laravel integration for public commerce, admin operations, wholesaler workflows, and retailer workflows.
- Laravel 12 backend implementation in `backend/` with seed data, middleware, controllers, services, API routes, and feature tests.
- Backend service folder structure and reference contract/planning documents for identity, onboarding, catalog, orders, delivery, store, payment, reporting, notifications, and media.
- Internal frontend mutation proxy route for browser-triggered admin, wholesaler, retailer, and public checkout actions.

##### Should Be Updated Next

- Expand automated test coverage beyond baseline API snapshots into mutation, upload, and end-to-end role flows.
- Add QA/UAT artifacts, monitoring, deployment, backup, and rollback documentation.
- Add operational hardening items such as rate limits, storage linking, scheduler/queue deployment notes, and production env validation.
- Add smoke or Playwright coverage for cross-role auth, commerce checkout, and admin mutation paths.

#### Phase Status Board

| Phase | Status | Current Position | Next Deliverable |
|---|---|---|---|
| Phase 0 | Completed | Project scope, monorepo direction, and workspace split are done | Keep tracker aligned with repo changes |
| Phase 1 | Completed | App Router foundation, migration scaffolding, and tenant middleware strategy are implemented in `frontend/` | Maintain route parity while backend catches up |
| Phase 2 | Integrated | Laravel auth, OTP, reset, onboarding, profile updates, and document uploads are wired into the live backend | Expand mutation and workflow test coverage |
| Phase 3 | Integrated | Admin dashboard, queues, moderation, order detail, report export, and store actions now use live Laravel reads and mutations | Add deeper regression coverage for admin operations |
| Phase 4 | Integrated | Wholesaler dashboard, products, orders, payouts, reports, and profile management now use live Laravel reads and mutations | Add wholesaler end-to-end flow coverage |
| Phase 5 | Integrated | Retailer dashboard, catalog, stores, orders, payouts, reports, and profile management now use live Laravel reads and mutations | Add retailer end-to-end flow coverage |
| Phase 6 | Integrated | Laravel storefront catalog, checkout, order confirmation, and order detail flows now back the public commerce experience | Add public-commerce smoke and regression coverage |
| Phase 7 | Integrated | Laravel advanced operations plus admin mutation controls are now live for order, report, commission, and store workflows | Add operational hardening and end-to-end verification |
| Phase 8 | Ready To Start | Integration work is now sufficient to begin QA, UAT, hardening, and deployment-readiness tasks | Create Phase 8 artifacts and launch-readiness checklists |

#### Completed and Scaffolded Tasks So Far

Implementation note:

- The detailed lists below preserve the phase-by-phase scaffold history in the repo.
- The current live implementation state is summarized by the Phase Status Board and the `Backend/API Baseline Implemented` section.

##### Phase 0 Completed

- Created root-level `project.md` as the master scope and delivery roadmap.
- Normalized the provided Bengali/English requirements into one implementation scope without dropping major features.
- Defined the target monorepo structure:
  - `frontend/`
  - `backend/`
  - `project.md`
- Defined frontend module boundaries.
- Defined backend microservice-ready service boundaries.
- Documented phased delivery strategy from foundation to launch.

##### Phase 1 Completed

- Moved the existing Next.js codebase into the dedicated `frontend/` workspace.
- Created the dedicated `backend/` workspace.
- Added App Router root layout in `frontend/src/app/layout.tsx`.
- Added App Router layout shells for:
  - public
  - auth
  - admin
  - wholesaler
  - retailer
- Added conflict-safe internal migration routes:
  - `/migration-status`
  - `/workspace`
  - `/workspace/admin`
  - `/workspace/wholesaler`
  - `/workspace/retailer`
- Added `PanelShell` shared migration component for role workspace scaffolding.
- Added frontend module responsibility docs under `frontend/src/modules/*`.
- Added shared provider composition layer under `frontend/src/providers/*`.
- Refactored shared language state so it is compatible with both legacy `pages/` routes and App Router migration work.
- Connected App Router route-group layouts to a central provider composer.
- Moved legacy `pages/_app.tsx` provider nesting to the shared provider layer.
- Added role-specific session provider entry points for:
  - admin
  - wholesaler
  - retailer
- Added route migration wrappers for:
  - public
  - auth
  - admin
  - panel workspaces
- Connected App Router layouts to the shared migration wrappers so legacy framing can be reused safely.
- Removed `next/router` dependency from shared header and admin shell components used by migration layouts.
- Added browser-safe client navigation utilities for migration-safe path detection and redirects.
- Migrated the first real public routes into App Router:
  - homepage
  - products list
  - product details
  - cart
  - checkout
  - order confirmation
- Migrated the base auth routes into App Router:
  - `/auth`
  - `/auth/signin`
  - `/auth/signup`
  - `/auth/forgot-password`
- Migrated the first real admin App Router route:
  - `/admin/dashboard`
- Migrated the admin root into App Router:
  - `/admin` -> redirect to `/admin/dashboard`
- Moved route-level public UI into module-friendly components under:
  - `frontend/src/modules/store/components/*`
  - `frontend/src/modules/catalog/components/*`
  - `frontend/src/modules/order/components/*`
- Added the first admin route-level module component under:
  - `frontend/src/modules/admin/components/*`
- Added auth route-level module components under:
  - `frontend/src/modules/auth/components/*`
- Added explicit route migration tracking in:
  - `frontend/src/app/ROUTE_MIGRATION_MAP.md`
- Retired conflicting legacy public page files after App Router parity was created for those routes.
- Retired conflicting legacy auth page files after App Router parity was created for those routes.
- Retired the legacy admin catch-all route so the App Router admin dashboard path can own `/admin/dashboard` cleanly.
- Retired the legacy admin root page after App Router redirect ownership was created for `/admin`.
- Added tenant/domain request-context strategy under:
  - `frontend/src/lib/tenant/*`
- Updated `frontend/middleware.ts` so locale redirect and tenant metadata can work together.
- Added backend service responsibility docs under `backend/apps/*`.
- Added monorepo-level root `.gitignore`.
- Updated frontend and backend README files for the new workspace structure.

##### Phase 2 Scaffolded

- Added and expanded identity contract draft under:
  - `backend/apps/identity-service/CONTRACT.md`
- Added onboarding approval contract draft under:
  - `backend/apps/onboarding-approval-service/CONTRACT.md`
- Added profile service contract draft under:
  - `backend/apps/user-profile-service/CONTRACT.md`
- Added auth and approval notification event map under:
  - `backend/apps/notification-service/AUTH_EVENTS.md`
- Added role-aware login routes for:
  - admin
  - wholesaler
  - retailer
  - customer
- Added onboarding registration routes for:
  - wholesaler
  - retailer
  - customer
- Added OTP verification routes for:
  - wholesaler
  - retailer
  - customer
- Added approval-status routes for:
  - wholesaler
  - retailer
- Added profile management routes for:
  - wholesaler
  - retailer
- Added redirect aliases so existing public UI links continue to work for:
  - `/wholesaler`
  - `/retailer`
  - `/wholesaler-registration`
  - `/retailer-registration`
- Retired conflicting legacy registration pages after App Router parity was created.
- Updated frontend and backend module docs so the phase boundary is visible from the code layout.

##### Phase 3 Scaffolded

- Expanded admin App Router coverage beyond login and dashboard for:
  - wholesaler management
  - retailer management
  - product moderation
  - basic order operations
  - admin profile management
- Added App Router admin routes for:
  - `/admin/wholesalers`
  - `/admin/wholesalers/pending`
  - `/admin/wholesalers/approved`
  - `/admin/wholesalers/rejected`
  - `/admin/retailers`
  - `/admin/retailers/pending`
  - `/admin/retailers/approved`
  - `/admin/retailers/rejected`
  - `/admin/products`
  - `/admin/products/pending`
  - `/admin/products/approved`
  - `/admin/products/rejected`
  - `/admin/orders`
  - `/admin/orders/pending`
  - `/admin/orders/shipped`
  - `/admin/orders/delivered`
  - `/admin/settings/profile`
- Added redirect-safe admin aliases for:
  - `/admin/users/wholesalers`
  - `/admin/users/retailers`
  - `/admin/profile`
  - `/admin/settings`
- Added admin module data and route-level components under:
  - `frontend/src/modules/admin/components/*`
  - `frontend/src/modules/admin/data/*`
- Expanded the admin dashboard so its operational cards link to the new live App Router admin routes.
- Updated the admin header profile action to point at the App Router admin profile route.
- Retired conflicting legacy admin page files after App Router parity was created for:
  - wholesaler management aliases
  - retailer management aliases
  - product overview
  - pending product moderation
  - order overview
  - admin profile settings
- Added Phase 3 backend planning contract drafts under:
  - `backend/apps/onboarding-approval-service/ADMIN_REVIEW_CONTRACT.md`
  - `backend/apps/catalog-service/ADMIN_MODERATION_CONTRACT.md`
  - `backend/apps/order-orchestration-service/ADMIN_OPERATIONS_CONTRACT.md`
  - `backend/apps/user-profile-service/ADMIN_PROFILE_CONTRACT.md`
- Updated route migration, frontend, backend, and module documentation so the Phase 3 scaffold boundary is visible from the repo structure.

##### Phase 4 Scaffolded

- Expanded the wholesaler App Router panel beyond login and profile for:
  - dashboard
  - product management
  - order workflow
  - payment system
  - reports and analytics
- Added App Router wholesaler routes for:
  - `/wholesaler`
  - `/wholesaler/dashboard`
  - `/wholesaler/products`
  - `/wholesaler/products/pending`
  - `/wholesaler/products/approved`
  - `/wholesaler/products/rejected`
  - `/wholesaler/orders`
  - `/wholesaler/orders/pending`
  - `/wholesaler/orders/shipped`
  - `/wholesaler/orders/payment-done`
  - `/wholesaler/payments`
  - `/wholesaler/payouts`
  - `/wholesaler/reports`
- Added wholesaler module data and route-level components under:
  - `frontend/src/modules/wholesaler/components/*`
  - `frontend/src/modules/wholesaler/data/*`
- Updated the wholesaler root route so `/wholesaler` now resolves into the live business dashboard.
- Added Phase 4 backend planning contract drafts under:
  - `backend/apps/catalog-service/WHOLESALER_PRODUCT_CONTRACT.md`
  - `backend/apps/order-orchestration-service/WHOLESALER_FULFILLMENT_CONTRACT.md`
  - `backend/apps/payment-commission-service/WHOLESALER_PAYOUT_CONTRACT.md`
  - `backend/apps/report-analytics-service/WHOLESALER_REPORTING_CONTRACT.md`
- Updated route migration, frontend, backend, and wholesaler module documentation so the Phase 4 scaffold boundary is visible from the repo structure.

##### Phase 5 Scaffolded

- Expanded the retailer App Router panel beyond login and profile for:
  - dashboard
  - catalog management
  - store management
  - order and delivery tracking
  - payout system
  - reports and analytics
- Added App Router retailer routes for:
  - `/retailer`
  - `/retailer/dashboard`
  - `/retailer/catalog`
  - `/retailer/catalog/live`
  - `/retailer/catalog/draft`
  - `/retailer/catalog/low-stock`
  - `/retailer/store`
  - `/retailer/orders`
  - `/retailer/orders/pending`
  - `/retailer/orders/in-delivery`
  - `/retailer/orders/completed`
  - `/retailer/payouts`
  - `/retailer/reports`
- Added retailer module data and route-level components under:
  - `frontend/src/modules/retailer/components/*`
  - `frontend/src/modules/retailer/data/*`
- Updated the retailer root route so `/retailer` now resolves into the live business dashboard.
- Added Phase 5 backend planning contract drafts under:
  - `backend/apps/catalog-service/RETAILER_CATALOG_CONTRACT.md`
  - `backend/apps/store-service/RETAILER_STORE_CONTRACT.md`
  - `backend/apps/order-orchestration-service/RETAILER_ORDER_TRACKING_CONTRACT.md`
  - `backend/apps/payment-commission-service/RETAILER_PAYOUT_CONTRACT.md`
  - `backend/apps/report-analytics-service/RETAILER_REPORTING_CONTRACT.md`
- Updated route migration, frontend, backend, and retailer module documentation so the Phase 5 scaffold boundary is visible from the repo structure.

##### Phase 6 Scaffolded

- Completed shared public storefront App Router coverage for:
  - homepage
  - catalog
  - product details
  - cart
  - checkout
  - order confirmation
  - about
  - contact
- Added tenant-aware storefront snapshot and shared storefront shell under:
  - `frontend/src/modules/store/data/*`
  - `frontend/src/modules/store/server/*`
  - `frontend/src/modules/store/components/*`
- Aligned customer-facing cart, checkout, and order-confirmation routes so they now render inside the storefront-aware public shell.
- Added public storefront preview routes for:
  - admin public store
  - retailer public stores
- Extended tenant middleware documentation so core, admin-store, and retailer-store storefront ownership is visible from the repo.
- Added Phase 6 backend planning contract drafts under:
  - `backend/apps/store-service/ADMIN_PUBLIC_STOREFRONT_CONTRACT.md`
  - `backend/apps/store-service/RETAILER_PUBLIC_STOREFRONT_CONTRACT.md`
  - `backend/apps/gateway-api/TENANT_RESOLUTION_CONTRACT.md`
- Updated route migration, frontend, backend, store module, and tenant documentation so the Phase 6 scaffold boundary is visible from the repo structure.

##### Phase 7 Scaffolded

- Expanded admin App Router coverage for:
  - detailed order lifecycle
  - delivery tracking
  - commission management
  - reports and analytics
  - store administration
- Added App Router admin routes for:
  - `/admin/orders/[id]`
  - `/admin/delivery`
  - `/admin/commission`
  - `/admin/reports`
  - `/admin/reports/sales`
  - `/admin/reports/commissions`
  - `/admin/stores`
  - `/admin/stores/[id]`
- Added Phase 7 admin module data, server snapshots, and route-level components under:
  - `frontend/src/modules/admin/data/*`
  - `frontend/src/modules/admin/server/*`
  - `frontend/src/modules/admin/components/*`
- Added notification automation presentation support under:
  - `frontend/src/modules/notification/components/*`
- Retired conflicting legacy admin page files after App Router parity was created for:
  - order detail
  - reports
  - store administration
- Added Phase 7 backend planning contract drafts under:
  - `backend/apps/order-orchestration-service/FULL_ORDER_MANAGEMENT_CONTRACT.md`
  - `backend/apps/delivery-tracking-service/CARRIER_TRACKING_CONTRACT.md`
  - `backend/apps/payment-commission-service/ADMIN_COMMISSION_CONTRACT.md`
  - `backend/apps/store-service/ADMIN_STORE_MANAGEMENT_CONTRACT.md`
  - `backend/apps/report-analytics-service/ADMIN_OPERATIONS_REPORTING_CONTRACT.md`
  - `backend/apps/report-analytics-service/EXPORT_PIPELINE_CONTRACT.md`
  - `backend/apps/notification-service/OPERATIONS_AUTOMATION_EVENTS.md`
- Updated route migration, frontend, backend, admin module, and project tracking documentation so the Phase 7 scaffold boundary is visible from the repo structure.

##### Backend/API Baseline Implemented

- Bootstrapped a Laravel 12 application directly in `backend/` with API routing under `/api/v1`.
- Added ClickMaart domain models, migrations, seeders, middleware, controllers, and service mapping for:
  - auth and onboarding
  - storefront snapshot/meta
  - admin operations
  - wholesaler panel APIs
  - retailer panel APIs
- Added demo seed data so the frontend and API share the same baseline business entities.
- Added automated backend verification in:
  - `backend/tests/Feature/AuthApiTest.php`
  - `backend/tests/Feature/AdminApiTest.php`
  - `backend/tests/Feature/StorefrontApiTest.php`
- Added a shared frontend API helper in:
  - `frontend/src/lib/api/clickmaartBackend.ts`
- Connected live backend-aware frontend flows for:
  - role-based login
  - registration
  - OTP verification and resend
  - forgot password
  - storefront snapshot resolution
  - advanced admin operations snapshot pages
- Extended live backend-aware frontend coverage to:
  - admin dashboard, queues, and profile pages
  - wholesaler dashboard, products, orders, payouts, reports, and profile pages
  - retailer dashboard, catalog, stores, orders, payouts, reports, and profile pages
- Extended live backend-aware frontend coverage further to:
  - public catalog, product detail, checkout, order confirmation, and order-detail flows
  - admin review, moderation, order-stage, report export, and store-status mutations
  - wholesaler profile/document updates and product mutations
  - retailer profile/document updates, catalog mutations, and store mutations
- Added an internal frontend mutation bridge in:
  - `frontend/src/app/api/clickmaart/mutate/route.ts`
- Added `frontend/.env.example` so local runtime wiring to Laravel is explicit.

#### Current In-Progress Tasks

##### Active Task Group: Phase 8 Hardening Preparation

- Capture QA/UAT artifacts and production-readiness documentation.
- Expand automated coverage from baseline API checks into live mutation and storefront role flows.
- Keep this tracker aligned as the repo moves from integration completion into launch hardening.

#### Next Task Queue

##### Next Tasks In Phase 8

1. Add end-to-end smoke coverage for customer checkout, admin moderation, wholesaler product edits, and retailer catalog/store edits.
2. Create QA scripts and UAT checklists for admin, wholesaler, retailer, and public storefront flows.
3. Add monitoring, backup, rollback, storage-link, queue-worker, and scheduler deployment runbooks.
4. Add production environment validation notes for database, storage, mail, queue, and API token configuration.
5. Review security and performance hardening items before launch.

##### Immediate Handoff After Integration Completion

Once the backend and frontend integration baseline exists, the next active build sequence will be:

1. End-to-end regression testing across all roles and storefronts.
2. Security and performance hardening.
3. UAT with realistic seed/demo data.
4. Deployment, monitoring, backup, and rollback runbooks.
5. Launch go/no-go review and production rollout.

##### Planned Tasks for Phase 2

1. Bootstrap the Laravel auth API foundation, token/session strategy, and shared validation layer.
2. Implement identity-service flows for:
   - login
   - OTP
   - password reset
   - account lock
   - role-based redirect
3. Implement onboarding approval flows for:
   - wholesaler approval
   - retailer approval
4. Implement profile APIs for:
   - personal profile
   - business profile
   - documents

##### Planned Tasks for Phase 3

1. Implement admin backend endpoints for wholesaler and retailer approval queues.
2. Implement admin product moderation endpoints.
3. Implement admin order queue and status endpoints.
4. Connect admin frontend pages to live APIs and reduce local admin mock data.

##### Planned Tasks for Phase 4

1. Implement wholesaler product CRUD and moderation-state APIs.
2. Implement wholesaler order workflow endpoints.
3. Implement wholesaler payout and reporting endpoints.
4. Connect wholesaler pages to live data and mutation flows.

##### Planned Tasks for Phase 5

1. Implement retailer catalog, store, order, delivery, payout, and reporting APIs.
2. Connect retailer frontend pages to live data.
3. Add inventory, pricing, and order validation rules.
4. Add retailer role auth and permission coverage.

##### Planned Tasks for Phase 6

1. Implement storefront tenant resolution and store/public listing APIs.
2. Implement cart, checkout, order confirmation, and customer identity integration.
3. Connect preview and public storefront routes to live tenant and store data.
4. Add domain verification and store publish/unpublish workflow.

##### Planned Tasks for Phase 7

1. Implement the full order orchestration state machine APIs.
2. Implement carrier tracking sync and delivery event ingestion.
3. Implement commission settlement, reporting, and export jobs.
4. Implement automation and notification jobs and connect admin operations pages.

##### Planned Tasks for Phase 8

1. QA and regression pass after backend/API connectivity is stable.
2. Security hardening across auth, payout, export, and carrier-integration touchpoints.
3. Performance review for dashboards, reporting, and export-heavy surfaces.
4. UAT checklist with seed/demo data.
5. Launch readiness review.

#### Progress Update Rule

Every major implementation turn should update this tracker with:

- completed tasks
- active task group
- next queued tasks
- phase status changes

This tracker is the live answer to:

- where we are now
- what has been finished
- what comes next
- which phase the project is currently in

---

## 9. Frontend Route Blueprint

Suggested App Router mapping:

```text
frontend/src/app/
├── (public)/
│   ├── page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── order-confirmation/page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
├── (auth)/
│   ├── auth/signin/page.tsx
│   ├── auth/signup/page.tsx
│   ├── auth/forgot-password/page.tsx
│   ├── register/wholesaler/page.tsx
│   └── register/retailer/page.tsx
├── (admin)/
│   └── admin/
│       ├── page.tsx
│       ├── users/
│       ├── products/
│       ├── orders/
│       ├── stores/
│       ├── reports/
│       └── settings/profile/page.tsx
├── (wholesaler)/
│   └── wholesaler/
│       ├── page.tsx
│       ├── products/
│       ├── orders/
│       ├── reports/
│       ├── payouts/
│       └── profile/page.tsx
└── (retailer)/
    └── retailer/
        ├── page.tsx
        ├── catalog/
        ├── stores/
        ├── orders/
        ├── delivery/
        ├── payouts/
        ├── reports/
        └── profile/page.tsx
```

Dynamic tenant support:

- retailer public store served from verified subdomain/custom domain
- admin public store served from main domain or separate admin-store domain
- middleware resolves store context before loading public pages

---

## 10. Backend Service Blueprint

Suggested owned domains:

| Service | Main Responsibilities |
|---|---|
| Identity | Login, OAuth, OTP, password reset, account lock, token/session |
| User Profile | Personal info, business info, profile pictures, documents |
| Onboarding Approval | Wholesaler/retailer pending-review and approvals |
| Catalog | Product CRUD, approval state, product media, category filtering |
| Store | Admin stores, retailer stores, domains, pricing, listing/unlisting |
| Order Orchestration | Order placement, state machine, history, visibility |
| Delivery Tracking | Carrier tracking, tracking events, live map state |
| Payment & Commission | Commission math, payout eligibility, withdrawal flow |
| Reporting & Analytics | Dashboard KPIs, charts, exports, trend reports |
| Notification | SMS, email, in-app events |
| Media & Document | Uploads, validation, previews, storage, watermark rules |

Recommended integration style:

- synchronous REST for CRUD and query
- async events for notifications and report refresh
- queue jobs for exports, email, SMS, tracking sync, media processing

---

## 11. Design Preservation and Migration Rules

1. Reuse current visual assets from the existing repo wherever possible.
2. Migrate shared layout pieces first:
   - header
   - footer
   - hero carousel
   - product card
   - admin layout shell
3. Preserve current typography, color impression, homepage sections, and image usage.
4. Move reusable components into feature-based modules without redesigning them unnecessarily.
5. Preserve current i18n support for Bengali and English.
6. Avoid a full redesign while converting to App Router.
7. Any UI refactor must aim for:
   - same user experience
   - cleaner structure
   - easier extensibility

---

## 12. Master Scope Inventory

The following sections preserve the functional scope from the provided requirements.

### 12.1 Admin Panel

#### 12.1.1 Admin Login

- Allows admin to log in using email/mobile and password.
- Optional Google OAuth login.
- Validates credentials and role.
- Redirects admin to admin dashboard after success.
- Locks account temporarily after 3 failed attempts.
- Sends password reset link to registered email on account lock.
- Inputs:
  - email/mobile
  - password
  - optional Google OAuth
- Validation:
  - email in valid format
  - password minimum 8 characters
- Screen elements:
  - email field
  - password field
  - login button
  - forgot password link
  - OAuth button
  - error message
- Notifications:
  - login successful
  - failed login attempt
  - account locked
  - password reset link sent
- Workflow:
  - enter credentials or use Google
  - validate credentials
  - check role
  - redirect to admin dashboard
  - on 3 failures lock and send reset

#### 12.1.2 Admin Profile Management

- Admin can update personal and business details.
- Editable personal fields:
  - name
  - email
  - phone
  - profile picture
- Editable business fields:
  - address
  - business documents
- System fetches existing profile and business data from database.
- Validates and saves updates.
- Shows confirmation on success.
- Personal rules:
  - name required, minimum 3 characters
  - email valid
  - phone valid with country code
  - profile picture JPG/PNG, max 2MB
- Workflow:
  - admin visits My Profile
  - system loads profile
  - admin edits details
  - save changes
  - success confirmation shown
- Notification:
  - profile update confirmation

#### 12.1.3 Admin Dashboard

- Provides full system overview.
- Shows:
  - total sales
  - total orders
  - active wholesalers
  - active retailers
  - recent activities
  - sales trends
  - order status distribution
  - top-selling products
  - user registration trends
  - real-time updates
- Uses charts, graphs, and tables.
- Data tools:
  - Chart.js
  - tables
- Sample KPI layout:
  - total sales: tk. 500,000
  - total orders: 1,200
  - active wholesalers: 150
  - active retailers: 500
- Sample chart examples:
  - processing 20%
  - shipped 50%
  - delivered 30%
  - top products A/B/C
- Workflow:
  - admin logs in
  - system fetches sales/orders/registrations
  - aggregates metrics
  - shows cards/charts/tables

#### 12.1.4 Wholesaler Management System

- Admin can manage wholesaler accounts through:
  - approve
  - reject
  - suspend
  - remove
  - re-approve rejected accounts
- Status-based pages:
  - Pending
  - Approved
  - Rejected
- Pending approvals page:
  - data grid
  - approve button
  - reject button
  - details modal for license/tax docs
  - search by name/email
  - category filter
  - metrics/info panel
- Approved wholesalers page:
  - active accounts grid
  - suspend action
  - remove action
  - details modal
  - performance stats
- Rejected applications page:
  - rejected grid
  - re-approve button
  - rejection reason
- Requirements:
  - business doc review
  - compliance checklist
  - status update in real time
  - change history logging
  - bulk action support
  - 30-day recovery window for removed accounts
- Notifications:
  - SMS on status change
  - detailed email on major actions
  - in-platform alerts
- Sample records preserved:
  - Global Imports
  - Quality Distributors
  - Mega Suppliers
  - Budget Goods

#### 12.1.5 Retailer Management System

- Admin can manage retailer accounts through:
  - approve
  - reject
  - suspend
  - remove
  - re-approve rejected accounts
- Status-based pages:
  - Pending
  - Approved
  - Rejected
- Pending page:
  - retailer table
  - approve/reject actions
  - details modal for business docs
  - search
  - category filter
- Approved page:
  - retailer table
  - suspend action
  - remove action
  - track orders action
  - performance stats
- Rejected page:
  - rejected list
  - re-approve button
  - rejection reason
- Requirements:
  - business doc review
  - compliance tracking
  - bulk action support
  - real-time updates
  - change logs
  - 30-day reversal window
- Notifications:
  - SMS/email on status changes
  - in-platform alerts
- Sample records preserved:
  - Urban Retail Co.
  - Fresh Grocers
  - Tech Haven
  - Budget Mart

#### 12.1.6 Product Management System

- Admin manages products submitted by wholesalers.
- Product states:
  - Pending
  - Approved
  - Rejected
- Admin capabilities:
  - approve/reject pending products
  - quick edit basic info
  - review images, description, specs, price
  - bulk approve/reject
  - set custom markup
  - add product to admin store
  - list/unlist product from store
  - edit markup
  - export CSV/Excel
  - re-approve rejected product back to pending
- Pending Products page:
  - product data grid
  - approve
  - reject with reason
  - inline edit
  - details modal
  - wholesaler filter
- Approved Products page:
  - stock
  - markup %
  - status
  - add to store
  - list/unlist
  - edit markup
  - bulk export
- Rejected Products page:
  - reject date
  - reason
  - re-approve
- Validation:
  - markup minimum 5%
  - markup maximum 50%
  - store price auto-rounded to 2 decimals
- Example preserved:
  - Wireless Earbuds Pro
  - Organic Coffee Beans
  - Cheap Sunglasses

#### 12.1.7 Order Management System

- Manages full order lifecycle:
  1. Pending Orders
  2. Shipped from Wholesaler
  3. Received from Wholesaler
  4. Sent to Customer
  5. Payment Done
- Admin actions:
  - confirm receipt from wholesaler
  - update customer delivery status
  - mark COD done
  - resolve fulfillment issues
- System actions:
  - auto-import retailer orders
  - sync wholesaler shipment status
  - sync courier tracking
  - record COD confirmation
- Interface:
  - Pending Orders page with order list and wholesaler alert badge
  - Shipped from Wholesaler page with tracking link and expected date timer
  - Received from Wholesaler page with damage report modal and receive confirm
  - Sent to Customer page with delivery agent dropdown and live map
  - Payment Done page with payment proof upload and settlement badge
- Notifications:
  - shipped from wholesaler -> admin + retailer
  - received from wholesaler -> wholesaler + retailer
  - sent to customer -> retailer + customer
  - payment done -> wholesaler + retailer
- Special requirements:
  - damage reporting with photo evidence
  - return initiation from any stage
  - customer contact masking for wholesalers
  - encrypted financial data

#### 12.1.8 Commission Management System

- Admin tracks, calculates, and disburses commission.
- Separate dashboards for wholesaler and retailer commission.
- Platform commission is 10%.
- Wholesaler formula:
  - payable = order amount x 0.9
- Retailer formula:
  - payable = retailer profit x 0.9
- Admin can:
  - view commission reports
  - enable/disable withdrawal
  - audit histories
  - process payouts
- Wholesaler dashboard fields:
  - wholesaler name
  - order ID
  - order amount
  - commission 10%
  - payable amount
  - enable withdrawal toggle
- Retailer dashboard fields:
  - retailer name
  - order ID
  - retailer profit
  - commission 10%
  - payable amount
  - enable withdrawal toggle
- Reporting:
  - transaction ID
  - commission deduction
  - net payable
  - CSV/PDF export
- Rules:
  - minimum withdrawal tk. 50
  - processing time 1-3 business days
  - dispute period 7 days post-payment
- Notifications:
  - withdrawal enabled
  - payout completed

#### 12.1.9 Store Management System

- Admin can create and manage multiple independent stores.
- Each store has:
  - store name
  - legal address
  - mobile/contact
  - trade license
  - custom domain or subdomain
- Admin can:
  - register new stores
  - assign wholesaler products
  - set store-specific prices and margins
  - monitor performance
- Product assignment controls:
  - wholesale price
  - selling price
  - profit margin
  - stock quantity
  - media display
- Store list dashboard:
  - store name
  - domain
  - product count
  - status toggle
  - view details
- Add store form:
  - store name required
  - address validated via Google Maps API target
  - trade license PDF/JPG/PNG max 5MB
  - custom domain DNS validation
- Product assignment panel:
  - product search
  - wholesale price read-only
  - selling price > wholesale
  - profit auto-calculated
  - media toggles
- Performance:
  - sales volume
  - order fulfillment rate
  - revenue per product
- Notifications:
  - new store approved
  - low stock alert
- Domain rules:
  - unique subdomain only
  - DNS verification required

#### 12.1.10 Delivery Tracking System

- Dual-channel tracking:
  1. wholesaler to admin
  2. admin to customer via FedEx/Steadfast
- Status flow on wholesaler side:
  - Processing
  - Shipped
  - Out for Delivery
  - Delivered
- Customer side:
  - auto-sync every 15 minutes from API
  - live GPS for Out for Delivery
- Role-based visibility:
  - wholesaler sees own shipments
  - admin sees all
  - customer sees own orders only
- Status colors:
  - Processing
  - Shipped
  - Out for Delivery
  - Delivered
- Wholesaler delivery page columns:
  - order ID
  - wholesaler
  - product details
  - status
  - last updated
- Customer delivery page columns:
  - order ID
  - retailer
  - product details
  - status
  - tracking map
- Technical requirements:
  - FedEx RESTful Track API
  - Steadfast SOAP-based tracking
  - manual status override fallback
  - TLS 1.3
  - IP-restricted API access
  - target response under 500ms
  - 99.9% API uptime goal

#### 12.1.11 Reports and Analytics (Admin)

- Detailed sales reports and analytics for admin.
- Report frequencies:
  - daily
  - weekly
  - monthly
  - yearly
- Screen elements:
  - sales report table
  - comparison chart
  - search bar
  - filter dropdown by date/store/category
- Features:
  - current vs previous month comparison
  - chart-based sales visualization
- Workflow:
  - admin selects date range
  - generate report
  - system shows charts and tables

### 12.2 Wholesaler Panel

#### 12.2.1 Registration with OTP and Admin Approval

- Separate wholesaler registration form.
- Required personal inputs:
  - name
  - email
  - mobile
  - password
  - confirm password
  - OTP
- Required business inputs:
  - business name
  - GST number
  - business address
  - business license upload
- Rules:
  - name minimum 3 chars
  - valid email
  - valid mobile with country code
  - password minimum 8 chars with uppercase, lowercase, number, special char
  - confirm password must match
  - OTP is 6 digits
  - business address max 200 chars
  - business license PDF/JPEG/PNG max 5MB
- Flow:
  - submit registration
  - OTP sent
  - verify OTP
  - account created but inactive
  - admin reviews and approves/rejects
  - if approved, wholesaler completes profile
- Admin approval panel includes:
  - pending accounts grid
  - document preview
  - approve/reject toggle
  - bulk actions
- Notifications:
  - OTP sent
  - registration successful
  - account approved
  - account rejected
  - new account notification to admin

#### 12.2.2 Wholesaler Login System

- Login methods:
  - mobile + password
  - Google OAuth
- Redirect to wholesaler panel dashboard after success.
- Security:
  - bcrypt password hashing
  - 3 failed attempts -> account lock for 30 minutes
  - JWT/session token expires after 12 hours inactivity
- Screen elements:
  - mobile number
  - password
  - login button
  - Google OAuth
  - forgot password
  - error messages
- Notifications:
  - successful login
  - failed attempt
  - account locked
  - new device login

#### 12.2.3 Wholesaler Profile Management

- Editable personal info:
  - name
  - email
  - phone
  - profile picture
- Editable business info:
  - business name
  - business address
  - GST number
  - business license
- Rules:
  - name min 3
  - valid email
  - valid phone with country code
  - profile image JPG/PNG max 2MB
  - business address max 200 chars
  - business license PDF/JPEG/PNG max 5MB
- Notifications:
  - profile update confirmation
  - document upload success

#### 12.2.4 Wholesaler Dashboard

- KPI cards:
  - total products added
  - orders received
  - net revenue after 10% commission
  - average order value
- Visualizations:
  - sales trend
  - order status donut/pie
  - product performance heatmap
  - customer geography map overlay
- Filters:
  - date range
  - product category
  - order status
- Notifications:
  - low stock
  - order spike
  - payment delay
- Sample metrics preserved:
  - products 150
  - orders 500
  - revenue $45,000 after commission

#### 12.2.5 Wholesaler Product Management

- Wholesaler can:
  - add product
  - edit product
  - delete product
  - upload images/videos
  - manage variants
  - view approval status
- Product fields:
  - name
  - description
  - price
  - category
  - stock details
  - variants
  - images
  - videos
- Rules:
  - name min 3
  - description max 500
  - price positive
  - category from predefined list
  - image JPG/PNG max 2MB each
  - video MP4 max 50MB
  - SKU auto-fill like WH-10025
- Product list filters:
  - approval status
  - stock status
  - search
- Notifications:
  - product approved
  - product rejected
  - new submission alert to admin

#### 12.2.6 Orders from Customer

- Wholesaler sees orders received from customer/retailer flow.
- Can:
  - view orders by status
  - mark shipped
  - mark delivered
  - cancel order
  - ship to admin
- Pending orders view:
  - order ID
  - customer
  - items
  - ship by deadline
  - actions ship/cancel
- Shipped orders view:
  - order ID
  - carrier
  - tracking #
  - estimated delivery
  - mark delivered
- Delivered orders view:
  - order ID
  - delivery date
  - customer
  - rating
- Notifications to admin:
  - order shipped
  - order delivered
  - order canceled

#### 12.2.7 Wholesaler Payment System

- Wholesaler gets paid after final customer delivery.
- Admin enables withdrawal for eligible orders.
- System deducts 10% platform/service commission.
- Example:
  - order amount $1,000
  - commission $100
  - payable $900
- Dashboard fields:
  - wholesaler name
  - order ID
  - order amount
  - commission 10%
  - payable amount
  - withdrawal status
  - withdrawal request button
- Withdrawal form:
  - amount
  - bKash number
- Rules:
  - minimum withdrawal tk. 100
  - processing time 1-3 business days
  - dispute period 7 days
- Features:
  - admin-controlled withdrawals
  - batch payouts
  - encrypted records
  - two-step payout verification
- Notifications:
  - withdrawal enabled
  - payout completed

#### 12.2.8 Wholesaler Reports and Analytics

- Includes:
  - sales reports
  - order reports
  - revenue after 10% commission
  - average order value
  - order volume
  - growth comparison
- Frequencies:
  - daily
  - weekly
  - monthly
- Visualizations:
  - pie
  - bar
  - line
- Export:
  - PDF
  - Excel
- Example growth:
  - January 2023: $300,000
  - December 2022: $260,000
  - growth 15%

### 12.3 Retailer Panel

#### 12.3.1 Retailer Registration with OTP and Admin Approval

- Separate retailer registration form.
- Common fields:
  - account type
  - name
  - email
  - mobile
  - password
  - confirm password
  - OTP
  - resend OTP
- Retailer-specific fields:
  - store name
  - store address
  - PAN number
  - PAN card upload
- Rules:
  - name minimum 3
  - valid email
  - valid mobile with country code
  - password complexity
  - OTP 6 digits
  - store address max 200
  - PAN card PDF/JPEG/PNG max 5MB
- Flow:
  - submit registration
  - receive OTP
  - verify OTP
  - account created inactive
  - admin reviews and approves/rejects
  - approved retailer gains access
- Notifications:
  - OTP sent
  - registration successful
  - account approved
  - account rejected
  - new account notification to admin

#### 12.3.2 Retailer Login

- Login via:
  - mobile number + password
  - Google OAuth
- Redirect to retailer panel dashboard.
- Security:
  - 3 failed attempts -> 30 minute lock
  - reset link by email
  - JWT/session issuance
- Notifications:
  - successful login
  - failed attempt
  - account locked
  - new device login

#### 12.3.3 Retailer Profile Management

- Editable personal info:
  - name
  - email
  - mobile
  - profile picture
- Editable business info:
  - shop/store name
  - shop address
  - trade license number
  - document upload
- Rules:
  - name minimum 3
  - valid email
  - valid phone with country code
  - image JPG/PNG max 2MB
  - business address max 200
  - document PDF/JPEG/PNG max 5MB
- Notifications:
  - profile updated
  - document upload success

#### 12.3.4 Retailer Dashboard

- Shows:
  - total orders placed
  - revenue earned after 10% commission
  - products marketed
  - sales trends
  - order status distribution
  - revenue growth
- Includes:
  - search
  - date/category/status filters
- Sample metrics:
  - orders 500
  - revenue $45,000
  - products marketed 150

#### 12.3.5 Retailer Product Catalog

- Centralized catalog of wholesaler products without revealing wholesaler identity.
- Retailer can:
  - browse
  - search
  - filter by category, price, popularity, new arrivals
  - view product details
  - download high-resolution images/videos
- Catalog view:
  - product name
  - category
  - price
  - description
  - image gallery
  - optional video
  - download buttons
- Rules:
  - wholesaler identity hidden
  - only admin-approved retailer-available products visible
  - media max download size per file 10MB
  - watermark optional
  - secure CDN-style storage
- Notifications:
  - new product available
  - media update

#### 12.3.6 Retailer Store Management System

- Retailer can create and manage own storefront.
- Inputs:
  - store name
  - address
  - contact number
  - trade license
  - subdomain/custom domain
- Product assignment:
  - choose approved wholesaler products
  - set selling price
  - manage stock
  - control image/video display
- Pricing rule:
  - selling price must be >= wholesale price
  - profit auto-calculated
- Store list dashboard:
  - store name
  - domain
  - products count
  - status toggle
  - edit store
- Rules:
  - domain unique
  - DNS validation required
  - license upload PDF/JPG/PNG max 5MB
- Notifications:
  - store approved
  - low stock
  - domain setup failed

#### 12.3.7 Retailer Order Management System

- Supports two order sources:
  1. external marketing orders
  2. storefront customer orders
- Tracks stages:
  - Pending
  - Shipped from Wholesaler
  - Received from Wholesaler
  - Sent to Customer
  - Payment Done
- Retailer can:
  - manually place order on behalf of customer
  - manage storefront orders
  - monitor fulfillment
  - upload COD proof where required
- Interface:
  - Pending page with order source badge
  - Shipped page with tracking link and ETA
  - Received page with damage report and receive confirm state
  - Sent page with delivery agent and live map
  - Payment Done page with receipt upload and settlement badge
- Notifications:
  - order placed
  - shipped from wholesaler
  - received from wholesaler
  - sent to customer
  - payment done
- Special rules:
  - external marketing orders and storefront orders distinguished visually
  - customer data masked for wholesaler
  - returns/dispute with proof

#### 12.3.8 Retailer Delivery Tracking System

- Retailer can monitor full delivery journey.
- Stages:
  - Pending
  - Processing
  - Out for Delivery
  - Delivered
- Pending page fields:
  - order ID
  - order source
  - products
  - status
  - date placed
- Processing page:
  - order ID
  - admin status "Received at Warehouse"
  - products
  - received date
- Delivery page:
  - order ID
  - courier
  - tracking map
  - products
  - dispatch date
- Delivery done page:
  - order ID
  - retailer store
  - products
  - delivery date
- Requirements:
  - FedEx/Steadfast live tracking
  - auto-refresh
  - encrypted delivery metadata
  - auto-logging of status changes

#### 12.3.9 Retailer Payout Management System

- Manages retailer profit withdrawal after successful delivery and payment collection.
- Flow:
  - admin confirms customer payment
  - system calculates retailer profit
  - deducts 10% commission
  - marks order Ready to Withdraw
  - retailer requests payout to bKash
  - admin reviews and completes payout
- Example:
  - retailer profit tk. 250
  - commission tk. 25
  - net payable tk. 225
- Dashboard fields:
  - retailer name
  - order ID
  - profit amount
  - commission 10%
  - net payable
  - status
  - withdrawal button
  - bKash number field
- Rules:
  - minimum net withdrawal tk. 100
  - bKash only for now
  - processing 1-2 business days
  - dispute window 3 days
- Notifications:
  - ready to withdraw
  - withdrawal request sent to admin
  - payout completed

#### 12.3.10 Retailer Reports and Analytics

- Includes:
  - sales reports
  - order reports
  - revenue after 10% commission
  - average order value
  - order volume
  - growth comparison
- Frequencies:
  - daily
  - weekly
  - monthly
- Visualizations:
  - pie
  - bar
  - line
- Export:
  - PDF
  - Excel
- Example growth preserved:
  - January 2023: $300,000
  - December 2022: $260,000
  - growth 15%

### 12.4 Retailer Public eCommerce

#### 12.4.1 Homepage

- Must attract customers with:
  - featured product carousel
  - search bar
  - navigation menu
  - product grid
  - CTA buttons
- Fetch featured products and categories from database.
- CTA examples:
  - Shop Now
  - View Details
- Example categories:
  - Electronics
  - Clothing
  - Home Goods
- Example search placeholder:
  - Search for products

#### 12.4.2 Category and Product Listing Pages

- Products organized by category.
- Customer can:
  - browse
  - filter
  - sort
  - paginate
- Screen elements:
  - category list with counts
  - product grid/list with image/name/price/rating
  - filters
  - sort options
  - pagination
  - product count
- Filters:
  - price range
  - popularity
  - brand
  - newest

#### 12.4.3 Product Details Page

- Shows:
  - images
  - video
  - description
  - price
  - discount
  - stock status
  - reviews
  - quantity selector
  - add to cart
  - buy now
  - related products
- Example preserved:
  - Product A
  - price $100
  - discounted $90
  - stock in stock
  - rating 4.5/5 from 50 reviews

#### 12.4.4 Shopping Cart Page

- Customer can:
  - review items
  - update quantity
  - remove item
  - see subtotal/discount/shipping/total
  - continue shopping
  - proceed to checkout
- Example preserved:
  - Product A 1 x $90
  - Product B 3 x $50
  - subtotal $240
  - discount $10
  - shipping $5
  - total $235

#### 12.4.5 Customer Registration with OTP

- New customer can create account with:
  - name
  - email
  - mobile
  - password
  - confirm password
  - OTP verification
- Rules:
  - name min 3
  - valid email
  - valid mobile with country code
  - password complexity
  - OTP 6 digits
  - resend OTP allowed
- Flow:
  - submit registration
  - receive OTP
  - verify OTP
  - create account
  - redirect to profile/dashboard
- Notifications:
  - OTP sent
  - registration successful
  - resend OTP
  - new account notification to admin

#### 12.4.6 Checkout Page

- Customer provides:
  - shipping address
  - city
  - postal code
  - phone
  - payment method
- Payment option in current scope:
  - Cash on Delivery
- System:
  - validates address/payment
  - generates order ID
  - shows order summary
  - notifies customer/admin/retailer as applicable
- Example order ID:
  - ORD12345

#### 12.4.7 Order Confirmation Page

- Shows:
  - confirmation message
  - order ID
  - order summary
  - estimated delivery date
  - tracking link
  - continue shopping button
- Example:
  - order ID ORD12345
  - total $235
  - delivery by January 30, 2023

### 12.5 Admin Public eCommerce Store

Admin public store includes the same customer-facing purchase flow as retailer public eCommerce, but under the admin-managed storefront and catalog rules.

#### 12.5.1 Admin Store Homepage

- featured products
- search bar
- navigation menu
- category-organized product visibility
- CTA buttons
- visually attractive layout preserving existing design

#### 12.5.2 Admin Store Category and Product Listing

- category-based browsing
- filters
- sorting
- pagination
- product count
- product grid/list

#### 12.5.3 Admin Store Product Details

- images
- videos
- descriptions
- pricing
- availability
- customer reviews
- quantity selector
- add to cart
- buy now
- related products

#### 12.5.4 Admin Store Shopping Cart

- cart item review
- quantity update
- remove item
- subtotal/discount/shipping/total
- continue shopping
- proceed to checkout

#### 12.5.5 Customer Registration with OTP for Admin Store

- same customer registration and OTP verification flow applies
- customer account creation
- profile redirection
- admin monitoring access

#### 12.5.6 Admin Store Checkout

- shipping address capture
- COD selection
- order summary
- place order
- order ID generation
- customer/admin notifications

#### 12.5.7 Admin Store Order Confirmation

- success message
- order ID
- summary
- estimated delivery date
- tracking link
- continue shopping

---

## 13. Validation and Business Rules Summary

### Auth and Registration

- Email must be valid where email login is used.
- Mobile number must include country code where mobile-based auth is used.
- Password minimum 8 characters.
- Password complexity required for wholesaler, retailer, and customer registration:
  - uppercase
  - lowercase
  - number
  - special character
- OTP is 6 digits.
- Account lock after 3 failed login attempts.
- Admin/retailer/wholesaler account lock can trigger password reset email.

### Profile and Documents

- Name minimum 3 characters.
- Personal profile picture JPG/PNG max 2MB.
- Business documents PDF/JPEG/PNG max 5MB unless specifically broader.
- Business address max 200 characters where specified.

### Product

- Product name minimum 3 characters.
- Product description max 500 characters where specified.
- Product price must be positive.
- Product images JPG/PNG max 2MB each.
- Product videos MP4 max 50MB.
- Admin markup minimum 5%, maximum 50%, rounded to 2 decimals.

### Store

- Selling price must be greater than or equal to wholesale price where retailer sets own price.
- Domain/subdomain must be unique.
- DNS validation required for public store domains.

### Payment and Payout

- Platform commission is 10%.
- Commission formulas must be applied consistently.
- Wholesaler payout request minimum tk. 100 in payout module.
- Retailer payout minimum net amount tk. 100.
- Admin commission module minimum withdrawal rule tk. 50 must be preserved where used for commission release dashboards.
- Payout status states include:
  - Ready
  - Pending Approval
  - Paid
  - Processed
  - Rejected

### Delivery and Tracking

- Damage report requires photo evidence.
- Tracking sync every 15 minutes where specified.
- Live map every 5 minutes where specified.

---

## 14. Notification Matrix

Major notification categories to implement:

- Auth
  - login successful
  - failed login attempt
  - account locked
  - password reset link sent
  - new device login
- Registration and Approval
  - OTP sent
  - registration successful
  - account approved
  - account rejected
  - new account pending approval
- Profile
  - profile updated
  - document upload success
- Product
  - product approved
  - product rejected
  - new product pending review
  - product now live
- Store
  - store approved
  - low stock alert
  - domain setup failure
- Order
  - order placed
  - shipped from wholesaler
  - received from wholesaler
  - sent to customer
  - delivered
  - order canceled
  - COD confirmed
- Payout
  - withdrawal enabled
  - withdrawal request sent
  - payout completed
- Catalog
  - new product available
  - media update

Channels:

- SMS
- Email
- In-app notifications

---

## 15. Recommended Phase-to-Module Build Order

| Phase | Modules |
|---|---|
| 0 | repo restructuring, route inventory, design freeze, domain model |
| 1 | App Router migration, shared layouts, i18n, auth shell, tenant middleware |
| 2 | identity-service, profile-service, onboarding approval, customer registration |
| 3 | admin dashboard, wholesaler management, retailer management, admin profile |
| 4 | catalog-service, admin product moderation, wholesaler product management |
| 5 | order-orchestration-service, wholesaler orders, admin order flow |
| 6 | store-service, retailer catalog, retailer store management |
| 7 | retailer order management, delivery tracking, customer storefront flows |
| 8 | payment-commission-service, wholesaler payments, retailer payouts, commission dashboards |
| 9 | report-analytics-service, exports, advanced dashboards |
| 10 | notification automation, hardening, UAT, deployment |

---

## 16. Acceptance Criteria by Milestone

### Milestone A: Migration Ready

- App Router structure exists.
- Current public design is preserved.
- Admin shell, auth shell, retailer shell, and wholesaler shell exist.

### Milestone B: Identity Ready

- Admin, wholesaler, retailer, and customer auth flows work.
- OTP flow works.
- account lock/reset works.
- role-based redirects work.

### Milestone C: Admin Ready

- Admin can manage wholesalers, retailers, products, stores, and orders.
- Admin dashboard KPIs render from backend APIs.

### Milestone D: Supply Side Ready

- Wholesaler can onboard, login, manage profile, manage products, manage orders, and request payout.

### Milestone E: Reseller Side Ready

- Retailer can onboard, login, manage profile, browse anonymous catalog, create stores, manage orders, and request payout.

### Milestone F: Public Commerce Ready

- Retailer and admin public storefronts support browse, cart, checkout, registration, and order confirmation.

### Milestone G: Operations Ready

- Delivery tracking, commission, notification, reporting, and export systems function end to end.

---

## 17. Advanced System Recommendations

To make the system stronger than the base description while keeping all required features:

1. Use event-driven notifications.
2. Add audit logs for all approval, payout, and status changes.
3. Add role- and tenant-aware permission middleware.
4. Add domain-based store resolver for admin/retailer public stores.
5. Add background jobs for:
   - SMS
   - Email
   - report exports
   - carrier sync
   - watermark/media processing
6. Add CQRS-style application services per module for cleaner maintenance.
7. Add API contracts and DTOs between frontend and backend for predictable integration.
8. Add dashboard caching for heavy chart endpoints.
9. Add soft-delete and reversal windows where business rules require 30-day recovery.
10. Add observability:
    - request logging
    - job monitoring
    - error tracking
    - business event tracking

---

## 18. Final Implementation Direction

The project should now proceed in this order:

1. Restructure repo into `frontend/` and `backend/`.
2. Freeze and preserve current design/assets/components.
3. Convert frontend from `pages/` to `app/` without breaking visual behavior.
4. Build backend as module-wise microservice-ready Laravel services.
5. Implement identity and onboarding first.
6. Complete admin operational modules.
7. Complete wholesaler and retailer business panels.
8. Complete public storefronts and purchase flow.
9. Finish order, delivery, payment, commission, and analytics integrations.
10. Harden, test, and deploy.

This document is the master scope reference for the complete ClickMaart rebuild.
