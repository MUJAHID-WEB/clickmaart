// import { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { AdminUser } from '../../types';

// type AdminAuthContextType = {
//   admin: AdminUser | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   sendOTP: (email: string) => Promise<void>;
//   verifyOTP: (email: string, otp: string) => Promise<void>;
// };

// const AdminAuthContext = createContext<AdminAuthContextType>({
//   admin: null,
//   loading: true,
//   login: async () => {},
//   logout: () => {},
//   sendOTP: async () => {},
//   verifyOTP: async () => {},
// });

// export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [admin, setAdmin] = useState<AdminUser | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await fetch('/api/admin/auth/check');
//         if (response.ok) {
//           const data = await response.json();
//           setAdmin(data.admin);
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     checkAuth();
//   }, []);

//   const login = async (email: string, password: string) => {
//     const response = await fetch('/api/admin/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
    
//     if (response.ok) {
//       const data = await response.json();
//       setAdmin(data.admin);
//       router.push('/admin/dashboard');
//     } else {
//       throw new Error('Login failed');
//     }
//   };

//   const logout = async () => {
//     await fetch('/api/admin/auth/logout', { method: 'POST' });
//     setAdmin(null);
//     router.push('/admin/login');
//   };

//   // OTP functions would be similar

//   return (
//     <AdminAuthContext.Provider value={{ admin, loading, login, logout, sendOTP, verifyOTP }}>
//       {children}
//     </AdminAuthContext.Provider>
//   );
// };

// export const useAdminAuth = () => useContext(AdminAuthContext);