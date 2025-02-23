import { Response } from 'express';
import { ProfileService } from './profile.service';
import { User } from '@prisma/client';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    uploadFile(file: Express.Multer.File, user: User): Promise<{
        filename: string;
        path: string;
    }>;
    getProfile(id: number, res: Response): Promise<void>;
}
