import { useRateLimit } from "@/hooks/useRateLimit";
import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RateLimitIndicator() {
  const {
    limit,
    remaining,
    isRateLimited,
    timeUntilReset,
    usagePercentage,
    canMakeRequest
  } = useRateLimit();

  if (!limit || remaining === null) return null;

  const formatTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (isRateLimited) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        Rate Limited
        {timeUntilReset && (
          <span className="ml-1">
            ({formatTime(timeUntilReset)})
          </span>
        )}
      </Badge>
    );
  }

  if (usagePercentage >= 80) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1 text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400">
        <Clock className="w-3 h-3" />
        {remaining} left
        {timeUntilReset && (
          <span className="ml-1 text-xs">
            ({formatTime(timeUntilReset)})
          </span>
        )}
      </Badge>
    );
  }

  return null;
}