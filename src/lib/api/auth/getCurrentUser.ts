// src/lib/api/auth/getCurrentUser.ts

// 1. Change the old apiFetch import to our new apiClient
import { apiClient } from "../axiosPrivate"; 

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  // 2. Switch from the custom fetch layout to axios format
  const response = await apiClient.get("/auth/me"); 
  return response.data;
}