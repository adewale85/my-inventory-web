// import { productapi } from "@/lib/api/products";
// import { useQuery } from "@tanstack/react-query";



// export const useGetAllProducts = () => {
//   const {
//     data: products = [],
//     isPending,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: productapi.getAllProducts,
//   });

//   return {
//     products,
//     isPending,
//     isError,
//     error,
//   };
// };

// import { supabase } from "@/supabase/client";
// import { useQuery } from "@tanstack/react-query";


// export const useGetAllProducts = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("products")
//         .select(`
//           *,
//           categories (id, name),
//           units (id, name),
//           product_suppliers (
//             suppliers (id, name)
//           )
//         `)
//         .order("created_at", { ascending: false });

//       if (error) throw new Error(error.message);
//       return data;
//     },
//   });
// };



// import { getAllProducts } from "@/lib/api/products/getAllProducts";
// import { useQuery } from "@tanstack/react-query";


// export const useGetAllProducts = () => {
//   const query = useQuery({
//     queryKey: ["products"],
//     queryFn: getAllProducts,
//   });

//   return {
//     products: query.data,
//     ...query,
//   };
// };


import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export const useGetAllProducts = () => {
  const { data: products = [], isPending, error } = useQuery({
    queryKey: ["products"], // Must match invalidation key!
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      return data;
    },
  });

  return { products, isPending, error };
};