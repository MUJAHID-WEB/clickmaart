# Session Providers

These providers are placeholder entry points for role-specific auth/session state during the App Router migration.

Current purpose:

- keep admin, wholesaler, and retailer route groups ready for future auth wiring
- avoid scattering session bootstrap code across page-level components
- give the migration a stable place to plug in Laravel identity APIs later

Available providers:

- `AdminSessionProvider.tsx`
- `WholesalerSessionProvider.tsx`
- `RetailerSessionProvider.tsx`
- `RoleSessionProvider.tsx`

Current behavior:

- starts in `bootstrapping`
- settles into `guest`
- can be extended later for token, profile, permission, and lock-state handling
