import PrismaService from '../prisma';
export declare class MahasiswaProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File, user_nim: string): Promise<{
        filename: string;
        path: string;
    }>;
    sendMyFotoProfile(user_nim: string): Promise<string>;
}
