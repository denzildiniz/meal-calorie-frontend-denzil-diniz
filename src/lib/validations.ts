import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const mealSchema = z.object({
  dish: z.string().min(2, "Dish name must be at least 2 characters").max(100, "Dish name must be less than 100 characters"),
  servings: z.number().min(1, "Servings must be at least 1"),
});