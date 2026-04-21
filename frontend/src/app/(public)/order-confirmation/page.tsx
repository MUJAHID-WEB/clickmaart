import StorefrontRouteRenderer from "@/modules/store/components/StorefrontRouteRenderer";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <StorefrontRouteRenderer
      segments={["order-confirmation"]}
      orderId={orderId}
    />
  );
}
