// import { useState } from 'react';
// import { Wholesaler } from '../../../../types';

// const WholesalerTable = ({ wholesalers }: { wholesalers: Wholesaler[] }) => {
//   const [currentWholesalers, setCurrentWholesalers] = useState(wholesalers);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredWholesalers = currentWholesalers.filter(wholesaler =>
//     wholesaler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     wholesaler.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleStatusChange = async (id: string, status: 'active' | 'suspended') => {
//     const response = await fetch(`/api/admin/wholesalers/${id}/status`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status }),
//     });
    
//     if (response.ok) {
//       setCurrentWholesalers(currentWholesalers.map(w => 
//         w.id === id ? { ...w, status } : w
//       ));
//     }
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search wholesalers..."
//           className="input input-bordered w-full max-w-xs"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Products</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredWholesalers.map(wholesaler => (
//               <tr key={wholesaler.id}>
//                 <td>{wholesaler.name}</td>
//                 <td>{wholesaler.email}</td>
//                 <td>{wholesaler.productCount}</td>
//                 <td>
//                   <span className={`badge ${wholesaler.status === 'active' ? 'badge-success' : 'badge-error'}`}>
//                     {wholesaler.status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleStatusChange(
//                         wholesaler.id, 
//                         wholesaler.status === 'active' ? 'suspended' : 'active'
//                       )}
//                       className={`btn btn-sm ${wholesaler.status === 'active' ? 'btn-error' : 'btn-success'}`}
//                     >
//                       {wholesaler.status === 'active' ? 'Suspend' : 'Activate'}
//                     </button>
//                     <a 
//                       href={`/admin/wholesalers/${wholesaler.id}`}
//                       className="btn btn-sm btn-info"
//                     >
//                       Details
//                     </a>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WholesalerTable;