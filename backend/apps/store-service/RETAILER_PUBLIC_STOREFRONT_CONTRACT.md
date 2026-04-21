# Retailer Public Storefront Contract

This draft covers the Phase 6 retailer public storefront surface.

## Purpose

- expose retailer storefront metadata and public catalog projection
- provide store-specific merchandising, pricing, and visibility rules
- keep customer-facing homepage, catalog, cart, checkout, and confirmation aligned
- prepare verified domain and subdomain storefront delivery

## Draft Endpoints

- `GET /api/public/stores/{storeKey}`
- `GET /api/public/stores/{storeKey}/products`
- `GET /api/public/stores/{storeKey}/products/{productId}`
- `GET /api/public/stores/{storeKey}/collections`

## Response Shape

- storefront id
- store key
- store name
- verified domain or subdomain
- hero and campaign metadata
- visible catalog items
- store-specific pricing
- support contact data
- tenant resolution key

## Notes

- only active retailer stores should resolve publicly
- setup-pending stores should not become customer-checkout capable
- customer cart and checkout must remain on the shared public commerce shell
