import prisma from "@/shared/database/prisma";
import { AppError } from "@/shared/errors/AppError";
import { asyncHandler } from "@/utils/asyncHandler";

export class UserController{
    getme = asyncHandler(async(req,res)=>{
        const userId = req.userId;

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        });

        if(!user){
            throw new AppError("Invalid Id",401);
        }
        return res.status(201).json({
            message: "User Details",
            data:{
                id:user.id,
                email:user.email,
                createdAt:  user.createdAt,
                updatedAt:user.updatedAt
            }
        })
    });
}

export default new UserController();