import { Metadata } from "next";
import LoginPageClient from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Login - Access Your Calorie Tracker Account",
  description: "Sign in to your Calorie Tracker account to continue tracking your meals and nutrition goals.",
  keywords: ["login", "sign in", "calorie tracker", "account access"],
  openGraph: {
    title: "Login - Calorie Tracker",
    description: "Access your account to track meals and nutrition.",
    type: "website",
  },
};

export default function LoginPage() {
  return <LoginPageClient />;
}