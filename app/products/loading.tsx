// app/products/loading.tsx
export default function Loading() {
    return (
        <div className="container mx-auto py-10">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}