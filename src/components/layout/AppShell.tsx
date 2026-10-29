
"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand/useAuthStore";
import Sidebar from "@/components/layout/Sidebar";
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuthStore((state) => state.auth);
  const user = auth?.user;

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isDark, setIsDark] = useState(false);

  // Load saved theme when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const darkMode = savedTheme === "dark";

    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = !isDark;

    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-border bg-background/80 px-4 sm:px-8 backdrop-blur-md">
            {/* Mobile Hamburger & Search */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex rounded-xl p-2 text-muted-foreground hover:bg-muted md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Search Bar */}
              <div className="relative max-w-md w-full hidden sm:block">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  type="text"
                  placeholder="Search for products, categories, suppliers..."
                  className="h-10 w-full rounded-full border border-border bg-muted/80 pl-10 pr-20 text-xs sm:text-sm text-foreground outline-none transition focus:border-blue-400 focus:bg-background focus:ring-2 focus:ring-blue-100 placeholder:text-muted-foreground"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-background border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-2xs">
                  Ctrl + K
                </span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Theme Toggle Pill */}
              <button
                type="button"
                onClick={toggleTheme}
                className="relative flex h-7 w-13 items-center rounded-full bg-blue-500 p-0.5 transition-colors focus:outline-none shadow-xs"
                aria-label="Toggle theme"
                aria-pressed={isDark}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm transition-transform duration-200 ${
                    isDark ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  {isDark ? (
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                    <Moon className="h-3.5 w-3.5 text-blue-600" />
                  )}
                </div>
              </button>

              {/* Notifications */}
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />

                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                </span>
              </button>

              {/* User Avatar with Chevron */}
              <div className="flex items-center gap-2 pl-2">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-sm font-bold text-white ring-2 ring-background shadow-xs">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                </div>

                <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
              </div>
            </div>
          </header>

          {/* Main Page Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
