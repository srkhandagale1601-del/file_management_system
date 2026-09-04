import { jwtMiddleware } from "@/middleware/jwt.middleware";
import express from "express";
import userController from "./user.controller";

const router = express.Router();

router.get("/me",jwtMiddleware,userController.getme);
router.patch("/update-profile",userController.updateprofile);
export default router;