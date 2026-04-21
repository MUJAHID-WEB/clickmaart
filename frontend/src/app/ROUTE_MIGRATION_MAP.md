# Route Migration Map

This file tracks the move from legacy `src/pages` routes to `src/app` routes.

## Public Routes

| Legacy Route | App Router Route | Status | Notes |
| --- | --- | --- | --- |
| `src/pages/index.tsx` | `src/app/(public)/page.tsx` | Migrated | Uses `modules/store/components/PublicHomePage.tsx` |
| `src/pages/products/index.tsx` | `src/app/(public)/products/page.tsx` | Migrated | Uses `modules/catalog/components/ProductCatalogPage.tsx` |
| `src/pages/products/[id].tsx` | `src/app/(public)/products/[id]/page.tsx` | Migrated | Uses `modules/catalog/components/ProductDetailPage.tsx` |
| `src/pages/cart.tsx` | `src/app/(public)/cart/page.tsx` | Migrated | Uses `modules/order/components/CartRoutePage.tsx` |
| `src/pages/checkout.tsx` | `src/app/(public)/checkout/page.tsx` | Migrated | Uses `modules/order/components/CheckoutRoutePage.tsx` |
| `src/pages/order-confirmation.tsx` | `src/app/(public)/order-confirmation/page.tsx` | Migrated | Uses `modules/order/components/OrderConfirmationRoutePage.tsx` |
| `src/pages/about.tsx` | `src/app/(public)/about/page.tsx` | Migrated | Uses the storefront-aware about page inside the shared public shell |
| `src/pages/contact.tsx` | `src/app/(public)/contact/page.tsx` | Migrated | Uses the storefront-aware contact page inside the shared public shell |

## Admin Routes

| Legacy Route | App Router Route | Status | Notes |
| --- | --- | --- | --- |
| `src/pages/admin/index.tsx` | `src/app/(admin)/admin/page.tsx` | Migrated | `/admin` now redirects to `/admin/dashboard` from App Router |
| `src/pages/admin/[...slug].tsx` | `src/app/(admin)/admin/dashboard/page.tsx` | Migrated | Legacy catch-all retired so `/admin/dashboard` can be owned cleanly by App Router |
| `src/pages/admin/users/wholesalers.tsx` | `src/app/(admin)/admin/users/wholesalers/page.tsx` | Migrated | Legacy path now redirects to `/admin/wholesalers` |
| `src/pages/admin/users/retailers.tsx` | `src/app/(admin)/admin/users/retailers/page.tsx` | Migrated | Legacy path now redirects to `/admin/retailers` |
| `src/pages/admin/products/index.tsx` | `src/app/(admin)/admin/products/page.tsx` | Migrated | Product moderation overview now lives in App Router |
| `src/pages/admin/products/pending.tsx` | `src/app/(admin)/admin/products/pending/page.tsx` | Migrated | Pending moderation queue now lives in App Router |
| `src/pages/admin/orders/index.tsx` | `src/app/(admin)/admin/orders/page.tsx` | Migrated | Basic admin order queue now lives in App Router |
| `src/pages/admin/orders/id.tsx` | `src/app/(admin)/admin/orders/[id]/page.tsx` | Migrated | Detailed order orchestration now lives in App Router |
| `src/pages/admin/reports/sales.tsx` | `src/app/(admin)/admin/reports/sales/page.tsx` | Migrated | Sales analytics now live in App Router |
| `src/pages/admin/reports/commissions.tsx` | `src/app/(admin)/admin/reports/commissions/page.tsx` | Migrated | Commission analytics now live in App Router |
| `src/pages/admin/stores/index.tsx` | `src/app/(admin)/admin/stores/page.tsx` | Migrated | Admin store management now lives in App Router |
| `src/pages/admin/stores/id.tsx` | `src/app/(admin)/admin/stores/[id]/page.tsx` | Migrated | Store detail workflow now lives in App Router |
| `src/pages/admin/settings/profile.tsx` | `src/app/(admin)/admin/settings/profile/page.tsx` | Migrated | Admin profile management now lives in App Router |

## Auth Routes

| Legacy Route | App Router Route | Status | Notes |
| --- | --- | --- | --- |
| `src/pages/auth/signin.tsx` | `src/app/(auth)/auth/signin/page.tsx` | Migrated | Customer sign-in route using `modules/customer/components/CustomerLoginPage.tsx` |
| `src/pages/auth/signup.tsx` | `src/app/(auth)/auth/signup/page.tsx` | Migrated | Customer registration route using `modules/customer/components/CustomerRegistrationPage.tsx` |
| `src/pages/auth/forgot-password.tsx` | `src/app/(auth)/auth/forgot-password/page.tsx` | Migrated | Role-aware password reset intake |

