import { apiClient } from "../axiosPrivate";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
  : "";

console.log("API Base URL:", BASE_URL);
export interface LoginPayload {
  name?: string;
  email?: string;
  password?: string; 
}

// 1. FIX THIS: Match the exact property names coming from Laravel!
export interface AuthResponse {
  token: string; // Changed from access_token to token
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
  };
}

/**
 * Log in a user and receive a Bearer token
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient.post<{
    success: boolean;
    message: string;
    data?: AuthResponse;
  }>("/auth/login", payload);
  
  return response.data.data!; 
}