"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';

export const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <aside className="w-64 bg-sky-800 text-white p-4 shadow-lg">
            <h2 className="text-5xl font-bold pb-8">Admin</h2>
            <div className="border-t-2 border-gray-500 my-6"></div>
            <nav>
                <div className="flex items-center mb-6">
                    <img src="dashboard.svg" alt="Dashboard" className="w-8 h-8 mr-3" />
                    <h2 className="text-3xl font-semibold">Dashboard</h2>
                </div>
                <ul>
                    <li className="mb-3 hover:text-blue-500 cursor-pointer" onClick={toggleDropdown}>
                        <div className="text-xl flex items-center">
                            <img src="Products.svg" alt="Dashboard" className="w-6 h-6 mr-3"/>
                            Products
                        </div>
                        {isDropdownOpen && (
                            <ul className="pl-6 mt-2">
                                <li className="mb-2 hover:text-blue-500 cursor-pointer">
                                    <a href="">Profile</a>
                                </li>
                                <li className="mb-2 hover:text-blue-500 cursor-pointer">
                                    <a href="">Security</a>
                                </li>
                                <li className="mb-2 hover:text-blue-500 cursor-pointer">
                                    <a href="">Notifications</a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="mb-3 hover:text-blue-500 cursor-pointer">
                        <a href="" className="text-xl flex items-center">
                            <img src="Sales.svg" alt="Dashboard" className="w-6 h-6 mr-3" />
                            Sales
                        </a>
                    </li>
                    <li className="mb-3 hover:text-blue-500 cursor-pointer">
                        <a href="" className="text-xl flex items-center">
                            <img src="Customers.svg" alt="Dashboard" className="w-6 h-6 mr-3" />
                            Customers
                        </a>
                    </li>
                    <li className="mb-3 hover:text-blue-500 cursor-pointer">
                        <a href="" className="text-xl flex items-center">
                            <img src="Refunds.svg" alt="Dashboard" className="w-6 h-6 mr-3" />
                            Refunds
                        </a>
                    </li>
                    <li className="mb-3 hover:text-blue-500 cursor-pointer" onClick={toggleDropdown}>
                        <div className="text-xl flex items-center">
                            <img src="Reports.svg" alt="Dashboard" className="w-6 h-6 mr-3" />
                            Reports
                        </div>
                        {isDropdownOpen && (
                            <ul className="pl-6 mt-2">
                                <li className="mb-2 hover:text-blue-500 cursor-pointer">
                                    <a href="">Profile</a>
                                </li>
                                <li className="mb-2 hover:text-blue-500 cursor-pointer">
                                    <a href="">Security</a>
                                </li>
                                <li className="mb-2 hover:text-blue-500 cursor-pointer">
                                    <a href="">Notifications</a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="mb-3 hover:text-blue-500 cursor-pointer">
                        <a href="" className="text-xl flex items-center">
                            <img src="Settings.svg" alt="Dashboard" className="w-6 h-6 mr-3" />
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};