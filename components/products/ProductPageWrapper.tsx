// components/products/ProductPageWrapper.tsx
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProductPage from "@/components/products/ProductPage";

type Product = {
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

type PaginationData = {
    total: number;
    pages: number;
    page: number;
    limit: number;
};

type ProductsResponse = {
    products: Product[];
    pagination: PaginationData;
};

export default function ProductPageWrapper() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const [data, setData] = useState<ProductsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                // You can either create a dedicated API route or use a fetch function that calls your DAL
                const response = await fetch(`/api/products?page=${page}&limit=9`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        router.push(`${pathname}?page=${newPage}`);
    };

    if (loading && !data) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                        <div className="p-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!data) return <div className="text-center py-10">No products found</div>;

    return (
        <ProductPage
            products={data.products}
            pagination={data.pagination}
            onPageChange={handlePageChange}
            isLoading={loading}
        />
    );
}