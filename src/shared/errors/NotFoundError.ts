import { AppError } from "@/shared/errors/AppError";

export class NotFoundError extends AppError{
    constructor(message = "Resource Not Found"){
        super(message,404);
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }
}