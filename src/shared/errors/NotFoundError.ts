import { AppError } from "@/shared/errors/AppError";

export class NotFoundError extends AppError{
    constructor(message = "Resource Not Found"){
        super(404, message);
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }
}