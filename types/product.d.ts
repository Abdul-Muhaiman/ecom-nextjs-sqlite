export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    image: string;
    categoryId: number | null; // Links to category
    category?: {              // Optional field for related category data
        name: string;
        id: number;
    } | null;
}
