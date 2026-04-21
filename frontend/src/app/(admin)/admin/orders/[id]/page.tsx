import { notFound } from "next/navigation";
import AdminOrderDetailPage from "@/modules/admin/components/AdminOrderDetailPage";
import { getAdminOrderDetailSnapshot } from "@/modules/admin/server/getAdminOperationsSnapshot";

export default async function AdminOrderDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const snapshot = await getAdminOrderDetailSnapshot(id);

  if (!snapshot.order) {
    notFound();
  }

  return (
    <AdminOrderDetailPage
      order={snapshot.order}
      journeys={snapshot.journeys}
      settlements={snapshot.settlements}
    />
  );
}
