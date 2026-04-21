import StorefrontRouteRenderer from "@/modules/store/components/StorefrontRouteRenderer";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StorefrontRouteRenderer segments={["products", id]} />;
}
