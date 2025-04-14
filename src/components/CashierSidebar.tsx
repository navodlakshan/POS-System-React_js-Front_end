// src/components/CashierSidebar.tsx

"use client";

import React from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Package,
    Users,
    RefreshCw,
    FileText,
    Settings
} from 'lucide-react';

export default function CashierSidebar() {
    const menuItems = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
            path: "/Cashier/Cashier",
            dropdown: null
        },
        {
            name: "Products",
            icon: <Package className="w-5 h-5 mr-3" />,
            path: "/Cashier/CashierProduct",
            dropdown: null
        },
        {
            name: "Customers",
            icon: <Users className="w-5 h-5 mr-3" />,
            path: "/Cashier/CashierCustomers",
            dropdown: null
        },
        {
            name: "Refunds",
            icon: <RefreshCw className="w-5 h-5 mr-3" />,
            path: "/Cashier/CashierRefund",
            dropdown: null
        },
        {
            name: "Bills",
            icon: <FileText className="w-5 h-5 mr-3" />,
            path: "/Cashier/CashierBill",
            dropdown: null
        },
        {
            name: "Settings",
            icon: <Settings className="w-5 h-5 mr-3" />,
            path: "/CashierSettings",
            dropdown: null
        }
    ];

    return (
        <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white p-4 shadow-lg h-screen sticky top-0
        ${isVisible ? 'w-64' : 'w-20'}
            transition-all duration-500 ease-in-out
        ">


            <div className="flex flex-col h-full">
                <h2 className="text-3xl font-bold pb-6 pt-4 px-2">Cashier Panel</h2>

                <div className="border-t border-blue-500 my-4"></div>

                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.path}>
                                    <div className="flex items-center p-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                                        {item.icon}
                                        <span className="text-lg">{item.name}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-auto pt-4 border-t border-blue-500">
                    <div className="p-3 text-sm text-blue-200">
                        {/* Footer content if needed */}
                    </div>
                </div>
            </div>
        </aside>
    );
}