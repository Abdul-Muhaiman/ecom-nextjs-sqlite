// app/image-upload/page.tsx
"use client";

import React, { useState } from "react";
// Import the server action
import { uploadImageAction } from "./action/action"; // Adjust path if necessary

export default function ImageUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMessage(null);
            setUploadedFilePath(null);
        } else {
            setFile(null);
        }
    };

    // Updated handleSubmit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        setUploading(true);
        setMessage("Uploading...");
        setUploadedFilePath(null);

        // Create FormData
        const formData = new FormData();
        formData.append("file", file); // Key "file" MUST match the key expected in the server action

        try {
            // Call the server action
            const result = await uploadImageAction(formData);

            // Handle the result
            if (result.success) {
                setMessage("File uploaded successfully!");
                setUploadedFilePath(result.filePath); // Store the public path
            } else {
                setMessage(`Upload failed: ${result.error}`);
                setUploadedFilePath(null);
            }
        } catch (error) {
            // Handle unexpected errors during the action call itself
            console.error("Error calling upload action:", error);
            setMessage("An unexpected error occurred during upload.");
            setUploadedFilePath(null);
        } finally {
            // Reset loading state regardless of success or failure
            setUploading(false);
        }
    };

    return (
        // ... rest of the JSX remains the same ...
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Simple Image Upload</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Image:
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={uploading}
                    />
                    {/* Optional: Show selected filename */}
                    {file && <p className="text-xs text-gray-500 mt-1">Selected: {file.name}</p>}
                </div>

                <button
                    type="submit"
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                        uploading || !file ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={uploading || !file}
                >
                    {uploading ? "Uploading..." : "Upload Image"}
                </button>
            </form>

            {/* Display messages */}
            {message && <p className={`mt-4 text-sm ${uploadedFilePath ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}

            {/* Display uploaded image preview */}
            {uploadedFilePath && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Uploaded Image:</h2>
                    {/* Use next/image for optimization, but a simple img tag works too */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={uploadedFilePath}
                        alt="Uploaded preview"
                        className="max-w-xs h-auto rounded border border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">Image available at: {uploadedFilePath}</p>
                </div>
            )}
        </div>
    );
}