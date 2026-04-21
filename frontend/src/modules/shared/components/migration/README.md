# Route Migration Wrappers

These wrappers are the bridge layer between the legacy `pages/` UI and the new App Router route groups.

Purpose:

- preserve the existing design while routes move gradually
- reuse shared header, footer, admin shell, and panel framing
- keep migration work obvious from the codebase structure

Available wrappers:

- `PublicRouteMigrationWrapper.tsx`
- `AdminRouteMigrationWrapper.tsx`
- `AuthRouteMigrationWrapper.tsx`
- `PanelRouteMigrationWrapper.tsx`

Usage:

- App Router layouts should compose these wrappers
- legacy pages remain intact until the equivalent App Router route is stable
