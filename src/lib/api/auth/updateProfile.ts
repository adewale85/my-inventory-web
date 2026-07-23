import { apiClient } from "../axiosPrivate";

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  password?: string; // If your profile update endpoint allows changing passwords
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}
/**
 * Update the authenticated user's profile information
 */
export async function updateProfile(data: UpdateProfilePayload) {
  const response = await apiClient.put<User>("/auth/profile", data);
  return response.data;
}