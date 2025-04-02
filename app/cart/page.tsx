"use client";

import Link from "next/link";

export default function CartPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow">
                        {/* Cart Item #1 (Static) */}
                        <div className="flex items-center py-4 border-b border-gray-200">
                            {/* Product Image */}
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Product Name"
                                    className="object-contain rounded-md"
                                />
                            </div>
                            {/* Product Details */}
                            <div className="ml-4 flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800">Product Name</h3>
                                <p className="text-gray-600">$99.99</p>
                                {/* Quantity Controls */}
                                <div className="flex items-center mt-2">
                                    <button
                                        className="w-8 h-8 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center hover:bg-blue-300"
                                    >
                                        -
                                    </button>
                                    <span className="mx-4 text-lg">1</span>
                                    <button
                                        className="w-8 h-8 bg-blue-200 rounded-full text-blue-700 flex items-center justify-center hover:bg-blue-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            {/* Item Total Price */}
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-800">$99.99</p>
                            </div>
                            {/* Delete Button */}
                            <button
                                className="ml-4 text-gray-500 hover:text-red-500 focus:outline-none"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-.894.553L4.382 4H1a1 1 0 000 2h1v10a2 2 0 002 2h12a2 2 0 002-2V6h1a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0014 2H6zM9 8a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        {/* End of Cart Item */}

                        {/* Continue Shopping & Clear Cart Buttons */}
                        <div className="mt-6 flex justify-between items-center">
                            <Link href="/products" className="text-blue-600 hover:text-blue-800 font-semibold">
                                Continue Shopping
                            </Link>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-gray-800 font-bold">Subtotal</span>
                            <span className="text-gray-800 font-bold">$99.99</span>
                        </div>
                        <button
                            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
