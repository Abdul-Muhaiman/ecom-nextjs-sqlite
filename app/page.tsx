import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Store, ShieldCheck, Truck, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
            {/* Hero Section */}
            <section className="text-center py-20 px-6 max-w-3xl">
                <Store className="w-16 h-16 text-blue-600 mx-auto" />
                <h1 className="text-5xl font-extrabold tracking-tight mt-6">
                    Discover Quality Products
                </h1>
                <p className="text-lg text-gray-600 mt-4">
                    Browse our hand-picked collection, built for efficiency and ease.
                </p>

                <div className="flex justify-center mt-8 space-x-4">
                    <Link href="/products">
                        <Button>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Shop Now
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="outline">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl">
                {[
                    { title: "Fast Shipping", icon: Truck, desc: "Get your orders delivered quickly." },
                    { title: "Premium Quality", icon: Star, desc: "We source only the best products." },
                    { title: "Secure Checkout", icon: ShieldCheck, desc: "Advanced encryption ensures safety." }
                ].map(({ title, icon: Icon, desc }, index) => (
                    <Card key={index} className="border rounded-lg p-6 shadow-sm">
                        <CardHeader className="flex items-center space-x-3">
                            <Icon className="w-6 h-6 text-blue-600" />
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">{desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
