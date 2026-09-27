import prisma from "@/shared/database/prisma";
interface CreateFolderData{
    name:string,
    parentId? :string,
    userId:string
}

export class FolderService{
    async create({name,parentId,userId}:CreateFolderData) {
        const createFolder = await prisma.folder.create({
            data: {
                name,
                parentId: parentId ?? null,
                userId
            }
        });
        return createFolder;
    }
    async getFolder({userId}: {userId: string}){
        const getFolder = await prisma.folder.findMany({
            where:{
                userId
            }
        })
        return getFolder;
    }
    async getFolderById({userId,id}:{userId:string,id:string}){
        const getFolderById = await prisma.folder.findUnique({
            where:{
                id,
                userId,
            }
        });
        return getFolderById;
    }
}

export default new FolderService();