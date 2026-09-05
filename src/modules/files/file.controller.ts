import { asyncHandler } from "@/utils/asyncHandler";
import FileService  from "./file.service";
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
}

export default new fileController();