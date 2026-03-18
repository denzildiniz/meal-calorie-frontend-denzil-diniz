import { Metadata } from "next";
import CaloriesPageClient from "./CaloriesPageClient";

export const metadata: Metadata = {
  title: "Calorie Calculator - Analyze Your Meals | Calorie Tracker",
  description: "Use our AI-powered calorie calculator to analyze your meals. Get instant nutritional breakdown, calorie counts, and macronutrient information.",
  keywords: ["calorie calculator", "meal analysis", "nutrition facts", "AI", "calories", "macros"],
  openGraph: {
    title: "Calorie Calculator - Analyze Your Meals",
    description: "Get instant nutritional breakdown and calorie counts for your meals with AI technology.",
    type: "website",
  },
};

export default function CaloriesPage() {
  return <CaloriesPageClient />;
}