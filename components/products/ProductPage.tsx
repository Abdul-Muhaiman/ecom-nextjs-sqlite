import {ChevronLeft, ChevronRight} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import {Pagination, Product} from "@/types/product";
import React from "react";

const ProductPage = ({
                         products,
                         pagination,
                         onPageChange,
                         isLoading = false,
                     }: {
    products: Product[]; // Use 'any' to avoid changing your existing type definitions
    pagination: Pagination;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
}) => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Title and Description */}
                <div className="text-center mb-10 space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Collection</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our latest collection of high-quality products. Each item is selected for its craftsmanship, durability, and style.
                    </p>
                </div>

                {/* Product Grid */}
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10
                ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
                >
                    {isLoading ? (
                        // Render placeholders for loading state
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 animate-pulse"
                            >
                                <div className="w-full aspect-square bg-gray-300 rounded-md mb-4"></div>
                                <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2 mb-5"></div>
                                <div className="h-10 bg-gray-700 rounded w-full"></div>
                            </div>
                        ))
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>

                {/* Pagination */}
                {pagination?.pages > 1 && ( //check if pagination exists
                    <div className="flex justify-center items-center mt-12 space-x-3">
                        {/* Previous Button */}
                        <button
                            disabled={pagination.page <= 1 || isLoading}
                            className={`px-5 py-3 rounded-full transition-all font-medium flex items-center gap-2
                                        ${pagination.page <= 1 || isLoading
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'}`}
                            onClick={() => onPageChange && onPageChange(pagination.page - 1)}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center space-x-2">
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
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all
                                                        ${pageNum === pagination.page
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'}`}
                                            onClick={() => onPageChange && onPageChange(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    (pageNum === 2 && pagination.page > 3) ||
                                    (pageNum === pagination.pages - 1 && pagination.page < pagination.pages - 2)
                                ) {
                                    // Ellipsis
                                    return (
                                        <span key={i} className="text-gray-500 px-3">
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
                            className={`px-5 py-3 rounded-full transition-all font-medium flex items-center gap-2
                                        ${pagination.page >= pagination.pages || isLoading
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'}`}
                            onClick={() => onPageChange && onPageChange(pagination.page + 1)}
                        >
                            Next
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;