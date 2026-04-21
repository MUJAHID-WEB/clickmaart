import AdminHeader from "@/admin/components/common/AdminHeader";
import AdminSidebar from "@/admin/components/common/AdminSidebar";

export default function AdminRouteMigrationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout flex min-h-screen">
      <AdminSidebar />
      <div className="admin-content ml-64 flex-1">
        <AdminHeader />
        <main className="mt-16">{children}</main>
      </div>
    </div>
  );
}
