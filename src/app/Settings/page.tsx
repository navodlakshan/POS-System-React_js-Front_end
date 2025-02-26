"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function Settings() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} />
                <div className="p-4">
                    <div className="flex items-center text-gray-500">
                        <h2 className="text-2xl font-bold mb-4">Settings</h2>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-md w-full md:w-2/3">
                        <div className="flex items-center mb-4">
                            <div
                                className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white text-2xl">
                                👤
                            </div>
                            <h3 className="ml-4 text-2xl font-semibold">Change Profile</h3>
                        </div>
                        <label className="mt-6 text-xl font-semibold">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 mb-4 border rounded bg-gray-100"
                            value="Username"
                            readOnly
                        />
                        <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>

                        <h3 className="mt-6 text-xl font-semibold">Change Password</h3>
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full p-2 mb-2 border rounded bg-gray-100"
                        />
                        <input
                            type="password"
                            placeholder="New password"
                            className="w-full p-2 mb-2 border rounded bg-gray-100"
                        />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full p-2 mb-4 border rounded bg-gray-100"
                        />
                        <div className="flex">
                            <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded ml-12">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}