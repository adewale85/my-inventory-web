export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
  products_count: number;
  created_at: string;
}

export type CategoryPayload = Pick<CategoryResponse, "name" | "description">;
