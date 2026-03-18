"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPageClient() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) router.replace("/dashboard");
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0] dark:bg-zinc-950 px-4 overflow-hidden relative">
      <div className="absolute top-0 -left-20 w-72 h-72 bg-orange-200/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center relative z-10">

        <div className="hidden md:flex flex-col space-y-6 p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl rotate-3 shadow-lg mb-4">
            <span className="text-white text-3xl font-bold">C</span>
          </div>
          <h1 className="text-6xl font-black text-zinc-900 dark:text-red-500 leading-tight tracking-tight">
            Eat better, <br />
            <span className="text-orange-500 italic">feel better.</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Your personal companion for mindful eating. Track calories,
            discover nutrients, and reach your goals.
          </p>


        </div>

        <div className="flex justify-center md:justify-end">
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
}