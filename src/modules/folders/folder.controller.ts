import { asyncHandler } from "@/utils/asyncHandler";
import FolderService from "./folder.service ";

export class FolderController {
    create = asyncHandler(async (req, res) => {
        const { name, parentId } = req.body;

        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
            return;
        }

        const folder = await FolderService.create({
            name,
            parentId,
            userId
        });

        res.status(201).json({
            success: true,
            message: "Folder created successfully",
            folder
        });
    });

    getFolder = asyncHandler(async(req,res)=>{
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
            return;
        }

        const folder = await FolderService.getFolder({
            userId
        });

        res.status(201).json({
            success: true,
            message: "Folder found successfully",
            folder
        });
    });
}

export default new FolderController();