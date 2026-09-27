import { Router } from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import folderController from "./folder.controller";

const router = Router();

router.post("/",authMiddleware,folderController.create);

export default router;