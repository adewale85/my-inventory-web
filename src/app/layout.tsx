"use client";

import { usePathname } from "next/navigation";
import AuthWrapper from "@/components/AuthWrapper";
import AppShell from "@/components/layout/AppShell"; 

import QueryProvider from "@/providers/QueryProvider";
import "./globals.css"; // 👈 CRITICAL FIX 1: Imports Tailwind CSS styles!
import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const onAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      {/* 👈 CRITICAL FIX 2: Exactly ONE body element keeps styles consistent */}
      <body className="min-h-screen bg-slate-50 antialiased">
        <QueryProvider>
          
          {onAuthPage ? (
            // SCENARIO 1: Clean centered frame for Login / Sign Up
            <div className="flex items-center justify-center min-h-screen bg-slate-100 w-full">
              
                {children}
              
            </div>
          ) : (
            // SCENARIO 2: Main Application System Frame
            <AuthWrapper>
              <AppShell>
                {children}
                <Toaster richColors position="top-right" closeButton />
              </AppShell>
            </AuthWrapper>
          )}

        </QueryProvider>
      </body>
    </html>
  );
}