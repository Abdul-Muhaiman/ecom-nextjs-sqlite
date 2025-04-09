"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import {uploadProductImage} from "@/lib/actions/admin/UploadImage";


export function ProductImageUploader() {
    const [images, setImages] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        setError(null)

        try {
            const formData = new FormData()

            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i])
            }

            const result = await uploadProductImage(formData)

            if (result.success) {
                setImages((prev) => [...prev, ...result.paths])
            } else {
                setError(result.error || "Failed to upload images")
            }
        } catch (err) {
            setError("An unexpected error occurred")
            console.error(err)
        } finally {
            setUploading(false)
            // Reset the file input
            event.target.value = ""
        }
    }

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-6">
            {/* Upload Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        {/* Upload Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-gray-400 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="text-sm text-gray-600 mb-4">Drag and drop product images or click to browse</p>
                        <button
                            className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium shadow-sm
                ${
                                uploading ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => document.getElementById("file-upload")?.click()}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Select Files"}
                        </button>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </div>

                    {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}
                </div>
            </div>

            {/* Image Gallery */}
            {images.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Uploaded Images</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((path, index) => (
                            <div key={index} className="relative group">
                                <div className="aspect-square relative rounded-md overflow-hidden border border-gray-200">
                                    <Image
                                        src={path || "/placeholder.svg"}
                                        alt={`Product image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                    onClick={() => removeImage(index)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
