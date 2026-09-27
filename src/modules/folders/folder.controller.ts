import { asyncHandler } from "@/utils/asyncHandler";
import FolderService from "./folder.service ";
import { request } from "node:http";
import { success } from "zod";

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
    
    getFolderById = asyncHandler(async(req,res)=>{
        const userId = req.userId;
        if(!userId){
            res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
            return 

        }
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const folderById = await FolderService.getFolderById({
            userId,
            id
        });

        if(!folderById){
            res.status(404).json({
                success:false,
                message:"Folder doenst exists"
            });
        }

        res.status(201).json({
            success: true,
            message: "Folder found successfully",
            folderById
        });
    });
}

export default new FolderController();