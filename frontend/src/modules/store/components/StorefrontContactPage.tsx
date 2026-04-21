import type { StorefrontSnapshot } from "../data/storefrontData";

export default function StorefrontContactPage({
  snapshot,
}: {
  snapshot: StorefrontSnapshot;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Store:</span>{" "}
              {snapshot.storeName}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Email:</span>{" "}
              {snapshot.supportEmail}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Phone:</span>{" "}
              {snapshot.supportPhone}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Domain:</span>{" "}
              {snapshot.domain}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Customer Support Coverage
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>Shared customer login and registration remain available from every storefront.</li>
            <li>Cart, checkout, and order-confirmation flows stay aligned with the same public commerce shell.</li>
            <li>Tenant-aware routing decides whether the request belongs to the core marketplace, admin store, or retailer store.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
