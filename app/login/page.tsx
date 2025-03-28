"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginPage = () => {
    const { data: session } = useSession();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        // Trigger NextAuth sign-in with credentials
        const res = await signIn("credentials", {
            redirect: false, // Prevent automatic redirection
            username,
            password,
        });

        if (!res?.ok) {
            setErrorMessage("Invalid login credentials.");
        }
    };

    const handleLogout = () => {
        signOut();
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                {!session ? (
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
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                            >
                                Sign In
                            </button>
                        </form>
                    </>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4 text-center">Welcome</h1>
                        <p className="text-gray-700 text-center mb-4">
                            Logged in as <span className="font-bold">{session.user?.name}</span>
                        </p>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
