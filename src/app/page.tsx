import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Calorie Tracker - Track Your Meals with AI",
  description: "Your personal AI-powered calorie tracker. Analyze meals, track nutrition, and reach your health goals with our intuitive app.",
  keywords: ["calorie tracker", "nutrition", "meal analysis", "AI", "health", "diet"],
  openGraph: {
    title: "Calorie Tracker - Track Your Meals with AI",
    description: "Analyze meals, track nutrition, and reach your health goals with AI-powered calorie tracking.",
    type: "website",
  },
};

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}