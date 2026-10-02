import prisma from "@/shared/database/prisma";
interface CreateFolderData {
    name: string;
    parentId?: string;
    userId: string;
}

export class FolderService {
    async create({ name, parentId, userId }: CreateFolderData) {
        const createFolder = await prisma.folder.create({
            data: {
                name,
                parentId: parentId ?? null,
                userId,
            },
        });
        return createFolder;
    }
    async getFolder({ userId }: { userId: string }) {
        const getFolder = await prisma.folder.findMany({
            where: {
                userId,
            },
        });
        return getFolder;
    }
    async getFolderById({ userId, id }: { userId: string; id: string }) {
        const getFolderById = await prisma.folder.findUnique({
            where: {
                id,
                userId,
            },
        });
        return getFolderById;
    }

    async rename({ id, userId, name }: { id: string; userId: string; name: string }) {
        // Validate name
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            const error = new Error("Folder name is required");
            (error as any).statusCode = 400;
            throw error;
        }

        // Verify ownership
        const folder = await prisma.folder.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!folder) {
            const error = new Error("Folder doesn't exist");
            (error as any).statusCode = 404;
            throw error;
        }

        // Update folder
        const updatedFolder = await prisma.folder.update({
            where: {
                id: folder.id,
            },
            data: {
                name: name.trim(),
            },
        });

        return updatedFolder;
    }

    async delete({ id, userId }: { id: string; userId: string }) {
        const folder = await prisma.folder.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                files: {
                    select: {
                        id: true,
                    },
                },
                children: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        // Folder doesn't exist or doesn't belong to user
        if (!folder) {
            const error = new Error("Folder doesn't exist");
            (error as any).statusCode = 404;
            throw error;
        }

        // Folder contains files
        if (folder.files.length > 0) {
            const error = new Error("Cannot delete folder because it contains files");

            (error as any).statusCode = 409;
            throw error;
        }

        // Folder contains subfolders
        if (folder.children.length > 0) {
            const error = new Error("Cannot delete folder because it contains subfolders");

            (error as any).statusCode = 409;
            throw error;
        }

        // Folder is empty → delete
        await prisma.folder.delete({
            where: {
                id: folder.id,
            },
        });

        return folder;
    }

    async getFiles({
        id,
        userId,
    }: {
        id: string;
        userId: string;
    }) {
        const folder = await prisma.folder.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!folder) {
            const error = new Error("Folder doesn't exist");
            (error as any).statusCode = 404;
            throw error;
        }

        const files = await prisma.file.findMany({
            where: {
                folderId: id,
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return files;
    }
}

export default new FolderService();
