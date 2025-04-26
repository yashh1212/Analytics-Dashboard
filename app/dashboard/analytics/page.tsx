"use client";

import { useWebSocket } from "@/lib/socket";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveUsersChart } from "@/components/active-users-chart";
import { ActivityMetricsChart } from "@/components/activity-metrics-chart";

export default function AnalyticsPage() {
  const { status, activeUsers, metrics } = useWebSocket();
  
  return (
    <DashboardLayout status={status}>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="realtime">Realtime</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Analytics Overview</CardTitle>
                    <CardDescription>
                      View a comprehensive overview of your website's performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This dashboard provides real-time analytics about your website traffic and user activity. 
                      The data is continuously updated using WebSockets to give you the most current information.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                    <CardDescription>
                      Real-time view of users currently on your site
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActiveUsersChart activeUsers={activeUsers} />
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Activity Breakdown</CardTitle>
                    <CardDescription>
                      Key metrics by activity type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {metrics.length > 0 ? (
                      <ActivityMetricsChart metrics={metrics} />
                    ) : (
                      <div className="flex h-[200px] items-center justify-center">
                        <p className="text-sm text-muted-foreground">Loading metrics...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="realtime" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Realtime Data</CardTitle>
                  <CardDescription>
                    This feature will display real-time updates as they happen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <p className="text-center text-muted-foreground">
                      Realtime detailed analytics will be available in the next update.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>
                    Generate and view analytical reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <p className="text-center text-muted-foreground">
                      Report generation and export functionality will be available in the next update.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}