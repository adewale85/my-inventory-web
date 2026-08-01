import { createCategory } from "./createCategory";
import { deleteCategory } from "./deleteCategory";
import { getAllCategories } from "./getAllCategories";
import { getCategory } from "./getCategory";
import { updateCategory } from "./updateCategory";


export const categoriesApi = {
    getAllCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory
}