export interface Commission {
    id: number; // Unique identifier for the commission
    orderId: number; // Associated order ID
    referrerId: number; // Referrer's user ID
    commissionAmount: number; // Commission amount
    level: number; // Referral level
    createdAt: string; // Timestamp of commission creation
    order: Order; // Nested order object
}

export interface Order {
    id: number; // Unique identifier for the order
    amount: number; // Total amount of the order
    createdAt: string; // Timestamp of order creation
    user: User; // Nested user object
}

export interface User {
    id: number; // Unique identifier for the user
    name: string; // User's name
}
