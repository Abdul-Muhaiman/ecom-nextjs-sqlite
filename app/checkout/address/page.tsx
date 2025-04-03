// components/AddressForm.tsx (or maybe move to app/checkout/address/page.tsx if it's the main page component)
"use client";

import React, { useState, useEffect } from 'react'; // Added useEffect
import { useAddress } from '@/context/AddressContext'; // Adjust path if needed
import { useRouter } from "next/navigation";

// Optional: Add an icon library like react-icons if you want a spinner
// import { FaSpinner } from 'react-icons/fa';

export default function AddressForm() {
    const { shippingAddress, setShippingAddress } = useAddress(); // Get current address too
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zip: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // State to track if editing

    // Effect to pre-fill form if an address exists in context
    useEffect(() => {
        // Check if the shippingAddress from context actually contains data
        if (shippingAddress && Object.values(shippingAddress).some(val => val !== '')) {
            setFormData({
                fullName: shippingAddress.fullName || '',
                street: shippingAddress.street || '',
                city: shippingAddress.city || '',
                state: shippingAddress.state || '',
                country: shippingAddress.country || '',
                zip: shippingAddress.zip || '',
            });
            setIsEditing(true); // We are editing an existing address
        } else {
            setIsEditing(false); // We are adding a new address
        }
    }, [shippingAddress]); // Rerun only if the address from context changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent double submission

        setIsSubmitting(true);
        // Update the address in the context
        setShippingAddress(formData);

        // Simulate async operation if needed, otherwise redirect immediately
        // Using a short timeout just for visual feedback demonstration
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/checkout/order-summary'); // Redirect after setting address
        }, 500); // Adjust delay as needed or remove if no async op
    };

    return (
        // Added a background and padding for the overall page feel
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Moved padding inside the white container */}
                <div className="p-8 sm:p-10">
                    {/* Dynamic Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
                        {isEditing ? 'Edit Shipping Address' : 'Add Shipping Address'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 focus:border-blue-500 sm:text-sm"
                                required
                                autoComplete="name"
                            />
                        </div>

                        {/* Street Address */}
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                                Street Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                                autoComplete="street-address"
                            />
                        </div>

                        {/* City / State */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                    autoComplete="address-level2" // City
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                    State / Province <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                    autoComplete="address-level1" // State
                                />
                            </div>
                        </div>

                        {/* Country / Zip Code */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                                    ZIP / Postal Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="zip"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                    autoComplete="postal-code"
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    // Consider changing to a <select> dropdown for country if feasible
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                    autoComplete="country-name"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4"> {/* Added padding top for separation */}
                            <button
                                type="submit"
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${
                                    isSubmitting
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        {/* Optional Spinner Icon */}
                                        {/* <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> */}
                                        Saving...
                                    </>
                                ) : (
                                    'Save Address & Continue'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}