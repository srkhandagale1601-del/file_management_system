import express from "express";
import authController from "./auth.controller"
import { jwtMiddleware } from "@/middleware/jwt.middleware";

const router = express.Router();

router.post("/signup",authController.signup);
router.post("/login",authController.login);
router.post("/logout",authController.logout);
router.get("/me",jwtMiddleware,authController.getme);
export default router;