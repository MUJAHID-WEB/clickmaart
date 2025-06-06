// import { useState } from 'react';
// import { Store } from '../../../../types';

// const StoreForm = ({ store, onSave }: { store?: Store; onSave: (store: Store) => void }) => {
//   const [formData, setFormData] = useState<Store>(store || {
//     id: '',
//     name: '',
//     domain: '',
//     address: '',
//     contactNumber: '',
//     tradeLicense: '',
//     status: 'active',
//     products: [],
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData(prev => ({ ...prev, tradeLicense: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="form-control">
//         <label className="label">
//           <span className="label-text">Store Name</span>
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="input input-bordered"
//           required
//         />
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text">Custom Domain</span>
//         </label>
//         <input
//           type="text"
//           name="domain"
//           value={formData.domain}
//           onChange={handleChange}
//           className="input input-bordered"
//           placeholder="store.example.com"
//           required
//         />
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text">Address</span>
//         </label>
//         <textarea
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           className="textarea textarea-bordered h-24"
//           required
//         />
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text">Contact Number</span>
//         </label>
//         <input
//           type="tel"
//           name="contactNumber"
//           value={formData.contactNumber}
//           onChange={handleChange}
//           className="input input-bordered"
//           required
//         />
//       </div>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text">Trade License</span>
//         </label>
//         <input
//           type="file"
//           accept=".pdf,.jpg,.png"
//           onChange={handleFileChange}
//           className="file-input file-input-bordered w-full"
//           required={!store}
//         />
//         {formData.tradeLicense && (
//           <div className="mt-2">
//             <a 
//               href={formData.tradeLicense} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="link"
//             >
//               View Current License
//             </a>
//           </div>
//         )}
//       </div>

//       <div className="form-control">
//         <button type="submit" className="btn btn-primary">
//           Save Store
//         </button>
//       </div>
//     </form>
//   );
// };

// export default StoreForm;