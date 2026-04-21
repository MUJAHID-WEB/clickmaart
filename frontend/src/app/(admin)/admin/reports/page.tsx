import AdminReportsPage from "@/modules/admin/components/AdminReportsPage";
import { getAdminReportSnapshot } from "@/modules/admin/server/getAdminOperationsSnapshot";

export default async function AdminReportsOverviewRoute() {
  const snapshot = await getAdminReportSnapshot("overview");

  return (
    <AdminReportsPage
      view={snapshot.view}
      windows={snapshot.windows}
      exportJobs={snapshot.exports}
      automationRules={snapshot.automation}
    />
  );
}
