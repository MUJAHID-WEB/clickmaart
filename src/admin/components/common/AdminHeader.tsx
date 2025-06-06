import { useRouter } from 'next/router';
import { FiLogOut, FiBell, FiMail, FiUser } from 'react-icons/fi';

const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-64 right-0 z-10">
      <div className="flex justify-between items-center px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {/* {router.pathname.split('/').pop()?.charAt(0).toUpperCase() + 
           router.pathname.split('/').pop()?.slice(1) || 'Dashboard'} */}
        </h2>
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100 relative">
            <FiBell className="text-gray-600 text-xl" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100 relative">
            <FiMail className="text-gray-600 text-xl" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <FiUser className="text-gray-600 text-xl" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-900 ml-4"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;