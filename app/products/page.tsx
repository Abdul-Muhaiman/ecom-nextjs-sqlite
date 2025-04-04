import ProductPageWrapper from "@/components/products/ProductPageWrapper";


export default async function Page() {
    return (
        <div className="container mx-auto">
            <div className="my-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
                <p className="text-gray-600">Browse through our latest collection!</p>
            </div>
            <ProductPageWrapper />
        </div>
    );
}