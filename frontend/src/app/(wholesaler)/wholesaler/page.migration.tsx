import PanelShell from "@/modules/shared/components/PanelShell";

export default function WholesalerWorkspacePage() {
  return (
    <PanelShell
      eyebrow="Wholesaler Panel"
      title="Wholesaler panel migration workspace is live"
      description="This route group now contains live wholesaler panel surfaces for dashboard insights, product management, order workflow, payout visibility, reports, and profile management."
      highlights={[
        "Wholesaler registration with OTP",
        "Wholesaler login",
        "Wholesaler dashboard",
        "Product management",
        "Orders from customer",
        "Wholesaler payment system",
        "Reports and analytics",
        "Wholesaler profile management",
      ]}
      actions={[
        { href: "/wholesaler/dashboard", label: "Open Dashboard" },
        { href: "/wholesaler/products", label: "Manage Products" },
        { href: "/wholesaler/orders", label: "View Orders" },
      ]}
    />
  );
}
