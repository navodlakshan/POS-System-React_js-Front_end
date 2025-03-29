"use client";

import React, { useState } from 'react';
import Image from 'next/image';

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
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateLoginForm()) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                console.log('Login data:', formData);
                setIsLoading(false);
                // Here you would typically redirect on successful login
            }, 1500);
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
    const handleForgotPasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForgotPasswordForm()) {
            // Simulate API call to send reset link
            setTimeout(() => {
                console.log('Password reset requested for:', forgotPasswordData.email);
                setResetSent(true);
            }, 1000);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {/* Marketing Image on the left */}
            <div className="hidden md:block h-full">
                <div className="h-full flex items-center justify-center p-4">
                    <Image
                        src="/Marketing.jpg"
                        alt="Marketing"
                        width={3000}
                        height={2500}
                        className="w-full h-auto rounded-lg object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Login Form */}
            <div className="w-full flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-800">ABC POS System</h1>
                    <h2 className="text-xl md:text-2xl mb-6 text-center flex items-center justify-center text-gray-600">
                        Welcome
                        <img
                            src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
                            alt="Wave"
                            className="w-8 h-8 ml-2"
                        />
                    </h2>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="Enter your username"
                            />
                            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                        <div className="mb-6 flex items-center justify-between">
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
                                    Keep me logged in
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={openForgotPasswordModal}
                                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Forgot Password Modal */}
                    {isForgotPasswordModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4">
                                <h2 className="text-xl font-bold mb-4 text-gray-800">
                                    {resetSent ? 'Check Your Email' : 'Forgot Password'}
                                </h2>

                                {resetSent ? (
                                    <div className="text-center">
                                        <div className="mb-4 text-green-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="mb-4 text-gray-600">
                                            We've sent a password reset link to <span className="font-semibold">{forgotPasswordData.email}</span>.
                                            Please check your email to reset your password.
                                        </p>
                                        <button
                                            onClick={closeModal}
                                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Return to Login
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="mb-4 text-gray-600">
                                            Enter your email address and we'll send you a link to reset your password.
                                        </p>
                                        <form onSubmit={handleForgotPasswordSubmit}>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={forgotPasswordData.email}
                                                    onChange={handleForgotPasswordChange}
                                                    className={`w-full px-3 py-2 border ${forgotPasswordErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                                    placeholder="Enter your email"
                                                />
                                                {forgotPasswordErrors.email && (
                                                    <p className="mt-1 text-sm text-red-600">{forgotPasswordErrors.email}</p>
                                                )}
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                Send Reset Link
                                            </button>
                                        </form>
                                        <button
                                            onClick={closeModal}
                                            className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Cancel
                                        </button>
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