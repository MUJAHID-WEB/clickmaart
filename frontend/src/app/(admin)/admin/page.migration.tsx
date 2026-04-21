import PanelShell from "@/modules/shared/components/PanelShell";

export default function AdminWorkspacePage() {
  return (
    <PanelShell
      eyebrow="Admin Panel"
      title="Admin dashboard workspace is scaffolded"
      description="This App Router admin entry marks the new workspace for admin-facing operations. The legacy admin UI remains preserved while dashboards, user management, product moderation, order orchestration, commission, reporting, and store operations are migrated module by module."
      highlights={[
        "Admin login and profile",
        "Admin dashboard KPIs",
        "Wholesaler management",
        "Retailer management",
        "Product moderation",
        "Order and delivery operations",
        "Commission and payout control",
        "Reports and analytics",
      ]}
    />
  );
}
