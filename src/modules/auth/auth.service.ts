import { SuccessResponse, ErrorResponse } from "@/shared/responses/apiResponse";
import bcrypt from "bcrypt";
import prisma from "@/shared/database/prisma";
import { errorResponse } from "@/shared/responses/response.handler";
import jwt from "jsonwebtoken";
import { config } from "@/config/env";
import { success } from "zod";


interface LogoutInput {
    token: string;
}
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

    async login(
        email: string,
        password: string
    ):Promise<SuccessResponse<{
        id:string,
        token:string,
        name:string,
        email:string
    }> | ErrorResponse>{
        
        const existingUser  =  await prisma.user.findUnique({
            where:{
                email            
            }
        });

        if(!existingUser){
            return {
                success: false,
                message: "User doesnt exists",
                errors: []
            };
        }

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.passwordHash);

        if(!isPasswordCorrect){
            return {
                success:false,
                message:"Password is Incorrect",
                errors: []
            }
        }

        const token =  jwt.sign({userId: existingUser.id },process.env.JWT_SECRET!,{
            expiresIn:"1hr"
        })
        return {
            success:true,
            message:"User Login Successfully",
            data:{
                id:existingUser.id,
                token:token,
                name:existingUser.name,
                email: existingUser.email
            }
        }
    }
    
    async logout({token}:LogoutInput){
        try{
            jwt.verify(token,config.JWT_SECRET);
            return {
                success:true,
                message:"User Logout Successfuly"
            }
        }catch(error){
            return{
                success:false,
                message:"Invalid or Expired Token"
            }
        }
    }
}

export default new AuthService();