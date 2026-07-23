import { getSingleProduct } from "../products/getSingleProduct";
import { createSupplier } from "./createSupplier";
import { deleteSupplier } from "./deleteSupplier";
import { getAllSuppliers } from "./getAllSuppliers";
import { updateSupplier } from "./updateSupplier";

export const supplierApi = {
    createSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSingleProduct,
    updateSupplier
}