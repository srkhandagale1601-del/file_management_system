import { AppError } from "@/shared/errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "@/config/env";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

interface AuthPayload extends JwtPayload {
    userId: string;
}

export const jwtMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Authorization header required", 401);
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        throw new AppError("Invalid authorization format", 401);
    }

    try {
        const decoded = jwt.verify(
            token,
            config.JWT_SECRET
        ) as AuthPayload;

        if (!decoded.userId) {
            throw new AppError("Invalid token", 401);
        }

        req.userId = decoded.userId;

        next();
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
};