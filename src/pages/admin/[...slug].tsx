import AdminLayout from "@/admin/layouts/AdminLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    // If the path doesn't match any known admin routes, redirect to 404
    const validRoutes = [
      '/admin',
      '/admin/dashboard',
      '/admin/wholesalers',
      // Add all other valid admin routes here
    ];

    if (!validRoutes.includes(router.pathname)) {
      router.replace('/admin/404');
    }
  }, [router.pathname]);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
        <p>This page is under construction.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;