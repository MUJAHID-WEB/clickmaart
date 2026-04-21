# Frontend Modules

The `src/modules` directory is the target feature-first home for ClickMaart frontend code.

Planned modules:

- `shared`
- `auth`
- `admin`
- `wholesaler`
- `retailer`
- `customer`
- `catalog`
- `store`
- `order`
- `payment`
- `report`
- `delivery`
- `notification`

Migration rule:

- New App Router work should prefer `src/modules`.
- Legacy code in `src/components`, `src/admin`, and `src/pages` will be moved gradually.
