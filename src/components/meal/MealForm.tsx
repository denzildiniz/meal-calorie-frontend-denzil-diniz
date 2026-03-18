"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mealSchema } from "@/lib/validations";
import { z } from "zod";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useMealStore } from "@/stores/mealStore";
import { useRateLimit } from "@/hooks/useRateLimit";
import { toast } from "sonner";
import { CalorieResponse } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Calculator, ChevronRight, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof mealSchema>;

type Props = {
  onResult?: () => void;
};

export default function MealForm({ onResult }: Props) {
  const token = useAuthStore((s) => s.token);
  const setResult = useMealStore((s) => s.setResult);
  const { canMakeRequest, timeUntilReset } = useRateLimit();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(mealSchema),
    mode: "onChange",
    defaultValues: {
      dish: "",
      servings: 1,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!form.formState.isValid) {
      toast.error("Please enter valid meal details");
      return;
    }

    if (!canMakeRequest) {
      const resetTime = timeUntilReset ? Math.ceil(timeUntilReset / 1000) : 60;
      toast.error(`Rate limit exceeded. Try again in ${resetTime} seconds.`);
      return;
    }

    setLoading(true);

    try {
      const res = await api<CalorieResponse>(
        "/api/get-calories",
        {
          method: "POST",
          body: JSON.stringify({
            dish_name: data.dish,
            servings: data.servings,
          }),
        },
        token!
      );

      const mappedResult = {
        dish: res.dish_name,
        servings: res.servings,
        caloriesPerServing: res.calories_per_serving,
        totalCalories: res.total_calories,
        source: res.source,
        macrosPerServing: res.macronutrients_per_serving,
        totalMacros: res.total_macronutrients,
      };

      setResult(mappedResult);

      toast.success("Nutrition data retrieved");

      onResult?.();

    } catch (err: any) {
      const status = err?.status || err?.response?.status;
      const retryAfter = err?.retryAfter;

      if (status === 403) {
        toast.error("Session expired. Redirecting to login...");
        router.push("/login");
        return;
      } else if (status === 404) {
        toast.error("Dish not found - try a different name");
      } else if (status === 422) {
        toast.error("No calorie data available for this dish");
      } else if (status === 429) {
        const resetTime = retryAfter || timeUntilReset ? Math.ceil((timeUntilReset || 60000) / 1000) : 60;
        toast.error(`Rate limit exceeded. Try again in ${resetTime} seconds.`);
      } else if (status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(err?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div className="space-y-2 group">
          <Label className="text-sm font-bold ml-1 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-orange-500" />
            What are you eating?
          </Label>

          <div className="relative">
            <Input
              placeholder="e.g. Avocado Toast or Chicken Biryani"
              {...form.register("dish")}
              className="h-14 pl-12 text-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          </div>

          {form.formState.errors.dish && (
            <p className="text-xs text-red-500 ml-2 italic">
              {form.formState.errors.dish.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold ml-1 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-orange-500" />
            How many servings?
          </Label>

          <Input
            type="number"
            min={1}
            {...form.register("servings", { valueAsNumber: true })}
            className="h-14 text-lg"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !form.formState.isValid || !canMakeRequest}
          className="w-full h-16 bg-orange-500 text-white text-xl font-black disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Calculating...
            </span>
          ) : !canMakeRequest ? (
            <span className="flex items-center justify-center gap-2">
              Rate Limited
              <span className="text-sm ml-2">
                ({timeUntilReset ? Math.ceil(timeUntilReset / 1000) : 60}s)
              </span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Get Nutrition Data
              <ChevronRight className="w-6 h-6" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}