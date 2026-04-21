# Tenant Resolution Contract

This draft covers the Phase 6 gateway and tenant-resolution boundary for public storefront requests.

## Purpose

- resolve whether a request belongs to the core marketplace, admin public store, or retailer public store
- preserve locale and tenant headers for downstream services
- keep one public routing shell while allowing storefront-specific data loading

## Draft Resolution Inputs

- request host
- request pathname
- locale prefix
- verified admin store host list
- verified retailer store host list

## Expected Headers

- `x-clickmaart-tenant-host`
- `x-clickmaart-tenant-surface`
- `x-clickmaart-tenant-key`
- `x-clickmaart-locale`

## Surface Rules

- `core` for the shared marketplace experience
- `admin-store` for the admin-curated public store
- `retailer-store` for verified retailer storefronts

## Notes

- tenant resolution must happen before storefront data loading
- public routes should stay shared while data changes by tenant surface
- later phases will connect this contract to order, payout, and tracking APIs
