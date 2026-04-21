import AdminSidebar from '../components/common/AdminSidebar';
import AdminHeader from '../components/common/AdminHeader';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="admin-layout flex min-h-screen">
      <AdminSidebar />
      <div className="admin-content ml-64 flex-1">
        <AdminHeader />
        <main className="mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;