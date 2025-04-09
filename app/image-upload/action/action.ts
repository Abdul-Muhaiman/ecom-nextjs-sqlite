
"use server"; // Mark this module as containing Server Actions

import { writeFile } from "fs/promises"; // Node.js file system module
import { mkdir } from "fs/promises";
import { stat } from "fs/promises";
import { join } from "path"; // Node.js path module
import { v4 as uuidv4 } from "uuid"; // For unique filenames

// Define a type for the return value for better type safety
type UploadResult =
    | { success: true; filePath: string }
    | { success: false; error: string };

export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
    // 1. Get the file from FormData
    const file = formData.get("file") as File | null; // "file" must match the key used in FormData.append()

    if (!file) {
        return { success: false, error: "No file provided." };
    }

    // 2. Basic Validation (add more as needed)
    if (!file.type.startsWith("image/")) {
        return { success: false, error: "Invalid file type. Only images are allowed." };
    }

    const maxSize = 5 * 1024 * 1024; // 5MB limit
    if (file.size > maxSize) {
        return { success: false, error: `File size exceeds the limit of ${maxSize / 1024 / 1024}MB.` };
    }


    try {
        // 3. Generate unique filename and path
        const fileExtension = file.name.split(".").pop();
        const uniqueFilename = `${uuidv4()}.${fileExtension}`;
        const publicUploadsDir = join(process.cwd(), "public", "uploads");
        const filePath = join(publicUploadsDir, uniqueFilename);

        // 4. Ensure the upload directory exists
        try {
            // Check if directory exists
            await stat(publicUploadsDir);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                // Directory does not exist, create it recursively
                await mkdir(publicUploadsDir, { recursive: true });
                console.log(`Created directory: ${publicUploadsDir}`);
            } else {
                // Other error (e.g., permissions)
                console.error("Error checking/creating directory:", error);
                return { success: false, error: "Could not create upload directory." };
            }
        }


        // 5. Read file data into a buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // 6. Write the file to the server's filesystem
        await writeFile(filePath, buffer);

        console.log(`File uploaded successfully to: ${filePath}`);

        // 7. Return the public path (accessible via web)
        const publicPath = `/uploads/${uniqueFilename}`; // Relative path from the 'public' directory
        return { success: true, filePath: publicPath };

    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, error: "Failed to upload file due to a server error." };
    }
}