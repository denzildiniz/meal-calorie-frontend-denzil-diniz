"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/lib/validations";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthResponse } from "@/types";

type Props = { type: "login" | "register" };

export default function AuthForm({ type }: Props) {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const { canMakeRequest, timeUntilReset } = useRateLimit();

  const [loading, setLoading] = useState(false);

  const schema = type === "login" ? loginSchema : registerSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues:
      type === "login"
        ? { email: "", password: "" }
        : { firstName: "", lastName: "", email: "", password: "" },
  });

  useEffect(() => {
    const firstError = Object.keys(form.formState.errors)[0];
    if (firstError) {
      form.setFocus(firstError as any);
    }
  }, [form.formState.errors]);

  const onSubmit = async (data: any) => {
    if (!form.formState.isValid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    if (!canMakeRequest) {
      const resetTime = timeUntilReset ? Math.ceil(timeUntilReset / 1000) : 60;
      toast.error(`Too many attempts. Try again in ${resetTime} seconds.`);
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        type === "login" ? "/api/auth/login" : "/api/auth/register";

      const payload =
        type === "register"
          ? {
              first_name: data.firstName,
              last_name: data.lastName,
              email: data.email,
              password: data.password,
            }
          : data;

      const res = await api<AuthResponse>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setAuth(res);

      toast.success(
        type === "login"
          ? "Welcome back "
          : "Account created successfully"
      );

      router.push("/dashboard");
    } catch (err: any) {
      let message = "Something went wrong";

      // API error handling
      if (err.status === 400) {
        message = "Missing email or password";
      } else if (err.status === 401) {
        message = "Invalid email or password";
      } else if (err.status === 403) {
        message = "Access forbidden. Please try logging in again.";
        // For auth forms, 403 might indicate token issues, so redirect after a delay
        setTimeout(() => router.push("/login"), 2000);
      } else if (err.status === 429) {
        const retryAfter = err?.retryAfter;
        const resetTime = retryAfter || timeUntilReset ? Math.ceil((timeUntilReset || 60000) / 1000) : 60;
        message = `Too many attempts. Try again in ${resetTime} seconds.`;
      } else if (err.message?.toLowerCase().includes("email")) {
        message = "Email already exists";
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-4 bg-white/80 backdrop-blur-md dark:bg-zinc-900/90">
      <CardHeader className="pt-8 pb-4 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {type === "login" ? "Welcome back!" : "Join the kitchen"}
        </CardTitle>
        <CardDescription className="text-base text-zinc-500">
          {type === "login"
            ? "We missed you and your recipes."
            : "Start your journey to a healthier you."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === "register" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>First Name</Label>
                <Input {...form.register("firstName")} placeholder="John" />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {form.formState.errors.firstName.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label>Last Name</Label>
                <Input {...form.register("lastName")} placeholder="Doe" />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {form.formState.errors.lastName.message as string}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <Label>Email</Label>
            <Input type="email" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.email.message as string}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input type="password" {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.password.message as string}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || !form.formState.isValid}
            className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg mt-4"
          >
            {loading
              ? "Please wait..."
              : type === "login"
              ? "Sign In"
              : "Get Started"}
          </Button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            className="text-sm text-zinc-500 hover:text-orange-600"
            onClick={() =>
              router.push(type === "login" ? "/register" : "/login")
            }
          >
            {type === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}