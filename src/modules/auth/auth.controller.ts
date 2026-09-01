import { AppError } from "@/shared/errors/AppError";
import authService from "./auth.service";
import { registerSchema,loginSchema } from "./auth.validation";
import { asyncHandler } from "@/utils/asyncHandler";

export class AuthController {
    signup = asyncHandler(async (req, res) => {
        const validatedResult = registerSchema.safeParse(req.body);

        if (!validatedResult.success) {
            const message = validatedResult.error.issues
                .map(issue => issue.message)
                .join(", ");

            throw new AppError(message, 400);
        }

        const result = await authService.signup(
            validatedResult.data.name,
            validatedResult.data.email,
            validatedResult.data.password
        );

        if (!result.success) {
            throw new AppError(result.message, 409);
        }

        res.status(201).json(result);
    });

    login = asyncHandler(async(req,res)=>{
        const validatedResult = loginSchema.safeParse(req.body);

        if(!validatedResult.success){
            const message = validatedResult.error.issues
                .map(issue => issue.message).join(" , ");
            
            throw new AppError(message, 400);
        }

        const result = await authService.login(
            validatedResult.data.email,
            validatedResult.data.password
        );

        if (!result.success) {
            throw new AppError(result.message, 409);
        }

        res.status(201).json(result);
    });

    logout = asyncHandler(async(req,res)=>{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            throw new AppError("Authorization header is required",401);
        }
        const[type,token] = authHeader.split(" ");

        if(type != "Bearer" || !token){
            throw new AppError("Invalid authorization format",401);
        }

        const result =  await authService.logout({token});

        if(!result.success){
            throw new AppError(result.message,401)
        }

        res.status(201).json(result);
    });
        
}

export default new AuthController();