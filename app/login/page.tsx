"use client";

import React, {useState} from "react";
import {signIn} from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {useRouter} from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router  = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        // Trigger NextAuth sign-in with credentials
        const res = await signIn("credentials", {
            redirect: false, // Prevent automatic redirection
            email,
            password,
            callbackUrl: "/"
        });

        if (!res?.ok) {
            setErrorMessage("Invalid login credentials.");
            setLoading(false);
        }

        if (res?.url) {
            setLoading(false);
            router.push(res.url);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <>
                    <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                    {errorMessage && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded disabled:bg-gray-900"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LoadingSpinner /> <span className={"pl-1"}>Loading</span>
                                </>
                            ) : "Login"}
                        </button>
                        <div className={"text-center"}>
                            Already have an account?<Link href="/register" className={"pl-1 text-blue-600 underline underline-offset-2"}>Register here</Link>
                        </div>
                    </form>
                </>
            </div>
        </div>
    );
};

export default LoginPage;
