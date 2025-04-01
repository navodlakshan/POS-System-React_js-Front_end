// src/app/Cashier/Cashier/page.tsx

"use client";

import { useState } from "react";
import {
    Search, ShoppingCart, Monitor, Headphones, Home,
    Smartphone, Laptop, Shirt, Dumbbell, ToyBrick, Sofa,
    Plus, Minus
} from "lucide-react";
import CashierHeader from "@/components/CashierCom/CashierHeader";
import CashierSidebar from "@/components/CashierCom/CashierSidebar";

interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: string;
}

interface MenuItems {
    [key: string]: MenuItem[];
}

export default function CashierDashboard() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [activeCategory, setActiveCategory] = useState("TV");
    const [cart, setCart] = useState<Array<MenuItem & { quantity: number }>>([]);
    const [customerName, setCustomerName] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [notes, setNotes] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

    const categories = [
        { name: "TV", icon: <Monitor size={18} /> },
        { name: "Audio & Video", icon: <Headphones size={18} /> },
        { name: "Home Appliances", icon: <Home size={18} /> },
        { name: "Mobile Phones & Devices", icon: <Smartphone size={18} /> },
        { name: "Apple", icon: <Laptop size={18} /> },
        { name: "Computers", icon: <Laptop size={18} /> },
        { name: "Fashion & Lifestyle", icon: <Shirt size={18} /> },
        { name: "Sports & Fitness", icon: <Dumbbell size={18} /> },
        { name: "Kids Toys", icon: <ToyBrick size={18} /> },
        { name: "Furniture & Home Style", icon: <Sofa size={18} /> },
    ];

    const allProducts: MenuItem[] = [
        // TV
        { id: "1", name: "Samsung QLED 4K TV", price: 999.99, category: "TV" },
        { id: "2", name: "LG OLED 55\"", price: 1299.99, category: "TV" },
        { id: "3", name: "Sony Bravia 65\"", price: 1499.99, category: "TV" },

        // Audio & Video
        { id: "4", name: "Bose Headphones 700", price: 379.99, category: "Audio & Video" },
        { id: "5", name: "Sony WH-1000XM4", price: 349.99, category: "Audio & Video" },

        // Home Appliances
        { id: "6", name: "Dyson Vacuum Cleaner", price: 399.99, category: "Home Appliances" },
        { id: "7", name: "Instant Pot Duo", price: 89.99, category: "Home Appliances" },

        // Mobile Phones
        { id: "8", name: "iPhone 14 Pro", price: 999.99, category: "Mobile Phones & Devices" },
        { id: "9", name: "Samsung Galaxy S23", price: 799.99, category: "Mobile Phones & Devices" },

        // Apple
        { id: "10", name: "MacBook Pro 14\"", price: 1999.99, category: "Apple" },
        { id: "11", name: "iPad Pro 12.9\"", price: 1099.99, category: "Apple" },

        // Computers
        { id: "12", name: "Dell XPS 15", price: 1499.99, category: "Computers" },
        { id: "13", name: "HP Spectre x360", price: 1299.99, category: "Computers" },
    ];

    // Group products by category
    const menuItems: MenuItems = allProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as MenuItems);

    // Filter products based on search
    const filteredProducts = searchQuery
        ? allProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : menuItems[activeCategory] || [];

    const addToCart = (item: MenuItem) => {
        setCart(prev => prev.some(i => i.id === item.id)
            ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            : [...prev, { ...item, quantity: 1 }]);
    };

    const updateQuantity = (id: string, change: number) => {
        setCart(prev => prev
            .map(item => item.id === id
                ? { ...item, quantity: Math.max(0, item.quantity + change) }
                : item)
            .filter(item => item.quantity > 0));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    const handlePayment = () => {
        alert(`Payment processed for ${customerName}\nOrder #${orderNumber}\nTotal: $${total.toFixed(2)}`);
        setCart([]);
        setCustomerName("");
        setOrderNumber("");
        setNotes("");
    };

    return (
        <div className={`flex min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {isSidebarVisible && <CashierSidebar />}

            <div className="flex-1 flex flex-col overflow-hidden">
                <CashierHeader
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                />

                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row gap-4 h-full">
                        {/* Products Section - Left Side */}
                        <div className="w-full lg:w-3/5 flex flex-col gap-4 h-full">
                            {/* Search Bar */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                <h2 className="text-xl font-bold mb-3 dark:text-white">Products</h2>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        aria-label="Search products"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            if (e.target.value) setActiveCategory("");
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Categories and Products */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex-1 flex flex-col">
                                <div className="flex space-x-2 mb-3 overflow-x-auto pb-2">
                                    {categories.map(category => (
                                        <button
                                            key={category.name}
                                            onClick={() => {
                                                setActiveCategory(category.name);
                                                setSearchQuery("");
                                            }}
                                            className={`px-3 py-1.5 rounded-full flex items-center space-x-2 whitespace-nowrap text-sm ${
                                                activeCategory === category.name
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                                            }`}
                                            aria-current={activeCategory === category.name ? "true" : "false"}
                                        >
                                            {category.icon}
                                            <span>{category.name}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 flex-1 overflow-y-auto">
                                    {filteredProducts.map(item => (
                                        <button
                                            key={item.id}
                                            className="border rounded-lg p-2 hover:shadow-md transition-shadow cursor-pointer dark:border-gray-600 dark:text-white text-left flex flex-col"
                                            onClick={() => addToCart(item)}
                                            aria-label={`Add ${item.name} to cart`}
                                        >
                                            <div className="h-20 bg-gray-100 rounded mb-2 flex items-center justify-center dark:bg-gray-700">
                                                {categories.find(c => c.name === item.category)?.icon ||
                                                    <Monitor className="text-gray-400" />}
                                            </div>
                                            <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                                            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">${item.price.toFixed(2)}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Section - Right Side */}
                        <div className="w-full lg:w-2/5 flex flex-col gap-4 h-full">
                            {/* Customer Information */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                <h2 className="text-xl font-bold mb-3 dark:text-white">Customer Information</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor="customerName" className="block text-sm font-medium mb-1 dark:text-gray-300">
                                            Customer Name
                                        </label>
                                        <input
                                            id="customerName"
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full p-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Enter customer name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="orderNumber" className="block text-sm font-medium mb-1 dark:text-gray-300">
                                            Order Number
                                        </label>
                                        <input
                                            id="orderNumber"
                                            type="text"
                                            value={orderNumber}
                                            onChange={(e) => setOrderNumber(e.target.value)}
                                            className="w-full p-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Enter order number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Order Details */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex-1 flex flex-col">
                                <h2 className="text-xl font-bold mb-3 dark:text-white">Order Details</h2>
                                {cart.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 flex-1 flex flex-col items-center justify-center">
                                        <ShoppingCart className="mx-auto mb-2" size={32} />
                                        <p>Your cart is empty</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col h-full">
                                        <div className="flex-1 overflow-y-auto max-h-[300px]">
                                            {cart.map(item => (
                                                <div key={item.id} className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-sm dark:text-white truncate">{item.name}</h3>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2 ml-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateQuantity(item.id, -1);
                                                            }}
                                                            className="p-1 rounded-full bg-gray-100 dark:bg-gray-700"
                                                            aria-label={`Decrease quantity of ${item.name}`}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-6 text-center text-sm dark:text-white">{item.quantity}</span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateQuantity(item.id, 1);
                                                            }}
                                                            className="p-1 rounded-full bg-gray-100 dark:bg-gray-700"
                                                            aria-label={`Increase quantity of ${item.name}`}
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-3">
                                            <div className="space-y-1 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-300">Sub Total</span>
                                                    <span className="font-medium dark:text-white">${subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-300">Tax (10%)</span>
                                                    <span className="font-medium dark:text-white">${tax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between border-t pt-1">
                                                    <span className="font-bold dark:text-white">Total</span>
                                                    <span className="font-bold text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <label htmlFor="orderNotes" className="block text-sm font-medium mb-1 dark:text-gray-300">
                                                    Order Notes
                                                </label>
                                                <textarea
                                                    id="orderNotes"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    className="w-full p-2 border rounded-lg h-16 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    placeholder="Special instructions..."
                                                />
                                            </div>

                                            <button
                                                onClick={handlePayment}
                                                className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                                                disabled={cart.length === 0}
                                            >
                                                Process Payment
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}