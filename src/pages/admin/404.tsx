import AdminLayout from "@/admin/layouts/AdminLayout";
import Link from "next/link";

const Admin404 = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist in the admin panel.
        </p>
        <Link href="/admin">
          <a className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Return to Dashboard
          </a>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default Admin404;