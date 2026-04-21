import AdminStoreManagementPage from "@/modules/admin/components/AdminStoreManagementPage";
import { getAdminStoreManagementSnapshot } from "@/modules/admin/server/getAdminOperationsSnapshot";

export default async function AdminStoresRoute() {
  const snapshot = await getAdminStoreManagementSnapshot();

  return (
    <AdminStoreManagementPage
      stores={snapshot.stores}
      automationRules={snapshot.automation}
    />
  );
}
