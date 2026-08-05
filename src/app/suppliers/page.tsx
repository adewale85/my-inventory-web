"use client";

import TablePagination from "@/components/products/TablePagination";
import AddSupplierModal from "@/components/Suppliers/AddSupplierModal";
import DeleteSupplierModal from "@/components/Suppliers/DeleteSupplierModal";
import EditSupplierModal from "@/components/Suppliers/EditSupplierModal";
import SupplierFilters from "@/components/Suppliers/SupplierFilters";
import SuppliersHeader from "@/components/Suppliers/SuppliersHeader";
import SuppliersTable from "@/components/Suppliers/SuppliersTable";
import { SupplierResponse } from "@/types/suppliers";
import { useState } from "react";


export default function SuppliersPage() {
  
  const [supplierToDelete, setSupplierToDelete] = useState <SupplierResponse | null> (null);
  const [supplierToEdit, setSupplierToEdit] = useState <SupplierResponse | null> (null);
  const [onAddSupplier, setOnAddSupplier] = useState (false)

  return (
    <div className="space-y-6 p-6">
      <SuppliersHeader onAddSupplier={()=>setOnAddSupplier(true)}/>
      <SupplierFilters />

      <SuppliersTable setSupplierToDelete={setSupplierToDelete} 
      setSupplierToEdit={setSupplierToEdit}
      
      />
      <TablePagination/>

      <AddSupplierModal 
      open={onAddSupplier}
      onOpenChange={setOnAddSupplier}
      />

      <DeleteSupplierModal
        supplier={supplierToDelete}
        open={!!supplierToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setSupplierToDelete(null);
          }
        }}
      />

      <EditSupplierModal
        supplier={supplierToEdit}
        open={!!supplierToEdit}
        onOpenChange={(open) => {
          if (!open) {
            setSupplierToEdit(null);
          }
        }}
      />
    </div>
  );
    
}

 


   
















































// import { useAuthStore } from "@/zustand/useAuthStore";
// import React, { useEffect, useState } from "react";

// interface Supplier {
//   id: string;
//   name: string;
//   contactName?: string;
//   email?: string;
//   phone?: string;
// }

// export default function SuppliersPage() {
//   const user = useAuthStore((state) => state.auth);
//   const isAdmin = user?.role === "ADMIN";
//   const [suppliers, setSuppliers] = useState<Supplier[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showCreate, setShowCreate] = useState(false);
//   const [createLoading, setCreateLoading] = useState(false);
//   const [newSupplier, setNewSupplier] = useState({
//     name: "",
//     contactName: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       try {
//         const res = await fetch("/api/v1/suppliers");
//         if (!mounted) return;
//         if (res.ok) setSuppliers(await res.json());
//       } catch (err) {
//         console.error("Failed to load suppliers", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   async function submitCreate() {
//     setCreateLoading(true);
//     try {
//       const res = await fetch("/api/v1/suppliers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newSupplier),
//       });
//       if (!res.ok) throw new Error("Create failed");
//       const created = await res.json();
//       setSuppliers((s) => [
//         {
//           id: created.id ?? Date.now().toString(),
//           name: created.name ?? newSupplier.name,
//           contactName: created.contactName ?? newSupplier.contactName,
//           email: created.email ?? newSupplier.email,
//           phone: created.phone ?? newSupplier.phone,
//         },
//         ...s,
//       ]);
//       setShowCreate(false);
//       setNewSupplier({ name: "", contactName: "", email: "", phone: "" });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create supplier");
//     } finally {
//       setCreateLoading(false);
//     }
//   }

//   async function handleDelete(id: string) {
//     if (!confirm("Delete this supplier?")) return;
//     try {
//       const res = await fetch(`/api/v1/suppliers/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       setSuppliers((s) => s.filter((x) => x.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <header className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold text-slate-800">Suppliers</h1>
//           <p className="text-sm text-slate-500">
//             Supplier directory and contact details.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           {isAdmin && (
//             <button
//               onClick={() => setShowCreate(true)}
//               className="rounded bg-emerald-500 text-white px-4 py-2 text-sm hover:bg-emerald-600"
//             >
//               + Add Supplier
//             </button>
//           )}
//         </div>
//       </header>

//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {loading ? (
//           <div className="col-span-3 space-y-2">
//             <div className="h-20 rounded bg-slate-200 animate-pulse" />
//             <div className="h-20 rounded bg-slate-200 animate-pulse" />
//           </div>
//         ) : suppliers.length === 0 ? (
//           <div className="col-span-3 text-sm text-slate-500">
//             No suppliers found.
//           </div>
//         ) : (
//           suppliers.map((s) => (
//             <div
//               key={s.id}
//               className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <div className="text-slate-900 font-medium">{s.name}</div>
//                   <div className="text-xs text-slate-500">{s.contactName}</div>
//                 </div>
//                 <div className="text-sm text-slate-700">{s.phone}</div>
//               </div>
//               <div className="mt-3 text-sm text-slate-600">{s.email}</div>
//               <div className="mt-4 flex items-center justify-end gap-2">
//                 <button
//                   disabled={!isAdmin}
//                   onClick={() => isAdmin && handleDelete(s.id)}
//                   className={`text-sm rounded px-2 py-1 ${isAdmin ? "bg-rose-50 text-rose-700 border border-rose-100" : "opacity-50 cursor-not-allowed bg-white border border-slate-100 text-slate-400"}`}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </section>

//       {/* Create Supplier Modal */}
//       {showCreate && isAdmin && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//           <div className="w-full max-w-md rounded bg-white p-6">
//             <h3 className="text-lg font-medium text-slate-800">Add Supplier</h3>
//             <div className="mt-4 space-y-3">
//               <div>
//                 <label className="block text-xs text-slate-500">
//                   Company Name
//                 </label>
//                 <input
//                   value={newSupplier.name}
//                   onChange={(e) =>
//                     setNewSupplier((s) => ({ ...s, name: e.target.value }))
//                   }
//                   className="w-full rounded border border-slate-200 px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs text-slate-500">
//                   Contact Name
//                 </label>
//                 <input
//                   value={newSupplier.contactName}
//                   onChange={(e) =>
//                     setNewSupplier((s) => ({
//                       ...s,
//                       contactName: e.target.value,
//                     }))
//                   }
//                   className="w-full rounded border border-slate-200 px-3 py-2"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs text-slate-500">Email</label>
//                   <input
//                     value={newSupplier.email}
//                     onChange={(e) =>
//                       setNewSupplier((s) => ({ ...s, email: e.target.value }))
//                     }
//                     className="w-full rounded border border-slate-200 px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-slate-500">Phone</label>
//                   <input
//                     value={newSupplier.phone}
//                     onChange={(e) =>
//                       setNewSupplier((s) => ({ ...s, phone: e.target.value }))
//                     }
//                     className="w-full rounded border border-slate-200 px-3 py-2"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-end gap-2 mt-4">
//                 <button
//                   onClick={() => setShowCreate(false)}
//                   className="rounded border border-slate-200 px-3 py-2 text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={submitCreate}
//                   disabled={createLoading}
//                   className="rounded bg-emerald-500 text-white px-4 py-2 text-sm hover:bg-emerald-600"
//                 >
//                   {createLoading ? "Saving..." : "Create"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




