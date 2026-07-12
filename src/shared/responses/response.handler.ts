import { SuccessResponse, ErrorResponse} from "./apiResponse";

export function successResponse<T>(
    data:T,
    message: "Task Completed Successfully"
): SuccessResponse<T>{
    return{
        success:true,
        message,
        data
    };
}
export function errorResponse(
    message:"Failed to Complete",
    errors: string[] = [],
): ErrorResponse{
    return{
        success:false,
        message,
        errors,
    };   
}