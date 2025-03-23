"use client"; // Mark this component as a Client Component

import Link from 'next/link';
import React from 'react';

interface HeaderProps {
    onMenuClick: () => void; // Add this line to define the prop
}

export const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className="bg-slate-600 text-foreground p-4 flex justify-between items-center">
            <div className="flex items-center">
                {/* Menu icon */}
                <img
                    src="/Menu.svg"
                    alt="Menu"
                    className="w-6 h-6 mr-8 cursor-pointer"
                    onClick={onMenuClick} // Use the prop here
                />
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
            <nav>
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link href="/Login" className="text-white hover:text-blue-500">
                            Sign In
                        </Link>
                    </li>
                    <li>
                        <Link href="/SignUp" className="text-white hover:text-blue-500">
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <div
                            className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                            👤
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};