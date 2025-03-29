// src/components/Metrics.tsx

import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon?: React.ReactNode;
}

const MetricCard = ({ title, value, change, isPositive, icon }: MetricCardProps) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
                <p className="text-2xl font-bold mt-1 dark:text-white">{value}</p>
            </div>
            {icon && (
                <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                    {icon}
                </div>
            )}
        </div>
        <div className={`flex items-center mt-4 text-sm ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositive ? (
                <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
            )}
            <span>{change}</span>
        </div>
    </div>
);

export const Metrics = () => {
    const metricsData = [
        {
            title: 'Total Products',
            value: '10,293',
            change: '1.3% from last week',
            isPositive: true,
            icon: <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        },
        {
            title: 'Total Orders',
            value: '8,742',
            change: '0.8% from last week',
            isPositive: true,
            icon: <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        },
        {
            title: 'Total Revenue',
            value: '$89,421',
            change: '2.1% from last week',
            isPositive: true,
            icon: <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        },
        {
            title: 'Return Rate',
            value: '3.2%',
            change: '0.5% from last week',
            isPositive: false,
            icon: <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {metricsData.map((metric, index) => (
                <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    change={metric.change}
                    isPositive={metric.isPositive}
                    icon={metric.icon}
                />
            ))}
        </div>
    );
};