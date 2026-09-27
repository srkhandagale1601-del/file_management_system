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
}

export default new FolderService();