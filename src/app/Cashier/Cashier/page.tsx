"use client";

import { useState } from "react";
import {
    Search, ShoppingCart, Monitor, Headphones, Home,
    Smartphone, Laptop, Shirt, Dumbbell, ToyBrick, Sofa,
    Plus, Minus, Printer
} from "lucide-react";
import CashierHeader from "@/components/CashierHeader";
import CashierSidebar from "@/components/CashierSidebar";

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
    const [showBillPreview, setShowBillPreview] = useState(false);

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

        // Audio & Video
        { id: "3", name: "Sony 5.1 Channel Home Theater", price: 499.99, category: "Audio & Video" },
        { id: "4", name: "Bose Soundbar 700", price: 799.99, category: "Audio & Video" },

        // Home Appliances
        { id: "5", name: "Dyson V11 Vacuum Cleaner", price: 599.99, category: "Home Appliances" },
        { id: "6", name: "Samsung Smart Refrigerator", price: 1499.99, category: "Home Appliances" },

        // Mobile Phones & Devices
        { id: "7", name: "Apple iPhone 14 Pro", price: 999.99, category: "Mobile Phones & Devices" },
        { id: "8", name: "Samsung Galaxy S22", price: 799.99, category: "Mobile Phones & Devices" },

        // Apple
        { id: "9", name: "Apple MacBook Pro 16\"", price: 2399.99, category: "Apple" },
        { id: "10", name: "Apple iPad Pro 12.9\"", price: 1099.99, category: "Apple" },

        // Computers
        { id: "11", name: "Dell XPS 13", price: 1299.99, category: "Computers" },
        { id: "12", name: "HP Spectre x360", price: 1399.99, category: "Computers" },

        // Fashion & Lifestyle
        { id: "13", name: "Nike Air Max 270", price: 149.99, category: "Fashion & Lifestyle" },
        { id: "14", name: "Adidas Ultraboost", price: 179.99, category: "Fashion & Lifestyle" },

        // Sports & Fitness
        { id: "15", name: "Fitbit Charge 5", price: 149.99, category: "Sports & Fitness" },
        { id: "16", name: "Peloton Bike+", price: 1999.99, category: "Sports & Fitness" },

        // Kids Toys
        { id: "17", name: "LEGO Star Wars Millennium Falcon", price: 159.99, category: "Kids Toys" },
        { id: "18", name: "Barbie Dreamhouse", price: 199.99, category: "Kids Toys" },

        // Furniture & Home Style
        { id: "19", name: "IKEA Malm Bed Frame", price: 299.99, category: "Furniture & Home Style" },
        { id: "20", name: "West Elm Sofa", price: 1299.99, category: "Furniture & Home Style" },
        { id: "21", name: "CB2 Dining Table", price: 499.99, category: "Furniture & Home Style" },
        { id: "22", name: "Wayfair Office Chair", price: 199.99, category: "Furniture & Home Style" },
        { id: "23", name: "Ashley Furniture Recliner", price: 399.99, category: "Furniture & Home Style" },
        { id: "24", name: "Pottery Barn Bookshelf", price: 599.99, category: "Furniture & Home Style" },



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
        setShowBillPreview(true);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '', 'width=600,height=600');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Bill Receipt</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .header { text-align: center; margin-bottom: 20px; }
                            .store-name { font-size: 24px; font-weight: bold; }
                            .bill-info { margin-bottom: 20px; }
                            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            .total-section { text-align: right; font-weight: bold; }
                            .footer { margin-top: 30px; text-align: center; font-size: 12px; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <div class="store-name">My Store</div>
                            <div>123 Main Street, City</div>
                            <div>Phone: (123) 456-7890</div>
                        </div>
                        
                        <div class="bill-info">
                            <div><strong>Customer:</strong> ${customerName}</div>
                            <div><strong>Order #:</strong> ${orderNumber}</div>
                            <div><strong>Date:</strong> ${new Date().toLocaleString()}</div>
                        </div>
                        
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${cart.map(item => `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>${item.quantity}</td>
                                        <td>Rs.${item.price.toFixed(2)}</td>
                                        <td>Rs.${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        
                        <div class="total-section">
                            <div>Subtotal: Rs.${subtotal.toFixed(2)}</div>
                            <div>Tax (10%): Rs.${tax.toFixed(2)}</div>
                            <div>Total: Rs.${total.toFixed(2)}</div>
                        </div>
                        
                        ${notes ? `<div><strong>Notes:</strong> ${notes}</div>` : ''}
                        
                        <div class="footer">
                            Thank you for your purchase!<br>
                            Please come again
                        </div>
                        
                        <script>
                            setTimeout(() => {
                                window.print();
                                window.close();
                            }, 200);
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const completePayment = () => {
        alert(`Payment processed for ${customerName}\nOrder #${orderNumber}\nTotal: Rs.${total.toFixed(2)}`);
        setCart([]);
        setCustomerName("");
        setOrderNumber("");
        setNotes("");
        setShowBillPreview(false);
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
                                            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">Rs.{item.price.toFixed(2)}</p>
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
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Rs.{item.price.toFixed(2)}</p>
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
                                                    <span className="font-medium dark:text-white">Rs.{subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-300">Tax (10%)</span>
                                                    <span className="font-medium dark:text-white">Rs.{tax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between border-t pt-1">
                                                    <span className="font-bold dark:text-white">Total</span>
                                                    <span className="font-bold text-blue-600 dark:text-blue-400">Rs.{total.toFixed(2)}</span>
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

            {/* Bill Preview Modal */}
            {showBillPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4 dark:text-white">Bill Preview</h2>

                            <div className="bg-white p-4 rounded border dark:bg-gray-700 dark:border-gray-600">
                                <div className="text-center mb-4">
                                    <div className="font-bold text-lg">My Store</div>
                                    <div className="text-sm">123 Main Street, City</div>
                                    <div className="text-sm">Phone: (123) 456-7890</div>
                                </div>

                                <div className="mb-4">
                                    <div><strong>Customer:</strong> {customerName}</div>
                                    <div><strong>Order #:</strong> {orderNumber}</div>
                                    <div><strong>Date:</strong> {new Date().toLocaleString()}</div>
                                </div>

                                <table className="w-full border-collapse mb-4">
                                    <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">Item</th>
                                        <th className="text-left py-2">Qty</th>
                                        <th className="text-left py-2">Price</th>
                                        <th className="text-left py-2">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-2">{item.name}</td>
                                            <td className="py-2">{item.quantity}</td>
                                            <td className="py-2">Rs.{item.price.toFixed(2)}</td>
                                            <td className="py-2">Rs.{(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                <div className="text-right mb-4">
                                    <div>Subtotal: Rs.{subtotal.toFixed(2)}</div>
                                    <div>Tax (10%): Rs.{tax.toFixed(2)}</div>
                                    <div className="font-bold">Total: Rs.{total.toFixed(2)}</div>
                                </div>

                                {notes && (
                                    <div className="mb-4">
                                        <strong>Notes:</strong> {notes}
                                    </div>
                                )}

                                <div className="text-center text-sm italic">
                                    Thank you for your purchase!
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowBillPreview(false)}
                                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg font-medium"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    <Printer size={18} />
                                    Print Bill
                                </button>
                                <button
                                    onClick={completePayment}
                                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium"
                                >
                                    Complete Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}