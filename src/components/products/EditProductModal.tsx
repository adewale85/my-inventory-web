// "use client";

// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";

// import ProductForm from "./ProductForm";

// import {
//   ProductFormValues,
//   productSchema,
// } from "@/schemas/productSchema";

// import { ProductResponse } from "@/types/product";

// // import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";

// interface EditProductModalProps {
//   product: ProductResponse | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function EditProductModal({
//   product,
//   open,
//   onOpenChange,
// }: EditProductModalProps) {
//   const form = useForm<ProductFormValues>({
//     resolver: zodResolver(productSchema),

//     defaultValues: {
//       name: "",
//       sku: "",
//       description: "",
//       category_id: "",
//       unit_of_measure_id: "",
//       reorder_level: 0,
//       cost_price: 0,
//       is_active: true,
//       supplier_ids: [],
//     },
//   });

//   // const { updateProduct, isPending } = useUpdateProduct();

//   useEffect(() => {
//     if (!product) return;

//     // We will fill this after seeing ProductResponse
//   }, [product, form]);

//   const onSubmit = (data: ProductFormValues) => {
//     console.log(data);

//     // updateProduct(...)
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={onOpenChange}
//     >
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit Product</DialogTitle>

//           <DialogDescription>
//             Update the product information.
//           </DialogDescription>
//         </DialogHeader>

//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-5"
//         >
//           <ProductForm form={form} />

//           <DialogFooter>
//             <Button type="submit">
//               Update Product
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }