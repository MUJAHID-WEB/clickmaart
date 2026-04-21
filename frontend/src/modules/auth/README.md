# Auth Module

Responsibilities:

- admin, wholesaler, retailer, and customer authentication
- OTP verification flows
- Google OAuth integration
- password reset
- account locking and recovery UX

Current App Router coverage:

- `/auth` now redirects to `/auth/signin`
- `/auth/signin` for customer login
- `/auth/signup` for customer registration
- `/auth/forgot-password`
- `/admin/login`
- `/wholesaler/login`
- `/retailer/login`

Phase 2 coverage:

- customer registration + OTP
- customer login alias under `/customer/login`
- wholesaler login
- wholesaler registration + OTP + approval status
- retailer login
- retailer registration + OTP + approval status
- admin login
- role-aware forgot password
- profile management flow foundations for wholesaler and retailer
