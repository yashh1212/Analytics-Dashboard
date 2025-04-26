"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { ActivityMetric } from "@/types";

interface ActivityMetricsChartProps {
  metrics: ActivityMetric[];
}

export function ActivityMetricsChart({ metrics }: ActivityMetricsChartProps) {
  const loading = metrics.length === 0;

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Activity Metrics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[200px] w-full pt-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
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
                <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}