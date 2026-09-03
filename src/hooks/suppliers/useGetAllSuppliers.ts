// import { supplierApi } from "@/lib/api/suppliers"
// import { useQuery } from "@tanstack/react-query";


// export const useGetAllSuppliers = () => {
//     const {
//         data: suppliers = [], isPending: isPendingSuppliers
//     } = useQuery ({
//         queryKey: ["suppliers"],
//         queryFn: supplierApi.getAllSuppliers
//     });
//     return {suppliers, isPendingSuppliers}
// }



// import { supabase } from '@/supabase/client';
// import { useQuery } from '@tanstack/react-query';


// export const useGetAllProducts = () => {
//   return useQuery({
//     queryKey: ['products'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('products')
//         .select(`
//           *,
//           suppliers (id, name),
//           units (id, name)
//         `)
//         .order('created_at', { ascending: false });

//       if (error) throw new Error(error.message);
//       return data;
//     },
//   });
// };


import { supabase } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSuppliers = () => {
  const query = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("suppliers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
  });

  return {
    suppliers: query.data,
    ...query,
  };
};