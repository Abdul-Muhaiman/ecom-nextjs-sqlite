import React from "react";
import { ShoppingCart, ArrowRight, Store } from "lucide-react";
import Link from "next/link";

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-70" />

            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-blue-100/30 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gray-100/30 translate-x-1/2 translate-y-1/2 blur-3xl opacity-50" />
            <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-100/30 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />

            <div className="container mx-auto text-center py-12 px-6 relative z-10 space-y-12">
                {/* Welcome Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-center">
                        <Store className="w-12 h-12 text-blue-600 mr-3" />
                        <h1 className="text-5xl font-extrabold tracking-tighter text-gray-800">
                            <span className="text-blue-600">Welcome</span> to Our Store
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover a curated selection of high-quality products designed to enhance your life. From fast shipping to secure checkout, we’ve got you covered.
                    </p>
                </div>

                {/* Call to Action Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/products"
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full
                                   hover:bg-blue-700 hover:shadow-lg transition-all duration-300
                                   flex items-center gap-3 shadow-md"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        Explore Products
                        <ArrowRight className="w-5 h-5 ml-1" />
                    </Link>
                    {/* Additional Button (optional) */}
                    <Link
                        href="/about"
                        className="px-8 py-3 bg-white/80 border border-gray-300 text-gray-700 font-medium rounded-full
                                   hover:bg-white hover:shadow-lg hover:text-gray-900 transition-all duration-300
                                   flex items-center gap-3"
                    >
                        Learn More
                        <ArrowRight className="w-5 h-5 ml-1" />
                    </Link>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-3 text-blue-600">Fast Shipping</h3>
                        <p className="text-gray-600">
                            Get your orders delivered quickly and reliably, no matter where you are.
                        </p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-3 text-blue-600">Top Quality</h3>
                        <p className="text-gray-600">
                            We source the best products from trusted brands, ensuring top-notch quality.
                        </p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-3 text-blue-600">Secure Checkout</h3>
                        <p className="text-gray-600">
                            Shop confidently with our advanced encryption and secure payment options.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
