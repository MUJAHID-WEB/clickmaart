import PanelShell from "@/modules/shared/components/PanelShell";

export default function WholesalerWorkspacePage() {
  return (
    <PanelShell
      eyebrow="Wholesaler Panel"
      title="Wholesaler panel migration workspace is ready"
      description="This route group is reserved for wholesaler-specific flows including onboarding approval, login, dashboard insights, product catalog management, order processing, payment requests, reports, and profile management."
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
    />
  );
}
