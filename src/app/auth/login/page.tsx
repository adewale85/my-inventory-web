"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin } from "@/lib/api/auth/login";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/zustand/useAuthStore";
import { getCurrentUser } from "@/lib/api/auth/getCurrentUser";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state)=>state.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      console.log("Attempting API login with:",email);
      // ✅ FIX: Pass as a single object payload to match LoginPayload interface
      return apiLogin({ email, password });
    },

      onSuccess: async (authData) => {
      console.log("Cleaned API Login Response:", authData);
      
      // ✅ Clean token extraction since login.ts already drops down to the correct object layer
      const token = authData?.token || null;
      console.log("Extracted Token:", token);

      if (!token) {
        throw new Error("Login succeeded but no token was found in the API response.");
      }

      try {
        localStorage.setItem("token", token);
      } catch (e) {
        console.error("Failed to store token in localStorage", e);
      }

      try {
        const userProflie = await getCurrentUser()
      

      const completeAuthPayload = {
        ...authData,
        ...userProflie,
        accessToken: token,
      };

      setAuth(completeAuthPayload);
      } catch (e) {
        console.warn("Could not fetch user profile details, logging in with token only", e);
        
        // Fallback: If getting user profile fails, still save the token so they aren't kicked out
        setAuth({
          ...authData,
          accessToken: token,
        });
      }

      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Mutation encountered an error:", error);
    }
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  // Safe mapping for validation error payloads or generic server failures
  const errorMessage = loginMutation.error instanceof Error
    ? loginMutation.error.message
    : (loginMutation.error as any)?.response?.data?.message || "Login failed. Please check your credentials.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300 w-full">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Sign in to My Inventory</h2>
        <p className="text-sm text-slate-500 mt-1">Enter your credentials to continue.</p>

        {loginMutation.isError && (
          <div className="mt-4 rounded border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs text-slate-500">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full rounded border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500" 
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full rounded border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500" 
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <button 
              type="submit" 
              disabled={loginMutation.isPending} 
              className="rounded bg-emerald-500 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-600 disabled:opacity-60 transition"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </button>
            <a href="/auth/signup" className="text-sm text-slate-500 hover:underline">Create account</a>
          </div>
         
        </form>
      </div>
    </div>
  );
}