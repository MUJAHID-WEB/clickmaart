import AdminReportsPage from "@/modules/admin/components/AdminReportsPage";
import { getAdminReportSnapshot } from "@/modules/admin/server/getAdminOperationsSnapshot";

export default async function AdminCommissionReportsRoute() {
  const snapshot = await getAdminReportSnapshot("commissions");

  return (
    <AdminReportsPage
      view={snapshot.view}
      windows={snapshot.windows}
      exportJobs={snapshot.exports}
      automationRules={snapshot.automation}
    />
  );
}
