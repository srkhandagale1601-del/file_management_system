import prisma from "@/shared/database/prisma";
import { ErrorResponse, SuccessResponse } from "@/shared/responses/apiResponse";
import { config } from "@/config/env";
import jwt  from "jsonwebtoken";
interface UpdateProfile{
    token: string;
    name: string;
}

export class UserService {
    async updateprofile({ token, name }: UpdateProfile
        ): Promise<SuccessResponse<{
            id: string;
            name: string;
            email: string;}> | ErrorResponse> 
        {
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET) as {
                userId: string;
            };

            const userId = decoded.userId;
            const user = await prisma.user.update({
                where: { id: userId },
                data: { name },
            });
            
            return {
                success: true,
                message: "Profile retrieved successfully",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        } catch (error) {
            console.error("UPDATE PROFILE ERROR:", error);
            return {
                success: false,
                message: "Invalid or expired token",
                errors: [],
            };
        }
    }
}

export default new UserService();