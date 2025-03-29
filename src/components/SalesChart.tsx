// src/components/SalesChart.tsx

"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, TooltipProps } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/Ui/Card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/Ui/Chart";

interface ChartData {
    month: string;
    desktop: number;
    mobile?: number;
    trend?: 'up' | 'down';
}

const chartData: ChartData[] = [
    { month: "Jan", desktop: 186, mobile: 120, trend: 'up' },
    { month: "Feb", desktop: 305, mobile: 210, trend: 'up' },
    { month: "Mar", desktop: 237, mobile: 180, trend: 'down' },
    { month: "Apr", desktop: 73, mobile: 50, trend: 'down' },
    { month: "May", desktop: 209, mobile: 150, trend: 'up' },
    { month: "Jun", desktop: 214, mobile: 160, trend: 'up' },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--primary))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--secondary))",
    },
} satisfies ChartConfig;

export const SalesChart = () => {
    // Calculate average and trend
    const totalDesktop = chartData.reduce((sum, data) => sum + data.desktop, 0);
    const avgDesktop = Math.round(totalDesktop / chartData.length);
    const lastMonth = chartData[chartData.length - 1];
    const trendPercentage = 5.2;

    // Custom Tooltip Content Component
    const CustomTooltipContent = ({ active, payload }: TooltipProps<number, string>) => {
        if (!active || !payload || payload.length === 0) return null;

        return (
            <div className="bg-background p-4 border rounded-md shadow-sm">
                <p className="font-medium">{payload[0].payload.month}</p>
                {payload.map((entry) => (
                    <div key={entry.dataKey} className="flex items-center">
                        <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm">
                            {entry.name}: {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-background p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Sales Analytics</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <Card className="border-none shadow-none">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Monthly Sales Performance</CardTitle>
                    <CardDescription>January - June 2024 | Avg: {avgDesktop} visitors</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                    <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    stroke="hsl(var(--border))"
                                    strokeDasharray="3 3"
                                />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<CustomTooltipContent />}
                                />
                                <Line
                                    dataKey="desktop"
                                    type="monotone"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    dataKey="mobile"
                                    type="monotone"
                                    stroke="hsl(var(--secondary))"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: 'hsl(var(--secondary))' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-1 pt-0">
                    <div className="flex items-center gap-2 font-medium">
                        {lastMonth.trend === 'up' ? (
                            <>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-green-500">
                                    Up by {trendPercentage}% this month
                                </span>
                            </>
                        ) : (
                            <>
                                <TrendingDown className="h-4 w-4 text-red-500" />
                                <span className="text-red-500">
                                    Down by {trendPercentage}% this month
                                </span>
                            </>
                        )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Comparing desktop and mobile visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};