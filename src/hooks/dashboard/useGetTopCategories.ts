import { supabase } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useGetTopCategories = () => {
  const {
    data: topCategories = [],
    isPending: isPendingTopCategories,
    error,
  } = useQuery({
    queryKey: ["top-categories"],

    queryFn: async () => {
      // 1. Get categories
      const {
        data: categories,
        error: categoriesError,
      } = await supabase
        .from("categories")
        .select("id, name");

      if (categoriesError) throw categoriesError;

      // 2. Get products
      const {
        data: products,
        error: productsError,
      } = await supabase
        .from("products")
        .select("id, category_id, cost_price");

      if (productsError) throw productsError;

      // 3. Get inventory
      const {
        data: inventory,
        error: inventoryError,
      } = await supabase
        .from("inventory")
        .select("product_id, quantity");

      if (inventoryError) throw inventoryError;

      // 4. Build the top category data
      const result = categories.map((category) => {
        // Find products that belong to this category
        const categoryProducts = products.filter(
          (product) => product.category_id === category.id
        );

        // Count the products
        const productCount = categoryProducts.length;

        // Find inventory belonging to those products
        const categoryInventory = inventory.filter((item) =>
          categoryProducts.some(
            (product) => product.id === item.product_id
          )
        );

        // Calculate total quantity
        const totalQuantity = categoryInventory.reduce(
          (total, item) => total + Number(item.quantity),
          0
        );

        // Calculate total inventory value
        const totalValue = categoryInventory.reduce(
          (total, item) => {
            const product = categoryProducts.find(
              (product) => product.id === item.product_id
            );

            const costPrice = Number(product?.cost_price ?? 0);
            const quantity = Number(item.quantity);

            return total + costPrice * quantity;
          },
          0
        );

        // Return one category object
        return {
          id: category.id,
          name: category.name,
          product_count: productCount,
          total_quantity: totalQuantity,
          total_value: totalValue,
        };
      });

      // 5. Sort categories by highest value
      return result.sort(
        (a, b) => b.total_value - a.total_value
      );
    },
  });

  return {
    topCategories,
    isPendingTopCategories,
    error,
  };
};