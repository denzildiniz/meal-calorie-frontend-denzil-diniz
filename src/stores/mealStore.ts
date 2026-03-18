import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Meal } from "@/types";

interface MealState {
  lastResult: Meal | null;
  history: Meal[];
  setResult: (meal: Meal) => void;
  clearHistory: () => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      lastResult: null,
      history: [],

      setResult: (meal) =>
        set((state) => {
          const updatedHistory = [
            meal,
            ...state.history.filter((m) => m.dish !== meal.dish),
          ].slice(0, 5);

          return {
            lastResult: meal,
            history: updatedHistory,
          };
        }),

      clearHistory: () =>
        set({
          history: [],
        }),
    }),
    {
      name: "meal-storage",
    }
  )
);