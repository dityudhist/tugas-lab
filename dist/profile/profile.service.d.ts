import PrismaService from '../prisma';
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File, user_id: number): Promise<{
        filename: string;
        path: string;
    }>;
    sendMyFotoProfile(user_id: number): Promise<string>;
}
