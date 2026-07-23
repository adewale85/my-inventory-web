// "use client";

// import { getCurrentUser } from "@/lib/api/auth/getCurrentUser";
// import React, { createContext, useContext, useEffect, useState } from "react";


// type Role = "ADMIN" | "USER";

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: Role;
// }

// interface AuthContextValue {
//   user: User | null;
//   loading: boolean;
//   fetchMe: () => Promise<void>;
//   setMockRole: (r: Role) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// function getToken() {
//   if (typeof window === "undefined") return null;
//   try {
//     const storageToken = localStorage.getItem("token");
//     if (storageToken) return storageToken;
    
//     return null;
//   } catch {
//     return null;
//   }
// }

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchMe = async () => { 
//     const token = getToken();
//     if (!token) {
//       setUser(null);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await getCurrentUser();
//       setUser(data);
//     } catch (e) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initializeAuth = async () => {
//       await fetchMe();
//     };
//     initializeAuth();
//   }, []);
   
 
    
//   const setMockRole = (r: Role) => {
//     setUser((prev) =>
//       prev
//         ? { ...prev, role: r }
//         : { id: r === "ADMIN" ? "demo-admin" : "demo-user", 
//           name: r === "ADMIN" ? "Demo Admin" : "Demo User", 
//           email: r === "ADMIN" ? "admin@example.com" : "user@example.com", 
//           role: r }
//     );
//   };

//   const logout = () => {
//     setUser(null);
//     try {
//       localStorage.removeItem("token");
//     } catch {}
//   };

//   return <AuthContext.Provider value={{ user, loading, fetchMe, setMockRole, logout }}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };
