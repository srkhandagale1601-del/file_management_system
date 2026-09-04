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
                id: string;
            };

            const userId = decoded.id;
            const user = await prisma.user.update({
                where: { id: userId },
                data: { name },
            });
            
        
            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                    errors: [],
                };
            }

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
            return {
                success: false,
                message: "Invalid or expired token",
                errors: [],
            };
        }
    }
}

export default new UserService();