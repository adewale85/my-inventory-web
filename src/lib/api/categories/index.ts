import { createCategory } from "./createCategory";
import { deleteCategory } from "./deleteCategory";
import { getCategories } from "./getCategories";
import { getCategory } from "./getCategory";
import { updateCategory } from "./updateCategory";

export const categoriesApi = {
    getAllCategories: 
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory
}