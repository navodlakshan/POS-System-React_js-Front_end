"use client"; // Mark this component as a Client Component

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
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

            {/* SignUp Form */}
        <div className="w-full flex items-center justify-center p-4">
            <div className="bg-gray-300 rounded-lg shadow-sm">
                <h1 className="text-6xl font-bold mb-6 text-center">ABC POS System</h1>
                <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/Login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
        </div>
    );
}