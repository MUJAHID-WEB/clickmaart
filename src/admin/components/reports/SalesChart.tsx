// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const SalesChart = ({ salesData }: { salesData: { date: string; amount: number }[] }) => {
//   const data = {
//     labels: salesData.map(item => new Date(item.date).toLocaleDateString()),
//     datasets: [
//       {
//         label: 'Sales Amount',
//         data: salesData.map(item => item.amount),
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1,
//         fill: true,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'Sales Over Time',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value: number) => `$${value.toFixed(2)}`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="card bg-base-100 shadow">
//       <div className="card-body">
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default SalesChart;