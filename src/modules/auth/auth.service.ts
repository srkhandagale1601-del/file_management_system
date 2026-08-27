import { SuccessResponse, ErrorResponse } from "@/shared/responses/apiResponse";
import bcrypt from "bcrypt";
import prisma from "@/shared/database/prisma";

export class AuthService {
    async signup(
        name: string,
        email: string,
        password: string
    ): Promise<
        SuccessResponse<{
            id: string;
            name: string;
            email: string;
        }> | ErrorResponse
    > {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return {
                success: false,
                message: "User already exists",
                errors: []
            };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash
            }
        });

        return {
            success: true,
            message: "User created successfully",
            data: {
                id: result.id,
                name: result.name,
                email: result.email
            }
        };
    }
}

export default new AuthService();