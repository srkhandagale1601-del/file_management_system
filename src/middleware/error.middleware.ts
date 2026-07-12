import { AppError } from "@/shared/errors/AppError";
import{Request,Response,NextFunction} from "express";

export const errorHandler = (
    err:Error,
    req: Request,
    res:Response,
    next: NextFunction
)=>{
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }else{
        return res.status(500).json({
            success:false,
            message:err.message || "Internal Error"
        });
    }
};