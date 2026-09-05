import { Router } from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import upload from "./file.upload";
import fileController from "./file.controller";

const router = Router();

router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    fileController.upload,
);

export default router;