

import AdminLayout from "@/admin/layouts/AdminLayout";

const DashboardPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <StatsCards /> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* <SalesChart />
        <RecentActivity /> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;