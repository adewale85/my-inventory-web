import { apiClient } from "../axiosPrivate";

export interface SignUpPayload {
  name?: string;
  email?: string;
  password?: string; 
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
/**
 * Register a new user account
 */
export async function signup(data: SignUpPayload) {
  const response = await apiClient.post<AuthResponse>(
    "/auth/signup",
    data
  );
  return response.data;
}