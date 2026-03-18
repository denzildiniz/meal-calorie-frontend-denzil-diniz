import { useRateLimitStore } from "@/stores/rateLimitStore";
import { useEffect, useState } from "react";

export const useRateLimit = () => {
  const rateLimitStore = useRateLimitStore();
  const [timeUntilReset, setTimeUntilReset] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTimeUntilReset(rateLimitStore.getTimeUntilReset());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [rateLimitStore]);

  return {
    limit: rateLimitStore.limit,
    remaining: rateLimitStore.remaining,
    resetTime: rateLimitStore.resetTime,
    isRateLimited: rateLimitStore.isRateLimited,
    retryAfter: rateLimitStore.retryAfter,
    timeUntilReset,
    canMakeRequest: rateLimitStore.canMakeRequest(),
    usagePercentage: rateLimitStore.limit && rateLimitStore.remaining !== null
      ? ((rateLimitStore.limit - rateLimitStore.remaining) / rateLimitStore.limit) * 100
      : 0,
  };
};