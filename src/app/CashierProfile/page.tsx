// src/app/CashierProfile/page.tsx

"use client";

import React, { useState, useRef } from "react";
import { Camera, Edit2, Save } from "lucide-react";
import CashierSidebar from "@/components/CashierSidebar";
import CashierHeader from "@/components/CashierHeader";
import Image from "next/image";

export default function CashierProfile() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "current_username",
        email: "user@example.com",
        phone: "+1234567890"
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        phone: ""
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert('Image size should be less than 2MB');
                return;
            }

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            username: "",
            email: "",
            phone: ""
        };

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
            valid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
            valid = false;
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", { ...formData, profileImage });
            alert("Profile updated successfully!");
        }
    };

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {isSidebarVisible && <CashierSidebar />}
            <div className="flex-1 transition-all">
                <CashierHeader
                    onMenuClick={toggleSidebar}
                    profileImage={profileImage}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                    notificationCount={0}
                />
                <div className="p-4 md:p-6">
                    <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Profile Settings
                    </h2>

                    <form onSubmit={handleSubmit} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md w-full max-w-2xl`}>
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className="flex flex-col items-center">
                                <div className="relative group">
                                    <div
                                        className={`w-24 h-24 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center overflow-hidden cursor-pointer relative`}
                                        onClick={triggerFileInput}
                                    >
                                        {profileImage ? (
                                            <Image
                                                src={profileImage}
                                                alt="Profile"
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-4xl`}>👤</span>
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                                            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-md"
                                        onClick={triggerFileInput}
                                        aria-label="Change profile picture"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="hidden"
                                    />
                                </div>
                                <p className={`mt-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Click to upload new photo
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    PNG, JPG (max. 2MB)
                                </p>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : darkMode ? 'border-gray-600' : 'border-gray-300'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                </div>
                                <div>
                                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : darkMode ? 'border-gray-600' : 'border-gray-300'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : darkMode ? 'border-gray-600' : 'border-gray-300'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors shadow-md"
                            >
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}