import { supabase } from "@/supabase/client";
// import { apiClient } from "../axiosPrivate";

export interface SignUpPayload {
  name?: string;
  email?: string;
  password?: string; 
}

// export interface AuthResponse {
//   access_token: string;
//   token_type: string;
// }
/**
 * Register a new user account
 */
export async function signup(data: SignUpPayload) {
    const {data: authData, error} = await supabase.auth.signUp({
      email: data.email!,
      password: data.password!,
      options:{
        data:{
          name: data.name
        }
      }
    });

    if (error) {
      throw error
    }

    return authData
  }
   
 