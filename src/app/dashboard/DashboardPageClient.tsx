"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import Header from "@/components/layout/Header";
import { useAuthStore } from "@/stores/authStore";
import MealHistoryTable from "@/components/meal/MealHistoryTable";
import Link from "next/link";

export default function DashboardPageClient() {
  useAuthGuard();
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-[#FFFBF0] dark:bg-zinc-950 transition-colors">
      <Header />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="relative overflow-hidden rounded-[2.5rem] bg-orange-500 p-8 md:p-12 shadow-xl shadow-orange-200 dark:shadow-none">
          <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Good morning, {user?.firstName}! Ready to track your calories today?
            </h2>
            <Link href="/calories" className="inline-block cursor-pointer">
      <button className="mt-6 bg-white text-orange-600 px-8 py-3 rounded-2xl font-bold hover:bg-orange-50 cursor-pointer transition-all active:scale-95 shadow-lg">
        Analyze New Meal
      </button>
    </Link>
          </div>
        </section>
        <div className="grid gap-8">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[2rem] border border-orange-100/50 dark:border-zinc-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Recent Activity</h3>
                <p className="text-sm text-zinc-500">Your latest meal breakdowns and nutritional history.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800">
              <MealHistoryTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}