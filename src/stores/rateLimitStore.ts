import { create } from "zustand";
import { RateLimitState } from "@/types";

export const useRateLimitStore = create<RateLimitState>((set, get) => ({
  limit: null,
  remaining: null,
  resetTime: null,
  isRateLimited: false,
  retryAfter: null,
  lastRequestTime: null,

  updateFromHeaders: (headers: Headers) => {
    const limit = headers.get('RateLimit-Limit');
    const remaining = headers.get('RateLimit-Remaining');
    const reset = headers.get('RateLimit-Reset');

    set({
      limit: limit ? parseInt(limit) : null,
      remaining: remaining ? parseInt(remaining) : null,
      resetTime: reset ? new Date(reset) : null,
      lastRequestTime: new Date(),
    });
  },

  setRateLimited: (retryAfter: number) => {
    set({
      isRateLimited: true,
      retryAfter,
    });

    // Auto-clear rate limit after retryAfter seconds
    setTimeout(() => {
      get().clearRateLimit();
    }, retryAfter * 1000);
  },

  clearRateLimit: () => {
    set({
      isRateLimited: false,
      retryAfter: null,
    });
  },

  canMakeRequest: () => {
    const state = get();
    if (state.isRateLimited) return false;
    if (state.remaining !== null && state.remaining <= 0) return false;
    return true;
  },

  getTimeUntilReset: () => {
    const state = get();
    if (!state.resetTime) return null;
    return Math.max(0, state.resetTime.getTime() - Date.now());
  },
}));