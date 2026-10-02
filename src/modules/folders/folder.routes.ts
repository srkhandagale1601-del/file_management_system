import { Router } from "express";
import { authMiddleware } from "@/middleware/auth.middleware";
import folderController from "./folder.controller";

const router = Router();

router.post("/",authMiddleware,folderController.create);
router.get("/",authMiddleware,folderController.getFolder);
router.get("/:id",authMiddleware,folderController.getFolderById);
router.patch("/:id",authMiddleware,folderController.rename);
router.delete("/:id",authMiddleware,folderController.delete);
router.get("/:id/files",authMiddleware,folderController.getFiles);
export default router;