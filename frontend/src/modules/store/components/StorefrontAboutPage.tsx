import type { StorefrontSnapshot } from "../data/storefrontData";

export default function StorefrontAboutPage({
  snapshot,
}: {
  snapshot: StorefrontSnapshot;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            About {snapshot.storeName}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            {snapshot.description}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            This storefront is powered by the shared ClickMaart commerce shell so
            product discovery, cart, checkout, order confirmation, and customer
            registration remain consistent across core, admin, and retailer
            public experiences.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Storefront Highlights
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            {snapshot.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
