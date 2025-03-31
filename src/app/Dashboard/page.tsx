// src/app/Dashboard/page.tsx
"use client";

import { Sidebar } from "@/components/Sidebar";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Metrics } from "@/components/Metrics";
import { SalesChart } from "@/components/SalesChart";
import { RecentActivity } from "@/components/RecentActivity";
import { RecentOrders } from "@/components/RecentOrders";

export default function Dashboard() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // You might want to save this preference to localStorage
        localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    };

    return (
        <div className={`flex min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 transition-all">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                />

                <main className="p-4 md:p-6 space-y-6">
                    {/* Metrics Overview */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            Performance Overview
                        </h2>
                        <Metrics />
                    </section>

                    {/* Charts Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="lg:col-span-1">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                Sales Analytics
                            </h2>
                            <SalesChart />
                        </div>

                        <div className={"lg:col-span-1 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}"}>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                Recent Activity
                            </h2>
                            <RecentActivity />
                        </div>
                    </section>

                    {/* Recent Orders */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            Recent Orders
                        </h2>
                        <RecentOrders />
                    </section>
                </main>
            </div>
        </div>
    );
}