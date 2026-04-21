import StorefrontRouteRenderer from "@/modules/store/components/StorefrontRouteRenderer";

export default async function RetailerStorefrontPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ storeSlug: string; slug?: string[] }>;
  searchParams: Promise<{ orderId?: string }>;
}) {
  const [{ storeSlug, slug }, { orderId }] = await Promise.all([
    params,
    searchParams,
  ]);

  return (
    <StorefrontRouteRenderer
      segments={slug ?? []}
      orderId={orderId}
      previewSurface="retailer-store"
      previewTenantKey={storeSlug}
      previewBasePath={`/storefront-preview/retailer/${storeSlug}`}
    />
  );
}
