import { Metadata } from "next";
import DashboardPageClient from "./DashboardPageClient";

export const metadata: Metadata = {
  title: "Dashboard - Your Calorie Tracking History | Calorie Tracker",
  description: "View your meal history, track calorie intake, and monitor your nutritional progress with our comprehensive dashboard.",
  keywords: ["dashboard", "meal history", "calorie tracking", "nutrition dashboard", "progress"],
  openGraph: {
    title: "Dashboard - Your Calorie Tracking History",
    description: "Monitor your nutritional progress and meal history in one place.",
    type: "website",
  },
};

export default function DashboardPage() {
  return <DashboardPageClient />;
}