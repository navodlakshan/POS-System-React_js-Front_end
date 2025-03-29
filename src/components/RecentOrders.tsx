// src/components/RecentOrders.tsx
"use client";

import { ShoppingBag } from 'lucide-react';

interface Order {
    id: number;
    customer: string;
    date: string;
    amount: string;
    status: 'completed' | 'pending' | 'failed';
}

export const RecentOrders = () => {
    const orders: Order[] = [
        {
            id: 1,
            customer: "John Smith",
            date: "2023-05-15",
            amount: "$125.00",
            status: "completed"
        },
        {
            id: 2,
            customer: "Emily Johnson",
            date: "2023-05-14",
            amount: "$89.99",
            status: "completed"
        },
        {
            id: 3,
            customer: "Michael Brown",
            date: "2023-05-14",
            amount: "$234.50",
            status: "pending"
        },
        {
            id: 4,
            customer: "Sarah Davis",
            date: "2023-05-13",
            amount: "$56.75",
            status: "failed"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
            <div className="flex items-center mb-4">
                <ShoppingBag className="w-5 h-5 mr-2 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Orders</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            #{order.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {order.customer}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {order.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {order.amount}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="mt-4 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                View all orders
            </button>
        </div>
    );
};