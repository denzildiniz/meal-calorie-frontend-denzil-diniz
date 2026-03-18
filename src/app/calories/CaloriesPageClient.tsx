"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import Header from "@/components/layout/Header";
import MealForm from "@/components/meal/MealForm";
import ResultCard from "@/components/meal/ResultCard";
import { Search, Info } from "lucide-react";
import { useRef, useState } from "react";

export default function CaloriesPageClient() {
  useAuthGuard();

  const resultRef = useRef<HTMLDivElement | null>(null);
  const [highlight, setHighlight] = useState(false);

  const handleScrollToResult = () => {
    // 1. We scroll the result card into view
    // 2. "block: start" ensures it goes to the top
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start", 
    });

    // 3. Trigger a brief visual pulse so the user knows where to look
    setHighlight(true);
    setTimeout(() => setHighlight(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] dark:bg-zinc-950 relative overflow-x-hidden">
      
      <div className="absolute top-40 -left-20 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute top-20 -right-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-10" />
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center relative z-10">

        <div className="text-center space-y-3 mb-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Search className="w-3 h-3" />
            Calorie AI Analysis
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            What&apos;s on your <span className="text-orange-500 italic">plate?</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-md mx-auto leading-relaxed">
            Enter your meal details below to get a full nutritional breakdown instantly.
          </p>
        </div>

        <div className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-orange-100/50 dark:border-zinc-800 transition-all">
          <MealForm onResult={handleScrollToResult} />
          
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-start gap-3 text-zinc-400">
            <Info className="w-5 h-5 text-orange-400 mt-0.5" />
            <p className="text-xs leading-relaxed">
              For better accuracy, include quantities like &quot;200g of chicken&quot; or &quot;1 cup of rice.&quot;
            </p>
          </div>
        </div>

        <div
          ref={resultRef}
          className={`w-full mt-12 transition-all duration-700 scroll-mt-32 ${
            highlight
              ? "ring-4 ring-orange-400/20 dark:ring-orange-500/20 scale-[1.01] shadow-2xl"
              : "scale-100"
          }`}
        >
          <ResultCard />
        </div>

      </main>
    </div>
  );
}