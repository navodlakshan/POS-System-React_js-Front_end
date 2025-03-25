"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function Profile() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setProfileImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} profileImage={profileImage} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-6">Profile</h2>

                    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
                        <div className="flex items-center mb-6">
                            <div className="relative">
                                <div
                                    className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
                                    onClick={triggerFileInput}
                                >
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500 text-2xl">👤</span>
                                    )}
                                </div>
                                <button
                                    className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-blue-600 transition-colors"
                                    onClick={triggerFileInput}
                                >
                                    +
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <h3 className="ml-4 text-xl font-semibold">Profile Picture</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    defaultValue="current_username"
                                    className="w-full p-2 border rounded bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    defaultValue="user@example.com"
                                    className="w-full p-2 border rounded bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    defaultValue="+1234567890"
                                    className="w-full p-2 border rounded bg-gray-50"
                                />
                            </div>
                        </div>

                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}