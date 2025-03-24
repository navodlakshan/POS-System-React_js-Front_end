"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const handleForgotPassword = () => {
        setIsForgotPasswordModalOpen(true);
    };

    const closeModal = () => {
        setIsForgotPasswordModalOpen(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            {/* Marketing Image on the left */}
            <div className="hidden md:block h-full ">
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
                <div className="bg-gray-300 rounded-lg shadow-sm">
                    <h1 className="text-6xl font-bold mb-6 text-center">ABC POS System</h1>
                    <h2 className="text-2xl mb-4 text-center flex items-center justify-center">
                        Welcome
                        <img
                            src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
                            alt="Wave"
                            className="w-8 h-8 ml-2"
                        />
                    </h2>

                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                                username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="keepLoggedIn"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="keepLoggedIn" className="ml-2 block text-sm text-gray-700">
                                    Keep me logged in
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                Forget password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </form>

                    {/* Forgot Password Modal */}
                    {isForgotPasswordModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4">
                                <h2 className="text-xl font-bold mb-4 text-gray-800">Forgot Password</h2>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Reset Password
                                    </button>
                                </form>
                                <button
                                    onClick={closeModal}
                                    className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}