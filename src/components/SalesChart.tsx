import React from 'react';

export const SalesChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <div className="bg-background text-foreground p-6 rounded-lg shadow-md mt-4 px-8">
            <h2 className="text-lg font-semibold mb-4">Sales Details</h2>
            <div className="flex justify-between">
                {months.map((month, index) => (
                    <span key={index} className="text-sm">
            {month}
          </span>
                ))}
            </div>
            {/* Placeholder for Chart */}
            <div className="mt-4 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart Placeholder</p>
            </div>
        </div>
    );
};