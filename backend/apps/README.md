# Backend Apps Reference

The folders inside `apps/` are reference service-boundary documents only.

They exist to preserve the phased planning work for domains such as identity, onboarding, catalog, orders, delivery, store, payment, reporting, notifications, and media. Files like `CONTRACT.md`, `*_CONTRACT.md`, and `*_EVENTS.md` are not runtime Laravel code.

## Use These Docs For

- phase history
- service-boundary planning
- extraction or microservice discussions
- comparing the implemented API against earlier contract drafts

## Do Not Treat These As

- executable services
- the current source of truth for API behavior
- a replacement for `backend/routes/api.php`, `backend/app/`, or `backend/tests/Feature/`

For the actual working backend, use the Laravel application in the rest of `backend/`.
