"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { produce } from "immer";

import { LoginUser, UserLoggedInType } from "@/types/user";
import { sharedPersistConfig } from "@/store/config/sharedConfig";
import { supabase } from "@/supabase/client";

// Define the shape of your app state
interface AuthState {
  accessToken: string | null;
  setToken: (token: string) => void;
  user: LoginUser | null;
  auth: UserLoggedInType | null;
  logout: () => Promise<void>
  setAuth: (auth: UserLoggedInType) => void;
  updateAuth: (auth: UserLoggedInType) => void;
  isLoggingOut: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

// Create the zustand store with middleware for persistence and immer
export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({  
      accessToken: null,
      setToken: (token: string) => set({ accessToken: token }),
      user: null,
      auth: null, // Initialize the user state as null
      isAuthenticated: false,
      isLoggingOut: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set(
          produce((state: AuthState) => {
            state.isAuthenticated = isAuthenticated;
          }),
        ),
        
      setAuth: (auth: UserLoggedInType) =>
        set(
          produce((state: AuthState) => {
            state.auth = auth;
            state.accessToken = auth?.accessToken; // ✅ ADD THIS LINE
            state.isAuthenticated = !!auth?.accessToken;
          }),
        ),
      updateAuth: (auth: UserLoggedInType) =>
        set(
          produce((state: AuthState) => {
            if (state.auth) {
              Object.assign(state.auth, {
                accessToken: auth?.accessToken,
              } as UserLoggedInType); // Update the user state partially
            }
          }),
        ),

      logout: async () => {
  set({ isLoggingOut: true });

  const { error } = await supabase.auth.signOut();

  if (error) {
    set({ isLoggingOut: false });
    throw new Error("Logout failed: " + error.message);
  }

  set({
    auth: null,
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoggingOut: false,
  });

  sessionStorage.removeItem(sharedPersistConfig.PERSIST_KEY);

  try {
    localStorage.removeItem(sharedPersistConfig.PERSIST_KEY);
  } catch {
    /* ignore */
  }

  window.location.replace("auth/login");
},
    }),
    {
      name: sharedPersistConfig.PERSIST_KEY,
      // Tab-scoped: closing the browser tab/window clears the session (login required again).
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          } as unknown as Storage;
        }
        return window.sessionStorage;
      }),
    },
  ),
);
