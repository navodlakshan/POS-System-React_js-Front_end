"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';

export default function LoginPage() {
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const handleForgotPassword = () => {
        setIsForgotPasswordModalOpen(true);
    };

    const closeModal = () => {
        setIsForgotPasswordModalOpen(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
            {/* Login Form */}
            <div className="bg-background bg-opacity-100 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">ABC POS System</h1>
                <h2 className="text-xl mb-4 text-center flex items-center justify-center">
                    Welcome
                    <img
                        src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
                        alt="Wave"
                        className="w-6 h-6 ml-2"
                    />
                </h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="keepLoggedIn"
                                className="mr-2"
                            />
                            <label htmlFor="keepLoggedIn" className="text-sm">
                                Keep me logged in
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-blue-500 hover:text-blue-700"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don&#39;t have an account? <a href="/SignUp" className="text-blue-500 hover:text-blue-700">Sign up</a>
                </p>
            </div>

            {/* Forgot Password Modal */}
            {isForgotPasswordModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-background p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-500"
                            >
                                Reset Password
                            </button>
                        </form>
                        <button
                            onClick={closeModal}
                            className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}