import { apiClient } from "../axiosPrivate";


/**
 * Revoke the current active access token
 */
export async function logout() {
  const response = await apiClient.post<any>("/auth/logout");
  return response.data;
}