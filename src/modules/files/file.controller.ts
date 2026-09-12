import { asyncHandler } from "@/utils/asyncHandler";
import FileService  from "./file.service";
import { SuccessResponse } from "@/shared/responses/apiResponse";
import { file } from "zod";
export class fileController {
    upload = asyncHandler(async (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required",
            });
        }

        const file = await FileService.upload(
            req.userId,
            req.file
        );

        return res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            data: file,
        });
    });

    getFiles = asyncHandler(async (req, res) => {
        const files = await FileService.getFile(req.userId!);

        const response: SuccessResponse<typeof files> = {
            success: true,
            message: files.length
                ? "Files fetched successfully"
                : "No files found",
            data: files,
        };

        return res.status(200).json(response);
    });

    getFileByID = asyncHandler(async (req, res) => {
        const userId = req.userId;
        const id = req.params.id;
        if (!userId) {
            return res.status(401).json({
            message: "Unauthorized",
            });
        }

        const file = await FileService.getFileById({
            id,userId
        });

        if (!file) {
            return res.status(404).json({
            message: "File not found",
            });
        }

        return res.status(200).json(file);
    });

    deleteFileByID = asyncHandler(async(req,res)=>{
        const userId = req.userId;
        const id = req.params.id;
        if (!userId) {
            return res.status(401).json({
            message: "Unauthorized",
            });
        }
        if(!id){
            return res.status(404).json({message:"Enter the file id"});
        }
        const file = await FileService.deleteFileByID({
            id,userId
        });

        if (!file) {
            return res.status(404).json({
            message: "File not found",
            });
        }

        return res.status(200).json({
            message: "File Deleted Successfully"
        });
    });
}

export default new fileController();