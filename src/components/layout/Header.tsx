"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import RateLimitIndicator from "@/components/ui/RateLimitIndicator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Utensils, LayoutDashboard } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-orange-100/50 dark:border-zinc-800 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-sm shadow-orange-200">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <h1 className="font-black text-xl tracking-tight text-zinc-900 dark:text-white hidden sm:block">
            Calorie<span className="text-orange-500">Tracker</span>
          </h1>
        </div>

        <nav className="flex items-center bg-zinc-100/50 dark:bg-zinc-800/50 p-1 rounded-2xl gap-1">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl hover:bg-white dark:hover:bg-zinc-700 transition-all"
          >
            <LayoutDashboard className="w-4 h-4 text-orange-500" />
            <span className="hidden md:block">Dashboard</span>
          </Link>
          <Link 
            href="/calories" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl hover:bg-white dark:hover:bg-zinc-700 transition-all"
          >
            <Utensils className="w-4 h-4 text-orange-500" />
            <span className="hidden md:block">Calories</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <RateLimitIndicator />
          
          <ThemeToggle />
          
          <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-700 mx-1 hidden sm:block" />


          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="rounded-xl text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer transition-all"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}