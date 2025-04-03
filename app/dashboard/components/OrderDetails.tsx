import { useState } from "react";
import { formatDate } from "@/utils/helper";
import { Order } from "@/types/order";
import Placeholder from "@/public/placeholder.png";
import Image from "next/image";

const OrderDetails = ({ order }: { order: Order }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                {/* Order Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                    <div>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Order Amount</p>
                        <p className="text-lg font-bold text-gray-900">${order.amount}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Order Status</p>
                        <span
                            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
                                order.status.toLowerCase() === "delivered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {order.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Order Date</p>
                        <p className="text-lg font-bold text-gray-900">{formatDate(order.createdAt)}</p>
                    </div>
                </div>

                {/* See Details Button */}
                <div className="mt-6 text-center">
                    <button
                        className={`w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 ${
                            isOpen ? "bg-gray-600 hover:bg-gray-700" : ""
                        }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? "Hide Details" : "See Details"}
                    </button>
                </div>

                {/* Order Items Section */}
                {isOpen && (
                    <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-gray-200">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Order Items</h2>
                        <div className="space-y-6">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-4 border-b border-gray-300 pb-4 last:border-b-0"
                                >
                                    <div className="flex items-center">
                                        <div className="relative w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={item.product.image || Placeholder}
                                                alt={item.product.name}
                                                fill
                                                className="object-contain rounded-md shadow-sm"
                                                sizes="100vw"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-lg font-bold text-gray-900">{item.product.name}</p>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;
