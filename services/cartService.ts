export const fetchCartItems = async (userId: number) => {
    const res = await fetch(`/api/cart?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch cart items');
    return res.json();
};

export const addToCart = async (data: { userId: number; productId: number; quantity: number }) => {
    const res = await fetch(`/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to add item to cart');
    return res.json();
};

export const removeFromCart = async (cartItemId: number) => {
    const res = await fetch(`/api/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItemId }),
    });
    if (!res.ok) throw new Error('Failed to remove item from cart');
    return res.json();
};