## Registration Routes

| Legacy Route | App Router Route | Status | Notes |
| --- | --- | --- | --- |
| `src/pages/register/wholesaler.tsx` | `src/app/(auth)/register/wholesaler/page.tsx` | Migrated | Uses `modules/wholesaler/components/WholesalerRegistrationPage.tsx` |
| `src/pages/register/retailer.tsx` | `src/app/(auth)/register/retailer/page.tsx` | Migrated | Uses `modules/retailer/components/RetailerRegistrationPage.tsx` |

## App Router-Only Identity Routes

| Route | Purpose |
| --- | --- |
| `/admin/login` | Admin login |
| `/wholesaler/login` | Wholesaler login |
| `/wholesaler/verify-otp` | Wholesaler OTP verification |
| `/wholesaler/approval-status` | Wholesaler admin approval status |
| `/wholesaler/profile` | Wholesaler profile management |
| `/retailer/login` | Retailer login |
| `/retailer/verify-otp` | Retailer OTP verification |
| `/retailer/approval-status` | Retailer admin approval status |
| `/retailer/profile` | Retailer profile management |
| `/customer/login` | Customer login alias |
| `/customer/register` | Customer registration alias |
| `/customer/verify-otp` | Customer OTP verification |
| `/wholesaler-registration` | Redirect alias to `/register/wholesaler` |
| `/retailer-registration` | Redirect alias to `/register/retailer` |

## App Router-Only Admin Operations Routes

| Route | Purpose |
| --- | --- |
| `/admin/wholesalers` | Wholesaler management overview |
| `/admin/wholesalers/pending` | Pending wholesaler approvals |
| `/admin/wholesalers/approved` | Approved wholesaler operations |
| `/admin/wholesalers/rejected` | Rejected wholesaler review queue |
| `/admin/retailers` | Retailer management overview |
| `/admin/retailers/pending` | Pending retailer approvals |
| `/admin/retailers/approved` | Approved retailer operations |
| `/admin/retailers/rejected` | Rejected retailer review queue |
| `/admin/products` | Product moderation overview |
| `/admin/products/pending` | Pending product moderation queue |
| `/admin/products/approved` | Approved products and listing operations |
| `/admin/products/rejected` | Rejected product moderation queue |
| `/admin/orders` | Admin order operations overview |
| `/admin/orders/pending` | Pending order queue |
| `/admin/orders/shipped` | Shipped order queue |
| `/admin/orders/delivered` | Delivered order queue |
| `/admin/orders/{id}` | Detailed admin order lifecycle view |
| `/admin/delivery` | Delivery tracking and carrier health view |
| `/admin/commission` | Commission and settlement oversight |
| `/admin/reports` | Admin reporting overview |
| `/admin/reports/sales` | Admin sales analytics |
| `/admin/reports/commissions` | Admin commission analytics |
| `/admin/stores` | Admin store management overview |
| `/admin/stores/{id}` | Store detail and readiness view |
| `/admin/settings/profile` | Admin profile management |
| `/admin/profile` | Redirect alias to `/admin/settings/profile` |

## App Router-Only Wholesaler Business Routes

| Route | Purpose |
| --- | --- |
| `/wholesaler` | Redirect root to `/wholesaler/dashboard` |
| `/wholesaler/dashboard` | Wholesaler dashboard |
| `/wholesaler/products` | Product management overview |
| `/wholesaler/products/pending` | Pending product moderation queue |
| `/wholesaler/products/approved` | Approved wholesaler products |
| `/wholesaler/products/rejected` | Rejected wholesaler products |
| `/wholesaler/orders` | Order workflow overview |
| `/wholesaler/orders/pending` | Pending fulfillment queue |
| `/wholesaler/orders/shipped` | Orders shipped to admin |
| `/wholesaler/orders/payment-done` | Payment-done order queue |
| `/wholesaler/payments` | Wholesaler payment system |
| `/wholesaler/payouts` | Redirect alias to `/wholesaler/payments` |
| `/wholesaler/reports` | Wholesaler reports and analytics |

## App Router-Only Retailer Business Routes

