import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const {name} = body;
        // Perform validation and sanitization here
        //...
        if (!name) return NextResponse.json(
            { error: "Name, email, and password are required." },
            { status: 400 }
        );

        // Save data to a database or file system
        //...

        console.log("NAME", name);


        // Return a response with status code 200 and a JSON object containing the saved data
        // return new Response(JSON.stringify({name, email}), {status: 200});
        return new Response(JSON.stringify({success: true}), {status: 200});
    } catch (e) {
        console.error("Error creating user:", e);
        return NextResponse.json(
            { error: "Failed to create user." },
            { status: 500 }
        );
    }
}