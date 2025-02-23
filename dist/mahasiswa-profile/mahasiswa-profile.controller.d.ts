import { MahasiswaProfileService } from './mahasiswa-profile.service';
import { Response } from 'express';
export declare class MahasiswaProfileController {
    private readonly mahasiswaProfileService;
    constructor(mahasiswaProfileService: MahasiswaProfileService);
    uploadFile(file: Express.Multer.File, nim: string): Promise<{
        filename: string;
        path: string;
    }>;
    getProfile(nim: string, res: Response): Promise<void>;
}
