export interface Order {
    id: number;
    userId: number;
    amount: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

interface OrderItem {
    quantity: number;
    product: {
        name: string;
        price: number;
        image: string;
    };
}
