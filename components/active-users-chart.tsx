"use client";

import { useEffect, useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { UserActivity } from "@/types";

interface ActiveUsersChartProps {
  activeUsers: number;
}

export function ActiveUsersChart({ activeUsers }: ActiveUsersChartProps) {
  const [data, setData] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Add the new active users count to the chart data
    const timestamp = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
    
    setData(prev => {
      const newData = [...prev, { timestamp, count: activeUsers }];
      
      // Keep only the last 20 data points
      if (newData.length > 20) {
        return newData.slice(newData.length - 20);
      }
      
      return newData;
    });
    
    setLoading(false);
  }, [activeUsers]);

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Active Users</CardTitle>
        <div className="flex items-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            <span className="flex h-1.5 w-1.5 mr-1 rounded-full bg-emerald-500"></span>
            Live
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full pt-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="timestamp" 
                  tick={{ fontSize: 10 }} 
                  tickLine={{ stroke: 'hsl(var(--muted))' }}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                />
                <YAxis 
                  tick={{ fontSize: 10 }} 
                  tickLine={{ stroke: 'hsl(var(--muted))' }}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{
                    color: 'hsl(var(--card-foreground))',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--chart-1))" 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}