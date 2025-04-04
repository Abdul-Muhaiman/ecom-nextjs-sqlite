export interface ProductOld {
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

export type Product = {
    category: {
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    image: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    categoryId: number | null;
};

export type Pagination = {
    total: number;
    pages: number;
    page: number;
    limit: number;
};