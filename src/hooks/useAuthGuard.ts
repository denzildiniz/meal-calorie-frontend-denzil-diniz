"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export const useAuthGuard = () => {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!token) {
      router.replace("/login");
    }
  }, [token, isHydrated]);
};