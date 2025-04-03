// app/checkout/order-summary/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Import context hook and Address type
import { useAddress, Address } from '@/context/AddressContext'; // Adjust import path if needed
import Placeholder from "@/public/placeholder.png"; // Assuming you have this placeholder

// Define the cart item structure (can be imported if shared)
interface CartItem {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
}

export default function OrderSummaryPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Get address from context
    const { shippingAddress } = useAddress(); // Use the context hook

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoadingCart, setIsLoadingCart] = useState(true);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('payOnDelivery'); // Default to enabled option
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // --- Fetch Cart Items Effect ---
    useEffect(() => {
        const fetchCartItems = async () => {
            // Only fetch if authenticated and userId is available
            if (status === "authenticated" && session?.user?.id) {
                setIsLoadingCart(true); // Set loading true when fetch starts
                try {
                    const response = await fetch(`/api/cart/${session.user.id}`);
                    if (!response.ok) {
                        // Consider more robust error handling/logging
                        console.error("Failed to fetch cart items, status:", response.status);
                        // Optionally set an error state here to show a message
                        setCartItems([]); // Clear items on error
                        return;
                    }
                    const data = await response.json();
                    setCartItems(data);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                    setCartItems([]); // Clear items on error
                    // Optionally set an error state here
                } finally {
                    setIsLoadingCart(false); // Stop loading
                }
            } else if (status === "unauthenticated") {
                // Handle unauthenticated state if necessary (e.g., redirect)
                setIsLoadingCart(false);
                setCartItems([]);
            }
            // If status is 'loading', we wait for it to become 'authenticated' or 'unauthenticated'
        };

        fetchCartItems();
    }, [session, status]); // Rerun when session or status changes

    // --- Calculations ---
    const calculateSubtotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.productPrice * item.quantity,
            0
        );
    };

    const subtotal = calculateSubtotal();
    // Add logic for shipping cost if applicable, otherwise 0
    const shippingCost = 0; // Example: Free shipping
    const total = subtotal + shippingCost;

    // --- Event Handlers ---
    const handlePlaceOrder = async () => {
        if (!shippingAddress || cartItems.length === 0 || !selectedPaymentMethod) {
            alert("Please ensure address is selected, cart is not empty, and payment method is chosen.");
            return;
        }

        setIsPlacingOrder(true);
        console.log("Placing order with:", {
            shippingAddress,
            cartItems,
            paymentMethod: selectedPaymentMethod,
            total,
        });

        // --- !!! Add your actual order placement logic here !!! ---
        // Example: Send data to your backend API
        try {
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: session?.user?.id,
              // shippingAddress,
              // items: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity, price: item.productPrice })),
              // paymentMethod: selectedPaymentMethod,
              // totalAmount: total,
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to place order');
          }
          const orderResult = await response.json();
            console.log(orderResult);

            // Redirect to order confirmation page, clear cart, etc.
          // router.push(`/order-confirmation/${orderResult.orderId}`);
        } catch (error) {
          console.error("Order placement failed:", error);
          alert("Failed to place order. Please try again.");
        } finally {
          setIsPlacingOrder(false);
        }
        // --- End of example order placement logic ---

        // For now, just simulate success after a delay
        // await new Promise(resolve => setTimeout(resolve, 1500));
        // alert("Order Placed (Simulation)!");
        setIsPlacingOrder(false);
        // You would likely redirect or clear cart state here upon success
    };

    // --- Loading and Empty States ---
    if (status === "loading" || isLoadingCart) {
        return <div className="text-center py-12 text-gray-600">Loading Summary...</div>;
    }

    if (status === "unauthenticated") {
        // Or redirect to login: router.push('/login');
        return <div className="text-center py-12 text-red-600">Please log in to view your summary.</div>;
    }

    if (cartItems.length === 0 && !isLoadingCart) {
        return (
            <div className="text-center py-12 text-gray-500">
                Your cart is empty. <Link href="/products" className="text-blue-600 hover:text-blue-800">Continue Shopping</Link>
            </div>
        );
    }

    // --- Render Page ---
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Summary</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Address and Items */}
                    <div className="flex-1 space-y-6">
                        {/* Shipping Address Section */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
                                <Link
                                    href="/checkout/address" // Link back to address selection/edit page
                                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    Change
                                </Link>
                            </div>
                            {shippingAddress && (shippingAddress.street || shippingAddress.fullName) ? ( // Check if address has some data
                                <div className="text-gray-700 space-y-1">
                                    <p className="font-semibold">{shippingAddress.fullName}</p>
                                    <p>{shippingAddress.street}</p>
                                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                                    <p>{shippingAddress.country}</p>
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    No shipping address selected.
                                    <Link href="/checkout/address" className="text-blue-600 hover:text-blue-800 ml-1">Add Address</Link>
                                </p>
                            )}
                        </div>

                        {/* Cart Items Summary Section */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Items in Cart</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.productId} className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-b-0">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <Image
                                                src={item.productImage || Placeholder}
                                                alt={item.productName}
                                                fill
                                                sizes="100vw"
                                                className="object-contain rounded"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-md font-semibold text-gray-800">{item.productName}</h3>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right text-md font-semibold text-gray-800">
                                            ${(item.productPrice * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Totals and Payment */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white p-6 rounded-lg shadow space-y-6 sticky top-20"> {/* Added sticky top */}
                            {/* Order Totals */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Totals</h2>
                                <div className="space-y-2 border-b border-gray-200 pb-4 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-gray-800 font-semibold">{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <span className="text-gray-800 text-lg font-bold">Total</span>
                                    <span className="text-gray-800 text-lg font-bold">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
                                <div className="space-y-3">
                                    {/* Credit Card (Disabled) */}
                                    <label className="flex items-center p-3 border rounded-md bg-gray-100 opacity-50 cursor-not-allowed">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="creditCard"
                                            checked={selectedPaymentMethod === 'creditCard'}
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            disabled // Disable this option
                                        />
                                        <span className="ml-3 text-gray-500">Credit Card (Unavailable)</span>
                                    </label>

                                    {/* Pay on Delivery (Enabled) */}
                                    <label className="flex items-center p-3 border rounded-md hover:border-blue-400 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="payOnDelivery"
                                            checked={selectedPaymentMethod === 'payOnDelivery'}
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="ml-3 text-gray-700">Pay on Delivery</span>
                                    </label>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={!shippingAddress || cartItems.length === 0 || !selectedPaymentMethod || isPlacingOrder}
                                className={`w-full text-white py-3 rounded-md transition-colors font-semibold ${
                                    (!shippingAddress || cartItems.length === 0 || !selectedPaymentMethod || isPlacingOrder)
                                        ? 'bg-gray-400 cursor-not-allowed' // Disabled state
                                        : 'bg-blue-600 hover:bg-blue-700' // Enabled state
                                }`}
                            >
                                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}