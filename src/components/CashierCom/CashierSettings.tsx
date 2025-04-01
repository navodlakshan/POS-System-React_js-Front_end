// src/components/CashierCom/CashierSettings.tsx

"use client";

import React, { useState, useRef } from "react";
import { Camera, Check, Edit, Lock, Trash2, User } from "lucide-react";
import Image from "next/image";
import CashierSidebar from "@/components/CashierCom/CashierSidebar";
import CashierHeader from "@/components/CashierCom/CashierHeader";

export default function CashierSettings() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        username: "current_user",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file (JPEG, PNG)');
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

    const validateForm = (section: 'profile' | 'password') => {
        let valid = true;
        const newErrors = {
            username: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };

        if (section === 'profile') {
            if (!formData.username.trim()) {
                newErrors.username = "Username is required";
                valid = false;
            } else if (formData.username.length < 3) {
                newErrors.username = "Username must be at least 3 characters";
                valid = false;
            }
        }

        if (section === 'password') {
            if (!formData.currentPassword) {
                newErrors.currentPassword = "Current password is required";
                valid = false;
            }

            if (!formData.newPassword) {
                newErrors.newPassword = "New password is required";
                valid = false;
            } else if (formData.newPassword.length < 8) {
                newErrors.newPassword = "Password must be at least 8 characters";
                valid = false;
            }

            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm('profile')) {
            console.log("Profile updated:", formData.username);
            setIsEditingUsername(false);
            alert("Profile updated successfully!");
        }
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm('password')) {
            console.log("Password changed");
            setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
            alert("Password updated successfully!");
        }
    };

    const handleAccountDelete = () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            console.log("Account deletion requested");
        }
    };

    return (
        <div className={`flex min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {isSidebarVisible && <CashierSidebar />}
            <div className="flex-1 transition-all">
                <CashierHeader
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                    profileImage={profileImage}
                />
                <div className={`p-4 md:p-6 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Account Settings
                    </h2>

                    <div className={`p-6 rounded-lg shadow-md w-full max-w-3xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        {/* Profile Section */}
                        <div className="mb-8">
                            <div className="flex items-center mb-6">
                                <div className="relative group">
                                    <div
                                        className={`w-20 h-20 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center overflow-hidden cursor-pointer relative`}
                                        onClick={triggerFileInput}
                                    >
                                        {profileImage ? (
                                            <Image
                                                src={profileImage}
                                                alt="Profile"
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className={`w-10 h-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                        )}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                                            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    <button
                                        className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-md"
                                        onClick={triggerFileInput}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/png, image/jpeg"
                                        className="hidden"
                                    />
                                </div>
                                <div className="ml-6">
                                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                        Profile Picture
                                    </h3>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Click to upload new photo (max 2MB)
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileUpdate}>
                                <div className="mb-4">
                                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Username
                                    </label>
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                disabled={!isEditingUsername}
                                                className={`w-full p-3 border rounded-lg ${errors.username ? 'border-red-500' : 'border-gray-300'} ${!isEditingUsername ? (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100') : (darkMode ? 'bg-gray-700 text-white' : 'bg-white')}`}
                                            />
                                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                        </div>
                                        {isEditingUsername ? (
                                            <button
                                                type="submit"
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                            >
                                                <Check className="w-4 h-4" />
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setIsEditingUsername(true)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Password Section */}
                        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
                            <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                <Lock className="w-5 h-5" />
                                Change Password
                            </h3>

                            <form onSubmit={handlePasswordUpdate}>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            className={`w-full p-3 border rounded-lg ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                                        />
                                        {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
                                    </div>
                                    <div>
                                        <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            className={`w-full p-3 border rounded-lg ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                                        />
                                        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                                    </div>
                                    <div>
                                        <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`w-full p-3 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                                        />
                                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <Check className="w-4 h-4" />
                                        Update Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAccountDelete}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}