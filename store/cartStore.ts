import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchCartItems, addToCart, removeFromCart } from '@/services/cartService';

type CartItem = {
    id?: number;
    productId: number;
    price: number;
    quantity: number;
};

type CartState = {
    cart: CartItem[];
    fetchCart: (userId: number) => Promise<void>;
    addToCart: (userId: number, product: Omit<CartItem, 'id'>) => Promise<void>;
    removeFromCart: (cartItemId: number) => Promise<void>;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],

            // Fetch cart items from the backend
            fetchCart: async (userId) => {
                const items = await fetchCartItems(userId);
                set({ cart: items });
            },

            // Add a product to the cart
            addToCart: async (userId, product) => {
                const newItem = await addToCart({
                    userId,
                    productId: product.productId,
                    quantity: product.quantity,
                });
                set((state) => ({
                    cart: [...state.cart, newItem],
                }));
            },

            // Remove an item from the cart
            removeFromCart: async (cartItemId) => {
                await removeFromCart(cartItemId);
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== cartItemId),
                }));
            },
        }),
        {
            name: 'cart-storage', // Key name in localStorage
            partialize: (state) => ({ cart: state.cart }), // Persist only the `cart` field
        }
    )
);
