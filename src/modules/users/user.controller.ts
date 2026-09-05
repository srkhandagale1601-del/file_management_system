import prisma from "@/shared/database/prisma";
import { AppError } from "@/shared/errors/AppError";
import { asyncHandler } from "@/utils/asyncHandler";
import userService from "./user.service";

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
                name:user.name,
                email:user.email,
                createdAt:  user.createdAt,
                updatedAt:user.updatedAt
            }
        })
    });

    updateprofile  = asyncHandler(async(req,res)=>{
        const authHeader = req.headers.authorization;
        const {name} = req.body;
        if(!authHeader){
                throw new AppError("Authorization header is required",401);
        }
        const[type,token] = authHeader.split(" ");
    
        if(type != "Bearer" || !token){
            throw new AppError("Invalid authorization format",401);            
        }
    
        const result =  await userService.updateprofile({token,name});
    
        if(!result.success){
            throw new AppError(result.message,401);
        }
    
        res.status(201).json(result);           
    });
}

export default new UserController();