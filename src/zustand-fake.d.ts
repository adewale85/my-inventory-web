// // src/zustand-fake.d.ts

// declare module "zustand" {
//   export function create<T>(...args: any[]): any;
// }

// declare module "zustand/middleware" {
//   export function persist<T>(...args: any[]): any;
//   export function createJSONStorage(...args: any[]): any;
// }

// declare module "immer" {
//   export function produce(...args: any[]): any;
// }

// // ⬇️ ADD THIS PART FOR NEXT.JS NAVIGATION ⬇️
// declare module "next/navigation" {
//   export function useRouter(): {
//     push: (url: string) => void;
//     replace: (url: string) => void;
//     prefetch: (url: string) => void;
//     back: () => void;
//     forward: () => void;
//     refresh: () => void;
//   };
//   export function usePathname(): string;
// }