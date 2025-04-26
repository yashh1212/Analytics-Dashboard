"use client";

import { WebSocketStatus } from "@/types";
import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  status: WebSocketStatus;
}

export function ConnectionStatus({ status }: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          status === "connected" && "bg-emerald-500 animate-pulse",
          status === "connecting" && "bg-amber-500 animate-pulse",
          status === "disconnected" && "bg-red-500"
        )}
      />
      <span className="text-xs font-medium">
        {status === "connected" && "Connected"}
        {status === "connecting" && "Connecting..."}
        {status === "disconnected" && "Disconnected"}
      </span>
    </div>
  );
}