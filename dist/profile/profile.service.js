"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../prisma");
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("path");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadFile(file, user_id) {
        const user = await this.prisma.user.findFirst({
            where: { id: user_id },
        });
        if (!user)
            throw new common_1.NotFoundException("Tidak Menemukan User");
        if (user.foto_profile) {
            const filePath = (0, path_2.join)(process.cwd(), 'uploads', user.foto_profile);
            if ((0, fs_1.existsSync)(filePath)) {
                (0, fs_1.rmSync)(filePath);
            }
        }
        const uploadPath = (0, path_2.join)(process.cwd(), 'uploads');
        if (!(0, fs_1.existsSync)(uploadPath)) {
            (0, fs_1.mkdirSync)(uploadPath);
        }
        const fileExt = (0, path_1.extname)(file.originalname);
        const baseFilename = user.username;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `${baseFilename}-${uniqueSuffix}${fileExt}`;
        const filePath = (0, path_2.join)(uploadPath, filename);
        (0, fs_1.writeFileSync)(filePath, file.buffer);
        await this.prisma.user.update({
            where: { id: user_id },
            data: { foto_profile: filename },
        });
        return { filename, path: filePath };
    }
    async sendMyFotoProfile(user_id) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: user_id
            }
        });
        if (!user)
            throw new common_1.NotFoundException("User tidak ditemukan");
        return user.foto_profile;
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.default])
], ProfileService);
//# sourceMappingURL=profile.service.js.map