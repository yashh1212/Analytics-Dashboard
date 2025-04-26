"use client";

import { useEffect, useState } from "react";
import { useWebSocket } from "@/lib/socket";

import { ActiveUsersChart } from "@/components/active-users-chart";
import { ActivityMetricsChart } from "@/components/activity-metrics-chart";
import { StatsCards } from "@/components/stats-cards";
import { ActivityFeed } from "@/components/activity-feed";
import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardStats } from "@/types";

export default function DashboardPage() {
  const { status, activeUsers, activityFeed, metrics } = useWebSocket(); // NO reconnect
  const [stats, setStats] = useState<DashboardStats>({
    activeUsers: 0,
    totalPageViews: 0,
    averageSessionTime: "0m 0s",
    bounceRate: "0%",
  });

  useEffect(() => {
    setStats({
      activeUsers,
      totalPageViews: Math.floor(activeUsers * (Math.random() * 5 + 2)),
      averageSessionTime: `${Math.floor(Math.random() * 10 + 1)}m ${Math.floor(
        Math.random() * 50 + 10
      )}s`,
      bounceRate: `${Math.floor(Math.random() * 40 + 10)}%`,
    });
  }, [activeUsers]);
  return (
    <DashboardLayout status={status}>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCards stats={stats} />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <ActiveUsersChart activeUsers={activeUsers} />
            {metrics.length > 0 && <ActivityMetricsChart metrics={metrics} />}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="col-span-3 lg:col-span-4">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <p className="text-muted-foreground">
                This section shows a real-time feed of user activities on your platform. The data is streamed via WebSockets to provide up-to-the-minute insights.
              </p>
            </div>
            <ActivityFeed items={activityFeed} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}