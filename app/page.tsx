import React from 'react';
import { ShoppingCart, ArrowRight, Store } from 'lucide-react';
import Link from "next/link";

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-40" />

            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-blue-100/30 -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gray-100/30 translate-x-1/2 translate-y-1/2 blur-3xl" />
            <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-100/20 -translate-x-1/2 -translate-y-1/2 blur-3xl" />

            <div className="container mx-auto text-center py-10 px-4 relative z-10 space-y-8">
                {/* Welcome, Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center">
                        <Store className="w-12 h-12 text-blue-600 mr-3" />
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            <span className="text-blue-600">Welcome</span> to Our Store
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        Discover a curated selection of high-quality products designed to enhance your life.
                    </p>
                </div>

                {/* Call to Action Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/products"
                        className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-full
                                   hover:bg-gray-700 transition-colors duration-300
                                   flex items-center gap-3 shadow-lg hover:shadow-xl"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        Explore Products
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                    {/* Add another link, if you have it */}
                    {/* <a
                        href="#"
                        className="px-6 py-3 bg-white/20 text-gray-700 font-medium rounded-full
                                   hover:bg-white/30 transition-colors duration-300
                                   border border-gray-200"
                    >
                        Learn More
                    </a> */}
                </div>

                {/* Feature Highlights (Optional) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600">Fast Shipping</h3>
                        <p className="text-gray-600">Get your orders delivered quickly and reliably.</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600">Top Quality</h3>
                        <p className="text-gray-600">We offer only the best products from trusted brands.</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600">Secure Checkout</h3>
                        <p className="text-gray-600">Your payments are safe and secure with our advanced encryption.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
