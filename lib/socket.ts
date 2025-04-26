// hooks/useWebSocket.ts
"use client";

import { useState, useEffect, useCallback } from "react";

// Types
export type WebSocketStatus = "connected";

export interface ActivityFeedItem {
  id: string;
  user: string;
  action: string;
  page: string;
  timestamp: string;
}

export function useWebSocket() {
  const [status, setStatus] = useState<WebSocketStatus>("connected");
  const [activeUsers, setActiveUsers] = useState<number>(1);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([]);
  const [metrics, setMetrics] = useState<{ name: string; value: number }[]>([]);

  const generateRandomActivity = () => {
    const actions = [
      { action: "viewed page", page: "dashboard" },
      { action: "clicked button", page: "profile" },
      { action: "submitted form", page: "settings" },
      { action: "left comment", page: "posts" },
    ];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    return {
      id: Math.random().toString(36).substring(2, 9),
      user: `user${Math.floor(Math.random() * 10) + 1}@example.com`,
      action: randomAction.action,
      page: randomAction.page,
      timestamp: new Date().toISOString(),
    };
  };

  const generateRandomMetrics = () => [
    { name: "Page Views", value: Math.floor(Math.random() * 200) },
    { name: "Clicks", value: Math.floor(Math.random() * 100) },
    { name: "Form Submissions", value: Math.floor(Math.random() * 50) },
    { name: "Comments", value: Math.floor(Math.random() * 30) },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 10) + 1); // Random between 1-10 users
      setActivityFeed((prev) => {
        const newFeed = [generateRandomActivity(), ...prev];
        return newFeed.slice(0, 10); // Keep only the latest 10
      });
      setMetrics(generateRandomMetrics());
    }, 3000); // Every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    status,
    activeUsers,
    activityFeed,
    metrics,
  };
}
