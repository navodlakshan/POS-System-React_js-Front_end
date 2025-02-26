"use client";

import { Sidebar } from "@/components/Sidebar";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Metrics } from "@/components/Metrics";
import { SalesChart } from "@/components/SalesChart";

export default function Dashboard() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} />
                <Metrics />
                <div className="p-4">
                    <SalesChart />
                </div>
            </div>
        </div>
    );
}