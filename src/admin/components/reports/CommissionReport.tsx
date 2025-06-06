// import { Commission } from '../../../../types';

// const CommissionReport = ({ commissions }: { commissions: Commission[] }) => {
//   const totalCommission = commissions.reduce(
//     (sum, commission) => sum + commission.amount,
//     0
//   );

//   return (
//     <div>
//       <div className="stats shadow mb-6">
//         <div className="stat">
//           <div className="stat-title">Total Commission</div>
//           <div className="stat-value">${totalCommission.toFixed(2)}</div>
//           <div className="stat-desc">From {commissions.length} transactions</div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th>Transaction ID</th>
//               <th>Order ID</th>
//               <th>Wholesaler</th>
//               <th>Retailer</th>
//               <th>Order Amount</th>
//               <th>Commission (10%)</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {commissions.map(commission => (
//               <tr key={commission.id}>
//                 <td>#{commission.id}</td>
//                 <td>#{commission.orderId}</td>
//                 <td>{commission.wholesaler.name}</td>
//                 <td>{commission.retailer.name}</td>
//                 <td>${commission.orderAmount.toFixed(2)}</td>
//                 <td>${commission.amount.toFixed(2)}</td>
//                 <td>{new Date(commission.date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CommissionReport;