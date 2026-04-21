# Admin Module

Responsibilities:

- admin dashboard
- user management
- product moderation
- order operations
- commission oversight
- reports and store administration

Current App Router coverage:

- `components/AdminLoginPage.tsx`
  - role-aware admin login route at `/admin/login`
- `components/AdminDashboardPage.tsx`
  - dashboard overview route at `/admin/dashboard`
  - reuses the migration-safe admin shell so the existing admin design stays intact
- `components/AdminWholesalersPage.tsx`
  - wholesaler management routes at:
    - `/admin/wholesalers`
    - `/admin/wholesalers/pending`
    - `/admin/wholesalers/approved`
    - `/admin/wholesalers/rejected`
- `components/AdminRetailersPage.tsx`
  - retailer management routes at:
    - `/admin/retailers`
    - `/admin/retailers/pending`
    - `/admin/retailers/approved`
    - `/admin/retailers/rejected`
- `components/AdminProductsPage.tsx`
  - product moderation routes at:
    - `/admin/products`
    - `/admin/products/pending`
    - `/admin/products/approved`
    - `/admin/products/rejected`
- `components/AdminOrdersPage.tsx`
  - admin order operation routes at:
    - `/admin/orders`
    - `/admin/orders/pending`
    - `/admin/orders/shipped`
    - `/admin/orders/delivered`
- `components/AdminOrderDetailPage.tsx`
  - detailed admin order lifecycle route at:
    - `/admin/orders/{id}`
- `components/AdminDeliveryTrackingPage.tsx`
  - delivery tracking route at:
    - `/admin/delivery`
- `components/AdminCommissionPage.tsx`
  - commission and payout oversight route at:
    - `/admin/commission`
- `components/AdminReportsPage.tsx`
  - reporting routes at:
    - `/admin/reports`
    - `/admin/reports/sales`
    - `/admin/reports/commissions`
- `components/AdminStoreManagementPage.tsx`
  - store administration route at:
    - `/admin/stores`
- `components/AdminStoreDetailPage.tsx`
  - store detail route at:
    - `/admin/stores/{id}`
- `components/AdminProfileManagementPage.tsx`
  - admin profile management route at `/admin/settings/profile`
  - alias route at `/admin/profile`
