const frontendModules = [
  "shared",
  "auth",
  "admin",
  "wholesaler",
  "retailer",
  "customer",
  "catalog",
  "store",
  "order",
  "payment",
  "report",
  "delivery",
  "notification",
];

const backendServices = [
  "gateway-api",
  "identity-service",
  "user-profile-service",
  "onboarding-approval-service",
  "catalog-service",
  "store-service",
  "order-orchestration-service",
  "delivery-tracking-service",
  "payment-commission-service",
  "report-analytics-service",
  "notification-service",
  "media-document-service",
];

export default function MigrationStatusPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          Migration Status
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          ClickMaart monorepo foundation is now in progress
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
          The legacy Next.js frontend has been moved into the dedicated
          <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">
            frontend/
          </code>
          workspace. App Router route groups and backend service folders are now
          scaffolded so we can migrate feature by feature without losing the
          existing design.
        </p>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Frontend Module Targets
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {frontendModules.map((module) => (
                <li key={module} className="rounded-lg bg-white px-3 py-2">
                  {module}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Backend Service Targets
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {backendServices.map((service) => (
                <li key={service} className="rounded-lg bg-white px-3 py-2">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-semibold text-amber-900">Next Build Step</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            Next up is moving shared UI and route logic from the legacy Pages
            Router into App Router-safe modules, then connecting the new
            Laravel API services module by module.
          </p>
        </section>
      </div>
    </main>
  );
}
