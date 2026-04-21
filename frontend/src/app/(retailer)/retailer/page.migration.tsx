import PanelShell from "@/modules/shared/components/PanelShell";

export default function RetailerWorkspacePage() {
  return (
    <PanelShell
      eyebrow="Retailer Panel"
      title="Retailer panel migration is now live"
      description="This route group now owns retailer onboarding, dashboard reporting, catalog browsing, store management, order tracking, payout workflows, reporting, and profile updates."
      highlights={[
        "Retailer registration with OTP",
        "Retailer login",
        "Retailer dashboard",
        "Retailer product catalog",
        "Retailer store management",
        "Retailer order management",
        "Retailer delivery tracking",
        "Retailer payout management",
        "Retailer reports and analytics",
        "Retailer profile management",
      ]}
    />
  );
}
