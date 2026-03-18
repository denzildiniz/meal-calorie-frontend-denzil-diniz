"use client";

import { useMealStore } from "@/stores/mealStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Scale, PieChart, Info } from "lucide-react";
import { MacroBarProps } from "@/types";

export default function ResultCard() {
  const result = useMealStore((s) => s.lastResult);

  if (!result) return null;

  const MacroBar = ({ label, value, color, max = 50 }: MacroBarProps) => (
    <div className="space-y-1 w-full">
      <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
        <span className="text-zinc-500">{label}</span>
        <span className="text-zinc-900 dark:text-zinc-100">{value ?? 0}g</span>
      </div>
      <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${Math.min(((value ?? 0) / max) * 100, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <Card className="w-full border-none shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      
      <div className="bg-orange-500 p-8 text-white relative">
        <div className="absolute top-0 right-0 p-6 opacity-20">
          <PieChart className="w-24 h-24 rotate-12" />
        </div>
        
        <div className="relative z-10">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-none mb-3 px-3 py-1 rounded-full backdrop-blur-md">
            Analysis Result
          </Badge>
          <CardTitle className="text-4xl font-black capitalize leading-tight mb-2">
            {result.dish}
          </CardTitle>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex flex-col">
              <span className="text-orange-100 text-xs font-bold uppercase">Total Energy</span>
              <div className="flex items-center gap-1">
                <Flame className="w-5 h-5 fill-orange-200 text-orange-200" />
                <span className="text-3xl font-black tracking-tighter">{result.totalCalories} KCAL</span>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-orange-100 text-xs font-bold uppercase">Portion</span>
              <span className="text-xl font-bold">{result.servings} Serving{result.servings > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-8 space-y-8">
        
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-orange-500" />
            <h4 className="font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Macro Distribution <span className="text-zinc-400 font-medium normal-case">(Total)</span>
            </h4>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <MacroBar label="Protein" value={result.totalMacros?.protein} color="bg-emerald-500" />
            <MacroBar label="Carbs" value={result.totalMacros?.carbohydrates} color="bg-amber-500" />
            <MacroBar label="Fats" value={result.totalMacros?.total_fat} color="bg-rose-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            {[
              { label: 'Fiber', val: result.totalMacros?.fiber },
              { label: 'Sugars', val: result.totalMacros?.sugars },
              { label: 'Sat. Fat', val: result.totalMacros?.saturated_fat }
            ].map((item) => (
              <div key={item.label} className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{item.val ?? '0'}g</p>
              </div>
            ))}
          </div>
        </section>

        {result.source && (
          <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-[10px] font-medium pt-4 border-t border-zinc-50 dark:border-zinc-800 italic">
            <Info className="w-3 h-3" />
            Verified via {result.source} database
          </div>
        )}
      </CardContent>
    </Card>
  );
}