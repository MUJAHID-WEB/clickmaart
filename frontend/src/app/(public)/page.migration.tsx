import PanelShell from "@/modules/shared/components/PanelShell";

const storefrontLinks = [
  { href: "/products", label: "Shared storefront catalog" },
  { href: "/storefront-preview/admin", label: "Admin storefront preview" },
  {
    href: "/storefront-preview/retailer/tech-haven",
    label: "Retailer storefront preview",
  },
  { href: "/migration-status", label: "Migration status" },
];

export default function PublicHomePage() {
  return (
    <PanelShell
      eyebrow="Public Workspace"
      title="Public storefront migration is now live"
      description="This App Router public entry now represents the live shared storefront shell for the core marketplace, admin public store, and retailer public stores while preserving the existing storefront design language."
      highlights={[
        "Retailer public website",
        "Admin public eCommerce store",
        "Category and product pages",
        "Cart and checkout flow",
        "Customer login and registration continuity",
        "Order confirmation flow",
      ]}
      actions={storefrontLinks}
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Retailer Storefront",
            text: "Retailer storefront preview routes now share the same public catalog, cart, checkout, and confirmation foundation.",
          },
          {
            title: "Admin Storefront",
            text: "Admin public commerce now has preview routes on top of the same tenant-aware storefront shell.",
          },
          {
            title: "Domain-aware Routing",
            text: "Tenant metadata now feeds storefront framing and will drive verified domain resolution in the next integration phase.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
          </div>
        ))}
      </section>
    </PanelShell>
  );
}
