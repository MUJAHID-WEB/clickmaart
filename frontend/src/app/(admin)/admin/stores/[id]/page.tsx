import { notFound } from "next/navigation";
import AdminStoreDetailPage from "@/modules/admin/components/AdminStoreDetailPage";
import { getAdminStoreDetailSnapshot } from "@/modules/admin/server/getAdminOperationsSnapshot";

export default async function AdminStoreDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const snapshot = await getAdminStoreDetailSnapshot(id);

  if (!snapshot.store) {
    notFound();
  }

  return (
    <AdminStoreDetailPage
      store={snapshot.store}
      automationRules={snapshot.automation}
    />
  );
}
