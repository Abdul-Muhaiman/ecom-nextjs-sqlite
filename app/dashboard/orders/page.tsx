"use client"

import {Order} from "@/types/order";
import {useSessionContext} from "@/context/SessionContext";
import {useEffect, useState} from "react";
import OrderDetails from "@/app/dashboard/components/OrderDetails";

export default function OrdersPage() {
    const session = useSessionContext();
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchOrdersDetails = async () => {
            if (session?.user?.id) {
                setIsLoading(true); // Start loading
                try {
                    const response = await fetch(`/api/user/orders?userId=${session.user.id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    const data: Order[] = await response.json();
                    setOrders(data); // Set the data into state
                } catch (error) {
                    console.error("Error fetching user details:", error);
                } finally {
                    setIsLoading(false); // Stop loading
                }
            }
        };

        fetchOrdersDetails();
    }, [session]);

    // Handle loading state
    if (isLoading) {
        return <div className="text-center mt-16">Loading orders information...</div>;
    }

    // Handle unauthenticated state
    if (!session?.user) {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-600">You must be logged in to view your orders.</p>
            </div>
        );
    }

    // Handle no orders
    if (!orders || orders.length === 0) {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-600">You have no orders.</p>
            </div>
        );
    }

    // Render order data
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">Order Details</h1>
            {orders.map((order) => (
                <OrderDetails key={order.id} order={order} />
            ))}
        </div>
    );
}
