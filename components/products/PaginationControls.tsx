"use client";


type pagination = {
    total: number;
    pages: number;
    page: number;
    limit: number;
};

export default function PaginationControls({ pagination, onPageChange }: { pagination: pagination, onPageChange?: (page: number) => void}) {
    return (
        <div className="flex justify-center mt-6">
            <button
                disabled={pagination.page <= 1}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg mr-2 disabled:opacity-50"
                onClick={() => onPageChange && onPageChange(pagination.page - 1)}
            >
                Previous
            </button>
            <button
                disabled={pagination.page >= pagination.pages}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50"
                onClick={() => onPageChange && onPageChange(pagination.page + 1)}
            >
                Next
            </button>
        </div>
    );
}
