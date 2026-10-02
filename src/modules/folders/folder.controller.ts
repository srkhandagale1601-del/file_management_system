import { asyncHandler } from "@/utils/asyncHandler";
import FolderService from "./folder.service ";

export class FolderController {
    create = asyncHandler(async (req, res) => {
        const { name, parentId } = req.body;

        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const folder = await FolderService.create({
            name,
            parentId,
            userId,
        });

        res.status(201).json({
            success: true,
            message: "Folder created successfully",
            folder,
        });
    });

    getFolder = asyncHandler(async (req, res) => {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const folder = await FolderService.getFolder({
            userId,
        });

        res.status(201).json({
            success: true,
            message: "Folder found successfully",
            folder,
        });
    });

    getFolderById = asyncHandler(async (req, res) => {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const folderById = await FolderService.getFolderById({
            userId,
            id,
        });

        if (!folderById) {
            res.status(404).json({
                success: false,
                message: "Folder doenst exists",
            });
        }

        res.status(201).json({
            success: true,
            message: "Folder found successfully",
            folderById,
        });
    });

    rename = asyncHandler(async (req, res) => {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        const { name } = req.body;

        const folder = await FolderService.rename({
            id,
            userId,
            name,
        });

        res.status(200).json({
            success: true,
            message: "Folder renamed successfully",
            folder,
        });
    });

    delete = asyncHandler(async (req, res) => {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        await FolderService.delete({
            id,
            userId,
        });

        res.status(200).json({
            success: true,
            message: "Folder deleted successfully",
        });
    });

    getFiles = asyncHandler(async (req, res) => {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        const files = await FolderService.getFiles({
            id,
            userId,
        });

        res.status(200).json({
            success: true,
            message: "Files fetched successfully",
            files,
        });
    });
}

export default new FolderController();
