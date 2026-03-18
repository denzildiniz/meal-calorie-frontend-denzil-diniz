import { useRateLimitStore } from "@/stores/rateLimitStore";
import { ApiError, RateLimitedResponse } from "@/types";
import { useAuthStore } from "@/stores/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = async <T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> => {
  const rateLimitStore = useRateLimitStore.getState();

  if (!rateLimitStore.canMakeRequest()) {
    const timeUntilReset = rateLimitStore.getTimeUntilReset();
    throw {
      status: 429,
      message: `Rate limit exceeded. Try again in ${Math.ceil((timeUntilReset || 60000) / 1000)} seconds.`,
      retryAfter: Math.ceil((timeUntilReset || 60000) / 1000),
    } as ApiError;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  rateLimitStore.updateFromHeaders(res.headers);

  if (!res.ok) {
    if (res.status === 429) {
      let retryAfter = 60;
      let message = "Rate limit exceeded";

      try {
        const rateLimitData: RateLimitedResponse = await res.json();
        retryAfter = rateLimitData.retryAfter;
        message = rateLimitData.message || message;
      } catch {}

      rateLimitStore.setRateLimited(retryAfter);

      throw {
        status: 429,
        message,
        retryAfter,
      } as ApiError;
    }

    if (res.status === 403) {
      // Token expired or forbidden - clear auth store
      const authStore = useAuthStore.getState();
      authStore.logout();

      throw {
        status: 403,
        message: "Session expired. Please log in again.",
      } as ApiError;
    }

    let message = "Something went wrong";
    try {
      const err = await res.json();
      message = err.message || message;
    } catch {}

    throw {
      status: res.status,
      message,
    } as ApiError;
  }

  return res.json();
};