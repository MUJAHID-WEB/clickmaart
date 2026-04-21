import PanelShell from "@/modules/shared/components/PanelShell";

const workspaceLinks = [
  { href: "/workspace/admin", label: "Admin workspace" },
  { href: "/workspace/wholesaler", label: "Wholesaler workspace" },
  { href: "/workspace/retailer", label: "Retailer workspace" },
  { href: "/migration-status", label: "Migration status" },
];

export default function WorkspaceOverviewPage() {
  return (
    <PanelShell
      eyebrow="Migration Workspace"
      title="App Router migration workspace is active"
      description="These internal routes give us a safe place to scaffold the new Next.js App Router architecture without clashing with the existing Pages Router routes that still preserve the current production-facing design."
      highlights={[
        "Safe App Router entry pages",
        "No direct conflict with legacy routes",
        "Role-based workspace shells",
        "Feature-first module organization",
        "Backend microservice-ready mapping",
        "Incremental migration path",
      ]}
      actions={workspaceLinks}
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Public storefront migration",
            text: "Retailer and admin public eCommerce flows will move feature by feature once shared providers are App Router-safe.",
          },
          {
            title: "Panel migration",
            text: "Admin, wholesaler, and retailer role workspaces now have isolated landing pages for progressive migration.",
          },
          {
            title: "Backend alignment",
            text: "Each frontend workspace maps cleanly to module-wise Laravel services so the codebase stays easy to understand.",
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
