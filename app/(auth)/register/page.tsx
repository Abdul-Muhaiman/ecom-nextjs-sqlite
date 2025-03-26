import prisma from "@/lib/prisma";

function generateReferralCode(): string {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letter1 = alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    const letter2 = alphabets.charAt(Math.floor(Math.random() * alphabets.length));

    let digits = "";
    for (let i = 0; i < 6; i++) {
        digits += Math.floor(Math.random() * 10);
    }

    return letter1 + letter2 + digits;
}

// Define the server action
async function handleFormSubmit(data: FormData) {
    "use server"; // Required to mark this function as a server action

    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const referralCodeUsed = data.get("referralCodeUsed")?.toString();

    if (!name || !email || !password) {
        throw new Error("All fields are required!"); // Basic validation
    }

    let referralCode: string = "";
    let isUnique: boolean = false;

    // Ensure the referralCode is unique
    while (!isUnique) {
        referralCode = generateReferralCode();
        const existingUser = await prisma.user.findUnique({
            where: { referralCode },
        });
        isUnique = !existingUser; // Ensure the code is unique
    }

    const referredById = await prisma.user.findUnique({
        where: { referralCode: referralCodeUsed },
    })

    await prisma.user.create({
      data: { name: name, email: email, password:  password, referralCode: referralCode, referredById: referredById?.id },
    })
}

export default function Page() {
    return (
        <div>
            <h1>Register User</h1>
            <form action={handleFormSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <div>
                    <label htmlFor="referralCodeUsed">Referral Code</label>
                    <input type="text" id="referralCodeUsed" name="referralCodeUsed" />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
