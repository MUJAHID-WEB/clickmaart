// import { useState, useEffect } from 'react';
// import { Order } from '../../../../types';

// const DeliveryTracking = ({ order }: { order: Order }) => {
//   const [trackingData, setTrackingData] = useState({
//     wholesaler: {
//       status: order.wholesalerStatus,
//       lastUpdated: order.wholesalerStatusUpdated,
//       trackingNumber: order.wholesalerTrackingNumber,
//     },
//     customer: {
//       status: order.customerStatus,
//       lastUpdated: order.customerStatusUpdated,
//       trackingNumber: order.customerTrackingNumber,
//     },
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const fetchTrackingInfo = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/admin/orders/${order.id}/tracking`);
//       if (response.ok) {
//         const data = await response.json();
//         setTrackingData(data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch tracking info:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(fetchTrackingInfo, 300000); // Refresh every 5 minutes
//     fetchTrackingInfo(); // Initial fetch
    
//     return () => clearInterval(interval);
//   }, [order.id]);

//   const getStatusBadge = (status: string) => {
//     const statusClasses = {
//       processing: 'bg-blue-100 text-blue-800',
//       shipped: 'bg-purple-100 text-purple-800',
//       'out_for_delivery': 'bg-orange-100 text-orange-800',
//       delivered: 'bg-green-100 text-green-800',
//     };
    
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status] || 'bg-gray-100'}`}>
//         {status.replace(/_/g, ' ')}
//       </span>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Wholesaler Tracking */}
//         <div className="card bg-base-100 shadow">
//           <div className="card-body">
//             <h2 className="card-title">Wholesaler to Admin</h2>
//             <div className="space-y-2">
//               <div>
//                 <span className="font-medium">Status:</span> {getStatusBadge(trackingData.wholesaler.status)}
//               </div>
//               <div>
//                 <span className="font-medium">Tracking #:</span> {trackingData.wholesaler.trackingNumber || 'N/A'}
//               </div>
//               <div>
//                 <span className="font-medium">Last Updated:</span> {new Date(trackingData.wholesaler.lastUpdated).toLocaleString()}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Customer Tracking */}
//         <div className="card bg-base-100 shadow">
//           <div className="card-body">
//             <h2 className="card-title">Admin to Customer</h2>
//             <div className="space-y-2">
//               <div>
//                 <span className="font-medium">Status:</span> {getStatusBadge(trackingData.customer.status)}
//               </div>
//               <div>
//                 <span className="font-medium">Tracking #:</span> {trackingData.customer.trackingNumber || 'N/A'}
//               </div>
//               <div>
//                 <span className="font-medium">Last Updated:</span> {new Date(trackingData.customer.lastUpdated).toLocaleString()}
//               </div>
//               {trackingData.customer.status === 'out_for_delivery' && (
//                 <div className="mt-4">
//                   <div className="font-medium mb-2">Live Location:</div>
//                   <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
//                     Map View (Integrated with FedEx/Steadfast API)
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button 
//           onClick={fetchTrackingInfo}
//           disabled={isLoading}
//           className="btn btn-sm btn-outline"
//         >
//           {isLoading ? 'Refreshing...' : 'Refresh Status'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeliveryTracking;