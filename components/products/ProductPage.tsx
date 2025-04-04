// components/products/ProductPage.tsx
import ProductCard from "@/components/products/ProductCart";

type Product = {
    category: {
        id: number
        name: string
    } | null
} & {
    id: number
    image: string
    name: string
    description: string | null
    price: number
    stock: number
    categoryId: number | null
}

type Pagination = {
    total: number;
    pages: number;
    page: number;
    limit: number;
}

export default function ProductPage(
    {
        products,
        pagination,
        onPageChange,
        isLoading = false
    }: {
        products: Product[],
        pagination: Pagination,
        onPageChange?: (page: number) => void,
        isLoading?: boolean
    }
) {
    return (
        <>
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4 ${isLoading ? 'opacity-60' : ''}`}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>

            {pagination.pages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                        disabled={pagination.page <= 1 || isLoading}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 transition-all"
                        onClick={() => onPageChange && onPageChange(pagination.page - 1)}
                    >
                        Previous
                    </button>

                    <div className="flex items-center space-x-1">
                        {[...Array(pagination.pages)].map((_, i) => {
                            const pageNum = i + 1;
                            // Show current page, first, last, and pages around current
                            if (
                                pageNum === 1 ||
                                pageNum === pagination.pages ||
                                (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)
                            ) {
                                return (
                                    <button
                                        key={i}
                                        disabled={isLoading}
                                        className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                                            pageNum === pagination.page
                                                ? 'bg-gray-800 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                        onClick={() => onPageChange && onPageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            } else if (
                                (pageNum === 2 && pagination.page > 3) ||
                                (pageNum === pagination.pages - 1 && pagination.page < pagination.pages - 2)
                            ) {
                                // Show ellipsis
                                return <span key={i} className="px-1">...</span>;
                            }
                            return null;
                        })}
                    </div>

                    <button
                        disabled={pagination.page >= pagination.pages || isLoading}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 transition-all"
                        onClick={() => onPageChange && onPageChange(pagination.page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}