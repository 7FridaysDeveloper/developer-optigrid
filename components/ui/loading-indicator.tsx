"use client";

import { useLinkStatus } from "next/link";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  className?: string;
  showSpinner?: boolean;
  showText?: boolean;
}

export function LoadingIndicator({
  className,
  showSpinner = true,
  showText = false,
}: LoadingIndicatorProps) {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showSpinner && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {showText && <span className="text-sm text-gray-400">Loading...</span>}
    </div>
  );
}

export function NavigationProgress() {
  return (
    <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-blue-500/20">
      <div className="h-full animate-pulse bg-blue-500">
        <div className="h-full animate-ping bg-blue-400"></div>
      </div>
    </div>
  );
}
