"use server"

import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function uploadProductImage(formData: FormData) {
    try {
        const files = formData.getAll("files") as File[]

        if (!files || files.length === 0) {
            return { success: false, error: "No files provided" }
        }

        const uploadedPaths: string[] = []

        for (const file of files) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                return { success: false, error: "Only image files are allowed" }
            }

            // Limit file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                return { success: false, error: "File size exceeds 5MB limit" }
            }

            // Create unique filename
            const fileExtension = file.name.split(".").pop()
            const fileName = `${uuidv4()}.${fileExtension}`

            // Define path to save the file
            const publicDir = join(process.cwd(), "public")
            const uploadsDir = join(publicDir, "uploads")

            // Create uploads directory if it doesn't exist
            try {
                await writeFile(join(uploadsDir, "test.txt"), "")
            } catch (error) {
                // Directory doesn't exist, create it
                const fs = require("fs")
                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true })
                }
            }

            // Save the file
            const filePath = join(uploadsDir, fileName)
            const buffer = Buffer.from(await file.arrayBuffer())
            await writeFile(filePath, buffer)

            // Add the path to the list
            uploadedPaths.push(`/uploads/${fileName}`)
        }

        return { success: true, paths: uploadedPaths }
    } catch (error) {
        console.error("Error uploading files:", error)
        return { success: false, error: "Failed to upload files" }
    }
}
