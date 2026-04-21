import LegacyAdminPlaceholder from "@/admin/components/common/LegacyAdminPlaceholder";
import AdminLayout from "@/admin/layouts/AdminLayout";

export default function AdminProductDetailLegacyPage() {
  return (
    <AdminLayout>
      <LegacyAdminPlaceholder
        title="Product Detail Route Is Deferred"
        description="The App Router moderation queues are live, but the deeper product detail review screen is intentionally reserved for a later admin expansion step."
        primaryHref="/admin/products"
        primaryLabel="Open Product Moderation"
        secondaryText="Use the live product overview and status routes for current admin work."
      />
    </AdminLayout>
  );
}
