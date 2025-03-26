"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import Link from 'next/link';

export const Sidebar = () => {
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [isReportsDropdownOpen, setIsReportsDropdownOpen] = useState(false);

    const toggleProductsDropdown = () => {
        setIsProductsDropdownOpen(!isProductsDropdownOpen);
    };

    const toggleReportsDropdown = () => {
        setIsReportsDropdownOpen(!isReportsDropdownOpen);
    };

    return (
        <aside className="w-64 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-4 shadow-lg">
            <h2 className="text-5xl font-bold pb-8">Admin</h2>
            <div className="border-t-2 border-gray-500 my-6"></div>
            <nav>
                <div className="flex items-center mb-6">
                    <Link href="/Dashboard" className="text-xl flex items-center">
                        <img src="/dashboard.svg" alt="Dashboard" className="w-8 h-8 mr-3" />
                        <h2 className="text-3xl font-semibold">Dashboard</h2>
                    </Link>
                </div>
                <ul>
                    {/* Products Dropdown */}
                    <li className="mb-3 hover:text-blue-400 cursor-pointer">
                        <div className="text-xl flex items-center" onClick={toggleProductsDropdown}>
                            <img src="/Products.svg" alt="Products" className="w-6 h-6 mr-3" />
                            Products
                        </div>
                    </li>
                        {isProductsDropdownOpen && (
                            <ul className="pl-6 mt-2 transition-all duration-300 ease-in-out">
                                <li className="mb-2 hover:text-blue-400 cursor-pointer">
                                    <Link href="/Products/ViewProducts" className="block">
                                        View Products
                                    </Link>
                                </li>
                                <li className="mb-2 hover:text-blue-400 cursor-pointer">
                                    <Link href="/Products/AddProducts" className="block">
                                        Add Products
                                    </Link>
                                </li>
                                <li className="mb-2 hover:text-blue-400 cursor-pointer">
                                    <Link href="/Products/AddCategories" className="block">
                                        Categories
                                    </Link>
                                </li>
                                <li className="mb-2 hover:text-blue-400 cursor-pointer">
                                    <Link href="/Products/AddAttributes" className="block">
                                        Attributes
                                    </Link>
                                </li>
                            </ul>
                        )}


                    {/* Sales Link */}
                    <li className="mb-3 hover:text-blue-400 cursor-pointer">
                        <Link href="/Sales" className="text-xl flex items-center">
                            <img src="/Sales.svg" alt="Sales" className="w-6 h-6 mr-3" />
                            Sales
                        </Link>
                    </li>

                    {/* Customers Link */}
                    <li className="mb-3 hover:text-blue-400 cursor-pointer">
                        <Link href="/Customers" className="text-xl flex items-center">
                            <img src="/Customers.svg" alt="Customers" className="w-6 h-6 mr-3" />
                            Customers
                        </Link>
                    </li>

                    {/* Refunds Link */}
                    <li className="mb-3 hover:text-blue-400 cursor-pointer">
                        <Link href="/Refund" className="text-xl flex items-center">
                            <img src="/Refunds.svg" alt="Refunds" className="w-6 h-6 mr-3" />
                            Refunds
                        </Link>
                    </li>

                    {/* Reports Dropdown */}
                    <li className="mb-3 hover:text-blue-400 cursor-pointer">
                        <div className="text-xl flex items-center" onClick={toggleReportsDropdown}>
                            <img src="/Reports.svg" alt="Reports" className="w-6 h-6 mr-3" />
                            Reports
                        </div>
                    </li>
                        {isReportsDropdownOpen && (
                            <ul className="pl-6 mt-2 transition-all duration-300 ease-in-out">
                                <li className="mb-2 hover:text-blue-400 cursor-pointer">
                                    <Link href="/Report/ProductReport" className="block">
                                        Product Report
                                    </Link>
                                </li>
                                <li className="mb-2 hover:text-blue-400 cursor-pointer">
                                    <Link href="/Report/StaffReport" className="block">
                                        Staff Report
                                    </Link>
                                </li>
                                <li className="mb-2 hover:text-blue-400 cursor-pointer">
                                    <Link href="/Report/FinancialReport" className="block">
                                        Financial Report
                                    </Link>
                                </li>
                            </ul>
                        )}

                    {/* Settings Link */}
                    <li className="mb-3 hover:text-blue-400 cursor-pointer">
                        <Link href="/Settings" className="text-xl flex items-center">
                            <img src="/Settings.svg" alt="Settings" className="w-6 h-6 mr-3" />
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};