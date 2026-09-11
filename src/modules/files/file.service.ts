import prisma from "@/shared/database/prisma";

export class FileService {
    async upload(userId: string | undefined, file: Express.Multer.File) {
        const createdFile = await prisma.file.create({
            data: {
                userId,
                originalName: file.originalname,
                storedName: file.filename,
                mimeType: file.mimetype,
                size: file.size,
                path: file.path,
            },
        });

        return createdFile;
    }
    async getFile(userId:string){
        return await prisma.file.findMany({
            where:{
                userId
            }
        });
    }
}
export default new FileService();