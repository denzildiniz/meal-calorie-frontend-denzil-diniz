export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CalorieResponse {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  source?: string;
  macronutrients_per_serving?: Macronutrients;
  total_macronutrients?: Macronutrients;
}

export interface Macronutrients {
  protein: number;
  carbohydrates: number;
  total_fat: number;
  fiber?: number;
  sugars?: number;
  saturated_fat?: number;
}

export interface Meal {
  dish: string;
  servings: number;
  caloriesPerServing: number;
  totalCalories: number;
  source?: string;
  macrosPerServing?: Macronutrients;
  totalMacros?: Macronutrients;
}

export interface ApiError {
  status: number;
  message: string;
  retryAfter?: number;
}

export interface RateLimitedResponse {
  retryAfter: number;
  message: string;
}

export interface RateLimitState {
  limit: number | null;
  remaining: number | null;
  resetTime: Date | null;
  isRateLimited: boolean;
  retryAfter: number | null;
  lastRequestTime: Date | null;

  // Actions
  updateFromHeaders: (headers: Headers) => void;
  setRateLimited: (retryAfter: number) => void;
  clearRateLimit: () => void;
  canMakeRequest: () => boolean;
  getTimeUntilReset: () => number | null;
}

export interface MacroBarProps {
  label: string;
  value: number | null | undefined;
  color: string;
  max?: number;
}