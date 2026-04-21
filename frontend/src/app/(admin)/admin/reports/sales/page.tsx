import AdminReportsPage from "@/modules/admin/components/AdminReportsPage";
import { getAdminReportSnapshot } from "@/modules/admin/server/getAdminOperationsSnapshot";

export default async function AdminSalesReportsRoute() {
  const snapshot = await getAdminReportSnapshot("sales");

  return (
    <AdminReportsPage
      view={snapshot.view}
      windows={snapshot.windows}
      exportJobs={snapshot.exports}
      automationRules={snapshot.automation}
    />
  );
}
