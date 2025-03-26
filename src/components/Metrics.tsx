import React from 'react';

export const Metrics = () => {
    const metricsData = [
        { title: 'Total Product', value: '10293', change: '1.3% Up from past week' },
        { title: 'Total Orders', value: '10293', change: '1.3% Up from past week' },
        { title: 'Total Earning', value: '10293', change: '1.3% Up from past week' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {metricsData.map((metric, index) => (
                <div key={index} className="bg-cyan-300 text-foreground p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">{metric.title}</h2>
                    <p className="text-2xl font-bold mt-2">{metric.value}</p>
                    <p className="text-green-600 mt-2">{metric.change}</p>
                </div>
            ))}
        </div>
    );
};