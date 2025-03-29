// src/components/RecentActivity.tsx
"use client";

import { Activity } from 'lucide-react';

interface ActivityItem {
    id: number;
    user: string;
    action: string;
    time: string;
    avatar: string;
}

export const RecentActivity = () => {
    const activities: ActivityItem[] = [
        {
            id: 1,
            user: "John Doe",
            action: "added new product",
            time: "2 minutes ago",
            avatar: "/avatars/1.jpg"
        },
        {
            id: 2,
            user: "Jane Smith",
            action: "updated inventory",
            time: "15 minutes ago",
            avatar: "/avatars/2.jpg"
        },
        {
            id: 3,
            user: "Mike Johnson",
            action: "processed order #1234",
            time: "1 hour ago",
            avatar: "/avatars/3.jpg"
        },
        {
            id: 4,
            user: "Sarah Williams",
            action: "responded to customer inquiry",
            time: "3 hours ago",
            avatar: "/avatars/4.jpg"
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center mb-4">
                <Activity className="w-5 h-5 mr-2 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
            </div>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                {activity.user.charAt(0)}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {activity.user} {activity.action}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {activity.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-4 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                View all activity
            </button>
        </div>
    );
};