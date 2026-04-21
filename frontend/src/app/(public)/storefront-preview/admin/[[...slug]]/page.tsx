import StorefrontRouteRenderer from "@/modules/store/components/StorefrontRouteRenderer";

export default async function AdminStorefrontPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ orderId?: string }>;
}) {
  const [{ slug }, { orderId }] = await Promise.all([params, searchParams]);

  return (
    <StorefrontRouteRenderer
      segments={slug ?? []}
      orderId={orderId}
      previewSurface="admin-store"
      previewTenantKey="admin-store"
      previewBasePath="/storefront-preview/admin"
    />
  );
}
