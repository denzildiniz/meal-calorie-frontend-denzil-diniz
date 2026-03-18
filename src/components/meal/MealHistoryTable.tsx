"use client";

import { useMealStore } from "@/stores/mealStore";
import { UtensilsCrossed, Hash, Flame } from "lucide-react";

export default function MealHistoryTable() {
  const history = useMealStore((s) => s.history);

  if (!history.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="bg-orange-100 dark:bg-orange-950/40 p-3 rounded-full mb-3 text-orange-500">
          <UtensilsCrossed className="w-6 h-6" />
        </div>
        <p className="text-zinc-500 font-medium text-sm">Your plate is empty!</p>
        <p className="text-zinc-400 text-xs mt-1">Start by searching for your first meal.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-[2rem]">
        <table className="w-full text-left border-separate border-spacing-y-2 px-2">
          <thead>
            <tr className="text-zinc-400 dark:text-zinc-500 uppercase text-[10px] font-black tracking-widest">
              <th className="px-6 py-4 flex items-center gap-2">
                <UtensilsCrossed className="w-3 h-3" /> Dish
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                   <Hash className="w-3 h-3" /> Servings
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                   <Flame className="w-3 h-3" /> Calories
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-transparent">
            {history.map((meal, index) => (
              <tr 
                key={index} 
                className="group bg-white dark:bg-zinc-800/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <td className="px-6 py-4 first:rounded-l-2xl last:rounded-r-2xl border-y border-l border-zinc-100 dark:border-zinc-800 group-hover:border-orange-100 dark:group-hover:border-orange-900/30">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 capitalize">
                    {meal.dish}
                  </span>
                </td>

                <td className="px-6 py-4 border-y border-zinc-100 dark:border-zinc-800 group-hover:border-orange-100 dark:group-hover:border-orange-900/30 text-zinc-600 dark:text-zinc-400 font-medium">
                  {meal.servings} serving{meal.servings > 1 ? 's' : ''}
                </td>

                <td className="px-6 py-4 first:rounded-l-2xl last:rounded-r-2xl border-y border-r border-zinc-100 dark:border-zinc-800 group-hover:border-orange-100 dark:group-hover:border-orange-900/30">
                  <div className="inline-flex items-center bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-black tracking-tighter shadow-sm">
                    {meal.totalCalories} KCAL
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}