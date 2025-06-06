import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiHome, FiUsers, FiPackage, FiShoppingCart, FiDollarSign, FiTruck, FiBarChart2, FiSettings } from 'react-icons/fi';

const menuItems = [
  {
    name: 'Dashboard',
    icon: <FiHome className="mr-3" />,
    path: '/admin/dashboard',
    subItems: []
  },
  {
    name: 'Wholesalers',
    icon: <FiUsers className="mr-3" />,
    path: '/admin/wholesalers',
    subItems: [
      { name: 'Pending', path: '/admin/wholesalers/pending' },
      { name: 'Approved', path: '/admin/wholesalers/approved' },
      { name: 'Rejected', path: '/admin/wholesalers/rejected' }
    ]
  },
  {
    name: 'Retailers',
    icon: <FiUsers className="mr-3" />,
    path: '/admin/retailers',
    subItems: [
      { name: 'Pending', path: '/admin/retailers/pending' },
      { name: 'Approved', path: '/admin/retailers/approved' },
      { name: 'Rejected', path: '/admin/retailers/rejected' }
    ]
  },
  {
    name: 'Products',
    icon: <FiPackage className="mr-3" />,
    path: '/admin/products',
    subItems: [
      { name: 'Pending', path: '/admin/products/pending' },
      { name: 'Approved', path: '/admin/products/approved' },
      { name: 'Rejected', path: '/admin/products/rejected' }
    ]
  },
  {
    name: 'Orders',
    icon: <FiShoppingCart className="mr-3" />,
    path: '/admin/orders',
    subItems: [
      { name: 'Pending', path: '/admin/orders/pending' },
      { name: 'Shipped', path: '/admin/orders/shipped' },
      { name: 'Delivered', path: '/admin/orders/delivered' }
    ]
  },
  {
    name: 'Commission',
    icon: <FiDollarSign className="mr-3" />,
    path: '/admin/commission',
    subItems: []
  },
  {
    name: 'Delivery Tracking',
    icon: <FiTruck className="mr-3" />,
    path: '/admin/delivery',
    subItems: []
  },
  {
    name: 'Reports & Analytics',
    icon: <FiBarChart2 className="mr-3" />,
    path: '/admin/reports',
    subItems: []
  },
  {
    name: 'Store Management',
    icon: <FiSettings className="mr-3" />,
    path: '/admin/stores',
    subItems: []
  }
];

const AdminSidebar = () => {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (path: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <div key={item.path} className="mb-1">
            <div
              className={`flex items-center justify-between px-4 py-3 cursor-pointer ${router.pathname.startsWith(item.path) ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => {
                if (item.subItems.length > 0) {
                  toggleSubMenu(item.path);
                } else {
                  router.push(item.path);
                }
              }}
            >
              <div className="flex items-center">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.subItems.length > 0 && (
                expandedItems[item.path] ? <FiChevronUp /> : <FiChevronDown />
              )}
            </div>
            
            {item.subItems.length > 0 && expandedItems[item.path] && (
              <div className="bg-gray-900 pl-12">
                {item.subItems.map((subItem) => (
                  <Link href={subItem.path} key={subItem.path} passHref>
                    <div
                      className={`block px-4 py-2 cursor-pointer ${router.pathname === subItem.path ? 'text-blue-300' : 'hover:text-blue-200'}`}
                    >
                      {subItem.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;