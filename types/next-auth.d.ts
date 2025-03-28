import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    // interface User {
    //     id: number;
    //     name: string;
    //     email: string;
    //     // password?: string; // Exclude sensitive fields in responses
    //     role: string;
    //     referralCode: string;
    // }
    //
    // interface Session {
    //     user: User;
    // }
}

// declare module "next-auth/jwt" {
//     interface JWT {
//         id: string;
//         name: string;
//         email: string;
//         role: string;
//         referralCode: string;
//     }
// }
