import ProductCard from "@/components/products/ProductCard";
import {Product, Pagination} from "@/types/product";

export default function ProductPage({
                                        products,
                                        pagination,
                                        onPageChange,
                                        isLoading = false,
                                    }: {
    products: Product[];
    pagination: Pagination;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
}) {
    return (
        <>
            <div className="my-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
                <p className="text-gray-600">Browse through our latest collection!</p>
            </div>
            {/* Product Grid */}
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-6 py-6 ${
                    isLoading ? "opacity-60 pointer-events-none" : ""
                }`}
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination Controls */}
            {pagination.pages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    {/* Previous Button */}
                    <button
                        disabled={pagination.page <= 1 || isLoading}
                        className={`px-4 py-2 rounded-lg transition-all font-medium ${
                            pagination.page <= 1 || isLoading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-800 text-white hover:bg-gray-900"
                        }`}
                        onClick={() => onPageChange && onPageChange(pagination.page - 1)}
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                        {[...Array(pagination.pages)].map((_, i) => {
                            const pageNum = i + 1;

                            if (
                                pageNum === 1 ||
                                pageNum === pagination.pages ||
                                (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)
                            ) {
                                return (
                                    <button
                                        key={i}
                                        disabled={isLoading}
                                        className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-all ${
                                            pageNum === pagination.page
                                                ? "bg-gray-800 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                                // Render ellipsis
                                return (
                                    <span key={i} className="px-2 text-gray-500">
                                        ...
                                    </span>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Next Button */}
                    <button
                        disabled={pagination.page >= pagination.pages || isLoading}
                        className={`px-4 py-2 rounded-lg transition-all font-medium ${
                            pagination.page >= pagination.pages || isLoading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-800 text-white hover:bg-gray-900"
                        }`}
                        onClick={() => onPageChange && onPageChange(pagination.page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}
