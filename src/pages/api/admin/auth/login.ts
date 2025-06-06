// import { NextApiRequest, NextApiResponse } from 'next';
// import { withAdminSession } from '../../../../lib/adminAuth';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     // In a real app, you would check against your database
//     const adminUser = await verifyAdminCredentials(email, password);
    
//     if (!adminUser) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Set session
//     req.session.admin = {
//       id: adminUser.id,
//       email: adminUser.email,
//       role: adminUser.role,
//     };
    
//     await req.session.save();
    
//     res.status(200).json({ admin: adminUser });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export default withAdminSession(handler);