| Route | Purpose |
| --- | --- |
| `/retailer` | Redirect root to `/retailer/dashboard` |
| `/retailer/dashboard` | Retailer dashboard |
| `/retailer/catalog` | Retailer catalog overview |
| `/retailer/catalog/live` | Live retailer catalog items |
| `/retailer/catalog/draft` | Draft retailer catalog items |
| `/retailer/catalog/low-stock` | Low-stock retailer catalog items |
| `/retailer/store` | Retailer store management |
| `/retailer/orders` | Retailer order workflow overview |
| `/retailer/orders/pending` | Pending retailer order queue |
| `/retailer/orders/in-delivery` | Active delivery-tracking queue |
| `/retailer/orders/completed` | Completed retailer order queue |
| `/retailer/payouts` | Retailer payout and commission surface |
| `/retailer/reports` | Retailer reports and analytics |

## App Router-Only Public Informational Routes

| Route | Purpose |
| --- | --- |
| `/about` | Storefront-aware about page |
| `/contact` | Storefront-aware contact page |

## App Router-Only Public Storefront Preview Routes

| Route | Purpose |
| --- | --- |
| `/storefront-preview/admin` | Preview admin public storefront homepage |
| `/storefront-preview/admin/products` | Preview admin public storefront catalog |
| `/storefront-preview/admin/products/{id}` | Preview admin public storefront product detail |
| `/storefront-preview/admin/cart` | Preview admin public storefront cart |
| `/storefront-preview/admin/checkout` | Preview admin public storefront checkout |
| `/storefront-preview/admin/order-confirmation` | Preview admin public storefront order confirmation |
| `/storefront-preview/admin/about` | Preview admin public storefront about page |
| `/storefront-preview/admin/contact` | Preview admin public storefront contact page |
| `/storefront-preview/retailer/{storeSlug}` | Preview retailer storefront homepage |
| `/storefront-preview/retailer/{storeSlug}/products` | Preview retailer storefront catalog |
| `/storefront-preview/retailer/{storeSlug}/products/{id}` | Preview retailer storefront product detail |
| `/storefront-preview/retailer/{storeSlug}/cart` | Preview retailer storefront cart |
| `/storefront-preview/retailer/{storeSlug}/checkout` | Preview retailer storefront checkout |
| `/storefront-preview/retailer/{storeSlug}/order-confirmation` | Preview retailer storefront confirmation |
| `/storefront-preview/retailer/{storeSlug}/about` | Preview retailer storefront about page |
| `/storefront-preview/retailer/{storeSlug}/contact` | Preview retailer storefront contact page |

## Retired Legacy Routes

| Legacy Route | Reason |
| --- | --- |
| `src/pages/admin/index.tsx` | Removed after `/admin` root ownership moved to App Router redirect |
| `src/pages/admin/[...slug].tsx` | Removed after the first admin App Router dashboard route became active |
| `src/pages/auth/signin.tsx` | Removed after App Router parity was created for sign-in |
| `src/pages/auth/signup.tsx` | Removed after App Router parity was created for sign-up |
| `src/pages/auth/forgot-password.tsx` | Removed after App Router parity was created for forgot password |
| `src/pages/about.tsx` | Removed after App Router parity was created for the storefront-aware about page |
| `src/pages/contact.tsx` | Removed after App Router parity was created for the storefront-aware contact page |
| `src/pages/register/wholesaler.tsx` | Removed after App Router parity was created for wholesaler registration |
| `src/pages/register/retailer.tsx` | Removed after App Router parity was created for retailer registration |
| `src/pages/admin/users/wholesalers.tsx` | Removed after App Router parity was created for the legacy wholesaler management path |
| `src/pages/admin/users/retailers.tsx` | Removed after App Router parity was created for the legacy retailer management path |
| `src/pages/admin/products/index.tsx` | Removed after App Router parity was created for the admin product overview route |
| `src/pages/admin/products/pending.tsx` | Removed after App Router parity was created for the pending product moderation route |
| `src/pages/admin/orders/index.tsx` | Removed after App Router parity was created for the admin order overview route |
| `src/pages/admin/orders/id.tsx` | Removed after App Router parity was created for the detailed admin order route |
| `src/pages/admin/reports/sales.tsx` | Removed after App Router parity was created for the admin sales analytics route |
| `src/pages/admin/reports/commissions.tsx` | Removed after App Router parity was created for the admin commission analytics route |
| `src/pages/admin/stores/index.tsx` | Removed after App Router parity was created for the admin store overview route |
| `src/pages/admin/stores/id.tsx` | Removed after App Router parity was created for the admin store detail route |
| `src/pages/admin/settings/profile.tsx` | Removed after App Router parity was created for admin profile management |

## Still Legacy

| Legacy Route | Reason |
| --- | --- |
| `src/pages/orders/[id].tsx` | Intentionally deferred until authenticated order-history behavior is defined in later phases |
| `src/pages/admin/products/id.tsx` | Product detail workflow remains deferred until a richer moderation detail flow is defined |
