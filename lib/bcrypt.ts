import * as bcrypt from "bcrypt";


const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}
