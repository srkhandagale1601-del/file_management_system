import { AppError } from "@/shared/errors/AppError";
import authService from "./auth.service";
import { registerSchema } from "./auth.validation";
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
}

export default new AuthController();