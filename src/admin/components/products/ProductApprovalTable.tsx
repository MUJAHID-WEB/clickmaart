// import { useState } from 'react';
// import { Product } from '../../../../types';

// const ProductApprovalTable = ({ products }: { products: Product[] }) => {
//   const [currentProducts, setCurrentProducts] = useState(products);

//   const handleApprove = async (productId: string) => {
//     const response = await fetch(`/api/admin/products/${productId}/approve`, {
//       method: 'PUT',
//     });
    
//     if (response.ok) {
//       setCurrentProducts(currentProducts.map(p => 
//         p.id === productId ? { ...p, status: 'approved' } : p
//       ));
//     }
//   };

//   const handleReject = async (productId: string, reason: string) => {
//     const response = await fetch(`/api/admin/products/${productId}/reject`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ reason }),
//     });
    
//     if (response.ok) {
//       setCurrentProducts(currentProducts.map(p => 
//         p.id === productId ? { ...p, status: 'rejected', rejectionReason: reason } : p
//       ));
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Wholesaler</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProducts.map(product => (
//             <tr key={product.id}>
//               <td>{product.name}</td>
//               <td>{product.wholesaler.name}</td>
//               <td>{product.category}</td>
//               <td>${product.price.toFixed(2)}</td>
//               <td>
//                 <span className={`badge ${product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
//                   product.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                   {product.status}
//                 </span>
//               </td>
//               <td>
//                 {product.status === 'pending' && (
//                   <div className="flex space-x-2">
//                     <button 
//                       onClick={() => handleApprove(product.id)}
//                       className="btn btn-sm btn-success"
//                     >
//                       Approve
//                     </button>
//                     <button 
//                       onClick={() => {
//                         const reason = prompt('Enter rejection reason:');
//                         if (reason) handleReject(product.id, reason);
//                       }}
//                       className="btn btn-sm btn-error"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductApprovalTable;