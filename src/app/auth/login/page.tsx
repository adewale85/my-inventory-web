"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/auth/useLogin";


export default function LoginPage() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const router = useRouter();
  const { loginUser, isPending } = useLogin();


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    loginUser({
      email,
      password,
    });
  };

  // Safe mapping for validation error payloads or generic server failures
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300 w-full">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Sign in to My Inventory</h2>
        <p className="text-sm text-slate-500 mt-1">Enter your credentials to continue.</p>

     
       

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
              disabled={isPending} 
              className="rounded bg-emerald-500 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-600 disabled:opacity-60 transition"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
            <a href="/auth/signup" className="text-sm text-slate-500 hover:underline">Create account</a>
          </div>
         
        </form>
      </div>
    </div>
  );
}