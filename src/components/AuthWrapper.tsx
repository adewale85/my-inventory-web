// "use client";

// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { AuthProvider, useAuth } from "@/context/AuthContext";

// function getToken() {
//   if (typeof window === "undefined") return null;
//   try {
//     const storageToken = localStorage.getItem("token");
//     if (storageToken) return storageToken;
//     const match = document.cookie.match(/(?:^|; )token=([^;]+)/);
//     return match ? match[1] : null;
//   } catch {
//     return null;
//   }
// }

// function AuthGuard({ children }: { children: React.ReactNode }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const path = window.location.pathname;
//     const token = getToken();
//     const onAuthPage = path.startsWith("/auth");

//     if (!token && !loading && !onAuthPage) {
//       router.replace("/auth/login");
//       return;
//     }

//     if (token && !loading && !user && !onAuthPage) {
//       router.replace("/auth/login");
//     }
//   }, [loading, user, router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="rounded-lg bg-white px-6 py-5 shadow-sm text-slate-700">Checking authentication...</div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

// export default function AuthWrapper({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthProvider>
//       <AuthGuard>{children}</AuthGuard>
//     </AuthProvider>
//   );
// }


"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuthStore"; // Make sure this path matches where your store file is located!

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // 1. Pull the authentication state directly from your new Zustand store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoggingOut = useAuthStore((state) => state.isLoggingOut);

  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);

  },[]);

  useEffect(() => {
    if (!isMounted) return; 
    const onAuthPage = pathname?.startsWith("/auth") || pathname === "/login";

    // 2. If the user is NOT logged in and trying to access a protected page, redirect to Login
    if (!isAuthenticated && !onAuthPage) {
      router.replace("/auth/login");
    }

    // 3. If the user IS logged in but wanders back to the auth/login page, redirect them to the home dashboard
    if (isAuthenticated && onAuthPage) {
      router.replace("/");
    }
  }, [isAuthenticated, pathname, router, isMounted]);

  
  // Show a loading screen if the app is currently in the middle of logging out
  if (isLoggingOut ||!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-lg bg-white px-6 py-5 shadow-sm text-slate-700">
            Checking authentication...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  // Since Zustand manages state globally without requiring Providers,
  // we can completely remove the old <AuthProvider> wrapper!
  return <AuthGuard> {children}</AuthGuard>; 
}