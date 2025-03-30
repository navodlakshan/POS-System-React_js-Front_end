// src/app/Login/page.tsx

"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';

export default function LoginPage() {
    // Main login form states
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        keepLoggedIn: false
    });
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Forgot password states
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
    });
    const [forgotPasswordErrors, setForgotPasswordErrors] = useState({
        email: ''
    });
    const [resetSent, setResetSent] = useState(false);

    // Handle login form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate login form
    const validateLoginForm = () => {
        let isValid = true;
        const newErrors = {
            username: '',
            password: ''
        };

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle login submission
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateLoginForm()) {
            setIsLoading(true);
            try {
                // Simulate API call with error handling
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (formData.username === 'demo' && formData.password === 'password') {
                            resolve('Login successful');
                        } else {
                            reject(new Error('Invalid credentials'));
                        }
                    }, 1500);
                });
                console.log('Login successful:', formData);
                // Here you would typically redirect on successful login
            } catch {
                setErrors({
                    username: 'Invalid credentials',
                    password: 'Invalid credentials'
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle forgot password form changes
    const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForgotPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (forgotPasswordErrors[name as keyof typeof forgotPasswordErrors]) {
            setForgotPasswordErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate forgot password form
    const validateForgotPasswordForm = () => {
        let isValid = true;
        const newErrors = {
            email: ''
        };

        if (!forgotPasswordData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(forgotPasswordData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        setForgotPasswordErrors(newErrors);
        return isValid;
    };

    // Handle forgot password submission
    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForgotPasswordForm()) {
            try {
                // Simulate API call to send reset link
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Password reset requested for:', forgotPasswordData.email);
                setResetSent(true);
            } catch {
                setForgotPasswordErrors({
                    email: 'Failed to send reset link. Please try again.'
                });
            }
        }
    };

    // Open forgot password modal
    const openForgotPasswordModal = () => {
        setIsForgotPasswordModalOpen(true);
        setResetSent(false);
        setForgotPasswordData({ email: '' });
        setForgotPasswordErrors({ email: '' });
    };

    // Close forgot password modal
    const closeModal = () => {
        setIsForgotPasswordModalOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-gray-100">
            {/* Marketing Image on the left */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
                <div className="relative w-full h-full max-w-2xl">
                    <Image
                        src="/Infinity.gif"
                        alt="POS System Dashboard"
                        width={800}
                        height={600}
                        className="rounded-xl shadow-xl object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to access your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    placeholder="Enter your username"
                                />
                            </div>
                            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FiEye className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="keepLoggedIn"
                                    name="keepLoggedIn"
                                    checked={formData.keepLoggedIn}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="keepLoggedIn" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={openForgotPasswordModal}
                                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-white font-medium ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    {/* Forgot Password Modal */}
                    {isForgotPasswordModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {resetSent ? 'Check Your Email' : 'Reset Password'}
                                    </h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>

                                {resetSent ? (
                                    <div className="text-center py-4">
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                            <FiMail className="h-6 w-6 text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Reset Link Sent</h3>
                                        <p className="text-gray-600 mb-6">
                                            We&apos;ve sent instructions to <span className="font-semibold">{forgotPasswordData.email}</span>.
                                            Please check your email to reset your password.
                                        </p>
                                        <button
                                            onClick={closeModal}
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                        >
                                            Return to Login
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-gray-600 mb-4">
                                            Enter your email address and we&apos;ll send you a link to reset your password.
                                        </p>
                                        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiMail className="text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={forgotPasswordData.email}
                                                        onChange={handleForgotPasswordChange}
                                                        className={`w-full pl-10 pr-3 py-2 border ${forgotPasswordErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                                {forgotPasswordErrors.email && (
                                                    <p className="mt-1 text-sm text-red-600">{forgotPasswordErrors.email}</p>
                                                )}
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                            >
                                                Send Reset Link
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}