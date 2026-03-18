import { Metadata } from "next";
import RegisterPageClient from "./RegisterPageClient";

export const metadata: Metadata = {
  title: "Sign Up - Create Your Calorie Tracker Account",
  description: "Join Calorie Tracker to start monitoring your nutrition and reach your health goals with AI-powered meal analysis.",
  keywords: ["sign up", "register", "calorie tracker", "create account", "nutrition"],
  openGraph: {
    title: "Sign Up - Calorie Tracker",
    description: "Create your account and start tracking meals with AI-powered nutrition analysis.",
    type: "website",
  },
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}