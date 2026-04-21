import AdminCommissionPage from "@/modules/admin/components/AdminCommissionPage";
import { getAdminCommissionSnapshot } from "@/modules/admin/server/getAdminOperationsSnapshot";

export default async function AdminCommissionRoute() {
  const snapshot = await getAdminCommissionSnapshot();

  return (
    <AdminCommissionPage
      settlements={snapshot.settlements}
      automationRules={snapshot.automation}
    />
  );
}
