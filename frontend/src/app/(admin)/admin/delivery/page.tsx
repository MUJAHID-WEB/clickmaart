import AdminDeliveryTrackingPage from "@/modules/admin/components/AdminDeliveryTrackingPage";
import { getAdminDeliverySnapshot } from "@/modules/admin/server/getAdminOperationsSnapshot";

export default async function AdminDeliveryTrackingRoute() {
  const snapshot = await getAdminDeliverySnapshot();

  return (
    <AdminDeliveryTrackingPage
      journeys={snapshot.journeys}
      integrations={snapshot.integrations}
      automationRules={snapshot.automation}
    />
  );
}
