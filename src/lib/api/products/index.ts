import { createProduct } from "./createProduct";
import { deleteProduct } from "./deleteProduct";
import { getAllProducts } from "./getAllProducts";
import { getLowStockProducts } from "./getLowStockProducts";
import { getSingleProduct } from "./getSingleProduct";


export const productapi = {
    getAllProducts,
    getSingleProduct,
    getLowStockProducts,
    createProduct,
    deleteProduct
}