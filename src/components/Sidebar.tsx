"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronDown,
    ChevronUp,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    RefreshCw,
    FileText,
    Settings
} from 'lucide-react';

export const Sidebar = () => {
    const [openDropdowns, setOpenDropdowns] = useState({
        products: false,
        reports: false
    });

    const toggleDropdown = (dropdown: 'products' | 'reports') => {
        setOpenDropdowns(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

    const menuItems = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
            path: "/Dashboard",
            dropdown: null
        },
        {
            name: "Products",
            icon: <Package className="w-5 h-5 mr-3" />,
            path: null,
            dropdown: {
                items: [
                    { name: "View Products", path: "/Products/ViewProducts" },
                    { name: "Add Products", path: "/Products/AddProducts" },
                    { name: "Categories", path: "/Products/AddCategories" },
                    { name: "Attributes", path: "/Products/AddAttributes" }
                ]
            }
        },
        {
            name: "Sales",
            icon: <ShoppingCart className="w-5 h-5 mr-3" />,
            path: "/Sales",
            dropdown: null
        },
        {
            name: "Customers",
            icon: <Users className="w-5 h-5 mr-3" />,
            path: "/Customers",
            dropdown: null
        },
        {
            name: "Refunds",
            icon: <RefreshCw className="w-5 h-5 mr-3" />,
            path: "/Refund",
            dropdown: null
        },
        {
            name: "Reports",
            icon: <FileText className="w-5 h-5 mr-3" />,
            path: null,
            dropdown: {
                items: [
                    { name: "Product Report", path: "/Report/ProductReport" },
                    { name: "Staff Report", path: "/Report/StaffReport" },
                    { name: "Financial Report", path: "/Report/FinancialReport" }
                ]
            }
        },
        {
            name: "Settings",
            icon: <Settings className="w-5 h-5 mr-3" />,
            path: "/Settings",
            dropdown: null
        }
    ];

    return (
        <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white p-4 shadow-lg h-screen sticky top-0">
            <div className="flex flex-col h-full">
                <h2 className="text-3xl font-bold pb-6 pt-4 px-2">Admin Panel</h2>

                <div className="border-t border-blue-500 my-4"></div>

                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.path ? (
                                    <Link href={item.path}>
                                        <div className="flex items-center p-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                                            {item.icon}
                                            <span className="text-lg">{item.name}</span>
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <div
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                                            onClick={() => toggleDropdown(item.name.toLowerCase() as 'products' | 'reports')}
                                        >
                                            <div className="flex items-center">
                                                {item.icon}
                                                <span className="text-lg">{item.name}</span>
                                            </div>
                                            {openDropdowns[item.name.toLowerCase() as 'products' | 'reports'] ? (
                                                <ChevronUp className="w-5 h-5" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5" />
                                            )}
                                        </div>

                                        {item.dropdown && openDropdowns[item.name.toLowerCase() as 'products' | 'reports'] && (
                                            <ul className="pl-10 mt-1 space-y-1 animate-fadeIn">
                                                {item.dropdown.items.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link href={subItem.path}>
                                                            <div className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                                                                <span className="text-md">{subItem.name}</span>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto pt-4 border-t border-blue-500">
                    <div className="p-3 text-sm text-blue-200">
                        v1.0.0
                    </div>
                </div>
            </div>
        </aside>
    );
};