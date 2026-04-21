import PanelShell from "@/modules/shared/components/PanelShell";

export default function RetailerWorkspacePage() {
  return (
    <PanelShell
      eyebrow="Retailer Panel"
      title="Retailer panel migration workspace is ready"
      description="This route group becomes the App Router home for retailer onboarding, dashboard reporting, catalog browsing, store management, order tracking, payout workflows, and profile updates."
      highlights={[
        "Retailer registration with OTP",
        "Retailer login",
        "Retailer dashboard",
        "Retailer product catalog",
        "Retailer store management",
        "Retailer order management",
        "Retailer payout management",
        "Retailer profile management",
      ]}
    />
  );
}
