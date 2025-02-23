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
exports.MahasiswaProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../prisma");
const fs_1 = require("fs");
const path_1 = require("path");
let MahasiswaProfileService = class MahasiswaProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadFile(file, user_nim) {
        const user = await this.prisma.mahasiswa.findUnique({
            where: { nim: user_nim },
        });
        if (!user) {
            throw new common_1.NotFoundException('User tidak ditemukan!');
        }
        const uploadPath = 'uploads';
        if (!(0, fs_1.existsSync)(uploadPath)) {
            (0, fs_1.mkdirSync)(uploadPath);
        }
        const fileExt = (0, path_1.extname)(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `${user.nim}-${uniqueSuffix}${fileExt}`;
        const filePath = `${uploadPath}/${filename}`;
        (0, fs_1.writeFileSync)(filePath, file.buffer);
        await this.prisma.mahasiswa.update({
            where: { nim: user_nim },
            data: { foto_profile: filename },
        });
        return { filename, path: filePath };
    }
    async sendMyFotoProfile(user_nim) {
        const user = await this.prisma.mahasiswa.findUnique({
            where: { nim: user_nim },
        });
        if (!user || !user.foto_profile) {
            throw new common_1.NotFoundException('Foto profil tidak ditemukan');
        }
        return user.foto_profile;
    }
};
exports.MahasiswaProfileService = MahasiswaProfileService;
exports.MahasiswaProfileService = MahasiswaProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.default])
], MahasiswaProfileService);
//# sourceMappingURL=mahasiswa-profile.service.js.map