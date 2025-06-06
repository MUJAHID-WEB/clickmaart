// import { Order } from '../../../../types';

// const OrderTable = ({ orders }: { orders: Order[] }) => {
//   const getStatusBadge = (status: string) => {
//     const statusClasses = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       shipped: 'bg-blue-100 text-blue-800',
//       delivered: 'bg-green-100 text-green-800',
//       cancelled: 'bg-red-100 text-red-800',
//     };
    
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status] || 'bg-gray-100'}`}>
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Date</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//             <tr key={order.id}>
//               <td>#{order.id}</td>
//               <td>{order.customer.name}</td>
//               <td>{new Date(order.date).toLocaleDateString()}</td>
//               <td>${order.total.toFixed(2)}</td>
//               <td>{getStatusBadge(order.status)}</td>
//               <td>
//                 <a 
//                   href={`/admin/orders/${order.id}`}
//                   className="text-blue-600 hover:underline"
//                 >
//                   View
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderTable;